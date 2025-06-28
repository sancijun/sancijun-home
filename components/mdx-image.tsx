"use client"

import Image from "next/image"

import { cn } from "@/lib/utils"

export function MdxImage({
  className,
  alt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      className={cn("rounded-md border", className)}
      alt={alt ?? ""}
      width={720}
      height={405}
      {...props}
    />
  )
} 