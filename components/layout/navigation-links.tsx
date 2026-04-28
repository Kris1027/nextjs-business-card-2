import Link from 'next/link'

const NavigationLinks = () => {
  return (
    <nav className='text-gray-300 text-sm p-4 space-x-4'>
      <Link href='/'>Strona Główna</Link>
      <Link href='/o-mnie'>O mnie</Link>
      <Link href='/oferta'>Oferta</Link>
      <Link href='/kontakt'>Kontakt</Link>
    </nav>
  )
}

export default NavigationLinks
