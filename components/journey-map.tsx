"use client"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"

import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet"
import { Post } from "contentlayer/generated"
import Link from "next/link"
import { LatLngExpression, Icon, DivIcon } from "leaflet"
import { journeyConfig } from "@/config/journey"
import { useState } from "react"

interface JourneyMapProps {
  posts: Post[]
  hoveredPostId: string | null
}

// 创建自定义图标
const visitedIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

const plannedIcon = new Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
})

export default function JourneyMap({ posts, hoveredPostId }: JourneyMapProps) {
  const defaultPosition: LatLngExpression = [30.0, 110.0] // 中国中心偏南
  const [showPlannedRoute, setShowPlannedRoute] = useState(true)

  // 将计划路线转换为折线坐标
  const routeCoordinates: LatLngExpression[] = journeyConfig.plannedRoute2024.map(
    destination => destination.coordinates as LatLngExpression
  )

  return (
    <div className="relative h-full w-full">
      {/* 地图控制按钮 */}
      <div className="absolute top-4 right-4 z-[1000] bg-white rounded-lg shadow-lg p-2">
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={showPlannedRoute}
            onChange={(e) => setShowPlannedRoute(e.target.checked)}
            className="rounded"
          />
          <span>显示计划路线</span>
        </label>
      </div>

      <MapContainer
        center={defaultPosition}
        zoom={5}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* 已访问的地点标记（绿色） */}
        {posts.map((post) => {
          if (!post.location || post.location.length !== 2) return null

          const position: LatLngExpression = [post.location[0], post.location[1]]
          const isHovered = post._id === hoveredPostId

          return (
            <Marker
              key={post._id}
              position={position}
              icon={visitedIcon}
              opacity={isHovered ? 1.0 : 0.8}
              riseOnHover
            >
              <Popup>
                <div className="space-y-2">
                  <Link href={post.slug} className="font-semibold hover:underline text-green-600">
                    📍 {post.title}
                  </Link>
                  <p className="text-sm text-gray-600">已访问</p>
                </div>
              </Popup>
            </Marker>
          )
        })}

        {/* 计划路线和标记 */}
        {showPlannedRoute && (
          <>
            {/* 路线折线 */}
            <Polyline
              positions={routeCoordinates}
              color={journeyConfig.routeColor}
              weight={journeyConfig.routeWeight}
              opacity={journeyConfig.routeOpacity}
              dashArray="10, 10"
            />

            {/* 计划目的地标记（蓝色） */}
            {journeyConfig.plannedRoute2024.map((destination, index) => (
              <Marker
                key={`planned-${destination.name}`}
                position={destination.coordinates as LatLngExpression}
                icon={plannedIcon}
                opacity={0.7}
              >
                <Popup>
                  <div className="space-y-2">
                    <h3 className="font-semibold text-blue-600">
                      🗺️ {destination.name}
                    </h3>
                    <p className="text-sm text-gray-600">{destination.province}</p>
                    {destination.description && (
                      <p className="text-sm">{destination.description}</p>
                    )}
                    <p className="text-xs text-blue-500">
                      计划行程 #{index + 1}
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </>
        )}
      </MapContainer>
    </div>
  )
}
