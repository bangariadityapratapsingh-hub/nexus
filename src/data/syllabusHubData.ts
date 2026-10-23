// Central Syllabus Hub Data for Sri Dev Suman Uttarakhand University (SDSUV NEP-2020)
// Complete Official Curriculum for all 11 Subjects across Semesters 1 to 10
// Covers: Geography, History, Political Science, Sociology, Hindi Literature,
// Economics, Anthropology, English Literature, Sanskrit, Home Science, Drawing & Painting

import {
  SubjectKey,
  PaperCategory,
  SyllabusUnit,
  SyllabusPaper,
  SubjectSyllabusMeta,
} from './syllabus/types';

import { GEOGRAPHY_SYLLABUS_PAPERS } from './syllabus/geography';
import { HISTORY_SYLLABUS_PAPERS } from './syllabus/history';
import { POLSCIENCE_SYLLABUS_PAPERS } from './syllabus/polscience';
import { SOCIOLOGY_SYLLABUS_PAPERS } from './syllabus/sociology';
import { HINDI_SYLLABUS_PAPERS } from './syllabus/hindi';
import { ECONOMICS_SYLLABUS_PAPERS } from './syllabus/economics';
import { ANTHROPOLOGY_SYLLABUS_PAPERS } from './syllabus/anthropology';
import { ENGLISH_SYLLABUS_PAPERS } from './syllabus/english';
import { SANSKRIT_SYLLABUS_PAPERS } from './syllabus/sanskrit';
import { HOMESCIENCE_SYLLABUS_PAPERS } from './syllabus/homescience';
import { DRAWING_SYLLABUS_PAPERS } from './syllabus/drawing';

export * from './syllabus/types';
export { GEOGRAPHY_SYLLABUS_PAPERS } from './syllabus/geography';
export { HISTORY_SYLLABUS_PAPERS } from './syllabus/history';
export { POLSCIENCE_SYLLABUS_PAPERS } from './syllabus/polscience';
export { SOCIOLOGY_SYLLABUS_PAPERS } from './syllabus/sociology';
export { HINDI_SYLLABUS_PAPERS } from './syllabus/hindi';
export { ECONOMICS_SYLLABUS_PAPERS } from './syllabus/economics';
export { ANTHROPOLOGY_SYLLABUS_PAPERS } from './syllabus/anthropology';
export { ENGLISH_SYLLABUS_PAPERS } from './syllabus/english';
export { SANSKRIT_SYLLABUS_PAPERS } from './syllabus/sanskrit';
export { HOMESCIENCE_SYLLABUS_PAPERS } from './syllabus/homescience';
export { DRAWING_SYLLABUS_PAPERS } from './syllabus/drawing';

