import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'VAERS Analysis Tools — Interactive Vaccine Safety Data Explorer',
  description: 'Interactive tools for exploring VAERS data: onset calculators, lot lookups, dose comparisons, risk context, search, and comparison tools.'
}

const tools = [
  {
    slug: 'onset-calculator',
    title: 'Onset Calculator',
    subtitle: 'When do vaccine side effects start?',
    description: 'Explore onset timing patterns for different vaccines and see when adverse events typically occur.',
    icon: '📊',
    color: 'primary',
    readTime: 3,
  },
  {
    slug: 'lot-lookup',
    title: 'Lot Lookup',
    subtitle: 'Search vaccine lot numbers in VAERS',
    description: 'Look up specific COVID-19 vaccine lot numbers. Heavy disclaimers about interpreting raw counts.',
    icon: '🔍',
    color: 'danger',
    readTime: 2,
  },
  {
    slug: 'dose-comparison',
    title: 'Dose Comparison Tool',
    subtitle: 'First vs second vs booster analysis',
    description: 'Compare adverse event patterns across different vaccine doses with interactive charts.',
    icon: '📈',
    color: 'accent',
    readTime: 4,
  },
  {
    slug: 'risk-context',
    title: 'Risk Context Calculator',
    subtitle: 'Put VAERS numbers in perspective',
    description: 'Transform raw VAERS numbers into meaningful rates and compare to background risks.',
    icon: '⚖️',
    color: 'primary',
    readTime: 5,
  },
  {
    slug: 'age-explorer',
    title: 'Age Explorer',
    subtitle: 'Adverse events by age group',
    description: 'See how vaccine adverse event reports are distributed across age groups with interactive charts and gender breakdowns.',
    icon: '👶👴',
    color: 'accent',
    readTime: 3,
  },
  {
    slug: 'timeline',
    title: 'Reporting Timeline',
    subtitle: '35 years of VAERS data visualized',
    description: 'Interactive timeline of all VAERS reports from 1990-2026. Track trends, compare metrics, and zoom into any time period.',
    icon: '📅',
    color: 'primary',
    readTime: 4,
  },
  {
    slug: 'multi-vaccine',
    title: 'Multi-Vaccine Explorer',
    subtitle: 'Vaccines given together',
    description: 'Explore which vaccines are commonly co-administered and their combined adverse event profiles. 1,514 combinations analyzed.',
    icon: '🔗',
    color: 'accent',
    readTime: 3,
  },
  {
    slug: 'admin-routes',
    title: 'Administration & Routes',
    subtitle: 'Who gives vaccines and how',
    description: 'See where vaccines are administered (pharmacy, doctor, military, school) and how (injection, oral, nasal).',
    icon: '🏥',
    color: 'primary',
    readTime: 3,
  },
  {
    slug: 'dose-explorer',
    title: 'Dose Series Explorer',
    subtitle: '1st vs 2nd vs 3rd dose breakdown',
    description: 'Compare adverse event reports across dose numbers for any vaccine. See how patterns change from first dose through boosters.',
    icon: '💉',
    color: 'danger',
    readTime: 3,
  },
  {
    slug: 'severity-profile',
    title: 'Severity Profile',
    subtitle: 'Vaccine outcome breakdown vs average',
    description: 'See the complete severity profile for any vaccine — death rates, hospitalization rates, recovery outcomes — compared to the all-vaccine average.',
    icon: '📋',
    color: 'accent',
    readTime: 4,
  },
  {
    slug: 'birth-defects',
    title: 'Birth Defects Explorer',
    subtitle: 'Birth defect reports by vaccine',
    description: 'Explore birth defect reports in VAERS by vaccine type. Includes critical context about background rates and reporting limitations.',
    icon: '👶',
    color: 'danger',
    readTime: 3,
  },
  {
    slug: 'recovery-explorer',
    title: 'Recovery Explorer',
    subtitle: 'Do side effects go away?',
    description: 'Interactive explorer of recovery status across all vaccines. Compare recovery rates, understand what "not recovered" really means.',
    icon: '💚',
    color: 'primary',
    readTime: 4,
  },
  {
    slug: 'hospital-duration',
    title: 'Hospital Duration Explorer',
    subtitle: 'How long are vaccine hospitalizations?',
    description: 'Explore hospitalization duration data across all vaccines. Most stays are 1-3 days. Compare patterns by vaccine type.',
    icon: '🏥',
    color: 'accent',
    readTime: 3,
  },
  {
    slug: 'reporting-rates',
    title: 'Reporting Rate Calculator',
    subtitle: 'VAERS reports per dose administered',
    description: 'Calculate adverse event reporting rates per million doses using CDC dose denominator estimates. The missing context for raw VAERS numbers.',
    icon: '🧮',
    color: 'primary',
    readTime: 5,
  },
  {
    slug: 'signal-detection',
    title: 'Signal Detection Dashboard',
    subtitle: 'FDA-style safety signal analysis',
    description: 'Proportional Reporting Ratio (PRR) analysis across 1.98M VAERS reports. Find which adverse events are disproportionately reported for each vaccine.',
    icon: '🔬',
    color: 'danger',
    readTime: 6,
  },
]

