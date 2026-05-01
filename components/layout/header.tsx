'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import BrandMark from '@/components/cosmos/brand-mark'
import { navLinks } from '@/lib/nav'

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
          <BrandMark size={52} animated />
          <span className='cs-brand-text'>
            <span className='cs-brand-name'>
              zaruszaj<span style={{ color: 'var(--acc)' }}>.pl</span>
            </span>
            <span className='cs-brand-sub'>{'// pc.builds × code.deploy ── KRK'}</span>
          </span>
        </Link>

        <nav className='cs-nav'>
          {navLinks.map(l => {
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
          {navLinks.map(l => (
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
