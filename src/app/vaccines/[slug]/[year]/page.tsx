import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readdirSync } from 'fs'
import { join } from 'path'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import StatCard from '@/components/StatCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'

interface YearData {
  year: number
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
}

export const dynamicParams = true
export async function generateStaticParams() {
  const dir = join(process.cwd(), 'public', 'data', 'vaccine-years')
  const files = readdirSync(dir).filter(f => f.endsWith('.json'))
  const params: Array<{ slug: string; year: string }> = []

  for (const file of files) {
    const slug = file.replace('.json', '')
    try {
      const years: YearData[] = readJsonFile(`vaccine-years/${slug}.json`)
      for (const y of years) {
        if (y.reports >= 1) {
          params.push({ slug, year: String(y.year) })
        }
      }
    } catch {
      // skip
    }
  }

  return params
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; year: string }>
}): Promise<Metadata> {
  const { slug, year } = await params

  let vaccineName = slug.toUpperCase()
  try {
    const vaccine = readJsonFile(`vaccines/${slug}.json`)
    vaccineName = vaccine.name
  } catch { /* use slug */ }

  return {
    title: `${vaccineName} in ${year} - VAERS Reports`,
    description: `VAERS adverse event reports for ${vaccineName} vaccine in ${year}. Detailed breakdown of outcomes and reporting data.`
  }
}

