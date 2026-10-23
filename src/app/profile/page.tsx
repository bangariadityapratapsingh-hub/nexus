'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  GraduationCap,
  BookOpen,
  Layers,
  Globe2,
  CheckCircle2,
  Save,
  LogOut,
  Sparkles,
  ArrowLeft,
  ShieldAlert,
  Compass,
  Check,
  AlertCircle,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import {
  getStudentProfile,
  saveStudentProfile,
  signOutStudent,
  isStudentLoggedIn,
  COURSE_SEMESTER_SUBJECTS,
  getDefaultSubjectsForStream,
  CAREER_GOALS_LIST,
  StudentProfile,
} from '@/lib/studentProfile';
import { STREAMS_CONFIG } from '@/data/portalData';
import CourseSelectorCards from '@/components/CourseSelectorCards';
import { useSidebarState } from '@/lib/sidebarState';
import { sanitizeName, sanitizeEmail, sanitizeText, isValidEmail } from '@/lib/sanitize';

export default function ProfilePage() {
  const { isCollapsed } = useSidebarState();
  const router = useRouter();
  const [profile, setProfile] = useState<StudentProfile | null>(null);
  const [lang, setLang] = useState<LanguageType>('en');

  // Form edit state - Default to BA Arts for Phase 1
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState<StreamType>('ba-arts');
  const [semester, setSemester] = useState<number>(1);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [medium, setMedium] = useState<LanguageType>('en');
  const [targetGoal, setTargetGoal] = useState('');

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    const p = getStudentProfile();
    if (p && p.isLoggedIn) {
      setProfile(p);
      setName(p.name);
      setEmail(p.email);
      setCourse(p.stream);
      setSemester(p.semester % 2 === 0 ? 1 : p.semester);
      setSelectedSubjects(p.selectedSubjects || getDefaultSubjectsForStream(p.stream));
      setMedium(p.preferredMedium);
      setLang(p.preferredMedium);
      setTargetGoal(p.targetGoal || CAREER_GOALS_LIST[0]);
    } else {
      // If not logged in, route to /auth
      router.replace('/auth?mode=signin&redirect=/profile');
    }
  }, [router]);

  const handleCourseChange = (newCourse: StreamType) => {
    setCourse(newCourse);
    // Auto-populate default core subjects for new course
    setSelectedSubjects(getDefaultSubjectsForStream(newCourse));
  };

  const toggleSubject = (code: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const cleanName = sanitizeName(name, 80);
    const cleanEmail = sanitizeEmail(email);
    const cleanGoal = sanitizeText(targetGoal, 80);

    if (!cleanName || cleanName.length < 2) {
      alert(lang === 'en' ? 'Please enter a valid full name.' : 'कृपया एक मान्य पूरा नाम दर्ज करें।');
      return;
    }
    if (!isValidEmail(cleanEmail)) {
      alert(lang === 'en' ? 'Please enter a valid email address.' : 'कृपया एक मान्य ईमेल पता दर्ज करें।');
      return;
    }
    if (selectedSubjects.length === 0) {
      alert(lang === 'en' ? 'Please select at least 1 subject.' : 'कृपया कम से कम 1 विषय चुनें।');
      return;
    }

    const updated = saveStudentProfile({
      name: cleanName,
      email: cleanEmail,
      stream: course,
      semester,
      selectedSubjects,
      preferredMedium: medium,
      targetGoal: cleanGoal || CAREER_GOALS_LIST[0],
      characterBuddy: 'doraemon',
      isLoggedIn: true,
    });

    setProfile(updated);
    setLang(medium);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleSignOut = () => {
    signOutStudent();
    router.push('/');
  };

  const availableSubjects = COURSE_SEMESTER_SUBJECTS[course] || [];

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 himalayan-mesh-bg relative flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-cyan-600/15 via-violet-600/15 to-transparent blur-[140px] pointer-events-none z-0" />

      {/* Top Floating Nav */}
      <FloatingNav lang={lang} setLang={setLang} />

      {/* Main Container - dynamically offsets for sidebar and expands to full portion when closed */}
      <div className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-24 relative z-10 ${isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'}`}>
        <main className={`transition-all duration-300 ease-in-out mx-auto px-4 sm:px-6 w-full ${isCollapsed ? 'max-w-5xl lg:px-8' : 'max-w-4xl lg:px-6'}`}>
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-6">
          <Link
            href="/dashboard"
            className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Back to My Dashboard' : 'डैशबोर्ड पर वापस'}</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-rose-950/60 hover:bg-rose-900/80 border border-rose-500/30 text-rose-300 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>{lang === 'en' ? 'Sign Out' : 'लॉग आउट'}</span>
          </button>
        </div>

        {/* Success Alert */}
        <AnimatePresence>
          {savedSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6 p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500/50 text-emerald-200 flex items-center space-x-3 shadow-lg shadow-emerald-950/50"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <div className="text-xs sm:text-sm font-medium">
                {lang === 'en'
                  ? 'Curriculum & profile updated successfully! Your dashboard now exclusively reflects your chosen subjects.'
                  : 'पाठ्यक्रम एवं प्रोफाइल सफलतापूर्वक अपडेट हो गई! अब डैशबोर्ड पर केवल आपके चुने हुए विषय दिखेंगे।'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Profile Card & Settings Form */}
        <div className="space-y-6">
          {/* Card Header */}
          <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden bg-gradient-to-br from-white/[0.04] to-[#090d20]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500 to-violet-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-xl shadow-cyan-500/20">
                  {name ? name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-xl sm:text-2xl font-black text-white">{name || 'Student Profile'}</h1>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                      Sem {semester}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{email || 'student@sdsuvprep.in'}</p>
                  <p className="text-xs text-cyan-400 font-medium mt-1">
                    {course === 'bsc-maths'
                      ? 'BSc Mathematics Group'
                      : course === 'bsc-bio'
                      ? 'BSc Biology Group'
                      : 'BA Arts / Humanities'}
                  </p>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-300 space-y-1">
                <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider">
                  {lang === 'en' ? 'Active Subject Load' : 'सक्रिय विषय संख्या'}
                </div>
                <div className="text-base font-extrabold text-cyan-300">
                  {selectedSubjects.length} {lang === 'en' ? 'Subjects Configured' : 'विषय चयनित'}
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSave} className="space-y-6">
            {/* Step 1 & 2 & 3: Course Selection, Semester & BA Subjects */}
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 bg-[#070b18]/70 space-y-4">
              <div className="flex items-center space-x-2.5 mb-2">
                <span className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                  <GraduationCap className="w-4 h-4" />
                </span>
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white">
                    {lang === 'en' ? 'Degree, Semester & Subject Configuration' : 'डिग्री, सेमेस्टर एवं विषय विन्यास'}
                  </h2>
                  <p className="text-xs text-slate-400">
                    {lang === 'en'
                      ? 'Phase 1 is active exclusively for BA Arts. BSc tracks are coming soon with early-access waitlist.'
                      : 'चरण 1 विशेष रूप से बीए (कला स्नातक) छात्रों हेतु लाइव है। बीएससी छात्र प्रतीक्षा सूची में जुड़ सकते हैं।'}
                  </p>
                </div>
              </div>

              <CourseSelectorCards
                selectedCourse={course}
                onSelectCourse={handleCourseChange}
                selectedSemester={semester}
                onSelectSemester={setSemester}
                selectedMedium={medium}
                onSelectMedium={setMedium}
                selectedSubjects={selectedSubjects}
                onToggleSubject={toggleSubject}
                showCurriculumConfig={true}
                lang={lang}
              />
            </div>

            {/* Step 4: Medium & Target Goal */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Preferred Study Medium */}
              <div className="rounded-3xl glass-panel p-6 border border-white/10 bg-[#070b18]/70">
                <div className="flex items-center space-x-2.5 mb-3">
                  <span className="p-2 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400">
                    <Globe2 className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {lang === 'en' ? 'Preferred Study Medium' : 'अध्ययन का माध्यम'}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <button
                    type="button"
                    onClick={() => setMedium('en')}
                    className={`py-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-1.5 ${
                      medium === 'en'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-400'
                        : 'bg-white/[0.03] text-slate-300 border-white/5'
                    }`}
                  >
                    <span>🇬🇧</span>
                    <span>English Medium</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setMedium('hi')}
                    className={`py-3 rounded-xl text-xs font-bold transition-all border flex items-center justify-center space-x-1.5 ${
                      medium === 'hi'
                        ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white border-amber-400'
                        : 'bg-white/[0.03] text-slate-300 border-white/5'
                    }`}
                  >
                    <span>🇮🇳</span>
                    <span>हिंदी माध्यम</span>
                  </button>
                </div>
              </div>

              {/* Career Compass Ambition */}
              <div className="rounded-3xl glass-panel p-6 border border-white/10 bg-[#070b18]/70">
                <div className="flex items-center space-x-2.5 mb-3">
                  <span className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                    <Compass className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm font-bold text-white">
                    {lang === 'en' ? 'Target Career Ambition' : 'लक्ष्य करियर महत्वाकांक्षा'}
                  </h3>
                </div>
                <select
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  className="w-full mt-3 px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  {CAREER_GOALS_LIST.map((goal) => (
                    <option key={goal} value={goal} className="bg-slate-900 text-white">
                      {goal}
                    </option>
                  ))}
                </select>
              </div>
            </div>



            {/* Student Name & Email inputs */}
            <div className="rounded-3xl glass-panel p-6 border border-white/10 bg-[#070b18]/70 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {lang === 'en' ? 'Full Name' : 'पूरा नाम'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Rawat"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {lang === 'en' ? 'Email Address' : 'ईमेल पता'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@sdsuvprep.in"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <p className="text-xs text-slate-400 text-center sm:text-left">
                {lang === 'en'
                  ? 'All changes take immediate effect across your dashboard, study studio, and mock papers.'
                  : 'परिवर्तन तुरंत आपके पूरे डैशबोर्ड और स्टडी स्टूडियो पर लागू हो जाएंगे।'}
              </p>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-black text-sm shadow-xl shadow-cyan-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{lang === 'en' ? 'Save & Update Curriculum' : 'अपडेट एवं सहेजें'}</span>
              </button>
            </div>
          </form>
        </div>
      </main>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
