'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import helvetikerFontJSON from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { motion, AnimatePresence } from 'framer-motion'

import { TextureLoader } from 'three'
import { Environment } from '@react-three/drei'

extend({ TextGeometry })

function bendTextGeometry(geom: TextGeometry, radius: number) {
  const posAttr = geom.attributes.position
  const vertex = new THREE.Vector3()
  const depthOffset = new THREE.Vector3()

  for (let i = 0; i < posAttr.count; i++) {
    vertex.fromBufferAttribute(posAttr, i)
    depthOffset.set(0, 0, vertex.z)

    const theta = vertex.x / radius
    const sinTheta = Math.sin(theta)
    const cosTheta = Math.cos(theta)

    const x = radius * sinTheta
    const z = -radius * (1 - cosTheta) + depthOffset.z

    posAttr.setXYZ(i, x, vertex.y, z)
  }

  geom.computeVertexNormals()
}

export function RotatingTextRing({
  text,
  radius,
  color = '#bbb',
  spin = 0.1,
  fontSize = 0.3,
  depth = 0.04,
  opacity = 1,
  repeats = 6,
  visible,
}: {
  text: string
  radius: number
  color?: string
  spin?: number
  fontSize?: number
  depth?: number
  opacity?: number
  repeats?: number
  visible?: boolean
}) {
  const group = useRef<THREE.Group>(null!)
  const font = useMemo(() => new FontLoader().parse(helvetikerFontJSON), [])

  const words = useMemo(() => {
    const out: string[] = []
    for (let i = 0; i < repeats; i++) out.push(text)
    return out
  }, [text, repeats])

  const meshes = useMemo(() => {
    return words.map((word) => {
      const geom = new TextGeometry(word, {
        font,
        size: fontSize,
        depth,
        curveSegments: 12,
        bevelEnabled: false,
      })
      geom.center()
      bendTextGeometry(geom, radius)

      const mat = new THREE.MeshStandardMaterial({
        color,
        transparent: true,
        opacity,
        metalness: 0.0,
        roughness: 0.4,
      })
      return { geom, mat }
    })
  }, [words, font, fontSize, depth, radius, color, opacity])

  useFrame((_, dt) => {
    if (spin && group.current) group.current.rotation.y -= spin * dt
    meshes.forEach(({ mat }) => {
      if (mat.opacity !== opacity) mat.opacity = opacity
    })
  })

  if (!visible) return null
  return (
    <group ref={group}>
      {meshes.map(({ geom, mat }, i) => {
        const angle = (i / meshes.length) * Math.PI * 2
        const x = radius * Math.cos(angle)
        const z = radius * Math.sin(angle)
        const rotY = -angle + Math.PI / 2
        return (
          <mesh
            key={i}
            geometry={geom}
            material={mat}
            position={[x, 0, z]}
            rotation={[0, rotY, 0]}
          />
        )
      })}
    </group>
  )
}

function SphereScene({
  onClickEnter,
  zooming,
  setZooming,
  showTextRing,
}: {
  onClickEnter: () => void
  zooming: boolean
  setZooming: (b: boolean) => void
  showTextRing: boolean
}) {
  const texture = useLoader(TextureLoader, '/images/globe.jpg')
  const sphereRef = useRef<THREE.Mesh | null>(null)
  const { camera } = useThree()
  const [opacity, setOpacity] = useState(1)

  useFrame((state, dt) => {
    if (!sphereRef.current) return

    // idle rotation
    sphereRef.current.rotation.y += 0.08 * dt
    sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05

    // animate zoom & fade
    if (zooming) {
      camera.position.lerp(new THREE.Vector3(0, 0, 0.5), 0.05)
      camera.updateProjectionMatrix()

      setOpacity((prev) => Math.max(0, prev - 0.03))
      ;(sphereRef.current.material as THREE.MeshStandardMaterial).opacity = opacity
      ;(sphereRef.current.material as THREE.MeshStandardMaterial).transparent = true

      if (camera.position.z < 0.6) {
        setZooming(false)
        onClickEnter()
      }
    }
  })

  return (
    <>
      <ambientLight intensity={0.45} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
      <directionalLight position={[-5, -2, -3]} intensity={0.3} />

      <mesh
        ref={sphereRef}
        position={[0, 0, 0]}
        onClick={() => setZooming(true)}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
        scale={[1.5, 1.5, 1.5]}
      >
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          map={texture} // globe texture
          color="#ccc" // silver base
          metalness={1.0} // fully metallic
          roughness={0.1} // very smooth, reflective
          transparent
          opacity={opacity}
        />
      </mesh>

      <RotatingTextRing
        text="Alt World"
        repeats={5}
        radius={2.2}
        fontSize={0.4}
        depth={0.05}
        visible={showTextRing}
      />
    </>
  )
}

export default function HomePage() {
  const [showLinks, setShowLinks] = useState(false)
  const [zooming, setZooming] = useState(false)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100dvh', overflow: 'hidden' }}>
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <Canvas
          gl={{ alpha: true, antialias: true }}
          dpr={[1, 2]}
          camera={{ fov: 50, position: [0, 0, 6] }}
          style={{ width: '100%', height: '100%' }}
        >
          <Environment
            preset="studio"
            background={false}
            backgroundIntensity={0.2}
            environmentIntensity={0.5}
          />
          <SphereScene
            onClickEnter={() => setShowLinks(true)}
            zooming={zooming}
            setZooming={setZooming}
            showTextRing={!zooming && !showLinks}
          />
        </Canvas>

        {!zooming && !showLinks && (
          <button
            className="text-3xl text-center"
            style={{
              position: 'absolute',
              left: '50%',
              bottom: '8vh',
              transform: 'translateX(-50%)',
              color: '#ddd',
              letterSpacing: '0.2em',
              cursor: 'pointer',
              opacity: 1,
            }}
            aria-label="Enter Alt World"
          >
            <span className="text-4xl">[</span> ENTER <span className="text-4xl">]</span>
          </button>
        )}
      </div>

      <AnimatePresence>
        {showLinks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-20"
          >
            <motion.a
              href="/studio"
              whileHover={{ scale: 1.1 }}
              className="text-white text-3xl tracking-widest"
            >
              STUDIO
            </motion.a>
            <motion.a
              href="/platform"
              whileHover={{ scale: 1.1 }}
              className="text-white text-3xl tracking-widest"
            >
              PLATFORM
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
