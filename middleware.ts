//Middleware to count the requests

import { NextRequest, NextResponse } from 'next/server';

let userCount = 0;
export function middleware(request: NextRequest) {
  // Increment the user count
  userCount++;

  const response = NextResponse.next();
  response.headers.set('X-User-Count', userCount.toString());
  return response;
}
