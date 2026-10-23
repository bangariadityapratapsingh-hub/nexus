'use client';

import React, { useState } from 'react';
import { CartoonCharacterId, getCartoonBuddy } from '@/lib/cartoonBuddies';

interface CartoonCharacterAvatarProps {
  id?: CartoonCharacterId | string;
  size?: number;
  isFloating?: boolean;
  isWaving?: boolean;
  withAura?: boolean;
  className?: string;
}

export default function CartoonCharacterAvatar({
  id = 'doraemon',
  size = 96,
  isFloating = false,
  isWaving = false,
  withAura = true,
  className = '',
}: CartoonCharacterAvatarProps) {
  const [hasCustomImage, setHasCustomImage] = useState(false);
  const [imageError, setImageError] = useState(false);
  const buddy = getCartoonBuddy(id);

  // 3D vector illustration rendering for Doraemon
  const render3dVectorIllustration = () => {
    return (
      <svg viewBox="0 0 100 100" fill="none" className="w-full h-full select-none drop-shadow-md">
        <defs>
          <radialGradient id="doraemonBody" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="60%" stopColor="#0284c7" />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>
          <radialGradient id="doraemonFace" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="85%" stopColor="#f1f5f9" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </radialGradient>
          <radialGradient id="doraemonNose" cx="35%" cy="30%" r="60%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="70%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>
          <radialGradient id="bellGold" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="60%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </radialGradient>
        </defs>

        {/* Bamboo Copter (Take-copter) */}
        <g className={isFloating ? 'animate-spin origin-[50px_10px]' : ''}>
          <rect x="48" y="10" width="4" height="8" fill="#ca8a04" rx="2" />
          <ellipse cx="50" cy="10" rx="18" ry="2.5" fill="#facc15" stroke="#ca8a04" strokeWidth="0.8" />
          <circle cx="50" cy="10" r="2.5" fill="#a16207" />
        </g>

        {/* Blue Round Head */}
        <circle cx="50" cy="50" r="38" fill="url(#doraemonBody)" stroke="#0369a1" strokeWidth="1.5" />

        {/* White Face Mask */}
        <ellipse cx="50" cy="55" rx="31" ry="26" fill="url(#doraemonFace)" stroke="#94a3b8" strokeWidth="0.8" />

        {/* Big Friendly Eyes */}
        <ellipse cx="43" cy="38" rx="6.5" ry="9" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
        <ellipse cx="57" cy="38" rx="6.5" ry="9" fill="#ffffff" stroke="#0f172a" strokeWidth="1.2" />
        <ellipse cx="45" cy="38" rx="2.5" ry="3.5" fill="#0f172a" />
        <ellipse cx="55" cy="38" rx="2.5" ry="3.5" fill="#0f172a" />
        <circle cx="44.2" cy="36.5" r="1" fill="#ffffff" />
        <circle cx="54.2" cy="36.5" r="1" fill="#ffffff" />

        {/* Red Shiny Nose */}
        <circle cx="50" cy="46" r="4.8" fill="url(#doraemonNose)" stroke="#b91c1c" strokeWidth="0.8" />
        <circle cx="48.5" cy="44.5" r="1.5" fill="#ffffff" />

        {/* Nose Line & Mouth */}
        <line x1="50" y1="51" x2="50" y2="65" stroke="#0f172a" strokeWidth="1.2" />
        <path d="M 32 64 Q 50 80 68 64" stroke="#0f172a" strokeWidth="1.6" fill="#dc2626" strokeLinecap="round" />
        <path d="M 42 70 Q 50 76 58 70" fill="#f87171" />

        {/* 6 Whiskers */}
        <line x1="22" y1="48" x2="36" y2="50" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="20" y1="55" x2="35" y2="55" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="22" y1="62" x2="36" y2="60" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="64" y1="50" x2="78" y2="48" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="65" y1="55" x2="80" y2="55" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="64" y1="60" x2="78" y2="62" stroke="#0f172a" strokeWidth="1.2" strokeLinecap="round" />

        {/* Red Collar & Golden Bell */}
        <rect x="26" y="80" width="48" height="6.5" rx="3" fill="#dc2626" stroke="#991b1b" strokeWidth="0.8" />
        <circle cx="50" cy="86" r="6" fill="url(#bellGold)" stroke="#854d0e" strokeWidth="0.8" />
        <line x1="45" y1="84.5" x2="55" y2="84.5" stroke="#713f12" strokeWidth="0.8" />
        <circle cx="50" cy="87.5" r="1.2" fill="#713f12" />
      </svg>
    );
  };

  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center flex-shrink-0 select-none ${
        isFloating ? 'animate-float' : ''
      } ${className}`}
    >
      {/* 3D Dynamic Color Aura Halo (Signature cyan/blue glow) */}
      {withAura && (
        <div
          style={{
            background: `radial-gradient(circle, rgba(${buddy.auraRgb}, 0.4) 0%, rgba(${buddy.auraRgb}, 0.12) 55%, transparent 75%)`,
          }}
          className="absolute inset-[-18%] rounded-full blur-md pointer-events-none transition-all duration-300"
        />
      )}

      {/* Check for custom 3D file in /public/characters/ (with graceful SVG fallback) */}
      {!imageError && hasCustomImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/characters/${id}.png`}
          alt={buddy.nameEn}
          className="w-full h-full object-contain drop-shadow-xl"
          onError={() => setImageError(true)}
          onLoad={() => setHasCustomImage(true)}
        />
      ) : (
        <div className="w-full h-full relative z-10 flex items-center justify-center">
          {render3dVectorIllustration()}
        </div>
      )}
    </div>
  );
}
