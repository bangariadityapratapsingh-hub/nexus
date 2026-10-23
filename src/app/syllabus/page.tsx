'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  BookOpen,
  Download,
  Eye,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Award,
  Layers,
  ArrowRight,
  ExternalLink,
  Printer,
  Sparkles,
  ChevronRight,
  BookMarked,
  Globe,
  Landmark,
  Scale,
  Users,
  Check,
  Share2,
  Clock,
  GraduationCap,
  X,
  TrendingUp,
  Compass,
  Feather,
  HeartPulse,
  Palette,
  Lock,
} from 'lucide-react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import PomodoroFocusPod from '@/components/PomodoroFocusPod';
import { LanguageType } from '@/lib/types';
import { useSidebarState } from '@/lib/sidebarState';
import {
  getStudentProfile,
  filterToSelectedSubjects,
  StudentProfile,
} from '@/lib/studentProfile';
import {
  SubjectKey,
  PaperCategory,
  SyllabusPaper,
  SUBJECT_METADATA_LIST,
  SYLLABUS_PAPERS_DATABASE,
} from '@/data/syllabusHubData';

const SUBJECT_ICONS: Record<SubjectKey, React.ElementType> = {
  geography: Globe,
  hindi: BookMarked,
  history: Landmark,
  polscience: Scale,
  sociology: Users,
  economics: TrendingUp,
  anthropology: Compass,
  english: Feather,
  sanskrit: Sparkles,
  homescience: HeartPulse,
  drawing: Palette,
};

