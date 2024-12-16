import { getPrisma } from '@repo/db/schema';
import { PrismaClient } from '@prisma/client/edge'

export const prisma: PrismaClient = getPrisma({ DATABASE_URL: process.env.DATABASE_URL! });
