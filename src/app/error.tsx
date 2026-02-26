'use client'

import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      <h1 className={`text-3xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
        Something went wrong
      </h1>
      <p className="text-gray-600 mb-8">
        We encountered an error loading this page. This might be a temporary issue.
      </p>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
        >
          Go Home
        </Link>
      </div>
    </div>
  )
}
