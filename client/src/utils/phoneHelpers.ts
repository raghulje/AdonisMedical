export function phoneToDigitsOnly(phone: string | number | null | undefined): string {
  if (phone == null) return '';
  return String(phone).replace(/\D/g, '');
}
