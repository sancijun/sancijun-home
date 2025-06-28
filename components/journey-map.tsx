"use client"

import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import "leaflet-defaulticon-compatibility"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import { Post } from "contentlayer/generated"
import Link from "next/link"
import { LatLngExpression } from "leaflet"

interface JourneyMapProps {
  posts: Post[]
  hoveredPostId: string | null
}

export default function JourneyMap({ posts, hoveredPostId }: JourneyMapProps) {
  const defaultPosition: LatLngExpression = [34.0, 108.0] // China center

  return (
    <MapContainer
      center={defaultPosition}
      zoom={4}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {posts.map((post) => {
        if (!post.location || post.location.length !== 2) return null

        const position: LatLngExpression = [post.location[0], post.location[1]]
        const isHovered = post._id === hoveredPostId

        return (
          <Marker
            key={post._id}
            position={position}
            opacity={isHovered ? 1.0 : 0.7}
            riseOnHover
          >
            <Popup>
              <Link href={post.slug} className="font-semibold hover:underline">
                {post.title}
              </Link>
            </Popup>
          </Marker>
        )
      })}
    </MapContainer>
  )
}
