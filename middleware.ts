import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Skip tracking for API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  try {
    let counter = await prisma.viewCounter.findUnique({
      where: {
        path: pathname,
      },
      cacheStrategy: { ttl: 60 },
    });

    if (!counter) {
      try {
        console.log('new counter');
        await prisma.viewCounter.create({
          data: {
            path: pathname,
            views: 1,
          },
        });
      } catch (createError: any) {
        if (createError.code === 'P2002') {
          console.log('counter already exists, updating instead');
          await prisma.viewCounter.update({
            where: {
              path: pathname,
            },
            data: {
              views: {
                increment: 1,
              },
            },
          });
        } else {
          throw createError;
        }
      }
    } else {
      console.log('update counter');
      await prisma.viewCounter.update({
        where: {
          path: pathname,
        },
        data: {
          views: {
            increment: 1,
          },
        },
      });
    }
  } catch (error) {
    console.log(error);
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/:path*',
};
