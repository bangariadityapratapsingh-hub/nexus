'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Lock,
  Sparkles,
  CheckCircle2,
  Bell,
  Globe2,
  Layers,
  BookOpen,
  Check,
  Flame,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import BScWaitlistModal from './BScWaitlistModal';

export interface CourseSelectorCardsProps {
  selectedCourse: StreamType;
  onSelectCourse: (course: StreamType) => void;
  selectedSemester?: number;
  onSelectSemester?: (sem: number) => void;
  selectedMedium?: LanguageType;
  onSelectMedium?: (med: LanguageType) => void;
  selectedSubjects?: string[];
  onToggleSubject?: (code: string) => void;
  showCurriculumConfig?: boolean; // Show semester, medium & subjects when BA is active
  lang?: LanguageType;
}

export const BA_SUBJECTS_LIST = [
  {
    code: 'SDSUV-HIS-201',
    nameEn: 'History (Ancient, Indus to Mauryas & Uttarakhand Dynasties)',
    nameHi: 'इतिहास (प्राचीन भारत, सिंधु से मौर्य एवं उत्तराखंड के राजवंश)',
    shortName: 'History',
    credits: 4,
    isCore: true,
    tag: 'NEP Major',
  },
  {
    code: 'SDSUV-POL-201',
    nameEn: 'Political Science (Indian Constitution, Fundamental Rights & Theory)',
    nameHi: 'राजनीति विज्ञान (भारतीय संविधान, मौलिक अधिकार एवं राजनीतिक सिद्धांत)',
    shortName: 'Political Science',
    credits: 4,
    isCore: true,
    tag: 'NEP Major',
  },
  {
    code: 'SDSUV-GEO-201',
    nameEn: 'Geography (Physical Geography, Geomorphology & Himalayan Terrain)',
    nameHi: 'भूगोल (भौतिक भूगोल, भू-आकृति विज्ञान एवं हिमालयी भूगोल)',
    shortName: 'Geography',
    credits: 4,
    isCore: false,
    tag: 'NEP Major/Minor',
  },
  {
    code: 'SDSUV-ECO-201',
    nameEn: 'Economics (Microeconomics, Public Finance & Uttarakhand Economy)',
    nameHi: 'अर्थशास्त्र (व्यष्टि अर्थशास्त्र, लोक वित्त एवं उत्तराखंड की अर्थव्यवस्था)',
    shortName: 'Economics',
    credits: 4,
    isCore: false,
    tag: 'NEP Major/Minor',
  },
  {
    code: 'SDSUV-SOC-201',
    nameEn: 'Sociology (Indian Society, Social Stratification & Himalayan Tribes)',
    nameHi: 'समाजशास्त्र (भारतीय समाज, सामाजिक स्तरीकरण एवं हिमालयी जनजातियां)',
    shortName: 'Sociology',
    credits: 4,
    isCore: false,
    tag: 'NEP Elective',
  },
  {
    code: 'SDSUV-ENG-201',
    nameEn: 'English Literature (Modern Prose, Poetry, Fiction & Literary Movements)',
    nameHi: 'अंग्रेजी साहित्य (आधुनिक गद्य, पद्य एवं साहित्यिक धाराएं)',
    shortName: 'English Literature',
    credits: 3,
    isCore: false,
    tag: 'Language Major',
  },
  {
    code: 'SDSUV-HIN-201',
    nameEn: 'हिन्दी साहित्य (आधुनिक हिन्दी कविता, छायावाद, सुमित्रानंदन पंत एवं गद्य)',
    nameHi: 'हिन्दी साहित्य (आधुनिक हिन्दी कविता, छायावाद, सुमित्रानंदन पंत एवं गद्य)',
    shortName: 'हिन्दी साहित्य',
    credits: 3,
    isCore: false,
    tag: 'Language Major',
  },
  {
    code: 'SDSUV-SAN-201',
    nameEn: 'Sanskrit Literature (व्याकरण, कालिदास, रघुवंशम्, भास एवं वैदिक सूक्त)',
    nameHi: 'संस्कृत साहित्य (व्याकरण, कालिदास, रघुवंशम्, भास एवं वैदिक सूक्त)',
    shortName: 'Sanskrit',
    credits: 3,
    isCore: false,
    tag: 'Language Major',
  },
  {
    code: 'SDSUV-HSC-201',
    nameEn: 'Home Science (Foods, Clinical Nutrition, Textiles & Child Development)',
    nameHi: 'गृह विज्ञान (आहार एवं पोषण, वस्त्र विज्ञान एवं बाल विकास)',
    shortName: 'Home Science',
    credits: 4,
    isCore: false,
    tag: 'NEP Major/Minor',
  },
  {
    code: 'SDSUV-DRW-201',
    nameEn: 'Drawing & Painting (Still Life, Ajanta, Aipan Art & Modern Painting)',
    nameHi: 'चित्रकला (स्थिर वस्तु चित्रण, अजन्ता, उत्तराखण्ड ऐपण एवं आधुनिक कला)',
    shortName: 'Drawing & Painting',
    credits: 4,
    isCore: false,
    tag: 'Fine Arts Elective',
  },
  {
    code: 'SDSUV-ANT-201',
    nameEn: 'Anthropology (Social Anthropology, Human Evolution & Tribal Studies)',
    nameHi: 'मानवशास्त्र (सामाजिक मानवशास्त्र, मानव उद्विकास एवं जनजातीय अध्ययन)',
    shortName: 'Anthropology',
    credits: 4,
    isCore: false,
    tag: 'UPSC Optional Major',
  },
];

