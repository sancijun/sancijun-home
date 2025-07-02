"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { allPosts, Post } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { ChevronDown, ChevronUp, Play, Search, Pin, BookOpen, X } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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

          {/* 置顶标签 */}
          {post.pinned && (
            <div className="absolute right-2 top-2">
              <Badge
                variant="default"
                className="bg-red-500 hover:bg-red-600 text-white border-0"
              >
                <Pin className="w-3 h-3 mr-1" />
                置顶
              </Badge>
            </div>
          )}

          {/* 格式标签 */}
          <Badge
            variant="default"
            className={cn(
              "absolute left-2 top-2",
              post.pinned ? "top-12" : "top-2"
            )}
          >
            {post.format === "article" && "文章"}
            {post.format === "video" && "视频"}
            {post.format === "slides" && "幻灯片"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <div className="space-y-3">
          {/* 合集标签 */}
          {post.series && post.series.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <BookOpen className="w-4 h-4 text-primary shrink-0" />
              <div className="flex flex-wrap gap-1">
                {post.series.map((seriesName, index) => (
                  <Badge key={index} variant="secondary" className="text-xs font-normal">
                    {seriesName}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <h3 className="line-clamp-2 text-lg font-semibold leading-tight">
            {post.title}
          </h3>
          
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {post.description}
          </p>
          
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {post.category}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {formatDate(post.date)}
            </span>
          </div>
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
  tags: Array<{ tag: string; count: number }>
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
        {visibleTags.map(({ tag, count }) => (
          <Button
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => onTagSelect(tag)}
            className="h-8 text-xs"
          >
            {tag}
            {tag !== "全部" && (
              <span className="ml-1 text-xs opacity-70">({count})</span>
            )}
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
      // 置顶文章在前
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      // 按日期排序
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  const [selectedCategory, setSelectedCategory] = React.useState("全部")
  const [selectedFormat, setSelectedFormat] = React.useState("全部")
  const [selectedTag, setSelectedTag] = React.useState("全部")
  const [selectedSeries, setSelectedSeries] = React.useState("全部")
  const [searchQuery, setSearchQuery] = React.useState("")

  const categories = ["全部", "AI洞察", "产品构建", "效率工具", "环国自驾"]
  const formats = ["全部", "article", "video", "slides"]
  const formatLabels = {
    "全部": "全部",
    "article": "文章",
    "video": "视频",
    "slides": "幻灯片"
  }
  
  // 计算标签和对应的文章数量，按数量排序
  const tagCounts = React.useMemo(() => {
    const counts = new Map<string, number>()
    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      })
    })
    
    const sortedTags = Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
    
    return [{ tag: "全部", count: posts.length }, ...sortedTags]
  }, [posts])

  // 获取所有合集
  const series = React.useMemo(() => {
    const allSeries = Array.from(new Set(
      posts.flatMap(p => p.series || [])
    ))
    return ["全部", ...allSeries.sort()]
  }, [posts])

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const categoryMatch = selectedCategory === "全部" || post.category === selectedCategory
      const formatMatch = selectedFormat === "全部" || post.format === selectedFormat
      const tagMatch = selectedTag === "全部" || post.tags?.includes(selectedTag)
      const seriesMatch = selectedSeries === "全部" || (post.series && post.series.includes(selectedSeries))
      
      // 搜索匹配
      const searchMatch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.series && post.series.some(seriesName => seriesName.toLowerCase().includes(searchQuery.toLowerCase())))
      
      return categoryMatch && formatMatch && tagMatch && seriesMatch && searchMatch
    })
  }, [posts, selectedCategory, selectedFormat, selectedTag, selectedSeries, searchQuery])

  // 重置所有筛选条件
  const resetFilters = () => {
    setSelectedCategory("全部")
    setSelectedFormat("全部")
    setSelectedTag("全部")
    setSelectedSeries("全部")
    setSearchQuery("")
  }

  // 清除搜索
  const clearSearch = () => {
    setSearchQuery("")
  }

  return (
    <div className="container py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            探索
          </h1>
          <p className="text-xl text-muted-foreground">
          在这里，代码与山河交织，AI与哲思碰撞。
          <br/>
          每一篇文章，都是一次技术实践、在地体验与个人思考的融合。
          </p>
        </div>
        
        {/* 搜索框 - 移到标题右侧 */}
        <div className="w-full md:w-auto">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="搜索标题、描述、标签或合集..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10 md:w-80"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2 p-0"
                onClick={clearSearch}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
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

        {/* 合集筛选 */}
        {series.length > 1 && (
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-foreground">合集</h3>
            <div className="flex flex-wrap gap-2">
              {series.map((seriesName) => (
                <Button
                  key={seriesName}
                  variant={selectedSeries === seriesName ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSeries(seriesName)}
                  className="h-8"
                >
                  <BookOpen className="w-3 h-3 mr-1" />
                  {seriesName}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 标签筛选 */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-foreground">标签</h3>
          <TagFilter
            tags={tagCounts}
            selectedTag={selectedTag}
            onTagSelect={setSelectedTag}
            maxVisible={12}
          />
        </div>
      </div>

      <hr className="my-8 border-border" />

      {/* 文章列表 */}
      {filteredPosts?.length ? (
        <div className="space-y-6">
          {/* 统计信息 */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>共找到 {filteredPosts.length} 篇内容</span>
            {(selectedCategory !== "全部" || selectedFormat !== "全部" || selectedTag !== "全部" || selectedSeries !== "全部" || searchQuery) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={resetFilters}
                className="h-auto p-1 text-xs"
              >
                清除筛选
              </Button>
            )}
          </div>
          
          {/* 文章网格 */}
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
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border">
          <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
            <h3 className="mt-4 text-lg font-semibold">没有找到相关内容</h3>
            <p className="mb-4 mt-2 text-sm text-muted-foreground">
              尝试调整筛选条件或搜索关键词，或查看所有内容。
            </p>
            <Button
              variant="outline"
              onClick={resetFilters}
            >
              重置筛选
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
