import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Pneumonia Vaccine Side Effects — Pneumovax & Prevnar VAERS Data | VaccineWatch',
  description: 'VAERS analysis of pneumonia vaccine side effects (Pneumovax, Prevnar 13, Prevnar 20). 100,000+ reports analyzed with context for elderly recipients.',
}

export default function PneumoniaSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const types = ['PPV', 'PNC', 'PNC13', 'PNC20', 'PNC15', 'PNC10', 'PNC21']
  const vaccines = vaccineIndex.filter((v: any) => types.includes(v.type))

  let totalReports = 0, totalDeaths = 0, totalHosp = 0, totalER = 0
  vaccines.forEach((v: any) => {
    totalReports += v.reports; totalDeaths += v.died; totalHosp += v.hosp; totalER += v.er || 0
  })

  const mainVax = vaccineIndex.find((v: any) => v.type === 'PPV')
  const topSymptoms = mainVax?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'Pneumonia Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">6 min read</div>
          <ShareButtons title="Pneumonia Vaccine Side Effects — VaccineWatch" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Pneumonia Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Pneumococcal vaccines protect against pneumonia, meningitis, and bloodstream infections. 
          Given primarily to young children and adults 65+, these vaccines have extensive VAERS data 
          spanning multiple formulations.
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
          <div className="text-2xl font-bold text-gray-900">{vaccines.length}</div>
          <div className="text-xs text-gray-500">Vaccine Types</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Most Commonly Reported Side Effects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link key={s.name} href={`/vaccines/ppv/symptoms/${slugify(s.name)}`}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-primary/60 w-6">#{i + 1}</span>
              <span className="font-medium text-gray-900">{s.name}</span>
            </div>
            <span className="text-sm text-gray-500 font-mono">{formatNumber(s.count)}</span>
          </Link>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Types of Pneumonia Vaccines</h2>
        <ul>
          <li><strong>Pneumovax 23 (PPV/PPSV23):</strong> Polysaccharide vaccine covering 23 serotypes — for adults 65+ and high-risk groups</li>
          <li><strong>Prevnar 13 (PCV13):</strong> Conjugate vaccine covering 13 serotypes — for children and some adults</li>
          <li><strong>Prevnar 20 (PCV20):</strong> Newer conjugate vaccine covering 20 serotypes — replacing PCV13+PPSV23 combo</li>
          <li><strong>Prevnar 21 (PCV21):</strong> Latest formulation with 21 serotypes</li>
        </ul>

        <h2 className={playfairDisplay.className}>Expected Side Effects</h2>
        <p><strong>Common:</strong></p>
        <ul>
          <li>Injection site pain, redness, and swelling (very common)</li>
          <li>Fatigue and muscle aches</li>
          <li>Headache</li>
          <li>Low-grade fever</li>
          <li>Joint pain (more common with Pneumovax 23)</li>
        </ul>
        <p>
          Side effects are generally mild and resolve within 1-3 days. The conjugate vaccines 
          (Prevnar series) tend to cause slightly more injection site reactions than Pneumovax.
        </p>

        <h2 className={playfairDisplay.className}>Context for Death Reports</h2>
        <p>
          Pneumonia vaccines are primarily given to elderly adults (65+) and people with 
          chronic health conditions. This population has a naturally higher mortality rate, 
          so many death reports in VAERS reflect the background death rate of the recipient 
          population rather than vaccine-related events.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-12">
        <strong>⚠️ Remember:</strong> VAERS reports show correlation, not causation. Death reports 
        in elderly vaccine recipients largely reflect background mortality rates.
      </div>

      {/* Vaccine breakdown */}
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
            {vaccines.sort((a: any, b: any) => b.reports - a.reports).map((v: any, i: number) => (
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

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore This Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/vaccines/ppv" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Pneumovax Detail →</div>
            <div className="text-sm text-gray-500">Full VAERS profile</div>
          </Link>
          <Link href="/analysis/elderly" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Elderly Analysis →</div>
            <div className="text-sm text-gray-500">Age 65+ patterns</div>
          </Link>
          <Link href="/side-effects" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">All Side Effects →</div>
            <div className="text-sm text-gray-500">Complete guide</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
