// Preferred doubles/singles categories a player can pick during onboarding.
// Must match the values the frontend onboarding screen sends.
export const PREFERRED_CATEGORIES = [
  'Singles',
  "Men's Doubles",
  "Women's Doubles",
  'Mixed Doubles',
] as const;

// Indian mobile number: 10 digits, starts with 6-9 (same rule as auth).
export const INDIAN_MOBILE_REGEX = /^[6-9]\d{9}$/;

// PAN: 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)
export const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

// GSTIN: 15 characters, state code + PAN + entity code + 'Z' + checksum
export const GSTIN_REGEX = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/;
