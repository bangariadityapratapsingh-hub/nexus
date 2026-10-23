'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Shield,
  Landmark,
  GraduationCap,
  Award,
  ChevronRight,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Calendar,
  IndianRupee,
  BookOpen,
} from 'lucide-react';
import { StreamType, LanguageType, CareerExam } from '@/lib/types';
import { CAREER_EXAMS } from '@/data/portalData';

interface CareerCompassTabProps {
  stream: StreamType;
  lang: LanguageType;
}

export default function CareerCompassTab({ stream, lang }: CareerCompassTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalExam, setActiveModalExam] = useState<CareerExam | null>(null);

  const categories = ['All', 'Defence', 'Uttarakhand State', 'UPSC/Civil', 'Higher Academia'];

  const filteredExams = CAREER_EXAMS.filter((exam) => {
    if (selectedCategory === 'All') return true;
    return exam.category === selectedCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0d1430] via-[#11193d] to-[#080b18]">
        <div className="absolute top-0 right-0 w-96 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-violet-400 text-xs font-mono mb-2">
              <Compass className="w-4 h-4" />
              <span>{lang === 'en' ? 'SDSUV GRADUATE TRAJECTORY ENGINE' : 'एसडीएसयूवी करियर दिशा एवं रोडमैप'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {lang === 'en' ? 'Career Compass & Government Exam Pathways' : 'करियर कंपास एवं प्रतियोगी परीक्षा मार्ग'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {lang === 'en'
                ? 'Tailored strategies for CDS/AFCAT, UKPSC Civil Services, and IIT JAM directly mapped to your SDSUV BA / BSc degree.'
                : 'एसडीएसयूवी उपाधि के साथ सीडीएस, यूकेपीएससी राज्य सिविल सेवा एवं उच्च अध्ययन की संपूर्ण तैयारी।'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <div className="p-3 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 text-xs text-cyan-300">
              <span className="font-bold block font-mono">Uttarakhand Domicile Perks</span>
              <span className="text-[11px] text-slate-300">Hill Region physical relaxation & 30% state quota</span>
            </div>

            <Link
              href="/careers"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 via-violet-400 to-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-1.5 shadow-lg shadow-cyan-500/25 hover:scale-105 transition-all"
            >
              <Compass className="w-4 h-4 text-slate-950" />
              <span>{lang === 'en' ? 'Open Career Compass Hub (/careers)' : 'करियर डिस्कवरी हब (/careers)'}</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10 relative z-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/30'
                  : 'bg-white/[0.04] text-slate-400 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3-Year Semester Preparation Blueprint */}
      <div className="rounded-3xl glass-panel p-6 border border-white/10 bg-gradient-to-br from-white/[0.02] to-[#0a0e22]">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4 flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-cyan-400" />
          <span>{lang === 'en' ? 'SDSUV Undergraduate 3-Phase Preparation Strategy' : 'स्नातक त्रिवर्षीय तैयारी रणनीति'}</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold text-cyan-400">Phase 1 • Sem 1 & 2</span>
            <h4 className="font-bold text-white text-sm">Foundational Subject Mastery</h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Master your core university subjects (NCERT + Degree texts). Build daily newspaper reading (Garhwal/National) & physical fitness for defence screening.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold text-violet-400">Phase 2 • Sem 3 & 4</span>
            <h4 className="font-bold text-white text-sm">Syllabus Cross-Mapping & GS</h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Align SDSUV history/polity/physics with CDS GK & UKPSC GS Paper 1. Begin mock test practice and Uttarakhand state history modules.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2">
            <span className="text-[10px] uppercase font-mono font-bold text-amber-400">Phase 3 • Sem 5 & 6</span>
            <h4 className="font-bold text-white text-sm">Active Test Series & SSB/Interview</h4>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Appear in CDS/AFCAT/Prelims during final year. Join mock SSB interviews and intensive writing practice for UKPSC / UPSC Mains.
            </p>
          </div>
        </div>
      </div>

      {/* Career Exams Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredExams.map((exam) => (
          <motion.div
            key={exam.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActiveModalExam(exam)}
            className="rounded-3xl p-6 glass-panel glass-panel-hover border border-white/10 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-[11px] font-mono mb-3">
                <span className="px-2.5 py-1 rounded-lg bg-white/[0.05] border border-white/10 text-cyan-300 font-bold">
                  {exam.category}
                </span>
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{exam.syllabusOverlapPct}% Overlap</span>
                </span>
              </div>

              <h4 className="text-base font-bold text-white leading-snug">{exam.name}</h4>
              <p className="text-xs text-slate-400 font-mono mt-1">{exam.badge}</p>

              <p className="text-xs text-slate-300 mt-3 line-clamp-3 leading-relaxed">
                {lang === 'en' ? exam.taglineEn : exam.taglineHi}
              </p>

              <div className="mt-4 p-2.5 rounded-xl bg-black/30 border border-white/5 text-[11px] text-amber-300 font-mono">
                {exam.salaryScale}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-semibold">
              <span>{exam.nextNotification}</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Career Exam Detailed Modal */}
      <AnimatePresence>
        {activeModalExam && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b1026] border border-violet-500/40 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="flex items-start justify-between pb-3 border-b border-white/10 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    {activeModalExam.category} • {activeModalExam.badge}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1">{activeModalExam.name}</h3>
                </div>
                <button
                  onClick={() => setActiveModalExam(null)}
                  className="p-1.5 rounded-lg bg-white/10 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">SDSUV Alignment</span>
                    <span className="text-emerald-400 font-black text-lg">
                      {activeModalExam.syllabusOverlapPct}% Direct Match
                    </span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Pay Scale / Stipend</span>
                    <span className="text-amber-400 font-bold text-xs">{activeModalExam.salaryScale}</span>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20">
                  <h5 className="font-bold text-cyan-300 uppercase tracking-wider text-[11px] mb-1">
                    {lang === 'en' ? 'Eligibility & Qualifications:' : 'पात्रता एवं शैक्षणिक अर्हता:'}
                  </h5>
                  <p className="text-slate-200 leading-relaxed">
                    {lang === 'en' ? activeModalExam.eligibilityEn : activeModalExam.eligibilityHi}
                  </p>
                </div>

                {/* Stages */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                  <h5 className="font-bold text-slate-300 uppercase tracking-wider text-[11px]">
                    {lang === 'en' ? 'Examination & Selection Stages:' : 'चयन प्रक्रिया एवं चरण:'}
                  </h5>
                  <div className="space-y-1.5">
                    {activeModalExam.examStages.map((stg, i) => (
                      <div key={i} className="flex items-center space-x-2 text-slate-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span>{stg}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SDSUV Subjects Overlap */}
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                  <h5 className="font-bold text-slate-300 uppercase tracking-wider text-[11px] mb-2">
                    {lang === 'en' ? 'Mapped SDSUV Degree Syllabus:' : 'संबंधित विश्वविद्यालय पाठ्यक्रम:'}
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalExam.sdsuvSubjectsOverlap.map((sub, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-black/40 text-cyan-300 border border-cyan-500/10 font-mono">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveModalExam(null)}
                  className="px-5 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs"
                >
                  {lang === 'en' ? 'Close Roadmap' : 'बंद करें'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
