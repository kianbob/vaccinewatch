'use client';

import { useState, useEffect, useMemo } from 'react';

interface DoseData {
  totalDoses: number;
  period: string;
  annualAvg?: number;
  byYear?: Record<string, number>;
  source: string;
  confidence: string;
}

interface VaccineData {
  name: string;
  type: string;
  reports: number;
  died: number;
  hosp: number;
}

export default function ReportingRatesClient() {
  const [denominators, setDenominators] = useState<Record<string, DoseData> | null>(null);
  const [vaccineIndex, setVaccineIndex] = useState<Record<string, any> | null>(null);
  const [selectedVaccine, setSelectedVaccine] = useState('COVID19');
  const [selectedOutcome, setSelectedOutcome] = useState<'reports' | 'died' | 'hosp' | 'er'>('reports');

  useEffect(() => {
    Promise.all([
      fetch('/data/dose-denominators.json').then(r => r.json()),
      fetch('/data/vaccine-index.json').then(r => r.json()),
    ]).then(([d, v]) => { setDenominators(d); setVaccineIndex(v); });
  }, []);

  // Aggregate vaccine index by type
  const vaccineTypes = useMemo(() => {
    if (!vaccineIndex) return {};
    const types: Record<string, { name: string; type: string; reports: number; died: number; hosp: number; er: number }> = {};
    for (const vax of Object.values(vaccineIndex) as any[]) {
      const t = vax.type;
      if (!types[t]) types[t] = { name: vax.name, type: t, reports: 0, died: 0, hosp: 0, er: 0 };
      types[t].reports += vax.reports || 0;
      types[t].died += vax.died || 0;
      types[t].hosp += vax.hosp || 0;
      types[t].er += vax.er || 0;
    }
    return types;
  }, [vaccineIndex]);

  // Get vaccines that have denominator data
  const availableVaccines = useMemo(() => {
    if (!denominators) return [];
    return Object.keys(denominators)
      .filter(k => k !== '_meta' && vaccineTypes[k])
      .sort((a, b) => (vaccineTypes[b]?.reports || 0) - (vaccineTypes[a]?.reports || 0));
  }, [denominators, vaccineTypes]);

  if (!denominators || !vaccineIndex) {
    return <div className="text-center py-12 text-gray-500">Loading data...</div>;
  }

  const doseData = denominators[selectedVaccine] as DoseData;
  const vaxData = vaccineTypes[selectedVaccine];
  if (!doseData || !vaxData) return null;

  const outcomes = {
    reports: { label: 'All VAERS Reports', count: vaxData.reports, color: 'bg-primary' },
    died: { label: 'Death Reports', count: vaxData.died, color: 'bg-danger' },
    hosp: { label: 'Hospitalization Reports', count: vaxData.hosp, color: 'bg-amber-500' },
    er: { label: 'ER Visit Reports', count: vaxData.er, color: 'bg-accent' },
  };

  const selected = outcomes[selectedOutcome];
  const ratePerMillion = (selected.count / doseData.totalDoses) * 1000000;
  const ratePerHundredK = ratePerMillion / 10;
  const oneInX = Math.round(doseData.totalDoses / selected.count);

  // Comparison rates table
  const comparisonData = availableVaccines.map(vType => {
    const dd = denominators[vType] as DoseData;
    const vd = vaccineTypes[vType];
    if (!dd || !vd) return null;
    const count = vd[selectedOutcome as keyof typeof vd] as number;
    return {
      type: vType,
      name: vd.name.split('(')[0].trim(),
      count,
      doses: dd.totalDoses,
      rate: (count / dd.totalDoses) * 1000000,
      confidence: dd.confidence,
      period: dd.period,
    };
  }).filter(Boolean).sort((a: any, b: any) => b.rate - a.rate);

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Vaccine</label>
          <select
            value={selectedVaccine}
            onChange={e => setSelectedVaccine(e.target.value)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
          >
            {availableVaccines.map(v => (
              <option key={v} value={v}>
                {vaccineTypes[v]?.name?.split('(')[0]?.trim() || v} ({(vaccineTypes[v]?.reports || 0).toLocaleString()} reports)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Outcome</label>
          <select
            value={selectedOutcome}
            onChange={e => setSelectedOutcome(e.target.value as any)}
            className="w-full rounded-xl border border-gray-300 px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-primary focus:border-primary"
          >
            <option value="reports">All VAERS Reports</option>
            <option value="died">Death Reports</option>
            <option value="hosp">Hospitalization Reports</option>
            <option value="er">ER Visit Reports</option>
          </select>
        </div>
      </div>

      {/* Main Result Card */}
      <div className="bg-white rounded-xl border-2 border-primary/20 p-6 md:p-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {selected.label} per Dose — {vaccineTypes[selectedVaccine]?.name?.split('(')[0]?.trim()}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-primary">{ratePerMillion.toFixed(1)}</div>
            <div className="text-sm text-gray-500 mt-1">per million doses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-accent">{ratePerHundredK.toFixed(1)}</div>
            <div className="text-sm text-gray-500 mt-1">per 100,000 doses</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-gray-700">1 in {oneInX.toLocaleString()}</div>
            <div className="text-sm text-gray-500 mt-1">doses resulted in a report</div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-gray-500">
          <span>📊 {selected.count.toLocaleString()} {selected.label.toLowerCase()}</span>
          <span>💉 ~{(doseData.totalDoses / 1e6).toFixed(0)}M estimated doses ({doseData.period})</span>
          <span>📈 Confidence: {doseData.confidence}</span>
        </div>
      </div>

      {/* Comparison Table */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Compare {selected.label} Rates Across Vaccines
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-3">Vaccine</th>
                <th className="text-right py-3 px-3">Reports</th>
                <th className="text-right py-3 px-3">Est. Doses</th>
                <th className="text-right py-3 px-3">Rate / Million</th>
                <th className="text-right py-3 px-3">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {(comparisonData as any[]).map((row: any) => (
                <tr
                  key={row.type}
                  className={`border-b border-gray-100 ${row.type === selectedVaccine ? 'bg-primary/5 font-semibold' : 'hover:bg-gray-50'}`}
                >
                  <td className="py-2.5 px-3">{row.name}</td>
                  <td className="py-2.5 px-3 text-right">{row.count.toLocaleString()}</td>
                  <td className="py-2.5 px-3 text-right">{(row.doses / 1e6).toFixed(0)}M</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={row.type === selectedVaccine ? 'text-primary' : ''}>
                      {row.rate.toFixed(1)}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={`inline-block px-2 py-0.5 rounded-full text-xs ${
                      row.confidence === 'high' ? 'bg-green-100 text-green-700' :
                      row.confidence === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {row.confidence}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Bar Chart */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Visual Comparison</h3>
        <div className="space-y-2">
          {(comparisonData as any[]).map((row: any) => {
            const maxRate = Math.max(...(comparisonData as any[]).map((r: any) => r.rate));
            const pct = Math.min((row.rate / maxRate) * 100, 100);
            return (
              <div key={row.type} className="flex items-center gap-3">
                <div className="w-32 md:w-48 text-sm text-right truncate">{row.name}</div>
                <div className="flex-1 bg-gray-100 rounded-full h-6 relative overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${row.type === selectedVaccine ? 'bg-primary' : 'bg-primary/40'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="w-20 text-sm text-right">{row.rate.toFixed(1)}</div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-gray-500 mt-2">Rate per million doses administered</p>
      </div>

      {/* Context Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
        <h4 className="font-semibold text-amber-800 flex items-center gap-2 mb-2">
          ⚠️ Important Context
        </h4>
        <ul className="text-sm text-amber-700 space-y-1.5">
          <li>• <strong>VAERS underreporting:</strong> Studies estimate only 1-10% of adverse events are reported to VAERS. Actual rates may be higher.</li>
          <li>• <strong>Dose estimates are approximate:</strong> Exact doses administered are only published for COVID and flu vaccines. Other estimates use coverage rates × population.</li>
          <li>• <strong>Reporting ≠ causation:</strong> A VAERS report means an event occurred after vaccination, not that the vaccine caused it.</li>
          <li>• <strong>Time periods differ:</strong> Some vaccines have been given for decades while others (COVID) are recent, affecting cumulative totals.</li>
          <li>• <strong>Stimulated reporting:</strong> COVID pandemic dramatically increased VAERS awareness and reporting for ALL vaccines.</li>
        </ul>
      </div>
    </div>
  );
}
