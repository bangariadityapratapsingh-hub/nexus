import { StreamType, LanguageType } from './types';
import { registerStudent } from './studentRegistry';
import { CartoonCharacterId } from './cartoonBuddies';
import { syncStudentRecordToCloud } from './supabase';

export interface SubjectOption {
  code: string;
  nameEn: string;
  nameHi: string;
  credits: number;
  isCore: boolean;
}

export const COURSE_SEMESTER_SUBJECTS: Record<StreamType, SubjectOption[]> = {
  'bsc-maths': [
    { code: 'SDSUV-PHY-201', nameEn: 'Physics (Optics & Quantum Mechanics)', nameHi: 'भौतिकी (प्रकाशिकी एवं क्वांटम यांत्रिकी)', credits: 4, isCore: true },
    { code: 'SDSUV-MTH-201', nameEn: 'Mathematics (Linear Algebra & Diff Eq)', nameHi: 'गणित (रैखिक बीजगणित एवं अवकल समीकरण)', credits: 4, isCore: true },
    { code: 'SDSUV-CHM-201', nameEn: 'Chemistry (Physical & Inorganic Chemistry)', nameHi: 'रसायन विज्ञान (भौतिक एवं अकार्बनिक)', credits: 4, isCore: true },
    { code: 'SDSUV-STA-201', nameEn: 'Statistics (Probability & Mathematical Stats - UPSC ISS)', nameHi: 'सांख्यिकी (प्रायिकता एवं गणितीय सांख्यिकी)', credits: 4, isCore: false },
    { code: 'SDSUV-COM-201', nameEn: 'Computer Science (Python & Data Analysis)', nameHi: 'कंप्यूटर विज्ञान (पायथन एवं डेटा विश्लेषण)', credits: 3, isCore: false },
  ],
  'bsc-bio': [
    { code: 'SDSUV-BOT-201', nameEn: 'Botany (Plant Ecology & Taxonomy)', nameHi: 'वनस्पति विज्ञान (पादप पारिस्थितिकी एवं वर्गिकी)', credits: 4, isCore: true },
    { code: 'SDSUV-ZOO-201', nameEn: 'Zoology (Animal Physiology & Genetics)', nameHi: 'जंतु विज्ञान (प्राणी शरीर क्रिया विज्ञान एवं आनुवंशिकी)', credits: 4, isCore: true },
    { code: 'SDSUV-CHM-201', nameEn: 'Chemistry (Organic & Bio-Molecules)', nameHi: 'रसायन विज्ञान (कार्बनिक एवं जैव अणु)', credits: 4, isCore: true },
    { code: 'SDSUV-ENV-201', nameEn: 'Environmental Science (Himalayan Ecology)', nameHi: 'पर्यावरण विज्ञान (हिमालयी पारिस्थितिकी)', credits: 3, isCore: false },
  ],
  'ba-arts': [
    { code: 'SDSUV-HIS-201', nameEn: 'History (Ancient India, Indus Valley & Uttarakhand Dynasties)', nameHi: 'इतिहास (प्राचीन भारत, सिंधु सभ्यता एवं उत्तराखंड के राजवंश)', credits: 4, isCore: true },
    { code: 'SDSUV-POL-201', nameEn: 'Political Science (Indian Constitution, Fundamental Rights & Theory)', nameHi: 'राजनीति विज्ञान (भारतीय संविधान, मौलिक अधिकार एवं सिद्धांत)', credits: 4, isCore: true },
    { code: 'SDSUV-GEO-201', nameEn: 'Geography (Physical Geography, Geomorphology & Himalayan Terrain)', nameHi: 'भूगोल (भौतिक भूगोल, भू-आकृति विज्ञान एवं हिमालयी भूगोल)', credits: 4, isCore: true },
    { code: 'SDSUV-ECO-201', nameEn: 'Economics (Microeconomics, Public Finance & Uttarakhand Economy)', nameHi: 'अर्थशास्त्र (व्यष्टि अर्थशास्त्र, लोक वित्त एवं उत्तराखंड अर्थव्यवस्था)', credits: 4, isCore: false },
    { code: 'SDSUV-SOC-201', nameEn: 'Sociology (Indian Society, Social Structure & Himalayan Tribes)', nameHi: 'समाजशास्त्र (भारतीय समाज, सामाजिक संरचना एवं हिमालयी जनजातियां)', credits: 4, isCore: false },
    { code: 'SDSUV-ENG-201', nameEn: 'English Literature (Modern Prose, Poetry & Literary Movements)', nameHi: 'अंग्रेजी साहित्य (आधुनिक गद्य, पद्य एवं साहित्यिक आंदोलन)', credits: 3, isCore: false },
    { code: 'SDSUV-HIN-201', nameEn: 'हिन्दी साहित्य (आधुनिक हिन्दी कविता, छायावाद एवं गद्य)', nameHi: 'हिन्दी साहित्य (आधुनिक हिन्दी कविता, छायावाद एवं गद्य)', credits: 3, isCore: false },
    { code: 'SDSUV-SAN-201', nameEn: 'Sanskrit Literature (व्याकरण, कालिदास, रघुवंशम्, भास एवं वैदिक सूक्त)', nameHi: 'संस्कृत साहित्य (व्याकरण, कालिदास, रघुवंशम्, भास एवं वैदिक सूक्त)', credits: 3, isCore: false },
    { code: 'SDSUV-HSC-201', nameEn: 'Home Science (Foods, Clinical Nutrition, Textiles & Child Development)', nameHi: 'गृह विज्ञान (आहार एवं पोषण, वस्त्र विज्ञान एवं बाल विकास)', credits: 4, isCore: false },
    { code: 'SDSUV-DRW-201', nameEn: 'Drawing & Painting (Still Life, Ajanta, Aipan Art & Modern Painting)', nameHi: 'चित्रकला (स्थिर वस्तु चित्रण, अजन्ता, उत्तराखण्ड ऐपण एवं आधुनिक कला)', credits: 4, isCore: false },
    { code: 'SDSUV-ANT-201', nameEn: 'Anthropology (Social Anthropology, Human Evolution & Tribal Studies)', nameHi: 'मानवशास्त्र (सामाजिक मानवशास्त्र, मानव उद्विकास एवं जनजातीय अध्ययन)', credits: 4, isCore: false },
  ],
};

