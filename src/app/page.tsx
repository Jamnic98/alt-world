'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import { SphereScene } from '@/components'

function VantaBackground() {
  const ref = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, /* vantaEffect */ setVantaEffect] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!ref.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any)._vantaWaves) return // already initialized

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let effect: any = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).VANTA && (window as any).VANTA.CLOUDS2) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      effect = (window as any).VANTA.CLOUDS2({
        el: ref.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        backgroundColor: '#000',
        skyColor: 0x0,
        cloudColor: 0x0,
        scale: 1.0,
        texturePath: './images/noise.png',
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any)._vantaWaves = effect
      setVantaEffect(effect)
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any)._vantaWaves === effect) {
        effect.destroy()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any)._vantaWaves
      }
    }
  }, [])

  return <div ref={ref} className="absolute inset-0 -z-10 pointer-events-none" />
}

export default function HomePage() {
  const [showLinks, setShowLinks] = useState(false)
  const [zooming, setZooming] = useState(false)

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      {/* Vanta background */}
      <VantaBackground />
      {/* R3F canvas */}
      <Canvas
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 0, 6] }}
        className="absolute inset-0 z-10"
      >
        {/* <Environment
          preset="studio"
          background={false}
          backgroundIntensity={0.1}
          environmentIntensity={0.3}
        /> */}
        <SphereScene
          zooming={zooming}
          setZooming={setZooming}
          onClickEnter={() => setShowLinks(true)}
          showTextRing={!zooming && !showLinks}
        />
      </Canvas>

      {/* UI overlay */}
      {/* {!zooming && !showLinks && (
        <button
          className="absolute bottom-28 left-1/2 -translate-x-1/2 text-3xl text-gray-300 z-20 font-semibold"
          aria-label="Enter Alt World"
        >
          <span className="text-4xl">[</span> ENTER <span className="text-4xl">]</span>
        </button>
      )} */}
      <AnimatePresence>
        {showLinks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-24 z-20 -translate-y-28"
          >
            <motion.a
              href="/studio"
              whileHover={{ scale: 1.05 }}
              className="text-gray-300 text-6xl font-bold uppercase tracking-widest cursor-pointer select-none"
            >
              STUDIO
            </motion.a>

            <motion.a
              href="/platform"
              whileHover={{ scale: 1.05 }}
              className="text-gray-300 text-6xl font-bold uppercase tracking-widest cursor-pointer select-none"
            >
              PLATFORM
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
