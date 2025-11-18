import { useEffect, useRef, useState } from 'react'

import * as THREE from 'three'
import { TextureLoader } from 'three'
import { useFrame, useLoader, useThree } from '@react-three/fiber'

import { RotatingTextRing } from '@/components'

const useResponsiveScale = () => {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const updateScale = () => {
      const w = window.innerWidth
      // Adjust these breakpoints & ratios as needed
      if (w < 500) setScale(0.7)
      else if (w < 800) setScale(0.9)
      else if (w < 1200) setScale(1.1)
      else setScale(1.4)
    }

    updateScale()
    window.addEventListener('resize', updateScale)
    return () => window.removeEventListener('resize', updateScale)
  }, [])

  return scale
}

const SphereScene = ({
  onClickEnter,
  zooming,
  setZooming,
  showTextRing,
}: {
  onClickEnter: () => void
  zooming: boolean
  setZooming: (b: boolean) => void
  showTextRing: boolean
}) => {
  const texture = useLoader(TextureLoader, '/images/globe.webp')
  const sphereRef = useRef<THREE.Mesh | null>(null)
  const { camera } = useThree()
  const [opacity, setOpacity] = useState(1)
  const scale = useResponsiveScale()

  useFrame((state, dt) => {
    if (!sphereRef.current) return

    sphereRef.current.rotation.y += 0.08 * dt
    sphereRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05

    if (zooming) {
      camera.position.lerp(new THREE.Vector3(0, 0, 0.5), 0.05)
      camera.updateProjectionMatrix()

      setOpacity((prev) => Math.max(0, prev - 0.03))
      const mat = sphereRef.current.material as THREE.MeshStandardMaterial
      mat.opacity = opacity
      mat.transparent = true

      if (camera.position.z < 0.6) {
        setZooming(false)
        onClickEnter()
      }
    }
  })

  return (
    <>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <directionalLight position={[-5, -2, -3]} intensity={1.2} />

      <mesh
        ref={sphereRef}
        position={[0, 0, 0]}
        onClick={() => setZooming(true)}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
        scale={[scale, scale, scale]}
      >
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          color="#eee"
          metalness={0.8}
          roughness={0.3}
          transparent
          opacity={opacity}
        />
      </mesh>

      <RotatingTextRing
        text="ALT WORLD"
        repeats={3}
        radius={1.5 * scale}
        fontSize={0.3 * scale}
        opacity={1}
        spin={0.07}
        depth={0.06 * scale}
        visible={showTextRing}
      />
    </>
  )
}

export default SphereScene
