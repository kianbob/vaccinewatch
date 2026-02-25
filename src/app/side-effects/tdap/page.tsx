import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Tdap Vaccine Side Effects — Tetanus, Diphtheria, Pertussis VAERS Data | VaccineWatch',
  description: 'Analysis of Tdap vaccine side effects from VAERS. Common reactions include arm soreness and fatigue. Complete data with context for the tetanus-diphtheria-pertussis booster.',
}

export default function TdapSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const tdap = vaccineIndex.find((v: any) => v.type === 'TDAP')
  const td = vaccineIndex.find((v: any) => v.type === 'TD')

  const totalReports = (tdap?.reports || 0) + (td?.reports || 0)
  const totalDeaths = (tdap?.died || 0) + (td?.died || 0)
  const totalHosp = (tdap?.hosp || 0) + (td?.hosp || 0)
  const topSymptoms = tdap?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'Tdap Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">4 min read</div>
          <ShareButtons title="Tdap Vaccine Side Effects — VaccineWatch" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Tdap Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Tdap protects against tetanus, diphtheria, and pertussis (whooping cough). Given as a 
          booster to adolescents and adults, and recommended during every pregnancy. Here&apos;s 
          what VAERS data shows.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm text-primary">Total Reports</div>
          <div className="text-xs text-gray-400">Tdap + Td combined</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(tdap?.reports || 0)}</div>
          <div className="text-sm text-primary">Tdap Reports</div>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/tdap/symptoms/${slugify(s.name)}`}
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
        <p><strong>Very common:</strong></p>
        <ul>
          <li>Pain, redness, swelling at injection site (up to 75% of recipients)</li>
          <li>Body aches and fatigue</li>
          <li>Headache</li>
          <li>Low-grade fever</li>
        </ul>
        <p><strong>Less common:</strong></p>
        <ul>
          <li>Nausea, vomiting, diarrhea</li>
          <li>Swollen glands</li>
          <li>Joint pain</li>
        </ul>
        <p><strong>Rare:</strong></p>
        <ul>
          <li>Severe allergic reaction (anaphylaxis)</li>
          <li>Shoulder injury related to vaccine administration (SIRVA)</li>
          <li>Brachial neuritis (nerve inflammation)</li>
        </ul>

        <h2 className={playfairDisplay.className}>Tdap During Pregnancy</h2>
        <p>
          Tdap is recommended during weeks 27-36 of every pregnancy to protect newborns 
          from whooping cough. VAERS reports from pregnant individuals require extra caution 
          in interpretation, as pregnancy itself involves many health events.
        </p>

        <h2 className={playfairDisplay.className}>Tdap vs Td vs DTaP</h2>
        <ul>
          <li><strong>Tdap (Boostrix/Adacel):</strong> Teen/adult booster with pertussis</li>
          <li><strong>Td:</strong> Adult booster without pertussis</li>
          <li><strong>DTaP:</strong> Childhood series (5 doses, ages 2 months to 6 years)</li>
        </ul>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore Tdap Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/vaccines/tdap" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Tdap Full VAERS Profile →</div>
            <div className="text-sm text-gray-500">Charts, symptoms, yearly data</div>
          </Link>
          <Link href="/dashboard" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Full Dashboard →</div>
            <div className="text-sm text-gray-500">Compare all 104 vaccines</div>
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
          <Link href="/side-effects/shingles" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Shingles Vaccine Side Effects</div>
            <div className="text-sm text-gray-500">Shingrix side effect data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
