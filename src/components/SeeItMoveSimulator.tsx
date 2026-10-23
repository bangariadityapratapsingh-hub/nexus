'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sliders, Sparkles, ArrowRight, Play, RotateCw } from 'lucide-react';
import { LanguageType } from '@/lib/types';

interface SeeItMoveSimulatorProps {
  lang: LanguageType;
}

export default function SeeItMoveSimulator({ lang }: SeeItMoveSimulatorProps) {
  const [kFactor, setKFactor] = useState(3.5);
  const [speed, setSpeed] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number;
    let t = 0;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      t += 0.025 * speed;
      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      const step = 20;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Draw concentric ripple contours: z = sin(k*r - 2t) / (1 + 0.35r)
      const numRings = 9;
      for (let i = 1; i <= numRings; i++) {
        const baseRadius = (i * 14);
        const waveOffset = Math.sin((baseRadius * 0.08 * kFactor) - (t * 2)) * 6;
        const currentRadius = Math.max(4, baseRadius + waveOffset);

        ctx.beginPath();
        ctx.ellipse(centerX, centerY, currentRadius * 1.5, currentRadius * 0.75, 0, 0, Math.PI * 2);

        // Gradient color based on kFactor
        const alpha = Math.max(0.12, 1 - (i / (numRings + 1)));
        const hue = 180 + (i * 12); // Cyan to violet spectrum
        ctx.strokeStyle = `hsla(${hue}, 85%, 60%, ${alpha})`;
        ctx.lineWidth = 2.4;
        ctx.stroke();
      }

      // Center glowing point
      ctx.beginPath();
      ctx.arc(centerX, centerY, 6, 0, Math.PI * 2);
      ctx.fillStyle = '#ffc83d';
      ctx.shadowColor = '#ffc83d';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [kFactor, speed]);

  return (
    <section className="my-10" aria-labelledby="move-heading">
      <div className="rounded-3xl border-2 border-slate-200 dark:border-white/10 bg-white/95 dark:bg-[#070b19] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        {/* Background ambient lighting */}
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-violet-600/15 blur-3xl" />

        <div className="grid gap-8 md:grid-cols-12 md:items-center relative z-10">
          {/* Left Column: Description & Interactive Slider */}
          <div className="md:col-span-7 flex flex-col gap-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold w-fit">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>{lang === 'en' ? 'Interactive Contour Preview' : 'लाइव तरंग पूर्वावलोकन'}</span>
            </div>

            <h2 id="move-heading" className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {lang === 'en' ? (
                <>
                  Try it right here — <span className="text-cyan-500 dark:text-cyan-400">See it move</span> 🔬
                </>
              ) : (
                <>
                  यहीं आजमाएं — <span className="text-cyan-500 dark:text-cyan-400">सजीव गति देखें</span> 🔬
                </>
              )}
            </h2>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              {lang === 'en' ? (
                <>
                  Formulas and geographical concepts stop being intimidating when you can interact with them directly. This contour ripple is computed in real time from{' '}
                  <span className="font-mono text-[11px] font-bold bg-slate-100 dark:bg-white/[0.08] text-cyan-600 dark:text-cyan-300 px-2 py-0.5 rounded-lg border border-slate-300 dark:border-white/10">
                    z = sin(k·r − 2t) / (1 + 0.35·r)
                  </span>
                  . Adjust frequency <b className="text-slate-900 dark:text-white">k</b> and observe how the wave density tightens.
                </>
              ) : (
                <>
                  भूगोल और विज्ञान के कठिन सिद्धांत तब सरल हो जाते हैं जब आप उन्हें सीधे नियंत्रित करते हैं। नीचे दिए गए स्लाइडर से तरंग आवृत्ति (<b className="text-slate-900 dark:text-white">k</b>) बदलें और वास्तविक समय में सजीव बदलाव देखें।
                </>
              )}
            </p>

            {/* Slider Controls */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-black/40 border border-slate-200 dark:border-white/10 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300 flex items-center space-x-1.5">
                  <Sliders className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{lang === 'en' ? 'Contour Frequency (k-factor):' : 'तरंग घनत्व (k-फैक्टर):'}</span>
                </span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400 font-black">{kFactor.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.2"
                value={kFactor}
                onChange={(e) => setKFactor(parseFloat(e.target.value))}
                className="w-full accent-cyan-400 h-2 bg-slate-200 dark:bg-slate-800 rounded-lg cursor-pointer"
              />

              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 font-mono">
                <span>Gentle Wave (1.0)</span>
                <span>Tight Himalayan Contours (8.0)</span>
              </div>
            </div>

            {/* 3 Stats Chips */}
            <ul className="m-0 grid list-none grid-cols-3 gap-2 sm:gap-3 p-0 pt-1">
              <li className="rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-3 text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-black font-mono text-slate-900 dark:text-white">24</p>
                <p className="mt-0.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {lang === 'en' ? 'NEP-2020 Units' : 'एनईपी-2020 इकाइयाँ'}
                </p>
              </li>
              <li className="rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-3 text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-black font-mono text-cyan-600 dark:text-cyan-400">350+</p>
                <p className="mt-0.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {lang === 'en' ? 'Solved PYQs' : 'हल किए गए प्रश्न'}
                </p>
              </li>
              <li className="rounded-2xl border-2 border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/[0.03] p-3 text-center sm:text-left">
                <p className="text-2xl sm:text-3xl font-black font-mono text-violet-600 dark:text-violet-400">5</p>
                <p className="mt-0.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                  {lang === 'en' ? 'BA Disciplines' : 'प्रमुख विषय'}
                </p>
              </li>
            </ul>

            <div>
              <Link
                href="/simulator"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 text-slate-950 font-black text-xs shadow-lg shadow-cyan-500/25 hover:scale-[1.02] active:scale-95 transition-all"
              >
                <span>{lang === 'en' ? 'Open Exam Simulator' : 'परीक्षा सिमुलेटर खोलें'}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Live Animated Simulation Canvas */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[340px] rounded-3xl border-2 border-slate-200 dark:border-cyan-500/30 bg-slate-950 p-3 shadow-2xl flex items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                width={320}
                height={320}
                className="w-full h-full select-none"
              />

              {/* Overlay pill indicator */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 border border-white/15 text-[10px] font-mono font-bold text-cyan-300 backdrop-blur-md flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Live 60 FPS Render</span>
              </div>

              {/* Reset button */}
              <button
                type="button"
                onClick={() => {
                  setKFactor(3.5);
                  setSpeed(2);
                }}
                className="absolute bottom-3 right-3 p-2 rounded-xl bg-black/70 border border-white/15 text-slate-300 hover:text-white transition-colors"
                title="Reset simulation parameters"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
