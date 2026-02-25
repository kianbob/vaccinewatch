import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { playfairDisplay } from '@/lib/fonts'
import SearchClient from './SearchClient'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Search VAERS Data — Find Vaccines & Symptoms',
  description: 'Search across 104 vaccines and 500+ symptoms in the VAERS database. Find adverse event reports, safety data, and analysis for any vaccine or symptom.'
}

export default function SearchPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Search' }]} />

      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Search VAERS Data
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Search across 104 vaccines, 1,000+ symptoms, 65 states/territories, and 46 manufacturers 
          in our VAERS database. Find adverse event reports, detailed profiles, and safety analysis.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 bg-gray-100 animate-pulse rounded-xl"></div>}>
        <SearchClient />
      </Suspense>

      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <Link href="/vaccines" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all text-center">
          <div className="text-2xl mb-1">💉</div>
          <div className="font-bold text-gray-900">104 Vaccines</div>
          <div className="text-xs text-gray-500">Browse all</div>
        </Link>
        <Link href="/symptoms" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all text-center">
          <div className="text-2xl mb-1">🔍</div>
          <div className="font-bold text-gray-900">1,000+ Symptoms</div>
          <div className="text-xs text-gray-500">Browse all</div>
        </Link>
        <Link href="/states" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all text-center">
          <div className="text-2xl mb-1">🗺️</div>
          <div className="font-bold text-gray-900">65 Jurisdictions</div>
          <div className="text-xs text-gray-500">Browse all</div>
        </Link>
        <Link href="/manufacturers" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all text-center">
          <div className="text-2xl mb-1">🏭</div>
          <div className="font-bold text-gray-900">46 Manufacturers</div>
          <div className="text-xs text-gray-500">Browse all</div>
        </Link>
      </div>
    </div>
  )
}
