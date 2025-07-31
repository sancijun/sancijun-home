"use client"

import type { Post } from "contentlayer/generated"
import Image from "next/image"
import { useEffect, useState } from "react"
import type { CarouselApi } from "@/components/ui/carousel"

import { Mdx } from "@/components/mdx-components"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { formatDate } from "@/lib/utils"

interface SlidesPostPageProps {
  post: Post
}

export function SlidesPostPage({ post }: SlidesPostPageProps) {
  const [api, setApi] = useState<CarouselApi>()
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (!api) {
      return
    }
 
    const onSelect = () => {
      setCurrentIndex(api.selectedScrollSnap())
    }
    
    api.on("select", onSelect)
    api.on("reInit", onSelect)
    
    // Call once to set initial index
    onSelect()
 
    return () => {
      api.off("select", onSelect)
    }
  }, [api])
  
  return (
    <div className="container max-w-5xl py-6 lg:py-10">
      <Card className="overflow-hidden border rounded-xl shadow-sm">
        <div className="flex flex-col lg:flex-row">
          {/* 左侧图片区域 - 自适应图片比例 */}
          <div className="lg:w-1/2 bg-blue-100/10 flex items-center justify-center p-4 lg:p-8">
            <Carousel 
              className="w-full" 
              setApi={setApi}
            >
              <CarouselContent>
                {post.images?.map((imageUrl, index) => (
                  <CarouselItem key={index} className="flex items-center justify-center">
                    <div className="relative w-full max-w-[400px] mx-auto">
                      <Image
                        src={imageUrl}
                        alt={`${post.title} - Slide ${index + 1}`}
                        width={400}
                        height={600}
                        className="object-contain max-h-[70vh] w-auto h-auto mx-auto"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 h-8 w-8 opacity-70 hover:opacity-100 transition-opacity" />
              <CarouselNext className="right-2 h-8 w-8 opacity-70 hover:opacity-100 transition-opacity" />
              
              {/* 图片计数指示器 */}
              {post.images && post.images.length > 1 && (
                <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {currentIndex + 1}/{post.images.length}
                </div>
              )}
            </Carousel>
          </div>
          
          {/* 右侧内容区域 - 可滚动 */}
          <div className="lg:w-1/2 p-6 lg:p-8 max-h-[800px] overflow-y-auto">
            {/* 标题和日期 */}
            <div className="space-y-3 mb-4">
              <h1 className="font-heading text-2xl font-bold leading-tight lg:text-3xl">
                {post.title}
              </h1>
              {post.date && (
                <time
                  dateTime={post.date}
                  className="block text-sm text-muted-foreground"
                >
                  发布于 {formatDate(post.date)}
                </time>
              )}
            </div>
            
            {/* 分类标签 */}
            {post.category && (
              <div className="mb-4">
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  {post.category}
                </Badge>
              </div>
            )}
            
            {/* 正文内容 */}
            <div className="prose prose-sm prose-stone dark:prose-invert max-w-none">
              <Mdx code={post.body.code} />
            </div>
            
            {/* 标签 */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="cursor-pointer rounded-full px-3 py-1 text-xs font-medium bg-muted/80"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
} 