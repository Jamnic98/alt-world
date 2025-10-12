'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { SCROLL_SPEED } from '@/constants'

interface ImageSlideshowProps {
  images: { src: string; alt?: string }[]
}

const ImageSlideshow = ({ images }: ImageSlideshowProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    let offset = 0
    const step = () => {
      offset -= SCROLL_SPEED
      el.style.transform = `translateX(${offset}px)`

      if (Math.abs(offset) >= el.scrollWidth / 2) offset = 0
      requestAnimationFrame(step)
    }

    const id = requestAnimationFrame(step)
    return () => cancelAnimationFrame(id)
  }, [])

  const doubled = [...images, ...images]

  return (
    <div className="relative w-full overflow-hidden bg-transparent">
      <div
        ref={containerRef}
        className="flex w-max items-center"
        style={{
          willChange: 'transform',
          transition: 'transform 0.1s linear',
        }}
      >
        {doubled.map((img, i) => (
          <div
            key={i}
            className="flex-shrink-0 relative h-[50vh] w-auto flex items-center justify-center px-2"
          >
            <Image
              src={img.src}
              alt={img.alt || ''}
              width={800}
              height={600}
              className="object-contain h-full w-auto"
              priority={i < 2}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageSlideshow
