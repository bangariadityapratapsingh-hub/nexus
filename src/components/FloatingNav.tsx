'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FileText,
  BookOpenCheck,
  Tv,
  Archive,
  Compass,
  User,
  LogIn,
  Search,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Menu,
  X,
  Sparkles,
  BookOpen,
  Landmark,
  Building2,
  Users,
  Globe,
  SlidersHorizontal,
  PanelLeftClose,
  PanelLeftOpen,
  CheckCircle2,
  Bell,
  Lock,
  Newspaper,
} from 'lucide-react';
import { LanguageType } from '@/lib/types';
import {
  getStudentProfile,
  isStudentLoggedIn,
  StudentProfile,
  filterToSelectedSubjects,
} from '@/lib/studentProfile';
import InstallPwaButton from '@/components/InstallPwaButton';
import AmbassadorCarLogo from '@/components/AmbassadorCarLogo';
import ThemeToggle from '@/components/ThemeToggle';
import {
  EXPLORER_SUBJECTS,
  ExplorerSubject,
  ExplorerTopic,
} from '@/data/subjectExplorerData';

import { useSidebarState } from '@/lib/sidebarState';

export type NavTabId =
  | 'dashboard'
  | 'syllabus'
  | 'notes'
  | 'lectures'
  | 'books'
  | 'study'
  | 'current-affairs'
  | 'pyqs'
  | 'careers'
  | 'notifications'
  | 'profile';

export interface FloatingNavProps {
  currentTab?: NavTabId;
  lang: LanguageType;
  setLang: (lang: LanguageType) => void;
  onOpenSearch?: () => void;
  showSubjectExplorer?: boolean;
  activeSubjectId?: string;
  activeUnitNumber?: number;
  activeTopicId?: string;
  onSelectTopic?: (topicId: string, subjectId: string, unitNumber: number) => void;
}

