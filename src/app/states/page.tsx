import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import StatesList from './StatesList'
import DisclaimerBanner from '@/components/DisclaimerBanner'

export const metadata: Metadata = {
  title: 'VAERS Reports by State',
  description: 'Vaccine adverse event reports broken down by U.S. state. Explore geographic patterns in VAERS reporting.'
}

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia', PR: 'Puerto Rico', GU: 'Guam', VI: 'U.S. Virgin Islands',
  AS: 'American Samoa', MP: 'Northern Mariana Islands', UNK: 'Unknown', FR: 'Foreign'
}

interface StateData {
  abbreviation: string
  reports: number
  died: number
  hosp: number
  er: number
}

export default function StatesPage() {
  const states: StateData[] = readJsonFile('state-index.json')

  const statesWithNames = states.map(s => ({
    ...s,
    name: STATE_NAMES[s.abbreviation] || s.abbreviation,
  }))

  const totalReports = states.reduce((sum, s) => sum + s.reports, 0)
  const totalDeaths = states.reduce((sum, s) => sum + s.died, 0)
  const totalHosp = states.reduce((sum, s) => sum + s.hosp, 0)
  const totalER = states.reduce((sum, s) => sum + s.er, 0)

  // Top 5 states excluding Unknown/Foreign
  const topStates = statesWithNames
    .filter(s => s.abbreviation !== 'UNK' && s.abbreviation !== 'FR')
    .sort((a, b) => b.reports - a.reports)
    .slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />

      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Reports by State
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          Geographic distribution of VAERS adverse event reports across U.S. states and territories.
          Higher numbers typically reflect larger populations, not higher risk.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
          <div className="text-2xl font-bold text-gray-900">{states.length}</div>
          <div className="text-sm font-medium text-primary">States & Territories</div>
        </div>
        <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-lg p-6">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm font-medium text-accent">Total Reports</div>
        </div>
        <div className="bg-gradient-to-br from-danger/5 to-danger/10 border border-danger/20 rounded-lg p-6">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalDeaths)}</div>
          <div className="text-sm font-medium text-danger">Deaths Reported</div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalHosp)}</div>
          <div className="text-sm font-medium text-gray-800">Hospitalizations</div>
        </div>
      </div>

      {/* Top States */}
      <div className="bg-gray-50 rounded-lg p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top 5 Reporting States</h3>
        <p className="text-gray-600 mb-6">
          States with the most VAERS reports. Population size is the primary driver of report volume.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topStates.map((state, i) => (
            <div key={state.abbreviation} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="font-medium text-gray-900 mb-1">
                {i + 1}. {state.name}
              </div>
              <div className="text-sm">
                <span className="font-semibold text-primary">{formatNumber(state.reports)}</span>
                <span className="text-gray-500"> reports</span>
              </div>
              {state.died > 0 && (
                <div className="text-xs text-danger mt-1">{formatNumber(state.died)} deaths</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">All States & Territories</h2>
        <StatesList states={statesWithNames} />
      </div>

      {/* Context */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding State Data</h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span><strong>Population matters:</strong> California and Texas lead in reports largely because they are the most populous states</span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span><strong>&quot;Unknown&quot; state:</strong> Many reports don&apos;t include state information, which is why &quot;UNK&quot; appears high</span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span><strong>Reporting culture:</strong> Some states may have higher reporting rates due to healthcare provider awareness or mandate requirements</span>
          </div>
        </div>
      </div>
    </div>
  )
}
