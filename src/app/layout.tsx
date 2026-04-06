import type { Metadata } from 'next'
import './globals.css'

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
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  )
}
