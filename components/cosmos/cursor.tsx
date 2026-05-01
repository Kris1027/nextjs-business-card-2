'use client'

import { useEffect, useRef } from 'react'

export default function CosmosCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    const isFirefox = CSS.supports('-moz-appearance', 'none')
    const lerpFactor = isFirefox ? 0.5 : 0.3
    let x = innerWidth / 2,
      y = innerHeight / 2,
      tx = x,
      ty = y
    let raf: number

    const move = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('button, a, [data-interactive]')) {
        dot.classList.add('is-hover')
      } else {
        dot.classList.remove('is-hover')
      }
    }
    const loop = () => {
      x += (tx - x) * lerpFactor
      y += (ty - y) * lerpFactor
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      if (Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1) {
        raf = requestAnimationFrame(loop)
      } else {
        raf = 0
      }
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('pointermove', onOver)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('pointermove', onOver)
    }
  }, [])

  return <div ref={dotRef} className='cs-cursor' />
}
