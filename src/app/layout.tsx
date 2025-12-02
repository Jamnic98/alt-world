import type { Metadata } from 'next'

import Head from 'next/head'
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
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
  </html>
)

export default RootLayout
