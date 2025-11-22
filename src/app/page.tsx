'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'

import { SphereScene, VantaBackground } from '@/components'

export default function HomePage() {
  const [showLinks, setShowLinks] = useState(false)
  const [zooming, setZooming] = useState(false)

  return (
    <div className="relative w-full h-[100dvh] overflow-hidden">
      <VantaBackground />

      <Canvas
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        camera={{ fov: 50, position: [0, 0, 6] }}
        className="absolute inset-0 z-10"
      >
        <SphereScene
          zooming={zooming}
          setZooming={setZooming}
          onClickEnter={() => setShowLinks(true)}
          showTextRing={!zooming && !showLinks}
        />
      </Canvas>

      <AnimatePresence>
        {showLinks && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-24 z-20 -translate-y-28"
          >
            <a
              href="/studio"
              className="text-gray-300 text-6xl font-bold uppercase tracking-widest cursor-pointer select-none 
             transform transition-transform duration-200 hover:scale-105"
            >
              STUDIO
            </a>

            <a
              href="/platform"
              className="text-gray-300 text-6xl font-bold uppercase tracking-widest cursor-pointer select-none 
             transform transition-transform duration-200 hover:scale-105"
            >
              PLATFORM
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
