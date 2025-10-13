'use client'

import { JSX, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Text } from '@react-three/drei'
import { edgeTable, triTable } from '@/lib/mcTables'
import { useRouter } from 'next/navigation'

/** --------- maths + helpers ---------- **/

function GradientDome(props: JSX.IntrinsicElements['mesh']) {
  const mesh = useRef<THREE.Mesh>(null!)
  const texture = useMemo(() => {
    const size = 256
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = size
    const ctx = canvas.getContext('2d')!
    const grad = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
    grad.addColorStop(0.0, '#333') // dim silver centre
    grad.addColorStop(0.3, '#111') // quick fade to dark
    grad.addColorStop(1.0, '#000') // deep black outer sphere

    ctx.fillStyle = grad
    ctx.fillRect(0, 0, size, size)
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    return tex
  }, [])

  return (
    <mesh ref={mesh} {...props} scale={[-1, 1, 1]}>
      <sphereGeometry args={[30, 64, 64]} />
      <meshBasicMaterial side={THREE.BackSide} map={texture} />
    </mesh>
  )
}

// compute smooth normals by sampling scalar field gradient
function sampleNormal(
  x: number,
  y: number,
  z: number,
  balls: { p: THREE.Vector3; strength: number }[]
) {
  const eps = 0.002
  const dx = scalarField(x + eps, y, z, balls) - scalarField(x - eps, y, z, balls)
  const dy = scalarField(x, y + eps, z, balls) - scalarField(x, y - eps, z, balls)
  const dz = scalarField(x, y, z + eps, balls) - scalarField(x, y, z - eps, balls)
  const n = new THREE.Vector3(dx, dy, dz).normalize()
  return n
}

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

const clamp01 = (x: number) => (x < 0 ? 0 : x > 1 ? 1 : x)

// repeat words around ring
const ringWords = (phrase: string, repeats = 16, keepTogether = false) => {
  const base = keepTogether ? [phrase.trim()] : phrase.trim().split(/\s+/)
  const out: string[] = []
  for (let i = 0; i < repeats; i++) out.push(...base)
  return out
}

// simple meta field: sum(strength / (r^2 + eps))
function scalarField(
  x: number,
  y: number,
  z: number,
  balls: { p: THREE.Vector3; strength: number }[]
) {
  let s = 0
  for (let i = 0; i < balls.length; i++) {
    const dx = x - balls[i].p.x
    const dy = y - balls[i].p.y
    const dz = z - balls[i].p.z
    const r2 = dx * dx + dy * dy + dz * dz + 1e-6
    s += balls[i].strength / r2
  }
  return s
}

/** --------- marching cubes core (CPU) ---------- **/

type MCParams = {
  resolution: number // grid points per axis
  isoLevel: number // surface threshold
  bounds: number // half-size of cube in world units ([-b,+b])
  maxTrisHint?: number // prealloc hint
}

// interpolate vertex along an edge
function vertexInterp(
  iso: number,
  p1: THREE.Vector3,
  valp1: number,
  p2: THREE.Vector3,
  valp2: number,
  out: THREE.Vector3
) {
  const mu = (iso - valp1) / (valp2 - valp1)
  out.set(p1.x + mu * (p2.x - p1.x), p1.y + mu * (p2.y - p1.y), p1.z + mu * (p2.z - p1.z))
  return out
}

