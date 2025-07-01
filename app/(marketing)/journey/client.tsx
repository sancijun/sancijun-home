"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Post } from "contentlayer/generated"
import { formatDate } from "@/lib/utils"
import dynamic from "next/dynamic"
import { journeyConfig } from "@/config/journey"
import JourneyStats from "@/components/journey-stats"

export default function JourneyClientPage({ posts }: { posts: Post[] }) {
  const postsWithLocation = posts.filter(
    (post) => post.location && post.location.length === 2
  )

  const [hoveredPostId, setHoveredPostId] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<'visited' | 'planned'>('visited')

  const JourneyMap = React.useMemo(
    () =>
      dynamic(() => import("@/components/journey-map"), {
        loading: () => <p className="text-center">地图加载中...</p>,
        ssr: false,
      }),
    []
  )

  return (
    <div className="container py-6 lg:py-10">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
          在路上
        </h1>
        <p className="text-xl text-muted-foreground">
          我的环国自驾环国自驾。用脚步丈量世界，用代码记录思考。
        </p>
      </div>
      
      {/* 旅行统计 */}
      <div className="my-8">
        <JourneyStats posts={posts} />
      </div>
      
      <hr className="my-8" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1 h-[70vh] sticky top-16">
          <JourneyMap posts={postsWithLocation} hoveredPostId={hoveredPostId} />
        </div>

        <div className="md:col-span-2 h-[70vh] overflow-hidden">
          {/* 标签切换 */}
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-4">
            <button
              onClick={() => setActiveTab('visited')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'visited'
                  ? 'bg-white text-green-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              📍 已访问 ({posts.length})
            </button>
            <button
              onClick={() => setActiveTab('planned')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'planned'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              🗺️ 计划路线 ({journeyConfig.plannedRoute2024.length})
            </button>
          </div>

          <div className="h-[calc(100%-4rem)] overflow-y-auto pr-4">
            {activeTab === 'visited' ? (
              <div className="flex flex-col gap-10">
                {posts?.length ? (
                  posts.map((post) => (
                    <article
                      key={post._id}
                      className="group relative flex flex-col space-y-2"
                      onMouseEnter={() => setHoveredPostId(post._id)}
                      onMouseLeave={() => setHoveredPostId(null)}
                    >
                      <Link href={post.slug} className="space-y-2">
                        {post.image && (
                          <Image
                            src={post.image}
                            alt={post.title}
                            width={804}
                            height={452}
                            className="rounded-md border bg-muted transition-colors"
                          />
                        )}
                        <h2 className="text-2xl font-extrabold">{post.title}</h2>
                        {post.description && (
                          <p className="text-muted-foreground">
                            {post.description}
                          </p>
                        )}
                      </Link>
                      {post.date && (
                        <p className="text-sm text-muted-foreground">
                          {formatDate(post.date)}
                        </p>
                      )}
                    </article>
                  ))
                ) : (
                  <p>没有找到任何日志。</p>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-900 mb-2">2025年 环国自驾计划路线</h3>
                  <p className="text-sm text-blue-700">
                    从深圳出发，途经26个城市，最终到达三亚。总行程预计覆盖中国南方主要省份。
                  </p>
                </div>
                
                <div className="grid gap-3">
                  {journeyConfig.plannedRoute2024.map((destination, index) => (
                    <div
                      key={destination.name}
                      className="flex items-center space-x-3 p-3 bg-white border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {destination.name}
                        </h4>
                        <p className="text-sm text-gray-500">{destination.province}</p>
                        {destination.description && (
                          <p className="text-sm text-gray-600 mt-1">
                            {destination.description}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {destination.coordinates[0].toFixed(2)}, {destination.coordinates[1].toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
