'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment } from '@react-three/drei'

import { SphereScene } from '@/components'
import { videoFolder } from '@/constants'

const HomePage = () => {
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
        <source src={`${videoFolder}/home-page-bg-video.mp4`} type="video/mp4" />
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

export default HomePage
