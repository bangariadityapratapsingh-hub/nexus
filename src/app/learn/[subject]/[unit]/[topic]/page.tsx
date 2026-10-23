'use client';

import React, { useState, useEffect, useMemo, useRef, use, Suspense } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  Volume2,
  Play,
  Pause,
  Square,
  Flame,
  Sparkles,
  BookOpen,
  HelpCircle,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Star,
  Clock,
  Check,
  Send,
  Bot,
  User,
  FileText,
  Award,
  X,
  GraduationCap,
  Copy,
  ListOrdered,
  Compass,
  Tv,
  ChevronRight,
} from 'lucide-react';

import {
  resolveTopicLesson,
  TopicLessonDetail,
  EducatorVideo,
} from '@/data/topicLessonData';
import { getStudentProfile } from '@/lib/studentProfile';
import { LanguageType } from '@/lib/types';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import { useSidebarState } from '@/lib/sidebarState';

function TopicLessonContent() {
  const { isCollapsed } = useSidebarState();
  const routeParams = useParams();
  const router = useRouter();

  // Extract route parameters
  const subjectParam = (routeParams?.subject as string) || 'his-101';
  const unitParam = (routeParams?.unit as string) || '1';
  const topicParam = (routeParams?.topic as string) || 't-his-101';

  // State: Language / Medium (English vs Hindi)
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<LanguageType>('en');
  const [studentMedium, setStudentMedium] = useState<LanguageType>('en');

  // Load student profile medium
  useEffect(() => {
    setMounted(true);
    const profile = getStudentProfile();
    if (profile?.preferredMedium) {
      setLang(profile.preferredMedium);
      setStudentMedium(profile.preferredMedium);
    }
  }, []);

  // Resolve Topic Lesson Details
  const lesson: TopicLessonDetail = useMemo(() => {
    const resolved = resolveTopicLesson(subjectParam, unitParam, topicParam);
    if (resolved) return resolved;
    // Fallback safe dummy lesson if not found
    return {
      topicId: topicParam,
      subjectId: subjectParam,
      subjectCode: 'SDSUV-BA-101',
      subjectNameEn: 'Bachelor of Arts Syllabus',
      subjectNameHi: 'बीए स्नातक पाठ्यक्रम',
      semester: 1,
      unitNumber: parseInt(unitParam.replace(/\D/g, ''), 10) || 1,
      unitTitleEn: `Unit ${unitParam}: Core Disciplinary Foundation`,
      unitTitleHi: `इकाई ${unitParam}: मुख्य सैद्धांतिक आधार`,
      lectureNo: 'Lecture 01',
      titleEn: decodeURIComponent(topicParam).replace(/[-_]/g, ' '),
      titleHi: decodeURIComponent(topicParam).replace(/[-_]/g, ' '),
      upscTag: 'UPSC GS / State PSC / NET',
      sdsuvTag: '🔥 Asked in SDSUV Exam (15 Marks)',
      readTime: '15 min read',
      coreConcept: {
        introEn: 'Foundational topic within the SDSUV undergraduate framework.',
        introHi: 'विश्वविद्यालय पाठ्यक्रम का मुख्य विश्लेषणात्मक विषय।',
        scholarEn: 'Standard University Academic Benchmark',
        scholarHi: 'मानक विश्वविद्यालय संदर्भ ग्रंथ',
        quoteEn: '"Core knowledge requires synthesizing theory with verifiable evidence."',
        quoteHi: '"विषय पर पकड़ बनाने हेतु सैद्धांतिक समझ तथा प्रामाणिक साक्ष्य आवश्यक हैं।"',
      },
      flowchart: {
        titleEn: 'Conceptual Framework & Flowchart',
        titleHi: 'संकल्पनात्मक फ्लोचार्ट',
        columns: [
          {
            titleEn: '1. Primary Framework',
            titleHi: '1. प्राथमिक ढांचा',
            badge: 'Pillar I',
            itemsEn: ['Fundamental Concepts', 'Key Classifications'],
            itemsHi: ['आधारभूत संकल्पना', 'प्रमुख वर्गीकरण'],
          },
        ],
      },
      breakdown: [
        {
          headingEn: '1. Theoretical Framework & Examination Focus',
          headingHi: '1. सैद्धांतिक रूपरेखा एवं परीक्षा रणनीति',
          detailEn: 'Comprehensive conceptual breakdown following SDSUV guidelines.',
          detailHi: 'विश्वविद्यालय दिशा-निर्देशों के अनुरूप विस्तृत व्याख्या।',
          pointsEn: ['Key definitions and historical context.', 'Analytical arguments and counter-points.'],
          pointsHi: ['मुख्य परिभाषाएं एवं ऐतिहासिक परिप्रेक्ष्य।', 'विश्लेषणात्मक तर्क एवं साक्ष्य।'],
        },
      ],
      examBlueprint: {
        step1IntroEn: '3-line definition hook citing recognized scholars.',
        step1IntroHi: 'प्रामाणिक विद्वान का संदर्भ देते हुए 3-पंक्ति प्रस्तावना।',
        step1ScholarEn: 'Standard Reference Text',
        step1ScholarHi: 'मानक संदर्भ ग्रंथ',
        step2DiagramTitleEn: 'Page 1 Flowchart Blueprint',
        step2DiagramTitleHi: 'प्रथम पृष्ठ का फ्लोचार्ट प्रारूप',
        step2DiagramType: 'Two-Branch Classification',
        step2DiagramContentEn: ['Central Concept Box', 'Branch 1: Core Principles', 'Branch 2: Synthesis'],
        step2DiagramContentHi: ['केंद्रीय विषय बॉक्स', 'शाखा 1: मुख्य सिद्धांत', 'शाखा 2: संतुलित निष्कर्ष'],
        step2ExamTipEn: 'Draw on the upper half of page 1 to gain 3 presentation marks.',
        step2ExamTipHi: 'प्रथम पृष्ठ पर स्वच्छ बॉक्स बनाकर 3 अतिरिक्त प्रस्तुति अंक प्राप्त करें।',
        step3SubheadingsEn: ['1. Foundational Premise', '2. Mechanism', '3. Evidence', '4. Critique', '5. Synthesis'],
        step3SubheadingsHi: ['1. मूल आधार', '2. प्रक्रिया', '3. साक्ष्य', '4. आलोचना', '5. निष्कर्ष'],
        step4ConclusionEn: 'Balanced two-line concluding synthesis.',
        step4ConclusionHi: 'दो पंक्तियों में संतुलित व तार्किक निष्कर्ष।',
      },
      commonMistakes: [
        {
          errorEn: 'Writing generic prose without quoting recognized scholars.',
          errorHi: 'बिना किसी विद्वान के नाम के सामान्य निबंध लिख देना।',
          correctionEn: 'Quote at least two scholars and underline core disciplinary terms.',
          correctionHi: 'कम से कम दो विद्वानों के नाम उद्धृत करें और तकनीकी शब्दों को रेखांकित करें।',
          examinerTipEn: 'Examiners award top marks for verified scholarly references.',
          examinerTipHi: 'परीक्षक प्रामाणिक उद्धरणों पर उच्चतम अंक देते हैं।',
        },
      ],
      inlineQuiz: [],
      videos: [],
      pyqs: [],
      topicQuiz: [],
    };
  }, [subjectParam, unitParam, topicParam]);

  // --------------------------------------------------------------------------
  // SECTION 1: SpeechSynthesis State & Handlers
  // --------------------------------------------------------------------------
  const [isPlayingSpeech, setIsPlayingSpeech] = useState(false);
  const [isPausedSpeech, setIsPausedSpeech] = useState(false);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  const startSpeech = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported in this browser.');
      return;
    }
    window.speechSynthesis.cancel();

    const textToRead =
      lang === 'en'
        ? `${lesson.titleEn}. Context and Definition: ${lesson.coreConcept.introEn}. Scholar definition by ${lesson.coreConcept.scholarEn}: ${lesson.coreConcept.quoteEn}. Key examination blueprint: Introduction hook, visual flowchart on page one, five core arguments, and a balanced conclusion.`
        : `${lesson.titleHi}। प्रस्तावना एवं परिभाषा: ${lesson.coreConcept.introHi}। विद्वान संदर्भ: ${lesson.coreConcept.scholarHi}: ${lesson.coreConcept.quoteHi}। मुख्य परीक्षा संरचना: प्रस्तावना, प्रथम पृष्ठ का फ्लोचार्ट, पांच मुख्य उप-शीर्षक, एवं संतुलित निष्कर्ष।`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      setIsPlayingSpeech(false);
      setIsPausedSpeech(false);
    };
    utterance.onerror = () => {
      setIsPlayingSpeech(false);
      setIsPausedSpeech(false);
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
    setIsPlayingSpeech(true);
    setIsPausedSpeech(false);
  };

  const pauseSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlayingSpeech && !isPausedSpeech) {
        window.speechSynthesis.pause();
        setIsPausedSpeech(true);
      } else if (isPausedSpeech) {
        window.speechSynthesis.resume();
        setIsPausedSpeech(false);
      }
    }
  };

  const stopSpeech = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingSpeech(false);
      setIsPausedSpeech(false);
    }
  };

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // --------------------------------------------------------------------------
  // Action Pill 2 & 3: PYQ Modal & AI Tutor Drawer State
  // --------------------------------------------------------------------------
  const [showPYQModal, setShowPYQModal] = useState(false);
  const [showAITutor, setShowAITutor] = useState(false);
  const [aiChatMessages, setAiChatMessages] = useState<
    { sender: 'user' | 'tutor'; text: string; time: string }[]
  >([
    {
      sender: 'tutor',
      text:
        lang === 'en'
          ? `Namaste! I am your SDSUV & UPSC AI Mentor. I am ready to clear any doubt on "${lesson.titleEn}". Ask me about 15-mark answer structures, confusing concepts, or scholar citations!`
          : `नमस्ते! मैं आपका श्री देव सुमन एवं यूपीएससी एआई मेंटर हूँ। "${lesson.titleHi}" विषय पर अपने प्रश्न, 15-अंकों के उत्तर की रूपरेखा या किसी भी जटिल बिंदु के बारे में पूछें।`,
      time: 'Just now',
    },
  ]);
  const [aiInputText, setAiInputText] = useState('');
  const [isAiTyping, setIsAiTyping] = useState(false);

  const handleSendAiPrompt = (promptText: string) => {
    if (!promptText.trim()) return;
    const userMsg = { sender: 'user' as const, text: promptText, time: 'Now' };
    setAiChatMessages((prev) => [...prev, userMsg]);
    setAiInputText('');
    setIsAiTyping(true);

    setTimeout(() => {
      let reply = '';
      const p = promptText.toLowerCase();

      if (p.includes('analogy') || p.includes('simple') || p.includes('सरल')) {
        reply =
          lang === 'en'
            ? `💡 Simple Himalayan Analogy for ${lesson.titleEn}:\nThink of understanding ancient history like exploring the caves of Kedarnath or Kalsi. You cannot guess what happened 2,000 years ago just by hearsay; you need rock inscriptions (immutable pillars) and silver coins (trade receipts) to prove who ruled! Always link physical evidence with literary memory.`
            : `💡 सरल हिमालयी उदाहरण (${lesson.titleHi}):\nप्राचीन इतिहास को समझना कालसी या केदारनाथ के प्राचीन शिला-स्तंभों जैसा है। केवल लोक-कथाओं से काम नहीं चलता; जब तक कालसी का अशोक शिलालेख या कत्यूरी ताम्रपत्र प्रत्यक्ष रूप से न दिखे, कालक्रम प्रमाणित नहीं होता।`;
      } else if (p.includes('15') || p.includes('structure') || p.includes('संरचना')) {
        reply =
          lang === 'en'
            ? `📝 15-Mark SDSUV Blueprint for ${lesson.titleEn}:\n1. Introduction (3 lines): Hook quoting ${lesson.coreConcept.scholarEn}.\n2. Page 1 Box: Draw the 2-Branch Classification diagram immediately.\n3. Body (5 Headings): Underline key terms like Epigraphy, Numismatics, and Historiography.\n4. Conclusion (3 lines): Synthesize empirical evidence with cultural memory.`
            : `📝 15-अंकों का टॉपर्स मॉडल (${lesson.titleHi}):\n1. प्रस्तावना (3 पंक्तियां): ${lesson.coreConcept.scholarHi} की परिभाषा से शुरुआत।\n2. प्रथम पृष्ठ का आरेख: द्वि-शाखीय फ्लोचार्ट शीर्ष पर बनाएं।\n3. मुख्य भाग: 5 रेखांकित उप-शीर्षक (अभिलेख, सिक्के, उत्खनन, देशी व विदेशी साहित्य)।\n4. संतुलित निष्कर्ष: 3 पंक्तियों में अकादमिक सार प्रस्तुत करें।`;
      } else if (p.includes('mistake') || p.includes('गलती')) {
        reply =
          lang === 'en'
            ? `⚠️ Big Warning for ${lesson.titleEn}:\nDo not write an unbroken essay without a Page 1 diagram! SDSUV evaluators specifically search for the diagram and underlined scholar names in the first 2 minutes of checking.`
            : `⚠️ मुख्य परीक्षा चेतावनी (${lesson.titleHi}):\nप्रथम पृष्ठ पर बिना किसी आरेख के केवल निबंध की तरह न लिखें! परीक्षक पहले 2 मिनट में केवल फ्लोचार्ट और रेखांकित विद्वानों के नामों को देखते हैं।`;
      } else {
        reply =
          lang === 'en'
            ? `✨ In ${lesson.titleEn}, university examiners reward accuracy over volume. Always ensure you mention primary sources (archaeological remains & numismatics) alongside secondary historiography. Quote ${lesson.coreConcept.scholarEn} to stand out!`
            : `✨ ${lesson.titleHi} में परीक्षक पृष्ठ भरने के स्थान पर प्रामाणिक शब्दावली को अंक देते हैं। प्राथमिक साक्ष्यों (अभिलेख, मुद्राशास्त्र) को साहित्यिक संदर्भों के साथ प्रस्तुत करें और ${lesson.coreConcept.scholarHi} का संदर्भ दें।`;
      }

      setAiChatMessages((prev) => [...prev, { sender: 'tutor', text: reply, time: 'Just now' }]);
      setIsAiTyping(false);
    }, 900);
  };

  // --------------------------------------------------------------------------
  // SECTION 3: Worked Blueprint Copy State
  // --------------------------------------------------------------------------
  const [copiedBlueprint, setCopiedBlueprint] = useState(false);
  const handleCopyBlueprint = () => {
    const text = `How to Structure a 15-Mark SDSUV Answer: ${lesson.titleEn}\n\nStep 1 (Introduction):\n${lesson.examBlueprint.step1IntroEn}\nScholar: ${lesson.examBlueprint.step1ScholarEn}\n\nStep 2 (Diagram/Flowchart):\n${lesson.examBlueprint.step2DiagramTitleEn}\nItems: ${lesson.examBlueprint.step2DiagramContentEn.join(' -> ')}\nTip: ${lesson.examBlueprint.step2ExamTipEn}\n\nStep 3 (Core Arguments):\n${lesson.examBlueprint.step3SubheadingsEn.join('\n')}\n\nStep 4 (Conclusion):\n${lesson.examBlueprint.step4ConclusionEn}`;
    navigator.clipboard.writeText(text);
    setCopiedBlueprint(true);
    setTimeout(() => setCopiedBlueprint(false), 2500);
  };

  // --------------------------------------------------------------------------
  // SECTION 5: Inline Quiz State (3 Quick Questions)
  // --------------------------------------------------------------------------
  const [selectedInlineAnswers, setSelectedInlineAnswers] = useState<Record<string, number>>({});
  const handleSelectInlineOption = (qId: string, optIndex: number) => {
    setSelectedInlineAnswers((prev) => ({
      ...prev,
      [qId]: optIndex,
    }));
  };

  // --------------------------------------------------------------------------
  // SECTION 6: Multi-Educator Video Theater & Ratings
  // --------------------------------------------------------------------------
  // SECTION 6: Multi-Educator Video Theater & Live Fetcher State
  // --------------------------------------------------------------------------
  const [showVideoTheater, setShowVideoTheater] = useState(true);
  const [videoFilter, setVideoFilter] = useState<'mix' | 'hinglish' | 'pure_hindi' | 'pure_english'>('mix');
  const [sortRatingDesc, setSortRatingDesc] = useState(true);
  const [fetchedLectures, setFetchedLectures] = useState<EducatorVideo[]>(lesson.videos || []);
  const [isLoadingLectures, setIsLoadingLectures] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<EducatorVideo | null>(
    lesson.videos && lesson.videos.length > 0 ? lesson.videos[0] : null
  );

  // Student ratings & upvotes saved in localStorage
  const [userVideoRatings, setUserVideoRatings] = useState<Record<string, number>>({});
  const [userUpvotes, setUserUpvotes] = useState<Record<string, boolean>>({});
  const [ratingModalVideo, setRatingModalVideo] = useState<EducatorVideo | null>(null);
  const [hoverStar, setHoverStar] = useState<number>(0);

  // Load user ratings & upvotes from localStorage
  useEffect(() => {
    try {
      const storedRatings = localStorage.getItem('sdsuv_educator_ratings_v2');
      if (storedRatings) setUserVideoRatings(JSON.parse(storedRatings));
      const storedUpvotes = localStorage.getItem('sdsuv_educator_upvotes_v2');
      if (storedUpvotes) setUserUpvotes(JSON.parse(storedUpvotes));
    } catch {}
  }, []);

  // Fetch real YouTube lectures automatically for every topic across all subjects & semesters
  useEffect(() => {
    let isCancelled = false;

    const loadLectures = async () => {
      setIsLoadingLectures(true);
      try {
        const queryParams = new URLSearchParams({
          topic: lesson.titleEn,
          subject: lesson.subjectNameEn,
          medium: lang === 'hi' ? 'Hindi' : 'English',
          filter: videoFilter,
        });

        const res = await fetch(`/api/youtube-lectures?${queryParams.toString()}`);
        if (!res.ok) throw new Error('API fetch failed');
        const json = await res.json();

        if (!isCancelled && json.lectures && json.lectures.length > 0) {
          const mapped: EducatorVideo[] = json.lectures.map((l: any) => ({
            id: l.id || `yt-${l.videoId}`,
            titleEn: l.title,
            titleHi: l.title,
            channel: l.channelName,
            educator: l.educator || l.channelName,
            youtubeId: l.videoId,
            duration: l.duration,
            language:
              l.language ||
              (videoFilter === 'pure_hindi'
                ? 'Hindi'
                : videoFilter === 'pure_english'
                ? 'English'
                : 'Hinglish'),
            views: l.views,
            starRating: l.starRating,
            ratingCount: l.ratingCount,
            badge: l.badge || 'Verified Lecture',
            searchFallback:
              l.searchFallback ||
              `https://www.youtube.com/results?search_query=${encodeURIComponent(l.title)}`,
          }));

          setFetchedLectures(mapped);
          setSelectedVideo(mapped[0]);
        }
      } catch (err) {
        console.warn('Fallback to curated lesson videos:', err);
        if (!isCancelled && lesson.videos && lesson.videos.length > 0) {
          setFetchedLectures(lesson.videos);
          setSelectedVideo(lesson.videos[0]);
        }
      } finally {
        if (!isCancelled) setIsLoadingLectures(false);
      }
    };

    loadLectures();

    return () => {
      isCancelled = true;
    };
  }, [lesson.titleEn, lesson.subjectNameEn, lang, videoFilter]);

  const handleToggleUpvote = (videoId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const isCurrentlyUpvoted = !!userUpvotes[videoId];
    const updated = { ...userUpvotes, [videoId]: !isCurrentlyUpvoted };
    setUserUpvotes(updated);
    try {
      localStorage.setItem('sdsuv_educator_upvotes_v2', JSON.stringify(updated));
    } catch {}
    if (!isCurrentlyUpvoted) {
      confetti({ particleCount: 30, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleSaveRating = (videoId: string, stars: number) => {
    const updated = { ...userVideoRatings, [videoId]: stars };
    setUserVideoRatings(updated);
    try {
      localStorage.setItem('sdsuv_educator_ratings_v2', JSON.stringify(updated));
    } catch {}
    setRatingModalVideo(null);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.7 } });
  };

  // Filtered and sorted videos with dynamic user rating calculations
  const displayedVideos = useMemo(() => {
    const list = fetchedLectures.map((v) => {
      const userRating = userVideoRatings[v.youtubeId];
      const hasUpvoted = !!userUpvotes[v.youtubeId];
      let effectiveRating = v.starRating;
      let effectiveCount = v.ratingCount;

      if (userRating) {
        effectiveRating = Number(
          ((v.starRating * v.ratingCount + userRating) / (v.ratingCount + 1)).toFixed(2)
        );
        effectiveCount += 1;
      }
      if (hasUpvoted) {
        effectiveCount += 1;
      }

      return {
        ...v,
        effectiveRating,
        effectiveCount,
        hasUpvoted,
        userRating,
      };
    });

    // Sort by Star Rating if enabled
    if (sortRatingDesc) {
      list.sort((a, b) => b.effectiveRating - a.effectiveRating);
    }

    return list;
  }, [fetchedLectures, userVideoRatings, userUpvotes, sortRatingDesc]);

  // --------------------------------------------------------------------------
  // SECTION 7: Bottom Topic Master Quiz (+20 XP) State
  // --------------------------------------------------------------------------
  const [showMasterQuiz, setShowMasterQuiz] = useState(false);
  const [masterQuizAnswers, setMasterQuizAnswers] = useState<Record<string, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [earnedXP, setEarnedXP] = useState(0);

  const handleSubmitMasterQuiz = () => {
    setQuizSubmitted(true);
    let correctCount = 0;
    lesson.topicQuiz.forEach((q) => {
      if (masterQuizAnswers[q.id] === q.correctIndex) {
        correctCount += 1;
      }
    });

    if (correctCount >= 3) {
      setEarnedXP(20);
      confetti({ particleCount: 80, spread: 70, origin: { y: 0.8 } });

      // Save topic completion to localStorage
      try {
        const stored = localStorage.getItem('sdsuv_completed_topics');
        const map = stored ? JSON.parse(stored) : {};
        map[lesson.topicId] = true;
        localStorage.setItem('sdsuv_completed_topics', JSON.stringify(map));
      } catch {}
    } else {
      setEarnedXP(5);
    }
  };

  const resetMasterQuiz = () => {
    setMasterQuizAnswers({});
    setQuizSubmitted(false);
    setEarnedXP(0);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center">
        <div className="flex items-center space-x-3 text-cyan-400 font-mono text-sm bg-black/60 px-5 py-3 rounded-2xl border border-cyan-500/30">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span>Loading SDSUV Topic Lesson...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <FloatingNav currentTab="study" lang={lang} setLang={setLang} />

      {/* Decorative Himalayan Atmosphere Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-96 right-1/4 w-[450px] h-[450px] bg-violet-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-20 left-1/3 w-[600px] h-[400px] bg-emerald-600/8 rounded-full blur-[160px]" />
      </div>

      {/* Dynamic Content Wrapper for Sidebar Displacement */}
      <div className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-20 relative z-10 ${isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'}`}>
        <main className={`relative z-10 flex-1 w-full mx-auto px-4 sm:px-6 lg:px-8 space-y-8 transition-all duration-300 ${isCollapsed ? 'max-w-[1720px]' : 'max-w-6xl'}`}>
        {/* ================================================================== */}
        {/* 1. TOP ACTION BAR                                                  */}
        {/* ================================================================== */}
        <section className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 sm:p-5 shadow-2xl shadow-cyan-950/20">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Breadcrumb Navigation */}
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-medium text-slate-400 overflow-x-auto whitespace-nowrap pb-1 md:pb-0">
              <Link
                href="/learn"
                className="hover:text-cyan-400 transition-colors flex items-center space-x-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Learn</span>
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <Link
                href={`/learn?subject=${lesson.subjectId}`}
                className="hover:text-cyan-400 transition-colors text-slate-300"
              >
                {lang === 'en' ? lesson.subjectNameEn : lesson.subjectNameHi}
              </Link>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="text-slate-400">
                Unit {lesson.unitNumber}
              </span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="text-cyan-300 font-bold bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-md">
                {lesson.lectureNo}
              </span>
            </div>

            {/* Language / Medium Switcher */}
            <div className="flex items-center space-x-2 shrink-0 self-end md:self-auto">
              <div className="bg-black/40 border border-white/10 rounded-xl p-1 flex items-center text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    lang === 'en'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang('hi')}
                  className={`px-3 py-1 rounded-lg transition-all ${
                    lang === 'hi'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  हिंदी
                </button>
              </div>
            </div>
          </div>

          {/* Action Pills Bar */}
          <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2.5">
              {/* 🔊 Audio Reader Pill */}
              <div className="flex items-center bg-gradient-to-r from-violet-950/60 to-cyan-950/60 border border-violet-500/30 rounded-xl p-1 text-xs font-semibold">
                {!isPlayingSpeech ? (
                  <button
                    type="button"
                    onClick={startSpeech}
                    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-violet-600/30 hover:bg-violet-600/50 text-violet-200 transition-all border border-violet-400/20 shadow-sm"
                  >
                    <Volume2 className="w-4 h-4 text-violet-400" />
                    <span>
                      {lang === 'en' ? '🔊 Listen to Lesson' : '🔊 पाठ सुनें'}
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center space-x-1.5 px-2 py-1">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                    </span>
                    <span className="text-[11px] text-cyan-300 font-mono pr-1">
                      {isPausedSpeech ? 'Paused' : 'Playing Audio'}
                    </span>
                    <button
                      type="button"
                      onClick={pauseSpeech}
                      className="p-1 rounded-md bg-white/10 hover:bg-white/20 text-white"
                      title={isPausedSpeech ? 'Resume' : 'Pause'}
                    >
                      {isPausedSpeech ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={stopSpeech}
                      className="p-1 rounded-md bg-rose-500/20 hover:bg-rose-500/40 text-rose-300"
                      title="Stop"
                    >
                      <Square className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {/* 🔥 Unit PYQs Pill */}
              <button
                type="button"
                onClick={() => setShowPYQModal(true)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-amber-950/40 hover:bg-amber-950/70 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all shadow-md shadow-amber-950/20 group"
              >
                <Flame className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
                <span>
                  {lang === 'en' ? '🔥 Unit PYQs' : '🔥 विगत वर्ष प्रश्न'}
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-amber-500/20 text-[10px] text-amber-200 border border-amber-500/30 font-mono">
                  {lesson.pyqs?.length || 2}
                </span>
              </button>

              {/* ✨ Ask AI Tutor Pill */}
              <button
                type="button"
                onClick={() => setShowAITutor(true)}
                className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-950/60 to-blue-950/60 hover:from-cyan-900/60 hover:to-blue-900/60 border border-cyan-400/40 text-cyan-300 text-xs font-semibold transition-all shadow-md shadow-cyan-950/30 group"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>
                  {lang === 'en' ? '✨ Ask AI Tutor' : '✨ एआई ट्यूटर से पूछें'}
                </span>
              </button>
            </div>

            {/* Read Time & High-Yield Badge */}
            <div className="flex items-center space-x-2 text-[11px] font-mono text-slate-400">
              <span className="px-2 py-0.5 rounded-md bg-black/40 border border-white/10 flex items-center space-x-1">
                <Clock className="w-3 h-3 text-cyan-400" />
                <span>{lesson.readTime}</span>
              </span>
              <span className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-bold">
                {lesson.upscTag}
              </span>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 2. UPSC-GRADE STRUCTURED CONCEPT NOTES (BILINGUAL)                 */}
        {/* ================================================================== */}
        <section className="space-y-6">
          {/* Section Header */}
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-full border border-cyan-500/20">
                <BookOpen className="w-3 h-3" />
                <span>Section 02 • UPSC-Grade Structured Notes</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {lang === 'en' ? lesson.titleEn : lesson.titleHi}
              </h1>
            </div>

            <div className="hidden sm:block">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-950/60 border border-rose-500/30 text-rose-300">
                {lesson.sdsuvTag}
              </span>
            </div>
          </div>

          {/* Card A: Core Concept & Context + Scholar Quote */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-all pointer-events-none" />

            <div className="flex items-center space-x-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                {lang === 'en' ? 'Core Concept & Historical Context' : 'प्रस्तावना, परिभाषा एवं ऐतिहासिक परिप्रेक्ष्य'}
              </h2>
            </div>

            <p className="text-slate-300 leading-relaxed text-sm sm:text-base font-normal">
              {lang === 'en' ? lesson.coreConcept.introEn : lesson.coreConcept.introHi}
            </p>

            {/* Scholar Citation Box */}
            <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-violet-950/50 via-slate-900/60 to-black/60 border border-violet-500/30 shadow-inner flex items-start space-x-3.5">
              <div className="p-2 rounded-lg bg-violet-600/20 text-violet-300 border border-violet-400/20 shrink-0 mt-0.5">
                <GraduationCap className="w-5 h-5 text-violet-400" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-violet-300 uppercase tracking-wider flex items-center space-x-2">
                  <span>{lang === 'en' ? 'Seminal Scholar Definition' : 'प्रामाणिक विद्वान परिभाषा एवं संदर्भ'}</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-mono text-[11px]">
                    {lang === 'en' ? lesson.coreConcept.scholarEn : lesson.coreConcept.scholarHi}
                  </span>
                </div>
                <blockquote className="text-xs sm:text-sm text-slate-200 italic leading-relaxed">
                  {lang === 'en' ? lesson.coreConcept.quoteEn : lesson.coreConcept.quoteHi}
                </blockquote>
              </div>
            </div>
          </div>

          {/* Card B: Visual Flowchart / Mindmap Box */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Compass className="w-4 h-4 text-cyan-400" />
                <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                  {lang === 'en' ? lesson.flowchart.titleEn : lesson.flowchart.titleHi}
                </h2>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-400 border border-white/5">
                {lang === 'en' ? 'Page 1 Exam Flowchart' : 'परीक्षा फ्लोचार्ट मॉडल'}
              </span>
            </div>

            {/* Multi-Column Diagram Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lesson.flowchart.columns.map((col, idx) => (
                <div
                  key={idx}
                  className="bg-black/40 border border-cyan-500/20 rounded-xl p-4 space-y-3 hover:border-cyan-400/40 transition-all shadow-md shadow-cyan-950/20"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <h3 className="text-xs font-bold text-cyan-200 uppercase tracking-wide">
                      {lang === 'en' ? col.titleEn : col.titleHi}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                      {col.badge || `Branch ${idx + 1}`}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {(lang === 'en' ? col.itemsEn : col.itemsHi).map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start space-x-2 text-xs text-slate-300 leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 mt-1.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Card C: Detailed Topic Breakdown */}
          <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center space-x-2 pb-3 border-b border-white/5">
              <ListOrdered className="w-4 h-4 text-cyan-400" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-cyan-300">
                {lang === 'en' ? 'Detailed Academic Breakdown (High-Yield Sub-Topics)' : 'विस्तृत विषयवार विश्लेषण एवं मुख्य बिंदु'}
              </h2>
            </div>

            <div className="space-y-6">
              {lesson.breakdown.map((item, idx) => (
                <div key={idx} className="space-y-3 pb-5 border-b border-white/5 last:border-b-0 last:pb-0">
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center space-x-2">
                    <span className="text-cyan-400 font-mono text-sm">#{idx + 1}</span>
                    <span>{lang === 'en' ? item.headingEn : item.headingHi}</span>
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {lang === 'en' ? item.detailEn : item.detailHi}
                  </p>

                  {/* Bullet points */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    {(lang === 'en' ? item.pointsEn : item.pointsHi).map((pt, ptIdx) => (
                      <div
                        key={ptIdx}
                        className="bg-black/30 border border-white/5 rounded-lg p-2.5 flex items-start space-x-2 text-xs text-slate-200"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 mt-0.5 shrink-0" />
                        <span className="leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>

                  {/* Highlight callout if present */}
                  {(item.highlightEn || item.highlightHi) && (
                    <div className="mt-2 p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-200 flex items-center space-x-2">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{lang === 'en' ? item.highlightEn : item.highlightHi}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 3. 'WORKED EXAM BLUEPRINT' CARD (15-MARK SDSUV ANSWER STRUCTURE)    */}
        {/* ================================================================== */}
        <section className="bg-gradient-to-br from-indigo-950/40 via-slate-900/60 to-black/60 backdrop-blur-xl border-2 border-indigo-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-indigo-950/20 space-y-6 relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-500/20">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                <FileText className="w-3 h-3" />
                <span>Section 03 • SDSUV University Model Blueprint</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center space-x-2">
                <span>📝 Worked Exam Blueprint: 15-Mark Model Structure</span>
              </h2>
              <p className="text-xs text-slate-300">
                {lang === 'en'
                  ? 'Guaranteed 12–14/15 format recommended by SDSUV evaluators & civil services rankers'
                  : 'श्री देव सुमन वि.वि. परीक्षकों द्वारा अनुमोदित 12-14 अंक दिलाने वाली मानक 4-चरणीय संरचना'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyBlueprint}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/50 text-indigo-200 border border-indigo-400/30 text-xs font-semibold transition-all shadow-sm shrink-0 self-start sm:self-auto"
            >
              {copiedBlueprint ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Blueprint</span>
                </>
              )}
            </button>
          </div>

          {/* 4 Exact Blueprint Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Step 1: Introduction Hook */}
            <div className="bg-black/40 border border-indigo-500/20 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono">
                  Step 1 (Introduction)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/20">
                  3-Line Hook & Scholar
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {lang === 'en'
                  ? lesson.examBlueprint.step1IntroEn
                  : lesson.examBlueprint.step1IntroHi}
              </p>
              <div className="p-2 rounded bg-indigo-950/60 border border-indigo-500/20 text-[11px] text-indigo-200">
                <span className="font-bold underline text-white">Underline:</span>{' '}
                {lang === 'en'
                  ? lesson.examBlueprint.step1ScholarEn
                  : lesson.examBlueprint.step1ScholarHi}
              </div>
            </div>

            {/* Step 2: Diagram / Flowchart */}
            <div className="bg-black/40 border border-indigo-500/20 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono">
                  Step 2 (Diagram / Flowchart)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                  Draw on Page 1 (+3 Marks)
                </span>
              </div>
              <div className="p-3 rounded-lg border-2 border-dashed border-indigo-400/40 bg-indigo-950/20 text-xs space-y-1.5 text-center">
                <div className="font-bold text-cyan-300">
                  {lang === 'en'
                    ? lesson.examBlueprint.step2DiagramTitleEn
                    : lesson.examBlueprint.step2DiagramTitleHi}
                </div>
                <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px] text-slate-300 pt-1 font-mono">
                  {(lang === 'en'
                    ? lesson.examBlueprint.step2DiagramContentEn
                    : lesson.examBlueprint.step2DiagramContentHi
                  ).map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-black/60 border border-white/10"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-[11px] text-slate-400 italic">
                💡{' '}
                {lang === 'en'
                  ? lesson.examBlueprint.step2ExamTipEn
                  : lesson.examBlueprint.step2ExamTipHi}
              </p>
            </div>

            {/* Step 3: Core Arguments */}
            <div className="bg-black/40 border border-indigo-500/20 rounded-xl p-4 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono">
                  Step 3 (Core Arguments)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-500/20">
                  5 Sub-Headings to Underline
                </span>
              </div>
              <div className="space-y-1.5">
                {(lang === 'en'
                  ? lesson.examBlueprint.step3SubheadingsEn
                  : lesson.examBlueprint.step3SubheadingsHi
                ).map((sub, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-2 text-xs text-slate-200 bg-white/[0.02] p-1.5 rounded"
                  >
                    <span className="font-mono text-cyan-400 font-bold">{idx + 1}.</span>
                    <span className="font-semibold underline decoration-indigo-400/60 decoration-1">
                      {sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 4: Conclusion */}
            <div className="bg-black/40 border border-indigo-500/20 rounded-xl p-4 space-y-2.5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider font-mono">
                    Step 4 (Conclusion)
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20">
                    Balanced Academic Synthesis
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic border-l-2 border-indigo-400 pl-3">
                  "{lang === 'en'
                    ? lesson.examBlueprint.step4ConclusionEn
                    : lesson.examBlueprint.step4ConclusionHi}"
                </p>
              </div>
              <div className="pt-3 text-[11px] text-indigo-300/80 font-mono">
                ✓ Never leave an answer without an explicit "Conclusion / निष्कर्ष" paragraph.
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* 4. '⚠️ COMMON MISTAKES IN EXAMS' WARNING CARD                      */}
        {/* ================================================================== */}
        <section className="bg-gradient-to-br from-amber-950/30 via-slate-900/60 to-black/60 backdrop-blur-xl border-2 border-amber-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-amber-950/20 space-y-5">
          <div className="flex items-center space-x-3 pb-3 border-b border-amber-500/20">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300">
              <AlertTriangle className="w-5 h-5 text-amber-400 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-400">
                Section 04 • Critical Examiner Warnings
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                ⚠️ Common Mistakes in University & UPSC Exams
              </h2>
            </div>
          </div>

          {/* 3 Specific Mistakes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lesson.commonMistakes.map((m, idx) => (
              <div
                key={idx}
                className="bg-black/50 border border-amber-500/20 rounded-xl p-4 space-y-3 flex flex-col justify-between hover:border-amber-500/40 transition-all"
              >
                <div className="space-y-2">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-rose-400">
                    <XCircle className="w-4 h-4 shrink-0" />
                    <span>Mistake #{idx + 1}</span>
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed">
                    {lang === 'en' ? m.errorEn : m.errorHi}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/5">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Topper Correction</span>
                  </div>
                  <p className="text-xs text-emerald-200/90 leading-relaxed font-medium">
                    {lang === 'en' ? m.correctionEn : m.correctionHi}
                  </p>
                </div>

                <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/20 text-[11px] text-amber-200 leading-relaxed">
                  <span className="font-bold text-amber-300">💡 Examiner Tip:</span>{' '}
                  {lang === 'en' ? m.examinerTipEn : m.examinerTipHi}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================== */}
        {/* 5. 'CHECK YOURSELF' INSTANT INLINE QUIZ (3 QUESTIONS)              */}
        {/* ================================================================== */}
        <section className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-7 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-white/5">
            <div className="space-y-1">
              <div className="inline-flex items-center space-x-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <HelpCircle className="w-3 h-3" />
                <span>Section 05 • Check Yourself Instant Quiz</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                🧠 Check Yourself: 3 Quick Concept Verification Questions
              </h2>
            </div>

            <div className="text-xs font-mono text-slate-400">
              Immediate feedback on click
            </div>
          </div>

          <div className="space-y-6">
            {lesson.inlineQuiz.map((q, qIndex) => {
              const selectedOpt = selectedInlineAnswers[q.id];
              const isAnswered = selectedOpt !== undefined;
              const isCorrect = isAnswered && selectedOpt === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="bg-black/40 border border-white/5 rounded-xl p-4 sm:p-5 space-y-3.5"
                >
                  <div className="flex items-start space-x-3">
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold mt-0.5">
                      Q{qIndex + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                      {lang === 'en' ? q.questionEn : q.questionHi}
                    </h3>
                  </div>

                  {/* 4 Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {(lang === 'en' ? q.optionsEn : q.optionsHi).map((opt, optIdx) => {
                      let btnStyle =
                        'bg-white/[0.03] border-white/10 text-slate-300 hover:border-cyan-500/40 hover:bg-white/[0.06]';

                      if (isAnswered) {
                        if (optIdx === q.correctIndex) {
                          // Correct Option Highlight in Emerald Green
                          btnStyle =
                            'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400 shadow-md shadow-emerald-950/40';
                        } else if (optIdx === selectedOpt && !isCorrect) {
                          // Wrong Selected Option Highlight in Rose Red
                          btnStyle =
                            'bg-rose-950/80 border-rose-400 text-rose-200 ring-1 ring-rose-400 shadow-md shadow-rose-950/40';
                        } else {
                          btnStyle = 'opacity-40 bg-black/20 border-white/5 text-slate-500';
                        }
                      }

                      return (
                        <button
                          key={optIdx}
                          type="button"
                          disabled={isAnswered}
                          onClick={() => handleSelectInlineOption(q.id, optIdx)}
                          className={`p-3 rounded-xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start space-x-2.5 ${btnStyle}`}
                        >
                          <span className="font-mono text-xs uppercase px-1.5 py-0.5 rounded bg-black/40 text-slate-400 shrink-0">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-snug">{opt}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Instant 1-Line Explanation */}
                  <AnimatePresence>
                    {isAnswered && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-3 rounded-lg border text-xs leading-relaxed flex items-start space-x-2 ${
                          isCorrect
                            ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                            : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
                        }`}
                      >
                        {isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                        )}
                        <div>
                          <span className="font-bold">
                            {isCorrect ? 'Correct! ' : 'Explanation: '}
                          </span>
                          <span>{lang === 'en' ? q.explanationEn : q.explanationHi}</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </section>

        {/* ================================================================== */}
        {/* 6. 'WATCH A LECTURE' — MULTI-EDUCATOR RATED VIDEO GRID             */}
        {/* ================================================================== */}
        {/* ================================================================== */}
        {/* 6. DEDICATED LECTURE STUDIO REDIRECTION CARD                       */}
        {/* ================================================================== */}
        <section className="bg-gradient-to-r from-red-950/40 via-[#0e1026]/90 to-amber-950/40 border-2 border-red-500/30 rounded-2xl p-6 sm:p-7 shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-red-400 bg-red-950/60 px-2.5 py-0.5 rounded border border-red-500/30">
              <Tv className="w-3 h-3" />
              <span>Section 06 • Lecture Studio Integration</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              🎬 Watch Lecture on "{lang === 'en' ? lesson.titleEn : lesson.titleHi}"
            </h2>
            <p className="text-xs text-slate-300">
              {lang === 'en'
                ? 'Watch the 8-card curated top educator rated video grid, multi-language breakdown, and full theater player in Lecture Studio.'
                : 'लेक्चर स्टूडियो में 8 शीर्ष शिक्षकों के सत्यापित वीडियो, बहुभाषी विकल्प एवं सिनेमा मोड में व्याख्यान देखें।'}
            </p>
          </div>

          <Link
            href={`/lectures?subject=${lesson.subjectId}&unit=${lesson.unitNumber}&topic=${lesson.topicId}`}
            className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 hover:scale-105 active:scale-95 transition-all flex items-center space-x-2.5 shrink-0 self-start sm:self-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>🎬 Watch Lecture on "{lang === 'en' ? lesson.titleEn : lesson.titleHi}" →</span>
          </Link>
        </section>

        {/* ================================================================== */}
        {/* 7. BOTTOM 'TAKE THE TOPIC QUIZ' & 'NEXT TOPIC →' BAR               */}
        {/* ================================================================== */}
        <section className="space-y-5">
          {/* Green / Cyan Master Topic Quiz Card */}
          <div className="bg-gradient-to-r from-emerald-950/60 via-slate-900/80 to-cyan-950/60 border-2 border-emerald-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-emerald-950/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="inline-flex items-center space-x-2 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/80 px-2.5 py-0.5 rounded border border-emerald-500/30">
                  <Award className="w-3.5 h-3.5" />
                  <span>Section 07 • Topic Master Assessment</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  🎯 TAKE THE TOPIC QUIZ (5 Questions • Earn +20 XP)
                </h3>
                <p className="text-xs text-slate-300">
                  Test your mastery against university & civil services benchmark questions to earn XP and unlock the next lesson.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowMasterQuiz(!showMasterQuiz)}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 transition-all shrink-0 self-start sm:self-auto flex items-center space-x-2"
              >
                <span>{showMasterQuiz ? 'Hide Quiz' : 'Start Topic Quiz (+20 XP)'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Master Quiz Expansion */}
            <AnimatePresence>
              {showMasterQuiz && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-emerald-500/20 space-y-5"
                >
                  {lesson.topicQuiz.map((q, idx) => {
                    const sel = masterQuizAnswers[q.id];
                    const hasSubmitted = quizSubmitted;
                    const isRight = sel === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className="bg-black/40 border border-white/5 rounded-xl p-4 space-y-3"
                      >
                        <div className="flex items-start space-x-2.5 text-xs sm:text-sm font-semibold text-white">
                          <span className="font-mono text-emerald-400 font-bold">
                            Q{idx + 1}.
                          </span>
                          <span>{lang === 'en' ? q.questionEn : q.questionHi}</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                          {(lang === 'en' ? q.optionsEn : q.optionsHi).map((opt, optIdx) => {
                            let style = 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.05]';
                            if (sel === optIdx) {
                              style = 'bg-emerald-950/80 border-emerald-400 text-emerald-200 ring-1 ring-emerald-400';
                            }
                            if (hasSubmitted) {
                              if (optIdx === q.correctIndex) {
                                style = 'bg-emerald-950 border-emerald-400 text-emerald-200';
                              } else if (sel === optIdx && !isRight) {
                                style = 'bg-rose-950 border-rose-400 text-rose-200';
                              }
                            }

                            return (
                              <button
                                key={optIdx}
                                type="button"
                                disabled={hasSubmitted}
                                onClick={() =>
                                  setMasterQuizAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                                }
                                className={`p-2.5 rounded-lg border text-left text-xs font-medium transition-all ${style}`}
                              >
                                <span className="font-mono text-[10px] mr-2 px-1 rounded bg-black/40 text-slate-400">
                                  {String.fromCharCode(65 + optIdx)}
                                </span>
                                <span>{opt}</span>
                              </button>
                            );
                          })}
                        </div>

                        {hasSubmitted && (
                          <div
                            className={`p-2.5 rounded text-xs leading-relaxed ${
                              isRight
                                ? 'bg-emerald-950/40 text-emerald-200'
                                : 'bg-rose-950/40 text-rose-200'
                            }`}
                          >
                            <span className="font-bold">
                              {isRight ? '✓ Correct! ' : '✗ Key Takeaway: '}
                            </span>
                            <span>{lang === 'en' ? q.explanationEn : q.explanationHi}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Submission & Score Summary */}
                  <div className="pt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {!quizSubmitted ? (
                      <button
                        type="button"
                        onClick={handleSubmitMasterQuiz}
                        disabled={Object.keys(masterQuizAnswers).length < lesson.topicQuiz.length}
                        className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-extrabold text-xs uppercase tracking-wider transition-all"
                      >
                        Submit Answers & Claim XP
                      </button>
                    ) : (
                      <div className="flex items-center space-x-3">
                        <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center space-x-2">
                          <Award className="w-4 h-4 text-emerald-400" />
                          <span>
                            Earned +{earnedXP} XP! (
                            {
                              lesson.topicQuiz.filter(
                                (q) => masterQuizAnswers[q.id] === q.correctIndex
                              ).length
                            }
                            /{lesson.topicQuiz.length} Correct)
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={resetMasterQuiz}
                          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                        >
                          Retry
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sequential Next / Previous Topic Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            {lesson.prevTopic ? (
              <Link
                href={`/learn/${lesson.prevTopic.subjectId}/${lesson.prevTopic.unitNumber}/${lesson.prevTopic.topicId}`}
                className="w-full sm:w-auto flex items-center space-x-2 px-5 py-3 rounded-xl bg-black/40 hover:bg-white/[0.06] border border-white/10 text-slate-300 hover:text-white transition-all text-xs font-semibold"
              >
                <ArrowLeft className="w-4 h-4 text-cyan-400" />
                <div className="text-left">
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Previous Topic</div>
                  <div className="font-bold truncate max-w-[220px]">
                    {lang === 'en' ? lesson.prevTopic.titleEn : lesson.prevTopic.titleHi}
                  </div>
                </div>
              </Link>
            ) : (
              <div />
            )}

            {lesson.nextTopic ? (
              <Link
                href={`/learn/${lesson.nextTopic.subjectId}/${lesson.nextTopic.unitNumber}/${lesson.nextTopic.topicId}`}
                className="w-full sm:w-auto flex items-center justify-end space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-500/20 transition-all"
              >
                <div className="text-right">
                  <div className="text-[10px] text-cyan-200 uppercase font-mono">Next Topic</div>
                  <div className="font-bold truncate max-w-[240px]">
                    {lang === 'en' ? lesson.nextTopic.titleEn : lesson.nextTopic.titleHi}
                  </div>
                </div>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                href="/learn"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-bold text-xs uppercase tracking-wider transition-all"
              >
                <span>Return to Learn Syllabus →</span>
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>

      {/* ==================================================================== */}
      {/* MODAL 1: UNIT PYQS MODAL                                             */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {showPYQModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white">
                    🔥 SDSUV Past Paper Questions (PYQs)
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPYQModal(false)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-300">
                Questions asked from "{lang === 'en' ? lesson.titleEn : lesson.titleHi}" in Sri Dev Suman Uttarakhand University examinations:
              </p>

              <div className="space-y-4">
                {(lesson.pyqs && lesson.pyqs.length > 0
                  ? lesson.pyqs
                  : [
                      {
                        id: 'pyq-def-1',
                        year: 2024,
                        semester: 1,
                        marks: 15,
                        examType: 'Long Answer (दीर्घ उत्तरीय)',
                        questionEn: `Discuss the primary significance of ${lesson.titleEn} with relevant empirical examples.`,
                        questionHi: `${lesson.titleHi} के मुख्य सिद्धांतों एवं अनुप्रयोगों का विस्तृत विवेचन कीजिए।`,
                        solutionEn:
                          'Follow the 4-step blueprint: introduction quoting verified scholars, page 1 classification diagram, 5 analytical headings, and balanced conclusion.',
                        solutionHi:
                          '4-चरणीय मॉडल का पालन करें: प्रामाणिक विद्वान परिभाषा, प्रथम पृष्ठ पर स्वच्छ आरेख, 5 रेखांकित उप-शीर्षक एवं संतुलित निष्कर्ष।',
                        markingPoints: [
                          '3 Marks: Concise Definition and Scholar Hook',
                          '3 Marks: Page 1 Classification Flowchart',
                          '6 Marks: Analytical Depth & Underlined Technical Points',
                          '3 Marks: Balanced Academic Conclusion',
                        ],
                      },
                    ]
                ).map((pyq) => (
                  <div
                    key={pyq.id}
                    className="bg-black/50 border border-amber-500/20 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-bold">
                        {pyq.year} SDSUV Exam • {pyq.marks} Marks
                      </span>
                      <span className="text-slate-400">{pyq.examType}</span>
                    </div>

                    <h4 className="text-sm font-bold text-white leading-relaxed">
                      {lang === 'en' ? pyq.questionEn : pyq.questionHi}
                    </h4>

                    {/* Marking Points */}
                    <div className="p-3 rounded-lg bg-amber-950/30 border border-amber-500/20 space-y-1.5 text-xs">
                      <div className="font-bold text-amber-300 uppercase tracking-wider text-[10px]">
                        Marking Rubric (परीक्षक अंक विभाजन):
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-slate-300 text-[11px]">
                        {pyq.markingPoints.map((mp, idx) => (
                          <div key={idx} className="flex items-center space-x-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span>{mp}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Model Answer Guideline */}
                    <div className="text-xs text-slate-300 border-l-2 border-amber-400 pl-3 italic">
                      <span className="font-semibold text-white">Topper Strategy:</span>{' '}
                      {lang === 'en' ? pyq.solutionEn : pyq.solutionHi}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* DRAWER 2: ASK AI TUTOR INTERACTIVE DRAWER                            */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {showAITutor && (
          <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-slate-900 border-l border-cyan-500/30 h-full w-full max-w-lg p-5 flex flex-col justify-between shadow-2xl"
            >
              {/* Header */}
              <div className="pb-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    <Sparkles className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">
                      ✨ SDSUV & UPSC AI Mentor
                    </h3>
                    <p className="text-[11px] text-cyan-300 font-mono truncate max-w-[280px]">
                      {lang === 'en' ? lesson.titleEn : lesson.titleHi}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAITutor(false)}
                  className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Thread */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3 pr-1">
                {aiChatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start space-x-2.5 ${
                      msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                        msg.sender === 'user'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-violet-600/30 text-violet-300 border border-violet-500/30'
                      }`}
                    >
                      {msg.sender === 'user' ? (
                        <User className="w-3.5 h-3.5" />
                      ) : (
                        <Bot className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <div
                      className={`max-w-[85%] rounded-xl p-3 text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-cyan-950/80 border border-cyan-500/40 text-cyan-100'
                          : 'bg-black/60 border border-white/10 text-slate-200'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.text}</div>
                    </div>
                  </div>
                ))}

                {isAiTyping && (
                  <div className="flex items-center space-x-2 text-xs text-cyan-400 font-mono italic">
                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                    <span>Analyzing syllabus and framing topper advice...</span>
                  </div>
                )}
              </div>

              {/* Prompt Chips & Input */}
              <div className="pt-3 border-t border-white/10 space-y-3">
                {/* High Yield Quick Prompt Chips */}
                <div className="flex flex-wrap gap-1.5 text-[11px]">
                  <button
                    type="button"
                    onClick={() =>
                      handleSendAiPrompt(
                        lang === 'en'
                          ? 'Explain this topic in simple terms with an everyday Himalayan analogy'
                          : 'इस विषय को एक सरल हिमालयी उदाहरण के साथ समझाइए'
                      )
                    }
                    className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 text-left"
                  >
                    🏔️ {lang === 'en' ? 'Simple Himalayan Analogy' : 'सरल हिमालयी उदाहरण'}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSendAiPrompt(
                        lang === 'en'
                          ? 'How to structure a 15-mark SDSUV answer for this topic?'
                          : 'इस विषय पर 15 अंक का उत्तर कैसे संरचित करें?'
                      )
                    }
                    className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 text-left"
                  >
                    📝 15-Mark Blueprint
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleSendAiPrompt(
                        lang === 'en'
                          ? 'What are the most common mistakes in exams for this?'
                          : 'परीक्षा में छात्र इस विषय पर क्या सामान्य गलतियां करते हैं?'
                      )
                    }
                    className="px-2 py-1 rounded-md bg-white/5 hover:bg-white/10 text-slate-300 border border-white/5 text-left"
                  >
                    ⚠️ Avoid Exam Mistakes
                  </button>
                </div>

                {/* Input Bar */}
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={aiInputText}
                    onChange={(e) => setAiInputText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSendAiPrompt(aiInputText);
                    }}
                    placeholder={
                      lang === 'en'
                        ? 'Ask doubt on this lesson...'
                        : 'इस विषय पर प्रश्न पूछें...'
                    }
                    className="flex-1 bg-black/60 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                  <button
                    type="button"
                    onClick={() => handleSendAiPrompt(aiInputText)}
                    className="p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ==================================================================== */}
      {/* MODAL 3: RATE EDUCATOR LECTURE MODAL                                 */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {ratingModalVideo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>

              <div>
                <h3 className="text-base font-bold text-white">
                  Rate Educator Lecture
                </h3>
                <p className="text-xs text-cyan-300 font-semibold mt-1">
                  {ratingModalVideo.channel}
                </p>
                <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">
                  {ratingModalVideo.titleEn}
                </p>
              </div>

              {/* 5-Star Interactive Rating */}
              <div className="flex items-center justify-center space-x-2 py-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onMouseEnter={() => setHoverStar(star)}
                    onMouseLeave={() => setHoverStar(0)}
                    onClick={() => handleSaveRating(ratingModalVideo.youtubeId, star)}
                    className="p-1 transition-transform hover:scale-125 focus:outline-none"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        (hoverStar || userVideoRatings[ratingModalVideo.youtubeId] || 0) >= star
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-600'
                      }`}
                    />
                  </button>
                ))}
              </div>

              <p className="text-[11px] text-slate-400">
                Help fellow SDSUV students identify the best explanations!
              </p>

              <button
                type="button"
                onClick={() => setRatingModalVideo(null)}
                className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default function TopicLessonPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-10 h-10 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
            <p className="text-xs font-mono text-cyan-300">Loading SDSUV Topic Lesson...</p>
          </div>
        </div>
      }
    >
      <TopicLessonContent />
    </Suspense>
  );
}
