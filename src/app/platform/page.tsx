'use client'

import Image from 'next/image'
import { FaInstagram } from 'react-icons/fa'

import { ImageSlideshow } from '@/components'
import { SLIDESHOW_IMAGES, WE_ARE_ALT_WORLD_INSTAGRAM } from '@/constants'

export const PlatformPage = () => {
  return (
    <section className="relative min-h-screen bg-gray-100 flex flex-col justify-between items-center px-6 md:px-16 py-10 overflow-hidden">
      {/* Instagram Icon */}
      <a
        href={WE_ARE_ALT_WORLD_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 text-black hover:text-gray-400 transition-colors duration-200"
        aria-label="Visit our platform Instagram"
      >
        <FaInstagram size={28} />
      </a>

      <div className="space-y-6">
        <div className="max-w-4xl mt-20 text-center space-y-6 flex-grow flex flex-col justify-center">
          <header className="text-center space-y-4 max-w-3xl mx-auto text-black ">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-black ">
              OUR PLATFORM
            </h1>
          </header>

          <div className="space-y-5 text-black-400 font-light">
            <p className="text-lg leading-relaxed">
              ALT WORLD is a global platform empowering POC fashion creatives and championing
              underrepresented talent. We make the exclusive inclusive through panel events,
              knowledge exchange, digital spotlights, and brand partnerships focused on amplifying
              next-gen voices across fashion, culture, and community.
            </p>
          </div>
        </div>
        {/* Right column: phone mockup */}
        <div className="flex justify-center">
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
        <p className="text-sm leading-relaxed text-center font-semibold">
          #ALTWorld #MakingExclusiveInclusive
        </p>
      </div>

      {/* Compact slideshow at bottom */}
      <div className="w-full max-w-[1800px] mt-8">
        <ImageSlideshow images={SLIDESHOW_IMAGES} />
      </div>
    </section>
  )
}

export default PlatformPage
