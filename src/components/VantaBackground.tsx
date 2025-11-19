'use client'

import { useEffect, useRef, useState } from 'react'

const VantaBackground = () => {
  const ref = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [, setVantaEffect] = useState<any>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!ref.current) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any)._vantaWaves) return // already initialized

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let effect: any = null
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((window as any).VANTA && (window as any).VANTA.CLOUDS2) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      effect = (window as any).VANTA.CLOUDS2({
        el: ref.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        backgroundColor: '#000',
        skyColor: 0x0,
        cloudColor: 0x0,
        scale: 1.0,
        texturePath: './images/noise.png',
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(window as any)._vantaWaves = effect
      setVantaEffect(effect)
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if ((window as any)._vantaWaves === effect) {
        effect.destroy()
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        delete (window as any)._vantaWaves
      }
    }
  }, [])

  return <div ref={ref} className="absolute inset-0 -z-10 pointer-events-none" />
}

export default VantaBackground
