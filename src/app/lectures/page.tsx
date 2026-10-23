'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tv,
  Play,
  BookOpen,
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Star,
  ThumbsUp,
  Clock,
  Sparkles,
  ShieldCheck,
  Award,
  ChevronRight,
  RotateCcw,
  CheckCircle2,
  Filter,
  Maximize2,
  RefreshCw,
  Search,
  Layers,
  Calendar,
  Archive,
} from 'lucide-react';
import FloatingNav from '@/components/FloatingNav';
import { LanguageType } from '@/lib/types';
import { getStudentProfile, resolveSubjectCanonicalKey, filterToSelectedSubjects, StudentProfile } from '@/lib/studentProfile';
import { useSidebarState } from '@/lib/sidebarState';
import {
  EXPLORER_SUBJECTS,
  findExplorerTopic,
  getTopEducatorVideosForTopic,
  EducatorVideoItem,
  ExplorerSubject,
  ExplorerUnit,
  ExplorerTopic,
} from '@/data/subjectExplorerData';
import { fetchLectureRating, submitLectureRating } from '@/lib/supabase';

function LectureStudioContent() {
  const { isCollapsed } = useSidebarState();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [lang, setLang] = useState<LanguageType>('en');
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);

  // Load student profile
  useEffect(() => {
    const p = getStudentProfile();
    if (p) {
      setProfile(p);
      setLang(p.preferredMedium);
    }

    const handleProfile = (e: any) => {
      const updated = e.detail || getStudentProfile();
      if (updated) {
        setProfile(updated);
        setLang(updated.preferredMedium);
      }
    };
    window.addEventListener('sdsuv_profile_updated', handleProfile);
    return () => window.removeEventListener('sdsuv_profile_updated', handleProfile);
  }, []);

  const defaultSubject = useMemo(() => {
    if (profile?.selectedSubjects && profile.selectedSubjects.length > 0) {
      return resolveSubjectCanonicalKey(profile.selectedSubjects[0]) || 'geography';
    }
    return 'geography';
  }, [profile?.selectedSubjects]);

  // Read URL query params: subject, unit, topic
  const querySubject = searchParams.get('subject') || defaultSubject;
  const queryUnit = parseInt(searchParams.get('unit') || '1', 10) || 1;
  const queryTopic = searchParams.get('topic') || `${querySubject.slice(0, 3)}-1-1`;

  // Find active subject, unit, topic
  const { subject, unit, topic } = useMemo(() => {
    return findExplorerTopic(querySubject, queryUnit, queryTopic);
  }, [querySubject, queryUnit, queryTopic]);

  const hasDirectTopicOrUnit = !!(searchParams.get('topic') || searchParams.get('unit'));
  const [flowStep, setFlowStep] = useState<'subject' | 'unit' | 'player'>(
    hasDirectTopicOrUnit ? 'player' : 'subject'
  );
  const [selectedSubjectKey, setSelectedSubjectKey] = useState<string>(querySubject);
  const [subjectSearchQuery, setSubjectSearchQuery] = useState<string>('');

  useEffect(() => {
    if (searchParams.get('topic') || searchParams.get('unit')) {
      setFlowStep('player');
    }
  }, [searchParams]);

  const currentSubjectObj = useMemo(() => {
    return EXPLORER_SUBJECTS.find((s) => s.id === selectedSubjectKey) || subject;
  }, [selectedSubjectKey, subject]);

  const visibleLecturesSubjects = useMemo(() => {
    return filterToSelectedSubjects(
      EXPLORER_SUBJECTS,
      (s: ExplorerSubject) => s.id,
      profile?.selectedSubjects
    );
  }, [profile?.selectedSubjects]);

  useEffect(() => {
    if (visibleLecturesSubjects.length > 0 && !visibleLecturesSubjects.some((s: ExplorerSubject) => s.id === selectedSubjectKey)) {
      setSelectedSubjectKey(visibleLecturesSubjects[0].id);
    }
  }, [visibleLecturesSubjects, selectedSubjectKey]);

  const searchedExplorerSubjects = useMemo(() => {
    const baseList = visibleLecturesSubjects;
    if (!subjectSearchQuery.trim()) return baseList;
    const q = subjectSearchQuery.toLowerCase().trim();
    return baseList.filter(
      (s: ExplorerSubject) =>
        s.code.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.nameHi.toLowerCase().includes(q) ||
        s.paperTitleEn.toLowerCase().includes(q)
    );
  }, [visibleLecturesSubjects, subjectSearchQuery]);

  // Curated 8 Top Educator fallback videos for this topic
  const fallbackEducatorVideos: EducatorVideoItem[] = useMemo(() => {
    return getTopEducatorVideosForTopic(
      topic.titleEn,
      topic.titleHi,
      subject.nameEn,
      topic.youtubeId,
      subject.id
    );
  }, [topic, subject]);

  // Dynamic videos fetched live from /api/youtube-lectures
  const [dynamicVideos, setDynamicVideos] = useState<EducatorVideoItem[]>(fallbackEducatorVideos);
  const [isLoadingVideos, setIsLoadingVideos] = useState<boolean>(false);

  // Selected video inside main player
  const [selectedVideo, setSelectedVideo] = useState<EducatorVideoItem>(fallbackEducatorVideos[0]);
  const [isVideoPlaying, setIsVideoPlaying] = useState<boolean>(false);
  const [isIframeLoaded, setIsIframeLoaded] = useState<boolean>(false);

  // Real-time Cloud Rating from Supabase
  const [cloudRating, setCloudRating] = useState<number>(fallbackEducatorVideos[0]?.starRating || 4.9);
  const [cloudRatingCount, setCloudRatingCount] = useState<number>(fallbackEducatorVideos[0]?.ratingCount || 120);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isSubmittingRating, setIsSubmittingRating] = useState<boolean>(false);
  const [ratingToast, setRatingToast] = useState<string | null>(null);

  // Sync ratings with Supabase cloud when selected video changes
  useEffect(() => {
    if (!selectedVideo?.youtubeId) return;
    setCloudRating(selectedVideo.starRating || 4.9);
    setCloudRatingCount(selectedVideo.ratingCount || 120);

    try {
      const stored = localStorage.getItem(`lecture_rating_${selectedVideo.youtubeId}`);
      if (stored) {
        setUserRating(Number(stored));
      } else {
        setUserRating(null);
      }
    } catch (e) {}

    fetchLectureRating(selectedVideo.youtubeId).then((res) => {
      if (res && res.count > 0) {
        setCloudRating(res.averageRating);
        setCloudRatingCount(res.count);
      }
    });
  }, [selectedVideo?.youtubeId]);

  const handleRateVideo = async (videoIdOrStars: string | number, maybeStars?: number) => {
    let targetVid = selectedVideo?.youtubeId;
    let stars = 5;

    if (typeof videoIdOrStars === 'string') {
      targetVid = videoIdOrStars;
      stars = typeof maybeStars === 'number' ? maybeStars : 5;
    } else {
      stars = Number(videoIdOrStars);
    }

    if (!targetVid || isSubmittingRating) return;
    setIsSubmittingRating(true);

    if (targetVid === selectedVideo?.youtubeId) {
      setUserRating(stars);
    }

    setUserRatings((prev) => ({
      ...prev,
      [targetVid]: stars,
    }));

    try {
      localStorage.setItem(`lecture_rating_${targetVid}`, String(stars));
    } catch (e) {}

    const res = await submitLectureRating(targetVid, topic.id, stars);
    if (res.success && targetVid === selectedVideo?.youtubeId) {
      setCloudRating(res.averageRating);
      setCloudRatingCount(res.count);
      setRatingToast(`⭐ Rated ${stars}/5 in Supabase Cloud!`);
      setTimeout(() => setRatingToast(null), 3500);
    }
    setIsSubmittingRating(false);
  };

  // Dynamically call /api/youtube-lectures on topic or language change
  useEffect(() => {
    let isCancelled = false;
    setIsLoadingVideos(true);
    setIsVideoPlaying(false);
    setIsIframeLoaded(false);

    // Initial sync with curated discipline fallback
    setDynamicVideos(fallbackEducatorVideos);
    setSelectedVideo(fallbackEducatorVideos[0]);

    const activeTitle = lang === 'en' ? topic.titleEn : topic.titleHi;
    const activeSubject = subject.nameEn;
    const activeMedium = lang === 'en' ? 'English' : 'Hindi';

    fetch(
      `/api/youtube-lectures?topic=${encodeURIComponent(activeTitle)}&subject=${encodeURIComponent(activeSubject)}&medium=${encodeURIComponent(activeMedium)}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (isCancelled) return;
        if (data && data.success && Array.isArray(data.lectures) && data.lectures.length > 0) {
          const mapped: EducatorVideoItem[] = data.lectures.map((l: any) => ({
            id: l.id || `yt-${l.videoId}`,
            titleEn: l.title,
            titleHi: l.title,
            channel: l.channelName || 'Top Academic Faculty',
            educator: l.educator || l.channelName,
            youtubeId: l.videoId,
            duration: l.duration || '28:00',
            language: l.language || (lang === 'en' ? 'English' : 'Hindi'),
            views: l.views || '450K',
            starRating: l.starRating || 4.9,
            ratingCount: l.ratingCount || 1200,
            badge: l.badge || 'Verified Stream',
            searchFallback:
              l.searchFallback ||
              `https://www.youtube.com/results?search_query=${encodeURIComponent(topic.titleEn)}`,
          }));
          setDynamicVideos(mapped);
          setSelectedVideo(mapped[0]);
        }
      })
      .catch((err) => {
        console.warn('Live YouTube lecture fetch error, keeping curated fallback:', err);
      })
      .finally(() => {
        if (!isCancelled) setIsLoadingVideos(false);
      });

    return () => {
      isCancelled = true;
    };
  }, [topic.id, lang, subject.nameEn, fallbackEducatorVideos]);

  // Upvotes and ratings state per video ID
  const [upvotes, setUpvotes] = useState<Record<string, number>>({});
  const [userRatings, setUserRatings] = useState<Record<string, number>>({});

  // Filter & Sort
  const [languageFilter, setLanguageFilter] = useState<'all' | 'Hinglish' | 'Hindi' | 'English'>('all');
  const [sortByRating, setSortByRating] = useState<boolean>(false);

  const displayedVideos = useMemo(() => {
    let list = [...dynamicVideos];
    if (languageFilter !== 'all') {
      list = list.filter((v) => v.language === languageFilter);
    }
    if (sortByRating) {
      list.sort((a, b) => b.starRating - a.starRating);
    }
    return list;
  }, [dynamicVideos, languageFilter, sortByRating]);

  // Upvote toggle handler
  const handleToggleUpvote = (videoId: string) => {
    setUpvotes((prev) => ({
      ...prev,
      [videoId]: prev[videoId] ? 0 : 1,
    }));
  };

  // Next & Previous topic resolution within the subject
  const allSubjectTopics = useMemo(() => {
    const list: { unitNum: number; t: ExplorerTopic }[] = [];
    subject.units.forEach((u) => {
      u.topics.forEach((t) => {
        list.push({ unitNum: u.unitNumber, t });
      });
    });
    return list;
  }, [subject]);

  const currentTopicIndex = allSubjectTopics.findIndex((item) => item.t.id === topic.id);
  const prevTopicItem = currentTopicIndex > 0 ? allSubjectTopics[currentTopicIndex - 1] : null;
  const nextTopicItem =
    currentTopicIndex >= 0 && currentTopicIndex < allSubjectTopics.length - 1
      ? allSubjectTopics[currentTopicIndex + 1]
      : null;

  return (
    <div className="min-h-screen himalayan-mesh-bg text-slate-800 dark:text-slate-100 relative selection:bg-teal-500 dark:selection:bg-cyan-500 selection:text-white dark:selection:text-black">
      {/* Background Starry Glow */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-red-600/10 via-amber-600/10 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Dual Left Slide-Bars Navigation */}
      <FloatingNav
        currentTab="lectures"
        lang={lang}
        setLang={setLang}
        showSubjectExplorer={true}
        activeSubjectId={subject.id}
        activeUnitNumber={unit.unitNumber}
        activeTopicId={topic.id}
        onSelectTopic={(topicId, subjectId, unitNumber) => {
          router.push(`/lectures?subject=${subjectId}&unit=${unitNumber}&topic=${topicId}`);
        }}
      />

      {/* Main Content Area - Displaced dynamically for sidebar and expands to full portion when collapsed */}
      <div className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-20 pr-4 sm:pr-6 md:pr-8 relative z-10 ${isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'}`}>
        <main
          className={`relative z-10 transition-all duration-300 ease-in-out mx-auto w-full ${
            isCinemaMode
              ? 'max-w-[1720px]'
              : isCollapsed
              ? 'max-w-[1720px] lg:px-6'
              : 'max-w-6xl lg:px-4'
          }`}
        >
        {/* ================================================================ */}
        {/* 3-STEP PROGRESS TRACKER (Subject -> Unit -> Lecture Studio)       */}
        {/* ================================================================ */}
        <div className="mb-6 p-3 rounded-2xl glass-panel border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#080d22]/90 shadow-md flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto py-0.5">
            {/* Step 1: Subject */}
            <button
              type="button"
              onClick={() => setFlowStep('subject')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                flowStep === 'subject'
                  ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/30 ring-2 ring-teal-400/40'
                  : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-teal-700 dark:hover:text-cyan-300'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">1</span>
              <span>{lang === 'en' ? 'Choose Subject' : 'विषय चुनें'}</span>
              {flowStep !== 'subject' && <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-bold">✓</span>}
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            {/* Step 2: Unit */}
            <button
              type="button"
              onClick={() => setFlowStep('unit')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                flowStep === 'unit'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/40'
                  : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-indigo-700 dark:hover:text-violet-300'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">2</span>
              <span>{lang === 'en' ? 'Choose Unit' : 'इकाई चुनें'}</span>
              {flowStep === 'player' && <span className="text-[10px] text-emerald-500 dark:text-emerald-400 font-bold">✓</span>}
            </button>

            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

            {/* Step 3: Lectures */}
            <button
              type="button"
              onClick={() => setFlowStep('player')}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                flowStep === 'player'
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-md shadow-red-600/30 ring-2 ring-red-400/40'
                  : 'bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-300 opacity-70'
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">3</span>
              <span>{lang === 'en' ? 'Watch Verified Lectures' : 'व्याख्यान देखें'}</span>
            </button>
          </div>

          {/* Quick Breadcrumb indicator badge */}
          <div className="hidden md:flex items-center space-x-2 text-xs font-mono font-bold">
            <span className="px-2.5 py-1 rounded-full bg-teal-50 dark:bg-cyan-950/80 border border-teal-200 dark:border-cyan-500/30 text-teal-800 dark:text-cyan-300">
              {subject.code}
            </span>
            <span className="px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-violet-950/80 border border-indigo-200 dark:border-violet-500/30 text-indigo-800 dark:text-violet-300">
              Unit {unit.unitNumber}
            </span>
          </div>
        </div>

        {/* ================================================================ */}
        {/* STAGE 1: CHOOSE SUBJECT VIEW                                      */}
        {/* ================================================================ */}
        {flowStep === 'subject' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Header Hero Banner */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080d22]/85 relative overflow-hidden shadow-xl dark:shadow-2xl">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-rose-500 to-indigo-500" />
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-teal-50 dark:bg-cyan-950/80 border border-teal-200 dark:border-cyan-500/40 text-teal-800 dark:text-cyan-300 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm">
                      <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                      <span>SDSUV NEP-2020 • Verified Video Hub</span>
                    </span>
                    <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-violet-950/80 border border-indigo-200 dark:border-violet-500/40 text-indigo-800 dark:text-violet-300 text-xs font-mono font-bold flex items-center space-x-1.5">
                      <Award className="w-3.5 h-3.5 text-indigo-600 dark:text-violet-400" />
                      <span>Step 1 of 3: Subject Selection</span>
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                    🎥 {lang === 'en' ? 'Select Subject for Lecture Studio' : 'लेक्चर स्टूडियो हेतु विषय चुनें'}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                    {lang === 'en'
                      ? 'Select a subject from your enrolled course to explore syllabus units, watch verified video lectures with top academic educators, and practice high-yield PYQs.'
                      : 'इकाई-वार व्याख्यान देखने, शीर्ष शिक्षकों के सत्यापित वीडियो लेक्चर एवं महत्वपूर्ण पीवाईक्यू अभ्यास हेतु अपना विषय चुनें।'}
                  </p>
                </div>

                {/* Search input */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="text"
                      value={subjectSearchQuery}
                      onChange={(e) => setSubjectSearchQuery(e.target.value)}
                      placeholder="Search subjects or papers..."
                      className="bg-slate-100 dark:bg-black/50 border border-slate-300 dark:border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:border-teal-500 dark:focus:border-cyan-400 w-full sm:w-64"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Subjects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {searchedExplorerSubjects.map((sub: ExplorerSubject) => {
                const isSelected = sub.id === currentSubjectObj.id;
                const totalTopics = sub.units.reduce((acc: number, u: ExplorerUnit) => acc + u.topics.length, 0);

                return (
                  <motion.div
                    key={sub.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => {
                      setSelectedSubjectKey(sub.id);
                      setFlowStep('unit');
                      if (typeof window !== 'undefined') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg group ${
                      isSelected
                        ? 'border-teal-500 dark:border-cyan-500/70 bg-teal-50/50 dark:bg-gradient-to-b dark:from-cyan-950/40 dark:to-[#080d22] shadow-teal-500/10 dark:shadow-cyan-900/30 ring-2 ring-teal-500/30 dark:ring-cyan-500/30'
                        : 'border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#080d22]/85 hover:border-teal-400/50 dark:hover:border-cyan-500/40 hover:bg-slate-50 dark:hover:bg-[#0c1538]/60'
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-1 rounded-xl bg-teal-50 dark:bg-cyan-950/80 text-teal-800 dark:text-cyan-300 border border-teal-200 dark:border-cyan-500/40 text-xs font-mono font-bold">
                          {sub.code}
                        </span>
                        <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300">
                          Sem 1 (NEP-2020)
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-cyan-300 transition-colors leading-tight">
                          {lang === 'en' ? sub.nameEn : sub.nameHi}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                          {lang === 'en' ? sub.paperTitleEn : sub.paperTitleHi}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 text-xs text-slate-500 dark:text-slate-400 font-mono pt-1">
                        <span className="flex items-center space-x-1">
                          <Layers className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                          <span>{sub.units.length} Units</span>
                        </span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Tv className="w-3.5 h-3.5 text-rose-500 dark:text-amber-400" />
                          <span>{totalTopics} Topics</span>
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5 text-xs font-bold text-teal-700 dark:text-cyan-400 group-hover:text-teal-800 dark:group-hover:text-cyan-300">
                      <span>{lang === 'en' ? 'Select Units & Lectures' : 'इकाई एवं व्याख्यान चुनें'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/* STAGE 2: CHOOSE UNIT VIEW                                         */}
        {/* ================================================================ */}
        {flowStep === 'unit' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* Top Breadcrumb Navigation */}
            <div className="p-4 sm:p-5 rounded-3xl glass-panel border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080d22]/85 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setFlowStep('subject')}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-white/10 transition-colors flex items-center space-x-1.5 text-xs font-bold cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                  <span>{lang === 'en' ? '← Back to Subjects' : '← विषय सूची'}</span>
                </button>

                <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10" />

                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-teal-700 dark:text-cyan-400 font-bold block">
                    {currentSubjectObj.code} • Sem 1 (NEP-2020)
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {lang === 'en' ? currentSubjectObj.nameEn : currentSubjectObj.nameHi}
                  </h2>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setFlowStep('subject')}
                  className="px-3.5 py-1.5 rounded-xl bg-teal-50 dark:bg-cyan-950/70 border border-teal-200 dark:border-cyan-500/30 text-teal-800 dark:text-cyan-300 text-xs font-bold hover:bg-teal-100 dark:hover:bg-cyan-900 transition-colors cursor-pointer"
                >
                  🔄 {lang === 'en' ? 'Change Subject' : 'विषय बदलें'}
                </button>
              </div>
            </div>

            {/* Unit Selection Header */}
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">
                📖 {lang === 'en' ? 'Select Unit to Watch Lectures' : 'व्याख्यान देखने हेतु इकाई का चयन करें'}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                {lang === 'en'
                  ? 'Each unit provides verified educational lectures mapped with SDSUV syllabus marks weightage.'
                  : 'प्रत्येक इकाई एसडीएसयूवी पाठ्यक्रम के अंक भार के अनुसार सत्यापित वीडियो व्याख्यानों से सुसज्जित है।'}
              </p>
            </div>

            {/* Units Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentSubjectObj.units.map((u) => {
                return (
                  <motion.div
                    key={u.unitNumber}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => {
                      router.push(
                        `/lectures?subject=${currentSubjectObj.id}&unit=${u.unitNumber}&topic=${u.topics[0]?.id}`
                      );
                      setFlowStep('player');
                      if (typeof window !== 'undefined') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    className="p-6 rounded-3xl border border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#080d22]/85 hover:border-teal-400/50 dark:hover:border-cyan-400/50 hover:bg-slate-50 dark:hover:bg-[#0c1538]/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg group"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-xl bg-teal-50 dark:bg-cyan-950/80 text-teal-800 dark:text-cyan-300 border border-teal-200 dark:border-cyan-500/40 text-xs font-mono font-black">
                          UNIT {u.unitNumber}
                        </span>
                        <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-200 dark:border-emerald-500/30">
                          {u.weightageMarks} Marks
                        </span>
                      </div>

                      <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-teal-700 dark:group-hover:text-cyan-300 transition-colors leading-snug">
                        {lang === 'en' ? u.titleEn : u.titleHi}
                      </h4>

                      {/* Topics Preview List */}
                      <div className="space-y-1.5 pt-1">
                        <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-bold block">
                          {u.topics.length} Verified Lectures Available:
                        </span>
                        <div className="space-y-1.5">
                          {u.topics.slice(0, 3).map((tp) => (
                            <div
                              key={tp.id}
                              className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/5 text-[11px] text-slate-700 dark:text-slate-300 flex items-center justify-between"
                            >
                              <span className="truncate pr-2">
                                {tp.sequence}: {lang === 'en' ? tp.titleEn : tp.titleHi}
                              </span>
                              <span className="text-slate-500 dark:text-slate-400 font-mono text-[10px] shrink-0">
                                {tp.duration}
                              </span>
                            </div>
                          ))}
                          {u.topics.length > 3 && (
                            <div className="text-[10px] font-mono text-teal-700 dark:text-cyan-400 font-bold pl-1">
                              + {u.topics.length - 3} more lectures in this unit
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 dark:border-white/5 text-xs font-bold text-teal-700 dark:text-cyan-400 group-hover:text-teal-800 dark:group-hover:text-cyan-300">
                      <span>{lang === 'en' ? 'Open Unit Lectures & Player' : 'इकाई व्याख्यान एवं प्लेयर खोलें'}</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ================================================================ */}
        {/* STAGE 3: LECTURE PLAYER VIEW                                      */}
        {/* ================================================================ */}
        {flowStep === 'player' && (
          <div className="space-y-6">
            {/* Top Bar: Breadcrumbs & Change Subject Buttons */}
            <div className="mb-6 rounded-2xl glass-panel p-4 sm:p-5 border border-slate-200 dark:border-white/10 bg-white dark:bg-[#080d22]/90 shadow-xl dark:shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-slate-600 dark:text-slate-400 overflow-x-auto whitespace-nowrap pb-1 md:pb-0">
                <button
                  type="button"
                  onClick={() => setFlowStep('subject')}
                  className="px-3 py-1.5 rounded-xl bg-teal-50 hover:bg-teal-100 dark:bg-cyan-950/80 dark:hover:bg-cyan-900 border border-teal-300 dark:border-cyan-500/40 text-teal-800 dark:text-cyan-300 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                  title="Change Subject"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-teal-600 dark:text-cyan-400" />
                  <span>{lang === 'en' ? '← Change Subject' : '← विषय बदलें'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFlowStep('unit')}
                  className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-100 dark:bg-violet-950/80 dark:hover:bg-violet-900 border border-indigo-300 dark:border-violet-500/40 text-indigo-800 dark:text-violet-300 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer shrink-0"
                  title="Change Unit"
                >
                  <span>Unit {unit.unitNumber}</span>
                  <span className="text-[10px] text-slate-400">▾</span>
                </button>

                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                <span className="text-slate-900 dark:text-white font-bold">{lang === 'en' ? subject.nameEn : subject.nameHi}</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                <span className="px-2 py-0.5 rounded bg-teal-50 dark:bg-cyan-950 text-teal-800 dark:text-cyan-300 border border-teal-200 dark:border-cyan-500/30 font-bold">
                  {topic.sequence}
                </span>
              </div>

          {/* Action Buttons: Read Notes on Topic + Medium */}
          <div className="flex items-center space-x-2.5 shrink-0 self-end md:self-auto">
            {/* 📖 READ NOTES ON TOPIC BUTTON (Strict Requirement 3) */}
            <Link
              href={`/notes?subject=${subject.id}&unit=${unit.unitNumber}&topic=${topic.id}`}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 hover:from-teal-500 hover:to-purple-500 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-indigo-500/20 transition-transform hover:scale-105 active:scale-95 flex items-center space-x-2"
              title="Switch to Notes Studio for structured notes, mindmaps, and 15-mark blueprint"
            >
              <BookOpen className="w-4 h-4" />
              <span>📖 Read Notes on "{lang === 'en' ? topic.titleEn.split(':')[0] : topic.titleHi.split(':')[0]}" →</span>
            </Link>

            {/* Language Medium Toggle */}
            <div className="flex items-center p-0.5 bg-slate-100 dark:bg-black/50 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-bold">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'en'
                    ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  lang === 'hi'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                हिंदी
              </button>
            </div>
          </div>
        </div>

        {/* =================        {/* ================================================================== */}
        {/* MAIN VIDEO THEATER PLAYER CONTAINER (NO AUTOPLAY)                 */}
        {/* ================================================================== */}
        <div className="rounded-3xl glass-panel p-4 sm:p-6 border border-slate-200 dark:border-red-500/30 bg-white dark:bg-[#080d22]/95 shadow-xl dark:shadow-2xl space-y-4 mb-8">
          {/* Header Info Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
            <div className="space-y-1 min-w-0">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-red-950 text-rose-800 dark:text-red-300 border border-rose-200 dark:border-red-500/40 text-[10px] font-mono font-bold flex items-center space-x-1">
                  <Play className="w-3 h-3 fill-rose-600 dark:fill-red-400" />
                  <span>Verified Top Educator Stream</span>
                </span>
                <span className="px-2 py-0.5 rounded bg-teal-50 dark:bg-cyan-950 text-teal-800 dark:text-cyan-300 border border-teal-200 dark:border-cyan-500/30 text-[10px] font-mono font-bold">
                  {selectedVideo.channel}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs font-mono hidden sm:inline">
                  • {selectedVideo.educator}
                </span>
              </div>
              <h1 className="text-base sm:text-xl font-extrabold text-slate-900 dark:text-white leading-snug truncate max-w-3xl">
                {lang === 'en' ? selectedVideo.titleEn : selectedVideo.titleHi}
              </h1>
            </div>

            {/* Player Controls */}
            <div className="flex items-center space-x-2">
              {/* Cinema Mode Toggle */}
              <button
                type="button"
                onClick={() => setIsCinemaMode(!isCinemaMode)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  isCinemaMode
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/30'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={isCinemaMode ? 'Exit Cinema Theater' : 'Expand Cinema Theater'}
              >
                <Maximize2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Cinema Mode</span>
              </button>

              {/* Watch on YouTube External */}
              <a
                href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-red-600/30 transition-transform hover:scale-105"
                title="Open on YouTube directly"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>YouTube ↗</span>
              </a>
            </div>
          </div>

          {/* Video Screen: 16:9 Aspect Ratio Frame */}
          <div
            id="video-player-screen"
            className="relative aspect-video rounded-2xl overflow-hidden bg-black border border-slate-300 dark:border-white/10 shadow-inner group"
          >
            {isVideoPlaying ? (
              /* Active YouTube Iframe (Embed with mobile playsinline enabled) */
              <>
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`}
                  title={selectedVideo.titleEn}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                  allowFullScreen
                  onLoad={() => setIsIframeLoaded(true)}
                  className="w-full h-full border-0 absolute inset-0 z-10"
                />

                {!isIframeLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 space-y-2 z-0">
                    <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
                    <span className="text-xs font-mono">Loading Verified Educator Stream...</span>
                  </div>
                )}
              </>
            ) : (
              /* 1. DYNAMIC SUBJECT-THEMED TOPIC BANNER + THUMBNAIL (Tap Anywhere to Play) */
              <div
                onClick={() => setIsVideoPlaying(true)}
                className="relative w-full h-full flex flex-col justify-between p-3.5 sm:p-6 md:p-8 overflow-hidden select-none cursor-pointer group"
                title="Tap anywhere to play video"
              >
                {/* Background Video Thumbnail */}
                <img
                  src={`https://i.ytimg.com/vi/${selectedVideo.youtubeId}/hqdefault.jpg`}
                  alt={selectedVideo.titleEn}
                  className="absolute inset-0 w-full h-full object-cover brightness-[0.35] group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes('mqdefault')) {
                      target.src = `https://i.ytimg.com/vi/${selectedVideo.youtubeId}/mqdefault.jpg`;
                    }
                  }}
                />

                {/* Dynamic Subject Gradient Ambient Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${
                    subject.id === 'geography'
                      ? 'from-emerald-950/95 via-slate-950/80 to-teal-950/60'
                      : subject.id === 'history'
                      ? 'from-amber-950/95 via-slate-950/80 to-orange-950/60'
                      : subject.id === 'polscience'
                      ? 'from-blue-950/95 via-slate-950/80 to-indigo-950/60'
                      : subject.id === 'sociology'
                      ? 'from-purple-950/95 via-slate-950/80 to-violet-950/60'
                      : 'from-rose-950/95 via-slate-950/80 to-red-950/60'
                  } backdrop-blur-[2px]`}
                />

                {/* Top Row: Subject Badge + Sequence + Duration */}
                <div className="relative z-10 flex items-center justify-between gap-1.5 flex-wrap">
                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-black/80 border border-white/20 text-cyan-300 flex items-center space-x-1 shadow-sm">
                      <span>
                        {subject.id === 'geography'
                          ? '🌍'
                          : subject.id === 'history'
                          ? '📜'
                          : subject.id === 'polscience'
                          ? '⚖️'
                          : subject.id === 'sociology'
                          ? '👥'
                          : '🪶'}
                      </span>
                      <span className="truncate max-w-[120px] sm:max-w-none">{lang === 'en' ? subject.nameEn : subject.nameHi}</span>
                    </span>
                    <span className="px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-white/10 text-white border border-white/20">
                      {topic.sequence}
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-black/80 border border-white/20 text-cyan-300">
                      {selectedVideo.duration}
                    </span>
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/30 hidden xs:inline">
                      {selectedVideo.badge}
                    </span>
                  </div>
                </div>

                {/* Center Content: Prominent Centered Play Button (Never Cut Off on Mobile!) */}
                <div className="relative z-10 text-center space-y-1.5 sm:space-y-3 max-w-2xl mx-auto my-auto flex flex-col items-center justify-center">
                  {/* Topic Title & Unit Header in Banner */}
                  <div className="space-y-0.5 sm:space-y-1">
                    <span className="text-[9px] sm:text-[11px] font-mono font-bold uppercase tracking-wider text-teal-300 dark:text-cyan-300 block">
                      {lang === 'en' ? unit.titleEn : unit.titleHi}
                    </span>
                    <h2 className="text-xs sm:text-lg md:text-2xl font-black text-white leading-tight drop-shadow-lg line-clamp-1 sm:line-clamp-2">
                      {lang === 'en' ? topic.titleEn : topic.titleHi}
                    </h2>
                  </div>

                  {/* Centered Glowing Play Button */}
                  <div className="py-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsVideoPlaying(true);
                      }}
                      className="inline-flex items-center justify-center w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-amber-500 text-white shadow-2xl shadow-red-600/70 hover:scale-110 active:scale-95 transition-all cursor-pointer ring-4 ring-red-500/40 group-hover:ring-red-400/80 animate-pulse"
                      title="Tap to Play Video Lecture"
                    >
                      <Play className="w-6 h-6 sm:w-9 sm:h-9 fill-white ml-1 sm:ml-1.5" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="hidden sm:flex items-center justify-center space-x-2 sm:space-x-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsVideoPlaying(true);
                      }}
                      className="px-4 sm:px-6 py-1.5 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white text-[11px] sm:text-xs font-black flex items-center space-x-1.5 shadow-xl shadow-red-600/50 hover:scale-105 transition-all cursor-pointer"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>▶ Tap to Play</span>
                    </button>

                    <a
                      href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] sm:text-xs font-bold border border-white/20 flex items-center space-x-1"
                    >
                      <span>YouTube ↗</span>
                    </a>
                  </div>
                </div>

                {/* Bottom Row */}
                <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs text-slate-300 font-mono">
                  <span className="flex items-center space-x-1 truncate max-w-[200px] sm:max-w-none">
                    <Sparkles className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{selectedVideo.educator} • {selectedVideo.channel}</span>
                  </span>
                  <span>⭐ {selectedVideo.starRating} ({selectedVideo.views})</span>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Dedicated Video Play Bar */}
          <div className="sm:hidden grid grid-cols-2 gap-2">
            {!isVideoPlaying ? (
              <button
                type="button"
                onClick={() => setIsVideoPlaying(true)}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-red-600/30 active:scale-95 transition-transform"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>▶ Play Video Here</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setIsVideoPlaying(false)}
                className="w-full py-2.5 px-3 rounded-xl bg-white/10 text-slate-200 font-bold text-xs flex items-center justify-center space-x-1.5 border border-white/10 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Show Poster</span>
              </button>
            )}

            <a
              href={`https://www.youtube.com/watch?v=${selectedVideo.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 px-3 rounded-xl bg-red-600 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-md active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in YouTube</span>
            </a>
          </div>

          {/* Sub-Player Meta Bar with Real-time Supabase Cloud Rating */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-slate-600 dark:text-slate-400 font-semibold">Community Rating:</span>
                <div className="flex items-center space-x-1.5 text-amber-700 dark:text-amber-300 font-bold font-mono">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
                  <span className="text-sm">{cloudRating.toFixed(1)}</span>
                  <span className="text-slate-500 text-[11px]">({cloudRatingCount} student ratings in Cloud)</span>
                </div>
              </div>

              {/* Interactive 5-Star Rating Buttons */}
              <div className="flex items-center space-x-1.5 pl-2 border-l border-slate-300 dark:border-white/10">
                <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                  {userRating ? 'Your rating:' : 'Rate lecture:'}
                </span>
                <div className="flex items-center space-x-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRateVideo(star)}
                      disabled={isSubmittingRating}
                      title={`Rate ${star} star${star > 1 ? 's' : ''}`}
                      className="p-1 hover:scale-125 transition-transform disabled:opacity-50 cursor-pointer"
                    >
                      <Star
                        className={`w-4 h-4 transition-colors ${
                          (userRating !== null && star <= userRating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-400 hover:text-amber-400 hover:fill-amber-400/30'
                        }`}
                      />
                    </button>
                  ))}
                </div>
                {ratingToast && (
                  <span className="text-[10px] text-emerald-400 font-mono font-bold animate-pulse">
                    {ratingToast}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-slate-600 dark:text-slate-300 text-[11px]">
                {lang === 'en'
                  ? 'Guaranteed embed-enabled university curriculum lecture.'
                  : 'एसडीएसयूवी पाठ्यक्रम अनुरूप सत्यापित व्याख्यान।'}
              </span>
            </div>
          </div>
        </div>

        {/* ================================================================== */}
        {/* 8-CARD TOP EDUCATOR RATED VIDEO GRID FOR THIS TOPIC                */}
        {/* ================================================================== */}
        <section className="space-y-4 mb-8">
          {/* Section Header with Medium Filter & Sort Toggle */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-white/10">
            <div>
              <div className="flex items-center space-x-2">
                <span className="p-1 rounded-lg bg-rose-50 dark:bg-red-500/10 text-rose-600 dark:text-red-400 border border-rose-200 dark:border-red-500/30">
                  <Tv className="w-3.5 h-3.5" />
                </span>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  Top Educator Rated Lectures ({displayedVideos.length} Available)
                </h2>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Curated from StudyIQ, Drishti IAS, PW OnlyIAS, CEC UGC, Sansad TV, Sleepy Classes & Amit Sengupta
              </p>
            </div>

            {/* Filter Pills & Sort Toggle */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Language Filter */}
              <div className="flex items-center p-0.5 bg-slate-100 dark:bg-black/60 rounded-xl border border-slate-200 dark:border-white/10 text-xs">
                {(['all', 'Hinglish', 'Hindi', 'English'] as const).map((filterOpt) => (
                  <button
                    key={filterOpt}
                    type="button"
                    onClick={() => setLanguageFilter(filterOpt)}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all text-[11px] ${
                      languageFilter === filterOpt
                        ? 'bg-gradient-to-r from-teal-600 to-indigo-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    {filterOpt === 'all'
                      ? '✨ All'
                      : filterOpt === 'Hindi'
                      ? '🇮🇳 Hindi'
                      : filterOpt === 'English'
                      ? '🇬🇧 English'
                      : '🗣️ Hinglish'}
                  </button>
                ))}
              </div>

              {/* Sort By Rating Button */}
              <button
                type="button"
                onClick={() => setSortByRating(!sortByRating)}
                className={`px-3 py-1.5 rounded-xl border text-[11px] font-bold flex items-center space-x-1 transition-colors ${
                  sortByRating
                    ? 'bg-amber-100 dark:bg-amber-500/20 border-amber-300 dark:border-amber-500/50 text-amber-900 dark:text-amber-300'
                    : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Star className="w-3 h-3 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400" />
                <span>{sortByRating ? '⭐ Highest Rated' : 'Default Order'}</span>
              </button>
            </div>
          </div>

          {/* 8-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayedVideos.map((vid) => {
              const isSelected = selectedVideo.id === vid.id;
              const hasUpvoted = !!upvotes[vid.youtubeId];
              const userRating = userRatings[vid.youtubeId];

              return (
                <div
                  key={vid.id}
                  onClick={() => {
                    setSelectedVideo(vid);
                    setIsVideoPlaying(true);
                    setIsIframeLoaded(false);
                    if (typeof window !== 'undefined') {
                      document.getElementById('video-player-screen')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  className={`rounded-2xl border overflow-hidden cursor-pointer transition-all flex flex-col justify-between group ${
                    isSelected
                      ? 'bg-rose-50/70 dark:bg-red-950/20 border-rose-500 dark:border-red-500 ring-2 ring-rose-500/40 dark:ring-red-500/40 shadow-lg'
                      : 'bg-white dark:bg-black/50 border-slate-200 dark:border-white/10 hover:border-rose-400/50 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                  }`}
                >
                  {/* Thumbnail Container */}
                  <div className="relative aspect-video w-full bg-slate-900 overflow-hidden">
                    <img
                      src={`https://i.ytimg.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                      alt={vid.titleEn}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        if (!target.src.includes('mqdefault')) {
                          target.src = `https://i.ytimg.com/vi/${vid.youtubeId}/mqdefault.jpg`;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                    {/* Duration Badge */}
                    <span className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[10px] font-mono text-white border border-white/20">
                      {vid.duration}
                    </span>

                    {/* Language Badge */}
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-sm text-[10px] font-mono text-cyan-300 border border-cyan-500/30 font-bold">
                      {vid.language}
                    </span>

                    {/* Play Hover Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                      <div className="p-3 rounded-full bg-red-600 text-white shadow-lg shadow-red-600/50 transform group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-white ml-0.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-3.5 space-y-2.5 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-teal-700 dark:text-cyan-300">
                        <span className="truncate max-w-[140px]">{vid.channel}</span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{vid.views} views</span>
                      </div>

                      <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 leading-snug group-hover:text-rose-600 dark:group-hover:text-red-300 transition-colors">
                        {lang === 'hi' ? vid.titleHi : vid.titleEn}
                      </h4>

                      <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                        👨‍🏫 {vid.educator}
                      </p>
                    </div>

                    {/* Card Actions: Helpful + Rating */}
                    <div className="pt-2 border-t border-slate-200/80 dark:border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1 text-amber-700 dark:text-amber-300 font-mono text-[11px]">
                          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 dark:fill-amber-400 dark:text-amber-400 shrink-0" />
                          <span className="font-bold">{vid.starRating.toFixed(1)}</span>
                        </div>

                        {isSelected && (
                          <span className="text-[10px] font-bold text-rose-600 dark:text-red-400 animate-pulse font-mono">
                            ▶ ACTIVE IN PLAYER
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1.5 pt-0.5">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleToggleUpvote(vid.youtubeId);
                          }}
                          className={`flex-1 py-1 px-2 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center space-x-1 border ${
                            hasUpvoted
                              ? 'bg-rose-50 dark:bg-red-500/25 text-rose-700 dark:text-red-300 border-rose-300 dark:border-red-400/60 shadow-xs'
                              : 'bg-white hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <ThumbsUp className={`w-3 h-3 ${hasUpvoted ? 'fill-rose-600 text-rose-600 dark:fill-red-400 dark:text-red-400' : ''}`} />
                          <span>{hasUpvoted ? 'Helpful ✓' : '👍 Helpful'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRateVideo(vid.youtubeId, 5);
                          }}
                          className={`py-1 px-2.5 rounded-lg text-[10px] font-bold transition-all flex items-center justify-center space-x-1 border ${
                            userRating
                              ? 'bg-amber-100 dark:bg-amber-500/25 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-400/60'
                              : 'bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/60 dark:hover:bg-amber-900/70 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-500/30'
                          }`}
                        >
                          <Star className={`w-3 h-3 ${userRating ? 'fill-amber-500 text-amber-500 dark:fill-amber-400' : ''}`} />
                          <span>{userRating ? `${userRating}★` : '⭐ Rate'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================== */}
        {/* BOTTOM SEQUENTIAL TOPIC NAVIGATION & ACTIONS                      */}
        {/* ================================================================== */}
        <div className="pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevTopicItem ? (
            <button
              type="button"
              onClick={() => {
                router.push(
                  `/lectures?subject=${subject.id}&unit=${prevTopicItem.unitNum}&topic=${prevTopicItem.t.id}`
                );
              }}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center space-x-2 transition-all w-full sm:w-auto justify-center shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>
                ← {prevTopicItem.t.sequence}: {lang === 'en' ? prevTopicItem.t.titleEn.split(':')[0] : prevTopicItem.t.titleHi.split(':')[0]}
              </span>
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}

          {/* Action Buttons: Notes + SDSUV PYQs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link
              href={`/notes?subject=${subject.id}&unit=${unit.unitNumber}&topic=${topic.id}`}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 hover:brightness-110 text-white font-black text-xs uppercase tracking-wider shadow-md shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>📖 Read Notes →</span>
            </Link>

            <Link
              href={`/pyqs?topic=${encodeURIComponent(topic.id)}`}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-md shadow-amber-500/25 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2"
            >
              <Archive className="w-4 h-4 fill-slate-950" />
              <span>📑 SDSUV PYQs (NEP-2020) →</span>
            </Link>
          </div>

          {nextTopicItem ? (
            <button
              type="button"
              onClick={() => {
                router.push(
                  `/lectures?subject=${subject.id}&unit=${nextTopicItem.unitNum}&topic=${nextTopicItem.t.id}`
                );
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white font-black text-xs flex items-center space-x-2 shadow-lg shadow-red-600/20 hover:scale-105 transition-all w-full sm:w-auto justify-center"
            >
              <span>
                Next: {nextTopicItem.t.sequence} →
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </div>
      )}
    </main>
    </div>
  </div>
  );
}

export default function LectureStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070913] flex items-center justify-center text-cyan-400 font-mono text-sm">
          Loading SDSUV Lecture Studio...
        </div>
      }
    >
      <LectureStudioContent />
    </Suspense>
  );
}
