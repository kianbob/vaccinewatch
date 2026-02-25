import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { GeographicChartsClient as GeographicCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Geographic Patterns in VAERS Reporting',
  description: 'State-level analysis of VAERS adverse event reports. Which states report the most, per-capita patterns, and what drives geographic variation.'
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
  UNK: 'Unknown', FR: 'Foreign'
}

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
  DC: 672, PR: 3222
}

export default function GeographicPatternsPage() {
  const states = readJsonFile('state-index.json')

  const realStates = states.filter((s: any) => s.abbreviation !== 'UNK' && s.abbreviation !== 'FR')
  const totalReports = states.reduce((s: number, st: any) => s + st.reports, 0)
  const unknownReports = states.find((s: any) => s.abbreviation === 'UNK')?.reports || 0
  const unknownPct = totalReports > 0 ? (unknownReports / totalReports * 100).toFixed(0) : '0'

  const topStates = [...realStates]
    .sort((a: any, b: any) => b.reports - a.reports)
    .slice(0, 15)
    .map((s: any) => ({
      name: STATE_NAMES[s.abbreviation] || s.abbreviation,
      reports: s.reports,
    }))

  const perCapitaStates = realStates
    .filter((s: any) => STATE_POP[s.abbreviation])
    .map((s: any) => ({
      name: STATE_NAMES[s.abbreviation] || s.abbreviation,
      abbreviation: s.abbreviation,
      reports: s.reports,
      per100k: Math.round(s.reports / STATE_POP[s.abbreviation] * 100),
    }))
    .sort((a: any, b: any) => b.per100k - a.per100k)
    .slice(0, 15)

  const top1 = topStates[0]
  const topPerCapita = perCapitaStates[0]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Geographic Patterns' }]} />

      <div className="mb-12">
        <div className="text-xs font-medium text-primary uppercase tracking-wider mb-2">6 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Geographic Patterns in VAERS
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          VAERS reporting varies dramatically by state. Population size is the dominant factor,
          but per-capita analysis reveals interesting patterns in reporting culture.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="text-2xl font-bold text-primary mb-1">{top1?.name}</div>
            <div className="text-gray-700">leads with {formatNumber(top1?.reports || 0)} total reports</div>
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
            <div className="text-2xl font-bold text-accent mb-1">{unknownPct}%</div>
            <div className="text-gray-700">of reports have unknown or missing state data</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Population Drives Volume</h2>
        <p>
          The states with the most VAERS reports are, unsurprisingly, the most populous.{' '}
          <strong>{top1?.name}</strong> leads with <strong>{formatNumber(top1?.reports || 0)}</strong> reports,
          followed by other large states. This is expected — more people means more vaccinations,
          which means more temporal associations with adverse events.
        </p>

        <h2 className={playfairDisplay.className}>Per-Capita Tells a Different Story</h2>
        <p>
          When adjusting for population, the picture changes significantly. <strong>{topPerCapita?.name}</strong> leads
          with <strong>{topPerCapita?.per100k}</strong> reports per 100,000 residents. Per-capita rates can be influenced
          by healthcare provider awareness of VAERS, state-level reporting mandates, and demographic factors
          like age distribution.
        </p>

        <h2 className={playfairDisplay.className}>The Unknown Factor</h2>
        <p>
          A significant <strong>{unknownPct}%</strong> of VAERS reports ({formatNumber(unknownReports)}) have
          unknown or missing state information. This represents a major limitation in geographic analysis.
          Reports from healthcare providers may not always include patient state, and online submissions
          may omit location data.
        </p>
      </div>

      <div className="mb-12">
        <GeographicCharts topStates={topStates} perCapitaStates={perCapitaStates} />
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>Population size is the primary driver of state-level VAERS report volume</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Per-capita analysis reveals variation in reporting culture across states</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>{unknownPct}% of reports lack state information, limiting geographic analysis</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>State-level differences reflect reporting behavior, not vaccine safety variation</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/states" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Browse All States</div>
            <div className="text-sm text-gray-500">Detailed state-by-state data</div>
          </Link>
          <Link href="/analysis/reporting-trends" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">35 Years of Reporting</div>
            <div className="text-sm text-gray-500">National trend analysis</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
