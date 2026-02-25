import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { readdirSync, existsSync } from 'fs'
import { join } from 'path'
import { playfairDisplay } from '@/lib/fonts'
import { readJsonFile } from '@/lib/server-utils'
import { formatNumber } from '@/lib/utils'
import StatCard from '@/components/StatCard'
import DisclaimerBanner from '@/components/DisclaimerBanner'
import Breadcrumbs from '@/components/Breadcrumbs'

interface VaccineSymptom {
  name: string
  slug: string
  count: number
  died: number
  hosp: number
}

export const dynamicParams = true

export async function generateStaticParams() {
  // Pre-render top 200 per vaccine at build time; rest generated on-demand
  const dir = join(process.cwd(), 'public', 'data', 'vaccine-symptoms')
  const files = readdirSync(dir).filter(f => f.endsWith('.json'))
  const params: Array<{ slug: string; symptom: string }> = []

  for (const file of files) {
    const slug = file.replace('.json', '')
    try {
      const symptoms: VaccineSymptom[] = readJsonFile(`vaccine-symptoms/${slug}.json`)
      const top = symptoms
        .filter(s => s.count >= 3)
        .sort((a, b) => b.count - a.count)
        .slice(0, 20)
      for (const s of top) {
        params.push({ slug, symptom: s.slug })
      }
    } catch {
      // skip
    }
  }

  return params
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; symptom: string }>
}): Promise<Metadata> {
  const { slug, symptom } = await params

  try {
    const symptoms: VaccineSymptom[] = readJsonFile(`vaccine-symptoms/${slug}.json`)
    const match = symptoms.find(s => s.slug === symptom)

    if (!match) {
      return { title: 'Not Found' }
    }

    let vaccineName = slug.toUpperCase()
    let vaccineReports = 0
    try {
      const vaccine = readJsonFile(`vaccines/${slug}.json`)
      vaccineName = vaccine.name
      vaccineReports = vaccine.reports
    } catch { /* use slug */ }

    const pct = vaccineReports > 0 ? (match.count / vaccineReports * 100).toFixed(1) : '0'

    return {
      title: `${match.name} Reports for ${vaccineName} Vaccine`,
      description: `${formatNumber(match.count)} reports of ${match.name} following ${vaccineName} vaccination in VAERS (${pct}% of all reports). Deaths: ${formatNumber(match.died)}, Hospitalizations: ${formatNumber(match.hosp)}.`
    }
  } catch {
    return { title: 'Not Found' }
  }
}

