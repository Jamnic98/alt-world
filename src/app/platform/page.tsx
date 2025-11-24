'use client'

import Image from 'next/image'
import { Header, ImageSlideshow } from '@/components'
import { imageFolder, PLATFORM_SLIDESHOW_IMAGES, WE_ARE_ALT_WORLD_INSTAGRAM } from '@/constants'

const PlatformPage = () => {
  return (
    <div>
      <Header variant="light" instagramUrl={WE_ARE_ALT_WORLD_INSTAGRAM} />

      <section className="relative min-h-screen flex flex-col justify-between items-center px-6 md:px-16 py-16 overflow-hidden">
        {/* Middle content: text + phone mockup */}
        <div className="flex flex-col justify-center flex-grow items-center space-y-12 w-full max-w-4xl text-center px-4 md:px-0 pt-16 pb-8">
          {/* Text */}
          <div className="space-y-6 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-black">
              OUR PLATFORM
            </h1>
            <p className="text-lg font-light leading-relaxed text-black-400">
              ALT WORLD is a global platform empowering POC fashion creatives and championing
              underrepresented talent. We make the exclusive inclusive through panel events,
              knowledge exchange, digital spotlights, and brand partnerships focused on amplifying
              next-gen voices across fashion, culture, and community.
            </p>
          </div>

          {/* Phone mockup */}
          <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] lg:max-w-[350px] mx-auto">
            <Image
              src={`${imageFolder}/alt-deck.webp`}
              alt="iPhone mockup"
              width={300}
              height={600}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Caption */}
          <p className="text-sm font-semibold leading-relaxed">
            #ALTWorld #MakingExclusiveInclusive
          </p>
        </div>
        {/* Slideshow pinned at bottom */}
        <div className="w-full mt-8">
          <ImageSlideshow images={PLATFORM_SLIDESHOW_IMAGES} />
        </div>
      </section>
    </div>
  )
}

export default PlatformPage
