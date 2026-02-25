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
  title: 'Serious Outcomes Analysis - VAERS Data',
  description: 'Analysis of serious vs non-serious outcomes in VAERS. Deaths, hospitalizations, ER visits, and disability reports across all vaccines.'
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
        </div>
      </div>
    </div>
  )
}
