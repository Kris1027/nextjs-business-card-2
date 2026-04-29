'use client'

import { Drawer } from '@base-ui/react/drawer'
import { ListIcon, XIcon } from '@phosphor-icons/react'
import Link from 'next/link'
import { useState } from 'react'
import { motion } from 'motion/react'
import { cn } from '@/lib/utils'
import type { NavLink } from '@/lib/nav-config'

type MobileNavDrawerProps = {
  links: ReadonlyArray<NavLink>
  pathname: string
  isActive: (pathname: string, href: string) => boolean
}

const MobileNavDrawer = ({ links, pathname, isActive }: MobileNavDrawerProps) => {
  const [open, setOpen] = useState(false)

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection='up'>
      <Drawer.Trigger
        aria-label='Otwórz menu'
        className='md:hidden inline-flex items-center justify-center p-4 cursor-pointer text-gray-300 hover:text-white transition-colors'
      >
        <ListIcon size={28} weight='bold' />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className='fixed inset-0 bg-black/60 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none' />
        <Drawer.Viewport className='fixed inset-0 z-50'>
          <Drawer.Popup
            className={cn(
              'fixed inset-0 flex flex-col items-center justify-center gap-2 bg-gray-900 px-8',
              'transition-transform duration-300 ease-out',
              'data-starting-style:-translate-y-full data-ending-style:-translate-y-full',
              'motion-reduce:transition-none'
            )}
          >
            <Drawer.Title className='sr-only'>Menu nawigacji</Drawer.Title>
            <Drawer.Close
              aria-label='Zamknij menu'
              className='absolute top-4 right-4 inline-flex items-center justify-center p-2 cursor-pointer text-gray-300 hover:text-white transition-colors'
            >
              <XIcon size={28} weight='bold' />
            </Drawer.Close>
            <nav aria-label='Główna nawigacja' className='flex flex-col items-center gap-6'>
              {links.map(link => {
                const active = isActive(pathname, link.href)
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative text-2xl font-medium cursor-pointer transition-colors',
                      active ? 'text-white' : 'text-gray-400 hover:text-gray-200'
                    )}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId='nav-underline-mobile'
                        className='absolute -bottom-1 left-0 right-0 h-0.5 bg-white motion-reduce:transition-none'
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                  </Link>
                )
              })}
            </nav>
          </Drawer.Popup>
        </Drawer.Viewport>
      </Drawer.Portal>
    </Drawer.Root>
  )
}

export default MobileNavDrawer
