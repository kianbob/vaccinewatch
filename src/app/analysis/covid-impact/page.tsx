import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import { CovidImpactChartsClient as CovidImpactCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'The COVID-19 Impact on VAERS',
  description: 'How the COVID-19 pandemic changed vaccine adverse event reporting, with data analysis of the unprecedented spike in VAERS reports.'
}

export default function CovidImpactPage() {
  const yearlyStats = readJsonFile('yearly-stats.json')
  const vaccineIndex = readJsonFile('vaccine-index.json')

  // Find COVID vaccine data
  const covidVaccine = vaccineIndex.find((v: { type: string }) => v.type === 'COVID19')

  // Calculate pre-COVID average
  const preCovid = yearlyStats.filter((y: { year: number }) => y.year >= 2010 && y.year <= 2019)
  const preCovidAvg = Math.round(preCovid.reduce((s: number, y: { reports: number }) => s + y.reports, 0) / preCovid.length)

  // COVID era total
  const covidEra = yearlyStats.filter((y: { year: number }) => y.year >= 2020 && y.year <= 2022)
  const covidEraTotal = covidEra.reduce((s: number, y: { reports: number }) => s + y.reports, 0)

  const year2021 = yearlyStats.find((y: { year: number }) => y.year === 2021)

  // Manufacturer data for COVID vaccines
  const manufacturerIndex = readJsonFile('manufacturer-index.json')
  const covidManufacturers = manufacturerIndex
    .filter((m: { vaccines?: { type: string }[] }) => m.vaccines?.some((v: { type: string }) => v.type === 'COVID19' || v.type === 'COVID19-2'))
    .map((m: { name: string; vaccines?: { type: string; count: number }[] }) => ({
      name: m.name,
      count: m.vaccines?.filter((v: { type: string }) => v.type === 'COVID19' || v.type === 'COVID19-2').reduce((s: number, v: { count: number }) => s + v.count, 0) || 0,
    }))
    .sort((a: { count: number }, b: { count: number }) => b.count - a.count)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'The COVID-19 Impact on VAERS' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="text-xs font-medium text-danger uppercase tracking-wider mb-2">8 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          The COVID-19 Impact on VAERS
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The COVID-19 pandemic fundamentally changed vaccine adverse event reporting.
          In 2021, VAERS received more reports than in the previous decade combined.
        </p>
        <div className="bg-danger/5 border border-danger/20 rounded-lg p-6">
          <div className="text-3xl font-bold text-danger mb-1">{formatNumber(year2021?.reports || 768706)}</div>
          <div className="text-gray-700">reports in 2021 alone — a <strong>{Math.round((year2021?.reports || 768706) / preCovidAvg)}x</strong> increase over the pre-COVID average of {formatNumber(preCovidAvg)}/year</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Unprecedented Spike</h2>
        <p>
          Between 1990 and 2019, VAERS received an average of about {formatNumber(preCovidAvg)} reports per year.
          Then came 2021. With the largest mass vaccination campaign in U.S. history, VAERS received
          {' '}<strong>{formatNumber(year2021?.reports || 768706)}</strong> reports in a single year —
          more than the entire period from 2005 to 2015 combined.
        </p>
        <p>
          The COVID-19 era ({formatNumber(covidEraTotal)} reports from 2020-2022) accounts for
          roughly <strong>{((covidEraTotal / 1983260) * 100).toFixed(0)}%</strong> of all VAERS reports ever submitted.
          This is a staggering concentration, but context is essential to understanding it.
        </p>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <CovidImpactCharts yearlyData={yearlyStats} manufacturerData={covidManufacturers} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why So Many Reports?</h2>
        <p>Several factors drove the unprecedented surge:</p>
        <ul>
          <li><strong>Scale of vaccination:</strong> Over 670 million COVID-19 doses were administered in the U.S. alone. More doses = more opportunities for temporal associations with adverse events.</li>
          <li><strong>Heightened awareness:</strong> The COVID-19 vaccines received unprecedented media attention. People were more aware of VAERS and more likely to report.</li>
          <li><strong>Reporting mandates:</strong> Healthcare providers were required to report certain events after COVID-19 vaccination, unlike many other vaccines.</li>
          <li><strong>EUA monitoring:</strong> Because the vaccines were initially under Emergency Use Authorization, there was intensified safety surveillance.</li>
          <li><strong>Public attention:</strong> Vaccines became a central topic of public discourse, driving more voluntary reporting.</li>
        </ul>

        <h2 className={playfairDisplay.className}>Pfizer vs. Moderna vs. Janssen</h2>
        <p>
          COVID-19 vaccine reports are dominated by the two mRNA vaccines.
          {covidVaccine && (
            <> The combined COVID-19 vaccine category has {formatNumber(covidVaccine.reports)} total reports,
            making it by far the largest single vaccine category in VAERS history.</>
          )}
        </p>
        <p>
          Pfizer-BioNTech and Moderna together account for over 92% of all COVID-19 vaccine VAERS reports.
          This reflects their dominant market share — they administered the vast majority of doses. Janssen (Johnson & Johnson)
          has a smaller share, partly because its single-dose regimen was less widely used and was later deprioritized.
        </p>

        <h2 className={playfairDisplay.className}>The Denominator Problem</h2>
        <p>
          It&apos;s tempting to look at these numbers and draw conclusions about vaccine safety. But the most
          important number is the one VAERS doesn&apos;t provide: <strong>the denominator</strong>.
        </p>
        <p>
          With 670+ million doses administered, a report rate of roughly 1,000 per million doses puts COVID-19
          vaccines in line with historical VAERS reporting rates for other widely-administered vaccines.
          The raw numbers are large because the number of doses was unprecedented.
        </p>
      </div>

      {/* Key Takeaways */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>The 2021 VAERS spike is historically unprecedented but driven primarily by the scale of vaccination</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>COVID-19 vaccines account for ~{((covidEraTotal / 1983260) * 100).toFixed(0)}% of all VAERS reports ever filed</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>Heightened awareness, reporting mandates, and EUA monitoring all contributed to elevated reporting</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Without denominator data (doses administered), raw report counts cannot determine relative safety</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/reporting-trends" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">35 Years of VAERS Reporting</div>
            <div className="text-sm text-gray-500">The full historical context</div>
          </Link>
          <Link href="/analysis/death-reports" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Understanding Death Reports</div>
            <div className="text-sm text-gray-500">What death reports actually mean</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
