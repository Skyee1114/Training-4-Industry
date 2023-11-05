import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Training 4 Industry',
  description: 'We pride ourselves in training people to the highest possible standards with safety being at the forefront of our business. Training 4 Industry aim to be the provider of choice, offering training solutions as a single contact to employers to provide continuity of service throughout their business. We provide excellent training and assessment services, meeting the needs of employers and learners, delivered by our own highly competent and specialist staff.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
