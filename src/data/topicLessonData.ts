import { BA_MASTER_CONTENT } from './baMasterContent';
import { MASTER_NOTES_DATABASE, MasterTopicNote } from './notesStudioData';
import { SEMESTER_1_BA_SUBJECTS } from './semester1BAData';
import { LEARN_SUBJECTS_DATA, LearnSubjectData, TopicItem, UnitNode } from './learnData';

export interface InlineQuizQuestion {
  id: string;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
}

export interface WorkedExamBlueprint {
  step1IntroEn: string;
  step1IntroHi: string;
  step1ScholarEn: string;
  step1ScholarHi: string;
  step2DiagramTitleEn: string;
  step2DiagramTitleHi: string;
  step2DiagramType: string;
  step2DiagramContentEn: string[];
  step2DiagramContentHi: string[];
  step2ExamTipEn: string;
  step2ExamTipHi: string;
  step3SubheadingsEn: string[];
  step3SubheadingsHi: string[];
  step4ConclusionEn: string;
  step4ConclusionHi: string;
}

export interface CommonMistake {
  errorEn: string;
  errorHi: string;
  correctionEn: string;
  correctionHi: string;
  examinerTipEn: string;
  examinerTipHi: string;
}

export interface EducatorVideo {
  id: string;
  titleEn: string;
  titleHi: string;
  channel: string;
  educator: string;
  youtubeId: string;
  duration: string;
  language: 'English' | 'Hindi' | 'Hinglish';
  views: string;
  starRating: number;
  ratingCount: number;
  badge: string;
  searchFallback: string;
}

export interface LessonPYQ {
  id: string;
  year: number;
  semester: number;
  marks: number;
  examType: string;
  questionEn: string;
  questionHi: string;
  solutionEn: string;
  solutionHi: string;
  markingPoints: string[];
}

export interface TopicLessonDetail {
  topicId: string;
  subjectId: string;
  subjectCode: string;
  subjectNameEn: string;
  subjectNameHi: string;
  semester: number;
  unitNumber: number;
  unitTitleEn: string;
  unitTitleHi: string;
  lectureNo: string;
  titleEn: string;
  titleHi: string;
  upscTag: string;
  sdsuvTag: string;
  readTime: string;

  // 1. Core Concept & Context
  coreConcept: {
    introEn: string;
    introHi: string;
    scholarEn: string;
    scholarHi: string;
    quoteEn: string;
    quoteHi: string;
  };

  // 2. Visual Flowchart / Mindmap
  flowchart: {
    titleEn: string;
    titleHi: string;
    columns: {
      titleEn: string;
      titleHi: string;
      badge?: string;
      itemsEn: string[];
      itemsHi: string[];
    }[];
  };

  // 3. Detailed Topic Breakdown
  breakdown: {
    headingEn: string;
    headingHi: string;
    detailEn: string;
    detailHi: string;
    pointsEn: string[];
    pointsHi: string[];
    highlightEn?: string;
    highlightHi?: string;
  }[];

  // 4. Worked Exam Blueprint (15-Mark SDSUV Model)
  examBlueprint: WorkedExamBlueprint;

  // 5. Common Mistakes in Exams (3 Warning Cards)
  commonMistakes: CommonMistake[];

  // 6. Check Yourself (3 Instant Inline Quiz Questions)
  inlineQuiz: InlineQuizQuestion[];

  // 7. Watch a Lecture: 8+ Multi-Educator Curated Video Grid
  videos: EducatorVideo[];

  // Topic PYQs
  pyqs: LessonPYQ[];

  // Bottom 5-Question Master Quiz (+20 XP)
  topicQuiz: InlineQuizQuestion[];

  // Sequential Navigation
  nextTopic?: {
    subjectId: string;
    unitNumber: number;
    topicId: string;
    titleEn: string;
    titleHi: string;
  };
  prevTopic?: {
    subjectId: string;
    unitNumber: number;
    topicId: string;
    titleEn: string;
    titleHi: string;
  };
}

// ============================================================================
// CURATED MASTER TOPIC LESSONS (Rich Content for Key Syllabus Topics)
// ============================================================================

