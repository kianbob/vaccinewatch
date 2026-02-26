import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify, getCleanVaccineName } from '@/lib/utils'
import VaccinesList from './VaccinesList'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'All 104 Vaccines in VAERS — Adverse Event Reports',
  description: 'Browse all 104 vaccines with VAERS adverse event reports. Sortable by total reports, deaths, hospitalizations, and ER visits. See which vaccines have the most reports.',
  openGraph: {
    title: 'All 104 Vaccines in VAERS — Adverse Event Reports',
    description: 'Browse all 104 vaccines with VAERS adverse event reports. Sortable by total reports, deaths, hospitalizations, and ER visits. See which vaccines have the most reports.',
  },
}

interface Vaccine {
  name: string
  type: string
  reports: number
  died: number
  hosp: number
  er: number
  disabled: number
  manufacturers: string[]
}

export default function VaccinesPage() {
  const vaccines: Vaccine[] = readJsonFile('vaccine-index.json')
  const stats = readJsonFile('stats.json')

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Vaccines' }]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          All Vaccines in VAERS
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mb-4">
          Complete list of {formatNumber(vaccines.length)} vaccines with adverse event reports in VAERS.
          Click any vaccine name to see detailed analysis including yearly trends, age breakdowns, and associated symptoms.
        </p>
        <p className="text-sm text-gray-500 max-w-4xl">
          VAERS tracks every vaccine licensed in the United States. This page shows aggregate report counts — 
          higher numbers typically reflect widespread use (e.g., COVID-19 and flu vaccines), not higher risk. 
          Always consider denominators when interpreting these numbers.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(vaccines.length)}
          </div>
          <div className="text-sm font-medium text-primary">Total Vaccines</div>
          <div className="text-xs text-gray-500 mt-1">In VAERS database</div>
        </div>

        <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(stats?.totalReports || 1983260)}
          </div>
          <div className="text-sm font-medium text-accent">Total Reports</div>
          <div className="text-xs text-gray-500 mt-1">Unique VAERS reports</div>
        </div>

        <div className="bg-gradient-to-br from-danger/5 to-danger/10 border border-danger/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(stats?.totalDied || 27732)}
          </div>
          <div className="text-sm font-medium text-danger">Deaths Reported</div>
          <div className="text-xs text-gray-500 mt-1">All vaccines</div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {new Set(vaccines.flatMap(v => v.manufacturers)).size}
          </div>
          <div className="text-sm font-medium text-gray-800">Manufacturers</div>
          <div className="text-xs text-gray-500 mt-1">Unique companies</div>
        </div>
      </div>

      {/* Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Browse All Vaccines
        </h2>
        <VaccinesList vaccines={vaccines} />
      </div>

      {/* Top Vaccines Highlight */}
      <div className="bg-gray-50 rounded-xl p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Most Reported Vaccines
        </h3>
        <p className="text-gray-600 mb-6">
          These vaccines have the highest number of reports in VAERS.
          Remember: more reports doesn&apos;t mean more dangerous — it often reflects widespread use.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vaccines
            .sort((a, b) => b.reports - a.reports)
            .slice(0, 6)
            .map((vaccine) => (
              <Link
                key={vaccine.name}
                href={`/vaccines/${vaccine.type.toLowerCase()}`}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="font-medium text-gray-900 mb-1">{getCleanVaccineName(vaccine.name)}</div>
                <div className="text-sm text-gray-500 mb-2">{vaccine.type}</div>
                <div className="text-sm">
                  <span className="font-semibold text-primary">{formatNumber(vaccine.reports)}</span>
                  <span className="text-gray-500"> reports</span>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Context Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          Understanding the Numbers
        </h3>
        <ul className="text-blue-800 space-y-2 text-sm">
          <li>• Higher report counts often reflect <strong>widespread use</strong>, not higher risk</li>
          <li>• COVID-19 vaccines dominate recent reports due to <strong>mass vaccination campaigns</strong></li>
          <li>• VAERS captures <strong>temporal associations</strong>, not proven causal relationships</li>
          <li>• Always consider <strong>background rates</strong> and <strong>reporting incentives</strong></li>
        </ul>
      </div>
    </div>
  )
}
