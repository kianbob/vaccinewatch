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
  title: 'Understanding Death Reports in VAERS',
  description: 'What "death reported to VAERS" actually means, and why context is essential for interpreting these numbers.'
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
        </div>
      </div>
    </div>
  )
}
