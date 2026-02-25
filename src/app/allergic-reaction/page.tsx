import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import ShareButtons from '@/components/ShareButtons'

export const metadata: Metadata = {
  title: 'Allergic Reactions to Vaccines — Anaphylaxis Data & Guidance',
  description: 'Understanding vaccine allergic reactions from mild hives to anaphylaxis. VAERS data, risk factors, the 15-minute wait, and what to do if you react.',
}

export default function AllergicReactionPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: '{"@context":"https://schema.org","@type":"Article","headline":"Allergic Reactions to Vaccines — Anaphylaxis Data & Guidance","description":"Understanding vaccine allergic reactions from mild hives to anaphylaxis. VAERS data, risk factors, the 15-minute wait, and what to do if you react.","url":"https://www.vaccinewatch.org/allergic-reaction","datePublished":"2026-02-25","dateModified":"2026-02-25","publisher":{"@type":"Organization","name":"VaccineWatch","url":"https://www.vaccinewatch.org"}}'}} />
      <Breadcrumbs items={[
        { label: 'Side Effects', href: '/side-effects' },
        { label: 'Allergic Reactions' }
      ]} />

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <div className="text-xs font-medium text-primary uppercase tracking-wider">7 min read</div>
          <ShareButtons title="Allergic Reactions to Vaccines" />
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Allergic Reactions to Vaccines
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Allergic reactions to vaccines range from mild skin reactions to life-threatening 
          anaphylaxis. While serious allergic reactions are extremely rare (1-5 per million doses), 
          understanding the signs and knowing what to expect is important.
        </p>
      </div>

      {/* Severity spectrum */}
      <div className="space-y-4 mb-12">
        <div className="bg-green-50 border-l-4 border-green-400 rounded-r-xl p-5">
          <div className="font-bold text-green-800 mb-1">Mild (Common)</div>
          <p className="text-sm text-green-700">Injection site redness/swelling, mild rash or hives near injection site, itching. Usually resolves on its own within hours.</p>
        </div>
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5">
          <div className="font-bold text-amber-800 mb-1">Moderate (Uncommon)</div>
          <p className="text-sm text-amber-700">Widespread hives (urticaria), facial swelling, persistent itching. May require antihistamines. Consult healthcare provider.</p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 rounded-r-xl p-5">
          <div className="font-bold text-red-800 mb-1">Severe — Anaphylaxis (Rare: ~1-5 per million)</div>
          <p className="text-sm text-red-700">Difficulty breathing, throat swelling, rapid heartbeat, dizziness, drop in blood pressure. <strong>Medical emergency — call 911.</strong> Treated with epinephrine.</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>What Causes Vaccine Allergic Reactions?</h2>
        <p>
          Allergic reactions to vaccines are usually triggered not by the active ingredient 
          (the antigen) but by other components:
        </p>
        <ul>
          <li><strong>Polyethylene glycol (PEG):</strong> Found in mRNA COVID vaccines — a rare allergen</li>
          <li><strong>Polysorbate 80:</strong> Found in J&amp;J COVID vaccine and others — related to PEG</li>
          <li><strong>Gelatin:</strong> Found in MMR, varicella, and some flu vaccines</li>
          <li><strong>Egg proteins:</strong> Trace amounts in egg-based flu vaccines (most people with egg allergies can still safely receive them)</li>
          <li><strong>Neomycin/streptomycin:</strong> Trace antibiotics in some vaccines</li>
          <li><strong>Latex:</strong> In some vial stoppers (not the vaccine itself)</li>
        </ul>

        <h2 className={playfairDisplay.className}>The 15-Minute Wait</h2>
        <p>
          You&apos;re asked to wait 15-30 minutes after vaccination so that if anaphylaxis occurs, 
          it can be treated immediately. Anaphylaxis almost always occurs within this window. 
          All vaccination sites are required to have epinephrine available.
        </p>
        <p>
          The 30-minute wait is recommended for people with a history of anaphylaxis to any cause 
          or a history of immediate allergic reaction to a previous dose or known vaccine component.
        </p>

        <h2 className={playfairDisplay.className}>Anaphylaxis by Vaccine Type</h2>
        <p>
          Anaphylaxis rates vary slightly by vaccine but are extremely rare across the board:
        </p>
        <ul>
          <li><strong>COVID-19 (Pfizer):</strong> ~5 per million doses</li>
          <li><strong>COVID-19 (Moderna):</strong> ~2.5 per million doses</li>
          <li><strong>COVID-19 (J&amp;J):</strong> ~1.5 per million doses</li>
          <li><strong>Flu vaccines:</strong> ~1.3 per million doses</li>
          <li><strong>Other vaccines:</strong> ~1 per million doses</li>
        </ul>
        <p>
          For context: the risk of anaphylaxis from common antibiotics like penicillin is 
          about 1-5 per 10,000 — roughly 100x higher than from vaccines.
        </p>

        <h2 className={playfairDisplay.className}>What to Do If You Have an Allergic Reaction</h2>
        <ol>
          <li><strong>Mild reaction:</strong> Take an antihistamine (like Benadryl). Monitor symptoms. Report to your doctor.</li>
          <li><strong>Moderate reaction:</strong> Seek medical attention. Your doctor may prescribe stronger antihistamines or steroids.</li>
          <li><strong>Anaphylaxis:</strong> Call 911 immediately. Use epinephrine auto-injector if available. Lie down with legs elevated.</li>
        </ol>

        <h2 className={playfairDisplay.className}>Can You Get Vaccinated with Allergies?</h2>
        <p>
          Most people with allergies — including food allergies, drug allergies, and environmental 
          allergies — can safely receive vaccines. Specific guidance:
        </p>
        <ul>
          <li><strong>Egg allergy:</strong> You can receive flu and most other vaccines (including mRNA COVID vaccines, which contain no egg)</li>
          <li><strong>Previous vaccine reaction:</strong> Discuss with your doctor. You may receive the vaccine under extended observation or switch to a different brand.</li>
          <li><strong>PEG/polysorbate allergy:</strong> This is the main contraindication for mRNA COVID vaccines. Discuss alternatives with your allergist.</li>
          <li><strong>Gelatin allergy:</strong> Tell your provider before receiving MMR, varicella, or certain flu vaccines.</li>
        </ul>
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Explore Related Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link href="/symptoms/anaphylactic-reaction" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Anaphylaxis in VAERS →</div>
            <div className="text-sm text-gray-500">Reports by vaccine</div>
          </Link>
          <Link href="/analysis/serious-outcomes" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Serious Outcomes →</div>
            <div className="text-sm text-gray-500">Severity data</div>
          </Link>
          <Link href="/tools/risk-context" className="bg-white rounded-xl p-4 hover:shadow-md transition-shadow border border-gray-200">
            <div className="font-medium text-gray-900">Risk Context Tool →</div>
            <div className="text-sm text-gray-500">Put risks in perspective</div>
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">More Side Effect Guides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/fever-after-vaccination" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Fever After Vaccination</div>
            <div className="text-sm text-gray-500">Normal vs concerning</div>
          </Link>
          <Link href="/myocarditis" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Myocarditis</div>
            <div className="text-sm text-gray-500">Heart inflammation risk</div>
          </Link>
          <Link href="/side-effects" className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">All Side Effects</div>
            <div className="text-sm text-gray-500">Complete guide</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
