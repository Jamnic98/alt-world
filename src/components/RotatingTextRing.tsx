import { useRef, useMemo } from 'react'
import * as THREE from 'three'
import { extend, useFrame } from '@react-three/fiber'
import { FontLoader, TextGeometry } from 'three/examples/jsm/Addons.js'
import helvetikerFontJSON from 'three/examples/fonts/helvetiker_regular.typeface.json'

extend({ TextGeometry })

const bendTextGeometry = (geom: TextGeometry, radius: number) => {
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

const RotatingTextRing = ({
  text,
  radius,
  color = '#888',
  spin,
  fontSize,
  depth,
  opacity,
  repeats,
  visible,
}: {
  text: string
  radius: number
  color?: string
  spin?: number
  fontSize?: number
  depth: number
  opacity: number
  repeats: number
  visible: boolean
}) => {
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
        metalness: 0,
        roughness: 1,
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

export default RotatingTextRing
