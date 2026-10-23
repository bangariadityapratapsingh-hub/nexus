'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Play,
  ExternalLink,
  RefreshCw,
  AlertCircle,
  Tv,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Maximize2,
} from 'lucide-react';
import { LectureLanguage } from '@/data/learnData';

interface HybridVideoPlayerProps {
  videoId: string;
  title: string;
  channel: string;
  duration?: string;
  language?: LectureLanguage;
  isCinemaMode?: boolean;
  onToggleCinema?: () => void;
  lang?: 'en' | 'hi';
  searchFallback?: string;
}

// Mapping dictionary to sanitize and replace invalid/deprecated placeholder IDs with real, embed-enabled BA YouTube IDs
const VERIFIED_VIDEO_MAP: Record<string, string> = {
  'd9N6g3ebm9w': 'VlIyVKrNNBo', // PW OnlyIAS - Seismic Waves
  'VhLiwDYehCw': 'ERoE9xGSPbg', // TheGeoecologist - Plate Tectonics
  'FCgO_PLOlv0': '5UTmt-57BBk', // UPSC Wallah - Earth Dynamics
  'cHLN0Pqt_7U': 'm9w2ZOUF6So', // StudyIQ IAS - Sources of History
  'WTfd412422g': 'wyiTK4kAAOY', // Drishti IAS - Earth Interior
  'b7F1aK2z3xM': 'Esj-4hNWxLQ', // CEC UGC - Origin of State
  'pictures': 'm9w2ZOUF6So',
  'wO6x8k5GzS4': 'V0N_aoy-9w4', // PW OnlyIAS - Ancient History
  'eC1-B7jQ6bI': 'okG8IPVh8aI', // StudyIQ IAS - Article 14
};

