'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Flame,
  Target,
  Zap,
  Sparkles,
  ArrowRight,
  BookOpenCheck,
  FileText,
  Boxes,
  GraduationCap,
  Bot,
  Layers,
  ChevronRight,
  SlidersHorizontal,
  Lock,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import { StudentProfile } from '@/lib/studentProfile';
import { STREAMS_CONFIG } from '@/data/portalData';
import DashboardBuddyGreeting from './DashboardBuddyGreeting';

interface LockinHeroPodProps {
  profile: StudentProfile | null;
  stream: StreamType;
  lang: LanguageType;
  selectedSubjects: string[];
}

export default function LockinHeroPod({
  profile,
  stream,
  lang,
  selectedSubjects,
}: LockinHeroPodProps) {
  const streamInfo = STREAMS_CONFIG[stream] || STREAMS_CONFIG['ba-arts'];
  const studentName = profile?.name || (lang === 'en' ? 'Student' : 'विद्यार्थी');

  const [activeFloatBadge, setActiveFloatBadge] = useState<string | null>(null);

  return (
    <section className="relative rounded-3xl border-2 border-slate-200 dark:border-white/10 bg-gradient-to-br from-white via-slate-50/50 to-teal-50/40 dark:from-[#0a0f24] dark:via-[#090d1f] dark:to-[#070913] p-6 sm:p-8 lg:p-10 shadow-2xl overflow-hidden mb-10">
      {/* Aurora & Neon Glow Accents */}
      <div className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-violet-600/15 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        {/* Left Column: Headline, Subtitle, CTAs & Quick Feature Grid */}
        <div className="lg:col-span-7 flex flex-col items-start text-left gap-4 sm:gap-5">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-slate-200 dark:border-white/15 bg-white/90 dark:bg-white/[0.04] px-3.5 py-1 text-xs font-black text-slate-800 dark:text-white backdrop-blur-md shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              {lang === 'en'
                ? 'SDSUV B.A. (Arts) NEP-2020 Semester Companion'
                : 'एसडीएसयूवी बीए (आर्ट्स) एनईपी-2020 सेमेस्टर साथी'}
            </span>
          </div>

          {/* Slogan Headline */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-3xl min-[450px]:text-4xl sm:text-5xl lg:text-[54px] font-black leading-[1.08] tracking-tight text-slate-900 dark:text-white">
              {lang === 'en' ? (
                <>
                  Stop scrolling notes.
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400">
                    Lock in
                  </span>{' '}
                  on the units that{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-400">
                    score marks.
                  </span>
                </>
              ) : (
                <>
                  नोट्स में भटकना बंद करें।
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400">
                    लॉक इन
                  </span>{' '}
                  करें उन इकाइयों पर जो{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-indigo-400">
                    अंक दिलाती हैं।
                  </span>
                </>
              )}
            </h1>

            <p className="max-w-xl text-sm sm:text-base font-semibold leading-relaxed text-slate-600 dark:text-slate-300 mt-1">
              {lang === 'en'
                ? `Personalized for ${studentName} across ${selectedSubjects.length} enrolled subjects under SDSUV NEP-2020. Identifies high-yield topics, drills you with verified explainers, and tracks end-sem readiness.`
                : `${studentName} के लिए एसडीएसयूवी एनईपी-2020 के अंतर्गत नामांकित ${selectedSubjects.length} विषयों हेतु विशेष अनुकूलित। मुख्य प्रश्नों का अभ्यास करें और परीक्षा की तैयारी को 100% मजबूत बनाएं।`}
            </p>
          </div>

          {/* Action Buttons Row with 3D tactile depth */}
          <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto pt-1">
            <Link
              href="/learn"
              className="inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl bg-[#0284c7] hover:bg-[#0369a1] text-white font-black text-sm shadow-[0_5px_0_#075985] hover:shadow-[0_2px_0_#075985] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all"
            >
              <Zap className="w-4 h-4 fill-amber-300 text-amber-300" />
              <span>{lang === 'en' ? 'Start Learning Studio' : 'स्टडी स्टूडियो शुरू करें'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/simulator"
              className="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-2xl bg-white dark:bg-white/[0.05] border-2 border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-extrabold text-sm shadow-sm hover:border-cyan-400 transition-all"
            >
              <GraduationCap className="w-4 h-4 text-cyan-500" />
              <span>{lang === 'en' ? 'Exam Simulator' : 'परीक्षा सिमुलेटर'}</span>
            </Link>

            <Link
              href="/pyqs"
              className="inline-flex items-center justify-center space-x-1.5 px-4 py-3.5 rounded-2xl text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 font-bold text-xs transition-colors"
            >
              <Lock className="w-3.5 h-3.5 text-amber-500" />
              <span>{lang === 'en' ? 'PYQs (Live Soon)' : 'पीवाईक्यू (शीघ्र लाइव)'}</span>
            </Link>
          </div>

          {/* Stats Bar */}
          <p className="text-[11px] sm:text-xs font-black text-slate-500 dark:text-slate-400 tracking-wide font-mono pt-1">
            {lang === 'en'
              ? '5 BA Disciplines · 24 NEP-2020 Units · Notes Studio & Video Lectures · 100% Free for SDSUV Students'
              : '5 बीए विषय · 24 एनईपी-2020 इकाइयां · नोट्स व वीडियो स्टूडियो · सभी छात्रों हेतु 100% निःशुल्क'}
          </p>

          {/* 4 Mini Cards Grid (from lockinprep) */}
          <div className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
            <Link
              href="/simulator"
              className="flex items-center gap-2.5 rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/30 p-2.5 hover:border-cyan-400 transition-all shadow-sm group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-black text-slate-900 dark:text-white truncate">
                  {lang === 'en' ? 'Exam Simulator' : 'परीक्षा सिमुलेटर'}
                </span>
                <span className="text-[10px] font-bold text-slate-500 truncate">
                  {lang === 'en' ? '3-Hr mock tests' : '3-घंटे मॉक पेपर'}
                </span>
              </div>
            </Link>

            <Link
              href="/learn"
              className="flex items-center gap-2.5 rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/30 p-2.5 hover:border-cyan-400 transition-all shadow-sm group"
            >
              <div className="w-8 h-8 rounded-xl bg-sky-500/15 border border-sky-500/30 text-sky-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <BookOpenCheck className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-black text-slate-900 dark:text-white truncate">Unit Drills</span>
                <span className="text-[10px] font-bold text-slate-500 truncate">Fresh questions</span>
              </div>
            </Link>

            <Link
              href="/pyqs"
              className="flex items-center gap-2.5 rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/30 p-2.5 hover:border-amber-400 transition-all shadow-sm group"
            >
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Lock className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-black text-slate-900 dark:text-white truncate">SDSUV PYQs</span>
                <span className="text-[10px] font-bold text-amber-500 truncate">Live Soon</span>
              </div>
            </Link>

            <Link
              href="/learn"
              className="flex items-center gap-2.5 rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-white/80 dark:bg-black/30 p-2.5 hover:border-cyan-400 transition-all shadow-sm group"
            >
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col text-left overflow-hidden">
                <span className="text-xs font-black text-slate-900 dark:text-white truncate">Doraemon AI</span>
                <span className="text-[10px] font-bold text-slate-500 truncate">24/7 concept help</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Right Column: Doraemon Mascot with Floating Badges & Daily Strategy Card */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center gap-4 relative">
          {/* Floating interactive badge pills around Doraemon */}
          <div className="w-full relative flex flex-col items-center justify-center min-h-[220px]">
            {/* Top-left floating badge */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFloatBadge('streak')}
              className="absolute -top-1 sm:-top-2 left-0 z-20 inline-flex items-center gap-1.5 rounded-full border-2 border-slate-200 dark:border-white/15 bg-white/95 dark:bg-black/80 px-3 py-1.5 text-xs font-black text-slate-900 dark:text-white shadow-lg backdrop-blur-md cursor-pointer hover:border-amber-400 transition-colors animate-float"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{lang === 'en' ? '5-Day Streak 🔥' : '5-दिवसीय स्ट्रीक 🔥'}</span>
            </motion.button>

            {/* Top-right floating badge */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFloatBadge('readiness')}
              className="absolute top-2 sm:top-1 right-0 z-20 inline-flex items-center gap-1.5 rounded-full border-2 border-slate-200 dark:border-white/15 bg-white/95 dark:bg-black/80 px-3 py-1.5 text-xs font-black text-slate-900 dark:text-white shadow-lg backdrop-blur-md cursor-pointer hover:border-cyan-400 transition-colors animate-float [animation-delay:0.8s]"
            >
              <Target className="w-3.5 h-3.5 text-rose-500" />
              <span>{lang === 'en' ? 'Readiness 88% 🎯' : 'तैयारी 88% 🎯'}</span>
            </motion.button>

            {/* Bottom-left floating badge */}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFloatBadge('xp')}
              className="absolute -bottom-2 left-2 z-20 inline-flex items-center gap-1.5 rounded-full border-2 border-slate-200 dark:border-white/15 bg-white/95 dark:bg-black/80 px-3 py-1.5 text-xs font-black text-slate-900 dark:text-white shadow-lg backdrop-blur-md cursor-pointer hover:border-amber-400 transition-colors animate-float [animation-delay:1.6s]"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span>{lang === 'en' ? '+120 XP per quiz ⚡' : '+120 XP प्रति क्विज ⚡'}</span>
            </motion.button>

            {/* Doraemon Greeting with Take-copter, Blue Aura & Voice */}
            <div className="py-2">
              <DashboardBuddyGreeting
                studentName={studentName}
                buddyId="doraemon"
                lang={lang}
              />
            </div>
          </div>

          {/* Daily Strategy Card (directly from LockInPrep design) */}
          <div className="w-full rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-white/95 dark:bg-black/40 p-4 shadow-md backdrop-blur-md flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 flex items-center justify-center flex-shrink-0 text-xl font-bold">
              🔥
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                {lang === 'en' ? 'Daily Strategy' : 'दैनिक अध्ययन रणनीति'}
              </span>
              <p className="text-xs sm:text-sm font-black text-slate-900 dark:text-white leading-snug">
                {lang === 'en'
                  ? '“15 minutes of smart drills beats 8 hours of panic cramming.”'
                  : '“परीक्षा से पहले 8 घंटे रटने से 15 मिनट का स्मार्ट अभ्यास कहीं बेहतर है।”'}
              </p>
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'en' ? 'Keep your daily streak alive · Doraemon is proud of you! ✨' : 'अपनी दैनिक स्ट्रीक जारी रखें · डोरेमोन आपके साथ है! ✨'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
