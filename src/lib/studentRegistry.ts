import { StreamType, LanguageType } from './types';
import { syncStudentRecordToCloud } from './supabase';

export interface RegisteredStudent {
  id: string;
  name: string;
  email: string;
  course: StreamType; // 'bsc-maths' | 'bsc-bio' | 'ba-arts'
  semester: number;   // 1 to 6
  selected_subjects: string[];
  preferred_medium: LanguageType; // 'en' | 'hi'
  college?: string;
  target_goal?: string;
  phone?: string;
  source?: 'direct' | 'onboarding' | 'waitlist' | 'sample' | 'cloud';
  created_at: string;
}

export const STUDENT_REGISTRY_STORAGE_KEY = 'sdsuv_registered_students_list_v1';

// 5 Realistic Pre-Loaded Sample Students for preview across SDSUV Campuses
export const SAMPLE_STUDENTS: RegisteredStudent[] = [
  {
    id: 'stu-sample-01',
    name: 'Ankit Rawat',
    email: 'ankit.rawat24@gmail.com',
    course: 'bsc-maths',
    semester: 4,
    selected_subjects: ['SDSUV-PHY-201', 'SDSUV-MTH-201', 'SDSUV-CHM-201'],
    preferred_medium: 'en',
    college: 'Pt. Lalit Mohan Sharma Campus, Rishikesh (Autonomous)',
    target_goal: 'CDS (IMA / OTA / AFA) Defence Officer',
    source: 'sample',
    created_at: '2026-10-12T10:15:00.000Z',
  },
  {
    id: 'stu-sample-02',
    name: 'Priya Bhatt',
    email: 'priya.bhatt.bio@outlook.com',
    course: 'bsc-bio',
    semester: 2,
    selected_subjects: ['SDSUV-BOT-201', 'SDSUV-ZOO-201', 'SDSUV-CHM-201'],
    preferred_medium: 'hi',
    college: 'Government Degree College, New Tehri',
    target_goal: 'Higher Academia (M.Sc / M.A. / CSIR-NET / GATE)',
    source: 'sample',
    created_at: '2026-10-14T14:30:00.000Z',
  },
  {
    id: 'stu-sample-03',
    name: 'Saurav Negi',
    email: 'saurav.negi.arts@gmail.com',
    course: 'ba-arts',
    semester: 6,
    selected_subjects: ['SDSUV-POL-201', 'SDSUV-HIS-201', 'SDSUV-ECO-201'],
    preferred_medium: 'en',
    college: 'Government Degree College, Srinagar Garhwal',
    target_goal: 'UPSC Civil Services / State PCS (UKPSC)',
    source: 'sample',
    created_at: '2026-10-15T09:20:00.000Z',
  },
  {
    id: 'stu-sample-04',
    name: 'Deepika Joshi',
    email: 'deepika.j.maths@gmail.com',
    course: 'bsc-maths',
    semester: 1,
    selected_subjects: ['SDSUV-MTH-201', 'SDSUV-PHY-201', 'SDSUV-COM-201'],
    preferred_medium: 'en',
    college: 'Government Degree College, Kotdwar (Garhwal)',
    target_goal: 'UPSC Indian Statistical Service (ISS)',
    source: 'sample',
    created_at: '2026-10-16T11:45:00.000Z',
  },
  {
    id: 'stu-sample-05',
    name: 'Rohan Chauhan',
    email: 'rohan.chauhan.uk@yahoo.com',
    course: 'ba-arts',
    semester: 3,
    selected_subjects: ['SDSUV-HIN-201', 'SDSUV-HIS-201', 'SDSUV-GEO-201'],
    preferred_medium: 'hi',
    college: 'Government Degree College, Uttarkashi',
    target_goal: 'SSC CGL / Central Secretariat Service',
    source: 'sample',
    created_at: '2026-10-17T08:10:00.000Z',
  },
];

/**
 * Fetch all registered students from localStorage, automatically reconciling with
 * active student profile and waitlist records so no student registration is ever lost.
 */
