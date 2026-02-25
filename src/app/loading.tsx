export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse space-y-6">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-10 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
          ))}
        </div>
        <div className="space-y-3 mt-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-6 bg-gray-100 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  )
}
