'use client'

import Image from 'next/image'
import { Header, ImageSlideshow } from '@/components'
import {
  imageFolder,
  videoFolder,
  STUDIO_SLIDESHOW_IMAGES,
  WE_ARE_ALT_STUDIO_INSTAGRAM,
} from '@/constants'

const StudioPage = () => {
  return (
    <div>
      <Header
        logoSrc={`${imageFolder}/logos/alt_studio.webp`}
        instagramUrl={WE_ARE_ALT_STUDIO_INSTAGRAM}
      />
      <section className="relative min-h-screen flex flex-col justify-between items-center px-6 md:px-16 py-10 overflow-hidden">
        {/* Background video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={`${videoFolder}/studio_page_bg_video.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Text content */}
        <div className="relative z-20 mt-12 max-w-2xl text-center space-y-8 grow flex flex-col justify-center items-center px-4">
          <Image
            src={`${imageFolder}/our_studio.webp`}
            alt="Our Studio Title"
            width={400}
            height={100}
            className="w-52 sm:w-64 md:w-[400px] h-auto"
          />

          <p className="tracking-[0.3em] sm:tracking-[0.5em] text-white font-bold leading-relaxed max-w-2xl mx-auto border-t border-white pt-4 text-xs sm:text-sm md:text-base">
            BRANDS&nbsp;&nbsp;
            <span className="text-lg sm:text-xl font-light">|</span>
            &nbsp;&nbsp;IMAGE&nbsp;&nbsp;
            <span className="text-lg sm:text-xl font-light">|</span>
            &nbsp;&nbsp;IMPACT
          </p>

          <div className="space-y-5 text-white/90 font-light">
            <p className="text-lg leading-relaxed">
              We enjoy bridging the gap authentically between brands, POC talent and culture,
              because alignment takes skill. From placement strategy and PR, to talent and brand
              relations, our focus is simple: making exclusivity inclusive.
            </p>
          </div>
          <p className="text-sm leading-relaxed font-semibold text-white">
            #ALTStudio #ImageBrandImpact
          </p>
        </div>

        {/* Slideshow */}
        <div className="mt-8 z-20 w-full">
          <ImageSlideshow images={STUDIO_SLIDESHOW_IMAGES} />
        </div>
      </section>
    </div>
  )
}

export default StudioPage
