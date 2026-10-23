'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Lock,
  X,
  Sparkles,
  CheckCircle2,
  Mail,
  User,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { addBScWaitlistEntry, BScWaitlistEntry } from '@/lib/waitlistStorage';
import { SDSUV_COLLEGES_LIST, getDefaultSubjectsForStream } from '@/lib/studentProfile';
import { registerStudent } from '@/lib/studentRegistry';

interface BScWaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStream?: 'bsc-maths' | 'bsc-bio';
  defaultSemester?: number;
  onSuccess?: (entry: BScWaitlistEntry) => void;
}

export default function BScWaitlistModal({
  isOpen,
  onClose,
  defaultStream = 'bsc-maths',
  defaultSemester = 4,
  onSuccess,
}: BScWaitlistModalProps) {
  const [mounted, setMounted] = useState(false);
  const [priorityId, setPriorityId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [stream, setStream] = useState<'bsc-maths' | 'bsc-bio'>(defaultStream);
  const [semester, setSemester] = useState<number>(defaultSemester);
  const [college, setCollege] = useState(SDSUV_COLLEGES_LIST[0]);
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (defaultStream) setStream(defaultStream);
    if (defaultSemester) setSemester(defaultSemester);
  }, [defaultStream, defaultSemester]);

  const handleSubmit = (e?: React.FormEvent | React.MouseEvent | React.KeyboardEvent) => {
    if (e && 'preventDefault' in e) e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const entry = addBScWaitlistEntry({
        name: name.trim(),
        email: email.trim(),
        stream,
        semester,
        college,
        phone: phone.trim(),
        notes: notes.trim(),
      });

      // Also register student so they appear in student directory
      registerStudent({
        id: entry.id,
        name: name.trim(),
        email: email.trim(),
        course: stream,
        semester,
        selected_subjects: getDefaultSubjectsForStream(stream),
        preferred_medium: 'en',
        college,
        target_goal: 'BSc Early Access Waitlist',
        phone: phone.trim() || undefined,
        source: 'waitlist',
        created_at: entry.createdAt,
      });

      const randomId = Math.floor(1000 + Math.random() * 9000).toString();
      setPriorityId(randomId);
      setIsSubmitted(true);
      if (onSuccess) onSuccess(entry);
    } catch (err) {
      console.error('Waitlist submission failed:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    onClose();
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        {/* Ambient Glow */}
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-600/25 via-blue-600/20 to-violet-600/20 blur-[130px] pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.93, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-[#0a0f26]/95 border border-cyan-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/70 text-slate-100 overflow-hidden my-8"
        >
          {/* Top Decorative Himalayan Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600" />

          {/* Close Button */}
          <button
            onClick={handleResetAndClose}
            className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {!isSubmitted ? (
            <div className="space-y-5">
              {/* Header */}
              <div className="space-y-1.5 pr-8">
                <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-[11px] font-bold">
                  <Lock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>BSc Phase 2 Early Access • Coming Soon</span>
                </div>

                <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                  Join the SDSUV BSc Waitlist 🔔
                </h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We are launching Phase 1 exclusively for <span className="text-emerald-400 font-bold">BA (Bachelor of Arts)</span> students. Enter your details below to get instant notification &amp; VIP priority access when <span className="text-cyan-300 font-bold">BSc Maths (PCM)</span> and <span className="text-emerald-300 font-bold">BSc Bio (CBZ)</span> go live!
                </p>
              </div>

              {/* Form Container */}
              <div
                className="space-y-4 text-xs"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSubmit();
                  }
                }}
              >
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                      <User className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Abhishek Dobhal"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-violet-400" />
                      <span>Email Address *</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@gmail.com"
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                      required
                    />
                  </div>
                </div>

                {/* Target Stream Choice */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Select Target BSc Stream *</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setStream('bsc-maths')}
                      className={`p-3 rounded-2xl border text-left transition-all relative ${
                        stream === 'bsc-maths'
                          ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-md shadow-cyan-500/20'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">📐</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-cyan-300 border border-cyan-500/30">
                          PCM Group
                        </span>
                      </div>
                      <div className="font-extrabold text-xs text-white">BSc (Maths Group)</div>
                      <div className="text-[10px] text-slate-400">Physics, Maths, Chemistry</div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setStream('bsc-bio')}
                      className={`p-3 rounded-2xl border text-left transition-all relative ${
                        stream === 'bsc-bio'
                          ? 'bg-emerald-950/80 border-emerald-400 text-white shadow-md shadow-emerald-500/20'
                          : 'bg-white/[0.03] border-white/10 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">🧬</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-black/60 text-emerald-300 border border-emerald-500/30">
                          CBZ Group
                        </span>
                      </div>
                      <div className="font-extrabold text-xs text-white">BSc (Bio Group)</div>
                      <div className="text-[10px] text-slate-400">Botany, Zoology, Chemistry</div>
                    </button>
                  </div>
                </div>

                {/* Semester Choice */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                    <Layers className="w-3.5 h-3.5 text-amber-400" />
                    <span>Your Current Semester *</span>
                  </label>
                  <div className="grid grid-cols-6 gap-1.5">
                    {[1, 2, 3, 4, 5, 6].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setSemester(s)}
                        className={`py-2 rounded-xl font-mono text-xs font-bold border transition-all ${
                          semester === s
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 shadow-md font-black'
                            : 'bg-white/[0.04] text-slate-400 border-white/10 hover:text-white'
                        }`}
                      >
                        S{s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* College Selector (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>Campus / Affiliated College</span>
                  </label>
                  <select
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs truncate"
                  >
                    {SDSUV_COLLEGES_LIST.map((c) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-400 to-blue-600 text-slate-950 font-black text-xs shadow-xl shadow-cyan-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                >
                  <Bell className="w-4 h-4 text-slate-950" />
                  <span>{isSubmitting ? 'Securing Priority Spot...' : '🔔 Notify Me on BSc Phase 2 Launch'}</span>
                  <ArrowRight className="w-4 h-4 text-slate-950" />
                </button>
              </div>
            </div>
          ) : (
            /* Success confirmation */
            <div className="py-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
                  Waitlist Confirmed • Priority ID #{priorityId || '7294'}
                </span>
                <h3 className="text-xl font-extrabold text-white">
                  You’re on the BSc Priority List! 🚀
                </h3>
                <p className="text-xs text-slate-300 mt-2 max-w-sm mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{name}</strong>. We will notify you at <strong className="text-cyan-300">{email}</strong> as soon as SDSUV BSc ({stream === 'bsc-maths' ? 'Maths PCM' : 'Bio CBZ'}) curriculum, lectures, and PYQs are released.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 text-left text-xs space-y-1.5 text-slate-300">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Stream Queued:</span>
                  <span className="font-bold text-white">
                    {stream === 'bsc-maths' ? 'BSc Maths (PCM)' : 'BSc Bio (CBZ)'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Target Semester:</span>
                  <span className="font-bold text-white">Semester {semester}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">SDSUV College:</span>
                  <span className="font-bold text-cyan-300 truncate max-w-[200px]">{college}</span>
                </div>
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/10 text-white font-bold text-xs transition-colors"
              >
                Back to APSB Nexus
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
}
