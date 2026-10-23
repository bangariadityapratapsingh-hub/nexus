const fs = require('fs');
const path = require('path');

const outDir = path.join(process.cwd(), 'public', 'syllabus');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

function escapePdfText(text) {
  return text.replace(/[\(\)\\]/g, '');
}

function createPdf(title, subtitle, subjectKey, unitsList) {
  const contentLines = [
    'BT',
    '/F1 18 Tf',
    '50 740 Td',
    `(${escapePdfText(title)}) Tj`,
    '/F1 12 Tf',
    '0 -24 Td',
    `(${escapePdfText(subtitle)}) Tj`,
    '/F1 10 Tf',
    '0 -18 Td',
    '(SRI DEV SUMAN UTTARAKHAND VISHWAVIDYALAYA - NEP 2020) Tj',
    '0 -14 Td',
    '(Official Curriculum & Examination Framework 2025-2026) Tj',
    '0 -16 Td',
    '(----------------------------------------------------------------------------------------------------------------) Tj',
    '0 -22 Td',
    '/F1 10 Tf'
  ];

  unitsList.forEach(u => {
    contentLines.push(`(${escapePdfText(u)}) Tj`);
    contentLines.push('0 -18 Td');
  });

  contentLines.push('0 -20 Td');
  contentLines.push('/F1 9 Tf');
  contentLines.push('(Approved by SDSUV Board of Studies & Academic Council) Tj');
  contentLines.push('ET');

  const streamContent = contentLines.join('\n');
  const streamLen = Buffer.byteLength(streamContent);

  const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>
endobj
4 0 obj
<< /Length ${streamLen} >>
stream
${streamContent}
endstream
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000224 00000 n 
0000000290 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
360
%%EOF`;

  const targetFile = path.join(outDir, `${subjectKey}.pdf`);
  fs.writeFileSync(targetFile, pdf);
  console.log(`Generated: ${targetFile}`);
}

createPdf('SDSUV BA Geography Syllabus', 'Department of Geography - Semesters 1 to 6', 'geography', [
  'Sem 1: Physical Geography (Lithosphere, Atmosphere, Hydrosphere) + Practical: Cartography',
  'Sem 2: Human Geography (Races, Tribes, Hill Morphology) + GE: Diversity of Uttarakhand',
  'Sem 3: Evolution of Geographical Thought + Practical: Surveying (Prismatic Compass)',
  'Sem 4: Economic Geography (Resources, Weber & Losch Location Theories) + Practical',
  'Sem 5: Geography of India (Monsoon, Drainage, Industrial Belts, Himalayan States)',
  'Sem 6: Geoinformatics (Remote Sensing, EMR, LISS, GPS Field Mapping, GIS Architecture)'
]);

createPdf('SDSUV BA Hindi Literature Syllabus', 'Department of Hindi - Semesters 1 to 6', 'hindi', [
  'Sem 1: Pracheen evam Bhaktikaleen Kavya (Chandbardai, Kabir, Jayasi, Surdas, Tulsidas)',
  'Sem 2: Hindi Katha Sahitya (Premchand, Guleri, Prasad; Novel: Kagar Ki Aag - Himanshu Joshi)',
  'Sem 3: Ritikaleen Kavya (Keshavdas, Bihari, Dev, Ghananand, Bhushan) + Lok Sahitya',
  'Sem 4: Kavyang Vivechan (Rasa, Alankara, Chhanda, Shabdashakti) + Smarak Sahitya',
  'Sem 5: Dwivedi-yugeen evam Chhayavadi Kavya (Prasad, Pant, Nirala, Mahadevi, Gupt)',
  'Sem 6: Hindi Natak evam Ekanki (Dhruvswamini - Jaishankar Prasad; Deepdan, Tauliye)'
]);

createPdf('SDSUV BA History Syllabus', 'Department of History - Semesters 1 to 6', 'history', [
  'Sem 1: History of India to 300 AD (Harappa, Vedic, Mauryas, Kalsi Inscription) + GE: Uttarakhand',
  'Sem 2: History of India 300 to 1200 AD (Guptas, Harshavardhana, Cholas, Arab & Ghaznavid Invasions)',
  'Sem 3: History of India 1200 to 1526 AD (Delhi Sultanate, Alauddin Market Reforms, Bhakti-Sufi)',
  'Sem 4: History of India 1526 to 1750 AD (Mughals, Sher Shah Suri, Chhatrapati Shivaji Maratha Swarajya)',
  'Sem 5: History of India 1750 to 1857 AD (British Expansion, Land Revenue Settlements, 1857 Revolt)',
  'Sem 6: History of India 1858 to 1950 AD (INC, Swadeshi, Gandhian Mass Movements, INA, Independence)'
]);

createPdf('SDSUV BA Political Science Syllabus', 'Department of Political Science - Semesters 1 to 6', 'polscience', [
  'Sem 1: Basic Principles of Political Science (State, Sovereignty, Rawls Justice, Liberty, Democracy)',
  'Sem 2: Fundamentals of Modern Government (Parliamentary vs Presidential, Legislature, Judiciary)',
  'Sem 3: Introduction to Political Theory (Liberalism, Marxism, Socialism, Feminism, Ecologism)',
  'Sem 4: An Introduction to the Indian Constitution (Preamble, Fundamental Rights, DPSP, Supreme Court)',
  'Sem 5: International Politics (Realism, Cold War, UNO, NAM, Indian Foreign Policy & G20)',
  'Sem 6: Public Administration (POSDCORB, Herbert Simon Decision Making, Lokpal, E-Governance)'
]);

createPdf('SDSUV BA Sociology Syllabus', 'Department of Sociology - Semesters 1 to 6', 'sociology', [
  'Sem 1: Introductory Sociology (Social Groups, Social Processes, Culture, Cooley & Mead Socialization)',
  'Sem 2: Social Change (Linear & Cyclical Patterns, Factors, Evolutionary & Conflict Theories)',
  'Sem 3: Indian Social Problems (Casteism, Communalism, Gender Violence, Ageing, Corruption)',
  'Sem 4: Social Control and Deviance (Mannheim, Cooley, Merton Anomie, Sutherland White-Collar Crime)',
  'Sem 5: Development of Sociological Thought (Comte, Durkheim Social Facts & Suicide, Marx, Weber)',
  'Sem 6: Development of Indian Sociological Thought (GS Ghurye, Radhakamal Mukherjee, MN Srinivas, Karve)'
]);

console.log('All 5 official SDSUV syllabus PDFs successfully generated.');
