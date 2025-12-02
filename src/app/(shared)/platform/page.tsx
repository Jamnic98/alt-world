'use client'

import Image from 'next/image'

import { CaseStudy, Header } from '@/components'
import { caseStudies, imageFolder, videoFolder, WE_ARE_ALT_WORLD_INSTAGRAM } from '@/constants'

const PlatformPage = () => {
  return (
    <div>
      <Header
        logoSrc={`${imageFolder}/logos/alt_world.webp`}
        instagramUrl={WE_ARE_ALT_WORLD_INSTAGRAM}
      />
      <section className="relative min-h-screen flex flex-col justify-between items-center px-6 md:px-16 py-16 overflow-hidden">
        {/* Background video */}
        <video
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={`${videoFolder}/platform_page_bg_video.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        {/* Text Content */}
        <div className="relative z-20 mt-12 max-w-2xl text-center space-y-6 grow flex flex-col justify-center items-center px-4">
          <Image
            src={`${imageFolder}/our_platform.webp`}
            alt="Our Platform Title"
            width={500}
            height={100}
            className="w-68 sm:w-72 md:w-[500px] h-auto"
          />

          <div className="space-y-8 max-w-4xl mx-auto text-white">
            <p className="tracking-[0.3em] text-white font-bold leading-relaxed max-w-2xl mx-auto border-t border-white pt-4 text-xs sm:text-sm md:text-base">
              ACCESS&nbsp;&nbsp;
              <span className="text-lg sm:text-xl font-light">|</span>
              &nbsp;&nbsp;INNOVATION&nbsp;&nbsp;
              <span className="text-lg sm:text-xl font-light">|</span>
              &nbsp;&nbsp;SPOTLIGHTING
            </p>

            <p className="text-lg font-light leading-relaxed text-white">
              Alt World is a global platform empowering POC fashion creatives and championing
              underrepresented talent. We make the exclusive inclusive through panel events,
              knowledge exchange, digital spotlights, and brand partnerships focused on amplifying
              next-gen voices across fashion, culture, and community.
            </p>
          </div>

          {/* Caption */}
          <p className="text-sm font-semibold leading-relaxed text-white">
            #ALTWorld #MakingExclusiveInclusive
          </p>
        </div>
      </section>
      <section>
        {caseStudies.map((caseStudy) => (
          <CaseStudy key={caseStudy.title} {...caseStudy} />
        ))}
      </section>
    </div>
  )
}

export default PlatformPage
