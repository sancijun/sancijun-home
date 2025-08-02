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
                  <div className="animate-float relative flex size-14 items-center justify-center rounded-lg bg-primary/10">
            <Image
              src="/images/product/feishu-doc-helper-logo.png"
              alt="飞书文档助手logo"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
                  <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    飞书文档<span className="text-primary">助手</span>
                  </h1>
                </div>

                {/* 主标语和描述 */}
                <div className="space-y-6">
                  <p className="text-2xl font-medium leading-relaxed text-foreground/90 sm:text-3xl">
                    让你的飞书文档数据真正可控
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                    支持批量导出飞书云文档为 Markdown，文档随机漫游，构建你自己的知识图谱。
                  </p>
                </div>
              </div>
              
              {/* CTA 按钮 */}
              <div className="flex flex-col gap-4 pb-6 sm:flex-row">
                <Link
                  href="https://github.com/sancijun/feishu-doc-export/releases"
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
                  href="/docs/feishu-doc-helper"
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
              
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
                <BookOpen className="size-4 text-primary" />
                <span className="text-sm font-medium">轻松备份和管理您的飞书文档</span>
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
                  <source src="/feishu-doc-helper-presentation.mp4" type="video/mp4" />
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
                  飞书虽好，但有烦恼
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
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">官方<strong className="font-semibold text-foreground">不支持批量导出</strong>，无法导出为通用的 Markdown 格式</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-muted-foreground">✕</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">文档<strong className="font-semibold text-foreground">数据被平台锁定</strong>，担心未来受限，缺乏安全感</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-muted-foreground">✕</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">网页版导出<strong className="font-semibold text-foreground">操作繁琐</strong>，效率低下，影响工作流</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-muted-foreground">✕</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">知识<strong className="font-semibold text-foreground">复习困难</strong>，文档散落各处，难以形成知识连接</p>
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
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1"><strong className="text-primary">一键批量导出</strong>，轻松将飞书文档转换为 Markdown</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-primary">✓</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1"><strong className="text-primary">数据完全可控</strong>，随时迁移，告别平台锁定焦虑</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-primary">✓</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1"><strong className="text-primary">便捷浏览器插件</strong>，无缝集成到您的飞书工作流</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-primary">✓</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1"><strong className="text-primary">文档随机漫游</strong>，在不经意间重温知识，激发新灵感</p>
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
              专为<span className="text-primary">飞书重度用户</span>和知识管理者设计
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              每一个功能都为解决您的痛点而生，让您的文档管理更高效
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Download className="size-5" />,
                title: "批量文档导出",
                description: "一键批量（全量）导出飞书云文档，支持个人和共享空间。"
              },
              {
                icon: <Shuffle className="size-5" />,
                title: "文档随机漫游",
                description: "随机打开一篇云文档，帮助您复习和巩固知识。"
              },
              {
                icon: <FileText className="size-5" />,
                title: "导出为 Markdown",
                description: "将文档导出为通用的 Markdown 格式，便于二次编辑和迁移。"
              },
              {
                icon: <Laptop className="size-5" />,
                title: "浏览器插件",
                description: "以浏览器插件形式提供，使用更方便，导出速度更快。"
              },
              {
                icon: <Network className="size-5" />,
                title: "数据归属权",
                description: "让您的数据真正属于您自己，随时可以带走。"
              },
              {
                icon: <Layers className="size-5" />,
                title: "构建知识图谱",
                description: "通过漫游和整理，更好地构建您的个人知识体系。"
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
              一分钟了解飞书文档助手的核心功能
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
                <source src="/feishu-doc-helper-features.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="mx-auto mt-8 max-w-6xl text-center">
            <p className="text-lg italic text-muted-foreground">
              "有了飞书文档助手插件，我飞书的数据终于受我控制了！再也不用担心被平台绑架了。" — 一位效率工具爱好者
            </p>
          </div>
        </div>
      </section>

      {/* 适用人群 (Who is this for?) */}
      <section className="relative bg-background/95 py-20 backdrop-blur-sm lg:py-28">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-6 text-center">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Users className="mr-2 size-4" />
              适用人群
            </Badge>
            <h2 className="font-heading text-4xl font-bold sm:text-5xl">
              为<span className="text-primary">这些人</span>量身打造
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg border p-8 text-center shadow-sm">
              <h3 className="mb-4 text-2xl font-bold">飞书重度用户</h3>
              <p className="text-muted-foreground">每日在飞书上记录大量笔记、文档，并希望数据能安全备份和自由流动的用户。</p>
            </div>
            <div className="rounded-lg border p-8 text-center shadow-sm">
              <h3 className="mb-4 text-2xl font-bold">知识管理者</h3>
              <p className="text-muted-foreground">希望将飞书作为知识库的一部分，并与其他工具（如 Obsidian）联动，构建个人知识体系的探索者。</p>
            </div>
            <div className="rounded-lg border p-8 text-center shadow-sm">
              <h3 className="mb-4 text-2xl font-bold">数据安全关注者</h3>
              <p className="text-muted-foreground">对个人数据有强烈控制欲，不希望被任何平台锁定，追求数据自由和所有权的用户。</p>
            </div>
          </div>
        </div>
      </section>

      {/* FQA */}
      <section className="relative bg-background/95 py-20 backdrop-blur-sm lg:py-28">
        <div className="container relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-6 text-center">
            <h2 className="font-heading text-4xl font-bold sm:text-5xl">常见问题</h2>
          </div>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">为什么导出选项看不到目录列表？</h3>
                <p className="mt-2 text-muted-foreground">安装插件首次访问时，数据还在加载中，可以稍等片刻或刷新页面后再尝试导出。</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">为什么看不到最新的文档？</h3>
                <p className="mt-2 text-muted-foreground">为了不影响飞书的正常使用性能，插件会定期（如每半小时）在后台同步一次全量文件列表，因此新文档可能稍有延迟。</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold">可以导出共享给我的文档吗？</h3>
                <p className="mt-2 text-muted-foreground">是的，v1.0.1 及以上版本可以导出您“我的空间”及“共享空间”中的文档，前提是您对这些文档拥有阅读和下载权限。</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 最终 CTA */}
      <section className="relative bg-background/95 py-20 backdrop-blur-sm lg:py-32">
        <div className="container relative mx-auto px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-heading text-4xl font-bold sm:text-5xl">
            是时候掌控你的<span className="text-primary">飞书数据</span>了
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            立即下载飞书文档助手，体验前所未有的文档管理自由。这是飞书最强插件系列的开端，更多强大功能，敬请期待！
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="https://github.com/sancijun/feishu-doc-export/releases"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ size: "lg" }),
                "group relative h-14 overflow-hidden bg-gradient-to-r from-primary to-primary/80 px-10 text-lg shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-primary/70 hover:shadow-xl"
              )}
            >
              <Download className="mr-3 size-6 transition-transform group-hover:scale-110" />
              免费下载，立即开始
              <ExternalLink className="ml-3 size-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}