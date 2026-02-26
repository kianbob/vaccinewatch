export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-48 mb-6" />
        <div className="h-10 bg-gray-200 rounded w-80 mb-4" />
        <div className="h-5 bg-gray-200 rounded w-full max-w-2xl mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="h-8 bg-gray-200 rounded w-20 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-24" />
            </div>
          ))}
        </div>
        <div className="space-y-3">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-gray-200 flex justify-between">
              <div className="h-5 bg-gray-200 rounded w-48" />
              <div className="h-5 bg-gray-200 rounded w-20" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
