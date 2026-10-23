import { StreamType } from '@/lib/types';
import { ODD_SEMESTER_PYQS } from './oddSemesterPyqs';

export interface DetailedPYQ {
  id: string;
  stream: StreamType;
  subjectCode: string;
  subjectNameEn: string;
  subjectNameHi: string;
  semester?: number; // 1 | 2 | 3 | 4 | 5 | 6 (NEP 2020)
  unitNumber?: number; // 1 | 2 | 3 | 4
  chapterEn: string;
  chapterHi: string;
  topicEn: string;
  topicHi: string;
  questionEn: string;
  questionHi: string;
  marks: 2 | 5 | 10 | 15;
  section: 'A' | 'B' | 'C'; // A = Short (2M), B = Medium (5M/10M), C = Long (15M)
  type: 'Short' | 'Medium' | 'Long';
  repeatedCount: number;
  yearsAppeared: number[];
  frequencyTag: '🔥 Repeated 5+ Times' | 'Repeated 3x' | 'SDSUV High-Yield' | 'Core Theorem';
  solutionEn: string;
  solutionHi: string;
  examinerRubric: string[];
  learnTopicId: string; // for "Watch Topic Lecture" linking to /learn
}

export const COMPREHENSIVE_PYQ_DATA: DetailedPYQ[] = [
  ...ODD_SEMESTER_PYQS,
  // ===================== BSC MATHS: PHYSICS =====================
  {
    id: 'pyq-p-01',
    stream: 'bsc-maths',
    subjectCode: 'SDSUV-PHY-201',
    subjectNameEn: 'Physics (Optics & Quantum Mechanics)',
    subjectNameHi: 'भौतिकी (प्रकाशिकी एवं क्वांटम यांत्रिकी)',
    chapterEn: 'Unit 1: Interference in Thin Films',
    chapterHi: 'इकाई 1: पतली फिल्मों में व्यतिकरण',
    topicEn: "Newton's Rings & Diameter Derivations",
    topicHi: 'न्यूटन वलय एवं व्यास व्युत्पत्ति',
    questionEn: "State the principle of division of amplitude. Derive the formula for diameters of dark and bright rings in Newton's rings by reflected light: D_n² = 4nλR. Why is the central fringe dark in reflected light?",
    questionHi: "आयाम विभाजन का सिद्धांत लिखिए। परावर्तित प्रकाश में न्यूटन वलय के अदीप्त एवं दीप्त वलयों के व्यास का सूत्र D_n² = 4nλR व्युत्पन्न कीजिए। परावर्तित प्रकाश में केंद्रीय फ्रिंज अदीप्त क्यों होती है?",
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2021, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: "In Newton's rings, circular interference fringes are formed between plano-convex lens and optical plate. Optical path diff for reflected light: Δ = 2μt + λ/2. For air (μ=1): Δ = 2t + λ/2. Since t = r²/2R = D²/8R, destructive condition Δ = (2n+1)λ/2 gives 2(D²/8R) = nλ => D_n² = 4nλR. At contact point t=0, phase change of π (path λ/2) causes destructive interference (dark central spot).",
    solutionHi: "समतलोत्तल लेंस और समतल प्लेट के मध्य वृत्ताकार व्यतिकरण फ्रिंज बनते हैं। परावर्तित प्रकाश में पथांतर Δ = 2t + λ/2। मोटाई t = D²/8R रखने पर अदीप्त शर्त 2(D²/8R) = nλ से D_n² = 4nλR मिलता है। संपर्क बिंदु पर t=0 होने पर भी सघन माध्यम से परावर्तन के कारण λ/2 पथांतर शेष रहता है, जिससे विनाशी व्यतिकरण (काला केंद्र) बनता है।",
    examinerRubric: [
      'Division of amplitude explanation (2 Marks)',
      'Ray diagram of thin air wedge film (3 Marks)',
      'Algebraic derivation of Dn² = 4nλR (6 Marks)',
      'Stokes phase reversal at denser boundary (4 Marks)',
    ],
    learnTopicId: 't-phy-101',
  },
  {
    id: 'pyq-p-02',
    stream: 'bsc-maths',
    subjectCode: 'SDSUV-PHY-201',
    subjectNameEn: 'Physics (Optics & Quantum Mechanics)',
    subjectNameHi: 'भौतिकी (प्रकाशिकी एवं क्वांटम यांत्रिकी)',
    chapterEn: 'Unit 1: Interference in Thin Films',
    chapterHi: 'इकाई 1: पतली फिल्मों में व्यतिकरण',
    topicEn: "Refractive Index using Newton's Rings",
    topicHi: 'न्यूटन वलय द्वारा द्रव का अपवर्तनांक',
    questionEn: "How can Newton's rings be utilized to measure the refractive index of an unknown transparent liquid? Derive the working equation.",
    questionHi: "अज्ञात पारदर्शी द्रव का अपवर्तनांक ज्ञात करने हेतु न्यूटन वलय का उपयोग किस प्रकार किया जाता है? कार्यकारी समीकरण व्युत्पन्न कीजिए।",
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 4,
    yearsAppeared: [2020, 2022, 2023, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: "With liquid of refractive index μ: (D_{n+p}² - D_n²)_liquid = 4pλR/μ. In air: (D_{n+p}² - D_n²)_air = 4pλR. Dividing yields μ = (D_{n+p}² - D_n²)_air / (D_{n+p}² - D_n²)_liquid.",
    solutionHi: "द्रव की उपस्थिति में: (D_{n+p}² - D_n²)_द्रव = 4pλR/μ। वायु में: (D_{n+p}² - D_n²)_वायु = 4pλR। दोनों का अनुपात लेने पर μ = (D_{n+p}² - D_n²)_वायु / (D_{n+p}² - D_n²)_द्रव प्राप्त होता है।",
    examinerRubric: ['Formula in air & liquid (2 Marks)', 'Ratio equation derivation (2 Marks)', 'Error elimination rationale (1 Mark)'],
    learnTopicId: 't-phy-101',
  },
  {
    id: 'pyq-p-03',
    stream: 'bsc-maths',
    subjectCode: 'SDSUV-PHY-201',
    subjectNameEn: 'Physics (Optics & Quantum Mechanics)',
    subjectNameHi: 'भौतिकी (प्रकाशिकी एवं क्वांटम यांत्रिकी)',
    chapterEn: 'Unit 1: Interference in Thin Films',
    chapterHi: 'इकाई 1: पतली फिल्मों में व्यतिकरण',
    topicEn: 'Michelson Interferometer Compensating Plate',
    topicHi: 'माइकलसन व्यतिकरणमापी प्रतिकारी प्लेट',
    questionEn: 'What is the function of the compensating plate in Michelson’s Interferometer? What happens if it is removed?',
    questionHi: 'माइकलसन व्यतिकरणमापी में प्रतिकारी प्लेट का क्या कार्य है? यदि इसे हटा दिया जाए तो क्या होगा?',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 5,
    yearsAppeared: [2019, 2021, 2022, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'Beam 1 passes through beam splitter G1 three times while beam 2 passes only once. Compensating plate G2 of identical thickness and material equalizes the glass optical path for all wavelengths.',
    solutionHi: 'किरण 1 बीम स्प्लिटर G1 से तीन बार गुजरती है जबकि किरण 2 केवल एक बार। समान मोटाई व अपवर्तनांक की प्रतिकारी प्लेट G2 दोनों पुंजों के लिए कांच में पथ लंबाई को समान करती है।',
    examinerRubric: ['Path length inequality reason (1 Mark)', 'Restoration of white light condition (1 Mark)'],
    learnTopicId: 't-phy-102',
  },
  {
    id: 'pyq-p-04',
    stream: 'bsc-maths',
    subjectCode: 'SDSUV-PHY-201',
    subjectNameEn: 'Physics (Optics & Quantum Mechanics)',
    subjectNameHi: 'भौतिकी (प्रकाशिकी एवं क्वांटम यांत्रिकी)',
    chapterEn: 'Unit 3: Quantum Mechanics Postulates',
    chapterHi: 'इकाई 3: क्वांटम यांत्रिकी अभिगृहीत',
    topicEn: 'Schrödinger Equation & Particle in a Box',
    topicHi: 'श्रोडिंगर समीकरण एवं 1D बॉक्स में कण',
    questionEn: "Set up the time-independent Schrödinger wave equation for a free particle of mass m trapped in a 1D box with rigid walls of length L (0 ≤ x ≤ L). Find its energy eigenvalues and normalized eigenfunctions. Show that zero-point energy is non-zero.",
    questionHi: "L लंबाई (0 ≤ x ≤ L) के 1-विमीय दृढ़ बॉक्स में परिबद्ध m द्रव्यमान के कण हेतु काल-अनाश्रित श्रोडिंगर समीकरण स्थापित कीजिए। इसके ऊर्जा आइगेनमान एवं प्रसामान्यीकृत आइगेनफलन ज्ञात कीजिए। दर्शाइए कि शून्य-बिंदु ऊर्जा अशून्य होती है।",
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 7,
    yearsAppeared: [2019, 2020, 2021, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: "Differential eqn inside box: d²ψ/dx² + (2mE/ħ²)ψ = 0. General solution: ψ(x) = A sin(kx) + B cos(kx). At x=0, ψ(0)=0 => B=0. At x=L, ψ(L)=0 => sin(kL)=0 => kL = nπ => k = nπ/L. Energy En = ħ²k²/2m = n²h²/(8mL²). Normalization ∫_0^L |ψ|²dx = 1 => A = √(2/L). For n=1, E1 = h²/(8mL²) > 0, verifying Heisenberg uncertainty principle.",
    solutionHi: "बॉक्स के भीतर समीकरण: d²ψ/dx² + (2mE/ħ²)ψ = 0। व्यापक हल: ψ(x) = A sin(kx) + B cos(kx)। x=0 पर B=0; x=L पर k = nπ/L। अतः ऊर्जा En = n²h²/(8mL²)। प्रसामान्यीकरण से A = √(2/L)। मूल अवस्था n=1 हेतु E1 = h²/(8mL²) > 0, जो हाइजेनबर्ग अनिश्चितता सिद्धांत का परिणाम है।",
    examinerRubric: [
      'Differential equation setup (3 Marks)',
      'Boundary conditions at x=0 and x=L (4 Marks)',
      'Energy eigenvalue formula derivation (4 Marks)',
      'Normalization constant and Zero-point energy (4 Marks)',
    ],
    learnTopicId: 't-phy-301',
  },
  {
    id: 'pyq-p-05',
    stream: 'bsc-maths',
    subjectCode: 'SDSUV-PHY-201',
    subjectNameEn: 'Physics (Optics & Quantum Mechanics)',
    subjectNameHi: 'भौतिकी (प्रकाशिकी एवं क्वांटम यांत्रिकी)',
    chapterEn: 'Unit 2: Diffraction at Slits',
    chapterHi: 'इकाई 2: स्लिटों पर विवर्तन',
    topicEn: 'Diffraction Grating Dispersive Power',
    topicHi: 'विवर्तन ग्रेटिंग की विक्षेपण क्षमता',
    questionEn: 'Define dispersive power of a diffraction grating. Derive an expression for dθ/dλ and contrast it with resolving power.',
    questionHi: 'विवर्तन ग्रेटिंग की विक्षेपण क्षमता को परिभाषित कीजिए। dθ/dλ का व्यंजक प्राप्त कीजिए तथा इसकी तुलना विभेदन क्षमता से कीजिए।',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 4,
    yearsAppeared: [2021, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: "Grating equation: (a+b) sin θ = nλ. Differentiating with respect to λ: (a+b) cos θ (dθ/dλ) = n => dθ/dλ = n / [(a+b) cos θ]. Dispersive power measures angular separation of wavelengths, while resolving power (λ/dλ = nN) measures the ability to resolve two very close wavelengths.",
    solutionHi: "ग्रेटिंग समीकरण: (a+b) sin θ = nλ। अवकलन करने पर: dθ/dλ = n / [(a+b) cos θ]। विक्षेपण क्षमता दो तरंगदैर्घ्यों के कोणीय पृथक्करण को मापती है, जबकि विभेदन क्षमता (λ/dλ = nN) दो अत्यंत निकट तरंगदैर्घ्यों को अलग-अलग देखने की सीमा दर्शाती है।",
    examinerRubric: ['Definition of dθ/dλ (1 Mark)', 'Mathematical derivation (2 Marks)', 'Contrast with resolving power (2 Marks)'],
    learnTopicId: 't-phy-201',
  },
  {
    id: 'pyq-p-06',
    stream: 'bsc-maths',
    subjectCode: 'SDSUV-PHY-201',
    subjectNameEn: 'Physics (Optics & Quantum Mechanics)',
    subjectNameHi: 'भौतिकी (प्रकाशिकी एवं क्वांटम यांत्रिकी)',
    chapterEn: 'Unit 4: Laser Physics',
    chapterHi: 'इकाई 4: लेज़र भौतिकी',
    topicEn: 'Population Inversion in He-Ne Laser',
    topicHi: 'He-Ne लेज़र में जनसंख्या व्युत्क्रमण',
    questionEn: 'What is population inversion? How is it achieved in a Helium-Neon gas laser?',
    questionHi: 'जनसंख्या व्युत्क्रमण (Population Inversion) क्या है? हीलियम-नियॉन गैस लेज़र में इसे कैसे प्राप्त किया जाता है?',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 5,
    yearsAppeared: [2019, 2020, 2022, 2023, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'Population inversion is the state where the number of atoms in a higher energy state N2 exceeds those in lower energy state N1 (N2 > N1). In He-Ne laser, electrical discharge excites He atoms to metastable states (20.61 eV), which transfer energy via inelastic collisions to Ne 3s level.',
    solutionHi: 'उच्च ऊर्जा स्तर में परमाणुओं की संख्या (N2) का निम्न ऊर्जा स्तर (N1) से अधिक होना जनसंख्या व्युत्क्रमण कहलाता है। He-Ne लेज़र में विद्युत विसर्जन द्वारा He परमाणु 20.61 eV पर उत्तेजित होकर अप्रत्यास्थ संघट्ट द्वारा Ne के 3s स्तर को जनसंख्या प्रदान करते हैं।',
    examinerRubric: ['Definition of N2 > N1 (1 Mark)', 'Inelastic collision transfer in He-Ne (1 Mark)'],
    learnTopicId: 't-phy-401',
  },

  // ===================== BSC MATHS: MATHEMATICS =====================
  {
    id: 'pyq-m-01',
    stream: 'bsc-maths',
    subjectCode: 'SDSUV-MTH-201',
    subjectNameEn: 'Mathematics (Linear Algebra)',
    subjectNameHi: 'गणित (रैखिक बीजगणित)',
    chapterEn: 'Unit 3: Eigenvalues & Cayley-Hamilton',
    chapterHi: 'इकाई 3: आइगेनमान एवं कैले-हैमिल्टन',
    topicEn: 'Cayley-Hamilton Theorem & Inverse Matrix',
    topicHi: 'कैले-हैमिल्टन प्रमेय एवं व्युत्क्रम आव्यूह',
    questionEn: "State and prove Cayley-Hamilton Theorem. Verify the theorem for the matrix A = [[2, -1, 1], [-1, 2, -1], [1, -1, 2]] and hence compute A⁻¹ and A⁴.",
    questionHi: "कैले-हैमिल्टन प्रमेय का कथन लिखकर सिद्ध कीजिए। आव्यूह A = [[2, -1, 1], [-1, 2, -1], [1, -1, 2]] हेतु इस प्रमेय को सत्यापित कीजिए तथा इसकी सहायता से A⁻¹ एवं A⁴ ज्ञात कीजिए।",
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2021, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: "Statement: Every square matrix satisfies its own characteristic equation det(A - λI) = 0. Proof uses B(λ) = adj(A - λI) with identity (A - λI)B(λ) = det(A - λI)I. For matrix A: det(A - λI) = λ³ - 6λ² + 9λ - 4 = 0. Verify A³ - 6A² + 9A - 4I = 0. Multiplying by A⁻¹ gives A⁻¹ = (1/4)(A² - 6A + 9I).",
    solutionHi: "कथन: प्रत्येक वर्ग आव्यूह अपने अभिलाक्षणिक समीकरण det(A - λI) = 0 को संतुष्ट करता है। उपपत्ति B(λ) = adj(A - λI) के विस्तार से होती है। दिए गए A हेतु समीकरण λ³ - 6λ² + 9λ - 4 = 0 है। A³ - 6A² + 9A - 4I = 0 सत्यापित होता है। अतः A⁻¹ = (1/4)(A² - 6A + 9I)।",
    examinerRubric: [
      'Theorem statement & general proof (5 Marks)',
      'Characteristic equation calculation (3 Marks)',
      'Matrix multiplication verification = 0 (4 Marks)',
      'Computation of A⁻¹ and A⁴ (3 Marks)',
    ],
    learnTopicId: 'sdsuv-math-mth',
  },
  {
    id: 'pyq-m-02',
    stream: 'bsc-maths',
    subjectCode: 'SDSUV-MTH-201',
    subjectNameEn: 'Mathematics (Linear Algebra)',
    subjectNameHi: 'गणित (रैखिक बीजगणित)',
    chapterEn: 'Unit 1: Vector Spaces & Dimensions',
    chapterHi: 'इकाई 1: सदिश समष्टि एवं विमाएं',
    topicEn: 'Rank-Nullity Theorem',
    topicHi: 'रैंक-शून्यता प्रमेय',
    questionEn: 'State and prove the Rank-Nullity Theorem for a linear transformation T: V -> W between finite-dimensional vector spaces: dim(V) = rank(T) + nullity(T).',
    questionHi: 'परिमित विमीय सदिश समष्टियों के मध्य रैखिक रूपांतरण T: V -> W हेतु रैंक-शून्यता प्रमेय का कथन लिखकर सिद्ध कीजिए: dim(V) = rank(T) + nullity(T)।',
    marks: 10,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2019, 2020, 2022, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: "Let nullity(T) = k with basis {v1, ..., vk} of Ker(T). Extend this to a basis {v1, ..., vk, vk+1, ..., vn} of V. Then prove that {T(vk+1), ..., T(vn)} forms a linearly independent basis of Im(T), having dimension n - k.",
    solutionHi: "माना शून्यता k है तथा Ker(T) का आधार {v1, ..., vk} है। इसे V के आधार {v1, ..., vn} तक विस्तारित करते हैं। तब सिद्ध करते हैं कि {T(vk+1), ..., T(vn)} Im(T) का रैखिकतः स्वतंत्र आधार बनाता है जिसकी विमा n - k है।",
    examinerRubric: ['Theorem statement (2 Marks)', 'Basis extension technique (4 Marks)', 'Linear independence proof (4 Marks)'],
    learnTopicId: 'sdsuv-math-mth',
  },
  {
    id: 'pyq-m-03',
    stream: 'bsc-maths',
    subjectCode: 'SDSUV-MTH-201',
    subjectNameEn: 'Mathematics (Linear Algebra)',
    subjectNameHi: 'गणित (रैखिक बीजगणित)',
    chapterEn: 'Unit 1: Vector Spaces',
    chapterHi: 'इकाई 1: सदिश समष्टि',
    topicEn: 'Linear Independence Criterion',
    topicHi: 'रैखिक स्वतंत्रता की कसौटी',
    questionEn: 'Define linear dependence and independence of a set of vectors. Are the vectors (1, 2, 1), (2, 1, 4), and (4, 5, 6) in R³ linearly independent?',
    questionHi: 'सदिशों के समुच्चय की रैखिक परतंत्रता एवं स्वतंत्रता को परिभाषित कीजिए। क्या R³ में सदिश (1, 2, 1), (2, 1, 4) एवं (4, 5, 6) रैखिकतः स्वतंत्र हैं?',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 4,
    yearsAppeared: [2021, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: "Determinant of matrix with these rows = |[1, 2, 1], [2, 1, 4], [4, 5, 6]| = 1(6 - 20) - 2(12 - 16) + 1(10 - 4) = -14 + 8 + 6 = 0. Since determinant is zero, the vectors are linearly dependent.",
    solutionHi: "आव्यूह का सारणिक मान = 1(6 - 20) - 2(12 - 16) + 1(10 - 4) = -14 + 8 + 6 = 0। सारणिक शून्य होने के कारण ये सदिश रैखिकतः परतंत्र (Linearly Dependent) हैं।",
    examinerRubric: ['Definition (2 Marks)', 'Determinant computation (2 Marks)', 'Conclusion (1 Mark)'],
    learnTopicId: 'sdsuv-math-mth',
  },

  // ===================== BA ARTS: POLITICAL SCIENCE =====================
  {
    id: 'pyq-pol-01',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 2,
    subjectCode: 'SDSUV-POL-201',
    subjectNameEn: 'Political Science (Indian Govt & Politics)',
    subjectNameHi: 'राजनीति विज्ञान (भारतीय शासन एवं राजनीति)',
    chapterEn: 'Unit 2: Fundamental Rights & DPSPs',
    chapterHi: 'इकाई 2: मौलिक अधिकार एवं नीति निर्देशक तत्व',
    topicEn: 'Right to Equality (Articles 14 to 18)',
    topicHi: 'समानता का अधिकार (अनुच्छेद 14 से 18)',
    questionEn: "Critically examine the scope of Right to Equality under Article 14 of the Constitution. Distinguish between 'Equality before Law' and 'Equal Protection of the Laws'. Discuss the Doctrine of Reasonable Classification with landmark judgments.",
    questionHi: "संविधान के अनुच्छेद 14 के अंतर्गत समानता के अधिकार के क्षेत्र का आलोचनात्मक परीक्षण कीजिए। 'विधि के समक्ष समानता' और 'विधियों के समान संरक्षण' में भेद कीजिए। ऐतिहासिक वादों के संदर्भ में युक्तिसंगत वर्गीकरण के सिद्धांत की विवेचना कीजिए।",
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2021, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: "Article 14 ensures equality to all persons. British 'Equality before law' signifies absence of special privilege. American 'Equal protection of laws' permits affirmative action. Reasonable classification requires: (1) Intelligible differentia, (2) Rational nexus to legislative objective. E.P. Royappa (1974) and Maneka Gandhi (1978) established that non-arbitrariness is the essence of equality.",
    solutionHi: "अनुच्छेद 14 सभी व्यक्तियों को समानता प्रदान करता है। ब्रिटिश संकल्पना 'विधि के समक्ष समानता' विशेषाधिकारों का निषेध करती है जबकि अमेरिकी संकल्पना 'विधियों का समान संरक्षण' समान परिस्थितियों वालों के साथ समान व्यवहार सुनिश्चित करती है। युक्तिसंगत वर्गीकरण हेतु (1) बोधगम्य भेदक एवं (2) विधिक उद्देश्य से तार्किक संबंध अनिवार्य है। मेनका गांधी वाद में मनमानेपन का निषेध समानता की मूल आत्मा माना गया।",
    examinerRubric: [
      'Art 14 British vs American conceptual distinction (4 Marks)',
      'Doctrine of Reasonable Classification (Twin Test) (4 Marks)',
      'Royappa & Maneka Gandhi non-arbitrariness doctrine (4 Marks)',
      'Critical analysis & conclusion (3 Marks)',
    ],
    learnTopicId: 't-pol-101',
  },
  {
    id: 'pyq-pol-02',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 3,
    subjectCode: 'SDSUV-POL-201',
    subjectNameEn: 'Political Science (Indian Govt & Politics)',
    subjectNameHi: 'राजनीति विज्ञान (भारतीय शासन एवं राजनीति)',
    chapterEn: 'Unit 3: President & Emergency Powers',
    chapterHi: 'इकाई 3: राष्ट्रपति एवं आपातकालीन शक्तियां',
    topicEn: 'Emergency Provisions under Article 352, 356, 360',
    topicHi: 'अनुच्छेद 352, 356, 360 के अंतर्गत आपातकालीन उपबंध',
    questionEn: "Analyze the emergency powers of the President of India under Articles 352, 356, and 360. What constitutional safeguards were introduced by the 44th Constitutional Amendment Act 1978 to prevent misuse?",
    questionHi: "अनुच्छेद 352, 356 एवं 360 के अंतर्गत भारत के राष्ट्रपति की आपातकालीन शक्तियों का विश्लेषण कीजिए। 44वें संविधान संशोधन अधिनियम 1978 द्वारा दुरुपयोग रोकने हेतु क्या सुरक्षा उपाय जोड़े गए?",
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 5,
    yearsAppeared: [2019, 2020, 2022, 2023, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: "Art 352: National Emergency. Art 356: State President's Rule. Art 360: Financial Emergency. The 44th Amendment Act replaced 'internal disturbance' with 'armed rebellion', mandated Cabinet's written recommendation, required special majority for parliamentary approval, and protected Articles 20 and 21 from suspension.",
    solutionHi: "अनुच्छेद 352: राष्ट्रीय आपातकाल। अनुच्छेद 356: राज्यों में राष्ट्रपति शासन। अनुच्छेद 360: वित्तीय आपातकाल। 44वें संशोधन ने 'आंतरिक अशांति' को 'सशस्त्र विद्रोह' से बदला, केंद्रीय मंत्रिमंडल की लिखित अनुशंसा अनिवार्य की, तथा अनुच्छेद 20 एवं 21 को आपातकाल में भी निलंबित न होने की गारंटी दी।",
    examinerRubric: [
      'Comparative chart of Articles 352, 356, 360 (5 Marks)',
      '44th Amendment Act key safeguards (6 Marks)',
      'Federal balance impact & S.R. Bommai guidelines (4 Marks)',
    ],
    learnTopicId: 't-pol-101',
  },
  {
    id: 'pyq-pol-03',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 4,
    subjectCode: 'SDSUV-POL-201',
    subjectNameEn: 'Political Science (Indian Govt & Politics)',
    subjectNameHi: 'राजनीति विज्ञान (भारतीय शासन एवं राजनीति)',
    chapterEn: 'Unit 4: Judiciary & Basic Structure',
    chapterHi: 'इकाई 4: न्यायपालिका एवं मूल ढांचा',
    topicEn: 'Basic Structure Doctrine (Kesavananda Bharati)',
    topicHi: 'मूल ढांचे का सिद्धांत (केशवानंद भारती वाद)',
    questionEn: 'Explain the origin and significance of the "Basic Structure Doctrine" propounded by the Supreme Court in Kesavananda Bharati case (1973).',
    questionHi: 'केशवानंद भारती वाद (1973) में सर्वोच्च न्यायालय द्वारा प्रतिपादित "मूल ढांचे के सिद्धांत" के उद्भव एवं महत्व को समझाइए।',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2019, 2021, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: "A 13-judge bench ruled that Parliament's constituent power under Article 368 is not unlimited; it cannot alter the essential identity or basic structure of the Constitution (such as democracy, secularism, rule of law, judicial review).",
    solutionHi: "13 न्यायाधीशों की पीठ ने निर्णय दिया कि अनुच्छेद 368 के तहत संसद की संविधान संशोधन शक्ति असीमित नहीं है; यह संविधान के मूल ढांचे (जैसे लोकतंत्र, पंथनिरपेक्षता, विधि का शासन, न्यायिक समीक्षा) को विकृत या समाप्त नहीं कर सकती।",
    examinerRubric: ['Case background & 13-judge bench (2 Marks)', 'Core features included in basic structure (2 Marks)', 'Significance on parliamentary supremacy (1 Mark)'],
    learnTopicId: 't-pol-101',
  },
  {
    id: 'pyq-pol-04',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 2,
    subjectCode: 'SDSUV-POL-201',
    subjectNameEn: 'Political Science (Indian Govt & Politics)',
    subjectNameHi: 'राजनीति विज्ञान (भारतीय शासन एवं राजनीति)',
    chapterEn: 'Unit 2: Directive Principles',
    chapterHi: 'इकाई 2: नीति निर्देशक तत्व',
    topicEn: 'Uniform Civil Code (Article 44)',
    topicHi: 'समान नागरिक संहिता (अनुच्छेद 44)',
    questionEn: 'Write a short note on the Uniform Civil Code under Article 44 with special reference to Uttarakhand UCC Act 2024.',
    questionHi: 'उत्तराखंड यूसीसी अधिनियम 2024 के विशेष संदर्भ में अनुच्छेद 44 के तहत समान नागरिक संहिता पर संक्षिप्त टिप्पणी लिखिए।',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 3,
    yearsAppeared: [2022, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: "Article 44 in Part IV directs the State to secure a Uniform Civil Code throughout India. In 2024, Uttarakhand became the first Indian state post-independence to enact UCC covering uniform rules for marriage, divorce, succession, and live-in relationships while exempting scheduled tribes.",
    solutionHi: "भाग IV में अनुच्छेद 44 राज्य को पूरे भारत में समान नागरिक संहिता लागू करने का निर्देश देता है। 2024 में उत्तराखंड स्वतंत्रता के बाद विवाह, तलाक, उत्तराधिकार एवं लिव-इन संबंधों हेतु यूसीसी कानून पारित करने वाला प्रथम राज्य बना (जनजातीय क्षेत्रों को छूट सहित)।",
    examinerRubric: ['Constitutional provision Art 44 (1 Mark)', 'Uttarakhand UCC Act context (1 Mark)'],
    learnTopicId: 't-pol-101',
  },

  // ===================== BA ARTS: HISTORY (ANCIENT & UTTARAKHAND) =====================
  {
    id: 'pyq-his-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIS-101',
    subjectNameEn: 'History (Ancient India & Indus Valley)',
    subjectNameHi: 'इतिहास (प्राचीन भारत एवं सिंधु सभ्यता)',
    chapterEn: 'Unit 1: Indus Valley Civilization',
    chapterHi: 'इकाई 1: सिंधु घाटी सभ्यता',
    topicEn: 'Harappan Town Planning & Maritime Trade',
    topicHi: 'हड़प्पा नगर नियोजन एवं समुद्री व्यापार',
    questionEn: 'Discuss the town planning, municipal drainage system, and external trade relations of the Harappan Civilization. What were the prominent causes of its decline?',
    questionHi: 'हड़प्पा सभ्यता के नगर नियोजन, नगर निगम जल निकासी प्रणाली एवं बाह्य व्यापार संबंधों की विवेचना कीजिए। इसके पतन के प्रमुख कारण क्या थे?',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2021, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'Harappan urbanization featured standardized burnt bricks (1:2:4 ratio), orthogonal street grids, underground covered drains with inspection traps, and separation into Western Citadel and Eastern Lower Town. Dockyard at Lothal facilitated trade with Mesopotamia. The decline resulted primarily from climatic drying, tectonic diversion of river courses, and economic exhaustion rather than foreign invasion.',
    solutionHi: 'हड़प्पा सभ्यता ग्रिड नगर नियोजन, 1:2:4 अनुपात की पक्की ईंटों, ढकी भूमिगत नालियों तथा पश्चिमी दुर्ग व पूर्वी निचले नगर में विभाजन हेतु प्रसिद्ध थी। लोथल गोदीबाड़ा मेसोपोटामियाई व्यापार का केंद्र था। पतन मुख्य रूप से घग्घर-हाकरा नदी के सूखने एवं जलवायु परिवर्तन से हुआ।',
    examinerRubric: [
      'Orthogonal gridiron layout and citadel/lower town division (4 Marks)',
      'Covered drainage and public hygiene mechanisms (4 Marks)',
      'Lothal dockyard and maritime commerce (3 Marks)',
      'Scientific environmental theories of decline (4 Marks)',
    ],
    learnTopicId: 't-his-101',
  },
  {
    id: 'pyq-his-02',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 2,
    subjectCode: 'SDSUV-HIS-101',
    subjectNameEn: 'History (Ancient India & Mauryan Empire)',
    subjectNameHi: 'इतिहास (प्राचीन भारत एवं मौर्य साम्राज्य)',
    chapterEn: 'Unit 2: Mauryan Administration & Edicts',
    chapterHi: 'इकाई 2: मौर्य प्रशासन एवं अभिलेख',
    topicEn: 'Ashoka’s Dhamma & Kalsi Inscription',
    topicHi: 'अशोक का धम्म एवं कालसी शिलालेख',
    questionEn: 'Examine Ashoka’s concept of Dhamma. Explain the historical and archaeological significance of the Ashokan Rock Edict at Kalsi (Dehradun district, Uttarakhand).',
    questionHi: 'अशोक के धम्म की संकल्पना का परीक्षण कीजिए। कालसी (देहरादून, उत्तराखंड) स्थित अशोक के शिलालेख के ऐतिहासिक एवं पुरातात्विक महत्व को समझाइए।',
    marks: 10,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: 'Ashoka’s Dhamma was a practical code of socio-moral ethics advocating Ahimsa, religious harmony, and compassionate governance. The Kalsi edict (dated ~257 BC) etched on a quartz boulder near the Yamuna river in Brahmi script is the only Major Rock Edict of Ashoka in Northern India, confirming Mauryan sovereignty over the Garhwal Himalayan tract.',
    solutionHi: 'अशोक का धम्म अहिंसा, सहिष्णुता एवं जनकल्याण की नैतिक संहिता थी। कालसी (देहरादून) में यमुना तट पर ब्राह्मी लिपि में उत्कीर्ण शिलालेख उत्तर भारत में अशोक का एकमात्र वृहद शिलालेख है, जो गढ़वाल हिमालय पर मौर्य साम्राज्य की प्रशासनिक संप्रभुता को प्रमाणित करता है।',
    examinerRubric: [
      'Principles of Dhamma and distinction from Buddhist religion (4 Marks)',
      'Archaeological details of Kalsi Rock Edict (Brahmi script/Prakrit) (4 Marks)',
      'Historical connection to Uttarakhand history (2 Marks)',
    ],
    learnTopicId: 't-his-102',
  },
  {
    id: 'pyq-his-03',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 3,
    subjectCode: 'SDSUV-HIS-201',
    subjectNameEn: 'History (Medieval Uttarakhand Dynasties)',
    subjectNameHi: 'इतिहास (मध्यकालीन उत्तराखंड के राजवंश)',
    chapterEn: 'Unit 3: Katyuri Dynasty of Uttarakhand',
    chapterHi: 'इकाई 3: उत्तराखंड का कत्यूरी राजवंश',
    topicEn: 'Katyuri Administration & Temple Architecture',
    topicHi: 'कत्यूरी प्रशासन एवं मंदिर स्थापत्य',
    questionEn: 'Evaluate the political achievements, administrative organization, and stone temple architecture (Jageshwar and Baijnath) of the Katyuri Dynasty of Uttarakhand.',
    questionHi: 'उत्तराखंड के कत्यूरी राजवंश की राजनीतिक उपलब्धियों, प्रशासनिक संगठन एवं पाषाण मंदिर स्थापत्य (जागेश्वर एवं बैजनाथ) का मूल्यांकन कीजिए।',
    marks: 10,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2019, 2021, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'The Katyuri dynasty was the first historical state power to unify the central Himalayas. From Kartikeyapura (Joshimath) and later Baijnath (Katyur valley), they established a centralized agrarian administration documented in copper plates (Pandukeshwar, Bageshwar). They patronized indigenous curvilinear Nagara stone temple architecture with monumental amalaka and mandapa at Baijnath, Jageshwar, and Dwarahat.',
    solutionHi: 'कत्यूरी वंश मध्य हिमालय का एकीकरण करने वाला प्रथम ऐतिहासिक राजवंश था। कार्तिकेयपुर (जोशीमठ) एवं बैजनाथ से इन्होंने पांडुकेश्वर ताम्रपत्रों में वर्णित व्यवस्थित शासन संचालित किया तथा जागेश्वर, बैजनाथ व द्वाराहाट में नागर शैली के शिखर पाषाण मंदिरों की समृद्ध परंपरा स्थापित की।',
    examinerRubric: [
      'Dynastic origin and capital transition (Kartikeyapura to Baijnath) (3 Marks)',
      'Administrative terminology from Tamrapatra grants (3 Marks)',
      'Architectural features of Jageshwar and Baijnath temple groups (4 Marks)',
    ],
    learnTopicId: 't-his-103',
  },
  {
    id: 'pyq-his-04',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 4,
    subjectCode: 'SDSUV-HIS-201',
    subjectNameEn: 'History (Garhwal & Kumaon Dynasties)',
    subjectNameHi: 'इतिहास (गढ़वाल एवं कुमाऊं के राजवंश)',
    chapterEn: 'Unit 4: Parmar Dynasty of Garhwal',
    chapterHi: 'इकाई 4: गढ़वाल का परमार राजवंश',
    topicEn: 'Ajaypal & Unification of 52 Garhs',
    topicHi: 'राजा अजयपाल एवं 52 गढ़ों का एकीकरण',
    questionEn: 'Trace the rise of the Parmar (Panwar) Dynasty from Kanakpal at Chandpur Garhi. How did King Ajaypal unify the 52 fragmented Garhs into a sovereign Garhwal state? Discuss his administrative reforms including Dhuli-Patha.',
    questionHi: 'चांदपुर गढ़ी में कनकपाल से परमार वंश के अभ्युदय का विवरण दीजिए। राजा अजयपाल ने 52 बिखरे गढ़ों को जीतकर एक संप्रभु गढ़वाल राज्य की स्थापना कैसे की? धूली-पाथा सहित उनके प्रशासनिक सुधारों की विवेचना कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2020, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'Founded by Kanakpal at Chandpur Garhi in 888 AD, the Parmar dynasty reached its zenith under the 37th ruler King Ajaypal (~1500-1519 AD). Termed the Ashoka of Garhwal, Ajaypal subjugated 52 warring local chieftains (including Badhangarh, Dasoli, Nagpur), unified Garhwal, shifted the capital to Devalgarh and Srinagar, instituted the official "Dhuli-Patha" volumetric grain measure, and organized regional security.',
    solutionHi: 'कनकपाल द्वारा 888 ईस्वी में चांदपुर गढ़ी में स्थापित परमार वंश के 37वें राजा अजयपाल ने 1515 ईस्वी तक बधाणगढ़, दशोली, नागपुर जैसे 52 स्वतंत्र गढ़पतियों को पराजित कर संपूर्ण गढ़वाल का राजनीतिक एकीकरण किया। उन्होंने राजधानी श्रीनगर स्थानांतरित की, अनाज माप का प्रामाणिक पैमाना "धूली-पाथा" लागू किया तथा ग्राम प्रधानों का प्रशासनिक तंत्र बनाया।',
    examinerRubric: [
      'Origin from Kanakpal at Chandpur Garhi (3 Marks)',
      'Chronicle of Ajaypal’s military unification of 52 Garhs (5 Marks)',
      'Capital relocation to Devalgarh and Srinagar Garhwal (3 Marks)',
      'Economic standard Dhuli-Patha and administrative governance (4 Marks)',
    ],
    learnTopicId: 't-his-104',
  },

  // ===================== BA ARTS: GEOGRAPHY (PHYSICAL & HIMALAYAN) =====================
  {
    id: 'pyq-geo-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-GEO-101',
    subjectNameEn: 'Geography (Physical & Himalayan Terrain)',
    subjectNameHi: 'भूगोल (भौतिक भूगोल एवं हिमालयी भूरूपिकी)',
    chapterEn: 'Unit 1: Geomorphology & Plate Tectonics',
    chapterHi: 'इकाई 1: भू-आकृति विज्ञान एवं प्लेट विवर्तनिकी',
    topicEn: 'Himalayan Orogeny & Continental Collision',
    topicHi: 'हिमालयी पर्वत निर्माण एवं महाद्वीपीय टक्कर',
    questionEn: 'Explain the theory of Plate Tectonics. Describe the geological origin of the Himalayas due to the collision of the Indian and Eurasian plates and the closure of the Tethys Ocean.',
    questionHi: 'प्लेट विवर्तनिकी सिद्धांत की व्याख्या कीजिए। भारतीय एवं यूरेशियाई प्लेटों के टकराव तथा टेथिस सागर के संकुचन से हिमालय की भू-वैज्ञानिक उत्पत्ति का वर्णन कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2021, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'Plate tectonics explains lithospheric movement driven by mantle convection currents. During the Cretaceous-Tertiary periods, the northward-drifting Indian plate collided with the Eurasian plate at ~5cm/year. The intervening Tethys geosyncline sediments folded in three major orogenic pulses: Greater Himalayas (Oligocene), Lesser Himalayas (Miocene), and Shiwaliks (Pleistocene). Active crustal thrusts like MCT and MBT cause continued seismicity in Uttarakhand.',
    solutionHi: 'प्लेट विवर्तनिकी के अनुसार संवहन धाराओं के प्रभाव से लिथोस्फेरिक प्लेटें गतिशील रहती हैं। क्रिटेशियस काल में भारतीय प्लेट के उत्तर की ओर खिसकने से यूरेशियाई प्लेट से अभिसरण हुआ। दोनों के मध्य स्थित टेथिस भूसन्नति के अवसादों में संपीडन से तीन चरणों (वृहद, लघु व शिवालिक) में वलन पड़ा। मुख्य केंद्रीय भ्रंश (MCT) एवं मुख्य सीमा भ्रंश (MBT) के कारण उत्तराखंड भूगर्भीय रूप से संवेदनशील है।',
    examinerRubric: [
      'Plate tectonic boundaries and mantle convection (4 Marks)',
      'Collision mechanics between Indian and Eurasian plates (4 Marks)',
      'Three geological uplift epochs of Himalayan ranges (4 Marks)',
      'Major structural thrusts: MCT, MBT, HFT (3 Marks)',
    ],
    learnTopicId: 't-geo-101',
  },
  {
    id: 'pyq-geo-02',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 4,
    subjectCode: 'SDSUV-GEO-201',
    subjectNameEn: 'Geography (Physical & Himalayan Terrain)',
    subjectNameHi: 'भूगोल (भौतिक भूगोल एवं हिमालयी भूरूपिकी)',
    chapterEn: 'Unit 4: Uttarakhand Drainage Systems',
    chapterHi: 'इकाई 4: उत्तराखंड अपवाह तंत्र',
    topicEn: 'Bhagirathi-Alaknanda River System & Panch Prayag',
    topicHi: 'भागीरथी-अलकनंदा नदी तंत्र एवं पंचप्रयाग',
    questionEn: 'Analyze the drainage characteristics of the Bhagirathi and Alaknanda river basins in Uttarakhand. Detail the Panch Prayag confluence hierarchy leading to the formation of the Holy Ganga at Devprayag.',
    questionHi: 'उत्तराखंड में भागीरथी एवं अलकनंदा नदी बेसिन की अपवाह विशेषताओं का विश्लेषण कीजिए। देवप्रयाग में गंगा निर्माण से पूर्व पंचप्रयाग संगमों का विस्तृत विवरण दीजिए।',
    marks: 10,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: 'The Alaknanda (originating at Satopanth and Bhagirath Kharak glaciers) and Bhagirathi (originating at Gangotri Gaumukh glacier) form antecedent dendritic drainage networks through deep Himalayan V-shaped gorges. Panch Prayag sequence along Alaknanda: 1) Vishnuprayag (with Dhauliganga), 2) Nandaprayag (with Nandakini), 3) Karnaprayag (with Pindar), 4) Rudraprayag (with Mandakini), and 5) Devprayag (Alaknanda meets Bhagirathi to form the Ganga).',
    solutionHi: 'सतोपंथ हिमनद से निकलने वाली अलकनंदा एवं गौमुख से निकलने वाली भागीरथी गहरे हिमालयी गॉर्ज से होकर पूर्ववर्ती अपवाह बनाती हैं। अलकनंदा पर पंचप्रयाग क्रम: 1) विष्णुप्रयाग (धौलीगंगा), 2) नंदप्रयाग (नंदाकिनी), 3) कर्णप्रयाग (पिंडर), 4) रुद्रप्रयाग (मंदाकिनी), 5) देवप्रयाग (भागीरथी व अलकनंदा का संगम जहां से गंगा नाम मिलता है)।',
    examinerRubric: [
      'Glacial sources of Bhagirathi and Alaknanda (2 Marks)',
      'Complete sequence and tributary mapping of Panch Prayag (5 Marks)',
      'Fluvial morphology of steep mountain river channels (3 Marks)',
    ],
    learnTopicId: 't-geo-101',
  },
  {
    id: 'pyq-geo-03',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 2,
    subjectCode: 'SDSUV-GEO-101',
    subjectNameEn: 'Geography (Physical & Himalayan Terrain)',
    subjectNameHi: 'भूगोल (भौतिक भूगोल एवं हिमालयी भूरूपिकी)',
    chapterEn: 'Unit 2: Fluvial Landforms & Cycle of Erosion',
    chapterHi: 'इकाई 2: नदीय स्थलरूप एवं अपरदन चक्र',
    topicEn: 'Davis vs Penck Geographical Cycle of Erosion',
    topicHi: 'डेविस बनाम पेंक का अपरदन चक्र सिद्धांत',
    questionEn: 'Critically examine W.M. Davis’s Geographical Cycle of Erosion (Youth, Maturity, Old Age). How does Walther Penck’s concept of morphological analysis differ from it?',
    questionHi: 'डब्ल्यू.एम. डेविस के भौगोलिक अपरदन चक्र (युवावस्था, प्रौढ़ावस्था, जीर्णावस्था) का आलोचनात्मक परीक्षण कीजिए। वाल्टर पेंक का भू-आकृतिक विश्लेषण सिद्धांत इससे किस प्रकार भिन्न है?',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 5,
    yearsAppeared: [2019, 2021, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: "Davis's model is time-dependent where landscape is a function of Structure, Process, and Stage, postulating rapid uplift followed by prolonged erosion yielding a Peneplain. Walther Penck proposed a time-independent model where landforms result from the competition between rate of uplift and rate of degradation (Aufsteigende, Gleichförmige, and Absteigende Entwicklung), culminating in an Endrumpf.",
    solutionHi: "डेविस का चक्र समय-निर्भर मॉडल है जिसमें स्थलरूप संरचना, प्रक्रम एवं अवस्था का प्रतिफल होता है (तीव्र उत्थान के बाद अपरदन और अंत में पेनीप्लेन)। इसके विपरीत वाल्टर पेंक ने समय-स्वतंत्र सिद्धांत दिया जहां स्थलरूप उत्थान की दर एवं अपरदन की दर के अंतर्संबंध का परिणाम हैं, जिसका अंतिम रूप एंडरम्फ (Endrumpf) कहलाता है।",
    examinerRubric: [
      'Davisian Trio (Structure, Process, Stage) explanation (4 Marks)',
      'Diagram of Davisian cycle curve (3 Marks)',
      'Walther Penck’s Primärrumpf and morphological system (5 Marks)',
      'Comparison table highlighting 4 core differences (3 Marks)',
    ],
    learnTopicId: 't-geo-101',
  },

  // ===================== BA ARTS: HINDI LITERATURE (हिन्दी साहित्य) =====================
  {
    id: 'pyq-hin-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIN-101',
    subjectNameEn: 'Hindi Literature (Pracheen, Katha & Chhayavad)',
    subjectNameHi: 'हिन्दी साहित्य (प्राचीन काव्य, कथा साहित्य एवं छायावाद)',
    chapterEn: 'Unit 1: Pracheen evam Bhaktikaleen Kavya',
    chapterHi: 'इकाई 1: प्राचीन एवं भक्तिकालीन काव्य',
    topicEn: 'Kabir’s Social Reform, Mysticism & Saakhis',
    topicHi: 'कबीर की सामाजिक चेतना, रहस्यवाद एवं साखी विवेचन',
    questionEn: 'Evaluate Kabir as a revolutionary social reformer and mystic poet with textual references to his Saakhis. Discuss his symbolic Sadhukkadi language.',
    questionHi: 'कबीर की साखियों के आधार पर उनकी क्रांतिकारी समाज सुधारक चेतना एवं रहस्यवादी भावधारा का सोदाहरण मूल्यांकन कीजिए। उनकी प्रतीकात्मक सधुक्कड़ी भाषा की विवेचना कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2020, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'Kabir stands as the paramount voice of Nirguna Sant poetry. He unsparingly decried religious dogmatism, Brahmanical orthodoxy, Islamic ritualism (Mulla/Kazi), and untouchability ("जाति पांति पूछे नहिं कोई, हरि को भजै सो हरि का होई"). In his Sadhak mysticism, the soul (Atma) yearns for the omnipresent Beloved (Paramatma) through intense interiorized devotion. His language is Panchmel Khichdi (Sadhukkadi), rich in rustic vigor and esoteric Ulatbaansi metaphors.',
    solutionHi: 'कबीर निर्गुण संत काव्य के मूर्धन्य प्रतिनिधि हैं। उन्होंने बाह्याडंबरों, पाखंड, तीर्थ-व्रत तथा जातिगत भेदभाव का मुखर विरोध किया। कबीर का रहस्यवाद साधनात्मक एवं भावात्मक दोनों है, जहां जीवात्मा विरहिणी बनकर घट-घट वासी परमात्मा से एकाकार होना चाहती है। उनकी पंचमेल खिचड़ी (सधुक्कड़ी) भाषा में उलटबांसियों का मार्मिक प्रयोग है।',
    examinerRubric: [
      'Critique of religious rituals and caste prejudice with couplets (5 Marks)',
      'Nirguna mysticism and concept of Sahaj Samadhi (4 Marks)',
      'Sadhukkadi linguistic craft and folk idioms (4 Marks)',
      'Relevance of Kabir’s universal humanism in modern society (2 Marks)',
    ],
    learnTopicId: 't-hin-101',
  },
  {
    id: 'pyq-hin-02',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 2,
    subjectCode: 'SDSUV-HIN-201',
    subjectNameEn: 'Hindi Literature (Pracheen, Katha & Chhayavad)',
    subjectNameHi: 'हिन्दी साहित्य (प्राचीन काव्य, कथा साहित्य एवं छायावाद)',
    chapterEn: 'Unit 2: Katha Sahitya (Hindi Novel & Story)',
    chapterHi: 'इकाई 2: हिन्दी कथा साहित्य (उपन्यास एवं कहानी)',
    topicEn: 'Himanshu Joshi’s Novel "Kagar Ki Aag"',
    topicHi: 'हिमांशु जोशी कृत उपन्यास "कगार की आग"',
    questionEn: 'Analyze the depiction of Himalayan mountain life, poverty, women’s struggle, and existential hardship in Himanshu Joshi’s acclaimed novel "Kagar Ki Aag".',
    questionHi: 'हिमांशु जोशी के सुप्रसिद्ध उपन्यास "कगार की आग" में चित्रित उत्तराखंड के पर्वतीय जनजीवन, निर्धनता, नारी-वेदना एवं मानवीय जिजीविषा का समीक्षात्मक विवेचन कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 5,
    yearsAppeared: [2021, 2022, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: 'Set in the rugged topography of Kumaon-Garhwal hills, "Kagar Ki Aag" by Himanshu Joshi is an epic chronicle of mountain hardship. It portrays the relentless struggle of hill women who carry fuel, water, and fodder across sheer cliffs, the agony of indebtedness to moneylenders, and youth migration leaving desolate ghost villages. Despite grim socioeconomic adversity, Joshi celebrates the enduring moral dignity and warmth of mountain folk.',
    solutionHi: 'हिमांशु जोशी कृत "कगार की आग" कुमाऊं-गढ़वाल के सुदूर अंचलों में अभावों से जूझते पर्वतीय समाज का यथार्थवादी आख्यान है। इसमें सीढ़ीदार खेतों में नारियों का अनवरत परिश्रम, साहूकारों का शोषण, पलायन की त्रासदी तथा ढहती ग्रामीण अर्थव्यवस्था को अत्यंत संवेदना के साथ उकेरा गया है। अभावों के बीच भी पर्वतीय जीवन की नैतिकता और जिजीविषा इस उपन्यास का मुख्य स्वर है।',
    examinerRubric: [
      'Geographical setting and realism of Uttarakhand hill lifestyle (4 Marks)',
      'Portrayal of mountain women as the economic pillar of hill society (4 Marks)',
      'Themes of debt, migration, and rural isolation (4 Marks)',
      'Literary evaluation of Himanshu Joshi’s narrative style (3 Marks)',
    ],
    learnTopicId: 't-hin-103',
  },
  {
    id: 'pyq-hin-03',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 3,
    subjectCode: 'SDSUV-HIN-201',
    subjectNameEn: 'Hindi Literature (Pracheen, Katha & Chhayavad)',
    subjectNameHi: 'हिन्दी साहित्य (प्राचीन काव्य, कथा साहित्य एवं छायावाद)',
    chapterEn: 'Unit 5: Chhayavadi Kavya',
    chapterHi: 'इकाई 5: छायावादी काव्य',
    topicEn: 'Chhayavadi Features & Sumitranandan Pant / Kamayani',
    topicHi: 'छायावाद की प्रमुख प्रवृत्तियां एवं सुमित्रानंदन पंत / कामायनी',
    questionEn: 'Examine the key aesthetic and thematic tendencies of Chhayavad with special reference to Jaishankar Prasad’s "Kamayani" and Uttarakhand’s nature poet Sumitranandan Pant.',
    questionHi: 'छायावाद की प्रमुख प्रवृत्तियों का जयशंकर प्रसाद की "कामायनी" तथा उत्तराखंड के प्रकृति के सुकुमार कवि सुमित्रानंदन पंत के विशेष संदर्भ में विस्तृत विवेचन कीजिए।',
    marks: 10,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'Chhayavad (1918-1936) marked an epoch of aesthetic subjectivity, romantic lyricism, spiritual symbolism, and intense nature adoration in Hindi literature. Dr. Nagendra defined it as "स्थूल के प्रति सूक्ष्म का विद्रोह" (Rebellion of the subtle against the gross). Prasad’s Kamayani allegorizes the harmonious synthesis of Mind (Manu), Faith/Heart (Shraddha), and Intellect (Ida). Sumitranandan Pant (born in Kausani, Almora) brought the sublime beauty of the Himalayas into Hindi poetry through masterpieces like Pallav and Gunjan.',
    solutionHi: 'छायावाद (1918-1936) हिन्दी कविता का स्वर्ण युग है जिसमें आत्माभिव्यक्ति, सौंदर्य एवं प्रकृति का मानवीकरण, वैयक्तिकता तथा लाक्षणिक भाषा शैली का चरमोत्कर्ष मिलता है। डॉ. नगेंद्र ने इसे "स्थूल के प्रति सूक्ष्म का विद्रोह" कहा है। कामायनी में प्रसाद जी ने मन (मनु), श्रद्धा (हृदय) एवं इड़ा (बुद्धि) के समन्वय द्वारा आनंदवाद की प्रतिष्ठा की। कौसानी (अल्मोड़ा) में जन्मे सुमित्रानंदन पंत ने हिमालय की नैसर्गिक सुषमा को अपनी कविताओं में अमर किया।',
    examinerRubric: [
      'Four pillars of Chhayavad (Prasad, Pant, Nirala, Mahadevi) (2 Marks)',
      'Core characteristics: Nature anthropomorphism, symbolism, lyricism (4 Marks)',
      'Synthesis in Kamayani and Pant’s Himalayan nature aesthetics (4 Marks)',
    ],
    learnTopicId: 't-hin-102',
  },

  // ===================== BA ARTS: SOCIOLOGY (समाजशास्त्र) =====================
  {
    id: 'pyq-soc-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-SOC-101',
    subjectNameEn: 'Sociology (Introductory Sociology & Social Change)',
    subjectNameHi: 'समाजशास्त्र (प्रारंभिक समाजशास्त्र एवं सामाजिक परिवर्तन)',
    chapterEn: 'Unit 1: Nature & Scope of Sociology',
    chapterHi: 'इकाई 1: समाजशास्त्र की प्रकृति एवं विषय-क्षेत्र',
    topicEn: 'Definition, Scientific Nature & Interdisciplinary Relations',
    topicHi: 'समाजशास्त्र की परिभाषा, वैज्ञानिक प्रकृति एवं अन्य सामाजिक विज्ञानों से संबंध',
    questionEn: 'Define Sociology. Discuss its scientific nature and examine its relationship with Political Science and History.',
    questionHi: 'समाजशास्त्र की परिभाषा दीजिए। इसकी वैज्ञानिक प्रकृति की विवेचना कीजिए तथा राजनीति विज्ञान एवं इतिहास के साथ इसके अंतर्संबंधों का परीक्षण कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2021, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'Sociology, coined by Auguste Comte in 1838, is the scientific study of human society, social relationships, and social institutions. It employs empirical observation, comparative methodology, and hypothesis testing, making it an objective social science. Sociology and Political Science overlap in political sociology (power, state, voting behavior), while History provides contextual chronological data that Sociology uses to deduce generalized sociological laws.',
    solutionHi: 'अगस्त कॉम्ट द्वारा 1838 में प्रतिपादित समाजशास्त्र मानव समाज, सामाजिक अंतःक्रियाओं एवं संस्थाओं का व्यवस्थित व वैज्ञानिक अध्ययन है। यह अनुभवजन्य अवलोकन तथा तुलनात्मक पद्धति पर आधारित है। राजनीति विज्ञान से इसका संबंध राजनीतिक समाजशास्त्र (सत्ता, राज्य, नेतृत्व) के रूप में प्रगाढ़ है, जबकि इतिहास समाजशास्त्र को कालानुक्रमिक सामग्री उपलब्ध कराता है जिससे समाजशास्त्रीय सामान्यीकरण किए जाते हैं।',
    examinerRubric: [
      'Origin from Auguste Comte and formal definitions (Ward, Giddings, MacIver) (4 Marks)',
      'Arguments for scientific character and its limitations (4 Marks)',
      'Interrelationship with Political Science and History (4 Marks)',
      'Synthetic vs Formalistic schools of sociology (3 Marks)',
    ],
    learnTopicId: 't-soc-101',
  },
  {
    id: 'pyq-soc-02',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 2,
    subjectCode: 'SDSUV-SOC-201',
    subjectNameEn: 'Sociology (Introductory Sociology & Social Change)',
    subjectNameHi: 'समाजशास्त्र (प्रारंभिक समाजशास्त्र एवं सामाजिक परिवर्तन)',
    chapterEn: 'Unit 2: Theories of Social Change',
    chapterHi: 'इकाई 2: सामाजिक परिवर्तन के सिद्धांत',
    topicEn: 'Linear vs Cyclical Theories of Social Change (Sorokin & Ogburn)',
    topicHi: 'सामाजिक परिवर्तन के रेखीय बनाम चक्रीय सिद्धांत (सोरोकिन एवं ऑगबर्न)',
    questionEn: 'Critically analyze Pitirim Sorokin’s Cyclical Theory of Cultural Dynamics. Compare it with W.F. Ogburn’s Theory of Cultural Lag.',
    questionHi: 'पितिरिम सोरोकिन के सांस्कृतिक गतिशीलता के चक्रीय सिद्धांत का आलोचनात्मक विश्लेषण कीजिए। डब्ल्यू.एफ. ऑगबर्न के सांस्कृतिक विडंबना (Cultural Lag) सिद्धांत से इसकी तुलना कीजिए।',
    marks: 10,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: "Pitirim Sorokin’s theory posits that societies swing between two polar cultural mentalities: Sensate (materialistic, sensory) and Ideational (spiritual, transcendental), passing through an intermediate Idealistic synthesis. Society’s internal limits trigger reversal. Conversely, W.F. Ogburn’s Cultural Lag argues that material culture (technology, machines) changes faster than non-material culture (customs, beliefs, laws), creating social disorganization and maladjustment until balance is restored.",
    solutionHi: "सोरोकिन के अनुसार समाज दो चरम सांस्कृतिक प्रणालियों के मध्य पेंडुलम की तरह दोलन करता है: चेतनात्मक (भौतिकवादी/इंद्रियजन्य) एवं विचारात्मक (आध्यात्मिक), जिसके मध्य संतुलन को आदर्शात्मक संस्कृति कहते हैं। दूसरी ओर, विलियम ऑगबर्न के अनुसार भौतिक संस्कृति (प्रौद्योगिकी) अभौतिक संस्कृति (मान्यताएं, कानून, संस्थाएं) की तुलना में तीव्र गति से बदलती है, जिससे उत्पन्न अंतराल को 'सांस्कृतिक विडंबना' कहा जाता है।",
    examinerRubric: [
      'Sorokin’s three cultural types and principle of limits (4 Marks)',
      'Ogburn’s material vs non-material culture contrast (3 Marks)',
      'Modern applications (Technology gap, AI impact) (3 Marks)',
    ],
    learnTopicId: 't-soc-102',
  },
  {
    id: 'pyq-soc-03',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 3,
    subjectCode: 'SDSUV-SOC-201',
    subjectNameEn: 'Sociology (Introductory Sociology & Social Change)',
    subjectNameHi: 'समाजशास्त्र (प्रारंभिक समाजशास्त्र एवं सामाजिक परिवर्तन)',
    chapterEn: 'Unit 3: Culture & Society of Uttarakhand',
    chapterHi: 'इकाई 3: उत्तराखंड की संस्कृति एवं समाज',
    topicEn: 'Tribal Social Structure & Himalayan Out-Migration (Palayan)',
    topicHi: 'जनजातीय सामाजिक संरचना एवं हिमालयी पर्वतीय पलायन',
    questionEn: 'Discuss the unique social institutions of Uttarakhand’s indigenous tribes (Bhotia, Jaunsari, Tharu, Buksa, Raji). Evaluate the sociological consequences of rural mountain out-migration (Palayan) in Garhwal and Kumaon.',
    questionHi: 'उत्तराखंड की प्रमुख जनजातियों (भोटिया, जौनसारी, थारू, बुक्सा, राजी) की विशिष्ट सामाजिक संस्थाओं की विवेचना कीजिए। गढ़वाल एवं कुमाऊं में ग्रामीण पर्वतीय पलायन के समाजशास्त्रीय प्रभावों का मूल्यांकन कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2021, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'Uttarakhand has 5 notified Scheduled Tribes: 1) Bhotias (transhumant pastoralists with historical Indo-Tibetan trade ties), 2) Jaunsaris (Chakrata, characterized by traditional fraternal polyandry and customary law Dastur-ul-Amal), 3) Tharus & Buksas (Terai agrarian communities with matriarchal family respect), and 4) Rajis (Banrawat cave/forest dwellers in Pithoragarh). Mountain out-migration has created hundreds of uninhabited ghost villages (Bhootaha Gaon), leading to the feminization of hill agriculture, social isolation of elderly populations, and dilution of indigenous cultural practices like Jagar, Aipan, and Pandav Nritya.',
    solutionHi: 'उत्तराखंड की 5 प्रमुख जनजातियां: भोटिया (ऋतुप्रवास व भारत-तिब्बत व्यापार), जौनसारी (भ्रातृक बहुपति विवाह व दस्तूर-उल-अमल), थारू व बुक्सा (तराई के कृषक, महिलाओं का उच्च स्थान), तथा राजी (वनराजी, पिथौरागढ़)। पर्वतीय पलायन से सैकड़ों गांव निर्जन (भूतहा गांव) हो गए हैं, जिससे कृषि का नारीकरण हुआ है, वृद्धजन एकाकी रह गए हैं तथा जांगर, ऐपण, पांडव नृत्य जैसी पारंपरिक लोक कलाएं संकटग्रस्त हो रही हैं।',
    examinerRubric: [
      'Ethno-sociological overview of 5 Scheduled Tribes (5 Marks)',
      'Unique institutions: Jaunsari polyandry & Bhotia seasonal transhumance (4 Marks)',
      'Sociological fallout of out-migration: Demography, Ghost villages, Elder care (4 Marks)',
      'Policy recommendations for sustainable reverse migration (2 Marks)',
    ],
    learnTopicId: 't-soc-101',
  },

  // ===================== BA ARTS: ECONOMICS (MICRO & UTTARAKHAND) =====================
  {
    id: 'pyq-eco-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-ECO-101',
    subjectNameEn: 'Economics (Micro & Uttarakhand Economy)',
    subjectNameHi: 'अर्थशास्त्र (व्यष्टि एवं उत्तराखंड अर्थव्यवस्था)',
    chapterEn: 'Unit 1: Consumer Equilibrium & Utility',
    chapterHi: 'इकाई 1: उपभोक्ता संतुलन एवं उपयोगिता',
    topicEn: 'Indifference Curve Analysis',
    topicHi: 'उदासीनता वक्र विश्लेषण',
    questionEn: 'Define an Indifference Curve. Explain its core properties. Using indifference curves and budget line, demonstrate the conditions for consumer equilibrium.',
    questionHi: 'उदासीनता वक्र की परिभाषा दीजिए तथा इसकी प्रमुख विशेषताओं को समझाइए। उदासीनता वक्र एवं बजट रेखा की सहायता से उपभोक्ता संतुलन की शर्तों को सिद्ध कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2021, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: 'An Indifference Curve represents locus of consumption bundles yielding identical utility. Properties: 1) Negative downward slope, 2) Convex to origin due to diminishing Marginal Rate of Substitution (MRS_xy), 3) Curves never intersect. Consumer equilibrium requires: Condition 1: Budget line tangency MRS_xy = P_x / P_y; Condition 2: Diminishing MRS_xy ensuring convexity at equilibrium point.',
    solutionHi: 'उदासीनता वक्र दो वस्तुओं के उन विभिन्न संयोगों का बिंदुपथ है जो उपभोक्ता को समान संतुष्टि प्रदान करते हैं। विशेषताएं: ऋणात्मक ढाल, मूल बिंदु की ओर उत्तलोदर (घटती MRS_xy), परस्पर न काटना। उपभोक्ता संतुलन की शर्तें: 1) स्पर्श बिंदु पर MRS_xy = P_x / P_y (बजट रेखा का ढाल); 2) संतुलन बिंदु पर उदासीनता वक्र का उत्तलोदर होना।',
    examinerRubric: [
      'Definition and three properties of Indifference Curves (5 Marks)',
      'Budget constraint equation and graphical slope (3 Marks)',
      'Mathematical and graphical derivation of equilibrium (5 Marks)',
      'Second-order convexity condition explanation (2 Marks)',
    ],
    learnTopicId: 't-eco-101',
  },
  {
    id: 'pyq-eco-02',
    stream: 'ba-arts',
    semester: 2,
    unitNumber: 4,
    subjectCode: 'SDSUV-ECO-201',
    subjectNameEn: 'Economics (Micro & Uttarakhand Economy)',
    subjectNameHi: 'अर्थशास्त्र (व्यष्टि एवं उत्तराखंड अर्थव्यवस्था)',
    chapterEn: 'Unit 4: Uttarakhand Mountain Economy',
    chapterHi: 'इकाई 4: उत्तराखंड पर्वतीय अर्थव्यवस्था',
    topicEn: 'Money-Order Economy & Migration (Palayan)',
    topicHi: 'मनी-ऑर्डर अर्थव्यवस्था एवं पलायन',
    questionEn: 'Critically analyze the features of Uttarakhand Hill Economy with special reference to the "Money-Order Remittance Economy", land fragmentation, and youth out-migration (Palayan). Suggest sustainable policy interventions.',
    questionHi: 'उत्तराखंड की पर्वतीय अर्थव्यवस्था की विशेषताओं का "मनी-ऑर्डर प्रेषित आय अर्थव्यवस्था", भूमि विखंडन एवं युवा पलायन के विशेष संदर्भ में आलोचनात्मक विश्लेषण कीजिए। इसके समाधान हेतु धारणीय नीतियां सुझाइए।',
    marks: 10,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: 'Rural hill districts in Uttarakhand suffer from rugged topography, subsistence terraced agriculture, wild animal crop depredation, and lack of secondary industries. Families historically depend on remittance money orders sent by members serving in the armed forces or private sector in Delhi/Dehradun. Solutions include high-value aromatic/medicinal plant cultivation, community homestays, horticulture food-processing clusters, and reverse migration incentives.',
    solutionHi: 'पर्वतीय उत्तराखंड में सीढ़ीदार खेती, जोतों के अत्यधिक विखंडन, बंदर-सूअर द्वारा फसलों के नुकसान तथा स्थानीय उद्योगों के अभाव के कारण सेना व महानगरों में कार्यरत परिजनों द्वारा भेजे गए मनी-ऑर्डर पर निर्भरता रही है। समाधान: सगंध व औषधीय पादप कृषि, होमस्टे पर्यटन, स्थानीय खाद्य प्रसंस्करण एवं रिवर्स माइग्रेशन नीतियां।',
    examinerRubric: [
      'Structural features of Uttarakhand hill agriculture (3 Marks)',
      'Money-order remittance dependency and rural ghost villages (Bhootaha Gaon) (4 Marks)',
      'Sustainable economic solutions (Horticulture, Ecotourism, MSME) (3 Marks)',
    ],
    learnTopicId: 't-eco-101',
  },

  // =========================================================================
  // BA ARTS (NEP 2020): SEMESTER 1 - SDSUV PREVIOUS YEAR EXAM QUESTIONS
  // =========================================================================

  // ------------------ 1. PHYSICAL GEOGRAPHY (SDSUV-GEO-101) ------------------
  {
    id: 'pyq-geo-nep-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-GEO-101',
    subjectNameEn: 'Geography: Physical Geography (Lithosphere & Atmosphere)',
    subjectNameHi: 'भूगोल: भौतिक भूगोल (स्थलमंडल एवं वायुमंडल)',
    chapterEn: 'Unit 1: Geomorphology & Earth’s Dynamic Interior',
    chapterHi: 'इकाई 1: भू-आकृति विज्ञान एवं पृथ्वी की आंतरिक संरचना',
    topicEn: 'Origin of Earth: Laplace Nebular Hypothesis vs Tidal Models',
    topicHi: 'पृथ्वी की उत्पत्ति: लाप्लास की निहारिका परिकल्पना एवं ज्वारीय मॉडल',
    questionEn: 'Critically examine the Nebular Hypothesis of Laplace (1796) regarding the origin of the Earth. Explain how the Tidal Hypothesis of Jeans and Jeffreys attempted to resolve the angular momentum paradox.',
    questionHi: 'पृथ्वी की उत्पत्ति के संबंध में लाप्लास (1796) की निहारिका परिकल्पना का आलोचनात्मक परीक्षण कीजिए। जींस एवं जेफ्रीज की ज्वारीय परिकल्पना ने कोणीय संवेग विरोधाभास का समाधान कैसे प्रस्तुत किया?',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2021, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. INTRODUCTION & HISTORICAL PREMISE:
In 1796, French mathematician Pierre-Simon Laplace published "Exposition du Système du Monde", proposing the Monistic Nebular Hypothesis. He hypothesized that the solar system originated from a single primordial, hot, slowly rotating, giant gaseous nebula.

2. MECHANISM OF PLANETARY ACCRETION:
As the nebula radiated thermal energy into space, it cooled and contracted gravitationally.
By the Law of Conservation of Angular Momentum (L = I * omega = Constant), a decrease in the moment of inertia (I) caused an exponential increase in rotational angular velocity (omega).
Centrifugal force at the equatorial perimeter (F_c = m*omega²*r) gradually surpassed inward gravitational pull (F_g = G*M*m/r²).
Consequently, successive concentric gaseous rings detached from the equatorial bulge. Each ring aggregated gravitationally to form a protoplanet, with the residual central mass condensing into the Sun.

3. THE ANGULAR MOMENTUM PARADOX (CRITICAL LIMITATION):
Physicist Clerk Maxwell and astronomer Otto Schmidt pointed out that while the Sun contains 99.8% of the total mass of the solar system, it holds barely 1.5% of the total angular momentum. The 8 planets (possessing only 0.2% of mass) harbor over 98% of the total angular momentum. A steadily cooling, self-contracting nebula cannot mechanically transfer angular momentum from its center to its outermost periphery.

4. THE DUALISTIC TIDAL HYPOTHESIS ALTERNATIVE (JEANS & JEFFREYS, 1919):
Sir James Jeans and Harold Jeffreys introduced an intrusive tidal model:
- An enormous wandering companion star passed close to the primitive sun.
- The immense differential gravitational attraction pulled out a colossal cigar-shaped gaseous filament (spindle) from the sun's surface.
- As the intruder star retreated into deep space, the thick central part of the filament broke into giant planets (Jupiter, Saturn), while the tapered ends condensed into smaller inner and outer planets (Mercury, Mars).

5. EXAMINER MARKING BREAKDOWN:
[Laplace Premise & Physical Assumptions: 3 Marks]
[Ring Detachment Process & Conservation of Momentum: 5 Marks]
[Angular Momentum Paradox & Mathematical Limitations: 4 Marks]
[Tidal Hypothesis Synthesis & Modern Accretion: 3 Marks]`,
    solutionHi: `1. प्रस्तावना एवं ऐतिहासिक पृष्ठभूमि:
1796 ईस्वी में फ्रांसीसी गणितज्ञ पियरे-साइमन लाप्लास ने अपनी पुस्तक "एक्सपोजिशन डू सिस्टेम डू मोंडे" में निहारिका परिकल्पना (Nebular Hypothesis) प्रतिपादित की। उन्होंने माना कि सौरमंडल की उत्पत्ति एक विशाल, तप्त एवं निरंतर घूमती हुई गैसीय निहारिका से हुई।

2. ग्रहों के निर्माण की कार्यप्रणाली:
- अंतरिक्ष में निरंतर ताप विकिरण के कारण निहारिका ठंडी हुई और गुरुत्वाकर्षण के प्रभाव से सिकुड़ने लगी।
- कोणीय संवेग संरक्षण नियम (L = I * omega) के अनुसार त्रिज्या घटने पर घूर्णन वेग में तीव्र वृद्धि हुई।
- भूमध्यरेखीय उभार पर अपकेंद्रीय बल (Centrifugal force) का मान अंततः गुरुत्वाकर्षण बल से अधिक हो गया।
- इससे निहारिका के मध्य भाग से क्रमिक रूप से गैसीय छल्ले अलग हुए, जिनके शीतल होकर संघनित होने से ग्रह बने और शेष केंद्रीय भाग सूर्य बना।

3. कोणीय संवेग विरोधाभास (प्रमुख वैज्ञानिक दोष):
भौतिकविद् क्लर्क मैक्सवेल ने गणितीय गणनाओं से सिद्ध किया कि सूर्य में सौरमंडल का 99.8% द्रव्यमान है, किंतु कुल कोणीय संवेग का मात्र 1.5% ही सूर्य में है। शेष 98% से अधिक कोणीय संवेग 0.2% द्रव्यमान वाले ग्रहों में केंद्रित है। लाप्लास का एकतारक मॉडल इस असंतुलन की व्याख्या करने में पूरी तरह असमर्थ रहा।

4. जींस एवं जेफ्रीज की ज्वारीय परिकल्पना (1919):
इस दोष को दूर करने हेतु द्वैतारक मॉडल आया: सूर्य के निकट से एक विशाल भ्रमणकारी तारे के गुजरने से सूर्य की सतह पर एक विशाल ज्वारीय सिगारनुमा (Filament) उभार उठा। तारा दूर निकल गया और सिगारनुमा तंतु टूटकर शीतल हुआ, जिससे बीच में विशाल ग्रह (बृहस्पति, शनि) तथा सिरों पर छोटे ग्रह (बुध, मंगल) बने।

5. परीक्षक अंक विभाजन:
[लाप्लास की मूल मान्यताएं एवं पृष्ठभूमि: 3 अंक]
[छल्ले अलग होने की भौतिक प्रक्रिया एवं संवेग नियम: 5 अंक]
[कोणीय संवेग का वैज्ञानिक विरोधाभास: 4 अंक]
[ज्वारीय सिद्धांत एवं आधुनिक सौर निहारिका निष्कर्ष: 3 अंक]`,
    examinerRubric: [
      'Laplace Premise & Physical Assumptions (3 Marks)',
      'Ring Detachment Process & Conservation of Momentum (5 Marks)',
      'Angular Momentum Paradox & Mathematical Critique (4 Marks)',
      'Jeans-Jeffreys Tidal Model & Modern Accretion (3 Marks)',
    ],
    learnTopicId: 't-geo-101',
  },
  {
    id: 'pyq-geo-nep-02',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-GEO-101',
    subjectNameEn: 'Geography: Physical Geography (Lithosphere & Atmosphere)',
    subjectNameHi: 'भूगोल: भौतिक भूगोल (स्थलमंडल एवं वायुमंडल)',
    chapterEn: 'Unit 1: Geomorphology & Earth’s Dynamic Interior',
    chapterHi: 'इकाई 1: भू-आकृति विज्ञान एवं पृथ्वी की आंतरिक संरचना',
    topicEn: 'Angular Momentum Paradox & Otto Schmidt Model',
    topicHi: 'कोणीय संवेग विरोधाभास एवं ऑटो श्मिट का धूलि परिकल्पना मॉडल',
    questionEn: 'Explain the Angular Momentum Paradox in Laplace’s Nebular Hypothesis. How did Otto Schmidt’s Interstellar Dust Hypothesis resolve this issue?',
    questionHi: 'लाप्लास की निहारिका परिकल्पना में कोणीय संवेग विरोधाभास क्या है? रूसी वैज्ञानिक ऑटो श्मिट की अंतरातारकीय धूलि परिकल्पना ने इसका समाधान कैसे किया?',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2022, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. THE PARADOX (2 MARKS):
In our solar system, mass distribution and angular momentum (L = m*v*r) are starkly decoupled:
- The Sun contains 99.8% of the total mass, but only ~1.5% of total angular momentum.
- The planets hold merely 0.2% of mass, but carry 98.5% of the total angular momentum (principally in Jupiter, Saturn, Uranus, Neptune).
Under pure thermal contraction of a single body, angular momentum cannot be spontaneously shifted outward to minute planetary rings.

2. OTTO SCHMIDT RESOLUTION (1943) (3 MARKS):
Soviet geophysicist Otto Schmidt proposed that the Sun originally lacked this cloud. While revolving around the galactic center, the Sun gravitationally captured a dark, cold interstellar cloud of dust and gas.
- The captured matter naturally possessed high orbital angular momentum from the galaxy.
- Collisional friction in the flat rotating disc separated heavy dust (forming rocky terrestrial planets) from light gases (forming Jovian gas giants), naturally explaining the massive angular momentum of distant planets.`,
    solutionHi: `1. कोणीय संवेग विरोधाभास (2 अंक):
सौरमंडल में द्रव्यमान और कोणीय संवेग (L = m*v*r) का वितरण अत्यधिक विषम है:
- सूर्य में सौरमंडल का 99.8% द्रव्यमान है, किंतु कुल कोणीय संवेग का केवल 1.5% है।
- ग्रहों में मात्र 0.2% द्रव्यमान होने के बावजूद 98.5% कोणीय संवेग विद्यमान है। लाप्लास के एकतारक संकुचन मॉडल द्वारा इस बाह्य स्थानांतरण को सिद्ध नहीं किया जा सकता।

2. ऑटो श्मिट का समाधान (1943) (3 अंक):
रूसी वैज्ञानिक ऑटो श्मिट ने माना कि आदि-सूर्य ने आकाशगंगा के चक्कर लगाते समय अंतरिक्ष में फैले एक विशाल ठंडे गैसीय व धूलि मेघ को आकर्षित किया।
- इस बाह्य मेघ में पहले से ही अत्यधिक कक्षीय कोणीय संवेग मौजूद था।
- इस धूलि चक्र में कणों के पारस्परिक घर्षण व अभिवृद्धि (Accretion) से ग्रह बने, जिससे कोणीय संवेग स्वाभाविक रूप से बाह्य ग्रहों में केंद्रित हो गया।`,
    examinerRubric: [
      'Mathematical definition of Angular Momentum Paradox (2 Marks)',
      'Otto Schmidt interstellar dust cloud capture & accretion mechanics (3 Marks)',
    ],
    learnTopicId: 't-geo-101',
  },
  {
    id: 'pyq-geo-nep-03',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-GEO-101',
    subjectNameEn: 'Geography: Physical Geography (Lithosphere & Atmosphere)',
    subjectNameHi: 'भूगोल: भौतिक भूगोल (स्थलमंडल एवं वायुमंडल)',
    chapterEn: 'Unit 1: Geomorphology & Earth’s Dynamic Interior',
    chapterHi: 'इकाई 1: भू-आकृति विज्ञान एवं पृथ्वी की आंतरिक संरचना',
    topicEn: 'Laplace 1796 Thesis on Solar Nebula',
    topicHi: 'लाप्लास का 1796 का निहारिका मूल सिद्धांत',
    questionEn: 'State Laplace’s core premise regarding the origin of planets as formulated in his 1796 work "Exposition du Système du Monde".',
    questionHi: 'लाप्लास ने 1796 में अपनी कृति "एक्सपोजिशन डू सिस्टेम डू मोंडे" में सौरमंडल की उत्पत्ति की क्या मूल अवधारणा दी थी?',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 4,
    yearsAppeared: [2021, 2023, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `Laplace postulated that the solar system evolved from a single, primordial, intensely heated, slowly rotating gaseous nebula that gradually cooled, contracted, accelerated in rotational velocity, and cast off concentric equatorial rings that consolidated into planets.`,
    solutionHi: `लाप्लास के अनुसार सौरमंडल की उत्पत्ति अंतरिक्ष में विद्यमान एक विशाल, तप्त एवं मंद गति से घूमती हुई गैसीय निहारिका से हुई, जो निरंतर शीतलन व सिकुड़न के कारण तीव्र गति से घूमी और उसके विषुवतीय भाग से अलग हुए छल्ले ठंडे होकर ग्रह बने।`,
    examinerRubric: [
      'Name of work & hot rotating nebula premise (1 Mark)',
      'Equatorial ring detachment leading to planet accretion (1 Mark)',
    ],
    learnTopicId: 't-geo-101',
  },
  {
    id: 'pyq-geo-nep-04',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-GEO-101',
    subjectNameEn: 'Geography: Physical Geography (Lithosphere & Atmosphere)',
    subjectNameHi: 'भूगोल: भौतिक भूगोल (स्थलमंडल एवं वायुमंडल)',
    chapterEn: 'Unit 1: Geomorphology & Earth’s Dynamic Interior',
    chapterHi: 'इकाई 1: भू-आकृति विज्ञान एवं पृथ्वी की आंतरिक संरचना',
    topicEn: 'Seismic Wave Tomography & 5 Discontinuities (CMRGL)',
    topicHi: 'भूकंपीय तरंग विश्लेषण एवं 5 प्रमुख असंबद्धताएं (CMRGL)',
    questionEn: 'Elucidate the internal structure of the Earth based on seismological evidence (P and S wave velocities). Detail the five major discontinuities with depths and densities, and provide a labeled cross-sectional diagram.',
    questionHi: 'भूकंपीय साक्ष्यों (P एवं S तरंग वेग) के आधार पर पृथ्वी की आंतरिक संरचना की विवेचना कीजिए। गहराई एवं घनत्व सहित पांचों प्रमुख असंबद्धताओं का वर्णन कीजिए तथा एक नामांकित चित्र बनाइए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. SEISMOLOGICAL METHODOLOGY & BODY WAVE BEHAVIOR:
Earthquakes generate body waves that serve as natural deep-earth tomographic probes:
- P-Waves (Primary / Longitudinal): Propagate through solids, liquids, and gases; velocity V_p = sqrt((K + 4/3*mu)/rho).
- S-Waves (Secondary / Transverse): Propagate ONLY through elastic solids; shear modulus mu = 0 in fluids, causing S-waves to perish completely at liquid boundaries.

2. THREE CONCENTRIC STRUCTURAL LAYERS:
A) CRUST (0 to 30-35 km):
   - Upper Continental Crust (SIAL: Silica + Aluminium, density 2.7 g/cm³).
   - Lower Oceanic Crust (SIMA: Silica + Magnesium, density 3.0 g/cm³).
B) MANTLE (30 to 2900 km, 83% Earth volume, 67% mass):
   - Asthenosphere (100 to 400 km): Low-velocity semi-molten ductile plastic layer facilitating tectonic plate motion.
   - Lower Mantle / Mesosphere: High density (4.5 to 5.7 g/cm³), solid peridotite rock.
C) CORE (BARYSPHERE, 2900 to 6371 km, Nickel-Iron / NIFE):
   - Outer Core (2900 to 5150 km): Liquid metallic iron; absorbs S-waves creating the 105°-145° S-wave shadow zone; fluid convection generates Earth's geodynamo magnetic field.
   - Inner Core (5150 to 6371 km): Solid metallic ball due to colossal hydrostatic pressure (>3.6 million atm, density 13.0 to 13.6 g/cm³).

3. THE FIVE SEISMIC DISCONTINUITIES (MNEMONIC: "CMRGL"):
1. Conrad Discontinuity (~15-20 km): Boundary between Upper Continental (Granitic) and Lower (Basaltic) Crust.
2. Mohorovičić (Moho) Discontinuity (~30-35 km beneath continents): Crust-Mantle boundary where P-wave velocity jumps abruptly from 6.0 km/s to 8.1 km/s.
3. Repetti Discontinuity (~700 km): Transition between Upper Asthenospheric Mantle and rigid Lower Mantle.
4. Gutenberg Discontinuity (2900 km): Mantle-Core boundary where P-waves decelerate sharply from 13.7 km/s to 8.0 km/s and S-waves vanish completely.
5. Lehmann Discontinuity (5150 km): Transition between liquid Outer Core and solid Inner Core where P-wave velocity increases from 10.3 to 11.2 km/s.

4. CROSS-SECTIONAL ARCHITECTURE SCHEMATIC:
   Surface (0 km) -------- Crust (Sial/Sima, rho=2.7-3.0)
   --- 15 km: Conrad Discontinuity ---
   --- 35 km: Mohorovičić Discontinuity (P-wave jumps to 8.1 km/s) ---
   Upper Mantle / Asthenosphere (100-400 km, plastic magma zone)
   --- 700 km: Repetti Discontinuity ---
   Lower Mantle / Mesosphere (Solid peridotite, rho=4.5-5.7)
   --- 2900 km: Gutenberg Discontinuity (S-Waves cease; rho jumps to 10.0) ---
   Outer Core (Liquid Fe-Ni, geodynamo field, rho=10.0-12.2)
   --- 5150 km: Lehmann Discontinuity ---
   Inner Core (Solid crystalline Fe-Ni, rho=13.0-13.6, Center: 6371 km)

5. EXAMINER MARKING BREAKDOWN:
[P and S wave velocity properties & shadow zones: 4 Marks]
[Crust, Mantle, Core composition, depths, and densities: 5 Marks]
[Five Discontinuities CMRGL definitions & depths: 3 Marks]
[Labeled cross-sectional diagram with depth markers: 3 Marks]`,
    solutionHi: `1. भूकंपीय तरंगों द्वारा अन्वेषण:
पृथ्वी के आंतरिक भाग का कोई प्रत्यक्ष साक्ष्य संभव नहीं है। भूकंपीय तरंगें एक्स-रे की भांति कार्य करती हैं:
- P-तरंगें (प्राथमिक/अनुदैर्ध्य): ठोस, द्रव एवं गैस तीनों में संचरित होती हैं।
- S-तरंगें (द्वितीयक/अनुप्रस्थ): केवल प्रत्यास्थ ठोस पदार्थों में संचरित हो सकती हैं। तरल माध्यम में इनका वेग शून्य हो जाता है।

2. पृथ्वी के तीन संकेंद्रीय मंडल:
क) भूपर्पटी (Crust, 0 से 30-35 किमी):
   - ऊपरी महाद्वीपीय पर्त (सियाल - SIAL, घनत्व 2.7 ग्राम/सेमी³)।
   - निचली महासागरीय पर्त (सीमा - SIMA, घनत्व 3.0 ग्राम/सेमी³)।
ख) मैंटल (Mantle, 30 से 2900 किमी):
   - दुर्बलता मंडल (Asthenosphere, 100 से 400 किमी): अर्द्ध-तरल प्लास्टिक अवस्था में, जिस पर लिथोस्फेरिक प्लेटें तैरती हैं।
   - निचला मैंटल (पेरिडोटाइट शैल, घनत्व 4.5 से 5.7 ग्राम/सेमी³)।
ग) क्रोड (Core, 2900 से 6371 किमी, निफे - NIFE):
   - बाह्य क्रोड (2900 से 5150 किमी): तरल अवस्था में पिघला हुआ लोहा व निकल। S-तरंगें इसमें प्रवेश नहीं कर पातीं। इसके संवहन से भू-चुंबकत्व उत्पन्न होता है।
   - आंतरिक क्रोड (5150 से 6371 किमी): अत्यधिक दाब (36 लाख वायुमंडलीय) के कारण ठोस अवस्था (घनत्व 13.0 से 13.6 ग्राम/सेमी³)।

