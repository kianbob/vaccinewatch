import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import DashboardClient from './DashboardClient'

export const metadata: Metadata = {
  title: 'Vaccine Safety Dashboard — Every Vaccine at a Glance',
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
          <ShareButtons title="Vaccine Safety Dashboard" />
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

      {/* Key Insights */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mt-8 mb-8">
        <h2 className={`text-xl font-bold text-amber-900 mb-4 ${playfairDisplay.className}`}>💡 Key Insights From the Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-900">
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>Sort by &quot;Death Rate&quot; to see what raw counts hide.</strong> Vaccines given to elderly patients (pneumococcal, shingles) have the highest death reporting rates — not because they&apos;re dangerous, but because their recipients are older and more fragile.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>COVID-19 vaccines dominate raw counts but have moderate rates.</strong> With 1.1M+ reports from 670M+ doses, COVID vaccines actually have lower hospitalization rates per report than many childhood vaccines.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>Discontinued vaccines appear in this data.</strong> OPV (oral polio), DTP, and Lyme disease vaccines show reports from decades ago — they were replaced by safer alternatives, partly because of VAERS signal detection.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-bold text-amber-600 mt-0.5">→</span>
            <span><strong>62.6% of reports with known outcomes indicate recovery.</strong> Most adverse events, even serious ones, are temporary. Use the <Link href="/tools/recovery-explorer" className="underline font-medium">Recovery Explorer</Link> for vaccine-specific recovery data.</span>
          </div>
        </div>
      </div>

      {/* SEO Content */}
      <div className="mt-8 prose prose-lg max-w-none text-gray-600">
        <h2 className={playfairDisplay.className}>How to Use This Dashboard</h2>
        <p>
          Click any column header to sort by that metric. Use the search box to filter by vaccine name.
          <strong> Important context:</strong> Higher numbers don&apos;t mean a vaccine is more dangerous.
          COVID-19 vaccines top nearly every category because hundreds of millions of doses were administered,
          generating far more reports than any other vaccine in history. Always consider the{' '}
          <Link href="/analysis/denominator-problem">denominator</Link> before drawing conclusions.
        </p>
        <p>
          Death and hospitalization <strong>rates</strong> (per 1,000 reports) provide a better comparison than
          raw counts, though even these are imperfect — different vaccines are given to different populations
          (infants, elderly, immunocompromised), and{' '}
          <Link href="/analysis/reporting-bias">reporting rates vary</Link> by era and vaccine type.
        </p>
      </div>

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
