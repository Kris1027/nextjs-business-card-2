import AboutMe from '@/components/about/about-me'
import Technologies from '@/components/about/technologies'
import PageWrapper from '@/components/layout/page-wrapper'
import ProfileImage from '@/public/profile-1.jpg'
import Image from 'next/image'

const AboutPage = () => {
  return (
    <PageWrapper>
      <div className='flex flex-col sm:flex-row items-center gap-6'>
        <Image
          src={ProfileImage}
          alt='Profile Photo'
          className='rounded-full w-48 h-48 shrink-0 object-cover'
        />
        <AboutMe />
      </div>
      <Technologies />
    </PageWrapper>
  )
}

export default AboutPage
