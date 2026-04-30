'use client'

import { useState } from 'react'
import SectionLabel from '@/components/cosmos/section-label'

const CONTACTS = [
  {
    label: 'Email',
    value: 'kris1027.dev@gmail.com',
    href: 'mailto:kris1027.dev@gmail.com',
    glyph: '✉',
    actionLabel: 'NAPISZ',
  },
  {
    label: 'Telefon / WhatsApp',
    value: '+48 792 542 841',
    href: 'tel:+48792542841',
    glyph: '☎',
    actionLabel: 'ZADZWOŃ',
  },
  { label: 'Discord', value: 'kris8927', href: null, glyph: '◬', actionLabel: null },
  {
    label: 'GitHub',
    value: 'github.com/Kris1027',
    href: 'https://github.com/Kris1027',
    glyph: '◯',
    actionLabel: 'OTWÓRZ',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/krzysztof-obarzanek',
    href: 'https://linkedin.com/in/krzysztof-obarzanek',
    glyph: '◊',
    actionLabel: 'OTWÓRZ',
  },
]

export default function KontaktPage() {
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copy = (k: string, v: string) => {
    if (navigator.clipboard) navigator.clipboard.writeText(v).catch(() => {})
    setCopiedKey(k)
    setTimeout(() => setCopiedKey(null), 1600)
  }

  return (
    <div className='cs-page cs-fade-in'>
      <section>
        <SectionLabel
          code='// 04'
          title='Kontakt'
          kicker='Otwórz kanał komunikacji — odpowiem szybko'
        />
        <div className='cs-contact-list'>
          {CONTACTS.map(it => (
            <div key={it.label} className='cs-contact-item'>
              <span className='cs-contact-icon'>{it.glyph}</span>
              <span className='cs-contact-label'>{it.label}</span>
              <span className='cs-contact-value'>{it.value}</span>
              <div className='cs-contact-actions'>
                {it.href && it.actionLabel && (
                  <a
                    className='cs-contact-btn'
                    href={it.href}
                    target={it.href.startsWith('http') ? '_blank' : undefined}
                    rel='noopener noreferrer'
                  >
                    {it.actionLabel} →
                  </a>
                )}
                <button className='cs-contact-btn' onClick={() => copy(it.label, it.value)}>
                  {copiedKey === it.label ? '✓ SKOPIOWANO' : 'KOPIUJ'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: 56,
            padding: 32,
            border: '1px solid var(--line)',
            borderRadius: 6,
            background: 'oklch(0.06 0.05 var(--theme-hue) / 0.4)',
          }}
        >
          <div
            style={{ fontSize: 11, color: 'var(--acc)', letterSpacing: '0.16em', marginBottom: 10 }}
          >
            {'// LOKALIZACJA'}
          </div>
          <div style={{ fontSize: 24, color: 'var(--ink-0)', marginBottom: 4 }}>Kraków, Polska</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', letterSpacing: '0.04em' }}>
            50.0647° N · 19.9450° E · sektor 7
          </div>
        </div>
      </section>
    </div>
  )
}
