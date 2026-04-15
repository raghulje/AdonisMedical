import { phoneToDigitsOnly } from './phoneHelpers';
import { INDIA_DIAL_CODE, normalizeDialCode } from './phoneCountryCodes';

/** Same rules as server: name ≥3 chars, real email shape, message non-empty, E.164-ish length. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export { INDIA_DIAL_CODE, normalizeDialCode };

export function buildInternationalMobile(countryDialCode: string, mobileLocal: string): string {
  const dial = normalizeDialCode(countryDialCode);
  const localDigits = String(mobileLocal || '').replace(/\D/g, '');
  return `${dial}${localDigits}`;
}

export interface ContactFormInput {
  name: string;
  email: string;
  message: string;
  countryDialCode: string;
  mobileLocal: string;
}

export interface ContactFormValidationResult {
  valid: boolean;
  errors: Partial<Record<'name' | 'email' | 'message' | 'mobile', string>>;
}

export function validateContactForm(input: ContactFormInput): ContactFormValidationResult {
  const errors: ContactFormValidationResult['errors'] = {};
  const name = String(input.name || '').trim();
  const email = String(input.email || '').trim();
  const message = String(input.message || '').trim();
  const fullMobile = buildInternationalMobile(input.countryDialCode, input.mobileLocal);
  const digits = phoneToDigitsOnly(fullMobile);

  if (name.length < 3) {
    errors.name = 'Name must be at least 3 characters';
  }
  if (!email) {
    errors.email = 'Email is required';
  } else if (!EMAIL_RE.test(email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!message) {
    errors.message = 'Message is required';
  }
  const localDigits = String(input.mobileLocal || '').replace(/\D/g, '');
  const dialNorm = normalizeDialCode(input.countryDialCode || '');
  if (!localDigits) {
    errors.mobile = 'Mobile number is required (digits only)';
  } else if (dialNorm === INDIA_DIAL_CODE) {
    if (localDigits.length !== 10) {
      errors.mobile = 'Indian mobile numbers must be exactly 10 digits';
    }
  } else if (digits.length < 8 || digits.length > 15) {
    errors.mobile = 'Enter a valid mobile number (8–15 digits total with country code)';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
