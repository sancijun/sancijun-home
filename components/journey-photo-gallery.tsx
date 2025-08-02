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
      <div className="grid grid-cols-3 gap-1 sm:grid-cols-4 md:grid-cols-6 md:gap-2 lg:grid-cols-9">
        {photos.map((photo, index) => {
          const { paddingBottom } = getPhotoStyle(index);
          
          return (
            <div 
              key={photo.id}
              className="cursor-pointer overflow-hidden rounded-md border bg-card transition-all duration-300 hover:shadow-lg"
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
                <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent/20 p-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <div className="w-full text-xs font-medium text-white">
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
          <DialogContent className="h-[90vh] w-[95vw] max-w-screen-lg p-0">
            <div className="relative flex size-full items-center justify-center bg-black/95">
              <div className="relative flex size-full items-center justify-center">
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
              <DialogClose className="absolute right-4 top-4 z-50 text-white">
                <Button variant="ghost" size="icon" className="size-10 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70">
                  <X className="size-5" />
                </Button>
              </DialogClose>
              
              {/* Navigation buttons */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-4 top-1/2 size-12 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60"
                onClick={handlePrevious}
              >
                <ChevronLeft className="size-7 text-white" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-4 top-1/2 size-12 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-sm hover:bg-black/60"
                onClick={handleNext}
              >
                <ChevronRight className="size-7 text-white" />
              </Button>
              
              {/* Caption */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-6">
                <p className="mx-auto max-w-3xl text-xl font-medium text-white">{selectedPhoto.alt}</p>
                <div className="mx-auto mt-2 flex max-w-3xl items-center justify-between">
                  <div className="flex items-center gap-2">
                    {selectedPhoto.location && (
                      <span className="flex items-center gap-1 text-sm text-white/80">
                        <MapPin className="size-4" />
                        {selectedPhoto.location}
                      </span>
                    )}
                  </div>
                  {selectedPhoto.date && (
                    <span className="flex items-center gap-1 text-sm text-white/80">
                      <Calendar className="size-4" />
                      {selectedPhoto.date}
                    </span>
                  )}
                </div>
                
                {/* 照片计数器 */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/70">
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