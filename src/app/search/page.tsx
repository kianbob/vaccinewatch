import { Metadata } from 'next'
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
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><div className="h-96 bg-gray-100 animate-pulse rounded-xl"></div></div>}>
      <SearchClient />
    </Suspense>
  )
}
