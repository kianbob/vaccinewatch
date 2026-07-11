import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { GeographicChartsClient as GeographicCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'VAERS Reports by State 2026 — Geographic Vaccine Safety Patterns',
  description: 'State-level VAERS analysis: which states report the most vaccine adverse events, per-capita rates, and what drives geographic variation in reporting.',
  openGraph: {
    title: 'VAERS Reports by State 2026 — Geographic Vaccine Safety Patterns',
    description: 'State-level VAERS analysis: which states report the most vaccine adverse events, per-capita rates, and what drives geographic variation in reporting.',
  },
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
      <ArticleSchema title="Geographic Patterns in VAERS Reporting" description="State-level analysis of VAERS adverse event reports. Which states report the most, per-capita patterns, and what drives geographic variation." slug="geographic-patterns" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Geographic Patterns' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-primary uppercase tracking-wider">6 min read</div><ShareButtons title="Geographic Patterns in VAERS Reporting - VaccineWatch" /></div>
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

      
      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for geographic variation in reporting
          is shifting. Annual VAERS reports in 2025-2026 have returned to the 35,000-45,000 range typical of
          the pre-pandemic era (2015-2019), making year-over-year comparisons more meaningful again.
        </p>
        <p>
          The HHS administration has signaled increased focus on vaccine safety data analysis, including
          the development of AI-powered tools for pattern detection in VAERS reports. While these tools
          are still under development, they represent a potential evolution in how adverse event data
          is analyzed and interpreted.
        </p>
        <p>
          New vaccines entering the market — including RSV vaccines for older adults and pregnant women,
          updated COVID-19 formulations, and potential H5N1 avian flu vaccines — continue to add new
          data streams to VAERS. Each new vaccine type provides additional context for understanding
          geographic variation in reporting across the full spectrum of vaccine safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Limitations of This Analysis</h2>
        <p>
          This analysis is based entirely on VAERS passive surveillance data, which carries important
          limitations that must be understood:
        </p>
        <ul>
          <li><strong>Underreporting:</strong> Studies estimate that only 1-10% of adverse events are
          reported to VAERS. This means the true number of events is likely much higher than what
          appears in the data.</li>
          <li><strong>Stimulated reporting:</strong> Media coverage and public awareness can temporarily
          increase reporting rates for specific vaccines, independent of any change in actual safety.</li>
          <li><strong>No control group:</strong> VAERS does not include a comparison group of unvaccinated
          individuals, making it impossible to determine whether reported events occurred at a higher
          rate than expected.</li>
          <li><strong>Variable data quality:</strong> VAERS reports range from detailed medical records
          submitted by healthcare providers to brief descriptions from patients. Not all reports
          are verified for medical accuracy.</li>
          <li><strong>Duplicate reports:</strong> The same event may be reported by multiple people
          (patient, doctor, manufacturer), and some duplicates may remain in the data.</li>
        </ul>
        <p>
          For these reasons, VAERS data is best used for signal detection — identifying potential safety
          concerns that warrant further investigation — rather than for definitive risk assessment. When
          VAERS surfaces a potential signal, it is investigated using more rigorous systems like the
          Vaccine Safety Datalink (VSD) and controlled epidemiological studies.
        </p>
      </div>

      {/* Data Sources */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About This Data</h3>
        <p className="text-gray-600 text-sm mb-3">
          All data on VaccineWatch comes from the official VAERS public-use datasets published by the CDC and FDA.
          Our current dataset covers reports from 1990 through early 2026. We process the raw data without
          filtering or editorializing — every metric is a transparent aggregation of official government data.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/methodology" className="text-sm text-primary hover:underline font-medium">Our Methodology →</Link>
          <Link href="/faq" className="text-sm text-primary hover:underline font-medium">FAQ →</Link>
          <Link href="/disclaimer" className="text-sm text-primary hover:underline font-medium">Disclaimer →</Link>
        </div>
      </div>


      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for geographic variation in reporting
          is shifting. Annual VAERS reports in 2025-2026 have returned to the 35,000-45,000 range typical of
          the pre-pandemic era (2015-2019), making year-over-year comparisons more meaningful again.
        </p>
        <p>
          The HHS administration has signaled increased focus on vaccine safety data analysis, including
          the development of AI-powered tools for pattern detection in VAERS reports. While these tools
          are still under development, they represent a potential evolution in how adverse event data
          is analyzed and interpreted.
        </p>
        <p>
          New vaccines entering the market — including RSV vaccines for older adults and pregnant women,
          updated COVID-19 formulations, and potential H5N1 avian flu vaccines — continue to add new
          data streams to VAERS. Each new vaccine type provides additional context for understanding
          geographic variation in reporting across the full spectrum of vaccine safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Limitations of This Analysis</h2>
        <p>
          This analysis is based entirely on VAERS passive surveillance data, which carries important
          limitations that must be understood:
        </p>
        <ul>
          <li><strong>Underreporting:</strong> Studies estimate that only 1-10% of adverse events are
          reported to VAERS. This means the true number of events is likely much higher than what
          appears in the data.</li>
          <li><strong>Stimulated reporting:</strong> Media coverage and public awareness can temporarily
          increase reporting rates for specific vaccines, independent of any change in actual safety.</li>
          <li><strong>No control group:</strong> VAERS does not include a comparison group of unvaccinated
          individuals, making it impossible to determine whether reported events occurred at a higher
          rate than expected.</li>
          <li><strong>Variable data quality:</strong> VAERS reports range from detailed medical records
          submitted by healthcare providers to brief descriptions from patients. Not all reports
          are verified for medical accuracy.</li>
          <li><strong>Duplicate reports:</strong> The same event may be reported by multiple people
          (patient, doctor, manufacturer), and some duplicates may remain in the data.</li>
        </ul>
        <p>
          For these reasons, VAERS data is best used for signal detection — identifying potential safety
          concerns that warrant further investigation — rather than for definitive risk assessment. When
          VAERS surfaces a potential signal, it is investigated using more rigorous systems like the
          Vaccine Safety Datalink (VSD) and controlled epidemiological studies.
        </p>
      </div>

      {/* Data Sources */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-3">About This Data</h3>
        <p className="text-gray-600 text-sm mb-3">
          All data on VaccineWatch comes from the official VAERS public-use datasets published by the CDC and FDA.
          Our current dataset covers reports from 1990 through early 2026. We process the raw data without
          filtering or editorializing — every metric is a transparent aggregation of official government data.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/methodology" className="text-sm text-primary hover:underline font-medium">Our Methodology →</Link>
          <Link href="/faq" className="text-sm text-primary hover:underline font-medium">FAQ →</Link>
          <Link href="/disclaimer" className="text-sm text-primary hover:underline font-medium">Disclaimer →</Link>
        </div>
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
          <Link href="/analysis/who-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Who Files VAERS Reports?</div>
            <div className="text-sm text-gray-500">The reporting sources behind the data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
