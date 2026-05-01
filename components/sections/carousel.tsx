'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import PcImage1 from '@/public/pc-1.webp'
import PcImage2 from '@/public/pc-2.webp'
import WebImage1 from '@/public/web-1.jpg'
import HelpImage1 from '@/public/help-1.webp'
import GlowFrame from '@/components/cosmos/glow-frame'

const ITEMS = [
  { src: PcImage1, label: 'Doradztwo w doborze sprzętu', code: 'PROC-01' },
  { src: PcImage2, label: 'Składanie komputerów', code: 'BUILD-02' },
  { src: WebImage1, label: 'Tworzenie stron internetowych', code: 'WEB-03' },
  { src: HelpImage1, label: 'Pomoc techniczna', code: 'AID-04' },
]

export default function HomeCarousel() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ITEMS.length), 4500)
    return () => clearInterval(t)
  }, [])

  const cur = ITEMS[idx]

  return (
    <div className='cs-carousel'>
      <div className='cs-carousel-main'>
        <GlowFrame
          key={cur.code}
          src={cur.src}
          alt={cur.label}
          ratio='16/10'
          designation={cur.code}
          label={cur.label}
          priority
        />
      </div>
      <div className='cs-carousel-thumbs'>
        {ITEMS.map((it, i) => (
          <div
            key={it.code}
            className={'cs-carousel-thumb' + (i === idx ? ' is-active' : '')}
            onClick={() => setIdx(i)}
          >
            <Image src={it.src} alt={it.label} fill sizes='200px' />
            <div className='cs-carousel-thumb-label'>
              {it.code} ── {it.label}
            </div>
            {i === idx && (
              <div
                key={idx}
                className='cs-carousel-progress'
                style={{ animation: 'progress 4.5s linear' }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
