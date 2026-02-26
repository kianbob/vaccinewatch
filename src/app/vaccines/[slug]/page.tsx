import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify, getCleanVaccineName, formatManufacturer } from '@/lib/utils'
import StatCard from '@/components/StatCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { VaccineYearlyChartClient as VaccineYearlyChart } from '@/components/ClientCharts'

const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California',
  CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine', MD: 'Maryland',
  MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota', MS: 'Mississippi', MO: 'Missouri',
  MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey',
  NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont',
  VA: 'Virginia', WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
  DC: 'District of Columbia', PR: 'Puerto Rico', GU: 'Guam', VI: 'U.S. Virgin Islands',
  AS: 'American Samoa', MP: 'Northern Mariana Islands', UNK: 'Unknown', FR: 'Foreign'
}

interface VaccineData {
  name: string
  type: string
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
  lifeThreatening: number
  manufacturers: Array<{ name: string; count: number }>
  yearly: Array<{
    year: number
    count: number
  }>
  symptoms: Array<{
    name: string
    count: number
  }>
}

export const dynamicParams = true
export async function generateStaticParams() {
  const vaccinesDir = join(process.cwd(), 'public', 'data', 'vaccines')
  const files = readdirSync(vaccinesDir).filter(f => f.endsWith('.json'))

  return files.map(f => ({
    slug: f.replace('.json', '')
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const vaccine: VaccineData = readJsonFile(`vaccines/${slug}.json`)
    
    return {
      title: `${getCleanVaccineName(vaccine.name)} VAERS Reports & Safety Data`,
      description: `Explore ${formatNumber(vaccine.reports)} adverse event reports for ${getCleanVaccineName(vaccine.name)} in VAERS. View yearly trends, top symptoms, death reports (${formatNumber(vaccine.died)}), and hospitalization data (${formatNumber(vaccine.hosp)}).`
    }
  } catch {
    notFound()
  }
}

export default async function VaccineDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  let vaccine: VaccineData
  
  try {
    vaccine = readJsonFile(`vaccines/${slug}.json`)
  } catch {
    notFound()
  }

  const cleanName = getCleanVaccineName(vaccine.name)
  const stats = readJsonFile('stats.json') as { totalReports: number }
  const percentOfAll = stats.totalReports > 0 ? (vaccine.reports / stats.totalReports * 100).toFixed(1) : '0.0'

  // Load state distribution data
  let stateData: Array<{ state: string; reports: number; died: number; hosp: number }> = []
  const statePath = join(process.cwd(), 'public', 'data', 'vaccine-states', `${slug}.json`)
  if (existsSync(statePath)) {
    try {
      stateData = readJsonFile(`vaccine-states/${slug}.json`)
    } catch { /* no data */ }
  }
  const topStates = stateData
    .filter(s => s.state !== 'UNK' && s.state !== 'FR')
    .sort((a, b) => b.reports - a.reports)
    .slice(0, 10)

  // Load vaccine-symptoms for linking
  let vaccineSymptoms: Array<{ name: string; slug: string; count: number }> = []
  const symptomPath = join(process.cwd(), 'public', 'data', 'vaccine-symptoms', `${slug}.json`)
  if (existsSync(symptomPath)) {
    try {
      vaccineSymptoms = readJsonFile(`vaccine-symptoms/${slug}.json`)
    } catch { /* no data */ }
  }

  // Load advanced data
  const onsetTiming = readJsonFile('onset-timing.json')
  const doseSeries = readJsonFile('dose-series.json')
  const recoveryRates = readJsonFile('recovery-rates.json')
  const hospitalDuration = readJsonFile('hospital-duration.json')

  const vaccineOnset = onsetTiming?.byVaccine?.[vaccine.name] || null
  const vaccineDose = doseSeries?.[vaccine.name] || null
  const vaccineRecovery = recoveryRates?.[vaccine.name] || null
  const vaccineHospital = hospitalDuration?.[vaccine.name] || null

  // Load yearly data for sub-page links
  let yearlyData: Array<{ year: number; reports: number }> = []
  const yearPath = join(process.cwd(), 'public', 'data', 'vaccine-years', `${slug}.json`)
  if (existsSync(yearPath)) {
    try {
      yearlyData = readJsonFile(`vaccine-years/${slug}.json`)
    } catch { /* no data */ }
  }
  const yearsWithData = yearlyData.filter(y => y.reports >= 5).sort((a, b) => b.year - a.year)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />

      <Breadcrumbs items={[{ label: 'Vaccines', href: '/vaccines' }, { label: cleanName }]} />

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-2 ${playfairDisplay.className}`}>
              {cleanName}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-lg text-gray-600">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {vaccine.type}
              </span>
              <span>{formatNumber(vaccine.reports)} total reports</span>
            </div>
          </div>
          <div className="hidden md:block">
            <ShareButtons title={`${cleanName} VAERS Data — VaccineWatch`} />
          </div>
        </div>
        
        {vaccine.manufacturers.length > 0 && (
          <div className="bg-gray-50 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Manufacturers:</h3>
            <div className="flex flex-wrap gap-2">
              {vaccine.manufacturers.map((manufacturer) => (
                <Link
                  key={manufacturer.name}
                  href={`/manufacturers/${slugify(manufacturer.name)}`}
                  className="text-sm bg-white border border-gray-200 rounded-md px-3 py-1 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  {formatManufacturer(manufacturer.name)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SEO Description */}
      <p className="text-gray-600 text-lg mb-8 leading-relaxed">
        {cleanName} has {formatNumber(vaccine.reports)} reports in VAERS spanning from 1990 to 2026.
        Of these reports, {formatNumber(vaccine.died)} mentioned death, {formatNumber(vaccine.hosp)} involved
        hospitalization, and {formatNumber(vaccine.er)} required emergency department visits.
        {vaccine.manufacturers.length > 0 && (
          <> This vaccine is manufactured by: {vaccine.manufacturers.map(m => formatManufacturer(m.name)).join(', ')}.</>
        )}
        {' '}This vaccine accounts for {percentOfAll}% of all {formatNumber(stats.totalReports)} reports in the VAERS database.
      </p>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <StatCard
          title="Total Reports"
          value={vaccine.reports}
          color="primary"
        />
        <StatCard
          title="Deaths"
          value={vaccine.died}
          color="danger"
        />
        <StatCard
          title="Hospitalizations"
          value={vaccine.hosp}
          color="accent"
        />
        <StatCard
          title="ER Visits"
          value={vaccine.er}
          color="gray"
        />
        <StatCard
          title="Disabilities"
          value={vaccine.disabled}
          color="gray"
        />
      </div>

      {/* Automated Insights */}
      {(() => {
        const insights: Array<{ icon: string; text: string; color: string }> = []
        const deathRate = vaccine.reports > 0 ? (vaccine.died / vaccine.reports * 100) : 0
        const hospRate = vaccine.reports > 0 ? (vaccine.hosp / vaccine.reports * 100) : 0
        const avgDeathRate = stats.totalReports > 0 ? (27732 / stats.totalReports * 100) : 1.4
        const avgHospRate = stats.totalReports > 0 ? (143653 / stats.totalReports * 100) : 7.2
        
        if (deathRate > avgDeathRate * 2 && vaccine.died > 10) {
          insights.push({ icon: '⚠️', text: `Death reporting rate (${deathRate.toFixed(1)}%) is ${(deathRate/avgDeathRate).toFixed(1)}× the database average. This may reflect the patient population, not vaccine safety.`, color: 'amber' })
        }
        if (deathRate < avgDeathRate * 0.3 && vaccine.reports > 100) {
          insights.push({ icon: '📊', text: `Death reporting rate (${deathRate.toFixed(1)}%) is well below the database average (${avgDeathRate.toFixed(1)}%), likely reflecting the younger age of recipients.`, color: 'green' })
        }
        if (parseFloat(percentOfAll) > 10) {
          insights.push({ icon: '📈', text: `This vaccine accounts for ${percentOfAll}% of all VAERS reports — driven by massive vaccination campaigns, not higher risk.`, color: 'blue' })
        }
        const peakYear = vaccine.yearly?.reduce((max: { year: number; count: number }, y: { year: number; count: number }) => y.count > max.count ? y : max, { year: 0, count: 0 })
        if (peakYear && peakYear.year >= 2020 && peakYear.count > vaccine.reports * 0.3) {
          insights.push({ icon: '🦠', text: `${(peakYear.count / vaccine.reports * 100).toFixed(0)}% of all reports came in ${peakYear.year} alone, reflecting pandemic-era heightened reporting.`, color: 'primary' })
        }

        if (insights.length === 0) return null

        const colorMap: Record<string, string> = {
          amber: 'bg-amber-50 border-amber-200 text-amber-800',
          green: 'bg-green-50 border-green-200 text-green-800',
          blue: 'bg-blue-50 border-blue-200 text-blue-800',
          primary: 'bg-primary/5 border-primary/20 text-gray-800',
        }

        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
            {insights.map((insight, i) => (
              <div key={i} className={`border rounded-xl p-4 text-sm ${colorMap[insight.color]}`}>
                <span className="mr-2">{insight.icon}</span>
                {insight.text}
              </div>
            ))}
          </div>
        )
      })()}

      {/* Yearly Trend Chart */}
      <div className="mb-8">
        <VaccineYearlyChart data={vaccine.yearly} vaccineName={cleanName} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Report Rate Context */}
          {vaccine.yearly.length > 0 && (() => {
            const yearsWithReports = vaccine.yearly.filter(y => y.count > 0)
            const numYears = yearsWithReports.length
            const avgPerYear = numYears > 0 ? Math.round(vaccine.reports / numYears) : 0
            const firstYear = yearsWithReports[0]?.year
            const lastYear = yearsWithReports[yearsWithReports.length - 1]?.year
            return (
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Reporting Rate</h3>
                <p className="text-sm text-gray-600">
                  This vaccine averages <strong>{formatNumber(avgPerYear)} reports per year</strong> over {numYears} years of reporting ({firstYear}–{lastYear}).
                </p>
              </div>
            )
          })()}

          {/* Reporting Context */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Understanding These Numbers
            </h3>
            <div className="text-blue-800 space-y-3 text-sm">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  <strong>Reports don&apos;t prove causation.</strong> They represent temporal associations 
                  where someone experienced an event after vaccination.
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  <strong>Background rates matter.</strong> Many conditions occur naturally and 
                  may coincidentally happen after vaccination.
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  <strong>Reporting varies by vaccine.</strong> Newer vaccines or those in the news 
                  may have higher reporting rates due to increased awareness.
                </span>
              </div>
            </div>
          </div>
          {/* Onset Timing */}
          {vaccineOnset && (() => {
            const buckets = [
              { key: '0', label: 'Day 0 (same day)' },
              { key: '1', label: 'Day 1' },
              { key: '2', label: 'Day 2' },
              { key: '3', label: 'Day 3' },
              { key: '4', label: 'Day 4-7', keys: ['4','5','6','7'] },
              { key: '8-14', label: '8-14 days', keys: ['8','9','10','11','12','13','14','8-14'] },
              { key: '15-30', label: '15-30 days' },
              { key: '31-90', label: '1-3 months', keys: ['31-90'] },
              { key: '91-180', label: '3-6 months', keys: ['91-180'] },
              { key: '181-365', label: '6-12 months', keys: ['181-365'] },
            ]
            const rows = buckets.map(b => {
              const count = b.keys 
                ? b.keys.reduce((s, k) => s + (vaccineOnset[k] || 0), 0)
                : (vaccineOnset[b.key] || 0)
              return { label: b.label, count }
            }).filter(r => r.count > 0)
            const total = rows.reduce((s, r) => s + r.count, 0)
            if (total === 0) return null
            const maxCount = Math.max(...rows.map(r => r.count))
            return (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">⏱️ Onset Timing</h2>
                <p className="text-sm text-gray-500 mb-4">When symptoms typically appear after {cleanName} vaccination ({formatNumber(total)} reports with onset data)</p>
                <div className="space-y-2">
                  {rows.map(r => (
                    <div key={r.label} className="flex items-center gap-3">
                      <div className="w-32 text-sm text-gray-600 flex-shrink-0">{r.label}</div>
                      <div className="flex-grow bg-gray-100 rounded-full h-5 overflow-hidden">
                        <div className="bg-primary/70 h-full rounded-full" style={{ width: `${(r.count / maxCount) * 100}%` }} />
                      </div>
                      <div className="w-20 text-right text-sm text-gray-600 flex-shrink-0">
                        {formatNumber(r.count)} <span className="text-gray-400">({(r.count / total * 100).toFixed(0)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/tools/onset-calculator" className="inline-block mt-4 text-sm text-primary hover:text-primary/80 font-medium">
                  → Explore onset timing for all vaccines
                </Link>
              </div>
            )
          })()}

          {/* Dose Series */}
          {vaccineDose && (() => {
            const doses = Object.entries(vaccineDose as Record<string, { reports: number; died: number; hosp: number }>)
              .filter(([_, d]) => d.reports > 0)
              .sort((a, b) => {
                const order = ['1','2','3','4','5','6','UNK']
                return order.indexOf(a[0]) - order.indexOf(b[0])
              })
            if (doses.length < 2) return null
            return (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">💉 Reports by Dose Number</h2>
                <p className="text-sm text-gray-500 mb-4">How adverse event reports vary by which dose in the series</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 px-2 text-gray-600 font-medium">Dose</th>
                        <th className="text-right py-2 px-2 text-gray-600 font-medium">Reports</th>
                        <th className="text-right py-2 px-2 text-gray-600 font-medium">Deaths</th>
                        <th className="text-right py-2 px-2 text-gray-600 font-medium">Hosp.</th>
                        <th className="text-right py-2 px-2 text-gray-600 font-medium">Death Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {doses.map(([dose, data]) => (
                        <tr key={dose} className="border-b border-gray-100">
                          <td className="py-2 px-2 font-medium text-gray-900">{dose === 'UNK' ? 'Unknown' : `Dose ${dose}`}</td>
                          <td className="py-2 px-2 text-right text-gray-600">{formatNumber(data.reports)}</td>
                          <td className="py-2 px-2 text-right text-danger">{formatNumber(data.died)}</td>
                          <td className="py-2 px-2 text-right text-accent">{formatNumber(data.hosp)}</td>
                          <td className="py-2 px-2 text-right text-gray-600">{data.reports > 0 ? (data.died / data.reports * 100).toFixed(1) : '0.0'}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Link href="/tools/dose-explorer" className="inline-block mt-4 text-sm text-primary hover:text-primary/80 font-medium">
                  → Compare dose patterns across vaccines
                </Link>
              </div>
            )
          })()}

          {/* Recovery Rates */}
          {vaccineRecovery && (() => {
            const y = vaccineRecovery.Y || 0
            const n = vaccineRecovery.N || 0
            const u = vaccineRecovery.U || 0
            const total = y + n + u
            if (total === 0) return null
            const known = y + n
            const recoveryPct = known > 0 ? (y / known * 100).toFixed(1) : null
            return (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">📈 Recovery Outcomes</h2>
                <p className="text-sm text-gray-500 mb-4">Of {formatNumber(total)} reports with recovery status recorded</p>
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-xl">
                    <div className="text-2xl font-bold text-green-700">{formatNumber(y)}</div>
                    <div className="text-xs text-green-600 mt-1">Recovered</div>
                  </div>
                  <div className="text-center p-3 bg-red-50 rounded-xl">
                    <div className="text-2xl font-bold text-red-700">{formatNumber(n)}</div>
                    <div className="text-xs text-red-600 mt-1">Not Recovered</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 rounded-xl">
                    <div className="text-2xl font-bold text-gray-700">{formatNumber(u)}</div>
                    <div className="text-xs text-gray-600 mt-1">Unknown</div>
                  </div>
                </div>
                {recoveryPct && (
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-600">Recovery rate (of known outcomes)</span>
                      <span className="text-sm font-bold text-gray-900">{recoveryPct}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-full rounded-full" style={{ width: `${recoveryPct}%` }} />
                    </div>
                  </div>
                )}
                <Link href="/tools/recovery-explorer" className="inline-block mt-4 text-sm text-primary hover:text-primary/80 font-medium">
                  → Compare recovery rates across vaccines
                </Link>
              </div>
            )
          })()}

          {/* Hospital Duration */}
          {vaccineHospital && (() => {
            const buckets = [
              { key: '1', label: '1 day' },
              { key: '2', label: '2 days' },
              { key: '3', label: '3 days' },
              { key: '4', label: '4 days' },
              { key: '5', label: '5 days' },
              { key: '6', label: '6 days' },
              { key: '7', label: '7 days' },
              { key: '8-14', label: '8-14 days' },
              { key: '15-30', label: '15-30 days' },
              { key: '31+', label: '31+ days' },
            ]
            const rows = buckets.map(b => ({ label: b.label, count: (vaccineHospital as Record<string, number>)[b.key] || 0 })).filter(r => r.count > 0)
            const total = rows.reduce((s, r) => s + r.count, 0)
            if (total === 0) return null
            const maxCount = Math.max(...rows.map(r => r.count))
            return (
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🏥 Hospital Stay Duration</h2>
                <p className="text-sm text-gray-500 mb-4">Length of hospitalization for {formatNumber(total)} hospitalized cases</p>
                <div className="space-y-2">
                  {rows.map(r => (
                    <div key={r.label} className="flex items-center gap-3">
                      <div className="w-24 text-sm text-gray-600 flex-shrink-0">{r.label}</div>
                      <div className="flex-grow bg-gray-100 rounded-full h-5 overflow-hidden">
                        <div className="bg-accent/70 h-full rounded-full" style={{ width: `${(r.count / maxCount) * 100}%` }} />
                      </div>
                      <div className="w-20 text-right text-sm text-gray-600 flex-shrink-0">
                        {formatNumber(r.count)} <span className="text-gray-400">({(r.count / total * 100).toFixed(0)}%)</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/tools/hospital-duration" className="inline-block mt-4 text-sm text-primary hover:text-primary/80 font-medium">
                  → Explore hospital durations for all vaccines
                </Link>
              </div>
            )
          })()}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Reported Symptoms */}
          {vaccineSymptoms.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Most Reported Symptoms
              </h3>
              <div className="space-y-3">
                {vaccineSymptoms.slice(0, 10).map((symptom, index) => (
                  <div key={symptom.name} className="flex items-center justify-between">
                    <div className="flex items-center truncate mr-2">
                      <Link
                        href={`/vaccines/${slug}/symptoms/${symptom.slug}`}
                        className="text-sm text-primary hover:text-primary/80 font-medium truncate"
                      >
                        {index + 1}. {symptom.name}
                      </Link>
                      <Link
                        href={`/symptoms/${symptom.slug}`}
                        className="ml-1.5 text-xs text-gray-400 hover:text-primary flex-shrink-0"
                        title={`View all ${symptom.name} reports`}
                      >
                        (all)
                      </Link>
                    </div>
                    <span className="text-sm text-gray-500 flex-shrink-0">
                      {formatNumber(symptom.count)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Top States */}
          {topStates.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Reporting States</h3>
              <div className="space-y-3">
                {topStates.slice(0, 8).map((s, i) => (
                  <div key={s.state} className="flex items-center justify-between">
                    <Link href={`/states/${s.state.toLowerCase()}`} className="text-sm text-primary hover:text-primary/80 font-medium truncate mr-2">
                      {i + 1}. {STATE_NAMES[s.state] || s.state}
                    </Link>
                    <span className="text-sm text-gray-500 flex-shrink-0">{formatNumber(s.reports)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Yearly Sub-Pages */}
          {yearsWithData.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports by Year</h3>
              <div className="space-y-2">
                {yearsWithData.slice(0, 10).map(y => (
                  <div key={y.year} className="flex items-center justify-between">
                    <Link href={`/vaccines/${slug}/${y.year}`} className="text-sm text-primary hover:text-primary/80 font-medium">
                      {y.year}
                    </Link>
                    <span className="text-sm text-gray-500">{formatNumber(y.reports)}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Actions */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Explore Further
            </h3>
            <div className="space-y-3">
              <Link
                href={`/compare?v=${vaccine.type}`}
                className="block w-full text-center bg-white border border-primary/30 bg-primary/5 rounded-xl py-3 px-4 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
              >
                ⚖️ Compare {cleanName} with Others
              </Link>
              {vaccine.type.startsWith('COVID') && (
                <Link
                  href="/analysis/covid-impact"
                  className="block w-full text-center bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  COVID-19 Impact Analysis
                </Link>
              )}
              <Link
                href="/analysis"
                className="block w-full text-center bg-primary text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Read Analysis Articles
              </Link>
            </div>
          </div>

          {/* Related Analysis */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Related Analysis
            </h3>
            <div className="space-y-2">
              {vaccine.type.startsWith('COVID') && (
                <>
                  <Link href="/analysis/covid-impact" className="block text-sm text-primary hover:text-primary/80">
                    COVID-19 Vaccine Impact Analysis
                  </Link>
                  <Link href="/analysis/covid-vs-flu" className="block text-sm text-primary hover:text-primary/80">
                    COVID vs Flu Vaccine Comparison
                  </Link>
                  <Link href="/analysis/myocarditis" className="block text-sm text-primary hover:text-primary/80">
                    Myocarditis After COVID Vaccination
                  </Link>
                </>
              )}
              {['covid19', 'flu3', 'flu4', 'mmr', 'hpv4', 'hpv9', 'varzos', 'tdap', 'hep', 'ppv', 'pnc13', 'ipv', 'opv', 'varcel', 'mmrv', 'dtap', 'dtp', 'hepa', 'mnq', 'rv5', 'rv1'].includes(slug) && (
                <Link href={`/side-effects/${
                  slug.startsWith('covid') ? 'covid' :
                  slug.startsWith('flu') ? 'flu' :
                  slug === 'mmr' || slug === 'mmrv' ? 'mmr' :
                  slug.startsWith('hpv') ? 'hpv' :
                  slug === 'varzos' ? 'shingles' :
                  slug === 'tdap' ? 'tdap' :
                  slug === 'hep' ? 'hepatitis-b' :
                  slug === 'ppv' || slug === 'pnc13' ? 'pneumonia' :
                  slug === 'ipv' || slug === 'opv' ? 'polio' :
                  slug === 'varcel' ? 'varicella' :
                  slug === 'dtap' || slug === 'dtp' ? 'dtap' :
                  slug === 'hepa' ? 'hepatitis-a' :
                  slug === 'mnq' ? 'meningococcal' :
                  slug === 'rv5' || slug === 'rv1' ? 'rotavirus' : slug
                }`} className="block text-sm font-medium text-primary hover:text-primary/80 bg-primary/5 rounded-lg px-3 py-2 mb-2">
                  📋 Side Effects Guide →
                </Link>
              )}
              <Link href="/analysis/denominator-problem" className="block text-sm text-primary hover:text-primary/80">
                The Denominator Problem
              </Link>
              <Link href="/analysis/reporting-bias" className="block text-sm text-primary hover:text-primary/80">
                Understanding Reporting Bias
              </Link>
              <Link href="/analysis/onset-timing" className="block text-sm text-primary hover:text-primary/80">
                When Do Side Effects Start?
              </Link>
              <Link href="/analysis/death-reports" className="block text-sm text-primary hover:text-primary/80">
                Death Reports Deep Dive
              </Link>
              <Link href="/analysis/serious-outcomes" className="block text-sm text-primary hover:text-primary/80">
                Serious Outcomes Analysis
              </Link>
              <Link href="/analysis/top-symptoms" className="block text-sm text-primary hover:text-primary/80">
                Most Common Symptoms
              </Link>
            </div>
          </div>

          {/* Data Source */}
          <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600">
            <h4 className="font-semibold text-gray-900 mb-2">Data Source</h4>
            <p>
              This data comes from the{' '}
              <a 
                href="https://vaers.hhs.gov" 
                className="text-primary hover:text-primary/80"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vaccine Adverse Event Reporting System (VAERS)
              </a>
              , jointly managed by CDC and FDA.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}