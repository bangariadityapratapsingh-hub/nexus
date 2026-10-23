'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Shield, Crown, Zap, Sparkles, BookOpen } from 'lucide-react';
import { LanguageType } from '@/lib/types';

interface SemesterRulesBentoProps {
  lang: LanguageType;
}

export default function SemesterRulesBento({ lang }: SemesterRulesBentoProps) {
  const cards = [
    {
      id: 'grind',
      badge: lang === 'en' ? 'THE 75 THEORY BLUEPRINT' : '75 अंकों की लिखित परीक्षा',
      emoji: '🔥',
      bigNumber: '75',
      subtitle: lang === 'en' ? 'marks external written paper' : 'विश्वविद्यालय मुख्य लिखित परीक्षा',
      title: lang === 'en' ? 'Theory Blueprint' : 'सिद्धांत परीक्षा ब्लूप्रिंट',
      desc:
        lang === 'en'
          ? '75 marks university written theory exam + 25 marks continuous internal assessment (100 total per course). Know where every mark comes from.'
          : '75 अंक विश्वविद्यालय मुख्य लिखित परीक्षा + 25 अंक आंतरिक सतत मूल्यांकन (कुल 100 अंक प्रति विषय)। हर अंक का सटीक हिसाब।',
      gradient: 'from-[#1476b8] to-[#0c4e7a]',
      shadowColor: 'rgba(20, 118, 184, 0.35)',
      watermark: '75',
    },
    {
      id: 'backlogs',
      badge: lang === 'en' ? 'NO BACKLOGS' : 'शून्य बैकलाग',
      emoji: '🛡️',
      bigNumber: '25 & 40',
      subtitle: lang === 'en' ? 'the pass code' : 'सुरक्षा का जादुई कोड',
      title: lang === 'en' ? 'The Pass Code' : 'उत्तीर्ण होने का फॉर्मूला',
      desc:
        lang === 'en'
          ? 'Score minimum 25/75 in the university written paper and 40/100 overall total. Lock this in and your semester is 100% safe.'
          : 'विश्वविद्यालय मुख्य लिखित परीक्षा में न्यूनतम 25/75 और कुल मिलाकर 40/100 प्राप्त करें। इसे लॉक करें और बैकलाग से 100% सुरक्षित रहें।',
      gradient: 'from-[#23773a] to-[#154d24]',
      shadowColor: 'rgba(35, 119, 58, 0.35)',
      watermark: '40',
    },
    {
      id: 'cgpa',
      badge: lang === 'en' ? 'CGPA FLEX' : 'सीजीपीए शिखर',
      emoji: '👑',
      bigNumber: 'O → P',
      subtitle: lang === 'en' ? '10-point NEP ladder' : '10-बिंदु एनईपी ग्रेडिंग',
      title: lang === 'en' ? 'Grade Ladder' : 'ग्रेड सोपान',
      desc:
        lang === 'en'
          ? "8 grade tiers from Outstanding 'O' (90%+) down to 'P'. We track your path to the top university tier."
          : "उत्कृष्ट 'O' (90%+) से लेकर 'P' तक के 8 ग्रेड स्तर। विश्वविद्यालय के शीर्ष स्थान तक आपकी प्रगति का ट्रैकिंग।",
      gradient: 'from-[#7a3fd6] to-[#511bb5]',
      shadowColor: 'rgba(122, 63, 214, 0.35)',
      watermark: '10',
    },
    {
      id: 'pyq',
      badge: lang === 'en' ? 'SDSUV ARCHIVE' : 'वास्तविक प्रश्नपत्र',
      emoji: '⚡',
      bigNumber: 'PYQs',
      subtitle: lang === 'en' ? 'zero fake questions' : 'प्रामाणिक विश्वविद्यालय अभिलेखागार',
      title: lang === 'en' ? 'Official Archive' : 'आधिकारिक प्रश्न बैंक',
      desc:
        lang === 'en'
          ? 'Direct integration with genuine SDSUV university question papers and unit-wise model test sets.'
          : 'श्री देव सुमन विश्वविद्यालय के वास्तविक पिछले वर्षों के प्रश्नपत्रों और इकाई-वार मॉडल टेस्ट का सीधा संग्रह।',
      gradient: 'from-[#d97706] to-[#92400e]',
      shadowColor: 'rgba(217, 119, 6, 0.35)',
      watermark: 'SDSUV',
    },
  ];

  return (
    <section className="my-10" aria-labelledby="semester-rules-heading">
      {/* Header section with lockinprep style typography */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === 'en' ? 'NEP-2020 Examination Blueprint' : 'एनईपी-2020 परीक्षा ब्लूप्रिंट'}</span>
          </div>
          <h2
            id="semester-rules-heading"
            className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            {lang === 'en' ? (
              <>
                Semester rules, <span className="text-emerald-500 dark:text-emerald-400">no cap</span> 🧠
              </>
            ) : (
              <>
                सेमेस्टर परीक्षा नियम, <span className="text-emerald-500 dark:text-emerald-400">सटीक गणित</span> 🧠
              </>
            )}
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            {lang === 'en'
              ? 'We decoded the exact SDSUV marking math so you conquer your semester without backlogs.'
              : 'एसडीएसयूवी परीक्षा मूल्यांकन के गणित को हमने सरल बनाया है ताकि आप बिना किसी बैकलाग के अव्वल आएं।'}
          </p>
        </div>

        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:block">
          Official SDSUV NEP-2020 Norms
        </span>
      </div>

      {/* 4 Bento Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, idx) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`group relative overflow-hidden rounded-3xl bg-gradient-to-br ${card.gradient} p-5 sm:p-6 text-white shadow-xl cursor-pointer transition-all border border-white/20`}
            style={{
              boxShadow: `0 14px 34px -8px ${card.shadowColor}`,
            }}
          >
            {/* Giant translucent background watermark */}
            <span className="pointer-events-none absolute -bottom-4 -right-2 text-7xl font-black text-white/10 select-none group-hover:scale-110 transition-transform duration-500 font-mono">
              {card.watermark}
            </span>

            {/* Top row badge & emoji */}
            <div className="flex items-center justify-between relative z-10">
              <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white backdrop-blur-md border border-white/20">
                {card.badge}
              </span>
              <span className="text-2xl drop-shadow">{card.emoji}</span>
            </div>

            {/* Big Stat */}
            <div className="mt-5 flex flex-col relative z-10">
              <span className="text-3xl sm:text-4xl font-black tracking-tight text-white drop-shadow-md font-mono">
                {card.bigNumber}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-white/80 mt-0.5">
                {card.subtitle}
              </span>
            </div>

            {/* Bottom details */}
            <div className="mt-4 pt-3 border-t border-white/15 relative z-10">
              <h4 className="text-sm font-black text-white">{card.title}</h4>
              <p className="mt-1 text-xs font-medium leading-relaxed text-white/90">
                {card.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-3 text-[11px] text-slate-500 dark:text-slate-400 font-mono text-center sm:text-left">
        {lang === 'en'
          ? '✓ SDSUV NEP-2020 marking criteria verified. Always verify official university notification dates with your campus administration.'
          : '✓ एसडीएसयूवी एनईपी-2020 अंकन मानदंड सत्यापित। आधिकारिक परीक्षा तिथियों हेतु अपने कॉलेज प्रशासन से संपर्क में रहें।'}
      </p>
    </section>
  );
}
