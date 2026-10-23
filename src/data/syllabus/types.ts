export type SubjectKey =
  | 'geography'
  | 'hindi'
  | 'history'
  | 'polscience'
  | 'sociology'
  | 'sanskrit'
  | 'english'
  | 'homescience'
  | 'economics'
  | 'drawing'
  | 'anthropology';

export type PaperCategory = 'DSC' | 'DSE' | 'GE' | 'SEC' | 'PRACTICAL' | 'PROJECT';

export interface SyllabusUnit {
  unitNumber: number;
  unitRoman: string;
  titleEn: string;
  titleHi: string;
  topicsEn: string[];
  topicsHi: string[];
  estimatedHours: number;
}

export interface SyllabusPaper {
  paperCode: string;
  titleEn: string;
  titleHi: string;
  category: PaperCategory;
  categoryLabelEn: string;
  categoryLabelHi: string;
  semester: number;
  credits: number;
  theoryCredits?: number;
  practicalCredits?: number;
  maxMarks: number;
  internalMarks: number;
  externalMarks: number;
  objectiveEn?: string;
  objectiveHi?: string;
  units: SyllabusUnit[];
  suggestedBooks?: {
    title: string;
    author: string;
    publisher?: string;
    language?: 'Hindi' | 'English' | 'Bilingual' | string;
  }[];
  pdfFileUrl: string;
}

export interface SubjectSyllabusMeta {
  key: SubjectKey;
  nameEn: string;
  nameHi: string;
  codePrefix: string;
  faculty: string;
  iconName: string;
  colorGradient: string;
  accentColor: string;
  officialPdfUrl: string;
  descriptionEn: string;
  descriptionHi: string;
  semesters: number[];
}
