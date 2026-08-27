/**
 * Server-side spam / probe protection for contact-form submissions.
 * Blocks XSS/HTML, disposable/test emails, suspicious phones, and 10-minute duplicates.
 * Callers should still return a normal success response when ignored.
 */

const { phoneToDigitsOnly } = require('./requestMeta');

const DUPLICATE_WINDOW_MS = 10 * 60 * 1000;

/** @type {Map<string, number>} email -> last accepted submission timestamp */
const recentSubmissionsByEmail = new Map();

const DISPOSABLE_EMAIL_DOMAINS = new Set([
  'mailinator.com',
  'guerrillamail.com',
  'guerrillamailblock.com',
  'sharklasers.com',
  'grr.la',
  'guerrillamail.info',
  'guerrillamail.biz',
  'guerrillamail.de',
  'guerrillamail.net',
  'yopmail.com',
  'yopmail.fr',
  'tempmail.com',
  'temp-mail.org',
  'temp-mail.io',
  'tmpmail.org',
  'tmpmail.net',
  '10minutemail.com',
  '10minutemail.net',
  'throwawaymail.com',
  'trashmail.com',
  'trashmail.me',
  'fakeinbox.com',
  'getnada.com',
  'maildrop.cc',
  'dispostable.com',
  'mailnesia.com',
  'mintemail.com',
  'moakt.com',
  'emailondeck.com',
  'mailcatch.com',
  'mytemp.email',
  'tempail.com',
  'discard.email',
  'mailnull.com',
  'spamgourmet.com',
]);

// HTML / XSS patterns (including common encoded / event-handler forms)
const XSS_PATTERNS = [
  /<\s*\/?\s*[a-zA-Z!][^>]*>/i, // any HTML-like tag, e.g. <script>, <h1>, </div>
  /<\s*script\b/i,
  /javascript\s*:/i,
  /vbscript\s*:/i,
  /data\s*:\s*text\/html/i,
  /\bon\w+\s*=/i, // onclick=, onerror=, etc.
  /&#x?[0-9a-f]+;/i, // HTML entities often used in obfuscated XSS
  /%3c\s*\/?\s*[a-z]/i, // URL-encoded <tag
];

// Local-part spam / probe patterns (avoid matching legitimate names like "contest")
const TEST_EMAIL_LOCAL_PATTERNS = [
  /^(test|testing|tester|tests)([._+\-].*)?$/i,
  /^(spam|fake|dummy|sample|asdf|qwert|xxx|noreply|donotreply)([._+\-].*)?$/i,
  /injection/i,
  /\bxss\b/i,
  /javascript/i,
  /^admin$/i,
  /^user$/i,
  /^abc$/i,
  /^aaa+$/i,
];

/**
 * Collect all string values from a payload (nested shallow).
 * @param {Record<string, any>} body
 * @returns {string[]}
 */
function collectStringFields(body) {
  const out = [];
  if (!body || typeof body !== 'object') return out;
  for (const value of Object.values(body)) {
    if (typeof value === 'string') {
      out.push(value);
    } else if (value != null && typeof value !== 'object') {
      out.push(String(value));
    }
  }
  return out;
}

/**
 * @param {string} value
 * @returns {boolean}
 */
function containsXssOrHtml(value) {
  if (!value || typeof value !== 'string') return false;
  const trimmed = value.trim();
  if (!trimmed) return false;
  return XSS_PATTERNS.some((re) => re.test(trimmed));
}

/**
 * @param {Record<string, any>} body
 * @returns {boolean}
 */
function payloadHasXssOrHtml(body) {
  return collectStringFields(body).some(containsXssOrHtml);
}

/**
 * @param {string} email
 * @returns {boolean}
 */
function isDisposableOrTestEmail(email) {
  const raw = String(email || '').trim().toLowerCase();
  if (!raw || !raw.includes('@')) return false;

  const [local = '', domain = ''] = raw.split('@');
  if (!local || !domain) return false;

  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return true;

  // Explicit probe: test@...
  if (local === 'test' || local.startsWith('test.') || local.startsWith('test+') || local.startsWith('test_')) {
    return true;
  }

  if (TEST_EMAIL_LOCAL_PATTERNS.some((re) => re.test(local))) return true;

  return false;
}

/**
 * Detect sequential digit runs (ascending or descending) of length >= minLen.
 * @param {string} digits
 * @param {number} minLen
 */
function hasSequentialRun(digits, minLen = 5) {
  if (!digits || digits.length < minLen) return false;
  let asc = 1;
  let desc = 1;
  for (let i = 1; i < digits.length; i++) {
    const prev = digits.charCodeAt(i - 1) - 48;
    const cur = digits.charCodeAt(i) - 48;
    if (cur === (prev + 1) % 10) {
      asc += 1;
      desc = 1;
    } else if (cur === (prev + 9) % 10) {
      desc += 1;
      asc = 1;
    } else {
      asc = 1;
      desc = 1;
    }
    if (asc >= minLen || desc >= minLen) return true;
  }
  return false;
}

/**
 * Known probe / fake phone patterns (India-focused examples + generic probes).
 * Examples: 918234567890, 8234567890, 919876542123
 * @param {string} phone
 * @returns {boolean}
 */
