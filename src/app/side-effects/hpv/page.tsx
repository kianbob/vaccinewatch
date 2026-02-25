import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'HPV Vaccine Side Effects — Gardasil VAERS Analysis | VaccineWatch',
  description: 'Complete VAERS analysis of HPV vaccine (Gardasil) side effects. 44,000+ adverse event reports with full context and disclaimers.',
}

export default function HpvSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const types = ["HPV4","HPV9","HPV2","HPVX"]
  const vaccines = vaccineIndex.filter((v: any) => types.includes(v.type))

  let totalReports = 0, totalDeaths = 0, totalHosp = 0, totalER = 0
  vaccines.forEach((v: any) => {
    totalReports += v.reports; totalDeaths += v.died; totalHosp += v.hosp; totalER += v.er || 0
  })

  const mainVax = vaccineIndex.find((v: any) => v.type === 'HPV4')
  const topSymptoms = mainVax?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'HPV Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">7 min read</div>
          <ShareButtons title="HPV Vaccine Side Effects — Gardasil VAERS Analysis | VaccineWatch" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          HPV Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The HPV (human papillomavirus) vaccine prevents cancers caused by HPV, including cervical, throat, and anal cancers. HPV vaccines have been the subject of significant public debate, making transparent data access especially important.
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
            href={`/vaccines/hpv4/symptoms/${slugify(s.name)}`}
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
        
        <h2 className={playfairDisplay.className}>HPV Vaccine Versions</h2>
        <ul>
          <li><strong>Gardasil (HPV4):</strong> Original quadrivalent vaccine — 4 HPV types</li>
          <li><strong>Gardasil 9 (HPV9):</strong> Current version — 9 HPV types, broader protection</li>
          <li><strong>Cervarix (HPV2):</strong> Bivalent, no longer available in the U.S.</li>
        </ul>

        <h2 className={playfairDisplay.className}>Expected Side Effects</h2>
        <p><strong>Common:</strong></p>
        <ul>
          <li>Pain, redness, or swelling at injection site (very common)</li>
          <li>Fainting/syncope (more common in adolescents — 15-minute observation recommended)</li>
          <li>Headache</li>
          <li>Nausea</li>
          <li>Dizziness</li>
          <li>Fever</li>
        </ul>
        <p><strong>Rare but reported:</strong></p>
        <ul>
          <li>Allergic reactions</li>
          <li>Blood clots (extremely rare, not clearly linked to vaccine)</li>
          <li>Guillain-Barré Syndrome (studied extensively, no confirmed link)</li>
        </ul>

        <h2 className={playfairDisplay.className}>The Fainting Factor</h2>
        <p>
          HPV vaccination has higher reported rates of syncope (fainting) than most vaccines. 
          This is likely because the vaccine is given to adolescents, who are more prone to 
          vasovagal responses. The CDC recommends a 15-minute observation period after HPV vaccination. 
          Many VAERS reports for HPV are fainting-related rather than indicating serious adverse effects.
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
          {[{"href":"/vaccines/hpv4","title":"Gardasil (HPV4) Detail","desc":"Full VAERS profile"},{"href":"/vaccines/hpv9","title":"Gardasil 9 (HPV9) Detail","desc":"Current HPV vaccine data"},{"href":"/analysis/age-patterns","title":"Age Patterns Analysis","desc":"How age affects reporting"}].map((p: any) => (
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
