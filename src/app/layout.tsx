import { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { playfairDisplay } from '@/lib/fonts'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

const BASE_URL = 'https://vaccinewatch.org'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'VaccineWatch - VAERS Data Analysis',
    template: '%s | VaccineWatch'
  },
  description: '1.98 Million Vaccine Adverse Event Reports. Exposed. Explored. Explained. Transparent access to VAERS data for informed decision-making.',
  keywords: ['VAERS', 'vaccine', 'adverse events', 'safety', 'transparency', 'data'],
  authors: [{ name: 'VaccineWatch' }],
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: 'website',
    siteName: 'VaccineWatch',
    title: 'VaccineWatch - VAERS Data Analysis',
    description: '1.98 Million Vaccine Adverse Event Reports. Exposed. Explored. Explained.',
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
    title: 'VaccineWatch - VAERS Data Analysis',
    description: '1.98 Million Vaccine Adverse Event Reports. Exposed. Explored. Explained.',
    images: ['/og-image.png']
  },
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
            }),
          }}
        />
      </head>
      <body className="font-sans bg-gray-50 text-gray-900">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <BackToTop />
        </div>
      </body>
    </html>
  )
}