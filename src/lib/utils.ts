export function formatNumber(num: number): string {
  return num.toLocaleString('en-US')
}

/**
 * Clean up raw VAERS vaccine names into human-friendly display names.
 * e.g. "COVID19 (COVID19 (PFIZER-BIONTECH))" → "COVID-19 Vaccine"
 *      "INFLUENZA (SEASONAL) (FLUVIRIN)" → "Influenza, Seasonal (Fluvirin)"
 *      "DTAP (NO BRAND NAME)" → "DTaP"
 */
export function getCleanVaccineName(rawName: string): string {
  if (!rawName) return rawName

  // Known full-name overrides (exact match)
  const exactOverrides: Record<string, string> = {
    'COVID19 (COVID19 (PFIZER-BIONTECH))': 'COVID-19 Vaccine',
    'COVID19 (COVID19 (MODERNA BIVALENT))': 'COVID-19 Bivalent (Moderna)',
    'VACCINE NOT SPECIFIED (NO BRAND NAME)': 'Vaccine Not Specified',
  }
  if (exactOverrides[rawName]) return exactOverrides[rawName]

  // Type-to-clean-name map for the VAERS type prefix
  const typeMap: Record<string, string> = {
    'COVID19': 'COVID-19',
    'VARZOS': 'Zoster Live',
    'FLU3': 'Influenza, Seasonal',
    'FLU4': 'Influenza, Seasonal',
    'FLUX': 'Influenza, Seasonal',
    'FLUC3': 'Influenza, Seasonal',
    'FLUC4': 'Influenza, Seasonal',
    'FLUN3': 'Influenza, Seasonal',
    'FLUN4': 'Influenza, Seasonal',
    'FLUA3': 'Influenza, Seasonal',
    'FLUA4': 'Influenza, Seasonal',
    'FLUR3': 'Influenza, Seasonal',
    'FLUR4': 'Influenza, Seasonal',
    'FLU(H1N1)': 'Influenza (H1N1)',
    'FLUN(H1N1)': 'Influenza (H1N1)',
    'FLUX(H1N1)': 'Influenza (H1N1)',
    'HEP': 'Hepatitis B',
    'HEPA': 'Hepatitis A',
    'HEPAB': 'Hepatitis A + B',
    'HPV4': 'HPV',
    'HPV9': 'HPV',
    'HPV2': 'HPV',
    'HPVX': 'HPV',
    'MMR': 'Measles, Mumps & Rubella',
    'MMRV': 'Measles, Mumps, Rubella & Varicella',
    'VARCEL': 'Varicella',
    'PPV': 'Pneumococcal',
    'PNC': 'Pneumococcal',
    'PNC13': 'Pneumococcal',
    'PNC15': 'Pneumococcal',
    'PNC20': 'Pneumococcal',
    'PNC21': 'Pneumococcal',
    'PNC10': 'Pneumococcal',
    'DTAP': 'DTaP',
    'TDAP': 'Tdap',
    'DTP': 'DTP',
    'DT': 'DT',
    'TD': 'Td',
    'DTOX': 'Diphtheria Toxoid',
    'TTOX': 'Tetanus Toxoid',
    'HIBV': 'Hib',
    'HBPV': 'Hib Polysaccharide',
    'HBHEPB': 'Hib + Hepatitis B',
    'MNQ': 'Meningococcal Conjugate',
    'MENB': 'Meningococcal B',
    'MEN': 'Meningococcal',
    'MNC': 'Meningococcal C',
    'MNP': 'Meningococcal Conjugate',
    'MNQHIB': 'Meningococcal C&Y + Hib',
    'MENHIB': 'Meningococcal Conjugate + Hib',
    'IPV': 'Polio (Inactivated)',
    'OPV': 'Polio (Oral)',
    'RV5': 'Rotavirus',
    'RV1': 'Rotavirus',
    'RVX': 'Rotavirus',
    'RV': 'Rotavirus',
    'ANTH': 'Anthrax',
    'RAB': 'Rabies',
    'YF': 'Yellow Fever',
    'SMALL': 'Smallpox',
    'SMALLMNK': 'Smallpox + Monkeypox',
    'RSV': 'RSV',
    'LYME': 'Lyme Disease',
    'BCG': 'BCG',
    'CHOL': 'Cholera',
    'CHIK': 'Chikungunya',
    'DF': 'Dengue',
    'EBZR': 'Ebola Zaire',
    'TBE': 'Tick-Borne Encephalitis',
    'PLAGUE': 'Plague',
    'JEV': 'Japanese Encephalitis',
    'JEV1': 'Japanese Encephalitis',
    'JEVX': 'Japanese Encephalitis',
    'TYP': 'Typhoid',
    'PER': 'Pertussis',
    'MEA': 'Measles',
    'RUB': 'Rubella',
    'MU': 'Mumps',
    'MM': 'Measles + Mumps',
    'MER': 'Measles + Rubella',
    'MUR': 'Mumps + Rubella',
    'UNK': 'Vaccine Not Specified',
  }

  // Try to parse "TYPE (BRAND)" or "TYPE_WITH_PARENS (BRAND)"
  // Pattern: some vaccines have type like "INFLUENZA (SEASONAL)" then "(BRAND)"
  // General format: everything before last parenthesized group is type, last parens is brand
  
  // First, extract brand from the last parenthesized section
  let type = rawName
  let brand = ''

  // Match the last top-level parenthesized group
  const lastParenMatch = rawName.match(/^(.+?)\s*\(([^()]+(?:\([^()]*\))?[^()]*)\)\s*$/)
  if (lastParenMatch) {
    type = lastParenMatch[1].trim()
    brand = lastParenMatch[2].trim()
  }

  // Handle nested redundancy: brand like "COVID19 (PFIZER-BIONTECH)" → just "PFIZER-BIONTECH"
  const nestedMatch = brand.match(/^[A-Z0-9]+\s*\((.+)\)$/)
  if (nestedMatch) {
    brand = nestedMatch[1].trim()
  }

  // Remove "NO BRAND NAME"
  if (brand.toUpperCase() === 'NO BRAND NAME') {
    brand = ''
  }

  // Title-case brand
  const titleCase = (s: string): string => {
    if (!s) return s
    // Preserve known acronyms/brands
    const preserveUpper = ['II', 'III', 'IV', 'VI', 'VII', 'VIII', 'IPV', 'OPV', 'DTP', 'DTAP', 'DTaP', 'TDAP', 'HIB', 'BCG', 'MMR', 'MMRV', 'HPV', 'HEP', 'RSV', 'YF', 'PCV', 'MR']
    return s.split(/(\s+|-)/).map(word => {
      if (preserveUpper.includes(word.toUpperCase())) return word.toUpperCase()
      if (word.length <= 1) return word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    }).join('')
  }

  // Clean up type: check typeMap first, then try to match type prefix
  // For combo vaccines like "DTAP + HEPB + IPV", use the raw name's type portion
  let cleanType = type

  // Check if the raw type portion (before brand) matches a known map entry by looking at common patterns
  // But we don't have the VAERS type code here, so we match on the display type text
  const typeUpper = type.toUpperCase()
  
  // Build reverse lookup from known type names
  const displayTypeMap: Record<string, string> = {
    'COVID19': 'COVID-19',
    'ZOSTER LIVE': 'Zoster Live',
    'INFLUENZA (SEASONAL)': 'Influenza, Seasonal',
    'INFLUENZA (H1N1)': 'Influenza (H1N1)',
    'VARICELLA': 'Varicella',
    'MEASLES + MUMPS + RUBELLA': 'Measles, Mumps & Rubella',
    'MEASLES + MUMPS + RUBELLA + VARICELLA': 'Measles, Mumps, Rubella & Varicella',
    'HEP B': 'Hepatitis B',
    'HEP A': 'Hepatitis A',
    'HEP A + HEP B': 'Hepatitis A + B',
    'HEP A + TYP': 'Hepatitis A + Typhoid',
    'PNEUMO': 'Pneumococcal',
    'DTAP': 'DTaP',
    'TDAP': 'Tdap',
    'DTP': 'DTP',
    'DT ADSORBED': 'DT',
    'DT + IPV': 'DT + IPV',
    'TD ADSORBED': 'Td',
    'TETANUS TOXOID': 'Tetanus Toxoid',
    'DIPHTHERIA TOXOIDS': 'Diphtheria Toxoid',
    'DIPHTHERIA TOXOID + PERTUSSIS + IPV': 'Diphtheria + Pertussis + IPV',
    'HIB': 'Hib',
    'HIB POLYSACCHARIDE': 'Hib Polysaccharide',
    'HIB + HEP B': 'Hib + Hepatitis B',
    'MENINGOCOCCAL CONJUGATE': 'Meningococcal Conjugate',
    'MENINGOCOCCAL B': 'Meningococcal B',
    'MENINGOCOCCAL': 'Meningococcal',
    'MENINGOCOCCAL C & Y + HIB': 'Meningococcal C&Y + Hib',
    'MENINGOCOCCAL CONJUGATE + HIB': 'Meningococcal Conjugate + Hib',
    'POLIO VIRUS, INACT.': 'Polio (Inactivated)',
    'POLIO VIRUS, ORAL': 'Polio (Oral)',
    'ROTAVIRUS': 'Rotavirus',
    'ANTHRAX': 'Anthrax',
    'RABIES': 'Rabies',
    'YELLOW FEVER': 'Yellow Fever',
    'SMALLPOX': 'Smallpox',
    'SMALLPOX + MONKEYPOX': 'Smallpox + Monkeypox',
    'RSV': 'RSV',
    'LYME': 'Lyme Disease',
    'BCG': 'BCG',
    'CHOLERA': 'Cholera',
    'CHIKUNGUNYA LIVE': 'Chikungunya',
    'DENGUE TETRAVALENT': 'Dengue',
    'EBOLA ZAIRE': 'Ebola',
    'TICK-BORNE ENCEPH': 'Tick-Borne Encephalitis',
    'PLAGUE': 'Plague',
    'JAPANESE ENCEPHALITIS': 'Japanese Encephalitis',
    'TYPHOID VI POLYSACCHARIDE': 'Typhoid',
    'HPV': 'HPV',
    'PERTUSSIS': 'Pertussis',
    'MEASLES': 'Measles',
    'RUBELLA': 'Rubella',
    'MUMPS': 'Mumps',
    'MEASLES + MUMPS': 'Measles + Mumps',
    'MEASLES + RUBELLA': 'Measles + Rubella',
    'MUMPS + RUBELLA': 'Mumps + Rubella',
    'VACCINE NOT SPECIFIED': 'Vaccine Not Specified',
    'ADENOVIRUS TYPES 4 & 7, LIVE, ORAL': 'Adenovirus Types 4 & 7',
    'ADENOVIRUS': 'Adenovirus',
    'SUMMER/SPRING ENCEPH': 'Summer/Spring Encephalitis',
    'FSME-IMMUN.': 'FSME-Immun',
    'TDAP + IPV': 'Tdap + IPV',
    'DP + IPV': 'DP + IPV',
    'DTP + HIB': 'DTP + Hib',
    'DTP + IPV': 'DTP + IPV',
    'DTP + HEP B': 'DTP + Hepatitis B',
    'DTP + IPV + ACT-HIB': 'DTP + IPV + Hib',
    'DTAP + HIB': 'DTaP + Hib',
    'DTAP + HEPB + IPV': 'DTaP + Hepatitis B + IPV',
    'DTAP + IPV': 'DTaP + IPV',
    'DTAP + IPV + HIB': 'DTaP + IPV + Hib',
    'DTAP+HEPB+IPV+HIB': 'DTaP + Hepatitis B + IPV + Hib',
    'DTAP+IPV+HIB+HEPB': 'DTaP + IPV + Hib + Hepatitis B',
    'DT+IPV+HIB+HEPB': 'DT + IPV + Hib + Hepatitis B',
    'H5N1': 'Influenza (H5N1)',
    'INFLUENZA (SEASONAL) (PANDEMIC FLU VACCINE (H5N1))': 'Influenza (H5N1)',
  }

  const matchedType = displayTypeMap[typeUpper]
  if (matchedType) {
    cleanType = matchedType
  } else {
    // Fallback: title-case the type
    cleanType = titleCase(type)
  }

  // Title-case brand
  const cleanBrand = titleCase(brand)

  if (cleanBrand) {
    return `${cleanType} (${cleanBrand})`
  }
  return cleanType
}

