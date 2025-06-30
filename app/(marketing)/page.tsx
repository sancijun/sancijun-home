import Link from "next/link"
import { allPosts, allProjects } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import Image from "next/image"

import { siteConfig } from "@/config/site"
import { cn, formatDate } from "@/lib/utils"
import { generateGraphData } from "@/lib/graph"
import { buttonVariants } from "@/components/ui/button"
import KnowledgeGraph from "@/components/knowledge-graph"

export default async function IndexPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 8)

  // Data for Knowledge Graph - only use 'explore' posts
  const explorePosts = allPosts
    .filter((post) => post.published && post.slug.startsWith("/explore"))
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))

  const graphData = generateGraphData(explorePosts)
  const latestPost = explorePosts.length > 0 ? explorePosts[0] : null

  const projects = allProjects
    .filter((project) => project.published && project.featured)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 2)

  const journeyPost = allPosts
    .filter((post) => post.published && post.category === "环华日志")
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 1)[0]

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
            三此君
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            一位驾车穿越中国的AI专家、独立开发者与数字游民。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/explore"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              探索 · 文章
            </Link>
            <Link
              href="/create"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              创造 · 项目
            </Link>
            <Link
              href="/journey"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              在路上 · 日志
            </Link>
          </div>
        </div>
      </section>

      <section id="explore-network" className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            探索 · 网络
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            从 AI 浪潮到环华之旅，我所有的思考、洞察与实验都汇聚于此。点击图谱探索思想的连接，或从右侧查阅我的最新足迹。
          </p>
        </div>

        <div className="relative mx-auto h-[600px] w-full max-w-6xl overflow-hidden rounded-lg border">
          <KnowledgeGraph
            graphData={graphData}
            latestPostId={latestPost?.slugAsParams}
          />
        </div>
      </section>

      <section id="featured-projects" className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            精选创造
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            我构建和创造过的所有项目。
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-2">
          {projects.map((project) => (
            <div key={project._id} className="group">
              <Link href={project.url} target="_blank" rel="noopener noreferrer">
                <article className="relative flex flex-col space-y-2">
                  <div className="relative h-60 w-full overflow-hidden rounded-md border bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain p-4 transition-transform duration-300 ease-in-out group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <h2 className="text-2xl font-extrabold">{project.title}</h2>
                  <p className="text-muted-foreground">{project.description}</p>
                </article>
              </Link>
              {project.docs && (
                <Link
                  href={project.docs}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-4"
                  )}
                >
                  查看文档
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>

      {journeyPost && (
        <section id="journey-snippet" className="container space-y-6 py-8 md:py-12 lg:py-24">
          <div className="relative overflow-hidden rounded-lg bg-background shadow-lg">
            <Image
              src={journeyPost.image}
              alt={journeyPost.title}
              layout="fill"
              objectFit="cover"
              className="opacity-20"
            />
            <div className="relative p-12 text-center text-white">
              <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
                一次正在进行的环华之旅
              </h2>
              <p className="mx-auto my-4 max-w-[85%] leading-normal sm:text-lg sm:leading-7">
                {journeyPost.title}
              </p>
              <Link
                href="/journey"
                className={cn(buttonVariants({ size: "lg" }))}
              >
                查看"在路上"的故事
              </Link>
            </div>
          </div>
        </section>
      )}

      <section id="newsletter" className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            订阅我的数字花园
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            获取关于AI、独立开发和数字游民生活的独家见解、最新文章和项目更新。
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <input
              type="email"
              placeholder="输入您的邮箱"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <button
              type="submit"
              className={cn(buttonVariants())}
            >
              订阅
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
