'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer,
  Calendar,
  HelpCircle,
  Eye,
  EyeOff,
  ChevronRight,
  Flame,
  Check,
  Award,
  Sparkles,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import { HIGH_YIELD_FLASHCARDS, SDSUV_CAMPUS_INFO } from '@/data/portalData';

interface ExamRadarProps {
  stream: StreamType;
  lang: LanguageType;
}

export default function ExamRadar({ stream, lang }: ExamRadarProps) {
  const flashcards = HIGH_YIELD_FLASHCARDS[stream] || [];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [confidence, setConfidence] = useState<'easy' | 'tricky' | 'mastered' | null>(null);

  // Countdown timer calculations
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 36,
    seconds: 50,
  });

  useEffect(() => {
    const target = new Date(SDSUV_CAMPUS_INFO.targetExamDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // When stream changes, reset flashcard index
  useEffect(() => {
    setCurrentCardIndex(0);
    setIsRevealed(false);
    setConfidence(null);
  }, [stream]);

  const currentCard = flashcards[currentCardIndex] || flashcards[0];

  const handleNextCard = () => {
    setIsRevealed(false);
    setConfidence(null);
    setCurrentCardIndex((prev) => (prev + 1) % flashcards.length);
  };

  return (
    <div className="rounded-3xl glass-panel p-6 overflow-hidden border border-white/10 shadow-2xl bg-gradient-to-br from-white/[0.04] via-[#090e1f] to-[#070913] flex flex-col justify-between relative">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div>
        {/* Top Header: Exam Radar Title & Countdown */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Timer className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white tracking-wide flex items-center space-x-1.5">
                <span>{lang === 'en' ? 'SDSUV Exam Radar' : 'एसडीएसयूवी परीक्षा रडार'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30">
                  Even Sem 2026
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {lang === 'en' ? 'Semester Term-End Countdown' : 'सत्रांत परीक्षा उल्टी गिनती'}
              </p>
            </div>
          </div>
        </div>

        {/* Live Countdown Grid */}
        <div className="grid grid-cols-4 gap-2 my-4">
          {[
            { labelEn: 'Days', labelHi: 'दिन', val: timeLeft.days },
            { labelEn: 'Hours', labelHi: 'घंटे', val: timeLeft.hours },
            { labelEn: 'Mins', labelHi: 'मिनट', val: timeLeft.minutes },
            { labelEn: 'Secs', labelHi: 'सेकंड', val: timeLeft.seconds },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-2xl bg-black/40 border border-white/5 text-center flex flex-col items-center justify-center relative overflow-hidden"
            >
              <span className="font-mono text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-300">
                {String(item.val).padStart(2, '0')}
              </span>
              <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 mt-0.5">
                {lang === 'en' ? item.labelEn : item.labelHi}
              </span>
            </div>
          ))}
        </div>

        {/* Daily High-Yield PYQ Flashcard */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-1.5">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                {lang === 'en' ? 'High-Yield PYQ Flashcard' : 'दैनिक उच्च-अंक पीवाईक्यू कार्ड'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-400">
              {currentCardIndex + 1} / {flashcards.length}
            </span>
          </div>

          {/* Flashcard Body */}
          <div className="rounded-2xl bg-black/50 border border-amber-500/20 p-4 relative overflow-hidden">
            {/* Tag bar */}
            <div className="flex items-center justify-between text-[10px] mb-2 font-mono">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/30 font-semibold">
                {currentCard.frequencyTag}
              </span>
              <span className="text-slate-400">
                SDSUV {currentCard.year} • {currentCard.marks} {lang === 'en' ? 'Marks' : 'अंक'}
              </span>
            </div>

            {/* Question Text */}
            <p className="text-xs sm:text-sm font-semibold text-slate-100 leading-relaxed min-h-[48px]">
              {lang === 'en' ? currentCard.questionEn : currentCard.questionHi}
            </p>

            {/* Answer Reveal Area */}
            <AnimatePresence>
              {isRevealed && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 pt-3 border-t border-white/10 space-y-2 text-xs"
                >
                  <div className="text-[11px] font-bold text-cyan-300 flex items-center space-x-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    <span>{lang === 'en' ? 'Model Solution & Marking Scheme:' : 'आदर्श उत्तर एवं अंक विभाजन:'}</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed font-sans text-[11px] bg-slate-900/60 p-2.5 rounded-xl border border-white/5">
                    {lang === 'en' ? currentCard.solutionEn : currentCard.solutionHi}
                  </p>

                  <div className="space-y-1 pt-1">
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">
                      {lang === 'en' ? 'Key Examiners Checklist:' : 'परीक्षक मूल्यांकन बिंदु:'}
                    </span>
                    {currentCard.keyPoints.map((pt, i) => (
                      <div key={i} className="flex items-center space-x-1.5 text-[11px] text-slate-300">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flip/Reveal Action & Confidence Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2">
              <button
                onClick={() => setIsRevealed(!isRevealed)}
                className="px-3 py-1.5 rounded-xl bg-white/[0.06] hover:bg-white/[0.12] text-xs font-semibold text-white border border-white/10 flex items-center space-x-1.5 transition-all"
              >
                {isRevealed ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                    <span>{lang === 'en' ? 'Hide Answer' : 'उत्तर छिपाएं'}</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{lang === 'en' ? 'Reveal Answer' : 'उत्तर देखें'}</span>
                  </>
                )}
              </button>

              <div className="flex items-center space-x-1">
                {isRevealed && (
                  <div className="flex items-center space-x-1 mr-1">
                    <button
                      onClick={() => setConfidence('tricky')}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                        confidence === 'tricky'
                          ? 'bg-amber-600/40 text-amber-300 border-amber-400'
                          : 'bg-black/30 text-slate-400 border-white/10'
                      }`}
                    >
                      {lang === 'en' ? 'Tricky' : 'कठिन'}
                    </button>
                    <button
                      onClick={() => setConfidence('mastered')}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border ${
                        confidence === 'mastered'
                          ? 'bg-emerald-600/40 text-emerald-300 border-emerald-400'
                          : 'bg-black/30 text-slate-400 border-white/10'
                      }`}
                    >
                      {lang === 'en' ? 'Mastered' : 'याद हुआ'}
                    </button>
                  </div>
                )}

                <button
                  onClick={handleNextCard}
                  className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold flex items-center space-x-1 transition-all"
                  title="Next Question"
                >
                  <span>{lang === 'en' ? 'Next' : 'अगला'}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
