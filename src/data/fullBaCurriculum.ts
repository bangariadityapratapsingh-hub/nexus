import { MasterTopicNote, CurriculumSubjectSummary } from './curriculum/types';
import { GEOGRAPHY_CURRICULUM_NOTES } from './curriculum/geography';
import { HISTORY_CURRICULUM_NOTES } from './curriculum/history';
import { POLITICAL_SCIENCE_CURRICULUM_NOTES } from './curriculum/politicalScience';
import { SOCIOLOGY_CURRICULUM_NOTES } from './curriculum/sociology';
import { HINDI_LITERATURE_CURRICULUM_NOTES } from './curriculum/hindiLiterature';
import { ODD_SEMESTER_MASTER_NOTES } from './curriculum/oddSemesterNotes';

export * from './curriculum/types';
export { GEOGRAPHY_CURRICULUM_NOTES } from './curriculum/geography';
export { HISTORY_CURRICULUM_NOTES } from './curriculum/history';
export { POLITICAL_SCIENCE_CURRICULUM_NOTES } from './curriculum/politicalScience';
export { SOCIOLOGY_CURRICULUM_NOTES } from './curriculum/sociology';
export { HINDI_LITERATURE_CURRICULUM_NOTES } from './curriculum/hindiLiterature';
export { ODD_SEMESTER_MASTER_NOTES } from './curriculum/oddSemesterNotes';

const toRecord = (items: MasterTopicNote[] | Record<string, MasterTopicNote>): Record<string, MasterTopicNote> => {
  if (Array.isArray(items)) {
    return Object.fromEntries(items.map((item) => [item.id, item]));
  }
  return items;
};

// Comprehensive Database containing all Topics across all 11 BA Subjects for Odd Semesters
export const FULL_BA_CURRICULUM_DATABASE: Record<string, MasterTopicNote> = {
  ...toRecord(GEOGRAPHY_CURRICULUM_NOTES),
  ...toRecord(HISTORY_CURRICULUM_NOTES),
  ...toRecord(POLITICAL_SCIENCE_CURRICULUM_NOTES),
  ...toRecord(SOCIOLOGY_CURRICULUM_NOTES),
  ...toRecord(HINDI_LITERATURE_CURRICULUM_NOTES),
  ...toRecord(ODD_SEMESTER_MASTER_NOTES),
};

