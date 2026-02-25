import Link from 'next/link'
import { playfairDisplay } from '@/lib/fonts'

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-xl mx-auto text-center">
        <div className="text-6xl font-bold text-primary/20 mb-4">404</div>
        <h1 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 ${playfairDisplay.className}`}>
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          Try searching for what you need or explore the links below.
        </p>

        <Link
          href="/search"
          className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-8"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Search VaccineWatch
        </Link>

        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Popular Pages</h2>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/vaccines" className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
              All Vaccines
            </Link>
            <Link href="/symptoms" className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
              All Symptoms
            </Link>
            <Link href="/analysis" className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
              Analysis Articles
            </Link>
            <Link href="/compare" className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
              Compare Vaccines
            </Link>
            <Link href="/states" className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
              Reports by State
            </Link>
            <Link href="/manufacturers" className="bg-white border border-gray-200 rounded-lg p-3 text-sm font-medium text-gray-900 hover:border-primary/30 hover:bg-primary/5 transition-colors">
              Manufacturers
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
