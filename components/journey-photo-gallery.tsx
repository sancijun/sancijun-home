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
import { ChevronLeft, ChevronRight, X } from "lucide-react"

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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px]">
        {photos.map((photo, index) => {
          // Calculate aspect ratio to determine grid span
          const aspectRatio = photo.width / photo.height
          let spanClass = ""
          
          // Decide spanning based on aspect ratio
          if (aspectRatio > 1.5) spanClass = "col-span-2" // Wide images
          if (photo.height > photo.width * 1.3) spanClass = "row-span-2" // Tall images
          if (aspectRatio > 1.5 && index % 5 === 0) spanClass = "col-span-2 row-span-2" // Featured images
          
          return (
            <Card 
              key={photo.id} 
              className={cn(
                "group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer",
                spanClass
              )}
              onClick={() => setSelectedPhoto(photo)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={spanClass.includes("col-span-2") 
                    ? "(max-width: 768px) 100vw, 50vw" 
                    : "(max-width: 768px) 50vw, 25vw"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <div className="text-white text-sm font-medium truncate w-full">
                    {photo.alt}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Lightbox dialog */}
      {selectedPhoto && (
        <Dialog open={!!selectedPhoto} onOpenChange={(open) => !open && setSelectedPhoto(null)}>
          <DialogContent className="max-w-screen-lg w-[90vw] h-[85vh] p-0">
            <div className="relative w-full h-full flex items-center justify-center bg-black/95">
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
              
              {/* Close button */}
              <DialogClose className="absolute right-3 top-3 text-white">
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-black/50 hover:bg-black/70">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
              
              {/* Navigation buttons */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 hover:bg-black/70"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </Button>
              
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                <p className="text-white text-lg font-medium">{selectedPhoto.alt}</p>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-white/70 text-sm">{selectedPhoto.location}</p>
                  <p className="text-white/70 text-sm">{selectedPhoto.date}</p>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
} 