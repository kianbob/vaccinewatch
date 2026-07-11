import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Vaccine Adverse Events — Search 1.98M VAERS Reports by Vaccine, Symptom & State',
  description: 'Browse 1.98M vaccine adverse event reports from VAERS across 104 vaccines and 35 years. Understand reporting, outcomes, and trends.',
  alternates: { canonical: 'https://www.vaccinewatch.org/adverse-events' },
  openGraph: {
    title: 'Vaccine Adverse Events — What VAERS Reports Show',
    description: 'Explore 1.98 million vaccine adverse event reports from VAERS across 104 vaccines.',
  },
}

export default function AdverseEventsPage() {
  const stats = readJsonFile('stats.json')
  const totalReports = stats?.totalReports || 1983260
  const totalDied = stats?.totalDied || 27732
  const totalHosp = stats?.totalHospitalized || 143653
  const totalER = stats?.totalER || 356123
  const totalDisabled = stats?.totalDisabled || 37185

  const faqs = [
    {
      question: 'What is a vaccine adverse event?',
      answer: 'A vaccine adverse event is any health problem that happens after vaccination. It may or may not be caused by the vaccine. VAERS collects reports of these events to look for potential safety signals.',
    },
    {
      question: 'How many vaccine adverse events are reported each year?',
      answer: `VAERS receives approximately 30,000-60,000 reports per year in normal years. In 2021, during the COVID-19 vaccination campaign, VAERS received over 768,000 reports. The total database contains ${totalReports.toLocaleString()} reports from 1990 to present.`,
    },
    {
      question: 'Does a VAERS report mean the vaccine caused the adverse event?',
      answer: 'No. VAERS reports show correlation, not causation. Many reported events are coincidental — they would have happened regardless of vaccination. Only controlled studies can determine whether a vaccine actually causes a specific adverse event.',
    },
    {
      question: 'What are the most common vaccine adverse events?',
      answer: 'The most commonly reported adverse events in VAERS include headache, fever, pain at the injection site, fatigue, chills, nausea, and dizziness. These are typically mild and resolve within days.',
    },
    {
      question: 'What is the difference between an adverse event and a side effect?',
      answer: 'A side effect is a health problem that has been shown to be caused by a vaccine. An adverse event is anything that happens after vaccination, whether or not the vaccine caused it. Because VAERS records adverse events by timing rather than by proven cause, most reports are not confirmed side effects.',
    },
    {
      question: 'Who can report a vaccine adverse event to VAERS?',
      answer: 'Anyone can submit a VAERS report — patients, parents, caregivers, healthcare providers, and manufacturers. Healthcare providers are legally required to report certain serious events. This openness helps capture rare signals but means reports are unverified and vary in quality.',
    },
    {
      question: 'What counts as a serious adverse event?',
      answer: 'VAERS classifies an adverse event as serious if it results in death, a life-threatening condition, hospitalization or prolonged hospitalization, permanent disability, or a congenital anomaly/birth defect. Serious reports are a small share of the total, and being classified as serious does not confirm the vaccine as the cause.',
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
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
        <ShareButtons title="Vaccine Adverse Events — What VAERS Reports Show" url="https://www.vaccinewatch.org/adverse-events" />
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

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-10">
        <h2 className={`text-xl font-bold text-amber-900 mb-4 ${playfairDisplay.className}`}>💡 Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-900">
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>&quot;Adverse event&quot; ≠ &quot;side effect.&quot;</strong> An adverse event is anything that happens after vaccination — including things that would have happened anyway. Only a fraction of VAERS reports represent actual vaccine reactions.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>~{((totalHosp + totalDied) / totalReports * 100).toFixed(0)}% of reports involve serious outcomes.</strong> The vast majority of VAERS submissions describe mild, expected reactions like injection site pain, headache, and fatigue.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>Anyone can submit a VAERS report</strong> — patients, parents, doctors, even lawyers. This openness is both a strength (captures rare events) and weakness (no verification of causality).</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>2021 saw {formatNumber(768706)} reports — more than the prior 5 years combined.</strong> The COVID-19 vaccine rollout plus unprecedented media attention created a massive spike in reporting awareness.</span>
          </div>
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

      {/* How Reporting Works */}
      <div className="prose prose-lg max-w-4xl mb-10">
        <h2 className={`${playfairDisplay.className}`}>How Adverse Events Are Reported</h2>
        <p>
          A VAERS report can be filed online or by mail, and anyone may submit one — the person who was vaccinated, a
          parent or caregiver, a healthcare provider, or a vaccine manufacturer. Healthcare providers are{' '}
          <strong>required by law</strong> to report certain events, such as those listed in the VAERS Table of
          Reportable Events Following Vaccination, and any adverse event listed in a vaccine&apos;s package insert as a
          contraindication. Manufacturers must report all adverse events brought to their attention.
        </p>
        <p>
          Each report captures the person&apos;s age and sex, the vaccine(s) given, the date of vaccination and the date
          symptoms began, a free-text description of what happened, and a set of outcome checkboxes. The symptoms are then
          coded by trained staff using <strong>MedDRA</strong>, a standardized medical dictionary, so that similar events
          can be grouped and searched. Importantly, VAERS staff do <strong>not</strong> investigate or confirm reports
          before accepting them — the system is intentionally open so that potential signals are not filtered out at the
          door. This is why raw reports must always be read as unverified and why they cannot, on their own, establish
          that a vaccine caused an event. For more on this, see our{' '}
          <Link href="/methodology" className="text-primary hover:underline">methodology</Link> and{' '}
          <Link href="/glossary" className="text-primary hover:underline">glossary</Link>.
        </p>

        <h2 className={`${playfairDisplay.className}`}>Severity Categories in VAERS</h2>
        <p>
          VAERS records several outcome flags that describe how serious a reported event was. A single report can carry
          more than one flag, so these categories overlap and should not be added together:
        </p>
        <ul>
          <li><strong>Death</strong> — the report noted that the person died. In this dataset there are {formatNumber(totalDied)} such reports, but a death reported to VAERS is not a confirmed vaccine-caused death.</li>
          <li><strong>Hospitalization</strong> — an inpatient hospital stay was reported ({formatNumber(totalHosp)} reports).</li>
          <li><strong>Emergency room / doctor visit</strong> — the event led to urgent care ({formatNumber(totalER)} reports).</li>
          <li><strong>Permanent disability</strong> — a lasting disability was reported ({formatNumber(totalDisabled)} reports).</li>
          <li><strong>Life-threatening</strong> — the reporter believed the person was at immediate risk of death at the time.</li>
        </ul>
        <p>
          A report is classified as a <strong>serious adverse event</strong> if it involves any of death, a
          life-threatening condition, hospitalization, permanent disability, or a birth defect. The great majority of
          VAERS reports fall <em>outside</em> these categories and describe mild, self-limiting reactions. Even for
          serious reports, classification reflects what was reported — not a determination that the vaccine was
          responsible. Explore how outcomes differ across vaccines in our{' '}
          <Link href="/dashboard" className="text-primary hover:underline">dashboard</Link> or by browsing{' '}
          <Link href="/symptoms" className="text-primary hover:underline">specific symptoms</Link>.
        </p>
      </div>

      {/* FAQ */}
      <div className="max-w-4xl mb-10">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>
          Adverse Events FAQ
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
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
