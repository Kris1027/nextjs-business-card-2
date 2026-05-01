'use client'

import Link from 'next/link'
import type { Service } from '@/lib/services'

type ServiceCardsProps = {
  services: Service[]
  variant?: 'preview' | 'detail'
}

export default function ServiceCards({ services, variant = 'preview' }: ServiceCardsProps) {
  const detail = variant === 'detail'
  return (
    <div className='cs-services-grid'>
      {services.map(s => (
        <div
          key={s.slug}
          className='cs-service-card'
          style={{ minHeight: detail ? 380 : 320 }}
          onMouseMove={e => {
            const el = e.currentTarget
            const a = Math.atan2(
              e.nativeEvent.offsetY - el.offsetHeight / 2,
              e.nativeEvent.offsetX - el.offsetWidth / 2
            )
            el.style.setProperty('--ang', `${a}rad`)
          }}
        >
          <div
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}
          >
            <span className='cs-service-glyph'>{s.glyph}</span>
            <span className='cs-service-desig'>{s.designation}</span>
          </div>
          <h3>{s.title}</h3>
          <p>{detail ? s.description : s.shortDescription}</p>
          <ul className='cs-service-features'>
            {(detail ? s.features : s.features.slice(0, 3)).map(f => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link href={`/oferta/${s.slug}`} className='btn-cosmic' style={{ marginTop: 'auto' }}>
            {detail ? 'Szczegóły usługi' : 'Czytaj więcej'}{' '}
            <span className='arrow'>→</span>
          </Link>
        </div>
      ))}
    </div>
  )
}
