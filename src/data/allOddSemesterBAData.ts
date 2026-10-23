// Comprehensive Odd Semester (Sem 1, Sem 3, Sem 5) BA Curriculum Data for SDSUV NEP-2020
// Covers all 11 Subjects: Geography, History, Political Science, Sociology, Hindi Literature,
// Economics, Anthropology, English Literature, Sanskrit Literature, Home Science, Drawing & Painting

import { LearnSubjectData, TopicItem, UnitNode } from './learnData';
import { SEMESTER_1_BA_SUBJECTS } from './semester1BAData';

function createTopic(
  id: string,
  titleEn: string,
  titleHi: string,
  youtubeId: string,
  instructorEn: string,
  instructorHi: string,
  duration: string,
  summaryEn: string,
  summaryHi: string,
  coreTakeaways: string[],
  pyqQuestionEn?: string,
  pyqQuestionHi?: string,
  pyqSolutionEn?: string,
  pyqSolutionHi?: string,
  markingPoints?: string[],
  tag: TopicItem['tag'] = '🔥 Most Asked in SDSUV',
  language: 'Hinglish' | 'Hindi' | 'English' = 'Hinglish',
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate'
): TopicItem {
  return {
    id,
    titleEn,
    titleHi,
    tag,
    duration,
    youtubeId,
    language,
    instructorEn,
    instructorHi,
    difficulty,
    alternativeVideos: [
      {
        id: `alt-${id}-en`,
        titleEn: `${titleEn} (Advanced Ivy/NPTEL Analysis)`,
        titleHi: `${titleHi} (गहन अंग्रेजी विश्लेषण)`,
        channel: instructorEn,
        duration,
        youtubeId,
        views: '420K',
        language: 'English',
        badge: 'UPSC Standard',
      },
      {
        id: `alt-${id}-hi`,
        titleEn: `${titleEn} (श्री देव सुमन वि.वि. हिंदी व्याख्या)`,
        titleHi: `${titleHi} (श्री देव सुमन वि.वि. हिंदी व्याख्या)`,
        channel: instructorHi,
        duration,
        youtubeId,
        views: '580K',
        language: 'Hindi',
        badge: 'SDSUV Hindi',
      },
    ],
    topicPYQs: pyqQuestionEn
      ? [
          {
            id: `pyq-${id}`,
            year: 2024,
            semester: 1,
            marks: 15,
            examType: 'Main',
            questionEn: pyqQuestionEn,
            questionHi: pyqQuestionHi || pyqQuestionEn,
            solutionEn: pyqSolutionEn || summaryEn,
            solutionHi: pyqSolutionHi || summaryHi,
            markingPoints: markingPoints || [
              'Conceptual Definitions & Origin (3 Marks)',
              'Analytical Explanation & Core Framework (8 Marks)',
              'Critical Evaluation / Contemporary Relevancy (4 Marks)',
            ],
          },
        ]
      : [
          {
            id: `pyq-${id}-default`,
            year: 2024,
            semester: 1,
            marks: 10,
            examType: 'Main',
            questionEn: `Explain the fundamental concepts, theories, and significance of ${titleEn} in the SDSUV NEP-2020 curriculum.`,
            questionHi: `श्री देव सुमन विश्वविद्यालय के NEP-2020 पाठ्यक्रम के अंतर्गत ${titleHi} के मूल सिद्धांतों, अवधारणाओं एवं महत्व की विवेचना कीजिए।`,
            solutionEn: summaryEn,
            solutionHi: summaryHi,
            markingPoints: [
              'Introduction and Scope (3 Marks)',
              'Core Theories and Analytical Breakdown (4 Marks)',
              'University Examination Synthesis (3 Marks)',
            ],
          },
        ],
    quickNotes: {
      summaryEn,
      summaryHi,
      formulas: [],
      coreTakeaways,
    },
  };
}

// ============================================================================
// SEMESTER 1 — REMAINING 6 SUBJECTS (ECONOMICS, ANTHROPOLOGY, ENGLISH, SANSKRIT, HOME SCIENCE, DRAWING)
// ============================================================================

