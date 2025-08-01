import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  Cpu,
  MapPin,
  Bot,
  Anchor,
  Code,
  Globe,
  Star,
} from "lucide-react"
import { allPosts } from "contentlayer/generated"
import { JourneyMapSection } from "./journey-map-section"

export const metadata: Metadata = {
  title: "关于 - " + siteConfig.name,
  description:
    "关于三此君以及这个网站的一切。AI、代码与山河：三此君的环国开发之旅。",
}

const socialLinks = [
  {
    name: "微信",
    icon: Icons.weixin,
    qrCode: "/images/qrcode/qrcode_weixin.jpg",
  },
  {
    name: "小红书",
    icon: Icons.xiaohongshu,
    qrCode: "/images/qrcode/grcode_xiaohongshu.png",
  },
  {
    name: "B站",
    icon: Icons.bilibili,
    qrCode: "/images/qrcode/qrcode_bilibili.png",
  },
  {
    name: "抖音",
    icon: Icons.douyin,
    qrCode: "/images/qrcode/qrcode_douyin.png",
  },
  {
    name: "公众号",
    icon: Icons.wechatMp,
    qrCode: "/images/qrcode/qrcode_gzh.jpg",
  },
  {
    name: "GitHub",
    icon: Icons.gitHub,
    qrCode: "/images/qrcode/qrcode_github.png",
  },
]

const projects = [
  {
    name: "微信读书工具箱",
    description: "让你的微信读书体验更上一层楼。",
    type: "浏览器插件",
  },
  {
    name: "飞书导出助手",
    description: "轻松备份和导出飞书文档。",
    type: "浏览器插件",
  },
  {
    name: "表情包助手",
    description: "海量表情包，一键搜索使用。",
    type: "uTools插件",
  },
  {
    name: "Easy Image Uploader",
    description: "Obsidian图床工具，简化图片上传流程。",
    type: "Obsidian插件",
  },
  {
    name: "书见·AI创作工具",
    description: "AI驱动的智能创作与阅读工具。",
    type: "Web应用",
  },
]

