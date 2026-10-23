'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  RotateCw,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Layers,
  Search,
  BookOpen,
  Award,
  Zap,
  Flame,
  Check,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { StreamType, LanguageType } from '@/lib/types';
import { toggleSaveItem, isItemSaved } from '@/lib/savedVaultStorage';

export interface FlashcardItem {
  id: string;
  stream: StreamType;
  category: 'formula' | 'date-article' | 'theorem' | 'definition';
  subjectCode: string;
  subjectNameEn: string;
  subjectNameHi: string;
  titleEn: string;
  titleHi: string;
  frontSnippetEn: string;
  frontSnippetHi: string;
  sdsuvExamTag: string;
  backContent: {
    primaryFormulaOrDate: string;
    explanationEn: string;
    explanationHi: string;
    keyPoints: string[];
    examMarkWeight: '2 Marks' | '5 Marks' | '10 Marks' | '15 Marks';
  };
}

export const REVISION_FLASHCARDS_DATA: FlashcardItem[] = [
  // =========================================================================
  // BSC FORMULAS & THEOREMS
  // =========================================================================
  {
    id: 'fc-optics-newton-rings',
    stream: 'bsc-maths',
    category: 'formula',
    subjectCode: 'SDSUV-PHY-201',
    subjectNameEn: 'Modern Optics & Quantum Mechanics',
    subjectNameHi: 'आधुनिक प्रकाशिकी एवं क्वांटम यांत्रिकी',
    titleEn: "Newton's Rings Diameter Equation",
    titleHi: 'न्यूटन वलय व्यास का व्युत्पत्ति सूत्र',
    frontSnippetEn: 'Condition for Dark vs Bright interference rings in reflected light and wavelength determination.',
    frontSnippetHi: 'परावर्तित प्रकाश में अदीप्त तथा दीप्त वलयों हेतु प्रतिबंध एवं तरंगदैर्घ्य मापन।',
    sdsuvExamTag: '🔥 15 Marks • Asked SDSUV 2024, 2022',
    backContent: {
      primaryFormulaOrDate: 'D_n^2 = 4n\\lambda R \\quad (\\text{Dark}) \\qquad D_n^2 = 2(2n-1)\\lambda R \\quad (\\text{Bright})',
      explanationEn: 'Wavelength formula: λ = (D²_{n+p} - D²_n) / (4pR). Center spot is dark due to Stokes phase reversal of π (path difference λ/2) at the denser glass reflection boundary.',
      explanationHi: 'तरंगदैर्घ्य मापन सूत्र: λ = (D²_{n+p} - D²_n) / (4pR)। केंद्र बिंदु सघन माध्यम से परावर्तन पर π के कलान्तर के कारण सदैव अदीप्त (Dark) होता है।',
      keyPoints: [
        'Dark ring diameter Dn ∝ √n (square root of natural numbers)',
        'Bright ring diameter Dn ∝ √(2n - 1) (square root of odd numbers)',
        'Air film thickness t = r² / (2R)',
      ],
      examMarkWeight: '15 Marks',
    },
  },
  {
    id: 'fc-math-stokes-theorem',
    stream: 'bsc-maths',
    category: 'theorem',
    subjectCode: 'SDSUV-MTH-201',
    subjectNameEn: 'Linear Algebra & Differential Equations',
    subjectNameHi: 'रैखिक बीजगणित एवं अवकल समीकरण',
    titleEn: "Stokes' Curl Theorem in Vector Calculus",
    titleHi: 'सदिश कलन में स्टोक्स प्रमेय',
    frontSnippetEn: 'Conversion of line integral over a closed loop C to surface integral of curl over open surface S.',
    frontSnippetHi: 'बंद वक्र C पर रेखीय समाकल का खुली सतह S पर कर्ल के पृष्ठीय समाकल में रूपांतरण।',
    sdsuvExamTag: '⚡ 10 Marks • Asked SDSUV 2023, 2021',
    backContent: {
      primaryFormulaOrDate: '\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n} \\, dS',
      explanationEn: 'Circulation of vector field F along closed curve C equals the flux of the curl of F through any orientable open surface S bounded by C.',
      explanationHi: 'किसी बंद परिसीमा C के अनुदिश सदिश F का परिसंचरण, C द्वारा परिबद्ध किसी भी पृष्ठ S पर F के कर्ल के फ्लक्स के बराबर होता है।',
      keyPoints: [
        'Boundary ∂S = C with right-hand orientation',
        'Directly used in verifying irrotational fields where ∇ × F = 0',
        'Connects 1D line integral with 2D surface integral',
      ],
      examMarkWeight: '10 Marks',
    },
  },
  {
    id: 'fc-physics-schrodinger',
    stream: 'bsc-maths',
    category: 'formula',
    subjectCode: 'SDSUV-PHY-201',
    subjectNameEn: 'Modern Optics & Quantum Mechanics',
    subjectNameHi: 'आधुनिक प्रकाशिकी एवं क्वांटम यांत्रिकी',
    titleEn: 'Time-Independent Schrödinger Equation',
    titleHi: 'समय-अनाश्रित श्रोडिंगर तरंग समीकरण',
    frontSnippetEn: 'Fundamental eigenvalue equation for non-relativistic quantum particle in 1D/3D potential.',
    frontSnippetHi: 'विभव कूप में गैर-आपेक्षिकीय क्वांटम कण हेतु मूल आइगेनमान समीकरण।',
    sdsuvExamTag: '💎 10 Marks • Core Quantum Foundation',
    backContent: {
      primaryFormulaOrDate: '-\\frac{\\hbar^2}{2m} \\nabla^2 \\psi + V(\\vec{r})\\psi = E\\psi \\iff \\hat{H}\\psi = E\\psi',
      explanationEn: 'Here H is the Hamiltonian operator: H = - (ħ²/2m)∇² + V. The square modulus |ψ(r)|² gives the Born probability density of finding the particle at r.',
      explanationHi: 'यहाँ H हैमिल्टोनियन संकारक है। |ψ(r)|² कण के पाए जाने की प्रायिकता घनत्व (Probability Density) को प्रदर्शित करता है।',
      keyPoints: [
        'Wavefunction ψ must be single-valued, continuous, and normalizable',
        'Energy eigenvalues E are quantized for bound states (e.g. particle in a box)',
        'For 1D infinite box: En = (n² π² ħ²) / (2m L²)',
      ],
      examMarkWeight: '10 Marks',
    },
  },
  {
    id: 'fc-math-cayley-hamilton',
    stream: 'bsc-maths',
    category: 'theorem',
    subjectCode: 'SDSUV-MTH-201',
    subjectNameEn: 'Linear Algebra & Differential Equations',
    subjectNameHi: 'रैखिक बीजगणित एवं अवकल समीकरण',
    titleEn: 'Cayley-Hamilton Matrix Theorem',
    titleHi: 'कैले-हैमिल्टन आव्यूह प्रमेय',
    frontSnippetEn: 'Every square matrix satisfies its own characteristic polynomial equation.',
    frontSnippetHi: 'प्रत्येक वर्ग आव्यूह अपने अभिलाक्षणिक बहुपद समीकरण को संतुष्ट करता है।',
    sdsuvExamTag: '⚡ 5 Marks • Quick Scoring',
    backContent: {
      primaryFormulaOrDate: '|A - \\lambda I| = 0 \\implies c_n A^n + c_{n-1} A^{n-1} + \\dots + c_0 I = 0',
      explanationEn: 'Allows calculating matrix inverse A⁻¹ = - (1/c₀) [c_n Aⁿ⁻¹ + ... + c₁ I] and evaluating massive matrix powers A¹⁰⁰ via polynomial division.',
      explanationHi: 'इस प्रमेय की सहायता से बिना लंबे सहखंडज (Adjoint) के आव्यूह व्युत्क्रम A⁻¹ तथा आव्यूह की उच्च घाते सरलता से ज्ञात की जा सकती हैं।',
      keyPoints: [
        'Applies to any n×n matrix over real or complex field',
        'Characteristic equation roots are the eigenvalues λ',
        'Direct SDSUV 5-mark question in Section B',
      ],
      examMarkWeight: '5 Marks',
    },
  },
  {
    id: 'fc-bio-c4-kranz',
    stream: 'bsc-bio',
    category: 'definition',
    subjectCode: 'SDSUV-BOT-201',
    subjectNameEn: 'Plant Ecology & Taxonomy',
    subjectNameHi: 'पादप पारिस्थितिकी एवं वर्गिकी',
    titleEn: 'Kranz Anatomy & Hatch-Slack Pathway',
    titleHi: 'क्रैंज शारीरिकी एवं हैच-स्लैक चक्र (C4 पादप)',
    frontSnippetEn: 'Spatial separation of carbon fixation avoiding RuBisCO photorespiration in tropical grasses.',
    frontSnippetHi: 'उष्णकटिबंधीय घासों में प्रकाश-श्वसन से बचाव हेतु कार्बन स्थिरीकरण का विभाजन।',
    sdsuvExamTag: '🔥 10 Marks • Botany Section C',
    backContent: {
      primaryFormulaOrDate: '\\text{PEP} + \\text{CO}_2 \\xrightarrow{\\text{PEP-Case}} \\text{Oxaloacetate (4C)}',
      explanationEn: 'Mesophyll cells fix CO₂ into 4-carbon OAA via PEP carboxylase. Malate is then transported to concentric bundle sheath cells (Kranz anatomy) where RuBisCO operates with zero photorespiration.',
      explanationHi: 'पर्णमध्योतक में PEP कार्बोक्सिलेज द्वारा CO₂ का 4-कार्बन OAA में स्थिरीकरण होता है। पूलाच्छद कोशिकाओं में क्रैंज शारीरिकी पाई जाती है।',
      keyPoints: [
        'Examples: Maize (मक्का), Sugarcane (गन्ना), Sorghum',
        'High water and nitrogen use efficiency under high temperature',
        'Absence of photorespiration gives higher biomass yield',
      ],
      examMarkWeight: '10 Marks',
    },
  },

  // =========================================================================
  // BA ARTS HISTORICAL DATES, CONSTITUTIONAL ARTICLES & THEORIES
  // =========================================================================
  {
    id: 'fc-history-sagauli-1815',
    stream: 'ba-arts',
    category: 'date-article',
    subjectCode: 'SDSUV-HIS-201',
    subjectNameEn: 'Ancient & Medieval History of India',
    subjectNameHi: 'भारत का प्राचीन एवं मध्यकालीन इतिहास',
    titleEn: 'Treaty of Sagauli (1815) - Uttarakhand Frontier Demarcation',
    titleHi: 'सुगौली की संधि (1815) - उत्तराखण्ड सीमा निर्धारण',
    frontSnippetEn: 'Crucial historical pact ending the Anglo-Nepalese War, establishing Kali River border.',
    frontSnippetHi: 'आंग्ल-नेपाल युद्ध समाप्त करने वाली ऐतिहासिक संधि, जिसने काली नदी सीमा तय की।',
    sdsuvExamTag: '🔥 10 Marks • Core Uttarakhand History',
    backContent: {
      primaryFormulaOrDate: '2 \\text{ December } 1815 \\text{ (Ratified } 4 \\text{ March } 1816)',
      explanationEn: 'Signed between East India Company (Col. Paris Bradshaw) and King of Nepal. Nepal ceded Garhwal and Kumaon territories west of Kali River, creating British Garhwal and Tehri Garhwal State under Raja Sudarshan Shah.',
      explanationHi: 'ईस्ट इंडिया कंपनी और नेपाल नरेश के मध्य हस्ताक्षरित। नेपाल ने काली नदी के पश्चिम का सम्पूर्ण गढ़वाल एवं कुमाऊं क्षेत्र छोड़ दिया। राजा सुदर्शन शाह को टिहरी रियासत मिली।',
      keyPoints: [
        'Kali River marked as the permanent western border of Nepal',
        'British established administrative cantonments in Almora & Lansdowne',
        'High relevance for both SDSUV exams and UKPSC State PCS',
      ],
      examMarkWeight: '10 Marks',
    },
  },
  {
    id: 'fc-history-chipko-1974',
    stream: 'ba-arts',
    category: 'date-article',
    subjectCode: 'SDSUV-HIS-201',
    subjectNameEn: 'Uttarakhand Regional History & Society',
    subjectNameHi: 'उत्तराखण्ड क्षेत्रीय इतिहास एवं समाज',
    titleEn: 'Chipko Andolan (1974) - Reni Village Forest Satyagraha',
    titleHi: 'चिपको आंदोलन (1974) - रैणी गांव वन सत्याग्रह',
    frontSnippetEn: 'Pioneering eco-feminist non-violent struggle to protect Himalayan forests by hugging trees.',
    frontSnippetHi: 'पेड़ों से चिपककर हिमालयी वनों की रक्षा हेतु ऐतिहासिक अहिंसक सत्याग्रह।',
    sdsuvExamTag: '🔥 15 Marks • Sociological & Historical Movement',
    backContent: {
      primaryFormulaOrDate: '26 \\text{ March } 1974 \\text{ (Reni, Chamoli Garhwal)}',
      explanationEn: 'Led by Gaura Devi with 27 village women confronting commercial loggers. Supported by Chandi Prasad Bhatt (DGSM) and environmentalist Sunderlal Bahuguna who took the message globally.',
      explanationHi: 'गौरा देवी के नेतृत्व में 27 ग्रामीण महिलाओं ने रैणी गांव (चमोली) में पेड़ों को आलिंगन में लेकर ठेकेदारों को भगाया। सुंदरलाल बहुगुणा तथा चंडी प्रसाद भट्ट ने नेतृत्व प्रदान किया।',
      keyPoints: [
        'Slogan: "क्या हैं जंगल के उपकार? मिट्टी, पानी और बयार। मिट्टी, पानी और बयार, जिंदा रहने के आधार।"',
        'Led to 15-year commercial green-felling ban in Himalayan regions in 1980',
        'Conferred Right Livelihood Award in 1987',
      ],
      examMarkWeight: '15 Marks',
    },
  },
  {
    id: 'fc-polity-article-32-21',
    stream: 'ba-arts',
    category: 'date-article',
    subjectCode: 'SDSUV-POL-201',
    subjectNameEn: 'Indian Government & Political Dynamics',
    subjectNameHi: 'भारतीय शासन एवं राजनीतिक व्यवस्था',
    titleEn: 'Article 32 & 21: Constitutional Remedies & Right to Life',
    titleHi: 'अनुच्छेद 32 एवं 21: संवैधानिक उपचार तथा प्राण एवं दैहिक स्वतंत्रता',
    frontSnippetEn: 'The Heart and Soul of the Constitution (Dr. Ambedkar) and Golden Triangle jurisprudence.',
    frontSnippetHi: 'संविधान की आत्मा एवं हृदय (डॉ. आंबेडकर) तथा स्वर्णिम त्रिभुज सिद्धांत।',
    sdsuvExamTag: '💎 15 Marks • Compulsory Polity Question',
    backContent: {
      primaryFormulaOrDate: '\\text{Art. 32 (Supreme Court Writs)} \\iff \\text{Art. 226 (High Court Writs)}',
      explanationEn: 'Article 32 empowers Supreme Court to issue 5 Writs: Habeas Corpus, Mandamus, Prohibition, Certiorari, and Quo-Warranto. Article 21 guarantees life and personal liberty with expanded meaning (Maneka Gandhi, 1978).',
      explanationHi: 'अनुच्छेद 32 के तहत सर्वोच्च न्यायालय 5 प्रकार के रिट (बन्दी प्रत्यक्षीकरण, परमादेश, प्रतिषेध, उत्प्रेषण, अधिकार पृच्छा) जारी कर सकता है।',
      keyPoints: [
        'Article 32 cannot be suspended except during National Emergency under Article 359',
        'Dr. B.R. Ambedkar declared Article 32 as the "Heart and Soul" of Constitution',
        'Article 21 covers Right to Privacy (Puttaswamy 2017) and Right to Clean Environment',
      ],
      examMarkWeight: '15 Marks',
    },
  },
  {
    id: 'fc-polity-kautilya-saptanga',
    stream: 'ba-arts',
    category: 'definition',
    subjectCode: 'SDSUV-POL-201',
    subjectNameEn: 'Ancient Indian Political Thought',
    subjectNameHi: 'प्राचीन भारतीय राजनीतिक विचार',
    titleEn: "Kautilya's Saptanga Theory of State",
    titleHi: 'कौटिल्य का सप्तांग राज्य सिद्धांत',
    frontSnippetEn: 'Seven organic constituent elements (prakritis) essential for state sovereignty and stability.',
    frontSnippetHi: 'राज्य संप्रभुता एवं सुरक्षा हेतु अनिवार्य 7 जैविक अंग (प्रकृतियां)।',
    sdsuvExamTag: '⚡ 10 Marks • Arthashastra Core',
    backContent: {
      primaryFormulaOrDate: '\\text{State} = \\text{Swami} + \\text{Amatya} + \\text{Janapada} + \\text{Durga} + \\text{Kosha} + \\text{Danda} + \\text{Mitra}',
      explanationEn: 'Kautilya (Chanakya) likened the state to a living organism with 7 interdependent organs: Swami (Head/King), Amatya (Eyes/Ministers), Janapada (Legs/Territory), Durga (Arms/Fort), Kosha (Mouth/Treasury), Danda (Mind/Army), and Mitra (Ears/Allies).',
      explanationHi: 'कौटिल्य के अनुसार राज्य एक जीवित शरीर के समान है जिसके 7 अंग हैं: स्वामी (राजा/सिर), अमात्य (मंत्री/नेत्र), जनपद (भूमि व प्रजा/पैर), दुर्ग (किला/भुजाएं), कोश (खजाना/मुख), दण्ड (सेना/मस्तिष्क), मित्र (कान)।',
      keyPoints: [
        'Emphasized that weak treasury (Kosha) collapses state defense',
        'Concept of "Yogakshema" (welfare and protection of subjects)',
        'Mandala theory complements Saptanga for foreign policy',
      ],
      examMarkWeight: '10 Marks',
    },
  },
];

