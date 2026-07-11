import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'
import { MultiVaccineChartsClient as MultiVaccineCharts } from '@/components/ClientCharts'
import ArticleSchema from '@/components/ArticleSchema'

export const metadata: Metadata = {
  title: 'Multiple Vaccines at Once — VAERS Co-Administration Safety Data 2026',
  description: '1,514 vaccine combinations tracked in VAERS. Safety patterns when multiple vaccines are given together and the most common co-administration combos.',
  openGraph: {
    title: 'Multiple Vaccines at Once — VAERS Co-Administration Safety Data 2026',
    description: '1,514 vaccine combinations tracked in VAERS. Safety patterns when multiple vaccines are given together and the most common co-administration combos.',
  },
}

export default function MultiVaccinePage() {
  const multiVaccineData = readJsonFile('multi-vaccine.json')

  // Sort by total reports and get top combinations
  const sortedCombinations = [...multiVaccineData].sort((a: any, b: any) => b.reports - a.reports)
  const top20Combinations = sortedCombinations.slice(0, 20)
  const totalCombinations = multiVaccineData.length

  // Calculate totals
  const totalReports = multiVaccineData.reduce((sum: number, combo: any) => sum + combo.reports, 0)
  const totalDeaths = multiVaccineData.reduce((sum: number, combo: any) => sum + combo.died, 0)
  const totalHosp = multiVaccineData.reduce((sum: number, combo: any) => sum + combo.hosp, 0)

  // Find pediatric combinations (common childhood vaccines)
  const pediatricKeywords = ['DTaP', 'IPV', 'PCV', 'HIB', 'MMR', 'VARICELLA', 'HEPATITIS A', 'HEPATITIS B', 'ROTAVIRUS', 'INFLUENZA']
  const pediatricCombos = multiVaccineData.filter((combo: any) => 
    combo.vaccines.some((vaccine: string) => 
      pediatricKeywords.some(keyword => vaccine.toUpperCase().includes(keyword))
    )
  ).sort((a: any, b: any) => b.reports - a.reports).slice(0, 10)

  // Find COVID combinations
  const covidCombos = multiVaccineData.filter((combo: any) =>
    combo.vaccines.some((vaccine: string) => vaccine.includes('COVID'))
  ).sort((a: any, b: any) => b.reports - a.reports).slice(0, 10)

  // Most common combination
  const topCombo = top20Combinations[0]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <ArticleSchema title="When Multiple Vaccines Are Given Together - VAERS Co-Administration Analysis" description="Analysis of VAERS reports when multiple vaccines are administered simultaneously. Understanding co-administration safety patterns and common vaccine combinations." slug="multi-vaccine" />
      <Breadcrumbs items={[{ label: 'Analysis', href: '/analysis' }, { label: 'When Multiple Vaccines Are Given Together' }]} />

      {/* Hero */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-2"><div className="text-xs font-medium text-accent uppercase tracking-wider">7 min read</div><ShareButtons title="When Multiple Vaccines Are Given Together - VAERS Co-Administration Analysis - VaccineWatch" /></div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          When Multiple Vaccines Are Given Together
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Analysis of {formatNumber(totalCombinations)} vaccine combinations in VAERS reports. 
          Understanding co-administration patterns, from pediatric schedules to COVID-19 combinations.
        </p>
        <div className="bg-accent/5 border border-accent/20 rounded-xl p-6">
          <div className="text-3xl font-bold text-accent mb-1">{formatNumber(totalCombinations)}</div>
          <div className="text-gray-700">different vaccine combinations reported in VAERS, accounting for {formatNumber(totalReports)} total reports</div>
        </div>
      </div>

      {/* Article Content */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why This Analysis Matters</h2>
        <p>
          Understanding co-administration patterns in VAERS is essential because a large share of
          adverse event reports involve more than one vaccine. When a report lists multiple vaccines,
          VAERS counts it under each — which means raw per-vaccine counts can overstate the true
          number of unique adverse events. This article provides the context needed to interpret
          multi-vaccine VAERS data accurately.
        </p>

        <h2 className={playfairDisplay.className}>Co-Administration is Standard Practice</h2>
        <p>
          Administering multiple vaccines during a single visit is routine medical practice, especially 
          for children following the CDC&apos;s recommended immunization schedule. The {formatNumber(totalCombinations)} 
          different vaccine combinations in VAERS reflect this standard approach to vaccination.
          Understanding these co-administration patterns is essential for correctly interpreting
          VAERS reports, since a single adverse event reported after multiple vaccines appears
          in the data for each vaccine listed.
        </p>
        <p>
          The World Health Organization, the American Academy of Pediatrics, and every major
          medical organization endorse co-administration of vaccines when recommended by the
          immunization schedule. This practice is supported by decades of clinical evidence.
        </p>
        <p>
          Co-administration offers several advantages: fewer clinic visits, better adherence to vaccination 
          schedules, reduced costs, and earlier protection. Extensive studies have shown that giving multiple 
          vaccines together is safe and effective. The alternative — spreading vaccines across many separate
          visits — is not recommended by any major medical organization and leaves children unprotected
          for longer periods during their most vulnerable years.
        </p>

        <h2 className={playfairDisplay.className}>Terminology: Co-Administration vs Combination Vaccines</h2>
        <p>
          It is important to distinguish between <strong>co-administration</strong> (giving separate
          vaccines at the same visit) and <strong>combination vaccines</strong> (single products
          containing multiple antigens, like MMR or Pediarix). This analysis focuses on
          co-administration — reports where two or more separate vaccine products were given together.
        </p>

        <h2 className={playfairDisplay.className}>The Most Common Combinations</h2>
        <p>
          The most frequently reported combination involves {topCombo.vaccines.join(' + ')}, with {formatNumber(topCombo.reports)} 
          VAERS reports. This high number likely reflects both the frequency of this combination and the 
          volume of reports during specific time periods.
        </p>
        <p>
          Many of the top combinations involve routine childhood vaccines or seasonal influenza vaccines 
          given alongside other routine immunizations.
        </p>
      </div>

      {/* Charts */}
      <div className="mb-12">
        <MultiVaccineCharts 
          top20Data={top20Combinations} 
          pediatricData={pediatricCombos}
          covidData={covidCombos}
        />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Pediatric Vaccination Combinations</h2>
        <p>
          Pediatric vaccine combinations represent a significant portion of co-administration reports. 
          The CDC&apos;s childhood immunization schedule often calls for multiple vaccines at single visits:
        </p>
        <ul>
          <li>2-month visit: DTaP, IPV, Hib, PCV13, and Rotavirus</li>
          <li>4-month visit: Same combination as 2 months</li>
          <li>12-15 month visit: MMR, Varicella, Hib, PCV13</li>
        </ul>
        <p>
          These combinations have been extensively studied and are designed to provide optimal protection 
          while minimizing the number of healthcare visits required.
        </p>

        <h2 className={playfairDisplay.className}>COVID-19 Vaccine Combinations</h2>
        <p>
          COVID-19 vaccines have been administered alongside other vaccines, particularly seasonal influenza 
          vaccines. Initially, CDC recommended spacing between COVID-19 vaccines and other vaccines, 
          but this guidance was updated to allow co-administration based on safety data.
        </p>
        {covidCombos.length > 0 && (
          <p>
            The most common COVID-19 combination reported involves {covidCombos[0].vaccines.join(' + ')}, 
            with {formatNumber(covidCombos[0].reports)} reports.
          </p>
        )}

        <h2 className={playfairDisplay.className}>Safety Considerations</h2>
        <p>
          When evaluating adverse events after multiple vaccines, determining attribution becomes more complex. 
          Key considerations include:
        </p>
        <ul>
          <li><strong>Expected reactions:</strong> Each vaccine can cause its own set of expected side effects</li>
          <li><strong>Immune system stimulation:</strong> Multiple vaccines may temporarily increase inflammatory responses</li>
          <li><strong>Injection site reactions:</strong> Multiple injection sites can mean multiple areas of local reactions</li>
          <li><strong>Temporal associations:</strong> Adverse events may be attributed to the combination when they might have occurred with any single vaccine</li>
        </ul>

        <h2 className={playfairDisplay.className}>Clinical Trial Evidence</h2>
        <p>
          Before vaccines are approved for co-administration, clinical trials specifically study combination safety:
        </p>
        <ul>
          <li>Immune response studies ensure vaccines don&apos;t interfere with each other</li>
          <li>Safety studies compare side effect rates for combinations vs. individual vaccines</li>
          <li>Long-term follow-up assesses for any delayed effects</li>
        </ul>
        <p>
          These studies consistently show that co-administration is as safe as giving vaccines separately, 
          with similar immune responses and side effect profiles.
        </p>

        <h2 className={playfairDisplay.className}>Common Concerns About Multiple Vaccines</h2>
        <p>
          Parents and patients sometimes express concern about receiving multiple vaccines at once.
          Common questions include:
        </p>
        <ul>
          <li><strong>&quot;Won&apos;t it overwhelm the immune system?&quot;</strong> No. The immune system
          encounters thousands of antigens daily from food, air, and skin contact. The antigens in
          all childhood vaccines combined represent a tiny fraction of what the immune system
          routinely handles.</li>
          <li><strong>&quot;Shouldn&apos;t we spread them out?&quot;</strong> Delaying vaccines leaves children
          unprotected during their most vulnerable period. The CDC schedule is designed to provide
          protection as early as safely possible. Alternative schedules are not recommended by any
          major medical organization.</li>
          <li><strong>&quot;Are combination shots safer than separate shots?&quot;</strong> Combination
          vaccines (like MMR or DTaP) reduce the number of injections while providing the same
          protection. They undergo the same rigorous testing as individual vaccines.</li>
        </ul>

        <h2 className={playfairDisplay.className}>VAERS Reporting for Multi-Vaccine Events</h2>
        <p>
          When an adverse event is reported after multiple vaccines are given together, VAERS
          lists all vaccines administered. This means a single report may appear in the data for
          each vaccine involved, which can inflate apparent report counts for individual vaccines.
          Analysts must account for this overlap when examining vaccine-specific data.
        </p>
        <p>
          Our <Link href="/tools/multi-vaccine">multi-vaccine tool</Link> lets you explore the most
          common co-administration combinations and their associated report patterns interactively.
        </p>

        <h2 className={playfairDisplay.className}>Interpreting Co-Administration Reports</h2>
        <p>
          VAERS reports involving multiple vaccines require careful interpretation:
        </p>
        <ul>
          <li>The total number of reports may be higher simply because more vaccines are involved</li>
          <li>Mild reactions like fever may be more common but are still generally expected</li>
          <li>Serious adverse events need evaluation to determine if they&apos;re related to any specific vaccine or the combination</li>
          <li>Background rates of health events in the vaccinated population must be considered</li>
        </ul>
      </div>

      {/* Historical Context */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-12">
        <strong>Historical note:</strong> Co-administration of vaccines has been standard practice
        in the United States since the 1960s, when combined DTP (diphtheria, tetanus, pertussis)
        vaccines became routine. The practice expanded significantly in the 1990s and 2000s as new
        vaccines were added to the childhood schedule, and it has been extensively studied in clinical
        trials and post-marketing surveillance for over six decades. The strong safety record of
        co-administration across billions of doses worldwide underpins current CDC recommendations.
        For the latest schedule showing which vaccines are given together, see our{' '}
        <Link href="/vaccine-schedule" className="text-blue-700 underline">vaccine schedule page</Link> and{' '}
        <Link href="/analysis/vaccine-schedule-2026" className="text-blue-700 underline">2026 schedule guide</Link>.
      </div>

      {/* Key Takeaways */}
      <div className="bg-accent/5 border border-accent/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">1.</span>
            <span>{formatNumber(totalCombinations)} different vaccine combinations have been reported to VAERS</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">2.</span>
            <span>Co-administration is standard practice supported by extensive safety studies</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">3.</span>
            <span>Pediatric combinations follow established CDC immunization schedules</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">4.</span>
            <span>Clinical trials specifically study combination safety before approval</span>
          </li>
        </ul>
      </div>

      {/* FAQ */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
        <div className="space-y-4 text-sm">
          <div>
            <div className="font-semibold text-gray-900">Can I request vaccines be given separately instead of together?</div>
            <div className="text-gray-600 mt-1">You can discuss spacing with your provider, but medical organizations do not recommend it. Delaying vaccines leaves children unprotected during vulnerable periods and requires more office visits, increasing the chance of missed doses. The CDC schedule is designed to provide the earliest safe protection.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">Are there more side effects when multiple vaccines are given?</div>
            <div className="text-gray-600 mt-1">Mild reactions like low-grade fever and fussiness may be slightly more common when multiple vaccines are given, but serious adverse events are not increased. Clinical studies specifically test co-administration safety before vaccines are approved for simultaneous use.</div>
          </div>
          <div>
            <div className="font-semibold text-gray-900">How does VAERS handle reports involving multiple vaccines?</div>
            <div className="text-gray-600 mt-1">When multiple vaccines are listed in a single report, VAERS counts the report under each vaccine. This means the same adverse event may appear in the data for every vaccine given that day, which can inflate apparent counts for individual vaccines.</div>
          </div>
        </div>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/pediatric" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Pediatric VAERS Analysis</div>
            <div className="text-sm text-gray-500">Focus on children&apos;s vaccination safety</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious vs Non-Serious Outcomes</div>
            <div className="text-sm text-gray-500">Understanding adverse event severity</div>
          </Link>
          <Link href="/analysis/vaccine-schedule-2026" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">The 2026 Vaccine Schedule</div>
            <div className="text-sm text-gray-500">Why vaccines are co-administered</div>
          </Link>
        </div>
      </div>
    </div>
  )
}