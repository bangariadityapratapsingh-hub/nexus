import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminSessionToken, ADMIN_COOKIE_NAME } from '@/lib/adminAuth';

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

export async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;

  // 1. Allow access to /admin/login freely (with automatic redirect to /admin if already logged in)
  if (pathname === '/admin/login') {
    const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
    if (token) {
      const verification = await verifyAdminSessionToken(token);
      if (verification.valid) {
        const destination = req.nextUrl.searchParams.get('redirect') || '/admin';
        return NextResponse.redirect(new URL(destination, req.url));
      }
    }
    return NextResponse.next();
  }

  // 2. Intercept all other /admin routes & /api/admin/* endpoints
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const verification = await verifyAdminSessionToken(token);

  if (!verification.valid) {
    // If it's an API route under /api/admin/*, return 401 Unauthorized
    if (pathname.startsWith('/api/admin')) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Valid administrator session cookie required.',
        },
        { status: 401 }
      );
    }

    // For web page routes under /admin, redirect immediately before any page HTML or JS bundle is sent
    const loginUrl = new URL('/admin/login', req.url);
    loginUrl.searchParams.set('redirect', `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  // Admin authenticated successfully - proceed
  return NextResponse.next();
}
