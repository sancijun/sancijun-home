import React from "react"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Download, FileText, ExternalLink, Shuffle, Layers, Laptop, MousePointer2, BookOpen, Network, Check, ArrowRight, ChevronRight, Cpu, Zap, Target, TrendingUp, Users, Quote, Wand2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "飞书文档助手 - " + siteConfig.name,
  description: "支持批量导出飞书云文档，文档随机漫游等功能，让你的飞书数据真正可控。",
}

export default function FeishuDocHelperPage() {
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
                  <div className="w-14 h-14 relative animate-float flex items-center justify-center bg-primary/10 rounded-lg">
            <Image
              src="/images/product/feishu-doc-helper-logo.png"
              alt="飞书文档助手logo"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-heading">
                    飞书文档<span className="text-primary">助手</span>
                  </h1>
                </div>

                {/* 主标语和描述 */}
                <div className="space-y-6">
                  <p className="text-2xl sm:text-3xl text-foreground/90 font-medium leading-relaxed">
                    让你的飞书文档数据真正可控
                  </p>
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    支持批量导出飞书云文档为 Markdown，文档随机漫游，构建你自己的知识图谱。
                  </p>
                </div>
              </div>
              
              {/* CTA 按钮 */}
              <div className="flex flex-col sm:flex-row gap-4 pb-6">
                <Link
                  href="https://github.com/sancijun/feishu-doc-export/releases"
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
                  href="/docs/feishu-doc-helper"
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
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border border-border/50 shadow-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">轻松备份和管理您的飞书文档</span>
              </div>
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
                  <source src="/feishu-doc-helper-presentation.mp4" type="video/mp4" />
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
                  飞书虽好，但有烦恼
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
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">官方<strong className="text-foreground font-semibold">不支持批量导出</strong>，无法导出为通用的 Markdown 格式</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-muted-foreground text-sm">✕</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">文档<strong className="text-foreground font-semibold">数据被平台锁定</strong>，担心未来受限，缺乏安全感</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-muted-foreground text-sm">✕</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">网页版导出<strong className="text-foreground font-semibold">操作繁琐</strong>，效率低下，影响工作流</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-muted-foreground text-sm">✕</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">知识<strong className="text-foreground font-semibold">复习困难</strong>，文档散落各处，难以形成知识连接</p>
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
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base"><strong className="text-primary">一键批量导出</strong>，轻松将飞书文档转换为 Markdown</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base"><strong className="text-primary">数据完全可控</strong>，随时迁移，告别平台锁定焦虑</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base"><strong className="text-primary">便捷浏览器插件</strong>，无缝集成到您的飞书工作流</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base"><strong className="text-primary">文档随机漫游</strong>，在不经意间重温知识，激发新灵感</p>
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
              专为<span className="text-primary">飞书重度用户</span>和知识管理者设计
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              每一个功能都为解决您的痛点而生，让您的文档管理更高效
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Download className="w-5 h-5" />,
                title: "批量文档导出",
                description: "一键批量（全量）导出飞书云文档，支持个人和共享空间。"
              },
              {
                icon: <Shuffle className="w-5 h-5" />,
                title: "文档随机漫游",
                description: "随机打开一篇云文档，帮助您复习和巩固知识。"
              },
              {
                icon: <FileText className="w-5 h-5" />,
                title: "导出为 Markdown",
                description: "将文档导出为通用的 Markdown 格式，便于二次编辑和迁移。"
              },
              {
                icon: <Laptop className="w-5 h-5" />,
                title: "浏览器插件",
                description: "以浏览器插件形式提供，使用更方便，导出速度更快。"
              },
              {
                icon: <Network className="w-5 h-5" />,
                title: "数据归属权",
                description: "让您的数据真正属于您自己，随时可以带走。"
              },
              {
                icon: <Layers className="w-5 h-5" />,
                title: "构建知识图谱",
                description: "通过漫游和整理，更好地构建您的个人知识体系。"
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
              一分钟了解飞书文档助手的核心功能
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
                <source src="/feishu-doc-helper-features.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="mt-8 text-center max-w-6xl mx-auto">
            <p className="text-lg text-muted-foreground italic">
              "有了飞书文档助手插件，我飞书的数据终于受我控制了！再也不用担心被平台绑架了。" — 一位效率工具爱好者
            </p>
          </div>
        </div>
      </section>

      {/* 适用人群 (Who is this for?) */}
      <section className="relative py-20 lg:py-28 bg-background/95 backdrop-blur-sm">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Users className="w-4 h-4 mr-2" />
              适用人群
            </Badge>
            <h2 className="text-4xl sm:text-5xl font-bold font-heading">
              为<span className="text-primary">这些人</span>量身打造
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8 border rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">飞书重度用户</h3>
              <p className="text-muted-foreground">每日在飞书上记录大量笔记、文档，并希望数据能安全备份和自由流动的用户。</p>
            </div>
            <div className="text-center p-8 border rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">知识管理者</h3>
              <p className="text-muted-foreground">希望将飞书作为知识库的一部分，并与其他工具（如 Obsidian）联动，构建个人知识体系的探索者。</p>
            </div>
            <div className="text-center p-8 border rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold mb-4">数据安全关注者</h3>
              <p className="text-muted-foreground">对个人数据有强烈控制欲，不希望被任何平台锁定，追求数据自由和所有权的用户。</p>
            </div>
          </div>
        </div>
      </section>

      {/* FQA */}
      <section className="relative py-20 lg:py-28 bg-background/95 backdrop-blur-sm">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold font-heading">常见问题</h2>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">为什么导出选项看不到目录列表？</h3>
                <p className="text-muted-foreground mt-2">安装插件首次访问时，数据还在加载中，可以稍等片刻或刷新页面后再尝试导出。</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">为什么看不到最新的文档？</h3>
                <p className="text-muted-foreground mt-2">为了不影响飞书的正常使用性能，插件会定期（如每半小时）在后台同步一次全量文件列表，因此新文档可能稍有延迟。</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">可以导出共享给我的文档吗？</h3>
                <p className="text-muted-foreground mt-2">是的，v1.0.1 及以上版本可以导出您“我的空间”及“共享空间”中的文档，前提是您对这些文档拥有阅读和下载权限。</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 最终 CTA */}
      <section className="relative py-20 lg:py-32 bg-background/95 backdrop-blur-sm">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold font-heading">
            是时候掌控你的<span className="text-primary">飞书数据</span>了
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            立即下载飞书文档助手，体验前所未有的文档管理自由。这是飞书最强插件系列的开端，更多强大功能，敬请期待！
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="https://github.com/sancijun/feishu-doc-export/releases"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-14 px-10 text-lg bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
              )}
            >
              <Download className="w-6 h-6 mr-3 transition-transform group-hover:scale-110" />
              免费下载，立即开始
              <ExternalLink className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}