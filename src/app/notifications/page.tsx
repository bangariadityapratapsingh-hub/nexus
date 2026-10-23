'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Filter,
  Calendar,
  ExternalLink,
  Download,
  FileText,
  Building2,
  RefreshCw,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  X,
  CheckCircle2,
} from 'lucide-react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import NotificationModal from '@/components/NotificationModal';
import {
  UniversityNotification,
  NotificationCategory,
  NotificationApiResponse,
} from '@/types/notification';
import { FALLBACK_NOTIFICATIONS } from '@/data/fallbackNotifications';
import { getStudentProfile } from '@/lib/studentProfile';
import { LanguageType } from '@/lib/types';
import { useSidebarState } from '@/lib/sidebarState';

export default function NotificationsPage() {
  const { isCollapsed } = useSidebarState();
  const [lang, setLang] = useState<LanguageType>('en');
  const [notifications, setNotifications] = useState<UniversityNotification[]>(
    FALLBACK_NOTIFICATIONS
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [source, setSource] = useState<'live' | 'cache' | 'fallback'>('live');
  const [selectedNotice, setSelectedNotice] =
    useState<UniversityNotification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Sync user language preference from profile
  useEffect(() => {
    const profile = getStudentProfile();
    if (profile?.preferredMedium) {
      setLang(profile.preferredMedium);
    }
  }, []);

  const fetchNotices = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data: NotificationApiResponse = await res.json();
        if (Array.isArray(data.notifications) && data.notifications.length > 0) {
          setNotifications(data.notifications);
          setSource(data.source);
          setLastUpdated(data.lastUpdated);
        }
      }
    } catch (err) {
      console.warn('Using local fallback notices:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  // Filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter((item) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.date.includes(q) ||
        item.summaryEn.toLowerCase().includes(q) ||
        (item.officialRef && item.officialRef.toLowerCase().includes(q));

      return matchesCategory && matchesQuery;
    });
  }, [notifications, selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: notifications.length,
      exams: notifications.filter((n) => n.category === 'exams').length,
      results: notifications.filter((n) => n.category === 'results').length,
      circulars: notifications.filter((n) => n.category === 'circulars').length,
      calendar: notifications.filter((n) => n.category === 'calendar').length,
    };
  }, [notifications]);

  const categories = [
    {
      id: 'all',
      labelEn: 'All Updates',
      labelHi: 'सभी सूचनाएं',
      icon: '🌐',
      count: categoryCounts.all,
    },
    {
      id: 'exams',
      labelEn: 'Exams & Datesheets',
      labelHi: 'परीक्षा एवं समय सारणी',
      icon: '📝',
      count: categoryCounts.exams,
    },
    {
      id: 'results',
      labelEn: 'Results & Marks',
      labelHi: 'परिणाम एवं अंकतालिका',
      icon: '📊',
      count: categoryCounts.results,
    },
    {
      id: 'circulars',
      labelEn: 'General Circulars',
      labelHi: 'सामान्य परिपत्र',
      icon: '🏛️',
      count: categoryCounts.circulars,
    },
    {
      id: 'calendar',
      labelEn: 'Academic Calendar',
      labelHi: 'शैक्षणिक कैलेंडर',
      icon: '📅',
      count: categoryCounts.calendar,
    },
  ];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Starry Mesh */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[950px] h-[400px] bg-gradient-to-b from-cyan-600/10 via-violet-600/10 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* Dual Left Slide-Bars Navigation */}
      <FloatingNav lang={lang} setLang={setLang} />

      {/* Main Container - dynamically offsets for sidebar and expands to full portion when closed */}
      <div className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-20 relative z-10 ${isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'}`}>
        <main className={`transition-all duration-300 ease-in-out mx-auto px-4 sm:px-6 w-full space-y-6 ${isCollapsed ? 'max-w-[1720px] lg:px-8 xl:px-10' : 'max-w-7xl lg:px-8'}`}>
        {/* ================================================================== */}
        {/* TOP HERO BANNER                                                    */}
        {/* ================================================================== */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0d1330] via-[#090d24] to-[#12183a] shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-rose-950/90 text-rose-300 border border-rose-500/50 text-[10px] font-mono font-bold flex items-center space-x-1.5 shadow-sm shadow-rose-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
                  </span>
                  <span>LIVE UNIVERSITY SCRAPER</span>
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono">
                  Official Portal • sdsuv.ac.in
                </span>

                <span className="px-2.5 py-0.5 rounded-full bg-white/5 text-slate-400 border border-white/10 text-[10px] font-mono">
                  Auto-Cached (1 Hr)
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center space-x-2.5">
                <Bell className="w-7 h-7 sm:w-9 sm:h-9 text-cyan-400" />
                <span>
                  {lang === 'en'
                    ? '🔔 SDSUV University Notification Hub'
                    : '🔔 श्री देव सुमन विश्वविद्यालय अधिसूचना केंद्र'}
                </span>
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
                {lang === 'en'
                  ? 'Real-time circulars, examination schedules, back-paper datesheets, and result announcements scraped directly from Sri Dev Suman Uttarakhand University.'
                  : 'श्री देव सुमन उत्तराखंड विश्वविद्यालय के आधिकारिक पोर्टल से सीधे अद्यतन परीक्षा समय-सारणी, परिणाम, बैक पेपर एवं महत्वपूर्ण अधिसूचनाएं।'}
              </p>
            </div>

            {/* Quick Refresh Button & Live Stats */}
            <div className="flex items-center space-x-3 shrink-0">
              <button
                type="button"
                onClick={fetchNotices}
                disabled={isLoading}
                className="px-4 py-2.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition-all flex items-center space-x-2 shadow-sm disabled:opacity-50"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`}
                />
                <span>{isLoading ? 'Updating...' : 'Check For New Notices'}</span>
              </button>

              <a
                href="https://www.sdsuv.ac.in/notices"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-200 text-xs font-bold transition-all flex items-center space-x-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Official Site</span>
              </a>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* SEARCH BAR & CATEGORY TABS                                         */}
        {/* ================================================================== */}
        <div className="space-y-3">
          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                lang === 'en'
                  ? 'Search by keyword (e.g. Back Exam, Date Sheet, Result, B.A., B.Sc., Admit Card)...'
                  : 'कीवर्ड द्वारा खोजें (जैसे बैक पेपर, परीक्षा तिथि, परिणाम, बीए, बीएससी)...'
              }
              className="w-full pl-11 pr-10 py-3 rounded-2xl bg-black/50 border border-white/10 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-2 shrink-0 ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/25 scale-[1.02]'
                      : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/10'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{lang === 'en' ? cat.labelEn : cat.labelHi}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                      isActive
                        ? 'bg-black/30 text-slate-950 font-black'
                        : 'bg-black/50 text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ================================================================== */}
        {/* NOTIFICATIONS LIST                                                 */}
        {/* ================================================================== */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-1">
            <span>
              Showing {filteredNotifications.length} of {notifications.length} official notices
            </span>
            {lastUpdated && (
              <span className="hidden sm:inline">
                Synced: {new Date(lastUpdated).toLocaleDateString()}
              </span>
            )}
          </div>

          {filteredNotifications.length === 0 ? (
            <div className="rounded-2xl glass-panel p-12 text-center border border-white/10 bg-black/30 space-y-3">
              <Bell className="w-10 h-10 text-slate-500 mx-auto" />
              <h3 className="text-base font-bold text-white">
                No matching notifications found
              </h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try clearing your search query or selecting a different category tab.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-bold"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {filteredNotifications.map((notice, idx) => {
                const isPdf = Boolean(
                  notice.pdfUrl ||
                    notice.link.toLowerCase().endsWith('.pdf') ||
                    notice.link.includes('assets.sdsuv.ac.in')
                );

                return (
                  <motion.div
                    key={notice.id || idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: Math.min(idx * 0.03, 0.3) }}
                    onClick={() => {
                      setSelectedNotice(notice);
                      setIsModalOpen(true);
                    }}
                    className="rounded-2xl glass-panel p-4 sm:p-5 border border-white/10 bg-[#090e24]/80 hover:bg-[#0c1435] transition-all cursor-pointer group shadow-lg hover:shadow-cyan-950/40 hover:border-cyan-500/40 relative overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                      {/* Left: Metadata & Title */}
                      <div className="space-y-2 flex-1 min-w-0">
                        {/* Badges */}
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 flex items-center space-x-1">
                            <span>{notice.categoryIcon}</span>
                            <span>
                              {lang === 'en'
                                ? notice.categoryLabelEn
                                : notice.categoryLabelHi}
                            </span>
                          </span>

                          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10 flex items-center space-x-1">
                            <Calendar className="w-3 h-3 text-cyan-400" />
                            <span>{notice.date}</span>
                          </span>

                          {notice.isNew && (
                            <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-500/50 animate-pulse">
                              New
                            </span>
                          )}

                          {notice.fileSize && (
                            <span className="px-1.5 py-0.2 rounded text-[10px] font-mono text-slate-500">
                              PDF ({notice.fileSize})
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                          {notice.title}
                        </h3>

                        {/* Summary Excerpt */}
                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {lang === 'en' ? notice.summaryEn : notice.summaryHi}
                        </p>
                      </div>

                      {/* Right: Quick Action Buttons */}
                      <div
                        className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedNotice(notice);
                            setIsModalOpen(true);
                          }}
                          className="px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-bold transition-all flex items-center space-x-1.5 group-hover:bg-cyan-500 group-hover:text-slate-950"
                        >
                          <span>Read Full Notice</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>

                        <a
                          href={notice.pdfUrl || notice.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-mono transition-all flex items-center space-x-1.5"
                          title="Open Original Circular"
                        >
                          {isPdf ? (
                            <>
                              <Download className="w-3 h-3 text-cyan-400" />
                              <span>PDF</span>
                            </>
                          ) : (
                            <>
                              <ExternalLink className="w-3 h-3 text-cyan-400" />
                              <span>Portal</span>
                            </>
                          )}
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

      <Footer />

      {/* Interactive Notice Modal Viewer */}
      <NotificationModal
        notice={selectedNotice}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang}
      />
    </div>
  );
}
