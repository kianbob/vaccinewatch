import { Metadata } from 'next';
import Link from 'next/link';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import Breadcrumbs from '@/components/Breadcrumbs';
import ReportingRatesWrapper from './ReportingRatesWrapper';

export const metadata: Metadata = {
  title: 'Reporting Rate Calculator — VAERS Reports Per Dose Administered',
  description: 'Calculate VAERS adverse event reporting rates per dose administered. Compare reporting rates across vaccines using CDC dose denominator estimates.',
  openGraph: {
    title: 'Reporting Rate Calculator — VaccineWatch',
    description: 'Calculate and compare VAERS reporting rates per dose for every major vaccine.',
  },
};

export default function ReportingRatesPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Reporting Rate Calculator' },
      ]} />
      <DisclaimerBanner />

      <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4 mt-6">
        Reporting Rate Calculator
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        How many adverse event reports are filed per dose of vaccine administered? This tool combines
        VAERS report counts with CDC dose administration estimates to calculate <strong>reporting rates per million doses</strong> —
        the single most important context missing from raw VAERS numbers.
      </p>

      <ReportingRatesWrapper />

      {/* SEO Content */}
      <section className="mt-12 prose prose-gray max-w-none">
        <h2>Understanding Reporting Rates</h2>
        <p>
          Raw VAERS report counts are misleading without knowing how many people received each vaccine.
          A vaccine with 100,000 reports given to 500 million people has a very different risk profile
          than one with 10,000 reports given to 5 million people. Reporting rates provide that critical context.
        </p>

        <h3>How We Calculate Rates</h3>
        <p>
          We divide the number of VAERS reports by the estimated total doses administered to get a
          rate per million doses. Dose estimates come from CDC published data: COVID Data Tracker for
          COVID vaccines, FluVaxView for influenza, and National Immunization Survey (NIS) coverage
          rates multiplied by birth cohort sizes for childhood vaccines.
        </p>

        <h3>Why This Matters</h3>
        <p>
          The denominator problem is the single biggest issue in interpreting VAERS data. Without
          knowing how many doses were given, you cannot compare vaccines fairly. COVID vaccines have
          the most VAERS reports in history — but they were also given to more Americans in a shorter
          period than any vaccine ever. The reporting rate per dose tells a very different story than
          the raw numbers.
        </p>

        <h3>Limitations</h3>
        <ul>
          <li>VAERS is estimated to capture only 1-10% of actual adverse events (underreporting)</li>
          <li>Dose estimates for non-COVID vaccines are approximations based on coverage surveys</li>
          <li>Reporting awareness varies dramatically — COVID received far more media attention</li>
          <li>A VAERS report does not confirm the vaccine caused the event</li>
        </ul>

        <h3>Related Tools & Analysis</h3>
        <ul>
          <li><Link href="/analysis/denominator-problem">The Denominator Problem</Link> — Why raw VAERS numbers can be misleading without dose context</li>
          <li><Link href="/tools/signal-detection">Signal Detection Dashboard</Link> — PRR analysis showing disproportionately reported adverse events</li>
          <li><Link href="/analysis/reporting-bias">Understanding Reporting Bias</Link> — How awareness and media influence VAERS data</li>
          <li><Link href="/tools/risk-context">Risk Context Calculator</Link> — Put VAERS numbers in perspective with background rates</li>
          <li><Link href="/dashboard">Vaccine Safety Dashboard</Link> — Compare all 104 vaccines at a glance</li>
        </ul>
      </section>
    </main>
  );
}
