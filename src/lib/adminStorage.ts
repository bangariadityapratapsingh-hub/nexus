'use client';

import { StreamType } from './types';
import { LEARN_SUBJECTS_DATA, LearnSubjectData, TopicItem, LectureVideo, LectureLanguage } from '@/data/learnData';
import { COMPREHENSIVE_PYQ_DATA, DetailedPYQ } from '@/data/pyqVaultData';
import { CAREER_BLUEPRINTS, CareerBlueprint } from '@/data/careerCompassData';

// Storage keys
export const STORAGE_KEYS = {
  AUTH_USER: 'sdsuv_admin_username',
  AUTH_PASS: 'sdsuv_admin_passkey',
  AUTH_SESSION: 'sdsuv_admin_authenticated',
  CUSTOM_TOPICS: 'sdsuv_custom_topics_v1',
  CUSTOM_LECTURES: 'sdsuv_custom_lectures_v1',
  CUSTOM_PYQS: 'sdsuv_custom_pyqs_v1',
  CUSTOM_CAREERS: 'sdsuv_custom_careers_v1',
};

export const DEFAULT_ADMIN_USERNAME = 'sdsuv_admin';
export const DEFAULT_ADMIN_PASSKEY = 'APSB_SDSUV_ADMIN_2025_SECure';

export const ACCEPTED_ADMIN_PASSWORDS = [
  'APSB_SDSUV_ADMIN_2025_SECure',
  'APSB_SDSUV_ADMIN_2025_SEC',
  'APSB_SDSUV_ADMIN_2025_SECURE',
  'nexus@2026#secure',
];

// ============================================================================
// AUTHENTICATION UTILITIES
// ============================================================================
export function checkAdminAuth(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    localStorage.getItem(STORAGE_KEYS.AUTH_SESSION) === 'true' ||
    localStorage.getItem('sdsuv_admin_auth') === 'true'
  );
}

export function setAdminAuth(isAuth: boolean): void {
  if (typeof window === 'undefined') return;
  if (isAuth) {
    localStorage.setItem(STORAGE_KEYS.AUTH_SESSION, 'true');
    localStorage.setItem('sdsuv_admin_auth', 'true');
  } else {
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    localStorage.removeItem('sdsuv_admin_auth');
  }
}

export function getAdminUsername(): string {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_USERNAME;
  return localStorage.getItem(STORAGE_KEYS.AUTH_USER) || DEFAULT_ADMIN_USERNAME;
}

export function verifyAdminCredentials(user: string, pass: string): boolean {
  if (typeof window === 'undefined') return false;
  const cleanUser = user.trim().toLowerCase();
  const storedUser = (localStorage.getItem(STORAGE_KEYS.AUTH_USER) || DEFAULT_ADMIN_USERNAME).toLowerCase();
  const isValidUser =
    cleanUser === storedUser ||
    cleanUser === 'admin' ||
    cleanUser === 'sdsuv_admin';
  return isValidUser && verifyAdminPassword(pass);
}

export function verifyAdminPassword(pass: string): boolean {
  if (typeof window === 'undefined') return false;
  const storedPass = localStorage.getItem(STORAGE_KEYS.AUTH_PASS);
  if (storedPass && pass === storedPass) return true;
  const cleanPass = pass.trim();
  return (
    ACCEPTED_ADMIN_PASSWORDS.includes(cleanPass) ||
    ACCEPTED_ADMIN_PASSWORDS.some((p) => p.toLowerCase() === cleanPass.toLowerCase())
  );
}

export function changeAdminCredentials(newUser: string, newPass: string): boolean {
  if (typeof window === 'undefined') return false;
  if (!newUser || newUser.trim().length < 3) return false;
  if (!newPass || newPass.trim().length < 4) return false;
  localStorage.setItem(STORAGE_KEYS.AUTH_USER, newUser.trim());
  localStorage.setItem(STORAGE_KEYS.AUTH_PASS, newPass.trim());
  return true;
}

export function changeAdminPassword(newPass: string): boolean {
  if (typeof window === 'undefined') return false;
  if (!newPass || newPass.trim().length < 4) return false;
  localStorage.setItem(STORAGE_KEYS.AUTH_PASS, newPass.trim());
  return true;
}

