"use client"

import { useState } from "react"
import dynamic from "next/dynamic"
import { Post } from "contentlayer/generated"
import { Compass } from "lucide-react"

// 动态导入地图组件，确保只在客户端渲染
const JourneyMap = dynamic(() => import("@/components/journey-map"), {
  loading: () => (
    <div className="flex size-full items-center justify-center bg-muted/50">
      <div className="space-y-4 text-center">
        <div className="animate-spin">
          <Compass className="mx-auto size-8 text-primary" />
        </div>
        <p className="text-muted-foreground">探索地图加载中...</p>
      </div>
    </div>
  ),
  ssr: false,
})

interface JourneyMapSectionProps {
  posts: Post[]
}

export function JourneyMapSection({ posts }: JourneyMapSectionProps) {
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null)
  const [activePostId, setActivePostId] = useState<string | null>(null)

  return (
    <div className="relative h-full min-h-[400px] overflow-hidden rounded-xl bg-muted/50 shadow-lg">
      <JourneyMap
        posts={posts}
        activePostId={activePostId}
        onPostHover={setHoveredPostId}
      />
    </div>
  )
}