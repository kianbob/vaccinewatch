import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import AdminRoutesClient from './AdminRoutesClient'

export const metadata: Metadata = {
  title: 'Administration Routes Explorer — Who Gives Vaccines & How | VaccineWatch',
  description: 'Explore who administers vaccines (doctors, pharmacies, military) and how they\'re given (IM, oral, subcutaneous) in VAERS data.',
}

export default function AdminRoutesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Administration Routes' }
      ]} />

      <h1 className={`${playfairDisplay.className} text-4xl font-bold text-gray-900 mt-4 mb-2`}>
        Administration Routes Explorer
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        VAERS tracks both who administers vaccines and how they&apos;re given. This tool visualizes 
        the distribution of administration settings and vaccine delivery routes across all reports.
      </p>

      <ShareButtons title="Administration Routes Explorer" url="https://vaccinewatch.org/tools/admin-routes" />

      <AdminRoutesClient />

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-bold text-amber-900 mb-2">⚠️ Important Context</h3>
        <ul className="text-sm text-amber-800 space-y-2">
          <li>• These fields are <strong>often left blank or marked &ldquo;Other&rdquo;</strong> — the data is incomplete</li>
          <li>• Administration setting doesn&apos;t indicate quality of care or likelihood of adverse events</li>
          <li>• The distribution shifted dramatically during COVID-19 as pharmacies began mass vaccination</li>
          <li>• Route of administration is determined by the vaccine formulation, not provider choice</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className={`${playfairDisplay.className} text-xl font-bold mb-3`}>Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/analysis/who-reports" className="text-primary hover:text-primary/80 text-sm">→ Who Reports to VAERS</a>
          <a href="/analysis/reporting-bias" className="text-primary hover:text-primary/80 text-sm">→ Reporting Bias</a>
          <a href="/tools/risk-context" className="text-primary hover:text-primary/80 text-sm">→ Risk Context Calculator</a>
          <a href="/analysis/reporting-trends" className="text-primary hover:text-primary/80 text-sm">→ Reporting Trends</a>
        </div>
      </div>
    </div>
  )
}
