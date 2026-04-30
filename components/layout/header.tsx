'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Strona Główna', code: '01' },
  { href: '/o-mnie', label: 'O mnie', code: '02' },
  { href: '/oferta', label: 'Oferta', code: '03' },
  { href: '/kontakt', label: 'Kontakt', code: '04' },
]

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

export default function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className='cs-header'>
      <div className='cs-header-inner'>
        <Link href='/' className='cs-brand'>
          <span className='cs-brand-glyph'>✺</span>
          <span className='cs-brand-text'>
            <span className='cs-brand-name'>zaruszaj.pl</span>
            <span className='cs-brand-sub'>// transmisja z orbity ── KRK</span>
          </span>
        </Link>

        <nav className='cs-nav'>
          {NAV_LINKS.map(l => {
            const active = isActive(pathname, l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                className={'cs-nav-link' + (active ? ' is-active' : '')}
              >
                <span className='cs-nav-code'>{l.code}</span>
                <span>{l.label}</span>
                {active && <span className='cs-nav-dot' />}
              </Link>
            )
          })}
        </nav>

        <button className='cs-nav-toggle' onClick={() => setOpen(o => !o)} aria-label='menu'>
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className='cs-nav-mobile'>
          {NAV_LINKS.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={'cs-nav-link' + (isActive(pathname, l.href) ? ' is-active' : '')}
              onClick={() => setOpen(false)}
            >
              <span className='cs-nav-code'>{l.code}</span>
              <span>{l.label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
