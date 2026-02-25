import { Metadata } from 'next'
import CompareClient from './CompareClient'

export const metadata: Metadata = {
  title: 'Compare Vaccines — Side-by-Side VAERS Safety Data',
  description: 'Compare adverse event reports between vaccines side by side. Select 2-3 vaccines to see report counts, death rates, hospitalizations, and yearly trends from VAERS data.'
}

export default function ComparePage() {
  return <CompareClient />
}
