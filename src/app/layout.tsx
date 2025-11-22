import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'

import '@/styles/tailwind.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Alt World',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="en">
    <head>
      {/* <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="beforeInteractive"
      /> */}
      {/* <Script
        src="https://cdn.jsdelivr.net/npm/vanta/dist/vanta.clouds2.min.js"
        strategy="beforeInteractive"
      /> */}
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
  </html>
)

export default RootLayout
