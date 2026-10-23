'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Archive,
  Search,
  Filter,
  Download,
  FileCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  BookOpen,
  Award,
  Layers,
  Lock,
} from 'lucide-react';
import { StreamType, LanguageType, PYQQuestion } from '@/lib/types';
import { HIGH_YIELD_FLASHCARDS } from '@/data/portalData';

interface PYQVaultTabProps {
  stream: StreamType;
  lang: LanguageType;
}

export default function PYQVaultTab({ stream, lang }: PYQVaultTabProps) {
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [selectedSem, setSelectedSem] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSolutionModal, setActiveSolutionModal] = useState<PYQQuestion | null>(null);

  // Pool questions from current stream
  const questions = HIGH_YIELD_FLASHCARDS[stream] || [];

  // Filter questions based on selections (odd semesters active)
  const filteredQuestions = questions.filter((q) => {
    const matchYear = selectedYear === 'All' || q.year.toString() === selectedYear;
    const matchSem =
      selectedSem === 'All'
        ? (q.semester % 2 !== 0)
        : q.semester.toString() === selectedSem;
    const matchQuery =
      searchQuery === '' ||
      q.questionEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.questionHi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchYear && matchSem && matchQuery;
  });

  return (
    <div className="space-y-6">
      {/* Vault Header & Blueprint */}
      <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-r from-[#0c0f24] via-[#101436] to-[#080a18]">
        <div className="absolute top-0 right-0 w-96 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-mono mb-2">
              <Archive className="w-4 h-4" />
              <span>{lang === 'en' ? 'SDSUV ARCHIVAL PYQ VAULT (2019-2025)' : 'एसडीएसयूवी पूर्व वर्ष प्रश्न संग्रह'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {lang === 'en' ? 'Previous Year Papers & Solved Solutions' : 'विगत वर्ष प्रश्नपत्र एवं हल सहित उत्तर'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {lang === 'en'
                ? 'Comprehensive collection of Sri Dev Suman Uttarakhand University semester questions with official marking weightage.'
                : 'श्री देव सुमन वि.वि. के प्रामाणिक सेमेस्टर प्रश्न, आधिकारिक अंक योजना एवं आदर्श उत्तर।'}
            </p>
          </div>

          <button
            onClick={() => alert('Downloading Combined 5-Year SDSUV PYQ Compendium PDF')}
            className="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center space-x-2 shadow-lg shadow-amber-500/25 transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{lang === 'en' ? 'Download 5-Year Bundle PDF' : '5-वर्षीय प्रश्न बैंक डाउनलोड'}</span>
          </button>
        </div>

        {/* SDSUV NEP Exam Marking Blueprint */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/10 relative z-10 text-xs">
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <span className="text-cyan-400 font-bold block text-[11px] mb-1 font-mono">
              SECTION A • Short Answer
            </span>
            <p className="text-slate-300 text-[11px]">10 Questions × 2 Marks = 20 Marks (Compulsory)</p>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <span className="text-violet-400 font-bold block text-[11px] mb-1 font-mono">
              SECTION B • Analytical
            </span>
            <p className="text-slate-300 text-[11px]">5 Questions × 5 Marks = 25 Marks (Attempt 5 out of 8)</p>
          </div>
          <div className="p-3 rounded-xl bg-black/40 border border-white/5">
            <span className="text-amber-400 font-bold block text-[11px] mb-1 font-mono">
              SECTION C • Long Derivation/Essay
            </span>
            <p className="text-slate-300 text-[11px]">2 Questions × 15 Marks = 30 Marks (In-depth critique)</p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2 flex-1 min-w-[200px]">
          <Search className="w-4 h-4 text-cyan-400 ml-1" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search questions, theorems, topics...' : 'प्रश्न, प्रमेय या विषय खोजें...'}
            className="w-full bg-transparent border-none text-xs text-white placeholder-slate-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Year selector */}
          <div className="flex items-center space-x-1 text-xs">
            <span className="text-slate-400 text-[10px] uppercase font-bold mr-1">Year:</span>
            {['All', '2024', '2023'].map((yr) => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                  selectedYear === yr
                    ? 'bg-cyan-500 text-slate-950 border-cyan-400 font-bold'
                    : 'bg-white/[0.04] text-slate-400 border-white/5 hover:text-white'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Semester selector */}
          <div className="flex items-center space-x-1.5 text-xs ml-2">
            <span className="text-slate-400 text-[10px] uppercase font-bold mr-1">Sem:</span>
            {[
              { id: '1', label: 'Sem 1', isLocked: false },
              { id: '3', label: 'Sem 3', isLocked: false },
              { id: '5', label: 'Sem 5', isLocked: false },
              { id: '2', label: 'Sem 2', isLocked: true },
              { id: '4', label: 'Sem 4', isLocked: true },
              { id: '6', label: 'Sem 6', isLocked: true },
            ].map((item) => {
              if (item.isLocked) {
                return (
                  <div
                    key={item.id}
                    title={`${item.label} is launching soon. Currently focusing exclusively on Odd Semesters.`}
                    className="px-2 py-1 rounded-lg text-[10px] font-semibold border border-dashed border-amber-500/30 bg-amber-500/[0.04] text-slate-500 cursor-not-allowed flex items-center space-x-1 opacity-65 select-none"
                  >
                    <Lock className="w-2.5 h-2.5 text-amber-500" />
                    <span>{item.label}</span>
                    <span className="text-[7.5px] font-mono text-amber-400 font-extrabold uppercase">Live Soon</span>
                  </div>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedSem(item.id)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    selectedSem === item.id
                      ? 'bg-violet-500 text-white border-violet-400 font-bold shadow-md'
                      : 'bg-white/[0.04] text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Questions Vault List */}
      <div className="space-y-4">
        {filteredQuestions.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl p-5 glass-panel border border-white/10 hover:border-amber-500/30 transition-all space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-1 rounded-lg bg-amber-950/80 text-amber-300 border border-amber-500/30 text-[11px] font-mono font-bold">
                  {item.frequencyTag}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {item.subjectName} • Sem {item.semester} • {item.examType} Exam {item.year}
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/20">
                {item.marks} {lang === 'en' ? 'Marks' : 'अंक'}
              </span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
              {lang === 'en' ? item.questionEn : item.questionHi}
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
              <div className="flex items-center space-x-2 text-slate-400">
                <Layers className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  {item.marks >= 10
                    ? lang === 'en'
                      ? 'Section C Long Problem'
                      : 'खंड ग दीर्घ उत्तरीय प्रश्न'
                    : lang === 'en'
                    ? 'Section B Medium Problem'
                    : 'खंड ख मध्यम उत्तरीय प्रश्न'}
                </span>
              </div>

              <button
                onClick={() => setActiveSolutionModal(item)}
                className="px-3.5 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 font-bold text-xs flex items-center space-x-1.5 transition-all"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'View Solved Model Answer' : 'आदर्श उत्तर देखें'}</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Model Answer Preview Modal */}
      <AnimatePresence>
        {activeSolutionModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              className="bg-[#0b1024] border border-cyan-500/40 rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative"
            >
              <div className="flex items-start justify-between pb-3 border-b border-white/10 mb-4">
                <div>
                  <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold">
                    SDSUV {activeSolutionModal.year} • {activeSolutionModal.marks} Marks Solution
                  </span>
                  <h3 className="text-base font-bold text-white mt-1">
                    {lang === 'en' ? activeSolutionModal.questionEn : activeSolutionModal.questionHi}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveSolutionModal(null)}
                  className="p-1.5 rounded-lg bg-white/10 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 text-xs">
                {/* Official Solution */}
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                  <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">
                    {lang === 'en' ? 'Comprehensive Step-by-Step Derivation:' : 'क्रमबद्ध संपूर्ण उपपत्ति / व्याख्या:'}
                  </h4>
                  <p className="text-slate-200 text-sm leading-relaxed font-sans">
                    {lang === 'en' ? activeSolutionModal.solutionEn : activeSolutionModal.solutionHi}
                  </p>
                </div>

                {/* Marking points checklist */}
                <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/20">
                  <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-2">
                    {lang === 'en' ? 'SDSUV Evaluator Marking Rubric:' : 'एसडीएसयूवी परीक्षक अंकन बिंदु:'}
                  </h4>
                  <div className="space-y-1.5">
                    {activeSolutionModal.keyPoints.map((kp, i) => (
                      <div key={i} className="flex items-center space-x-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{kp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveSolutionModal(null)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                >
                  {lang === 'en' ? 'Close Solution' : 'बंद करें'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
