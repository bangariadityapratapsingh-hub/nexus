'use client';

import { useState, useEffect, useCallback } from 'react';

export const SIDEBAR_STORAGE_KEY = 'sdsuv_primary_sidebar_collapsed_v2';
export const SIDEBAR_TOGGLE_EVENT = 'sdsuv_sidebar_toggle';

/**
 * Returns whether the sidebar should start collapsed or expanded.
 * Desktop (>=1024px) defaults to expanded unless the user explicitly collapsed it.
 * Tablet / Mobile (<1024px) defaults to collapsed.
 */
export function getInitialSidebarCollapsed(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    if (stored !== null) {
      return stored === 'true';
    }
    return window.innerWidth < 1024;
  } catch {
    return false;
  }
}

/**
 * Persists the sidebar collapsed state, updates data-sidebar on root HTML,
 * and broadcasts an event to all components.
 */
export function setSidebarCollapsedState(collapsed: boolean): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed));
    document.documentElement.setAttribute('data-sidebar', collapsed ? 'collapsed' : 'expanded');
    window.dispatchEvent(
      new CustomEvent(SIDEBAR_TOGGLE_EVENT, {
        detail: { isCollapsed: collapsed },
      })
    );
  } catch (e) {
    console.error('Failed to save sidebar state', e);
  }
}

/**
 * Hook to read and control the primary sidebar state in any component or page.
 */
export function useSidebarState() {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
    return getInitialSidebarCollapsed();
  });
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    const initial = getInitialSidebarCollapsed();
    setIsCollapsed(initial);
    document.documentElement.setAttribute('data-sidebar', initial ? 'collapsed' : 'expanded');
    setMounted(true);

    const handleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isCollapsed: boolean }>;
      if (customEvent.detail && typeof customEvent.detail.isCollapsed === 'boolean') {
        setIsCollapsed(customEvent.detail.isCollapsed);
        document.documentElement.setAttribute(
          'data-sidebar',
          customEvent.detail.isCollapsed ? 'collapsed' : 'expanded'
        );
      }
    };

    window.addEventListener(SIDEBAR_TOGGLE_EVENT, handleToggle);
    return () => window.removeEventListener(SIDEBAR_TOGGLE_EVENT, handleToggle);
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsCollapsed((prev) => {
      const next = !prev;
      setSidebarCollapsedState(next);
      return next;
    });
  }, []);

  const setCollapsed = useCallback((val: boolean) => {
    setIsCollapsed(val);
    setSidebarCollapsedState(val);
  }, []);

  return {
    isCollapsed,
    setIsCollapsed: setCollapsed,
    toggleSidebar,
    mounted,
  };
}
