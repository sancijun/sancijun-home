import React from "react"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Download, FileText, ExternalLink, Image as ImageIcon, Star, Repeat, Code, Layers, Laptop, MousePointer2, BookOpen, Network, Check, ArrowRight, ChevronRight, Cpu, Zap, Target, TrendingUp, Users, Quote } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
// 移除 StatsSection 导入

export const metadata: Metadata = {
  title: "微信读书工具箱 - " + siteConfig.name,
  description: "支持导出图文 Markdown/Word 笔记，生成思维导图，同步 Notion，适配 Obsidian 等。",
}

export default function WereadToolboxPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* 英雄区域 (Hero Section) */}
      <section className="relative overflow-hidden border-b bg-background/95 py-24 backdrop-blur-sm lg:py-32">
        {/* 背景装饰 */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/2 absolute -left-[20%] -top-[50%] size-4/5 rounded-full opacity-70 blur-3xl" />
          <div className="bg-primary/2 absolute -bottom-[50%] -right-[20%] size-4/5 rounded-full opacity-70 blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* 左侧文本区域 */}
            <div className="animate-fadeIn space-y-10 pt-8">
              <div className="space-y-8">
                {/* Logo + 标题 */}
                <div className="flex items-center gap-4">
                  <div className="animate-float relative size-14">
                    <Image
                      src="/images/product/weread-toolbox-logo.png"
                      alt="微信读书工具箱 logo"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    微信读书<span className="text-primary">工具箱</span>
                  </h1>
                </div>

                {/* 主标语和描述 */}
                <div className="space-y-6">
                  <p className="text-2xl font-medium leading-relaxed text-foreground/90 sm:text-3xl">
                    让阅读笔记真正成为你的知识资产
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                    从碎片化笔记到结构化知识体系，支持导出图文 Markdown/Word 笔记，生成思维导图，同步 Notion，适配 Obsidian 等。
                  </p>
                </div>
              </div>
              
              {/* CTA 按钮 */}
              <div className="flex flex-col gap-4 pb-6 sm:flex-row">
                <Link
                  href="https://github.com/sancijun/weread-toolbox/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "group relative h-12 overflow-hidden bg-gradient-to-r from-primary to-primary/80 px-8 shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-primary/70 hover:shadow-xl"
                  )}
                >
                  <span className="group-hover:animate-shimmer absolute inset-0 size-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100"></span>
                  <Download className="mr-2 size-5 transition-transform group-hover:scale-110" />
                  立即下载
                  <ExternalLink className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  href="/docs/weread-toolbox"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "group h-12 border-2 px-8 transition-all duration-300 hover:bg-accent/50"
                  )}
                >
                  <FileText className="mr-2 size-5 transition-transform group-hover:scale-110" />
                  查看文档
                  <ChevronRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              {/* 添加一个特性预览标签，替代原来的统计数据 */}
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
                <BookOpen className="size-4 text-primary" />
                <span className="text-sm font-medium">轻松管理您的阅读笔记和知识</span>
              </div>
            </div>
            
            {/* 右侧视觉区域 */}
            <div className="animate-float relative overflow-hidden rounded-3xl bg-card/30 shadow-2xl lg:h-[500px]">
              <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-primary/5 via-transparent to-transparent" />
              <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl border border-border/30" />
              
              <div className="relative size-full overflow-hidden rounded-3xl">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="size-full object-cover"
                >
                  <source src="/weread-toolbox-presentation.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 问题与承诺 (Problem & Solution) */}
      <section className="relative bg-background/95 py-20 backdrop-blur-sm lg:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/2 absolute -right-[10%] -top-[30%] size-3/5 rounded-full opacity-70 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 md:grid-cols-2 lg:gap-20">
            {/* 问题部分 */}
            <div className="animate-slideUp space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
                  <Target className="size-4 text-primary" />
                  <span className="text-sm font-medium">问题痛点</span>
                </div>
                <h2 className="mt-6 font-heading text-4xl font-bold sm:text-5xl">
                  您是否遇到这些问题？
                </h2>
              </div>
              <div className="prose prose-lg dark:prose-invert">
                <ul className="list-none space-y-8 pl-0">
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-muted-foreground">✕</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">微信读书官方导出的笔记<strong className="font-semibold text-foreground">没有图片</strong>，只有文字，严重影响阅读体验</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-muted-foreground">✕</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">笔记<strong className="font-semibold text-foreground">无法同步</strong>到 Notion、Obsidian 等知识管理工具，造成知识孤岛</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-muted-foreground">✕</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">无法快速<strong className="font-semibold text-foreground">可视化</strong>书籍内容结构，难以建立知识连接</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-muted-foreground">✕</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">阅读界面<strong className="font-semibold text-foreground">宽度固定</strong>，无法根据屏幕大小自适应调整</p>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* 解决方案部分 */}
            <div className="animate-slideUp animation-delay-300 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
                  <Zap className="size-4 text-primary" />
                  <span className="text-sm font-medium">解决方案</span>
                </div>
                <h2 className="mt-6 font-heading text-4xl font-bold sm:text-5xl">
                  我们的解决方案
                </h2>
              </div>
              <div className="prose prose-lg dark:prose-invert">
                <ul className="list-none space-y-8 pl-0">
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-primary">✓</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1"><strong className="text-primary">完整保留图片</strong>的笔记导出，支持 Markdown 和 Word 格式</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-primary">✓</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1"><strong className="text-primary">一键同步</strong>到 Notion 和 Obsidian，打通知识管理系统</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-primary">✓</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">智能生成<strong className="text-primary">思维导图</strong>，直观展示知识结构</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-primary">✓</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">灵活<strong className="text-primary">调整阅读界面宽度</strong>，优化阅读体验</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心功能展示 (Feature Showcase) */}
      <section className="relative bg-background/95 py-20 backdrop-blur-sm lg:py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/2 absolute -bottom-[30%] -left-[10%] size-3/5 rounded-full opacity-70 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-6 text-center">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Cpu className="mr-2 size-4" />
              核心功能
            </Badge>
            
            <h2 className="font-heading text-4xl font-bold sm:text-5xl">
              专为提升您的<span className="text-primary">阅读体验</span>和知识管理而设计
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              每一个功能都经过精心打磨，让您的阅读笔记更有价值
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <ImageIcon className="size-5" />,
                title: "图文笔记导出",
                description: "完整保留图片的笔记导出，支持 Markdown 和 Word 格式。"
              },
              {
                icon: <Star className="size-5" />,
                title: "热门标注导出",
                description: "一键导出本书热门标注，快速了解全书精华内容。"
              },
              {
                icon: <Repeat className="size-5" />,
                title: "同步到 Notion",
                description: "一键将图文笔记同步到 Notion，实现知识的统一管理。"
              },
              {
                icon: <Code className="size-5" />,
                title: "思维导图生成",
                description: "自动将笔记转换为思维导图，直观展示知识结构。"
              },
              {
                icon: <Layers className="size-5" />,
                title: "适配 Obsidian",
                description: "完美适配 Obsidian，支持笔记关系图谱，构建知识网络。"
              },
              {
                icon: <Laptop className="size-5" />,
                title: "屏幕宽度调整",
                description: "灵活调整阅读界面宽度，适应不同屏幕尺寸。"
              },
              {
                icon: <MousePointer2 className="size-5" />,
                title: "解除右键限制",
                description: "解除右键使用限制，让操作更加自由便捷。"
              },
              {
                icon: <BookOpen className="size-5" />,
                title: "全量笔记导出",
                description: "一键导出您书架上所有图书的笔记，批量处理。"
              },
              {
                icon: <Network className="size-5" />,
                title: "知识管理工作流",
                description: "构建从阅读到知识管理的完整工作流。"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="animate-fadeIn group relative overflow-hidden border border-border/20 bg-gradient-to-br from-card to-card/95 shadow transition-all duration-500 hover:shadow-md"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="relative space-y-3 p-4">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-lg font-semibold transition-colors group-hover:text-primary">{feature.title}</h3>
                  
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 动态演示/视觉画廊 (Live Demo / Visual Gallery) */}
      <section className="relative bg-background/95 py-20 backdrop-blur-sm lg:py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/2 absolute -right-[10%] -top-[30%] size-3/5 rounded-full opacity-70 blur-3xl" />
          <div className="bg-primary/2 absolute -bottom-[30%] -left-[10%] size-3/5 rounded-full opacity-70 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-6 text-center">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <TrendingUp className="mr-2 size-4" />
              产品演示
            </Badge>
            
            <h2 className="font-heading text-4xl font-bold sm:text-5xl">
              看看它是如何<span className="text-primary">工作</span>的
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              一分钟了解微信读书工具箱的核心功能
            </p>
          </div>
          
          <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-3xl shadow-2xl">
            <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-primary/10 via-transparent to-transparent" />
            <div className="pointer-events-none absolute inset-0 z-10 rounded-3xl border border-border/30" />
            
            <div className="relative aspect-video">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="size-full object-cover"
              >
                <source src="/weread-toolbox-features.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="mx-auto mt-8 max-w-6xl text-center">
            <p className="text-lg italic text-muted-foreground">
              "微信读书工具箱让我的读书笔记整理效率提升了10倍，思维导图功能太赞了！"— 知识管理爱好者
            </p>
          </div>
        </div>
      </section>

      {/* 适用人群 (Who is this for?) */}
      <section className="relative bg-background/95 py-20 backdrop-blur-sm lg:py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/2 absolute -bottom-[30%] -right-[10%] size-3/5 rounded-full opacity-70 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-6 text-center">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Users className="mr-2 size-4" />
              适用人群
            </Badge>
            
            <h2 className="font-heading text-4xl font-bold sm:text-5xl">
              这款产品<span className="text-primary">专为</span>以下人群设计
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              如果你符合以下任一特征，微信读书工具箱将成为你的得力助手
            </p>
          </div>
          
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2">
            {[
              "热爱阅读并经常做笔记的读书爱好者",
              "需要将读书笔记整合到知识管理系统的知识工作者",
              "使用 Notion、Obsidian 等工具进行个人知识管理的用户",
              "希望通过思维导图更好理解和记忆书籍内容的学习者",
              "对知识体系化、结构化有需求的专业人士",
              "希望提升阅读效率和体验的微信读书用户"
            ].map((audience, index) => (
              <div key={index} className="animate-fadeIn group flex items-start gap-4 rounded-lg p-4 transition-colors hover:bg-accent/10" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="mt-1.5 shrink-0">
                  <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                    <Check className="size-3 text-primary" />
                  </div>
                </div>
                <p className="text-base transition-transform group-hover:translate-x-1">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 最终行动号召 (Final CTA) */}
      <section className="relative bg-background/95 py-20 backdrop-blur-sm lg:py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/2 absolute -right-[10%] -top-[40%] size-[70%] rounded-full opacity-70 blur-3xl" />
          <div className="bg-primary/2 absolute -bottom-[30%] -left-[10%] size-3/5 rounded-full opacity-70 blur-3xl" />
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl space-y-8 text-center">
            <Badge variant="outline" className="bg-background/50 px-4 py-2 text-sm backdrop-blur-sm">
              立即行动
            </Badge>
            
            <h2 className="font-heading text-4xl font-bold sm:text-5xl lg:text-6xl">
              准备好<span className="text-primary">提升</span>您的阅读体验了吗？
            </h2>
            
            <p className="text-lg text-muted-foreground sm:text-xl">
              立即下载，开始使用这款强大的工具，让您的阅读笔记真正成为知识资产
            </p>
            
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Link
                href="https://github.com/sancijun/weread-toolbox/releases"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group relative h-12 overflow-hidden bg-gradient-to-r from-primary to-primary/80 px-8 shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-primary/70 hover:shadow-xl"
                )}
              >
                <span className="group-hover:animate-shimmer absolute inset-0 size-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100"></span>
                <Download className="mr-2 size-5 transition-transform group-hover:scale-110" />
                立即下载
                <ExternalLink className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/docs/weread-toolbox"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "group h-12 border-2 bg-background/50 px-8 backdrop-blur-sm transition-all duration-300 hover:bg-accent/50"
                )}
              >
                <FileText className="mr-2 size-5 transition-transform group-hover:scale-110" />
                查看文档
                <ChevronRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="pt-8">
              <Progress value={85} className="mx-auto h-2 w-64" />
              <p className="pt-2 text-sm text-muted-foreground">
                已有 85% 的用户选择使用微信读书工具箱
              </p>
            </div>
            
            <p className="pt-6 text-sm text-muted-foreground">
              由 <Link href="/about" className="text-primary hover:underline">三此君</Link> 精心打造 · 完全免费 · 开源项目
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 