export default function SyllabusHubPage() {
  const { isCollapsed } = useSidebarState();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [lang, setLang] = useState<LanguageType>('en');
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey>('geography');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active paper for Drawer Modal
  const [activePaper, setActivePaper] = useState<SyllabusPaper | null>(null);
  // Printable view trigger
  const [printPaper, setPrintPaper] = useState<SyllabusPaper | null>(null);

  // Filter subjects strictly to student's profile selected subjects
  const visibleSubjects = useMemo(() => {
    return filterToSelectedSubjects(
      SUBJECT_METADATA_LIST,
      (s) => s.key,
      profile?.selectedSubjects
    );
  }, [profile?.selectedSubjects]);

  useEffect(() => {
    if (visibleSubjects.length > 0 && !visibleSubjects.some((s) => s.key === selectedSubject)) {
      setSelectedSubject(visibleSubjects[0].key);
    }
  }, [visibleSubjects, selectedSubject]);

  // Sync with profile if available
  useEffect(() => {
    const p = getStudentProfile();
    if (p) {
      setProfile(p);
      if (p.semester && p.semester >= 1 && p.semester <= 10) {
        // If saved semester is even, fallback to 1 as even semesters (2, 4, 6, etc.) are locked
        setSelectedSemester(p.semester % 2 === 0 ? 1 : p.semester);
      }
      setLang(p.preferredMedium);

      const filtered = filterToSelectedSubjects(
        SUBJECT_METADATA_LIST,
        (s) => s.key,
        p.selectedSubjects
      );
      if (filtered.length > 0) {
        setSelectedSubject(filtered[0].key);
      }
    }

    const handleProfile = (e: any) => {
      const updated = e.detail || getStudentProfile();
      setProfile(updated);
      if (updated) {
        const filtered = filterToSelectedSubjects(
          SUBJECT_METADATA_LIST,
          (s) => s.key,
          updated.selectedSubjects
        );
        if (filtered.length > 0) {
          setSelectedSubject(filtered[0].key);
        }
      }
    };
    window.addEventListener('sdsuv_profile_updated', handleProfile);
    return () => window.removeEventListener('sdsuv_profile_updated', handleProfile);
  }, []);

  const currentSubjectMeta = useMemo(() => {
    return (
      visibleSubjects.find((s) => s.key === selectedSubject) ||
      visibleSubjects[0] ||
      SUBJECT_METADATA_LIST[0]
    );
  }, [visibleSubjects, selectedSubject]);

  // Filter papers
  const papers = useMemo(() => {
    const all = SYLLABUS_PAPERS_DATABASE[selectedSubject] || [];
    return all.filter((paper) => {
      // Semester filter
      if (paper.semester !== selectedSemester) return false;

      // Category filter
      if (selectedCategory !== 'ALL' && paper.category !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inTitle = paper.titleEn.toLowerCase().includes(q) || paper.titleHi.toLowerCase().includes(q);
        const inCode = paper.paperCode.toLowerCase().includes(q);
        const inUnits = paper.units.some(
          (u) =>
            u.titleEn.toLowerCase().includes(q) ||
            u.titleHi.toLowerCase().includes(q) ||
            u.topicsEn.some((t) => t.toLowerCase().includes(q)) ||
            u.topicsHi.some((t) => t.toLowerCase().includes(q))
        );
        if (!inTitle && !inCode && !inUnits) return false;
      }

      return true;
    });
  }, [selectedSubject, selectedSemester, selectedCategory, searchQuery]);

  // Categories present in this semester (excluding PRACTICAL)
  const availableCategories = useMemo(() => {
    const allForSubject = SYLLABUS_PAPERS_DATABASE[selectedSubject] || [];
    const forSem = allForSubject.filter((p) => p.semester === selectedSemester);
    const set = new Set<string>();
    forSem.forEach((p) => {
      if (p.category !== 'PRACTICAL') {
        set.add(p.category);
      }
    });
    return Array.from(set);
  }, [selectedSubject, selectedSemester]);

  const handlePrint = (paper: SyllabusPaper) => {
    setPrintPaper(paper);
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="min-h-screen himalayan-mesh-bg text-slate-800 dark:text-slate-100 relative flex flex-col justify-between selection:bg-teal-500 dark:selection:bg-cyan-500 selection:text-white dark:selection:text-black">
      {/* Background Starry Mesh */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[950px] h-[400px] bg-gradient-to-b from-teal-600/10 via-indigo-600/10 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* Floating 5-Tab Navigation Bar */}
      <FloatingNav
        currentTab="syllabus"
        lang={lang}
        setLang={setLang}
      />

      {/* Main Container - dynamically offsets for sidebar and expands to full portion when closed */}
      <div className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-20 relative z-10 ${isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'}`}>
        <main className={`transition-all duration-300 ease-in-out mx-auto px-4 sm:px-6 space-y-8 w-full ${isCollapsed ? 'max-w-[1720px] lg:px-8 xl:px-10' : 'max-w-7xl lg:px-8'}`}>
        {/* Banner with Himalayan Motif and SDSUV NEP-2020 Accreditation */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-200 dark:border-white/10 relative overflow-hidden bg-white dark:bg-gradient-to-r dark:from-[#0d1330] dark:via-[#090d24] dark:to-[#12183a] shadow-xl dark:shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-48 bg-teal-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                {/* 📂 Change Subject / Topic Pill Button */}
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('sdsuv_open_explorer'))}
                  className="px-3 py-1 rounded-full bg-teal-50 hover:bg-teal-100 dark:bg-cyan-950/80 dark:hover:bg-cyan-900 border border-teal-300 dark:border-cyan-500/40 text-teal-800 dark:text-cyan-300 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer"
                  title="Open Subject & Unit Explorer"
                >
                  <span>📂</span>
                  <span>{lang === 'en' ? 'Change Subject / Topic' : 'विषय / टॉपिक बदलें'}</span>
                </button>

                <span className="px-3 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/90 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-400/50 text-[10px] font-mono font-bold flex items-center space-x-1 shadow-sm shadow-emerald-500/20">
                  <Sparkles className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>OFFICIAL SDSUV NEP-2020 SYLLABUS</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-cyan-950 text-teal-800 dark:text-cyan-300 border border-teal-200 dark:border-cyan-500/40 text-[10px] font-mono">
                  Academic Session 2025–2026
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {lang === 'en' ? '📄 SDSUV BA Syllabus Hub' : '📄 श्री देव सुमन विश्वविद्यालय बीए पाठ्यक्रम केंद्र'}
              </h1>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
                {lang === 'en'
                  ? 'Official unit-wise syllabus breakdown, credit distribution, recommended literature, and downloadable curriculum blueprints for Sri Dev Suman Uttarakhand Vishwavidyalaya.'
                  : 'श्री देव सुमन उत्तराखंड विश्वविद्यालय का आधिकारिक एनईपी-2020 इकाई-वार पाठ्यक्रम, क्रेडिट विवरण एवं संदर्भ पुस्तकें।'}
              </p>
            </div>

            {/* Quick Official PDF Download Links */}
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 space-y-2 lg:min-w-[320px]">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400 flex items-center space-x-1">
                <Download className="w-3 h-3 text-cyan-400" />
                <span>{lang === 'en' ? 'Official University Syllabi (PDF)' : 'विश्वविद्यालय आधिकारिक पीडीएफ'}</span>
              </span>
              <div className="grid grid-cols-2 gap-1.5 text-xs">
                {visibleSubjects.map((subj) => (
                  <a
                    key={subj.key}
                    href={subj.officialPdfUrl}
                    download
                    className="p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-cyan-300 border border-white/5 transition-colors flex items-center space-x-1.5 text-[11px]"
                  >
                    <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="truncate">{subj.nameEn}</span>
                  </a>
                ))}
              </div>
              <div className="pt-2 border-t border-white/10">
                <Link
                  href={`/books?subject=${selectedSubject}`}
                  className="w-full py-2 px-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center space-x-2 transition-all group"
                >
                  <BookOpen className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>{lang === 'en' ? '📚 Free PDF Books Directory →' : '📚 निःशुल्क पाठ्यपुस्तकें एवं PDF →'}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 1. SUBJECT SELECTOR TABS                                           */}
        {/* ================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase font-bold text-slate-400 flex items-center space-x-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {lang === 'en'
                  ? `Your Registered Subjects (${visibleSubjects.length} Active)`
                  : `आपके पंजीकृत विषय (${visibleSubjects.length} सक्रिय)`}
              </span>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
            {visibleSubjects.map((subj) => {
              const Icon = SUBJECT_ICONS[subj.key] || BookOpen;
              const isSelected = selectedSubject === subj.key;

              return (
                <button
                  key={subj.key}
                  onClick={() => setSelectedSubject(subj.key)}
                  className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-2 relative overflow-hidden group ${
                    isSelected
                      ? 'bg-gradient-to-br from-cyan-950/70 via-blue-950/60 to-violet-950/70 border-cyan-400 shadow-lg shadow-cyan-500/20'
                      : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`p-2 rounded-xl ${
                        isSelected ? 'bg-cyan-500 text-slate-950' : 'bg-black/50 text-slate-300 border border-white/10'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#06b6d4]" />
                    )}
                  </div>

                  <div>
                    <h3 className={`font-black text-sm ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                      {subj.nameEn}
                    </h3>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{subj.nameHi}</p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 2. SEMESTER SELECTOR (Sem 1 to Sem 8)                              */}
        {/* ================================================================== */}
        <div className="rounded-3xl glass-panel p-4 sm:p-5 border border-white/10 space-y-4 bg-[#090d22]/90 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase font-bold text-slate-400 flex items-center space-x-1.5">
                <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                <span>{lang === 'en' ? 'Step 2: Choose Semester (NEP-2020 10-Semester Structure)' : 'चरण 2: सेमेस्टर चुनें (एनईपी-2020 10-सेमेस्टर संरचना)'}</span>
              </span>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {[
                  { sem: 1, label: 'Cert.' },
                  { sem: 2, label: 'Cert.' },
                  { sem: 3, label: 'Dip.' },
                  { sem: 4, label: 'Dip.' },
                  { sem: 5, label: 'B.A.' },
                  { sem: 6, label: 'B.A.' },
                  { sem: 7, label: 'Hon./Res.' },
                  { sem: 8, label: 'Hon./Res.' },
                  { sem: 9, label: 'M.A.' },
                  { sem: 10, label: 'M.A.' },
                ].map(({ sem, label }) => {
                  const isSelected = selectedSemester === sem;
                  const isEvenLocked = sem % 2 === 0;

                  if (isEvenLocked) {
                    return (
                      <div
                        key={sem}
                        title={
                          lang === 'en'
                            ? `Semester ${sem} is launching soon. Currently focusing on Odd Semesters.`
                            : `सेमेस्टर ${sem} जल्द लाइव होगा। वर्तमान में केवल विषम सेमेस्टर उपलब्ध हैं।`
                        }
                        className="px-2.5 py-1.5 rounded-xl text-xs font-bold border border-dashed border-amber-500/30 bg-amber-500/[0.04] text-slate-500 cursor-not-allowed flex items-center space-x-1 select-none opacity-65"
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
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all border flex items-center space-x-1.5 cursor-pointer ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-md shadow-cyan-500/25 scale-105 font-black'
                          : 'bg-black/40 text-slate-400 border-white/5 hover:text-white hover:bg-white/[0.05]'
                      }`}
                    >
                      <span>Sem {sem}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${isSelected ? 'bg-black/25 text-slate-950 font-bold' : 'bg-white/10 text-slate-400'}`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Search within Syllabus */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-violet-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === 'en' ? 'Search units, topics, terms...' : 'इकाई या टॉपिक खोजें...'}
                className="w-full bg-black/60 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Category Filter Chips: All, DSC, DSE, GE, PROJECT, SEC */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/5">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono mr-1">
              {lang === 'en' ? 'Paper Category:' : 'पेपर प्रकार:'}
            </span>
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                selectedCategory === 'ALL'
                  ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm'
                  : 'bg-white/[0.03] text-slate-300 border-white/5 hover:bg-white/[0.07]'
              }`}
            >
              All Papers
            </button>
            {['DSC', 'DSE', 'GE', 'PROJECT', 'SEC'].map((cat) => {
              const isAvailable = availableCategories.includes(cat);
              const isSelected = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  disabled={!isAvailable}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all ${
                    isSelected
                      ? 'bg-cyan-500 text-slate-950 border-cyan-400 shadow-sm'
                      : isAvailable
                      ? 'bg-white/[0.03] text-slate-300 border-white/5 hover:bg-white/[0.07]'
                      : 'opacity-40 cursor-not-allowed bg-black/20 text-slate-600 border-white/5'
                  }`}
                >
                  {cat === 'DSC'
                    ? '🏛️ DSC (Core)'
                    : cat === 'DSE'
                    ? '🔬 DSE (Elective)'
                    : cat === 'GE'
                    ? '🌐 GE (Generic)'
                    : cat === 'PROJECT'
                    ? '📑 Project / Thesis'
                    : '⚡ SEC (Skill)'}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* 3. SYLLABUS CARDS GRID                                             */}
        {/* ================================================================== */}
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>
              Showing {papers.length} syllabus modules for <strong>{currentSubjectMeta.nameEn}</strong> (Semester {selectedSemester})
            </span>
            <a
              href={currentSubjectMeta.officialPdfUrl}
              download
              className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1 font-bold"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Full {currentSubjectMeta.nameEn} PDF</span>
            </a>
          </div>

          {papers.length === 0 ? (
            <div className="p-12 rounded-3xl glass-panel border border-white/10 text-center space-y-3">
              <FileText className="w-10 h-10 text-slate-500 mx-auto" />
              <h4 className="text-base font-bold text-white">No Papers Found Matching Filters</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                No specific papers found for Semester {selectedSemester} with the chosen category filter. Try selecting 'All Papers' or switching semesters.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {papers.map((paper) => {
                const isCore = paper.category === 'DSC';

                return (
                  <motion.div
                    key={paper.paperCode}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.2 }}
                    className={`rounded-3xl p-6 glass-panel border flex flex-col justify-between space-y-5 relative overflow-hidden transition-all shadow-xl ${
                      isCore
                        ? 'border-cyan-500/30 hover:border-cyan-400/60 bg-gradient-to-b from-[#0b1028] to-[#070b1e]'
                        : 'border-white/10 hover:border-white/20 bg-gradient-to-b from-[#0a0e24] to-[#060818]'
                    }`}
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold border ${
                              paper.category === 'DSC'
                                ? 'bg-cyan-950 text-cyan-300 border-cyan-400/40'
                                : paper.category === 'DSE'
                                ? 'bg-violet-950 text-violet-300 border-violet-400/40'
                                : paper.category === 'GE'
                                ? 'bg-amber-950 text-amber-300 border-amber-400/40'
                                : paper.category === 'PROJECT'
                                ? 'bg-fuchsia-950 text-fuchsia-300 border-fuchsia-400/40'
                                : paper.category === 'SEC'
                                ? 'bg-blue-950 text-blue-300 border-blue-400/40'
                                : 'bg-emerald-950 text-emerald-300 border-emerald-400/40'
                            }`}
                          >
                            {paper.category} • Sem {paper.semester}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400">{paper.paperCode}</span>
                        </div>

                        <div className="flex items-center space-x-1.5 text-[11px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded-lg border border-emerald-500/30">
                          <Award className="w-3 h-3" />
                          <span>{paper.credits} Credits</span>
                        </div>
                      </div>

                      {/* Paper Title */}
                      <h3 className="text-lg font-black text-white leading-snug">
                        {paper.titleEn}
                      </h3>
                      <p className="text-xs font-semibold text-cyan-300 mt-0.5">
                        {paper.titleHi}
                      </p>

                      <p className="text-xs text-slate-300 mt-2.5 leading-relaxed line-clamp-2">
                        {lang === 'en' ? paper.objectiveEn : paper.objectiveHi}
                      </p>

                      {/* Unit-wise Topics Breakdown Preview */}
                      <div className="mt-4 space-y-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 font-mono block">
                          Unit-wise Structure ({paper.units.length} Units):
                        </span>
                        <div className="space-y-1.5">
                          {paper.units.map((unit) => (
                            <div
                              key={unit.unitNumber}
                              className="p-2.5 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-white text-[11px]">
                                  {unit.unitRoman}: {unit.titleEn}
                                </span>
                                <span className="text-[10px] font-mono text-slate-400">
                                  {unit.estimatedHours} hrs
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-400 line-clamp-1">
                                {unit.topicsEn.slice(0, 3).join(' • ')}...
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Suggested Books snippet */}
                      {paper.suggestedBooks && paper.suggestedBooks.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-white/5 text-[11px] text-slate-400 space-y-1">
                          <span className="font-bold text-slate-300 flex items-center space-x-1">
                            <BookOpen className="w-3 h-3 text-amber-400" />
                            <span>Recommended Book:</span>
                          </span>
                          <p className="truncate text-slate-300">
                            {paper.suggestedBooks[0].title} — <em>{paper.suggestedBooks[0].author}</em>
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Bottom Action Buttons */}
                    <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                      <button
                        onClick={() => setActivePaper(paper)}
                        className="px-4 py-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-cyan-300 hover:text-white border border-white/10 font-bold text-xs flex items-center space-x-1.5 transition-all"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{lang === 'en' ? '👁️ View Full Breakdown' : '👁️ संपूर्ण पाठ्यक्रम देखें'}</span>
                      </button>

                      <div className="flex items-center space-x-1.5">
                        <button
                          onClick={() => handlePrint(paper)}
                          className="px-3 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 border border-white/10 text-xs font-bold transition-all flex items-center space-x-1"
                          title="Print or Save as PDF"
                        >
                          <Printer className="w-3.5 h-3.5 text-slate-400" />
                          <span className="hidden sm:inline">Print</span>
                        </button>

                        <a
                          href={paper.pdfFileUrl}
                          download
                          className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs flex items-center space-x-1.5 shadow-md shadow-cyan-500/20 hover:scale-105 transition-all"
                        >
                          <Download className="w-3.5 h-3.5 text-slate-950" />
                          <span>PDF</span>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      </div>

      {/* ================================================================== */}
      {/* 4. MODAL / DRAWER: FULL DETAILED SYLLABUS BREAKDOWN                 */}
      {/* ================================================================== */}
      <AnimatePresence>
        {activePaper && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0b1028] border border-cyan-500/40 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-8 shadow-2xl relative space-y-6"
            >
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                      {activePaper.category} • Sem {activePaper.semester}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="text-emerald-400 font-bold">{activePaper.credits} Credits</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-amber-400 font-bold">
                      Marks: {activePaper.externalMarks} External + {activePaper.internalMarks} Internal = {activePaper.maxMarks}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white">{activePaper.titleEn}</h2>
                  <p className="text-sm font-bold text-cyan-300 mt-0.5">{activePaper.titleHi}</p>
                  <span className="text-[11px] font-mono text-slate-400 block mt-1">
                    Course Code: {activePaper.paperCode} • SDSUV NEP-2020
                  </span>
                </div>

                <button
                  onClick={() => setActivePaper(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Course Objectives */}
              <div className="p-4 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-cyan-300">
                  Course Learning Outcomes & Objectives:
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">{activePaper.objectiveEn}</p>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">{activePaper.objectiveHi}</p>
              </div>

              {/* Detailed Unit-by-Unit Topics */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase font-bold text-slate-400 flex items-center space-x-1.5">
                  <Layers className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Comprehensive Unit-wise Syllabus</span>
                </h4>

                <div className="space-y-3">
                  {activePaper.units.map((unit) => (
                    <div
                      key={unit.unitNumber}
                      className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/5">
                        <div>
                          <span className="text-xs font-extrabold text-cyan-300">
                            {unit.unitRoman}: {unit.titleEn}
                          </span>
                          <span className="text-xs text-slate-400 block">{unit.titleHi}</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-md bg-black/60 text-slate-300 border border-white/10 text-[10px] font-mono">
                          {unit.estimatedHours} Lecture Hours
                        </span>
                      </div>

                      {/* Topics bullet points */}
                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                          Topics in English:
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-300 pl-1">
                          {unit.topicsEn.map((topic, i) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="space-y-1 pt-1">
                        <span className="text-[10px] font-mono text-slate-400 uppercase font-bold">
                          पाठ्यक्रम (हिन्दी में):
                        </span>
                        <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-300 pl-1">
                          {unit.topicsHi.map((topic, i) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Books List */}
              {activePaper.suggestedBooks && activePaper.suggestedBooks.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-mono uppercase font-bold text-slate-400 flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>Suggested Reference Books (Hindi & English)</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activePaper.suggestedBooks.map((b, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
                        <h5 className="font-bold text-white text-[11px]">{b.title}</h5>
                        <p className="text-[10px] text-slate-400">
                          Author: <strong>{b.author}</strong> {b.publisher && `• ${b.publisher}`}
                        </p>
                        <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-mono bg-white/10 text-cyan-300">
                          {b.language} Edition
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="text-slate-400 font-mono text-[11px]">
                  SDSUV Board of Studies Verified • NEP-2020 Framework
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePrint(activePaper)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Syllabus Sheet</span>
                  </button>

                  <a
                    href={activePaper.pdfFileUrl}
                    download
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5"
                  >
                    <Download className="w-3.5 h-3.5 text-slate-950" />
                    <span>Download Official PDF</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ================================================================== */}
      {/* 5. HIDDEN PRINTABLE SYLLABUS SHEET (FOR CLEAN BROWSER PRINT / PDF)  */}
      {/* ================================================================== */}
      {printPaper && (
        <div className="hidden print:block fixed inset-0 bg-white text-black p-8 z-[9999] overflow-auto">
          <div className="border-b-2 border-black pb-4 mb-4">
            <h1 className="text-2xl font-bold uppercase">Sri Dev Suman Uttarakhand Vishwavidyalaya</h1>
            <p className="text-sm font-semibold">Badshahithaul, Tehri Garhwal, Uttarakhand (NEP-2020 Framework)</p>
            <h2 className="text-lg font-bold mt-2">
              Syllabus for: {printPaper.titleEn} ({printPaper.paperCode})
            </h2>
            <p className="text-xs">
              Semester: {printPaper.semester} • Category: {printPaper.category} • Credits: {printPaper.credits}
            </p>
            <p className="text-xs">
              Marks: {printPaper.externalMarks} External Exam + {printPaper.internalMarks} Internal Assessment = {printPaper.maxMarks} Total Marks
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase underline">Unit-Wise Detailed Course Outline:</h3>
            {printPaper.units.map((u) => (
              <div key={u.unitNumber} className="border-b border-gray-300 pb-2 mb-2 text-xs">
                <div className="font-bold">
                  {u.unitRoman}: {u.titleEn} / {u.titleHi} ({u.estimatedHours} Hours)
                </div>
                <div className="mt-1">
                  <strong>Topics:</strong> {u.topicsEn.join(', ')}
                </div>
              </div>
            ))}

            {printPaper.suggestedBooks && printPaper.suggestedBooks.length > 0 && (
              <div className="mt-4 pt-2">
                <h4 className="text-xs font-bold uppercase underline">Suggested Reading & Reference Literature:</h4>
                <ul className="list-disc list-inside text-xs mt-1">
                  {printPaper.suggestedBooks.map((b, idx) => (
                    <li key={idx}>
                      {b.title} by {b.author} ({b.publisher || 'University Press'})
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Pomodoro Focus Pod */}
      <PomodoroFocusPod lang={lang} />

      {/* Footer */}
      <Footer lang={lang} />
    </div>
  );
}
