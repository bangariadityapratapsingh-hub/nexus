export type SavedItemType = 'pyq' | 'lecture' | 'career' | 'topic' | 'book';

export interface SavedItem {
  id: string; // unique identifier
  type: SavedItemType;
  titleEn: string;
  titleHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  tag?: string;
  subjectCode?: string;
  subjectName?: string;
  marks?: number;
  year?: string;
  duration?: string;
  channel?: string;
  youtubeId?: string;
  category?: string;
  linkUrl: string;
  notes?: string; // student's personalized exam-night advice / reminder
  isMastered?: boolean;
  savedAt: string;
}

const SAVED_VAULT_KEY = 'sdsuv_saved_vault_v1';

// Initial starter pack if student's vault is clean
const STARTER_SAVED_ITEMS: SavedItem[] = [
  {
    id: 'pyq-SDSUV-PHY-201-01',
    type: 'pyq',
    titleEn: "Newton's Rings: Division of Amplitude & Diameter of Dark Rings Derivation",
    titleHi: "न्यूटन वलय: आयाम विभाजन का सिद्धांत एवं अदीप्त वलयों के व्यास का व्युत्पत्ति सूत्र",
    subtitleEn: 'Unit 1: Physical Optics • 15 Marks Core Question',
    subtitleHi: 'इकाई 1: भौतिक प्रकाशिकी • 15 अंक मुख्य प्रश्न',
    tag: '🔥 15 Marks • Asked in SDSUV 2024, 2022',
    subjectCode: 'SDSUV-PHY-201',
    subjectName: 'Modern Optics & Quantum Mechanics',
    marks: 15,
    year: '2024, 2022',
    linkUrl: '/pyqs?q=newton',
    notes: 'Remember: Prove that diameter Dn is proportional to sqrt(n) for dark rings and sqrt(2n-1) for bright rings.',
    isMastered: false,
    savedAt: new Date().toISOString(),
  },
  {
    id: 'lec-physics-optics-01',
    type: 'lecture',
    titleEn: "Newton's Rings Complete Derivation, Formula Proof & SDSUV PYQ Breakdown",
    titleHi: "न्यूटन वलय संपूर्ण व्युत्पत्ति, सूत्र प्रमाण एवं विगत वर्ष प्रश्न विश्लेषण",
    subtitleEn: 'Optics & Interference • Dr. H.C. Verma / NPTEL',
    subtitleHi: 'प्रकाशिकी एवं व्यतिकरण',
    tag: '🎥 24:18 • Hinglish (Smart Mix)',
    duration: '24:18',
    channel: 'Technical Physics',
    youtubeId: 'VhLiwDYehCw',
    linkUrl: '/learn?topic=t-phy-101',
    notes: 'Watch starting from 04:20 for experimental setup and radius of curvature formula.',
    isMastered: true,
    savedAt: new Date().toISOString(),
  },
  {
    id: 'career-cds-ima',
    type: 'career',
    titleEn: 'Combined Defence Services (CDS) - IMA & OTA Officer Entry',
    titleHi: 'संयुक्त रक्षा सेवा परीक्षा (सीडीएस) - आईएमए एवं ओटीए अधिकारी',
    subtitleEn: 'UPSC Commissioned Officer • Level 10 Pay (₹56,100 - ₹1,77,500)',
    subtitleHi: 'संघ लोक सेवा आयोग राजपत्रित अधिकारी',
    tag: '🎖️ 82% Syllabus Overlap with SDSUV BSc/BA',
    category: 'Defence Officer',
    linkUrl: '/careers',
    notes: 'GK and English paper directly overlaps with BA History/Polity and BSc general science.',
    isMastered: false,
    savedAt: new Date().toISOString(),
  },
];

export function getSavedItems(): SavedItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SAVED_VAULT_KEY);
    if (!raw) {
      // Seed with starter pack
      localStorage.setItem(SAVED_VAULT_KEY, JSON.stringify(STARTER_SAVED_ITEMS));
      return STARTER_SAVED_ITEMS;
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to parse saved vault items', e);
    return [];
  }
}

export function isItemSaved(id: string): boolean {
  const items = getSavedItems();
  return items.some((item) => item.id === id);
}

export function toggleSaveItem(item: Omit<SavedItem, 'savedAt'>): boolean {
  if (typeof window === 'undefined') return false;
  const current = getSavedItems();
  const exists = current.some((x) => x.id === item.id);

  let updated: SavedItem[];
  let isSavedNow: boolean;

  if (exists) {
    updated = current.filter((x) => x.id !== item.id);
    isSavedNow = false;
  } else {
    updated = [{ ...item, savedAt: new Date().toISOString() }, ...current];
    isSavedNow = true;
  }

  try {
    localStorage.setItem(SAVED_VAULT_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('sdsuv_saved_vault_updated', {
        detail: { items: updated, changedId: item.id, isSaved: isSavedNow },
      })
    );
  } catch (e) {
    console.error('Failed to update saved vault', e);
  }

  return isSavedNow;
}

export function removeSavedItem(id: string): void {
  if (typeof window === 'undefined') return;
  const current = getSavedItems();
  const updated = current.filter((x) => x.id !== id);
  try {
    localStorage.setItem(SAVED_VAULT_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('sdsuv_saved_vault_updated', {
        detail: { items: updated, changedId: id, isSaved: false },
      })
    );
  } catch (e) {
    console.error('Failed to remove item from saved vault', e);
  }
}

export function updateSavedItemNotes(id: string, notes: string): void {
  if (typeof window === 'undefined') return;
  const current = getSavedItems();
  const updated = current.map((x) => (x.id === id ? { ...x, notes } : x));
  try {
    localStorage.setItem(SAVED_VAULT_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('sdsuv_saved_vault_updated', { detail: { items: updated } })
    );
  } catch (e) {
    console.error('Failed to update note', e);
  }
}

export function toggleMasteredStatus(id: string): void {
  if (typeof window === 'undefined') return;
  const current = getSavedItems();
  const updated = current.map((x) => (x.id === id ? { ...x, isMastered: !x.isMastered } : x));
  try {
    localStorage.setItem(SAVED_VAULT_KEY, JSON.stringify(updated));
    window.dispatchEvent(
      new CustomEvent('sdsuv_saved_vault_updated', { detail: { items: updated } })
    );
  } catch (e) {
    console.error('Failed to toggle mastered status', e);
  }
}

export function clearAllSavedItems(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SAVED_VAULT_KEY, JSON.stringify([]));
  window.dispatchEvent(
    new CustomEvent('sdsuv_saved_vault_updated', { detail: { items: [] } })
  );
}

export function restoreStarterPack(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SAVED_VAULT_KEY, JSON.stringify(STARTER_SAVED_ITEMS));
  window.dispatchEvent(
    new CustomEvent('sdsuv_saved_vault_updated', { detail: { items: STARTER_SAVED_ITEMS } })
  );
}
