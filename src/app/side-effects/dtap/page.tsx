import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'DTaP Vaccine Side Effects — Diphtheria, Tetanus, Pertussis VAERS Data',
  description: 'VAERS analysis of DTaP vaccine side effects in children. 66,000+ reports covering fever, fussiness, and rare serious outcomes.',
}

export default function DTaPSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const types = ["DTAP", "DTP", "DT"]
  const vaccines = vaccineIndex.filter((v: any) => types.includes(v.type))

  let totalReports = 0, totalDeaths = 0, totalHosp = 0, totalER = 0
  vaccines.forEach((v: any) => {
    totalReports += v.reports; totalDeaths += v.died; totalHosp += v.hosp; totalER += v.er || 0
  })

  const mainVax = vaccineIndex.find((v: any) => v.type === 'DTAP')
  const topSymptoms = mainVax?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'DTaP Vaccine' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">6 min read</div>
          <ShareButtons title="DTaP Vaccine Side Effects — VAERS Data" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          DTaP Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          DTaP protects children against diphtheria, tetanus, and pertussis (whooping cough). 
          Given as a 5-dose series between ages 2 months and 6 years, it&apos;s one of the most 
          frequently administered childhood vaccines — and one of the most reported in VAERS.
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

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-8">
        <strong>ℹ️ Historical context:</strong> The older DTP (whole-cell pertussis) vaccine had higher 
        reactogenicity and was replaced by DTaP (acellular pertussis) in the late 1990s. VAERS data 
        includes both, and many early reports reflect the older, more reactive formulation.
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Most Commonly Reported Side Effects</h2>
        <p>The following symptoms are most frequently reported after DTaP vaccination:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/dtap/symptoms/${slugify(s.name)}`}
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
        <h2 className={playfairDisplay.className}>DTaP vs DTP: A Critical Distinction</h2>
        <p>
          The original DTP vaccine used whole pertussis bacteria and was associated with higher rates 
          of fever, fussiness, and rare neurological events. The modern DTaP uses purified (acellular) 
          pertussis components and has a significantly improved safety profile.
        </p>
        <p>
          When looking at VAERS data, it&apos;s important to separate pre-1997 DTP reports from modern 
          DTaP reports. The <strong>{formatNumber(totalDeaths)} death reports</strong> across both 
          formulations largely reflect the older vaccine and the era before improved infant health monitoring.
        </p>

        <h2 className={playfairDisplay.className}>Expected Side Effects</h2>
        <p><strong>Common (up to 50% of doses):</strong></p>
        <ul>
          <li>Fussiness and irritability (very common in infants)</li>
          <li>Pain, redness, or swelling at injection site</li>
          <li>Fever (mild to moderate)</li>
          <li>Decreased appetite</li>
          <li>Drowsiness</li>
        </ul>
        <p><strong>Less common:</strong></p>
        <ul>
          <li>Vomiting</li>
          <li>Extensive limb swelling (usually with 4th or 5th dose)</li>
          <li>Persistent crying lasting 3+ hours</li>
        </ul>
        <p><strong>Rare:</strong></p>
        <ul>
          <li>Febrile seizures</li>
          <li>High fever (&gt;105°F)</li>
          <li>Hypotonic-hyporesponsive episodes (sudden limpness)</li>
          <li>Severe allergic reaction</li>
        </ul>

        <h2 className={playfairDisplay.className}>Co-Administration Context</h2>
        <p>
          DTaP is almost always given alongside other vaccines (Hib, IPV, PCV13, hepatitis B, rotavirus) 
          at the 2, 4, and 6-month visits. This means many VAERS reports listing DTaP also list other 
          vaccines — making it impossible to attribute symptoms to DTaP alone from VAERS data.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-12">
        <strong>⚠️ Remember:</strong> VAERS reports show correlation, not causation. Many death reports 
        in infants reflect SIDS and other causes that occurred after vaccination by coincidence, not 
        because of the vaccine. Always consult your healthcare provider for medical advice.
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore This Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/vaccines/dtap" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">DTaP Vaccine Detail →</div>
            <div className="text-sm text-gray-500">Full VAERS profile</div>
          </Link>
          <Link href="/analysis/pediatric" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Pediatric Analysis →</div>
            <div className="text-sm text-gray-500">Children&apos;s vaccine data</div>
          </Link>
          <Link href="/side-effects/tdap" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Tdap Side Effects →</div>
            <div className="text-sm text-gray-500">Adult booster version</div>
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Side Effect Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/side-effects/varicella" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Varicella Side Effects</div>
            <div className="text-sm text-gray-500">Chickenpox vaccine</div>
          </Link>
          <Link href="/side-effects/mmr" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">MMR Side Effects</div>
            <div className="text-sm text-gray-500">Measles, mumps, rubella</div>
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
