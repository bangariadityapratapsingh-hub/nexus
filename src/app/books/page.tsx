'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Search,
  ExternalLink,
  Download,
  Bookmark,
  Check,
  Copy,
  Layers,
  Sparkles,
  Info,
  ShieldCheck,
  Globe,
  Award,
  ChevronRight,
  Filter,
  Eye,
  X,
  FileText,
  Library,
  BookMarked,
  SlidersHorizontal,
  Compass,
  ArrowRight,
} from 'lucide-react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import { useSidebarState } from '@/lib/sidebarState';
import { LanguageType } from '@/lib/types';
import { getStudentProfile, StudentProfile } from '@/lib/studentProfile';
import {
  toggleSaveItem,
  isItemSaved,
} from '@/lib/savedVaultStorage';
import {
  BOOKS_DIRECTORY_DATA,
  BookItem,
  SubjectBooksGroup,
  OFFICIAL_PORTAL_LINKS,
  getSubjectBooks,
  filterBooks,
} from '@/data/booksData';

function BookVaultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { isCollapsed } = useSidebarState();

  // State
  const [lang, setLang] = useState<LanguageType>('en');
  const [profile, setProfile] = useState<StudentProfile | null>(null);

  // Filter States
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('geography');
  const [selectedMedium, setSelectedMedium] = useState<'all' | 'hi' | 'en'>('all');
  const [selectedSemester, setSelectedSemester] = useState<'all' | number>('all');
  const [activeBookIndex, setActiveBookIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // UI States
  const [activeModalBook, setActiveModalBook] = useState<BookItem | null>(null);
  const [showPortalsModal, setShowPortalsModal] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  // Load student profile & sync with URL params
  useEffect(() => {
    const student = getStudentProfile();
    setProfile(student);
    if (student?.preferredMedium) {
      setLang(student.preferredMedium);
      setSelectedMedium(student.preferredMedium);
    }

    // Sync from URL params
    const querySub = searchParams.get('subject');
    const queryMedium = searchParams.get('medium');
    const querySem = searchParams.get('sem');

    if (querySub && BOOKS_DIRECTORY_DATA.some((s) => s.subjectId === querySub.toLowerCase())) {
      setSelectedSubjectId(querySub.toLowerCase());
    } else if (student?.selectedSubjects && student.selectedSubjects.length > 0) {
      const firstValid = student.selectedSubjects.find((subId) =>
        BOOKS_DIRECTORY_DATA.some((s) => s.subjectId === subId)
      );
      if (firstValid) {
        setSelectedSubjectId(firstValid);
      }
    }

    if (queryMedium === 'hi' || queryMedium === 'en') {
      setSelectedMedium(queryMedium);
    }

    if (querySem && ['1', '3', '5'].includes(querySem)) {
      setSelectedSemester(Number(querySem));
    }
  }, [searchParams]);

  // Active Subject Group
  const currentSubjectGroup: SubjectBooksGroup = useMemo(() => {
    return (
      getSubjectBooks(selectedSubjectId) || BOOKS_DIRECTORY_DATA[0]
    );
  }, [selectedSubjectId]);

  // Filtered Books for current subject
  const filteredBooks: BookItem[] = useMemo(() => {
    let books = filterBooks(
      currentSubjectGroup.books,
      selectedMedium,
      selectedSemester
    );

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      books = books.filter(
        (b) =>
          b.titleEn.toLowerCase().includes(q) ||
          b.titleHi.toLowerCase().includes(q) ||
          b.authorEn.toLowerCase().includes(q) ||
          b.authorHi.toLowerCase().includes(q) ||
          b.publisherEn.toLowerCase().includes(q) ||
          b.keyTopics.some((t) => t.toLowerCase().includes(q))
      );
    }

    return books;
  }, [currentSubjectGroup, selectedMedium, selectedSemester, searchQuery]);

  // Reset active book index when filtered list changes
  useEffect(() => {
    setActiveBookIndex(0);
  }, [selectedSubjectId, selectedMedium, selectedSemester]);

  // Current active book for focused view
  const activeBook: BookItem | undefined = useMemo(() => {
    if (filteredBooks.length === 0) return undefined;
    return filteredBooks[activeBookIndex] || filteredBooks[0];
  }, [filteredBooks, activeBookIndex]);

  // Copy link handler
  const handleCopyLink = (book: BookItem) => {
    const url = book.directPdfUrl || book.repositoryUrl;
    navigator.clipboard.writeText(url);
    setCopiedId(book.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // Toggle bookmark in saved vault
  const handleToggleBookmark = (book: BookItem) => {
    const isNowSaved = toggleSaveItem({
      id: book.id,
      type: 'book',
      titleEn: book.titleEn,
      titleHi: book.titleHi,
      subtitleEn: `${book.authorEn} • ${book.publisherEn}`,
      subtitleHi: `${book.authorHi} • ${book.publisherHi}`,
      tag: `📚 ${book.badge} • Sem ${book.semesters.join(', ')}`,
      subjectCode: currentSubjectGroup.code,
      subjectName: lang === 'en' ? currentSubjectGroup.nameEn : currentSubjectGroup.nameHi,
      linkUrl: `/books?subject=${currentSubjectGroup.subjectId}&book=${book.id}`,
      notes: book.downloadTipEn || book.descriptionEn,
    });

    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (isNowSaved) {
        next.add(book.id);
      } else {
        next.delete(book.id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen himalayan-mesh-bg text-slate-800 dark:text-slate-100 relative selection:bg-amber-500 selection:text-white">
      {/* Background Starry Glow */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-600/10 via-orange-600/10 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Floating Navigation */}
      <FloatingNav
        currentTab="books"
        lang={lang}
        setLang={setLang}
      />

      {/* Main Content Area - Displaced dynamically for sidebar and expands to full portion when collapsed */}
      <div
        className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-16 pr-4 sm:pr-6 md:pr-8 relative z-10 ${
          isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'
        }`}
      >
        <main
          className={`transition-all duration-300 ease-in-out mx-auto space-y-8 w-full ${
            isCollapsed ? 'max-w-[1720px] lg:px-6 xl:px-8' : 'max-w-7xl lg:px-4'
          }`}
        >
          {/* ================================================================ */}
          {/* 1. HERO HEADER BANNER                                            */}
          {/* ================================================================ */}
          <section className="relative rounded-3xl overflow-hidden border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#080d22]/90 backdrop-blur-xl shadow-xl dark:shadow-2xl p-6 sm:p-8">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500" />
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-500/40 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>SDSUV BA NEP-2020 • Odd Semesters</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-500/40 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>11 Subjects • 100% Free Legally Hosted PDFs</span>
                  </span>
                  <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-300 dark:border-blue-500/40 text-blue-800 dark:text-blue-300 text-xs font-mono font-bold">
                    Sem I, III & V
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                  📚 {lang === 'en' ? 'BA Odd-Semester Free PDF Study-Material Directory' : 'बीए विषम सेमेस्टर निःशुल्क पाठ्यपुस्तक एवं अध्ययन सामग्री निर्देशिका'}
                </h1>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {lang === 'en'
                    ? 'Clickable repository of official university study-material pages, NCERT textbooks, IGNOU eGyanKosh collections, and standard university reference books for Sri Dev Suman Uttarakhand University (SDSUV).'
                    : 'श्री देव सुमन उत्तराखण्ड विश्वविद्यालय (एसडीएसयूवी) हेतु आधिकारिक विश्वविद्यालय अध्ययन सामग्री, एनसीईआरटी पाठ्यपुस्तकें, इग्नू ई-ज्ञानकोश एवं प्रमाणिक संदर्भ पुस्तकों का निःशुल्क डिजिटल संग्रह।'}
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowPortalsModal(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
                >
                  <Globe className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Official Portals' : 'आधिकारिक पोर्टल'}</span>
                </button>

                <a
                  href={currentSubjectGroup.officialSyllabusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 text-xs font-bold flex items-center space-x-2 transition-all"
                >
                  <FileText className="w-4 h-4 text-cyan-500" />
                  <span>{lang === 'en' ? 'Official Syllabus' : 'विश्वविद्यालय पाठ्यक्रम'}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </div>
            </div>
          </section>

          {/* ================================================================ */}
          {/* 2. STEP 1: SELECT SUBJECT                                         */}
          {/* ================================================================ */}
          <section className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">
                  1
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {lang === 'en' ? 'Select Subject' : 'विषय चुनें'}
                </h2>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                  (11 Subjects Available)
                </span>
              </div>

              {/* Search bar */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === 'en' ? 'Search books, authors, or topics...' : 'पुस्तक, लेखक या विषय खोजें...'}
                  className="bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-amber-500 w-full sm:w-64"
                />
              </div>
            </div>

            {/* Horizontal Subjects Pill Carousel */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-thin">
              {BOOKS_DIRECTORY_DATA.map((sub) => {
                const isSelected = sub.subjectId === selectedSubjectId;
                const isEnrolled = profile?.selectedSubjects?.includes(sub.subjectId);

                return (
                  <button
                    key={sub.subjectId}
                    type="button"
                    onClick={() => {
                      setSelectedSubjectId(sub.subjectId);
                      router.push(`/books?subject=${sub.subjectId}`);
                    }}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all flex items-center space-x-2 shrink-0 border cursor-pointer ${
                      isSelected
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 border-amber-400 shadow-md shadow-amber-500/25 ring-2 ring-amber-400/40'
                        : 'bg-white dark:bg-[#0c1228] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-amber-400/60 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="font-mono text-[10px] opacity-80">{sub.code}</span>
                    <span>{lang === 'en' ? sub.nameEn : sub.nameHi}</span>
                    {isEnrolled && (
                      <span className="w-2 h-2 rounded-full bg-emerald-400" title="Enrolled Subject" />
                    )}
                  </button>
                );
              })}
            </div>
          </section>

          {/* ================================================================ */}
          {/* 3. STEP 2 & 3: SELECT MEDIUM & SEMESTER CONTROLS                  */}
          {/* ================================================================ */}
          <section className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#080d22]/90 shadow-md flex flex-wrap items-center justify-between gap-4">
            {/* Medium Selector */}
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="w-5 h-5 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-[10px]">
                  2
                </span>
                <span>{lang === 'en' ? 'Medium:' : 'माध्यम:'}</span>
              </div>

              <div className="flex items-center p-0.5 bg-slate-100 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setSelectedMedium('all')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectedMedium === 'all'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  ✨ {lang === 'en' ? 'All Mediums' : 'सभी माध्यम'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMedium('hi')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectedMedium === 'hi'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  🇮🇳 {lang === 'en' ? 'Hindi Medium' : 'हिन्दी माध्यम'}
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMedium('en')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    selectedMedium === 'en'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  🇬🇧 {lang === 'en' ? 'English Medium' : 'अंग्रेज़ी माध्यम'}
                </button>
              </div>
            </div>

            {/* Odd Semester Filter */}
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                {lang === 'en' ? 'Odd Semester:' : 'विषम सेमेस्टर:'}
              </span>
              <div className="flex items-center space-x-1 text-xs font-mono font-bold">
                {(['all', 1, 3, 5] as const).map((sem) => (
                  <button
                    key={String(sem)}
                    type="button"
                    onClick={() => setSelectedSemester(sem as any)}
                    className={`px-2.5 py-1 rounded-lg transition-all ${
                      selectedSemester === sem
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {sem === 'all' ? 'All' : `Sem ${sem}`}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ================================================================ */}
          {/* 4. STEP 4: RESPECTIVE BOOK OPTION (WHEN MORE THAN 1 BOOK)         */}
          {/* ================================================================ */}
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-rose-500 text-white font-black text-xs flex items-center justify-center">
                  3
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {lang === 'en'
                      ? `Respective Book Options for ${currentSubjectGroup.nameEn}`
                      : `${currentSubjectGroup.nameHi} हेतु पाठ्यपुस्तक एवं संदर्भ विकल्प`}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {filteredBooks.length > 1
                      ? `${filteredBooks.length} books & repositories available. Choose between NCERT, eGyanKosh, and university standard reference books.`
                      : `${filteredBooks.length} book available for this selection.`}
                  </p>
                </div>
              </div>

              {/* Book Indicator Badge */}
              <div className="flex items-center space-x-2 text-xs font-mono font-bold">
                <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300">
                  {filteredBooks.length} Options Found
                </span>
              </div>
            </div>

            {/* When multiple books exist: Horizontal Book Switcher Tabs */}
            {filteredBooks.length > 1 && (
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-thin">
                {filteredBooks.map((book, idx) => {
                  const isActive = idx === activeBookIndex;
                  return (
                    <button
                      key={book.id}
                      type="button"
                      onClick={() => setActiveBookIndex(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 border cursor-pointer ${
                        isActive
                          ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/25 ring-2 ring-amber-400/40'
                          : 'bg-slate-100 dark:bg-[#0c1228] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-amber-400/40'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">
                        {idx + 1}
                      </span>
                      <span className="truncate max-w-[200px]">{lang === 'en' ? book.titleEn : book.titleHi}</span>
                      <span className="text-[10px] opacity-70 uppercase font-mono">
                        ({book.medium === 'both' ? 'HI/EN' : book.medium.toUpperCase()})
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            {/* 4A. FEATURED ACTIVE BOOK DISPLAY CARD */}
            {activeBook && (
              <motion.div
                key={activeBook.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="rounded-3xl border border-amber-500/40 bg-gradient-to-br from-amber-500/5 via-slate-900/60 to-black/80 backdrop-blur-xl p-5 sm:p-7 shadow-2xl relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row gap-6 items-start justify-between">
                  {/* Left: Book Cover & Details */}
                  <div className="flex flex-col sm:flex-row gap-5 items-start flex-1 min-w-0">
                    {/* Simulated Book Spine Cover */}
                    <div
                      className={`w-28 sm:w-36 aspect-[3/4] rounded-2xl p-3 flex flex-col justify-between shadow-xl border border-white/20 bg-gradient-to-b ${activeBook.coverGradient} relative overflow-hidden shrink-0 group`}
                    >
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full blur-xl pointer-events-none" />
                      <div className="space-y-1">
                        <span className="px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-mono text-amber-300 font-bold uppercase inline-block border border-white/10">
                          {activeBook.badge}
                        </span>
                        <div className="text-[10px] font-mono text-slate-300 truncate">
                          Sem {activeBook.semesters.join(', ')}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <BookOpen className="w-6 h-6 text-amber-300/80 mb-1" />
                        <h4 className="text-[11px] font-bold text-white line-clamp-2 leading-tight">
                          {lang === 'en' ? activeBook.titleEn : activeBook.titleHi}
                        </h4>
                        <div className="text-[9px] text-slate-300 truncate">
                          {lang === 'en' ? activeBook.authorEn : activeBook.authorHi}
                        </div>
                      </div>

                      <div className="pt-1 border-t border-white/20 flex items-center justify-between text-[9px] font-mono text-amber-200">
                        <span>{activeBook.medium === 'both' ? 'HI + EN' : activeBook.medium.toUpperCase()}</span>
                        <span>PDF</span>
                      </div>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-mono font-bold">
                          {activeBook.badge}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono font-bold">
                          {activeBook.medium === 'hi'
                            ? '🇮🇳 हिन्दी माध्यम'
                            : activeBook.medium === 'en'
                            ? '🇬🇧 English Medium'
                            : '🌐 Hindi & English'}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold">
                          Odd Semesters: {activeBook.semesters.map((s) => `Sem ${s}`).join(', ')}
                        </span>
                        {activeBook.pagesOrUnits && (
                          <span className="text-xs font-mono text-slate-400">
                            • {activeBook.pagesOrUnits}
                          </span>
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white leading-tight">
                          {lang === 'en' ? activeBook.titleEn : activeBook.titleHi}
                        </h3>
                        <p className="text-xs sm:text-sm text-amber-600 dark:text-amber-400 font-semibold mt-0.5">
                          {lang === 'en' ? activeBook.authorEn : activeBook.authorHi} •{' '}
                          <span className="text-slate-500 dark:text-slate-400 font-normal">
                            {lang === 'en' ? activeBook.publisherEn : activeBook.publisherHi}
                          </span>
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                        {lang === 'en' ? activeBook.descriptionEn : activeBook.descriptionHi}
                      </p>

                      {/* Key Topics Covered */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                          {lang === 'en' ? 'Syllabus Concepts Covered:' : 'पाठ्यक्रम अनुसार प्रमुख विषय:'}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {activeBook.keyTopics.map((topic, tidx) => (
                            <span
                              key={tidx}
                              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/10 text-[11px] font-mono text-slate-700 dark:text-slate-300"
                            >
                              ✓ {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Download Tip Callout (From User's Uploaded PDF) */}
                      {(activeBook.downloadTipEn || activeBook.downloadTipHi) && (
                        <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start space-x-2 text-xs">
                          <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <div className="text-slate-700 dark:text-amber-200/90 leading-relaxed">
                            <span className="font-bold text-amber-600 dark:text-amber-300">
                              {lang === 'en' ? 'Download Tip: ' : 'डाउनलोड सुझाव: '}
                            </span>
                            {lang === 'en' ? activeBook.downloadTipEn : activeBook.downloadTipHi}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Actions Container */}
                  <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-56 shrink-0">
                    <a
                      href={activeBook.directPdfUrl || activeBook.repositoryUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-500/30 flex items-center justify-center space-x-2 hover:scale-105 active:scale-95 transition-all text-center"
                    >
                      <Download className="w-4 h-4" />
                      <span>
                        {activeBook.isOfficial
                          ? lang === 'en'
                            ? 'Open Official PDF / Portal'
                            : 'आधिकारिक PDF / पोर्टल खोलें'
                          : lang === 'en'
                          ? 'Open University Study Pack'
                          : 'विश्वविद्यालय अध्ययन सामग्री (PDF)'}
                      </span>
                    </a>

                    {activeBook.alternativeSearchUrl && (
                      <a
                        href={activeBook.alternativeSearchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.08] dark:hover:bg-white/[0.12] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/15 font-bold text-xs flex items-center justify-center space-x-2 transition-all text-center"
                      >
                        <Search className="w-3.5 h-3.5 text-amber-500" />
                        <span>
                          {lang === 'en' ? 'Search Digital Archives' : 'डिजिटल आर्काइव में खोजें'}
                        </span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => setActiveModalBook(activeBook)}
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100/80 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.08] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 font-bold text-xs flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-cyan-400" />
                      <span>{lang === 'en' ? 'All Access Options' : 'सभी अध्ययन विकल्प देखें'}</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopyLink(activeBook)}
                        className="py-2 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 text-xs font-bold flex items-center justify-center space-x-1 transition-all"
                        title="Copy direct study material link"
                      >
                        {copiedId === activeBook.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                            <span className="text-emerald-500">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Share</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(activeBook)}
                        className={`py-2 px-2.5 rounded-xl border text-xs font-bold flex items-center justify-center space-x-1 transition-all ${
                          isItemSaved(activeBook.id)
                            ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                            : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                        }`}
                        title="Save to personal study vault"
                      >
                        <Bookmark
                          className={`w-3.5 h-3.5 ${
                            isItemSaved(activeBook.id) ? 'fill-amber-400 text-amber-400' : ''
                          }`}
                        />
                        <span>{isItemSaved(activeBook.id) ? 'Saved' : 'Save'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* 4B. ALL RESPECTIVE BOOKS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 pt-2">
              {filteredBooks.map((book, bIdx) => {
                const isSelected = bIdx === activeBookIndex;
                const isSaved = isItemSaved(book.id);

                return (
                  <motion.div
                    key={book.id}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => setActiveBookIndex(bIdx)}
                    className={`rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg ${
                      isSelected
                        ? 'border-amber-500 bg-amber-500/5 dark:bg-[#0c1228] ring-2 ring-amber-500/40 shadow-amber-500/10'
                        : 'border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#080d22]/85 hover:border-amber-400/50 hover:bg-slate-50 dark:hover:bg-[#0c1538]/60'
                    }`}
                  >
                    <div className="space-y-3">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center space-x-1.5">
                          <span className="w-5 h-5 rounded-full bg-black/40 text-amber-300 text-[10px] font-mono font-bold flex items-center justify-center border border-white/10">
                            {bIdx + 1}
                          </span>
                          <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold">
                            {book.badge}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                          {book.medium === 'hi'
                            ? '🇮🇳 हिन्दी'
                            : book.medium === 'en'
                            ? '🇬🇧 English'
                            : '🌐 Hi / En'}
                        </span>
                      </div>

                      {/* Title & Author */}
                      <div>
                        <h4 className="text-base font-extrabold text-slate-900 dark:text-white line-clamp-2 leading-snug">
                          {lang === 'en' ? book.titleEn : book.titleHi}
                        </h4>
                        <p className="text-xs text-amber-600 dark:text-amber-400 font-medium mt-1 truncate">
                          {lang === 'en' ? book.authorEn : book.authorHi}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                          {lang === 'en' ? book.publisherEn : book.publisherHi}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {lang === 'en' ? book.descriptionEn : book.descriptionHi}
                      </p>

                      {/* Key Topics preview */}
                      <div className="flex flex-wrap gap-1 pt-1">
                        {book.keyTopics.slice(0, 3).map((topic, tidx) => (
                          <span
                            key={tidx}
                            className="px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-[10px] font-mono text-slate-600 dark:text-slate-400 truncate max-w-[180px]"
                          >
                            • {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                        Odd Sem {book.semesters.join(', ')}
                      </span>

                      <div className="flex items-center space-x-1.5" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={book.directPdfUrl || book.repositoryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center space-x-1 shadow-sm transition-all"
                          title="Open official PDF"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>PDF</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => handleToggleBookmark(book)}
                          className={`p-1.5 rounded-xl border text-xs transition-all ${
                            isSaved
                              ? 'bg-amber-500/20 text-amber-400 border-amber-500/50'
                              : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'
                          }`}
                          title="Save to vault"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-amber-400' : ''}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ================================================================ */}
          {/* 5. SDSUV ODD-SEMESTER PAPERS FOR SELECTED SUBJECT                  */}
          {/* ================================================================ */}
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#080d22]/90 backdrop-blur-xl p-6 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  {currentSubjectGroup.code} • Official SDSUV Papers
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  📋 {lang === 'en' ? `SDSUV Prescribed Papers for ${currentSubjectGroup.nameEn} (Odd Semesters)` : `एसडीएसयूवी पाठ्यक्रम के विषम सेमेस्टर प्रश्नपत्र (${currentSubjectGroup.nameHi})`}
                </h3>
              </div>

              <a
                href={currentSubjectGroup.officialSyllabusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-xs font-bold text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 flex items-center space-x-1.5 transition-all w-fit"
              >
                <span>{lang === 'en' ? 'Open University Syllabus PDF' : 'विश्वविद्यालय सिलेबस PDF'}</span>
                <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {currentSubjectGroup.oddSemesterPapers.map((paper) => (
                <div
                  key={paper.semester}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-300 font-mono text-xs font-bold">
                      Semester {paper.semester}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">NEP-2020</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 leading-snug">
                    {lang === 'en' ? paper.paperEn : paper.paperHi}
                  </h4>
                </div>
              ))}
            </div>
          </section>

          {/* ================================================================ */}
          {/* 6. OFFICIAL STUDY-MATERIAL PORTALS & LEGAL NOTICE BANNER          */}
          {/* ================================================================ */}
          <section className="rounded-3xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-[#070b1c] p-6 sm:p-7 space-y-4">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {lang === 'en' ? 'Official National Free Study-Material Portals' : 'आधिकारिक राष्ट्रीय निःशुल्क अध्ययन सामग्री पोर्टल'}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <a
                href={OFFICIAL_PORTAL_LINKS.sdsuvIndex}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  🏛️ SDSUV NEP Syllabus Index
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>sdsuv.ac.in</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              <a
                href={OFFICIAL_PORTAL_LINKS.ncertPortal}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  📖 NCERT Official Textbook Portal
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>ncert.nic.in/textbook.php</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              <a
                href={OFFICIAL_PORTAL_LINKS.egyankoshHome}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  🌐 IGNOU eGyanKosh Repository
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>egyankosh.ac.in</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>

              <a
                href={OFFICIAL_PORTAL_LINKS.sdsuvSyllabusPage}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 rounded-2xl bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-2 group"
              >
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-500 transition-colors">
                  📜 SDSUV Arts Syllabus Directory
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                  <span>Official Arts Papers</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </a>
            </div>

            {/* Official PDF Guidance Points from user uploaded document */}
            <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 space-y-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              <span className="font-bold text-amber-700 dark:text-amber-400 block">
                {lang === 'en' ? 'Important Notes on Using These Free Study Resources:' : 'महत्वपूर्ण दिशानिर्देश एवं अध्ययन सूचना:'}
              </span>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  {lang === 'en'
                    ? 'This directory is a clickable guide to legally hosted official study-material pages and university repositories; not a merged file.'
                    : 'यह निर्देशिका आधिकारिक रूप से उपलब्ध अध्ययन सामग्री पृष्ठों एवं राष्ट्रीय रिपॉजिटरी का वैधानिक संग्रह है।'}
                </li>
                <li>
                  {lang === 'en'
                    ? 'On eGyanKosh, click on the specific course/unit title and then click the "View/Open" button to view or download the chapter PDF.'
                    : 'ई-ज्ञानकोश पर संबंधित इकाई शीर्षक पर क्लिक करने के पश्चात "View/Open" बटन से अध्याय PDF देखें अथवा डाउनलोड करें।'}
                </li>
                <li>
                  {lang === 'en'
                    ? 'Use the papers matching your registered Major/Minor/DSC/GE/SEC combination. Do not assume every optional paper listed is compulsory.'
                    : 'केवल अपने पंजीकृत मेजर/माइनर/डीएससी/जीई/एसईसी संयोजन वाले प्रश्नपत्रों का ही अध्ययन करें।'}
                </li>
                <li>
                  {lang === 'en'
                    ? 'In language subjects (Hindi Literature / English Literature), original literary works remain in that language; supplementary notes provide critical appreciation.'
                    : 'साहित्यिक विषयों में मूल पाठ उसी भाषा में उपलब्ध रहता है; सहायक संदर्भ सामग्री सप्रसंग व्याख्या एवं आलोचनात्मक विश्लेषण प्रदान करती है।'}
                </li>
              </ul>
            </div>
          </section>
        </main>
      </div>

      {/* ==================================================================== */}
      {/* MODAL 1: PREVIEW / BOOK DETAILS MODAL                                */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {activeModalBook && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-amber-500/40 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative text-slate-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <BookMarked className="w-5 h-5 text-amber-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">
                    {activeModalBook.badge} • PDF Details
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveModalBook(null)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-black text-white">
                    {lang === 'en' ? activeModalBook.titleEn : activeModalBook.titleHi}
                  </h3>
                  <p className="text-xs text-amber-400 font-semibold mt-0.5">
                    {lang === 'en' ? activeModalBook.authorEn : activeModalBook.authorHi} •{' '}
                    <span className="text-slate-400 font-normal">
                      {lang === 'en' ? activeModalBook.publisherEn : activeModalBook.publisherHi}
                    </span>
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {lang === 'en' ? activeModalBook.descriptionEn : activeModalBook.descriptionHi}
                </p>

                {/* Key Concepts */}
                <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2">
                  <span className="text-xs font-mono font-bold uppercase text-slate-400 block">
                    Curriculum Topics in this Volume:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalBook.keyTopics.map((k, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono"
                      >
                        ✓ {k}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tip */}
                {(activeModalBook.downloadTipEn || activeModalBook.downloadTipHi) && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200">
                    <span className="font-bold text-amber-300">How to Open / Download: </span>
                    {lang === 'en' ? activeModalBook.downloadTipEn : activeModalBook.downloadTipHi}
                  </div>
                )}
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                <div className="text-xs text-slate-400 font-mono">
                  {lang === 'en'
                    ? 'Verified Study-Material & Access Links:'
                    : 'सत्यापित अध्ययन सामग्री एवं लिंक्स:'}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {/* Primary Link: Official PDF or University Study Module */}
                  <a
                    href={activeModalBook.directPdfUrl || activeModalBook.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs flex items-center justify-between shadow-md"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Download className="w-4 h-4 shrink-0" />
                      <span className="truncate">
                        {activeModalBook.isOfficial
                          ? '1. Official PDF / Portal'
                          : '1. University Module (Free PDF)'}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>

                  {/* Secondary Link: Digital Archive Search that never 404s */}
                  <a
                    href={
                      activeModalBook.alternativeSearchUrl ||
                      `https://archive.org/search?query=${encodeURIComponent(
                        activeModalBook.titleEn
                      )}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-between border border-white/10"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <Search className="w-4 h-4 text-amber-400 shrink-0" />
                      <span className="truncate">2. Public Digital Archives</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  </a>

                  {/* Tertiary Link: Google Books Preview if present */}
                  {activeModalBook.googleBooksUrl && (
                    <a
                      href={activeModalBook.googleBooksUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-xs flex items-center justify-between border border-white/10"
                    >
                      <div className="flex items-center space-x-2 truncate">
                        <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span className="truncate">3. Google Books Preview</span>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                    </a>
                  )}

                  {/* Quaternary Link: SDSUV Subject Syllabus PDF */}
                  <a
                    href={currentSubjectGroup.officialSyllabusUrl || OFFICIAL_PORTAL_LINKS.sdsuvSyllabusPage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 font-bold text-xs flex items-center justify-between border border-white/10"
                  >
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span className="truncate">4. SDSUV {currentSubjectGroup.nameEn} Syllabus (PDF)</span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  </a>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(activeModalBook)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-200 flex items-center space-x-1.5"
                  >
                    {copiedId === activeModalBook.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Link Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Shareable Link</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveModalBook(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* MODAL 2: OFFICIAL UNIVERSITY PORTALS LIST MODAL                      */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {showPortalsModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-white/15 rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl relative text-slate-100"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-white">
                    Official & Verified Study-Material Portals
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPortalsModal(false)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <a
                  href={OFFICIAL_PORTAL_LINKS.sdsuvIndex}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between text-xs transition-all group"
                >
                  <div>
                    <div className="font-bold text-white group-hover:text-amber-400">
                      🏛️ SDSUV NEP Syllabus Index (Official)
                    </div>
                    <div className="text-slate-400 text-[11px] font-mono">https://www.sdsuv.ac.in/</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>

                <a
                  href={OFFICIAL_PORTAL_LINKS.ncertPortal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between text-xs transition-all group"
                >
                  <div>
                    <div className="font-bold text-white group-hover:text-amber-400">
                      📖 NCERT National Textbook Portal
                    </div>
                    <div className="text-slate-400 text-[11px] font-mono">https://ncert.nic.in/textbook.php</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>

                <a
                  href={OFFICIAL_PORTAL_LINKS.egyankoshHome}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between text-xs transition-all group"
                >
                  <div>
                    <div className="font-bold text-white group-hover:text-amber-400">
                      🌐 IGNOU eGyanKosh Repository (English & Hindi)
                    </div>
                    <div className="text-slate-400 text-[11px] font-mono">https://egyankosh.ac.in/</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>

                <a
                  href={OFFICIAL_PORTAL_LINKS.sdsuvSyllabusPage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 flex items-center justify-between text-xs transition-all group"
                >
                  <div>
                    <div className="font-bold text-white group-hover:text-amber-400">
                      📜 SDSUV Faculty of Arts Syllabus Directory
                    </div>
                    <div className="text-slate-400 text-[11px] font-mono">https://www.sdsuv.ac.in/syllabus</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white" />
                </a>
              </div>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setShowPortalsModal(false)}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-bold text-slate-300"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default function BookVaultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070913] text-amber-400 flex items-center justify-center font-mono text-sm">
          Loading SDSUV Free PDF Books Directory...
        </div>
      }
    >
      <BookVaultContent />
    </Suspense>
  );
}