export function getRegisteredStudents(): RegisteredStudent[] {
  if (typeof window === 'undefined') return SAMPLE_STUDENTS;

  try {
    const raw = localStorage.getItem(STUDENT_REGISTRY_STORAGE_KEY);
    let list: RegisteredStudent[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          list = parsed;
        }
      } catch (e) {
        console.error('Error parsing student registry:', e);
      }
    }

    if (list.length === 0) {
      list = [...SAMPLE_STUDENTS];
    }

    let mutated = false;

    // 1. Reconcile with active student profile in 'sdsuv_student_profile_v2'
    const profileRaw = localStorage.getItem('sdsuv_student_profile_v2');
    if (profileRaw) {
      try {
        const p = JSON.parse(profileRaw);
        if (p && p.email && p.name) {
          const cleanEmail = p.email.toLowerCase().trim();
          const existingIdx = list.findIndex(
            (s) => s.email.toLowerCase().trim() === cleanEmail
          );

          if (existingIdx >= 0) {
            // Ensure record has latest saved details
            list[existingIdx] = {
              ...list[existingIdx],
              name: p.name || list[existingIdx].name,
              course: p.stream || list[existingIdx].course,
              semester: p.semester || list[existingIdx].semester,
              selected_subjects: p.selectedSubjects || list[existingIdx].selected_subjects,
              preferred_medium: p.preferredMedium || list[existingIdx].preferred_medium,
              college: p.college || list[existingIdx].college,
              target_goal: p.targetGoal || list[existingIdx].target_goal,
            };
            mutated = true;
          } else {
            // Newly onboarded profile not yet in registry -> prepend to top
            list.unshift({
              id: `stu-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              name: p.name,
              email: p.email,
              course: p.stream || 'ba-arts',
              semester: p.semester || 1,
              selected_subjects: p.selectedSubjects || ['SDSUV-HIS-201', 'SDSUV-POL-201', 'SDSUV-GEO-201'],
              preferred_medium: p.preferredMedium || 'en',
              college: p.college || 'Pt. Lalit Mohan Sharma Campus, Rishikesh (Autonomous)',
              target_goal: p.targetGoal || 'UPSC Civil Services / State PCS (UKPSC)',
              source: 'onboarding',
              created_at: p.createdAt || new Date().toISOString(),
            });
            mutated = true;
          }
        }
      } catch (e) {
        console.error('Failed to reconcile student profile:', e);
      }
    }

    // 2. Reconcile with BSc Waitlist entries in 'sdsuv_bsc_waitlist_v1'
    const waitlistRaw =
      localStorage.getItem('sdsuv_bsc_waitlist_v1') ||
      localStorage.getItem('sdsuv_bsc_waitlist_entries_v1');
    if (waitlistRaw) {
      try {
        const waitlist = JSON.parse(waitlistRaw);
        if (Array.isArray(waitlist)) {
          for (const w of waitlist) {
            if (w && w.email && w.name) {
              const cleanEmail = w.email.toLowerCase().trim();
              const existingIdx = list.findIndex(
                (s) => s.email.toLowerCase().trim() === cleanEmail
              );
              if (existingIdx === -1) {
                list.push({
                  id: w.id || `stu-wait-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                  name: w.name,
                  email: w.email,
                  course: w.stream,
                  semester: w.semester || 1,
                  selected_subjects:
                    w.stream === 'bsc-maths'
                      ? ['SDSUV-PHY-201', 'SDSUV-MTH-201', 'SDSUV-CHM-201']
                      : ['SDSUV-BOT-201', 'SDSUV-ZOO-201', 'SDSUV-CHM-201'],
                  preferred_medium: 'en',
                  college: w.college || 'Pt. Lalit Mohan Sharma Campus, Rishikesh',
                  target_goal: 'BSc Early Access Waitlist',
                  phone: w.phone,
                  source: 'waitlist',
                  created_at: w.createdAt || w.created_at || new Date().toISOString(),
                });
                mutated = true;
              }
            }
          }
        }
      } catch (e) {
        console.error('Failed to reconcile BSc waitlist:', e);
      }
    }

    if (mutated) {
      try {
        localStorage.setItem(STUDENT_REGISTRY_STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        console.error('Failed to write reconciled students:', e);
      }
    }

    return list;
  } catch (err) {
    console.error('Failed to read registered students:', err);
    return SAMPLE_STUDENTS;
  }
}

/**
 * Register a new student or update an existing student by email.
 * Guarantees immediate local persistence, cross-tab notification, and cloud sync queue.
 */