function isSuspiciousPhone(phone) {
  const digits = phoneToDigitsOnly(phone);
  if (!digits) return false;

  // Prefer national 10-digit form for India when country code present
  let national = digits;
  if (digits.length === 12 && digits.startsWith('91')) {
    national = digits.slice(2);
  } else if (digits.length === 11 && digits.startsWith('0')) {
    national = digits.slice(1);
  }

  // All same digit
  if (/^(\d)\1+$/.test(national)) return true;

  // Obvious placeholders
  const blockedExact = new Set([
    '0000000000',
    '1111111111',
    '1234567890',
    '0123456789',
    '9876543210',
    '9876543211',
    '8234567890',
    '918234567890', // full with country — also checked via national
    '9876542123', // user-reported probe: 919876542123
  ]);
  if (blockedExact.has(national) || blockedExact.has(digits)) return true;

  // Long ascending/descending sequences (min 6 to avoid blocking real 98xxx numbers)
  // e.g. 8234567890, 9876542123 / 919876542123
  if (hasSequentialRun(national, 6)) return true;
  if (digits.length > national.length && hasSequentialRun(digits, 8)) return true;

  // Alternating / repeating pairs like 1212121212
  if (/^(\d{2})\1{3,}$/.test(national)) return true;

  return false;
}

/**
 * @param {string} email
 * @returns {string}
 */
function normalizeEmailKey(email) {
  return String(email || '').trim().toLowerCase();
}

/**
 * Prune stale rate-limit entries occasionally.
 */
function pruneRateLimitMap(now = Date.now()) {
  if (recentSubmissionsByEmail.size < 200) return;
  for (const [key, ts] of recentSubmissionsByEmail.entries()) {
    if (now - ts > DUPLICATE_WINDOW_MS) {
      recentSubmissionsByEmail.delete(key);
    }
  }
}

/**
 * @param {string} email
 * @returns {boolean}
 */
function isDuplicateWithinWindow(email) {
  const key = normalizeEmailKey(email);
  if (!key) return false;
  const now = Date.now();
  pruneRateLimitMap(now);
  const prev = recentSubmissionsByEmail.get(key);
  if (prev == null) return false;
  return now - prev < DUPLICATE_WINDOW_MS;
}

/**
 * Record a successfully accepted (non-spam) submission for duplicate detection.
 * @param {string} email
 */
function markAcceptedSubmission(email) {
  const key = normalizeEmailKey(email);
  if (!key) return;
  recentSubmissionsByEmail.set(key, Date.now());
  pruneRateLimitMap();
}

/**
 * Evaluate spam signals for a contact payload.
 * @param {Record<string, any>} body
 * @param {{ email?: string, mobile?: string, name?: string, message?: string }} validated
 * @returns {{ blocked: boolean, reason: string | null }}
 */
function evaluateContactSpam(body, validated = {}) {
  const fields = {
    ...(body || {}),
    name: validated.name ?? body?.name,
    email: validated.email ?? body?.email,
    mobile: validated.mobile ?? body?.mobile,
    message: validated.message ?? body?.message,
  };

  if (payloadHasXssOrHtml(fields)) {
    return { blocked: true, reason: 'xss_or_html_payload' };
  }

  const email = String(validated.email || body?.email || '').trim();
  if (email && isDisposableOrTestEmail(email)) {
    return { blocked: true, reason: 'disposable_or_test_email' };
  }

  const mobile = String(validated.mobile || body?.mobile || body?.Phone_Number || '').trim();
  if (mobile && isSuspiciousPhone(mobile)) {
    return { blocked: true, reason: 'suspicious_phone' };
  }

  // Also check mobileLocal + countryDialCode combo if present
  if (body?.mobileLocal) {
    const dial = String(body.countryDialCode || '').replace(/\D/g, '');
    const local = phoneToDigitsOnly(body.mobileLocal);
    const combined = dial && local ? `${dial}${local}` : local;
    if (combined && isSuspiciousPhone(combined)) {
      return { blocked: true, reason: 'suspicious_phone' };
    }
  }

  if (email && isDuplicateWithinWindow(email)) {
    return { blocked: true, reason: 'duplicate_within_10_minutes' };
  }

  return { blocked: false, reason: null };
}

/**
 * Log ignored spam without exposing full PII.
 * @param {string} reason
 * @param {{ source?: string }} [meta]
 */
function logIgnoredSpam(reason, meta = {}) {
  const source = meta.source ? String(meta.source).slice(0, 80) : 'unknown';
  console.warn(`[ContactForm] Ignored spam submission: reason=${reason} source=${source}`);
}

/**
 * Test helper: clear duplicate window (do not use in production paths).
 */
function _resetDuplicateWindowForTests() {
  recentSubmissionsByEmail.clear();
}

module.exports = {
  DUPLICATE_WINDOW_MS,
  evaluateContactSpam,
  markAcceptedSubmission,
  logIgnoredSpam,
  containsXssOrHtml,
  isDisposableOrTestEmail,
  isSuspiciousPhone,
  isDuplicateWithinWindow,
  _resetDuplicateWindowForTests,
};
