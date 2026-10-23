'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  BookOpen,
  Archive,
  Compass,
  GraduationCap,
  ArrowRight,
  Sparkles,
  Command,
  Lock,
  Bookmark,
  Newspaper,
} from 'lucide-react';
import { ActiveTab, LanguageType, StreamType } from '@/lib/types';
import { SUBJECTS_GALAXY, HIGH_YIELD_FLASHCARDS, CAREER_EXAMS } from '@/data/portalData';
import { getStudentProfile, filterToSelectedSubjects } from '@/lib/studentProfile';

interface CommandPaletteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateTab: (tab: ActiveTab) => void;
  lang: LanguageType;
  stream: StreamType;
}

export default function CommandPaletteModal({
  isOpen,
  onClose,
  onNavigateTab,
  lang,
  stream,
}: CommandPaletteModalProps) {
  const [query, setQuery] = useState('');
  const profile = typeof window !== 'undefined' ? getStudentProfile() : null;

  // Keyboard shortcut listener for Ctrl+K / Cmd+K and Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Search logic
  const searchLower = query.toLowerCase().trim();

  const allowedSubjects = filterToSelectedSubjects(
    SUBJECTS_GALAXY.filter((s) => s.stream === stream),
    (s) => s.code || s.id,
    profile?.selectedSubjects
  );

  const matchedSubjects = allowedSubjects.filter(
    (s) =>
      s.nameEn.toLowerCase().includes(searchLower) ||
      s.nameHi.toLowerCase().includes(searchLower) ||
      s.code.toLowerCase().includes(searchLower)
  );

  const pyqList = HIGH_YIELD_FLASHCARDS[stream] || [];
  const matchedPYQs = pyqList.filter(
    (p) =>
      p.questionEn.toLowerCase().includes(searchLower) ||
      p.questionHi.toLowerCase().includes(searchLower)
  );

  const matchedCareers = CAREER_EXAMS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchLower) ||
      c.category.toLowerCase().includes(searchLower) ||
      c.badge.toLowerCase().includes(searchLower)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-xl rounded-3xl bg-[#0d1226] border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 overflow-hidden"
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-white/10 flex items-center space-x-3 bg-white/[0.02]">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              lang === 'en'
                ? 'Type to search SDSUV subjects, PYQs, exams (e.g. Quantum, CDS, Gauss)...'
                : 'विषय, प्रश्न या परीक्षा खोजें (उदा. क्वांटम, सीडीएस, गॉस)...'
            }
            className="w-full bg-transparent border-none text-white text-sm placeholder-slate-500 focus:outline-none"
          />
          <button
            onClick={onClose}
            className="px-2 py-0.5 rounded-md bg-white/10 text-slate-400 hover:text-white text-xs font-mono"
          >
            ESC
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-3 text-xs">
          {/* Quick Tab Jump Shortcuts */}
          {searchLower === '' && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-500 px-3 block">
                {lang === 'en' ? 'Quick Jump Navigation' : 'त्वरित नेविगेशन'}
              </span>
              {[
                { tab: 'command-center', label: 'Command Center (Home)', icon: Sparkles, href: '/' },
                { tab: 'current-affairs', label: 'Current Affairs Hub (/current-affairs) [LIVE]', icon: Newspaper, href: '/current-affairs' },
                { tab: 'learn', label: 'Cinema-Mode Studio (/learn)', icon: BookOpen, href: '/learn' },
                { tab: 'pyq-vault', label: 'SDSUV PYQ Vault (🔒 Under Process - Live Soon)', icon: Lock, href: '/pyqs' },
                { tab: 'saved-vault', label: "'Exam Night' Saved Vault & Revision Sheets (/saved)", icon: Bookmark, href: '/saved' },
                { tab: 'simulator', label: 'Exam Simulator 3-Hour Paper (/simulator)', icon: GraduationCap, href: '/simulator' },
                { tab: 'career-compass', label: 'Career Compass (🔒 Under Process - Live Soon)', icon: Lock, href: '/careers' },
                { tab: 'admin', label: 'Creator Studio [Admin] (/admin)', icon: Lock, href: '/admin' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => {
                      if (item.href === '/') {
                        onNavigateTab(item.tab as ActiveTab);
                      }
                      onClose();
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] flex items-center justify-between transition-colors block"
                  >
                    <div className="flex items-center space-x-2">
                      <Icon className="w-4 h-4 text-cyan-400" />
                      <span>{item.label}</span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                  </Link>
                );
              })}
            </div>
          )}

          {/* Subjects results */}
          {matchedSubjects.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-cyan-400 px-3 block">
                {lang === 'en' ? 'Subjects' : 'विषय'}
              </span>
              {matchedSubjects.map((sub) => (
                <div
                  key={sub.id}
                  onClick={() => {
                    onNavigateTab('syllabus');
                    onClose();
                  }}
                  className="px-3 py-2 rounded-xl hover:bg-white/[0.05] cursor-pointer flex items-center justify-between text-slate-200"
                >
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="font-semibold text-white">{lang === 'en' ? sub.nameEn : sub.nameHi}</span>
                      <span className="text-[10px] text-slate-400 ml-2 font-mono">({sub.code})</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-cyan-400 font-mono">Syllabus</span>
                </div>
              ))}
            </div>
          )}

          {/* PYQ Results */}
          {matchedPYQs.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-amber-400 px-3 block">
                {lang === 'en' ? 'Previous Year Questions' : 'विगत वर्ष प्रश्न'}
              </span>
              {matchedPYQs.map((q) => (
                <div
                  key={q.id}
                  onClick={() => {
                    onNavigateTab('pyq-vault');
                    onClose();
                  }}
                  className="px-3 py-2 rounded-xl hover:bg-white/[0.05] cursor-pointer flex items-center justify-between text-slate-200"
                >
                  <div className="flex items-center space-x-2 truncate pr-2">
                    <Archive className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="truncate">{lang === 'en' ? q.questionEn : q.questionHi}</span>
                  </div>
                  <span className="text-[10px] text-amber-400 font-mono shrink-0">
                    {q.marks}M ({q.year})
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Career Results */}
          {matchedCareers.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-violet-400 px-3 block">
                {lang === 'en' ? 'Government & Defence Pathways' : 'प्रतियोगी परीक्षाएं'}
              </span>
              {matchedCareers.map((c) => (
                <Link
                  key={c.id}
                  href="/careers"
                  onClick={onClose}
                  className="px-3 py-2 rounded-xl hover:bg-white/[0.05] cursor-pointer flex items-center justify-between text-slate-200 block"
                >
                  <div className="flex items-center space-x-2">
                    <Compass className="w-4 h-4 text-violet-400" />
                    <div>
                      <span className="font-semibold text-white">{c.name}</span>
                      <span className="text-[10px] text-slate-400 ml-2 font-mono">({c.category})</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">
                    {c.syllabusOverlapPct}% Overlap
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-black/50 border-t border-white/5 text-[10px] text-slate-400 flex items-center justify-between px-4 font-mono">
          <span>Sri Dev Suman Uttarakhand Vishwavidyalaya</span>
          <span>Press ESC to close</span>
        </div>
      </motion.div>
    </div>
  );
}
