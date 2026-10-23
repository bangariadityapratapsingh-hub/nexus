'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  CheckCircle2,
  FileText,
  Headphones,
  Sparkles,
  ArrowRight,
  Clock,
  BookOpenCheck,
  Zap,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import { StudentProfile } from '@/lib/studentProfile';
import { isHindiSubject } from '@/components/SubjectGalaxy';

export interface StudyPodData {
  currentSubjectEn: string;
  currentSubjectHi: string;
  currentUnitEn: string;
  currentUnitHi: string;
  lessonTitleEn: string;
  lessonTitleHi: string;
  progressPercentage: number;
  completedHours: number;
  totalHours: number;
  completedLectures: number;
  totalLectures: number;
  unitNumber: number;
  quickSummaryEn: string;
  quickSummaryHi: string;
  nextTopicEn: string;
  nextTopicHi: string;
  estimatedMinutesLeft: number;
  notesUrl: string;
  learnUrl: string;
  isResumed?: boolean;
}

const STARTER_STUDY_PODS: Record<string, StudyPodData> = {
  hindi: {
    currentSubjectEn: 'हिन्दी साहित्य: आधुनिक कविता एवं छायावाद (SDSUV-HIN-201)',
    currentSubjectHi: 'हिन्दी साहित्य: आधुनिक कविता एवं छायावाद (SDSUV-HIN-201)',
    currentUnitEn: 'इकाई 1: भारतेंदु एवं द्विवेदी युगीन कविता',
    currentUnitHi: 'इकाई 1: भारतेंदु एवं द्विवेदी युगीन कविता',
    lessonTitleEn: 'राष्ट्रीय चेतना का उदय एवं आधुनिक हिंदी काव्य की शुरुआत',
    lessonTitleHi: 'राष्ट्रीय चेतना का उदय एवं आधुनिक हिंदी काव्य की शुरुआत',
    progressPercentage: 0,
    completedHours: 0,
    totalHours: 20,
    completedLectures: 0,
    totalLectures: 18,
    unitNumber: 1,
    quickSummaryEn: 'भारतेंदु युग से आधुनिक हिंदी कविता का प्रस्थान और मैथिलीशरण गुप्त की राष्ट्रीय चेतना का अध्ययन।',
    quickSummaryHi: 'भारतेंदु युग से आधुनिक हिंदी कविता का प्रस्थान और मैथिलीशरण गुप्त की राष्ट्रीय चेतना का अध्ययन।',
    nextTopicEn: 'मैथिलीशरण गुप्त: साकेत एवं राष्ट्रप्रेम',
    nextTopicHi: 'मैथिलीशरण गुप्त: साकेत एवं राष्ट्रप्रेम',
    estimatedMinutesLeft: 30,
    notesUrl: '/notes?subject=hindi&unit=1',
    learnUrl: '/lectures?subject=hindi&unit=1',
  },
  history: {
    currentSubjectEn: 'History: Ancient India & Uttarakhand Dynasties (SDSUV-HIS-201)',
    currentSubjectHi: 'इतिहास: प्राचीन भारत एवं उत्तराखंड के राजवंश (SDSUV-HIS-201)',
    currentUnitEn: 'Unit 1: Indus Valley Civilization & Vedic Society',
    currentUnitHi: 'इकाई 1: सिंधु घाटी सभ्यता एवं वैदिक समाज',
    lessonTitleEn: 'Harappan Town Planning, Great Bath & Maritime Trade',
    lessonTitleHi: 'हड़प्पा नगर नियोजन, स्नानागार एवं व्यापारिक तंत्र',
    progressPercentage: 0,
    completedHours: 0,
    totalHours: 24,
    completedLectures: 0,
    totalLectures: 20,
    unitNumber: 1,
    quickSummaryEn: 'Grid pattern town planning, advanced drainage networks, and Lothal maritime dockyard.',
    quickSummaryHi: 'ग्रिड पद्धति पर आधारित नगर नियोजन, उन्नत जल निकासी व्यवस्था एवं लोथल गोदीबाड़ा।',
    nextTopicEn: 'Vedic Society: Rigvedic Polity, Sabha & Samiti',
    nextTopicHi: 'वैदिक समाज: ऋग्वैदिक शासन, सभा एवं समिति',
    estimatedMinutesLeft: 35,
    notesUrl: '/notes?subject=history&unit=1',
    learnUrl: '/lectures?subject=history&unit=1',
  },
  geography: {
    currentSubjectEn: 'Geography: Physical Geography & Himalayan Terrain (SDSUV-GEO-201)',
    currentSubjectHi: 'भूगोल: भौतिक भूगोल एवं हिमालयी भूरूपिकी (SDSUV-GEO-201)',
    currentUnitEn: 'Unit 1: Earth Interior, Continental Drift & Plate Tectonics',
    currentUnitHi: 'इकाई 1: पृथ्वी की आंतरिक संरचना, महाद्वीपीय विस्थापन एवं प्लेट विवर्तनिकी',
    lessonTitleEn: 'Origin of Earth & Solar System: Nebular vs Big Bang Models',
    lessonTitleHi: 'पृथ्वी एवं सौरमंडल की उत्पत्ति: निहारिका बनाम बिग बैंग मॉडल',
    progressPercentage: 0,
    completedHours: 0,
    totalHours: 22,
    completedLectures: 0,
    totalLectures: 19,
    unitNumber: 1,
    quickSummaryEn: 'Comparative analysis of Kant-Laplace nebular hypothesis and modern cosmic expansion theory.',
    quickSummaryHi: 'कांट-लाप्लास निहारिका परिकल्पना एवं आधुनिक महाविस्फोट सिद्धांत का तुलनात्मक अध्ययन।',
    nextTopicEn: 'Geological Time Scale & Evolutionary Eras of Earth',
    nextTopicHi: 'भूवैज्ञानिक समय सारणी एवं पृथ्वी के विकास के महाकल्प व युग',
    estimatedMinutesLeft: 28,
    notesUrl: '/notes?subject=geography&unit=1',
    learnUrl: '/lectures?subject=geography&unit=1',
  },
  polscience: {
    currentSubjectEn: 'Political Science: Indian Government & Politics (SDSUV-POL-201)',
    currentSubjectHi: 'राजनीति विज्ञान: भारतीय शासन एवं राजनीति (SDSUV-POL-201)',
    currentUnitEn: 'Unit 1: Constitutional Assembly & Preamble Philosophy',
    currentUnitHi: 'इकाई 1: संविधान सभा एवं प्रस्तावना दर्शन',
    lessonTitleEn: 'Constituent Assembly Debates, Objectives Resolution & Basic Structure',
    lessonTitleHi: 'संविधान सभा विमर्श, उद्देश्य प्रस्ताव एवं मूल ढांचा सिद्धांत',
    progressPercentage: 0,
    completedHours: 0,
    totalHours: 26,
    completedLectures: 0,
    totalLectures: 21,
    unitNumber: 1,
    quickSummaryEn: 'Historical evolution of the Indian Constitution and foundational democratic values of the Preamble.',
    quickSummaryHi: 'भारतीय संविधान का ऐतिहासिक विकास एवं प्रस्तावना के मूलभूत लोकतांत्रिक मूल्य।',
    nextTopicEn: 'Fundamental Rights (Articles 12-35) & Judicial Safeguards',
    nextTopicHi: 'मौलिक अधिकार (अनुच्छेद 12-35) एवं न्यायिक संरक्षण',
    estimatedMinutesLeft: 30,
    notesUrl: '/notes?subject=polscience&unit=1',
    learnUrl: '/lectures?subject=polscience&unit=1',
  },
  sociology: {
    currentSubjectEn: 'Sociology: Indian Society & Himalayan Social Structures (SDSUV-SOC-201)',
    currentSubjectHi: 'समाजशास्त्र: भारतीय समाज एवं हिमालयी सामाजिक संरचनाएं (SDSUV-SOC-201)',
    currentUnitEn: 'Unit 1: Structure of Indian Society & Unity in Diversity',
    currentUnitHi: 'इकाई 1: भारतीय समाज की संरचना एवं विविधता में एकता',
    lessonTitleEn: 'Linguistic, Religious & Regional Pluralism in Indian Society',
    lessonTitleHi: 'भारतीय समाज में भाषाई, धार्मिक एवं क्षेत्रीय बहुलवाद',
    progressPercentage: 0,
    completedHours: 0,
    totalHours: 20,
    completedLectures: 0,
    totalLectures: 18,
    unitNumber: 1,
    quickSummaryEn: 'Exploration of composite Indian culture, kinship networks and unity amidst ethnic diversities.',
    quickSummaryHi: 'साझा भारतीय संस्कृति, नातेदारी व्यवस्था एवं विविधताओं के मध्य एकता का समाजशास्त्रीय अध्ययन।',
    nextTopicEn: 'Caste Dynamics, Varna Model & Sanskritization',
    nextTopicHi: 'जाति गतिशीलता, वर्ण मॉडल एवं संस्कृतीकरण',
    estimatedMinutesLeft: 25,
    notesUrl: '/notes?subject=sociology&unit=1',
    learnUrl: '/lectures?subject=sociology&unit=1',
  },
  economics: {
    currentSubjectEn: 'Economics: Microeconomics & Uttarakhand Economy (SDSUV-ECO-201)',
    currentSubjectHi: 'अर्थशास्त्र: व्यष्टि अर्थशास्त्र एवं उत्तराखंड अर्थव्यवस्था (SDSUV-ECO-201)',
    currentUnitEn: 'Unit 1: Consumer Behavior & Demand Elasticity',
    currentUnitHi: 'इकाई 1: उपभोक्ता व्यवहार एवं मांग की लोच',
    lessonTitleEn: 'Law of Diminishing Marginal Utility & Indifference Curves',
    lessonTitleHi: 'ह्रासमान सीमांत उपयोगिता नियम एवं उदासीनता वक्र विश्लेषण',
    progressPercentage: 0,
    completedHours: 0,
    totalHours: 20,
    completedLectures: 0,
    totalLectures: 17,
    unitNumber: 1,
    quickSummaryEn: 'Consumer equilibrium determination using marginal rate of substitution (MRS_xy) and budget lines.',
    quickSummaryHi: 'प्रतिस्थापन की सीमांत दर (MRS_xy) एवं बजट रेखा द्वारा उपभोक्ता संतुलन का निर्धारण।',
    nextTopicEn: 'Price, Income & Cross Elasticity of Demand',
    nextTopicHi: 'मांग की कीमत, आय एवं तिरछी लोच',
    estimatedMinutesLeft: 30,
    notesUrl: '/notes?subject=economics&unit=1',
    learnUrl: '/lectures?subject=economics&unit=1',
  },
  english: {
    currentSubjectEn: 'English Literature: Modern Prose, Poetry & Movements (SDSUV-ENG-201)',
    currentSubjectHi: 'अंग्रेजी साहित्य: आधुनिक गद्य, पद्य एवं धाराएं (SDSUV-ENG-201)',
    currentUnitEn: 'Unit 1: Romantic Revival & Nature Poetry',
    currentUnitHi: 'इकाई 1: स्वच्छंदतावाद पुनर्जागरण एवं प्रकृति काव्य',
    lessonTitleEn: 'Wordsworth: Tintern Abbey & Pantheistic Nature Vision',
    lessonTitleHi: 'वर्ड्सवर्थ: टिंटर्न एबे एवं सर्वेश्वरवादी प्रकृति दर्शन',
    progressPercentage: 0,
    completedHours: 0,
    totalHours: 20,
    completedLectures: 0,
    totalLectures: 16,
    unitNumber: 1,
    quickSummaryEn: 'Exploration of William Wordsworth recollection of tranquil emotion and spiritual connection with nature.',
    quickSummaryHi: 'प्रकृति के साथ आध्यात्मिक संबंध एवं वर्ड्सवर्थ की रोमांटिक काव्य चेतना।',
    nextTopicEn: 'John Keats: Ode on a Grecian Urn & Negative Capability',
    nextTopicHi: 'जॉन कीट्स: ओड ऑन अ ग्रेशियन अर्न',
    estimatedMinutesLeft: 30,
    notesUrl: '/notes?subject=english&unit=1',
    learnUrl: '/lectures?subject=english&unit=1',
  },
  physics: {
    currentSubjectEn: 'Physics: Wave Optics & Quantum Mechanics (SDSUV-PHY-201)',
    currentSubjectHi: 'भौतिक विज्ञान: तरंग प्रकाशिकी एवं क्वांटम भौतिकी (SDSUV-PHY-201)',
    currentUnitEn: 'Unit 1: Interference & Diffraction in Thin Films',
    currentUnitHi: 'इकाई 1: पतली फिल्मों में व्यतिकरण एवं विवर्तन',
    lessonTitleEn: "Newton's Rings & Michelson Interferometer Applications",
    lessonTitleHi: "न्यूटन वलय एवं माइकेल्सन व्यतिकरणमापी",
    progressPercentage: 0,
    completedHours: 0,
    totalHours: 25,
    completedLectures: 0,
    totalLectures: 19,
    unitNumber: 1,
    quickSummaryEn: 'Condition for constructive and destructive interference in thin reflected wedges.',
    quickSummaryHi: 'पतली फिल्मों में संपोषी एवं विनाशी व्यतिकरण की शर्तें।',
    nextTopicEn: 'Fraunhofer Diffraction at a Single Slit',
    nextTopicHi: 'एकल झिरी पर फ्राउनहोफर विवर्तन',
    estimatedMinutesLeft: 30,
    notesUrl: '/notes?subject=physics&unit=1',
    learnUrl: '/lectures?subject=physics&unit=1',
  },
  botany: {
    currentSubjectEn: 'Botany: Plant Physiology & Biochemistry (SDSUV-BOT-201)',
    currentSubjectHi: 'वनस्पति विज्ञान: पादप कार्यिकी एवं जैव रसायन (SDSUV-BOT-201)',
    currentUnitEn: 'Unit 1: Plant-Water Relations & Transpiration',
    currentUnitHi: 'इकाई 1: पादप-जल संबंध एवं वाष्पोत्सर्जन',
    lessonTitleEn: 'Water Potential, Osmosis & Stomatal Mechanism (K+ Pump)',
    lessonTitleHi: 'जल विभव, परासरण एवं रंध्रीय क्रियाविधि (K+ पंप सिद्धांत)',
    progressPercentage: 0,
    completedHours: 0,
    totalHours: 24,
    completedLectures: 0,
    totalLectures: 16,
    unitNumber: 1,
    quickSummaryEn: 'Role of potassium ions in stomatal turgidity and water potential components.',
    quickSummaryHi: 'रंध्रों के खुलने और बंद होने में पोटेशियम आयनों की भूमिका।',
    nextTopicEn: 'Cohesion-Tension Theory of Ascent of Sap',
    nextTopicHi: 'रसारोहण का संसंजन-तनाव सिद्धांत',
    estimatedMinutesLeft: 25,
    notesUrl: '/notes?subject=botany&unit=1',
    learnUrl: '/lectures?subject=botany&unit=1',
  },
};

