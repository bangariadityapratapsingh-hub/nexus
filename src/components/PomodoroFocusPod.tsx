'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Timer,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  CloudRain,
  Wind,
  Maximize2,
  Minimize2,
  Sparkles,
  Flame,
  Coffee,
  CheckCircle2,
  X,
  Plus,
} from 'lucide-react';

type TimerMode = 'study' | 'shortBreak' | 'longBreak';
type AmbientSound = 'none' | 'rain' | 'breeze';

const TIMER_DURATIONS: Record<TimerMode, number> = {
  study: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

import { LanguageType } from '@/lib/types';

interface PomodoroFocusPodProps {
  lang?: LanguageType;
}

export default function PomodoroFocusPod({ lang = 'en' }: PomodoroFocusPodProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<TimerMode>('study');
  const [timeLeft, setTimeLeft] = useState<number>(TIMER_DURATIONS.study);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [ambientSound, setAmbientSound] = useState<AmbientSound>('none');
  const [volume, setVolume] = useState<number>(0.35);
  const [completedSprints, setCompletedSprints] = useState<number>(0);

  // Audio Context References for synthetic sound generation
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Load completed sprints from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sdsuv_pomodoro_sprints');
      if (saved) setCompletedSprints(Number(saved) || 0);
    } catch {}
  }, []);

  // Timer Countdown Effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playChime();
      if (mode === 'study') {
        const nextCount = completedSprints + 1;
        setCompletedSprints(nextCount);
        try {
          localStorage.setItem('sdsuv_pomodoro_sprints', String(nextCount));
        } catch {}
        setMode('shortBreak');
        setTimeLeft(TIMER_DURATIONS.shortBreak);
      } else {
        setMode('study');
        setTimeLeft(TIMER_DURATIONS.study);
      }
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft, mode, completedSprints]);

  // Ambient Web Audio Synthesizer (Zero external dependencies)
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        audioCtxRef.current = new AudioContextClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const stopAmbient = () => {
    if (noiseNodeRef.current) {
      try {
        (noiseNodeRef.current as any).stop?.();
        noiseNodeRef.current.disconnect();
      } catch {}
      noiseNodeRef.current = null;
    }
  };

  const playAmbientSound = (type: AmbientSound) => {
    initAudio();
    stopAmbient();

    if (!audioCtxRef.current || type === 'none') {
      return;
    }

    const ctx = audioCtxRef.current;
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Generate Pink/Brown Noise
    if (type === 'rain') {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
        b6 = white * 0.115926;
      }
    } else if (type === 'breeze') {
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filter to simulate soft raindrops or mountain air
    const filter = ctx.createBiquadFilter();
    filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
    filter.frequency.value = type === 'rain' ? 800 : 350;

    const gain = ctx.createGain();
    gain.gain.value = volume;
    gainNodeRef.current = gain;

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start(0);
    noiseNodeRef.current = whiteNoise;
  };

  const handleSoundToggle = (type: AmbientSound) => {
    if (ambientSound === type) {
      setAmbientSound('none');
      stopAmbient();
    } else {
      setAmbientSound(type);
      playAmbientSound(type);
    }
  };

  const handleVolumeChange = (newVol: number) => {
    setVolume(newVol);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(newVol, audioCtxRef.current.currentTime);
    }
  };

  // Crystal singing bowl chime when sprint finishes
  const playChime = () => {
    initAudio();
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, ctx.currentTime); // 528 Hz Solfeggio frequency
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 1.2);

    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 2.5);
  };

  const switchMode = (newMode: TimerMode) => {
    setMode(newMode);
    setTimeLeft(TIMER_DURATIONS[newMode]);
    setIsRunning(false);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Progress for circle
  const total = TIMER_DURATIONS[mode];
  const progressPct = ((total - timeLeft) / total) * 100;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progressPct / 100) * circumference;

  return (
    <>
      {/* ================================================================== */}
      {/* MINIMIZED FLOATING PILL (Docked in bottom-right corner)            */}
      {/* ================================================================== */}
      {!isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="fixed bottom-20 md:bottom-6 right-4 z-40"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2.5 px-3.5 py-2 rounded-2xl glass-panel border border-cyan-500/40 bg-[#0a0f26]/90 shadow-2xl shadow-cyan-950/60 hover:scale-105 transition-all text-white group"
            title="Open Himalayan Pomodoro Focus Pod"
          >
            <div className="relative flex items-center justify-center">
              <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-cyan-400 animate-ping' : 'bg-slate-400'}`} />
              <span className={`absolute w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-cyan-400' : 'bg-slate-400'}`} />
            </div>

            <div className="flex items-center space-x-1.5 font-mono text-xs font-bold">
              <Timer className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-cyan-200">{formatTime(timeLeft)}</span>
            </div>

            <span className="text-slate-500 text-[10px] hidden sm:inline">•</span>

            <span className="text-[10px] font-bold text-slate-300 hidden sm:inline">
              {mode === 'study' ? '🎯 Sprint' : '☕ Break'}
            </span>

            {ambientSound !== 'none' && (
              <span className="text-[10px] text-amber-400 animate-pulse">
                {ambientSound === 'rain' ? '🌧️' : '💨'}
              </span>
            )}
          </button>
        </motion.div>
      )}

      {/* ================================================================== */}
      {/* EXPANDED POMODORO FOCUS POD                                       */}
      {/* ================================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-20 md:bottom-6 right-4 z-50 w-80 sm:w-88 rounded-3xl glass-panel border border-cyan-500/40 bg-[#080d22]/95 backdrop-blur-2xl shadow-2xl shadow-black p-5 space-y-4"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                  <Timer className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white flex items-center space-x-1.5">
                    <span>Himalayan Focus Pod</span>
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                  </h4>
                  <p className="text-[10px] font-mono text-slate-400">25m Deep Work • 5m Chai Break</p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Minimize Pod"
              >
                <Minimize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Mode Segmented Controls */}
            <div className="grid grid-cols-3 gap-1 bg-black/50 p-1 rounded-2xl border border-white/10 text-[10px] font-bold">
              <button
                onClick={() => switchMode('study')}
                className={`py-1.5 rounded-xl transition-all ${
                  mode === 'study'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🎯 25m Focus
              </button>
              <button
                onClick={() => switchMode('shortBreak')}
                className={`py-1.5 rounded-xl transition-all ${
                  mode === 'shortBreak'
                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ☕ 5m Chai
              </button>
              <button
                onClick={() => switchMode('longBreak')}
                className={`py-1.5 rounded-xl transition-all ${
                  mode === 'longBreak'
                    ? 'bg-gradient-to-r from-violet-500 to-purple-600 text-white font-black shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                🧘 15m Rest
              </button>
            </div>

            {/* Circular Countdown Ring */}
            <div className="relative flex flex-col items-center justify-center py-2">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className="stroke-white/10"
                  strokeWidth="6"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r={radius}
                  className={`transition-all duration-500 ${
                    mode === 'study'
                      ? 'stroke-cyan-400'
                      : mode === 'shortBreak'
                      ? 'stroke-amber-400'
                      : 'stroke-violet-400'
                  }`}
                  strokeWidth="6"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <div className="text-2xl font-black font-mono tracking-tight text-white drop-shadow-md">
                  {formatTime(timeLeft)}
                </div>
                <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest mt-0.5">
                  {isRunning ? 'IN SESSION' : 'PAUSED'}
                </div>
              </div>
            </div>

            {/* Timer Action Buttons */}
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`px-6 py-2.5 rounded-2xl font-black text-xs transition-all shadow-lg flex items-center space-x-1.5 ${
                  isRunning
                    ? 'bg-amber-500 text-slate-950 shadow-amber-500/20 hover:bg-amber-400'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/30 hover:scale-105'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-3.5 h-3.5 fill-current" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Start Sprint</span>
                  </>
                )}
              </button>

              <button
                onClick={() => setTimeLeft((prev) => prev + 5 * 60)}
                className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 transition-colors text-xs font-mono font-bold"
                title="Add 5 Minutes"
              >
                +5m
              </button>

              <button
                onClick={() => {
                  setIsRunning(false);
                  setTimeLeft(TIMER_DURATIONS[mode]);
                }}
                className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white border border-white/10 transition-colors"
                title="Reset Timer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Ambient Sound Controller */}
            <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 space-y-2">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono font-bold flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Ambient Audio Atmosphere</span>
                </span>
                <span className="text-[10px] font-mono text-cyan-400">
                  {ambientSound === 'none' ? 'Muted' : ambientSound === 'rain' ? '🌧️ Rain' : '💨 Breeze'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSoundToggle('rain')}
                  className={`p-2 rounded-xl text-[11px] font-bold border flex items-center justify-center space-x-1.5 transition-all ${
                    ambientSound === 'rain'
                      ? 'bg-cyan-950/80 border-cyan-400 text-cyan-300 shadow-sm'
                      : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5" />
                  <span>Himalayan Rain</span>
                </button>

                <button
                  onClick={() => handleSoundToggle('breeze')}
                  className={`p-2 rounded-xl text-[11px] font-bold border flex items-center justify-center space-x-1.5 transition-all ${
                    ambientSound === 'breeze'
                      ? 'bg-amber-950/80 border-amber-400 text-amber-300 shadow-sm'
                      : 'bg-black/40 border-white/10 text-slate-400 hover:text-white'
                  }`}
                >
                  <Wind className="w-3.5 h-3.5" />
                  <span>Mountain Breeze</span>
                </button>
              </div>

              {ambientSound !== 'none' && (
                <div className="flex items-center space-x-2 pt-1">
                  <Volume2 className="w-3 h-3 text-slate-400" />
                  <input
                    type="range"
                    min="0.05"
                    max="0.8"
                    step="0.05"
                    value={volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 h-1 bg-white/20 rounded-lg cursor-pointer"
                  />
                </div>
              )}
            </div>

            {/* Sprints Tracker */}
            <div className="flex items-center justify-between text-[11px] px-1 text-slate-400">
              <span className="flex items-center space-x-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Today: <strong className="text-white">{completedSprints} Sprints</strong> ({completedSprints * 25}m)</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-400">🔥 On Streak</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