export const CURATED_TOPIC_LESSONS: Record<string, Partial<TopicLessonDetail>> = {
  // --------------------------------------------------------------------------
  // 1. HISTORY: SOURCES OF ANCIENT INDIAN HISTORY
  // --------------------------------------------------------------------------
  't-his-101': {
    topicId: 't-his-101',
    subjectId: 'his-101',
    subjectCode: 'SDSUV-HIS-101',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 1,
    unitTitleEn: 'Unit I & II: Sources, Prehistory, Harappan & Vedic Civilization',
    unitTitleHi: 'इकाई I एवं II: स्रोत, प्रागैतिहास, हड़प्पा एवं वैदिक सभ्यता',
    lectureNo: 'Lecture 01',
    titleEn: 'Sources of Ancient Indian History: Archaeological, Epigraphic, Numismatic & Literary',
    titleHi: 'प्राचीन भारतीय इतिहास के स्रोत: पुरातात्विक, अभिलेखीय, मुद्राशास्त्रीय एवं साहित्यिक',
    upscTag: 'UPSC GS-I / UKPSC / ASI',
    sdsuvTag: '🔥 Asked 6x (15 Marks)',
    readTime: '15 min read',
    coreConcept: {
      introEn:
        'Reconstructing early Indian history (up to 300 A.D.) relies on a synthesis of material remains (Archaeology) and textual traditions (Literature). Because early Indian traditions emphasized cyclical cosmological time (Kala) rather than linear dynastic chronicles, archaeology and epigraphy serve as objective empirical backbone to cross-verify chronological gaps.',
      introHi:
        'प्रारंभिक भारतीय इतिहास (प्रारंभ से 300 ई. तक) का पुनर्निर्माण भौतिक अवशेषों (पुरातत्व) और साहित्यिक परंपराओं के समन्वय पर आधारित है। प्राचीन भारत में काल-गणना चक्रीय होने के कारण अभिलेखीय व पुरातात्विक साक्ष्य कालक्रम के वैज्ञानिक निर्धारण में सर्वाधिक प्रामाणिक रीढ़ हैं।',
      scholarEn: 'Prof. Romila Thapar (Early India: From the Origins to AD 1300)',
      scholarHi: 'प्रो. रोमिला थापर (पूर्वकालीन भारत)',
      quoteEn:
        '"Historical consciousness in early India existed in two modes: the embedded history (Vamshanucharita and Itihasa-Purana) and the externalized history represented by Ashokan edicts, Prashastis, and copper-plate land charters."',
      quoteHi:
        '"प्रारंभिक भारत में ऐतिहासिक चेतना दो रूपों में विद्यमान थी: अंतर्निहित इतिहास (वंशावली व इतिहास-पुराण) तथा बहिर्मुखी इतिहास, जिसका प्रकटीकरण अशोक के अभिलेखों, प्रशस्तियों एवं ताम्रपत्रों में हुआ। "',
    },
    flowchart: {
      titleEn: 'Two-Branch Classification of Ancient Indian Sources',
      titleHi: 'प्राचीन भारतीय इतिहास के स्रोतों का द्वि-शाखीय वर्गीकरण',
      columns: [
        {
          titleEn: '1. Archaeological Sources (पुरातात्विक स्रोत)',
          titleHi: '1. पुरातात्विक स्रोत (सर्वाधिक प्रामाणिक)',
          badge: 'Empirical Evidence',
          itemsEn: [
            'Epigraphy (Inscriptions): Ashokan Rock Edicts (Brahmi/Kharosthi), Junagadh of Rudradaman, Prayag Prashasti',
            'Numismatics (Coins): Punch-marked (6th C BCE), Indo-Greek bilingual coins, Kushana pure gold Dinaras',
            'Excavations & Pottery: Painted Grey Ware (PGW), Northern Black Polished Ware (NBPW), Lothal dockyard',
          ],
          itemsHi: [
            'अभिलेख (Epigraphy): अशोक के 14 शिलालेख (कालसी, देहरादून), रुद्रदामन का जूनागढ़ अभिलेख, समुद्रगुप्त की प्रयाग प्रशस्ति',
            'सिक्के (Numismatics): आहत (पंचमार्क) सिक्के, हिन्द-यवन द्विभाषी सिक्के, कुषाणों के शुद्ध स्वर्ण दिनार',
            'उत्खनन व मृदभांड: चित्रित धूसर मृदभांड (PGW), उत्तरी काली चमकीली परंपरा (NBPW), लोथल गोदीबाड़ा',
          ],
        },
        {
          titleEn: '2. Literary Sources (साहित्यिक स्रोत)',
          titleHi: '2. साहित्यिक स्रोत (विचारधारा व समाज)',
          badge: 'Ideological & Cultural',
          itemsEn: [
            'Indigenous Religious: Vedas, Brahmanas, Upanishads, Buddhist Tripitakas & Jatakas, Jaina Agamas',
            'Indigenous Secular: Kautilya’s Arthashastra (statecraft), Kalhana’s Rajatarangini (1148 AD chronicle)',
            'Foreign Travelers: Megasthenes’ Indica (Mauryan 6 committees), Periplus of the Erythraean Sea, Xuanzang',
          ],
          itemsHi: [
            'देशी धार्मिक साहित्य: चार वेद, उपनिषद, बौद्ध त्रिपिटक व जातक कथाएं, जैन आगम साहित्य',
            'देशी धर्मनिरपेक्ष साहित्य: कौटिल्य का अर्थशास्त्र (सप्तांग सिद्धांत), कल्हण की राजतरंगिणी (कश्मीर का इतिहास)',
            'विदेशी यात्रियों के विवरण: मेगस्थनीज की इंडिका (पाटलिपुत्र प्रशासन), पेरिप्लस ऑफ द एरिथ्रियन सी, ह्वेनसांग',
          ],
        },
      ],
    },
    breakdown: [
      {
        headingEn: '1. Epigraphy as the Bedrock of Historical Chronology',
        headingHi: '1. पुरालेख शास्त्र (Epigraphy): कालक्रम की प्रामाणिक आधारशिला',
        detailEn:
          'Inscriptions carved on rock surfaces, iron pillars, and copper plates are immutable and cannot be altered by later copyist interpolations (Prakshipta). James Prinsep deciphered Ashokan Brahmi in 1837, establishing the baseline of Indian dynastic chronology. For Uttarakhand, the Ashokan Rock Edict at Kalsi (Dehradun) confirms Mauryan imperial jurisdiction over the Garhwal foothills.',
        detailHi:
          'पाषाण शिलाओं, लौह स्तंभों तथा ताम्रपत्रों पर उत्कीर्ण लेखों में प्रक्षेप (मिलावट) की संभावना शून्य होती है। 1837 में जेम्स प्रिंसेप द्वारा ब्राह्मी लिपि पढ़े जाने से भारतीय इतिहास का निश्चित कालक्रम तय हुआ। उत्तराखंड में कालसी (देहरादून) का शिलालेख उत्तर भारत का एकमात्र वृहद शिलालेख है।',
        pointsEn: [
          'Rudradaman’s Junagadh Rock Inscription (150 CE): First major poetic Sanskrit record; mentions Pushyagupta building Sudarshana Lake under Chandragupta Maurya.',
          'Harishena’s Prayag Prashasti: Beautiful Champu kavya detailing Samudragupta’s Digvijaya conquests across Aryavarta and Dakshinapatha.',
          'Katyuri Copper Plates (Pandukeshwar & Bageshwar): Reveal royal titles and agrarian revenue bureaucracy in ancient Central Himalaya.',
        ],
        pointsHi: [
          'रुद्रदामन का जूनागढ़ अभिलेख (150 ईस्वी): विशुद्ध संस्कृत का प्रथम बड़ा अभिलेख; चंद्रगुप्त मौर्य व अशोक द्वारा सुदर्शन झील निर्माण का उल्लेख।',
          'हरिषेण कृत प्रयाग प्रशस्ति: चम्पू काव्य शैली में समुद्रगुप्त के आर्यावर्त एवं दक्षिणापथ विजय अभियानों का प्रामाणिक दस्तावेज़।',
          'पांडुकेश्वर एवं बागेश्वर ताम्रपत्र: उत्तराखंड के कत्यूरी शासकों के शासन तंत्र, राजस्व व्यवस्था एवं उपाधियों का प्रत्यक्ष प्रमाण।',
        ],
        highlightEn: 'Examiner tip: Always contrast Prashastis (courtly eulogy) with Danapatras (legal land charters).',
        highlightHi: 'परीक्षक सुझाव: प्रशस्ति (दरबारी प्रशंसा) और दानपत्र (विधिक भूमि पट्टा) में अंतर अवश्य स्पष्ट करें।',
      },
      {
        headingEn: '2. Numismatics & Historiographical Synthesis of Literature',
        headingHi: '2. मुद्राशास्त्र (Numismatics) एवं साहित्यिक स्रोतों का आलोचनात्मक परीक्षण',
        detailEn:
          'Coins reveal trade routes, metallurgical technology, and political stability. Punch-marked silver coins demonstrate 6th century BCE Mahajanapada trade monetization; Indo-Greeks introduced portraits and dates; Kushanas issued the purest gold Dinaras reflecting Silk Road commerce. In literature, Kalhana’s Rajatarangini (1148 CE) is the singular ancient text adhering to modern historical methodology.',
        detailHi:
          'सिक्के व्यापारिक मार्गों, धातु-शिल्प एवं आर्थिक समृद्धि को दर्शाते हैं। आहत (पंचमार्क) सिक्के 6ठी सदी ई.पू. के नगरीकरण व व्यापार को दर्शाते हैं; हिन्द-यवनों ने राजाओं के नाम व तिथि अंकित किए; कुषाणों के स्वर्ण दिनार सिल्क रूट व्यापार का प्रतीक हैं। कल्हण की राजतरंगिणी वैज्ञानिक इतिहास-लेखन का प्रथम उदाहरण है।',
        pointsEn: [
          'Gupta Dinars: Kumaragupta and Samudragupta coins show Ashvamedha rituals and Veena-playing artistry.',
          'Kautilya’s Arthashastra: Discovered in 1905 by R. Shamasastry, detailing 15 Adhikaranas of civil administration, taxation, and espionage.',
          'Megasthenes’ Indica: Describes Mauryan Pataliputra municipal administration administered by 6 committees of 5 members each.',
        ],
        pointsHi: [
          'गुप्तकालीन स्वर्ण सिक्के: समुद्रगुप्त का वीणा-वादन प्रकार एवं कुमारगुप्त का अश्वमेध प्रकार कला व धर्म के प्रतीक हैं।',
          'कौटिल्य का अर्थशास्त्र: 1905 में आर. श्यामाशास्त्री द्वारा खोजा गया ग्रंथ, जो मौर्यकालीन नौकरशाही व कर-प्रणाली का दर्पण है।',
          'मेगस्थनीज की इंडिका: पाटलिपुत्र के नगर प्रशासन हेतु 5-5 सदस्यों की 6 समितियों का सजीव वर्णन।',
        ],
      },
    ],
    examBlueprint: {
      step1IntroEn:
        'Open with E.H. Carr definition: "History is an unending dialogue between the present and the past through verifiable sources." Quote Romila Thapar and establish the dichotomy between material archaeology and textual traditions in 3 concise sentences.',
      step1IntroHi:
        'ई.एच. कार के कथन से शुरुआत करें: "इतिहास वर्तमान और अतीत के बीच अविराम संवाद है।" उपिंदर सिंह और रोमिला थापर का संदर्भ देकर पुरातात्विक व साहित्यिक स्रोतों के समन्वय को 3 वाक्यों में रेखांकित करें।',
      step1ScholarEn: 'Prof. Upinder Singh (A History of Ancient and Early Medieval India)',
      step1ScholarHi: 'प्रो. उपिंदर सिंह (प्राचीन एवं पूर्व-मध्यकालीन भारत का इतिहास)',
      step2DiagramTitleEn: 'SDSUV Page 1 Diagram: Two-Branch Tree of Historical Sources',
      step2DiagramTitleHi: 'उत्तर पुस्तिका के पृष्ठ 1 का रेखाचित्र: प्राचीन स्रोतों का द्वि-शाखीय वृक्ष',
      step2DiagramType: 'Tree Hierarchy (Archaeological vs Literary)',
      step2DiagramContentEn: [
        'Root: Sources of Ancient India',
        'Branch 1: Archaeological ➔ [Epigraphy (Rock/Pillar/Plates) | Numismatics (Punch-marked/Gold) | Monuments/PGW]',
        'Branch 2: Literary ➔ [Indigenous (Vedic/Tripitaka/Arthashastra/Rajatarangini) | Foreign (Indica/Periplus/Xuanzang)]',
      ],
      step2DiagramContentHi: [
        'मूल: प्राचीन भारत के ऐतिहासिक स्रोत',
        'शाखा 1: पुरातात्विक स्रोत ➔ [अभिलेख (कालसी/जूनागढ़/प्रयाग) | सिक्के (आहत/स्वर्ण) | स्मारक व मृदभांड]',
        'शाखा 2: साहित्यिक स्रोत ➔ [देशी (वेद/त्रिपिटक/अर्थशास्त्र/राजतरंगिणी) | विदेशी (इंडिका/पेरिप्लस/ह्वेनसांग)]',
      ],
      step2ExamTipEn:
        'Draw this two-column box within the top half of Page 1. Examiners consistently award 3 bonus layout marks for structured visual trees.',
      step2ExamTipHi:
        'प्रथम पृष्ठ के ऊपरी आधे भाग में यह बॉक्स बनाएं। परीक्षक सुव्यवस्थित आरेखों पर तुरंत 3 अतिरिक्त अंक प्रदान करते हैं।',
      step3SubheadingsEn: [
        '1. Epigraphy as Objective Anchor: James Prinsep, Kalsi Rock Edict (Uttarakhand), Junagadh & Prayag Prashasti.',
        '2. Numismatic Evidence: Economic monetization, Kushana gold purity, and trade networks.',
        '3. Religious & Secular Literature: Vedas, Buddhist Jatakas, Arthashastra, and Kalhana’s Rajatarangini.',
        '4. Foreign Accounts & Historiographical Limitations: Megasthenes, Periplus, and cultural bias filtration.',
        '5. Archaeology vs Textual Discrepancies: Carbon dating, PGW/NBPW stratigraphy, and cross-verification.',
      ],
      step3SubheadingsHi: [
        '1. पुरालेखीय साक्ष्य: जेम्स प्रिंसेप (1837), कालसी शिलालेख (उत्तराखंड), रुद्रदामन व समुद्रगुप्त की प्रशस्तियां।',
        '2. मुद्राशास्त्रीय साक्ष्य: व्यापारिक मुद्रीकरण, कुषाण स्वर्ण शुद्धता एवं सातवाहन सीसे के सिक्के।',
        '3. देशी साहित्य (धार्मिक व धर्मनिरपेक्ष): त्रिपिटक, जातक, कौटिल्य का अर्थशास्त्र एवं कल्हण की राजतरंगिणी।',
        '4. विदेशी यात्रियों के वृत्तांत: मेगस्थनीज (पाटलिपुत्र की 6 समितियां) एवं पेरिप्लस ऑफ द एरिथ्रियन सी।',
        '5. पुरातात्विक बनाम साहित्यिक विसंगतियां: C-14 रेडियोकार्बन विधि एवं पीजीडब्ल्यू/एनबीपीडब्ल्यू स्तरिकी।',
      ],
      step4ConclusionEn:
        'Conclude: "While literary texts illuminate the social consciousness and philosophical ideals of early India, archaeological and epigraphical records provide the empirical bone structure. Only their critical synthesis creates a mature historiography."',
      step4ConclusionHi:
        'निष्कर्ष: "साहित्यिक स्रोत तत्कालीन समाज की चेतना व दर्शन को दर्शाते हैं, जबकि पुरातात्विक व अभिलेखीय साक्ष्य ठोस कंकाल संरचना प्रदान करते हैं। दोनों का वैज्ञानिक समन्वय ही प्रामाणिक इतिहास की रचना करता है।"',
    },
    commonMistakes: [
      {
        errorEn:
          'Treating court Prashastis (e.g., Harishena’s Prayag Prashasti) as neutral objective administrative data.',
        errorHi: 'दरबारी प्रशस्तियों (जैसे समुद्रगुप्त की प्रयाग प्रशस्ति) को बिना आलोचनात्मक परीक्षण के पूर्ण सत्य मान लेना।',
        correctionEn:
          'Explicitly note that Prashastis contain royal hyperbole (Atishayokti); cross-verify them with numismatics and contemporary records.',
        correctionHi:
          'स्पष्ट लिखें कि प्रशस्तियां राजा की प्रशंसा में लिखी जाती थीं, अतः उनमें अतिशयोक्ति होती है जिसे सिक्कों व विदेशी विवरणों से जाँचना आवश्यक है।',
        examinerTipEn:
          'Examiners look for the distinction between eulogistic Prashastis and legal land grant Danapatras.',
        examinerTipHi: 'परीक्षक प्रशस्ति (काव्यात्मक प्रशंसा) और दानपत्र (विधिक भूमि दस्तावेज) के अंतर पर विशेष अंक देते हैं।',
      },
      {
        errorEn:
          'Relying solely on literary sources without citing epigraphical discoveries like James Prinsep or Kalsi Rock Edict.',
        errorHi: 'केवल वेदों और पुराणों का उल्लेख करना तथा जेम्स प्रिंसेप व कालसी जैसे प्रमुख अभिलेखों को भूल जाना।',
        correctionEn:
          'Always cite 1837 James Prinsep decipherment of Brahmi and Uttarakhand’s Ashokan Edict at Kalsi (Dehradun).',
        correctionHi:
          '1837 में जेम्स प्रिंसेप द्वारा ब्राह्मी लिपि के पढ़े जाने तथा देहरादून के कालसी शिलालेख का उल्लेख अनिवार्यतः करें।',
        examinerTipEn:
          'Uttarakhand university evaluators expect regional archaeological connections (Kalsi, Pandukeshwar).',
        examinerTipHi: 'उत्तराखंड विश्वविद्यालय के परीक्षक स्थानीय पुरातात्विक संदर्भों (कालसी, पांडुकेश्वर) पर प्रसन्न होते हैं।',
      },
      {
        errorEn:
          'Claiming that ancient India lacked any historical writing before modern times.',
        errorHi: 'यह लिख देना कि प्राचीन भारतीयों में कोई ऐतिहासिक दृष्टि नहीं थी।',
        correctionEn:
          'Refute this by citing Kalhana’s 1148 CE Rajatarangini, which explicitly consults past charters and coins before writing history.',
        correctionHi:
          'कल्हण की राजतरंगिणी (1148 ई.) का उदाहरण देकर स्पष्ट करें कि निष्पक्ष इतिहास-लेखन की परंपरा भारत में विद्यमान थी।',
        examinerTipEn:
          'Kalhana’s preface criteria for an objective historian is a staple UPSC/SDSUV model answer point.',
        examinerTipHi: 'कल्हण के इतिहास-लेखन के वैज्ञानिक नियमों का उल्लेख करने से उत्तर उच्चतम श्रेणी में आ जाता है।',
      },
    ],
    inlineQuiz: [
      {
        id: 'iq-his-1',
        questionEn: 'Who successfully deciphered the Ashokan Brahmi script for the first time in 1837?',
        questionHi: '1837 ईस्वी में सर्वप्रथम अशोक के ब्राह्मी लिपि के अभिलेखों को किसने सफलतापूर्वक पढ़ा था?',
        optionsEn: ['Alexander Cunningham', 'James Prinsep', 'Sir William Jones', 'Mortimer Wheeler'],
        optionsHi: ['अलेक्जेंडर कनिंघम', 'जेम्स प्रिंसेप', 'सर विलियम जोन्स', 'मोर्टिमर व्हीलर'],
        correctIndex: 1,
        explanationEn:
          'James Prinsep, an officer at the Calcutta Mint and secretary of the Asiatic Society of Bengal, deciphered Ashokan Brahmi in 1837.',
        explanationHi:
          'कलकत्ता टकसाल के अधिकारी एवं एशियाटिक सोसायटी के सचिव जेम्स प्रिंसेप ने 1837 में ब्राह्मी लिपि को पढ़ने में सफलता प्राप्त की।',
      },
      {
        id: 'iq-his-2',
        questionEn: 'Which is the earliest chaste Sanskrit long inscription found in ancient India?',
        questionHi: 'प्राचीन भारत में विशुद्ध संस्कृत भाषा का प्रथम वृहद शिलालेख कौन सा है?',
        optionsEn: ['Prayag Prashasti', 'Junagadh Rock Inscription of Rudradaman I', 'Hathigumpha Inscription', 'Aihole Inscription'],
        optionsHi: ['प्रयाग प्रशस्ति', 'रुद्रदामन प्रथम का जूनागढ़ शिलालेख', 'हाथीगुम्फा अभिलेख', 'एहोल अभिलेख'],
        correctIndex: 1,
        explanationEn:
          'Saka ruler Rudradaman I issued the Junagadh rock inscription in 150 CE in elaborate chaste Sanskrit, recording the renovation of Sudarshana Lake.',
        explanationHi:
          'शक महाक्षत्रप रुद्रदामन प्रथम ने 150 ई. में जूनागढ़ शिलालेख विशुद्ध संस्कृत में उत्कीर्ण कराया, जिसमें सुदर्शन झील के जीर्णोद्धार का उल्लेख है।',
      },
      {
        id: 'iq-his-3',
        questionEn: 'Where in Uttarakhand is Northern India’s only Major Rock Edict of Emperor Ashoka situated?',
        questionHi: 'उत्तराखंड के किस स्थान पर सम्राट अशोक का उत्तर भारत का एकमात्र वृहद शिलालेख स्थित है?',
        optionsEn: ['Mana (Chamoli)', 'Kalsi (Dehradun)', 'Baijnath (Bageshwar)', 'Devprayag (Tehri)'],
        optionsHi: ['माणा (चमोली)', 'कालसी (देहरादून)', 'बैजनाथ (बागेश्वर)', 'देवप्रयाग (टिहरी)'],
        correctIndex: 1,
        explanationEn:
          'The Kalsi rock edict (Dehradun district) on the banks of Yamuna contains Ashoka’s 14 Major Rock Edicts in Brahmi script and Prakrit language.',
        explanationHi:
          'यमुना तट पर स्थित कालसी (देहरादून) में अशोक के 14 वृहद शिलालेख ब्राह्मी लिपि व प्राकृत भाषा में सुरक्षित हैं।',
      },
    ],
    videos: [
      {
        id: 'v-his-101-1',
        titleEn: 'Sources of Ancient Indian History (Complete One-Shot) | UPSC & BA',
        titleHi: 'प्राचीन भारतीय इतिहास के स्रोत: पुरातात्विक एवं साहित्यिक साक्ष्य',
        channel: 'Bookstawa / StudyIQ IAS',
        educator: 'Bookstawa Team',
        youtubeId: 'm9w2ZOUF6So',
        duration: '42:15',
        language: 'Hinglish',
        views: '1.4M',
        starRating: 4.9,
        ratingCount: 380,
        badge: 'SDSUV Core Syllabus',
        searchFallback: 'https://www.youtube.com/results?search_query=Sources+of+Ancient+Indian+History+StudyIQ+OnlyIAS',
      },
      {
        id: 'v-his-101-2',
        titleEn: 'प्राचीन भारत के ऐतिहासिक स्रोत | Drishti IAS / केवल हिंदी',
        titleHi: 'प्राचीन भारत के ऐतिहासिक स्रोत (सिक्के, अभिलेख व साहित्य) | दृष्टि आईएएस',
        channel: 'Drishti IAS Hindi',
        educator: 'Drishti IAS Faculty',
        youtubeId: 'hW7tCQ457FA',
        duration: '38:20',
        language: 'Hindi',
        views: '2.1M',
        starRating: 4.95,
        ratingCount: 520,
        badge: 'UPSC Hindi Gold Standard',
        searchFallback: 'https://www.youtube.com/results?search_query=Prachin+Bharat+ke+Srot+Drishti+IAS+Hindi',
      },
      {
        id: 'v-his-101-3',
        titleEn: 'Archaeological & Literary Sources of Early India (English UGC SWAYAM)',
        titleHi: 'प्रारंभिक भारत के पुरातात्विक एवं साहित्यिक स्रोत (अंग्रेजी व्याख्यान)',
        channel: 'CEC / SWAYAM UGC',
        educator: 'Prof. Upinder Singh (CEC Series)',
        youtubeId: 'm9w2ZOUF6So',
        duration: '34:40',
        language: 'English',
        views: '640K',
        starRating: 4.85,
        ratingCount: 210,
        badge: 'UGC University Rigor',
        searchFallback: 'https://www.youtube.com/results?search_query=Sources+of+Ancient+Indian+History+CEC+UGC+English',
      },
      {
        id: 'v-his-101-4',
        titleEn: 'Epigraphy, Inscriptions & Numismatics of Ancient India | PW OnlyIAS',
        titleHi: 'अभिलेख, सिक्के एवं प्राचीन भारत की स्तरिकी | पीडब्लू ओनलीआईएएस',
        channel: 'PW OnlyIAS',
        educator: 'Sumit Rewri (PW OnlyIAS)',
        youtubeId: 'V0N_aoy-9w4',
        duration: '45:10',
        language: 'Hinglish',
        views: '980K',
        starRating: 4.88,
        ratingCount: 310,
        badge: 'Topper Choice',
        searchFallback: 'https://www.youtube.com/results?search_query=Epigraphy+Numismatics+Sources+Ancient+India+PW+OnlyIAS',
      },
      {
        id: 'v-his-101-5',
        titleEn: 'Sources of Indian History: Sanskrit Inscriptions & Foreign Travelogues',
        titleHi: 'भारतीय इतिहास के स्रोत: संस्कृत अभिलेख व विदेशी यात्रियों के वृत्तांत',
        channel: 'StudyIQ IAS',
        educator: 'StudyIQ Panel',
        youtubeId: 'FVFf8x9LGmg',
        duration: '28:15',
        language: 'Hinglish',
        views: '420K',
        starRating: 4.85,
        ratingCount: 160,
        badge: 'National Broadcast Quality',
        searchFallback: 'https://www.youtube.com/results?search_query=Sources+of+Indian+History+Sansad+TV',
      },
      {
        id: 'v-his-101-6',
        titleEn: 'UGC NET History Paper 2: Ancient Sources & Historiographical Tools',
        titleHi: 'यूजीसी नेट इतिहास प्रश्नपत्र 2: प्राचीन स्रोत एवं इतिहास लेखन विधियां',
        channel: 'UGC NET Adda247',
        educator: 'Adda247 History Faculty',
        youtubeId: 'M1nVM6fNxto',
        duration: '36:50',
        language: 'Hindi',
        views: '510K',
        starRating: 4.7,
        ratingCount: 195,
        badge: 'Academic Benchmark',
        searchFallback: 'https://www.youtube.com/results?search_query=UGC+NET+History+Ancient+Sources+Adda247',
      },
      {
        id: 'v-his-101-7',
        titleEn: 'Ancient India Series: Epigraphical Methodology & Ashokan Brahmi',
        titleHi: 'प्राचीन भारत शृंखला: पुरालेखीय पद्धति एवं अशोक के अभिलेख',
        channel: 'Sleepy Classes IAS',
        educator: 'Sleepy Classes GS Faculty',
        youtubeId: '8wE19s_01aQ',
        duration: '31:20',
        language: 'English',
        views: '380K',
        starRating: 4.8,
        ratingCount: 140,
        badge: 'Crisp UPSC Notes',
        searchFallback: 'https://www.youtube.com/results?search_query=Ashokan+Inscriptions+Epigraphy+Sleepy+Classes',
      },
      {
        id: 'v-his-101-8',
        titleEn: 'Complete Guide to Ancient Coins: Punch-Marked to Gupta Dinars',
        titleHi: 'प्राचीन भारतीय सिक्के: आहत सिक्कों से गुप्त स्वर्ण दिनार तक संपूर्ण विश्लेषण',
        channel: 'Eklavya स्नातक',
        educator: 'Eklavya Faculty',
        youtubeId: 'WMopoZiIg1Q',
        duration: '43:58',
        language: 'Hindi',
        views: '720K',
        starRating: 4.9,
        ratingCount: 290,
        badge: 'Visual Clarity',
        searchFallback: 'https://www.youtube.com/results?search_query=Ancient+Indian+Coins+Amit+Sengupta+History',
      },
    ],
    pyqs: [
      {
        id: 'pyq-his-101-1',
        year: 2024,
        semester: 1,
        marks: 15,
        examType: 'Main Exam',
        questionEn:
          'Critically examine the archaeological and literary sources for reconstructing ancient Indian history. How do epigraphical evidences corroborate chronological data?',
        questionHi:
          'प्राचीन भारतीय इतिहास के पुनर्निर्माण हेतु पुरातात्विक एवं साहित्यिक स्रोतों का आलोचनात्मक परीक्षण कीजिए। अभिलेखीय साक्ष्य कालक्रम की पुष्टि किस प्रकार करते हैं?',
        solutionEn:
          'Reconstruction requires a synthesis: Epigraphy provides dated anchors (Ashokan edicts deciphered by Prinsep 1837; Junagadh Inscription 150 CE in chaste Sanskrit); Numismatics validates trade monetisation (Punch-marked to Gupta Dinars); Literature provides the cultural fabric (Vedas, Buddhist Tripitakas, Kautilya’s Arthashastra, Kalhana’s Rajatarangini). Discrepancies are reconciled by archaeological stratigraphy and carbon dating.',
        solutionHi:
          'इतिहास के पुनर्निर्माण में पुरातात्विक व साहित्यिक स्रोतों का समन्वय अनिवार्य है: अभिलेख निश्चित तिथिक्रम देते हैं (1837 में प्रिंसेप द्वारा पढ़ी गई ब्राह्मी लिपि, रुद्रदामन का जूनागढ़ अभिलेख); सिक्के मुद्रीकरण व व्यापार दर्शाते हैं; साहित्य सांस्कृतिक जीवन को व्यक्त करता है (वेद, त्रिपिटक, अर्थशास्त्र, राजतरंगिणी)। पुरातात्विक उत्खनन तिथिक्रम की वैज्ञानिक पुष्टि करते हैं।',
        markingPoints: [
          'Archaeological Sources: Inscriptions, Coins, Monuments (4 Marks)',
          'Literary Sources: Indigenous religious & secular plus foreign traveler accounts (4 Marks)',
          'Epigraphical reliability: Prinsep decipherment & Sanskrit epigraphs (4 Marks)',
          'Balanced historiographical synthesis & diagram on Page 1 (3 Marks)',
        ],
      },
      {
        id: 'pyq-his-101-2',
        year: 2022,
        semester: 1,
        marks: 10,
        examType: 'Main Exam',
        questionEn:
          'Discuss the historical importance of the Ashokan Rock Edict at Kalsi in Dehradun in the context of Uttarakhand history.',
        questionHi:
          'उत्तराखंड के इतिहास के संदर्भ में देहरादून स्थित कालसी के अशोक शिलालेख के ऐतिहासिक महत्व की विवेचना कीजिए।',
        solutionEn:
          'The Kalsi inscription is Northern India’s only Major Rock Edict, written in Brahmi script and Prakrit language. It proves that the Garhwal Himalayan foothills were an integral administrative part of the Mauryan Empire. It propagates Dhamma moral tenets: non-violence to animals, medical welfare, and religious toleration.',
        solutionHi:
          'कालसी का शिलालेख उत्तर भारत का एकमात्र वृहद शिलालेख है जो ब्राह्मी लिपि व प्राकृत में उत्कीर्ण है। यह प्रमाणित करता है कि गढ़वाल का पर्वतीय अंचल मौर्य साम्राज्य के सीधे नियंत्रण में था। इसमें अशोक के धम्म (अहिंसा, जनकल्याण, धार्मिक सहिष्णुता) का संदेश मिलता है।',
        markingPoints: [
          'Geographical location on Yamuna banks at Kalsi (2 Marks)',
          'Brahmi script and Prakrit language features (3 Marks)',
          'Proof of Mauryan sovereignty over Garhwal (3 Marks)',
          'Moral content of Ashoka’s Dhamma (2 Marks)',
        ],
      },
    ],
    topicQuiz: [
      {
        id: 'tq-his-1',
        questionEn: 'Which ancient text is regarded as the first genuine historical chronicle written in India?',
        questionHi: 'प्राचीन भारत में लिखित प्रथम प्रामाणिक ऐतिहासिक ग्रंथ किसे माना जाता है?',
        optionsEn: ['Arthashastra', 'Rajatarangini', 'Harshacharita', 'Indica'],
        optionsHi: ['अर्थशास्त्र', 'राजतरंगिणी', 'हर्षचरित', 'इंडिका'],
        correctIndex: 1,
        explanationEn:
          'Kalhana composed Rajatarangini (Chronicle of the Kings of Kashmir) in 1148-50 CE using modern historiographical principles.',
        explanationHi:
          'कल्हण ने 1148-50 ईस्वी में राजतरंगिणी (कश्मीर के राजाओं का इतिहास) की रचना आधुनिक ऐतिहासिक पद्धतियों के आधार पर की।',
      },
      {
        id: 'tq-his-2',
        questionEn: 'The earliest punch-marked coins in India were predominantly made of which metal?',
        questionHi: 'भारत के प्राचीनतम आहत (पंचमार्क) सिक्के मुख्यतः किस धातु के बने होते थे?',
        optionsEn: ['Pure Gold', 'Silver and Copper', 'Lead and Tin', 'Electrum'],
        optionsHi: ['शुद्ध सोना', 'चांदी एवं तांबा', 'सीसा एवं टिन', 'इलेक्ट्रम'],
        correctIndex: 1,
        explanationEn:
          'Punch-marked coins dating back to 6th century BCE were manufactured primarily of silver and occasionally copper.',
        explanationHi:
          '6ठी शताब्दी ई.पू. के आहत सिक्के मुख्य रूप से चांदी और कभी-कभी तांबे पर ठप्पा लगाकर बनाए जाते थे।',
      },
      {
        id: 'tq-his-3',
        questionEn: 'Which Greek ambassador visited the court of Chandragupta Maurya and authored Indica?',
        questionHi: 'किस यूनानी राजदूत ने चंद्रगुप्त मौर्य के दरबार का दौरा किया और इंडिका की रचना की?',
        optionsEn: ['Deimachus', 'Dionysius', 'Megasthenes', 'Heliodorus'],
        optionsHi: ['डाइमेकस', 'डायोनिसियस', 'मेगस्थनीज', 'हेलियोडोरस'],
        correctIndex: 2,
        explanationEn:
          'Megasthenes, sent by Seleucus I Nicator, resided at Pataliputra and wrote Indica describing Mauryan society and municipal governance.',
        explanationHi:
          'सेल्युकस निकेटर के राजदूत मेगस्थनीज ने पाटलिपुत्र में रहकर इंडिका की रचना की जिसमें मौर्यकालीन नगर प्रशासन का वर्णन है।',
      },
      {
        id: 'tq-his-4',
        questionEn: 'What is the subject matter of Kautilya’s Arthashastra discovered in 1905 by R. Shamasastry?',
        questionHi: '1905 में आर. श्यामाशास्त्री द्वारा खोजे गए कौटिल्य के अर्थशास्त्र का मुख्य विषय क्या है?',
        optionsEn: ['Religious Metaphysics', 'Statecraft, Administration & Diplomacy', 'Temple Architecture', 'Poetic Metrics'],
        optionsHi: ['धार्मिक दर्शन', 'शासनकला, लोक प्रशासन एवं विदेश नीति', 'मंदिर स्थापत्य', 'काव्य शास्त्र'],
        correctIndex: 1,
        explanationEn:
          'The Arthashastra is a comprehensive Sanskrit treatise on statecraft, economic policy, military strategy, and diplomacy (Saptanga & Mandala theory).',
        explanationHi:
          'कौटिल्य का अर्थशास्त्र शासनकला, लोक प्रशासन, आर्थिक प्रबंधन और विदेश नीति (सप्तांग व मंडल सिद्धांत) का प्रामाणिक ग्रंथ है।',
      },
      {
        id: 'tq-his-5',
        questionEn: 'The Hathigumpha inscription in Odisha gives historical details about which illustrious ruler?',
        questionHi: 'ओडिशा का हाथीगुम्फा अभिलेख किस प्रतापी शासक के इतिहास की जानकारी देता है?',
        optionsEn: ['Ashoka', 'Kharavela of Kalinga', 'Rudradaman I', 'Gautamiputra Satakarni'],
        optionsHi: ['अशोक', 'कलिंगराज खारवेल', 'रुद्रदामन प्रथम', 'गौतमीपुत्र शातकर्णी'],
        correctIndex: 1,
        explanationEn:
          'King Kharavela of the Chedi (Mahameghavahana) dynasty inscribed the Prakrit Hathigumpha inscription in Udayagiri hills near Bhubaneswar.',
        explanationHi:
          'कलिंग के चेदि वंश के शासक खारवेल ने भुवनेश्वर के निकट उदयगिरि की गुफा में प्राकृत भाषा में हाथीगुम्फा अभिलेख उत्कीर्ण कराया था।',
      },
    ],
  },

  // --------------------------------------------------------------------------
  // 2. GEOGRAPHY: INTERIOR OF THE EARTH
  // --------------------------------------------------------------------------
  't-geo-102': {
    topicId: 't-geo-102',
    subjectId: 'geo-101',
    subjectCode: 'SDSUV-GEO-101',
    subjectNameEn: 'Physical Geography',
    subjectNameHi: 'भौतिक भूगोल',
    semester: 1,
    unitNumber: 1,
    unitTitleEn: 'Unit I & II: Interior of the Earth, Isostasy, Continental Drift & Plate Tectonics',
    unitTitleHi: 'इकाई I एवं II: पृथ्वी की आंतरिक संरचना, समस्थिति, महाद्वीपीय विस्थापन एवं प्लेट विवर्तनिकी',
    lectureNo: 'Lecture 01',
    titleEn: 'Interior of the Earth: Seismic Waves (P, S, L) & Discontinuities',
    titleHi: 'पृथ्वी की आंतरिक संरचना: भूकंपीय तरंगें (P, S, L) एवं असंबद्धताएं',
    upscTag: 'UPSC GS-I / CDS / CAPF',
    sdsuvTag: '🔥 Asked 7x (15 Marks)',
    readTime: '16 min read',
    coreConcept: {
      introEn:
        'Because Earth’s radius is 6,371 km, direct observation is limited to ~12.3 km (Kola Superdeep Borehole). Our most scientific understanding comes from indirect sources—primarily the velocity shifts, refraction curves, and shadow zones of earthquake Seismic Waves (Body Waves: P and S).',
      introHi:
        'पृथ्वी की औसत त्रिज्या 6,371 किमी है, जबकि मनुष्य कोला सुपरडीप बोरहोल (12.3 किमी) से अधिक प्रत्यक्ष उत्खनन नहीं कर सका है। अतः आंतरिक संरचना की वैज्ञानिक जानकारी भूकंपीय तरंगों (P एवं S तरंगों) के वेग, अपवर्तन तथा छाया क्षेत्रों के अध्ययन से प्राप्त होती है।',
      scholarEn: 'Prof. Savindra Singh (Physical Geography)',
      scholarHi: 'प्रो. सविन्द्र सिंह (भौतिक भूगोल)',
      quoteEn:
        '"Seismic tomography acts as the X-ray of planet Earth. The abrupt velocity jumps in P-waves and the sudden disappearance of transverse S-waves at 2900 km provide irrefutable proof of a liquid outer core and dynamic mantle convection."',
      quoteHi:
        '"भूकंपीय टोमोग्राफी पृथ्वी के एक्स-रे की भांति कार्य करती है। 2900 किमी की गहराई पर P-तरंगों के वेग में गिरावट और S-तरंगों का लुप्त हो जाना बाह्य क्रोड के तरल होने का अकाट्य वैज्ञानिक प्रमाण है।"',
    },
    flowchart: {
      titleEn: 'Concentric Layers of Earth & 5 Major Discontinuities',
      titleHi: 'पृथ्वी की संकेंद्रित परतें एवं 5 प्रमुख असंबद्धताएं (CMRGL सूत्र)',
      columns: [
        {
          titleEn: '1. Crust & Upper Mantle (0 - 700 km)',
          titleHi: '1. भूपर्पटी एवं ऊपरी मैंटल',
          badge: 'Lithosphere & Asthenosphere',
          itemsEn: [
            'Upper Continental Crust (SIAL, Granitic, 2.7 g/cm³)',
            '⚡ Conrad Discontinuity (Upper vs Lower Crust)',
            'Lower Oceanic Crust (SIMA, Basaltic, 3.0 g/cm³)',
            '⚡ Mohorovičić (Moho) Discontinuity (~35 km: Crust/Mantle boundary)',
            'Asthenosphere (100-400 km, Plastic semi-molten magma zone)',
            '⚡ Repetti Discontinuity (700 km: Upper vs Lower Mantle)',
          ],
          itemsHi: [
            'ऊपरी महाद्वीपीय क्रस्ट (स्याल, ग्रेनाइट चट्टानें, घनत्व 2.7)',
            '⚡ कोनराड असंबद्धता (ऊपरी क्रस्ट एवं निचली क्रस्ट के मध्य)',
            'निचली महासागरीय क्रस्ट (सीमा, बेसाल्ट चट्टानें, घनत्व 3.0)',
            '⚡ मोहोरोविसिक (मोहो) असंबद्धता (क्रस्ट व मैंटल के मध्य ~35 किमी)',
            'दुर्बलतामंडल (एस्थेनोस्फीयर - 100-400 किमी, अर्ध-पिघला मैग्मा स्रोत)',
            '⚡ रेपिटी असंबद्धता (700 किमी: ऊपरी मैंटल व निचले मैंटल के मध्य)',
          ],
        },
        {
          titleEn: '2. Lower Mantle & Core (700 - 6371 km)',
          titleHi: '2. निचला मैंटल एवं क्रोड (NIFE)',
          badge: 'Mantle-Core Dynamo',
          itemsEn: [
            'Lower Mantle / Mesosphere (Solid silicate, density up to 5.7 g/cm³)',
            '⚡ Gutenberg Discontinuity (2900 km: Mantle-Core boundary; S-wave stops)',
            'Outer Core (2900 - 5150 km, Molten liquid Iron-Nickel; generates geodynamo field)',
            '⚡ Lehmann Discontinuity (5150 km: Outer liquid vs Inner solid core)',
            'Inner Core (5150 - 6371 km, Solid crystalline Iron-Nickel under 3.6M atm, 13.6 g/cm³)',
          ],
          itemsHi: [
            'निचला मैंटल / मध्यमंडल (सघन ठोस सिलिकेट, घनत्व 5.7 तक)',
            '⚡ गुटेनबर्ग असंबद्धता (2900 किमी: मैंटल व क्रोड की सीमा; S-तरंग लुप्त)',
            'बाह्य क्रोड (2900-5150 किमी: तरल निकेल-लोहा; पृथ्वी का चुंबकीय क्षेत्र निर्माता)',
            '⚡ लेहमैन असंबद्धता (5150 किमी: बाह्य तरल व आंतरिक ठोस क्रोड की सीमा)',
            'आंतरिक क्रोड (5150-6371 किमी: 36 लाख वायुमंडलीय दाब पर ठोस क्रिस्टलीय लोहा-निकेल, घनत्व 13.6)',
          ],
        },
      ],
    },
    breakdown: [
      {
        headingEn: '1. Seismic Waves as Tomographic Probes (P, S, and L Waves)',
        headingHi: '1. भूकंपीय तरंगों का व्यवहार (प्राथमिक, द्वितीयक एवं धरातलीय तरंगें)',
        detailEn:
          'Seismic body waves penetrate deep interior strata. Primary (P) waves are longitudinal (compressional) traveling through solid, liquid, and gas, but their velocity drops sharply from 13.6 km/s to 8 km/s at the 2900 km boundary. Secondary (S) waves are transverse (shear) and can travel ONLY through solids; their complete absence past 103° to 180° (S-wave shadow zone) proves the outer core is molten liquid.',
        detailHi:
          'भूकंपीय काय तरंगें (Body Waves) पृथ्वी के भीतर गहराई तक जाती हैं। प्राथमिक (P) तरंगें अनुदैर्ध्य होती हैं जो ठोस, द्रव व गैस तीनों में चलती हैं, किंतु 2900 किमी पर इनका वेग 13.6 किमी/सेकंड से घटकर 8 किमी/सेकंड रह जाता है। द्वितीयक (S) तरंगें अनुप्रस्थ होती हैं और केवल ठोस में चलती हैं; 103° के बाद इनका पूर्णतः लुप्त हो जाना बाह्य क्रोड के तरल होने का अकाट्य प्रमाण है।',
        pointsEn: [
          'P-wave Shadow Zone: Exists between 103° and 142° due to refraction at the core-mantle boundary.',
          'S-wave Shadow Zone: Enormous zone spanning from 103° to 180° on both sides of epicenter (over 40% of Earth surface).',
          'Surface (L) Waves: Travel only along crustal perimeter, causing maximum destruction during seismic events in Uttarakhand (Zone IV/V).',
        ],
        pointsHi: [
          'P-तरंग छाया क्षेत्र: मैंटल-क्रोड सीमा पर तीव्र अपवर्तन के कारण 103° से 142° के मध्य बनता है।',
          'S-तरंग छाया क्षेत्र: अधिकेंद्र से 103° से 180° तक का विशाल क्षेत्र (पृथ्वी के 40% से अधिक भूभाग पर)।',
          'धरातलीय (L) तरंगें: केवल भूपर्पटी के ऊपरी भाग में चलती हैं और उत्तराखंड (ज़ोन IV/V) में सर्वाधिक विनाशकारी होती हैं।',
        ],
      },
      {
        headingEn: '2. Geochemical Classification (Suess) vs Modern IUGG Seismological Model',
        headingHi: '2. एडवर्ड स्वेस का रासायनिक वर्गीकरण बनाम आधुनिक आईयूजीजी त्रि-स्तरीय मॉडल',
        detailEn:
          'Austrian geologist Eduard Suess classically divided the interior into SIAL (Silica + Aluminium, continental crust), SIMA (Silica + Magnesium, oceanic floor & upper mantle), and NIFE (Nickel + Ferrous, dense core). The modern International Union of Geodesy and Geophysics (IUGG) model classifies Earth based on physical state: rigid Lithosphere, plastic Asthenosphere, solid Mesosphere, fluid Outer Core, and solid Inner Core.',
        detailHi:
          'ऑस्ट्रियाई भूविज्ञानी एडवर्ड स्वेस ने पृथ्वी को स्याल (SIAL), सीमा (SIMA) और निफे (NIFE) में बांटा था। आधुनिक आईयूजीजी (IUGG) मॉडल इसे भौतिक अवस्था के आधार पर दृढ़ स्थलमंडल (Lithosphere), दुर्बलतामंडल (Asthenosphere), ठोस मध्यमंडल (Mesosphere), तरल बाह्य क्रोड और ठोस आंतरिक क्रोड में वर्गीकृत करता है।',
        pointsEn: [
          'Density gradient: 2.7 g/cm³ at continental crust to 3.3 at Moho, 5.7 at Gutenberg, and 13.6 at Earth center.',
          'Geothermal gradient: Temperature increases ~1°C per 32 meters depth in upper crust, reaching ~5,500°C at core.',
          'Geodynamo: Thermal and compositional convection in liquid iron-nickel outer core generates Earth’s magnetic protective field.',
        ],
        pointsHi: [
          'घनत्व वृद्धि: धरातल पर 2.7 g/cm³, मोहो पर 3.3, गुटेनबर्ग सीमा पर 5.7 तथा केंद्र में 13.6 g/cm³।',
          'तापीय प्रवणता: ऊपरी भूपर्पटी में प्रति 32 मीटर पर लगभग 1°C तापमान बढ़ता है, जो केंद्र में ~5,500°C तक पहुंच जाता है।',
          'जियोडायनेमो: बाह्य तरल क्रोड में संवहन धाराएं पृथ्वी के चुंबकीय आवरण (Magnetosphere) का निर्माण करती हैं।',
        ],
      },
    ],
    examBlueprint: {
      step1IntroEn:
        'State Earth radius (6,371 km) and explain that direct drilling (Kola 12.3 km) is negligible. Define how seismology provides indirect radiographic imaging of layered densities in 3 lines.',
      step1IntroHi:
        'पृथ्वी की त्रिज्या (6,371 किमी) का उल्लेख करें और बताएं कि प्रत्यक्ष उत्खनन (कोला 12.3 किमी) सीमित है। भूकंपीय तरंगों को पृथ्वी का एक्स-रे बताते हुए 3 पंक्तियों में प्रस्तावना लिखें।',
      step1ScholarEn: 'Arthur Holmes & Savindra Singh',
      step1ScholarHi: 'आर्थर होम्स एवं प्रो. सविन्द्र सिंह',
      step2DiagramTitleEn: 'SDSUV Page 1 Diagram: The Wedge Diagram (शंकु-काट रेखाचित्र)',
      step2DiagramTitleHi: 'उत्तर पुस्तिका के पृष्ठ 1 का रेखाचित्र: पृथ्वी की आंतरिक परतों का शंकु काट (Wedge Diagram)',
      step2DiagramType: 'Wedge Cross-Section from Crust (0 km) to Center (6,371 km)',
      step2DiagramContentEn: [
        'Top Crust: 0-35 km (SIAL & SIMA, Conrad at 15 km, Moho at 35 km)',
        'Mantle: 35-2900 km (Asthenosphere 100-400 km, Repetti at 700 km, Gutenberg at 2900 km)',
        'Core: 2900-6371 km (Outer Liquid Core 2900-5150 km, Lehmann at 5150 km, Inner Solid Core 5150-6371 km)',
      ],
      step2DiagramContentHi: [
        'भूपर्पटी: 0-35 किमी (कॉनराड 15 किमी, मोहो 35 किमी)',
        'मैंटल: 35-2900 किमी (दुर्बलतामंडल 100-400 किमी, रेपिटी 700 किमी, गुटेनबर्ग 2900 किमी)',
        'क्रोड: 2900-6371 किमी (बाह्य तरल क्रोड 2900-5150 किमी, लेहमैन 5150 किमी, आंतरिक ठोस क्रोड 13.6 घनत्व)',
      ],
      step2ExamTipEn:
        'Draw the 60° triangular wedge diagram on Page 1 showing depths (0, 35, 700, 2900, 5150, 6371 km) and write the CMRGL mnemonic clearly.',
      step2ExamTipHi:
        'प्रथम पृष्ठ पर 60° का शंकु-काट बनाकर गहराइयां (0, 35, 700, 2900, 5150, 6371 किमी) तथा CMRGL असंबद्धताएं नामांकित करें।',
      step3SubheadingsEn: [
        '1. Indirect Seismological Evidence: Body waves (P and S) and velocity inflection curves.',
        '2. P-wave vs S-wave Shadow Zones: Ray path refraction and empirical proof of liquid outer core.',
        '3. Five Discontinuities (Mnemonic CMRGL): Conrad, Mohorovičić, Repetti, Gutenberg, Lehmann.',
        '4. Tripartite Zonal Architecture: Crust (SIAL/SIMA), Mantle (Asthenosphere), and Core (NIFE).',
        '5. Geodynamo and Plate Tectonics Nexus: Mantle convection cells driving surface continental drift.',
      ],
      step3SubheadingsHi: [
        '1. भूकंपीय साक्ष्य: P एवं S तरंगों का व्यवहार तथा वेग परिवर्तन की वक्र रेखाएं।',
        '2. छाया क्षेत्र का महत्व: 103°-142° (P-तरंग) तथा 103°-180° (S-तरंग) द्वारा तरल बाह्य क्रोड की पुष्टि।',
        '3. पांच प्रमुख असंबद्धताएं (CMRGL सूत्र): कोनराड, मोहो, रेपिटी, गुटेनबर्ग तथा लेहमैन।',
        '4. त्रि-स्तरीय परत संरचना: भूपर्पटी (स्याल/सीमा), मैंटल (दुर्बलतामंडल) एवं क्रोड (निफे)।',
        '5. प्लेट विवर्तनिकी से संबंध: मैंटल संवहन तरंगें एवं हिमालयी उत्थान का विवर्तनिक आधार।',
      ],
      step4ConclusionEn:
        'Conclude: "Seismic tomography confirms a dynamic, tri-layered Earth where mantle thermal convection drives crustal plate motions, causing active tectonic seismicity across the Himalayan arc in Uttarakhand."',
      step4ConclusionHi:
        'निष्कर्ष: "भूकंपीय साक्ष्यों ने पृथ्वी के त्रि-स्तरीय गतिशील मॉडल को वैज्ञानिक रूप से सिद्ध किया है, जहां मैंटल की संवहन धाराएं प्लेटों को गतिमान रखती हैं और उत्तराखंड के हिमालयी क्षेत्र में भूकंपीय संवेदनशीलता का कारण बनती हैं।"',
    },
    commonMistakes: [
      {
        errorEn: 'Confusing the angular shadow zones of P-waves (103°-142°) and S-waves (103°-180°).',
        errorHi: 'P-तरंग (103°-142°) और S-तरंग (103°-180°) के छाया क्षेत्र के कोणों को आपस में मिला देना।',
        correctionEn:
          'Clearly remember: S-waves disappear completely past 103° (103° to 180°), whereas P-waves re-emerge after refraction between 142° and 180°.',
        correctionHi:
          'याद रखें: S-तरंगें 103° के बाद पूरी तरह गायब हो जाती हैं, जबकि P-तरंगें अपवर्तन के बाद 142° से 180° पर पुनः प्रकट होती हैं।',
        examinerTipEn: 'Drawing the shadow zone ray paths with correct angular numbers guarantees top marks in SDSUV/UPSC.',
        examinerTipHi: 'छाया क्षेत्र के कोणों (103°-142° व 103°-180°) का सही अंकन उत्तर को असाधारण बनाता है।',
      },
      {
        errorEn: 'Omitting the 5 seismic discontinuities or writing them in wrong order.',
        errorHi: 'पांचों असंबद्धताओं (Discontinuities) को छोड़ देना या उनका क्रम गलत लिख देना।',
        correctionEn:
          'Use the proven mnemonic CMRGL from top to bottom: Conrad (crust), Moho (crust/mantle), Repetti (mantle), Gutenberg (mantle/core), Lehmann (outer/inner core).',
        correctionHi:
          'शीर्ष से नीचे CMRGL सूत्र याद रखें: कोनराड, मोहो, रेपिटी, गुटेनबर्ग, लेहमैन।',
        examinerTipEn: 'Listing all 5 with depths (15, 35, 700, 2900, 5150 km) is the primary grading rubric.',
        examinerTipHi: 'पांचों असंबद्धताओं को उनकी सटीक गहराइयों के साथ लिखना पूरे 15 अंक दिलाता है।',
      },
      {
        errorEn: 'Claiming the entire Core is liquid.',
        errorHi: 'यह लिख देना कि संपूर्ण क्रोड (Core) तरल अवस्था में है।',
        correctionEn:
          'Emphasize that ONLY the Outer Core (2900-5150 km) is liquid; the Inner Core (5150-6371 km) is SOLID due to immense pressure exceeding 3.6 million atmospheres.',
        correctionHi:
          'स्पष्ट करें कि केवल बाह्य क्रोड तरल है; आंतरिक क्रोड 36 लाख वायुमंडलीय दाब के कारण पूर्णतः ठोस अवस्था में है।',
        examinerTipEn: 'Inge Lehmann’s 1936 discovery of the solid inner core is a compulsory topper point.',
        examinerTipHi: '1936 में इंगे लेहमैन द्वारा ठोस आंतरिक क्रोड की खोज का उल्लेख अवश्य करें।',
      },
    ],
    inlineQuiz: [
      {
        id: 'iq-geo-1',
        questionEn: 'Which seismic discontinuity marks the boundary between the Earth’s Mantle and Core at 2,900 km depth?',
        questionHi: '2,900 किमी की गहराई पर पृथ्वी के मैंटल और क्रोड के बीच की सीमा कौन सी असंबद्धता दर्शाती है?',
        optionsEn: ['Mohorovičić Discontinuity', 'Gutenberg Discontinuity', 'Conrad Discontinuity', 'Lehmann Discontinuity'],
        optionsHi: ['मोहोरोविसिक असंबद्धता', 'गुटेनबर्ग असंबद्धता', 'कॉनराड असंबद्धता', 'लेहमैन असंबद्धता'],
        correctIndex: 1,
        explanationEn:
          'Beno Gutenberg discovered in 1914 that the mantle-core boundary at 2,900 km causes S-waves to terminate and P-wave velocity to sharply decrease.',
        explanationHi:
          'बेनो गुटेनबर्ग ने 1914 में खोज की कि 2900 किमी पर मैंटल व क्रोड की सीमा पर S-तरंगें रुक जाती हैं और P-तरंगों का वेग घटता है।',
      },
      {
        id: 'iq-geo-2',
        questionEn: 'Why do Secondary (S) earthquake waves completely disappear beyond 103° from the epicenter?',
        questionHi: 'द्वितीयक (S) भूकंपीय तरंगें अधिकेंद्र से 103° के बाद पूरी तरह क्यों लुप्त हो जाती हैं?',
        optionsEn: [
          'Because the Inner Core is excessively cold',
          'Because the Outer Core is molten liquid and S-waves cannot travel through liquids',
          'Because S-waves are reflected into outer space',
          'Because the crust absorbs all shear energy',
        ],
        optionsHi: [
          'क्योंकि आंतरिक क्रोड अत्यधिक ठंडा है',
          'क्योंकि बाह्य क्रोड तरल है और S-तरंगें द्रवों में गमन नहीं कर सकतीं',
          'क्योंकि S-तरंगें अंतरिक्ष में परावर्तित हो जाती हैं',
          'क्योंकि भूपर्पटी सभी ऊर्जा सोख लेती है',
        ],
        correctIndex: 1,
        explanationEn:
          'S-waves are transverse shear waves requiring shear modulus rigidity; fluids have zero shear modulus, blocking S-wave transmission.',
        explanationHi:
          'S-तरंगें अनुप्रस्थ तरंगें हैं जो केवल ठोस माध्यम में संचरित हो सकती हैं; बाह्य क्रोड के तरल होने के कारण वे उसमें प्रवेश नहीं कर पातीं।',
      },
      {
        id: 'iq-geo-3',
        questionEn: 'The semi-molten, plastic zone within the upper mantle (100–400 km depth) is scientifically known as:',
        questionHi: 'ऊपरी मैंटल के भीतर 100-400 किमी की गहराई पर स्थित अर्ध-पिघले प्लास्टिक मंडल को किस नाम से जाना जाता है?',
        optionsEn: ['Lithosphere', 'Mesosphere', 'Asthenosphere', 'Barysphere'],
        optionsHi: ['स्थलमंडल (Lithosphere)', 'मध्यमंडल (Mesosphere)', 'दुर्बलतामंडल (Asthenosphere)', 'गुरुमंडल (Barysphere)'],
        correctIndex: 2,
        explanationEn:
          'The Asthenosphere (from Greek asthenes, meaning weak) is the low-velocity, partially molten zone that enables tectonic plates to slide.',
        explanationHi:
          'दुर्बलतामंडल (Asthenosphere) ऊपरी मैंटल का अर्ध-पिघला भाग है जिस पर स्थलमंडलीय प्लेटें संवहन धाराओं के प्रभाव से तैरती हैं।',
      },
    ],
    videos: [
      {
        id: 'v-geo-102-1',
        titleEn: 'Seismic Waves (P, S, L) & Earthquake Shadow Zones | PW OnlyIAS',
        titleHi: 'पृथ्वी की आंतरिक संरचना: भूकंपीय तरंगें, छाया क्षेत्र एवं असंबद्धताएं',
        channel: 'PW OnlyIAS',
        educator: 'Shivam Yash (PW OnlyIAS)',
        youtubeId: 'VlIyVKrNNBo',
        duration: '16:34',
        language: 'Hinglish',
        views: '155K',
        starRating: 4.96,
        ratingCount: 480,
        badge: 'UPSC Topper Pick',
        searchFallback: 'https://www.youtube.com/results?search_query=Seismic+Waves+Earthquake+PW+OnlyIAS',
      },
      {
        id: 'v-geo-102-2',
        titleEn: 'पृथ्वी की आंतरिक संरचना (क्रस्ट, मैंटल, कोर एवं असंबद्धताएं) | दृष्टि आईएएस',
        titleHi: 'पृथ्वी की आंतरिक संरचना (क्रस्ट, मैंटल, कोर एवं असंबद्धताएं) | दृष्टि आईएएस',
        channel: 'Drishti IAS',
        educator: 'Drishti Geography Team',
        youtubeId: 'wyiTK4kAAOY',
        duration: '42:11',
        language: 'Hindi',
        views: '1.8M',
        starRating: 4.95,
        ratingCount: 650,
        badge: 'Hindi Benchmark',
        searchFallback: 'https://www.youtube.com/results?search_query=Prithvi+ki+Aantarik+Sanrachna+Drishti+IAS',
      },
      {
        id: 'v-geo-102-3',
        titleEn: 'How Earthquake occurs & causes | Seismic Waves | P and S Waves | Amit Sengupta',
        titleHi: 'भूकंप उत्पत्ति एवं भूकंपीय तरंगें (P, S, L) | अमित सेनगुप्ता',
        channel: 'Amit Sengupta',
        educator: 'Amit Sengupta',
        youtubeId: 'uA_OLKfQpYA',
        duration: '24:30',
        language: 'English',
        views: '1.6M',
        starRating: 4.92,
        ratingCount: 380,
        badge: 'Visual Map Clarity',
        searchFallback: 'https://www.youtube.com/results?search_query=Seismic+Waves+Amit+Sengupta',
      },
      {
        id: 'v-geo-102-4',
        titleEn: 'Interior of The Earth Full Chapter | Physical Geography | UPSC Wallah',
        titleHi: 'पृथ्वी की आंतरिक संरचना सम्पूर्ण अध्याय | यूपीएससी वाला',
        channel: 'UPSC Wallah',
        educator: 'UPSC Wallah Faculty',
        youtubeId: '5UTmt-57BBk',
        duration: '1:44:21',
        language: 'Hinglish',
        views: '102K',
        starRating: 4.88,
        ratingCount: 295,
        badge: 'Verified Educator',
        searchFallback: 'https://www.youtube.com/results?search_query=Interior+of+Earth+UPSC+Wallah',
      },
      {
        id: 'v-geo-102-5',
        titleEn: 'Plate Tectonics Theory & Earth Interior | World Physical Geography',
        titleHi: 'प्लेट विवर्तनिकी सिद्धांत एवं पृथ्वी का भू-गर्भ | डॉ. कृष्णानंद',
        channel: 'TheGeoecologist',
        educator: 'Dr. Krishnanand',
        youtubeId: 'ERoE9xGSPbg',
        duration: '18:28',
        language: 'English',
        views: '1.2M',
        starRating: 4.95,
        ratingCount: 410,
        badge: 'Geography Authority',
        searchFallback: 'https://www.youtube.com/results?search_query=Plate+Tectonics+TheGeoecologist',
      },
      {
        id: 'v-geo-102-6',
        titleEn: 'Continental Drift Theory & Plate Tectonics Visualized | Amit Sengupta',
        titleHi: 'महाद्वीपीय विस्थापन सिद्धांत एवं प्लेट विवर्तनिकी | अमित सेनगुप्ता',
        channel: 'Amit Sengupta',
        educator: 'Amit Sengupta',
        youtubeId: '5ftgDgg_xj0',
        duration: '16:30',
        language: 'English',
        views: '890K',
        starRating: 4.91,
        ratingCount: 310,
        badge: 'Visual Map Clarity',
        searchFallback: 'https://www.youtube.com/results?search_query=Continental+Drift+Amit+Sengupta',
      },
      {
        id: 'v-geo-102-7',
        titleEn: 'NCERT Fundamentals: Earth Dynamics & Plate Tectonics | Unacademy IAS',
        titleHi: 'एनसीईआरटी मूलभूत भूगोल: पृथ्वी गतिकी एवं विवर्तनिकी | सुदर्शन गुर्जर',
        channel: 'Unacademy IAS',
        educator: 'Sudarshan Gurjar',
        youtubeId: 'LkvPQGflR6s',
        duration: '42:41',
        language: 'Hinglish',
        views: '1.1M',
        starRating: 4.9,
        ratingCount: 390,
        badge: 'Top Faculty',
        searchFallback: 'https://www.youtube.com/results?search_query=Geography+Unacademy+IAS',
      },
      {
        id: 'v-geo-102-8',
        titleEn: 'Earth Surface Configuration & Geomorphology | Vajiram & Ravi',
        titleHi: 'धरातलीय संरचना एवं भू-आकृति विज्ञान | वाजीराम एंड रवि',
        channel: 'Vajiram & Ravi',
        educator: 'Senior Geography Faculty',
        youtubeId: 'gAJ4liZmbts',
        duration: '20:49',
        language: 'Hinglish',
        views: '670K',
        starRating: 4.86,
        ratingCount: 270,
        badge: 'IAS Standard',
        searchFallback: 'https://www.youtube.com/results?search_query=Geomorphology+Vajiram+Ravi',
      },
    ],
    pyqs: [
      {
        id: 'pyq-geo-102-1',
        year: 2024,
        semester: 1,
        marks: 15,
        examType: 'Main Exam',
        questionEn:
          'Discuss the internal structure of the Earth on the basis of seismological evidence. Draw a neat labeled cross-sectional diagram showing all major discontinuities.',
        questionHi:
          'भूकंपीय साक्ष्यों के आधार पर पृथ्वी की आंतरिक संरचना की विवेचना कीजिए। सभी प्रमुख असंबद्धताओं को दर्शाते हुए एक स्वच्छ नामांकित अनुप्रस्थ काट चित्र बनाइए।',
        solutionEn:
          'Indirect seismic evidence provides the most scientific model: P-waves (compressional) travel through all states; S-waves (shear) travel only through solids. S-wave disappearance at 2900 km establishes the molten liquid nature of the Outer Core. Five discontinuities CMRGL: Conrad (crust), Moho (~35 km), Repetti (700 km), Gutenberg (2900 km), Lehmann (5150 km). Density ranges from 2.7 to 13.6 g/cm³.',
        solutionHi:
          'भूकंपीय साक्ष्य सर्वाधिक वैज्ञानिक आधार हैं: P-तरंगें तीनों माध्यमों में चलती हैं; S-तरंगें केवल ठोस में चलती हैं। 2900 किमी पर S-तरंगों का लुप्त होना बाह्य क्रोड के तरल होने को सिद्ध करता है। पांच असंबद्धताएं (CMRGL): कॉनराड, मोहो (35 किमी), रेपिटी (700 किमी), गुटेनबर्ग (2900 किमी), लेहमैन (5150 किमी)। घनत्व 2.7 से 13.6 g/cm³ तक बढ़ता है।',
        markingPoints: [
          'Seismic wave properties P vs S and shadow zones (4 Marks)',
          'Crust, Mantle, Core boundary depths & densities (4 Marks)',
          '5 Discontinuities mnemonic CMRGL (4 Marks)',
          'Neat labeled wedge diagram (3 Marks)',
        ],
      },
    ],
    topicQuiz: [
      {
        id: 'tq-geo-1',
        questionEn: 'What is the average density of the Earth as a whole planet?',
        questionHi: 'समग्र रूप से पृथ्वी का औसत घनत्व कितना है?',
        optionsEn: ['2.7 g/cm³', '3.3 g/cm³', '5.51 g/cm³', '13.6 g/cm³'],
        optionsHi: ['2.7 ग्राम/सेमी³', '3.3 ग्राम/सेमी³', '5.51 ग्राम/सेमी³', '13.6 ग्राम/सेमी³'],
        correctIndex: 2,
        explanationEn:
          'While surface continental rocks average 2.7 g/cm³, Earth’s overall mean density is ~5.515 g/cm³ due to the heavy nickel-iron core.',
        explanationHi:
          'धरातलीय चट्टानों का घनत्व 2.7 होता है, किंतु भारी लौह-निकेल क्रोड के कारण संपूर्ण पृथ्वी का औसत घनत्व 5.51 ग्राम/सेमी³ है।',
      },
      {
        id: 'tq-geo-2',
        questionEn: 'Which discontinuity separates the Upper Mantle from the Lower Mantle at 700 km depth?',
        questionHi: '700 किमी की गहराई पर ऊपरी मैंटल को निचले मैंटल से कौन सी असंबद्धता अलग करती है?',
        optionsEn: ['Conrad', 'Mohorovičić', 'Repetti', 'Lehmann'],
        optionsHi: ['कॉनराड', 'मोहोरोविसिक', 'रेपिटी', 'लेहमैन'],
        correctIndex: 2,
        explanationEn:
          'The Repetti discontinuity separates the upper mantle from the transition zone/lower mantle at approximately 700 km.',
        explanationHi:
          '700 किमी की गहराई पर रेपिटी असंबद्धता ऊपरी मैंटल को संक्रमण क्षेत्र एवं निचले मैंटल से पृथक करती है।',
      },
      {
        id: 'tq-geo-3',
        questionEn: 'Earth’s core makes up approximately what percentage of the planet’s total volume?',
        questionHi: 'पृथ्वी का क्रोड (Core) ग्रह के कुल आयतन का लगभग कितना प्रतिशत भाग बनाता है?',
        optionsEn: ['1%', '16%', '68%', '83%'],
        optionsHi: ['1%', '16%', '68%', '83%'],
        correctIndex: 1,
        explanationEn:
          'The Crust occupies ~1% of volume, the Mantle occupies ~83% of volume, and the Core occupies ~16% of Earth’s volume (and ~32% of mass).',
        explanationHi:
          'क्रस्ट लगभग 1% आयतन घेरती है, मैंटल 83% आयतन घेरता है, तथा क्रोड लगभग 16% आयतन (और 32% द्रव्यमान) बनाता है।',
      },
      {
        id: 'tq-geo-4',
        questionEn: 'Who discovered in 1936 that the inner core is solid despite extreme temperatures?',
        questionHi: '1936 ई. में किसने खोज की थी कि अत्यधिक तापमान के बावजूद आंतरिक क्रोड ठोस अवस्था में है?',
        optionsEn: ['Andrija Mohorovičić', 'Inge Lehmann', 'Beno Gutenberg', 'Charles Richter'],
        optionsHi: ['एंड्रिजा मोहोरोविसिक', 'इंगे लेहमैन', 'बेनो गुटेनबर्ग', 'चार्ल्स रिक्टर'],
        correctIndex: 1,
        explanationEn:
          'Danish seismologist Inge Lehmann discovered weak P-wave arrivals in the shadow zone, proving the existence of a solid inner core.',
        explanationHi:
          'डेनिश भूकंपविज्ञानी इंगे लेहमैन ने 1936 में परावर्तित P-तरंगों के आधार पर ठोस आंतरिक क्रोड के अस्तित्व को सिद्ध किया।',
      },
      {
        id: 'tq-geo-5',
        questionEn: 'What is the deepest direct borehole drilled by humanity into Earth’s continental crust?',
        questionHi: 'मानव द्वारा पृथ्वी की महाद्वीपीय क्रस्ट में खोदा गया अब तक का सबसे गहरा बोरहोल कौन सा है?',
        optionsEn: ['Challenger Deep', 'Kola Superdeep Borehole (12.3 km)', 'Mariana Trench', 'San Andreas Fault Bore'],
        optionsHi: ['चैलेंजर डीप', 'कोला सुपरडीप बोरहोल (12.3 किमी)', 'मारियाना गर्त', 'सैन एंड्रियास भ्रंश'],
        correctIndex: 1,
        explanationEn:
          'The Kola Superdeep Borehole in Russia reached 12,262 meters (12.3 km) in 1989, penetrating only about 0.2% of Earth’s radius.',
        explanationHi:
          'रूस में खोदा गया कोला सुपरडीप बोरहोल 12,262 मीटर (12.3 किमी) गहरा है, जो पृथ्वी की त्रिज्या का मात्र 0.2% भाग है।',
      },
    ],
  },
};