/**
 * Format raw VAERS manufacturer names into human-friendly display names.
 * e.g. "PFIZER\BIONTECH" → "Pfizer / BioNTech"
 */
export function formatManufacturer(name: string): string {
  if (!name) return name

  const knownMappings: Record<string, string> = {
    'PFIZER\\BIONTECH': 'Pfizer / BioNTech',
    'MERCK & CO. INC.': 'Merck & Co.',
    'GLAXOSMITHKLINE BIOLOGICALS': 'GlaxoSmithKline',
    'SANOFI PASTEUR': 'Sanofi Pasteur',
    'UNKNOWN MANUFACTURER': 'Unknown Manufacturer',
    'MODERNA': 'Moderna',
    'JANSSEN': 'Janssen',
    'NOVARTIS VACCINES AND DIAGNOSTICS': 'Novartis',
    'MEDIMMUNE VACCINES, INC.': 'MedImmune',
    'LEDERLE LABORATORIES': 'Lederle Laboratories',
    'WYETH': 'Wyeth',
    'CSL LIMITED': 'CSL Limited',
    'CONNAUGHT LABORATORIES': 'Connaught Laboratories',
    'BERNA BIOTECH, LTD': 'Berna Biotech',
    'NORTH AMERICAN VACCINE, INC.': 'North American Vaccine',
    'NABI (NORTH AMERICAN BIOLOGICALS, INC.)': 'NABI',
    'EMERGENT BIOSOLUTIONS': 'Emergent BioSolutions',
    'DYNAVAX TECHNOLOGIES CORPORATION': 'Dynavax',
    'SEQIRUS, INC.': 'Seqirus',
    'PROTEIN SCIENCES': 'Protein Sciences',
    'BAVARIAN NORDIC': 'Bavarian Nordic',
    'MASS. PUB HLTH BIOL LAB': 'Mass. Public Health Bio Lab',
  }

  const upper = name.toUpperCase()
  // Check exact match (case-insensitive)
  for (const [key, value] of Object.entries(knownMappings)) {
    if (upper === key.toUpperCase()) return value
  }

  // Generic: replace backslash, convert to title case
  return name
    .replace(/\\/g, ' / ')
    .split(/\s+/)
    .map(word => {
      if (word === '/') return '/'
      if (word.length <= 2 && word.toUpperCase() === word) return word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(' ')
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const words = text.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
