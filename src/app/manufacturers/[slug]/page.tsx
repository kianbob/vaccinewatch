import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readdirSync } from 'fs'
import { join } from 'path'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify, formatManufacturer, getVaccineDisplayName } from '@/lib/utils'
import StatCard from '@/components/StatCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'

interface ManufacturerVaccine {
  type: string
  reports: number
  died: number
  hosp: number
}

interface ManufacturerInfo {
  name: string
  reports: number
  died: number
  hosp: number
  vaccines: Array<{ type: string; count: number }>
}

export const dynamicParams = true
export async function generateStaticParams() {
  const dir = join(process.cwd(), 'public', 'data', 'manufacturer-vaccines')
  const files = readdirSync(dir).filter(f => f.endsWith('.json'))
  return files.map(f => ({ slug: f.replace('.json', '') }))
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const manufacturers: ManufacturerInfo[] = readJsonFile('manufacturer-index.json')
  const mfr = manufacturers.find(m => slugify(m.name) === slug)

  if (!mfr) {
    notFound()
  }

  return {
    title: `${formatManufacturer(mfr.name)} Vaccine Safety Reports`,
    description: `${formatNumber(mfr.reports)} VAERS adverse event reports for vaccines by ${formatManufacturer(mfr.name)}. View associated vaccines, death reports (${formatNumber(mfr.died)}), and hospitalization data.`
  }
}

export default async function ManufacturerDetailPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const manufacturers: ManufacturerInfo[] = readJsonFile('manufacturer-index.json')
  const mfr = manufacturers.find(m => slugify(m.name) === slug)

  if (!mfr) {
    notFound()
  }

  let vaccines: ManufacturerVaccine[] = []
  try {
    vaccines = readJsonFile(`manufacturer-vaccines/${slug}.json`)
  } catch {
    // no detail file
  }

  vaccines.sort((a, b) => b.reports - a.reports)

  const totalReports = manufacturers.reduce((sum, m) => sum + m.reports, 0)
  const marketShare = totalReports > 0 ? (mfr.reports / totalReports * 100).toFixed(1) : '0.0'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />

      <Breadcrumbs items={[{ label: 'Manufacturers', href: '/manufacturers' }, { label: formatManufacturer(mfr.name) }]} />

      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-2 ${playfairDisplay.className}`}>
          {formatManufacturer(mfr.name)}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-lg text-gray-600">
          <span>{formatNumber(mfr.reports)} total reports</span>
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {marketShare}% market share
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard title="Total Reports" value={mfr.reports} color="primary" />
        <StatCard title="Deaths" value={mfr.died} color="danger" />
        <StatCard title="Hospitalizations" value={mfr.hosp} color="accent" />
        <StatCard title="Vaccines" value={vaccines.length || mfr.vaccines.length} color="gray" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About {formatManufacturer(mfr.name)}
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                <strong>{formatManufacturer(mfr.name)}</strong> has <strong>{formatNumber(mfr.reports)}</strong> adverse event reports in VAERS, representing <strong>{marketShare}%</strong> of all manufacturer-attributed reports.
              </p>
              <p>
                Of these reports, <strong className="text-danger">{formatNumber(mfr.died)}</strong> mentioned death and <strong className="text-accent">{formatNumber(mfr.hosp)}</strong> involved hospitalization.
              </p>
              <p>
                {formatManufacturer(mfr.name)} produces <strong>{vaccines.length || mfr.vaccines.length}</strong> vaccine{(vaccines.length || mfr.vaccines.length) !== 1 ? 's' : ''} tracked in VAERS.
                {parseFloat(marketShare) > 10 
                  ? ` As one of the largest vaccine manufacturers by report volume, their high report count primarily reflects extensive market distribution rather than safety concerns.`
                  : parseFloat(marketShare) > 1
                    ? ` Their moderate report volume reflects their market presence in specific vaccine categories.`
                    : ` Their relatively low report count reflects a smaller market presence or specialized vaccine portfolio.`
                }
              </p>
            </div>
          </div>

          {vaccines.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Vaccines by {formatManufacturer(mfr.name)}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Vaccine</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reports</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deaths</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hospitalizations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vaccines.map(v => (
                      <tr key={v.type} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">
                          <Link href={`/vaccines/${v.type.toLowerCase()}`} className="text-primary hover:text-primary/80 font-medium">
                            {getVaccineDisplayName(v.type)}
                          </Link>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900">{formatNumber(v.reports)}</td>
                        <td className="px-4 py-3 text-sm text-danger font-medium">{formatNumber(v.died)}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{formatNumber(v.hosp)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Understanding Manufacturer Data
            </h3>
            <div className="text-blue-800 space-y-3 text-sm">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Market presence matters:</strong> More reports often reflect more doses distributed, not necessarily more safety issues.</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Reporting varies:</strong> Newer vaccines and those under heightened scrutiny tend to have higher reporting rates.</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>All manufacturers meet FDA standards:</strong> Safety and efficacy requirements apply equally to all approved vaccines.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {mfr.vaccines.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Vaccines</h3>
              <div className="space-y-3">
                {mfr.vaccines
                  .sort((a, b) => b.count - a.count)
                  .slice(0, 10)
                  .map((v, i) => (
                    <div key={v.type} className="flex items-center justify-between">
                      <Link href={`/vaccines/${v.type.toLowerCase()}`} className="text-sm text-primary hover:text-primary/80 font-medium truncate mr-2">
                        {i + 1}. {getVaccineDisplayName(v.type)}
                      </Link>
                      <span className="text-sm text-gray-500 flex-shrink-0">{formatNumber(v.count)}</span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Explore Further</h3>
            <div className="space-y-3">
              {vaccines.length > 0 && (
                <Link href={`/vaccines/${vaccines[0].type.toLowerCase()}`} className="block w-full text-center bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                  Top Vaccine: {vaccines[0].type}
                </Link>
              )}
              <Link href="/manufacturers" className="block w-full text-center bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                All Manufacturers
              </Link>
              <Link href="/analysis/manufacturer-landscape" className="block w-full text-center bg-white border border-gray-200 rounded-xl py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                Manufacturer Landscape
              </Link>
              <Link href="/compare" className="block w-full text-center bg-primary text-white rounded-xl py-3 px-4 text-sm font-medium hover:bg-primary/90 transition-colors">
                Compare Vaccines
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600">
            <h4 className="font-semibold text-gray-900 mb-2">Data Source</h4>
            <p>
              This data comes from the{' '}
              <a href="https://vaers.hhs.gov" className="text-primary hover:text-primary/80" target="_blank" rel="noopener noreferrer">
                Vaccine Adverse Event Reporting System (VAERS)
              </a>, jointly managed by CDC and FDA.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