export default async function VaccineYearPage({
  params
}: {
  params: Promise<{ slug: string; year: string }>
}) {
  const { slug, year } = await params
  const yearNum = parseInt(year, 10)

  if (isNaN(yearNum)) {
    notFound()
  }

  let years: YearData[]
  try {
    years = readJsonFile(`vaccine-years/${slug}.json`)
  } catch {
    notFound()
  }

  const match = years.find(y => y.year === yearNum)
  if (!match || match.reports < 5) {
    notFound()
  }

  // Get vaccine name
  let vaccineName = slug.toUpperCase()
  let totalVaccineReports = 0
  try {
    const vaccine = readJsonFile(`vaccines/${slug}.json`)
    vaccineName = vaccine.name
    totalVaccineReports = vaccine.reports
  } catch { /* use slug */ }

  // Compare with other years
  const validYears = years.filter(y => y.reports >= 1).sort((a, b) => b.reports - a.reports)
  const rank = validYears.findIndex(y => y.year === yearNum) + 1
  const avgReports = validYears.length > 0 ? Math.round(validYears.reduce((s, y) => s + y.reports, 0) / validYears.length) : 0
  const percentOfTotal = totalVaccineReports > 0 ? (match.reports / totalVaccineReports * 100).toFixed(1) : '—'

  // Previous and next years
  const prevYear = years.find(y => y.year === yearNum - 1 && y.reports >= 1)
  const nextYear = years.find(y => y.year === yearNum + 1 && y.reports >= 1)

  const changeFromPrev = prevYear ? ((match.reports - prevYear.reports) / prevYear.reports * 100).toFixed(0) : null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />

      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>→</li>
          <li><Link href="/vaccines" className="hover:text-primary">Vaccines</Link></li>
          <li>→</li>
          <li><Link href={`/vaccines/${slug}`} className="hover:text-primary">{vaccineName}</Link></li>
          <li>→</li>
          <li className="text-gray-900 font-medium">{year}</li>
        </ol>
      </nav>

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {vaccineName}
          </span>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {year}
          </span>
        </div>
        <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-2 ${playfairDisplay.className}`}>
          {vaccineName} in {year}
        </h1>
        <p className="text-lg text-gray-600">
          {formatNumber(match.reports)} adverse event reports
          {changeFromPrev && (
            <span className={parseInt(changeFromPrev) > 0 ? 'text-danger' : 'text-green-600'}>
              {' '}({parseInt(changeFromPrev) > 0 ? '+' : ''}{changeFromPrev}% vs {yearNum - 1})
            </span>
          )}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard title="Reports" value={match.reports} color="primary" />
        <StatCard title="Deaths" value={match.died} color="danger" />
        <StatCard title="Hospitalizations" value={match.hosp} color="accent" />
        <StatCard title="ER Visits" value={match.er} color="gray" />
        <StatCard title="Disabilities" value={match.disabled} color="gray" />
      </div>

      {/* Year navigation */}
      <div className="flex items-center justify-between mb-8 bg-gray-50 rounded-lg p-4">
        {prevYear ? (
          <Link href={`/vaccines/${slug}/${prevYear.year}`} className="text-primary hover:text-primary/80 text-sm font-medium">
            ← {prevYear.year} ({formatNumber(prevYear.reports)} reports)
          </Link>
        ) : <span />}
        {nextYear ? (
          <Link href={`/vaccines/${slug}/${nextYear.year}`} className="text-primary hover:text-primary/80 text-sm font-medium">
            {nextYear.year} ({formatNumber(nextYear.reports)} reports) →
          </Link>
        ) : <span />}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {year} Reporting Summary
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                In <strong>{year}</strong>, <strong>{formatNumber(match.reports)}</strong> adverse event reports were filed for {vaccineName} in VAERS.
                {totalVaccineReports > 0 && (
                  <> This represents <strong>{percentOfTotal}%</strong> of all {formatNumber(totalVaccineReports)} reports for this vaccine.</>
                )}
              </p>
              <p>
                Of these reports, <strong className="text-danger">{formatNumber(match.died)}</strong> mentioned death, <strong className="text-accent">{formatNumber(match.hosp)}</strong> involved hospitalization, <strong>{formatNumber(match.er)}</strong> required ER visits, and <strong>{formatNumber(match.disabled)}</strong> reported disability.
              </p>
              {avgReports > 0 && (
                <p>
                  Compared to the average of <strong>{formatNumber(avgReports)}</strong> reports per year for this vaccine, {year} was <strong>{match.reports > avgReports ? 'above' : 'below'} average</strong> ({match.reports > avgReports ? '+' : ''}{((match.reports - avgReports) / avgReports * 100).toFixed(0)}%).
                </p>
              )}
            </div>
          </div>

          {/* All years for this vaccine */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              All Years for {vaccineName}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reports</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deaths</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hosp.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {validYears
                    .sort((a, b) => b.year - a.year)
                    .map(y => (
                      <tr key={y.year} className={y.year === yearNum ? 'bg-primary/5 font-semibold' : 'hover:bg-gray-50'}>
                        <td className="px-4 py-3 text-sm">
                          {y.year === yearNum ? (
                            <span className="text-primary font-bold">{y.year} ← current</span>
                          ) : (
                            <Link href={`/vaccines/${slug}/${y.year}`} className="text-primary hover:text-primary/80">
                              {y.year}
                            </Link>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{formatNumber(y.reports)}</td>
                        <td className="px-4 py-3 text-sm text-danger">{formatNumber(y.died)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{formatNumber(y.hosp)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Understanding Yearly Data</h3>
            <div className="text-blue-800 space-y-3 text-sm">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Spikes may reflect awareness:</strong> Years with unusual activity (e.g., pandemic) often see increased reporting.</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Dose volume matters:</strong> More vaccinations given in a year naturally leads to more reports.</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Reporting lag:</strong> Some events are reported months after they occur, so recent years may be incomplete.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Reports:</span>
                <span className="font-semibold">{formatNumber(match.reports)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deaths:</span>
                <span className="font-semibold text-danger">{formatNumber(match.died)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hospitalizations:</span>
                <span className="font-semibold text-accent">{formatNumber(match.hosp)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-gray-600">% of Total:</span>
                <span className="font-semibold">{percentOfTotal}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rank (by vol.):</span>
                <span className="font-semibold">#{rank} of {validYears.length} years</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg/year:</span>
                <span className="font-semibold">{formatNumber(avgReports)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
            <div className="space-y-3">
              <Link href={`/vaccines/${slug}`} className="block w-full text-center bg-white border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                {vaccineName} Overview
              </Link>
              <Link href="/analysis/reporting-trends" className="block w-full text-center bg-white border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                35 Years of Reporting
              </Link>
              <Link href="/compare" className="block w-full text-center bg-primary text-white rounded-lg py-3 px-4 text-sm font-medium hover:bg-primary/90 transition-colors">
                Compare Vaccines
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
            <h4 className="font-semibold text-gray-900 mb-2">Data Source</h4>
            <p>
              This data comes from the{' '}
              <a href="https://vaers.hhs.gov" className="text-primary hover:text-primary/80" target="_blank" rel="noopener noreferrer">
                Vaccine Adverse Event Reporting System (VAERS)
              </a>, jointly managed by CDC and FDA.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
