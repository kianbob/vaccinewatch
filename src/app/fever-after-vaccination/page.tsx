import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, formatManufacturer } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Fever After Vaccination — Is It Normal? VAERS Data | VaccineWatch',
  description: 'Fever is the #1 reported symptom in VAERS with 276,000+ reports. Learn when post-vaccination fever is normal, when to worry, and what the data shows.',
}

export default function FeverAfterVaccinationPage() {
  const symptomIndex = readJsonFile('symptom-index.json')
  const pyrexia = symptomIndex.find((s: any) => s.name === 'Pyrexia')
  const totalReports = pyrexia?.reports || 0

  // Top vaccines associated with fever
  const topVaccines = pyrexia?.vaccines?.slice(0, 10) || []

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Side Effects', href: '/side-effects' },
        { label: 'Fever After Vaccination' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">5 min read</div>
          <ShareButtons title="Fever After Vaccination — Is It Normal? | VaccineWatch" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Fever After Vaccination
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Fever (pyrexia) is the most commonly reported symptom in VAERS, with {formatNumber(totalReports)} reports. 
          In most cases, post-vaccination fever is a <strong>normal sign your immune system is working</strong>.
        </p>
      </div>

      {/* Key info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-green-50 border border-green-200 rounded-xl p-5">
          <div className="text-green-700 font-bold mb-1">✅ Usually Normal</div>
          <div className="text-sm text-green-800">Low-grade fever (99-101°F) lasting 1-2 days is an expected immune response</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <div className="text-amber-700 font-bold mb-1">⚠️ Monitor If</div>
          <div className="text-sm text-amber-800">Fever above 103°F, lasts more than 3 days, or accompanied by unusual symptoms</div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-xl p-5">
          <div className="text-red-700 font-bold mb-1">🚨 Seek Care If</div>
          <div className="text-sm text-red-800">Fever above 105°F, seizures, difficulty breathing, or signs of allergic reaction</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why Vaccines Cause Fever</h2>
        <p>
          Fever after vaccination is your immune system doing exactly what it&apos;s supposed to do. 
          When the immune system encounters the vaccine antigens, it mounts an inflammatory response 
          that can raise body temperature. This is the same mechanism that causes fever during 
          natural infections — just without the actual disease.
        </p>
        <p>
          Not everyone gets a fever after vaccination. It depends on factors including age, 
          the specific vaccine, which dose (second doses often cause more symptoms), and 
          individual immune system variation.
        </p>

        <h2 className={playfairDisplay.className}>Which Vaccines Cause the Most Fever?</h2>
        <p>Based on VAERS reporting data, vaccines most commonly associated with fever reports:</p>
      </div>

      <div className="space-y-2 mb-12">
        {topVaccines.map((v: any, i: number) => (
          <Link key={v.type} href={`/vaccines/${v.type.toLowerCase()}`}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md transition-all">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-primary/60 w-6">#{i + 1}</span>
              <span className="font-medium text-gray-900">{v.type}</span>
            </div>
            <span className="text-sm text-gray-500 font-mono">{formatNumber(v.count)} reports</span>
          </Link>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>When Is Post-Vaccination Fever Normal?</h2>
        <ul>
          <li><strong>Timing:</strong> Typically starts within 6-24 hours of vaccination</li>
          <li><strong>Duration:</strong> Usually lasts 1-2 days</li>
          <li><strong>Temperature:</strong> Generally low-grade (99-101°F / 37.2-38.3°C)</li>
          <li><strong>Other symptoms:</strong> Often accompanied by fatigue, headache, and body aches</li>
        </ul>

        <h2 className={playfairDisplay.className}>Managing Post-Vaccination Fever</h2>
        <ul>
          <li><strong>Acetaminophen (Tylenol) or ibuprofen</strong> can help reduce fever and discomfort</li>
          <li><strong>Stay hydrated</strong> — drink plenty of water</li>
          <li><strong>Rest</strong> — your body is building immunity</li>
          <li><strong>Cool compress</strong> on forehead if uncomfortable</li>
          <li><strong>Don&apos;t take fever reducers before vaccination</strong> — some evidence suggests this may reduce immune response</li>
        </ul>

        <h2 className={playfairDisplay.className}>Febrile Seizures in Children</h2>
        <p>
          In young children (6 months to 5 years), fever from any cause can occasionally trigger 
          febrile seizures. While frightening, febrile seizures are generally harmless and don&apos;t 
          cause lasting damage. They occur in about 1 in 3,000 children after MMR vaccination — 
          similar to the rate from any fever of the same temperature.
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/symptoms/pyrexia" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Fever in VAERS →</div>
            <div className="text-sm text-gray-500">All vaccine associations</div>
          </Link>
          <Link href="/analysis/onset-timing" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Onset Timing →</div>
            <div className="text-sm text-gray-500">When symptoms start</div>
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
