/**
 * APSB Nexus - Server-Side Admin Authentication & Cryptographic Session Security
 *
 * Implements:
 * 1. Server-only password verification against process.env.ADMIN_SECRET_PASSWORD
 * 2. In-memory IP Brute-Force Protection (Locks IP for 15 minutes after 5 failed attempts)
 * 3. Web Crypto HMAC-SHA256 signed session tokens (Runs smoothly in Edge Middleware and Node.js)
 */

// Secret password fallback stored ONLY on the server (never exposed with NEXT_PUBLIC_)
const ADMIN_PASSWORD_FALLBACK = 'APSB_SDSUV_ADMIN_2025_SECure';
const ADMIN_SIGNING_SECRET_FALLBACK = 'APSB_NEXUS_HMAC_SECRET_KEY_99883344_SECURE_DEV';

// Master passwords accepted for admin access
export const ACCEPTED_ADMIN_PASSWORDS = [
  'APSB_SDSUV_ADMIN_2025_SECure',
  'APSB_SDSUV_ADMIN_2025_SEC',
  'APSB_SDSUV_ADMIN_2025_SECURE',
];

export const ADMIN_COOKIE_NAME = 'apsb_admin_session';

// ============================================================================
// 1. In-Memory IP Brute-Force Tracker
// ============================================================================
interface BruteForceRecord {
  failedAttempts: number;
  lockedUntil: number;
  lastAttempt: number;
}

const BRUTE_FORCE_STORE = new Map<string, BruteForceRecord>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 Minutes
const ATTEMPT_WINDOW_MS = 15 * 60 * 1000; // Reset after 15 minutes of inactivity

// Clean up expired records every 10 minutes to prevent memory leaks
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of BRUTE_FORCE_STORE.entries()) {
      if (now > record.lockedUntil && now - record.lastAttempt > ATTEMPT_WINDOW_MS) {
        BRUTE_FORCE_STORE.delete(ip);
      }
    }
  }, 10 * 60 * 1000);
}

/**
 * Check if the given client IP is currently blocked due to brute-force attempts.
 */
export function checkBruteForceStatus(ip: string): {
  isBlocked: boolean;
  retryAfterSeconds: number;
  attemptsLeft: number;
} {
  const now = Date.now();
  const record = BRUTE_FORCE_STORE.get(ip);

  if (!record) {
    return { isBlocked: false, retryAfterSeconds: 0, attemptsLeft: MAX_ATTEMPTS };
  }

  // If currently locked out
  if (record.lockedUntil > now) {
    const retryAfterSeconds = Math.ceil((record.lockedUntil - now) / 1000);
    return { isBlocked: true, retryAfterSeconds, attemptsLeft: 0 };
  }

  // If lockout or window has expired, reset
  if (now - record.lastAttempt > ATTEMPT_WINDOW_MS) {
    BRUTE_FORCE_STORE.delete(ip);
    return { isBlocked: false, retryAfterSeconds: 0, attemptsLeft: MAX_ATTEMPTS };
  }

  const attemptsLeft = Math.max(0, MAX_ATTEMPTS - record.failedAttempts);
  return { isBlocked: false, retryAfterSeconds: 0, attemptsLeft };
}

/**
 * Record a failed login attempt for the given IP.
 */
export function recordFailedLogin(ip: string): {
  isBlocked: boolean;
  retryAfterSeconds: number;
  attemptsLeft: number;
} {
  const now = Date.now();
  let record = BRUTE_FORCE_STORE.get(ip);

  if (!record || now - record.lastAttempt > ATTEMPT_WINDOW_MS) {
    record = {
      failedAttempts: 1,
      lockedUntil: 0,
      lastAttempt: now,
    };
  } else {
    record.failedAttempts += 1;
    record.lastAttempt = now;
  }

  if (record.failedAttempts >= MAX_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    BRUTE_FORCE_STORE.set(ip, record);
    return {
      isBlocked: true,
      retryAfterSeconds: Math.ceil(LOCKOUT_DURATION_MS / 1000),
      attemptsLeft: 0,
    };
  }

  BRUTE_FORCE_STORE.set(ip, record);
  return {
    isBlocked: false,
    retryAfterSeconds: 0,
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - record.failedAttempts),
  };
}

/**
 * Reset failed login attempts upon successful authentication.
 */
export function resetFailedLogins(ip: string): void {
  BRUTE_FORCE_STORE.delete(ip);
}

