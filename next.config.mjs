import { withContentlayer } from "next-contentlayer"

import "./env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "sancijun.feishu.cn",
      "sns-webpic-qc.xhscdn.com",
      "i0.hdslb.com",
      "i1.hdslb.com",
      "i2.hdslb.com",
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "@prisma/adapter-d1", "ky"],
  },
}

export default withContentlayer(nextConfig)
