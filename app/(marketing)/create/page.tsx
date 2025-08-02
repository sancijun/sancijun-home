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
      {/* 产品展示 Section */}
      <section id="products" className="bg-gradient-to-b from-background to-accent/5 py-12 lg:py-16">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-20 space-y-6 text-center">
            <Badge variant="outline" className="px-6 py-3 text-base">
              <TrendingUp className="mr-2 size-5" />
              精品产品矩阵
            </Badge>
            
            <h2 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              每一个产品都是用心打磨
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              基于真实需求，解决实际问题，获得用户认可
            </p>
          </div>

          {/* 产品网格 */}
          <div className="grid gap-8 lg:grid-cols-3">
            {projects.map((project, index) => {
              const projectKey = project.slug.split('/').pop() as keyof typeof productFeatures
              const features = productFeatures[projectKey]
              
              return (
                <Card key={project._id} className="group relative flex h-full flex-col overflow-hidden border border-border/20 bg-gradient-to-br from-card to-card/95 shadow-xl transition-all duration-700 hover:shadow-2xl">
                  {/* 产品图片和标识区域 */}
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-accent/10 to-accent/5">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain p-6 transition-all duration-700 group-hover:rotate-3 group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    
                    {/* 热门标识 */}
                    <div className="absolute left-4 top-4">
                      <div className="rounded-full bg-gradient-to-r from-primary to-primary/80 px-3 py-1 text-xs font-bold text-primary-foreground shadow-lg">
                        {features?.badge}
                      </div>
                    </div>
                    
                    {/* 评分 */}
                    <div className="absolute right-4 top-4">
                      <div className="flex items-center gap-1 rounded-full bg-black/20 px-3 py-1 text-sm font-medium text-white backdrop-blur-sm">
                        <Star className="size-4 fill-current text-primary" />
                        {features?.rating}
                      </div>
                    </div>
                  </div>

                  <CardContent className="flex flex-1 flex-col p-6">
                    {/* 产品信息 */}
                    <div className="flex-1 space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-heading text-xl font-bold transition-colors group-hover:text-primary">
                            {project.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {features?.category}
                          </Badge>
                        </div>
                        
                        <p className="line-clamp-3 text-sm leading-normal text-muted-foreground">
                          {project.description}
                        </p>
                      </div>

                      {/* 产品特色 */}
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-foreground">核心特色</h4>
                        <div className="flex flex-wrap gap-2">
                          {features?.highlights.map((highlight, i) => (
                            <Badge key={i} variant="outline" className="bg-accent/10 text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* 用户数据 */}
                      <div className="grid grid-cols-2 gap-4 border-t border-border/20 py-2">
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">{features?.users}</div>
                          <div className="text-xs text-muted-foreground">活跃用户</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-primary">免费</div>
                          <div className="text-xs text-muted-foreground">永久使用</div>
                        </div>
                      </div>
                    </div>

                    {/* 操作按钮 */}
                    <div className="mt-auto flex gap-3 pt-4">
                      <Link
                        href={project.slug.includes("weread-toolbox") || project.slug.includes("feishu-doc-helper") ? `/create/${project.slug.split('/').pop()}` : project.url}
                        target={project.slug.includes("weread-toolbox") || project.slug.includes("feishu-doc-helper") ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className={cn(
                          buttonVariants({ size: "default" }),
                          "group flex-1 bg-gradient-to-r from-primary to-primary/80 shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-primary/70 hover:shadow-xl"
                        )}
                      >
                        <Download className="mr-2 size-4 transition-transform group-hover:scale-110" />
                        {project.slug.includes("weread-toolbox") || project.slug.includes("feishu-doc-helper") ? "查看详情" : "立即下载"}
                        {!(project.slug.includes("weread-toolbox") || project.slug.includes("feishu-doc-helper")) && <ExternalLink className="ml-2 size-4 transition-transform group-hover:translate-x-1" />}
                      </Link>
                      
                      {project.docs && (
                        <Link
                          href={project.docs}
                          className={cn(
                            buttonVariants({ variant: "outline", size: "default" }),
                            "border-2 px-4 transition-all duration-300 hover:bg-accent/50"
                          )}
                        >
                          <FileText className="size-4" />
                        </Link>
                      )}
                    </div>
                  </CardContent>

                  {/* 悬浮效果装饰 */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/5 to-primary/0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                </Card>
              )
            })}
          </div>

          {/* 底部CTA */}
          <div className="mt-20 text-center">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                加入 <span className="font-bold text-primary">{stats.totalUsers}</span> 用户，体验效率革命
              </p>
              
              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/explore"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "group h-12 border-2 px-8 transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                  )}
                >
                  了解开发故事
                  <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  href="/about"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "lg" }),
                    "h-12 px-8 transition-all duration-300 hover:bg-accent/50"
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