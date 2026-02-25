import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import { WhoReportsChartsClient as WhoReportsCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Who Files VAERS Reports? - Analysis of Reporting Sources',
  description: 'Analysis of who submits VAERS reports: private doctors, public health officials, military, pharmacies, and others. Understanding reporting mandates and patterns.'
}

export default function WhoReportsPage() {
  const adminData = readJsonFile('admin-context.json')

  // Extract administration context data
  const adminBy = adminData.adminBy || {}
  const vaxRoute = adminData.vaxRoute || {}

  // Calculate totals
  const totalByAdmin = Object.values(adminBy).reduce((sum: number, count: any) => sum + count, 0)
  const totalByRoute = Object.values(vaxRoute).reduce((sum: number, count: any) => sum + count, 0)

  // Sort administration contexts by count
  const sortedAdminBy = Object.entries(adminBy)
    .sort(([,a]: any, [,b]: any) => b - a)
    .map(([key, value]: any) => ({ type: key, count: value, percent: ((value / totalByAdmin) * 100).toFixed(1) }))

  // Sort routes by count
  const sortedRoutes = Object.entries(vaxRoute)
    .sort(([,a]: any, [,b]: any) => b - a)
    .map(([key, value]: any) => ({ route: key, count: value, percent: ((value / totalByRoute) * 100).toFixed(1) }))

  // Map admin codes to readable names
  const adminTypeNames: { [key: string]: string } = {
    'PVT': 'Private Practice',
    'PUB': 'Public Health',
    'MIL': 'Military',
    'WRK': 'Workplace',
    'PHM': 'Pharmacy',
    'SCH': 'School',
    'UNK': 'Unknown',
    'OTH': 'Other'
  }

  // Map route codes to readable names
  const routeNames: { [key: string]: string } = {
    'IM': 'Intramuscular',
    'SC': 'Subcutaneous',
    'IN': 'Intranasal',
    'PO': 'Oral',
    'ID': 'Intradermal',
    'UNK': 'Unknown',
    'OTH': 'Other'
  }

  // Get readable names for display
  const sortedAdminByNamed = sortedAdminBy.map(item => ({
    ...item,
    name: adminTypeNames[item.type] || item.type
  }))

  const sortedRoutesNamed = sortedRoutes.map(item => ({
    ...item,
    name: routeNames[item.route] || item.route
  }))

  const topAdminType = sortedAdminByNamed[0]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'Who Files VAERS Reports?' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="text-xs font-medium text-accent uppercase tracking-wider mb-2">6 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Who Files VAERS Reports?
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Understanding the sources of VAERS reports: healthcare providers, patients, pharmacies, 
          and public health officials. Who reports what, and how reporting mandates influence the data.
        </p>
        <div className="bg-accent/5 border border-accent/20 rounded-lg p-6">
          <div className="text-3xl font-bold text-accent mb-1">{topAdminType.name}</div>
          <div className="text-gray-700">leads with <strong>{topAdminType.percent}%</strong> of reports ({formatNumber(topAdminType.count)} reports)</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>The VAERS Reporting Ecosystem</h2>
        <p>
          VAERS accepts reports from multiple sources, each bringing different perspectives and motivations 
          to adverse event reporting. Understanding who files reports helps interpret patterns in the data 
          and identify potential biases in reporting behavior.
        </p>
        <p>
          The distribution of reports by administration context shows that {topAdminType.name.toLowerCase()} 
          settings account for the largest share at {topAdminType.percent}%, followed by other healthcare 
          and institutional contexts.
        </p>

        <h2 className={playfairDisplay.className}>Breaking Down the Reporting Sources</h2>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {sortedAdminByNamed.slice(0, 6).map((item, index) => (
            <div key={item.type} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="text-xl font-bold text-gray-900">{item.name}</div>
              <div className="text-sm text-gray-500 mb-2">{item.percent}% of reports</div>
              <div className="text-xs text-gray-600">{formatNumber(item.count)} reports</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <WhoReportsCharts 
          adminData={sortedAdminByNamed} 
          routeData={sortedRoutesNamed}
        />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Private Practice Dominance</h2>
        <p>
          Private healthcare practices lead VAERS reporting, which makes sense given that most vaccinations 
          in the United States occur in private medical settings. Private providers have several advantages 
          for reporting:
        </p>
        <ul>
          <li>Direct patient relationships that facilitate follow-up</li>
          <li>Established systems for documenting patient care</li>
          <li>Legal and professional obligations to report adverse events</li>
          <li>Familiarity with VAERS reporting procedures</li>
        </ul>

        <h2 className={playfairDisplay.className}>Public Health and Institutional Reporting</h2>
        <p>
          Public health departments and other institutional settings also contribute significantly to VAERS:
        </p>
        <ul>
          <li><strong>Public Health:</strong> Mass vaccination clinics, public health investigations, and surveillance activities</li>
          <li><strong>Military:</strong> Comprehensive healthcare system with systematic adverse event monitoring</li>
          <li><strong>Workplace:</strong> Occupational health programs, especially for healthcare workers</li>
          <li><strong>Pharmacies:</strong> Retail pharmacy vaccination programs with growing market share</li>
        </ul>

        <h2 className={playfairDisplay.className}>Route of Administration Patterns</h2>
        <p>
          The route of administration data provides additional context about vaccination patterns:
        </p>
        <ul>
          {sortedRoutesNamed.slice(0, 4).map(route => (
            <li key={route.route}>
              <strong>{route.name}:</strong> {route.percent}% ({formatNumber(route.count)} reports)
            </li>
          ))}
        </ul>
        <p>
          The predominance of intramuscular administration reflects standard vaccination practice for 
          most routine vaccines, while other routes represent specialized vaccines or specific populations.
        </p>

        <h2 className={playfairDisplay.className}>Reporting Mandates and Incentives</h2>
        <p>
          Different settings have varying reporting requirements and incentives:
        </p>
        <ul>
          <li><strong>Healthcare providers:</strong> Professional obligation to report serious adverse events</li>
          <li><strong>Vaccine manufacturers:</strong> Required to report all adverse events they become aware of</li>
          <li><strong>Public health departments:</strong> Surveillance mandate for population health monitoring</li>
          <li><strong>Patients and families:</strong> Voluntary reporting with no legal requirement</li>
        </ul>
        <p>
          These different mandates can create reporting patterns that reflect regulatory requirements as 
          much as actual adverse event occurrence.
        </p>

        <h2 className={playfairDisplay.className}>Quality and Detail Variations</h2>
        <p>
          Report quality often varies by source:
        </p>
        <ul>
          <li><strong>Healthcare provider reports:</strong> Usually include more medical detail and context</li>
          <li><strong>Patient reports:</strong> May lack medical terminology but provide valuable symptom descriptions</li>
          <li><strong>Institutional reports:</strong> Often have standardized reporting procedures and follow-up</li>
          <li><strong>Manufacturer reports:</strong> May be secondary reports based on information from others</li>
        </ul>

        <h2 className={playfairDisplay.className}>Geographic and Demographic Influences</h2>
        <p>
          Reporting patterns also reflect healthcare delivery patterns:
        </p>
        <ul>
          <li>Urban areas with more healthcare providers may generate more reports</li>
          <li>Regions with active public health departments may have higher reporting rates</li>
          <li>Areas with more retail pharmacy vaccinations may show different reporting patterns</li>
          <li>Military populations have more systematic reporting through dedicated healthcare systems</li>
        </ul>

        <h2 className={playfairDisplay.className}>Implications for Data Interpretation</h2>
        <p>
          Understanding who reports helps interpret VAERS data more accurately:
        </p>
        <ul>
          <li>Higher reporting from certain settings may reflect accessibility rather than safety issues</li>
          <li>Professional reporting requirements may create more complete data for some populations</li>
          <li>Voluntary reporting by patients may be influenced by awareness campaigns or media coverage</li>
          <li>Institutional variations may affect the types and severity of events reported</li>
        </ul>
      </div>

      {/* Key Takeaways */}
      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">1.</span>
            <span>Private practice settings account for {topAdminType.percent}% of VAERS reports</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">2.</span>
            <span>Multiple healthcare settings contribute to VAERS, each with different reporting patterns</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">3.</span>
            <span>Intramuscular injection is the predominant route of administration</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">4.</span>
            <span>Reporting mandates and incentives vary significantly across different settings</span>
          </li>
        </ul>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/reporting-bias" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Understanding VAERS Reporting Bias</div>
            <div className="text-sm text-gray-500">How reporting patterns affect data</div>
          </Link>
          <Link href="/analysis/geographic-patterns" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Geographic Patterns</div>
            <div className="text-sm text-gray-500">State-level reporting variations</div>
          </Link>
        </div>
      </div>
    </div>
  )
}