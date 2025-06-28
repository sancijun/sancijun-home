"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { allPosts, Post } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Tag({ tag, onClick, isSelected }: { tag: string, onClick: (tag: string) => void, isSelected: boolean }) {
  return (
    <button
      className={cn(
        "rounded-full px-2.5 py-0.5 text-xs transition-colors hover:bg-muted/80",
        isSelected ? "bg-muted font-semibold" : "bg-muted/40"
      )}
      onClick={() => onClick(tag)}
    >
      {tag}
    </button>
  )
}

export default function ExplorePage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  const [selectedCategory, setSelectedCategory] = React.useState("全部")
  const [selectedFormat, setSelectedFormat] = React.useState("全部")
  const [selectedTag, setSelectedTag] = React.useState("全部")

  const categories = ["全部", "AI洞察", "产品构建", "工具笔记", "环华日志"]
  const formats = ["全部", "article", "video"]
  
  const allTags = ["全部", ...Array.from(new Set(posts.flatMap((post) => post.tags || [])))]

  const filteredPosts = posts.filter((post) => {
    const categoryMatch =
      selectedCategory === "全部" || post.category === selectedCategory
    const formatMatch =
      selectedFormat === "全部" || post.format === selectedFormat
    const tagMatch =
      selectedTag === "全部" || post.tags?.includes(selectedTag)
    return categoryMatch && formatMatch && tagMatch
  })

  return (
    <div className="container max-w-4xl py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            探索
          </h1>
          <p className="text-xl text-muted-foreground">
            一个数字花园。我在 AI 时代的所见、所闻、所思。
          </p>
        </div>
      </div>
      <div className="my-8 flex flex-col space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">分类:</span>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-full",
                selectedCategory === category && "bg-muted font-semibold"
              )}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">格式:</span>
          {formats.map((format) => (
            <button
              key={format}
              onClick={() => setSelectedFormat(format)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-full",
                selectedFormat === format && "bg-muted font-semibold"
              )}
            >
              {format}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-semibold">标签:</span>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "rounded-full",
                selectedTag === tag && "bg-muted font-semibold"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
      <hr className="my-8" />
      {filteredPosts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {filteredPosts.map((post, index) => (
            <article
              key={post._id}
              className="group relative flex flex-col space-y-2"
            >
              {post.image && (
                <Image
                  src={post.image}
                  alt={post.title}
                  width={804}
                  height={452}
                  className="rounded-md border bg-muted transition-colors"
                  priority={index <= 1}
                />
              )}
              <h2 className="text-2xl font-extrabold">{post.title}</h2>
              <div className="flex items-center gap-2">
                <p className="text-sm text-muted-foreground">{post.category}</p>
                <div className="flex items-center gap-1">
                  {post.tags?.map((tag) => (
                    <Tag key={tag} tag={tag} onClick={setSelectedTag} isSelected={selectedTag === tag} />
                  ))}
                </div>
              </div>
              {post.description && (
                <p className="text-muted-foreground">{post.description}</p>
              )}
              {post.date && (
                <p className="text-sm text-muted-foreground">
                  {formatDate(post.date)}
                </p>
              )}
              <Link href={post.slug} className="absolute inset-0">
                <span className="sr-only">View Article</span>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <p>没有找到符合条件的文章。</p>
      )}
    </div>
  )
}
