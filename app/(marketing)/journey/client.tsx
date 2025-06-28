"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Post } from "contentlayer/generated"
import { formatDate } from "@/lib/utils"
import dynamic from "next/dynamic"

export default function JourneyClientPage({ posts }: { posts: Post[] }) {
  const postsWithLocation = posts.filter(
    (post) => post.location && post.location.length === 2
  )

  const [hoveredPostId, setHoveredPostId] = React.useState<string | null>(null)

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
          我的环华旅行日志。用脚步丈量世界，用代码记录思考。
        </p>
      </div>
      <hr className="my-8" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-1 h-[70vh] sticky top-16">
          <JourneyMap posts={postsWithLocation} hoveredPostId={hoveredPostId} />
        </div>

        <div className="md:col-span-2 h-[70vh] overflow-y-auto pr-4">
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
        </div>
      </div>
    </div>
  )
}
