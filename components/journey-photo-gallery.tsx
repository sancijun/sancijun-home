"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, MapPin, Calendar } from "lucide-react"

// Photo interface
export interface JourneyPhoto {
  id: string
  src: string
  alt: string
  location?: string
  date?: string
  width: number
  height: number
}

interface JourneyPhotoGalleryProps {
  photos: JourneyPhoto[]
  className?: string
}

export function JourneyPhotoGallery({ photos, className }: JourneyPhotoGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = React.useState<JourneyPhoto | null>(null)
  const [photoIndex, setPhotoIndex] = React.useState<number>(0)

  // When a photo is selected, find its index
  React.useEffect(() => {
    if (selectedPhoto) {
      const index = photos.findIndex(photo => photo.id === selectedPhoto.id)
      if (index !== -1) {
        setPhotoIndex(index)
      }
    }
  }, [selectedPhoto, photos])

  // Navigation handlers
  const handlePrevious = () => {
    const newIndex = (photoIndex - 1 + photos.length) % photos.length
    setSelectedPhoto(photos[newIndex])
  }

  const handleNext = () => {
    const newIndex = (photoIndex + 1) % photos.length
    setSelectedPhoto(photos[newIndex])
  }

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedPhoto) return
      
      if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'Escape') {
        setSelectedPhoto(null)
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedPhoto, photoIndex, photos])

  return (
    <div className={cn("w-full", className)}>
      {/* Masonry grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo, index) => {
          // Calculate aspect ratio to determine grid span
          const aspectRatio = photo.width / photo.height
          
          // 根据宽高比计算容器的宽高比样式
          const aspectRatioStyle = { paddingBottom: `${(photo.height / photo.width) * 100}%` };
          
          return (
            <div 
              key={photo.id}
              className={cn(
                "cursor-pointer overflow-hidden rounded-md border bg-card hover:shadow-lg transition-all duration-300",
                aspectRatio > 1.5 && "col-span-2", // 宽图横跨两列
                aspectRatio < 0.8 && "row-span-2", // 高图横跨两行
                (index === 0 || index % 12 === 0) && "col-span-2 row-span-2" // 特色图片
              )}
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* 使用 padding-bottom 技巧保持宽高比 */}
              <div className="relative w-full" style={aspectRatioStyle}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 4}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div className="text-white text-sm font-medium w-full">
                    <p className="line-clamp-2">{photo.alt}</p>
                    {photo.location && (
                      <p className="text-xs text-white/80 mt-1">{photo.location}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Lightbox dialog */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
          <DialogContent className="max-w-screen-lg w-[95vw] h-[90vh] p-0">
            <div className="relative w-full h-full flex items-center justify-center bg-black/95">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="95vw"
                  priority
                  quality={90}
                />
              </div>
              
              {/* Close button */}
              <DialogClose className="absolute right-4 top-4 text-white z-50">
                <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm">
                  <X className="h-5 w-5" />
                </Button>
              </DialogClose>
              
              {/* Navigation buttons */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-7 w-7 text-white" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm"
                onClick={handleNext}
              >
                <ChevronRight className="h-7 w-7 text-white" />
              </Button>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/70 to-transparent">
                <p className="text-white text-xl font-medium max-w-3xl mx-auto">{selectedPhoto.alt}</p>
                <div className="flex items-center justify-between mt-2 max-w-3xl mx-auto">
                  <div className="flex items-center gap-2">
                    {selectedPhoto.location && (
                      <span className="flex items-center gap-1 text-white/80 text-sm">
                        <MapPin className="h-4 w-4" />
                        {selectedPhoto.location}
                      </span>
                    )}
                  </div>
                  {selectedPhoto.date && (
                    <span className="flex items-center gap-1 text-white/80 text-sm">
                      <Calendar className="h-4 w-4" />
                      {selectedPhoto.date}
                    </span>
                  )}
                </div>
                
                {/* 照片计数器 */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
                  {photoIndex + 1} / {photos.length}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 