3. पांच प्रमुख असंबद्धताएं (शॉर्टकट: "CMRGL"):
1. कॉनराड असंबद्धता (~15-20 किमी): ऊपरी सियाल एवं निचले सीमा के मध्य।
2. मोहोरोविकिक (मोहो) असंबद्धता (~35 किमी): क्रस्ट एवं मैंटल के मध्य (P-तरंग वेग 6.0 से 8.1 किमी/सेकंड हो जाता है)।
3. रेपिटी असंबद्धता (~700 किमी): ऊपरी मैंटल एवं निचले मैंटल के मध्य।
4. गुटेनबर्ग असंबद्धता (2900 किमी): मैंटल एवं तरल क्रोड के मध्य (S-तरंगें लुप्त हो जाती हैं)।
5. लेहमैन असंबद्धता (5150 किमी): तरल बाह्य क्रोड एवं ठोस आंतरिक क्रोड के मध्य।

4. परीक्षक अंक विभाजन:
[P व S तरंग गुणधर्म एवं छाया क्षेत्र विश्लेषण: 4 अंक]
[क्रस्ट, मैंटल, क्रोड का संगठन, गहराई व घनत्व: 5 अंक]
[5 असंबद्धताओं CMRGL का सटीक विवरण: 3 अंक]
[स्वच्छ नामांकित अनुप्रस्थ काट चित्र: 3 अंक]`,
    examinerRubric: [
      'P & S wave propagation and shadow zone mechanics (4 Marks)',
      'Crust, Mantle, Core depths, densities, and phases (5 Marks)',
      'Five Discontinuities CMRGL definitions and depths (3 Marks)',
      'Labeled cross-sectional depth diagram (3 Marks)',
    ],
    learnTopicId: 't-geo-101',
  },
  {
    id: 'pyq-geo-nep-05',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-GEO-101',
    subjectNameEn: 'Geography: Physical Geography (Lithosphere & Atmosphere)',
    subjectNameHi: 'भूगोल: भौतिक भूगोल (स्थलमंडल एवं वायुमंडल)',
    chapterEn: 'Unit 1: Geomorphology & Earth’s Dynamic Interior',
    chapterHi: 'इकाई 1: भू-आकृति विज्ञान एवं पृथ्वी की आंतरिक संरचना',
    topicEn: 'S-Wave Shadow Zone & Liquid Outer Core',
    topicHi: 'S-तरंग छाया क्षेत्र एवं तरल बाह्य क्रोड का प्रमाण',
    questionEn: 'What is the S-wave shadow zone? Explain how it decisively proves that the Earth’s outer core is in a molten or liquid state.',
    questionHi: 'S-तरंग छाया क्षेत्र क्या है? यह किस प्रकार अकाट्य रूप से प्रमाणित करता है कि पृथ्वी का बाह्य क्रोड तरल अवस्था में है?',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2021, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. PHYSICAL PROPERTY OF S-WAVES (2 MARKS):
S-waves (Secondary / Shear waves) are transverse mechanical waves where particle displacement is perpendicular to wave propagation. Their velocity depends directly on the shear modulus (rigidity) of the medium: V_s = sqrt(mu / rho). Fluids (liquids and gases) possess zero shear modulus (mu = 0), making it physically impossible for S-waves to travel through any liquid medium.

2. SHADOW ZONE FORMATION & OUTER CORE PROOF (3 MARKS):
- Seismographs located between 105° and 180° on both sides of an earthquake epicenter record zero direct S-waves.
- This creates an enormous global S-wave shadow zone spanning over 40% of the Earth's circumference.
- Because S-waves travel through the entire solid mantle down to 2900 km but terminate abruptly at the Gutenberg boundary, geophysicists conclusively deduced that the Earth's outer core (2900 to 5150 km) is composed of molten liquid iron-nickel.`,
    solutionHi: `1. S-तरंगों की भौतिक प्रकृति (2 अंक):
द्वितीयक या S-तरंगें अनुप्रस्थ तरंगें हैं जिनकी गति माध्यम की दृढ़ता (Shear Modulus, mu) पर निर्भर करती है: V_s = sqrt(mu / rho)। तरल एवं गैसीय पदार्थों में दृढ़ता गुणांक शून्य होता है, अतः S-तरंगें किसी भी तरल माध्यम से नहीं गुजर सकतीं।

2. छाया क्षेत्र एवं तरल क्रोड का प्रमाण (3 अंक):
- भूकंप केंद्र से 105° से अधिक कोणीय दूरी पर स्थित किसी भी सिस्मोग्राफ स्टेशन पर प्रत्यक्ष S-तरंगें प्राप्त नहीं होतीं। यह 105° से 105° तक पृथ्वी की 40% से अधिक परिधि को घेरता है।
- चूंकि S-तरंगें 2900 किमी गहराई तक पूरे ठोस मैंटल से सफलतापूर्वक गुजरती हैं, किंतु गुटेनबर्ग सीमा पर पहुंचते ही पूरी तरह लुप्त हो जाती हैं, इससे भौतिक रूप से सिद्ध होता है कि 2900 से 5150 किमी के मध्य स्थित बाह्य क्रोड तरल अवस्था में है।`,
    examinerRubric: [
      'Transverse nature & zero shear modulus in fluids (2 Marks)',
      '105° to 105° shadow zone geometry & outer core proof (3 Marks)',
    ],
    learnTopicId: 't-geo-101',
  },
  {
    id: 'pyq-geo-nep-06',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-GEO-101',
    subjectNameEn: 'Geography: Physical Geography (Lithosphere & Atmosphere)',
    subjectNameHi: 'भूगोल: भौतिक भूगोल (स्थलमंडल एवं वायुमंडल)',
    chapterEn: 'Unit 1: Geomorphology & Earth’s Dynamic Interior',
    chapterHi: 'इकाई 1: भू-आकृति विज्ञान एवं पृथ्वी की आंतरिक संरचना',
    topicEn: 'Mohorovičić (Moho) Discontinuity Definition',
    topicHi: 'मोहोरोविकिक (मोहो) असंबद्धता की परिभाषा',
    questionEn: 'Define the Mohorovičić (Moho) Discontinuity. State its depth under continents and oceans and the seismic velocity jump observed.',
    questionHi: 'मोहोरोविकिक (मोहो) असंबद्धता को परिभाषित कीजिए। महाद्वीपों एवं महासागरों के नीचे इसकी गहराई तथा भूकंपीय तरंग वेग में परिवर्तन बताइए।',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 5,
    yearsAppeared: [2022, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `The Mohorovičić (Moho) Discontinuity (discovered in 1909) marks the compositional boundary between the Crust and Mantle. It occurs at an average depth of 30-35 km beneath continents (up to 70 km under the Himalayas) and 5-10 km beneath ocean basins, marked by a sharp P-wave velocity jump from 6.0 km/s to 8.1 km/s.`,
    solutionHi: `मोहोरोविकिक (मोहो) असंबद्धता (1909 में खोजी गई) भूपर्पटी (क्रस्ट) और मैंटल के मध्य का सीमा तल है। यह महाद्वीपों के नीचे 30-35 किमी (हिमालय के नीचे 70 किमी तक) तथा महासागरों के नीचे 5-10 किमी गहराई पर पाई जाती है, जहां P-तरंगों का वेग 6.0 किमी/सेकंड से उछलकर 8.1 किमी/सेकंड हो जाता है।`,
    examinerRubric: [
      'Crust-Mantle boundary definition & depths (1 Mark)',
      'P-wave velocity jump from 6.0 to 8.1 km/s (1 Mark)',
    ],
    learnTopicId: 't-geo-101',
  },

  // ------------------ 2. ANCIENT INDIAN HISTORY (SDSUV-HIS-101) ------------------
  {
    id: 'pyq-his-nep-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIS-101',
    subjectNameEn: 'History: History of India from Earliest Times to 300 A.D.',
    subjectNameHi: 'इतिहास: प्राचीन भारत का इतिहास (प्रारंभ से 300 ईस्वी तक)',
    chapterEn: 'Unit 1: Sources of History & Indus Valley Civilization',
    chapterHi: 'इकाई 1: इतिहास के स्रोत एवं सिंधु घाटी सभ्यता',
    topicEn: 'Archaeological vs Literary Sources of Ancient India',
    topicHi: 'प्राचीन भारतीय इतिहास के पुरातात्विक बनाम साहित्यिक स्रोत',
    questionEn: 'Critically examine the relative importance of Archaeological and Literary sources in reconstructing the history of Ancient India. How do Epigraphy and Numismatics serve as indispensable chronological anchors?',
    questionHi: 'प्राचीन भारतीय इतिहास के पुनर्निर्माण में पुरातात्विक एवं साहित्यिक स्रोतों के आपेक्षिक महत्व का आलोचनात्मक परीक्षण कीजिए। अभिलेख शास्त्र एवं मुद्रा शास्त्र किस प्रकार कालक्रम के अनिवार्य आधार बनते हैं?',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2021, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. HISTORIOGRAPHICAL CONTEXT:
Reconstructing ancient Indian history requires a multi-disciplinary synthesis. Because early Indian authors placed spiritual salvation over chronological historiography, physical archaeological remnants provide the primary scientific baseline, while literary texts provide social, cultural, and philosophical flesh.

2. ARCHAEOLOGICAL SOURCES (SCIENTIFIC BASELINE):
A) Stratigraphy & Radiocarbon Dating (C-14): Provides precise dates free from scribal tampering (e.g., carbon dates established mature Harappan urbanism at 2600-1900 BCE).
B) Epigraphy (Inscriptions):
   - Inscriptions are unvarnished contemporary legal records engraved on stone and copper plates.
   - James Prinsep's decipherment of Brahmi script in 1837 unlocked Ashokan edicts, transforming our knowledge of the Mauryan Empire.
   - Samudragupta's Prayag Prashasti (composed by Harishena on the Allahabad Pillar) documents imperial conquests in pristine classical Sanskrit.
