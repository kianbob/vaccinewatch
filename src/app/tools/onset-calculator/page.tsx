import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import OnsetCalculatorClient from './OnsetCalculatorClient'

export const metadata: Metadata = {
  title: 'Onset Calculator - When Do Vaccine Side Effects Start?',
  description: 'Interactive calculator showing when adverse events typically occur after vaccination for different vaccine types. Explore onset timing patterns in VAERS data.'
}

export default function OnsetCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' }, 
        { label: 'Onset Calculator' }
      ]} />

      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Onset Calculator
        </h1>
        <p className="text-xl text-gray-600">
          Explore when vaccine adverse events typically occur. Select a vaccine to see the timing 
          distribution of VAERS reports and understand onset patterns.
        </p>
      </div>

      <OnsetCalculatorClient />

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h3 className="font-bold text-amber-800 mb-2">Important Notes</h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• This tool shows when adverse events are reported, not when they necessarily begin</li>
          <li>• Most vaccine side effects occur within the first few days after vaccination</li>
          <li>• Timing patterns are similar across different vaccine types</li>
          <li>• Not all VAERS reports include precise onset timing information</li>
        </ul>
      </div>
    </div>
  )
}