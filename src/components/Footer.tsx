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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-4">VaccineWatch</h3>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Transparent access to VAERS data for informed decision-making.
              We present the data as-is, with appropriate context and disclaimers.
            </p>
            <a
              href="https://x.com/thedataproject0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              @thedataproject0
            </a>
          </div>

          {/* Quick Links */}
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
              <li><Link href="/analysis/covid-impact" className="hover:text-white transition-colors">COVID Impact</Link></li>
              <li><Link href="/analysis/age-patterns" className="hover:text-white transition-colors">Age Patterns</Link></li>
              <li><Link href="/analysis/myocarditis" className="hover:text-white transition-colors">Myocarditis</Link></li>
              <li><Link href="/analysis/death-reports" className="hover:text-white transition-colors">Death Reports</Link></li>
              <li><Link href="/analysis/serious-outcomes" className="hover:text-white transition-colors">Serious Outcomes</Link></li>
              <li><Link href="/analysis" className="hover:text-white transition-colors">All Analysis →</Link></li>
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
                  <div className="text-gray-500 text-xs">{site.description}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
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

            {/* Legal Links */}
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0 text-sm">
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
              <Link href="/about" className="hover:text-white transition-colors">Methodology</Link>
              <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
              <Link href="/feed.xml" className="hover:text-white transition-colors">RSS Feed</Link>
              <div className="text-gray-500">
                Built by{' '}
                <a href="https://thedataproject.ai" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-white">TheDataProject.ai</a>
                {' '}· © {new Date().getFullYear()} VaccineWatch
              </div>
            </div>
          </div>

          {/* Important Disclaimer */}
          <div className="mt-6 p-4 bg-gray-800 rounded-lg">
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
