'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

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
    script.src = '/js/vanta.net.min.js'
    script.onload = () => {
      if (vantaRef.current && window.VANTA?.NET) {
        effectRef.current = window.VANTA.NET({
          el: vantaRef.current,
          THREE,
          backgroundColor: 0x0,
          color: 0xffff00,
          points: 20,
          spacing: 18,
          maxDistance: 20,
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
