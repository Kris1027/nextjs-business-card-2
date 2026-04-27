'use client'

import Image, { type StaticImageData } from 'next/image'
import Autoplay from 'embla-carousel-autoplay'
import PcImage1 from '@/public/pc-1.jpg'
import PcImage2 from '@/public/pc-2.jpg'
import WebImage1 from '@/public/web-1.jpg'
import HelpImage1 from '@/public/help-1.webp'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'

type ImageItemProps = {
  imageUrl: StaticImageData
  altText: string
  title: string
}

const ImageItem = ({ imageUrl, altText, title }: ImageItemProps) => {
  return (
    <div className='relative aspect-video'>
      <Image
        src={imageUrl}
        alt={altText}
        fill
        sizes='(max-width: 1280px) 100vw, 1280px'
        className='object-cover rounded-lg'
        loading='eager'
      />
      <div className='absolute bottom-0 left-0 right-0 bg-black/50 text-white px-4 py-2 rounded-b-lg text-center'>
        <p className='text-2xl font-medium'>{title}</p>
      </div>
    </div>
  )
}

const ImageCarousel = () => {
  return (
    <Carousel className='w-full' plugins={[Autoplay({ delay: 3000 })]}>
      <CarouselContent>
        <CarouselItem>
          <ImageItem
            imageUrl={PcImage1}
            altText='Zestaw komputerowy'
            title='Doradztwo w doborze sprzętu'
          />
        </CarouselItem>
        <CarouselItem>
          <ImageItem
            imageUrl={PcImage2}
            altText='Zestaw komputerowy'
            title='Składanie komputerów'
          />
        </CarouselItem>
        <CarouselItem>
          <ImageItem
            imageUrl={WebImage1}
            altText='Ekran z programowania strony internetowej'
            title='Tworzenie stron internetowych'
          />
        </CarouselItem>
        <CarouselItem>
          <ImageItem
            imageUrl={HelpImage1}
            altText='Sfrustrowana osoba z problem na laptopie'
            title='Pomoc techniczna i konfiguracja systemu'
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}

export default ImageCarousel
