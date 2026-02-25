import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'CDC Vaccine Schedule & VAERS Data — Side Effects by Age',
  description: 'See the recommended CDC vaccine schedule with links to VAERS adverse event data for each vaccine. Understand what\'s given at each age and what side effects are reported.',
}

const schedule = [
  {
    age: 'Birth',
    vaccines: [
      { name: 'Hepatitis B (1st dose)', slug: 'hep', sideEffects: '/side-effects/hepatitis-b' },
    ],
  },
  {
    age: '2 Months',
    vaccines: [
      { name: 'DTaP (1st dose)', slug: 'dtap', sideEffects: '/side-effects/dtap' },
      { name: 'IPV / Polio (1st dose)', slug: 'ipv', sideEffects: '/side-effects/polio' },
      { name: 'Hib (1st dose)', slug: 'hibv', sideEffects: null },
      { name: 'PCV13 / Pneumococcal (1st dose)', slug: 'pnc13', sideEffects: '/side-effects/pneumonia' },
      { name: 'Rotavirus (1st dose)', slug: 'rv5', sideEffects: '/side-effects/rotavirus' },
      { name: 'Hepatitis B (2nd dose)', slug: 'hep', sideEffects: '/side-effects/hepatitis-b' },
    ],
  },
  {
    age: '4 Months',
    vaccines: [
      { name: 'DTaP (2nd dose)', slug: 'dtap', sideEffects: '/side-effects/dtap' },
      { name: 'IPV / Polio (2nd dose)', slug: 'ipv', sideEffects: '/side-effects/polio' },
      { name: 'Hib (2nd dose)', slug: 'hibv', sideEffects: null },
      { name: 'PCV13 (2nd dose)', slug: 'pnc13', sideEffects: '/side-effects/pneumonia' },
      { name: 'Rotavirus (2nd dose)', slug: 'rv5', sideEffects: '/side-effects/rotavirus' },
    ],
  },
  {
    age: '6 Months',
    vaccines: [
      { name: 'DTaP (3rd dose)', slug: 'dtap', sideEffects: '/side-effects/dtap' },
      { name: 'IPV / Polio (3rd dose)', slug: 'ipv', sideEffects: '/side-effects/polio' },
      { name: 'Hib (3rd dose, some brands)', slug: 'hibv', sideEffects: null },
      { name: 'PCV13 (3rd dose)', slug: 'pnc13', sideEffects: '/side-effects/pneumonia' },
      { name: 'Rotavirus (3rd dose, some brands)', slug: 'rv5', sideEffects: '/side-effects/rotavirus' },
      { name: 'Hepatitis B (3rd dose)', slug: 'hep', sideEffects: '/side-effects/hepatitis-b' },
      { name: 'Influenza (annual, from 6 months)', slug: 'flu3', sideEffects: '/side-effects/flu' },
    ],
  },
  {
    age: '12–15 Months',
    vaccines: [
      { name: 'MMR (1st dose)', slug: 'mmr', sideEffects: '/side-effects/mmr' },
      { name: 'Varicella / Chickenpox (1st dose)', slug: 'varcel', sideEffects: '/side-effects/varicella' },
      { name: 'Hepatitis A (1st dose)', slug: 'hepa', sideEffects: '/side-effects/hepatitis-a' },
      { name: 'Hib (final dose)', slug: 'hibv', sideEffects: null },
      { name: 'PCV13 (final dose)', slug: 'pnc13', sideEffects: '/side-effects/pneumonia' },
    ],
  },
  {
    age: '15–18 Months',
    vaccines: [
      { name: 'DTaP (4th dose)', slug: 'dtap', sideEffects: '/side-effects/dtap' },
    ],
  },
  {
    age: '4–6 Years',
    vaccines: [
      { name: 'DTaP (5th dose)', slug: 'dtap', sideEffects: '/side-effects/dtap' },
      { name: 'IPV / Polio (4th dose)', slug: 'ipv', sideEffects: '/side-effects/polio' },
      { name: 'MMR (2nd dose)', slug: 'mmr', sideEffects: '/side-effects/mmr' },
      { name: 'Varicella (2nd dose)', slug: 'varcel', sideEffects: '/side-effects/varicella' },
    ],
  },
  {
    age: '11–12 Years',
    vaccines: [
      { name: 'Tdap', slug: 'tdap', sideEffects: '/side-effects/tdap' },
      { name: 'HPV (2 doses)', slug: 'hpv9', sideEffects: '/side-effects/hpv' },
      { name: 'Meningococcal (MenACWY)', slug: 'mnq', sideEffects: '/side-effects/meningococcal' },
    ],
  },
  {
    age: '16 Years',
    vaccines: [
      { name: 'Meningococcal (booster)', slug: 'mnq', sideEffects: '/side-effects/meningococcal' },
    ],
  },
  {
    age: 'Every Pregnancy',
    vaccines: [
      { name: 'Tdap (27–36 weeks)', slug: 'tdap', sideEffects: '/side-effects/tdap' },
      { name: 'Influenza (any trimester)', slug: 'flu4', sideEffects: '/side-effects/flu' },
      { name: 'RSV (32–36 weeks, seasonal)', slug: 'rsv', sideEffects: null },
    ],
  },
  {
    age: '50+ Years',
    vaccines: [
      { name: 'Shingrix (2 doses)', slug: 'varzos', sideEffects: '/side-effects/shingles' },
    ],
  },
  {
    age: '65+ Years',
    vaccines: [
      { name: 'Pneumococcal (PCV20 or PCV15+PPSV23)', slug: 'pnc20', sideEffects: '/side-effects/pneumonia' },
      { name: 'Influenza (annual, high-dose)', slug: 'flua4', sideEffects: '/side-effects/flu' },
      { name: 'RSV (seasonal)', slug: 'rsv', sideEffects: null },
    ],
  },
  {
    age: 'All Ages (6mo+)',
    vaccines: [
      { name: 'COVID-19 (updated annually)', slug: 'covid19', sideEffects: '/side-effects/covid' },
    ],
  },
]

