'use client';

import { useState, useEffect, useMemo } from 'react';

interface Signal {
  vaccine: string;
  vaccineName: string;
  symptom: string;
  symptomSlug: string;
  observed: number;
  vaccineTotal: number;
  expectedRate: number;
  PRR: number;
  chi2: number;
  reportingRate: number;
}

interface SignalData {
  _meta: {
    description: string;
    methodology: string;
    interpretation: string;
    limitations: string[];
    totalSignals: number;
    vaccinesAnalyzed: number;
  };
  topSignals: Signal[];
  byVaccine: Record<string, Signal[]>;
}

export default function SignalDetectionClient() {
  const [data, setData] = useState<SignalData | null>(null);
  const [selectedVaccine, setSelectedVaccine] = useState('ALL');
  const [minReports, setMinReports] = useState(50);
  const [sortBy, setSortBy] = useState<'PRR' | 'observed' | 'chi2'>('PRR');
  const [showMethodology, setShowMethodology] = useState(false);

  useEffect(() => {
    fetch('/data/signal-detection.json').then(r => r.json()).then(setData);
  }, []);

  const vaccineOptions = useMemo(() => {
    if (!data) return [];
    return Object.entries(data.byVaccine)
      .map(([type, signals]) => ({
        type,
        name: signals[0]?.vaccineName?.split('(')[0]?.trim() || type,
        signalCount: signals.length,
      }))
      .sort((a, b) => b.signalCount - a.signalCount);
  }, [data]);

  const filteredSignals = useMemo(() => {
    if (!data) return [];
    let signals: Signal[];
    if (selectedVaccine === 'ALL') {
      signals = data.topSignals;
    } else {
      signals = data.byVaccine[selectedVaccine] || [];
    }
    return signals
      .filter(s => s.observed >= minReports)
      .sort((a, b) => {
        if (sortBy === 'PRR') return b.PRR - a.PRR;
        if (sortBy === 'observed') return b.observed - a.observed;
        return b.chi2 - a.chi2;
      });
  }, [data, selectedVaccine, minReports, sortBy]);

  // Summary stats
  const summaryStats = useMemo(() => {
    if (!data) return null;
    const allSignals = Object.values(data.byVaccine).flat();
    const knownSignals = allSignals.filter(s =>
      // Well-known vaccine safety signals
      (s.vaccine === 'RV5' && s.symptom === 'Intussusception') ||
      (s.vaccine === 'COVID19' && s.symptom.toLowerCase().includes('myocarditis')) ||
      (s.vaccine === 'COVID19' && s.symptom.toLowerCase().includes('thrombosis')) ||
      (s.vaccine === 'VARCEL' && s.symptom.toLowerCase().includes('varicella')) ||
      (s.vaccine === 'VARZOS' && s.symptom.toLowerCase().includes('herpes'))
    );
    return {
      total: data._meta.totalSignals,
      vaccines: data._meta.vaccinesAnalyzed,
      strongSignals: allSignals.filter(s => s.PRR >= 10 && s.observed >= 100).length,
      knownSignals: knownSignals.length,
    };
  }, [data]);

  if (!data) {
    return <div className="text-center py-12 text-gray-500">Loading signal detection data...</div>;
  }

  const getPRRColor = (prr: number) => {
    if (prr >= 100) return 'text-red-600 font-bold';
    if (prr >= 10) return 'text-amber-600 font-semibold';
    if (prr >= 5) return 'text-yellow-600';
    return 'text-gray-700';
  };

  const getPRRBadge = (prr: number) => {
    if (prr >= 100) return { label: 'Very Strong', cls: 'bg-red-100 text-red-700' };
    if (prr >= 10) return { label: 'Strong', cls: 'bg-amber-100 text-amber-700' };
    if (prr >= 5) return { label: 'Moderate', cls: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Mild', cls: 'bg-gray-100 text-gray-600' };
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      {summaryStats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-primary">{summaryStats.total.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Signals Detected</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-accent">{summaryStats.vaccines}</div>
            <div className="text-sm text-gray-500">Vaccines Analyzed</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-amber-600">{summaryStats.strongSignals}</div>
            <div className="text-sm text-gray-500">Strong Signals (PRR≥10, n≥100)</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{summaryStats.knownSignals}</div>
            <div className="text-sm text-gray-500">Known Safety Signals</div>
          </div>
        </div>
      )}

      {/* Methodology Toggle */}
      <div className="bg-primary/5 rounded-xl border border-primary/20 p-5">
        <button
          onClick={() => setShowMethodology(!showMethodology)}
          className="flex items-center gap-2 text-primary font-semibold w-full text-left"
        >
          <span>{showMethodology ? '▼' : '▶'}</span>
          <span>What is PRR? How to read this dashboard</span>
        </button>
        {showMethodology && (
          <div className="mt-4 text-sm text-gray-700 space-y-3">
            <p>
              <strong>Proportional Reporting Ratio (PRR)</strong> measures whether a specific adverse event
              is reported more frequently for one vaccine compared to all other vaccines in VAERS.
            </p>
            <p>
              <strong>PRR = 2</strong> means the symptom is reported <em>twice as often</em> for this vaccine
              compared to others. <strong>PRR = 10</strong> means 10× as often.
            </p>
            <p>
              <strong>How to interpret:</strong>
            </p>
            <ul className="list-disc ml-4 space-y-1">
              <li><strong>PRR &lt; 2:</strong> No signal — reporting rate similar to other vaccines</li>
              <li><strong>PRR 2-5:</strong> Mild signal — somewhat elevated, needs context</li>
              <li><strong>PRR 5-10:</strong> Moderate signal — notably disproportionate</li>
              <li><strong>PRR 10-100:</strong> Strong signal — distinctly associated with this vaccine</li>
              <li><strong>PRR &gt; 100:</strong> Very strong signal — highly specific to this vaccine</li>
            </ul>
            <p className="text-amber-700 font-medium">
              ⚠️ A signal is NOT proof of causation. It means &quot;this deserves investigation.&quot;
              Many known, confirmed vaccine side effects show up as strong PRR signals — validating
              this approach. But signals can also be artifacts of reporting patterns.
            </p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Vaccine</label>
          <select
            value={selectedVaccine}
            onChange={e => setSelectedVaccine(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary"
          >
            <option value="ALL">All Vaccines — Top 100 Signals</option>
            {vaccineOptions.map(v => (
              <option key={v.type} value={v.type}>
                {v.name} ({v.signalCount} signals)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Reports</label>
          <select
            value={minReports}
            onChange={e => setMinReports(Number(e.target.value))}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary"
          >
            <option value={10}>10+ reports</option>
            <option value={50}>50+ reports</option>
            <option value={100}>100+ reports</option>
            <option value={500}>500+ reports</option>
            <option value={1000}>1,000+ reports</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value as any)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary"
          >
            <option value="PRR">PRR (Signal Strength)</option>
            <option value="observed">Report Count</option>
            <option value="chi2">Statistical Significance (χ²)</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">
        Showing {filteredSignals.length} signals
        {selectedVaccine !== 'ALL' && ` for ${vaccineOptions.find(v => v.type === selectedVaccine)?.name}`}
      </p>

      {/* Signal Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-gray-200 bg-gray-50">
              <th className="text-left py-3 px-3">Vaccine</th>
              <th className="text-left py-3 px-3">Adverse Event</th>
              <th className="text-right py-3 px-3 cursor-pointer hover:text-primary" onClick={() => setSortBy('PRR')}>
                PRR {sortBy === 'PRR' && '↓'}
              </th>
              <th className="text-right py-3 px-3 cursor-pointer hover:text-primary" onClick={() => setSortBy('observed')}>
                Reports {sortBy === 'observed' && '↓'}
              </th>
              <th className="text-right py-3 px-3 cursor-pointer hover:text-primary" onClick={() => setSortBy('chi2')}>
                χ² {sortBy === 'chi2' && '↓'}
              </th>
              <th className="text-center py-3 px-3">Strength</th>
            </tr>
          </thead>
          <tbody>
            {filteredSignals.slice(0, 100).map((sig, i) => {
              const badge = getPRRBadge(sig.PRR);
              return (
                <tr key={`${sig.vaccine}-${sig.symptom}-${i}`} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2.5 px-3">
                    <a href={`/vaccines/${sig.vaccine.toLowerCase()}`} className="text-primary hover:underline">
                      {sig.vaccineName?.split('(')[0]?.trim() || sig.vaccine}
                    </a>
                  </td>
                  <td className="py-2.5 px-3">
                    <a href={`/symptoms/${sig.symptomSlug}`} className="text-accent hover:underline">
                      {sig.symptom}
                    </a>
                  </td>
                  <td className={`py-2.5 px-3 text-right ${getPRRColor(sig.PRR)}`}>
                    {sig.PRR > 1000 ? sig.PRR.toFixed(0) : sig.PRR.toFixed(1)}×
                  </td>
                  <td className="py-2.5 px-3 text-right">{sig.observed.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right">{sig.chi2 > 1000 ? (sig.chi2 / 1000).toFixed(0) + 'K' : sig.chi2.toFixed(1)}</td>
                  <td className="py-2.5 px-3 text-center">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${badge.cls}`}>
                      {badge.label}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filteredSignals.length > 100 && (
        <p className="text-sm text-gray-500 text-center">Showing top 100 of {filteredSignals.length} signals</p>
      )}

      {/* Known Signals Validation */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-5">
        <h4 className="font-semibold text-green-800 flex items-center gap-2 mb-3">
          ✅ Validation: Known Safety Signals Detected
        </h4>
        <p className="text-sm text-green-700 mb-3">
          This analysis correctly identifies several well-known, confirmed vaccine safety signals — 
          validating the methodology:
        </p>
        <ul className="text-sm text-green-700 space-y-1.5">
          <li>• <strong>Rotavirus → Intussusception</strong> — Known risk, led to RotaShield withdrawal in 1999</li>
          <li>• <strong>COVID mRNA → Myocarditis</strong> — Confirmed especially in young males after dose 2</li>
          <li>• <strong>COVID (J&J) → Thrombosis</strong> — Confirmed rare blood clotting syndrome (TTS)</li>
          <li>• <strong>Varicella → Varicella post vaccine</strong> — Known mild breakthrough infection risk</li>
          <li>• <strong>Zostavax → Post-herpetic neuralgia</strong> — Known association, one reason Shingrix replaced it</li>
        </ul>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h4 className="font-semibold text-amber-800 flex items-center gap-2 mb-2">
          ⚠️ Important Limitations
        </h4>
        <ul className="text-sm text-amber-700 space-y-1.5">
          <li>• <strong>Signal ≠ Causation:</strong> PRR identifies disproportionate reporting, not confirmed side effects. Many signals have innocent explanations.</li>
          <li>• <strong>Reporting bias:</strong> COVID vaccines received unprecedented public attention, inflating reporting rates and potentially skewing PRR for all vaccines.</li>
          <li>• <strong>No dose adjustment:</strong> PRR compares reporting proportions, not absolute risk per dose administered.</li>
          <li>• <strong>Confounding:</strong> Age, sex, comorbidities, and co-administered vaccines are not controlled for.</li>
          <li>• <strong>Temporal changes:</strong> PRR across 35 years of data mixes very different reporting environments.</li>
        </ul>
      </div>
    </div>
  );
}
