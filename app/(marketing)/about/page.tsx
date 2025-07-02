import { siteConfig } from "@/config/site"
import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import {
  Twitter,
  Github,
  Mail,
  Linkedin,
  Cpu,
  MapPin,
  Bot,
  Anchor,
  Code,
  Globe,
  Star,
} from "lucide-react"

export const metadata: Metadata = {
  title: "关于 - " + siteConfig.name,
  description:
    "关于三此君以及这个网站的一切。AI、代码与山河：三此君的环国开发之旅。",
}

const socialLinks = [
  { name: "GitHub", icon: Github, url: siteConfig.links.github },
  { name: "Twitter", icon: Twitter, url: siteConfig.links.twitter },
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
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b py-24 sm:py-32 lg:py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-accent/5" />
        <div className="absolute inset-0 -z-10 opacity-10" style={{
            backgroundImage:
              "radial-gradient(circle, hsl(var(--primary) / 0.1) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative container max-w-5xl mx-auto px-4 text-center space-y-8 animate-fadeIn">
          <Image
            src="/images/avatar.jpg"
            alt="三此君头像"
            width={128}
            height={128}
            className="w-24 h-24 sm:w-32 sm:h-32 rounded-full mx-auto shadow-2xl border-4 border-background"
          />
          <div className="space-y-4">
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
              三此君
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              向着生活开一枪，我想做生命的勇士。
            </p>
          </div>
          <div className="flex justify-center flex-wrap gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                  "rounded-full"
                )}
              >
                <link.icon className="h-4 w-4 mr-2" />
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 sm:py-24">
        <div className="container max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl sm:text-4xl font-bold">
              我的哲学：三此主义
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              在不确定的世界里，寻找我的行动坐标。
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
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
              <div key={item.title} className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
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
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Code className="h-8 w-8 text-primary" />
                <h3 className="font-heading text-2xl font-semibold">技术世界的建造者</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  我是一名拥有超过6年经验的后端工程师，曾在OPPO和Shopee等一线大厂主导项目，从快应用后端到数字银行AI系统，我的职业生涯围绕着构建大规模、高可用的系统。
                </p>
                <p>
                  但工具的价值在于使用。我将大厂的经验内化，转身投入到更轻盈、更自由的独立开发中。我相信，好的产品是解决真实世界问题的优雅方案。
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold">我的作品集:</h4>
                <div className="grid gap-4">
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
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <Anchor className="h-8 w-8 text-primary" />
                <h3 className="font-heading text-2xl font-semibold">真实大地的探索者</h3>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  大厂之外，我选择成为一名数字游民，启动了我的环国自驾之旅。方向盘和键盘，是我探索世界的两个工具。
                </p>
                <p>
                  这场旅行不是逃避，而是主动的探索。我希望在行走中观察、思考，将不同地域的文化、风景和人情，融入我的思考和创作，让代码拥有更广阔的视野和更温暖的质感。
                </p>
              </div>
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/images/journey.jpg"
                  alt="在路上的风景"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-bold text-lg">下一站，山川湖海</p>
                  <p className="text-sm opacity-90">旅程正在进行中...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Focus */}
      <section className="py-20 sm:py-24">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <Bot className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-heading text-3xl sm:text-4xl font-bold">
              我当前的焦点
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              我正与伙伴们一起，将AI技术与硬件结合，打造一款面向3-8岁儿童的启蒙拍学机，鼓励孩子们在玩乐中探索和创造真实世界。
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              (AI + 智能硬件创业项目)
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-24 border-t bg-accent/20">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl font-bold">
            与我同行
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            我的旅程和创造之旅才刚刚开始。如果你对AI、独立开发、数字游民生活或我的创业项目感兴趣，欢迎通过以下方式关注我，让我们一起见证更多可能性。
          </p>
          <div className="mt-8 flex justify-center flex-wrap gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  buttonVariants({ variant: "default", size: "lg" }),
                  "rounded-full"
                )}
              >
                <link.icon className="h-5 w-5 mr-2" />
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 