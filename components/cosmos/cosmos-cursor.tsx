'use client'

import { useEffect, useRef } from 'react'

export default function CosmosCursor() {
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return
    let x = innerWidth / 2,
      y = innerHeight / 2,
      tx = x,
      ty = y
    let raf: number

    const move = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    const onOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.closest('button, a, .cs-service-card, .cs-carousel-thumb')) {
        dot.classList.add('is-hover')
      } else {
        dot.classList.remove('is-hover')
      }
    }
    const loop = () => {
      x += (tx - x) * 0.3
      y += (ty - y) * 0.3
      dot.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', onOver)
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', onOver)
    }
  }, [])

  return <div ref={dotRef} className='cs-cursor' />
}
