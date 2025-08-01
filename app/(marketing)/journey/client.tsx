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
  Navigation,
  Image as ImageIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { journeyConfig } from "@/config/journey"
import { JourneyPhotoGallery, JourneyPhoto } from "@/components/journey-photo-gallery"

export default function JourneyClientPage() {
  // 获取并处理文章数据
  const posts = allPosts
    .filter((post) => post.published && post.category === "环国自驾")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  // 从文章中提取照片数据
  const journeyPhotos: JourneyPhoto[] = posts
    .filter(post => post.image)
    .map((post, index) => {
      // 根据图片名称推断宽高比
      // 假设文件名中包含 'portrait' 表示竖图，'panorama' 表示全景图，其他为标准横图
      const isPortrait = post.image.toLowerCase().includes('portrait');
      const isPanorama = post.image.toLowerCase().includes('panorama');
      
      let width = 1600;
      let height = 1200;
      
      if (isPortrait) {
        width = 1200;
        height = 1800;
      } else if (isPanorama) {
        width = 2400;
        height = 1200;
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
          const isPortrait = img.toLowerCase().includes('portrait');
          const isPanorama = img.toLowerCase().includes('panorama');
          
          let width = 1600;
          let height = 1200;
          
          if (isPortrait) {
            width = 1200;
            height = 1800;
          } else if (isPanorama) {
            width = 2400;
            height = 1200;
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

  // 获取最新的一篇文章
  const latestPost = posts[0] || null

  // 获取精选故事（置顶的或者有特定标签的文章）
  const featuredPosts = posts
    .filter((post) => post.pinned || post.tags?.includes("精选"))
    .slice(0, 6) // 最多显示6篇
  const postsWithLocation = posts.filter(
    (post) => post.location && post.location.length === 2
  )

  const [hoveredPostId, setHoveredPostId] = React.useState<string | null>(null)
  const [activePostId, setActivePostId] = React.useState<string | null>(null)

  const JourneyMap = React.useMemo(
    () =>
      dynamic(() => import("@/components/journey-map"), {
        loading: () => (
          <div className="h-full w-full flex items-center justify-center bg-muted/50">
            <div className="text-center space-y-4">
              <div className="animate-spin">
                <Compass className="h-8 w-8 text-primary mx-auto" />
              </div>
              <p className="text-muted-foreground">探索地图加载中...</p>
            </div>
          </div>
        ),
        ssr: false,
      }),
    []
  )

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
           <div className="w-[75%] h-[85%] relative">
             <JourneyMap
               posts={postsWithLocation}
               activePostId={activePostId}
               onPostHover={setHoveredPostId}
             />
             
             {/* 标题和描述悬浮层 - 左上角 */}
             <div className="absolute top-6 left-6 z-[1100] pointer-events-none">
               <div className="space-y-4 pointer-events-auto max-w-md">
                 <h1 className="font-heading text-4xl md:text-5xl font-bold tracking-tight text-black drop-shadow-lg">
                   在路上
                 </h1>
                 <p className="text-lg md:text-xl text-black/80 leading-relaxed drop-shadow-lg">
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
                   className="bg-white/10 backdrop-blur-sm border-gray-300 text-black hover:bg-gray-100 justify-start"
                 >
                   <Clock className="w-4 h-4 mr-2" />
                   最新动态
                 </Button>
                 <Button
                   variant="secondary"
                   size="sm"
                   onClick={() => scrollToSection('photo-gallery')}
                   className="bg-white/10 backdrop-blur-sm border-gray-300 text-black hover:bg-gray-100 justify-start"
                 >
                   <ImageIcon className="w-4 h-4 mr-2" />
                   旅行相册
                 </Button>
                 <Button
                   variant="secondary"
                   size="sm"
                   onClick={() => scrollToSection('featured-stories')}
                   className="bg-white/10 backdrop-blur-sm border-gray-300 text-black hover:bg-gray-100 justify-start"
                 >
                   <Star className="w-4 h-4 mr-2" />
                   精选故事
                 </Button>
                 <Button
                   variant="secondary"
                   size="sm"
                   onClick={() => scrollToSection('road-ahead')}
                   className="bg-white/10 backdrop-blur-sm border-gray-300 text-black hover:bg-gray-100 justify-start"
                 >
                   <Navigation className="w-4 h-4 mr-2" />
                   旅行计划
                 </Button>
                 <Link href="/journey/archive">
                   <Button
                     variant="secondary"
                     size="sm"
                     className="bg-white/10 backdrop-blur-sm border-gray-300 text-black hover:bg-gray-100 justify-start w-full"
                   >
                     <Archive className="w-4 h-4 mr-2" />
                     全部日志
                   </Button>
                 </Link>
               </div>
             </div>
           </div>
         </div>
       </section>

      {/* 最新动态模块 */}
      {latestPost && (
        <section id="latest-update" className="py-16 bg-background">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-heading text-3xl font-bold">最新动态</h2>
              <p className="text-muted-foreground text-lg">最近的旅行足迹和思考</p>
            </div>

            <div className="max-w-4xl mx-auto">
              <LatestUpdateCard post={latestPost} />
            </div>
          </div>
        </section>
      )}

      {/* 照片墙/瀑布流 */}
      <section id="photo-gallery" className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl font-bold">旅行相册</h2>
            <p className="text-muted-foreground text-lg">记录路上的精彩瞬间</p>
          </div>
          
          <JourneyPhotoGallery photos={allJourneyPhotos} />
        </div>
      </section>

      {/* 精选故事模块 */}
      {featuredPosts.length > 0 && (
        <section id="featured-stories" className="py-16 bg-background">
          <div className="container">
            <div className="text-center space-y-4 mb-12">
              <h2 className="font-heading text-3xl font-bold">精选故事</h2>
              <p className="text-muted-foreground text-lg">那些值得回味的旅行时光</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <FeaturedStoryCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 旅行计划模块 */}
      <section id="road-ahead" className="py-16 bg-muted/30">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl font-bold">旅行计划</h2>
            <p className="text-muted-foreground text-lg">即将到达的目的地</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <RoadAheadSection />
          </div>
        </div>
      </section>

      {/* 旅行统计 */}
      <section id="journey-stats" className="py-16 bg-background">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading text-3xl font-bold">旅行数据</h2>
            <p className="text-muted-foreground text-lg">环国自驾的数字足迹</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <JourneyStats posts={posts} />
          </div>
        </div>
      </section>
    </div>
  )
}

// 最新动态卡片组件
function LatestUpdateCard({ post }: { post: Post }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="aspect-[16/9] md:aspect-square relative overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <div className="space-y-4">
            <Badge variant="secondary">{post.category}</Badge>
            <h3 className="font-heading text-2xl font-bold">{post.title}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {post.description}
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
              {post.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {post.location[0].toFixed(2)}, {post.location[1].toFixed(2)}
                </span>
              )}
            </div>
            <Link href={post.slug}>
              <Button className="w-fit">
                阅读全文
                <ArrowRight className="w-4 h-4 ml-2" />
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
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[16/9] relative overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6 space-y-4">
        <h3 className="font-heading text-xl font-semibold line-clamp-2">
          {post.title}
        </h3>
        <p className="text-muted-foreground line-clamp-3">
          {post.description}
        </p>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {formatDate(post.date)}
          </span>
          {post.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
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

// 旅行统计组件
function JourneyStats({ posts }: { posts: Post[] }) {
  const totalPlanned = journeyConfig.plannedRoute2024.length
  const totalVisited = posts.length
  const progressPercentage = totalVisited > 0 ? Math.round((totalVisited / totalPlanned) * 100) : 0

  // 计算在路上的天数
  const startDate = new Date('2025-07-05')
  const currentDate = new Date()
  const daysOnRoad = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

  // 计算覆盖的省份
  const visitedProvinces = new Set(
    posts
      .filter(post => post.location)
      .map(post => {
        // 这里可以根据位置坐标推断省份，暂时用一个简单的映射
        // 实际应用中可能需要更复杂的地理编码
        return "已访问省份" // 占位符
      })
  )

  const plannedProvinces = new Set(
    journeyConfig.plannedRoute2024.map(dest => dest.province)
  )

  return (
    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-6 rounded-lg space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">旅行统计</h3>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">{totalVisited}</div>
          <div className="text-sm text-gray-600">已访问</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{totalPlanned}</div>
          <div className="text-sm text-gray-600">计划中</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-600">{daysOnRoad}</div>
          <div className="text-sm text-gray-600">在路天数</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{plannedProvinces.size}</div>
          <div className="text-sm text-gray-600">涉及省份</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-indigo-600">{progressPercentage}%</div>
          <div className="text-sm text-gray-600">完成度</div>
        </div>
      </div>

      {/* 进度条 */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600">
          <span>旅行进度</span>
          <span>{totalVisited} / {totalPlanned}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* 省份分布 */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900">计划覆盖省份</h4>
        <div className="flex flex-wrap gap-2">
          {Array.from(plannedProvinces).map(province => (
            <span
              key={province}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >
              {province}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 旅行计划组件
function RoadAheadSection() {
  const upcomingPlans = [
    {
      destination: "川西高原",
      timeframe: "2024年春季",
      description: "探索四川西部的高原风光，体验藏族文化",
      status: "计划中"
    },
    {
      destination: "新疆天山",
      timeframe: "2024年夏季",
      description: "穿越天山南北，感受大美新疆的壮阔",
      status: "准备中"
    },
    {
      destination: "东北雪国",
      timeframe: "2024年冬季",
      description: "在冰天雪地中寻找不一样的中国",
      status: "构想中"
    }
  ]

  return (
    <div className="space-y-6">
      {upcomingPlans.map((plan, index) => (
        <Card key={index} className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3">
                <h3 className="font-heading text-xl font-semibold">{plan.destination}</h3>
                <Badge variant="outline">{plan.status}</Badge>
              </div>
              <p className="text-muted-foreground">{plan.timeframe}</p>
              <p className="text-muted-foreground leading-relaxed">{plan.description}</p>
            </div>
            <Navigation className="w-6 h-6 text-muted-foreground mt-1" />
          </div>
        </Card>
      ))}
    </div>
  )
}
