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

      {/* Quick context */}
      <div className="mb-8 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl p-6">
        <h3 className="font-semibold text-gray-900 mb-2">💡 Example</h3>
        <p className="text-sm text-gray-600">
          27,732 death reports sounds alarming — but with 670+ million COVID doses, that&apos;s ~41 per million doses.
          The U.S. background death rate is ~26,000 per million people per year. Context transforms raw numbers into understanding.
        </p>
      </div>

      <RiskContextClient />

      <div className="mt-8 bg-primary/5 border border-primary/20 rounded-xl p-4">
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