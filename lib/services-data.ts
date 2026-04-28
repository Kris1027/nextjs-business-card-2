import type { Icon } from '@phosphor-icons/react'
import { Cpu, Desktop, Globe, Wrench } from '@phosphor-icons/react/dist/ssr'
import type { StaticImageData } from 'next/image'
import PcImage1 from '@/public/pc-1.jpg'
import PcImage2 from '@/public/pc-2.jpg'
import WebImage1 from '@/public/web-1.jpg'
import HelpImage1 from '@/public/help-1.webp'

export type Service = {
  slug: string
  title: string
  shortDescription: string
  description: string
  features: string[]
  Icon: Icon
  image: StaticImageData
  imageAlt: string
}

export const services: Service[] = [
  {
    slug: 'consulting',
    title: 'Doradztwo w doborze sprzętu',
    shortDescription: 'Skład komponentów dopasowany do Ciebie',
    description:
      'Pomagam wybrać komponenty idealnie dopasowane do Twoich potrzeb i budżetu. Nie przepłacasz za zbędną moc ani nie kupujesz sprzętu poniżej swoich wymagań.',
    features: [
      'Analiza potrzeb i budżetu',
      'Dobór komponentów PC lub laptopa',
      'Porównanie ofert i sklepów',
      'Konsultacja online lub na miejscu',
    ],
    Icon: Cpu,
    image: PcImage1,
    imageAlt: 'Zestaw komputerowy',
  },
  {
    slug: 'pc-building',
    title: 'Składanie komputerów',
    shortDescription: 'Składam komputery na gotowo i ogarniam całą konfigurację',
    description:
      'Składam zestawy komputerowe od podstaw — od doboru komponentów, przez montaż, po pełną konfigurację systemu i oprogramowania. Efekt: gotowy do pracy sprzęt bez stresu.',
    features: [
      'Montaż komponentów',
      'Instalacja systemu i sterowników',
      'Konfiguracja BIOS/UEFI',
      'Testy wydajności i stabilności',
    ],
    Icon: Desktop,
    image: PcImage2,
    imageAlt: 'Zestaw komputerowy',
  },
  {
    slug: 'web-development',
    title: 'Tworzenie stron internetowych',
    shortDescription: 'Strony, które są szybkie, czytelne i skuteczne',
    description:
      'Tworzę nowoczesne strony internetowe zoptymalizowane pod kątem szybkości, SEO i użyteczności. Każda strona jest responsywna i dostosowana do urządzeń mobilnych.',
    features: [
      'Responsywny design (mobile-first)',
      'Optymalizacja SEO',
      'Wysoka wydajność (Core Web Vitals)',
      'Integracja z CMS lub backendem',
    ],
    Icon: Globe,
    image: WebImage1,
    imageAlt: 'Ekran z programowania strony internetowej',
  },
  {
    slug: 'support',
    title: 'Pomoc techniczna i konfiguracja systemu',
    shortDescription: 'Gdy komputer sprawia problemy, zajmuję się tym za Ciebie',
    description:
      'Diagnozuję i rozwiązuję problemy z komputerem — od wirusów, przez awarie systemu, po optymalizację i konfigurację sprzętu. Działam szybko i skutecznie.',
    features: [
      'Diagnoza usterek sprzętu i oprogramowania',
      'Usuwanie wirusów i złośliwego oprogramowania',
      'Reinstalacja i konfiguracja systemu',
      'Optymalizacja działania komputera',
    ],
    Icon: Wrench,
    image: HelpImage1,
    imageAlt: 'Sfrustrowana osoba z problemem na laptopie',
  },
]
