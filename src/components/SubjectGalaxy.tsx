'use client';

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Atom,
  Sigma,
  FlaskConical,
  Leaf,
  Dna,
  BookOpen,
  Building2,
  Scroll,
  Globe,
  TrendingUp,
  Users,
  Sparkles,
  ArrowUpRight,
  Download,
  BookCheck,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Play,
  ArrowRight,
} from 'lucide-react';
import { StreamType, LanguageType, SubjectData } from '@/lib/types';
import { SUBJECTS_GALAXY } from '@/data/portalData';
import { getExplorerSubject } from '@/data/subjectExplorerData';
import { filterToSelectedSubjects } from '@/lib/studentProfile';

interface SubjectGalaxyProps {
  stream: StreamType;
  lang: LanguageType;
  selectedSubjectCodes?: string[];
}

// Icon helper mapping
const getSubjectIcon = (iconName: string) => {
  switch (iconName) {
    case 'Atom':
      return Atom;
    case 'Sigma':
      return Sigma;
    case 'FlaskConical':
      return FlaskConical;
    case 'Leaf':
      return Leaf;
    case 'Dna':
      return Dna;
    case 'Building2':
      return Building2;
    case 'Scroll':
      return Scroll;
    case 'Globe':
      return Globe;
    case 'TrendingUp':
      return TrendingUp;
    case 'Users':
      return Users;
    case 'BookOpen':
    default:
      return BookOpen;
  }
};

// Helper to identify Hindi literature subject
export const isHindiSubject = (item?: { id?: string; code?: string; nameEn?: string; nameHi?: string }) => {
  if (!item) return false;
  const id = (item.id || '').toLowerCase();
  const code = (item.code || '').toLowerCase();
  const nameEn = (item.nameEn || '').toLowerCase();
  const nameHi = item.nameHi || '';
  return (
    id.includes('hin') ||
    code.includes('hin') ||
    nameEn.includes('hindi') ||
    nameHi.includes('हिन्दी') ||
    nameHi.includes('हिंदी')
  );
};

