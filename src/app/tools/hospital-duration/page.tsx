import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import HospitalDurationClient from './HospitalDurationClient'

export const metadata: Metadata = {
  title: 'Vaccine Hospitalization Duration Explorer 2026 — VAERS Data',
  description: 'How long are vaccine-related hospital stays? Most are 1-3 days. Compare hospitalization duration across 100+ vaccines using VAERS adverse event data.',
  openGraph: {
    title: 'Vaccine Hospitalization Duration Explorer — VAERS Data',
    description: 'Compare vaccine-related hospital stay lengths across 100+ vaccines. Most VAERS-reported hospitalizations last just 1-3 days.',
  },
}

export default function HospitalDurationPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Hospital Duration' }
      ]} />

      <h1 className={`${playfairDisplay.className} text-4xl font-bold text-gray-900 mt-4 mb-2`}>
        Hospital Duration Explorer
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        How long are vaccine-related hospitalizations? Explore duration data across all vaccines in VAERS. 
        Most hospital stays are brief, typically 1–3 days for observation.
      </p>

      <HospitalDurationClient />
    </div>
  )
}
