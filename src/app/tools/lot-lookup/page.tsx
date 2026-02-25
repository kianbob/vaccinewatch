import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import LotLookupClient from './LotLookupClient'

export const metadata: Metadata = {
  title: 'Lot Lookup Tool - COVID-19 Vaccine Lot Number Search',
  description: 'Search COVID-19 vaccine lot numbers in VAERS data. Important: raw counts cannot determine safety without lot size and distribution context.'
}

export default function LotLookupPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      
      {/* Extra Heavy Disclaimer for Lot Analysis */}
      <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <span className="text-red-500 text-xl">🚨</span>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-800">
              <strong>MASSIVE DISCLAIMER:</strong> Lot numbers with more reports do NOT indicate "bad lots." 
              Larger lots distributed more widely will naturally have more reports. Without knowing lot sizes 
              and distribution patterns, these numbers are meaningless for safety assessment.
            </p>
          </div>
        </div>
      </div>

      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' }, 
        { label: 'Lot Lookup' }
      ]} />

      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Lot Lookup Tool
        </h1>
        <p className="text-xl text-gray-600">
          Search for specific COVID-19 vaccine lot numbers in VAERS data. Remember: report counts 
          alone cannot determine lot safety without proper context.
        </p>
      </div>

      {/* Context stats */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-600">4,414</div>
          <div className="text-xs text-gray-600 mt-1">COVID lots tracked</div>
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-800">670M+</div>
          <div className="text-xs text-gray-600 mt-1">total doses administered</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">⚠️</div>
          <div className="text-xs text-gray-600 mt-1">lot sizes unknown</div>
        </div>
      </div>

      <LotLookupClient />

      <div className="mt-8 bg-red-50 border border-red-200 rounded-xl p-4">
        <h3 className="font-bold text-red-800 mb-2">Critical Understanding Required</h3>
        <ul className="text-sm text-red-700 space-y-1">
          <li>• Higher report numbers usually indicate larger lots or wider distribution</li>
          <li>• Lot sizes can vary from thousands to millions of doses</li>
          <li>• Geographic distribution patterns affect reporting rates</li>
          <li>• Temporal factors (when lots were used) influence reporting</li>
          <li>• Regulatory agencies monitor lot safety through proper statistical methods</li>
        </ul>
      </div>
    </div>
  )
}