interface QuickFlashcardsTabProps {
  stream: StreamType;
  lang: LanguageType;
  subjectCode?: string;
}

export default function QuickFlashcardsTab({
  stream,
  lang,
  subjectCode,
}: QuickFlashcardsTabProps) {
  const [activeCategory, setActiveCategory] = useState<'all' | 'formula' | 'date-article' | 'theorem'>('all');
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [masteredCards, setMasteredCards] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});

  // Check saved status on mount
  React.useEffect(() => {
    const statuses: Record<string, boolean> = {};
    REVISION_FLASHCARDS_DATA.forEach((card) => {
      statuses[card.id] = isItemSaved(card.id);
    });
    setSavedStatus(statuses);

    const handleVaultUpdate = () => {
      const updated: Record<string, boolean> = {};
      REVISION_FLASHCARDS_DATA.forEach((card) => {
        updated[card.id] = isItemSaved(card.id);
      });
      setSavedStatus(updated);
    };

    window.addEventListener('sdsuv_saved_vault_updated', handleVaultUpdate);
    return () => window.removeEventListener('sdsuv_saved_vault_updated', handleVaultUpdate);
  }, []);

  const toggleFlip = (id: string) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMasteredCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleBookmark = (card: FlashcardItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const isNowSaved = toggleSaveItem({
      id: card.id,
      type: 'topic',
      titleEn: card.titleEn,
      titleHi: card.titleHi,
      subtitleEn: `${card.subjectNameEn} • ${card.sdsuvExamTag}`,
      subtitleHi: `${card.subjectNameHi}`,
      tag: card.sdsuvExamTag,
      subjectCode: card.subjectCode,
      linkUrl: `/learn?q=${card.titleEn}`,
      notes: `Key Formula / Context: ${card.backContent.primaryFormulaOrDate}`,
      isMastered: !!masteredCards[card.id],
    });
    setSavedStatus((prev) => ({ ...prev, [card.id]: isNowSaved }));
  };

  // Filter cards by stream (or cross-stream exploration), category, and search
  const filteredCards = REVISION_FLASHCARDS_DATA.filter((card) => {
    const streamMatch = stream === 'ba-arts' ? card.stream === 'ba-arts' : card.stream !== 'ba-arts';
    const categoryMatch = activeCategory === 'all' || card.category === activeCategory;
    const query = searchQuery.toLowerCase();
    const searchMatch =
      !query ||
      card.titleEn.toLowerCase().includes(query) ||
      card.titleHi.toLowerCase().includes(query) ||
      card.subjectCode.toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls & Category Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl glass-panel border border-white/10 bg-[#0a0f26]">
        <div className="space-y-0.5">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold text-white">
              {lang === 'en' ? 'Quick Revision Flashcards' : 'त्वरित पुनरीक्षण फ्लैशकार्ड्स'}
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-500/30">
              {filteredCards.length} Cards Active
            </span>
          </div>
          <p className="text-xs text-slate-400">
            {lang === 'en'
              ? 'Click any card to flip and reveal formulas (BSc) or historical dates/articles (BA).'
              : 'कार्ड पर क्लिक कर सूत्र (बीएससी) अथवा ऐतिहासिक तिथियां एवं अनुच्छेद (बीए) देखें।'}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === 'en' ? 'Search formulas or dates...' : 'सूत्र या तिथि खोजें...'}
            className="w-full bg-black/60 border border-white/15 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
          />
        </div>
      </div>

      {/* Filter Segmented Controls */}
      <div className="flex flex-wrap items-center gap-1.5">
        {[
          { id: 'all', label: lang === 'en' ? 'All Cards' : 'सभी कार्ड्स' },
          { id: 'formula', label: lang === 'en' ? '📐 BSc Formulas' : '📐 बीएससी सूत्र' },
          { id: 'theorem', label: lang === 'en' ? '📝 Core Theorems' : '📝 मुख्य प्रमेय' },
          { id: 'date-article', label: lang === 'en' ? '🏛️ BA Dates & Articles' : '🏛️ बीए तिथियां/अनुच्छेद' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setActiveCategory(f.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
              activeCategory === f.id
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 border-cyan-400 font-bold shadow-md shadow-cyan-500/20'
                : 'bg-white/[0.04] text-slate-300 border-white/10 hover:bg-white/[0.08]'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Flashcards Grid with 3D Flip */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredCards.map((card) => {
          const isFlipped = !!flippedCards[card.id];
          const isMastered = !!masteredCards[card.id];
          const isSaved = !!savedStatus[card.id];

          return (
            <motion.div
              key={card.id}
              layout
              onClick={() => toggleFlip(card.id)}
              className="cursor-pointer min-h-[260px] rounded-3xl p-5 border transition-all relative flex flex-col justify-between group overflow-hidden select-none bg-gradient-to-b from-[#0c1230] to-[#070913] hover:border-cyan-400/50 shadow-xl"
              style={{
                borderColor: isMastered ? '#10b981' : isFlipped ? '#06b6d4' : 'rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

              {!isFlipped ? (
                // ==========================================================
                // FRONT OF CARD: Question / Concept / Tag
                // ==========================================================
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-500/30 font-semibold">
                      {card.subjectCode}
                    </span>
                    <span className="text-[10px] font-semibold text-amber-400">
                      {card.sdsuvExamTag}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="text-base font-extrabold text-white group-hover:text-cyan-200 transition-colors leading-snug">
                      {lang === 'en' ? card.titleEn : card.titleHi}
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {lang === 'en' ? card.frontSnippetEn : card.frontSnippetHi}
                    </p>
                  </div>

                  <div className="pt-2">
                    <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center space-x-1.5 text-cyan-400 font-mono text-[11px] font-bold">
                        <RotateCw className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>Tap to reveal derivation & formula</span>
                      </span>
                      <span className="font-mono text-[10px] text-amber-400 font-bold">
                        {card.backContent.examMarkWeight}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                // ==========================================================
                // BACK OF CARD: Formula / Derivation / Key Dates
                // ==========================================================
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold flex items-center space-x-1">
                      <Sparkles className="w-3 h-3" />
                      <span>Formula & Derivation Key</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                      <RotateCw className="w-3 h-3" />
                      <span>Tap to flip back</span>
                    </span>
                  </div>

                  {/* Highlight Formula Box */}
                  <div className="p-3 rounded-2xl bg-black/70 border border-cyan-500/40 font-mono text-xs text-cyan-200 text-center font-bold tracking-wide">
                    {card.backContent.primaryFormulaOrDate}
                  </div>

                  {/* Bilingual Explanation */}
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {lang === 'en' ? card.backContent.explanationEn : card.backContent.explanationHi}
                  </p>

                  {/* Bullet Takeaways */}
                  <div className="space-y-1">
                    {card.backContent.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start space-x-1.5 text-[11px] text-slate-300">
                        <span className="text-cyan-400 font-bold">•</span>
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 mt-4 border-t border-white/10 text-xs">
                <button
                  type="button"
                  onClick={(e) => toggleMastered(card.id, e)}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
                    isMastered
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
                  }`}
                  title={isMastered ? 'Marked as Mastered' : 'Mark as Mastered'}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span className="text-[11px]">{isMastered ? 'Mastered' : 'Needs Review'}</span>
                </button>

                <button
                  type="button"
                  onClick={(e) => handleBookmark(card, e)}
                  className={`px-3 py-1.5 rounded-xl font-bold flex items-center space-x-1.5 transition-all ${
                    isSaved
                      ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
                      : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white'
                  }`}
                  title={isSaved ? 'Saved in Exam Night Vault' : 'Save to Exam Night Vault'}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5 text-amber-400" />
                      <span className="text-[11px]">Saved in Vault</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span className="text-[11px]">Save for Exam</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
