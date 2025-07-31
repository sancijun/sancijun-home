"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { allPosts, Post } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Play, Search, Pin, BookOpen, X, ArrowLeft, MapPin, Calendar } from "lucide-react"

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
    <Card className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
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

          {/* 位置标签 */}
          {post.location && (
            <Badge
              variant="default"
              className={cn(
                "absolute left-2 top-2 bg-blue-500 hover:bg-blue-600 text-white border-0",
                post.pinned ? "top-12" : "top-2"
              )}
            >
              <MapPin className="w-3 h-3 mr-1" />
              坐标
            </Badge>
          )}
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

          {/* 位置信息 */}
          {post.location && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" />
              <span>{post.location[0].toFixed(2)}, {post.location[1].toFixed(2)}</span>
            </div>
          )}
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
        <AnimatePresence>
          {visibleTags.map(({ tag, count }) => (
            <motion.div
              key={tag}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
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
            </motion.div>
          ))}
        </AnimatePresence>
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

export default function JourneyArchivePage() {
  const posts = allPosts
    .filter((post) => post.published && post.category === "环国自驾")
    .sort((a, b) => {
      // 置顶文章在前
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      // 按日期排序
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  const [selectedTag, setSelectedTag] = React.useState("全部")
  const [selectedSeries, setSelectedSeries] = React.useState("全部")
  const [searchQuery, setSearchQuery] = React.useState("")
  
  // 计算标签和对应的文章数量，按数量排序
  const tagCounts = React.useMemo(() => {
    const postsFilteredBySeries = posts.filter(post => {
        const seriesMatch = selectedSeries === "全部" || (post.series && post.series.includes(selectedSeries));
        return seriesMatch;
    });

    const counts = new Map<string, number>()
    postsFilteredBySeries.forEach((post) => {
      post.tags?.forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      })
    })
    
    const sortedTags = Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
    
    return [{ tag: "全部", count: postsFilteredBySeries.length }, ...sortedTags]
  }, [posts, selectedSeries])

  // 当筛选条件变化时，检查所选标签是否仍然有效
  React.useEffect(() => {
    const availableTags = new Set(tagCounts.map(t => t.tag));
    if (!availableTags.has(selectedTag)) {
      setSelectedTag("全部");
    }
  }, [tagCounts, selectedTag, setSelectedTag]);

  // 获取所有合集
  const series = React.useMemo(() => {
    const allSeries = Array.from(new Set(
      posts.flatMap(p => p.series || [])
    ))
    return ["全部", ...allSeries.sort()]
  }, [posts])

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const tagMatch = selectedTag === "全部" || post.tags?.includes(selectedTag)
      const seriesMatch = selectedSeries === "全部" || (post.series && post.series.includes(selectedSeries))
      
      // 搜索匹配
      const searchMatch = searchQuery === "" || 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (post.series && post.series.some(seriesName => seriesName.toLowerCase().includes(searchQuery.toLowerCase())))
      
      return tagMatch && seriesMatch && searchMatch
    })
  }, [posts, selectedTag, selectedSeries, searchQuery])

  // 重置所有筛选条件
  const resetFilters = () => {
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
      {/* 返回按钮和标题 */}
      <div className="flex items-center gap-4 mb-8">
        <Button variant="ghost" size="sm">
          <Link href="/journey">
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回在路上
          </Link>
        </Button>
      </div>

      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl tracking-tight lg:text-5xl">
            旅行日志归档
          </h1>
          <p className="text-lg text-muted-foreground">
            记录环国自驾路上的每一个瞬间，每一次思考。
            <br/>
            从城市到荒野，从日出到星空，这里是我的数字游民足迹。
          </p>
        </div>
        
        {/* 搜索框 */}
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
        {/* 合集筛选 */}
        {series.length > 1 && (
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline">
            <h3 className="w-16 text-sm font-medium shrink-0 text-muted-foreground md:w-12">合集</h3>
            <div className="flex flex-wrap gap-2">
              {series.map((seriesName) => (
                <Button
                  key={seriesName}
                  variant={selectedSeries === seriesName ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSeries(seriesName)}
                  className="h-8"
                >
                  {seriesName}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* 标签筛选 */}
        <div className="flex flex-col gap-3 md:flex-row md:items-baseline">
          <h3 className="w-16 text-sm font-medium shrink-0 text-muted-foreground md:w-12">标签</h3>
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
      <AnimatePresence mode="wait">
        {filteredPosts?.length ? (
          <motion.div key="posts" className="space-y-6">
            {/* 统计信息 */}
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>共找到 {filteredPosts.length} 篇旅行日志</span>
              {(selectedTag !== "全部" || selectedSeries !== "全部" || searchQuery) && (
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
            <motion.div 
              key={filteredPosts.map(p => p._id).join("-")}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    delayChildren: 0.1,
                    staggerChildren: 0.08,
                  },
                },
              }}
            >
              {filteredPosts.map((post) => (
                <motion.div
                  key={post._id}
                  variants={{
                    hidden: { y: 20, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: {
                        duration: 0.5,
                        ease: [0.4, 0.0, 0.2, 1],
                      },
                    },
                  }}
                >
                  <PostCard
                    post={post}
                    onTagClick={setSelectedTag}
                    selectedTag={selectedTag}
                  />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="no-results"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border"
          >
            <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
              <h3 className="mt-4 text-lg font-semibold">没有找到相关日志</h3>
              <p className="mb-4 mt-2 text-sm text-muted-foreground">
                尝试调整筛选条件或搜索关键词，或查看所有旅行日志。
              </p>
              <Button
                variant="outline"
                onClick={resetFilters}
              >
                重置筛选
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}