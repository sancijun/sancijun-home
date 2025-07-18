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
import { StatsSection } from "./stats-section"

export const metadata: Metadata = {
  title: "微信读书工具箱 - " + siteConfig.name,
  description: "支持导出图文 Markdown/Word 笔记，生成思维导图，同步 Notion，适配 Obsidian 等。",
}

export default function WereadToolboxPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 英雄区域 (Hero Section) */}
      <section className="relative py-24 lg:py-32 overflow-hidden border-b bg-background/95 backdrop-blur-sm">
        {/* 背景装饰 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[80%] rounded-full bg-primary/2 blur-3xl opacity-70" />
          <div className="absolute -bottom-[50%] -right-[20%] w-[80%] h-[80%] rounded-full bg-primary/2 blur-3xl opacity-70" />
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* 左侧文本区域 */}
            <div className="space-y-10 animate-fadeIn pt-8">
              <div className="space-y-8">
                {/* Logo + 标题 */}
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 relative animate-float">
                    <Image
                      src="/images/product/weread-toolbox-logo.png"
                      alt="微信读书工具箱 logo"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-heading">
                    微信读书<span className="text-primary">工具箱</span>
                  </h1>
                </div>

                {/* 主标语和描述 */}
                <div className="space-y-6">
                  <p className="text-2xl sm:text-3xl text-foreground/90 font-medium leading-relaxed">
                    让阅读笔记真正成为你的知识资产
                  </p>
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    从碎片化笔记到结构化知识体系，支持导出图文 Markdown/Word 笔记，生成思维导图，同步 Notion，适配 Obsidian 等。
                  </p>
                </div>
              </div>
              
              {/* CTA 按钮 */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://github.com/sancijun/weread-toolbox/releases"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  )}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
                  <Download className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  立即下载
                  <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  href="/docs/weread-toolbox"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 px-8 border-2 hover:bg-accent/50 transition-all duration-300 group"
                  )}
                >
                  <FileText className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  查看文档
                  <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              {/* 统计数据 */}
              <StatsSection />
            </div>
            
            {/* 右侧视觉区域 */}
            <div className="relative lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl animate-float bg-card/30">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent pointer-events-none z-10" />
              <div className="absolute inset-0 border border-border/30 rounded-3xl z-10 pointer-events-none" />
              
              <div className="relative w-full h-full rounded-3xl overflow-hidden">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
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
      <section className="relative py-20 lg:py-28 bg-background/95 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/2 blur-3xl opacity-70" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
            {/* 问题部分 */}
            <div className="space-y-8 animate-slideUp">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border border-border/50 shadow-sm">
                  <Target className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">问题痛点</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold font-heading mt-6">
                  您是否遇到这些问题？
                </h2>
              </div>
              <div className="prose prose-lg dark:prose-invert">
                <ul className="space-y-8 list-none pl-0">
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-muted-foreground text-sm">✕</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">微信读书官方导出的笔记<strong className="text-foreground font-semibold">没有图片</strong>，只有文字，严重影响阅读体验</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-muted-foreground text-sm">✕</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">笔记<strong className="text-foreground font-semibold">无法同步</strong>到 Notion、Obsidian 等知识管理工具，造成知识孤岛</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-muted-foreground text-sm">✕</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">无法快速<strong className="text-foreground font-semibold">可视化</strong>书籍内容结构，难以建立知识连接</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-muted-foreground text-sm">✕</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">阅读界面<strong className="text-foreground font-semibold">宽度固定</strong>，无法根据屏幕大小自适应调整</p>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* 解决方案部分 */}
            <div className="space-y-8 animate-slideUp animation-delay-300">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border border-border/50 shadow-sm">
                  <Zap className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">解决方案</span>
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold font-heading mt-6">
                  我们的解决方案
                </h2>
              </div>
              <div className="prose prose-lg dark:prose-invert">
                <ul className="space-y-8 list-none pl-0">
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base"><strong className="text-primary">完整保留图片</strong>的笔记导出，支持 Markdown 和 Word 格式</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base"><strong className="text-primary">一键同步</strong>到 Notion 和 Obsidian，打通知识管理系统</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">智能生成<strong className="text-primary">思维导图</strong>，直观展示知识结构</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">灵活<strong className="text-primary">调整阅读界面宽度</strong>，优化阅读体验</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 核心功能展示 (Feature Showcase) */}
      <section className="relative py-20 lg:py-32 bg-background/95 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/2 blur-3xl opacity-70" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Cpu className="w-4 h-4 mr-2" />
              核心功能
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl font-bold font-heading">
              专为提升您的<span className="text-primary">阅读体验</span>和知识管理而设计
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              每一个功能都经过精心打磨，让您的阅读笔记更有价值
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <ImageIcon className="w-5 h-5" />,
                title: "图文笔记导出",
                description: "完整保留图片的笔记导出，支持 Markdown 和 Word 格式。"
              },
              {
                icon: <Star className="w-5 h-5" />,
                title: "热门标注导出",
                description: "一键导出本书热门标注，快速了解全书精华内容。"
              },
              {
                icon: <Repeat className="w-5 h-5" />,
                title: "同步到 Notion",
                description: "一键将图文笔记同步到 Notion，实现知识的统一管理。"
              },
              {
                icon: <Code className="w-5 h-5" />,
                title: "思维导图生成",
                description: "自动将笔记转换为思维导图，直观展示知识结构。"
              },
              {
                icon: <Layers className="w-5 h-5" />,
                title: "适配 Obsidian",
                description: "完美适配 Obsidian，支持笔记关系图谱，构建知识网络。"
              },
              {
                icon: <Laptop className="w-5 h-5" />,
                title: "屏幕宽度调整",
                description: "灵活调整阅读界面宽度，适应不同屏幕尺寸。"
              },
              {
                icon: <MousePointer2 className="w-5 h-5" />,
                title: "解除右键限制",
                description: "解除右键使用限制，让操作更加自由便捷。"
              },
              {
                icon: <BookOpen className="w-5 h-5" />,
                title: "全量笔记导出",
                description: "一键导出您书架上所有图书的笔记，批量处理。"
              },
              {
                icon: <Network className="w-5 h-5" />,
                title: "知识管理工作流",
                description: "构建从阅读到知识管理的完整工作流。"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="group relative overflow-hidden border border-border/20 shadow hover:shadow-md transition-all duration-500 bg-gradient-to-br from-card to-card/95 animate-fadeIn"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4 space-y-3 relative">
                  <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform duration-500">
                    {feature.icon}
                  </div>
                  
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{feature.title}</h3>
                  
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
      <section className="relative py-20 lg:py-32 bg-background/95 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/2 blur-3xl opacity-70" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/2 blur-3xl opacity-70" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <TrendingUp className="w-4 h-4 mr-2" />
              产品演示
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl font-bold font-heading">
              看看它是如何<span className="text-primary">工作</span>的
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              一分钟了解微信读书工具箱的核心功能
            </p>
          </div>
          
          <div className="relative w-full max-w-6xl mx-auto rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 border border-border/30 rounded-3xl z-10 pointer-events-none" />
            
            <div className="aspect-video relative">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="/weread-toolbox-features.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="mt-8 text-center max-w-6xl mx-auto">
            <p className="text-lg text-muted-foreground italic">
              "微信读书工具箱让我的读书笔记整理效率提升了10倍，思维导图功能太赞了！"— 知识管理爱好者
            </p>
          </div>
        </div>
      </section>

      {/* 适用人群 (Who is this for?) */}
      <section className="relative py-20 lg:py-32 bg-background/95 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-[30%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/2 blur-3xl opacity-70" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-2" />
              适用人群
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl font-bold font-heading">
              这款产品<span className="text-primary">专为</span>以下人群设计
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              如果你符合以下任一特征，微信读书工具箱将成为你的得力助手
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {[
              "热爱阅读并经常做笔记的读书爱好者",
              "需要将读书笔记整合到知识管理系统的知识工作者",
              "使用 Notion、Obsidian 等工具进行个人知识管理的用户",
              "希望通过思维导图更好理解和记忆书籍内容的学习者",
              "对知识体系化、结构化有需求的专业人士",
              "希望提升阅读效率和体验的微信读书用户"
            ].map((audience, index) => (
              <div key={index} className="flex items-start gap-4 group p-4 rounded-lg hover:bg-accent/10 transition-colors animate-fadeIn" style={{ animationDelay: `${index * 150}ms` }}>
                <div className="mt-1.5 flex-shrink-0">
                  <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Check className="w-3 h-3 text-primary" />
                  </div>
                </div>
                <p className="text-base group-hover:translate-x-1 transition-transform">{audience}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 最终行动号召 (Final CTA) */}
      <section className="relative py-20 lg:py-32 bg-background/95 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[40%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/2 blur-3xl opacity-70" />
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/2 blur-3xl opacity-70" />
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <Badge variant="outline" className="px-4 py-2 text-sm bg-background/50 backdrop-blur-sm">
              立即行动
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading">
              准备好<span className="text-primary">提升</span>您的阅读体验了吗？
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground">
              立即下载，开始使用这款强大的工具，让您的阅读笔记真正成为知识资产
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link
                href="https://github.com/sancijun/weread-toolbox/releases"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                )}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
                <Download className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                立即下载
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link
                href="/docs/weread-toolbox"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-12 px-8 border-2 bg-background/50 backdrop-blur-sm hover:bg-accent/50 transition-all duration-300 group"
                )}
              >
                <FileText className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                查看文档
                <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="pt-8">
              <Progress value={85} className="h-2 w-64 mx-auto" />
              <p className="text-sm text-muted-foreground pt-2">
                已有 85% 的用户选择使用微信读书工具箱
              </p>
            </div>
            
            <p className="text-sm text-muted-foreground pt-6">
              由 <Link href="/about" className="text-primary hover:underline">三此君</Link> 精心打造 · 完全免费 · 开源项目
            </p>
          </div>
        </div>
      </section>
    </div>
  )
} 