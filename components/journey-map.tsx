"use client"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents, GeoJSON } from "react-leaflet"
import { Post } from "contentlayer/generated"
import Link from "next/link"
import { LatLngExpression, Icon, DivIcon } from "leaflet"
import { journeyConfig } from "@/config/journey"
import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import React from "react"

interface JourneyMapProps {
  posts: Post[]
  activePostId?: string | null
  onPostHover: (postId: string | null) => void
}

// 根据缩放级别创建不同大小的标记点
const createCustomIcon = (
  color: string,
  isActive: boolean = false,
  zoomLevel: number = 5
) => {
  // 根据缩放级别调整标记点大小和样式
  let size, showIcon

  if (zoomLevel <= 4) {
    size = 8
    showIcon = false
  } else if (zoomLevel <= 6) {
    size = isActive ? 18 : 14
    showIcon = false
  } else {
    size = isActive ? 32 : 28
    showIcon = true
  }

  return new DivIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border: 2px solid hsl(var(--background));
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transform: ${isActive ? "scale(1.2)" : "scale(1)"};
        transition: all 0.3s ease;
        cursor: pointer;
      ">
      </div>
    `,
    className: "custom-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

// 地图事件监听组件
function MapEventHandler({ onZoomChange }: { onZoomChange: (zoom: number) => void }) {
  useMapEvents({
    zoomend: (e) => {
      onZoomChange(e.target.getZoom())
    },
    zoomstart: (e) => {
      onZoomChange(e.target.getZoom())
    }
  })
  return null
}

export default function JourneyMap({ posts, activePostId, onPostHover }: JourneyMapProps) {
  const defaultPosition: LatLngExpression = [30.0, 110.0]
  const [showPlannedRoute, setShowPlannedRoute] = useState(true)
  const [currentZoom, setCurrentZoom] = useState(5)
  const mapRef = React.useRef<any>(null)
  const [chinaGeoJson, setChinaGeoJson] = useState<any>(null)

  useEffect(() => {
    // 获取中国边界的 GeoJSON 数据
    fetch("https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json")
      .then((res) => res.json())
      .then((data) => {
        setChinaGeoJson(data)
      })
  }, [])

  useEffect(() => {
    if (!activePostId || !mapRef.current) return

    const post = posts.find((p) => p._id === activePostId)
    if (post?.location) {
      mapRef.current.flyTo(post.location as LatLngExpression, Math.max(mapRef.current.getZoom(), 8), {
        animate: true,
        duration: 1.5,
      })
    }
  }, [activePostId, posts])

  // 将计划路线转换为折线坐标
  const routeCoordinates: LatLngExpression[] = journeyConfig.plannedRoute2024.map(
    (destination) => destination.coordinates as LatLngExpression
  )

  const chinaBorderStyle = {
    color: "hsl(var(--muted-foreground))",
    weight: 1,
    opacity: 0.5,
    fillColor: "hsl(var(--muted-foreground))",
    fillOpacity: 0.05,
  }

  // 根据缩放级别决定是否显示标记点
  const shouldShowMarkers = currentZoom > 3
  const shouldShowPopups = currentZoom > 5

  return (
    <div className="relative h-full w-full">
      {/* 简化的控制器 */}
      <Card className="absolute top-4 right-4 z-[1000] p-3 border border-border/20 bg-background/95 backdrop-blur-sm shadow-lg">
        <div className="flex items-center space-x-3">
          <Switch
            id="planned-route"
            checked={showPlannedRoute}
            onCheckedChange={setShowPlannedRoute}
          />
          <label htmlFor="planned-route" className="text-sm font-medium cursor-pointer">
            显示计划路线
          </label>
        </div>
      </Card>

      {/* 动态图例 - 根据缩放级别调整 */}
      <Card className="absolute bottom-4 left-4 z-[1000] p-3 border border-border/20 bg-background/95 backdrop-blur-sm shadow-lg">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium">图例</h4>
            <span className="text-xs text-muted-foreground">缩放 {currentZoom}</span>
          </div>
          <div className="space-y-2">
            {shouldShowMarkers && (
              <>
                <div className="flex items-center space-x-2">
                  <div className={`${currentZoom <= 4 ? 'w-2 h-2' : 'w-4 h-4'} rounded-full bg-gradient-to-r from-green-500 to-green-600 border-2 border-white shadow-sm`}></div>
                  <span className="text-xs">已访问</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className={`${currentZoom <= 4 ? 'w-2 h-2' : 'w-4 h-4'} rounded-full bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-white shadow-sm`}></div>
                  <span className="text-xs">计划中</span>
                </div>
              </>
            )}
            {showPlannedRoute && (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-0.5 bg-primary opacity-70" style={{ borderTop: '2px dashed' }}></div>
                <span className="text-xs">路线</span>
              </div>
            )}
            {!shouldShowMarkers && (
              <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                放大查看标记点
              </div>
            )}
          </div>
        </div>
      </Card>

      <MapContainer
        ref={mapRef}
        center={defaultPosition}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full rounded-none md:rounded-2xl"
        zoomControl={false}
      >
        {/* 地图事件监听 */}
        <MapEventHandler onZoomChange={setCurrentZoom} />

        {/* 使用高德地图浅色主题，确保中文显示，并控制显示的要素 */}
        <TileLayer
          url="https://webrd03.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.amap.com/">高德地图</a>'
          maxZoom={18}
        />

        {/* 渲染中国边境高亮 */}
        {chinaGeoJson && (
          <GeoJSON data={chinaGeoJson} style={chinaBorderStyle} />
        )}

        {/* 已访问的地点标记 - 根据缩放级别显示 */}
        {shouldShowMarkers &&
          posts.map((post) => {
            if (!post.location || post.location.length !== 2) return null

            const position: LatLngExpression = [post.location[0], post.location[1]]

            return (
              <Marker
                key={post._id}
                position={position}
                icon={createCustomIcon(
                  "hsl(var(--primary))",
                  activePostId === post._id,
                  currentZoom
                )}
                eventHandlers={{
                  mouseover: () => onPostHover(post._id),
                  mouseout: () => onPostHover(null),
                }}
              >
                {shouldShowPopups && (
                  <Popup className="custom-popup" closeButton={false}>
                    <div className="space-y-2 p-1">
                      <Link
                        href={post.slug}
                        className="font-semibold hover:underline text-primary flex items-center gap-2"
                      >
                        {post.title}
                      </Link>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("zh-CN")}
                      </span>
                    </div>
                  </Popup>
                )}
              </Marker>
            )
          })}

        {/* 计划路线和标记 */}
        {showPlannedRoute && (
          <>
            {/* 路线折线 */}
            <Polyline
              positions={routeCoordinates}
              pathOptions={{
                color: "hsl(var(--primary))",
                weight: Math.max(2, Math.min(5, currentZoom - 2)), // 根据缩放级别调整线条粗细
                opacity: 0.9,
                lineCap: "round",
                lineJoin: "round"
              }}
            />

            {/* 计划目的地标记 */}
            {shouldShowMarkers &&
              journeyConfig.plannedRoute2024.map((destination, index) => (
                <Marker
                  key={`planned-${destination.name}`}
                  position={destination.coordinates as LatLngExpression}
                  icon={createCustomIcon(
                    "hsl(var(--muted-foreground))",
                    false,
                    currentZoom
                  )}
                >
                  {shouldShowPopups && (
                    <Popup className="custom-popup" closeButton={false}>
                      <div className="space-y-2 p-1">
                        <h3 className="font-semibold text-muted-foreground">
                          {destination.name}
                        </h3>
                        <Badge
                          variant="secondary"
                          className="font-normal"
                        >
                          计划中
                        </Badge>
                      </div>
                    </Popup>
                  )}
                </Marker>
              ))}
          </>
        )}
      </MapContainer>

      {/* 自定义样式 */}
      <style jsx global>{`
        .leaflet-tile-container {
          filter: grayscale(100%) !important;
        }
        
        .leaflet-container {
          background: hsl(var(--background)) !important;
        }
        
        .leaflet-popup-content-wrapper {
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          border-radius: 0.75rem;
          box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04);
          padding: 0;
          overflow: hidden;
        }
        
        .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }
        
        .leaflet-popup-tip {
          background: hsl(var(--background));
          border: 1px solid hsl(var(--border));
          box-shadow: 0 2px 4px rgb(0 0 0 / 0.1);
        }
        
        .leaflet-container {
          font-family: inherit;
        }
        
        .custom-marker:hover div {
          transform: scale(1.15) !important;
          box-shadow: 0 6px 20px rgba(0,0,0,0.4), 0 0 0 4px rgba(59, 130, 246, 0.3) !important;
        }
        
        .leaflet-control-attribution {
          background: hsl(var(--background) / 0.9) !important;
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 0.375rem !important;
          backdrop-filter: blur(8px);
          font-size: 10px !important;
          padding: 2px 6px !important;
        }
        
        .leaflet-control-attribution a {
          color: hsl(var(--muted-foreground)) !important;
          text-decoration: none;
        }
        
        .leaflet-control-attribution a:hover {
          color: hsl(var(--primary)) !important;
        }
        
        /* 隐藏默认zoom控件 */
        .leaflet-top.leaflet-left {
          display: none;
        }
        
        /* 地图加载动画 */
        .leaflet-tile-container {
          transition: opacity 0.3s ease;
        }
        
        /* 路径动画效果 */
        .leaflet-interactive[stroke-dasharray] {
          animation: dashAnimation 20s linear infinite;
        }
        
        @keyframes dashAnimation {
          0% {
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dashoffset: -50;
          }
        }
        
        /* 标记点缩放过渡动画 */
        .custom-marker div {
          transition: all 0.3s ease !important;
        }
      `}</style>
    </div>
  )
}
