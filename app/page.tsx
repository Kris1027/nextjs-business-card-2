import Hero from '@/components/home/hero'
import ImageCarousel from '@/components/home/image-carousel'
import ServiceInfo from '@/components/home/service-info'
import PageWrapper from '@/components/layout/page-wrapper'

const Home = () => {
  return (
    <PageWrapper>
      <ImageCarousel />
      <ServiceInfo />
      <Hero />
    </PageWrapper>
  )
}

export default Home
