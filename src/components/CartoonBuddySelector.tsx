'use client';

import React from 'react';
import { CartoonCharacterId, getCartoonBuddy } from '@/lib/cartoonBuddies';
import { LanguageType } from '@/lib/types';
import CartoonCharacterAvatar from './CartoonCharacterAvatar';

interface CartoonBuddySelectorProps {
  selectedBuddyId?: CartoonCharacterId;
  onSelectBuddy?: (id: CartoonCharacterId) => void;
  lang?: LanguageType;
  studentName?: string;
  className?: string;
}

/**
 * @deprecated Multi-character buddy selection has been removed.
 * Doraemon is permanently locked as the APSB Nexus mascot.
 */
export default function CartoonBuddySelector({
  lang = 'en',
  className = '',
}: CartoonBuddySelectorProps) {
  const buddy = getCartoonBuddy('doraemon');

  return (
    <div className={`p-4 rounded-2xl bg-white/[0.04] border border-cyan-500/30 flex items-center space-x-3 ${className}`}>
      <CartoonCharacterAvatar id="doraemon" size={48} isFloating withAura />
      <div>
        <div className="text-xs font-bold text-white flex items-center space-x-1.5">
          <span>{buddy.emoji}</span>
          <span>{lang === 'en' ? buddy.nameEn : buddy.nameHi}</span>
          <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono">
            Official Mascot
          </span>
        </div>
        <p className="text-[11px] text-slate-400">
          {lang === 'en' ? buddy.taglineEn : buddy.taglineHi}
        </p>
      </div>
    </div>
  );
}
