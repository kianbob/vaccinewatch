import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'MMR Vaccine Side Effects 2026 — Measles, Mumps & Rubella Data',
  description: 'Complete VAERS analysis of MMR vaccine side effects and adverse events. 89,000+ reports covering measles, mumps, and rubella, plus the debunked autism claim.',
  openGraph: {
    title: 'MMR Vaccine Side Effects — VAERS Data Analysis',
    description: '89,000+ MMR vaccine adverse event reports analyzed from VAERS data, with full context on measles, mumps, and rubella vaccination.',
  },
}

export default function MmrSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const types = ["MMR","MMRV"]
  const vaccines = vaccineIndex.filter((v: any) => types.includes(v.type))

  let totalReports = 0, totalDeaths = 0, totalHosp = 0, totalER = 0
  vaccines.forEach((v: any) => {
    totalReports += v.reports; totalDeaths += v.died; totalHosp += v.hosp; totalER += v.er || 0
  })

  const mainVax = vaccineIndex.find((v: any) => v.type === 'MMR')
  const topSymptoms = mainVax?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Does the MMR vaccine cause autism?', acceptedAnswer: { '@type': 'Answer', text: 'No. The original 1998 study claiming a link was retracted by The Lancet and its author lost his medical license for fraud. Multiple large-scale studies involving millions of children have found no connection between the MMR vaccine and autism. The timing coincidence (MMR given around 12-15 months, when autism symptoms often first appear) does not indicate causation.' }},
          { '@type': 'Question', name: 'What are the most common MMR vaccine side effects?', acceptedAnswer: { '@type': 'Answer', text: 'The most commonly reported side effects in VAERS include fever, rash, injection site reactions, irritability, and upper respiratory symptoms. These are typical immune responses that usually resolve within a few days. Serious adverse events are rare.' }},
          { '@type': 'Question', name: 'How common are serious MMR vaccine reactions?', acceptedAnswer: { '@type': 'Answer', text: 'Serious adverse events after MMR vaccination are very rare. Febrile seizures occur in about 1 in 3,000 doses and are typically self-limiting. Severe allergic reactions (anaphylaxis) occur in fewer than 1 per million doses. The benefits of preventing measles, mumps, and rubella far outweigh these small risks.' }},
        ],
      }) }} />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'MMR Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">7 min read</div>
          <ShareButtons title="MMR Vaccine Side Effects — Measles, Mumps & Rubella" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          MMR Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The MMR (measles, mumps, rubella) vaccine is one of the most widely studied vaccines in history. Given to virtually every child in the U.S., it generates a substantial number of VAERS reports — but context is essential for interpreting this data.
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
        <p>The following symptoms are most frequently reported after vaccination:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/mmr/symptoms/${slugify(s.name)}`}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-primary/60 w-6">#{'{'}i + 1{'}'}</span>
              <span className="font-medium text-gray-900">{s.name}</span>
            </div>
            <span className="text-sm text-gray-500 font-mono">{formatNumber(s.count)}</span>
          </Link>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        
        <h2 className={playfairDisplay.className}>MMR and Autism: The Data</h2>
        <p>
          The claimed link between MMR and autism has been extensively studied and debunked. 
          The original 1998 study was retracted and its author lost his medical license for 
          fraud. Multiple large-scale studies involving millions of children have found no 
          connection between MMR vaccination and autism.
        </p>
        <p>
          VAERS does contain reports mentioning autism after MMR vaccination, but VAERS 
          reports are unverified and cannot establish causation. The timing of MMR vaccination 
          (12-15 months) coincides with when autism symptoms typically become noticeable, 
          creating a temporal correlation that is not causal.
        </p>

        <h2 className={playfairDisplay.className}>Expected Side Effects</h2>
        <p><strong>Common (usually mild, resolve in days):</strong></p>
        <ul>
          <li>Fever (up to 1 in 6 children)</li>
          <li>Mild rash</li>
          <li>Swelling of glands in cheeks or neck</li>
          <li>Soreness and redness at injection site</li>
          <li>Joint pain/stiffness (more common in adult women)</li>
        </ul>
        <p><strong>Rare but serious:</strong></p>
        <ul>
          <li>Febrile seizures (about 1 in 3,000)</li>
          <li>Temporary low platelet count (about 1 in 25,000)</li>
          <li>Allergic reaction (very rare)</li>
        </ul>
        <p>
          MMR is given in two doses in early childhood. See exactly when each is due on the{' '}
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
          {[{"href":"/vaccines/mmr","title":"MMR Vaccine Detail Page","desc":"Full VAERS profile with charts"},{"href":"/analysis/pediatric","title":"Pediatric Analysis","desc":"Childhood vaccine patterns"},{"href":"/side-effects/covid","title":"COVID Vaccine Side Effects","desc":"Compare to COVID data"}].map((p: any) => (
            <Link key={p.href} href={p.href} className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
              <div className="font-medium text-gray-900">{p.title} →</div>
              <div className="text-sm text-gray-500">{p.desc}</div>
            </Link>
          ))}
        </div>
      </div>

      
      {/* 2026 Safety Landscape */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>2026 Safety Monitoring Update</h2>
        <p>
          As of mid-2026, the MMR vaccine continues to be monitored through VAERS and complementary
          surveillance systems including the Vaccine Safety Datalink (VSD) and the Clinical Immunization Safety
          Assessment (CISA) project. No new safety signals have been identified in recent data that would change
          the established safety profile of this vaccine.
        </p>
        <p>
          The HHS administration&apos;s announced development of AI-powered VAERS analysis tools may provide
          additional insights into MMR vaccine adverse event patterns. These tools aim to detect
          subtle signals that traditional statistical methods might miss, though their implementation timeline
          and methodology remain under development.
        </p>
        <p>
          It&apos;s worth noting that VAERS reporting for routine vaccines like MMR has remained
          stable through the post-pandemic period. While COVID-19 vaccine reports surged and then declined,
          reporting patterns for established childhood and adult vaccines have been remarkably consistent,
          suggesting that the VAERS system continues to function as designed for ongoing safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Understanding VAERS Data for MMR</h2>
        <p>
          When interpreting VAERS data for MMR vaccines, several key principles apply:
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
          a basis for medical decisions. If you&apos;re concerned about MMR vaccine side effects:
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
          As of mid-2026, the MMR vaccine continues to be monitored through VAERS and complementary
          surveillance systems including the Vaccine Safety Datalink (VSD) and the Clinical Immunization Safety
          Assessment (CISA) project. No new safety signals have been identified in recent data that would change
          the established safety profile of this vaccine.
        </p>
        <p>
          The HHS administration&apos;s announced development of AI-powered VAERS analysis tools may provide
          additional insights into MMR vaccine adverse event patterns. These tools aim to detect
          subtle signals that traditional statistical methods might miss, though their implementation timeline
          and methodology remain under development.
        </p>
        <p>
          It&apos;s worth noting that VAERS reporting for routine vaccines like MMR has remained
          stable through the post-pandemic period. While COVID-19 vaccine reports surged and then declined,
          reporting patterns for established childhood and adult vaccines have been remarkably consistent,
          suggesting that the VAERS system continues to function as designed for ongoing safety surveillance.
        </p>

        <h2 className={playfairDisplay.className}>Understanding VAERS Data for MMR</h2>
        <p>
          When interpreting VAERS data for MMR vaccines, several key principles apply:
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
          a basis for medical decisions. If you&apos;re concerned about MMR vaccine side effects:
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
          <Link href="/side-effects" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">All Vaccine Side Effects</div>
            <div className="text-sm text-gray-500">Overview across all vaccines</div>
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
