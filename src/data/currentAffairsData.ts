export type NewsScope = 'international' | 'national' | 'uttarakhand';

export type NewsCategory =
  | 'all'
  | 'political'
  | 'economic'
  | 'educational'
  | 'law'
  | 'technology'
  | 'environment';

export type NewsLanguage = 'en' | 'hi';

export interface CurrentAffairsItem {
  id: string;
  title: string;
  sourceName: string;
  sourceUrl?: string;
  publishedAt: string;
  url: string;
  scope: NewsScope;
  category: Exclude<NewsCategory, 'all'>;
  summary: string;
  fullDigest: string;
  examRelevance: string;
  examSubject: string;
  tags: string[];
  isLive?: boolean;
}

export interface ScopeTabMeta {
  id: NewsScope;
  labelEn: string;
  labelHi: string;
  icon: string;
  descEn: string;
  descHi: string;
}

export const SCOPE_TABS: ScopeTabMeta[] = [
  {
    id: 'international',
    labelEn: 'International',
    labelHi: 'अंतर्राष्ट्रीय',
    icon: '🌍',
    descEn: 'Global geopolitics, UN treaties, world economy & cross-border technology',
    descHi: 'वैश्विक भू-राजनीति, संयुक्त राष्ट्र संधियां, विश्व अर्थव्यवस्था एवं प्रौद्योगिकी',
  },
  {
    id: 'national',
    labelEn: 'National (India)',
    labelHi: 'राष्ट्रीय (भारत)',
    icon: '🇮🇳',
    descEn: 'Union cabinet, Parliament, Supreme Court, national economy & education policy',
    descHi: 'केंद्रीय मंत्रिमंडल, संसद, सर्वोच्च न्यायालय, राष्ट्रीय अर्थव्यवस्था एवं शिक्षा नीति',
  },
  {
    id: 'uttarakhand',
    labelEn: 'Uttarakhand State',
    labelHi: 'उत्तराखंड राज्य',
    icon: '🏔️',
    descEn: 'Dehradun & Gairsain decisions, UKPSC/SDSUV academic updates, Char Dham & hill ecology',
    descHi: 'देहरादून-गैरसैंण कैबिनेट निर्णय, यूकेपीएससी/एसडीएसयूवी अपडेट, चारधाम एवं पर्वतीय विकास',
  },
];

export interface CategoryMeta {
  id: NewsCategory;
  labelEn: string;
  labelHi: string;
  icon: string;
}

export const CATEGORIES: CategoryMeta[] = [
  { id: 'all', labelEn: 'All Categories', labelHi: 'सभी श्रेणियां', icon: '✨' },
  { id: 'political', labelEn: 'Political & Governance', labelHi: 'राजनीति एवं शासन', icon: '🏛️' },
  { id: 'economic', labelEn: 'Economic & Banking', labelHi: 'अर्थव्यवस्था एवं बैंकिंग', icon: '📈' },
  { id: 'educational', labelEn: 'Educational & Campus', labelHi: 'शिक्षा एवं विश्वविद्यालय', icon: '🎓' },
  { id: 'law', labelEn: 'Crime, Law & Judiciary', labelHi: 'विधि एवं न्यायपालिका', icon: '⚖️' },
  { id: 'technology', labelEn: 'Development & Technology', labelHi: 'विकास एवं प्रौद्योगिकी', icon: '🚀' },
  { id: 'environment', labelEn: 'Environment & Himalayan Ecology', labelHi: 'पर्यावरण एवं हिमालयी पारिस्थितिकी', icon: '🌿' },
];

export const TRUSTED_SOURCES_CONFIG = {
  en: [
    { name: 'The Indian Express', color: 'from-rose-500 to-red-600', text: 'text-rose-400' },
    { name: 'BBC News', color: 'from-red-600 to-rose-700', text: 'text-red-400' },
    { name: 'Hindustan Times', color: 'from-sky-500 to-blue-600', text: 'text-sky-400' },
    { name: 'The Times of India', color: 'from-blue-600 to-indigo-700', text: 'text-blue-400' },
    { name: 'The Hindu', color: 'from-slate-700 to-amber-600', text: 'text-amber-400' },
    { name: 'LiveMint', color: 'from-amber-500 to-orange-600', text: 'text-amber-400' },
    { name: 'Reuters', color: 'from-orange-500 to-amber-700', text: 'text-orange-400' },
  ],
  hi: [
    { name: 'Amar Ujala', color: 'from-red-600 to-amber-600', text: 'text-amber-400' },
    { name: 'LiveHindustan', color: 'from-blue-500 to-cyan-600', text: 'text-cyan-400' },
    { name: 'Dainik Jagran', color: 'from-orange-600 to-red-600', text: 'text-orange-400' },
    { name: 'BBC Hindi', color: 'from-red-600 to-rose-700', text: 'text-red-400' },
    { name: 'Navbharat Times', color: 'from-blue-600 to-teal-600', text: 'text-teal-400' },
    { name: 'Jansatta', color: 'from-purple-600 to-indigo-600', text: 'text-purple-400' },
  ],
};

// Auto-generator for Exam Relevance syllabus mapping
export function generateExamRelevance(
  title: string,
  scope: NewsScope,
  category: Exclude<NewsCategory, 'all'>,
  lang: NewsLanguage
): { examRelevance: string; examSubject: string } {
  if (lang === 'hi') {
    switch (scope) {
      case 'uttarakhand':
        switch (category) {
          case 'political':
            return {
              examSubject: 'यूकेपीएससी सामान्य अध्ययन-II / बीए राजनीति विज्ञान (इकाई 3)',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): उत्तराखंड शासन व्यवस्था, राज्य विधानसभा कार्यप्रणाली एवं 73वें/74वें संविधान संशोधन के अंतर्गत पंचायती राज विकास से प्रत्यक्ष संबंधित।',
            };
          case 'economic':
            return {
              examSubject: 'यूकेपीएससी पेपर-5 (उत्तराखंड अर्थव्यवस्था) / बीए अर्थशास्त्र',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): राज्य राजस्व सृजन, पर्यटन अर्थव्यवस्था, जलविद्युत नीतियां एवं पर्वतीय पलायन रोकथाम कार्ययोजना के लिए अत्यंत महत्वपूर्ण।',
            };
          case 'educational':
            return {
              examSubject: 'एसडीएसयूवी बीए शिक्षाशास्त्र / एनईपी 2020 राज्य क्रियान्वयन',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): नई शिक्षा नीति 2020, समर्थ ई-गवर्नेंस पोर्टल एवं उच्च शिक्षा में क्रेडिट सिस्टम (ABC) सुधारों के संदर्भ में उपयोगी।',
            };
          case 'law':
            return {
              examSubject: 'यूकेपीएससी सिविल जज एवं मुख्य परीक्षा जीएस-2 / विधिक अध्ययन',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): नैनीताल उच्च न्यायालय के ऐतिहासिक निर्णय, लोकहित याचिकाएं (PIL) एवं उत्तराखंड समान नागरिक संहिता (UCC) प्रावधान।',
            };
          case 'technology':
            return {
              examSubject: 'यूकेपीएससी जीएस पेपर-6 (विज्ञान एवं ई-गवर्नेंस) / सूचना प्रौद्योगिकी',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): पर्वतीय क्षेत्रों में डिजिटल कनेक्टिविटी, भूस्खलन पूर्व चेतावनी टेलीमेट्री व स्मार्ट शासन प्रणाली के लिए महत्वपूर्ण।',
            };
          case 'environment':
          default:
            return {
              examSubject: 'एसडीएसयूवी बीए भूगोल इकाई IV / यूकेपीएससी पेपर-4 (आपदा प्रबंधन)',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): हिमालयी भू-आकृति विज्ञान, चारधाम कॉरिडोर प्रभाव, हिमनद झील विस्फोट (GLOF) एवं सतत पर्वतीय विकास हेतु मुख्य बिंदु।',
            };
        }
      case 'national':
        switch (category) {
          case 'political':
            return {
              examSubject: 'यूपीएससी जीएस-2 (भारतीय संविधान एवं शासन) / बीए राजनीति विज्ञान',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UPSC / UKPSC / BA): संघ-राज्य संबंध, संसद की कार्यप्रणाली, संसदीय समितियां एवं लोकतांत्रिक संस्थागत सुधारों से जुड़ा प्रमुख विषय।',
            };
          case 'economic':
            return {
              examSubject: 'यूपीएससी जीएस-3 (भारतीय अर्थव्यवस्था व मौद्रिक नीति) / बीए अर्थशास्त्र',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UPSC / UKPSC / BA): आरबीआई मौद्रिक नीति, राजकोषीय घाटा प्रबंधन, मुद्रास्फीति नियंत्रण एवं बैंकिंग सुधारों के लिए उच्च प्रासंगिक।',
            };
          case 'educational':
            return {
              examSubject: 'यूजीसी नेट पेपर-1 (उच्च शिक्षा प्रणाली) / बीए समाजशास्त्र',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UPSC / NET / BA): राष्ट्रीय शिक्षा नीति (NEP-2020), यूजीसी विनियम एवं उच्च शिक्षण संस्थानों में स्वायत्तता से जुड़ा संदर्भ।',
            };
          case 'law':
            return {
              examSubject: 'यूपीएससी जीएस-2 (संवैधानिक न्यायशास्त्र) / भारतीय न्याय संहिता',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UPSC / Judiciary / BA): सर्वोच्च न्यायालय के संविधान पीठ के फैसले, मौलिक अधिकार (अनुच्छेद 21) एवं विधिक संरचना सुधार।',
            };
          case 'technology':
            return {
              examSubject: 'यूपीएससी जीएस-3 (विज्ञान व तकनीकी) / डिजिटल इंडिया मिशन',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UPSC / UKPSC / BA): कृत्रिम बुद्धिमत्ता (AI) नियमन, राष्ट्रीय सेमीकंडक्टर मिशन, अंतरिक्ष अनुसंधान (ISRO) एवं साइबर सुरक्षा ढांचा।',
            };
          case 'environment':
          default:
            return {
              examSubject: 'यूपीएससी जीएस-3 (पर्यावरण एवं जैव विविधता) / बीए भूगोल',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UPSC / UKPSC / BA): जलवायु परिवर्तन कार्ययोजना, नवीकरणीय ऊर्जा लक्ष्य (500 GW), राष्ट्रीय वन नीति एवं पेरिस समझौते की प्रतिबद्धताएं।',
            };
        }
      case 'international':
      default:
        switch (category) {
          case 'political':
            return {
              examSubject: 'यूपीएससी जीएस-2 (अंतर्राष्ट्रीय संबंध एवं संधियां) / बीए राजनीति विज्ञान',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UPSC GS-2 / BA): संयुक्त राष्ट्र सुरक्षा परिषद सुधार, द्विपक्षीय कूटनीति, जी20 घोषणापत्र एवं वैश्विक शक्ति संतुलन गतिशीलता।',
            };
          case 'economic':
            return {
              examSubject: 'यूपीएससी जीएस-3 (वैश्विक व्यापार व आईएमएफ) / बीए अर्थशास्त्र',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UPSC GS-3 / BA): वैश्विक आपूर्ति श्रृंखला, विश्व व्यापार संगठन (WTO) वार्ताओं एवं अंतर्राष्ट्रीय मुद्रा कोष (IMF) नीति समीक्षा।',
            };
          case 'technology':
            return {
              examSubject: 'यूपीएससी जीएस-3 (वैश्विक तकनीकी संधियां) / बौद्धिक संपदा अधिकार',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UPSC GS-3 / BA): वैश्विक एआई सुरक्षा सम्मेलन, अंतर्राष्ट्रीय साइबर सुरक्षा संधियां एवं तकनीकी हस्तांतरण विनियम।',
            };
          case 'environment':
          default:
            return {
              examSubject: 'यूपीएससी जीएस-3 (जलवायु शिखर सम्मेलन व यूएनएफसीसीसी) / पर्यावरण अध्ययन',
              examRelevance:
                '📌 परीक्षा उपयोगिता (UPSC GS-3 / BA): कॉप (COP) जलवायु समझौते, लॉस एंड डैमेज फंड, कार्बन सीमा कर एवं वैश्विक जैव विविधता संरक्षण प्रारूप।',
            };
        }
    }
  }

  // English generator
  switch (scope) {
    case 'uttarakhand':
      switch (category) {
        case 'political':
          return {
            examSubject: 'UKPSC Combined State CS GS Paper II / SDSUV BA Pol Sci Unit III',
            examRelevance:
              '📌 Exam Relevance (UKPSC / SDSUV BA): Directly links to Uttarakhand state executive governance, Legislative Assembly procedures, and PRIs under 73rd/74th Constitutional Amendments.',
          };
        case 'economic':
          return {
            examSubject: 'UKPSC Paper V (Uttarakhand Economy) / SDSUV BA Economics Paper II',
            examRelevance:
              '📌 Exam Relevance (UKPSC / SDSUV BA): High-yield topic for Uttarakhand state fiscal health, hill agriculture commercialization, eco-tourism revenue, and anti-outmigration schemes.',
          };
        case 'educational':
          return {
            examSubject: 'SDSUV BA Education & Sociology / NEP 2020 State Implementation',
            examRelevance:
              '📌 Exam Relevance (UKPSC / SDSUV BA): Crucial for university governance reforms, Samarth Higher Education portal adoption, and Academic Bank of Credits (ABC) compliance.',
          };
        case 'law':
          return {
            examSubject: 'UKPSC Civil Judge & Mains GS-II / Nainital High Court Jurisprudence',
            examRelevance:
              '📌 Exam Relevance (UKPSC / SDSUV BA): Covers Nainital High Court environmental PIL precedents, state municipal enactments, and Uttarakhand Uniform Civil Code (UCC) framework.',
          };
        case 'technology':
          return {
            examSubject: 'UKPSC GS Paper VI (Science & e-Governance in Mountain Terrains)',
            examRelevance:
              '📌 Exam Relevance (UKPSC / SDSUV BA): Directly tests hill terrain telemetry, real-time Doppler radar deployments, optical fiber reach in border districts, and digital public infrastructure.',
          };
        case 'environment':
        default:
          return {
            examSubject: 'SDSUV BA Geography Unit IV (Himalayan Ecology) / UKPSC GS Paper IV',
            examRelevance:
              '📌 Exam Relevance (UKPSC / SDSUV BA): Must-know topic for Himalayan glaciology, Char Dham ecotourism carrying capacity, Glacial Lake Outburst Floods (GLOFs), and disaster mitigation.',
          };
      }
    case 'national':
      switch (category) {
        case 'political':
          return {
            examSubject: 'UPSC CSE GS Paper II (Indian Polity & Constitution) / SDSUV BA Pol Sci',
            examRelevance:
              '📌 Exam Relevance (UPSC / UKPSC / BA): Vital for Union-State legislative dynamics, Parliamentary committee deliberations, federalism, and statutory authority oversight.',
          };
        case 'economic':
          return {
            examSubject: 'UPSC CSE GS Paper III (Indian Economy & Banking) / SDSUV BA Economics',
            examRelevance:
              '📌 Exam Relevance (UPSC / UKPSC / BA): Directly links to RBI Monetary Policy Committee mandates, repo rate mechanisms, headline inflation targets, and capital expenditure trends.',
          };
        case 'educational':
          return {
            examSubject: 'UGC-NET Paper I (Higher Education) / SDSUV BA Sociology & Education',
            examRelevance:
              '📌 Exam Relevance (UPSC / NET / BA): Relevant for National Education Policy (NEP 2020) institutional autonomy, multi-disciplinary undergraduate frameworks, and NIRF criteria.',
          };
        case 'law':
          return {
            examSubject: 'UPSC CSE GS Paper II (Constitutional Law & Judiciary) / Bharatiya Nyaya Sanhita',
            examRelevance:
              '📌 Exam Relevance (UPSC / UKPSC / BA): Key jurisprudential review of Supreme Court Constitutional Bench rulings, Article 21 expansive interpretation, and federal judicial reforms.',
          };
        case 'technology':
          return {
            examSubject: 'UPSC CSE GS Paper III (Science & Technology) / Digital India Mission',
            examRelevance:
              '📌 Exam Relevance (UPSC / UKPSC / BA): Crucial for India Semiconductor Mission (ISM), frontier AI safety principles, ISRO missions, and digital data privacy protections.',
          };
        case 'environment':
        default:
          return {
            examSubject: 'UPSC CSE GS Paper III (Environment & Ecology) / SDSUV BA Geography',
            examRelevance:
              '📌 Exam Relevance (UPSC / UKPSC / BA): High-yield focus on National Action Plan on Climate Change (NAPCC), 500 GW clean energy pathways, wetlands preservation, and wildlife corridors.',
          };
      }
    case 'international':
    default:
      switch (category) {
        case 'political':
          return {
            examSubject: 'UPSC CSE GS Paper II (International Relations & Global Institutions)',
            examRelevance:
              '📌 Exam Relevance (UPSC GS-II / BA): Essential for UN Security Council reforms, multilateral treaties, Indo-Pacific geostrategic architecture, and international conflict resolution.',
          };
        case 'economic':
          return {
            examSubject: 'UPSC CSE GS Paper III (Global Macroeconomics, IMF & WTO Frameworks)',
            examRelevance:
              '📌 Exam Relevance (UPSC GS-III / BA): In-depth examination of cross-border trade balances, global central bank rate adjustments, WTO dispute settlements, and energy logistics.',
          };
        case 'technology':
          return {
            examSubject: 'UPSC CSE GS Paper III (Frontier Tech, AI Safety Accords & Space Treaties)',
            examRelevance:
              '📌 Exam Relevance (UPSC GS-III / BA): High relevance for global artificial intelligence governance, Bletchley Park AI declarations, cross-border cybersecurity protocols, and IP treaties.',
          };
        case 'environment':
        default:
          return {
            examSubject: 'UPSC CSE GS Paper III (UNFCCC, Global Biodiversity & Climate Finance)',
            examRelevance:
              '📌 Exam Relevance (UPSC GS-III / BA): Essential for understanding COP climate agreements, Loss and Damage operationalization, carbon border adjustment mechanisms, and IPCC assessments.',
          };
      }
  }
}

