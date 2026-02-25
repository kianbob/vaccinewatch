import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import DashboardClient from './DashboardClient'

export const metadata: Metadata = {
  title: 'Vaccine Safety Dashboard — Every Vaccine at a Glance | VaccineWatch',
  description: 'Interactive dashboard comparing all 104 vaccines in VAERS. Sort by reports, deaths, hospitalizations, ER visits, and disability rates. Searchable and filterable.',
  openGraph: {
    title: 'Vaccine Safety Dashboard — Every Vaccine at a Glance',
    description: 'Interactive dashboard comparing all 104 vaccines in VAERS with sortable statistics.',
  },
}

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">Interactive Tool</div>
          <ShareButtons title="Vaccine Safety Dashboard — VaccineWatch" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Vaccine Safety Dashboard
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Every vaccine tracked by VAERS in one sortable, searchable table. Compare reports, 
          death rates, hospitalization rates, ER visits, and disability reports across all {' '}
          <strong>104 vaccines</strong>.
        </p>
      </div>

      <DashboardClient />

      {/* Related links */}
      <div className="mt-12 border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/tools/severity-profile" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Severity Profile Tool</div>
            <div className="text-sm text-gray-500">Deep-dive into any vaccine&apos;s outcome profile</div>
          </Link>
          <Link href="/compare" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Compare Vaccines</div>
            <div className="text-sm text-gray-500">Side-by-side comparison with charts</div>
          </Link>
          <Link href="/analysis/denominator-problem" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">The Denominator Problem</div>
            <div className="text-sm text-gray-500">Why raw VAERS numbers can be misleading</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
