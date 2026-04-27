import AboutMe from '@/components/about/about-me'
import Technologies from '@/components/about/technologies'
import ProfilImage from '@/public/profil-1.jpg'
import Image from 'next/image'

const AboutPage = () => {
  return (
    <main className='p-4 space-y-4 max-w-7xl mx-auto'>
      <div className='flex flex-col sm:flex-row items-center gap-6'>
        <Image
          src={ProfilImage}
          alt='Profile Photo'
          className='rounded-full w-48 h-48 shrink-0 object-cover'
        />
        <AboutMe />
      </div>
      <Technologies />
    </main>
  )
}

export default AboutPage
