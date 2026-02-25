import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import DoseComparisonClient from './DoseComparisonClient'

export const metadata: Metadata = {
  title: 'Dose Comparison Tool - First vs Second vs Booster Analysis',
  description: 'Compare adverse event patterns between first dose, second dose, and booster vaccinations. Interactive tool for exploring dose-specific VAERS data.'
}

export default function DoseComparisonPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' }, 
        { label: 'Dose Comparison' }
      ]} />

      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Dose Comparison Tool
        </h1>
        <p className="text-xl text-gray-600">
          Compare adverse event patterns across different vaccine doses. Explore how first doses, 
          second doses, and boosters differ in their VAERS reporting patterns.
        </p>
      </div>

      {/* Quick context */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">130%</div>
          <div className="text-xs text-gray-600 mt-1">more 2nd dose reports</div>
        </div>
        <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-accent">Expected</div>
          <div className="text-xs text-gray-600 mt-1">stronger immune response</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">3 doses</div>
          <div className="text-xs text-gray-600 mt-1">compared side-by-side</div>
        </div>
      </div>

      <DoseComparisonClient />

      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-bold text-blue-800 mb-2">Understanding Dose Differences</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Second doses often generate more reports due to stronger immune responses</li>
          <li>• This pattern is expected and reflects proper immune system functioning</li>
          <li>• Booster patterns may differ due to longer intervals and different demographics</li>
          <li>• Rate differences may reflect population characteristics, not inherent safety differences</li>
        </ul>
      </div>
    </div>
  )
}