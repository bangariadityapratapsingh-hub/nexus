'use client';

export interface BScWaitlistEntry {
  id: string;
  name: string;
  email: string;
  stream: 'bsc-maths' | 'bsc-bio';
  semester: number;
  college?: string;
  phone?: string;
  notes?: string;
  createdAt: string;
}

export const BSC_WAITLIST_STORAGE_KEY = 'sdsuv_bsc_waitlist_v1';

// Pre-loaded realistic sample waitlist entries from SDSUV constituent & affiliated colleges
export const INITIAL_SAMPLE_WAITLIST: BScWaitlistEntry[] = [
  {
    id: 'wl-bsc-01',
    name: 'Abhishek Dobhal',
    email: 'abhishek.dobhal24@gmail.com',
    stream: 'bsc-maths',
    semester: 4,
    college: 'Pt. Lalit Mohan Sharma Campus, Rishikesh (Autonomous)',
    phone: '+91 98971 23456',
    notes: 'PCM Student preparing for CDS IMA & looking for Physics/Maths chapter-wise PYQs.',
    createdAt: '2026-10-15T11:20:00.000Z',
  },
  {
    id: 'wl-bsc-02',
    name: 'Sneha Semwal',
    email: 'sneha.semwal.bio@outlook.com',
    stream: 'bsc-bio',
    semester: 2,
    college: 'Government Degree College, New Tehri',
    phone: '+91 94120 78901',
    notes: 'CBZ student looking for Botany & Zoology Himalayan ecology lectures.',
    createdAt: '2026-10-16T09:45:00.000Z',
  },
  {
    id: 'wl-bsc-03',
    name: 'Manish Rawat',
    email: 'manish.rawat.maths@gmail.com',
    stream: 'bsc-maths',
    semester: 6,
    college: 'Government Degree College, Gopeshwar (Chamoli)',
    phone: '+91 89793 45678',
    notes: 'Final year BSc student aiming for UPSC Indian Statistical Service (ISS).',
    createdAt: '2026-10-16T15:30:00.000Z',
  },
  {
    id: 'wl-bsc-04',
    name: 'Pooja Bhandari',
    email: 'pooja.bhandari.botany@gmail.com',
    stream: 'bsc-bio',
    semester: 4,
    college: 'Government Degree College, Kotdwar (Garhwal)',
    phone: '+91 97561 34567',
    notes: 'Needs Hindi medium Botany & Chemistry solved exam papers.',
    createdAt: '2026-10-17T08:15:00.000Z',
  },
  {
    id: 'wl-bsc-05',
    name: 'Vikas Panwar',
    email: 'vikas.panwar.pcm@yahoo.com',
    stream: 'bsc-maths',
    semester: 3,
    college: 'Government Degree College, Uttarkashi',
    phone: '+91 98375 67890',
    notes: 'Interested in 3-Hour Exam Simulator for Calculus and Quantum Optics.',
    createdAt: '2026-10-17T14:10:00.000Z',
  },
];

/**
 * Retrieve all BSc Waitlist entries from localStorage
 */
export function getBScWaitlist(): BScWaitlistEntry[] {
  if (typeof window === 'undefined') return INITIAL_SAMPLE_WAITLIST;

  try {
    const raw = localStorage.getItem(BSC_WAITLIST_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(BSC_WAITLIST_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_WAITLIST));
      return INITIAL_SAMPLE_WAITLIST;
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(BSC_WAITLIST_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_WAITLIST));
      return INITIAL_SAMPLE_WAITLIST;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to read BSc waitlist from localStorage:', e);
    return INITIAL_SAMPLE_WAITLIST;
  }
}

/**
 * Add a new student to the BSc Waitlist
 */
export function addBScWaitlistEntry(entry: {
  name: string;
  email: string;
  stream: 'bsc-maths' | 'bsc-bio';
  semester: number;
  college?: string;
  phone?: string;
  notes?: string;
}): BScWaitlistEntry {
  const currentList = getBScWaitlist();

  // Check if email already registered
  const existingIdx = currentList.findIndex(
    (e) => e.email.toLowerCase().trim() === entry.email.toLowerCase().trim()
  );

  let newOrUpdated: BScWaitlistEntry;

  if (existingIdx >= 0) {
    // Update existing record
    newOrUpdated = {
      ...currentList[existingIdx],
      name: entry.name || currentList[existingIdx].name,
      stream: entry.stream || currentList[existingIdx].stream,
      semester: entry.semester || currentList[existingIdx].semester,
      college: entry.college || currentList[existingIdx].college,
      phone: entry.phone || currentList[existingIdx].phone,
      notes: entry.notes || currentList[existingIdx].notes,
    };
    currentList[existingIdx] = newOrUpdated;
  } else {
    // Prepend new entry
    newOrUpdated = {
      id: `wl-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      name: entry.name.trim(),
      email: entry.email.trim(),
      stream: entry.stream,
      semester: entry.semester,
      college: entry.college || 'SDSUV Affiliated College',
      phone: entry.phone || '',
      notes: entry.notes || 'Interested in BSc Phase 2 Access',
      createdAt: new Date().toISOString(),
    };
    currentList.unshift(newOrUpdated);
  }

  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(BSC_WAITLIST_STORAGE_KEY, JSON.stringify(currentList));
      window.dispatchEvent(new CustomEvent('sdsuv_waitlist_updated', { detail: currentList }));
    } catch (e) {
      console.error('Failed to save BSc waitlist:', e);
    }
  }

  return newOrUpdated;
}

/**
 * Remove an entry from the BSc Waitlist
 */
export function deleteBScWaitlistEntry(id: string): void {
  if (typeof window === 'undefined') return;
  const currentList = getBScWaitlist().filter((e) => e.id !== id);
  try {
    localStorage.setItem(BSC_WAITLIST_STORAGE_KEY, JSON.stringify(currentList));
    window.dispatchEvent(new CustomEvent('sdsuv_waitlist_updated', { detail: currentList }));
  } catch (e) {
    console.error('Failed to delete waitlist entry:', e);
  }
}

/**
 * Export BSc Waitlist to CSV (Excel compatible)
 */
export function exportBScWaitlistToCSV(entries: BScWaitlistEntry[]): void {
  if (typeof window === 'undefined') return;

  const headers = [
    'Waitlist ID',
    'Student Full Name',
    'Email Address',
    'Target BSc Stream',
    'Current Semester',
    'SDSUV Campus / College',
    'Phone Contact',
    'Student Note / Reason',
    'Registration Date (IST)',
  ];

  const rows = entries.map((e) => {
    const streamLabel =
      e.stream === 'bsc-maths' ? 'B.Sc (Maths Group - PCM)' : 'B.Sc (Bio Group - CBZ)';

    const dateFormatted = new Date(e.createdAt).toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      dateStyle: 'medium',
      timeStyle: 'short',
    });

    return [
      `"${e.id}"`,
      `"${(e.name || '').replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${streamLabel}"`,
      `"Semester ${e.semester}"`,
      `"${(e.college || 'SDSUV College').replace(/"/g, '""')}"`,
      `"${(e.phone || '').replace(/"/g, '""')}"`,
      `"${(e.notes || '').replace(/"/g, '""')}"`,
      `"${dateFormatted}"`,
    ];
  });

  const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute(
    'download',
    `sdsuv_bsc_waitlist_${new Date().toISOString().split('T')[0]}.csv`
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
