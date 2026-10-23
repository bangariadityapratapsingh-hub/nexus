import { StreamType, LanguageType } from '@/lib/types';
import { ALL_ODD_SEMESTER_BA_SUBJECTS } from './allOddSemesterBAData';

export type LectureLanguage = 'English' | 'Hindi' | 'Hinglish';

export interface LectureVideo {
  id: string;
  titleEn: string;
  titleHi: string;
  channel: string;
  duration: string;
  youtubeId: string;
  views: string;
  language: LectureLanguage;
  badge?: string;
  searchFallback?: string;
}

export interface TopicItem {
  id: string;
  titleEn: string;
  titleHi: string;
  tag: '🔥 Most Asked in SDSUV' | '⚡ Easy Scoring' | '💎 10-Mark Theorem' | '🎯 2026 High Probability';
  duration: string;
  isCompleted?: boolean;
  youtubeId: string;
  language: LectureLanguage;
  instructorEn: string;
  instructorHi: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  searchFallback?: string;
  alternativeVideos: LectureVideo[];
  topicPYQs: {
    id: string;
    year: number;
    semester: number;
    marks: number;
    examType: 'Main' | 'Back';
    questionEn: string;
    questionHi: string;
    solutionEn: string;
    solutionHi: string;
    markingPoints: string[];
  }[];
  quickNotes: {
    summaryEn: string;
    summaryHi: string;
    formulas: { label: string; formula: string; explanation: string }[];
    coreTakeaways: string[];
  };
}

export interface UnitNode {
  unitNumber: number;
  titleEn: string;
  titleHi: string;
  totalHours: number;
  weightageMarks: number;
  sdsuvCreditWeight: string;
  chapters: {
    chapterNumber: number;
    titleEn: string;
    titleHi: string;
    topics: TopicItem[];
  }[];
}

export interface LearnSubjectData {
  id: string;
  code: string;
  nameEn: string;
  nameHi: string;
  stream: StreamType;
  semester: number;
  units: UnitNode[];
}

