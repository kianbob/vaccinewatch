import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Flu Shot Side Effects 2026 — Common Reactions & VAERS Adverse Event Data',
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What are common flu vaccine side effects?', acceptedAnswer: { '@type': 'Answer', text: 'The most commonly reported flu vaccine side effects in VAERS include injection site soreness, headache, fatigue, muscle aches, and low-grade fever. These are normal immune responses that typically resolve within 1-2 days.' }},
          { '@type': 'Question', name: 'Can the flu shot cause the flu?', acceptedAnswer: { '@type': 'Answer', text: 'No. Injectable flu vaccines contain inactivated virus and cannot cause influenza. Some people experience mild symptoms after vaccination, which represent normal immune activation, not actual flu infection. The nasal spray (FluMist) contains weakened live virus but also cannot cause actual flu.' }},
          { '@type': 'Question', name: 'How many types of flu vaccines are there in VAERS?', acceptedAnswer: { '@type': 'Answer', text: 'VAERS tracks 11 different flu vaccine types, including trivalent, quadrivalent, high-dose (for seniors), cell-based, recombinant, adjuvanted, and nasal spray versions, each with different formulations and target populations.' }},
        ],
      }) }} />
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
        <h2 className={playfairDisplay.className}>Understanding the Flu Vaccine Landscape</h2>
        <p>
          The flu vaccine is unique in VAERS because it has been tracked continuously for over
          35 years with annual administration to hundreds of millions of Americans. This provides
          one of the most robust baselines in the entire VAERS database for understanding
          normal adverse event reporting patterns.
        </p>

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

        <h2 className={playfairDisplay.className}>Flu Vaccine and Older Adults</h2>
        <p>
          Adults 65 and older are recommended to receive enhanced flu vaccine formulations that
          may produce stronger immune responses and, correspondingly, more noticeable side effects:
        </p>
        <ul>
          <li><strong>High-dose flu vaccine (Fluzone HD):</strong> Contains 4x the antigen of
          standard-dose vaccines. More local reactions (soreness, redness) but significantly
          better protection in seniors</li>
          <li><strong>Adjuvanted flu vaccine (Fluad):</strong> Contains MF59 adjuvant to boost
          immune response. May cause more injection site reactions</li>
          <li><strong>Recombinant flu vaccine (Flublok):</strong> Made without eggs or live virus.
          Similar side effect profile to standard vaccines</li>
        </ul>
        <p>
          The higher VAERS death reporting rate for flu vaccines reflects the elderly population that
          receives them, not the vaccine&apos;s safety profile. Elderly adults have high baseline
          mortality rates, and temporal coincidence with vaccination is expected. See our{' '}
          <Link href="/analysis/elderly">analysis of the 65+ age group</Link> for more context.
        </p>

        <h2 className={playfairDisplay.className}>Egg Allergies and Flu Vaccines</h2>
        <p>
          Most flu vaccines are produced using eggs, which historically raised concerns for people
          with egg allergies. Current CDC guidance states that people with egg allergies can receive
          any age-appropriate flu vaccine without additional precautions beyond the standard 15-minute
          observation period. For those with severe egg allergies, cell-based (Flucelvax) and
          recombinant (Flublok) options are available that do not use eggs in production.
        </p>

        <h2 className={playfairDisplay.className}>Flu vs COVID Vaccine Reports</h2>
        <p>
          Comparing flu and COVID vaccine VAERS reports is a common but misleading exercise. 
          COVID vaccines had dramatically higher reporting rates due to mandatory reporting 
          requirements, heightened public awareness, and the emergency use context. Our{' '}
          <Link href="/analysis/covid-vs-flu">COVID vs Flu comparison</Link> explores this in detail.
        </p>
        <p>
          The flu shot is recommended annually for nearly everyone over 6 months old. See where it fits on the{' '}
          <Link href="/vaccine-schedule">CDC vaccine schedule</Link> and our{' '}
          <Link href="/analysis/vaccine-schedule-2026">2026 vaccine schedule analysis</Link>.
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

      {/* FAQ */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-semibold text-gray-900">Can the flu shot give me the flu?</div>
            <div className="text-gray-600 mt-1">No. Injectable flu vaccines contain inactivated virus and cannot cause influenza. Mild symptoms after the shot (fatigue, low-grade fever) are signs of your immune system responding, not actual flu infection. The nasal spray contains weakened live virus but also cannot cause true flu.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Why do I need a flu shot every year?</div>
            <div className="text-gray-600 mt-1">Influenza viruses mutate rapidly, and the dominant strains change each season. The annual vaccine is reformulated to match the strains most likely to circulate that year. Additionally, immunity from the flu vaccine wanes over several months.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">When is the best time to get a flu shot?</div>
            <div className="text-gray-600 mt-1">September or October is ideal for most people, providing protection through the peak flu season (December–February). Getting vaccinated later is still beneficial — flu activity can persist into May.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Can I get the flu shot and COVID vaccine at the same time?</div>
            <div className="text-gray-600 mt-1">Yes. CDC allows co-administration of flu and COVID vaccines. Side effects may be slightly more noticeable but are generally the same as getting either vaccine alone. See our <Link href="/analysis/multi-vaccine" className="text-primary hover:underline">multi-vaccine analysis</Link>.</div>
          </div>
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

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
        <strong>Reporting context:</strong> Flu vaccines have one of the longest track records in VAERS,
        with data spanning the full 35-year history of the system. Annual administration to hundreds of
        millions of people provides a robust baseline for comparison. When evaluating flu vaccine VAERS
        data, remember that the elderly population receiving high-dose formulations has higher baseline
        rates of serious health events, which inflates severity metrics for flu vaccines compared to
        vaccines given primarily to young, healthy populations.
      </div>
    </div>
  )
}
