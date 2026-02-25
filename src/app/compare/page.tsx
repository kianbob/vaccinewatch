import { Metadata } from 'next'
import { Suspense } from 'react'
import CompareClient from './CompareClient'

export const metadata: Metadata = {
  title: 'Compare Vaccines — Side-by-Side VAERS Safety Data',
  description: 'Compare adverse event reports between vaccines side by side. Select 2-3 vaccines to see report counts, death rates, hospitalizations, and yearly trends from VAERS data.'
}

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-8"><div className="h-96 bg-gray-100 animate-pulse rounded-lg"></div></div>}>
      <CompareClient />
    </Suspense>
  )
}