C) Numismatics (Coins):
   - Coins reveal sovereign boundaries, trade balance, monetary health, and metallurgy.
   - Indo-Greek bilingual coins (Greek & Kharosthi) helped reconstruct over 30 kings known solely through their numismatic issues.
   - Gupta gold dinaras depict kingly accomplishments (e.g., Samudragupta playing the Veena; Ashvamedha sacrificial horses).

3. LITERARY SOURCES (CULTURAL & ADMINISTRATIVE CONTOUR):
A) Indigenous Texts:
   - Religious: Rigveda (early pastoral society), Upanishads (philosophy), Buddhist Tripitakas and Jatakas (6th c. BCE urban economy).
   - Secular: Kautilya's Arthashastra (Mauryan administrative and fiscal statecraft), Panini's Ashtadhyayi (linguistic geography), Kalidasa's drama.
B) Foreign Accounts:
   - Megasthenes (Indica, Mauryan court), Fa-Hien (Gupta era), Hiuen Tsang (Harsha's reign), and the anonymous Periplus of the Erythraean Sea (documenting Roman trade with Muziris and Arikamedu).

4. SCIENTIFIC LIMITATIONS & HISTORIOGRAPHICAL SYNTHESIS:
- Literary texts suffered from subsequent interpolations (Prakshipta), mythical exaggerations, and royal flattery (Charita literature).
- Archaeology is silent on motives, thoughts, and complex philosophy.
- Conclusion: A balanced historiography demands critical triangulation—cross-verifying textual descriptions with carbon-dated epigraphic and material remains.

5. EXAMINER MARKING BREAKDOWN:
[Historiographical introduction & methodology: 3 Marks]
[Archaeological excavations, Epigraphy (Prinsep/Ashoka), Numismatics: 6 Marks]
[Indigenous and Foreign literary genres: 3 Marks]
[Critical evaluation of biases & scientific synthesis: 3 Marks]`,
    solutionHi: `1. ऐतिहासिक पृष्ठभूमि एवं विधि:
प्राचीन भारत के इतिहास का पुनर्निर्माण एक बहु-विषयक कार्य है। प्राचीन भारतीय मनीषियों ने कालक्रमानुसार इतिहास लेखन के स्थान पर आध्यात्मिक एवं सांस्कृतिक चिंतन को प्राथमिकता दी। अतः पुरातात्विक साक्ष्य वैज्ञानिक आधार प्रदान करते हैं तथा साहित्यिक साक्ष्य सामाजिक एवं दार्शनिक स्वरूप स्पष्ट करते हैं।

2. पुरातात्विक साक्ष्य (अकाट्य वैज्ञानिक आधार):
क) उत्खनन एवं रेडियोकार्बन (C-14) तिथि निर्धारण: यह भौतिक अवशेषों की सटीक कालावधि तय करता है (जैसे हड़प्पा सभ्यता का काल 2600-1900 ईसा पूर्व)।
ख) अभिलेख शास्त्र (Epigraphy):
   - पाषाण शिलाओं व ताम्रपत्रों पर उत्कीर्ण लेख समकालीन होने के कारण प्रक्षेपों से मुक्त होते हैं।
   - 1837 में जेम्स प्रिंसेप द्वारा ब्राह्मी लिपि पढ़े जाने से मौर्य सम्राट अशोक के व्यापक साम्राज्य व धम्म नीति का उद्घाटन हुआ।
   - समुद्रगुप्त की प्रयाग प्रशस्ति (हरिषेण द्वारा रचित) गुप्त साम्राज्य के राजनीतिक विस्तार का सजीव दस्तावेज है।
