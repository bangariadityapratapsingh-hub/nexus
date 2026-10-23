'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Tv,
  Maximize2,
  Minimize2,
  Play,
  CheckCircle2,
  Sparkles,
  Flame,
  Zap,
  ChevronDown,
  ChevronRight,
  Calendar,
  Award,
  Search,
  BookOpen,
  FileText,
  Clock,
  Layers,
  Archive,
  Download,
  Check,
  Eye,
  EyeOff,
  Timer,
  Pause,
  RotateCcw,
  ExternalLink,
  Filter,
  Bookmark,
  BookmarkCheck,
  GraduationCap,
  Lock,
} from 'lucide-react';
import HybridVideoPlayer from '@/components/HybridVideoPlayer';
import QuickFlashcardsTab from '@/components/QuickFlashcardsTab';
import PomodoroFocusPod from '@/components/PomodoroFocusPod';
import { toggleSaveItem, isItemSaved } from '@/lib/savedVaultStorage';
import { StreamType, LanguageType } from '@/lib/types';
import {
  LEARN_SUBJECTS_DATA,
  TopicItem,
  UnitNode,
  LearnSubjectData,
  LectureLanguage,
  LectureVideo,
} from '@/data/learnData';
import {
  getStoredCustomTopics,
  getStoredCustomLectures,
  CustomTopicPayload,
  CustomLecturePayload,
} from '@/lib/adminStorage';
import { STREAMS_CONFIG } from '@/data/portalData';
import FloatingNav from '@/components/FloatingNav';
import {
  getStudentProfile,
  filterToSelectedSubjects,
  StudentProfile,
} from '@/lib/studentProfile';
import { useSidebarState } from '@/lib/sidebarState';

export type LanguageFilterMode = 'smart-mix' | 'hinglish' | 'english' | 'hindi';

// Map invalid or deprecated mock IDs to real, tested working educational YouTube IDs
const VERIFIED_VIDEO_MAP: Record<string, string> = {
  'd9N6g3ebm9w': 'VlIyVKrNNBo', // PW OnlyIAS - Seismic Waves
  'VhLiwDYehCw': 'ERoE9xGSPbg', // TheGeoecologist - Plate Tectonics
  'FCgO_PLOlv0': '5UTmt-57BBk', // UPSC Wallah - Earth Dynamics
  'cHLN0Pqt_7U': 'm9w2ZOUF6So', // StudyIQ IAS - Sources of History
  'WTfd412422g': 'wyiTK4kAAOY', // Drishti IAS - Earth Interior
  'b7F1aK2z3xM': 'Esj-4hNWxLQ', // CEC UGC - Origin of State
  'pictures': 'm9w2ZOUF6So',
  'wO6x8k5GzS4': 'V0N_aoy-9w4', // PW OnlyIAS - Ancient History
  'eC1-B7jQ6bI': 'okG8IPVh8aI', // StudyIQ IAS - Article 14
};

export type LearnFlowStep = 'subject' | 'unit' | 'player';

export const sanitizeVideoId = (id?: string, subjectHint?: string) => {
  const clean = (id || '').trim();
  const sub = (subjectHint || '').toLowerCase();

  // Guard against Article 14 video (okG8IPVh8aI) bleed into non-polscience topics
  if (clean === 'okG8IPVh8aI' && !sub.includes('pol') && !sub.includes('law')) {
    if (sub.includes('geo')) return 'r43m_H6Fz3Y';
    if (sub.includes('his')) return 'm9w2ZOUF6So';
    if (sub.includes('soc')) return 'zR7wQy6E4kE';
    if (sub.includes('hin')) return 'FCgO_PLOlv0';
    return 'r43m_H6Fz3Y';
  }

  if (!clean || clean === 'pictures' || clean === '') {
    if (sub.includes('geo')) return 'r43m_H6Fz3Y';
    if (sub.includes('his')) return 'm9w2ZOUF6So';
    if (sub.includes('pol')) return 'okG8IPVh8aI';
    return 'r43m_H6Fz3Y';
  }

  return VERIFIED_VIDEO_MAP[clean] || clean;
};

