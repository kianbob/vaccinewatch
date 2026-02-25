import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'About VaccineWatch',
  description: 'Learn about VaccineWatch, our methodology, data sources, and the limitations of VAERS data.'
}

const sisterSites = [
  { name: 'OpenMedicaid', url: 'https://www.openmedicaid.org', description: 'Medicaid spending transparency' },
  { name: 'OpenFeds', url: 'https://www.openfeds.org', description: 'Federal employee data' },
  { name: 'OpenSpending', url: 'https://www.openspending.us', description: 'Government spending tracker' },
  { name: 'OpenMedicare', url: 'https://www.openmedicare.us', description: 'Medicare data analysis' },
  { name: 'OpenLobby', url: 'https://www.openlobby.us', description: 'Lobbying transparency' },
  { name: 'TheDataProject.ai', url: 'https://thedataproject.ai', description: 'Data-driven transparency tools' },
]

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          About VaccineWatch
        </h1>
        <p className="text-xl text-gray-600">
          Transparent access to VAERS data for informed decision-making.
        </p>
      </div>

      {/* What is VAERS */}
      <section className="prose prose-lg max-w-none mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 ${playfairDisplay.className}`}>What is VAERS?</h2>
        <p>
          The <strong>Vaccine Adverse Event Reporting System (VAERS)</strong> is a national early warning system to detect
          possible safety problems in U.S.-licensed vaccines. VAERS is co-managed by the{' '}
          <strong>Centers for Disease Control and Prevention (CDC)</strong> and the{' '}
          <strong>U.S. Food and Drug Administration (FDA)</strong>.
        </p>
        <p>
          Established in 1990, VAERS collects reports of adverse events (possible side effects) that occur after vaccination.
          Anyone can report an adverse event to VAERS — healthcare professionals, vaccine manufacturers, and the public.
          Healthcare providers are required by law to report certain adverse events following vaccination.
        </p>
        <p>
          VAERS serves as one of several systems used to monitor vaccine safety. It is designed to detect possible signals
          that may indicate a potential safety concern, which can then be studied further through more rigorous methods.
        </p>
      </section>

      {/* How to Use This Site */}
      <section className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>How to Use This Site</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Explore Vaccines</h3>
            <p className="text-gray-600 text-sm">
              Browse all 104 vaccine types in VAERS. See reports, outcomes, yearly trends, and associated symptoms
              for each vaccine.
            </p>
            <Link href="/vaccines" className="text-primary font-medium text-sm mt-3 inline-block hover:underline">
              Browse Vaccines →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Research Symptoms</h3>
            <p className="text-gray-600 text-sm">
              Search through 500 reported symptoms. See which vaccines are most associated with each symptom
              and severity statistics.
            </p>
            <Link href="/symptoms" className="text-primary font-medium text-sm mt-3 inline-block hover:underline">
              Browse Symptoms →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Compare Vaccines</h3>
            <p className="text-gray-600 text-sm">
              Compare 2-3 vaccines side by side. See how their report counts, outcomes, and yearly trends differ.
            </p>
            <Link href="/compare" className="text-primary font-medium text-sm mt-3 inline-block hover:underline">
              Compare Tool →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="font-semibold text-gray-900 mb-2">Read Analysis</h3>
            <p className="text-gray-600 text-sm">
              Our in-depth analysis articles provide context-rich exploration of VAERS data, including COVID impact,
              age patterns, and more.
            </p>
            <Link href="/analysis" className="text-primary font-medium text-sm mt-3 inline-block hover:underline">
              Read Analysis →
            </Link>
          </div>
        </div>
      </section>

      {/* Data Methodology */}
      <section className="prose prose-lg max-w-none mb-12">
        <h2 id="methodology" className={`text-2xl font-bold text-gray-900 ${playfairDisplay.className}`}>Data Methodology</h2>
        <p>
          VaccineWatch processes raw VAERS data files published by the CDC/FDA. Our methodology includes:
        </p>
        <ul>
          <li><strong>Data source:</strong> Official VAERS CSV data files from <a href="https://vaers.hhs.gov/data/datasets.html" target="_blank" rel="noopener noreferrer">vaers.hhs.gov</a></li>
          <li><strong>Time range:</strong> 1990 through February 2026 (the most recent available data)</li>
          <li><strong>Processing:</strong> We aggregate raw reports by vaccine type, symptom, manufacturer, state, age group, and gender</li>
          <li><strong>Categorization:</strong> Outcomes are categorized based on VAERS-defined fields: died, hospitalized, ER visit, disabled, life-threatening</li>
          <li><strong>No filtering:</strong> We include all reports as-is. We do not remove or filter any reports</li>
          <li><strong>No interpretation:</strong> We present aggregate counts without making causal claims</li>
        </ul>
        <p>
          Data is updated periodically as new VAERS data releases become available. The current dataset was
          last updated on February 25, 2026.
        </p>
      </section>

      {/* Limitations — CRITICAL */}
      <section className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Limitations of VAERS Data
        </h2>
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-6 mb-6">
          <p className="text-amber-900 font-semibold mb-3">
            Understanding these limitations is essential for interpreting VAERS data correctly.
          </p>
          <p className="text-amber-800 text-sm">
            Misinterpretation of VAERS data is common and can lead to unfounded conclusions.
            Please read these limitations carefully before drawing any conclusions from the data on this site.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Reports Do Not Prove Causation</h3>
            <p className="text-gray-600 text-sm">
              A VAERS report indicates that an adverse event occurred after vaccination. It does not mean the vaccine
              caused the event. The event could be coincidental, related to an underlying condition, or caused by
              something else entirely.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Underreporting and Overreporting</h3>
            <p className="text-gray-600 text-sm">
              VAERS is a passive reporting system. Not all adverse events are reported (underreporting), and
              some events may be reported that are unrelated to vaccination. During periods of heightened awareness
              (like the COVID-19 pandemic), reporting rates may increase significantly (stimulated reporting).
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Unverified Information</h3>
            <p className="text-gray-600 text-sm">
              VAERS reports may contain information that is incomplete, inaccurate, coincidental, or unverifiable.
              Reports are not verified for accuracy before being accepted into the database.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">No Denominator Data</h3>
            <p className="text-gray-600 text-sm">
              VAERS does not include data on how many people received each vaccine. Without this denominator,
              you cannot calculate a rate or risk. A vaccine with 10,000 reports and 100 million doses is very
              different from one with 10,000 reports and 1 million doses.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Anyone Can Report</h3>
            <p className="text-gray-600 text-sm">
              Reports can be filed by anyone — doctors, patients, family members, lawyers, or anyone else.
              The quality and accuracy of reports varies widely. Some reports may be submitted to support
              legal claims or advocacy positions.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="font-semibold text-gray-900 mb-2">Duplicate Reports</h3>
            <p className="text-gray-600 text-sm">
              The same event may be reported multiple times by different reporters (e.g., a doctor and
              a family member both report the same event). VAERS attempts to identify duplicates but
              some may remain in the data.
            </p>
          </div>
        </div>
      </section>

      {/* Sister Sites */}
      <section className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Built by TheDataProject.ai
        </h2>
        <p className="text-gray-600 mb-6">
          VaccineWatch is part of a portfolio of data-driven transparency tools built by TheDataProject.ai.
          Our mission is to make government data accessible, understandable, and useful for everyone.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {sisterSites.map(site => (
            <a
              key={site.name}
              href={site.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-primary mb-1">{site.name}</h3>
              <p className="text-gray-500 text-sm">{site.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Final Note */}
      <section className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-600">
          VaccineWatch is committed to presenting VAERS data transparently and responsibly.
          We are neither pro-vaccine nor anti-vaccine — we are pro-transparency.
        </p>
        <p className="text-gray-400 text-sm mt-4">
          For medical decisions, always consult with qualified healthcare professionals.
        </p>
      </section>
    </div>
  )
}
