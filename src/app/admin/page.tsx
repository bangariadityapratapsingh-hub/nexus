'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { AmbassadorCarLogo } from '@/components/AmbassadorCarLogo';
import {
  Lock,
  Unlock,
  Key,
  Bell,
  ShieldAlert,
  ShieldCheck,
  LayoutDashboard,
  BookOpen,
  Video,
  FileQuestion,
  Compass,
  Plus,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Eye,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Search,
  Sparkles,
  ArrowLeft,
  FileText,
  IndianRupee,
  Calendar,
  Layers,
  Copy,
  Check,
  ChevronRight,
  Flame,
  Zap,
  Users,
  GraduationCap,
  Calculator,
  Dna,
  Library,
  Mail,
  Filter,
  User,
  Phone,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import {
  RegisteredStudent,
  getRegisteredStudents,
  registerStudent,
  deleteRegisteredStudent,
  exportStudentsToCSV,
  STUDENT_REGISTRY_STORAGE_KEY,
} from '@/lib/studentRegistry';
import { sanitizeName, sanitizeEmail, sanitizePhone, sanitizeText, isValidEmail } from '@/lib/sanitize';
import { fetchCloudStudents } from '@/lib/supabase';
import {
  SDSUV_COLLEGES_LIST,
  CAREER_GOALS_LIST,
  COURSE_SEMESTER_SUBJECTS,
  getDefaultSubjectsForStream,
} from '@/lib/studentProfile';
import {
  BScWaitlistEntry,
  getBScWaitlist,
  deleteBScWaitlistEntry,
  exportBScWaitlistToCSV,
} from '@/lib/waitlistStorage';
import {
  checkAdminAuth,
  setAdminAuth,
  changeAdminCredentials,
  changeAdminPassword,
  getAdminUsername,
  getStoredCustomTopics,
  saveCustomTopic,
  deleteCustomTopic,
  CustomTopicPayload,
  getStoredCustomLectures,
  saveCustomLecture,
  deleteCustomLecture,
  CustomLecturePayload,
  getStoredCustomPYQs,
  saveCustomPYQ,
  deleteCustomPYQ,
  bulkImportPYQs,
  getStoredCustomCareers,
  saveCustomCareer,
  deleteCustomCareer,
  exportFullDatabaseJSON,
  importFullDatabaseJSON,
  resetAllStorageToDefault,
  parseYouTubeVideoId,
} from '@/lib/adminStorage';
import { LectureLanguage, TopicItem } from '@/data/learnData';
import { DetailedPYQ } from '@/data/pyqVaultData';
import { CareerBlueprint, CareerCategory } from '@/data/careerCompassData';

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authChecking, setAuthChecking] = useState<boolean>(true);
  const [currentAdminUser, setCurrentAdminUser] = useState('');

  // Change Credentials Modal
  const [isChangePassModalOpen, setIsChangePassModalOpen] = useState(false);
  const [newUsernameInput, setNewUsernameInput] = useState('');
  const [newPassInput, setNewPassInput] = useState('');

  // Active Admin Tab: 'students' | 'waitlist' | 'topics' | 'lectures' | 'pyqs' | 'careers'
  const [activeTab, setActiveTab] = useState<'students' | 'waitlist' | 'topics' | 'lectures' | 'pyqs' | 'careers'>('students');

  // Registered Students State & Filter Controls
  const [registeredStudents, setRegisteredStudents] = useState<RegisteredStudent[]>([]);
  const [studentSearch, setStudentSearch] = useState('');
  const [studentCourseFilter, setStudentCourseFilter] = useState<'all' | 'bsc-maths' | 'bsc-bio' | 'ba-arts'>('all');
  const [studentSemesterFilter, setStudentSemesterFilter] = useState<string>('all');
  const [studentMediumFilter, setStudentMediumFilter] = useState<'all' | 'en' | 'hi'>('all');

  // View Student Full Detail Modal
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<RegisteredStudent | null>(null);

  // Manual Add Student Modal State
  const [isAddStudentModalOpen, setIsAddStudentModalOpen] = useState(false);
  const [manualStudentName, setManualStudentName] = useState('');
  const [manualStudentEmail, setManualStudentEmail] = useState('');
  const [manualStudentPhone, setManualStudentPhone] = useState('');
  const [manualStudentCourse, setManualStudentCourse] = useState<StreamType>('ba-arts');
  const [manualStudentSemester, setManualStudentSemester] = useState<number>(1);
  const [manualStudentMedium, setManualStudentMedium] = useState<LanguageType>('en');
  const [manualStudentCollege, setManualStudentCollege] = useState(SDSUV_COLLEGES_LIST[0]);
  const [manualStudentCustomCollege, setManualStudentCustomCollege] = useState('');
  const [manualStudentGoal, setManualStudentGoal] = useState(CAREER_GOALS_LIST[0]);
  const [manualStudentSubjects, setManualStudentSubjects] = useState<string[]>(getDefaultSubjectsForStream('ba-arts'));

  const handleManualAddStudent = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = sanitizeName(manualStudentName, 80);
    const cleanEmail = sanitizeEmail(manualStudentEmail);
    const cleanPhone = sanitizePhone(manualStudentPhone, 20);

    if (!cleanName || cleanName.length < 2) {
      showToast('⚠️ Please enter a valid student name (at least 2 letters)');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      showToast('⚠️ Please enter a valid student email address');
      return;
    }

    const rawCollege =
      manualStudentCollege === 'Other SDSUV Affiliated Degree / PG College' && manualStudentCustomCollege.trim()
        ? manualStudentCustomCollege.trim()
        : manualStudentCollege;
    const finalCollege = sanitizeText(rawCollege, 120);
    const finalGoal = sanitizeText(manualStudentGoal, 80);

    const subjectsToAssign =
      manualStudentSubjects.length > 0
        ? manualStudentSubjects
        : getDefaultSubjectsForStream(manualStudentCourse);

    registerStudent({
      name: cleanName,
      email: cleanEmail,
      course: manualStudentCourse,
      semester: manualStudentSemester,
      selected_subjects: subjectsToAssign,
      preferred_medium: manualStudentMedium,
      college: finalCollege,
      target_goal: finalGoal,
      phone: cleanPhone || undefined,
      source: 'direct',
      created_at: new Date().toISOString(),
    });

    reloadStudents();
    setIsAddStudentModalOpen(false);
    showToast(`✅ Student ${cleanName} registered successfully!`);
    setManualStudentName('');
    setManualStudentEmail('');
    setManualStudentPhone('');
  };

  const reloadStudents = async () => {
    const local = getRegisteredStudents();
    setRegisteredStudents(local);

    try {
      const { data } = await fetchCloudStudents();
      if (data && data.length > 0) {
        const mergedMap = new Map<string, RegisteredStudent>();
        local.forEach((s) => mergedMap.set(s.email.toLowerCase(), s));

        data.forEach((cs: any) => {
          const email = (cs.email || '').toLowerCase();
          if (!email) return;

          let stream: StreamType = 'ba-arts';
          if (cs.degree === 'BSc Maths') stream = 'bsc-maths';
          else if (cs.degree === 'BSc Bio') stream = 'bsc-bio';

          const existingLocal = mergedMap.get(email);
          mergedMap.set(email, {
            id: cs.id || existingLocal?.id || `cloud-${email}`,
            name: cs.full_name || existingLocal?.name || 'SDSUV Student',
            email: cs.email,
            course: stream,
            semester: cs.semester || existingLocal?.semester || 1,
            selected_subjects: Array.isArray(cs.subjects) ? cs.subjects : existingLocal?.selected_subjects || [],
            preferred_medium: cs.medium === 'Hindi' ? 'hi' : 'en',
            college: cs.college || existingLocal?.college || 'Pt. LMS Rishikesh Campus',
            target_goal: cs.target_goal || existingLocal?.target_goal || 'SDSUV University Top Rank',
            source: 'cloud',
            created_at: cs.created_at || existingLocal?.created_at || new Date().toISOString(),
          });
        });

        setRegisteredStudents(Array.from(mergedMap.values()));
      }
    } catch (err) {
      // ignore
    }
  };

  // BSc Waitlist State & Filter Controls
  const [bscWaitlist, setBscWaitlist] = useState<BScWaitlistEntry[]>([]);
  const [waitlistSearch, setWaitlistSearch] = useState('');
  const [waitlistStreamFilter, setWaitlistStreamFilter] = useState<'all' | 'bsc-maths' | 'bsc-bio'>('all');
  const [waitlistSemesterFilter, setWaitlistSemesterFilter] = useState<string>('all');

  const reloadWaitlist = () => {
    setBscWaitlist(getBScWaitlist());
  };

  // Global Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Import Database Modal
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importJsonInput, setImportJsonInput] = useState('');

  // Bulk PYQ Modal
  const [isBulkPYQModalOpen, setIsBulkPYQModalOpen] = useState(false);
  const [bulkPYQJson, setBulkPYQJson] = useState('');

  // Storage counts state
  const [customTopics, setCustomTopics] = useState<CustomTopicPayload[]>([]);
  const [customLectures, setCustomLectures] = useState<CustomLecturePayload[]>([]);
  const [customPYQs, setCustomPYQs] = useState<DetailedPYQ[]>([]);
  const [customCareers, setCustomCareers] = useState<CareerBlueprint[]>([]);

  // Refresh counts
  const reloadStorage = () => {
    reloadStudents();
    reloadWaitlist();
    setCustomTopics(getStoredCustomTopics());
    setCustomLectures(getStoredCustomLectures());
    setCustomPYQs(getStoredCustomPYQs());
    setCustomCareers(getStoredCustomCareers());
  };

  useEffect(() => {
    // Fast path: if client storage indicates authenticated, open Studio immediately
    if (checkAdminAuth()) {
      setIsAuthenticated(true);
      setAuthChecking(false);
      const cachedUser = getAdminUsername();
      setCurrentAdminUser(cachedUser);
      setNewUsernameInput(cachedUser);
      reloadStorage();
    }

    // Verify session cryptographic cookie with server
    fetch('/api/admin-auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          setAdminAuth(true);
          const storedUser = data.user || getAdminUsername();
          setCurrentAdminUser(storedUser);
          setNewUsernameInput(storedUser);
          reloadStorage();
        } else if (!checkAdminAuth()) {
          setIsAuthenticated(false);
          window.location.href = '/admin/login?redirect=/admin';
        }
      })
      .catch(() => {
        if (!checkAdminAuth()) {
          window.location.href = '/admin/login?redirect=/admin';
        }
      })
      .finally(() => {
        setAuthChecking(false);
      });

    const handleStorageUpdate = () => {
      reloadStorage();
    };

    const handleStudentsUpdate = () => {
      reloadStudents();
    };

    const handleWaitlistUpdate = () => {
      reloadWaitlist();
    };

    // Cross-tab storage change listener
    const handleStorageChange = (e: StorageEvent) => {
      if (
        !e.key ||
        e.key === STUDENT_REGISTRY_STORAGE_KEY ||
        e.key.startsWith('sdsuv_')
      ) {
        reloadStorage();
      }
    };

    // Window focus / visibility change listener
    const handleFocusOrVisible = () => {
      reloadStorage();
    };

    window.addEventListener('sdsuv_storage_updated', handleStorageUpdate);
    window.addEventListener('sdsuv_students_updated', handleStudentsUpdate);
    window.addEventListener('sdsuv_waitlist_updated', handleWaitlistUpdate);
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('focus', handleFocusOrVisible);

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        handleFocusOrVisible();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Cross-tab BroadcastChannel listener
    let syncChannel: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        syncChannel = new BroadcastChannel('sdsuv_sync_channel');
        syncChannel.onmessage = () => {
          reloadStorage();
        };
      } catch (e) {
        // ignore
      }
    }

    return () => {
      window.removeEventListener('sdsuv_storage_updated', handleStorageUpdate);
      window.removeEventListener('sdsuv_students_updated', handleStudentsUpdate);
      window.removeEventListener('sdsuv_waitlist_updated', handleWaitlistUpdate);
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('focus', handleFocusOrVisible);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (syncChannel) {
        syncChannel.close();
      }
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3800);
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/admin-auth', { method: 'DELETE' });
    } catch (e) {
      // ignore
    }
    setIsAuthenticated(false);
    setAdminAuth(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('sdsuv_admin_auth');
      localStorage.removeItem('sdsuv_admin_authenticated');
    }
    window.location.href = '/admin/login';
  };

  const handleChangeCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (changeAdminCredentials(newUsernameInput, newPassInput)) {
      setIsChangePassModalOpen(false);
      setCurrentAdminUser(newUsernameInput.trim());
      setNewPassInput('');
      showToast('🔑 Admin credentials updated successfully!');
    } else {
      showToast('Username must be ≥ 3 chars & Password ≥ 4 chars');
    }
  };

  // ==========================================================================
  // TAB 1: SYLLABUS & TOPIC FORM STATE
  // ==========================================================================
  const [topicStream, setTopicStream] = useState<StreamType>('bsc-maths');
  const [topicSemester, setTopicSemester] = useState<number>(4);
  const [topicSubject, setTopicSubject] = useState('Physics: Modern Optics & Quantum Physics');
  const [topicSubjectCode, setTopicSubjectCode] = useState('SDSUV-PHY-201');
  const [topicUnitNum, setTopicUnitNum] = useState<number>(1);
  const [topicChapterEn, setTopicChapterEn] = useState('');
  const [topicChapterHi, setTopicChapterHi] = useState('');
  const [topicTitleEn, setTopicTitleEn] = useState('');
  const [topicTitleHi, setTopicTitleHi] = useState('');
  const [topicTag, setTopicTag] = useState<'🔥 Most Asked in SDSUV' | '⚡ Easy Scoring' | '💎 10-Mark Theorem' | '🎯 2026 High Probability'>('🔥 Most Asked in SDSUV');
  const [topicDuration, setTopicDuration] = useState('45 mins');
  const [topicDifficulty, setTopicDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [topicYoutubeUrl, setTopicYoutubeUrl] = useState('');
  const [topicInstructor, setTopicInstructor] = useState('SDSUV Faculty');
  const [topicSummaryEn, setTopicSummaryEn] = useState('');

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (!topicTitleEn.trim()) {
      showToast('Please enter topic title');
      return;
    }

    const videoId = parseYouTubeVideoId(topicYoutubeUrl) || 'r3mR_Z3x_r4';
    const newTopic: TopicItem = {
      id: `topic-custom-${Date.now()}`,
      titleEn: topicTitleEn.trim(),
      titleHi: topicTitleHi.trim() || topicTitleEn.trim(),
      tag: topicTag,
      duration: topicDuration,
      youtubeId: videoId,
      language: 'Hinglish',
      instructorEn: topicInstructor,
      instructorHi: topicInstructor,
      difficulty: topicDifficulty,
      alternativeVideos: [],
      topicPYQs: [],
      quickNotes: {
        summaryEn: topicSummaryEn.trim() || 'Comprehensive revision summary curated for SDSUV exams.',
        summaryHi: 'एसडीएसयूवी परीक्षा हेतु महत्वपूर्ण सारांश।',
        formulas: [],
        coreTakeaways: ['High weightage in university exams', 'Review past year questions'],
      },
    };

    const payload: CustomTopicPayload = {
      id: newTopic.id,
      stream: topicStream,
      semester: topicSemester,
      subjectCode: topicSubjectCode,
      subjectNameEn: topicSubject,
      subjectNameHi: topicSubject,
      unitNumber: topicUnitNum,
      chapterTitleEn: topicChapterEn || `Unit ${topicUnitNum} Core Chapters`,
      chapterTitleHi: topicChapterHi || `इकाई ${topicUnitNum} मुख्य अध्याय`,
      topic: newTopic,
      createdAt: new Date().toISOString(),
    };

    saveCustomTopic(payload);
    showToast(`✅ Topic "${topicTitleEn}" added to ${topicSubjectCode}!`);
    setTopicTitleEn('');
    setTopicTitleHi('');
    setTopicYoutubeUrl('');
    setTopicSummaryEn('');
  };

  // ==========================================================================
  // TAB 2: SMART LECTURE FORM STATE
  // ==========================================================================
  const [lectureYoutubeInput, setLectureYoutubeInput] = useState('');
  const [lectureTitleEn, setLectureTitleEn] = useState('');
  const [lectureTitleHi, setLectureTitleHi] = useState('');
  const [lectureChannel, setLectureChannel] = useState('');
  const [lectureDuration, setLectureDuration] = useState('35:00');
  const [lectureLanguage, setLectureLanguage] = useState<LectureLanguage>('Hinglish');
  const [lectureBadge, setLectureBadge] = useState('🔥 Top Recommendation');
  const [lectureSubjectCode, setLectureSubjectCode] = useState('SDSUV-PHY-201');
  const [lectureTopicId, setLectureTopicId] = useState('t-phy-101');

  // Auto-extracted YouTube Video ID
  const parsedVideoId = useMemo(() => {
    return parseYouTubeVideoId(lectureYoutubeInput);
  }, [lectureYoutubeInput]);

  const handleAddLecture = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parsedVideoId) {
      showToast('Please enter a valid YouTube Video URL or 11-char Video ID');
      return;
    }
    if (!lectureTitleEn.trim()) {
      showToast('Please provide a lecture title');
      return;
    }

    const payload: CustomLecturePayload = {
      id: `lec-custom-${Date.now()}`,
      topicId: lectureTopicId,
      subjectCode: lectureSubjectCode,
      titleEn: lectureTitleEn.trim(),
      titleHi: lectureTitleHi.trim() || lectureTitleEn.trim(),
      channel: lectureChannel.trim() || 'SDSUV Studio',
      duration: lectureDuration,
      youtubeId: parsedVideoId,
      language: lectureLanguage,
      views: '12K views',
      badge: lectureBadge,
      createdAt: new Date().toISOString(),
    };

    saveCustomLecture(payload);
    showToast(`🎬 Lecture "${lectureTitleEn}" saved with extracted thumbnail!`);
    setLectureYoutubeInput('');
    setLectureTitleEn('');
    setLectureTitleHi('');
    setLectureChannel('');
  };

  // ==========================================================================
  // TAB 3: DUAL-LANGUAGE PYQ FORM STATE
  // ==========================================================================
  const [pyqStream, setPyqStream] = useState<StreamType>('bsc-maths');
  const [pyqSubjectCode, setPyqSubjectCode] = useState('SDSUV-PHY-201');
  const [pyqSubjectName, setPyqSubjectName] = useState('Physics (Optics & Quantum Mechanics)');
  const [pyqChapterEn, setPyqChapterEn] = useState('Unit 1: Optics & Interference');
  const [pyqTopicEn, setPyqTopicEn] = useState("Newton's Rings");
  const [pyqQuestionEn, setPyqQuestionEn] = useState('');
  const [pyqQuestionHi, setPyqQuestionHi] = useState('');
  const [pyqMarks, setPyqMarks] = useState<2 | 5 | 10 | 15>(15);
  const [pyqYears, setPyqYears] = useState<number[]>([2024, 2025]);
  const [pyqSolutionEn, setPyqSolutionEn] = useState('');
  const [pyqSolutionHi, setPyqSolutionHi] = useState('');
  const [pyqRubricText, setPyqRubricText] = useState('Diagram & Setup (3 Marks), Derivation (8 Marks), Final Answer (4 Marks)');

  const availableYears = [2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026];

  const toggleYear = (yr: number) => {
    setPyqYears((prev) => (prev.includes(yr) ? prev.filter((y) => y !== yr) : [...prev, yr].sort()));
  };

  const handleAddPYQ = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pyqQuestionEn.trim()) {
      showToast('Please enter the question in English');
      return;
    }

    const section = pyqMarks === 2 ? 'A' : pyqMarks === 5 ? 'B' : 'C';
    const type = pyqMarks === 2 ? 'Short' : pyqMarks === 5 ? 'Medium' : 'Long';
    const isRepeated = pyqYears.length >= 5;

    const newPYQ: DetailedPYQ = {
      id: `pyq-custom-${Date.now()}`,
      stream: pyqStream,
      subjectCode: pyqSubjectCode,
      subjectNameEn: pyqSubjectName,
      subjectNameHi: pyqSubjectName,
      chapterEn: pyqChapterEn,
      chapterHi: pyqChapterEn,
      topicEn: pyqTopicEn,
      topicHi: pyqTopicEn,
      questionEn: pyqQuestionEn.trim(),
      questionHi: pyqQuestionHi.trim() || pyqQuestionEn.trim(),
      marks: pyqMarks,
      section,
      type,
      repeatedCount: pyqYears.length,
      yearsAppeared: pyqYears.length ? pyqYears : [2025],
      frequencyTag: isRepeated ? '🔥 Repeated 5+ Times' : 'SDSUV High-Yield',
      solutionEn: pyqSolutionEn.trim() || 'Step-by-step examination model solution.',
      solutionHi: pyqSolutionHi.trim() || 'विस्तृत परीक्षा मॉडल उत्तर।',
      examinerRubric: pyqRubricText.split(',').map((r) => r.trim()).filter(Boolean),
      learnTopicId: 't-phy-101',
    };

    saveCustomPYQ(newPYQ);
    showToast(`📝 PYQ (${pyqMarks} Marks) added to ${pyqSubjectCode}!`);
    setPyqQuestionEn('');
    setPyqQuestionHi('');
    setPyqSolutionEn('');
    setPyqSolutionHi('');
  };

  // Sample 20-question JSON template loader
  const handleLoadSampleBulkJSON = () => {
    const sampleBatch: DetailedPYQ[] = Array.from({ length: 5 }).map((_, i) => ({
      id: `bulk-pyq-${Date.now()}-${i}`,
      stream: 'bsc-maths',
      subjectCode: 'SDSUV-PHY-201',
      subjectNameEn: 'Physics (Optics & Quantum Mechanics)',
      subjectNameHi: 'भौतिकी (प्रकाशिकी एवं क्वांटम यांत्रिकी)',
      chapterEn: 'Unit 2: Laser & Wave Mechanics',
      chapterHi: 'इकाई 2: लेजर एवं तरंग यांत्रिकी',
      topicEn: `Core Theorem ${i + 1}`,
      topicHi: `मुख्य प्रमेय ${i + 1}`,
      questionEn: `Derive and explain the mathematical formulation for Question ${i + 1} asked in SDSUV university examinations.`,
      questionHi: `एसडीएसयूवी परीक्षा में पूछे गए प्रश्न ${i + 1} के लिए गणितीय व्युत्पत्ति एवं व्याख्या प्रस्तुत कीजिए।`,
      marks: 10,
      section: 'C',
      type: 'Long',
      repeatedCount: 4,
      yearsAppeared: [2021, 2023, 2024, 2025],
      frequencyTag: 'SDSUV High-Yield',
      solutionEn: 'Comprehensive proof adhering strictly to SDSUV marking criteria.',
      solutionHi: 'एसडीएसयूवी अंकन योजना के अनुरूप संपूर्ण प्रामाणिक हल।',
      examinerRubric: ['Introduction (2M)', 'Mathematical steps (5M)', 'Conclusion (3M)'],
      learnTopicId: 't-phy-101',
    }));
    setBulkPYQJson(JSON.stringify(sampleBatch, null, 2));
  };

  const handleExecuteBulkImport = () => {
    try {
      const parsed = JSON.parse(bulkPYQJson);
      if (!Array.isArray(parsed)) throw new Error('Root JSON must be an array of questions');
      const count = bulkImportPYQs(parsed);
      setIsBulkPYQModalOpen(false);
      setBulkPYQJson('');
      showToast(`🚀 Successfully bulk imported ${count} past questions!`);
    } catch (e: any) {
      showToast(`Error: ${e.message}`);
    }
  };

  // ==========================================================================
  // TAB 4: CAREER COMPASS FORM STATE
  // ==========================================================================
  const [careerName, setCareerName] = useState('');
  const [careerShortCode, setCareerShortCode] = useState('');
  const [careerCategory, setCareerCategory] = useState<CareerCategory>('🎖️ Defence Officer');
  const [careerStreams, setCareerStreams] = useState<StreamType[]>(['bsc-maths']);
  const [careerSalaryBand, setCareerSalaryBand] = useState('Level 10 (₹56,100 - ₹1,77,500)');
  const [careerFrequency, setCareerFrequency] = useState('Twice a Year');
  const [careerOverlapPct, setCareerOverlapPct] = useState(90);
  const [careerBody, setCareerBody] = useState('UPSC');
  const [careerTaglineEn, setCareerTaglineEn] = useState('');
  const [careerTaglineHi, setCareerTaglineHi] = useState('');
  const [careerAgeLimit, setCareerAgeLimit] = useState('20 to 24 Years');
  const [careerEduEn, setCareerEduEn] = useState('Degree in BA / BSc from SDSUV');
  const [careerEduHi, setCareerEduHi] = useState('एसडीएसयूवी से स्नातक उपाधि');
  const [careerHillRelaxation, setCareerHillRelaxation] = useState('5 cm height relaxation for Garhwalis and Kumaonis.');

  const toggleCareerStream = (s: StreamType) => {
    setCareerStreams((prev) => (prev.includes(s) ? prev.filter((item) => item !== s) : [...prev, s]));
  };

  const handleAddCareer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!careerName.trim()) {
      showToast('Please enter career name');
      return;
    }
    if (careerStreams.length === 0) {
      showToast('Please select at least one eligible stream');
      return;
    }

    const newCareer: CareerBlueprint = {
      id: `career-custom-${Date.now()}`,
      name: careerName.trim(),
      shortCode: careerShortCode.trim() || careerName.trim(),
      category: careerCategory,
      streams: careerStreams,
      salaryBand: careerSalaryBand,
      examFrequency: careerFrequency,
      syllabusOverlapPct: careerOverlapPct,
      conductingBody: careerBody,
      taglineEn: careerTaglineEn || 'Direct career pathway for SDSUV graduates',
      taglineHi: careerTaglineHi || 'एसडीएसयूवी उपाधि धारकों हेतु सुनहरा अवसर',
      highlights: ['Class-1 Officer Post', 'Permanent Commission', 'Uttarakhand Domicile Perks'],
      eligibility: {
        ageLimit: careerAgeLimit,
        educationEn: careerEduEn,
        educationHi: careerEduHi,
        minimumPercentage: 'Passing Graduation Degree',
        physicalStandardsEn: ['Standard fitness for service', 'Hill height relaxation applicable'],
        physicalStandardsHi: ['सेवा हेतु शारीरिक मानक', 'पर्वतीय क्षेत्र छूट लागू'],
        hillRegionRelaxationEn: careerHillRelaxation,
        hillRegionRelaxationHi: 'उत्तराखंड पर्वतीय अभ्यर्थियों को ऊंचाई में 5 सेमी की विशेष छूट।',
      },
      selectionStages: [
        {
          stageNumber: 1,
          titleEn: 'Written Screening Examination',
          titleHi: 'लिखित स्क्रीनिंग परीक्षा',
          descriptionEn: 'Objective MCQs covering General Studies and subject basics.',
          descriptionHi: 'सामान्य अध्ययन व विषयगत वस्तुनिष्ठ परीक्षा।',
          durationOrMarks: '300 Marks',
          mode: 'Written',
        },
        {
          stageNumber: 2,
          titleEn: 'Interview / Personality Assessment',
          titleHi: 'साक्षात्कार / व्यक्तित्व परीक्षण',
          descriptionEn: 'Selection board assessment.',
          descriptionHi: 'चयन बोर्ड द्वारा साक्षात्कार।',
          durationOrMarks: '150 Marks',
          mode: 'Interview/SSB',
        },
        {
          stageNumber: 3,
          titleEn: 'Medical Examination & Final Merit',
          titleHi: 'स्वास्थ्य परीक्षण एवं अंतिम चयन',
          descriptionEn: 'Comprehensive medical clearance.',
          descriptionHi: 'सैन्य अथवा सिविल स्वास्थ्य परीक्षण।',
          durationOrMarks: 'Qualifying',
          mode: 'Medical',
        },
      ],
      papers: [
        {
          paperNumber: 1,
          nameEn: 'General Studies & Aptitude',
          nameHi: 'सामान्य अध्ययन एवं योग्यता',
          totalMarks: 200,
          duration: '2 Hours',
          topics: [
            { title: 'General Science & History (SDSUV Match)', weight: '100 Marks' },
            { title: 'Aptitude & Reasoning', weight: '100 Marks' },
          ],
        },
      ],
      prepArena: {
        pyqCount: 20,
        playlistCount: 8,
        mockTestCount: 12,
        targetNotificationYear: '2026-27 Active',
      },
    };

    saveCustomCareer(newCareer);
    showToast(`🎖️ Career "${careerName}" published to Career Compass!`);
    setCareerName('');
    setCareerShortCode('');
    setCareerTaglineEn('');
  };

  // ==========================================================================
  // REGISTERED STUDENTS DIRECTORY & CSV EXPORT
  // ==========================================================================
  const filteredStudents = useMemo(() => {
    return registeredStudents.filter((s) => {
      if (studentCourseFilter !== 'all' && s.course !== studentCourseFilter) return false;
      if (studentSemesterFilter !== 'all' && Number(s.semester) !== Number(studentSemesterFilter)) return false;
      if (studentMediumFilter !== 'all' && s.preferred_medium !== studentMediumFilter) return false;
      if (studentSearch.trim()) {
        const q = studentSearch.toLowerCase();
        const matchName = (s.name || '').toLowerCase().includes(q);
        const matchEmail = (s.email || '').toLowerCase().includes(q);
        const matchCollege = (s.college || '').toLowerCase().includes(q);
        const matchGoal = (s.target_goal || '').toLowerCase().includes(q);
        const matchPhone = (s.phone || '').toLowerCase().includes(q);
        const matchSub = (s.selected_subjects || []).some((code) => code.toLowerCase().includes(q));
        if (!matchName && !matchEmail && !matchCollege && !matchGoal && !matchPhone && !matchSub) return false;
      }
      return true;
    });
  }, [registeredStudents, studentCourseFilter, studentSemesterFilter, studentMediumFilter, studentSearch]);

  const handleExportStudentsCSV = () => {
    const listToExport = filteredStudents.length > 0 ? filteredStudents : registeredStudents;
    exportStudentsToCSV(listToExport);
    showToast(`📥 Exported ${listToExport.length} students to CSV!`);
  };

  const handleDeleteStudent = (studentId: string, studentName: string) => {
    if (window.confirm(`Are you sure you want to remove "${studentName}" from registered students?`)) {
      deleteRegisteredStudent(studentId);
      showToast(`🗑️ Removed ${studentName} from student registry.`);
    }
  };

  // ==========================================================================
  // BSC WAITLIST DIRECTORY & CSV EXPORT
  // ==========================================================================
  const filteredWaitlist = useMemo(() => {
    return bscWaitlist.filter((w) => {
      if (waitlistStreamFilter !== 'all' && w.stream !== waitlistStreamFilter) return false;
      if (waitlistSemesterFilter !== 'all' && w.semester !== Number(waitlistSemesterFilter)) return false;
      if (waitlistSearch.trim()) {
        const q = waitlistSearch.toLowerCase();
        const matchName = (w.name || '').toLowerCase().includes(q);
        const matchEmail = (w.email || '').toLowerCase().includes(q);
        const matchCollege = (w.college || '').toLowerCase().includes(q);
        const matchNotes = (w.notes || '').toLowerCase().includes(q);
        if (!matchName && !matchEmail && !matchCollege && !matchNotes) return false;
      }
      return true;
    });
  }, [bscWaitlist, waitlistStreamFilter, waitlistSemesterFilter, waitlistSearch]);

  const handleExportWaitlistCSV = () => {
    const listToExport = filteredWaitlist.length > 0 ? filteredWaitlist : bscWaitlist;
    exportBScWaitlistToCSV(listToExport);
    showToast(`📥 Exported ${listToExport.length} BSc waitlist entries to CSV!`);
  };

  const handleDeleteWaitlist = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from the BSc waitlist?`)) {
      deleteBScWaitlistEntry(id);
      showToast(`🗑️ Removed ${name} from BSc waitlist.`);
    }
  };

  // ==========================================================================
  // BACKUP & FULL DATABASE EXPORT
  // ==========================================================================
  const handleDownloadBackup = () => {
    const jsonStr = exportFullDatabaseJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sdsuv_database_backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('💾 Full database JSON downloaded successfully!');
  };

  const handleImportDatabase = () => {
    if (!importJsonInput.trim()) {
      showToast('Please paste valid JSON');
      return;
    }
    const res = importFullDatabaseJSON(importJsonInput);
    if (res.success) {
      setIsImportModalOpen(false);
      setImportJsonInput('');
      reloadStorage();
      showToast(res.message);
    } else {
      showToast(`Import Error: ${res.message}`);
    }
  };

  const handleResetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all custom items back to factory default?')) {
      resetAllStorageToDefault();
      reloadStorage();
      showToast('🔄 Studio storage reset to clean baseline!');
    }
  };

  // Guard: if checking auth and not authenticated via server or local session, render loading screen
  if (authChecking && !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center p-4">
        <div className="flex flex-col items-center space-y-3 font-mono text-xs text-slate-400">
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span>Verifying cryptographic admin session...</span>
        </div>
      </div>
    );
  }

  // ==========================================================================
  // UNLOCKED CREATOR STUDIO DASHBOARD
  // ==========================================================================
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 himalayan-mesh-bg relative selection:bg-cyan-500 selection:text-black">
      {/* Background Starry Mesh */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-600/10 via-violet-600/10 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Global Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 rounded-2xl bg-cyan-950 border border-cyan-400 text-cyan-200 text-xs font-bold shadow-2xl shadow-cyan-500/30 flex items-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* TOP FLOATING NAV BAR                                                 */}
      {/* ==================================================================== */}
      <header className="sticky top-3 z-40 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="glass-nav rounded-2xl px-4 py-2.5 flex items-center justify-between border border-white/10 shadow-2xl backdrop-blur-2xl">
          {/* Left: Back & Title */}
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center space-x-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span className="hidden sm:inline">Portal</span>
            </Link>

            <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

            <div className="flex items-center space-x-2">
              <AmbassadorCarLogo size={32} />
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-amber-300">
                    CREATOR STUDIO
                  </span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20 font-mono">
                    Admin v1.0
                  </span>
                </div>
                <h1 className="text-xs font-bold text-white truncate max-w-xs">
                  Zero-Code Dynamic Content & Curriculum Hub
                </h1>
              </div>
            </div>
          </div>

          {/* Right: Actions (Backup, Passkey, Lock) */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadBackup}
              title="Export database as JSON"
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-emerald-400 border border-white/10 text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Export JSON</span>
            </button>

            <button
              onClick={() => setIsImportModalOpen(true)}
              title="Import database JSON"
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-amber-300 border border-white/10 text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Upload className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Import JSON</span>
            </button>

            {/* Logged in Administrator Badge */}
            <div className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl bg-violet-950/60 border border-violet-500/30 text-[11px] font-mono text-violet-300">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-bold">{currentAdminUser}</span>
            </div>

            <button
              onClick={() => {
                setNewUsernameInput(currentAdminUser);
                setNewPassInput('');
                setIsChangePassModalOpen(true);
              }}
              title="Update Admin Username & Password"
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-violet-400" />
              <span className="hidden md:inline text-[11px] font-mono">Credentials</span>
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-red-950/70 hover:bg-red-900 text-red-200 border border-red-500/30 text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* MAIN ADMIN WORKSPACE                                                 */}
      {/* ==================================================================== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6 relative z-10">
        {/* Banner with Live Storage Metrics */}
        <div className="rounded-3xl glass-panel p-6 sm:p-7 border border-violet-500/30 relative overflow-hidden bg-gradient-to-r from-[#0d1433] via-[#131b45] to-[#0a0d20] shadow-2xl">
          <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono">
                <Sparkles className="w-4 h-4" />
                <span>DYNAMIC LOCAL STORAGE ENGINE • READY FOR SUPABASE</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                SDSUV Academic Data Management Console
              </h2>
              <p className="text-xs text-slate-300 max-w-2xl mt-1 leading-relaxed">
                Add new syllabus chapters, lecture videos, past exam questions, or career blueprints without writing code. Changes instantly reflect across all live student interfaces.
              </p>
            </div>

            {/* Live Count Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                <span>Topics Added: </span>
                <strong className="text-white">{customTopics.length}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-violet-950/80 border border-violet-500/30 text-violet-300">
                <span>Lectures Added: </span>
                <strong className="text-white">{customLectures.length}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-500/30 text-amber-300">
                <span>PYQs Added: </span>
                <strong className="text-white">{customPYQs.length}</strong>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-300">
                <span>Careers Added: </span>
                <strong className="text-white">{customCareers.length}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* 6 SLEEK MANAGEMENT TABS */}
        <div className="glass-panel p-1.5 rounded-2xl border border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 bg-[#0a0f26]/90 shadow-xl">
          {[
            { id: 'students', label: '👨‍🎓 Registered Students', icon: Users, count: registeredStudents.length },
            { id: 'waitlist', label: '🔔 BSc Waitlist', icon: Bell, count: bscWaitlist.length },
            { id: 'topics', label: '1. Syllabus & Topics', icon: BookOpen, count: customTopics.length },
            { id: 'lectures', label: '2. Smart Lectures', icon: Video, count: customLectures.length },
            { id: 'pyqs', label: '3. Dual PYQ Vault', icon: FileQuestion, count: customPYQs.length },
            { id: 'careers', label: '4. Career Compass', icon: Compass, count: customCareers.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                  if (tab.id === 'students') reloadStudents();
                  if (tab.id === 'waitlist') reloadWaitlist();
                }}
                className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center space-x-2 text-center ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-lg shadow-cyan-500/25 scale-[1.01]'
                    : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono ${isActive ? 'bg-black/40 text-cyan-200' : 'bg-white/10 text-slate-300'}`}>
                    +{tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* ================================================================== */}
        {/* TAB 0: 👨‍🎓 REGISTERED STUDENTS DIRECTORY (Live Sign-ups & Enrollees) */}
        {/* ================================================================== */}
        {activeTab === 'students' && (
          <div className="space-y-6">
            {/* 4 Live Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Total Students Signed Up */}
              <div className="rounded-2xl glass-panel p-4 sm:p-5 border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-[#0a1128] to-[#070a18] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Total Students Signed Up
                  </span>
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    <Users className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono">
                  {registeredStudents.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Enrolled Platform Profiles</span>
                  <span className="text-emerald-400 font-semibold font-mono">● Live Sync</span>
                </div>
              </div>

              {/* Card 2: BSc (Maths) Students */}
              <div className="rounded-2xl glass-panel p-4 sm:p-5 border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-[#0a1128] to-[#070a18] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400">
                    BSc (Maths) Students
                  </span>
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    <Calculator className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono">
                  {registeredStudents.filter((s) => s.course === 'bsc-maths').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Maths / Physics / Stats</span>
                  <span className="text-blue-300 font-bold font-mono">
                    {Math.round(
                      (registeredStudents.filter((s) => s.course === 'bsc-maths').length /
                        (registeredStudents.length || 1)) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>

              {/* Card 3: BSc (Bio) Students */}
              <div className="rounded-2xl glass-panel p-4 sm:p-5 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-[#0a1128] to-[#070a18] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    BSc (Bio) Students
                  </span>
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Dna className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono">
                  {registeredStudents.filter((s) => s.course === 'bsc-bio').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Botany / Zoology / Chem</span>
                  <span className="text-emerald-300 font-bold font-mono">
                    {Math.round(
                      (registeredStudents.filter((s) => s.course === 'bsc-bio').length /
                        (registeredStudents.length || 1)) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>

              {/* Card 4: BA Students */}
              <div className="rounded-2xl glass-panel p-4 sm:p-5 border border-amber-500/30 bg-gradient-to-br from-amber-950/40 via-[#0a1128] to-[#070a18] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-400">
                    BA Students
                  </span>
                  <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    <Library className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono">
                  {registeredStudents.filter((s) => s.course === 'ba-arts').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Pol Sci / History / Eco</span>
                  <span className="text-amber-300 font-bold font-mono">
                    {Math.round(
                      (registeredStudents.filter((s) => s.course === 'ba-arts').length /
                        (registeredStudents.length || 1)) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Filter, Search & Export Bar */}
            <div className="rounded-3xl glass-panel p-4 sm:p-5 border border-white/10 bg-[#090e24] shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-cyan-400" />
                    <span>Registered Students Directory</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Live student profiles captured from the /auth Sign Up flow and stored locally & cloud synced.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => setIsAddStudentModalOpen(true)}
                    className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow-lg shadow-cyan-500/25 transition-all hover:scale-105"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Register Student Manually</span>
                  </button>

                  <button
                    onClick={handleExportStudentsCSV}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center space-x-2 shadow-lg shadow-emerald-600/25 transition-all hover:scale-105"
                    title="Export all students to CSV (Excel format)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Students to CSV</span>
                  </button>

                  <button
                    onClick={() => {
                      reloadStudents();
                      showToast('🔄 Student roster refreshed!');
                    }}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 text-xs font-mono"
                    title="Refresh student list"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Filters Control Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-white/5">
                {/* Search Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={(e) => setStudentSearch(e.target.value)}
                    placeholder="Search by name, email, college, goal..."
                    className="w-full pl-9 pr-3 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  {studentSearch && (
                    <button
                      onClick={() => setStudentSearch('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Course Filter */}
                <div>
                  <select
                    value={studentCourseFilter}
                    onChange={(e) => setStudentCourseFilter(e.target.value as any)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="all">All Courses / Streams</option>
                    <option value="bsc-maths">B.Sc (Maths Group)</option>
                    <option value="bsc-bio">B.Sc (Bio Group)</option>
                    <option value="ba-arts">B.A (Arts Group)</option>
                  </select>
                </div>

                {/* Semester Filter */}
                <div>
                  <select
                    value={studentSemesterFilter}
                    onChange={(e) => setStudentSemesterFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="all">All Semesters (Sem 1 - 6)</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                  </select>
                </div>

                {/* Medium Filter */}
                <div>
                  <select
                    value={studentMediumFilter}
                    onChange={(e) => setStudentMediumFilter(e.target.value as any)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="all">All Mediums</option>
                    <option value="en">🇬🇧 English Medium</option>
                    <option value="hi">🇮🇳 Hindi Medium (हिंदी)</option>
                  </select>
                </div>
              </div>

              {/* Status and Active Filters Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1 font-mono">
                <div className="flex items-center space-x-2">
                  <span>
                    Showing <strong className="text-cyan-300">{filteredStudents.length}</strong> of{' '}
                    <strong className="text-white">{registeredStudents.length}</strong> students
                  </span>
                  {(studentSearch ||
                    studentCourseFilter !== 'all' ||
                    studentSemesterFilter !== 'all' ||
                    studentMediumFilter !== 'all') && (
                    <button
                      onClick={() => {
                        setStudentSearch('');
                        setStudentCourseFilter('all');
                        setStudentSemesterFilter('all');
                        setStudentMediumFilter('all');
                      }}
                      className="text-[11px] text-amber-400 hover:underline ml-2"
                    >
                      Reset All Filters
                    </button>
                  )}
                </div>

                <span className="text-[10px] text-slate-500">
                  Synced in real-time across tabs &amp; storage
                </span>
              </div>
            </div>

            {/* Students Table */}
            <div className="rounded-3xl glass-panel border border-white/10 overflow-hidden bg-[#080d22]/90 shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/60 border-b border-white/10 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Student Name &amp; College</th>
                      <th className="py-3.5 px-4 font-bold">Email &amp; Contact</th>
                      <th className="py-3.5 px-4 font-bold">Course</th>
                      <th className="py-3.5 px-3 font-bold text-center">Semester</th>
                      <th className="py-3.5 px-4 font-bold">Subjects Chosen</th>
                      <th className="py-3.5 px-4 font-bold">Target Ambition</th>
                      <th className="py-3.5 px-3 font-bold text-center">Medium</th>
                      <th className="py-3.5 px-4 font-bold">Joined Date</th>
                      <th className="py-3.5 px-3 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredStudents.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-slate-400">
                          <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                          <p className="text-xs font-bold text-white">No registered students found</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Try adjusting your search query or filters.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredStudents.map((student) => {
                        return (
                          <tr key={student.id} className="hover:bg-white/[0.03] transition-colors group">
                            {/* Name & College */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-2.5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-xs shrink-0 shadow-sm">
                                  {student.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-white text-xs truncate max-w-[180px]">
                                    {student.name}
                                  </div>
                                  <div className="text-[10px] text-slate-400 truncate max-w-[200px]" title={student.college}>
                                    {student.college || 'SDSUV Campus'}
                                  </div>
                                  <span
                                    className={`inline-block px-1.5 py-0.2 mt-0.5 rounded text-[8px] font-mono font-bold ${
                                      student.source === 'waitlist'
                                        ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                                        : student.source === 'onboarding'
                                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
                                        : student.source === 'sample'
                                        ? 'bg-slate-800 text-slate-400 border border-white/10'
                                        : 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                                    }`}
                                  >
                                    {student.source === 'waitlist'
                                      ? '🔔 BSc Waitlist'
                                      : student.source === 'onboarding'
                                      ? '✨ Onboarding'
                                      : student.source === 'sample'
                                      ? 'Sample Benchmark'
                                      : '⚡ Direct Sign-Up'}
                                  </span>
                                </div>
                              </div>
                            </td>

                            {/* Email & Contact */}
                            <td className="py-3.5 px-4 font-mono text-[11px]">
                              <a
                                href={`mailto:${student.email}`}
                                className="text-cyan-300 hover:text-cyan-200 hover:underline truncate max-w-[190px] block"
                              >
                                {student.email}
                              </a>
                              {student.phone && (
                                <div className="flex items-center space-x-1 text-[10px] text-emerald-400 mt-0.5">
                                  <Phone className="w-3 h-3 text-emerald-400 shrink-0" />
                                  <span>{student.phone}</span>
                                </div>
                              )}
                            </td>

                            {/* Course */}
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                                  student.course === 'bsc-maths'
                                    ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                                    : student.course === 'bsc-bio'
                                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                    : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                                }`}
                              >
                                {student.course === 'bsc-maths'
                                  ? 'BSc Maths'
                                  : student.course === 'bsc-bio'
                                  ? 'BSc Bio'
                                  : 'BA Arts'}
                              </span>
                            </td>

                            {/* Semester */}
                            <td className="py-3.5 px-3 text-center">
                              <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/10 font-mono text-[10px] text-slate-300">
                                Sem {student.semester}
                              </span>
                            </td>

                            {/* Subjects Chosen */}
                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {(student.selected_subjects || []).map((subCode, i) => (
                                  <span
                                    key={i}
                                    className="px-1.5 py-0.5 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-cyan-300"
                                    title={subCode}
                                  >
                                    {subCode.replace('SDSUV-', '')}
                                  </span>
                                ))}
                              </div>
                            </td>

                            {/* Target Ambition */}
                            <td className="py-3.5 px-4">
                              <span
                                className="px-2 py-1 rounded-lg bg-black/60 border border-white/10 text-[10px] text-slate-300 font-medium inline-block max-w-[170px] truncate"
                                title={student.target_goal || 'SDSUV Academic Excellence'}
                              >
                                🎯 {student.target_goal || 'SDSUV Top Rank'}
                              </span>
                            </td>

                            {/* Medium */}
                            <td className="py-3.5 px-3 text-center">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  student.preferred_medium === 'en'
                                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/20'
                                    : 'bg-amber-950 text-amber-300 border border-amber-500/20'
                                }`}
                              >
                                {student.preferred_medium === 'en' ? '🇬🇧 English' : '🇮🇳 Hindi'}
                              </span>
                            </td>

                            {/* Joined Date */}
                            <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400 whitespace-nowrap">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-slate-500" />
                                <span>
                                  {new Date(student.created_at).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            </td>

                            {/* Action */}
                            <td className="py-3.5 px-3 text-center">
                              <div className="flex items-center justify-center space-x-1">
                                <button
                                  onClick={() => setSelectedStudentForModal(student)}
                                  className="p-1.5 rounded-lg text-cyan-400 hover:text-white hover:bg-cyan-950/50 transition-colors"
                                  title="View Full Student Details"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteStudent(student.id, student.name)}
                                  className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                                  title="Remove student"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 0.5: 🔔 BSC WAITLIST DIRECTORY (Maths & Bio Phase 2 Queue)     */}
        {/* ================================================================== */}
        {activeTab === 'waitlist' && (
          <div className="space-y-6">
            {/* 3 Live Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Card 1: Total BSc Waitlist Entries */}
              <div className="rounded-2xl glass-panel p-4 sm:p-5 border border-cyan-500/30 bg-gradient-to-br from-cyan-950/40 via-[#0a1128] to-[#070a18] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-cyan-400">
                    Total BSc Waitlist Queued
                  </span>
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    <Bell className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono">
                  {bscWaitlist.length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Phase 2 Notification Queue</span>
                  <span className="text-cyan-400 font-semibold font-mono">● Active Waitlist</span>
                </div>
              </div>

              {/* Card 2: BSc Maths (PCM) Waitlist */}
              <div className="rounded-2xl glass-panel p-4 sm:p-5 border border-blue-500/30 bg-gradient-to-br from-blue-950/40 via-[#0a1128] to-[#070a18] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-400">
                    BSc Maths (PCM) Waitlist
                  </span>
                  <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    <Calculator className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono">
                  {bscWaitlist.filter((w) => w.stream === 'bsc-maths').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Physics / Maths / Chemistry</span>
                  <span className="text-blue-300 font-bold font-mono">
                    {Math.round(
                      (bscWaitlist.filter((w) => w.stream === 'bsc-maths').length /
                        (bscWaitlist.length || 1)) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>

              {/* Card 3: BSc Bio (CBZ) Waitlist */}
              <div className="rounded-2xl glass-panel p-4 sm:p-5 border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-[#0a1128] to-[#070a18] shadow-xl relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                    BSc Bio (CBZ) Waitlist
                  </span>
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    <Dna className="w-4 h-4" />
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white mt-2 font-mono">
                  {bscWaitlist.filter((w) => w.stream === 'bsc-bio').length}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center justify-between">
                  <span>Botany / Zoology / Chemistry</span>
                  <span className="text-emerald-300 font-bold font-mono">
                    {Math.round(
                      (bscWaitlist.filter((w) => w.stream === 'bsc-bio').length /
                        (bscWaitlist.length || 1)) *
                        100
                    )}
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Filter, Search & Export Bar */}
            <div className="rounded-3xl glass-panel p-4 sm:p-5 border border-white/10 bg-[#090e24] shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-extrabold text-white flex items-center space-x-2">
                    <Bell className="w-4 h-4 text-cyan-400" />
                    <span>BSc Students Waitlist Directory</span>
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Students from locked BSc (Maths &amp; Bio) course cards requesting launch notification and early access.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleExportWaitlistCSV}
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-lg shadow-cyan-600/25 transition-all hover:scale-105"
                    title="Export all waitlist entries to CSV (Excel format)"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Export Waitlist to CSV</span>
                  </button>

                  <button
                    onClick={() => {
                      reloadWaitlist();
                      showToast('🔄 BSc waitlist roster refreshed!');
                    }}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 text-xs font-mono"
                    title="Refresh waitlist"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Filters Control Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/5">
                {/* Search Input */}
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="text"
                    value={waitlistSearch}
                    onChange={(e) => setWaitlistSearch(e.target.value)}
                    placeholder="Search by student name, email, campus..."
                    className="w-full pl-9 pr-3 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  {waitlistSearch && (
                    <button
                      onClick={() => setWaitlistSearch('')}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Target Stream Filter */}
                <div>
                  <select
                    value={waitlistStreamFilter}
                    onChange={(e) => setWaitlistStreamFilter(e.target.value as any)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="all">All BSc Streams (PCM &amp; CBZ)</option>
                    <option value="bsc-maths">BSc (Maths Group - PCM)</option>
                    <option value="bsc-bio">BSc (Bio Group - CBZ)</option>
                  </select>
                </div>

                {/* Semester Filter */}
                <div>
                  <select
                    value={waitlistSemesterFilter}
                    onChange={(e) => setWaitlistSemesterFilter(e.target.value)}
                    className="w-full px-3 py-2 bg-black/50 border border-white/10 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-400"
                  >
                    <option value="all">All Semesters (Sem 1 to 6)</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                    <option value="3">Semester 3</option>
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                  </select>
                </div>
              </div>

              {/* Waitlist Data Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black/60 border-b border-white/10 text-slate-400 font-mono text-[10px] uppercase tracking-wider">
                    <tr>
                      <th className="py-3.5 px-4 font-bold">Student Name &amp; College</th>
                      <th className="py-3.5 px-4 font-bold">Email</th>
                      <th className="py-3.5 px-4 font-bold">Target Stream</th>
                      <th className="py-3.5 px-3 font-bold text-center">Semester</th>
                      <th className="py-3.5 px-4 font-bold">Notes / Ambition</th>
                      <th className="py-3.5 px-4 font-bold">Joined Date</th>
                      <th className="py-3.5 px-3 font-bold text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredWaitlist.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                          <p className="text-xs font-bold text-white">No waitlist entries found</p>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            Try adjusting your search query or filters.
                          </p>
                        </td>
                      </tr>
                    ) : (
                      filteredWaitlist.map((entry) => {
                        return (
                          <tr key={entry.id} className="hover:bg-white/[0.03] transition-colors group">
                            {/* Name & College */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center space-x-2.5">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-xs shrink-0 shadow-sm">
                                  {(entry.name || 'S').charAt(0).toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-white text-xs truncate max-w-[180px]">
                                    {entry.name}
                                  </div>
                                  <div
                                    className="text-[10px] text-slate-400 truncate max-w-[200px]"
                                    title={entry.college}
                                  >
                                    {entry.college || 'SDSUV Campus'}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Email */}
                            <td className="py-3.5 px-4 font-mono text-[11px]">
                              <a
                                href={`mailto:${entry.email}`}
                                className="text-cyan-300 hover:text-cyan-200 hover:underline truncate max-w-[190px] block"
                              >
                                {entry.email}
                              </a>
                            </td>

                            {/* Target Stream */}
                            <td className="py-3.5 px-4">
                              <span
                                className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                                  entry.stream === 'bsc-maths'
                                    ? 'bg-blue-950 text-blue-300 border border-blue-500/30'
                                    : 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                                }`}
                              >
                                {entry.stream === 'bsc-maths' ? '📐 BSc Maths (PCM)' : '🧬 BSc Bio (CBZ)'}
                              </span>
                            </td>

                            {/* Semester */}
                            <td className="py-3.5 px-3 text-center">
                              <span className="px-2 py-0.5 rounded-full bg-black/60 border border-white/10 font-mono text-[10px] text-slate-300 font-bold">
                                Sem {entry.semester}
                              </span>
                            </td>

                            {/* Notes */}
                            <td className="py-3.5 px-4 text-[11px] text-slate-300 max-w-[220px] truncate" title={entry.notes}>
                              {entry.notes || 'Interested in BSc Phase 2 Access'}
                            </td>

                            {/* Joined Date */}
                            <td className="py-3.5 px-4 font-mono text-[10px] text-slate-400 whitespace-nowrap">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-3 h-3 text-slate-500" />
                                <span>
                                  {new Date(entry.createdAt).toLocaleDateString('en-IN', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })}
                                </span>
                              </div>
                            </td>

                            {/* Action */}
                            <td className="py-3.5 px-3 text-center">
                              <button
                                onClick={() => handleDeleteWaitlist(entry.id, entry.name)}
                                className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-950/30 transition-colors"
                                title="Remove waitlist entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 1: SYLLABUS & TOPIC MANAGER                                    */}
        {/* ================================================================== */}
        {activeTab === 'topics' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left 2 Cols: Form */}
            <div className="lg:col-span-2 rounded-3xl glass-panel p-6 border border-white/10 space-y-5 bg-[#0b1028]">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <BookOpen className="w-5 h-5" />
                  <h3 className="font-bold text-white text-base">Add New Topic to Syllabus</h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Hierarchy: Stream → Sem → Subject → Unit</span>
              </div>

              <form onSubmit={handleAddTopic} className="space-y-4 text-xs">
                {/* Row 1: Stream, Semester, Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Degree Stream</label>
                    <select
                      value={topicStream}
                      onChange={(e) => setTopicStream(e.target.value as StreamType)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="bsc-maths">BSc Maths (PCM)</option>
                      <option value="bsc-bio">BSc Bio (CBZ)</option>
                      <option value="ba-arts">BA Arts (Humanities)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Semester</label>
                    <select
                      value={topicSemester}
                      onChange={(e) => setTopicSemester(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      {[1, 2, 3, 4, 5, 6].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Unit Level</label>
                    <select
                      value={topicUnitNum}
                      onChange={(e) => setTopicUnitNum(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      {[1, 2, 3, 4, 5].map((u) => (
                        <option key={u} value={u}>
                          Unit {u}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Subject Selector & Code */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Subject Name</label>
                    <input
                      type="text"
                      value={topicSubject}
                      onChange={(e) => setTopicSubject(e.target.value)}
                      placeholder="e.g. Physics: Modern Optics & Quantum"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Subject Code</label>
                    <input
                      type="text"
                      value={topicSubjectCode}
                      onChange={(e) => setTopicSubjectCode(e.target.value)}
                      placeholder="e.g. SDSUV-PHY-201"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>
                </div>

                {/* Chapter Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Chapter (English)</label>
                    <input
                      type="text"
                      value={topicChapterEn}
                      onChange={(e) => setTopicChapterEn(e.target.value)}
                      placeholder="e.g. Interference in Thin Films"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">अध्याय (हिंदी)</label>
                    <input
                      type="text"
                      value={topicChapterHi}
                      onChange={(e) => setTopicChapterHi(e.target.value)}
                      placeholder="e.g. पतली फिल्मों में व्यतिकरण"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Topic Title */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Topic Name (English) *</label>
                    <input
                      type="text"
                      value={topicTitleEn}
                      onChange={(e) => setTopicTitleEn(e.target.value)}
                      placeholder="e.g. Newton's Rings & Diameter Derivations"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-medium"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">विषय शीर्षक (हिंदी)</label>
                    <input
                      type="text"
                      value={topicTitleHi}
                      onChange={(e) => setTopicTitleHi(e.target.value)}
                      placeholder="e.g. न्यूटन वलय एवं व्यास व्युत्पत्ति"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Tags, Duration, Difficulty */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Exam Tag</label>
                    <select
                      value={topicTag}
                      onChange={(e) => setTopicTag(e.target.value as any)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="🔥 Most Asked in SDSUV">🔥 Most Asked in SDSUV</option>
                      <option value="⚡ Easy Scoring">⚡ Easy Scoring</option>
                      <option value="💎 10-Mark Theorem">💎 10-Mark Theorem</option>
                      <option value="🎯 2026 High Probability">🎯 2026 High Probability</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Duration</label>
                    <input
                      type="text"
                      value={topicDuration}
                      onChange={(e) => setTopicDuration(e.target.value)}
                      placeholder="e.g. 45 mins"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Difficulty</label>
                    <select
                      value={topicDifficulty}
                      onChange={(e) => setTopicDifficulty(e.target.value as any)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                {/* Optional YouTube & Quick Notes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">
                      YouTube URL or Video ID
                    </label>
                    <input
                      type="text"
                      value={topicYoutubeUrl}
                      onChange={(e) => setTopicYoutubeUrl(e.target.value)}
                      placeholder="https://youtube.com/watch?v=..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Instructor</label>
                    <input
                      type="text"
                      value={topicInstructor}
                      onChange={(e) => setTopicInstructor(e.target.value)}
                      placeholder="e.g. Dr. H.C. Verma / NPTEL"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Quick Revision Summary</label>
                  <textarea
                    rows={2}
                    value={topicSummaryEn}
                    onChange={(e) => setTopicSummaryEn(e.target.value)}
                    placeholder="Key concepts, formula highlight or revision advice for students..."
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Topic to Syllabus</span>
                </button>
              </form>
            </div>

            {/* Right Col: Live Custom Topics List */}
            <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4 bg-[#0a0f26] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Custom Topics ({customTopics.length})</span>
                  </h4>
                  <span className="text-[10px] font-mono text-emerald-400">Live on /learn</span>
                </div>

                <div className="mt-4 space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {customTopics.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      No custom topics added yet. Fill out the form to add your first chapter!
                    </div>
                  ) : (
                    customTopics.map((item) => (
                      <div
                        key={item.id}
                        className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-cyan-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono font-bold">
                            {item.topic.tag}
                          </span>
                          <button
                            onClick={() => deleteCustomTopic(item.id)}
                            className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                            title="Delete topic"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h5 className="font-bold text-white text-xs">{item.topic.titleEn}</h5>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
                          <span>{item.subjectCode} • Unit {item.unitNumber}</span>
                          <span>{item.topic.duration}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400">
                Topics are stored in local state and automatically integrate into <Link href="/learn" className="text-cyan-400 underline font-semibold">/learn Lecture Studio</Link>.
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 2: SMART LECTURE UPLOADER                                       */}
        {/* ================================================================== */}
        {activeTab === 'lectures' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 rounded-3xl glass-panel p-6 border border-white/10 space-y-5 bg-[#0b1028]">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-violet-400">
                  <Video className="w-5 h-5" />
                  <h3 className="font-bold text-white text-base">Smart YouTube Lecture Uploader</h3>
                </div>
                <span className="text-[10px] font-mono text-cyan-400">Auto-Extracts HD Video Thumbnail</span>
              </div>

              <form onSubmit={handleAddLecture} className="space-y-4 text-xs">
                {/* YouTube URL with live thumbnail detection */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                    <YoutubeIcon className="w-3.5 h-3.5 text-red-500" />
                    <span>YouTube URL or 11-Digit Video ID *</span>
                  </label>
                  <input
                    type="text"
                    value={lectureYoutubeInput}
                    onChange={(e) => setLectureYoutubeInput(e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ or dQw4w9WgXcQ"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-violet-400 font-mono"
                    required
                  />
                  {parsedVideoId && (
                    <div className="text-[10px] font-mono text-emerald-400 flex items-center space-x-1 pt-1">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Parsed Video ID: {parsedVideoId}</span>
                    </div>
                  )}
                </div>

                {/* Auto Extracted Thumbnail Preview Card */}
                {parsedVideoId && (
                  <div className="p-3 rounded-2xl bg-black/60 border border-violet-500/40 flex items-center space-x-4">
                    <div className="relative w-36 h-20 rounded-xl overflow-hidden shrink-0 border border-white/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={`https://img.youtube.com/vi/${parsedVideoId}/hqdefault.jpg`}
                        alt="Extracted thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <YoutubeIcon className="w-6 h-6 text-red-500 drop-shadow" />
                      </div>
                    </div>
                    <div className="space-y-1 text-xs">
                      <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold block">
                        HD Thumbnail Extracted
                      </span>
                      <p className="text-slate-300 line-clamp-1 font-semibold">
                        {lectureTitleEn || 'Lecture Video Ready for Studio Embedding'}
                      </p>
                      <span className="text-[10px] font-mono text-slate-500">
                        Language: {lectureLanguage} • {lectureDuration}
                      </span>
                    </div>
                  </div>
                )}

                {/* Lecture Title (English & Hindi) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Lecture Title (English) *</label>
                    <input
                      type="text"
                      value={lectureTitleEn}
                      onChange={(e) => setLectureTitleEn(e.target.value)}
                      placeholder="e.g. Newton's Rings Complete Derivation & PYQ Analysis"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-400"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">व्याख्यान शीर्षक (हिंदी)</label>
                    <input
                      type="text"
                      value={lectureTitleHi}
                      onChange={(e) => setLectureTitleHi(e.target.value)}
                      placeholder="e.g. न्यूटन वलय संपूर्ण व्युत्पत्ति एवं विगत वर्ष प्रश्न"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-400"
                    />
                  </div>
                </div>

                {/* Channel Name, Duration, and Language */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Channel / Educator</label>
                    <input
                      type="text"
                      value={lectureChannel}
                      onChange={(e) => setLectureChannel(e.target.value)}
                      placeholder="e.g. Physics Wallah / NPTEL"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Duration</label>
                    <input
                      type="text"
                      value={lectureDuration}
                      onChange={(e) => setLectureDuration(e.target.value)}
                      placeholder="e.g. 38:15"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Language Tag *</label>
                    <select
                      value={lectureLanguage}
                      onChange={(e) => setLectureLanguage(e.target.value as LectureLanguage)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-400 font-bold"
                    >
                      <option value="Hinglish">🗣️ Hinglish (Smart Mix)</option>
                      <option value="English">🇬🇧 Pure English</option>
                      <option value="Hindi">🇮🇳 Pure Hindi</option>
                    </select>
                  </div>
                </div>

                {/* Subject Mapping */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Link to Subject</label>
                    <select
                      value={lectureSubjectCode}
                      onChange={(e) => setLectureSubjectCode(e.target.value)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-400 font-mono"
                    >
                      <option value="SDSUV-PHY-201">SDSUV-PHY-201 (Modern Optics & Quantum)</option>
                      <option value="SDSUV-MTH-201">SDSUV-MTH-201 (Linear Algebra & Diff Eq)</option>
                      <option value="SDSUV-CHM-201">SDSUV-CHM-201 (Inorganic & Physical)</option>
                      <option value="SDSUV-BOT-201">SDSUV-BOT-201 (Plant Ecology & Taxonomy)</option>
                      <option value="SDSUV-HIS-201">SDSUV-HIS-201 (Ancient & Medieval India)</option>
                      <option value="SDSUV-POL-201">SDSUV-POL-201 (Indian Political Thought)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Highlight Badge</label>
                    <input
                      type="text"
                      value={lectureBadge}
                      onChange={(e) => setLectureBadge(e.target.value)}
                      placeholder="e.g. 🔥 Most Popular in SDSUV"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-violet-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white font-black text-xs shadow-lg shadow-violet-500/25 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
                >
                  <Video className="w-4 h-4" />
                  <span>Publish Lecture Video to Cinema Studio</span>
                </button>
              </form>
            </div>

            {/* Right: Uploaded Lectures List */}
            <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4 bg-[#0a0f26] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <YoutubeIcon className="w-4 h-4 text-red-400" />
                    <span>Custom Lectures ({customLectures.length})</span>
                  </h4>
                  <span className="text-[10px] font-mono text-violet-400">Live on /learn</span>
                </div>

                <div className="mt-4 space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {customLectures.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      No custom lectures uploaded yet. Paste a YouTube URL to extract its thumbnail!
                    </div>
                  ) : (
                    customLectures.map((lec) => (
                      <div
                        key={lec.id}
                        className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-violet-500/30 transition-colors flex items-center space-x-3"
                      >
                        <div className="relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border border-white/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://img.youtube.com/vi/${lec.youtubeId}/hqdefault.jpg`}
                            alt={lec.titleEn}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-bold text-white text-xs truncate">{lec.titleEn}</h5>
                          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 mt-0.5">
                            <span className="text-cyan-400">{lec.language}</span>
                            <span>•</span>
                            <span>{lec.channel}</span>
                            <span>•</span>
                            <span>{lec.duration}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteCustomLecture(lec.id)}
                          className="p-1 text-slate-500 hover:text-red-400 transition-colors shrink-0"
                          title="Delete lecture"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400">
                Lectures obey the student’s top-bar language settings and appear in the Cinema-Mode Studio carousel.
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 3: DUAL-LANGUAGE PYQ UPLOADER                                  */}
        {/* ================================================================== */}
        {activeTab === 'pyqs' && (
          <div className="space-y-6">
            {/* Action Bar with Bulk Import Button */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-white/10 bg-[#0c1230]">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center space-x-2">
                  <FileQuestion className="w-4 h-4 text-amber-400" />
                  <span>Dual-Language Past Year Question Vault Manager</span>
                </h3>
                <p className="text-xs text-slate-400">
                  Add SDSUV university exam questions with bilingual text, marking rubrics, and year appearances.
                </p>
              </div>

              <button
                onClick={() => {
                  setIsBulkPYQModalOpen(true);
                  if (!bulkPYQJson) handleLoadSampleBulkJSON();
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center space-x-1.5"
              >
                <Upload className="w-4 h-4" />
                <span>Bulk JSON Import (20+ Questions)</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Form */}
              <div className="lg:col-span-2 rounded-3xl glass-panel p-6 border border-white/10 space-y-4 bg-[#0b1028]">
                <form onSubmit={handleAddPYQ} className="space-y-4 text-xs">
                  {/* Subject & Stream */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Stream</label>
                      <select
                        value={pyqStream}
                        onChange={(e) => setPyqStream(e.target.value as StreamType)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                      >
                        <option value="bsc-maths">BSc Maths</option>
                        <option value="bsc-bio">BSc Bio</option>
                        <option value="ba-arts">BA Arts</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Subject Code</label>
                      <input
                        type="text"
                        value={pyqSubjectCode}
                        onChange={(e) => setPyqSubjectCode(e.target.value)}
                        placeholder="SDSUV-PHY-201"
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Marks Weightage</label>
                      <select
                        value={pyqMarks}
                        onChange={(e) => setPyqMarks(Number(e.target.value) as any)}
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-bold"
                      >
                        <option value={2}>2 Marks (Section A: Very Short)</option>
                        <option value={5}>5 Marks (Section B: Short Answer)</option>
                        <option value={10}>10 Marks (Section C: Long Answer)</option>
                        <option value={15}>15 Marks (Section C: Major Theorem)</option>
                      </select>
                    </div>
                  </div>

                  {/* Chapter & Topic Mapping */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Chapter Mapping</label>
                      <input
                        type="text"
                        value={pyqChapterEn}
                        onChange={(e) => setPyqChapterEn(e.target.value)}
                        placeholder="e.g. Unit 1: Optics & Interference"
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Topic Mapping</label>
                      <input
                        type="text"
                        value={pyqTopicEn}
                        onChange={(e) => setPyqTopicEn(e.target.value)}
                        placeholder="e.g. Newton's Rings Formula"
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Question Text in English */}
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">
                      Question Text in English *
                    </label>
                    <textarea
                      rows={3}
                      value={pyqQuestionEn}
                      onChange={(e) => setPyqQuestionEn(e.target.value)}
                      placeholder="State the principle of division of amplitude. Derive formula for Newton's rings..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  {/* Question Text in Hindi */}
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">
                      प्रश्न (हिंदी अनुवाद) *
                    </label>
                    <textarea
                      rows={3}
                      value={pyqQuestionHi}
                      onChange={(e) => setPyqQuestionHi(e.target.value)}
                      placeholder="आयाम विभाजन का सिद्धांत लिखिए। परावर्तित प्रकाश में न्यूटन वलय के व्यास का सूत्र व्युत्पन्न कीजिए..."
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {/* Years Asked Checkboxes */}
                  <div className="space-y-1.5 p-3 rounded-2xl bg-black/40 border border-white/5">
                    <div className="flex items-center justify-between">
                      <label className="text-slate-300 font-mono text-[11px] uppercase font-bold">
                        Years Appeared in SDSUV Exams
                      </label>
                      {pyqYears.length >= 5 && (
                        <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-amber-950 text-amber-300 font-bold border border-amber-500/20">
                          🔥 Repeated 5+ Times Auto-Tagged
                        </span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-1">
                      {availableYears.map((yr) => {
                        const isChecked = pyqYears.includes(yr);
                        return (
                          <button
                            type="button"
                            key={yr}
                            onClick={() => toggleYear(yr)}
                            className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border transition-all ${
                              isChecked
                                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
                                : 'bg-black/60 text-slate-400 border-white/5 hover:text-white'
                            }`}
                          >
                            {yr}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Model Solution (English & Hindi) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Model Solution (English)</label>
                      <textarea
                        rows={2}
                        value={pyqSolutionEn}
                        onChange={(e) => setPyqSolutionEn(e.target.value)}
                        placeholder="Comprehensive marking answer..."
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">मॉडल उत्तर (हिंदी)</label>
                      <textarea
                        rows={2}
                        value={pyqSolutionHi}
                        onChange={(e) => setPyqSolutionHi(e.target.value)}
                        placeholder="विस्तृत मॉडल उत्तर..."
                        className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  {/* Examiner Rubric */}
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">
                      Examiner Scoring Rubric (comma separated)
                    </label>
                    <input
                      type="text"
                      value={pyqRubricText}
                      onChange={(e) => setPyqRubricText(e.target.value)}
                      placeholder="Diagram (3 Marks), Derivation (8 Marks), Final Answer (4 Marks)"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Save Question to PYQ Vault</span>
                  </button>
                </form>
              </div>

              {/* Right: Custom PYQs list */}
              <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4 bg-[#0a0f26] flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                      <FileQuestion className="w-4 h-4 text-amber-400" />
                      <span>Custom PYQs Added ({customPYQs.length})</span>
                    </h4>
                    <span className="text-[10px] font-mono text-amber-400">Live on /pyqs</span>
                  </div>

                  <div className="mt-4 space-y-3 max-h-[500px] overflow-y-auto pr-1">
                    {customPYQs.length === 0 ? (
                      <div className="p-8 text-center text-slate-500 text-xs">
                        No custom questions added yet. Use the form or Bulk JSON Import to add past exam questions.
                      </div>
                    ) : (
                      customPYQs.map((q) => (
                        <div
                          key={q.id}
                          className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-amber-500/30 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <span className="px-2 py-0.5 rounded-md bg-amber-950 text-amber-300 border border-amber-500/20 text-[10px] font-mono font-bold">
                              {q.marks} Marks • Section {q.section}
                            </span>
                            <button
                              onClick={() => deleteCustomPYQ(q.id)}
                              className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                              title="Delete question"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          <p className="font-semibold text-white text-xs line-clamp-2">{q.questionEn}</p>
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
                            <span>{q.subjectCode}</span>
                            <span>SDSUV: {q.yearsAppeared.join(', ')}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400">
                  Custom questions appear in <Link href="/pyqs" className="text-amber-400 underline font-semibold">/pyqs Vault</Link> and are dynamically available in <Link href="/simulator" className="text-cyan-400 underline font-semibold">/simulator</Link> model papers!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================== */}
        {/* TAB 4: CAREER COMPASS EDITOR                                       */}
        {/* ================================================================== */}
        {activeTab === 'careers' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Form */}
            <div className="lg:col-span-2 rounded-3xl glass-panel p-6 border border-white/10 space-y-4 bg-[#0b1028]">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Compass className="w-5 h-5" />
                  <h3 className="font-bold text-white text-base">Add or Customize Career Trajectory</h3>
                </div>
                <span className="text-[10px] font-mono text-amber-400">With 4-Tab Blueprint</span>
              </div>

              <form onSubmit={handleAddCareer} className="space-y-4 text-xs">
                {/* Name, Shortcode, Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Career Name *</label>
                    <input
                      type="text"
                      value={careerName}
                      onChange={(e) => setCareerName(e.target.value)}
                      placeholder="e.g. UPSC Indian Forest Service (IFoS)"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-semibold"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Short Code</label>
                    <input
                      type="text"
                      value={careerShortCode}
                      onChange={(e) => setCareerShortCode(e.target.value)}
                      placeholder="e.g. UPSC IFoS"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Category Badge *</label>
                    <select
                      value={careerCategory}
                      onChange={(e) => setCareerCategory(e.target.value as CareerCategory)}
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-bold"
                    >
                      <option value="🎖️ Defence Officer">🎖️ Defence Officer</option>
                      <option value="🏛️ Civil Services">🏛️ Civil Services</option>
                      <option value="🔬 Specialist/Research">🔬 Specialist/Research</option>
                    </select>
                  </div>
                </div>

                {/* Eligible Streams Checkboxes */}
                <div className="p-3 rounded-2xl bg-black/40 border border-white/5 space-y-1.5">
                  <label className="text-slate-300 font-mono text-[11px] uppercase font-bold block">
                    Eligible Streams (Multi-select) *
                  </label>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {[
                      { id: 'bsc-maths' as StreamType, label: '📐 BSc Maths' },
                      { id: 'bsc-bio' as StreamType, label: '🧬 BSc Bio' },
                      { id: 'ba-arts' as StreamType, label: '🎨 BA Arts' },
                    ].map((st) => {
                      const isSelected = careerStreams.includes(st.id);
                      return (
                        <button
                          type="button"
                          key={st.id}
                          onClick={() => toggleCareerStream(st.id)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold border transition-all ${
                            isSelected
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 font-extrabold shadow-md shadow-cyan-500/20'
                              : 'bg-black/60 text-slate-400 border-white/5 hover:text-white'
                          }`}
                        >
                          {st.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Salary Band, Exam Frequency, Overlap % */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Salary Band</label>
                    <input
                      type="text"
                      value={careerSalaryBand}
                      onChange={(e) => setCareerSalaryBand(e.target.value)}
                      placeholder="Level 10 (₹56,100 - ₹1,77,500)"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Exam Frequency</label>
                    <input
                      type="text"
                      value={careerFrequency}
                      onChange={(e) => setCareerFrequency(e.target.value)}
                      placeholder="Twice a Year (Feb & Aug)"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">
                      SDSUV Overlap: {careerOverlapPct}%
                    </label>
                    <input
                      type="range"
                      min={50}
                      max={99}
                      value={careerOverlapPct}
                      onChange={(e) => setCareerOverlapPct(Number(e.target.value))}
                      className="w-full accent-cyan-400 mt-2"
                    />
                  </div>
                </div>

                {/* Conducting Body & Tagline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Conducting Body</label>
                    <input
                      type="text"
                      value={careerBody}
                      onChange={(e) => setCareerBody(e.target.value)}
                      placeholder="e.g. UPSC, SSC, UKPSC"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Age Bracket</label>
                    <input
                      type="text"
                      value={careerAgeLimit}
                      onChange={(e) => setCareerAgeLimit(e.target.value)}
                      placeholder="e.g. 21 to 30 Years"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Eligibility Education */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">Education (English)</label>
                    <input
                      type="text"
                      value={careerEduEn}
                      onChange={(e) => setCareerEduEn(e.target.value)}
                      placeholder="Bachelor degree with relevant subjects from SDSUV"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">शैक्षणिक योग्यता (हिंदी)</label>
                    <input
                      type="text"
                      value={careerEduHi}
                      onChange={(e) => setCareerEduHi(e.target.value)}
                      placeholder="एसडीएसयूवी से संबंधित विषयों में स्नातक उपाधि"
                      className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                {/* Uttarakhand Hill Relaxation */}
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono text-[11px] uppercase font-bold">
                    Uttarakhand Hill Region Relaxation Highlight
                  </label>
                  <input
                    type="text"
                    value={careerHillRelaxation}
                    onChange={(e) => setCareerHillRelaxation(e.target.value)}
                    placeholder="5 cm height relaxation for Garhwalis and Kumaonis (Min required: 152.5 cm)."
                    className="w-full bg-black/60 border border-white/10 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
                >
                  <Plus className="w-4 h-4 text-slate-950" />
                  <span>Publish Career Blueprint to Compass</span>
                </button>
              </form>
            </div>

            {/* Right: Custom Careers list */}
            <div className="rounded-3xl glass-panel p-6 border border-white/10 space-y-4 bg-[#0a0f26] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="text-sm font-bold text-white flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-cyan-400" />
                    <span>Custom Careers ({customCareers.length})</span>
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-400">Live on /careers</span>
                </div>

                <div className="mt-4 space-y-3 max-h-[500px] overflow-y-auto pr-1">
                  {customCareers.length === 0 ? (
                    <div className="p-8 text-center text-slate-500 text-xs">
                      No custom careers published yet. Fill out the form to add a new career trajectory.
                    </div>
                  ) : (
                    customCareers.map((c) => (
                      <div
                        key={c.id}
                        className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2 hover:border-cyan-500/30 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <span className="px-2 py-0.5 rounded-md bg-violet-950 text-violet-300 border border-violet-500/20 text-[10px] font-mono font-bold">
                            {c.category}
                          </span>
                          <button
                            onClick={() => deleteCustomCareer(c.id)}
                            className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                            title="Delete career"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <h5 className="font-bold text-white text-xs">{c.name}</h5>
                        <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-white/5">
                          <span>{c.salaryBand}</span>
                          <span className="text-emerald-400 font-bold">{c.syllabusOverlapPct}% Overlap</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-white/5 text-[11px] text-slate-400">
                Newly published careers appear instantly with a deep-dive 4-tab blueprint on <Link href="/careers" className="text-cyan-400 underline font-semibold">/careers</Link>.
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ==================================================================== */}
      {/* BULK PYQ IMPORT MODAL                                                */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isBulkPYQModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0b1028] border border-amber-500/40 rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-amber-400">
                  <Upload className="w-5 h-5" />
                  <h3 className="text-base font-bold text-white">Bulk PYQ JSON Importer</h3>
                </div>
                <button
                  onClick={() => setIsBulkPYQModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-300">
                Paste an array of questions in JSON format to import 20+ questions in one click.
              </p>

              <div className="flex items-center justify-between text-xs">
                <button
                  type="button"
                  onClick={handleLoadSampleBulkJSON}
                  className="px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-amber-300 border border-white/10 flex items-center space-x-1"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>Load Sample 20-Question JSON Template</span>
                </button>
              </div>

              <textarea
                rows={10}
                value={bulkPYQJson}
                onChange={(e) => setBulkPYQJson(e.target.value)}
                placeholder="[ { id: '...', questionEn: '...', marks: 10, ... } ]"
                className="w-full bg-black/70 border border-white/15 rounded-2xl p-3 text-xs text-amber-200 font-mono focus:outline-none focus:border-amber-400"
              />

              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  onClick={() => setIsBulkPYQModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteBulkImport}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25"
                >
                  Import All Questions Now
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* IMPORT DATABASE JSON MODAL                                           */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isImportModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0b1028] border border-cyan-500/40 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Upload className="w-5 h-5" />
                  <h3 className="text-base font-bold text-white">Import Full Database JSON</h3>
                </div>
                <button
                  onClick={() => setIsImportModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-300">
                Paste the exported JSON backup string to restore all syllabus topics, custom lectures, PYQs, and career blueprints.
              </p>

              <textarea
                rows={8}
                value={importJsonInput}
                onChange={(e) => setImportJsonInput(e.target.value)}
                placeholder='{ "version": "1.0.0", "topics": [...], "lectures": [...] }'
                className="w-full bg-black/70 border border-white/15 rounded-2xl p-3 text-xs text-cyan-200 font-mono focus:outline-none focus:border-cyan-400"
              />

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 text-xs font-bold border border-red-500/30 flex items-center space-x-1"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Reset to Factory Defaults</span>
                </button>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsImportModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleImportDatabase}
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25"
                  >
                    Restore Database
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* CHANGE CREDENTIALS MODAL                                             */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isChangePassModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b1028] border border-violet-500/40 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-violet-400">
                  <Key className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-white">Update Admin Credentials</h3>
                </div>
                <button
                  onClick={() => setIsChangePassModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleChangeCredentials} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Admin Username</span>
                  </label>
                  <input
                    type="text"
                    value={newUsernameInput}
                    onChange={(e) => setNewUsernameInput(e.target.value)}
                    placeholder="Enter username (min 3 chars)"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-400 font-mono"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                    <Lock className="w-3.5 h-3.5 text-violet-400" />
                    <span>New Password</span>
                  </label>
                  <input
                    type="password"
                    value={newPassInput}
                    onChange={(e) => setNewPassInput(e.target.value)}
                    placeholder="Enter new password (min 4 chars)"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-400 font-mono"
                    required
                  />
                </div>

                <div className="flex items-center justify-end space-x-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsChangePassModalOpen(false)}
                    className="px-3 py-1.5 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-slate-950 font-black hover:scale-105 transition-all shadow-md"
                  >
                    Save Credentials
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* VIEW FULL STUDENT DETAILS MODAL                                      */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {selectedStudentForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0a0f26] border border-cyan-500/40 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
                    {selectedStudentForModal.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{selectedStudentForModal.name}</h3>
                    <div className="text-xs text-slate-400 font-mono">ID: {selectedStudentForModal.id}</div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStudentForModal(null)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Grid Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Email Address</div>
                  <div className="text-cyan-300 font-mono font-medium truncate">{selectedStudentForModal.email}</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Phone / WhatsApp</div>
                  <div className="text-white font-mono font-medium">{selectedStudentForModal.phone || 'Not provided'}</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 sm:col-span-2">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Affiliated Campus / College</div>
                  <div className="text-white font-medium">{selectedStudentForModal.college || 'SDSUV Campus'}</div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Program &amp; Semester</div>
                  <div className="text-white font-bold flex items-center space-x-2">
                    <span className="capitalize">{selectedStudentForModal.course.replace('-', ' ')}</span>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono">
                      Sem {selectedStudentForModal.semester}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Medium of Study</div>
                  <div className="text-white font-bold">
                    {selectedStudentForModal.preferred_medium === 'en' ? '🇬🇧 English Medium' : '🇮🇳 Hindi Medium (हिंदी)'}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1 sm:col-span-2">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Target Career Goal</div>
                  <div className="text-emerald-300 font-medium font-mono">
                    🎯 {selectedStudentForModal.target_goal || 'SDSUV Academic Excellence'}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 sm:col-span-2">
                  <div className="text-[10px] font-mono uppercase text-slate-400">
                    Selected Subjects Curriculum ({(selectedStudentForModal.selected_subjects || []).length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(selectedStudentForModal.selected_subjects || []).map((code, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-xl bg-black/60 border border-cyan-500/30 text-cyan-300 font-mono text-[11px]"
                      >
                        {code}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Registration Date</div>
                  <div className="text-slate-300 font-mono text-[11px]">
                    {new Date(selectedStudentForModal.created_at).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                    })}
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
                  <div className="text-[10px] font-mono uppercase text-slate-400">Registration Mode</div>
                  <div className="text-cyan-300 font-bold capitalize">
                    {selectedStudentForModal.source === 'waitlist'
                      ? '🔔 BSc Early Access Waitlist'
                      : selectedStudentForModal.source === 'onboarding'
                      ? '✨ Student Setup Modal'
                      : selectedStudentForModal.source === 'sample'
                      ? 'Sample Preloaded Student'
                      : '⚡ Direct Portal Sign-Up'}
                  </div>
                </div>
              </div>

              {/* Close Footer */}
              <div className="flex items-center justify-end pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForModal(null)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:scale-105 transition-all shadow-md"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* REGISTER STUDENT MANUALLY MODAL                                      */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {isAddStudentModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0a0f26] border border-cyan-500/40 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <GraduationCap className="w-5 h-5" />
                  <h3 className="text-base font-bold text-white">Register New Student Profile</h3>
                </div>
                <button
                  onClick={() => setIsAddStudentModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleManualAddStudent} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-mono text-[10px] uppercase font-bold">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={manualStudentName}
                      onChange={(e) => setManualStudentName(e.target.value)}
                      placeholder="e.g. Ankit Rawat"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-mono text-[10px] uppercase font-bold">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={manualStudentEmail}
                      onChange={(e) => setManualStudentEmail(e.target.value)}
                      placeholder="e.g. ankit@gmail.com"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-mono text-[10px] uppercase font-bold">
                      Mobile / WhatsApp (Optional)
                    </label>
                    <input
                      type="tel"
                      value={manualStudentPhone}
                      onChange={(e) => setManualStudentPhone(e.target.value)}
                      placeholder="+91 9876543210"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-mono text-[10px] uppercase font-bold">
                      Degree Course *
                    </label>
                    <select
                      value={manualStudentCourse}
                      onChange={(e) => {
                        const newC = e.target.value as StreamType;
                        setManualStudentCourse(newC);
                        setManualStudentSubjects(getDefaultSubjectsForStream(newC));
                      }}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="ba-arts">B.A (Arts Group)</option>
                      <option value="bsc-maths">B.Sc (Maths Group - PCM)</option>
                      <option value="bsc-bio">B.Sc (Bio Group - CBZ)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-mono text-[10px] uppercase font-bold">
                      Current Semester *
                    </label>
                    <select
                      value={manualStudentSemester}
                      onChange={(e) => setManualStudentSemester(Number(e.target.value))}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      {[1, 2, 3, 4, 5, 6].map((s) => (
                        <option key={s} value={s}>
                          Semester {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-mono text-[10px] uppercase font-bold">
                      Study Medium *
                    </label>
                    <select
                      value={manualStudentMedium}
                      onChange={(e) => setManualStudentMedium(e.target.value as LanguageType)}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    >
                      <option value="en">🇬🇧 English Medium</option>
                      <option value="hi">🇮🇳 Hindi Medium (हिंदी)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-mono text-[10px] uppercase font-bold">
                    Affiliated Campus / College *
                  </label>
                  <select
                    value={manualStudentCollege}
                    onChange={(e) => setManualStudentCollege(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  >
                    {SDSUV_COLLEGES_LIST.map((col) => (
                      <option key={col} value={col}>
                        {col}
                      </option>
                    ))}
                  </select>
                </div>

                {manualStudentCollege === 'Other SDSUV Affiliated Degree / PG College' && (
                  <div className="space-y-1">
                    <label className="text-slate-400 font-mono text-[10px] uppercase font-bold">
                      Enter College Name &amp; District
                    </label>
                    <input
                      type="text"
                      value={manualStudentCustomCollege}
                      onChange={(e) => setManualStudentCustomCollege(e.target.value)}
                      placeholder="e.g. Government Degree College, Doiwala"
                      className="w-full bg-black/60 border border-cyan-500/40 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-slate-300 font-mono text-[10px] uppercase font-bold">
                    Target Career Ambition
                  </label>
                  <select
                    value={manualStudentGoal}
                    onChange={(e) => setManualStudentGoal(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                  >
                    {CAREER_GOALS_LIST.map((goal) => (
                      <option key={goal} value={goal}>
                        {goal}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5 pt-1">
                  <label className="text-slate-300 font-mono text-[10px] uppercase font-bold">
                    Enrolled Subjects
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-36 overflow-y-auto p-1 bg-black/40 rounded-xl border border-white/10">
                    {(COURSE_SEMESTER_SUBJECTS[manualStudentCourse] || []).map((sub) => {
                      const isSel = manualStudentSubjects.includes(sub.code);
                      return (
                        <button
                          type="button"
                          key={sub.code}
                          onClick={() => {
                            setManualStudentSubjects((prev) =>
                              prev.includes(sub.code)
                                ? prev.length > 1
                                  ? prev.filter((c) => c !== sub.code)
                                  : prev
                                : [...prev, sub.code]
                            );
                          }}
                          className={`p-1.5 rounded-lg border text-left text-[11px] flex items-center justify-between ${
                            isSel
                              ? 'bg-cyan-950/70 border-cyan-400 text-white font-bold'
                              : 'bg-white/[0.02] border-white/10 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className="truncate">{sub.nameEn}</span>
                          {isSel && <Check className="w-3 h-3 text-cyan-400 shrink-0 ml-1" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-2 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddStudentModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/15 transition-colors font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs hover:scale-105 transition-all shadow-md shadow-cyan-500/25 flex items-center space-x-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Save Student to Registry</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
