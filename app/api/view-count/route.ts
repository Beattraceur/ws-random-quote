// app/api/view-count/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

const prisma = new PrismaClient().$extends(withAccelerate());

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  try {
    const counter = await prisma.viewCounter.findUnique({
      where: { path },
    });

    if (!counter) {
      return NextResponse.json({ error: 'Path not found' }, { status: 404 });
    }

    return NextResponse.json({ views: counter.views }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
