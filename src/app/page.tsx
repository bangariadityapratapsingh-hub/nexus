'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BookOpen,
  Archive,
  Compass,
  Clock,
  CheckCircle2,
  Play,
  FileCheck,
  ShieldAlert,
  GraduationCap,
  Layers,
  ChevronRight,
  User,
  LogIn,
  Zap,
  Flame,
  Globe2,
  Download,
  Lock,
} from 'lucide-react';
import { LanguageType, StreamType } from '@/lib/types';
import {
  isStudentLoggedIn,
  getStudentProfile,
  saveStudentProfile,
  StudentProfile,
} from '@/lib/studentProfile';
import { registerStudent } from '@/lib/studentRegistry';
import CourseSelectorCards from '@/components/CourseSelectorCards';
import AmbassadorCarLogo from '@/components/AmbassadorCarLogo';
import ThemeToggle from '@/components/ThemeToggle';
import Footer from '@/components/Footer';

export default function LandingPage() {
  const router = useRouter();
  const [lang, setLang] = useState<LanguageType>('en');
  const [loggedInUser, setLoggedInUser] = useState<StudentProfile | null>(null);

  // Course Selector preview state for Landing Page
  const [previewCourse, setPreviewCourse] = useState<StreamType>('ba-arts');
  const [previewSemester, setPreviewSemester] = useState<number>(1);
  const [previewMedium, setPreviewMedium] = useState<LanguageType>('en');
  const [previewSubjects, setPreviewSubjects] = useState<string[]>([
    'SDSUV-HIS-201',
    'SDSUV-POL-201',
    'SDSUV-GEO-201',
  ]);

  useEffect(() => {
    if (isStudentLoggedIn()) {
      const p = getStudentProfile();
      setLoggedInUser(p);
      if (p) {
        setPreviewCourse(p.stream);
        setPreviewSemester(p.semester % 2 === 0 ? 1 : p.semester);
        setPreviewMedium(p.preferredMedium);
        if (p.selectedSubjects && p.selectedSubjects.length > 0) {
          setPreviewSubjects(p.selectedSubjects);
        }
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 himalayan-mesh-bg relative flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Background Starry Mesh & Aurora Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-25 z-0" />
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-cyan-600/15 via-violet-600/15 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* ==================================================================== */}
      {/* PUBLIC TOP NAVIGATION BAR                                            */}
      {/* ==================================================================== */}
      <header className="fixed top-2 sm:top-4 left-0 right-0 z-40 px-2 sm:px-6 max-w-7xl mx-auto">
        <div className="glass-nav rounded-xl sm:rounded-2xl px-3 sm:px-6 py-2 sm:py-3 flex items-center justify-between border border-white/10 shadow-2xl shadow-black/80 backdrop-blur-2xl bg-[#080d22]/90 min-w-0">
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3 group min-w-0 shrink">
            <AmbassadorCarLogo size={28} />
            <div className="min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-violet-300 text-xs sm:text-sm whitespace-nowrap">
                  APSB NEXUS
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 shrink-0">
                  STUDENT HUB
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block truncate">
                {lang === 'en'
                  ? 'Independent Student Prep Platform for SDSUV BA Students'
                  : 'एसडीएसयूवी बीए छात्रों के लिए स्वतंत्र अध्ययन मंच'}
              </p>
            </div>
          </Link>

          {/* Center Navigation Links (Public Anchor Links) */}
          <nav className="hidden md:flex items-center space-x-6 text-xs text-slate-300 font-medium">
            <a href="#courses" className="hover:text-emerald-400 text-emerald-300 font-bold transition-colors flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{lang === 'en' ? 'BA Phase 1 Live' : 'बीए फेज 1 लाइव'}</span>
            </a>
            <Link href="/current-affairs" className="hover:text-emerald-300 text-emerald-400 font-bold transition-colors flex items-center space-x-1.5">
              <span>{lang === 'en' ? 'Current Affairs' : 'समसामयिकी'}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-rose-500 text-white font-mono font-bold animate-pulse">LIVE</span>
            </Link>
            <Link href="/notes" className="hover:text-violet-300 text-violet-400 font-bold transition-colors flex items-center space-x-1">
              <span>{lang === 'en' ? 'Notes Studio' : 'नोट्स'}</span>
            </Link>
            <Link href="/syllabus" className="hover:text-cyan-300 text-cyan-400 font-bold transition-colors flex items-center space-x-1">
              <span>{lang === 'en' ? 'Syllabus Hub' : 'पाठ्यक्रम'}</span>
            </Link>
            <Link href="/learn" className="hover:text-blue-300 text-blue-400 font-bold transition-colors flex items-center space-x-1">
              <span>{lang === 'en' ? 'Study Studio' : 'कक्षा'}</span>
            </Link>
            <a href="#features" className="hover:text-cyan-400 transition-colors">
              {lang === 'en' ? 'Platform Features' : 'मंच की विशेषताएं'}
            </a>
            <a href="#pyqs" className="hover:text-amber-400 transition-colors flex items-center space-x-1">
              <span>{lang === 'en' ? 'PYQ Vault' : 'पीवाईक्यू संग्रह'}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-mono font-bold">Soon</span>
            </a>
            <a href="#simulator" className="hover:text-cyan-400 transition-colors">
              {lang === 'en' ? 'Exam Simulator' : 'परीक्षा सिम्युलेटर'}
            </a>
            <a href="#careers" className="hover:text-emerald-400 transition-colors flex items-center space-x-1">
              <span>{lang === 'en' ? 'Career Compass' : 'करियर कंपास'}</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-mono font-bold">Soon</span>
            </a>
          </nav>

          {/* Right Action Controls: Theme Toggle + Medium Switcher + Auth Buttons */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            {/* Sleek Animated ☀️ Light / 🌙 Dark Toggle Pill */}
            <ThemeToggle lang={lang} />

            {/* Medium Toggle */}
            <div className="flex items-center p-0.5 bg-black/50 dark:bg-black/50 light:bg-slate-200/80 rounded-full border border-white/10 dark:border-white/10 light:border-slate-300">
              <button
                onClick={() => setLang('en')}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all ${
                  lang === 'en' ? 'bg-cyan-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-[11px] font-bold transition-all ${
                  lang === 'hi' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>

            {/* Auth Buttons */}
            {loggedInUser ? (
              <Link
                href="/dashboard"
                className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black text-[11px] sm:text-xs shadow-md shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center space-x-1 sm:space-x-1.5 shrink-0"
              >
                <span>Dashboard</span>
                <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              </Link>
            ) : (
              <>
                <Link
                  href="/auth?mode=signin"
                  className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 hover:text-white text-[11px] sm:text-xs font-semibold border border-white/10 transition-colors hidden sm:inline-flex items-center space-x-1 shrink-0"
                >
                  <LogIn className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Sign In</span>
                </Link>

                <Link
                  href="/auth?mode=signup"
                  className="px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-black text-[11px] sm:text-xs shadow-md shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center space-x-1 sm:space-x-1.5 shrink-0"
                >
                  <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                  <span>Sign Up</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* ==================================================================== */}
      {/* HERO SECTION                                                         */}
      {/* ==================================================================== */}
      <section className="relative z-10 pt-24 sm:pt-40 pb-12 sm:pb-16 max-w-7xl mx-auto px-4 sm:px-6 w-full text-center">
        {/* Unofficial Banner Badge */}
        <div className="inline-flex items-center space-x-2 px-3 sm:px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs font-semibold mb-6 shadow-lg shadow-emerald-950/40 max-w-full">
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="leading-tight">
            {lang === 'en'
              ? 'Phase 1 Active • BA (Bachelor of Arts) • SDSUV NEP 2020'
              : 'फेज 1 सक्रिय • बीए (बैचलर ऑफ आर्ट्स) • एसडीएसयूवी एनईपी 2020'}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-2xl sm:text-4xl lg:text-6xl font-black text-white tracking-tight leading-snug sm:leading-tight max-w-4xl mx-auto px-2">
          {lang === 'en' ? (
            <>
              Ace Your SDSUV Degree with{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-300 to-sky-400">
                Precision & Clarity.
              </span>
            </>
          ) : (
            <>
              एसडीएसयूवी परीक्षाओं में लाएं{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-300 to-rose-400">
                सर्वोच्च अंक एवं सफलता।
              </span>
            </>
          )}
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-4 sm:mt-5 text-xs sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed px-2">
          {lang === 'en'
            ? 'The all-in-one unofficial learning platform for Sri Dev Suman Uttarakhand University students. Phase 1 active with Ancient History, Uttarakhand Dynasties, Polity, Physical Geography, Economics, and Cinema-mode bilingual lectures.'
            : 'श्री देव सुमन उत्तराखंड विश्वविद्यालय के छात्रों के लिए पूर्ण अध्ययन मंच। फेज 1 में प्राचीन इतिहास, उत्तराखंड के राजवंश, राजनीति विज्ञान, भौतिक भूगोल, अर्थशास्त्र एवं द्विभाषी वीडियो लेक्चर्स लाइव हैं।'}
        </p>

        {/* Hero Call-to-Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <a
            href="#courses"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <BookOpen className="w-4 h-4 text-slate-950 shrink-0" />
            <span>{lang === 'en' ? 'Select Degree & Start (BA Active)' : 'पाठ्यक्रम चुनें एवं शुरू करें (बीए लाइव)'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-950 shrink-0" />
          </a>

          <Link
            href="/auth?mode=signin"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl sm:rounded-2xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/15 text-white font-bold text-xs sm:text-sm backdrop-blur-xl transition-all flex items-center justify-center space-x-2"
          >
            <LogIn className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>{lang === 'en' ? 'Sign In to My Dashboard' : 'डैशबोर्ड में साइन इन करें'}</span>
          </Link>
        </div>


        {/* Hero Himalayan Backdrop Image Card */}
        <div className="mt-12 relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl max-w-5xl mx-auto h-52 sm:h-72 lg:h-80">
          <Image
            src="/images/himalayan_peaks.jpg"
            alt="Himalayan Mountain Peaks SDSUV"
            fill
            className="object-cover object-center brightness-75 scale-105 filter"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070913] via-[#070913]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#070913] via-transparent to-[#070913]" />

          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row items-center justify-between text-left gap-4">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-cyan-400 font-bold block">
                {lang === 'en' ? 'Himalayan High-Altitude Prep' : 'हिमालयी उच्च स्तरीय अध्ययन'}
              </span>
              <h3 className="text-base sm:text-xl font-extrabold text-white">
                {lang === 'en' ? 'Built Exclusively for SDSUV Affiliated Colleges' : 'एसडीएसयूवी संबद्ध महाविद्यालयों हेतु समर्पित'}
              </h3>
            </div>

            <div className="flex items-center space-x-2">
              <span className="px-3 py-1.5 rounded-xl bg-black/70 border border-white/15 text-xs font-mono text-slate-200">
                160+ Colleges Covered
              </span>
              <span className="px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-xs font-mono text-emerald-300">
                Phase 1 BA Live
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* PHASE 1 COURSE SELECTION: BA ACTIVE NOW / BSC LOCKED + WAITLIST     */}
      {/* ==================================================================== */}
      <section id="courses" className="relative z-10 py-12 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>PHASE 1 EXCLUSIVE ROLLOUT • SRI DEV SUMAN UTTARAKHAND UNIVERSITY</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {lang === 'en' ? 'Select Your Degree Program' : 'अपना डिग्री पाठ्यक्रम चुनें'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
            {lang === 'en'
              ? 'Phase 1 is officially live exclusively for BA (Bachelor of Arts) students across all SDSUV campuses. BSc programs are locked and launching in Phase 2—join the priority waitlist below to get notified.'
              : 'फेज 1 वर्तमान में श्री देव सुमन उत्तराखंड विश्वविद्यालय के सभी बीए विद्यार्थियों हेतु लाइव है। बीएससी पाठ्यक्रम फेज 2 में लॉन्च होंगे—प्राथमिकता प्रतीक्षा सूची में शामिल हों।'}
          </p>
        </div>

        <CourseSelectorCards
          selectedCourse={previewCourse}
          onSelectCourse={(c) => setPreviewCourse(c)}
          selectedSemester={previewSemester}
          onSelectSemester={(s) => setPreviewSemester(s)}
          selectedMedium={previewMedium}
          onSelectMedium={(m) => setPreviewMedium(m)}
          selectedSubjects={previewSubjects}
          onToggleSubject={(code) => {
            setPreviewSubjects((prev) =>
              prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
            );
          }}
          showCurriculumConfig={true}
          lang={lang}
        />

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => {
              const subjects =
                previewSubjects.length > 0
                  ? previewSubjects
                  : ['SDSUV-HIS-201', 'SDSUV-POL-201', 'SDSUV-GEO-201'];
              const params = new URLSearchParams({
                mode: 'signup',
                course: previewCourse,
                sem: String(previewSemester),
                medium: previewMedium,
                subjects: subjects.join(','),
                redirect: '/dashboard',
              });
              router.push(`/auth?${params.toString()}`);
            }}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
          >
            <span>{lang === 'en' ? 'Register Account & Launch Dashboard' : 'खाता बनाएं एवं डैशबोर्ड शुरू करें'}</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </button>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4 CORE FEATURES SHOWCASE BENTO GRID                                  */}
      {/* ==================================================================== */}
      <section id="features" className="relative z-10 py-16 max-w-7xl mx-auto px-4 sm:px-6 w-full">
        <div className="text-center mb-12">
          <div className="text-xs font-mono font-bold text-cyan-400 tracking-wider uppercase mb-2">
            {lang === 'en' ? 'Engineered for University Success' : 'विश्वविद्यालय सफलता हेतु निर्मित'}
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {lang === 'en' ? 'Everything You Need to Rank at SDSUV' : 'एसडीएसयूवी में उत्कृष्ट प्रदर्शन हेतु आवश्यक सब कुछ'}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            {lang === 'en'
              ? 'No fluff, no outdated textbooks. Just high-yield exam intelligence mapped directly to your semester curriculum.'
              : 'कोई अनावश्यक सामग्री नहीं। सीधे आपके सेमेस्टर पाठ्यक्रम से जुड़े उच्च-अंक विषय एवं प्रश्न।'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card 1: Chapter-Wise PYQ Vault (LOCKED / LIVE SOON) */}
          <div
            id="pyqs"
            className="rounded-3xl glass-panel p-6 sm:p-8 border border-amber-500/30 hover:border-amber-400/60 transition-all bg-gradient-to-br from-amber-950/20 via-[#090e24] to-[#0a0d1e] flex flex-col justify-between group shadow-xl relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-amber-950/80 border border-amber-500/30 text-amber-400 group-hover:scale-110 transition-transform">
                  <Archive className="w-6 h-6" />
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 font-bold flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>{lang === 'en' ? 'LOCKED • LIVE SOON' : 'लॉक • शीघ्र लाइव'}</span>
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                {lang === 'en' ? 'Chapter-Wise PYQ Vault' : 'अध्याय-वार पीवाईक्यू संग्रह'}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'Currently digitizing past 7 years of authentic Sri Dev Suman Uttarakhand University examination question papers (2019–2025), sorted by Subject, Chapter, and Marks (2, 5, 10, 15 marks).'
                  : 'श्री देव सुमन विश्वविद्यालय के पिछले 7 वर्षों (2019–2025) के वास्तविक प्रश्नपत्रों का डिजिटलीकरण जारी, विषय एवं अंक भार (2, 5, 10, 15 अंक) के अनुसार क्रमबद्ध।'}
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'en' ? 'High-Repetition Tagging (Repeated 5+ Times)' : 'बारंबार पूछे जाने वाले प्रश्नों की पहचान'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'en' ? 'Bilingual Questions & Model Solutions (English & Hindi)' : 'द्विभाषी प्रश्न एवं आदर्श समाधान'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-amber-300/90 font-mono text-[11px]">{lang === 'en' ? 'Digitization Underway • Going Live Soon' : 'प्रमाणीकरण जारी • शीघ्र लाइव'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-amber-400 font-bold">NEP-2020 Curation</span>
              <Link
                href="/pyqs"
                className="text-xs font-bold text-amber-300 group-hover:text-amber-200 flex items-center space-x-1"
              >
                <span>{lang === 'en' ? 'Under Process • Live Soon' : 'प्रक्रियाधीन • शीघ्र लाइव'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 2: Smart Video Lectures Studio */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 hover:border-violet-500/40 transition-all bg-gradient-to-br from-white/[0.04] to-[#120926] flex flex-col justify-between group shadow-xl">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-violet-950/80 border border-violet-500/30 text-violet-400 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-violet-950 text-violet-300 border border-violet-500/30 font-bold">
                  Cinema-Mode Studio
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white group-hover:text-violet-300 transition-colors">
                {lang === 'en' ? 'Smart Video Lectures (Hindi / English / Hinglish)' : 'स्मार्ट वीडियो व्याख्यान (हिंदी / अंग्रेजी / हिंग्लिश)'}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'Cinema-mode video player integrated with top university faculty and NPTEL professors. Instant language segmented controls allow switching between Smart Mix, Hinglish, Pure English, and Pure Hindi.'
                  : 'सिनेमा मोड वीडियो प्लेयर जिसमें शीर्ष संकाय एवं व्याख्यान शामिल हैं। 1-क्लिक भाषा बटन से हिंग्लिश, शुद्ध अंग्रेजी एवं हिंदी में व्याख्यान तुरंत बदलें।'}
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'en' ? 'Interactive Vertical Node Roadmap for all 5 Units' : 'सभी 5 इकाइयों का इंटरैक्टिव रोडमैप'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Play className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'en' ? 'Split-Screen Studio: Video on Left, Topic PYQs on Right' : 'स्प्लिट स्क्रीन: बाईं ओर वीडियो, दाईं ओर प्रश्न'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-violet-400" />
                  <span>{lang === 'en' ? 'Mark-as-Done tracking & exam night quick revision cards' : 'अध्याय पूर्णता ट्रैकिंग एवं रिवीजन कार्ड्स'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-violet-400 font-bold">120+ Curated Lectures</span>
              <Link
                href="/auth?mode=signup"
                className="text-xs font-bold text-white group-hover:text-violet-300 flex items-center space-x-1"
              >
                <span>{lang === 'en' ? 'Open Study Studio' : 'स्टडी स्टूडियो देखें'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 3: 3-Hour Exam Simulator */}
          <div
            id="simulator"
            className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 hover:border-emerald-500/40 transition-all bg-gradient-to-br from-white/[0.04] to-[#071f18] flex flex-col justify-between group shadow-xl"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Clock className="w-6 h-6" />
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-bold">
                  NEP 2020 Pattern
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                {lang === 'en' ? '3-Hour SDSUV Exam Simulator' : '3 घंटे का एसडीएसयूवी परीक्षा सिम्युलेटर'}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'Simulate the exact university exam conditions. Real question paper formats (Section A Very Short, Section B Short Notes, Section C Long Essays) with 180-minute countdown and printable PDF.'
                  : 'विश्वविद्यालय परीक्षा जैसी वास्तविक परिस्थितियां। खंड अ (अति लघु), खंड ब (लघु उत्तरीय), एवं खंड स (दीर्घ उत्तरीय) का प्रारूप, लाइव 180-मिनट टाइमर एवं प्रिंटेबल पीडीएफ।'}
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{lang === 'en' ? 'Exact University Marking Schemes (75 Marks Theory)' : 'विश्वविद्यालय का वास्तविक 75 अंक प्रारूप'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'en' ? 'Section-by-Section Time Management Advisory' : 'समय प्रबंधन दिशा-निर्देश'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'en' ? '1-Click Clean Print & PDF Download' : '1-क्लिक प्रिंट एवं पीडीएफ डाउनलोड'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 font-bold">Real Examination Format</span>
              <Link
                href="/auth?mode=signup"
                className="text-xs font-bold text-white group-hover:text-emerald-300 flex items-center space-x-1"
              >
                <span>{lang === 'en' ? 'Start Mock Simulator' : 'सिम्युलेटर शुरू करें'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Card 4: BA / BSc Career Compass (LOCKED / LIVE SOON) */}
          <div
            id="careers"
            className="rounded-3xl glass-panel p-6 sm:p-8 border border-emerald-500/30 hover:border-emerald-400/60 transition-all bg-gradient-to-br from-emerald-950/20 via-[#0b171f] to-[#0a0d1e] flex flex-col justify-between group shadow-xl relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="p-3 rounded-2xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>{lang === 'en' ? 'LOCKED • LIVE SOON' : 'लॉक • शीघ्र लाइव'}</span>
                </span>
              </div>

              <h3 className="text-xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                {lang === 'en' ? 'BA Career Compass' : 'बीए करियर कंपास'}
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                {lang === 'en'
                  ? 'Currently curating official career roadmaps for CDS, AFCAT, UPSC CSE, State PCS (UKPSC), SSC CGL, and Academic Masters/Assistant Professorships with Uttarakhand hill region physical standards.'
                  : 'सीडीएस, एएफकैट, यूपीएससी, यूकेपीएससी, एसएससी एवं सहायक आचार्य हेतु उत्तराखंड पर्वतीय छूट सहित आधिकारिक करियर ब्लूप्रिंट्स का संकलन जारी।'}
              </p>

              <div className="mt-4 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                  <span>{lang === 'en' ? 'SDSUV Syllabus Overlap Matrix for each competitive exam' : 'एसडीएसयूवी सिलेबस एवं परीक्षा का सीधा संबंध'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'en' ? 'Uttarakhand Domicile 5cm height & physical standards' : 'उत्तराखंड अधिवास 5 सेमी ऊंचाई व शारीरिक छूट'}</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-300">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300/90 font-mono text-[11px]">{lang === 'en' ? 'Curation Underway • Going Live Soon' : 'संकलन कार्य प्रगति पर • शीघ्र लाइव'}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[11px] font-mono text-emerald-400 font-bold">Officer Blueprints</span>
              <Link
                href="/careers"
                className="text-xs font-bold text-emerald-300 group-hover:text-emerald-200 flex items-center space-x-1"
              >
                <span>{lang === 'en' ? 'Under Process • Live Soon' : 'प्रक्रियाधीन • शीघ्र लाइव'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3-STEP ONBOARDING HOW IT WORKS                                       */}
      {/* ==================================================================== */}
      <section className="relative z-10 py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/10 bg-gradient-to-br from-[#080d22] via-[#09112a] to-[#080d22] shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {lang === 'en' ? 'Get Started in 3 Simple Steps' : '3 सरल चरणों में शुरुआत करें'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              {lang === 'en'
                ? 'Takes less than 30 seconds to calibrate your personalized curriculum.'
                : 'आपके व्यक्तिगत पाठ्यक्रम को सेट करने में 30 सेकंड से भी कम समय लगता है।'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 relative">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-black flex items-center justify-center text-sm mb-3">
                1
              </div>
              <h3 className="font-extrabold text-white text-sm">
                {lang === 'en' ? 'Pick Degree & Semester' : 'डिग्री एवं सेमेस्टर चुनें'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'en'
                  ? 'Select BSc Maths, BSc Bio, or BA Arts and your current semester (Sem 1 to 6).'
                  : 'बीएससी मैथ्स, बायो या बीए और अपना वर्तमान सेमेस्टर (1 से 6) चुनें।'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 relative">
              <div className="w-8 h-8 rounded-xl bg-violet-500/20 text-violet-400 font-black flex items-center justify-center text-sm mb-3">
                2
              </div>
              <h3 className="font-extrabold text-white text-sm">
                {lang === 'en' ? 'Tick Enrolled Subjects' : 'नामांकित विषयों पर टिक लगाएं'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'en'
                  ? 'Select the exact subjects you study. Unneeded subjects are hidden so your dashboard stays clean.'
                  : 'केवल अपने चुने विषयों को चुनें। अनावश्यक विषय छिप जाते हैं ताकि आपका डैशबोर्ड साफ रहे।'}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 relative">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 font-black flex items-center justify-center text-sm mb-3">
                3
              </div>
              <h3 className="font-extrabold text-white text-sm">
                {lang === 'en' ? 'Study & Track Progress' : 'अध्ययन करें एवं प्रगति मापें'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'en'
                  ? 'Access topic PYQs, cinema lectures, flashcards, and 3-hour practice simulators anytime.'
                  : 'विषयवार प्रश्न, सिनेमा वीडियो, फ्लैशकार्ड और 3-घंटे के सिम्युलेटर का लाभ उठाएं।'}
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/auth?mode=signup"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 transition-all"
            >
              <span>{lang === 'en' ? 'Create Your Account Now' : 'अपना अकाउंट अभी बनाएं'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* FINAL CALL TO ACTION                                                 */}
      {/* ==================================================================== */}
      <section className="relative z-10 py-16 text-center max-w-4xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          {lang === 'en' ? 'Ready to Start Studying Smarter?' : 'क्या आप बेहतर तैयारी के लिए तैयार हैं?'}
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-slate-400">
          {lang === 'en'
            ? 'Join thousands of Uttarakhand students preparing for Sri Dev Suman University term-end examinations.'
            : 'श्री देव सुमन विश्वविद्यालय की परीक्षाओं की तैयारी कर रहे छात्रों के साथ जुड़ें।'}
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/auth?mode=signup"
            className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-black text-xs sm:text-sm hover:scale-105 transition-all shadow-lg shadow-cyan-500/20"
          >
            {lang === 'en' ? 'Sign Up (Free)' : 'साइन अप (निःशुल्क)'}
          </Link>
          <Link
            href="/auth?mode=signin"
            className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs sm:text-sm border border-white/10 transition-all"
          >
            {lang === 'en' ? 'Sign In' : 'साइन इन'}
          </Link>
        </div>
      </section>

      {/* Unofficial Clean Footer */}
      <Footer lang={lang} />
    </div>
  );
}
