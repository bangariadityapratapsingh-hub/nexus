// Unified Curriculum & Notes Types for SDSUV NEP-2020 BA Platform

export interface FlowchartColumn {
  titleEn: string;
  titleHi: string;
  badge?: string;
  itemsEn: string[];
  itemsHi: string[];
}

export interface FlowchartData {
  diagramType: 'classification' | 'timeline' | 'process' | 'comparison';
  titleEn: string;
  titleHi: string;
  subtitleEn?: string;
  subtitleHi?: string;
  columns: FlowchartColumn[];
}

export interface AnalyticalPoint {
  headingEn: string;
  headingHi: string;
  subheadingEn?: string;
  subheadingHi?: string;
  detailEn: string;
  detailHi: string;
  bulletsEn: string[];
  bulletsHi: string[];
  keyHighlightEn?: string;
  keyHighlightHi?: string;
  quoteOrArticle?: string;
}

export interface TopperValueAddition {
  thinkersEn: string[];
  thinkersHi: string[];
  recommendedBooksEn: string[];
  recommendedBooksHi: string[];
  examQuoteEn: string;
  examQuoteHi: string;
  upscConnectionEn?: string;
  upscConnectionHi?: string;
  topperTipEn?: string;
  topperTipHi?: string;
}

export interface AnswerBlueprint {
  questionTitleEn: string;
  questionTitleHi: string;
  introductionEn: string;
  introductionHi: string;
  coreHeadingsEn: string[];
  coreHeadingsHi: string[];
  conclusionEn: string;
  conclusionHi: string;
}

export interface CommonMistake {
  mistakeEn: string;
  mistakeHi: string;
  correctionEn: string;
  correctionHi: string;
}

export interface McqItem {
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number; // 0-3
  explanationEn: string;
  explanationHi: string;
}

export interface MasterTopicNote {
  id: string; // e.g. 'geo-1-1'
  topicSequence: string; // 'Topic 1.1'
  lectureNumber: string; // 'Lecture 01'
  titleEn: string;
  titleHi: string;
  subjectCode: string;
  subjectId:
    | 'geography'
    | 'history'
    | 'polscience'
    | 'sociology'
    | 'hindi'
    | 'economics'
    | 'sanskrit'
    | 'english'
    | 'homescience'
    | 'drawing'
    | 'anthropology'
    | string;
  subjectNameEn: string;
  subjectNameHi: string;
  semester: number;
  unitNumber: number;
  unitTitleEn: string;
  unitTitleHi: string;
  readTime: string; // '15 min read'
  highYieldTag: string;
  upscTag?: string;
  sdsuvTag?: string;
  conclusionEn?: string;
  conclusionHi?: string;
  searchFallback?: string;
  learnTopicId: string;
  youtubeId: string;
  lectureChannel: string;

  // Block 1: Context & Definition
  contextEn: {
    intro: string;
    scholarDefinition: {
      scholar: string;
      definition: string;
    };
  };
  contextHi: {
    intro: string;
    scholarDefinition: {
      scholar: string;
      definition: string;
    };
  };

  // Block 2: Visual Flowchart / Mindmap
  flowchart: FlowchartData;

  // Block 3: Core Analytical Breakdown
  analyticalPoints: AnalyticalPoint[];

  // Block 4: Value Addition (Topper's Edge)
  valueAddition: TopperValueAddition;

  // Block 5: 15-Mark Model Answer Blueprint
  answerBlueprint?: AnswerBlueprint;

  // Block 6: Common Exam Mistakes & Pitfalls
  commonMistakes?: CommonMistake[];

  // Block 7: 3 Check Yourself MCQs
  mcqs?: McqItem[];
}

export interface CurriculumUnitSummary {
  unitNumber: number;
  titleEn: string;
  titleHi: string;
  totalTopics: number;
}

export interface CurriculumSubjectSummary {
  id:
    | 'geography'
    | 'history'
    | 'polscience'
    | 'sociology'
    | 'hindi'
    | 'economics'
    | 'sanskrit'
    | 'english'
    | 'homescience'
    | 'drawing'
    | 'anthropology'
    | string;
  code: string;
  nameEn: string;
  nameHi: string;
  semester: number;
  paperTitleEn: string;
  paperTitleHi: string;
  iconName: string;
  totalNotes: number;
  gradient: string;
  units: CurriculumUnitSummary[];
}