// Helper to determine exact discipline metadata so wrong topics (e.g. Geography) are never loaded into other subjects
export const getDisciplineMeta = (subj: { id?: string; code?: string; nameEn?: string; nameHi?: string }) => {
  const code = (subj.code || '').toLowerCase();
  const id = (subj.id || '').toLowerCase();
  const name = (subj.nameEn || '').toLowerCase();
  const nameHi = subj.nameHi || '';

  if (code.includes('hin') || id.includes('hin') || name.includes('hindi') || nameHi.includes('हिन्दी') || nameHi.includes('हिंदी')) {
    return {
      canonicalKey: 'hindi',
      educator: 'दृष्टि आईएएस हिन्दी साहित्य पैनल',
      channel: 'Drishti IAS',
      youtubeId: 'V9n7Vd8i9wU',
      duration: '32:45',
      language: 'Hindi' as const,
    };
  }
  if (code.includes('his') || id.includes('his') || name.includes('history')) {
    return {
      canonicalKey: 'history',
      educator: 'Drishti IAS / History Faculty',
      channel: 'Drishti IAS',
      youtubeId: 'WMopoZiIg1Q',
      duration: '30:15',
      language: 'Hinglish' as const,
    };
  }
  if (code.includes('pol') || id.includes('pol') || name.includes('political')) {
    return {
      canonicalKey: 'polscience',
      educator: 'StudyIQ IAS Faculty',
      channel: 'StudyIQ IAS',
      youtubeId: 'zR7wQy6E4kE',
      duration: '27:40',
      language: 'Hinglish' as const,
    };
  }
  if (code.includes('geo') || id.includes('geo') || name.includes('geography')) {
    return {
      canonicalKey: 'geography',
      educator: 'Prof. Savindra Singh Series',
      channel: 'StudyIQ IAS',
      youtubeId: 'r43m_H6Fz3Y',
      duration: '28:40',
      language: 'Hinglish' as const,
    };
  }
  if (code.includes('soc') || id.includes('soc') || name.includes('sociology')) {
    return {
      canonicalKey: 'sociology',
      educator: 'UGC Sociology Series',
      channel: 'Verified Academic Stream',
      youtubeId: '1b0V49aL-88',
      duration: '26:50',
      language: 'Hinglish' as const,
    };
  }
  if (code.includes('eco') || id.includes('eco') || name.includes('economics')) {
    return {
      canonicalKey: 'economics',
      educator: 'StudyIQ Economics Faculty',
      channel: 'StudyIQ IAS',
      youtubeId: 'fM1rQv_6E4k',
      duration: '29:10',
      language: 'Hinglish' as const,
    };
  }
  if (code.includes('eng') || id.includes('eng') || name.includes('english')) {
    return {
      canonicalKey: 'english',
      educator: 'English Literature Series',
      channel: 'Verified Academic Stream',
      youtubeId: 'okG8IPVh8aI',
      duration: '25:30',
      language: 'English' as const,
    };
  }
  if (code.includes('phy') || id.includes('phy') || name.includes('physics')) {
    return {
      canonicalKey: 'physics',
      educator: 'Physics Degree Faculty',
      channel: 'NPTEL / Physics Stream',
      youtubeId: 'r43m_H6Fz3Y',
      duration: '31:00',
      language: 'Hinglish' as const,
    };
  }
  if (code.includes('mth') || id.includes('mth') || name.includes('math')) {
    return {
      canonicalKey: 'mathematics',
      educator: 'Higher Mathematics Series',
      channel: 'NPTEL / Math Stream',
      youtubeId: 'zR7wQy6E4kE',
      duration: '33:15',
      language: 'Hinglish' as const,
    };
  }
  if (code.includes('bot') || id.includes('bot') || name.includes('botany')) {
    return {
      canonicalKey: 'botany',
      educator: 'Botany Degree Series',
      channel: 'Verified Biology Stream',
      youtubeId: '1b0V49aL-88',
      duration: '28:00',
      language: 'Hinglish' as const,
    };
  }
  if (code.includes('zoo') || id.includes('zoo') || name.includes('zoology')) {
    return {
      canonicalKey: 'zoology',
      educator: 'Animal Physiology Faculty',
      channel: 'Verified Biology Stream',
      youtubeId: 'V9n7Vd8i9wU',
      duration: '30:45',
      language: 'Hinglish' as const,
    };
  }
  if (code.includes('chm') || id.includes('chm') || name.includes('chemistry')) {
    return {
      canonicalKey: 'chemistry',
      educator: 'Bio-Organic Chemistry Faculty',
      channel: 'Verified Chemistry Stream',
      youtubeId: 'fM1rQv_6E4k',
      duration: '29:30',
      language: 'Hinglish' as const,
    };
  }
  return {
    canonicalKey: 'geography',
    educator: 'Verified Faculty',
    channel: 'SDSUV Academic Network',
    youtubeId: 'r43m_H6Fz3Y',
    duration: '25:00',
    language: 'Hinglish' as const,
  };
};

