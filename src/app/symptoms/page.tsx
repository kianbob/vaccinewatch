import { Metadata } from 'next'
import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber, slugify } from '@/lib/utils'
import SymptomsList from './SymptomsList'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'

export const metadata: Metadata = {
  title: 'All 500 Symptoms Reported After Vaccination — VAERS Data',
  description: 'Browse all 500 symptoms reported in VAERS after vaccination. Sortable by frequency, deaths, hospitalizations, and severity rate. From pyrexia to myocarditis.',
  openGraph: {
    title: 'All 500 Symptoms Reported After Vaccination — VAERS Data',
    description: 'Browse all 500 symptoms reported in VAERS after vaccination. Sortable by frequency, deaths, hospitalizations, and severity rate. From pyrexia to myocarditis.',
  },
}

interface Symptom {
  name: string
  reports: number
  died: number
  hosp: number
}

export default function SymptomsPage() {
  const symptoms: Symptom[] = readJsonFile('symptom-index.json')

  const stats = readJsonFile('stats.json')
  const totalReports = stats?.totalReports || 1983260
  const totalDeaths = stats?.totalDied || 27732
  const totalHosp = stats?.totalHospitalized || 143653

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />
      <Breadcrumbs items={[{ label: 'Symptoms' }]} />

      {/* Header */}
      <div className="mb-8">
        <h1 className={`text-4xl md:text-5xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          All Symptoms in VAERS
        </h1>
        <p className="text-lg text-gray-600 max-w-4xl mb-4">
          Complete list of {formatNumber(symptoms.length)} symptoms reported in VAERS adverse event reports.
          Click any symptom to see which vaccines are most associated and detailed analysis.
        </p>
        <p className="text-sm text-gray-500 max-w-4xl">
          Symptoms in VAERS are reported using MedDRA (Medical Dictionary for Regulatory Activities) terms.
          Common symptoms like headache, fever, and fatigue appear frequently because they are general reactions
          reported across many vaccine types. Severity rates help distinguish common mild reactions from rare serious events.
        </p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(symptoms.length)}
          </div>
          <div className="text-sm font-medium text-primary">Unique Symptoms</div>
          <div className="text-xs text-gray-500 mt-1">Reported to VAERS</div>
        </div>

        <div className="bg-gradient-to-br from-accent/5 to-accent/10 border border-accent/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(totalReports)}
          </div>
          <div className="text-sm font-medium text-accent">Total Reports</div>
          <div className="text-xs text-gray-500 mt-1">All symptoms combined</div>
        </div>

        <div className="bg-gradient-to-br from-danger/5 to-danger/10 border border-danger/20 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(totalDeaths)}
          </div>
          <div className="text-sm font-medium text-danger">Deaths</div>
          <div className="text-xs text-gray-500 mt-1">With these symptoms</div>
        </div>

        <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
          <div className="text-2xl font-bold text-gray-900">
            {formatNumber(totalHosp)}
          </div>
          <div className="text-sm font-medium text-gray-800">Hospitalizations</div>
          <div className="text-xs text-gray-500 mt-1">Serious outcomes</div>
        </div>
      </div>

      {/* Key Insights */}
      {(() => {
        const sorted = [...symptoms].sort((a, b) => b.reports - a.reports)
        const top1 = sorted[0]
        const top1Pct = ((top1?.reports || 0) / totalReports * 100).toFixed(0)
        const seriousSymptoms = symptoms.filter(s => s.reports > 500 && (s.died + s.hosp) / s.reports > 0.3)
        const mildSymptoms = symptoms.filter(s => s.reports > 10000 && (s.died + s.hosp) / s.reports < 0.05)
        return (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
            <h2 className={`text-xl font-bold text-amber-900 mb-4 ${playfairDisplay.className}`}>💡 Key Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-amber-900">
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-600 mt-0.5">→</span>
                <span><strong>The top 10 symptoms account for the vast majority of reports.</strong> Fever ({top1 ? formatNumber(top1.reports) : '—'} reports, {top1Pct}% of all), headache, and injection site pain dominate — these are expected immune responses, not safety signals.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-600 mt-0.5">→</span>
                <span><strong>Severity rate is the key metric.</strong> A symptom with 100,000 reports but 0.5% severity is far less concerning than one with 500 reports and 50% severity. Sort by severity rate to find the most clinically significant events.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-600 mt-0.5">→</span>
                <span><strong>{formatNumber(mildSymptoms.length)} symptoms have severity rates under 5%</strong> — these are mostly mild, self-limiting reactions. Meanwhile, {formatNumber(seriousSymptoms.length)} symptoms have severity rates above 30%, representing genuinely serious medical events.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-amber-600 mt-0.5">→</span>
                <span><strong>Symptom terms can be misleading.</strong> &quot;Death&quot; appears as a symptom because VAERS codes it that way — it doesn&apos;t mean a vaccine caused the death. Similarly, &quot;product administered to patient of inappropriate age&quot; is an error report, not an adverse reaction.</span>
              </div>
            </div>
          </div>
        )
      })()}

      {/* Table */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Browse All Symptoms
        </h2>
        <SymptomsList symptoms={symptoms} />
      </div>

      {/* Top Symptoms Highlight */}
      <div className="bg-gray-50 rounded-xl p-8 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Most Frequently Reported Symptoms
        </h3>
        <p className="text-gray-600 mb-6">
          These symptoms appear most often in VAERS reports. Common symptoms like headache and pain
          are expected given their general nature.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {symptoms
            .sort((a, b) => b.reports - a.reports)
            .slice(0, 9)
            .map((symptom, index) => (
              <Link
                key={symptom.name}
                href={`/symptoms/${slugify(symptom.name)}`}
                className="bg-white p-4 rounded-xl border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-gray-900 text-sm leading-tight">{index + 1}. {symptom.name}</div>
                </div>
                <div className="text-sm space-y-1">
                  <div>
                    <span className="font-semibold text-primary">{formatNumber(symptom.reports)}</span>
                    <span className="text-gray-500"> reports</span>
                  </div>
                  {symptom.died > 0 && (
                    <div className="text-xs text-danger">
                      {formatNumber(symptom.died)} deaths
                    </div>
                  )}
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* Context Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          Understanding Symptom Data
        </h3>
        <div className="text-blue-800 space-y-2 text-sm">
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>
              <strong>Common symptoms</strong> like headache, fatigue, and pain appear frequently
              because they&apos;re reported often for many conditions
            </span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>
              <strong>Severity rates</strong> show the percentage of reports with deaths or hospitalizations,
              but this doesn&apos;t indicate vaccine causation
            </span>
          </div>
          <div className="flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span>
              <strong>Medical terms</strong> may be used inconsistently across different reporters
              and time periods
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
