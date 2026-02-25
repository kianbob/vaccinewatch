import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import StatCard from '@/components/StatCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import { VaccineYearlyChartClient as VaccineYearlyChart } from '@/components/ClientCharts'

interface VaccineData {
  name: string
  type: string
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
  lifeThreatening: number
  manufacturers: string[]
  yearly: Array<{
    year: number
    reports: number
    died: number
    hosp: number
    er: number
    disabled: number
  }>
  symptoms: Array<{
    name: string
    count: number
  }>
}

export async function generateStaticParams() {
  const vaccines = readJsonFile('vaccine-index.json')
  
  return vaccines.map((vaccine: any) => ({
    slug: slugify(vaccine.name)
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
                  key={manufacturer}
                  href={`/manufacturers#${slugify(manufacturer)}`}
                  className="text-sm bg-white border border-gray-200 rounded-md px-3 py-1 hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  {manufacturer}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
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
        <StatCard 
          title="Life-threatening" 
          value={vaccine.lifeThreatening}
          color="danger"
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
                <strong>{vaccine.name}</strong> is a {vaccine.type.toLowerCase()} vaccine with{' '}
                <strong>{formatNumber(vaccine.reports)}</strong> reports in VAERS spanning from 1990 to 2026.
              </p>
              <p>
                Of these reports, <strong className="text-danger">{formatNumber(vaccine.died)}</strong> mentioned death,{' '}
                <strong className="text-accent">{formatNumber(vaccine.hosp)}</strong> involved hospitalization, and{' '}
                <strong>{formatNumber(vaccine.er)}</strong> required emergency department visits.
              </p>
              {vaccine.manufacturers.length > 0 && (
                <p>
                  This vaccine is manufactured by: <strong>{vaccine.manufacturers.join(', ')}</strong>.
                </p>
              )}
            </div>
          </div>

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
          {vaccine.symptoms && vaccine.symptoms.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Most Reported Symptoms
              </h3>
              <div className="space-y-3">
                {vaccine.symptoms.slice(0, 10).map((symptom, index) => (
                  <div key={symptom.name} className="flex items-center justify-between">
                    <Link 
                      href={`/symptoms/${slugify(symptom.name)}`}
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
              <Link 
                href={`/symptoms?vaccine=${slugify(vaccine.name)}`}
                className="text-sm text-primary hover:text-primary/80 font-medium mt-4 inline-block"
              >
                View all symptoms →
              </Link>
            </div>
          )}

          {/* Related Actions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Explore Further
            </h3>
            <div className="space-y-3">
              <Link
                href={`/compare?vaccines=${slugify(vaccine.name)}`}
                className="block w-full text-center bg-white border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                Compare with Other Vaccines
              </Link>
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