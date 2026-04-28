'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import MobileNavDrawer from './mobile-nav-drawer'

const NAV_LINKS = [
  { href: '/', label: 'Strona Główna' },
  { href: '/o-mnie', label: 'O mnie' },
  { href: '/oferta', label: 'Oferta' },
  { href: '/kontakt', label: 'Kontakt' },
] as const

const isActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}

const NavigationLinks = () => {
  const pathname = usePathname()

  return (
    <>
      <nav aria-label='Główna nawigacja' className='hidden md:block text-gray-300 text-sm p-4'>
        <ul className='flex items-center gap-6'>
          {NAV_LINKS.map(link => {
            const active = isActive(pathname, link.href)
            return (
              <li key={link.href} className='relative'>
                <Link
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'relative inline-block py-1 transition-colors',
                    active ? 'text-white' : 'hover:text-white'
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId='nav-underline'
                      className='absolute -bottom-0.5 left-0 right-0 h-0.5 bg-white motion-reduce:hidden'
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <MobileNavDrawer links={NAV_LINKS} pathname={pathname} isActive={isActive} />
    </>
  )
}

export default NavigationLinks
