"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { env } from "@/env.mjs"

export function BaiduAnalytics() {
  const baiduId = env.NEXT_PUBLIC_BAIDU_ANALYTICS_ID
  const pathname = usePathname()

  // 初始化百度统计
  useEffect(() => {
    if (!baiduId) return

    // 检查是否已经加载过百度统计
    if (window._hmt) return

    // 完全按照百度官方代码格式初始化
    window._hmt = window._hmt || []
    
    // 使用立即执行函数（IIFE），完全匹配百度官方代码
    ;(function() {
      const hm = document.createElement("script")
      hm.src = `https://hm.baidu.com/hm.js?${baiduId}`
      const s = document.getElementsByTagName("script")[0]
      s?.parentNode?.insertBefore(hm, s)
    })()
  }, [baiduId])

  // 追踪路由变化
  useEffect(() => {
    if (!baiduId || !window._hmt) return

    // 发送页面访问统计
    window._hmt.push(["_trackPageview", pathname])
  }, [baiduId, pathname])

  // 如果没有 ID，则不渲染任何内容
  if (!baiduId) {
    return null
  }

  return null
}

// 扩展 Window 接口以包含百度统计
declare global {
  interface Window {
    _hmt: any[]
  }
}