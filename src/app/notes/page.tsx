'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpenCheck,
  Search,
  Filter,
  ArrowLeft,
  ArrowRight,
  Printer,
  Bookmark,
  BookmarkCheck,
  Play,
  Share2,
  Sparkles,
  BookOpen,
  Award,
  Layers,
  GraduationCap,
  Calendar,
  CheckCircle2,
  Globe,
  Quote,
  Lightbulb,
  ChevronRight,
  ExternalLink,
  Flame,
  FileText,
  Landmark,
  Building2,
  Users,
  AlertTriangle,
  XCircle,
  HelpCircle,
  Lock,
} from 'lucide-react';
import FloatingNav from '@/components/FloatingNav';
import { LanguageType } from '@/lib/types';
import { useSidebarState } from '@/lib/sidebarState';
import { getStudentProfile, filterToSelectedSubjects, StudentProfile } from '@/lib/studentProfile';
import { toggleSaveItem, isItemSaved } from '@/lib/savedVaultStorage';
import {
  MASTER_NOTES_DATABASE,
  NOTES_SUBJECTS_LIST,
  MasterTopicNote,
  NotesSubjectSummary,
} from '@/data/notesStudioData';
import { FULL_CURRICULUM_SUBJECTS_LIST } from '@/data/fullBaCurriculum';
import { SYLLABUS_PAPERS_DATABASE } from '@/data/syllabusHubData';

