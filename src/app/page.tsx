'use client'

import { motion, AnimatePresence } from 'framer-motion'

export default function HomePage() {
  return (
    <div className="relative w-full h-dvh ">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-24 z-20 -translate-y-28"
        >
          <a
            href="/studio"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest cursor-pointer select-none 
             transform transition-transform duration-200 hover:scale-105"
          >
            STUDIO
          </a>

          <a
            href="/platform"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-widest cursor-pointer select-none 
             transform transition-transform duration-200 hover:scale-105"
          >
            PLATFORM
          </a>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
