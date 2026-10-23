-- ============================================================================
-- SRI DEV SUMAN UTTARAKHAND VISHWAVIDYALAYA (SDSUV) NEXUS
-- Complete Production Database Schema for Supabase (PostgreSQL)
-- Compatible with Supabase Free Tier • Includes RLS Policies & Indexes
-- ============================================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================================
-- 1. ACADEMIC SUBJECTS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS subjects (
  id TEXT PRIMARY KEY,                       -- e.g. 'SDSUV-PHY-201'
  code TEXT NOT NULL UNIQUE,                -- e.g. 'PHY-201'
  name_en TEXT NOT NULL,
  name_hi TEXT NOT NULL,
  stream TEXT NOT NULL CHECK (stream IN ('bsc-maths', 'bsc-bio', 'ba-arts')),
  credits INT NOT NULL DEFAULT 4,
  semester INT NOT NULL CHECK (semester BETWEEN 1 AND 6),
  current_topic_en TEXT,
  current_topic_hi TEXT,
  color TEXT DEFAULT 'cyan',
  icon_name TEXT DEFAULT 'Atom',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for fast stream and semester filtering
CREATE INDEX IF NOT EXISTS idx_subjects_stream_sem ON subjects(stream, semester);

-- ============================================================================
-- 2. SYLLABUS UNITS TABLE (Unit 1 to Unit 5 per NEP 2020)
-- ============================================================================
CREATE TABLE IF NOT EXISTS units (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id TEXT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  unit_number INT NOT NULL CHECK (unit_number BETWEEN 1 AND 5),
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  total_hours INT DEFAULT 12,
  weightage_marks INT DEFAULT 20,
  sdsuv_credit_weight TEXT DEFAULT '1.0 Credit',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_units_subject ON units(subject_id, unit_number);

-- ============================================================================
-- 3. CHAPTERS & TOPICS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS topics (
  id TEXT PRIMARY KEY,                       -- e.g. 'optics-01'
  unit_id UUID REFERENCES units(id) ON DELETE CASCADE,
  subject_code TEXT NOT NULL,
  chapter_number INT DEFAULT 1,
  chapter_en TEXT NOT NULL,
  chapter_hi TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  tag TEXT DEFAULT '🔥 Most Asked in SDSUV',
  duration TEXT DEFAULT '38:15',
  youtube_id TEXT NOT NULL,
  language TEXT NOT NULL CHECK (language IN ('English', 'Hindi', 'Hinglish')),
  instructor_en TEXT DEFAULT 'SDSUV Faculty',
  instructor_hi TEXT DEFAULT 'एसडीएसयूवी संकाय',
  difficulty TEXT DEFAULT 'Intermediate' CHECK (difficulty IN ('Beginner', 'Intermediate', 'Advanced')),
  quick_notes JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_topics_subject ON topics(subject_code);
CREATE INDEX IF NOT EXISTS idx_topics_youtube ON topics(youtube_id);

-- ============================================================================
-- 4. SMART LECTURES TABLE (With language_tag & YouTube metadata)
-- ============================================================================
CREATE TABLE IF NOT EXISTS lectures (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  topic_id TEXT REFERENCES topics(id) ON DELETE SET NULL,
  subject_code TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_hi TEXT,
  channel TEXT NOT NULL,
  duration TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  views TEXT DEFAULT '45K views',
  language_tag TEXT NOT NULL CHECK (language_tag IN ('English', 'Hindi', 'Hinglish')),
  badge TEXT DEFAULT '🔥 Most Popular in SDSUV',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lectures_lang ON lectures(language_tag);
CREATE INDEX IF NOT EXISTS idx_lectures_subject ON lectures(subject_code);

-- ============================================================================
-- 5. DUAL-LANGUAGE PYQ VAULT TABLE (Past University Exam Questions)
-- ============================================================================
CREATE TABLE IF NOT EXISTS pyqs (
  id TEXT PRIMARY KEY,                       -- e.g. 'pyq-p-01'
  stream TEXT NOT NULL CHECK (stream IN ('bsc-maths', 'bsc-bio', 'ba-arts')),
  subject_code TEXT NOT NULL,
  subject_name_en TEXT NOT NULL,
  subject_name_hi TEXT NOT NULL,
  chapter_en TEXT NOT NULL,
  chapter_hi TEXT NOT NULL,
  topic_en TEXT NOT NULL,
  topic_hi TEXT NOT NULL,
  question_en TEXT NOT NULL,
  question_hi TEXT NOT NULL,
  marks INT NOT NULL CHECK (marks IN (2, 5, 10, 15)),
  section TEXT NOT NULL CHECK (section IN ('A', 'B', 'C')),
  type TEXT NOT NULL CHECK (type IN ('Short', 'Medium', 'Long')),
  solution_en TEXT NOT NULL,
  solution_hi TEXT NOT NULL,
  examiner_rubric TEXT[] DEFAULT '{}',
  years_appeared INT[] NOT NULL,
  repeated_count INT DEFAULT 1,
  frequency_tag TEXT DEFAULT 'SDSUV High-Yield',
  learn_topic_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_pyqs_stream_subject ON pyqs(stream, subject_code);
CREATE INDEX IF NOT EXISTS idx_pyqs_marks ON pyqs(marks);
CREATE INDEX IF NOT EXISTS idx_pyqs_years ON pyqs USING GIN(years_appeared);

-- ============================================================================
-- 6. CAREER COMPASS TABLE (With stream_tags & eligibility matrices)
-- ============================================================================
CREATE TABLE IF NOT EXISTS careers (
  id TEXT PRIMARY KEY,                       -- e.g. 'career-cds'
  name TEXT NOT NULL,
  name_hi TEXT,
  short_code TEXT NOT NULL,
  category TEXT NOT NULL,                    -- '🎖️ Defence Officer', '🏛️ Civil Services', etc.
  stream_tags TEXT[] NOT NULL,               -- Array of ('bsc-maths', 'bsc-bio', 'ba-arts')
  salary_band TEXT NOT NULL,
  exam_frequency TEXT NOT NULL,
  syllabus_overlap_pct INT NOT NULL CHECK (syllabus_overlap_pct BETWEEN 0 AND 100),
  tagline_en TEXT NOT NULL,
  tagline_hi TEXT NOT NULL,
  conducting_body TEXT NOT NULL,
  eligibility JSONB NOT NULL,
  selection_stages JSONB NOT NULL,
  highlights TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_careers_streams ON careers USING GIN(stream_tags);
CREATE INDEX IF NOT EXISTS idx_careers_category ON careers(category);

-- ============================================================================
-- 7. STUDENTS TABLE (Strict Individual Row Protection)
-- ============================================================================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID,                         -- Links with auth.users(id)
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  college TEXT NOT NULL,
  stream TEXT NOT NULL CHECK (stream IN ('bsc-maths', 'bsc-bio', 'ba-arts')),
  semester INT NOT NULL CHECK (semester BETWEEN 1 AND 6),
  selected_subjects TEXT[] DEFAULT '{}',
  preferred_medium TEXT NOT NULL CHECK (preferred_medium IN ('en', 'hi')),
  target_goal TEXT,
  source TEXT DEFAULT 'direct',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);
CREATE INDEX IF NOT EXISTS idx_students_stream_sem ON students(stream, semester);

-- Backward-compatibility alias view / table
CREATE TABLE IF NOT EXISTS student_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id UUID,
  name TEXT NOT NULL,
  email TEXT UNIQUE,
  college TEXT NOT NULL,
  stream TEXT NOT NULL CHECK (stream IN ('bsc-maths', 'bsc-bio', 'ba-arts')),
  semester INT NOT NULL CHECK (semester BETWEEN 1 AND 6),
  selected_subjects TEXT[] DEFAULT '{}',
  preferred_medium TEXT NOT NULL CHECK (preferred_medium IN ('en', 'hi')),
  target_goal TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- 8. SYLLABUS TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS syllabus (
  id TEXT PRIMARY KEY,                       -- e.g. 'syl-phy-201'
  subject_code TEXT NOT NULL,
  stream TEXT NOT NULL CHECK (stream IN ('bsc-maths', 'bsc-bio', 'ba-arts')),
  semester INT NOT NULL CHECK (semester BETWEEN 1 AND 6),
  title_en TEXT NOT NULL,
  title_hi TEXT,
  official_pdf_url TEXT,
  units JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_syllabus_stream_sem ON syllabus(stream, semester);

-- ============================================================================
-- 9. ACADEMIC NOTES TABLE
-- ============================================================================
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,                       -- e.g. 'note-phy-01'
  subject_code TEXT NOT NULL,
  title TEXT NOT NULL,
  unit_number INT CHECK (unit_number BETWEEN 1 AND 5),
  language TEXT DEFAULT 'Hindi/English',
  file_url TEXT NOT NULL,
  file_size TEXT,
  downloads_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notes_subject ON notes(subject_code);

-- ============================================================================
-- 10. EXAM NIGHT SAVED VAULT (Bookmarks & Personal Notes)
-- ============================================================================
CREATE TABLE IF NOT EXISTS saved_bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  item_id TEXT NOT NULL,
  item_type TEXT NOT NULL CHECK (item_type IN ('pyq', 'lecture', 'career', 'topic', 'notes')),
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  subtitle_en TEXT,
  subtitle_hi TEXT,
  tag TEXT,
  link_url TEXT NOT NULL,
  notes TEXT,
  is_mastered BOOLEAN DEFAULT FALSE,
  saved_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_saved_student ON saved_bookmarks(student_id);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE pyqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE lectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE syllabus ENABLE ROW LEVEL SECURITY;

ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE units ENABLE ROW LEVEL SECURITY;
ALTER TABLE topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE careers ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_bookmarks ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 1. Public Read-Only Access for syllabus, notes, pyqs, and lectures
-- (Strict: NO public INSERT, UPDATE, or DELETE permitted)
-- ----------------------------------------------------------------------------
CREATE POLICY "Public read-only access for syllabus" ON syllabus FOR SELECT USING (true);
CREATE POLICY "Public read-only access for notes" ON notes FOR SELECT USING (true);
CREATE POLICY "Public read-only access for pyqs" ON pyqs FOR SELECT USING (true);
CREATE POLICY "Public read-only access for lectures" ON lectures FOR SELECT USING (true);

-- Auxiliary curriculum read-only policies
CREATE POLICY "Allow public read access for subjects" ON subjects FOR SELECT USING (true);
CREATE POLICY "Allow public read access for units" ON units FOR SELECT USING (true);
CREATE POLICY "Allow public read access for topics" ON topics FOR SELECT USING (true);
CREATE POLICY "Allow public read access for careers" ON careers FOR SELECT USING (true);

-- ----------------------------------------------------------------------------
-- 2. Service-Role / Authenticated Admin Full Write Access
-- (Only admin / service-role can create, update, or delete curriculum content)
-- ----------------------------------------------------------------------------
CREATE POLICY "Admin full write access on syllabus" ON syllabus FOR ALL TO service_role USING (true);
CREATE POLICY "Admin full write access on notes" ON notes FOR ALL TO service_role USING (true);
CREATE POLICY "Admin full write access on pyqs" ON pyqs FOR ALL TO service_role USING (true);
CREATE POLICY "Admin full write access on lectures" ON lectures FOR ALL TO service_role USING (true);
CREATE POLICY "Admin full write access on subjects" ON subjects FOR ALL TO service_role USING (true);
CREATE POLICY "Admin full write access on units" ON units FOR ALL TO service_role USING (true);
CREATE POLICY "Admin full write access on topics" ON topics FOR ALL TO service_role USING (true);
CREATE POLICY "Admin full write access on careers" ON careers FOR ALL TO service_role USING (true);

-- ----------------------------------------------------------------------------
-- 3. Strict Student Row-Level Security
-- Users can only insert, read, and update their own row (auth.uid() = id).
-- Only service-role / admin can read the full student list.
-- ----------------------------------------------------------------------------
CREATE POLICY "Students insert own profile" ON students FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Students read own profile" ON students FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Students update own profile" ON students FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Full student list access strictly restricted to admin / service-role
CREATE POLICY "Admin full access on students list" ON students FOR ALL TO service_role USING (true);

-- Student profiles alias policies
CREATE POLICY "Allow individual student access student_profiles" ON student_profiles FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Allow service role on student_profiles" ON student_profiles FOR ALL TO service_role USING (true);

-- Bookmarks: individual student row access
CREATE POLICY "Students manage own bookmarks" ON saved_bookmarks FOR ALL USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);
CREATE POLICY "Allow service role all on saved_bookmarks" ON saved_bookmarks FOR ALL TO service_role USING (true);

-- ============================================================================
-- SEED DATA: INITIAL HIGH-YIELD SDSUV CURRICULUM
-- ============================================================================
INSERT INTO subjects (id, code, name_en, name_hi, stream, credits, semester, current_topic_en, current_topic_hi, color, icon_name)
VALUES
  ('SDSUV-PHY-201', 'PHY-201', 'Modern Optics & Quantum Mechanics', 'आधुनिक प्रकाशिकी एवं क्वांटम यांत्रिकी', 'bsc-maths', 4, 4, 'Unit 1: Newton Rings & Thin Film Interference', 'इकाई 1: न्यूटन वलय एवं व्यतिकरण', 'cyan', 'Atom'),
  ('SDSUV-MTH-201', 'MTH-201', 'Linear Algebra & Differential Equations', 'रैखिक बीजगणित एवं अवकल समीकरण', 'bsc-maths', 4, 4, 'Unit 2: Stokes Theorem & Eigenvalues', 'इकाई 2: स्टोक्स प्रमेय एवं आइगेनमान', 'violet', 'Binary'),
  ('SDSUV-BOT-201', 'BOT-201', 'Plant Ecology & Taxonomy', 'पादप पारिस्थितिकी एवं वर्गिकी', 'bsc-bio', 4, 4, 'Unit 3: Kranz Anatomy & C4 Pathway', 'इकाई 3: क्रैंज शारीरिकी एवं C4 चक्र', 'emerald', 'Leaf'),
  ('SDSUV-HIS-201', 'HIS-201', 'Ancient & Medieval History of India', 'भारत का प्राचीन एवं मध्यकालीन इतिहास', 'ba-arts', 4, 4, 'Unit 1: Treaty of Sagauli 1815 & Garhwal Forts', 'इकाई 1: सुगौली की संधि 1815 एवं गढ़वाल दुर्ग', 'amber', 'Landmark')
ON CONFLICT (id) DO NOTHING;

INSERT INTO pyqs (id, stream, subject_code, subject_name_en, subject_name_hi, chapter_en, chapter_hi, topic_en, topic_hi, question_en, question_hi, marks, section, type, solution_en, solution_hi, examiner_rubric, years_appeared, repeated_count, frequency_tag)
VALUES
  (
    'pyq-p-01',
    'bsc-maths',
    'SDSUV-PHY-201',
    'Physics (Optics & Quantum Mechanics)',
    'भौतिकी (प्रकाशिकी एवं क्वांटम यांत्रिकी)',
    'Unit 1: Interference in Thin Films',
    'इकाई 1: पतली फिल्मों में व्यतिकरण',
    'Newton Rings & Diameter Derivations',
    'न्यूटन वलय एवं व्यास व्युत्पत्ति',
    'State the principle of division of amplitude. Derive the formula for diameters of dark and bright rings in Newton rings by reflected light: D_n² = 4nλR. Why is the central fringe dark in reflected light?',
    'आयाम विभाजन का सिद्धांत लिखिए। परावर्तित प्रकाश में न्यूटन वलय के अदीप्त एवं दीप्त वलयों के व्यास का सूत्र D_n² = 4nλR व्युत्पन्न कीजिए। परावर्तित प्रकाश में केंद्रीय फ्रिंज अदीप्त क्यों होती है?',
    15,
    'C',
    'Long',
    '1. Principle of Division of Amplitude explanation (2M).\n2. Optical Path Difference Δ = 2μt cos(r) + λ/2 (3M).\n3. Dark Ring Condition: 2μt cos(r) = nλ => D_n² = 4nλR (5M).\n4. Bright Ring Condition: D_n² = 2(2n-1)λR (3M).\n5. Central Dark Spot: Stokes phase reversal of π on glass reflection (2M).',
    '1. आयाम विभाजन सिद्धांत (2 अंक)।\n2. पथांतर समीकरण Δ = 2μt cos(r) + λ/2 (3 अंक)।\n3. अदीप्त वलय प्रतिबंध D_n² = 4nλR (5 अंक)।\n4. दीप्त वलय प्रतिबंध (3 अंक)।\n5. केंद्रीय बिंदु का अदीप्त होना: कांच की सतह से परावर्तन पर π का कलान्तर (2 अंक)।',
    ARRAY['Division of amplitude principle stated correctly (2 Marks)', 'Path difference formula Δ = 2μt cos r + λ/2 derived (3 Marks)', 'Geometric proof linking sagitta and diameter r² = 2Rt (3 Marks)', 'Proof that Dn ∝ √n for dark rings (4 Marks)', 'Explanation of Stokes phase reversal at rarer-denser interface (3 Marks)'],
    ARRAY[2024, 2022, 2021],
    3,
    '🔥 Repeated 5+ Times'
  )
ON CONFLICT (id) DO NOTHING;
