import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Flu Vaccine Side Effects — VAERS Data Analysis',
  description: 'Complete analysis of flu (influenza) vaccine side effects reported to VAERS. Multiple flu vaccine types analyzed with full context and disclaimers.',
  openGraph: {
    title: 'Flu Vaccine Side Effects — VAERS Data Analysis',
    description: 'Flu vaccine adverse event reports analyzed from VAERS data.',
  },
}

export default function FluSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')

  // All flu vaccine types
  const fluTypes = ['FLU3', 'FLU4', 'FLUN3', 'FLUN4', 'FLUX', 'FLUA3', 'FLUA4', 'FLUC3', 'FLUC4', 'FLUR3', 'FLUR4']
  const fluVaccines = vaccineIndex.filter((v: any) => fluTypes.includes(v.type))

  let totalReports = 0, totalDeaths = 0, totalHosp = 0, totalER = 0
  fluVaccines.forEach((v: any) => {
    totalReports += v.reports
    totalDeaths += v.died
    totalHosp += v.hosp
    totalER += v.er
  })

  // Main flu vaccine for symptoms
  const flu3 = vaccineIndex.find((v: any) => v.type === 'FLU3')
  const flu4 = vaccineIndex.find((v: any) => v.type === 'FLU4')
  const mainFlu = flu3 || flu4

  const topSymptoms = mainFlu?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'Flu Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">6 min read</div>
          <ShareButtons title="Flu Vaccine Side Effects — VAERS Analysis" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Flu Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Influenza vaccines are among the most widely administered vaccines in the U.S., with 
          hundreds of millions of doses given annually. Here&apos;s what VAERS data shows about 
          reported side effects.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm text-primary">Total Reports</div>
          <div className="text-xs text-gray-400">All flu types</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{fluVaccines.length}</div>
          <div className="text-sm text-primary">Flu Vaccine Types</div>
          <div className="text-xs text-gray-400">In VAERS database</div>
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
        <h2 className={playfairDisplay.className}>Most Common Flu Vaccine Side Effects</h2>
        <p>
          The most frequently reported side effects from flu vaccines are consistent with known, 
          expected reactions:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/flu3/symptoms/${slugify(s.name)}`}
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
        <h2 className={playfairDisplay.className}>Types of Flu Vaccines in VAERS</h2>
        <p>
          VAERS tracks several different flu vaccine formulations. The main types include:
        </p>
        <ul>
          <li><strong>FLU3 (Trivalent):</strong> Protects against 3 flu strains — the traditional formulation</li>
          <li><strong>FLU4 (Quadrivalent):</strong> Protects against 4 strains — now the standard</li>
          <li><strong>FLUN (Nasal spray):</strong> Live attenuated vaccine given nasally</li>
          <li><strong>FLUA (Adjuvanted):</strong> Enhanced formulation for elderly patients</li>
          <li><strong>FLUC (Cell-based):</strong> Grown in cell culture instead of eggs</li>
          <li><strong>FLUR (Recombinant):</strong> Made without flu virus or eggs</li>
        </ul>
      </div>

      {/* Flu vaccine breakdown */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Type</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Reports</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Deaths</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Hosp.</th>
            </tr>
          </thead>
          <tbody>
            {fluVaccines.sort((a: any, b: any) => b.reports - a.reports).map((v: any, i: number) => (
              <tr key={v.type} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-3">
                  <Link href={`/vaccines/${v.type.toLowerCase()}`} className="text-primary hover:underline font-medium">{v.type}</Link>
                </td>
                <td className="text-right px-4 py-3 font-mono">{formatNumber(v.reports)}</td>
                <td className="text-right px-4 py-3 font-mono text-red-600">{formatNumber(v.died)}</td>
                <td className="text-right px-4 py-3 font-mono text-amber-600">{formatNumber(v.hosp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Expected vs Concerning Side Effects</h2>
        <p><strong>Common and expected</strong> (usually resolve in 1-2 days):</p>
        <ul>
          <li>Soreness, redness, or swelling at injection site</li>
          <li>Low-grade fever</li>
          <li>Headache and muscle aches</li>
          <li>Fatigue</li>
          <li>Nausea</li>
        </ul>
        <p><strong>Rare but serious</strong> (seek medical attention):</p>
        <ul>
          <li>Guillain-Barré Syndrome (GBS) — estimated 1-2 additional cases per million vaccinated</li>
          <li>Severe allergic reaction (anaphylaxis) — extremely rare</li>
          <li>High fever lasting more than 48 hours</li>
        </ul>

        <h2 className={playfairDisplay.className}>Flu vs COVID Vaccine Reports</h2>
        <p>
          Comparing flu and COVID vaccine VAERS reports is a common but misleading exercise. 
          COVID vaccines had dramatically higher reporting rates due to mandatory reporting 
          requirements, heightened public awareness, and the emergency use context. Our{' '}
          <Link href="/analysis/covid-vs-flu">COVID vs Flu comparison</Link> explores this in detail.
        </p>
      </div>

      {/* Related */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore Flu Vaccine Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/vaccines/flu3" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Trivalent Flu (FLU3) →</div>
            <div className="text-sm text-gray-500">Full VAERS profile</div>
          </Link>
          <Link href="/vaccines/flu4" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Quadrivalent Flu (FLU4) →</div>
            <div className="text-sm text-gray-500">Full VAERS profile</div>
          </Link>
          <Link href="/analysis/covid-vs-flu" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">COVID vs Flu Comparison →</div>
            <div className="text-sm text-gray-500">Side-by-side analysis</div>
          </Link>
          <Link href="/side-effects/covid" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">COVID Vaccine Side Effects →</div>
            <div className="text-sm text-gray-500">Compare to flu data</div>
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
          <Link href="/side-effects/pneumonia" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Pneumonia Vaccine</div>
            <div className="text-sm text-gray-500">Often given with flu vaccine</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
