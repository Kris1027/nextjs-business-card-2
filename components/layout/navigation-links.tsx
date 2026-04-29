'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import { NAV_LINKS, isActive } from '@/lib/nav-config'
import MobileNavDrawer from './mobile-nav-drawer'

const NavigationLinks = () => {
  const pathname = usePathname()

  return (
    <div className='w-full flex items-center justify-end md:justify-center'>
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
                    'relative inline-block py-1 cursor-pointer transition-colors',
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
    </div>
  )
}

export default NavigationLinks
