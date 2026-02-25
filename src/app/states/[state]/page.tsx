import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { redirect } from 'next/navigation'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import StatCard from '@/components/StatCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

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
  AS: 'American Samoa', MP: 'Northern Mariana Islands', UNK: 'Unknown', FR: 'Foreign',
  FM: 'Federated States of Micronesia', MH: 'Marshall Islands', PW: 'Palau', AA: 'Armed Forces Americas',
  AE: 'Armed Forces Europe', AP: 'Armed Forces Pacific'
}

// US state populations (2023 estimates, rounded to thousands)
const STATE_POPULATIONS: Record<string, number> = {
  CA: 39029, TX: 30504, FL: 22610, NY: 19677, PA: 12972, IL: 12582, OH: 11756,
  GA: 10912, NC: 10698, MI: 10037, NJ: 9261, VA: 8643, WA: 7812, AZ: 7359,
  TN: 7051, MA: 7029, IN: 6833, MO: 6178, MD: 6165, WI: 5893, CO: 5839,
  MN: 5707, SC: 5282, AL: 5074, LA: 4657, KY: 4512, OR: 4233, OK: 3959,
  CT: 3626, UT: 3380, PR: 3222, IA: 3191, NV: 3177, AR: 3045, MS: 2940,
  KS: 2937, NM: 2113, NE: 1961, ID: 1939, WV: 1770, HI: 1440, NH: 1395,
  ME: 1386, MT: 1122, RI: 1093, DE: 1018, SD: 909, ND: 779, AK: 733,
  DC: 672, VT: 647, WY: 577, GU: 154, VI: 87, AS: 44, MP: 47,
}

// Reverse lookup: full state name → abbreviation
const NAME_TO_ABBR: Record<string, string> = Object.fromEntries(
  Object.entries(STATE_NAMES).map(([abbr, name]) => [name.toLowerCase().replace(/\s+/g, '-'), abbr.toLowerCase()])
)

interface StateInfo {
  abbreviation: string
  reports: number
  died: number
  hosp: number
  er: number
}

interface StateVaccine {
  type: string
  reports: number
  died: number
  hosp: number
}

export const dynamicParams = true
export async function generateStaticParams() {
  const states: StateInfo[] = readJsonFile('state-index.json')
  const seen = new Set<string>()
  return states
    .map(s => s.abbreviation.toLowerCase())
    .filter(abbr => {
      if (seen.has(abbr)) return false
      seen.add(abbr)
      return true
    })
    .map(state => ({ state }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ state: string }>
}): Promise<Metadata> {
  const { state } = await params
  const resolvedAbbrMeta = NAME_TO_ABBR[state.toLowerCase()]
  const abbr = resolvedAbbrMeta ? resolvedAbbrMeta.toUpperCase() : state.toUpperCase()
  const name = STATE_NAMES[abbr] || abbr

  const rawStates: StateInfo[] = readJsonFile('state-index.json')
  // Normalize duplicates
  const stateMap = new Map<string, StateInfo>()
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
  const stateData = stateMap.get(abbr)

  if (!stateData) {
    return { title: 'State Not Found' }
  }

  return {
    title: `Vaccine Adverse Events in ${name}`,
    description: `${formatNumber(stateData.reports)} vaccine adverse event reports from ${name} in VAERS. Explore top vaccines reported, death data (${formatNumber(stateData.died)}), and hospitalization stats.`
  }
}

