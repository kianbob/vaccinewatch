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
    color: 'success',
    readTime: 5,
  },
  {
    slug: 'compare',
    title: 'Vaccine Comparison',
    subtitle: 'Side-by-side vaccine analysis',
    description: 'Compare adverse event patterns between different vaccine types with detailed statistics.',
    icon: '⚖️',
    color: 'primary',
    readTime: 4,
  },
  {
    slug: 'search',
    title: 'VAERS Search',
    subtitle: 'Search vaccines, symptoms, and data',
    description: 'Comprehensive search tool for exploring VAERS data by vaccine type, symptom, or keyword.',
    icon: '🔎',
    color: 'accent',
    readTime: 3,
  },
]

const colorClasses: Record<string, string> = {
  primary: 'border-l-primary bg-primary/5',
  accent: 'border-l-accent bg-accent/5',
  danger: 'border-l-danger bg-danger/5',
  success: 'border-l-success bg-success/5',
}

const badgeClasses: Record<string, string> = {
  primary: 'bg-primary/10 text-primary',
  accent: 'bg-accent/10 text-accent',
  danger: 'bg-danger/10 text-danger',
  success: 'bg-success/10 text-success',
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
        <p className="text-xl text-gray-600 max-w-3xl">
          Interactive tools for exploring VAERS data with proper context and interpretation. 
          Each tool includes important disclaimers and guidance for understanding limitations.
        </p>
      </div>

      <div className="space-y-6">
        {tools.map((tool) => (
          <Link
            key={tool.slug}
            href={`/tools/${tool.slug}`}
            className={`block border-l-4 rounded-lg p-6 hover:shadow-md transition-shadow ${colorClasses[tool.color]}`}
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

      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-6">
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
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Analysis Articles</div>
            <div className="text-sm text-gray-500">In-depth analysis and context</div>
          </Link>
          <Link href="/about" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">About VAERS</div>
            <div className="text-sm text-gray-500">Understanding the data source</div>
          </Link>
        </div>
      </div>
    </div>
  )
}