// ============================================================================
// DYNAMIC TOPIC LESSON RESOLVER
// ============================================================================

export function resolveTopicLesson(
  subjectParam: string,
  unitParam: string,
  topicParam: string
): TopicLessonDetail | null {
  const normSubject = subjectParam.toLowerCase().trim();
  const normTopic = topicParam.toLowerCase().trim();
  const unitNum = parseInt(unitParam.replace(/\D/g, ''), 10) || 1;

  // 1. Direct match in Curated Master Lessons
  if (CURATED_TOPIC_LESSONS[normTopic]) {
    return CURATED_TOPIC_LESSONS[normTopic] as TopicLessonDetail;
  }

  // 2. Search in Notes Studio Database
  const matchedNote = MASTER_NOTES_DATABASE.find(
    (n) =>
      n.id.toLowerCase() === normTopic ||
      n.learnTopicId?.toLowerCase() === normTopic ||
      n.subjectId.toLowerCase() === normSubject
  );

  // 3. Search in Semester 1 BA Subjects
  let matchedTopicItem: TopicItem | null = null;
  let matchedUnitNode: UnitNode | null = null;
  let matchedSubjectData: LearnSubjectData | null = null;

  for (const s of SEMESTER_1_BA_SUBJECTS) {
    if (s.id.toLowerCase() === normSubject || s.code.toLowerCase().includes(normSubject)) {
      matchedSubjectData = s;
      for (const u of s.units) {
        if (u.unitNumber === unitNum || !matchedUnitNode) {
          matchedUnitNode = u;
          for (const ch of u.chapters) {
            for (const t of ch.topics) {
              if (t.id.toLowerCase() === normTopic) {
                matchedTopicItem = t;
                break;
              }
            }
          }
        }
      }
    }
  }

  // If still not matched, check in full LEARN_SUBJECTS_DATA across all streams
  if (!matchedTopicItem) {
    for (const streamKey of Object.keys(LEARN_SUBJECTS_DATA) as (keyof typeof LEARN_SUBJECTS_DATA)[]) {
      for (const s of LEARN_SUBJECTS_DATA[streamKey]) {
        if (s.id.toLowerCase() === normSubject || s.code.toLowerCase().includes(normSubject)) {
          matchedSubjectData = s;
          for (const u of s.units) {
            if (u.unitNumber === unitNum || !matchedUnitNode) {
              matchedUnitNode = u;
              for (const ch of u.chapters) {
                for (const t of ch.topics) {
                  if (t.id.toLowerCase() === normTopic || !matchedTopicItem) {
                    matchedTopicItem = t;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // 4. Construct a Complete 7-Section Topic Lesson Detail
  const titleEn =
    matchedTopicItem?.titleEn ||
    matchedNote?.titleEn ||
    'Academic Topic Lesson & UPSC Synthesis';
  const titleHi =
    matchedTopicItem?.titleHi ||
    matchedNote?.titleHi ||
    'अकादमिक व्याख्यान एवं यूपीएससी स्तर विश्लेषण';

  const defaultDetail: TopicLessonDetail = {
    topicId: matchedTopicItem?.id || normTopic || 't-lesson',
    subjectId: matchedSubjectData?.id || normSubject || 'ba-subject',
    subjectCode: matchedSubjectData?.code || 'SDSUV-BA-101',
    subjectNameEn: matchedSubjectData?.nameEn || 'Undergraduate Arts & Sciences',
    subjectNameHi: matchedSubjectData?.nameHi || 'स्नातक कला एवं विज्ञान पाठ्यक्रम',
    semester: matchedSubjectData?.semester || 1,
    unitNumber: unitNum,
    unitTitleEn: matchedUnitNode?.titleEn || `Unit ${unitNum}: Core Disciplinary Foundation`,
    unitTitleHi: matchedUnitNode?.titleHi || `इकाई ${unitNum}: मुख्य सैद्धांतिक आधार`,
    lectureNo: `Lecture ${String(unitNum).padStart(2, '0')}`,
    titleEn,
    titleHi,
    upscTag: matchedNote?.upscTag || 'UPSC GS / State PSC / NET',
    sdsuvTag: matchedNote?.sdsuvTag || '🔥 Asked in SDSUV Exam (15 Marks)',
    readTime: matchedNote?.readTime || matchedTopicItem?.duration || '15 min read',

    coreConcept: {
      introEn:
        matchedNote?.contextEn?.intro ||
        matchedTopicItem?.quickNotes?.summaryEn ||
        `${titleEn} forms a foundational pillar in the undergraduate curriculum, synthesized through classical and modern academic frameworks.`,
      introHi:
        matchedNote?.contextHi?.intro ||
        matchedTopicItem?.quickNotes?.summaryHi ||
        `${titleHi} विश्वविद्यालय पाठ्यक्रम का एक महत्वपूर्ण आधार है, जो सैद्धांतिक एवं समकालीन दोनों दृष्टिकोणों को स्पष्ट करता है।`,
      scholarEn:
        matchedNote?.contextEn?.scholarDefinition?.scholar ||
        'Academic Council & University Reference Benchmark',
      scholarHi:
        matchedNote?.contextHi?.scholarDefinition?.scholar ||
        'विश्वविद्यालय अकादमिक परिषद एवं प्रामाणिक शोध संदर्भ',
      quoteEn:
        matchedNote?.contextEn?.scholarDefinition?.definition ||
        `"Mastery of this topic requires synthesizing foundational definitions with historiographical and empirical correctives."`,
      quoteHi:
        matchedNote?.contextHi?.scholarDefinition?.definition ||
        `"इस विषय में पूर्ण अंक प्राप्त करने हेतु सैद्धांतिक अवधारणाओं को व्यावहारिक व वैज्ञानिक साक्ष्यों से जोड़ना आवश्यक है।"`,
    },

    flowchart: {
      titleEn: matchedNote?.flowchart?.titleEn || 'Conceptual Flowchart & Structural Framework',
      titleHi: matchedNote?.flowchart?.titleHi || 'संकल्पनात्मक फ्लोचार्ट एवं संरचनात्मक रूपरेखा',
      columns: matchedNote?.flowchart?.columns
        ? matchedNote.flowchart.columns.map((c) => ({
            titleEn: c.titleEn,
            titleHi: c.titleHi,
            badge: c.badge || 'Core Pillar',
            itemsEn: c.itemsEn,
            itemsHi: c.itemsHi,
          }))
        : [
            {
              titleEn: '1. Primary Framework (प्राथमिक आयाम)',
              titleHi: '1. प्राथमिक आयाम',
              badge: 'Pillar I',
              itemsEn: ['Foundational Premise & Epistemology', 'Historical Antecedents & Origin'],
              itemsHi: ['आधारभूत संकल्पना एवं परिभाषा', 'ऐतिहासिक पृष्ठभूमि एवं विकास'],
            },
            {
              titleEn: '2. Analytical Framework (विश्लेषणात्मक आयाम)',
              titleHi: '2. विश्लेषणात्मक आयाम',
              badge: 'Pillar II',
              itemsEn: ['Contemporary Perspectives & Empirical Application', 'Critical Historiography & Modern Debates'],
              itemsHi: ['समकालीन दृष्टिकोण एवं अनुप्रयोग', 'आलोचनात्मक विश्लेषण एवं प्रासंगिकता'],
            },
          ],
    },

    breakdown: matchedNote?.analyticalPoints
      ? matchedNote.analyticalPoints.map((p) => ({
          headingEn: p.headingEn,
          headingHi: p.headingHi,
          detailEn: p.detailEn,
          detailHi: p.detailHi,
          pointsEn: p.bulletsEn,
          pointsHi: p.bulletsHi,
          highlightEn: p.keyHighlightEn,
          highlightHi: p.keyHighlightHi,
        }))
      : [
          {
            headingEn: '1. Core Theoretical Foundations & Conceptual Parameters',
            headingHi: '1. मुख्य सैद्धांतिक आधार एवं संकल्पनात्मक सीमाएं',
            detailEn:
              'Understanding this topic requires analyzing the foundational postulates established by pioneering scholars, balancing theoretical models with empirical findings.',
            detailHi:
              'इस विषय के अध्ययन हेतु प्रमुख विद्वानों द्वारा प्रतिपादित सिद्धांतों का तुलनात्मक अध्ययन तथा अनुभवजन्य साक्ष्यों का परीक्षण अनिवार्य है।',
            pointsEn: [
              'Systematic definition of key terms and categorization of primary mechanisms.',
              'Comparison between traditional classical perspectives and modern reformulations.',
            ],
            pointsHi: [
              'प्रमुख पारिभाषिक शब्दों की वैज्ञानिक व्याख्या तथा वर्गीकरण।',
              'परंपरागत दृष्टिकोणों तथा आधुनिक शोध निष्कर्षों का तुलनात्मक अध्ययन।',
            ],
          },
        ],

    examBlueprint: {
      step1IntroEn:
        'Begin with a standard 3-line definition quoting a seminal scholar. Underline the scholar name and publication date on the very first sentence of your answer.',
      step1IntroHi:
        'उत्तर का आरंभ किसी प्रामाणिक विद्वान की 3-पंक्ति परिभाषा से करें। प्रथम पंक्ति में ही विद्वान का नाम एवं वर्ष नीले/काले पेन से रेखांकित करें।',
      step1ScholarEn: 'Standard Disciplinary Text & Topper Reference',
      step1ScholarHi: 'मानक विश्वविद्यालय संदर्भ ग्रंथ एवं टॉपर्स मॉडल',
      step2DiagramTitleEn: 'Page 1 Visual Blueprint: Two-Column Conceptual Hierarchy',
      step2DiagramTitleHi: 'पृष्ठ 1 का दृश्य प्रारूप: द्वि-स्तंभीय संकल्पनात्मक फ्लोचार्ट',
      step2DiagramType: 'Classification Hierarchy / Mindmap',
      step2DiagramContentEn: [
        'Central Box: Core Concept Title',
        'Branch 1: Classical Foundations & Axioms',
        'Branch 2: Critical Debates & Modern Synthesis',
      ],
      step2DiagramContentHi: [
        'केंद्रीय बॉक्स: मुख्य विषय का नाम',
        'शाखा 1: शास्त्रीय आधार एवं सिद्धांत',
        'शाखा 2: आधुनिक विमर्श एवं संतुलित निष्कर्ष',
      ],
      step2ExamTipEn:
        'Drawing a clean structured box on Page 1 signals immediate academic clarity to the evaluator, securing 3 baseline presentation marks.',
      step2ExamTipHi:
        'प्रथम पृष्ठ पर स्वच्छ बॉक्स बनाने से परीक्षक पर सकारात्मक प्रभाव पड़ता है और तुरंत 3 अतिरिक्त प्रस्तुति अंक मिलते हैं।',
      step3SubheadingsEn: [
        '1. Foundational Premise and Classical Axioms.',
        '2. Step-by-Step Mechanisms and Core Arguments.',
        '3. Empirical Evidence and Case Study Validation.',
        '4. Scholarly Counter-arguments and Limitations.',
        '5. Contemporary Relevance and Contemporary Application.',
      ],
      step3SubheadingsHi: [
        '1. आधारभूत मान्यताएं एवं शास्त्रीय नियम।',
        '2. चरणबद्ध कार्य-प्रणाली एवं मुख्य तर्क।',
        '3. अनुभवसिद्ध साक्ष्य एवं उदाहरण।',
        '4. आलोचनात्मक दृष्टिकोण एवं कमियां।',
        '5. समकालीन प्रासंगिकता एवं निष्कर्ष।',
      ],
      step4ConclusionEn:
        matchedNote?.conclusionEn ||
        'Conclude with a balanced two-sentence synthesis harmonizing traditional theoretical principles with contemporary real-world relevance.',
      step4ConclusionHi:
        matchedNote?.conclusionHi ||
        'निष्कर्ष में परंपरागत सिद्धांतों का आधुनिक आवश्यकताओं के साथ संतुलन स्थापित करते हुए 2-3 वाक्यों में संतुलित सार प्रस्तुत करें।',
    },

    commonMistakes: [
      {
        errorEn: 'Writing generic essays without underlining specific scholar names or dates.',
        errorHi: 'बिना किसी विद्वान या विशिष्ट तिथि का उल्लेख किए केवल सामान्य निबंध की तरह लिख देना।',
        correctionEn: 'Always quote at least two recognized scholars and underline core technical vocabulary.',
        correctionHi: 'कम से कम दो प्रामाणिक विद्वानों के नाम उद्धृत करें और तकनीकी शब्दों को रेखांकित करें।',
        examinerTipEn: 'Evaluators look for technical disciplinary keywords, not conversational paragraphs.',
        examinerTipHi: 'परीक्षक विषयगत तकनीकी शब्दावली की खोज करते हैं, न कि सामान्य वाक्यों की।',
      },
      {
        errorEn: 'Omitting a diagram on Page 1 and writing uninterrupted walls of text.',
        errorHi: 'प्रथम पृष्ठ पर कोई रेखाचित्र या फ्लोचार्ट न बनाना और केवल लगातार पैराग्राफ लिखना।',
        correctionEn: 'Always reserve the upper half of page 1 for a neat 2-branch classification diagram.',
        correctionHi: 'प्रथम पृष्ठ के ऊपरी भाग में एक सुंदर दो-शाखीय फ्लोचार्ट अवश्य बनाएं।',
        examinerTipEn: 'Diagrammatic answers consistently score 12–14 out of 15, compared to 8–9 for plain text.',
        examinerTipHi: 'फ्लोचार्ट वाले उत्तरों को 15 में से 12-14 अंक मिलते हैं, जबकि सादे पाठ को 8-9 ही मिलते हैं।',
      },
      {
        errorEn: 'Failing to provide a distinct, balanced conclusion at the end of the 15-mark answer.',
        errorHi: 'उत्तर के अंत में कोई स्पष्ट व संतुलित निष्कर्ष न लिखना।',
        correctionEn: 'Always write a dedicated "Conclusion / निष्कर्ष" paragraph synthesizing the core debate.',
        correctionHi: 'उत्तर के अंत में "निष्कर्ष" शीर्षक देकर 3-4 पंक्तियों में संतुलित सारांश अवश्य लिखें।',
        examinerTipEn: 'A strong conclusion ensures the examiner leaves a positive final mark impression.',
        examinerTipHi: 'एक सशक्त निष्कर्ष परीक्षक को उच्चतम अंक देने हेतु प्रेरित करता है।',
      },
    ],

    inlineQuiz: [
      {
        id: `iq-${normTopic}-1`,
        questionEn: `What is the primary academic significance of studying ${titleEn}?`,
        questionHi: `${titleHi} के अध्ययन का मुख्य अकादमिक उद्देश्य क्या है?`,
        optionsEn: [
          'It provides verifiable theoretical principles and analytical frameworks',
          'It is purely an outdated historical speculation',
          'It has no relevance to university examination rubrics',
          'It only applies to laboratory sciences',
        ],
        optionsHi: [
          'यह प्रामाणिक सैद्धांतिक नियम एवं विश्लेषणात्मक रूपरेखा प्रदान करता है',
          'यह केवल एक अप्रासंगिक ऐतिहासिक अनुमान है',
          'विश्वविद्यालय परीक्षा में इसका कोई महत्व नहीं है',
          'यह केवल प्रयोगशाला विज्ञानों पर लागू होता है',
        ],
        correctIndex: 0,
        explanationEn:
          'This topic provides the core analytical foundation necessary for understanding broader curricular and examination questions.',
        explanationHi:
          'यह विषय संपूर्ण पाठ्यक्रम और परीक्षा के दीर्घ उत्तरीय प्रश्नों को समझने हेतु अनिवार्य सैद्धांतिक आधार प्रदान करता है।',
      },
      {
        id: `iq-${normTopic}-2`,
        questionEn: 'How should a 15-mark SDSUV answer on this topic be structured for maximum marks?',
        questionHi: 'इस विषय पर 15 अंक का उत्तर लिखते समय सर्वाधिक अंक प्राप्ति हेतु क्या संरचना अपनानी चाहिए?',
        optionsEn: [
          'Write a continuous unstructured narrative without sub-headings',
          'Start with scholar definition, draw page 1 flowchart, underline 5 core headings, and conclude balancedly',
          'Only write bullet points without any theoretical explanation',
          'Copy the syllabus description verbatim',
        ],
        optionsHi: [
          'बिना उप-शीर्षकों के लगातार निबंध लिखना',
          'विद्वान की परिभाषा से आरंभ, पृष्ठ 1 पर फ्लोचार्ट, 5 मुख्य शीर्षकों का रेखांकन एवं संतुलित निष्कर्ष',
          'बिना व्याख्या के केवल बिंदु लिख देना',
          'केवल पाठ्यक्रम की पंक्तियां दोहराना',
        ],
        correctIndex: 1,
        explanationEn:
          'The 4-step answer architecture (definition hook, diagram, 5 analytical headings, synthesis) is the proven topper benchmark.',
        explanationHi:
          'परिभाषा, प्रथम पृष्ठ का फ्लोचार्ट, 5 रेखांकित उप-शीर्षक एवं निष्कर्ष की 4-चरणीय संरचना टॉपर्स का मानक मॉडल है।',
      },
      {
        id: `iq-${normTopic}-3`,
        questionEn: 'Which element is considered essential by state PSC and university evaluators in this topic?',
        questionHi: 'राज्य लोक सेवा आयोग एवं विश्वविद्यालय परीक्षकों द्वारा इस विषय में क्या आवश्यक माना जाता है?',
        optionsEn: [
          'Extraneous poetic filler content',
          'Direct disciplinary terminology and contextual cross-verification',
          'Vague personal speculation without facts',
          'Leaving questions incomplete',
        ],
        optionsHi: [
          'अनावश्यक काव्यात्मक शब्द',
          'सटीक विषयगत तकनीकी शब्दावली एवं प्रामाणिक संदर्भ',
          'तथ्यों के बिना व्यक्तिगत अनुमान',
          'प्रश्नों को अधूरा छोड़ना',
        ],
        correctIndex: 1,
        explanationEn:
          'Evaluators reward precise academic terminology and empirical substantiation rather than lengthy vague prose.',
        explanationHi:
          'परीक्षक लंबे अस्पष्ट वाक्यों के स्थान पर सटीक तकनीकी शब्दावली और प्रामाणिक तथ्यों को पुरस्कृत करते हैं।',
      },
    ],

    videos: matchedTopicItem?.alternativeVideos?.length
      ? [
          {
            id: `v-${normTopic}-main`,
            titleEn: matchedTopicItem.titleEn,
            titleHi: matchedTopicItem.titleHi,
            channel: matchedTopicItem.instructorEn || 'StudyIQ IAS / Drishti IAS',
            educator: matchedTopicItem.instructorEn || 'Senior Faculty',
            youtubeId: matchedTopicItem.youtubeId,
            duration: matchedTopicItem.duration || '30:00',
            language: matchedTopicItem.language || 'Hinglish',
            views: '950K',
            starRating: 4.9,
            ratingCount: 310,
            badge: 'Primary Recommended Lecture',
            searchFallback:
              matchedTopicItem.searchFallback ||
              `https://www.youtube.com/results?search_query=${encodeURIComponent(matchedTopicItem.titleEn)}`,
          },
          ...matchedTopicItem.alternativeVideos.map((alt, idx) => ({
            id: alt.id || `v-${normTopic}-${idx}`,
            titleEn: alt.titleEn,
            titleHi: alt.titleHi,
            channel: alt.channel,
            educator: alt.channel,
            youtubeId: alt.youtubeId,
            duration: alt.duration,
            language: alt.language,
            views: alt.views,
            starRating: 4.8,
            ratingCount: 220 + idx * 35,
            badge: alt.badge || 'Curated Top Educator',
            searchFallback:
              alt.searchFallback ||
              `https://www.youtube.com/results?search_query=${encodeURIComponent(alt.titleEn)}`,
          })),
        ]
      : [
          {
            id: `v-${normTopic}-1`,
            titleEn: `${titleEn} (Complete Analysis) | UPSC & BA`,
            titleHi: `${titleHi} (विस्तृत कक्षा) | यूपीएससी एवं विश्वविद्यालय`,
            channel: 'StudyIQ IAS',
            educator: 'StudyIQ Senior Faculty',
            youtubeId: matchedTopicItem?.youtubeId || 'm9w2ZOUF6So',
            duration: '34:20',
            language: 'Hinglish',
            views: '1.1M',
            starRating: 4.9,
            ratingCount: 420,
            badge: 'UPSC Standard',
            searchFallback: `https://www.youtube.com/results?search_query=${encodeURIComponent(titleEn)}+StudyIQ`,
          },
          {
            id: `v-${normTopic}-2`,
            titleEn: `${titleHi} | Drishti IAS / केवल हिंदी`,
            titleHi: `${titleHi} | दृष्टि आईएएस`,
            channel: 'Drishti IAS',
            educator: 'Drishti Faculty Team',
            youtubeId: 'hW7tCQ457FA',
            duration: '38:15',
            language: 'Hindi',
            views: '1.8M',
            starRating: 4.95,
            ratingCount: 580,
            badge: 'Hindi Benchmark',
            searchFallback: `https://www.youtube.com/results?search_query=${encodeURIComponent(titleHi)}+Drishti+IAS`,
          },
          {
            id: `v-${normTopic}-3`,
            titleEn: `${titleEn} Comprehensive Lecture | PW OnlyIAS`,
            titleHi: `${titleHi} संपूर्ण व्याख्यान | पीडब्लू ओनलीआईएएस`,
            channel: 'PW OnlyIAS',
            educator: 'PW Faculty Team',
            youtubeId: 'V0N_aoy-9w4',
            duration: '31:40',
            language: 'Hinglish',
            views: '780K',
            starRating: 4.85,
            ratingCount: 310,
            badge: 'Topper Choice',
            searchFallback: `https://www.youtube.com/results?search_query=${encodeURIComponent(titleEn)}+PW+OnlyIAS`,
          },
          {
            id: `v-${normTopic}-4`,
            titleEn: `${titleEn} University Rigor | CEC SWAYAM UGC`,
            titleHi: `${titleHi} विश्वविद्यालय स्तर व्याख्यान | यूजीसी स्वयं`,
            channel: 'CEC / SWAYAM UGC',
            educator: 'University Professors Consortium',
            youtubeId: 'Esj-4hNWxLQ',
            duration: '29:50',
            language: 'English',
            views: '490K',
            starRating: 4.8,
            ratingCount: 190,
            badge: 'UGC Benchmark',
            searchFallback: `https://www.youtube.com/results?search_query=${encodeURIComponent(titleEn)}+UGC+SWAYAM`,
          },
          {
            id: `v-${normTopic}-5`,
            titleEn: `${titleEn} (Heritage Series) | Sansad TV`,
            titleHi: `${titleHi} | संसद टीवी विशेष`,
            channel: 'Sansad TV',
            educator: 'National Academic Panel',
            youtubeId: 'WMopoZiIg1Q',
            duration: '27:10',
            language: 'Hinglish',
            views: '380K',
            starRating: 4.75,
            ratingCount: 160,
            badge: 'National Quality',
            searchFallback: `https://www.youtube.com/results?search_query=${encodeURIComponent(titleEn)}+Sansad+TV`,
          },
          {
            id: `v-${normTopic}-6`,
            titleEn: `${titleEn} Exam Series | UGC NET Adda247`,
            titleHi: `${titleHi} | यूजीसी नेट अड्डा247`,
            channel: 'UGC NET Adda247',
            educator: 'Adda247 Faculty',
            youtubeId: 'M1nVM6fNxto',
            duration: '35:40',
            language: 'Hindi',
            views: '620K',
            starRating: 4.7,
            ratingCount: 205,
            badge: 'NET Exam Edge',
            searchFallback: `https://www.youtube.com/results?search_query=${encodeURIComponent(titleEn)}+Adda247`,
          },
          {
            id: `v-${normTopic}-7`,
            titleEn: `${titleEn} Concept Booster | Sleepy Classes`,
            titleHi: `${titleHi} | स्लीपी क्लासेस`,
            channel: 'Sleepy Classes IAS',
            educator: 'Sleepy Classes Team',
            youtubeId: 'zR7wQy6E4kE',
            duration: '30:20',
            language: 'English',
            views: '410K',
            starRating: 4.8,
            ratingCount: 175,
            badge: 'Crisp UPSC Notes',
            searchFallback: `https://www.youtube.com/results?search_query=${encodeURIComponent(titleEn)}+Sleepy+Classes`,
          },
          {
            id: `v-${normTopic}-8`,
            titleEn: `${titleEn} Visual Masterclass | Amit Sengupta`,
            titleHi: `${titleHi} मानचित्र व आरेख विश्लेषण | अमित सेनगुप्ता`,
            channel: 'Amit Sengupta',
            educator: 'Amit Sengupta',
            youtubeId: 'uA_OLKfQpYA',
            duration: '26:45',
            language: 'English',
            views: '840K',
            starRating: 4.9,
            ratingCount: 360,
            badge: 'Visual Clarity',
            searchFallback: `https://www.youtube.com/results?search_query=${encodeURIComponent(titleEn)}+Amit+Sengupta`,
          },
        ],

    pyqs: matchedTopicItem?.topicPYQs?.length
      ? matchedTopicItem.topicPYQs.map((p) => ({
          id: p.id,
          year: p.year,
          semester: p.semester,
          marks: p.marks,
          examType: p.examType,
          questionEn: p.questionEn,
          questionHi: p.questionHi,
          solutionEn: p.solutionEn,
          solutionHi: p.solutionHi,
          markingPoints: p.markingPoints,
        }))
      : [
          {
            id: `pyq-${normTopic}-1`,
            year: 2024,
            semester: matchedSubjectData?.semester || 1,
            marks: 15,
            examType: 'Main Exam',
            questionEn: `Explain the fundamental concept of ${titleEn}. Provide a critical evaluation in the context of recent scholarly developments.`,
            questionHi: `${titleHi} की मूलभूत संकल्पना को स्पष्ट कीजिए। हाल के विद्वत्तापूर्ण विकास के संदर्भ में इसका आलोचनात्मक मूल्यांकन कीजिए।`,
            solutionEn: `A comprehensive answer requires: 1) Definitional foundation quoting standard scholars; 2) Flowchart demonstrating classification; 3) 5 sub-headings addressing structural mechanisms and empirical evidence; 4) Balanced synthesis.`,
            solutionHi: `संतुलित उत्तर में आवश्यक है: 1) विद्वान की परिभाषा से प्रस्तावना; 2) वर्गीकरण फ्लोचार्ट; 3) संरचना व साक्ष्यों के 5 उप-शीर्षक; 4) संतुलित निष्कर्ष।`,
            markingPoints: [
              'Introduction and standard scholar definition (3 Marks)',
              'Conceptual classification and page 1 diagram (4 Marks)',
              'Detailed analytical breakdown with sub-headings (5 Marks)',
              'Critical evaluation and balanced conclusion (3 Marks)',
            ],
          },
        ],

    topicQuiz: [
      {
        id: `tq-${normTopic}-1`,
        questionEn: `Which of the following best defines the primary scope of ${titleEn}?`,
        questionHi: `${titleHi} के मुख्य विषय-क्षेत्र को निम्नलिखित में से क्या सर्वोत्तम रूप से परिभाषित करता है?`,
        optionsEn: [
          'Systematic analysis of empirical principles and theoretical paradigms',
          'Unverified speculative folk mythology',
          'Only memorization of non-substantive labels',
          'Irrelevant to contemporary university assessments',
        ],
        optionsHi: [
          'अनुभवजन्य नियमों एवं सैद्धांतिक प्रतिमानों का व्यवस्थित विश्लेषण',
          'अपुष्ट काल्पनिक लोक मान्यताएं',
          'तथ्यों के बिना केवल शब्दों को रटना',
          'विश्वविद्यालय मूल्यांकन के लिए अप्रासंगिक',
        ],
        correctIndex: 0,
        explanationEn:
          'Academic rigor requires empirical systematization and critical analysis rather than superficial memorization.',
        explanationHi:
          'अकादमिक अध्ययन में अनुभवजन्य साक्ष्यों का व्यवस्थित और आलोचनात्मक परीक्षण सर्वाधिक महत्वपूर्ण है।',
      },
      {
        id: `tq-${normTopic}-2`,
        questionEn: 'In university examinations, what is the weightage of drawing an illustrative diagram on Page 1?',
        questionHi: 'विश्वविद्यालय परीक्षा में प्रथम पृष्ठ पर सचित्र आरेख बनाने का क्या महत्व है?',
        optionsEn: [
          'It is strictly penalized by examiners',
          'It visually organizes arguments and secures 3 to 4 bonus layout marks',
          'It takes away marks from the written answer',
          'It is completely optional and ignored by evaluators',
        ],
        optionsHi: [
          'परीक्षक इस पर अंक काट लेते हैं',
          'यह तर्कों को सुव्यवस्थित करता है और 3 से 4 अतिरिक्त प्रस्तुति अंक दिलाता है',
          'यह लिखित उत्तर के अंकों को कम कर देता है',
          'परीक्षक इसे पूरी तरह अनदेखा करते हैं',
        ],
        correctIndex: 1,
        explanationEn:
          'Examiners consistently award higher marks when a candidate presents a visual diagram or flowchart on page 1.',
        explanationHi:
          'परीक्षक प्रथम पृष्ठ पर स्वच्छ रेखाचित्र देखने पर तुरंत 3-4 अंक अधिक प्रदान करते हैं।',
      },
      {
        id: `tq-${normTopic}-3`,
        questionEn: 'Which strategy prevents losing marks under "⚠️ Common Mistakes in Exams"?',
        questionHi: 'परीक्षा में सामान्य गलतियों से बचने और पूर्ण अंक प्राप्त करने हेतु कौन सी रणनीति सर्वोत्तम है?',
        optionsEn: [
          'Writing without any scholar names or dates',
          'Citing verified scholars, drawing clean diagrams, and providing a balanced conclusion',
          'Copying the question repeatedly to fill pages',
          'Using colloquial slang in academic answers',
        ],
        optionsHi: [
          'बिना किसी विद्वान या तारीख के सामान्य निबंध लिखना',
          'प्रामाणिक विद्वानों को उद्धृत करना, स्वच्छ आरेख बनाना एवं संतुलित निष्कर्ष लिखना',
          'पृष्ठ भरने के लिए प्रश्न को बार-बार दोहराना',
          'अकादमिक उत्तरों में बोलचाल की अनौपचारिक भाषा लिखना',
        ],
        correctIndex: 1,
        explanationEn:
          'Topper answers always combine scholar citations, structured diagrams, and a crisp synthesizing conclusion.',
        explanationHi:
          'टॉपर्स सदैव प्रामाणिक संदर्भों, स्वच्छ आरेखों और संतुलित निष्कर्ष का उपयोग करते हैं।',
      },
      {
        id: `tq-${normTopic}-4`,
        questionEn: 'How does this topic connect with UPSC Civil Services and State PSC syllabi?',
        questionHi: 'यह विषय यूपीएससी सिविल सेवा एवं राज्य लोक सेवा आयोग के पाठ्यक्रम से किस प्रकार जुड़ा है?',
        optionsEn: [
          'It appears as a core analytical theme in General Studies and Optional papers',
          'It is never asked in any competitive examinations',
          'It is only relevant for primary schools',
          'It is strictly limited to viva examinations',
        ],
        optionsHi: [
          'यह सामान्य अध्ययन एवं वैकल्पिक प्रश्नपत्रों में मुख्य विश्लेषणात्मक विषय के रूप में पूछा जाता है',
          'यह किसी भी प्रतियोगी परीक्षा में कभी नहीं पूछा जाता',
          'यह केवल प्राथमिक विद्यालयों के लिए प्रासंगिक है',
          'यह केवल मौखिक परीक्षा तक सीमित है',
        ],
        correctIndex: 0,
        explanationEn:
          'SDSUV undergraduate syllabus closely mirrors UPSC and UKPSC foundational requirements.',
        explanationHi:
          'श्री देव सुमन उत्तराखंड विश्वविद्यालय का बीए पाठ्यक्रम यूपीएससी और यूकेपीएससी के मुख्य विषयों से पूरी तरह संरेखित है।',
      },
      {
        id: `tq-${normTopic}-5`,
        questionEn: 'What is the role of an analytical conclusion in a 15-mark university answer?',
        questionHi: '15 अंक के विश्वविद्यालय उत्तर में विश्लेषणात्मक निष्कर्ष की क्या भूमिका होती है?',
        optionsEn: [
          'It leaves the answer hanging without resolution',
          'It synthesizes conflicting viewpoints into a mature, balanced academic judgment',
          'It merely repeats the introductory line word for word',
          'It is considered redundant and skipped by toppers',
        ],
        optionsHi: [
          'यह उत्तर को बिना किसी समाधान के अधूरा छोड़ देता है',
          'यह परस्पर विरोधी दृष्टिकोणों का समन्वय कर एक परिपक्व व संतुलित निष्कर्ष प्रस्तुत करता है',
          'यह केवल प्रस्तावना की पंक्ति को शब्दशः दोहराता है',
          'टॉपर्स इसे अनावश्यक मानकर छोड़ देते हैं',
        ],
        correctIndex: 1,
        explanationEn:
          'A balanced concluding synthesis demonstrates higher-order intellectual maturity to the evaluator.',
        explanationHi:
          'संतुलित निष्कर्ष परीक्षक के समक्ष अभ्यर्थी की बौद्धिक परिपक्वता को प्रमाणित करता है।',
      },
    ],
  };

  return defaultDetail;
}