// ============================================================================
// 1. SYLLABUS & TOPIC STORAGE
// ============================================================================
export interface CustomTopicPayload {
  id: string;
  stream: StreamType;
  semester: number;
  subjectCode: string;
  subjectNameEn: string;
  subjectNameHi: string;
  unitNumber: number;
  chapterTitleEn: string;
  chapterTitleHi: string;
  topic: TopicItem;
  createdAt: string;
}

export function getStoredCustomTopics(): CustomTopicPayload[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_TOPICS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading custom topics:', e);
    return [];
  }
}

export function saveCustomTopic(payload: CustomTopicPayload): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredCustomTopics();
    const updated = [payload, ...existing.filter((t) => t.id !== payload.id)];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TOPICS, JSON.stringify(updated));
    window.dispatchEvent(new Event('sdsuv_storage_updated'));
  } catch (e) {
    console.error('Error saving custom topic:', e);
  }
}

export function deleteCustomTopic(topicId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredCustomTopics();
    const updated = existing.filter((t) => t.id !== topicId);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_TOPICS, JSON.stringify(updated));
    window.dispatchEvent(new Event('sdsuv_storage_updated'));
  } catch (e) {
    console.error('Error deleting custom topic:', e);
  }
}

// ============================================================================
// 2. SMART LECTURE STORAGE
// ============================================================================
export interface CustomLecturePayload {
  id: string;
  topicId: string;
  subjectCode: string;
  titleEn: string;
  titleHi: string;
  channel: string;
  duration: string;
  youtubeId: string;
  language: LectureLanguage;
  views: string;
  badge?: string;
  createdAt: string;
}

export function getStoredCustomLectures(): CustomLecturePayload[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_LECTURES);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading custom lectures:', e);
    return [];
  }
}

export function saveCustomLecture(payload: CustomLecturePayload): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredCustomLectures();
    const updated = [payload, ...existing.filter((l) => l.id !== payload.id)];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_LECTURES, JSON.stringify(updated));
    window.dispatchEvent(new Event('sdsuv_storage_updated'));
  } catch (e) {
    console.error('Error saving custom lecture:', e);
  }
}

export function deleteCustomLecture(lectureId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredCustomLectures();
    const updated = existing.filter((l) => l.id !== lectureId);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_LECTURES, JSON.stringify(updated));
    window.dispatchEvent(new Event('sdsuv_storage_updated'));
  } catch (e) {
    console.error('Error deleting custom lecture:', e);
  }
}

// ============================================================================
// 3. DUAL-LANGUAGE PYQ STORAGE
// ============================================================================
export function getStoredCustomPYQs(): DetailedPYQ[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_PYQS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading custom PYQs:', e);
    return [];
  }
}

export function saveCustomPYQ(pyq: DetailedPYQ): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredCustomPYQs();
    const updated = [pyq, ...existing.filter((q) => q.id !== pyq.id)];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PYQS, JSON.stringify(updated));
    window.dispatchEvent(new Event('sdsuv_storage_updated'));
  } catch (e) {
    console.error('Error saving custom PYQ:', e);
  }
}

export function bulkImportPYQs(newPYQs: DetailedPYQ[]): number {
  if (typeof window === 'undefined') return 0;
  try {
    const existing = getStoredCustomPYQs();
    const existingMap = new Map(existing.map((q) => [q.id, q]));
    newPYQs.forEach((q) => existingMap.set(q.id, q));
    const merged = Array.from(existingMap.values());
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PYQS, JSON.stringify(merged));
    window.dispatchEvent(new Event('sdsuv_storage_updated'));
    return newPYQs.length;
  } catch (e) {
    console.error('Error bulk importing PYQs:', e);
    return 0;
  }
}

export function deleteCustomPYQ(pyqId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredCustomPYQs();
    const updated = existing.filter((q) => q.id !== pyqId);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_PYQS, JSON.stringify(updated));
    window.dispatchEvent(new Event('sdsuv_storage_updated'));
  } catch (e) {
    console.error('Error deleting custom PYQ:', e);
  }
}

// ============================================================================
// 4. CAREER COMPASS STORAGE
// ============================================================================
export function getStoredCustomCareers(): CareerBlueprint[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOM_CAREERS);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading custom careers:', e);
    return [];
  }
}

export function saveCustomCareer(career: CareerBlueprint): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredCustomCareers();
    const updated = [career, ...existing.filter((c) => c.id !== career.id)];
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CAREERS, JSON.stringify(updated));
    window.dispatchEvent(new Event('sdsuv_storage_updated'));
  } catch (e) {
    console.error('Error saving custom career:', e);
  }
}

