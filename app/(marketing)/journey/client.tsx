"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Post, allPosts } from "contentlayer/generated"
import { formatDate } from "@/lib/utils"
import { compareDesc } from "date-fns"
import dynamic from "next/dynamic"
import {
  MapPin,
  Calendar,
  Compass,
  ArrowRight,
  Clock,
  Star,
  Archive,
  Image as ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { journeyConfig } from "@/config/journey"
import { JourneyPhotoGallery, JourneyPhoto } from "@/components/journey-photo-gallery"

// 确保地图组件只在客户端渲染
const JourneyMap = dynamic(() => import("@/components/journey-map"), {
  loading: () => (
    <div className="flex size-full items-center justify-center bg-muted/50">
      <div className="space-y-4 text-center">
        <div className="animate-spin">
          <Compass className="mx-auto size-8 text-primary" />
        </div>
        <p className="text-muted-foreground">探索地图加载中...</p>
      </div>
    </div>
  ),
  ssr: false,
})

export default function JourneyClientPage() {
  // 获取并处理文章数据
  const posts = allPosts
    .filter((post) => post.published && post.category === "环国自驾")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  // 从文章中提取照片数据
  const journeyPhotos: JourneyPhoto[] = posts
    .filter(post => post.image)
    .map((post, index) => {
      // 假设所有图片都是竖版图片
      // 使用文章ID作为随机种子，确保相同文章每次渲染比例一致
      const seed = post._id.charCodeAt(0) + post._id.charCodeAt(1) || 0;
      const isNineToSixteen = seed % 3 === 0; // 约1/3的图片是9:16比例
      
      // 设置竖版图片的宽高比：4:3或9:16
      let width = 3;
      let height = 4;
      
      if (isNineToSixteen) {
        width = 9;
        height = 16;
      }
      
      return {
        id: `photo-${post._id}`,
        src: post.image,
        alt: post.title,
        location: post.location ? `${post.location[0].toFixed(2)}, ${post.location[1].toFixed(2)}` : undefined,
        date: formatDate(post.date),
        width,
        height,
      };
    });

  // 如果文章中有多张图片，也添加到照片墙中
  const additionalPhotos: JourneyPhoto[] = [];
  posts.forEach(post => {
    if (post.images && post.images.length > 0) {
      post.images.forEach((img, imgIndex) => {
        if (img !== post.image) { // 避免重复添加主图
          // 同样假设所有图片都是竖版图片
          // 使用文章ID和图片索引作为随机种子
          const seed = (post._id.charCodeAt(0) + imgIndex) || 0;
          const isNineToSixteen = seed % 3 === 0; // 约1/3的图片是9:16比例
          
          let width = 3;
          let height = 4;
          
          if (isNineToSixteen) {
            width = 9;
            height = 16;
          }
          
          additionalPhotos.push({
            id: `photo-${post._id}-${imgIndex}`,
            src: img,
            alt: `${post.title} - 图${imgIndex + 1}`,
            location: post.location ? `${post.location[0].toFixed(2)}, ${post.location[1].toFixed(2)}` : undefined,
            date: formatDate(post.date),
            width,
            height,
          });
        }
      });
    }
  });
  
  // 合并主图和额外图片
  const allJourneyPhotos = [...journeyPhotos, ...additionalPhotos];

  // 获取最新的三篇文章
  const latestPosts = posts.slice(0, 3)

  // 获取精选故事（置顶的或者有特定标签的文章）
  const featuredPosts = posts
    .filter((post) => post.pinned || post.tags?.includes("精选"))
    .slice(0, 6) // 最多显示6篇
  const postsWithLocation = posts.filter(
    (post) => post.location && post.location.length === 2
  )

  const [hoveredPostId, setHoveredPostId] = React.useState<string | null>(null)
  const [activePostId, setActivePostId] = React.useState<string | null>(null)

  // 确保地图组件只在客户端渲染
  const JourneyMap = dynamic(() => import("@/components/journey-map"), {
    loading: () => (
      <div className="flex size-full items-center justify-center bg-muted/50">
        <div className="space-y-4 text-center">
          <div className="animate-spin">
            <Compass className="mx-auto size-8 text-primary" />
          </div>
          <p className="text-muted-foreground">探索地图加载中...</p>
        </div>
      </div>
    ),
    ssr: false,
  })
  
  // 滚动到指定模块
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section - 地图背景 + 悬浮内容 */}
      <section className="relative h-screen w-full overflow-hidden">
         {/* 地图背景容器 - 90% 宽高靠近顶部 */}
         <div className="absolute inset-0 flex items-start justify-center pt-16">
           <div className="relative h-[85%] w-[75%]">
             <JourneyMap
               posts={postsWithLocation}
               activePostId={activePostId}
               onPostHover={setHoveredPostId}
             />
             
             {/* 标题和描述悬浮层 - 左上角 */}
             <div className="pointer-events-none absolute left-6 top-6 z-[1100]">
               <div className="pointer-events-auto max-w-md space-y-4">
                 <h1 className="font-heading text-4xl font-bold tracking-tight text-black drop-shadow-lg md:text-5xl">
                   在路上
                 </h1>
                 <p className="text-lg leading-relaxed text-black/80 drop-shadow-lg md:text-xl">
                   记录我的环国自驾旅行、数字游民生活，以及对世界的观察
                 </p>
               </div>
             </div>

             {/* 导航按钮悬浮层 - 右下角 */}
             <div className="absolute bottom-6 right-6 z-[1100]">
               <div className="flex flex-col gap-3">
                 <Button
                   variant="secondary"
                   size="sm"
                   onClick={() => scrollToSection('latest-update')}
                   className="justify-start border-gray-300 bg-white/10 text-black backdrop-blur-sm hover:bg-gray-100"
                 >
                   <Clock className="mr-2 size-4" />
                   最新动态
                 </Button>
                 <Button
                   variant="secondary"
                   size="sm"
                   onClick={() => scrollToSection('photo-gallery')}
                   className="justify-start border-gray-300 bg-white/10 text-black backdrop-blur-sm hover:bg-gray-100"
                 >
                   <ImageIcon className="mr-2 size-4" />
                   旅行相册
                 </Button>
                 <Button
                   variant="secondary"
                   size="sm"
                   onClick={() => scrollToSection('featured-stories')}
                   className="justify-start border-gray-300 bg-white/10 text-black backdrop-blur-sm hover:bg-gray-100"
                 >
                   <Star className="mr-2 size-4" />
                   精选故事
                 </Button>
                 <Link href="/journey/archive">
                   <Button
                     variant="secondary"
                     size="sm"
                     className="w-full justify-start border-gray-300 bg-white/10 text-black backdrop-blur-sm hover:bg-gray-100"
                   >
                     <Archive className="mr-2 size-4" />
                     全部日志
                   </Button>
                 </Link>
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* 最新动态模块 */}
      {latestPosts.length > 0 && (
        <section id="latest-update" className="bg-background py-16">
          <div className="flex justify-center">
            <div className="w-[75%]">
              <div className="mb-12 space-y-4 text-center">
                <h2 className="font-heading text-3xl font-bold">最新动态</h2>
                <p className="text-lg text-muted-foreground">最近的旅行足迹和思考</p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {latestPosts.map((post) => (
                  <FeaturedStoryCard key={post._id} post={post} />
                ))}
              </div>
              
              {/* 查看更多按钮 */}
              <div className="mt-10 flex justify-center">
                <Link href="/journey/archive">
                  <Button variant="outline" className="group border-primary/30 px-8 hover:bg-primary/5">
                    查看更多旅行日志
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 照片墙/瀑布流 */}
      <section id="photo-gallery" className="bg-background py-16">
        <div className="flex justify-center">
          <div className="w-[75%]">
            <div className="mb-12 space-y-4 text-center">
              <h2 className="font-heading text-3xl font-bold">旅行相册</h2>
              <p className="text-lg text-muted-foreground">记录路上的精彩瞬间</p>
            </div>
            
            <JourneyPhotoGallery photos={allJourneyPhotos} />
          </div>
        </div>
      </section>

      {/* 精选故事模块 */}
      {featuredPosts.length > 0 && (
        <section id="featured-stories" className="bg-background py-16">
          <div className="flex justify-center">
            <div className="w-[75%]">
              <div className="mb-12 space-y-4 text-center">
                <h2 className="font-heading text-3xl font-bold">精选故事</h2>
                <p className="text-lg text-muted-foreground">那些值得回味的旅行时光</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredPosts.map((post) => (
                  <FeaturedStoryCard key={post._id} post={post} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}

// 最新动态卡片组件
function LatestUpdateCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="relative aspect-[16/9] overflow-hidden md:aspect-square">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex flex-col justify-center p-8 md:w-1/2">
          <div className="space-y-4">
            <Badge variant="secondary">{post.category}</Badge>
            <h3 className="font-heading text-2xl font-bold">{post.title}</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="size-4" />
                {formatDate(post.date)}
              </span>
              {post.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="size-4" />
                  {post.location[0].toFixed(2)}, {post.location[1].toFixed(2)}
                </span>
              )}
            </div>
            <Link href={post.slug}>
              <Button className="w-fit">
                阅读全文
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  )
}

// 精选故事卡片组件
function FeaturedStoryCard({ post }: { post: Post }) {
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* 悬浮标签 */}
        <div className="absolute left-3 top-3">
          <Badge variant="secondary" className="bg-white/80 font-medium text-black/80 backdrop-blur-sm">
            {post.category}
          </Badge>
        </div>
      </div>
      <CardContent className="space-y-4 p-6">
        <h3 className="line-clamp-2 font-heading text-xl font-semibold">
          {post.title}
        </h3>
        <p className="line-clamp-3 text-muted-foreground">
          {post.description}
        </p>
        <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="size-3.5" />
            {formatDate(post.date)}
          </span>
          {post.location && (
            <span className="flex items-center gap-1">
              <MapPin className="size-3.5" />
              坐标
            </span>
          )}
        </div>
      </CardContent>
      <Link href={post.slug} className="absolute inset-0">
        <span className="sr-only">阅读文章</span>
      </Link>
    </Card>
  )
}