function buildIsoSurface(
  params: MCParams,
  balls: { p: THREE.Vector3; strength: number }[],
  geom: THREE.BufferGeometry,
  temp: {
    // temp buffers reused per frame
    verts: Float32Array
    norms: Float32Array
    positions: THREE.Vector3[]
    values: number[]
    edgeVerts: THREE.Vector3[]
  }
) {
  const { resolution: N, isoLevel, bounds } = params
  const step = (bounds * 2) / (N - 1)

  // sample cache for cube corners (8)
  const p = temp.positions
  const val = temp.values

  // edge temporary verts
  const ev = temp.edgeVerts

  let vertCount = 0

  // iterate over each cell (N-1)^3
  for (let xi = 0; xi < N - 1; xi++) {
    for (let yi = 0; yi < N - 1; yi++) {
      for (let zi = 0; zi < N - 1; zi++) {
        // corner positions
        const x = -bounds + xi * step
        const y = -bounds + yi * step
        const z = -bounds + zi * step

        p[0].set(x, y, z)
        p[1].set(x + step, y, z)
        p[2].set(x + step, y, z + step)
        p[3].set(x, y, z + step)
        p[4].set(x, y + step, z)
        p[5].set(x + step, y + step, z)
        p[6].set(x + step, y + step, z + step)
        p[7].set(x, y + step, z + step)

        // corner values
        for (let i = 0; i < 8; i++) {
          val[i] = scalarField(p[i].x, p[i].y, p[i].z, balls)
        }

        // cubeindex
        let cubeindex = 0
        if (val[0] < isoLevel) cubeindex |= 1
        if (val[1] < isoLevel) cubeindex |= 2
        if (val[2] < isoLevel) cubeindex |= 4
        if (val[3] < isoLevel) cubeindex |= 8
        if (val[4] < isoLevel) cubeindex |= 16
        if (val[5] < isoLevel) cubeindex |= 32
        if (val[6] < isoLevel) cubeindex |= 64
        if (val[7] < isoLevel) cubeindex |= 128

        const edges = edgeTable[cubeindex]
        if (edges === 0) continue

        // find the vertices where the surface intersects the cube
        if (edges & 1) vertexInterp(isoLevel, p[0], val[0], p[1], val[1], ev[0])
        if (edges & 2) vertexInterp(isoLevel, p[1], val[1], p[2], val[2], ev[1])
        if (edges & 4) vertexInterp(isoLevel, p[2], val[2], p[3], val[3], ev[2])
        if (edges & 8) vertexInterp(isoLevel, p[3], val[3], p[0], val[0], ev[3])
        if (edges & 16) vertexInterp(isoLevel, p[4], val[4], p[5], val[5], ev[4])
        if (edges & 32) vertexInterp(isoLevel, p[5], val[5], p[6], val[6], ev[5])
        if (edges & 64) vertexInterp(isoLevel, p[6], val[6], p[7], val[7], ev[6])
        if (edges & 128) vertexInterp(isoLevel, p[7], val[7], p[4], val[4], ev[7])
        if (edges & 256) vertexInterp(isoLevel, p[0], val[0], p[4], val[4], ev[8])
        if (edges & 512) vertexInterp(isoLevel, p[1], val[1], p[5], val[5], ev[9])
        if (edges & 1024) vertexInterp(isoLevel, p[2], val[2], p[6], val[6], ev[10])
        if (edges & 2048) vertexInterp(isoLevel, p[3], val[3], p[7], val[7], ev[11])

        // add triangles
        for (let i = 0; triTable[cubeindex * 16 + i] !== -1; i += 3) {
          const a = ev[triTable[cubeindex * 16 + i]]
          const b = ev[triTable[cubeindex * 16 + i + 1]]
          const c = ev[triTable[cubeindex * 16 + i + 2]]

          // positions
          const base = vertCount * 3
          temp.verts[base + 0] = a.x
          temp.verts[base + 1] = a.y
          temp.verts[base + 2] = a.z
          temp.verts[base + 3] = b.x
          temp.verts[base + 4] = b.y
          temp.verts[base + 5] = b.z
          temp.verts[base + 6] = c.x
          temp.verts[base + 7] = c.y
          temp.verts[base + 8] = c.z

          const na = sampleNormal(a.x, a.y, a.z, balls)
          const nb = sampleNormal(b.x, b.y, b.z, balls)
          const nc = sampleNormal(c.x, c.y, c.z, balls)

          temp.norms[base + 0] = na.x
          temp.norms[base + 1] = na.y
          temp.norms[base + 2] = na.z
          temp.norms[base + 3] = nb.x
          temp.norms[base + 4] = nb.y
          temp.norms[base + 5] = nb.z
          temp.norms[base + 6] = nc.x
          temp.norms[base + 7] = nc.y
          temp.norms[base + 8] = nc.z

          vertCount += 3
        }
      }
    }
  }

  // shrink/grow the draw range without realloc
  geom.setDrawRange(0, vertCount)
}

