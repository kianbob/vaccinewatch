import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import MultiVaccineClient from './MultiVaccineClient'

export const metadata: Metadata = {
  title: 'Multi-Vaccine Interaction Explorer — Vaccine Combinations in VAERS',
  description: 'Explore 1,514 vaccine combinations reported to VAERS. See which vaccines are most commonly given together and their adverse event statistics.',
}

export default function MultiVaccinePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Multi-Vaccine Explorer' }
      ]} />

      <h1 className={`${playfairDisplay.className} text-4xl font-bold text-gray-900 mt-4 mb-2`}>
        Multi-Vaccine Interaction Explorer
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        When multiple vaccines are administered at the same visit, adverse events get reported under 
        all vaccines given. This tool shows which combinations appear most frequently in VAERS and 
        their associated outcomes.
      </p>

      <ShareButtons title="Multi-Vaccine Interaction Explorer" url="https://vaccinewatch.org/tools/multi-vaccine" />

      <MultiVaccineClient />

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-bold text-amber-900 mb-2">⚠️ Important Context</h3>
        <ul className="text-sm text-amber-800 space-y-2">
          <li>• <strong>Co-administration is standard practice</strong> — multiple vaccines at one visit is routine, especially in childhood schedules</li>
          <li>• <strong>High report counts ≠ higher risk</strong> — common combinations naturally have more reports because more people receive them</li>
          <li>• <strong>Deaths and hospitalizations</strong> reflect patient outcomes after vaccination, not confirmed vaccine-caused events</li>
          <li>• VAERS cannot determine if a specific combination caused worse outcomes than individual vaccines</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className={`${playfairDisplay.className} text-xl font-bold mb-3`}>Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/analysis/multi-vaccine" className="text-primary hover:text-primary/80 text-sm">→ Multi-Vaccine Analysis</a>
          <a href="/analysis/pediatric" className="text-primary hover:text-primary/80 text-sm">→ Pediatric Adverse Events</a>
          <a href="/tools/dose-comparison" className="text-primary hover:text-primary/80 text-sm">→ Dose Comparison Tool</a>
          <a href="/tools/onset-calculator" className="text-primary hover:text-primary/80 text-sm">→ Onset Calculator</a>
        </div>
      </div>
    </div>
  )
}
