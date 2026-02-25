import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import { GenderChartsClient as GenderCharts } from '@/components/ClientCharts'

export const metadata: Metadata = {
  title: 'Gender Disparities in VAERS Reporting',
  description: 'Why 59% of VAERS reports come from women — exploring gender patterns in vaccine adverse event reporting.'
}

export default function GenderPatternsPage() {
  const ageGender = readJsonFile('age-gender.json')
  const gender = ageGender.gender
  const total = gender.M + gender.F + gender.U
  const femalePercent = ((gender.F / total) * 100).toFixed(0)
  const malePercent = ((gender.M / total) * 100).toFixed(0)

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />

      <div className="mb-6 text-sm text-gray-500">
        <Link href="/analysis" className="hover:text-primary">Analysis</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">Gender Patterns</span>
      </div>

      <div className="mb-12">
        <div className="text-xs font-medium text-accent uppercase tracking-wider mb-2">5 min read</div>
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Gender Disparities in Reporting
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Women file {femalePercent}% of all VAERS reports — nearly twice as many as men. Why?
        </p>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-accent/5 border border-accent/20 rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-accent">{formatNumber(gender.F)}</div>
            <div className="text-gray-700 text-sm font-medium">Female ({femalePercent}%)</div>
          </div>
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-primary">{formatNumber(gender.M)}</div>
            <div className="text-gray-700 text-sm font-medium">Male ({malePercent}%)</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 text-center">
            <div className="text-3xl font-bold text-gray-600">{formatNumber(gender.U)}</div>
            <div className="text-gray-700 text-sm font-medium">Unknown ({((gender.U / total) * 100).toFixed(0)}%)</div>
          </div>
        </div>
      </div>

      <div className="mb-12">
        <GenderCharts genderData={gender} />
      </div>

      <div className="prose prose-lg max-w-none mb-12">
        <h2 className={playfairDisplay.className}>Why Do Women Report More?</h2>
        <p>
          The gender gap in VAERS reporting is not unique — it&apos;s consistent with broader patterns
          in healthcare utilization and adverse drug reaction reporting worldwide. Several factors contribute:
        </p>
        <ul>
          <li><strong>Healthcare engagement:</strong> Women are more likely to visit healthcare providers, seek preventive care, and receive vaccines — creating more opportunities for reporting</li>
          <li><strong>Immune response differences:</strong> Research suggests women may experience stronger immune responses to vaccines, potentially leading to more noticeable side effects</li>
          <li><strong>Reporting behavior:</strong> Studies consistently show women are more likely to report adverse drug reactions across all medication categories, not just vaccines</li>
          <li><strong>Pregnancy-related reporting:</strong> Vaccines given during pregnancy generate additional reporting from both the patient and their healthcare provider</li>
          <li><strong>Occupational exposure:</strong> Women represent a majority of healthcare workers, who are often required to receive certain vaccines and report adverse events</li>
        </ul>

        <h2 className={playfairDisplay.className}>Gender and Outcome Severity</h2>
        <p>
          While women file more reports overall, the rate of serious outcomes (deaths, hospitalizations) per report
          tends to be similar across genders. This suggests the gender gap is primarily in reporting behavior,
          not in the severity of adverse events experienced.
        </p>
        <p>
          The {formatNumber(gender.U)} reports with unknown gender ({((gender.U / total) * 100).toFixed(0)}%) represent
          a significant data limitation. Many older reports and manufacturer-submitted reports do not include gender information.
        </p>
      </div>

      <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 mb-12">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Takeaways</h3>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">1.</span>
            <span>Women file {femalePercent}% of VAERS reports — a pattern consistent with healthcare utilization research</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">2.</span>
            <span>The gender gap reflects reporting behavior differences, not necessarily different safety profiles</span>
          </li>
          <li className="flex items-start">
            <span className="text-accent font-bold mr-2">3.</span>
            <span>Biological, behavioral, and occupational factors all contribute to the disparity</span>
          </li>
        </ul>
      </div>

      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/analysis/age-patterns" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">Age Patterns</div>
            <div className="text-sm text-gray-500">How age affects reporting and outcomes</div>
          </Link>
          <Link href="/analysis/covid-impact" className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="font-medium text-gray-900">COVID-19 Impact</div>
            <div className="text-sm text-gray-500">The pandemic&apos;s effect on reporting</div>
          </Link>
        </div>
      </div>
    </div>
  )
}
