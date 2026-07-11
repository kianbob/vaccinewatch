import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Chickenpox (Varicella) Vaccine Side Effects 2026 — Varivax Data',
  description: 'VAERS analysis of varicella (chickenpox) vaccine side effects and adverse events. 93,000+ reports for Varivax covering rash, fever, and rare serious outcomes.',
  openGraph: {
    title: 'Varicella (Chickenpox) Vaccine Side Effects — VAERS Data',
    description: '93,000+ chickenpox vaccine adverse event reports analyzed from VAERS data, with full context on Varivax safety.',
  },
}

export default function VaricellaSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const types = ["VARCEL", "MMRV"]
  const vaccines = vaccineIndex.filter((v: any) => types.includes(v.type))

  let totalReports = 0, totalDeaths = 0, totalHosp = 0, totalER = 0
  vaccines.forEach((v: any) => {
    totalReports += v.reports; totalDeaths += v.died; totalHosp += v.hosp; totalER += v.er || 0
  })

  const mainVax = vaccineIndex.find((v: any) => v.type === 'VARCEL')
  const topSymptoms = mainVax?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'Varicella (Chickenpox) Vaccine' }
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What are common chickenpox vaccine side effects?","acceptedAnswer":{"@type":"Answer","text":"Common side effects include injection site soreness, mild rash (about 4% of children), low-grade fever, and fatigue."}},{"@type":"Question","name":"Can you get chickenpox from the vaccine?","acceptedAnswer":{"@type":"Answer","text":"A mild rash with a few spots is possible but rare. This is much milder than a full chickenpox infection."}},{"@type":"Question","name":"How many chickenpox vaccine reports are in VAERS?","acceptedAnswer":{"@type":"Answer","text":"VAERS contains over 93,000 varicella reports reflecting decades of routine childhood vaccination since 1995."}}]}' }} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">5 min read</div>
          <ShareButtons title="Varicella Vaccine Side Effects — VAERS Data" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Varicella (Chickenpox) Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The varicella vaccine (Varivax) protects against chickenpox and is given as two doses in childhood. 
          With over 93,000 VAERS reports, it&apos;s one of the most-reported childhood vaccines — largely 
          reflecting its widespread use since FDA approval in 1995.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm text-primary">Total Reports</div>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{formatNumber(totalDeaths)}</div>
          <div className="text-xs text-red-500">Deaths Reported</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">{formatNumber(totalHosp)}</div>
          <div className="text-xs text-amber-500">Hospitalizations</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalER)}</div>
          <div className="text-xs text-gray-500">ER Visits</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Most Commonly Reported Side Effects</h2>
        <p>The following symptoms are most frequently reported after varicella vaccination:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/varcel/symptoms/${slugify(s.name)}`}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-primary/60 w-6">#{i + 1}</span>
              <span className="font-medium text-gray-900">{s.name}</span>
            </div>
            <span className="text-sm text-gray-500 font-mono">{formatNumber(s.count)}</span>
          </Link>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Varivax vs ProQuad (MMRV)</h2>
        <p>
          Varicella protection is available as standalone Varivax or combined with MMR as ProQuad (MMRV). 
          ProQuad has a slightly higher rate of febrile seizures in children 12-23 months compared to 
          giving MMR and varicella separately, which is why the CDC allows either approach for the first dose.
        </p>

        <h2 className={playfairDisplay.className}>Expected Side Effects</h2>
        <p><strong>Common (occurring in &gt;10% of recipients):</strong></p>
        <ul>
          <li>Pain, redness, or swelling at injection site</li>
          <li>Fever (usually mild, within 42 days)</li>
          <li>Mild varicella-like rash (about 4% of children) — usually just a few spots</li>
        </ul>
        <p><strong>Less common:</strong></p>
        <ul>
          <li>Irritability</li>
          <li>Upper respiratory symptoms</li>
          <li>Headache and fatigue</li>
        </ul>
        <p><strong>Rare:</strong></p>
        <ul>
          <li>Febrile seizures (slightly higher with MMRV vs separate vaccines)</li>
          <li>Herpes zoster (shingles) from vaccine-strain virus — much rarer than from natural chickenpox</li>
          <li>Pneumonia, encephalitis (extremely rare)</li>
          <li>Severe allergic reaction</li>
        </ul>

        <h2 className={playfairDisplay.className}>Important Context</h2>
        <p>
          Before the varicella vaccine, chickenpox caused about 100 deaths and 10,000+ hospitalizations 
          per year in the U.S. Since routine vaccination began in 1995, chickenpox cases have declined 
          by over 90%. The vaccine&apos;s benefits in preventing natural chickenpox complications far exceed 
          the risks of reported adverse events.
        </p>
        <p>
          Many VAERS reports for varicella involve co-administered vaccines (given at the same visit),
          making it difficult to attribute symptoms to any single vaccine.
        </p>
        <p>
          The chickenpox vaccine is given in two childhood doses. See exactly when each is due on the{' '}
          <Link href="/vaccine-schedule">CDC vaccine schedule</Link>, review our{' '}
          <Link href="/analysis/vaccine-schedule-2026">2026 vaccine schedule analysis</Link>, and explore{' '}
          <Link href="/analysis/pediatric">pediatric VAERS patterns</Link>.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-12">
        <strong>⚠️ Remember:</strong> VAERS reports show correlation, not causation. A report filed 
        after vaccination doesn&apos;t mean the vaccine caused the reported event. Always consult 
        your healthcare provider for medical advice.
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore This Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/vaccines/varcel" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Varicella Vaccine Detail →</div>
            <div className="text-sm text-gray-500">Full VAERS profile</div>
          </Link>
          <Link href="/vaccines/mmrv" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">MMRV (ProQuad) →</div>
            <div className="text-sm text-gray-500">Combined vaccine data</div>
          </Link>
          <Link href="/side-effects" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">All Side Effects →</div>
            <div className="text-sm text-gray-500">Overview across all vaccines</div>
          </Link>
        </div>
      </div>

      
      {/* 2026 Safety Landscape */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Safety Monitoring Update</h2>
        <p>
          As of mid-2026, the varicella (chickenpox) vaccine continues to be monitored through VAERS and complementary
          surveillance systems including the Vaccine Safety Datalink (VSD) and the Clinical Immunization Safety
          Assessment (CISA) project. No new safety signals have been identified in recent data that would change
          the established safety profile of this vaccine.
        </p>
        <p>
          The HHS administration&apos;s announced development of AI-powered VAERS analysis tools may provide
          additional insights into varicella (chickenpox) vaccine adverse event patterns. These tools aim to detect
          subtle signals that traditional statistical methods might miss, though their implementation timeline
          and methodology remain under development.
        </p>
        <p>
          It&apos;s worth noting that VAERS reporting for routine vaccines like varicella (chickenpox) has remained
          stable through the post-pandemic period. While COVID-19 vaccine reports surged and then declined,
          reporting patterns for established childhood and adult vaccines have been remarkably consistent,
          suggesting that the VAERS system continues to function as designed for ongoing safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Understanding VAERS Data for varicella (chickenpox)</h2>
        <p>
          When interpreting VAERS data for varicella (chickenpox) vaccines, several key principles apply:
        </p>
        <ul>
          <li><strong>Reports ≠ Causation:</strong> A VAERS report means an event occurred after vaccination.
          It does not establish that the vaccine caused the event. Many reported symptoms are common health
          occurrences that would happen regardless of vaccination.</li>
          <li><strong>No denominator:</strong> VAERS does not track the number of doses administered. Without
          knowing how many people received the vaccine, raw report counts cannot be used to calculate risk rates
          or compare safety across vaccines.</li>
          <li><strong>Co-administration:</strong> Many vaccines are given at the same visit. When a VAERS report
          lists multiple vaccines, it&apos;s impossible to determine which vaccine (if any) was responsible for
          the reported adverse event.</li>
          <li><strong>Reporting variability:</strong> Healthcare provider awareness, media attention, and public
          concern all influence how many reports are filed. Changes in report volume may reflect changes in
          reporting behavior rather than changes in actual safety.</li>
        </ul>

        <h2 className={playfairDisplay.className}>How to Use This Data Responsibly</h2>
        <p>
          VAERS data is most useful as a starting point for conversation with your healthcare provider, not as
          a basis for medical decisions. If you&apos;re concerned about varicella (chickenpox) vaccine side effects:
        </p>
        <ul>
          <li>Discuss your specific risk factors with your doctor or pharmacist</li>
          <li>Ask about the relative risks of the disease the vaccine prevents vs. the vaccine itself</li>
          <li>Consider your age, health status, and any previous vaccine reactions</li>
          <li>Remember that clinical trials and post-market studies provide much stronger safety evidence than VAERS alone</li>
        </ul>
        <p>
          For the most up-to-date safety information, consult the{' '}
          <a href="https://www.cdc.gov/vaccines/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            CDC&apos;s vaccine information pages
          </a>{' '}
          or speak with a qualified healthcare professional.
        </p>
      </div>

      {/* Additional Related Links */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/onset-timing" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">When Do Side Effects Start?</div>
            <div className="text-sm text-gray-500">73% occur within 3 days of vaccination</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious vs Non-Serious Outcomes</div>
            <div className="text-sm text-gray-500">The full severity spectrum in VAERS</div>
          </Link>
          <Link href="/report-adverse-event" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Report an Adverse Event</div>
            <div className="text-sm text-gray-500">How to file a VAERS report</div>
          </Link>
          <Link href="/methodology" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Our Methodology</div>
            <div className="text-sm text-gray-500">How we process VAERS data</div>
          </Link>
        </div>
      </div>


      {/* 2026 Safety Landscape */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Safety Monitoring Update</h2>
        <p>
          As of mid-2026, the varicella (chickenpox) vaccine continues to be monitored through VAERS and complementary
          surveillance systems including the Vaccine Safety Datalink (VSD) and the Clinical Immunization Safety
          Assessment (CISA) project. No new safety signals have been identified in recent data that would change
          the established safety profile of this vaccine.
        </p>
        <p>
          The HHS administration&apos;s announced development of AI-powered VAERS analysis tools may provide
          additional insights into varicella (chickenpox) vaccine adverse event patterns. These tools aim to detect
          subtle signals that traditional statistical methods might miss, though their implementation timeline
          and methodology remain under development.
        </p>
        <p>
          It&apos;s worth noting that VAERS reporting for routine vaccines like varicella (chickenpox) has remained
          stable through the post-pandemic period. While COVID-19 vaccine reports surged and then declined,
          reporting patterns for established childhood and adult vaccines have been remarkably consistent,
          suggesting that the VAERS system continues to function as designed for ongoing safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Understanding VAERS Data for varicella (chickenpox)</h2>
        <p>
          When interpreting VAERS data for varicella (chickenpox) vaccines, several key principles apply:
        </p>
        <ul>
          <li><strong>Reports ≠ Causation:</strong> A VAERS report means an event occurred after vaccination.
          It does not establish that the vaccine caused the event. Many reported symptoms are common health
          occurrences that would happen regardless of vaccination.</li>
          <li><strong>No denominator:</strong> VAERS does not track the number of doses administered. Without
          knowing how many people received the vaccine, raw report counts cannot be used to calculate risk rates
          or compare safety across vaccines.</li>
          <li><strong>Co-administration:</strong> Many vaccines are given at the same visit. When a VAERS report
          lists multiple vaccines, it&apos;s impossible to determine which vaccine (if any) was responsible for
          the reported adverse event.</li>
          <li><strong>Reporting variability:</strong> Healthcare provider awareness, media attention, and public
          concern all influence how many reports are filed. Changes in report volume may reflect changes in
          reporting behavior rather than changes in actual safety.</li>
        </ul>

        <h2 className={playfairDisplay.className}>How to Use This Data Responsibly</h2>
        <p>
          VAERS data is most useful as a starting point for conversation with your healthcare provider, not as
          a basis for medical decisions. If you&apos;re concerned about varicella (chickenpox) vaccine side effects:
        </p>
        <ul>
          <li>Discuss your specific risk factors with your doctor or pharmacist</li>
          <li>Ask about the relative risks of the disease the vaccine prevents vs. the vaccine itself</li>
          <li>Consider your age, health status, and any previous vaccine reactions</li>
          <li>Remember that clinical trials and post-market studies provide much stronger safety evidence than VAERS alone</li>
        </ul>
        <p>
          For the most up-to-date safety information, consult the{' '}
          <a href="https://www.cdc.gov/vaccines/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            CDC&apos;s vaccine information pages
          </a>{' '}
          or speak with a qualified healthcare professional.
        </p>
      </div>

      {/* Additional Related Links */}
      <div className="bg-gray-50 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/onset-timing" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">When Do Side Effects Start?</div>
            <div className="text-sm text-gray-500">73% occur within 3 days of vaccination</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious vs Non-Serious Outcomes</div>
            <div className="text-sm text-gray-500">The full severity spectrum in VAERS</div>
          </Link>
          <Link href="/report-adverse-event" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Report an Adverse Event</div>
            <div className="text-sm text-gray-500">How to file a VAERS report</div>
          </Link>
          <Link href="/methodology" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Our Methodology</div>
            <div className="text-sm text-gray-500">How we process VAERS data</div>
          </Link>
        </div>
      </div>

<div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Side Effect Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/side-effects/mmr" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">MMR Side Effects</div>
            <div className="text-sm text-gray-500">Measles, mumps, rubella</div>
          </Link>
          <Link href="/side-effects/covid" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID-19 Side Effects</div>
            <div className="text-sm text-gray-500">1.1M+ reports analyzed</div>
          </Link>
          <Link href="/dashboard" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Full Dashboard</div>
            <div className="text-sm text-gray-500">All 104 vaccines compared</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
