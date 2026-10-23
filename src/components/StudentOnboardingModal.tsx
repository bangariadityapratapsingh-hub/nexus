'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Mountain,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  ArrowRight,
  Shield,
  Layers,
  Award,
  Globe2,
  X,
  Lock,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import {
  getStudentProfile,
  saveStudentProfile,
  hasCompletedOnboarding,
  SDSUV_COLLEGES_LIST,
  CAREER_GOALS_LIST,
  StudentProfile,
  COURSE_SEMESTER_SUBJECTS,
  getDefaultSubjectsForStream,
  SubjectOption,
} from '@/lib/studentProfile';
import { registerStudent } from '@/lib/studentRegistry';
import { STREAMS_CONFIG } from '@/data/portalData';

interface StudentOnboardingModalProps {
  onProfileSaved?: (profile: StudentProfile) => void;
  defaultStream?: StreamType;
  defaultLang?: LanguageType;
}

export default function StudentOnboardingModal({
  onProfileSaved,
  defaultStream = 'bsc-maths',
  defaultLang = 'en',
}: StudentOnboardingModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [college, setCollege] = useState(SDSUV_COLLEGES_LIST[0]);
  const [customCollege, setCustomCollege] = useState('');
  const [stream, setStream] = useState<StreamType>(defaultStream);
  const [semester, setSemester] = useState<number>(1);
  const [medium, setMedium] = useState<LanguageType>(defaultLang);
  const [goal, setGoal] = useState<string>(CAREER_GOALS_LIST[0]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    getDefaultSubjectsForStream('ba-arts')
  );
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    setMounted(true);
    // Check if user has already onboarded
    const onboarded = hasCompletedOnboarding();
    if (!onboarded) {
      // Delay slightly for smooth page entrance
      const timer = setTimeout(() => setIsOpen(true), 700);
      return () => clearTimeout(timer);
    } else {
      const p = getStudentProfile();
      if (p) {
        setName(p.name);
        setEmail(p.email || '');
        setCollege(p.college || SDSUV_COLLEGES_LIST[0]);
        setStream(p.stream);
        setSemester(p.semester % 2 === 0 ? 1 : p.semester);
        setSelectedSubjects(p.selectedSubjects || getDefaultSubjectsForStream(p.stream));
        setMedium(p.preferredMedium);
        setGoal(p.targetGoal);
      }
    }

    // Listen for manual open trigger from header/profile button
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open_sdsuv_onboarding_modal', handleOpen);
    return () => window.removeEventListener('open_sdsuv_onboarding_modal', handleOpen);
  }, []);

  const handleToggleSubject = (code: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(code)
        ? prev.length > 1
          ? prev.filter((c) => c !== code)
          : prev
        : [...prev, code]
    );
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    const finalCollege = college === 'Other SDSUV Affiliated / Constituent College' && customCollege.trim()
      ? customCollege.trim()
      : college;

    const studentName = name.trim() || 'SDSUV Scholar';
    const fallbackEmail = name.trim()
      ? `${name.trim().toLowerCase().replace(/[^a-z0-9]/g, '.')}@sdsuvprep.in`
      : `scholar.${Date.now().toString(36)}@sdsuvprep.in`;
    const studentEmail = email.trim() || fallbackEmail;

    const saved = saveStudentProfile({
      name: studentName,
      email: studentEmail,
      college: finalCollege,
      stream,
      semester,
      selectedSubjects: selectedSubjects.length > 0 ? selectedSubjects : getDefaultSubjectsForStream(stream),
      preferredMedium: medium,
      targetGoal: goal,
      characterBuddy: 'doraemon',
      onboarded: true,
      isLoggedIn: true,
    });

    // Explicitly guarantee registry enrollment
    registerStudent({
      name: saved.name,
      email: saved.email,
      course: saved.stream,
      semester: saved.semester,
      selected_subjects: saved.selectedSubjects,
      preferred_medium: saved.preferredMedium,
      college: saved.college,
      target_goal: saved.targetGoal,
      phone: phone.trim() || undefined,
      source: 'onboarding',
      created_at: saved.createdAt,
    });

    if (onProfileSaved) {
      onProfileSaved(saved);
    }

    setIsOpen(false);
  };

  const streamInfo = STREAMS_CONFIG[stream];

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-hidden">
        {/* Ambient Glow */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-cyan-600/20 via-violet-600/20 to-amber-600/10 blur-[140px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-[#0a0f24] border border-cyan-500/30 rounded-3xl p-4 sm:p-6 md:p-7 shadow-2xl shadow-cyan-950/50 flex flex-col max-h-[92dvh] overflow-hidden"
        >
          {/* Himalayan Header Accent */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-amber-500" />

          {/* Close Button (if already onboarded before) */}
          <button
            onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Title Banner */}
            <div className="shrink-0 space-y-1 pb-1">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold">
                  <Mountain className="w-3.5 h-3.5 text-cyan-400" />
                  <span>APSB Nexus • Student Setup</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">NEP 2020</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Personalize Your SDSUV Study Pod ✨
              </h2>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Choose your enrolled subjects so notes, cinema lectures, and exam materials tune strictly to your profile.
              </p>
            </div>

            {/* Scrollable Form Body */}
            <div className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-4 text-xs scrollbar-thin">
              {/* Row 1: Student Name & College */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-mono text-[10px] uppercase font-bold flex items-center space-x-1">
                    <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Negi"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-mono text-[10px] uppercase font-bold flex items-center space-x-1">
                    <Mountain className="w-3.5 h-3.5 text-amber-400" />
                    <span>College Campus *</span>
                  </label>
                  <select
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs truncate"
                  >
                    {SDSUV_COLLEGES_LIST.map((c: string) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {college === 'Other SDSUV Affiliated / Constituent College' && (
                <div className="space-y-1">
                  <label className="text-slate-400 font-mono text-[10px] uppercase font-bold">
                    Enter Your College Name & District
                  </label>
                  <input
                    type="text"
                    value={customCollege}
                    onChange={(e) => setCustomCollege(e.target.value)}
                    placeholder="e.g. Govt Degree College, Lansdowne"
                    className="w-full bg-black/60 border border-cyan-500/40 rounded-xl px-3 py-2 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              {/* Row 2: Email Address & Contact Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-300 font-mono text-[10px] uppercase font-bold flex items-center space-x-1">
                    <span className="text-violet-400">✉️</span>
                    <span>Email Address (For Admin &amp; Study Sync) *</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. priya.negi@gmail.com"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-slate-300 font-mono text-[10px] uppercase font-bold flex items-center space-x-1">
                    <span className="text-emerald-400">📱</span>
                    <span>WhatsApp / Mobile Number (Optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 9876543210"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 text-xs"
                  />
                </div>
              </div>

              {/* Academic Stream */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-mono text-[10px] uppercase font-bold flex items-center space-x-1">
                  <BookOpen className="w-3.5 h-3.5 text-violet-400" />
                  <span>Academic Degree Program *</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { id: 'ba-arts' as StreamType, label: 'BA Arts (Active)', icon: '🏛️', desc: 'Phase 1 Active • All 11 Subjects' },
                    { id: 'bsc-maths' as StreamType, label: 'BSc Maths (Phase 2)', icon: '📐', desc: 'PCM • Waitlist Open' },
                    { id: 'bsc-bio' as StreamType, label: 'BSc Bio (Phase 2)', icon: '🧬', desc: 'CBZ • Waitlist Open' },
                  ].map((s) => {
                    const isSelected = stream === s.id;
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => {
                          setStream(s.id);
                          setSelectedSubjects(getDefaultSubjectsForStream(s.id));
                        }}
                        className={`p-2.5 rounded-2xl border text-left transition-all relative ${
                          isSelected
                            ? 'bg-gradient-to-b from-cyan-950/70 to-violet-950/70 border-cyan-400 shadow-md shadow-cyan-500/20'
                            : 'bg-white/[0.03] border-white/10 hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-lg">{s.icon}</span>
                          {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                        </div>
                        <div className="font-extrabold text-white text-xs">{s.label}</div>
                        <div className="text-[9px] text-slate-400 truncate">{s.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Semester & Medium */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Semester Selector */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-300 font-mono text-[10px] uppercase font-bold flex items-center space-x-1">
                      <Layers className="w-3.5 h-3.5 text-amber-400" />
                      <span>Semester (Odd Active)</span>
                    </label>
                    <span className="text-[9px] font-mono text-amber-400">Sem 1, 3, 5</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {[1, 2, 3, 4, 5, 6].map((sem) => {
                      const isEvenLocked = sem % 2 === 0;
                      if (isEvenLocked) {
                        return (
                          <div
                            key={sem}
                            className="py-1 px-0.5 rounded-lg font-mono text-center border border-dashed border-amber-500/30 bg-amber-500/[0.04] text-slate-500 cursor-not-allowed flex flex-col items-center justify-center opacity-65 select-none"
                          >
                            <span className="text-[9px] font-bold text-amber-400">S{sem}</span>
                            <span className="text-[6.5px] font-mono text-amber-500 uppercase leading-none">Soon</span>
                          </div>
                        );
                      }

                      return (
                        <button
                          type="button"
                          key={sem}
                          onClick={() => setSemester(sem)}
                          className={`py-1 px-0.5 rounded-lg font-mono text-xs font-bold transition-all border cursor-pointer flex flex-col items-center justify-center ${
                            semester === sem
                              ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 border-amber-400 font-black'
                              : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
                          }`}
                        >
                          <span>S{sem}</span>
                          <span className="text-[7px] font-mono text-emerald-400 uppercase leading-none">Live</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Medium Selection */}
                <div className="space-y-1">
                  <label className="text-slate-300 font-mono text-[10px] uppercase font-bold flex items-center space-x-1">
                    <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Study Medium</span>
                  </label>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setMedium('en')}
                      className={`p-2 rounded-xl border text-center font-bold text-xs transition-all flex items-center justify-center space-x-1 ${
                        medium === 'en'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400 shadow-sm'
                          : 'bg-white/[0.04] text-slate-300 border-white/10'
                      }`}
                    >
                      <span>🇬🇧</span>
                      <span>English</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setMedium('hi')}
                      className={`p-2 rounded-xl border text-center font-bold text-xs transition-all flex items-center justify-center space-x-1 ${
                        medium === 'hi'
                          ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-400 shadow-sm'
                          : 'bg-white/[0.04] text-slate-300 border-white/10'
                      }`}
                    >
                      <span>🇮🇳</span>
                      <span>हिंदी</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* STRICT SUBJECT SELECTION CHECKBOXES */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-200 font-mono text-[10px] uppercase font-bold flex items-center space-x-1">
                    <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Choose Enrolled Subjects ({selectedSubjects.length} Selected) *</span>
                  </label>
                  <span className="text-[9px] font-mono text-emerald-400">
                    Notes &amp; lectures strictly filter to these
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {(COURSE_SEMESTER_SUBJECTS[stream] || COURSE_SEMESTER_SUBJECTS['ba-arts']).map((subj: SubjectOption) => {
                    const isChecked = selectedSubjects.includes(subj.code);
                    return (
                      <button
                        type="button"
                        key={subj.code}
                        onClick={() => handleToggleSubject(subj.code)}
                        className={`p-2 rounded-xl border text-left transition-all flex items-start space-x-2 ${
                          isChecked
                            ? 'bg-emerald-950/70 border-emerald-400 text-white shadow-sm'
                            : 'bg-black/40 border-white/10 text-slate-400 hover:border-white/20'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center border shrink-0 ${
                            isChecked
                              ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                              : 'border-white/30 bg-transparent'
                          }`}
                        >
                          {isChecked && <CheckCircle2 className="w-3 h-3 text-slate-950" />}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-xs font-bold truncate text-white">
                            {medium === 'en' ? subj.nameEn : subj.nameHi}
                          </div>
                          <div className="text-[9px] font-mono text-slate-400">
                            {subj.code} • {subj.credits} Credits
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Career Ambition */}
              <div className="space-y-1">
                <label className="text-slate-300 font-mono text-[10px] uppercase font-bold flex items-center space-x-1">
                  <Award className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Target Career Goal</span>
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-2.5 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs"
                >
                  {CAREER_GOALS_LIST.map((g) => (
                    <option key={g} value={g} className="bg-slate-900 text-white">
                      {g}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Modal Bottom Action Bar (Fixed at Bottom, Never Clipped) */}
            <div className="shrink-0 pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white text-xs underline underline-offset-4"
              >
                Skip for now
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                <span>Save Subjects &amp; Start</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-950" />
              </button>
            </div>
          </motion.div>
        </div>
    </AnimatePresence>,
    document.body
  );
}