export default function CourseSelectorCards({
  selectedCourse = 'ba-arts',
  onSelectCourse,
  selectedSemester = 1,
  onSelectSemester,
  selectedMedium = 'en',
  onSelectMedium,
  selectedSubjects = ['SDSUV-HIS-201', 'SDSUV-POL-201', 'SDSUV-GEO-201'],
  onToggleSubject,
  showCurriculumConfig = true,
  lang = 'en',
}: CourseSelectorCardsProps) {
  const [waitlistModalOpen, setWaitlistModalOpen] = useState(false);
  const [waitlistTargetStream, setWaitlistTargetStream] = useState<'bsc-maths' | 'bsc-bio'>('bsc-maths');

  const handleOpenWaitlist = (stream: 'bsc-maths' | 'bsc-bio', e: React.MouseEvent) => {
    e.stopPropagation();
    setWaitlistTargetStream(stream);
    setWaitlistModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* 3 Course Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* ============================================================== */}
        {/* CARD 1: BA (Bachelor of Arts) — LIVE & ACCESSIBLE              */}
        {/* ============================================================== */}
        <div
          onClick={() => onSelectCourse('ba-arts')}
          className={`relative rounded-3xl p-5 sm:p-6 transition-all cursor-pointer border flex flex-col justify-between overflow-hidden group select-none ${
            selectedCourse === 'ba-arts'
              ? 'bg-white dark:bg-gradient-to-br dark:from-emerald-950/70 dark:via-[#06201a]/90 dark:to-cyan-950/80 border-2 border-emerald-500 shadow-xl shadow-emerald-500/10 ring-2 ring-emerald-500/20'
              : 'bg-white dark:bg-white/[0.03] border-slate-200 dark:border-emerald-500/30 hover:border-emerald-400/60'
          }`}
        >
          {/* Top Radial Glow */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none group-hover:bg-emerald-500/25 transition-colors" />

          <div>
            {/* Active Header Badge with Pulse */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-black uppercase tracking-wider bg-emerald-100 dark:bg-gradient-to-r dark:from-emerald-500/30 dark:to-cyan-500/30 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-400/50 shadow-sm animate-pulse">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block" />
                <span>✨ ACTIVE NOW • PHASE 1 LIVE</span>
              </span>

              <span className="text-2xl" role="img" aria-label="BA Arts">
                🏛️
              </span>
            </div>

            {/* Title & Stream Details */}
            <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors flex items-center space-x-2">
              <span>BA (Bachelor of Arts)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 font-medium">
              Humanities, Social Sciences &amp; Literature (SDSUV NEP 2020)
            </p>

            {/* Included Subject Tags */}
            <div className="mt-4 flex flex-wrap gap-1.5">
              {[
                'History',
                'Political Science',
                'Geography',
                'Economics',
                'Sociology',
                'English Lit',
                'Hindi Lit',
              ].map((sub) => (
                <span
                  key={sub}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-200 border border-emerald-200 dark:border-emerald-500/30"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom Card Footer */}
          <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-emerald-500/20 flex items-center justify-between">
            <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Full Curriculum Ready</span>
            </span>

            <span className="text-xs font-bold px-3 py-1 rounded-xl bg-emerald-600 text-white dark:bg-emerald-500 dark:text-slate-950 font-black shadow-md shadow-emerald-500/20">
              Selected
            </span>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CARD 2: BSc (Maths Group - PCM) — LOCKED / COMING SOON         */}
        {/* ============================================================== */}
        <div
          onClick={(e) => handleOpenWaitlist('bsc-maths', e)}
          className="surface-locked-card relative rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 bg-[#F1F5F9] dark:bg-[#090d1f]/60 backdrop-blur-md flex flex-col justify-between overflow-hidden group transition-all hover:border-teal-500/60 dark:hover:border-cyan-500/40 cursor-pointer select-none"
        >
          {/* Frosted Glass Diagonal Pattern Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/5 via-transparent to-white/[0.04] pointer-events-none" />

          <div>
            {/* Locked Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-200/90 dark:bg-black/70 text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-white/15 backdrop-blur-sm">
                <Lock className="w-3 h-3 text-teal-600 dark:text-cyan-400" />
                <span>🔒 Coming Soon</span>
              </span>

              <span className="text-2xl opacity-75">📐</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-slate-200 group-hover:text-teal-700 dark:group-hover:text-cyan-300 transition-colors">
              BSc (Maths Group - PCM)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Physics, Chemistry, Mathematics &amp; Statistics (4-Yr NEP)
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Physics', 'Mathematics', 'Chemistry', 'Statistics'].map((sub) => (
                <span
                  key={sub}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-200/80 dark:bg-black/60 text-slate-700 dark:text-slate-400 border border-slate-300/80 dark:border-white/10"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Waitlist Button */}
          <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Phase 2 Pipeline</span>
            <button
              type="button"
              onClick={(e) => handleOpenWaitlist('bsc-maths', e)}
              className="px-3 py-1.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white border border-teal-600/40 text-xs font-bold transition-all hover:scale-105 shadow-sm shadow-teal-700/20 flex items-center space-x-1 cursor-pointer"
            >
              <Bell className="w-3 h-3 text-white" />
              <span>🔔 Join BSc Waitlist</span>
            </button>
          </div>
        </div>

        {/* ============================================================== */}
        {/* CARD 3: BSc (Bio Group - CBZ) — LOCKED / COMING SOON           */}
        {/* ============================================================== */}
        <div
          onClick={(e) => handleOpenWaitlist('bsc-bio', e)}
          className="surface-locked-card relative rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-white/10 bg-[#F1F5F9] dark:bg-[#090d1f]/60 backdrop-blur-md flex flex-col justify-between overflow-hidden group transition-all hover:border-teal-500/60 dark:hover:border-emerald-500/40 cursor-pointer select-none"
        >
          {/* Frosted Glass Diagonal Pattern Sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/5 via-transparent to-white/[0.04] pointer-events-none" />

          <div>
            {/* Locked Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-200/90 dark:bg-black/70 text-slate-700 dark:text-slate-400 border border-slate-300 dark:border-white/15 backdrop-blur-sm">
                <Lock className="w-3 h-3 text-teal-600 dark:text-emerald-400" />
                <span>🔒 Coming Soon</span>
              </span>

              <span className="text-2xl opacity-75">🧬</span>
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] dark:text-slate-200 group-hover:text-teal-700 dark:group-hover:text-emerald-300 transition-colors">
              BSc (Bio Group - CBZ)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Botany, Zoology, Bio-Chemistry &amp; Ecology (4-Yr NEP)
            </p>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Botany', 'Zoology', 'Bio-Chemistry', 'Ecology'].map((sub) => (
                <span
                  key={sub}
                  className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-200/80 dark:bg-black/60 text-slate-700 dark:text-slate-400 border border-slate-300/80 dark:border-white/10"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          {/* Waitlist Button */}
          <div className="mt-5 pt-3.5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
            <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">Phase 2 Pipeline</span>
            <button
              type="button"
              onClick={(e) => handleOpenWaitlist('bsc-bio', e)}
              className="px-3 py-1.5 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] text-white border border-teal-600/40 text-xs font-bold transition-all hover:scale-105 shadow-sm shadow-teal-700/20 flex items-center space-x-1 cursor-pointer"
            >
              <Bell className="w-3 h-3 text-white" />
              <span>🔔 Join BSc Waitlist</span>
            </button>
          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* BA CONFIGURATION SECTION: Semester, Medium & 7 BA Subjects     */}
      {/* ============================================================== */}
      {showCurriculumConfig && selectedCourse === 'ba-arts' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-3xl glass-panel p-6 sm:p-7 border border-emerald-500/30 bg-white dark:bg-[#071317]/80 backdrop-blur-xl space-y-6 shadow-2xl"
        >
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-emerald-500/20 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400">
                  <Sparkles className="w-4 h-4" />
                </span>
                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                  Configure Your SDSUV BA Degree Curriculum
                </h4>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                Calibrate your semester, study language, and chosen subjects.
              </p>
            </div>

            <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/40 font-bold">
              🏛️ SDSUV NEP-2020 Aligned
            </span>
          </div>

          {/* Row 1: Semester & Preferred Medium */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Semester Selection */}
            {onSelectSemester && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-slate-700 dark:text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Choose Semester (Odd Semesters Active) *</span>
                  </label>
                  <span className="text-[10px] font-mono font-semibold text-amber-600 dark:text-amber-400">
                    2, 4, 6 Live Soon
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((sem) => {
                    const isEvenLocked = sem % 2 === 0;

                    if (isEvenLocked) {
                      return (
                        <div
                          key={sem}
                          title={`Semester ${sem} is launching soon. Currently focusing exclusively on Odd Semesters (Sem 1, 3, 5) under NEP-2020.`}
                          className="py-2 px-1 rounded-xl font-mono text-center border border-dashed border-amber-500/30 dark:border-amber-500/30 bg-amber-500/[0.05] dark:bg-amber-500/[0.04] text-slate-400 dark:text-slate-500 cursor-not-allowed flex flex-col items-center justify-center opacity-70 select-none group transition-all"
                        >
                          <div className="flex items-center space-x-0.5 text-[11px] font-bold text-amber-700 dark:text-amber-300">
                            <Lock className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                            <span>S{sem}</span>
                          </div>
                          <span className="text-[8px] font-mono font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-tighter leading-none mt-0.5">
                            Live Soon
                          </span>
                        </div>
                      );
                    }

                    return (
                      <button
                        type="button"
                        key={sem}
                        onClick={() => onSelectSemester(sem)}
                        className={`py-2 px-1 rounded-xl font-mono text-center border transition-all cursor-pointer flex flex-col items-center justify-center ${
                          selectedSemester === sem
                            ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-emerald-500 shadow-md font-black ring-2 ring-emerald-400/40'
                            : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:text-white'
                        }`}
                      >
                        <span className="text-xs font-bold">S{sem}</span>
                        <span className="text-[8px] font-mono text-emerald-600 dark:text-emerald-400 font-bold uppercase leading-none mt-0.5">
                          Active
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Preferred Medium Selection */}
            {onSelectMedium && (
              <div className="space-y-2">
                <label className="text-slate-700 dark:text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                  <Globe2 className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                  <span>Preferred Medium (Hindi or English) *</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectMedium('en')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                      selectedMedium === 'en'
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 text-white border-teal-400 shadow-md'
                        : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:text-white'
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>English Medium</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectMedium('hi')}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
                      selectedMedium === 'hi'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-400 shadow-md'
                        : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:bg-slate-200 dark:hover:text-white'
                    }`}
                  >
                    <span>🇮🇳</span>
                    <span>हिंदी माध्यम</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Row 2: The BA Subjects Selection */}
          {onToggleSubject && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-slate-700 dark:text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  <span>
                    Select Your BA Subjects ({selectedSubjects.length} of {BA_SUBJECTS_LIST.length} Selected) *
                  </span>
                </label>
                <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-medium">
                  Select your major, minor &amp; elective subjects
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {BA_SUBJECTS_LIST.map((subj) => {
                  const isChecked = selectedSubjects.includes(subj.code);
                  return (
                    <button
                      type="button"
                      key={subj.code}
                      onClick={() => onToggleSubject(subj.code)}
                      className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex items-start space-x-3 select-none ${
                        isChecked
                          ? 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-400 dark:border-emerald-500/60 shadow-sm text-emerald-950 dark:text-white'
                          : 'bg-slate-50 dark:bg-black/40 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-white/20'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border shrink-0 ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-slate-400 dark:border-white/30 bg-transparent'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-slate-950" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {subj.shortName}
                          </span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300 font-bold flex-shrink-0">
                            {subj.tag}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-600 dark:text-slate-300 line-clamp-1">
                          {lang === 'en' ? subj.nameEn : subj.nameHi}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Waitlist Modal */}
      <BScWaitlistModal
        isOpen={waitlistModalOpen}
        onClose={() => setWaitlistModalOpen(false)}
        defaultStream={waitlistTargetStream}
        defaultSemester={selectedSemester}
      />
    </div>
  );
}