export default function HybridVideoPlayer({
  videoId,
  title,
  channel,
  duration = '24:00',
  language = 'Hinglish',
  isCinemaMode = false,
  onToggleCinema,
  lang = 'en',
  searchFallback,
}: HybridVideoPlayerProps) {
  // Default to 'card' so no video ever auto-plays without explicit user interaction
  const [viewMode, setViewMode] = useState<'embed' | 'card'>('card');
  const [isIframeLoaded, setIsIframeLoaded] = useState(false);
  const [hasExplicitlyPlayed, setHasExplicitlyPlayed] = useState(false);

  const rawId = videoId && videoId.trim() !== '' ? videoId.trim() : 'ERoE9xGSPbg';
  const cleanVideoId = VERIFIED_VIDEO_MAP[rawId] || rawId;
  const youtubeWatchUrl = `https://www.youtube.com/watch?v=${cleanVideoId}`;
  const embedUrl = `https://www.youtube.com/embed/${cleanVideoId}?rel=0&playsinline=1&modestbranding=1&enablejsapi=1&autoplay=${hasExplicitlyPlayed ? 1 : 0}`;
  const thumbnailUrl = `https://img.youtube.com/vi/${cleanVideoId}/hqdefault.jpg`;

  const handleStartPlay = () => {
    setHasExplicitlyPlayed(true);
    setViewMode('embed');
  };

  const getLanguageColor = (l: LectureLanguage) => {
    switch (l) {
      case 'English':
        return 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40';
      case 'Hindi':
        return 'bg-amber-950/90 text-amber-300 border-amber-500/40';
      case 'Hinglish':
      default:
        return 'bg-violet-950/90 text-violet-300 border-violet-500/40';
    }
  };

  return (
    <div className="rounded-2xl sm:rounded-3xl glass-panel p-3 sm:p-4 border border-cyan-500/30 shadow-2xl relative overflow-hidden bg-[#070913]/95 backdrop-blur-xl space-y-3">
      {/* Top Meta & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-white/10">
        <div className="flex items-center space-x-2.5 min-w-0">
          <span className="p-1.5 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 flex-shrink-0">
            <Play className="w-3.5 h-3.5 fill-red-500" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center space-x-2">
              <span className="text-[11px] font-mono text-cyan-300 font-bold truncate">
                {channel}
              </span>
              <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded border ${getLanguageColor(language)}`}>
                {language === 'English' ? '🇬🇧 Pure English' : language === 'Hindi' ? '🇮🇳 Pure Hindi' : '🗣️ Hinglish'}
              </span>
            </div>
            <h3 className="text-xs sm:text-sm font-black text-white truncate max-w-[280px] sm:max-w-md lg:max-w-xl">
              {title}
            </h3>
          </div>
        </div>

        {/* Right Player Controls */}
        <div className="flex items-center space-x-2">
          {/* Direct YouTube Watch Button (Guaranteed Fallback) */}
          <a
            href={youtubeWatchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs flex items-center space-x-1.5 shadow-md shadow-red-600/20 transition-all hover:scale-105"
            title="Open lecture directly on YouTube"
          >
            <Play className="w-3 h-3 fill-white" />
            <span className="hidden sm:inline">Watch on YouTube</span>
            <ExternalLink className="w-3 h-3 ml-0.5 opacity-80" />
          </a>

          {searchFallback && (
            <a
              href={searchFallback}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-cyan-300 font-bold text-xs hidden md:flex items-center space-x-1 border border-cyan-500/20 transition-colors"
              title="Search curated lecture variants on YouTube"
            >
              <span>🔍 Fallback Search</span>
            </a>
          )}

          {/* Player Mode Switcher: Embedded vs Direct Card */}
          <button
            onClick={() => setViewMode(viewMode === 'embed' ? 'card' : 'embed')}
            className="px-2.5 py-1.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-slate-300 text-xs font-mono transition-colors"
            title={viewMode === 'embed' ? 'Switch to Lightweight Card' : 'Switch to Embedded Player'}
          >
            {viewMode === 'embed' ? '🖼️ Card View' : '🎬 Player View'}
          </button>

          {/* Cinema Mode Toggle */}
          {onToggleCinema && (
            <button
              onClick={onToggleCinema}
              className={`p-1.5 rounded-xl border text-xs font-bold transition-all ${
                isCinemaMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : 'bg-white/[0.05] text-slate-300 border-white/10 hover:text-white'
              }`}
              title={isCinemaMode ? 'Exit Cinema Mode' : 'Enter Cinema Mode'}
            >
              <Tv className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Main Video Screen Container (16:9 Aspect Ratio) */}
      <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-black border border-white/10 shadow-inner group">
        {viewMode === 'embed' ? (
          <>
            {/* YouTube IFrame Embed */}
            <iframe
              src={embedUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              onLoad={() => setIsIframeLoaded(true)}
              className="w-full h-full border-0 absolute inset-0 z-10"
            />

            {/* Quick Loading Indicator Behind IFrame */}
            {!isIframeLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950 text-slate-400 space-y-2 z-0">
                <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
                <span className="text-xs font-mono">Loading Verified Lecture Stream...</span>
              </div>
            )}
          </>
        ) : (
          /* Thumbnail Card with 1-Click Launch (Prevents any black screen) */
          <div
            onClick={handleStartPlay}
            className="relative w-full h-full flex flex-col justify-between p-3.5 sm:p-6 cursor-pointer select-none group"
            title="Tap to play video"
          >
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              unoptimized
              className="object-cover object-center brightness-75 group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/70 border border-white/20 text-cyan-300">
                HD 1080p • {duration}
              </span>
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-950/90 text-emerald-300 border border-emerald-500/30">
                Verified Educator
              </span>
            </div>

            <div className="relative z-10 text-center space-y-2 sm:space-y-3 max-w-lg mx-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartPlay();
                }}
                className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-600 hover:bg-red-500 text-white shadow-2xl shadow-red-600/50 hover:scale-110 active:scale-95 transition-all cursor-pointer group-hover:ring-4 group-hover:ring-red-500/30 animate-pulse"
                title="Tap to Play Video"
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 fill-white ml-1" />
              </button>
              <div>
                <h4 className="text-xs sm:text-base font-extrabold text-white leading-snug line-clamp-2">
                  {title}
                </h4>
                <p className="text-[11px] sm:text-xs text-slate-300 mt-0.5 sm:mt-1 truncate">
                  Lecture by <span className="text-cyan-300 font-bold">{channel}</span>
                </p>
              </div>

              <div className="hidden sm:flex items-center justify-center space-x-3 pt-1">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStartPlay();
                  }}
                  className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-red-600/30 transition-all hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5 fill-white" />
                  <span>▶ Play Lecture Video</span>
                </button>
                <a
                  href={youtubeWatchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/15 flex items-center space-x-1"
                >
                  <span>Watch on YouTube ↗</span>
                </a>
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400 font-mono">
              <span className="truncate max-w-[150px] sm:max-w-none">{channel}</span>
              <span>1-Click High-Speed Playback</span>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Dedicated Play Bar */}
      <div className="sm:hidden grid grid-cols-2 gap-2">
        {viewMode !== 'embed' ? (
          <button
            type="button"
            onClick={handleStartPlay}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white font-black text-xs flex items-center justify-center space-x-1.5 shadow-lg shadow-red-600/30 active:scale-95 transition-transform"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>▶ Play Video Here</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setViewMode('card')}
            className="w-full py-2.5 px-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs flex items-center justify-center space-x-1.5 border border-white/10"
          >
            <span>⏸ Stop Video</span>
          </button>
        )}

        <a
          href={youtubeWatchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs flex items-center justify-center space-x-1.5 border border-white/15"
        >
          <Play className="w-3.5 h-3.5 fill-red-500 text-red-500" />
          <span>Open in YouTube App</span>
        </a>
      </div>

      {/* Helpful Student Advisory Bar */}
      <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
        <div className="flex items-center space-x-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>
            {lang === 'en'
              ? 'Zero Blackout: If playback is ever blocked by network, click "Watch on YouTube".'
              : 'यदि नेटवर्क द्वारा वीडियो बाधित हो, तो सीधे "Watch on YouTube" पर क्लिक करें।'}
          </span>
        </div>

        <div className="flex items-center space-x-2 text-[10px] text-cyan-400">
          <Sparkles className="w-3 h-3" />
          <span>Verified Embed</span>
        </div>
      </div>
    </div>
  );
}