ग) मुद्रा शास्त्र (Numismatics):
   - सिक्के शासकों के कालक्रम, धातु विज्ञान एवं आर्थिक संपन्नता का दर्पण हैं।
   - इंडो-ग्रीक द्विभाषी सिक्कों के आधार पर 30 से अधिक राजाओं का इतिहास लिखा गया।
   - गुप्तकालीन स्वर्ण मुद्राएं समुद्रगुप्त के वीणा-वादन एवं अश्वमेध यज्ञ को प्रमाणित करती हैं।

3. साहित्यिक स्रोत:
- धार्मिक साहित्य: ऋग्वेद (आर्य समाज), बौद्ध त्रिपिटक व जातक कथाएं (छठी शताब्दी ई.पू. की नगरीय अर्थव्यवस्था)।
- धर्मनिरपेक्ष ग्रंथ: कौटिल्य का अर्थशास्त्र (मौर्य प्रशासन), पाणिनी की अष्टाध्यायी।
- विदेशी यात्रियों के विवरण: मेगस्थनीज की 'इंडिका', फाह्यान, ह्वेनसांग तथा पेरिप्लस ऑफ द एरिथ्रियन सी (रोमन व्यापार)।

4. आलोचनात्मक मूल्यांकन:
साहित्यिक ग्रंथों में कवियों द्वारा अतिशयोक्ति व बाद के प्रक्षेप मिलते हैं, जबकि पुरातत्व मानव चेतना के दर्शन पर मौन रहता है। अतः दोनों का वैज्ञानिक समन्वय ही प्रामाणिक इतिहास प्रस्तुत करता है।

5. परीक्षक अंक विभाजन:
[इतिहास पुनर्निर्माण की रूपरेखा व महत्व: 3 अंक]
[अभिलेख (जेम्स प्रिंसेप), मुद्राएं एवं उत्खनन का विश्लेषण: 6 अंक]
[साहित्यिक व विदेशी वृत्तांतों का वर्गीकरण: 3 अंक]
[साहित्यिक सीमाओं का समाधान व समन्वित निष्कर्ष: 3 अंक]`,
    examinerRubric: [
      'Historiographical introduction & methodological framework (3 Marks)',
      'Epigraphy, Numismatics, and Carbon-dated Archaeology (6 Marks)',
      'Indigenous and Foreign literary accounts (3 Marks)',
      'Critical critique of textual bias & scientific synthesis (3 Marks)',
    ],
    learnTopicId: 't-his-101',
  },
  {
    id: 'pyq-his-nep-02',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIS-101',
    subjectNameEn: 'History: History of India from Earliest Times to 300 A.D.',
    subjectNameHi: 'इतिहास: प्राचीन भारत का इतिहास (प्रारंभ से 300 ईस्वी तक)',
    chapterEn: 'Unit 1: Sources of History & Indus Valley Civilization',
    chapterHi: 'इकाई 1: इतिहास के स्रोत एवं सिंधु घाटी सभ्यता',
    topicEn: 'Megasthenes Indica: Value and Limitations',
    topicHi: 'मेगस्थनीज कृत इंडिका: ऐतिहासिक महत्व एवं सीमाएं',
    questionEn: 'Evaluate the historical value of Megasthenes’ "Indica" for understanding Mauryan administration and society. What are its prominent misconceptions?',
    questionHi: 'मौर्यकालीन प्रशासन एवं समाज को समझने में मेगस्थनीज की "इंडिका" के ऐतिहासिक महत्व का मूल्यांकन कीजिए। इसमें कौन-सी प्रमुख भ्रांतियां हैं?',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2022, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. HISTORICAL SIGNIFICANCE (3 MARKS):
Megasthenes visited Pataliputra as the ambassador of Seleucus Nicator to Chandragupta Maurya's court (~302 BCE). Key historical contributions:
- Detailed account of Pataliputra city (9 miles long, 1.5 miles broad, surrounded by a wooden palisade with 570 towers and 64 gates).
- Municipal administration run by a committee of 30 members divided into 6 boards of 5 members each (Industrial arts, Foreigners, Vital statistics/Registration of births and deaths, Trade/Weights, Market manufacture, Tax collection).
- Description of the Royal Palace and the King's personal security detail.

2. PROMINENT MISCONCEPTIONS / LIMITATIONS (2 MARKS):
Because Megasthenes did not know Indian languages and viewed India through Greek lenses, he committed serious errors:
- Claimed that slavery did not exist in India (whereas Kautilya describes 9 types of Dasas).
- Divided Indian society into 7 occupational classes instead of 4 Varnas.
- Asserted that famines never occurred in India and that Indians did not know the art of writing.`,
    solutionHi: `1. ऐतिहासिक महत्व (3 अंक):
मेगस्थनीज सेल्यूकस निकेटर के राजदूत के रूप में चंद्रगुप्त मौर्य के दरबार में पाटलिपुत्र आया (~302 ई.पू.)।
- पाटलिपुत्र का विस्तृत विवरण: 9 मील लंबा व 1.5 मील चौड़ा नगर, 570 बुर्ज और 64 द्वारों वाला काष्ठ प्राचीर।
- नगर प्रशासन: 30 सदस्यों का मंडल जो 5-5 सदस्यों की 6 समितियों में विभाजित था (शिल्प कला, विदेशी देखरेख, जन्म-मरण पंजीकरण, व्यापार व माप-तौल, उद्योग, कर वसूली)।

2. प्रमुख भ्रांतियां एवं सीमाएं (2 अंक):
भारतीय भाषाओं के अज्ञान तथा यूनानी चश्मे से देखने के कारण मेगस्थनीज ने कुछ त्रुटियां कीं:
- उसने लिखा कि भारत में दास प्रथा नहीं थी (जबकि अर्थशास्त्र में 9 प्रकार के दास वर्णित हैं)।
- 4 वर्णों के स्थान पर समाज को 7 जातियों/व्यवसायों में वर्गीकृत किया।
- यह दावा किया कि भारत में कभी अकाल नहीं पड़ता और भारतीय लिखना नहीं जानते।`,
    examinerRubric: [
      'Pataliputra civic boards & municipal administration (3 Marks)',
      'Greek observer biases: Slavery & 7-class division misconceptions (2 Marks)',
    ],
    learnTopicId: 't-his-101',
  },
  {
    id: 'pyq-his-nep-03',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIS-101',
    subjectNameEn: 'History: History of India from Earliest Times to 300 A.D.',
    subjectNameHi: 'इतिहास: प्राचीन भारत का इतिहास (प्रारंभ से 300 ईस्वी तक)',
    chapterEn: 'Unit 1: Sources of History & Indus Valley Civilization',
    chapterHi: 'इकाई 1: इतिहास के स्रोत एवं सिंधु घाटी सभ्यता',
    topicEn: 'Decipherment of Brahmi Script by James Prinsep',
    topicHi: 'जेम्स प्रिंसेप द्वारा ब्राह्मी लिपि का उद्वाचन',
    questionEn: 'Who deciphered the Ashokan Brahmi script, in which year was it accomplished, and which royal epithet did it reveal?',
    questionHi: 'अशोक की ब्राह्मी लिपि को किसने और किस वर्ष में पढ़ा, तथा इसमें किस शाही उपाधि का उल्लेख मिला?',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 6,
    yearsAppeared: [2021, 2022, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `James Prinsep, an officer of the Calcutta Mint and Secretary of the Asiatic Society of Bengal, deciphered the Ashokan Brahmi script in 1837, revealing the royal epithet "Devanampiya Piyadassi" (Beloved of the Gods).`,
    solutionHi: `कोलकाता टकसाल के अधिकारी एवं एशियाटिक सोसाइटी के सचिव जेम्स प्रिंसेप ने 1837 ईस्वी में अशोक की ब्राह्मी लिपि को पढ़ा, जिससे सम्राट की उपाधि "देवानांपिय पियदस्सी" (देवताओं के प्रिय) का रहस्योद्घाटन हुआ।`,
    examinerRubric: [
      'James Prinsep & year 1837 (1 Mark)',
      'Royal epithet Devanampiya Piyadassi (1 Mark)',
    ],
    learnTopicId: 't-his-101',
  },
  {
    id: 'pyq-his-nep-04',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIS-101',
    subjectNameEn: 'History: History of India from Earliest Times to 300 A.D.',
    subjectNameHi: 'इतिहास: प्राचीन भारत का इतिहास (प्रारंभ से 300 ईस्वी तक)',
    chapterEn: 'Unit 1: Sources of History & Indus Valley Civilization',
    chapterHi: 'इकाई 1: इतिहास के स्रोत एवं सिंधु घाटी सभ्यता',
    topicEn: 'Harappan Town Planning & Civic Sanitation Architecture',
    topicHi: 'हड़प्पा नगर नियोजन एवं नागरिक स्वच्छता स्थापत्य',
    questionEn: 'Describe the salient features of town planning, building architecture, and municipal drainage in the Harappan Civilization. How does it demonstrate an advanced degree of civic governance unmatched in contemporary Bronze Age cultures?',
    questionHi: 'हड़प्पा सभ्यता के नगर नियोजन, भवन निर्माण एवं भूमिगत जल निकासी प्रणाली की प्रमुख विशेषताओं का वर्णन कीजिए। यह समकालीन कांस्य युगीन सभ्यताओं की तुलना में श्रेष्ठ नागरिक शासन को कैसे प्रदर्शित करता है?',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. URBAN SETTLEMENT PATTERN & DUAL DIVISION:
Excavations at Mohenjo-Daro, Harappa, and Kalibangan establish a standardized bipartite settlement layout:
- Western Citadel (Garhi): Raised on massive mud-brick platforms, fortified by ramparts, housing monumental public architecture (Great Bath, Granary, Assembly Halls).
- Eastern Lower Town: Extensive gridiron residential sector divided into rectangular blocks by wide avenues.

2. ORTHOGONAL STREET GRID & STANDARDIZED BRICK TECHNOLOGY:
- Main thoroughfares ran cardinal North-South and East-West, intersecting at precise 90-degree right angles (Chessboard / Gridiron pattern). Streets were up to 10 meters wide.
- Standardized Burnt Bricks: Kiln-fired bricks followed a universal mathematical dimension ratio of 4 : 2 : 1 (length : breadth : thickness), maintaining identical proportionality across sites 1500 km apart (from Sutkagan Dor in Baluchistan to Alamgirpur in UP).

3. THE MUNICIPAL DRAINAGE SYSTEM (UNRIVALED IN ANTIQUITY):
- Every domestic residence featured an internal paved bathing courtyard.
- Wastewater from bathrooms and kitchens flowed through terra-cotta conduits embedded in house walls directly into street drains.
- Street drains were constructed with kiln-baked bricks bonded with gypsum mortar and lined with waterproof bitumen.
- Covered Drainage & Inspection Traps: Drains were fully covered with removable flat limestone slabs or baked brick lintels. At regular intervals, brick-lined soak pits (cesspits) collected solid silt while clean effluent flowed out.

4. MONUMENTAL PUBLIC UTILITY: THE GREAT BATH (MOHENJO-DARO):
- Measures 11.88 m x 7.01 m with a depth of 2.43 m.
- Double-walled construction with a layer of natural bitumen (asphalt) sandwiched between burnt brick masonry to guarantee watertight waterproofing.
- Served ritual ablution purposes, flanked by changing rooms and a well.

5. COMPARISON WITH CONTEMPORARY BRONZE AGE CULTURES:
Contemporary Egyptian and Mesopotamian urban centers concentrated engineering wealth on colossal royal tombs (Pyramids of Giza) or religious Ziggurats for divine monarchs. Harappa uniquely prioritized egalitarian public municipal hygiene, underground sewers, and civic sanitation—a municipal phenomenon unprecedented in the 3rd millennium BCE.

6. EXAMINER MARKING BREAKDOWN:
[Citadel and Lower Town bipartite settlement layout: 4 Marks]
[Orthogonal grid streets & standardized 4:2:1 brick technology: 4 Marks]
[Underground covered drains, soak-pits, and Great Bath engineering: 4 Marks]
[Comparative superiority over contemporary Egypt and Mesopotamia: 3 Marks]`,
    solutionHi: `1. नगरों का दोहरा विभाजन:
हड़प्पा, मोहनजोदड़ो एवं कालीबंगा के नगर दो स्पष्ट भागों में बंटे थे:
- पश्चिमी गढ़ी (दुर्ग): मिट्टी के ऊंचे चबूतरों पर निर्मित व सुरक्षा प्राचीरों से घिरा क्षेत्र, जहां सार्वजनिक प्रशासनिक भवन, अन्नागार एवं विशाल स्नानागार स्थित थे।
- पूर्वी निचला नगर: विस्तृत आवासीय क्षेत्र, जहां सामान्य नागरिक, व्यापारी एवं शिल्पी निवास करते थे।

2. ग्रिड प्रणाली (शतरंज पट) एवं प्रामाणिक ईंटें:
- मुख्य सड़कें उत्तर से दक्षिण तथा पूर्व से पश्चिम दिशा में समकोण पर एक-दूसरे को काटती थीं (ग्रिड पद्धति)।
- पक्की ईंटों का निश्चित अनुपात: संपूर्ण हड़प्पा क्षेत्र में 4:2:1 (लंबाई:चौड़ाई:मोटाई) के निश्चित अनुपात वाली पक्की ईंटों का प्रयोग किया गया।

3. भूमिगत जल निकासी प्रणाली (प्राचीन विश्व में अद्वितीय):
- प्रत्येक घर में पक्का स्नानागार व रसोई होती थी, जिसका गंदा पानी दीवार की नली से सड़क की ढकी नाली में गिरता था।
- नालियां पक्की ईंटों, चूने एवं जिप्सम से जोड़ी जाती थीं तथा उन्हें ढकने हेतु पत्थरों या बड़ी ईंटों का प्रयोग होता था जिन्हें सफाई हेतु हटाया जा सकता था।
- निश्चित दूरी पर सोख-गड्ढे (मैनहोल) बने थे, जहां ठोस कचरा बैठ जाता था और केवल तरल जल आगे प्रवाहित होता था।

4. विशाल स्नानागार (मोहनजोदड़ो):
- 11.88 मीटर लंबा, 7.01 मीटर चौड़ा तथा 2.43 मीटर गहरा।
- जलरोधी बनाने हेतु ईंटों के बीच प्राकृतिक बिटुमेन (तारकोल) का प्लास्टर लगाया गया था। यह धार्मिक अनुष्ठानिक स्नान हेतु प्रयुक्त होता था।

5. समकालीन सभ्यताओं से तुलना:
मिस्र में पिरामिडों तथा मेसोपोटामिया में जिगुरतों पर राजाओं के वैभव हेतु धन खर्च हुआ, जबकि हड़प्पावासियों ने संपूर्ण विश्व में पहली बार नागरिक स्वास्थ्य, भूमिगत सीवर तथा जनसाधारण की स्वच्छता को सर्वोच्च प्राथमिकता दी।

6. परीक्षक अंक विभाजन:
[दुर्ग एवं निचले नगर का द्वैत नियोजन: 4 अंक]
[समकोण सड़कें एवं 4:2:1 ईंट अनुपात: 4 अंक]
[भूमिगत ढकी नालियां, सोख गड्ढे व विशाल स्नानागार: 4 अंक]
[मिस्र व मेसोपोटामिया की तुलना में नागरिक श्रेष्ठता: 3 अंक]`,
    examinerRubric: [
      'Citadel & Lower Town bipartite layout (4 Marks)',
      'Orthogonal gridiron streets & 4:2:1 brick ratio (4 Marks)',
      'Underground covered drainage, soak-pits & Great Bath (4 Marks)',
      'Comparative superiority over Nile & Mesopotamian cities (3 Marks)',
    ],
    learnTopicId: 't-his-102',
  },
  {
    id: 'pyq-his-nep-05',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIS-101',
    subjectNameEn: 'History: History of India from Earliest Times to 300 A.D.',
    subjectNameHi: 'इतिहास: प्राचीन भारत का इतिहास (प्रारंभ से 300 ईस्वी तक)',
    chapterEn: 'Unit 1: Sources of History & Indus Valley Civilization',
    chapterHi: 'इकाई 1: इतिहास के स्रोत एवं सिंधु घाटी सभ्यता',
    topicEn: 'Harappan Maritime Trade & Lothal Dockyard',
    topicHi: 'हड़प्पा कालीन समुद्री व्यापार एवं लोथल गोदीबाड़ा',
    questionEn: 'Examine the maritime commerce of the Harappan Civilization with special reference to the Lothal dockyard and trade links with Mesopotamia (Meluhha).',
    questionHi: 'लोथल गोदीबाड़ा (डॉकयार्ड) तथा मेसोपोटामिया (मेलुहा) के व्यापारिक संबंधों के विशेष संदर्भ में हड़प्पा सभ्यता के समुद्री व्यापार का परीक्षण कीजिए।',
    marks: 10,
    section: 'C',
    type: 'Long',
    repeatedCount: 5,
    yearsAppeared: [2021, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. LOTHAL TIDAL DOCKYARD ENGINEERING (4 MARKS):
Located in Gujarat on the Bhogavo river (Gulf of Khambhat), Lothal was the world’s earliest artificial tidal dockyard:
- A trapezoidal burnt-brick basin measuring 214 m x 36 m with a depth of 4.5 meters.
- Engineered with sluice-gate mechanisms to regulate water depth during high and low tides, allowing seafaring vessels to berth, load cargo, and exit safely.
- Adjacent to the basin was an extensive warehouse of 64 mud-brick blocks for inspecting goods, proven by discovered clay sealings (terracotta seal impressions).

2. OVERSEAS COMMERCE WITH MESOPOTAMIA (4 MARKS):
Cuneiform inscriptions of King Sargon of Akkad (~2350 BCE) celebrate merchant ships from "Dilmun" (Bahrain), "Magan" (Oman), and "Meluhha" (the Indus Valley region):
- Export Items from Meluhha: Carnelian beads, lapis lazuli, ivory objects, fine cotton textiles, copper, timber, and exotic monkeys.
- Import Items: Mesopotamian woolen textiles, perfume oils, and silver ingots.
- Archaeological Confirmations: Numerous Harappan steatite square seals depicting unicorns and bulls have been unearthed in Mesopotamian cities like Ur, Kish, and Susa. Conversely, a circular Persian Gulf seal was excavated at Lothal.

3. STANDARDIZED METROLOGY & BEAD FACTORIES (2 MARKS):
Harappans employed a binary-decimal weight system based on chert cubical weights (1, 2, 4, 8, 16, 32... where 16 ratio = 13.63 grams). Large bead-making factories at Lothal and Chanhudaro produced etched carnelian beads renowned across West Asia.`,
    solutionHi: `1. लोथल गोदीबाड़ा (डॉकयार्ड) का अभियांत्रिकी कौशल (4 अंक):
गुजरात में भोगावो नदी के तट पर स्थित लोथल विश्व का सबसे प्राचीन कृत्रिम ज्वारीय गोदीबाड़ा था:
- 214 मीटर लंबा एवं 36 मीटर चौड़ा पक्की ईंटों का विशाल जलाशय।
- इसमें ज्वार-भाटे के जलस्तर को नियंत्रित करने हेतु 'स्लुइस गेट' (प्रवेश द्वार) की व्यवस्था थी जिससे समुद्री जहाज आकर माल उतार व चढ़ा सकते थे।
- गोदीबाड़े के निकट 64 कमरों का विशाल मालगोदाम (वेयरहाउस) मिला है जहां से अनेक हड़प्पाई मुहरबंदी (सील छाप) प्राप्त हुई हैं।

2. मेसोपोटामिया (मेलुहा) के साथ विदेशी व्यापार (4 अंक):
मेसोपोटामिया के अक्कादियन शासक सारगोन (2350 ई.पू.) के अभिलेखों में दिलमुन (बहरीन), माकन (ओमान) तथा 'मेलुहा' (सिंधु क्षेत्र) के जहाजों के लंगर डालने का उल्लेख है:
- भारत से निर्यात: गोमेद (कार्निलियन) के मनके, लाजवर्द (Lapis Lazuli), हाथीदांत की वस्तुएं, सूती वस्त्र तथा कीमती लकड़ियां।
- भारत में आयात: चांदी एवं सुगंधित तेल।
- पुरातात्विक साक्ष्य: उर, किश और सूसा जैसे मेसोपोटामियाई नगरों से हड़प्पाई एकश्रृंगी मुहरें मिली हैं तथा लोथल से फारस की खाड़ी की विशिष्ट गोलाकार मुहर मिली है।

3. माप-तौल एवं मनका उद्योग (2 अंक):
हड़प्पावासी चर्ट पत्थर के 1:2:4:8:16:32 के द्विआधारी अनुपात वाले प्रामाणिक बाटों का प्रयोग करते थे। लोथल व चन्हूदड़ों के कारखानों में बने मनकों की पश्चिमी एशिया में भारी मांग थी।`,
    examinerRubric: [
      'Lothal tidal dockyard architecture and sluice gate (4 Marks)',
      'Sargon of Akkad inscriptions & Meluhha trade items (4 Marks)',
      'Seals found in Ur/Kish & binary weight metrology (2 Marks)',
    ],
    learnTopicId: 't-his-102',
  },
  {
    id: 'pyq-his-nep-06',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIS-101',
    subjectNameEn: 'History: History of India from Earliest Times to 300 A.D.',
    subjectNameHi: 'इतिहास: प्राचीन भारत का इतिहास (प्रारंभ से 300 ईस्वी तक)',
    chapterEn: 'Unit 1: Sources of History & Indus Valley Civilization',
    chapterHi: 'इकाई 1: इतिहास के स्रोत एवं सिंधु घाटी सभ्यता',
    topicEn: 'Decline of Indus Valley: Environmental vs Invasion Theories',
    topicHi: 'सिंधु सभ्यता का पतन: पर्यावरणीय बनाम आक्रमणकारी सिद्धांत',
    questionEn: 'Discuss the scientific theories regarding the decline of the Harappan Civilization. Why has Sir Mortimer Wheeler’s "Aryan Invasion" hypothesis been discarded?',
    questionHi: 'हड़प्पा सभ्यता के पतन से संबंधित वैज्ञानिक सिद्धांतों की विवेचना कीजिए। सर मॉर्टिमर व्हीलर का "आर्य आक्रमण" सिद्धांत क्यों अमान्य कर दिया गया है?',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2021, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. SCIENTIFIC ENVIRONMENTAL & HYDROLOGICAL CAUSES (3 MARKS):
Modern archaeology rejects sudden catastrophic collapse in favor of gradual de-urbanization (~1900-1700 BCE) caused by environmental degradation:
- Desiccation of River Saraswati (Ghaggar-Hakra): Satellite imagery proves tectonic uplift diverted the Sutlej to the Indus and the Yamuna to the Ganga, drying up the agricultural heartland of Kalibangan and Banawali.
- Climatic Aridity: Global paleoclimate data indicates weakening of the Indian summer monsoon, reducing agrarian surplus.
- Shifting River Courses & Recurrent Floods: Multiple silt layers at Mohenjo-Daro reveal devastating seasonal inundations.

2. DISCARDING WHEELER'S ARYAN INVASION THEORY (2 MARKS):
In 1946, Mortimer Wheeler cited 37 scattered skeletons in Mohenjo-Daro and Indra's Vedic title "Purandara" (destroyer of forts) to proclaim an Aryan massacre.
Modern physical anthropology (Kenneth Kennedy) demonstrated:
- The skeletons belong to different stratigraphic eras, showing signs of disease (anemia) and burial, not battlefield trauma.
- No weapons, horse bones, or burnt destruction horizons exist in mature Harappan layers.`,
    solutionHi: `1. वैज्ञानिक पर्यावरणीय एवं भूगर्भीय कारण (3 अंक):
आधुनिक इतिहासकार किसी आकस्मिक विनाश के स्थान पर क्रमिक वि-नगरीकरण (~1900-1700 ई.पू.) को स्वीकार करते हैं:
- घग्घर-हाकरा (सरस्वती) नदी का सूखना: उपग्रह चित्रों से सिद्ध हुआ है कि भू-गर्भीय हलचलों से सतलुज सिंधु में तथा यमुना गंगा में मुड़ गई, जिससे कालीबंगा व बनावली का उपजाऊ मैदान सूख गया।
- जलवायु परिवर्तन: मानसूनी वर्षा में कमी से कृषि उत्पादन गिरा।
- भीषण बाढ़: मोहनजोदड़ो में गाद की सात परतें मिली हैं जो सिंधु नदी की प्रलयंकारी बाढ़ों का प्रमाण हैं।

2. व्हीलर के आर्य आक्रमण सिद्धांत का खंडन (2 अंक):
1946 में मॉर्टिमर व्हीलर ने मोहनजोदड़ो में मिले 37 कंकालों तथा ऋग्वेद में इंद्र के "पुरंदर" (किलों का नाशक) उपाधि के आधार पर आर्य नरसंहार का दावा किया था।
कैनिथ कैनेडी के आधुनिक वैज्ञानिक परीक्षणों ने इसे पूरी तरह खारिज कर दिया:
- ये कंकाल अलग-अलग कालखंडों के हैं तथा युद्ध में कटने के नहीं, बल्कि कुपोषण व प्राकृतिक मृत्यु के हैं।
- हड़प्पा के किसी भी स्थल से व्यापक अग्निकांड या आक्रमण के अस्त्र-शस्त्र नहीं मिले हैं।`,
    examinerRubric: [
      'Ghaggar-Hakra desiccation & climatic aridity (3 Marks)',
      'Scientific archaeological refutation of Wheeler invasion theory (2 Marks)',
    ],
    learnTopicId: 't-his-102',
  },
  {
    id: 'pyq-his-nep-07',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIS-101',
    subjectNameEn: 'History: History of India from Earliest Times to 300 A.D.',
    subjectNameHi: 'इतिहास: प्राचीन भारत का इतिहास (प्रारंभ से 300 ईस्वी तक)',
    chapterEn: 'Unit 1: Sources of History & Indus Valley Civilization',
    chapterHi: 'इकाई 1: इतिहास के स्रोत एवं सिंधु घाटी सभ्यता',
    topicEn: 'Harappan Burnt Brick Dimension Ratio',
    topicHi: 'हड़प्पा कालीन पक्की ईंटों का प्रामाणिक अनुपात',
    questionEn: 'What was the standardized length-to-breadth-to-thickness dimensional ratio of Harappan burnt bricks?',
    questionHi: 'हड़प्पा सभ्यता में प्रयुक्त पक्की ईंटों की लंबाई, चौड़ाई एवं मोटाई का प्रामाणिक अनुपात क्या था?',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 5,
    yearsAppeared: [2022, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `The standardized dimensional ratio of Harappan burnt bricks across residential structures was precisely 4 : 2 : 1 (Length : Breadth : Thickness), commonly measuring 28 cm x 14 cm x 7 cm.`,
    solutionHi: `हड़प्पा सभ्यता में प्रयुक्त पक्की ईंटों का सर्वमान्य प्रामाणिक अनुपात 4 : 2 : 1 (लंबाई : चौड़ाई : मोटाई) था, जिसका सामान्य आकार 28 सेमी x 14 सेमी x 7 सेमी होता था।`,
    examinerRubric: [
      'Exact 4:2:1 ratio (1 Mark)',
      'Typical dimensions 28x14x7 cm (1 Mark)',
    ],
    learnTopicId: 't-his-102',
  },

  // ------------------ 3. BASIC CONCEPTS OF POLITICAL SCIENCE (SDSUV-POL-101) ------------------
  {
    id: 'pyq-pol-nep-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-POL-101',
    subjectNameEn: 'Political Science: Basic Concepts of Political Science',
    subjectNameHi: 'राजनीति विज्ञान: राजनीति विज्ञान की मूल अवधारणाएं',
    chapterEn: 'Unit 1: Nature, Scope & Approaches to Political Science',
    chapterHi: 'इकाई 1: राजनीति विज्ञान की प्रकृति, क्षेत्र एवं अध्ययन के दृष्टिकोण',
    topicEn: 'Traditional Institutionalism vs David Easton’s Behavioral Revolution',
    topicHi: 'परंपरागत संस्थागत दृष्टिकोण बनाम डेविड ईस्टन की व्यवहारवादी क्रांति',
    questionEn: 'Define Political Science. Trace its evolutionary transition from the traditional normative-institutional approach to the Behavioral Revolution led by David Easton. Detail the eight intellectual foundation stones of Behavioralism.',
    questionHi: 'राजनीति विज्ञान को परिभाषित कीजिए। परंपरागत मानकीय-संस्थागत दृष्टिकोण से डेविड ईस्टन के नेतृत्व में व्यवहारवादी क्रांति तक इसके विकास को रेखांकित कीजिए। व्यवहारवाद के आठ बौद्धिक आधारशिलाओं का सविस्तार वर्णन कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2021, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. DEFINITION & EVOLVING NATURE:
- Classical / Traditional: J.W. Garner famously formulated: "Political Science begins and ends with the State." Paul Janet defined it as the study of the foundations of the State and the principles of government.
- Modern / Empirical: Harold Lasswell and Robert Dahl shifted the focus from formal legal institutions to human behavior, power, and authority ("Politics is who gets what, when, and how").

2. TRADITIONAL APPROACH & ITS CRITIQUE:
Until World War II, political inquiry was dominated by four traditional orientations:
- Philosophical / Normative (Plato, Kant): Preoccupied with "what ought to be" rather than "what is".
- Historical (Dunning, Sabine): Chronicling chronological past treaties and doctrines.
- Legal / Institutional: Descriptive analysis of formal constitutions, parliaments, and court structures.
Critique: Static, formalistic, parochial (Western-centric), and completely unable to predict the rise of totalitarianism (Fascism/Nazism) or anticolonial revolutions.

3. THE BEHAVIORAL REVOLUTION (POST-WWII):
Spearheaded by David Easton, Harold Lasswell, and the Chicago School (Charles Merriam), Behavioralism sought to transform political science into a rigorous, empirical, value-free predictive science focused on real human voting and political behavior.

4. DAVID EASTON’S EIGHT INTELLECTUAL FOUNDATION STONES (THE CREDO):
1. Regularities: Recognizable, recurring patterns in human political behavior that can be formulated into predictive general laws.
2. Verification: All knowledge must be testable and verifiable against observed empirical data.
3. Techniques: Adoption of rigorous, sophisticated research tools (surveys, statistical regression, sample interviews).
4. Quantification: Precise mathematical measurement of political data; subjective speculation is rejected.
5. Values: Ethical evaluation and value preferences must be clearly separated from empirical scientific inquiry (Value-neutrality).
6. Systematization: Research must be systematically theory-oriented and cumulative.
7. Pure Science: Understanding and explanation must precede practical application and engineering.
8. Integration: Integrating political science with sister social sciences (Psychology, Sociology, Economics) to produce holistic behavioral insights.

5. TRANSITION TO POST-BEHAVIORALISM (1969):
In 1969, David Easton announced the "Post-Behavioral Revolution" under the motto "Credo of Relevance and Action". He conceded that over-obsession with quantitative technique had rendered political scientists blind to urgent human crises (Vietnam War, racial segregation). Post-behavioralism reunited empirical scientific rigor with moral purpose and social justice.

6. EXAMINER MARKING BREAKDOWN:
[Definitions of Political Science (Garner vs Lasswell): 3 Marks]
[Traditional normative-institutional approach & limitations: 4 Marks]
[David Easton’s 8 Behavioral Foundation Stones: 5 Marks]
[Post-Behavioralism Credo of Relevance & modern synthesis: 3 Marks]`,
    solutionHi: `1. राजनीति विज्ञान की परिभाषा:
- परंपरागत दृष्टिकोण: जे.डब्ल्यू. गार्नर के शब्दों में, "राजनीति विज्ञान का प्रारंभ और अंत राज्य के साथ होता है।"
- आधुनिक दृष्टिकोण: हेरोल्ड लासवेल एवं रॉबर्ट डाहल के अनुसार, राजनीति विज्ञान शक्ति, सत्ता, प्रभाव तथा निर्णयन प्रक्रिया का अनुभवजन्य अध्ययन है ("कौन, कब, क्या और कैसे प्राप्त करता है")।

2. परंपरागत दृष्टिकोण की विशेषताएं एवं सीमाएं:
द्वितीय विश्व युद्ध से पूर्व तक राजनीति विज्ञान दार्शनिक, मानकीय, विधिक एवं संस्थागत ढांचों तक सीमित था। यह "क्या होना चाहिए" पर बल देता था। इसकी मुख्य कमियां थीं: अत्यधिक औपचारिकता, पश्चिम-केंद्रित सोच तथा फासीवाद व उपनिवेशवाद विरोधी आंदोलनों की व्याख्या करने में असमर्थता।

3. व्यवहारवादी क्रांति का उद्भव:
द्वितीय विश्व युद्ध के पश्चात शिकागो संप्रदाय (चार्ल्स मेरियम) तथा डेविड ईस्टन के नेतृत्व में व्यवहारवाद का उदय हुआ। इसने औपचारिक संस्थाओं के स्थान पर वास्तविक मनुष्य के राजनीतिक व्यवहार को अध्ययन का केंद्र बनाया।

4. डेविड ईस्टन के व्यवहारवाद के आठ बौद्धिक आधार-स्तंभ:
1. नियमितताएं (Regularities): मानव राजनीतिक व्यवहार में सामान्य प्रवृत्तियां पाई जाती हैं, जिनके आधार पर सामान्यीकरण किए जा सकते हैं।
2. सत्यापन (Verification): एकत्रित सामग्री और निष्कर्षों की सत्यता का वैज्ञानिक परीक्षण अनिवार्य है।
3. तकनीक (Techniques): सांख्यिकी, सर्वेक्षण, प्रश्नावली जैसी कठोर वैज्ञानिक तकनीकों का प्रयोग।
4. परिमाणीकरण (Quantification): आंकड़ों का गणितीय एवं सटीक मापन।
5. मूल्य-निरपेक्षता (Value-free): वैज्ञानिक विश्लेषण को व्यक्तिगत नैतिक मूल्यों व पूर्वाग्रहों से मुक्त रखना।
6. क्रमबद्धीकरण (Systematization): शोध का सिद्धांत-उन्मुख एवं व्यवस्थित होना।
7. विशुद्ध विज्ञान (Pure Science): तात्कालिक उपयोगिता से पूर्व मौलिक वैज्ञानिक ज्ञान का संचय।
8. एकीकरण (Integration): समाजशास्त्र, मनोविज्ञान व अर्थशास्त्र के साथ अंतःविषयक समन्वय।

5. उत्तर-व्यवहारवाद का आगमन (1969):
डेविड ईस्टन ने अनुभव किया कि तकनीक की अत्यधिक सनक ने राजनीति शास्त्रियों को वियतनाम युद्ध व नागरिक अधिकारों जैसी समस्याओं के प्रति असंवेदनशील बना दिया। अतः उन्होंने "सार्थकता एवं कर्म" (Credo of Relevance and Action) का नारा देकर वैज्ञानिक पद्धति के साथ मानवीय मूल्यों का समन्वय किया।

6. परीक्षक अंक विभाजन:
[राजनीति विज्ञान की परिभाषाएं (गार्नर बनाम लासवेल): 3 अंक]
[परंपरागत दृष्टिकोण की विशेषताएं व सीमाएं: 4 अंक]
[डेविड ईस्टन के व्यवहारवाद के 8 बौद्धिक आधार-स्तंभ: 5 अंक]
[उत्तर-व्यवहारवाद एवं आधुनिक समन्वय: 3 अंक]`,
    examinerRubric: [
      'Definitions of Political Science (Garner vs Lasswell) (3 Marks)',
      'Traditional normative-institutional approach limitations (4 Marks)',
      'David Easton’s 8 Behavioral Intellectual Foundation Stones (5 Marks)',
      'Post-Behavioral Credo of Relevance & modern synthesis (3 Marks)',
    ],
    learnTopicId: 't-pol-101',
  },
  {
    id: 'pyq-pol-nep-02',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-POL-101',
    subjectNameEn: 'Political Science: Basic Concepts of Political Science',
    subjectNameHi: 'राजनीति विज्ञान: राजनीति विज्ञान की मूल अवधारणाएं',
    chapterEn: 'Unit 1: Nature, Scope & Approaches to Political Science',
    chapterHi: 'इकाई 1: राजनीति विज्ञान की प्रकृति, क्षेत्र एवं अध्ययन के दृष्टिकोण',
    topicEn: 'Post-Behavioralism: Credo of Relevance',
    topicHi: 'उत्तर-व्यवहारवाद: सार्थकता एवं कर्म का सिद्धांत',
    questionEn: 'Explain David Easton’s concept of the "Credo of Relevance" in Post-Behavioralism. How did it reconcile scientific technique with social commitment?',
    questionHi: 'उत्तर-व्यवहारवाद में डेविड ईस्टन के "सार्थकता के सिद्धांत" (Credo of Relevance) को समझाइए। इसने वैज्ञानिक तकनीक और सामाजिक सरोकार में कैसे समन्वय स्थापित किया?',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2022, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. HISTORICAL GENESIS (2 MARKS):
In his 1969 APSA presidential address, David Easton launched Post-Behavioralism as a corrective to Behavioralism's obsession with sterile quantitative methodology. During the 1960s, while Western cities burned with racial riots and the Vietnam War raged, behavioral political scientists were busy refining survey instruments rather than addressing existential human crises.

2. THE TWO TWIN PILLARS OF POST-BEHAVIORALISM (3 MARKS):
A) Substance over Technique: Easton declared: "It is better to be vague on things that really matter than to be brilliantly precise on things that do not." Solving urgent social problems must take precedence over mechanical mathematical sophistication.
B) Action and Social Commitment: Knowledge must be linked to action. Political scientists have a historical responsibility to defend human values, democracy, and freedom rather than hiding behind an illusion of value-neutrality.`,
    solutionHi: `1. ऐतिहासिक पृष्ठभूमि (2 अंक):