function LearnPageContent() {
  const { isCollapsed } = useSidebarState();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [stream, setStream] = useState<StreamType>('ba-arts');
  const [lang, setLang] = useState<LanguageType>('en');
  const [selectedSemester, setSelectedSemester] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const queryTopicParam = searchParams.get('topic');
  const queryUnitParam = searchParams.get('unit');
  const [flowStep, setFlowStep] = useState<LearnFlowStep>(
    queryTopicParam || queryUnitParam ? 'player' : 'subject'
  );

  // Load student registered stream and preferred medium from profile
  useEffect(() => {
    setMounted(true);
    const p = getStudentProfile();
    if (p) {
      setProfile(p);
      setStream(p.stream);
      setLang(p.preferredMedium);
      if (p.semester && p.semester >= 1 && p.semester <= 10) {
        setSelectedSemester(p.semester % 2 === 0 ? 1 : p.semester);
      }
    }
    const handleProfile = (e: any) => {
      const updated = e.detail || getStudentProfile();
      if (updated) {
        setProfile(updated);
        setStream(updated.stream);
        setLang(updated.preferredMedium);
        if (updated.semester && updated.semester >= 1 && updated.semester <= 10) {
          setSelectedSemester(updated.semester % 2 === 0 ? 1 : updated.semester);
        }
      }
    };
    window.addEventListener('sdsuv_profile_updated', handleProfile);
    return () => window.removeEventListener('sdsuv_profile_updated', handleProfile);
  }, []);

  // Dynamic custom storage items
  const [customTopics, setCustomTopics] = useState<CustomTopicPayload[]>([]);
  const [customLectures, setCustomLectures] = useState<CustomLecturePayload[]>([]);

  useEffect(() => {
    setCustomTopics(getStoredCustomTopics());
    setCustomLectures(getStoredCustomLectures());

    const handleUpdate = () => {
      setCustomTopics(getStoredCustomTopics());
      setCustomLectures(getStoredCustomLectures());
    };
    window.addEventListener('sdsuv_storage_updated', handleUpdate);
    return () => window.removeEventListener('sdsuv_storage_updated', handleUpdate);
  }, []);

  // Subjects for the active stream (merged with custom items from /admin)
  const subjects = useMemo(() => {
    const base = LEARN_SUBJECTS_DATA[stream] || LEARN_SUBJECTS_DATA['ba-arts'];
    if (customTopics.length === 0) return base;

    const cloned: LearnSubjectData[] = JSON.parse(JSON.stringify(base));

    customTopics
      .filter((ct) => ct.stream === stream)
      .forEach((ct) => {
        let sub = cloned.find((s) => s.code === ct.subjectCode);
        if (!sub) {
          sub = {
            id: `custom-sub-${ct.subjectCode}`,
            code: ct.subjectCode,
            nameEn: ct.subjectNameEn,
            nameHi: ct.subjectNameHi,
            stream: ct.stream,
            semester: ct.semester,
            units: [],
          };
          cloned.push(sub);
        }

        let unit = sub.units.find((u) => u.unitNumber === ct.unitNumber);
        if (!unit) {
          unit = {
            unitNumber: ct.unitNumber,
            titleEn: `Unit ${ct.unitNumber}: Advanced Topics`,
            titleHi: `इकाई ${ct.unitNumber}: महत्वपूर्ण अध्याय`,
            totalHours: 10,
            weightageMarks: 20,
            sdsuvCreditWeight: '1.0 Credit',
            chapters: [],
          };
          sub.units.push(unit);
        }

        let chapter = unit.chapters.find((ch) => ch.titleEn === ct.chapterTitleEn);
        if (!chapter) {
          chapter = {
            chapterNumber: unit.chapters.length + 1,
            titleEn: ct.chapterTitleEn,
            titleHi: ct.chapterTitleHi,
            topics: [],
          };
          unit.chapters.push(chapter);
        }

        if (!chapter.topics.some((t) => t.id === ct.topic.id)) {
          chapter.topics.push(ct.topic);
        }
      });

    return cloned;
  }, [stream, customTopics]);

  // Filter subjects strictly based on student profile selected subjects
  const filteredSubjects = useMemo(() => {
    return filterToSelectedSubjects(
      subjects,
      (s) => s.code || s.id,
      profile?.selectedSubjects
    );
  }, [subjects, profile?.selectedSubjects]);

  // Available semesters in the current subjects list
  const availableSemesters = useMemo(() => {
    const sems = Array.from(new Set(filteredSubjects.map((s) => s.semester || 1))).sort((a, b) => a - b);
    return sems.length > 0 ? sems : [1];
  }, [filteredSubjects]);

  // Filtered subjects by semester
  const semesterSubjects = useMemo(() => {
    const matching = filteredSubjects.filter((s) => (s.semester || 1) === selectedSemester);
    return matching.length > 0 ? matching : filteredSubjects;
  }, [filteredSubjects, selectedSemester]);

  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    semesterSubjects[0]?.id || filteredSubjects[0]?.id || ''
  );

  // Sync selectedSubjectId if current subject is filtered out by profile changes
  useEffect(() => {
    if (filteredSubjects.length > 0 && !filteredSubjects.some((s) => s.id === selectedSubjectId)) {
      setSelectedSubjectId(filteredSubjects[0].id);
      if (filteredSubjects[0].semester) {
        setSelectedSemester(filteredSubjects[0].semester);
      }
    }
  }, [filteredSubjects, selectedSubjectId]);

  const activeSubject = useMemo(() => {
    return (
      semesterSubjects.find((s) => s.id === selectedSubjectId) ||
      filteredSubjects.find((s) => s.id === selectedSubjectId) ||
      semesterSubjects[0] ||
      filteredSubjects[0]
    );
  }, [semesterSubjects, filteredSubjects, selectedSubjectId]);

  // Active expanded units accordion state
  const [expandedUnits, setExpandedUnits] = useState<Record<number, boolean>>({ 1: true, 2: true });

  // Active selected topic state
  const initialTopic = activeSubject?.units[0]?.chapters[0]?.topics[0];
  const [activeTopic, setActiveTopic] = useState<TopicItem>(initialTopic);

  // Flattened ordered topic list across all units and chapters of the active subject
  const sequentialTopicList = useMemo(() => {
    if (!activeSubject) return [];
    const list: TopicItem[] = [];
    activeSubject.units.forEach((u) => {
      u.chapters.forEach((ch) => {
        ch.topics.forEach((tp) => {
          list.push(tp);
        });
      });
    });
    return list;
  }, [activeSubject]);

  const currentTopicIndex = useMemo(() => {
    return sequentialTopicList.findIndex((t) => t.id === activeTopic?.id);
  }, [sequentialTopicList, activeTopic]);

  const prevTopic = currentTopicIndex > 0 ? sequentialTopicList[currentTopicIndex - 1] : null;
  const nextTopic =
    currentTopicIndex >= 0 && currentTopicIndex < sequentialTopicList.length - 1
      ? sequentialTopicList[currentTopicIndex + 1]
      : null;

  const activeUnitNumber = useMemo(() => {
    if (!activeSubject || !activeTopic) return 1;
    for (const u of activeSubject.units) {
      for (const ch of u.chapters) {
        if (ch.topics.some((tp) => tp.id === activeTopic.id)) {
          return u.unitNumber;
        }
      }
    }
    return 1;
  }, [activeSubject, activeTopic]);

  // Notes deep link query category
  const notesSubjectQuery = useMemo(() => {
    const code = (activeSubject?.code || '').toLowerCase();
    const id = (activeSubject?.id || '').toLowerCase();
    if (code.includes('geo') || id.includes('geo')) return 'geography';
    if (code.includes('his') || id.includes('his')) return 'history';
    if (code.includes('pol') || id.includes('pol')) return 'polscience';
    if (code.includes('soc') || id.includes('soc')) return 'sociology';
    if (code.includes('hin') || id.includes('hin')) return 'hindi';
    if (code.includes('eco') || id.includes('eco')) return 'economics';
    if (code.includes('san') || id.includes('san')) return 'sanskrit';
    if (code.includes('eng') || id.includes('eng')) return 'english';
    if (code.includes('home') || code.includes('hsc') || id.includes('home') || id.includes('hsc')) return 'homescience';
    if (code.includes('draw') || code.includes('drw') || id.includes('draw') || id.includes('drw')) return 'drawing';
    if (code.includes('anth') || code.includes('ant') || id.includes('anth') || id.includes('ant')) return 'anthropology';
    return id || 'geography';
  }, [activeSubject]);

  // URL Deep-Linking: read ?subject=... &topic=... &sem=...
  useEffect(() => {
    const querySub = searchParams.get('subject');
    const queryTopic = searchParams.get('topic');
    const querySem = searchParams.get('sem');

    if (querySem) {
      const parsedSem = parseInt(querySem, 10);
      if (!isNaN(parsedSem)) {
        setSelectedSemester(parsedSem);
      }
    }

    if (querySub && filteredSubjects.length > 0) {
      const q = querySub.toLowerCase();
      const matched = filteredSubjects.find(
        (s) =>
          s.id.toLowerCase() === q ||
          s.code.toLowerCase().includes(q) ||
          (q === 'geography' && s.id.includes('geo')) ||
          (q === 'history' && s.id.includes('his')) ||
          (q === 'polscience' && s.id.includes('pol')) ||
          (q === 'sociology' && s.id.includes('soc')) ||
          (q === 'hindi' && s.id.includes('hin')) ||
          (q === 'economics' && (s.id.includes('eco') || s.code.toLowerCase().includes('eco'))) ||
          (q === 'sanskrit' && (s.id.includes('san') || s.code.toLowerCase().includes('san'))) ||
          (q === 'english' && (s.id.includes('eng') || s.code.toLowerCase().includes('eng'))) ||
          (q === 'homescience' && (s.id.includes('home') || s.id.includes('hsc') || s.code.toLowerCase().includes('hsc'))) ||
          (q === 'drawing' && (s.id.includes('draw') || s.id.includes('drw') || s.code.toLowerCase().includes('drw'))) ||
          (q === 'anthropology' && (s.id.includes('anth') || s.id.includes('ant') || s.code.toLowerCase().includes('ant')))
      );
      if (matched) {
        setSelectedSubjectId(matched.id);
        setSelectedSemester(matched.semester || 1);

        if (queryTopic) {
          for (const u of matched.units) {
            for (const ch of u.chapters) {
              const tp = ch.topics.find((t) => t.id === queryTopic || queryTopic.includes(t.id));
              if (tp) {
                setActiveTopic(tp);
                setCurrentVideoId(sanitizeVideoId(tp.youtubeId));
                setCurrentVideoTitle(lang === 'en' ? tp.titleEn : tp.titleHi);
                setCurrentVideoLang(tp.language);
                setCurrentVideoChannel(tp.instructorEn);
                return;
              }
            }
          }
        }
      }
    } else if (queryTopic && filteredSubjects.length > 0) {
      for (const s of filteredSubjects) {
        for (const u of s.units) {
          for (const ch of u.chapters) {
            const tp = ch.topics.find((t) => t.id === queryTopic || queryTopic.includes(t.id));
            if (tp) {
              setSelectedSubjectId(s.id);
              setSelectedSemester(s.semester || 1);
              setActiveTopic(tp);
              setCurrentVideoId(sanitizeVideoId(tp.youtubeId));
              setCurrentVideoTitle(lang === 'en' ? tp.titleEn : tp.titleHi);
              setCurrentVideoLang(tp.language);
              setCurrentVideoChannel(tp.instructorEn);
              return;
            }
          }
        }
      }
    }
  }, [searchParams, filteredSubjects, lang]);

  // When subject changes, set initial topic if current topic is not in subject
  useEffect(() => {
    if (activeSubject) {
      const isTopicInActiveSub = activeSubject.units.some((u) =>
        u.chapters.some((ch) => ch.topics.some((tp) => tp.id === activeTopic?.id))
      );
      if (!isTopicInActiveSub) {
        const firstTopic = activeSubject.units[0]?.chapters[0]?.topics[0];
        if (firstTopic) {
          setActiveTopic(firstTopic);
          setCurrentVideoId(sanitizeVideoId(firstTopic.youtubeId));
          setCurrentVideoTitle(lang === 'en' ? firstTopic.titleEn : firstTopic.titleHi);
          setCurrentVideoLang(firstTopic.language);
          setCurrentVideoChannel(firstTopic.instructorEn);
        }
      }
    }
  }, [activeSubject, activeTopic, lang]);

  // Manual Override Language Mode for Lectures:
  // 'smart-mix' (Default), 'hinglish', 'english', 'hindi'
  const [languageFilterMode, setLanguageFilterMode] = useState<LanguageFilterMode>('smart-mix');

  // Active selected video for player - initialize with subject-aware sanitized video ID
  const [currentVideoId, setCurrentVideoId] = useState<string>(() =>
    sanitizeVideoId(initialTopic?.youtubeId, activeSubject?.code || activeSubject?.id)
  );
  const [currentVideoTitle, setCurrentVideoTitle] = useState<string>(initialTopic?.titleEn || '');
  const [currentVideoLang, setCurrentVideoLang] = useState<LectureLanguage>(initialTopic?.language || 'Hinglish');
  const [currentVideoChannel, setCurrentVideoChannel] = useState<string>(
    initialTopic?.instructorEn || 'StudyIQ IAS / Prof. Savindra Singh Series'
  );

  // Synchronize player video strictly when activeTopic changes
  useEffect(() => {
    if (activeTopic) {
      const vid = sanitizeVideoId(activeTopic.youtubeId, activeSubject?.code || activeSubject?.id);
      setCurrentVideoId(vid);
      setCurrentVideoTitle(lang === 'en' ? activeTopic.titleEn : activeTopic.titleHi);
      setCurrentVideoLang(activeTopic.language);
      setCurrentVideoChannel(activeTopic.instructorEn);
    }
  }, [activeTopic, activeSubject, lang]);

  // Cinema Mode Toggle state
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);

  // Tabs below the video: 'pyq' | 'notes' | 'flashcards' | 'timer'
  const [activeTab, setActiveTab] = useState<'pyq' | 'notes' | 'flashcards' | 'timer'>('pyq');

  // Active lecture bookmark status
  const [isCurrentLectureSaved, setIsCurrentLectureSaved] = useState<boolean>(false);

  useEffect(() => {
    setIsCurrentLectureSaved(isItemSaved(`lec-${currentVideoId}`));
    const handleVault = () => setIsCurrentLectureSaved(isItemSaved(`lec-${currentVideoId}`));
    window.addEventListener('sdsuv_saved_vault_updated', handleVault);
    return () => window.removeEventListener('sdsuv_saved_vault_updated', handleVault);
  }, [currentVideoId]);

  const handleBookmarkCurrentLecture = () => {
    const isNowSaved = toggleSaveItem({
      id: `lec-${currentVideoId}`,
      type: 'lecture',
      titleEn: currentVideoTitle || activeTopic?.titleEn || 'SDSUV Lecture',
      titleHi: activeTopic?.titleHi || currentVideoTitle,
      subtitleEn: `${activeSubject?.nameEn} • ${activeTopic?.titleEn}`,
      subtitleHi: activeSubject?.nameHi,
      tag: `🎥 ${currentVideoLang} • ${activeTopic?.duration}`,
      duration: activeTopic?.duration,
      channel: currentVideoChannel || activeTopic?.instructorEn,
      youtubeId: currentVideoId,
      linkUrl: `/learn?topic=${activeTopic?.id}`,
      notes: `High-yield topic for ${activeSubject?.code}`,
    });
    setIsCurrentLectureSaved(isNowSaved);
  };

  // PYQ Answer reveal toggles
  const [revealedPYQ, setRevealedPYQ] = useState<Record<string, boolean>>({});

  // Topic Completion states
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({});

  // Study Pomodoro Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(1500); // 25 mins
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // All unified videos for active topic (including custom uploaded lectures)
  const allTopicVideos: LectureVideo[] = useMemo(() => {
    if (!activeTopic) return [];
    const primaryVid: LectureVideo = {
      id: `${activeTopic.id}-primary`,
      titleEn: activeTopic.titleEn,
      titleHi: activeTopic.titleHi,
      channel: activeTopic.instructorEn,
      duration: activeTopic.duration,
      youtubeId: sanitizeVideoId(activeTopic.youtubeId),
      views: 'SDSUV Primary',
      language: activeTopic.language,
      badge: 'Main Lecture',
    };

    const matchingCustom = customLectures
      .filter((l) => l.topicId === activeTopic.id || l.subjectCode === activeSubject?.code)
      .map(
        (l): LectureVideo => ({
          id: l.id,
          titleEn: l.titleEn,
          titleHi: l.titleHi,
          channel: l.channel,
          duration: l.duration,
          youtubeId: sanitizeVideoId(l.youtubeId),
          views: l.views,
          language: l.language,
          badge: l.badge || 'Community Curated',
        })
      );

    return [primaryVid, ...activeTopic.alternativeVideos, ...matchingCustom];
  }, [activeTopic, activeSubject, customLectures]);

  // SMART FILTERING LOGIC
  // Auto-Rule 1: When global top bar is set to English Medium -> allowed = ['English', 'Hinglish']
  // Auto-Rule 2: When global top bar is set to Hindi Medium -> allowed = ['Hindi', 'Hinglish']
  // Manual Override:
  // 'hinglish' -> ['Hinglish']
  // 'english'  -> ['English']
  // 'hindi'    -> ['Hindi']
  const filteredVideos = useMemo(() => {
    let allowed: LectureLanguage[] = [];
    if (languageFilterMode === 'smart-mix') {
      allowed = lang === 'en' ? ['English', 'Hinglish'] : ['Hindi', 'Hinglish'];
    } else if (languageFilterMode === 'hinglish') {
      allowed = ['Hinglish'];
    } else if (languageFilterMode === 'english') {
      allowed = ['English'];
    } else if (languageFilterMode === 'hindi') {
      allowed = ['Hindi'];
    }

    const filtered = allTopicVideos.filter((v) => allowed.includes(v.language));
    return filtered.length > 0 ? filtered : allTopicVideos;
  }, [allTopicVideos, languageFilterMode, lang]);

  // When language filter or active topic changes, ensure the current video is valid
  useEffect(() => {
    if (filteredVideos.length > 0) {
      const isCurrentStillValid = filteredVideos.some((v) => v.youtubeId === currentVideoId);
      if (!isCurrentStillValid) {
        const topCandidate = filteredVideos[0];
        setCurrentVideoId(topCandidate.youtubeId);
        setCurrentVideoTitle(lang === 'en' ? topCandidate.titleEn : topCandidate.titleHi);
        setCurrentVideoLang(topCandidate.language);
        setCurrentVideoChannel(topCandidate.channel);
      }
    }
  }, [filteredVideos, currentVideoId, lang]);

  // Pomodoro timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds]);

  const toggleUnitExpand = (unitNum: number) => {
    setExpandedUnits((prev) => ({ ...prev, [unitNum]: !prev[unitNum] }));
  };

  const handleSelectTopic = (topic: TopicItem) => {
    setActiveTopic(topic);
    const sanitizedId = sanitizeVideoId(topic.youtubeId, activeSubject?.code || activeSubject?.id);
    setCurrentVideoId(sanitizedId);
    setCurrentVideoTitle(lang === 'en' ? topic.titleEn : topic.titleHi);
    setCurrentVideoLang(topic.language);
    setCurrentVideoChannel(topic.instructorEn);
  };

  const handleSelectVideo = (video: LectureVideo) => {
    const sanitizedId = sanitizeVideoId(video.youtubeId, activeSubject?.code || activeSubject?.id);
    setCurrentVideoId(sanitizedId);
    setCurrentVideoTitle(lang === 'en' ? video.titleEn : video.titleHi);
    setCurrentVideoLang(video.language);
    setCurrentVideoChannel(video.channel);
  };

  const toggleTopicComplete = (topicId: string) => {
    setCompletedTopics((prev) => ({ ...prev, [topicId]: !prev[topicId] }));
  };

  const togglePYQReveal = (pyqId: string) => {
    setRevealedPYQ((prev) => ({ ...prev, [pyqId]: !prev[pyqId] }));
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getSubjectLecturesCount = (sub: LearnSubjectData) => {
    let count = 0;
    sub.units.forEach((u) => {
      u.chapters.forEach((ch) => {
        count += ch.topics.length;
      });
    });
    return count;
  };

  const searchedSubjects = useMemo(() => {
    if (!searchQuery.trim()) return semesterSubjects;
    const q = searchQuery.toLowerCase().trim();
    return semesterSubjects.filter(
      (s) =>
        s.code.toLowerCase().includes(q) ||
        s.nameEn.toLowerCase().includes(q) ||
        s.nameHi.toLowerCase().includes(q)
    );
  }, [semesterSubjects, searchQuery]);

  const streamConfig = STREAMS_CONFIG[stream];

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-cyan-400 font-mono text-sm bg-black/60 px-5 py-3 rounded-2xl border border-cyan-500/30">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Loading SDSUV Study Studio...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 himalayan-mesh-bg relative selection:bg-cyan-500 selection:text-black">
      {/* Background Starry Mesh */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-600/10 via-violet-600/10 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Top Floating Glass Navigation Bar */}
      <FloatingNav currentTab="study" lang={lang} setLang={setLang} />

      {/* Main Learning Hub Layout - displaced dynamically for sidebar and expands to full portion when collapsed */}
      <div className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-16 pr-4 sm:pr-6 md:pr-8 relative z-10 ${isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'}`}>
        <main className={`transition-all duration-300 ease-in-out mx-auto space-y-6 w-full ${isCollapsed ? 'max-w-[1720px] lg:px-6 xl:px-8' : 'max-w-7xl lg:px-4'}`}>
          {/* Cinema Mode Backdrop Dimmer */}
          {isCinemaMode && (
            <div
              onClick={() => setIsCinemaMode(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md z-30 transition-opacity duration-300 cursor-pointer"
            />
          )}

          {/* ================================================================ */}
          {/* 3-STEP PROGRESS TRACKER (Subject -> Unit -> Lecture Studio)       */}
          {/* ================================================================ */}
          <div className="p-3 rounded-2xl glass-panel border border-white/10 bg-[#080d22]/90 shadow-md flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3 overflow-x-auto py-0.5">
              {/* Step 1: Subject */}
              <button
                type="button"
                onClick={() => setFlowStep('subject')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                  flowStep === 'subject'
                    ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/30 ring-2 ring-teal-400/40'
                    : 'bg-white/[0.04] text-slate-300 hover:text-cyan-300'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">1</span>
                <span>{lang === 'en' ? 'Choose Subject' : 'विषय चुनें'}</span>
                {flowStep !== 'subject' && <span className="text-[10px] text-emerald-400 font-bold">✓</span>}
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              {/* Step 2: Unit */}
              <button
                type="button"
                onClick={() => setFlowStep('unit')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                  flowStep === 'unit'
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-600/30 ring-2 ring-indigo-400/40'
                    : 'bg-white/[0.04] text-slate-300 hover:text-violet-300'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">2</span>
                <span>{lang === 'en' ? 'Choose Unit' : 'इकाई चुनें'}</span>
                {flowStep === 'player' && <span className="text-[10px] text-emerald-400 font-bold">✓</span>}
              </button>

              <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />

              {/* Step 3: Lectures */}
              <button
                type="button"
                onClick={() => setFlowStep('player')}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center space-x-1.5 cursor-pointer ${
                  flowStep === 'player'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-md shadow-cyan-600/30 ring-2 ring-cyan-400/40'
                    : 'bg-white/[0.04] text-slate-300 hover:text-cyan-300 opacity-70'
                }`}
              >
                <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">3</span>
                <span>{lang === 'en' ? 'Watch Verified Lectures' : 'व्याख्यान देखें'}</span>
              </button>
            </div>

            {/* Quick Breadcrumb indicator badge */}
            <div className="hidden md:flex items-center space-x-2 text-xs font-mono font-bold">
              <span className="px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300">
                {activeSubject?.code}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-violet-950/80 border border-violet-500/30 text-violet-300">
                Unit {activeUnitNumber}
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
              <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-[#080d22]/85 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-teal-400 to-indigo-500" />
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs font-mono font-bold flex items-center space-x-1.5 shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>SDSUV NEP-2020 • Verified Video Hub</span>
                      </span>
                      <span className="px-3 py-1 rounded-full bg-violet-950/80 border border-violet-500/40 text-violet-300 text-xs font-mono font-bold flex items-center space-x-1.5">
                        <Award className="w-3.5 h-3.5 text-violet-400" />
                        <span>Step 1 of 3: Subject Selection</span>
                      </span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                      🎥 {lang === 'en' ? 'Select Subject for Lecture Studio' : 'लेक्चर स्टूडियो हेतु विषय चुनें'}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
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
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search subjects or papers..."
                        className="bg-black/50 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 w-full sm:w-64"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Semester Selector Tabs */}
              <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
                <span className="text-xs font-mono uppercase font-bold text-slate-400 flex items-center space-x-1 mr-2 flex-shrink-0">
                  <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Semester:</span>
                </span>
                {[1, 2, 3, 4, 5, 6].map((sem) => {
                  const isEvenLocked = sem % 2 === 0;

                  if (isEvenLocked) {
                    return (
                      <div
                        key={sem}
                        title={`Semester ${sem} is launching soon. Currently focusing exclusively on Odd Semesters.`}
                        className="px-3 py-1.5 rounded-xl text-xs font-mono font-bold border border-dashed border-amber-500/30 bg-amber-500/[0.04] text-slate-500 cursor-not-allowed flex items-center space-x-1.5 opacity-65 flex-shrink-0 select-none"
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
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all flex-shrink-0 cursor-pointer ${
                        selectedSemester === sem
                          ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 font-black scale-105'
                          : 'bg-white/[0.04] text-slate-300 hover:text-white border border-white/10'
                      }`}
                    >
                      Semester {sem}
                    </button>
                  );
                })}
              </div>

              {/* Subjects Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {searchedSubjects.map((sub) => {
                  const isSelected = sub.id === selectedSubjectId;
                  const lecturesCount = getSubjectLecturesCount(sub);

                  return (
                    <motion.div
                      key={sub.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setSelectedSubjectId(sub.id);
                        setSelectedSemester(sub.semester || selectedSemester);
                        setFlowStep('unit');
                        if (typeof window !== 'undefined') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg group ${
                        isSelected
                          ? 'border-cyan-500/70 bg-gradient-to-b from-cyan-950/40 to-[#080d22] shadow-cyan-900/30 ring-2 ring-cyan-500/30'
                          : 'border-white/10 bg-[#080d22]/85 hover:border-cyan-500/40 hover:bg-[#0c1538]/60'
                      }`}
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-2.5 py-1 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-bold">
                            {sub.code}
                          </span>
                          <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">
                            Sem {sub.semester || selectedSemester}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors leading-tight">
                            {lang === 'en' ? sub.nameEn : sub.nameHi}
                          </h3>
                        </div>

                        <div className="flex items-center space-x-3 text-xs text-slate-400 font-mono pt-1">
                          <span className="flex items-center space-x-1">
                            <Layers className="w-3.5 h-3.5 text-cyan-400" />
                            <span>{sub.units.length} Units</span>
                          </span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <Tv className="w-3.5 h-3.5 text-amber-400" />
                            <span>{lecturesCount} Lectures</span>
                          </span>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
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
              <div className="p-4 sm:p-5 rounded-3xl glass-panel border border-white/10 bg-[#080d22]/85 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => setFlowStep('subject')}
                    className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-200 border border-white/10 transition-colors flex items-center space-x-1.5 text-xs font-bold cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === 'en' ? '← Back to Subjects' : '← विषय सूची'}</span>
                  </button>

                  <div className="h-4 w-[1px] bg-white/10" />

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                      {activeSubject?.code} • Sem {activeSubject?.semester || selectedSemester}
                    </span>
                    <h2 className="text-base sm:text-lg font-black text-white">
                      {lang === 'en' ? activeSubject?.nameEn : activeSubject?.nameHi}
                    </h2>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setFlowStep('subject')}
                    className="px-3.5 py-1.5 rounded-xl bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-900 transition-colors cursor-pointer"
                  >
                    🔄 {lang === 'en' ? 'Change Subject' : 'विषय बदलें'}
                  </button>
                </div>
              </div>

              {/* Unit Selection Header */}
              <div className="space-y-1">
                <h3 className="text-xl font-black text-white">
                  📖 {lang === 'en' ? 'Select Unit to Watch Lectures' : 'व्याख्यान देखने हेतु इकाई का चयन करें'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'en'
                    ? 'Each unit provides verified educational lectures mapped with SDSUV syllabus marks weightage.'
                    : 'प्रत्येक इकाई एसडीएसयूवी पाठ्यक्रम के अंक भार के अनुसार सत्यापित वीडियो व्याख्यानों से सुसज्जित है।'}
                </p>
              </div>

              {/* Units Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {activeSubject?.units.map((u) => {
                  const unitTopics: TopicItem[] = [];
                  u.chapters.forEach((ch) => {
                    ch.topics.forEach((tp) => unitTopics.push(tp));
                  });

                  return (
                    <motion.div
                      key={u.unitNumber}
                      whileHover={{ scale: 1.015 }}
                      whileTap={{ scale: 0.985 }}
                      onClick={() => {
                        setExpandedUnits((prev) => ({ ...prev, [u.unitNumber]: true }));
                        if (unitTopics.length > 0) {
                          handleSelectTopic(unitTopics[0]);
                        }
                        setFlowStep('player');
                        if (typeof window !== 'undefined') {
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                      }}
                      className="p-6 rounded-3xl border border-white/10 bg-[#080d22]/85 hover:border-cyan-400/50 hover:bg-[#0c1538]/60 transition-all cursor-pointer flex flex-col justify-between space-y-4 shadow-lg group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 rounded-xl bg-cyan-950/80 text-cyan-300 border border-cyan-500/40 text-xs font-mono font-black">
                            UNIT {u.unitNumber}
                          </span>
                          <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 px-2.5 py-0.5 rounded-lg border border-emerald-500/30">
                            {u.weightageMarks} Marks • {u.sdsuvCreditWeight}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-black text-white group-hover:text-cyan-300 transition-colors leading-snug">
                          {lang === 'en' ? u.titleEn : u.titleHi}
                        </h4>

                        {/* Topics Preview List */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] font-mono uppercase text-slate-400 font-bold block">
                            {unitTopics.length} Verified Lectures Available:
                          </span>
                          <div className="space-y-1.5">
                            {unitTopics.slice(0, 3).map((tp, idx) => (
                              <div
                                key={tp.id}
                                className="px-2.5 py-1.5 rounded-lg bg-black/40 border border-white/5 text-[11px] text-slate-300 flex items-center justify-between"
                              >
                                <span className="truncate pr-2">
                                  Lec {idx + 1}: {lang === 'en' ? tp.titleEn : tp.titleHi}
                                </span>
                                <span className="text-slate-400 font-mono text-[10px] shrink-0">
                                  {tp.duration}
                                </span>
                              </div>
                            ))}
                            {unitTopics.length > 3 && (
                              <div className="text-[10px] font-mono text-cyan-400 font-bold pl-1">
                                + {unitTopics.length - 3} more lectures in this unit
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-2 flex items-center justify-between border-t border-white/5 text-xs font-bold text-cyan-400 group-hover:text-cyan-300">
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
              {/* Sub-Header: Active Subject Pill & Cinema Mode Controls */}
              <div className="glass-nav rounded-2xl px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 border border-white/10 shadow-lg bg-[#080d22]/85 backdrop-blur-xl">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <button
                    type="button"
                    onClick={() => setFlowStep('subject')}
                    className="p-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-cyan-300 border border-white/10 transition-colors flex items-center space-x-1.5 text-xs font-semibold cursor-pointer"
                    title="Change Subject"
                  >
                    <ArrowLeft className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === 'en' ? '← Subjects' : '← विषय सूची'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFlowStep('unit')}
                    className="px-2.5 py-1 rounded-xl bg-violet-950/60 hover:bg-violet-900/60 text-violet-300 border border-violet-500/30 transition-colors flex items-center space-x-1 text-xs font-semibold cursor-pointer"
                    title="Change Unit"
                  >
                    <span>Unit {activeUnitNumber}</span>
                    <span className="text-[10px] text-slate-400">▾</span>
                  </button>

                  <div className="h-4 w-[1px] bg-white/10 hidden sm:block" />

                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-300">
                      {activeSubject?.code}
                    </span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20 font-mono">
                      Sem {activeSubject?.semester || selectedSemester}
                    </span>
                    <h1 className="text-xs font-bold text-white truncate max-w-[160px] sm:max-w-xs md:max-w-md">
                      {lang === 'en' ? activeSubject?.nameEn : activeSubject?.nameHi}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setFlowStep('unit')}
                    className="hidden sm:flex px-2.5 py-1 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-900/60 transition-colors items-center space-x-1 cursor-pointer"
                  >
                    <span>🔄 {lang === 'en' ? 'Change Unit' : 'इकाई बदलें'}</span>
                  </button>

                  {/* Registered stream badge */}
                  <Link
                    href="/profile"
                    className="px-2.5 py-1 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold hover:bg-cyan-900/60 transition-colors flex items-center space-x-1"
                    title="Click to switch Course or Subjects in Profile"
                  >
                    <span>{streamConfig.shortLabel}</span>
                    <span className="text-[10px] text-slate-400 font-mono">⚙️</span>
                  </Link>

                  {/* Cinema mode quick button */}
                  <button
                    onClick={() => setIsCinemaMode(!isCinemaMode)}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1 ${
                      isCinemaMode
                        ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/30'
                        : 'bg-white/[0.04] text-slate-300 border-white/10 hover:text-white'
                    }`}
                    title={isCinemaMode ? 'Exit Cinema Mode' : 'Enter Cinema Mode'}
                  >
                    <Tv className="w-3.5 h-3.5" />
                    <span className="hidden md:inline">{isCinemaMode ? 'Exit Cinema' : 'Cinema Mode'}</span>
                  </button>
                </div>
              </div>

              {/* 2-Column Learning Layout */}
              <div className={`grid grid-cols-1 ${isCinemaMode ? 'lg:grid-cols-1' : 'lg:grid-cols-12'} gap-6 items-start`}>
          {/* ============================================================== */}
          {/* COLUMN 1: LEFT COLUMN (30% / 4 Cols): Units & Topics List      */}
          {/* ============================================================== */}
          {!isCinemaMode && (
            <div className="lg:col-span-4 space-y-4">
              {/* Semester Filter Tabs (Sem 1 NEP-2020 Foundation vs Others) */}
              <div className="flex items-center space-x-2 pb-1 overflow-x-auto no-scrollbar">
                <span className="text-[10px] font-mono uppercase text-slate-400 font-bold shrink-0">
                  {lang === 'en' ? 'Semester:' : 'समेस्टर:'}
                </span>
                <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-xl border border-white/5 shrink-0">
                  {availableSemesters.map((semNum) => (
                    <button
                      key={semNum}
                      onClick={() => {
                        setSelectedSemester(semNum);
                        const firstInSem = filteredSubjects.find((s) => (s.semester || 1) === semNum);
                        if (firstInSem) setSelectedSubjectId(firstInSem.id);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        selectedSemester === semNum
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md shadow-cyan-500/20'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Sem {semNum} {semNum === 1 && '(NEP-2020)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject Switcher Bar */}
              {semesterSubjects.length > 1 && (
                <div className="glass-panel p-2 rounded-2xl border border-white/10 flex items-center space-x-1.5 overflow-x-auto no-scrollbar">
                  {semesterSubjects.map((sub) => {
                    const isSelected = sub.id === activeSubject?.id;
                    return (
                      <button
                        key={sub.id}
                        onClick={() => setSelectedSubjectId(sub.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                          isSelected
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-md shadow-cyan-500/20 font-black'
                            : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06]'
                        }`}
                      >
                        {sub.code.replace('SDSUV-', '')}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Units & Topics Roadmap Header */}
              <div className="glass-panel p-4 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-extrabold text-white flex items-center space-x-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>{lang === 'en' ? 'Syllabus & Units' : 'इकाई एवं पाठ्यक्रम'}</span>
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {lang === 'en' ? 'Click any topic to start verified lecture' : 'व्याख्यान शुरू करने हेतु किसी भी विषय पर क्लिक करें'}
                  </p>
                </div>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/20 font-bold">
                  {activeSubject?.units.length} Units
                </span>
              </div>

              {/* Simple, Clean Units & Topics Accordion */}
              <div className="space-y-3">
                {activeSubject?.units.map((unit) => {
                  const isExpanded = !!expandedUnits[unit.unitNumber];
                  const hasActiveTopic = unit.chapters.some((ch) =>
                    ch.topics.some((tp) => tp.id === activeTopic?.id)
                  );

                  return (
                    <div
                      key={unit.unitNumber}
                      className={`rounded-2xl glass-panel border transition-all overflow-hidden ${
                        hasActiveTopic
                          ? 'border-cyan-500/50 shadow-lg shadow-cyan-950/50 bg-[#090d21]/90'
                          : 'border-white/10 bg-[#070a18]/70 hover:border-white/20'
                      }`}
                    >
                      {/* Unit Card Header */}
                      <button
                        type="button"
                        onClick={() => toggleUnitExpand(unit.unitNumber)}
                        className="w-full p-3.5 text-left bg-white/[0.02] hover:bg-white/[0.05] transition-colors flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 mb-0.5">
                            <span className="text-cyan-400 font-bold">
                              {lang === 'en' ? `UNIT ${unit.unitNumber}` : `इकाई ${unit.unitNumber}`}
                            </span>
                            <span>•</span>
                            <span className="text-amber-400 font-semibold">{unit.weightageMarks} Marks</span>
                            <span>•</span>
                            <span>{unit.sdsuvCreditWeight}</span>
                          </div>
                          <h3 className="text-xs font-bold text-white leading-snug line-clamp-1">
                            {lang === 'en' ? unit.titleEn : unit.titleHi}
                          </h3>
                        </div>

                        <ChevronDown
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                            isExpanded ? 'rotate-180 text-cyan-400' : ''
                          }`}
                        />
                      </button>

                      {/* Chapter & Topic Breakdown */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="px-3 pb-3 pt-1 border-t border-white/5 space-y-2.5"
                          >
                            {unit.chapters.map((chapter) => (
                              <div key={chapter.chapterNumber} className="space-y-1.5">
                                <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider px-1 pt-1">
                                  {lang === 'en' ? chapter.titleEn : chapter.titleHi}
                                </div>

                                <div className="space-y-1.5">
                                  {chapter.topics.map((topic, topicIdx) => {
                                    const isTopicActive = activeTopic?.id === topic.id;
                                    const isDone = !!completedTopics[topic.id];

                                    return (
                                      <div
                                        key={topic.id}
                                        onClick={() => {
                                          handleSelectTopic(topic);
                                          router.push(`/learn/${activeSubject.id}/${unit.unitNumber}/${topic.id}`);
                                        }}
                                        className={`p-2.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-1.5 group ${
                                          isTopicActive
                                            ? 'bg-gradient-to-r from-cyan-950/70 to-violet-950/50 border-cyan-400 shadow-md shadow-cyan-500/20 ring-1 ring-cyan-400/40'
                                            : 'bg-black/30 border-white/5 hover:border-cyan-500/30 hover:bg-white/[0.04]'
                                        }`}
                                      >
                                        {/* Topic Header & Tag */}
                                        <div className="flex items-center justify-between text-[9px] font-mono">
                                          <div className="flex items-center space-x-1.5">
                                            <span className="px-1.5 py-0.5 rounded bg-cyan-950/90 text-cyan-300 border border-cyan-500/30 font-bold">
                                              Lec {String(topicIdx + 1).padStart(2, '0')}
                                            </span>
                                            <span
                                              className={`px-1.5 py-0.5 rounded font-bold ${
                                                topic.tag.includes('Most Asked')
                                                  ? 'bg-amber-950/80 text-amber-300 border border-amber-500/30'
                                                  : topic.tag.includes('Easy Scoring')
                                                  ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/30'
                                                  : 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/30'
                                              }`}
                                            >
                                              {topic.tag}
                                            </span>
                                          </div>

                                          <span className="text-slate-400 flex items-center space-x-1">
                                            <Clock className="w-2.5 h-2.5" />
                                            <span>{topic.duration}</span>
                                          </span>
                                        </div>

                                        {/* Topic Title */}
                                        <div className="flex items-start justify-between space-x-2">
                                          <p
                                            className={`text-xs font-semibold leading-relaxed transition-colors ${
                                              isTopicActive ? 'text-white' : 'text-slate-300 group-hover:text-cyan-200'
                                            }`}
                                          >
                                            {lang === 'en' ? topic.titleEn : topic.titleHi}
                                          </p>

                                          <button
                                            type="button"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              toggleTopicComplete(topic.id);
                                            }}
                                            className={`shrink-0 p-1 rounded-md transition-colors ${
                                              isDone
                                                ? 'bg-emerald-500 text-black'
                                                : 'text-slate-500 hover:text-emerald-400'
                                            }`}
                                            title={isDone ? 'Topic Completed' : 'Mark Topic Done'}
                                          >
                                            <Check className="w-3 h-3 stroke-[3]" />
                                          </button>
                                        </div>

                                        {/* Action link pill to open dedicated topic lesson page */}
                                        <div className="pt-0.5 flex items-center justify-between text-[10px] text-cyan-400/90 group-hover:text-cyan-300">
                                          <span className="flex items-center space-x-1 font-semibold">
                                            <Sparkles className="w-2.5 h-2.5" />
                                            <span>{lang === 'en' ? 'Open All-in-One Lesson' : 'संपूर्ण पाठ खोलें'}</span>
                                          </span>
                                          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* COLUMN 2: RIGHT COLUMN (70% / 8 Cols): Player & Study Studio   */}
          {/* ============================================================== */}
          <div className={`${isCinemaMode ? 'lg:col-span-12 z-40 relative' : 'lg:col-span-8'} space-y-5`}>
            {/* 1. LANGUAGE SWITCHER (At the very top of Right Column) */}
            <div className="rounded-2xl glass-panel p-3 border border-white/10 bg-[#090d21]/90 shadow-xl space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center space-x-2">
                  <span className="p-1.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                    <Filter className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyan-300 block">
                      {lang === 'en' ? 'Lecture Language Medium' : 'व्याख्यान भाषा माध्यम'}
                    </span>
                    <span className="text-[11px] text-slate-300">
                      {languageFilterMode === 'smart-mix' ? (
                        lang === 'en' ? (
                          <>
                            Smart Mix Active: <strong className="text-cyan-300">English + Hinglish</strong>
                          </>
                        ) : (
                          <>
                            स्मार्ट मिक्स सक्रिय: <strong className="text-amber-300">हिंदी + हिंग्लिश</strong>
                          </>
                        )
                      ) : (
                        <>Selected: <strong className="text-white capitalize">{languageFilterMode.replace('-', ' ')}</strong></>
                      )}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/20 font-bold">
                  {filteredVideos.length} {filteredVideos.length === 1 ? 'Lecture' : 'Lectures'} Available
                </div>
              </div>

              {/* Segmented Control Pill Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-black/50 p-1 rounded-xl border border-white/5">
                {[
                  {
                    id: 'smart-mix' as LanguageFilterMode,
                    labelEn: '✨ Smart Mix (Default)',
                    labelHi: '✨ स्मार्ट मिक्स (स्वतः)',
                    subtitle: lang === 'en' ? 'EN + Hinglish' : 'HI + Hinglish',
                  },
                  {
                    id: 'hinglish' as LanguageFilterMode,
                    labelEn: '🗣️ Hinglish Only',
                    labelHi: '🗣️ केवल हिंग्लिश',
                    subtitle: 'Bilingual Mix',
                  },
                  {
                    id: 'english' as LanguageFilterMode,
                    labelEn: '🇬🇧 Pure English',
                    labelHi: '🇬🇧 शुद्ध अंग्रेजी',
                    subtitle: 'Ivy / NPTEL',
                  },
                  {
                    id: 'hindi' as LanguageFilterMode,
                    labelEn: '🇮🇳 Pure Hindi',
                    labelHi: '🇮🇳 शुद्ध हिंदी',
                    subtitle: 'SDSUV Hindi',
                  },
                ].map((pill) => {
                  const isActive = languageFilterMode === pill.id;
                  return (
                    <button
                      key={pill.id}
                      onClick={() => setLanguageFilterMode(pill.id)}
                      className={`relative py-1.5 px-2 rounded-lg text-xs font-bold transition-all text-center flex flex-col items-center justify-center ${
                        isActive
                          ? 'text-white shadow-lg'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="lectureLangPill"
                          className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-600/40 via-violet-600/40 to-cyan-500/30 border border-cyan-400/50 shadow-md shadow-cyan-500/20"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10 text-[11px] font-bold">
                        {lang === 'en' ? pill.labelEn : pill.labelHi}
                      </span>
                      <span className="relative z-10 text-[9px] font-mono text-slate-400 opacity-80 mt-0.5">
                        {pill.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. LARGE CLEAR HYBRID YOUTUBE VIDEO PLAYER */}
            <div className="space-y-3">
              <HybridVideoPlayer
                videoId={currentVideoId}
                title={currentVideoTitle || (lang === 'en' ? activeTopic?.titleEn : activeTopic?.titleHi) || 'Verified Lecture'}
                channel={currentVideoChannel || activeTopic?.instructorEn || 'Verified Educator'}
                duration={activeTopic?.duration || '24:00'}
                language={currentVideoLang}
                isCinemaMode={isCinemaMode}
                onToggleCinema={() => setIsCinemaMode(!isCinemaMode)}
                lang={lang}
              />

              {/* SEQUENTIAL TOPIC PLAYLIST CONTROLS & UPSC NOTE JUMP */}
              <div className="glass-panel p-3 rounded-2xl border border-white/10 bg-[#090d21]/90 flex flex-wrap items-center justify-between gap-3 shadow-lg">
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => prevTopic && handleSelectTopic(prevTopic)}
                    disabled={!prevTopic}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                      prevTopic
                        ? 'bg-white/[0.05] border-white/15 text-slate-200 hover:text-white hover:bg-white/10 hover:border-cyan-500/30 cursor-pointer'
                        : 'bg-white/[0.02] border-white/5 text-slate-600 cursor-not-allowed opacity-50'
                    }`}
                    title={prevTopic ? (lang === 'en' ? prevTopic.titleEn : prevTopic.titleHi) : 'First Topic'}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Previous Topic' : 'पिछला विषय'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => nextTopic && handleSelectTopic(nextTopic)}
                    disabled={!nextTopic}
                    className={`px-4 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                      nextTopic
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 font-extrabold shadow-md shadow-cyan-500/25 hover:scale-105 cursor-pointer'
                        : 'bg-white/[0.02] border-white/5 text-slate-600 cursor-not-allowed opacity-50'
                    }`}
                    title={nextTopic ? (lang === 'en' ? nextTopic.titleEn : nextTopic.titleHi) : 'Last Topic'}
                  >
                    <span>{lang === 'en' ? 'Next Topic' : 'अगला विषय'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Dedicated 7-Section Topic Lesson Deep-Link */}
                  <Link
                    href={`/learn/${activeSubject?.id || 'his-101'}/${activeUnitNumber || 1}/${activeTopic?.id || 't-his-101'}`}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:brightness-110 text-black text-xs font-black border border-cyan-300 shadow-md shadow-cyan-500/25 flex items-center space-x-1.5 transition-all hover:scale-105"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-black" />
                    <span>{lang === 'en' ? '📖 Dedicated Lesson (7 Sections)' : '📖 संपूर्ण पाठ (7 खंड)'}</span>
                    <ArrowRight className="w-3 h-3 text-black ml-0.5" />
                  </Link>

                  {/* UPSC Master Note Direct Deep-Link */}
                  <Link
                    href={`/notes?subject=${notesSubjectQuery}&topic=${activeTopic?.id}&sem=${activeSubject?.semester || 1}`}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:brightness-110 text-white text-xs font-bold border border-violet-400/40 shadow-md shadow-violet-500/25 flex items-center space-x-1.5 transition-all hover:scale-105"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-cyan-300" />
                    <span>{lang === 'en' ? '📚 Open UPSC Master Note' : '📚 यूपीएससी मास्टर नोट्स खोलें'}</span>
                    <ExternalLink className="w-3 h-3 text-slate-300 ml-0.5" />
                  </Link>
                </div>
              </div>

              {/* Action Toolbar Below Video: Bookmark & Completion */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-1">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/20 text-[10px] font-mono font-bold">
                    {activeTopic?.tag}
                  </span>
                  <span className="text-slate-400 text-[11px] font-mono">
                    {lang === 'en' ? 'Duration:' : 'अवधि:'} {activeTopic?.duration}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleBookmarkCurrentLecture}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                      isCurrentLectureSaved
                        ? 'bg-amber-950 text-amber-300 border-amber-500/50 shadow-md'
                        : 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white'
                    }`}
                    title="Save Lecture to Exam Night Vault"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isCurrentLectureSaved ? 'text-amber-400 fill-current' : 'text-slate-400'}`} />
                    <span>{isCurrentLectureSaved ? 'Saved in Vault' : 'Bookmark Lecture'}</span>
                  </button>

                  <button
                    onClick={() => toggleTopicComplete(activeTopic.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${
                      completedTopics[activeTopic.id]
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50'
                        : 'bg-white/[0.05] border-white/10 text-slate-300 hover:text-white'
                    }`}
                  >
                    <CheckCircle2
                      className={`w-3.5 h-3.5 ${
                        completedTopics[activeTopic.id] ? 'text-emerald-400' : 'text-slate-500'
                      }`}
                    />
                    <span>
                      {completedTopics[activeTopic.id]
                        ? lang === 'en'
                          ? 'Completed'
                          : 'पूर्ण'
                        : lang === 'en'
                        ? 'Mark Done'
                        : 'पूर्ण चिह्नित करें'}
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* 3. MATCHING CURATED LECTURE CARDS CAROUSEL */}
            <div className="rounded-2xl glass-panel p-4 border border-white/10 space-y-3 bg-[#080d22]/80">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    {lang === 'en' ? 'Matching Curated Lectures' : 'चयनित भाषा व्याख्यान समूह'}
                  </h4>
                </div>
                <span className="text-[10px] text-cyan-400 font-mono">
                  {filteredVideos.length} matching {languageFilterMode}
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {filteredVideos.map((vid) => {
                  const isPlaying = vid.youtubeId === currentVideoId;
                  return (
                    <div
                      key={vid.id}
                      onClick={() => handleSelectVideo(vid)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                        isPlaying
                          ? 'bg-cyan-950/60 border-cyan-400 text-white shadow-md shadow-cyan-500/20 ring-2 ring-cyan-500/20'
                          : 'bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/[0.06] hover:border-cyan-500/30'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between text-[10px] font-mono mb-1.5">
                          <span
                            className={`px-1.5 py-0.2 rounded border font-bold ${
                              vid.language === 'English'
                                ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40'
                                : vid.language === 'Hindi'
                                ? 'bg-amber-950/90 text-amber-300 border-amber-500/40'
                                : 'bg-violet-950/90 text-violet-300 border-violet-500/40'
                            }`}
                          >
                            {vid.language}
                          </span>
                          <span className="text-slate-400">{vid.duration}</span>
                        </div>

                        <p className="text-xs font-bold leading-snug line-clamp-2 group-hover:text-cyan-200 transition-colors">
                          {lang === 'en' ? vid.titleEn : vid.titleHi}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2.5 pt-2 border-t border-white/5">
                        <span className="truncate max-w-[120px] font-semibold text-slate-300">{vid.channel}</span>
                        {isPlaying ? (
                          <span className="text-cyan-400 font-bold flex items-center space-x-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                            <span>Playing</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">{vid.views}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. CLEAN TABS BELOW VIDEO: Topic PYQs & Short Notes */}
            <div className="rounded-2xl sm:rounded-3xl glass-panel p-4 sm:p-6 border border-white/10 space-y-4 bg-[#080d22]/90">
              {/* Tab Selector Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div className="flex items-center space-x-1 bg-black/40 p-1 rounded-xl border border-white/5">
                  <button
                    onClick={() => setActiveTab('pyq')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      activeTab === 'pyq'
                        ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Flame className="w-3.5 h-3.5" />
                    <span>Topic PYQs ({activeTopic?.topicPYQs.length || 0})</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('notes')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      activeTab === 'notes'
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Short Notes & Formulas' : 'संक्षिप्त नोट्स एवं सूत्र'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('flashcards')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      activeTab === 'flashcards'
                        ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Flashcards' : 'फ्लैशकार्ड्स'}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('timer')}
                    className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                      activeTab === 'timer'
                        ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Timer className="w-3.5 h-3.5" />
                    <span>{lang === 'en' ? 'Timer' : 'टाइमर'}</span>
                  </button>
                </div>

                {/* Subtitle / context */}
                <div className="text-[11px] font-mono text-slate-400">
                  Topic: <span className="text-cyan-300 font-bold">{activeTopic?.titleEn?.substring(0, 32)}...</span>
                </div>
              </div>

              {/* TAB 1: TOPIC SPECIFIC PYQS */}
              {activeTab === 'pyq' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-slate-300">
                      {lang === 'en'
                        ? 'Real past university questions asked from this exact topic with model answers and marking points.'
                        : 'इस विषय से विगत परीक्षाओं में पूछे गए वास्तविक विश्वविद्यालय प्रश्न एवं आदर्श उत्तर।'}
                    </p>
                    <Link
                      href="/pyqs"
                      className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 whitespace-nowrap"
                    >
                      <span>{lang === 'en' ? 'Full PYQ Vault' : 'संपूर्ण प्रश्न बैंक'}</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="space-y-3.5">
                    {activeTopic?.topicPYQs.map((pyq) => {
                      const isRevealed = !!revealedPYQ[pyq.id];
                      return (
                        <div
                          key={pyq.id}
                          className="rounded-2xl p-4 bg-black/40 border border-white/10 hover:border-amber-500/40 transition-all space-y-3 shadow-sm"
                        >
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30 font-bold">
                              SDSUV {pyq.year} • Sem {pyq.semester}
                            </span>
                            <span className="text-amber-400 font-bold px-2 py-0.5 rounded bg-black/50 border border-amber-500/20">
                              {pyq.marks} {lang === 'en' ? 'Marks Question' : 'अंक प्रश्न'}
                            </span>
                          </div>

                          <div className="space-y-1">
                            <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                              {lang === 'en' ? pyq.questionEn : pyq.questionHi}
                            </p>
                            {lang === 'hi' && (
                              <p className="text-xs text-slate-400 italic">
                                {pyq.questionEn}
                              </p>
                            )}
                          </div>

                          {/* Reveal Answer Toggle */}
                          <div className="pt-1 flex items-center space-x-2">
                            <button
                              onClick={() => togglePYQReveal(pyq.id)}
                              className="px-3.5 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-cyan-300 border border-cyan-500/30 flex items-center space-x-1.5 transition-all"
                            >
                              {isRevealed ? (
                                <>
                                  <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                                  <span>{lang === 'en' ? 'Hide Solution' : 'हल छिपाएं'}</span>
                                </>
                              ) : (
                                <>
                                  <Eye className="w-3.5 h-3.5 text-cyan-400" />
                                  <span>{lang === 'en' ? 'Reveal Model Answer & Rubric' : 'आदर्श उत्तर एवं अंक विभाजन देखें'}</span>
                                </>
                              )}
                            </button>

                            <button
                              onClick={() => {
                                toggleSaveItem({
                                  id: `pyq-${pyq.id}`,
                                  type: 'pyq',
                                  titleEn: pyq.questionEn,
                                  titleHi: pyq.questionHi,
                                  subtitleEn: `${activeSubject?.nameEn} • ${activeTopic?.titleEn} (SDSUV ${pyq.year})`,
                                  subtitleHi: `${activeSubject?.nameHi} (SDSUV ${pyq.year})`,
                                  tag: `🔥 SDSUV ${pyq.year} • ${pyq.marks} Marks`,
                                  duration: `${pyq.marks} Marks`,
                                  channel: `SDSUV Sem ${pyq.semester}`,
                                  linkUrl: `/pyqs?subject=${activeSubject?.code}&topic=${activeTopic?.id}`,
                                  notes: `Model Answer Available: ${pyq.solutionEn?.substring(0, 80)}...`,
                                });
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] text-xs font-semibold text-slate-300 border border-white/10 flex items-center space-x-1"
                              title="Save PYQ to Exam Night Vault"
                            >
                              <Bookmark className="w-3 h-3 text-amber-400" />
                              <span>Save</span>
                            </button>
                          </div>

                          {/* Revealed Solution & Marking Rubric */}
                          <AnimatePresence>
                            {isRevealed && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="pt-3 border-t border-white/10 space-y-2.5 text-xs"
                              >
                                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10 text-xs text-slate-200 leading-relaxed font-sans space-y-1.5">
                                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block font-mono">
                                    Model Answer (As Expected by Examiner):
                                  </span>
                                  <p>{lang === 'en' ? pyq.solutionEn : pyq.solutionHi}</p>
                                </div>

                                <div className="space-y-1.5 p-3 rounded-xl bg-black/30 border border-white/5">
                                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block font-mono">
                                    Examiner Marking Rubric ({pyq.marks} Marks):
                                  </span>
                                  {pyq.markingPoints.map((pt, i) => (
                                    <div key={i} className="flex items-start space-x-2 text-[11px] text-slate-300">
                                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                                      <span>{pt}</span>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 2: QUICK REVISION NOTES */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <p className="text-xs text-slate-300">
                      {lang === 'en'
                        ? 'High-yield revision summary, essential formulas, and core examiner takeaways.'
                        : 'अति-महत्वपूर्ण सारांश, मुख्य गणितीय सूत्र एवं मुख्य परीक्षा बिंदु।'}
                    </p>
                    <button
                      onClick={() => alert(`Downloading High-Yield SDSUV PDF Revision Sheet for: ${activeTopic?.titleEn}`)}
                      className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-cyan-500/20"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                  </div>

                  {/* Summary Banner */}
                  <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans">
                    <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block font-mono mb-1">
                      Quick Concept Summary:
                    </span>
                    {lang === 'en' ? activeTopic?.quickNotes.summaryEn : activeTopic?.quickNotes.summaryHi}
                  </div>

                  {/* Core Formulas */}
                  {activeTopic?.quickNotes.formulas && activeTopic.quickNotes.formulas.length > 0 && (
                    <div className="space-y-2.5">
                      <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block font-mono">
                        {lang === 'en' ? 'Core Mathematical Formulae:' : 'मुख्य गणितीय सूत्र:'}
                      </span>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {activeTopic.quickNotes.formulas.map((f, i) => (
                          <div key={i} className="p-3.5 rounded-xl bg-black/50 border border-white/10 font-mono text-xs space-y-1">
                            <span className="text-slate-400 text-[10px] block font-bold">{f.label}</span>
                            <div className="text-amber-300 font-black text-sm my-1 tracking-wide">{f.formula}</div>
                            <p className="text-[11px] text-slate-300 font-sans">{f.explanation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Core Takeaways */}
                  {activeTopic?.quickNotes.coreTakeaways && (
                    <div className="space-y-2 pt-1">
                      <span className="text-[10px] uppercase font-bold text-violet-300 tracking-wider block font-mono">
                        {lang === 'en' ? 'Key Examiner Takeaways:' : 'मुख्य परीक्षा बिंदु:'}
                      </span>
                      <div className="grid grid-cols-1 gap-2">
                        {activeTopic.quickNotes.coreTakeaways.map((takeaway, i) => (
                          <div key={i} className="flex items-start space-x-2.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-slate-300">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 mt-1 shrink-0" />
                            <span>{takeaway}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: FLASHCARDS */}
              {activeTab === 'flashcards' && (
                <div className="space-y-3">
                  <QuickFlashcardsTab
                    stream={stream}
                    lang={lang}
                    subjectCode={activeSubject?.code}
                  />
                </div>
              )}

              {/* TAB 4: POMODORO TIMER */}
              {activeTab === 'timer' && (
                <div className="p-6 text-center space-y-4 max-w-sm mx-auto">
                  <div className="w-16 h-16 rounded-full bg-violet-950/60 border border-violet-500/40 text-violet-300 flex items-center justify-center mx-auto shadow-lg shadow-violet-500/20">
                    <Timer className="w-8 h-8" />
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      {lang === 'en' ? 'Deep Focus Session' : 'एकाग्रता अध्ययन सत्र'}
                    </h4>
                    <div className="font-mono text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-300 my-2">
                      {formatTimer(timerSeconds)}
                    </div>
                    <p className="text-[11px] text-slate-400">
                      {lang === 'en' ? '25-minute uninterrupted study block for this lecture' : 'इस व्याख्यान के लिए 25 मिनट का अबाधित अध्ययन सत्र'}
                    </p>
                  </div>

                  <div className="flex items-center justify-center space-x-3 pt-2">
                    <button
                      onClick={() => setIsTimerRunning(!isTimerRunning)}
                      className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs flex items-center space-x-1.5 transition-all shadow-md shadow-violet-600/30"
                    >
                      {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                      <span>{isTimerRunning ? 'Pause' : 'Start Focus'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsTimerRunning(false);
                        setTimerSeconds(1500);
                      }}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold"
                      title="Reset Timer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      )}
    </main>
  </div>

      {/* Floating Pomodoro Focus Pod */}
      <PomodoroFocusPod />
    </div>
  );
}

export default function LearnPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center himalayan-mesh-bg">
          <div className="flex items-center space-x-3 text-cyan-400 font-mono text-sm bg-black/60 px-5 py-3 rounded-2xl border border-cyan-500/30">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Loading Study Studio...</span>
          </div>
        </div>
      }
    >
      <LearnPageContent />
    </Suspense>
  );
}
