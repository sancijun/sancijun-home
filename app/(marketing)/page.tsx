"use client"

import { useEffect } from "react"
import Link from "next/link"
import { allPosts, allProjects } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import { cn, formatDate } from "@/lib/utils"
import { generateGraphData } from "@/lib/graph"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import KnowledgeGraph from "@/components/knowledge-graph"
import { ArrowRight, MapPin, Calendar, Users, Coffee, Car, Code, Cpu, Heart, Zap, Target, TrendingUp, Star, Globe, FileText, Rocket, Clock } from "lucide-react"
import HeroBackground from "@/components/hero-background"
import { journeyConfig } from "@/config/journey"
import dynamic from "next/dynamic"
import { useState } from "react"

// 动态导入地图组件
const JourneyMap = dynamic(() => import("@/components/journey-map"), {
  loading: () => (
    <div className="flex size-full items-center justify-center bg-muted/50">
      <div className="space-y-4 text-center">
        <div className="animate-spin">
          <div className="mx-auto size-8 rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
        <p className="text-muted-foreground">探索地图加载中...</p>
      </div>
    </div>
  ),
  ssr: false,
})

export default function IndexPage() {
  const [hoveredPostId, setHoveredPostId] = useState<string | null>(null)
  const [activePostId, setActivePostId] = useState<string | null>(null)

  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 8)

  // Data for Knowledge Graph - only use 'explore' posts
  const explorePosts = allPosts
    .filter((post) => post.published && post.slug.startsWith("/explore"))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  const graphData = generateGraphData(explorePosts)
  const latestPosts = explorePosts.slice(0, 3)
  const latestPost = latestPosts.length > 0 ? latestPosts[0] : null

  const projects = allProjects
    .filter((project) => project.published && project.featured)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3)

  // 获取环国自驾文章
  const journeyPost = allPosts
    .filter((post) => post.published && post.category === "环国自驾")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 1)[0]

  // 统计数据
  const journeyPosts = allPosts.filter(p => p.published && p.category === "环国自驾")
  
  // 地图数据
  const postsWithLocation = journeyPosts.filter(
    (post) => post.location && post.location.length === 2
  )
  
  // 计算已访问的城市数量（根据文章中的位置信息）
  const visitedCities = new Set()
  journeyPosts.forEach(post => {
    if (post.location && post.location.length === 2) {
      // 使用位置坐标的字符串表示作为唯一标识
      const locationKey = `${post.location[0].toFixed(1)},${post.location[1].toFixed(1)}`
      visitedCities.add(locationKey)
    }
  })

  const stats = {
    articles: allPosts.filter(p => p.published).length,
    projects: allProjects.filter(p => p.published).length,
    cities: visitedCities.size || 0,
    daysTraveling: Math.floor((new Date().getTime() - new Date('2025-07-05').getTime()) / (1000 * 60 * 60 * 24)) + 1
  }

  return (
    <div className="h-[calc(100vh-80px)] snap-y snap-mandatory overflow-y-auto">
      {/* Hero Section */}
      <section className="relative flex min-h-screen w-full snap-start items-center justify-center overflow-hidden">
        <HeroBackground />
        <div className="container relative z-10 mx-auto max-w-5xl px-4">
          <div className="space-y-10 text-center">
            <Badge
              variant="outline"
              className="animate-fadeIn border-border/30 bg-background/50 px-4 py-2 text-sm font-medium backdrop-blur-sm"
              style={{ animationDelay: "0ms" }}
            >
              在路上 · 进行时
            </Badge>

            <div
              className="animate-fadeIn"
              style={{ animationDelay: "200ms" }}
            >
              <h1 className="font-heading text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
                三此君
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground sm:text-2xl">
                AI、代码与山河：一个独立开发者的环国实战。
              </p>
              <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground/90 sm:text-lg">
                此时、此地、此身，向着数字世界与真实大地，发起一场热烈的环国实战，在路上探索与创造。
              </p>
            </div>

            <div
              className="animate-fadeIn flex flex-col items-center justify-center gap-4 sm:flex-row"
              style={{ animationDelay: "400ms" }}
            >
              <Link
                href="/explore"
                className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base")}
              >
                探索我的数字花园
              </Link>
              <Link
                href="/create"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 bg-background/50 px-8 text-base backdrop-blur-sm"
                )}
              >
                查看我创造的作品
              </Link>
            </div>
            
            <div
              className="animate-fadeIn mx-auto max-w-3xl pt-10"
              style={{ animationDelay: "600ms" }}
            >
              <div className="rounded-2xl border border-border/30 bg-background/40 p-4 backdrop-blur-md">
                <div className="grid grid-cols-2 gap-4 text-center sm:grid-cols-4">
                  {[
                    { label: "原创文章", value: stats.articles, icon: FileText, href: "/explore" },
                    { label: "创造作品", value: stats.projects, icon: Rocket, href: "/create" },
                    { label: "足迹城市", value: stats.cities, icon: Globe, href: "/journey" },
                    { label: "环国天数", value: stats.daysTraveling, icon: Clock, href: "/journey" },
                  ].map((stat) => (
                    <Link 
                      href={stat.href} 
                      key={stat.label}
                      className="group transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-primary/5 to-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                        <p className="text-2xl font-bold text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                          {stat.value}
                        </p>
                        <p className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground transition-colors group-hover:text-primary/80">
                          <stat.icon className="size-3.5 opacity-70" />
                          {stat.label}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Graph Section */}
      <section className="flex h-screen snap-start flex-col justify-center bg-gradient-to-b from-background to-accent/5 py-12 lg:py-16">
        <div className="container mx-auto flex h-full max-h-full max-w-7xl flex-col items-center px-4 sm:px-6 lg:px-8">
          <div className="mb-8 space-y-6 text-center">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Cpu className="mr-2 size-4" />
              知识图谱
            </Badge>
            
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              探索·数字花园
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              代码与山河交织，AI与思辨碰撞。每篇文章都是技术实践、在地体验与个人思考的融合
            </p>
          </div>

          <div className="to-accent/3 relative min-h-0 w-full flex-1 overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-card/40 shadow-xl">
            {/* 图例 */}
            <div className="absolute left-6 top-6 z-10 flex flex-wrap gap-3">
              {[
                { label: "AI洞察" },
                { label: "产品构建" },
                { label: "效率工具" },
                { label: "环国自驾" },
              ].map((item, index) => (
                <Badge key={index} variant="secondary" className="border-border/20 bg-card/90 backdrop-blur-sm">
                  {item.label}
                </Badge>
              ))}
            </div>

            {/* 最新文章卡片 */}
            {latestPosts.length > 0 && (
              <div className="absolute right-6 top-6 z-10 w-72">
                <Card className="animate-fadeIn border-border/30 bg-card/95 shadow-lg backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <div className="size-2 animate-pulse rounded-full bg-primary" />
                      最新探索
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {latestPosts.map((post) => (
                        <Link
                          key={post.slug}
                          href={post.slug}
                          className="block truncate text-sm font-medium text-foreground/80 transition-colors hover:text-primary"
                          title={post.title}
                        >
                          {post.title}
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            <KnowledgeGraph
              graphData={graphData}
              latestPostId={latestPost?.slugAsParams}
            />
          </div>
        </div>
      </section>

      {/* 精选创造 Section - 3个产品 */}
      <section className="flex min-h-screen snap-start flex-col items-center justify-center py-20 lg:py-32">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-6 text-center">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Star className="mr-2 size-4" />
              精选作品
            </Badge>
            
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              我创造的数字产品
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              从0到1的创造，每个产品都是我的数字名片，旨在解决一个真实世界的问题。
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Card key={project._id} className="group relative flex h-full flex-col overflow-hidden border border-border/20 bg-gradient-to-br from-card to-card/95 shadow-lg transition-all duration-500 hover:shadow-xl">
                {/* 产品图片区域 */}
                <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-accent/15 to-accent/5">
                  <div className="relative size-32 transition-all duration-500 group-hover:rotate-3 group-hover:scale-110">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain drop-shadow-sm transition-all duration-500 group-hover:drop-shadow-md"
                    />
                  </div>
                  {/* 排名标识 */}
                  <div className="absolute left-4 top-4">
                    <div className="rounded-full bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm">
                      #{index + 1}
                    </div>
                  </div>
                  {/* 热门标识 */}
                  <div className="absolute right-4 top-4">
                    <div className="flex items-center gap-1 rounded-full bg-primary/80 px-2 py-1 text-xs font-medium text-primary-foreground shadow-sm">
                      <TrendingUp className="size-3" />
                      热门
                    </div>
                  </div>
                </div>

                <CardContent className="flex flex-1 flex-col p-6">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold transition-colors group-hover:text-primary">
                        {project.title}
                      </h3>
                      <p className="line-clamp-3 min-h-12 leading-relaxed text-muted-foreground">
                        {project.description}
                      </p>
                    </div>

                    {/* 项目统计 */}
                    <div className="flex items-center gap-4 pt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="size-4" />
                        {formatDate(project.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="size-4" />
                        {index === 0 ? "5K+" : index === 1 ? "3K+" : "2K+"}用户
                      </div>
                    </div>
                  </div>

                  {/* 操作按钮 - 始终在底部 */}
                  <div className="mt-auto flex gap-3 pt-6">
                    <Link
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      )}
                    >
                      立即体验
                    </Link>
                    {project.docs && (
                      <Link
                        href={project.docs}
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "px-4"
                        )}
                      >
                        文档
                      </Link>
                    )}
                  </div>
                </CardContent>

                {/* 悬浮效果装饰 */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/create"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "group h-12 border-2 px-8 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              )}
            >
              查看全部项目
              <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 在路上 Section - 交互式地图重设计 */}
      {journeyPost && (
        <section className="flex h-screen snap-start flex-col items-center justify-center py-20 lg:py-32">
          <div className="container mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
            {/* 标题区域 */}
            <div className="mb-8 space-y-6 text-center">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                <Car className="mr-2 size-4" />
                在路上 · 数字游民
              </Badge>
              
              <div className="space-y-4">
                <h2 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  代码之外的山河大地
                </h2>
                
                <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
                  一场正在进行的环国自驾，是我的灵感来源，也是我的移动实验室。
                </p>
              </div>
            </div>

            {/* 地图容器 - 占据剩余空间 */}
            <div className="relative flex-1">
              <div className="to-accent/3 relative size-full overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-card/40 shadow-xl">
                <JourneyMap
                  posts={postsWithLocation}
                  activePostId={activePostId}
                  onPostHover={setHoveredPostId}
                />
                
                {/* 统计数据悬浮层 - 左上角 */}
                <div className="pointer-events-none absolute left-6 top-6 z-[1100]">
                  <div className="pointer-events-auto grid max-w-sm grid-cols-2 gap-3">
                    {[
                      { 
                        label: "足迹城市", 
                        value: stats.cities || 1, 
                        icon: MapPin,
                        color: "from-blue-500/80 to-cyan-500/80"
                      },
                      { 
                        label: "旅行天数", 
                        value: stats.daysTraveling, 
                        icon: Calendar,
                        color: "from-green-500/80 to-emerald-500/80"
                      },
                      { 
                        label: "路线站点", 
                        value: journeyConfig.plannedRoute2024.length, 
                        icon: Target,
                        color: "from-purple-500/80 to-indigo-500/80"
                      },
                      { 
                        label: "旅行故事", 
                        value: journeyPosts.length, 
                        icon: FileText,
                        color: "from-orange-500/80 to-red-500/80"
                      },
                    ].map((stat, index) => (
                      <div key={index} className="group relative">
                        <Card className="border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 hover:shadow-lg">
                          <CardContent className="p-4 text-center">
                            <div className="space-y-2">
                              <div className="mx-auto flex size-8 items-center justify-center rounded-lg bg-white/20 transition-colors duration-300 group-hover:bg-white/30">
                                <stat.icon className="size-4 text-black transition-colors duration-300 group-hover:text-black" />
                              </div>
                              <div className="space-y-1">
                                <div className="text-2xl font-bold text-black drop-shadow-sm">
                                  {stat.value}
                                </div>
                                <p className="text-xs font-medium text-black/80 drop-shadow-sm">{stat.label}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 操作按钮悬浮层 - 右下角 */}
                <div className="absolute bottom-6 right-6 z-[1100]">
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/journey"
                      className={cn(
                        buttonVariants({ size: "sm" }),
                        "group justify-start border-white/20 bg-white/10 text-black backdrop-blur-sm hover:bg-white/20 hover:text-black"
                      )}
                    >
                      <Globe className="mr-2 size-4 transition-transform group-hover:rotate-12" />
                      跟随我的足迹
                    </Link>
                    
                    <Link
                      href={journeyPost.slug}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "sm" }),
                        "justify-start border-white/20 bg-white/10 text-black backdrop-blur-sm hover:bg-white/20 hover:text-black"
                      )}
                    >
                      <FileText className="mr-2 size-4" />
                      阅读最新故事
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 订阅 Section - 全新设计 */}
      <section className="flex min-h-screen snap-start items-center justify-center border-t border-border/20 bg-accent/20 py-20 lg:py-32">
        <div className="container mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
              加入我的旅程
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              订阅我的邮件列表，获取关于AI、独立开发和数字游民生活的最新思考和独家内容。不错过任何一次思想的碰撞。
            </p>
            <div className="mx-auto flex max-w-md flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="输入你的邮箱..."
                className="flex h-12 w-full flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
              <button
                type="submit"
                className={cn(buttonVariants({ size: "lg" }), "h-12 px-8")}
              >
                订阅更新
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              我尊重你的隐私。绝不发送垃圾邮件。
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
