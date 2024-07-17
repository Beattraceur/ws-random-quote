//Middleware to track page views and store them in the database
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
//Use Prisma Client with the Accelerate extension to werk in middleware on headless servers like Vercel
const prisma = new PrismaClient().$extends(withAccelerate());

export default async function middleware(req: NextRequest) {
  //Get the pathname from the NextRequest
  const { pathname } = req.nextUrl;

  //Skip tracking for API routes and static files
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }
  //Try to update the view counter in the database
  try {
    //Get the view counter from the database
    let counter = await prisma.viewCounter.findUnique({
      where: {
        path: pathname,
      },
      cacheStrategy: { ttl: 60 },
    });
    //If the counter is not found, create a new one
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
        //If the counter already exists, update it
        if (createError.code === 'P2002') {
          console.log('counter already exists, updating instead');
          await prisma.viewCounter.update({
            where: {
              path: pathname,
            },
            data: {
              views: {
                //Increment the number of views
                increment: 1,
              },
            },
          });
        } else {
          throw createError;
        }
      }
    } else {
      //If the counter is found, update it
      console.log('update counter');
      await prisma.viewCounter.update({
        where: {
          path: pathname,
        },
        data: {
          views: {
            //Increment the number of views
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
//Configure the middleware to match all paths
export const config = {
  matcher: '/:path*',
};
