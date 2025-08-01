"use client"

import { useEffect, useState, useRef } from "react"
import { Post } from "contentlayer/generated"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { journeyConfig } from "@/config/journey"
import React from "react"

// 动态导入 Leaflet 相关组件，确保它们只在客户端渲染
import dynamic from "next/dynamic"

interface JourneyMapProps {
  posts: Post[]
  activePostId?: string | null
  onPostHover: (postId: string | null) => void
}

// 使用 dynamic 导入 Leaflet 组件
const MapWithNoSSR = dynamic(() => import('./map-components'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted/50">
      <div className="text-center space-y-4">
        <div className="animate-spin">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
        <p className="text-muted-foreground">地图加载中...</p>
                      </div>
    </div>
  )
})

export default function JourneyMap({ posts, activePostId, onPostHover }: JourneyMapProps) {
  return <MapWithNoSSR posts={posts} activePostId={activePostId} onPostHover={onPostHover} />
}
