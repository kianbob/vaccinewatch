import { formatNumber } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: number
  subtitle?: string
  color?: 'primary' | 'accent' | 'danger' | 'gray'
  className?: string
  icon?: React.ReactNode
}

export default function StatCard({ 
  title, 
  value, 
  subtitle, 
  color = 'gray', 
  className = '',
  icon,
}: StatCardProps) {
  const colorClasses = {
    primary: 'bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20',
    accent: 'bg-gradient-to-br from-accent/5 to-accent/10 border-accent/20',
    danger: 'bg-gradient-to-br from-danger/5 to-danger/10 border-danger/20',
    gray: 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200'
  }

  const textColorClasses = {
    primary: 'text-primary',
    accent: 'text-accent', 
    danger: 'text-danger',
    gray: 'text-gray-800'
  }

  return (
    <div className={`rounded-xl border p-6 transition-shadow hover:shadow-sm ${colorClasses[color]} ${className}`}>
      {icon && <div className="mb-2">{icon}</div>}
      <div className="text-2xl font-bold text-gray-900">
        {formatNumber(value)}
      </div>
      <div className={`text-sm font-medium ${textColorClasses[color]}`}>
        {title}
      </div>
      {subtitle && (
        <div className="text-xs text-gray-500 mt-1">
          {subtitle}
        </div>
      )}
    </div>
  )
}
