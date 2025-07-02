"use client"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"

import { MapContainer, TileLayer, Marker, Popup, Polyline, useMapEvents } from "react-leaflet"
import { Post } from "contentlayer/generated"
import Link from "next/link"
import { LatLngExpression, Icon, DivIcon } from "leaflet"
import { journeyConfig } from "@/config/journey"
import { useState, useEffect } from "react"
import { Switch } from "@/components/ui/switch"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface JourneyMapProps {
  posts: Post[]
}

// 根据缩放级别创建不同大小的标记点
const createCustomIcon = (color: string, isActive: boolean = false, zoomLevel: number = 5) => {
  // 根据缩放级别调整标记点大小和样式
  let size, opacity, showIcon, fontSize
  
  if (zoomLevel <= 4) {
    // 极小缩放：只显示小点
    size = 8
    opacity = 0.8
    showIcon = false
    fontSize = 0
  } else if (zoomLevel <= 6) {
    // 小缩放：显示小标记
    size = isActive ? 18 : 14
    opacity = isActive ? 1 : 0.9
    showIcon = false
    fontSize = 8
  } else {
    // 正常缩放：显示完整标记
    size = isActive ? 32 : 28
    opacity = isActive ? 1 : 0.9
    showIcon = true
    fontSize = 12
  }
  
  return new DivIcon({
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background: linear-gradient(135deg, ${color}, ${color}dd);
        border: ${zoomLevel <= 4 ? '1px' : '3px'} solid white;
        border-radius: 50%;
        box-shadow: ${zoomLevel <= 4 ? '0 1px 3px rgba(0,0,0,0.3)' : '0 4px 12px rgba(0,0,0,0.3), 0 0 0 2px ' + color + '33'};
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
        font-size: ${fontSize}px;
        opacity: ${opacity};
        transform: ${isActive ? 'scale(1.1)' : 'scale(1)'};
        transition: all 0.3s ease;
        cursor: ${zoomLevel <= 4 ? 'default' : 'pointer'};
      ">
        ${showIcon ? (color.includes('green') ? '✓' : '📍') : ''}
      </div>
    `,
    className: 'custom-marker',
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2]
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

export default function JourneyMap({ posts }: JourneyMapProps) {
  const defaultPosition: LatLngExpression = [30.0, 110.0]
  const [showPlannedRoute, setShowPlannedRoute] = useState(true)
  const [currentZoom, setCurrentZoom] = useState(5)

  // 将计划路线转换为折线坐标
  const routeCoordinates: LatLngExpression[] = journeyConfig.plannedRoute2024.map(
    destination => destination.coordinates as LatLngExpression
  )

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
        center={defaultPosition}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full rounded-2xl"
        zoomControl={false}
      >
        {/* 地图事件监听 */}
        <MapEventHandler onZoomChange={setCurrentZoom} />
        
        {/* 使用中文地图 */}
        <TileLayer
          url="https://webrd01.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}"
          attribution='&copy; <a href="https://www.amap.com/">高德地图</a>'
        />
        
        {/* 已访问的地点标记 - 根据缩放级别显示 */}
        {shouldShowMarkers && posts.map((post) => {
          if (!post.location || post.location.length !== 2) return null

          const position: LatLngExpression = [post.location[0], post.location[1]]

          return (
            <Marker
              key={post._id}
              position={position}
              icon={createCustomIcon('#10b981', false, currentZoom)}
            >
              {shouldShowPopups && (
                <Popup className="custom-popup" closeButton={false} maxWidth={400} minWidth={300}>
                  <div className="space-y-4 p-3">
                    <div className="border-b border-border pb-3">
                      <Link 
                        href={post.slug} 
                        className="font-semibold hover:underline text-green-600 hover:text-green-700 transition-colors flex items-center gap-2 text-lg"
                      >
                        <span className="text-xl">📍</span>
                        {post.title}
                      </Link>
                    </div>
                    {post.description && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {post.description}
                      </p>
                    )}
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 4).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2 border-t border-border">
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                        已访问
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString('zh-CN')}
                      </span>
                    </div>
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
                weight: Math.max(2, Math.min(5, currentZoom - 1)), // 根据缩放级别调整线条粗细
                opacity: 0.8,
                dashArray: currentZoom <= 4 ? "20, 15" : "15, 10", // 根据缩放级别调整虚线间距
                lineCap: "round",
                lineJoin: "round"
              }}
            />

            {/* 计划目的地标记 */}
            {shouldShowMarkers && journeyConfig.plannedRoute2024.map((destination, index) => (
              <Marker
                key={`planned-${destination.name}`}
                position={destination.coordinates as LatLngExpression}
                icon={createCustomIcon('#3b82f6', false, currentZoom)}
              >
                {shouldShowPopups && (
                  <Popup className="custom-popup" closeButton={false} maxWidth={400} minWidth={300}>
                    <div className="space-y-4 p-3">
                      <div className="border-b border-border pb-3">
                        <h3 className="font-semibold text-blue-600 flex items-center gap-2 text-lg">
                          <span className="text-xl">🗺️</span>
                          {destination.name}
                        </h3>
                      </div>
                      <div className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          <span className="font-medium text-base">{destination.province}</span>
                        </p>
                        {destination.description && (
                          <p className="text-sm text-foreground leading-relaxed">{destination.description}</p>
                        )}
                        <div className="text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                          坐标: {destination.coordinates[0].toFixed(4)}, {destination.coordinates[1].toFixed(4)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-border">
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                          计划目的地
                        </Badge>
                        <span className="text-xs text-muted-foreground font-medium">
                          第 {index + 1} 站
                        </span>
                      </div>
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
          background: hsl(var(--muted) / 0.3);
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
