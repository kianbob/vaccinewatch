import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Meningococcal Vaccine Side Effects — Menactra & Menveo VAERS Data | VaccineWatch',
  description: 'VAERS analysis of meningococcal vaccine side effects. 36,000+ reports covering Menactra, Menveo, and MenB vaccines.',
}

export default function MeningococcalSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const types = ["MNQ", "MEN"]
  const vaccines = vaccineIndex.filter((v: any) => types.includes(v.type))

  let totalReports = 0, totalDeaths = 0, totalHosp = 0, totalER = 0
  vaccines.forEach((v: any) => {
    totalReports += v.reports; totalDeaths += v.died; totalHosp += v.hosp; totalER += v.er || 0
  })

  const mainVax = vaccineIndex.find((v: any) => v.type === 'MNQ')
  const topSymptoms = mainVax?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'Meningococcal Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">5 min read</div>
          <ShareButtons title="Meningococcal Vaccine Side Effects — VAERS Data" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Meningococcal Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Meningococcal vaccines protect against bacterial meningitis — a rare but potentially fatal 
          infection. Routinely given to adolescents at ages 11-12 and 16, and required by many colleges 
          for dorm residents. VAERS contains over 36,000 reports across all meningococcal vaccine types.
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
        <p>The following symptoms are most frequently reported after meningococcal vaccination:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/mnq/symptoms/${slugify(s.name)}`}
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
        <h2 className={playfairDisplay.className}>Types of Meningococcal Vaccines</h2>
        <p>There are two main categories:</p>
        <ul>
          <li><strong>MenACWY (conjugate):</strong> Menactra, Menveo, MenQuadfi — protects against serogroups A, C, W, Y. This is the routine adolescent vaccine.</li>
          <li><strong>MenB (serogroup B):</strong> Bexsero, Trumenba — protects against serogroup B. Recommended for teens/young adults at increased risk or during outbreaks.</li>
        </ul>
        <p>
          MenB vaccines tend to have more local side effects (injection site pain) than MenACWY vaccines, 
          which is reflected in VAERS reporting patterns.
        </p>

        <h2 className={playfairDisplay.className}>Expected Side Effects</h2>
        <p><strong>Very common:</strong></p>
        <ul>
          <li>Injection site pain (up to 50%+ for MenB)</li>
          <li>Fatigue and malaise</li>
          <li>Headache</li>
          <li>Muscle pain</li>
        </ul>
        <p><strong>Common:</strong></p>
        <ul>
          <li>Fever</li>
          <li>Nausea</li>
          <li>Joint pain</li>
        </ul>
        <p><strong>Rare:</strong></p>
        <ul>
          <li>Guillain-Barré Syndrome (Menactra specifically monitored for this)</li>
          <li>Severe allergic reaction</li>
          <li>Syncope (fainting) — common in adolescents after any injection, not vaccine-specific</li>
        </ul>

        <h2 className={playfairDisplay.className}>Fainting in Adolescents</h2>
        <p>
          A notable portion of meningococcal vaccine VAERS reports involve syncope (fainting). This is 
          not specific to meningococcal vaccines — adolescents faint after any injection at much higher 
          rates than other age groups. The CDC recommends a 15-minute observation period after vaccinating 
          adolescents for this reason.
        </p>

        <h2 className={playfairDisplay.className}>Why It Matters</h2>
        <p>
          Meningococcal disease is rare (about 300-400 cases/year in the U.S.) but devastating — 
          10-15% of cases are fatal, and up to 20% of survivors have permanent complications like 
          limb amputation, hearing loss, or brain damage. The vaccine has dramatically reduced cases 
          in the age groups most at risk.
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
          <Link href="/vaccines/mnq" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Menactra Detail →</div>
            <div className="text-sm text-gray-500">Full VAERS profile</div>
          </Link>
          <Link href="/analysis/pediatric" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Pediatric Analysis →</div>
            <div className="text-sm text-gray-500">Youth vaccine data</div>
          </Link>
          <Link href="/side-effects" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">All Side Effects →</div>
            <div className="text-sm text-gray-500">Overview across all vaccines</div>
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Side Effect Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/side-effects/hpv" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">HPV Side Effects</div>
            <div className="text-sm text-gray-500">Another adolescent vaccine</div>
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
