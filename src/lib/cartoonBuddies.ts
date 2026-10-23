export type CartoonCharacterId = 'doraemon';

export interface CartoonBuddy {
  id: CartoonCharacterId;
  nameEn: string;
  nameHi: string;
  showTitleEn: string;
  showTitleHi: string;
  taglineEn: string;
  taglineHi: string;
  colorHex: string;
  auraRgb: string; // for cyan/blue glowing aura
  accentGradient: string;
  badgeLabel: string;
  emoji: string;
  catchphraseEn: (studentName: string) => string;
  catchphraseHi: (studentName: string) => string;
  voiceTextEn: (studentName: string) => string;
}

export const CARTOON_BUDDIES: Record<CartoonCharacterId, CartoonBuddy> = {
  doraemon: {
    id: 'doraemon',
    nameEn: 'Doraemon',
    nameHi: 'डोरेमोन',
    showTitleEn: 'Doraemon: 22nd Century Companion',
    showTitleHi: 'डोरेमोन: २२वीं सदी का रोबोट',
    taglineEn: 'Future Gadgets & Exam Confidence',
    taglineHi: 'भविष्य के गैजेट्स और परीक्षा आत्मविश्वास',
    colorHex: '#0284c7',
    auraRgb: '6, 182, 212', // Cyan/sky blue glow
    accentGradient: 'from-sky-400 via-blue-500 to-indigo-600',
    badgeLabel: '4D Pouch Power',
    emoji: '🤖',
    catchphraseEn: (name) => `Hello ${name}! Ready to unlock a new gadget of knowledge today?`,
    catchphraseHi: (name) => `नमस्ते ${name}! चलो आज की पढ़ाई शुरू करें!`,
    voiceTextEn: (name) => `Hello ${name}! Ready to unlock a new gadget of knowledge today?`,
  },
};

export const ALL_CARTOON_BUDDIES_LIST: CartoonBuddy[] = [
  CARTOON_BUDDIES.doraemon,
];

export function getCartoonBuddy(id?: string | null): CartoonBuddy {
  return CARTOON_BUDDIES.doraemon;
}

