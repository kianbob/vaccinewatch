import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import AgeExplorerClient from './AgeExplorerClient'

export const metadata: Metadata = {
  title: 'Age Explorer — Adverse Events by Age Group',
  description: 'Interactive tool to explore how vaccine adverse event reports vary by age group. See age distributions for any vaccine in the VAERS database.'
}

export default function AgeExplorerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Age Explorer' }
      ]} />

      <h1 className={`${playfairDisplay.className} text-4xl font-bold text-gray-900 mt-4 mb-2`}>
        Age Explorer
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Explore how vaccine adverse event reports are distributed across age groups. 
        Age patterns reflect both vaccine schedules and background health event rates — 
        not necessarily vaccine safety differences.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary">6</p>
          <p className="text-sm text-gray-500">age groups tracked</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary">65+</p>
          <p className="text-sm text-gray-500">highest death reports</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary">59%</p>
          <p className="text-sm text-gray-500">of reports are female</p>
        </div>
      </div>

      <AgeExplorerClient />

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-bold text-amber-900 mb-2">⚠️ Important Context</h3>
        <ul className="text-sm text-amber-800 space-y-2">
          <li>• <strong>Infant reports (0-2)</strong> reflect the intensive childhood vaccination schedule, not higher risk</li>
          <li>• <strong>Elderly reports (65+)</strong> reflect higher background mortality rates and more medical monitoring</li>
          <li>• <strong>Gender imbalance</strong> (59% female) may reflect reporting behavior differences, not risk differences</li>
          <li>• Age and gender data is self-reported and may contain errors</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className={`${playfairDisplay.className} text-xl font-bold mb-3`}>Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/analysis/age-patterns" className="text-primary hover:text-primary/80 text-sm">→ Age Patterns Deep Dive</a>
          <a href="/analysis/pediatric" className="text-primary hover:text-primary/80 text-sm">→ Pediatric Adverse Events</a>
          <a href="/analysis/elderly" className="text-primary hover:text-primary/80 text-sm">→ Elderly Adverse Events</a>
          <a href="/analysis/gender-patterns" className="text-primary hover:text-primary/80 text-sm">→ Gender Patterns</a>
        </div>
      </div>
    </div>
  )
}
