import Image from "next/image"
import Link from "next/link"
import { allProjects } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import { ArrowRight, Users, Download, Star, TrendingUp, Zap, Globe, ExternalLink, FileText, Crown, Award } from "lucide-react"

export const metadata: Metadata = {
  title: "创造 - " + siteConfig.name,
  description: "我创造过的产品和项目。",
}

export default async function CreatePage() {
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  // 产品数据统计
  const stats = {
    totalUsers: "10万+",
    totalProducts: projects.length,
    avgRating: "4.9",
    totalDownloads: "50万+"
  }

  // 产品特色数据
  const productFeatures = {
    "emoji-fusion": {
      users: "5000+",
      rating: "4.9",
      category: "表情包生成",
      highlights: ["3秒生成", "海量模板", "一键分享"],
      badge: "🔥 爆款"
    },
    "feishu-doc-helper": {
      users: "3000+", 
      rating: "4.8",
      category: "效率工具",
      highlights: ["批量导出", "文档漫游", "数据备份"],
      badge: "⚡ 高效"
    },
    "weread-toolbox": {
      users: "2000+",
      rating: "4.9", 
      category: "读书笔记",
      highlights: ["智能导出", "思维导图", "同步Notion"],
      badge: "🎯 专业"
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - 超级吸引力 */}
      <section className="relative py-20 lg:py-32 overflow-hidden bg-gradient-to-br from-background via-background/95 to-accent/5">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            {/* 成就标识 */}
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
              <Crown className="w-5 h-5 text-primary" />
              <span className="text-sm font-semibold">已帮助 {stats.totalUsers} 用户提升效率</span>
              <Award className="w-5 h-5 text-accent" />
            </div>

            {/* 主标题 */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  独立创造
                </span>
                <br />
                <span className="text-primary">改变生活</span>
              </h1>
              
              <p className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                从 <span className="text-primary font-bold">0</span> 到 <span className="text-green-600 font-bold">1</span> 的创造历程
                <br />
                每个产品都在解决真实问题，创造真实价值
              </p>
            </div>

            {/* 成果数据 */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { label: "总用户数", value: stats.totalUsers, icon: Users, color: "text-blue-600" },
                { label: "产品数量", value: stats.totalProducts, icon: Globe, color: "text-green-600" },
                { label: "用户评分", value: stats.avgRating, icon: Star, color: "text-yellow-600" },
                { label: "总下载量", value: stats.totalDownloads, icon: Download, color: "text-purple-600" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-6 transition-all duration-300 hover:bg-card/80 hover:border-primary/30 hover:shadow-lg hover:scale-105">
                    <stat.icon className={`w-8 h-8 ${stat.color} mb-3 mx-auto`} />
                    <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Link
                href="#products"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-16 px-8 text-lg font-semibold bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-xl hover:shadow-2xl transition-all duration-300 group"
                )}
              >
                <Zap className="w-6 h-6 mr-2 group-hover:rotate-12 transition-transform" />
                立即体验我的产品
                <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* 向下滚动指示器 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* 产品展示 Section */}
      <section id="products" className="py-20 lg:py-32 bg-gradient-to-b from-background to-accent/5">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center space-y-6 mb-20">
            <Badge variant="outline" className="px-6 py-3 text-base">
              <TrendingUp className="w-5 h-5 mr-2" />
              精品产品矩阵
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              每一个产品都是
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                用心打磨
              </span>
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              基于真实需求，解决实际问题，获得用户认可
            </p>
          </div>

          {/* 产品网格 */}
          <div className="grid lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const projectKey = project.slug.split('/').pop() as keyof typeof productFeatures
              const features = productFeatures[projectKey]
              
              return (
                <Card key={project._id} className="group relative overflow-hidden border border-border/20 shadow-xl hover:shadow-2xl transition-all duration-700 bg-gradient-to-br from-card to-card/95 flex flex-col h-full">
                  {/* 产品图片和标识区域 */}
                  <div className="relative h-64 bg-gradient-to-br from-accent/10 to-accent/5 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain p-8 transition-all duration-700 group-hover:scale-110 group-hover:rotate-3"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    
                    {/* 热门标识 */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                        {features?.badge}
                      </div>
                    </div>
                    
                    {/* 评分 */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-black/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        {features?.rating}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-8 flex flex-col flex-1">
                    {/* 产品信息 */}
                    <div className="flex-1 space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                            {project.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {features?.category}
                          </Badge>
                        </div>
                        
                        <p className="text-muted-foreground leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* 产品特色 */}
                      <div className="space-y-3">
                        <h4 className="font-semibold text-sm text-foreground">核心特色</h4>
                        <div className="flex flex-wrap gap-2">
                          {features?.highlights.map((highlight, i) => (
                            <Badge key={i} variant="outline" className="text-xs bg-accent/10">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* 用户数据 */}
                      <div className="grid grid-cols-2 gap-4 py-4 border-t border-border/20">
                        <div className="text-center">
                          <div className="text-xl font-bold text-primary">{features?.users}</div>
                          <div className="text-xs text-muted-foreground">活跃用户</div>
                        </div>
                        <div className="text-center">
                          <div className="text-xl font-bold text-green-600">免费</div>
                          <div className="text-xs text-muted-foreground">永久使用</div>
                        </div>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="flex gap-3 pt-6 mt-auto">
                      <Link
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ size: "lg" }),
                          "flex-1 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group"
                        )}
                      >
                        <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                        立即下载
                        <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      
                      {project.docs && (
                        <Link
                          href={project.docs}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "lg" }),
                            "px-4 border-2 hover:bg-accent/50 transition-all duration-300"
                          )}
                        >
                          <FileText className="w-4 h-4" />
                        </Link>
                      )}
                    </div>
                  </CardContent>

                  {/* 悬浮效果装饰 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                </Card>
              )
            })}
          </div>

          {/* 底部CTA */}
          <div className="text-center mt-20">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                加入 <span className="text-primary font-bold">{stats.totalUsers}</span> 用户，体验效率革命
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/explore"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 px-8 border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300 group"
                  )}
                >
                  了解开发故事
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
                
                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "h-12 px-8 hover:bg-accent/50 transition-all duration-300"
                  )}
                >
                  关于开发者
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 