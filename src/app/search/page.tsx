import { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import SearchClient from './SearchClient'

export const metadata: Metadata = {
  title: 'Search VAERS Data — Find Vaccines & Symptoms',
  description: 'Search across 104 vaccines and 500+ symptoms in the VAERS database. Find adverse event reports, safety data, and analysis for any vaccine or symptom.',
  openGraph: {
    title: 'Search VAERS Data — Find Vaccines & Symptoms',
    description: 'Search across 104 vaccines and 500+ symptoms in the VAERS database. Find adverse event reports, safety data, and analysis for any vaccine or symptom.',
  },
}

export default function SearchPage() {
  return (
    <>
      <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><div className="h-96 bg-gray-100 animate-pulse rounded-xl"></div></div>}>
        <SearchClient />
      </Suspense>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <p className="mt-4 text-center text-sm text-gray-500">
          New to VAERS? Read our <Link href="/how-to-search-vaers" className="text-primary hover:underline">guide to searching VAERS data</Link>.
        </p>
      </div>
    </>
  )
}
