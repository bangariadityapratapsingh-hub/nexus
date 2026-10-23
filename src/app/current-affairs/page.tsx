'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Newspaper,
  Globe,
  Landmark,
  Building2,
  TrendingUp,
  GraduationCap,
  Scale,
  Rocket,
  Trees,
  Search,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Sparkles,
  Share2,
  Check,
  CheckCircle2,
  Calendar,
  X,
  Filter,
  ArrowUpRight,
  ShieldCheck,
  Clock,
  ChevronRight,
} from 'lucide-react';
import FloatingNav from '@/components/FloatingNav';
import { LanguageType } from '@/lib/types';
import { useSidebarState } from '@/lib/sidebarState';
import {
  CurrentAffairsItem,
  NewsCategory,
  NewsLanguage,
  NewsScope,
  SCOPE_TABS,
  CATEGORIES,
} from '@/data/currentAffairsData';

// Channel branding color map
const CHANNEL_BADGES: Record<
  string,
  { bg: string; text: string; border: string; label: string }
> = {
  'The Indian Express': {
    bg: 'bg-rose-500/15 dark:bg-rose-950/60',
    text: 'text-rose-700 dark:text-rose-300',
    border: 'border-rose-400/30',
    label: 'Indian Express',
  },
  'BBC News': {
    bg: 'bg-red-500/15 dark:bg-red-950/60',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-400/30',
    label: 'BBC News',
  },
  'BBC Hindi': {
    bg: 'bg-red-500/15 dark:bg-red-950/60',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-400/30',
    label: 'BBC हिंदी',
  },
  'Hindustan Times': {
    bg: 'bg-sky-500/15 dark:bg-sky-950/60',
    text: 'text-sky-700 dark:text-sky-300',
    border: 'border-sky-400/30',
    label: 'Hindustan Times',
  },
  'The Times of India': {
    bg: 'bg-blue-500/15 dark:bg-blue-950/60',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-400/30',
    label: 'Times of India',
  },
  'The Hindu': {
    bg: 'bg-amber-500/15 dark:bg-amber-950/60',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border-amber-400/30',
    label: 'The Hindu',
  },
  LiveMint: {
    bg: 'bg-orange-500/15 dark:bg-orange-950/60',
    text: 'text-orange-700 dark:text-orange-300',
    border: 'border-orange-400/30',
    label: 'LiveMint',
  },
  Reuters: {
    bg: 'bg-orange-600/15 dark:bg-orange-950/60',
    text: 'text-orange-800 dark:text-orange-300',
    border: 'border-orange-400/30',
    label: 'Reuters',
  },
  'Amar Ujala': {
    bg: 'bg-red-500/15 dark:bg-red-950/60',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-400/30',
    label: 'अमर उजाला',
  },
  'अमर उजाला (Amar Ujala)': {
    bg: 'bg-red-500/15 dark:bg-red-950/60',
    text: 'text-red-700 dark:text-red-300',
    border: 'border-red-400/30',
    label: 'अमर उजाला',
  },
  'दैनिक जागरण (Dainik Jagran)': {
    bg: 'bg-amber-500/15 dark:bg-amber-950/60',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border-amber-400/30',
    label: 'दैनिक जागरण',
  },
  Jagran: {
    bg: 'bg-amber-500/15 dark:bg-amber-950/60',
    text: 'text-amber-800 dark:text-amber-300',
    border: 'border-amber-400/30',
    label: 'दैनिक जागरण',
  },
  'लाइव हिंदुस्तान (LiveHindustan)': {
    bg: 'bg-cyan-500/15 dark:bg-cyan-950/60',
    text: 'text-cyan-800 dark:text-cyan-300',
    border: 'border-cyan-400/30',
    label: 'लाइव हिंदुस्तान',
  },
  LiveHindustan: {
    bg: 'bg-cyan-500/15 dark:bg-cyan-950/60',
    text: 'text-cyan-800 dark:text-cyan-300',
    border: 'border-cyan-400/30',
    label: 'लाइव हिंदुस्तान',
  },
  'जनसत्ता (Jansatta)': {
    bg: 'bg-purple-500/15 dark:bg-purple-950/60',
    text: 'text-purple-800 dark:text-purple-300',
    border: 'border-purple-400/30',
    label: 'जनसत्ता',
  },
  Jansatta: {
    bg: 'bg-purple-500/15 dark:bg-purple-950/60',
    text: 'text-purple-800 dark:text-purple-300',
    border: 'border-purple-400/30',
    label: 'जनसत्ता',
  },
  'नवभारत टाइम्स (Navbharat Times)': {
    bg: 'bg-teal-500/15 dark:bg-teal-950/60',
    text: 'text-teal-800 dark:text-teal-300',
    border: 'border-teal-400/30',
    label: 'नवभारत टाइम्स',
  },
  'Navbharat Times': {
    bg: 'bg-teal-500/15 dark:bg-teal-950/60',
    text: 'text-teal-800 dark:text-teal-300',
    border: 'border-teal-400/30',
    label: 'नवभारत टाइम्स',
  },
};

