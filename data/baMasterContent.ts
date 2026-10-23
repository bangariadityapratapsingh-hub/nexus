export interface MasterVideo {
  title: string;
  channel: string;
  language: 'English' | 'Hindi' | 'Hinglish';
  videoId: string;
  searchFallback: string;
}

export interface MasterNotesEn {
  intro: string;
  flowchart: string;
  keyPoints: string[];
  valueAddition: string;
  conclusion: string;
}

export interface MasterNotesHi {
  intro: string;
  flowchart: string;
  keyPoints: string[];
  valueAddition: string;
  conclusion: string;
}

export interface MasterSequenceItem {
  seqNo: string;
  topicTitle_en: string;
  topicTitle_hi: string;
  upscTag: string;
  sdsuvTag: string;
  videos: MasterVideo[];
  notes_en: MasterNotesEn;
  notes_hi: MasterNotesHi;
}

export interface MasterSubjectContent {
  subject: string;
  paper: string;
  unit: string;
  sequence: MasterSequenceItem[];
}

export interface BAMasterContentData {
  semester_1_master_content: MasterSubjectContent[];
}

export const BA_MASTER_CONTENT: BAMasterContentData = {
  semester_1_master_content: [
    {
      subject: "History",
      paper: "DSC: History of India from Earliest Times to 300 A.D.",
      unit: "Unit I & II: Sources, Prehistory, Harappan & Vedic Civilization",
      sequence: [
        {
          seqNo: "Lecture 01",
          topicTitle_en: "Sources of Ancient Indian History: Archaeological, Epigraphic, Numismatic & Literary",
          topicTitle_hi: "प्राचीन भारतीय इतिहास के स्रोत: पुरातात्विक, अभिलेखीय, मुद्राशास्त्रीय एवं साहित्यिक",
          upscTag: "UPSC GS-I / UKPSC / ASI",
          sdsuvTag: "🔥 Asked 6x (15 Marks)",
          videos: [
            {
              title: "Sources of Ancient Indian History (Complete One-Shot) | UPSC & BA",
              channel: "Bookstawa / StudyIQ IAS",
              language: "Hinglish",
              videoId: "m9w2ZOUF6So",
              searchFallback: "https://www.youtube.com/results?search_query=Sources+of+Ancient+Indian+History+StudyIQ+OnlyIAS"
            },
            {
              title: "प्राचीन भारत के ऐतिहासिक स्रोत | Drishti IAS / केवल हिंदी",
              channel: "Drishti IAS Hindi",
              language: "Hindi",
              videoId: "hW7tCQ457FA",
              searchFallback: "https://www.youtube.com/results?search_query=Prachin+Bharat+ke+Srot+Drishti+IAS+Hindi"
            },
            {
              title: "Archaeological & Literary Sources of Early India (English Lecture)",
              channel: "CEC / SWAYAM UGC",
              language: "English",
              videoId: "m9w2ZOUF6So",
              searchFallback: "https://www.youtube.com/results?search_query=Sources+of+Ancient+Indian+History+CEC+UGC+English"
            }
          ],
          notes_en: {
            intro: "Reconstructing early Indian history (up to 300 A.D.) relies on a synthesis of material remains (Archaeology) and textual traditions (Literature). As historian E.H. Carr noted, history is a continuous dialogue between the present and the past through verifiable sources.",
            flowchart: "Sources of Ancient India ➔ [1. Archaeological: Excavations, Coins (Numismatics), Inscriptions (Epigraphy), Monuments] + [2. Literary: Indigenous (Vedic, Buddhist Tripitaka, Jain Agamas, Sangam, Arthashastra) & Foreign Accounts (Megasthenes, Periplus, Ptolemy)]",
            keyPoints: [
              "1. Epigraphy (Inscriptions): Most reliable time-stamped source. James Prinsep deciphered Ashokan Brahmi in 1837. Key examples: Ashoka's Major Rock Edicts, Hathigumpha Inscription (Kharavela), Junagadh Rock Inscription (Rudradaman I - first chaste Sanskrit inscription), and Prayag Prashasti (Harishena).",
              "2. Numismatics (Coins): Punch-marked coins (silver/copper, 6th C BCE) show trade expansion; Indo-Greek coins introduced die-striking and portraits; Kushanas issued the purest gold coins (Dinaras); Satavahanas issued lead/potin coins.",
              "3. Religious & Secular Literature: Four Vedas, Brahmanas, Upanishads; Buddhist Dipavamsa & Mahavamsa; Kautilya's Arthashastra (statecraft); Kalhana's Rajatarangini (first true historical chronicle of Kashmir).",
              "4. Foreign Accounts: Greek ambassador Megasthenes ('Indica' — describes Mauryan Pataliputra municipal administration of 6 committees); 'Periplus of the Erythraean Sea' (Indo-Roman maritime trade)."
            ],
            valueAddition: "Quote Upinder Singh ('A History of Ancient and Early Medieval India') and D.D. Kosambi. Always draw a 2-branch classification tree on page 1 of your SDSUV answer sheet.",
            conclusion: "While literary sources provide the ideological and social framework, archaeological and epigraphic records serve as the empirical backbone to cross-verify chronological gaps."
          },
          notes_hi: {
            intro: "प्रारंभिक भारतीय इतिहास (प्रारंभ से 300 ई. तक) का पुनर्निर्माण भौतिक अवशेषों (पुरातत्व) और साहित्यिक परंपराओं के समन्वय पर आधारित है। इतिहासकार उपिंदर सिंह के अनुसार, साहित्यिक और पुरातात्विक स्रोतों का तुलनात्मक अध्ययन ही प्राचीन भारत की सटीक तस्वीर प्रस्तुत करता है।",
            flowchart: "प्राचीन इतिहास के स्रोत ➔ [1. पुरातात्विक स्रोत: अभिलेख (Epigraphy), सिक्के (Numismatics), स्मारक व मृदभांड (PGW, NBPW)] + [2. साहित्यिक स्रोत: देशी साहित्य (वेद, त्रिपिटक, आगम, अर्थशास्त्र, संगम) एवं विदेशी विवरण (मेगस्थनीज की इंडिका, पेरिप्लस)]",
            keyPoints: [
              "1. अभिलेखीय साक्ष्य (Epigraphy): सर्वाधिक प्रामाणिक स्रोत। 1837 ई. में जेम्स प्रिंसेप ने अशोक के ब्राह्मी लिपि के अभिलेखों को पढ़ा। प्रमुख अभिलेख: अशोक के शिलालेख, खारवेल का हाथीगुम्फा अभिलेख, रुद्रदामन का जूनागढ़ अभिलेख (संस्कृत का प्रथम बड़ा अभिलेख)।",
              "2. मुद्राशास्त्रीय साक्ष्य (Numismatics): आहत सिक्के (Punch-marked coins - 6ठी शताब्दी ई.पू.), हिन्द-यवन शासकों द्वारा लेखयुक्त व आकृति वाले सिक्के, कुषाणों के शुद्धतम स्वर्ण सिक्के तथा सातवाहनों के सीसे व पोटीन के सिक्के।",
              "3. देशी साहित्य: ऋग्वेद से उत्तर वैदिक साहित्य, बौद्ध जातक कथाएं (सामाजिक-आर्थिक जीवन), कौटिल्य का 'अर्थशास्त्र' (मौर्यकालीन राजव्यवस्था), तथा कल्हण की 'राजतरंगिणी' (प्रथम प्रामाणिक ऐतिहासिक ग्रंथ)।",
              "4. विदेशी यात्रियों के विवरण: यूनानी राजदूत मेगस्थनीज की 'इंडिका' (पाटलिपुत्र का नगर प्रशासन व 6 समितियां), अज्ञात लेखक की 'पेरिप्लस ऑफ द एरिथ्रियन सी' (भारत-रोम व्यापार)।"
            ],
            valueAddition: "परीक्षा में रोमिला थापर ('पूर्वकालीन भारत') और रामशरण शर्मा ('प्रारम्भिक भारत का परिचय') का संदर्भ अवश्य दें तथा प्रथम पृष्ठ पर स्रोतों का फ्लोचार्ट बनाएं।",
            conclusion: "निष्कर्षतः साहित्यिक स्रोत तत्कालीन समाज व दर्शन को दर्शाते हैं, जबकि पुरातात्विक साक्ष्य तिथिक्रम और भौतिक संस्कृति की वैज्ञानिक पुष्टि करते हैं।"
          }
        },
        {
          seqNo: "Lecture 02",
          topicTitle_en: "Harappan Civilization: Origin, Town Planning, Economy & Decline",
          topicTitle_hi: "हड़प्पा सभ्यता: उत्पत्ति, नगर नियोजन, अर्थव्यवस्था एवं पतन के कारण",
          upscTag: "UPSC GS-I / ASI",
          sdsuvTag: "🔥 Asked 8x (15 Marks)",
          videos: [
            {
              title: "Indus Valley Civilization Complete Revision | PW OnlyIAS",
              channel: "PW OnlyIAS",
              language: "Hinglish",
              videoId: "d9N6g3ebm9w",
              searchFallback: "https://www.youtube.com/results?search_query=Indus+Valley+Civilization+PW+OnlyIAS+One+Shot"
            },
            {
              title: "सिंधु घाटी सभ्यता: नगर नियोजन एवं पतन | Drishti IAS",
              channel: "Drishti IAS",
              language: "Hindi",
              videoId: "hW7tCQ457FA",
              searchFallback: "https://www.youtube.com/results?search_query=Sindhu+Ghati+Sabhyata+Drishti+IAS+Hindi"
            }
          ],
          notes_en: {
            intro: "The Harappan Civilization (c. 2600–1900 BCE, Mature Phase) was India's first urbanization, spanning ~1.3 million sq. km across NW India and Pakistan in a triangular shape.",
            flowchart: "Town Planning ➔ [Upper Citadel (West): Granaries, Great Bath (Mohenjodaro)] + [Lower Town (East): Grid-pattern streets cutting at 90°, Covered Underground Drainage, Standardized Burnt Bricks (Ratio 4:2:1)]",
            keyPoints: [
              "1. Scientific Town Planning: Grid system (chessboard pattern); underground drainage with gypsum mortar and soak-pits; Dholavira uniquely divided into 3 parts (Citadel, Middle Town, Lower Town) with giant rock-cut water reservoirs.",
              "2. Economy & Trade: Surplus wheat/barley agriculture (ploughed field at Kalibangan); first to cultivate cotton ('Sindon'); external trade with Mesopotamia ('Meluhha') via Lothal dockyard and Bahrain ('Dilmun').",
              "3. Craft & Script: Steatite seals (Pashupati Seal, Unicorn), lost-wax ('Cire Perdue') bronze dancing girl, Boustrophedon pictographic script (undeciphered).",
              "4. Debate on Decline: Aryan Invasion theory (Mortimer Wheeler - now rejected) vs. Ecological Imbalance, tectonic shifts, drying of Ghaggar-Hakra river, and recurring floods (M.R. Sahni, Fairservis, Shereen Ratnagar)."
            ],
            valueAddition: "Quote Gordon Childe ('Urban Revolution') and D.K. Chakrabarti. Draw a small sketch of Citadel vs. Lower Town.",
            conclusion: "The Harappan civilization did not vanish overnight; rather, it underwent de-urbanization (Late Harappan phase), passing its cultural and agricultural legacy into rural Indian traditions."
          },
          notes_hi: {
            intro: "हड़प्पा सभ्यता (परिपक्व काल: 2600–1900 ई.पू.) भारतीय उपमहाद्वीप की प्रथम नगरीय क्रांति थी, जो लगभग 13 लाख वर्ग किमी के त्रिभुजाकार क्षेत्र में विस्तृत थी।",
            flowchart: "नगर नियोजन ➔ [पश्चिमी टीला (दुर्ग/Citadel): विशाल स्नानागार, अन्नागार] + [पूर्वी टीला (निचला नगर): जाल पद्धति (Grid System - 90° पर काटती सड़कें), ढकी हुई जल निकासी प्रणाली, पक्की ईंटों का अनुपात 4:2:1]",
            keyPoints: [
              "1. विशिष्ट नगर नियोजन एवं जल प्रबंधन: मोहनजोदड़ो का 'विशाल स्नानागार' (जॉन मार्शल ने इसे तत्कालीन विश्व का आश्चर्यजनक निर्माण कहा); धोलावीरा का तीन भागों में विभाजन व उन्नत जल संरक्षण प्रणाली।",
              "2. कृषि एवं व्यापार: कालीबंगा से जुते हुए खेत के साक्ष्य; विश्व में सर्वप्रथम कपास ('सिंडन') का उत्पादन; लोथल (गोदीबाड़ा/Dockyard) के माध्यम से मेसोपोटामिया ('मेलुहा') के साथ समुद्री व्यापार।",
              "3. कला एवं लिपि: सेलखड़ी (Steatite) की मुहरें, पशुपति महादेव की मुहर, 'लॉस्ट वैक्स' तकनीक से निर्मित कांसे की नर्तकी, भावचित्रात्मक (Boustrophedon) लिपि।",
              "4. पतन से संबंधित प्रमुख मत: व्हीलर व गार्डन चाइल्ड (आर्य आक्रमण - अब अमान्य), मार्शल व मैके (बाढ़), अमलानंद घोष व फेयरसर्विस (पारिस्थितिक असंतुलन एवं जलवायु परिवर्तन)।"
            ],
            valueAddition: "उत्तर में डी.पी. अग्रवाल और रोमिला थापर के 'नगरीय पतन बनाम सांस्कृतिक निरंतरता' सिद्धांत का उल्लेख करें।",
            conclusion: "हड़प्पा सभ्यता का पूर्ण विनाश नहीं हुआ, अपितु नगरीय स्वरूप का ग्रामीण संस्कृति (उत्तर-हड़प्पा चरण) में रूपांतरण हुआ।"
          }
        }
      ]
    },
    {
      subject: "Geography",
      paper: "DSC: Physical Geography",
      unit: "Unit I & II: Interior of the Earth, Isostasy, Continental Drift & Plate Tectonics",
      sequence: [
        {
          seqNo: "Lecture 01",
          topicTitle_en: "Interior of the Earth: Seismic Waves (P, S, L) & Discontinuities",
          topicTitle_hi: "पृथ्वी की आंतरिक संरचना: भूकंपीय तरंगें (P, S, L) एवं असंबद्धताएं",
          upscTag: "UPSC GS-I / CDS / CAPF",
          sdsuvTag: "🔥 Asked 7x (15 Marks)",
          videos: [
            {
              title: "Interior of the Earth | Physical Geography | PW OnlyIAS / Amit Sengupta",
              channel: "Amit Sengupta / OnlyIAS",
              language: "English",
              videoId: "d9N6g3ebm9w",
              searchFallback: "https://www.youtube.com/results?search_query=Interior+of+the+Earth+Amit+Sengupta+Physical+Geography"
            },
            {
              title: "पृथ्वी की आंतरिक संरचना | Physical Geography | Drishti IAS",
              channel: "Drishti IAS",
              language: "Hindi",
              videoId: "hW7tCQ457FA",
              searchFallback: "https://www.youtube.com/results?search_query=Prithvi+ki+Aantarik+Sanrachna+Drishti+IAS"
            }
          ],
          notes_en: {
            intro: "Because Earth's radius is 6,371 km, direct observation is limited to ~12 km (Kola Superdeep Borehole). Our most scientific understanding comes from indirect sources—primarily Seismic Waves (Earthquakeology).",
            flowchart: "Earth's Layers ➔ [Crust (0-35 km, SIAL, 2.7 g/cm³)] --(Moho Discontinuity)--> [Mantle (35-2900 km, SIMA, Asthenosphere)] --(Gutenberg Discontinuity)--> [Core (2900-6371 km, NIFE, Outer Liquid + Inner Solid)]",
            keyPoints: [
              "1. Seismic Wave Behavior: Primary (P) waves are longitudinal and travel through Solid, Liquid & Gas; Secondary (S) waves are transverse and travel ONLY through Solids. The disappearance of S-waves beyond 103° (Shadow Zone) proves the Outer Core is liquid.",
              "2. Classical Chemical Classification (Eduard Suess): SIAL (Silica + Aluminium), SIMA (Silica + Magnesium), and NIFE (Nickel + Ferrous).",
              "3. Five Major Seismic Discontinuities (Top to Bottom): Conrad (Upper & Lower Crust), Mohorovičić (Crust & Mantle), Repetti (Upper & Lower Mantle), Gutenberg (Mantle & Core at 2900 km), and Lehmann (Outer & Inner Core at 5150 km)."
            ],
            valueAddition: "Quote Savindra Singh ('Physical Geography') and Arthur Holmes. Always draw the Wedge Diagram of Earth's interior showing all 5 discontinuities.",
            conclusion: "Seismic tomography confirms a dynamic, layered Earth where convection currents in the Mantle drive surface plate tectonics."
          },
          notes_hi: {
            intro: "पृथ्वी की औसत त्रिज्या 6,371 किमी है। प्रत्यक्ष स्रोत (खनन व ज्वालामुखी) सीमित होने के कारण पृथ्वी की आंतरिक संरचना की सर्वाधिक वैज्ञानिक जानकारी 'भूकंपीय तरंगों' (Seismic Waves) के अध्ययन से प्राप्त होती है।",
            flowchart: "पृथ्वी की परतें ➔ [भूपर्पटी/Crust (0-35 km)] --(मोहो असंबद्धता)--> [मैंटल/Mantle (35-2900 km, दुर्बलतामंडल)] --(गुटेनबर्ग असंबद्धता)--> [क्रोड/Core (2900-6371 km, बाह्य तरल + आंतरिक ठोस NIFE)]",
            keyPoints: [
              "1. भूकंपीय तरंगों का व्यवहार: प्राथमिक (P) तरंगें ठोस, द्रव व गैस तीनों माध्यमों में चलती हैं, जबकि द्वितीयक (S) तरंगें केवल ठोस माध्यम में चलती हैं। 103° के बाद S-तरंगों का लुप्त होना (Shadow Zone) सिद्ध करता है कि बाह्य क्रोड तरल अवस्था में है।",
              "2. एडवर्ड स्वेस (Suess) का रासायनिक वर्गीकरण: सियाल (SIAL - सिलिका + एल्युमिनियम), सिमा (SIMA - सिलिका + मैग्नीशियम) तथा निफे (NIFE - निकेल + फेरियम)।",
              "3. पांच प्रमुख असंबद्धताएं (Discontinuities): कोनराड (ऊपरी व निचली क्रस्ट), मोहोरोविसिक (क्रस्ट व मैंटल), रेपेटी (ऊपरी व निचला मैंटल), गुटेनबर्ग (मैंटल व क्रोड - 2900 किमी), तथा लेहमैन (बाह्य व आंतरिक क्रोड - 5150 किमी)।"
            ],
            valueAddition: "प्रो. सविन्द्र सिंह ('भौतिक भूगोल') का संदर्भ दें तथा उत्तर पुस्तिका में पृथ्वी के शंकु काट (Wedge Diagram) का नामांकित चित्र अवश्य बनाएं।",
            conclusion: "निष्कर्षतः भूकंपीय साक्ष्यों ने पृथ्वी के त्रि-स्तरीय गतिशील मॉडल को स्थापित किया है, जो प्लेट विवर्तनिकी का आधार है।"
          }
        }
      ]
    },
    {
      subject: "Political Science",
      paper: "DSC: Basic Principles of Political Science",
      unit: "Unit I & II: Nature of Political Science, State & Sovereignty",
      sequence: [
        {
          seqNo: "Lecture 01",
          topicTitle_en: "Sovereignty: Monistic (Austin) vs. Pluralistic Theories (Laski & MacIver)",
          topicTitle_hi: "संप्रभुता (Sovereignty): एकलवादी (ऑस्टिन) बनाम बहुलवादी सिद्धांत (लास्की एवं मैकाइवर)",
          upscTag: "UPSC PSIR / UKPSC /UGC NET",
          sdsuvTag: "🔥 Asked 7x (15 Marks)",
          videos: [
            {
              title: "Sovereignty: Austin's Monistic & Pluralistic Theory | Political Science",
              channel: "PolSc Help / StudyIQ",
              language: "Hinglish",
              videoId: "d9N6g3ebm9w",
              searchFallback: "https://www.youtube.com/results?search_query=Sovereignty+Monistic+and+Pluralistic+Theory+Political+Science"
            },
            {
              title: "संप्रभुता: ऑस्टिन का एकलवादी एवं बहुलवादी सिद्धांत | राजनीति विज्ञान",
              channel: "Drishti IAS / B.A. Pol Science",
              language: "Hindi",
              videoId: "hW7tCQ457FA",
              searchFallback: "https://www.youtube.com/results?search_query=Samprabhuta+Austin+ka+Siddhant+Bahulwadi+Siddhant+Hindi"
            }
          ],
          notes_en: {
            intro: "Derived from the Latin word 'Superanus' (Supreme Power), Sovereignty is the most essential element of the modern State, signifying internal supremacy over all individuals/associations and external independence from foreign control.",
            flowchart: "Theories of Sovereignty ➔ [1. Monistic Theory (Bodin, Hobbes, John Austin): Absolute, Indivisible, Inalienable Legal Command] vs. [2. Pluralistic Theory (Harold Laski, MacIver, Duguit): State is one association among many; power is federal and shared]",
            keyPoints: [
              "1. John Austin's Monistic (Legal) Theory (1832): In 'Lectures on Jurisprudence', Austin defined law as 'the command of the sovereign backed by sanction'. If a determinate human superior receives habitual obedience from the bulk of society, that superior is Sovereign.",
              "2. Core Attributes of Monistic Sovereignty: Absoluteness, Permanence, Universality, Inalienability, and Indivisibility.",
              "3. Pluralist Critique (Laski & MacIver): Pluralists argue society is federal, therefore authority must also be federal. Austin ignores customs, international law, and autonomous associations (churches, trade unions, civil society).",
              "4. Contemporary Relevance: In an era of Globalization, WTO, UN treaties, and Federal Constitutionalism, absolute monistic sovereignty has transformed into limited, responsible constitutional sovereignty."
            ],
            valueAddition: "Quote Harold Laski: 'Because society is federal, authority must be federal also' and O.P. Gauba ('An Introduction to Political Theory').",
            conclusion: "While Monism explains the legal unity of the State, Pluralism rightly highlights the democratic reality of decentralized power in modern civil society."
          },
          notes_hi: {
            intro: "अंग्रेजी शब्द 'Sovereignty' लैटिन भाषा के 'Superanus' से बना है जिसका अर्थ है 'सर्वोच्च शक्ति'। यह राज्य का सर्वाधिक महत्वपूर्ण तत्व है, जिसके कारण राज्य आंतरिक रूप से सर्वोच्च और बाह्य रूप से पूर्ण स्वतंत्र होता है।",
            flowchart: "संप्रभुता के सिद्धांत ➔ [1. एकलवादी सिद्धांत (जीन बोदां, हॉब्स, जॉन ऑस्टिन): निरंकुश, अविभाज्य, अदेय कानूनी शक्ति] बनाम [2. बहुलवादी सिद्धांत (हेराल्ड लास्की, मैकाइवर, क्रैब): समाज संघात्मक है, अतः सत्ता भी संघात्मक व विभाजित होनी चाहिए]",
            keyPoints: [
              "1. जॉन ऑस्टिन का एकलवादी (वैधानिक) सिद्धांत (1832): अपनी पुस्तक 'Lectures on Jurisprudence' में ऑस्टिन ने कहा—'कानून संप्रभु की आज्ञा है'। संप्रभु एक निश्चित मानव श्रेष्ठ है जो किसी अन्य के आदेश का पालन नहीं करता और समाज का अधिकांश भाग स्वभावतः उसकी आज्ञा मानता है।",
              "2. संप्रभुता के लक्षण: सर्वव्यापकता, स्थायित्व, अदेयता (Inalienability), अविभाज्यता और निरंकुशता।",
              "3. बहुलवादी आलोचना (लास्की एवं मैकाइवर): बहुलवादियों के अनुसार राज्य समाज का ही एक संघ है, वह 'संघों का संघ' है। ऑस्टिन का सिद्धांत परंपराओं, लोकतंत्र तथा अंतर्राष्ट्रीय कानूनों की उपेक्षा करता है।",
              "4. समकालीन प्रासंगिकता: भूमंडलीकरण, संयुक्त राष्ट्र संघ और लोककल्याणकारी संविधानवाद के युग में संप्रभुता निरंकुश न रहकर मर्यादित व उत्तरदायी बन गई है।"
            ],
            valueAddition: "लास्की का प्रसिद्ध कथन उद्धृत करें: 'चूंकि समाज का स्वरूप संघात्मक है, इसलिए सत्ता भी संघात्मक होनी चाहिए' (ओ.पी. गाबा, 'राजनीति सिद्धांत की रूपरेखा')।",
            conclusion: "निष्कर्षतः एकलवाद राज्य की कानूनी एकता को स्पष्ट करता है, जबकि बहुलवाद आधुनिक लोकतांत्रिक समाज की वास्तविक विविधता को दर्शाता है।"
          }
        }
      ]
    },
    {
      subject: "Sociology",
      paper: "DSC: Introductory Sociology",
      unit: "Unit I & II: Origin of Sociology, Social Groups, Community, Association & Institution",
      sequence: [
        {
          seqNo: "Lecture 01",
          topicTitle_en: "Nature & Scope of Sociology: Formalistic (Simmel) vs. Synthetic School (Durkheim & Sorokin)",
          topicTitle_hi: "समाजशास्त्र की प्रकृति एवं विषय-क्षेत्र: स्वरूपात्मक (सिमेल) बनाम समन्वयात्मक संप्रदाय (दुर्खीम व सोरोकिन)",
          upscTag: "UPSC Sociology Optional / UGC NET",
          sdsuvTag: "🔥 Asked 6x (15 Marks)",
          videos: [
            {
              title: "Emergence, Nature & Scope of Sociology | Sleepy Classes / OnlyIAS",
              channel: "Sleepy Classes IAS",
              language: "Hinglish",
              videoId: "d9N6g3ebm9w",
              searchFallback: "https://www.youtube.com/results?search_query=Nature+and+Scope+of+Sociology+Formalistic+and+Synthetic+School"
            },
            {
              title: "समाजशास्त्र का अर्थ, प्रकृति एवं विषय-क्षेत्र (स्वरूपात्मक व समन्वयात्मक संप्रदाय)",
              channel: "Sociology Hindi / UGC NET",
              language: "Hindi",
              videoId: "hW7tCQ457FA",
              searchFallback: "https://www.youtube.com/results?search_query=Samajshastra+ki+Prakriti+evam+Vishay+Kshetra+Hindi"
            }
          ],
          notes_en: {
            intro: "Coined by French philosopher Auguste Comte in 1839 (from Latin 'Socius' + Greek 'Logos'), Sociology emerged out of the twin intellectual and socio-economic upheavals of the Enlightenment, the French Revolution (1789), and the Industrial Revolution.",
            flowchart: "Scope of Sociology ➔ [1. Formalistic / Specialist School (Georg Simmel, Max Weber, Von Wiese, Tonnies): Studies pure 'forms' of social relationships] vs. [2. Synthetic School (Emile Durkheim, Pitirim Sorokin, Hobhouse, Ginsberg): Studies society as an interconnected whole]",
            keyPoints: [
              "1. Formalistic / Specialist School: Led by German sociologist Georg Simmel. Argues sociology is a specific, pure, and independent science that studies the 'forms' (patterns like competition, subordination, division of labor) rather than the concrete 'contents' of social life.",
              "2. Synthetic School: Led by Durkheim, Sorokin, and Ginsberg. Argues all parts of social life are intimately interrelated; therefore, sociology must synthesize findings into a general science of society (Social Morphology, Social Physiology, General Sociology).",
              "3. Nature of Sociology (Robert Bierstedt): In 'The Social Order', Bierstedt defines sociology as: (i) Social, not natural; (ii) Categorical (what is), not normative (what ought to be); (iii) Pure, not applied; (iv) Generalizing, not particularizing; and (v) Both rational and empirical."
            ],
            valueAddition: "Quote MacIver & Page: 'Society is a web of social relationships' and Robert Bierstedt's 7 characteristics of sociology.",
            conclusion: "Modern sociology transcends the rigid Formalistic-Synthetic divide, combining micro-level interaction forms with macro-level structural synthesis."
          },
          notes_hi: {
            intro: "फ्रांसीसी दार्शनिक ऑगस्त कॉम्टे ने 1839 ई. में लैटिन शब्द 'Socius' (समाज) और ग्रीक शब्द 'Logos' (शास्त्र) को मिलाकर 'Sociology' शब्द का सृजन किया। इसका उदय फ्रांसीसी क्रांति और औद्योगिक क्रांति से उत्पन्न सामाजिक परिवर्तनों के वैज्ञानिक अध्ययन हेतु हुआ।",
            flowchart: "समाजशास्त्र का विषय-क्षेत्र ➔ [1. स्वरूपात्मक/विशिष्ट संप्रदाय (जॉर्ज सिमेल, वीरकान्त, वान वीज, मैक्स वेबर): सामाजिक संबंधों के केवल 'स्वरूपों' का अध्ययन] बनाम [2. समन्वयात्मक संप्रदाय (एमिल दुर्खीम, सोरोकिन, हॉबहाउस, गिन्सबर्ग): संपूर्ण समाज का सामान्य विज्ञान]",
            keyPoints: [
              "1. स्वरूपात्मक संप्रदाय (Formalistic School): प्रवर्तक जॉर्ज सिमेल। इनके अनुसार जिस प्रकार ज्यामिति वस्तुओं के आकार का अध्ययन करती है, उसी प्रकार समाजशास्त्र एक विशिष्ट विज्ञान के रूप में सामाजिक संबंधों के 'स्वरूपों' (जैसे—सहयोग, संघर्ष, प्रतिस्पर्धा) का अध्ययन करता है।",
              "2. समन्वयात्मक संप्रदाय (Synthetic School): प्रवर्तक दुर्खीम, सोरोकिन और गिन्सबर्ग। इनके अनुसार समाज के विभिन्न अंग परस्पर जुड़े हैं, अतः समाजशास्त्र को एक सामान्य विज्ञान के रूप में सामाजिक आकारिकी, सामाजिक शरीर-क्रिया विज्ञान और सामान्य समाजशास्त्र का समन्वय करना चाहिए।",
              "3. समाजशास्त्र की वैज्ञानिक प्रकृति (रॉबर्ट बीरस्टीड): अपनी पुस्तक 'The Social Order' में बीरस्टीड ने स्पष्ट किया कि समाजशास्त्र एक सामाजिक, वास्तविक (आदर्शात्मक नहीं), विशुद्ध, अमूर्त तथा तार्किक-अनुभवसिद्ध विज्ञान है।"
            ],
            valueAddition: "मैकाइवर एवं पेज का कथन अवश्य लिखें: 'समाज सामाजिक संबंधों का जाल है' (Society is a web of social relationships)।",
            conclusion: "निष्कर्षतः आधुनिक समाजशास्त्र में स्वरूपात्मक (सूक्ष्म अध्ययन) और समन्वयात्मक (वृहद अध्ययन) दोनों दृष्टिकोण एक-दूसरे के पूरक हैं।"
          }
        }
      ]
    },
    {
      subject: "Hindi Literature",
      paper: "DSC-1: प्राचीन एवं भक्तिकालीन काव्य",
      unit: "इकाई I, II एवं III: भक्तिकाल की पृष्ठभूमि, कबीर एवं जायसी",
      sequence: [
        {
          seqNo: "Lecture 01",
          topicTitle_en: "Bhakti Movement: Origin, Causes, Nirguna (Sant & Sufi) and Saguna Streams",
          topicTitle_hi: "भक्ति आंदोलन: उदय के कारण, निर्गुण (ज्ञानाश्रयी व प्रेमाश्रयी) एवं सगुण काव्यधारा",
          upscTag: "UPSC Hindi Literature Optional / UGC NET",
          sdsuvTag: "🔥 Asked 8x (15 Marks)",
          videos: [
            {
              title: "भक्तिकाल: उदय के कारण एवं प्रमुख धाराएं | डॉ. विकास दिव्यकीर्ति / Drishti IAS",
              channel: "Drishti IAS Hindi Literature",
              language: "Hindi",
              videoId: "hW7tCQ457FA",
              searchFallback: "https://www.youtube.com/results?search_query=Bhaktikal+Hindi+Sahitya+Vikas+Divyakirti+Drishti+IAS"
            },
            {
              title: "कबीर का काव्य, रहस्यवाद और समाज दर्शन | UGC NET & BA Hindi",
              channel: "UGC NET Adda247 / Sahitya",
              language: "Hindi",
              videoId: "m9w2ZOUF6So",
              searchFallback: "https://www.youtube.com/results?search_query=Kabir+ka+Kavya+aur+Samaj+Darshan+Hindi+Sahitya"
            }
          ],
          notes_en: {
            intro: "Designated as the 'Golden Age' (Swarna Yuga) of Hindi literature by George Grierson and Shyamsundar Das, the Bhakti Period (Samvat 1375–1700) represents a massive socio-cultural and spiritual awakening across medieval India.",
            flowchart: "भक्तिकाल (1375-1700 वि.) ➔ [1. निर्गुण धारा: (क) ज्ञानाश्रयी/संत शाखा - कबीर, रैदास, नानक | (ख) प्रेमाश्रयी/सूफी शाखा - जायसी, कुतुबन] + [2. सगुण धारा: (क) रामभक्ति शाखा - तुलसीदास | (ख) कृष्णभक्ति शाखा - सूरदास, मीरा]",
            keyPoints: [
              "1. Debate on Origin of Bhakti: (i) George Grierson ('Flash of Lightning' / Christian influence - rejected); (ii) Acharya Ramchandra Shukla (Reaction to political defeat & Islamic invasion); (iii) Acharya Hazari Prasad Dwivedi (Natural evolution of Indian tradition - 'Spontaneous cultural expression').",
              "2. Kabir & Sant Kavya: Monotheism, rejection of caste/ritualism, Sadhukkari / Panchmel Khichdi language, Ulathbansi mysticism.",
              "3. Jayasi & Sufi Kavya (Padmavat): Masnavi style, Avadhi language, Doha-Chaupai (Kadvak) meter, synthesis of Indian folk romances with Sufi 'Ishq-e-Majazi to Ishq-e-Haqiqi'."
            ],
            valueAddition: "Quote Hazari Prasad Dwivedi: 'मैं जोर देकर कहना चाहता हूँ कि अगर इस्लाम नहीं आया होता तो भी इस साहित्य का बारह आना वैसा ही होता जैसा आज है।'",
            conclusion: "The Bhakti movement democratized spirituality, uniting North and South India through vernacular poetry and human dignity."
          },
          notes_hi: {
            intro: "जॉर्ज ग्रियर्सन और डॉ. श्यामसुंदर दास द्वारा 'हिंदी साहित्य का स्वर्णयुग' कहे जाने वाले भक्तिकाल (संवत् 1375–1700) ने मध्यकालीन भारतीय समाज में सांस्कृतिक समन्वय, लोकजागरण और मानवीय समानता की अभूतपूर्व क्रांति उत्पन्न की।",
            flowchart: "भक्तिकाल (संवत् 1375-1700) ➔ [1. निर्गुण काव्यधारा: (क) ज्ञानाश्रयी/संत शाखा - कबीर, रैदास | (ख) प्रेमाश्रयी/सूफी शाखा - मलिक मुहम्मद जायसी] + [2. सगुण काव्यधारा: (क) रामभक्ति शाखा - तुलसीदास | (ख) कृष्णभक्ति शाखा - सूरदास]",
            keyPoints: [
              "1. भक्ति के उदय संबंधी प्रमुख मत: (i) जॉर्ज ग्रियर्सन ('ईसाइयत की देन' व 'बिजली की चमक'); (ii) आचार्य रामचंद्र शुक्ल ('इस्लामी आक्रमण की प्रतिक्रिया एवं हताश जाति की मनोवृत्ति'); (iii) आचार्य हजारीप्रसाद द्विवेदी ('भारतीय चिंतन धारा का स्वाभाविक विकास')।",
              "2. निर्गुण संत काव्य एवं कबीर: बाह्याडंबर, जातिप्रथा व मूर्तिपूजा का प्रबल विरोध; गुरु की महत्ता; रहस्यवाद; 'सधुक्कड़ी' (रामचंद्र शुक्ल) एवं 'पंचमेल खिचड़ी' (श्यामसुंदर दास) भाषा; हजारीप्रसाद द्विवेदी ने कबीर को 'वाणी का डिक्टेटर' कहा।",
              "3. सूफी काव्य एवं जायसी ('पद्मावत'): मसनवी शैली, ठेठ अवधी भाषा, दोहा-चौपाई (कड़वक बद्ध) पद्धति, 'इश्क-ए-मजाजी से इश्क-ए-हकीकी' (लौकिक प्रेम से अलौकिक प्रेम) की व्यंजना तथा 'मानसरोदक खण्ड' में आध्यात्मिक सौंदर्य।",
              "4. सगुण भक्ति (सूर एवं तुलसी): सूरदास का 'भ्रमरगीत' (उद्धव-गोपिका संवाद के माध्यम से निर्गुण पर सगुण व ज्ञान पर प्रेम की विजय) तथा तुलसीदास की 'लोकमंगल एवं समन्वय की साधना'।"
            ],
            valueAddition: "आचार्य हजारीप्रसाद द्विवेदी का प्रसिद्ध कथन उद्धृत करें: 'अगर इस्लाम नहीं आया होता तो भी इस साहित्य का बारह आना वैसा ही होता जैसा आज है' तथा आचार्य शुक्ल का कथन: 'भक्ति धर्म की रसात्मक अनुभूति है'।",
            conclusion: "निष्कर्षतः भक्तिकालीन काव्य ने शास्त्र के स्थान पर लोक को प्रतिष्ठित किया और संपूर्ण भारतीय समाज को प्रेम, समता व समन्वय के सूत्र में पिरोया।"
          }
        }
      ]
    }
  ]
};

export const SEMESTER_1_MASTER_CONTENT = BA_MASTER_CONTENT.semester_1_master_content;
