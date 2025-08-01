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

  // 针对竖版图片的宽高比处理
  const getPhotoStyle = (index: number) => {
    // 使用图片ID作为随机种子，确保相同图片每次渲染比例一致
    const seed = photos[index].id.charCodeAt(0) + photos[index].id.charCodeAt(1) || 0
    const isNineToSixteen = seed % 3 === 0; // 约1/3的图片是9:16比例
    
    // 设置竖版图片的宽高比：4:3或9:16
    const aspectRatio = isNineToSixteen ? 9/16 : 4/3;
    const paddingBottom = `${(1 / aspectRatio) * 100}%`;
    
    return { paddingBottom };
  };

  return (
    <div className={cn("w-full", className)}>
      {/* 统一大小的网格，每行最多9张图片 */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-1 md:gap-2">
        {photos.map((photo, index) => {
          const { paddingBottom } = getPhotoStyle(index);
          
          return (
            <div 
              key={photo.id}
              className="cursor-pointer overflow-hidden rounded-md border bg-card hover:shadow-lg transition-all duration-300"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* 使用 padding-bottom 技巧保持宽高比 */}
              <div className="relative w-full" style={{ paddingBottom }}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 33vw, (max-width: 768px) 16vw, (max-width: 1024px) 12vw, 11vw"
                  priority={index < 9}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                  <div className="text-white text-xs font-medium w-full">
                    <p className="line-clamp-1 text-[10px]">{photo.alt}</p>
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