function getChannelBadge(sourceName: string) {
  // Check exact or partial match
  for (const [key, badge] of Object.entries(CHANNEL_BADGES)) {
    if (sourceName.toLowerCase().includes(key.toLowerCase())) {
      return badge;
    }
  }
  return {
    bg: 'bg-emerald-500/15 dark:bg-emerald-950/60',
    text: 'text-emerald-700 dark:text-emerald-300',
    border: 'border-emerald-400/30',
    label: sourceName.split(' ')[0] || 'Verified Source',
  };
}

export default function CurrentAffairsPage() {
  // Global Medium for navigation shell
  const [globalLang, setGlobalLang] = useState<LanguageType>('en');

  // Independent Current Affairs Language Selector (Decoupled from Global Medium)
  const [readingLang, setReadingLang] = useState<NewsLanguage>('en');

  // Step 1: Select Scope (International, National, Uttarakhand)
  const [selectedScope, setSelectedScope] = useState<NewsScope>('uttarakhand');

  // Step 2: Select Category Filter
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('all');

  // Data states
  const [newsItems, setNewsItems] = useState<CurrentAffairsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Reader Modal State
  const [activeItemForModal, setActiveItemForModal] =
    useState<CurrentAffairsItem | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Synchronized Left Sidebar layout - auto-collapse for distraction-free reading
  const { isCollapsed, setIsCollapsed } = useSidebarState();

  useEffect(() => {
    setIsCollapsed(true);
  }, [setIsCollapsed]);

  // Load preferred reading language from localStorage if available
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sdsuv_ca_reading_lang');
      if (stored === 'en' || stored === 'hi') {
        setReadingLang(stored as NewsLanguage);
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  const handleReadingLangChange = (newLang: NewsLanguage) => {
    setReadingLang(newLang);
    try {
      localStorage.setItem('sdsuv_ca_reading_lang', newLang);
    } catch {
      // safe fallback
    }
  };

  // Fetch News from API
  const fetchCurrentAffairs = useCallback(
    async (forceRefresh = false) => {
      if (forceRefresh) {
        setIsRefreshing(true);
      } else {
        setIsLoading(true);
      }

      try {
        const queryParams = new URLSearchParams({
          scope: selectedScope,
          category: selectedCategory,
          lang: readingLang,
          ...(forceRefresh ? { refresh: 'true' } : {}),
        });

        const res = await fetch(`/api/current-affairs?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (data.items && Array.isArray(data.items)) {
            setNewsItems(data.items);
            setLastUpdated(data.updatedAt || new Date().toISOString());
          }
        }
      } catch (err) {
        console.error('Failed to fetch current affairs:', err);
      } finally {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    },
    [selectedScope, selectedCategory, readingLang]
  );

  useEffect(() => {
    fetchCurrentAffairs();
  }, [fetchCurrentAffairs]);

  // Client-side search filtering
  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) return newsItems;
    const q = searchQuery.toLowerCase().trim();
    return newsItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.sourceName.toLowerCase().includes(q) ||
        item.examRelevance.toLowerCase().includes(q) ||
        item.tags?.some((t) => t.toLowerCase().includes(q))
    );
  }, [newsItems, searchQuery]);

  const handleCopyShare = (item: CurrentAffairsItem) => {
    const textToCopy = `${item.title}\n\n${item.summary}\n\n${item.examRelevance}\n\nRead more on APSB Nexus Current Affairs Hub.`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const formatRelativeTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      const diffDays = Math.floor(diffHours / 24);

      if (readingLang === 'hi') {
        if (diffHours < 1) return 'अभी-अभी';
        if (diffHours < 24) return `${diffHours} घंटे पहले`;
        if (diffDays === 1) return 'कल';
        return `${diffDays} दिन पहले`;
      }

      if (diffHours < 1) return 'Just now';
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays === 1) return 'Yesterday';
      return `${diffDays}d ago`;
    } catch {
      return readingLang === 'hi' ? 'हाल ही में' : 'Recent';
    }
  };

  const getCategoryIcon = (catId: NewsCategory) => {
    switch (catId) {
      case 'political':
        return Landmark;
      case 'economic':
        return TrendingUp;
      case 'educational':
        return GraduationCap;
      case 'law':
        return Scale;
      case 'technology':
        return Rocket;
      case 'environment':
        return Trees;
      case 'all':
      default:
        return Sparkles;
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F8F5] text-slate-900 dark:bg-[#070913] dark:text-slate-100 himalayan-mesh-bg relative flex flex-col justify-between selection:bg-emerald-500 selection:text-white transition-colors duration-200">
      {/* Background Starry Mesh & Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-25 z-0" />
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-emerald-600/15 via-teal-600/10 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* Global Navigation Shell */}
      <FloatingNav
        currentTab="current-affairs"
        lang={globalLang}
        setLang={setGlobalLang}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 transition-all duration-300 pt-20 md:pt-8 pb-28 md:pb-16 px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full relative z-10 ${
          isCollapsed ? 'md:pl-24' : 'md:pl-72'
        }`}
      >
        {/* ================================================================== */}
        {/* HEADER BAR: TITLE + INDEPENDENT LANGUAGE SELECTOR                 */}
        {/* ================================================================== */}
        <header className="mb-6 p-4 sm:p-6 rounded-3xl bg-white/90 dark:bg-[#0c1228]/80 border border-slate-200/90 dark:border-white/10 shadow-xl backdrop-blur-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Left: Branding & Subtitle */}
            <div className="space-y-1">
              <div className="flex items-center space-x-2.5">
                <span className="p-2 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
                  <Newspaper className="w-5 h-5" />
                </span>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {readingLang === 'hi'
                    ? 'समसामयिकी केंद्र (Current Affairs Hub)'
                    : 'Current Affairs Hub'}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-md shadow-rose-500/30 flex items-center space-x-1 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white" />
                  <span>LIVE</span>
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
                {readingLang === 'hi'
                  ? 'एसडीएसयूवी बीए, यूकेपीएससी एवं प्रतियोगी परीक्षाओं हेतु विश्वसनीय दैनिक समाचार एवं पाठ्यक्रम विश्लेषण'
                  : 'Daily trusted news digests, policy updates & syllabus-linked takeaways for SDSUV BA & UKPSC aspirants'}
              </p>
            </div>

            {/* Right: Prominent Independent Reading Language Selector */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="p-1 rounded-2xl bg-slate-100 dark:bg-black/50 border border-slate-300 dark:border-white/10 flex items-center shadow-inner">
                <div className="px-2.5 text-[11px] font-bold text-slate-500 dark:text-slate-400 font-mono hidden sm:block">
                  Language:
                </div>
                <button
                  type="button"
                  onClick={() => handleReadingLangChange('en')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    readingLang === 'en'
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/30 scale-102'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                  title="Read headlines and summaries in English"
                >
                  <span>🇬🇧</span>
                  <span>Read in English</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleReadingLangChange('hi')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                    readingLang === 'hi'
                      ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/30 scale-102'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white'
                  }`}
                  title="सभी समाचार एवं परीक्षा विश्लेषण हिंदी में पढ़ें"
                >
                  <span>🇮🇳</span>
                  <span>हिंदी में पढ़ें (Hindi)</span>
                </button>
              </div>

              {/* Live Refresh Button */}
              <button
                type="button"
                onClick={() => fetchCurrentAffairs(true)}
                disabled={isRefreshing}
                className="px-3.5 py-2 rounded-2xl bg-white dark:bg-white/[0.06] hover:bg-slate-100 dark:hover:bg-white/[0.12] border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold transition-all shadow-sm flex items-center justify-center space-x-2 disabled:opacity-60 cursor-pointer"
                title="Refresh Live Feeds"
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 ${
                    isRefreshing ? 'animate-spin' : ''
                  }`}
                />
                <span className="hidden sm:inline">
                  {readingLang === 'hi' ? 'लाइव रिफ्रेश' : 'Refresh Feeds'}
                </span>
              </button>
            </div>
          </div>

          {/* Live Status Ticker */}
          <div className="mt-4 pt-3 border-t border-slate-200/80 dark:border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {readingLang === 'hi'
                  ? 'लाइव सत्यापित समाचार चैनल सक्रिय'
                  : 'Live Verified News Channels Active'}
              </span>
              <span>•</span>
              <span>
                {readingLang === 'hi'
                  ? '15 मिनट सर्वर कैशिंग सुरक्षित'
                  : '15m Smart Server Cache'}
              </span>
            </div>
            {lastUpdated && (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3 text-slate-400" />
                <span>
                  {readingLang === 'hi' ? 'अपडेट:' : 'Sync:'}{' '}
                  {new Date(lastUpdated).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* ================================================================== */}
        {/* STEP 1: SELECT SCOPE (3 LARGE INTERACTIVE TABS)                    */}
        {/* ================================================================== */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs flex items-center justify-center font-mono">
                1
              </span>
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-300">
                {readingLang === 'hi'
                  ? 'क्षेत्र चुनें (Select Scope)'
                  : 'Select Region Scope'}
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              {readingLang === 'hi' ? '3 भौगोलिक स्तर' : '3 Geographic Tiers'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {SCOPE_TABS.map((tab) => {
              const isSelected = selectedScope === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedScope(tab.id)}
                  className={`p-4 rounded-3xl text-left transition-all duration-200 relative overflow-hidden border cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-transparent dark:from-emerald-950/70 dark:via-teal-950/50 dark:to-[#080d22]/90 border-emerald-500/50 shadow-lg shadow-emerald-500/10 dark:shadow-emerald-950/40 ring-1 ring-emerald-500/40 scale-[1.01]'
                      : 'bg-white/80 dark:bg-[#0c1228]/60 hover:bg-white dark:hover:bg-[#0c1228]/90 border-slate-200/90 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <span className="text-2xl sm:text-3xl mb-2 block">{tab.icon}</span>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-black uppercase bg-emerald-500 text-white font-mono shadow-sm">
                        ACTIVE
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-black text-sm sm:text-base ${
                      isSelected
                        ? 'text-emerald-700 dark:text-emerald-300'
                        : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    {readingLang === 'hi' ? tab.labelHi : tab.labelEn}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {readingLang === 'hi' ? tab.descHi : tab.descEn}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================================================================== */}
        {/* STEP 2: SELECT CATEGORY (INTERACTIVE FILTER PILLS)                */}
        {/* ================================================================== */}
        <section className="mb-6 p-4 rounded-3xl bg-white/80 dark:bg-[#0c1228]/60 border border-slate-200/90 dark:border-white/10 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-5 h-5 rounded-full bg-teal-500/20 text-teal-600 dark:text-teal-400 font-bold text-xs flex items-center justify-center font-mono">
                2
              </span>
              <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-800 dark:text-slate-300">
                {readingLang === 'hi'
                  ? 'विषय श्रेणी फ़िल्टर (Category Filter)'
                  : 'Select Subject Category'}
              </h2>
            </div>

            {/* Quick Search Bar */}
            <div className="relative max-w-xs w-full">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  readingLang === 'hi'
                    ? 'शीर्षक या विषय खोजें...'
                    : 'Search headlines, topics...'
                }
                className="w-full pl-8 pr-7 py-1.5 rounded-xl bg-slate-100 dark:bg-black/50 border border-slate-300 dark:border-white/10 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              const Icon = getCategoryIcon(cat.id);
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap flex items-center space-x-1.5 cursor-pointer shrink-0 ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 ring-1 ring-emerald-400 scale-102'
                      : 'bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/[0.08] hover:text-slate-950 dark:hover:text-white'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{readingLang === 'hi' ? cat.labelHi : cat.labelEn}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ================================================================== */}
        {/* CURRENT AFFAIRS FEED GRID                                          */}
        {/* ================================================================== */}
        <section>
          {/* Feed Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2 text-xs font-mono text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                {filteredItems.length}{' '}
                {readingLang === 'hi' ? 'समाचार लेख' : 'Verified Reports'}
              </span>
              <span>•</span>
              <span className="capitalize">
                {selectedScope} •{' '}
                {selectedCategory === 'all'
                  ? readingLang === 'hi'
                    ? 'सभी श्रेणियां'
                    : 'All Categories'
                  : selectedCategory}
              </span>
            </div>
          </div>

          {/* Loading Skeleton */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className="p-5 rounded-3xl bg-white/70 dark:bg-[#0c1228]/50 border border-slate-200 dark:border-white/10 animate-pulse space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-24 h-5 rounded-full bg-slate-200 dark:bg-white/10" />
                    <div className="w-16 h-4 rounded-full bg-slate-200 dark:bg-white/10" />
                  </div>
                  <div className="w-full h-5 rounded bg-slate-200 dark:bg-white/10" />
                  <div className="w-4/5 h-4 rounded bg-slate-200 dark:bg-white/10" />
                  <div className="w-full h-16 rounded-2xl bg-slate-100 dark:bg-white/5" />
                </div>
              ))}
            </div>
          ) : filteredItems.length === 0 ? (
            /* Empty State */
            <div className="p-12 text-center rounded-3xl bg-white/80 dark:bg-[#0c1228]/60 border border-slate-200 dark:border-white/10 space-y-3">
              <Newspaper className="w-12 h-12 text-slate-400 mx-auto" />
              <h3 className="text-base font-bold text-slate-800 dark:text-white">
                {readingLang === 'hi'
                  ? 'कोई समाचार नहीं मिला'
                  : 'No Updates Found'}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                {readingLang === 'hi'
                  ? 'कृपया दूसरा फ़िल्टर चुनें या लाइव फ़ीड को रिफ़्रेश करें।'
                  : 'Try adjusting your search keywords or switch category filter.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold shadow-md hover:bg-emerald-500 transition-colors"
              >
                {readingLang === 'hi' ? 'फ़िल्टर हटाएं' : 'Reset Filters'}
              </button>
            </div>
          ) : (
            /* Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const badge = getChannelBadge(item.sourceName);
                return (
                  <article
                    key={item.id}
                    className="p-5 rounded-3xl bg-white dark:bg-[#0c1228]/70 border border-slate-200/90 dark:border-white/10 shadow-md hover:shadow-xl dark:hover:border-emerald-500/40 hover:border-emerald-400/50 transition-all flex flex-col justify-between group backdrop-blur-xl"
                  >
                    <div>
                      {/* Top Bar: Channel Badge + Scope/Category Tag + Relative Time */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <div className="flex items-center space-x-2 min-w-0">
                          {/* Channel Badge */}
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border flex items-center space-x-1 shrink-0 ${badge.bg} ${badge.text} ${badge.border}`}
                          >
                            <ShieldCheck className="w-3 h-3" />
                            <span>{badge.label}</span>
                          </span>

                          {/* Scope • Category Tag */}
                          <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 truncate">
                            {item.scope.toUpperCase()} • {item.category.toUpperCase()}
                          </span>
                        </div>

                        {/* Relative Publication Time */}
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 shrink-0">
                          {formatRelativeTime(item.publishedAt)}
                        </span>
                      </div>

                      {/* Headline */}
                      <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-snug group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors mb-2 line-clamp-2">
                        {item.title}
                      </h3>

                      {/* Concise Digest */}
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3.5 line-clamp-3">
                        {item.summary}
                      </p>

                      {/* Exam Connect Box */}
                      <div className="p-3 rounded-2xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-300/60 dark:border-emerald-500/30 mb-4">
                        <div className="flex items-start space-x-2">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <div className="text-[11px] leading-relaxed">
                            <span className="font-black text-emerald-800 dark:text-emerald-300 block mb-0.5">
                              {readingLang === 'hi'
                                ? '📌 परीक्षा उपयोगिता (SDSUV BA / UKPSC / UPSC):'
                                : '📌 Exam Relevance (BA / UKPSC / UPSC):'}
                            </span>
                            <span className="text-emerald-950 dark:text-emerald-200">
                              {item.examRelevance.replace(/^📌[^\:]+\:\s*/, '')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Actions: Read Full Digest & Read on Publisher */}
                    <div className="pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveItemForModal(item)}
                        className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center space-x-1.5 transition-all cursor-pointer"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>
                          {readingLang === 'hi' ? 'पूर्ण विवरण पढ़ें' : 'Read Full Digest'}
                        </span>
                      </button>

                      <div className="flex items-center space-x-1">
                        <button
                          type="button"
                          onClick={() => handleCopyShare(item)}
                          className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                          title="Copy summary & takeaway"
                        >
                          {copiedId === item.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500" />
                          ) : (
                            <Share2 className="w-3.5 h-3.5" />
                          )}
                        </button>

                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 text-xs font-bold flex items-center space-x-1 transition-colors"
                          title={`Read original article on ${item.sourceName}`}
                        >
                          <span className="truncate max-w-[100px]">
                            {item.sourceName.split(' ')[0]}
                          </span>
                          <ArrowUpRight className="w-3 h-3 text-slate-400" />
                        </a>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      {/* ================================================================== */}
      {/* DISTRACTION-FREE IN-APP READER MODAL                               */}
      {/* ================================================================== */}
      <AnimatePresence>
        {activeItemForModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveItemForModal(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl bg-white dark:bg-[#080d22] border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-10"
            >
              {/* Header */}
              <div className="p-5 border-b border-slate-200 dark:border-white/10 flex items-start justify-between gap-4 bg-slate-50 dark:bg-black/30">
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30">
                      {activeItemForModal.sourceName}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {new Date(activeItemForModal.publishedAt).toLocaleDateString([], {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-snug">
                    {activeItemForModal.title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveItemForModal(null)}
                  className="p-2 rounded-xl bg-slate-200/60 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 text-slate-600 dark:text-slate-300 transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Scrollable Modal Body */}
              <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-200 scrollbar-thin">
                {/* Exam Connect Highlight Box */}
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-500/40 space-y-1.5">
                  <div className="flex items-center space-x-2">
                    <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-extrabold text-xs uppercase tracking-wider text-emerald-800 dark:text-emerald-300">
                      {readingLang === 'hi'
                        ? 'अकादमिक एवं परीक्षा विश्लेषण'
                        : 'Syllabus & Exam Relevance'}
                    </span>
                  </div>
                  <p className="text-xs text-emerald-950 dark:text-emerald-100 font-medium leading-relaxed">
                    {activeItemForModal.examRelevance}
                  </p>
                </div>

                {/* Formatted Full Digest */}
                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/5 space-y-3">
                  <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 font-mono">
                    {readingLang === 'hi' ? 'विस्तृत रिपोर्ट' : 'Executive Digest'}
                  </h4>
                  <div className="whitespace-pre-line space-y-2">
                    {activeItemForModal.fullDigest || activeItemForModal.summary}
                  </div>
                </div>

                {/* Tags */}
                {activeItemForModal.tags && activeItemForModal.tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-1.5 pt-2">
                    {activeItemForModal.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-mono bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/30 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={() => handleCopyShare(activeItemForModal)}
                  className="px-3.5 py-2 rounded-xl bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-white/20 transition-all flex items-center space-x-1.5"
                >
                  {copiedId === activeItemForModal.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{readingLang === 'hi' ? 'कॉपी हो गया' : 'Copied!'}</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>{readingLang === 'hi' ? 'शेयर करें' : 'Share Notes'}</span>
                    </>
                  )}
                </button>

                <a
                  href={activeItemForModal.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-600/30 flex items-center space-x-1.5 transition-all"
                >
                  <span>
                    {readingLang === 'hi'
                      ? `मूल लेख (${activeItemForModal.sourceName}) पर पढ़ें`
                      : `Read on ${activeItemForModal.sourceName}`}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
