import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import RecoveryExplorerClient from './RecoveryExplorerClient'

export const metadata: Metadata = {
  title: 'Recovery Explorer — Do Side Effects Go Away?',
  description: 'Interactive tool to explore recovery rates for vaccine adverse events. Compare recovery outcomes across 100+ vaccines in VAERS.'
}

export default function RecoveryExplorerPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Recovery Explorer' }
      ]} />

      <h1 className={`${playfairDisplay.className} text-4xl font-bold text-gray-900 mt-4 mb-2`}>
        Recovery Explorer
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Do vaccine side effects go away? Explore recovery status data across all vaccines in VAERS. 
        &quot;Not recovered&quot; often means symptoms were ongoing at time of report — not necessarily permanent.
      </p>

      <RecoveryExplorerClient />
    </div>
  )
}
