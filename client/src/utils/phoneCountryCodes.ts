/** Country / region options for contact form mobile field (label + E.164 dial code + flag emoji). */
export interface PhoneCountryOption {
  label: string;
  dialCode: string;
  /** Unicode regional flag emoji shown next to the country name */
  flag: string;
}

export const DEFAULT_COUNTRY_DIAL_CODE = '+91';

export const INDIA_DIAL_CODE = '+91';

export function normalizeDialCode(dial: string): string {
  let d = String(dial || '').trim();
  if (!d) return '+91';
  if (!d.startsWith('+')) d = `+${d.replace(/\D/g, '')}`;
  return d;
}

/** Max digits allowed in the local phone field (India: 10; others: 15). */
export function getMobileLocalMaxLength(countryDialCode: string): number {
  return normalizeDialCode(countryDialCode) === INDIA_DIAL_CODE ? 10 : 15;
}

export const PHONE_COUNTRY_OPTIONS: PhoneCountryOption[] = [
  { label: 'India', dialCode: '+91', flag: '🇮🇳' },
  { label: 'Ukraine', dialCode: '+380', flag: '🇺🇦' },
  { label: 'United States', dialCode: '+1', flag: '🇺🇸' },
  { label: 'United Kingdom', dialCode: '+44', flag: '🇬🇧' },
  { label: 'United Arab Emirates', dialCode: '+971', flag: '🇦🇪' },
  { label: 'Singapore', dialCode: '+65', flag: '🇸🇬' },
  { label: 'Australia', dialCode: '+61', flag: '🇦🇺' },
  { label: 'Canada', dialCode: '+1', flag: '🇨🇦' },
  { label: 'Germany', dialCode: '+49', flag: '🇩🇪' },
  { label: 'France', dialCode: '+33', flag: '🇫🇷' },
  { label: 'Italy', dialCode: '+39', flag: '🇮🇹' },
  { label: 'Spain', dialCode: '+34', flag: '🇪🇸' },
  { label: 'Netherlands', dialCode: '+31', flag: '🇳🇱' },
  { label: 'Belgium', dialCode: '+32', flag: '🇧🇪' },
  { label: 'Switzerland', dialCode: '+41', flag: '🇨🇭' },
  { label: 'Sweden', dialCode: '+46', flag: '🇸🇪' },
  { label: 'Norway', dialCode: '+47', flag: '🇳🇴' },
  { label: 'Denmark', dialCode: '+45', flag: '🇩🇰' },
  { label: 'Finland', dialCode: '+358', flag: '🇫🇮' },
  { label: 'Ireland', dialCode: '+353', flag: '🇮🇪' },
  { label: 'Poland', dialCode: '+48', flag: '🇵🇱' },
  { label: 'Russia', dialCode: '+7', flag: '🇷🇺' },
  { label: 'Turkey', dialCode: '+90', flag: '🇹🇷' },
  { label: 'China', dialCode: '+86', flag: '🇨🇳' },
  { label: 'Japan', dialCode: '+81', flag: '🇯🇵' },
  { label: 'South Korea', dialCode: '+82', flag: '🇰🇷' },
  { label: 'Saudi Arabia', dialCode: '+966', flag: '🇸🇦' },
  { label: 'Qatar', dialCode: '+974', flag: '🇶🇦' },
  { label: 'Kuwait', dialCode: '+965', flag: '🇰🇼' },
  { label: 'Oman', dialCode: '+968', flag: '🇴🇲' },
  { label: 'Nepal', dialCode: '+977', flag: '🇳🇵' },
  { label: 'Bangladesh', dialCode: '+880', flag: '🇧🇩' },
  { label: 'Sri Lanka', dialCode: '+94', flag: '🇱🇰' },
  { label: 'Pakistan', dialCode: '+92', flag: '🇵🇰' },
  { label: 'Malaysia', dialCode: '+60', flag: '🇲🇾' },
  { label: 'Thailand', dialCode: '+66', flag: '🇹🇭' },
  { label: 'Indonesia', dialCode: '+62', flag: '🇮🇩' },
  { label: 'Philippines', dialCode: '+63', flag: '🇵🇭' },
  { label: 'Vietnam', dialCode: '+84', flag: '🇻🇳' },
  { label: 'New Zealand', dialCode: '+64', flag: '🇳🇿' },
  { label: 'South Africa', dialCode: '+27', flag: '🇿🇦' },
  { label: 'Brazil', dialCode: '+55', flag: '🇧🇷' },
  { label: 'Mexico', dialCode: '+52', flag: '🇲🇽' },
  { label: 'Argentina', dialCode: '+54', flag: '🇦🇷' },
  { label: 'Egypt', dialCode: '+20', flag: '🇪🇬' },
  { label: 'Israel', dialCode: '+972', flag: '🇮🇱' },
];
