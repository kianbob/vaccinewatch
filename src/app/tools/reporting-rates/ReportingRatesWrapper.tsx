'use client';

import dynamic from 'next/dynamic';

const ReportingRatesClient = dynamic(() => import('./ReportingRatesClient'), { ssr: false });

export default function ReportingRatesWrapper() {
  return <ReportingRatesClient />;
}