/** --------- R3F metaball mesh (CPU marching cubes) ---------- **/
function MCMetaballs({
  resolution = 64,
  bounds = 1.6,
  isoLevel = 6.5,
  getBalls,
}: {
  resolution?: number
  bounds?: number
  isoLevel?: number
  getBalls: () => { p: THREE.Vector3; strength: number }[]
}) {
  // prealloc arrays (worst-case triangles per cell ~5)
  const maxCells = (resolution - 1) ** 3
  const maxTris = Math.ceil(maxCells * 5)
  const maxVerts = maxTris * 3

  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(maxVerts * 3), 3))
    g.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(maxVerts * 3), 3))
    g.setDrawRange(0, 0)
    return g
  }, [maxVerts])

  // temp buffers reused each frame
  const temp = useMemo(() => {
    return {
      verts: (geom.getAttribute('position') as THREE.BufferAttribute).array as Float32Array,
      norms: (geom.getAttribute('normal') as THREE.BufferAttribute).array as Float32Array,
      positions: new Array(8).fill(0).map(() => new THREE.Vector3()),
      values: new Array(8).fill(0),
      edgeVerts: new Array(12).fill(0).map(() => new THREE.Vector3()),
    }
  }, [geom])

  const params = useMemo<MCParams>(
    () => ({ resolution, isoLevel, bounds }),
    [resolution, isoLevel, bounds]
  )

  // build each frame (fast enough at res ~ 40–56 on decent machines)
  useFrame(() => {
    const balls = getBalls()
    buildIsoSurface(params, balls, geom, temp)
    ;(geom.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true
    ;(geom.getAttribute('normal') as THREE.BufferAttribute).needsUpdate = true
  })

  return (
    <mesh geometry={geom}>
      <meshStandardMaterial color="#d0d2d6" metalness={1} roughness={0.1} />
    </mesh>
  )
}

/** --------- Text Ring ---------- **/

export function TextRing({
  words,
  radius,
  opacity,
  color = '#a8abb0',
  spin = 0.1,
  fontSize = 0.3,
  depthOffset = 0.015,
}: {
  words: string[]
  radius: number
  opacity: number
  color?: string
  spin?: number
  fontSize?: number
  depthOffset?: number
}) {
  const group = useRef<THREE.Group>(null!)

  useFrame((_, dt) => {
    if (spin && group.current) group.current.rotation.y += spin * dt
  })

  if (opacity <= 0.001) return null

  return (
    <group ref={group}>
      {words.map((w, i) => {
        const a = (i / words.length) * Math.PI * 2
        const x = Math.cos(a) * radius
        const z = Math.sin(a) * radius
        const rotation = [0, -a + Math.PI / 2, 0]

        return (
          <Text
            key={i}
            position={[x, 0, z - depthOffset]}
            rotation={rotation as [number, number, number]}
            fontSize={fontSize}
            color={color}
            material-toneMapped={false}
          >
            {w}
          </Text>
        )
      })}
    </group>
  )
}

/** --------- Page ---------- **/

