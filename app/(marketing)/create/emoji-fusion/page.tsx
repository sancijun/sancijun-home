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
                      src="/images/product/emoji-fusion-logo.png"
                      alt="EmojiFusion logo"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight font-heading">
                    Emoji<span className="text-primary">Fusion</span>
                  </h1>
                </div>

                {/* 主标语和描述 */}
                <div className="space-y-6">
                  <p className="text-2xl sm:text-3xl text-foreground/90 font-medium leading-relaxed">
                    三秒生成表情包，情绪价值拉满
                  </p>
                  <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                    情绪价值就是要快准狠。任何你想要表达的内容都可以立即转换成表情包。
                  </p>
                </div>
              </div>
              
              {/* CTA 按钮 */}
              <div className="flex flex-col sm:flex-row gap-4 pb-6">
                <Link
                  href="https://u.tools/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ size: "lg" }),
                    "h-12 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  )}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
                  <Download className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  下载 uTools
                  <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Link
                  href="https://www.u-tools.cn/plugins/detail/EmojiFusion/index.html?c=2259abd7f6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    buttonVariants({ variant: "outline", size: "lg" }),
                    "h-12 px-8 border-2 hover:bg-accent/50 transition-all duration-300 group"
                  )}
                >
                  <FileText className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                  获取插件
                  <ChevronRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
              
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/80 backdrop-blur border border-border/50 shadow-sm">
                <Smile className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">三此君最新力作，让表达更有趣</span>
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
                  <source src="/emoji-fusion-presentation.mp4" type="video/mp4" />
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
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">想表达情绪时找不到合适的<strong className="text-foreground font-semibold">表情包</strong></p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-muted-foreground text-sm">✕</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">制作表情包需要专业软件，<strong className="text-foreground font-semibold">操作复杂</strong></p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-muted-foreground text-sm">✕</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">现有表情包<strong className="text-foreground font-semibold">无法编辑</strong>，不能表达特定含义</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-muted-foreground/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-muted-foreground text-sm">✕</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base">聊天时需要表情包却要<strong className="text-foreground font-semibold">切换多个应用</strong>查找</p>
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
                  EmojiFusion 解决方案
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
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base"><strong className="text-primary">三秒生成表情包</strong>，情绪价值拉满，快准狠</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base"><strong className="text-primary">文本转表情包</strong>，输入文字即可生成对应表情包</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base"><strong className="text-primary">表情包搜索</strong>，快速找到符合当下心情的表情包</p>
                  </li>
                  <li className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 mt-[0.3em]">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <span className="text-primary text-sm">✓</span>
                      </div>
                    </div>
                    <p className="group-hover:translate-x-1 transition-transform m-0 text-base"><strong className="text-primary">便捷编辑功能</strong>，轻松修改文字、颜色和位置</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 安装步骤 (Installation Steps) */}
      <section className="relative py-20 lg:py-32 bg-background/95 backdrop-blur-sm">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-primary/2 blur-3xl opacity-70" />
        </div>
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              <Download className="w-4 h-4 mr-2" />
              安装指南
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl font-bold font-heading">
              三步安装，<span className="text-primary">即刻使用</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              简单几步，开启你的表情包创作之旅
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
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
              <div key={index} className="relative group">
                <div className="absolute -left-4 top-0 h-full w-0.5 bg-border group-hover:bg-primary transition-colors duration-300" />
                <div className="relative z-10 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold mb-4 group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
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
              <Zap className="w-4 h-4 mr-2" />
              核心功能
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl font-bold font-heading">
              专为提升您的<span className="text-primary">表达效率</span>而设计
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              每一个功能都经过精心打磨，让您的表情包创作更轻松
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: <Smile className="w-5 h-5" />,
                title: "文本生成表情包",
                description: "情绪价值，关键是要快准狠！支持将文本转成表情包，主打快速高效！"
              },
              {
                icon: <Search className="w-5 h-5" />,
                title: "表情包搜索",
                description: "再多的表情包也可能不满足你此时此刻的心情，提供精准表情包搜索功能！"
              },
              {
                icon: <Edit3 className="w-5 h-5" />,
                title: "表情包编辑",
                description: "为表情包编辑量身定制，可修改文字的大小、颜色、位置等。"
              },
              {
                icon: <Copy className="w-5 h-5" />,
                title: "一键复制",
                description: "生成或编辑完成的表情包，一键复制即可使用，高效便捷。"
              },
              {
                icon: <Keyboard className="w-5 h-5" />,
                title: "快捷键支持",
                description: "丰富的快捷键支持，让操作更加高效，提升创作体验。"
              },
              {
                icon: <Zap className="w-5 h-5" />,
                title: "快速唤醒",
                description: "通过 uTools 快速唤醒，随时随地创作表情包，不打断工作流。"
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
              功能演示
            </Badge>
            
            <h2 className="text-4xl sm:text-5xl font-bold font-heading">
              看看它是如何<span className="text-primary">工作</span>的
            </h2>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
              一分钟了解 EmojiFusion 的核心功能
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
                <source src="/emoji-fusion-feature.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
          
          <div className="mt-8 text-center max-w-6xl mx-auto">
            <p className="text-lg text-muted-foreground italic">
              "EmojiFusion 让我的表情包创作效率提升了10倍，三秒生成，情绪表达快准狠！"— 职场沟通达人
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
            <div className="text-center p-8 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold mb-4">职场人士</h3>
              <p className="text-muted-foreground">需要在工作沟通中快速表达情绪和观点，提升沟通效率的职场人士。</p>
            </div>
            <div className="text-center p-8 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold mb-4">社交媒体爱好者</h3>
              <p className="text-muted-foreground">喜欢在社交媒体上分享生活，需要大量表情包来丰富表达的用户。</p>
            </div>
            <div className="text-center p-8 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold mb-4">内容创作者</h3>
              <p className="text-muted-foreground">需要快速制作表情包素材的内容创作者，提升创作效率。</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 区域 */}
      <section className="relative py-20 lg:py-32 bg-background/95 backdrop-blur-sm border-t">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-4xl sm:text-5xl font-bold font-heading">
              三此君最新力作，<span className="text-primary">情绪价值拉满</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              三秒生成表情包，情绪价值就是要快准狠。任何你想要表达的内容都可以立即转换成表情包。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Link
                href="https://u.tools/"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "h-12 px-8 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                )}
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></span>
                <Download className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
                立即下载使用
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}