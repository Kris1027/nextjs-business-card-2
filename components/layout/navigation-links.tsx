import Link from 'next/link'

const NavigationLinks = () => {
  return (
    <nav className='text-gray-300 text-sm p-4 space-x-4'>
      <Link href='/'>Strona Główna</Link>
      <Link href='/about'>O mnie</Link>
      <Link href='/'>Usługi</Link>
      <Link href='/'>Kontakt</Link>
    </nav>
  )
}

export default NavigationLinks
