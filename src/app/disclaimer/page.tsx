import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Disclaimer - VaccineWatch',
  description: 'Important disclaimer about the limitations of VAERS data presented on VaccineWatch.',
  alternates: {
    canonical: 'https://vaccinewatch.org/disclaimer',
  },
}

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Disclaimer
        </h1>
        <p className="text-xl text-gray-600">
          Important information about VAERS data and how to interpret it responsibly.
        </p>
      </div>

      <div className="prose prose-lg max-w-none">
        <div className="bg-amber-50 border border-amber-300 rounded-lg p-6 mb-8 not-prose">
          <p className="text-amber-900 font-semibold text-lg mb-3">
            This website is for informational and educational purposes only.
          </p>
          <p className="text-amber-800">
            VaccineWatch is not a medical resource. Nothing on this website should be interpreted as medical
            advice, diagnosis, or treatment recommendation. Always consult qualified healthcare professionals
            for medical decisions.
          </p>
        </div>

        <h2 className={`${playfairDisplay.className}`}>About VAERS Data</h2>
        <p>
          The data presented on VaccineWatch comes from the <strong>Vaccine Adverse Event Reporting System
          (VAERS)</strong>, a national early warning system jointly managed by the Centers for Disease Control
          and Prevention (CDC) and the U.S. Food and Drug Administration (FDA).
        </p>

        <h2 className={`${playfairDisplay.className}`}>Reports Do Not Prove Causation</h2>
        <p>
          <strong>VAERS reports represent temporal associations, not causal relationships.</strong> When an adverse
          event is reported to VAERS after vaccination, it means the event happened after the vaccine was administered.
          It does not mean the vaccine caused the event. The event could be:
        </p>
        <ul>
          <li>Coincidental — the event would have occurred regardless of vaccination</li>
          <li>Related to an underlying medical condition</li>
          <li>Caused by a medication, illness, or other factor unrelated to the vaccine</li>
          <li>A natural occurrence at baseline population rates</li>
        </ul>

        <h2 className={`${playfairDisplay.className}`}>Limitations of Passive Surveillance</h2>
        <p>
          VAERS is a <strong>passive surveillance system</strong>, meaning it relies on voluntary reports.
          This introduces several significant limitations:
        </p>
        <ul>
          <li>
            <strong>Underreporting:</strong> Many adverse events go unreported. Studies suggest that only
            a fraction of actual adverse events are ever reported to VAERS.
          </li>
          <li>
            <strong>Stimulated reporting:</strong> Media coverage, public concern, or legal incentives can
            increase reporting for specific vaccines or conditions, inflating numbers independent of actual risk.
          </li>
          <li>
            <strong>Unverified data:</strong> Reports are not verified for medical accuracy before inclusion.
            Anyone can submit a report, and submissions may contain incomplete, inaccurate, or misleading information.
          </li>
          <li>
            <strong>No denominator data:</strong> VAERS does not include the number of vaccine doses administered.
            Without this denominator, it is impossible to calculate rates or compare relative risk between vaccines.
          </li>
          <li>
            <strong>Duplicate reports:</strong> The same adverse event may be reported multiple times by
            different reporters (healthcare providers, patients, family members).
          </li>
        </ul>

        <h2 className={`${playfairDisplay.className}`}>Misuse of VAERS Data</h2>
        <p>
          VAERS data has been frequently misrepresented in public discourse. Common misuses include:
        </p>
        <ul>
          <li>Citing raw report counts as evidence that vaccines caused specific outcomes</li>
          <li>Comparing raw numbers between vaccines without accounting for doses administered</li>
          <li>Presenting death reports as evidence that vaccines kill people, when most deaths in the database
          are coincidental and occur at expected background rates</li>
          <li>Ignoring that VAERS was designed as a signal detection system, not a proof-of-causation database</li>
        </ul>

        <h2 className={`${playfairDisplay.className}`}>How VAERS Data Should Be Used</h2>
        <p>
          VAERS serves an important purpose as an <strong>early warning system</strong>. It is designed to:
        </p>
        <ul>
          <li>Detect unusual patterns (safety signals) that warrant further investigation</li>
          <li>Identify previously unknown adverse events</li>
          <li>Monitor known adverse events for changes in frequency</li>
          <li>Provide data for more rigorous epidemiological studies</li>
        </ul>
        <p>
          When VAERS detects a signal, it is investigated further using more rigorous methods such as the
          Vaccine Safety Datalink (VSD), the Clinical Immunization Safety Assessment (CISA) project, or other
          controlled studies that can actually determine causation.
        </p>

        <h2 className={`${playfairDisplay.className}`}>Our Commitment</h2>
        <p>
          VaccineWatch presents VAERS data transparently with appropriate context. We are committed to:
        </p>
        <ul>
          <li>Presenting data as-is without editorializing or making causal claims</li>
          <li>Providing context about data limitations on every page</li>
          <li>Not using data to advocate for or against vaccination</li>
          <li>Linking to official CDC/FDA resources for authoritative information</li>
        </ul>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mt-8 not-prose">
          <h3 className="font-semibold text-gray-900 mb-3">Official Resources</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>
              <a href="https://vaers.hhs.gov" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                VAERS Official Website
              </a> — File reports and access raw data
            </li>
            <li>
              <a href="https://www.cdc.gov/vaccinesafety/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                CDC Vaccine Safety
              </a> — Authoritative vaccine safety information
            </li>
            <li>
              <a href="https://vaers.hhs.gov/data/dataguide.html" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                VAERS Data Use Guide
              </a> — Official guidance on interpreting VAERS data
            </li>
          </ul>
        </div>

        <p className="text-gray-500 text-sm mt-8">
          Built by{' '}
          <a href="https://thedataproject.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
            TheDataProject.ai
          </a>.
          For questions about this disclaimer, please visit our{' '}
          <Link href="/about" className="text-primary hover:underline">About page</Link>.
        </p>
      </div>
    </div>
  )
}
