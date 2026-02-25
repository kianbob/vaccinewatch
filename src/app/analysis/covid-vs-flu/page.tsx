import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import { CovidVsFluChartsClient as CovidVsFluCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'COVID-19 vs Influenza Vaccines - VAERS Comparison',
  description: 'Side-by-side comparison of COVID-19 and influenza vaccine adverse event reports in VAERS. Understanding the differences in scale and context.'
}

export default function CovidVsFluPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')

  // Find COVID and flu vaccines
  const covidVaccines = vaccineIndex.filter((v: any) => v.type.startsWith('COVID'))
  const fluVaccines = vaccineIndex.filter((v: any) => v.type.startsWith('FLU') || v.type === 'FLUN')

  const covidTotal = covidVaccines.reduce((s: number, v: any) => s + v.reports, 0)
  const covidDeaths = covidVaccines.reduce((s: number, v: any) => s + v.died, 0)
  const covidHosp = covidVaccines.reduce((s: number, v: any) => s + v.hosp, 0)

  const fluTotal = fluVaccines.reduce((s: number, v: any) => s + v.reports, 0)
  const fluDeaths = fluVaccines.reduce((s: number, v: any) => s + v.died, 0)
  const fluHosp = fluVaccines.reduce((s: number, v: any) => s + v.hosp, 0)

  const comparisonData = [
    { metric: 'Total Reports', covid: covidTotal, flu: fluTotal },
    { metric: 'Deaths', covid: covidDeaths, flu: fluDeaths },
    { metric: 'Hospitalizations', covid: covidHosp, flu: fluHosp },
  ]

  // Load flu yearly data
  let fluYearlyData: any[] = []
  try {
    const fluTypes = ['flu4', 'flu3', 'flun']
    for (const type of fluTypes) {
      try {
        const data = readJsonFile(`vaccine-years/${type}.json`)
        for (const d of data) {
          const existing = fluYearlyData.find(y => y.year === d.year)
          if (existing) {
            existing.reports += d.reports
          } else {
            fluYearlyData.push({ year: d.year, reports: d.reports })
          }
        }
      } catch { /* skip */ }
    }
    fluYearlyData.sort((a, b) => a.year - b.year)
  } catch { /* no data */ }

  const covidDeathRate = covidTotal > 0 ? (covidDeaths / covidTotal * 100).toFixed(2) : '0'
  const fluDeathRate = fluTotal > 0 ? (fluDeaths / fluTotal * 100).toFixed(2) : '0'

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />

      <div className="mb-6 text-sm text-gray-500">
        <Link href="/analysis" className="hover:text-primary">Analysis</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">COVID vs Flu</span>
      </div>

      <div className="mb-12">
        <div className="text-xs font-medium text-danger uppercase tracking-wider mb-2">7 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          COVID-19 vs Influenza Vaccines
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The two most widely administered vaccines in the U.S. have vastly different VAERS profiles.
          But the numbers alone don&apos;t tell the full story.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-danger/5 border border-danger/20 rounded-lg p-6">
            <div className="text-2xl font-bold text-danger mb-1">{formatNumber(covidTotal)}</div>
            <div className="text-gray-700">COVID-19 vaccine reports</div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
            <div className="text-2xl font-bold text-primary mb-1">{formatNumber(fluTotal)}</div>
            <div className="text-gray-700">Influenza vaccine reports</div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Scale Difference</h2>
        <p>
          COVID-19 vaccines have <strong>{formatNumber(covidTotal)}</strong> VAERS reports compared to{' '}
          <strong>{formatNumber(fluTotal)}</strong> for influenza vaccines. That&apos;s a{' '}
          {fluTotal > 0 ? (covidTotal / fluTotal).toFixed(0) : '—'}x difference. But this comparison requires context:
        </p>
        <ul>
          <li><strong>Time period:</strong> Flu vaccines have been in VAERS since 1990 (35+ years). COVID-19 vaccines only since December 2020.</li>
          <li><strong>Dose volume:</strong> Over 670 million COVID-19 doses were administered in ~3 years, while flu doses average ~150 million per year.</li>
          <li><strong>Reporting mandates:</strong> COVID-19 vaccines had mandatory reporting requirements for certain events under EUA.</li>
          <li><strong>Public awareness:</strong> COVID-19 vaccines received unprecedented media attention, driving more voluntary reporting.</li>
        </ul>

        <h2 className={playfairDisplay.className}>Outcome Comparisons</h2>
        <p>
          The death report rate for COVID-19 vaccines is <strong>{covidDeathRate}%</strong> of reports,
          compared to <strong>{fluDeathRate}%</strong> for influenza. The hospitalization rate shows a similar
          pattern: COVID at {covidTotal > 0 ? (covidHosp / covidTotal * 100).toFixed(1) : '0'}% vs
          flu at {fluTotal > 0 ? (fluHosp / fluTotal * 100).toFixed(1) : '0'}%.
        </p>
        <p>
          These differences are largely explained by demographics. COVID-19 vaccines were prioritized for the
          elderly and those with comorbidities — groups with inherently higher mortality and hospitalization rates.
          Flu vaccines are distributed more evenly across age groups.
        </p>

        <h2 className={playfairDisplay.className}>What Fair Comparison Requires</h2>
        <p>
          A fair safety comparison would need: age-adjusted rates per million doses, stratified by risk factors,
          with background rate comparisons. VAERS provides none of these. For rigorous safety analysis,
          researchers use linked databases like the Vaccine Safety Datalink (VSD).
        </p>
      </div>

      <div className="mb-12">
        <CovidVsFluCharts comparisonData={comparisonData} yearlyData={fluYearlyData} />
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">1.</span>
            <span>COVID-19 vaccines have {fluTotal > 0 ? (covidTotal / fluTotal).toFixed(0) : '—'}x more VAERS reports than flu vaccines, but in a much shorter time period</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">2.</span>
            <span>Reporting mandates and public awareness drove COVID-19 reporting to unprecedented levels</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">3.</span>
            <span>Different demographics received each vaccine, making direct comparison misleading</span>
          </li>
          <li className="flex items-start">
            <span className="text-primary font-bold mr-2">4.</span>
            <span>Meaningful safety comparison requires per-dose, age-adjusted data that VAERS doesn&apos;t provide</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/covid-impact" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID-19 Impact on VAERS</div>
            <div className="text-sm text-gray-500">The full pandemic story</div>
          </Link>
          <Link href="/analysis/reporting-trends" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">35 Years of Reporting</div>
            <div className="text-sm text-gray-500">Historical trends</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