1969 में अमेरिकन पॉलिटिकल साइंस एसोसिएशन के अध्यक्षीय भाषण में डेविड ईस्टन ने उत्तर-व्यवहारवाद की घोषणा की। 1960 के दशक में जब अमेरिका वियतनाम युद्ध, परमाणु संकट तथा काले-गोरे के दंगों से जूझ रहा था, तब व्यवहारवादी राजनीति विज्ञानी इन संकटों के समाधान के बजाय केवल परिष्कृत सांख्यिकीय मॉडलों में व्यस्त थे।

2. उत्तर-व्यवहारवाद के दो प्रमुख सूत्र (3 अंक):
क) तकनीक से पूर्व विषय-वस्तु (Substance over Technique): ईस्टन ने कहा, "सार्थक समस्याओं पर अस्पष्ट होना, निरर्थक बातों पर अत्यधिक सटीक होने से कहीं बेहतर है।" समस्याओं की प्रासंगिकता तकनीक से अधिक महत्वपूर्ण है।
ख) कर्म एवं सामाजिक प्रतिबद्धता (Action & Value): ज्ञान को कर्म से अलग नहीं रखा जा सकता। राजनीति विज्ञानियों का नैतिक दायित्व है कि वे मूल्य-तटस्थता का ढोंग छोड़कर न्याय, लोकतंत्र एवं मानवीय स्वतंत्रता की रक्षा हेतु आगे आएं।`,
    examinerRubric: [
      'Critique of hyper-factual quantitative obsession (2 Marks)',
      'Substance over technique & Action orientation (3 Marks)',
    ],
    learnTopicId: 't-pol-101',
  },
  {
    id: 'pyq-pol-nep-03',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-POL-101',
    subjectNameEn: 'Political Science: Basic Concepts of Political Science',
    subjectNameHi: 'राजनीति विज्ञान: राजनीति विज्ञान की मूल अवधारणाएं',
    chapterEn: 'Unit 1: Nature, Scope & Approaches to Political Science',
    chapterHi: 'इकाई 1: राजनीति विज्ञान की प्रकृति, क्षेत्र एवं अध्ययन के दृष्टिकोण',
    topicEn: 'Garner’s Definition of Political Science Scope',
    topicHi: 'गार्नर द्वारा राजनीति विज्ञान के क्षेत्र की शास्त्रीय परिभाषा',
    questionEn: 'State J.W. Garner’s famous classical definition defining the scope of Political Science.',
    questionHi: 'जे.डब्ल्यू. गार्नर की राजनीति विज्ञान के क्षेत्र से संबंधित प्रसिद्ध शास्त्रीय परिभाषा लिखिए।',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 6,
    yearsAppeared: [2021, 2023, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `Prof. J.W. Garner famously formulated the traditional institutional scope of the discipline by stating: "Political Science begins and ends with the State" (Political Science and Government, 1928).`,
    solutionHi: `प्रो. जे.डब्ल्यू. गार्नर ने राजनीति विज्ञान के विषय-क्षेत्र को परिभाषित करते हुए लिखा: "राजनीति विज्ञान का प्रारंभ और अंत राज्य के साथ होता है।"`,
    examinerRubric: [
      'Exact formulation "begins and ends with the State" (1 Mark)',
      'Scholarly attribution to J.W. Garner (1 Mark)',
    ],
    learnTopicId: 't-pol-101',
  },
  {
    id: 'pyq-pol-nep-04',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 2,
    subjectCode: 'SDSUV-POL-101',
    subjectNameEn: 'Political Science: Basic Concepts of Political Science',
    subjectNameHi: 'राजनीति विज्ञान: राजनीति विज्ञान की मूल अवधारणाएं',
    chapterEn: 'Unit 2: The State: Elements & Theories of Origin',
    chapterHi: 'इकाई 2: राज्य: आवश्यक तत्व एवं उत्पत्ति के सिद्धांत',
    topicEn: 'Essential Elements of State & Evolutionary Theory',
    topicHi: 'राज्य के चार अनिवार्य तत्व एवं विकासवादी (ऐतिहासिक) सिद्धांत',
    questionEn: 'Define the State and analyze its four constituent elements. Critically examine the Evolutionary (Historical) Theory of the Origin of the State. Why does J.W. Garner declare it the only scientifically tenable doctrine?',
    questionHi: 'राज्य की परिभाषा दीजिए तथा इसके चार आवश्यक तत्वों का विश्लेषण कीजिए। राज्य की उत्पत्ति के विकासवादी (ऐतिहासिक) सिद्धांत का आलोचनात्मक परीक्षण कीजिए। गार्नर इसे एकमात्र वैज्ञानिक रूप से मान्य सिद्धांत क्यों कहते हैं?',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. COMPREHENSIVE DEFINITION OF THE STATE:
According to J.W. Garner: "The State is a community of persons, more or less numerous, permanently occupying a definite portion of territory, independent of external control, and possessing an organized government to which the great body of inhabitants render habitual obedience."

2. THE FOUR CONSTITUENT ELEMENTS:
1. Population (जनसंख्या): Human mass forming the commonwealth. While Plato fixed it at 5,040 citizens and Rousseau at 10,000, modern states range from thousands (Vatican City) to over 1.4 billion (India, China).
2. Defined Territory (निश्चित भूभाग): Demarcated land, inland waters, subsoil, and territorial airspace (12 nautical miles). Nomadism cannot form a state.
3. Government (सरकार): The institutional agency through which the common will of the state is formulated, expressed, and executed (Legislature, Executive, Judiciary).
4. Sovereignty (संप्रभुता): The paramount, supreme, distinguishing characteristic:
   - Internal Sovereignty: Unchallenged legal supremacy over all domestic persons and associations.
   - External Sovereignty: Complete independence from foreign subjugation and treaty imposition.

3. EVOLUTIONARY (HISTORICAL) THEORY OF ORIGIN:
This theory refutes unscientific speculative myths:
- Divine Origin Theory (State created by God, King is God's vicar on earth—e.g., Robert Filmer) is rejected as theological dogma.
- Force Theory (State born of aggression and conquest—e.g., Oppenheimer, Gumplowicz) is incomplete because brute force cannot sustain permanent obedience.
- Social Contract Theory (State formed by a sudden contractual convention in a state of nature—Hobbes, Locke, Rousseau) is historically fictitious.

4. FIVE DYNAMIC CATALYSTS OF STATE EVOLUTION:
1. Kinship (रक्त संबंध): The earliest organizing bond. MacIver’s immortal dictum establishes: "Kinship creates society, and society at length creates the state." Patriarchal and matriarchal families consolidated into clans, tribes, and phratries under ancestral elder authority.
2. Religion (धर्म): Shared worship and totemism sanctified common law. The tribal chieftain was simultaneously high priest, transforming secular obedience into divine duty.
3. Force (युद्ध व शक्ति): Military conflict for fertile agricultural river basins demanded centralized command, disciplined armies, and demarcated borders.
4. Economic Needs & Private Property (आर्थिक गतिविधियां): Transition from nomadic pastoralism to sedentary agriculture necessitated legal contracts, inheritance rights, weights/measures, and courts to resolve property disputes.
5. Political Consciousness (राजनीतिक चेतना): Growing awareness of common collective security against external danger and the psychological necessity of order solidified the formal structure of the State.

5. WHY GARNER ACCLAIMS IT AS THE ONLY SCIENTIFIC DOCTRINE:
Garner observed: "The state is neither the handiwork of God, nor the result of superior physical force, nor the creation of compact, nor a mere expansion of family... It is an institution of natural growth, an historical evolution." The Evolutionary theory synthesizes historical anthropology, sociological jurisprudence, and political philosophy into an empirical whole.

6. EXAMINER MARKING BREAKDOWN:
[Garner definition & 4 elements (Population, Territory, Govt, Sovereignty): 4 Marks]
[Critique and refutation of Divine, Force, and Contract theories: 3 Marks]
[Five Catalytic Factors of Historical Evolution: 5 Marks]
[MacIver and Garner quotes & scientific validation: 3 Marks]`,
    solutionHi: `1. राज्य की प्रामाणिक परिभाषा:
प्रो. जे.डब्ल्यू. गार्नर के अनुसार: "राज्य बड़ी या छोटी संख्या में ऐसे मानव समुदाय का नाम है जो एक निश्चित भूभाग पर स्थायी रूप से रहता हो, बाह्य नियंत्रण से पूरी तरह स्वतंत्र हो और जिसकी एक संगठित सरकार हो, जिसकी आज्ञा का पालन अधिकांश जनता स्वभावतः करती हो।"

2. राज्य के चार अनिवार्य तत्व:
1. जनसंख्या: नागरिकों के बिना राज्य संभव नहीं। प्लेटो ने 5040 तथा रूसो ने 10,000 की संख्या सुझाई, किंतु आधुनिक काल में यह लाखों से लेकर 140 करोड़ (भारत) तक विस्तृत है।
2. निश्चित भूभाग: निश्चित भौगोलिक सीमा, नदियां, खनिज तथा 12 समुद्री मील तक का वायु व जल क्षेत्र। घुमंतू कबीले राज्य नहीं बना सकते।
3. सरकार: वह कार्यकारी संस्था जिसके माध्यम से राज्य की इच्छा का निर्माण, अभिव्यक्ति और क्रियान्वयन होता है।
4. संप्रभुता (Sovereignty): राज्य का सबसे महत्वपूर्ण प्राण-तत्व, जो इसे अन्य समुदायों से अलग करता है:
   - आंतरिक संप्रभुता: राज्य की सीमाओं के भीतर सभी व्यक्तियों और संगठनों पर सर्वोच्च विधिक सत्ता।
   - बाह्य संप्रभुता: विदेशी शक्तियों के नियंत्रण से पूर्ण स्वतंत्रता।

3. विकासवादी (ऐतिहासिक) सिद्धांत का महत्व:
यह सिद्धांत पूर्ववर्ती काल्पनिक सिद्धांतों का खंडन करता है:
- दैवीय सिद्धांत (ईश्वर द्वारा निर्मित): अवैज्ञानिक एवं निरंकुशता को बढ़ावा देने वाला।
- शक्ति सिद्धांत (लाठी जिसकी भैंस उसकी): शक्ति राज्य का आधार नहीं हो सकती, क्योंकि ग्रीन के अनुसार "इच्छा ही राज्य का आधार है, शक्ति नहीं।"
- सामाजिक समझौते का सिद्धांत (हॉब्स, लॉक, रूसो): ऐतिहासिक साक्ष्यों के अभाव में एक काल्पनिक कथा मात्र।

4. राज्य के ऐतिहासिक विकास के पांच सहायक तत्व:
1. रक्त संबंध: मैकाइवर का प्रसिद्ध कथन है, "रक्त संबंध समाज को जन्म देता है और कालांतर में समाज राज्य को जन्म देता है।"
2. धर्म: प्राचीन काल में धर्म ने लोगों को एकता के सूत्र में बांधा; राजा और पुरोहित का पद एक ही व्यक्ति में निहित था।
3. शक्ति एवं युद्ध: सीमाओं की सुरक्षा तथा विस्तार हेतु स्थायी सेना और राजा का पद सुदृढ़ हुआ।
4. आर्थिक आवश्यकताएं व निजी संपत्ति: कृषि और व्यापार के विकास ने संपत्ति की रक्षा हेतु कानून और दंड व्यवस्था को अनिवार्य बनाया।
5. राजनीतिक चेतना: बाह्य आक्रमणों से सुरक्षा और शांति व्यवस्था की आवश्यकता ने संगठित राज्य को जन्म दिया।

5. गार्नर का निष्कर्ष:
गार्नर ने लिखा: "राज्य न तो ईश्वर की सृष्टि है, न पाशविक शक्ति का परिणाम, न किसी समझौते की उपज और न ही केवल परिवार का विस्तार। यह एक ऐतिहासिक विकास का निरंतर परिणाम है।"

6. परीक्षक अंक विभाजन:
[राज्य की परिभाषा एवं 4 अनिवार्य तत्वों का विश्लेषण: 4 अंक]
[दैवीय, शक्ति व समझौता सिद्धांतों की तार्किक आलोचना: 3 अंक]
[विकास के 5 प्रेरक तत्व (रक्त संबंध, धर्म, शक्ति, अर्थ, चेतना): 5 अंक]
[मैकाइवर व गार्नर के कथन एवं वैज्ञानिक निष्कर्ष: 3 अंक]`,
    examinerRubric: [
      'Garner definition & 4 elements analysis (4 Marks)',
      'Refutation of Divine, Force, and Social Contract myths (3 Marks)',
      'Five dynamic catalysts of Historical Evolution (5 Marks)',
      'MacIver & Garner synthesis on scientific tenability (3 Marks)',
    ],
    learnTopicId: 't-pol-102',
  },
  {
    id: 'pyq-pol-nep-05',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 2,
    subjectCode: 'SDSUV-POL-101',
    subjectNameEn: 'Political Science: Basic Concepts of Political Science',
    subjectNameHi: 'राजनीति विज्ञान: राजनीति विज्ञान की मूल अवधारणाएं',
    chapterEn: 'Unit 2: The State: Elements & Theories of Origin',
    chapterHi: 'इकाई 2: राज्य: आवश्यक तत्व एवं उत्पत्ति के सिद्धांत',
    topicEn: 'Social Contract: Hobbes vs Locke vs Rousseau',
    topicHi: 'सामाजिक समझौता सिद्धांत: हॉब्स, लॉक एवं रूसो का तुलनात्मक विश्लेषण',
    questionEn: 'Critically compare the Social Contract theories of Thomas Hobbes, John Locke, and J.J. Rousseau regarding the State of Nature, Human Nature, and the Nature of Sovereign Authority.',
    questionHi: 'प्राकृतिक अवस्था, मानव स्वभाव तथा संप्रभुता के स्वरूप के संदर्भ में थॉमस हॉब्स, जॉन लॉक तथा जे.जे. रूसो के सामाजिक समझौता सिद्धांतों की तुलना कीजिए।',
    marks: 10,
    section: 'C',
    type: 'Long',
    repeatedCount: 5,
    yearsAppeared: [2021, 2022, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. COMPARATIVE MATRIX (HOBBES VS LOCKE VS ROUSSEAU) (7 MARKS):

A) THOMAS HOBBES (Leviathan, 1651):
- Human Nature: Selfish, solitary, fearful, egoistic, guided by appetite.
- State of Nature: "Nasty, brutish, and short"; constant war of every man against every man.
- Social Contract: Single irrevocable covenant where all individuals surrender all natural rights (except self-preservation) to an absolute ruler.
- Sovereign Authority: Absolute, indivisible, unchallengeable Monarch (Leviathan).

B) JOHN LOCKE (Two Treatises of Government, 1689):
- Human Nature: Rational, moral, cooperative, social.
- State of Nature: State of peace, goodwill, and mutual assistance governed by the Law of Nature; marred only by lack of an impartial judge.
- Social Contract: Two contracts—first to form Civil Society, second to establish Government as a fiduciary trust. Natural rights to Life, Liberty, and Property are inalienable.
- Sovereign Authority: Limited, constitutional government accountable to the people; right to revolution if the trust is breached.

