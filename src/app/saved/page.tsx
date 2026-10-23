'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bookmark,
  BookmarkCheck,
  Trash2,
  Printer,
  Sparkles,
  ArrowLeft,
  FileQuestion,
  Video,
  Compass,
  BookOpen,
  CheckCircle2,
  ExternalLink,
  Edit3,
  Search,
  RotateCcw,
  Plus,
  Flame,
  Award,
  Calendar,
  Mountain,
} from 'lucide-react';
import FloatingNav from '@/components/FloatingNav';
import Footer from '@/components/Footer';
import CommandPaletteModal from '@/components/CommandPaletteModal';
import PomodoroFocusPod from '@/components/PomodoroFocusPod';
import { StreamType, LanguageType, ActiveTab } from '@/lib/types';
import {
  getSavedItems,
  removeSavedItem,
  updateSavedItemNotes,
  toggleMasteredStatus,
  clearAllSavedItems,
  restoreStarterPack,
  SavedItem,
  SavedItemType,
} from '@/lib/savedVaultStorage';
import { getStudentProfile, StudentProfile } from '@/lib/studentProfile';
import { useSidebarState } from '@/lib/sidebarState';

export default function SavedVaultPage() {
  const { isCollapsed } = useSidebarState();
  const [activeTab, setActiveTab] = useState<ActiveTab>('saved-vault');
  const [currentStream, setCurrentStream] = useState<StreamType>('bsc-maths');
  const [lang, setLang] = useState<LanguageType>('en');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [items, setItems] = useState<SavedItem[]>([]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [tempNote, setTempNote] = useState<string>('');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [showPrintModal, setShowPrintModal] = useState<boolean>(false);

  // Load items and profile on mount
  useEffect(() => {
    setItems(getSavedItems());
    setStudentProfile(getStudentProfile());

    const handleVaultUpdate = () => {
      setItems(getSavedItems());
    };

    const handleProfileUpdate = () => {
      setStudentProfile(getStudentProfile());
    };

    window.addEventListener('sdsuv_saved_vault_updated', handleVaultUpdate);
    window.addEventListener('sdsuv_profile_updated', handleProfileUpdate);
    return () => {
      window.removeEventListener('sdsuv_saved_vault_updated', handleVaultUpdate);
      window.removeEventListener('sdsuv_profile_updated', handleProfileUpdate);
    };
  }, []);

  const handleStartEditNote = (item: SavedItem) => {
    setEditingNoteId(item.id);
    setTempNote(item.notes || '');
  };

  const handleSaveNote = (id: string) => {
    updateSavedItemNotes(id, tempNote);
    setEditingNoteId(null);
  };

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const typeMatch = filterType === 'all' || item.type === filterType;
      const query = searchQuery.toLowerCase();
      const searchMatch =
        !query ||
        item.titleEn.toLowerCase().includes(query) ||
        item.titleHi.toLowerCase().includes(query) ||
        (item.notes && item.notes.toLowerCase().includes(query)) ||
        (item.subjectCode && item.subjectCode.toLowerCase().includes(query));
      return typeMatch && searchMatch;
    });
  }, [items, filterType, searchQuery]);

  const counts = useMemo(() => {
    return {
      all: items.length,
      pyq: items.filter((x) => x.type === 'pyq').length,
      lecture: items.filter((x) => x.type === 'lecture').length,
      career: items.filter((x) => x.type === 'career').length,
      topic: items.filter((x) => x.type === 'topic').length,
    };
  }, [items]);

  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 himalayan-mesh-bg relative flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* Background Starry Mesh */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-80px] left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-amber-600/10 via-cyan-600/10 to-transparent blur-[120px] pointer-events-none z-0" />

      {/* Floating Navigation */}
      <FloatingNav
        lang={lang}
        setLang={setLang}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      {/* Main Container - dynamically offsets for sidebar and expands to full portion when closed */}
      <div className={`transition-all duration-300 ease-in-out pt-20 md:pt-8 pb-20 relative z-10 ${isCollapsed ? 'md:pl-[70px]' : 'md:pl-64'}`}>
        <main className={`transition-all duration-300 ease-in-out mx-auto px-4 sm:px-6 space-y-8 w-full ${isCollapsed ? 'max-w-[1720px] lg:px-8 xl:px-10' : 'max-w-7xl lg:px-8'}`}>
        {/* Breadcrumb & Student Profile Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Command Center</span>
          </Link>

          {studentProfile && (
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs">
              <Mountain className="w-3.5 h-3.5 text-cyan-400" />
              <span>{studentProfile.name} • {studentProfile.college ? studentProfile.college.split('(')[0] : 'Affiliated Campus'}</span>
            </div>
          )}
        </div>

        {/* Hero Header Banner */}
        <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/10 relative overflow-hidden bg-gradient-to-br from-[#0c1230] via-[#080d22] to-[#070913] shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-bold">
                  <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Exam Night Revision Vault</span>
                </span>
                <span className="text-xs font-mono text-slate-400">
                  {items.length} Bookmarks Stored
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                Your Curated SDSUV Exam Arsenal 🌙
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Review bookmarked 15-mark theorems, tough past questions, favorite video lectures, and target career roadmaps in one distraction-free dashboard before exam night.
              </p>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                onClick={() => setShowPrintModal(true)}
                className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 hover:scale-105 transition-all flex items-center space-x-2"
              >
                <Printer className="w-4 h-4" />
                <span>Print Exam Cheat Sheet</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm('Restore initial exam-night starter pack?')) {
                    restoreStarterPack();
                  }
                }}
                className="px-3.5 py-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all flex items-center space-x-1.5"
                title="Restore default bookmarks"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Sample Pack</span>
              </button>

              {items.length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to clear all bookmarks?')) {
                      clearAllSavedItems();
                    }
                  }}
                  className="px-3 py-2.5 rounded-2xl bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/20 text-xs transition-colors"
                  title="Clear all bookmarks"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Chips & Search Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl glass-panel border border-white/10 bg-[#0a0f26]">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { id: 'all', label: `🌟 All Saved (${counts.all})` },
              { id: 'pyq', label: `📝 Tough PYQs (${counts.pyq})` },
              { id: 'lecture', label: `🎥 Top Lectures (${counts.lecture})` },
              { id: 'career', label: `🎖️ Target Careers (${counts.career})` },
              { id: 'topic', label: `⚡ Formulas & Topics (${counts.topic})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all border ${
                  filterType === tab.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 font-black shadow-md'
                    : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved questions, notes..."
              className="w-full bg-black/60 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        {/* Saved Items List */}
        {filteredItems.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-panel border border-white/10 bg-[#0a0f24] space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
              <Bookmark className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold text-white">Your Saved Vault is Empty</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Bookmark tough 15-mark questions in the PYQ Vault, favorite YouTube lectures in the Cinema Studio, or target careers to build your exam-night revision hub.
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={restoreStarterPack}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs"
              >
                Load Exam Night Starter Pack
              </button>
              <Link
                href="/pyqs"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold"
              >
                Explore PYQ Vault
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="rounded-3xl glass-panel p-5 border border-white/10 bg-gradient-to-b from-[#0b1028] to-[#070913] space-y-4 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  {/* Top Badge Row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="p-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-500/30 text-xs">
                        {item.type === 'pyq' && <FileQuestion className="w-3.5 h-3.5" />}
                        {item.type === 'lecture' && <Video className="w-3.5 h-3.5" />}
                        {item.type === 'career' && <Compass className="w-3.5 h-3.5" />}
                        {item.type === 'topic' && <BookOpen className="w-3.5 h-3.5" />}
                      </span>
                      <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase">
                        {item.type.toUpperCase()}
                      </span>
                      {item.tag && (
                        <span className="text-[10px] font-bold text-amber-400">
                          • {item.tag}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center space-x-1">
                      <button
                        onClick={() => toggleMasteredStatus(item.id)}
                        className={`p-1.5 rounded-lg text-xs transition-colors ${
                          item.isMastered
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                            : 'bg-white/5 text-slate-400 hover:text-white'
                        }`}
                        title={item.isMastered ? 'Marked Mastered' : 'Mark as Mastered'}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => removeSavedItem(item.id)}
                        className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-red-400 transition-colors"
                        title="Remove from saved vault"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {lang === 'en' ? item.titleEn : item.titleHi}
                    </h3>
                    {item.subtitleEn && (
                      <p className="text-[11px] text-slate-400">
                        {lang === 'en' ? item.subtitleEn : item.subtitleHi}
                      </p>
                    )}
                  </div>

                  {/* Personal Student Exam Note */}
                  <div className="p-3 rounded-2xl bg-black/50 border border-amber-500/20 text-xs space-y-1.5">
                    <div className="flex items-center justify-between text-[10px] font-mono text-amber-400 font-bold">
                      <span className="flex items-center space-x-1">
                        <Edit3 className="w-3 h-3" />
                        <span>Exam Night Advice & Personal Note</span>
                      </span>
                      {editingNoteId !== item.id && (
                        <button
                          onClick={() => handleStartEditNote(item)}
                          className="hover:underline text-slate-400 hover:text-white"
                        >
                          Edit
                        </button>
                      )}
                    </div>

                    {editingNoteId === item.id ? (
                      <div className="space-y-2">
                        <textarea
                          rows={2}
                          value={tempNote}
                          onChange={(e) => setTempNote(e.target.value)}
                          placeholder="Add formula reminder or exam tip..."
                          className="w-full bg-black/80 border border-amber-500/40 rounded-xl p-2 text-xs text-white focus:outline-none"
                        />
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setEditingNoteId(null)}
                            className="px-2 py-1 rounded-lg text-[10px] bg-white/10 text-white"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleSaveNote(item.id)}
                            className="px-3 py-1 rounded-lg text-[10px] bg-amber-500 text-slate-950 font-bold"
                          >
                            Save Note
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-300 italic">
                        {item.notes || 'No personal note added yet. Click edit to add a memory hook or formula tip!'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer Action Link */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5 text-xs">
                  <span className="text-[10px] font-mono text-slate-500">
                    Saved: {new Date(item.savedAt).toLocaleDateString()}
                  </span>

                  <Link
                    href={item.linkUrl}
                    className="px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900 border border-cyan-500/30 text-cyan-300 text-xs font-semibold flex items-center space-x-1 transition-colors"
                  >
                    <span>Open in Studio</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      </div>

      {/* ==================================================================== */}
      {/* PRINTABLE CHEAT SHEET MODAL                                          */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {showPrintModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white text-slate-900 rounded-3xl max-w-3xl w-full p-8 space-y-6 shadow-2xl relative my-8"
            >
              <div className="flex items-center justify-between border-b pb-4 border-slate-200">
                <div>
                  <h2 className="text-xl font-black text-slate-900">
                    Sri Dev Suman Uttarakhand Vishwavidyalaya
                  </h2>
                  <p className="text-xs text-slate-600 font-mono">
                    Student Exam Night Quick Revision Sheet • NEP 2020 Framework
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center space-x-1.5"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print PDF</span>
                  </button>
                  <button
                    onClick={() => setShowPrintModal(false)}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Student Metadata Box */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Candidate Name</span>
                  <span className="font-bold text-slate-900">{studentProfile?.name || 'SDSUV Scholar'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">College</span>
                  <span className="font-bold text-slate-900 truncate block">{studentProfile?.college || 'Pt. LMS Rishikesh'}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Stream & Sem</span>
                  <span className="font-bold text-slate-900">BSc / BA • Semester {studentProfile?.semester || 4}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-500 block">Date</span>
                  <span className="font-bold text-slate-900">{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Printable Items */}
              <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 text-xs">
                {items.map((item, idx) => (
                  <div key={item.id} className="p-3.5 rounded-xl border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between font-mono text-[11px]">
                      <span className="font-bold text-blue-700">#{idx + 1} [{item.type.toUpperCase()}] {item.subjectCode}</span>
                      <span className="text-slate-500">{item.tag}</span>
                    </div>
                    <div className="font-bold text-slate-900 text-sm">{item.titleEn}</div>
                    <div className="text-slate-700">{item.titleHi}</div>
                    {item.notes && (
                      <div className="p-2 bg-amber-50 border border-amber-200 rounded-lg text-slate-800 font-mono text-[11px]">
                        <strong>Student Exam Tip:</strong> {item.notes}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="text-[11px] text-slate-500 text-center border-t pt-4">
                Generated from APSB Nexus — Unofficial Student Preparation & Learning Resource. Best wishes for your examinations!
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer lang={lang} />
      <CommandPaletteModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigateTab={(tab) => setActiveTab(tab)}
        lang={lang}
        stream={currentStream}
      />
      <PomodoroFocusPod />
    </div>
  );
}
