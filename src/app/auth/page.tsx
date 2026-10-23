'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Mail,
  User,
  BookOpen,
  Layers,
  Globe2,
  ArrowRight,
  ShieldAlert,
  Zap,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import AmbassadorCarLogo from '@/components/AmbassadorCarLogo';
import {
  saveStudentProfile,
  COURSE_SEMESTER_SUBJECTS,
  getDefaultSubjectsForStream,
  isStudentLoggedIn,
  SDSUV_COLLEGES_LIST,
  CAREER_GOALS_LIST,
} from '@/lib/studentProfile';
import { registerStudent, getRegisteredStudents } from '@/lib/studentRegistry';
import CourseSelectorCards from '@/components/CourseSelectorCards';
import ThemeToggle from '@/components/ThemeToggle';
import { sanitizeName, sanitizeEmail, sanitizeText, isValidEmail } from '@/lib/sanitize';

function AuthForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const redirectTarget = searchParams.get('redirect') || '/dashboard';

  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Background sync: pull registered students from Supabase so local registry stays updated across devices
  useEffect(() => {
    let isMounted = true;
    fetch('/api/students')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!isMounted || !data || !Array.isArray(data.students)) return;
        for (const s of data.students) {
          if (!s || !s.email) continue;
          const degreeStr = (s.degree || 'BA').toLowerCase();
          let courseStream: StreamType = 'ba-arts';
          if (degreeStr.includes('math') || degreeStr === 'bsc-maths') courseStream = 'bsc-maths';
          else if (degreeStr.includes('bio') || degreeStr === 'bsc-bio') courseStream = 'bsc-bio';
          const mediumLang: LanguageType =
            s.medium && (s.medium.toLowerCase() === 'hindi' || s.medium.toLowerCase() === 'hi') ? 'hi' : 'en';
          const activeSem = typeof s.semester === 'number' ? (s.semester % 2 === 0 ? 1 : s.semester) : 1;

          registerStudent({
            id: s.id,
            name: s.full_name || s.name || 'Scholar',
            email: s.email,
            course: courseStream,
            semester: activeSem,
            selected_subjects: Array.isArray(s.subjects) ? s.subjects : [],
            preferred_medium: mediumLang,
            college: s.college || SDSUV_COLLEGES_LIST[0],
            target_goal: s.target_goal || CAREER_GOALS_LIST[0],
            source: 'cloud',
            created_at: s.created_at,
          });
        }
      })
      .catch((err) => {
        console.warn('Initial student cloud sync notice:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Form Fields - Initialized with URL params if provided
  const courseParam = (searchParams.get('course') as StreamType) || 'ba-arts';
  const semParam = Number(searchParams.get('sem')) || 1;
  const mediumParam = (searchParams.get('medium') as LanguageType) || 'en';
  const subjectsParam = searchParams.get('subjects');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [college, setCollege] = useState(SDSUV_COLLEGES_LIST[0]);
  const [customCollege, setCustomCollege] = useState('');
  const [targetGoal, setTargetGoal] = useState(CAREER_GOALS_LIST[0]);
  const [course, setCourse] = useState<StreamType>(courseParam);
  const [semester, setSemester] = useState<number>(semParam % 2 === 0 ? 1 : semParam);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    subjectsParam
      ? subjectsParam.split(',').filter(Boolean)
      : getDefaultSubjectsForStream(courseParam)
  );
  const [medium, setMedium] = useState<LanguageType>(mediumParam);

  // Update default selected subjects when course changes
  const handleCourseChange = (newCourse: StreamType) => {
    setCourse(newCourse);
    setSelectedSubjects(getDefaultSubjectsForStream(newCourse));
  };

  const handleToggleSubject = (code: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanName = sanitizeName(name, 80);
    const cleanEmail = sanitizeEmail(email);
    const cleanPassword = password.trim();

    if (!cleanName || cleanName.length < 2) {
      setErrorMsg('Please enter your full name (minimum 2 characters, letters only).');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      setErrorMsg('Please enter a valid email address (e.g., student@gmail.com).');
      return;
    }
    if (!cleanPassword || cleanPassword.length < 4) {
      setErrorMsg('Please enter a password with at least 4 characters.');
      return;
    }
    if (cleanPassword.length > 128) {
      setErrorMsg('Password must be 128 characters or fewer.');
      return;
    }
    if (selectedSubjects.length === 0) {
      setErrorMsg('Please select at least 1 subject for your semester curriculum.');
      return;
    }

    const rawCollege =
      college === 'Other SDSUV Affiliated Degree / PG College' && customCollege.trim()
        ? customCollege.trim()
        : college;
    const finalCollege = sanitizeText(rawCollege, 120);
    const finalGoal = sanitizeText(targetGoal, 80);

    const saved = saveStudentProfile({
      name: cleanName,
      email: cleanEmail,
      college: finalCollege,
      targetGoal: finalGoal,
      stream: course,
      semester,
      selectedSubjects,
      preferredMedium: medium,
      characterBuddy: 'doraemon',
      isLoggedIn: true,
    });

    // Explicitly guarantee enrollment in central registry
    registerStudent({
      name: saved.name,
      email: saved.email,
      course: saved.stream,
      semester: saved.semester,
      selected_subjects: saved.selectedSubjects,
      preferred_medium: saved.preferredMedium,
      college: saved.college,
      target_goal: saved.targetGoal,
      source: 'direct',
      created_at: saved.createdAt,
    });

    router.push(redirectTarget);
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const studentEmail = sanitizeEmail(email);
    if (!isValidEmail(studentEmail)) {
      setErrorMsg('Please enter a valid registered email address.');
      return;
    }
    if (!password.trim()) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Check local registry first
      const existingList = getRegisteredStudents();
      let existing = existingList.find((s) => s.email.toLowerCase() === studentEmail);

      // 2. If not found in local storage (e.g. on mobile, new device, incognito),
      // look up account in live Supabase cloud database
      if (!existing) {
        try {
          const res = await fetch(`/api/students?email=${encodeURIComponent(studentEmail)}`);
          if (res.ok) {
            const data = await res.json();
            if (data && data.student) {
              const cloud = data.student;
              const degreeStr = (cloud.degree || 'BA').toLowerCase();
              let courseStream: StreamType = 'ba-arts';
              if (degreeStr.includes('math') || degreeStr === 'bsc-maths') courseStream = 'bsc-maths';
              else if (degreeStr.includes('bio') || degreeStr === 'bsc-bio') courseStream = 'bsc-bio';

              const mediumLang: LanguageType =
                cloud.medium && (cloud.medium.toLowerCase() === 'hindi' || cloud.medium.toLowerCase() === 'hi')
                  ? 'hi'
                  : 'en';

              const activeSem = typeof cloud.semester === 'number' ? (cloud.semester % 2 === 0 ? 1 : cloud.semester) : 1;
              const subs =
                Array.isArray(cloud.subjects) && cloud.subjects.length > 0
                  ? cloud.subjects
                  : getDefaultSubjectsForStream(courseStream);

              // Register into local registry
              existing = registerStudent({
                id: cloud.id || `stu-cloud-${Date.now()}`,
                name: cloud.full_name || cloud.name || 'Scholar',
                email: cloud.email,
                course: courseStream,
                semester: activeSem,
                selected_subjects: subs,
                preferred_medium: mediumLang,
                college: cloud.college || SDSUV_COLLEGES_LIST[0],
                target_goal: cloud.target_goal || CAREER_GOALS_LIST[0],
                source: 'cloud',
                created_at: cloud.created_at || new Date().toISOString(),
              });
            }
          }
        } catch (fetchErr) {
          console.error('Failed to query cloud student registry:', fetchErr);
        }
      }

      if (!existing) {
        setErrorMsg(
          `No registered account found with email "${studentEmail}". Please click "Create Account (Sign Up)" above to create your profile.`
        );
        setIsSubmitting(false);
        return;
      }

      saveStudentProfile({
        name: existing.name,
        email: existing.email,
        college: existing.college || SDSUV_COLLEGES_LIST[0],
        targetGoal: existing.target_goal || CAREER_GOALS_LIST[0],
        stream: existing.course || course,
        semester: existing.semester || semester,
        selectedSubjects:
          existing.selected_subjects && existing.selected_subjects.length > 0
            ? existing.selected_subjects
            : selectedSubjects,
        preferredMedium: existing.preferred_medium || medium,
        isLoggedIn: true,
      });

      router.push(redirectTarget);
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableSubjects = COURSE_SEMESTER_SUBJECTS[course] || [];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 himalayan-mesh-bg relative flex flex-col justify-between selection:bg-cyan-500 selection:text-black py-5 sm:py-8 px-3 sm:px-6">
      {/* Background Starry Mesh */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-cyan-600/15 via-violet-600/15 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* Top Header Link & Controls */}
      <div className="relative z-10 max-w-xl mx-auto w-full flex items-center justify-between pb-4 sm:pb-6">
        <Link
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Landing Page</span>
        </Link>

        <div className="flex items-center space-x-3">
          <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
            Independent Student Prep Platform
          </span>
          <ThemeToggle compact={true} />
        </div>
      </div>

      {/* Main Auth Container */}
      <main className="relative z-10 max-w-xl mx-auto w-full">
        <div className="rounded-3xl glass-panel p-4 sm:p-6 md:p-8 border border-white/10 bg-[#090e24]/90 shadow-2xl backdrop-blur-2xl space-y-5 sm:space-y-6">
          {/* Logo & Headline */}
          <div className="text-center space-y-2">
            <div className="flex justify-center pb-1">
              <AmbassadorCarLogo size={48} />
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {mode === 'signup' ? 'Create Your Student Study Account' : 'Welcome Back, Scholar!'}
            </h1>
            <p className="text-xs text-slate-300 max-w-sm mx-auto">
              {mode === 'signup'
                ? 'Register your course & subjects to get a personalized dashboard for your semester exams.'
                : 'Sign in to access your customized syllabus, bookmarked PYQs, and revision vault.'}
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 gap-1 bg-black/50 p-1 rounded-2xl border border-white/10 text-xs font-bold">
            <button
              type="button"
              onClick={() => setMode('signin')}
              className={`py-2 rounded-xl transition-all ${
                mode === 'signin'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('signup')}
              className={`py-2 rounded-xl transition-all ${
                mode === 'signup'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Create Account (Sign Up)
            </button>
          </div>

          {/* Error Message Banner */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-start space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* ================================================================ */}
          {/* SIGN IN FORM                                                     */}
          {/* ================================================================ */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="student@gmail.com"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-violet-400" />
                  <span>Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg('');
                  }}
                  placeholder="••••••••"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3.5 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Verifying Account...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2 text-center">
                <p className="text-[11px] text-slate-400 font-mono">
                  New scholar at Sri Dev Suman University?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signup');
                      setErrorMsg('');
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-bold underline underline-offset-2 ml-1"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          )}

          {/* ================================================================ */}
          {/* SIGN UP FORM (With Course, Semester, Subjects & Medium)          */}
          {/* ================================================================ */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-5 text-xs">
              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Your Full Name *</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Negi"
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
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
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" />
                  <span>Create Password *</span>
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              {/* College Campus & Career Goal */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    <span>College Campus *</span>
                  </label>
                  <select
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs truncate"
                  >
                    {SDSUV_COLLEGES_LIST.map((c: string) => (
                      <option key={c} value={c} className="bg-slate-900 text-white">
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Target Career Goal *</span>
                  </label>
                  <select
                    value={targetGoal}
                    onChange={(e) => setTargetGoal(e.target.value)}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-cyan-400 text-xs truncate"
                  >
                    {CAREER_GOALS_LIST.map((g) => (
                      <option key={g} value={g} className="bg-slate-900 text-white">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {college === 'Other SDSUV Affiliated Degree / PG College' && (
                <div className="space-y-1.5">
                  <label className="text-slate-400 font-mono text-[10px] uppercase font-bold">
                    Enter Your College Name &amp; District
                  </label>
                  <input
                    type="text"
                    value={customCollege}
                    onChange={(e) => setCustomCollege(e.target.value)}
                    placeholder="e.g. Government Degree College, Lansdowne"
                    className="w-full bg-black/60 border border-cyan-500/40 rounded-xl px-3 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              {/* Course Selection (BA Active, BSc Locked with Waitlist) */}
              <div className="space-y-2">
                <label className="text-slate-300 font-mono text-[11px] uppercase font-bold flex items-center space-x-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Choose Your Course &amp; Curriculum *</span>
                </label>

                <CourseSelectorCards
                  selectedCourse={course}
                  onSelectCourse={handleCourseChange}
                  selectedSemester={semester}
                  onSelectSemester={setSemester}
                  selectedMedium={medium}
                  onSelectMedium={setMedium}
                  selectedSubjects={selectedSubjects}
                  onToggleSubject={handleToggleSubject}
                  showCurriculumConfig={true}
                  lang={medium}
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 hover:scale-[1.01] transition-all flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Create Account & Open My Dashboard</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </form>
          )}
        </div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="relative z-10 text-center py-4 text-[10px] text-slate-500 font-mono">
        © 2026 APSB Nexus • Independent Student Prep Platform for SDSUV BA Students • Not affiliated with SDSUV.
      </footer>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070913] flex items-center justify-center text-cyan-400 font-mono text-xs">
          Loading APSB Nexus Portal...
        </div>
      }
    >
      <AuthForm />
    </Suspense>
  );
}
