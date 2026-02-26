import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { playfairDisplay } from '@/lib/fonts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const BASE_URL = 'https://www.vaccinewatch.org'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'VaccineWatch — Vaccine Adverse Event Reports',
    template: '%s | VaccineWatch'
  },
  description: '1.98 Million Vaccine Adverse Event Reports. Exposed. Explored. Explained. Transparent access to VAERS data for informed decision-making.',
  keywords: ['VAERS', 'vaccine', 'adverse events', 'safety', 'transparency', 'data'],
  authors: [{ name: 'VaccineWatch' }],
  openGraph: {
    type: 'website',
    siteName: 'VaccineWatch',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'VaccineWatch'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.png']
  },
  alternates: { canonical: './' },
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfairDisplay.variable}`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K37SSPQD54" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-K37SSPQD54');`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'VaccineWatch',
              url: BASE_URL,
              description: '1.98 Million Vaccine Adverse Event Reports. Exposed. Explored. Explained.',
              publisher: {
                '@type': 'Organization',
                name: 'TheDataProject.ai',
                url: 'https://thedataproject.ai',
              },
              potentialAction: {
                '@type': 'SearchAction',
                target: `${BASE_URL}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="font-sans bg-gray-50 text-gray-900">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-xl focus:text-sm focus:font-medium"
        >
          Skip to main content
        </a>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main id="main-content" className="flex-grow" role="main">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  )
}