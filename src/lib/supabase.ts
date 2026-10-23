import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { StreamType } from './types';
import { COMPREHENSIVE_PYQ_DATA, DetailedPYQ } from '@/data/pyqVaultData';
import { LEARN_SUBJECTS_DATA, TopicItem } from '@/data/learnData';
import { CAREER_BLUEPRINTS, CareerBlueprint } from '@/data/careerCompassData';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabaseSecretKey =
  process.env.SUPABASE_SECRET_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  !supabaseUrl.includes('your-project-id')
);

// Client-side Supabase instance
export const supabase: SupabaseClient | null =
  isSupabaseConfigured && supabaseAnonKey && !supabaseAnonKey.endsWith('...')
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Server-side admin instance with full permissions
let adminClient: SupabaseClient | null = null;
export function getSupabaseAdmin(): SupabaseClient | null {
  if (adminClient) return adminClient;
  if (!supabaseUrl || !supabaseSecretKey) return null;
  try {
    adminClient = createClient(supabaseUrl, supabaseSecretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
    return adminClient;
  } catch (err) {
    console.error('Failed to initialize Supabase admin client:', err);
    return null;
  }
}

// ============================================================================
// 1. SUBJECTS & TOPICS SERVICE
// ============================================================================
export async function getCloudSubjects(stream?: StreamType) {
  const admin = getSupabaseAdmin();
  if (!admin) {
    const list = stream ? LEARN_SUBJECTS_DATA[stream] : Object.values(LEARN_SUBJECTS_DATA).flat();
    return { data: list, isLiveCloud: false, error: null };
  }

  try {
    let query = admin.from('subjects').select('*, units(*, topics(*))').order('semester');
    if (stream) query = query.eq('stream', stream);
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      const list = stream ? LEARN_SUBJECTS_DATA[stream] : Object.values(LEARN_SUBJECTS_DATA).flat();
      return { data: list, isLiveCloud: false, error: error?.message || null };
    }
    return { data, isLiveCloud: true, error: null };
  } catch (err: any) {
    const list = stream ? LEARN_SUBJECTS_DATA[stream] : Object.values(LEARN_SUBJECTS_DATA).flat();
    return { data: list, isLiveCloud: false, error: err.message };
  }
}

// ============================================================================
// 2. SMART LECTURES SERVICE
// ============================================================================
export async function getCloudLectures(subjectCode?: string, languageTag?: string) {
  const admin = getSupabaseAdmin();
  if (!admin) {
    return { data: [], isLiveCloud: false, error: null };
  }

  try {
    let query = admin.from('lectures').select('*').order('created_at', { ascending: false });
    if (subjectCode && subjectCode !== 'All') query = query.eq('subject_code', subjectCode);
    if (languageTag && languageTag !== 'All') query = query.eq('language_tag', languageTag);
    const { data, error } = await query;
    if (error) throw error;
    return { data: data || [], isLiveCloud: true, error: null };
  } catch (err: any) {
    return { data: [], isLiveCloud: false, error: err.message };
  }
}

// ============================================================================
// 3. DUAL-LANGUAGE PYQ VAULT SERVICE
// ============================================================================
export async function getCloudPYQs(stream?: StreamType, subjectCode?: string) {
  const admin = getSupabaseAdmin();
  if (!admin) {
    let filtered = COMPREHENSIVE_PYQ_DATA;
    if (stream) filtered = filtered.filter((q) => q.stream === stream);
    if (subjectCode && subjectCode !== 'All') filtered = filtered.filter((q) => q.subjectCode === subjectCode);
    return { data: filtered, isLiveCloud: false, error: null };
  }

  try {
    let query = admin.from('custom_pyqs').select('*').order('year', { ascending: false });
    const { data, error } = await query;
    if (error || !data || data.length === 0) {
      let filtered = COMPREHENSIVE_PYQ_DATA;
      if (stream) filtered = filtered.filter((q) => q.stream === stream);
      if (subjectCode && subjectCode !== 'All') filtered = filtered.filter((q) => q.subjectCode === subjectCode);
      return { data: filtered, isLiveCloud: false, error: null };
    }
    return { data, isLiveCloud: true, error: null };
  } catch (err: any) {
    return { data: COMPREHENSIVE_PYQ_DATA, isLiveCloud: false, error: err.message };
  }
}

