import Hero from '@/components/home/hero'
import ImageCarousel from '@/components/home/image-carousel'
import ServiceInfo from '@/components/home/service-info'

const Home = () => {
  return (
    <main className='p-4 space-y-4 max-w-7xl mx-auto'>
      <ImageCarousel />
      <ServiceInfo />
      <Hero />
    </main>
  )
}

export default Home
