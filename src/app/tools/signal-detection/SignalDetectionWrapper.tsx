'use client';

import dynamic from 'next/dynamic';

const SignalDetectionClient = dynamic(() => import('./SignalDetectionClient'), { ssr: false });

export default function SignalDetectionWrapper() {
  return <SignalDetectionClient />;
}