export default function SubjectGalaxy({ stream, lang, selectedSubjectCodes }: SubjectGalaxyProps) {
  const router = useRouter();
  const allStreamSubjects = useMemo(() => SUBJECTS_GALAXY.filter((s) => s.stream === stream), [stream]);
  const subjects = useMemo(() => {
    return filterToSelectedSubjects(
      allStreamSubjects,
      (s) => s.code || s.id,
      selectedSubjectCodes
    );
  }, [allStreamSubjects, selectedSubjectCodes]);
  const [selectedSubject, setSelectedSubject] = useState<SubjectData | null>(null);

  // Accordion state inside the Prescribed Syllabus Units Modal
  const [activeModalUnit, setActiveModalUnit] = useState<number | null>(null);
  const [activeModalTopicId, setActiveModalTopicId] = useState<string | null>(null);

  const handleOpenSubjectModal = (subj: SubjectData) => {
    setSelectedSubject(subj);
    setActiveModalUnit(null);
    setActiveModalTopicId(null);
  };

  return (
    <div className="space-y-4">
      {/* Galaxy Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-4 h-4" />
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
              {lang === 'en' ? 'Subject Galaxy (SDSUV NEP 2020)' : 'विषय मण्डल (एसडीएसयूवी एनईपी)'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            {lang === 'en'
              ? 'Interactive discipline cards with real-time syllabus unit mastery and credit weightage'
              : 'इकाई दक्षता, क्रेडिट अंक एवं परीक्षा भार सहित इंटरैक्टिव विषय कार्ड'}
          </p>
        </div>

        <div className="text-xs font-mono text-cyan-400 bg-cyan-950/40 border border-cyan-500/20 px-3 py-1 rounded-full">
          {subjects.length} {lang === 'en' ? 'Core Disciplines Active' : 'मुख्य विषय सक्रिय'}
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((subj) => {
          const Icon = getSubjectIcon(subj.iconName);
          return (
            <motion.div
              key={subj.id}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              onClick={() => handleOpenSubjectModal(subj)}
              className="group relative rounded-3xl p-6 glass-panel glass-panel-hover cursor-pointer border border-white/10 overflow-hidden flex flex-col justify-between"
            >
              {/* Radial glow on hover */}
              <div className="absolute -top-16 -right-16 w-36 h-36 bg-cyan-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

              <div>
                {/* Top Badge: Code, Credits, Semester */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-4">
                  <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-cyan-300 font-bold">
                    {subj.code}
                  </span>
                  <span className="text-slate-400">
                    {subj.credits} {lang === 'en' ? 'Credits' : 'क्रेडिट'} • Sem {subj.semester}
                  </span>
                </div>

                {/* Subject Icon & Title */}
                <div className="flex items-start space-x-3.5 mb-3">
                  <div
                    className={`p-3 rounded-2xl bg-gradient-to-br ${subj.color} text-white shadow-lg shadow-cyan-500/20 shrink-0 group-hover:rotate-6 transition-transform`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                      {isHindiSubject(subj) ? (subj.nameHi || subj.nameEn) : (lang === 'en' ? subj.nameEn : subj.nameHi)}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                      {isHindiSubject(subj) ? (subj.currentTopicHi || subj.currentTopicEn) : (lang === 'en' ? subj.currentTopicEn : subj.currentTopicHi)}
                    </p>
                  </div>
                </div>

                {/* Unit Mastery Bar */}
                <div className="mt-5 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-medium">
                      {lang === 'en' ? 'Curriculum Mastery' : 'पाठ्यक्रम दक्षता'}
                    </span>
                    <span className="font-mono font-bold text-white">{subj.masteryPercentage}%</span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-slate-900 border border-white/5 overflow-hidden p-0.5">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${subj.masteryPercentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400"
                    />
                  </div>
                </div>
              </div>

              {/* Bottom footer of card */}
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center space-x-1.5">
                  <BookCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {subj.completedUnits} / {subj.totalUnits} {lang === 'en' ? 'Units Cleared' : 'इकाइयां पूर्ण'}
                  </span>
                </span>
                <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-0.5">
                  <span>{lang === 'en' ? 'Units' : 'विवरण'}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Subject Detailed Modal */}
      <AnimatePresence>
        {selectedSubject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0b0f23] border border-cyan-500/30 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10 mb-6">
                <div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400 mb-1">
                    <span>{selectedSubject.code}</span>
                    <span>•</span>
                    <span>{selectedSubject.credits} Credits</span>
                    <span>•</span>
                    <span>Semester {selectedSubject.semester}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {isHindiSubject(selectedSubject)
                      ? (selectedSubject.nameHi || selectedSubject.nameEn)
                      : (lang === 'en' ? selectedSubject.nameEn : selectedSubject.nameHi)}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedSubject(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-all text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Units Accordion/List with Interactive Topics & Actions */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs uppercase font-extrabold tracking-wider text-slate-400">
                    {lang === 'en' ? 'SDSUV Prescribed Syllabus Units' : 'एसडीएसयूवी निर्धारित पाठ्यक्रम इकाइयां'}
                  </h4>
                  <span className="text-[10px] font-mono text-cyan-300">
                    {lang === 'en' ? 'Tap Unit → Topics → Notes/Lecture' : 'इकाई टैप करें → विषय → नोट्स/लेक्चर'}
                  </span>
                </div>

                <div className="space-y-3">
                  {selectedSubject.units.map((unit) => {
                    const isUnitExpanded = activeModalUnit === unit.unitNumber;
                    const isHindi = isHindiSubject(selectedSubject);
                    const discipline = getDisciplineMeta(selectedSubject);

                    // Strictly construct topics from this unit's keyConcepts to prevent cross-subject contamination (e.g. Geography topics appearing in Hindi)
                    const topics = (unit.keyConcepts && unit.keyConcepts.length > 0)
                      ? unit.keyConcepts.map((kc, i) => ({
                          id: `${selectedSubject.id}-${unit.unitNumber}-${i + 1}`,
                          sequence: isHindi ? `विषय ${unit.unitNumber}.${i + 1}` : `Topic ${unit.unitNumber}.${i + 1}`,
                          titleEn: kc,
                          titleHi: kc,
                          duration: discipline.duration,
                          youtubeId: discipline.youtubeId,
                          educator: discipline.educator,
                          channel: discipline.channel,
                          language: discipline.language,
                        }))
                      : [{
                          id: `${selectedSubject.id}-${unit.unitNumber}-1`,
                          sequence: isHindi ? `विषय ${unit.unitNumber}.1` : `Topic ${unit.unitNumber}.1`,
                          titleEn: unit.titleEn,
                          titleHi: unit.titleHi,
                          duration: discipline.duration,
                          youtubeId: discipline.youtubeId,
                          educator: discipline.educator,
                          channel: discipline.channel,
                          language: discipline.language,
                        }];

                    return (
                      <div
                        key={unit.unitNumber}
                        className="rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden transition-all shadow-sm"
                      >
                        {/* 1. Clickable Unit Accordion Card (Initially shows only Unit Name & Exam Weight) */}
                        <button
                          type="button"
                          onClick={() => {
                            setActiveModalUnit(isUnitExpanded ? null : unit.unitNumber);
                            setActiveModalTopicId(null);
                          }}
                          className={`w-full p-4 flex items-center justify-between text-left transition-colors ${
                            isUnitExpanded
                              ? 'bg-gradient-to-r from-cyan-950/70 to-violet-950/70 text-white font-bold border-b border-white/10'
                              : 'hover:bg-white/[0.06] text-slate-200'
                          }`}
                        >
                          <div className="flex items-center space-x-3 min-w-0">
                            <span
                              className={`w-2 h-2 rounded-full flex-shrink-0 ${
                                isUnitExpanded ? 'bg-cyan-400 ring-4 ring-cyan-400/20' : 'bg-slate-500'
                              }`}
                            />
                            <div className="min-w-0">
                              <div className="flex items-center space-x-2">
                                <span className="text-xs font-mono font-bold text-cyan-300">
                                  {isHindi
                                    ? `इकाई ${unit.unitNumber}`
                                    : lang === 'en'
                                    ? `Unit ${unit.unitNumber}`
                                    : `इकाई ${unit.unitNumber}`}
                                </span>
                                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20">
                                  {unit.weightageMarks} {lang === 'en' ? 'Marks Weight' : 'अंक भार'}
                                </span>
                              </div>
                              <h5 className="text-sm font-bold text-white mt-0.5 truncate">
                                {isHindi
                                  ? (unit.titleHi || unit.titleEn)
                                  : lang === 'en'
                                  ? unit.titleEn
                                  : unit.titleHi}
                              </h5>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
                              {topics.length} {lang === 'en' ? 'Topics' : 'विषय'}
                            </span>
                            {isUnitExpanded ? (
                              <ChevronUp className="w-4 h-4 text-cyan-400" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            )}
                          </div>
                        </button>

                        {/* 2. Smoothly Expanded List of Individual Topics */}
                        <AnimatePresence>
                          {isUnitExpanded && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="p-3 bg-black/50 space-y-2.5 divide-y divide-white/5"
                            >
                              <p className="text-[11px] font-mono text-slate-400 px-1 pt-0.5 pb-1">
                                {lang === 'en'
                                  ? '👇 Tap any topic below to view Notes or watch Lecture:'
                                  : '👇 विषय पर टैप करें और नोट्स अथवा लेक्चर चुनें:'}
                              </p>

                              {topics.map((t) => {
                                const isTopicExpanded = activeModalTopicId === t.id;

                                return (
                                  <div key={t.id} className="pt-2">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setActiveModalTopicId(isTopicExpanded ? null : t.id)
                                      }
                                      className={`w-full p-3 rounded-xl text-left transition-all flex items-start justify-between ${
                                        isTopicExpanded
                                          ? 'bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/40 text-white shadow-md'
                                          : 'bg-white/[0.02] hover:bg-white/[0.05] text-slate-300 border border-white/5'
                                      }`}
                                    >
                                      <div className="flex items-start space-x-2.5 min-w-0">
                                        <span className="px-1.5 py-0.5 rounded bg-black/60 text-[10px] font-mono font-bold text-cyan-300 border border-white/10 shrink-0 mt-0.5">
                                          {t.sequence}
                                        </span>
                                        <div className="min-w-0">
                                          <span className="block text-xs font-bold leading-snug">
                                            {isHindi
                                              ? (t.titleHi || t.titleEn)
                                              : lang === 'en'
                                              ? t.titleEn
                                              : t.titleHi}
                                          </span>
                                          {t.duration && (
                                            <span className="block text-[10px] font-mono text-slate-400 mt-0.5">
                                              ⏱️ {t.duration} • {t.channel || 'Verified Faculty'}
                                            </span>
                                          )}
                                        </div>
                                      </div>

                                      <div className="shrink-0 ml-2 mt-1">
                                        {isTopicExpanded ? (
                                          <ChevronUp className="w-3.5 h-3.5 text-cyan-400" />
                                        ) : (
                                          <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                        )}
                                      </div>
                                    </button>

                                    {/* 3. Expanded Action Buttons on That Exact Topic Row */}
                                    <AnimatePresence>
                                      {isTopicExpanded && (
                                        <motion.div
                                          initial={{ opacity: 0, y: -6 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          exit={{ opacity: 0, y: -6 }}
                                          className="mt-2 p-2.5 rounded-xl bg-black/70 border border-cyan-500/30 flex flex-col sm:flex-row items-center gap-2.5"
                                        >
                                          {/* 📖 View Notes Button */}
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setSelectedSubject(null);
                                              router.push(
                                                `/notes?subject=${discipline.canonicalKey}&unit=${unit.unitNumber}&topic=${t.id}`
                                              );
                                            }}
                                            className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-black flex items-center justify-center space-x-2 shadow-lg shadow-violet-500/25 transition-transform hover:scale-[1.02] active:scale-95"
                                          >
                                            <BookOpen className="w-3.5 h-3.5" />
                                            <span>📖 View Notes</span>
                                          </button>

                                          {/* 🎬 Watch Lecture Button */}
                                          <button
                                            type="button"
                                            onClick={() => {
                                              setSelectedSubject(null);
                                              router.push(
                                                `/lectures?subject=${discipline.canonicalKey}&unit=${unit.unitNumber}&topic=${t.id}`
                                              );
                                            }}
                                            className="w-full sm:flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white text-xs font-black flex items-center justify-center space-x-2 shadow-lg shadow-red-500/25 transition-transform hover:scale-[1.02] active:scale-95"
                                          >
                                            <Play className="w-3.5 h-3.5 fill-white" />
                                            <span>🎬 Watch Lecture</span>
                                          </button>
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
              </div>

              {/* Recommended References */}
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 mb-6">
                <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                  {lang === 'en' ? 'SDSUV Recommended References & Authors' : 'विश्वविद्यालय अनुमोदित पुस्तकें'}
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedSubject.recommendedBooks.map((book, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{book}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => alert(`Downloading SDSUV NEP 2020 Syllabus PDF for ${isHindiSubject(selectedSubject) ? (selectedSubject.nameHi || selectedSubject.nameEn) : selectedSubject.nameEn}`)}
                  className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-2 transition-all shadow-lg shadow-cyan-500/20"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Download Official Syllabus PDF' : 'आधिकारिक सिलेबस पीडीएफ डाउनलोड'}</span>
                </button>

                <button
                  onClick={() => setSelectedSubject(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all"
                >
                  {lang === 'en' ? 'Close Window' : 'बंद करें'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
