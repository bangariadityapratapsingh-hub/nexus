export type NotificationCategory = 'exams' | 'results' | 'circulars' | 'calendar';

export interface UniversityNotification {
  id: string;
  title: string;
  date: string;
  link: string;
  category: NotificationCategory;
  categoryLabelEn: string;
  categoryLabelHi: string;
  categoryIcon: string;
  isNew?: boolean;
  summaryEn: string;
  summaryHi: string;
  pdfUrl?: string;
  fileSize?: string;
  officialRef?: string;
}

export interface NotificationApiResponse {
  success: boolean;
  source: 'live' | 'cache' | 'fallback';
  lastUpdated: string;
  count: number;
  notifications: UniversityNotification[];
}