export default async function VaccineSymptomPage({
  params
}: {
  params: Promise<{ slug: string; symptom: string }>
}) {
  const { slug, symptom } = await params

  let symptoms: VaccineSymptom[]
  try {
    symptoms = readJsonFile(`vaccine-symptoms/${slug}.json`)
  } catch {
    notFound()
  }

  const match = symptoms.find(s => s.slug === symptom)
  if (!match) {
    notFound()
  }

  // Get vaccine name
  let vaccineName = slug.toUpperCase()
  let vaccineReports = 0
  try {
    const vaccine = readJsonFile(`vaccines/${slug}.json`)
    vaccineName = vaccine.name
    vaccineReports = vaccine.reports
  } catch { /* use slug */ }

  // Find rank of this symptom
  const sorted = [...symptoms].sort((a, b) => b.count - a.count)
  const rank = sorted.findIndex(s => s.slug === symptom) + 1

  const percentOfVaccine = vaccineReports > 0 ? (match.count / vaccineReports * 100).toFixed(1) : '—'
  const mortalityRate = match.count > 0 ? (match.died / match.count * 100).toFixed(2) : '0.00'
  const hospRate = match.count > 0 ? (match.hosp / match.count * 100).toFixed(1) : '0.0'

  // Get nearby symptoms for context
  const nearby = sorted.slice(Math.max(0, rank - 3), rank + 2).filter(s => s.slug !== symptom)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <DisclaimerBanner />

      <Breadcrumbs items={[{ label: 'Vaccines', href: '/vaccines' }, { label: vaccineName, href: `/vaccines/${slug}` }, { label: match.name }]} />

      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
            {vaccineName}
          </span>
          <span className="text-gray-400">×</span>
          <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-medium">
            {match.name}
          </span>
        </div>
        <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-2 ${playfairDisplay.className}`}>
          {match.name} Reports for {vaccineName}
        </h1>
        <p className="text-lg text-gray-600">
          #{rank} most reported symptom for this vaccine
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <StatCard title="Reports" value={match.count} color="primary" />
        <StatCard title="Deaths" value={match.died} color="danger" />
        <StatCard title="Hospitalizations" value={match.hosp} color="accent" />
        <StatCard title="Mortality Rate" value={parseFloat(mortalityRate)} subtitle="%" color="gray" />
        <StatCard title="Hosp. Rate" value={parseFloat(hospRate)} subtitle="%" color="gray" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {match.name} and {vaccineName}
            </h2>
            <div className="prose prose-lg text-gray-600">
              <p>
                <strong>{match.name}</strong> has been reported <strong>{formatNumber(match.count)}</strong> times in association with {vaccineName} vaccination in VAERS.
                {vaccineReports > 0 && (
                  <> This represents <strong>{percentOfVaccine}%</strong> of all {formatNumber(vaccineReports)} reports for this vaccine.</>
                )}
              </p>
              <p>
                Among these reports, <strong className="text-danger">{formatNumber(match.died)}</strong> mentioned death ({mortalityRate}%) and <strong className="text-accent">{formatNumber(match.hosp)}</strong> involved hospitalization ({hospRate}%).
              </p>
              <p>
                {match.name} is the <strong>#{rank}</strong> most frequently reported symptom for {vaccineName} out of {symptoms.length} total symptoms.
              </p>
            </div>
            <p className="text-sm text-gray-500 mt-4 border-t border-gray-200 pt-4">
              <strong>Disclaimer:</strong> VAERS reports describe events that occurred after vaccination but do not establish that the vaccine caused the event. Many reported symptoms may be coincidental or related to underlying conditions.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">
              Important Context
            </h3>
            <div className="text-blue-800 space-y-3 text-sm">
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Association, not causation:</strong> These reports show {match.name} occurred after vaccination, not that the vaccine caused it.</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Background rates:</strong> {match.name} may occur naturally at baseline rates in the population, unrelated to vaccination.</span>
              </div>
              <div className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span><strong>Anyone can report:</strong> VAERS accepts reports from anyone — patients, parents, healthcare providers — without requiring medical verification.</span>
              </div>
            </div>
          </div>

          {nearby.length > 0 && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Similarly Ranked Symptoms
              </h3>
              <div className="space-y-2">
                {nearby.map(s => (
                  <Link key={s.slug} href={`/vaccines/${slug}/symptoms/${s.slug}`} className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-primary/30 transition-colors">
                    <span className="text-sm font-medium text-gray-900">{s.name}</span>
                    <span className="text-sm text-gray-500">{formatNumber(s.count)} reports</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Reports:</span>
                <span className="font-semibold">{formatNumber(match.count)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Deaths:</span>
                <span className="font-semibold text-danger">{formatNumber(match.died)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Hospitalizations:</span>
                <span className="font-semibold text-accent">{formatNumber(match.hosp)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-gray-600">% of Vaccine:</span>
                <span className="font-semibold">{percentOfVaccine}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rank:</span>
                <span className="font-semibold">#{rank} of {symptoms.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Pages</h3>
            <div className="space-y-3">
              <Link href={`/vaccines/${slug}`} className="block w-full text-center bg-white border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                {vaccineName} Overview
              </Link>
              <Link href={`/symptoms/${symptom}`} className="block w-full text-center bg-white border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
                {match.name} (All Vaccines)
              </Link>
              <Link href="/analysis/top-symptoms" className="block w-full text-center bg-primary text-white rounded-lg py-3 px-4 text-sm font-medium hover:bg-primary/90 transition-colors">
                Top Symptoms Analysis
              </Link>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
            <h4 className="font-semibold text-gray-900 mb-2">Data Source</h4>
            <p>
              This data comes from the{' '}
              <a href="https://vaers.hhs.gov" className="text-primary hover:text-primary/80" target="_blank" rel="noopener noreferrer">
                Vaccine Adverse Event Reporting System (VAERS)
              </a>, jointly managed by CDC and FDA.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
