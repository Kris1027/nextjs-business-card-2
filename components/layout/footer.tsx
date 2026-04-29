import Link from 'next/link'
import { NAV_LINKS } from '@/lib/nav-config'
import { services } from '@/lib/services-data'

const Footer = () => {
  return (
    <footer className='bg-gray-900'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 py-10 max-w-7xl mx-auto'>
        <div className='flex flex-col gap-2'>
          <h3 className='text-gray-300 font-medium mb-1'>Szybkie linki</h3>
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              className='text-gray-400 text-sm pl-2 hover:text-gray-200 transition-colors'
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className='flex flex-col gap-2'>
          <h3 className='text-gray-300 font-medium mb-1'>Oferta</h3>
          {services.map(service => (
            <Link
              key={service.slug}
              className='text-gray-400 text-sm pl-2 hover:text-gray-200 transition-colors'
              href={`/oferta/${service.slug}`}
            >
              {service.title}
            </Link>
          ))}
        </div>

        <div className='flex flex-col gap-2'>
          <h3 className='text-gray-300 font-medium mb-1'>Kontakt</h3>
          <a
            className='text-gray-400 text-sm pl-2 hover:text-gray-200 transition-colors'
            href='mailto:kris1027.dev@gmail.com'
          >
            kris1027.dev@gmail.com
          </a>
          <a
            className='text-gray-400 text-sm pl-2 hover:text-gray-200 transition-colors'
            href='tel:+48792542841'
          >
            +48 792 542 841
          </a>
        </div>
      </div>

      <div className='border-t border-gray-800 px-6 py-4 max-w-7xl mx-auto'>
        <p className='text-gray-500 text-xs text-center'>
          © {new Date().getFullYear()} zaruszaj.pl Wszelkie prawa zastrzeżone.
        </p>
      </div>
    </footer>
  )
}

export default Footer
