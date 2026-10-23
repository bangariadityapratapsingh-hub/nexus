'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CloudFog,
  ShieldCheck,
  CheckCircle,
  Award,
  MapPin,
  Sparkles,
  GraduationCap,
  Percent,
} from 'lucide-react';
import { LanguageType } from '@/lib/types';
import { SDSUV_CAMPUS_INFO } from '@/data/portalData';

interface QuickMetricsBentoProps {
  lang: LanguageType;
}

export default function QuickMetricsBento({ lang }: QuickMetricsBentoProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Pod 1: Garhwal Alpine Campus Status */}
      <div className="rounded-3xl glass-panel p-5 border border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-[#090e1f] flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
              <CloudFog className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">
                {lang === 'en' ? 'Garhwal Hills Study Ambience' : 'गढ़वाल पर्वतीय अध्ययन वातावरण'}
              </h4>
              <p className="text-[10px] text-slate-400 font-mono">Himalayan Ridge • 2,100m Elev.</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-semibold">
            AQI 18 • Pristine
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center my-1">
          <div className="p-2 rounded-xl bg-black/30 border border-white/5">
            <span className="text-[10px] text-slate-400 block font-medium">Temp</span>
            <span className="font-mono text-base font-extrabold text-white">16°C</span>
          </div>
          <div className="p-2 rounded-xl bg-black/30 border border-white/5">
            <span className="text-[10px] text-slate-400 block font-medium">Humidity</span>
            <span className="font-mono text-base font-extrabold text-cyan-300">62%</span>
          </div>
          <div className="p-2 rounded-xl bg-black/30 border border-white/5">
            <span className="text-[10px] text-slate-400 block font-medium">Vibe</span>
            <span className="font-mono text-base font-extrabold text-amber-300">Alpine</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 mt-2 flex items-center justify-between border-t border-white/5 pt-2">
          <span>{lang === 'en' ? 'Library & Reading Hall:' : 'पुस्तकालय एवं वाचनालय:'}</span>
          <span className="text-emerald-400 font-semibold">{lang === 'en' ? 'Open (Quiet Hours)' : 'खुला है (अध्ययन काल)'}</span>
        </div>
      </div>

      {/* Pod 2: NEP 2020 Academic Bank of Credits & Attendance */}
      <div className="rounded-3xl glass-panel p-5 border border-white/10 relative overflow-hidden bg-gradient-to-br from-white/[0.03] to-[#0d0f26] flex flex-col justify-between">
        <div className="absolute top-0 right-0 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-xl bg-violet-950/60 border border-violet-500/30 text-violet-400">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <div>
              <h4 className="text-xs font-bold text-white">
                {lang === 'en' ? 'NEP 2020 ABC Vault' : 'एनईपी 2020 अकादमिक साख बैंक'}
              </h4>
              <p className="text-[10px] text-slate-400 font-mono">DigiLocker Verified ID: SDS-9842</p>
            </div>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-semibold">
            Sem IV Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center my-1">
          <div className="p-2 rounded-xl bg-black/30 border border-white/5">
            <span className="text-[10px] text-slate-400 block font-medium">Credits Earned</span>
            <span className="font-mono text-base font-extrabold text-cyan-300">20 / 22 CR</span>
          </div>
          <div className="p-2 rounded-xl bg-black/30 border border-white/5">
            <span className="text-[10px] text-slate-400 block font-medium">Attendance</span>
            <span className="font-mono text-base font-extrabold text-emerald-400">84.2% (Eligible)</span>
          </div>
        </div>

        <div className="text-[10px] text-slate-400 mt-2 flex items-center justify-between border-t border-white/5 pt-2">
          <span>{lang === 'en' ? 'Exam Hall Ticket Clearance:' : 'प्रवेश पत्र अनुमति:'}</span>
          <span className="text-emerald-400 font-bold flex items-center space-x-1">
            <CheckCircle className="w-3 h-3" />
            <span>{lang === 'en' ? 'Verified 100%' : 'अनुमोदित'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