C) J.J. ROUSSEAU (The Social Contract, 1762):
- Human Nature: Noble Savage, innocent, sympathetic, guided by Amour de soi.
- State of Nature: Idyllic paradise ruined by the advent of private property ("This is mine").
- Social Contract: Each citizen surrenders their individual private will to the collective moral community.
- Sovereign Authority: Popular Sovereignty embodied in the infallible "General Will" (Volonté Générale); direct participatory democracy.

2. CRITICAL HISTORICAL RELEVANCE (3 MARKS):
- Hobbes laid the foundation of modern legal sovereignty (Austin).
- Locke became the father of classical liberalism and constitutional democracy (US Constitution).
- Rousseau fathered radical popular democracy and community sovereignty.`,
    solutionHi: `1. तुलनात्मक विश्लेषण (हॉब्स, लॉक, रूसो) (7 अंक):

क) थॉमस हॉब्स (लेविआथन, 1651):
- मानव स्वभाव: स्वार्थी, भयभीत, अहंकारी और आक्रामक।
- प्राकृतिक अवस्था: "एकाकी, निर्धन, घृणित, पाशविक और अल्पायु"; प्रत्येक का प्रत्येक के विरुद्ध निरंतर युद्ध।
- समझौता: एकतरफा एवं अपरिवर्तनीय; सभी ने आत्म-रक्षा के अतिरिक्त अपने सारे अधिकार संप्रभु को सौंप दिए।
- संप्रभुता का स्वरूप: निरंकुश राजतंत्र (लेविआथन), जो समझौते से परे और कानून से ऊपर है।

ख) जॉन लॉक (शासन पर दो निबंध, 1689):
- मानव स्वभाव: विवेकशील, नैतिक और शांतिप्रिय।
- प्राकृतिक अवस्था: शांति, सद्भाव और प्राकृतिक अधिकारों (जीवन, स्वतंत्रता, संपत्ति) से युक्त; केवल निष्पक्ष न्यायाधीश की कमी।
- समझौता: दो समझौते—पहला नागरिक समाज निर्माण हेतु, दूसरा सीमित सरकार की स्थापना हेतु (ट्रस्ट के रूप में)।
- संप्रभुता का स्वरूप: सीमित व संवैधानिक सरकार; जनता को विद्रोह और सरकार बदलने का अधिकार।

ग) जे.जे. रूसो (सामाजिक संविदा, 1762):
- मानव स्वभाव: निष्पाप एवं उदात्त वनचर (Noble Savage)।
- प्राकृतिक अवस्था: स्वर्ण युग, जो निजी संपत्ति के उदय ("यह मेरा है") से नष्ट हुआ।
- समझौता: प्रत्येक व्यक्ति अपने अधिकारों को संपूर्ण समाज को समर्पित करता है।
- संप्रभुता का स्वरूप: "सामान्य इच्छा" (General Will) में निहित प्रत्यक्ष लोकप्रिय संप्रभुता।

2. ऐतिहासिक महत्व (3 अंक):
- हॉब्स ने विधिक संप्रभुता की नींव रखी।
- लॉक आधुनिक उदारवादी लोकतंत्र एवं मानवाधिकारों के जनक बने।
- रूसो ने प्रत्यक्ष जनतंत्र एवं सामूहिकता का मार्ग प्रशस्त किया।`,
    examinerRubric: [
      'Comparative breakdown of Human Nature & State of Nature (4 Marks)',
      'Nature of Contract & Sovereign Type (Absolute vs Limited vs General Will) (4 Marks)',
      'Modern constitutional & democratic implications (2 Marks)',
    ],
    learnTopicId: 't-pol-102',
  },
  {
    id: 'pyq-pol-nep-06',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 3,
    subjectCode: 'SDSUV-POL-101',
    subjectNameEn: 'Political Science: Basic Concepts of Political Science',
    subjectNameHi: 'राजनीति विज्ञान: राजनीति विज्ञान की मूल अवधारणाएं',
    chapterEn: 'Unit 3: Sovereignty, Law & Justice',
    chapterHi: 'इकाई 3: संप्रभुता, कानून एवं न्याय',
    topicEn: 'Austin’s Monistic Sovereignty vs Pluralist Critique (Laski)',
    topicHi: 'ऑस्टिन का एकलवादी संप्रभुता सिद्धांत बनाम बहुलवादी आलोचना (लास्की)',
    questionEn: 'Critically examine John Austin’s Monistic Theory of Sovereignty (The Province of Jurisprudence Determined, 1832). Detail the Pluralist assault led by Harold Laski and R.M. MacIver.',
    questionHi: 'जॉन ऑस्टिन के संप्रभुता के एकलवादी सिद्धांत (1832) का आलोचनात्मक परीक्षण कीजिए। हेरोल्ड लास्की एवं मैकाइवर के नेतृत्व में बहुलवादी विचारकों द्वारा प्रस्तुत आक्षेपों की विवेचना कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. JOHN AUSTIN’S MONISTIC JURISPRUDENCE (1832):
Influenced by Thomas Hobbes and Jeremy Bentham, English jurist John Austin defined legal sovereignty:
"If a determinate human superior, not in a habit of obedience to a like superior, receives habitual obedience from the bulk of a given society, that determinate superior is sovereign in that society, and the society (including the superior) is a society political and independent."

2. FOUR ESSENTIAL ATTRIBUTES OF AUSTINIAN SOVEREIGNTY:
1. Determinate Superior: Sovereignty must reside in a clearly identifiable person or body of persons (e.g., King-in-Parliament), not in vague abstractions like General Will or Public Opinion.
2. Law is Sovereign Command: Law is the command of the sovereign backed by the threat of coercive sanction (physical punishment).
3. Unlimited & Absolute: There are no legal limits to sovereign authority. Constitutional conventions and customs are merely "positive morality", not law.
4. Indivisibility: Sovereignty is an indivisible totality. Calhoun famously declared: "Sovereignty is an entire thing—to divide it is to destroy it."

3. THE PLURALIST ASSAULT (HAROLD LASKI, R.M. MacIVER, LÉON DUGUIT):
During the early 20th century, Pluralists attacked Austin’s legal absolutism on sociological, historical, and moral grounds:
1. Society is Federal, Not Monolithic: Laski proclaimed in "A Grammar of Politics": "Because society is federal, authority must also be federal." Society consists of numerous autonomous voluntary associations (family, trade unions, universities, churches) that fulfill vital human needs independent of the state.
2. State is Primus Inter Pares (First Among Equals): The State is merely an association among associations. It cannot claim a monopoly over human allegiance.
3. Law is Anterior and Superior to the State: Léon Duguit and Hugo Krabbe demonstrated that customary law, moral conventions, and religious norms existed centuries before the formal State emerged. The State merely codifies law; it does not invent it.
4. Austin’s Model Fails in Federal Constitutions: In federal states like the USA and India, power is constitutionally divided between center and provinces and subject to judicial review. No single "determinate human superior" exists.
5. International Law Limitations: The interdependence of modern nations renders absolute internal sovereignty a perilous fiction.

4. CRITICAL SYNTHESIS:
While Austin accurately described formal legal supremacy in a unitary courtroom, Pluralism restored sociological realism by showing that political power is dispersed across civil society.

5. EXAMINER MARKING BREAKDOWN:
[Austin definition & four attributes (Determinate, Command, Absolute, Indivisible): 5 Marks]
[Pluralist core arguments (Federal society, Primus inter pares, Law anterior): 5 Marks]
[Laski quote & constitutional/international law limitations: 3 Marks]
[Critical evaluation and synthesis: 2 Marks]`,
    solutionHi: `1. जॉन ऑस्टिन का एकलवादी सिद्धांत (1832):
अंग्रेज विधिवेत्ता जॉन ऑस्टिन ने अपनी पुस्तक 'द प्रोविंस ऑफ ज्यूरिसप्रूडेंस डिटरमिन्ड' में लिखा:
"यदि कोई निश्चित मानव श्रेष्ठ, जो किसी अन्य श्रेष्ठ की आज्ञा पालन का अभ्यस्त न हो, किसी समाज के अधिकांश भाग से स्वभावतः आज्ञा पालन प्राप्त करता है, तो वह निश्चित मानव उस समाज में संप्रभु है, और वह समाज एक राजनीतिक एवं स्वतंत्र समाज है।"

2. ऑस्टिन के संप्रभुता के चार मूल लक्षण:
1. निश्चित सत्ता: संप्रभु कोई अमूर्त भावना (जनता की इच्छा) नहीं, बल्कि एक निश्चित व्यक्ति या संस्था (ब्रिटिश संसद) होना चाहिए।
2. कानून संप्रभु का आदेश है: कानून संप्रभु का वह आदेश है जिसके पीछे बाध्यकारी दंड-शक्ति होती है।
3. असीमित एवं निरंकुश: संप्रभुता पर कोई विधिक सीमाएं नहीं लगाई जा सकतीं।
4. अविभाज्यता: संप्रभुता को बांटा नहीं जा सकता। कैलहून के अनुसार, "संप्रभुता एक पूर्ण वस्तु है—इसे विभाजित करना इसे नष्ट करना है।"

3. बहुलवादी आक्षेप (हेरोल्ड लास्की एवं मैकाइवर):
20वीं सदी के प्रारंभ में बहुलवादियों ने एकलवादी निरंकुशता का तीव्र विरोध किया:
1. समाज संघात्मक है: लास्की ने कहा, "चूंकि समाज का ढांचा संघात्मक है, अतः सत्ता का स्वरूप भी संघात्मक होना चाहिए।" समाज में परिवार, चर्च, मजदूर संघ जैसे अनेक समुदाय स्वायत्त रूप से कार्य करते हैं।
2. राज्य समुदायों में केवल एक समुदाय है: राज्य को मनुष्य की निष्ठा पर एकाधिकार प्राप्त नहीं हो सकता। वह केवल समुदायों में प्रथम (Primus inter pares) है।
3. कानून राज्य से पूर्ववर्ती व श्रेष्ठ है: डिग्वीट ने सिद्ध किया कि रीति-रिवाज एवं सामाजिक नियम राज्य के जन्म से सदियों पूर्व से अस्तित्व में हैं। राज्य कानून बनाता नहीं, केवल मान्य करता है।
4. संघात्मक संविधानों में विफलता: भारत और अमेरिका जैसे संघात्मक देशों में सत्ता केंद्र और राज्यों में बंटी है तथा संविधान सर्वोच्च है, जहां कोई अकेला ऑस्टिनियन श्रेष्ठ नहीं मिलता।
5. अंतरराष्ट्रीय विधि: वैश्वीकरण और अंतरराष्ट्रीय संधियों ने संप्रभुता को सीमित कर दिया है।

4. निष्कर्ष:
विधिक दृष्टि से ऑस्टिन की संप्रभुता न्यायालयों में भले लागू हो, किंतु व्यावहारिक व राजनीतिक दृष्टि से बहुलवादियों का विकेंद्रीकृत दृष्टिकोण अधिक लोकतांत्रिक एवं यथार्थवादी है।

5. परीक्षक अंक विभाजन:
[ऑस्टिन की परिभाषा एवं 4 मूल लक्षण (निश्चित श्रेष्ठ, आदेश, असीमित, अविभाज्य): 5 अंक]
[बहुलवादी तर्क (संघात्मक समाज, समुदायों की स्वायत्तता, पूर्ववर्ती कानून): 5 अंक]
[लास्की का कथन, संविधानवाद एवं अंतरराष्ट्रीय सीमाएं: 3 अंक]
[संतुलित आलोचनात्मक निष्कर्ष: 2 अंक]`,
    examinerRubric: [
      'Austin definition and four essential attributes (5 Marks)',
      'Pluralist sociological critique of state monopoly (5 Marks)',
      'Laski federal axiom and constitutional/international limits (3 Marks)',
      'Critical synthesis of legal monism vs political pluralism (2 Marks)',
    ],
    learnTopicId: 't-pol-103',
  },
  {
    id: 'pyq-pol-nep-07',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 3,
    subjectCode: 'SDSUV-POL-101',
    subjectNameEn: 'Political Science: Basic Concepts of Political Science',
    subjectNameHi: 'राजनीति विज्ञान: राजनीति विज्ञान की मूल अवधारणाएं',
    chapterEn: 'Unit 3: Sovereignty, Law & Justice',
    chapterHi: 'इकाई 3: संप्रभुता, कानून एवं न्याय',
    topicEn: 'Harold Laski Axiom on Federal Society',
    topicHi: 'हेरोल्ड लास्की का संघात्मक समाज सूत्र',
    questionEn: 'Who authored "A Grammar of Politics" (1925) and declared the axiom: "Because society is federal, authority must also be federal"?',
    questionHi: '"अ ग्रामर ऑफ पॉलिटिक्स" (1925) के लेखक कौन हैं और किसने यह सिद्धांत दिया कि "चूंकि समाज का स्वरूप संघात्मक है, इसलिए सत्ता भी संघात्मक होनी चाहिए"?',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 6,
    yearsAppeared: [2021, 2023, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `Prof. Harold J. Laski, the preeminent British political theorist, authored "A Grammar of Politics" (1925) and propounded this famous Pluralist thesis against absolute state monism.`,
    solutionHi: `ब्रिटिश राजनीतिक दार्शनिक प्रो. हेरोल्ड जे. लास्की ने 'अ ग्रामर ऑफ पॉलिटिक्स' (1925) में राज्य की एकलवादी निरंकुशता के विरुद्ध यह सुप्रसिद्ध बहुलवादी सूत्र प्रतिपादित किया।`,
    examinerRubric: [
      'Author Harold J. Laski (1 Mark)',
      'Pluralist federal axiom & year 1925 (1 Mark)',
    ],
    learnTopicId: 't-pol-103',
  },

  // ------------------ 4. INTRODUCTORY SOCIOLOGY (SDSUV-SOC-101) ------------------
  {
    id: 'pyq-soc-nep-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-SOC-101',
    subjectNameEn: 'Sociology: Introduction to Sociology (Structure & Processes)',
    subjectNameHi: 'समाजशास्त्र: समाजशास्त्र का परिचय (सामाजिक संरचना एवं प्रक्रियाएं)',
    chapterEn: 'Unit 1: Discipline of Sociology, Nature & Basic Concepts',
    chapterHi: 'इकाई 1: समाजशास्त्र का उद्भव, प्रकृति एवं मूल अवधारणाएं',
    topicEn: 'Emergence of Sociology & Formalistic vs Synthetic Schools',
    topicHi: 'समाजशास्त्र का उद्भव एवं स्वरूपात्मक बनाम समन्वयात्मक संप्रदाय',
    questionEn: 'Trace the intellectual and socio-historical conditions in 19th-century Europe that gave birth to Sociology. Critically examine the debate between the Formalistic School and the Synthetic School regarding its scope.',
    questionHi: '19वीं शताब्दी के यूरोप की उन बौद्धिक एवं सामाजिक-ऐतिहासिक परिस्थितियों का विवरण दीजिए जिन्होंने समाजशास्त्र को जन्म दिया। इसके विषय-क्षेत्र के संदर्भ में स्वरूपात्मक संप्रदाय एवं समन्वयात्मक संप्रदाय के विवाद की विवेचना कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. HISTORICAL GENESIS: THE TWIN REVOLUTIONS & ENLIGHTENMENT:
Sociology was formally christened by French philosopher Auguste Comte in 1838 in his "Cours de Philosophie Positive". It arose in response to the convulsive trauma of two great revolutions:
- The French Revolution (1789): Smashed the feudal divine-right monarchy and Catholic moral authority, creating chaotic social breakdown and moral anomie.
- The Industrial Revolution (Late 18th/19th c.): Ushered in steam factory industrialization, unprecedented urban squalor, wage slavery, slums, and disintegration of the traditional joint family.
Comte sought to formulate a new "Positive Science of Society" (Social Physics) to discover the universal laws governing social order (Social Statics) and social progress (Social Dynamics).

2. THE SCOPE DEBATE: TWO CONTENDING SCHOOLS:
Sociologists divided sharply over whether Sociology should be an autonomous specialized science or an encyclopedic synthesizing discipline.

A) THE FORMALISTIC / SPECIALISTIC SCHOOL (स्वरूपात्मक संप्रदाय):
- Champions: Georg Simmel (Leader), Ferdinand Tönnies, Max Weber, Leopold von Wiese, Alfred Vierkandt.
- Core Tenet: Sociology is a pure, independent, specialized social science.
- Geometry Analogy (Simmel): Just as geometry studies the abstract forms of physical figures (triangles, circles) regardless of what material fills them, Sociology studies the abstract "forms of sociation" (cooperation, competition, subordination, conflict) regardless of the content (political, religious, or economic).
- Weber's Social Action: Max Weber defined Sociology as the science which attempts the interpretive understanding (Verstehen) of social action.

B) THE SYNTHETIC / GENERAL SCHOOL (समन्वयात्मक संप्रदाय):
- Champions: Émile Durkheim (Leader), Pitirim Sorokin, L.T. Hobhouse, Morris Ginsberg.
- Core Tenet: Society is an integrated organic whole; social phenomena are intrinsically interrelated and cannot be studied in isolated departmentalized abstractions.
- Durkheim's Three Divisions:
  1. Social Morphology (population, territorial distribution).
  2. Social Physiology (religion, law, morals, language).
  3. General Sociology (discovery of general collective social laws).
- Sorokin's Formula: If Economics studies a+b+c, Politics studies a+b+d, and Religion studies a+b+e, Sociology studies the common denominator 'a+b' and their systemic mutual interrelations.

3. SCIENTIFIC SYNTHESIS:
Modern sociology harmonizes both schools: it develops precise analytical concepts (formal tools) while applying them to understand complex, interrelated social systems in their structural totality.

4. EXAMINER MARKING BREAKDOWN:
[Historical context: French Revolution & Industrial Revolution: 4 Marks]
[Auguste Comte Positivism & Law of Three Stages: 3 Marks]
[Formalistic School (Simmel geometric forms of association): 4 Marks]
[Synthetic School (Durkheim social facts & Sorokin formula): 4 Marks]`,
    solutionHi: `1. समाजशास्त्र का ऐतिहासिक उद्भव:
फ्रांसीसी दार्शनिक अगस्त कॉम्ट ने 1838 में अपनी पुस्तक 'पॉजिटिव फिलॉसफी' में सर्वप्रथम 'समाजशास्त्र' (Sociology) शब्द की रचना की। इसका जन्म यूरोप की दो युगांतरकारी क्रांतियों के गर्भ से हुआ:
- फ्रांसीसी क्रांति (1789): इसने सामंतवाद और चर्च की सत्ता को समाप्त कर समाज में स्वतंत्रता, समानता व बंधुत्व के विचार दिए, किंतु साथ ही सामाजिक अव्यवस्था व नैतिक शून्यता भी उत्पन्न की।
- औद्योगिक क्रांति: वाष्प शक्ति और कारखानों ने नगरीकरण, मलिन बस्तियों, बाल श्रम, संयुक्त परिवारों के विघटन तथा पूंजीवादी शोषण को जन्म दिया।
कॉम्ट ने समाज को व्यवस्थित करने हेतु एक नवीन विज्ञान (सामाजिक भौतिकी) की आवश्यकता महसूस की जो सामाजिक व्यवस्था (Social Statics) तथा सामाजिक प्रगति (Social Dynamics) के सार्वभौमिक नियमों की खोज कर सके।

2. विषय-क्षेत्र संबंधी दो प्रमुख संप्रदाय:

क) स्वरूपात्मक संप्रदाय (Formalistic School):
- प्रमुख समर्थक: जॉर्ज सिमेल, मैक्स वेबर, फर्डिनेंड टोनीज, वीरकांत।
- मूल मान्यता: समाजशास्त्र एक स्वतंत्र, विशिष्ट और शुद्ध विज्ञान है।
- रेखागणित का उदाहरण (सिमेल): जिस प्रकार रेखागणित भौतिक वस्तुओं के गुणों की उपेक्षा कर केवल उनके अमूर्त 'स्वरूपों' (त्रिभुज, वृत्त) का अध्ययन करता है, उसी प्रकार समाजशास्त्र को सामाजिक संबंधों के अंतरवस्तु (Content) से अलग केवल उनके 'स्वरूपों' (सहयोग, संघर्ष, प्रभुत्व, विनिमय) का अध्ययन करना चाहिए।
- मैक्स वेबर ने इसे सामाजिक क्रियाओं के अर्थपूर्ण बोध (Verstehen) का विज्ञान माना।

ख) समन्वयात्मक संप्रदाय (Synthetic School):
- प्रमुख समर्थक: एमिल दुर्खीम, पितिरिम सोरोकिन, एल.टी. हॉबहाउस, मॉरिस गिन्सबर्ग।
- मूल मान्यता: समाज एक समग्र सावयव व्यवस्था है। इसके अंगों को एक-दूसरे से काटकर नहीं देखा जा सकता। समाजशास्त्र सभी सामाजिक विज्ञानों का समन्वयकर्ता सामान्य विज्ञान है।
- दुर्खीम ने इसे तीन भागों में बांटा: सामाजिक आकारिकी (जनसंख्या व भूगोल), सामाजिक शरीरशास्त्र (धर्म, विधि, नैतिकता) तथा सामान्य समाजशास्त्र (सामूहिक चेतना के नियम)।
- सोरोकिन का सूत्र: यदि अर्थशास्त्र a+b+c का अध्ययन करता है और राजनीति विज्ञान a+b+d का, तो समाजशास्त्र उन सभी में उभयनिष्ठ सामाजिक तत्व 'a+b' का अध्ययन करता है।

3. संतुलित निष्कर्ष:
आधुनिक समाजशास्त्र में दोनों संप्रदायों का समन्वय है। यह सामाजिक संबंधों के विशिष्ट स्वरूपों का विश्लेषण भी करता है और समाज का एक समग्र व्यवस्था के रूप में व्यापक अध्ययन भी प्रस्तुत करता है।

