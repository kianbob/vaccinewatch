import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import BirthDefectsClient from './BirthDefectsClient'

export const metadata: Metadata = {
  title: 'Vaccine Birth Defects Explorer 2026 — VAERS Data',
  description: 'Explore birth defect reports in VAERS by vaccine type. 41 vaccines with reports, 3-4% background rate context, causation caveats, and vaccine safety data.',
  openGraph: {
    title: 'Vaccine Birth Defects Explorer — VAERS Data',
    description: 'Birth defect reports in VAERS by vaccine type, with background rate context and careful causation caveats.',
  },
}

export default function BirthDefectsPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Birth Defects Explorer' }
      ]} />

      <div className="bg-red-50 border border-red-200 rounded-xl p-4 mt-4 mb-6">
        <p className="text-sm text-red-800">
          <strong>⚠️ Sensitive Content:</strong> This page discusses birth defects reported to VAERS. 
          These are <strong>unverified reports</strong> — a VAERS report does NOT mean the vaccine caused the birth defect. 
          Birth defects occur in approximately 3% of all births regardless of vaccination status. 
          Always consult healthcare professionals for medical guidance.
        </p>
      </div>

      <h1 className={`${playfairDisplay.className} text-4xl font-bold text-gray-900 mb-2`}>
        Birth Defects Explorer
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Explore birth defect reports in VAERS by vaccine type. This data shows reports filed — not confirmed 
        causal relationships. Background birth defect rates and reporting biases must be considered.
      </p>

      <BirthDefectsClient />
    </div>
  )
}
