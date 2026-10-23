'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Sparkles, RefreshCw } from 'lucide-react';
import { CartoonCharacterId, getCartoonBuddy } from '@/lib/cartoonBuddies';
import { LanguageType } from '@/lib/types';
import CartoonCharacterAvatar from './CartoonCharacterAvatar';

interface DashboardBuddyGreetingProps {
  studentName: string;
  buddyId?: CartoonCharacterId;
  lang?: LanguageType;
  className?: string;
}

const VOICE_MUTED_KEY = 'apsb_buddy_voice_muted';

export default function DashboardBuddyGreeting({
  studentName,
  buddyId = 'doraemon',
  lang = 'en',
  className = '',
}: DashboardBuddyGreetingProps) {
  const buddy = getCartoonBuddy(buddyId);
  const displayName = studentName?.trim() || (lang === 'en' ? 'Scholar' : 'विद्यार्थी');

  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Personalized greeting text based on student's medium
  const greetingText =
    lang === 'hi'
      ? `नमस्ते ${displayName}! चलो आज की पढ़ाई शुरू करें!`
      : `Hello ${displayName}! Ready to unlock a new gadget of knowledge today?`;

  // Play voice greeting
  const playVoiceGreeting = useCallback(
    (force = false) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

      try {
        const storedMute = localStorage.getItem(VOICE_MUTED_KEY);
        if (storedMute === 'true' && !force) return;

        window.speechSynthesis.cancel(); // Stop any pending utterance

        const utterance = new SpeechSynthesisUtterance(greetingText);

        utterance.rate = 1.0;
        utterance.pitch = 1.25; // Doraemon's cheerful friendly robot pitch

        // Try picking an expressive voice
        const voices = window.speechSynthesis.getVoices();
        if (lang === 'hi') {
          const hindiVoice = voices.find((v) => v.lang.startsWith('hi'));
          if (hindiVoice) utterance.voice = hindiVoice;
        } else {
          const preferredVoice = voices.find(
            (v) =>
              v.lang.startsWith('en-IN') ||
              v.lang.startsWith('en-GB') ||
              v.lang.startsWith('en-US') ||
              v.name.includes('Natural')
          );
          if (preferredVoice) utterance.voice = preferredVoice;
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis playback prevented:', err);
        setIsSpeaking(false);
      }
    },
    [greetingText, lang]
  );

  useEffect(() => {
    setMounted(true);
    const storedMute = localStorage.getItem(VOICE_MUTED_KEY) === 'true';
    setIsMuted(storedMute);

    // Initial greeting on mount (delayed slightly so dashboard animations render first)
    const timer = setTimeout(() => {
      if (!storedMute) {
        playVoiceGreeting();
      }
    }, 900);

    return () => {
      clearTimeout(timer);
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, [playVoiceGreeting]);

  const toggleMute = () => {
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    try {
      localStorage.setItem(VOICE_MUTED_KEY, String(nextMute));
      if (nextMute && typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else if (!nextMute) {
        playVoiceGreeting(true);
      }
    } catch (e) {
      console.error('Failed to toggle voice mute', e);
    }
  };

  return (
    <div className={`relative flex flex-col sm:flex-row items-center sm:items-end gap-3 ${className}`}>
      {/* Speech Bubble Above / Beside Character */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative max-w-xs sm:max-w-sm rounded-2xl p-3 bg-white/95 dark:bg-black/70 border border-teal-500/40 dark:border-cyan-500/40 shadow-xl backdrop-blur-xl"
      >
        {/* Tail pointing down to the character */}
        <div className="hidden sm:block absolute -bottom-2 right-8 w-4 h-4 bg-white/95 dark:bg-black/70 border-b border-r border-teal-500/40 dark:border-cyan-500/40 transform rotate-45" />

        {/* Top Header inside Speech Bubble */}
        <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center space-x-1.5">
            <span className="text-xs">{buddy.emoji}</span>
            <span className="text-[11px] font-black text-slate-800 dark:text-white">
              {lang === 'en' ? buddy.nameEn : buddy.nameHi}
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 font-mono font-bold">
              {lang === 'en' ? 'Study Companion' : 'अध्ययन साथी'}
            </span>
          </div>

          {/* Voice Controls: Replay & Mute */}
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={() => playVoiceGreeting(true)}
              className="p-1 rounded-lg bg-slate-200 dark:bg-white/10 hover:bg-cyan-500/20 text-slate-700 dark:text-slate-200 transition-colors flex items-center space-x-1"
              title="🔊 Replay Voice Greeting"
              aria-label="Replay Voice Greeting"
            >
              <RefreshCw className={`w-3 h-3 ${isSpeaking ? 'animate-spin text-cyan-400' : ''}`} />
              <span className="text-[9px] font-mono">🔊</span>
            </button>

            <button
              type="button"
              onClick={toggleMute}
              className={`p-1 rounded-lg border transition-all ${
                isMuted
                  ? 'bg-rose-500/20 border-rose-500/40 text-rose-600 dark:text-rose-400'
                  : 'bg-emerald-500/20 border-emerald-500/40 text-emerald-600 dark:text-emerald-400'
              }`}
              title={isMuted ? 'Unmute Voice' : 'Mute Voice'}
              aria-label="Toggle Voice Mute"
            >
              {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            </button>
          </div>
        </div>

        {/* Personalized Speech Bubble Catchphrase */}
        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug">
          &ldquo;{greetingText}&rdquo;
        </p>

        {/* Bottom micro-tag: clean & uncluttered (No Change Buddy button) */}
        <div className="flex items-center justify-between pt-1.5 mt-1 border-t border-slate-200 dark:border-white/5 text-[10px]">
          <span className="text-slate-500 dark:text-slate-400 font-mono text-[9px]">
            {isSpeaking ? '🔊 Speaking...' : (lang === 'en' ? '22nd Century Companion' : '२२वीं सदी का साथी')}
          </span>
          <span className="text-teal-700 dark:text-cyan-400 font-bold text-[9px]">
            {lang === 'en' ? 'APSB Nexus Mascot' : 'आधिकारिक मैस्कॉट'}
          </span>
        </div>
      </motion.div>

      {/* 3D Floating & Waving Doraemon Avatar */}
      <motion.div
        initial={{ scale: 0, rotate: -15, y: 20 }}
        animate={{ scale: 1, rotate: 0, y: 0 }}
        transition={{
          type: 'spring',
          damping: 12,
          stiffness: 180,
          delay: 0.2,
        }}
        whileHover={{ scale: 1.08, rotate: 5 }}
        className="relative group cursor-pointer"
        onClick={() => playVoiceGreeting(true)}
        title={`${buddy.nameEn} • Click to say hello!`}
      >
        <CartoonCharacterAvatar
          id="doraemon"
          size={76}
          isFloating={true}
          isWaving={true}
          withAura={true}
          className="transition-transform"
        />

        {/* Sparkle badge on hover */}
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-lg opacity-90 group-hover:scale-125 transition-transform">
          <Sparkles className="w-3 h-3" />
        </div>
      </motion.div>
    </div>
  );
}
