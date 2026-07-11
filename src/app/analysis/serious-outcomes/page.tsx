import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { SeriousOutcomesChartsClient as SeriousOutcomesCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Serious vs Non-Serious VAERS Outcomes — Vaccine Adverse Event Severity 2026',
  description: 'Deaths, hospitalizations, ER visits, and disabilities in VAERS. How serious vaccine adverse outcomes compare across 104 vaccines, with essential context.',
  openGraph: {
    title: 'Serious vs Non-Serious VAERS Outcomes — Vaccine Adverse Event Severity 2026',
    description: 'Deaths, hospitalizations, ER visits, and disabilities in VAERS. How serious vaccine adverse outcomes compare across 104 vaccines, with essential context.',
  },
}

export default function SeriousOutcomesPage() {
  const stats = readJsonFile('stats.json')
  const vaccineIndex = readJsonFile('vaccine-index.json')

  const totalReports = stats.totalReports
  const totalDied = stats.totalDied
  const totalHosp = stats.totalHospitalized
  const totalER = stats.totalER
  const totalDisabled = stats.totalDisabled

  const deathRate = (totalDied / totalReports * 100).toFixed(1)
  const hospRate = (totalHosp / totalReports * 100).toFixed(1)
  const erRate = (totalER / totalReports * 100).toFixed(1)
  const disabledRate = (totalDisabled / totalReports * 100).toFixed(1)

  // Non-serious estimate (reports that don't have any serious flag)
  const seriousTotal = totalDied + totalHosp + totalER + totalDisabled
  const nonSerious = Math.max(0, totalReports - seriousTotal)

  const outcomeBreakdown = [
    { name: 'Deaths', value: totalDied },
    { name: 'Hospitalizations', value: totalHosp },
    { name: 'ER Visits', value: totalER },
    { name: 'Disabilities', value: totalDisabled },
    { name: 'Non-Serious', value: nonSerious },
  ]

  // Top vaccines by severity rate (min 1000 reports)
  const topVaccinesBySeverity = vaccineIndex
    .filter((v: any) => v.reports >= 1000)
    .map((v: any) => ({
      name: v.type,
      rate: (v.died + v.hosp) / v.reports * 100,
      reports: v.reports,
    }))
    .sort((a: any, b: any) => b.rate - a.rate)
    .slice(0, 12)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="Serious Outcomes Analysis - VAERS Data" description="Analysis of serious vs non-serious outcomes in VAERS. Deaths, hospitalizations, ER visits, and disability reports across all vaccines." slug="serious-outcomes" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Serious vs Non-Serious Outcomes' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-danger uppercase tracking-wider">7 min read</div><ShareButtons title="Serious Outcomes Analysis - VAERS Data - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Serious vs Non-Serious Outcomes
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Not all VAERS reports are created equal. Understanding the spectrum of outcomes — from
          mild reactions to serious events — provides essential context for interpreting the data.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-danger/5 border border-danger/20 rounded-xl p-4">
            <div className="text-xl font-bold text-danger">{deathRate}%</div>
            <div className="text-xs text-gray-600">Death rate</div>
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-4">
            <div className="text-xl font-bold text-accent">{hospRate}%</div>
            <div className="text-xs text-gray-600">Hosp. rate</div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-4">
            <div className="text-xl font-bold text-primary">{erRate}%</div>
            <div className="text-xs text-gray-600">ER visit rate</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <div className="text-xl font-bold text-gray-800">{disabledRate}%</div>
            <div className="text-xs text-gray-600">Disability rate</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Outcome Spectrum</h2>
        <p>
          Of <strong>{formatNumber(totalReports)}</strong> total VAERS reports, the outcomes break down as:
        </p>
        <ul>
          <li><strong className="text-danger">{formatNumber(totalDied)}</strong> death reports ({deathRate}%)</li>
          <li><strong className="text-accent">{formatNumber(totalHosp)}</strong> hospitalizations ({hospRate}%)</li>
          <li><strong>{formatNumber(totalER)}</strong> ER visits ({erRate}%)</li>
          <li><strong>{formatNumber(totalDisabled)}</strong> disability reports ({disabledRate}%)</li>
        </ul>
        <p>
          Note that categories are not mutually exclusive — a single report may mention death, hospitalization,
          and disability. The majority of VAERS reports describe non-serious events like injection site reactions,
          headaches, and fatigue.
        </p>

        <h2 className={playfairDisplay.className}>Which Vaccines Have Higher Severity?</h2>
        <p>
          Some vaccines have higher serious outcome rates than others, but this must be interpreted carefully.
          Vaccines given to sicker populations (e.g., pneumococcal vaccines given to elderly with comorbidities)
          will naturally have higher serious outcome rates due to the underlying health of recipients.
        </p>
        <p>
          COVID-19 vaccines, despite their large total numbers, have severity rates in line with many other
          widely-administered vaccines when adjusted for the demographics of their recipients.
        </p>

        <h2 className={playfairDisplay.className}>Non-Serious Reports</h2>
        <p>
          The vast majority of VAERS reports describe expected, mild reactions: injection site pain, fever,
          fatigue, headache, and muscle aches. These are signs of the immune system responding to vaccination
          and are generally self-limiting. VAERS captures these alongside serious events, which can make the
          database appear more alarming than warranted when viewed without context.
        </p>
      </div>

      <div className="mb-12">
        <SeriousOutcomesCharts outcomeBreakdown={outcomeBreakdown} topVaccinesBySeverity={topVaccinesBySeverity} />
      </div>

      <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">1.</span>
            <span>Only {deathRate}% of VAERS reports mention death — the majority describe non-serious events</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">2.</span>
            <span>Outcome categories overlap — a single report can be counted in multiple categories</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">3.</span>
            <span>Higher severity rates for some vaccines reflect recipient demographics, not inherent danger</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">4.</span>
            <span>Reporting a death in VAERS means it occurred after vaccination, not that the vaccine caused it</span>
          </li>
        </ul>
      </div>

      
      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for serious outcome patterns
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
          serious outcome patterns across the full spectrum of vaccine safety surveillance.
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
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for serious outcome patterns
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
          serious outcome patterns across the full spectrum of vaccine safety surveillance.
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
          <Link href="/analysis/death-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Understanding Death Reports</div>
            <div className="text-sm text-gray-500">What death reports mean</div>
          </Link>
          <Link href="/analysis/elderly" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Elderly Analysis</div>
            <div className="text-sm text-gray-500">65+ outcomes deep dive</div>
          </Link>
          <Link href="/analysis/hospital-stays" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Hospitalization Duration</div>
            <div className="text-sm text-gray-500">How long serious cases last</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
