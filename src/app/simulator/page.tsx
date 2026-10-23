'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  GraduationCap,
  Sparkles,
  Printer,
  Download,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Pause,
  Play,
  Eye,
  EyeOff,
  Flame,
  Layers,
  HelpCircle,
  Award,
  ChevronDown,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import { COMPREHENSIVE_PYQ_DATA, DetailedPYQ } from '@/data/pyqVaultData';
import { STREAMS_CONFIG } from '@/data/portalData';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import {
  getStudentProfile,
  COURSE_SEMESTER_SUBJECTS,
  filterToSelectedSubjects,
  isSubjectMatchingSelected,
  StudentProfile,
} from '@/lib/studentProfile';
import { useSidebarState } from '@/lib/sidebarState';

interface ModelPaperStructure {
  paperTitleEn: string;
  paperTitleHi: string;
  subjectCode: string;
  semester: number;
  totalMarks: number;
  timeHours: number;
  sectionA: DetailedPYQ[]; // 10 questions x 2 Marks = 20 Marks (Compulsory)
  sectionB: DetailedPYQ[]; // 8 questions (Attempt 5 x 5 Marks = 25 Marks)
  sectionC: DetailedPYQ[]; // 4 questions (Attempt 2 x 15 Marks = 30 Marks)
}

export default function SimulatorPage() {
  const { isCollapsed } = useSidebarState();
  const [stream, setStream] = useState<StreamType>('bsc-maths');
  const [lang, setLang] = useState<LanguageType>('en');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [selectedSubjectCode, setSelectedSubjectCode] = useState<string>('');

  const streamConfig = STREAMS_CONFIG[stream];

  // Sync with student profile
  useEffect(() => {
    const p = getStudentProfile();
    if (p) {
      setProfile(p);
      setStream(p.stream);
      setLang(p.preferredMedium);
      if (p.selectedSubjects && p.selectedSubjects.length > 0) {
        setSelectedSubjectCode(p.selectedSubjects[0]);
      }
    }
    const handleProfile = (e: any) => {
      const updated = e.detail || getStudentProfile();
      if (updated) {
        setProfile(updated);
        setStream(updated.stream);
        setLang(updated.preferredMedium);
        if (updated.selectedSubjects && updated.selectedSubjects.length > 0) {
          setSelectedSubjectCode(updated.selectedSubjects[0]);
        }
      }
    };
    window.addEventListener('sdsuv_profile_updated', handleProfile);
    return () => window.removeEventListener('sdsuv_profile_updated', handleProfile);
  }, []);

  // Filter available subjects strictly to student's profile
  const availableSimulatorSubjects = useMemo(() => {
    const allOptions = COURSE_SEMESTER_SUBJECTS[stream] || [];
    return filterToSelectedSubjects(allOptions, (s) => s.code, profile?.selectedSubjects);
  }, [stream, profile?.selectedSubjects]);

  // Active chosen subject option
  const activeSubjectOption = useMemo(() => {
    return (
      availableSimulatorSubjects.find((s) => s.code === selectedSubjectCode) ||
      availableSimulatorSubjects[0] ||
      (COURSE_SEMESTER_SUBJECTS[stream] && COURSE_SEMESTER_SUBJECTS[stream][0])
    );
  }, [availableSimulatorSubjects, selectedSubjectCode, stream]);

  // Candidate Mock Info
  const [candidateRoll, setCandidateRoll] = useState('2401890214');
  const [candidateCenter, setCandidateCenter] = useState('Pt. LMS Rishikesh Campus (Code: 104)');

  // 3-Hour Countdown Timer (180 minutes = 10,800 seconds)
  const [timerSeconds, setTimerSeconds] = useState(10800);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Student Attempted Checklist
  const [attemptedQuestions, setAttemptedQuestions] = useState<Record<string, boolean>>({});
  const [studentNotes, setStudentNotes] = useState<Record<string, string>>({});

  // Solution Reveal State
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Generation Random Seed / Version
  const [paperVersion, setPaperVersion] = useState(1);

  // Generate SDSUV Model Paper based on selected stream & version
  const modelPaper: ModelPaperStructure = useMemo(() => {
    const subjectInfo = activeSubjectOption
      ? { code: activeSubjectOption.code, titleEn: activeSubjectOption.nameEn, titleHi: activeSubjectOption.nameHi }
      : stream === 'bsc-maths'
      ? { code: 'SDSUV-PHY-201', titleEn: 'Physics (Optics & Quantum Mechanics)', titleHi: 'भौतिक विज्ञान (प्रकाशिकी एवं क्वांटम यांत्रिकी)' }
      : stream === 'bsc-bio'
      ? { code: 'SDSUV-BOT-201', titleEn: 'Botany (Plant Physiology & Biochemistry)', titleHi: 'वनस्पति विज्ञान (पादप कार्यिकी)' }
      : { code: 'SDSUV-POL-201', titleEn: 'Political Science (Indian Govt & Politics)', titleHi: 'राजनीति विज्ञान (भारतीय शासन एवं राजनीति)' };

    const streamQuestionsAll = COMPREHENSIVE_PYQ_DATA.filter((q) => q.stream === stream);
    const matchingSubjectQuestions = streamQuestionsAll.filter((q) =>
      isSubjectMatchingSelected(q.subjectCode, [subjectInfo.code])
    );
    const streamQuestions = matchingSubjectQuestions.length >= 10 ? matchingSubjectQuestions : streamQuestionsAll;

    // Filter by sections or generate synthetic blueprint items
    const secA_raw = streamQuestions.filter((q) => q.section === 'A' || q.marks === 2);
    const secB_raw = streamQuestions.filter((q) => q.section === 'B' || q.marks === 5 || q.marks === 10);
    const secC_raw = streamQuestions.filter((q) => q.section === 'C' || q.marks >= 10);

    // Expand to 10 for Section A, 8 for Section B, 4 for Section C
    const padItems = (source: DetailedPYQ[], needed: number, defaultPrefix: string): DetailedPYQ[] => {
      const result: DetailedPYQ[] = [];
      for (let i = 0; i < needed; i++) {
        if (source[i]) {
          result.push(source[i]);
        } else {
          // Wrap around or generate realistic variant
          const template = source[i % source.length] || streamQuestions[0];
          result.push({
            ...template,
            id: `${template.id}-v${paperVersion}-q${i + 1}`,
            questionEn: `(${i + 1}) ${template.questionEn}`,
            questionHi: `(${i + 1}) ${template.questionHi}`,
          });
        }
      }
      return result;
    };

    return {
      paperTitleEn: subjectInfo.titleEn,
      paperTitleHi: subjectInfo.titleHi,
      subjectCode: subjectInfo.code,
      semester: 4,
      totalMarks: 75,
      timeHours: 3,
      sectionA: padItems(secA_raw.length > 0 ? secA_raw : streamQuestions, 10, 'SecA'),
      sectionB: padItems(secB_raw.length > 0 ? secB_raw : streamQuestions, 8, 'SecB'),
      sectionC: padItems(secC_raw.length > 0 ? secC_raw : streamQuestions, 4, 'SecC'),
    };
  }, [stream, paperVersion, activeSubjectOption]);

  // Countdown timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerActive && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerActive, timerSeconds]);

  const toggleAttempted = (id: string) => {
    setAttemptedQuestions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleAnswerReveal = (id: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRegenerate = () => {
    setPaperVersion((prev) => prev + 1);
    setAttemptedQuestions({});
    setStudentNotes({});
    setRevealedAnswers({});
    setTimerSeconds(10800);
    setIsTimerActive(false);
  };

  const formatTimer = (totalSecs: number) => {
    const hrs = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Attempt statistics
  const countSecA = modelPaper.sectionA.filter((q) => attemptedQuestions[q.id]).length;
  const countSecB = modelPaper.sectionB.filter((q) => attemptedQuestions[q.id]).length;
  const countSecC = modelPaper.sectionC.filter((q) => attemptedQuestions[q.id]).length;

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 himalayan-mesh-bg relative selection:bg-cyan-500 selection:text-black">
      {/* Background Starry Mesh */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0 print:hidden" />
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-600/10 via-amber-600/10 to-transparent blur-[120px] pointer-events-none z-0 print:hidden" />

      {/* Floating Header */}
      {/* Top Floating Glass Navigation Bar (4 Spacious Tabs + Medium + Profile) */}
      <div className="print:hidden">
        <FloatingNav currentTab="pyqs" lang={lang} setLang={setLang} />
      </div>

      {/* Dynamic offset wrapper for responsive sidebar transitions */}
      <div className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-24 md:pb-16 relative z-10 ${isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'}`}>
        {/* Sub-Header: Live 3-Hour Countdown Clock & Print Controls */}
        <div className={`mx-auto px-4 sm:px-6 w-full ${isCollapsed ? 'max-w-[1720px] lg:px-8 xl:px-10' : 'max-w-5xl lg:px-8'} relative z-20 print:hidden`}>
          <div className="glass-nav rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border border-white/10 shadow-lg bg-[#080d22]/80 backdrop-blur-xl">
            <div className="flex items-center space-x-3">
              <Link
                href="/dashboard"
                className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-300 hover:text-white border border-white/10 transition-colors flex items-center space-x-1.5 text-xs font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden sm:inline">{lang === 'en' ? 'Dashboard' : 'डैशबोर्ड'}</span>
              </Link>

              <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

              <div className="flex items-center space-x-2">
                <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-amber-300">
                  SDSUV PAPER SIMULATOR
                </span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20 font-mono">
                  3-Hour Format
                </span>
                <h1 className="text-xs font-bold text-white truncate max-w-xs md:max-w-md hidden sm:block">
                  {modelPaper.paperTitleEn}
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Live 3-Hour Countdown Clock */}
              <div
                className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs ${
                  timerSeconds < 1800
                    ? 'bg-rose-950/80 border-rose-500/50 text-rose-300 animate-pulse'
                    : 'bg-black/50 border-cyan-500/30 text-cyan-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTimer(timerSeconds)}</span>
                <button
                  onClick={() => setIsTimerActive(!isTimerActive)}
                  className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white ml-1"
                  title={isTimerActive ? 'Pause Timer' : 'Start 3-Hour Clock'}
                >
                  {isTimerActive ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                </button>
              </div>

              {/* Print / Download Button */}
              <button
                onClick={handlePrint}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 text-xs font-extrabold flex items-center space-x-1.5 shadow-md shadow-amber-500/20 transition-all"
                title="Download or Print PDF View"
              >
                <Printer className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Print / PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Paper Simulator Layout */}
        <main className={`mx-auto px-4 sm:px-6 py-6 space-y-6 w-full ${isCollapsed ? 'max-w-[1720px] lg:px-8 xl:px-10' : 'max-w-5xl lg:px-8'} relative z-10 print:p-0 print:m-0 print:max-w-none print:text-black`}>
        {/* Simulator Control Dashboard */}
        <div className="rounded-3xl glass-panel p-5 sm:p-6 border border-white/10 bg-[#090d21]/90 shadow-2xl print:hidden space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-1">
                <Sparkles className="w-4 h-4" />
                <span>SDSUV NEP 2020 MODEL PAPER GENERATOR</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {lang === 'en' ? 'Authentic 3-Hour University Examination Paper' : '3-घंटे की वास्तविक विश्वविद्यालय परीक्षा पुस्तिका'}
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <Link
                href="/profile"
                className="px-3 py-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-900/60 transition-colors flex items-center space-x-1"
                title="Click to switch Course in Profile"
              >
                <span>{streamConfig.shortLabel}</span>
                <span className="text-[10px] text-slate-400 font-mono">⚙️</span>
              </Link>

              <button
                onClick={handleRegenerate}
                className="px-3.5 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-bold flex items-center space-x-1.5 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Regenerate Fresh Paper' : 'नया पेपर बनाएं'}</span>
              </button>
            </div>
          </div>

          {/* Enrolled Subject Selector for Simulator */}
          {availableSimulatorSubjects.length > 1 && (
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 pt-1 border-t border-white/5 scrollbar-none">
              <span className="text-[10px] font-mono uppercase text-slate-400 font-bold shrink-0">
                {lang === 'en' ? 'Enrolled Subject:' : 'नामांकित विषय:'}
              </span>
              <div className="flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
                {availableSimulatorSubjects.map((sub) => {
                  const isSelected = activeSubjectOption?.code === sub.code;
                  return (
                    <button
                      key={sub.code}
                      onClick={() => {
                        setSelectedSubjectCode(sub.code);
                        setPaperVersion((v) => v + 1);
                      }}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                        isSelected
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                          : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08]'
                      }`}
                    >
                      {lang === 'en' ? sub.nameEn.split('(')[0].trim() : sub.nameHi.split('(')[0].trim()}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Section Attempt Tracker Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3 border-t border-white/5 text-xs">
            {/* Section A Counter */}
            <div
              className={`p-3 rounded-2xl border transition-all ${
                countSecA === 10
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : 'bg-black/40 border-white/5 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-mono font-bold text-[10px] uppercase">
                <span>Section A • Compulsory</span>
                <span>{countSecA} / 10 Attempted</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
                <div
                  className="h-full bg-emerald-400 transition-all duration-300"
                  style={{ width: `${(countSecA / 10) * 100}%` }}
                />
              </div>
            </div>

            {/* Section B Counter */}
            <div
              className={`p-3 rounded-2xl border transition-all ${
                countSecB === 5
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : countSecB > 5
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                  : 'bg-black/40 border-white/5 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-mono font-bold text-[10px] uppercase">
                <span>Section B • Attempt 5</span>
                <span>{countSecB} / 5 Selected</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${countSecB > 5 ? 'bg-rose-500' : 'bg-violet-400'}`}
                  style={{ width: `${Math.min(100, (countSecB / 5) * 100)}%` }}
                />
              </div>
            </div>

            {/* Section C Counter */}
            <div
              className={`p-3 rounded-2xl border transition-all ${
                countSecC === 2
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : countSecC > 2
                  ? 'bg-rose-950/40 border-rose-500/50 text-rose-300'
                  : 'bg-black/40 border-white/5 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between font-mono font-bold text-[10px] uppercase">
                <span>Section C • Attempt 2</span>
                <span>{countSecC} / 2 Selected</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-slate-800 mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${countSecC > 2 ? 'bg-rose-500' : 'bg-amber-400'}`}
                  style={{ width: `${Math.min(100, (countSecC / 2) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* AUTHENTIC SDSUV QUESTION PAPER SHEET (Printable Paper View)   */}
        {/* ============================================================== */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/15 bg-[#080b1a] shadow-2xl space-y-8 print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
          {/* Formal University Header Box */}
          <div className="text-center border-b-2 border-white/20 pb-6 print:border-black print:pb-4 space-y-2">
            <div className="flex items-center justify-center space-x-3 mb-1">
              <div className="w-12 h-12 rounded-xl overflow-hidden ring-1 ring-cyan-500/40 relative shrink-0 print:hidden">
                <Image src="/images/sdsuv_crest.png" alt="SDSUV Crest" width={48} height={48} className="object-cover" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-wider text-white print:text-black">
                  Sri Dev Suman Uttarakhand Vishwavidyalaya
                </h2>
                <h3 className="text-xs sm:text-sm font-bold text-amber-300 print:text-gray-800">
                  श्री देव सुमन उत्तराखण्ड विश्वविद्यालय • बादशाहीथौल (टिहरी गढ़वाल)
                </h3>
              </div>
            </div>

            <p className="text-xs font-mono text-slate-300 print:text-black">
              Undergraduate Degree Semester Examination (NEP-2020 Pattern)
            </p>

            <div className="p-3 rounded-2xl bg-black/40 border border-white/10 print:bg-transparent print:border-black print:p-2 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                <div>
                  <span className="text-slate-400 print:text-gray-600 block text-[10px]">PAPER CODE</span>
                  <span className="font-bold text-cyan-400 print:text-black text-sm">{modelPaper.subjectCode}</span>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-600 block text-[10px]">SEMESTER</span>
                  <span className="font-bold text-white print:text-black text-sm">Sem IV (Even)</span>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-600 block text-[10px]">TIME ALLOWED</span>
                  <span className="font-bold text-amber-400 print:text-black text-sm">3 Hours (180 Mins)</span>
                </div>
                <div>
                  <span className="text-slate-400 print:text-gray-600 block text-[10px]">MAXIMUM MARKS</span>
                  <span className="font-bold text-emerald-400 print:text-black text-sm">75 Marks</span>
                </div>
              </div>
            </div>

            {/* Candidate Entry Bar */}
            <div className="flex flex-wrap items-center justify-between text-xs font-mono pt-2 text-slate-300 print:text-black">
              <div className="flex items-center space-x-2">
                <span>Roll No.:</span>
                <span className="px-2 py-0.5 border-b border-white/40 print:border-black font-bold tracking-widest text-cyan-300 print:text-black">
                  {candidateRoll}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span>Exam Center:</span>
                <span className="border-b border-white/40 print:border-black font-bold text-slate-200 print:text-black">
                  {candidateCenter}
                </span>
              </div>
            </div>

            {/* Official Instructions */}
            <div className="text-left bg-white/[0.02] p-3 rounded-xl border border-white/5 print:border-black text-[11px] text-slate-300 print:text-black space-y-1 mt-2">
              <p className="font-bold text-cyan-300 print:text-black uppercase">General Instructions / सामान्य निर्देश:</p>
              <ol className="list-decimal pl-4 space-y-0.5">
                <li>Attempt all questions from <strong>Section A</strong> (10 × 2 = 20 Marks). All questions compulsory.</li>
                <li>Attempt any <strong>FIVE</strong> questions from <strong>Section B</strong> (5 × 5 = 25 Marks).</li>
                <li>Attempt any <strong>TWO</strong> questions from <strong>Section C</strong> (2 × 15 = 30 Marks).</li>
                <li>Write answers in either English or Hindi medium uniformly throughout the answer booklet.</li>
              </ol>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION A: SHORT QUESTIONS (10 x 2 = 20 Marks, Compulsory)     */}
          {/* ============================================================== */}
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 print:border-black">
              <div>
                <h3 className="text-sm font-black text-cyan-400 print:text-black uppercase tracking-wider">
                  SECTION A / खंड ‘क’ (Compulsory / अनिवार्य)
                </h3>
                <p className="text-[11px] text-slate-400 print:text-gray-700">
                  Answer ALL ten questions. Each question carries 2 marks (Word limit: ~50 words).
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-cyan-300 print:text-black">
                [10 × 2 = 20 Marks]
              </span>
            </div>

            <div className="space-y-3">
              {modelPaper.sectionA.map((q, idx) => {
                const isAttempted = !!attemptedQuestions[q.id];
                const isRevealed = !!revealedAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isAttempted
                        ? 'bg-emerald-950/20 border-emerald-500/40 print:border-none'
                        : 'bg-white/[0.02] border-white/5 print:border-none'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 print:text-gray-600">
                          <span className="font-bold text-cyan-400 print:text-black">Q.{idx + 1}</span>
                          <span>•</span>
                          <span>2 Marks</span>
                          <span>•</span>
                          <span className="print:hidden">SDSUV PYQ ({q.repeatedCount}x)</span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-white print:text-black leading-relaxed">
                          {lang === 'en' ? q.questionEn : q.questionHi}
                        </p>
                        <p className="text-xs text-slate-400 print:text-gray-600 italic">
                          {lang === 'en' ? q.questionHi : q.questionEn}
                        </p>
                      </div>

                      {/* Interactive Controls (Hidden in Print) */}
                      <div className="flex items-center space-x-1.5 shrink-0 print:hidden">
                        <button
                          onClick={() => toggleAnswerReveal(q.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                          title="Reveal Answer & Rubric"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-cyan-400" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => toggleAttempted(q.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                            isAttempted
                              ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                              : 'bg-black/40 text-slate-400 border-white/10 hover:text-white'
                          }`}
                        >
                          {isAttempted ? 'Done ✓' : 'Attempt'}
                        </button>
                      </div>
                    </div>

                    {/* Revealed Solution Box */}
                    {isRevealed && (
                      <div className="mt-2.5 p-3 rounded-xl bg-black/60 border border-cyan-500/20 text-xs text-slate-300 space-y-1 print:hidden">
                        <span className="text-cyan-300 font-bold block text-[10px] uppercase">Model Answer Key:</span>
                        <p className="leading-relaxed font-sans">{lang === 'en' ? q.solutionEn : q.solutionHi}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION B: MEDIUM QUESTIONS (Attempt 5 of 8 x 5M = 25 Marks)  */}
          {/* ============================================================== */}
          <div className="space-y-4 pt-4 border-t border-white/10 print:border-black">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 print:border-black">
              <div>
                <h3 className="text-sm font-black text-violet-400 print:text-black uppercase tracking-wider">
                  SECTION B / खंड ‘ख’ (Analytical / विश्लेषणात्मक)
                </h3>
                <p className="text-[11px] text-slate-400 print:text-gray-700">
                  Attempt any <strong>FIVE</strong> questions out of eight. Each question carries 5 marks (~200 words).
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-violet-300 print:text-black">
                [5 × 5 = 25 Marks]
              </span>
            </div>

            <div className="space-y-3">
              {modelPaper.sectionB.map((q, idx) => {
                const isAttempted = !!attemptedQuestions[q.id];
                const isRevealed = !!revealedAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isAttempted
                        ? 'bg-violet-950/20 border-violet-500/40 print:border-none'
                        : 'bg-white/[0.02] border-white/5 print:border-none'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 print:text-gray-600">
                          <span className="font-bold text-violet-400 print:text-black">Q.{idx + 11}</span>
                          <span>•</span>
                          <span>5 Marks</span>
                          <span>•</span>
                          <span>{q.topicEn}</span>
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-white print:text-black leading-relaxed">
                          {lang === 'en' ? q.questionEn : q.questionHi}
                        </p>
                        <p className="text-xs text-slate-400 print:text-gray-600 italic">
                          {lang === 'en' ? q.questionHi : q.questionEn}
                        </p>
                      </div>

                      {/* Interactive Controls */}
                      <div className="flex items-center space-x-1.5 shrink-0 print:hidden">
                        <button
                          onClick={() => toggleAnswerReveal(q.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                          title="Reveal Answer & Rubric"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-violet-400" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => toggleAttempted(q.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all ${
                            isAttempted
                              ? 'bg-violet-500 text-white border-violet-400'
                              : 'bg-black/40 text-slate-400 border-white/10 hover:text-white'
                          }`}
                        >
                          {isAttempted ? 'Selected ✓' : 'Select'}
                        </button>
                      </div>
                    </div>

                    {/* Revealed Solution Box */}
                    {isRevealed && (
                      <div className="mt-3 p-3.5 rounded-xl bg-black/60 border border-violet-500/20 text-xs text-slate-300 space-y-2 print:hidden">
                        <span className="text-violet-300 font-bold block text-[10px] uppercase">
                          Model Solution & Step-by-Step Marking Rubric:
                        </span>
                        <p className="leading-relaxed font-sans">{lang === 'en' ? q.solutionEn : q.solutionHi}</p>
                        <div className="space-y-1 pt-1">
                          {q.examinerRubric.map((r, i) => (
                            <div key={i} className="flex items-center space-x-1.5 text-[10px] text-slate-400">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================================== */}
          {/* SECTION C: LONG ESSAY QUESTIONS (Attempt 2 of 4 x 15M = 30M)   */}
          {/* ============================================================== */}
          <div className="space-y-4 pt-4 border-t border-white/10 print:border-black">
            <div className="flex items-center justify-between pb-2 border-b border-white/10 print:border-black">
              <div>
                <h3 className="text-sm font-black text-amber-400 print:text-black uppercase tracking-wider">
                  SECTION C / खंड ‘ग’ (Detailed Derivation / विस्तृत उत्तरीय)
                </h3>
                <p className="text-[11px] text-slate-400 print:text-gray-700">
                  Attempt any <strong>TWO</strong> questions out of four. Each question carries 15 marks (~500 words).
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-amber-300 print:text-black">
                [2 × 15 = 30 Marks]
              </span>
            </div>

            <div className="space-y-4">
              {modelPaper.sectionC.map((q, idx) => {
                const isAttempted = !!attemptedQuestions[q.id];
                const isRevealed = !!revealedAnswers[q.id];
                return (
                  <div
                    key={q.id}
                    className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                      isAttempted
                        ? 'bg-amber-950/20 border-amber-500/40 print:border-none'
                        : 'bg-white/[0.02] border-white/5 print:border-none'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 print:text-gray-600">
                          <span className="font-bold text-amber-400 print:text-black">Q.{idx + 19}</span>
                          <span>•</span>
                          <span>15 Marks Long Derivation</span>
                          <span>•</span>
                          <span className="text-emerald-400 font-bold print:hidden">SDSUV Core Blueprint</span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-white print:text-black leading-relaxed">
                          {lang === 'en' ? q.questionEn : q.questionHi}
                        </p>
                        <p className="text-xs text-slate-400 print:text-gray-600 italic">
                          {lang === 'en' ? q.questionHi : q.questionEn}
                        </p>
                      </div>

                      {/* Interactive Controls */}
                      <div className="flex items-center space-x-1.5 shrink-0 print:hidden">
                        <button
                          onClick={() => toggleAnswerReveal(q.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 text-xs"
                          title="Reveal Answer & Rubric"
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => toggleAttempted(q.id)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            isAttempted
                              ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md'
                              : 'bg-black/40 text-slate-400 border-white/10 hover:text-white'
                          }`}
                        >
                          {isAttempted ? 'Selected ✓' : 'Select'}
                        </button>
                      </div>
                    </div>

                    {/* Revealed Solution Box */}
                    {isRevealed && (
                      <div className="mt-3.5 p-4 rounded-xl bg-black/70 border border-amber-500/20 text-xs text-slate-200 space-y-2.5 print:hidden">
                        <span className="text-amber-300 font-bold block text-xs uppercase tracking-wider">
                          Full 15-Mark University Derivation & Rubric:
                        </span>
                        <p className="leading-relaxed font-sans">{lang === 'en' ? q.solutionEn : q.solutionHi}</p>
                        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/10 space-y-1">
                          <span className="text-[10px] font-bold text-amber-400 uppercase block font-mono">
                            SDSUV Evaluator Marking Rubric:
                          </span>
                          {q.examinerRubric.map((r, i) => (
                            <div key={i} className="flex items-center space-x-1.5 text-[11px] text-slate-300">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* End of Question Paper Footer Box */}
          <div className="pt-6 border-t border-white/10 text-center text-xs font-mono text-slate-400 print:text-black space-y-1">
            <p>*** END OF QUESTION PAPER / प्रश्नपत्र समाप्त ***</p>
            <p className="text-[10px] text-slate-500 print:text-gray-600">
              APSB Nexus — Unofficial Student Examination Simulator • Modeled on NEP 2020 Examination Blueprint (Not affiliated with SDSUV)
            </p>
          </div>
        </div>
      </main>
      </div>

      {/* Clean Unofficial Footer */}
      <div className="print:hidden">
        <Footer lang={lang} />
      </div>
    </div>
  );
}
