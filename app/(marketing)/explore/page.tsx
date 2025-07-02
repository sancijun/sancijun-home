"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { allPosts, Post } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { Search, X, Filter } from "lucide-react"

import { cn, formatDate } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface PostCardProps {
  post: Post
  onTagClick: (tag: string) => void
  selectedTag: string
}

function PostCard({ post, onTagClick, selectedTag }: PostCardProps) {
  return (
    <Card className="group relative flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-xl border-border/30 hover:border-primary/30 bg-card/60 backdrop-blur-sm">
      <Link href={post.slug} className="absolute inset-0 z-10">
        <span className="sr-only">阅读文章: {post.title}</span>
      </Link>
      <CardHeader className="p-0">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-lg">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      </CardHeader>

      <CardContent className="relative z-20 flex-1 p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <Badge variant="secondary" className="text-xs font-medium">
              {post.category}
            </Badge>
            {post.pinned && (
              <Badge
                variant="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground border-0"
              >
                置顶
              </Badge>
            )}
          </div>
          
          <h3 className="font-heading line-clamp-2 text-xl font-bold leading-tight group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="line-clamp-3 text-sm text-muted-foreground">
            {post.description}
          </p>
        </div>
      </CardContent>

      <CardFooter className="relative z-20 p-6 pt-0 mt-auto">
        <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
          <span>{formatDate(post.date)}</span>
          <div className="flex flex-wrap gap-1 justify-end">
            {post.tags?.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="cursor-pointer text-xs transition-colors hover:bg-accent hover:text-accent-foreground z-20"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  onTagClick(tag)
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

function FilterControls({
  searchQuery,
  setSearchQuery,
  clearSearch,
  categories,
  selectedCategory,
  setSelectedCategory
}: any) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 w-full items-center">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="搜索文章标题..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 h-11"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-full sm:w-auto h-11">
            <Filter className="mr-2 h-4 w-4" />
            {selectedCategory === "全部" ? "所有分类" : selectedCategory}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          <DropdownMenuRadioGroup
            value={selectedCategory}
            onValueChange={setSelectedCategory}
          >
            {categories.map((category: string) => (
              <DropdownMenuRadioItem key={category} value={category}>
                {category}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}


export default function ExplorePage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  const [selectedCategory, setSelectedCategory] = React.useState("全部")
  const [selectedTag, setSelectedTag] = React.useState("")
  const [searchQuery, setSearchQuery] = React.useState("")

  const categories = ["全部", "AI洞察", "产品构建", "效率工具", "环国自驾"]

  const filteredPosts = React.useMemo(() => {
    let result = posts
    if (selectedCategory !== "全部") {
      result = result.filter((post) => post.category === selectedCategory)
    }
    if (selectedTag) {
      result = result.filter((post) => post.tags?.includes(selectedTag))
    }
    if (searchQuery) {
      result = result.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }
    return result
  }, [posts, selectedCategory, selectedTag, searchQuery])
  
  const tagCounts = React.useMemo(() => {
    const counts = new Map<string, number>()
    posts.forEach((post) => {
      post.tags?.forEach((tag) => {
        counts.set(tag, (counts.get(tag) || 0) + 1)
      })
    })
    return Array.from(counts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
  }, [posts])

  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag("")
    } else {
      setSelectedTag(tag)
    }
  }

  const clearSearch = () => setSearchQuery("")
  
  return (
    <div className="container py-12 sm:py-16 lg:py-20">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
          <span className="bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            探索
          </span>
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          在这里，代码与山河交织，AI与哲思碰撞。
          <br/>
          每一篇文章，都是一次技术实践、在地体验与个人思考的融合。
        </p>
      </section>

      {/* Filter and Search Controls */}
      <section className="mb-8">
        <FilterControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </section>

      {/* Main Content Grid */}
      <section>
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                onTagClick={handleTagClick}
                selectedTag={selectedTag}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-muted-foreground">
            <p>没有找到相关内容。</p>
            <Button variant="link" onClick={() => {
              setSelectedCategory("全部")
              setSelectedTag("")
              setSearchQuery("")
            }}>
              清空筛选条件
            </Button>
          </div>
        )}
      </section>
      
      {/* Tag Cloud Section */}
      {tagCounts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">热门标签</h2>
          <div className="flex flex-wrap justify-center gap-2">
            {tagCounts.map(({ tag, count }) => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "default" : "outline"}
                size="sm"
                onClick={() => handleTagClick(tag)}
                className="h-8 text-xs transition-all duration-200"
              >
                {tag}
                <span className="ml-1.5 text-xs opacity-70">({count})</span>
              </Button>
            ))}
             {selectedTag && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedTag("")}
                className="h-8 text-xs"
              >
                <X className="mr-1 h-3 w-3" />
                清除选择
              </Button>
            )}
          </div>
        </section>
      )}
    </div>
  )
}
