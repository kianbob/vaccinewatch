import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import DoseExplorerClient from './DoseExplorerClient'

export const metadata: Metadata = {
  title: 'Dose Series Explorer — 1st vs 2nd vs 3rd Dose',
  description: 'Interactive tool comparing adverse event reports across vaccine dose numbers. See how 1st dose, 2nd dose, and booster reports differ for any vaccine.'
}

export default function DoseExplorerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Dose Series Explorer' }
      ]} />

      <h1 className={`${playfairDisplay.className} text-4xl font-bold text-gray-900 mt-4 mb-2`}>
        Dose Series Explorer
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Compare adverse event reports across different dose numbers for any vaccine. 
        See how report patterns change from 1st dose through boosters.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary">104</p>
          <p className="text-sm text-gray-500">vaccines with dose data</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-accent">Up to 6+</p>
          <p className="text-sm text-gray-500">doses tracked per vaccine</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-danger">Dose 1</p>
          <p className="text-sm text-gray-500">typically has most reports</p>
        </div>
      </div>

      <DoseExplorerClient />

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-bold text-amber-900 mb-2">⚠️ Interpreting Dose Data</h3>
        <ul className="text-sm text-amber-800 space-y-2">
          <li>• <strong>First doses typically have more reports</strong> because more people receive dose 1 than subsequent doses (dropout effect).</li>
          <li>• <strong>Some vaccines show higher 2nd dose reports</strong> (like COVID mRNA) — this reflects stronger immune responses, not necessarily greater danger.</li>
          <li>• <strong>&quot;UNK&quot; (unknown)</strong> means the dose number wasn&apos;t recorded in the VAERS report.</li>
          <li>• <strong>Death rates by dose</strong> can be misleading without knowing the total doses administered per series.</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className={`${playfairDisplay.className} text-xl font-bold mb-3`}>Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/analysis/dose-comparison" className="text-primary hover:text-primary/80 text-sm">→ Dose Comparison Analysis</a>
          <a href="/tools/dose-comparison" className="text-primary hover:text-primary/80 text-sm">→ Dose Comparison Tool</a>
          <a href="/tools/onset-calculator" className="text-primary hover:text-primary/80 text-sm">→ Onset Calculator</a>
          <a href="/analysis/covid-impact" className="text-primary hover:text-primary/80 text-sm">→ COVID Impact Analysis</a>
        </div>
      </div>
    </div>
  )
}
