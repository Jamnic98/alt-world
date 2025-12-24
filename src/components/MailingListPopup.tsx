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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md p-6 mx-8 text-white bg-black rounded-lg"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute text-lg font-bold text-white cursor-pointer top-3 right-3"
            >
              ✕
            </button>
            {/* Top paragraph */}
            <Image
              alt="Waitlist form title"
              src="/images/titles/join-the-family.webp"
              width={150}
              height={50}
              className="mb-4"
            />
            <p className="my-4 text-white/80">Welcome To Our Home!</p>
            <p className="my-4 text-white/80">
              Hey bestie, we have some super cool things loading and we want to keep you in the
              loop!
            </p>
            <MailingListForm />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default MailingListPopup
