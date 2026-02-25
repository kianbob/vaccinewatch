import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Rotavirus Vaccine Side Effects — RotaTeq & Rotarix VAERS Data',
  description: 'VAERS analysis of rotavirus vaccine side effects. 25,000+ reports for RotaTeq (RV5) and Rotarix (RV1) including intussusception risk data.',
}

export default function RotavirusSideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const types = ["RV5", "RV1", "RV"]
  const vaccines = vaccineIndex.filter((v: any) => types.includes(v.type))

  let totalReports = 0, totalDeaths = 0, totalHosp = 0, totalER = 0
  vaccines.forEach((v: any) => {
    totalReports += v.reports; totalDeaths += v.died; totalHosp += v.hosp; totalER += v.er || 0
  })

  const mainVax = vaccineIndex.find((v: any) => v.type === 'RV5')
  const topSymptoms = mainVax?.symptoms?.slice(0, 12) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Vaccine Side Effects', href: '/side-effects' },
        { label: 'Rotavirus Vaccine' }
      ]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What are common rotavirus vaccine side effects?","acceptedAnswer":{"@type":"Answer","text":"Common side effects include mild diarrhea, vomiting, irritability, and low-grade fever. The oral vaccine is generally well-tolerated."}},{"@type":"Question","name":"Is there a risk of intussusception with rotavirus vaccine?","acceptedAnswer":{"@type":"Answer","text":"A small increased risk exists — about 1-5 extra cases per 100,000 infants, far lower than the risk from natural rotavirus infection."}},{"@type":"Question","name":"Why was RotaShield withdrawn?","acceptedAnswer":{"@type":"Answer","text":"RotaShield (1998) was withdrawn in 1999 due to elevated intussusception risk. Current vaccines (RotaTeq, Rotarix) are much safer."}}]}' }} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">5 min read</div>
          <ShareButtons title="Rotavirus Vaccine Side Effects — VAERS Data" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Rotavirus Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Rotavirus vaccines (RotaTeq and Rotarix) protect infants against severe diarrhea caused by 
          rotavirus — the leading cause of severe gastroenteritis in young children worldwide. Given 
          orally starting at 2 months of age, these vaccines have dramatically reduced rotavirus 
          hospitalizations.
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
        <strong>ℹ️ Historical context:</strong> The first rotavirus vaccine (RotaShield) was withdrawn 
        in 1999 due to an association with intussusception. Current vaccines (RotaTeq, approved 2006; 
        Rotarix, approved 2008) have a much smaller risk and are carefully monitored.
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Most Commonly Reported Side Effects</h2>
        <p>The following symptoms are most frequently reported after rotavirus vaccination:</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/vaccines/rv5/symptoms/${slugify(s.name)}`}
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
        <h2 className={playfairDisplay.className}>Intussusception: The Key Safety Concern</h2>
        <p>
          Intussusception — a type of bowel obstruction where one segment of the intestine telescopes 
          into another — is the most closely monitored adverse event for rotavirus vaccines. The first 
          rotavirus vaccine (RotaShield) was withdrawn in 1999 because it caused intussusception in 
          about 1 in 10,000 infants.
        </p>
        <p>
          Current vaccines (RotaTeq and Rotarix) have a much smaller risk — estimated at 1-5 additional 
          cases per 100,000 infants vaccinated, primarily within the first week after the first dose. 
          This is why there&apos;s a strict age limit: the first dose must be given before 15 weeks of age, 
          and the series must be completed by 8 months.
        </p>

        <h2 className={playfairDisplay.className}>RotaTeq vs Rotarix</h2>
        <ul>
          <li><strong>RotaTeq (RV5):</strong> 3-dose series at 2, 4, and 6 months. Made by Merck.</li>
          <li><strong>Rotarix (RV1):</strong> 2-dose series at 2 and 4 months. Made by GSK.</li>
        </ul>
        <p>Both are oral vaccines (drops, not shots), which is why common side effects differ from injectable vaccines.</p>

        <h2 className={playfairDisplay.className}>Expected Side Effects</h2>
        <p><strong>Common:</strong></p>
        <ul>
          <li>Irritability and fussiness</li>
          <li>Mild, temporary diarrhea</li>
          <li>Vomiting (usually mild)</li>
          <li>Fever</li>
        </ul>
        <p><strong>Less common:</strong></p>
        <ul>
          <li>Flatulence</li>
          <li>Decreased appetite</li>
          <li>Runny nose</li>
        </ul>
        <p><strong>Rare but serious:</strong></p>
        <ul>
          <li>Intussusception (see above — about 1-5 per 100,000)</li>
          <li>Kawasaki disease (monitoring ongoing, not confirmed)</li>
          <li>Severe allergic reaction</li>
        </ul>

        <h2 className={playfairDisplay.className}>Death Reports in Context</h2>
        <p>
          The relatively high number of death reports for rotavirus vaccine reflects that it&apos;s given 
          to very young infants (2-8 months) during the peak window for SIDS (Sudden Infant Death 
          Syndrome). Large-scale studies have found no increased risk of death from rotavirus vaccination 
          — the temporal association with SIDS is coincidental.
        </p>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800 mb-12">
        <strong>⚠️ Remember:</strong> VAERS reports show correlation, not causation. Many death reports 
        in young infants coincide with the age window for SIDS. Always consult your healthcare provider 
        for medical advice.
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore This Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/vaccines/rv5" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">RotaTeq Detail →</div>
            <div className="text-sm text-gray-500">Full VAERS profile</div>
          </Link>
          <Link href="/analysis/pediatric" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Pediatric Analysis →</div>
            <div className="text-sm text-gray-500">Children&apos;s vaccine data</div>
          </Link>
          <Link href="/side-effects/dtap" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">DTaP Side Effects →</div>
            <div className="text-sm text-gray-500">Given at same visits</div>
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Side Effect Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/side-effects/dtap" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">DTaP Side Effects</div>
            <div className="text-sm text-gray-500">Diphtheria, tetanus, pertussis</div>
          </Link>
          <Link href="/side-effects/hepatitis-b" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Hepatitis B Side Effects</div>
            <div className="text-sm text-gray-500">Given at birth</div>
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
