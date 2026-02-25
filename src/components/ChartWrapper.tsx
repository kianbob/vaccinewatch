'use client'

import dynamic from 'next/dynamic'
import type { ComponentType } from 'react'

/* eslint-disable @typescript-eslint/no-explicit-any */

// Dynamically import all Recharts components with SSR disabled
export const AreaChart = dynamic(
  () => import('recharts').then((mod) => mod.AreaChart as unknown as ComponentType<Record<string, unknown>>),
  { ssr: false }
)

export const BarChart = dynamic(
  () => import('recharts').then((mod) => mod.BarChart as unknown as ComponentType<Record<string, unknown>>),
  { ssr: false }
)

export const PieChart = dynamic(
  () => import('recharts').then((mod) => mod.PieChart as unknown as ComponentType<Record<string, unknown>>),
  { ssr: false }
)

export const LineChart = dynamic(
  () => import('recharts').then((mod) => mod.LineChart as unknown as ComponentType<Record<string, unknown>>),
  { ssr: false }
)

export const ComposedChart = dynamic(
  () => import('recharts').then((mod) => mod.ComposedChart as unknown as ComponentType<Record<string, unknown>>),
  { ssr: false }
)

export const ResponsiveContainer = dynamic(
  () => import('recharts').then((mod) => mod.ResponsiveContainer as unknown as ComponentType<Record<string, unknown>>),
  { ssr: false }
)

export { default as RechartsComponents } from './RechartsClient'
