/* eslint-disable react/no-unescaped-entities */
'use client'

import { FaInstagram } from 'react-icons/fa'

import { ImageSlideshow } from '@/components'
import { SLIDESHOW_IMAGES, WE_ARE_ALT_STUDIO_INSTAGRAM } from '@/constants'

export const StudioPage = () => {
  return (
    <section className="relative min-h-screen bg-black text-gray-200 flex flex-col justify-between items-center px-6 md:px-16 py-10 overflow-hidden">
      {/* Instagram Icon */}
      <a
        href={WE_ARE_ALT_STUDIO_INSTAGRAM}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 text-gray-400 hover:text-gray-100 transition-colors duration-200"
        aria-label="Visit our studio Instagram"
      >
        <FaInstagram size={28} />
      </a>

      {/* Text content */}
      <div className="max-w-4xl text-center space-y-6 flex-grow flex flex-col justify-center">
        <header className="text-center space-y-4 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-gray-400 to-gray-600">
            STUDIO
          </h1>

          <p className="text-xs sm:text-sm md:text-base uppercase tracking-[0.25em] text-gray-500 font-light leading-relaxed max-w-2xl mx-auto border-t border-gray-800 pt-4">
            Placement & Talent Strategy&nbsp;&nbsp;|&nbsp;&nbsp;Brand
            Building&nbsp;&nbsp;|&nbsp;&nbsp;Image Consulting&nbsp;&nbsp;|&nbsp;&nbsp;Creative
            Project Management&nbsp;&nbsp;|&nbsp;&nbsp;Partnerships
          </p>
        </header>

        <div className="space-y-5 text-gray-400 font-light">
          <p className="text-lg leading-relaxed">
            <span className="text-gray-200 font-medium">ALT WORLD Studio</span> is the creative
            engine behind our platform — where bold ideas, community connection, and cultural
            strategy come to life. We lead special projects that connect BIPOC talent to their
            communities and the wider industry, including fashion week placements, curated brand
            partnerships, and culturally aligned activations.
          </p>

          <p className="text-lg leading-relaxed">
            The studio also supports creatives in developing and protecting their own IP — from
            concept to execution — helping bring original ideas into the world with clarity and
            integrity. Whether it's producing immersive experiences or building long-term brand
            relationships, <span className="text-gray-200 font-medium">ALT WORLD Studio</span> is
            dedicated to elevating the next generation of creative leaders.
          </p>
        </div>
      </div>

      {/* Compact slideshow */}
      <div className="w-full max-w-[1800px] mt-8">
        <ImageSlideshow images={SLIDESHOW_IMAGES} />
      </div>
    </section>
  )
}

export default StudioPage
