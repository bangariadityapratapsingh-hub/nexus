import { NextRequest, NextResponse } from 'next/server';
import {
  checkBruteForceStatus,
  recordFailedLogin,
  resetFailedLogins,
  verifyAdminServerPassword,
  createAdminSessionToken,
  verifyAdminSessionToken,
  ADMIN_COOKIE_NAME,
} from '@/lib/adminAuth';
import { checkRateLimit, createRateLimitExceededResponse, getClientIp } from '@/lib/rateLimit';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin-auth
 * Checks whether the current request contains a valid, cryptographically verified admin session.
 */
export async function GET(req: NextRequest) {
  // Apply standard rate limiter (max 60/min)
  const rateLimitResult = checkRateLimit(req, { limit: 60, windowMs: 60 * 1000 });
  if (!rateLimitResult.success) {
    return createRateLimitExceededResponse(rateLimitResult);
  }

  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const verification = await verifyAdminSessionToken(token);

  if (verification.valid) {
    return NextResponse.json({
      authenticated: true,
      user: verification.user || 'admin',
    });
  }

  return NextResponse.json({
    authenticated: false,
    error: verification.error || 'Not authenticated',
  });
}

/**
 * POST /api/admin-auth
 * Handles administrator login with server-only password verification & IP brute force lockout.
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req);

  // 1. Check Rate Limiter (Max 15 requests per minute for login endpoint)
  const rateLimitResult = checkRateLimit(req, { limit: 15, windowMs: 60 * 1000 });
  if (!rateLimitResult.success) {
    return createRateLimitExceededResponse(rateLimitResult);
  }

  // 2. Check Brute-Force IP Lockout (Locks for 15 mins after 5 failed attempts)
  const bruteForceStatus = checkBruteForceStatus(ip);
  if (bruteForceStatus.isBlocked) {
    return NextResponse.json(
      {
        error: 'Too many failed login attempts.',
        message: `Your IP has been locked for 15 minutes due to consecutive failed attempts. Retry in ${bruteForceStatus.retryAfterSeconds} seconds.`,
        retryAfter: bruteForceStatus.retryAfterSeconds,
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(bruteForceStatus.retryAfterSeconds),
        },
      }
    );
  }

  try {
    const body = await req.json().catch(() => ({}));
    const { password, username = 'admin' } = body;

    if (!password || typeof password !== 'string') {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      );
    }

    // 3. Verify Master Password against Server-Only Environment Variable
    const isValid = verifyAdminServerPassword(password);

    if (!isValid) {
      // Record failed attempt
      const failureResult = recordFailedLogin(ip);

      if (failureResult.isBlocked) {
        return NextResponse.json(
          {
            error: 'Access Denied: Account Locked',
            message: `5 consecutive failed attempts detected. Your IP is blocked for 15 minutes.`,
            retryAfter: failureResult.retryAfterSeconds,
            attemptsLeft: 0,
          },
          {
            status: 429,
            headers: {
              'Retry-After': String(failureResult.retryAfterSeconds),
            },
          }
        );
      }

      return NextResponse.json(
        {
          error: 'Invalid administrator credentials.',
          message: `Incorrect password. ${failureResult.attemptsLeft} attempt(s) remaining before a 15-minute IP lockout.`,
          attemptsLeft: failureResult.attemptsLeft,
        },
        { status: 401 }
      );
    }

    // 4. Successful Authentication: Reset IP failures & Issue Cryptographic Cookie
    resetFailedLogins(ip);

    const safeUsername = typeof username === 'string' && username.trim() ? username.trim() : 'admin';
    const signedSessionToken = await createAdminSessionToken(safeUsername);

    const response = NextResponse.json({
      success: true,
      message: 'Admin authentication successful.',
      user: safeUsername,
    });

    // Set signed HttpOnly, Secure, SameSite=Strict cookie
    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: signedSessionToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/admin-auth
 * Signs out admin by expiring the HttpOnly session cookie.
 */
export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Admin session terminated successfully.',
  });

  // Clear cookie
  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
    expires: new Date(0),
  });

  return response;
}
