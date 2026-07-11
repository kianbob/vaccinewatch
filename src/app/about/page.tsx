import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'About VaccineWatch — Transparent VAERS Vaccine Safety Data (2026)',
  description: 'How VaccineWatch makes 1.98M VAERS vaccine adverse event reports across 104 vaccines accessible and contextualized. Our mission, data sources, and neutral stance.',
  openGraph: {
    title: 'About VaccineWatch — Transparent VAERS Vaccine Safety Data',
    description: 'Our mission, data sources, and methodology for making 1.98M VAERS vaccine adverse event reports accessible and understandable. Pro-transparency, not pro- or anti-vaccine.',
  },
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
      <Breadcrumbs items={[{ label: 'About' }]} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        mainEntity: {
          '@type': 'Organization',
          name: 'VaccineWatch',
          url: 'https://www.vaccinewatch.org',
          description: 'Transparent access to VAERS vaccine adverse event data for informed decision-making.',
          parentOrganization: {
            '@type': 'Organization',
            name: 'TheDataProject.ai',
            url: 'https://thedataproject.ai',
          },
        },
      }) }} />

      {/* Header */}
      <div className="mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          About VaccineWatch
        </h1>
        <p className="text-xl text-gray-600">
          Transparent access to VAERS data for informed decision-making.
          Neither pro-vaccine nor anti-vaccine — pro-transparency.
        </p>
      </div>

      {/* Mission */}
      <section className="mb-12 bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8">
        <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          VaccineWatch exists to make publicly available vaccine safety data <strong>accessible</strong>,{' '}
          <strong>understandable</strong>, and <strong>contextualized</strong>. We believe that data transparency
          is essential for public trust, and that raw numbers need proper framing to be informative rather
          than misleading.
        </p>
      </section>

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

      {/* Why VaccineWatch Exists */}
      <section className="prose prose-lg max-w-none mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 ${playfairDisplay.className}`}>Why VaccineWatch Exists</h2>
        <p>
          The raw VAERS data is public, but it is not easy to use. The official files are large CSV downloads that
          require technical skill to open, join, and interpret, and the government query tool (VAERS WONDER) is
          powerful but unintuitive for most people. As a result, VAERS numbers are frequently pulled out of context
          and shared without the caveats that make them meaningful. VaccineWatch was built to close that gap: to make
          this important public health dataset <strong>searchable, visual, and honestly contextualized</strong> for
          journalists, researchers, patients, and anyone trying to understand vaccine adverse event data.
        </p>
        <p>
          We believe transparency and context are not in tension. Hiding data breeds distrust, but presenting raw
          numbers without explanation breeds misinformation. Our answer is to show <em>all</em> of the data while
          consistently explaining what it can and cannot tell you. Every page carries the reminder that a report is
          not proof of causation, and our <Link href="/methodology">methodology</Link> is documented openly so anyone
          can verify how our figures are produced.
        </p>

        <h2 className={`text-2xl font-bold text-gray-900 ${playfairDisplay.className}`}>Our Editorial Stance</h2>
        <p>
          VaccineWatch is <strong>neither pro-vaccine nor anti-vaccine — we are pro-transparency</strong>. We do not
          make vaccination recommendations, and we do not use the data to argue for or against any vaccine. We report
          the numbers as the CDC and FDA publish them, and we add only the interpretive context that public health
          agencies and epidemiologists themselves attach to VAERS: that it is a passive, over-inclusive early warning
          system, and that <strong>a report describes a temporal association, not a proven cause</strong>. When we
          discuss known safety findings — such as myocarditis after mRNA vaccines or the rare clotting signal after the
          J&amp;J vaccine — we describe them the way the underlying science does, including how common or rare they are.
        </p>
        <p>
          For decisions about your own health or your family&apos;s, this site is a starting point for understanding
          the data, not a substitute for professional medical advice. Always consult a qualified healthcare provider
          who knows your history. You can read more in our{' '}
          <Link href="/faq">frequently asked questions</Link>, our{' '}
          <Link href="/glossary">glossary of terms</Link>, and our full{' '}
          <Link href="/disclaimer">disclaimer</Link>.
        </p>

        <h2 className={`text-2xl font-bold text-gray-900 ${playfairDisplay.className}`}>Where Our Data Comes From</h2>
        <p>
          Every figure on VaccineWatch traces back to the official VAERS public-use datasets published by the CDC and
          FDA. We combine the three linked files VAERS releases — the report-level data, the vaccine data, and the
          MedDRA-coded symptom data — joined on each report&apos;s unique VAERS ID. We do not add outside data, we do
          not remove reports, and we do not reweight the figures. The result is a faithful aggregation of the public
          record. You can explore it yourself through our{' '}
          <Link href="/vaers-database">VAERS database</Link> and{' '}
          <Link href="/side-effects">side effects guides</Link>, or read exactly how the numbers are computed on our{' '}
          <Link href="/methodology">methodology page</Link>.
        </p>
      </section>

      {/* Data Coverage Stats */}
      <section className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>What We Cover</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-primary mb-1">1.98M+</div>
            <div className="text-sm text-gray-600">Total Reports</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-primary mb-1">104</div>
            <div className="text-sm text-gray-600">Vaccines</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-primary mb-1">500</div>
            <div className="text-sm text-gray-600">Symptoms Tracked</div>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-5 text-center">
            <div className="text-3xl font-bold text-primary mb-1">35</div>
            <div className="text-sm text-gray-600">Years of Data</div>
          </div>
        </div>
      </section>

      {/* How to Use This Site */}
      <section className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>How to Use This Site</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">🧬 Explore Vaccines</h3>
            <p className="text-gray-600 text-sm">
              Browse all 104 vaccine types in VAERS. See reports, outcomes, yearly trends, and associated symptoms
              for each vaccine.
            </p>
            <Link href="/vaccines" className="text-primary font-medium text-sm mt-3 inline-block hover:underline">
              Browse Vaccines →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">🩺 Research Symptoms</h3>
            <p className="text-gray-600 text-sm">
              Search through 500 reported symptoms. See which vaccines are most associated with each symptom
              and severity statistics.
            </p>
            <Link href="/symptoms" className="text-primary font-medium text-sm mt-3 inline-block hover:underline">
              Browse Symptoms →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">⚖️ Compare Vaccines</h3>
            <p className="text-gray-600 text-sm">
              Compare 2-3 vaccines side by side. See how their report counts, outcomes, and yearly trends differ.
            </p>
            <Link href="/compare" className="text-primary font-medium text-sm mt-3 inline-block hover:underline">
              Compare Tool →
            </Link>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
            <h3 className="font-semibold text-gray-900 mb-2">📊 Read Analysis</h3>
            <p className="text-gray-600 text-sm">
              23 in-depth articles provide context-rich exploration of VAERS data, including COVID impact,
              age patterns, myocarditis, and more.
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

        <h3 className={`${playfairDisplay.className}`}>Update Frequency</h3>
        <p>
          The VAERS database is updated approximately quarterly by the CDC/FDA. We process new data releases
          as they become available. The current dataset was last updated on <strong>February 25, 2026</strong>.
        </p>

        <h3 className={`${playfairDisplay.className}`}>Data Processing Pipeline</h3>
        <ol>
          <li><strong>Download</strong> — Raw CSV files from the VAERS website (VAERSDATA, VAERSVAX, VAERSSYMPTOMS)</li>
          <li><strong>Parse</strong> — Extract and normalize fields, handle encoding issues and inconsistencies</li>
          <li><strong>Aggregate</strong> — Group by vaccine type, symptom, manufacturer, state, age, gender, year</li>
          <li><strong>Cross-reference</strong> — Link vaccine-symptom pairs, create relationship maps</li>
          <li><strong>Publish</strong> — Generate static JSON files for fast, serverless delivery</li>
        </ol>
      </section>

      {/* Limitations — CRITICAL */}
      <section className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Limitations of VAERS Data
        </h2>
        <div className="bg-amber-50 border border-amber-300 rounded-xl p-6 mb-6">
          <p className="text-amber-900 font-semibold mb-3">
            Understanding these limitations is essential for interpreting VAERS data correctly.
          </p>
          <p className="text-amber-800 text-sm">
            Misinterpretation of VAERS data is common and can lead to unfounded conclusions.
            Please read these limitations carefully before drawing any conclusions from the data on this site.
          </p>
        </div>

        <div className="space-y-4">
          {[
            { title: 'Reports Do Not Prove Causation', text: 'A VAERS report indicates that an adverse event occurred after vaccination. It does not mean the vaccine caused the event. The event could be coincidental, related to an underlying condition, or caused by something else entirely.' },
            { title: 'Underreporting and Overreporting', text: 'VAERS is a passive reporting system. Not all adverse events are reported (underreporting), and some events may be reported that are unrelated to vaccination. During periods of heightened awareness (like the COVID-19 pandemic), reporting rates may increase significantly (stimulated reporting).' },
            { title: 'Unverified Information', text: 'VAERS reports may contain information that is incomplete, inaccurate, coincidental, or unverifiable. Reports are not verified for accuracy before being accepted into the database.' },
            { title: 'No Denominator Data', text: 'VAERS does not include data on how many people received each vaccine. Without this denominator, you cannot calculate a rate or risk. A vaccine with 10,000 reports and 100 million doses is very different from one with 10,000 reports and 1 million doses.' },
            { title: 'Anyone Can Report', text: 'Reports can be filed by anyone — doctors, patients, family members, lawyers, or anyone else. The quality and accuracy of reports varies widely. Some reports may be submitted to support legal claims or advocacy positions.' },
            { title: 'Duplicate Reports', text: 'The same event may be reported multiple times by different reporters (e.g., a doctor and a family member both report the same event). VAERS attempts to identify duplicates but some may remain in the data.' },
          ].map((item) => (
            <div key={item.title} className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Other Safety Monitoring Systems */}
      <section className="mb-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h2 className={`text-2xl font-bold text-blue-900 mb-4 ${playfairDisplay.className}`}>
          VAERS in Context: Other Safety Systems
        </h2>
        <p className="text-blue-800 text-sm mb-4">
          VAERS is just one of several systems used to monitor vaccine safety. Others include:
        </p>
        <ul className="text-blue-800 text-sm space-y-2">
          <li>• <strong>Vaccine Safety Datalink (VSD)</strong> — Active surveillance using electronic health records from 9 healthcare organizations</li>
          <li>• <strong>Clinical Immunization Safety Assessment (CISA)</strong> — Expert evaluation of complex adverse events</li>
          <li>• <strong>v-safe</strong> — Smartphone-based active monitoring (used for COVID-19 vaccines)</li>
          <li>• <strong>Post-licensure studies</strong> — Formal epidemiological studies to investigate safety signals</li>
        </ul>
        <p className="text-blue-700 text-sm mt-4">
          VAERS excels at detecting potential signals quickly but lacks the rigor to confirm causation.
          That&apos;s by design — it&apos;s an early warning system, not a definitive study.
        </p>
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
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-primary mb-1">{site.name}</h3>
              <p className="text-gray-500 text-sm">{site.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* Press & Media Contact */}
      <section className="bg-white border border-gray-200 rounded-xl p-8 mb-8">
        <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Press & Media Inquiries
        </h2>
        <p className="text-gray-600 mb-4">
          Journalists, researchers, and organizations are welcome to cite VaccineWatch data with attribution.
          For press inquiries, data questions, or partnership opportunities:
        </p>
        <a href="mailto:info@thedataproject.ai" className="inline-flex items-center gap-2 text-primary font-semibold hover:text-primary/80">
          📧 info@thedataproject.ai
        </a>
      </section>

      {/* Final Note */}
      <section className="bg-gray-50 rounded-xl p-8 text-center">
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
