'use client'

import { useState, useEffect } from 'react'
import { formatNumber } from '@/lib/utils'

interface LotData {
  lot: string
  reports: number
  died: number
  hosp: number
}

export default function LotLookupClient() {
  const [lotData, setLotData] = useState<LotData[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResult, setSearchResult] = useState<LotData | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    fetch('/data/lot-numbers.json')
      .then(res => res.json())
      .then((data: LotData[]) => {
        setLotData(data)
        setLoading(false)
      })
      .catch(err => {
        console.error('Error loading lot data:', err)
        setLoading(false)
      })
  }, [])

  const handleSearch = () => {
    setNotFound(false)
    setSearchResult(null)

    if (!searchTerm.trim()) return

    const result = lotData.find(lot => 
      lot.lot.toLowerCase() === searchTerm.toLowerCase().trim()
    )

    if (result) {
      setSearchResult(result)
    } else {
      setNotFound(true)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  if (loading) {
    return (
      <div className="h-64 bg-gray-100 animate-pulse rounded-xl flex items-center justify-center">
        <span className="text-gray-500">Loading lot number data...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Interface */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Enter COVID-19 Vaccine Lot Number
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., EN6201, EW0150, etc."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
          />
          <button
            onClick={handleSearch}
            disabled={!searchTerm.trim()}
            className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Search
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-1">
          Only COVID-19 vaccine lots with 5 or more reports are included.
        </p>
      </div>

      {/* Search Results */}
      {searchResult && (
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Lot Number: {searchResult.lot}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">
                {formatNumber(searchResult.reports)}
              </div>
              <div className="text-sm text-blue-600">Total Reports</div>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-700">
                {formatNumber(searchResult.died)}
              </div>
              <div className="text-sm text-red-600">Death Reports</div>
            </div>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-orange-700">
                {formatNumber(searchResult.hosp)}
              </div>
              <div className="text-sm text-orange-600">Hospitalizations</div>
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <h4 className="font-bold text-yellow-800 mb-2">⚠️ Critical Context</h4>
            <p className="text-sm text-yellow-700">
              These numbers reflect raw report counts for lot {searchResult.lot}. Without knowing:
            </p>
            <ul className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>• How many doses this lot contained</li>
              <li>• Where and when these doses were distributed</li>
              <li>• The demographics of recipients</li>
            </ul>
            <p className="text-sm text-yellow-700 mt-2">
              These numbers cannot be used to assess lot safety. Higher numbers often indicate 
              larger lots or broader distribution, not safety problems.
            </p>
          </div>
        </div>
      )}

      {notFound && (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 text-center">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Lot "{searchTerm}" Not Found
          </h3>
          <p className="text-sm text-gray-600">
            This lot number was not found in the VAERS data. This could mean:
          </p>
          <ul className="text-sm text-gray-600 mt-2 space-y-1">
            <li>• The lot has fewer than 5 VAERS reports</li>
            <li>• The lot number was entered incorrectly</li>
            <li>• The lot exists but has no VAERS reports</li>
            <li>• The lot number format doesn&apos;t match VAERS data</li>
          </ul>
        </div>
      )}

      {/* Sample Data Display */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          Sample High-Reporting Lots (for reference)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {lotData.slice(0, 6).map((lot) => (
            <div 
              key={lot.lot} 
              className="bg-gray-50 border border-gray-200 rounded-xl p-4 cursor-pointer hover:bg-gray-100"
              onClick={() => {
                setSearchTerm(lot.lot)
                setSearchResult(lot)
                setNotFound(false)
              }}
            >
              <div className="font-bold text-gray-900">{lot.lot}</div>
              <div className="text-sm text-gray-600">
                {formatNumber(lot.reports)} reports
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Click on any sample lot to view its details. Remember: higher numbers typically indicate larger lots.
        </p>
      </div>
    </div>
  )
}