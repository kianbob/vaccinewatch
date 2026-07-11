import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'Methodology — How VaccineWatch Processes VAERS Data (2026)',
  description: 'How VaccineWatch sources, processes, and aggregates 1.98M VAERS vaccine adverse event reports. Data pipeline, metrics, update cadence, and limitations explained.',
  alternates: {
    canonical: 'https://www.vaccinewatch.org/methodology',
  },
  openGraph: {
    title: 'Methodology — How VaccineWatch Processes VAERS Data',
    description: 'A transparent look at how VaccineWatch sources, processes, and aggregates VAERS vaccine safety data, and the limitations you must keep in mind.',
  },
}

export default function MethodologyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Breadcrumbs items={[{ label: 'Methodology' }]} />

      <div className="mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Methodology
        </h1>
        <p className="text-xl text-gray-600">
          How VaccineWatch sources, processes, and presents VAERS vaccine adverse event data — and the
          limitations you must keep in mind when interpreting it.
        </p>
      </div>

      <section className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 mb-12">
        <h2 className={`text-2xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>Our Approach</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          VaccineWatch takes the raw VAERS data files published by the CDC and FDA and turns them into a fast,
          searchable, and clearly contextualized resource. We do not alter, filter, or editorialize the underlying
          reports. Every metric on this site is a transparent aggregation of official government data, presented
          alongside the context needed to interpret it responsibly.
        </p>
      </section>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Data Sources</h2>
        <p>
          All data on VaccineWatch originates from the{' '}
          <strong>Vaccine Adverse Event Reporting System (VAERS)</strong>, the national early warning system
          co-managed by the <strong>Centers for Disease Control and Prevention (CDC)</strong> and the{' '}
          <strong>U.S. Food and Drug Administration (FDA)</strong>. We use the official public-use datasets
          published at{' '}
          <a href="https://vaers.hhs.gov/data/datasets.html" target="_blank" rel="noopener noreferrer">vaers.hhs.gov</a>.
          These are released as three linked CSV files for each year:
        </p>
        <ul>
          <li><strong>VAERSDATA</strong> — one row per report, including age, sex, state, vaccination and onset dates, and outcome flags (died, hospitalized, ER visit, disabled, life-threatening, recovered).</li>
          <li><strong>VAERSVAX</strong> — the vaccine(s) named in each report, including vaccine type, manufacturer, dose number, route, and lot number.</li>
          <li><strong>VAERSSYMPTOMS</strong> — the symptoms coded for each report using <strong>MedDRA</strong> Preferred Terms (up to five per row, with additional rows for reports listing more symptoms).</li>
        </ul>
        <p>
          These files are joined on the shared <strong>VAERS ID</strong>, which uniquely identifies each report.
          We currently cover reports from <strong>1990 through February 2026</strong>, the most recent data
          available at the time of our last processing run.
        </p>

        <h2 className={playfairDisplay.className}>Data Processing Pipeline</h2>
        <p>
          Our pipeline transforms the raw CSV files into the static JSON datasets that power this site. The steps are:
        </p>
        <ol>
          <li><strong>Download</strong> — We retrieve the complete set of annual VAERSDATA, VAERSVAX, and VAERSSYMPTOMS files directly from the VAERS website.</li>
          <li><strong>Parse and normalize</strong> — We read every row, resolve character-encoding inconsistencies, standardize date formats, and normalize categorical fields such as state, sex, and vaccine type.</li>
          <li><strong>Join</strong> — Reports, vaccines, and symptoms are linked by VAERS ID so that each report carries its full set of vaccines and coded symptoms.</li>
          <li><strong>Aggregate</strong> — We group reports by vaccine type, symptom, manufacturer, U.S. state/territory, age group, sex, and year to produce the counts shown across the site.</li>
          <li><strong>Cross-reference</strong> — We build vaccine-to-symptom and manufacturer-to-vaccine relationship maps so users can move between related views.</li>
          <li><strong>Publish</strong> — The aggregated results are written to static JSON files and served from the edge for fast, serverless delivery.</li>
        </ol>
        <p>
          We include <strong>all reports as-is</strong>. We do not remove, filter, or de-duplicate reports beyond what
          the CDC/FDA has already done, and we do not add any causal interpretation to the underlying data.
        </p>

        <h2 className={playfairDisplay.className}>How Metrics Are Computed</h2>
        <p>
          Every headline number on VaccineWatch is a direct count or simple ratio derived from the VAERS fields.
          Specifically:
        </p>
        <ul>
          <li><strong>Total reports</strong> — the number of distinct VAERS IDs matching a given filter (vaccine, symptom, state, year, etc.).</li>
          <li><strong>Deaths</strong> — reports where the VAERS <code>DIED</code> field is flagged <code>Y</code>.</li>
          <li><strong>Hospitalizations</strong> — reports where the <code>HOSPITAL</code> field is flagged <code>Y</code>.</li>
          <li><strong>ER visits</strong> — reports flagged for emergency room or doctor visit.</li>
          <li><strong>Disabilities</strong> — reports where the <code>DISABLE</code> field is flagged <code>Y</code>.</li>
          <li><strong>Serious outcome rate</strong> — (deaths + hospitalizations) ÷ total reports × 100. This is a rough measure of the <em>severity mix of the reports themselves</em>, not a measure of vaccine risk.</li>
        </ul>
        <p>
          A single report can carry multiple outcome flags (for example, both hospitalized and died), so outcome
          categories are not mutually exclusive and should not be summed to equal the total report count.
        </p>

        <h2 className={playfairDisplay.className}>Update Cadence</h2>
        <p>
          The VAERS database is refreshed by the CDC/FDA on a roughly <strong>quarterly</strong> schedule, with the
          public files typically updated weekly for the current year as new reports are processed. We reprocess our
          datasets after each major VAERS release so that VaccineWatch reflects the latest available data. The current
          dataset was last processed on <strong>February 25, 2026</strong>, and covers reports through early 2026.
        </p>

        <h2 className={playfairDisplay.className}>Limitations You Must Keep in Mind</h2>
        <p>
          Because VAERS is a <strong>passive surveillance system</strong>, the data carries important limitations that
          shape how it can be used. No metric on this site should be read as a measure of vaccine risk or as evidence
          of causation:
        </p>
        <ul>
          <li><strong>Reports do not prove causation.</strong> A report only establishes that an event occurred after vaccination — a temporal association, not a causal one.</li>
          <li><strong>No denominator.</strong> VAERS does not record how many doses were administered, so raw report counts cannot be converted into rates or compared across vaccines to infer risk.</li>
          <li><strong>Underreporting and stimulated reporting.</strong> Many events are never reported, while media attention and legal incentives can inflate reporting for specific vaccines independent of any change in actual risk.</li>
          <li><strong>Unverified content.</strong> Reports are accepted without being confirmed for medical accuracy, and anyone may submit one.</li>
          <li><strong>Possible duplicates.</strong> The same event may be reported by multiple people; some duplicates may remain in the data.</li>
        </ul>
        <p>
          When VAERS surfaces a potential signal, it is investigated using more rigorous systems such as the
          Vaccine Safety Datalink (VSD) and the Clinical Immunization Safety Assessment (CISA) project, which can
          actually test for causation. For a fuller treatment of these caveats, see our{' '}
          <Link href="/disclaimer">disclaimer</Link> and our analysis of the{' '}
          <Link href="/analysis/denominator-problem">denominator problem</Link>.
        </p>
      </div>

      {/* Explore More */}
      
      {/* Data Quality */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Data Quality Considerations</h2>
        <p>
          Working with VAERS data requires awareness of several data quality issues that affect analysis:
        </p>
        <ul>
          <li><strong>Character encoding:</strong> Raw VAERS CSV files sometimes contain encoding inconsistencies,
          particularly in free-text symptom descriptions and narrative fields. Our pipeline normalizes these
          to UTF-8 during processing.</li>
          <li><strong>Date parsing:</strong> VAERS dates can appear in multiple formats across different year files.
          We standardize all dates to ISO 8601 format during import.</li>
          <li><strong>Vaccine type standardization:</strong> The same vaccine may appear under different type codes
          across years (e.g., COVID vaccines use COVID19 and COVID19-2). We map these to canonical vaccine types
          for consistent aggregation.</li>
          <li><strong>Symptom coding:</strong> Symptoms are coded using MedDRA Preferred Terms, which are standardized
          medical terminology. However, the same clinical condition may be coded differently by different reporters.
          We use the MedDRA codes as-is without additional normalization.</li>
          <li><strong>Missing data:</strong> Many VAERS reports have missing fields — age, sex, state, and onset date
          are frequently blank. We include reports with missing data in our totals but exclude them from
          analyses where the missing field is required (e.g., age-group breakdowns exclude reports with unknown age).</li>
        </ul>

        <h2 className={playfairDisplay.className}>What We Don&apos;t Do</h2>
        <p>
          Transparency requires being clear about what we don&apos;t do as much as what we do:
        </p>
        <ul>
          <li><strong>We don&apos;t filter reports.</strong> All reports in the public VAERS dataset appear on VaccineWatch,
          regardless of severity, plausibility, or verification status.</li>
          <li><strong>We don&apos;t add causal interpretation.</strong> We never claim that a vaccine caused any
          reported event. Our language consistently uses &quot;reported after,&quot; &quot;associated with,&quot;
          and &quot;temporal association&quot; rather than causal language.</li>
          <li><strong>We don&apos;t make medical recommendations.</strong> VaccineWatch is an educational data
          transparency tool, not a medical advice service.</li>
          <li><strong>We don&apos;t de-duplicate reports.</strong> Some events may be reported by multiple people.
          We leave the data as the CDC/FDA published it.</li>
          <li><strong>We don&apos;t estimate denominators.</strong> While dose administration data exists from other
          sources, we do not attempt to calculate per-dose rates because the population denominators from VAERS
          are unreliable.</li>
        </ul>

        <h2 className={playfairDisplay.className}>Technical Architecture</h2>
        <p>
          VaccineWatch is built as a static site for maximum performance and reliability:
        </p>
        <ul>
          <li><strong>Framework:</strong> Next.js with static generation (SSG) for all data pages</li>
          <li><strong>Data format:</strong> Pre-computed JSON files served from the edge</li>
          <li><strong>Charts:</strong> Recharts for interactive client-side data visualization</li>
          <li><strong>Hosting:</strong> Edge-deployed for sub-100ms response times globally</li>
          <li><strong>Search:</strong> Client-side search index for instant vaccine and symptom lookup</li>
        </ul>
        <p>
          This architecture ensures that VaccineWatch remains fast and accessible even during traffic spikes.
          There is no database to query at runtime — all data is pre-computed during our processing pipeline
          and served as static assets.
        </p>

        <h2 className={playfairDisplay.className}>Frequently Asked Questions About Our Data</h2>
        <p>
          <strong>Q: Can I verify your numbers against the original VAERS data?</strong><br/>
          A: Yes. All our data comes from the official public-use VAERS datasets at vaers.hhs.gov. Our methodology
          page documents the exact processing steps, so anyone can reproduce our numbers.
        </p>
        <p>
          <strong>Q: How quickly do you update after VAERS releases new data?</strong><br/>
          A: We typically process new VAERS releases within a few days of publication. The current dataset was
          last processed on February 25, 2026.
        </p>
        <p>
          <strong>Q: Do you use any AI or machine learning in your analysis?</strong><br/>
          A: Our current pipeline uses straightforward data processing and aggregation — no AI or ML models.
          All metrics are direct counts and simple ratios. We may incorporate AI-assisted analysis in the future,
          but any such additions will be clearly documented.
        </p>
        <p>
          <strong>Q: Why don&apos;t you show per-dose risk rates?</strong><br/>
          A: VAERS does not include dose administration data. While dose counts exist from other sources (CDC
          immunization surveys, manufacturer reports), combining them with VAERS data introduces significant
          methodological challenges. We prefer to present the data we have accurately rather than create
          potentially misleading calculated rates.
        </p>
      </div>


      {/* Data Quality */}
      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Data Quality Considerations</h2>
        <p>
          Working with VAERS data requires awareness of several data quality issues that affect analysis:
        </p>
        <ul>
          <li><strong>Character encoding:</strong> Raw VAERS CSV files sometimes contain encoding inconsistencies,
          particularly in free-text symptom descriptions and narrative fields. Our pipeline normalizes these
          to UTF-8 during processing.</li>
          <li><strong>Date parsing:</strong> VAERS dates can appear in multiple formats across different year files.
          We standardize all dates to ISO 8601 format during import.</li>
          <li><strong>Vaccine type standardization:</strong> The same vaccine may appear under different type codes
          across years (e.g., COVID vaccines use COVID19 and COVID19-2). We map these to canonical vaccine types
          for consistent aggregation.</li>
          <li><strong>Symptom coding:</strong> Symptoms are coded using MedDRA Preferred Terms, which are standardized
          medical terminology. However, the same clinical condition may be coded differently by different reporters.
          We use the MedDRA codes as-is without additional normalization.</li>
          <li><strong>Missing data:</strong> Many VAERS reports have missing fields — age, sex, state, and onset date
          are frequently blank. We include reports with missing data in our totals but exclude them from
          analyses where the missing field is required (e.g., age-group breakdowns exclude reports with unknown age).</li>
        </ul>

        <h2 className={playfairDisplay.className}>What We Don&apos;t Do</h2>
        <p>
          Transparency requires being clear about what we don&apos;t do as much as what we do:
        </p>
        <ul>
          <li><strong>We don&apos;t filter reports.</strong> All reports in the public VAERS dataset appear on VaccineWatch,
          regardless of severity, plausibility, or verification status.</li>
          <li><strong>We don&apos;t add causal interpretation.</strong> We never claim that a vaccine caused any
          reported event. Our language consistently uses &quot;reported after,&quot; &quot;associated with,&quot;
          and &quot;temporal association&quot; rather than causal language.</li>
          <li><strong>We don&apos;t make medical recommendations.</strong> VaccineWatch is an educational data
          transparency tool, not a medical advice service.</li>
          <li><strong>We don&apos;t de-duplicate reports.</strong> Some events may be reported by multiple people.
          We leave the data as the CDC/FDA published it.</li>
          <li><strong>We don&apos;t estimate denominators.</strong> While dose administration data exists from other
          sources, we do not attempt to calculate per-dose rates because the population denominators from VAERS
          are unreliable.</li>
        </ul>

        <h2 className={playfairDisplay.className}>Technical Architecture</h2>
        <p>
          VaccineWatch is built as a static site for maximum performance and reliability:
        </p>
        <ul>
          <li><strong>Framework:</strong> Next.js with static generation (SSG) for all data pages</li>
          <li><strong>Data format:</strong> Pre-computed JSON files served from the edge</li>
          <li><strong>Charts:</strong> Recharts for interactive client-side data visualization</li>
          <li><strong>Hosting:</strong> Edge-deployed for sub-100ms response times globally</li>
          <li><strong>Search:</strong> Client-side search index for instant vaccine and symptom lookup</li>
        </ul>
        <p>
          This architecture ensures that VaccineWatch remains fast and accessible even during traffic spikes.
          There is no database to query at runtime — all data is pre-computed during our processing pipeline
          and served as static assets.
        </p>

        <h2 className={playfairDisplay.className}>Frequently Asked Questions About Our Data</h2>
        <p>
          <strong>Q: Can I verify your numbers against the original VAERS data?</strong><br/>
          A: Yes. All our data comes from the official public-use VAERS datasets at vaers.hhs.gov. Our methodology
          page documents the exact processing steps, so anyone can reproduce our numbers.
        </p>
        <p>
          <strong>Q: How quickly do you update after VAERS releases new data?</strong><br/>
          A: We typically process new VAERS releases within a few days of publication. The current dataset was
          last processed on February 25, 2026.
        </p>
        <p>
          <strong>Q: Do you use any AI or machine learning in your analysis?</strong><br/>
          A: Our current pipeline uses straightforward data processing and aggregation — no AI or ML models.
          All metrics are direct counts and simple ratios. We may incorporate AI-assisted analysis in the future,
          but any such additions will be clearly documented.
        </p>
        <p>
          <strong>Q: Why don&apos;t you show per-dose risk rates?</strong><br/>
          A: VAERS does not include dose administration data. While dose counts exist from other sources (CDC
          immunization surveys, manufacturer reports), combining them with VAERS data introduces significant
          methodological challenges. We prefer to present the data we have accurately rather than create
          potentially misleading calculated rates.
        </p>
      </div>

<div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore More</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/about" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">About VaccineWatch</div>
            <div className="text-sm text-gray-500">Our mission and stance</div>
          </Link>
          <Link href="/faq" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">FAQ</div>
            <div className="text-sm text-gray-500">Common questions answered</div>
          </Link>
          <Link href="/glossary" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Glossary</div>
            <div className="text-sm text-gray-500">VAERS terms defined</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
