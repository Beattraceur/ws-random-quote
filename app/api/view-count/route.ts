// API route that returns the number of views for a given path using Prisma
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client/edge';

// Instantiate Prisma Client
const prisma = new PrismaClient();

export async function GET(request: Request) {
  // Pick the path from the request URL
  const { searchParams } = new URL(request.url);
  const path = searchParams.get('path');

  // Respond with an error if the path is missing
  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }

  // Fetch with Prisma using a try-catch block
  try {
    const counter = await prisma.viewCounter.findUnique({
      where: { path },
    });

    // Respond with an error if the path is not found
    if (!counter) {
      return NextResponse.json({ error: 'Path not found' }, { status: 404 });
    }

    // Respond with a JSON object with the number of views if successful
    return NextResponse.json({ views: counter.views }, { status: 200 });
  } catch (error) {
    console.error(error);
    // Respond with an error if a problem occurs
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