// Metadata Summary for all 11 Subjects
export const FULL_CURRICULUM_SUBJECTS_LIST: CurriculumSubjectSummary[] = [
  {
    id: 'geography',
    code: 'GEO-101',
    nameEn: 'Geography',
    nameHi: 'भूगोल',
    semester: 1,
    paperTitleEn: 'Physical Geography & Geomorphology',
    paperTitleHi: 'भौतिक भूगोल एवं भू-आकृतिक विज्ञान',
    iconName: 'Globe',
    totalNotes: 12,
    gradient: 'from-emerald-500 to-teal-700',
    units: [
      { unitNumber: 1, titleEn: 'Origin of Earth, Geological Time Scale, Interior & Rocks', titleHi: 'पृथ्वी की उत्पत्ति, भूवैज्ञानिक समय मापक्रम, आंतरिक संरचना एवं शैल', totalTopics: 4 },
      { unitNumber: 2, titleEn: 'Isostasy, Plate Tectonics, Geomorphic Cycles & Oceanography', titleHi: 'समस्थिति, प्लेट विवर्तनिकी, भू-आकृतिक चक्र एवं समुद्र विज्ञान', totalTopics: 4 },
      { unitNumber: 3, titleEn: 'Atmosphere, Insolation, Planetary Winds & Cyclones', titleHi: 'वायुमंडल, सूर्यातप, ग्रहीय पवनें एवं चक्रवात', totalTopics: 4 }
    ]
  },
  {
    id: 'history',
    code: 'HIS-101',
    nameEn: 'History',
    nameHi: 'इतिहास',
    semester: 1,
    paperTitleEn: 'History of India from Earliest Times to 300 A.D. & Cultural History of Uttarakhand',
    paperTitleHi: 'प्रारंभ से 300 ई. तक भारत का इतिहास एवं उत्तराखण्ड का सांस्कृतिक इतिहास',
    iconName: 'Scroll',
    totalNotes: 10,
    gradient: 'from-amber-600 to-orange-800',
    units: [
      { unitNumber: 1, titleEn: 'Historical Sources & Prehistoric Stone Age Cultures', titleHi: 'ऐतिहासिक स्रोत एवं प्रागैतिहासिक पाषाण संस्कृतियां', totalTopics: 2 },
      { unitNumber: 2, titleEn: 'Harappan Civilization & Early and Later Vedic Era', titleHi: 'हड़प्पा सभ्यता एवं पूर्व व उत्तर वैदिक काल', totalTopics: 2 },
      { unitNumber: 3, titleEn: '16 Mahajanapadas, Magadha & Shramana Traditions (Jainism/Buddhism)', titleHi: '16 महाजनपद, मगध का उत्कर्ष एवं श्रमण परंपरा (जैन व बौद्ध धर्म)', totalTopics: 2 },
      { unitNumber: 4, titleEn: 'Mauryan Empire, Ashoka\'s Dhamma & Epigraphy', titleHi: 'मौर्य साम्राज्य, अशोक का धम्म एवं अभिलेखीय साक्ष्य', totalTopics: 2 },
      { unitNumber: 5, titleEn: 'Post-Mauryan Polity, Kushanas & Uttarakhand Cultural History', titleHi: 'मौर्योत्तर काल, कुषाण एवं उत्तराखण्ड का सांस्कृतिक इतिहास', totalTopics: 2 }
    ]
  },
  {
    id: 'polscience',
    code: 'POL-101',
    nameEn: 'Political Science',
    nameHi: 'राजनीति विज्ञान',
    semester: 1,
    paperTitleEn: 'Basic Principles of Political Science & Awareness of Civil Rights',
    paperTitleHi: 'राजनीति विज्ञान के मूल सिद्धांत एवं नागरिक अधिकार चेतना',
    iconName: 'Scale',
    totalNotes: 11,
    gradient: 'from-blue-600 to-indigo-800',
    units: [
      { unitNumber: 1, titleEn: 'Nature, Scope & Approaches: Traditional vs Modern (Behaviouralism)', titleHi: 'प्रकृति, विषय-क्षेत्र एवं उपागम: परम्परागत बनाम आधुनिक व्यवहारवाद', totalTopics: 3 },
      { unitNumber: 2, titleEn: 'State, Theories of Origin, Sovereignty & Authority', titleHi: 'राज्य, उत्पत्ति के सिद्धांत, संप्रभुता एवं सत्ता व वैधता', totalTopics: 3 },
      { unitNumber: 3, titleEn: 'Liberty, Equality, Justice (Rawls) & Rights and Duties', titleHi: 'स्वतंत्रता, समानता, न्याय (रॉल्स) एवं अधिकार व कर्तव्य', totalTopics: 3 },
      { unitNumber: 4, titleEn: 'Democracy, Indian Constitution & Civil Rights (Art 12–35, RTI, PRIs)', titleHi: 'लोकतंत्र, भारतीय संविधान एवं नागरिक अधिकार (अनुच्छेद 12-35, सूचना का अधिकार)', totalTopics: 2 }
    ]
  },
  {
    id: 'sociology',
    code: 'SOC-101',
    nameEn: 'Sociology',
    nameHi: 'समाजशास्त्र',
    semester: 1,
    paperTitleEn: 'Introductory Sociology & Indian Social System',
    paperTitleHi: 'समाजशास्त्र का परिचय एवं भारतीय सामाजिक व्यवस्था',
    iconName: 'Users',
    totalNotes: 9,
    gradient: 'from-purple-600 to-violet-800',
    units: [
      { unitNumber: 1, titleEn: 'Emergence of Sociology, Nature, Scope & Interdisciplinary Relations', titleHi: 'समाजशास्त्र का उद्भव, प्रकृति, विषय-क्षेत्र एवं अंतःविषयक संबंध', totalTopics: 3 },
      { unitNumber: 2, titleEn: 'Society, Community (Gemeinschaft), Association & Social Groups', titleHi: 'समाज, समुदाय (जेमिनशाफ्ट), समिति एवं सामाजिक समूह', totalTopics: 2 },
      { unitNumber: 3, titleEn: 'Social Processes: Associative (Cooperation) & Dissociative (Conflict)', titleHi: 'सामाजिक प्रक्रियाएं: सहयोगी (सहयोग) एवं असहयोगी (संघर्ष व प्रतिस्पर्धा)', totalTopics: 2 },
      { unitNumber: 4, titleEn: 'Culture, Civilization, Cultural Lag & Indian Social System', titleHi: 'संस्कृति, सभ्यता, सांस्कृतिक पिछड़ापन एवं भारतीय सामाजिक व्यवस्था', totalTopics: 2 }
    ]
  },
  {
    id: 'hindi',
    code: 'HIN-101',
    nameEn: 'Hindi Literature',
    nameHi: 'हिन्दी साहित्य',
    semester: 1,
    paperTitleEn: 'Ancient & Devotional Poetry & Brief History of Hindi Literature',
    paperTitleHi: 'प्राचीन एवं भक्तिकालीन काव्य तथा हिन्दी साहित्य का संक्षिप्त इतिहास',
    iconName: 'Feather',
    totalNotes: 7,
    gradient: 'from-rose-600 to-red-800',
    units: [
      { unitNumber: 1, titleEn: 'Aadikal Nomenclature/Trends & Bhaktikal Genesis/Streams', titleHi: 'आदिकाल नामकरण व प्रवृत्तियाँ तथा भक्तिकाल का उद्भव व धाराएं', totalTopics: 2 },
      { unitNumber: 2, titleEn: 'Chandbardai & Prithviraj Raso (Padmavati Samay)', titleHi: 'चन्दबरदाई एवं पृथ्वीराज रासो (पद्मावती समय)', totalTopics: 1 },
      { unitNumber: 3, titleEn: 'Sant Kabir Das: Social Philosophy, Mysticism & Language', titleHi: 'संत कबीरदास: समाज-दर्शन, रहस्यवाद एवं सधुक्कड़ी भाषा', totalTopics: 1 },
      { unitNumber: 4, titleEn: 'Malik Muhammad Jayasi: Padmavat (Manasrodak Khand)', titleHi: 'मलिक मुहम्मद जायसी: पद्मावत (मानसरोदक खण्ड)', totalTopics: 1 },
      { unitNumber: 5, titleEn: 'Mahakavi Surdas: Vatsalya Ras & Bhramargeet Saar', titleHi: 'महाकवि सूरदास: वात्सल्य रस एवं भ्रमरगीत सार', totalTopics: 1 },
      { unitNumber: 6, titleEn: 'Goswami Tulsidas: Ramcharitmanas, Vinayapatrika & Samanvay', titleHi: 'गोस्वामी तुलसीदास: रामचरितमानस, विनयपत्रिका एवं समन्वय', totalTopics: 1 }
    ]
  },
  {
    id: 'economics',
    code: 'ECO-101',
    nameEn: 'Economics',
    nameHi: 'अर्थशास्त्र',
    semester: 1,
    paperTitleEn: 'Micro Economics & Mountain Economy of Uttarakhand',
    paperTitleHi: 'व्यष्टि अर्थशास्त्र एवं उत्तराखंड की पर्वतीय आर्थिकी',
    iconName: 'TrendingUp',
    totalNotes: 10,
    gradient: 'from-blue-600 to-indigo-700',
    units: [
      { unitNumber: 1, titleEn: 'Consumer Equilibrium & Indifference Curve Analysis', titleHi: 'उपभोक्ता संतुलन एवं उदासीनता वक्र विश्लेषण', totalTopics: 3 },
      { unitNumber: 2, titleEn: 'Production Function, Isoquants & Returns to Scale', titleHi: 'उत्पादन फलन, सम-उत्पाद वक्र एवं पैमाने के प्रतिफल', totalTopics: 2 },
      { unitNumber: 3, titleEn: 'Cost & Revenue Curves under Perfect/Imperfect Markets', titleHi: 'पूर्ण एवं अपूर्ण बाजारों में लागत व आगम वक्र', totalTopics: 2 },
      { unitNumber: 4, titleEn: 'Uttarakhand Mountain Economy, Remittances & Palayan', titleHi: 'उत्तराखंड की पर्वतीय अर्थव्यवस्था, मनी-ऑर्डर व पलायन', totalTopics: 3 }
    ]
  },
  {
    id: 'anthropology',
    code: 'ANT-101',
    nameEn: 'Anthropology',
    nameHi: 'मानवशास्त्र',
    semester: 1,
    paperTitleEn: 'Social & Cultural Anthropology & Tribal Ethnography',
    paperTitleHi: 'सामाजिक एवं सांस्कृतिक मानवशास्त्र तथा जनजातीय नृजातिवृत्त',
    iconName: 'Compass',
    totalNotes: 8,
    gradient: 'from-teal-500 to-emerald-700',
    units: [
      { unitNumber: 1, titleEn: 'Nature & Scope of Anthropology and Concept of Culture', titleHi: 'मानवशास्त्र की प्रकृति व विषय-क्षेत्र तथा संस्कृति की अवधारणा', totalTopics: 2 },
      { unitNumber: 2, titleEn: 'Social Institutions: Marriage, Family & Kinship Systems', titleHi: 'सामाजिक संस्थाएं: विवाह, परिवार एवं नातेदारी व्यवस्था', totalTopics: 2 },
      { unitNumber: 3, titleEn: 'Economic & Political Anthropology in Simple Societies', titleHi: 'सरल समाजों में आर्थिक एवं राजनीतिक मानवशास्त्र', totalTopics: 2 },
      { unitNumber: 4, titleEn: 'Himalayan Tribal Ethnography: Jaunsari & Bhotia Polyandry', titleHi: 'हिमालयी जनजातीय समाज: जौनसारी एवं भोटिया बहुपति प्रथा', totalTopics: 2 }
    ]
  },
  {
    id: 'english',
    code: 'ENG-101',
    nameEn: 'English Literature',
    nameHi: 'अंग्रेजी साहित्य',
    semester: 1,
    paperTitleEn: 'Introduction to English Poetry, Prose & Short Fiction',
    paperTitleHi: 'अंग्रेजी काव्य, गद्य एवं लघु कथा साहित्य का परिचय',
    iconName: 'Feather',
    totalNotes: 8,
    gradient: 'from-indigo-500 to-purple-700',
    units: [
      { unitNumber: 1, titleEn: 'Forms of Prose & Renaissance Essayists (Francis Bacon)', titleHi: 'गद्य के विविध रूप एवं पुनर्जागरण कालीन निबंधकार (फ्रांसिस बेकन)', totalTopics: 2 },
      { unitNumber: 2, titleEn: 'Poetic Forms & Devices: Sonnet, Ode, Elegy, Ballad', titleHi: 'काव्य के रूप एवं शैलियां: सॉनेट, ओड, शोकगीत, गाथागीत', totalTopics: 2 },
      { unitNumber: 3, titleEn: 'Romantic & Victorian Poetry: Wordsworth, Keats, Tennyson', titleHi: 'रोमांटिक एवं विक्टोरियन काव्य: वर्ड्सवर्थ, कीट्स, टेनिसन', totalTopics: 2 },
      { unitNumber: 4, titleEn: 'Short Fiction & Modern Narrative Techniques: O. Henry', titleHi: 'लघु कथा एवं आधुनिक आख्यान तकनीकें: ओ. हेनरी', totalTopics: 2 }
    ]
  },
  {
    id: 'sanskrit',
    code: 'SAN-101',
    nameEn: 'Sanskrit Literature',
    nameHi: 'संस्कृत साहित्य',
    semester: 1,
    paperTitleEn: 'Laghusiddhantakaumudi (Sandhi), Niti Poetry & Translation',
    paperTitleHi: 'लघुसिद्धान्तकौमुदी (सन्धि प्रकरणम्), नीति काव्य एवं अनुवाद',
    iconName: 'Sparkles',
    totalNotes: 8,
    gradient: 'from-amber-600 to-orange-700',
    units: [
      { unitNumber: 1, titleEn: 'Maheshwara Sutras, Pratyahara & Ach Sandhi Sutras', titleHi: 'माहेश्वर सूत्र, प्रत्याहार निर्माण एवं अच् सन्धि विधायक सूत्र', totalTopics: 2 },
      { unitNumber: 2, titleEn: 'Hal Sandhi & Visarga Sandhi with Exemplary Derivations', titleHi: 'हल् सन्धि एवं विसर्ग सन्धि सोदाहरण सिद्धि', totalTopics: 2 },
      { unitNumber: 3, titleEn: 'Bhartrihari’s Nitisatakam: Moral & Philosophical Verses', titleHi: 'भर्तृहरि कृत नीतिशतकम्: नैतिक एवं दार्शनिक श्लोक', totalTopics: 2 },
      { unitNumber: 4, titleEn: 'Hitopadesha Fables & Sanskrit to Hindi Translation Rules', titleHi: 'हितोपदेश कथाएं एवं संस्कृत से हिन्दी अनुवाद नियम', totalTopics: 2 }
    ]
  },
  {
    id: 'homescience',
    code: 'HSC-101',
    nameEn: 'Home Science',
    nameHi: 'गृह विज्ञान',
    semester: 1,
    paperTitleEn: 'Food Science, Macronutrients & Child Development',
    paperTitleHi: 'खाद्य विज्ञान, स्थूल पोषक तत्व एवं बाल विकास',
    iconName: 'HeartPulse',
    totalNotes: 8,
    gradient: 'from-rose-500 to-red-600',
    units: [
      { unitNumber: 1, titleEn: 'Food Science, Macronutrients & Clinical Deficiency (PEM)', titleHi: 'खाद्य विज्ञान, मैक्रोन्यूट्रिएंट्स एवं पोषण जनित विकार (PEM)', totalTopics: 2 },
      { unitNumber: 2, titleEn: 'Micronutrients: Vitamins, Minerals & Therapeutic Diets', titleHi: 'माइक्रोन्यूट्रिएंट्स: विटामिन, खनिज एवं उपचारात्मक आहार', totalTopics: 2 },
      { unitNumber: 3, titleEn: 'Prenatal Growth & Infancy Developmental Milestones', titleHi: 'प्रसव-पूर्व वृद्धि एवं शैशवावस्था के विकासात्मक चरण', totalTopics: 2 },
      { unitNumber: 4, titleEn: 'Childhood Psychology, Cognitive Development & Nutrition', titleHi: 'बाल मनोविज्ञान, संज्ञानात्मक विकास एवं विद्यालयी पोषण', totalTopics: 2 }
    ]
  },
  {
    id: 'drawing',
    code: 'DRW-101',
    nameEn: 'Drawing & Painting',
    nameHi: 'चित्रकला',
    semester: 1,
    paperTitleEn: 'Fundamentals of Visual Art & Indian Shadanga Aesthetics',
    paperTitleHi: 'दृश्य कला के मूल तत्व एवं भारतीय षडंग सौंदर्यशास्त्र',
    iconName: 'Palette',
    totalNotes: 8,
    gradient: 'from-fuchsia-500 to-pink-600',
    units: [
      { unitNumber: 1, titleEn: 'Six Elements of Visual Art & Classical Indian Shadanga', titleHi: 'दृश्य कला के छह मूल तत्व एवं शास्त्रीय भारतीय षडंग', totalTopics: 2 },
      { unitNumber: 2, titleEn: 'Principles of Composition: Balance, Harmony & Rhythm', titleHi: 'संयोजन के सिद्धांत: संतुलन, सामंजस्य, लय एवं प्रभाव', totalTopics: 2 },
      { unitNumber: 3, titleEn: 'Prehistoric Rock Art: Bhimbetka & Lakhudiyar (Uttarakhand)', titleHi: 'प्रागैतिहासिक शैल चित्रकला: भीमबेटका एवं लखुडियार (उत्तराखंड)', totalTopics: 2 },
      { unitNumber: 4, titleEn: 'Ajanta Cave Murals & Classical Indian Painting Masterpieces', titleHi: 'अजन्ता गुफा भित्तिचित्र एवं शास्त्रीय भारतीय चित्रकला', totalTopics: 2 }
    ]
  }
];

// Helper Functions
export function findCurriculumTopic(topicId: string): MasterTopicNote | undefined {
  if (!topicId) return undefined;
  return FULL_BA_CURRICULUM_DATABASE[topicId];
}

export function getCurriculumNotesBySubject(subjectId: string): MasterTopicNote[] {
  return Object.values(FULL_BA_CURRICULUM_DATABASE).filter(
    (note) => note.subjectId.toLowerCase() === subjectId.toLowerCase()
  );
}

export function getSubjectSummary(subjectId: string): CurriculumSubjectSummary | undefined {
  return FULL_CURRICULUM_SUBJECTS_LIST.find(
    (subj) => subj.id.toLowerCase() === subjectId.toLowerCase()
  );
}

export function getAllCurriculumTopics(): MasterTopicNote[] {
  return Object.values(FULL_BA_CURRICULUM_DATABASE);
}
