'use client';

export type AppTheme = 'dark';

const THEME_STORAGE_KEY = 'apsb_theme';

/**
 * Returns the current theme from localStorage.
 * Permanently defaults to 'dark' per user requirement.
 */
export function getStoredTheme(): AppTheme {
  return 'dark';
}

/**
 * Applies the theme to document.documentElement and persists to localStorage.
 */
export function applyTheme(theme: string = 'dark'): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
  } catch (e) {
    console.error('Failed to save theme preference', e);
  }

  const root = document.documentElement;
  root.classList.add('dark');
  root.setAttribute('data-theme', 'dark');

  window.dispatchEvent(new CustomEvent('apsb_theme_changed', { detail: { theme: 'dark' } }));
}

/**
 * Keeps dark theme locked.
 */
export function toggleAppTheme(): AppTheme {
  applyTheme('dark');
  return 'dark';
}