export const SEMESTER_1_EXPANDED_BA_SUBJECTS: LearnSubjectData[] = [
  // 1. ECONOMICS SEMESTER 1
  {
    id: 'eco-101',
    code: 'SDSUV-ECO-101',
    nameEn: 'Economics: Microeconomics & Uttarakhand Mountain Economy',
    nameHi: 'अर्थशास्त्र: व्यष्टि अर्थशास्त्र एवं उत्तराखंड की पर्वतीय आर्थिकी',
    stream: 'ba-arts',
    semester: 1,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: Consumer Behavior & Indifference Curve Analysis',
        titleHi: 'इकाई I: उपभोक्ता व्यवहार एवं उदासीनता वक्र विश्लेषण',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Cardinal Utility vs Ordinal Indifference Curve Analysis',
            titleHi: 'गणनावाचक उपयोगिता बनाम क्रमवाचक उदासीनता वक्र विश्लेषण',
            topics: [
              createTopic(
                't-eco-101',
                'Consumer Equilibrium: Cardinal vs Ordinal Utility & Indifference Curves',
                'उपभोक्ता संतुलन: गणनावाचक बनाम क्रमवाचक उपयोगिता एवं उदासीनता वक्र',
                'Z-2vGffv3u4',
                'StudyIQ Economics Panel / Prof. J.R. Hicks Approach',
                'स्टडीआईक्यू आईएएस अर्थशास्त्र / प्रो. जे.आर. हिक्स विश्लेषण',
                '28:15',
                'Consumer equilibrium represents the optimal satisfaction bundle subject to budget constraints. Hicksian ordinal analysis replaces Marshallian cardinalism via convex indifference curves and the budget line.',
                'उपभोक्ता संतुलन वह स्थिति है जहाँ उपभोक्ता सीमित बजट में अधिकतम संतुष्टि पाता है। हिक्स का क्रमवाचक विश्लेषण सीमांत प्रतिस्थापन दर (MRS_xy) और बजट रेखा की स्पर्शता पर आधारित है।',
                [
                  'Marshall: Utility cardinally measurable in utils (unrealistic constant marginal utility of money)',
                  'Hicks & Allen: Ordinal rankings with convex indifference curves (Diminishing MRS_xy)',
                  'Equilibrium condition: Slope of IC (MRS_xy) = Slope of Budget Line (Px / Py)',
                  'Hicksian decomposition separates Substitution Effect from Income Effect',
                ],
                'Critically examine the consumer equilibrium through Indifference Curve analysis. How is it superior to Marshallian cardinal utility?',
                'उदासीनता वक्र विश्लेषण के माध्यम से उपभोक्ता संतुलन की आलोचनात्मक व्याख्या कीजिए। यह मार्शल के गणनावाचक उपयोगिता सिद्धांत से किस प्रकार श्रेष्ठ है?'
              ),
              createTopic(
                't-eco-102',
                'Price Elasticity of Demand: Methods of Measurement & Revenue Concepts',
                'मांग की कीमत लोच: मापन की विधियां एवं आगम अवधारणाएं',
                'Ww2J2E5E1b8',
                'Drishti Economics Panel',
                'दृष्टि आईएएस अर्थशास्त्र विशेषज्ञ',
                '24:30',
                'Price elasticity of demand measures consumer responsiveness to price changes. Calculated via Point, Arc, and Total Outlay methods, determining firm pricing and monopoly regulation.',
                'मांग की कीमत लोच मूल्य परिवर्तन के प्रति मांग की संवेदनशीलता मापती है। इसे बिंदु रीति, चाप रीति और कुल व्यय रीति द्वारा मापा जाता है।',
                [
                  'Formula: Ep = (% ΔQ) / (% ΔP) = (dQ/dP) * (P/Q)',
                  'Marshall Total Outlay: Inelastic (P & TR move same direction), Unitary (TR constant), Elastic (P & TR move opposite)',
                  'Crucial link to marginal revenue: MR = AR * (1 - 1/e)',
                ]
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Production Function, Isoquants & Cost Behavior',
        titleHi: 'इकाई II: उत्पादन फलन, सम-उत्पाद वक्र एवं लागत व्यवहार',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Law of Variable Proportions & Cobb-Douglas Function',
            titleHi: 'परिवर्तनशील अनुपातों का नियम एवं कॉब-डगलस फलन',
            topics: [
              createTopic(
                't-eco-103',
                'Law of Variable Proportions & Three Stages of Short-Run Production',
                'परिवर्तनशील अनुपातों का नियम एवं अल्पकालीन उत्पादन की तीन अवस्थाएं',
                'U_lE79hYVqQ',
                'CEC UGC National Lectures',
                'सीईसी यूजीसी राष्ट्रीय व्याख्यान',
                '29:40',
                'The Law of Variable Proportions examines output behavior when one input is increased keeping other inputs fixed. Stage II (diminishing positive returns) is the only economically rational operational zone.',
                'परिवर्तनशील अनुपातों का नियम एक परिवर्तनशील साधन की मात्रा बढ़ाने पर कुल उत्पादन में परिवर्तन को दर्शाता है। द्वितीय अवस्था ही विवेकपूर्ण उत्पादक की कार्यशील अवस्था है।',
                [
                  'Stage I: Increasing returns (MP > AP, AP reaches maximum)',
                  'Stage II: Diminishing returns (MP < AP, MP reaches zero when TP is maximum) — Rational Producer Zone',
                  'Stage III: Negative returns (MP < 0, TP begins declining)',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },

  // 2. ANTHROPOLOGY SEMESTER 1
  {
    id: 'ant-101',
    code: 'SDSUV-ANT-101',
    nameEn: 'Anthropology: Social-Cultural Anthropology & Himalayan Ethnography',
    nameHi: 'मानवशास्त्र: सामाजिक-सांस्कृतिक मानवशास्त्र एवं हिमालयी नृजातिवृत्त',
    stream: 'ba-arts',
    semester: 1,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: Scope of Anthropology & Four-Field Holistic Framework',
        titleHi: 'इकाई I: मानवशास्त्र का कार्यक्षेत्र एवं चार-शाखीय समग्रतावादी ढांचा',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Holistic Science of Humankind & Fieldwork Tradition',
            titleHi: 'मानव का समग्र विज्ञान एवं क्षेत्रीय कार्य परंपरा',
            topics: [
              createTopic(
                't-ant-101',
                'Scope, Sub-Disciplines & Holistic Method of Social Anthropology',
                'सामाजिक मानवशास्त्र का स्वरूप, उप-शाखाएं एवं समग्रतावादी पद्धति',
                '8x5j7k2m9pQ',
                'Dr. B. Malinowski Method Series / DU Faculty',
                'मैलिनोव्स्की सहभागी अवलोकन परंपरा / दिल्ली विश्वविद्यालय',
                '27:10',
                'Anthropology studies humankind holistically across biological, social, cultural, and linguistic dimensions. Bronislaw Malinowski established intensive participant observation during Trobriand fieldwork.',
                'मानवशास्त्र मानव का समग्रतावादी अध्ययन है जिसमें शारीरिक, सामाजिक-सांस्कृतिक, पुरातात्विक एवं भाषाई पहलू शामिल हैं। मैलिनोव्स्की ने सहभागी अवलोकन की वैज्ञानिक परंपरा स्थापित की।',
                [
                  'Four subfields: Socio-cultural, Physical/Biological, Archaeological, Linguistic anthropology',
                  'Participant Observation: Living with community, learning native language, grasping native point of view',
                  'Cultural Relativism (Boas) vs Ethnocentrism',
                ],
                'Define Social Anthropology and discuss Malinowski’s Participant Observation method with ethnographic fieldwork ethics.',
                'सामाजिक मानवशास्त्र को परिभाषित कीजिए तथा मैलिनोव्स्की के सहभागी अवलोकन पद्धति की नृजातीय आचारसंहिता सहित विवेचना कीजिए।'
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Kinship, Marriage & Family in Tribal Uttarakhand',
        titleHi: 'इकाई II: नातेदारी, विवाह एवं परिवार तथा उत्तराखंड की जनजातियां',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Bhotia, Jaunsari & Tharu Social Organization',
            titleHi: 'भोटिया, जौनसारी एवं थारू सामाजिक संगठन',
            topics: [
              createTopic(
                't-ant-102',
                'Polyandry in Jaunsar-Bawar: Fraternal Polyandry & Transhumance in Bhotia',
                'जौनसार-बावर में बहुपति विवाह एवं भोटिया जनजाति का ऋतु-प्रवास',
                '3k8m7v9p2jL',
                'Anthropological Survey of India (Dehradun Center)',
                'भारतीय मानवविज्ञान सर्वेक्षण (देहरादून केंद्र)',
                '28:45',
                'Jaunsari fraternal polyandry preserved undivided terrace landholdings, while Bhotias of Garhwal practiced seasonal transhumance between high-altitude Bugyals and lower valleys.',
                'जौनसार-बावर में भ्रातृक बहुपति विवाह खंडित भूमि जोतों को बचाने का सामाजिक तंत्र था, जबकि भोटिया समाज उच्च तुंगता बुग्यालों और घाटियों के मध्य ऋतु-प्रवास करता था।',
                [
                  'Fraternal Polyandry: Brothers share one wife; prevents fragmentation of scarce mountain land',
                  'Khasa social stratification: Zamindars/Sayana system and Kolta landless peasantry',
                  'Bhotia Transhumance: Summer pastoralism in Bugyals and Indo-Tibetan trade historically',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },

  // 3. ENGLISH LITERATURE SEMESTER 1
  {
    id: 'eng-101',
    code: 'SDSUV-ENG-101',
    nameEn: 'English Literature: Introduction to Poetry, Renaissance Prose & Short Fiction',
    nameHi: 'अंग्रेजी साहित्य: काव्य परिचय, पुनर्जागरण गद्य एवं लघु कथाएं',
    stream: 'ba-arts',
    semester: 1,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: Forms of Poetry & Poetic Stanzaic Devices',
        titleHi: 'इकाई I: काव्य के रूप एवं काव्यात्मक छंद विन्यास',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Sonnet, Ode, Elegy, Ballad & Epic Structure',
            titleHi: 'सॉनेट, ओड, शोकगीत, गाथागीत एवं महाकाव्य संरचना',
            topics: [
              createTopic(
                't-eng-101',
                'Forms of Poetry: The Sonnet (Petrarchan vs Shakespearean) & Meter Analysis',
                'काव्य के रूप: सॉनेट (पेट्रार्कन बनाम शेक्सपियरियन) एवं छंद विश्लेषण',
                'x7j3l5o8p2A',
                'Oxford/Cambridge English Faculty / StudyIQ English',
                'अंग्रेजी साहित्य संकाय / सॉनेट एवं छंद विश्लेषण',
                '26:50',
                'The sonnet is a 14-line poem written in iambic pentameter. Petrarchan structure features Octave (abbaabba) and Sestet (cdecde/cdcdcd) with a volta, whereas Shakespearean comprises three quatrains and a heroic couplet (abab cdcd efef gg).',
                'सॉनेट 14 पंक्तियों की कविता है जो आइम्बिक पेंटामीटर में रची जाती है। पेट्रार्कन सॉनेट अष्टक (Octave) व षटक (Sestet) में विभाजित होता है, जबकि शेक्सपियरियन में तीन चौपाई और एक युगल छंद होता है।',
                [
                  'Petrarchan Sonnet: Octave poses problem; Volta (line 9) shifts tone; Sestet provides resolution',
                  'Shakespearean Sonnet: abab cdcd efef gg with pithy thematic punch in final couplet',
                  'Miltonic & Spenserian variants',
                ],
                'Trace the evolution of the Sonnet from Petrarch to Shakespeare with scansion and structural analysis.',
                'सॉनेट के उद्भव एवं पेट्रार्क से शेक्सपियर तक के विकास का छंद शास्त्रीय विश्लेषण कीजिए।'
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Renaissance Masters — Shakespeare & Francis Bacon',
        titleHi: 'इकाई II: पुनर्जागरण काल के महान साहित्यकार — शेक्सपियर एवं फ्रांसिस बेकन',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Shakespeare Sonnet 116 & Baconian Aphoristic Essays',
            titleHi: 'शेक्सपियर सॉनेट 116 एवं बेकन के सूक्तिपरक निबंध',
            topics: [
              createTopic(
                't-eng-102',
                'Shakespeare Sonnet 116 ("Let me not to the marriage of true minds") & Bacon’s "Of Studies"',
                'शेक्सपियर सॉनेट 116 एवं फ्रांसिस बेकन का प्रसिद्ध निबंध "ऑफ स्टडीज"',
                'w8Z0j6pQ9uI',
                'Prof. Edward Albert Series / CEC English',
                'सीईसी अंग्रेजी साहित्य / बेकन शैली विश्लेषण',
                '25:30',
                'Sonnet 116 celebrates eternal, immutable love as an ever-fixed mark unaffected by time. Francis Bacon, the father of English essay, uses terse, aphoristic wit to analyze the tripartite utility of reading.',
                'सॉनेट 116 सच्चे प्रेम को कालजयी व अपरिवर्तनशील ध्रुवतारे की भांति चित्रित करता है। बेकन का निबंध अध्ययन की त्रिविध उपयोगिता (आनंद, आभूषण एवं योग्यता) का सूक्तिपरक विश्लेषण करता है।',
                [
                  'Sonnet 116: "Love is not Love which alters when it alteration finds"',
                  'Bacon aphorism: "Studies serve for delight, for ornament, and for ability"',
                  'Terseness, Latinate diction, and utilitarian Renaissance pragmatism',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },

  // 4. SANSKRIT LITERATURE SEMESTER 1
  {
    id: 'san-101',
    code: 'SDSUV-SAN-101',
    nameEn: 'Sanskrit Literature: Paninian Grammar (Laghusiddhantakaumudi) & Niti Poetry',
    nameHi: 'संस्कृत साहित्य: पाणिनीय व्याकरण (लघुसिद्धान्तकौमुदी), नीति काव्य एवं अनुवाद',
    stream: 'ba-arts',
    semester: 1,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: Maheswara Sutras, Pratyahara & Sandhi Prakarana',
        titleHi: 'इकाई I: माहेश्वर सूत्र, प्रत्याहार निर्माण एवं संधि प्रकरण',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Laghusiddhantakaumudi: Ac, Hal and Visarga Sandhi',
            titleHi: 'लघुसिद्धान्तकौमुदी: अच् संधि, हल् संधि एवं विसर्ग संधि',
            topics: [
              createTopic(
                't-san-101',
                '14 Maheshwara Sutras, Pratyahara Formation & Yan Sandhi ("इको यणचि")',
                '14 माहेश्वर सूत्र, प्रत्याहार निर्माण एवं यण् संधि ("इको यणचि")',
                '4iE_s9H6m_4',
                'Varanasi Sanskrit Vishwavidyalaya Panel / CEC Sanskrit',
                'वाराणसी संस्कृत संकाय / पाणिनीय व्याकरण व्याख्यान',
                '29:10',
                'Panini’s 14 Shiva Sutras form the phonetic algebra of Sanskrit grammar. Formula "इको यणचि" (Ik + Ac = Yan) governs transformation of i, u, r, l into y, v, r, l before vowels.',
                'महर्षि पाणिनि के 14 माहेश्वर सूत्र संस्कृत वर्णमाला के ध्वन्यात्मक बीजगणित हैं। "इको यणचि" सूत्र इक् प्रत्याहार के स्थान पर यण् आदेश का विधान करता है।',
                [
                  'Maheshwara Sutras: नृत्तावसाने नटराजराजो ननाद ढक्कां नवपञ्चवारम्',
                  'Pratyahara construction through "आदिरन्त्येन सहेता"',
                  'Yan Sandhi derivation: इति + अपि = इत्यपि; सुधी + उपास्यः = सुध्युपास्यः',
                ],
                'माहेश्वर सूत्रों के आधार पर प्रत्याहार निर्माण की विधि स्पष्ट करते हुए "इको यणचि" सूत्र की सोदाहरण व्याख्या कीजिए।',
                'Explain Pratyahara formulation via Maheshwara Sutras and demonstrate "Iko Yanachi" with rule derivation.'
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Bhartrihari’s Nitisatakam & Moral Philosophy',
        titleHi: 'इकाई II: भर्तृहरि विरचित नीतिशतकम् एवं जीवन दर्शन',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Vidyaprasamsa, Murkhapaddhati & Karma Philosophy',
            titleHi: 'विद्याप्रशंसा, मूर्खपद्धति एवं कर्म सिद्धांत',
            topics: [
              createTopic(
                't-san-102',
                'Bhartrihari’s Nitisatakam: Vidyaprasamsa ("विद्या नाम नरस्य रूपमधिकम्") & Subhashitas',
                'भर्तृहरि कृत नीतिशतकम्: विद्याप्रशंसा ("विद्या नाम नरस्य रूपमधिकम्") एवं सुभाषित',
                'K9Z8v5m8Y8Y',
                'Rashtriya Sanskrit Sansthan / Prof. Radhakant',
                'राष्ट्रीय संस्कृत संस्थान / प्रो. राधाकांत नीति काव्य',
                '27:00',
                'Bhartrihari’s Nitisatakam offers timeless ethical wisdom on statecraft, friendship, and learning. Shloka "विद्या नाम नरस्य रूपमधिकम्" declares education as man’s supreme concealed treasure.',
                'भर्तृहरि कृत नीतिशतकम् जीवन के व्यावहारिक नीति-मूल्यों का अप्रतिम ग्रंथ है। विद्या को मनुष्य का गुप्त धन, गुरुओं का गुरु और परदेस में बंधु माना गया है।',
                [
                  'विद्या नाम नरस्य रूपमधिकं प्रच्छन्नगुप्तं धनम्, विद्या भोगकरी यशः सुखकरी विद्या गुरूणां गुरुः',
                  'Three classes of men: प्रारभ्यते न खलु विघ्नभयेन नीचैः...',
                  'Significance of Dhairya (fortitude) and Satya (truth)',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },

  // 5. HOME SCIENCE SEMESTER 1
  {
    id: 'hsc-101',
    code: 'SDSUV-HSC-101',
    nameEn: 'Home Science: Foods & Nutrition Science & Human Development',
    nameHi: 'गृह विज्ञान: आहार एवं पोषण विज्ञान तथा मानव विकास',
    stream: 'ba-arts',
    semester: 1,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: Macronutrients, Micronutrients & BMR Determination',
        titleHi: 'इकाई I: पोषक तत्व (मैक्रो व माइक्रो) एवं आधारीय चयापचय (BMR)',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Carbohydrates, Proteins, Lipids, Vitamins & Mineral Metabolism',
            titleHi: 'कार्बोहाइड्रेट, प्रोटीन, वसा, विटामिन एवं खनिज लवण चयापचय',
            topics: [
              createTopic(
                't-hsc-101',
                'Macronutrients (Carbohydrates, Proteins, Lipids) & Basal Metabolic Rate (BMR)',
                'मैक्रोन्यूट्रिएंट्स (कार्बोहाइड्रेट, प्रोटीन, वसा) एवं आधारीय चयापचय दर (BMR)',
                'f8j4v7k9m2P',
                'NIN Hyderabad / ICMR Guidelines Panel',
                'राष्ट्रीय पोषण संस्थान हैदराबाद / आईसीएमआर आहार मानक',
                '26:40',
                'Macronutrients supply daily metabolic energy. BMR represents the basal energy expended at complete physical and emotional rest, influenced by age, lean body mass, and thyroid hormone.',
                'आहार के मुख्य पोषक तत्व ऊर्जा, वृद्धि और ऊतकों की मरम्मत करते हैं। BMR पूर्ण विश्राम की स्थिति में जीवन रक्षा हेतु आवश्यक न्यूनतम ऊर्जा व्यय है।',
                [
                  'Carbohydrates: 4 kcal/g, primary glycogen fuel for brain and muscles',
                  'Proteins: 4 kcal/g, essential amino acids and tissue repair (Kwashiorkor prevention)',
                  'Lipids: 9 kcal/g, concentrated energy, fat-soluble vitamins (A, D, E, K) transport',
                  'BMR Factors: Body surface area, age, sex, thyroxine secretion, ambient climate',
                ],
                'Classify essential dietary nutrients and explain factors influencing Basal Metabolic Rate (BMR) per ICMR-NIN recommendations.',
                'आहार के आवश्यक पोषक तत्वों का वर्गीकरण कीजिए तथा आईसीएमआर मानकों के आधार पर BMR को प्रभावित करने वाले कारकों की व्याख्या कीजिए।'
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Prenatal Development & Infancy Milestones',
        titleHi: 'इकाई II: प्रसवपूर्व विकास एवं शैशवावस्था के विकासात्मक मील के पत्थर',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Stages of Germinal, Embryonic, Fetal Development & Neonatal Care',
            titleHi: 'डिंबावस्था, भ्रूणावस्था, गर्भस्थ शिशु विकास एवं नवजात शिशु परिचर्या',
            topics: [
              createTopic(
                't-hsc-102',
                'Stages of Prenatal Growth & Motor-Cognitive Milestones in First Two Years',
                'प्रसवपूर्व विकास की अवस्थाएं एवं प्रारंभिक दो वर्षों में गत्यात्मक-संज्ञानात्मक मील के पत्थर',
                'm8z5k2p9j7L',
                'Lady Irwin College / Child Development Panel',
                'लेडी इरविन कॉलेज बाल विकास संकाय',
                '25:10',
                'Prenatal development progresses through germinal, embryonic, and fetal phases. Cephalocaudal (head-to-toe) and Proximodistal (center-to-periphery) laws govern early infant motor control.',
                'प्रसवपूर्व विकास तीन चरणों में संपन्न होता है। शिशु का गत्यात्मक विकास सिर से पैर (मस्तकाधोमुखी) तथा केंद्र से परिधि (निकट-दूरस्थ) नियमों के अनुसार होता है।',
                [
                  'Three Prenatal Periods: Ovum (0-2 weeks), Embryo (3-8 weeks - organogenesis), Fetus (9 weeks to birth)',
                  'Cephalocaudal sequence: Head control -> Sitting -> Standing -> Walking',
                  'Teratogens: Maternal infections, malnutrition, drugs affecting critical fetal windows',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },

  // 6. DRAWING & PAINTING SEMESTER 1
  {
    id: 'drw-101',
    code: 'SDSUV-DRW-101',
    nameEn: 'Drawing & Painting: Fundamentals of Visual Art, Shadanga & Ancient Rock Art',
    nameHi: 'चित्रकला: दृश्य कला के मूल तत्व, भारतीय षडंग एवं प्रागैतिहासिक शैल चित्रकला',
    stream: 'ba-arts',
    semester: 1,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: Six Elements of Art & Indian Six Limbs (Shadanga)',
        titleHi: 'इकाई I: कला के छह तत्व एवं भारतीय चित्रकला के छह अंग (षडंग)',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Kamasutra Shadanga Canon & Composition Principles',
            titleHi: 'कामसूत्र का षडंग सिद्धांत एवं संयोजन के सिद्धांत',
            topics: [
              createTopic(
                't-drw-101',
                'Six Limbs of Indian Painting (Shadanga: Roopbheda, Pramana, Bhava, Lavanya, Sadrishya, Varnikabhanga)',
                'भारतीय चित्रकला के छह अंग (षडंग: रूपभेद, प्रमाण, भाव, लावण्ययोजन, सादृश्य, वर्णिकाभंग)',
                '7x8v5k2m9pQ',
                'Prof. Nandalal Bose Legacy / Santiniketan Kala Bhavan',
                'शांतिनिकेतन कला भवन / प्रो. अवनींद्रनाथ टैगोर षडंग व्याख्या',
                '27:30',
                'Yashodhara’s Jayamangala commentary on Vatsyayana’s Kamasutra articulates the six canonical limbs of Indian painting. Roopbheda, Pramana, Bhava, Lavanyayojanam, Sadrishyam, and Varnikabhanga define timeless aesthetic perfection.',
                'यशोधर पंडित की जयमंगला टीका में चित्रकला के छह अनिवार्य अंगों (षडंग) का उल्लेख है। रूपभेद, प्रमाण, भाव, लावण्य, सादृश्य तथा वर्णिकाभंग भारतीय कला का मूल आधार हैं।',
                [
                  'रूपभेदाः प्रमाणानि भावलावण्ययोजनम् । सादृश्यं वर्णिकाभङ्ग इति चित्रं षडङ्गकम् ॥',
                  'Roopbheda (Knowledge of forms) & Pramana (Proportions and anatomy)',
                  'Bhava (Expression of emotion) & Lavanya (Grace, elegance, aesthetic charm)',
                  'Sadrishya (Verisimilitude/similitude to nature) & Varnikabhanga (Mastery of brushwork and color harmony)',
                ],
                'Elucidate the Six Limbs of Indian Painting (Shadanga) with classical Sanskrit verse and practical illustrative significance.',
                'संस्कृत श्लोक सहित भारतीय चित्रकला के षडंग की सोदाहरण व्याख्या कीजिए।'
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Prehistoric Rock Art & Ajanta Murals',
        titleHi: 'इकाई II: प्रागैतिहासिक शैल चित्रकला एवं अजन्ता भित्तिचित्र',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Bhimbetka Caves, Lakhudiyar (Uttarakhand) & Ajanta Cave 1 Frescoes',
            titleHi: 'भीमबेटका गुफाएं, लखुडियार (अल्मोड़ा) एवं अजन्ता गुफा 1 के भित्तिचित्र',
            topics: [
              createTopic(
                't-drw-102',
                'Bhimbetka & Lakhudiyar Rock Paintings; Padmapani Bodhisattva of Ajanta Cave 1',
                'भीमबेटका एवं लखुडियार (उत्तराखंड) शैलचित्र; अजन्ता गुफा 1 का पद्मपाणि बोधिसत्व',
                '4j8k7m9v2pL',
                'National Museum New Delhi / ASI Heritage Lectures',
                'राष्ट्रीय संग्रहालय नई दिल्ली / भारतीय पुरातत्व सर्वेक्षण',
                '28:10',
                'Lakhudiyar in Almora preserves red and white ochre rock paintings of stick figures and dancers. Ajanta Cave 1 exhibits Padmapani Bodhisattva holding a blue lotus, showcasing delicate shading and sublime spiritual calm.',
                'अल्मोड़ा का लखुडियार शैल-आश्रय लाल व सफेद गेरू से बने प्राचीन नर्तकों व पशुओं के चित्रों को सहेजे हुए है। अजन्ता गुफा 1 का पद्मपाणि बोधिसत्व त्रिभंग मुद्रा और अप्रतिम रेखांकन का उत्कृष्ट उदाहरण है।',
                [
                  'Lakhudiyar (Suyal River bank): Finger drawings in black, red, and white depicting communal dance and animal motifs',
                  'Bhimbetka: Upper Paleolithic and Mesolithic hunting scenes with mineral colors',
                  'Ajanta Mural Technique: Mud-plaster ground with cow dung, rice husk, coated with lime wash; tempera application',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },
];

// ============================================================================
// SEMESTER 3 — CORE ODD SEMESTER BA SUBJECTS
// ============================================================================

export const SEMESTER_3_BA_SUBJECTS: LearnSubjectData[] = [
  // 1. HISTORY SEMESTER 3
  {
    id: 'his-301',
    code: 'SDSUV-HIS-201',
    nameEn: 'History: History of India (1206 A.D. to 1707 A.D.) & Medieval Uttarakhand',
    nameHi: 'इतिहास: भारत का इतिहास (1206 ई. से 1707 ई.) एवं मध्यकालीन उत्तराखण्ड',
    stream: 'ba-arts',
    semester: 3,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: Delhi Sultanate: Consolidation & Agrarian Administration',
        titleHi: 'इकाई I: दिल्ली सल्तनत: सुदृढ़ीकरण एवं कृषि प्रशासनिक व्यवस्था',
        totalHours: 15,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Iltutmish, Balban, Alauddin Khalji & Market Regulations',
            titleHi: 'इल्तुतमिश, बलबन, अलाउद्दीन खिलजी एवं बाजार नियंत्रण नीति',
            topics: [
              createTopic(
                't-his-301',
                'Alauddin Khalji’s Market Control System & Military Administrative Reforms',
                'अलाउद्दीन खिलजी की बाजार नियंत्रण नीति एवं सैन्य प्रशासनिक सुधार',
                'm9w2ZOUF6So',
                'Prof. Irfan Habib Series / StudyIQ History Panel',
                'प्रो. इरफान हबीब मध्यकालीन इतिहास / दृष्टि आईएएस',
                '29:15',
                'Alauddin Khalji established price controls across food grains, horses, and cloth, supervised by the Shahna-i-Mandi, to maintain a large standing army against Mongol incursions.',
                'अलाउद्दीन खिलजी ने मंगोल आक्रमणों से सुरक्षा हेतु विशाल स्थायी सेना के भरण-पोषण के लिए शहना-ए-मंडी की देखरेख में खाद्यान्न, वस्त्र व अश्वों के मूल्य निर्धारित किए।',
                [
                  'Diwan-i-Riyasat and Shahna-i-Mandi administrative enforcement',
                  'Fixed price schedules and prohibition of hoarding/black marketing',
                  'Direct measurement (Masaahat) of agricultural land and cash revenue collection',
                ],
                'Critically examine the objectives, mechanisms, and economic consequences of Alauddin Khalji’s market control policy.',
                'अलाउद्दीन खिलजी की बाजार नियंत्रण नीति के उद्देश्यों, क्रियान्वयन तंत्र तथा आर्थिक प्रभावों की आलोचनात्मक समीक्षा कीजिए।'
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Mughal Empire: Akbar’s Mansabdari & Sulh-i-Kul',
        titleHi: 'इकाई II: मुगल साम्राज्य: अकबर की मनसबदारी एवं सुलह-ए-कुल की नीति',
        totalHours: 15,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Evolution of Mansabdari System & Rajput Marital Alliances',
            titleHi: 'मनसबदारी प्रथा का विकास एवं राजपूत वैवाहिक संधियां',
            topics: [
              createTopic(
                't-his-302',
                'Akbar’s Mansabdari System: Zat and Sawar Ranks, Dagh & Chehra Regulations',
                'अकबर की मनसबदारी व्यवस्था: जात व सवार पद, दाग एवं चेहरा नियम',
                'v0jZ0Hk3Q4g',
                'Aligarh Historians Society / CEC UGC',
                'अलीगढ़ इतिहासकार सोसाइटी / मध्यकालीन भारत व्याख्यान',
                '31:20',
                'The Mansabdari system was the military-bureaucratic backbone of the Mughal empire. Dual ranking of Zat (personal status/pay) and Sawar (cavalry quota) ensured meritocratic imperial cohesion.',
                'मनसबदारी व्यवस्था मुगल साम्राज्य की सैन्य व प्रशासनिक रीढ़ थी। जात (व्यक्तिगत दर्जा व वेतन) और सवार (घुड़सवारों की संख्या) के दोहरे पद ने साम्राज्य को संगठित किया।',
                [
                  'Zat indicates personal rank, prestige, and base salary slab',
                  'Sawar indicates mandatory cavalry horses maintained for imperial campaigns',
                  'Dagh (horse branding) and Chehra (descriptive roll) prevented military fraud',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },

  // 2. POLITICAL SCIENCE SEMESTER 3
  {
    id: 'pol-301',
    code: 'SDSUV-POL-201',
    nameEn: 'Political Science: Indian Political System & Constitutional Governance',
    nameHi: 'राजनीति विज्ञान: भारतीय राजनीतिक व्यवस्था एवं संवैधानिक शासन प्रणाली',
    stream: 'ba-arts',
    semester: 3,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: Indian Constitution: Preamble, Fundamental Rights & DPSP',
        titleHi: 'इकाई I: भारतीय संविधान: प्रस्तावना, मौलिक अधिकार एवं नीति निदेशक तत्व',
        totalHours: 15,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Fundamental Rights vs Directive Principles: Harmonic Balance',
            titleHi: 'मौलिक अधिकार बनाम नीति निदेशक तत्व: सामंजस्यपूर्ण संतुलन',
            topics: [
              createTopic(
                't-pol-301',
                'Fundamental Rights vs Directive Principles: Minerva Mills Doctrine & Basic Structure',
                'मौलिक अधिकार बनाम नीति निदेशक तत्व: मिनर्वा मिल्स सिद्धांत एवं मूल ढांचा',
                'okG8IPVh8aI',
                'Dr. M. Laxmikanth Indian Polity Series / StudyIQ',
                'एम. लक्ष्मीकांत भारतीय राजव्यवस्था / दृष्टि आईएएस',
                '28:40',
                'The Supreme Court in Minerva Mills (1980) held that the Indian Constitution is founded on the bedrock of the balance between Fundamental Rights (Part III) and Directive Principles (Part IV).',
                'सर्वोच्च न्यायालय ने मिनर्वा मिल्स वाद (1980) में स्पष्ट किया कि भारतीय संविधान भाग III (मौलिक अधिकार) और भाग IV (नीति निदेशक तत्व) के मध्य संतुलन की आधारशिला पर टिका है।',
                [
                  'Part III: Justiciable, negative injunctions ensuring civil-political liberties',
                  'Part IV: Non-justiciable, positive obligations realizing socio-economic democracy',
                  'Doctrine of Harmonious Construction: Champakam Dorairajan -> Kesavananda -> Minerva Mills',
                ],
                'Discuss the constitutional relationship and judicial evolution between Fundamental Rights and Directive Principles of State Policy.',
                'मौलिक अधिकारों तथा राज्य के नीति निदेशक तत्वों के मध्य संवैधानिक संबंधों एवं न्यायिक निर्णयों के विकास की विवेचना कीजिए।'
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Indian Federalism: Centre-State Relations & Emergency Powers',
        titleHi: 'इकाई II: भारतीय संघवाद: केंद्र-राज्य संबंध एवं आपातकालीन प्रावधान',
        totalHours: 15,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Legislative, Administrative & Financial Centre-State Dynamics',
            titleHi: 'विधायी, प्रशासनिक एवं वित्तीय केंद्र-राज्य संबंध',
            topics: [
              createTopic(
                't-pol-302',
                'Centre-State Relations: Sarkaria Commission & Article 356 (President’s Rule)',
                'केंद्र-राज्य संबंध: सरकारिया आयोग की सिफारिशें एवं अनुच्छेद 356 (राष्ट्रपति शासन)',
                '5v9p2jLk8m7',
                'Constitutional Law Forum / CEC Political Science',
                'संवैधानिक विधि मंच / भारतीय संघवाद व्याख्यान',
                '30:10',
                'Indian federalism is quasi-federal with a unitary bias. Sarkaria and Punchhi commissions recommended using Article 356 only as a last resort, reinforced by S.R. Bommai judgment.',
                'भारतीय संघवाद एकात्मक झुकाव वाला अर्ध-संघीय ढांचा है। सरकारिया और पुंछी आयोग ने एस.आर. बोम्मई वाद के आलोक में अनुच्छेद 356 को अंतिम विकल्प के रूप में प्रयोग करने की अनुशंसा की।',
                [
                  'Three Lists: Union (100), State (61), Concurrent (52); Residuary powers with Parliament',
                  'Article 356 misuse check: S.R. Bommai (1994) made President\'s Rule subject to judicial review',
                  'Role of Governor: Independent constitutional functionary rather than partisan agent',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },

  // 3. ECONOMICS SEMESTER 3
  {
    id: 'eco-301',
    code: 'SDSUV-ECO-201',
    nameEn: 'Economics: Macroeconomics & Public Finance',
    nameHi: 'अर्थशास्त्र: समष्टि अर्थशास्त्र एवं लोक वित्त',
    stream: 'ba-arts',
    semester: 3,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: National Income Accounting & Keynesian Income Determination',
        titleHi: 'इकाई I: राष्ट्रीय आय लेखांकन एवं कीन्स का आय निर्धारण सिद्धांत',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Circular Flow of Income & Effective Demand Principle',
            titleHi: 'आय का चक्रीय प्रवाह एवं प्रभावी मांग का सिद्धांत',
            topics: [
              createTopic(
                't-eco-301',
                'Keynesian Theory of Employment & Effective Demand: Aggregate Demand (AD) and Aggregate Supply (AS)',
                'कीन्स का रोजगार सिद्धांत एवं प्रभावी मांग: समग्र मांग (AD) एवं समग्र पूर्ति (AS)',
                'hZ8s5U_e4X8',
                'Prof. J.M. Keynes Analysis / StudyIQ Economics',
                'कीन्सियन समष्टि अर्थशास्त्र / दृष्टि आईएएस',
                '29:00',
                'J.M. Keynes refuted Say\'s Law of Markets, demonstrating that equilibrium employment is determined where Aggregate Demand intersects Aggregate Supply at the point of Effective Demand.',
                'जे.एम. कीन्स ने से के बाजार नियम का खंडन करते हुए सिद्ध किया कि संतुलन रोजगार का निर्धारण समग्र मांग और समग्र पूर्ति के कटाव बिंदु (प्रभावी मांग) पर होता है।',
                [
                  'Say’s Law: "Supply creates its own demand" fails during deep depression',
                  'Effective Demand = Consumption (C) + Investment (I) + Government (G) + Net Exports (X - M)',
                  'Investment Multiplier: k = 1 / (1 - MPC) = 1 / MPS',
                ],
                'Elucidate Keynesian Principle of Effective Demand with diagrammatic determination of underemployment equilibrium.',
                'कीन्स के प्रभावी मांग सिद्धांत की रेखाचित्र सहित व्याख्या कीजिए तथा अल्प-रोजगार संतुलन को समझाइए।'
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Public Finance, Taxation & Fiscal Deficits',
        titleHi: 'इकाई II: लोक वित्त, करारोपण के सिद्धांत एवं राजकोषीय घाटा',
        totalHours: 14,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Canons of Taxation & Maximum Social Advantage',
            titleHi: 'कराधान के सिद्धांत एवं अधिकतम सामाजिक लाभ का नियम',
            topics: [
              createTopic(
                't-eco-302',
                'Principle of Maximum Social Advantage (Dalton-Pigou) & GST in India',
                'अधिकतम सामाजिक लाभ का सिद्धांत (डाल्टन-पिगू) एवं भारत में जीएसटी',
                'mN2i7hP4V9Q',
                'Public Finance Bureau / CEC Economics',
                'लोक वित्त अध्ययन केंद्र / भारतीय राजकोषीय नीति',
                '27:45',
                'Dalton’s Principle of Maximum Social Advantage dictates that public expenditure and taxation should be carried out until Marginal Social Sacrifice of tax equals Marginal Social Benefit of expenditure.',
                'डाल्टन का अधिकतम सामाजिक लाभ सिद्धांत बताता है कि करारोपण और सार्वजनिक व्यय तब तक होना चाहिए जब तक कर का सीमांत सामाजिक त्याग व्यय के सीमांत सामाजिक लाभ के बराबर न हो जाए।',
                [
                  'Equilibrium: Marginal Social Sacrifice (MSS) = Marginal Social Benefit (MSB)',
                  'Adam Smith’s Canons: Equity, Certainty, Convenience, Economy',
                  'Fiscal Deficit vs Primary Deficit in Union and State budgets',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },
];

// ============================================================================
// SEMESTER 5 — ADVANCED ODD SEMESTER BA SUBJECTS
// ============================================================================

export const SEMESTER_5_BA_SUBJECTS: LearnSubjectData[] = [
  // 1. SOCIOLOGY SEMESTER 5
  {
    id: 'soc-501',
    code: 'SDSUV-SOC-301',
    nameEn: 'Sociology: Sociological Research Methods & Himalayan Society',
    nameHi: 'समाजशास्त्र: सामाजिक अनुसंधान पद्धतियां एवं हिमालयी समाज',
    stream: 'ba-arts',
    semester: 5,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: Social Research: Scientific Method, Hypothesis & Research Design',
        titleHi: 'इकाई I: सामाजिक अनुसंधान: वैज्ञानिक पद्धति, उपकल्पना एवं शोध प्रारूप',
        totalHours: 15,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Scientific Objectivity, Positivism vs Interpretivism',
            titleHi: 'वैज्ञानिक वस्तुनिष्ठता, प्रत्यक्षवाद बनाम व्याख्यात्मक उपागम',
            topics: [
              createTopic(
                't-soc-501',
                'Formulation of Hypothesis: Types, Sources and Testing in Sociological Research',
                'उपकल्पना का निर्माण: प्रकार, स्रोत एवं सामाजिक अनुसंधान में परीक्षण',
                'k2m9pQ7x8v5',
                'Prof. T.K. Oommen Series / StudyIQ Sociology',
                'प्रो. टी.के. ऊम्मन अनुसंधान पद्धति / दृष्टि आईएएस',
                '28:50',
                'A hypothesis is a tentative proposition subject to empirical verification. P.V. Young notes that it connects theoretical presuppositions with observable empirical facts.',
                'उपकल्पना एक कामचलाऊ प्रस्तावना है जिसकी सत्यता की जांच की जानी होती है। पी.वी. यंग के अनुसार यह अमूर्त सिद्धांतों और व्यावहारिक तथ्यों के मध्य सेतु का कार्य करती है।',
                [
                  'Sources: Cultural heritage, personal experience, scientific theories, folk wisdom',
                  'Types: Null Hypothesis (H0), Working Hypothesis, Relational Hypothesis',
                  'Criteria of good hypothesis: Clarity, testability, specificity, linkage to existing theory',
                ],
                'Define Hypothesis and discuss its vital role, sources, and challenges of value-neutrality in sociological inquiry.',
                'उपकल्पना को परिभाषित कीजिए तथा समाजशास्त्रीय अनुसंधान में इसके महत्व, स्रोतों एवं मूल्य-तटस्थता की चुनौतियों की विवेचना कीजिए।'
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Data Collection Tools: Questionnaire, Schedule & Observation',
        titleHi: 'इकाई II: तथ्य संकलन के उपकरण: प्रश्नावली, अनुसूची एवं अवलोकन',
        totalHours: 15,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Comparison of Questionnaire vs Interview Schedule',
            titleHi: 'प्रश्नावली बनाम साक्षात्कार अनुसूची की तुलनात्मक विवेचना',
            topics: [
              createTopic(
                't-soc-502',
                'Questionnaire vs Interview Schedule: Construction, Pilot Testing and Limitations',
                'प्रश्नावली बनाम साक्षात्कार अनुसूची: निर्माण, पूर्व-परीक्षण एवं सीमाएं',
                'jLk8m73k8m7',
                'CSSS JNU Faculty / CEC Sociology',
                'जवाहरलाल नेहरू विश्वविद्यालय समाजशास्त्र संकाय / सीईसी',
                '27:15',
                'A questionnaire is self-administered by literate respondents over geographical distance, while an interview schedule is filled directly by the field researcher in face-to-face interaction.',
                'प्रश्नावली डाक या ईमेल द्वारा साक्षर उत्तरदाताओं को भेजी जाती है, जबकि अनुसूची में अनुसंधानकर्ता स्वयं उपस्थित होकर प्रश्नों के उत्तर भरता है।',
                [
                  'Questionnaire: Low cost, wide geographic reach, but low response rate and no illiterate coverage',
                  'Schedule: High response rate, non-verbal cues recorded, but expensive and investigator bias risk',
                  'Pilot study (pre-testing) eliminates ambiguity and invalid questions',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },

  // 2. ECONOMICS SEMESTER 5
  {
    id: 'eco-501',
    code: 'SDSUV-ECO-301',
    nameEn: 'Economics: Development Economics & Uttarakhand Mountain Policy',
    nameHi: 'अर्थशास्त्र: विकास का अर्थशास्त्र एवं उत्तराखंड की पर्वतीय नीति',
    stream: 'ba-arts',
    semester: 5,
    units: [
      {
        unitNumber: 1,
        titleEn: 'Unit I: Theories of Economic Growth: Rostow & Harrod-Domar',
        titleHi: 'इकाई I: आर्थिक संवृद्धि के सिद्धांत: रोस्तोव एवं हैरड-डोमर मॉडल',
        totalHours: 15,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Rostow’s 5 Stages of Growth & Take-Off Conditions',
            titleHi: 'रोस्तोव की आर्थिक संवृद्धि की 5 अवस्थाएं एवं टेक-ऑफ की शर्तें',
            topics: [
              createTopic(
                't-eco-501',
                'W.W. Rostow’s Stages of Economic Growth: From Traditional Society to High Mass Consumption',
                'डब्ल्यू.डब्ल्यू. रोस्तोव की आर्थिक संवृद्धि की अवस्थाएं: पारंपरिक समाज से जन-उपभोग तक',
                '7Z5fF8t0A8A',
                'Development Economics Panel / StudyIQ',
                'विकास अर्थशास्त्र / प्रो. अमर्त्य सेन दृष्टिकोण',
                '30:00',
                'W.W. Rostow categorized economic modernization into five historical stages: Traditional Society, Preconditions for Take-off, The Take-off, Drive to Maturity, and Age of High Mass Consumption.',
                'रोस्तोव ने संवृद्धि को पांच अवस्थाओं में विभाजित किया: पारंपरिक समाज, आत्म-स्फूर्ति पूर्व की दशाएं, आत्म-स्फूर्ति (Take-off), परिपक्वता की ओर अग्रसर, एवं अत्यधिक जन-उपभोग की अवस्था।',
                [
                  'Take-off criteria: Investment rate rises from 5% to >10% of National Income',
                  'Development of leading manufacturing sectors with high backward and forward linkages',
                  'Institutional and political framework promoting modern economic entrepreneurship',
                ],
                'Critically evaluate Rostow’s Take-Off stage in the context of developing hill states like Uttarakhand.',
                'उत्तराखंड जैसे विकासशील पर्वतीय राज्यों के संदर्भ में रोस्तोव की टेक-ऑफ अवस्था का आलोचनात्मक मूल्यांकन कीजिए।'
              ),
            ],
          },
        ],
      },
      {
        unitNumber: 2,
        titleEn: 'Unit II: Uttarakhand Mountain Economy: Outmigration (Palayan) & Sustainable Tourism',
        titleHi: 'इकाई II: उत्तराखंड की पर्वतीय आर्थिकी: पलायन एवं सतत पर्यटन नीति',
        totalHours: 15,
        weightageMarks: 25,
        sdsuvCreditWeight: '1.0 Credit',
        chapters: [
          {
            chapterNumber: 1,
            titleEn: 'Palayan Aayog Reports, Ghost Villages & Organic Farming',
            titleHi: 'पलायन आयोग रिपोर्ट, भूतिया गांव (Ghost Villages) एवं जैविक कृषि',
            topics: [
              createTopic(
                't-eco-502',
                'Uttarakhand Outmigration (Palayan Aayog 2023) & Sustainable Hill Agriculture',
                'उत्तराखंड में ग्रामीण पलायन (पलायन आयोग रिपोर्ट 2023) एवं सतत पर्वतीय कृषि',
                'p2jL6j8k5m7',
                'Uttarakhand Palayan Niwaran Aayog / Dr. S.S. Negi',
                'उत्तराखंड ग्राम्य विकास एवं पलायन निवारण आयोग व्याख्यान',
                '28:30',
                'Uttarakhand faces acute rural distress with hundreds of ghost villages in Pauri and Almora. Revival relies on homestays, horticulture, GI-tagged Himalayan crops (Mandua, Jhangora), and youth eco-entrepreneurship.',
                'उत्तराखंड के पौड़ी और अल्मोड़ा जनपदों में गंभीर पलायन की समस्या है। होमस्टे, बागवानी, मंडुवा व झंगोरा जैसी पारंपरिक फसलों के जीआई टैग तथा जैविक कृषि ही इसका समाधान हैं।',
                [
                  'Palayan factors: Lack of quality health/education, wildlife menace to farming, fragmented terrace holdings',
                  'Remedies: Cluster farming, aromatic herb distillation, mountain tourism infrastructure',
                  'Chief Minister Swarojgar Yojana and Homestay schemes',
                ]
              ),
            ],
          },
        ],
      },
    ],
  },
];

// ============================================================================
// CONSOLIDATED MASTER EXPORT FOR ALL ODD SEMESTERS (SEM 1, 3, 5) ACROSS 11 SUBJECTS
// ============================================================================

export const ALL_ODD_SEMESTER_BA_SUBJECTS: LearnSubjectData[] = [
  ...SEMESTER_1_BA_SUBJECTS,
  ...SEMESTER_1_EXPANDED_BA_SUBJECTS,
  ...SEMESTER_3_BA_SUBJECTS,
  ...SEMESTER_5_BA_SUBJECTS,
];