// ============================================================================
// 4. CAREER COMPASS SERVICE
// ============================================================================
export async function getCloudCareers(stream?: StreamType) {
  const list = stream
    ? CAREER_BLUEPRINTS.filter((c) => c.streams.includes(stream))
    : CAREER_BLUEPRINTS;
  return { data: list, isLiveCloud: false, error: null };
}

// ============================================================================
// 5. STUDENT PROFILES & CLOUD SYNC
// ============================================================================
export async function syncStudentRecordToCloud(student: {
  id?: string;
  name: string;
  email: string;
  course: StreamType;
  semester: number;
  selected_subjects: string[];
  preferred_medium: string;
  college?: string;
  target_goal?: string;
  created_at?: string;
  characterBuddy?: string;
}) {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student),
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      console.warn('Student cloud sync notice:', err.message);
      return { success: false, message: err.message };
    }
  }

  // Server-side direct execution
  const admin = getSupabaseAdmin();
  if (!admin) return { success: false, message: 'Supabase admin not configured' };

  try {
    let normalizedDegree = 'BA';
    if (student.course === 'bsc-maths') normalizedDegree = 'BSc Maths';
    else if (student.course === 'bsc-bio') normalizedDegree = 'BSc Bio';

    const normalizedMedium =
      student.preferred_medium === 'hi' || student.preferred_medium === 'hindi'
        ? 'Hindi'
        : 'English';

    const { data: existing } = await admin
      .from('students')
      .select('id')
      .eq('email', student.email.toLowerCase())
      .limit(1);

    const payload = {
      full_name: student.name,
      email: student.email.toLowerCase(),
      degree: normalizedDegree,
      semester: student.semester || 1,
      medium: normalizedMedium,
      subjects: student.selected_subjects || [],
      companion: student.characterBuddy || 'doraemon',
      last_active: new Date().toISOString(),
    };

    let result;
    if (existing && existing[0]?.id) {
      result = await admin.from('students').update(payload).eq('id', existing[0].id).select();
    } else {
      result = await admin.from('students').insert([payload]).select();
    }

    if (result.error) throw result.error;
    return { success: true, data: result.data };
  } catch (err: any) {
    return { success: false, message: err.message };
  }
}

export async function fetchCloudStudents() {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch('/api/students');
      const json = await res.json();
      return { data: json.students || [], isLiveCloud: true, error: null };
    } catch (err: any) {
      return { data: [], isLiveCloud: false, error: err.message };
    }
  }

  const admin = getSupabaseAdmin();
  if (!admin) return { data: [], isLiveCloud: false, error: 'Admin client not available' };
  try {
    const { data, error } = await admin
      .from('students')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return { data: data || [], isLiveCloud: true, error: null };
  } catch (err: any) {
    return { data: [], isLiveCloud: false, error: err.message };
  }
}

// ============================================================================
// 6. SHARED LECTURE RATINGS SERVICE
// ============================================================================
export async function fetchLectureRating(videoId: string): Promise<{ averageRating: number; count: number }> {
  try {
    const res = await fetch(`/api/lecture-ratings?videoId=${encodeURIComponent(videoId)}`);
    if (!res.ok) return { averageRating: 4.9, count: 0 };
    const json = await res.json();
    return {
      averageRating: json.averageRating || 4.9,
      count: json.count || 0,
    };
  } catch (e) {
    return { averageRating: 4.9, count: 0 };
  }
}

export async function submitLectureRating(
  videoId: string,
  topicId: string,
  rating: number
): Promise<{ success: boolean; averageRating: number; count: number }> {
  try {
    const res = await fetch('/api/lecture-ratings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ videoId, topicId, rating }),
    });
    if (!res.ok) return { success: false, averageRating: 4.9, count: 0 };
    const json = await res.json();
    return {
      success: true,
      averageRating: json.averageRating || rating,
      count: json.count || 1,
    };
  } catch (e) {
    return { success: false, averageRating: 4.9, count: 0 };
  }
}
