import type { Metadata } from 'next'
import { Orbitron, Exo_2, Space_Mono } from 'next/font/google'
import './globals.css'

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
})

const exo2 = Exo_2({
  subsets: ['latin'],
  variable: '--font-exo2',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-spacemono',
  display: 'swap',
  weight: ['400', '700'],
})

export const metadata: Metadata = {
  title: 'aliencatai — Reveal Your True Alien Form',
  description: 'ran an AI on 10,000 human faces. 47% weren\'t human. Free alien face swap powered by AI.',
  keywords: ['alien', 'face swap', 'AI', 'alien cat', 'species', 'UFO', 'meme'],
  openGraph: {
    title: 'aliencatai — Reveal Your True Alien Form',
    description: 'ran an AI on 10,000 human faces. 47% weren\'t human. you should probably check.',
    siteName: 'aliencatai',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'aliencatai — Reveal Your True Alien Form',
    description: 'ran an AI on 10,000 human faces. 47% weren\'t human. you should probably check.',
    creator: '@alienaixyz',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`min-h-full flex flex-col font-sans ${orbitron.variable} ${exo2.variable} ${spaceMono.variable}`}>{children}</body>
    </html>
  )
}
