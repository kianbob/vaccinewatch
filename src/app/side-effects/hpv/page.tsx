import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'HPV Vaccine Side Effects (Gardasil) — VAERS Data Analysis | VaccineWatch',
  description: 'Analysis of HPV vaccine (Gardasil 9) side effects from VAERS data. Reports on fainting, pain, and rare adverse events with proper context.',
}

export default function HPVSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const hpv9 = vaccineIndex.find((v: any) => v.type === 'HPV9')
  const hpv4 = vaccineIndex.find((v: any) => v.type === 'HPV4')
  const hpvx = vaccineIndex.find((v: any) => v.type === 'HPVX')

  const totalReports = (hpv9?.reports || 0) + (hpv4?.reports || 0) + (hpvx?.reports || 0)
  const totalDeaths = (hpv9?.died || 0) + (hpv4?.died || 0) + (hpvx?.died || 0)
  const totalHosp = (hpv9?.hosp || 0) + (hpv4?.hosp || 0) + (hpvx?.hosp || 0)

  // Use HPV4 for symptoms (more data) then HPV9
  const mainHPV = hpv4 || hpv9
  const topSymptoms = mainHPV?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'HPV Vaccine (Gardasil)' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">5 min read</div>
          <ShareButtons title="HPV Vaccine Side Effects (Gardasil) — VaccineWatch" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          HPV Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The HPV vaccine (Gardasil 9) prevents cancers caused by human papillomavirus. 
          Recommended for ages 11-26, it&apos;s one of the most discussed vaccines in VAERS. 
          Here&apos;s what the data shows.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm text-primary">Total Reports</div>
          <div className="text-xs text-gray-400">All HPV types</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">3</div>
          <div className="text-sm text-primary">HPV Vaccine Types</div>
          <div className="text-xs text-gray-400">HPV4, HPV9, HPVX</div>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{formatNumber(totalDeaths)}</div>
          <div className="text-xs text-red-500">Deaths Reported</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">{formatNumber(totalHosp)}</div>
          <div className="text-xs text-amber-500">Hospitalizations</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Most Commonly Reported Side Effects</h2>
        <p>
          HPV vaccine side effects in VAERS are dominated by injection-site reactions and 
          vasovagal syncope (fainting) — the latter being common in the adolescent age group 
          that receives this vaccine, regardless of what injection they get.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/hpv4/symptoms/${slugify(s.name)}`}
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
        <h2 className={playfairDisplay.className}>Fainting After HPV Vaccination</h2>
        <p>
          Syncope (fainting) is one of the most-reported events after HPV vaccination. This is 
          important context: fainting is common after <em>any</em> injection in adolescents, not 
          unique to the HPV vaccine. The CDC recommends a 15-minute observation period after 
          vaccination to prevent injuries from falls.
        </p>

        <h2 className={playfairDisplay.className}>Expected vs Rare Side Effects</h2>
        <p><strong>Very common (affecting &gt;1 in 10):</strong></p>
        <ul>
          <li>Pain, swelling, and redness at injection site</li>
          <li>Headache</li>
          <li>Fever</li>
          <li>Nausea</li>
          <li>Dizziness</li>
        </ul>
        <p><strong>Rare (&lt;1 in 10,000):</strong></p>
        <ul>
          <li>Anaphylaxis (severe allergic reaction)</li>
          <li>Guillain-Barré Syndrome (studies have not confirmed an increased risk)</li>
          <li>Blood clots (no confirmed causal link)</li>
        </ul>

        <h2 className={playfairDisplay.className}>HPV Vaccine Types</h2>
        <ul>
          <li><strong>HPV4 (Gardasil):</strong> Original quadrivalent vaccine (4 HPV types) — now discontinued</li>
          <li><strong>HPV9 (Gardasil 9):</strong> Current vaccine covering 9 HPV types — the standard today</li>
          <li><strong>HPV2 (Cervarix):</strong> Bivalent vaccine — no longer available in the U.S.</li>
        </ul>

        <h2 className={playfairDisplay.className}>Cancer Prevention Context</h2>
        <p>
          HPV vaccination prevents approximately 90% of HPV-related cancers, including cervical, 
          anal, and oropharyngeal cancers. The WHO considers it one of the most important cancer 
          prevention tools available. When evaluating side effect data, this prevention benefit 
          provides important context for risk-benefit assessment.
        </p>
      </div>

      {/* Related */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore HPV Vaccine Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/vaccines/hpv9" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Gardasil 9 (HPV9) Profile →</div>
            <div className="text-sm text-gray-500">Full VAERS data with charts</div>
          </Link>
          <Link href="/vaccines/hpv4" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Gardasil (HPV4) Profile →</div>
            <div className="text-sm text-gray-500">Original HPV vaccine data</div>
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
          <Link href="/side-effects/mmr" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">MMR Side Effects</div>
            <div className="text-sm text-gray-500">Measles, mumps, rubella data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