export default function VaccineSchedulePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Vaccine Schedule' }]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">Reference</div>
          <ShareButtons title="CDC Vaccine Schedule & VAERS Data" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Vaccine Schedule &amp; VAERS Data
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          The recommended CDC immunization schedule with links to VAERS adverse event data 
          for each vaccine. Click any vaccine to see its complete safety profile.
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800">
          <strong>Note:</strong> This is a simplified summary based on the CDC recommended schedule. 
          Actual timing may vary based on medical history. Always consult your healthcare provider 
          for personalized vaccination guidance.
        </div>
      </div>

      {/* Schedule */}
      <div className="space-y-6 mb-12">
        {schedule.map((period) => (
          <div key={period.age} className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-gray-50 px-5 py-3 border-b border-gray-200">
              <h2 className={`text-lg font-bold text-gray-900 ${playfairDisplay.className}`}>
                {period.age}
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {period.vaccines.map((vax, i) => (
                <div key={`${vax.slug}-${i}`} className="px-5 py-3 flex items-center justify-between hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <Link href={`/vaccines/${vax.slug}`} className="text-primary hover:underline font-medium">
                      {vax.name}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2">
                    {vax.sideEffects && (
                      <Link href={vax.sideEffects} className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg hover:bg-primary/20 transition-colors">
                        Side Effects
                      </Link>
                    )}
                    <Link href={`/vaccines/${vax.slug}`} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg hover:bg-gray-200 transition-colors">
                      VAERS Data
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>About This Schedule</h2>
        <p>
          This schedule follows the CDC&apos;s recommended immunization schedule, which is reviewed 
          annually by the Advisory Committee on Immunization Practices (ACIP). The schedule 
          represents the standard of care in the United States.
        </p>
        <p>
          Each vaccine listed links to its VAERS data profile, where you can see reported adverse 
          events, symptom breakdowns, age distributions, and year-over-year trends. For vaccines 
          with dedicated side effect guides, click the &quot;Side Effects&quot; button for a 
          comprehensive analysis.
        </p>

        <h2 className={playfairDisplay.className}>Catch-Up Schedules</h2>
        <p>
          Children who miss doses may need a catch-up schedule with different timing. Adults who 
          were never vaccinated may need certain childhood vaccines. The CDC provides detailed 
          catch-up schedules at{' '}
          <a href="https://www.cdc.gov/vaccines/schedules/" target="_blank" rel="noopener noreferrer">
            cdc.gov/vaccines/schedules
          </a>.
        </p>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/side-effects" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Side Effects Guide →</div>
            <div className="text-sm text-gray-500">All vaccines covered</div>
          </Link>
          <Link href="/analysis/pediatric" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Pediatric Analysis →</div>
            <div className="text-sm text-gray-500">Childhood vaccine data</div>
          </Link>
          <Link href="/dashboard" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Full Dashboard →</div>
            <div className="text-sm text-gray-500">All 104 vaccines</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
