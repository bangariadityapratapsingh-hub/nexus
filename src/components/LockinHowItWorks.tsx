'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LanguageType } from '@/lib/types';

interface LockinHowItWorksProps {
  lang: LanguageType;
}

export default function LockinHowItWorks({ lang }: LockinHowItWorksProps) {
  const steps = [
    {
      num: 1,
      title: lang === 'en' ? 'Select Semester & Medium' : 'सेमेस्टर व माध्यम चुनें',
      desc:
        lang === 'en'
          ? 'Registered under SDSUV B.A. Arts in under a minute with English or Hindi medium preference.'
          : 'मात्र एक मिनट में अपने सेमेस्टर और हिन्दी अथवा अंग्रेजी परीक्षा माध्यम का चयन करें।',
    },
    {
      num: 2,
      title: lang === 'en' ? 'Lock In on High-Yield Units' : 'मुख्य इकाइयों पर ध्यान केंद्रित करें',
      desc:
        lang === 'en'
          ? 'Target verified topic notes, scholar definitions, and guaranteed repeat university questions.'
          : 'विद्वानों की परिभाषाओं, मुख्य बिंदुओं और सबसे अधिक दोहराए जाने वाले प्रश्नों से पढ़ाई करें।',
    },
    {
      num: 3,
      title: lang === 'en' ? 'Drill, Simulate, Ace Exams' : 'अभ्यास, सिमुलेटर और सफलता',
      desc:
        lang === 'en'
          ? 'Fresh questions every round, timed model test papers, and live countdown to exam day.'
          : 'प्रत्येक राउंड में नए प्रश्न, समयबद्ध मॉडल प्रश्नपत्र एवं परीक्षा दिवस तक लाइव काउंटडाउन।',
    },
  ];

  return (
    <section className="my-10" aria-labelledby="how-it-works-heading">
      <div className="mb-6">
        <h2
          id="how-it-works-heading"
          className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight"
        >
          {lang === 'en' ? 'How it works' : 'यह कैसे कार्य करता है'}
        </h2>
      </div>

      <ol className="m-0 list-none grid gap-3.5 sm:gap-4 grid-cols-1 md:grid-cols-3 p-0">
        {steps.map((step, idx) => (
          <motion.li
            key={step.num}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="flex flex-col gap-2 rounded-3xl border-2 border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/70 p-5 sm:p-6 shadow-sm hover:border-emerald-400 transition-all"
          >
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#44c95a] text-slate-950 text-base font-black shadow-md">
              {step.num}
            </span>
            <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white mt-1">
              {step.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
              {step.desc}
            </p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
