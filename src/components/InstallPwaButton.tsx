'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Download, Share, PlusSquare, Check, X, Sparkles } from 'lucide-react';

export default function InstallPwaButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isStandalone, setIsStandalone] = useState<boolean>(false);
  const [isIos, setIsIos] = useState<boolean>(false);
  const [showIosModal, setShowIosModal] = useState<boolean>(false);
  const [installedSuccess, setInstalledSuccess] = useState<boolean>(false);

  useEffect(() => {
    // Check if already running as installed standalone PWA
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsStandalone(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIos(isIosDevice);

    // Capture Chrome/Android PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setDeferredPrompt(null);
      setIsStandalone(true);
      setInstalledSuccess(true);
      setTimeout(() => setInstalledSuccess(false), 4000);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (isIos) {
      setShowIosModal(true);
      return;
    }

    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setInstalledSuccess(true);
        setTimeout(() => setInstalledSuccess(false), 4000);
      }
      setDeferredPrompt(null);
    } else {
      // Fallback instruction for desktop/other browsers
      setShowIosModal(true);
    }
  };

  if (isStandalone) {
    return null; // Don't show install button if student is already inside the installed app!
  }

  return (
    <>
      <button
        onClick={handleInstallClick}
        className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 via-sky-500/20 to-blue-600/20 hover:from-cyan-500/30 hover:to-blue-600/30 text-cyan-300 hover:text-white border border-cyan-400/40 shadow-sm shadow-cyan-500/10 transition-all flex items-center space-x-1.5 text-xs font-bold group"
        title="Install SDSUV App on Android or iPhone Home Screen"
      >
        <Smartphone className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline">📲 Install SDSUV App</span>
        <span className="sm:hidden">Install</span>
      </button>

      {/* iOS & Desktop Manual Installation Modal */}
      <AnimatePresence>
        {showIosModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0b1028] border border-cyan-500/40 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl relative text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Smartphone className="w-4 h-4" />
                  <h3 className="text-sm font-bold text-white">Install on Your Phone</h3>
                </div>
                <button
                  onClick={() => setShowIosModal(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-3 text-slate-300">
                <p className="leading-relaxed">
                  Install <strong>APSB Nexus</strong> as a standalone native app on your phone with zero app-store download:
                </p>

                <div className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2.5">
                  <div className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      1
                    </span>
                    <div>
                      <span className="font-semibold text-white">Tap the Share Icon</span>
                      <p className="text-[11px] text-slate-400">At the bottom of Safari on iPhone (or top right menu on Android)</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/40 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      2
                    </span>
                    <div>
                      <span className="font-semibold text-white">Tap &ldquo;Add to Home Screen&rdquo; (➕)</span>
                      <p className="text-[11px] text-slate-400">Look for the square plus icon in the options</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div>
                      <span className="font-semibold text-emerald-300">Full-Screen Standalone App</span>
                      <p className="text-[11px] text-slate-400">Opens without browser URL bars, works offline</p>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowIosModal(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-black text-xs shadow-md"
              >
                Got It, Thanks!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Notification */}
      <AnimatePresence>
        {installedSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-2xl bg-emerald-500 text-slate-950 font-extrabold text-xs shadow-2xl flex items-center space-x-2"
          >
            <Check className="w-4 h-4 stroke-[3]" />
            <span>🎉 APSB Nexus successfully installed to home screen!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
