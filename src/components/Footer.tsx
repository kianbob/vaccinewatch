import Link from 'next/link'

const sisterSites = [
  { name: 'OpenMedicaid', url: 'https://openmedicaid.org', description: 'Medicaid spending transparency' },
  { name: 'OpenFeds', url: 'https://openfeds.org', description: 'Federal employee data' },
  { name: 'OpenSpending', url: 'https://openspending.us', description: 'Government spending tracker' },
  { name: 'OpenMedicare', url: 'https://openmedicare.us', description: 'Medicare data analysis' },
  { name: 'OpenLobby', url: 'https://openlobby.us', description: 'Lobbying transparency' },
  { name: 'TheDataProject.ai', url: 'https://thedataproject.ai', description: 'Data-driven transparency tools' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-bold text-lg mb-1">Stay Informed</h3>
              <p className="text-gray-400 text-sm">Get notified when we publish new analysis or data updates.</p>
            </div>
            <div className="flex w-full md:w-auto gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-72 px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                disabled
              />
              <button
                className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium opacity-50 cursor-not-allowed"
                disabled
                title="Coming soon"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* About */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white font-semibold mb-4">VaccineWatch</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Transparent access to VAERS data for informed decision-making.
              We present the data as-is, with appropriate context and disclaimers.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/thedataproject0"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors"
                title="Follow on X"
              >
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <Link
                href="/feed.xml"
                className="w-8 h-8 bg-gray-800 rounded-xl flex items-center justify-center hover:bg-gray-700 transition-colors"
                title="RSS Feed"
              >
                <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3zM4 9a1 1 0 011-1 8 8 0 018 8 1 1 0 11-2 0 6 6 0 00-6-6 1 1 0 01-1-1zM3.5 15a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Explore Data */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explore Data</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vaccines" className="hover:text-white transition-colors">Vaccines</Link></li>
              <li><Link href="/symptoms" className="hover:text-white transition-colors">Symptoms</Link></li>
              <li><Link href="/manufacturers" className="hover:text-white transition-colors">Manufacturers</Link></li>
              <li><Link href="/states" className="hover:text-white transition-colors">States</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">Compare Tool</Link></li>
              <li><Link href="/search" className="hover:text-white transition-colors">Search</Link></li>
            </ul>
          </div>

          {/* Analysis */}
          <div>
            <h3 className="text-white font-semibold mb-4">Deep Dives</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/analysis/denominator-problem" className="hover:text-white transition-colors">The Denominator Problem</Link></li>
              <li><Link href="/analysis/onset-timing" className="hover:text-white transition-colors">Onset Timing</Link></li>
              <li><Link href="/analysis/lot-analysis" className="hover:text-white transition-colors">Lot Number Analysis</Link></li>
              <li><Link href="/analysis/covid-impact" className="hover:text-white transition-colors">COVID Impact</Link></li>
              <li><Link href="/analysis/myocarditis" className="hover:text-white transition-colors">Myocarditis</Link></li>
              <li><Link href="/analysis/death-reports" className="hover:text-white transition-colors">Death Reports</Link></li>
              <li><Link href="/tools" className="hover:text-white transition-colors">Interactive Tools</Link></li>
              <li><Link href="/analysis" className="hover:text-white transition-colors">All 23 Articles →</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
              <li><Link href="/about#methodology" className="hover:text-white transition-colors">Methodology</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link href="/glossary" className="hover:text-white transition-colors">Glossary</Link></li>
              <li><Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link></li>
              <li><a href="https://vaers.hhs.gov" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">VAERS Official Site ↗</a></li>
            </ul>
          </div>

          {/* Sister Sites */}
          <div>
            <h3 className="text-white font-semibold mb-4">Sister Sites</h3>
            <ul className="space-y-2 text-sm">
              {sisterSites.map((site) => (
                <li key={site.name}>
                  <a
                    href={site.url}
                    className="hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {site.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
            {/* Data Attribution */}
            <div className="text-sm text-gray-400">
              <p>
                Data source:{' '}
                <a
                  href="https://vaers.hhs.gov"
                  className="text-accent hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VAERS (Vaccine Adverse Event Reporting System)
                </a>
              </p>
              <p className="mt-1">Data through 2026 · Updated quarterly</p>
            </div>

            <div className="text-sm text-gray-500">
              Built by{' '}
              <a href="https://thedataproject.ai" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white">TheDataProject.ai</a>
              {' '}· © {new Date().getFullYear()} VaccineWatch
            </div>
          </div>

          {/* Important Disclaimer */}
          <div className="mt-6 p-4 bg-gray-800 rounded-xl">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Important:</strong> VAERS accepts reports of adverse events following vaccination.
              For any given report, there is no certainty that the reported event was caused by the vaccine.
              Reports may contain information that is incomplete, inaccurate, coincidental, or unverifiable.
              Most reports to VAERS are voluntary, which means they are subject to biases.
              This data cannot be used to determine if vaccines cause or contribute to adverse events.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
