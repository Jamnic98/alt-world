'use client'

import Image from 'next/image'

import { Footer } from '@/components'
import { imageFolder } from '@/constants'

export default function SharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 bg-gray-800">{children}</main>
      <Footer />
    </div>
  )
}
