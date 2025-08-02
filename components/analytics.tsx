"use client"

import { Analytics as VercelAnalytics } from "@vercel/analytics/react"
import { BaiduAnalytics } from "./baidu-analytics"

export function Analytics() {
  return (
    <>
      <VercelAnalytics />
      <BaiduAnalytics />
    </>
  )
}