function NotesStudioContent() {
  const { isCollapsed } = useSidebarState();
  const router = useRouter();
  const searchParams = useSearchParams();

  // 3-Stage Navigation Flow: 'subject' -> 'unit' -> 'notes'
  const initialStep =
    searchParams.get('topic') ||
    searchParams.get('note') ||
    (searchParams.get('subject') && searchParams.get('unit'))
      ? 'notes'
      : searchParams.get('subject')
      ? 'unit'
      : 'subject';
  const [flowStep, setFlowStep] = useState<'subject' | 'unit' | 'notes'>(initialStep);

  // Top bar language
  const [lang, setLang] = useState<LanguageType>('en');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  // Interactive MCQ selections
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  // Filter States
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('geography');
  const [selectedUnit, setSelectedUnit] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Load registered student profile
  useEffect(() => {
    const p = getStudentProfile();
    if (p) {
      setProfile(p);
      setLang(p.preferredMedium);
      if (p.semester && p.semester >= 1 && p.semester <= 10) {
        setSelectedSemester(p.semester % 2 === 0 ? 1 : p.semester);
      }
      const querySub = searchParams.get('subject');
      if (!querySub) {
        const filtered = filterToSelectedSubjects(
          NOTES_SUBJECTS_LIST,
          (s) => s.id,
          p.selectedSubjects
        );
        if (filtered.length > 0) {
          setSelectedSubjectId(filtered[0].id);
        }
      }
    }
    const handleProfile = (e: any) => {
      const updated = e.detail || getStudentProfile();
      if (updated) {
        setProfile(updated);
        setLang(updated.preferredMedium);
        const filtered = filterToSelectedSubjects(
          NOTES_SUBJECTS_LIST,
          (s) => s.id,
          updated.selectedSubjects
        );
        if (filtered.length > 0) {
          setSelectedSubjectId(filtered[0].id);
        }
      }
    };
    window.addEventListener('sdsuv_profile_updated', handleProfile);
    return () => window.removeEventListener('sdsuv_profile_updated', handleProfile);
  }, [searchParams]);

  const visibleNotesSubjects = useMemo(() => {
    return filterToSelectedSubjects(
      NOTES_SUBJECTS_LIST,
      (s) => s.id,
      profile?.selectedSubjects
    );
  }, [profile?.selectedSubjects]);

  // Keep selectedSubjectId strictly within student's profile-selected subjects
  useEffect(() => {
    if (visibleNotesSubjects.length > 0 && !visibleNotesSubjects.some((s) => s.id === selectedSubjectId)) {
      setSelectedSubjectId(visibleNotesSubjects[0].id);
    }
  }, [visibleNotesSubjects, selectedSubjectId]);

  // Handle URL query parameters for direct deep-linking
  useEffect(() => {
    const querySub = searchParams.get('subject');
    const queryTopic = searchParams.get('topic');
    const querySem = searchParams.get('sem');
    const queryUnit = searchParams.get('unit');

    if (querySem) {
      const s = parseInt(querySem, 10);
      if (!isNaN(s)) setSelectedSemester(s);
    }
    if (querySub && NOTES_SUBJECTS_LIST.some((sub) => sub.id === querySub)) {
      setSelectedSubjectId(querySub);
    }
    if (queryUnit) {
      const u = parseInt(queryUnit, 10);
      if (!isNaN(u)) setSelectedUnit(u);
    }
    if (queryTopic) {
      const found = MASTER_NOTES_DATABASE.find(
        (n) => n.id === queryTopic || n.learnTopicId === queryTopic
      );
      if (found) {
        setSelectedSubjectId(found.subjectId);
        setSelectedSemester(found.semester);
        setSelectedUnit(found.unitNumber);
        setSelectedNoteId(found.id);
        setFlowStep('notes');
      }
    } else if (querySub && queryUnit) {
      setFlowStep('notes');
    }
  }, [searchParams]);

  // Notes filtered by current subject & semester
  const availableNotesForSubject = useMemo(() => {
    return MASTER_NOTES_DATABASE.filter(
      (n) => n.subjectId === selectedSubjectId && n.semester === selectedSemester
    );
  }, [selectedSubjectId, selectedSemester]);

  // Units list for current subject with topics count and syllabus mapping
  const unitsForCurrentSubject = useMemo(() => {
    const semPaper =
      (SYLLABUS_PAPERS_DATABASE as any)[selectedSubjectId]?.find(
        (p: any) => p.semester === selectedSemester && (p.category === 'DSC' || p.category === 'DSE')
      ) ||
      (SYLLABUS_PAPERS_DATABASE as any)[selectedSubjectId]?.find(
        (p: any) => p.semester === selectedSemester
      );
    const notesInSub = availableNotesForSubject;

    if (semPaper && semPaper.units && semPaper.units.length > 0) {
      return semPaper.units.map((u: any) => {
        const uNotes = notesInSub.filter((n) => n.unitNumber === u.unitNumber);
        return {
          unitNumber: u.unitNumber,
          titleEn: u.titleEn,
          titleHi: u.titleHi,
          weightageMarks: 25,
          creditWeight: '1.0 Credit',
          notes: uNotes,
          totalTopics: uNotes.length || u.topicsEn?.length || 4,
          topicsEn: u.topicsEn || [],
          topicsHi: u.topicsHi || [],
        };
      });
    }

    const curSub = FULL_CURRICULUM_SUBJECTS_LIST.find((s) => s.id === selectedSubjectId);
    if (curSub && curSub.units && curSub.units.length > 0) {
      return curSub.units.map((u) => {
        const uNotes = notesInSub.filter((n) => n.unitNumber === u.unitNumber);
        return {
          unitNumber: u.unitNumber,
          titleEn: u.titleEn,
          titleHi: u.titleHi,
          weightageMarks: 25,
          creditWeight: '1.0 Credit',
          notes: uNotes,
          totalTopics: uNotes.length || u.totalTopics || 4,
          topicsEn: [],
          topicsHi: [],
        };
      });
    }

    const map = new Map<number, MasterTopicNote[]>();
    notesInSub.forEach((n) => {
      const list = map.get(n.unitNumber) || [];
      list.push(n);
      map.set(n.unitNumber, list);
    });

    if (map.size > 0) {
      return Array.from(map.entries())
        .sort(([a], [b]) => a - b)
        .map(([num, nts]) => ({
          unitNumber: num,
          titleEn: nts[0]?.unitTitleEn || `Unit ${num}`,
          titleHi: nts[0]?.unitTitleHi || `इकाई ${num}`,
          weightageMarks: 25,
          creditWeight: '1.0 Credit',
          notes: nts,
          totalTopics: nts.length,
          topicsEn: [],
          topicsHi: [],
        }));
    }

    return [1, 2, 3, 4].map((num) => ({
      unitNumber: num,
      titleEn: `Unit ${num}: Syllabus Core`,
      titleHi: `इकाई ${num}: मुख्य पाठ्यक्रम`,
      weightageMarks: 25,
      creditWeight: '1.0 Credit',
      notes: [],
      totalTopics: 3,
      topicsEn: [],
      topicsHi: [],
    }));
  }, [selectedSubjectId, selectedSemester, availableNotesForSubject]);

  const currentSubjectSummary = useMemo(() => {
    const base =
      NOTES_SUBJECTS_LIST.find((s) => s.id === selectedSubjectId) ||
      visibleNotesSubjects[0] ||
      NOTES_SUBJECTS_LIST[0];

    const semPaper =
      (SYLLABUS_PAPERS_DATABASE as any)[selectedSubjectId]?.find(
        (p: any) => p.semester === selectedSemester && (p.category === 'DSC' || p.category === 'DSE')
      ) ||
      (SYLLABUS_PAPERS_DATABASE as any)[selectedSubjectId]?.find(
        (p: any) => p.semester === selectedSemester
      );

    if (semPaper) {
      return {
        ...base,
        code: semPaper.paperCode,
        paperTitleEn: semPaper.titleEn,
        paperTitleHi: semPaper.titleHi,
        semester: selectedSemester,
      };
    }

    return base;
  }, [selectedSubjectId, selectedSemester, visibleNotesSubjects]);

  const currentUnitData = useMemo(() => {
    return (
      unitsForCurrentSubject.find((u: any) => u.unitNumber === selectedUnit) ||
      unitsForCurrentSubject[0]
    );
  }, [unitsForCurrentSubject, selectedUnit]);

  // Notes filtered specifically to the selected unit
  const unitNotes = useMemo(() => {
    const matching = availableNotesForSubject.filter((n) => n.unitNumber === selectedUnit);
    return matching.length > 0 ? matching : availableNotesForSubject;
  }, [availableNotesForSubject, selectedUnit]);

  // Active Selected Note
  const [selectedNoteId, setSelectedNoteId] = useState<string>(
    availableNotesForSubject[0]?.id || MASTER_NOTES_DATABASE[0].id
  );

  // Update selected note when subject/semester changes if current selection is invalid
  useEffect(() => {
    if (unitNotes.length > 0) {
      const exists = unitNotes.some((n) => n.id === selectedNoteId);
      if (!exists) {
        setSelectedNoteId(unitNotes[0].id);
      }
    } else if (availableNotesForSubject.length > 0) {
      const exists = availableNotesForSubject.some((n) => n.id === selectedNoteId);
      if (!exists) {
        setSelectedNoteId(availableNotesForSubject[0].id);
      }
    }
  }, [unitNotes, availableNotesForSubject, selectedNoteId]);

  const activeNote: MasterTopicNote = useMemo(() => {
    return (
      MASTER_NOTES_DATABASE.find((n) => n.id === selectedNoteId) ||
      unitNotes[0] ||
      availableNotesForSubject[0] ||
      MASTER_NOTES_DATABASE[0]
    );
  }, [selectedNoteId, unitNotes, availableNotesForSubject]);

  // Sequential Next & Previous navigation
  const currentIndex = availableNotesForSubject.findIndex((n) => n.id === activeNote.id);
  const prevNote = currentIndex > 0 ? availableNotesForSubject[currentIndex - 1] : null;
  const nextNote =
    currentIndex >= 0 && currentIndex < availableNotesForSubject.length - 1
      ? availableNotesForSubject[currentIndex + 1]
      : null;

  // Search filtering
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return MASTER_NOTES_DATABASE.filter(
      (n) =>
        n.titleEn.toLowerCase().includes(q) ||
        n.titleHi.toLowerCase().includes(q) ||
        n.subjectNameEn.toLowerCase().includes(q) ||
        n.contextEn.intro.toLowerCase().includes(q) ||
        n.valueAddition.thinkersEn.some((t) => t.toLowerCase().includes(q)) ||
        n.valueAddition.thinkersHi.some((t) => t.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  // Bookmark / Saved Vault State
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (activeNote) {
      setIsBookmarked(isItemSaved(`note-${activeNote.id}`));
    }
    const handleVault = () => {
      if (activeNote) setIsBookmarked(isItemSaved(`note-${activeNote.id}`));
    };
    window.addEventListener('sdsuv_saved_vault_updated', handleVault);
    return () => window.removeEventListener('sdsuv_saved_vault_updated', handleVault);
  }, [activeNote]);

  const handleToggleBookmark = () => {
    if (!activeNote) return;
    const nowSaved = toggleSaveItem({
      id: `note-${activeNote.id}`,
      type: 'pyq',
      titleEn: `${activeNote.topicSequence}: ${activeNote.titleEn}`,
      titleHi: `${activeNote.topicSequence}: ${activeNote.titleHi}`,
      subtitleEn: `${activeNote.subjectNameEn} • Sem ${activeNote.semester}`,
      subtitleHi: activeNote.subjectNameHi,
      tag: `📚 UPSC Master Note • ${activeNote.readTime}`,
      linkUrl: `/notes?subject=${activeNote.subjectId}&topic=${activeNote.id}`,
      notes: activeNote.highYieldTag,
    });
    setIsBookmarked(nowSaved);
  };

  // Print Note
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen himalayan-mesh-bg text-slate-800 dark:text-slate-100 relative selection:bg-teal-500 dark:selection:bg-cyan-500 selection:text-white dark:selection:text-black print:bg-white print:text-black">
      {/* Background Starry Glow */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0 print:hidden" />
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-teal-600/10 via-indigo-600/10 to-transparent blur-[120px] pointer-events-none z-0 print:hidden" />

      {/* Top Floating Navbar / Left Slide-Bars */}
      <div className="print:hidden">
        <FloatingNav
          currentTab="notes"
          lang={lang}
          setLang={setLang}
          showSubjectExplorer={true}
          activeSubjectId={selectedSubjectId}
          activeUnitNumber={selectedUnit}
          activeTopicId={selectedNoteId}
          onSelectTopic={(topicId, subjectId, unitNumber) => {
            setSelectedSubjectId(subjectId);
            setSelectedUnit(unitNumber);
            const found = MASTER_NOTES_DATABASE.find(
              (n) => n.id === topicId || n.learnTopicId === topicId
            );
            if (found) {
              setSelectedNoteId(found.id);
            }
          }}
        />
      </div>

      {/* Main Content Area - Displaced dynamically for sidebar and expands to full portion when collapsed */}
      <div className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-16 pr-4 sm:pr-6 md:pr-8 relative z-10 ${isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'}`}>
        <main className={`transition-all duration-300 ease-in-out mx-auto space-y-6 w-full ${isCollapsed ? 'max-w-[1720px] lg:px-6 xl:px-8' : 'max-w-7xl lg:px-4'}`}>
          {/* ================================================================ */}
          {/* 3-STEP PROGRESS TRACKER (Subject -> Unit -> Master Notes)        */}
          {/* ================================================================ */}
          <div className="p-3 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#080d22]/90 shadow-md flex items-center justify-between print:hidden">
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto py-0.5">
              {/* Step 1: Subject */}
              <button
                type="button"
                onClick={() => setFlowStep('subject')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                  flowStep === 'subject'
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/30 ring-2 ring-teal-400/40'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-cyan-300'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">1</span>
                <span>{lang === 'en' ? 'Choose Subject' : 'विषय चुनें'}</span>
                {flowStep !== 'subject' && <span className="text-[10px] text-emerald-500 font-bold">✓</span>}
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              {/* Step 2: Unit */}
              <button
                type="button"
                onClick={() => setFlowStep('unit')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                  flowStep === 'unit'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/40'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-violet-300'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">2</span>
                <span>{lang === 'en' ? 'Choose Unit' : 'इकाई चुनें'}</span>
                {flowStep === 'notes' && <span className="text-[10px] text-emerald-500 font-bold">✓</span>}
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              {/* Step 3: Notes */}
              <button
                type="button"
                onClick={() => {
                  if (unitNotes.length > 0) setFlowStep('notes');
                }}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                  flowStep === 'notes'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 ring-2 ring-cyan-400/40'
                    : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-cyan-700 dark:hover:text-cyan-300 opacity-70'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">3</span>
                <span>{lang === 'en' ? 'Read Master Notes' : 'नोट्स पढ़ें'}</span>
              </button>
            </div>

            {/* Quick Breadcrumb indicator badge */}
            <div className="hidden md:flex items-center space-x-2 text-xs font-mono font-bold">
              <span className="px-2.5 py-1 rounded-full bg-teal-50 dark:bg-cyan-950/80 border border-teal-200 dark:border-cyan-500/30 text-teal-800 dark:text-cyan-300">
                {currentSubjectSummary.code}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-violet-950/80 border border-indigo-200 dark:border-violet-500/30 text-indigo-800 dark:text-violet-300">
                Unit {selectedUnit}
              </span>
            </div>
          </div>

          {/* ================================================================ */}
          {/* STAGE 1: CHOOSE SUBJECT VIEW                                      */}
          {/* ================================================================ */}
          {flowStep === 'subject' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Header Hero Banner */}
              <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080d22]/85 relative overflow-hidden shadow-xl dark:shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-sky-400 to-indigo-500" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-cyan-950/80 border border-teal-200 dark:border-cyan-500/40 text-teal-800 dark:text-cyan-300 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                        <span>SDSUV NEP-2020 • 2025-26</span>
                      </span>
                      <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-violet-950/80 border border-indigo-200 dark:border-violet-500/40 text-indigo-800 dark:text-violet-300 text-xs font-mono font-bold flex items-center space-x-1.5">
                        <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-violet-400" />
                        <span>Step 1 of 3: Subject Selection</span>
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                      📚 {lang === 'en' ? 'Select Your Subject' : 'अपना विषय चुनें'}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                      {lang === 'en'
                        ? 'Select a subject from your enrolled BA course to explore unit breakdowns and access high-scoring UPSC-standard master notes.'
                        : 'इकाई-वार नोट्स एवं यूपीएससी-स्तरीय मास्टर विश्लेषण के लिए अपने नामांकित बीए पाठ्यक्रम का विषय चुनें।'}
                    </p>
                  </div>

                  {/* Search and Language Switch */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search topics, thinkers, books..."
                        className="bg-slate-100 dark:bg-black/50 border border-slate-300 dark:border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-teal-500 dark:focus:border-cyan-400 w-full sm:w-64"
                      />
                    </div>

                    <div className="flex items-center p-1 bg-slate-100 dark:bg-black/60 rounded-xl border border-slate-200 dark:border-white/15 self-start sm:self-auto">
                      <button
                        onClick={() => setLang('en')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                          lang === 'en'
                            ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-md'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span>🇬🇧</span>
                        <span>English Notes</span>
                      </button>
                      <button
                        onClick={() => setLang('hi')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                          lang === 'hi'
                            ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <span>🇮🇳</span>
                        <span>हिंदी नोट्स</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Semester Selector Tabs */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-mono uppercase font-bold text-slate-600 dark:text-slate-400 flex items-center space-x-1 mr-2 flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                  <span>Semester:</span>
                </span>
                {[1, 2, 3, 4, 5, 6].map((sem) => {
                  const isEvenLocked = sem % 2 === 0;

                  if (isEvenLocked) {
                    return (
                      <div
                        key={sem}
                        title={`Semester ${sem} is launching soon. Currently focusing exclusively on Odd Semesters (Sem 1, 3, 5).`}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold border border-dashed border-amber-500/30 bg-amber-500/[0.04] text-slate-500 dark:text-slate-500 cursor-not-allowed flex items-center space-x-1.5 opacity-65 flex-shrink-0 select-none"
                      >
                        <Lock className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>Sem {sem}</span>
                        <span className="text-[8px] px-1 py-0.5 rounded font-mono bg-amber-500/15 text-amber-400 font-extrabold uppercase">
                          Live Soon
                        </span>
                      </div>
                    );
                  }

                  return (
                    <button
                      key={sem}
                      onClick={() => setSelectedSemester(sem)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex-shrink-0 cursor-pointer ${
                        selectedSemester === sem
                          ? 'bg-teal-600 dark:bg-cyan-500 text-white dark:text-slate-950 shadow-md shadow-teal-500/20 dark:shadow-cyan-500/25 font-black scale-105'
                          : 'bg-white dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/10'
                      }`}
                    >
                      Semester {sem}
                    </button>
                  );
                })}
              </div>

              {/* Large Subject Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                {visibleNotesSubjects.map((sub) => {
                  const semPaper =
                    (SYLLABUS_PAPERS_DATABASE as any)[sub.id]?.find(
                      (p: any) => p.semester === selectedSemester && (p.category === 'DSC' || p.category === 'DSE')
                    ) ||
                    (SYLLABUS_PAPERS_DATABASE as any)[sub.id]?.find(
                      (p: any) => p.semester === selectedSemester
                    );
                  const subNotes = MASTER_NOTES_DATABASE.filter(
                    (n) => n.subjectId === sub.id && n.semester === selectedSemester
                  );
                  const isCurrent = selectedSubjectId === sub.id;
                  const paperCode = semPaper?.paperCode || sub.code;
                  const paperTitleEn = semPaper?.titleEn || sub.paperTitleEn;
                  const paperTitleHi = semPaper?.titleHi || sub.paperTitleHi;
                  const unitsCount = semPaper?.units?.length || 4;

                  return (
                    <motion.div
                      key={sub.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedSubjectId(sub.id);
                        setFlowStep('unit');
                      }}
                      className={`p-6 rounded-3xl border text-left transition-all relative overflow-hidden group cursor-pointer flex flex-col justify-between space-y-4 shadow-lg ${
                        isCurrent
                          ? 'bg-gradient-to-br from-white via-teal-50/50 to-indigo-50/40 dark:from-[#0d163d] dark:via-[#0b1233] dark:to-[#120d2e] border-teal-500/60 dark:border-cyan-400/60 shadow-teal-900/10 dark:shadow-cyan-950/60 ring-2 ring-teal-500/30'
                          : 'bg-white/90 dark:bg-[#080d22]/80 border-slate-200 dark:border-white/10 hover:border-teal-400/50 hover:bg-white dark:hover:bg-[#0c1538]/70'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono px-2.5 py-1 rounded-xl bg-teal-50 dark:bg-cyan-950/80 text-teal-800 dark:text-cyan-300 border border-teal-300/60 dark:border-cyan-500/40 font-bold">
                            {paperCode}
                          </span>
                          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono font-bold">
                            Sem {selectedSemester}
                          </span>
                        </div>

                        <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-cyan-300 transition-colors">
                          {lang === 'en' ? sub.nameEn : sub.nameHi}
                        </h3>

                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {lang === 'en' ? paperTitleEn : paperTitleHi}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 font-mono">
                          <span>📚 {unitsCount} Units</span>
                          <span>•</span>
                          <span>{subNotes.length > 0 ? `${subNotes.length} Notes` : `${unitsCount * 3} Topics`}</span>
                        </div>

                        <span className="font-bold text-teal-700 dark:text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                          <span>{lang === 'en' ? 'Select Units' : 'इकाई चुनें'}</span>
                          <span>→</span>
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ================================================================ */}
          {/* STAGE 2: CHOOSE UNIT VIEW                                         */}
          {/* ================================================================ */}
          {flowStep === 'unit' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Top Breadcrumb Navigation */}
              <div className="p-4 sm:p-5 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080d22]/85 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setFlowStep('subject')}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-colors flex items-center space-x-1.5 text-xs font-bold cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                    <span>{lang === 'en' ? '← Back to Subjects' : '← विषय सूची'}</span>
                  </button>

                  <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 dark:text-cyan-400 font-bold block">
                      {currentSubjectSummary.code} • Sem {selectedSemester}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      {lang === 'en' ? currentSubjectSummary.nameEn : currentSubjectSummary.nameHi}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setFlowStep('subject')}
                    className="px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-cyan-950/70 border border-teal-200 dark:border-cyan-500/30 text-teal-800 dark:text-cyan-300 text-xs font-bold hover:bg-teal-100 dark:hover:bg-cyan-900 transition-colors"
                  >
                    🔄 {lang === 'en' ? 'Change Subject' : 'विषय बदलें'}
                  </button>
                </div>
              </div>

              {/* Unit Selection Header */}
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900 dark:text-white">
                  📖 {lang === 'en' ? 'Select Unit to Study' : 'अध्ययन हेतु इकाई का चयन करें'}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {lang === 'en'
                    ? 'Each unit is aligned with SDSUV 15-mark and 10-mark examination requirements.'
                    : 'प्रत्येक इकाई एसडीएसयूवी परीक्षा के 15 अंक एवं 10 अंक वाले प्रश्नों के अनुरूप संरचित है।'}
                </p>
              </div>

              {/* Units Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
                {unitsForCurrentSubject.map((u: any) => {
                  const unitTopics = availableNotesForSubject.filter((n) => n.unitNumber === u.unitNumber);

                  return (
                    <motion.div
                      key={u.unitNumber}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => {
                        setSelectedUnit(u.unitNumber);
                        if (unitTopics.length > 0) {
                          setSelectedNoteId(unitTopics[0].id);
                        }
                        setFlowStep('notes');
                      }}
                      className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#080d22]/85 hover:border-indigo-400/50 hover:bg-slate-50 dark:hover:bg-[#0c1538]/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-xl bg-indigo-50 dark:bg-violet-950/80 text-indigo-800 dark:text-violet-300 border border-indigo-200 dark:border-violet-500/40 text-xs font-mono font-black">
                            UNIT {u.unitNumber}
                          </span>
                          <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
                            {u.weightageMarks} Marks • {u.creditWeight}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-violet-300 transition-colors leading-snug">
                          {lang === 'en' ? u.titleEn : u.titleHi}
                        </h4>

                        {/* Topics Preview List */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold block">
                            {unitTopics.length > 0
                              ? `${unitTopics.length} Master Notes Available:`
                              : `${(u.topicsEn || []).length || 3} Core Syllabus Topics:`}
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {unitTopics.length > 0 ? (
                              unitTopics.map((nt) => (
                                <span
                                  key={nt.id}
                                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 text-[10px] font-mono truncate max-w-[200px]"
                                  title={nt.titleEn}
                                >
                                  {nt.topicSequence}
                                </span>
                              ))
                            ) : (
                              (lang === 'en' ? (u as any).topicsEn || [] : (u as any).topicsHi || []).slice(0, 3).map((tp: string, idx: number) => (
                                <span
                                  key={idx}
                                  className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 text-[10px] font-mono truncate max-w-[220px]"
                                  title={tp}
                                >
                                  {tp}
                                </span>
                              ))
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between text-xs">
                        <span className="text-slate-500 dark:text-slate-400 text-xs font-mono">
                          SDSUV High Yield
                        </span>
                        <span className="font-bold text-indigo-700 dark:text-violet-400 group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                          <span>{lang === 'en' ? 'Open Unit Notes' : 'इकाई नोट्स खोलें'}</span>
                          <span>→</span>
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* ================================================================ */}
          {/* STAGE 3: MASTER NOTES WORKSPACE                                   */}
          {/* ================================================================ */}
          {flowStep === 'notes' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Stage 3 Breadcrumb Header */}
              <div className="p-4 sm:p-5 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080d22]/90 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  {/* Change Subject Button */}
                  <button
                    type="button"
                    onClick={() => setFlowStep('subject')}
                    className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-cyan-950/80 dark:hover:bg-cyan-900 border border-teal-200 dark:border-cyan-500/40 text-teal-800 dark:text-cyan-300 font-bold transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>← Subject ({currentSubjectSummary.nameEn})</span>
                  </button>

                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

                  {/* Change Unit Button */}
                  <button
                    type="button"
                    onClick={() => setFlowStep('unit')}
                    className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-violet-950/80 dark:hover:bg-violet-900 border border-indigo-200 dark:border-violet-500/40 text-indigo-800 dark:text-violet-300 font-bold transition-all flex items-center space-x-1 cursor-pointer"
                  >
                    <span>← Change Unit ({selectedUnit})</span>
                  </button>

                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

                  <span className="font-bold text-slate-900 dark:text-white truncate max-w-[200px] sm:max-w-md">
                    {activeNote ? (lang === 'en' ? activeNote.titleEn : activeNote.titleHi) : ''}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-bold transition-colors flex items-center space-x-1"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Print (PDF)</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleToggleBookmark}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1 ${
                      isBookmarked
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                        : 'bg-white dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:text-slate-950 dark:hover:text-white'
                    }`}
                  >
                    {isBookmarked ? <BookmarkCheck className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                    <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
                  </button>
                </div>
              </div>

              {/* MAIN 2-COLUMN WORKSPACE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT SIDEBAR (4 Cols / 33%): Topic Sequence Playlist */}
                <aside className="lg:col-span-4 rounded-3xl glass-panel p-4 sm:p-5 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080d22]/90 space-y-4 print:hidden relative lg:sticky lg:top-24 z-20">
                  <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 font-mono flex items-center space-x-1.5">
                        <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                        <span>Topic Sequence (Unit {selectedUnit})</span>
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {unitNotes.length} Master Notes in this Unit
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFlowStep('unit')}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-50 dark:bg-violet-950 text-indigo-800 dark:text-violet-300 border border-indigo-200 dark:border-violet-500/30 font-bold hover:bg-indigo-100 dark:hover:bg-violet-900 transition-colors"
                    >
                      Unit {selectedUnit} ▾
                    </button>
                  </div>

                  {/* List of Topic Notes in this Unit */}
                  <div className="space-y-2 max-h-[420px] lg:max-h-[580px] overflow-y-auto pr-1 scrollbar-thin">
                    {unitNotes.map((note) => {
                      const isSelected = activeNote.id === note.id;
                      return (
                        <button
                          key={note.id}
                          onClick={() => {
                            setSelectedNoteId(note.id);
                            setSearchQuery('');
                          }}
                          className={`w-full p-2.5 sm:p-3 rounded-2xl border text-left transition-all relative cursor-pointer ${
                            isSelected
                              ? 'bg-teal-50 dark:bg-gradient-to-r dark:from-cyan-950/90 dark:to-blue-950/80 border-teal-500 dark:border-cyan-400 shadow-sm shadow-teal-500/15'
                              : 'bg-slate-50/70 dark:bg-white/[0.02] border-slate-200/80 dark:border-white/5 hover:border-teal-400/40 hover:bg-slate-100 dark:hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                            <span className="font-bold text-teal-700 dark:text-cyan-300">{note.topicSequence}</span>
                            <span className="text-slate-500 dark:text-slate-400">{note.lectureNumber}</span>
                          </div>
                          <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                            {lang === 'en' ? note.titleEn : note.titleHi}
                          </div>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-200/70 dark:border-white/5 text-[10px] text-slate-500 dark:text-slate-400">
                            <span>⏱️ {note.readTime}</span>
                            <span className="text-amber-700 dark:text-amber-400 truncate max-w-[130px] font-medium">
                              {note.highYieldTag}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Switch Unit & Switch Subject Quick Bar */}
                  <div className="pt-2 flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => setFlowStep('unit')}
                      className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 transition-colors text-center"
                    >
                      ← Change Unit
                    </button>
                    <button
                      type="button"
                      onClick={() => setFlowStep('subject')}
                      className="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-white/10 transition-colors text-center"
                    >
                      ← Change Subject
                    </button>
                  </div>

                  {/* Link to Study Studio Video Playlist */}
                  <Link
                    href={`/learn?subject=${activeNote.subjectId}&topic=${activeNote.learnTopicId}`}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-indigo-600 to-violet-600 hover:brightness-110 text-white font-bold text-xs flex items-center justify-center space-x-2 transition-all shadow-md shadow-indigo-500/20"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>▶ Watch Topic Lectures in Study Studio</span>
                  </Link>
                </aside>

                {/* ============================================================== */}
                {/* RIGHT COLUMN (8 Cols / 67%): The 5-Block Topic Notes Reader     */}
                {/* ============================================================== */}
                <article className="lg:col-span-8 rounded-3xl glass-panel p-4 sm:p-6 lg:p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#070b1c]/95 space-y-6 sm:space-y-8 shadow-xl dark:shadow-2xl relative">
            {/* Top Note Identity & Action Bar */}
            <div className="border-b border-slate-200 dark:border-white/10 pb-5 sm:pb-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Topic tags with clean wrapping */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded-lg bg-teal-50 dark:bg-cyan-950 border border-teal-200 dark:border-cyan-500/30 text-teal-800 dark:text-cyan-300 font-mono text-[11px] font-bold">
                    {activeNote.topicSequence}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                    {activeNote.lectureNumber}
                  </span>
                  <span className="px-2 py-0.5 rounded-lg bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 font-mono text-[11px] font-bold">
                    {activeNote.highYieldTag}
                  </span>
                  {activeNote.sdsuvTag && (
                    <span className="px-2 py-0.5 rounded-lg bg-rose-50 dark:bg-red-950/80 border border-rose-200 dark:border-red-500/40 text-rose-800 dark:text-red-300 font-mono text-[11px] font-bold">
                      {activeNote.sdsuvTag}
                    </span>
                  )}
                  {activeNote.upscTag && (
                    <span className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 font-mono text-[11px] font-bold">
                      {activeNote.upscTag}
                    </span>
                  )}
                </div>

                {/* Print & Bookmark Action Buttons */}
                <div className="flex flex-wrap items-center gap-2 print:hidden shrink-0">
                  <button
                    onClick={handleToggleBookmark}
                    className={`px-2.5 py-1.5 rounded-xl border text-[11px] font-semibold flex items-center space-x-1 transition-all ${
                      isBookmarked
                        ? 'bg-amber-500 text-slate-950 border-amber-400 font-bold'
                        : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border-slate-200 dark:border-white/10'
                    }`}
                    title="Bookmark for Exam Night"
                  >
                    {isBookmarked ? (
                      <>
                        <BookmarkCheck className="w-3.5 h-3.5" />
                        <span>Saved</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-3.5 h-3.5" />
                        <span>Bookmark</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePrint}
                    className="px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white border border-slate-200 dark:border-white/10 text-[11px] font-semibold flex items-center space-x-1 transition-all"
                    title="Print / Save as PDF"
                  >
                    <Printer className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                    <span>Print PDF</span>
                  </button>

                  <Link
                    href={`/learn?subject=${activeNote.subjectId}&topic=${activeNote.learnTopicId}`}
                    className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-bold text-[11px] flex items-center space-x-1 shadow-md shadow-teal-500/20 hover:scale-105 transition-all"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Watch Video</span>
                  </Link>
                </div>
              </div>

              {/* Note Title */}
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                  {lang === 'en' ? activeNote.titleEn : activeNote.titleHi}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  {activeNote.subjectCode} • {lang === 'en' ? activeNote.unitTitleEn : activeNote.unitTitleHi} • ⏱️ {activeNote.readTime}
                </p>
              </div>
            </div>

            {/* ============================================================ */}
            {/* BLOCK 1: 🎯 CONTEXT & SCHOLAR DEFINITION                     */}
            {/* ============================================================ */}
            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-teal-700 dark:text-cyan-400 text-sm font-bold font-mono">
                <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-cyan-950 border border-teal-300 dark:border-cyan-500/40 flex items-center justify-center text-xs text-teal-800 dark:text-cyan-300">
                  1
                </span>
                <span>🎯 {lang === 'en' ? 'Context & Scholar Definition' : 'प्रस्तावना एवं प्रामाणिक परिभाषा'}</span>
              </div>

              <div className="p-5 rounded-2xl bg-teal-50/40 dark:bg-cyan-950/20 border border-teal-200 dark:border-cyan-500/30 text-slate-800 dark:text-slate-200 space-y-4">
                <p className="text-xs sm:text-sm leading-relaxed text-slate-800 dark:text-slate-200">
                  {lang === 'en' ? activeNote.contextEn.intro : activeNote.contextHi.intro}
                </p>

                {/* Scholar Quote Box */}
                <div className="p-4 rounded-xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/10 border-l-4 border-l-teal-600 dark:border-l-cyan-400 text-xs sm:text-sm space-y-1 relative shadow-xs">
                  <div className="font-bold text-teal-800 dark:text-cyan-300 flex items-center space-x-1.5">
                    <Quote className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                    <span>
                      {lang === 'en'
                        ? activeNote.contextEn.scholarDefinition.scholar
                        : activeNote.contextHi.scholarDefinition.scholar}
                    </span>
                  </div>
                  <p className="italic text-slate-700 dark:text-slate-300 leading-relaxed">
                    {lang === 'en'
                      ? activeNote.contextEn.scholarDefinition.definition
                      : activeNote.contextHi.scholarDefinition.definition}
                  </p>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* BLOCK 2: 🧭 VISUAL FLOWCHART / MINDMAP BOX                  */}
            {/* ============================================================ */}
            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-indigo-700 dark:text-violet-400 text-sm font-bold font-mono">
                <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-violet-950 border border-indigo-200 dark:border-violet-500/40 flex items-center justify-center text-xs text-indigo-800 dark:text-violet-300">
                  2
                </span>
                <span>🧭 {lang === 'en' ? 'Visual Flowchart & Classification Tree' : 'माइंडमैप एवं प्रवाह-चित्र (फ्लोचार्ट)'}</span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#090e29] border border-indigo-200 dark:border-violet-500/30 space-y-4 shadow-sm dark:shadow-xl">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                    {lang === 'en' ? activeNote.flowchart.titleEn : activeNote.flowchart.titleHi}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-100 dark:bg-violet-950 text-indigo-800 dark:text-violet-300 border border-indigo-200 dark:border-violet-500/30 uppercase">
                    {activeNote.flowchart.diagramType}
                  </span>
                </div>

                {/* Flowchart Columns / Branches */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {activeNote.flowchart.columns.map((col, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 space-y-2 hover:border-indigo-400/50 transition-colors shadow-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-indigo-800 dark:text-violet-300">
                          {lang === 'en' ? col.titleEn : col.titleHi}
                        </span>
                        {col.badge && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-slate-100 dark:bg-black/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                            {col.badge}
                          </span>
                        )}
                      </div>
                      <ul className="space-y-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                        {(lang === 'en' ? col.itemsEn : col.itemsHi).map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start space-x-1.5 leading-snug">
                            <span className="text-indigo-600 dark:text-violet-400 mt-0.5">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* BLOCK 3: 📌 CORE ANALYTICAL POINTS (DETAILED BODY)           */}
            {/* ============================================================ */}
            <section className="space-y-4">
              <div className="flex items-center space-x-2 text-emerald-700 dark:text-emerald-400 text-sm font-bold font-mono">
                <span className="w-6 h-6 rounded-lg bg-emerald-100 dark:bg-emerald-950 border border-emerald-300 dark:border-emerald-500/40 flex items-center justify-center text-xs text-emerald-800 dark:text-emerald-300">
                  3
                </span>
                <span>📌 {lang === 'en' ? 'Core Analytical Points & Arguments' : 'मुख्य विश्लेषणात्मक बिंदु एवं तर्क'}</span>
              </div>

              <div className="space-y-4">
                {activeNote.analyticalPoints.map((point, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-slate-50/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/10 space-y-3"
                  >
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{lang === 'en' ? point.headingEn : point.headingHi}</span>
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                      {lang === 'en' ? point.detailEn : point.detailHi}
                    </p>

                    {/* Bullet Highlights */}
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {(lang === 'en' ? point.bulletsEn : point.bulletsHi).map((bullet, bIdx) => (
                        <div
                          key={bIdx}
                          className="p-2.5 rounded-xl bg-white dark:bg-black/40 border border-slate-200/80 dark:border-white/5 text-xs text-slate-800 dark:text-slate-200 flex items-start space-x-2 leading-relaxed shadow-xs"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>

                    {/* Quotation or Article Tag if present */}
                    {point.quoteOrArticle && (
                      <div className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold flex items-center space-x-2">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                        <span>{point.quoteOrArticle}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* ============================================================ */}
            {/* BLOCK 4: ✍️ VALUE-ADDITION BOX (TOPPER'S EDGE)              */}
            {/* ============================================================ */}
            <section className="space-y-3">
              <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 text-sm font-bold font-mono">
                <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center text-xs text-amber-800 dark:text-amber-300">
                  4
                </span>
                <span>✍️ {lang === 'en' ? "Value-Addition Box (Topper's Edge)" : 'टॉपर्स वैल्यू-एडिशन (अंकवर्धक बिंदु)'}</span>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-50 via-white to-amber-50/40 dark:from-amber-950/30 dark:via-slate-900 dark:to-amber-950/10 border border-amber-200 dark:border-amber-500/40 space-y-4 shadow-sm">
                {/* Master Exam Quote */}
                <div className="p-4 rounded-xl bg-white dark:bg-amber-950/40 border border-slate-200/80 dark:border-white/10 border-l-4 border-l-amber-500 space-y-1 shadow-xs">
                  <div className="text-[11px] font-mono font-bold uppercase text-amber-800 dark:text-amber-300 flex items-center space-x-1">
                    <Quote className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>{lang === 'en' ? 'Quote for 15-Mark Answers:' : '15-अंक प्रश्न हेतु उद्धरण:'}</span>
                  </div>
                  <p className="text-xs sm:text-sm italic text-amber-950 dark:text-amber-100 font-medium leading-relaxed">
                    {lang === 'en' ? activeNote.valueAddition.examQuoteEn : activeNote.valueAddition.examQuoteHi}
                  </p>
                </div>

                {/* Key Scholars & Recommended Books */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase block">
                      🏛️ {lang === 'en' ? 'Key Scholars to Quote:' : 'उत्तर में उद्धृत करने योग्य विद्वान:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(lang === 'en' ? activeNote.valueAddition.thinkersEn : activeNote.valueAddition.thinkersHi).map(
                        (t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-1 rounded-lg bg-amber-100/70 dark:bg-black/60 border border-amber-200 dark:border-white/10 text-slate-800 dark:text-white font-semibold text-[11px]"
                          >
                            {t}
                          </span>
                        )
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase block">
                      📖 {lang === 'en' ? 'Standard Reference Books:' : 'प्रामाणिक संदर्भ ग्रंथ:'}
                    </span>
                    <ul className="space-y-1 text-slate-700 dark:text-slate-300 text-[11px]">
                      {(lang === 'en'
                        ? activeNote.valueAddition.recommendedBooksEn
                        : activeNote.valueAddition.recommendedBooksHi
                      ).map((b, bIdx) => (
                        <li key={bIdx} className="flex items-center space-x-1.5">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* UPSC Prelims/Mains Connection Tag */}
                <div className="p-3 rounded-xl bg-white dark:bg-black/40 border border-slate-200/80 dark:border-white/10 text-xs space-y-1">
                  <div className="text-[10px] font-mono font-bold text-teal-800 dark:text-cyan-300 uppercase flex items-center space-x-1">
                    <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                    <span>UPSC CSE / State PCS Connection:</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300">
                    {lang === 'en'
                      ? (activeNote.valueAddition.upscConnectionEn || 'High-yield analytical topic for UPSC Optional and SDSUV honors examinations.')
                      : (activeNote.valueAddition.upscConnectionHi || 'यूपीएससी एवं श्री देव सुमन वि.वि. परीक्षा हेतु उच्च स्कोरिंग विश्लेषणात्मक विषय।')}
                  </p>
                </div>

                {/* Diagram / Topper Presentation Tip */}
                <div className="p-3 rounded-xl bg-amber-100/50 dark:bg-amber-950/20 border border-amber-300/60 dark:border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 flex items-start space-x-2">
                  <Lightbulb className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>{lang === 'en' ? 'Presentation Tip: ' : 'प्रस्तुति टिप: '}</strong>
                    {lang === 'en'
                      ? (activeNote.valueAddition.topperTipEn || 'Draw flowcharts and cite primary scholars to secure maximum marks in Section C.')
                      : (activeNote.valueAddition.topperTipHi || 'खंड स के 15-अंकीय प्रश्नों में अधिकतम अंक प्राप्ति हेतु फ्लोचार्ट व मूल विद्वानों के उद्धरण अवश्य लिखें।')}
                  </p>
                </div>
              </div>
            </section>

            {/* ============================================================ */}
            {/* BLOCK 5: 📝 15-MARK MODEL ANSWER BLUEPRINT                   */}
            {/* ============================================================ */}
            {activeNote.answerBlueprint && (
              <section className="space-y-3">
                <div className="flex items-center space-x-2 text-rose-700 dark:text-rose-400 text-sm font-bold font-mono">
                  <span className="w-6 h-6 rounded-lg bg-rose-100 dark:bg-rose-950 border border-rose-300 dark:border-rose-500/40 flex items-center justify-center text-xs text-rose-800 dark:text-rose-300">
                    5
                  </span>
                  <span>📝 {lang === 'en' ? '15-Mark Model Answer Blueprint' : '15-अंकीय मॉडल उत्तर रूपरेखा (ब्लूप्रिंट)'}</span>
                </div>

                <div className="p-6 rounded-2xl bg-gradient-to-br from-rose-50/50 via-white to-pink-50/30 dark:from-rose-950/20 dark:via-slate-900 dark:to-pink-950/10 border border-rose-200 dark:border-rose-500/30 space-y-4 shadow-sm">
                  {/* Question Title */}
                  <div className="p-4 rounded-xl bg-white dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-500/20 border-l-4 border-l-rose-500 space-y-1">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 block">
                      {lang === 'en' ? '🎯 Expected Examination Question (15 Marks):' : '🎯 संभावित परीक्षा प्रश्न (15 अंक):'}
                    </span>
                    <p className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                      {lang === 'en' ? activeNote.answerBlueprint.questionTitleEn : activeNote.answerBlueprint.questionTitleHi}
                    </p>
                  </div>

                  {/* Introduction Blueprint */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-rose-700 dark:text-rose-300 uppercase block">
                      1. {lang === 'en' ? 'Introduction (2-3 Marks):' : 'प्रस्तावना (2-3 अंक):'}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {lang === 'en' ? activeNote.answerBlueprint.introductionEn : activeNote.answerBlueprint.introductionHi}
                    </p>
                  </div>

                  {/* Core Headings */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-slate-200 uppercase block">
                      2. {lang === 'en' ? 'Core Analytical Headings (8-10 Marks):' : 'मुख्य विश्लेषणात्मक शीर्षक (8-10 अंक):'}
                    </span>
                    <div className="grid grid-cols-1 gap-2">
                      {(lang === 'en' ? activeNote.answerBlueprint.coreHeadingsEn : activeNote.answerBlueprint.coreHeadingsHi).map((h, hIdx) => (
                        <div key={hIdx} className="p-2.5 rounded-lg bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 text-xs text-slate-800 dark:text-slate-200 flex items-start space-x-2">
                          <span className="text-rose-600 dark:text-rose-400 font-bold shrink-0">{hIdx + 1}.</span>
                          <span className="font-medium">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Model Conclusion */}
                  <div className="p-3.5 rounded-xl bg-white dark:bg-black/30 border border-slate-200 dark:border-white/5 space-y-1">
                    <span className="text-[11px] font-mono font-bold text-teal-700 dark:text-teal-300 uppercase block">
                      3. {lang === 'en' ? 'Model Conclusion (2-3 Marks):' : 'मॉडल निष्कर्ष (2-3 अंक):'}
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {lang === 'en' ? activeNote.answerBlueprint.conclusionEn : activeNote.answerBlueprint.conclusionHi}
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* ============================================================ */}
            {/* BLOCK 6: ⚠️ COMMON EXAM MISTAKES & PITFALLS                  */}
            {/* ============================================================ */}
            {activeNote.commonMistakes && activeNote.commonMistakes.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center space-x-2 text-amber-700 dark:text-amber-400 text-sm font-bold font-mono">
                  <span className="w-6 h-6 rounded-lg bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-500/40 flex items-center justify-center text-xs text-amber-800 dark:text-amber-300">
                    6
                  </span>
                  <span>⚠️ {lang === 'en' ? 'Common Exam Mistakes & Traps to Avoid' : 'सामान्य परीक्षा त्रुटियां एवं सावधानियां'}</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {activeNote.commonMistakes.map((m, mIdx) => (
                    <div
                      key={mIdx}
                      className="p-4 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 space-y-2.5"
                    >
                      <div className="flex items-start space-x-2 text-xs text-red-700 dark:text-red-400">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-mono uppercase text-[10px] tracking-wide">
                            {lang === 'en' ? 'Common Student Mistake:' : 'सामान्य छात्र गलती:'}
                          </strong>
                          <span>{lang === 'en' ? m.mistakeEn : m.mistakeHi}</span>
                        </div>
                      </div>

                      <div className="flex items-start space-x-2 text-xs text-emerald-800 dark:text-emerald-300 p-2.5 rounded-xl bg-white dark:bg-black/40 border border-emerald-200 dark:border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <div>
                          <strong className="block font-mono uppercase text-[10px] tracking-wide text-emerald-700 dark:text-emerald-400">
                            {lang === 'en' ? 'Topper Correction & Pro-Tip:' : 'टॉपर सुधार एवं अंकवर्धक टिप:'}
                          </strong>
                          <span>{lang === 'en' ? m.correctionEn : m.correctionHi}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* ============================================================ */}
            {/* BLOCK 7: 🎯 3 CHECK YOURSELF MCQS (INTERACTIVE PRACTICE)     */}
            {/* ============================================================ */}
            {activeNote.mcqs && activeNote.mcqs.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center space-x-2 text-purple-700 dark:text-purple-400 text-sm font-bold font-mono">
                  <span className="w-6 h-6 rounded-lg bg-purple-100 dark:bg-purple-950 border border-purple-300 dark:border-purple-500/40 flex items-center justify-center text-xs text-purple-800 dark:text-purple-300">
                    7
                  </span>
                  <span>🎯 {lang === 'en' ? 'Check Yourself: 3 Interactive MCQs' : 'स्व-मूल्यांकन: 3 वस्तुनिष्ठ अभ्यास प्रश्न'}</span>
                </div>

                <div className="space-y-4">
                  {activeNote.mcqs.map((mcq, qIdx) => {
                    const key = `${activeNote.id}-mcq-${qIdx}`;
                    const selected = selectedAnswers[key];
                    const isAnswered = selected !== undefined;
                    const isCorrect = isAnswered && selected === mcq.correctIndex;

                    return (
                      <div
                        key={qIdx}
                        className="p-5 rounded-2xl bg-white dark:bg-[#0a0f28] border border-purple-200/80 dark:border-purple-500/30 space-y-3 shadow-xs"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                            <span className="text-purple-600 dark:text-purple-400 mr-1.5">Q{qIdx + 1}.</span>
                            {lang === 'en' ? mcq.questionEn : mcq.questionHi}
                          </h4>
                          {isAnswered && (
                            <span
                              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold shrink-0 ${
                                isCorrect
                                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300'
                                  : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300'
                              }`}
                            >
                              {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                            </span>
                          )}
                        </div>

                        {/* Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {(lang === 'en' ? mcq.optionsEn : mcq.optionsHi).map((opt, optIdx) => {
                            let optionClass = 'bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200';
                            if (isAnswered) {
                              if (optIdx === mcq.correctIndex) {
                                optionClass = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-500 text-emerald-900 dark:text-emerald-200 font-bold';
                              } else if (optIdx === selected) {
                                optionClass = 'bg-rose-50 dark:bg-rose-950/60 border-rose-400 dark:border-rose-500 text-rose-900 dark:text-rose-200';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                onClick={() => {
                                  setSelectedAnswers((prev) => ({
                                    ...prev,
                                    [key]: optIdx,
                                  }));
                                }}
                                className={`p-3 rounded-xl border text-xs text-left transition-all flex items-start space-x-2 cursor-pointer ${optionClass}`}
                              >
                                <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-black/50 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span className="leading-snug">{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Explanation Box */}
                        {isAnswered && (
                          <div className="p-3.5 rounded-xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-500/30 text-xs text-purple-950 dark:text-purple-200 space-y-1">
                            <strong className="block font-mono text-[10px] uppercase text-purple-700 dark:text-purple-400">
                              💡 {lang === 'en' ? 'Explanation:' : 'व्याख्या:'}
                            </strong>
                            <p className="leading-relaxed">
                              {lang === 'en' ? mcq.explanationEn : mcq.explanationHi}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Exam Conclusion & Synthesis */}
            {(activeNote.conclusionEn || activeNote.conclusionHi) && (
              <section className="space-y-3">
                <div className="flex items-center space-x-2 text-teal-700 dark:text-cyan-400 text-sm font-bold font-mono">
                  <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-cyan-950 border border-teal-300 dark:border-cyan-500/40 flex items-center justify-center text-xs text-teal-800 dark:text-cyan-300">
                    8
                  </span>
                  <span>🎓 {lang === 'en' ? 'Exam Conclusion & Synthesis' : 'परीक्षा निष्कर्ष एवं मूल्यांकन'}</span>
                </div>
                <div className="p-5 rounded-2xl bg-teal-50/50 dark:bg-gradient-to-r dark:from-cyan-950/30 dark:via-slate-900 dark:to-blue-950/20 border border-teal-200 dark:border-cyan-500/30">
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed italic">
                    {lang === 'en' ? activeNote.conclusionEn : activeNote.conclusionHi}
                  </p>
                </div>
              </section>
            )}

            {/* ============================================================ */}
            {/* 🎬 DEDICATED LECTURE STUDIO REDIRECTION CARD                 */}
            {/* ============================================================ */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-rose-50 via-white to-amber-50 dark:from-red-950/40 dark:via-[#0a0e26]/80 dark:to-amber-950/40 border-2 border-rose-200 dark:border-red-500/30 shadow-md dark:shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-wider text-rose-700 dark:text-red-400 bg-rose-100 dark:bg-red-950/60 px-2 py-0.5 rounded border border-rose-300 dark:border-red-500/30">
                  <Play className="w-3 h-3 fill-rose-600 dark:fill-red-400" />
                  <span>Lecture Studio Integration</span>
                </div>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  🎬 Watch Lecture on "{lang === 'en' ? activeNote.titleEn : activeNote.titleHi}"
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Switch to Lecture Studio to watch top educator video lectures and 8 curated channels for this topic.
                </p>
              </div>

              <Link
                href={`/lectures?subject=${activeNote.subjectId}&unit=${activeNote.unitNumber}&topic=${activeNote.id}`}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2 shrink-0 self-start sm:self-auto"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>🎬 Watch Lecture →</span>
              </Link>
            </div>

            {/* ============================================================ */}
            {/* ACTION BAR: 📥 SEQUENTIAL TOPIC NAVIGATION & ACTIONS         */}
            {/* ============================================================ */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
              {prevNote ? (
                <button
                  onClick={() => setSelectedNoteId(prevNote.id)}
                  className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2 transition-all w-full sm:w-auto justify-center shadow-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>
                    ← {prevNote.topicSequence}: {lang === 'en' ? prevNote.titleEn : prevNote.titleHi}
                  </span>
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}

              {nextNote ? (
                <button
                  onClick={() => setSelectedNoteId(nextNote.id)}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-indigo-600 text-white font-black text-xs flex items-center space-x-2 shadow-lg shadow-teal-500/20 hover:scale-105 transition-all w-full sm:w-auto justify-center"
                >
                  <span>
                    Next: {nextNote.topicSequence} →
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <div className="hidden sm:block" />
              )}
            </div>
          </article>
        </div>
      </motion.div>
    )}
        </main>
      </div>
    </div>
  );
}

export default function NotesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070913] flex items-center justify-center text-cyan-400 font-mono text-sm">
          Loading UPSC Notes Studio...
        </div>
      }
    >
      <NotesStudioContent />
    </Suspense>
  );
}
