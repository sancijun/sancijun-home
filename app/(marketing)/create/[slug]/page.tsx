import { notFound, redirect } from "next/navigation"
import { allProjects } from "contentlayer/generated"
import { Metadata } from "next"

import { Mdx } from "@/components/mdx-components"
import { siteConfig } from "@/config/site"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ProjectPageProps {
  params: {
    slug: string
  }
}

async function getProjectFromParams(params) {
  const project = allProjects.find((p) => p.slugAsParams === params.slug)
  if (!project) {
    return null
  }
  return project
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectFromParams(params)

  if (!project) {
    return {}
  }

  return {
    title: project.title + " - " + siteConfig.name,
    description: project.description,
  }
}

export async function generateStaticParams(): Promise<ProjectPageProps["params"][]> {
  return allProjects.map((project) => ({
    slug: project.slugAsParams,
  }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  // 对微信读书工具箱进行重定向
  if (params.slug === "weread-toolbox") {
    redirect("/create/weread-toolbox")
  }
  
  const project = await getProjectFromParams(params)

  if (!project) {
    notFound()
  }

  return (
    <article className="container max-w-3xl py-6 lg:py-10">
      <div className="space-y-4">
        <h1 className="inline-block font-heading text-4xl lg:text-5xl">
          {project.title}
        </h1>
        {project.description && (
          <p className="text-xl text-muted-foreground">
            {project.description}
          </p>
        )}
      </div>

      <hr className="my-8" />

      <Mdx code={project.body.code} />

      <div className="mt-12 flex justify-center gap-4">
        <Link
          href="/create"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          返回所有项目
        </Link>
        {project.url && (
            <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants())}
            >
                访问官网
            </Link>
        )}
      </div>
    </article>
  )
} 