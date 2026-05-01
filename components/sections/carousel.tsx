'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import GlowFrame from '@/components/cosmos/glow-frame';
import { services } from '@/lib/services';

const ITEMS = services.map((s) => ({
  src: s.image,
  label: s.title,
  code: s.designation,
}));

export default function HomeCarousel() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % ITEMS.length), 4500);
    return () => clearInterval(t);
  }, []);

  const cur = ITEMS[idx];

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
            data-interactive
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
  );
}
