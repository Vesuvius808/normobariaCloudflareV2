import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Normobaria — The Future of Wellness',
  description:
    'Normobaria is a science-backed wellness therapy using optimized atmospheric pressure, elevated oxygen, CO₂, and molecular hydrogen to supercharge your cells, accelerate recovery, and slow aging.',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-nb-white scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&f[]=bespoke-stencil@400,700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-satoshi antialiased bg-nb-white text-nb-black">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
