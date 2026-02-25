'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { getCleanVaccineName } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'

interface VaccineResult {
  name: string
  type: string
  reports: number
  died: number
}

interface SymptomResult {
  name: string
  reports: number
  died: number
}

type CategoryFilter = 'all' | 'vaccines' | 'symptoms'

const POPULAR_SEARCHES = [
  { term: 'COVID', icon: '💉' },
  { term: 'Headache', icon: '🤕' },
  { term: 'Myocarditis', icon: '❤️' },
  { term: 'Flu', icon: '🤧' },
  { term: 'MMR', icon: '💊' },
  { term: 'Fever', icon: '🌡️' },
  { term: 'Death', icon: '⚠️' },
  { term: 'Pfizer', icon: '🏭' },
]

export default function SearchClient() {
  const [query, setQuery] = useState('')
  const [vaccines, setVaccines] = useState<VaccineResult[]>([])
  const [symptoms, setSymptoms] = useState<SymptomResult[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<CategoryFilter>('all')

  useEffect(() => {
    Promise.all([
      fetch('/data/vaccine-index.json').then(r => r.json()),
      fetch('/data/symptom-index.json').then(r => r.json()),
    ]).then(([v, s]) => {
      setVaccines(v)
      setSymptoms(s)
      setLoading(false)
    })
  }, [])

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return { vaccines: [], symptoms: [] }

    const q = query.toLowerCase()
    return {
      vaccines: vaccines
        .filter(v => v.name.toLowerCase().includes(q) || v.type.toLowerCase().includes(q))
        .slice(0, 15),
      symptoms: symptoms
        .filter(s => s.name.toLowerCase().includes(q))
        .slice(0, 15),
    }
  }, [query, vaccines, symptoms])

  const totalResults = results.vaccines.length + results.symptoms.length

  function slugify(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9 -]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <DisclaimerBanner />
      <div className="text-center mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Search VAERS Data
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Search across 104 vaccines and 500 symptoms in the VAERS database.
        </p>
      </div>

      <div className="mb-8">
        <div className="relative">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search vaccines, symptoms..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            autoFocus
          />
        </div>
        {query.length >= 2 && !loading && (
          <div className="flex items-center justify-between mt-3">
            <p className="text-sm text-gray-500">
              {totalResults} result{totalResults !== 1 ? 's' : ''} found
            </p>
            <div className="flex gap-1">
              {(['all', 'vaccines', 'symptoms'] as CategoryFilter[]).map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 ${
                    filter === f
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {f === 'all' ? 'All' : f === 'vaccines' ? `Vaccines (${results.vaccines.length})` : `Symptoms (${results.symptoms.length})`}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-pulse text-gray-400">Loading search index...</div>
        </div>
      )}

      {!loading && query.length < 2 && (
        <div className="py-8">
          <p className="text-gray-400 text-center mb-6">Type at least 2 characters to search</p>
          <div className="max-w-lg mx-auto">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Popular Searches</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {POPULAR_SEARCHES.map(({ term, icon }) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-xl hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
                >
                  <span>{icon}</span>
                  {term}
                </button>
              ))}
            </div>
          </div>
          <div className="max-w-lg mx-auto mt-8">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Browse by Category</h3>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/vaccines" className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-center hover:bg-primary/10 transition-colors">
                <div className="text-2xl mb-1">💉</div>
                <div className="text-sm font-medium text-gray-900">All Vaccines</div>
                <div className="text-xs text-gray-500">104 vaccines</div>
              </Link>
              <Link href="/symptoms" className="bg-accent/5 border border-accent/20 rounded-xl p-4 text-center hover:bg-accent/10 transition-colors">
                <div className="text-2xl mb-1">🩺</div>
                <div className="text-sm font-medium text-gray-900">All Symptoms</div>
                <div className="text-xs text-gray-500">500+ symptoms</div>
              </Link>
              <Link href="/states" className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                <div className="text-2xl mb-1">🗺️</div>
                <div className="text-sm font-medium text-gray-900">By State</div>
                <div className="text-xs text-gray-500">50 states + territories</div>
              </Link>
              <Link href="/analysis" className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-center hover:bg-gray-100 transition-colors">
                <div className="text-2xl mb-1">📊</div>
                <div className="text-sm font-medium text-gray-900">Analysis</div>
                <div className="text-xs text-gray-500">Deep-dive articles</div>
              </Link>
            </div>
          </div>
        </div>
      )}

      {!loading && query.length >= 2 && (
        <div className="space-y-8">
          {/* Vaccine Results */}
          {results.vaccines.length > 0 && (filter === 'all' || filter === 'vaccines') && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Vaccines ({results.vaccines.length})
              </h2>
              <div className="space-y-2">
                {results.vaccines.map(v => (
                  <Link
                    key={v.type}
                    href={`/vaccines/${v.type.toLowerCase()}`}
                    className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="font-medium text-gray-900">{v.name}</div>
                        <div className="text-sm text-gray-500">Type: {v.type}</div>
                      </div>
                      <div className="text-right text-sm">
                        <div className="text-primary font-semibold">{v.reports.toLocaleString()} reports</div>
                        {v.died > 0 && (
                          <div className="text-danger text-xs">{v.died.toLocaleString()} deaths</div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Symptom Results */}
          {results.symptoms.length > 0 && (filter === 'all' || filter === 'symptoms') && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-accent rounded-full mr-2"></span>
                Symptoms ({results.symptoms.length})
              </h2>
              <div className="space-y-2">
                {results.symptoms.map(s => (
                  <Link
                    key={s.name}
                    href={`/symptoms/${slugify(s.name)}`}
                    className="block bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-accent/30 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div className="font-medium text-gray-900">{s.name}</div>
                      <div className="text-right text-sm">
                        <div className="text-accent font-semibold">{s.reports.toLocaleString()} reports</div>
                        {s.died > 0 && (
                          <div className="text-danger text-xs">{s.died.toLocaleString()} deaths</div>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {totalResults === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg mb-2">No results found for &quot;{query}&quot;</p>
              <p className="text-gray-400 text-sm">Try a different search term</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
