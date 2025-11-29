'use client'

import { Footer } from '@/components'

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}
