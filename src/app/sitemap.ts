import { MetadataRoute } from 'next'
import { readdirSync } from 'fs'
import { join } from 'path'

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
    { url: `${baseUrl}/compare`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.6 },
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

  return [...staticPages, ...vaccinePages, ...symptomPages]
}
