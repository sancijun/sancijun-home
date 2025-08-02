import React from "react"
import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Download, FileText, ExternalLink, Search, Edit3, Zap, Target, TrendingUp, Users, Smile, Copy, Keyboard, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "EmojiFusion - " + siteConfig.name,
  description: "三秒生成表情包，情绪价值拉满，任何你想要表达的内容都可以立即转换成表情包。",
}

export default function EmojiFusionPage() {
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
                      src="/images/product/emoji-fusion-logo.png"
                      alt="EmojiFusion logo"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                    Emoji<span className="text-primary">Fusion</span>
                  </h1>
                </div>

                {/* 主标语和描述 */}
                <div className="space-y-6">
                  <p className="text-2xl font-medium leading-relaxed text-foreground/90 sm:text-3xl">
                    三秒生成表情包，情绪价值拉满
                  </p>
                  <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
                    情绪价值就是要快准狠。任何你想要表达的内容都可以立即转换成表情包。
                  </p>
                </div>
              </div>
              
              {/* CTA 按钮 */}
              <div className="flex flex-col gap-4 pb-6 sm:flex-row">
                <Link
                  href="https://u.tools/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "group relative h-12 overflow-hidden bg-gradient-to-r from-primary to-primary/80 px-8 shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-primary/70 hover:shadow-xl"
                  )}
                >
                  <span className="group-hover:animate-shimmer absolute inset-0 size-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100"></span>
                  <Download className="mr-2 size-5 transition-transform group-hover:scale-110" />
                  下载 uTools
                  <ExternalLink className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  href="https://www.u-tools.cn/plugins/detail/EmojiFusion/index.html?c=2259abd7f6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "group h-12 border-2 px-8 transition-all duration-300 hover:bg-accent/50"
                  )}
                >
                  <FileText className="mr-2 size-5 transition-transform group-hover:scale-110" />
                  获取插件
                  <ChevronRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/80 px-4 py-2 shadow-sm backdrop-blur">
                <Smile className="size-4 text-primary" />
                <span className="text-sm font-medium">三此君最新力作，让表达更有趣</span>
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
                  <source src="/emoji-fusion-presentation.mp4" type="video/mp4" />
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
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">想表达情绪时找不到合适的<strong className="font-semibold text-foreground">表情包</strong></p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-muted-foreground">✕</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">制作表情包需要专业软件，<strong className="font-semibold text-foreground">操作复杂</strong></p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-muted-foreground">✕</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">现有表情包<strong className="font-semibold text-foreground">无法编辑</strong>，不能表达特定含义</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-muted-foreground/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-muted-foreground">✕</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1">聊天时需要表情包却要<strong className="font-semibold text-foreground">切换多个应用</strong>查找</p>
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
                  EmojiFusion 解决方案
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
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1"><strong className="text-primary">三秒生成表情包</strong>，情绪价值拉满，快准狠</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-primary">✓</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1"><strong className="text-primary">文本转表情包</strong>，输入文字即可生成对应表情包</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-primary">✓</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1"><strong className="text-primary">表情包搜索</strong>，快速找到符合当下心情的表情包</p>
                  </li>
                  <li className="group flex items-start gap-4">
                    <div className="mt-[0.3em] shrink-0">
                      <div className="flex size-5 items-center justify-center rounded-full bg-primary/20 transition-transform group-hover:scale-110">
                        <span className="text-sm text-primary">✓</span>
                      </div>
                    </div>
                    <p className="m-0 text-base transition-transform group-hover:translate-x-1"><strong className="text-primary">便捷编辑功能</strong>，轻松修改文字、颜色和位置</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 安装步骤 (Installation Steps) */}
      <section className="relative bg-background/95 py-20 backdrop-blur-sm lg:py-32">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="bg-primary/2 absolute -bottom-[30%] -left-[10%] size-3/5 rounded-full opacity-70 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 space-y-6 text-center">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Download className="mr-2 size-4" />
              安装指南
            </Badge>
            
            <h2 className="font-heading text-4xl font-bold sm:text-5xl">
              三步安装，<span className="text-primary">即刻使用</span>
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              简单几步，开启你的表情包创作之旅
            </p>
          </div>
          
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "下载 uTools",
                description: "如果你还没有用过 uTools，建议你安装试用。三此君混迹互联网多年，这款工具强烈推荐给大家（真诚推荐）。"
              },
              {
                step: "2",
                title: "安装插件",
                description: "如果你已经安装了 uTools，点击链接 -> 启动 -> 获取，或者在 uTools 插件搜索 EmojiFusion 并安装。"
              },
              {
                step: "3",
                title: "设置快捷键",
                description: "你可以设置快捷键快速呼出 uTools，用起来更加丝滑！"
              }
            ].map((step, index) => (
              <div key={index} className="group relative">
                <div className="absolute -left-4 top-0 h-full w-0.5 bg-border transition-colors duration-300 group-hover:bg-primary" />
                <div className="relative z-10 mb-4 flex size-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground transition-transform group-hover:scale-110">
                  {step.step}
                </div>
                <h3 className="mb-2 text-xl font-semibold transition-colors group-hover:text-primary">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
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
              <Zap className="mr-2 size-4" />
              核心功能
            </Badge>
            
            <h2 className="font-heading text-4xl font-bold sm:text-5xl">
              专为提升您的<span className="text-primary">表达效率</span>而设计
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              每一个功能都经过精心打磨，让您的表情包创作更轻松
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: <Smile className="size-5" />,
                title: "文本生成表情包",
                description: "情绪价值，关键是要快准狠！支持将文本转成表情包，主打快速高效！"
              },
              {
                icon: <Search className="size-5" />,
                title: "表情包搜索",
                description: "再多的表情包也可能不满足你此时此刻的心情，提供精准表情包搜索功能！"
              },
              {
                icon: <Edit3 className="size-5" />,
                title: "表情包编辑",
                description: "为表情包编辑量身定制，可修改文字的大小、颜色、位置等。"
              },
              {
                icon: <Copy className="size-5" />,
                title: "一键复制",
                description: "生成或编辑完成的表情包，一键复制即可使用，高效便捷。"
              },
              {
                icon: <Keyboard className="size-5" />,
                title: "快捷键支持",
                description: "丰富的快捷键支持，让操作更加高效，提升创作体验。"
              },
              {
                icon: <Zap className="size-5" />,
                title: "快速唤醒",
                description: "通过 uTools 快速唤醒，随时随地创作表情包，不打断工作流。"
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
              功能演示
            </Badge>
            
            <h2 className="font-heading text-4xl font-bold sm:text-5xl">
              看看它是如何<span className="text-primary">工作</span>的
            </h2>
            
            <p className="mx-auto max-w-3xl text-lg text-muted-foreground sm:text-xl">
              一分钟了解 EmojiFusion 的核心功能
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
                <source src="/emoji-fusion-feature.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="mx-auto mt-8 max-w-6xl text-center">
            <p className="text-lg italic text-muted-foreground">
              "EmojiFusion 让我的表情包创作效率提升了10倍，三秒生成，情绪表达快准狠！"— 职场沟通达人
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
            <div className="rounded-lg border p-8 text-center shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-4 text-2xl font-bold">职场人士</h3>
              <p className="text-muted-foreground">需要在工作沟通中快速表达情绪和观点，提升沟通效率的职场人士。</p>
            </div>
            <div className="rounded-lg border p-8 text-center shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-4 text-2xl font-bold">社交媒体爱好者</h3>
              <p className="text-muted-foreground">喜欢在社交媒体上分享生活，需要大量表情包来丰富表达的用户。</p>
            </div>
            <div className="rounded-lg border p-8 text-center shadow-sm transition-shadow hover:shadow-md">
              <h3 className="mb-4 text-2xl font-bold">内容创作者</h3>
              <p className="text-muted-foreground">需要快速制作表情包素材的内容创作者，提升创作效率。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="relative border-t bg-background/95 py-20 backdrop-blur-sm lg:py-32">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-8 text-center">
            <h2 className="font-heading text-4xl font-bold sm:text-5xl">
              三此君最新力作，<span className="text-primary">情绪价值拉满</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              三秒生成表情包，情绪价值就是要快准狠。任何你想要表达的内容都可以立即转换成表情包。
            </p>
            <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
              <Link
                href="https://u.tools/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "group relative h-12 overflow-hidden bg-gradient-to-r from-primary to-primary/80 px-8 shadow-lg transition-all duration-300 hover:from-primary/90 hover:to-primary/70 hover:shadow-xl"
                )}
              >
                <span className="group-hover:animate-shimmer absolute inset-0 size-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100"></span>
                <Download className="mr-2 size-5 transition-transform group-hover:scale-110" />
                立即下载使用
                <ExternalLink className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}