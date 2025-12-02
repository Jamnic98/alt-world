'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

import { Footer, MailingListPopup } from '@/components'

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    // Only show popup on non-home pages and if not already shown
    if (pathname !== '/' && !sessionStorage.getItem('mailingPopupShown')) {
      const timer = setTimeout(() => {
        setShowPopup(true)
        sessionStorage.setItem('mailingPopupShown', 'true')
      }, 8000) // delay popup by 8s
      return () => clearTimeout(timer)
    }
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gray-800">{children}</main>

      {/* Mailing list popup */}
      {showPopup && <MailingListPopup open={showPopup} onClose={() => setShowPopup(false)} />}
      <Footer />
    </div>
  )
}
