import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Are Vaccines Safe? 1.98M VAERS Reports Analyzed (2026 Update)',
  description: 'Comprehensive look at vaccine safety through VAERS data. 1.98 million reports analyzed across 104 vaccines with full context on what the data means and doesn\'t mean.',
  alternates: { canonical: 'https://www.vaccinewatch.org/vaccine-safety' },
  openGraph: {
    title: 'Vaccine Safety — What 1.98M VAERS Reports Show',
    description: 'How vaccine safety is monitored through clinical trials, VAERS, VSD, CISA and ACIP — and what the 2026 VAERS data does and does not tell us.',
  },
}

export default function VaccineSafetyPage() {
  const stats = readJsonFile('stats.json')
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const topVaccines = [...vaccineIndex].sort((a: any, b: any) => b.reports - a.reports).slice(0, 10)

  const faqs = [
    { question: 'Are vaccines safe?', answer: 'Vaccines undergo rigorous testing before approval and are continuously monitored through systems like VAERS. While no medical intervention is 100% risk-free, the scientific consensus is that approved vaccines are safe and effective. VAERS data shows that the vast majority of reported adverse events are mild and self-limiting.' },
    { question: 'What does VAERS tell us about vaccine safety?', answer: 'VAERS is an early warning system that detects potential safety signals. It collects reports of adverse events after vaccination, but reports alone don\'t prove causation. VAERS is valuable for identifying patterns that warrant further investigation, not for determining whether vaccines cause specific adverse events.' },
    { question: 'How many adverse events are reported to VAERS?', answer: `As of 2026, VAERS contains ${stats?.totalReports?.toLocaleString() || '1,983,260'} reports across 104 vaccines spanning 35 years (1990-2026). The vast majority of these reports describe mild, expected reactions like injection site pain, fever, and fatigue.` },
    { question: 'Why are there so many VAERS reports for COVID vaccines?', answer: 'COVID-19 vaccines were administered to hundreds of millions of people in a very short timeframe during a period of intense public scrutiny. This led to dramatically higher reporting rates — a well-documented phenomenon called stimulated reporting. More reports does not mean more risk per dose.' },
    { question: 'How is vaccine safety monitored in the United States?', answer: 'Vaccine safety is monitored through a layered system. Before approval, vaccines go through preclinical testing and three phases of clinical trials. After approval, VAERS provides early warning signals, the Vaccine Safety Datalink (VSD) compares outcomes in vaccinated and unvaccinated people using electronic health records, the Clinical Immunization Safety Assessment (CISA) project offers expert case review, and the FDA\'s BEST system runs large-scale active surveillance. The ACIP reviews this evidence to guide recommendations.' },
    { question: 'Do more VAERS reports mean a vaccine is less safe?', answer: 'No. Report volume is driven mainly by how many doses were given, public awareness, media attention, and mandatory reporting rules — not by how safe a vaccine is. Because VAERS has no denominator (the number of doses administered), raw report counts cannot be used to compare risk between vaccines.' },
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Vaccine Safety' }]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">10 min read</div>
          <ShareButtons title="Vaccine Safety — What VAERS Data Shows" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Vaccine Safety: What VAERS Data Shows
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          A data-driven look at vaccine safety through the lens of {formatNumber(stats?.totalReports || 1983260)} adverse 
          event reports across 104 vaccines spanning 35 years. We present the numbers with context, 
          because raw data without interpretation is easily misunderstood.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(stats?.totalReports || 1983260)}</div>
          <div className="text-sm text-primary">Total Reports</div>
          <div className="text-xs text-gray-500 mt-1">Since 1990</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">104</div>
          <div className="text-sm text-primary">Vaccines Tracked</div>
          <div className="text-xs text-gray-500 mt-1">In VAERS database</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">35</div>
          <div className="text-sm text-primary">Years of Data</div>
          <div className="text-xs text-gray-500 mt-1">1990–2026</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(stats?.totalDied || 27732)}</div>
          <div className="text-xs text-red-500">Deaths Reported</div>
          <div className="text-xs text-gray-500 mt-1">Correlation ≠ causation</div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-12">
        <h2 className={`text-xl font-bold text-amber-900 mb-4 ${playfairDisplay.className}`}>💡 Key Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-900">
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>Vaccines undergo the most rigorous safety testing of any medical product</strong> — clinical trials, post-market surveillance (VAERS, VSD, CISA), and ongoing monitoring ensure safety signals are caught quickly.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>VAERS is designed to be over-inclusive</strong> — it captures everything reported after vaccination, including events that are purely coincidental. This is a feature, not a bug — it helps detect rare signals.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>The system works</strong> — VAERS detected the J&amp;J blood clot signal, the myocarditis signal after mRNA vaccines, and the intussusception signal after rotavirus vaccine. Each led to updated guidance.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>Context matters more than raw numbers</strong> — 8,000 Americans die daily from all causes. When millions are vaccinated, temporal coincidences are expected and don&apos;t indicate causation.</span>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The Big Picture</h2>
        <p>
          Vaccines are among the most studied medical interventions in history. Before approval, they undergo 
          years of clinical trials involving thousands of participants. After approval, multiple monitoring 
          systems — including VAERS — continuously track their safety.
        </p>
        <p>
          VAERS is one piece of this puzzle. It&apos;s an early warning system designed to detect potential 
          safety signals. It&apos;s <strong>not</strong> designed to prove or disprove that vaccines cause specific 
          adverse events. That distinction is critical for understanding the data on this site.
        </p>

        <h2 className={playfairDisplay.className}>What the Numbers Show</h2>
        <p>
          Across 35 years and billions of vaccine doses, VAERS has collected about 2 million reports. 
          The vast majority describe <strong>mild, expected reactions</strong>:
        </p>
        <ul>
          <li>Injection site pain, redness, or swelling</li>
          <li>Headache and fatigue</li>
          <li>Fever (usually low-grade, resolving in 1-2 days)</li>
          <li>Muscle aches</li>
        </ul>
        <p>
          Serious outcomes represent a small fraction. Of all reports, about {((stats?.totalHospitalized || 143653) / (stats?.totalReports || 1983260) * 100).toFixed(1)}% involved 
          hospitalization and {((stats?.totalDied || 27732) / (stats?.totalReports || 1983260) * 100).toFixed(1)}% mentioned death. 
          But these percentages are <strong>not risk rates</strong> — they&apos;re artifacts of a passive reporting system 
          with known biases. See our <Link href="/analysis/denominator-problem">denominator problem analysis</Link> for why.
        </p>

        <h2 className={playfairDisplay.className}>Why Raw VAERS Numbers Are Misleading</h2>
        <p>
          Three critical limitations make raw VAERS numbers unreliable for determining vaccine risk:
        </p>
        <ol>
          <li>
            <strong>No denominator.</strong> VAERS tells you how many reports exist, not how many people 
            were vaccinated. Without knowing the denominator, you can&apos;t calculate a rate. 
            <Link href="/analysis/denominator-problem">Learn more →</Link>
          </li>
          <li>
            <strong>Stimulated reporting.</strong> Media coverage, public concern, and legal incentives 
            dramatically increase reporting rates for some vaccines. COVID-19 vaccines have 20-50x higher 
            reporting rates than historical averages — not because they&apos;re less safe, but because reporting 
            was stimulated. <Link href="/analysis/reporting-bias">Learn more →</Link>
          </li>
          <li>
            <strong>Unverified reports.</strong> Anyone can file a VAERS report. Reports aren&apos;t investigated 
            or confirmed before being included in the database. This means some reports describe events 
            that had nothing to do with vaccination.
          </li>
        </ol>

        <h2 className={playfairDisplay.className}>Vaccine-Specific Safety Data</h2>
        <p>
          Different vaccines have different safety profiles. Explore detailed VAERS data for specific vaccines:
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
        <Link href="/side-effects/covid" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
          <div className="font-bold text-gray-900">COVID-19</div>
          <div className="text-xs text-gray-500">1.1M+ reports</div>
        </Link>
        <Link href="/side-effects/flu" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
          <div className="font-bold text-gray-900">Flu</div>
          <div className="text-xs text-gray-500">11 vaccine types</div>
        </Link>
        <Link href="/side-effects/mmr" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
          <div className="font-bold text-gray-900">MMR</div>
          <div className="text-xs text-gray-500">89K+ reports</div>
        </Link>
        <Link href="/side-effects/hpv" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
          <div className="font-bold text-gray-900">HPV</div>
          <div className="text-xs text-gray-500">Gardasil data</div>
        </Link>
        <Link href="/side-effects/dtap" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all">
          <div className="font-bold text-gray-900">DTaP</div>
          <div className="text-xs text-gray-500">66K+ reports</div>
        </Link>
        <Link href="/side-effects" className="bg-primary/5 border border-primary/20 rounded-xl p-4 hover:shadow-md transition-all">
          <div className="font-bold text-primary">All 14 Guides →</div>
          <div className="text-xs text-gray-500">Complete collection</div>
        </Link>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>How to Evaluate Vaccine Safety</h2>
        <p>
          When assessing vaccine safety, look beyond VAERS alone:
        </p>
        <ul>
          <li><strong>Clinical trials</strong> establish the baseline safety profile before approval</li>
          <li><strong>VAERS</strong> provides early warning signals after approval</li>
          <li><strong>Vaccine Safety Datalink (VSD)</strong> uses electronic health records to compare outcomes in vaccinated vs. unvaccinated populations</li>
          <li><strong>Clinical Immunization Safety Assessment (CISA)</strong> provides expert clinical review of individual cases</li>
          <li><strong>Biologics Effectiveness and Safety (BEST)</strong> is the FDA&apos;s large-scale active surveillance system</li>
        </ul>
        <p>
          VAERS is just one tool in a comprehensive safety monitoring ecosystem. It&apos;s the most accessible to the public, 
          which is why sites like VaccineWatch exist — to help you understand what the data means.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-12">
        <strong>⚠️ Important:</strong> This page presents VAERS data with context for educational purposes. 
        It is not medical advice. Vaccination decisions should be made in consultation with qualified 
        healthcare providers who can consider your individual medical history and risk factors.
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>How Vaccine Safety Is Monitored</h2>
        <p>
          Vaccine safety is not established once and forgotten — it is monitored continuously across the entire life
          of a vaccine, from the laboratory through decades of real-world use. Understanding this layered system helps
          put VAERS in perspective: it is one early-warning component of a much larger apparatus.
        </p>
        <h3 className={playfairDisplay.className}>Before Approval: Clinical Trials</h3>
        <p>
          Every vaccine begins with preclinical laboratory and animal studies, followed by three phases of human
          clinical trials. <strong>Phase 1</strong> tests safety and dosing in a small group of volunteers.{' '}
          <strong>Phase 2</strong> expands to hundreds of people to refine dosing and further assess safety and immune
          response. <strong>Phase 3</strong> enrolls thousands to tens of thousands of participants, comparing the
          vaccinated group against a placebo group to measure both effectiveness and the rate of adverse events. Only
          after this evidence is reviewed by the FDA — and, for recommendations, by the Advisory Committee on
          Immunization Practices (ACIP) — does a vaccine reach the public.
        </p>
        <h3 className={playfairDisplay.className}>After Approval: Post-Market Surveillance</h3>
        <p>
          Clinical trials, even large ones, cannot detect extremely rare events that occur in fewer than one in tens of
          thousands of people. That is the job of post-market surveillance, which includes several complementary systems:
        </p>
        <ul>
          <li><strong>VAERS</strong> — a passive early-warning system where anyone can report an event after vaccination. It is over-inclusive by design so that rare signals are not missed.</li>
          <li><strong>Vaccine Safety Datalink (VSD)</strong> — an active surveillance network using the electronic health records of several large healthcare organizations, covering millions of people, to compare event rates in vaccinated and unvaccinated populations.</li>
          <li><strong>Clinical Immunization Safety Assessment (CISA)</strong> — a network of medical experts who evaluate complex individual cases and help clinicians manage adverse events.</li>
          <li><strong>FDA BEST</strong> — the Biologics Effectiveness and Safety system, a large-scale active surveillance program drawing on claims and electronic health data.</li>
          <li><strong>ACIP</strong> — the expert committee that reviews accumulated safety and effectiveness evidence and updates vaccine recommendations accordingly.</li>
        </ul>
        <p>
          This system has repeatedly proven it works. VAERS and its partner systems detected the rare clotting signal
          after the J&amp;J vaccine, the myocarditis signal after mRNA vaccines, and the intussusception signal after an
          early rotavirus vaccine — each of which led to updated guidance or product changes. For a candid look at what
          VAERS can and cannot do, see <Link href="/is-vaers-reliable">is VAERS reliable?</Link> and our{' '}
          <Link href="/methodology">methodology</Link>. You can also explore the underlying reports in the{' '}
          <Link href="/vaers-database">VAERS database</Link> and review vaccine-specific{' '}
          <Link href="/side-effects">side effects guides</Link>.
        </p>
      </div>

      {/* FAQ */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>
          Vaccine Safety FAQ
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

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Dive Deeper</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/dashboard" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">📊 Full Dashboard →</div>
            <div className="text-sm text-gray-500">All 104 vaccines compared</div>
          </Link>
          <Link href="/is-vaers-reliable" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">🔍 Is VAERS Reliable? →</div>
            <div className="text-sm text-gray-500">Honest assessment</div>
          </Link>
          <Link href="/vaccine-safety-timeline" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">📅 Safety Timeline →</div>
            <div className="text-sm text-gray-500">Key events since 1955</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