function resolveStarterPodKey(firstSubjectCode?: string, stream: StreamType = 'ba-arts'): string {
  if (firstSubjectCode) {
    const s = firstSubjectCode.toLowerCase();
    if (s.includes('hin')) return 'hindi';
    if (s.includes('his')) return 'history';
    if (s.includes('geo')) return 'geography';
    if (s.includes('pol')) return 'polscience';
    if (s.includes('soc')) return 'sociology';
    if (s.includes('eco')) return 'economics';
    if (s.includes('eng')) return 'english';
    if (s.includes('phy') || s.includes('mth')) return 'physics';
    if (s.includes('bot') || s.includes('zoo') || s.includes('chm')) return 'botany';
  }

  if (stream === 'bsc-maths') return 'physics';
  if (stream === 'bsc-bio') return 'botany';
  return 'history';
}

interface HeroStudyPodProps {
  stream: StreamType;
  lang: LanguageType;
  profile?: StudentProfile | null;
  selectedSubjects?: string[];
  onExploreSyllabus: () => void;
}

const STUDY_SESSION_STORAGE_KEY = 'sdsuv_last_study_session_v1';

export default function HeroStudyPod({
  stream,
  lang,
  profile,
  selectedSubjects,
  onExploreSyllabus,
}: HeroStudyPodProps) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isCompletedState, setIsCompletedState] = useState(false);
  const [showFormulaModal, setShowFormulaModal] = useState(false);
  const [sessionOverride, setSessionOverride] = useState<StudyPodData | null>(null);

  // Load any previously persisted study progress from localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = localStorage.getItem(STUDY_SESSION_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          setSessionOverride(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to load study session from localStorage', e);
    }
  }, []);

  // Determine active study pod data
  const { data, isResumed } = useMemo(() => {
    if (sessionOverride && sessionOverride.isResumed) {
      return { data: sessionOverride, isResumed: true };
    }

    // New student track: dynamically determine Starter Pod based on the student's primary enrolled subject
    const primaryCode = selectedSubjects?.[0] || profile?.selectedSubjects?.[0];
    const starterKey = resolveStarterPodKey(primaryCode, stream);
    const starter = STARTER_STUDY_PODS[starterKey] || STARTER_STUDY_PODS.history;

    return {
      data: {
        ...starter,
        isResumed: false,
      },
      isResumed: false,
    };
  }, [sessionOverride, selectedSubjects, profile?.selectedSubjects, stream]);

  // Check if subject is Hindi Literature
  const isHindi = useMemo(() => {
    return isHindiSubject({
      nameEn: data.currentSubjectEn,
      nameHi: data.currentSubjectHi,
    });
  }, [data]);

  // Handle Mark Topic Done toggle
  const handleToggleComplete = () => {
    const nextCompleted = !isCompletedState;
    setIsCompletedState(nextCompleted);

    const updatedData: StudyPodData = {
      ...data,
      isResumed: true,
      progressPercentage: nextCompleted ? Math.min(100, data.progressPercentage + 20) : data.progressPercentage,
      completedLectures: nextCompleted ? data.completedLectures + 1 : data.completedLectures,
    };

    setSessionOverride(updatedData);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STUDY_SESSION_STORAGE_KEY, JSON.stringify(updatedData));
      } catch (e) {
        console.error('Failed to persist study session', e);
      }
    }
  };

  // Animated circular progress calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const currentPct = isCompletedState
    ? Math.min(100, data.progressPercentage + 20)
    : data.progressPercentage;
  const strokeDashoffset = circumference - (currentPct / 100) * circumference;

  return (
    <div className="relative rounded-3xl glass-panel p-6 md:p-8 overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-white/[0.05] via-[#0b0e20]/80 to-[#070913]">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar of study pod */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
        <div className="flex items-center space-x-2.5">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
          </span>
          <span className="text-xs uppercase tracking-widest font-mono font-bold text-cyan-400">
            {isResumed
              ? lang === 'en'
                ? 'Resume Where You Left Off'
                : 'पिछला अध्ययन जारी रखें'
              : lang === 'en'
              ? 'Start Your Study Track'
              : 'अपना अध्ययन सत्र शुरू करें'}
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-xs text-slate-400 font-medium truncate max-w-[280px]">
            {isHindi ? data.currentSubjectHi : (lang === 'en' ? data.currentSubjectEn : data.currentSubjectHi)}
          </span>
        </div>

        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>
            {isHindi
              ? `इकाई ${data.unitNumber} मुख्य विषय`
              : lang === 'en'
              ? `Unit ${data.unitNumber} High-Yield`
              : `इकाई ${data.unitNumber} मुख्य विषय`}
          </span>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Left column: Topic info and Quick Launch */}
        <div className="lg:col-span-8 space-y-4">
          <div>
            <div className="text-xs font-semibold text-slate-400 mb-1">
              {isHindi ? data.currentUnitHi : (lang === 'en' ? data.currentUnitEn : data.currentUnitHi)}
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight leading-snug">
              {isHindi ? data.lessonTitleHi : (lang === 'en' ? data.lessonTitleEn : data.lessonTitleHi)}
            </h2>
          </div>

          {/* Quick summary banner */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed flex items-start space-x-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {isHindi ? data.quickSummaryHi : (lang === 'en' ? data.quickSummaryEn : data.quickSummaryHi)}
              </span>
            </p>
          </div>

          {/* Meta metrics bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-1">
            <div className="flex items-center space-x-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              <span>
                {lang === 'en'
                  ? `${data.estimatedMinutesLeft} mins remaining`
                  : `${data.estimatedMinutesLeft} मिनट शेष`}
              </span>
            </div>
            <div className="flex items-center space-x-1.5 bg-black/30 px-3 py-1.5 rounded-xl border border-white/5">
              <BookOpenCheck className="w-3.5 h-3.5 text-violet-400" />
              <span>
                {lang === 'en'
                  ? `${data.completedLectures}/${data.totalLectures} Modules Cleared`
                  : `${data.completedLectures}/${data.totalLectures} मॉड्यूल पूर्ण`}
              </span>
            </div>
          </div>

          {/* Interactive Action Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={data.learnUrl || '/learn'}
              onClick={() => {
                // Record session start
                try {
                  localStorage.setItem(
                    STUDY_SESSION_STORAGE_KEY,
                    JSON.stringify({ ...data, isResumed: true })
                  );
                } catch (e) {}
              }}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-extrabold text-sm flex items-center space-x-2 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>
                {isResumed
                  ? lang === 'en'
                    ? 'Continue in Cinema Studio'
                    : 'सिनेमा स्टूडियो में जारी रखें'
                  : lang === 'en'
                  ? 'Start in Cinema Studio'
                  : 'सिनेमा स्टूडियो में शुरू करें'}
              </span>
            </Link>

            <button
              onClick={handleToggleComplete}
              className={`px-4 py-3 rounded-2xl text-xs font-bold border transition-all flex items-center space-x-2 ${
                isCompletedState
                  ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-300'
                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:text-white hover:bg-white/[0.08]'
              }`}
            >
              <CheckCircle2
                className={`w-4 h-4 ${isCompletedState ? 'text-emerald-400' : 'text-slate-400'}`}
              />
              <span>
                {isCompletedState
                  ? lang === 'en'
                    ? 'Unit Marked Complete!'
                    : 'इकाई पूर्ण चिह्नित!'
                  : lang === 'en'
                  ? 'Mark Topic Done'
                  : 'टॉपिक पूर्ण करें'}
              </span>
            </button>

            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`px-3.5 py-3 rounded-2xl text-xs font-semibold border transition-all flex items-center space-x-1.5 ${
                isPlayingAudio
                  ? 'bg-violet-950/60 border-violet-500/50 text-violet-300 animate-pulse'
                  : 'bg-white/[0.04] border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Listen to 3-minute Himalayan Pod audio recap"
            >
              <Headphones className="w-4 h-4 text-violet-400" />
              <span>
                {isPlayingAudio
                  ? lang === 'en'
                    ? 'Playing Audio...'
                    : 'ऑडियो जारी...'
                  : lang === 'en'
                  ? 'Audio Recap'
                  : 'ऑडियो सारांश'}
              </span>
            </button>

            <button
              onClick={onExploreSyllabus}
              className="px-3 py-3 rounded-2xl text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 transition-colors"
            >
              <span>{lang === 'en' ? 'View Full Syllabus' : 'पूर्ण सिलेबस देखें'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right column: Animated Circular Progress Ring */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center pt-2 lg:pt-0">
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Outer ambient glow ring */}
            <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-xl animate-pulse" />

            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 128 128">
              {/* Track circle */}
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-slate-800/80"
                strokeWidth="8"
                fill="transparent"
              />
              {/* Progress animated circle */}
              <motion.circle
                cx="64"
                cy="64"
                r={radius}
                stroke="url(#cyanVioletGrad)"
                strokeWidth="9"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                strokeLinecap="round"
                fill="transparent"
              />
              <defs>
                <linearGradient id="cyanVioletGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
            </svg>

            {/* Inner Center Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <motion.span
                key={currentPct}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-300"
              >
                {currentPct}%
              </motion.span>
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {lang === 'en' ? 'Unit Mastery' : 'इकाई दक्षता'}
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className="text-xs text-slate-400">
              {lang === 'en' ? 'Next Up: ' : 'अगला विषय: '}
              <span className="text-slate-200 font-medium">
                {isHindi ? data.nextTopicHi : (lang === 'en' ? data.nextTopicEn : data.nextTopicHi)}
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Quick Launch Modal */}
      <AnimatePresence>
        {showFormulaModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0c1022] border border-cyan-500/30 rounded-3xl max-w-xl w-full p-6 shadow-2xl shadow-cyan-500/10 relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-400">
                    <BookOpenCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {lang === 'en' ? 'Active Study Session' : 'अध्ययन सत्र'}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {isHindi ? data.currentSubjectHi : (lang === 'en' ? data.currentSubjectEn : data.currentSubjectHi)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowFormulaModal(false)}
                  className="px-2.5 py-1 rounded-lg bg-white/10 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
                  <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
                    {lang === 'en' ? 'Key Concept & Revision Note' : 'मुख्य संकल्पना एवं पुनरीक्षण बिंदु'}
                  </h4>
                  <p className="text-sm text-slate-200 font-mono leading-relaxed">
                    {isHindi ? data.lessonTitleHi : (lang === 'en' ? data.lessonTitleEn : data.lessonTitleHi)}
                  </p>
                  <p className="text-xs text-slate-300 mt-2 italic bg-black/40 p-2.5 rounded-xl border border-white/5">
                    &quot;{isHindi ? data.quickSummaryHi : (lang === 'en' ? data.quickSummaryEn : data.quickSummaryHi)}&quot;
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">SDSUV Marking</span>
                    <span className="text-emerald-400 font-bold text-sm">15 Marks Weight</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Course Status</span>
                    <span className="text-amber-400 font-bold text-sm">NEP-2020 Core Foundation</span>
                  </div>
                </div>

                <div className="flex items-center justify-end space-x-3 pt-2">
                  <button
                    onClick={() => {
                      handleToggleComplete();
                      setShowFormulaModal(false);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs"
                  >
                    {lang === 'en' ? 'Complete & Save' : 'पूर्ण करें और सहेजें'}
                  </button>
                  <button
                    onClick={() => setShowFormulaModal(false)}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                  >
                    {lang === 'en' ? 'Close' : 'बंद करें'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
