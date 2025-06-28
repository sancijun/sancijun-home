import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import JourneyClientPage from "./client"

export const metadata: Metadata = {
  title: "在路上 - " + siteConfig.name,
  description: "记录我的环华旅行、数字游民生活，以及对世界的观察。",
}

export default function JourneyPage() {
  const posts = allPosts
    .filter((post) => post.published && post.category === "环华日志")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  return <JourneyClientPage posts={posts} />
}
