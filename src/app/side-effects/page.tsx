import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, formatManufacturer, slugify } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Vaccine Side Effects — Complete VAERS Database Analysis',
  description: 'Explore reported vaccine side effects from the VAERS database. 1.98 million adverse event reports across 104 vaccines, with context about what the data means and doesn\'t mean.',
  openGraph: {
    title: 'Vaccine Side Effects — Complete VAERS Database Analysis',
    description: 'Explore 1.98M reported vaccine adverse events across 104 vaccines with full context.',
  },
}

export default function SideEffectsPage() {
  const vaccineIndex = readJsonFile('vaccine-index.json')
  const symptomIndex = readJsonFile('symptom-index.json')

  // Top symptoms across all vaccines
  const topSymptoms = symptomIndex
    .sort((a: any, b: any) => b.reports - a.reports)
    .slice(0, 20)

  // Top vaccines by report count
  const topVaccines = vaccineIndex
    .sort((a: any, b: any) => b.reports - a.reports)
    .slice(0, 10)

  // Use stats.json for accurate unique totals (vaccine-index sums overcount due to multi-vaccine reports)
  const stats = readJsonFile('stats.json')
  const totalReports = stats?.totalReports || 1983260
  const totalDeaths = stats?.totalDied || 27732
  const totalHosp = stats?.totalHospitalized || 143653

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Vaccine Side Effects' }]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">Comprehensive Guide</div>
          <ShareButtons title="Vaccine Side Effects — Complete VAERS Analysis" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Vaccine Side Effects
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          A comprehensive look at adverse events reported to VAERS (Vaccine Adverse Event Reporting System). 
          This data shows what was <em>reported</em> after vaccination — not what was <em>caused</em> by vaccination.
        </p>
      </div>

      {/* Key stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{formatNumber(totalReports)}</div>
          <div className="text-sm text-primary">Total Reports</div>
          <div className="text-xs text-gray-400">1990–2026</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">104</div>
          <div className="text-sm text-primary">Vaccines</div>
          <div className="text-xs text-gray-400">Tracked in VAERS</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">1,000+</div>
          <div className="text-sm text-primary">Symptoms</div>
          <div className="text-xs text-gray-400">Reported types</div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">35</div>
          <div className="text-sm text-primary">Years of Data</div>
          <div className="text-xs text-gray-400">Since 1990</div>
        </div>
      </div>

      {/* Understanding section */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What Are Vaccine Side Effects?</h2>
        <p>
          Vaccine side effects range from common, mild reactions like soreness at the injection site 
          to rare, serious adverse events. VAERS collects reports of <strong>all</strong> health events 
          that occur after vaccination, regardless of whether the vaccine caused them.
        </p>
        <p>
          This distinction is critical: a VAERS report means something happened <em>after</em> vaccination, 
          not <em>because of</em> vaccination. Someone who gets vaccinated and then catches a cold will 
          generate a VAERS report, even though the vaccine didn&apos;t cause the cold.
        </p>

        <h2 className={playfairDisplay.className}>Most Commonly Reported Side Effects</h2>
        <p>
          The most frequently reported symptoms in VAERS largely align with known, expected reactions 
          to vaccination:
        </p>
      </div>

      {/* Top symptoms grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-12">
        {topSymptoms.map((s: any, i: number) => (
          <Link
            key={s.name}
            href={`/symptoms/${slugify(s.name)}`}
            className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3 hover:shadow-md hover:border-primary/30 transition-all"
          >
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-primary/60 w-6">#{i + 1}</span>
              <span className="font-medium text-gray-900">{s.name}</span>
            </div>
            <span className="text-sm text-gray-500 font-mono">{formatNumber(s.reports)}</span>
          </Link>
        ))}
      </div>

      {/* Vaccine-specific guides */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>Vaccine-Specific Guides</h2>
        <p className="text-gray-600 mb-6">In-depth side effect analysis for the most commonly searched vaccines:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/side-effects/covid" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-lg font-bold text-gray-900">COVID-19</div>
            <div className="text-sm text-gray-500">1.1M+ reports · Pfizer, Moderna, J&J</div>
          </Link>
          <Link href="/side-effects/flu" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-lg font-bold text-gray-900">Influenza (Flu)</div>
            <div className="text-sm text-gray-500">11 flu vaccine types analyzed</div>
          </Link>
          <Link href="/side-effects/mmr" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-lg font-bold text-gray-900">MMR</div>
            <div className="text-sm text-gray-500">Measles, mumps, rubella data</div>
          </Link>
          <Link href="/side-effects/hpv" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-lg font-bold text-gray-900">HPV (Gardasil)</div>
            <div className="text-sm text-gray-500">Cancer prevention vaccine</div>
          </Link>
          <Link href="/side-effects/shingles" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-lg font-bold text-gray-900">Shingles (Shingrix)</div>
            <div className="text-sm text-gray-500">Known for strong reactogenicity</div>
          </Link>
          <Link href="/side-effects/tdap" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="text-lg font-bold text-gray-900">Tdap</div>
            <div className="text-sm text-gray-500">Tetanus, diphtheria, pertussis</div>
          </Link>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Side Effects by Vaccine</h2>
        <p>
          Different vaccines have different side effect profiles. The table below shows the most-reported 
          vaccines in VAERS. Click any vaccine to see its complete adverse event data.
        </p>
      </div>

      {/* Top vaccines table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 mb-12">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-gray-700">Vaccine</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Reports</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Deaths</th>
              <th className="text-right px-4 py-3 font-medium text-gray-700">Hospitalizations</th>
            </tr>
          </thead>
          <tbody>
            {topVaccines.map((v: any, i: number) => (
              <tr key={v.type} className={`border-t border-gray-100 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-4 py-3">
                  <Link href={`/vaccines/${v.type.toLowerCase()}`} className="text-primary hover:underline font-medium">
                    {formatManufacturer(v.name)}
                  </Link>
                </td>
                <td className="text-right px-4 py-3 font-mono">{formatNumber(v.reports)}</td>
                <td className="text-right px-4 py-3 font-mono text-red-600">{formatNumber(v.died)}</td>
                <td className="text-right px-4 py-3 font-mono text-amber-600">{formatNumber(v.hosp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="text-center mb-12">
        <Link href="/dashboard" className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors">
          View Full Dashboard → All 104 Vaccines
        </Link>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Common vs Serious Side Effects</h2>
        <p>
          The vast majority of reported side effects are <strong>non-serious</strong> — things like 
          headaches, fatigue, fever, and injection site pain. These are expected immune responses 
          that typically resolve within days.
        </p>
        <p>
          Serious outcomes (hospitalization, disability, death) represent a small fraction of all reports. 
          Of {formatNumber(totalReports)} total reports:
        </p>
        <ul>
          <li><strong>Hospitalizations:</strong> {formatNumber(totalHosp)} ({((totalHosp / totalReports) * 100).toFixed(1)}% of reports)</li>
          <li><strong>Deaths:</strong> {formatNumber(totalDeaths)} ({((totalDeaths / totalReports) * 100).toFixed(1)}% of reports)</li>
        </ul>
        <p>
          Remember: these are <em>reported</em> rates from a passive system, not actual risk rates. 
          The real rate of serious adverse events from vaccines is much lower than what VAERS raw 
          numbers suggest due to{' '}
          <Link href="/analysis/reporting-bias">reporting bias</Link> and the{' '}
          <Link href="/analysis/denominator-problem">denominator problem</Link>.
        </p>

        <h2 className={playfairDisplay.className}>When Do Side Effects Occur?</h2>
        <p>
          Most vaccine side effects appear within the first few days after vaccination. Our{' '}
          <Link href="/analysis/onset-timing">onset timing analysis</Link> shows that the majority 
          of reported adverse events begin within 0-3 days of vaccination, which is consistent 
          with known immune response timelines.
        </p>
        <p>
          You can explore onset patterns for any vaccine using our{' '}
          <Link href="/tools/onset-calculator">Onset Calculator tool</Link>.
        </p>

        <h2 className={playfairDisplay.className}>Do Side Effects Go Away?</h2>
        <p>
          Our <Link href="/analysis/recovery-rates">recovery rates analysis</Link> shows that the 
          majority of people reporting adverse events to VAERS indicate recovery. However, VAERS 
          lacks systematic follow-up, so &quot;not recovered&quot; often means the condition was 
          still ongoing when the report was filed — not necessarily that it&apos;s permanent.
        </p>

        <h2 className={playfairDisplay.className}>Understanding VAERS Limitations</h2>
        <p>Before drawing conclusions from this data, understand these key limitations:</p>
        <ul>
          <li><strong>Anyone can file a report</strong> — VAERS is open to patients, parents, healthcare providers, and manufacturers</li>
          <li><strong>Reports are not verified</strong> — the information may be incomplete, inaccurate, or coincidental</li>
          <li><strong>Correlation ≠ causation</strong> — a report after vaccination doesn&apos;t mean the vaccine caused the event</li>
          <li><strong>Underreporting exists</strong> — some events are never reported to VAERS</li>
          <li><strong>Over-reporting also exists</strong> — media attention and legal incentives can increase reporting for specific vaccines</li>
        </ul>
        <p>
          For a deeper understanding, read our articles on the{' '}
          <Link href="/analysis/denominator-problem">denominator problem</Link> and{' '}
          <Link href="/analysis/reporting-bias">reporting bias</Link>.
        </p>
      </div>

      {/* Vaccine-specific guides */}
      <div className="mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-6 ${playfairDisplay.className}`}>
          Side Effects by Vaccine
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link href="/side-effects/covid" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">COVID-19 Vaccine</div>
            <div className="text-sm text-gray-500">1.1M+ reports · Pfizer, Moderna, J&amp;J</div>
          </Link>
          <Link href="/side-effects/flu" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">Flu Vaccine</div>
            <div className="text-sm text-gray-500">11 types · Annual vaccination</div>
          </Link>
          <Link href="/side-effects/mmr" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">MMR Vaccine</div>
            <div className="text-sm text-gray-500">Measles, mumps, rubella</div>
          </Link>
          <Link href="/side-effects/hpv" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">HPV Vaccine</div>
            <div className="text-sm text-gray-500">Gardasil · Cancer prevention</div>
          </Link>
          <Link href="/side-effects/shingles" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">Shingles Vaccine</div>
            <div className="text-sm text-gray-500">Zostavax &amp; Shingrix</div>
          </Link>
          <Link href="/side-effects/tdap" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">Tdap Vaccine</div>
            <div className="text-sm text-gray-500">Tetanus, diphtheria, pertussis</div>
          </Link>
          <Link href="/side-effects/hepatitis-b" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">Hepatitis B Vaccine</div>
            <div className="text-sm text-gray-500">Given at birth · 73K+ reports</div>
          </Link>
          <Link href="/side-effects/pneumonia" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">Pneumonia Vaccine</div>
            <div className="text-sm text-gray-500">Pneumovax &amp; Prevnar</div>
          </Link>
          <Link href="/side-effects/polio" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">Polio Vaccine</div>
            <div className="text-sm text-gray-500">IPV &amp; historical OPV</div>
          </Link>
          <Link href="/side-effects/varicella" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">Varicella (Chickenpox)</div>
            <div className="text-sm text-gray-500">Varivax · 93K+ reports</div>
          </Link>
          <Link href="/side-effects/dtap" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">DTaP Vaccine</div>
            <div className="text-sm text-gray-500">Childhood diphtheria, tetanus, pertussis</div>
          </Link>
          <Link href="/side-effects/hepatitis-a" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">Hepatitis A Vaccine</div>
            <div className="text-sm text-gray-500">Havrix &amp; Vaqta · 48K+ reports</div>
          </Link>
          <Link href="/side-effects/meningococcal" className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-primary/30 transition-all">
            <div className="font-bold text-gray-900 mb-1">Meningococcal Vaccine</div>
            <div className="text-sm text-gray-500">Menactra &amp; Menveo · 36K+ reports</div>
          </Link>
          <Link href="/dashboard" className="bg-primary/5 border border-primary/20 rounded-xl p-5 hover:shadow-md transition-all">
            <div className="font-bold text-primary mb-1">View All 104 Vaccines →</div>
            <div className="text-sm text-gray-500">Interactive sortable dashboard</div>
          </Link>
        </div>
      </div>

      {/* Explore tools */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore Side Effects Further</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Link href="/vaccines" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Browse by Vaccine →</div>
            <div className="text-sm text-gray-500">See side effects for specific vaccines</div>
          </Link>
          <Link href="/symptoms" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Browse by Symptom →</div>
            <div className="text-sm text-gray-500">Search 1,000+ reported symptoms</div>
          </Link>
          <Link href="/tools/severity-profile" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Severity Profile Tool →</div>
            <div className="text-sm text-gray-500">Compare severity across vaccines</div>
          </Link>
          <Link href="/search" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Search VAERS Data →</div>
            <div className="text-sm text-gray-500">Find any vaccine or symptom</div>
          </Link>
        </div>
      </div>

      {/* Related */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/analysis/onset-timing" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">When Do Side Effects Start?</div>
            <div className="text-sm text-gray-500">Onset timing patterns</div>
          </Link>
          <Link href="/analysis/recovery-rates" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Do Side Effects Go Away?</div>
            <div className="text-sm text-gray-500">Recovery rate analysis</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Serious Outcomes</div>
            <div className="text-sm text-gray-500">Understanding severity</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