export default function FloatingNav({
  currentTab = 'dashboard',
  lang,
  setLang,
  onOpenSearch,
  showSubjectExplorer: propShowSubjectExplorer,
  activeSubjectId,
  activeUnitNumber,
  activeTopicId,
  onSelectTopic,
}: FloatingNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  // Filter subjects strictly to student profile selections
  const visibleExplorerSubjects = React.useMemo(() => {
    return filterToSelectedSubjects(
      EXPLORER_SUBJECTS,
      (s) => s.id,
      profile?.selectedSubjects
    );
  }, [profile?.selectedSubjects]);

  // Primary Left Sidebar Collapsible State - Synced across all pages & persisted
  const {
    isCollapsed: isPrimaryCollapsed,
    toggleSidebar,
    setIsCollapsed: setPrimaryCollapsed,
  } = useSidebarState();

  // Mobile Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Secondary Left Sidebar (Subject & Unit Explorer) State
  // Auto-enabled on notes, lectures, learn topic, and syllabus
  const isExplorerEligible =
    propShowSubjectExplorer ??
    (currentTab === 'notes' ||
      currentTab === 'lectures' ||
      currentTab === 'study' ||
      currentTab === 'syllabus' ||
      pathname.startsWith('/notes') ||
      pathname.startsWith('/lectures') ||
      pathname.startsWith('/learn') ||
      pathname.startsWith('/syllabus'));

  const [isExplorerOpen, setIsExplorerOpen] = useState<boolean>(false);

  // Accordion state in Secondary Explorer
  const [expandedSubjectId, setExpandedSubjectId] = useState<string>(
    activeSubjectId || 'geography'
  );
  const [expandedUnitNum, setExpandedUnitNum] = useState<number>(
    activeUnitNumber || 1
  );

  useEffect(() => {
    if (activeSubjectId) setExpandedSubjectId(activeSubjectId);
    if (activeUnitNumber) setExpandedUnitNum(activeUnitNumber);
  }, [activeSubjectId, activeUnitNumber]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setPrimaryCollapsed(true);
      setIsExplorerOpen(false);
    }
  }, [setPrimaryCollapsed]);

  // Global event listeners for toggling or opening secondary explorer from anywhere
  useEffect(() => {
    const handleOpen = () => setIsExplorerOpen(true);
    const handleClose = () => setIsExplorerOpen(false);
    const handleToggle = () => setIsExplorerOpen((prev) => !prev);

    window.addEventListener('sdsuv_open_explorer', handleOpen);
    window.addEventListener('sdsuv_close_explorer', handleClose);
    window.addEventListener('sdsuv_toggle_explorer', handleToggle);

    return () => {
      window.removeEventListener('sdsuv_open_explorer', handleOpen);
      window.removeEventListener('sdsuv_close_explorer', handleClose);
      window.removeEventListener('sdsuv_toggle_explorer', handleToggle);
    };
  }, []);

  // Automatically close secondary explorer when switching routes or tabs
  useEffect(() => {
    setIsExplorerOpen(false);
  }, [pathname, currentTab]);

  // Automatically close/collapse sidebar when selecting or visiting Current Affairs
  useEffect(() => {
    if (pathname.startsWith('/current-affairs') || currentTab === 'current-affairs') {
      setPrimaryCollapsed(true);
      setIsMobileMenuOpen(false);
    }
  }, [pathname, currentTab, setPrimaryCollapsed]);

  useEffect(() => {
    setProfile(getStudentProfile());
    setLoggedIn(isStudentLoggedIn());

    const handleProfile = () => {
      setProfile(getStudentProfile());
      setLoggedIn(isStudentLoggedIn());
    };

    window.addEventListener('sdsuv_profile_updated', handleProfile);
    return () => window.removeEventListener('sdsuv_profile_updated', handleProfile);
  }, []);

  // Primary Navigation items as requested:
  // Dashboard, Syllabus Hub, Notes Studio, Lecture Studio, PYQ Vault, Career Compass, Profile
  const navItems = [
    {
      id: 'dashboard' as NavTabId,
      labelEn: 'Dashboard',
      labelHi: 'डैशबोर्ड',
      icon: LayoutDashboard,
      href: loggedIn ? '/dashboard' : '/auth?mode=signin&redirect=/dashboard',
      color: 'text-cyan-400',
    },
    {
      id: 'syllabus' as NavTabId,
      labelEn: 'Syllabus Hub',
      labelHi: 'पाठ्यक्रम केंद्र',
      icon: FileText,
      href: '/syllabus',
      color: 'text-sky-400',
    },
    {
      id: 'notes' as NavTabId,
      labelEn: 'Notes Studio',
      labelHi: 'नोट्स स्टूडियो',
      icon: BookOpenCheck,
      href: '/notes',
      color: 'text-violet-400',
    },
    {
      id: 'lectures' as NavTabId,
      labelEn: 'Lecture Studio',
      labelHi: 'लेक्चर स्टूडियो',
      icon: Tv,
      href: '/lectures',
      color: 'text-red-400',
    },
    {
      id: 'books' as NavTabId,
      labelEn: 'Book Vault',
      labelHi: 'पाठ्यपुस्तकें',
      icon: BookOpen,
      href: '/books',
      color: 'text-amber-400',
      badge: 'PDF',
    },
    {
      id: 'current-affairs' as NavTabId,
      labelEn: 'Current Affairs',
      labelHi: 'समसामयिकी (करेंट अफेयर्स)',
      icon: Newspaper,
      href: '/current-affairs',
      color: 'text-emerald-400',
      badge: 'LIVE',
    },
    {
      id: 'pyqs' as NavTabId,
      labelEn: 'PYQ Vault',
      labelHi: 'पीवाईक्यू वॉल्ट',
      icon: Archive,
      href: '/pyqs',
      color: 'text-amber-400',
      badge: 'Live Soon',
    },
    {
      id: 'careers' as NavTabId,
      labelEn: 'Career Compass',
      labelHi: 'करियर कम्पास',
      icon: Compass,
      href: '/careers',
      color: 'text-emerald-400',
      badge: 'Live Soon',
    },
    {
      id: 'notifications' as NavTabId,
      labelEn: 'Notice Hub',
      labelHi: 'अधिसूचना केंद्र',
      icon: Bell,
      href: '/notifications',
      color: 'text-rose-400',
      badge: 'LIVE',
    },
    {
      id: 'profile' as NavTabId,
      labelEn: 'Profile & Course',
      labelHi: 'प्रोफाइल एवं विषय',
      icon: User,
      href: '/profile',
      color: 'text-pink-400',
    },
  ];

  const getSubjectIcon = (iconName: string) => {
    switch (iconName) {
      case 'Landmark':
        return Landmark;
      case 'Building2':
        return Building2;
      case 'Users':
        return Users;
      case 'BookOpenCheck':
        return BookOpenCheck;
      case 'Globe':
      default:
        return Globe;
    }
  };

  const handleTopicClick = (
    topic: ExplorerTopic,
    subject: ExplorerSubject,
    unitNum: number
  ) => {
    // 1. Auto-close secondary explorer immediately on topic selection so full screen is dedicated to notes/lectures
    setIsExplorerOpen(false);

    if (onSelectTopic) {
      onSelectTopic(topic.id, subject.id, unitNum);
      return;
    }

    // Contextual routing:
    if (pathname.startsWith('/lectures') || currentTab === 'lectures') {
      router.push(`/lectures?subject=${subject.id}&unit=${unitNum}&topic=${topic.id}`);
    } else if (pathname.startsWith('/syllabus') || currentTab === 'syllabus') {
      router.push(`/syllabus?subject=${subject.id}&unit=${unitNum}`);
    } else {
      router.push(`/notes?subject=${subject.id}&unit=${unitNum}&topic=${topic.id}`);
    }
  };

  return (
    <>
      {/* ================================================================== */}
      {/* MOBILE TOP BAR (Brand + Medium Toggle + Hamburger)                 */}
      {/* ================================================================== */}
      <header className="fixed top-0 left-0 right-0 z-40 px-3.5 py-2.5 md:hidden glass-nav border-b border-slate-200/90 dark:border-white/10 bg-[#F6F8F5]/95 dark:bg-[#080d22]/95 backdrop-blur-xl flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-cyan-300 border border-white/10 transition-colors"
            title="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          <Link href={loggedIn ? '/dashboard' : '/'} className="flex items-center space-x-2 group">
            <AmbassadorCarLogo size={28} />
            <div>
              <div className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-300">
                APSB NEXUS
              </div>
              <div className="text-[9px] text-slate-400 font-mono truncate max-w-[130px]">
                {lang === 'en' ? 'SDSUV BA Prep' : 'एसडीएसयूवी अध्ययन'}
              </div>
            </div>
          </Link>
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Theme Switcher on Mobile */}
          <ThemeToggle compact={true} lang={lang} />

          {/* Medium Toggle on Mobile */}
          <div className="flex items-center p-0.5 bg-black/60 dark:bg-black/60 light:bg-slate-200 rounded-lg border border-white/10 dark:border-white/10 light:border-slate-300">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                lang === 'en'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLang('hi')}
              className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${
                lang === 'hi'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-400 light:text-slate-600'
              }`}
            >
              हिंदी
            </button>
          </div>

          {/* Current Affairs on Mobile Top Bar */}
          <Link
            href="/current-affairs"
            className="p-1.5 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-bold relative hover:scale-105 transition-all"
            title="Current Affairs (LIVE)"
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500" />
          </Link>

          {/* University Notifications Bell on Mobile */}
          <Link
            href="/notifications"
            className="p-1.5 rounded-lg bg-rose-950/70 border border-rose-500/40 text-rose-300 text-xs font-bold relative hover:scale-105 transition-all"
            title="Live University Updates"
          >
            <Bell className="w-3.5 h-3.5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500" />
          </Link>

          {/* Profile icon */}
          <Link
            href={loggedIn ? '/profile' : '/auth'}
            className="p-1.5 rounded-lg bg-cyan-950/80 border border-cyan-400/40 text-cyan-300 text-xs font-bold"
          >
            <User className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* ================================================================== */}
      {/* DESKTOP TOP-RIGHT ACTION BAR (Theme Toggle + Medium + Notifications + Profile) */}
      {/* ================================================================== */}
      <div className="hidden md:flex fixed top-4 right-6 z-40 items-center space-x-2.5 px-3 py-1.5 rounded-2xl glass-nav border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-2xl">
        {/* Sleek Animated ☀️ Light / 🌙 Dark Toggle Pill */}
        <ThemeToggle lang={lang} />

        <div className="h-4 w-px bg-white/10 dark:bg-white/10 light:bg-slate-300" />

        {/* Medium Switcher (EN / हिंदी) */}
        <div className="flex items-center p-0.5 bg-black/40 dark:bg-black/40 light:bg-slate-200/80 rounded-full border border-white/10 dark:border-white/10 light:border-slate-300">
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
              lang === 'en'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            EN
          </button>
          <button
            type="button"
            onClick={() => setLang('hi')}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
              lang === 'hi'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm'
                : 'text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-white dark:hover:text-white light:hover:text-slate-900'
            }`}
          >
            हिंदी
          </button>
        </div>

        <div className="h-4 w-px bg-white/10 dark:bg-white/10 light:bg-slate-300" />

        {/* Current Affairs Quick Pill with LIVE badge */}
        <Link
          href="/current-affairs"
          className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-100 border border-emerald-500/40 text-emerald-300 dark:text-emerald-300 light:text-emerald-800 text-xs font-bold hover:scale-105 transition-all shadow-sm"
          title="Live Current Affairs Hub"
        >
          <Newspaper className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden lg:inline text-[11px] font-bold">
            {lang === 'en' ? 'Current Affairs' : 'समसामयिकी'}
          </span>
          <span className="px-1.5 py-0.2 rounded text-[8px] font-black uppercase tracking-wider bg-rose-500 text-white animate-pulse">
            LIVE
          </span>
        </Link>

        <div className="h-4 w-px bg-white/10 dark:bg-white/10 light:bg-slate-300" />

        {/* SDSUV Notifications Hub Bell */}
        <Link
          href="/notifications"
          className="p-1.5 rounded-xl bg-rose-950/60 dark:bg-rose-950/60 light:bg-rose-100 border border-rose-500/40 text-rose-300 dark:text-rose-300 light:text-rose-700 relative hover:scale-105 transition-all"
          title="SDSUV Notifications Hub"
        >
          <Bell className="w-3.5 h-3.5" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-rose-500" />
        </Link>

        {/* Profile Button */}
        <Link
          href={loggedIn ? '/profile' : '/auth'}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/70 dark:bg-cyan-950/70 light:bg-teal-100 border border-cyan-400/40 text-cyan-300 dark:text-cyan-300 light:text-teal-900 text-xs font-bold hover:scale-105 transition-all shadow-sm"
          title="Student Profile"
        >
          <User className="w-3.5 h-3.5" />
          <span className="max-w-[100px] truncate">{loggedIn && profile?.name ? profile.name : 'Profile'}</span>
        </Link>
      </div>

      {/* ================================================================== */}
      {/* 1. PRIMARY LEFT SLIDE-BAR (MAIN MENU)                              */}
      {/* ================================================================== */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col justify-between bg-[#EEF2EC] dark:bg-[#080d22]/95 backdrop-blur-2xl border-r border-slate-200/90 dark:border-white/10 shadow-2xl transition-all duration-300 select-none ${
          /* Desktop Width: Expanded (w-64) or Collapsed (w-[70px]) */
          isPrimaryCollapsed ? 'md:w-[70px]' : 'md:w-64'
        } ${
          /* Mobile: Off-screen or Full Drawer */
          isMobileMenuOpen ? 'translate-x-0 w-72' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Top Header: Logo + Title + Collapse Toggle */}
        <div className="p-3.5 pb-2 border-b border-white/10">
          <div className="flex items-center justify-between">
            <Link
              href={loggedIn ? '/dashboard' : '/'}
              className="flex items-center space-x-2.5 overflow-hidden group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <AmbassadorCarLogo size={36} />

              {(!isPrimaryCollapsed || isMobileMenuOpen) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="leading-tight min-w-0"
                >
                  <div className="flex items-center space-x-1.5">
                    <span className="font-black text-sm text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-200 to-violet-300 tracking-wider">
                      APSB NEXUS
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono">
                      PREP
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 truncate" title="Independent Student Prep Platform for SDSUV BA Students">
                    {lang === 'en' ? 'Independent Student Prep Platform for SDSUV BA Students' : 'एसडीएसयूवी बीए छात्रों के लिए स्वतंत्र अध्ययन मंच'}
                  </p>
                </motion.div>
              )}
            </Link>

            {/* Collapse / Expand Toggle Button (Desktop Only) */}
            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden md:flex p-1.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] text-slate-400 hover:text-white border border-white/10 transition-colors cursor-pointer"
              title={isPrimaryCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
            >
              {isPrimaryCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-cyan-400" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Close Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-white/[0.05] text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Medium Switcher (EN / हिंदी) inside Sidebar */}
          {(!isPrimaryCollapsed || isMobileMenuOpen) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-3 p-1 rounded-xl bg-black/50 border border-white/10 flex items-center justify-between"
            >
              <span className="text-[10px] font-mono font-bold text-slate-400 pl-2">
                Medium:
              </span>
              <div className="flex items-center space-x-1">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                    lang === 'en'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>EN</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1 ${
                    lang === 'hi'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🇮🇳</span>
                  <span>हिंदी</span>
                </button>
              </div>
            </motion.div>
          )}

          {isPrimaryCollapsed && !isMobileMenuOpen && (
            <div className="mt-3 flex justify-center">
              <button
                type="button"
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="w-9 h-8 rounded-lg bg-black/60 border border-white/10 text-[10px] font-bold text-cyan-300 hover:text-white flex items-center justify-center transition-colors"
                title={`Current: ${lang === 'en' ? 'English' : 'हिंदी'}. Click to toggle.`}
              >
                {lang === 'en' ? 'EN' : 'हिं'}
              </button>
            </div>
          )}
        </div>

        {/* Middle: Navigation Links */}
        <nav className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentTab === item.id ||
              (item.id === 'current-affairs' && pathname.startsWith('/current-affairs')) ||
              (item.id === 'notifications' && pathname.startsWith('/notifications')) ||
              (item.id === 'lectures' && (pathname.startsWith('/lectures') || pathname.startsWith('/learn'))) ||
              (item.id === 'notes' && pathname.startsWith('/notes')) ||
              (item.id === 'syllabus' && pathname.startsWith('/syllabus')) ||
              (item.id === 'pyqs' && pathname.startsWith('/pyqs')) ||
              (item.id === 'careers' && pathname.startsWith('/careers')) ||
              (item.id === 'profile' && pathname.startsWith('/profile'));

            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsExplorerOpen(false);
                  if (item.id === 'current-affairs') {
                    setPrimaryCollapsed(true);
                  }
                }}
                className={`relative flex items-center rounded-xl transition-all duration-200 group ${
                  isPrimaryCollapsed && !isMobileMenuOpen
                    ? 'justify-center p-2.5'
                    : 'px-3 py-2.5 space-x-3'
                } ${
                  isActive
                    ? 'bg-white/[0.08] text-white font-bold border border-cyan-500/30 shadow-md shadow-cyan-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]'
                }`}
                title={lang === 'en' ? item.labelEn : item.labelHi}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePrimaryBarPill"
                    className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-gradient-to-b from-cyan-400 to-blue-500 shadow-[0_0_10px_#06b6d4]"
                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                  />
                )}

                <Icon
                  className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? item.color : 'text-slate-400'
                  }`}
                />

                {(!isPrimaryCollapsed || isMobileMenuOpen) && (
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span className="text-xs truncate">
                      {lang === 'en' ? item.labelEn : item.labelHi}
                    </span>
                    {(item as { badge?: string }).badge && (
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[8px] font-black tracking-wider uppercase flex items-center space-x-1 shrink-0 ${
                          item.badge === 'Live Soon'
                            ? 'bg-amber-950/90 text-amber-300 border border-amber-500/50'
                            : 'bg-rose-950 text-rose-300 border border-rose-500/50 animate-pulse'
                        }`}
                      >
                        {item.badge === 'Live Soon' ? (
                          <Lock className="w-2.5 h-2.5 text-amber-400" />
                        ) : (
                          <span className="w-1 h-1 rounded-full bg-rose-400" />
                        )}
                        <span>{item.badge}</span>
                      </span>
                    )}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Actions: Search, Install, Profile */}
        <div className="p-3 border-t border-white/10 space-y-2">
          {onOpenSearch && (
            <button
              type="button"
              onClick={onOpenSearch}
              className={`w-full flex items-center rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 text-slate-300 hover:text-white transition-colors text-xs ${
                isPrimaryCollapsed && !isMobileMenuOpen
                  ? 'justify-center p-2'
                  : 'px-3 py-2 justify-between'
              }`}
              title="Search Curriculum (Ctrl + K)"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                {(!isPrimaryCollapsed || isMobileMenuOpen) && (
                  <span>{lang === 'en' ? 'Quick Search' : 'खोजें'}</span>
                )}
              </div>
              {(!isPrimaryCollapsed || isMobileMenuOpen) && (
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/40 text-slate-400 font-mono border border-white/10">
                  ⌘K
                </span>
              )}
            </button>
          )}

          {/* User Profile Tile */}
          {loggedIn && profile ? (
            <Link
              href="/profile"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center rounded-xl bg-gradient-to-r from-cyan-950/60 to-violet-950/60 border border-cyan-500/30 hover:border-cyan-400 transition-all ${
                isPrimaryCollapsed && !isMobileMenuOpen
                  ? 'justify-center p-2'
                  : 'p-2.5 space-x-2.5'
              }`}
              title="Student Profile"
            >
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0 shadow-md">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              {(!isPrimaryCollapsed || isMobileMenuOpen) && (
                <div className="min-w-0 leading-tight">
                  <span className="block text-xs font-bold text-white truncate">
                    {profile.name}
                  </span>
                  <span className="block text-[10px] font-mono text-cyan-300 truncate">
                    Sem {profile.semester} • {profile.stream === 'ba-arts' ? 'BA Arts' : 'BSc'}
                  </span>
                </div>
              )}
            </Link>
          ) : (
            <Link
              href="/auth"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs py-2 shadow-md shadow-cyan-500/25 hover:scale-105 transition-all ${
                isPrimaryCollapsed && !isMobileMenuOpen ? 'p-2' : 'px-3 space-x-1.5'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              {(!isPrimaryCollapsed || isMobileMenuOpen) && <span>Sign In</span>}
            </Link>
          )}
        </div>
      </aside>

      {/* Backdrop for Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ================================================================== */}
      {/* 2. SECONDARY LEFT SLIDE-BAR (SUBJECT & UNIT EXPLORER)              */}
      {/* ================================================================== */}
      {isExplorerEligible && (
        <>
          {/* Backdrop for Secondary Explorer (Click outside on mobile or desktop to auto-close) */}
          <AnimatePresence>
            {isExplorerOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsExplorerOpen(false)}
                className="fixed inset-0 z-35 bg-black/40 dark:bg-black/60 backdrop-blur-[2px] cursor-pointer transition-opacity"
                title="Click outside to close Subject Explorer"
              />
            )}
          </AnimatePresence>

          {/* Secondary Left Slide-Out Drawer / Panel */}
          <aside
            className={`fixed top-0 bottom-0 z-40 flex flex-col justify-between bg-white dark:bg-[#070b1e]/98 backdrop-blur-2xl border-r border-slate-200 dark:border-white/10 shadow-2xl transition-all duration-300 w-72 md:w-80 select-none ${
              /* Offset by Primary Sidebar width on Desktop */
              isPrimaryCollapsed ? 'md:left-[70px]' : 'md:left-64'
            } ${
              /* Visibility Toggle */
              isExplorerOpen
                ? 'translate-x-0 left-0'
                : '-translate-x-full md:-translate-x-full'
            }`}
          >
            {/* Header: Explorer Title & Collapse button */}
            <div className="p-3.5 border-b border-slate-200 dark:border-white/10 flex items-center justify-between bg-slate-50 dark:bg-black/30">
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded-lg bg-teal-100 dark:bg-cyan-500/20 text-teal-700 dark:text-cyan-300 border border-teal-300/60 dark:border-cyan-500/30">
                  <BookOpen className="w-3.5 h-3.5" />
                </span>
                <div>
                  <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    {lang === 'en' ? 'Subject & Unit Explorer' : 'विषय एवं इकाई अन्वेषक'}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                    {visibleExplorerSubjects.length} Registered Disciplines
                  </p>
                </div>
              </div>

              {/* Close / Hide Explorer Button */}
              <button
                type="button"
                onClick={() => setIsExplorerOpen(false)}
                className="p-1.5 rounded-lg bg-slate-200/70 hover:bg-slate-300/80 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-white/10 text-xs transition-colors cursor-pointer"
                title="Hide Subject Explorer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Scrollable Accordion Tree */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 scrollbar-thin">
              {visibleExplorerSubjects.map((subject) => {
                const isSubjectOpen = expandedSubjectId === subject.id;
                const Icon =
                  subject.id === 'geography'
                    ? Globe
                    : subject.id === 'history'
                    ? Landmark
                    : subject.id === 'polscience'
                    ? Building2
                    : subject.id === 'sociology'
                    ? Users
                    : BookOpen;

                return (
                  <div
                    key={subject.id}
                    className="rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden bg-slate-50/70 dark:bg-black/40 shadow-sm transition-all"
                  >
                    {/* Subject Accordion Header */}
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedSubjectId(isSubjectOpen ? '' : subject.id)
                      }
                      className={`w-full p-2.5 flex items-center justify-between text-left transition-colors cursor-pointer ${
                        isSubjectOpen
                          ? 'bg-teal-50 dark:bg-gradient-to-r dark:from-cyan-950/60 dark:to-violet-950/60 border-b border-slate-200 dark:border-white/10 text-teal-950 dark:text-white font-bold'
                          : 'hover:bg-slate-100 dark:hover:bg-white/[0.04] text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <div
                          className={`p-1.5 rounded-xl bg-gradient-to-br ${subject.color} text-white shadow-sm flex-shrink-0`}
                        >
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="min-w-0">
                          <span className="block text-xs font-extrabold truncate">
                            {lang === 'en' ? subject.nameEn : subject.nameHi}
                          </span>
                          <span className="block text-[10px] font-mono text-teal-700 dark:text-cyan-300">
                            {subject.code} • 4 Units
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-1 flex-shrink-0 ml-1">
                        {isSubjectOpen ? (
                          <ChevronDown className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                        ) : (
                          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                        )}
                      </div>
                    </button>

                    {/* Collapsible Units for This Subject */}
                    <AnimatePresence>
                      {isSubjectOpen && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="divide-y divide-slate-200 dark:divide-white/5 bg-white dark:bg-slate-950/70"
                        >
                          {subject.units.map((unit) => {
                            const isUnitOpen =
                              expandedSubjectId === subject.id &&
                              expandedUnitNum === unit.unitNumber;

                            return (
                              <div key={unit.unitNumber} className="py-0.5">
                                {/* Unit Title Accordion Row */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    setExpandedUnitNum(
                                      isUnitOpen ? 0 : unit.unitNumber
                                    )
                                  }
                                  className={`w-full px-3 py-2 flex items-center justify-between text-left text-xs transition-colors cursor-pointer ${
                                    isUnitOpen
                                      ? 'text-teal-900 dark:text-cyan-300 font-bold bg-teal-50 dark:bg-cyan-950/30'
                                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/[0.02]'
                                  }`}
                                >
                                  <div className="flex items-center space-x-1.5 min-w-0">
                                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 dark:bg-cyan-400 flex-shrink-0" />
                                    <span className="truncate text-[11px]">
                                      {lang === 'en' ? unit.titleEn : unit.titleHi}
                                    </span>
                                  </div>

                                  <div className="flex items-center space-x-1 flex-shrink-0 ml-1">
                                    <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-slate-200 dark:bg-black/60 text-slate-600 dark:text-slate-400 font-bold">
                                      {unit.topics.length}
                                    </span>
                                    {isUnitOpen ? (
                                      <ChevronDown className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                                    ) : (
                                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                                    )}
                                  </div>
                                </button>

                                {/* Collapsible Topics List */}
                                <AnimatePresence>
                                  {isUnitOpen && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      className="px-2 py-1 space-y-1 bg-slate-50 dark:bg-black/40"
                                    >
                                      {unit.topics.map((topic) => {
                                        const isTopicActive =
                                          activeTopicId === topic.id ||
                                          activeTopicId === topic.notesTopicId;

                                        return (
                                          <button
                                            key={topic.id}
                                            type="button"
                                            onClick={() =>
                                              handleTopicClick(
                                                topic,
                                                subject,
                                                unit.unitNumber
                                              )
                                            }
                                            className={`w-full text-left p-2 rounded-xl text-[11px] transition-all flex items-start space-x-2 cursor-pointer ${
                                              isTopicActive
                                                ? 'bg-teal-600 text-white font-bold shadow-md shadow-teal-700/25 dark:bg-gradient-to-r dark:from-cyan-950 dark:to-blue-950 dark:text-white dark:border dark:border-cyan-400/50'
                                                : 'text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-white/[0.05] border border-transparent'
                                            }`}
                                          >
                                            <span
                                              className={`text-[9px] font-mono px-1 py-0.5 rounded flex-shrink-0 mt-0.5 ${
                                                isTopicActive
                                                  ? 'bg-white text-teal-900 dark:bg-cyan-500 dark:text-slate-950 font-black'
                                                  : 'bg-slate-200 dark:bg-white/10 text-slate-600 dark:text-slate-400'
                                              }`}
                                            >
                                              {topic.sequence.replace('Topic ', 'T')}
                                            </span>
                                            <div className="min-w-0">
                                              <span className="block leading-snug line-clamp-2">
                                                {lang === 'en'
                                                  ? topic.titleEn
                                                  : topic.titleHi}
                                              </span>
                                              <span className="block text-[9px] font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                                                ⏱️ {topic.duration} • {topic.channel}
                                              </span>
                                            </div>
                                          </button>
                                        );
                                      })}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Bottom: Fast Switch Mode Pill */}
            <div className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
              <span className="font-mono">Quick Switch Studio:</span>
              <div className="flex items-center space-x-1.5 font-bold">
                <Link
                  href="/notes"
                  className="px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-violet-950 text-teal-800 dark:text-violet-300 border border-teal-200 dark:border-violet-500/30 hover:brightness-105"
                >
                  Notes
                </Link>
                <Link
                  href="/lectures"
                  className="px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-red-950 text-indigo-800 dark:text-red-300 border border-indigo-200 dark:border-red-500/30 hover:brightness-105"
                >
                  Lectures
                </Link>
              </div>
            </div>
          </aside>

          {/* Floating Pill Button to Re-Open Secondary Explorer when Hidden (disabled on syllabus & studio pages where native navigation is present) */}
          {!isExplorerOpen && currentTab !== 'syllabus' && !pathname.startsWith('/syllabus') && currentTab !== 'notes' && currentTab !== 'lectures' && currentTab !== 'study' && !pathname.startsWith('/notes') && !pathname.startsWith('/lectures') && !pathname.startsWith('/learn') && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -10 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="button"
              onClick={() => setIsExplorerOpen(true)}
              className={`fixed top-16 md:top-4 z-40 px-3.5 py-2 rounded-full bg-white dark:bg-[#080d22]/95 border border-slate-200 dark:border-cyan-500/40 text-slate-800 dark:text-cyan-300 hover:text-teal-700 dark:hover:text-white shadow-lg hover:shadow-xl shadow-slate-900/10 dark:shadow-cyan-950/50 backdrop-blur-xl flex items-center space-x-2 text-xs font-bold transition-all cursor-pointer select-none ${
                isPrimaryCollapsed ? 'left-3 md:left-[84px]' : 'left-3 md:left-72'
              }`}
              title="Open Subject & Unit Explorer"
            >
              <span className="text-sm">📂</span>
              <span>
                {lang === 'en' ? 'Change Subject / Topic' : 'विषय / टॉपिक बदलें'}
              </span>
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono bg-teal-100 dark:bg-cyan-950 text-teal-800 dark:text-cyan-300 font-bold border border-teal-200 dark:border-cyan-500/30">
                Units
              </span>
            </motion.button>
          )}
        </>
      )}

      {/* ================================================================== */}
      {/* 3. MOBILE BOTTOM DOCK (QUICK ACCESSIBILITY + LIVE CURRENT AFFAIRS) */}
      {/* ================================================================== */}
      <nav
        aria-label="Mobile Bottom Navigation Dock"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 px-2 py-1.5 bg-white/95 dark:bg-[#080d22]/95 backdrop-blur-2xl border-t border-slate-200/90 dark:border-white/10 shadow-[0_-4px_25px_rgba(0,0,0,0.15)] flex items-center justify-around"
      >
        {/* Dashboard */}
        <Link
          href={loggedIn ? '/dashboard' : '/auth?mode=signin&redirect=/dashboard'}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
            currentTab === 'dashboard'
              ? 'text-cyan-600 dark:text-cyan-400 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <LayoutDashboard className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono leading-none">Home</span>
        </Link>

        {/* Notes Studio */}
        <Link
          href="/notes"
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
            currentTab === 'notes' || pathname.startsWith('/notes')
              ? 'text-violet-600 dark:text-violet-400 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <BookOpenCheck className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono leading-none">Notes</span>
        </Link>

        {/* 📰 Current Affairs (Elevated Center Button with LIVE Badge) */}
        <Link
          href="/current-affairs"
          className={`relative flex flex-col items-center justify-center -mt-4 px-3.5 py-1.5 rounded-2xl transition-all shadow-lg cursor-pointer ${
            currentTab === 'current-affairs' || pathname.startsWith('/current-affairs')
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-emerald-500/40 ring-2 ring-emerald-300 scale-105'
              : 'bg-emerald-950/90 dark:bg-emerald-950/90 light:bg-emerald-600 text-emerald-200 border border-emerald-500/50 shadow-emerald-950/50'
          }`}
          title="Current Affairs Hub (LIVE)"
        >
          <span className="absolute -top-2 -right-1 px-1.5 py-0.2 rounded-full text-[7px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-sm animate-pulse">
            LIVE
          </span>
          <Newspaper className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-extrabold leading-none tracking-tight">Affairs</span>
        </Link>

        {/* Lectures Studio */}
        <Link
          href="/lectures"
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
            currentTab === 'lectures' || pathname.startsWith('/lectures') || pathname.startsWith('/learn')
              ? 'text-red-600 dark:text-red-400 font-bold scale-105'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Tv className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono leading-none">Lectures</span>
        </Link>

        {/* Menu / Drawer Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
            isMobileMenuOpen
              ? 'text-cyan-600 dark:text-cyan-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Menu className="w-4 h-4 mb-0.5" />
          <span className="text-[9px] font-mono leading-none">Menu</span>
        </button>
      </nav>
    </>
  );
}
