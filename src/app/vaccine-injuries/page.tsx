import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Vaccine Injuries — VAERS Reports, VICP Claims & Data',
  description: 'Understanding vaccine injuries: VAERS adverse event data, the Vaccine Injury Compensation Program (VICP), and what the data shows about serious vaccine reactions.',
}

export default function VaccineInjuriesPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const stats = readJsonFile('stats.json')
  const totalReports = stats?.totalReports || 1983260
  const totalHosp = stats?.totalHospitalized || 143653
  const totalDisabled = stats?.totalDisabled || 37185
  const totalDeaths = stats?.totalDied || 27732

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Vaccine Injuries' }]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">9 min read</div>
          <ShareButtons title="Vaccine Injuries — VAERS Data & VICP" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Vaccine Injuries
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Vaccines, like all medical interventions, carry a small risk of adverse reactions. 
          This page covers what VAERS data shows about serious adverse events, how the 
          Vaccine Injury Compensation Program works, and how to interpret injury data.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm text-primary">Total VAERS Reports</div>
        </div>
        <div className="bg-white border border-amber-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">{formatNumber(totalHosp)}</div>
          <div className="text-sm text-amber-500">Hospitalizations</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalDisabled)}</div>
          <div className="text-sm text-gray-500">Disability Reports</div>
        </div>
        <div className="bg-white border border-red-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{formatNumber(totalDeaths)}</div>
          <div className="text-sm text-red-500">Death Reports</div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What Is a Vaccine Injury?</h2>
        <p>
          A vaccine injury is a health problem that is <strong>caused or significantly worsened</strong> by 
          a vaccine. It&apos;s important to distinguish between:
        </p>
        <ul>
          <li><strong>Expected side effects:</strong> Common, mild reactions (soreness, fever) that resolve quickly</li>
          <li><strong>Adverse events:</strong> Any health problem reported after vaccination (may or may not be caused by the vaccine)</li>
          <li><strong>Vaccine injuries:</strong> Health problems actually caused by the vaccine (rare, requires medical/legal determination)</li>
        </ul>
        <p>
          VAERS captures <em>adverse events</em> — not confirmed vaccine injuries. The difference 
          matters enormously for interpreting the data.
        </p>

        <h2 className={playfairDisplay.className}>Known Vaccine Injuries</h2>
        <p>
          While rare, some adverse events have been established as genuine vaccine injuries 
          through scientific research:
        </p>
        <ul>
          <li><strong>Anaphylaxis:</strong> Severe allergic reaction — occurs within minutes, treatable with epinephrine. Risk: ~1-5 per million doses.</li>
          <li><strong>Guillain-Barré Syndrome (GBS):</strong> Nerve disorder causing weakness/paralysis. Associated with flu and some other vaccines. Risk: ~1-2 extra cases per million.</li>
          <li><strong>Myocarditis:</strong> Heart inflammation after mRNA COVID vaccines, especially in young males. Most cases mild and self-resolving.</li>
          <li><strong>Intussusception:</strong> Bowel obstruction in infants after rotavirus vaccine. Led to RotaShield withdrawal; current vaccines have much lower risk.</li>
          <li><strong>Thrombosis with Thrombocytopenia (TTS):</strong> Rare blood clotting after J&amp;J COVID vaccine. Led to limited use.</li>
          <li><strong>Shoulder Injury (SIRVA):</strong> Shoulder damage from improper injection technique — not the vaccine itself, but the administration.</li>
        </ul>

        <h2 className={playfairDisplay.className}>The Vaccine Injury Compensation Program (VICP)</h2>
        <p>
          The U.S. has a no-fault compensation system for vaccine injuries:
        </p>
        <ul>
          <li><strong>VICP (National Vaccine Injury Compensation Program):</strong> Covers childhood and adult vaccines on the recommended schedule. Funded by a $0.75 excise tax per vaccine dose.</li>
          <li><strong>CICP (Countermeasures Injury Compensation Program):</strong> Covers COVID-19 vaccines and other emergency-use products.</li>
        </ul>
        <p>
          Since 1988, the VICP has paid over <strong>$5 billion</strong> in compensation for 
          approximately 10,000 claims — out of billions of vaccine doses administered. 
          Most compensated claims are settled cases, not admissions that a vaccine caused the injury.
        </p>

        <h2 className={playfairDisplay.className}>Putting the Numbers in Context</h2>
        <p>
          VAERS reports {formatNumber(totalHosp)} hospitalizations and {formatNumber(totalDisabled)} disability 
          reports across all vaccines over 35 years. These raw numbers seem large, but context matters:
        </p>
        <ul>
          <li><strong>Billions of doses:</strong> The U.S. administers hundreds of millions of vaccine doses per year</li>
          <li><strong>Coincidental events:</strong> Many hospitalizations after vaccination are for unrelated conditions</li>
          <li><strong>Reporting ≠ causation:</strong> VAERS doesn&apos;t verify that the vaccine caused the reported event</li>
          <li><strong>Background rates:</strong> People get sick and go to hospitals regardless of vaccination</li>
        </ul>

        <h2 className={playfairDisplay.className}>How to Report a Suspected Vaccine Injury</h2>
        <p>If you believe you or someone you know has experienced a vaccine injury:</p>
        <ol>
          <li><strong>Seek medical care</strong> immediately for any serious reaction</li>
          <li><strong>File a VAERS report</strong> at <a href="https://vaers.hhs.gov" target="_blank" rel="noopener noreferrer">vaers.hhs.gov</a></li>
          <li><strong>Consider filing a VICP claim</strong> at <a href="https://www.hrsa.gov/vaccine-compensation" target="_blank" rel="noopener noreferrer">hrsa.gov/vaccine-compensation</a></li>
          <li><strong>Consult your healthcare provider</strong> about future vaccination decisions</li>
        </ol>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore Injury Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/vaccine-deaths" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Death Reports →</div>
            <div className="text-sm text-gray-500">Analysis with context</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Serious Outcomes →</div>
            <div className="text-sm text-gray-500">Hospitalization &amp; disability data</div>
          </Link>
          <Link href="/analysis/recovery-rates" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Recovery Rates →</div>
            <div className="text-sm text-gray-500">Do people recover?</div>
          </Link>
          <Link href="/tools/severity-profile" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Severity Profile Tool →</div>
            <div className="text-sm text-gray-500">Compare vaccine outcomes</div>
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/myocarditis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Myocarditis</div>
            <div className="text-sm text-gray-500">Confirmed rare side effect</div>
          </Link>
          <Link href="/side-effects" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Side Effects Guide</div>
            <div className="text-sm text-gray-500">Common vs serious</div>
          </Link>
          <Link href="/is-vaers-reliable" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Is VAERS Reliable?</div>
            <div className="text-sm text-gray-500">Understanding the data</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
