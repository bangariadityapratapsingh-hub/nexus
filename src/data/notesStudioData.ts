// Unified Master Notes Database for Notes Studio
// Synchronized directly with FULL_BA_CURRICULUM_DATABASE

import {
  MasterTopicNote,
  CurriculumSubjectSummary,
  FlowchartData,
  AnalyticalPoint,
  TopperValueAddition,
  AnswerBlueprint,
  CommonMistake,
  McqItem,
  FULL_BA_CURRICULUM_DATABASE,
  FULL_CURRICULUM_SUBJECTS_LIST,
  findCurriculumTopic,
  getCurriculumNotesBySubject
} from './fullBaCurriculum';

export type {
  MasterTopicNote,
  CurriculumSubjectSummary,
  FlowchartData,
  AnalyticalPoint,
  TopperValueAddition,
  AnswerBlueprint,
  CommonMistake,
  McqItem
};

export interface NotesSubjectSummary {
  id: string;
  code: string;
  nameEn: string;
  nameHi: string;
  semester: number;
  paperTitleEn: string;
  paperTitleHi: string;
  iconName: string;
  totalNotes: number;
  gradient: string;
}

// All 11 SDSUV BA Subjects with exact notes metadata
export const NOTES_SUBJECTS_LIST: NotesSubjectSummary[] = [
  {
    id: 'geography',
    code: 'SDSUV-GEO-101',
    nameEn: 'Geography',
    nameHi: 'भूगोल',
    semester: 1,
    paperTitleEn: 'Paper I: Physical Geography & Geomorphology',
    paperTitleHi: 'प्रश्नपत्र I: भौतिक भूगोल एवं भू-आकृतिक विज्ञान',
    iconName: 'Globe',
    totalNotes: 12,
    gradient: 'from-emerald-500 to-teal-700',
  },
  {
    id: 'history',
    code: 'SDSUV-HIS-101',
    nameEn: 'Ancient & Medieval History',
    nameHi: 'प्राचीन एवं मध्यकालीन इतिहास',
    semester: 1,
    paperTitleEn: 'History of India from Earliest Times to 300 A.D. & Uttarakhand Heritage',
    paperTitleHi: 'प्रारंभ से 300 ई. तक भारत का इतिहास एवं उत्तराखण्ड का सांस्कृतिक इतिहास',
    iconName: 'Scroll',
    totalNotes: 11,
    gradient: 'from-amber-600 to-orange-800',
  },
  {
    id: 'polscience',
    code: 'SDSUV-POL-101',
    nameEn: 'Political Science',
    nameHi: 'राजनीति विज्ञान',
    semester: 1,
    paperTitleEn: 'Basic Principles of Political Science & Awareness of Civil Rights',
    paperTitleHi: 'राजनीति विज्ञान के मूल सिद्धांत एवं नागरिक अधिकार चेतना',
    iconName: 'Scale',
    totalNotes: 12,
    gradient: 'from-blue-600 to-indigo-800',
  },
  {
    id: 'sociology',
    code: 'SDSUV-SOC-101',
    nameEn: 'Sociology',
    nameHi: 'समाजशास्त्र',
    semester: 1,
    paperTitleEn: 'Introductory Sociology & Classical Sociological Thinkers',
    paperTitleHi: 'समाजशास्त्र का परिचय एवं शास्त्रीय समाजशास्त्रीय विचारक',
    iconName: 'Users',
    totalNotes: 10,
    gradient: 'from-purple-600 to-violet-800',
  },
  {
    id: 'hindi',
    code: 'SDSUV-HIN-101',
    nameEn: 'Hindi Literature',
    nameHi: 'हिन्दी साहित्य',
    semester: 1,
    paperTitleEn: 'Ancient & Devotional Poetry & Brief History of Hindi Literature',
    paperTitleHi: 'प्राचीन एवं भक्तिकालीन काव्य तथा हिन्दी साहित्य का संक्षिप्त इतिहास',
    iconName: 'Feather',
    totalNotes: 7,
    gradient: 'from-rose-600 to-red-800',
  },
  {
    id: 'economics',
    code: 'SDSUV-ECO-101',
    nameEn: 'Economics',
    nameHi: 'अर्थशास्त्र',
    semester: 1,
    paperTitleEn: 'Micro Economics, Macroeconomics & Uttarakhand Mountain Economy',
    paperTitleHi: 'व्यष्टि एवं समष्टि अर्थशास्त्र तथा उत्तराखंड की पर्वतीय आर्थिकी',
    iconName: 'TrendingUp',
    totalNotes: 10,
    gradient: 'from-blue-600 to-indigo-700',
  },
  {
    id: 'anthropology',
    code: 'SDSUV-ANT-101',
    nameEn: 'Anthropology',
    nameHi: 'मानवशास्त्र',
    semester: 1,
    paperTitleEn: 'Social & Cultural Anthropology & Himalayan Ethnography',
    paperTitleHi: 'सामाजिक-सांस्कृतिक मानवशास्त्र एवं हिमालयी जनजातीय समाज',
    iconName: 'Compass',
    totalNotes: 8,
    gradient: 'from-teal-500 to-emerald-700',
  },
  {
    id: 'english',
    code: 'SDSUV-ENG-101',
    nameEn: 'English Literature',
    nameHi: 'अंग्रेजी साहित्य',
    semester: 1,
    paperTitleEn: 'Introduction to English Poetry, Renaissance Prose & Short Fiction',
    paperTitleHi: 'अंग्रेजी काव्य, पुनर्जागरण कालीन गद्य एवं लघु कथाएं',
    iconName: 'Feather',
    totalNotes: 8,
    gradient: 'from-indigo-500 to-purple-700',
  },
  {
    id: 'sanskrit',
    code: 'SDSUV-SAN-101',
    nameEn: 'Sanskrit Literature',
    nameHi: 'संस्कृत साहित्य',
    semester: 1,
    paperTitleEn: 'Paninian Grammar (Laghusiddhantakaumudi), Niti Poetry & Translation',
    paperTitleHi: 'पाणिनीय व्याकरण (लघुसिद्धान्तकौमुदी), नीति काव्य एवं अनुवाद',
    iconName: 'Sparkles',
    totalNotes: 8,
    gradient: 'from-amber-600 to-orange-700',
  },
  {
    id: 'homescience',
    code: 'SDSUV-HSC-101',
    nameEn: 'Home Science',
    nameHi: 'गृह विज्ञान',
    semester: 1,
    paperTitleEn: 'Foods & Nutrition Science, Macronutrients & Child Development',
    paperTitleHi: 'आहार एवं पोषण विज्ञान, पोषक तत्व तथा मानव विकास',
    iconName: 'HeartPulse',
    totalNotes: 8,
    gradient: 'from-rose-500 to-red-600',
  },
  {
    id: 'drawing',
    code: 'SDSUV-DRW-101',
    nameEn: 'Drawing & Painting',
    nameHi: 'चित्रकला',
    semester: 1,
    paperTitleEn: 'Fundamentals of Visual Art, Indian Shadanga & Ajanta Aesthetics',
    paperTitleHi: 'दृश्य कला के मूल तत्व, भारतीय षडंग एवं अजन्ता सौंदर्यशास्त्र',
    iconName: 'Palette',
    totalNotes: 8,
    gradient: 'from-fuchsia-500 to-pink-600',
  },
];

// Unified Array of all Master Topic Notes across all 11 Subjects
export const MASTER_NOTES_DATABASE: MasterTopicNote[] = Object.values(FULL_BA_CURRICULUM_DATABASE);

export function getSubjectSummary(subjectId: string): NotesSubjectSummary | undefined {
  return NOTES_SUBJECTS_LIST.find((s) => s.id === subjectId);
}

export function findMasterNote(noteId: string): MasterTopicNote | undefined {
  return findCurriculumTopic(noteId);
}

export function getMasterNotesBySubject(subjectId: string): MasterTopicNote[] {
  return getCurriculumNotesBySubject(subjectId);
}