// Curated comprehensive dataset (English)
export const CURATED_CURRENT_AFFAIRS_EN: CurrentAffairsItem[] = [
  // --- UTTARAKHAND STATE ---
  {
    id: 'ca-en-uk-env-01',
    title: 'Uttarakhand Sanctions ₹320 Cr for 18 Glacial Lake Early-Warning Telemetry Stations',
    sourceName: 'The Indian Express',
    sourceUrl: 'https://indianexpress.com',
    publishedAt: '2026-10-18T08:30:00Z',
    url: 'https://indianexpress.com/article/india/uttarakhand-glacial-lakes-telemetry-warning-system',
    scope: 'uttarakhand',
    category: 'environment',
    summary:
      'The Uttarakhand State Disaster Management Authority (USDMA) and Wadia Institute of Himalayan Geology have deployed automated real-time water-level sensors and satellite telemetry across high-risk glacial lakes in Chamoli and Pithoragarh districts.',
    fullDigest:
      'In a decisive intervention to avert catastrophic Glacial Lake Outburst Floods (GLOFs), the Uttarakhand state government approved a ₹320-crore telemetry warning project.\n\nKey Highlights of the Initiative:\n• 18 high-altitude glacial lakes, including Vasudhara Tal and tributaries feeding the Alaknanda and Dhauliganga basins, are being linked with solar-powered synthetic aperture radar (SAR) and depth telemetry.\n• Real-time data streams will beam into the State Emergency Operations Centre (SEOC) in Dehradun.\n• An automated acoustic siren network has been installed across downstream villages within an 80 km radius to provide a minimum 45-minute evacuation window.\n• The system also integrates ISRO Bhuvan satellite monitoring for glacial retreat velocity tracking.',
    examSubject: 'SDSUV BA Geography Unit IV (Himalayan Ecology) / UKPSC GS Paper IV',
    examRelevance:
      '📌 Exam Relevance (UKPSC / SDSUV BA): High-probability question for UKPSC GS Paper IV (Disaster Management) and SDSUV BA Geography Unit IV regarding Glacial Lake Outburst Floods (GLOFs) and mitigation frameworks.',
    tags: ['GLOF', 'USDMA', 'Wadia Institute', 'Chamoli', 'Disaster Mitigation'],
  },
  {
    id: 'ca-en-uk-pol-01',
    title: 'Uttarakhand Cabinet Notifies Rules for Uniform Civil Code (UCC) Implementation Across All 13 Districts',
    sourceName: 'The Times of India',
    sourceUrl: 'https://timesofindia.indiatimes.com',
    publishedAt: '2026-10-17T11:15:00Z',
    url: 'https://timesofindia.indiatimes.com/city/dehradun/uttarakhand-notifies-ucc-rules-across-districts',
    scope: 'uttarakhand',
    category: 'political',
    summary:
      'The Uttarakhand Government in Dehradun has formally gazetted the administrative rules and sub-divisional registration portals for the Uniform Civil Code, establishing uniform inheritance, marriage, and live-in partnership procedures.',
    fullDigest:
      'Following the presidential assent to the Uttarakhand Uniform Civil Code Bill, the state administration in Dehradun released the finalized procedural guidelines.\n\nMajor Administrative Provisions:\n• Creation of a decentralized digital registry accessible at Gram Panchayat and Tehsil levels for compulsory marriage and live-in partnership registrations within 30 days.\n• Equal testamentary succession and coparcenary rights guaranteed to sons and daughters irrespective of religious personal laws.\n• Complete statutory prohibition of bigamy, polygamy, and non-judicial divorces.\n• Special exemptions preserved for protected Scheduled Tribes recognized under the Fifth Schedule of the Constitution.',
    examSubject: 'UKPSC Combined State CS GS Paper II / SDSUV BA Pol Sci Unit III',
    examRelevance:
      '📌 Exam Relevance (UKPSC / SDSUV BA): Direct connection to Article 44 of the Directive Principles of State Policy, personal law codification, and state legislative competency under the Concurrent List.',
    tags: ['UCC', 'Article 44', 'State Cabinet', 'Dehradun', 'Civil Rights'],
  },
  {
    id: 'ca-en-uk-eco-01',
    title: 'Uttarakhand Eco-Tourism Policy 2026: Homestay Subsidies Raised to Boost Hill District Revenue',
    sourceName: 'Hindustan Times',
    sourceUrl: 'https://hindustantimes.com',
    publishedAt: '2026-10-16T09:45:00Z',
    url: 'https://hindustantimes.com/india-news/uttarakhand-eco-tourism-homestay-policy-update',
    scope: 'uttarakhand',
    category: 'economic',
    summary:
      'To curb youth outmigration from Pauri, Tehri, and Almora, the state finance department announced a revised 40% capital subsidy for traditional vernacular homestays, integrated with organic millet farming cooperatives.',
    fullDigest:
      'The Uttarakhand government unveiled its comprehensive Hill Tourism & Rural Regeneration Framework.\n\nCore Pillars of the Policy:\n• Capital subsidies up to ₹15 Lakh for converting ancestral wooden hill architecture into certified green homestays.\n• 100% stamp duty waiver for local youth registered with the Uttarakhand Skill Development Mission.\n• Integration of local culinary heritage featuring Mandua (Finger Millet), Jhangora (Barnyard Millet), and Gahat pulses across certified tourist lodges.\n• Target of generating 75,000 direct village-level livelihoods over the next three fiscal years.',
    examSubject: 'UKPSC Paper V (Uttarakhand Economy) / SDSUV BA Economics Paper II',
    examRelevance:
      '📌 Exam Relevance (UKPSC / SDSUV BA): Vital case study for UKPSC GS-5 on reverse migration, decentralized rural economy, and sustainable eco-tourism revenue in hill districts.',
    tags: ['Eco-Tourism', 'Homestays', 'Rural Economy', 'Migration', 'Almora'],
  },
  {
    id: 'ca-en-uk-edu-01',
    title: 'SDSUV & Higher Education Dept Roll Out Common Credit Repository on Samarth Portal',
    sourceName: 'The Indian Express',
    sourceUrl: 'https://indianexpress.com',
    publishedAt: '2026-10-15T14:20:00Z',
    url: 'https://indianexpress.com/article/education/sdsuv-samarth-portal-credit-framework-rollout',
    scope: 'uttarakhand',
    category: 'educational',
    summary:
      'Sri Dev Suman Uttarakhand University (SDSUV) has operationalized digital Academic Bank of Credits (ABC) validation across all 120+ affiliated constituent colleges, facilitating seamless multi-exit credit transfers for BA/BSc cohorts.',
    fullDigest:
      'Under the leadership of the Higher Education Department in Uttarakhand, SDSUV achieved 100% digital onboarding on the Samarth e-Gov portal.\n\nKey Academic Upgrades:\n• Real-time synchronization of DigiLocker ABC IDs for over 85,000 enrolled undergraduate students.\n• Automated semester-end credit transfers allowing inter-college mobility between SDSUV, Kumaun University, and Soban Singh Jeena University.\n• Integration of localized skill-enhancement courses (Himalayan Forest Ecology, Folk Music & Garhwali/Kumaoni Linguistic Heritage) into the credit basket.',
    examSubject: 'SDSUV BA Education & Sociology / NEP 2020 State Implementation',
    examRelevance:
      '📌 Exam Relevance (UKPSC / SDSUV BA): Highly relevant for SDSUV BA semester examinations on higher education democratization, NEP-2020 four-year UG framework, and state university administration.',
    tags: ['SDSUV', 'Samarth Portal', 'NEP 2020', 'ABC ID', 'Higher Education'],
  },
  {
    id: 'ca-en-uk-law-01',
    title: 'Nainital High Court Mandates Carrying Capacity Audit for Mussoorie & Nainital Eco-Sensitive Zones',
    sourceName: 'The Hindu',
    sourceUrl: 'https://thehindu.com',
    publishedAt: '2026-10-14T10:00:00Z',
    url: 'https://thehindu.com/news/national/other-states/nainital-hc-directs-carrying-capacity-audit-for-hill-towns',
    scope: 'uttarakhand',
    category: 'law',
    summary:
      'A division bench of the Uttarakhand High Court ordered an inter-disciplinary panel from NEERI, IIT Roorkee, and WIHG to quantify the strict tourist and construction carrying capacity of vulnerable hill stations.',
    fullDigest:
      'Responding to environmental public interest litigation (PIL) regarding recurring subsidence and unmanaged traffic snarls, the High Court issued stringent directions.\n\nCourt Directives:\n• Prohibition of fresh commercial multi-storey building permits in core municipal zones until the scientific audit is submitted.\n• Introduction of mandatory digital pre-registration for private vehicular transit into Mussoorie and Nainital during peak weekend corridors.\n• Comprehensive geo-technical mapping of slope stability along the George Everest and Mall Road belts.',
    examSubject: 'UKPSC Civil Judge & Mains GS-II / Nainital High Court Jurisprudence',
    examRelevance:
      '📌 Exam Relevance (UKPSC / SDSUV BA): Essential legal study for UKPSC Mains GS Paper II (Judicial Activism & Environmental Jurisprudence) and SDSUV BA Political Science (Judiciary & Public Interest Litigation).',
    tags: ['Nainital High Court', 'Carrying Capacity', 'Mussoorie', 'Environmental Law'],
  },
  {
    id: 'ca-en-uk-tech-01',
    title: 'Rishikesh-Karnaprayag Rail Line: India’s Longest Escape Tunnel Excavation Completed',
    sourceName: 'The Times of India',
    sourceUrl: 'https://timesofindia.indiatimes.com',
    publishedAt: '2026-10-13T16:30:00Z',
    url: 'https://timesofindia.indiatimes.com/india/rishikesh-karnaprayag-rail-tunnel-breakthrough',
    scope: 'uttarakhand',
    category: 'technology',
    summary:
      'Rail Vikas Nigam Limited (RVNL) achieved final breakthrough on Tunnel 12 (14.57 km) connecting Srinagar Garhwal to Devprayag, employing the New Austrian Tunnelling Method (NATM) with seismic sensors.',
    fullDigest:
      'The strategic 125 km Rishikesh-Karnaprayag Broad Gauge Rail Link reached a monumental milestone with the excavation of its longest tunnel complex.\n\nTechnical Feats:\n• 104 km of the total 125 km alignment runs through 16 deep mountain tunnels cutting across the fragile Main Central Thrust (MCT) geological fault line.\n• Deployment of fiber-optic distributed acoustic sensing (DAS) to track micro-seismic shifts in real time.\n• Designed to slash travel time between Rishikesh and Karnaprayag from 7 hours on mountain roads to under 2.5 hours, providing all-weather defense and pilgrim connectivity.',
    examSubject: 'UKPSC GS Paper VI (Science & Infrastructure in Hill Terrains)',
    examRelevance:
      '📌 Exam Relevance (UKPSC / SDSUV BA): Directly applicable to UKPSC questions on strategic Himalayan border connectivity, engineering geology, and regional development economics.',
    tags: ['RVNL', 'Karnaprayag Rail', 'NATM', 'Infrastructure', 'Garhwal'],
  },

  // --- NATIONAL (INDIA) ---
  {
    id: 'ca-en-nat-pol-01',
    title: 'Parliament Enacts Delimitation Preparedness Bill: Census Digital Framework to Precede Boundary Reorganization',
    sourceName: 'The Indian Express',
    sourceUrl: 'https://indianexpress.com',
    publishedAt: '2026-10-18T07:15:00Z',
    url: 'https://indianexpress.com/article/india/parliament-passes-delimitation-digital-census-framework',
    scope: 'national',
    category: 'political',
    summary:
      'Both Houses of Parliament approved the statutory roadmap establishing the Census 2027 digital self-enumeration portal and a bipartisan commission to balance northern and southern representation post-84th Amendment freeze.',
    fullDigest:
      'The Union Government tabled and enacted the Delimitation Preparedness and Representation Balancing Bill in New Delhi.\n\nKey Provisions & Debate Points:\n• Directs the Registrar General of India to initiate mobile-first self-enumeration in early 2027.\n• Introduces a weighted representation formula safeguarding southern states that achieved total fertility rate (TFR) stabilization.\n• Outlines reserved parliamentary and assembly seat allocations for women under the Nari Shakti Vandan Adhiniyam to take effect concurrently with the delimitation order.',
    examSubject: 'UPSC CSE GS Paper II (Indian Polity & Constitution) / SDSUV BA Pol Sci',
    examRelevance:
      '📌 Exam Relevance (UPSC / UKPSC / BA): Direct topic for UPSC GS-2 & SDSUV BA Political Science (Parliament, 84th & 106th Constitutional Amendments, and Federalism challenges).',
    tags: ['Delimitation', 'Parliament', 'Federalism', 'Census', 'Nari Shakti'],
  },
  {
    id: 'ca-en-nat-eco-01',
    title: 'RBI Monetary Policy Committee Maintains Repo Rate at 6.5%, Forecasts FY27 GDP Growth at 7.2%',
    sourceName: 'LiveMint',
    sourceUrl: 'https://livemint.com',
    publishedAt: '2026-10-17T12:00:00Z',
    url: 'https://livemint.com/economy/rbi-mpc-rates-status-quo-gdp-forecast',
    scope: 'national',
    category: 'economic',
    summary:
      'The Reserve Bank of India’s MPC kept the policy repo rate unchanged at 6.50% for the tenth consecutive cycle, reiterating its "withdrawal of accommodation" stance amidst food price volatility and resilient manufacturing capex.',
    fullDigest:
      'Addressing the media in Mumbai, the RBI Governor delivered the bi-monthly monetary policy statement.\n\nMacroeconomic Indicators Highlighted:\n• Retail inflation (CPI) projected at 4.5% for FY27, within the statutory tolerance band of 4% (+/- 2%).\n• Strong domestic private investment and bank credit growth expanding at 14.8% YoY.\n• Foreign exchange reserves holding strong near record highs at $705 Billion, insulating against currency shocks.\n• Continued expansion in Central Bank Digital Currency (CBDC - e₹) wholesale settlement cross-border pilots.',
    examSubject: 'UPSC CSE GS Paper III (Indian Economy & Banking) / SDSUV BA Economics',
    examRelevance:
      '📌 Exam Relevance (UPSC / UKPSC / BA): Core syllabus area for UPSC GS-3 (Monetary Policy transmission, inflation targeting, headline vs core CPI) and SDSUV BA Economics Paper II.',
    tags: ['RBI', 'Repo Rate', 'Inflation', 'GDP', 'CBDC', 'Monetary Policy'],
  },
  {
    id: 'ca-en-nat-law-01',
    title: 'Supreme Court 9-Judge Constitution Bench Affirms States’ Sovereign Rights to Tax Mineral Lands',
    sourceName: 'The Hindu',
    sourceUrl: 'https://thehindu.com',
    publishedAt: '2026-10-16T15:30:00Z',
    url: 'https://thehindu.com/news/national/sc-9-judge-bench-mineral-tax-judgment',
    scope: 'national',
    category: 'law',
    summary:
      'In a watershed 8-1 majority judgment, the Supreme Court ruled that royalty paid under the MMDR Act is not a tax, upholding the constitutional legislative competence of State Assemblies to levy taxes on mineral-bearing lands under Entry 49 of List II.',
    fullDigest:
      'Delivering one of the most consequential federalism rulings in decades, the Supreme Court settled the 35-year-old dispute originating from the India Cements Ltd. precedent.\n\nSignificance of the Judgment:\n• Clarifies that statutory royalty is a contractual consideration paid to the land owner/state, not an exercise of sovereign taxing power.\n• Empowers resource-rich states (including mineral-bearing tracts in Uttarakhand, Jharkhand, and Odisha) to augment independent fiscal receipts.\n• Affirms the principle of cooperative and asymmetric federalism under the Seventh Schedule.',
    examSubject: 'UPSC CSE GS Paper II (Constitutional Law & Judiciary) / SDSUV BA Pol Sci',
    examRelevance:
      '📌 Exam Relevance (UPSC / UKPSC / BA): Landmark precedent for UPSC GS-2 & SDSUV BA Political Science (Seventh Schedule, Union-State Financial Relations, and Judicial Review).',
    tags: ['Supreme Court', 'Constitution Bench', 'Mineral Tax', 'Federalism', 'Seventh Schedule'],
  },
  {
    id: 'ca-en-nat-edu-01',
    title: 'UGC Issues National Guidelines for Dual-Degree & Interdisciplinary Ph.D. Frameworks',
    sourceName: 'Hindustan Times',
    sourceUrl: 'https://hindustantimes.com',
    publishedAt: '2026-10-15T09:10:00Z',
    url: 'https://hindustantimes.com/education/ugc-dual-degree-interdisciplinary-phd-guidelines',
    scope: 'national',
    category: 'educational',
    summary:
      'The University Grants Commission released updated regulations empowering public universities to offer integrated joint undergraduate-postgraduate pathways and dual-specialization doctoral tracks across humanities and STEM.',
    fullDigest:
      'The UGC Chairperson notified the new higher education modalities aimed at breaking disciplinary silos.\n\nKey Reform Vectors:\n• Undergraduate students can simultaneously pursue an offline BA Major (e.g. Political Science) and an accredited online Minor (e.g. Data Analytics).\n• Credit recognition for internships with panchayats, archaeological survey sites, and heritage conservation societies.\n• Universities permitted to establish lateral mobility pathways for diploma holders under the National Credit Framework (NCrF).',
    examSubject: 'UGC-NET Paper I (Higher Education) / SDSUV BA Sociology & Education',
    examRelevance:
      '📌 Exam Relevance (UPSC / NET / BA): High-yield for UGC NET Paper 1 and university curriculum essays on NEP-2020 pedagogical restructuring and academic flexibility.',
    tags: ['UGC', 'Dual Degree', 'NEP 2020', 'Interdisciplinary', 'Higher Education'],
  },
  {
    id: 'ca-en-nat-tech-01',
    title: 'India Semiconductor Mission: First Commercial 28nm Fab Fabrication Trials Commence in Dholera',
    sourceName: 'The Indian Express',
    sourceUrl: 'https://indianexpress.com',
    publishedAt: '2026-10-14T13:45:00Z',
    url: 'https://indianexpress.com/article/technology/india-semiconductor-mission-dholera-fab-trials',
    scope: 'national',
    category: 'technology',
    summary:
      'India took its decisive leap into advanced hardware manufacturing as test wafer runs started at the Tata-PSMC mega semiconductor facility in Gujarat, supported by ₹76,000 Cr in Central production-linked incentives.',
    fullDigest:
      'Marking a pivotal transition from chip design leadership to domestic silicon fabrication, commercial test packaging and wafer pilot lines went live.\n\nStrategic Milestones:\n• Output geared towards automotive electronics, 5G telecom base stations, and smart energy meters.\n• Over 20,000 engineers trained across Indian Institutes of Technology under the Chips-to-Startup (C2S) program.\n• Boosts India’s positioning in the Quad Semiconductor Supply Chain Initiative.',
    examSubject: 'UPSC CSE GS Paper III (Science & Technology) / Digital India Mission',
    examRelevance:
      '📌 Exam Relevance (UPSC / UKPSC / BA): Vital study for UPSC GS-3 on indigenization of critical technology, strategic self-reliance (Atmanirbhar Bharat), and global supply chains.',
    tags: ['Semiconductors', 'ISM', 'Dholera', 'Quad', 'Atmanirbhar Bharat'],
  },
  {
    id: 'ca-en-nat-env-01',
    title: 'India Crosses 210 GW Renewable Energy Capacity; Solar Rooftop Mission Reaches 5 Million Homes',
    sourceName: 'The Times of India',
    sourceUrl: 'https://timesofindia.indiatimes.com',
    publishedAt: '2026-10-13T10:15:00Z',
    url: 'https://timesofindia.indiatimes.com/india/renewable-energy-milestone-solar-rooftop-homes',
    scope: 'national',
    category: 'environment',
    summary:
      'Ministry of New and Renewable Energy (MNRE) data confirmed that non-fossil sources now constitute 46.5% of total installed power generation capacity, keeping India ahead of its COP26 Glasgow commitments.',
    fullDigest:
      'Reaffirming India’s leadership in the global clean energy transition, the national grid integrated historic volumes of green electrons.\n\nKey Highlights:\n• PM Surya Ghar: Muft Bijli Yojana crossed 5 million residential rooftop solar installations across Tier-2 and rural districts.\n• Battery Energy Storage Systems (BESS) of 12 GWh capacity tendered to resolve grid intermittency.\n• National Green Hydrogen Mission pilot projects for green steel and ammonia transport entered commercial demonstration phase.',
    examSubject: 'UPSC CSE GS Paper III (Environment & Energy) / SDSUV BA Geography',
    examRelevance:
      '📌 Exam Relevance (UPSC / UKPSC / BA): Critical for UPSC GS-3 questions on Panchamrit targets, renewable energy integration, and international climate finance.',
    tags: ['Renewable Energy', 'Solar Rooftop', 'COP26', 'MNRE', 'Green Hydrogen'],
  },

  // --- INTERNATIONAL ---
  {
    id: 'ca-en-int-pol-01',
    title: 'UN General Assembly Adopts Global Pact for the Future, Recommends UNSC Permanent Seat Expansion',
    sourceName: 'BBC News',
    sourceUrl: 'https://bbc.com',
    publishedAt: '2026-10-18T06:00:00Z',
    url: 'https://bbc.com/news/world-un-summit-future-unsc-expansion-pact',
    scope: 'international',
    category: 'political',
    summary:
      'World leaders at the 81st United Nations General Assembly in New York formally endorsed the "Pact for the Future", urging text-based negotiations on UN Security Council structural reforms and representation for developing nations.',
    fullDigest:
      'Following exhaustive multilateral diplomacy, UN member states passed the landmark consensus document.\n\nCore Pillars of the Pact:\n• Explicit call to reform the 15-member UN Security Council by expanding both permanent and non-permanent seats to rectify historical underrepresentation of Africa, Asia, and Latin America.\n• Framework for global AI governance under UN auspices.\n• Recommitment to the Sustainable Development Goals (SDGs) with debt restructuring mechanisms for vulnerable developing economies.',
    examSubject: 'UPSC CSE GS Paper II (International Relations & Global Institutions)',
    examRelevance:
      '📌 Exam Relevance (UPSC GS-II / BA): Essential for UPSC GS-2 & SDSUV BA Political Science Unit V (United Nations System, G4 nations diplomacy, and multilateralism).',
    tags: ['United Nations', 'UNSC Reform', 'Pact for the Future', 'Global South', 'Diplomacy'],
  },
  {
    id: 'ca-en-int-eco-01',
    title: 'IMF World Economic Outlook: Global Inflation Softens to 3.8%; South Asia Leads World Growth',
    sourceName: 'Reuters',
    sourceUrl: 'https://reuters.com',
    publishedAt: '2026-10-17T14:10:00Z',
    url: 'https://reuters.com/business/imf-world-economic-outlook-global-growth-forecast',
    scope: 'international',
    category: 'economic',
    summary:
      'The International Monetary Fund kept global GDP expansion steady at 3.2%, noting that coordinated monetary tightening by major central banks has successfully engineered a soft landing while avoiding systemic recessions.',
    fullDigest:
      'Releasing the flagship report in Washington D.C., the IMF Chief Economist delivered an optimistic yet guarded assessment.\n\nReport Findings:\n• Emerging market and developing economies are driving over 70% of global incremental growth.\n• Geoeconomic fragmentation and retaliatory tariff barriers identified as chief downside risks to cross-border merchandise trade.\n• Debt servicing burdens in low-income countries highlighted, urging the G20 Common Framework to accelerate sovereign debt restructurings.',
    examSubject: 'UPSC CSE GS Paper III (Global Macroeconomics, IMF & WTO Frameworks)',
    examRelevance:
      '📌 Exam Relevance (UPSC GS-III / BA): In-depth analytical reference for UPSC GS-3 on global macroeconomic balance, IMF quota formulas, and post-pandemic economic recovery.',
    tags: ['IMF', 'Global Growth', 'Inflation', 'World Economy', 'G20'],
  },
  {
    id: 'ca-en-int-tech-01',
    title: 'International AI Safety Treaty Signed by 42 Nations: Mandates Open Source Red-Teaming for Frontier Models',
    sourceName: 'BBC News',
    sourceUrl: 'https://bbc.com',
    publishedAt: '2026-10-16T17:25:00Z',
    url: 'https://bbc.com/news/technology-international-ai-safety-treaty-signed',
    scope: 'international',
    category: 'technology',
    summary:
      'Meeting in Geneva, delegates from 42 countries, including India, the US, UK, and EU member states, ratified the first legally binding multilateral treaty establishing standardized safety benchmarks for frontier artificial intelligence models.',
    fullDigest:
      'The Geneva Accord on Advanced Artificial Intelligence establishes international supervisory guardrails.\n\nKey Treaty Mandates:\n• Mandatory independent third-party red-teaming audits before commercial release of models exceeding 10^26 floating-point operations.\n• Strict prohibitions on the deployment of fully autonomous weapon systems lacking human-in-the-loop controls.\n• Creation of a global registry of compute clusters and mutual notification protocols for critical AI cybersecurity vulnerabilities.',
    examSubject: 'UPSC CSE GS Paper III (Frontier Tech, AI Safety Accords & Space Treaties)',
    examRelevance:
      '📌 Exam Relevance (UPSC GS-III / BA): Direct topic for essays and GS-3 questions on global science governance, artificial intelligence ethics, and technological sovereignty.',
    tags: ['AI Safety', 'Geneva Accord', 'Frontier AI', 'Technology Law', 'Cybersecurity'],
  },
  {
    id: 'ca-en-int-env-01',
    title: 'UNFCCC Loss and Damage Fund Operationalizes First $1.2 Billion Disbursement for Small Island States',
    sourceName: 'The Indian Express',
    sourceUrl: 'https://indianexpress.com',
    publishedAt: '2026-10-15T11:40:00Z',
    url: 'https://indianexpress.com/article/world/unfccc-loss-and-damage-fund-first-disbursement',
    scope: 'international',
    category: 'environment',
    summary:
      'In a breakthrough for international climate justice, the World Bank-hosted Board of the Loss and Damage Fund released initial grant allocations to support storm surge resilience and sea-wall construction across Pacific and Caribbean nations.',
    fullDigest:
      'Following agreements struck at recent UN climate summits, the financial architecture designed to compensate nations suffering irreversible climate impacts became fully operational.\n\nSalient Details:\n• First round of non-debt creating grants awarded to Tuvalu, Vanuatu, and Barbados.\n• Developed nations urged to bridge the $100 Billion annual adaptation financing deficit.\n• Establishes rapid parametric insurance triggers tied to satellite storm-track data to speed up relief delivery following natural disasters.',
    examSubject: 'UPSC CSE GS Paper III (UNFCCC, Global Biodiversity & Climate Finance)',
    examRelevance:
      '📌 Exam Relevance (UPSC GS-III / BA): Essential for UPSC GS-3 (Common But Differentiated Responsibilities - CBDR, climate justice, and international environmental treaties).',
    tags: ['Loss and Damage', 'UNFCCC', 'Climate Justice', 'COP', 'World Bank'],
  },
  {
    id: 'ca-en-int-law-01',
    title: 'International Court of Justice Delivers Advisory Opinion on States’ Legal Obligations on Carbon Emissions',
    sourceName: 'The Hindu',
    sourceUrl: 'https://thehindu.com',
    publishedAt: '2026-10-14T16:00:00Z',
    url: 'https://thehindu.com/news/international/icj-historic-advisory-opinion-climate-change',
    scope: 'international',
    category: 'law',
    summary:
      'The ICJ in The Hague ruled that high-emitting nations have a customary international law duty under the UN Convention on the Law of the Sea (UNCLOS) to prevent marine pollution caused by anthropogenic greenhouse gases.',
    fullDigest:
      'Following an initiative spearheaded by Pacific island youth and Vanuatu, the principal judicial organ of the United Nations delivered a landmark advisory opinion.\n\nLegal Takeaways:\n• Affirms that greenhouse gas emissions absorbed by oceans constitute marine pollution under Part XII of UNCLOS.\n• Clarifies that states can be held legally accountable under international law for failure to adopt adequate mitigation measures affecting transboundary ecosystems.\n• Provides legal teeth for future domestic and international climate litigation.',
    examSubject: 'UPSC CSE GS Paper II (International Law, ICJ & Multilateral Treaties)',
    examRelevance:
      '📌 Exam Relevance (UPSC GS-II / BA): Essential legal milestone for UPSC GS-2 (International Court of Justice, customary international law, and UNCLOS treaties).',
    tags: ['ICJ', 'UNCLOS', 'International Law', 'Climate Litigation', 'The Hague'],
  },
  {
    id: 'ca-en-int-edu-01',
    title: 'UNESCO Global Education Report: Digital Literacy Disparities Persist Between Global North & South',
    sourceName: 'BBC News',
    sourceUrl: 'https://bbc.com',
    publishedAt: '2026-10-13T09:30:00Z',
    url: 'https://bbc.com/news/education-unesco-global-monitoring-report-digital-divide',
    scope: 'international',
    category: 'educational',
    summary:
      'UNESCO’s annual Global Education Monitoring Report cautioned that uncritical adoption of educational technologies risks exacerbating socioeconomic inequalities unless accompanied by public broadband access and teacher training.',
    fullDigest:
      'Presented at UNESCO headquarters in Paris, the comprehensive report evaluated post-pandemic hybrid learning models worldwide.\n\nKey Insights:\n• Over 450 million school-aged children globally remain entirely disconnected from high-speed learning platforms.\n• Recommends prioritizing open-source digital public goods and public digital repositories (such as India’s DIKSHA & Samarth) as global best practices.\n• Urges member states to guarantee children’s biometric and behavioral data privacy in edtech applications.',
    examSubject: 'UPSC CSE GS Paper II (Social Justice, Education & UNESCO) / BA Sociology',
    examRelevance:
      '📌 Exam Relevance (UPSC / BA): Direct fodder for UPSC GS-2 (Social Justice, Human Resource Development, Digital Divide) and SDSUV BA Sociology examination papers.',
    tags: ['UNESCO', 'Digital Divide', 'Education Report', 'EdTech', 'Social Justice'],
  },
];

