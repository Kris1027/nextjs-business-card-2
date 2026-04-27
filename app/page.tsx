import ImageCarousel from '@/components/home/image-carousel'
import ServiceInfo from '@/components/home/service-info'

const Home = () => {
  return (
    <main className='p-4 space-y-4'>
      <ImageCarousel />
      <ServiceInfo />
    </main>
  )
}

export default Home
