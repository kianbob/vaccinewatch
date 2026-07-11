import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { ElderlyChartsClient as ElderlyCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Vaccine Side Effects in Seniors 2026 — VAERS Data for Adults 65+',
  description: 'Adults 65+ account for 56% of VAERS death reports. Deep dive into vaccine adverse events, serious outcomes, and safety patterns for older adults in context.',
  openGraph: {
    title: 'Vaccine Side Effects in Seniors 2026 — VAERS Data for Adults 65+',
    description: 'Adults 65+ account for 56% of VAERS death reports. Deep dive into vaccine adverse events, serious outcomes, and safety patterns for older adults in context.',
  },
}

export default function ElderlyPage() {
  const ageGender = readJsonFile('age-gender.json')
  const stats = readJsonFile('stats.json')

  const elderly = ageGender.ageGroups.find((g: any) => g.group === '65+')
  const totalReports = ageGender.ageGroups.reduce((s: number, g: any) => s + g.reports, 0)
  const totalDeaths = ageGender.ageGroups.reduce((s: number, g: any) => s + (g.died || 0), 0)

  const elderlyReports = elderly?.reports || 0
  const elderlyDeaths = elderly?.died || 0
  const elderlyHosp = elderly?.hospitalized || 0

  const elderlyPct = (elderlyReports / totalReports * 100).toFixed(1)
  const elderlyDeathPct = totalDeaths > 0 ? (elderlyDeaths / totalDeaths * 100).toFixed(0) : '0'
  const elderlyMortalityRate = elderlyReports > 0 ? (elderlyDeaths / elderlyReports * 100).toFixed(1) : '0'
  const overallMortalityRate = totalReports > 0 ? (totalDeaths / totalReports * 100).toFixed(1) : '0'

  const ageComparison = ageGender.ageGroups.filter((g: any) => g.group !== 'Unknown')

  const outcomeData = [
    {
      metric: 'Death Rate',
      elderly: elderlyReports > 0 ? elderlyDeaths / elderlyReports * 100 : 0,
      allAges: totalReports > 0 ? totalDeaths / totalReports * 100 : 0,
    },
    {
      metric: 'Hosp. Rate',
      elderly: elderlyReports > 0 ? elderlyHosp / elderlyReports * 100 : 0,
      allAges: totalReports > 0 ? stats.totalHospitalized / totalReports * 100 : 0,
    },
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="Elderly VAERS Analysis - Adults 65+" description="Deep dive into VAERS adverse event reports for adults 65 and older. Why this age group has the highest serious outcome rates." slug="elderly" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'The 65+ Age Group' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-danger uppercase tracking-wider">7 min read</div><ShareButtons title="Elderly VAERS Analysis - Adults 65+ - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          The 65+ Age Group in VAERS
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Adults 65 and older represent {elderlyPct}% of all VAERS reports but account for
          a disproportionate {elderlyDeathPct}% of death reports. Understanding why requires context.
        </p>
        <div className="bg-danger/5 border border-danger/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-danger mb-1">{elderlyDeathPct}%</div>
          <div className="text-gray-700">of all death reports come from the 65+ age group, despite being only {elderlyPct}% of total reports</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why the Elderly Are Different</h2>
        <p>
          The 65+ age group has <strong>{formatNumber(elderlyReports)}</strong> VAERS reports with a
          mortality rate of <strong>{elderlyMortalityRate}%</strong> — significantly higher than the
          overall rate of {overallMortalityRate}%. Several factors explain this disparity:
        </p>
        <ul>
          <li><strong>Higher baseline mortality:</strong> Older adults have higher rates of death from all causes. Events that coincide temporally with vaccination are more common.</li>
          <li><strong>Comorbidities:</strong> Chronic conditions like heart disease, diabetes, and cancer are more prevalent, increasing vulnerability to any health event.</li>
          <li><strong>Flu and COVID-19 campaigns:</strong> Annual influenza vaccination and COVID-19 boosters mean elderly adults receive more doses, creating more opportunities for temporal associations.</li>
          <li><strong>Nursing home reporting:</strong> Deaths in long-term care facilities are more systematically reported to VAERS, especially during COVID-19.</li>
        </ul>

        <h2 className={playfairDisplay.className}>Hospitalization Patterns</h2>
        <p>
          <strong>{formatNumber(elderlyHosp)}</strong> reports for the 65+ group involved hospitalization,
          a rate of {(elderlyHosp / elderlyReports * 100).toFixed(1)}% compared to the overall
          rate of {(stats.totalHospitalized / totalReports * 100).toFixed(1)}%. Again, this reflects the
          higher baseline hospitalization rate for older adults, not necessarily vaccine-caused events.
        </p>

        <h2 className={playfairDisplay.className}>The Denominator Problem</h2>
        <p>
          Without knowing how many doses were administered to people 65+, we cannot calculate true adverse event
          rates. The elderly receive a disproportionate share of certain vaccines (influenza, pneumococcal,
          shingles, COVID-19 boosters), which inflates their raw report numbers.
        </p>
      </div>

      <div className="mb-12">
        <ElderlyCharts ageComparison={ageComparison} outcomeData={outcomeData} />
      </div>

      <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">1.</span>
            <span>Adults 65+ account for {elderlyDeathPct}% of death reports despite being {elderlyPct}% of total reports</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">2.</span>
            <span>Higher baseline mortality and comorbidities drive higher serious outcome rates</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">3.</span>
            <span>Systematic reporting from nursing homes inflates elderly report counts</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">4.</span>
            <span>Per-dose rates (which VAERS cannot provide) are essential for meaningful safety comparisons</span>
          </li>
        </ul>
      </div>

      
      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for elderly adverse event patterns
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
          elderly adverse event patterns across the full spectrum of vaccine safety surveillance.
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
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for elderly adverse event patterns
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
          elderly adverse event patterns across the full spectrum of vaccine safety surveillance.
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
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for elderly adverse event patterns
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
          elderly adverse event patterns across the full spectrum of vaccine safety surveillance.
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
          <Link href="/analysis/age-patterns" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Age Patterns in VAERS</div>
            <div className="text-sm text-gray-500">Full age group analysis</div>
          </Link>
          <Link href="/analysis/death-reports" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Understanding Death Reports</div>
            <div className="text-sm text-gray-500">What death reports mean</div>
          </Link>
          <Link href="/vaccine-schedule" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">2026 Vaccine Schedule</div>
            <div className="text-sm text-gray-500">Recommended vaccines for older adults</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
