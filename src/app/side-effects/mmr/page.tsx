import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'MMR Vaccine Side Effects — Measles, Mumps & Rubella VAERS Data | VaccineWatch',
  description: 'Analysis of MMR (measles, mumps, rubella) vaccine side effects from VAERS. Data on reported adverse events, fever rates, and rare complications like febrile seizures.',
}

export default function MMRSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const mmr = vaccineIndex.find((v: any) => v.type === 'MMR')
  const mmrv = vaccineIndex.find((v: any) => v.type === 'MMRV')

  const totalReports = (mmr?.reports || 0) + (mmrv?.reports || 0)
  const totalDeaths = (mmr?.died || 0) + (mmrv?.died || 0)
  const totalHosp = (mmr?.hosp || 0) + (mmrv?.hosp || 0)

  const topSymptoms = mmr?.symptoms?.slice(0, 12) || []
  const ageGroups = mmr?.ageGroups || {}

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'MMR Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">5 min read</div>
          <ShareButtons title="MMR Vaccine Side Effects — VaccineWatch" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          MMR Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The MMR vaccine protects against measles, mumps, and rubella. It&apos;s one of the most 
          studied vaccines in history. Here&apos;s what VAERS data shows about reported adverse events.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm text-primary">Total Reports</div>
          <div className="text-xs text-gray-400">MMR + MMRV combined</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(mmr?.reports || 0)}</div>
          <div className="text-sm text-primary">MMR Reports</div>
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
          The most frequently reported MMR side effects in VAERS are consistent with known reactions 
          to the live attenuated vaccine:
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/mmr/symptoms/${slugify(s.name)}`}
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
        <p><strong>Common (affecting up to 1 in 6 children):</strong></p>
        <ul>
          <li>Fever (up to 1 in 6 children)</li>
          <li>Mild rash (about 1 in 20)</li>
          <li>Swelling of glands in cheeks or neck</li>
          <li>Soreness and redness at injection site</li>
        </ul>
        <p><strong>Less common:</strong></p>
        <ul>
          <li>Seizure caused by fever (febrile seizure) — about 1 in 3,000 doses</li>
          <li>Temporary joint pain/stiffness (mainly in teens and adults)</li>
          <li>Temporary low platelet count (thrombocytopenia) — about 1 in 25,000</li>
        </ul>

        <h2 className={playfairDisplay.className}>MMR and Autism: The Data</h2>
        <p>
          The claim that MMR vaccine causes autism originated from a 1998 study that was later 
          retracted and its author lost his medical license. Since then, numerous large-scale studies 
          involving millions of children have found <strong>no link</strong> between MMR and autism.
        </p>
        <p>
          VAERS data cannot be used to prove or disprove a causal relationship because reports 
          represent temporal associations, not proven causation.
        </p>

        <h2 className={playfairDisplay.className}>Age Distribution</h2>
        <p>
          MMR is typically given at 12-15 months (first dose) and 4-6 years (second dose), 
          which is reflected in the VAERS age distribution:
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-12">
        {Object.entries(ageGroups).map(([group, count]) => (
          <div key={group} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="text-sm text-gray-500 mb-1">{group}</div>
            <div className="text-xl font-bold text-gray-900">{formatNumber(count as number)}</div>
          </div>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>MMR vs MMRV</h2>
        <p>
          MMRV (ProQuad) combines MMR with varicella (chickenpox) vaccine. MMRV has a slightly 
          higher risk of febrile seizures compared to giving MMR and varicella separately, which 
          is why some providers prefer separate injections for the first dose.
        </p>
      </div>

      {/* Related */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore MMR Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/vaccines/mmr" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">MMR Full VAERS Profile →</div>
            <div className="text-sm text-gray-500">Charts, symptoms, yearly data</div>
          </Link>
          <Link href="/analysis/pediatric" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Pediatric Vaccine Analysis →</div>
            <div className="text-sm text-gray-500">Children&apos;s vaccine safety data</div>
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
          <Link href="/side-effects/flu" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Flu Vaccine Side Effects</div>
            <div className="text-sm text-gray-500">Influenza vaccine data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
