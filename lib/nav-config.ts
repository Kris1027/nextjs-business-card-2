export type NavLink = { href: string; label: string }

export const NAV_LINKS: readonly NavLink[] = [
  { href: '/', label: 'Strona Główna' },
  { href: '/o-mnie', label: 'O mnie' },
  { href: '/oferta', label: 'Oferta' },
  { href: '/kontakt', label: 'Kontakt' },
]

export const isActive = (pathname: string, href: string): boolean => {
  if (href === '/') return pathname === '/'
  return pathname === href || pathname.startsWith(href + '/')
}
