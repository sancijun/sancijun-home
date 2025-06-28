import Image from "next/image"
import Link from "next/link"
import { allProjects } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

import { siteConfig } from "@/config/site"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "创造 - " + siteConfig.name,
  description: "我创造过的产品和项目。",
}

export default async function CreatePage() {
  const projects = allProjects
    .filter((project) => project.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          创造
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          这里是我构建和创造过的所有项目。
        </p>
      </div>
      <hr className="my-8" />
      {projects?.length ? (
        <div className="grid gap-10 sm:grid-cols-2">
          {projects.map((project, index) => (
            <div key={project._id} className="group">
              <Link href={project.slug}>
                <article className="relative flex flex-col space-y-2">
                  {project.image && (
                    <div className="relative h-60 w-full overflow-hidden rounded-md border bg-muted">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-contain p-4 transition-transform duration-300 ease-in-out group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <h2 className="text-2xl font-extrabold">{project.title}</h2>
                  {project.description && (
                    <p className="text-muted-foreground">{project.description}</p>
                  )}
                </article>
              </Link>
              <div className="mt-4 flex gap-4">
                {project.docs && (
                  <Link
                    href={project.docs}
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    查看文档
                  </Link>
                )}
                 <Link
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                  >
                    访问官网
                  </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>还没有项目发布。</p>
      )}
    </section>
  )
} 