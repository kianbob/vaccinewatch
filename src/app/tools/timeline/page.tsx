import { Metadata } from 'next'
import { playfairDisplay } from '@/lib/fonts'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'
import TimelineClient from './TimelineClient'

export const metadata: Metadata = {
  title: 'VAERS Reporting Timeline - 35 Years of Vaccine Safety Data | VaccineWatch',
  description: 'Interactive timeline of VAERS adverse event reports from 1990-2026. Explore yearly trends in reports, deaths, hospitalizations, and ER visits.'
}

export default function TimelinePage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[
        { label: 'Tools', href: '/tools' },
        { label: 'Reporting Timeline' }
      ]} />

      <h1 className={`${playfairDisplay.className} text-4xl font-bold text-gray-900 mt-4 mb-2`}>
        VAERS Reporting Timeline
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        35 years of vaccine adverse event reporting (1990–2026). Track how reporting patterns 
        have changed over time — from the early days of VAERS through the COVID-19 pandemic and beyond.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary">1990</p>
          <p className="text-sm text-gray-500">VAERS established</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary">37</p>
          <p className="text-sm text-gray-500">years of data</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-danger">2021</p>
          <p className="text-sm text-gray-500">peak reporting year</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-primary">768K</p>
          <p className="text-sm text-gray-500">reports in 2021</p>
        </div>
      </div>

      <TimelineClient />

      <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
        <h3 className="font-bold text-amber-900 mb-2">⚠️ Understanding Reporting Trends</h3>
        <ul className="text-sm text-amber-800 space-y-2">
          <li>• <strong>More reports ≠ more danger.</strong> The 2021 spike reflects COVID-19 vaccine rollout to hundreds of millions of people, plus heightened public awareness.</li>
          <li>• <strong>Reporting awareness changes over time.</strong> Public health campaigns, media coverage, and legal requirements all influence filing rates.</li>
          <li>• <strong>The system is passive.</strong> Reports are voluntary, so trends reflect reporting behavior as much as actual adverse events.</li>
          <li>• <strong>Pre-2021 baseline</strong> was roughly 30,000-50,000 reports per year for all vaccines combined.</li>
        </ul>
      </div>

      <div className="mt-8 p-6 bg-gray-50 rounded-xl">
        <h3 className={`${playfairDisplay.className} text-xl font-bold mb-3`}>Related Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <a href="/analysis/covid-impact" className="text-primary hover:text-primary/80 text-sm">→ COVID-19 Impact on VAERS</a>
          <a href="/analysis/reporting-trends" className="text-primary hover:text-primary/80 text-sm">→ Reporting Trends Analysis</a>
          <a href="/analysis/reporting-bias" className="text-primary hover:text-primary/80 text-sm">→ Understanding Reporting Bias</a>
          <a href="/analysis/denominator-problem" className="text-primary hover:text-primary/80 text-sm">→ The Denominator Problem</a>
        </div>
      </div>
    </div>
  )
}
