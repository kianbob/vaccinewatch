import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'How to Report a Vaccine Adverse Event to VAERS',
  description: 'Step-by-step guide to reporting a vaccine adverse event to VAERS. Who can report, what to include, and what happens after you file. Plus: how reports become the data on VaccineWatch.',
  openGraph: {
    title: 'How to Report a Vaccine Adverse Event to VAERS',
    description: 'Step-by-step guide to reporting a vaccine adverse event to VAERS. Who can report, what to include, and what happens after you file. Plus: how reports become the data on VaccineWatch.',
  },
  alternates: { canonical: 'https://www.vaccinewatch.org/report-adverse-event' },
}

export default function ReportAdverseEventPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Who can report a vaccine adverse event to VAERS?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Anyone can report to VAERS — patients, parents, caregivers, healthcare providers, and vaccine manufacturers. Healthcare providers are required by law to report certain adverse events. There is no cost to file a report.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does it take to file a VAERS report?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The online VAERS form typically takes 15-30 minutes to complete. You\'ll need the vaccine name, manufacturer, lot number, date of vaccination, date symptoms started, and a description of the adverse event.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens after I file a VAERS report?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'After submission, VAERS assigns a report ID and may follow up for serious events. Reports are added to the public database (typically within weeks) and are analyzed by CDC/FDA for safety signals. Your report becomes part of the national vaccine safety monitoring system.',
        },
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={[{ label: 'Report an Adverse Event' }]} />

      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          How to Report a Vaccine Adverse Event
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl">
          If you or someone you know experienced a health problem after vaccination, you can report it
          to VAERS. Every report contributes to vaccine safety monitoring and helps protect public health.
        </p>
      </div>

      {/* Quick Action */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-10 max-w-3xl">
        <h2 className="text-lg font-bold text-gray-900 mb-2">Report Online at VAERS</h2>
        <p className="text-gray-600 mb-4">
          The quickest way to file a report is through the official VAERS online portal. It takes about 15-30 minutes.
        </p>
        <a
          href="https://vaers.hhs.gov/reportevent.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors"
        >
          Go to VAERS Reporting Portal →
        </a>
        <p className="text-xs text-gray-500 mt-2">External link to vaers.hhs.gov (official government website)</p>
      </div>

      <div className="prose prose-lg max-w-4xl mb-10">
        <h2 className={`${playfairDisplay.className}`}>Who Can Report?</h2>
        <p>Anyone can report to VAERS. There is no cost, and you don&apos;t need medical training.</p>
        <ul>
          <li><strong>Healthcare providers</strong> — Required by law to report certain events (listed in the Vaccine Injury Table) and encouraged to report any clinically significant adverse event.</li>
          <li><strong>Vaccine manufacturers</strong> — Required to report all adverse events they learn about.</li>
          <li><strong>Patients and caregivers</strong> — Encouraged to report any adverse event after vaccination.</li>
          <li><strong>Anyone else</strong> — Family members, friends, lawyers, or other interested parties.</li>
        </ul>

        <h2 className={`${playfairDisplay.className}`}>What to Include in Your Report</h2>
        <p>Gather this information before starting:</p>
        <ul>
          <li><strong>Vaccine details</strong> — Name, manufacturer, lot number, dose number</li>
          <li><strong>Vaccination date</strong> — When the vaccine was administered</li>
          <li><strong>Onset date</strong> — When symptoms first appeared</li>
          <li><strong>Description</strong> — Detailed description of the adverse event</li>
          <li><strong>Medical records</strong> — Relevant lab results, diagnoses, treatments (if available)</li>
          <li><strong>Patient info</strong> — Age, gender, pre-existing conditions, other medications</li>
          <li><strong>Outcome</strong> — Whether the person recovered, was hospitalized, etc.</li>
        </ul>
        <p className="text-gray-500 text-sm">
          Tip: Check your vaccination card for the lot number and exact vaccine name.
          If you don&apos;t have all the information, you can still submit a report — partial reports are accepted.
        </p>

        <h2 className={`${playfairDisplay.className}`}>What Happens After You Report</h2>
        <ol>
          <li><strong>Acknowledgment</strong> — VAERS assigns a unique report ID and sends confirmation.</li>
          <li><strong>Review</strong> — CDC/FDA staff review the report, especially for serious events.</li>
          <li><strong>Follow-up</strong> — For serious reports, VAERS may request additional medical records or contact you for details.</li>
          <li><strong>Database entry</strong> — Reports are added to the public VAERS database (typically within 1-4 weeks).</li>
          <li><strong>Analysis</strong> — CDC/FDA scientists analyze patterns across all reports to detect potential safety signals.</li>
        </ol>

        <h2 className={`${playfairDisplay.className}`}>Why Reporting Matters</h2>
        <p>
          VAERS is a <strong>passive surveillance system</strong> — it only works if people report. Studies suggest
          that only <Link href="/analysis/reporting-bias" className="text-primary">1-10% of adverse events are actually reported</Link> to VAERS
          (a phenomenon called underreporting).
        </p>
        <p>
          Every report helps. VAERS was instrumental in detecting:
        </p>
        <ul>
          <li><Link href="/myocarditis" className="text-primary">Myocarditis risk</Link> after mRNA COVID vaccines</li>
          <li>Thrombosis with thrombocytopenia (TTS) after J&amp;J/Janssen COVID vaccine</li>
          <li><Link href="/side-effects/rotavirus" className="text-primary">Intussusception</Link> after RotaShield rotavirus vaccine (led to withdrawal)</li>
          <li><Link href="/guillain-barre" className="text-primary">Guillain-Barré Syndrome</Link> association with certain flu vaccines</li>
        </ul>
      </div>

      {/* From Report to Data */}
      <div className="bg-gray-50 rounded-xl p-8 mb-10 max-w-4xl">
        <h2 className={`text-xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>From Your Report to VaccineWatch Data</h2>
        <p className="text-gray-600 mb-4">
          The data you explore on VaccineWatch comes directly from VAERS reports like the ones described above.
          Here&apos;s the pipeline:
        </p>
        <div className="flex flex-wrap gap-3">
          {['You file a report', 'CDC/FDA reviews', 'Added to database', 'CDC publishes CSV', 'VaccineWatch processes', 'You explore the data'].map((step, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="bg-primary text-white w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold">{i + 1}</span>
              <span className="text-sm text-gray-700">{step}</span>
              {i < 5 && <span className="text-gray-400">→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Related Pages */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className={`text-xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>Related Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/adverse-events" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Adverse Events</div>
            <div className="text-sm text-gray-500">Understanding VAERS data</div>
          </Link>
          <Link href="/is-vaers-reliable" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Is VAERS Reliable?</div>
            <div className="text-sm text-gray-500">Strengths &amp; limitations</div>
          </Link>
          <Link href="/vaers-database" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">VAERS Database</div>
            <div className="text-sm text-gray-500">Search &amp; explore</div>
          </Link>
          <Link href="/vaccine-injuries" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Vaccine Injuries</div>
            <div className="text-sm text-gray-500">VICP compensation</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