// Curated comprehensive dataset (Hindi)
export const CURATED_CURRENT_AFFAIRS_HI: CurrentAffairsItem[] = [
  // --- UTTARAKHAND STATE (HINDI) ---
  {
    id: 'ca-hi-uk-env-01',
    title: 'उत्तराखंड कैबिनेट ने 18 संवेदनशील हिमनद झीलों में पूर्व चेतावनी टेलीमेट्री प्रणाली को दी ₹320 करोड़ की मंजूरी',
    sourceName: 'अमर उजाला (Amar Ujala)',
    sourceUrl: 'https://amarujala.com',
    publishedAt: '2026-10-18T08:30:00Z',
    url: 'https://amarujala.com/uttarakhand/dehradun/telemetry-early-warning-system-approved-for-18-glacial-lakes',
    scope: 'uttarakhand',
    category: 'environment',
    summary:
      'उत्तराखंड राज्य आपदा प्रबंधन प्राधिकरण (USDMA) और वाडिया हिमालय भूविज्ञान संस्थान मिलकर चमोली और पिथौरागढ़ की अतिसंवेदनशील झीलों में स्वचालित जलस्तर सेंसर और सैटेलाइट टेलीमेट्री स्थापित कर रहे हैं।',
    fullDigest:
      'ग्लेशियल लेक आउटबर्स्ट फ्लड (GLOF) के खतरों से राज्य को सुरक्षित करने के लिए उत्तराखंड सरकार ने देहरादून में ₹320 करोड़ के हाई-टेक प्रोजेक्ट को हरी झंडी दिखाई।\n\nयोजना के मुख्य बिंदु:\n• वसुंधरा ताल और अलकनंदा-धौलीगंगा बेसिन की 18 हिमनद झीलों को सोलर आधारित सिंथेटिक एपर्चर रडार और जल-दबाव सेंसर से जोड़ा जा रहा है।\n• वास्तविक समय (रियल टाइम) का डेटा देहरादून स्थित राज्य आपातकालीन परिचालन केंद्र (SEOC) को 24x7 प्राप्त होगा।\n• झीलों के नीचे 80 किमी के दायरे में आने वाले सभी गांवों में ऑटोमैटिक हूटर और सायरन लगाए गए हैं ताकि 45 मिनट पहले सुरक्षित निकासी सुनिश्चित हो सके।',
    examSubject: 'एसडीएसयूवी बीए भूगोल इकाई IV / यूकेपीएससी पेपर-4 (आपदा प्रबंधन)',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): यूकेपीएससी मुख्य परीक्षा पेपर 4 (आपदा प्रबंधन) एवं एसडीएसयूवी बीए भूगोल इकाई 4 (हिमालयी भू-आकृति एवं प्राकृतिक आपदाएं) के लिए अति-महत्वपूर्ण प्रश्न।',
    tags: ['GLOF', 'आपदा प्रबंधन', 'वाडिया संस्थान', 'चमोली', 'देहरादून'],
  },
  {
    id: 'ca-hi-uk-pol-01',
    title: 'उत्तराखंड समान नागरिक संहिता (UCC) नियमावली अधिसूचित: 13 जिलों में डिजिटल पंजीकरण पोर्टल शुरू',
    sourceName: 'दैनिक जागरण (Dainik Jagran)',
    sourceUrl: 'https://jagran.com',
    publishedAt: '2026-10-17T11:15:00Z',
    url: 'https://jagran.com/uttarakhand/dehradun-city/uttarakhand-uniform-civil-code-rules-notified',
    scope: 'uttarakhand',
    category: 'political',
    summary:
      'उत्तराखंड शासन ने राज्य में समान नागरिक संहिता की प्रशासनिक नियमावली राजपत्र में प्रकाशित कर दी है। इसके तहत विवाह, उत्तराधिकार एवं लिव-इन संबंधों का अनिवार्य पंजीकरण तहसील व ग्राम पंचायत स्तर पर होगा।',
    fullDigest:
      'समान नागरिक संहिता विधेयक पर राष्ट्रपति की स्वीकृति के पश्चात देहरादून में उच्चस्तरीय समिति की अनुशंसित नियमावली लागू कर दी गई है।\n\nप्रमुख प्रशासनिक प्रावधान:\n• ग्राम पंचायत और तहसील स्तर पर डिजिटल पोर्टल द्वारा 30 दिनों के भीतर विवाह एवं लिव-इन संबंधों का पंजीकरण अनिवार्य किया गया है।\n• सभी धर्मों के नागरिकों के लिए पुत्र और पुत्री दोनों को पैतृक संपत्ति में पूर्ण रूप से समान उत्तराधिकार का अधिकार।\n• बहुविवाह और गैर-न्यायिक तलाक प्रथाओं को पूर्णतया गैरकानूनी घोषित किया गया है।\n• भारतीय संविधान की 5वीं अनुसूची के अंतर्गत अनुसूचित जनजातियों को इस कानून के दायरे से छूट प्रदान की गई है।',
    examSubject: 'यूकेपीएससी मुख्य परीक्षा जीएस-2 / बीए राजनीति विज्ञान (इकाई 3)',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): संविधान के अनुच्छेद 44 (राज्य के नीति निदेशक तत्व), समवर्ती सूची में राज्य की विधायी शक्ति एवं नागरिक अधिकारों से जुड़ा सीधा प्रश्न।',
    tags: ['UCC', 'अनुच्छेद 44', 'समान नागरिक संहिता', 'देहरादून', 'शासन'],
  },
  {
    id: 'ca-hi-uk-eco-01',
    title: 'उत्तराखंड होमस्टे नीति 2026: पर्वतीय जनपदों में पारंपरिक होमस्टे पर 40% पूंजीगत सब्सिडी',
    sourceName: 'लाइव हिंदुस्तान (LiveHindustan)',
    sourceUrl: 'https://livehindustan.com',
    publishedAt: '2026-10-16T09:45:00Z',
    url: 'https://livehindustan.com/uttarakhand/dehradun/uttarakhand-homestay-policy-update-millet-tourism',
    scope: 'uttarakhand',
    category: 'economic',
    summary:
      'पौड़ी, टिहरी और अल्मोड़ा जैसे पर्वतीय जनपदों से युवाओं के पलायन को रोकने के लिए राज्य सरकार ने पारंपरिक काष्ठ शैली के होमस्टे और जैविक श्रीअन्न (मिल्लेट्स) आधारित पर्यटन को बढ़ावा देने हेतु विशेष सब्सिडी योजना लागू की है।',
    fullDigest:
      'उत्तराखंड पर्यटन एवं वित्त विभाग द्वारा पर्वतीय पुनरुद्धार नीति की घोषणा की गई।\n\nनीति की प्रमुख विशेषताएं:\n• पुश्तैनी पहाड़ी शैली के भवनों को ईको-होमस्टे में बदलने पर ₹15 लाख तक की अधिकतम 40% वित्तीय सहायता।\n• कौशल विकास मिशन के तहत पंजीकृत युवाओं को स्टांप शुल्क में शत-प्रतिशत छूट।\n• होमस्टे में मंडुआ, झंगोरा और गहत दाल जैसे स्थानीय पहाड़ी व्यंजनों को परोसने पर अतिरिक्त प्रोत्साहन राशि।\n• आगामी तीन वित्तीय वर्षों में 75,000 ग्रामीण युवाओं को स्वरोजगार उपलब्ध कराने का लक्ष्य।',
    examSubject: 'यूकेपीएससी पेपर-5 (उत्तराखंड अर्थव्यवस्था) / बीए अर्थशास्त्र',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): यूकेपीएससी सामान्य अध्ययन पेपर 5 (उत्तराखंड की अर्थव्यवस्था, पलायन रोकथाम एवं सतत पर्यटन विकास) हेतु अत्यंत उपयोगी केस स्टडी।',
    tags: ['होमस्टे', 'पलायन रोकथाम', 'उत्तराखंड अर्थव्यवस्था', 'पर्यटन', 'अल्मोड़ा'],
  },
  {
    id: 'ca-hi-uk-edu-01',
    title: 'श्री देव सुमन उत्तराखंड विवि (SDSUV) ने 120 महाविद्यालयों में समर्थ पोर्टल पर क्रेडिट ट्रांसफर किया अनिवार्य',
    sourceName: 'अमर उजाला (Amar Ujala)',
    sourceUrl: 'https://amarujala.com',
    publishedAt: '2026-10-15T14:20:00Z',
    url: 'https://amarujala.com/uttarakhand/education/sdsuv-samarth-portal-academic-bank-of-credits-rollout',
    scope: 'uttarakhand',
    category: 'educational',
    summary:
      'एसडीएसयूवी ने एनईपी-2020 के तहत सभी 120+ संबद्ध महाविद्यालयों में डिजीलॉकर आधारित एकेडमिक बैंक ऑफ क्रेडिट्स (ABC) प्रणाली का सफल एकीकरण किया है, जिससे छात्रों का क्रेडिट ट्रांसफर आसान होगा।',
    fullDigest:
      'उच्च शिक्षा विभाग उत्तराखंड के तत्वावधान में श्री देव सुमन विश्वविद्यालय ने ऐतिहासिक शैक्षणिक सुधार लागू किए।\n\nशैक्षणिक सुधार की रूपरेखा:\n• 85,000 से अधिक स्नातक (BA/BSc) छात्रों का समर्थ पोर्टल पर त्वरित सत्यापन व डिजिटल मार्कशीट अपलोड।\n• कुमाऊं विश्वविद्यालय व शोभन सिंह जीना विवि के बीच छात्रों को अंतर-विश्वविद्यालय क्रेडिट स्थानांतरण की सुविधा।\n• हिमालयी पारिस्थितिकी, लोक कला और गढ़वाली/कुमाऊंनी भाषा के कौशल पाठ्यक्रमों को मुख्य पाठ्यक्रम में शामिल किया गया।',
    examSubject: 'एसडीएसयूवी बीए शिक्षाशास्त्र / एनईपी 2020 राज्य क्रियान्वयन',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): एसडीएसयूवी बीए परीक्षा हेतु राष्ट्रीय शिक्षा नीति (NEP-2020) के 4-वर्षीय स्नातक ढांचे और राज्य उच्च शिक्षा सुधारों से प्रत्यक्ष जुड़ाव।',
    tags: ['SDSUV', 'समर्थ पोर्टल', 'NEP 2020', 'उच्च शिक्षा', 'टिहरी'],
  },
  {
    id: 'ca-hi-uk-law-01',
    title: 'नैनीताल हाईकोर्ट का कड़ा निर्देश: मसूरी एवं नैनीताल की वहन क्षमता (Carrying Capacity) का वैज्ञानिक ऑडिट हो',
    sourceName: 'दैनिक जागरण (Dainik Jagran)',
    sourceUrl: 'https://jagran.com',
    publishedAt: '2026-10-14T10:00:00Z',
    url: 'https://jagran.com/uttarakhand/nainital/high-court-mandates-carrying-capacity-audit-for-hill-towns',
    scope: 'uttarakhand',
    category: 'law',
    summary:
      'उत्तराखंड उच्च न्यायालय की खंडपीठ ने नीरी (NEERI), आईआईटी रुड़की और वाडिया संस्थान के वैज्ञानिकों को निर्देश दिया है कि वे मसूरी और नैनीताल के संवेदनशील ढलानों पर निर्माण व पर्यटकों की अधिकतम सीमा तय करें।',
    fullDigest:
      'पर्वतीय नगरों में लगातार हो रहे भूधंसाव और अनियंत्रित यातायात पर संज्ञान लेते हुए उच्च न्यायालय ने ऐतिहासिक आदेश दिए।\n\nअदालत के निर्देश:\n• जब तक वैज्ञानिक रिपोर्ट प्रस्तुत नहीं हो जाती, तब तक प्रमुख नगर क्षेत्रों में बहुमंजिला व्यावसायिक भवनों के नए नक्शों पर रोक।\n• सप्ताहांत पर मसूरी-नैनीताल आने वाले निजी वाहनों के लिए ऑनलाइन पूर्व-पंजीकरण व्यवस्था लागू की जाए।\n• जॉर्ज एवरेस्ट और माल रोड के आसपास के भूगर्भीय ढांचों की नियमित निगरानी की जाए।',
    examSubject: 'यूकेपीएससी सिविल जज एवं मुख्य परीक्षा जीएस-2 / विधिक अध्ययन',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): यूकेपीएससी मुख्य परीक्षा पेपर 2 (न्यायिक सक्रियता एवं पर्यावरण संरक्षण न्यायशास्त्र) तथा बीए राजनीति विज्ञान के लिए महत्वपूर्ण।',
    tags: ['नैनीताल हाईकोर्ट', 'वहन क्षमता', 'मसूरी', 'पर्यावरण विधि'],
  },
  {
    id: 'ca-hi-uk-tech-01',
    title: 'ऋषिकेश-कर्णप्रयाग रेल परियोजना: 14.5 किमी लंबी देश की सबसे बड़ी एस्केप टनल की खुदाई पूरी',
    sourceName: 'अमर उजाला (Amar Ujala)',
    sourceUrl: 'https://amarujala.com',
    publishedAt: '2026-10-13T16:30:00Z',
    url: 'https://amarujala.com/uttarakhand/dehradun/rishikesh-karnaprayag-railway-tunnel-12-breakthrough-completed',
    scope: 'uttarakhand',
    category: 'technology',
    summary:
      'रेल विकास निगम लिमिटेड (RVNL) ने श्रीनगर गढ़वाल से देवप्रयाग के बीच टनल 12 का अंतिम ब्रेकथ्रू सफलतापूर्वक हासिल किया। इसमें आधुनिक न्यू ऑस्ट्रियन टनलिंग मेथड (NATM) तकनीक का इस्तेमाल किया गया है।',
    fullDigest:
      '125 किमी लंबी ऋषिकेश-कर्णप्रयाग ब्रॉडगेज रेल लाइन सामरिक और चारधाम कनेक्टिविटी के लिहाज से नए युग में प्रवेश कर गई है।\n\nपरियोजना की तकनीकी उपलब्धियां:\n• कुल 125 किमी में से 104 किमी हिस्सा 16 गहरी सुरंगों से होकर गुजरेगा, जो हिमालय के मेन सेंट्रल थ्रस्ट (MCT) को पार करती हैं।\n• सुरंगों में भूकंपीय तरंगों की रियल टाइम निगरानी हेतु फाइबर ऑप्टिक सेंसर लगाए गए हैं।\n• रेल लाइन पूरी होने पर ऋषिकेश से कर्णप्रयाग का सफर 7 घंटे से घटकर मात्र 2.5 घंटे रह जाएगा।',
    examSubject: 'यूकेपीएससी जीएस पेपर-6 (पर्वतीय क्षेत्रों में विज्ञान व बुनियादी ढांचा)',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UKPSC / SDSUV BA): यूकेपीएससी पेपर 6 (विज्ञान एवं प्रौद्योगिकी, इंजीनियरिंग भूविज्ञान एवं सीमांत कनेक्टिविटी) हेतु अत्यंत महत्वपूर्ण समसामयिकी।',
    tags: ['RVNL', 'कर्णप्रयाग रेलवे', 'NATM', 'श्रीनगर गढ़वाल', 'इंजीनियरिंग'],
  },

  // --- NATIONAL (INDIA) (HINDI) ---
  {
    id: 'ca-hi-nat-pol-01',
    title: 'संसद ने परिसीमन तैयारी विधेयक पारित किया: 2027 की डिजिटल जनगणना के बाद गठित होगा नया परिसीमन आयोग',
    sourceName: 'जनसत्ता (Jansatta)',
    sourceUrl: 'https://jansatta.com',
    publishedAt: '2026-10-18T07:15:00Z',
    url: 'https://jansatta.com/national/parliament-passes-delimitation-bill-digital-census',
    scope: 'national',
    category: 'political',
    summary:
      'संसद के दोनों सदनों ने परिसीमन तैयारी विधेयक को मंजूरी दे दी। इसमें वर्ष 2027 में होने वाली पहली पूर्ण डिजिटल जनगणना और जनसंख्या नियंत्रण करने वाले राज्यों के हितों की रक्षा हेतु विशेष संतुलन सूत्र शामिल हैं।',
    fullDigest:
      'नई दिल्ली में संसद के दोनों सदनों द्वारा पारित परिसीमन विधेयक भारतीय संघवाद के इतिहास में महत्वपूर्ण मोड़ सिद्ध होगा।\n\nविधेयक के मुख्य बिंदु:\n• भारत के महारजिस्ट्रार 2027 के प्रारंभ में मोबाइल आधारित डिजिटल स्व-गणना शुरू करेंगे।\n• दक्षिण भारतीय राज्यों के प्रतिनिधित्व को सुरक्षित रखने के लिए विशेष भारांक (Weighted Formula) तय किया जाएगा।\n• नारी शक्ति वंदन अधिनियम के तहत लोकसभा एवं राज्य विधानसभाओं में 33% महिला आरक्षण नए परिसीमन के साथ ही लागू होगा।',
    examSubject: 'यूपीएससी जीएस-2 (भारतीय संविधान एवं शासन) / बीए राजनीति विज्ञान',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC / UKPSC / BA): संघ लोक सेवा आयोग मुख्य परीक्षा GS-2 तथा बीए राजनीति विज्ञान (84वां एवं 106वां संविधान संशोधन, परिसीमन आयोग एवं संघवाद की चुनौतियां) से संबद्ध।',
    tags: ['परिसीमन', 'संसद', 'जनगणना 2027', 'नारी शक्ति वंदन', 'संघवाद'],
  },
  {
    id: 'ca-hi-nat-eco-01',
    title: 'आरबीआई मौद्रिक नीति समिति ने रेपो दर 6.5% पर स्थिर रखी; वित्त वर्ष 2027 में 7.2% जीडीपी वृद्धि का अनुमान',
    sourceName: 'लाइव हिंदुस्तान (LiveHindustan)',
    sourceUrl: 'https://livehindustan.com',
    publishedAt: '2026-10-17T12:00:00Z',
    url: 'https://livehindustan.com/business/rbi-monetary-policy-repo-rate-unchanged-gdp-forecast',
    scope: 'national',
    category: 'economic',
    summary:
      'भारतीय रिज़र्व बैंक की एमपीसी ने नीतिगत रेपो दर में कोई बदलाव न करते हुए इसे 6.5% पर बनाए रखा है। मजबूत घरेलू मांग, पूंजीगत व्यय और विनिर्माण वृद्धि के आधार पर विकास दर 7.2% रहने का अनुमान लगाया गया है।',
    fullDigest:
      'मुंबई में द्विमासिक मौद्रिक नीति समीक्षा की घोषणा करते हुए आरबीआई गवर्नर ने देश के आर्थिक स्थायित्व पर विश्वास जताया।\n\nमुख्य आर्थिक संकेतक:\n• खुदरा महंगाई (CPI) का अनुमान 4.5% रखा गया है, जो 4% (+/- 2%) के वैधानिक लक्ष्य के अनुकूल है।\n• बैंक ऋण उठाव में सालाना 14.8% की दर से वृद्धि दर्ज की गई है, जो निजी निवेश में गति का प्रतीक है।\n• देश का विदेशी मुद्रा भंडार $705 अरब के मजबूत स्तर पर बना हुआ है, जो बाह्य वित्तीय झटकों से सुरक्षा देता है।\n• डिजिटल रुपया (CBDC - e₹) के सीमा-पार थोक लेनदेन परीक्षणों का दायरा बढ़ाया जा रहा है।',
    examSubject: 'यूपीएससी जीएस-3 (भारतीय अर्थव्यवस्था व मौद्रिक नीति) / बीए अर्थशास्त्र',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC / UKPSC / BA): यूपीएससी जीएस-3 एवं बीए अर्थशास्त्र प्रश्नपत्र 2 (आरबीआई मौद्रिक नीति, रेपो दर ट्रांसमिशन, मुद्रास्फीति नियंत्रण एवं बैंकिंग व्यवस्था) हेतु अनिवार्य टॉपिक।',
    tags: ['RBI', 'रेपो रेट', 'जीडीपी', 'महंगाई', 'डिजिटल रुपया', 'अर्थव्यवस्था'],
  },
  {
    id: 'ca-hi-nat-law-01',
    title: 'सुप्रीम कोर्ट की 9 जजों की संविधान पीठ का ऐतिहासिक फैसला: राज्यों को खनिज भूमि पर कर लगाने का संप्रभु अधिकार',
    sourceName: 'नवभारत टाइम्स (Navbharat Times)',
    sourceUrl: 'https://navbharattimes.indiatimes.com',
    publishedAt: '2026-10-16T15:30:00Z',
    url: 'https://navbharattimes.indiatimes.com/india/supreme-court-historic-judgment-on-states-mineral-tax-rights',
    scope: 'national',
    category: 'law',
    summary:
      'सर्वोच्च न्यायालय की 9-न्यायाधीशों की संविधान पीठ ने 8-1 के बहुमत से निर्णय सुनाया कि एमएमडीआर एक्ट के तहत देय रॉयल्टी कोई टैक्स नहीं है, अतः राज्य विधानसभाओं को संविधान की सूची II प्रविष्टि 49 के तहत खनिज भूमि पर कर लगाने का पूर्ण अधिकार है।',
    fullDigest:
      '35 वर्ष पुराने विवाद का निपटारा करते हुए मुख्य न्यायाधीश की अध्यक्षता वाली पीठ ने संघवाद की दिशा में युगांतकारी निर्णय दिया।\n\nफैसले का महत्व:\n• रॉयल्टी को जमीन के मालिक को मिलने वाला संविदात्मक प्रतिफल माना गया है, न कि संप्रभु कर शक्ति का प्रयोग।\n• खनिज समृद्ध राज्यों (उत्तराखंड, झारखंड, ओडिशा आदि) को अपने वित्तीय संसाधन और राजस्व बढ़ाने की अभूतपूर्व स्वायत्तता मिली।\n• संविधान की 7वीं अनुसूची के अंतर्गत सहकारी व राजकोषीय संघवाद के सिद्धांत को सुदृढ़ किया गया।',
    examSubject: 'यूपीएससी जीएस-2 (संवैधानिक न्यायशास्त्र) / बीए राजनीति विज्ञान',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC / UKPSC / BA): यूपीएससी जीएस-2 एवं बीए राजनीति विज्ञान (7वीं अनुसूची, केंद्र-राज्य वित्तीय संबंध, सर्वोच्च न्यायालय के संविधान पीठ के फैसले) हेतु लैंडमार्क केस।',
    tags: ['सुप्रीम कोर्ट', 'संविधान पीठ', 'खनिज कर', 'संघवाद', '7वीं अनुसूची'],
  },
  {
    id: 'ca-hi-nat-edu-01',
    title: 'यूजीसी ने जारी किए संयुक्त डिग्री एवं अंतर-विषयक पीएचडी के नए दिशानिर्देश',
    sourceName: 'अमर उजाला (Amar Ujala)',
    sourceUrl: 'https://amarujala.com',
    publishedAt: '2026-10-15T09:10:00Z',
    url: 'https://amarujala.com/education/ugc-issues-guidelines-for-dual-degree-and-interdisciplinary-phd',
    scope: 'national',
    category: 'educational',
    summary:
      'विश्वविद्यालय अनुदान आयोग (UGC) ने विश्वविद्यालयों को एक साथ दोहरी डिग्री (Dual Degree) और कला व विज्ञान के विषयों को मिलाकर शोध (Ph.D.) कराने की वैधानिक अनुमति प्रदान कर दी है।',
    fullDigest:
      'यूजीसी अध्यक्ष ने नई शिक्षा नीति 2020 की सिफारिशों को लागू करते हुए नई नियमावली जारी की।\n\nसुधारों की मुख्य बातें:\n• स्नातक छात्र एक नियमित बीए मेजर (जैसे राजनीति विज्ञान) के साथ डिजिटल माध्यम से प्रमाणित माइनर कोर्स (जैसे डेटा एनालिसिस) कर सकेंगे।\n• पंचायतों, पुरातात्विक स्थलों और हेरिटेज संरक्षण केंद्रों में की गई इंटर्नशिप को अकादमिक क्रेडिट्स में बदला जाएगा।\n• राष्ट्रीय क्रेडिट फ्रेमवर्क (NCrF) के तहत डिप्लोमा धारकों को डिग्री में सीधे लेटरल एंट्री का विकल्प मिलेगा।',
    examSubject: 'यूजीसी नेट पेपर-1 (उच्च शिक्षा प्रणाली) / बीए समाजशास्त्र',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC / NET / BA): यूजीसी-नेट पेपर 1 (उच्च शिक्षा तंत्र) तथा बीए समाजशास्त्र/शिक्षाशास्त्र के लिए एनईपी-2020 के बहु-विषयक सुधारों से सीधा जुड़ाव।',
    tags: ['UGC', 'दोहरी डिग्री', 'NEP 2020', 'उच्च शिक्षा', 'नेट परीक्षा'],
  },
  {
    id: 'ca-hi-nat-tech-01',
    title: 'इंडिया सेमीकंडक्टर मिशन: धोलेरा में 28nm चिप्स का पहला कमर्शियल ट्रायल फैब्रिकेशन शुरू',
    sourceName: 'दैनिक जागरण (Dainik Jagran)',
    sourceUrl: 'https://jagran.com',
    publishedAt: '2026-10-14T13:45:00Z',
    url: 'https://jagran.com/technology/tech-news-india-semiconductor-mission-dholera-fab-trials',
    scope: 'national',
    category: 'technology',
    summary:
      'भारत ने हार्डवेयर विनिर्माण के क्षेत्र में ऐतिहासिक कदम उठाते हुए गुजरात के धोलेरा में टाटा-पीएसएमसी चिप संयंत्र में टेस्ट वेफर उत्पादन शुरू कर दिया है। इसे केंद्र सरकार की ₹76,000 करोड़ की पीएलआई योजना का सहयोग प्राप्त है।',
    fullDigest:
      'चिप डिजाइनिंग में अपनी वैश्विक धाक जमाने के बाद अब भारत ने चिप निर्माण (फैब्रिकेशन) के क्षेत्र में ठोस कदम रख दिया है।\n\nरणनीतिक लाभ:\n• उत्पादित चिप्स का उपयोग ऑटोमोबाइल, 5G दूरसंचार उपकरण और स्मार्ट मीटर में किया जाएगा।\n• चिप्स-टू-स्टार्टअप (C2S) योजना के तहत 20,000 भारतीय इंजीनियरों को सेमीकंडक्टर फैब्रिकेशन में प्रशिक्षित किया गया है।\n• क्वाड देशों (Quad) की सेमीकंडक्टर आपूर्ति श्रृंखला में भारत की स्थिति सशक्त होगी।',
    examSubject: 'यूपीएससी जीएस-3 (विज्ञान व तकनीकी) / डिजिटल इंडिया मिशन',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC / UKPSC / BA): यूपीएससी जीएस-3 (क्रिटिकल टेक्नोलॉजी, आत्मनिर्भर भारत अभियान, सेमीकंडक्टर हब एवं वैश्विक आपूर्ति श्रृंखला) हेतु मुख्य बिंदु।',
    tags: ['सेमीकंडक्टर', 'धोलेरा', 'टाटा फैब', 'आत्मनिर्भर भारत', 'तकनीक'],
  },
  {
    id: 'ca-hi-nat-env-01',
    title: 'भारत में गैर-जीवाश्म ऊर्जा क्षमता 210 गीगावाट पार; पीएम सूर्य घर योजना से 50 लाख घरों पर लगे सोलर पैनल',
    sourceName: 'लाइव हिंदुस्तान (LiveHindustan)',
    sourceUrl: 'https://livehindustan.com',
    publishedAt: '2026-10-13T10:15:00Z',
    url: 'https://livehindustan.com/national/renewable-energy-milestone-pm-surya-ghar-50-lakh-homes',
    scope: 'national',
    category: 'environment',
    summary:
      'नवीन एवं नवीकरणीय ऊर्जा मंत्रालय के आंकड़ों के अनुसार भारत की कुल स्थापित बिजली क्षमता में गैर-जीवाश्म ऊर्जा की हिस्सेदारी 46.5% हो गई है, जिससे भारत कॉप-26 के लक्ष्यों से आगे चल रहा है।',
    fullDigest:
      'स्वच्छ ऊर्जा परिवर्तन में भारत ने वैश्विक पटल पर पुनः अपनी नेतृत्वकारी भूमिका सिद्ध की है।\n\nप्रमुख उपलब्धियां:\n• पीएम सूर्य घर: मुफ्त बिजली योजना के अंतर्गत देश के टियर-2 शहरों एवं ग्रामीण क्षेत्रों में 50 लाख से अधिक घरों की छतों पर सोलर सिस्टम स्थापित किए जा चुके हैं।\n• ग्रिड की स्थिरता के लिए 12 GWh क्षमता की बैटरी ऊर्जा भंडारण प्रणाली (BESS) के टेंडर जारी किए गए।\n• राष्ट्रीय हरित हाइड्रोजन मिशन के अंतर्गत ग्रीन स्टील और हरित अमोनिया परिवहन के पायलट प्रोजेक्ट वाणिज्यिक चरण में पहुंचे।',
    examSubject: 'यूपीएससी जीएस-3 (पर्यावरण एवं ऊर्जा) / बीए भूगोल',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC / UKPSC / BA): यूपीएससी जीएस-3 (पंचामृत लक्ष्य, नवीकरणीय ऊर्जा, जलवायु परिवर्तन अनुकूलन) एवं बीए भूगोल के लिए महत्वपूर्ण आंकड़े।',
    tags: ['नवीकरणीय ऊर्जा', 'सोलर पैनल', 'कॉप 26', 'ग्रीन हाइड्रोजन', 'पर्यावरण'],
  },

  // --- INTERNATIONAL (HINDI) ---
  {
    id: 'ca-hi-int-pol-01',
    title: 'संयुक्त राष्ट्र महासभा ने "पैक्ट फॉर द फ्यूचर" को दी मंजूरी, सुरक्षा परिषद (UNSC) में विस्तार की सिफारिश',
    sourceName: 'बीबीसी हिंदी (BBC Hindi)',
    sourceUrl: 'https://bbc.com/hindi',
    publishedAt: '2026-10-18T06:00:00Z',
    url: 'https://bbc.com/hindi/international-un-general-assembly-pact-for-future-unsc-reforms',
    scope: 'international',
    category: 'political',
    summary:
      'न्यूयॉर्क में संयुक्त राष्ट्र महासभा के 81वें सत्र में विश्व नेताओं ने सर्वसम्मति से "पैक्ट फॉर द फ्यूचर" प्रस्ताव पारित किया। इसमें यूएन सुरक्षा परिषद में स्थायी व अस्थायी सीटों के विस्तार पर ठोस बातचीत का आह्वान किया गया है।',
    fullDigest:
      'गहन बहुपक्षीय वार्ता के उपरांत संयुक्त राष्ट्र के सदस्य देशों ने इस ऐतिहासिक दस्तावेज को अंगीकार किया।\n\nदस्तावेज के मुख्य स्तम्भ:\n• 15 सदस्यीय सुरक्षा परिषद में भारत, अफ्रीका और लैटिन अमेरिका जैसे विकासशील क्षेत्रों को स्थायी सदस्यता देने की आवश्यकता पर बल।\n• संयुक्त राष्ट्र के तत्वावधान में वैश्विक कृत्रिम बुद्धिमत्ता (AI) नियमन की रूपरेखा तय करना।\n• सतत विकास लक्ष्यों (SDGs) की प्राप्ति हेतु ऋण संकट से जूझ रहे देशों के लिए विशेष वित्तीय सहायता ढांचा तैयार करना।',
    examSubject: 'यूपीएससी जीएस-2 (अंतर्राष्ट्रीय संबंध एवं संधियां) / बीए राजनीति विज्ञान',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC GS-2 / BA): यूपीएससी मुख्य परीक्षा GS-2 तथा बीए राजनीति विज्ञान इकाई 5 (संयुक्त राष्ट्र सुधार, जी-4 समूह की कूटनीति, ग्लोबल साउथ एवं बहुपक्षवाद) हेतु अत्यंत प्रासंगिक।',
    tags: ['संयुक्त राष्ट्र', 'UNSC सुधार', 'पैक्ट फॉर फ्यूचर', 'ग्लोबल साउथ', 'कूटनीति'],
  },
  {
    id: 'ca-hi-int-eco-01',
    title: 'आईएमएफ विश्व आर्थिक परिदृश्य: वैश्विक मुद्रास्फीति घटकर 3.8% पर आई; दक्षिण एशिया दुनिया में सबसे तेज गति से बढ़ता क्षेत्र',
    sourceName: 'बीबीसी हिंदी (BBC Hindi)',
    sourceUrl: 'https://bbc.com/hindi',
    publishedAt: '2026-10-17T14:10:00Z',
    url: 'https://bbc.com/hindi/business-imf-world-economic-outlook-global-growth',
    scope: 'international',
    category: 'economic',
    summary:
      'अंतर्राष्ट्रीय मुद्रा कोष (IMF) ने वैश्विक आर्थिक वृद्धि का अनुमान 3.2% पर स्थिर रखा है। रिपोर्ट में कहा गया है कि केंद्रीय बैंकों के कड़े नीतिगत कदमों से वैश्विक मंदी टल गई है और महंगाई पर नियंत्रण संभव हुआ है।',
    fullDigest:
      'वाशिंगटन डीसी में जारी रिपोर्ट में आईएमएफ ने वैश्विक अर्थव्यवस्था का संतुलित विश्लेषण प्रस्तुत किया।\n\nरिपोर्ट के निष्कर्ष:\n• उभरते बाजार और विकासशील देश वैश्विक विकास में 70% से अधिक योगदान दे रहे हैं।\n• भू-राजनीतिक विखंडन और व्यापारिक बाधाएं अंतर्राष्ट्रीय व्यापार के लिए मुख्य चुनौती बनी हुई हैं।\n• कम आय वाले देशों पर बढ़ते कर्ज के बोझ को कम करने के लिए जी20 कॉमन फ्रेमवर्क के तहत ऋण पुनर्गठन में तेजी लाने का आग्रह किया गया।',
    examSubject: 'यूपीएससी जीएस-3 (वैश्विक व्यापार व आईएमएफ) / बीए अर्थशास्त्र',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC GS-3 / BA): यूपीएससी मुख्य परीक्षा सामान्य अध्ययन 3 (वैश्विक वृहद-अर्थव्यवस्था, आईएमएफ कोटा प्रणाली एवं अंतर्राष्ट्रीय व्यापार चुनौतियां) के लिए आवश्यक आंकड़े।',
    tags: ['IMF', 'वैश्विक अर्थव्यवस्था', 'मुद्रास्फीति', 'दक्षिण एशिया', 'G20'],
  },
  {
    id: 'ca-hi-int-tech-01',
    title: '42 देशों ने पहले अंतर्राष्ट्रीय एआई सुरक्षा समझौते पर किए हस्ताक्षर: फ्रंटियर मॉडल्स की अनिवार्य जांच तय',
    sourceName: 'बीबीसी हिंदी (BBC Hindi)',
    sourceUrl: 'https://bbc.com/hindi',
    publishedAt: '2026-10-16T17:25:00Z',
    url: 'https://bbc.com/hindi/science-international-ai-safety-treaty-signed-geneva',
    scope: 'international',
    category: 'technology',
    summary:
      'जिनेवा में भारत, अमेरिका, ब्रिटेन और यूरोपीय संघ सहित 42 देशों ने अत्यधिक शक्तिशाली कृत्रिम बुद्धिमत्ता (Frontier AI) मॉडल्स के लिए पहले कानूनी रूप से बाध्यकारी अंतर्राष्ट्रीय सुरक्षा समझौते पर हस्ताक्षर किए।',
    fullDigest:
      'जिनेवा एआई समझौते के तहत उन्नत एआई मॉडल्स के दुरुपयोग को रोकने के लिए बहुपक्षीय दिशानिर्देश बनाए गए हैं।\n\nसमझौते की प्रमुख शर्तें:\n• 10^26 से अधिक फ्लोटिंग पॉइंट ऑपरेशंस वाले किसी भी मॉडल को जारी करने से पहले स्वतंत्र तृतीय-पक्ष रेड-टीमिंग ऑडिट अनिवार्य होगा।\n• मानव नियंत्रण के बिना पूरी तरह स्वायत्त घातक हथियार प्रणालियों के निर्माण पर अंतरराष्ट्रीय प्रतिबंध।\n• एआई सुरक्षा से जुड़ी संवेदनशील कमजोरियों की जानकारी अन्य सदस्य देशों के साथ साझा करने हेतु वैश्विक रजिस्ट्री का गठन।',
    examSubject: 'यूपीएससी जीएस-3 (वैश्विक तकनीकी संधियां) / बौद्धिक संपदा अधिकार',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC GS-3 / BA): यूपीएससी जीएस-3 (विज्ञान एवं प्रौद्योगिकी, कृत्रिम बुद्धिमत्ता की नैतिकता, साइबर संप्रभुता एवं अंतर्राष्ट्रीय संधियां) के लिए उपयोगी संदर्भ।',
    tags: ['एआई सुरक्षा', 'जिनेवा संधि', 'कृत्रिम बुद्धिमत्ता', 'साइबर सुरक्षा'],
  },
  {
    id: 'ca-hi-int-env-01',
    title: 'यूएन लॉस एंड डैमेज फंड का संचालन शुरू: छोटे द्वीपीय देशों के लिए $1.2 अरब की पहली सहायता राशि जारी',
    sourceName: 'जनसत्ता (Jansatta)',
    sourceUrl: 'https://jansatta.com',
    publishedAt: '2026-10-15T11:40:00Z',
    url: 'https://jansatta.com/international/unfccc-loss-and-damage-fund-first-disbursement-island-nations',
    scope: 'international',
    category: 'environment',
    summary:
      'जलवायु न्याय की दिशा में बड़ी सफलता हासिल करते हुए विश्व बैंक स्थित "लॉस एंड डैमेज फंड" के बोर्ड ने चक्रवात और समुद्री जलस्तर से प्रभावित प्रशांत और कैरेबियाई देशों के लिए पहला अनुदान पैकेज जारी किया है।',
    fullDigest:
      'जलवायु सम्मेलनों (COP) में हुए ऐतिहासिक समझौतों के बाद जलवायु परिवर्तन से होने वाले अपरिवर्तनीय नुकसान की भरपाई का तंत्र सक्रिय हुआ।\n\nप्रमुख तथ्य:\n• तुवालु, वानुअतु और बारबाडोस जैसे छोटे द्वीपीय देशों को चक्रवात सुरक्षा तटबंध बनाने हेतु अनुदान दिया गया।\n• विकसित देशों से प्रतिवर्ष $100 अरब के जलवायु अनुकूलन वित्त की कमी को तत्काल पूरा करने की मांग।\n• आपदा के तुरंत बाद उपग्रह आधारित क्षति आकलन से जोड़कर त्वरित राहत पहुंचाने के लिए पैरामीट्रिक बीमा प्रणाली शुरू की गई।',
    examSubject: 'यूपीएससी जीएस-3 (जलवायु शिखर सम्मेलन व यूएनएफसीसीसी) / पर्यावरण अध्ययन',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC GS-3 / BA): यूपीएससी जीएस-3 (समान लेकिन विभेदित जिम्मेदारियां - CBDR, जलवायु न्याय, कॉप वार्ताएं एवं अंतर्राष्ट्रीय पर्यावरण वित्त) से सीधा जुड़ाव।',
    tags: ['लॉस एंड डैमेज', 'UNFCCC', 'जलवायु न्याय', 'कॉप', 'पर्यावरण'],
  },
  {
    id: 'ca-hi-int-law-01',
    title: 'अंतर्राष्ट्रीय न्यायालय (ICJ) की ऐतिहासिक सलाह: ग्रीनहाउस गैसों के उत्सर्जन पर देशों की अंतरराष्ट्रीय विधिक जवाबदेही तय',
    sourceName: 'नवभारत टाइम्स (Navbharat Times)',
    sourceUrl: 'https://navbharattimes.indiatimes.com',
    publishedAt: '2026-10-14T16:00:00Z',
    url: 'https://navbharattimes.indiatimes.com/world/icj-the-hague-climate-change-advisory-opinion',
    scope: 'international',
    category: 'law',
    summary:
      'द हेग स्थित इंटरनेशनल कोर्ट ऑफ जस्टिस ने फैसला दिया है कि संयुक्त राष्ट्र समुद्री कानून संधि (UNCLOS) के तहत अधिक कार्बन उत्सर्जक देशों का यह दायित्व है कि वे समुद्र में होने वाले प्रदूषण और जलवायु नुकसान को रोकें।',
    fullDigest:
      'वानुअतु और प्रशांत द्वीप समूह के युवाओं द्वारा दायर याचिका पर सुनवाई करते हुए संयुक्त राष्ट्र की सर्वोच्च न्यायिक संस्था ने ऐतिहासिक कानूनी सलाह दी।\n\nअदालत के मुख्य बिंदु:\n• महासागरों द्वारा अवशोषित होने वाली ग्रीनहाउस गैसें UNCLOS भाग XII के तहत समुद्री प्रदूषण की श्रेणी में आती हैं।\n• यदि कोई देश हानिकारक उत्सर्जन को रोकने में विफल रहता है, तो उसे अंतरराष्ट्रीय कानून के तहत जवाबदेह ठहराया जा सकता है।\n• इस निर्णय से भविष्य में राष्ट्रीय एवं अंतर्राष्ट्रीय स्तर पर जलवायु मुकदमों (Climate Litigation) को विधिक शक्ति मिलेगी।',
    examSubject: 'यूपीएससी जीएस-2 (अंतर्राष्ट्रीय कानून, आईसीजे एवं बहुपक्षीय संधियां)',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC GS-2 / BA): यूपीएससी मुख्य परीक्षा पेपर 2 (अंतर्राष्ट्रीय न्यायालय, संयुक्त राष्ट्र समुद्री कानून संधि - UNCLOS एवं पारंपरिक अंतर्राष्ट्रीय कानून) के लिए मील का पत्थर।',
    tags: ['ICJ', 'UNCLOS', 'द हेग', 'अंतर्राष्ट्रीय कानून', 'जलवायु मुकदमा'],
  },
  {
    id: 'ca-hi-int-edu-01',
    title: 'यूनेस्को वैश्विक शिक्षा रिपोर्ट: उत्तर और दक्षिण के देशों के बीच डिजिटल साक्षरता की खाई अभी भी बरकरार',
    sourceName: 'बीबीसी हिंदी (BBC Hindi)',
    sourceUrl: 'https://bbc.com/hindi',
    publishedAt: '2026-10-13T09:30:00Z',
    url: 'https://bbc.com/hindi/international-unesco-global-education-monitoring-report-digital-gap',
    scope: 'international',
    category: 'educational',
    summary:
      'यूनेस्को की वार्षिक वैश्विक शिक्षा निगरानी रिपोर्ट में चेतावनी दी गई है कि बिना सार्वजनिक इंटरनेट और शिक्षकों के प्रशिक्षण के डिजिटल शिक्षा तकनीक का अंधाधुंध उपयोग सामाजिक और आर्थिक असमानता को और गहरा कर सकता है।',
    fullDigest:
      'पेरिस स्थित यूनेस्को मुख्यालय से जारी रिपोर्ट में दुनिया भर के हाइब्रिड और ऑनलाइन लर्निंग मॉडल का समग्र मूल्यांकन किया गया।\n\nरिपोर्ट के मुख्य निष्कर्ष:\n• विश्व भर में 45 करोड़ से अधिक स्कूली बच्चे अभी भी हाई-स्पीड इंटरनेट और डिजिटल शिक्षा सामग्री से वंचित हैं।\n• रिपोर्ट में भारत के दीक्षा (DIKSHA) और समर्थ (Samarth) जैसे खुले सार्वजनिक डिजिटल प्लेटफॉर्मों को वैश्विक स्तर पर अपनाने की अनुशंसा की गई।\n• एड-टेक कंपनियों द्वारा छात्रों के बायोमेट्रिक और व्यक्तिगत डेटा के व्यावसायिक उपयोग पर कठोर कानूनी नियंत्रण का आह्वान किया गया।',
    examSubject: 'यूपीएससी जीएस-2 (सामाजिक न्याय, शिक्षा एवं यूनेस्को) / बीए समाजशास्त्र',
    examRelevance:
      '📌 परीक्षा उपयोगिता (UPSC / BA): संघ लोक सेवा आयोग जीएस-2 (मानव संसाधन विकास, सामाजिक न्याय, डिजिटल डिवाइड) एवं बीए समाजशास्त्र के प्रश्नों के लिए सशक्त प्रमाण।',
    tags: ['UNESCO', 'डिजिटल डिवाइड', 'शिक्षा रिपोर्ट', 'सामाजिक न्याय', 'दीक्षा पोर्टल'],
  },
];