export interface StudentProfile {
  name: string;
  email: string;
  college?: string;
  stream: StreamType;
  semester: number;
  selectedSubjects: string[]; // Subject codes
  preferredMedium: LanguageType;
  targetGoal: string;
  isLoggedIn: boolean;
  onboarded?: boolean;
  avatarSeed?: string;
  characterBuddy?: CartoonCharacterId;
  createdAt: string;
  updatedAt: string;
}

export const SDSUV_COLLEGES_LIST = [
  'Pt. Lalit Mohan Sharma Campus, Rishikesh (Autonomous)',
  'Government Degree College, New Tehri',
  'Government Degree College, Gopeshwar (Chamoli)',
  'Government Degree College, Kotdwar (Garhwal)',
  'Government Degree College, Karanprayag',
  'Government Degree College, Uttarkashi',
  'Government Degree College, Srinagar Garhwal',
  'Government Degree College, Agustyamuni (Rudraprayag)',
  'Other SDSUV Affiliated Degree / PG College',
];

export function hasCompletedOnboarding(): boolean {
  return isStudentLoggedIn();
}

export const CAREER_GOALS_LIST = [
  'SDSUV University Top Rank (Gold Medalist Track)',
  'CDS (IMA / OTA / AFA) Defence Officer',
  'AFCAT / Indian Coast Guard Officer',
  'UPSC Civil Services / State PCS (UKPSC)',
  'UPSC Indian Statistical Service (ISS)',
  'SSC CGL / Central Secretariat Service',
  'Higher Academia (M.Sc / M.A. / CSIR-NET / GATE)',
];

const PROFILE_STORAGE_KEY = 'sdsuv_student_profile_v2';

export function getDefaultSubjectsForStream(stream: StreamType): string[] {
  const options = COURSE_SEMESTER_SUBJECTS[stream] || COURSE_SEMESTER_SUBJECTS['ba-arts'];
  return options.slice(0, 3).map((s) => s.code);
}

export function getStudentProfile(): StudentProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Even semesters (2, 4, 6) are locked (Live Soon). Auto-correct legacy/even semesters to odd Semester 1
    if (parsed && parsed.semester && parsed.semester % 2 === 0) {
      parsed.semester = 1;
    }
    return parsed;
  } catch (e) {
    console.error('Failed to read student profile', e);
    return null;
  }
}

export function saveStudentProfile(profileData: Partial<StudentProfile>): StudentProfile {
  if (typeof window === 'undefined') {
    return profileData as StudentProfile;
  }

  const existing = getStudentProfile();
  const stream = profileData.stream || existing?.stream || 'ba-arts';

  // Even semesters are locked: clamp any even semester to 1
  const rawSem = profileData.semester || existing?.semester || 1;
  const activeOddSemester = rawSem % 2 === 0 ? 1 : rawSem;

  const updated: StudentProfile = {
    name: profileData.name || existing?.name || 'SDSUV Student',
    email: profileData.email || existing?.email || 'student@sdsuvprep.in',
    college: profileData.college || existing?.college || 'Pt. LMS Rishikesh Campus',
    stream,
    semester: activeOddSemester,
    selectedSubjects:
      profileData.selectedSubjects ||
      existing?.selectedSubjects ||
      getDefaultSubjectsForStream(stream),
    preferredMedium: profileData.preferredMedium || existing?.preferredMedium || 'en',
    targetGoal: profileData.targetGoal || existing?.targetGoal || 'UPSC Civil Services / State PCS (UKPSC)',
    isLoggedIn: profileData.isLoggedIn ?? existing?.isLoggedIn ?? true,
    avatarSeed: profileData.avatarSeed || existing?.avatarSeed || 'himalayan-star',
    characterBuddy: 'doraemon',
    createdAt: existing?.createdAt || new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
    // Dispatch global custom event so all open views immediately customize
    window.dispatchEvent(new CustomEvent('sdsuv_profile_updated', { detail: updated }));

    // Auto-sync into centralized student registry
    registerStudent({
      name: updated.name,
      email: updated.email,
      course: updated.stream,
      semester: updated.semester,
      selected_subjects: updated.selectedSubjects,
      preferred_medium: updated.preferredMedium,
      college: updated.college,
      target_goal: updated.targetGoal,
      created_at: updated.createdAt,
    });

    // Auto-sync into live Supabase cloud database
    syncStudentRecordToCloud({
      name: updated.name,
      email: updated.email,
      course: updated.stream,
      semester: updated.semester,
      selected_subjects: updated.selectedSubjects,
      preferred_medium: updated.preferredMedium,
      college: updated.college,
      target_goal: updated.targetGoal,
      created_at: updated.createdAt,
      characterBuddy: updated.characterBuddy,
    }).catch((err) => {
      console.warn('Background Supabase cloud sync notice:', err);
    });
  } catch (e) {
    console.error('Failed to save student profile', e);
  }

  return updated;
}

