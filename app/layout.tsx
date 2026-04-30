import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'
import CosmosBackground from '@/components/cosmos/cosmos-background'
import CosmosCursor from '@/components/cosmos/cosmos-cursor'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Składanie komputerów Kraków | Strony internetowe | zaruszaj.pl',
    template: '%s | zaruszaj.pl',
  },
  description:
    'Składanie komputerów na zamówienie Kraków - doradztwo sprzętowe, upgrade i pomoc techniczna. Tworzenie nowoczesnych stron internetowych dla firm i klientów indywidualnych.',
  keywords: [
    'składanie komputerów Kraków',
    'komputer na zamówienie Kraków',
    'upgrade komputera Kraków',
    'serwis komputerowy Kraków',
    'tworzenie stron internetowych Kraków',
  ],
  metadataBase: new URL('https://zaruszaj.pl'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pl' className={jetbrainsMono.variable}>
      <body>
        <CosmosBackground />
        <CosmosCursor />
        <div className='cs-app'>
          <Header />
          <main className='cs-main'>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
