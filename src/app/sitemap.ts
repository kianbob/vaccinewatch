import { MetadataRoute } from 'next'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'

function readJson(filename: string): any {
  const filePath = join(process.cwd(), 'public', 'data', filename)
  return JSON.parse(readFileSync(filePath, 'utf8'))
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://vaccinewatch.org'

  // Static pages
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 1 },
    { url: `${baseUrl}/vaccines`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/symptoms`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/manufacturers`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/states`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/analysis/covid-impact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/age-patterns`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/gender-patterns`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/reporting-trends`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/myocarditis`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/death-reports`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/top-symptoms`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/pediatric`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/elderly`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/covid-vs-flu`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/manufacturer-landscape`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/geographic-patterns`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/serious-outcomes`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/onset-timing`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/lot-analysis`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/dose-comparison`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/recovery-rates`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/multi-vaccine`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/birth-defects`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/hospital-stays`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/who-reports`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/reporting-bias`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/analysis/denominator-problem`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/tools`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/tools/onset-calculator`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/lot-lookup`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/dose-comparison`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/risk-context`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/age-explorer`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/timeline`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/multi-vaccine`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/admin-routes`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/dose-explorer`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/severity-profile`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/birth-defects`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/recovery-explorer`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/tools/hospital-duration`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/dashboard`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${baseUrl}/side-effects`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/side-effects/covid`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.9 },
    { url: `${baseUrl}/side-effects/flu`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/side-effects/mmr`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/side-effects/hpv`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/side-effects/shingles`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/side-effects/tdap`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/side-effects/hepatitis-b`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/side-effects/mmr`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/side-effects/hpv`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/side-effects/shingles`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/side-effects/tdap`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${baseUrl}/glossary`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
    { url: `${baseUrl}/disclaimer`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.4 },
  ]

  // Vaccine detail pages
  const vaccinesDir = join(process.cwd(), 'public', 'data', 'vaccines')
  const vaccineFiles = readdirSync(vaccinesDir).filter(f => f.endsWith('.json'))
  const vaccinePages = vaccineFiles.map(f => ({
    url: `${baseUrl}/vaccines/${f.replace('.json', '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // Symptom detail pages
  const symptomsDir = join(process.cwd(), 'public', 'data', 'symptoms')
  const symptomFiles = readdirSync(symptomsDir).filter(f => f.endsWith('.json'))
  const symptomPages = symptomFiles.map(f => ({
    url: `${baseUrl}/symptoms/${f.replace('.json', '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Manufacturer detail pages
  const mfrDir = join(process.cwd(), 'public', 'data', 'manufacturer-vaccines')
  const mfrFiles = readdirSync(mfrDir).filter(f => f.endsWith('.json'))
  const mfrPages = mfrFiles.map(f => ({
    url: `${baseUrl}/manufacturers/${f.replace('.json', '')}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // State detail pages
  const stateIndex = readJson('state-index.json')
  const statePages = stateIndex.map((s: any) => ({
    url: `${baseUrl}/states/${s.abbreviation.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Vaccine-year pages
  const vaccineYearPages: MetadataRoute.Sitemap = []
  const vyDir = join(process.cwd(), 'public', 'data', 'vaccine-years')
  const vyFiles = readdirSync(vyDir).filter(f => f.endsWith('.json'))
  for (const file of vyFiles) {
    const slug = file.replace('.json', '')
    try {
      const years = readJson(`vaccine-years/${slug}.json`)
      for (const y of years) {
        if (y.reports >= 1) {
          vaccineYearPages.push({
            url: `${baseUrl}/vaccines/${slug}/${y.year}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.5,
          })
        }
      }
    } catch { /* skip */ }
  }

  // Vaccine-symptom pages (top 50 per vaccine, min 10 reports)
  const vaccineSymptomPages: MetadataRoute.Sitemap = []
  const vsDir = join(process.cwd(), 'public', 'data', 'vaccine-symptoms')
  const vsFiles = readdirSync(vsDir).filter(f => f.endsWith('.json'))
  for (const file of vsFiles) {
    const slug = file.replace('.json', '')
    try {
      const symptoms = readJson(`vaccine-symptoms/${slug}.json`)
      const top = symptoms
        .filter((s: any) => s.count >= 3)
        .sort((a: any, b: any) => b.count - a.count)
        .slice(0, 200)
      for (const s of top) {
        vaccineSymptomPages.push({
          url: `${baseUrl}/vaccines/${slug}/symptoms/${s.slug}`,
          lastModified: new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.4,
        })
      }
    } catch { /* skip */ }
  }

  // Combine all — cap at 49,000 to stay under Google's 50K limit
  const allPages = [
    ...staticPages,
    ...vaccinePages,
    ...symptomPages,
    ...mfrPages,
    ...statePages,
    ...vaccineYearPages,
    ...vaccineSymptomPages,
  ]

  return allPages.slice(0, 49000)
}
