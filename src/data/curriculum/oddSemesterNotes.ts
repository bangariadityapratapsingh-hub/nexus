import { MasterTopicNote } from './types';

export const ODD_SEMESTER_MASTER_NOTES: MasterTopicNote[] = [
  // =========================================================================
  // 1. ECONOMICS — SEMESTER 1 — INTRODUCTORY MICROECONOMICS
  // =========================================================================
  {
    id: 'eco-1-1',
    topicSequence: 'Topic 1.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Consumer Equilibrium: Cardinal Utility vs Ordinal Indifference Curve Analysis',
    titleHi: 'उपभोक्ता संतुलन: गणनावाचक उपयोगिता बनाम क्रमवाचक उदासीनता वक्र विश्लेषण',
    subjectCode: 'SDSUV-ECO-101',
    subjectId: 'economics',
    subjectNameEn: 'Economics',
    subjectNameHi: 'अर्थशास्त्र',
    semester: 1,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Consumer Behavior & Demand Analysis',
    unitTitleHi: 'इकाई I: उपभोक्ता व्यवहार एवं मांग विश्लेषण',
    readTime: '15 min read',
    highYieldTag: '🔥 15-Mark Core SDSUV Theory',
    upscTag: 'UPSC Economics Optional / IES',
    sdsuvTag: '🔥 Asked 7x in SDSUV Exams',
    learnTopicId: 't-eco-101',
    youtubeId: 'Z-2vGffv3u4',
    lectureChannel: 'StudyIQ IAS / Drishti IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Indifference+Curve+Consumer+Equilibrium+StudyIQ',
    conclusionEn: 'Ordinal indifference curve analysis provides a superior scientific foundation over Marshallian cardinalism because it dispenses with the unrealistic assumption of constant marginal utility of money and elegantly isolates substitution from income effects.',
    conclusionHi: 'क्रमवाचक उदासीनता वक्र विश्लेषण मार्शल के गणनावाचक दृष्टिकोण से कहीं अधिक वैज्ञानिक है क्योंकि यह मुद्रा की स्थिर सीमांत उपयोगिता की अवास्तविक मान्यता को त्यागकर प्रतिस्थापन व आय प्रभाव को पृथक करता है।',
    contextEn: {
      intro: 'Consumer equilibrium represents the optimal consumption bundle that maximizes total satisfaction subject to budget constraints. While Alfred Marshall treated utility as cardinally measurable in utils, J.R. Hicks and R.G.D. Allen established the ordinal approach using Indifference Curves (IC) based on psychological preference rankings.',
      scholarDefinition: {
        scholar: 'Prof. J.R. Hicks (Value and Capital, 1939)',
        definition: '"An indifference curve is the locus of combinations of two goods between which a consumer is indifferent, yielding identical total utility, underpinned by the principle of Diminishing Marginal Rate of Substitution (MRS_xy)."'
      }
    },
    contextHi: {
      intro: 'उपभोक्ता संतुलन वह स्थिति है जहां उपभोक्ता अपनी सीमित मौद्रिक आय से वस्तुओं के क्रय द्वारा अधिकतम संतुष्टि प्राप्त करता है। मार्शल ने उपयोगिता को यूटिल्स में मापने योग्य (गणनावाचक) माना, जबकि हिक्स एवं एलन ने क्रमवाचक दृष्टिकोण अपनाकर उदासीनता वक्रों के माध्यम से वरीयता क्रम स्थापित किया।',
      scholarDefinition: {
        scholar: 'प्रो. जे.आर. हिक्स (वैल्यू एंड कैपिटल, 1939)',
        definition: '"उदासीनता वक्र दो वस्तुओं के उन विभिन्न संयोजनों का बिंदुपथ है जो उपभोक्ता को समान संतुष्टि प्रदान करते हैं, जिसका आधार घटती सीमांत प्रतिस्थापन दर (MRS_xy) का नियम है।"'
      }
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Two Pillar Framework of Consumer Equilibrium',
      titleHi: 'उपभोक्ता संतुलन का द्वि-स्तंभीय ढांचा',
      columns: [
        {
          titleEn: '1. Indifference Map (Preferences)',
          titleHi: '1. उदासीनता मानचित्र (वरीयता)',
          badge: 'Subjective Utility',
          itemsEn: [
            'Negatively sloped: More of X requires less of Y to maintain utility',
            'Convex to origin: Due to Diminishing MRS_xy = ΔY / ΔX',
            'Non-intersecting: Violating transitivity principle leads to logical contradiction'
          ],
          itemsHi: [
            'ऋणात्मक ढाल: समान संतुष्टि हेतु X की अतिरिक्त इकाई के लिए Y का त्याग आवश्यक',
            'मूल बिंदु की ओर उत्तलोदर: घटती सीमांत प्रतिस्थापन दर (MRS_xy = ΔY / ΔX) के कारण',
            'परस्पर न काटना: दो वक्रों का प्रतिच्छेदन सकर्मकता नियम का उल्लंघन करता है'
          ]
        },
        {
          titleEn: '2. Budget Constraint Line',
          titleHi: '2. बजट रेखा (मौद्रिक सीमा)',
          badge: 'Objective Income',
          itemsEn: [
            'Budget Equation: P_x * Q_x + P_y * Q_y = M (Income)',
            'Slope of Budget Line: Absolute price ratio | -P_x / P_y |',
            'Shifts rightwards with income growth, rotates with relative price change'
          ],
          itemsHi: [
            'बजट समीकरण: P_x * Q_x + P_y * Q_y = M (कुल आय)',
            'बजट रेखा का ढाल: कीमतों का अनुपात | -P_x / P_y |',
            'आय वृद्धि पर दाईं ओर समानांतर खिसकाव, सापेक्ष कीमतों में बदलाव पर घूर्णन'
          ]
        },
        {
          titleEn: '3. Tangency Conditions',
          titleHi: '3. संतुलन की दो आवश्यक शर्तें',
          badge: 'Equilibrium (Point E)',
          itemsEn: [
            'First Order: MRS_xy = P_x / P_y (Slope of IC equals Slope of Budget Line)',
            'Second Order: IC must be strictly convex to origin at tangency point',
            'Corner solution occurs if goods are perfect substitutes or complements'
          ],
          itemsHi: [
            'प्रथम क्रम शर्त: MRS_xy = P_x / P_y (IC का ढाल = बजट रेखा का ढाल)',
            'द्वितीय क्रम शर्त: संतुलन बिंदु पर उदासीनता वक्र अनिवार्यतः उत्तलोदर होना चाहिए',
            'कोने का समाधान (Corner Solution) पूर्ण प्रतिस्थापक वस्तुओं में संभव'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'Mathematical Derivation of the Tangency Condition',
        headingHi: 'स्पर्श रेखा संतुलन की गणितीय व्युत्पत्ति',
        detailEn: 'Along an indifference curve, total differential dU = (∂U/∂X)dX + (∂U/∂Y)dY = 0. Rearranging yields -dY/dX = (∂U/∂X) / (∂U/∂Y) = MU_x / MU_y = MRS_xy. Equating this to the budget line slope P_x / P_y gives MU_x / P_x = MU_y / P_y, confirming harmony with the law of equi-marginal utility without requiring measurable utils.',
        detailHi: 'उदासीनता वक्र पर कुल अवकलन dU = (∂U/∂X)dX + (∂U/∂Y)dY = 0 होता है। पक्षांतरण करने पर -dY/dX = MU_x / MU_y = MRS_xy प्राप्त होता है। इसे बजट रेखा के ढाल P_x / P_y के बराबर रखने पर MU_x / P_x = MU_y / P_y सिद्ध होता है, जो गणनावाचक सम-सीमांत उपयोगिता नियम के साथ संगति दर्शाता है।',
        bulletsEn: [
          'First Order Condition (FOC): MRS_xy = P_x / P_y.',
          'Second Order Condition (SOC): d(MRS_xy)/dX < 0 ensures diminishing rate.',
          'Price effect can be decomposed into Substitution Effect (Hicks/Slutsky) and Income Effect.'
        ],
        bulletsHi: [
          'प्रथम क्रम शर्त (FOC): MRS_xy = P_x / P_y।',
          'द्वितीय क्रम शर्त (SOC): d(MRS_xy)/dX < 0 उत्तलोदरता सुनिश्चित करती है।',
          'मूल्य प्रभाव को हिक्स अथवा स्लट्सकी विधि द्वारा प्रतिस्थापन एवं आय प्रभाव में विभाजित किया जा सकता है।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['Alfred Marshall (1890)', 'Vilfredo Pareto (1906)', 'J.R. Hicks & R.G.D. Allen (1934)', 'Paul Samuelson (1938)'],
      thinkersHi: ['अल्फ्रेड मार्शल (1890)', 'विल्फ्रेडो परेटो (1906)', 'जे.आर. हिक्स एवं आर.जी.डी. एलन (1934)', 'पॉल सैमुएलसन (1938)'],
      recommendedBooksEn: ['Principles of Economics by Alfred Marshall', 'Value and Capital by J.R. Hicks', 'Microeconomic Theory by H.L. Ahuja'],
      recommendedBooksHi: ['उच्चतर व्यष्टि अर्थशास्त्र — एच.एल. आहूजा', 'व्यष्टि अर्थशास्त्र — एम.एल. झिंगन', 'अर्थशास्त्र के सिद्धांत — के.पी. जैन'],
      examQuoteEn: '"Hicks declared: The ordinal method does not require a cardinally calibrated thermometer of pleasure; it requires merely that the consumer knows which bundle he prefers."',
      examQuoteHi: '"हिक्स के अनुसार: क्रमवाचक उपागम को संतुष्टि मापने वाले थर्मामीटर की आवश्यकता नहीं है; इसके लिए केवल यह आवश्यक है कि उपभोक्ता अपने वरीयता क्रम को पहचान सके।"',
      upscConnectionEn: 'UPSC Economics Paper 1 & GS-3: Decomposition of price effect into income and substitution effects for Giffen vs Inferior goods.',
      upscConnectionHi: 'यूपीएससी अर्थशास्त्र वैकल्पिक एवं सामान्य अध्ययन 3: घटिया एवं गिफेन वस्तुओं के संदर्भ में मूल्य प्रभाव का प्रतिस्थापन व आय प्रभाव में विभाजन।',
      topperTipEn: 'In SDSUV 15-mark answers, always draw the tangency diagram showing Point E with labelled tangent line AB and IC2, and contrast with points on IC1 (sub-optimal) and IC3 (unaffordable).',
      topperTipHi: 'एसडीएसयूवी परीक्षा में 15 अंकों के प्रश्न में बजट रेखा AB तथा IC2 के स्पर्श बिंदु E का स्वच्छ चित्र बनाएं तथा IC1 (अपर्याप्त) व IC3 (अप्राप्य) की तुलना अवश्य लिखें।'
    },
    answerBlueprint: {
      questionTitleEn: 'Explain Consumer Equilibrium using Indifference Curves. Why is the tangency condition alone not sufficient? (15 Marks)',
      questionTitleHi: 'उदासीनता वक्रों की सहायता से उपभोक्ता संतुलन की विवेचना कीजिए। केवल स्पर्श रेखा शर्त पर्याप्त क्यों नहीं है? (15 अंक)',
      introductionEn: 'Define consumer equilibrium and introduce the transition from Marshallian cardinal utility to the Hicks-Allen ordinal indifference curve apparatus.',
      introductionHi: 'उपभोक्ता संतुलन की परिभाषा दें तथा मार्शल के गणनावाचक दृष्टिकोण से हिक्स-एलन क्रमवाचक उपागम के विकास को स्पष्ट करें।',
      coreHeadingsEn: [
        '1. Assumptions of Indifference Curve Analysis (Rationality, Transitivity, Monotonicity)',
        '2. Properties of Indifference Curves and Budget Line Mechanics',
        '3. First-Order Condition: Tangency (MRS_xy = P_x / P_y)',
        '4. Second-Order Condition: Convexity requirement (Why concavity violates equilibrium)',
        '5. Mathematical & Diagrammatic Proof with Price Line Tangency'
      ],
      coreHeadingsHi: [
        '1. उदासीनता वक्र विश्लेषण की मूल मान्यताएं (विवेकशीलता, सकर्मकता, घटती MRS)',
        '2. उदासीनता वक्रों की विशेषताएं एवं बजट रेखा का ढाल',
        '3. प्रथम क्रम शर्त: स्पर्श रेखा (MRS_xy = P_x / P_y)',
        '4. द्वितीय क्रम शर्त: उत्तलोदरता की अनिवार्यता (नतोदर वक्र में संतुलन का खंडन)',
        '5. रेखाचित्र एवं गणितीय संतुलन बिंदु E का निरूपण'
      ],
      conclusionEn: 'Conclude with Samuelson’s Revealed Preference Theory as the empirical evolution of the indifference technique.',
      conclusionHi: 'सैमुएलसन के उद्घाटित अधिमान सिद्धांत को उदासीनता तकनीक के अनुभवजन्य विकास के रूप में उद्धृत करते हुए उत्तर समाप्त करें।'
    },
    commonMistakes: [
      {
        mistakeEn: 'Stating that MRS_xy = P_x / P_y is the sole condition for equilibrium without verifying convexity.',
        mistakeHi: 'केवल स्पर्श रेखा (MRS_xy = P_x / P_y) को संतुलन मान लेना और उत्तलोदरता की द्वितीय शर्त को छोड़ देना।',
        correctionEn: 'Examiners deduct 4 marks if the second-order condition (IC must be convex to origin at point of tangency) is omitted.',
        correctionHi: 'परीक्षक 4 अंक काटते हैं यदि द्वितीय क्रम शर्त (संतुलन बिंदु पर वक्र का मूल बिंदु की ओर उत्तलोदर होना) न दर्शाई जाए।'
      }
    ],
    mcqs: [
      {
        questionEn: 'At the point of consumer equilibrium with two goods X and Y, the slope of the indifference curve is:',
        questionHi: 'दो वस्तुओं X और Y के उपभोक्ता संतुलन बिंदु पर उदासीनता वक्र का ढाल होता है:',
        optionsEn: ['Greater than P_x / P_y', 'Less than P_x / P_y', 'Equal to P_x / P_y', 'Zero'],
        optionsHi: ['P_x / P_y से अधिक', 'P_x / P_y से कम', 'P_x / P_y के बराबर', 'शून्य'],
        correctIndex: 2,
        explanationEn: 'At tangency equilibrium, the slope of the indifference curve (MRS_xy) equals the slope of the budget line (P_x / P_y).',
        explanationHi: 'स्पर्श संतुलन बिंदु पर उदासीनता वक्र का ढाल (MRS_xy) बजट रेखा के ढाल (P_x / P_y) के ठीक बराबर होता है।'
      }
    ]
  },

  // =========================================================================
  // 2. ECONOMICS — SEMESTER 3 — INDIAN ECONOMY & UTTARAKHAND
  // =========================================================================
  {
    id: 'eco-3-1',
    topicSequence: 'Topic 3.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Structure of Uttarakhand Mountain Economy: Remittance Dependency, Fragmentation & Palayan',
    titleHi: 'उत्तराखंड की पर्वतीय अर्थव्यवस्था: मनी-ऑर्डर निर्भरता, चकबंदी अभाव एवं पलायन की समस्याएं',
    subjectCode: 'SDSUV-ECO-301',
    subjectId: 'economics',
    subjectNameEn: 'Economics',
    subjectNameHi: 'अर्थशास्त्र',
    semester: 3,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Structure of Indian & Regional Mountain Economy',
    unitTitleHi: 'इकाई I: भारतीय एवं क्षेत्रीय पर्वतीय अर्थव्यवस्था की संरचना',
    readTime: '16 min read',
    highYieldTag: '🔥 SDSUV 15-Mark State Economy Question',
    upscTag: 'UKPSC Mains GS-III / NITI Aayog',
    sdsuvTag: '🔥 Compulsory 15-Mark Paper III Question',
    learnTopicId: 't-eco-301',
    youtubeId: 'U_lE79hYVqQ',
    lectureChannel: 'Drishti IAS UKPSC / Sansad TV',
    searchFallback: 'https://www.youtube.com/results?search_query=Uttarakhand+Economy+Palayan+Money+Order+Drishti+IAS',
    conclusionEn: 'Sustainable mountain development requires transitioning from a fragile remittance-driven subsistence model to high-value horticulture, aromatic farming, ecotourism, and cluster-based rural processing centers.',
    conclusionHi: 'पर्वतीय अर्थव्यवस्था का धारणीय विकास मनी-ऑर्डर आधारित निर्वाह कृषि से उच्च मूल्यवान सगंध पादप, सेब-कीवी बागवानी, होमस्टे पर्यटन एवं क्लस्टर आधारित ग्रामीण प्रसंस्करण उद्योगों में रूपांतरण पर निर्भर है।',
    contextEn: {
      intro: 'The economic topography of Uttarakhand exhibits a profound hill-plain asymmetry. While the plain districts (Haridwar, Udham Singh Nagar, Dehradun) drive over 80% of state manufacturing and GST revenue, the 10 hill districts contend with rugged terrain, terraced subsistence agriculture, severe land fragmentation, and chronic out-migration (Palayan).',
      scholarDefinition: {
        scholar: 'Uttarakhand Rural Development and Migration Commission (2023 Report)',
        definition: '"Over 1,700 villages in Uttarakhand have turned into semi-deserted or ghost villages (Bhootaha Gaon) primarily due to lack of medical infrastructure, quality schooling, and remunerative agrarian livelihood opportunities in the Himalayan ridges."'
      }
    },
    contextHi: {
      intro: 'उत्तराखंड की अर्थव्यवस्था में पर्वतीय बनाम मैदानी जनपदों के मध्य तीव्र विषमता पाई जाती है। राज्य के कुल औद्योगिक उत्पादन व जीएसटी का 80% से अधिक हिस्सा तीन मैदानी जिलों (हरिद्वार, उधमसिंह नगर, देहरादून) में केंद्रित है, जबकि 10 पर्वतीय जिले सीढ़ीदार निर्वाह कृषि, भूमि विखंडन एवं पलायन की विभीषिका से जूझ रहे हैं।',
      scholarDefinition: {
        scholar: 'उत्तराखंड ग्राम्य विकास एवं पलायन आयोग (2023 रिपोर्ट)',
        definition: '"उत्तराखंड के 1700 से अधिक गांव पूर्ण या आंशिक रूप से जनशून्य (भूतहा गांव) हो चुके हैं, जिसका प्राथमिक कारण पर्वतीय क्षेत्रों में गुणवत्तापूर्ण शिक्षा, स्वास्थ्य सेवाओं एवं लाभकारी कृषि आजीविका के अवसरों का अभाव है।"'
      }
    },
    flowchart: {
      diagramType: 'process',
      titleEn: 'Vicious Cycle of Hill Agrarian Distress in Uttarakhand',
      titleHi: 'उत्तराखंड पर्वतीय कृषि संकट का दुष्चक्र',
      columns: [
        {
          titleEn: '1. Structural Bottlenecks',
          titleHi: '1. आधारभूत संरचनात्मक अवरोध',
          badge: 'Topographical Limits',
          itemsEn: [
            'Tiny scattered holdings (< 0.5 hectare average per household)',
            'Over 88% unirrigated rainfed terraced slopes',
            'Severe crop damage by wild boars, monkeys, and leopards'
          ],
          itemsHi: [
            'अत्यधिक विखंडित एवं छोटी जोतें (औसत 0.5 हेक्टेयर से कम)',
            '88% से अधिक कृषि वर्षा-आधारित असिंचित सीढ़ीदार खेतों पर निर्भर',
            'बंदर, जंगली सूअर एवं आवारा पशुओं द्वारा फसलों का व्यापक विनाश'
          ]
        },
        {
          titleEn: '2. Remittance Trap',
          titleHi: '2. मनी-ऑर्डर निर्भरता',
          badge: 'Money-Order Economy',
          itemsEn: [
            'Male youth migrate to Delhi, Chandigarh, armed forces',
            'Elderly and women left behind (Feminization of agriculture)',
            'Remittance meets daily grain needs without capital reinvestment'
          ],
          itemsHi: [
            'सशस्त्र बलों व महानगरों में पुरुषों का व्यापक रोजगार पलायन',
            'गांवों में केवल वृद्ध व महिलाएं शेष (कृषि का नारीकरण)',
            'मनी-ऑर्डर से दैनिक उपभोग पूरा होता है, उत्पादक पूंजी निवेश नहीं'
          ]
        },
        {
          titleEn: '3. Strategic Solutions',
          titleHi: '3. नीतिगत समाधान',
          badge: 'Reverse Migration',
          itemsEn: [
            'Voluntary Land Consolidation (Chakbandi) Act enforcement',
            'High-value aromatic crops (Lavender, Damask Rose, Lemongrass)',
            'Homestay Ecotourism & GI Tag promotion (Munsiyari Rajma, Red Rice)'
          ],
          itemsHi: [
            'पर्वतीय क्षेत्रों हेतु स्वैच्छिक चकबंदी कानून का कड़ाई से क्रियान्वयन',
            'सगंध एवं औषधीय पादप मिशन (लैवेंडर, दमिश्क गुलाब, लेमनग्रास)',
            'होमस्टे पर्यटन एवं जीआई टैग उत्पाद (मुनस्यारी राजमा, लाल चावल)'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'The Asymmetric Dual Economy: Hills vs Plains',
        headingHi: 'पर्वतीय बनाम मैदानी विषमता का द्वैध मॉडल',
        detailEn: 'Economic planning in Uttarakhand is challenged by geographic dichotomy. Industrial corridors like SIDCUL (Pantnagar, Haridwar, Sitarganj) absorb state capital subsidies, while hill districts suffer negative population growth in Almora and Pauri Garhwal as per Census 2011.',
        detailHi: 'सिडकुल (पंतनगर, हरिद्वार, सितारगंज) के माध्यम से मैदानी जिलों में औद्योगीकरण तीव्र हुआ, किंतु अल्मोड़ा और पौड़ी गढ़वाल जैसे जनपदों ने 2001-2011 के दौरान ऋणात्मक जनसंख्या वृद्धि दर्ज की, जो निरंतर जनसांख्यिकीय ह्रास का प्रमाण है।',
        bulletsEn: [
          'Negative decadal growth: Almora (-1.28%) and Pauri (-1.41%).',
          'Feminization of mountain agriculture without land ownership rights.',
          'Underdeveloped cold-chain infrastructure for temperate hill horticulture.'
        ],
        bulletsHi: [
          'ऋणात्मक दशकीय वृद्धि: अल्मोड़ा (-1.28%) एवं पौड़ी गढ़वाल (-1.41%)।',
          'भूमि स्वामित्व के अभाव में कृषि का नारीकरण (Feminization of Agriculture)।',
          'शीतोष्ण बागवानी उत्पादों हेतु कोल्ड-चेन व प्रसंस्करण केंद्रों की कमी।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['Dr. R.S. Tolia', 'Prof. B.S. Chimwal', 'Chandi Prasad Bhatt', 'Dr. Shekhar Pathak'],
      thinkersHi: ['डॉ. आर.एस. टोलिया', 'प्रो. बी.एस. चिमवाल', 'चंडी प्रसाद भट्ट', 'डॉ. शेखर पाठक'],
      recommendedBooksEn: ['Mountain Economy of Uttarakhand by R.S. Tolia', 'Uttarakhand: Development and Environment by Shekhar Pathak'],
      recommendedBooksHi: ['उत्तराखंड की आर्थिकी एवं पलायन — पलायन आयोग रिपोर्ट', 'हिमालयी समाज और पर्यावरण — डॉ. शेखर पाठक'],
      examQuoteEn: '"Quote: Dr. R.S. Tolia observed: Uttarakhand cannot develop on a cloned plains economic template; mountain development demands mountain-specific niche bio-economic models."',
      examQuoteHi: '"उद्धरण: डॉ. आर.एस. टोलिया के अनुसार: उत्तराखंड का विकास मैदानी विकास के मॉडल की नकल से संभव नहीं; पर्वतीय आर्थिकी को पर्वत-विशिष्ट जैविक व स्थानीय मॉडल की आवश्यकता है।"',
      upscConnectionEn: 'UKPSC Mains Paper 6 & GS-3: Measures needed to revitalize agrarian economy in Himalayan river valleys.',
      upscConnectionHi: 'यूकेपीएससी मुख्य परीक्षा प्रश्नपत्र 6 एवं सामान्य अध्ययन 3: उत्तराखंड की पर्वतीय घाटियों में कृषि पुनर्जीवन हेतु आवश्यक कदम।',
      topperTipEn: 'Mention the Migration Commission data and cite 3 specific GI tag crops (Kafal, Almora Bal Mithai, Ringal Craft) to secure top marks.',
      topperTipHi: 'पलायन आयोग की रिपोर्ट के आंकड़े तथा 3 स्थानीय जीआई उत्पादों (मुनस्यारी राजमा, रिंगाल शिल्प, बाल मिठाई) का उल्लेख अवश्य करें।'
    }
  },

  // =========================================================================
  // 3. ECONOMICS — SEMESTER 5 — MACROECONOMICS & PUBLIC FINANCE
  // =========================================================================
  {
    id: 'eco-5-1',
    topicSequence: 'Topic 5.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Hicks-Hansen IS-LM Synthesis: Simultaneous Goods and Money Market Equilibrium',
    titleHi: 'हिक्स-हैनसेन IS-LM समन्वय: वस्तु एवं मुद्रा बाजार का युगपत संतुलन',
    subjectCode: 'SDSUV-ECO-501',
    subjectId: 'economics',
    subjectNameEn: 'Economics',
    subjectNameHi: 'अर्थशास्त्र',
    semester: 5,
    unitNumber: 1,
    unitTitleEn: 'Unit I: IS-LM General Equilibrium Framework',
    unitTitleHi: 'इकाई I: IS-LM सामान्य संतुलन ढांचा',
    readTime: '18 min read',
    highYieldTag: '🔥 15-Mark Macroeconomics Foundation',
    upscTag: 'UPSC Economics Paper 1 / RBI Grade B',
    sdsuvTag: '🔥 Asked in Every Alternate Year',
    learnTopicId: 't-eco-501',
    youtubeId: 'Ww2J2E5E1b8',
    lectureChannel: 'StudyIQ IAS / IGNOU eGyanKosh',
    searchFallback: 'https://www.youtube.com/results?search_query=IS+LM+Model+Hicks+Hansen+StudyIQ',
    conclusionEn: 'The IS-LM model synthesizes classical real factors (saving and investment) with Keynesian monetary variables (liquidity preference and money supply), providing central banks and treasuries a unified compass to calibrate fiscal and monetary policy mixes.',
    conclusionHi: 'IS-LM मॉडल प्रतिष्ठित वास्तविक चरों (बचत व निवेश) तथा कीन्स के मौद्रिक चरों (तरलता अधिमान व मुद्रा पूर्ति) का समन्वय प्रस्तुत करता है, जिससे राजकोषीय व मौद्रिक नीतियों के प्रभाव का सटीक आकलन संभव होता है।',
    contextEn: {
      intro: 'Classical theorists determined interest rates via loanable funds (S=I), while J.M. Keynes argued interest was purely monetary determined by liquidity preference (L=M). In 1937, Sir John Hicks published "Mr. Keynes and the Classics: A Suggested Interpretation", introducing the IS-LL model, later refined by Alvin Hansen into the celebrated IS-LM synthesis.',
      scholarDefinition: {
        scholar: 'Sir John Hicks (Econometrica, 1937)',
        definition: '"Equilibrium national income and rate of interest cannot be determined by the goods market or money market in isolation; they are simultaneously determined at the intersection of the IS curve (Investment-Saving) and the LM curve (Liquidity preference-Money supply)."'
      }
    },
    contextHi: {
      intro: 'प्रतिष्ठित अर्थशास्त्रियों ने ब्याज दर को वास्तविक चरों (बचत व निवेश) से निर्धारित माना, जबकि कीन्स ने इसे विशुद्ध मौद्रिक घटना कहा। 1937 में जॉन हिक्स ने दोनों का समन्वय करते हुए IS-LM वक्र मॉडल विकसित किया, जिसे बाद में एल्विन हैनसेन ने पूर्णता प्रदान की।',
      scholarDefinition: {
        scholar: 'सर जॉन हिक्स (इकोनोमेट्रिका, 1937)',
        definition: '"राष्ट्रीय आय और ब्याज दर का निर्धारण वस्तु बाजार अथवा मुद्रा बाजार द्वारा अलग-अलग नहीं किया जा सकता; इनका युगपत निर्धारण उस बिंदु पर होता है जहां IS वक्र (निवेश-बचत) और LM वक्र (तरलता अधिमान-मुद्रा पूर्ति) एक दूसरे को काटते हैं।"'
      }
    },
    flowchart: {
      diagramType: 'comparison',
      titleEn: 'Dual Market Components in the IS-LM Equilibrium',
      titleHi: 'IS-LM सामान्य संतुलन के दो प्रमुख बाजार घटक',
      columns: [
        {
          titleEn: 'IS Curve (Goods Market)',
          titleHi: 'IS वक्र (वस्तु बाजार)',
          badge: 'Real Sector (I = S)',
          itemsEn: [
            'Negatively sloped: Lower interest rates stimulate private investment, boosting aggregate output',
            'Shift factors: Expansionary fiscal policy (increased Government spending or tax cuts) shifts IS rightwards',
            'Slope determined by investment interest elasticity and Keynesian multiplier k = 1/(1-MPC)'
          ],
          itemsHi: [
            'ऋणात्मक ढाल: ब्याज दर घटने पर निजी निवेश बढ़ता है जिससे समग्र उत्पादन व आय बढ़ती है',
            'खिसकाव कारक: विस्तारकारी राजकोषीय नीति (सरकारी व्यय में वृद्धि या कर कटौती) IS को दाईं ओर खिसकाती है',
            'ढाल का आधार: निवेश की ब्याज लोचशीलता तथा कीन्सियन गुणक k = 1/(1-MPC)'
          ]
        },
        {
          titleEn: 'LM Curve (Money Market)',
          titleHi: 'LM वक्र (मुद्रा बाजार)',
          badge: 'Monetary Sector (L = M)',
          itemsEn: [
            'Positively sloped: Higher national income increases transaction demand for money, pushing up interest rate',
            'Shift factors: Increase in nominal money supply by RBI shifts LM rightwards',
            'Contains Keynesian Liquidity Trap: Flat horizontal LM segment at very low interest rates'
          ],
          itemsHi: [
            'धनात्मक ढाल: राष्ट्रीय आय बढ़ने पर लेनदेन हेतु मुद्रा की मांग बढ़ती है जिससे ब्याज दर बढ़ती है',
            'खिसकाव कारक: आरबीआई द्वारा मुद्रा पूर्ति में वृद्धि LM वक्र को दाईं ओर खिसकाती है',
            'तरलता जाल (Liquidity Trap): अत्यंत कम ब्याज दर पर LM वक्र का क्षैतिज हो जाना'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'Fiscal and Monetary Policy Effectiveness: The Crowding Out Phenomenon',
        headingHi: 'राजकोषीय व मौद्रिक नीति की प्रभावशीलता एवं क्राउडिंग आउट प्रभाव',
        detailEn: 'When government increases spending (shifting IS right to IS’), national income rises, but the increased transaction demand pushes up interest rates from r1 to r2. This higher interest rate dampens private capital expenditure, known as Financial Crowding Out. The net expansion in output is smaller than the simple Keynesian multiplier prediction.',
        detailHi: 'जब सरकार व्यय बढ़ाती है (IS दाईं ओर खिसकता है), तो आय में वृद्धि से लेनदेन मांग बढ़ती है और ब्याज दर r1 से बढ़कर r2 हो जाती है। ऊंची ब्याज दर निजी निवेश को कम करती है, जिसे क्राउडिंग आउट (Crowding Out) कहा जाता है। अतः वास्तविक आय वृद्धि कीन्सियन गुणक की तुलना में कम होती है।',
        bulletsEn: [
          'Steeper LM curve implies stronger crowding-out and weaker fiscal policy effectiveness.',
          'Liquidity Trap (flat LM): Fiscal policy exhibits maximum multiplier power with zero crowding-out.',
          'Classical Case (vertical LM): Fiscal policy produces 100% crowding out; only monetary policy is effective.'
        ],
        bulletsHi: [
          'LM वक्र जितना अधिक ढलुआ होगा, क्राउडिंग आउट उतना तीव्र होगा और राजकोषीय नीति कमजोर होगी।',
          'तरलता जाल (क्षैतिज LM): राजकोषीय नीति शून्य क्राउडिंग आउट के साथ अधिकतम प्रभावी होती है।',
          'प्रतिष्ठित स्थिति (लंबवत LM): राजकोषीय नीति का पूर्ण क्राउडिंग आउट होता है, केवल मौद्रिक नीति प्रभावी रहती है।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['John Maynard Keynes', 'Sir John Hicks', 'Alvin Hansen', 'Robert Mundell (IS-LM-BP)'],
      thinkersHi: ['जॉन मेनार्ड कीन्स', 'सर जॉन हिक्स', 'एल्विन हैनसेन', 'रॉबर्ट मुंडेल (Mundell-Fleming)'],
      recommendedBooksEn: ['Macroeconomic Theory by Richard Froyen', 'Macroeconomics by Dornbusch, Fischer & Startz'],
      recommendedBooksHi: ['समष्टि अर्थशास्त्र — एच.एल. आहूजा', 'मौद्रिक अर्थशास्त्र — एम.एल. झिंगन'],
      examQuoteEn: '"Hicks’ celebrated dictum: Income and interest rate are mutually determined like scissor blades cutting cloth."',
      examQuoteHi: '"हिक्स का प्रसिद्ध सूत्र: आय और ब्याज दर कैंची के दो फलकों की तरह एक दूसरे के सहयोग से निर्धारित होते हैं।"',
      upscConnectionEn: 'UPSC Economics Paper 1: Effectiveness of monetary vs fiscal policy under fixed and floating exchange rates (Mundell-Fleming model).',
      upscConnectionHi: 'यूपीएससी अर्थशास्त्र: स्थिर एवं परिवर्तनशील विनिमय दर में मुंडेल-फ्लेमिंग मॉडल के अंतर्गत राजकोषीय बनाम मौद्रिक नीति की प्रभावशीलता।'
    }
  },

  // =========================================================================
  // 4. SANSKRIT — SEMESTER 1 — GRAMMAR & NITI POETRY
  // =========================================================================
  {
    id: 'san-1-1',
    topicSequence: 'Topic 1.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Paninian Phonetics & Sandhi: Ach (Vowel), Hal (Consonant) and Visarga Sutras',
    titleHi: 'पाणिनीय व्याकरण एवं सन्धि प्रकरण: अच्, हल् एवं विसर्ग सन्धि के प्रमुख विधायक सूत्र',
    subjectCode: 'SDSUV-SAN-101',
    subjectId: 'sanskrit',
    subjectNameEn: 'Sanskrit Literature',
    subjectNameHi: 'संस्कृत साहित्य',
    semester: 1,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Laghusiddhantakaumudi (Sandhi Prakaranam)',
    unitTitleHi: 'इकाई I: लघुसिद्धान्तकौमुदी (सन्धि प्रकरणम्)',
    readTime: '15 min read',
    highYieldTag: '🔥 15-Mark Core SDSUV Grammatical Section',
    upscTag: 'UPSC Sanskrit Optional Paper 2',
    sdsuvTag: '🔥 Compulsory 15-Mark Grammar Question',
    learnTopicId: 't-san-101',
    youtubeId: 'aYhG8vK32jY',
    lectureChannel: 'Rashtriya Sanskrit Sansthan / Drishti Sanskrit',
    searchFallback: 'https://www.youtube.com/results?search_query=Laghusiddhantakaumudi+Sandhi+Prakaran+Sanskrit',
    conclusionEn: 'Panini’s Ashtadhyayi represents the apex of generative phonological grammar in antiquity; mastering the 14 Maheshwara Sutras and pratyahara formation is essential for accurate textual decoding in Sanskrit literature.',
    conclusionHi: 'पाणिनि की अष्टाध्यायी प्राचीन विश्व में स्वनिम एवं रूपात्मक व्याकरण की सर्वोच्च वैज्ञानिक उपलब्धि है; 14 माहेश्वर सूत्रों एवं प्रत्याहारों का ज्ञान संस्कृत साहित्य के सटीक अवगाहन हेतु अनिवार्य आधार है।',
    contextEn: {
      intro: 'In Varadaraja’s Laghusiddhantakaumudi, Sandhi (euphonic phonological assimilation) is classified under Samhita (extreme proximity of phonemes as defined by "परः संनिकर्षः संहिता"). Sandhi is split into three primary branches: Ach Sandhi (vowels), Hal Sandhi (consonants), and Visarga Sandhi.',
      scholarDefinition: {
        scholar: 'Acharya Varadaraja (Laghusiddhantakaumudi)',
        definition: '"संहितैकपदे नित्या नित्या धातूपसर्गयोः। नित्या समासे वाक्ये तु सा विवक्षामपेक्षते॥ (Sandhi is mandatory in a single word, in verb-prefixes, and in compounds; in an independent sentence, it depends upon the speaker’s choice)."'
      }
    },
    contextHi: {
      intro: 'वरदराज कृत लघुसिद्धान्तकौमुदी में सन्धि का विवेचन "परः संनिकर्षः संहिता" सूत्र के आधार पर किया गया है। वर्णों की अत्यंत सन्निकटता के कारण होने वाले ध्वन्यात्मक विकार को सन्धि कहते हैं। इसके तीन प्रमुख भेद हैं: अच् सन्धि (स्वर), हल् सन्धि (व्यंजन) एवं विसर्ग सन्धि।',
      scholarDefinition: {
        scholar: 'आचार्य वरदराज (लघुसिद्धान्तकौमुदी)',
        definition: '"संहितैकपदे नित्या नित्या धातूपसर्गयोः। नित्या समासे वाक्ये तु सा विवक्षामपेक्षते॥ अर्थात् एक पद में, धातु व उपसर्ग के मध्य तथा समास में सन्धि अनिवार्य है; किंतु वाक्य में यह वक्ता की इच्छा पर निर्भर करती है।"'
      }
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Paninian Threefold Sandhi Architecture',
      titleHi: 'पाणिनीय सन्धि के तीन प्रमुख आधारभूत भेद',
      columns: [
        {
          titleEn: '1. Ach Sandhi (Vowels)',
          titleHi: '1. अच् (स्वर) सन्धि',
          badge: 'Sutra Rules',
          itemsEn: [
            'Yan Sandhi: "इको यणचि" (इ, उ, ऋ, ऌ become य्, व्, र्, ल् before vowels)',
            'Guna Sandhi: "आद्गुणः" (अ/आ + इ/उ/ऋ = ए, ओ, अर्)',
            'Vriddhi Sandhi: "वृद्धिरेचि" (अ/आ + ए/ओ/ऐ/औ = ऐ, औ)'
          ],
          itemsHi: [
            'यण् सन्धि: "इको यणचि" (इक् प्रत्याहार के स्थान पर यण् आदेश — यदि अच् परे हो)',
            'गुण सन्धि: "आद्गुणः" (अ/आ के बाद इ, उ, ऋ आने पर क्रमशः ए, ओ, अर् गुण आदेश)',
            'वृद्धि सन्धि: "वृद्धिरेचि" (अ/आ के बाद एच प्रत्याहार परे होने पर वृद्धि ऐ, औ)'
          ]
        },
        {
          titleEn: '2. Hal Sandhi (Consonants)',
          titleHi: '2. हल् (व्यंजन) सन्धि',
          badge: 'Assimilation',
          itemsEn: [
            'Shchutva Sandhi: "स्तोः श्चुना श्चुः" (स, तवर्ग become श, चवर्ग)',
            'Jashtva Sandhi: "झलां जशोऽन्ते" (Plosives become 3rd consonants ग, ज, ड, द, ब)',
            'Anusvara Sandhi: "मोऽनुस्वारः" (म् becomes dot anusvara before consonants)'
          ],
          itemsHi: [
            'श्चुत्व सन्धि: "स्तोः श्चुना श्चुः" (स/तवर्ग का श/चवर्ग से योग होने पर श/चवर्ग आदेश)',
            'जश्त्व सन्धि: "झलां जशोऽन्ते" (पदान्त झल् वर्णों के स्थान पर तृतीय वर्ण जश् आदेश)',
            'अनुस्वार सन्धि: "मोऽनुस्वारः" (हल् परे होने पर पदान्त म् का अनुस्वार में परिवर्तन)'
          ]
        },
        {
          titleEn: '3. Visarga Sandhi',
          titleHi: '3. विसर्ग सन्धि',
          badge: 'Visarga Mutations',
          itemsEn: [
            'Sattvam: "विसर्जनीयस्य सः" (Visarga becomes स् before khar consonants)',
            'Utvam: "अतो रोरप्लुतादप्लुते" (रु becomes उ, merging to form ओ)',
            'Lopa: "रो रि" (When र् is followed by र्, first र् elides and preceding vowel lengthens)'
          ],
          itemsHi: [
            'सत्व: "विसर्जनीयस्य सः" (खर् प्रत्याहार परे होने पर विसर्ग का स् होना)',
            'उत्व: "अतो रोरप्लुतादप्लुते" (ह्रस्व अ के बाद रु का उ होकर गुण ओ बनना)',
            'लोप: "रो रि" एवं "ढ्रलोपे पूर्वस्य दीर्घोऽणः" (र् के बाद र् होने पर पूर्व र् का लोप व दीर्घीकरण)'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'Exemplary Sutra Derivation: "Iko Yanachi" (इको यणचि)',
        headingHi: 'प्रमुख विधायक सूत्र की सोदाहरण सिद्धि: "इको यणचि"',
        detailEn: 'Sutra components: इक् (षष्ठी विभक्ति, स्थाने), यण् (प्रथमा विभक्ति, आदेश), अचि (सप्तमी विभक्ति, परे). Meaning: In place of letters belonging to Ik pratyahara (इ, उ, ऋ, ऌ), letters of Yan pratyahara (य्, व्, र्, ल्) are substituted when followed by any dissimilar vowel (Ach). Example: सुधी + उपास्यः = सुध्युपास्यः; यदि + अपि = यद्यपि; मधु + अरिः = मध्वरिः.',
        detailHi: 'सूत्र संरचना: इक् (षष्ठी, स्थान पर), यण् (प्रथमा, आदेश), अचि (सप्तमी, परे रहने पर)। नियम: इक् प्रत्याहार (इ, उ, ऋ, ऌ) के स्थान पर यण् (य्, व्, र्, ल्) आदेश होता है यदि असमान स्वर (अच्) बाद में हो। उदाहरण: सुधी + उपास्यः = सुध्युपास्यः; यदि + अपि = यद्यपि; मधु + अरिः = मध्वरिः; पितृ + आज्ञा = पित्राज्ञा।',
        bulletsEn: [
          'Ik pratyahara: 4 phonemes (i, u, ri, lri).',
          'Yan pratyahara: 4 semi-vowels (y, v, r, l).',
          'Antaratamya criterion (स्थानतः सादृश्य) governs exact pairing.'
        ],
        bulletsHi: [
          'इक् प्रत्याहार में 4 वर्ण आते हैं: इ, उ, ऋ, ऌ।',
          'यण् प्रत्याहार में 4 अंतःस्थ वर्ण आते हैं: य्, व्, र्, ल्।',
          '"स्थानेऽन्तरतमः" नियम के अनुसार उच्चारण स्थान की समानता से सटीक वर्ण चयन होता है।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['Maharshi Panini (Ashtadhyayi)', 'Vararuchi / Katyayana (Varttika)', 'Patanjali (Mahabhashya)', 'Bhattoji Dikshita', 'Varadaraja'],
      thinkersHi: ['महर्षि पाणिनि (अष्टाध्यायी)', 'कात्यायन / वररुचि (वार्तिक)', 'महर्षि पतंजलि (महाभाष्य)', 'भट्टोजी दीक्षित (सिद्धान्तकौमुदी)', 'आचार्य वरदराज'],
      recommendedBooksEn: ['Laghusiddhantakaumudi with Bhaimi Commentary', 'Higher Sanskrit Grammar by M.R. Kale'],
      recommendedBooksHi: ['लघुसिद्धान्तकौमुदी — भैमी व्याख्या (भीमसेन शास्त्री)', 'संस्कृत व्याकरण प्रवेशिका — बाबूराम सक्सेना'],
      examQuoteEn: '"मुनित्रयं नमस्कृत्य तदुक्तीः परिभाव्य च। वैयाकरणसिद्धान्तकौमुदीयं विरच्यते॥"',
      examQuoteHi: '"पाणिनि, कात्यायन एवं पतंजलि — इन तीन मुनियों को प्रणाम कर व्याकरण सिद्धांतों का निरूपण किया जाता है।"'
    }
  },

  // =========================================================================
  // 5. ENGLISH LITERATURE — SEMESTER 1 — POETRY & PROSE
  // =========================================================================
  {
    id: 'eng-1-1',
    topicSequence: 'Topic 1.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'The English Renaissance Essay: Francis Bacon’s Aphoristic Style and Worldly Wisdom',
    titleHi: 'अंग्रेजी पुनर्जागरण कालीन निबंध: फ्रांसिस बेकन की सूत्रपरक शैली एवं सांसारिक प्रज्ञा',
    subjectCode: 'SDSUV-ENG-101',
    subjectId: 'english',
    subjectNameEn: 'English Literature',
    subjectNameHi: 'अंग्रेजी साहित्य',
    semester: 1,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Forms of Prose & Renaissance Essayists',
    unitTitleHi: 'इकाई I: गद्य के स्वरूप एवं पुनर्जागरण निबंधकार',
    readTime: '15 min read',
    highYieldTag: '🔥 15-Mark Core SDSUV English Literature Question',
    upscTag: 'UPSC English Literature Optional Paper 1',
    sdsuvTag: '🔥 Asked 6x in SDSUV Semester Exams',
    learnTopicId: 't-eng-101',
    youtubeId: 'vC_m9gqT6rI',
    lectureChannel: 'Drishti IAS English / CEC SWAYAM',
    searchFallback: 'https://www.youtube.com/results?search_query=Francis+Bacon+Of+Studies+English+Literature+Lecture',
    conclusionEn: 'Bacon remains the father of the English essay not for intimate self-revelation like Montaigne, but for his utilitarian, pragmatic moral realism and compressed, quotable Latinate aphorisms that dissect human motives with surgical precision.',
    conclusionHi: 'फ्रांसिस बेकन को अंग्रेजी निबंध का जनक माना जाता है; मॉन्टेन की भांति व्यक्तिगत भावनाओं के बजाय उन्होंने उपयोगितावादी, व्यावहारिक सांसारिक ज्ञान तथा संक्षिप्त, सूक्तिपरक लैटिन शैली में मानव स्वभाव का यथार्थवादी विश्लेषण प्रस्तुत किया।',
    contextEn: {
      intro: 'Francis Bacon (1561–1626), Lord Chancellor of England, introduced the essay form into English literature, modeled on Michel de Montaigne’s "Essais" (1580). While Montaigne was introspective, conversational, and subjective, Bacon was objective, utilitarian, and prudential, famously calling his essays "dispersed meditations."',
      scholarDefinition: {
        scholar: 'Alexander Pope (An Essay on Man)',
        definition: '"If parts allure thee, think how Bacon shin’d, / The wisest, brightest, meanest of mankind!"'
      }
    },
    contextHi: {
      intro: 'फ्रांसिस बेकन (1561-1626) ने फ्रांसीसी दार्शनिक मॉन्टेन की प्रेरणा से अंग्रेजी साहित्य में निबंध विधा का सूत्रपात किया। मॉन्टेन के आत्मपरक व भावुक दृष्टिकोण के विपरीत, बेकन का दृष्टिकोण उपयोगितावादी, व्यावहारिक एवं राजनीति-सम्मत सांसारिक बुद्धि पर आधारित था।',
      scholarDefinition: {
        scholar: 'अलेक्जेंडर पोप (एन एस्से ऑन मैन)',
        definition: '"यदि प्रतिभा तुम्हें आकर्षित करती है, तो विचार करो कि बेकन किस प्रकार चमका—मानव जाति का सबसे बुद्धिमान, सबसे तेजस्वी, किंतु स्वार्थ में सबसे क्षुद्र व्यक्ति!"'
      }
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Tripartite Axioms in Bacon’s "Of Studies"',
      titleHi: 'बेकन के निबंध "ऑफ स्टडीज" के तीन प्रमुख त्रिसूत्रीय आधार',
      columns: [
        {
          titleEn: '1. Purposes of Studies',
          titleHi: '1. अध्ययन के तीन प्रयोजन',
          badge: 'Delight, Ornament, Ability',
          itemsEn: [
            '"Studies serve for delight in privateness and retiring"',
            '"For ornament in discourse and societal conversation"',
            '"For ability in the judgment and disposition of business"'
          ],
          itemsHi: [
            'आनंद प्राप्ति हेतु: एकांत और विश्राम के क्षणों में मानसिक तृप्ति',
            'अलंकार हेतु: सामाजिक संभाषण व वार्ताओं में वक्तृत्व को चमकाना',
            'क्षमता हेतु: सांसारिक निर्णयों एवं व्यापारिक मामलों के प्रबंधन में'
          ]
        },
        {
          titleEn: '2. Modes of Reading Books',
          titleHi: '2. पुस्तकों के पठन के तीन स्तर',
          badge: 'Taste, Swallow, Chew',
          itemsEn: [
            '"Some books are to be tasted" (read in parts)',
            '"Others to be swallowed" (read curiously, not deeply)',
            '"Some few to be chewed and digested" (read wholly with diligence)'
          ],
          itemsHi: [
            '"कुछ पुस्तकें केवल चखने हेतु हैं" (केवल अंशों में पढ़ने योग्य)',
            '"कुछ निगलने हेतु हैं" (शीघ्रता से सरसरी तौर पर पढ़ने योग्य)',
            '"कुछ चबाने और पचाने हेतु हैं" (पूर्ण एकाग्रता व चिंतन से पढ़ने योग्य)'
          ]
        },
        {
          titleEn: '3. Intellectual Trinity',
          titleHi: '3. बौद्धिक विकास का त्रिसूत्र',
          badge: 'Reading, Conference, Writing',
          itemsEn: [
            '"Reading maketh a full man" (breadth of knowledge)',
            '"Conference a ready man" (quick argumentative wit)',
            '"Writing an exact man" (rigorous precision of thought)'
          ],
          itemsHi: [
            '"अध्ययन मनुष्य को परिपूर्ण बनाता है" (ज्ञान का व्यापक भंडार)',
            '"संभाषण मनुष्य को प्रत्युत्पन्नमति बनाता है" (शीघ्र विचार व प्रत्युत्तर)',
            '"लेखन मनुष्य को सटीक व यथार्थ बनाता है" (विचारों में अचूक शुद्धता)'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'Stylistic Characteristics: Aphorism, Terseness and Latinisms',
        headingHi: 'शैलीगत विशेषताएं: सूत्रपरकता, संक्षिप्तता एवं लैटिन प्रभाव',
        detailEn: 'Bacon’s prose style is celebrated for its dense epigrammatic conciseness. Every sentence can stand independently as a moral proverb. He employs parallel balancing structures ("Histories make men wise; poets witty; the mathematics subtile; natural philosophy deep; moral grave; logic and rhetoric able to contend").',
        detailHi: 'बेकन की गद्य शैली अपनी सघन सूक्तिपरक संक्षिप्तता के लिए विख्यात है। उनका प्रत्येक वाक्य स्वतंत्र कहावत के रूप में उद्धृत किया जा सकता है। वे समानांतर वाक्य संरचनाओं का उपयोग करते हैं ("इतिहास मनुष्य को बुद्धिमान बनाता है, कविता प्रत्युत्पन्नमति, गणित सूक्ष्म, प्राकृतिक दर्शन गंभीर, तथा तर्कशास्त्र वाद-विवाद में सक्षम बनाता है")।',
        bulletsEn: [
          'Aphoristic brevity: Packed with maximal wisdom in minimal words.',
          'Pragmatic Machiavellian prudence over saintly idealism.',
          'Extensive use of Latin quotations and Biblical/classical allusions.'
        ],
        bulletsHi: [
          'सूक्तिपरक संक्षिप्तता: न्यूनतम शब्दों में अधिकतम वैचारिक घनत्व।',
          'संतवादी आदर्शवाद के स्थान पर व्यावहारिक मैकियावेलीयन सांसारिकता।',
          'लैटिन उद्धरणों एवं शास्त्रीय दृष्टांतों का प्रचुर प्रयोग।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['Michel de Montaigne', 'Francis Bacon', 'Dr. Samuel Johnson', 'Hugh Walker'],
      thinkersHi: ['मिशेल डी मॉन्टेन', 'फ्रांसिस बेकन', 'डॉ. सैमुएल जॉनसन', 'ह्यू वॉकर'],
      recommendedBooksEn: ['The Essays by Francis Bacon (Penguin Classics)', 'The English Essay and Essayists by Hugh Walker'],
      recommendedBooksHi: ['अंग्रेजी निबंध का इतिहास — ह्यू वॉकर', 'बेकन के निबंध — आलोचनात्मक अध्ययन'],
      examQuoteEn: '"Bacon famously wrote: Studies themselves do give forth directions too much at large, except they be bounded in by experience."',
      examQuoteHi: '"बेकन का प्रसिद्ध विचार: अध्ययन केवल सामान्य दिशा-निर्देश देता है, जब तक कि उसे व्यावहारिक अनुभव द्वारा अनुशासित न किया जाए।\"'
    }
  },

  // =========================================================================
  // 6. HOME SCIENCE — SEMESTER 1 — FOODS, NUTRITION & CHILDHOOD
  // =========================================================================
  {
    id: 'hsc-1-1',
    topicSequence: 'Topic 1.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Macronutrients and Micronutrients: Classification, Functions, RDA and Deficiency Disorders',
    titleHi: 'मैक्रोन्यूट्रिएंट्स एवं माइक्रोन्यूट्रिएंट्स: वर्गीकरण, जैविक कार्य, आरडीए एवं पोषण जनित विकार',
    subjectCode: 'SDSUV-HSC-101',
    subjectId: 'homescience',
    subjectNameEn: 'Home Science',
    subjectNameHi: 'गृह विज्ञान',
    semester: 1,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Food Science & Human Nutrition Principles',
    unitTitleHi: 'इकाई I: खाद्य विज्ञान एवं मानव पोषण के मूल सिद्धांत',
    readTime: '15 min read',
    highYieldTag: '🔥 15-Mark Core SDSUV Clinical Nutrition Question',
    upscTag: 'UPSC GS-2 / ICMR-NIN Guidelines',
    sdsuvTag: '🔥 Asked 7x in SDSUV Home Science Papers',
    learnTopicId: 't-hsc-101',
    youtubeId: 'qQjH8yY3V3Y',
    lectureChannel: 'IGNOU SWAYAM / StudyIQ Home Science',
    searchFallback: 'https://www.youtube.com/results?search_query=Macronutrients+Micronutrients+Home+Science+NIN+ICMR',
    conclusionEn: 'Optimal human metabolic health requires a nutrient-dense dietary matrix adhering to ICMR-NIN 2020 RDA guidelines, combining complex carbohydrates, high biological value proteins, essential fatty acids, and bioavailable micronutrients.',
    conclusionHi: 'मानव स्वास्थ्य एवं उपापचयी क्रियाओं के लिए आईसीएमआर-एनआईएन 2020 के आहार मानकों के अनुरूप संतुलित आहार आवश्यक है, जिसमें जटिल कार्बोहाइड्रेट, उच्च जैविक मूल्य के प्रोटीन, आवश्यक वसा अम्ल एवं जैव-उपलब्ध सूक्ष्म पोषक तत्व शामिल हों।',
    contextEn: {
      intro: 'Nutrients are chemical components in food metabolized by the body to produce energy, build cellular architecture, and regulate physiological biochemistry. In clinical home science, nutrients are systematically classified by quantitative requirements into Macronutrients (Carbohydrates, Proteins, Lipids) and Micronutrients (Vitamins and Minerals).',
      scholarDefinition: {
        scholar: 'ICMR – National Institute of Nutrition (NIN, Hyderabad, 2020)',
        definition: '"A balanced diet is one which provides all nutrients in required amounts and proper proportions according to physiological age, gender, and physical activity, with a safe buffer for stress periods."'
      }
    },
    contextHi: {
      intro: 'पोषक तत्व भोजन में उपस्थित वे रासायनिक यौगिक हैं जो शरीर को ऊर्जा प्रदान करने, कोशिकाओं के निर्माण व मरम्मत तथा उपापचयी क्रियाओं के नियमन हेतु अनिवार्य हैं। गृह विज्ञान एवं पोषण विज्ञान में इन्हें दैनिक मात्रा की आवश्यकता के आधार पर मैक्रोन्यूट्रिएंट्स (स्थूल पोषक तत्व) एवं माइक्रोन्यूट्रिएंट्स (सूक्ष्म पोषक तत्व) में वर्गीकृत किया जाता है।',
      scholarDefinition: {
        scholar: 'आईसीएमआर – राष्ट्रीय पोषण संस्थान (एनआईएन, हैदराबाद, 2020)',
        definition: '"संतुलित आहार वह है जो व्यक्ति की आयु, लिंग एवं शारीरिक श्रम के अनुसार सभी आवश्यक पोषक तत्व उचित अनुपात में प्रदान करे तथा तनाव व बीमारी की स्थिति हेतु सुरक्षित भंडार रखे।"'
      }
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Biochemical Nutritional Classification Matrix',
      titleHi: 'पोषण तत्वों का संपूर्ण जैव-रासायनिक वर्गीकरण',
      columns: [
        {
          titleEn: '1. Macronutrients (Energy & Structure)',
          titleHi: '1. स्थूल पोषक तत्व (ऊर्जा व निर्माण)',
          badge: 'Grams per Day',
          itemsEn: [
            'Carbohydrates (4 kcal/g): Monosaccharides, Disaccharides, Polysaccharides (Glycogen/Fiber)',
            'Proteins (4 kcal/g): 9 Essential Amino Acids, Nitrogen balance, Tissue synthesis',
            'Lipids (9 kcal/g): Triglycerides, Phospholipids, Essential Fatty Acids (Omega-3 & Omega-6)'
          ],
          itemsHi: [
            'कार्बोहाइड्रेट (4 किलोकैलोरी/ग्रा): ऊर्जा का मुख्य स्रोत, स्टार्च, ग्लाइकोजन एवं आहारीय रेशा',
            'प्रोटीन (4 किलोकैलोरी/ग्रा): 9 आवश्यक अमीनो अम्ल, ऊतक निर्माण, एंजाइम व एंटीबॉडी संश्लेषण',
            'वसा / लिपिड (9 किलोकैलोरी/ग्रा): सर्वाधिक ऊर्जा घनत्व, आवश्यक वसा अम्ल (ओमेगा-3 व ओमेगा-6)'
          ]
        },
        {
          titleEn: '2. Micronutrients: Vitamins',
          titleHi: '2. सूक्ष्म पोषक तत्व: विटामिन',
          badge: 'Milligrams / Micrograms',
          itemsEn: [
            'Fat-Soluble: Vitamin A (Retinol), D (Calciferol), E (Tocopherol), K (Phylloquinone)',
            'Water-Soluble: B-Complex (B1, B2, B3, B6, B12, Folate) and Vitamin C (Ascorbic Acid)',
            'Act as organic coenzymes in cellular metabolic pathways'
          ],
          itemsHi: [
            'वसा में घुलनशील: विटामिन A (दृष्टि व त्वचा), D (अस्थि निर्माण), E (एंटीऑक्सीडेंट), K (रक्त का थक्का)',
            'जल में घुलनशील: B-कॉम्प्लेक्स (B1 थियामिन, B2, B3, B12, फोलेट) एवं विटामिन C (एस्कॉर्बिक एसिड)',
            'कोशिका के उपापचयी चक्रों में जैविक सह-एंजाइम (Coenzymes) के रूप में कार्य'
          ]
        },
        {
          titleEn: '3. Clinical Deficiency Disorders',
          titleHi: '3. पोषण जनित नैदानिक विकार',
          badge: 'Public Health Malnutrition',
          itemsEn: [
            'PEM: Kwashiorkor (Protein deficiency with edema) vs Marasmus (Calorie wasting)',
            'Nutritional Anemia: Iron & Folate deficiency (Microcytic hypochromic RBCs)',
            'IDD (Iodine Deficiency Disorders): Goitre, cretinism, Himalayan endemic belt'
          ],
          itemsHi: [
            'प्रोटीन ऊर्जा कुपोषण (PEM): क्वाशियोरकोर (सूजन/एडिमा युक्त) बनाम मरास्मस (अत्यधिक दुर्बलता)',
            'रक्ताल्पता (एनीमिया): लौह तत्व व फोलेट की कमी (हीमोग्लोबिन स्तर में गिरावट)',
            'आयोडीन हीनता विकार (IDD): घेंघा रोग (गलगंड), हिमालयी अंचलों में स्थानिक समस्या'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'Kwashiorkor versus Marasmus: Clinical Differential Diagnosis',
        headingHi: 'क्वाशियोरकोर बनाम मरास्मस: नैदानिक विभेदक विश्लेषण',
        detailEn: 'Protein-Energy Malnutrition (PEM) manifests in two distinct phenotypes. Kwashiorkor results from severe dietary protein deficiency despite adequate caloric intake, characterized by hypoalbuminemic pitting edema, "moon face", hepatomegaly (fatty liver), and "flaky-paint" dermatosis. In contrast, Marasmus is balanced starvation resulting from chronic deficiency of both calories and proteins, characterized by severe muscle wasting, subcutaneous fat loss, "old man facies", and absence of edema.',
        detailHi: 'प्रोटीन-ऊर्जा कुपोषण (PEM) दो प्रमुख रूपों में प्रकट होता है: क्वाशियोरकोर पर्याप्त कैलोरी के बावजूद प्रोटीन की गंभीर कमी से होता है, जिसके लक्षणों में पैरों व चेहरे पर सूजन (एडिमा), गोल चेहरा (Moon face), यकृत में वसा का जमाव तथा त्वचा पर चकत्ते शामिल हैं। इसके विपरीत मरास्मस कैलोरी और प्रोटीन दोनों की दीर्घकालिक कमी से होता है, जिसमें मांसपेशियां क्षीण हो जाती हैं, झुर्रीदार चेहरा (Old man facies) बनता है तथा सूजन अनुपस्थित रहती है।',
        bulletsEn: [
          'Kwashiorkor: Edema present, fatty liver, preserved subcutaneous fat.',
          'Marasmus: Edema absent, ribs clearly visible, severe emaciation.',
          'Management requires staged F-75 stabilization followed by F-100 catch-up growth feeds.'
        ],
        bulletsHi: [
          'क्वाशियोरकोर: सूजन उपस्थित, यकृत वृद्धि, उपत्वचीय वसा आंशिक रूप से सुरक्षित।',
          'मरास्मस: सूजन अनुपस्थित, पसलियां स्पष्ट दिखाई देती हैं, कंकालनुमा दुर्बलता।',
          'उपचार: विश्व स्वास्थ्य संगठन के F-75 फॉर्मूला द्वारा स्थिरीकरण तत्पश्चात F-100 आहार।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['Dr. C. Gopalan (NIN Hyderabad)', 'Dr. M.S. Swaminathan', 'ICMR Expert Nutrition Group (2020)'],
      thinkersHi: ['डॉ. सी. गोपालन (राष्ट्रीय पोषण संस्थान)', 'डॉ. एम.एस. स्वामीनाथन', 'आईसीएमआर पोषण विशेषज्ञ समिति'],
      recommendedBooksEn: ['Nutritive Value of Indian Foods by C. Gopalan, NIN', 'Food & Nutrition by Anita Tull', 'Textbook of Human Nutrition by Mahtab S. Bamji'],
      recommendedBooksHi: ['आहार एवं पोषण विज्ञान — डॉ. वृंदा सिंह', 'खाद्य एवं पोषण — डॉ. अनीता सिंह'],
      examQuoteEn: '"ICMR 2020: My Plate for the Day recommends 50% plate filled with vegetables and fruits, with remaining split between whole cereals and pulses/millets."',
      examQuoteHi: '"आईसीएमआर 2020 दिशा-निर्देश: दैनिक आहार की थाली का आधा हिस्सा हरी सब्जियों व मौसमी फलों से तथा शेष आधा हिस्सा मोटे अनाजों, दालों व दुग्ध उत्पादों से परिपूर्ण होना चाहिए।"'
    }
  },

  // =========================================================================
  // 7. DRAWING & PAINTING — SEMESTER 1 — VISUAL ART FUNDAMENTALS & SHADANGA
  // =========================================================================
  {
    id: 'drw-1-1',
    topicSequence: 'Topic 1.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Six Limbs of Indian Painting (Shadanga) and Fundamental Elements of Visual Art',
    titleHi: 'भारतीय चित्रकला के छह अंग (षडंग) एवं दृश्य कला के मूलभूत आधारभूत तत्व',
    subjectCode: 'SDSUV-DRW-101',
    subjectId: 'drawing',
    subjectNameEn: 'Drawing & Painting',
    subjectNameHi: 'चित्रकला',
    semester: 1,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Six Elements of Visual Art & Indian Aesthetics',
    unitTitleHi: 'इकाई I: दृश्य कला के छह मूल तत्व एवं भारतीय सौंदर्यशास्त्र',
    readTime: '15 min read',
    highYieldTag: '🔥 15-Mark Core SDSUV Drawing Paper Question',
    upscTag: 'UPSC Art & Culture / Fine Arts',
    sdsuvTag: '🔥 Asked in 8 Consecutive SDSUV Exams',
    learnTopicId: 't-drw-101',
    youtubeId: 'pS2B_gR3fX4',
    lectureChannel: 'Drishti IAS Art & Culture / SWAYAM UGC',
    searchFallback: 'https://www.youtube.com/results?search_query=Six+Limbs+of+Indian+Painting+Shadanga+Drishti+IAS',
    conclusionEn: 'The classical Indian Shadanga codified in Yashodhara’s commentary on Kamasutra anticipated modern visual grammar by two millennia, uniting anatomical proportion (Pramana) and chromatic harmony (Varnikabhanga) with transcendent emotional interiority (Bhava).',
    conclusionHi: 'कामसूत्र की जयमंगला टीका में यशोधर पंडित द्वारा निरूपित षडंग सिद्धांत आधुनिक कला-व्याकरण से दो सहस्राब्दी पूर्व ही शारीरिक अनुपात (प्रमाण) तथा वर्ण-संतुलन (वर्णिकाभंग) को भावाभिव्यक्ति के साथ समन्वित करने वाला विश्व का प्राचीनतम कला-दर्शन है।',
    contextEn: {
      intro: 'In 11th-century Indian aesthetics, Pandit Yashodhara documented the ancient six canonical canons of Indian painting in his Jayamangala commentary on Vatsyayana’s Kamasutra through a legendary Sanskrit shloka. Concurrently, Western visual art defines six objective elements: Line, Shape/Form, Color, Tone/Value, Texture, and Space.',
      scholarDefinition: {
        scholar: 'Pandit Yashodhara (Jayamangala Commentary on Kamasutra)',
        definition: '"रूपभेदाः प्रमाणानि भावलावण्ययोजनम्। सादृश्यं वर्णिकाभङ्ग इति चित्रं षडङ्गकम्॥ (The six limbs of painting are: Differentiation of Forms, Proportions, Emotional Expression, Grace/Charm, Verisimilitude/Resemblance, and Chromatic Brushwork Harmonization)."'
      }
    },
    contextHi: {
      intro: 'भारतीय सौंदर्यशास्त्र में 11वीं शताब्दी में पंडित यशोधर ने वात्स्यायन के कामसूत्र की "जयमंगला" टीका में चित्रकला के छह अनिवार्य अंगों का निरूपण एक सुप्रसिद्ध श्लोक के माध्यम से किया। आधुनिक दृश्य कला में भी छह मूल तत्व माने जाते हैं: रेखा, रूप, रंग (वर्ण), तान, पोत एवं अंतराल।',
      scholarDefinition: {
        scholar: 'पंडित यशोधर (कामसूत्र की जयमंगला टीका)',
        definition: '"रूपभेदाः प्रमाणानि भावलावण्ययोजनम्। सादृश्यं वर्णिकाभङ्ग इति चित्रं षडङ्गकम्॥ अर्थात्: 1. रूपभेद, 2. प्रमाण, 3. भाव, 4. लावण्ययोजन, 5. सादृश्य, तथा 6. वर्णिकाभंग — ये चित्रकला के छह अंग हैं।"'
      }
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Canonical Six Limbs of Indian Painting (Shadanga)',
      titleHi: 'भारतीय चित्रकला के अमर षडंग सिद्धांत',
      columns: [
        {
          titleEn: 'Canons 1 & 2: Form & Measure',
          titleHi: 'प्रथम व द्वितीय अंग: रूप एवं माप',
          badge: 'Physical Structure',
          itemsEn: [
            '1. Rūpabheda (रूपभेद): Knowledge of forms, shapes, character traits, distinguishing male/female, divine/mortal',
            '2. Pramāṇa (प्रमाण): Correct proportion, measurement, foreshortening, and anatomical canon (Talamana system)'
          ],
          itemsHi: [
            '1. रूपभेद: विभिन्न रूपों, आकारों एवं आकृतियों का सूक्ष्म ज्ञान (देवी, दानव, मानव, पुरुष, स्त्री की विशिष्ट शारीरिक संरचना)',
            '2. प्रमाण: शारीरिक अंगों का यथार्थ अनुपात, माप, परिप्रेक्ष्य तथा तालमान पद्धति (एक ताल = चेहरे की लंबाई)'
          ]
        },
        {
          titleEn: 'Canons 3 & 4: Emotion & Grace',
          titleHi: 'तृतीय व चतुर्थ अंग: भाव एवं लावण्य',
          badge: 'Aesthetic Soul',
          itemsEn: [
            '3. Bhāva (भाव): Psychological feeling, facial expression, mood, and Navarasa manifestation through eyes/gestures',
            '4. Lāvaṇyayojanam (लावण्ययोजनम्): Infusion of grace, luster, external charm, and delicate lyrical rhythm'
          ],
          itemsHi: [
            '3. भाव: अंतर्मन के मनोभावों, नवरसों एवं चेहरों के भाव-प्रकटीकरण का चित्रांकन (मुद्राओं व नेत्रों द्वारा भाव-संचरण)',
            '4. लावण्ययोजनम्: बाह्य सौंदर्य, दीप्ति, आकर्षण एवं सूक्ष्म लालित्य का संयोजन (जैसे मोतियों की चमक)'
          ]
        },
        {
          titleEn: 'Canons 5 & 6: Realism & Technique',
          titleHi: 'पंचम व षष्ठ अंग: सादृश्य एवं रंग',
          badge: 'Execution Mastery',
          itemsEn: [
            '5. Sādṛśyam (सादृश्यम्): Verisimilitude, anatomical truth to nature (eyes like lotus petals, brows like bows)',
            '6. Varṇikābhaṅga (वर्णिकाभङ्ग): Masterful chromatic brushwork, palette blending, pigment knowledge and tonal layering'
          ],
          itemsHi: [
            '5. सादृश्यम्: प्रकृति के साथ रूपात्मक समानता (कमलनयन, धनुषाकार भौहें, सिंह जैसी पतली कमर)',
            '6. वर्णिकाभङ्ग: तूलिका संचालन (ब्रशवर्क), रंगों का वैज्ञानिक सम्मिश्रण, वर्ण-संतुलन एवं प्रकाश-छाया का संयोजन'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'Application of Shadanga in Ajanta Murals: Padmapani Bodhisattva',
        headingHi: 'अजन्ता भित्तिचित्रों में षडंग का चरमोत्कर्ष: बोधिसत्व पद्मपाणि',
        detailEn: 'In Cave 1 at Ajanta, the 5th-century Gupta masterpiece of Bodhisattva Padmapani exemplifies all six limbs: Rūpabheda in the regal headdress, Pramāṇa in the graceful tribhanga flexure, Bhāva in the serene downcast introspective eyes, Lāvaṇya in the glowing pearlescent skin, Sādṛśya in lotus petal contours, and Varṇikābhaṅga in the subtle earthy ochres and lapis lazuli accents.',
        detailHi: 'अजन्ता की गुफा संख्या 1 में चित्रित 5वीं शती का गुप्तकालीन उत्कृष्ट भित्तिचित्र "बोधिसत्व पद्मपाणि" षडंग का मूर्त प्रमाण है: मुकुट व आभूषणों में रूपभेद, त्रिभंग मुद्रा में प्रमाण, करुणा व शांत रस से आप्लावित नेत्रों में भाव, देह की स्वर्णिम आभा में लावण्य, हस्त में खिले कमल में सादृश्य, तथा गेरू व लाजवर्त (Lapis Lazuli) के तूलिका संचालन में वर्णिकाभंग दृष्टिगोचर होता है।',
        bulletsEn: [
          'Tribhanga pose demonstrating dynamic asymmetrical Pramana.',
          'Shading technique (Chiaroscuro) created via delicate line modulation.',
          'Synthesis of sacred transcendence and sensuous aesthetic grace.'
        ],
        bulletsHi: [
          'त्रिभंग मुद्रा द्वारा शास्त्रीय प्रमाण और गतिशीलता का निरूपण।',
          'रेखाओं के उतार-चढ़ाव द्वारा प्रकाश-छाया (Tonal gradation) का सृजन।',
          'पारलौकिक आध्यात्मिकता और सांसारिक सौंदर्य का अनुपम समन्वय।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['Pandit Yashodhara', 'Abanindranath Tagore (Some Notes on Indian Artistic Anatomy, 1914)', 'Ananda Coomaraswamy', 'Stella Kramrisch'],
      thinkersHi: ['पंडित यशोधर', 'अवनींद्रनाथ टैगोर (भारतीय षडंग पर प्रसिद्ध ग्रंथ)', 'आनंद कुमारस्वामी', 'स्टेला क्रैमरिश'],
      recommendedBooksEn: ['Six Limbs of Indian Painting by Abanindranath Tagore', 'The Transformation of Nature in Art by Ananda Coomaraswamy'],
      recommendedBooksHi: ['भारतीय चित्रकला का इतिहास — डॉ. रीता प्रताप', 'रूपांकन — गिरिराज किशोर अग्रवाल'],
      examQuoteEn: '"Abanindranath Tagore wrote: The Shadanga is not an obsolete shastra; it is the living pulse of every Indian masterpiece from Ajanta to the modern Bengal School."',
      examQuoteHi: '"अवनींद्रनाथ टैगोर के अनुसार: षडंग कोई निष्प्राण सूत्र नहीं, बल्कि अजन्ता से लेकर आधुनिक काल तक प्रत्येक भारतीय कलाकृति की जीवंत धड़कन है।"'
    }
  },

  // =========================================================================
  // 8. ANTHROPOLOGY — SEMESTER 1 — SOCIAL & CULTURAL ANTHROPOLOGY
  // =========================================================================
  {
    id: 'ant-1-1',
    topicSequence: 'Topic 1.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Social & Cultural Anthropology: Concept of Culture, Cultural Relativism and Functionalism',
    titleHi: 'सामाजिक एवं सांस्कृतिक मानवशास्त्र: संस्कृति की अवधारणा, सांस्कृतिक सापेक्षवाद एवं प्रकार्यवाद',
    subjectCode: 'SDSUV-ANT-101',
    subjectId: 'anthropology',
    subjectNameEn: 'Anthropology',
    subjectNameHi: 'मानवशास्त्र',
    semester: 1,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Nature and Scope of Anthropology & Concept of Culture',
    unitTitleHi: 'इकाई I: मानवशास्त्र की प्रकृति व विषय-क्षेत्र तथा संस्कृति की अवधारणा',
    readTime: '16 min read',
    highYieldTag: '🔥 15-Mark Core SDSUV Anthropology Question',
    upscTag: 'UPSC Anthropology Optional Paper 1',
    sdsuvTag: '🔥 Premier UPSC Optional Foundation',
    learnTopicId: 't-ant-101',
    youtubeId: 'zR7wQy6E4kE',
    lectureChannel: 'StudyIQ Anthropology / Drishti IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Concept+of+Culture+Anthropology+EB+Tylor+StudyIQ',
    conclusionEn: 'Anthropology rejects ethnocentric hierarchies; culture is a shared, superorganic, symbolically learned adaptation through which human societies navigate biological survival, social solidarity, and meaning-making.',
    conclusionHi: 'मानवशास्त्र प्रजातीय अथवा नृजाति-केन्द्रित श्रेष्ठता के दावों को खारिज करता है; संस्कृति एक साझा, अधिसावयवी एवं प्रतीकात्मक रूप से सीखी गई व्यवस्था है जिसके माध्यम से मानव समाज जैविक अस्तित्व, सामाजिक एकजुटता और मूल्यों का सृजन करते हैं।',
    contextEn: {
      intro: 'Anthropology is the holistic scientific study of humankind across time and space. Socio-cultural anthropology focuses on human behavior, symbols, social structures, and cultural variation. Sir Edward Burnett Tylor laid the cornerstone of academic anthropology in 1871 with his benchmark definition of culture.',
      scholarDefinition: {
        scholar: 'Sir Edward Burnett Tylor (Primitive Culture, 1871)',
        definition: '"Culture or Civilization, taken in its wide ethnographic sense, is that complex whole which includes knowledge, belief, art, morals, law, custom, and any other capabilities and habits acquired by man as a member of society."'
      }
    },
    contextHi: {
      intro: 'मानवशास्त्र मानव के समग्र, जैविक, पुरातात्विक एवं सामाजिक-सांस्कृतिक पहलुओं का विज्ञान है। सामाजिक-सांस्कृतिक मानवशास्त्र मानवीय व्यवहार, रीति-रिवाजों, संस्थाओं एवं सांस्कृतिक विविधताओं का तुलनात्मक अध्ययन करता है। 1871 में सर एडवर्ड बर्नेट टायलर ने संस्कृति की सर्वप्रथम सर्वमान्य वैज्ञानिक परिभाषा प्रस्तुत की।',
      scholarDefinition: {
        scholar: 'सर एडवर्ड बर्नेट टायलर (प्रिमिटिव कल्चर, 1871)',
        definition: '"संस्कृति या सभ्यता, अपने विस्तृत नृजातीय अर्थ में, वह जटिल समग्रता है जिसमें ज्ञान, विश्वास, कला, नीति, कानून, प्रथा तथा समाज के सदस्य के रूप में मनुष्य द्वारा अर्जित अन्य सभी योग्यताएं और आदतें शामिल हैं।"'
      }
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Foundational Pillars of Anthropological Culture Theory',
      titleHi: 'मानवशास्त्रीय संस्कृति सिद्धांत के प्रमुख आधारभूत स्तंभ',
      columns: [
        {
          titleEn: '1. Tylorian Attributes',
          titleHi: '1. टायलर के अनुसार विशेषताएं',
          badge: 'Complex Whole',
          itemsEn: [
            'Learned behavior: Acquired via enculturation, not biological inheritance',
            'Shared & Social: Requires group participation, collective consensus',
            'Superorganic: A.L. Kroeber’s concept transcending individual biology'
          ],
          itemsHi: [
            'सीखा हुआ व्यवहार: सामाजीकरण (Enculturation) द्वारा अर्जित, आनुवंशिक नहीं',
            'साझा एवं सामाजिक: सामूहिक सहभागिता व सामाजिक सहमति पर आधारित',
            'अधिसावयवी (Superorganic): क्रोबर के अनुसार व्यक्तिगत जीवविज्ञान से परे एक स्वायत्त सत्ता'
          ]
        },
        {
          titleEn: '2. Cultural Relativism',
          titleHi: '2. सांस्कृतिक सापेक्षवाद',
          badge: 'Franz Boas Paradigm',
          itemsEn: [
            'No culture is superior or inferior; every practice has internal logic',
            'Anti-Ethnocentrism: Rejects judging others by Western standards',
            'Emic approach: Understanding behavior from the native insider perspective'
          ],
          itemsHi: [
            'कोई भी संस्कृति श्रेष्ठ या हीन नहीं; प्रत्येक प्रथा का अपना आंतरिक तर्क होता है',
            'नृजाति-केन्द्रिकता का खंडन: पश्चिमी मापदंडों से अन्य समाजों को आंकना अनुचित',
            'एमिक (Emic) उपागम: किसी संस्कृति को उसी समाज के आंतरिक दृष्टिकोण से समझना'
          ]
        },
        {
          titleEn: '3. Malinowskian Functionalism',
          titleHi: '3. मैलिनोव्स्की का प्रकार्यवाद',
          badge: 'Biological Needs',
          itemsEn: [
            'Culture exists to fulfill 7 basic biological human needs (nutrition, reproduction)',
            'Every institution (Kula Ring, Magic) serves an indispensable survival function',
            'Participant Observation fieldwork in Trobriand Islands (1914–1918)'
          ],
          itemsHi: [
            'संस्कृति मनुष्य की 7 प्राथमिक जैविक आवश्यकताओं की पूर्ति हेतु अस्तित्व में आती है',
            'प्रत्येक सामाजिक संस्था (जैसे कुला विनिमय, जादुई अनुष्ठान) उपयोगी कार्य करती है',
            'ट्रोब्रिएंड द्वीपवासियों के मध्य गहन सहभागी अवलोकन (Participant Observation) अध्ययन'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'Ethnocentrism versus Cultural Relativism in Fieldwork',
        headingHi: 'नृजाति-केन्द्रिकता बनाम सांस्कृतिक सापेक्षवाद: क्षेत्रीय कार्य की नैतिकता',
        detailEn: 'Ethnocentrism (William Graham Sumner, 1906) is the tendency to view one’s own ethnic group as the center of everything and scale all others according to its norms. Franz Boas and his students (Ruth Benedict, Margaret Mead) revolutionized anthropology through Cultural Relativism, arguing that values and practices must be understood relative to their distinct historical and ecological context.',
        detailHi: 'विलियम ग्राहम सम्नर (1906) के अनुसार नृजाति-केन्द्रिकता (Ethnocentrism) वह दृष्टिकोण है जिसमें व्यक्ति अपनी संस्कृति को सर्वोच्च मानकर अन्य समाजों को हीन दृष्टि से देखता है। फ्रांज बोस, रूथ बेनेडिक्ट एवं मार्गरेट मीड ने सांस्कृतिक सापेक्षवाद के माध्यम से यह स्थापित किया कि प्रत्येक संस्कृति के मूल्य उसके अपने विशिष्ट भौगोलिक, ऐतिहासिक व सामाजिक परिवेश के संदर्भ में ही वैध हैं।',
        bulletsEn: [
          'Methodological Relativism: Suspending bias to conduct unbiased scientific ethnography.',
          'Ruth Benedict’s "Patterns of Culture" (Apollonian vs Dionysian personality types).',
          'Ethical Relativism debates regarding human rights and female circumcision.'
        ],
        bulletsHi: [
          'पद्धतिपरक सापेक्षवाद: निष्पक्ष वैज्ञानिक अध्ययन हेतु व्यक्तिगत पूर्वग्रहों का त्याग।',
          'रूथ बेनेडिक्ट की कृति "पैटर्न्स ऑफ कल्चर" (अपोलोनियन बनाम डायोनिसियन प्रारूप)।',
          'सार्वभौमिक मानवाधिकार बनाम सांस्कृतिक सापेक्षवाद पर समकालीन विमर्श।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['E.B. Tylor', 'Franz Boas', 'Bronislaw Malinowski', 'A.R. Radcliffe-Brown', 'Claude Levi-Strauss'],
      thinkersHi: ['ई.बी. टायलर', 'फ्रांज बोस', 'ब्रॉनिस्लॉ मैलिनोव्स्की', 'ए.आर. रैडक्लिफ-ब्राउन', 'क्लाउड लेवी-स्ट्रॉस'],
      recommendedBooksEn: ['Primitive Culture by E.B. Tylor', 'Argonauts of the Western Pacific by B. Malinowski', 'Anthropology by Carol R. Ember & Melvin Ember'],
      recommendedBooksHi: ['सामाजिक मानवशास्त्र — मजूमदार एवं मदान', 'मानवशास्त्र के मूल सिद्धांत — डॉ. बी.के. तिवारी'],
      examQuoteEn: '"Ruth Benedict: The purpose of anthropology is to make the world safe for human differences."',
      examQuoteHi: '"रूथ बेनेडिक्ट का प्रसिद्ध कथन: मानवशास्त्र का मूल उद्देश्य मानवीय विविधताओं और भिन्नताओं के लिए विश्व को सुरक्षित बनाना है।"'
    }
  },

  // =========================================================================
  // 9. HISTORY — SEMESTER 3 — DELHI SULTANATE & REGIONAL POLITIES
  // =========================================================================
  {
    id: 'his-3-1',
    topicSequence: 'Topic 3.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Alauddin Khilji: Imperial Expansion, Market Control Regulations and Military Reforms',
    titleHi: 'अलाउद्दीन खिलजी: साम्राज्य विस्तार, बाजार नियंत्रण नीति एवं सैन्य सुधार',
    subjectCode: 'SDSUV-HIS-301',
    subjectId: 'history',
    subjectNameEn: 'Ancient & Medieval History',
    subjectNameHi: 'प्राचीन एवं मध्यकालीन इतिहास',
    semester: 3,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Delhi Sultanate: Khilji Dynasty & Agrarian-Market Reforms',
    unitTitleHi: 'इकाई I: दिल्ली सल्तनत: खिलजी वंश एवं कृषि व बाजार नियंत्रण सुधार',
    readTime: '17 min read',
    highYieldTag: '🔥 15-Mark Medieval History Classic',
    upscTag: 'UPSC GS-1 / Medieval History',
    sdsuvTag: '🔥 Asked 7x in SDSUV Exams',
    learnTopicId: 't-his-301',
    youtubeId: 'jL_2zH8G5Ew',
    lectureChannel: 'StudyIQ IAS / Drishti IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Alauddin+Khilji+Market+Reforms+StudyIQ',
    conclusionEn: 'Alauddin Khilji’s market control regulations were not motivated by philanthropic welfarism, but by cold geopolitical realpolitik: the necessity of sustaining a mammoth permanent standing army at fixed low wages to repel relentless Mongol invasions and conquer peninsular India.',
    conclusionHi: 'अलाउद्दीन खिलजी की बाजार नियंत्रण नीति का उद्देश्य जन-कल्याण नहीं, बल्कि कठोर भू-राजनीतिक यथार्थवाद था: निरंतर मंगोल आक्रमणों से सल्तनत की रक्षा करने तथा दक्षिण भारत पर विजय प्राप्त करने हेतु कम वेतन पर एक विशाल स्थायी सेना का भरण-पोषण करना।',
    contextEn: {
      intro: 'Alauddin Khilji (1296–1316) revolutionized Sultanate statecraft by creating a centralized autocratic administrative machinery. To counter repeated Mongol raids across the Punjab frontiers and expand into Rajasthan and the Deccan (Malik Kafur’s campaigns), he instituted rigorous price controls and agrarian reforms documented by court chronicler Ziauddin Barani.',
      scholarDefinition: {
        scholar: 'Ziauddin Barani (Tarikh-i-Firoz Shahi)',
        definition: '"Alauddin established four distinct regulated markets in Delhi, fixing the prices of every commodity from horses, slaves, and fine silks down to grain, needles, and vegetables, supervised by the Shahna-i-Mandi with ruthless espionage (Munhiyan)."'
      }
    },
    contextHi: {
      intro: 'अलाउद्दीन खिलजी (1296-1316) ने सल्तनत प्रशासन को एक केंद्रीयकृत निरंकुश सैन्यवादी स्वरूप प्रदान किया। उत्तर-पश्चिम सीमा से मंगोलों के लगातार हमलों का सामना करने तथा दक्कन विजय (मलिक काफूर का दक्षिण अभियान) के लिए उसने दिल्ली में कठोर मूल्य नियंत्रण एवं भू-राजस्व सुधार लागू किए, जिनका विस्तृत विवरण समकालीन इतिहासकार जियाउद्दीन बरनी ने दिया है।',
      scholarDefinition: {
        scholar: 'जियाउद्दीन बरनी (तारीख-ए-फिरोजशाही)',
        definition: '"सुल्तान अलाउद्दीन ने दिल्ली में चार अलग-अलग नियंत्रित बाजार स्थापित किए, जहां खाद्यान्न, वस्त्र, घोड़े-गुलाम से लेकर सुई व तरकारी तक की कीमतें राज्य द्वारा निर्धारित थीं, जिनकी निगरानी शहना-ए-मंडी एवं गुप्तचर (मुनहियान) करते थे।"'
      }
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Alauddin Khilji’s Quadruple Market Administration',
      titleHi: 'अलाउद्दीन खिलजी की चार-स्तरीय बाजार व्यवस्था',
      columns: [
        {
          titleEn: '1. Four Specialized Markets',
          titleHi: '1. चार विशिष्ट बाजार',
          badge: 'Delhi Mandis',
          itemsEn: [
            'Mandi (Central Grain Market): Strict price caps on wheat, barley, rice',
            'Sarai-i-Adl: Government subsidized market for cloth, sugar, oils, dry fruits',
            'Horse, Cattle & Slave Market: Eliminated middlemen (Dallals); graded horse pricing',
            'General Sundry Bazaar: Supervised petty goods down to caps and shoes'
          ],
          itemsHi: [
            'मंडी (अन्न बाजार): गेहूं, जौ, चावल की निश्चित सरकारी दरें (गेहूं 7.5 जीतल प्रति मन)',
            'सराय-ए-अदल: वस्त्र, शर्करा, तेल, मेवे एवं जड़ी-बूटियों का सरकारी रियायती बाजार',
            'अश्व, मवेशी एवं दास बाजार: दलालों का निष्कासन, घोड़ों का तीन श्रेणियों में वर्गीकरण',
            'सामान्य खुदरा बाजार: सुई, जूती से लेकर दैनिक उपभोग की समस्त छोटी वस्तुओं का नियंत्रण'
          ]
        },
        {
          titleEn: '2. Enforcement & Espionage',
          titleHi: '2. प्रवर्तन एवं गुप्तचर तंत्र',
          badge: 'Draconian Discipline',
          itemsEn: [
            'Shahna-i-Mandi: High superintendent keeping daily registers',
            'Diwan-i-Riyasat: Central commerce ministry under Yaqub',
            'Munhiyan: Child spies testing vendors; equal flesh cut from short-measuring traders'
          ],
          itemsHi: [
            'शहना-ए-मंडी: बाजार अधीक्षक जो व्यापारियों के पंजीकरण व कीमतों की निगरानी करता था',
            'दीवान-ए-रियासत: वाणिज्य मंत्रालय, जिसे मलिक याकूब को सौंपा गया',
            'मुनहियान (गुप्तचर): कम तोलने पर दुकानदार के शरीर से उतनी ही मात्रा में मांस काटने का दंड'
          ]
        },
        {
          titleEn: '3. Agrarian Extraction',
          titleHi: '3. भू-राजस्व सुधार',
          badge: 'Surplus Control',
          itemsEn: [
            'Masahat: Direct measurement of land (Biswa system)',
            'Kharaj fixed at 50% of gross agricultural produce',
            'Ghari (House tax) and Charai (Pasture tax) levied on livestock'
          ],
          itemsHi: [
            'मसाहत पद्धति: जमीन की पैमाइश (बिस्वा के आधार पर) कर निर्धारण',
            'खराज की दर: कुल उत्पादन का 50% (आधा भाग) राज्य का कर निश्चित',
            'घरी (मकान कर) एवं चराई (चरागाह कर) का रोपण, बिचौलियों (खुत्त, मुकद्दम) के विशेषाधिकार समाप्त'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'Military Innovations: Dagh and Chehra Systems',
        headingHi: 'सैन्य नवाचार: दाग एवं चेहरा (हुलिया) व्यवस्था',
        detailEn: 'To prevent fraudulent reporting by corrupt nobles, Alauddin instituted the Dagh (royal branding of war horses with the imperial mark to prevent substitution with pack animals) and Chehra / Huliya (descriptive roll registry documenting every soldier’s physical appearance, scars, and height). Soldiers were paid in cash (234 Tankas per annum for a single-horse trooper), making low grain prices in Delhi vital for troop morale.',
        detailHi: 'सैनिक सरदारों द्वारा घटिया घोड़े प्रस्तुत करने और जाली हाजिरी रोकने के लिए सुल्तान ने "दाग" (शाही मुहर द्वारा उत्तम युद्धक घोड़ों को दागने की प्रथा) तथा "चेहरा / हुलिया" (प्रत्येक सैनिक के शारीरिक कद-काठी व पहचान चिह्नों का लिखित रजिस्टर) प्रणाली लागू की। सैनिकों को नकद वेतन (एक अस्पा हेतु 234 टंका प्रति वर्ष) दिया जाता था, अतः दिल्ली में खाद्यान्न की सस्ती दरें सैनिकों के मनोबल हेतु अनिवार्य थीं।',
        bulletsEn: [
          'First Sultan of Delhi to establish a permanent, directly recruited standing army.',
          'Eliminated middleman corruption of hereditary village chiefs (Khuts, Muqaddams, Chaudhuris).',
          'Successfully checked six major Mongol invasions led by Qutlugh Khwaja and Targhi.'
        ],
        bulletsHi: [
          'दिल्ली का प्रथम सुल्तान जिसने केंद्र द्वारा सीधे भर्ती की गई स्थायी सेना रखी।',
          'खुत्त, मुकद्दम और चौधरियों जैसे वंशानुगत ग्रामीण बिचौलियों के विशेषाधिकार छीने।',
          'कुतलुग ख्वाजा, तार्गी आदि के नेतृत्व में आए 6 भीषण मंगोल आक्रमणों को सफलतापूर्वक विफल किया।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['Ziauddin Barani', 'Amir Khusrau (Khazain-ul-Futuh)', 'Prof. Irfan Habib', 'Prof. Satish Chandra'],
      thinkersHi: ['जियाउद्दीन बरनी', 'अमीर खुसरो (खजाइन-उल-फुतुह)', 'प्रो. इरफान हबीब', 'प्रो. सतीश चंद्र'],
      recommendedBooksEn: ['Agrarian System of Mughal India & Sultanate by Irfan Habib', 'Medieval India: From Sultanat to the Mughals by Satish Chandra'],
      recommendedBooksHi: ['मध्यकालीन भारत: सल्तनत काल — प्रो. हरिश्चंद्र वर्मा', 'मध्यकालीन भारत का इतिहास — सतीश चंद्र'],
      examQuoteEn: '"Satish Chandra: Alauddin’s market regulations died with him because they relied on terror, coercion, and artificial suppression of supply-demand dynamics."',
      examQuoteHi: '"सतीश चंद्र के अनुसार: अलाउद्दीन के बाजार सुधार उसकी मृत्यु के साथ ही समाप्त हो गए क्योंकि वे आतंक, दमन तथा मांग-आपूर्ति के स्वाभाविक नियमों के कृत्रिम अवरोध पर टिके थे।"'
    }
  },

  // =========================================================================
  // 10. POLITICAL SCIENCE — SEMESTER 3 — POLITICAL THEORIES & IDEOLOGIES
  // =========================================================================
  {
    id: 'pol-3-1',
    topicSequence: 'Topic 3.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Classical Liberalism vs Neoliberalism: John Locke to Robert Nozick and Hayek',
    titleHi: 'शास्त्रीय उदारवाद बनाम नव-उदारवाद: जॉन लॉक से रॉबर्ट नॉजिक एवं हेयक तक',
    subjectCode: 'SDSUV-POL-301',
    subjectId: 'polscience',
    subjectNameEn: 'Political Science',
    subjectNameHi: 'राजनीति विज्ञान',
    semester: 3,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Western Political Thought & Modern Ideologies',
    unitTitleHi: 'इकाई I: पाश्चात्य राजनीतिक चिंतन एवं आधुनिक विचारधाराएं',
    readTime: '17 min read',
    highYieldTag: '🔥 15-Mark Core SDSUV Political Theory Question',
    upscTag: 'UPSC Political Science Optional Paper 1',
    sdsuvTag: '🔥 Asked in Every Odd Semester',
    learnTopicId: 't-pol-301',
    youtubeId: 'W4rX93jF3iM',
    lectureChannel: 'StudyIQ Political Science / Drishti IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Classical+Liberalism+vs+Neoliberalism+Nozick+Hayek',
    conclusionEn: 'While classical liberalism championed the negative night-watchman state against absolute monarchy, 20th-century neoliberalism reasserted market supremacy against Keynesian welfare interventionism, championing rolling back the state to protect individual property rights and economic liberty.',
    conclusionHi: 'जहां शास्त्रीय उदारवाद ने निरंकुश राजतंत्र के विरुद्ध न्यूनतम "रात्रि-प्रहरी राज्य" का समर्थन किया, वहीं 20वीं सदी के नव-उदारवाद ने कीन्सियन कल्याणकारी राज्य के विरुद्ध मुक्त बाजार, विनिवेश और व्यक्तिगत संपत्ति अधिकारों की संप्रभुता की पुनर्स्थापना की।',
    contextEn: {
      intro: 'Liberalism is the dominant meta-ideology of modern constitutional democracies, centered on individual autonomy, natural rights, rule of law, and limited government. From John Locke’s 17th-century defense of Life, Liberty, and Estate to F.A. Hayek and Robert Nozick’s 20th-century critique of the welfare state, liberalism has evolved through distinct ideological phases.',
      scholarDefinition: {
        scholar: 'Robert Nozick (Anarchy, State, and Utopia, 1974)',
        definition: '"The minimal state, limited to the narrow functions of protection against force, theft, fraud, enforcement of contracts, and so on, is justified; any more extensive state will violate persons’ rights not to be forced to do certain things, and is unjustified."'
      }
    },
    contextHi: {
      intro: 'उदारवाद आधुनिक लोकतांत्रिक व्यवस्थाओं की केंद्रीय विचारधारा है, जो व्यक्ति की स्वायत्तता, प्राकृतिक अधिकारों, विधि के शासन तथा सीमित शासन के सिद्धांत पर आधारित है। 17वीं सदी में जॉन लॉक द्वारा जीवन, स्वतंत्रता व संपत्ति के अधिकारों से प्रारंभ होकर 20वीं सदी में हेयक और नॉजिक के नव-उदारवादी दर्शन तक इसका बहुआयामी विकास हुआ।',
      scholarDefinition: {
        scholar: 'रॉबर्ट नॉजिक (अराजकता, राज्य और स्वप्नलोक, 1974)',
        definition: '"न्यूनतम राज्य (Minimal State), जो केवल बाह्य आक्रमण, चोरी, धोखाधड़ी से सुरक्षा तथा अनुबंधों के प्रवर्तन तक सीमित है, वही न्यायसंगत है; इससे अधिक विस्तृत कोई भी राज्य व्यक्ति की स्वतंत्रता का हनन करता है और अनैतिक है।"'
      }
    },
    flowchart: {
      diagramType: 'comparison',
      titleEn: 'Evolutionary Trajectory of Liberal State Theories',
      titleHi: 'उदारवादी राज्य सिद्धांतों का ऐतिहासिक विकास',
      columns: [
        {
          titleEn: '1. Classical Liberalism (17th–18th C)',
          titleHi: '1. शास्त्रीय उदारवाद (17वीं-18वीं सदी)',
          badge: 'Night-Watchman State',
          itemsEn: [
            'John Locke: Natural Rights (Life, Liberty, Property)',
            'Adam Smith: Laissez-faire, invisible hand of the market',
            'Negative Liberty: Freedom as absence of state interference'
          ],
          itemsHi: [
            'जॉन लॉक: प्राकृतिक अधिकार (जीवन, स्वतंत्रता एवं संपत्ति)',
            'एडम स्मिथ: अहस्तक्षेप की नीति (Laissez-faire) व अदृश्य हाथ का नियम',
            'नकारात्मक स्वतंत्रता: राज्य के हस्तक्षेप का पूर्ण अभाव ही स्वतंत्रता है'
          ]
        },
        {
          titleEn: '2. Positive Welfare Liberalism (Late 19th–20th C)',
          titleHi: '2. सकारात्मक / कल्याणकारी उदारवाद',
          badge: 'Welfare Intervention',
          itemsEn: [
            'T.H. Green & L.T. Hobhouse: Liberty as capacity fulfillment',
            'Keynesian State: Public health, schooling, unemployment safety nets',
            'Rawlsian Justice: Redistribution to benefit the least advantaged'
          ],
          itemsHi: [
            'टी.एच. ग्रीन एवं हॉबहाउस: स्वतंत्रता सकारात्मक क्षमता के विकास में है',
            'कीन्सियन राज्य: स्वास्थ्य, शिक्षा, पेंशन व सामाजिक सुरक्षा तंत्र',
            'जॉन रॉल्स का न्याय सिद्धांत: समाज के सबसे वंचित वर्ग का उत्थान'
          ]
        },
        {
          titleEn: '3. Neoliberalism / Libertarianism (1970s+)',
          titleHi: '3. नव-उदारवाद (1970 के दशक से)',
          badge: 'Rolling Back State',
          itemsEn: [
            'F.A. Hayek: "The Road to Serfdom" (Planning destroys liberty)',
            'Milton Friedman: Monetarism, deregulation, and privatization',
            'Nozick: "Taxation of earnings from labor is on a par with forced labor"'
          ],
          itemsHi: [
            'एफ.ए. हेयक: "द रोड टू सर्फडम" (केंद्रीय आर्थिक नियोजन दासता का मार्ग है)',
            'मिल्टन फ्रीडमैन: मौद्रिक नीति, विनियमन-मुक्ति एवं निजीकरण (वॉशिंगटन सहमति)',
            'नॉजिक का प्रसिद्ध सूत्र: "श्रम से अर्जित आय पर करारोपण बेगार या दासता के समान है"'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'Nozick’s Entitlement Theory of Justice: Three Principles',
        headingHi: 'नॉजिक का हकदारी (Entitlement) न्याय सिद्धांत: तीन मूल नियम',
        detailEn: 'In opposition to John Rawls’ end-state redistributive justice, Robert Nozick asserted an unpatterned historical Entitlement Theory. Justice depends not on whether income distribution looks equal, but on how it came about historically through: 1) Justice in Acquisition (initial appropriation of unowned holdings), 2) Justice in Transfer (voluntary trade without coercion), and 3) Rectification of Injustice (compensating past violations).',
        detailHi: 'जॉन रॉल्स के पुनर्वितरणकारी न्याय के विपरीत, रॉबर्ट नॉजिक ने हकदारी सिद्धांत (Entitlement Theory) प्रतिपादित किया। उनके अनुसार न्याय इस बात पर निर्भर नहीं करता कि परिणाम समतावादी है या नहीं, बल्कि इस बात पर निर्भर करता है कि संपत्ति का अर्जन इतिहास में कैसे हुआ: 1. अर्जन में न्याय (प्रारंभिक निष्पक्ष प्राप्ति), 2. हस्तांतरण में न्याय (स्वैच्छिक विनिमय), तथा 3. अन्याय का परिष्कार (भूतकाल के उल्लंघनों की क्षतिपूर्ति)।',
        bulletsEn: [
          'Rawls’ Difference Principle rejected as violating self-ownership.',
          'Welfare state taxation criticized as instrumentalizing individuals for collective ends.',
          'Advocacy of minimal "ultraminimal" protective state apparatus.'
        ],
        bulletsHi: [
          'रॉल्स के भेदमूलक सिद्धांत (Difference Principle) को आत्म-स्वामित्व के विरुद्ध बताया।',
          'कल्याणकारी राज्य के करों को व्यक्तियों को साधन मात्र मानने वाला दमनकारी कृत्य माना।',
          'केवल सुरक्षा व न्याय हेतु सीमित अल्ट्रा-मिनिमल राज्य की वकालत।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['John Locke', 'Adam Smith', 'F.A. Hayek', 'Robert Nozick', 'Milton Friedman'],
      thinkersHi: ['जॉन लॉक', 'एडम स्मिथ', 'एफ.ए. हेयक', 'रॉबर्ट नॉजिक', 'मिल्टन फ्रीडमैन'],
      recommendedBooksEn: ['Anarchy, State, and Utopia by Robert Nozick', 'The Road to Serfdom by F.A. Hayek', 'Political Theory by Andrew Heywood'],
      recommendedBooksHi: ['राजनीति सिद्धांत — राजीव भार्गव एवं अशोक आचार्य', 'राजनीति सिद्धांत की रूपरेखा — ओ.पी. गाबा'],
      examQuoteEn: '"Hayek declared: Liberty is not a means to a higher political end; it is in itself the highest political end."',
      examQuoteHi: '"हेयक के अनुसार: स्वतंत्रता किसी उच्चतर राजनीतिक साध्य का साधन नहीं है; यह स्वयं में सर्वोच्च राजनीतिक साध्य है।"'
    }
  },

  // =========================================================================
  // 11. SOCIOLOGY — SEMESTER 5 — CLASSICAL THINKERS
  // =========================================================================
  {
    id: 'soc-5-1',
    topicSequence: 'Topic 5.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Max Weber: Social Action, Ideal Types, Bureaucracy and Protestant Ethic',
    titleHi: 'मैक्स वेबर: सामाजिक क्रिया, आदर्श प्रारूप, नौकरशाही एवं प्रोटेस्टेंट नीतिशास्त्र',
    subjectCode: 'SDSUV-SOC-501',
    subjectId: 'sociology',
    subjectNameEn: 'Sociology',
    subjectNameHi: 'समाजशास्त्र',
    semester: 5,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Classical Sociological Thinkers: Weberian Interpretive Sociology',
    unitTitleHi: 'इकाई I: शास्त्रीय समाजशास्त्रीय विचारक: मैक्स वेबर का व्याख्यात्मक समाजशास्त्र',
    readTime: '17 min read',
    highYieldTag: '🔥 15-Mark Classical Sociology Mandatory Question',
    upscTag: 'UPSC Sociology Optional Paper 1',
    sdsuvTag: '🔥 Asked in Every SDSUV Sem 5 Exam',
    learnTopicId: 't-soc-501',
    youtubeId: 'bF8dD_7j0wU',
    lectureChannel: 'StudyIQ IAS / Drishti IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Max+Weber+Social+Action+Bureaucracy+StudyIQ',
    conclusionEn: 'Weber revolutionized sociology by rejecting vulgar economic determinism and positivist naturalism, establishing that modern Western rational capitalism emerged from the unintended religious asceticism of the Protestant Reformation.',
    conclusionHi: 'वेबर ने मार्क्स के आर्थिक नियतिवाद तथा प्रत्यक्षवादी प्रकृतिवाद दोनों का खंडन करते हुए व्याख्यात्मक समाजशास्त्र स्थापित किया, और सिद्ध किया कि आधुनिक पश्चिमी तर्कसंगत पूंजीवाद प्रोटेस्टेंट सुधार आंदोलन की अंतर्मुखी धार्मिक तपस्या का प्रतिफल था।',
    contextEn: {
      intro: 'Max Weber (1864–1920) pioneered Verstehende Soziologie (Interpretive Sociology), defining sociology as the science which attempts the interpretive understanding of social action in order thereby to arrive at a causal explanation of its course and effects.',
      scholarDefinition: {
        scholar: 'Max Weber (Economy and Society, 1922)',
        definition: '"Action is social in so far as, by virtue of the subjective meaning attached to it by the acting individual (or individuals), it takes account of the behavior of others and is thereby oriented in its course."'
      }
    },
    contextHi: {
      intro: 'मैक्स वेबर (1864-1920) ने व्याख्यात्मक समाजशास्त्र (Verstehen) की नींव रखी। उन्होंने समाजशास्त्र को उस विज्ञान के रूप में परिभाषित किया जो सामाजिक क्रिया की व्याख्यात्मक समझ विकसित कर उसके कारण, प्रवाह एवं परिणामों का विश्लेषणात्मक स्पष्टीकरण प्रस्तुत करता है।',
      scholarDefinition: {
        scholar: 'मैक्स वेबर (इकोनॉमी एंड सोसाइटी, 1922)',
        definition: '"क्रिया तभी सामाजिक कहलाती है जब कर्ता द्वारा उस क्रिया से जुड़े व्यक्तिपरक अर्थ (Subjective Meaning) के आधार पर वह दूसरों के व्यवहार को ध्यान में रखती हो तथा उसी के अनुसार निर्देशित हो।"'
      }
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Weber’s Fourfold Typology of Social Action',
      titleHi: 'मैक्स वेबर द्वारा सामाजिक क्रिया का चार-स्तरीय वर्गीकरण',
      columns: [
        {
          titleEn: '1. Zweckrational (Instrumental)',
          titleHi: '1. उद्देश्यपूर्ण तार्किक क्रिया',
          badge: 'Means-End Rationality',
          itemsEn: [
            'Goal and means are both systematically calculated',
            'Engineered efficiency (e.g. building a bridge, corporate balance sheet)',
            'Dominant form in modern bureaucratic capitalist societies'
          ],
          itemsHi: [
            'साध्य और साधन दोनों का पूर्ण वैज्ञानिक व तार्किक मूल्यांकन',
            'दक्षता एवं लाभ पर आधारित (जैसे पुल निर्माण, कॉर्पोरेट वित्तीय योजना)',
            'आधुनिक नौकरशाही एवं पूंजीवादी समाजों का प्रधान स्वरूप'
          ]
        },
        {
          titleEn: '2. Wertrational (Value-Rational)',
          titleHi: '2. मूल्यांकनात्मक तार्किक क्रिया',
          badge: 'Intrinsic Values',
          itemsEn: [
            'Means are rational, but the end is determined by unconditional values',
            'Duty, ethics, religion, honor (e.g. captain going down with sinking ship)',
            'Action performed for its own sake regardless of personal consequences'
          ],
          itemsHi: [
            'साधन तार्किक होते हैं, किंतु साध्य नैतिक, धार्मिक या सम्मान से बंधा होता है',
            'कर्तव्यनिष्ठा या निष्काम कर्म (जैसे डूबते जहाज के साथ कैप्टन का आत्मोत्सर्ग)',
            'परिणामों की चिंता किए बिना आंतरिक नैतिक मूल्यों हेतु किया गया आचरण'
          ]
        },
        {
          titleEn: '3. Affective & Traditional',
          titleHi: '3. भावात्मक एवं पारंपरिक क्रियाएं',
          badge: 'Non-Rational Roots',
          itemsEn: [
            'Affective Action: Driven by immediate emotional states (rage, passion)',
            'Traditional Action: Guided by ingrained unreflective custom and habit',
            'Prevalent in pre-industrial and feudal traditional communities'
          ],
          itemsHi: [
            'भावात्मक क्रिया: तात्कालिक संवेगों, क्रोध, प्रेम अथवा उत्तेजना से प्रेरित',
            'पारंपरिक क्रिया: दीर्घकाल से चली आ रही प्रथाओं, रीति-रिवाजों व आदतों पर आधारित',
            'पूर्व-औद्योगिक एवं पारंपरिक सामंती समाजों में बहुतायत से पाई जाती है'
          ]
        }
      ]
    },
    analyticalPoints: [
      {
        headingEn: 'The Protestant Ethic and the Spirit of Capitalism (1905)',
        headingHi: 'प्रोटेस्टेंट नीतिशास्त्र एवं पूंजीवाद की चेतना (1905)',
        detailEn: 'Weber rejected Marx’s one-sided historical materialism by demonstrating that religious ideas can actively shape economic systems. In Calvinism, the doctrine of Double Predestination (God has already decided salvation or damnation) created severe psychological anxiety. Calvinists alleviated this anxiety through "this-worldly asceticism" (Beruf/Calling): relentless hard work, frugality, and prohibition of worldly luxuries, resulting in systematic capital accumulation and reinvestment.',
        detailHi: 'वेबर ने मार्क्स के एकांगी भौतिकवादी दृष्टिकोण का खंडन करते हुए दर्शाया कि धार्मिक विचार भी आर्थिक संरचनाओं को दिशा दे सकते हैं। काल्विनवाद में "पूर्व-नियति के सिद्धांत" (ईश्वर ने मुक्ति या नरक पहले से तय कर रखा है) ने गंभीर मानसिक अशांति उत्पन्न की। इस अशांति से मुक्ति हेतु काल्विनवादियों ने "अलौकिक तपस्या" अपनाई: अनवरत कठिन परिश्रम, मितव्ययिता तथा सांसारिक विलासिता का त्याग, जिसने व्यवस्थित पूंजी संचय और पुनःनिवेश को जन्म दिया।',
        bulletsEn: [
          'Beruf (Calling): Work is a holy divine duty, not merely mundane toil.',
          'Asceticism prevented consumption, channeling profits into productive reinvestment.',
          'Iron Cage of Bureaucracy: Rationalized capitalism outgrew its religious origins.'
        ],
        bulletsHi: [
          'आह्वान (Calling): कर्म केवल आजीविका नहीं, अपितु ईश्वर की सेवा का पवित्र दायित्व है।',
          'तपस्या ने उपभोग रोका, जिससे लाभ का उत्पादन में पुनःनिवेश हुआ।',
          'नौकरशाही का लौह पिंजरा (Iron Cage): कालांतर में तार्किकता ने धर्म से स्वतंत्र होकर मनुष्य को जकड़ लिया।'
        ]
      }
    ],
    valueAddition: {
      thinkersEn: ['Max Weber', 'Emile Durkheim', 'Karl Marx', 'Talcott Parsons'],
      thinkersHi: ['मैक्स वेबर', 'एमिल दुर्खीम', 'कार्ल मार्क्स', 'टैलकॉट पार्सन्स'],
      recommendedBooksEn: ['The Protestant Ethic and the Spirit of Capitalism by Max Weber', 'The Structure of Social Action by Talcott Parsons'],
      recommendedBooksHi: ['समाजशास्त्रीय विचारक — रवींद्रनाथ मुखर्जी', 'समाजशास्त्र के प्रमुख विचारक — एम.एल. गुप्ता'],
      examQuoteEn: '"Weber lamented: The Puritan wanted to work in a calling; we are forced to do so. The iron cage of rationality envelops modern existence."',
      examQuoteHi: '"वेबर की चेतावनी: प्यूरिटन अपनी इच्छा से ईश्वर हेतु कर्म करते थे; हम उस लौह पिंजरे में विवश होकर कर्म कर रहे हैं जिसे आधुनिक तार्किकता ने बुना है।"'
    }
  }
];
