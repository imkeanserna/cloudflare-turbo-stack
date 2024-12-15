import { getPrisma } from '@repo/db/schema';

export const prisma: any = getPrisma({ DATABASE_URL: process.env.DATABASE_URL! });
