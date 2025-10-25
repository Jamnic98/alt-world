'use client'

import { FaInstagram } from 'react-icons/fa'
import { ImageSlideshow } from '@/components'
import { SLIDESHOW_IMAGES, WE_ARE_ALT_STUDIO_INSTAGRAM } from '@/constants'

export const StudioPage = () => {
  return (
    <section className="relative min-h-screen flex flex-col justify-between items-center px-6 md:px-16 py-10 overflow-hidden text-black">
      {/* Background video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/output.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optional dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 z-10" />

      {/* Instagram Icon */}
      <a
        href={WE_ARE_ALT_STUDIO_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 text-white hover:text-gray-300 transition-colors duration-200 z-20"
        aria-label="Visit our studio Instagram"
      >
        <FaInstagram size={28} />
      </a>

      {/* Text content */}
      <div className="relative z-20 max-w-4xl text-center space-y-6 flex-grow flex flex-col justify-center">
        <header className="space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white">STUDIO</h1>

          <p className="tracking-[0.5em] text-white font-bold leading-relaxed max-w-2xl mx-auto border-t border-white pt-4">
            BRAND&nbsp;&nbsp;<span className="text-2xl font-light">|</span>&nbsp;&nbsp;
            IMAGE&nbsp;&nbsp;<span className="text-2xl font-light">|</span>&nbsp;&nbsp;IMPACT
          </p>
        </header>

        <div className="space-y-5 text-white/90 font-light">
          <p className="text-lg leading-relaxed">
            We enjoy bridging the gap authentically between brands, POC talent and culture, because
            alignment takes skill.
          </p>
          <p className="text-lg leading-relaxed">
            From placement strategy and PR, to talent and brand relations, our focus is simple:
            making exclusivity inclusive.
          </p>
        </div>
        <p className="text-sm leading-relaxed font-semibold text-white">
          #ALTStudio #ImageBrandImpact
        </p>
      </div>

      {/* Slideshow */}
      <div className="relative z-20 w-full max-w-[1800px]">
        <ImageSlideshow images={SLIDESHOW_IMAGES} />
      </div>
    </section>
  )
}

export default StudioPage
