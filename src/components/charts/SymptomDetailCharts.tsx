'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface VaccineAssoc {
  type: string;
  count: number;
}

export function VaccineAssociationChart({ data }: { data: VaccineAssoc[] }) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(300, data.length * 40)}>
      <BarChart data={data} layout="vertical" margin={{ top: 5, right: 20, left: 80, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis type="number" tick={{ fontSize: 12 }} stroke="#9ca3af" tickFormatter={(v: number) => v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
        <YAxis type="category" dataKey="type" tick={{ fontSize: 12 }} stroke="#9ca3af" width={75} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} formatter={(value: number) => [value.toLocaleString(), 'Reports']} />
        <Bar dataKey="count" fill="#0891b2" radius={[0, 4, 4, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