export function isStudentLoggedIn(): boolean {
  if (typeof window === 'undefined') return false;
  const p = getStudentProfile();
  return !!p && p.isLoggedIn === true;
}

export function signOutStudent(): void {
  if (typeof window === 'undefined') return;
  const p = getStudentProfile();
  if (p) {
    saveStudentProfile({ ...p, isLoggedIn: false });
  } else {
    localStorage.removeItem(PROFILE_STORAGE_KEY);
  }
  window.dispatchEvent(new CustomEvent('sdsuv_profile_updated', { detail: null }));
}

// ─────────────────────────────────────────────────────────────────────────────
// Subject Canonical Matching & Profile Subject Filtering Helpers
// ─────────────────────────────────────────────────────────────────────────────

export const SUBJECT_CANONICAL_ENTRIES = [
  { key: 'geography', code: 'SDSUV-GEO-201', keywords: ['geo', 'geography', 'भूगोल'] },
  { key: 'history', code: 'SDSUV-HIS-201', keywords: ['his', 'history', 'इतिहास'] },
  { key: 'polscience', code: 'SDSUV-POL-201', keywords: ['pol', 'polscience', 'political', 'राजनीति'] },
  { key: 'sociology', code: 'SDSUV-SOC-201', keywords: ['soc', 'sociology', 'समाजशास्त्र'] },
  { key: 'hindi', code: 'SDSUV-HIN-201', keywords: ['hin', 'hindi', 'हिन्दी', 'हिंदी'] },
  { key: 'economics', code: 'SDSUV-ECO-201', keywords: ['eco', 'economics', 'अर्थशास्त्र'] },
  { key: 'anthropology', code: 'SDSUV-ANT-201', keywords: ['ant', 'anthropology', 'मानवशास्त्र'] },
  { key: 'english', code: 'SDSUV-ENG-201', keywords: ['eng', 'english', 'अंग्रेजी', 'अंग्रेज़ी'] },
  { key: 'sanskrit', code: 'SDSUV-SAN-201', keywords: ['san', 'sanskrit', 'संस्कृत'] },
  { key: 'homescience', code: 'SDSUV-HSC-201', keywords: ['hsc', 'homescience', 'home science', 'गृह विज्ञान'] },
  { key: 'drawing', code: 'SDSUV-DRW-201', keywords: ['drw', 'drawing', 'painting', 'चित्रकला'] },
];

export function resolveSubjectCanonicalKey(identifier: string): string | null {
  if (!identifier) return null;
  const clean = identifier.toLowerCase().trim();
  for (const entry of SUBJECT_CANONICAL_ENTRIES) {
    if (entry.key === clean || entry.code.toLowerCase() === clean) return entry.key;
    if (entry.keywords.some((kw) => clean.includes(kw.toLowerCase()))) {
      return entry.key;
    }
  }
  return null;
}

export function isSubjectMatchingSelected(
  subjectIdentifier: string,
  selectedSubjects?: string[]
): boolean {
  if (!selectedSubjects || selectedSubjects.length === 0) return true;
  const canonicalKey = resolveSubjectCanonicalKey(subjectIdentifier);

  return selectedSubjects.some((sel) => {
    const selKey = resolveSubjectCanonicalKey(sel);
    if (canonicalKey && selKey && canonicalKey === selKey) return true;
    const lowerSel = sel.toLowerCase();
    const lowerIdent = subjectIdentifier.toLowerCase();
    return lowerSel.includes(lowerIdent) || lowerIdent.includes(lowerSel);
  });
}

export function filterToSelectedSubjects<T>(
  items: T[],
  getSubjectIdentifier: (item: T) => string,
  selectedSubjects?: string[]
): T[] {
  if (!selectedSubjects || selectedSubjects.length === 0) return items;
  const filtered = items.filter((item) =>
    isSubjectMatchingSelected(getSubjectIdentifier(item), selectedSubjects)
  );
  return filtered.length > 0 ? filtered : items;
}

