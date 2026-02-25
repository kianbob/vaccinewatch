import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import RiskContextClient from './RiskContextClient'

export const metadata: Metadata = {
  title: 'Risk Context Calculator - VAERS Numbers in Perspective',
  description: 'Put VAERS numbers in proper context with dose estimates. Calculate reports per million doses and compare to background disease rates.'
}

export default function RiskContextPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' }, 
        { label: 'Risk Context Calculator' }
      ]} />

      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Risk Context Calculator
        </h1>
        <p className="text-xl text-gray-600">
          Transform raw VAERS numbers into meaningful context. Calculate rates per million doses 
          and compare to background disease rates to understand relative risks.
        </p>
      </div>

      <RiskContextClient />

      <div className="mt-8 bg-green-50 border border-green-200 rounded-lg p-4">
        <h3 className="font-bold text-green-800 mb-2">Why Context Matters</h3>
        <ul className="text-sm text-green-700 space-y-1">
          <li>• Raw VAERS numbers can appear scary without proper denominators</li>
          <li>• Rates per million doses provide meaningful comparison across vaccines</li>
          <li>• Background disease rates show what happens naturally in the population</li>
          <li>• Proper context helps inform evidence-based vaccination decisions</li>
        </ul>
      </div>
    </div>
  )
}