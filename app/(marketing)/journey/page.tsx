import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import JourneyClientPage from "./client"

export const metadata: Metadata = {
  title: "在路上 - " + siteConfig.name,
  description: "记录我的环国自驾旅行、数字游民生活，以及对世界的观察。",
}

export default function JourneyPage() {
  return <JourneyClientPage />
}
