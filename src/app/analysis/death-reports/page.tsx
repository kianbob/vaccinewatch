import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { DeathReportsChartsClient as DeathReportsCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Vaccine Deaths in VAERS — 27,732 Reports Explained (2026 Data)',
  description: 'What "death reported to VAERS" actually means. 27,732 vaccine death reports analyzed with critical context on causation vs correlation and reporting limits.',
  openGraph: {
    title: 'Vaccine Deaths in VAERS — 27,732 Reports Explained (2026 Data)',
    description: 'What "death reported to VAERS" actually means. 27,732 vaccine death reports analyzed with critical context on causation vs correlation and reporting limits.',
  },
}

export default function DeathReportsPage() {
  const stats = readJsonFile('stats.json')
  const yearlyStats = readJsonFile('yearly-stats.json')
  const ageGender = readJsonFile('age-gender.json')

  const totalDeaths = stats.totalDied
  const deathRate = ((totalDeaths / stats.totalReports) * 100).toFixed(1)

  const year2021Deaths = yearlyStats.find((y: { year: number }) => y.year === 2021)?.died || 0
  const preCovid = yearlyStats.filter((y: { year: number }) => y.year >= 2010 && y.year <= 2019)
  const preCovidDeathAvg = Math.round(preCovid.reduce((s: number, y: { died: number }) => s + y.died, 0) / preCovid.length)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="Understanding Death Reports in VAERS" description="What " slug="death-reports" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Understanding Death Reports in VAERS' }]} />

      {/* Strong disclaimer upfront */}
      <div className="bg-amber-100 border border-amber-400 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-amber-900 mb-2">Critical Context Before Reading</h3>
        <p className="text-amber-800 text-sm">
          <strong>&quot;Death reported to VAERS&quot; does NOT mean &quot;death caused by a vaccine.&quot;</strong> VAERS
          accepts all reports of death occurring after vaccination, regardless of whether the vaccine played any role.
          Many reported deaths are in elderly individuals who died of pre-existing conditions, coincidental
          health events, or causes completely unrelated to vaccination. This distinction is essential.
        </p>
      </div>

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-danger uppercase tracking-wider">8 min read</div><ShareButtons title="Understanding Death Reports in VAERS - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Understanding Death Reports in VAERS
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          {formatNumber(totalDeaths)} death reports over 35 years. Context is everything.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-danger">{formatNumber(totalDeaths)}</div>
            <div className="text-gray-700 text-sm">Total Death Reports (1990-2026)</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-gray-700">{deathRate}%</div>
            <div className="text-gray-700 text-sm">Of all reports mention death</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-gray-700">{formatNumber(preCovidDeathAvg)}</div>
            <div className="text-gray-700 text-sm">Avg annual deaths (pre-COVID)</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What &quot;Death Reported&quot; Actually Means</h2>
        <p>
          When VAERS records a death, it means someone died at some point after receiving a vaccine, and
          a report was filed. The report does not establish causation. Consider this scenario:
        </p>
        <blockquote>
          An 85-year-old nursing home resident receives a flu vaccine. Three weeks later, they die of
          a heart attack related to longstanding coronary artery disease. A death report is filed with
          VAERS. This death appears in the statistics on this site.
        </blockquote>
        <p>
          In the United States, approximately 8,000-9,000 people die every day from all causes.
          When you vaccinate millions of people, some will inevitably die in the days and weeks after vaccination —
          not because of the vaccine, but because death is a constant occurrence in any large population.
        </p>

        <h2 className={playfairDisplay.className}>The COVID-Era Spike in Death Reports</h2>
        <p>
          In 2021, VAERS received {formatNumber(year2021Deaths)} death reports — roughly{' '}
          {Math.round(year2021Deaths / preCovidDeathAvg)}x the pre-COVID average of {formatNumber(preCovidDeathAvg)}/year.
          This increase parallels the overall reporting spike and reflects:
        </p>
        <ul>
          <li><strong>Scale:</strong> Hundreds of millions of doses were administered, many to elderly and high-risk individuals</li>
          <li><strong>Priority populations:</strong> Early vaccination targeted nursing home residents and those 65+, who have the highest baseline mortality</li>
          <li><strong>Mandatory reporting:</strong> Healthcare providers were required to report deaths after COVID-19 vaccination</li>
          <li><strong>Heightened vigilance:</strong> Any death after vaccination was more likely to be reported during the COVID era</li>
        </ul>
      </div>

      <div className="mb-12">
        <DeathReportsCharts yearlyStats={yearlyStats} ageGroups={ageGender.ageGroups} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Age Distribution of Death Reports</h2>
        <p>
          The age distribution of death reports closely mirrors the age distribution of natural mortality.
          Adults 65+ account for {((ageGender.ageGroups.find((g: { group: string }) => g.group === '65+')?.died || 0) / totalDeaths * 100).toFixed(0)}% of
          all VAERS death reports. In the general U.S. population, this age group accounts for roughly 75% of all deaths.
        </p>
        <p>
          This correlation between VAERS death report age distribution and natural mortality age distribution
          strongly suggests that most reported deaths are coincidental — they would have occurred regardless of vaccination.
        </p>

        <h2 className={playfairDisplay.className}>How Causation is Actually Determined</h2>
        <p>
          VAERS alone <strong>cannot determine</strong> whether a vaccine caused a death. Causation assessment requires:
        </p>
        <ul>
          <li>Medical record review and autopsy findings</li>
          <li>Epidemiological studies comparing death rates in vaccinated vs. unvaccinated populations</li>
          <li>Analysis through the Vaccine Safety Datalink (VSD) and other active surveillance systems</li>
          <li>Clinical Immunization Safety Assessment (CISA) review</li>
        </ul>
        <p>
          When these rigorous methods have been applied, they have confirmed that vaccine-caused deaths
          are extremely rare. The CDC has stated that after reviewing available clinical data, no causal
          link has been found between COVID-19 vaccines and most reported deaths.
        </p>
      </div>

      <div className="bg-danger/5 border border-danger/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">1.</span>
            <span>&quot;Death reported to VAERS&quot; does NOT mean &quot;death caused by vaccine&quot; — this distinction is critical</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">2.</span>
            <span>The age distribution of death reports mirrors natural mortality patterns, suggesting most are coincidental</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">3.</span>
            <span>Rigorous epidemiological studies (not VAERS data alone) are required to assess causation</span>
          </li>
          <li className="flex items-start">
            <span className="text-danger font-bold mr-2">4.</span>
            <span>The 2021 spike reflects the scale of vaccination and mandatory reporting, not a safety crisis</span>
          </li>
        </ul>
      </div>

      
      {/* 2026 Data Context */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Data Context</h2>
        <p>
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for death report analysis
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
          death report analysis across the full spectrum of vaccine safety surveillance.
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
          As VAERS reporting normalizes following the COVID-19 pandemic surge, the data landscape for death report analysis
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
          death report analysis across the full spectrum of vaccine safety surveillance.
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
            <div className="font-medium text-gray-900">Age Patterns</div>
            <div className="text-sm text-gray-500">How age affects outcomes</div>
          </Link>
          <Link href="/analysis/covid-impact" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID-19 Impact</div>
            <div className="text-sm text-gray-500">The pandemic&apos;s effect on VAERS</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious vs Non-Serious Outcomes</div>
            <div className="text-sm text-gray-500">The full severity spectrum in VAERS</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
