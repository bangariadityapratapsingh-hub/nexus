'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Mountain,
  Compass,
  BookOpen,
  BookOpenCheck,
  Award,
  Archive,
  GraduationCap,
  Calendar,
  Layers,
  Search,
  ArrowRight,
  Flame,
  User,
  CheckCircle2,
  SlidersHorizontal,
  FileCheck2,
  ChevronRight,
  FileText,
  Lock,
  ShieldAlert,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import FloatingNav from '@/components/FloatingNav';
import HeroStudyPod from '@/components/HeroStudyPod';
import ExamRadar from '@/components/ExamRadar';
import SubjectGalaxy from '@/components/SubjectGalaxy';
import CareerCompassSpotlight from '@/components/CareerCompassSpotlight';
import QuickMetricsBento from '@/components/QuickMetricsBento';
import CommandPaletteModal from '@/components/CommandPaletteModal';
import Footer from '@/components/Footer';
import PomodoroFocusPod from '@/components/PomodoroFocusPod';
import DashboardNotificationTicker from '@/components/DashboardNotificationTicker';
import LockinHeroPod from '@/components/LockinHeroPod';
import SemesterRulesBento from '@/components/SemesterRulesBento';
import LockinFeatureGrid from '@/components/LockinFeatureGrid';
import LockinHowItWorks from '@/components/LockinHowItWorks';
import {
  getStudentProfile,
  isStudentLoggedIn,
  getDefaultSubjectsForStream,
  StudentProfile,
} from '@/lib/studentProfile';
import { STREAMS_CONFIG } from '@/data/portalData';
import { useSidebarState } from '@/lib/sidebarState';

