"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Post } from "contentlayer/generated"
import { formatDate } from "@/lib/utils"
import dynamic from "next/dynamic"
import {
  MapPin,
  Calendar,
  Compass,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

export default function JourneyClientPage({ posts }: { posts: Post[] }) {
  const postsWithLocation = posts.filter(
    (post) => post.location && post.location.length === 2
  )

  const [hoveredPostId, setHoveredPostId] = React.useState<string | null>(null)
  const [activePostId, setActivePostId] = React.useState<string | null>(null)

  const JourneyMap = React.useMemo(
    () =>
      dynamic(() => import("@/components/journey-map"), {
        loading: () => (
          <div className="h-full w-full flex items-center justify-center bg-muted/50">
            <div className="text-center space-y-4">
              <div className="animate-spin">
                <Compass className="h-8 w-8 text-primary mx-auto" />
              </div>
              <p className="text-muted-foreground">探索地图加载中...</p>
            </div>
          </div>
        ),
        ssr: false,
      }),
    []
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[calc(100vh-65px)]">
      {/* Left Panel: Map */}
      <div className="md:col-span-2 lg:col-span-3 h-full">
        <JourneyMap 
          posts={postsWithLocation} 
          activePostId={activePostId}
          onPostHover={setHoveredPostId}
        />
      </div>

      {/* Right Panel: Posts Feed */}
      <aside className="hidden md:block h-full overflow-y-auto border-l border-border">
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl font-bold">旅行日志</h2>
            <p className="text-sm text-muted-foreground">
              点击卡片可在地图上定位。
            </p>
          </div>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard 
                key={post._id}
                post={post}
                isActive={activePostId === post._id}
                isHovered={hoveredPostId === post._id}
                onCardClick={setActivePostId}
                onCardHover={setHoveredPostId}
              />
            ))}
          </div>
        </div>
      </aside>
    </div>
  )
}

interface PostCardProps {
  post: Post
  isActive: boolean
  isHovered: boolean
  onCardClick: (postId: string) => void
  onCardHover: (postId: string | null) => void
}

function PostCard({ post, isActive, isHovered, onCardClick, onCardHover }: PostCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300",
        isActive ? "border-primary shadow-lg" : "border-border/30",
        isHovered ? "shadow-md" : ""
      )}
      onClick={() => onCardClick(post._id)}
      onMouseEnter={() => onCardHover(post._id)}
      onMouseLeave={() => onCardHover(null)}
    >
      <div className="relative">
        {post.image && (
          <div className="aspect-[16/9] overflow-hidden rounded-t-lg">
            <Image
              src={post.image}
              alt={post.title}
              width={400}
              height={225}
              className={cn(
                "object-cover w-full h-full transition-transform duration-500",
                (isActive || isHovered) ? "scale-105" : ""
              )}
            />
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-heading text-lg font-semibold line-clamp-2">
          {post.title}
        </h3>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </span>
          {post.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {post.location[0].toFixed(2)}, {post.location[1].toFixed(2)}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
