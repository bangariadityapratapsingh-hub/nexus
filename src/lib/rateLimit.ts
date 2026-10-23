import { NextRequest, NextResponse } from 'next/server';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const RATE_LIMIT_CACHE = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of RATE_LIMIT_CACHE.entries()) {
      if (now > record.resetTime) {
        RATE_LIMIT_CACHE.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitOptions {
  limit?: number; // Maximum requests allowed within window (Default: 30)
  windowMs?: number; // Time window in milliseconds (Default: 60,000 = 1 minute)
}

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  retryAfter: number;
}

/**
 * Extract client IP address safely from standard headers
 */
export function getClientIp(req: Request | NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for');
  if (forwarded) {
    const firstIp = forwarded.split(',')[0].trim();
    if (firstIp) return firstIp;
  }

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  return '127.0.0.1';
}

/**
 * In-memory sliding-window IP rate limiter
 */
export function checkRateLimit(
  req: Request | NextRequest,
  options: RateLimitOptions = {}
): RateLimitResult {
  const limit = options.limit ?? 30; // Default 30 requests per minute
  const windowMs = options.windowMs ?? 60 * 1000; // 1 minute window

  const ip = getClientIp(req);
  const now = Date.now();

  const record = RATE_LIMIT_CACHE.get(ip);

  if (!record || now > record.resetTime) {
    // New window for this IP
    RATE_LIMIT_CACHE.set(ip, {
      count: 1,
      resetTime: now + windowMs,
    });

    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: Math.ceil((now + windowMs) / 1000),
      retryAfter: 0,
    };
  }

  // Existing window
  if (record.count >= limit) {
    const retryAfter = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return {
      success: false,
      limit,
      remaining: 0,
      reset: Math.ceil(record.resetTime / 1000),
      retryAfter,
    };
  }

  record.count += 1;
  RATE_LIMIT_CACHE.set(ip, record);

  return {
    success: true,
    limit,
    remaining: Math.max(0, limit - record.count),
    reset: Math.ceil(record.resetTime / 1000),
    retryAfter: 0,
  };
}

/**
 * Helper to generate standardized 429 Too Many Requests response
 */
export function createRateLimitExceededResponse(result: RateLimitResult): NextResponse {
  return NextResponse.json(
    {
      error: 'Too Many Requests',
      message: `Rate limit of ${result.limit} requests per minute exceeded. Please try again in ${result.retryAfter} seconds.`,
      retryAfter: result.retryAfter,
    },
    {
      status: 429,
      headers: {
        'Retry-After': String(result.retryAfter),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': '0',
        'X-RateLimit-Reset': String(result.reset),
      },
    }
  );
}
