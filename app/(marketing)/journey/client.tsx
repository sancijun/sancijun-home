"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Post } from "contentlayer/generated"
import { formatDate } from "@/lib/utils"
import dynamic from "next/dynamic"
import { journeyConfig } from "@/config/journey"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  MapPin,
  Navigation,
  Calendar,
  Compass,
  Map,
  Clock,
  Car,
  ListChecks,
} from "lucide-react"
import { cn } from "@/lib/utils"

export default function JourneyClientPage({ posts }: { posts: Post[] }) {
  const postsWithLocation = posts.filter(
    (post) => post.location && post.location.length === 2
  )

  const [hoveredPostId, setHoveredPostId] = React.useState<string | null>(null)
  const [activeTab, setActiveTab] = React.useState<
    "timeline" | "map" | "planned"
  >("timeline")

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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background/95 to-accent/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-accent/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="max-w-6xl mx-auto text-center space-y-8">
            <Badge
              variant="outline"
              className="text-sm font-medium px-4 py-2 border-primary/20 bg-primary/5"
            >
              在路上 · 进行时
            </Badge>

            <div className="space-y-6">
              <h1 className="font-heading text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
                代码之外，是山河大地
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto">
                一场正在进行的环国自驾，是我的灵感来源，也是我的移动实验室。
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-3xl mx-auto">
              {[
                { icon: MapPin, label: "已到达", value: `${posts.length}`, suffix: "城" },
                { icon: Car, label: "总里程", value: "12.5K", suffix: "km" },
                { icon: Clock, label: "在路天数", value: "89", suffix: "天" },
                { icon: Calendar, label: "旅程记录", value: posts.length, suffix: "篇" },
              ].map((stat, index) => (
                <div key={index} className="group">
                  <div className="bg-card/60 backdrop-blur-sm border border-border/30 rounded-2xl p-4 sm:p-5 transition-all duration-300 hover:bg-card/80 hover:border-primary/30 hover:shadow-lg hover:scale-105">
                    <stat.icon className="w-8 h-8 mb-2 text-primary" />
                    <div className="text-2xl sm:text-3xl font-bold text-foreground">
                      {stat.value}
                      <span className="text-sm text-muted-foreground ml-1">{stat.suffix}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button
                size="lg"
                className="group h-14 px-8 text-lg"
                onClick={() =>
                  document
                    .getElementById("journey-content")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                <Navigation className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                开始探索
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section
        id="journey-content"
        className="sticky top-[65px] z-40 bg-background/95 backdrop-blur-sm border-b border-border/20"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-3">
            <div className="flex space-x-1 bg-muted p-1 rounded-xl border">
              {[
                { key: "timeline", label: "时间线", icon: Calendar, count: posts.length },
                { key: "map", label: "地图", icon: Map, count: postsWithLocation.length },
                { key: "planned", label: "计划", icon: ListChecks, count: journeyConfig.plannedRoute2024.length },
              ].map(({ key, label, icon: Icon, count }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as any)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    activeTab === key
                      ? "bg-primary text-primary-foreground shadow"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                  <span className="text-xs opacity-70">({count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 py-12">
        {activeTab === "timeline" && (
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent transform -translate-x-1/2" />
            <div className="space-y-12">
              {posts.map((post, index) => (
                <div
                  key={post._id}
                  className="relative flex items-center md:space-x-8"
                  onMouseEnter={() => setHoveredPostId(post._id)}
                  onMouseLeave={() => setHoveredPostId(null)}
                >
                  <div className="hidden md:block w-1/2">
                    {index % 2 === 0 && <TimelineCard post={post} />}
                  </div>
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-primary rounded-full transform -translate-x-1/2 z-10 border-4 border-background">
                    <div
                      className={cn(
                        "absolute inset-0 rounded-full transition-all duration-300",
                        hoveredPostId === post._id ? "bg-primary/30 animate-ping" : ""
                      )}
                    />
                  </div>
                  <div className="w-full md:w-1/2 md:pl-4 pl-12">
                    {index % 2 !== 0 && <TimelineCard post={post} />}
                    <div className="md:hidden mt-4">
                      {index % 2 === 0 && <TimelineCard post={post} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "map" && (
          <div className="h-[600px] lg:h-[800px] rounded-2xl overflow-hidden border">
            <JourneyMap posts={postsWithLocation} />
          </div>
        )}

        {activeTab === "planned" && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              2024 环国探索计划
            </h2>
            <div className="space-y-4">
              {journeyConfig.plannedRoute2024.map((destination, index) => (
                <Card key={index} className="p-4 sm:p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-semibold">{destination.name}</h3>
                      <p className="text-sm text-muted-foreground">{destination.province}</p>
                    </div>
                    <Badge variant="secondary">计划中</Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

function TimelineCard({ post }: { post: Post }) {
  return (
    <Link href={post.slug}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 border-border/30 bg-card/60 backdrop-blur-sm">
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
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
          )}
          <div className="absolute bottom-0 left-0 p-4">
            <h3 className="font-heading text-lg font-bold text-white drop-shadow-lg">
              {post.title}
            </h3>
          </div>
        </div>
        <CardContent className="p-4">
          <p className="line-clamp-2 text-sm text-muted-foreground mb-3">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>{formatDate(post.date)}</span>
            {post.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                坐标: {post.location[0]}, {post.location[1]}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
