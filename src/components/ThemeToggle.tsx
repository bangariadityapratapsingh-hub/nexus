'use client';

import React from 'react';
import { LanguageType } from '@/lib/types';

interface ThemeToggleProps {
  compact?: boolean;
  lang?: LanguageType;
  className?: string;
}

export default function ThemeToggle({
  compact = false,
  lang = 'en',
  className = '',
}: ThemeToggleProps) {
  // Theme is locked to Dark Mode by design. No toggle button rendered.
  return null;
}