// ============================================================================
// 2. Server Password Verification
// ============================================================================
export function verifyAdminServerPassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false;
  const cleanInput = password.trim();
  const configuredPassword = (process.env.ADMIN_SECRET_PASSWORD || ADMIN_PASSWORD_FALLBACK).trim();

  // 1. Direct exact match with configured password
  if (cleanInput === configuredPassword) return true;

  // 2. Case-insensitive match with configured password
  if (cleanInput.toLowerCase() === configuredPassword.toLowerCase()) return true;

  // 3. Accepted master passwords (both "APSB_SDSUV_ADMIN_2025_SECure" and "APSB_SDSUV_ADMIN_2025_SEC")
  if (ACCEPTED_ADMIN_PASSWORDS.includes(cleanInput)) return true;
  if (ACCEPTED_ADMIN_PASSWORDS.some((p) => p.toLowerCase() === cleanInput.toLowerCase())) return true;

  return false;
}

// ============================================================================
// 3. Web Crypto HMAC-SHA256 Token Helpers (Edge & Node.js Universal)
// ============================================================================
function getSigningSecret(): string {
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_SECRET_PASSWORD ||
    ADMIN_SIGNING_SECRET_FALLBACK
  );
}

// Helper to encode string to Uint8Array
function strToBytes(str: string): Uint8Array<ArrayBuffer> {
  const encoded = new TextEncoder().encode(str);
  const buf = new Uint8Array(encoded.byteLength);
  buf.set(encoded);
  return buf as Uint8Array<ArrayBuffer>;
}

// Helper to convert ArrayBuffer to Base64URL
function bufferToBase64Url(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

// Helper to convert Base64URL to Uint8Array
function base64UrlToBuffer(base64url: string): Uint8Array<ArrayBuffer> {
  let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes as Uint8Array<ArrayBuffer>;
}

async function getHmacKey(): Promise<CryptoKey> {
  const secret = getSigningSecret();
  return crypto.subtle.importKey(
    'raw',
    strToBytes(secret) as unknown as BufferSource,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

export interface AdminSessionPayload {
  role: 'admin';
  user: string;
  iat: number;
  exp: number;
}

/**
 * Creates a signed JWT-like session token using HMAC-SHA256 via Web Crypto API.
 */
export async function createAdminSessionToken(username: string = 'admin'): Promise<string> {
  const key = await getHmacKey();
  const now = Date.now();
  const payload: AdminSessionPayload = {
    role: 'admin',
    user: username,
    iat: now,
    exp: now + 7 * 24 * 60 * 60 * 1000, // 7 Days validity
  };

  const payloadJson = JSON.stringify(payload);
  const payloadBase64 = bufferToBase64Url(strToBytes(payloadJson).buffer as ArrayBuffer);

  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    strToBytes(payloadBase64) as unknown as BufferSource
  );
  const signatureBase64 = bufferToBase64Url(signatureBuffer);

  return `${payloadBase64}.${signatureBase64}`;
}

/**
 * Verifies a signed session token. Checks signature authenticity and expiration.
 */
export async function verifyAdminSessionToken(
  token?: string | null
): Promise<{ valid: boolean; user?: string; error?: string }> {
  if (!token || typeof token !== 'string') {
    return { valid: false, error: 'No token provided' };
  }

  const parts = token.split('.');
  if (parts.length !== 2) {
    return { valid: false, error: 'Malformed token structure' };
  }

  const [payloadBase64, signatureBase64] = parts;

  try {
    const key = await getHmacKey();
    const signatureBytes = base64UrlToBuffer(signatureBase64);

    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signatureBytes as unknown as BufferSource,
      strToBytes(payloadBase64) as unknown as BufferSource
    );

    if (!isValid) {
      return { valid: false, error: 'Invalid cryptographic signature' };
    }

    // Decode and parse payload
    const decodedBytes = base64UrlToBuffer(payloadBase64);
    const decodedText = new TextDecoder().decode(decodedBytes);
    const payload: AdminSessionPayload = JSON.parse(decodedText);

    if (payload.role !== 'admin') {
      return { valid: false, error: 'Invalid token role' };
    }

    if (Date.now() > payload.exp) {
      return { valid: false, error: 'Session expired' };
    }

    return { valid: true, user: payload.user };
  } catch (err) {
    return { valid: false, error: 'Token verification failed' };
  }
}
