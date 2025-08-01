import * as React from "react"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
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

  return (
    <footer className={cn(className)}>
      <div className="container flex flex-col items-center justify-between gap-6 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-6 md:px-0">
          <Icons.logo />
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6 md:items-center">
            <p className="text-center text-sm leading-loose md:text-left">
              由{" "}
              <span className="font-medium">三此君</span>
              {" "}创作
            </p>
            <TooltipProvider>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <div key={social.name}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-muted-foreground hover:text-foreground transition-colors p-1">
                          <social.icon className="h-4 w-4" />
                          <span className="sr-only">{social.name}</span>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="p-0 border-0 bg-transparent shadow-lg">
                        <div className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg border">
                          <img 
                            src={social.qrCode} 
                            alt={`${social.name}二维码`}
                            className="w-32 h-32 object-cover rounded"
                          />
                          <p className="text-center text-xs mt-2 text-gray-600 dark:text-gray-300">{social.name}</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}
              </div>
            </TooltipProvider>
          </div>
        </div>
        <ModeToggle />
      </div>
    </footer>
  )
}
