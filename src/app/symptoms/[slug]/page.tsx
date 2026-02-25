import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import StatCard from '@/components/StatCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import { SymptomVaccinesChartClient as SymptomVaccinesChart } from '@/components/ClientCharts'

interface SymptomData {
  name: string
  reports: number
  died: number
  hosp: number
  vaccines: Array<{
    type: string
    count: number
  }>
}

export async function generateStaticParams() {
  const symptoms = readJsonFile('symptom-index.json')
  
  return symptoms.map((symptom: any) => ({
    slug: slugify(symptom.name)
  }))
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const symptom: SymptomData = readJsonFile(`symptoms/${slug}.json`)
    
    return {
      title: `${symptom.name} - VAERS Symptom Analysis`,
      description: `${formatNumber(symptom.reports)} reports of ${symptom.name} in VAERS. Deaths: ${formatNumber(symptom.died)}, Hospitalizations: ${formatNumber(symptom.hosp)}.`
    }
  } catch {
    return {
      title: 'Symptom Not Found',
      description: 'The requested symptom data could not be found.'
    }
  }
}

export default async function SymptomDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  
  let symptom: SymptomData
  
  try {
    symptom = readJsonFile(`symptoms/${slug}.json`)
  } catch {
    notFound()
  }

  const severityRate = symptom.reports > 0 ? ((symptom.died + symptom.hosp) / symptom.reports * 100) : 0
  const mortalityRate = symptom.reports > 0 ? (symptom.died / symptom.reports * 100) : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />

      {/* Breadcrumb */}
      <nav className="mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li>→</li>
          <li><Link href="/symptoms" className="hover:text-primary">Symptoms</Link></li>
          <li>→</li>
          <li className="text-gray-900 font-medium">{symptom.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          {symptom.name}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-lg text-gray-600">
          <span>{formatNumber(symptom.reports)} total reports</span>
          <span className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
            {severityRate.toFixed(1)}% serious outcomes
          </span>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Total Reports" 
          value={symptom.reports}
          color="primary"
        />
        <StatCard 
          title="Deaths" 
          value={symptom.died}
          color="danger"
        />
        <StatCard 
          title="Hospitalizations" 
          value={symptom.hosp}
          color="accent"
        />
        <StatCard 
          title="Severity Rate" 
          value={parseFloat(severityRate.toFixed(1))}
          subtitle="% serious outcomes"
          color="gray"
        />
      </div>

      {/* Associated Vaccines Chart */}
      <div className="mb-8">
        <SymptomVaccinesChart data={symptom.vaccines} symptomName={symptom.name} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About This Symptom */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About {symptom.name} Reports
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                <strong>{symptom.name}</strong> has been reported {formatNumber(symptom.reports)} times 
                in VAERS from 1990 to 2026.
              </p>
              <p>
                Of these reports, <strong className="text-danger">{formatNumber(symptom.died)}</strong> were 
                associated with death (<strong>{mortalityRate.toFixed(2)}%</strong>) and{' '}
                <strong className="text-accent">{formatNumber(symptom.hosp)}</strong> involved hospitalization.
              </p>
              <p>
                The overall <strong>serious outcome rate</strong> (death or hospitalization) for reports 
                mentioning {symptom.name} is <strong>{severityRate.toFixed(1)}%</strong>.
              </p>
            </div>
          </div>

          {/* Clinical Context */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Understanding {symptom.name} in VAERS
            </h3>
            <div className="text-blue-800 space-y-3 text-sm">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  <strong>Temporal association only:</strong> These reports show {symptom.name} occurred 
                  after vaccination, not necessarily because of vaccination.
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  <strong>Background rates matter:</strong> Many symptoms occur naturally at baseline rates 
                  in the population, unrelated to vaccination.
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  <strong>Reporting variability:</strong> Medical terminology may be used differently 
                  by various healthcare providers and over time.
                </span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>
                  <strong>Investigation needed:</strong> High-frequency reports may trigger further 
                  epidemiological studies to determine causation.
                </span>
              </div>
            </div>
          </div>

          {/* What This Data Shows */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              What This Data Shows
            </h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <strong>Most Associated Vaccines:</strong> The vaccines most frequently mentioned 
                in reports with {symptom.name}. This may reflect usage patterns, not causation.
              </div>
              <div>
                <strong>Severity Patterns:</strong> The percentage of reports that involve serious 
                outcomes can help prioritize safety investigations.
              </div>
              <div>
                <strong>Reporting Trends:</strong> Changes in reporting frequency over time may 
                reflect increased awareness, media attention, or actual safety signals.
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Associated Vaccines */}
          {symptom.vaccines && symptom.vaccines.length > 0 && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Most Associated Vaccines
              </h3>
              <div className="space-y-3">
                {symptom.vaccines
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10)
                  .map((vaccine, index) => (
                    <div key={vaccine.type} className="flex items-center justify-between">
                      <Link 
                        href={`/vaccines/${slugify(vaccine.type)}`}
                        className="text-sm text-primary hover:text-primary/80 font-medium truncate mr-2"
                      >
                        {index + 1}. {vaccine.type}
                      </Link>
                      <span className="text-sm text-gray-500 flex-shrink-0">
                        {formatNumber(vaccine.count)}
                      </span>
                    </div>
                  ))}
              </div>
              <Link 
                href={`/vaccines?symptom=${slugify(symptom.name)}`}
                className="text-sm text-primary hover:text-primary/80 font-medium mt-4 inline-block"
              >
                View all vaccines →
              </Link>
            </div>
          )}

          {/* Key Stats Summary */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Facts
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Reports:</span>
                <span className="font-semibold">{formatNumber(symptom.reports)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deaths:</span>
                <span className="font-semibold text-danger">{formatNumber(symptom.died)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hospitalizations:</span>
                <span className="font-semibold text-accent">{formatNumber(symptom.hosp)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-gray-600">Mortality Rate:</span>
                <span className="font-semibold">{mortalityRate.toFixed(2)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Severity Rate:</span>
                <span className="font-semibold">{severityRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Related Actions */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Explore Further
            </h3>
            <div className="space-y-3">
              <Link
                href="/symptoms"
                className="block w-full text-center bg-white border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors"
              >
                Compare with Other Symptoms
              </Link>
              <Link
                href="/analysis/top-symptoms"
                className="block w-full text-center bg-primary text-white rounded-lg py-3 px-4 text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Read Symptoms Analysis
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