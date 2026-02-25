import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { ReportingTrendsChartsClient as ReportingTrendsCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: '35 Years of VAERS Reporting Trends',
  description: 'Historical analysis of VAERS reporting trends from 1990 to 2026, including the COVID-era surge and return to baseline.'
}

export default function ReportingTrendsPage() {
  const yearlyStats = readJsonFile('yearly-stats.json')

  const year1990 = yearlyStats.find((y: { year: number }) => y.year === 1990)
  const year2021 = yearlyStats.find((y: { year: number }) => y.year === 2021)
  const year2025 = yearlyStats.find((y: { year: number }) => y.year === 2025)

  const preCovid = yearlyStats.filter((y: { year: number }) => y.year >= 2010 && y.year <= 2019)
  const preCovidAvg = Math.round(preCovid.reduce((s: number, y: { reports: number }) => s + y.reports, 0) / preCovid.length)

  const declinePct = (((year2021?.reports || 0) - (year2025?.reports || 0)) / (year2021?.reports || 1) * 100).toFixed(0)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: '35 Years of VAERS Reporting' }]} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-primary uppercase tracking-wider">7 min read</div><ShareButtons title="35 Years of VAERS Reporting Trends - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          35 Years of VAERS Reporting
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          From {formatNumber(year1990?.reports || 2214)} reports in 1990 to {formatNumber(year2021?.reports || 768706)} in 2021 — and the journey back to baseline.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-primary">{formatNumber(year1990?.reports || 2214)}</div>
            <div className="text-gray-700 text-sm">1990 (first year)</div>
          </div>
          <div className="bg-danger/5 border border-danger/20 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-danger">{formatNumber(year2021?.reports || 768706)}</div>
            <div className="text-gray-700 text-sm">2021 (peak)</div>
          </div>
          <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 text-center">
            <div className="text-2xl font-bold text-accent">{formatNumber(year2025?.reports || 40283)}</div>
            <div className="text-gray-700 text-sm">2025 (declining)</div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <ReportingTrendsCharts yearlyStats={yearlyStats} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Three Eras of VAERS</h2>
        <p>The history of VAERS reporting can be divided into three distinct eras:</p>

        <h3>Era 1: Early VAERS (1990-2006)</h3>
        <p>
          VAERS started small with just {formatNumber(year1990?.reports || 2214)} reports in its first year.
          Through the 1990s and early 2000s, annual reports hovered around 10,000-18,000.
          This was a period of steady, predictable growth as the system matured and awareness increased.
        </p>

        <h3>Era 2: Growth Period (2007-2019)</h3>
        <p>
          Starting around 2007, reporting jumped to 30,000-50,000 per year. Several factors drove this:
          the introduction of new vaccines (HPV, rotavirus), increased digital reporting infrastructure,
          and growing public awareness of VAERS. The pre-COVID decade (2010-2019) averaged about
          {' '}{formatNumber(preCovidAvg)} reports per year.
        </p>

        <h3>Era 3: COVID and Beyond (2020-Present)</h3>
        <p>
          The COVID-19 vaccination campaign caused an explosive spike in 2021 ({formatNumber(year2021?.reports || 768706)} reports).
          Since then, reporting has declined {declinePct}% from the peak. By 2025, annual reports
          ({formatNumber(year2025?.reports || 40283)}) are approaching pre-COVID levels, suggesting
          the system is returning to its historical baseline.
        </p>

        <h2 className={playfairDisplay.className}>Return to Baseline</h2>
        <p>
          The decline from the 2021 peak is significant and expected. As COVID-19 vaccination rates dropped,
          booster uptake declined, and the heightened awareness of VAERS faded, reports returned toward
          pre-pandemic levels. This pattern confirms that the spike was driven by the pandemic context,
          not a permanent change in reporting behavior.
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>VAERS has gone from ~2K reports/year to a peak of 769K, reflecting system growth and the COVID spike</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Post-COVID reporting has declined {declinePct}% from the 2021 peak, approaching pre-pandemic levels</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>The return to baseline suggests the spike was context-driven, not a permanent shift</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/covid-impact" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID-19 Impact</div>
            <div className="text-sm text-gray-500">Deeper dive into the pandemic era</div>
          </Link>
          <Link href="/analysis/top-symptoms" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Top Symptoms</div>
            <div className="text-sm text-gray-500">Most commonly reported adverse events</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
