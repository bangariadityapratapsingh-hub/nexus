'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ExternalLink,
  Download,
  Calendar,
  FileText,
  Building2,
  CheckCircle2,
  Copy,
  Sparkles,
  Share2,
} from 'lucide-react';
import { UniversityNotification } from '@/types/notification';
import { LanguageType } from '@/lib/types';

interface NotificationModalProps {
  notice: UniversityNotification | null;
  isOpen: boolean;
  onClose: () => void;
  lang?: LanguageType;
}

export default function NotificationModal({
  notice,
  isOpen,
  onClose,
  lang = 'en',
}: NotificationModalProps) {
  const [copied, setCopied] = React.useState(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!notice) return null;

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(notice.pdfUrl || notice.link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isPdf = Boolean(
    notice.pdfUrl ||
      notice.link.toLowerCase().endsWith('.pdf') ||
      notice.link.includes('assets.sdsuv.ac.in')
  );

  const directPdfUrl = notice.pdfUrl || (isPdf ? notice.link : null);
  const portalUrl = notice.link.includes('assets.sdsuv.ac.in')
    ? 'https://www.sdsuv.ac.in/notices'
    : notice.link;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-2xl bg-[#090e23] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-cyan-950/50 z-10 overflow-hidden"
          >
            {/* Top Glowing Ambient Accents */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-cyan-500 via-sky-400 to-violet-500" />
            <div className="absolute -top-24 -right-24 w-60 h-60 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-violet-600/15 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Header */}
            <div className="relative z-10 flex items-start justify-between gap-4 mb-5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold font-mono bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 flex items-center space-x-1.5 shadow-sm">
                  <span>{notice.categoryIcon}</span>
                  <span>
                    {lang === 'en'
                      ? notice.categoryLabelEn
                      : notice.categoryLabelHi}
                  </span>
                </span>

                {notice.isNew && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-950 text-rose-300 border border-rose-500/50 flex items-center space-x-1 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>Live Notice</span>
                  </span>
                )}

                {notice.fileSize && (
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono text-slate-400 bg-white/5 border border-white/10">
                    PDF • {notice.fileSize}
                  </span>
                )}
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-slate-400 hover:text-white border border-white/10 transition-colors"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Full Notice Title */}
            <div className="relative z-10 space-y-3 mb-6">
              <h2 className="text-lg sm:text-xl font-black text-white leading-snug">
                {notice.title}
              </h2>

              {/* Date & University Authority Meta */}
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400">
                <div className="flex items-center space-x-1.5 text-cyan-300">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    {lang === 'en' ? 'Published:' : 'दिनांक:'} {notice.date}
                  </span>
                </div>

                <div className="flex items-center space-x-1.5 text-slate-400">
                  <Building2 className="w-3.5 h-3.5 text-violet-400" />
                  <span>SDSUV Central Controller of Exams</span>
                </div>

                {notice.officialRef && (
                  <div className="text-[10px] px-2 py-0.5 rounded bg-black/40 border border-white/5 text-slate-400 font-mono">
                    Ref: {notice.officialRef}
                  </div>
                )}
              </div>
            </div>

            {/* Summary Preview Card */}
            <div className="relative z-10 rounded-2xl bg-black/50 border border-white/10 p-5 mb-6 space-y-2.5">
              <div className="flex items-center space-x-2 text-xs font-extrabold uppercase tracking-wider text-cyan-400">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>
                  {lang === 'en'
                    ? 'Official Circular Summary'
                    : 'अधिसूचना सारांश'}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {lang === 'en' ? notice.summaryEn : notice.summaryHi}
              </p>
              <p className="text-[11px] text-slate-400 italic">
                {lang === 'en'
                  ? 'Note: All enrolled students are advised to download the official university circular PDF or check the Samarth portal for complete details.'
                  : 'नोट: सभी नामांकित छात्र पूर्ण विवरण एवं निर्देशों हेतु आधिकारिक परिपत्र पीडीएफ अवश्य देखें।'}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
              {/* Copy Link Button */}
              <button
                type="button"
                onClick={handleCopyLink}
                className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white border border-white/10 text-xs font-bold transition-all flex items-center justify-center space-x-2"
                title="Copy Notice Link"
              >
                {copied ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
                {/* 1. View Original Notice on SDSUV Portal */}
                <a
                  href={portalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/20 text-xs font-extrabold transition-all flex items-center justify-center space-x-2 shadow-sm"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                  <span>
                    {lang === 'en'
                      ? '🔗 View on SDSUV Portal'
                      : '🔗 आधिकारिक पोर्टल पर देखें'}
                  </span>
                </a>

                {/* 2. Download Circular PDF */}
                <a
                  href={directPdfUrl || notice.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  download={isPdf}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/25 hover:scale-105 active:scale-95"
                >
                  <Download className="w-4 h-4 fill-slate-950" />
                  <span>
                    {lang === 'en'
                      ? '📥 Download Circular PDF'
                      : '📥 परिपत्र पीडीएफ डाउनलोड करें'}
                  </span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
