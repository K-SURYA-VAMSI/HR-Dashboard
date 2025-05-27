import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const pathname = request.nextUrl.pathname;
  const isLoginPage = pathname === '/login';

  // Get the auth token from the cookie
  const authToken = request.cookies.get('auth-token');

  if (!authToken && !isLoginPage) {
    // Redirect to login if no auth token and not on login page
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (authToken && isLoginPage) {
    // Redirect to home if has auth token and on login page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)?'],
}; 