const colorClasses: Record<string, string> = {
  primary: 'border-l-primary bg-primary/5',
  accent: 'border-l-accent bg-accent/5',
  danger: 'border-l-danger bg-danger/5',
}

const badgeClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  danger: 'bg-danger/10 text-danger',
}

export default function ToolsIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Tools' }]} />
      
      <div className="mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Analysis Tools
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mb-6">
          Interactive tools for exploring VAERS data with proper context and interpretation. 
          Each tool includes important disclaimers and guidance for understanding limitations.
        </p>
        <div className="bg-gray-50 rounded-xl p-6 text-sm text-gray-600 max-w-3xl">
          <strong className="text-gray-900">How to use these tools:</strong> Each tool below lets you 
          interactively explore a specific aspect of VAERS data. All tools include built-in disclaimers 
          and context to help you interpret results correctly. They&apos;re designed for education and 
          transparency — not for making medical decisions.
        </div>
      </div>

      <div className="space-y-6">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className={`block border-l-4 rounded-xl p-6 hover:shadow-md transition-all hover:translate-x-1 ${colorClasses[tool.color]}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-2xl">{tool.icon}</span>
                  <h2 className={`text-xl font-bold text-gray-900 ${playfairDisplay.className}`}>
                    {tool.title}
                  </h2>
                </div>
                <p className="text-gray-600 mb-3">{tool.subtitle}</p>
                <p className="text-sm text-gray-700">{tool.description}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full ml-4 whitespace-nowrap ${badgeClasses[tool.color]}`}>
                {tool.readTime} min
              </span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-3">Using These Tools Responsibly</h3>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>All tools include important disclaimers about VAERS limitations</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>Raw numbers require context (denominators, background rates, etc.)</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>VAERS data shows correlation, not causation</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>These tools are for education and transparency, not medical advice</span>
          </li>
        </ul>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/compare" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <span>⚖️</span>
              <div className="font-medium text-gray-900">Vaccine Comparison</div>
            </div>
            <div className="text-sm text-gray-500">Side-by-side vaccine analysis</div>
          </Link>
          <Link href="/search" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2">
              <span>🔎</span>
              <div className="font-medium text-gray-900">VAERS Search</div>
            </div>
            <div className="text-sm text-gray-500">Search vaccines, symptoms, and data</div>
          </Link>
          <Link href="/analysis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Analysis Articles</div>
            <div className="text-sm text-gray-500">In-depth analysis and context</div>
          </Link>
          <Link href="/about" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">About VAERS</div>
            <div className="text-sm text-gray-500">Understanding the data source</div>
          </Link>
        </div>
      </div>
      {/* SEO Content */}
      <div className="mt-8 prose max-w-none text-gray-500 text-sm">
        <p>
          VaccineWatch offers 15 free interactive tools for exploring VAERS vaccine adverse event data.
          Each tool provides a different lens on the 1.98 million reports in the database — from onset
          timing patterns and lot number analysis to recovery rates and dose-series comparisons.
          All tools work directly in your browser with no login required.
        </p>
      </div>
    </div>
  )
}