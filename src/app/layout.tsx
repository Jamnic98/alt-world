import type { Metadata } from 'next'

import Head from 'next/head'
import localFont from 'next/font/local'

import '@/styles/tailwind.css'

const zalandoSans = localFont({
  src: './fonts/ZalandoSansExpanded.ttf',
  variable: '--font-zalando-sans',
})

export const metadata: Metadata = {
  titleImageSrc: 'Alt World',
}

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang="en" className={`${zalandoSans.variable}`}>
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <body className="antialiased zalando">{children}</body>
  </html>
)

export default RootLayout
