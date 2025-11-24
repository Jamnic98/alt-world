'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { imageFolder } from '@/constants'

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VANTA: any
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THREE: any
  }
}

export default function VantaBackground() {
  const vantaRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const effectRef = useRef<any>(null)

  useEffect(() => {
    window.THREE = THREE

    const script = document.createElement('script')
    script.src = '/js/vanta.clouds2.min.js'
    script.onload = () => {
      if (vantaRef.current && window.VANTA?.CLOUDS2) {
        effectRef.current = window.VANTA.CLOUDS2({
          el: vantaRef.current,
          THREE,
          backgroundColor: 0x0,
          skyColor: 0x888888,
          cloudColor: 0xffffff,
          texturePath: `${imageFolder}/noise.webp`,
          speed: 0.8,
        })
      }
    }
    document.body.appendChild(script)

    return () => {
      effectRef.current?.destroy()
      document.body.removeChild(script)
    }
  }, [])

  return <div ref={vantaRef} className="absolute inset-0 z-0 w-full h-full" />
}
