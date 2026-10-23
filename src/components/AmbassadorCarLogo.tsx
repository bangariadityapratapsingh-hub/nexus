'use client';

import React from 'react';

interface AmbassadorCarLogoProps {
  size?: number;
  className?: string;
  withBadge?: boolean;
  animated?: boolean;
}

export function AmbassadorCarLogo({
  size = 36,
  className = '',
  withBadge = true,
  animated = true,
}: AmbassadorCarLogoProps) {
  const content = (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full select-none ambassador-car-svg"
    >
      <defs>
        {/* Gradients */}
        <linearGradient id="ambassadorBodyGrad" x1="4" y1="20" x2="60" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#818cf8" />
        </linearGradient>

        <linearGradient id="ambassadorGlassGrad" x1="20" y1="18" x2="48" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#cffafe" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#0891b2" stopOpacity="0.4" />
        </linearGradient>

        <linearGradient id="ambassadorGoldGrad" x1="24" y1="6" x2="42" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        <linearGradient id="ambassadorChromeGrad" x1="6" y1="34" x2="58" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.9" />
        </linearGradient>

        {/* Headlamp beam glow */}
        <radialGradient id="headlightGlow" cx="6" cy="34" r="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Headlight glow beam */}
      <ellipse cx="6" cy="35" rx="5" ry="4" fill="url(#headlightGlow)" className="ambassador-headlight-glow" />

      {/* ============================================================== */}
      {/* 1. HINDUSTAN AMBASSADOR CAR BODY SILHOUETTE                     */}
      {/* ============================================================== */}
      {/* Main Curved Body Shell */}
      <path
        d="M 5 37 
           C 4 34, 5 31, 8 29 
           C 11 27, 16 26.5, 20 26.5 
           L 24 19 
           C 25.5 16, 28 15, 33 15 
           L 42 15 
           C 46 15, 48.5 16.5, 50 19 
           L 54 26 
           C 57 27, 59.5 29.5, 60 33 
           C 60.5 36, 59 38, 56 39 
           L 52 39 
           C 51.5 35, 47.5 32, 43 32 
           C 38.5 32, 34.5 35, 34 39 
           L 25 39 
           C 24.5 35, 20.5 32, 16 32 
           C 11.5 32, 7.5 35, 7 39 
           L 5 39 
           Z"
        fill="url(#ambassadorBodyGrad)"
        stroke="#67e8f9"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      {/* Characteristic Ambassador Curved Rear Boot / Tail Contour */}
      <path
        d="M 50 26 C 54 27, 57 29, 58 33"
        stroke="#a5f3fc"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Iconic Ambassador Vintage Split Windows */}
      {/* Front Quarter Window */}
      <path
        d="M 25.5 20 L 32 20 L 32 26 L 22.5 26 Z"
        fill="url(#ambassadorGlassGrad)"
        stroke="#a5f3fc"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Rear Passenger Window */}
      <path
        d="M 33.5 20 L 41.5 20 C 44 20, 46 21, 47.5 23 L 49.5 26 L 33.5 26 Z"
        fill="url(#ambassadorGlassGrad)"
        stroke="#a5f3fc"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />

      {/* Ambassador Iconic Side Chrome Trim Stripe */}
      <path
        d="M 7 31 C 18 30.5, 38 30.5, 57 32"
        stroke="url(#ambassadorChromeGrad)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />

      {/* Door Seam Lines */}
      <line x1="32.5" y1="20" x2="32.5" y2="38" stroke="#164e63" strokeWidth="0.8" strokeOpacity="0.7" />
      <line x1="43" y1="26" x2="43" y2="38" stroke="#164e63" strokeWidth="0.8" strokeOpacity="0.7" />

      {/* Chrome Door Handles */}
      <rect x="29" y="32.2" width="2.5" height="1" rx="0.5" fill="#ffffff" />
      <rect x="40" y="32.5" width="2.5" height="1" rx="0.5" fill="#ffffff" />

      {/* Classic Round Front Headlamp with Chrome Rim */}
      <circle cx="6.5" cy="33.5" r="2.2" fill="#ffffff" stroke="#38bdf8" strokeWidth="0.8" />
      <circle cx="6.5" cy="33.5" r="1.1" fill="#38bdf8" />

      {/* Classic Rear Red Tail Light */}
      <rect x="58.5" y="32.5" width="1.5" height="3" rx="0.7" fill="#ef4444" stroke="#f87171" strokeWidth="0.5" />

      {/* Chrome Bumpers */}
      <path d="M 4 37 L 7 37" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      <path d="M 55 38 L 59 38" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

      {/* ============================================================== */}
      {/* 2. WHEELS WITH CHROME DISH HUBCAPS                             */}
      {/* ============================================================== */}
      {/* Front Wheel */}
      <circle cx="16" cy="39" r="5.5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <circle cx="16" cy="39" r="3.2" fill="url(#ambassadorBodyGrad)" stroke="#ffffff" strokeWidth="0.8" />
      <circle cx="16" cy="39" r="1.2" fill="#ffffff" />

      {/* Rear Wheel */}
      <circle cx="43" cy="39" r="5.5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
      <circle cx="43" cy="39" r="3.2" fill="url(#ambassadorBodyGrad)" stroke="#ffffff" strokeWidth="0.8" />
      <circle cx="43" cy="39" r="1.2" fill="#ffffff" />

      {/* Road / Speed Accent Line */}
      <path d="M 3 46 L 61 46" stroke="#0ea5e9" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="3 2" opacity="0.6" />

      {/* ============================================================== */}
      {/* 3. EDUCATION ACCENT: STYLIZED SCHOLAR MORTARBOARD OVER ROOF     */}
      {/* ============================================================== */}
      {/* Mortarboard Diamond Cap */}
      <path
        d="M 33 6 L 41 10 L 33 14 L 25 10 Z"
        fill="url(#ambassadorGoldGrad)"
        stroke="#fef08a"
        strokeWidth="1"
        strokeLinejoin="round"
      />
      {/* Cap Skull Base */}
      <path
        d="M 28 11.5 L 28 14 C 28 15.5, 38 15.5, 38 14 L 38 11.5"
        fill="url(#ambassadorGoldGrad)"
        stroke="#fef08a"
        strokeWidth="0.8"
      />
      {/* Tassel */}
      <path
        d="M 33 10 Q 39 10 40 13 L 40.5 15"
        stroke="#fef08a"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <circle cx="40.5" cy="15.5" r="0.8" fill="#fef08a" />

      {/* Small Academic Sparkle */}
      <path
        d="M 45 6.5 L 46 8 L 47.5 9 L 46 10 L 45 11.5 L 44 10 L 42.5 9 L 44 8 Z"
        fill="#38bdf8"
      />
    </svg>
  );

  if (!withBadge) {
    return (
      <div
        style={{ width: size, height: size }}
        className={`inline-flex items-center justify-center ambassador-logo-container ${animated ? 'ambassador-float-glow' : ''} ${className}`}
        title="APSB Nexus • Ambassador Edition"
      >
        {content}
      </div>
    );
  }

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative rounded-xl overflow-hidden border border-cyan-500/40 bg-gradient-to-br from-[#0c1435] via-[#090d24] to-[#12183c] p-1 flex items-center justify-center flex-shrink-0 ambassador-logo-container ${animated ? 'ambassador-float-glow' : ''} ${className}`}
      title="APSB Nexus • Ambassador Edition"
    >
      <div className="absolute inset-0 bg-radial from-cyan-500/20 via-transparent to-transparent opacity-60 pointer-events-none" />
      {content}
    </div>
  );
}

export default AmbassadorCarLogo;
