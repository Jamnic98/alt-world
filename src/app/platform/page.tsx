/* eslint-disable react/no-unescaped-entities */
'use client'

import Image from 'next/image'
import { FaInstagram } from 'react-icons/fa'

import { ImageSlideshow } from '@/components'
import { SLIDESHOW_IMAGES, WE_ARE_ALT_WORLD_INSTAGRAM } from '@/constants'

export const PlatformPage = () => {
  return (
    <section className="relative min-h-screen bg-black text-gray-200 flex flex-col justify-between items-center px-6 md:px-16 py-10 overflow-hidden">
      {/* Instagram Icon */}
      <a
        href={WE_ARE_ALT_WORLD_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-100 transition-colors duration-200"
        aria-label="Visit our platform Instagram"
      >
        <FaInstagram size={28} />
      </a>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,360px)] items-center w-full max-w-6xl gap-4 flex-grow">
        {/* Left column: text */}
        <div className="space-y-6 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
            OUR PLATFORM
          </h1>

          <p className="text-lg leading-relaxed text-gray-400 font-light">
            At <span className="text-gray-200 font-medium">ALT WORLD</span>, we take the word
            platform seriously. To us, platforming means creating real, intentional spaces for
            underrepresented brands and creatives to be seen, heard, and valued. Through knowledge
            exchange, panel discussions, curated features, and global events, we spotlight BIPOC
            talent across fashion, beauty, music, and wellness — both online and in person.
          </p>

          <p className="text-lg leading-relaxed text-gray-400 font-light">
            From London to Accra, we've championed emerging voices and culture-shifting brands by
            giving them the visibility, tools, and networks they need to thrive. This isn't just
            exposure — it's elevation.
          </p>
        </div>

        {/* Right column: phone mockup */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative w-60">
            <Image
              src="/images/alt_deck.webp"
              alt="iPhone mockup"
              width={400}
              height={800}
              className="object-contain w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>

      {/* Compact slideshow at bottom */}
      <div className="w-full max-w-[1800px] mt-8">
        <ImageSlideshow images={SLIDESHOW_IMAGES} />
      </div>
    </section>
  )
}

export default PlatformPage
