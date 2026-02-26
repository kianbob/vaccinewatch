import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, formatManufacturer } from '@/lib/utils'
import ManufacturersList from './ManufacturersList'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ManufacturerBarChartClient as ManufacturerBarChart, ManufacturerPieChartClient as ManufacturerPieChart } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Vaccine Manufacturers — VAERS Safety Reports by Company',
  description: 'VAERS adverse event reports by vaccine manufacturer. Compare Pfizer, Moderna, Merck, and more. Market share analysis, death reports, and hospitalization data.',
  openGraph: {
    title: 'Vaccine Manufacturers — VAERS Safety Reports by Company',
    description: 'VAERS adverse event reports by vaccine manufacturer. Compare Pfizer, Moderna, Merck, and more. Market share analysis, death reports, and hospitalization data.',
  },
}

interface Manufacturer {
  name: string
  reports: number
  died: number
  hosp: number
}

export default function ManufacturersPage() {
  const manufacturers: Manufacturer[] = readJsonFile('manufacturer-index.json')

  const stats = readJsonFile('stats.json')
  const totalReports = stats?.totalReports || 1983260
  const totalDeaths = stats?.totalDied || 27732
  const totalHosp = stats?.totalHospitalized || 143653

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Manufacturers' }]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Vaccine Manufacturers
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mb-4">
          VAERS adverse event reports broken down by vaccine manufacturer. 
          These numbers reflect reporting patterns and market presence, not relative safety.
        </p>
        <p className="text-sm text-gray-500 max-w-4xl">
          Manufacturer report counts are driven primarily by market share and the types of vaccines produced.
          Companies producing COVID-19 vaccines dominate recent data due to the unprecedented scale of the
          vaccination campaign. Comparing manufacturers requires accounting for doses administered, not just raw reports.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {manufacturers.length}
          </div>
          <div className="text-sm font-medium text-primary">Manufacturers</div>
          <div className="text-xs text-gray-500 mt-1">In VAERS database</div>
        </div>

        <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(totalReports)}
          </div>
          <div className="text-sm font-medium text-accent">Total Reports</div>
          <div className="text-xs text-gray-500 mt-1">All manufacturers</div>
        </div>

        <div className="bg-gradient-to-br from-danger/5 to-danger/10 border border-danger/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(totalDeaths)}
          </div>
          <div className="text-sm font-medium text-danger">Deaths</div>
          <div className="text-xs text-gray-500 mt-1">All manufacturers</div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(totalHosp)}
          </div>
          <div className="text-sm font-medium text-gray-800">Hospitalizations</div>
          <div className="text-xs text-gray-500 mt-1">All manufacturers</div>
        </div>
      </div>

      {/* Key Insights */}
      {(() => {
        const sorted = [...manufacturers].sort((a, b) => b.reports - a.reports)
        const top3 = sorted.slice(0, 3)
        const top3Pct = ((top3.reduce((s, m) => s + m.reports, 0) / totalReports) * 100).toFixed(0)
        const smallMfg = manufacturers.filter(m => m.reports < 1000)
        return (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h2 className={`text-xl font-bold text-amber-900 mb-4 ${playfairDisplay.className}`}>💡 Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-900">
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-600 mt-0.5">→</span>
                <span><strong>Three manufacturers dominate: {formatManufacturer(top3[0]?.name)}, {formatManufacturer(top3[1]?.name)}, and {formatManufacturer(top3[2]?.name)}</strong> account for {top3Pct}% of all VAERS reports — reflecting their massive market share from COVID-19 mRNA vaccines and legacy vaccine portfolios.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-600 mt-0.5">→</span>
                <span><strong>Report count ≠ safety profile.</strong> Pfizer has the most reports because they manufactured the most-used COVID-19 vaccine in the US. Comparing manufacturers requires controlling for doses administered, patient demographics, and reporting era.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-600 mt-0.5">→</span>
                <span><strong>{smallMfg.length} manufacturers have fewer than 1,000 reports</strong> — these make niche vaccines (rabies, yellow fever, anthrax) given to small populations, making statistical comparisons unreliable.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-600 mt-0.5">→</span>
                <span><strong>Legacy manufacturers like Merck have decades of data</strong> spanning dozens of vaccine types, while newer companies like BioNTech emerged in 2021. Time span matters when comparing totals.</span>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ManufacturerBarChart data={manufacturers.slice(0, 10)} />
        <ManufacturerPieChart data={manufacturers.slice(0, 8)} />
      </div>

      {/* Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          All Manufacturers
        </h2>
        <ManufacturersList manufacturers={manufacturers} />
      </div>

      {/* Top Manufacturers Highlight */}
      <div className="bg-gray-50 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Top Manufacturers by Reports
        </h3>
        <p className="text-gray-600 mb-6">
          These manufacturers have the highest number of VAERS reports. 
          This typically reflects market share and vaccine distribution, not safety profiles.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {manufacturers
            .sort((a, b) => b.reports - a.reports)
            .slice(0, 6)
            .map((manufacturer, index) => {
              const marketShare = (manufacturer.reports / totalReports * 100).toFixed(1)
              return (
                <div
                  key={manufacturer.name}
                  className="bg-white p-4 rounded-xl border border-gray-200"
                >
                  <div className="font-medium text-gray-900 mb-1">
                    {index + 1}. {formatManufacturer(manufacturer.name)}
                  </div>
                  <div className="text-sm space-y-1">
                    <div>
                      <span className="font-semibold text-primary">{formatNumber(manufacturer.reports)}</span>
                      <span className="text-gray-500"> reports ({marketShare}%)</span>
                    </div>
                    {manufacturer.died > 0 && (
                      <div className="text-xs text-danger">
                        {formatNumber(manufacturer.died)} deaths
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
        </div>
      </div>

      {/* Context Boxes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            Understanding Manufacturer Data
          </h3>
          <div className="text-blue-800 space-y-2 text-sm">
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>
                <strong>Market presence:</strong> More reports often mean more vaccines distributed, 
                not necessarily more problems
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>
                <strong>Time in market:</strong> Companies producing vaccines longer may have 
                accumulated more reports over time
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span>
                <strong>Vaccine types:</strong> Different vaccine types (live vs. inactivated) 
                may have different reporting patterns
              </span>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-amber-900 mb-3">
            Market Share vs. Safety
          </h3>
          <div className="text-amber-800 space-y-2 text-sm">
            <div className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>
                <strong>COVID-19 impact:</strong> COVID vaccine manufacturers dominate recent 
                reports due to mass vaccination campaigns
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>
                <strong>Denominator matters:</strong> Safety should be evaluated per dose 
                administered, not total reports
              </span>
            </div>
            <div className="flex items-start">
              <span className="text-amber-500 mr-2">•</span>
              <span>
                <strong>Regulatory oversight:</strong> All manufacturers must meet the same 
                FDA safety and efficacy standards
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}