export default function DashboardPage() {
  const router = useRouter();
  const { isCollapsed } = useSidebarState();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [currentStream, setCurrentStream] = useState<StreamType>('ba-arts');
  const [lang, setLang] = useState<LanguageType>('en');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState<boolean>(true);

  useEffect(() => {
    const loggedIn = isStudentLoggedIn();
    const p = getStudentProfile();

    if (!loggedIn || !p || !p.isLoggedIn) {
      // Strictly do not allow entering dashboard without sign up / sign in!
      router.replace('/auth?mode=signin&redirect=/dashboard');
      return;
    }

    setProfile(p);
    setCurrentStream(p.stream);
    setLang(p.preferredMedium);
    setIsAuthChecking(false);

    const handleProfile = (e: any) => {
      const updated = e.detail || getStudentProfile();
      if (!updated || !updated.isLoggedIn) {
        router.replace('/auth?mode=signin&redirect=/dashboard');
        return;
      }
      setProfile(updated);
      setCurrentStream(updated.stream);
      setLang(updated.preferredMedium);
    };

    window.addEventListener('sdsuv_profile_updated', handleProfile);
    return () => window.removeEventListener('sdsuv_profile_updated', handleProfile);
  }, [router]);

  // If user is not authenticated or auth is verifying, lock the screen completely
  if (isAuthChecking || !profile) {
    return (
      <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 himalayan-mesh-bg relative selection:bg-cyan-500 selection:text-black">
        <div className="fixed inset-0 pointer-events-none starlight-grid opacity-25 z-0" />
        <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl glass-panel border border-white/10 bg-[#090e24]/95 shadow-2xl backdrop-blur-2xl text-center space-y-4 relative z-10">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Lock className="w-8 h-8 animate-pulse text-cyan-400" />
          </div>
          <div className="space-y-1">
            <h2 className="text-xl font-black text-white">Authentication Required</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              You must sign in or create a student account to access the SDSUV Study Dashboard. Demo guest mode is disabled.
            </p>
          </div>
          <div className="pt-3 flex flex-col sm:flex-row gap-2.5 justify-center">
            <Link
              href="/auth?mode=signin&redirect=/dashboard"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs transition-all shadow-md shadow-cyan-500/25 flex items-center justify-center space-x-1.5"
            >
              <span>Sign In to Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/auth?mode=signup&redirect=/dashboard"
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs transition-all border border-white/10 flex items-center justify-center"
            >
              Create Account (Sign Up)
            </Link>
          </div>
          <div className="pt-2 text-[11px] font-mono text-slate-500">
            Redirecting to sign in portal...
          </div>
        </div>
      </div>
    );
  }

  const streamInfo = STREAMS_CONFIG[currentStream];
  const selectedSubjects = profile?.selectedSubjects || getDefaultSubjectsForStream(currentStream);

  return (
    <div className="min-h-screen himalayan-mesh-bg text-slate-800 dark:text-slate-100 relative flex flex-col justify-between selection:bg-teal-500 dark:selection:bg-cyan-500 selection:text-white dark:selection:text-black">
      {/* Background Starry Mesh & Aurora Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-b from-cyan-600/10 via-violet-600/10 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Floating 4-Tab Navigation */}
      <FloatingNav
        currentTab="dashboard"
        lang={lang}
        setLang={setLang}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Container Area - dynamically offsets for sidebar and expands to full portion when closed */}
      <div className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-24 md:pb-16 relative z-10 ${isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'}`}>
        <main className={`transition-all duration-300 ease-in-out mx-auto px-4 sm:px-6 w-full ${isCollapsed ? 'max-w-[1720px] lg:px-8 xl:px-10' : 'max-w-7xl lg:px-8'}`}>
        {/* 1. LockInPrep Style Hero Section with Doraemon Mascot, Floating Badges, and Slogan */}
        <LockinHeroPod
          profile={profile}
          stream={currentStream}
          lang={lang}
          selectedSubjects={selectedSubjects}
        />

        {/* 2. Live SDSUV University Updates Ticker */}
        <div className="mb-10">
          <DashboardNotificationTicker lang={lang} />
        </div>

        {/* 3. Semester Rules, No Cap 🧠 Bento Grid (Iconic 150 Grind, No Backlogs, CGPA Flex, Real Papers) */}
        <SemesterRulesBento lang={lang} />

        {/* 4. "Everything for your semester, in one place" 7-Card Feature Bento */}
        <LockinFeatureGrid lang={lang} />

        {/* 5. Top Study Hubs: UPSC Notes + Syllabus Hub + Books Directory */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-10">
          {/* 1. UPSC-Level Notes Studio Card */}
          <div className="rounded-3xl p-5 sm:p-6 glass-panel border border-violet-200 dark:border-violet-500/30 bg-gradient-to-br from-white/95 via-violet-50/40 to-indigo-50/50 dark:from-violet-950/40 dark:via-[#0d102e]/90 dark:to-indigo-950/40 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-300 border border-violet-300 dark:border-violet-400/40 text-[10px] font-mono font-bold flex items-center space-x-1">
                  <Award className="w-3 h-3 text-violet-600 dark:text-violet-400" />
                  <span>UPSC &amp; TOPPER NOTES</span>
                </span>
                <span className="text-xs font-mono text-cyan-700 dark:text-cyan-300 font-bold">5 Visual Blocks</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {lang === 'en' ? '📚 UPSC-Level Notes Studio' : '📚 यूपीएससी-स्तरीय नोट्स स्टूडियो'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'en'
                  ? 'Official SDSUV NEP-2020 topic notes with Scholar Definitions, Glassmorphic Mindmaps, Analytical Subheadings & Topper’s Edge quotes.'
                  : 'विद्वानों की परिभाषाओं, माइंडमैप्स एवं टॉपर्स कोट्स सहित सेमेस्टर 1–6 के क्रमिक द्विभाषी नोट्स।'}
              </p>
            </div>

            <Link
              href="/notes"
              className="self-start px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white font-black text-xs shadow-lg shadow-violet-500/25 flex items-center space-x-2 transition-transform active:scale-95"
            >
              <BookOpenCheck className="w-4 h-4" />
              <span>{lang === 'en' ? 'Open Notes Studio' : 'नोट्स स्टूडियो खोलें'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 2. Official SDSUV BA Syllabus Hub Card */}
          <div className="rounded-3xl p-5 sm:p-6 glass-panel border border-cyan-200 dark:border-cyan-500/30 bg-gradient-to-br from-white/95 via-teal-50/40 to-cyan-50/50 dark:from-cyan-950/40 dark:via-[#0c1432]/90 dark:to-blue-950/40 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-100 dark:bg-cyan-950 text-teal-800 dark:text-cyan-300 border border-teal-300 dark:border-cyan-400/40 text-[10px] font-mono font-bold flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-teal-600 dark:text-cyan-400" />
                  <span>NEP-2020 DIRECTORY</span>
                </span>
                <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">Sem 1 to Sem 8</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {lang === 'en' ? '📄 Official SDSUV BA Syllabus Hub' : '📄 श्री देव सुमन विश्वविद्यालय बीए पाठ्यक्रम केंद्र'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'en'
                  ? 'Unit-wise syllabus breakdown, credits, and downloadable PDFs for Geography, Hindi Literature, History, Political Science, and Sociology.'
                  : 'भूगोल, हिन्दी साहित्य, इतिहास, राजनीति विज्ञान एवं समाजशास्त्र का इकाई-वार आधिकारिक पाठ्यक्रम एवं पीडीएफ।'}
              </p>
            </div>

            <Link
              href="/syllabus"
              className="self-start px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-transform active:scale-95"
            >
              <FileText className="w-4 h-4" />
              <span>{lang === 'en' ? 'Explore Syllabus Hub' : 'पाठ्यक्रम केंद्र खोलें'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* 3. Free PDF Books & Study-Material Directory Card */}
          <div className="rounded-3xl p-5 sm:p-6 glass-panel border border-amber-200 dark:border-amber-500/30 bg-gradient-to-br from-white/95 via-amber-50/40 to-orange-50/50 dark:from-amber-950/40 dark:via-[#14122e]/90 dark:to-orange-950/40 shadow-xl flex flex-col justify-between space-y-4">
            <div className="space-y-1.5">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-400/40 text-[10px] font-mono font-bold flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>FREE PDF DIRECTORY</span>
                </span>
                <span className="text-xs font-mono text-amber-600 dark:text-amber-400 font-bold">11 Subjects</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                {lang === 'en' ? '📚 Free PDF Books Directory' : '📚 निःशुल्क पाठ्यपुस्तकें एवं अध्ययन सामग्री'}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'en'
                  ? 'Official study materials, NCERT textbooks, IGNOU eGyanKosh units, and university standard books in Hindi & English.'
                  : 'एनसीईआरटी पाठ्यपुस्तकें, इग्नू ई-ज्ञानकोश एवं विश्वविद्यालय प्रमाणिक संदर्भ ग्रन्थों की सीधी निःशुल्क पीडीएफ निर्देशिका।'}
              </p>
            </div>

            <Link
              href="/books"
              className="self-start px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 flex items-center space-x-2 transition-transform active:scale-95"
            >
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'en' ? 'Explore Book Vault' : 'पाठ्यपुस्तकें देखें'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        {/* 7. Bento Grid: Hero Study Pod (Resume Study) + Exam Readiness Radar */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-10">
          <div className="lg:col-span-8">
            <HeroStudyPod
              stream={currentStream}
              lang={lang}
              profile={profile}
              selectedSubjects={selectedSubjects}
              onExploreSyllabus={() => {
                window.location.href = '/learn';
              }}
            />
          </div>

          <div className="lg:col-span-4">
            <ExamRadar stream={currentStream} lang={lang} />
          </div>
        </section>

        {/* 8. Subject Galaxy: STRICTLY Filtered to Student's Selected Subjects */}
        <section className="my-10">
          <div className="flex items-center justify-between mb-3">
            <div className="text-xs font-mono text-cyan-500 dark:text-cyan-400 flex items-center space-x-1.5 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                {lang === 'en'
                  ? `Showing only your ${selectedSubjects.length} registered subjects`
                  : `केवल आपके ${selectedSubjects.length} पंजीकृत विषय प्रदर्शित हैं`}
              </span>
            </div>

            <Link
              href="/profile"
              className="text-xs text-slate-500 hover:text-cyan-500 dark:text-slate-400 dark:hover:text-cyan-400 transition-colors flex items-center space-x-1 font-mono font-bold"
            >
              <span>{lang === 'en' ? 'Edit Curriculum in Profile' : 'प्रोफाइल में विषय बदलें'}</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <SubjectGalaxy
            stream={currentStream}
            lang={lang}
            selectedSubjectCodes={selectedSubjects}
          />
        </section>

        {/* 9. LockInPrep 3-Step "How It Works" Flow */}
        <LockinHowItWorks lang={lang} />

        {/* 10. Career Compass Spotlight Matching Student's Stream */}
        <section className="my-10">
          <CareerCompassSpotlight
            stream={currentStream}
            lang={lang}
            onExploreFullCompass={() => {
              window.location.href = '/careers';
            }}
          />
        </section>

        {/* 11. Quick Metrics Bento: Himalayan Campus Status & NEP ABC Credits */}
        <section className="my-10">
          <QuickMetricsBento lang={lang} />
        </section>
      </main>
      </div>

      {/* Floating Pomodoro Focus Timer */}
      <PomodoroFocusPod lang={lang} />

      {/* Global Command Palette (Ctrl+K) */}
      <CommandPaletteModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateTab={() => {}}
        lang={lang}
        stream={currentStream}
      />

      {/* Clean Unofficial Footer */}
      <Footer lang={lang} />
    </div>
  );
}
