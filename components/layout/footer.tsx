import Link from 'next/link'

const Footer = () => {
  return (
    <footer className='grid grid-cols-2 bg-gray-900'>
      <div className='p-4 flex flex-col space-y-2'>
        <h3 className='text-gray-300'>Szybkie linki</h3>
        <Link className='text-gray-400 text-sm pl-2' href='/'>
          Strona Główna
        </Link>
        <Link className='text-gray-400 text-sm pl-2' href='/o-mnie'>
          O mnie
        </Link>
        <Link className='text-gray-400 text-sm pl-2' href='/oferta'>
          Oferta
        </Link>
        <Link className='text-gray-400 text-sm pl-2' href='/kontakt'>
          Kontakt
        </Link>
      </div>
      <div className='p-4 flex flex-col space-y-2'>
        <h3 className='text-gray-300'>Oferta</h3>
        <Link className='text-gray-400 text-sm pl-2' href='/oferta/doradztwo-sprzetowe'>
          Doradztwo sprzętowe
        </Link>
        <Link className='text-gray-400 text-sm pl-2' href='/oferta/skladanie-komputerow'>
          Składanie PC
        </Link>
        <Link className='text-gray-400 text-sm pl-2' href='/oferta/tworzenie-stron-internetowych'>
          Tworzenie stron
        </Link>
        <Link className='text-gray-400 text-sm pl-2' href='/oferta/pomoc-techniczna'>
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
