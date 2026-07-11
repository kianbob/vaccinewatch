import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'How to Search VAERS in 2026 — Easy Step-by-Step Guide (No Coding Required)',
  description: 'Search VAERS vaccine adverse event data the easy way in 2026. Browse vaccines, symptoms, states, and manufacturers with interactive tools — no complex queries.',
  openGraph: {
    title: 'How to Search VAERS Data — Easy 2026 Guide, No Coding',
    description: 'The simplest way to search VAERS vaccine adverse event data. Browse by vaccine, symptom, state, or manufacturer with interactive tools and built-in context.',
  },
}

export default function HowToSearchVAERSPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"Article","headline":"How to Search VAERS — Easy Guide to Vaccine Safety Data","description":"The easiest way to search VAERS data. No complex queries needed — browse vaccines, symptoms, states, and manufacturers with interactive tools and proper context.","url":"https://www.vaccinewatch.org/how-to-search-vaers","datePublished":"2026-02-25","dateModified":"2026-02-25","publisher":{"@type":"Organization","name":"VaccineWatch","url":"https://www.vaccinewatch.org"}}'}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How do I search VAERS data?', acceptedAnswer: { '@type': 'Answer', text: 'You can search VAERS in two main ways. VaccineWatch lets you browse and click through pre-built pages for every vaccine, symptom, state, and manufacturer — no query syntax required. Alternatively, the official CDC WONDER system provides raw, query-based access to the full dataset for custom searches.' } },
          { '@type': 'Question', name: 'Can I search VAERS by symptom?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. VaccineWatch indexes more than 1,000 reported symptoms. Each symptom page shows which vaccines are associated with it and how frequently it has been reported, so you can explore a specific adverse event across all vaccines.' } },
          { '@type': 'Question', name: 'How do I search VAERS for a specific vaccine like COVID-19?', acceptedAnswer: { '@type': 'Answer', text: 'Open the vaccine you want from the vaccines index (for example, the COVID-19 vaccine page). Each vaccine profile shows total reports, top symptoms, age distribution, yearly trends, and manufacturer breakdowns, all drawn directly from VAERS.' } },
          { '@type': 'Question', name: 'What is the difference between VaccineWatch and CDC WONDER?', acceptedAnswer: { '@type': 'Answer', text: 'CDC WONDER is the official query interface with full raw-data access but a steep learning curve and table-only output. VaccineWatch processes the same underlying VAERS files into browsable, chart-rich pages with built-in context. Use VaccineWatch for exploring and understanding the data, and CDC WONDER for custom raw queries.' } },
          { '@type': 'Question', name: 'Is searching VAERS data free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. VAERS data is fully public and free to access, both through the official CDC WONDER system and through tools like VaccineWatch that make it easier to browse and interpret.' } },
          { '@type': 'Question', name: 'Does a VAERS report mean a vaccine caused the event?', acceptedAnswer: { '@type': 'Answer', text: 'No. VAERS is a passive reporting system, so a report only means an event occurred after vaccination. It does not prove the vaccine caused the event, and raw counts should be interpreted with context such as doses administered and reporting patterns.' } },
        ],
      }) }} />
      <Breadcrumbs items={[{ label: 'How to Search VAERS' }]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">Guide</div>
          <ShareButtons title="How to Search VAERS" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          How to Search VAERS Data
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Looking for vaccine adverse event data? You&apos;re in the right place. VaccineWatch 
          makes VAERS data searchable and understandable — no complex queries needed.
        </p>
      </div>

      {/* Quick search CTA */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-8 mb-12 text-center">
        <h2 className={`text-2xl font-bold text-gray-900 mb-3 ${playfairDisplay.className}`}>
          Search Now
        </h2>
        <p className="text-gray-600 mb-6">Find any vaccine, symptom, or data point in our database</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/search" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors text-lg">
            🔎 Search VAERS Data
          </Link>
          <Link href="/dashboard" className="inline-flex items-center justify-center px-8 py-3 bg-white border border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors text-lg">
            📊 Open Dashboard
          </Link>
        </div>
      </div>

      {/* Ways to explore */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>
          5 Ways to Explore VAERS Data
        </h2>
        
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">1️⃣</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Search by Vaccine</h3>
                <p className="text-gray-600 mb-3">
                  Browse all 104 vaccines in VAERS. Each vaccine page shows total reports, 
                  top symptoms, age distribution, yearly trends, and manufacturer data.
                </p>
                <Link href="/vaccines" className="text-primary font-medium hover:underline">
                  Browse all vaccines →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">2️⃣</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Search by Symptom</h3>
                <p className="text-gray-600 mb-3">
                  Find any of 1,000+ reported symptoms. See which vaccines are associated 
                  with each symptom and how frequently it&apos;s reported.
                </p>
                <Link href="/symptoms" className="text-primary font-medium hover:underline">
                  Browse all symptoms →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">3️⃣</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Compare Vaccines</h3>
                <p className="text-gray-600 mb-3">
                  Put two vaccines side by side. Compare their adverse event profiles, 
                  severity rates, and symptom distributions.
                </p>
                <Link href="/compare" className="text-primary font-medium hover:underline">
                  Compare vaccines →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">4️⃣</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">View the Dashboard</h3>
                <p className="text-gray-600 mb-3">
                  See every vaccine in one sortable table. Sort by reports, deaths, 
                  hospitalizations, or severity rates. Filter and search.
                </p>
                <Link href="/dashboard" className="text-primary font-medium hover:underline">
                  Open dashboard →
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">5️⃣</div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">Use Interactive Tools</h3>
                <p className="text-gray-600 mb-3">
                  13 specialized tools for deep analysis: onset timing, lot lookups, 
                  dose comparisons, severity profiles, and more.
                </p>
                <Link href="/tools" className="text-primary font-medium hover:underline">
                  Explore tools →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>VaccineWatch vs CDC WONDER</h2>
        <p>
          The official way to search VAERS is through{' '}
          <a href="https://wonder.cdc.gov/vaers.html" target="_blank" rel="noopener noreferrer">CDC WONDER</a>. 
          It&apos;s powerful but has a steep learning curve. Here&apos;s how VaccineWatch compares:
        </p>

        <table>
          <thead>
            <tr>
              <th>Feature</th>
              <th>CDC WONDER</th>
              <th>VaccineWatch</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Ease of use</td>
              <td>Complex query interface</td>
              <td>Browse and click</td>
            </tr>
            <tr>
              <td>Context</td>
              <td>Minimal disclaimers</td>
              <td>Built-in context on every page</td>
            </tr>
            <tr>
              <td>Visualization</td>
              <td>Tables only</td>
              <td>Interactive charts</td>
            </tr>
            <tr>
              <td>Pre-built pages</td>
              <td>None</td>
              <td>85,000+ pages</td>
            </tr>
            <tr>
              <td>Cross-references</td>
              <td>Manual queries</td>
              <td>Automatic (vaccine-symptom, vaccine-year, etc.)</td>
            </tr>
            <tr>
              <td>Analysis articles</td>
              <td>None</td>
              <td>23 in-depth analyses</td>
            </tr>
            <tr>
              <td>Raw data access</td>
              <td>Yes (full query power)</td>
              <td>Pre-processed for accessibility</td>
            </tr>
          </tbody>
        </table>

        <p>
          <strong>Bottom line:</strong> Use VaccineWatch for browsing, exploring, and understanding 
          VAERS data. Use CDC WONDER for specific custom queries that require full database access.
        </p>
      </div>

      {/* Popular searches */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>
          Popular Searches
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'COVID-19 Vaccine', href: '/vaccines/covid19' },
            { label: 'Myocarditis', href: '/myocarditis' },
            { label: 'Flu Vaccine', href: '/side-effects/flu' },
            { label: 'Death Reports', href: '/vaccine-deaths' },
            { label: 'MMR Vaccine', href: '/side-effects/mmr' },
            { label: 'Pfizer', href: '/manufacturers/pfizer-biontech' },
            { label: 'Headache', href: '/symptoms/headache' },
            { label: 'HPV Vaccine', href: '/side-effects/hpv' },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-center hover:shadow-md hover:border-primary/30 transition-all">
              <span className="font-medium text-gray-900">{item.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Learn More</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/vaers-database" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">About the VAERS Database</div>
            <div className="text-sm text-gray-500">Data coverage and pipeline</div>
          </Link>
          <Link href="/is-vaers-reliable" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Is VAERS Reliable?</div>
            <div className="text-sm text-gray-500">Strengths and limitations</div>
          </Link>
          <Link href="/about" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">About VaccineWatch</div>
            <div className="text-sm text-gray-500">Our methodology</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
