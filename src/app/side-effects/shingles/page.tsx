import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Shingles Vaccine Side Effects (Shingrix) — VAERS Data | VaccineWatch',
  description: 'Analysis of shingles vaccine (Shingrix/Zostavax) side effects from VAERS. Known for strong reactogenicity — here\'s the data on arm pain, fever, and more.',
}

export default function ShinglesSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const varzos = vaccineIndex.find((v: any) => v.type === 'VARZOS')

  const totalReports = varzos?.reports || 0
  const totalDeaths = varzos?.died || 0
  const totalHosp = varzos?.hosp || 0
  const topSymptoms = varzos?.symptoms?.slice(0, 12) || []
  const ageGroups = varzos?.ageGroups || {}

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'Shingles Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">5 min read</div>
          <ShareButtons title="Shingles Vaccine Side Effects (Shingrix) — VaccineWatch" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Shingles Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The shingles vaccine (Shingrix) is known for having more noticeable side effects than 
          most vaccines — particularly after the second dose. Here&apos;s what VAERS data shows, 
          with important context about why this vaccine feels &quot;rougher.&quot;
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm text-primary">Total Reports</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">50+</div>
          <div className="text-sm text-primary">Age Group</div>
          <div className="text-xs text-gray-400">Recommended</div>
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
        <h2 className={playfairDisplay.className}>Why Shingrix Feels &quot;Rougher&quot;</h2>
        <p>
          Shingrix is a recombinant vaccine with an adjuvant (AS01B) specifically designed to 
          produce a strong immune response in older adults whose immune systems are weaker. 
          This strong immune stimulation is what makes it effective (~90% effective at preventing 
          shingles) — but it also causes more noticeable side effects than many other vaccines.
        </p>
        <p>
          In clinical trials, about <strong>78% of participants</strong> reported injection site 
          reactions and <strong>44%</strong> reported systemic side effects (fever, fatigue, etc.). 
          These rates are higher than most vaccines but are expected and well-documented.
        </p>

        <h2 className={playfairDisplay.className}>Most Commonly Reported Side Effects</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/varzos/symptoms/${slugify(s.name)}`}
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
        <p><strong>Very common (day 1-3 after vaccination):</strong></p>
        <ul>
          <li>Pain, redness, and swelling at injection site (most common)</li>
          <li>Muscle pain (myalgia)</li>
          <li>Fatigue</li>
          <li>Headache</li>
          <li>Shivering</li>
          <li>Fever</li>
          <li>Gastrointestinal symptoms</li>
        </ul>
        <p>
          These typically last 2-3 days and are more pronounced after the <strong>second dose</strong>. 
          Many people report being unable to use the arm where the vaccine was given for 1-2 days — 
          this is normal and not a cause for concern.
        </p>

        <h2 className={playfairDisplay.className}>Shingrix vs Zostavax</h2>
        <p>
          The VAERS code &quot;VARZOS&quot; includes both Shingrix (current, recombinant) and 
          Zostavax (discontinued 2020, live vaccine). Shingrix generates more side effect reports 
          due to its stronger adjuvant, but is also significantly more effective (90% vs 51%).
        </p>

        <h2 className={playfairDisplay.className}>Age Context</h2>
        <p>
          Shingles vaccine recipients are older adults (50+), a population with higher baseline 
          health event rates. Some VAERS reports may reflect coincidental health events in this 
          age group rather than vaccine effects.
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

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore Shingles Vaccine Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/vaccines/varzos" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Full VAERS Profile →</div>
            <div className="text-sm text-gray-500">Charts, symptoms, yearly data</div>
          </Link>
          <Link href="/analysis/elderly" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Elderly Vaccine Analysis →</div>
            <div className="text-sm text-gray-500">Age 65+ adverse event patterns</div>
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
