import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { AgeChartsClient as AgeCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Vaccine Side Effects by Age 2026 — VAERS Adverse Events by Age Group',
  description: 'Age breakdown of 1.98M VAERS vaccine adverse event reports. Adults 65+ hold 56% of death reports despite just 20% of total. Age-group patterns in context.',
  openGraph: {
    title: 'Vaccine Side Effects by Age 2026 — VAERS Adverse Events by Age Group',
    description: 'Age breakdown of 1.98M VAERS vaccine adverse event reports. Adults 65+ hold 56% of death reports despite just 20% of total. Age-group patterns in context.',
  },
}

export default function AgePatternsPage() {
  const ageGender = readJsonFile('age-gender.json')
  const ageGroups = ageGender.ageGroups

  const totalReports = ageGroups.reduce((s: number, g: { reports: number }) => s + g.reports, 0)
  const totalDeaths = ageGroups.reduce((s: number, g: { died: number }) => s + g.died, 0)

  const elderly = ageGroups.find((g: { group: string }) => g.group === '65+')
  const infants = ageGroups.find((g: { group: string }) => g.group === '0-2')

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="Age Patterns in VAERS Reports" description="Analysis of VAERS adverse event reports by age group, exploring who reports most and who has the most serious outcomes." slug="age-patterns" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Age Patterns in VAERS Reports' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-primary uppercase tracking-wider">6 min read</div><ShareButtons title="Age Patterns in VAERS Reports - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Age Patterns in VAERS Reports
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Who reports the most adverse events, and who experiences the most serious outcomes?
          Age is one of the most important factors in understanding VAERS data.
        </p>
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-primary mb-1">{formatNumber(elderly?.died || 15591)}</div>
          <div className="text-gray-700">
            death reports in the 65+ age group — <strong>{((elderly?.died / totalDeaths) * 100).toFixed(0)}%</strong> of all death reports,
            despite being {((elderly?.reports / totalReports) * 100).toFixed(0)}% of total reports
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Age Distribution</h2>
        <p>
          VAERS reports span all ages, from newborns to the elderly. But the distribution is far from uniform.
          Adults aged 18-49 file the most reports ({formatNumber(ageGroups.find((g: { group: string }) => g.group === '18-49')?.reports || 0)}),
          which makes sense given this is the largest demographic group.
        </p>
        <p>
          However, when we look at <strong>serious outcomes</strong>, the picture shifts dramatically.
          The 65+ age group accounts for {((elderly?.died / totalDeaths) * 100).toFixed(0)}% of all death reports
          and {((elderly?.hospitalized / ageGroups.reduce((s: number, g: { hospitalized: number }) => s + g.hospitalized, 0)) * 100).toFixed(0)}% of hospitalizations,
          despite representing just {((elderly?.reports / totalReports) * 100).toFixed(0)}% of total reports.
        </p>
      </div>

      {/* Chart */}
      <div className="mb-12">
        <AgeCharts ageGroups={ageGroups} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Infant Question (0-2 Years)</h2>
        <p>
          The 0-2 age group has {formatNumber(infants?.reports || 0)} reports with {formatNumber(infants?.died || 0)} death reports.
          This is a significant number that requires careful context:
        </p>
        <ul>
          <li><strong>Intensive vaccination schedule:</strong> Infants receive more vaccine doses in their first two years than any other period, creating more temporal associations</li>
          <li><strong>SIDS overlap:</strong> Sudden Infant Death Syndrome (SIDS) naturally peaks in the 2-4 month age range — the same period as many infant vaccinations. Temporal coincidence is expected</li>
          <li><strong>Mandatory reporting:</strong> Healthcare providers are required to report certain events in this age group, increasing the reporting rate</li>
          <li><strong>Heightened parental vigilance:</strong> Parents of young children may be more likely to report any health concern following vaccination</li>
        </ul>

        <h2 className={playfairDisplay.className}>Why the Elderly Have More Serious Outcomes</h2>
        <p>
          The concentration of death reports in the 65+ group reflects a fundamental reality:
          older adults have higher baseline mortality rates. When millions of elderly people are vaccinated,
          some will experience serious health events purely by coincidence in the days and weeks following vaccination.
        </p>
        <p>
          During the COVID-19 vaccination campaign, the elderly were prioritized for early vaccination.
          This population was already at highest risk for COVID-19 and had the highest baseline mortality rate.
          The temporal proximity of vaccination and natural health events creates inevitable coincidental reports.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
        {ageGroups
          .filter((g: { group: string }) => g.group !== 'Unknown')
          .map((g: { group: string; reports: number; died: number; hospitalized: number }) => (
          <div key={g.group} className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="text-lg font-bold text-gray-900">{g.group}</div>
            <div className="text-sm text-gray-500 mt-1">
              <div>{formatNumber(g.reports)} reports</div>
              <div className="text-danger">{formatNumber(g.died)} deaths</div>
              <div>{formatNumber(g.hospitalized)} hospitalizations</div>
            </div>
            <div className="text-xs text-gray-400 mt-2">
              Death rate: {((g.died / g.reports) * 100).toFixed(1)}% of reports
            </div>
          </div>
        ))}
      </div>

      {/* Key Takeaways */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>Adults 65+ have the highest rate of serious outcomes in VAERS, reflecting higher baseline health risks</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Infant reports are driven by intensive vaccination schedules and mandatory reporting, not necessarily higher risk</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>Age-related patterns in VAERS largely mirror age-related patterns in general health outcomes</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      
      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for age-related patterns in adverse events
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
          age-related patterns in adverse events across the full spectrum of vaccine safety surveillance.
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
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for age-related patterns in adverse events
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
          age-related patterns in adverse events across the full spectrum of vaccine safety surveillance.
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
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for age-related patterns in adverse events
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
          age-related patterns in adverse events across the full spectrum of vaccine safety surveillance.
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
            <div className="text-sm text-gray-500">Context for death reports in VAERS</div>
          </Link>
          <Link href="/analysis/gender-patterns" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Gender Disparities</div>
            <div className="text-sm text-gray-500">Why women report more often</div>
          </Link>
          <Link href="/analysis/elderly" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">The 65+ Age Group</div>
            <div className="text-sm text-gray-500">Why older adults have the highest serious-outcome rates</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
