import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Polio Vaccine Side Effects — IPV & OPV VAERS Data',
  description: 'VAERS analysis of polio vaccine side effects. Both inactivated (IPV/IPOL) and oral (OPV) polio vaccines analyzed with historical context.',
}

export default function PolioSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const types = ['IPV', 'OPV']
  const vaccines = vaccineIndex.filter((v: any) => types.includes(v.type))

  let totalReports = 0, totalDeaths = 0, totalHosp = 0
  vaccines.forEach((v: any) => {
    totalReports += v.reports; totalDeaths += v.died; totalHosp += v.hosp
  })

  const ipv = vaccineIndex.find((v: any) => v.type === 'IPV')
  const topSymptoms = ipv?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'Polio Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">5 min read</div>
          <ShareButtons title="Polio Vaccine Side Effects" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Polio Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The polio vaccine is one of the greatest public health achievements in history, 
          virtually eliminating polio in the developed world. VAERS tracks adverse events 
          for both the current inactivated vaccine (IPV) and the historical oral vaccine (OPV).
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
          <div className="text-2xl font-bold text-gray-900">2</div>
          <div className="text-xs text-gray-500">Vaccine Types</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Most Reported Side Effects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link key={s.name} href={`/vaccines/ipv/symptoms/${slugify(s.name)}`}
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
        <h2 className={playfairDisplay.className}>IPV vs OPV</h2>
        <ul>
          <li><strong>IPV (Inactivated Polio Vaccine / IPOL):</strong> Current standard in the U.S. — given by injection, contains killed virus. Cannot cause polio.</li>
          <li><strong>OPV (Oral Polio Vaccine):</strong> Historical — given by mouth, contains weakened live virus. No longer used in the U.S. since 2000 due to extremely rare cases of vaccine-derived polio.</li>
        </ul>
        <p>
          Important context: most IPV VAERS reports are from combination vaccines (like DTaP-IPV) 
          where the polio component is given alongside other antigens. Side effects may be from 
          the combination rather than the polio component specifically.
        </p>

        <h2 className={playfairDisplay.className}>Expected Side Effects (IPV)</h2>
        <p><strong>Common:</strong></p>
        <ul>
          <li>Soreness and redness at injection site</li>
          <li>Low-grade fever</li>
          <li>Fussiness (in infants)</li>
        </ul>
        <p>
          IPV is considered one of the safest vaccines. Serious adverse events directly 
          attributable to IPV are extremely rare.
        </p>

        <h2 className={playfairDisplay.className}>Historical Context: VAPP</h2>
        <p>
          The oral polio vaccine (OPV) carried a very small risk of vaccine-associated paralytic 
          polio (VAPP) — about 1 case per 2.4 million doses. This is why the U.S. switched 
          exclusively to IPV in 2000. OPV is still used in some countries for its ability to 
          provide intestinal immunity and stop wild poliovirus transmission.
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore This Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/vaccines/ipv" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">IPV Detail →</div>
            <div className="text-sm text-gray-500">Full VAERS profile</div>
          </Link>
          <Link href="/analysis/pediatric" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Pediatric Analysis →</div>
            <div className="text-sm text-gray-500">Childhood vaccine data</div>
          </Link>
          <Link href="/side-effects" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">All Side Effects →</div>
            <div className="text-sm text-gray-500">Complete guide</div>
          </Link>
        </div>
      </div>
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Side Effect Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/side-effects/dtap" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">DTaP Side Effects</div>
            <div className="text-sm text-gray-500">Given at same visits as IPV</div>
          </Link>
          <Link href="/side-effects/rotavirus" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Rotavirus Side Effects</div>
            <div className="text-sm text-gray-500">Another infant vaccine</div>
          </Link>
          <Link href="/side-effects/mmr" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">MMR Side Effects</div>
            <div className="text-sm text-gray-500">Measles, mumps, rubella</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
