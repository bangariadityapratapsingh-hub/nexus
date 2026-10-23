'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  BookOpen,
  Tv,
  Newspaper,
  LayoutDashboard,
  Clock,
} from 'lucide-react';
import { LanguageType } from '@/lib/types';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import { useSidebarState } from '@/lib/sidebarState';

export default function PYQVaultPage() {
  const { isCollapsed } = useSidebarState();
  const [lang, setLang] = useState<LanguageType>('en');

  // Load language preference if set
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sdsuv_lang');
      if (stored === 'en' || stored === 'hi') {
        setLang(stored);
      }
    } catch {
      // safe fallback
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F8F5] text-slate-900 dark:bg-[#070913] dark:text-slate-100 himalayan-mesh-bg relative flex flex-col justify-between selection:bg-amber-500 selection:text-black transition-colors duration-200">
      {/* Background Starry Mesh & Amber Ambient Glow */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-600/15 via-orange-600/10 to-transparent blur-[130px] pointer-events-none z-0" />

      {/* Primary Navigation */}
      <FloatingNav currentTab="pyqs" lang={lang} setLang={setLang} />

      {/* Main Container */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-24 md:pb-16 relative z-10 ${
          isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'
        }`}
      >
        <div className="mx-auto px-4 sm:px-6 max-w-5xl lg:px-8">
          {/* Breadcrumb Header */}
          <div className="glass-nav rounded-2xl px-3 sm:px-4 py-2.5 mb-6 flex flex-wrap items-center justify-between gap-2 border border-slate-200/90 dark:border-white/10 shadow-lg bg-white/80 dark:bg-[#080d22]/80 backdrop-blur-xl">
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <Link
                href="/dashboard"
                className="p-1.5 rounded-xl bg-slate-100 dark:bg-white/[0.05] hover:bg-slate-200 dark:hover:bg-white/[0.1] text-slate-700 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/10 transition-colors flex items-center space-x-1.5 text-xs font-semibold shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-500" />
                <span className="hidden xs:inline">{lang === 'en' ? 'Dashboard' : 'डैशबोर्ड'}</span>
              </Link>

              <div className="h-4 w-[1px] bg-slate-200 dark:bg-white/10 shrink-0" />

              <div className="flex items-center space-x-1.5 min-w-0">
                <span className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500 truncate">
                  PYQ VAULT
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30 font-mono font-bold shrink-0">
                  locked
                </span>
              </div>
            </div>

            <div className="flex items-center shrink-0">
              <span className="px-2.5 py-1 rounded-xl bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[10px] sm:text-[11px] font-mono font-bold flex items-center space-x-1">
                <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                <span className="hidden sm:inline">Under Process -</span>
                <span>Live Soon</span>
              </span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* ONLY CONTENT RENDERED: DEDICATED LOCKED STATUS SCREEN           */}
          {/* ============================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl glass-panel p-6 sm:p-10 md:p-12 border-2 border-amber-500/40 relative overflow-hidden bg-white/95 dark:bg-gradient-to-br dark:from-[#191105] dark:via-[#0e1428] dark:to-[#070914] shadow-2xl text-center space-y-6"
          >
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-1/4 w-80 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-40 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

            {/* Status pill */}
            <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-xs font-mono font-bold tracking-wider uppercase">Under Process · Live Soon</span>
            </div>

            {/* Primary Heading */}
            <div className="space-y-2 max-w-2xl mx-auto">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                {lang === 'en' ? (
                  <>
                    PYQ Vault is{' '}
                    <span className="text-amber-600 dark:text-amber-400">
                      Under Process - Live Soon
                    </span>
                  </>
                ) : (
                  <>
                    पीवाईक्यू वॉल्ट{' '}
                    <span className="text-amber-600 dark:text-amber-400">
                      प्रक्रियाधीन है • शीघ्र लाइव होगा
                    </span>
                  </>
                )}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {lang === 'en'
                  ? 'Access to the Sri Dev Suman Uttarakhand University Previous Year Examination Question Papers (2019–2025) and solved marking frameworks is temporarily locked. Our academic panel is actively indexing questions according to NEP-2020 unit weightage.'
                  : 'श्री देव सुमन उत्तराखंड विश्वविद्यालय के विगत वर्ष प्रश्नपत्रों (2019–2025) एवं मॉडल उत्तरों का एनईपी-2020 पाठ्यक्रम के अनुसार डिजिटलीकरण कार्य प्रगति पर है। यह वॉल्ट आधिकारिक प्रमाणीकरण के उपरांत शीघ्र ही लाइव होगा।'}
              </p>
            </div>

            {/* What's being prepared */}
            <div className="max-w-sm mx-auto text-left space-y-2 pt-2">
              <p className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                {lang === 'en' ? 'What we're preparing' : 'हम क्या तैयार कर रहे हैं'}
              </p>
              {[
                lang === 'en' ? '350+ questions indexed by NEP-2020 unit weightage' : 'एनईपी-2020 इकाई भार के अनुसार 350+ प्रश्न',
                lang === 'en' ? 'Marking rubrics & model answers for 75-mark papers' : '75-अंक प्रश्नपत्रों के लिए मॉडल उत्तर',
                lang === 'en' ? 'Year-wise archive from 2019 to 2025' : '2019–2025 के वार्षिक प्रश्नपत्र',
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-2.5 text-xs text-slate-600 dark:text-slate-300">
                  <span className="mt-1 w-4 h-4 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-[10px] font-black flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Quick Navigation to Other Active Hubs */}
            <div className="pt-4 border-t border-slate-200/80 dark:border-white/10 max-w-2xl mx-auto space-y-3">
              <span className="text-xs font-mono font-bold text-slate-500 block">
                {lang === 'en'
                  ? 'Explore our active study studios while PYQ Vault is being prepared:'
                  : 'पीवाईक्यू वॉल्ट तैयार होने तक हमारे सक्रिय अध्ययन स्टूडियो का उपयोग करें:'}
              </span>

              <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2">
                <Link
                  href="/notes"
                  className="px-3 sm:px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-600/25 flex items-center justify-center space-x-1.5 transition-all"
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'en' ? 'Notes Studio' : 'नोट्स स्टूडियो'}</span>
                </Link>

                <Link
                  href="/lectures"
                  className="px-3 sm:px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-md shadow-red-600/25 flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Tv className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'en' ? 'Lecture Studio' : 'लेक्चर स्टूडियो'}</span>
                </Link>

                <Link
                  href="/current-affairs"
                  className="px-3 sm:px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/25 flex items-center justify-center space-x-1.5 transition-all"
                >
                  <Newspaper className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'en' ? 'Current Affairs' : 'समसामयिकी'}</span>
                </Link>

                <Link
                  href="/dashboard"
                  className="px-3 sm:px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/15 text-slate-800 dark:text-white font-bold text-xs transition-all flex items-center justify-center space-x-1.5"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                  <span>{lang === 'en' ? 'Dashboard' : 'डैशबोर्ड'}</span>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
