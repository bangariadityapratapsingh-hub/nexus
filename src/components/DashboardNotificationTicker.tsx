'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  ChevronRight,
  ChevronLeft,
  Calendar,
  ExternalLink,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { UniversityNotification } from '@/types/notification';
import { FALLBACK_NOTIFICATIONS } from '@/data/fallbackNotifications';
import NotificationModal from '@/components/NotificationModal';
import { LanguageType } from '@/lib/types';

interface DashboardNotificationTickerProps {
  lang?: LanguageType;
}

export default function DashboardNotificationTicker({
  lang = 'en',
}: DashboardNotificationTickerProps) {
  const [notifications, setNotifications] = useState<UniversityNotification[]>(
    FALLBACK_NOTIFICATIONS.slice(0, 3)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedNotice, setSelectedNotice] =
    useState<UniversityNotification | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch latest notifications from API
  useEffect(() => {
    let isMounted = true;
    async function loadNotices() {
      try {
        const res = await fetch('/api/notifications');
        if (res.ok) {
          const json = await res.json();
          if (
            isMounted &&
            Array.isArray(json?.notifications) &&
            json.notifications.length > 0
          ) {
            setNotifications(json.notifications.slice(0, 5));
          }
        }
      } catch {
        // Fallback already pre-set
      }
    }
    loadNotices();
    return () => {
      isMounted = false;
    };
  }, []);

  // Auto-cycle notices every 5 seconds unless hovered
  useEffect(() => {
    if (isPaused || notifications.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, notifications.length]);

  const activeNotice = notifications[currentIndex] || notifications[0];

  const handleOpenNotice = (notice: UniversityNotification) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="rounded-2xl glass-panel p-3.5 sm:p-4 border border-cyan-500/30 bg-gradient-to-r from-[#0a0f2b]/95 via-[#0c1334]/90 to-[#121942]/95 shadow-xl relative overflow-hidden group select-none transition-all duration-300 hover:border-cyan-400/50"
      >
        {/* Subtle Glow Ambient */}
        <div className="absolute top-0 right-1/4 w-72 h-16 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 relative z-10">
          {/* Left: Blinking LIVE Badge & Header */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {/* Blinking Live Badge */}
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-black tracking-wider uppercase bg-rose-950/90 text-rose-300 border border-rose-500/40 shadow-sm shadow-rose-950">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
              </span>
              <span>LIVE</span>
            </span>

            {/* Title / Bell */}
            <div className="flex items-center space-x-1.5">
              <Bell className="w-4 h-4 text-cyan-400 animate-bounce" />
              <span className="text-xs font-black text-white tracking-wide uppercase font-mono">
                {lang === 'en'
                  ? 'University Updates'
                  : 'विश्वविद्यालय सूचनाएं'}
              </span>
            </div>

            <div className="hidden sm:block h-3.5 w-[1px] bg-white/10" />
          </div>

          {/* Center: Animated Sliding Notice Headline */}
          <div className="flex-1 min-w-0 flex items-center justify-between">
            <AnimatePresence mode="wait">
              {activeNotice && (
                <motion.div
                  key={activeNotice.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => handleOpenNotice(activeNotice)}
                  className="flex items-center space-x-2.5 cursor-pointer min-w-0 pr-2 group/item"
                  title="Click to view full notice & download circular"
                >
                  <span className="text-xs px-2 py-0.5 rounded-md bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold shrink-0 text-[10px]">
                    {activeNotice.categoryIcon}{' '}
                    {lang === 'en'
                      ? activeNotice.categoryLabelEn
                      : activeNotice.categoryLabelHi}
                  </span>

                  <p className="text-xs sm:text-[13px] text-slate-200 group-hover/item:text-cyan-300 transition-colors font-medium truncate">
                    {activeNotice.title}
                  </p>

                  <span className="hidden lg:inline-flex text-[10px] text-slate-400 font-mono shrink-0">
                    ({activeNotice.date})
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Cycle Controls */}
            {notifications.length > 1 && (
              <div className="flex items-center space-x-1 shrink-0 ml-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex(
                      (prev) =>
                        (prev - 1 + notifications.length) % notifications.length
                    )
                  }
                  className="p-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                  title="Previous Update"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <span className="text-[10px] font-mono text-slate-400 px-1">
                  {currentIndex + 1}/{notifications.length}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentIndex((prev) => (prev + 1) % notifications.length)
                  }
                  className="p-1 rounded-lg bg-white/[0.04] hover:bg-white/[0.1] text-slate-400 hover:text-white transition-colors"
                  title="Next Update"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>

          {/* Right: Link to Full Panel (/notifications) */}
          <Link
            href="/notifications"
            className="shrink-0 px-3 py-1.5 rounded-xl bg-cyan-950/80 hover:bg-cyan-900/90 border border-cyan-500/40 text-cyan-300 hover:text-white text-xs font-bold transition-all flex items-center space-x-1.5 shadow-sm group/btn self-start md:self-auto"
          >
            <span>
              {lang === 'en' ? 'View All Updates' : 'सभी सूचनाएं देखें'}
            </span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Interactive Notice Modal Viewer */}
      <NotificationModal
        notice={selectedNotice}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        lang={lang}
      />
    </>
  );
}
