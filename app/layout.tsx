import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
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
    <html lang="pl" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