export default async function AboutPage() {
  // 获取环国自驾相关的文章数据，用于地图显示
  const postsWithLocation = allPosts
    .filter((post) => post.published && post.category === "环国自驾" && post.location && post.location.length === 2)
    .slice(0, 20) // 限制显示数量以优化性能
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative py-20 sm:py-24 lg:py-32">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center space-y-8">
            {/* 头像和基本信息 */}
            <div className="space-y-6">
          <Image
            src="/android-chrome-512x512.png"
            alt="三此君头像"
                width={96}
                height={96}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full mx-auto ring-4 ring-background shadow-lg"
          />
          <div className="space-y-4">
                <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              三此君
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  在不确定的世界里，寻找我的行动坐标
                </p>
              </div>
            </div>

            {/* 身份标签 */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {[
                { icon: Code, text: "独立开发者" },
                { icon: Bot, text: "AI创业者" },
                { icon: Globe, text: "数字游民" },
                { icon: MapPin, text: "环国旅行中" }
              ].map((tag) => (
                <div
                  key={tag.text}
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted/50 text-sm text-muted-foreground"
                >
                  <tag.icon className="h-3.5 w-3.5" />
                  <span>{tag.text}</span>
                </div>
              ))}
            </div>

            {/* 社交联系 */}
            <div className="pt-4">
              <TooltipProvider>
                <div className="flex justify-center flex-wrap gap-2">
                  {socialLinks.map((social) => (
                    <div key={social.name}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="p-3 rounded-full bg-muted/30 hover:bg-muted/60 transition-colors group">
                            <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                            <span className="sr-only">{social.name}</span>
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 border-0 bg-transparent shadow-lg">
                          <div className="bg-background p-3 rounded-lg shadow-lg border">
                            <img 
                              src={social.qrCode}
                              alt={`${social.name}二维码`}
                              className="w-32 h-32 object-cover rounded"
                            />
                            <p className="text-center text-xs mt-2 text-muted-foreground">扫码关注 {social.name}</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ))}
                </div>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </section>

      {/* 三此主义 - 独立区块 */}
      <section className="py-16 sm:py-20 border-y bg-muted/20">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold mb-4">
              三此主义
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              我的行动哲学：此时、此地、此身
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Cpu,
                title: "此时",
                description: "跃入AI浪潮，在每个当下全然投入，用实践探索时代。",
              },
              {
                icon: Globe,
                title: "此地",
                description: "扎根真实大地，让环国之旅成为灵感源泉和移动实验室。",
              },
              {
                icon: Star,
                title: "此身",
                description: "从大厂螺丝钉到完整创造者，以我之身，负全部之责。",
              },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 rounded-lg bg-background/50">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Life Section */}
      <section className="py-20 sm:py-24 bg-accent/20 border-y">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold">
              双重人生
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              技术世界的建造者 vs 真实大地的探索者
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Technologist */}
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <Code className="h-8 w-8 text-primary" />
                <h3 className="font-heading text-2xl font-semibold">技术世界的建造者</h3>
              </div>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  我是一名拥有超过6年经验的后端工程师，曾在OPPO和Shopee等一线大厂主导项目，从快应用后端到数字银行AI系统，我的职业生涯围绕着构建大规模、高可用的系统。
                </p>
                <p>
                  但工具的价值在于使用。我将大厂的经验内化，转身投入到更轻盈、更自由的独立开发中。我相信，好的产品是解决真实世界问题的优雅方案。
                </p>
              </div>
              <div className="flex-1 flex flex-col">
                <h4 className="font-semibold mb-4">我的作品集:</h4>
                <div className="flex-1 grid gap-4 content-start">
                  {projects.map((p) => (
                    <div
                      key={p.name}
                      className="p-4 bg-background border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {p.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Explorer */}
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <Anchor className="h-8 w-8 text-primary" />
                <h3 className="font-heading text-2xl font-semibold">真实大地的探索者</h3>
              </div>
              <div className="space-y-4 text-muted-foreground mb-8">
                <p>
                  大厂之外，我选择成为一名数字游民，启动了我的环国自驾之旅。方向盘和键盘，是我探索世界的两个工具。
                </p>
                <p>
                  这场旅行不是逃避，而是主动的探索。我希望在行走中观察、思考，将不同地域的文化、风景和人情，融入我的思考和创作，让代码拥有更广阔的视野和更温暖的质感。
                </p>
              </div>
              <div className="flex-1 flex flex-col">
                <h4 className="font-semibold mb-4">环国自驾路线:</h4>
                <div className="flex-1">
                  <JourneyMapSection posts={postsWithLocation} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="py-20 sm:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center space-y-8">
            <div>
            <Bot className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-3xl sm:text-4xl font-bold">
                AI 创业进行时
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              AI创业项目：我正与伙伴们一起打造 Superkid，让每一个小孩都能长成超能宝贝！
            </p>
          </div>
            
            <div className="bg-muted/30 rounded-xl p-8 max-w-3xl mx-auto">
              <div className="space-y-4">
                <h3 className="font-heading text-2xl font-bold text-primary">
                  Superkid
                </h3>
                <p className="text-lg font-medium">
                  有了Superkid，每一个小孩都能长成一个超能宝贝！
                </p>
                <p className="text-muted-foreground">
                  Superkid全力为小朋友打造AI+硬件产品，致力于3-8岁儿童的智能启蒙教育。
                </p>
                <div className="pt-4">
                  <Link
                    href="https://www.xiaohongshu.com/user/profile/678626dd000000000801b2cf"
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "rounded-full"
                )}
              >
                    <Icons.xiaohongshu className="h-5 w-5 mr-2" />
                    访问 Superkid 小红书
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
} 