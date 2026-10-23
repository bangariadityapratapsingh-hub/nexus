'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Lock,
  ShieldCheck,
  ShieldAlert,
  ArrowLeft,
  Eye,
  EyeOff,
  User,
  KeyRound,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { AmbassadorCarLogo } from '@/components/AmbassadorCarLogo';

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/admin';

  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(null);
  const [lockoutSeconds, setLockoutSeconds] = useState<number | null>(null);

  // Check if already authenticated on initial mount
  useEffect(() => {
    fetch('/api/admin-auth')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          router.replace(redirectTarget);
        }
      })
      .catch(() => {});
  }, [redirectTarget, router]);

  // Countdown timer for lockout
  useEffect(() => {
    if (lockoutSeconds === null || lockoutSeconds <= 0) return;
    const interval = setInterval(() => {
      setLockoutSeconds((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          setErrorMessage('');
          return null;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage('Please enter the administrator password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Also update local storage admin state for client components that read it
        if (typeof window !== 'undefined') {
          localStorage.setItem('sdsuv_admin_auth', 'true');
          localStorage.setItem('sdsuv_admin_authenticated', 'true');
          localStorage.setItem('sdsuv_admin_username', username.trim());
        }
        router.push(redirectTarget);
      } else {
        setErrorMessage(data.message || data.error || 'Authentication failed');
        if (typeof data.attemptsLeft === 'number') {
          setAttemptsRemaining(data.attemptsLeft);
        }
        if (data.retryAfter) {
          setLockoutSeconds(data.retryAfter);
        }
      }
    } catch (err) {
      setErrorMessage('Network connection error. Please verify server connectivity.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl glass-panel border border-violet-500/40 shadow-2xl relative space-y-6 text-center bg-[#090d22]/95 backdrop-blur-2xl">
      {/* Decorative Aura */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-48 h-48 bg-violet-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Brand Header */}
      <div className="flex flex-col items-center space-y-2">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-600 p-[1px] shadow-lg shadow-violet-500/30">
          <div className="w-full h-full bg-[#0d122b] rounded-2xl flex items-center justify-center">
            <Lock className="w-7 h-7 text-cyan-400" />
          </div>
        </div>

        <div className="pt-2">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3 h-3 text-cyan-400" />
            <span>APSB Secure Nexus</span>
          </div>
          <h1 className="text-2xl font-black text-white mt-2">Creator Studio Login</h1>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">
            Restricted access. Server verification and brute-force protection active.
          </p>
        </div>
      </div>

      {/* Error / Lockout Alert */}
      {errorMessage && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-3.5 rounded-xl border text-xs text-left flex items-start space-x-2.5 ${
            lockoutSeconds !== null && lockoutSeconds > 0
              ? 'bg-rose-500/15 border-rose-500/40 text-rose-300'
              : 'bg-amber-500/15 border-amber-500/40 text-amber-300'
          }`}
        >
          {lockoutSeconds !== null && lockoutSeconds > 0 ? (
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <p className="font-medium leading-relaxed">{errorMessage}</p>
            {lockoutSeconds !== null && lockoutSeconds > 0 && (
              <p className="font-mono text-[11px] text-rose-400 mt-1 font-bold">
                🔒 Security Lockout Active: {Math.floor(lockoutSeconds / 60)}m {lockoutSeconds % 60}s remaining
              </p>
            )}
            {attemptsRemaining !== null && attemptsRemaining > 0 && lockoutSeconds === null && (
              <p className="font-mono text-[11px] text-amber-400 mt-1">
                ⚠️ {attemptsRemaining} attempt(s) remaining before a 15-minute IP lockout.
              </p>
            )}
          </div>
        </motion.div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        {/* Username */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-slate-300 uppercase font-bold flex items-center space-x-1.5">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Administrator Username</span>
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading || (lockoutSeconds !== null && lockoutSeconds > 0)}
            placeholder="admin"
            className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors disabled:opacity-50"
            required
          />
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-mono text-slate-300 uppercase font-bold flex items-center space-x-1.5">
            <KeyRound className="w-3.5 h-3.5 text-violet-400" />
            <span>Master Password</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading || (lockoutSeconds !== null && lockoutSeconds > 0)}
              placeholder="Enter master admin password"
              className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 pr-10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono transition-colors disabled:opacity-50"
              required
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-white transition-colors"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading || (lockoutSeconds !== null && lockoutSeconds > 0)}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider font-mono shadow-lg shadow-violet-500/25 transition-all flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Lock className="w-3.5 h-3.5" />
              <span>Verify & Unlock Studio</span>
            </>
          )}
        </button>
      </form>

      {/* Security Footer Note */}
      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400 font-mono">
        <Link
          href="/dashboard"
          className="inline-flex items-center space-x-1.5 text-slate-400 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>Student Portal</span>
        </Link>
        <span className="text-slate-500">HttpOnly • 256-Bit HMAC</span>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#070913] text-slate-100 flex items-center justify-center p-4 relative selection:bg-cyan-500 selection:text-black">
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none starlight-grid opacity-20 z-0" />
      <div className="fixed top-[-100px] left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-cyan-600/15 via-violet-600/15 to-transparent blur-[140px] pointer-events-none z-0" />

      <Suspense
        fallback={
          <div className="w-full max-w-md p-8 rounded-3xl glass-panel border border-violet-500/40 text-center text-slate-400 font-mono text-xs">
            Loading secure authentication...
          </div>
        }
      >
        <AdminLoginForm />
      </Suspense>
    </div>
  );
}
