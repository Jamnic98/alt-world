'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { SLIDESHOW_SCROLL_SPEED } from '@/constants'
import { shuffleArray } from '@/lib/utils'

type ImageType = {
  src: string
  alt?: string
}

interface ImageSlideshowProps {
  images: ImageType[]
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const frameRef = useRef<number | null>(null)
  const [displayImages, setDisplayImages] = useState<ImageType[]>([])

  // Shuffle images on mount
  useEffect(() => {
    const shuffled = shuffleArray(images)
    setDisplayImages(shuffled)
  }, [images])

  // Start animation once images are set
  useEffect(() => {
    if (displayImages.length === 0) return

    const el = containerRef.current
    if (!el) return

    let offset = 0
    let animationRunning = false

    const startAnimation = () => {
      if (animationRunning) return
      animationRunning = true

      const step = () => {
        offset -= SLIDESHOW_SCROLL_SPEED
        el.style.transform = `translateX(${offset}px)`
        if (Math.abs(offset) >= el.scrollWidth / 2) offset = 0
        frameRef.current = requestAnimationFrame(step)
      }

      frameRef.current = requestAnimationFrame(step)
    }

    const resizeObserver = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (entry.contentRect.width > 0) {
        startAnimation()
      }
    })

    resizeObserver.observe(el)

    return () => {
      resizeObserver.disconnect()
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [displayImages])

  const doubled = [...displayImages, ...displayImages]

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
            className="flex-shrink-0 relative h-72 w-auto flex items-center justify-center px-2"
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