export default async function StateDetailPage({
  params
}: {
  params: Promise<{ state: string }>
}) {
  const { state } = await params
  
  // Handle full state names like "california" → redirect to /states/ca
  const resolvedAbbr = NAME_TO_ABBR[state.toLowerCase()]
  if (resolvedAbbr) {
    redirect(`/states/${resolvedAbbr}`)
  }
  
  const abbr = state.toUpperCase()
  const name = STATE_NAMES[abbr] || abbr

  const rawStates: StateInfo[] = readJsonFile('state-index.json')
  
  // Normalize: merge duplicate abbreviations (e.g. 'CA', 'ca', 'Ca' → 'CA')
  const stateMap = new Map<string, StateInfo>()
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
  
  const stateData = states.find(s => s.abbreviation === abbr)

  if (!stateData) {
    notFound()
  }

  let vaccines: StateVaccine[] = []
  try {
    vaccines = readJsonFile(`state-vaccines/${state}.json`)
  } catch {
    // no detail file
  }

  vaccines.sort((a, b) => b.reports - a.reports)

  const totalReports = states.reduce((sum, s) => sum + s.reports, 0)
  const shareOfTotal = totalReports > 0 ? (stateData.reports / totalReports * 100).toFixed(1) : '0.0'

  // Rank among states
  const sorted = [...states].sort((a, b) => b.reports - a.reports)
  const rank = sorted.findIndex(s => s.abbreviation === abbr) + 1

  // Population context
  const population = STATE_POPULATIONS[abbr]
  const reportsPerCapita = population ? (stateData.reports / (population * 1000) * 100000).toFixed(1) : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />

      <Breadcrumbs items={[{ label: 'States', href: '/states' }, { label: name }]} />

      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-2 ${playfairDisplay.className}`}>
              {name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-lg text-gray-600">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {abbr}
              </span>
              <span>{formatNumber(stateData.reports)} total reports</span>
              <span className="text-sm text-gray-500">Rank #{rank} of {states.length} jurisdictions</span>
            </div>
          </div>
          <div className="hidden md:block">
            <ShareButtons title={`Vaccine Adverse Events in ${name} — VaccineWatch`} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Reports" value={stateData.reports} color="primary" />
        <StatCard title="Deaths" value={stateData.died} color="danger" />
        <StatCard title="Hospitalizations" value={stateData.hosp} color="accent" />
        <StatCard title="ER Visits" value={stateData.er} color="gray" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About {name} VAERS Data
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                <strong>{name}</strong> ({abbr}) has <strong>{formatNumber(stateData.reports)}</strong> adverse event reports in VAERS, representing <strong>{shareOfTotal}%</strong> of all reports nationwide.
              </p>
              <p>
                Of these, <strong className="text-danger">{formatNumber(stateData.died)}</strong> mentioned death, <strong className="text-accent">{formatNumber(stateData.hosp)}</strong> involved hospitalization, and <strong>{formatNumber(stateData.er)}</strong> required emergency department visits.
              </p>
              {population && reportsPerCapita && (
                <p>
                  With an estimated population of <strong>{(population * 1000).toLocaleString()}</strong>, {name} has approximately <strong>{reportsPerCapita} reports per 100,000 residents</strong>.
                </p>
              )}
            </div>
          </div>

          {vaccines.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Top Vaccines Reported in {name}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vaccine</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reports</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deaths</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hospitalizations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vaccines.slice(0, 20).map(v => (
                      <tr key={v.type} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">
                          <Link href={`/vaccines/${v.type.toLowerCase()}`} className="text-primary hover:text-primary/80 font-medium">
                            {v.type}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{formatNumber(v.reports)}</td>
                        <td className="px-4 py-3 text-sm text-danger font-medium">{formatNumber(v.died)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{formatNumber(v.hosp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Understanding State-Level Data
            </h3>
            <div className="text-blue-800 space-y-3 text-sm">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Population drives volume:</strong> More populous states naturally have more reports.</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>State of reporter:</strong> Reports are attributed to where the reporter lives, which may differ from where vaccination occurred.</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Reporting culture varies:</strong> States with more awareness of VAERS or mandated reporting may have higher per-capita rates.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Reports:</span>
                <span className="font-semibold">{formatNumber(stateData.reports)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deaths:</span>
                <span className="font-semibold text-danger">{formatNumber(stateData.died)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hospitalizations:</span>
                <span className="font-semibold text-accent">{formatNumber(stateData.hosp)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ER Visits:</span>
                <span className="font-semibold">{formatNumber(stateData.er)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-gray-600">Share of Total:</span>
                <span className="font-semibold">{shareOfTotal}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rank:</span>
                <span className="font-semibold">#{rank} of {states.length} jurisdictions</span>
              </div>
              {population && (
                <>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-gray-600">Population:</span>
                    <span className="font-semibold">{(population * 1000).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Reports per 100K:</span>
                    <span className="font-semibold">{reportsPerCapita}</span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore Further</h3>
            <div className="space-y-3">
              {vaccines.length > 0 && (
                <Link href={`/vaccines/${vaccines[0].type.toLowerCase()}`} className="block w-full text-center bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                  Top Vaccine: {vaccines[0].type}
                </Link>
              )}
              <Link href="/states" className="block w-full text-center bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                All States
              </Link>
              <Link href="/analysis/geographic-patterns" className="block w-full text-center bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                Geographic Analysis
              </Link>
              <Link href="/compare" className="block w-full text-center bg-primary text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-primary/90 transition-colors">
                Compare Vaccines
              </Link>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Analysis</h3>
            <div className="space-y-2">
              <Link href="/analysis/geographic-patterns" className="block text-sm text-primary hover:text-primary/80">
                Geographic Patterns Analysis →
              </Link>
              <Link href="/analysis/reporting-trends" className="block text-sm text-primary hover:text-primary/80">
                35 Years of Reporting Trends →
              </Link>
              <Link href="/analysis/covid-impact" className="block text-sm text-primary hover:text-primary/80">
                COVID-19 Impact on VAERS →
              </Link>
              <Link href="/analysis/serious-outcomes" className="block text-sm text-primary hover:text-primary/80">
                Serious Outcomes Analysis →
              </Link>
              <Link href="/analysis/death-reports" className="block text-sm text-primary hover:text-primary/80">
                Death Reports Deep Dive →
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600">
            <h4 className="font-semibold text-gray-900 mb-2">Data Source</h4>
            <p>
              This data comes from the{' '}
              <a href="https://vaers.hhs.gov" className="text-primary hover:text-primary/80" target="_blank" rel="noopener noreferrer">
                Vaccine Adverse Event Reporting System (VAERS)
              </a>, jointly managed by CDC and FDA.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
