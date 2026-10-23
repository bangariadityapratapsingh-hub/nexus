'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  GraduationCap,
  Clock,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Flag,
  Award,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check,
} from 'lucide-react';
import { StreamType, LanguageType, MockQuestion } from '@/lib/types';
import { MOCK_TEST_QUESTIONS } from '@/data/portalData';

interface ExamSimulatorTabProps {
  stream: StreamType;
  lang: LanguageType;
}

export default function ExamSimulatorTab({ stream, lang }: ExamSimulatorTabProps) {
  // Filter questions for active stream
  const allStreamQuestions = MOCK_TEST_QUESTIONS.filter(
    (q) => q.stream === stream || (stream === 'bsc-maths' && q.id <= 4)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(600); // 10 minutes
  const [testStarted, setTestStarted] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (!testStarted || isSubmitted) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted, isSubmitted]);

  const currentQ = allStreamQuestions[currentIndex] || allStreamQuestions[0];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const toggleFlag = (qId: number) => {
    setFlaggedQuestions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleSubmitTest = () => {
    setIsSubmitted(true);
    // Calculate score
    let correct = 0;
    allStreamQuestions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });

    // Confetti celebration if scored well!
    if (correct / allStreamQuestions.length >= 0.5) {
      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#06b6d4', '#8b5cf6', '#f59e0b', '#10b981'],
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleResetTest = () => {
    setSelectedAnswers({});
    setFlaggedQuestions({});
    setIsSubmitted(false);
    setSecondsRemaining(600);
    setCurrentIndex(0);
    setTestStarted(true);
  };

  // Score computation
  const correctCount = allStreamQuestions.filter((q) => selectedAnswers[q.id] === q.correctIndex).length;
  const attemptedCount = Object.keys(selectedAnswers).length;
  const scorePercent = Math.round((correctCount / allStreamQuestions.length) * 100);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      {/* Test Intro Screen if not started */}
      {!testStarted && !isSubmitted && (
        <div className="rounded-3xl glass-panel p-8 sm:p-12 border border-white/10 text-center max-w-2xl mx-auto space-y-6 bg-gradient-to-b from-[#0b1028] to-[#070913] relative overflow-hidden">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center mx-auto text-white shadow-xl shadow-cyan-500/25">
            <GraduationCap className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold">
              SDSUV NEP 2020 Examination Simulator
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              {lang === 'en' ? 'Stream-Specific Timed Mock Exam' : 'संकाय-विशिष्ट समयबद्ध मॉक परीक्षा'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
              {lang === 'en'
                ? 'Simulate authentic university conditions with timer, question flagging, instant answer analytics, and score report.'
                : 'विश्वविद्यालय परीक्षा पैटर्न पर आधारित वास्तविक समय परीक्षा, अंक विश्लेषण एवं समाधान।'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-md mx-auto text-xs">
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-slate-400 block text-[10px] font-bold">Questions</span>
              <span className="text-white font-mono font-bold text-base">{allStreamQuestions.length} MCQs</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-slate-400 block text-[10px] font-bold">Duration</span>
              <span className="text-cyan-400 font-mono font-bold text-base">10 Mins</span>
            </div>
            <div className="p-3 rounded-2xl bg-black/40 border border-white/5">
              <span className="text-slate-400 block text-[10px] font-bold">Marking</span>
              <span className="text-amber-400 font-mono font-bold text-base">+2 / No Neg</span>
            </div>
          </div>

          <button
            onClick={() => setTestStarted(true)}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            {lang === 'en' ? 'Launch Exam Simulator Now' : 'परीक्षा प्रारंभ करें'}
          </button>
        </div>
      )}

      {/* Active Test Screen */}
      {testStarted && !isSubmitted && (
        <div className="space-y-6">
          {/* Top Bar: Timer, Status, Submit */}
          <div className="glass-panel p-4 rounded-2xl border border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                  {lang === 'en' ? 'Live Exam Session' : 'सक्रिय परीक्षा सत्र'}
                </h3>
                <span className="text-[11px] text-slate-400">
                  {lang === 'en' ? `Question ${currentIndex + 1} of ${allStreamQuestions.length}` : `प्रश्न ${currentIndex + 1}/${allStreamQuestions.length}`}
                </span>
              </div>
            </div>

            {/* Countdown Clock */}
            <div
              className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm ${
                secondsRemaining < 120
                  ? 'bg-rose-950/80 border-rose-500/40 text-rose-400 animate-pulse'
                  : 'bg-black/40 border-cyan-500/30 text-cyan-300'
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(secondsRemaining)}</span>
            </div>

            <button
              onClick={handleSubmitTest}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition-all"
            >
              {lang === 'en' ? 'Submit Examination' : 'परीक्षा समाप्त करें'}
            </button>
          </div>

          {/* Test Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Current Question & Options */}
            <div className="lg:col-span-8 rounded-3xl p-6 sm:p-8 glass-panel border border-white/10 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/20 font-mono text-xs font-bold">
                  {currentQ.subject} • 2 Marks
                </span>
                <button
                  onClick={() => toggleFlag(currentQ.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                    flaggedQuestions[currentQ.id]
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                      : 'bg-white/[0.04] text-slate-400 border-white/5 hover:text-white'
                  }`}
                >
                  <Flag className="w-3.5 h-3.5" />
                  <span>
                    {flaggedQuestions[currentQ.id]
                      ? lang === 'en'
                        ? 'Flagged'
                        : 'समीक्षा हेतु चिह्नित'
                      : lang === 'en'
                      ? 'Flag for Review'
                      : 'समीक्षा हेतु चिह्नित करें'}
                  </span>
                </button>
              </div>

              {/* Question Text */}
              <h3 className="text-base sm:text-lg font-bold text-white leading-relaxed">
                {lang === 'en' ? currentQ.questionEn : currentQ.questionHi}
              </h3>

              {/* Options */}
              <div className="space-y-3 pt-2">
                {(lang === 'en' ? currentQ.optionsEn : currentQ.optionsHi).map((opt, oIdx) => {
                  const isSelected = selectedAnswers[currentQ.id] === oIdx;
                  return (
                    <div
                      key={oIdx}
                      onClick={() => handleSelectOption(oIdx)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center space-x-3.5 ${
                        isSelected
                          ? 'bg-cyan-950/40 border-cyan-400 text-white shadow-md shadow-cyan-500/10'
                          : 'bg-white/[0.02] border-white/5 text-slate-300 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold border shrink-0 ${
                          isSelected
                            ? 'bg-cyan-400 text-slate-950 border-cyan-300'
                            : 'border-slate-600 bg-black/40 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </div>
                      <span className="text-xs sm:text-sm font-medium leading-normal">{opt}</span>
                    </div>
                  );
                })}
              </div>

              {/* Navigation buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <button
                  disabled={currentIndex === 0}
                  onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
                  className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] disabled:opacity-40 text-xs font-semibold text-white flex items-center space-x-1 border border-white/5"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>{lang === 'en' ? 'Previous' : 'पिछला'}</span>
                </button>

                <button
                  disabled={currentIndex === allStreamQuestions.length - 1}
                  onClick={() => setCurrentIndex((prev) => Math.min(allStreamQuestions.length - 1, prev + 1))}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 text-xs font-bold flex items-center space-x-1"
                >
                  <span>{lang === 'en' ? 'Next' : 'अगला'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right: Question Palette Navigator */}
            <div className="lg:col-span-4 rounded-3xl p-6 glass-panel border border-white/10 space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {lang === 'en' ? 'Question Navigator' : 'प्रश्न तालिका'}
              </h4>

              <div className="grid grid-cols-4 gap-2">
                {allStreamQuestions.map((q, idx) => {
                  const isAnswered = selectedAnswers[q.id] !== undefined;
                  const isFlagged = flaggedQuestions[q.id];
                  const isCurrent = currentIndex === idx;

                  let badgeStyle = 'bg-white/[0.03] text-slate-400 border-white/5';
                  if (isCurrent) badgeStyle = 'ring-2 ring-cyan-400 text-white bg-cyan-950 font-bold';
                  else if (isFlagged) badgeStyle = 'bg-amber-950 text-amber-300 border-amber-500/40 font-bold';
                  else if (isAnswered) badgeStyle = 'bg-emerald-950 text-emerald-300 border-emerald-500/40 font-bold';

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-10 rounded-xl text-xs font-mono border flex items-center justify-center transition-all ${badgeStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="space-y-1.5 pt-3 border-t border-white/5 text-[11px] text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-emerald-950 border border-emerald-500/40" />
                  <span>{lang === 'en' ? 'Answered' : 'उत्तर दिया'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-amber-950 border border-amber-500/40" />
                  <span>{lang === 'en' ? 'Flagged for Review' : 'समीक्षा हेतु'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded bg-white/[0.03] border border-white/5" />
                  <span>{lang === 'en' ? 'Unvisited' : 'अनुत्तरित'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Submitted Results & Review Screen */}
      {isSubmitted && (
        <div className="space-y-6">
          {/* Score Card Banner */}
          <div className="rounded-3xl p-6 sm:p-8 glass-panel border border-cyan-500/30 text-center space-y-4 bg-gradient-to-b from-[#0b1028] to-[#070913] relative overflow-hidden">
            <div className="inline-flex p-3 rounded-2xl bg-cyan-950 border border-cyan-400/40 text-cyan-400 shadow-xl shadow-cyan-500/20">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs uppercase font-mono tracking-widest text-cyan-400 font-bold">
                {lang === 'en' ? 'Exam Performance Scorecard' : 'परीक्षा परिणाम पत्रक'}
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
                {scorePercent}% {lang === 'en' ? 'Proficiency' : 'दक्षता'}
              </h2>
              <p className="text-xs text-slate-300 mt-1">
                {lang === 'en'
                  ? `You answered ${correctCount} out of ${allStreamQuestions.length} questions correctly.`
                  : `आपने ${allStreamQuestions.length} में से ${correctCount} प्रश्नों का सही उत्तर दिया।`}
              </p>
            </div>

            <div className="flex justify-center gap-3">
              <button
                onClick={handleResetTest}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center space-x-1.5 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{lang === 'en' ? 'Retake Simulator' : 'पुनः परीक्षा दें'}</span>
              </button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">
              {lang === 'en' ? 'Question-by-Question Solution Review' : 'प्रश्नवार विस्तृत उत्तर समीक्षा'}
            </h3>

            {allStreamQuestions.map((q, idx) => {
              const userPick = selectedAnswers[q.id];
              const isCorrect = userPick === q.correctIndex;
              return (
                <div
                  key={q.id}
                  className={`rounded-2xl p-5 border space-y-3 ${
                    isCorrect
                      ? 'bg-emerald-950/20 border-emerald-500/30'
                      : userPick !== undefined
                      ? 'bg-rose-950/20 border-rose-500/30'
                      : 'bg-white/[0.02] border-white/5'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-cyan-400 font-bold">Question {idx + 1} • {q.subject}</span>
                    <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>
                      {isCorrect
                        ? lang === 'en'
                          ? '+2 Marks Awarded'
                          : '+2 अंक'
                        : userPick !== undefined
                        ? lang === 'en'
                          ? 'Incorrect'
                          : 'त्रुटिपूर्ण'
                        : lang === 'en'
                        ? 'Skipped'
                        : 'छोड़ा गया'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-white">
                    {lang === 'en' ? q.questionEn : q.questionHi}
                  </p>

                  <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-300 space-y-1">
                    <span className="text-cyan-300 font-bold block text-[11px] uppercase">
                      {lang === 'en' ? 'Official Explanation:' : 'आधिकारिक व्याख्या:'}
                    </span>
                    <p className="leading-relaxed font-sans">{lang === 'en' ? q.explanationEn : q.explanationHi}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
