import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Vaccine Adverse Events — What VAERS Reports Show',
  description: 'Explore 1.98 million vaccine adverse event reports from VAERS. Understand what adverse events are, how they\'re reported, and what the data shows across 104 vaccines.',
  alternates: { canonical: 'https://www.vaccinewatch.org/adverse-events' },
}

export default function AdverseEventsPage() {
  const stats = readJsonFile('stats.json')
  const totalReports = stats?.totalReports || 1983260
  const totalDied = stats?.totalDied || 27732
  const totalHosp = stats?.totalHospitalized || 143653
  const totalER = stats?.totalER || 356123
  const totalDisabled = stats?.totalDisabled || 37185

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is a vaccine adverse event?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A vaccine adverse event is any health problem that happens after vaccination. It may or may not be caused by the vaccine. VAERS collects reports of these events to look for potential safety signals.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many vaccine adverse events are reported each year?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: `VAERS receives approximately 30,000-60,000 reports per year in normal years. In 2021, during the COVID-19 vaccination campaign, VAERS received over 768,000 reports. The total database contains ${totalReports.toLocaleString()} reports from 1990 to present.`,
        },
      },
      {
        '@type': 'Question',
        name: 'Does a VAERS report mean the vaccine caused the adverse event?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. VAERS reports show correlation, not causation. Many reported events are coincidental — they would have happened regardless of vaccination. Only controlled studies can determine whether a vaccine actually causes a specific adverse event.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the most common vaccine adverse events?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The most commonly reported adverse events in VAERS include headache, fever, pain at the injection site, fatigue, chills, nausea, and dizziness. These are typically mild and resolve within days.',
        },
      },
    ],
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Breadcrumbs items={[{ label: 'Adverse Events' }]} />

      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Vaccine Adverse Events
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mb-4">
          A vaccine adverse event is any health problem that occurs after vaccination. The Vaccine Adverse Event
          Reporting System (VAERS) has collected <strong>{formatNumber(totalReports)} reports</strong> of adverse
          events across <strong>104 vaccines</strong> since 1990. This page explains what adverse events are, how
          they&apos;re tracked, and how to explore the data.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-xs text-gray-500 mt-1">Total Reports</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-danger">{formatNumber(totalDied)}</div>
          <div className="text-xs text-gray-500 mt-1">Deaths Reported</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{formatNumber(totalHosp)}</div>
          <div className="text-xs text-gray-500 mt-1">Hospitalizations</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">{formatNumber(totalER)}</div>
          <div className="text-xs text-gray-500 mt-1">ER Visits</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{formatNumber(totalDisabled)}</div>
          <div className="text-xs text-gray-500 mt-1">Disabilities</div>
        </div>
      </div>

      {/* What Are Adverse Events */}
      <div className="prose prose-lg max-w-4xl mb-10">
        <h2 className={`${playfairDisplay.className}`}>What Is a Vaccine Adverse Event?</h2>
        <p>
          A <strong>vaccine adverse event</strong> (also called an adverse event following immunization, or AEFI)
          is any health problem that happens after someone receives a vaccine. This includes everything from
          common reactions like soreness at the injection site to rare serious events like anaphylaxis.
        </p>
        <p>
          Importantly, an adverse event is defined by <em>timing</em>, not causation. If you get a headache the
          day after a flu shot, that&apos;s an adverse event — even though millions of people get headaches every
          day regardless of vaccination. The key challenge in vaccine safety science is separating true
          vaccine-caused events from coincidental ones.
        </p>

        <h2 className={`${playfairDisplay.className}`}>How Are Adverse Events Tracked?</h2>
        <p>
          In the United States, vaccine adverse events are monitored through several complementary systems:
        </p>
        <ul>
          <li><strong>VAERS</strong> — The Vaccine Adverse Event Reporting System. A passive system where anyone can submit a report. This is the data VaccineWatch explores.</li>
          <li><strong>VSD</strong> — The Vaccine Safety Datalink. An active surveillance system using electronic health records from 9 healthcare organizations, covering ~12 million people.</li>
          <li><strong>CISA</strong> — The Clinical Immunization Safety Assessment project. Provides expert clinical consultation for complex adverse events.</li>
          <li><strong>v-safe</strong> — A smartphone-based system used during the COVID-19 vaccine rollout for active follow-up.</li>
        </ul>
        <p>
          VAERS is the most publicly accessible of these systems, which is why it&apos;s frequently cited in public
          discourse. However, it has significant limitations — most importantly, <Link href="/is-vaers-reliable" className="text-primary hover:underline">reports don&apos;t prove causation</Link>.
        </p>

        <h2 className={`${playfairDisplay.className}`}>Types of Adverse Events</h2>
        <p>Adverse events fall on a spectrum from common and mild to rare and serious:</p>
      </div>

      {/* Severity Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-4xl">
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="font-bold text-green-900 mb-2">Common &amp; Mild</h3>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• Pain at injection site</li>
            <li>• Low-grade fever</li>
            <li>• Fatigue</li>
            <li>• Headache</li>
            <li>• Muscle aches</li>
          </ul>
          <p className="text-xs text-green-600 mt-3">Expected reactions showing immune response. Usually resolve in 1-3 days.</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-amber-900 mb-2">Uncommon &amp; Moderate</h3>
          <ul className="text-sm text-amber-800 space-y-1">
            <li>• High fever (&gt;103°F)</li>
            <li>• Rash or hives</li>
            <li>• Joint pain</li>
            <li>• Swollen lymph nodes</li>
            <li>• Extended fatigue</li>
          </ul>
          <p className="text-xs text-amber-600 mt-3">May require medical attention but typically resolve fully.</p>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="font-bold text-red-900 mb-2">Rare &amp; Serious</h3>
          <ul className="text-sm text-red-800 space-y-1">
            <li>• Anaphylaxis</li>
            <li>• Guillain-Barré Syndrome</li>
            <li>• Myocarditis/Pericarditis</li>
            <li>• Thrombosis (TTS)</li>
            <li>• Intussusception</li>
          </ul>
          <p className="text-xs text-red-600 mt-3">Well-documented but extremely rare. Often 1-5 per million doses.</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-4xl mb-10">
        <h2 className={`${playfairDisplay.className}`}>Understanding the Numbers</h2>
        <p>
          The {formatNumber(totalReports)} reports in VAERS span 35 years of vaccination history. Key context:
        </p>
        <ul>
          <li><strong>2021 was an outlier</strong> — The COVID-19 vaccination campaign generated over 768,000 reports in a single year, compared to a typical ~30,000-60,000.</li>
          <li><strong>Reporting rates vary by vaccine</strong> — Newer vaccines and those given to adults tend to generate more reports per dose than established childhood vaccines.</li>
          <li><strong>Most reports describe non-serious events</strong> — Over 85% of VAERS reports describe symptoms that resolve without lasting effects.</li>
          <li><strong>Death reports require context</strong> — The {formatNumber(totalDied)} death reports don&apos;t mean vaccines caused those deaths. <Link href="/vaccine-deaths" className="text-primary hover:underline">Learn about death report context →</Link></li>
        </ul>
      </div>

      {/* Explore the Data */}
      <div className="border-t border-gray-200 pt-8">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>Explore Adverse Event Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/vaccines" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">By Vaccine</div>
            <div className="text-sm text-gray-500">104 vaccine types</div>
          </Link>
          <Link href="/symptoms" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">By Symptom</div>
            <div className="text-sm text-gray-500">500+ reported symptoms</div>
          </Link>
          <Link href="/states" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">By State</div>
            <div className="text-sm text-gray-500">65 jurisdictions</div>
          </Link>
          <Link href="/manufacturers" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">By Manufacturer</div>
            <div className="text-sm text-gray-500">46 companies</div>
          </Link>
          <Link href="/dashboard" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Dashboard</div>
            <div className="text-sm text-gray-500">Compare all vaccines</div>
          </Link>
          <Link href="/side-effects" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Side Effects Guide</div>
            <div className="text-sm text-gray-500">14 vaccine-specific guides</div>
          </Link>
          <Link href="/search" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Search</div>
            <div className="text-sm text-gray-500">Find specific data</div>
          </Link>
          <Link href="/analysis" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-gray-900 mb-1">Analysis</div>
            <div className="text-sm text-gray-500">23 in-depth articles</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
