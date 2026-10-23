'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, Bookmark, BookOpen, Archive, GraduationCap, Compass, ShieldAlert, Lock } from 'lucide-react';
import { LanguageType } from '@/lib/types';
import AmbassadorCarLogo from '@/components/AmbassadorCarLogo';

interface FooterProps {
  lang?: LanguageType;
}

export default function Footer({ lang = 'en' }: FooterProps) {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-white/10 relative overflow-hidden bg-[#F1F5F9] dark:bg-[#05070f] transition-colors duration-200">
      {/* Ambient Horizon Glow */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-teal-500/30 dark:via-cyan-500/40 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-20 bg-teal-500/5 dark:bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 relative z-10 space-y-8 text-xs">
        {/* Unofficial Disclaimer Banner */}
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-500/40 text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm dark:shadow-lg">
          <div className="flex items-center space-x-2.5">
            <ShieldAlert className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <div>
              <span className="font-extrabold text-amber-900 dark:text-amber-300 block text-xs">
                Unofficial Student Prep Platform — Built for SDSUV BA & BSc Students
              </span>
              <p className="text-[11px] text-amber-800/90 dark:text-amber-200/90 font-medium">
                (Not affiliated with Sri Dev Suman Uttarakhand Vishwavidyalaya)
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 border border-amber-300 dark:border-amber-500/40 text-amber-900 dark:text-amber-300 shrink-0">
            Independent Student Platform
          </span>
        </div>

        {/* 4 Column Quick Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Col 1: Platform Brand & Mission */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2.5">
              <AmbassadorCarLogo size={32} />
              <div>
                <h4 className="font-black text-[#0F172A] dark:text-white text-sm tracking-wide">APSB NEXUS</h4>
                <p className="text-[10px] text-teal-700 dark:text-cyan-400 font-mono font-medium">Independent Student Prep Platform for SDSUV BA Students</p>
              </div>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-[11px] leading-relaxed">
              {lang === 'en'
                ? 'Independent Student Prep Platform for SDSUV BA Students. An open, student-driven study companion helping collegiate students ace exams with chapter-wise PYQs, video lessons, and exam simulators.'
                : 'एसडीएसयूवी बीए छात्रों के लिए स्वतंत्र अध्ययन मंच। गढ़वाल एवं कुमाऊं के विद्यार्थियों हेतु निःशुल्क छात्र-संचलित अध्ययन मंच।'}
            </p>
          </div>

          {/* Col 2: Study Vaults */}
          <div className="space-y-2">
            <h5 className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[11px]">
              {lang === 'en' ? 'Study Vaults' : 'अध्ययन कक्ष'}
            </h5>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
              <li>
                <Link href="/learn" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors flex items-center space-x-1.5">
                  <BookOpen className="w-3 h-3 text-teal-600 dark:text-cyan-400" />
                  <span>Syllabus & Cinema Studio</span>
                </Link>
              </li>
              <li>
                <Link href="/pyqs" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors flex items-center space-x-1.5">
                  <Archive className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>Dual-Language PYQ Vault</span>
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors flex items-center space-x-1.5">
                  <GraduationCap className="w-3 h-3 text-indigo-600 dark:text-violet-400" />
                  <span>3-Hour Exam Simulator</span>
                </Link>
              </li>
              <li>
                <Link href="/saved" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors flex items-center space-x-1.5">
                  <Bookmark className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                  <span>Exam Night Saved Vault</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Career Roadmaps */}
          <div className="space-y-2">
            <h5 className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider text-[11px]">
              {lang === 'en' ? 'Degree Career Paths' : 'डिग्री करियर विकल्प'}
            </h5>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-[11px]">
              <li>
                <Link href="/careers" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors flex items-center space-x-1.5">
                  <Compass className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  <span>CDS (IMA / OTA) & AFCAT Guide</span>
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors">
                  UPSC Civil Services & UKPSC State PCS
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors">
                  UPSC Indian Statistical Service (ISS)
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors">
                  Uttarakhand Hill Quota Physical Standards
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Student Hub & Administration */}
          <div className="space-y-2 text-[11px]">
            <h5 className="font-bold text-[#0F172A] dark:text-white uppercase tracking-wider">
              {lang === 'en' ? 'Student Account' : 'छात्र खाता'}
            </h5>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/profile" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors">
                  Manage Course, Semester & Subjects
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors">
                  Personalized Study Dashboard
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-teal-700 dark:hover:text-cyan-300 transition-colors flex items-center space-x-1">
                  <Lock className="w-3 h-3 text-teal-600 dark:text-cyan-400" />
                  <span>Creator Studio [Admin]</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-6 border-t border-slate-200/80 dark:border-white/5 flex flex-wrap items-center justify-between gap-3 text-[10px] text-slate-500 font-mono">
          <div>
            © 2026 APSB Nexus. Independent Student Prep Platform for SDSUV BA Students.
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-slate-600 dark:text-slate-400">NEP 2020 Framework Compatible</span>
            <span>•</span>
            <span className="text-teal-700 dark:text-cyan-400 font-semibold">Designed for SDSUV BA Scholars</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
