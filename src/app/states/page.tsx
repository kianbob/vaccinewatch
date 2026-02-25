import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import StatesList from './StatesList'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Vaccine Adverse Events by State — Geographic VAERS Data',
  description: 'Vaccine adverse event reports by U.S. state and territory. See per-capita rates, top reporting states, and geographic patterns in VAERS data.'
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

// Approximate 2024 US Census population estimates (in thousands)
const STATE_POP: Record<string, number> = {
  CA: 39030, TX: 30504, FL: 22611, NY: 19571, PA: 12972,
  IL: 12550, OH: 11780, GA: 10912, NC: 10699, MI: 10037,
  NJ: 9261, VA: 8643, WA: 7812, AZ: 7360, TN: 7051,
  MA: 6982, IN: 6834, MO: 6178, MD: 6164, WI: 5893,
  CO: 5840, MN: 5707, SC: 5283, AL: 5074, LA: 4624,
  KY: 4512, OR: 4233, OK: 4019, CT: 3617, UT: 3418,
  IA: 3201, NV: 3177, AR: 3046, MS: 2940, KS: 2937,
  NM: 2114, NE: 1967, ID: 1964, WV: 1770, HI: 1440,
  NH: 1396, ME: 1385, MT: 1123, RI: 1093, DE: 1018,
  SD: 909, ND: 783, AK: 733, VT: 647, WY: 577,
  DC: 672, PR: 3222, GU: 172, VI: 87, AS: 44, MP: 47,
}

interface StateData {
  abbreviation: string
  reports: number
  died: number
  hosp: number
  er: number
}

export default function StatesPage() {
  const rawStates: StateData[] = readJsonFile('state-index.json')

  // Normalize: merge duplicate abbreviations with different cases (e.g. 'CA', 'ca', 'Ca')
  const stateMap = new Map<string, StateData>()
  for (const s of rawStates) {
    const key = s.abbreviation.toUpperCase()
    const existing = stateMap.get(key)
    if (existing) {
      existing.reports += s.reports
      existing.died += s.died
      existing.hosp += s.hosp
      existing.er += s.er
    } else {
      stateMap.set(key, { ...s, abbreviation: key })
    }
  }
  const states = Array.from(stateMap.values())

  const statesWithNames = states.map(s => {
    const popK = STATE_POP[s.abbreviation]
    return {
      ...s,
      name: STATE_NAMES[s.abbreviation] || s.abbreviation,
      per100k: popK ? Math.round(s.reports / popK * 100) : null,
    }
  })

  const statsData = readJsonFile('stats.json')
  const totalReports = statsData?.totalReports || 1983260
  const totalDeaths = statsData?.totalDied || 27732
  const totalHosp = statsData?.totalHospitalized || 143653
  const totalER = statsData?.totalER || 356123

  // Top 5 states excluding Unknown/Foreign
  const topStates = statesWithNames
    .filter(s => s.abbreviation !== 'UNK' && s.abbreviation !== 'FR')
    .sort((a, b) => b.reports - a.reports)
    .slice(0, 5)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'States' }]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Reports by State
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mb-4">
          Geographic distribution of VAERS adverse event reports across U.S. states and territories.
          Higher numbers typically reflect larger populations, not higher risk.
        </p>
        <p className="text-sm text-gray-500 max-w-4xl">
          State-level data reveals reporting patterns influenced by population size, healthcare infrastructure,
          and reporting culture. Per-capita rates help normalize for population differences, though they still
          don&apos;t account for varying vaccination rates or reporting awareness between states.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">{states.length}</div>
          <div className="text-sm font-medium text-primary">States & Territories</div>
        </div>
        <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm font-medium text-accent">Total Reports</div>
        </div>
        <div className="bg-gradient-to-br from-danger/5 to-danger/10 border border-danger/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalDeaths)}</div>
          <div className="text-sm font-medium text-danger">Deaths Reported</div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalHosp)}</div>
          <div className="text-sm font-medium text-gray-800">Hospitalizations</div>
        </div>
      </div>

      {/* Top States */}
      <div className="bg-gray-50 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Top 5 Reporting States</h3>
        <p className="text-gray-600 mb-6">
          States with the most VAERS reports. Population size is the primary driver of report volume.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {topStates.map((state, i) => (
            <div key={state.abbreviation} className="bg-white p-4 rounded-xl border border-gray-200">
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
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
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
