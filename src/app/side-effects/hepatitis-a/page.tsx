import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Hepatitis A Vaccine Side Effects — Havrix & Vaqta VAERS Data | VaccineWatch',
  description: 'VAERS analysis of hepatitis A vaccine side effects. 48,000+ reports for Havrix and Vaqta including injection site reactions and rare outcomes.',
}

export default function HepASideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const types = ["HEPA"]
  const vaccines = vaccineIndex.filter((v: any) => types.includes(v.type))

  let totalReports = 0, totalDeaths = 0, totalHosp = 0, totalER = 0
  vaccines.forEach((v: any) => {
    totalReports += v.reports; totalDeaths += v.died; totalHosp += v.hosp; totalER += v.er || 0
  })

  const mainVax = vaccineIndex.find((v: any) => v.type === 'HEPA')
  const topSymptoms = mainVax?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'Hepatitis A Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">5 min read</div>
          <ShareButtons title="Hepatitis A Vaccine Side Effects — VAERS Data" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Hepatitis A Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Hepatitis A vaccines (Havrix, Vaqta) protect against the hepatitis A virus, which causes 
          liver inflammation. Recommended for all children at age 1 and for adults at risk, this 
          vaccine has an excellent safety profile with over 48,000 VAERS reports since the 1990s.
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
        <p>The following symptoms are most frequently reported after hepatitis A vaccination:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/hepa/symptoms/${slugify(s.name)}`}
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
        <h2 className={playfairDisplay.className}>Expected Side Effects</h2>
        <p><strong>Very common (occurring in &gt;10% of recipients):</strong></p>
        <ul>
          <li>Injection site pain, tenderness, or warmth</li>
          <li>Headache</li>
          <li>Fatigue and malaise</li>
        </ul>
        <p><strong>Common (1-10%):</strong></p>
        <ul>
          <li>Fever (usually low-grade)</li>
          <li>Decreased appetite</li>
          <li>Injection site redness or swelling</li>
          <li>Irritability (in children)</li>
        </ul>
        <p><strong>Rare:</strong></p>
        <ul>
          <li>Severe allergic reaction (anaphylaxis)</li>
          <li>Guillain-Barré Syndrome (very rare reports)</li>
        </ul>

        <h2 className={playfairDisplay.className}>Havrix vs Vaqta</h2>
        <p>
          Both Havrix (GSK) and Vaqta (Merck) are inactivated hepatitis A vaccines with similar 
          efficacy and safety profiles. There is also Twinrix, a combination hepatitis A + B vaccine. 
          All are given as a 2-dose series, with the second dose 6-18 months after the first.
        </p>

        <h2 className={playfairDisplay.className}>Safety Profile Context</h2>
        <p>
          Hepatitis A vaccines are among the better-tolerated vaccines. The relatively low number 
          of VAERS reports compared to the hundreds of millions of doses administered reflects a 
          favorable safety profile. Natural hepatitis A infection, by contrast, causes weeks of 
          illness and can be fatal in older adults and people with chronic liver disease.
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
          <Link href="/vaccines/hepa" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Hepatitis A Detail →</div>
            <div className="text-sm text-gray-500">Full VAERS profile</div>
          </Link>
          <Link href="/side-effects/hepatitis-b" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Hepatitis B Side Effects →</div>
            <div className="text-sm text-gray-500">Compare with Hep B</div>
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
          <Link href="/side-effects/hepatitis-b" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Hepatitis B Side Effects</div>
            <div className="text-sm text-gray-500">Engerix-B data</div>
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
