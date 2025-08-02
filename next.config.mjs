import { withContentlayer } from "next-contentlayer"
import { setupDevPlatform } from '@cloudflare/next-on-pages/next-dev'

import "./env.mjs"

// Here we use the @cloudflare/next-on-pages next-dev module to allow us to use bindings during local development
// (when running the application with `next dev`), for more information see:
// https://github.com/cloudflare/next-on-pages/blob/5712c57ea7/internal-packages/next-dev/README.md
if (process.env.NODE_ENV === 'development') {
  await setupDevPlatform()
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "sancijun.feishu.cn",
      "sns-na-i11.xhscdn.com",
      "i0.hdslb.com",
      "i1.hdslb.com",
      "i2.hdslb.com",
      "cdn.jsdelivr.net",
      "sns-webpic-qc.xhscdn.com",
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "@prisma/adapter-d1", "ky"],
  },
}

export default withContentlayer(nextConfig)
