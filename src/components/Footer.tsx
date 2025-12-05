'use client'

import Link from 'next/link'
import { FooterCopyright, MailingListForm } from '@/components'

const Footer = () => {
  return (
    <footer className="bg-gray-950 text-gray-200 py-12">
      <div className="max-w-6xl mx-auto px-12 flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Navigation links */}
        <div className="flex flex-col space-y-3 md:flex-1 min-w-[200px]">
          <h3 className="text-xl font-semibold mb-4">Explore</h3>
          <Link href="/about" className="hover:text-white transition-colors">
            About Us
          </Link>
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </div>

        {/* Contact info */}
        <div className="flex flex-col space-y-3 md:flex-1 min-w-[200px]">
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p>
            Email:{' '}
            <a
              href="mailto:hello@altworld.net"
              target="_blank"
              className="hover:text-white transition-colors"
            >
              hello@altworld.net
            </a>
          </p>
          <p>Location: London, UK</p>
        </div>

        {/* Mailing list */}
        <div className="md:flex-1 min-w-[200px]">
          <MailingListForm title="Join the Family" />
        </div>
      </div>

      <FooterCopyright />
    </footer>
  )
}

export default Footer
