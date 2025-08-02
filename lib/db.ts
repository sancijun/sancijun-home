import { PrismaClient } from "@prisma/client"
import { PrismaD1 } from "@prisma/adapter-d1"

declare global {
  // eslint-disable-next-line no-var
  var cachedPrisma: PrismaClient
}

let prisma: PrismaClient

// Check if we're running in Cloudflare Workers environment
const isCloudflare = typeof globalThis.cloudflare !== 'undefined' || 
                     typeof process.env.CF_PAGES !== 'undefined' ||
                     (process.env.NODE_ENV === "production" && process.env.DB)

if (isCloudflare && process.env.DB) {
  // Use Cloudflare D1 adapter for production on Cloudflare
  const adapter = new PrismaD1(process.env.DB as any)
  prisma = new PrismaClient({ adapter })
} else {
  // Use SQLite for local development
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient()
  }
  prisma = global.cachedPrisma
}

export const db = prisma
