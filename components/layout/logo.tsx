import LogoImage from '@/public/logo-1.webp'
import Image from 'next/image'
import Link from 'next/link'

const Logo = () => {
  return (
    <Link href='/'>
      <Image src={LogoImage} alt='zaruszaj.pl logo' height={150} />
    </Link>
  )
}

export default Logo
