'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  Video,
  Download,
  CheckCircle,
  Play,
  FileText,
  Clock,
  Sparkles,
  Search,
  ExternalLink,
  Check,
} from 'lucide-react';
import { StreamType, LanguageType, SubjectData } from '@/lib/types';
import { SUBJECTS_GALAXY } from '@/data/portalData';

interface SyllabusTabProps {
  stream: StreamType;
  lang: LanguageType;
}

export default function SyllabusTab({ stream, lang }: SyllabusTabProps) {
  const subjects = SUBJECTS_GALAXY.filter((s) => s.stream === stream);
  const [activeSubjectId, setActiveSubjectId] = useState<string>(subjects[0]?.id || '');
  const [activeVideoModal, setActiveVideoModal] = useState<{ title: string; duration: string; instructor: string } | null>(null);
  const [checkedTopics, setCheckedTopics] = useState<Record<string, boolean>>({});

  const activeSubject = subjects.find((s) => s.id === activeSubjectId) || subjects[0];

  const toggleTopicCheck = (key: string) => {
    setCheckedTopics((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Header banner */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#091026] via-[#0d1633] to-[#080b18]">
        <div className="absolute top-0 right-0 w-96 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-cyan-400 text-xs font-mono mb-2">
              <BookOpen className="w-4 h-4" />
              <span>{lang === 'en' ? 'SDSUV NEP 2020 CURRICULUM VAULT' : 'एसडीएसयूवी एनईपी 2020 पाठ्यक्रम'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {lang === 'en' ? 'Syllabus & High-Yield Lecture Pods' : 'पाठ्यक्रम एवं मुख्य व्याख्यान पॉड'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {lang === 'en'
                ? 'Official 4-year undergraduate syllabus units, verified Garhwal faculty references, and chapter-wise video modules.'
                : 'चार वर्षीय स्नातक पाठ्यक्रम की अधिकृत इकाइयां, प्राध्यापक संदर्भ एवं अध्यायवार व्याख्यान।'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/learn"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs flex items-center space-x-2 shadow-xl shadow-cyan-500/30 transition-all hover:scale-105"
            >
              <Video className="w-4 h-4 fill-slate-950" />
              <span>{lang === 'en' ? 'Launch Cinema Studio (/learn)' : 'सिनेमा स्टूडियो खोलें (/learn)'}</span>
            </Link>

            <button
              onClick={() => alert(`Downloading SDSUV NEP 2020 Full Syllabus Booklet for ${activeSubject?.nameEn}`)}
              className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center space-x-2 border border-white/10 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>{lang === 'en' ? 'Download Syllabus PDF' : 'सिलेबस पीडीएफ'}</span>
            </button>
          </div>
        </div>

        {/* Subject Pills Switcher */}
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-white/10 relative z-10">
          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => setActiveSubjectId(sub.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                activeSubjectId === sub.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/30'
                  : 'bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/[0.08] border border-white/5'
              }`}
            >
              <span>{sub.code}</span>
              <span className="opacity-80 font-normal">| {lang === 'en' ? sub.nameEn.split(':')[0] : sub.nameHi.split(':')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Subject Content */}
      {activeSubject && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Units Breakdown with Checklists */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white flex items-center space-x-2">
                <span>{lang === 'en' ? 'Prescribed Units & Topics' : 'निर्धारित इकाइयां एवं विषय'}</span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                  {activeSubject.units.length} Units
                </span>
              </h3>
              <span className="text-xs text-slate-400">
                {lang === 'en' ? 'Click topics to mark completed' : 'पूर्ण चिह्नित करने हेतु क्लिक करें'}
              </span>
            </div>

            <div className="space-y-4">
              {activeSubject.units.map((unit) => (
                <div
                  key={unit.unitNumber}
                  className="rounded-2xl p-5 glass-panel border border-white/10 space-y-3"
                >
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <div className="flex items-center space-x-2">
                      <span className="px-2.5 py-1 rounded-lg bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-mono text-xs font-bold">
                        Unit {unit.unitNumber}
                      </span>
                      <h4 className="text-sm font-bold text-white">
                        {lang === 'en' ? unit.titleEn : unit.titleHi}
                      </h4>
                    </div>
                    <span className="text-xs font-mono text-amber-400 font-semibold">
                      {unit.weightageMarks} {lang === 'en' ? 'Marks' : 'अंक'}
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    {unit.keyConcepts.map((concept, idx) => {
                      const topicKey = `${activeSubject.id}-u${unit.unitNumber}-c${idx}`;
                      const isDone = !!checkedTopics[topicKey];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleTopicCheck(topicKey)}
                          className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                            isDone
                              ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                              : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.05]'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 text-xs">
                            <div
                              className={`w-4 h-4 rounded-md flex items-center justify-center border transition-all ${
                                isDone
                                  ? 'bg-emerald-500 border-emerald-400 text-black'
                                  : 'border-slate-600 bg-black/40'
                              }`}
                            >
                              {isDone && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className={isDone ? 'line-through opacity-75' : 'font-medium'}>
                              {concept}
                            </span>
                          </div>

                          <span className="text-[10px] text-slate-500 font-mono">
                            {isDone ? (lang === 'en' ? 'Done' : 'पूर्ण') : (lang === 'en' ? 'Pending' : 'शेष')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Curated Video Modules & Recommended Books */}
          <div className="lg:col-span-4 space-y-6">
            {/* Video Lecture Pods */}
            <div className="rounded-2xl p-5 glass-panel border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Video className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
                    {lang === 'en' ? 'High-Yield Video Pods' : 'वीडियो व्याख्यान'}
                  </h4>
                </div>
                <span className="text-[10px] text-cyan-400 font-mono">SDSUV Verified</span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: `Comprehensive Derivations & Unit 1 Mastery`,
                    duration: '38:15',
                    instructor: 'Prof. R. Rawat (Rishikesh Campus)',
                  },
                  {
                    title: `PYQ 5-Year Problem Solving Workshop`,
                    duration: '45:30',
                    instructor: 'Dr. S. Bhatt (Badshahithaul HQ)',
                  },
                  {
                    title: `Expected Exam Questions & Model Answers`,
                    duration: '31:20',
                    instructor: 'Dr. N. Negi (Tehri Campus)',
                  },
                ].map((pod, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveVideoModal(pod)}
                    className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="flex items-center space-x-1 text-cyan-300">
                        <Play className="w-3 h-3 fill-cyan-400" />
                        <span className="font-semibold">{pod.duration}</span>
                      </span>
                      <span className="text-[10px] text-slate-500">HD 1080p</span>
                    </div>

                    <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {pod.title}
                    </p>

                    <div className="text-[10px] text-slate-400 font-mono flex items-center justify-between">
                      <span>{pod.instructor}</span>
                      <span className="text-cyan-400 underline">{lang === 'en' ? 'Watch' : 'देखें'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended References */}
            <div className="rounded-2xl p-5 glass-panel border border-white/10 space-y-3">
              <h4 className="text-xs font-extrabold text-amber-300 uppercase tracking-wider flex items-center space-x-1.5">
                <FileText className="w-4 h-4 text-amber-400" />
                <span>{lang === 'en' ? 'Recommended Textbooks' : 'अनुशंसित पुस्तकें'}</span>
              </h4>

              <div className="space-y-2">
                {activeSubject.recommendedBooks.map((b, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300">
                    <p className="font-semibold text-white">{b}</p>
                    <span className="text-[10px] text-slate-500 mt-0.5 block">
                      Available in Garhwal / SDSUV Central Library
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      <AnimatePresence>
        {activeVideoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b0f22] border border-cyan-500/40 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    SDSUV E-Learning Portal • {activeVideoModal.duration}
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">{activeVideoModal.title}</h3>
                </div>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="p-1.5 rounded-lg bg-white/10 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              {/* Simulated Video Player Screen */}
              <div className="relative aspect-video rounded-2xl bg-black overflow-hidden flex items-center justify-center border border-white/10 shadow-inner group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-16 h-16 rounded-full bg-cyan-500/20 border-2 border-cyan-400 flex items-center justify-center mx-auto text-cyan-400 group-hover:scale-110 transition-transform shadow-lg shadow-cyan-500/30">
                    <Play className="w-7 h-7 fill-cyan-400 ml-1" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-300 font-medium">{activeVideoModal.instructor}</p>
                    <p className="text-[10px] text-cyan-400 font-mono">Stream Quality: Adaptive 1080p60</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-slate-400">Lecture notes & timestamps embedded.</span>
                <button
                  onClick={() => setActiveVideoModal(null)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  {lang === 'en' ? 'Close Player' : 'प्लेयर बंद करें'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