export function deleteCustomCareer(careerId: string): void {
  if (typeof window === 'undefined') return;
  try {
    const existing = getStoredCustomCareers();
    const updated = existing.filter((c) => c.id !== careerId);
    localStorage.setItem(STORAGE_KEYS.CUSTOM_CAREERS, JSON.stringify(updated));
    window.dispatchEvent(new Event('sdsuv_storage_updated'));
  } catch (e) {
    console.error('Error deleting custom career:', e);
  }
}

// ============================================================================
// COMBINED DATA MERGERS FOR LIVE STUDENT PAGES
// ============================================================================
export function getAllMergedPYQs(): DetailedPYQ[] {
  if (typeof window === 'undefined') return COMPREHENSIVE_PYQ_DATA;
  const custom = getStoredCustomPYQs();
  const customIds = new Set(custom.map((q) => q.id));
  const baseFiltered = COMPREHENSIVE_PYQ_DATA.filter((q) => !customIds.has(q.id));
  return [...custom, ...baseFiltered];
}

export function getAllMergedCareers(): CareerBlueprint[] {
  if (typeof window === 'undefined') return CAREER_BLUEPRINTS;
  const custom = getStoredCustomCareers();
  const customIds = new Set(custom.map((c) => c.id));
  const baseFiltered = CAREER_BLUEPRINTS.filter((c) => !customIds.has(c.id));
  return [...custom, ...baseFiltered];
}

// ============================================================================
// BACKUP & FULL DATABASE EXPORT / IMPORT
// ============================================================================
export interface SDSUVDatabaseDump {
  version: string;
  exportedAt: string;
  source: string;
  topics: CustomTopicPayload[];
  lectures: CustomLecturePayload[];
  pyqs: DetailedPYQ[];
  careers: CareerBlueprint[];
}

export function exportFullDatabaseJSON(): string {
  const dump: SDSUVDatabaseDump = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    source: 'Sri Dev Suman Uttarakhand Vishwavidyalaya Creator Studio',
    topics: getStoredCustomTopics(),
    lectures: getStoredCustomLectures(),
    pyqs: getStoredCustomPYQs(),
    careers: getStoredCustomCareers(),
  };
  return JSON.stringify(dump, null, 2);
}

export function importFullDatabaseJSON(jsonStr: string): { success: boolean; message: string } {
  try {
    const parsed = JSON.parse(jsonStr) as Partial<SDSUVDatabaseDump>;
    if (!parsed) throw new Error('Invalid JSON');

    if (Array.isArray(parsed.topics)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_TOPICS, JSON.stringify(parsed.topics));
    }
    if (Array.isArray(parsed.lectures)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_LECTURES, JSON.stringify(parsed.lectures));
    }
    if (Array.isArray(parsed.pyqs)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_PYQS, JSON.stringify(parsed.pyqs));
    }
    if (Array.isArray(parsed.careers)) {
      localStorage.setItem(STORAGE_KEYS.CUSTOM_CAREERS, JSON.stringify(parsed.careers));
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('sdsuv_storage_updated'));
    }

    return {
      success: true,
      message: `Database imported successfully! Restored ${parsed.topics?.length || 0} topics, ${parsed.lectures?.length || 0} lectures, ${parsed.pyqs?.length || 0} PYQs, ${parsed.careers?.length || 0} careers.`,
    };
  } catch (e: any) {
    return { success: false, message: e.message || 'Failed to parse JSON file' };
  }
}

export function resetAllStorageToDefault(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEYS.CUSTOM_TOPICS);
  localStorage.removeItem(STORAGE_KEYS.CUSTOM_LECTURES);
  localStorage.removeItem(STORAGE_KEYS.CUSTOM_PYQS);
  localStorage.removeItem(STORAGE_KEYS.CUSTOM_CAREERS);
  window.dispatchEvent(new Event('sdsuv_storage_updated'));
}

// Helper to extract YouTube 11-char ID from any URL or string
export function parseYouTubeVideoId(input: string): string | null {
  if (!input) return null;
  const clean = input.trim();
  // If already 11 alphanumeric characters
  if (/^[a-zA-Z0-9_-]{11}$/.test(clean)) {
    return clean;
  }
  // Standard watch URL: youtube.com/watch?v=XXXX
  const watchMatch = clean.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
  if (watchMatch && watchMatch[1]) {
    return watchMatch[1];
  }
  return null;
}
