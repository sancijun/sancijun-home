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

export default function IndexPage() {
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

  const journeyPost = allPosts
    .filter((post) => post.published && post.category === "环国自驾")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 1)[0]

  // 统计数据
  const stats = {
    articles: allPosts.filter(p => p.published).length,
    projects: allProjects.filter(p => p.published).length,
    cities: 12,
    daysTraveling: Math.floor((new Date().getTime() - new Date('2025-07-05').getTime()) / (1000 * 60 * 60 * 24)) + 1
  }

  return (
    <div className="h-[calc(100vh-80px)] overflow-y-auto snap-y snap-mandatory">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden min-h-screen flex items-center justify-center snap-start">
        <HeroBackground />
        <div className="container relative z-10 mx-auto max-w-5xl px-4">
          <div className="text-center space-y-10">
            <Badge
              variant="outline"
              className="text-sm font-medium px-4 py-2 border-border/30 bg-background/50 backdrop-blur-sm animate-fadeIn"
              style={{ animationDelay: "0ms" }}
            >
              在路上 · 进行时
            </Badge>

            <div
              className="animate-fadeIn"
              style={{ animationDelay: "200ms" }}
            >
              <h1 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight">
                三此君
              </h1>
              <p className="mt-6 text-lg sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
                AI、代码与山河：一个独立开发者的环国实战。
              </p>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground/90 max-w-3xl mx-auto leading-relaxed">
                此时、此地、此身，向着数字世界与真实大地，发起一场热烈的环国实战，在路上探索与创造。
              </p>
            </div>

            <div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeIn"
              style={{ animationDelay: "400ms" }}
            >
              <Link
                href="/explore"
                className={cn(buttonVariants({ size: "lg" }), "h-12 px-8 text-base")}
              >
                进入数字花园
              </Link>
              <Link
                href="/create"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-8 text-base bg-background/50 backdrop-blur-sm"
                )}
              >
                见证创造作品
              </Link>
            </div>
            
            <div
              className="max-w-3xl mx-auto pt-10 animate-fadeIn"
              style={{ animationDelay: "600ms" }}
            >
              <div className="p-4 bg-background/40 backdrop-blur-md rounded-2xl border border-border/30">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {[
                    { label: "原创文章", value: stats.articles, icon: FileText },
                    { label: "创造作品", value: stats.projects, icon: Rocket },
                    { label: "足迹城市", value: stats.cities, icon: Globe },
                    { label: "在路天数", value: stats.daysTraveling, icon: Clock },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <p className="text-2xl sm:text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Knowledge Graph Section */}
      <section className="h-screen bg-gradient-to-b from-background to-accent/5 flex flex-col justify-center snap-start py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center h-full max-h-full">
          <div className="text-center space-y-6 mb-8">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Cpu className="w-4 h-4 mr-2" />
              知识图谱
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              探索·数字花园
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              每一份内容，都是技术实践、在地体验与个人思考的三位一体。
              <br />
              在这里，代码与山河交织，AI与哲思碰撞。
            </p>
          </div>

          <div className="relative rounded-3xl border border-border/30 bg-gradient-to-br from-card/40 to-accent/3 overflow-hidden shadow-xl w-full flex-1 min-h-0">
            {/* 图例 */}
            <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-3">
              {[
                { label: "AI洞察" },
                { label: "产品构建" },
                { label: "效率工具" },
                { label: "环国自驾" },
              ].map((item, index) => (
                <Badge key={index} variant="secondary" className="bg-card/90 backdrop-blur-sm border-border/20">
                  {item.label}
                </Badge>
              ))}
            </div>

            {/* 最新文章卡片 */}
            {latestPosts.length > 0 && (
              <div className="absolute top-6 right-6 z-10 w-72">
                <Card className="bg-card/95 backdrop-blur-sm border-border/30 shadow-lg animate-fadeIn">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm flex items-center gap-2 font-medium text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      最新探索
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {latestPosts.map((post) => (
                        <Link
                          key={post.slug}
                          href={post.slug}
                          className="block text-sm font-medium text-foreground/80 hover:text-primary transition-colors truncate"
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
      <section className="py-20 lg:py-32 min-h-screen flex flex-col items-center justify-center snap-start">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Star className="w-4 h-4 mr-2" />
              精选作品
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              独立创造的<span className="text-primary">数字产品</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              从0到1的创造，每个产品都是我的数字名片，
              <br />
              旨在解决一个真实世界的问题。
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={project._id} className="group relative overflow-hidden border border-border/20 shadow-lg hover:shadow-xl transition-all duration-500 bg-gradient-to-br from-card to-card/95 flex flex-col h-full">
                {/* 产品图片区域 */}
                <div className="relative h-48 bg-gradient-to-br from-accent/15 to-accent/5 overflow-hidden flex items-center justify-center">
                  <div className="relative w-32 h-32 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain drop-shadow-sm group-hover:drop-shadow-md transition-all duration-500"
                    />
                  </div>
                  {/* 排名标识 */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold shadow-sm">
                      #{index + 1}
                    </div>
                  </div>
                  {/* 热门标识 */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-primary/80 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 shadow-sm">
                      <TrendingUp className="w-3 h-3" />
                      热门
                    </div>
                  </div>
                </div>

                <CardContent className="p-6 flex flex-col flex-1">
                  <div className="flex-1 space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed min-h-[3rem] line-clamp-3">
                        {project.description}
                      </p>
                    </div>

                    {/* 项目统计 */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground pt-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(project.date)}
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {index === 0 ? "5K+" : index === 1 ? "3K+" : "2K+"}用户
                      </div>
                    </div>
                  </div>

                  {/* 操作按钮 - 始终在底部 */}
                  <div className="flex gap-3 pt-6 mt-auto">
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
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </Card>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/create"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "h-12 px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
              )}
            >
              查看全部项目
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 环国自驾 Section - 全新设计 */}
      {journeyPost && (
        <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-accent/5 min-h-screen flex items-center justify-center snap-start">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-card to-accent/3 shadow-xl">
              {/* 背景图片 */}
              <div className="absolute inset-0">
                <Image
                  src={journeyPost.image}
                  alt={journeyPost.title}
                  fill
                  className="object-cover opacity-15"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/50" />
              </div>

              <div className="relative p-12 lg:p-20">
                <div className="max-w-6xl mx-auto text-center space-y-8">
                  {/* 标识 */}
                  <Badge variant="outline" className="px-4 py-2 text-sm bg-card/90 backdrop-blur-sm">
                    <Car className="w-4 h-4 mr-2" />
                    数字游民 · 实时记录
                  </Badge>

                  {/* 主标题 */}
                  <div className="space-y-4">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                      代码之外
                      <br />
                      <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                        是真实的山河大地
                      </span>
                    </h2>
                    
                    <p className="text-xl sm:text-2xl text-muted-foreground">
                      一场正在进行的环国自驾，是我的灵感来源，也是我的移动实验室。
                    </p>
                  </div>

                  {/* 旅程数据可视化 */}
                  <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 space-y-6 border border-border/20">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                      {[
                        { label: "已走过", value: "12", unit: "城市" },
                        { label: "总里程", value: "8.5K", unit: "公里" },
                        { label: "在路上", value: stats.daysTraveling, unit: "天" },
                        { label: "目标", value: "34", unit: "城市" },
                      ].map((stat, index) => (
                        <div key={index} className="text-center">
                          <div className={`text-2xl sm:text-3xl font-bold text-primary`}>
                            {stat.value}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {stat.unit} {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 进度条 */}
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span>旅程进度</span>
                        <span>35% (12/34 城市)</span>
                      </div>
                      <div className="relative">
                        <Progress value={35} className="h-3 bg-accent/50" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full" />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>🚗 深圳出发</span>
                        <span>🏁 环国自驾</span>
                      </div>
                    </div>
                  </div>

                  {/* 行动按钮 */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/journey"
                      className={cn(
                        buttonVariants({ size: "lg" }),
                        "h-14 px-8 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg group"
                      )}
                    >
                      <Globe className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      跟随我的足迹
                      <MapPin className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                    </Link>
                    
                    <Link
                      href={journeyPost.slug}
                      className={cn(
                        buttonVariants({ variant: "outline", size: "lg" }),
                        "h-14 px-8 text-lg border-2 bg-card/60 backdrop-blur-sm hover:bg-card/80"
                      )}
                    >
                      阅读最新游记
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 订阅 Section - 全新设计 */}
      <section className="py-20 lg:py-32 bg-accent/20 border-t border-border/20 min-h-screen flex items-center justify-center snap-start">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
              加入我的旅程
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              订阅我的邮件列表，获取关于AI、独立开发和数字游民生活的最新思考和独家内容。不错过任何一次思想的碰撞。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="输入你的邮箱..."
                className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1"
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
