import { siteConfig } from "@/config/site"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "关于 - " + siteConfig.name,
  description: "关于三此君以及这个网站的一切。",
}

export default async function AboutPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
          关于我
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          你好，我是三此君。
        </p>
        <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          欢迎来到我的数字花园。
        </p>
      </div>
    </section>
  )
} 