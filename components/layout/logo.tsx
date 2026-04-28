import LogoImage from '@/public/logo-1.webp'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/' className='block leading-0 py-2 pl-4'>
      <Image src={LogoImage} alt='zaruszaj.pl logo' height={100} />
    </Link>
  )
}

export default Logo