4. परीक्षक अंक विभाजन:
[ऐतिहासिक पृष्ठभूमि: फ्रांसीसी व औद्योगिक क्रांतियां: 4 अंक]
[अगस्त कॉम्ट का प्रत्यक्षवाद व उद्भव: 3 अंक]
[स्वरूपात्मक संप्रदाय (जॉर्ज सिमेल का रेखागणितीय मॉडल): 4 अंक]
[समन्वयात्मक संप्रदाय (दुर्खीम के सामाजिक तथ्य व सोरोकिन सूत्र): 4 अंक]`,
    examinerRubric: [
      'Twin Revolutions (French & Industrial) as socioeconomic catalysts (4 Marks)',
      'Auguste Comte positivism and social physics inception (3 Marks)',
      'Formalistic School (Simmel forms of sociation & Weber) (4 Marks)',
      'Synthetic School (Durkheim social morphology & Sorokin commonalities) (4 Marks)',
    ],
    learnTopicId: 't-soc-101',
  },
  {
    id: 'pyq-soc-nep-02',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-SOC-101',
    subjectNameEn: 'Sociology: Introduction to Sociology (Structure & Processes)',
    subjectNameHi: 'समाजशास्त्र: समाजशास्त्र का परिचय (सामाजिक संरचना एवं प्रक्रियाएं)',
    chapterEn: 'Unit 1: Discipline of Sociology, Nature & Basic Concepts',
    chapterHi: 'इकाई 1: समाजशास्त्र का उद्भव, प्रकृति एवं मूल अवधारणाएं',
    topicEn: 'Community vs Association & The Nature of Institutions',
    topicHi: 'समुदाय बनाम समिति एवं संस्थाओं का समाजशास्त्रीय स्वरूप',
    questionEn: 'Differentiate between Community and Association across five structural criteria. Explain MacIver and Page’s dictum: "We belong to associations, but not to institutions."',
    questionHi: 'पांच संरचनात्मक आधारों पर समुदाय एवं समिति में अंतर स्पष्ट कीजिए। मैकाइवर एवं पेज के इस कथन की व्याख्या कीजिए: "हम समितियों के सदस्य होते हैं, संस्थाओं के नहीं।"',
    marks: 10,
    section: 'C',
    type: 'Long',
    repeatedCount: 5,
    yearsAppeared: [2021, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. FIVE STRUCTURAL CONTRASTS (COMMUNITY VS ASSOCIATION) (6 MARKS):
A) Locality: A Community is anchored to a definite geographical territory (e.g., a hill village in Garhwal, a tribal settlement). An Association lacks compulsory territorial boundaries (e.g., Indian Sociological Society, Red Cross).
B) Origin: Community evolves spontaneously and naturally over generations. Association is deliberately and artificially created by humans for a specific objective.
C) Scope of Life: Community encompasses the totality of human life (economic, emotional, cultural). Association is partial, organized to fulfill narrow specific interests (e.g., Trade Union for wages).
D) Membership: Community membership is compulsory and by birth. Association membership is voluntary; one may join or resign at will.
E) Rules: Community is governed by informal mores, folkways, and customary conventions. Association is regulated by written, formal, contractual constitutions.

2. MacIVER & PAGE DICTUM: "WE BELONG TO ASSOCIATIONS, NOT INSTITUTIONS" (4 MARKS):
- Association represents an organized concrete group of human beings (e.g., a College, a Family, a Hospital, a Political Party). Because associations consist of living persons, we can hold membership in them.
- Institution represents the recognized, established procedures, customs, and working rules of an association (e.g., Examination system, Marriage, Curfew, Ballot voting).
- Conclusion: We belong to the College (Association); we do not belong to the Examination System (Institution)—we merely observe its established procedures.`,
    solutionHi: `1. समुदाय एवं समिति में 5 संरचनात्मक अंतर (6 अंक):
क) निश्चित भूभाग: समुदाय हेतु निश्चित भौगोलिक क्षेत्र अनिवार्य है (जैसे: टिहरी का एक गांव)। समिति का कोई निश्चित भूभाग नहीं होता (जैसे: रेड क्रॉस सोसाइटी)।
ख) उत्पत्ति: समुदाय का विकास स्वतः एवं स्वाभाविक रूप से होता है। समिति की स्थापना जानबूझकर किसी विशिष्ट उद्देश्य की पूर्ति हेतु की जाती है।
ग) उद्देश्य का विस्तार: समुदाय व्यक्ति के संपूर्ण जीवन को समेटता है (आर्थिक, सामाजिक, भावनात्मक)। समिति किसी एक या सीमित उद्देश्य हेतु बनती है (जैसे: मजदूर संघ)।
घ) सदस्यता: समुदाय की सदस्यता जन्मजात और अनिवार्य होती है। समिति की सदस्यता ऐच्छिक होती है; व्यक्ति जब चाहे त्यागपत्र दे सकता है।
ङ) नियम: समुदाय में प्रथाएं, लोकरीतियां और अलिखित परंपराएं होती हैं। समिति में लिखित, औपचारिक एवं कानूनी नियम होते हैं।

2. मैकाइवर एवं पेज का सूत्र: "हम समितियों के सदस्य होते हैं, संस्थाओं के नहीं" (4 अंक):
- समिति (Association) मनुष्यों का एक संगठित मूर्त समूह है (जैसे: विश्वविद्यालय, परिवार, अस्पताल, क्रिकेट क्लब)। चूंकि यह व्यक्तियों से मिलकर बनी है, अतः हम इसके 'सदस्य' होते हैं।
- संस्था (Institution) समिति की कार्यप्रणाली के स्वीकृत नियम, विधियां और व्यवस्थाएं हैं (जैसे: विवाह, परीक्षा प्रणाली, मताधिकार)।
- निष्कर्ष: हम विश्वविद्यालय (समिति) के सदस्य हैं, किंतु परीक्षा प्रणाली (संस्था) के सदस्य नहीं हो सकते; हम केवल उसके नियमों का पालन करते हैं।`,
    examinerRubric: [
      'Comparative table of 5 criteria (Locality, Origin, Scope, Membership, Rules) (6 Marks)',
      'Conceptual distinction: Association (Group) vs Institution (Procedure) (4 Marks)',
    ],
    learnTopicId: 't-soc-103',
  },
  {
    id: 'pyq-soc-nep-03',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-SOC-101',
    subjectNameEn: 'Sociology: Introduction to Sociology (Structure & Processes)',
    subjectNameHi: 'समाजशास्त्र: समाजशास्त्र का परिचय (सामाजिक संरचना एवं प्रक्रियाएं)',
    chapterEn: 'Unit 1: Discipline of Sociology, Nature & Basic Concepts',
    chapterHi: 'इकाई 1: समाजशास्त्र का उद्भव, प्रकृति एवं मूल अवधारणाएं',
    topicEn: 'Auguste Comte: Law of Three Stages',
    topicHi: 'अगस्त कॉम्ट का त्रि-स्तरीय बौद्धिक नियम',
    questionEn: 'Explain Auguste Comte’s "Law of Three Stages" of human intellectual and societal development.',
    questionHi: 'मानव बौद्धिक एवं सामाजिक विकास के संदर्भ में अगस्त कॉम्ट के "तीन स्तरों के नियम" को समझाइए।',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2022, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `Auguste Comte posited that the human mind, branches of knowledge, and society pass progressively through three historical stages:
1. Theological / Fictitious Stage (Prior to 1300): Phenomenon explained by supernatural divine agencies. Evolved through Fetishism (worship of objects), Polytheism (multiple gods), to Monotheism (one supreme creator). Social order was military and priestly.
2. Metaphysical / Abstract Stage (1300 to 1800): Supernatural personifications are replaced by abstract philosophical forces, nature, or essences. Social order was dominated by jurists and philosophers.
3. Positive / Scientific Stage (1800 onwards): Mind abandons search for absolute causes and focuses on empirical observation, experimentation, and classification to discover invariant natural laws. Social order is industrial and scientific.`,
    solutionHi: `अगस्त कॉम्ट के अनुसार मानव चिंतन तथा समाज का विकास तीन क्रमिक अवस्थाओं से होकर गुजरा है:
1. धार्मिक स्तर (Theological Stage, 1300 ई. से पूर्व): प्रत्येक घटना को अलौकिक शक्तियों और ईश्वर की इच्छा माना जाता था। इसके तीन उप-स्तर थे: प्रेतवाद (Fetishism), बहुदेववाद (Polytheism) तथा एकेश्वरवाद (Monotheism)।
2. तात्विक स्तर (Metaphysical Stage, 1300 से 1800 ई.): ईश्वर के स्थान पर निराकार अमूर्त शक्तियों व प्रकृति के सिद्धांतों द्वारा घटनाओं की व्याख्या की गई।
3. प्रत्यक्षवादी / वैज्ञानिक स्तर (Positive Stage, 1800 के पश्चात): मानव ने अंतिम कारणों की खोज छोड़कर अनुभवजन्य अवलोकन, प्रयोग व वर्गीकरण के आधार पर घटनाओं के कार्य-कारण नियमों की खोज प्रारंभ की।`,
    examinerRubric: [
      'Theological & Metaphysical stages explanation (2 Marks)',
      'Positive Scientific stage & industrial application (3 Marks)',
    ],
    learnTopicId: 't-soc-101',
  },
  {
    id: 'pyq-soc-nep-04',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-SOC-101',
    subjectNameEn: 'Sociology: Introduction to Sociology (Structure & Processes)',
    subjectNameHi: 'समाजशास्त्र: समाजशास्त्र का परिचय (सामाजिक संरचना एवं प्रक्रियाएं)',
    chapterEn: 'Unit 1: Discipline of Sociology, Nature & Basic Concepts',
    chapterHi: 'इकाई 1: समाजशास्त्र का उद्भव, प्रकृति एवं मूल अवधारणाएं',
    topicEn: 'MacIver Definition of Society as a Web',
    topicHi: 'मैकाइवर द्वारा समाज को सामाजिक संबंधों का जाल बताने की परिभाषा',
    questionEn: 'Who defined Society as a "web of social relationships" and what is its primary characteristic?',
    questionHi: 'समाज को "सामाजिक संबंधों का जाल" किसने परिभाषित किया है और इसका मुख्य लक्षण क्या है?',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 6,
    yearsAppeared: [2021, 2023, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `R.M. MacIver and C.H. Page defined: "Society is a web of social relationships and it is always changing." Its primary characteristic is that it is abstract, dynamic, and based on mutual awareness.`,
    solutionHi: `आर.एम. मैकाइवर एवं सी.एच. पेज ने लिखा: "समाज सामाजिक संबंधों का जाल है, और यह सदैव परिवर्तनशील है।" इसका मूल लक्षण इसकी अमूर्तता, गतिशीलता एवं पारस्परिक जागरूकता है।`,
    examinerRubric: [
      'Authors MacIver & Page (1 Mark)',
      'Abstract & ever-changing characteristics (1 Mark)',
    ],
    learnTopicId: 't-soc-103',
  },

  // ------------------ 5. HINDI LITERATURE (SDSUV-HIN-101) ------------------
  {
    id: 'pyq-hin-nep-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIN-101',
    subjectNameEn: 'Hindi Literature: Ancient & Bhakti Poetry (Kabir, Jayasi, Tulsi)',
    subjectNameHi: 'हिन्दी साहित्य: प्राचीन एवं भक्तिकालीन काव्य (कबीर, जायसी, तुलसी)',
    chapterEn: 'Unit 1: Historical Context of Aadikal & Bhaktikal Traditions',
    chapterHi: 'इकाई 1: आदिकाल एवं भक्तिकाल की युगीन पृष्ठभूमि एवं काव्य धाराएं',
    topicEn: 'Naming Controversy of Aadikal: Shukla vs Dwivedi Ji',
    topicHi: 'आदिकाल का नामकरण विवाद: आचार्य शुक्ल बनाम हजारी प्रसाद द्विवेदी',
    questionEn: 'Critically examine the controversy regarding the nomenclature of Aadikal in Hindi Literature. Point out the limitations of Acharya Ramchandra Shukla’s "Veergatha Kal" and justify the universal acceptance of Acharya Hazari Prasad Dwivedi’s "Aadikal".',
    questionHi: 'हिन्दी साहित्य में आदिकाल के नामकरण संबंधी विवाद की आलोचनात्मक समीक्षा कीजिए। आचार्य रामचंद्र शुक्ल के "वीरगाथा काल" नामकरण की सीमाओं को रेखांकित करते हुए आचार्य हजारी प्रसाद द्विवेदी के "आदिकाल" नामकरण की सर्वमान्यता सिद्ध कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2020, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. प्रस्तावना एवं नामकरण की जटिलता:
हिन्दी साहित्य के प्रथम कालखंड (संवत 1050 से 1375) का नामकरण सर्वाधिक विवादास्पद रहा है। इस युग में अपभ्रंश और प्रारंभिक हिन्दी की अनेक प्रवृत्तियां (धार्मिक, वीर, शृंगारिक एवं लौकिक) एक साथ प्रवाहित हो रही थीं।

2. विभिन्न विद्वानों द्वारा प्रस्तावित नामकरण:
1. जॉर्ज ग्रियर्सन: चारण काल (Charana Kal) - प्रारंभिक चारण कवियों की रचनाओं के आधार पर।
2. मिश्रबंधु: प्रारंभिक काल (Prarambhik Kal) - केवल संख्यात्मक काल-विभाजन।
3. राहुल सांकृत्यायन: सिद्ध-सामंत काल (Siddha-Samanta Kal) - सिद्धों की धार्मिक साधना व सामंतों की स्तुति के आधार पर।
4. महावीर प्रसाद द्विवेदी: बीजवपन काल (Beej-vapan Kal) - आगामी साहित्य के बीजारोपण का काल।
5. विश्वनाथ प्रसाद मिश्र: वीर काल।
6. रामकुमार वर्मा: संधि काल एवं चारण काल।

3. आचार्य रामचंद्र शुक्ल का "वीरगाथा काल" एवं उसकी सीमाएं:
आचार्य शुक्ल ने 'प्रधान प्रवृत्ति' को आधार बनाते हुए 12 विशिष्ट ग्रंथों के आधार पर इसे 'वीरगाथा काल' नाम दिया:
- अपभ्रंश की 4 रचनाएं: विजयपाल रासो, हम्मीर रासो, कीर्तिलता, कीर्तिपताका।
- देशभाषा की 8 रचनाएं: खुमान रासो, बीसलदेव रासो, पृथ्वीराज रासो, जयचंद प्रकाश, जयमयंक जसचन्द्रिका, परमाल रासो (आल्हा खंड), खुसरो की पहेलियां, विद्यापति पदावली।
आचार्य शुक्ल के मत की सीमाएं:
क) ऐतिहासिक अप्रमाणिकता: आधुनिक शोधों (माताप्रसाद गुप्त, हजारी प्रसाद द्विवेदी) ने सिद्ध किया कि पृथ्वीराज रासो, परमाल रासो तथा खुमान रासो अपने मूल रूप में उस समय के नहीं हैं, इनमें प्रचुर परवर्ती प्रक्षेप हैं। हम्मीर रासो, जयचंद प्रकाश केवल नोटिस मात्र हैं, ग्रंथ उपलब्ध नहीं हैं।
ख) बीसलदेव रासो मूलतः वीरगाथा नहीं, शृंगारिक विरह काव्य है।
ग) धार्मिक साहित्य की उपेक्षा: शुक्ल जी ने सिद्ध, नाथ और जैन साहित्य को "धार्मिक उपदेश मात्र" कहकर साहित्य कोटि से बाहर कर दिया, जो कि अनुचित था।

4. आचार्य हजारी प्रसाद द्विवेदी का "आदिकाल" नामकरण (सर्वमान्य):
आचार्य हजारी प्रसाद द्विवेदी ने अकाट्य तर्कों से सिद्ध किया कि:
- 'आदिकाल' शब्द न केवल कालक्रम का द्योतक है, बल्कि यह उस युग की भाषा, भाव, छंद और रूप-विधान की आदिम प्रवृत्तियों को समग्रता में समेटता है।
- यह सिद्धों, नाथों, जैनियों, रासोकारों, विद्यापति और अमीर खुसरो सभी को समान स्थान देता है।
- द्विवेदी जी ने कहा: "वस्तुतः हिन्दी का आदिकाल संघर्ष और अंतर्विरोधों का काल है, इसे किसी एक संकीर्ण प्रवृत्ति में नहीं बांधा जा सकता।"

5. परीक्षक अंक विभाजन:
[नामकरण संबंधी ऐतिहासिक विवाद एवं विभिन्न विद्वानों के मत: 4 अंक]
[आचार्य शुक्ल का 12 ग्रंथों पर आधारित वीरगाथा काल व उसकी सीमाएं: 5 अंक]
[हजारी प्रसाद द्विवेदी का आदिकाल नामकरण व उसकी तार्किक सर्वमान्यता: 4 अंक]
[प्रमुख आदिकालीन प्रवृत्तियां (डिंगल-पिंगल, वीर-शृंगार समन्वय): 2 अंक]`,
    solutionHi: `1. प्रस्तावना एवं नामकरण की जटिलता:
हिन्दी साहित्य के प्रथम कालखंड (संवत 1050 से 1375) का नामकरण सर्वाधिक विवादास्पद रहा है। इस युग में अपभ्रंश और प्रारंभिक हिन्दी की अनेक प्रवृत्तियां (धार्मिक, वीर, शृंगारिक एवं लौकिक) एक साथ प्रवाहित हो रही थीं।

2. विभिन्न विद्वानों द्वारा प्रस्तावित नामकरण:
1. जॉर्ज ग्रियर्सन: चारण काल
2. मिश्रबंधु: प्रारंभिक काल
3. राहुल सांकृत्यायन: सिद्ध-सामंत काल
4. महावीर प्रसाद द्विवेदी: बीजवपन काल
5. विश्वनाथ प्रसाद मिश्र: वीर काल
6. रामकुमार वर्मा: संधि काल एवं चारण काल

3. आचार्य रामचंद्र शुक्ल का "वीरगाथा काल" एवं उसकी सीमाएं:
आचार्य शुक्ल ने 'प्रधान प्रवृत्ति' को आधार बनाते हुए 12 विशिष्ट ग्रंथों के आधार पर इसे 'वीरगाथा काल' नाम दिया।
सीमाएं:
क) ऐतिहासिक अप्रमाणिकता: आधुनिक शोधों ने सिद्ध किया कि पृथ्वीराज रासो व परमाल रासो मूल रूप में प्रामाणिक नहीं हैं।
ख) बीसलदेव रासो वीरगाथा नहीं, बल्कि शृंगारिक विरह काव्य है।
ग) धार्मिक साहित्य की उपेक्षा: शुक्ल जी ने सिद्ध, नाथ और जैन साहित्य को साहित्य कोटि से बाहर कर दिया, जो उचित नहीं था।

4. आचार्य हजारी प्रसाद द्विवेदी का "आदिकाल" नामकरण (सर्वमान्य):
हजारी प्रसाद द्विवेदी ने सिद्ध किया कि 'आदिकाल' नामकरण सबसे अधिक व्यापक और संतुलित है। यह सिद्ध, नाथ, जैन, चारण, विद्यापति एवं खुसरो सभी काव्यधाराओं को समेटता है।