export function registerStudent(studentData: {
  id?: string;
  name: string;
  email: string;
  course: StreamType;
  semester: number;
  selected_subjects: string[];
  preferred_medium: LanguageType;
  college?: string;
  target_goal?: string;
  phone?: string;
  source?: 'direct' | 'onboarding' | 'waitlist' | 'sample' | 'cloud';
  created_at?: string;
}): RegisteredStudent {
  const currentList = getRegisteredStudents();
  const cleanEmail = (studentData.email || '').toLowerCase().trim();

  const existingIndex = cleanEmail
    ? currentList.findIndex((s) => s.email.toLowerCase().trim() === cleanEmail)
    : -1;

  let updatedRecord: RegisteredStudent;

  if (existingIndex >= 0) {
    // Update existing student
    const existing = currentList[existingIndex];
    updatedRecord = {
      ...existing,
      name: studentData.name || existing.name,
      course: studentData.course || existing.course,
      semester: studentData.semester || existing.semester,
      selected_subjects:
        studentData.selected_subjects && studentData.selected_subjects.length > 0
          ? studentData.selected_subjects
          : existing.selected_subjects,
      preferred_medium: studentData.preferred_medium || existing.preferred_medium,
      college: studentData.college || existing.college,
      target_goal: studentData.target_goal || existing.target_goal,
      phone: studentData.phone || existing.phone,
      source: studentData.source || existing.source || 'direct',
    };
    currentList[existingIndex] = updatedRecord;
  } else {
    // Create new student
    const id = studentData.id || `stu-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    updatedRecord = {
      id,
      name: studentData.name,
      email: studentData.email,
      course: studentData.course,
      semester: studentData.semester,
      selected_subjects: studentData.selected_subjects,
      preferred_medium: studentData.preferred_medium,
      college: studentData.college || 'Pt. Lalit Mohan Sharma Campus, Rishikesh (Autonomous)',
      target_goal: studentData.target_goal || 'SDSUV University Top Rank',
      phone: studentData.phone,
      source: studentData.source || 'direct',
      created_at: studentData.created_at || new Date().toISOString(),
    };
    // Prepend to top of list
    currentList.unshift(updatedRecord);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(STUDENT_REGISTRY_STORAGE_KEY, JSON.stringify(currentList));
      window.dispatchEvent(new CustomEvent('sdsuv_students_updated', { detail: currentList }));
      window.dispatchEvent(new Event('sdsuv_storage_updated'));

      // Cross-tab broadcast channel
      if (typeof BroadcastChannel !== 'undefined') {
        const bc = new BroadcastChannel('sdsuv_sync_channel');
        bc.postMessage({ type: 'STUDENTS_UPDATED', timestamp: Date.now() });
        bc.close();
      }
    } catch (e) {
      console.error('Failed to save student to localStorage:', e);
    }
  }

  // Attempt Supabase cloud sync asynchronously if configured
  try {
    syncStudentRecordToCloud(updatedRecord).catch((err) => {
      console.debug('Cloud sync queued:', err?.message);
    });
  } catch (e) {
    // Non-blocking
  }

  return updatedRecord;
}

/**
 * Delete a registered student by ID
 */
export function deleteRegisteredStudent(studentId: string): void {
  if (typeof window === 'undefined') return;
  const currentList = getRegisteredStudents().filter((s) => s.id !== studentId);
  try {
    localStorage.setItem(STUDENT_REGISTRY_STORAGE_KEY, JSON.stringify(currentList));
    window.dispatchEvent(new CustomEvent('sdsuv_students_updated', { detail: currentList }));
    window.dispatchEvent(new Event('sdsuv_storage_updated'));

    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('sdsuv_sync_channel');
      bc.postMessage({ type: 'STUDENTS_UPDATED', timestamp: Date.now() });
      bc.close();
    }
  } catch (e) {
    console.error('Failed to delete student:', e);
  }
}

/**
 * Export student directory to standard CSV (Excel-compatible)
 */
export function exportStudentsToCSV(students: RegisteredStudent[]): void {
  if (typeof window === 'undefined') return;

  const headers = [
    'Student ID',
    'Full Name',
    'Email Address',
    'Phone',
    'Course/Stream',
    'Current Semester',
    'Preferred Study Medium',
    'Subjects Chosen',
    'Affiliated Campus/College',
    'Target Career Goal',
    'Registration Source',
    'Registration Date (IST)',
  ];

  const rows = students.map((s) => {
    const courseLabel =
      s.course === 'bsc-maths'
        ? 'B.Sc (Maths Group)'
        : s.course === 'bsc-bio'
        ? 'B.Sc (Bio Group)'
        : 'B.A (Arts)';

    const mediumLabel = s.preferred_medium === 'en' ? 'English Medium' : 'Hindi Medium (हिंदी)';
    const subjectsText = (s.selected_subjects || []).join('; ');

    const dateFormatted = new Date(s.created_at).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    const sourceLabel =
      s.source === 'waitlist'
        ? 'BSc Waitlist Entry'
        : s.source === 'onboarding'
        ? 'Interactive Onboarding'
        : s.source === 'sample'
        ? 'Sample Benchmark'
        : 'Direct Sign Up';

    return [
      `"${s.id}"`,
      `"${s.name.replace(/"/g, '""')}"`,
      `"${s.email.replace(/"/g, '""')}"`,
      `"${(s.phone || 'N/A').replace(/"/g, '""')}"`,
      `"${courseLabel}"`,
      `"Semester ${s.semester}"`,
      `"${mediumLabel}"`,
      `"${subjectsText}"`,
      `"${(s.college || 'Pt. LMS Rishikesh Campus').replace(/"/g, '""')}"`,
      `"${(s.target_goal || 'SDSUV Academic Excellence').replace(/"/g, '""')}"`,
      `"${sourceLabel}"`,
      `"${dateFormatted}"`,
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `sdsuv_registered_students_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
