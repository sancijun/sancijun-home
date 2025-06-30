import { notFound } from "next/navigation"
import { allPosts } from "contentlayer/generated"
import { type Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

import "@/styles/mdx.css"
import { env } from "@/env.mjs"
import { absoluteUrl, cn, formatDate } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "@/components/icons"
import { DocsPager } from "@/components/pager"
import { Mdx } from "@/components/mdx-components"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface PostPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params) {
  const slug = params?.slug?.join("/")
  const post = allPosts.find((post) => post.slugAsParams === slug)

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export async function generateStaticParams(): Promise<PostPageProps["params"][]> {
  return allPosts.map((post) => ({
    slug: post.slugAsParams.split("/"),
  }))
}

export default async function PostPage({ params }: PostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/explore"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        查看所有文章
      </Link>
      <div>
        {post.date && (
          <time
            dateTime={post.date}
            className="block text-sm text-muted-foreground"
          >
            发布于 {formatDate(post.date)}
          </time>
        )}
        <h1 className="mt-2 inline-block font-heading text-4xl leading-tight lg:text-5xl">
          {post.title}
        </h1>
        {post.category && (
          <p className="mt-2 text-md text-muted-foreground">{post.category}</p>
        )}
      </div>

      {post.format === "slides" && post.images && post.images.length > 0 ? (
        <div className="my-8">
          <Carousel className="w-full">
            <CarouselContent>
              {post.images.map((imageUrl, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
                    <Image
                      src={imageUrl}
                      alt={`${post.title} - 幻灯片 ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 75vw"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {post.images.length} 张幻灯片 • 使用左右箭头或滑动浏览
            </p>
          </div>
        </div>
      ) : post.format === "video" && post.videoUrl ? (
        <div className="my-8">
          <Link
            href={post.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 75vw"
                priority
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <Icons.playCircle className="h-20 w-20 text-white/80" />
              </div>
            </div>
          </Link>
          <div className="mt-6 flex justify-center">
            <Link
              href={post.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              <Icons.play className="mr-2 h-5 w-5" />
              在源平台观看
            </Link>
          </div>
        </div>
      ) : (
        post.image && (
          <Image
            src={post.image}
            alt={post.title}
            width={720}
            height={405}
            className="my-8 rounded-md border bg-muted transition-colors"
            priority
          />
        )
      )}
      <div className="prose prose-stone dark:prose-invert mx-auto mt-8 w-full">
        <Mdx code={post.body.code} />
      </div>
      <hr className="mt-12" />
      <DocsPager doc={post} />
    </article>
  )
}