export const LEARN_SUBJECTS_DATA: Record<StreamType, LearnSubjectData[]> = {
  'bsc-maths': [
    {
      id: 'phy-201',
      code: 'SDSUV-PHY-201',
      nameEn: 'Physics: Modern Optics & Quantum Physics',
      nameHi: 'भौतिकी: आधुनिक प्रकाशिकी एवं क्वांटम भौतिकी',
      stream: 'bsc-maths',
      semester: 4,
      units: [
        {
          unitNumber: 1,
          titleEn: 'Interference & Newton’s Rings in Thin Films',
          titleHi: 'पतली फिल्मों में व्यतिकरण एवं न्यूटन वलय',
          totalHours: 12,
          weightageMarks: 20,
          sdsuvCreditWeight: '1.0 Credit',
          chapters: [
            {
              chapterNumber: 1,
              titleEn: 'Division of Amplitude & Newton’s Rings',
              titleHi: 'आयाम का विभाजन एवं न्यूटन वलय',
              topics: [
                {
                  id: 't-phy-101',
                  titleEn: "Newton's Rings by Reflected Light: Diameter Formula & Wavelength Determination",
                  titleHi: 'परावर्तित प्रकाश द्वारा न्यूटन वलय: व्यास सूत्र एवं तरंगदैर्घ्य निर्धारण',
                  tag: '🔥 Most Asked in SDSUV',
                  duration: '24:18',
                  youtubeId: 'VhLiwDYehCw',
                  language: 'Hinglish',
                  instructorEn: 'Dr. Ashutosh Pandey (Technical Physics)',
                  instructorHi: 'डॉ. आशुतोष पांडेय (टेक्निकल फिजिक्स)',
                  difficulty: 'Intermediate',
                  alternativeVideos: [
                    {
                      id: 'alt-phy-hing-1',
                      titleEn: 'Newton’s Rings Important Numericals & Diameter Calculation',
                      titleHi: 'न्यूटन वलय महत्वपूर्ण आंकिक प्रश्न एवं व्यास गणना',
                      channel: 'Technical Physics',
                      duration: '21:40',
                      youtubeId: 'FCgO_PLOlv0',
                      views: '420K',
                      language: 'Hinglish',
                      badge: 'High Clarity',
                    },
                    {
                      id: 'alt-phy-en-1',
                      titleEn: 'NPTEL Physics: Newton’s Rings Interference & Optical Path Difference',
                      titleHi: 'एनपीटीईएल व्याख्यान: न्यूटन वलय व्यतिकरण एवं पथांतर',
                      channel: 'NPTEL - IIT Madras',
                      duration: '34:15',
                      youtubeId: 'lmW-7z4GD68',
                      views: '185K',
                      language: 'English',
                      badge: 'NPTEL Official',
                    },
                    {
                      id: 'alt-phy-hi-1',
                      titleEn: 'न्यूटन वलय का संपूर्ण सिद्धांत एवं प्रायोगिक व्यवस्था (इंजीनियरिंग फिजिक्स)',
                      titleHi: 'न्यूटन वलय का संपूर्ण सिद्धांत एवं प्रायोगिक व्यवस्था (इंजीनियरिंग फिजिक्स)',
                      channel: 'S Chand Academy',
                      duration: '26:50',
                      youtubeId: 'lYz7c5pyO2Q',
                      views: '290K',
                      language: 'Hindi',
                      badge: 'SDSUV Preferred',
                    },
                  ],
                  topicPYQs: [
                    {
                      id: 'pyq-t-1',
                      year: 2024,
                      semester: 4,
                      marks: 10,
                      examType: 'Main',
                      questionEn: "In Newton's rings experiment, derive the expression for diameters of bright and dark rings in reflected light. Explain why the central ring is dark.",
                      questionHi: 'न्यूटन वलय प्रयोग में, परावर्तित प्रकाश में दीप्त एवं अदीप्त वलयों के व्यास का व्यंजक प्राप्त कीजिए। समझाइए कि केंद्रीय वलय अदीप्त क्यों होता है।',
                      solutionEn: "Path difference for reflected light from a thin film with air: Δ = 2μt cos(r) + λ/2. For normal incidence (r=0, μ=1 for air): Δ = 2t + λ/2. For circular film of radius of curvature R: t = r²/2R. Condition for dark rings: Δ = (2n+1)λ/2 => 2t = nλ => D_n² = 4nλR. At contact point t=0, path diff is λ/2 causing destructive interference (dark center).",
                      solutionHi: 'परावर्तित प्रकाश हेतु पथांतर: Δ = 2μt cos(r) + λ/2। अभिलंब आपतन (r=0, μ=1) हेतु: Δ = 2t + λ/2। वक्रता त्रिज्या R हेतु मोटाई t = r²/2R। अदीप्त वलयों की शर्त: 2t = nλ => D_n² = 4nλR। स्पर्श बिंदु पर t=0 होने से पथांतर λ/2 रहता है, जिससे विनाशी व्यतिकरण (काला केंद्र) बनता है।',
                      markingPoints: [
                        'Correct expression for optical path difference (2 Marks)',
                        'Geometry of thin wedge air film t = r²/2R (2 Marks)',
                        'Dark fringe condition D_n = √(4nλR) derivation (3 Marks)',
                        'Phase change of π at denser medium explanation (3 Marks)',
                      ],
                    },
                    {
                      id: 'pyq-t-2',
                      year: 2022,
                      semester: 4,
                      marks: 5,
                      examType: 'Main',
                      questionEn: 'In Newton’s rings, if liquid of refractive index μ is introduced between glass plate and lens, how does diameter of nth dark ring change?',
                      questionHi: 'यदि लेंस और प्लेट के बीच μ अपवर्तनांक का द्रव भर दिया जाए, तो nवीं अदीप्त वलय का व्यास किस प्रकार परिवर्तित होगा?',
                      solutionEn: "With liquid of refractive index μ, optical path difference becomes 2μt = nλ. Therefore diameter Dn' = √(4nλR / μ) = Dn / √μ. Since μ > 1, the diameters contract and rings move closer together.",
                      solutionHi: 'द्रव भरने पर पथांतर 2μt = nλ हो जाता है। अतः व्यास Dn\' = Dn / √μ हो जाता है। चूँकि μ > 1, अतः वलयों के व्यास घट जाते हैं और वलय सिकुड़ कर पास आ जाते हैं।',
                      markingPoints: ['Path difference with refractive index (2 Marks)', 'Contraction formula Dn/√μ (2 Marks)', 'Physical conclusion (1 Mark)'],
                    },
                  ],
                  quickNotes: {
                    summaryEn: 'Newton’s rings are circular interference fringes of equal thickness formed by division of amplitude at the air wedge film between a plano-convex lens and optical flat.',
                    summaryHi: 'न्यूटन वलय सम-मोटाई के वृत्ताकार व्यतिकरण फ्रिंज होते हैं, जो समतलोत्तल लेंस एवं कांच की प्लेट के मध्य बनी वायु फिल्म में आयाम विभाजन द्वारा उत्पन्न होते हैं।',
                    formulas: [
                      {
                        label: 'Dark Ring Diameter',
                        formula: 'D_n = \\sqrt{4n\\lambda R}',
                        explanation: 'Directly proportional to square root of natural numbers n = 1, 2, 3...',
                      },
                      {
                        label: 'Bright Ring Diameter',
                        formula: 'D_n = \\sqrt{2(2n-1)\\lambda R}',
                        explanation: 'Directly proportional to square root of odd numbers',
                      },
                      {
                        label: 'Wavelength Formula',
                        formula: '\\lambda = \\frac{D_{n+p}^2 - D_n^2}{4pR}',
                        explanation: 'Eliminates error due to imperfect contact at center',
                      },
                    ],
                    coreTakeaways: [
                      'Central ring is always dark in reflected light due to Stokes’ phase reversal (π shift)',
                      'In transmitted light, the central ring is bright (complementary fringe system)',
                      'Ring diameter shrinks by factor 1/√μ when liquid is introduced',
                    ],
                  },
                },
                {
                  id: 't-phy-102',
                  titleEn: 'Michelson Interferometer: Circular Fringes & Wavelength Measurement',
                  titleHi: 'माइकलसन व्यतिकरणमापी: वृत्ताकार फ्रिंज एवं तरंगदैर्घ्य मापन',
                  tag: '💎 10-Mark Theorem',
                  duration: '22:15',
                  youtubeId: 'k-Keebe--44',
                  language: 'Hinglish',
                  instructorEn: 'Physics Wallah (Alakh Pandey)',
                  instructorHi: 'फिजिक्स वाला (अलख पांडेय)',
                  difficulty: 'Advanced',
                  alternativeVideos: [
                    {
                      id: 'alt-m-en',
                      titleEn: 'Michelson Interferometer and Circular Fringes (English)',
                      titleHi: 'माइकलसन व्यतिकरणमापी एवं वृत्ताकार फ्रिंज (अंग्रेजी व्याख्यान)',
                      channel: 'NPTEL - Physics',
                      duration: '28:40',
                      youtubeId: 'lmW-7z4GD68',
                      views: '240K',
                      language: 'English',
                      badge: 'Academic Standard',
                    },
                    {
                      id: 'alt-m-hi',
                      titleEn: 'माइकलसन व्यतिकरणमापी की संरचना एवं कार्यप्रणाली (सरल हिंदी व्याख्या)',
                      titleHi: 'माइकलसन व्यतिकरणमापी की संरचना एवं कार्यप्रणाली (सरल हिंदी व्याख्या)',
                      channel: 'Physics Wallah (Alakh Pandey)',
                      duration: '24:15',
                      youtubeId: 'k-Keebe--44',
                      views: '145K',
                      language: 'Hindi',
                      badge: 'Exam Oriented',
                    },
                  ],
                  topicPYQs: [
                    {
                      id: 'pyq-m-1',
                      year: 2023,
                      semester: 4,
                      marks: 10,
                      examType: 'Main',
                      questionEn: 'Describe the construction and working of Michelson’s Interferometer. Explain the function of compensating plate.',
                      questionHi: 'माइकलसन व्यतिकरणमापी की रचना एवं कार्यप्रणाली का वर्णन कीजिए। प्रतिकारी प्लेट का कार्य समझाइए।',
                      solutionEn: 'Consists of beam splitter G1, compensating plate G2, and two perpendicular plane mirrors M1 and M2. G2 equalizes glass path length for both beams.',
                      solutionHi: 'इसमें बीम स्प्लिटर G1, प्रतिकारी प्लेट G2 एवं दो परस्पर लंबवत समतल दर्पण M1 व M2 होते हैं। G2 दोनों पुंजों हेतु कांच में पथ लंबाई को समान करती है।',
                      markingPoints: ['Optical ray diagram (3 Marks)', 'Compensator role (3 Marks)', 'Fringe formation (4 Marks)'],
                    },
                  ],
                  quickNotes: {
                    summaryEn: 'Michelson interferometer produces fringes by amplitude splitting using a half-silvered mirror.',
                    summaryHi: 'माइकलसन व्यतिकरणमापी अर्द्ध-रजत दर्पण द्वारा आयाम विभाजन कर फ्रिंज उत्पन्न करता है।',
                    formulas: [
                      {
                        label: 'Path Difference',
                        formula: '2d \\cos r = n\\lambda',
                        explanation: 'd is distance between mirror M1 and virtual image M2\'',
                      },
                    ],
                    coreTakeaways: ['Circular fringes appear when mirrors are exactly perpendicular'],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'mth-201',
      code: 'SDSUV-MTH-201',
      nameEn: 'Mathematics: Linear Algebra & Differential Equations',
      nameHi: 'गणित: रैखिक बीजगणित एवं अवकल समीकरण',
      stream: 'bsc-maths',
      semester: 4,
      units: [
        {
          unitNumber: 1,
          titleEn: 'Matrices, Eigenvalues & Cayley-Hamilton Theorem',
          titleHi: 'आव्यूह, आइगेनमान एवं कैले-हैमिल्टन प्रमेय',
          totalHours: 14,
          weightageMarks: 25,
          sdsuvCreditWeight: '1.0 Credit',
          chapters: [
            {
              chapterNumber: 1,
              titleEn: 'Eigenvalues & Characteristic Equation',
              titleHi: 'आइगेनमान एवं अभिलाक्षणिक समीकरण',
              topics: [
                {
                  id: 't-mth-101',
                  titleEn: 'Eigenvalues, Eigenvectors & Diagonalization of Matrices',
                  titleHi: 'आइगेनमान, आइगेनसदिश एवं आव्यूहों का विकर्णीकरण',
                  tag: '🔥 Most Asked in SDSUV',
                  duration: '26:50',
                  youtubeId: 'cHLN0Pqt_7U',
                  language: 'Hinglish',
                  instructorEn: 'Dr. Gajendra Purohit (Mathematics Hub)',
                  instructorHi: 'डॉ. गजेन्द्र पुरोहित (गणित मंच)',
                  difficulty: 'Intermediate',
                  alternativeVideos: [
                    {
                      id: 'alt-mth-gate-1',
                      titleEn: 'Cayley-Hamilton Theorem & Matrix Inverse with Solved Examples',
                      titleHi: 'कैले-हैमिल्टन प्रमेय एवं आव्यूह व्युत्क्रम हल उदाहरण सहित',
                      channel: 'Gate Smashers (Varun Singla)',
                      duration: '19:40',
                      youtubeId: 'S97O036JwvQ',
                      views: '1.8M',
                      language: 'Hinglish',
                      badge: 'BSc Top Rated',
                    },
                    {
                      id: 'alt-mth-nptel-1',
                      titleEn: 'Lec-20: Important Points on Eigen Values & Eigen Vectors (English)',
                      titleHi: 'रैखिक बीजगणित: अभिलाक्षणिक मूल एवं आइगेन-समष्टि',
                      channel: 'Gate Smashers',
                      duration: '18:10',
                      youtubeId: 'M1nVM6fNxto',
                      views: '720K',
                      language: 'English',
                      badge: 'University Rigor',
                    },
                    {
                      id: 'alt-mth-gp-hi',
                      titleEn: 'आइगेन वैल्यू एवं आइगेन वेक्टर निकालने का सबसे सरल तरीका (हिंदी माध्यम)',
                      titleHi: 'आइगेन वैल्यू एवं आइगेन वेक्टर निकालने का सबसे सरल तरीका (हिंदी माध्यम)',
                      channel: 'Dr. Gajendra Purohit',
                      duration: '22:15',
                      youtubeId: 'cHLN0Pqt_7U',
                      views: '950K',
                      language: 'Hindi',
                      badge: 'SDSUV 10-Mark Essential',
                    },
                  ],
                  topicPYQs: [
                    {
                      id: 'pyq-mth-1',
                      year: 2024,
                      semester: 4,
                      marks: 10,
                      examType: 'Main',
                      questionEn: 'State and prove Cayley-Hamilton theorem. Use it to find the inverse of the matrix A = [[1, 2], [3, 4]].',
                      questionHi: 'कैले-हैमिल्टन प्रमेय का कथन लिखिए एवं सिद्ध कीजिए। इसका उपयोग करके आव्यूह A का व्युत्क्रम ज्ञात कीजिए।',
                      solutionEn: "Every square matrix satisfies its own characteristic equation: |A - λI| = 0 => λ² - 5λ - 2 = 0. By Cayley-Hamilton: A² - 5A - 2I = 0. Multiplying by A⁻¹ gives A - 5I - 2A⁻¹ = 0 => A⁻¹ = (1/2)(A - 5I).",
                      solutionHi: 'प्रत्येक वर्ग आव्यूह अपने अभिलाक्षणिक समीकरण को संतुष्ट करता है: |A - λI| = 0 => λ² - 5λ - 2 = 0। कैले-हैमिल्टन प्रमेय से: A² - 5A - 2I = 0। A⁻¹ से गुणा करने पर: A - 5I - 2A⁻¹ = 0 => A⁻¹ = (1/2)(A - 5I)।',
                      markingPoints: [
                        'Statement of Cayley-Hamilton Theorem (2 Marks)',
                        'Proof using adjugate matrix B(λ) = adj(A - λI) (4 Marks)',
                        'Characteristic polynomial calculation (2 Marks)',
                        'Correct evaluation of inverse A⁻¹ (2 Marks)',
                      ],
                    },
                  ],
                  quickNotes: {
                    summaryEn: 'An eigenvalue λ and non-zero eigenvector X satisfy AX = λX or (A - λI)X = 0.',
                    summaryHi: 'एक आइगेनमान λ एवं अशून्य आइगेनसदिश X समीकरण AX = λX को संतुष्ट करते हैं।',
                    formulas: [
                      {
                        label: 'Characteristic Equation',
                        formula: '|A - \\lambda I| = 0',
                        explanation: 'Roots of this polynomial are the eigenvalues of matrix A',
                      },
                      {
                        label: 'Trace and Determinant Rule',
                        formula: '\\sum \\lambda_i = \\text{tr}(A), \\quad \\prod \\lambda_i = \\det(A)',
                        explanation: 'Sum of eigenvalues equals trace; product equals determinant',
                      },
                    ],
                    coreTakeaways: [
                      'Eigenvalues of a real symmetric matrix are always real',
                      'Cayley-Hamilton theorem states every square matrix satisfies its characteristic equation',
                      'If all eigenvalues are distinct, the matrix is guaranteed to be diagonalizable',
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  'bsc-bio': [
    {
      id: 'bot-201',
      code: 'SDSUV-BOT-201',
      nameEn: 'Botany: Plant Physiology & Biochemistry',
      nameHi: 'वनस्पति विज्ञान: पादप कार्यिकी एवं जैव रसायन',
      stream: 'bsc-bio',
      semester: 4,
      units: [
        {
          unitNumber: 1,
          titleEn: 'Plant-Water Relations & Mineral Nutrition',
          titleHi: 'पादप-जल संबंध एवं खनिज पोषण',
          totalHours: 12,
          weightageMarks: 20,
          sdsuvCreditWeight: '1.0 Credit',
          chapters: [
            {
              chapterNumber: 1,
              titleEn: 'Transpiration & Stomatal Mechanics',
              titleHi: 'वाष्पोत्सर्जन एवं रंध्रीय यांत्रिकी',
              topics: [
                {
                  id: 't-bot-101',
                  titleEn: "Levitt's Active K+ - H+ Proton Transport Mechanism of Stomatal Opening",
                  titleHi: 'रंध्रों के खुलने की लेविट की सक्रिय K+ - H+ प्रोटॉन परिवहन क्रियाविधि',
                  tag: '🔥 Most Asked in SDSUV',
                  duration: '22:30',
                  youtubeId: '3-9LXOB6pXE',
                  language: 'Hinglish',
                  instructorEn: 'illume Biology & Plant Sciences',
                  instructorHi: 'इल्यूम बायोलॉजी एवं पादप विज्ञान',
                  difficulty: 'Intermediate',
                  alternativeVideos: [
                    {
                      id: 'alt-bot-en',
                      titleEn: 'Pure English Biology: Stomatal Biophysics & Guard Cell Electrophysiology',
                      titleHi: 'शुद्ध अंग्रेजी व्याख्यान: रंध्रीय जैवभौतिकी एवं द्वार कोशिका कार्यप्रणाली',
                      channel: 'illume Biology',
                      duration: '28:10',
                      youtubeId: '3-9LXOB6pXE',
                      views: '142K',
                      language: 'English',
                      badge: 'High Detail',
                    },
                    {
                      id: 'alt-bot-hi',
                      titleEn: 'रंध्र खुलने की K+ आयन पंप परिकल्पना (विस्तृत हिंदी माध्यम व्याख्या)',
                      titleHi: 'रंध्र खुलने की K+ आयन पंप परिकल्पना (विस्तृत हिंदी माध्यम व्याख्या)',
                      channel: 'College Biology Hindi',
                      duration: '25:40',
                      youtubeId: 'eyajPc-j70k',
                      views: '320K',
                      language: 'Hindi',
                      badge: 'SDSUV Recommended',
                    },
                  ],
                  topicPYQs: [
                    {
                      id: 'pyq-bot-1',
                      year: 2024,
                      semester: 4,
                      marks: 10,
                      examType: 'Main',
                      questionEn: 'Describe the active potassium-proton pump theory of stomatal opening and closing proposed by Levitt.',
                      questionHi: 'लेविट द्वारा प्रतिपादित रंध्रों के खुलने और बंद होने की सक्रिय पोटेशियम-प्रोटॉन पंप संकल्पना का वर्णन कीजिए।',
                      solutionEn: 'In light, guard cell protons (H+) are pumped out via H+-ATPase, creating an electrochemical gradient. K+ ions enter guard cells, paired with malate ions, increasing turgor pressure and opening the stomatal pore.',
                      solutionHi: 'प्रकाश में द्वार कोशिकाओं से H+ आयन सक्रिय रूप से बाहर निकलते हैं, जिससे K+ आयन अंदर आते हैं। मैलेट आयन बनने से परासरण दाब बढ़ता है और रंध्र खुल जाते हैं।',
                      markingPoints: ['Role of light & malic acid (3 Marks)', 'K+ influx & turgor change (4 Marks)', 'Closure mechanism in dark (3 Marks)'],
                    },
                  ],
                  quickNotes: {
                    summaryEn: 'Stomatal movements are regulated by reversible osmotic shifts driven by active K+ uptake and malate synthesis.',
                    summaryHi: 'रंध्रीय गति सक्रिय पोटेशियम अंतर्गमन और मैलेट निर्माण द्वारा उत्पन्न परासरणी परिवर्तनों पर निर्भर करती है।',
                    formulas: [],
                    coreTakeaways: ['ABA hormone causes closure of stomata during drought stress'],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  'ba-arts': ALL_ODD_SEMESTER_BA_SUBJECTS,
};
