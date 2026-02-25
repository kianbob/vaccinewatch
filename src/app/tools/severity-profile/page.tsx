import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import SeverityProfileClient from './SeverityProfileClient'

export const metadata: Metadata = {
  title: 'Severity Profile - Vaccine Outcome Breakdown',
  description: 'See the complete severity profile for any vaccine: recovery rates, hospitalization rates, death rates, and ER visits compared to the average across all vaccines.'
}

export default function SeverityProfilePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Severity Profile' }
      ]} />

      <h1 className={`${playfairDisplay.className} text-4xl font-bold text-gray-900 mt-4 mb-2`}>
        Vaccine Severity Profile
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Select any vaccine to see its complete outcome profile — recovery rates, hospitalization rates, 
        death reporting rates, and how they compare to the average across all vaccines.
      </p>

      <SeverityProfileClient />

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-bold text-amber-900 mb-2">⚠️ Critical Context</h3>
        <ul className="text-sm text-amber-800 space-y-2">
          <li>• <strong>These are reporting rates, not actual risk rates.</strong> VAERS captures a subset of adverse events — the actual incidence may be higher or lower.</li>
          <li>• <strong>&quot;Higher than average&quot; does NOT mean dangerous.</strong> Vaccines given to older/sicker populations will naturally have higher severity rates.</li>
          <li>• <strong>Recovery data is often incomplete.</strong> Many reporters never submit follow-up, so &quot;not recovered&quot; may just mean &quot;no update filed.&quot;</li>
          <li>• <strong>Always consider the denominator</strong> — a vaccine given to 300 million people will have very different report rates than one given to 1 million.</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className={`${playfairDisplay.className} text-xl font-bold mb-3`}>Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/analysis/serious-outcomes" className="text-primary hover:text-primary/80 text-sm">→ Serious Outcomes Analysis</a>
          <a href="/analysis/recovery-rates" className="text-primary hover:text-primary/80 text-sm">→ Recovery Rates Analysis</a>
          <a href="/analysis/denominator-problem" className="text-primary hover:text-primary/80 text-sm">→ The Denominator Problem</a>
          <a href="/compare" className="text-primary hover:text-primary/80 text-sm">→ Compare Vaccines</a>
        </div>
      </div>
    </div>
  )
}
