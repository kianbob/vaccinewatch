'use client'

import { useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'

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

export default function SearchClient() {
  const [query, setQuery] = useState('')
  const [vaccines, setVaccines] = useState<VaccineResult[]>([])
  const [symptoms, setSymptoms] = useState<SymptomResult[]>([])
  const [loading, setLoading] = useState(true)

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
          <p className="text-sm text-gray-500 mt-2">
            {totalResults} result{totalResults !== 1 ? 's' : ''} found
          </p>
        )}
      </div>

      {loading && (
        <div className="text-center py-12">
          <div className="animate-pulse text-gray-400">Loading search index...</div>
        </div>
      )}

      {!loading && query.length < 2 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Type at least 2 characters to search</p>
          <div className="mt-6 flex flex-wrap gap-2 justify-center">
            {['COVID', 'Headache', 'Myocarditis', 'Flu', 'MMR', 'Fever'].map(term => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-primary/10 hover:text-primary transition-colors text-sm"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {!loading && query.length >= 2 && (
        <div className="space-y-8">
          {/* Vaccine Results */}
          {results.vaccines.length > 0 && (
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
                    className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-primary/30 transition-all"
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
          {results.symptoms.length > 0 && (
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
                    className="block bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md hover:border-accent/30 transition-all"
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
