export default function LoadingSkeleton({ 
  height = 'h-96', 
  label = 'Loading...' 
}: { 
  height?: string
  label?: string 
}) {
  return (
    <div className={`${height} bg-gray-50 rounded-xl animate-pulse flex items-center justify-center`}>
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-gray-400">{label}</p>
      </div>
    </div>
  )
}
