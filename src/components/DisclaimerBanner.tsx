'use client'

import { useState } from 'react'

export default function DisclaimerBanner() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="bg-amber-100 border-l-4 border-amber-500 p-4 mb-6">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <span className="text-amber-500 text-xl">⚠️</span>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> VAERS reports alone cannot determine if a vaccine caused an adverse event. 
            Reports may contain incomplete, inaccurate, or unverified information. Correlation does not equal causation.
          </p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={() => setIsVisible(false)}
            className="text-amber-500 hover:text-amber-700 text-xl font-bold"
            aria-label="Close disclaimer"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  )
}