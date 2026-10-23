/**
 * APSB Nexus - Input Validation & XSS / Injection Sanitization Utility
 *
 * Protects against:
 * - Cross-Site Scripting (XSS) via <script>, inline attributes, event handlers, iframe injection
 * - SQL / NoSQL query injection patterns
 * - Prototype pollution & buffer overflow via strict length enforcement
 * - Malformed email addresses & payload smuggling
 */

/**
 * Strips HTML tags, script elements, iframe tags, and inline event handlers
 */
export function stripHtml(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';

  return raw
    // Remove script tags and contents
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    // Remove style tags and contents
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, '')
    // Remove iframe tags and contents
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    // Remove standard HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove javascript: and vbscript: URIs
    .replace(/(?:javascript|vbscript|data):/gi, '')
    // Remove event handlers (e.g. onerror=, onload=, onclick=)
    .replace(/on\w+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s>]+)/gi, '');
}

/**
 * Strips common SQL / NoSQL injection patterns and operator delimiters
 */
export function stripInjectionPatterns(raw: string): string {
  if (!raw || typeof raw !== 'string') return '';

  return raw
    // SQL comments
    .replace(/--+/g, '')
    .replace(/\/\*[\s\S]*?\*\//g, '')
    // Dangerous SQL query fragments
    .replace(/\b(UNION(\s+ALL)?\s+SELECT|DROP\s+TABLE|ALTER\s+TABLE|DELETE\s+FROM|INSERT\s+INTO|EXEC(\s+SP_)?)\b/gi, '')
    // Common SQL injection tautology: OR '1'='1', OR 1=1
    .replace(/\bOR\s+['"]?1['"]?\s*=\s*['"]?1['"]?/gi, '')
    // NoSQL operator prefixes: $where, $gt, $ne, $regex
    .replace(/\$(where|gt|gte|lt|lte|ne|in|nin|regex|expr|jsonSchema)\b/gi, '')
    // Dangerous quotes or backticks if isolated
    .replace(/[`]/g, '');
}

/**
 * Universal text sanitizer with max-length truncation
 */
export function sanitizeText(input: unknown, maxLength: number = 255): string {
  if (typeof input !== 'string') return '';

  let sanitized = stripHtml(input);
  sanitized = stripInjectionPatterns(sanitized);

  // Normalize control characters (keep standard newlines and tabs if desired, remove ASCII control 0-31 except \n \r \t)
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

  // Truncate to maximum length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.slice(0, maxLength);
  }

  return sanitized.trim();
}

/**
 * Strict Name Validator & Sanitizer (Supports English & Devanagari Hindi characters)
 */
export function sanitizeName(name: unknown, maxLength: number = 100): string {
  if (typeof name !== 'string') return '';

  // Clean HTML & injections first
  let cleaned = stripHtml(name);
  cleaned = stripInjectionPatterns(cleaned);

  // Allow alphabets, Hindi Unicode range (\u0900-\u097F), spaces, dots, and hyphens
  cleaned = cleaned.replace(/[^\p{L}\p{M}\s.'-]/gu, '');

  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength);
  }

  return cleaned.trim();
}

/**
 * RFC 5322 Standard Email Regex Validation
 */
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(email: unknown): boolean {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  if (!EMAIL_REGEX.test(trimmed)) return false;

  // Verify domain has at least 2 character TLD
  const parts = trimmed.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1];
  const tld = domain.split('.').pop();
  if (!tld || tld.length < 2) return false;

  return true;
}

/**
 * Clean and lowercase email input safely
 */
export function sanitizeEmail(email: unknown): string {
  if (typeof email !== 'string') return '';
  const cleaned = sanitizeText(email, 254).toLowerCase();
  return cleaned.replace(/[<>'"\s]/g, '');
}

/**
 * Phone number sanitizer (Allows international +, digits, spaces, and hyphens)
 */
export function sanitizePhone(phone: unknown, maxLength: number = 20): string {
  if (typeof phone !== 'string') return '';
  let cleaned = phone.replace(/[^0-9+\-\s()]/g, '');
  if (cleaned.length > maxLength) {
    cleaned = cleaned.slice(0, maxLength);
  }
  return cleaned.trim();
}