export const SUBJECT_METADATA_LIST: SubjectSyllabusMeta[] = [
  {
    key: 'geography',
    nameEn: 'Geography',
    nameHi: 'भूगोल',
    codePrefix: 'SDSUV-GEO',
    faculty: 'Faculty of Arts / Social Sciences & Earth Sciences',
    iconName: 'Globe',
    colorGradient: 'from-cyan-500 to-blue-600',
    accentColor: 'cyan',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/e4f92881-367f-4ac3-94cf-02693b8a74ed-Hindi.pdf',
    descriptionEn: 'Physical Geography, Geomorphology, Climatology, Cartography, GIS & Remote Sensing, Mountain Geography & Hydrology under SDSUV NEP-2020.',
    descriptionHi: 'एसडीएसयूवी एनईपी-2020 के अंतर्गत भौतिक भूगोल, भू-आकृति विज्ञान, जलवायु, मानचित्र प्रक्षेप, जीआईएस, पर्वतीय भूगोल एवं जल विज्ञान (सेमेस्टर 1-10)।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'history',
    nameEn: 'History',
    nameHi: 'इतिहास',
    codePrefix: 'SDSUV-HIS',
    faculty: 'Faculty of Arts & Social Sciences',
    iconName: 'Landmark',
    colorGradient: 'from-emerald-500 to-teal-600',
    accentColor: 'emerald',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/e4f92881-367f-4ac3-94cf-02693b8a74ed-Hindi.pdf',
    descriptionEn: 'Ancient India, Sultanate, Mughals, Indian National Movement, Historiography, Research Methods & History of Uttarakhand under SDSUV NEP-2020.',
    descriptionHi: 'प्राचीन भारत, दिल्ली सल्तनत, मुगल काल, राष्ट्रीय आंदोलन, इतिहास-दर्शन, शोध प्रविधि एवं उत्तराखण्ड का सांस्कृतिक व राजनीतिक इतिहास (सेमेस्टर 1-10)।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'polscience',
    nameEn: 'Political Science',
    nameHi: 'राजनीति विज्ञान',
    codePrefix: 'SDSUV-POL',
    faculty: 'Faculty of Arts & Social Sciences',
    iconName: 'Scale',
    colorGradient: 'from-violet-500 to-purple-600',
    accentColor: 'violet',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/e4f92881-367f-4ac3-94cf-02693b8a74ed-Hindi.pdf',
    descriptionEn: 'Political Theory, Indian Constitution, Civil Rights, Public Administration, Comparative Politics, International Relations & Western/Indian Political Philosophy under SDSUV NEP-2020.',
    descriptionHi: 'राजनीतिक सिद्धांत, भारतीय संविधान, नागरिक अधिकार, लोक प्रशासन, तुलनात्मक राजनीति, अंतर्राष्ट्रीय संबंध एवं भारतीय व पाश्चात्य राजनीतिक चिंतन (सेमेस्टर 1-10)।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'sociology',
    nameEn: 'Sociology',
    nameHi: 'समाजशास्त्र',
    codePrefix: 'SDSUV-SOC',
    faculty: 'Faculty of Arts & Social Sciences',
    iconName: 'Users',
    colorGradient: 'from-pink-500 to-rose-600',
    accentColor: 'rose',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/e4f92881-367f-4ac3-94cf-02693b8a74ed-Hindi.pdf',
    descriptionEn: 'Introductory Sociology, Indian Social System, Social Change, Classical Thinkers, Research Methods, Environmental Sociology & Culture and Society of Uttarakhand under SDSUV NEP-2020.',
    descriptionHi: 'प्रारंभिक समाजशास्त्र, भारतीय सामाजिक व्यवस्था, सामाजिक परिवर्तन, विचारक, शोध पद्धतियां, पर्यावरण समाजशास्त्र एवं उत्तराखण्ड की लोक संस्कृति (सेमेस्टर 1-10)।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'hindi',
    nameEn: 'Hindi Literature',
    nameHi: 'हिन्दी साहित्य',
    codePrefix: 'SDSUV-HIN',
    faculty: 'Faculty of Humanities & Languages',
    iconName: 'BookMarked',
    colorGradient: 'from-amber-500 to-rose-600',
    accentColor: 'amber',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/e4f92881-367f-4ac3-94cf-02693b8a74ed-Hindi.pdf',
    descriptionEn: 'Ancient & Bhakti Poetry, Hindi Fiction & Drama, Riti Poetry, Chhayavad, Indian & Western Poetics, Linguistics, Folk Literature & Uttarakhand Hindi Writers under SDSUV NEP-2020.',
    descriptionHi: 'प्राचीन एवं भक्तिकालीन काव्य, हिन्दी कथा साहित्य, नाटक, रीतिकालीन काव्य, छायावाद, भारतीय व पाश्चात्य काव्यशास्त्र, भाषा विज्ञान एवं उत्तराखण्ड के हिन्दी साहित्यकार (सेमेस्टर 1-10)।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'economics',
    nameEn: 'Economics',
    nameHi: 'अर्थशास्त्र',
    codePrefix: 'SDSUV-ECO',
    faculty: 'Faculty of Arts & Social Sciences',
    iconName: 'TrendingUp',
    colorGradient: 'from-blue-600 to-indigo-700',
    accentColor: 'blue',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/c2462507-beec-465e-9776-4017c967cc6b-Economics-Syallbus.pdf',
    descriptionEn: 'Microeconomics, Macroeconomics, Indian Economy, Monetary Systems, Development Economics, Quantitative Methods & Public Finance under SDSUV NEP-2020 with Drishti IAS & StudyIQ references.',
    descriptionHi: 'व्यष्टि एवं समष्टि अर्थशास्त्र, भारतीय अर्थव्यवस्था, मौद्रिक प्रणाली, विकास अर्थशास्त्र एवं लोक वित्त (सेमेस्टर 1-10) — दृष्टि IAS व StudyIQ नोट्स संदर्भ सहित।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'anthropology',
    nameEn: 'Anthropology',
    nameHi: 'मानवशास्त्र',
    codePrefix: 'SDSUV-ANT',
    faculty: 'Faculty of Arts & Social Sciences',
    iconName: 'Compass',
    colorGradient: 'from-teal-500 to-emerald-700',
    accentColor: 'teal',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/9d6dd361-8c43-43a2-9f26-611d3a6a214a-Anthropology.pdf',
    descriptionEn: 'Socio-Cultural Anthropology, Human Evolution, Archaeological Prehistory, Indian Tribal Cultures & Himalayan Ethnography under SDSUV NEP-2020 (Premier UPSC Optional).',
    descriptionHi: 'सामाजिक-सांस्कृतिक मानवशास्त्र, मानव उद्विकास, प्रागैतिहासिक पुरातत्व, भारतीय जनजातीय समाज एवं उत्तराखण्ड की जनजातियाँ (सेमेस्टर 1-10)।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'english',
    nameEn: 'English Literature',
    nameHi: 'अंग्रेजी साहित्य',
    codePrefix: 'SDSUV-ENG',
    faculty: 'Faculty of Humanities & Languages',
    iconName: 'Feather',
    colorGradient: 'from-indigo-500 to-purple-700',
    accentColor: 'indigo',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/8cb8b22f-caf9-4ef8-825a-358670fa3337-English.pdf',
    descriptionEn: 'British Poetry, Elizabethan Drama, Shakespeare, 18th & 19th Century Novels, Indian English Literature, Postcolonial Studies & Literary Theory under SDSUV NEP-2020.',
    descriptionHi: 'ब्रिटिश काव्य, शेक्सपियर के नाटक, 18वीं व 19वीं सदी का गद्य, भारतीय अंग्रेजी लेखन, उत्तर-औपनिवेशिक साहित्य एवं समालोचना सिद्धांत (सेमेस्टर 1-10)।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'sanskrit',
    nameEn: 'Sanskrit',
    nameHi: 'संस्कृत साहित्य',
    codePrefix: 'SDSUV-SAN',
    faculty: 'Faculty of Humanities & Languages',
    iconName: 'Sparkles',
    colorGradient: 'from-amber-600 to-orange-700',
    accentColor: 'amber',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/542e6369-f859-4717-b2bd-6a3ac7082470-Sanskrit.pdf',
    descriptionEn: 'Paninian Grammar (Laghusiddhantakaumudi), Kalidasa, Bhasa Drama, Vedic Suktas, Upanishads, Indian Darshana & Inscriptions of Uttarakhand under SDSUV NEP-2020.',
    descriptionHi: 'पाणिनीय व्याकरण (लघुसिद्धान्तकौमुदी), कालिदास (रघुवंशम्), भास (स्वप्नवासवदत्तम्), वैदिक सूक्त, उपनिषद्, भारतीय दर्शन एवं उत्तराखण्ड के संस्कृत अभिलेख (सेमेस्टर 1-10)।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'homescience',
    nameEn: 'Home Science',
    nameHi: 'गृह विज्ञान',
    codePrefix: 'SDSUV-HSC',
    faculty: 'Faculty of Arts & Sciences',
    iconName: 'HeartPulse',
    colorGradient: 'from-rose-500 to-red-600',
    accentColor: 'rose',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/f3e02369-4ec7-44d8-8919-19de64712e54-HOME-SCIENCE.pdf',
    descriptionEn: 'Foods & Nutrition Science, Human Development, Family Resource Management, Textile Science & Apparel Designing, Community Nutrition & Extension Education under SDSUV NEP-2020.',
    descriptionHi: 'आहार एवं पोषण विज्ञान, मानव विकास, पारिवारिक संसाधन प्रबंधन, वस्त्र विज्ञान, पारंपरिक कढ़ाई एवं प्रसार शिक्षा (सेमेस्टर 1-10)।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  {
    key: 'drawing',
    nameEn: 'Drawing & Painting',
    nameHi: 'चित्रकला',
    codePrefix: 'SDSUV-DRW',
    faculty: 'Faculty of Arts / Fine Arts',
    iconName: 'Palette',
    colorGradient: 'from-fuchsia-500 to-pink-600',
    accentColor: 'fuchsia',
    officialPdfUrl: 'https://assets.sdsuv.ac.in/uploads/f292f7f7-1988-41ce-b1cf-c88a59851497-Drawing-and-Painting.pdf',
    descriptionEn: 'Fundamentals of Visual Art, Still Life & Portraiture, Ancient Rock Art to Ajanta, Mughal & Pahari Miniatures, Uttarakhand Aipan Art, Modern Masters & Western Art under SDSUV NEP-2020.',
    descriptionHi: 'दृश्य कला के मूल तत्व, स्थिर वस्तु एवं मुखाकृति चित्रण, अजन्ता भित्तिचित्र, मुगल व पहाड़ी लघुचित्र, उत्तराखण्ड की ऐपण लोक कला, आधुनिक भारतीय व पाश्चात्य कला (सेमेस्टर 1-10)।',
    semesters: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
];

export const SYLLABUS_PAPERS_DATABASE: Record<SubjectKey, SyllabusPaper[]> = {
  geography: GEOGRAPHY_SYLLABUS_PAPERS,
  history: HISTORY_SYLLABUS_PAPERS,
  polscience: POLSCIENCE_SYLLABUS_PAPERS,
  sociology: SOCIOLOGY_SYLLABUS_PAPERS,
  hindi: HINDI_SYLLABUS_PAPERS,
  economics: ECONOMICS_SYLLABUS_PAPERS,
  anthropology: ANTHROPOLOGY_SYLLABUS_PAPERS,
  english: ENGLISH_SYLLABUS_PAPERS,
  sanskrit: SANSKRIT_SYLLABUS_PAPERS,
  homescience: HOMESCIENCE_SYLLABUS_PAPERS,
  drawing: DRAWING_SYLLABUS_PAPERS,
};
