import { Metadata } from 'next'
import SearchClient from './SearchClient'

export const metadata: Metadata = {
  title: 'Search VAERS Data — Find Vaccines & Symptoms',
  description: 'Search across 104 vaccines and 500+ symptoms in the VAERS database. Find adverse event reports, safety data, and analysis for any vaccine or symptom.'
}

export default function SearchPage() {
  return <SearchClient />
}
