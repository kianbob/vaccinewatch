import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'MMR Vaccine Side Effects — Measles, Mumps & Rubella',
  description: 'Complete VAERS analysis of MMR vaccine side effects. 89,000+ adverse event reports covering measles, mumps, and rubella vaccination.',
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
