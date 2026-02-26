import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import DisclaimerBanner from '@/components/DisclaimerBanner';
import Breadcrumbs from '@/components/Breadcrumbs';

const SignalDetectionClient = dynamic(() => import('./SignalDetectionClient'), { ssr: false });

export const metadata: Metadata = {
  title: 'Signal Detection Dashboard — PRR Safety Signal Analysis',
  description: 'Explore statistically significant vaccine safety signals using Proportional Reporting Ratio (PRR) analysis of VAERS data. Find disproportionately reported adverse events for every vaccine.',
  openGraph: {
    title: 'Signal Detection Dashboard — VaccineWatch',
    description: 'PRR analysis revealing which adverse events are disproportionately reported for each vaccine in VAERS.',
  },
};

export default function SignalDetectionPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Breadcrumbs items={[
        { label: 'Home', href: '/' },
        { label: 'Tools', href: '/tools' },
        { label: 'Signal Detection Dashboard' },
      ]} />
      <DisclaimerBanner />

      <h1 className="text-3xl md:text-4xl font-bold font-serif text-gray-900 mb-4 mt-6">
        Signal Detection Dashboard
      </h1>
      <p className="text-lg text-gray-600 mb-2">
        Which adverse events are reported <strong>disproportionately often</strong> for each vaccine?
        This dashboard uses <strong>Proportional Reporting Ratio (PRR)</strong> analysis — the same
        statistical method used by the FDA and EMA for pharmacovigilance — to identify potential safety signals
        across {' '}1.98 million VAERS reports.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        A PRR ≥ 2 with at least 3 cases and statistical significance (χ² ≥ 3.84, p &lt; 0.05) is
        classified as a signal. This is a screening tool — signals require further investigation to confirm causality.
      </p>

      <SignalDetectionClient />

      {/* SEO Content */}
      <section className="mt-12 prose prose-gray max-w-none">
        <h2>What is Signal Detection?</h2>
        <p>
          Signal detection is the process of identifying potential safety concerns from post-market
          surveillance data. Regulatory agencies like the FDA and EMA routinely perform this type of
          analysis on VAERS and other pharmacovigilance databases to catch safety issues that may not
          have been detected in clinical trials.
        </p>

        <h3>Proportional Reporting Ratio (PRR)</h3>
        <p>
          The PRR compares the proportion of a specific adverse event for one vaccine against the
          proportion for all other vaccines. If Vaccine A has 5% of its reports mentioning myocarditis,
          but all other vaccines combined only have 0.1% of reports mentioning myocarditis, the PRR
          would be 50 — indicating myocarditis is reported 50 times more frequently for Vaccine A.
        </p>

        <h3>How Regulators Use This</h3>
        <p>
          The FDA uses a combination of PRR, Empirical Bayesian Geometric Mean (EBGM), and other
          methods to screen VAERS weekly for new signals. When a signal is detected, it triggers a
          more detailed investigation including clinical review, epidemiological studies, and sometimes
          label changes or safety communications.
        </p>

        <h3>Validated Signals in Our Analysis</h3>
        <p>
          Our PRR analysis correctly identifies several well-established vaccine safety signals that
          have been confirmed through extensive research: intussusception after rotavirus vaccine,
          myocarditis after mRNA COVID vaccines, thrombosis after adenoviral COVID vaccines, and
          post-herpetic neuralgia after Zostavax. This validation confirms the methodology is working
          as expected.
        </p>

        <h3>Related Tools & Analysis</h3>
        <ul>
          <li><Link href="/tools/reporting-rates">Reporting Rate Calculator</Link> — Calculate adverse event rates per dose administered</li>
          <li><Link href="/analysis/serious-outcomes">Serious Outcomes Analysis</Link> — Deep dive into hospitalizations, deaths, and disabilities</li>
          <li><Link href="/analysis/myocarditis">Myocarditis Analysis</Link> — Detailed look at the strongest confirmed COVID vaccine signal</li>
          <li><Link href="/vaccines">Browse All 104 Vaccines</Link> — Individual vaccine safety profiles with full data</li>
          <li><Link href="/dashboard">Vaccine Safety Dashboard</Link> — Compare death rates, hospitalization rates across all vaccines</li>
        </ul>
      </section>
    </main>
  );
}
