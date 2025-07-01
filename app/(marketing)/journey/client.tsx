"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Post } from "contentlayer/generated"
import { formatDate } from "@/lib/utils"
import dynamic from "next/dynamic"
import { journeyConfig } from "@/config/journey"
import JourneyStats from "@/components/journey-stats"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Camera, 
  Heart, 
  Compass,
  Map,
  Clock,
  ChevronRight,
  Star,
  Coffee,
  Zap,
  Car
} from "lucide-react"

export default function JourneyClientPage({ posts }: { posts: Post[] }) {
  const postsWithLocation = posts.filter(
    (post) => post.location && post.location.length === 2
  )

  const [hoveredPostId, setHoveredPostId] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<'timeline' | 'map' | 'planned'>('timeline')
  const [selectedPost, setSelectedPost] = React.useState<Post | null>(null)

  const JourneyMap = React.useMemo(
    () =>
      dynamic(() => import("@/components/journey-map"), {
        loading: () => (
          <div className="h-full flex items-center justify-center bg-gradient-to-br from-muted/20 to-accent/10 rounded-2xl border border-border/20">
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

  return (
    <div className="min-h-screen">
      {/* Hero Section - 统一风格设计 */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-accent/5">
        {/* 背景装饰 - 协调版 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-muted/20 rounded-full blur-2xl animate-pulse delay-500" />
          
          {/* 微妙的网格背景 */}
          <div 
            className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            {/* 状态标识 */}
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-green-500/10 border border-green-500/20 rounded-full backdrop-blur-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-600 dark:text-green-400 font-medium">正在路上 · 实时更新</span>
            </div>

            {/* 主标题 */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
                  在路上
                </span>
        </h1>
              
              <p className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground">
                从大厂到自由的
                <span className="text-primary font-semibold">数字游民</span>
                旅程
              </p>
              
              <p className="text-lg sm:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                用代码改变世界，用脚步丈量人生
                <br />
                <span className="text-foreground font-medium">记录一个程序员的逃离与探索之路</span>
        </p>
      </div>
      
            {/* 核心数据展示 */}
            <div className="bg-card/70 backdrop-blur-sm rounded-2xl p-8 border border-border/20 shadow-xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                {[
                  { icon: MapPin, label: "已到达", value: `${posts.length}`, suffix: "城", gradient: "from-green-500 to-green-600" },
                  { icon: Car, label: "总里程", value: "12,500", suffix: "km", gradient: "from-blue-500 to-blue-600" },
                  { icon: Calendar, label: "在路天数", value: "89", suffix: "天", gradient: "from-purple-500 to-purple-600" },
                  { icon: Coffee, label: "代码咖啡", value: "156", suffix: "杯", gradient: "from-orange-500 to-orange-600" },
                ].map((stat, index) => (
                  <div key={index} className="text-center space-y-3 group">
                    <div className={`w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl flex items-center justify-center text-white mx-auto group-hover:scale-110 transition-transform`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-foreground">
                      {stat.value}
                      <span className="text-sm text-muted-foreground ml-1">{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
      </div>
      
            {/* CTA按钮 */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                size="lg" 
                className="group bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => setActiveTab('timeline')}
              >
                <Navigation className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                开始探索旅程
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="group border-border hover:border-primary/50 hover:bg-primary/5 h-14 px-8 text-lg backdrop-blur-sm"
                onClick={() => setActiveTab('map')}
              >
                <Compass className="w-5 h-5 mr-2 group-hover:rotate-45 transition-transform duration-300" />
                查看路线地图
              </Button>
            </div>
          </div>
        </div>

        {/* 向下滚动指示器 */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* 导航标签 */}
      <section className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-4">
            <div className="flex space-x-1 bg-muted/30 p-1 rounded-xl border border-border/20">
              {[
                { key: 'timeline', label: '🗓️ 旅程时间线', count: posts.length },
                { key: 'map', label: '🗺️ 互动地图', count: postsWithLocation.length },
                { key: 'planned', label: '📍 计划路线', count: journeyConfig.plannedRoute2024.length }
              ].map(({ key, label, count }) => (
            <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeTab === key
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  {label}
                  <span className="ml-2 text-xs opacity-70">({count})</span>
            </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 主内容区域 */}
      <section className="container mx-auto px-4 py-12">
        {/* 时间线视图 */}
        {activeTab === 'timeline' && (
          <div className="space-y-8">
            {/* 故事引导 */}
            <div className="text-center space-y-4 max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                我的逃离故事
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                从深圳的CBD写字楼到祖国的大好河山，每一站都是对自由的重新定义
              </p>
            </div>

            {/* 交互式时间线 */}
            <div className="relative max-w-6xl mx-auto">
              {/* 时间线轴 */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/60 to-primary/30 transform md:-translate-x-1/2" />
              
              <div className="space-y-12">
                {posts.map((post, index) => (
                  <div 
                    key={post._id}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                    onMouseEnter={() => setHoveredPostId(post._id)}
                    onMouseLeave={() => setHoveredPostId(null)}
                  >
                    {/* 时间线节点 */}
                    <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-to-r from-primary to-primary/70 rounded-full transform md:-translate-x-1/2 z-10 shadow-lg border-2 border-background">
                      <div className={`absolute inset-0 rounded-full transition-all duration-300 ${
                        hoveredPostId === post._id ? 'bg-primary/30 animate-ping' : ''
                      }`} />
                    </div>

                    {/* 内容卡片 */}
                    <div className={`w-full md:w-5/12 ml-12 md:ml-0 ${
                      index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                    }`}>
                      <Card className={`group overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-105 border-border/20 ${
                        hoveredPostId === post._id ? 'ring-2 ring-primary/20 shadow-xl border-primary/30' : ''
                      }`}>
                        <div className="relative">
                          {post.image && (
                            <div className="aspect-[16/9] overflow-hidden">
                              <Image
                                src={post.image}
                                alt={post.title}
                                width={600}
                                height={338}
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                              />
                              {/* 渐变遮罩 */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              
                              {/* 日期标签 */}
                              <div className="absolute top-4 right-4">
                                <Badge className="bg-black/50 text-white backdrop-blur-sm border-white/20">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {formatDate(post.date)}
                                </Badge>
                              </div>
                            </div>
                          )}
                          
                          <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors">
                                <Link href={post.slug}>
                                  {post.title}
                                </Link>
                              </h3>
                              
                              {post.description && (
                                <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                                  {post.description}
                                </p>
                              )}
                            </div>

                            {/* 标签 */}
                            <div className="flex flex-wrap gap-2">
                              {post.tags?.slice(0, 3).map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs bg-muted/50 hover:bg-primary/10 transition-colors">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            {/* 阅读按钮 */}
                            <Link href={post.slug} className="inline-block">
                              <Button variant="ghost" size="sm" className="group/btn hover:text-primary">
                                继续阅读
                                <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                              </Button>
                            </Link>
                          </CardContent>
                        </div>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 更多内容引导 */}
            <div className="text-center py-12 bg-gradient-to-br from-muted/20 to-accent/10 rounded-2xl border border-border/20">
              <div className="space-y-4">
                <Heart className="h-12 w-12 text-primary mx-auto" />
                <h3 className="text-2xl sm:text-3xl font-bold">旅程还在继续...</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  关注我的最新动态，见证更多精彩故事和技术分享
                </p>
                <Button size="lg" className="mt-4 group">
                  <Star className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  订阅旅程更新
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* 地图视图 */}
        {activeTab === 'map' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                足迹地图
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                点击地图上的标记，探索每个城市的故事
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* 地图区域 - 优化样式 */}
              <div className="lg:col-span-2">
                <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-xl border border-border/20 bg-gradient-to-br from-card to-muted/20">
                  <JourneyMap posts={postsWithLocation} hoveredPostId={hoveredPostId} />
                </div>
              </div>

              {/* 地点列表 */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/70 rounded-lg flex items-center justify-center text-white">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <h3 className="font-semibold text-lg">已访问的城市</h3>
          </div>

                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
                  {postsWithLocation.map((post) => (
                    <Card 
                      key={post._id}
                      className={`group p-4 cursor-pointer transition-all duration-300 hover:shadow-md border-border/20 ${
                        hoveredPostId === post._id ? 'ring-2 ring-primary/20 shadow-lg border-primary/30' : ''
                      }`}
                      onMouseEnter={() => setHoveredPostId(post._id)}
                      onMouseLeave={() => setHoveredPostId(null)}
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate group-hover:text-primary transition-colors">{post.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                            {post.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.date)}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 计划路线 */}
        {activeTab === 'planned' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
                2025年路线规划
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground">
                下一站在哪里？让我们一起期待更多精彩
              </p>
            </div>

            {/* 路线概览卡片 */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-muted/10 p-8 lg:p-12 rounded-2xl border border-border/20">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
              </div>
              
              <div className="relative grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center text-white">
                      <Car className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold">环国自驾·第二季</h3>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    从深圳出发，计划穿越<span className="text-primary font-semibold">26个城市</span>，最终抵达三亚。
                    这一次，我将带着更多的经验和对自由生活的理解，继续探索中国的壮美河山。
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Map className="w-4 h-4 text-primary" />
                      <span>预计行程：<span className="font-semibold">8000+ km</span></span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="w-4 h-4 text-primary" />
                      <span>预计时长：<span className="font-semibold">3个月</span></span>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="aspect-[4/3] bg-gradient-to-br from-muted/30 to-accent/20 rounded-xl border border-border/20 flex items-center justify-center">
                    <div className="text-center space-y-2">
                      <Car className="w-12 h-12 text-primary mx-auto" />
                      <p className="text-sm text-muted-foreground">路线规划图</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 路线列表 */}
            <div className="grid gap-4">
                  {journeyConfig.plannedRoute2024.map((destination, index) => (
                <Card
                      key={destination.name}
                  className="group p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-border/20 hover:border-primary/20"
                    >
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary to-primary/70 text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold group-hover:text-primary transition-colors">{destination.name}</h4>
                        <Badge variant="outline" className="text-xs bg-muted/50">
                          {destination.province}
                        </Badge>
                      </div>
                        {destination.description && (
                        <p className="text-muted-foreground mb-2">
                            {destination.description}
                          </p>
                        )}
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {destination.coordinates[0].toFixed(4)}, {destination.coordinates[1].toFixed(4)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          预计停留：2-3天
                        </span>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-blue-200">
                        计划中
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">2025年</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* 参与邀请 */}
            <div className="text-center bg-gradient-to-br from-muted/20 to-accent/10 p-8 lg:p-12 rounded-2xl border border-border/20">
              <div className="max-w-3xl mx-auto space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/70 rounded-2xl flex items-center justify-center text-white mx-auto">
                  <Star className="h-8 w-8" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold">想要同行吗？</h3>
                <p className="text-muted-foreground leading-relaxed">
                  如果你也想体验数字游民的生活，或者想在某个城市与我见面交流技术和创业，
                  欢迎通过邮件联系我。让我们一起探索更大的世界，用代码连接彼此！
                </p>
                <Button size="lg" className="group bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                  <Zap className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                  联系我
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
