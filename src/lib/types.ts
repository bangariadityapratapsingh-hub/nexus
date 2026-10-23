export type StreamType = 'bsc-maths' | 'bsc-bio' | 'ba-arts';
export type LanguageType = 'en' | 'hi';
export type ActiveTab = 'command-center' | 'syllabus' | 'pyq-vault' | 'simulator' | 'career-compass' | 'saved-vault';

export interface SubjectData {
  id: string;
  code: string;
  nameEn: string;
  nameHi: string;
  stream: StreamType;
  credits: number;
  semester: number;
  masteryPercentage: number;
  completedUnits: number;
  totalUnits: number;
  iconName: string;
  color: string;
  gradient: string;
  currentTopicEn: string;
  currentTopicHi: string;
  units: {
    unitNumber: number;
    titleEn: string;
    titleHi: string;
    topicsCount: number;
    completedTopics: number;
    weightageMarks: number;
    keyConcepts: string[];
  }[];
  recommendedBooks: string[];
}

export interface PYQQuestion {
  id: string;
  subjectCode: string;
  subjectName: string;
  year: number;
  semester: number;
  examType: 'Main' | 'Back' | 'Improvement';
  marks: number;
  questionEn: string;
  questionHi: string;
  frequencyTag: 'Repeated 4x' | 'High-Yield' | 'Expected 2026' | 'Core Theorem';
  solutionEn: string;
  solutionHi: string;
  keyPoints: string[];
}

export interface CareerExam {
  id: string;
  name: string;
  category: 'Defence' | 'UPSC/Civil' | 'Uttarakhand State' | 'Higher Academia';
  badge: string;
  relevantStreams: StreamType[];
  syllabusOverlapPct: number;
  taglineEn: string;
  taglineHi: string;
  eligibilityEn: string;
  eligibilityHi: string;
  examStages: string[];
  sdsuvSubjectsOverlap: string[];
  nextNotification: string;
  salaryScale: string;
  accentColor: string;
}

export interface MockQuestion {
  id: number;
  subject: string;
  stream: StreamType;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
  sdsuvMarks: number;
}
