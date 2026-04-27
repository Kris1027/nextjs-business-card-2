import Link from 'next/link'
import Logo from './logo'

const Footer = () => {
  return (
    <footer className='grid grid-cols-2 bg-gray-900'>
      <Logo />
      <div className='p-4 flex flex-col space-y-2'>
        <h3 className='text-gray-300'>Szybkie linki</h3>
        <Link className='text-gray-400 text-sm pl-2' href='/'>
          Strona Główna
        </Link>
        <Link className='text-gray-400 text-sm pl-2' href='/'>
          O mnie
        </Link>
        <Link className='text-gray-400 text-sm pl-2' href='/'>
          Kontakt
        </Link>
      </div>
      <div className='p-4 flex flex-col space-y-2'>
        <h3 className='text-gray-300'>Usługi</h3>
        <Link className='text-gray-400 text-sm pl-2' href='/'>
          Doradztwo sprzętowe
        </Link>
        <Link className='text-gray-400  text-sm pl-2' href='/'>
          Składanie PC
        </Link>
        <Link className='text-gray-400 text-sm pl-2' href='/'>
          Tworzenie stron
        </Link>
        <Link className='text-gray-400 text-sm pl-2' href='/'>
          Pomoc techniczna
        </Link>
      </div>
      <div className='p-4 flex flex-col space-y-2'>
        <h3 className='text-gray-300'>Kontakt</h3>
        <a className='text-gray-400 text-sm pl-2' href='mailto:kris1027.dev@gmail.com'>
          kris1027.dev@gmail.com
        </a>
        <a className='text-gray-400 text-sm pl-2' href='tel:+48792542841'>
          +48 792 542 841
        </a>
      </div>
    </footer>
  )
}

export default Footer