5. परीक्षक अंक विभाजन:
[नामकरण विवाद व विभिन्न विद्वानों के मत: 4 अंक]
[आचार्य शुक्ल के 12 ग्रंथ व वीरगाथा काल की सीमाएं: 5 अंक]
[हजारी प्रसाद द्विवेदी के आदिकाल की सर्वमान्यता: 4 अंक]
[आदिकालीन भाषा व शिल्प का निष्कर्ष: 2 अंक]`,
    examinerRubric: [
      'Nomenclature controversy & various scholars (Grierson, Sankrityayan, Shukla) (4 Marks)',
      'Critique of Shukla’s 12 texts & limitations of Veergatha Kal (5 Marks)',
      'Justification of Hazari Prasad Dwivedi’s Aadikal (4 Marks)',
      'Linguistic & poetic characteristics conclusion (2 Marks)',
    ],
    learnTopicId: 't-hin-101',
  },
  {
    id: 'pyq-hin-nep-02',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIN-101',
    subjectNameEn: 'Hindi Literature: Ancient & Bhakti Poetry (Kabir, Jayasi, Tulsi)',
    subjectNameHi: 'हिन्दी साहित्य: प्राचीन एवं भक्तिकालीन काव्य (कबीर, जायसी, तुलसी)',
    chapterEn: 'Unit 1: Historical Context of Aadikal & Bhaktikal Traditions',
    chapterHi: 'इकाई 1: आदिकाल एवं भक्तिकाल की युगीन पृष्ठभूमि एवं काव्य धाराएं',
    topicEn: 'Emergence of Bhaktikal: Shukla vs Dwivedi Ji',
    topicHi: 'भक्तिकाल का उदय: आचार्य शुक्ल बनाम हजारी प्रसाद द्विवेदी',
    questionEn: 'Compare the divergent perspectives of Acharya Ramchandra Shukla and Acharya Hazari Prasad Dwivedi regarding the causes behind the rise of the Bhakti Movement in medieval India.',
    questionHi: 'मध्यकालीन भारत में भक्ति आंदोलन के उदय के कारणों के संदर्भ में आचार्य रामचंद्र शुक्ल तथा आचार्य हजारी प्रसाद द्विवेदी के परस्पर विरोधी दृष्टिकोणों का तुलनात्मक परीक्षण कीजिए।',
    marks: 10,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2021, 2022, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. ACHARYA RAMCHANDRA SHUKLA’S PERSPECTIVE (REACTION TO ISLAMIC CONQUEST) (4 MARKS):
Acharya Shukla held a socio-political, reactionary view:
- Argued that the arrival of Islamic rule shattered Hindu royal power, destroyed temples, and humiliated Hindu society.
- A defeated, demoralized, and despondent Hindu community had no worldly recourse: "अपने पौरुष से हताश जाति के लिए भगवान् की शक्ति और दया की ओर ध्यान ले जाने के अतिरिक्त दूसरा मार्ग ही क्या था?"
- Bhakti was thus viewed by Shukla as a psychological refuge of a defeated populace.

2. ACHARYA HAZARI PRASAD DWIVEDI’S COUNTER-ARGUMENT (INDIGENOUS CONTINUITY) (4 MARKS):
Acharya Dwivedi completely shattered Shukla’s defeatist hypothesis through deep cultural historiography:
- Demonstrated that the Bhakti movement originated in South India through the Alvars and Nayanars centuries before Islamic conquest: "भक्ति द्राविड़ ऊपजी, लाये रामानंद".
- It was an organic, spontaneous resurgence of indigenous Upanishadic, Buddhist, and folk spirituality.
- Dwivedi Ji made his immortal pronouncement: "मैं जोर देकर कहना चाहता हूँ कि अगर इस्लाम नहीं आया होता, तो भी इस साहित्य का बारह आना वैसा ही होता जैसा आज है।"

3. SYNTHESIS (2 MARKS):
Bhakti was an indigenous spiritual revolution of social egalitarianism (led by weavers, cobblers, and common folk) that would have developed naturally, though Islamic contact provided an external catalytic urgency.`,
    solutionHi: `1. आचार्य रामचंद्र शुक्ल का मत (मुस्लिम आक्रमण की प्रतिक्रिया) (4 अंक):
आचार्य शुक्ल ने भक्ति आंदोलन के उदय को पराजित हिंदू मानसिकता की प्रतिक्रिया माना:
- मुस्लिम शासकों के आगमन से हिंदू राज्य नष्ट हुए, मंदिर तोड़े गए और जनता अपमानित हुई।
- अपनी विवशता और निराशा में जनता के पास ईश्वर की शरण में जाने के अतिरिक्त कोई उपाय नहीं था: "अपने पौरुष से हताश जाति के लिए भगवान् की शक्ति और दया की ओर ध्यान ले जाने के अतिरिक्त दूसरा मार्ग ही क्या था?"

2. आचार्य हजारी प्रसाद द्विवेदी का खंडन (भारतीय परंपरा का स्वतःस्फूर्त विकास) (4 अंक):
आचार्य द्विवेदी ने ऐतिहासिक साक्ष्यों से शुक्ल जी के निराशावादी मत का खंडन किया:
- भक्ति का उदय इस्लाम के आगमन से सदियों पूर्व दक्षिण भारत में आलवार और नयनार संतों द्वारा हुआ था: "भक्ति द्राविड़ ऊपजी, लाये रामानंद।"
- यह भारतीय उपनिषद, नाथ एवं लोक-संस्कृति का स्वाभाविक एवं आंतरिक विकास था।
- द्विवेदी जी का प्रसिद्ध कथन: "मैं जोर देकर कहना चाहता हूँ कि अगर इस्लाम नहीं आया होता, तो भी इस साहित्य का बारह आना वैसा ही होता जैसा आज है।"

3. संतुलित निष्कर्ष (2 अंक):
भक्तिकाल किसी पराजित जाति का रोदन नहीं, बल्कि लोक-चेतना, जाति-पांति विरोध एवं मानवीय समता का एक विराट सांस्कृतिक जागरण था।`,
    examinerRubric: [
      'Shukla’s defeatist/reactionary hypothesis & quote (4 Marks)',
      'Dwivedi’s indigenous continuity thesis & "Barah Aana" quote (4 Marks)',
      'Socio-cultural synthesis & Alvar origin connection (2 Marks)',
    ],
    learnTopicId: 't-hin-101',
  },
  {
    id: 'pyq-hin-nep-03',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIN-101',
    subjectNameEn: 'Hindi Literature: Ancient & Bhakti Poetry (Kabir, Jayasi, Tulsi)',
    subjectNameHi: 'हिन्दी साहित्य: प्राचीन एवं भक्तिकालीन काव्य (कबीर, जायसी, तुलसी)',
    chapterEn: 'Unit 1: Historical Context of Aadikal & Bhaktikal Traditions',
    chapterHi: 'इकाई 1: आदिकाल एवं भक्तिकाल की युगीन पृष्ठभूमि एवं काव्य धाराएं',
    topicEn: 'Dingal vs Pingal Poetic Diction',
    topicHi: 'डिंगल एवं पिंगल काव्य शैलियों में अंतर',
    questionEn: 'Distinguish between Dingal and Pingal poetic styles prevalent in Aadikal literature.',
    questionHi: 'आदिकालीन साहित्य में प्रचलित डिंगल और पिंगल काव्य शैलियों में अंतर स्पष्ट कीजिए।',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2021, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. DINGAL (डिंगल) (2.5 MARKS):
- Linguistic Composition: Fusion of Apabhramsha with Rajasthani (Marwari) dialect.
- Rasa & Mood: Harsh, hard, energetic consonants (ट-वर्ग प्रधान), specifically formulated for Veer Rasa (martial poetry) and terrifying battlefield descriptions (Raso literature like Prithviraj Raso).
- Characterized by hyperbole and clashing sword sounds (ध्वन्यात्मकता).

2. PINGAL (पिंगल) (2.5 MARKS):
- Linguistic Composition: Fusion of Apabhramsha with sweet Brajbhasha.
- Rasa & Mood: Soft, lyrical, mellifluous diction suited for Shringar Rasa (love, romance) and Bhakti.
- Later became the standard literary vehicle for Riti poetry and Krishna Bhakti.`,
    solutionHi: `1. डिंगल शैली (2.5 अंक):
- भाषाई स्वरूप: अपभ्रंश और राजस्थानी (मारवाड़ी) का सम्मिश्रण।
- रस एवं प्रकृति: कर्कश एवं ओजपूर्ण शब्दावली (ट-वर्ग की प्रधानता), जो युद्धों के सजीव वर्णन, तलवारों की खनक तथा वीर रस के अनुकूल थी (जैसे रासो काव्य)।

2. पिंगल शैली (2.5 अंक):
- भाषाई स्वरूप: अपभ्रंश और मधुर ब्रजभाषा का सम्मिश्रण।
- रस एवं प्रकृति: कोमलकांत, कर्णप्रिय एवं गेय पदावली, जो शृंगार, विरह और भक्ति के चित्रण हेतु प्रयुक्त होती थी (जैसे बीसलदेव रासो)।`,
    examinerRubric: [
      'Dingal linguistic base & martial Veer Rasa suitability (2.5 Marks)',
      'Pingal Brajbhasha base & lyrical Shringar suitability (2.5 Marks)',
    ],
    learnTopicId: 't-hin-101',
  },
  {
    id: 'pyq-hin-nep-04',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-HIN-101',
    subjectNameEn: 'Hindi Literature: Ancient & Bhakti Poetry (Kabir, Jayasi, Tulsi)',
    subjectNameHi: 'हिन्दी साहित्य: प्राचीन एवं भक्तिकालीन काव्य (कबीर, जायसी, तुलसी)',
    chapterEn: 'Unit 1: Historical Context of Aadikal & Bhaktikal Traditions',
    chapterHi: 'इकाई 1: आदिकाल एवं भक्तिकाल की युगीन पृष्ठभूमि एवं काव्य धाराएं',
    topicEn: 'Shukla Periodization of Aadikal in Samvat',
    topicHi: 'आचार्य शुक्ल द्वारा निर्धारित आदिकाल की संवत कालावधि',
    questionEn: 'State the chronological periodization of Aadikal (Veergatha Kal) in Vikrami Samvat and Christian Era as designated by Acharya Ramchandra Shukla.',
    questionHi: 'आचार्य रामचंद्र शुक्ल द्वारा निर्धारित आदिकाल (वीरगाथा काल) की कालावधि विक्रमी संवत एवं ईस्वी सन् में लिखिए।',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 6,
    yearsAppeared: [2022, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `Acharya Ramchandra Shukla fixed the span of Aadikal (Veergatha Kal) from Vikrami Samvat 1050 to 1375 (corresponding to 993 A.D. to 1318 A.D.).`,
    solutionHi: `आचार्य रामचंद्र शुक्ल ने आदिकाल (वीरगाथा काल) की समय-सीमा संवत 1050 से संवत 1375 वि. (ईस्वी सन् 993 से 1318 ई.) तक स्वीकार की है।`,
    examinerRubric: [
      'Exact Samvat 1050 to 1375 (1 Mark)',
      'Christian Era equivalent 993 to 1318 A.D. (1 Mark)',
    ],
    learnTopicId: 't-hin-101',
  },

  // ------------------ 6. FUNDAMENTAL IN MICROECONOMICS (SDSUV-ECO-101) ------------------
  {
    id: 'pyq-eco-nep-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-ECO-101',
    subjectNameEn: 'Economics: Fundamental in Microeconomics',
    subjectNameHi: 'अर्थशास्त्र: व्यष्टि अर्थशास्त्र के मूल सिद्धांत',
    chapterEn: 'Unit 1: Theory of Consumer Behavior & Demand',
    chapterHi: 'इकाई 1: उपभोक्ता व्यवहार का सिद्धांत एवं मांग',
    topicEn: 'Indifference Curve Analysis & Consumer Equilibrium',
    topicHi: 'उदासीनता वक्र विश्लेषण एवं उपभोक्ता संतुलन',
    questionEn: 'Explain Consumer’s Equilibrium using Indifference Curve Analysis. State the properties of Indifference Curves and mathematically derive the first-order and second-order equilibrium conditions with a diagram.',
    questionHi: 'उदासीनता वक्र विश्लेषण की सहायता से उपभोक्ता संतुलन की व्याख्या कीजिए। उदासीनता वक्र की विशेषताओं को बताइए तथा रेखाचित्र सहित संतुलन की प्रथम व द्वितीय कोटि की शर्तों को व्युत्पन्न कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2021, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. CONCEPT OF INDIFFERENCE CURVE (J.R. HICKS & R.G.D. ALLEN):
An Indifference Curve (IC) represents the locus of various combinations of two goods (X and Y) that yield identical total utility or satisfaction to a consumer, leaving them indifferent between bundles.

2. THREE FUNDAMENTAL PROPERTIES OF INDIFFERENCE CURVES:
1. Downward Sloping from Left to Right: Possesses a negative slope (dy/dx < 0) because to consume more of good X without increasing utility, the consumer must sacrifice some quantity of good Y.
2. Convex to the Origin: The slope of the IC is the Marginal Rate of Substitution (MRS_xy = -dy/dx). Due to the Law of Diminishing Marginal Rate of Substitution, as the consumer acquires successive units of X, their willingness to sacrifice Y decreases, ensuring convexity.
3. Two ICs Can Never Intersect: Intersection violates the foundational axiom of transitivity of consumer preferences.

3. THE BUDGET CONSTRAINT (PRICE LINE):
Given income M and market prices P_x and P_y, the budget equation is:
P_x * X + P_y * Y = M  =>  Slope of Budget Line = - (P_x / P_y).

4. CONDITIONS FOR CONSUMER EQUILIBRIUM:
A rational consumer maximizes utility subject to their budget constraint:
Condition 1 (First-Order Tangency Condition):
At the point of equilibrium (Point E), the Indifference Curve must be tangent to the Budget Line:
Slope of Indifference Curve = Slope of Budget Line
=> MRS_xy = P_x / P_y.

Condition 2 (Second-Order Convexity Condition):
At the point of tangency, the Indifference Curve must be strictly convex to the origin. This requires MRS_xy to be diminishing. If the curve were concave, the tangency would produce a point of minimum utility rather than maximum.

5. EXAMINER MARKING BREAKDOWN:
[Indifference curve definition & three properties: 4 Marks]
[Budget line equation and price ratio slope derivation: 4 Marks]
[Mathematical derivation of First-order and Second-order conditions: 4 Marks]
[Neat labeled equilibrium diagram showing tangency point E: 3 Marks]`,
    solutionHi: `1. उदासीनता वक्र की संकल्पना:
हिक्स एवं एलन द्वारा प्रतिपादित उदासीनता वक्र दो वस्तुओं (X और Y) के उन विभिन्न संयोगों का बिंदुपथ है, जो उपभोक्ता को समान स्तर की संतुष्टि प्रदान करते हैं।

2. उदासीनता वक्र की प्रमुख विशेषताएं:
1. बाएं से दाएं नीचे की ओर ढालू: चूंकि उपयोगिता समान रखनी है, अतः एक वस्तु बढ़ाने पर दूसरी का त्याग आवश्यक है।
2. मूल बिंदु की ओर उत्तलोदर (Convex): इसका ढाल घटती हुई प्रतिस्थापन की सीमांत दर (MRS_xy) को दर्शाता है। X की अतिरिक्त इकाइयों हेतु Y का त्याग घटता जाता है।
3. दो उदासीनता वक्र परस्पर नहीं काटते: काटना उपभोक्ता की प्राथमिकताओं की संक्रामकता (Transitivity) के विरुद्ध है।

3. बजट रेखा (कीमत रेखा):
उपभोक्ता की आय M तथा कीमतों P_x, P_y के अधीन बजट समीकरण:
P_x * X + P_y * Y = M  =>  बजट रेखा का ढाल = P_x / P_y.

4. उपभोक्ता संतुलन की शर्तें:
शर्त 1 (प्रथम कोटि - स्पर्श शर्त):
संतुलन बिंदु पर उदासीनता वक्र बजट रेखा को स्पर्श करना चाहिए:
उदासीनता वक्र का ढाल = बजट रेखा का ढाल
=> MRS_xy = P_x / P_y.

शर्त 2 (द्वितीय कोटि - उत्तलोदरता शर्त):
संतुलन बिंदु पर उदासीनता वक्र मूल बिंदु की ओर उत्तलोदर होना चाहिए, अर्थात MRS_xy निरंतर घटती होनी चाहिए।

5. परीक्षक अंक विभाजन:
[उदासीनता वक्र की परिभाषा एवं 3 विशेषताएं: 4 अंक]
[बजट रेखा समीकरण व ढाल व्युत्पत्ति: 4 अंक]
[प्रथम व द्वितीय कोटि संतुलन शर्तों का गणितीय निरूपण: 4 अंक]
[स्पर्श बिंदु E को प्रदर्शित करता स्वच्छ रेखाचित्र: 3 अंक]`,
    examinerRubric: [
      'Indifference curve definition & three properties (4 Marks)',
      'Budget constraint equation & price slope derivation (4 Marks)',
      'First-order & second-order equilibrium conditions (4 Marks)',
      'Labeled equilibrium tangency diagram (3 Marks)',
    ],
    learnTopicId: 't-eco-101',
  },
  {
    id: 'pyq-eco-nep-02',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 2,
    subjectCode: 'SDSUV-ECO-101',
    subjectNameEn: 'Economics: Fundamental in Microeconomics',
    subjectNameHi: 'अर्थशास्त्र: व्यष्टि अर्थशास्त्र के मूल सिद्धांत',
    chapterEn: 'Unit 2: Theory of Production & Costs',
    chapterHi: 'इकाई 2: उत्पादन एवं लागत का सिद्धांत',
    topicEn: 'Law of Variable Proportions & Three Stages of Production',
    topicHi: 'परिवर्तनशील अनुपातों का नियम एवं उत्पादन की तीन अवस्थाएं',
    questionEn: 'State the Law of Variable Proportions. Explain the three stages of production using Total Product (TP), Marginal Product (MP), and Average Product (AP) curves. Why is Stage II the only economically rational stage?',
    questionHi: 'परिवर्तनशील अनुपातों का नियम बताइए। कुल उत्पाद (TP), सीमांत उत्पाद (MP) तथा औसत उत्पाद (AP) वक्रों की सहायता से उत्पादन की तीनों अवस्थाओं को समझाइए। द्वितीय अवस्था ही एकमात्र आर्थिक रूप से विवेकपूर्ण अवस्था क्यों है?',
    marks: 10,
    section: 'C',
    type: 'Long',
    repeatedCount: 5,
    yearsAppeared: [2021, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. STATEMENT OF THE LAW (3 MARKS):
The Law of Variable Proportions (Short-Run Production Function) states that as successive units of a variable factor (labor) are applied to fixed quantities of other factors (land, capital), the resulting additions to Total Product (Marginal Product) initially increase, then diminish, and eventually become negative.

2. THE THREE STAGES OF PRODUCTION (4 MARKS):
- Stage I (Increasing Returns): TP rises at an increasing rate (point of inflection), then at a diminishing rate. MP rises to a maximum and cuts AP at AP's highest point. Ends where AP reaches maximum.
- Stage II (Diminishing Returns): TP continues to increase at a diminishing rate until it reaches its absolute maximum. Both MP and AP decline, but both remain strictly positive. Ends where MP = 0 and TP is maximized.
- Stage III (Negative Returns): TP declines; MP becomes negative. Adding more workers actually reduces total output due to overcrowding.

3. ECONOMIC RATIONALITY OF STAGE II (3 MARKS):
- A rational producer will NEVER operate in Stage I because the fixed factor is under-utilized (AP is still rising; expanding labor increases efficiency per worker).
- A producer will NEVER operate in Stage III because adding labor costs money while shrinking total output (MP < 0).
- Hence, Stage II (between maximum AP and zero MP) is the ONLY economically rational zone where both variable and fixed factors are utilized efficiently.`,
    solutionHi: `1. नियम का कथन (3 अंक):
अल्पकाल में जब स्थिर साधनों (भूमि, पूंजी) के साथ परिवर्तनशील साधन (श्रम) की मात्रा बढ़ाई जाती है, तो प्रारंभ में सीमांत उत्पाद बढ़ता है, फिर घटता है और अंत में ऋणात्मक हो जाता है।

2. उत्पादन की तीन अवस्थाएं (4 अंक):
- प्रथम अवस्था (बढ़ते प्रतिफल की अवस्था): कुल उत्पाद (TP) तेजी से बढ़ता है। सीमांत उत्पाद (MP) अधिकतम होकर औसत उत्पाद (AP) को उसके उच्चतम बिंदु पर काटता है।
- द्वितीय अवस्था (घटते प्रतिफल की अवस्था): TP घटती दर से बढ़ता हुआ अपने अधिकतम स्तर पर पहुंचता है। AP और MP दोनों घटते हैं किंतु धनात्मक रहते हैं। यह वहां समाप्त होती है जहां MP = 0 हो जाता है।
- तृतीय अवस्था (ऋणात्मक प्रतिफल की अवस्था): TP घटने लगता है तथा MP ऋणात्मक हो जाता है।

3. द्वितीय अवस्था का आर्थिक औचित्य (3 अंक):
- उत्पादक प्रथम अवस्था में नहीं रुकेगा क्योंकि वहां स्थिर साधन का पूर्ण उपयोग नहीं हो रहा है (AP बढ़ रहा है)।
- वह तृतीय अवस्था में कभी उत्पादन नहीं करेगा क्योंकि श्रमिकों को वेतन देने पर कुल उत्पादन घट रहा है (MP ऋणात्मक)।
- अतः द्वितीय अवस्था ही एकमात्र विवेकपूर्ण उत्पादन क्षेत्र है जहां साधन संतुलन में रहते हैं।`,
    examinerRubric: [
      'Statement of law and assumptions (3 Marks)',
      'Behavior of TP, MP, AP curves across 3 stages (4 Marks)',
      'Economic justification of Stage II rationality (3 Marks)',
    ],
    learnTopicId: 't-eco-101',
  },
  {
    id: 'pyq-eco-nep-03',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-ECO-101',
    subjectNameEn: 'Economics: Fundamental in Microeconomics',
    subjectNameHi: 'अर्थशास्त्र: व्यष्टि अर्थशास्त्र के मूल सिद्धांत',
    chapterEn: 'Unit 1: Theory of Consumer Behavior & Demand',
    chapterHi: 'इकाई 1: उपभोक्ता व्यवहार का सिद्धांत एवं मांग',
    topicEn: 'Five Degrees of Price Elasticity of Demand',
    topicHi: 'मांग की कीमत लोच की पांच श्रेणियां',
    questionEn: 'Define Price Elasticity of Demand. Explain its five degrees with numerical values and curve diagrams.',
    questionHi: 'मांग की कीमत लोच को परिभाषित कीजिए। संख्यात्मक मानों सहित इसकी पांचों श्रेणियों की सचित्र व्याख्या कीजिए।',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2022, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `Price Elasticity of Demand (E_p) measures the degree of responsiveness of quantity demanded to a change in the price of the commodity:
E_p = (% Change in Quantity Demanded) / (% Change in Price) = (dQ/dP) * (P/Q).

FIVE DEGREES:
1. Perfectly Inelastic (E_p = 0): Vertical straight line; quantity remains unchanged regardless of price (life-saving drugs).
2. Inelastic / Less than Unitary (E_p < 1): Steep curve; % change in quantity is less than % change in price (salt, wheat).
3. Unitary Elastic (E_p = 1): Rectangular hyperbola; % change in quantity equals % change in price.
4. Elastic / Greater than Unitary (E_p > 1): Flatter curve; % change in quantity exceeds % change in price (luxuries, smartphones).
5. Perfectly Elastic (E_p = infinity): Horizontal line; infinite change in quantity at existing price.`,
    solutionHi: `मांग की कीमत लोच किसी वस्तु की कीमत में परिवर्तन के परिणामस्वरूप उसकी मांग मात्रा में होने वाले अनुपातिक परिवर्तन की माप है:
E_p = (मांग में % परिवर्तन) / (कीमत में % परिवर्तन)।

पांच श्रेणियां:
1. पूर्णतया बेलोचदार (E_p = 0): लंबवत सीधी रेखा; कीमत बदलने पर मांग अपरिवर्तित रहती है (जीवन रक्षक दवाएं)।
2. बेलोचदार मांग (E_p < 1): तीव्र ढाल; मांग में परिवर्तन कीमत के अनुपात से कम होता है (अनिवार्य वस्तुएं जैसे नमक)।
3. इकाई लोचदार मांग (E_p = 1): आयताकार अतिपरवलय; कीमत व मांग में समान अनुपातिक परिवर्तन।
4. अत्यधिक लोचदार मांग (E_p > 1): मंद ढाल; मांग में परिवर्तन कीमत से अधिक अनुपात में होता है (विलासिता की वस्तुएं)।
5. पूर्णतया लोचदार मांग (E_p = अनंत): क्षैतिज रेखा; प्रचलित कीमत पर अनंत मांग।`,
    examinerRubric: [
      'Formula & definition (2 Marks)',
      'Five degrees with numerical values & curve slopes (3 Marks)',
    ],
    learnTopicId: 't-eco-101',
  },
  {
    id: 'pyq-eco-nep-04',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-ECO-101',
    subjectNameEn: 'Economics: Fundamental in Microeconomics',
    subjectNameHi: 'अर्थशास्त्र: व्यष्टि अर्थशास्त्र के मूल सिद्धांत',
    chapterEn: 'Unit 1: Theory of Consumer Behavior & Demand',
    chapterHi: 'इकाई 1: उपभोक्ता व्यवहार का सिद्धांत एवं मांग',
    topicEn: 'Why Indifference Curves Cannot Intersect',
    topicHi: 'दो उदासीनता वक्र परस्पर क्यों नहीं काट सकते',
    questionEn: 'Why can two indifference curves never intersect each other? State the logical proof.',
    questionHi: 'दो उदासीनता वक्र एक-दूसरे को क्यों नहीं काट सकते? तार्किक प्रमाण दीजिए।',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 6,
    yearsAppeared: [2021, 2023, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `If two indifference curves IC1 and IC2 intersected at point A, with bundle B on IC1 and bundle C on IC2, then A = B and A = C, which implies B = C by transitivity. However, bundle C contains more of both goods than B, yielding strictly higher utility (C > B). This logical contradiction proves that two indifference curves can never intersect.`,
    solutionHi: `यदि दो उदासीनता वक्र बिंदु A पर काटते हैं, तो संक्रामकता नियम के अनुसार उस बिंदु पर दोनों वक्रों की उपयोगिता समान (IC1 = IC2) सिद्ध होगी। किंतु वक्रों के अन्य बिंदुओं पर एक संयोग में अधिक वस्तुएं होने से उपयोगिता अधिक होगी। यह विरोधाभास सिद्ध करता है कि दो वक्र कभी परस्पर नहीं काट सकते।`,
    examinerRubric: [
      'Axiom of transitivity violation proof (1 Mark)',
      'Logical contradiction statement (1 Mark)',
    ],
    learnTopicId: 't-eco-101',
  },

  // ------------------ 7. INTRODUCTION TO ENGLISH PROSE (SDSUV-ENG-101) ------------------
  {
    id: 'pyq-eng-nep-01',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-ENG-101',
    subjectNameEn: 'English: Introduction to English Prose',
    subjectNameHi: 'अंग्रेजी: अंग्रेजी गद्य का परिचय',
    chapterEn: 'Unit 1: Forms of Prose & Renaissance Essay',
    chapterHi: 'इकाई 1: गद्य के विविध रूप एवं पुनर्जागरण कालीन निबंध',
    topicEn: 'Francis Bacon: Aphoristic Style in "Of Studies"',
    topicHi: 'फ्रांसिस बेकन: "ऑफ स्टडीज" में सूक्तिपरक शैली',
    questionEn: 'Critically evaluate Francis Bacon as the "Father of the English Essay". Analyze the terse aphoristic style, worldly utilitarian wisdom, and balanced rhetorical prose in his celebrated essay "Of Studies".',
    questionHi: 'फ्रांसिस बेकन का अंग्रेजी निबंध के जनक के रूप में मूल्यांकन कीजिए। उनके प्रसिद्ध निबंध "ऑफ स्टडीज" में संक्षिप्त सूक्तिपरक शैली, व्यावहारिक उपयोगितावादी चिंतन एवं संतुलित गद्य शैली का विश्लेषण कीजिए।',
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2021, 2022, 2023, 2024, 2025, 2026],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `1. INTRODUCTION & BACON’S HISTORICAL STATURE:
While Michel de Montaigne created the personal, conversational essay in France, Francis Bacon (1561-1626) naturalized the genre into English literature through his landmark 1597 collection "Essays or Counsels, Civill and Morall". Bacon termed them "dispersed meditations", transforming the essay into a manual of worldly practical wisdom for men of affairs.

2. TRIPARTITE RHETORICAL ARCHITECTURE IN "OF STUDIES":
Bacon opens with his most celebrated balanced triad:
"Studies serve for delight, for ornament, and for ability."
He immediately balances advantages with pragmatic caveats:
- Excess of delight leads to sloth.
- Excess of ornament becomes mere pedantry and affectation.
- Judging purely by rules is the humor of a scholar.

3. THE APHORISTIC & COMPACT STYLE:
Bacon’s prose represents the pinnacle of aphoristic brevity—every line is a self-contained, diamond-hard epigram packed with maximal philosophical density:
- On Discrimination in Reading: "Some books are to be tasted, others to be swallowed, and some few to be chewed and digested."
- On the Disciplines of Intellectual Life: "Reading maketh a full man; conference a ready man; and writing an exact man."
- On the Curative Powers of Knowledge: "Histories make men wise; poets witty; the mathematics subtle; natural philosophy deep; moral grave; logic and rhetoric able to contend."

4. WORLDLY UTILITARIAN PRAGMATISM:
Unlike moral theologians, Bacon does not advocate learning for spiritual asceticism. He counsels the Renaissance man to deploy knowledge for worldly success, social mastery, and civil administrative competence ("Crafty men condemn studies, simple men admire them, and wise men use them").

5. EXAMINER MARKING BREAKDOWN:
[Bacon as Father of English Essay & Montaigne contrast: 4 Marks]
[Tripartite rhetorical balance & textual analysis of opening lines: 4 Marks]
[Aphoristic prose style with quotes (tasted/swallowed/digested): 4 Marks]
[Utilitarian worldly philosophy & Renaissance humanist context: 3 Marks]`,
    solutionHi: `1. प्रस्तावना एवं ऐतिहासिक महत्व:
फ्रांस में मोंटेन ने आत्मकथात्मक निबंध की शुरुआत की थी, किंतु फ्रांसिस बेकन ने 1597 में अपने निबंध संग्रह के माध्यम से इसे अंग्रेजी में व्यावहारिक ज्ञान का सशक्त माध्यम बनाया। बेकन को "अंग्रेजी निबंध का पिता" कहा जाता है।

2. निबंध की संतुलित संरचना ("ऑफ स्टडीज"):
निबंध का प्रारंभ बेकन के प्रसिद्ध त्रिसूत्रीय वाक्य से होता है:
"Studies serve for delight, for ornament, and for ability." (अध्ययन आनंद के लिए, आभूषण के लिए तथा योग्यता के लिए उपयोगी है।)
इसके तुरंत बाद वे अति-अध्ययन के दोष भी बताते हैं: अत्यधिक समय देना आलस्य है, बात-बात में उद्धरण देना पांडित्य प्रदर्शन है।

3. सूक्तिपरक (Aphoristic) शैली की विशेषताएं:
बेकन का प्रत्येक वाक्य एक लोकोक्ति या नीतिवचन की भांति संक्षिप्त, धारदार एवं गहन अर्थों से परिपूर्ण है:
- पुस्तकों का वर्गीकरण: "Some books are to be tasted, others to be swallowed, and some few to be chewed and digested." (कुछ पुस्तकें केवल चखने के लिए होती हैं, कुछ निगलने के लिए, और कुछ चबाकर पचाने के लिए।)
- बौद्धिक व्यक्तित्व का विकास: "Reading maketh a full man; conference a ready man; and writing an exact man."
- विषयों की उपयोगिता: इतिहास मनुष्य को बुद्धिमान, कविता कल्पनाशील तथा गणित सूक्ष्म बनाता है।

4. उपयोगितावादी दृष्टिकोण:
बेकन का ज्ञान संन्यास हेतु नहीं, बल्कि सांसारिक सफलता, शासन और समाज में प्रतिष्ठा पाने का साधन है: "धूर्त मनुष्य अध्ययन का तिरस्कार करते हैं, सरल मनुष्य प्रशंसा करते हैं, और बुद्धिमान मनुष्य उसका उपयोग करते हैं।"

5. परीक्षक अंक विभाजन:
[बेकन का अंग्रेजी निबंध के पिता के रूप में मूल्यांकन: 4 अंक]
[संतुलित गद्य शिल्प एवं प्रारंभिक त्रयी का विश्लेषण: 4 अंक]
[सूक्तिपरक शैली एवं महत्वपूर्ण उदाहरणों की व्याख्या: 4 अंक]
[व्यावहारिक उपयोगितावाद एवं पुनर्जागरण का संदर्भ: 3 अंक]`,
    examinerRubric: [
      'Bacon’s historical standing vs Montaigne’s personal mode (4 Marks)',
      'Tripartite structural balance & opening lines analysis (4 Marks)',
      'Aphoristic brevity & quote integration (chewed/digested, full man) (4 Marks)',
      'Renaissance utilitarian realism & conclusion (3 Marks)',
    ],
    learnTopicId: 't-eng-101',
  },
  {
    id: 'pyq-eng-nep-02',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 2,
    subjectCode: 'SDSUV-ENG-101',
    subjectNameEn: 'English: Introduction to English Prose',
    subjectNameHi: 'अंग्रेजी: अंग्रेजी गद्य का परिचय',
    chapterEn: 'Unit 2: Romantic & Modern Prose Masters',
    chapterHi: 'इकाई 2: स्वच्छंदतावादी एवं आधुनिक गद्यकार',
    topicEn: 'Charles Lamb: "Dream Children: A Reverie"',
    topicHi: 'चार्ल्स लैम्ब: "ड्रीम चिल्ड्रन: अ रेवरी" में वैयक्तिक भावुकता',
    questionEn: 'Discuss Charles Lamb as the "Prince of English Essayists" with special reference to "Dream Children: A Reverie". Contrast Lamb’s romantic subjectivity with Bacon’s detached objectivity.',
    questionHi: '"ड्रीम चिल्ड्रन: अ रेवरी" के विशेष संदर्भ में चार्ल्स लैम्ब का अंग्रेजी निबंधकारों के राजकुमार के रूप में विवेचन कीजिए। लैम्ब की वैयक्तिक भावुकता की बेकन की वस्तुपरक शैली से तुलना कीजिए।',
    marks: 10,
    section: 'C',
    type: 'Long',
    repeatedCount: 5,
    yearsAppeared: [2021, 2023, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `1. CHARLES LAMB’S PERSONAL ROMANTIC ESSAY (4 MARKS):
Writing under the pseudonym "Elia" in London Magazine (1820s), Charles Lamb established the personal autobiographical essay. In "Dream Children: A Reverie", Lamb creates a poignant daydream where he sits fireside narrating stories of their great-grandmother Field and youthful courtship of Ann Simmons to his two children, Alice and John.

2. THE HEART-BREAKING AWAKENING & PATHOS (3 MARKS):
As the dream deepens, the children's faces fade into the ethereal air, whispering: "We are not of Alice, nor of thee, nor are we children at all... We are nothing; less than nothing, and dreams. We are only what might have been." Lamb awakens abruptly to find his bachelor armchair beside his faithful sister Mary (Bridget), transforming gentle humor into devastating emotional pathos.

3. CONTRAST: LAMB VS BACON (3 MARKS):
- Bacon is objective, impersonal, authoritarian, Latinate, and didactic—advising how to conquer the world.
- Lamb is intensely subjective, intimate, vulnerable, conversational, and nostalgic—sharing personal sorrow, bachelor loneliness, and family tragedy with warmth and gentle self-irony.`,
    solutionHi: `1. चार्ल्स लैम्ब का वैयक्तिक गद्य शिल्प (4 अंक):
'एलिया' उपनाम से लिखने वाले चार्ल्स लैम्ब को अंग्रेजी निबंधकारों का राजकुमार कहा जाता है। "ड्रीम चिल्ड्रन: अ रेवरी" में वे एक काल्पनिक स्वप्न बुनते हैं जहां वे अपने दो बच्चों (एलिस और जॉन) को अपनी परदादी फील्ड तथा उनकी माता एन सिमंस के प्रेम की कहानियां सुनाते हैं।

2. स्वप्न भंग की मार्मिक त्रासदी (3 अंक):
कथा के अंत में बच्चे धुंधले होकर फुसफुसाते हैं: "हम एलिस के बच्चे नहीं हैं, न ही तुम्हारे... हम कुछ भी नहीं हैं, केवल एक स्वप्न हैं जो कभी सच हो सकता था।" लैम्ब की आंख खुलती है और वे खुद को अपनी अविवाहित कुर्सी पर बहन मैरी के पास पाते हैं। यह प्रसंग पाठक के हृदय को करुणा से भर देता है।

3. लैम्ब बनाम बेकन की तुलना (3 अंक):
- बेकन वस्तुनिष्ठ, उपदेशात्मक, कठोर और सांसारिक सफलता के समर्थक हैं।
- लैम्ब आत्मपरक, संवेदनशील, आत्मीय और व्यक्तिगत पीड़ा को मुस्कान के पीछे छिपाने वाले महान मानवतावादी निबंधकार हैं।`,
    examinerRubric: [
      'Lamb’s autobiographical Elian persona and reverie plot (4 Marks)',
      'Pathos of dream awakening & tragic bachelorhood (3 Marks)',
      'Contrast matrix: Subjective Lamb vs Objective Bacon (3 Marks)',
    ],
    learnTopicId: 't-eng-102',
  },
  {
    id: 'pyq-eng-nep-03',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 2,
    subjectCode: 'SDSUV-ENG-101',
    subjectNameEn: 'English: Introduction to English Prose',
    subjectNameHi: 'अंग्रेजी: अंग्रेजी गद्य का परिचय',
    chapterEn: 'Unit 2: Romantic & Modern Prose Masters',
    chapterHi: 'इकाई 2: स्वच्छंदतावादी एवं आधुनिक गद्यकार',
    topicEn: 'George Orwell: Anti-Imperialist Critique in "Shooting an Elephant"',
    topicHi: 'जॉर्ज ऑरवेल: "शूटिंग एन एलिफेंट" में साम्राज्यवाद की आलोचना',
    questionEn: 'Analyze George Orwell’s critique of British Imperialism in his autobiographical essay "Shooting an Elephant".',
    questionHi: 'जॉर्ज ऑरवेल के आत्मकथात्मक निबंध "शूटिंग एन एलिफेंट" में ब्रिटिश साम्राज्यवाद की आलोचना का विश्लेषण कीजिए।',
    marks: 5,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2022, 2024, 2025],
    frequencyTag: 'SDSUV High-Yield',
    solutionEn: `In "Shooting an Elephant" (1936), based on his service as an Indian Imperial Police officer in Burma, Orwell exposes the psychological absurdity of colonial imperialism:
1. The Tyrant’s Fetters: Orwell discovers that when the white man turns tyrant, it is his own freedom that he destroys. To maintain the prestige of the Sahib and avoid being laughed at by the 2,000 Burmese onlookers, he is coerced into killing a peaceful working elephant that he had no desire to kill.
2. Metaphor of Imperial Hollow Power: The British Raj is revealed not as an omnipotent master, but as an absurd puppet dancing to the expectations of the colonized crowd.`,
    solutionHi: `1936 में प्रकाशित अपने आत्मकथात्मक निबंध में जॉर्ज ऑरवेल बर्मा में पुलिस सेवा के अनुभवों द्वारा साम्राज्यवाद के खोखलेपन को उजागर करते हैं:
1. अत्याचारी का आत्म-बंधन: ऑरवेल बताते हैं कि जब गोरा शासक अत्याचारी बनता है, तो वह सबसे पहले अपनी ही स्वतंत्रता को नष्ट करता है। 2000 बर्मावासियों की भीड़ के सामने "साहब" की प्रतिष्ठा बनाए रखने और उपहास से बचने हेतु वे एक शांत हो चुके हाथी को अनिच्छापूर्वक गोली मारने को विवश होते हैं।
2. औपनिवेशिक मुखौटा: साम्राज्यवादी शासक कोई सर्वशक्तिमान प्रभु नहीं, बल्कि भीड़ की अपेक्षाओं पर नाचने वाली एक बेबस कठपुतली बनकर रह जाता है।`,
    examinerRubric: [
      'The paradox of white man destroying his own freedom (3 Marks)',
      'The elephant as a metaphor for hollow imperial coercion (2 Marks)',
    ],
    learnTopicId: 't-eng-102',
  },
  {
    id: 'pyq-eng-nep-04',
    stream: 'ba-arts',
    semester: 1,
    unitNumber: 1,
    subjectCode: 'SDSUV-ENG-101',
    subjectNameEn: 'English: Introduction to English Prose',
    subjectNameHi: 'अंग्रेजी: अंग्रेजी गद्य का परिचय',
    chapterEn: 'Unit 1: Forms of Prose & Renaissance Essay',
    chapterHi: 'इकाई 1: गद्य के विविध रूप एवं पुनर्जागरण कालीन निबंध',
    topicEn: 'Bacon Famous Aphorism in "Of Studies"',
    topicHi: 'बेकन का "ऑफ स्टडीज" में सुप्रसिद्ध सूत्र',
    questionEn: 'Complete the famous Baconian aphorism from "Of Studies": "Reading maketh a full man; conference a ready man; and..." and explain its meaning.',
    questionHi: 'बेकन के निबंध "ऑफ स्टडीज" के प्रसिद्ध सूत्र को पूरा कीजिए: "Reading maketh a full man; conference a ready man; and..." तथा इसका अर्थ समझाइए।',
    marks: 2,
    section: 'A',
    type: 'Short',
    repeatedCount: 6,
    yearsAppeared: [2021, 2023, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: `"...writing an exact man." Bacon means that extensive reading enriches the mind with comprehensive knowledge (fullness), intellectual conversation/debate trains quick wit and mental readiness, while the discipline of writing forces precision and exactness of thought.`,
    solutionHi: `"...writing an exact man." (लेखन व्यक्ति को यथार्थ एवं पूर्णतः सटीक बनाता है।) बेकन का तात्पर्य है कि गंभीर अध्ययन से ज्ञान का विस्तार होता है, विचार-विमर्श से प्रत्युत्पन्नमतित्व (शीघ्र उत्तर देने की क्षमता) आती है, तथा लेखन से विचारों में अचूक शुद्धता व यथार्थता आती है।`,
    examinerRubric: [
      'Accurate completion "...writing an exact man" (1 Mark)',
      'Explanation of intellectual precision (1 Mark)',
    ],
    learnTopicId: 't-eng-101',
  },

  // ===================== BSC BIO: BOTANY =====================
  {
    id: 'pyq-b-01',
    stream: 'bsc-bio',
    subjectCode: 'SDSUV-BOT-201',
    subjectNameEn: 'Botany (Plant Physiology)',
    subjectNameHi: 'वनस्पति विज्ञान (पादप कार्यिकी)',
    chapterEn: 'Unit 1: Plant Water Relations',
    chapterHi: 'इकाई 1: पादप जल संबंध',
    topicEn: 'Stomatal Regulation & Levitt Theory',
    topicHi: 'रंध्रीय नियमन एवं लेविट सिद्धांत',
    questionEn: "Describe the active K+ - H+ exchange pump theory of stomatal movements proposed by Levitt. How does abscisic acid (ABA) promote stomatal closure during water stress?",
    questionHi: "लेविट द्वारा प्रतिपादित रंध्रीय गति की सक्रिय K+ - H+ विनिमय पंप संकल्पना का सचित्र वर्णन कीजिए। जल संकट के समय एब्सिसिक एसिड (ABA) रंध्र बंद करने में कैसे भूमिका निभाता है?",
    marks: 15,
    section: 'C',
    type: 'Long',
    repeatedCount: 6,
    yearsAppeared: [2019, 2021, 2022, 2023, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: "In light, guard cell protons (H+) derived from malic acid dissociation are actively pumped out via H+-ATPase. K+ enters guard cells to maintain charge neutrality and associates with malate, reducing water potential. Water enters endosmotically, turgor pressure rises, and thick inner walls pull apart opening the pore. Under drought, ABA inhibits the proton pump and activates K+ efflux channels.",
    solutionHi: "प्रकाश में मैलिक अम्ल से उत्पन्न H+ आयनों को प्रोटॉन पंप द्वारा बाहर निकाला जाता है। संतुलन हेतु K+ आयन अंदर आते हैं और मैलेट से जुड़ते हैं, जिससे जल विभव कम होता है। अंतःपरासरण से स्फीति दाब बढ़ता है और रंध्र खुल जाता है। सूखे में ABA प्रोटॉन पंप को रोककर K+ आयनों को बाहर भेजता है जिससे रंध्र बंद हो जाते हैं।",
    examinerRubric: [
      'Biochemical steps of K+ influx in light (5 Marks)',
      'Osmotic potential & turgidity change mechanism (4 Marks)',
      'Role of ABA under water stress (4 Marks)',
      'Labeled diagram of stomatal apparatus (2 Marks)',
    ],
    learnTopicId: 't-bot-101',
  },
  {
    id: 'pyq-b-02',
    stream: 'bsc-bio',
    subjectCode: 'SDSUV-BOT-201',
    subjectNameEn: 'Botany (Plant Physiology)',
    subjectNameHi: 'वनस्पति विज्ञान (पादप कार्यिकी)',
    chapterEn: 'Unit 2: Photosynthesis Pathways',
    chapterHi: 'इकाई 2: प्रकाश संश्लेषण पथ',
    topicEn: 'C3 Calvin Cycle vs C4 Hatch-Slack',
    topicHi: 'C3 केल्विन चक्र बनाम C4 हैच-स्लैक पथ',
    questionEn: 'Differentiate between C3 and C4 photosynthetic pathways with special reference to Kranz anatomy and photorespiration.',
    questionHi: 'क्रैन्ज शारीरिकी एवं प्रकाश-श्वसन के विशेष संदर्भ में C3 एवं C4 प्रकाश संश्लेषक चक्रों में अंतर स्पष्ट कीजिए।',
    marks: 10,
    section: 'B',
    type: 'Medium',
    repeatedCount: 5,
    yearsAppeared: [2019, 2021, 2022, 2024, 2025],
    frequencyTag: '🔥 Repeated 5+ Times',
    solutionEn: "C3 plants use RuBisCO as primary carboxylase forming 3-PGA, with high photorespiration in hot climates. C4 plants possess dimorphic chloroplasts in Kranz anatomy (mesophyll + bundle sheath), fix CO2 with PEP carboxylase into OAA, eliminating photorespiration and yielding higher water use efficiency.",
    solutionHi: "C3 पौधों में प्राथमिक ग्राही RuBisCO होता है जो 3-PGA बनाता है, जहां उच्च तापमान में प्रकाश-श्वसन से ऊर्जा नष्ट होती है। C4 पौधों में क्रैन्ज शारीरिकी (मीसोफिल व पूलाच्छद) पाई जाती है, जहां प्राथमिक स्थिरीकरण PEP कार्बोक्सिलेज द्वारा होता है जिससे प्रकाश-श्वसन शून्य हो जाता है।",
    examinerRubric: ['Comparison table of 6 points (4 Marks)', 'Kranz anatomy explanation (3 Marks)', 'Photorespiration suppression mechanism (3 Marks)'],
    learnTopicId: 'sdsuv-bio-bot',
  },
];
