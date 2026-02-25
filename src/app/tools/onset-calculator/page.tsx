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

      {/* Quick context */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-primary">73%</div>
          <div className="text-xs text-gray-600 mt-1">of events within 3 days</div>
        </div>
        <div className="bg-accent/5 border border-accent/10 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-accent">Day 0</div>
          <div className="text-xs text-gray-600 mt-1">most common onset day</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">104</div>
          <div className="text-xs text-gray-600 mt-1">vaccines to explore</div>
        </div>
      </div>

      <OnsetCalculatorClient />

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-4">
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