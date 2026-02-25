import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import StatCard from '@/components/StatCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'
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
      title: `${vaccine.name} - VAERS Adverse Event Reports`,
      description: `${formatNumber(vaccine.reports)} adverse event reports for ${vaccine.name} vaccine in VAERS. Deaths: ${formatNumber(vaccine.died)}, Hospitalizations: ${formatNumber(vaccine.hosp)}.`
    }
  } catch {
    return {
      title: 'Vaccine Not Found',
      description: 'The requested vaccine data could not be found.'
    }
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

      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>→</li>
          <li><Link href="/vaccines" className="hover:text-primary">Vaccines</Link></li>
          <li>→</li>
          <li className="text-gray-900 font-medium">{vaccine.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-2 ${playfairDisplay.className}`}>
              {vaccine.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-lg text-gray-600">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {vaccine.type}
              </span>
              <span>{formatNumber(vaccine.reports)} total reports</span>
            </div>
          </div>
        </div>
        
        {vaccine.manufacturers.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Manufacturers:</h3>
            <div className="flex flex-wrap gap-2">
              {vaccine.manufacturers.map((manufacturer) => (
                <Link
                  key={manufacturer.name}
                  href={`/manufacturers/${slugify(manufacturer.name)}`}
                  className="text-sm bg-white border border-gray-200 rounded-md px-3 py-1 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  {manufacturer.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

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

      {/* Yearly Trend Chart */}
      <div className="mb-8">
        <VaccineYearlyChart data={vaccine.yearly} vaccineName={vaccine.name} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About This Vaccine */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About {vaccine.name}
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                <strong>{vaccine.name}</strong> has{' '}
                <strong>{formatNumber(vaccine.reports)}</strong> reports in VAERS spanning from 1990 to 2026.
              </p>
              <p>
                Of these reports, <strong className="text-danger">{formatNumber(vaccine.died)}</strong> mentioned death,{' '}
                <strong className="text-accent">{formatNumber(vaccine.hosp)}</strong> involved hospitalization, and{' '}
                <strong>{formatNumber(vaccine.er)}</strong> required emergency department visits.
              </p>
              {vaccine.manufacturers.length > 0 && (
                <p>
                  This vaccine is manufactured by: <strong>{vaccine.manufacturers.map(m => m.name).join(', ')}</strong>.
                </p>
              )}
            </div>
          </div>

          {/* Report Rate Context */}
          {vaccine.yearly.length > 0 && (() => {
            const yearsWithReports = vaccine.yearly.filter(y => y.count > 0)
            const numYears = yearsWithReports.length
            const avgPerYear = numYears > 0 ? Math.round(vaccine.reports / numYears) : 0
            const firstYear = yearsWithReports[0]?.year
            const lastYear = yearsWithReports[yearsWithReports.length - 1]?.year
            return (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Reporting Rate</h3>
                <p className="text-sm text-gray-600">
                  This vaccine averages <strong>{formatNumber(avgPerYear)} reports per year</strong> over {numYears} years of reporting ({firstYear}–{lastYear}).
                </p>
              </div>
            )
          })()}

          {/* Reporting Context */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Reported Symptoms */}
          {vaccineSymptoms.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Most Reported Symptoms
              </h3>
              <div className="space-y-3">
                {vaccineSymptoms.slice(0, 10).map((symptom, index) => (
                  <div key={symptom.name} className="flex items-center justify-between">
                    <Link
                      href={`/vaccines/${slug}/symptoms/${symptom.slug}`}
                      className="text-sm text-primary hover:text-primary/80 font-medium truncate mr-2"
                    >
                      {index + 1}. {symptom.name}
                    </Link>
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
            <div className="bg-white rounded-lg border border-gray-200 p-6">
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
            <div className="bg-white rounded-lg border border-gray-200 p-6">
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
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Explore Further
            </h3>
            <div className="space-y-3">
              <Link
                href="/compare"
                className="block w-full text-center bg-white border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                Compare with Other Vaccines
              </Link>
              {vaccine.type.startsWith('COVID') && (
                <Link
                  href="/analysis/covid-impact"
                  className="block w-full text-center bg-white border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  COVID-19 Impact Analysis
                </Link>
              )}
              <Link
                href="/analysis"
                className="block w-full text-center bg-primary text-white rounded-lg py-3 px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Read Analysis Articles
              </Link>
            </div>
          </div>

          {/* Data Source */}
          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
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