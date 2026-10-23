'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Compass,
  Shield,
  Award,
  ArrowRight,
  Sparkles,
  ChevronRight,
  TrendingUp,
  Landmark,
  Briefcase,
  CheckCircle2,
} from 'lucide-react';
import { StreamType, LanguageType, CareerExam } from '@/lib/types';
import { CAREER_EXAMS } from '@/data/portalData';

interface CareerCompassSpotlightProps {
  stream: StreamType;
  lang: LanguageType;
  onExploreFullCompass: () => void;
}

export default function CareerCompassSpotlight({
  stream,
  lang,
  onExploreFullCompass,
}: CareerCompassSpotlightProps) {
  // Filter exams relevant to current stream
  const matchingExams = CAREER_EXAMS.filter((e) => e.relevantStreams.includes(stream));
  const [selectedExamModal, setSelectedExamModal] = useState<CareerExam | null>(null);

  return (
    <div className="relative rounded-3xl glass-panel p-6 md:p-8 overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-r from-[#0a1026] via-[#0e1633] to-[#0a0d1e]">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-72 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-500/30">
            <Compass className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                {lang === 'en' ? 'Career Compass Spotlight' : 'करियर कंपास स्पॉटलाइट'}
              </h3>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-mono font-bold flex items-center space-x-1">
                <span>🔒</span>
                <span>Under Process - Live Soon</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {lang === 'en'
                ? 'Curating UKPSC, UPSC, CDS and higher academia career blueprints mapped to SDSUV degrees'
                : 'एसडीएसयूवी उपाधियों से जुड़े यूकेपीएससी, यूपीएससी, सीडीएस करियर ब्लूप्रिंट का संकलन जारी'}
            </p>
          </div>
        </div>

        <button
          onClick={onExploreFullCompass}
          className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 hover:text-white border border-amber-500/30 text-xs font-bold flex items-center space-x-1.5 transition-all"
        >
          <span>🔒 {lang === 'en' ? 'Under Process - Live Soon' : 'प्रक्रियाधीन - शीघ्र लाइव'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Dynamic Exam Match Cards (Bento Sub-Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
        {matchingExams.slice(0, 3).map((exam) => (
          <motion.div
            key={exam.id}
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.2 }}
            onClick={() => setSelectedExamModal(exam)}
            className="rounded-2xl p-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-cyan-500/30 transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Top tag: Category & Overlap */}
              <div className="flex items-center justify-between text-[10px] mb-2 font-mono">
                <span className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/20 font-bold">
                  {exam.category}
                </span>
                <span className="text-emerald-400 font-bold flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3" />
                  <span>{exam.syllabusOverlapPct}% {lang === 'en' ? 'Overlap' : 'साम्य'}</span>
                </span>
              </div>

              {/* Title & Badge */}
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {exam.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">{exam.badge}</p>

              {/* Tagline */}
              <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                {lang === 'en' ? exam.taglineEn : exam.taglineHi}
              </p>
            </div>

            {/* Bottom info: notification & action */}
            <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
              <span className="text-amber-400 font-medium truncate max-w-[170px]">
                {exam.nextNotification}
              </span>
              <span className="text-cyan-400 font-semibold flex items-center space-x-0.5">
                <span>{lang === 'en' ? 'Details' : 'विवरण'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for Exam Roadmap Details */}
      <AnimatePresence>
        {selectedExamModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0c1126] border border-cyan-500/30 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="flex items-start justify-between pb-3 border-b border-white/10 mb-4">
                <div>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20 font-bold">
                    {selectedExamModal.category} • {selectedExamModal.badge}
                  </span>
                  <h3 className="text-xl font-black text-white mt-1.5">{selectedExamModal.name}</h3>
                </div>
                <button
                  onClick={() => setSelectedExamModal(null)}
                  className="p-1.5 rounded-lg bg-white/10 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Overlap & Salary banner */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">SDSUV Syllabus Overlap</span>
                    <span className="text-emerald-400 font-extrabold text-base">
                      {selectedExamModal.syllabusOverlapPct}% Direct Match
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Pay Scale</span>
                    <span className="text-amber-400 font-extrabold text-xs">{selectedExamModal.salaryScale}</span>
                  </div>
                </div>

                {/* Eligibility */}
                <div className="p-3.5 rounded-xl bg-cyan-950/20 border border-cyan-500/20">
                  <span className="text-cyan-300 font-bold block mb-1">
                    {lang === 'en' ? 'Eligibility for SDSUV Students:' : 'एसडीएसयूवी विद्यार्थियों हेतु पात्रता:'}
                  </span>
                  <p className="text-slate-200">
                    {lang === 'en' ? selectedExamModal.eligibilityEn : selectedExamModal.eligibilityHi}
                  </p>
                </div>

                {/* Exam Stages */}
                <div>
                  <span className="text-slate-400 font-bold block mb-1.5 uppercase tracking-wider text-[10px]">
                    {lang === 'en' ? 'Selection Stages:' : 'चयन चरण:'}
                  </span>
                  <div className="space-y-1.5">
                    {selectedExamModal.examStages.map((stage, i) => (
                      <div key={i} className="flex items-center space-x-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                        <span>{stage}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* SDSUV Subjects Overlap */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-slate-400 font-bold block mb-1 text-[10px] uppercase">
                    {lang === 'en' ? 'Mapped SDSUV Units & Modules:' : 'संबंधित विश्वविद्यालय विषय:'}
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {selectedExamModal.sdsuvSubjectsOverlap.map((s, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-black/40 text-cyan-300 border border-cyan-500/10">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setSelectedExamModal(null)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                >
                  {lang === 'en' ? 'Close' : 'बंद करें'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
