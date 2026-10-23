'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  PenTool,
  Clock,
  FileText,
  Video,
  Bot,
  Flame,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { LanguageType } from '@/lib/types';

interface LockinFeatureGridProps {
  lang: LanguageType;
}

export default function LockinFeatureGrid({ lang }: LockinFeatureGridProps) {
  const features = [
    {
      id: 'notes',
      accentColor: '#ffc83d',
      icon: BookOpen,
      title: lang === 'en' ? 'UPSC & Topper Notes' : 'संकल्पना एवं टॉपर्स नोट्स',
      desc:
        lang === 'en'
          ? 'Comprehensive chapter-wise visual notes, scholar definitions, and guaranteed university exam answers.'
          : 'अध्याय-वार विस्तृत संकल्पनात्मक नोट्स, विद्वानों की परिभाषाएं एवं परीक्षा उपयोगी मॉडल उत्तर।',
      href: '/notes',
      tag: 'High Yield',
    },
    {
      id: 'practice',
      accentColor: '#2ba6f5',
      icon: PenTool,
      title: lang === 'en' ? 'Practice by Unit' : 'इकाई-वार अभ्यास',
      desc:
        lang === 'en'
          ? 'Endless fresh drill questions per unit across all your enrolled subjects with step-by-step model answers.'
          : 'आपके सभी नामांकित विषयों की प्रत्येक इकाई हेतु विस्तृत व्याख्या सहित निरंतर अभ्यास प्रश्न।',
      href: '/learn',
      tag: 'NEP 2020 Units',
    },
    {
      id: 'mocks',
      accentColor: '#ff9a1f',
      icon: Clock,
      title: lang === 'en' ? 'Timed Mock Tests' : 'समयबद्ध मॉक परीक्षाएं',
      desc:
        lang === 'en'
          ? 'Full question palette, real timer countdown, and instant rubric-based grading so the exam hall feels familiar.'
          : 'वास्तविक परीक्षा हॉल जैसा अनुभव, टाइमर काउंटडाउन एवं त्वरित मूल्यांकन रिपोर्ट।',
      href: '/simulator',
      tag: 'Exam Ready',
    },
    {
      id: 'pyqs',
      accentColor: '#f59e0b',
      icon: FileText,
      title: lang === 'en' ? 'Papers & Solved PYQs' : 'विश्वविद्यालय प्रश्नपत्र (PYQ)',
      desc:
        lang === 'en'
          ? 'Digitizing verified SDSUV past semester question papers (2019-2025) and model rubric answers. Launching soon.'
          : 'श्री देव सुमन विश्वविद्यालय के पूर्व वर्षों के हल प्रश्नपत्र और मॉडल उत्तरों का डिजिटलीकरण जारी। शीघ्र लाइव।',
      href: '/pyqs',
      tag: '🔒 Under Process - Live Soon',
    },
    {
      id: 'lectures',
      accentColor: '#06b6d4',
      icon: Video,
      title: lang === 'en' ? 'Lectures by Unit' : 'इकाई-वार वीडियो लेक्चर्स',
      desc:
        lang === 'en'
          ? 'One tap from any topic directly to top-rated university lectures mapped specifically to your syllabus.'
          : 'सीधे आपके पाठ्यक्रम के प्रत्येक विषय और इकाई से जुड़े सर्वश्रेष्ठ व्याख्यान वीडियो।',
      href: '/lectures',
      tag: 'YouTube Curated',
    },
    {
      id: 'ai-tutor',
      accentColor: '#a970ff',
      icon: Bot,
      title: lang === 'en' ? 'Ask Doraemon (AI Tutor)' : 'डोरेमोन एआई गुरु',
      desc:
        lang === 'en'
          ? 'Stuck late at night? Get instant conceptual breakdowns, memory mnemonics, and exam hacks 24/7.'
          : 'देर रात पढ़ाई में संदेह? किसी भी विषय का सरल भाषा में त्वरित समाधान और याद रखने की तकनीक।',
      href: '/learn',
      tag: '24/7 Mascot Tutor',
    },
    {
      id: 'streaks',
      accentColor: '#44c95a',
      icon: Flame,
      title: lang === 'en' ? 'Streaks & XP Milestones' : 'दैनिक स्ट्रीक एवं एक्सपी',
      desc:
        lang === 'en'
          ? 'Daily study targets, milestone badges, XP progress meters, and study streak protection to keep you consistent.'
          : 'दैनिक अध्ययन लक्ष्य, मेडल बैज और अध्ययन स्ट्रीक ट्रैकर जो आपकी निरंतरता बनाए रखता है।',
      href: '/dashboard',
      tag: 'Gamified Prep',
    },
  ];

  return (
    <section className="my-10" aria-labelledby="lockin-features-heading">
      <div className="mb-6">
        <h2
          id="lockin-features-heading"
          className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {lang === 'en' ? 'Everything for your semester, in one place' : 'आपके पूरे सेमेस्टर की तैयारी, एक ही स्थान पर'}
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
          {lang === 'en'
            ? 'Built specifically around SDSUV NEP-2020 curriculum: unit breakdowns, marking math, and verified study tools.'
            : 'एसडीएसयूवी एनईपी-2020 पाठ्यक्रम के अनुसार विशेष रूप से निर्मित: इकाई विभाजन, अंकन प्रणाली और सटीक अध्ययन उपकरण।'}
        </p>
      </div>

      <div className="grid gap-3.5 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              whileHover={{ y: -3, scale: 1.01 }}
              className="group relative flex flex-col justify-between rounded-3xl p-5 border-2 border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/70 hover:border-cyan-400/60 dark:hover:border-cyan-400/40 shadow-sm hover:shadow-xl transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shadow-md transition-transform group-hover:scale-110"
                    style={{
                      backgroundColor: `${item.accentColor}20`,
                      color: item.accentColor,
                      border: `1.5px solid ${item.accentColor}50`,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10">
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 transition-transform">
                <Link href={item.href} className="inline-flex items-center space-x-1.5 hover:underline">
                  <span>{lang === 'en' ? 'Launch' : 'खोलें'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
