'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

import { VantaBackground } from '@/components'
import { imageFolder } from '@/constants'

export default function HomePage() {
  const [clicked, setClicked] = useState(false)

  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center z-20">
      <VantaBackground />

      <div className="z-20 flex flex-col items-center justify-center gap-12 -mt-12">
        {!clicked ? (
          <motion.div
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setClicked(true)}
            className="cursor-pointer select-none"
          >
            <Image
              src={`${imageFolder}/titles/altworld_stacked.webp`}
              alt="Alt World - Click to Enter"
              width={600}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col md:flex-row gap-60 items-center justify-center"
            >
              <Link
                href="/platform"
                className="cursor-pointer transform transition-transform duration-200 hover:scale-105"
              >
                <Image
                  src={`${imageFolder}/titles/platform.webp`}
                  alt="Platform Page Link"
                  width={500}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </Link>
              <Link
                href="/studio"
                className="cursor-pointer transform transition-transform duration-200 hover:scale-105"
              >
                <Image
                  src={`${imageFolder}/titles/studio.webp`}
                  alt="Studio Page Link"
                  width={400}
                  height={300}
                  className="rounded-lg shadow-lg"
                />
              </Link>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  )
}
