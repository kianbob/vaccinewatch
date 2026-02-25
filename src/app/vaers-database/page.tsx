import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'VAERS Database — Search & Explore Vaccine Adverse Event Reports',
  description: 'Explore the VAERS database with interactive tools. 1.98 million vaccine adverse event reports (1990-2026), 104 vaccines, 1,000+ symptoms — all searchable and contextualized.',
  openGraph: {
    title: 'VAERS Database — Search & Explore Vaccine Safety Data',
    description: '1.98M vaccine adverse event reports made searchable, sortable, and understandable.',
  },
}

export default function VAERSDatabasePage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const symptomIndex = readJsonFile('symptom-index.json')
  const stateIndex = readJsonFile('state-index.json')

  const stats = readJsonFile('stats.json')
  const totalReports = stats?.totalReports || 1983260
  const totalDeaths = stats?.totalDied || 27732
  const totalHosp = stats?.totalHospitalized || 143653

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'VAERS Database' }]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">Complete Guide</div>
          <ShareButtons title="VAERS Database — Search & Explore" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          VAERS Database
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The Vaccine Adverse Event Reporting System (VAERS) is the nation&apos;s early warning system 
          for vaccine safety. We&apos;ve processed all {formatNumber(totalReports)} reports into searchable, 
          contextualized data — so you don&apos;t have to navigate the clunky CDC interface.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm text-primary">Total Reports</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{vaccineIndex.length}</div>
          <div className="text-sm text-primary">Vaccines</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(symptomIndex.length)}</div>
          <div className="text-sm text-primary">Symptoms</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">35</div>
          <div className="text-sm text-primary">Years (1990–2026)</div>
        </div>
      </div>

      {/* What is VAERS */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What Is VAERS?</h2>
        <p>
          VAERS (Vaccine Adverse Event Reporting System) is a national passive surveillance system 
          co-managed by the <strong>CDC</strong> and <strong>FDA</strong>. Created in 1990 under the 
          National Childhood Vaccine Injury Act, VAERS collects reports of adverse health events 
          that occur after vaccination.
        </p>
        <p><strong>Key points about VAERS:</strong></p>
        <ul>
          <li><strong>Anyone can report:</strong> Patients, parents, healthcare providers, and manufacturers can all submit reports</li>
          <li><strong>Reports are unverified:</strong> VAERS does not investigate or confirm that vaccines caused the reported events</li>
          <li><strong>Passive system:</strong> Relies on voluntary reporting (except for certain mandated events)</li>
          <li><strong>Purpose:</strong> Detect potential safety signals that warrant further investigation — not to prove causation</li>
        </ul>

        <h2 className={playfairDisplay.className}>How to Use VAERS Data</h2>
        <p>VAERS data is useful for:</p>
        <ul>
          <li>Identifying unusual patterns that might indicate a safety signal</li>
          <li>Monitoring known adverse events across different vaccines</li>
          <li>Comparing reporting patterns between vaccines or time periods</li>
          <li>Understanding what types of events are being reported</li>
        </ul>
        <p>VAERS data should <strong>NOT</strong> be used to:</p>
        <ul>
          <li>Determine if a vaccine caused a specific adverse event</li>
          <li>Calculate the actual risk of an adverse event from vaccination</li>
          <li>Compare the safety of different vaccines without controlling for confounding factors</li>
          <li>Make personal vaccination decisions without consulting a healthcare provider</li>
        </ul>

        <h2 className={playfairDisplay.className}>VAERS vs CDC WONDER</h2>
        <p>
          The official way to access VAERS data is through <a href="https://wonder.cdc.gov/vaers.html" target="_blank" rel="noopener noreferrer">CDC WONDER</a>, 
          which provides query-based access but has a steep learning curve and limited visualization. 
          VaccineWatch processes the same raw data files but presents them with:
        </p>
        <ul>
          <li>Pre-built pages for every vaccine, symptom, manufacturer, and state</li>
          <li>Interactive charts and comparison tools</li>
          <li>Cross-referenced data (vaccine-symptom, vaccine-year, state-vaccine combinations)</li>
          <li>Context and disclaimers to help interpret the data correctly</li>
          <li>SEO-friendly pages for easy discovery</li>
        </ul>
      </div>

      {/* Ways to explore */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>
          Explore the Database
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/vaccines" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-2xl mb-2">💉</div>
            <div className="font-bold text-gray-900 mb-1">Browse by Vaccine</div>
            <div className="text-sm text-gray-500">{vaccineIndex.length} vaccines with detailed profiles, charts, and symptom breakdowns</div>
          </Link>
          <Link href="/symptoms" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-2xl mb-2">🩺</div>
            <div className="font-bold text-gray-900 mb-1">Browse by Symptom</div>
            <div className="text-sm text-gray-500">{formatNumber(symptomIndex.length)} symptoms with vaccine associations and severity data</div>
          </Link>
          <Link href="/states" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-2xl mb-2">🗺️</div>
            <div className="font-bold text-gray-900 mb-1">Browse by State</div>
            <div className="text-sm text-gray-500">{stateIndex.length} states and territories with per-capita rates</div>
          </Link>
          <Link href="/manufacturers" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-2xl mb-2">🏭</div>
            <div className="font-bold text-gray-900 mb-1">Browse by Manufacturer</div>
            <div className="text-sm text-gray-500">47 manufacturers with market share and report breakdowns</div>
          </Link>
          <Link href="/dashboard" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-bold text-gray-900 mb-1">Safety Dashboard</div>
            <div className="text-sm text-gray-500">All vaccines in one sortable, searchable table</div>
          </Link>
          <Link href="/search" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-2xl mb-2">🔎</div>
            <div className="font-bold text-gray-900 mb-1">Search Everything</div>
            <div className="text-sm text-gray-500">Find any vaccine, symptom, or data point</div>
          </Link>
          <Link href="/compare" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-2xl mb-2">⚖️</div>
            <div className="font-bold text-gray-900 mb-1">Compare Vaccines</div>
            <div className="text-sm text-gray-500">Side-by-side comparison with interactive charts</div>
          </Link>
          <Link href="/tools" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-2xl mb-2">🛠️</div>
            <div className="font-bold text-gray-900 mb-1">Interactive Tools</div>
            <div className="text-sm text-gray-500">13 specialized analysis tools</div>
          </Link>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Our Data Pipeline</h2>
        <p>
          VaccineWatch processes the complete VAERS dataset, which consists of three CSV files 
          per year (VAERSDATA, VAERSVAX, VAERSSYMPTOMS) going back to 1990. Our pipeline:
        </p>
        <ol>
          <li><strong>Download:</strong> Complete VAERS CSV files from the CDC (updated quarterly)</li>
          <li><strong>Parse:</strong> Proper CSV parsing to handle free-text fields with commas and quotes</li>
          <li><strong>Process:</strong> Extract and compute fields: onset timing, dose series, lot data, recovery status</li>
          <li><strong>Cross-reference:</strong> Generate vaccine-symptom, vaccine-year, state-vaccine, and manufacturer combinations</li>
          <li><strong>Aggregate:</strong> Compute statistics, rates, and rankings</li>
          <li><strong>Publish:</strong> Static JSON files served through Next.js with on-demand rendering</li>
        </ol>
        <p>
          The result: 85,000+ unique pages covering every meaningful combination of vaccine, 
          symptom, year, state, and manufacturer in the VAERS database.
        </p>

        <h2 className={playfairDisplay.className}>Data Coverage</h2>
        <ul>
          <li><strong>Reports:</strong> {formatNumber(totalReports)} total (1990–2026)</li>
          <li><strong>Deaths reported:</strong> {formatNumber(totalDeaths)}</li>
          <li><strong>Hospitalizations:</strong> {formatNumber(totalHosp)}</li>
          <li><strong>Vaccines:</strong> {vaccineIndex.length} unique types</li>
          <li><strong>Symptoms:</strong> {formatNumber(symptomIndex.length)} unique types</li>
          <li><strong>States/territories:</strong> {stateIndex.length}</li>
          <li><strong>Analysis articles:</strong> 23 in-depth analyses</li>
          <li><strong>Interactive tools:</strong> 13 specialized data tools</li>
        </ul>
      </div>

      {/* Analysis section */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Understanding the Data</h3>
        <p className="text-sm text-gray-600 mb-4">
          Before diving into the data, read these critical context articles:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/analysis/denominator-problem" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">The Denominator Problem →</div>
            <div className="text-sm text-gray-500">Why raw numbers are misleading</div>
          </Link>
          <Link href="/analysis/reporting-bias" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Reporting Bias →</div>
            <div className="text-sm text-gray-500">How bias affects VAERS data</div>
          </Link>
          <Link href="/analysis/reporting-trends" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Reporting Trends →</div>
            <div className="text-sm text-gray-500">35 years of patterns</div>
          </Link>
          <Link href="/faq" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">FAQ →</div>
            <div className="text-sm text-gray-500">Common questions answered</div>
          </Link>
        </div>
      </div>

      {/* Official resources */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Official VAERS Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a href="https://vaers.hhs.gov" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">VAERS Official Site ↗</div>
            <div className="text-sm text-gray-500">File a report or learn about VAERS</div>
          </a>
          <a href="https://wonder.cdc.gov/vaers.html" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">CDC WONDER ↗</div>
            <div className="text-sm text-gray-500">Official query interface</div>
          </a>
          <a href="https://vaers.hhs.gov/data/datasets.html" target="_blank" rel="noopener noreferrer" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Raw Data Downloads ↗</div>
            <div className="text-sm text-gray-500">CSV files used by VaccineWatch</div>
          </a>
          <Link href="/about" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">About VaccineWatch</div>
            <div className="text-sm text-gray-500">Our methodology and approach</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
