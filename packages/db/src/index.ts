import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'

interface PrismaEnv {
  DATABASE_URL: string
}

const prismaClientSingleton = (env: PrismaEnv) => {
  if (!env.DATABASE_URL) {
    throw new Error('DATABASE_URL must be provided for Prisma client')
  }

  const client = new PrismaClient({
    datasourceUrl: env.DATABASE_URL
  }).$extends(withAccelerate())

  // Use unknown as an intermediate type
  return client as unknown as PrismaClient
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export function getPrisma(env: PrismaEnv): PrismaClient {
  const prismaInstance =
    globalForPrisma.prisma ?? prismaClientSingleton(env)

  // In non-production-like environments, cache the client
  if (typeof globalThis !== 'undefined') {
    globalForPrisma.prisma = prismaInstance
  }

  return prismaInstance
}