export default function HomePage() {
  const router = useRouter()

  const [entered, setEntered] = useState(false)
  const [splitOn, setSplitOn] = useState(false)
  const splitRef = useRef(0)
  const animRef = useRef<{ from: number; to: number; t0: number; dur: number }>({
    from: 0,
    to: 0,
    t0: 0,
    dur: 450,
  })

  const trigger = useCallback(() => {
    // Prevent triggering again once split has happened
    if (splitOn) return
    if (!entered) setEntered(true)
    const now = performance.now()
    animRef.current = {
      from: splitRef.current,
      to: 1,
      t0: now,
      dur: 600,
    }
    setSplitOn(true)
  }, [entered, splitOn])

  // keyboard entry (still one-time)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault()
        trigger()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [trigger])

  // drive split animation
  const AnimationDriver = () => {
    useFrame(() => {
      const { from, to, t0, dur } = animRef.current
      if (from === to) return
      const t = clamp01((performance.now() - t0) / dur)
      splitRef.current = THREE.MathUtils.lerp(from, to, easeInOutCubic(t))
    })
    return null
  }

  const getBalls = useCallback(() => {
    const p = easeInOutCubic(splitRef.current)
    const offset = 1.5 * p
    const s = 3.5
    return [
      { p: new THREE.Vector3(-offset, 0, 0), strength: s },
      { p: new THREE.Vector3(+offset, 0, 0), strength: s },
    ]
  }, [])

  const mainWords = useMemo(() => ringWords('Alt World', 7, true), [])
  const leftWords = useMemo(() => ringWords('Platform', 8), [])
  const rightWords = useMemo(() => ringWords('Studio', 9), [])

  const p = splitRef.current
  const mainOpacity = splitOn ? 0 : p < 0.12 ? 1 : 0
  const childOpacity = p > 0.65 ? 1 : 0
  const textOffset = 1.5 * easeInOutCubic(p)

  return (
    <main
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        background: 'black',
        overflow: 'hidden',
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        camera={{ fov: 60, position: [0, 0, 4] }}
        style={{ position: 'absolute', inset: 0, background: 'transparent' }}
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).tagName.toLowerCase() === 'canvas') trigger()
        }}
      >
        <AnimationDriver />
        <GradientDome rotation={[0, Math.PI * 1.5, 0]} />
        <Environment
          preset="studio"
          background={false}
          backgroundIntensity={0.2}
          environmentIntensity={0.2}
        />

        <ambientLight intensity={0.25} />
        <directionalLight intensity={0.8} position={[5, 6, 4]} />
        <directionalLight intensity={0.3} position={[-5, -3, -2]} />

        <MCMetaballs resolution={64} bounds={3} isoLevel={4.5} getBalls={getBalls} />

        {mainOpacity > 0 && <TextRing words={mainWords} radius={1.7} opacity={mainOpacity} />}

        {childOpacity > 0 && (
          <>
            <group position={[-textOffset, 0, 0]}>
              <TextRing words={leftWords} radius={1.2} opacity={childOpacity} fontSize={0.2} />
              {/* clickable sphere area */}
              <mesh onClick={() => router.push('/platform')} position={[0, 0, 0]}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial transparent opacity={0} />
              </mesh>
            </group>

            <group position={[textOffset, 0, 0]}>
              <TextRing words={rightWords} radius={1.2} opacity={childOpacity} fontSize={0.2} />
              {/* clickable sphere area */}
              <mesh onClick={() => router.push('/studio')} position={[0, 0, 0]}>
                <sphereGeometry args={[1.2, 32, 32]} />
                <meshBasicMaterial transparent opacity={0} />
              </mesh>
            </group>
          </>
        )}
      </Canvas>

      {!entered && (
        <button
          onClick={trigger}
          className="text-3xl"
          style={{
            position: 'absolute',
            left: '50%',
            bottom: '8vh',
            transform: 'translateX(-50%)',
            color: '#ECEFF3',
            letterSpacing: '0.2em',
            cursor: 'pointer',
            opacity: 0.7,
          }}
          aria-label="Enter Alt World"
        >
          [ ENTER ]
        </button>
      )}
    </main>
  )
}
