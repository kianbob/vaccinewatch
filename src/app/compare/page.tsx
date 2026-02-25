import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { playfairDisplay } from '@/lib/fonts'
import CompareClient from './CompareClient'

export const metadata: Metadata = {
  title: 'Compare Vaccines — Side-by-Side VAERS Safety Data',
  description: 'Compare adverse event reports between vaccines side by side. Select 2-3 vaccines to see report counts, death rates, hospitalizations, and yearly trends from VAERS data.'
}

export default function ComparePage() {
  return (
    <>
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><div className="h-96 bg-gray-100 animate-pulse rounded-xl"></div></div>}>
        <CompareClient />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="prose prose-lg max-w-none">
          <h2 className={playfairDisplay.className}>Understanding Vaccine Comparisons</h2>
          <p>
            When comparing vaccines in VAERS, keep these critical factors in mind:
          </p>
          <ul>
            <li><strong>Doses administered vary enormously.</strong> COVID-19 vaccines have hundreds of millions of doses vs. thousands for rare-disease vaccines. Raw report counts cannot be directly compared. See our <Link href="/analysis/denominator-problem" className="text-primary hover:text-primary/80">denominator problem analysis</Link>.</li>
            <li><strong>Reporting rates differ by era.</strong> Post-2020 vaccines have much higher reporting rates due to <Link href="/analysis/reporting-bias" className="text-primary hover:text-primary/80">stimulated reporting</Link>.</li>
            <li><strong>Patient populations differ.</strong> Some vaccines are given to infants, others to elderly adults. Age alone affects outcome severity.</li>
          </ul>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/dashboard" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">📊 Full Dashboard</div>
            <div className="text-sm text-gray-500">All 104 vaccines in one sortable table</div>
          </Link>
          <Link href="/side-effects" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">📋 Side Effects Guide</div>
            <div className="text-sm text-gray-500">Detailed guides for specific vaccines</div>
          </Link>
          <Link href="/tools/severity-profile" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">📈 Severity Profile</div>
            <div className="text-sm text-gray-500">Compare any vaccine vs. average</div>
          </Link>
        </div>
      </div>
    </>
  )
}
