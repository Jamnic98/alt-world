'use client'

import Image from 'next/image'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MailingListForm } from '@/components'

interface MailingListPopupProps {
  open: boolean
  onClose: () => void
}

const MailingListPopup = ({ open, onClose }: MailingListPopupProps) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 rounded-lg p-6 max-w-md w-full text-white relative mx-8"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-white hover:text-amber-400 text-lg font-bold cursor-pointer"
            >
              ✕
            </button>

            {/* Top paragraph */}
            <Image
              alt="form title"
              src="/images/titles/join-the-family.webp"
              width={150}
              height={50}
            />
            <p className="text-white/80 my-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua.
            </p>

            <MailingListForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MailingListPopup
