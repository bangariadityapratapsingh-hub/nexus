import { MasterTopicNote } from './types';

export const HISTORY_CURRICULUM_NOTES: MasterTopicNote[] = [
  // =========================================================================
  // UNIT I: SOURCES & PREHISTORIC CULTURES
  // =========================================================================
  {
    id: 'his-1-1',
    topicSequence: 'Topic 1.1',
    lectureNumber: 'Lecture 01',
    titleEn: 'Sources of Ancient Indian History: Archaeological, Epigraphic, Numismatic & Literary',
    titleHi: 'प्राचीन भारतीय इतिहास के स्रोत: पुरातात्विक, अभिलेखीय, मुद्राशास्त्रीय एवं साहित्यिक',
    subjectCode: 'SDSUV-HIS-101',
    subjectId: 'history',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Sources of Ancient Indian History & Prehistoric Cultures',
    unitTitleHi: 'इकाई I: प्राचीन भारतीय इतिहास के स्रोत एवं प्रागैतिहासिक संस्कृतियां',
    readTime: '17 min read',
    highYieldTag: '🔥 15-Mark Compulsory Question',
    upscTag: 'UPSC History Optional Paper 1',
    sdsuvTag: '🔥 Asked in 90% Semester Exams',
    learnTopicId: 't-his-101',
    youtubeId: 'm9w2ZOUF6So',
    lectureChannel: 'StudyIQ IAS / Drishti IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Sources+of+Ancient+Indian+History+StudyIQ',
    conclusionEn: 'Modern scientific historiography reconstructs ancient India not through uncritical reliance on sacred myths, but through the multidisciplinary corroboration of epigraphy, numismatics, and stratified archaeological excavations against literary texts.',
    conclusionHi: 'आधुनिक वैज्ञानिक इतिहास-लेखन केवल धार्मिक अनुश्रुतियों पर निर्भर न रहकर अभिलेखों, सिक्कों तथा पुरातात्विक उत्खननों के बहु-विषयक समन्वय द्वारा प्राचीन भारत का निष्पक्ष इतिहास प्रस्तुत करता है।',
    contextEn: {
      intro:
        'Reconstructing ancient Indian history requires synthesizing two broad categories of historical data: Archaeological sources (epigraphy, numismatics, monuments, stratified excavations) and Literary sources (indigenous Vedic, Buddhist, Jain, secular texts, and foreign travelogues by Megasthenes, Fa-Hien, and Xuanzang).',
      scholarDefinition: {
        scholar: 'Prof. Romila Thapar & R.G. Bhandarkar',
        definition:
          '"Historical sources in ancient India do not present self-evident narratives; they are cultural artifacts that must be critically interrogated through stratigraphy, palaeography, and socio-economic contextualization."',
      },
    },
    contextHi: {
      intro:
        'प्राचीन भारतीय इतिहास के पुनर्निर्माण हेतु दो प्रमुख स्रोतों का सहारा लिया जाता है: पुरातात्विक स्रोत (अभिलेख, सिक्के, स्मारक, उत्खनन) तथा साहित्यिक स्रोत (वैदिक, बौद्ध, जैन ग्रंथ, धर्मशास्त्र, कौटिल्य का अर्थशास्त्र तथा विदेशी यात्रियों जैसे मेगस्थनीज, फाह्यान व ह्वेनसांग के यात्रा वृत्तांत)।',
      scholarDefinition: {
        scholar: 'प्रो. रोमिला थापर एवं आर.जी. भंडारकर',
        definition:
          '"प्राचीन भारत के ऐतिहासिक स्रोत मात्र कहानियां नहीं हैं; वे अपने युग के सामाजिक-आर्थिक संदर्भों के दस्तावेज हैं जिन्हें स्तरिकी, पुरालिपिशास्त्र एवं आलोचनात्मक दृष्टि से समझा जाना आवश्यक है।"',
      },
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Taxonomy of Ancient Indian Historical Sources',
      titleHi: 'प्राचीन भारतीय इतिहास के स्रोतों का वर्गीकरण',
      columns: [
        {
          titleEn: '1. Epigraphy & Inscriptions',
          titleHi: '1. अभिलेखीय स्रोत (Epigraphy)',
          badge: 'Most Reliable Chronology',
          itemsEn: [
            'Ashokan Edicts: Deciphered by James Prinsep (1837) in Brahmi and Kharosthi',
            'Prashastis: Allahabad Pillar of Samudragupta (Harishena), Aihole of Pulakeshin II (Ravikirti)',
            'Land grants (Tamrapatra): Post-Mauryan copper plates recording agrahara land donations',
          ],
          itemsHi: [
            'अशोक के शिलालेख: जेम्स प्रिंसेप द्वारा 1837 में ब्राह्मी व खरोष्ठी लिपि में पढ़े गए',
            'प्रशस्तियां: समुद्रगुप्त की प्रयाग प्रशस्ति (हरिषेण), पुलकेशिन द्वितीय की ऐहोल प्रशस्ति (रविकीर्ति)',
            'ताम्रपत्र अभिलेख: भूमि अनुदान (अग्रहार) एवं सामाजिक-आर्थिक व्यवस्था के प्रामाणिक साक्ष्य',
          ],
        },
        {
          titleEn: '2. Numismatics & Archaeology',
          titleHi: '2. मुद्राशास्त्र एवं उत्खनन',
          badge: 'Economic & Chronological Data',
          itemsEn: [
            'Punch-Marked Coins (Aahat): Earliest silver/copper currency (6th-3rd century BCE)',
            'Indo-Greek Coins: First coins with bilingual portraits and reigning dates',
            'Gupta Gold Dinars: High artistic standard showing economic prosperity and debasement',
            'Stratigraphy: Wheeler-style vertical and horizontal excavations at Harappa, Hastinapur',
          ],
          itemsHi: [
            'आहत सिक्के (Punch-marked): 6ठी शताब्दी ई.पू. के भारत के प्राचीनतम चांदी व तांबे के सिक्के',
            'हिंद-यवन (Indo-Greek) सिक्के: सर्वप्रथम शासकों के नाम, चित्र व तिथियों का अंकन',
            'गुप्तकालीन स्वर्ण सिक्के (दीनार): कलात्मक पराकाष्ठा एवं परवर्ती काल में मिलावट (आर्थिक ह्रास)',
            'पुरातात्विक उत्खनन: व्हीलर पद्धति द्वारा हड़प्पा, हस्तिनापुर, तक्षशिला का स्तरीकृत अध्ययन',
          ],
        },
        {
          titleEn: '3. Literary & Foreign Accounts',
          titleHi: '3. साहित्यिक एवं विदेशी विवरण',
          badge: 'Textual Corroboration',
          itemsEn: [
            'Vedic & Epics: Rigveda, Later Vedas, Upanishads, Mahabharata, Ramayana',
            'Heterodox texts: Buddhist Tripitakas and Jatakas; Jain Agamas',
            'Secular texts: Kautilya’s Arthashastra, Megasthenes’s Indica, Kalhana’s Rajatarangini',
            'Chinese pilgrims: Fa-Hien (Gupta era), Xuanzang (Harsha era)',
          ],
          itemsHi: [
            'वैदिक साहित्य: ऋग्वेद, उत्तर वैदिक संहिताएं, उपनिषद, रामायण एवं महाभारत',
            'श्रमण साहित्य: बौद्ध त्रिपिटक, जातक कथाएं एवं जैन आगम साहित्य',
            'धर्मनिरपेक्ष ग्रंथ: कौटिल्य का अर्थशास्त्र, मेगस्थनीज की इंडिका, कल्हण की राजतरंगिणी',
            'विदेशी यात्री: मेगस्थनीज, फाह्यान (चंद्रगुप्त द्वितीय काल), ह्वेनसांग (हर्षवर्धन काल)',
          ],
        },
      ],
    },
    analyticalPoints: [
      {
        headingEn: 'Epigraphy as the Bedrock of Historical Verifiability',
        headingHi: 'ऐतिहासिक प्रामाणिकता की आधारशिला के रूप में अभिलेखीय साक्ष्य',
        detailEn:
          'Inscriptions provide contemporary, unaltered, and geographically anchored data free from later interpolations that frequently distort literary traditions. James Prinsep’s decipherment of Ashoka’s Brahmi script in 1837 unlocked the socio-political realities of the 3rd century BCE. Edicts engraved on permanent rock surfaces (Girnar, Kalsi in Uttarakhand, Dhauli) record administrative orders, public welfare works, and Ashoka’s remorse post-Kalinga.',
        detailHi:
          'अभिलेख समकालीन, अपरिवर्तित और भौगोलिक रूप से स्थिर साक्ष्य प्रदान करते हैं जिनमें बाद के प्रक्षेपों की संभावना नहीं होती। 1837 में जेम्स प्रिंसेप द्वारा ब्राह्मी लिपि के पढ़े जाने से मौर्य सम्राट अशोक का वास्तविक इतिहास उद्घाटित हुआ। चट्टानों और स्तंभों पर उत्कीर्ण अभिलेख (जैसे उत्तराखंड का कालसी शिलालेख, गिरनार, धौली) प्रशासनिक नीतियों, जन-कल्याण और कलिंग युद्ध के पश्चात धम्म-विजय की वास्तविक गाथा प्रस्तुत करते हैं।',
        bulletsEn: [
          'Permanent medium: Engraved in stone or metal, preventing retrospective textual edits.',
          'Palaeographical dating: Script evolution allows precise decade-level dating.',
          'Prashastis vs Land grants: Royal genealogies balanced by socio-economic village tenancy records.',
        ],
        bulletsHi: [
          'स्थायी माध्यम: पाषाण एवं ताम्रपत्रों पर उत्कीर्ण होने से बाद में हेरफेर संभव नहीं।',
          'पुरालिपिशास्त्र: अक्षरों की बनावट के आधार पर सटीक काल-निर्धारण संभव।',
          'संतुलित दृष्टिकोण: राजाओं की प्रशस्तियों के साथ-साथ भूमि अनुदान पत्रों से कृषक समाज की जानकारी।',
        ],
        quoteOrArticle: 'Archaeological Discovery: James Prinsep Decipherment of Ashokan Brahmi (1837)',
      },
      {
        headingEn: 'Numismatics: Economic Barometer and Dynastic Reconstructions',
        headingHi: 'मुद्राशास्त्र: आर्थिक समृद्धि का बैरोमीटर एवं राजवंशों का पुनर्गठन',
        detailEn:
          'Coins reveal dynastic chronologies, territorial frontiers, metallurgical mastery, trade volume, and religious iconography. Over 30 Indo-Greek kings and queens who ruled the North-West are known exclusively through their bilingual and biscriptural coins. The purity of Gupta gold dinars under Samudragupta and Chandragupta II corroborates a thriving trans-continental trade, while the debasement of gold during the Later Guptas reflects fiscal stress and urban contraction.',
        detailHi:
          'सिक्के केवल विनिमय का साधन नहीं हैं, बल्कि वे राजनीतिक सीमाओं, व्यापारिक समृद्धि और धार्मिक विश्वासों के दर्पण हैं। पश्चिमोत्तर भारत पर शासन करने वाले 30 से अधिक हिंद-यवन राजाओं का इतिहास केवल उनके द्विभाषी सिक्कों से ही ज्ञात हुआ है। समुद्रगुप्त और चंद्रगुप्त द्वितीय के काल के शुद्ध स्वर्ण सिक्के आर्थिक समृद्धि का प्रमाण हैं, जबकि स्कंदगुप्त के बाद सोने के सिक्कों में धातु की मिलावट उत्तर-गुप्त कालीन आर्थिक संकट को दर्शाती है।',
        bulletsEn: [
          'Indo-Greek breakthrough: Coins bore portrait heads, regnal years, and Greek-Kharosthi legends.',
          'Metallurgical purity: High gold content under early Guptas versus debased coins of late 5th century.',
          'Roman trade coins: Hoards of Roman aurei found in Arikamedu prove extensive Indo-Roman maritime trade.',
        ],
        bulletsHi: [
          'हिंद-यवन योगदान: सर्वप्रथम राजाओं के चित्र, शासन वर्ष और उपाधियों का सिक्कों पर अंकन।',
          'धातु शोधन: प्रारंभिक गुप्त काल में 90%+ शुद्ध सोना बनाम परवर्ती गुप्त काल में तांबे की मिलावट।',
          'रोमन सिक्के: दक्षिण भारत के अरिकामेडु से रोमन स्वर्ण सिक्कों का मिलना घनिष्ठ समुद्री व्यापार सिद्ध करता है।',
        ],
        quoteOrArticle: 'Numismatic Evidence: D.D. Kosambi’s Statistical Coin Analysis',
      },
    ],
    valueAddition: {
      thinkersEn: ['James Prinsep', 'Sir Alexander Cunningham', 'Prof. Romila Thapar', 'Prof. R.S. Sharma', 'D.D. Kosambi'],
      thinkersHi: ['जेम्स प्रिंसेप', 'सर अलेक्जेंडर कनिंघम', 'प्रो. रोमिला थापर', 'प्रो. आर.एस. शर्मा', 'डी.डी. कोसांबी'],
      recommendedBooksEn: ['Early India by Romila Thapar', 'India’s Ancient Past by R.S. Sharma', 'A History of Ancient and Early Medieval India by Upinder Singh'],
      recommendedBooksHi: ['प्रारंभिक भारत का इतिहास — रोमिला थापर', 'प्राचीन भारत — प्रो. आर.एस. शर्मा', 'प्राचीन एवं पूर्व मध्यकालीन भारत — उपिंदर सिंह'],
      examQuoteEn: '"History without archaeology is like a tree without roots; inscriptions and coins provide the factual spine upon which literary narratives must be tested."',
      examQuoteHi: '"पुरातत्व के बिना इतिहास बिना जड़ के वृक्ष के समान है; अभिलेख और सिक्के वह ठोस मेरुदंड हैं जिन पर साहित्यिक आख्यानों की प्रामाणिकता की परीक्षा होती है।',
      upscConnectionEn: 'UPSC History Optional: Critical evaluation of literary vs archaeological sources; Epigraphic significance of Kalsi, Junagadh and Allahabad inscriptions.',
      upscConnectionHi: 'यूपीएससी एवं राज्य पीसीएस: साहित्यिक बनाम पुरातात्विक स्रोतों की तुलना; कालसी (उत्तराखंड), जूनागढ़ एवं प्रयाग प्रशस्ति का ऐतिहासिक महत्व।',
      topperTipEn: 'In your introductory paragraph, highlight Sir Alexander Cunningham (Father of Indian Archaeology) and James Prinsep (1837) to establish immediate scholarly credibility.',
      topperTipHi: 'उत्तर के आरंभ में भारतीय पुरातत्व के जनक सर अलेक्जेंडर कनिंघम और 1837 में ब्राह्मी लिपि को पढ़ने वाले जेम्स प्रिंसेप का उल्लेख अवश्य करें।',
    },
    answerBlueprint: {
      questionTitleEn: 'Discuss the relative importance of archaeological and literary sources for the reconstruction of Ancient Indian History.',
      questionTitleHi: 'प्राचीन भारतीय इतिहास के पुनर्निर्माण में पुरातात्विक एवं साहित्यिक स्रोतों के तुलनात्मक महत्व की विवेचना कीजिए। (15 अंक)',
      introductionEn: 'Define historiography in ancient India; state why multidisciplinary corroboration is essential and classify primary sources.',
      introductionHi: 'प्राचीन भारतीय इतिहास-लेखन की चुनौतियों की भूमिका लिखें; पुरातात्विक एवं साहित्यिक साक्ष्यों के समन्वय की अनिवार्यता स्पष्ट करें।',
      coreHeadingsEn: [
        '1. Epigraphic Primacy: Ashokan Edicts, Royal Prashastis and Copper-Plate Land Grants',
        '2. Numismatic Chronicles: Chronology, Metallurgical Purity and Indo-Roman Trade Networks',
        '3. Stratified Archaeological Excavations: Material Culture from Painted Grey Ware to NBPW',
        '4. Literary Sources & Foreign Accounts: Indigenous Scriptures, Kautilya’s Arthashastra & Pilgrim Diaries',
      ],
      coreHeadingsHi: [
        '1. अभिलेखीय साक्ष्यों की सर्वोच्चता: अशोक के शिलालेख, प्रशस्तियां एवं ताम्रपत्र भूमि अनुदान',
        '2. मुद्राशास्त्रीय साक्ष्य: हिंद-यवन सिक्के, गुप्तकालीन स्वर्ण दीनार एवं हिंद-रोमन व्यापार',
        '3. पुरातात्विक उत्खनन: चित्रित धूसर मृदभांड (PGW) से उत्तरी काली पॉलिशदार परंपरा (NBPW)',
        '4. साहित्यिक स्रोत व विदेशी वृत्तांत: धार्मिक व धर्मनिरपेक्ष ग्रंथ, मेगस्थनीज व चीनी यात्रियों का विवरण',
      ],
      conclusionEn: 'Conclude with Kalhana’s ideal historian definition in Rajatarangini: an impartial judge weighing material against textual evidence.',
      conclusionHi: 'निष्कर्ष में कल्हण की राजतरंगिणी के उस आदर्श को उद्धृत करें कि सच्चा इतिहासकार वही है जो राग-द्वेष से मुक्त होकर निष्पक्ष साक्ष्यों का परीक्षण करे।',
    },
    commonMistakes: [
      {
        mistakeEn: 'Accepting religious epics as literal chronological history without archaeological corroboration.',
        mistakeHi: 'धार्मिक महाकाव्यों को बिना पुरातात्विक पुष्टि के सीधे ऐतिहासिक सत्य मान लेना।',
        correctionEn: 'Clarify that epics contain core historical kernels mixed with centuries of poetic accretion and mythological expansion.',
        correctionHi: 'स्पष्ट लिखें कि महाकाव्य सांस्कृतिक इतिहास के अमूल्य स्रोत हैं, किंतु राजनीतिक तिथियों हेतु पुरातात्विक और अभिलेखीय साक्ष्य अनिवार्य हैं।',
      },
    ],
    mcqs: [
      {
        questionEn: 'Who successfully deciphered the Ashokan Brahmi and Kharosthi inscriptions for the first time in 1837?',
        questionHi: '1837 में सर्वप्रथम अशोक के ब्राह्मी एवं खरोष्ठी अभिलेखों को पढ़ने में किसने सफलता प्राप्त की थी?',
        optionsEn: ['Sir William Jones', 'James Prinsep', 'Alexander Cunningham', 'Max Müller'],
        optionsHi: ['सर विलियम जोन्स', 'जेम्स प्रिंसेप', 'अलेक्जेंडर कनिंघम', 'मैक्स मूलर'],
        correctIndex: 1,
        explanationEn: 'James Prinsep deciphered the Ashokan Brahmi and Kharosthi scripts in 1837.',
        explanationHi: 'जेम्स प्रिंसेप ने 1837 में अशोक की ब्राह्मी व खरोष्ठी लिपियों को पहली बार पढ़ने में सफलता पाई।',
      },
      {
        questionEn: 'Which inscription provides detailed historical information about the conquests of Samudragupta?',
        questionHi: 'किस अभिलेख से गुप्त सम्राट समुद्रगुप्त की विजयों का विस्तृत विवरण प्राप्त होता है?',
        optionsEn: ['Junagadh Rock Inscription', 'Aihole Inscription', 'Prayag Prashasti (Allahabad Pillar)', 'Mehrauli Iron Pillar'],
        optionsHi: ['जूनागढ़ शिलालेख', 'ऐहोल अभिलेख', 'प्रयाग प्रशस्ति (इलाहाबाद स्तंभ)', 'महरौली लौह स्तंभ'],
        correctIndex: 2,
        explanationEn: 'The Prayag Prashasti, composed by court poet Harishena, narrates Samudragupta’s digvijaya military campaigns.',
        explanationHi: 'प्रयाग प्रशस्ति समुद्रगुप्त के दरबारी कवि हरिषेण द्वारा रचित है, जिसमें समुद्रगुप्त के विजय अभियानों का विस्तृत वर्णन है।',
      },
      {
        questionEn: 'The earliest systematic punch-marked coins (Aahat) in ancient India were predominantly minted from which metal?',
        questionHi: 'प्राचीन भारत के आरंभिक आहत सिक्के (Punch-marked) मुख्यतः किस धातु के बने होते थे?',
        optionsEn: ['Gold', 'Silver and Copper', 'Lead and Zinc', 'Tin only'],
        optionsHi: ['सोना', 'चांदी एवं तांबा', 'सीसा एवं जस्ता', 'केवल टिन'],
        correctIndex: 1,
        explanationEn: 'Punch-marked coins of the 6th to 3rd century BCE were struck predominantly in silver (and copper).',
        explanationHi: 'छठी शताब्दी ई.पू. के आहत सिक्के मुख्यतः चांदी और तांबे के बने होते थे।',
      },
    ],
  },

  // 1.2 Stone Age Cultures
  {
    id: 'his-1-2',
    topicSequence: 'Topic 1.2',
    lectureNumber: 'Lecture 02',
    titleEn: 'Stone Age Cultures: Palaeolithic, Mesolithic, Neolithic & Chalcolithic Revolutions',
    titleHi: 'पाषाण युगीन संस्कृतियां: पुरापाषाण, मध्यपाषाण, नवपाषाणिक क्रांति एवं ताम्रपाषाण काल',
    subjectCode: 'SDSUV-HIS-101',
    subjectId: 'history',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 1,
    unitTitleEn: 'Unit I: Sources of Ancient Indian History & Prehistoric Cultures',
    unitTitleHi: 'इकाई I: प्राचीन भारतीय इतिहास के स्रोत एवं प्रागैतिहासिक संस्कृतियां',
    readTime: '18 min read',
    highYieldTag: '⚡ 15-Mark Core Prehistory Question',
    upscTag: 'UPSC Stone Age & Bhimbetka Art',
    sdsuvTag: '🔥 Asked 5x in SDSUV Exams',
    learnTopicId: 't-his-102',
    youtubeId: 'hW7tCQ457FA',
    lectureChannel: 'Drishti IAS / PW OnlyIAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Stone+Age+Cultures+Palaeolithic+Neolithic+Chalcolithic+Drishti+IAS',
    conclusionEn: 'The prehistoric progression from Pleistocene hunter-gatherers to the Holocene Neolithic food-producing revolution (Mehrgarh, Burzahom) created the surplus that ultimately birthed the Bronze Age Harappan urban civilization.',
    conclusionHi: 'पुरापाषाण कालीन आखेटक-खाद्य संग्राहक अवस्था से निकलकर नवपाषाण काल में कृषि, पशुपालन और स्थाई बस्तियों की स्थापना ने वह अधिशेष पैदा किया जिसने सिंधु घाटी सभ्यता के प्रथम नगरीकरण को जन्म दिया।',
    contextEn: {
      intro:
        'Indian prehistory spans from Lower Palaeolithic Acheulian handaxe cultures of Soan Valley and Attirampakkam to the Neolithic food-producing revolution at Mehrgarh, culminating in regional Chalcolithic cultures.',
      scholarDefinition: {
        scholar: 'V. Gordon Childe & H.D. Sankalia',
        definition:
          '"The Neolithic transition was the true technological and economic revolution in human history, liberating humanity from precarious reliance on wild foraging and laying the sedentary economic foundation of civilizational life."',
      },
    },
    contextHi: {
      intro:
        'भारतीय प्रागैतिहास सोहन घाटी के हस्तकुठारों से लेकर मेहरगढ़ की नवपाषाणिक क्रांति तक फैला है। गॉर्डन चाइल्ड ने शिकारी जीवन से खाद्य उत्पादक जीवन के इस रूपांतरण को "नवपाषाणिक क्रांति" कहा।',
      scholarDefinition: {
        scholar: 'वी. गॉर्डन चाइल्ड एवं प्रो. एच.डी. सांकलिया',
        definition:
          '"नवपाषाणिक संक्रमण मानव इतिहास की वास्तविक आर्थिक एवं तकनीकी क्रांति थी, जिसने स्थाई बस्तियों, कृषि एवं सभ्यता के विकास का मार्ग प्रशस्त किया।"',
      },
    },
    flowchart: {
      diagramType: 'timeline',
      titleEn: 'Chronological Succession of Prehistoric Cultures in India',
      titleHi: 'भारत की प्रागैतिहासिक संस्कृतियों का कालक्रमिक विकास',
      columns: [
        {
          titleEn: '1. Palaeolithic Age (पुरापाषाण)',
          titleHi: '1. पुरापाषाण काल (Palaeolithic)',
          badge: '2.5 Ma - 10,000 BCE',
          itemsEn: [
            'Lower Palaeolithic: Soan Pebble/Chopper & Madrasian Acheulian Handaxes',
            'Middle Palaeolithic: Flake tool industry (Scrapers, Borers, Points)',
            'Upper Palaeolithic: Blade and burin technology; Bhimbetka rock art beginnings',
          ],
          itemsHi: [
            'निम्न पुरापाषाण: सोहन घाटी चापर-चॉपिंग एवं मद्रासियन हस्तकुठार परंपरा',
            'मध्य पुरापाषाण: फलक संस्कृति; चर्ट व जैस्पर से निर्मित खुरचनी व बेधनी',
            'उच्च पुरापाषाण: ब्लेड व ब्युरिन उद्योग; भीमबेटका शैलकला का आरंभ',
          ],
        },
        {
          titleEn: '2. Mesolithic Transition (मध्यपाषाण)',
          titleHi: '2. मध्यपाषाण काल (Mesolithic)',
          badge: '10,000 - 6,000 BCE',
          itemsEn: [
            'Microliths (1-5 cm) mounted on bone/wood shafts (arrows, composite sickles)',
            'Holocene warming: Hunting smaller game, fishing, wild plant collection',
            'Earliest animal domestication: Bagor (Rajasthan) and Adamgarh (MP)',
            'Bhimbetka rock art peak: Communal hunting, dancing, animistic rituals',
          ],
          itemsHi: [
            'सूक्ष्म पाषाण औजार (Microliths): ज्यामितीय लघु औजार तीर-धनुष में प्रयुक्त',
            'होलोसीन तापन: छोटे जीवों का शिकार, मत्स्य पालन व पौधों का संग्रह',
            'पशुपालन का प्राचीनतम साक्ष्य: बागोर (राजस्थान) एवं आदमगढ़ (मप्र)',
            'भीमबेटका शैलकला का स्वर्णकाल: सामूहिक शिकार व नृत्य के दृश्य',
          ],
        },
        {
          titleEn: '3. Neolithic & Chalcolithic (नव-ताम्रपाषाण)',
          titleHi: '3. नवपाषाण एवं ताम्रपाषाण काल',
          badge: '7,000 - 1,000 BCE',
          itemsEn: [
            'Neolithic Revolution: Settled farming, polished celts, pottery, mud-brick granaries',
            'Mehrgarh (c. 7000 BCE): Earliest settled wheat-barley farming in South Asia',
            'Koldihwa (Belan): Earliest cultivated rice evidence (~6500 BCE)',
            'Burzahom (Kashmir): Pit-dwellings and dog burials with humans',
            'Chalcolithic: Copper + stone tool use; Ahar-Banas, Malwa, Jorwe cultures',
          ],
          itemsHi: [
            'नवपाषाण क्रांति: कृषि, पॉलिशदार कुल्हाड़ियां, चाक पर मृदभांड, स्थाई ग्राम',
            'मेहरगढ़ (7000 ई.पू.): गेहूं-जौ की खेती एवं अन्नागार का प्राचीनतम साक्ष्य',
            'कोल्डिहवा (बेलन घाटी): चावल/धान की खेती का प्राचीनतम साक्ष्य',
            'बुर्जहोम (कश्मीर): जमीन के नीचे गर्तावास एवं कुत्ते को दफनाने के साक्ष्य',
            'ताम्रपाषाण: तांबा व पत्थर का संयुक्त प्रयोग; अहाड़, मालवा, जोर्वे संस्कृतियां',
          ],
        },
      ],
    },
    analyticalPoints: [
      {
        headingEn: 'The Neolithic Revolution at Mehrgarh: Blueprint of South Asian Sedentism',
        headingHi: 'मेहरगढ़ की नवपाषाणिक क्रांति: भारतीय उपमहाद्वीप में स्थाई जीवन की आधारशिला',
        detailEn:
          'Excavated by Jean-François Jarrige, Mehrgarh on the Bolan River in Baluchistan preserves a continuous cultural stratigraphy from aceramic Neolithic (c. 7000 BCE) to the threshold of Harappan urbanization. Period I reveals mud-brick multi-room granaries, cultivated six-row barley, emmer wheat, and transition from wild hunting to domesticated cattle (Bos indicus), establishing that agriculture in South Asia was an indigenous development.',
        detailHi:
          'मेहरगढ़ (बलूचिस्तान) में 7000 ई.पू. से निरंतर विकास मिलता है जहां कच्ची ईंटों के बहु-कक्षीय अन्नागार, गेहूं-जौ की खेती और कूबड़ वाले बैल (Bos indicus) के पालन के साक्ष्य मिले हैं। इसने सिद्ध किया कि भारतीय उपमहाद्वीप में कृषि किसी विदेशी प्रभाव के बिना स्वतंत्र रूप से विकसित हुई।',
        bulletsEn: [
          'Aceramic to Ceramic: Evolution from hand-formed clay to wheel-turned painted pottery.',
          'Granary architecture: Multi-compartment storage structures confirming agricultural surplus.',
          'Indigenous domestication: Independent domestication of humped zebu cattle in South Asia.',
        ],
        bulletsHi: [
          'अमृदभांड से मृदभांड: हस्तनिर्मित बर्तनों से चाक पर बने सुंदर बर्तनों का विकास।',
          'अन्नागार: खाद्यान्न अधिशेष के संचयन के प्रमाण।',
          'स्वदेशी पशुपालन: कूबड़ वाले भारतीय बैल का स्वतंत्र रूप से पालन।',
        ],
        quoteOrArticle: 'Archaeological Benchmark: Jarrige Excavations at Mehrgarh (1974-1985)',
      },
    ],
    valueAddition: {
      thinkersEn: ['V. Gordon Childe', 'H.D. Sankalia', 'V.S. Wakankar', 'Jean-François Jarrige'],
      thinkersHi: ['वी. गॉर्डन चाइल्ड', 'एच.डी. सांकलिया', 'वी.एस. वाकणकर', 'ज्यां-फ्रांस्वा जारिज'],
      recommendedBooksEn: ['Prehistory and Protohistory of India by H.D. Sankalia', 'The Archaeology of Ancient Indian Cities by D.K. Chakrabarti'],
      recommendedBooksHi: ['भारतीय प्रागैतिहास — प्रो. डी.एन. त्रिपाठी', 'प्राचीन भारत — प्रो. आर.एस. शर्मा'],
      examQuoteEn: '"The stone tools of the Palaeolithic and the sickles of the Neolithic are humanity’s first victories over raw nature."',
      examQuoteHi: '"पुरापाषाण के हस्तकुठार और नवपाषाण के हंसिए प्रकृति पर मानव की प्रथम विजय के प्रतीक हैं।',
      upscConnectionEn: 'UPSC Mains GS-1: Neolithic Revolution characteristics and geographical distribution; Bhimbetka prehistoric rock art.',
      upscConnectionHi: 'यूपीएससी एवं राज्य पीसीएस: नवपाषाण क्रांति के लक्षण एवं स्थल (मेहरगढ़, बुर्जहोम, कोल्डिहवा); भीमबेटका शैलकला।',
      topperTipEn: 'Always construct a sequential table showing the 4 Stone Age phases with Tool Technology, Economy, and Key Indian Sites.',
      topperTipHi: 'उत्तर में चारों पाषाण युगों की एक तुलनात्मक तालिका बनाएं जिसमें उपकरण, अर्थव्यवस्था और प्रमुख स्थलों का उल्लेख हो।',
    },
    answerBlueprint: {
      questionTitleEn: 'What is meant by the "Neolithic Revolution"? Trace the development of stone age cultures in India from Palaeolithic to Neolithic times.',
      questionTitleHi: '"नवपाषाणिक क्रांति" से क्या अभिप्राय है? पुरापाषाण काल से नवपाषाण काल तक भारत में पाषाण युगीन संस्कृतियों के विकास को रेखांकित कीजिए। (15 अंक)',
      introductionEn: 'Define prehistory; introduce V. Gordon Childe’s concept of the Neolithic Revolution as the foundational socioeconomic transition.',
      introductionHi: 'प्रागैतिहासिक काल की परिभाषा लिखें; गॉर्डन चाइल्ड के "नवपाषाण क्रांति" के सिद्धांत का परिचय दें।',
      coreHeadingsEn: [
        '1. The Palaeolithic Baseline: Lower, Middle, and Upper Flake/Blade Tool Industries',
        '2. The Mesolithic Transition: Microlithic Technology & Bhimbetka Art',
        '3. The Neolithic Revolution: Agriculture, Sedentary Villages, Polished Tools & Pottery',
        '4. Key Regional Neolithic Centers: Mehrgarh (Baluchistan), Burzahom (Kashmir) & Koldihwa (Belan)',
      ],
      coreHeadingsHi: [
        '1. पुरापाषाण कालीन आधार: निम्न, मध्य एवं उच्च पुरापाषाणिक उपकरण व जीवन शैली',
        '2. मध्यपाषाण कालीन संक्रमण: सूक्ष्म पाषाण उपकरण, पशुपालन का आरंभ एवं भीमबेटका शैलकला',
        '3. नवपाषाण क्रांति के लक्षण: कृषि, स्थाई ग्रामीण बस्तियां, घर्षित कुल्हाड़ियां एवं चाक पर मृदभांड',
        '4. प्रमुख क्षेत्रीय केंद्र: मेहरगढ़ (अन्नागार), बुर्जहोम (गर्तावास) एवं कोल्डिहवा (धान की खेती)',
      ],
      conclusionEn: 'Conclude with how the agricultural surplus of the Neolithic-Chalcolithic periods laid the infrastructural base for the Harappan Civilization.',
      conclusionHi: 'निष्कर्ष में बताएं कि नवपाषाण युग के कृषि अधिशेष ने ही कांस्य युगीन हड़प्पा सभ्यता के प्रथम नगरीकरण का मार्ग प्रशस्त किया।',
    },
    commonMistakes: [
      {
        mistakeEn: 'Stating that Neolithic people used iron implements.',
        mistakeHi: 'यह लिखना कि नवपाषाण काल के लोग लोहे के औजारों का प्रयोग करते थे।',
        correctionEn: 'Clarify that iron was completely unknown until the 1st millennium BCE; Neolithic people used polished stone celts and bone tools.',
        correctionHi: 'स्पष्ट लिखें कि नवपाषाण काल में लोहे का ज्ञान नहीं था; वे केवल पॉलिशदार पत्थर और हड्डियों के औजारों का प्रयोग करते थे।',
      },
    ],
    mcqs: [
      {
        questionEn: 'The earliest evidence of settled agriculture in the Indian subcontinent (c. 7000 BCE) was discovered at:',
        questionHi: 'भारतीय उपमहाद्वीप में स्थाई कृषि के प्राचीनतम साक्ष्य (लगभग 7000 ई.पू.) कहां से प्राप्त हुए हैं?',
        optionsEn: ['Burzahom', 'Mehrgarh (Baluchistan)', 'Lothal', 'Inamgaon'],
        optionsHi: ['बुर्जहोम', 'मेहरगढ़ (बलूचिस्तान)', 'लोथल', 'इनामगांव'],
        correctIndex: 1,
        explanationEn: 'Mehrgarh in Baluchistan provides the earliest stratified record of agriculture and village sedentism in South Asia.',
        explanationHi: 'बलूचिस्तान के मेहरगढ़ से 7000 ई.पू. के गेहूं, जौ की खेती और अन्नागार के साक्ष्य मिले हैं।',
      },
      {
        questionEn: 'Subterranean pit-dwellings and burials of domestic dogs alongside masters are diagnostic traits of which Neolithic site?',
        questionHi: 'गर्तावास तथा मालिक के शव के साथ पालतू कुत्ते को दफनाने के साक्ष्य किस नवपाषाणिक स्थल से प्राप्त हुए हैं?',
        optionsEn: ['Chirand', 'Koldihwa', 'Burzahom (Kashmir)', 'Brahmagiri'],
        optionsHi: ['चिरांद', 'कोल्डिहवा', 'बुर्जहोम (कश्मीर)', 'ब्रह्मगिरि'],
        correctIndex: 2,
        explanationEn: 'Burzahom near Srinagar is renowned for subterranean pit-dwellings and unique dog burials with masters.',
        explanationHi: 'कश्मीर के बुर्जहोम से गर्तावास तथा मालिक के साथ पालतू कुत्ते के कंकाल मिले हैं।',
      },
      {
        questionEn: 'The prehistoric painted rock art caves of Bhimbetka were discovered in 1957 by:',
        questionHi: 'भीमबेटका की ऐतिहासिक गुफाओं की खोज 1957 में किसने की थी?',
        optionsEn: ['Dr. V.S. Wakankar', 'Sir John Marshall', 'D.D. Kosambi', 'Dayaram Sahni'],
        optionsHi: ['डॉ. वी.एस. वाकणकर', 'सर जॉन मार्शल', 'डी.डी. कोसांबी', 'दयाराम साहनी'],
        correctIndex: 0,
        explanationEn: 'Dr. Vishnu Shridhar Wakankar discovered the painted rock shelters of Bhimbetka in 1957.',
        explanationHi: '1957 में पुरातत्ववेत्ता डॉ. विष्णु श्रीधर वाकणकर ने भीमबेटका की गुफाओं की खोज की थी।',
      },
    ],
  },

  // =========================================================================
  // UNIT II: HARAPPAN CIVILIZATION & VEDIC AGE
  // =========================================================================
  {
    id: 'his-2-1',
    topicSequence: 'Topic 2.1',
    lectureNumber: 'Lecture 03',
    titleEn: 'Harappan Civilization: Origin, Town Planning, Economy & Decline Theories',
    titleHi: 'हड़प्पा सभ्यता: उत्पत्ति, नगर नियोजन, अर्थव्यवस्था एवं पतन के पुरातात्विक साक्ष्य',
    subjectCode: 'SDSUV-HIS-101',
    subjectId: 'history',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 2,
    unitTitleEn: 'Unit II: Harappan Civilization & Vedic Society',
    unitTitleHi: 'इकाई II: हड़प्पा सभ्यता एवं वैदिक समाज',
    readTime: '19 min read',
    highYieldTag: '🔥 15-Mark Core Harappan Question',
    upscTag: 'UPSC GS-1 Bronze Age Urbanism',
    sdsuvTag: '🔥 Asked in Almost Every Semester Exam',
    learnTopicId: 't-his-201',
    youtubeId: 'WMopoZiIg1Q',
    lectureChannel: 'Eklavya स्नातक / StudyIQ IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Harappan+Town+Planning+Indus+Valley+Civilization+StudyIQ',
    conclusionEn: 'The Harappan Civilization was South Asia’s first Bronze Age urban zenith, distinguished by municipal egalitarianism, grid planning, and underground sanitation rather than monumental royal tombs; its decline was not an overnight massacre but a gradual de-urbanization driven by hydrological shifts and climate desiccation.',
    conclusionHi: 'हड़प्पा सभ्यता भारतीय उपमहाद्वीप का प्रथम कांस्य युगीन नगरीकरण थी, जिसकी पहचान विशाल राजमहलों के बजाय ग्रिड नगर नियोजन, मानकीकृत ईंटें और भूमिगत जल निकासी प्रणाली थी; इसका पतन किसी आकस्मिक आक्रमण से नहीं बल्कि जलवायु परिवर्तन और घग्घर-हाकरा (सरस्वती) नदी के सूखने से क्रमिक रूप से हुआ।',
    contextEn: {
      intro:
        'Discovered in 1921 by Dayaram Sahni at Harappa and R.D. Banerji in 1922 at Mohenjo-daro under Sir John Marshall, the Indus Valley Civilization (c. 2600–1900 BCE Mature Phase) spanned over 1.3 million sq km across modern India, Pakistan, and Afghanistan (Shortugai). It is celebrated for its municipal engineering, standardized metrology, and sophisticated craft specialization.',
      scholarDefinition: {
        scholar: 'Prof. Romila Thapar & Sir Mortimer Wheeler',
        definition:
          '"The hallmark of the Harappan civilization was not colossal palaces or imperial tombs, but its municipal civic planning, underground drainage networks, standardized burnt bricks, and civic egalitarian infrastructure unmatched in the contemporary Bronze Age world."',
      },
    },
    contextHi: {
      intro:
        '1921 में दयाराम साहनी द्वारा हड़प्पा तथा 1922 में राखालदास बनर्जी द्वारा मोहनजोदड़ो के उत्खनन से उद्घाटित सिंधु घाटी सभ्यता (परिपक्व काल: 2600-1900 ई.पू.) लगभग 13 लाख वर्ग किमी में फैली थी। यह अपनी अद्वितीय नगर योजना, ग्रिड प्रणाली, ढकी हुई नालियों और मानकीकृत माप-तौल के लिए विश्वविख्यात है।',
      scholarDefinition: {
        scholar: 'प्रो. रोमिला थापर एवं सर मॉर्टिमर व्हीलर',
        definition:
          '"हड़प्पा सभ्यता की प्रमुख पहचान विशाल राजप्रासाद या मकबरे नहीं, बल्कि नगर नियोजन की एकरूपता, स्वच्छता पर आधारित ढकी नालियां और लाखों वर्ग किलोमीटर में फैली नागरिक वास्तुकला की मानक संरचना थी।"',
      },
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Architectural Pillars of Harappan Urban Municipal Planning',
      titleHi: 'हड़प्पा नगर नियोजन के आधारभूत स्थापत्य स्तंभ',
      columns: [
        {
          titleEn: '1. Dual Urban Layout',
          titleHi: '1. दोहरा नगर विभाजन',
          badge: 'Citadel vs Lower Town',
          itemsEn: [
            'Western Citadel (Acropolis): Raised on high mud-brick platform for public civic rituals',
            'Eastern Lower Town: Extensive residential quarters with courtyard houses',
            'Exception Dholavira: Tripartite division (Citadel, Middle Town, Lower Town) with stone masonry',
            'Kalibangan & Lothal: Fortified citadel with fire altars (Havan Kundas)',
          ],
          itemsHi: [
            'पश्चिमी दुर्ग (सिटाडेल): कच्ची ईंटों के ऊंचे चबूतरे पर निर्मित, सार्वजनिक व प्रशासनिक केंद्र',
            'पूर्वी निचला नगर: आम जनता के लिए आवासीय क्षेत्र, जहां आंगन आधारित मकान थे',
            'धौलावीरा का अपवाद: त्रि-स्तरीय नगर विभाजन (दुर्ग, मध्यम नगर, निचला नगर) एवं पत्थर की चिनाई',
            'कालीबंगा व लोथल: परकोटे से घिरे दुर्ग और अग्निकुंडों के पुरातात्विक साक्ष्य',
          ],
        },
        {
          titleEn: '2. Grid Roads & Drainage System',
          titleHi: '2. ग्रिड सड़कें एवं भूमिगत जल निकासी',
          badge: 'Unmatched Sanitation',
          itemsEn: [
            'Chessboard Grid: Main thoroughfares (9-10 m wide) intersecting at right angles (90°)',
            'Burnt Brick Ratio: Standardized 1:2:4 ratio across all mature sites',
            'Covered Underground Drainage: House drains fed into street sewers covered with limestone slabs',
            'Inspection manholes with soak pits at regular intervals for municipal desilting',
          ],
          itemsHi: [
            'शतरंज (ग्रिड) पैटर्न: 9-10 मीटर चौड़ी मुख्य सड़कें जो एक-दूसरे को समकोण (90°) पर काटती थीं',
            'पक्की ईंटों का अनुपात: संपूर्ण सभ्यता में 1:2:4 का मानकीकृत अनुपात (लंबाई, चौड़ाई, मोटाई)',
            'ढकी हुई भूमिगत नालियां: घरों की नालियां सड़क की मुख्य नाली में गिरती थीं जो पत्थरों से ढकी थीं',
            'सफाई व्यवस्था: नियमित दूरी पर निरीक्षण मेनहोल (सोखते गड्ढे) जहां कचरा जमा होता था',
          ],
        },
        {
          titleEn: '3. Public Civic Architecture',
          titleHi: '3. सार्वजनिक नागरिक वास्तुकला',
          badge: 'Great Bath & Dockyard',
          itemsEn: [
            'Great Bath (Mohenjo-daro): 11.88 x 7.01 m, lined with gypsum mortar and natural bitumen (asphalt)',
            'Great Granaries: Massive grain storage complexes at Mohenjo-daro and Harappa (riverfront transport)',
            'Lothal Tidal Dockyard: World’s earliest artificial brick basin with lock gates on Bhogava river',
            'Dholavira Water Harvesting: Series of 16 rock-cut interconnected stormwater reservoirs',
          ],
          itemsHi: [
            'विशाल स्नानागार (मोहनजोदड़ो): 11.88 x 7.01 मीटर; बिटुमेन व जिप्सम प्लास्टर से जल-रोधी फर्श',
            'विशाल अन्नागार: हड़प्पा व मोहनजोदड़ो में नदी तट पर स्थित अनाज भंडारण के विशाल भंडारगृह',
            'लोथल का गोदीबाड़ा (Dockyard): भोगवा नदी पर विश्व का प्राचीनतम ईंटों से बना ज्वारीय बंदरगाह',
            'धौलावीरा जल संचयन: वर्षा जल संरक्षण हेतु पत्थरों को काटकर बनाए गए 16 विशाल जलाशय',
          ],
        },
      ],
    },
    analyticalPoints: [
      {
        headingEn: 'Standardization and Municipal Hygiene: An Egalitarian Urbanism',
        headingHi: 'मानकीकरण एवं नागरिक स्वच्छता: समतामूलक नगरीय जीवन',
        detailEn:
          'What ASTOUNDS historians is the extreme uniformity across 1,500 miles—from Manda in Jammu to Daimabad in Maharashtra. Brick dimensions (7 x 14 x 28 cm), binary-decimal weights (1, 2, 4, 8, 16, 32... where 16 ratio = 13.63 grams), and steatite unicorn seals were uniform. Unlike contemporary Egypt (pyramids for pharaohs) or Mesopotamia (Ziggurats for god-kings), Harappa reveals NO royal palaces, military barracks, or giant imperial tombs. Power appears to have been held by an oligarchic merchant guild or civic council focused on public sanitation.',
        detailHi:
          'इतिहासकारों को सबसे अधिक विस्मय इस बात पर होता है कि 1500 मील के विस्तार में ईंटों का आकार (7x14x28 सेमी), माप-तौल के बाट (16 के गुणक में 13.63 ग्राम) और मुहरें पूरी तरह एक समान थीं। मिस्र (पिरामिड) और मेसोपोटामिया (जिगुरात) के विपरीत, हड़प्पा में कोई भव्य राजमहल, राजा की समाधि या विशाल मंदिर नहीं मिला है। ऐसा प्रतीत होता है कि शासन व्यवस्था किसी सैन्य तानाशाह या पुरोहित-राजा के बजाय नागरिक स्वच्छता और व्यापार को समर्पित व्यापारी परिषद (गिल्ड) द्वारा संचालित थी।',
        bulletsEn: [
          'Binary-Decimal metrology: Chert cubical weights adhering strictly to binary ratios up to 64, then decimal.',
          'Domestic privacy: House doors opened into side alleys rather than the main thoroughfare; no street-level windows.',
          'Water sanitation: Nearly every house in Mohenjo-daro possessed a private brick-paved bathroom and well.',
        ],
        bulletsHi: [
          'द्विआधारी माप-तौल: निचले स्तर पर 1, 2, 4, 8, 16 का अनुपात तथा उच्च स्तर पर दशमलव प्रणाली।',
          'व्यक्तिगत निजता: घरों के दरवाजे मुख्य सड़क पर न खुलकर गलियों में खुलते थे; सड़क पर खिड़कियां नहीं थीं।',
          'घर-घर स्नानागार: मोहनजोदड़ो के लगभग प्रत्येक घर में अपना पक्का स्नानघर और निजी कुआं था।',
        ],
        quoteOrArticle: 'Archaeological Feature: Bitumen Waterproofing in the Great Bath',
      },
      {
        headingEn: 'The Decline Debate: Aryan Invasion Myth vs Ecological Desiccation',
        headingHi: 'पतन का विमर्श: आर्य आक्रमण का मिथक बनाम पारिस्थितिक एवं जलवायु परिवर्तन',
        detailEn:
          'Mortimer Wheeler’s dramatic 1946 hypothesis that "Indra stands accused" of destroying Harappa based on scattered skeletons at Mohenjo-daro has been totally discredited by modern archaeology (Kennedy proved the skeletons showed signs of anemia and disease, not battle wounds). Today, scholars (G.L. Possehl, Shereen Ratnagar) agree on multi-causal ecological decline: shifting monsoon belts, desiccation and drying up of the Saraswati (Ghaggar-Hakra) river system due to tectonic diversion of Sutlej and Yamuna, leading to gradual de-urbanization into rural Late Harappan settlements.',
        detailHi:
          'मॉर्टिमर व्हीलर का 1946 का यह दावा कि "इंद्र हड़प्पा के विनाश का अभियुक्त है" (आर्य आक्रमण सिद्धांत) आधुनिक पुरातत्व द्वारा पूरी तरह खारिज कर दिया गया है। मोहनजोदड़ो के कंकालों की फोरेंसिक जांच में युद्ध के घाव नहीं बल्कि मलेरिया और कुपोषण पाया गया। आज विद्वान मानते हैं कि पतन किसी एक कारण से नहीं हुआ; बल्कि टेक्टोनिक हलचलों से घग्घर-हाकरा (सरस्वती) नदी का मार्ग बदलना, मानसून का कमजोर होना, वनों की कटाई और बाढ़ के कारण नगरीय ढांचे का ह्रास हुआ और लोग ग्रामीण बस्तियों में फैल गए।',
        bulletsEn: [
          'Aryan invasion dismissed: No archaeological evidence of burnt levels, military weapons, or mass siege warfare.',
          'Hydrological disruption: Ghaggar-Hakra river desiccation paralyzed the agricultural hinterland of Kalibangan.',
          'Late Harappan transformation: De-urbanization led to regional rural cultures (Cemetery-H, Jhukar, Rangpur).',
        ],
        bulletsHi: [
          'आर्य आक्रमण खारिज: युद्ध, जली हुई बस्तियों या सामूहिक संहार का कोई पुरातात्विक साक्ष्य नहीं मिला।',
          'नदी तंत्र का सूखना: सरस्वती (घग्घर-हाकरा) के सूखने से कालीबंगा और बनावली जैसे उपजाऊ केंद्र उजड़ गए।',
          'उत्तर-हड़प्पा रूपांतरण: सभ्यता नष्ट नहीं हुई, बल्कि उसका नगरीय स्वरूप ग्रामीण संस्कृतियों (झूकर, झांगर) में बदल गया।',
        ],
        quoteOrArticle: 'Historiographical Shift: De-urbanization instead of Catastrophic Extinction',
      },
    ],
    valueAddition: {
      thinkersEn: ['Sir John Marshall', 'Dayaram Sahni', 'R.D. Banerji', 'Sir Mortimer Wheeler', 'Shereen Ratnagar'],
      thinkersHi: ['सर जॉन मार्शल', 'दयाराम साहनी', 'राखालदास बनर्जी', 'सर मॉर्टिमर व्हीलर', 'शीरीन रत्नागर'],
      recommendedBooksEn: ['The Indus Civilization by Mortimer Wheeler', 'Understanding Harappa by Shereen Ratnagar', 'The Indus Valley Civilization by Gregory Possehl'],
      recommendedBooksHi: ['सिंधु सभ्यता — शीरीन रत्नागर', 'हड़प्पा सभ्यता का इतिहास — डॉ. विपिन कुमार', 'प्राचीन भारत — प्रो. आर.एस. शर्मा'],
      examQuoteEn: '"Harappa was an empire without emperors, an urban triumph where public hygiene, standardized brick masonry, and municipal equality triumphed over monarchical vanity."',
      examQuoteHi: '"हड़प्पा बिना सम्राटों का साम्राज्य था, एक ऐसा नगरीय चमत्कार जहां नागरिक स्वच्छता, मानकीकृत ईंटें और जन-कल्याण राजसी अहंकार पर भारी पड़े।"',
      upscConnectionEn: 'UPSC Mains GS-1: Harappan town planning and municipal governance; Factors contributing to the decline of Harappan cities; Dholavira UNESCO site water engineering.',
      upscConnectionHi: 'यूपीएससी एवं राज्य पीसीएस: हड़प्पा नगर नियोजन एवं जल निकासी व्यवस्था; पतन के सिद्धांत (आर्य आक्रमण बनाम जलवायु परिवर्तन); धौलावीरा का जल संचयन तंत्र।',
      topperTipEn: 'Draw a labeled town layout plan showing: Western Citadel, Eastern Lower Town, Grid Roads, and the Great Bath with its bitumen lining and flight of steps.',
      topperTipHi: 'उत्तर में एक सुव्यवस्थित नगर आरेख बनाएं जिसमें पश्चिमी दुर्ग, पूर्वी निचला नगर, समकोण पर काटती मुख्य सड़कें तथा विशाल स्नानागार का खाका स्पष्ट हो।',
    },
    answerBlueprint: {
      questionTitleEn: 'Describe the salient features of town planning and drainage system of the Harappan Civilization. Discuss the major theories regarding its decline.',
      questionTitleHi: 'हड़प्पा सभ्यता के नगर नियोजन एवं जल निकासी व्यवस्था की प्रमुख विशेषताओं का वर्णन कीजिए। इसके पतन से संबंधित प्रमुख सिद्धांतों की विवेचना कीजिए। (15 अंक)',
      introductionEn: 'Introduce the Indus Valley Civilization (c. 2600-1900 BCE); define it as South Asia’s first urban revolution under Sir John Marshall’s 1924 announcement.',
      introductionHi: 'हड़प्पा सभ्यता (2600-1900 ई.पू.) का परिचय दें; 1924 में जॉन मार्शल द्वारा की गई घोषणा तथा प्रथम नगरीकरण के रूप में इसके महत्व पर प्रकाश डालें।',
      coreHeadingsEn: [
        '1. Town Planning: Citadel vs Lower Town, Chessboard Grid & Standardized Burnt Bricks (1:2:4)',
        '2. The Underground Drainage System: House Sump-Pits, Covered Sewers & Inspection Manholes',
        '3. Public Architecture: The Great Bath of Mohenjo-daro, Granaries & Lothal Dockyard',
        '4. Theories of Decline: Critique of Aryan Invasion vs Climate Desiccation and Hydrological Shifts',
      ],
      coreHeadingsHi: [
        '1. नगर नियोजन: पश्चिमी दुर्ग बनाम निचला नगर, ग्रिड पैटर्न एवं मानकीकृत पक्की ईंटें (1:2:4)',
        '2. भूमिगत जल निकासी प्रणाली: घरों की नालियां, ढके हुए मुख्य गटर एवं निरीक्षण मेनहोल',
        '3. सार्वजनिक स्थापत्य: मोहनजोदड़ो का विशाल स्नानागार, अन्न के कोठार एवं लोथल का गोदीबाड़ा',
        '4. पतन के सिद्धांत: आर्य आक्रमण की भ्रांति का खंडन बनाम जलवायु परिवर्तन व सरस्वती का सूखना',
      ],
      conclusionEn: 'Conclude with the "De-urbanization" consensus: the urban shell collapsed, but craft traditions, religious motifs (Pashupati, Mother Goddess), and agricultural practices survived into later Indian culture.',
      conclusionHi: 'निष्कर्ष में बताएं कि सभ्यता का पूर्ण विनाश नहीं हुआ, बल्कि नगरीय स्वरूप का ग्रामीण संस्कृति में रूपांतरण हुआ; पशुपति, मातृदेवी व कृषि तकनीकें आज भी भारतीय संस्कृति में जीवित हैं।',
    },
    commonMistakes: [
      {
        mistakeEn: 'Repeating the outdated Wheeler theory of "Aryan massacre" as the definitive cause of decline.',
        mistakeHi: 'व्हीलर के पुराने "आर्य आक्रमण/नरसंहार" सिद्धांत को ही पतन का मुख्य कारण लिख देना।',
        correctionEn: 'Clarify that modern forensic and archaeological research completely refutes the massacre theory, favoring ecological shifts and river drying.',
        correctionHi: 'स्पष्ट लिखें कि आधुनिक शोधों ने आर्य आक्रमण को पूरी तरह नकार दिया है; जलवायु परिवर्तन और घग्घर-हाकरा नदी का सूखना ही वास्तविक कारण था।',
      },
    ],
    mcqs: [
      {
        questionEn: 'At which Harappan site was an artificial tidal dockyard (गोदीबाड़ा) constructed of burnt bricks on the Bhogava River discovered?',
        questionHi: 'भोगवा नदी के तट पर पक्की ईंटों से बना विशाल ज्वारीय गोदीबाड़ा (Dockyard) किस हड़प्पा स्थल से प्राप्त हुआ है?',
        optionsEn: ['Kalibangan', 'Lothal (Gujarat)', 'Rakhigarhi', 'Banawali'],
        optionsHi: ['कालीबंगा', 'लोथल (गुजरात)', 'राखीगढ़ी', 'बनावली'],
        correctIndex: 1,
        explanationEn: 'Lothal in Gujarat features an engineering marvel: a tidal dockyard with sluice gates connected to the Gulf of Cambay via the Bhogava river.',
        explanationHi: 'गुजरात के लोथल से भोगवा नदी पर बना विश्व का प्राचीनतम ईंटों का गोदीबाड़ा मिला है, जो समुद्री व्यापार का प्रमुख केंद्र था।',
      },
      {
        questionEn: 'Which unique Harappan metropolis was divided into three distinct fortified parts (Citadel, Middle Town, and Lower Town) and possessed rock-cut water reservoirs?',
        questionHi: 'वह कौन सा अनूठा हड़प्पा नगर था जो तीन भागों (दुर्ग, मध्यम नगर एवं निचला नगर) में विभाजित था तथा जहां विशाल शैलकृत जलाशय मिले हैं?',
        optionsEn: ['Harappa', 'Mohenjo-daro', 'Dholavira (Kutch)', 'Chanhudaro'],
        optionsHi: ['हड़प्पा', 'मोहनजोदड़ो', 'धौलावीरा (कच्छ, गुजरात)', 'चन्हूदाड़ो'],
        correctIndex: 2,
        explanationEn: 'Dholavira in the Rann of Kutch is unique for its tripartite urban planning and monumental stone-cut rainwater harvesting reservoirs.',
        explanationHi: 'धौलावीरा तीन नगर भागों में विभाजित था और यहां वर्षा जल संचयन हेतु पत्थरों को काटकर बनाए गए 16 विशाल जलाशय मिले हैं।',
      },
      {
        questionEn: 'The floor of the Great Bath at Mohenjo-daro was made completely watertight through the application of a thick layer of:',
        questionHi: 'मोहनजोदड़ो के विशाल स्नानागार के फर्श को जल-रोधी (Waterproof) बनाने हेतु किस पदार्थ का लेप लगाया गया था?',
        optionsEn: ['Natural Bitumen (Asphalt)', 'Molten Lead', 'Animal Fat', 'Iron slag'],
        optionsHi: ['प्राकृतिक डामर (बिटुमेन/एस्फाल्ट)', 'पिघला हुआ सीसा', 'पशुओं की चर्बी', 'लोहे का चूरा'],
        correctIndex: 0,
        explanationEn: 'The Harappan engineers applied a thick coating of natural bitumen (asphalt) over gypsum mortar to make the Great Bath completely impervious to water.',
        explanationHi: 'हड़प्पा इंजीनियरों ने ईंटों की चिनाई के ऊपर जिप्सम प्लास्टर और प्राकृतिक डामर (बिटुमेन) की परत चढ़ाकर स्नानागार को वाटरप्रूफ बनाया था।',
      },
    ],
  },

  // 2.2 Vedic Age
  {
    id: 'his-2-2',
    topicSequence: 'Topic 2.2',
    lectureNumber: 'Lecture 04',
    titleEn: 'Early & Later Vedic Age: Polity, Society, Economy, Religion & Iron Age Transition',
    titleHi: 'ऋग्वैदिक एवं उत्तर वैदिक काल: राजव्यवस्था (सभा-समिति), समाज, अर्थव्यवस्था, धर्म एवं लौह युग',
    subjectCode: 'SDSUV-HIS-101',
    subjectId: 'history',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 2,
    unitTitleEn: 'Unit II: Harappan Civilization & Vedic Society',
    unitTitleHi: 'इकाई II: हड़प्पा सभ्यता एवं वैदिक समाज',
    readTime: '18 min read',
    highYieldTag: '🔥 15-Mark Comparative Vedic Question',
    upscTag: 'UPSC GS-1 Vedic Transition',
    sdsuvTag: '🔥 Regular University 15-Mark Question',
    learnTopicId: 't-his-202',
    youtubeId: 'V0N_aoy-9w4',
    lectureChannel: 'PW OnlyIAS / Drishti IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Early+vs+Later+Vedic+Age+Polity+Society+PW+OnlyIAS',
    conclusionEn: 'The Vedic transition represents the fundamental metamorphosis of North India from a pastoral, semi-nomadic, egalitarian clan society (Rigvedic Jana) into a sedentary, agrarian, stratified territorial kingdom (Later Vedic Janapada) under the catalytic impetus of the Iron Age (PGW culture).',
    conclusionHi: 'वैदिक काल का अध्ययन भारत में एक पशुपालक, कबीलाई एवं समतामूलक समाज (ऋग्वैदिक जन) से एक कृषि-आधारित, वर्ण-विभाजित एवं क्षेत्रीय राज्य व्यवस्था (उत्तर वैदिक जनपद) में रूपांतरण का इतिहास है, जिसकी धुरी लोहे की तकनीकी क्रांति (PGW संस्कृति) थी।',
    contextEn: {
      intro:
        'The Vedic Age (c. 1500–600 BCE) is bifurcated into the Early Vedic / Rigvedic Period (c. 1500–1000 BCE in the Sapta-Sindhu region) and the Later Vedic Period (c. 1000–600 BCE in the Ganga-Yamuna Doab). The introduction of iron (Shyama Ayas) around 1000 BCE triggered land clearance, surplus agriculture, and monarchical consolidation.',
      scholarDefinition: {
        scholar: 'Prof. R.S. Sharma (Material Culture and Social Formations in Ancient India)',
        definition:
          '"The transition from the pastoral Rigvedic Jana to the agrarian Later Vedic Janapada was fundamentally driven by the adoption of iron metallurgy, transforming tribal chiefs (Rajan) into territorial monarchs (Samrat) sustained by institutionalized taxation (Bali and Bhaga)."',
      },
    },
    contextHi: {
      intro:
        'वैदिक काल (1500-600 ई.पू.) को दो भागों में बांटा जाता है: ऋग्वैदिक काल (1500-1000 ई.पू., सप्त-सिंधु क्षेत्र) तथा उत्तर वैदिक काल (1000-600 ई.पू., गंगा-यमुना दोआब)। लगभग 1000 ई.पू. में लोहे (श्याम अयस) के आविष्कार ने घने जंगलों को काटकर कृषि अधिशेष, वर्ण व्यवस्था और क्षेत्रीय राज्यों (जनपदों) के उदय का मार्ग प्रशस्त किया।',
      scholarDefinition: {
        scholar: 'प्रो. आर.एस. शर्मा (प्राचीन भारत में भौतिक संस्कृति एवं सामाजिक संरचनाएं)',
        definition:
          '"पशुपालक ऋग्वैदिक कबीले का कृषक उत्तर वैदिक जनपद में रूपांतरण मूलतः लौह धातु विज्ञान की देन था, जिसने कबीलाई राजा को नियमित कर (बलि एवं भाग) से संपन्न क्षेत्रीय सम्राट बना दिया।"',
      },
    },
    flowchart: {
      diagramType: 'comparison',
      titleEn: 'Evolutionary Matrix: Early Vedic vs Later Vedic Societies',
      titleHi: 'ऋग्वैदिक बनाम उत्तर वैदिक समाज का तुलनात्मक रूपांतरण',
      columns: [
        {
          titleEn: '1. Political Organization',
          titleHi: '1. राजनीतिक संगठन',
          badge: 'Tribal to Territorial',
          itemsEn: [
            'Early: Tribal chief (Rajan/Gopati); power checked by popular assemblies (Sabha, Samiti, Vidatha)',
            'No regular army or fixed taxation; voluntary gift tribute (Bali)',
            'Later: Hereditary territorial kingship (Samrat, Virat); decline of Vidatha & women exclusion',
            'Sacrificial legitimation: Rajasuya, Ashvamedha, Vajapeya rituals; emergence of Ratnins (bureaucrats)',
          ],
          itemsHi: [
            'ऋग्वैदिक: कबीलाई प्रधान (राजन/गोपति); सभा, समिति और विदय जैसी जन-संस्थाओं का कड़ा नियंत्रण',
            'कोई स्थायी सेना या नियमित कर नहीं; जनता द्वारा स्वेच्छा से दिया गया उपहार (बलि)',
            'उत्तर वैदिक: वंशानुगत क्षेत्रीय राजतंत्र (सम्राट, अधिराज); विदय का लोप, सभा से महिलाओं का निष्कासन',
            'यज्ञीय औचित्य: राजसूय, अश्वमेध, वाजपेय यज्ञ; 12 रत्निनों (प्रशासनिक अधिकारियों) का उदय',
          ],
        },
        {
          titleEn: '2. Social Stratification',
          titleHi: '2. सामाजिक संरचना एवं वर्ण व्यवस्था',
          badge: 'Flexible to Hereditary',
          itemsEn: [
            'Early: Occupation-based, flexible Varna; (Rigveda 9.112: "I am a poet, my father a physician...")',
            'High status of women: Participated in Sabha/Vidatha; Upanayana ritual; learned scholars (Gargi, Lopamudra)',
            'Later: Birth-based, rigid Four-tier Varna System (Brahmana, Kshatriya, Vaishya, Shudra)',
            'Degradation of women’s status; child marriage traces; Gotra system and Ashrama stages formalized',
          ],
          itemsHi: [
            'ऋग्वैदिक: कर्म आधारित लचीली वर्ण व्यवस्था (ऋग्वेद: "मैं कवि हूं, मेरे पिता वैद्य हैं और माता चक्की पीसती हैं")',
            'महिलाओं की उच्च स्थिति: सभा-समिति में भागीदारी; उपनयन संस्कार; विदुषी स्त्रियां (घोषा, लोपामुद्रा, अपाला)',
            'उत्तर वैदिक: जन्म आधारित कठोर चतुर्वर्ण व्यवस्था; शूद्रों की स्थिति में भारी गिरावट',
            'महिलाओं की स्थिति में ह्रास; सभा से निष्कासन; गोत्र व्यवस्था और चार आश्रमों (ब्रह्मचर्य, गृहस्थ...) का आरंभ',
          ],
        },
        {
          titleEn: '3. Economy & Religion',
          titleHi: '3. अर्थव्यवस्था एवं धर्म',
          badge: 'Pastoral to Agrarian',
          itemsEn: [
            'Early: Pastoral economy; cattle (Gau) was chief wealth; wars fought for cows (Gavishti); barter/Nishka',
            'Early Religion: Personified nature worship (Indra - thunder/rain; Agni - mediator; Varuna - cosmic order Rta)',
            'Later Economy: Sedentary agriculture enabled by iron plows; rice (Vrihi), barley, wheat; PGW pottery',
            'Later Religion: Complex, expensive priestly rituals; rise of Trinity (Prajapati/Brahma, Vishnu, Rudra)',
          ],
          itemsHi: [
            'ऋग्वैदिक: पशुपालक अर्थव्यवस्था; गाय (गौ) ही मुख्य संपत्ति थी; युद्ध गायों के लिए होते थे (गविष्टि)',
            'ऋग्वैदिक धर्म: प्रकृति के मानवरूपी देवताओं की स्तुति (इंद्र - पुरंदर/वर्षा; अग्नि - मध्यस्थ; वरुण - ऋत के संरक्षक)',
            'उत्तर वैदिक अर्थव्यवस्था: लोहे के फाल से कृषि; धान (व्रीहि), गेहूं व जौ का व्यापक उत्पादन; PGW मृदभांड',
            'उत्तर वैदिक धर्म: जटिल व खर्चीले कर्मकांड; पुरोहित वर्ग का वर्चस्व; त्रिदेव (प्रजापति, विष्णु, रुद्र) की प्रतिष्ठा',
          ],
        },
      ],
    },
    analyticalPoints: [
      {
        headingEn: 'The Role of Iron (Shyama Ayas) and the Painted Grey Ware (PGW) Revolution',
        headingHi: 'लोहे (श्याम अयस) की भूमिका एवं चित्रित धूसर मृदभांड (PGW) क्रांति',
        detailEn:
          'Excavations at Atranjikhera, Hastinapur, and Noh reveal that around 1000 BCE, iron technology entered the Indo-Gangetic divide. Hard iron axes enabled the clearing of the dense monsoonal sal and teak forests of the middle Gangetic plains, while iron plowshares dug deep into heavy alluvial soils. This generated the crucial agricultural surplus necessary to support non-producing classes (rulers, priests, artisans), catalyzing the transition from the tribal Jana to the state Janapada.',
        detailHi:
          'अतरंजीखेड़ा (एटा, उप्र), हस्तिनापुर और नोह के उत्खनन सिद्ध करते हैं कि लगभग 1000 ई.पू. में उत्तर भारत में लोहे का प्रवेश हुआ। लोहे की कुल्हाड़ियों से गंगा घाटी के घने जंगलों को काटना संभव हुआ और लोहे के फाल वाले हलों ने दोआब की भारी जलोढ़ मिट्टी की गहरी जुताई की। इससे खाद्यान्न का प्रचुर अधिशेष पैदा हुआ, जिसने गैर-उत्पादक वर्गों (राजा, पुरोहित, सेना, शिल्पी) का भरण-पोषण कर कबीलाई समाज को क्षेत्रीय जनपदों में बदल दिया।',
        bulletsEn: [
          'Atranjikhera breakthrough: Abundant iron slag, tongs, axes, and arrowheads dated to ~1000 BCE.',
          'Nomenclature evolution: "Ayas" in Rigveda meant bronze/copper; in Atharvaveda, it became "Shyama Ayas" (black iron).',
          'Socio-economic outcome: Sedentary territorial identity replaced nomadic lineage loyalty ("Rashtra" concepts emerge).',
        ],
        bulletsHi: [
          'अतरंजीखेड़ा साक्ष्य: 1000 ई.पू. की परतों से लोहे के औजार, कुल्हाड़ियां, तीर और धातु-शोधन भट्ठियां प्राप्त।',
          'नामकरण में अंतर: ऋग्वेद में "अयस" का अर्थ तांबा/कांसा था; अथर्ववेद में लोहे को स्पष्टतः "श्याम अयस" कहा गया।',
          'सामाजिक परिणाम: कबीलाई निष्ठा की जगह क्षेत्रीय निष्ठा (राष्ट्र एवं जनपद) का उदय।',
        ],
        quoteOrArticle: 'Archaeological Horizon: Painted Grey Ware (PGW) Iron Age Stratum',
      },
    ],
    valueAddition: {
      thinkersEn: ['Prof. R.S. Sharma', 'A.S. Altekar', 'D.D. Kosambi', 'Prof. Romila Thapar'],
      thinkersHi: ['प्रो. आर.एस. शर्मा', 'ए.एस. अल्तेकर', 'डी.डी. कोसांबी', 'प्रो. रोमिला थापर'],
      recommendedBooksEn: ['Material Culture and Social Formations in Ancient India by R.S. Sharma', 'The Wonder That Was India by A.L. Basham', 'Political History of Ancient India by H.C. Raychaudhuri'],
      recommendedBooksHi: ['प्राचीन भारत में भौतिक संस्कृति — प्रो. आर.एस. शर्मा', 'अद्भुत भारत — ए.एल. बाशम', 'प्राचीन भारत का राजनीतिक इतिहास — एच.सी. रायचौधरी'],
      examQuoteEn: '"The story of the Vedic Age is the transformation of the cattle-raiding tribal warrior into the settled farmer, giving birth to India’s enduring social fabric."',
      examQuoteHi: '"वैदिक काल की गाथा गायों के लिए युद्ध करने वाले कबीलाई योद्धा से स्थाई कृषक में बदलने की वह ऐतिहासिक यात्रा है, जिसने भारत के सामाजिक ताने-बाने को जन्म दिया।"',
      upscConnectionEn: 'UPSC Mains GS-1: Contrast between Early and Later Vedic political and social institutions; Role of iron technology in the rise of Janapadas.',
      upscConnectionHi: 'यूपीएससी एवं राज्य पीसीएस: ऋग्वैदिक बनाम उत्तर वैदिक राजव्यवस्था (सभा-समिति की घटती भूमिका); लोहे का महत्व एवं जनपदों का उदय।',
      topperTipEn: 'Quote the Rigvedic hymn (9.112) to prove social fluidity in the Early Vedic period and contrast it with the Purusha Sukta (10.90) which first institutionalized the four varnas.',
      topperTipHi: 'उत्तर में ऋग्वेद के 9वें मंडल (9.112) का उद्धरण देकर प्रारंभिक लचीलेपन को सिद्ध करें और फिर 10वें मंडल के पुरुष सूक्त (10.90) द्वारा चार वर्णों की दैवीय उत्पत्ति का उल्लेख करें।',
    },
    answerBlueprint: {
      questionTitleEn: 'Trace the changes in political, social, and economic life from the Early Vedic to the Later Vedic period. What role did iron technology play in this transition?',
      questionTitleHi: 'ऋग्वैदिक काल से उत्तर वैदिक काल तक राजनीतिक, सामाजिक एवं आर्थिक जीवन में आए परिवर्तनों को रेखांकित कीजिए। इस संक्रमण में लौह तकनीक की क्या भूमिका थी? (15 अंक)',
      introductionEn: 'Define the two phases of Vedic history (1500-1000 BCE vs 1000-600 BCE); state how geographical shift from Sapta-Sindhu to Ganga-Yamuna Doab reshaped society.',
      introductionHi: 'वैदिक काल के दोनों चरणों (ऋग्वैदिक व उत्तर वैदिक) का कालक्रम व भौगोलिक विस्तार (सप्त-सिंधु से गंगा घाटी) स्पष्ट करते हुए भूमिका लिखें।',
      coreHeadingsEn: [
        '1. Political Metamorphosis: From Clan Assemblies (Sabha/Samiti) to Grand Monarchies (Rajasuya/Ashvamedha)',
        '2. Social Restructuring: Flexible Varna to Hereditary Stratification, Gotra & Women’s Changing Status',
        '3. Economic Shift: Pastoral Nomadic Cattle Economy to Sedentary Intensive Iron-Plough Agriculture',
        '4. The Technological Engine: Iron Metallurgy (Shyama Ayas) and the Forest Clearance of the Ganga Valley',
      ],
      coreHeadingsHi: [
        '1. राजनीतिक रूपांतरण: कबीलाई सभा-समिति से निरंकुश राजतंत्र एवं भव्य यज्ञ (राजसूय व अश्वमेध)',
        '2. सामाजिक पुनर्गठन: कर्म आधारित वर्ण से जन्म आधारित कठोरता, गोत्र प्रथा एवं स्त्रियों की स्थिति में ह्रास',
        '3. आर्थिक परिवर्तन: पशुपालन और गविष्टि से स्थाई कृषि, धान की खेती एवं PGW मृदभांड परंपरा',
        '4. तकनीकी उत्प्रेरक: लोहे की खोज (श्याम अयस), घने जंगलों की कटाई एवं कृषि अधिशेष का उदय',
      ],
      conclusionEn: 'Conclude with how the socio-economic contradictions of the Later Vedic ritualism laid the intellectual groundwork for the 6th century BCE Upanishadic, Buddhist, and Jain revolts.',
      conclusionHi: 'निष्कर्ष में बताएं कि उत्तर वैदिक कर्मकांडों और वर्ण शोषण ने ही आगे चलकर छठी शताब्दी ई.पू. में उपनिषदों, बौद्ध और जैन धर्म की दार्शनिक क्रांति की पृष्ठभूमि तैयार की।',
    },
    commonMistakes: [
      {
        mistakeEn: 'Claiming that the Purusha Sukta belongs to the earliest core of the Rigveda.',
        mistakeHi: 'यह समझना कि पुरुष सूक्त ऋग्वेद के सबसे प्राचीन मूल भाग में विद्यमान था।',
        correctionEn: 'Clarify that the Purusha Sukta is in Mandala 10, universally recognized by philologists as a late addition at the end of the Rigvedic era.',
        correctionHi: 'स्पष्ट लिखें कि पुरुष सूक्त ऋग्वेद के 10वें मंडल में है, जिसे भाषाविद् ऋग्वैदिक काल का सबसे बाद का प्रक्षिप्त (Later addition) भाग मानते हैं।',
      },
    ],
    mcqs: [
      {
        questionEn: 'In the Rigvedic period, the tribal assembly that exercised democratic control over the Rajan and in which women actively participated was the:',
        questionHi: 'ऋग्वैदिक काल में राजा पर लोकतांत्रिक नियंत्रण रखने वाली तथा जिसमें महिलाएं भी भाग लेती थीं, वह कबीलाई परिषद कौन सी थी?',
        optionsEn: ['Samiti and Vidatha', 'Panchayat', 'Mantriparishad', 'Mahasabha'],
        optionsHi: ['समिति एवं विदय (Vidatha)', 'पंचायत', 'मंत्रिपरिषद', 'महासभा'],
        correctIndex: 0,
        explanationEn: 'In the Early Vedic era, the Sabha and Vidatha were popular clan assemblies where women actively participated; Vidatha disappeared in the Later Vedic age.',
        explanationHi: 'ऋग्वैदिक काल में समिति और विदय प्रमुख जन-सभाएं थीं जिनमें स्त्रियां भाग लेती थीं; उत्तर वैदिक काल में विदय समाप्त हो गई।',
      },
      {
        questionEn: 'The earliest stratified archaeological evidence of iron metallurgy in North India around 1000 BCE was excavated at:',
        questionHi: 'उत्तर भारत में लगभग 1000 ई.पू. के लौह धातु विज्ञान के प्राचीनतम स्तरीकृत पुरातात्विक साक्ष्य कहां से प्राप्त हुए हैं?',
        optionsEn: ['Atranjikhera (Etah, UP)', 'Lothal', 'Burzahom', 'Kalibangan'],
        optionsHi: ['अतरंजीखेड़ा (एटा, उत्तर प्रदेश)', 'लोथल', 'बुर्जहोम', 'कालीबंगा'],
        correctIndex: 0,
        explanationEn: 'Atranjikhera in western Uttar Pradesh provided decisive stratified proof of iron smelters, slag, and tools dating to c. 1000 BCE.',
        explanationHi: 'उत्तर प्रदेश के एटा जिले में अतरंजीखेड़ा से 1000 ई.पू. के लोहे की भट्ठियां, औजार और धातुमल के ठोस साक्ष्य मिले हैं।',
      },
      {
        questionEn: 'In the Later Vedic period, the voluntary gift offering of the Rigvedic era was converted into a mandatory agricultural tax called:',
        questionHi: 'उत्तर वैदिक काल में ऋग्वैदिक काल का स्वेच्छा से दिया जाने वाला उपहार एक अनिवार्य नियमित कर में बदल गया, जिसे क्या कहा जाता था?',
        optionsEn: ['Nishka', 'Bali and Bhaga', 'Chauth', 'Jizya'],
        optionsHi: ['निष्का', 'बलि एवं भाग (Bali & Bhaga)', 'चौथ', 'जजिया'],
        correctIndex: 1,
        explanationEn: 'Bali, originally a voluntary tribute in the Rigveda, became a compulsory tax in the Later Vedic age along with Bhaga (share of agricultural produce).',
        explanationHi: 'ऋग्वेद में "बलि" स्वेच्छा से दिया जाने वाला अंश था, जो उत्तर वैदिक काल में राजा द्वारा वसूला जाने वाला अनिवार्य नियमित कर बन गया।',
      },
    ],
  },
  // =========================================================================
  // UNIT III: STATE FORMATION & RELIGIOUS MOVEMENTS
  // =========================================================================
  {
    id: 'his-3-1',
    topicSequence: 'Topic 3.1',
    lectureNumber: 'Lecture 05',
    titleEn: '16 Mahajanapadas, Second Urbanization & The Rise of Magadha',
    titleHi: '16 महाजनपद, द्वितीय नगरीकरण एवं मगध साम्राज्य का उत्कर्ष (बिंबिसार से मौर्य तक)',
    subjectCode: 'SDSUV-HIS-101',
    subjectId: 'history',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 3,
    unitTitleEn: 'Unit III: Mahajanapadas, Magadha & Religious Movements',
    unitTitleHi: 'इकाई III: महाजनपद, मगध साम्राज्य एवं धार्मिक आंदोलन',
    readTime: '18 min read',
    highYieldTag: '🔥 15-Mark Core Magadha Question',
    upscTag: 'UPSC Second Urbanization',
    sdsuvTag: '🔥 Asked 6x in SDSUV Exams',
    learnTopicId: 't-his-301',
    youtubeId: 'FVFf8x9LGmg',
    lectureChannel: 'StudyIQ IAS / PW OnlyIAS',
    searchFallback: 'https://www.youtube.com/results?search_query=16+Mahajanapadas+Rise+of+Magadha+StudyIQ',
    conclusionEn: 'Magadha’s ascendancy under the Haryanka, Shishunaga, and Nanda dynasties established South Asia’s first pan-regional imperial model, transforming tribal oligarchies into a centralized imperial state backed by an elephant corps, iron weapons, and riverine trade control.',
    conclusionHi: 'हर्यक, शिशुनाग एवं नंद वंश के नेतृत्व में मगध का उत्कर्ष भारत के प्रथम साम्राज्यवादी मॉडल की स्थापना थी, जिसने लौह खदानों, हाथियों की सेना, उपजाऊ जलोढ़ मिट्टी एवं गंगा-सोन नदियों के रणनीतिक जलमार्गों के बल पर भारत के एकीकरण की नींव रखी।',
    contextEn: {
      intro:
        'The 6th century BCE witnessed the "Second Urbanization" in the middle Gangetic plains, marked by Northern Black Polished Ware (NBPW) and punch-marked coins. Buddhist Anguttara Nikaya and Jain Bhagavati Sutra catalog 16 Mahajanapadas spanning from Gandhara in the northwest to Anga in the east, among which Magadha emerged supreme through aggressive militarism, diplomatic matrimonial alliances, and geographic advantages.',
      scholarDefinition: {
        scholar: 'Prof. H.C. Raychaudhuri & Prof. Romila Thapar',
        definition:
          '"The rise of Magadha was not accidental; it was the inevitable geopolitical outcome of the interaction between rich mineral ecology (Rajgir iron and copper), fertile agricultural hinterlands, natural fortifications, and ruthless statecraft."',
      },
    },
    contextHi: {
      intro:
        'छठी शताब्दी ई.पू. में मध्य गंगा घाटी में "द्वितीय नगरीकरण" का उदय हुआ जिसकी पहचान उत्तरी काली पॉलिशदार मृदभांड (NBPW) तथा आहत सिक्कों से है। बौद्ध ग्रंथ "अंगुत्तर निकाय" और जैन ग्रंथ "भगवती सूत्र" में 16 महाजनपदों का उल्लेख मिलता है, जिनमें गांधार, कंबोज, मगध, कोशल, वत्स एवं अवंती प्रमुख थे। अंततः मगध ने सभी को पराजित कर भारत के प्रथम विशाल साम्राज्य का रूप धारण किया।',
      scholarDefinition: {
        scholar: 'प्रो. एच.सी. रायचौधरी एवं प्रो. रोमिला थापर',
        definition:
          '"मगध का उत्कर्ष कोई आकस्मिक घटना नहीं थी; यह छोटानागपुर के लौह अयस्क, गंगा घाटी की उर्वर भूमि, पांच पहाड़ियों से घिरी सुरक्षित राजधानी (राजगृह) तथा कुशल शासकों की साम्राज्यवादी नीतियों का स्वाभाविक परिणाम था।"',
      },
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Catalytic Pillars of Magadhan Hegemony',
      titleHi: 'मगध साम्राज्य के उत्कर्ष के चार प्रमुख आधार',
      columns: [
        {
          titleEn: '1. Strategic Geography & Capitals',
          titleHi: '1. सामरिक भूगोल एवं राजधानियां',
          badge: 'Rajgir & Pataliputra',
          itemsEn: [
            'Girivraja (Rajgir): Fortified by five impregnable natural hills, impossible to siege',
            'Pataliputra: "Jaladurga" (water fort) at the confluence of Ganga, Son, Gandak, and Ghaghra',
            'Riverine control: Instant troop mobility and monopoly over Gangetic toll trade',
          ],
          itemsHi: [
            'गिरिव्रज (राजगृह): पांच अभेद्य प्राकृतिक पहाड़ियों से घिरी राजधानी, जिस पर घेराबंदी असंभव थी',
            'पाटलिपुत्र: "जलदुर्ग" जो गंगा, सोन, गंडक एवं घाघरा नदियों के संगम पर स्थित सामरिक केंद्र था',
            'नदी जलमार्ग: सेना का नौकाओं द्वारा त्वरित संचलन तथा गंगा व्यापार पर एकाधिकार',
          ],
        },
        {
          titleEn: '2. Ecological & Mineral Wealth',
          titleHi: '2. पारिस्थितिक एवं खनिज संपदा',
          badge: 'Iron & Elephant Monopoly',
          itemsEn: [
            'Rich iron ore deposits at Rajgir/Singhbhum for advanced weapons and agricultural tools',
            'Dense eastern forests provided trained wild war elephants (first used in Indian warfare)',
            'Fertile Gangetic alluvium yielding two to three bumper rice crops annually',
          ],
          itemsHi: [
            'राजगृह एवं सिंहभूम की निकटवर्ती लौह खदानें, जिनसे तीक्ष्ण अस्त्र-शस्त्र व मजबूत हल बने',
            'पूर्वी वनों से भारी संख्या में युद्धक हाथियों की प्राप्ति (हाथियों का सर्वप्रथम निर्णायक प्रयोग)',
            'गंगा की उर्वर जलोढ़ मिट्टी से वर्ष में तीन बार धान की बंपर फसलें एवं भारी कृषि अधिशेष',
          ],
        },
        {
          titleEn: '3. Dynastic Vision & Military Technology',
          titleHi: '3. राजवंशों की दूरदृष्टि एवं सैन्य तकनीक',
          badge: 'Bimbisara to Mahapadma Nanda',
          itemsEn: [
            'Bimbisara (Haryanka): Matrimonial alliances (Koshala, Licchavi, Madra) + Anga conquest',
            'Ajatashatru: War against Vajji confederacy using Mahashilakantaka & Rathamusala',
            'Mahapadma Nanda: "Ekarat" title; assembled vast army (200k infantry, 6k elephants) deterring Alexander',
          ],
          itemsHi: [
            'बिंबिसार (हर्यक वंश): वैवाहिक कूटनीति (कोशल, लिच्छवि, मद्र) तथा अंग का विजय विलय',
            'अजातशत्रु: वज्जि संघ पर विजय; महाशिलाकंटक (पत्थर फेंकने वाला यंत्र) एवं रथमूसल का प्रयोग',
            'महापद्मनंद: "सर्वक्षत्रांतक" व "एकराट"; 2 लाख पैदल व 6,000 हाथियों की सेना जिससे सिकंदर की सेना कांप उठी',
          ],
        },
      ],
    },
    analyticalPoints: [
      {
        headingEn: 'The Military Revolution: Rathamusala and Mahashilakantaka in the Vajji War',
        headingHi: 'सैन्य क्रांति: वज्जि संघ के विरुद्ध रथमूसल एवं महाशिलाकंटक का प्रयोग',
        detailEn:
          'Ajatashatru’s 16-year war against the democratic Licchavi/Vajji confederacy represents a milestone in ancient siegecraft. He deployed two revolutionary war machines: (1) Mahashilakantaka (a giant catapult hurling massive stone boulders across city ramparts), and (2) Rathamusala (a scythed chariot fitted with spinning steel blades that wreaked havoc among enemy ranks). Concurrently, his minister Vassakara sowed internal discord among the Licchavi clans, illustrating the combined power of technological innovation and Chanakyan subterfuge.',
        detailHi:
          'अजातशत्रु द्वारा लोकतांत्रिक लिच्छवि/वज्जि संघ के विरुद्ध लड़े गए 16 वर्षीय युद्ध ने भारतीय युद्धकला को बदल दिया। उसने दो क्रांतिकारी सैन्य यंत्रों का प्रयोग किया: (1) महाशिलाकंटक (विशाल पत्थरों को फेंकने वाली भारी तोप-समान कैटापुल्ट), तथा (2) रथमूसल (पहियों में लगे घूमते हुए घातक ब्लेडों वाला गदायुक्त रथ जिसने शत्रु सेना में कोहराम मचा दिया)। साथ ही उसके कूटनीतिज्ञ मंत्री वर्षकार ने लिच्छवियों के आंतरिक मतभेदों को भड़काकर उनकी शक्ति को खोखला कर दिया।',
        bulletsEn: [
          'Siege innovation: Earliest documented artillery stone-throwers in Indian military records.',
          'Diplomatic espionage: Vassakara’s three-year covert mission to dismantle republican cohesion.',
          'Geopolitical result: Complete annexation of North Bihar, securing Magadha’s northern frontier.',
        ],
        bulletsHi: [
          'घेराबंदी तकनीक: भारतीय इतिहास में पत्थरों की भारी गोलाबारी का प्रथम प्रामाणिक उल्लेख।',
          'गुप्तचर कूटनीति: मंत्री वर्षकार का तीन वर्षीय गुप्त अभियान जिसने गणराज्य की एकता को तोड़ा।',
          'रणनीतिक परिणाम: उत्तरी बिहार का पूर्ण विलय और मगध की उत्तरी सीमा का स्थाई विस्तार।',
        ],
        quoteOrArticle: 'Buddhist Canon: Digha Nikaya (Mahaparinibbana Sutta accounts)',
      },
    ],
    valueAddition: {
      thinkersEn: ['Prof. H.C. Raychaudhuri', 'Prof. D.D. Kosambi', 'Prof. Romila Thapar', 'Dr. V.A. Smith'],
      thinkersHi: ['प्रो. एच.सी. रायचौधरी', 'प्रो. डी.डी. कोसांबी', 'प्रो. रोमिला थापर', 'डॉ. वी.ए. स्मिथ'],
      recommendedBooksEn: ['Political History of Ancient India by H.C. Raychaudhuri', 'The Culture and Civilisation of Ancient India by D.D. Kosambi'],
      recommendedBooksHi: ['प्राचीन भारत का राजनीतिक इतिहास — एच.सी. रायचौधरी', 'प्राचीन भारत — प्रो. आर.एस. शर्मा'],
      examQuoteEn: '"Magadha’s rise demonstrates that empires are forged at the intersection of iron mines, navigable rivers, and unyielding political ambition."',
      examQuoteHi: '"मगध का उत्कर्ष यह प्रमाणित करता है कि साम्राज्यों का जन्म लोहे की खदानों, नौकागम्य नदियों और अदम्य राजनीतिक महत्वाकांक्षा के संगम पर होता है।"',
      upscConnectionEn: 'UPSC Mains GS-1: Factors responsible for the rise of Magadha; Republican Mahajanapadas (Gana-Sanghas) vs Monarchical states.',
      upscConnectionHi: 'यूपीएससी एवं राज्य पीसीएस: मगध के उत्कर्ष के भौगोलिक, आर्थिक व राजनीतिक कारण; गणराज्य (वज्जि/मल्ल) बनाम राजतंत्र का तुलनात्मक स्वरूप।',
      topperTipEn: 'Draw an outline map of Northern India indicating the 16 Mahajanapadas, prominently marking Magadha’s strategic position at the river junction.',
      topperTipHi: 'उत्तर भारत का एक रेखाचित्र बनाकर 16 महाजनपदों की स्थिति दर्शाएं तथा मगध, अवंती, कोशल व वत्स के संघर्ष को स्पष्ट रूप से रेखांकित करें।',
    },
    answerBlueprint: {
      questionTitleEn: 'Examine the geopolitical, economic, and technological factors that led to the rise of Magadha among the 16 Mahajanapadas.',
      questionTitleHi: '16 महाजनपदों में मगध के सर्वप्रमुख साम्राज्य के रूप में उत्कर्ष के भू-राजनीतिक, आर्थिक एवं तकनीकी कारणों का परीक्षण कीजिए। (15 अंक)',
      introductionEn: 'Define the 16 Mahajanapadas (Anguttara Nikaya); introduce the Second Urbanization and state why Magadha surpassed Koshala, Vatsa, and Avanti.',
      introductionHi: '16 महाजनपदों का परिचय दें; बौद्ध ग्रंथ अंगुत्तर निकाय का उल्लेख करते हुए द्वितीय नगरीकरण की पृष्ठभूमि में मगध के सर्वोपरि होने का कारण बताएं।',
      coreHeadingsEn: [
        '1. Geographical & Strategic Primacy: Natural Bastions of Rajgir and Water-Fort of Pataliputra',
        '2. Mineral & Forest Resources: The Chhotanagpur Iron Advantage and Elephant Armaments',
        '3. Agricultural Surplus of the Gangetic Plain & Punch-Marked Coin Monetization',
        '4. Dynamic Monarchs & Military Inventions: Bimbisara, Ajatashatru & Mahapadma Nanda',
      ],
      coreHeadingsHi: [
        '1. भौगोलिक एवं सामरिक लाभ: राजगृह की पांच प्राकृतिक पहाड़ियां एवं पाटलिपुत्र का जलदुर्ग',
        '2. खनिज एवं वन संपदा: सिंहभूम का समृद्ध लोहा एवं पूर्वी वनों के युद्धक हाथियों की सेना',
        '3. गंगा घाटी का कृषि अधिशेष, आहत सिक्कों का चलन एवं व्यापारिक मार्गों पर नियंत्रण',
        '4. दूरदर्शी शासकों की भूमिका एवं सैन्य नवाचार: बिंबिसार, अजातशत्रु एवं महापद्मनंद का योगदान',
      ],
      conclusionEn: 'Conclude with how Magadha laid the unified political canvas that Chandragupta Maurya and Chanakya converted into the pan-Indian Mauryan Empire.',
      conclusionHi: 'निष्कर्ष में बताएं कि मगध द्वारा तैयार किए गए इसी एकीकृत राजनीतिक मंच पर चंद्रगुप्त मौर्य और चाणक्य ने अखिल भारतीय मौर्य साम्राज्य की स्थापना की।',
    },
    commonMistakes: [
      {
        mistakeEn: 'Attributing Magadha’s rise entirely to the Mauryas, ignoring Bimbisara, Ajatashatru, and the Nandas.',
        mistakeHi: 'मगध के उत्कर्ष का पूरा श्रेय केवल मौर्यों को दे देना, हर्यक और नंद वंश की उपेक्षा करना।',
        correctionEn: 'Clarify that Magadha was already the undisputed superpower under the Nandas before Chandragupta Maurya ascended the throne.',
        correctionHi: 'स्पष्ट लिखें कि चंद्रगुप्त मौर्य से पूर्व ही हर्यक, शिशुनाग और नंद वंश के काल में मगध भारत की सर्वोच्च शक्ति बन चुका था।',
      },
    ],
    mcqs: [
      {
        questionEn: 'Which Buddhist text provides the foundational catalog of the 16 Mahajanapadas flourishing in the 6th century BCE?',
        questionHi: 'छठी शताब्दी ई.पू. के 16 महाजनपदों की सूची प्रदान करने वाला प्रमुख बौद्ध ग्रंथ कौन सा है?',
        optionsEn: ['Digha Nikaya', 'Anguttara Nikaya', 'Mahavamsa', 'Vinaya Pitaka'],
        optionsHi: ['दीघ निकाय', 'अंगुत्तर निकाय', 'महावंश', 'विनय पिटक'],
        correctIndex: 1,
        explanationEn: 'The Anguttara Nikaya of the Sutta Pitaka enumerates the sixteen great realms (Solasa Mahajanapada) in ancient India.',
        explanationHi: 'सुत्तपिटक के अंगुत्तर निकाय में 16 महाजनपदों का सर्वप्रथम प्रामाणिक उल्लेख मिलता है।',
      },
      {
        questionEn: 'The original capital of Magadha, Girivraja (Rajgir), was naturally fortified by how many surrounding hills?',
        questionHi: 'मगध की प्राचीन राजधानी गिरिव्रज (राजगृह) प्राकृतिक रूप से कितनी पहाड़ियों से घिरी हुई थी?',
        optionsEn: ['Three hills', 'Four hills', 'Five hills', 'Seven hills'],
        optionsHi: ['तीन पहाड़ियों से', 'चार पहाड़ियों से', 'पांच पहाड़ियों से', 'सात पहाड़ियों से'],
        correctIndex: 2,
        explanationEn: 'Rajgir was naturally encircled and defended by five rocky hills (Vipula, Vaibhara, Ratna, Giddhakuta, and Udaya).',
        explanationHi: 'राजगृह पांच प्राकृतिक पहाड़ियों (विपुल, वैभार, रत्नगिरि, उदयगिरि आदि) से घिरी एक अभेद्य राजधानी थी।',
      },
      {
        questionEn: 'Which Magadhan ruler deployed revolutionary military weapons like Rathamusala and Mahashilakantaka against the Vajji confederacy?',
        questionHi: 'वज्जि संघ के विरुद्ध रथमूसल एवं महाशिलाकंटक जैसे नवीन सैन्य अस्त्रों का प्रयोग किस मगध शासक ने किया था?',
        optionsEn: ['Bimbisara', 'Ajatashatru', 'Mahapadma Nanda', 'Chandragupta Maurya'],
        optionsHi: ['बिंबिसार', 'अजातशत्रु', 'महापद्मनंद', 'चंद्रगुप्त मौर्य'],
        correctIndex: 1,
        explanationEn: 'Ajatashatru utilized Mahashilakantaka (catapult) and Rathamusala (scythed chariot) to overpower the Licchavis of Vaishali.',
        explanationHi: 'अजातशत्रु ने वैशाली के लिच्छवियों के विरुद्ध रथमूसल और महाशिलाकंटक नामक घातक हथियारों का प्रयोग किया था।',
      },
    ],
  },

  // 3.2 Jainism & Buddhism
  {
    id: 'his-3-2',
    topicSequence: 'Topic 3.2',
    lectureNumber: 'Lecture 06',
    titleEn: 'Jainism & Buddhism: Causes of Origin, Philosophical Doctrines & Social Impact',
    titleHi: 'जैन धर्म एवं बौद्ध धर्म: उदय के कारण, दार्शनिक सिद्धांत (अष्टांगिक मार्ग, स्याद्वाद) एवं प्रभाव',
    subjectCode: 'SDSUV-HIS-101',
    subjectId: 'history',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 3,
    unitTitleEn: 'Unit III: Mahajanapadas, Magadha & Religious Movements',
    unitTitleHi: 'इकाई III: महाजनपद, मगध साम्राज्य एवं धार्मिक आंदोलन',
    readTime: '18 min read',
    highYieldTag: '🔥 15-Mark Core Philosophical Question',
    upscTag: 'UPSC GS-1 Heterodox Philosophies',
    sdsuvTag: '🔥 Compulsory 15-Mark Exam Question',
    learnTopicId: 't-his-302',
    youtubeId: 'eHEv5aF5td8',
    lectureChannel: 'StudyIQ IAS / PW OnlyIAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Jainism+and+Buddhism+Causes+Doctrines+StudyIQ',
    conclusionEn: 'The Shramana revolution led by Gautama Buddha and Vardhamana Mahavira democratized spirituality by preaching in vernacular tongues (Pali and Prakrit), rejecting Brahminical animal sacrifices, and providing an ethical, egalitarian ethos tailored to the newly urbanized mercantile society of the 6th century BCE.',
    conclusionHi: 'गौतम बुद्ध एवं वर्धमान महावीर द्वारा संचालित श्रमण आंदोलन ने जनभाषा (पाली एवं प्राकृत) में उपदेश देकर, वैदिक पशुबलि का विरोध कर तथा वर्ण व्यवस्था को नकार कर 6ठी शताब्दी ई.पू. के वैश्य व व्यापारिक वर्ग तथा जनसामान्य को एक समतामूलक व नैतिक विकल्प प्रदान किया।',
    contextEn: {
      intro:
        'The 6th century BCE in India witnessed an intellectual ferment parallel to Confucius in China and Socrates in Greece. The rigid caste barriers, complex animal-sacrificing Vedic rituals, and the rise of a prosperous merchant class (Setthis) created fertile soil for heterodox Shramana traditions: Buddhism founded by Siddhartha Gautama (Buddha) and Jainism revived by Vardhamana Mahavira (24th Tirthankara).',
      scholarDefinition: {
        scholar: 'Prof. A.L. Basham & Dr. S. Radhakrishnan',
        definition:
          '"Buddhism and Jainism were not merely religious protests; they were comprehensive social and intellectual revolutions against sacrificial ritualism, heralding an era of practical morality, psychological detachment, and non-violence (Ahimsa)."',
      },
    },
    contextHi: {
      intro:
        'छठी शताब्दी ई.पू. में जटिल वैदिक कर्मकांडों, पशुबलि और कठोर वर्ण व्यवस्था के विरुद्ध एक महान बौद्धिक एवं सामाजिक क्रांति हुई। इस श्रमण परंपरा का नेतृत्व वर्धमान महावीर (जैन धर्म के 24वें तीर्थंकर) तथा गौतम बुद्ध (बौद्ध धर्म के संस्थापक) ने किया। उन्होंने मोक्ष को जन्म के बजाय नैतिक आचरण, करुणा और अहिंसा से जोड़ दिया।',
      scholarDefinition: {
        scholar: 'प्रो. ए.एल. बाशम एवं डॉ. सर्वपल्ली राधाकृष्णन',
        definition:
          '"बौद्ध एवं जैन धर्म केवल धार्मिक विद्रोह नहीं थे; वे वैदिक कर्मकांडीय पशुबलि के विरुद्ध एक व्यापक सामाजिक क्रांति थे, जिन्होंने व्यावहारिक नैतिकता, आत्म-नियंत्रण और परम अहिंसा के युग का सूत्रपात किया।"',
      },
    },
    flowchart: {
      diagramType: 'comparison',
      titleEn: 'Philosophical Matrix: Doctrines of Buddhism vs Jainism',
      titleHi: 'बौद्ध धर्म बनाम जैन धर्म के मूल दार्शनिक सिद्धांत',
      columns: [
        {
          titleEn: '1. Socio-Economic Causes of Origin',
          titleHi: '1. उदय के सामाजिक-आर्थिक कारण',
          badge: '6th Century BCE Ferment',
          itemsEn: [
            'Animal sacrifices (Yajnas) destroyed cattle wealth vital for iron-plough agriculture',
            'Vaishya merchants (Setthis) ranked 3rd in Varna despite immense trade wealth',
            'Money lending (usury) condemned by Dharmasutras; embraced by heterodox sects',
            'Vernacular languages (Pali & Prakrit) accessible to masses over elite Sanskrit',
          ],
          itemsHi: [
            'वैदिक यज्ञों में पशुबलि से कृषि हेतु आवश्यक बैल व गोधन का भारी विनाश',
            'वैश्य व व्यापारी वर्ग को अपार धन के बावजूद वर्ण व्यवस्था में तीसरा स्थान प्राप्त होना',
            'धर्मशास्त्रों द्वारा सूदखोरी (ब्याज) की निंदा; बौद्ध/जैन धर्म द्वारा व्यापार को पूर्ण समर्थन',
            'संस्कृत के स्थान पर लोकभाषाओं (पाली एवं प्राकृत) में उपदेश, जिससे जनसामान्य जुड़ा',
          ],
        },
        {
          titleEn: '2. Core Buddhist Doctrines',
          titleHi: '2. बौद्ध धर्म के आधारभूत सिद्धांत',
          badge: 'Middle Path (मज्झिम पतिपदा)',
          itemsEn: [
            'Four Noble Truths (Arya Satya): Dukkha, Samudaya, Nirodha, Magga',
            'Eightfold Path (Ashtangika Marga): Right View, Resolve, Speech, Action, Livelihood, Effort, Mindfulness, Samadhi',
            'Pratityasamutpada (Dependent Origination): Nothing is permanent (Anicca); No soul (Anatta)',
            'Rejection of both extreme self-mortification and sensual indulgence (Madhyama Pratipada)',
          ],
          itemsHi: [
            'चार आर्य सत्य: दुःख, दुःख समुदाय (कारण), दुःख निरोध (निवारण), दुःख निरोध गामिनी प्रतिपदा',
            'अष्टांगिक मार्ग: सम्यक् दृष्टि, संकल्प, वाक, कर्म, आजीव, व्यायाम, स्मृति एवं सम्यक् समाधि',
            'प्रतीत्यसमुत्पाद (कारण-कार्य सिद्धांत): अनित्यवाद (कुछ भी स्थायी नहीं) एवं अनात्मवाद (आत्मा नहीं)',
            'मध्यम मार्ग: न अत्यधिक शारीरिक तप और न ही भोग-विलास; सम्यक संतुलन ही निर्वाण है',
          ],
        },
        {
          titleEn: '3. Core Jain Doctrines',
          titleHi: '3. जैन धर्म के आधारभूत सिद्धांत',
          badge: 'Extreme Penance & Ahimsa',
          itemsEn: [
            'Triratna (Three Jewels): Samyak Darshana (Faith), Samyak Jnana (Knowledge), Samyak Charitra (Conduct)',
            'Panchamahavratas: Ahimsa (Non-violence), Satya, Asteya, Aparigraha, Brahmacharya',
            'Anekantavada & Syadvada: Relativity of truth and multi-faceted reality (7-fold judgment)',
            'Extreme asceticism: Sallekhana (fasting unto death); attribution of souls (Jiva) even to inanimate matter',
          ],
          itemsHi: [
            'त्रिरत्न: सम्यक् दर्शन (श्रद्धा), सम्यक् ज्ञान (सच्चा ज्ञान) एवं सम्यक् चरित्र (आचरण)',
            'पंच महाव्रत: अहिंसा, सत्य, अस्तेय (चोरी न करना), अपरिग्रह (संग्रह न करना), ब्रह्मचर्य',
            'अनेकांतवाद एवं स्याद्वाद: ज्ञान की सापेक्षता; सत्य के सात पहलू (सप्तभंगी नय)',
            'कठोर तपस्या: संलेखना (कायाक्लेश द्वारा प्राण त्याग); निर्जीव वस्तुओं (पत्थर, जल) में भी जीव की मान्यता',
          ],
        },
      ],
    },
    analyticalPoints: [
      {
        headingEn: 'Pratityasamutpada and Anattavada: The Buddhist Philosophical Revolution',
        headingHi: 'प्रतीत्यसमुत्पाद एवं अनात्मवाद: बौद्ध धर्म की दार्शनिक क्रांति',
        detailEn:
          'Gautama Buddha introduced Pratityasamutpada (Dependent Origination: "When this exists, that comes to be; with the cessation of this, that ceases"), which dismantled Vedic notions of a creator God and eternal soul. In its place, Buddhism established Anicca (universal impermanence) and Anatta (no enduring individual self; humans are merely five aggregates or Skandhas). This empirical causality offered a psychological pathway to Nirvana (extinction of desire) achievable by all, regardless of caste.',
        detailHi:
          'बुद्ध ने प्रतीत्यसमुत्पाद ("इसके होने से वह होता है, इसके रुकने से वह रुक जाता है") का प्रतिपादन किया, जिसने ईश्वर एवं शाश्वत आत्मा के वैदिक सिद्धांत का खंडन किया। बुद्ध ने अनित्यवाद (संसार में कुछ भी स्थायी नहीं) और अनात्मवाद (कोई स्थायी आत्मा नहीं; मानव केवल पांच स्कंधों का प्रवाह है) की स्थापना की। इस विशुद्ध कारण-कार्य सिद्धांत ने यह सिद्ध किया कि तृष्णा का अंत करके कोई भी व्यक्ति, चाहे वह किसी भी वर्ण का हो, इसी जन्म में निर्वाण प्राप्त कर सकता है।',
        bulletsEn: [
          'Twelve-link causal wheel (Dvadasa Nidana): Ignorance (Avidya) -> Craving (Tanha) -> Rebirth -> Suffering.',
          'Nirvana concept: Not a post-mortem paradise, but the psychological blow-out of greed, hatred, and delusion.',
          'Social egalitarianism: The Sangha admitted all four castes, women (Mahapajapati Gotami), and outcasts alike.',
        ],
        bulletsHi: [
          'द्वादश निदान: अविद्या -> संस्कार -> तृष्णा -> भव -> जरा-मरण का 12 कड़ियों वाला चक्र।',
          'निर्वाण की अवधारणा: मृत्यु के बाद का कोई स्वर्ग नहीं, बल्कि जीते-जी लोभ, द्वेष और अज्ञान का शमन।',
          'सामाजिक समानता: संघ में चारों वर्णों, महिलाओं (महाप्रजापति गौतमी) और शूद्रों को समान प्रवेश।',
        ],
        quoteOrArticle: 'Dhammacakkappavattana Sutta: The First Sermon at Sarnath',
      },
    ],
    valueAddition: {
      thinkersEn: ['Gautama Buddha', 'Vardhamana Mahavira', 'Prof. A.L. Basham', 'Dr. B.R. Ambedkar', 'Rhys Davids'],
      thinkersHi: ['गौतम बुद्ध', 'वर्धमान महावीर', 'प्रो. ए.एल. बाशम', 'डॉ. भीमराव अंबेडकर', 'रीस डेविड्स'],
      recommendedBooksEn: ['The Wonder That Was India by A.L. Basham', 'The Buddha and His Dhamma by B.R. Ambedkar', 'History of Indian Philosophy by Dasgupta'],
      recommendedBooksHi: ['बुद्ध और उनका धम्म — डॉ. बी.आर. अंबेडकर', 'भारतीय दर्शन — डॉ. सर्वपल्ली राधाकृष्णन', 'प्राचीन भारत — प्रो. आर.एस. शर्मा'],
      examQuoteEn: '"Buddha and Mahavira did not summon gods from heaven; they summoned humans to look within their own minds and conquer suffering through self-mastery."',
      examQuoteHi: '"बुद्ध और महावीर ने मनुष्यों को स्वर्ग से देवताओं की गुहार लगाने के लिए नहीं, बल्कि अपने भीतर झांककर आत्म-नियंत्रण द्वारा दुखों पर विजय पाने का आह्वान किया।"',
      upscConnectionEn: 'UPSC Mains GS-1: Philosophical concepts of Anekantavada and Ashtangika Marga; Relevance of Buddhist ethics in contemporary global conflict resolution.',
      upscConnectionHi: 'यूपीएससी एवं राज्य पीसीएस: बौद्ध धर्म का अष्टांगिक मार्ग व मध्यम मार्ग; जैन धर्म का स्याद्वाद व अनेकांतवाद; दोनों धर्मों की समकालीन प्रासंगिकता।',
      topperTipEn: 'Include a comparative schematic showing the 4 Buddhist Councils (Venues, Kings: Ajatashatru, Kalashoka, Ashoka, Kanishka) and the 2 Jain Councils (Pataliputra, Vallabhi).',
      topperTipHi: 'उत्तर में चारों बौद्ध संगीतियों (राजगृह, वैशाली, पाटलिपुत्र, कुंडलवन) एवं दोनों जैन संगीतियों (पाटलिपुत्र, वल्लभी) की एक संक्षिप्त तालिका अवश्य बनाएं।',
    },
    answerBlueprint: {
      questionTitleEn: 'Account for the rise of heterodox religious movements in the 6th century BCE. Compare and contrast the core philosophies of Buddhism and Jainism.',
      questionTitleHi: 'छठी शताब्दी ई.पू. में नए धार्मिक आंदोलनों के उदय के कारणों की विवेचना कीजिए। बौद्ध एवं जैन धर्म के मूल दार्शनिक सिद्धांतों का तुलनात्मक परीक्षण कीजिए। (15 अंक)',
      introductionEn: 'Introduce the 6th century BCE intellectual ferment; explain the economic and ritualistic crises of the Later Vedic society.',
      introductionHi: 'छठी शताब्दी ई.पू. की सामाजिक-आर्थिक परिस्थितियों का परिचय दें; वैदिक कर्मकांडीय पशुबलि और वर्ण व्यवस्था के विरुद्ध असंतोष को रेखांकित करें।',
      coreHeadingsEn: [
        '1. Socio-Economic Catalysts: Agricultural Need for Cattle, Rise of the Vaishya Merchant Class & Vernacular Appeal',
        '2. Core Tenets of Buddhism: Four Noble Truths, Eightfold Path, Pratityasamutpada & Middle Path',
        '3. Core Tenets of Jainism: Triratna, Five Mahavratas, Extreme Ahimsa, Anekantavada & Syadvada',
        '4. Comparative Analysis: Concept of Soul (Anatta vs Jiva), Penance (Middle Path vs Severe Asceticism) & Social Impact',
      ],
      coreHeadingsHi: [
        '1. उदय के सामाजिक-आर्थिक कारण: कृषि हेतु गोधन की आवश्यकता, वैश्य वर्ग का असंतोष एवं जनभाषा का प्रभाव',
        '2. बौद्ध धर्म के सिद्धांत: चार आर्य सत्य, अष्टांगिक मार्ग, प्रतीत्यसमुत्पाद एवं मध्यम मार्ग की अवधारणा',
        '3. जैन धर्म के सिद्धांत: त्रिरत्न, पंच महाव्रत, परम अहिंसा, अनेकांतवाद एवं स्याद्वाद का सापेक्ष ज्ञान',
        '4. तुलनात्मक मूल्यांकन: आत्मा की अवधारणा (अनात्मवाद बनाम सर्वजीववाद), तपस्या (मध्यम मार्ग बनाम कायाक्लेश) व प्रभाव',
      ],
      conclusionEn: 'Conclude with how both traditions transformed Indian art (Stupas, Chaityas, Caves), elevated moral philosophy, and shaped non-violent statecraft under Ashoka.',
      conclusionHi: 'निष्कर्ष में बताएं कि इन आंदोलनों ने भारतीय कला (स्तूप, चैत्य, विहार), लोकभाषाओं और नैतिक राजनीति को गहरे तक प्रभावित किया, जिसका सर्वोच्च उदाहरण सम्राट अशोक का धम्म बना।',
    },
    commonMistakes: [
      {
        mistakeEn: 'Saying Buddhism and Jainism both believe in the soul.',
        mistakeHi: 'यह लिखना कि बौद्ध और जैन दोनों आत्मा में विश्वास करते हैं।',
        correctionEn: 'Clarify that Jainism believes every entity (even rocks and water) possesses a soul (Jiva), while Buddhism strictly rejects an eternal soul (Anattavada).',
        correctionHi: 'स्पष्ट लिखें कि जैन धर्म जड़ और चेतन सबमें आत्मा (जीव) मानता है, जबकि बौद्ध धर्म किसी भी स्थायी आत्मा को स्वीकार नहीं करता (अनात्मवाद)।',
      },
    ],
    mcqs: [
      {
        questionEn: 'The central Buddhist philosophical doctrine that "everything arises in dependence upon conditions and ceases when those conditions cease" is termed:',
        questionHi: 'बौद्ध धर्म का वह केंद्रीय दार्शनिक सिद्धांत क्या कहलाता है, जिसके अनुसार "प्रत्येक घटना किसी कारण पर निर्भर होकर उत्पन्न होती है"?',
        optionsEn: ['Anekantavada', 'Syadvada', 'Pratityasamutpada (प्रतीत्यसमुत्पाद)', 'Samyak Darshana'],
        optionsHi: ['अनेकांतवाद', 'स्याद्वाद', 'प्रतीत्यसमुत्पाद', 'सम्यक् दर्शन'],
        correctIndex: 2,
        explanationEn: 'Pratityasamutpada (Dependent Origination) is the fundamental Buddhist law of cause and effect underlying all phenomena.',
        explanationHi: 'प्रतीत्यसमुत्पाद बौद्ध दर्शन की आधारशिला है, जिसका अर्थ है किसी वस्तु की उत्पत्ति किसी कारण पर निर्भर करती है।',
      },
      {
        questionEn: 'The Jain philosophical doctrine of "relative knowledge" and multifaceted truth, also known as the theory of conditioned prediction, is:',
        questionHi: 'जैन दर्शन में ज्ञान की सापेक्षता और सत्य के बहुआयामी स्वरूप की व्याख्या करने वाला सिद्धांत कौन सा है?',
        optionsEn: ['Anattavada', 'Syadvada / Anekantavada', 'Sunyavada', 'Madhyamaka'],
        optionsHi: ['अनात्मवाद', 'स्याद्वाद / अनेकांतवाद', 'शून्यवाद', 'माध्यमिक'],
        correctIndex: 1,
        explanationEn: 'Anekantavada (multiplicity of viewpoints) and Syadvada (theory of conditional assertion) form the core epistemological doctrines of Jainism.',
        explanationHi: 'अनेकांतवाद और स्याद्वाद जैन धर्म के ज्ञानमीमांसीय सिद्धांत हैं जो यह सिखाते हैं कि सत्य के अनेक पहलू होते हैं।',
      },
      {
        questionEn: 'The First Buddhist Council, held immediately after the Mahaparinirvana of Gautama Buddha at Rajgir, was patronized by which king?',
        questionHi: 'बुद्ध के महापरिनिर्वाण के तुरंत बाद राजगृह की सप्तपर्णी गुफा में प्रथम बौद्ध संगीति किस शासक के संरक्षण में आयोजित हुई थी?',
        optionsEn: ['Bimbisara', 'Ajatashatru', 'Ashoka', 'Kanishka'],
        optionsHi: ['बिंबिसार', 'अजातशत्रु', 'अशोक', 'कनिष्क'],
        correctIndex: 1,
        explanationEn: 'The First Buddhist Council was convened in 483 BCE at Rajgir under the patronage of king Ajatashatru of the Haryanka dynasty.',
        explanationHi: 'प्रथम बौद्ध संगीति 483 ई.पू. में हर्यक वंश के राजा अजातशत्रु के शासनकाल में राजगृह में आयोजित की गई थी।',
      },
    ],
  },

  // =========================================================================
  // UNIT IV: THE MAURYAN EMPIRE
  // =========================================================================
  {
    id: 'his-4-1',
    topicSequence: 'Topic 4.1',
    lectureNumber: 'Lecture 07',
    titleEn: 'Mauryan Empire: Chandragupta, Administration (Arthashastra & Indica) & Economy',
    titleHi: 'मौर्य साम्राज्य: चंद्रगुप्त मौर्य, प्रशासनिक व्यवस्था (अर्थशास्त्र व इंडिका) एवं अर्थव्यवस्था',
    subjectCode: 'SDSUV-HIS-101',
    subjectId: 'history',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 4,
    unitTitleEn: 'Unit IV: The Mauryan Empire, Administration & Ashoka’s Dhamma',
    unitTitleHi: 'इकाई IV: मौर्य साम्राज्य, प्रशासनिक व्यवस्था एवं अशोक का धम्म',
    readTime: '18 min read',
    highYieldTag: '🔥 15-Mark Core Mauryan Administration Question',
    upscTag: 'UPSC GS-1 Mauryan Bureaucracy',
    sdsuvTag: '🔥 Asked in 85% Semester Exams',
    learnTopicId: 't-his-401',
    youtubeId: 'Esj-4hNWxLQ',
    lectureChannel: 'CEC UGC / StudyIQ IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Mauryan+Administration+Arthashastra+Indica+StudyIQ',
    conclusionEn: 'The Mauryan Empire under Chandragupta and Chanakya established India’s first centralized bureaucratic welfare state, underpinned by Kautilya’s Saptanga Theory, an omnipresent espionage intelligence network, state-controlled economic monopolies, and Megasthenes’s civic boards.',
    conclusionHi: 'चंद्रगुप्त मौर्य एवं चाणक्य द्वारा स्थापित मौर्य प्रशासन भारत का प्रथम केंद्रीकृत नौकरशाही युक्त लोक-कल्याणकारी राज्य था, जो कौटिल्य के सप्तांग सिद्धांत, सर्वव्यापी गुप्तचर व्यवस्था, राज्य-नियंत्रित अर्थव्यवस्था एवं मेगस्थनीज द्वारा वर्णित छह नगर परिषदों पर आधारित था।',
    contextEn: {
      intro:
        'Founded in 321 BCE after overthrowing the Nanda dynasty, the Mauryan Empire unified the Indian subcontinent from the Hindu Kush to Karnataka under Chandragupta Maurya. The twin foundational sources for its administrative edifice are Kautilya’s Sanskrit treatise "Arthashastra" and Megasthenes’s Greek memoir "Indica".',
      scholarDefinition: {
        scholar: 'Kautilya (Chanakya) & Prof. Romila Thapar',
        definition:
          '"The Mauryan state was a centrally coordinated bureaucratic apparatus where sovereign power (Swami) operated not for autocratic luxury, but as an engine of agrarian expansion, state monopolistic manufacturing, and comprehensive welfare (Yogakshema)."',
      },
    },
    contextHi: {
      intro:
        '321 ई.पू. में नंद वंश का तख्तापलट कर चंद्रगुप्त मौर्य ने चाणक्य की सहायता से मौर्य साम्राज्य की नींव रखी, जिसने हिंदूकुश से लेकर कर्नाटक तक भारत का राजनीतिक एकीकरण किया। इस प्रशासनिक व्यवस्था की जानकारी के दो मुख्य आधार हैं: कौटिल्य का "अर्थशास्त्र" तथा यूनानी राजदूत मेगस्थनीज की "इंडिका"।',
      scholarDefinition: {
        scholar: 'कौटिल्य (चाणक्य) एवं प्रो. रोमिला थापर',
        definition:
          '"मौर्य प्रशासन एक सुदृढ़ केंद्रीकृत नौकरशाही तंत्र था जहां राजा का सर्वोपरि कर्तव्य प्रजा के सुख में अपना सुख देखना (प्रजासुखे सुखं राज्ञः) तथा कृषि विस्तार और व्यापारिक सुरक्षा सुनिश्चित करना था।"',
      },
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Administrative Architecture of the Mauryan Empire',
      titleHi: 'मौर्य साम्राज्य की प्रशासनिक संरचना का वर्गीकरण',
      columns: [
        {
          titleEn: '1. Central Government & Saptanga',
          titleHi: '1. केंद्रीय प्रशासन एवं सप्तांग सिद्धांत',
          badge: '7 Limbs of the State',
          itemsEn: [
            'Saptanga Theory: Swami (King), Amatya (Bureaucracy), Janapada (Territory), Durga (Fort), Kosha (Treasury), Danda (Army), Mitra (Ally)',
            'Tirthas: 18 supreme executive heads (Mantri, Purohita, Senapati, Yuvaraja, Samaharta, Sannidhata)',
            'Adhyakshas: 27 superintendents managing mines (Akaradhyaksha), tolls (Shulkadhyaksha), agriculture (Sitadhyaksha)',
          ],
          itemsHi: [
            'सप्तांग सिद्धांत: स्वामी (राजा), अमात्य (अधिकारी), जनपद (भूमि व प्रजा), दुर्ग, कोश (खजाना), दंड (सेना), मित्र',
            'तीर्थ: 18 सर्वोच्च पदाधिकारी (मंत्री, पुरोहित, सेनापति, युवराज, समाहर्ता - कर संग्रहकर्ता, सन्निधाता - कोषाध्यक्ष)',
            'अध्यक्ष: 27 विभागाध्यक्ष जैसे सीताध्यक्ष (कृषि), आकराध्यक्ष (खान), शुल्काध्यक्ष (चुंगी कर), पण्याध्यक्ष (व्यापार)',
          ],
        },
        {
          titleEn: '2. Municipal Governance (Indica)',
          titleHi: '2. नगर प्रशासन (मेगस्थनीज की इंडिका)',
          badge: '6 Boards of 5 Members',
          itemsEn: [
            'Pataliputra municipal council: 30 members divided into 6 specialized boards of 5 members each',
            'Board 1: Industrial arts & craft standards; Board 2: Care and monitoring of foreigners',
            'Board 3: Vital statistics (birth and death registers); Board 4: Trade, weights and measures',
            'Board 5: Inspection of manufactured goods; Board 6: Collection of 10% sales tax',
          ],
          itemsHi: [
            'पाटलिपुत्र नगर परिषद: 30 सदस्यों का बोर्ड, जो 5-5 सदस्यों की 6 समितियों में विभाजित था',
            'प्रथम समिति: शिल्प व उद्योगों की निगरानी; द्वितीय: विदेशी नागरिकों की देखभाल व सुरक्षा',
            'तृतीय समिति: जन्म-मृत्यु का अनिवार्य पंजीकरण; चतुर्थ: व्यापार, माप-तौल का नियमन',
            'पंचम समिति: निर्मित वस्तुओं के विक्रय की जांच; षष्ठम समिति: 10% बिक्री कर (Sales Tax) की वसूली',
          ],
        },
        {
          titleEn: '3. Military & Espionage Networks',
          titleHi: '3. सैन्य संगठन एवं गुप्तचर तंत्र (Gudhapurushas)',
          badge: 'Total Security Apparatus',
          itemsEn: [
            'Armed Forces: Standing army of 600,000 infantry, 30,000 cavalry, 9,000 war elephants, 8,000 chariots',
            'War Council: 6 boards of 5 members overseeing Infantry, Cavalry, Elephants, Chariots, Navy, Transport',
            'Espionage: Samsthah (stationed spies) and Sancharah (roving undercover operatives, female spies)',
          ],
          itemsHi: [
            'विशाल सेना: 6 लाख पैदल, 30,000 अश्वारोही, 9,000 युद्धक हाथी और 8,000 रथ (प्लिनी का विवरण)',
            'सैन्य परिषद: 30 सदस्यों की 6 समितियां (पैदल, अश्व, गज, रथ, नौसेना एवं रसद/परिवहन)',
            'गुप्तचर तंत्र (गूढ़पुरुष): संस्था (एक स्थान पर रहकर कार्य करने वाले) एवं संचारा (भ्रमणशील गुप्तचर, विषकन्याएं)',
          ],
        },
      ],
    },
    analyticalPoints: [
      {
        headingEn: 'Kautilya’s Saptanga Theory and the Organic Conception of the State',
        headingHi: 'कौटिल्य का सप्तांग सिद्धांत एवं राज्य का सावयव (Organic) स्वरूप',
        detailEn:
          'In Book VI of the Arthashastra, Kautilya propounds the Saptanga Theory, conceptualizing the state as an organic body with seven interdependent limbs: (1) Swami (head/king), (2) Amatya (eyes/ministers), (3) Janapada (legs/territory & population), (4) Durga (arms/fortress), (5) Kosha (mouth/treasury), (6) Danda (brain/army), and (7) Mitra (ears/allies). Kautilya emphasized that an empty treasury (Kosha) paralyzes the army (Danda), and bad ministers (Amatya) corrupt the king (Swami), demonstrating advanced systemic political analysis.',
        detailHi:
          'अर्थशास्त्र के छठे अधिकरण में कौटिल्य ने राज्य के 7 आवश्यक अंग (सप्तांग) बताए हैं, जिनकी तुलना मानव शरीर से की गई है: (1) स्वामी (सिर/राजा), (2) अमात्य (नेत्र/मंत्री व अधिकारी), (3) जनपद (पैर/भूमि व कृषक), (4) दुर्ग (भुजाएं/किला), (5) कोश (मुख/खजाना), (6) दंड या बल (मस्तिष्क/सेना), तथा (7) मित्र (कान/सहयोगी राज्य)। कौटिल्य के अनुसार कोश के बिना सेना नहीं रह सकती और सुयोग्य मंत्रियों के बिना राजा अंधा है; सातों अंगों का संतुलन ही राज्य की सुरक्षा का आधार है।',
        bulletsEn: [
          'Royal ideal: "In the happiness of his subjects lies his happiness; in their welfare his welfare" (Arthashastra 1.19).',
          'Samaharta & Sannidhata: Samaharta as chief collector of revenues; Sannidhata as chief custodian of state storehouses.',
          'State monopolies: Royal control over mining (Akaradhyaksha), salt manufacture, and liquor trade.',
        ],
        bulletsHi: [
          'राजा का धर्म: "प्रजा के सुख में ही राजा का सुख है, प्रजा के हित में ही उसका हित है" (अर्थशास्त्र 1.19)।',
          'समाहर्ता व सन्निधाता: समाहर्ता राजस्व का मुख्य संग्राहक था; सन्निधाता शाही कोषाध्यक्ष व भंडारगृह प्रमुख था।',
          'राजकीय एकाधिकार: खदानों, नमक उत्पादन, मदिरा एवं हथियारों के निर्माण पर राज्य का सीधा नियंत्रण था।',
        ],
        quoteOrArticle: 'Kautilya’s Dictum: Prajasukhe Sukham Rajnah Prajanam cha Hite Hitam',
      },
    ],
    valueAddition: {
      thinkersEn: ['Kautilya (Chanakya)', 'Megasthenes', 'Prof. Romila Thapar', 'R.P. Kangle', 'Vincent Smith'],
      thinkersHi: ['कौटिल्य (चाणक्य)', 'मेगस्थनीज', 'प्रो. रोमिला थापर', 'आर.पी. कांगले', 'विन्सेंट स्मिथ'],
      recommendedBooksEn: ['The Kautiliya Arthashastra by R.P. Kangle', 'Asoka and the Decline of the Mauryas by Romila Thapar'],
      recommendedBooksHi: ['कौटिल्य का अर्थशास्त्र — आर.पी. कांगले', 'अशोक और मौर्य साम्राज्य का पतन — रोमिला थापर'],
      examQuoteEn: '"Kautilya’s Arthashastra is not Machiavellian cynicism; it is the master blueprint of an ancient welfare state combining iron fiscal prudence with compassionate public works."',
      examQuoteHi: '"कौटिल्य का अर्थशास्त्र केवल कूटनीति नहीं, बल्कि प्राचीन कल्याणकारी राज्य का वह महान संविधान है जो वित्तीय कठोरता के साथ जन-कल्याण का समन्वय करता है।"',
      upscConnectionEn: 'UPSC Mains GS-1: Administrative apparatus of the Mauryas; Comparison between Kautilya’s Arthashastra and Megasthenes’s Indica accounts.',
      upscConnectionHi: 'यूपीएससी एवं राज्य पीसीएस: मौर्यकालीन नौकरशाही एवं सप्तांग सिद्धांत; अर्थशास्त्र एवं इंडिका के विवरणों का तुलनात्मक अध्ययन।',
      topperTipEn: 'Draw the Saptanga flowchart showing the 7 limbs mapped to human anatomy, and list the 6 municipal boards described by Megasthenes.',
      topperTipHi: 'उत्तर में सप्तांग सिद्धांत का सुंदर आरेख बनाएं जिसमें सातों अंगों की भूमिका स्पष्ट हो, तथा मेगस्थनीज द्वारा वर्णित 6 नगर समितियों की सूची दें।',
    },
    answerBlueprint: {
      questionTitleEn: 'Discuss the salient features of the Mauryan administration on the basis of Kautilya’s Arthashastra and Megasthenes’s Indica.',
      questionTitleHi: 'कौटिल्य के अर्थशास्त्र एवं मेगस्थनीज की इंडिका के आधार पर मौर्य प्रशासनिक व्यवस्था की प्रमुख विशेषताओं की विवेचना कीजिए। (15 अंक)',
      introductionEn: 'Introduce the Mauryan Empire founded by Chandragupta Maurya (321 BCE); mention the convergence of Arthashastra and Indica as primary historical pillars.',
      introductionHi: 'चंद्रगुप्त मौर्य द्वारा 321 ई.पू. में स्थापित मौर्य साम्राज्य की भूमिका लिखें; अर्थशास्त्र एवं इंडिका को प्रशासनिक जानकारी का मुख्य स्तंभ बताएं।',
      coreHeadingsEn: [
        '1. Central Administration & Kautilya’s Saptanga Theory of State',
        '2. The Bureaucratic Machinery: 18 Tirthas and 27 Departmental Adhyakshas',
        '3. Municipal Administration of Pataliputra: The Six Specialized Civic Boards of Megasthenes',
        '4. Military Organization, Espionage System (Gudhapurushas) and Agrarian Economic Control',
      ],
      coreHeadingsHi: [
        '1. केंद्रीय प्रशासन एवं कौटिल्य का सप्तांग सिद्धांत (राजा, अमात्य, जनपद, दुर्ग, कोश, दंड, मित्र)',
        '2. प्रशासनिक नौकरशाही: 18 तीर्थ (समाहर्ता, सन्निधाता) एवं 27 विभागाध्यक्ष (सीताध्यक्ष आदि)',
        '3. पाटलिपुत्र का नगर प्रशासन: मेगस्थनीज की इंडिका में वर्णित 5-5 सदस्यों की 6 नागरिक समितियां',
        '4. सैन्य संगठन (6 समितियां), गुप्तचर तंत्र (संस्था व संचारा) एवं राज्य-नियंत्रित कृषि अर्थव्यवस्था',
      ],
      conclusionEn: 'Conclude with how Mauryan centralized governance created India’s first pan-subcontinental economic common market, paving the way for Ashoka’s moral empire.',
      conclusionHi: 'निष्कर्ष में बताएं कि मौर्य प्रशासन ने भारत में प्रथम बार एक एकीकृत राष्ट्रीय बाजार और सुशासन की नींव रखी, जिसे अशोक ने अपने धम्म द्वारा नैतिक ऊंचाई प्रदान की।',
    },
    commonMistakes: [
      {
        mistakeEn: 'Confusing the Samaharta with the Sannidhata.',
        mistakeHi: 'समाहर्ता और सन्निधाता के पदों में भ्रमित होना।',
        correctionEn: 'Clarify that Samaharta is the Collector General of Revenues, while Sannidhata is the Chief Treasurer and Keeper of the Royal Storehouse.',
        correctionHi: 'याद रखें: समाहर्ता राजस्व (टैक्स) वसूलने वाला सर्वोच्च अधिकारी था, जबकि सन्निधाता राजकीय खजाने और अन्नागार का प्रमुख (कोषाध्यक्ष) था।',
      },
    ],
    mcqs: [
      {
        questionEn: 'In Kautilya’s Arthashastra, which high-ranking official was responsible for the assessment and collection of all state revenues?',
        questionHi: 'कौटिल्य के अर्थशास्त्र में संपूर्ण राज्य के राजस्व का निर्धारण एवं संग्रह करने वाला सर्वोच्च अधिकारी कौन था?',
        optionsEn: ['Sannidhata', 'Samaharta (समाहर्ता)', 'Sitadhyaksha', 'Purohita'],
        optionsHi: ['सन्निधाता', 'समाहर्ता', 'सीताध्यक्ष', 'पुरोहित'],
        correctIndex: 1,
        explanationEn: 'The Samaharta was the chief collector general of revenue overseeing all fiscal assessments and taxation throughout the empire.',
        explanationHi: 'समाहर्ता मौर्य प्रशासन में कर निर्धारण एवं राजस्व संग्रह का सर्वोच्च प्रभारी अधिकारी था।',
      },
      {
        questionEn: 'According to Megasthenes’s Indica, the municipal administration of Pataliputra was managed by how many specialized boards?',
        questionHi: 'मेगस्थनीज की इंडिका के अनुसार पाटलिपुत्र नगर का प्रशासन कुल कितनी समितियों द्वारा संचालित होता था?',
        optionsEn: ['Four boards', 'Five boards', 'Six boards (of 5 members each)', 'Eight boards'],
        optionsHi: ['चार समितियां', 'पांच समितियां', 'छह समितियां (प्रत्येक में 5 सदस्य)', 'आठ समितियां'],
        correctIndex: 2,
        explanationEn: 'Megasthenes recorded that Pataliputra’s municipal council consisted of 30 members organized into six boards of five members each.',
        explanationHi: 'मेगस्थनीज ने लिखा कि पाटलिपुत्र का प्रशासन 30 सदस्यों का नगर निगम चलाता था जो 5-5 सदस्यों की 6 समितियों में बंटा था।',
      },
      {
        questionEn: 'The Mauryan superintendent who held charge of state crown agricultural lands and royal farming operations was titled:',
        questionHi: 'मौर्य काल में राजकीय कृषि भूमि (सीता) एवं खेती के कार्यों की देखरेख करने वाला अध्यक्ष क्या कहलाता था?',
        optionsEn: ['Akaradhyaksha', 'Sitadhyaksha (सीताध्यक्ष)', 'Panyadhyaksha', 'Navadhyaksha'],
        optionsHi: ['आकराध्यक्ष', 'सीताध्यक्ष', 'पण्याध्यक्ष', 'नावाध्यक्ष'],
        correctIndex: 1,
        explanationEn: 'The Sitadhyaksha was the superintendent of crown lands (Sita) responsible for agriculture, irrigation, and crop cultivation.',
        explanationHi: 'सीताध्यक्ष सरकारी कृषि भूमि (सीता) का प्रबंध करने और खेती की पैदावार बढ़ाने वाला मुख्य अधिकारी था।',
      },
    ],
  },

  // 4.2 Ashoka's Dhamma
  {
    id: 'his-4-2',
    topicSequence: 'Topic 4.2',
    lectureNumber: 'Lecture 08',
    titleEn: 'Ashoka’s Dhamma: Nature, Inscriptions (Major Rock Edicts) & Mauryan Decline',
    titleHi: 'अशोक का धम्म: स्वरूप, प्रमुख शिलालेख (कालसी, गिरनार) एवं मौर्य साम्राज्य के पतन के कारण',
    subjectCode: 'SDSUV-HIS-101',
    subjectId: 'history',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 4,
    unitTitleEn: 'Unit IV: The Mauryan Empire, Administration & Ashoka’s Dhamma',
    unitTitleHi: 'इकाई IV: मौर्य साम्राज्य, प्रशासनिक व्यवस्था एवं अशोक का धम्म',
    readTime: '18 min read',
    highYieldTag: '🔥 15-Mark Ashoka Special Question',
    upscTag: 'UPSC Ashoka’s Dhamma Policy',
    sdsuvTag: '🔥 Asked in 80% Exams (Includes Kalsi Edict)',
    learnTopicId: 't-his-402',
    youtubeId: 'm9w2ZOUF6So',
    lectureChannel: 'StudyIQ IAS / Drishti IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Ashokas+Dhamma+Nature+Inscriptions+Decline+StudyIQ',
    conclusionEn: 'Ashoka’s Dhamma was not sectarian Buddhism elevated to state religion, but an enlightened ethical civic code designed to foster social harmony across a multi-cultural subcontinent; the subsequent decline of the Mauryas was driven by imperial overstretch, financial drain, weak successors, and Pushyamitra Shunga’s coup in 185 BCE.',
    conclusionHi: 'अशोक का धम्म कोई संकीर्ण बौद्ध धर्म नहीं था, बल्कि एक सार्वभौमिक नैतिक आचार संहिता थी जिसका उद्देश्य विशाल बहुसांस्कृतिक साम्राज्य में सामाजिक सद्भाव स्थापित करना था; मौर्य साम्राज्य का पतन कमजोर उत्तराधिकारियों, अत्यधिक केंद्रीयकरण, वित्तीय संकट तथा 185 ई.पू. में पुष्यमित्र शुंग के सैनिक विद्रोह का परिणाम था।',
    contextEn: {
      intro:
        'Traumatized by the slaughter of the Kalinga War in 261 BCE (Major Rock Edict XIII: 100,000 killed, 150,000 captured), Emperor Ashoka renounced aggressive warfare (Bherighosha) in favor of moral conquest (Dhammaghosha). Engraved across rocks and pillars from Kandahar to Kalsi (Dehradun, Uttarakhand) and Mysore, his Dhamma articulated an empire-wide moral philosophy.',
      scholarDefinition: {
        scholar: 'Prof. Romila Thapar (Asoka and the Decline of the Mauryas)',
        definition:
          '"Ashoka’s Dhamma was a brilliant ideological synthesis of civic ethics—an attempt to hold together an extraordinarily diverse empire without excessive military coercion, emphasizing social responsibility, religious tolerance, and paternal welfare."',
      },
    },
    contextHi: {
      intro:
        '261 ई.पू. के कलिंग युद्ध के भीषण नरसंहार (13वें शिलालेख के अनुसार 1 लाख हताहत, डेढ़ लाख बंदी) से व्यथित होकर सम्राट अशोक ने भेरीघोष (युद्ध नीति) को त्यागकर धम्मघोष (नैतिक विजय) को अपनाया। अफगानिस्तान के कंधार से लेकर उत्तराखंड के कालसी (देहरादून) तक चट्टानों पर उत्कीर्ण अभिलेखों में अशोक ने इस लोक-कल्याणकारी धम्म का प्रचार किया।',
      scholarDefinition: {
        scholar: 'प्रो. रोमिला थापर (अशोक और मौर्य साम्राज्य का पतन)',
        definition:
          '"अशोक का धम्म कोई संप्रदाय नहीं था, बल्कि एक विशाल बहुसांस्कृतिक साम्राज्य को बिना सैन्य दमन के एकजुट रखने का एक बौद्धिक राजनीतिक प्रयास था, जो सहिष्णुता, सामाजिक उत्तरदायित्व और नैतिक आचार पर आधारित था।"',
      },
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Core Tenets and Institutional Pillars of Ashoka’s Dhamma',
      titleHi: 'अशोक के धम्म के मूल सिद्धांत एवं प्रशासनिक स्तंभ',
      columns: [
        {
          titleEn: '1. Ethical Principles of Dhamma',
          titleHi: '1. धम्म के नैतिक सिद्धांत',
          badge: 'Universal Moral Code',
          itemsEn: [
            'Ahimsa: Prohibition of animal slaughter for sacrificial feasts and ban on royal hunting (MRE I)',
            'Paternal Duty: "All men are my children" (Kalinga Separate Edict I)',
            'Religious Harmony (MRE XII): Respect for all sects (Brahmanas, Shramanas, Nirgranthas) without self-praise',
            'Family Ethics: Obedience to parents, elders, teachers; compassionate treatment of slaves and servants',
          ],
          itemsHi: [
            'अहिंसा: धार्मिक यज्ञों में पशुबलि पर पूर्ण प्रतिबंध तथा राजकीय शिकार का त्याग (प्रथम शिलालेख)',
            'पितृतुल्य सम्राट: "सभी मनुष्य मेरी संतान हैं" (पृथक कलिंग शिलालेख प्रथम)',
            'धार्मिक सहिष्णुता (12वां शिलालेख): सभी संप्रदायों (ब्राह्मण, श्रमण, आजीवक) का आदर तथा अपनी प्रशंसा न करना',
            'पारिवारिक नैतिकता: माता-पिता व गुरुजनों की सेवा; दासों व भृत्यों के प्रति मानवीय व्यवहार',
          ],
        },
        {
          titleEn: '2. Institutional Implementation',
          titleHi: '2. धम्म का प्रशासनिक क्रियान्वयन',
          badge: 'Dhammamahamatras',
          itemsEn: [
            'Dhammamahamatras: New cadre of high moral officers instituted in the 14th regnal year (MRE V)',
            'Dharmayatras: Replacing royal pleasure trips (Viharayatras) with imperial inspection tours for public welfare',
            'Public Works (MRE II): Planting banyan shade trees, digging roadside wells, establishing herbal hospitals for humans & animals',
            'Ashoka at Kalsi (Uttarakhand): Inscribed on white quartz boulder overlooking Yamuna & Tons confluence',
          ],
          itemsHi: [
            'धम्म महामात्र: राज्याभिषेक के 14वें वर्ष में नियुक्त उच्च नैतिक अधिकारी (5वां शिलालेख)',
            'धर्मयात्राएं: राजा के आमोद-प्रमोद (विहार यात्राओं) की जगह जनता की समस्याएं सुनने हेतु धर्मयात्राएं',
            'जनकल्याण (द्वितीय शिलालेख): सड़कों पर छायादार वटवृक्ष, सराय, कुएं तथा मनुष्यों व पशुओं हेतु औषधालय',
            'कालसी शिलालेख (उत्तराखंड): देहरादून के निकट यमुना-टोंस संगम पर श्वेत क्वार्टजाइट चट्टान पर उत्कीर्ण 14 शिलालेख',
          ],
        },
        {
          titleEn: '3. Causes of Mauryan Decline',
          titleHi: '3. मौर्य साम्राज्य के पतन के कारण',
          badge: 'Imperial Disintegration (185 BCE)',
          itemsEn: [
            'Extreme centralisation: Depended entirely on the personal competence of the ruling monarch',
            'Financial exhaustion: Vast bureaucracy and army drained treasury (debasing of punch-marked silver coins)',
            'Weak post-Ashoka successors: Partition of the empire (Kunar, Dasharatha, Jalauka)',
            'Pushyamitra Shunga’s coup (185 BCE): Military commander assassinated the last Mauryan king Brihadratha',
          ],
          itemsHi: [
            'अत्यधिक केंद्रीयकरण: शासन की संपूर्ण सफलता राजा की व्यक्तिगत योग्यता पर निर्भर थी',
            'आर्थिक संकट: विशाल सेना व नौकरशाही के भरण-पोषण से राजकोष रिक्त (सिक्कों में तांबे की मिलावट)',
            'अशोक के कमजोर उत्तराधिकारी: कुणाल, दशरथ व जालोक के बीच साम्राज्य का विभाजन',
            'पुष्यमित्र शुंग का तख्तापलट (185 ई.पू.): सेनापति पुष्यमित्र ने अंतिम मौर्य राजा बृहद्रथ की हत्या की',
          ],
        },
      ],
    },
    analyticalPoints: [
      {
        headingEn: 'The Epigraphic Significance of Kalsi Rock Edict in Uttarakhand',
        headingHi: 'उत्तराखंड में स्थित कालसी शिलालेख का ऐतिहासिक एवं पुरातात्विक महत्व',
        detailEn:
          'Located near the confluence of the Yamuna and Tons rivers in Dehradun district, Uttarakhand, the Kalsi Rock Edict is the ONLY complete set of Ashoka’s Fourteen Major Rock Edicts in North India. Inscribed in early Brahmi script in the Prakrit language on a colossal dome-shaped quartz boulder, it contains an engraving of an elephant inscribed with the word "Gajatame" (The Best Elephant, symbolizing the Buddha). It affirms that the Himalayan Garhwal foothills were under direct imperial Mauryan administration.',
        detailHi:
          'उत्तराखंड के देहरादून जिले में यमुना और टोंस नदी के संगम पर स्थित कालसी शिलालेख उत्तर भारत का एकमात्र ऐसा स्थल है जहां अशोक के सभी 14 मुख्य शिलालेख पूर्ण रूप में प्राप्त हुए हैं। यह एक विशाल श्वेत क्वार्टजाइट चट्टान पर ब्राह्मी लिपि और प्राकृत भाषा में उत्कीर्ण है। इसके निचले भाग में एक हाथी का चित्र है जिस पर "गजतमे" (सर्वश्रेष्ठ हाथी - बुद्ध का प्रतीक) लिखा है। यह शिलालेख सिद्ध करता है कि उत्तराखंड का हिमालयी गढ़वाल क्षेत्र मौर्य साम्राज्य का अभिन्न अंग था।',
        bulletsEn: [
          'Unique northern site: The sole Major Rock Edict site situated in northern India outside the North-West.',
          'Welfare directives: Prohibits animal slaughter, mandates medicinal plantations, and teaches non-violence.',
          'Palaeographical benchmark: Discovered by British archaeologist John Forrest in 1860.',
        ],
        bulletsHi: [
          'उत्तर भारत का गौरव: पश्चिमोत्तर सीमा के बाहर उत्तर भारत का एकमात्र संपूर्ण 14 शिलालेख स्थल।',
          'धम्म संदेश: पशुबलि का निषेध, औषधालयों की स्थापना तथा जनता में परस्पर सहिष्णुता का निर्देश।',
          'खोज: 1860 में ब्रिटिश पुरातत्ववेत्ता जॉन फॉरेस्ट द्वारा इस ऐतिहासिक चट्टान की पहचान की गई।',
        ],
        quoteOrArticle: 'Archaeological Survey of India: Monument of National Importance - Kalsi Rock Inscription',
      },
    ],
    valueAddition: {
      thinkersEn: ['Prof. Romila Thapar', 'Dr. D.C. Sircar', 'Vincent Smith', 'Haraprasad Shastri'],
      thinkersHi: ['प्रो. रोमिला थापर', 'डॉ. डी.सी. सरकार', 'विन्सेंट स्मिथ', 'महामहोपाध्याय हरप्रसाद शास्त्री'],
      recommendedBooksEn: ['Asoka and the Decline of the Mauryas by Romila Thapar', 'Inscriptions of Asoka by D.C. Sircar'],
      recommendedBooksHi: ['अशोक और मौर्य साम्राज्य का पतन — रोमिला थापर', 'अशोक के अभिलेख — डी.सी. सरकार'],
      examQuoteEn: '"Amidst the tens of thousands of names of monarchs that crowd the columns of history, the name of Asoka shines, and shines almost alone, a star."',
      examQuoteHi: '"इतिहास के पन्नों पर हजारों राजाओं और सम्राटों के नाम अंकित हैं, परंतु उन सब में अशोक का नाम एक अकेले चमकदार तारे की तरह दैदीप्यमान है।" — एच.जी. वेल्स',
      upscConnectionEn: 'UPSC Mains GS-1: Nature of Ashoka’s Dhamma (buddhism vs civic code); Analysis of the causes of the fall of the Mauryan Empire; Kalsi edict in Uttarakhand PSC.',
      upscConnectionHi: 'यूपीएससी एवं यूकेपीएससी: अशोक के धम्म का वास्तविक स्वरूप; मौर्य साम्राज्य के पतन के कारण; कालसी शिलालेख का उत्तराखंड के संदर्भ में महत्व।',
      topperTipEn: 'Always mention that Dhamma was formulated in Prakrit (the language of the masses) and carved on public highways to maximize civic accessibility.',
      topperTipHi: 'उत्तर में लिखें कि धम्म संस्कृत में नहीं, बल्कि प्राकृत भाषा और ब्राह्मी लिपि में लिखा गया था ताकि जनसामान्य इसे सीधे पढ़कर समझ सके।',
    },
    answerBlueprint: {
      questionTitleEn: 'Critically examine the nature and principles of Ashoka’s Dhamma. What factors contributed to the decline of the Mauryan Empire?',
      questionTitleHi: 'अशोक के धम्म के स्वरूप एवं सिद्धांतों का आलोचनात्मक परीक्षण कीजिए। मौर्य साम्राज्य के पतन के लिए कौन से कारक उत्तरदायी थे? (15 अंक)',
      introductionEn: 'Introduce Emperor Ashoka; recount the transformation post-Kalinga War (261 BCE) from Bherighosha to Dhammaghosha.',
      introductionHi: 'सम्राट अशोक का परिचय दें; 261 ई.पू. के कलिंग युद्ध के पश्चात भेरीघोष से धम्मघोष में आए ऐतिहासिक परिवर्तन की पृष्ठभूमि लिखें।',
      coreHeadingsEn: [
        '1. The Nature of Dhamma: Civic Code of Universal Ethics vs Sectarian Buddhism Debate',
        '2. Cardinal Tenets: Ahimsa (MRE I), Religious Tolerance (MRE XII), Paternal Welfare & Dhammamahamatras',
        '3. Epigraphic Spread: The Major Rock Edicts with Special Focus on Kalsi (Uttarakhand)',
        '4. Multifactorial Decline: Financial Crisis, Extreme Centralization, Weak Successors & Shunga Coup',
      ],
      coreHeadingsHi: [
        '1. धम्म का स्वरूप: संकीर्ण बौद्ध धर्म बनाम सार्वभौमिक नैतिक आचार संहिता का ऐतिहासिक विमर्श',
        '2. प्रमुख सिद्धांत: अहिंसा (प्रथम शिलालेख), सर्वधर्म समभाव (12वां शिलालेख), जनकल्याण व धम्म महामात्र',
        '3. अभिलेखीय साक्ष्य: 14 शिलालेखों का प्रसार एवं उत्तराखंड के कालसी शिलालेख का विशेष महत्व',
        '4. पतन के बहुआयामी कारण: राजकोषीय संकट, अत्यधिक केंद्रीयकरण, अयोग्य उत्तराधिकारी व शुंग तख्तापलट',
      ],
      conclusionEn: 'Conclude with Ashoka’s timeless legacy: the Lion Capital of Sarnath adopted as India’s State Emblem, enshrining the spirit of "Satyameva Jayate".',
      conclusionHi: 'निष्कर्ष में बताएं कि अशोक का सारनाथ सिंह शीर्ष आज स्वतंत्र भारत का राष्ट्रीय प्रतीक है, जो धम्म के अमर नैतिक मूल्यों का उद्घोष करता है।',
    },
    commonMistakes: [
      {
        mistakeEn: 'Equating Ashoka’s Dhamma with personal conversion to Buddhism.',
        mistakeHi: 'अशोक के व्यक्तिगत बौद्ध धर्म और उसके साम्राज्यीय "धम्म" को एक ही मान लेना।',
        correctionEn: 'Clarify that while Ashoka was personally a Buddhist (Upasaka), his imperial Dhamma policy was a non-sectarian universal moral code meant for all citizens.',
        correctionHi: 'स्पष्ट लिखें कि व्यक्तिगत रूप से अशोक बौद्ध था, किंतु उसका राजकीय "धम्म" किसी धर्म का प्रचार नहीं बल्कि सभी नागरिकों हेतु एक नैतिक आचार संहिता थी।',
      },
    ],
    mcqs: [
      {
        questionEn: 'In which Major Rock Edict does Emperor Ashoka express profound grief and remorse over the slaughter of the Kalinga War?',
        questionHi: 'सम्राट अशोक ने किस प्रमुख शिलालेख में कलिंग युद्ध के भारी विनाश एवं रक्तपात पर गहरा शोक व्यक्त किया है?',
        optionsEn: ['Major Rock Edict I', 'Major Rock Edict V', 'Major Rock Edict XIII (13वां शिलालेख)', 'Major Rock Edict XII'],
        optionsHi: ['प्रथम शिलालेख', 'पंचम शिलालेख', '13वां शिलालेख (Rock Edict XIII)', '12वां शिलालेख'],
        correctIndex: 2,
        explanationEn: 'Major Rock Edict XIII details the horrors of the Kalinga War (100,000 slain) and proclaims Ashoka’s replacement of military conquest with Dhamma-conquest.',
        explanationHi: '13वें शिलालेख में कलिंग युद्ध के नरसंहार का वर्णन है और अशोक द्वारा भेरीघोष के स्थान पर धम्मघोष अपनाने की घोषणा है।',
      },
      {
        questionEn: 'The historic Kalsi Rock Edict of Emperor Ashoka, engraved on a white quartz rock, is situated in which district of Uttarakhand?',
        questionHi: 'श्वेत क्वार्टजाइट चट्टान पर उत्कीर्ण सम्राट अशोक का ऐतिहासिक कालसी शिलालेख उत्तराखंड के किस जिले में स्थित है?',
        optionsEn: ['Nainital', 'Haridwar', 'Dehradun (यमुना-टोंस संगम)', 'Chamoli'],
        optionsHi: ['नैनीताल', 'हरिद्वार', 'देहरादून (यमुना-टोंस संगम)', 'चमोली'],
        correctIndex: 2,
        explanationEn: 'The Kalsi Rock Edict is situated in Dehradun district, Uttarakhand, near the confluence of the Yamuna and Tons rivers.',
        explanationHi: 'कालसी शिलालेख उत्तराखंड के देहरादून जिले में चकराता तहसील के अंतर्गत यमुना और टोंस नदी के संगम पर स्थित है।',
      },
      {
        questionEn: 'The last Mauryan ruler, Brihadratha, was assassinated in 185 BCE during a military parade by his commander-in-chief named:',
        questionHi: '185 ई.पू. में अंतिम मौर्य शासक बृहद्रथ की सेना का निरीक्षण करते समय किसने हत्या कर शुंग वंश की नींव रखी?',
        optionsEn: ['Agnimitra', 'Pushyamitra Shunga', 'Vasudeva Kanva', 'Kharavela'],
        optionsHi: ['अग्निमित्र', 'पुष्यमित्र शुंग', 'वासुदेव कण्व', 'खारवेल'],
        correctIndex: 1,
        explanationEn: 'Pushyamitra Shunga, the Brahmana Senapati (Commander-in-Chief), assassinated Brihadratha during an army review, founding the Shunga Dynasty.',
        explanationHi: 'सेनापति पुष्यमित्र शुंग ने 185 ई.पू. में अंतिम मौर्य राजा बृहद्रथ की हत्या कर शुंग वंश की स्थापना की।',
      },
    ],
  },

  // =========================================================================
  // UNIT V: POST-MAURYAN POLITY & CULTURAL HISTORY OF UTTARAKHAND
  // =========================================================================
  {
    id: 'his-5-1',
    topicSequence: 'Topic 5.1',
    lectureNumber: 'Lecture 09',
    titleEn: 'Post-Mauryan Polity & Culture: Shungas, Satavahanas & Kushanas (Kanishka)',
    titleHi: 'मौर्योत्तर काल: शुंग, सातवाहन एवं कुषाण (कनिष्क) कालीन राजनीति, व्यापार एवं गांधार/मथुरा कला',
    subjectCode: 'SDSUV-HIS-101',
    subjectId: 'history',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 5,
    unitTitleEn: 'Unit V: Post-Mauryan Era & Cultural History of Uttarakhand',
    unitTitleHi: 'इकाई V: मौर्योत्तर काल एवं उत्तराखंड का सांस्कृतिक इतिहास',
    readTime: '18 min read',
    highYieldTag: '🔥 15-Mark Core Post-Mauryan Question',
    upscTag: 'UPSC Silk Route & Gandhara Art',
    sdsuvTag: '🔥 Asked 5x in University Exams',
    learnTopicId: 't-his-501',
    youtubeId: 'WMopoZiIg1Q',
    lectureChannel: 'Eklavya स्नातक / StudyIQ IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Post+Mauryan+Kushanas+Kanishka+Satavahanas+StudyIQ',
    conclusionEn: 'The Post-Mauryan era was a dynamic phase of transcontinental commercial globalization along the Silk Route, marked by Indo-Roman maritime trade, the flowering of hybrid Gandhara and indigenous Mathura sculptural arts, and the consolidation of Mahayana Buddhism under Kanishka.',
    conclusionHi: 'मौर्योत्तर काल सिल्क रूट (रेशम मार्ग) एवं हिंद-रोमन समुद्री व्यापार द्वारा संचालित वैश्विक वाणिज्य का स्वर्ण युग था, जिसमें कुषाण सम्राट कनिष्क के संरक्षण में महायान बौद्ध धर्म तथा गांधार एवं मथुरा मूर्तिकला का अद्वितीय विकास हुआ।',
    contextEn: {
      intro:
        'Following the disintegration of the Mauryan Empire (c. 200 BCE – 300 CE), India experienced political decentralization coupled with unprecedented economic prosperity. In the North-West and North, the Indo-Greeks, Shakas, and Kushanas (climaxing under Kanishka) controlled the Central Asian Silk Route, while the Satavahanas ruled the Deccan.',
      scholarDefinition: {
        scholar: 'Prof. Romila Thapar & K.A. Nilakanta Sastri',
        definition:
          '"The Post-Mauryan period was not a dark age of imperial collapse, but a vibrant epoch of urban commercial expansion, artistic synthesis (Gandhara and Mathura), and the opening of India to trans-Eurasian trade networks."',
      },
    },
    contextHi: {
      intro:
        'मौर्य साम्राज्य के पतन के बाद (200 ई.पू. से 300 ईस्वी) भारत में राजनीतिक विकेंद्रीकरण के साथ-साथ अभूतपूर्व व्यापारिक और सांस्कृतिक समृद्धि आई। पश्चिमोत्तर में कुषाणों (विशेषकर कनिष्क) ने मध्य एशियाई सिल्क रूट पर नियंत्रण स्थापित किया, जबकि दक्षिण में सातवाहनों ने समुद्री व्यापार का नेतृत्व किया।',
      scholarDefinition: {
        scholar: 'प्रो. रोमिला थापर एवं के.ए. नीलकंठ शास्त्री',
        definition:
          '"मौर्योत्तर काल साम्राज्य पतन का कोई अंधकार युग नहीं था, बल्कि यह नगरों के विस्तार, गांधार व मथुरा कला के विकास तथा भारत के यूरेशियाई व्यापार से जुड़ने का सर्वाधिक गतिशील युग था।"',
      },
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Tripartite Dynamic of the Post-Mauryan World',
      titleHi: 'मौर्योत्तर काल के तीन प्रमुख राजनीतिक एवं सांस्कृतिक केंद्र',
      columns: [
        {
          titleEn: '1. The Shungas & Kanvas (North)',
          titleHi: '1. शुंग एवं कण्व वंश (उत्तर भारत)',
          badge: 'Brahminical Revival',
          itemsEn: [
            'Pushyamitra Shunga (185 BCE): Revived Vedic sacrifices (Ashvamedha performed by Patanjali)',
            'Artistic patron: Enlargement and stone railing of Bharhut and Sanchi Stupa gateways (Toranas)',
            'Patanjali’s Mahabhashya and formalization of classical Sanskrit grammar',
          ],
          itemsHi: [
            'पुष्यमित्र शुंग (185 ई.पू.): वैदिक धर्म का पुनरुत्थान; पतंजलि के पुरोहितत्व में दो अश्वमेध यज्ञ',
            'कला संरक्षक: भरहुत स्तूप का निर्माण एवं सांची स्तूप के तोरण द्वारों (Toranas) की पाषाण नक्काशी',
            'पतंजलि का महाभाष्य तथा शास्त्रीय संस्कृत व्याकरण एवं मनुस्मृति की रचना',
          ],
        },
        {
          titleEn: '2. The Satavahanas (Deccan)',
          titleHi: '2. सातवाहन वंश (दक्कन/आंध्र)',
          badge: 'Maritime Power & Cave Architecture',
          itemsEn: [
            'Gautamiputra Satakarni (Nasik Prashasti): "Destroyer of Shakas", restored dynastic glory',
            'First royal land grants (Agrahara) with tax immunities to Brahmanas and Buddhist monks',
            'Rock-cut architecture: Magnificent Chaityas and Viharas at Karle, Kanheri, and early Ajanta caves',
          ],
          itemsHi: [
            'गौतमीपुत्र शातकर्णी (नासिक प्रशस्ति): "शकों का संहारक" एवं "एका ब्राह्मण" की उपाधि',
            'सर्वप्रथम भूमि अनुदान (अग्रहार) की शुरुआत: ब्राह्मणों और बौद्ध भिक्षुओं को कर-मुक्त भूमि दान',
            'शैलकृत वास्तुकला: कार्ले का विशाल चैत्य, कान्हेरी एवं प्रारंभिक अजंता गुफाओं का निर्माण',
          ],
        },
        {
          titleEn: '3. The Kushanas & Kanishka',
          titleHi: '3. कुषाण साम्राज्य एवं सम्राट कनिष्क',
          badge: 'Silk Route & Mahayana Climax',
          itemsEn: [
            'Kanishka I (c. 78 CE): Founded Saka Era; ruled vast empire from Purushapura (Peshawar) to Mathura',
            'Silk Route monopoly: Levied profitable tolls on trans-Eurasian trade between Rome and Han China',
            'Fourth Buddhist Council: Held at Kundalavana (Kashmir); formal schism into Hinayana & Mahayana',
            'Gandhara Art (Greco-Roman Buddha) vs Mathura Art (Spotted red sandstone, vigorous native forms)',
          ],
          itemsHi: [
            'कनिष्क प्रथम (78 ईस्वी): शक संवत का प्रवर्तक; पेशावर से मथुरा तक विशाल साम्राज्य',
            'रेशम मार्ग (Silk Route) पर नियंत्रण: रोम और चीन के बीच होने वाले व्यापार से अपार चुंगी वसूली',
            'चतुर्थ बौद्ध संगीति: कुंडलवन (कश्मीर) में वसुमित्र की अध्यक्षता में; हीनयान व महायान में विभाजन',
            'गांधार कला (ग्रीको-रोमन शैली में बुद्ध प्रतिमा) बनाम मथुरा कला (चित्तीदार लाल पत्थर की स्वदेशी कला)',
          ],
        },
      ],
    },
    analyticalPoints: [
      {
        headingEn: 'Gandhara vs Mathura Schools of Art: Synthesis of Greek Realism and Indian Spirituality',
        headingHi: 'गांधार बनाम मथुरा मूर्तिकला शैली: यूनानी यथार्थवाद एवं भारतीय आध्यात्मिकता का संगम',
        detailEn:
          'Under the Kushanas, human representations of the Buddha appeared for the first time. The Gandhara School (North-West) blended Hellenistic Greek sculpting techniques with Buddhist theology: the Buddha was carved in blue-grey schist with wavy Apollo-like hair, realistic anatomical musculature, heavy folded drapery, and a serene countenance. Conversely, the Mathura School (Ganga-Yamuna doab) utilized local spotted red sandstone, creating a robust, fleshy, masculine Buddha with shaved head, smiling face, transparent drapery adhering to the body, and open eyes radiating inner spiritual energy.',
        detailHi:
          'कुषाण काल में सर्वप्रथम बुद्ध की मानवरूपी मूर्तियों का निर्माण हुआ। गांधार शैली (पश्चिमोत्तर) में यूनानी-रोमन तकनीक और बौद्ध धर्म का सम्मिश्रण था: नीले-धूसर शिस्ट पत्थर पर अपोलो देवता जैसे घुंघराले बाल, यथार्थवादी शारीरिक मांसपेशियां और रोमन टोगा जैसी भारी सिलवटदार चादर उकेरी गई। इसके विपरीत मथुरा शैली में स्थानीय चित्तीदार लाल बलुआ पत्थर का प्रयोग हुआ, जहां बुद्ध को मुंडित सिर, प्रसन्नमुख, पारदर्शी वस्त्रों तथा भारतीय आध्यात्मिकता से परिपूर्ण एक बलिष्ठ व ऊर्जावान रूप में दर्शाया गया।',
        bulletsEn: [
          'Material distinction: Grey-blue schist/stucco (Gandhara) vs Mottled red sandstone of Sikri (Mathura).',
          'Stylistic influence: Greco-Roman realism (Gandhara) vs Indigenous yaksha-inspired Indian iconography (Mathura).',
          'Secular art: Mathura also created the famous headless statue of Emperor Kanishka dressed in heavy boots and coat.',
        ],
        bulletsHi: [
          'पत्थर का अंतर: गांधार में स्लेटी/धूसर शिस्ट व स्टुको बनाम मथुरा में सीकरी का चित्तीदार लाल बलुआ पत्थर।',
          'शैलीगत प्रभाव: यूनानी यथार्थवाद (गांधार) बनाम प्राचीन भारतीय यक्ष परंपरा से प्रेरित रूप (मथुरा)।',
          'धर्मनिरपेक्ष कला: मथुरा से कनिष्क की प्रसिद्ध सिर-विहीन मूर्ति मिली है जिसमें वे सैनिक जूते व कोट पहने हैं।',
        ],
        quoteOrArticle: 'Art History Benchmark: Emergence of the Anthropomorphic Buddha in Kushana Era',
      },
    ],
    valueAddition: {
      thinkersEn: ['Kanishka I', 'Patanjali', 'Gautamiputra Satakarni', 'Ashvaghosha', 'Nagarjuna'],
      thinkersHi: ['कनिष्क प्रथम', 'पतंजलि', 'गौतमीपुत्र शातकर्णी', 'अश्वघोष', 'नागार्जुन'],
      recommendedBooksEn: ['The Kushan Empire by B.N. Mukherjee', 'History and Culture of the Indian People: The Age of Imperial Unity by R.C. Majumdar'],
      recommendedBooksHi: ['कुषाण साम्राज्य — बी.एन. मुखर्जी', 'प्राचीन भारत — उपिंदर सिंह'],
      examQuoteEn: '"Kanishka’s empire was the vital crossroads where Indian philosophy, Greek aesthetics, Roman gold, and Chinese silk converged into an extraordinary cosmopolitan civilization."',
      examQuoteHi: '"कनिष्क का साम्राज्य वह ऐतिहासिक चौराहा था जहां भारतीय दर्शन, यूनानी मूर्तिकला, रोमन स्वर्ण और चीनी रेशम मिलकर एक विश्व-नागरिक सभ्यता में रूपांतरित हो गए।"',
      upscConnectionEn: 'UPSC Mains GS-1: Comparison of Gandhara, Mathura, and Amaravati schools of art; Commercial importance of the Silk Route in ancient India.',
      upscConnectionHi: 'यूपीएससी एवं राज्य पीसीएस: गांधार एवं मथुरा कला शैली की तुलना; कनिष्क की उपलब्धियां; सातवाहन कालीन व्यापार एवं गुफा स्थापत्य।',
      topperTipEn: 'Draw a comparative table contrasting Gandhara vs Mathura art across: Medium, Origin/Influence, Buddha’s Features, and Geographical Centers.',
      topperTipHi: 'उत्तर में गांधार और मथुरा कला की तुलनात्मक तालिका बनाएं (माध्यम, प्रभाव, बुद्ध की विशेषताएं व भौगोलिक केंद्र)।',
    },
    answerBlueprint: {
      questionTitleEn: 'Discuss the political and cultural achievements of the Kushanas with special reference to Kanishka. Compare the Gandhara and Mathura schools of art.',
      questionTitleHi: 'कनिष्क के विशेष संदर्भ में कुषाणों की राजनीतिक एवं सांस्कृतिक उपलब्धियों की विवेचना कीजिए। गांधार एवं मथुरा मूर्तिकला शैलियों की तुलना कीजिए। (15 अंक)',
      introductionEn: 'Introduce the Post-Mauryan era; trace the migration of the Yuezhi/Kushanas into India and Kanishka’s accession in 78 CE (Saka Era).',
      introductionHi: 'मौर्योत्तर काल की पृष्ठभूमि लिखें; यूएची जाति के कुषाणों के भारत आगमन तथा 78 ईस्वी में कनिष्क के राज्यारोहण (शक संवत) का परिचय दें।',
      coreHeadingsEn: [
        '1. Political Horizons & Silk Route Monopoly under Kanishka I',
        '2. Religious Patronage: The Fourth Buddhist Council (Kashmir) and the Rise of Mahayana',
        '3. Literary Luminaries of Kanishka’s Court: Ashvaghosha (Buddhacharita), Charaka & Nagarjuna',
        '4. Comparative Analysis: Gandhara Greco-Buddhist Art vs Mathura Indigenous School',
      ],
      coreHeadingsHi: [
        '1. कनिष्क का राजनीतिक विस्तार एवं प्राचीन रेशम मार्ग (Silk Route) पर कुषाण एकाधिकार',
        '2. धार्मिक नीति: कश्मीर में चतुर्थ बौद्ध संगीति का आयोजन एवं महायान संप्रदाय का उदय',
        '3. कनिष्क के नवरत्न: अश्वघोष (बुद्धचरित), चरक (चरक संहिता) एवं नागार्जुन (माध्यमिक सूत्र)',
        '4. मूर्तिकला का चरमोत्कर्ष: गांधार ग्रीको-बौद्ध शैली बनाम मथुरा स्वदेशी कला शैली की विस्तृत तुलना',
      ],
      conclusionEn: 'Conclude with how the Kushanas served as the cultural bridge carrying Mahayana Buddhism and Indian artistic traditions across Central Asia into China.',
      conclusionHi: 'निष्कर्ष में बताएं कि कुषाण साम्राज्य वह सेतु बना जिसने बौद्ध धर्म और भारतीय संस्कृति को मध्य एशिया होते हुए चीन और सुदूर पूर्व तक पहुंचाया।',
    },
    commonMistakes: [
      {
        mistakeEn: 'Believing Gandhara art used red sandstone.',
        mistakeHi: 'यह लिखना कि गांधार कला में लाल बलुआ पत्थर का प्रयोग हुआ था।',
        correctionEn: 'Clarify that Gandhara used grey/blue schist and stucco, while Mathura used spotted red sandstone.',
        correctionHi: 'स्पष्ट लिखें कि गांधार शैली में स्लेटी/नीले शिस्ट पत्थर का प्रयोग हुआ, जबकि लाल चित्तीदार पत्थर मथुरा शैली की पहचान है।',
      },
    ],
    mcqs: [
      {
        questionEn: 'The Saka Era, which is adopted as the basis of the National Calendar of India, was instituted in 78 CE by which Kushana emperor?',
        questionHi: 'भारत के राष्ट्रीय पंचांग का आधार "शक संवत" 78 ईस्वी में किस कुषाण सम्राट द्वारा प्रारंभ किया गया था?',
        optionsEn: ['Kujula Kadphises', 'Vima Kadphises', 'Kanishka I (कनिष्क प्रथम)', 'Huvishka'],
        optionsHi: ['कुजुल कडफिसस', 'विम कडफिसस', 'कनिष्क प्रथम', 'हुविष्क'],
        correctIndex: 2,
        explanationEn: 'Emperor Kanishka I founded the Saka Era in 78 CE upon his accession, which is India’s official civil calendar today.',
        explanationHi: 'कनिष्क प्रथम ने 78 ईस्वी में अपने राज्यारोहण के उपलक्ष्य में शक संवत की शुरुआत की थी।',
      },
      {
        questionEn: 'Which Buddhist council was convened in Kashmir under the patronage of Kanishka, resulting in the formal division into Hinayana and Mahayana?',
        questionHi: 'कनिष्क के संरक्षण में कश्मीर के कुंडलवन में कौन सी बौद्ध संगीति आयोजित हुई थी जिसमें बौद्ध धर्म हीनयान व महायान में विभाजित हुआ?',
        optionsEn: ['First Council', 'Second Council', 'Third Council', 'Fourth Council (चतुर्थ संगीति)'],
        optionsHi: ['प्रथम संगीति', 'द्वितीय संगीति', 'तृतीय संगीति', 'चतुर्थ संगीति'],
        correctIndex: 3,
        explanationEn: 'The Fourth Buddhist Council was held at Kundalavana in Kashmir, presided over by Vasumitra with Ashvaghosha as vice-president.',
        explanationHi: 'चतुर्थ बौद्ध संगीति कश्मीर में वसुमित्र की अध्यक्षता और अश्वघोष के उपाध्यक्षत्व में संपन्न हुई।',
      },
      {
        questionEn: 'The first historical evidence of royal land grants (Agrahara) with tax immunities to religious beneficiaries in India was issued by which dynasty?',
        questionHi: 'भारत में ब्राह्मणों एवं बौद्ध भिक्षुओं को कर-मुक्त भूमि अनुदान (अग्रहार) देने के प्राचीनतम अभिलेखीय साक्ष्य किस वंश के हैं?',
        optionsEn: ['Mauryas', 'Satavahanas (सातवाहन)', 'Kushanas', 'Guptas'],
        optionsHi: ['मौर्य वंश', 'सातवाहन वंश', 'कुषाण वंश', 'गुप्त वंश'],
        correctIndex: 1,
        explanationEn: 'The Satavahanas (in inscriptions such as the Nanaghat inscription of Nayanika) were the first to make tax-exempt land grants to religious persons.',
        explanationHi: 'नानाघाट अभिलेख के अनुसार सातवाहन शासकों ने सर्वप्रथम ब्राह्मणों और भिक्षुओं को कर-मुक्त भूमि दान देने की प्रथा शुरू की थी।',
      },
    ],
  },

  // 5.2 Sangam Age & Uttarakhand
  {
    id: 'his-5-2',
    topicSequence: 'Topic 5.2',
    lectureNumber: 'Lecture 10',
    titleEn: 'Sangam Age Literature & Cultural History of Uttarakhand (Kunindas, Katyuris, Tribes & Architecture)',
    titleHi: 'संगम साहित्य एवं उत्तराखंड का सांस्कृतिक इतिहास: कुणिंद, कत्यूरी राजवंश, प्रमुख जनजातियां व मंदिर स्थापत्य',
    subjectCode: 'SDSUV-HIS-101',
    subjectId: 'history',
    subjectNameEn: 'Ancient Indian History',
    subjectNameHi: 'प्राचीन भारतीय इतिहास',
    semester: 1,
    unitNumber: 5,
    unitTitleEn: 'Unit V: Post-Mauryan Era & Cultural History of Uttarakhand',
    unitTitleHi: 'इकाई V: मौर्योत्तर काल एवं उत्तराखंड का सांस्कृतिक इतिहास',
    readTime: '19 min read',
    highYieldTag: '🔥 SDSUV Special Uttarakhand Core Question',
    upscTag: 'UPSC Sangam Literature & Regional History',
    sdsuvTag: '🔥 Compulsory for SDSUV Uttarakhand Syllabus',
    learnTopicId: 't-his-502',
    youtubeId: 'M1nVM6fNxto',
    lectureChannel: 'UGC NET Adda247 / Drishti IAS',
    searchFallback: 'https://www.youtube.com/results?search_query=Cultural+History+of+Uttarakhand+Kunindas+Katyuris+Drishti+IAS',
    conclusionEn: 'The cultural panorama of ancient India is completed by the Tamil Sangam literary zenith (Tolkkappiyam, Silappadikaram) in the deep South, and the resilient Himalayan state formations of Uttarakhand—from the numismatically proven Kuninda republic of Amoghbhuti to the monumental stone temple architectural legacy of the Katyuris at Jageshwar, Baijnath, and Kedarnath.',
    conclusionHi: 'प्राचीन भारत का इतिहास दक्षिण में तमिल संगम साहित्य के काव्य सौंदर्य और उत्तर में उत्तराखंड के कुणिंद (अमोघभूति) सिक्कों, कत्यूरी राजवंश तथा जागेश्वर, बैजनाथ व केदारनाथ के भव्य नागर-कत्यूरी मंदिर स्थापत्य के समृद्ध समन्वय से ही पूर्णता प्राप्त करता है।',
    contextEn: {
      intro:
        'This concluding section synthesizes two critical frontiers: (1) South India’s Sangam Age (c. 300 BCE – 300 CE) documented in Tamil anthologies (Ettuttokai, Pattuppattu) under Chera, Chola, and Pandya patronages, and (2) The specialized regional history of Uttarakhand, exploring the indigenous Kuninda dynasty (2nd century BCE), the imperial Katyuri builders of Kumaon and Garhwal, aboriginal tribes (Khasas, Bhotiyas, Tharus), and sacred Himalayan temple architecture.',
      scholarDefinition: {
        scholar: 'Prof. K.A. Nilakanta Sastri & Prof. K.P. Nautiyal',
        definition:
          '"Ancient Indian civilization was truly trans-subcontinental: while the Sangam corpus celebrates South Indian heroic valor and maritime trade, the Himalayan shrines of Uttarakhand testify to an enduring synthesis of indigenous tribal folkways with classical pan-Indian architectural mastery."',
      },
    },
    contextHi: {
      intro:
        'यह अध्याय दो विशिष्ट ऐतिहासिक धाराओं का संगम है: (1) सुदूर दक्षिण का संगम काल (300 ई.पू. - 300 ईस्वी) जो चोल, चेर और पांड्य राजाओं के संरक्षण में तमिल साहित्य (तोलकाप्पियम, शिलप्पादिकारम) द्वारा अमर हुआ, तथा (2) उत्तराखंड का गौरवशाली सांस्कृतिक इतिहास, जिसमें प्रथम राजनीतिक शक्ति कुणिंद राजवंश (अमोघभूति), कत्यूरी साम्राज्य, जनजातीय परंपराएं (खास, भोटिया) एवं जागेश्वर-बैजनाथ का मंदिर स्थापत्य सम्मिलित हैं।',
      scholarDefinition: {
        scholar: 'प्रो. के.ए. नीलकंठ शास्त्री एवं प्रो. के.पी. नौटियाल',
        definition:
          '"प्राचीन भारत की सांस्कृतिक विविधता अद्वितीय थी: जहां दक्षिण में संगम साहित्य वीरता और समुद्री व्यापार का गान करता है, वहीं उत्तराखंड के हिमालयी मंदिर स्थानीय जनजातीय आस्था और शास्त्रीय भारतीय स्थापत्य के अमर संगम का प्रतीक हैं।"',
      },
    },
    flowchart: {
      diagramType: 'classification',
      titleEn: 'Dual Regional Horizons: Sangam Literature & Uttarakhand History',
      titleHi: 'द्वैध क्षेत्रीय क्षितिज: संगम साहित्य एवं उत्तराखंड का सांस्कृतिक इतिहास',
      columns: [
        {
          titleEn: '1. Sangam Literature & Polity',
          titleHi: '1. संगम साहित्य एवं तमिल राजव्यवस्था',
          badge: 'Three Tamil Academies (Madurai)',
          itemsEn: [
            'Three Dynasties: Cheras (Bow emblem), Cholas (Tiger emblem), Pandyas (Carp/Fish emblem)',
            'Tolkkappiyam: Earliest Tamil grammar and social psychology work by Tolkkappiyar',
            'Twin Epics: Silappadikaram (by Ilango Adigal, story of Kovalan and Kannagi) & Manimekalai',
            'Tinai Concept: 5 ecological-cultural landscapes (Kurinji, Mullai, Marudam, Neydal, Palai)',
          ],
          itemsHi: [
            'तीन प्रमुख राजवंश: चेर (धनुष प्रतीक), चोल (बाघ प्रतीक), पांड्य (मछली प्रतीक)',
            'तोलकाप्पियम: तोलकाप्पियर द्वारा रचित प्राचीनतम तमिल व्याकरण एवं समाजशास्त्र ग्रंथ',
            'महाकाव्य: शिलप्पादिकारम (इलांगो आदिगल कृत कोवलन-कण्णगि की कथा) एवं मणिमेखलै',
            'तिणै (Tinai) संकल्पना: 5 पारिस्थितिक भू-दृश्य (कुरिंजी - पहाड़, मुल्लई - वन, मरुदम - कृषि, नेयदल - तट, पालई - मरुस्थल)',
          ],
        },
        {
          titleEn: '2. Ancient Dynasties of Uttarakhand',
          titleHi: '2. उत्तराखंड के प्राचीन राजवंश',
          badge: 'Kunindas to Katyuris',
          itemsEn: [
            'Kuninda Dynasty (2nd century BCE - 3rd century CE): First political power of Uttarakhand',
            'Maharaja Amoghbhuti: Greatest ruler; issued bilingual silver/copper coins (Brahmi & Kharosthi) with deer and Lakshmi',
            'Yaudheyas & Pauravas: Ruled western Garhwal; copper plates found at Taleshwar (Almora)',
            'Katyuri Dynasty (8th-11th Century CE): First historical empire of Uttarakhand; capital at Joshimath, later Baijnath (Kartikeyapura)',
          ],
          itemsHi: [
            'कुणिंद राजवंश (2री सदी ई.पू. - 3री सदी ईस्वी): उत्तराखंड की प्रथम ऐतिहासिक राजनीतिक शक्ति',
            'महाराजा अमोघभूति: सर्वाधिक प्रतापी शासक; ब्राह्मी व खरोष्ठी लिपि में द्विभाषी चांदी व तांबे के सिक्के (हिरण व लक्ष्मी का अंकन)',
            'यौधेय एवं पौरव वंश: तालेश्वर ताम्रपत्र (अल्मोड़ा) से पौरव राजाओं (विष्णुवर्मन, वृषवर्मन) का विवरण',
            'कत्यूरी राजवंश (8वीं से 11वीं सदी): उत्तराखंड का प्रथम ऐतिहासिक साम्राज्य; राजधानी जोशीमठ से बैजनाथ (कार्तिकेयपुर)',
          ],
        },
        {
          titleEn: '3. Tribes & Temple Architecture',
          titleHi: '3. जनजातियां एवं मंदिर स्थापत्य',
          badge: 'Himalayan Heritage',
          itemsEn: [
            'Indigenous Tribes: Khasas (dominant agrarian warrior class), Bhotiyas (trans-Himalayan Tibetan traders), Tharus & Buksas',
            'Katyuri Temple Architecture: Distinctive Nagara-Katyuri style with wooden pagoda roofs and curvilinear stone shikharas',
            'Jageshwar Temple Complex (Almora): Cluster of 124 stone temples dedicated to Shiva (Jyotirlinga tradition)',
            'Baijnath (Bageshwar), Kedarnath & Tungnath: High-altitude stone engineering surviving seismic shocks',
          ],
          itemsHi: [
            'प्रमुख जनजातियां: खस (प्राचीनतम योद्धा-कृषक जाति), भोटिया (तिब्बत से व्यापार करने वाले शौका), थारू एवं बोक्सा',
            'कत्यूरी मंदिर स्थापत्य: नागर-कत्यूरी शैली; पत्थरों के भारी ब्लॉकों की बिना चूने की इंटरलॉकिंग चिनाई एवं काष्ठ छत',
            'जागेश्वर मंदिर समूह (अल्मोड़ा): देवदार के वनों में 124 पत्थरों के मंदिरों का समूह (महामृत्युंजय व जागनाथ)',
            'बैजनाथ (बागेश्वर), केदारनाथ एवं तुंगनाथ: भूकंपरोधी प्रस्तर तकनीक से निर्मित विश्वप्रसिद्ध हिमालयी देवालय',
          ],
        },
      ],
    },
    analyticalPoints: [
      {
        headingEn: 'The Kuninda Coinage of Amoghbhuti: Numismatic Anchor of Uttarakhand History',
        headingHi: 'अमोघभूति के कुणिंद कालीन सिक्के: उत्तराखंड इतिहास की मुद्राशास्त्रीय आधारशिला',
        detailEn:
          'Before the discovery of coins, the early history of Uttarakhand was shrouded in mythology. The bilingual silver and copper coins of King Amoghbhuti (circa 1st century BCE) discovered across Garhwal, Kumaon, and Saharanpur firmly anchored Uttarakhand into historical reality. The obverse bears a deer on the right and Goddess Lakshmi holding a lotus on the left with the Brahmi legend: "Rajnah Kunindasya Amoghbhutisya Maharajasya". The reverse depicts a multi-arched Chaitya hill, a tree in railing, and a swastika inscribed in Kharosthi script, proving an active trade corridor between the Himalayas and the plains.',
        detailHi:
          'सिक्कों की खोज से पूर्व उत्तराखंड का प्राचीन इतिहास केवल पौराणिक अनुश्रुतियों में सीमित था। प्रथम शताब्दी ई.पू. के कुणिंद राजा अमोघभूति के चांदी और तांबे के सिक्कों ने उत्तराखंड को ठोस ऐतिहासिक धरातल प्रदान किया। सिक्के के मुख्य भाग पर दाईं ओर एक हिरण तथा बाईं ओर कमल लिए देवी लक्ष्मी का चित्र है, जिस पर ब्राह्मी लिपि में लिखा है: "राज्ञः कुणिंदस्य अमोघभूतिस्य महाराजस्य"। पिछले भाग पर खरोष्ठी लिपि में वही लेख तथा पर्वत (चैत्य), रेलिंग युक्त वृक्ष और स्वास्तिक का अंकन है। यह सिक्के हिमालय और गंगा के मैदानों के बीच सक्रिय व्यापार को प्रमाणित करते हैं।',
        bulletsEn: [
          'Bilingual & Biscriptural: Brahmi script (indigenous) and Kharosthi (North-Western trade link).',
          'Metrological weight: Silver coins weighed ~31 grains (standardized to Indo-Greek hemidrachm weights).',
          'Geographical reach: Found from Beas river in Himachal across Garhwal and Kumaon down to Roorkee.',
        ],
        bulletsHi: [
          'द्विभाषी एवं द्विलिपि: ब्राह्मी लिपि (राष्ट्रीय) एवं खरोष्ठी लिपि (पश्चिमोत्तर व्यापारिक संबंध)।',
          'मानकीकृत भार: चांदी के सिक्कों का वजन लगभग 31 ग्रेन (हिंद-यवन हेमीड्रेक्म माप के अनुरूप)।',
          'व्यापक विस्तार: हिमाचल की व्यास नदी से लेकर गढ़वाल, कुमाऊं और सहारनपुर-रुड़की तक प्राप्ति।',
        ],
        quoteOrArticle: 'Numismatic Corpus: Allan’s Catalogue of Indian Coins (Kuninda Series)',
      },
      {
        headingEn: 'Katyuri Temple Architecture: The Stone Symphony of Jageshwar and Baijnath',
        headingHi: 'कत्यूरी मंदिर स्थापत्य: जागेश्वर एवं बैजनाथ का प्रस्तर महाकाव्य',
        detailEn:
          'Under the Katyuri kings (Vasudeva, Lalitsura Deva, Bhudev), temple building reached its aesthetic summit in Kumaon and Garhwal during the 8th to 11th centuries. Katyuri architects adapted the North Indian Nagara style into a distinctive mountain vernacular: massive cut granite stones were dry-masoned using iron clamps without mortar to withstand Himalayan earthquakes. The sanctum (Garbhagriha) is surmounted by a curvilinear Latina shikhara topped by an Amalaka and Kalasha, often sheltered by a sloping timber umbrella (Chhatri) against heavy snow, as seen at Jageshwar (cluster of 124 shrines) and Baijnath on the Gomti river.',
        detailHi:
          '8वीं से 11वीं शताब्दी में कत्यूरी राजाओं (वासुदेव, ललितशूर देव, भूदेव) के शासनकाल में उत्तराखंड का मंदिर स्थापत्य अपने चरमोत्कर्ष पर पहुंचा। कत्यूरी शिल्पियों ने नागर शैली को हिमालय की जलवायु के अनुकूल ढाला: भूकंप से सुरक्षा हेतु बिना गारे के केवल लोहे के क्लैंप (Interlocking) द्वारा विशाल ग्रेनाइट पत्थरों को जोड़ा गया। गर्भगृह के ऊपर वक्राकार रेखा-प्रसाद शिखर, उसके ऊपर आमलक व कलश, तथा भारी बर्फबारी से बचाव हेतु लकड़ी की ढलवां छतरी (पैगोडा छत) लगाई गई। अल्मोड़ा का जागेश्वर मंदिर समूह (124 मंदिरों की श्रृंखला) तथा बागेश्वर का बैजनाथ मंदिर इसका उत्कृष्ट उदाहरण हैं।',
        bulletsEn: [
          'Seismic resilience: Dry ashlar interlocking masonry using iron dowels allowed dissipation of earthquake shocks.',
          'Stylistic features: Triratha and Pancharatha sanctum plans with intricate carvings of Ganesha, Mahishasuramardini, and Nataraja.',
          'Adi Shankaracharya’s circuit: Revival of Kedarnath and Badrinath unified Himalayan shrines into the pan-Indian Sanatana fold.',
        ],
        bulletsHi: [
          'भूकंपरोधी प्रस्तर तकनीक: लोहे के कुंदों (Dowels) से जुड़े पत्थरों के कारण ये मंदिर भीषण भूकंपों में भी सुरक्षित रहे।',
          'शिल्पगत विशेषताएं: त्रिरथ व पंचरथ तल-योजना जिस पर महिषासुरमर्दिनी, गणेश एवं नटराज की सुंदर मूर्तियां उत्कीर्ण हैं।',
          'आदि शंकराचार्य का योगदान: 8वीं सदी में केदारनाथ व बद्रीनाथ का पुनरुद्धार कर हिमालय को संपूर्ण भारत की आध्यात्मिक चेतना से जोड़ा।',
        ],
        quoteOrArticle: 'Architectural Tradition: Himalayan Katyuri-Nagara Phamsana Style',
      },
    ],
    valueAddition: {
      thinkersEn: ['King Amoghbhuti', 'Ilango Adigal', 'Prof. K.P. Nautiyal', 'Dr. Shiv Prasad Dabral', 'Prof. K.A. Nilakanta Sastri'],
      thinkersHi: ['राजा अमोघभूति', 'इलांगो आदिगल', 'प्रो. के.पी. नौटियाल', 'डॉ. शिव प्रसाद डबराल (चारण)', 'प्रो. के.ए. नीलकंठ शास्त्री'],
      recommendedBooksEn: ['The Archaeology of Kumaon by K.P. Nautiyal', 'A History of South India by K.A. Nilakanta Sastri', 'History of Garhwal by H.G. Walton'],
      recommendedBooksHi: ['उत्तराखंड का इतिहास (12 भाग) — डॉ. शिव प्रसाद डबराल', 'कुमाऊं का इतिहास — पं. बद्री दत्त पांडे', 'गढ़वाल का इतिहास — पं. हरिकृष्ण रतूड़ी'],
      examQuoteEn: '"From the Sangam maritime lyrics on the shores of Puhar to the sacred stone chants echoing across Jageshwar’s deodar valleys, ancient India breathed as one cultural soul."',
      examQuoteHi: '"कावेरीपट्टनम के तटों पर गूंजते संगम गीतों से लेकर जागेश्वर के देवदार वनों में गूंजते कत्यूरी प्रस्तर मंत्रों तक, प्राचीन भारत एक ही सांस्कृतिक चेतना में स्पंदित होता रहा।"',
      upscConnectionEn: 'UPSC Mains GS-1: Sangam literature social reflections; In SDSUV & UKPSC exams: Kuninda coinage of Amoghbhuti and Katyuri temple architecture at Jageshwar/Baijnath.',
      upscConnectionHi: 'यूकेपीएससी एवं एसडीएसयूवी विशेष: कुणिंद शासक अमोघभूति के सिक्कों की विशेषताएं; कत्यूरी कालीन मंदिर स्थापत्य; जागेश्वर मंदिर समूह का ऐतिहासिक महत्व।',
      topperTipEn: 'In SDSUV exams, explicitly mention the coin legend of Amoghbhuti in Brahmi ("Rajnah Kunindasya Amoghbhutisya Maharajasya") and describe the 124 temples of Jageshwar to secure top marks in Uttarakhand history.',
      topperTipHi: 'उत्तराखंड के प्रश्नों में अमोघभूति के सिक्के पर अंकित ब्राह्मी लेख ("राज्ञः कुणिंदस्य अमोघभूतिस्य महाराजस्य") तथा जागेश्वर के 124 मंदिरों के समूह का उल्लेख अवश्य करें।',
    },
    answerBlueprint: {
      questionTitleEn: 'Write a comprehensive essay on the cultural history of Uttarakhand with special reference to the Kuninda dynasty, the Katyuri rulers, and their temple architecture.',
      questionTitleHi: 'कुणिंद राजवंश, कत्यूरी शासकों एवं उनके मंदिर स्थापत्य के विशेष संदर्भ में उत्तराखंड के सांस्कृतिक इतिहास पर एक विस्तृत निबंध लिखिए। (15 अंक)',
      introductionEn: 'Introduce Uttarakhand as Kedarkhand and Kurmanchal; explain the advent of historical dynasties following the Ashokan Kalsi edict.',
      introductionHi: 'केदारखंड और मानसखंड (कूर्मांचल) के रूप में उत्तराखंड की ऐतिहासिक पृष्ठभूमि लिखें; कालसी शिलालेख के बाद स्थानीय राजवंशों के उदय का परिचय दें।',
      coreHeadingsEn: [
        '1. The Kuninda Dynasty: Political Hegemony, Coinage of Amoghbhuti and Himalayan Trade',
        '2. The Katyuri Dynasty: First Imperial Unification of Kumaon and Garhwal (Joshimath to Baijnath)',
        '3. Indigenous Tribes of Uttarakhand: The Khasas, Bhotiyas (Shauka Trans-Himalayan Trade) & Tharus',
        '4. Katyuri Temple Architecture: Jageshwar Cluster, Baijnath, Earthquake-Resistant Stone Techniques & Adi Shankara',
      ],
      coreHeadingsHi: [
        '1. कुणिंद राजवंश: उत्तराखंड की प्रथम राजनीतिक शक्ति, अमोघभूति के द्विभाषी सिक्के एवं व्यापार',
        '2. कत्यूरी राजवंश: कुमाऊं और गढ़वाल का प्रथम ऐतिहासिक राजनीतिक एकीकरण (जोशीमठ से बैजनाथ)',
        '3. उत्तराखंड की प्रमुख जनजातियां: खस, भोटिया (शौका तिब्बत व्यापारिक परंपरा), थारू एवं जौनसारी',
        '4. कत्यूरी मंदिर स्थापत्य: जागेश्वर धाम (124 मंदिर), बैजनाथ, भूकंपरोधी प्रस्तर तकनीक एवं आदि शंकराचार्य का योगदान',
      ],
      conclusionEn: 'Conclude with how Uttarakhand’s ancient temple architecture and tribal cultural heritage continue to form the living spiritual bedrock of Devbhoomi.',
      conclusionHi: 'निष्कर्ष में बताएं कि प्राचीन कुणिंद और कत्यूरी विरासत आज भी "देवभूमि" उत्तराखंड की सांस्कृतिक और आध्यात्मिक पहचान का गौरवशाली आधार है।',
    },
    commonMistakes: [
      {
        mistakeEn: 'Confusing the Katyuris with the Chand or Panwar dynasties.',
        mistakeHi: 'कत्यूरी राजवंश को परवर्ती चंद (कुमाऊं) या पंवार/परमार (गढ़वाल) वंश के साथ मिला देना।',
        correctionEn: 'Clarify that the Katyuris (8th-11th century CE) were the ancient unifiers who preceded the medieval Chand rulers of Almora and Panwars of Srinagar Garhwal.',
        correctionHi: 'स्पष्ट लिखें कि कत्यूरी राजवंश 8वीं से 11वीं सदी का प्राचीन साम्राज्य था, जिसके पतन के बाद मध्यकाल में कुमाऊं में चंद और गढ़वाल में पंवार वंश का उदय हुआ।',
      },
    ],
    mcqs: [
      {
        questionEn: 'Which legendary Kuninda monarch issued bilingual silver and copper coins bearing the Brahmi legend "Rajnah Kunindasya Amoghbhutisya Maharajasya"?',
        questionHi: 'किस प्रसिद्ध कुणिंद शासक ने "राज्ञः कुणिंदस्य अमोघभूतिस्य महाराजस्य" ब्राह्मी लेख वाले द्विभाषी चांदी व तांबे के सिक्के जारी किए थे?',
        optionsEn: ['Basudev', 'Amoghbhuti (अमोघभूति)', 'Lalitsura Deva', 'Salonavaditya'],
        optionsHi: ['वासुदेव', 'अमोघभूति', 'ललितशूर देव', 'सलोणादित्य'],
        correctIndex: 1,
        explanationEn: 'Maharaja Amoghbhuti was the most illustrious Kuninda king whose coins represent the earliest definitive historical currency of Uttarakhand.',
        explanationHi: 'महाराजा अमोघभूति कुणिंद वंश का सबसे प्रतापी शासक था जिसके सिक्के उत्तराखंड के प्राचीन इतिहास का सबसे ठोस प्रमाण हैं।',
      },
      {
        questionEn: 'The historic Jageshwar temple complex in Almora district, renowned for 124 stone temples of the Katyuri era, is dedicated primarily to which deity?',
        questionHi: 'अल्मोड़ा जिले में स्थित कत्यूरी कालीन 124 पत्थरों के मंदिरों वाला प्रसिद्ध जागेश्वर मंदिर समूह मुख्यतः किस देवता को समर्पित है?',
        optionsEn: ['Lord Vishnu', 'Lord Shiva (Jyotirlinga tradition)', 'Surya (Sun God)', 'Goddess Durga'],
        optionsHi: ['भगवान विष्णु', 'भगवान शिव (महामृत्युंजय / जागनाथ)', 'सूर्य देव', 'मां दुर्गा'],
        correctIndex: 1,
        explanationEn: 'Jageshwar Dham is a sacred Shaivite pilgrimage site comprising 124 stone temples dedicated to Lord Shiva (Maha Mrityunjaya and Jagnath).',
        explanationHi: 'जागेश्वर धाम भगवान शिव को समर्पित 124 मंदिरों का ऐतिहासिक समूह है, जिसे प्राचीन 8वां ज्योतिर्लिंग भी माना जाता है।',
      },
      {
        questionEn: 'The famous Tamil epic "Silappadikaram", which narrates the tragic story of Kovalan and Kannagi’s anklet, was authored by:',
        questionHi: 'कोवलन एवं कण्णगि की नूपुर कथा पर आधारित प्रसिद्ध तमिल संगम महाकाव्य "शिलप्पादिकारम" के रचयिता कौन थे?',
        optionsEn: ['Tiruvalluvar', 'Ilango Adigal (इलांगो आदिगल)', 'Sittalai Sattanar', 'Tolkkappiyar'],
        optionsHi: ['तिरुवल्लुवर', 'इलांगो आदिगल', 'सीतलै सात्तनार', 'तोलकाप्पियर'],
        correctIndex: 1,
        explanationEn: 'The epic Silappadikaram (The Tale of an Anklet) was composed by Prince Ilango Adigal, celebrated as a masterpiece of Tamil Sangam literature.',
        explanationHi: 'शिलप्पादिकारम की रचना चेर राजकुमार इलांगो आदिगल ने की थी, जो संगम साहित्य का अमर महाकाव्य है।',
      },
    ],
  },
];
