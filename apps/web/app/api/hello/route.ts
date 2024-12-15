import type { NextRequest } from 'next/server'
import { getRequestContext } from '@cloudflare/next-on-pages'
import { prisma } from "@/server/index";

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  try {
    const user = await prisma.user.create({
      data: {
        name: 'John Doe',
        email: 'j9j9j@example.com'
      }
    })
    console.log(user);
    const users = await prisma.user.findMany({});
    console.log('Fetched products:', users);
    return new Response(JSON.stringify({ users }), { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch products' }),
      { status: 500 }
    );
  }
}
