"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { allPosts, Post } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { ChevronDown, ChevronUp, Play } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "@/components/ui/button"

interface PostCardProps {
  post: Post
  onTagClick: (tag: string) => void
  selectedTag: string
}

function PostCard({ post, onTagClick, selectedTag }: PostCardProps) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-all duration-200 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.format === "slides" && post.images && post.images.length > 0 ? post.images[0] : post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
          {post.format === "video" && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors duration-200">
              {/* 外层光环效果 */}
              <div className="absolute w-16 h-16 rounded-full bg-background/10 group-hover:animate-pulse"></div>
              <div className="absolute w-12 h-12 rounded-full bg-background/20 group-hover:animate-ping"></div>
              
              {/* 主播放按钮 - 小号 */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-primary shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-primary/50">
                {/* 内层光效 */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-foreground/20 to-transparent"></div>
                
                {/* 播放图标 - 小号 */}
                <Play className="ml-0.5 h-5 w-5 text-primary-foreground drop-shadow-lg" fill="currentColor" />
                
                {/* 按钮周围的脉冲效果 */}
                <div className="absolute inset-0 rounded-full border-2 border-primary-foreground/30 group-hover:animate-pulse"></div>
              </div>
              
              {/* 底部播放文字提示 */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-background/80 rounded-full backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 border">
                <span className="text-foreground text-xs font-medium">点击播放</span>
              </div>
            </div>
          )}

          {/* 格式标签 - 统一使用主色调 */}
          <Badge
            variant="default"
            className="absolute left-2 top-2"
          >
            {post.format === "article" && "文章"}
            {post.format === "video" && "视频"}
            {post.format === "slides" && "幻灯片"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <h3 className="mb-2 line-clamp-2 text-lg font-semibold leading-tight">
          {post.title}
        </h3>
        <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">
          {post.description}
        </p>
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(post.date)}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <div className="flex flex-wrap gap-1">
          {post.tags?.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className={cn(
                "cursor-pointer text-xs transition-colors hover:bg-accent hover:text-accent-foreground",
                selectedTag === tag && "bg-accent text-accent-foreground"
              )}
              onClick={(e) => {
                e.preventDefault()
                onTagClick(tag)
              }}
            >
              {tag}
            </Badge>
          ))}
          {post.tags && post.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{post.tags.length - 3}
            </Badge>
          )}
        </div>
      </CardFooter>

      <Link href={post.slug} className="absolute inset-0">
        <span className="sr-only">阅读文章</span>
      </Link>
    </Card>
  )
}

interface TagFilterProps {
  tags: string[]
  selectedTag: string
  onTagSelect: (tag: string) => void
  maxVisible?: number
}

function TagFilter({ tags, selectedTag, onTagSelect, maxVisible = 12 }: TagFilterProps) {
  const [showAll, setShowAll] = React.useState(false)
  const visibleTags = showAll ? tags : tags.slice(0, maxVisible)
  const hasMore = tags.length > maxVisible

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {visibleTags.map((tag) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => onTagSelect(tag)}
            className="h-8 text-xs"
          >
            {tag}
          </Button>
        ))}
      </div>
      {hasMore && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowAll(!showAll)}
          className="h-8 text-xs text-muted-foreground hover:text-foreground"
        >
          {showAll ? (
            <>
              <ChevronUp className="mr-1 h-3 w-3" />
              收起标签
            </>
          ) : (
            <>
              <ChevronDown className="mr-1 h-3 w-3" />
              显示更多 ({tags.length - maxVisible})
            </>
          )}
        </Button>
      )}
    </div>
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
  const formats = ["全部", "article", "video", "slides"]
  const formatLabels = {
    "全部": "全部",
    "article": "文章",
    "video": "视频",
    "slides": "幻灯片"
  }
  
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
    <div className="container py-6 lg:py-10">
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

      {/* 筛选器 */}
      <div className="my-8 space-y-6">
        {/* 分类筛选 */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">分类</h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="h-8"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* 格式筛选 */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">格式</h3>
          <div className="flex flex-wrap gap-2">
            {formats.map((format) => (
              <Button
                key={format}
                variant={selectedFormat === format ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFormat(format)}
                className="h-8"
              >
                {formatLabels[format] || format}
              </Button>
            ))}
          </div>
        </div>

        {/* 标签筛选 */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">标签</h3>
          <TagFilter
            tags={allTags}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
            maxVisible={12}
          />
        </div>
      </div>

      <hr className="my-8 border-border" />

      {/* 文章列表 */}
      {filteredPosts?.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onTagClick={setSelectedTag}
              selectedTag={selectedTag}
            />
          ))}
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">没有找到相关内容</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              尝试调整筛选条件，或查看所有内容。
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSelectedCategory("全部")
                setSelectedFormat("全部")
                setSelectedTag("全部")
              }}
            >
              重置筛选
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
