# 🏔️ SDSUV Nexus: Production Setup & Supabase Integration Guide

This guide walks you through connecting your **SDSUV Nexus** web app to a free **Supabase (PostgreSQL)** cloud database and installing the Progressive Web App (PWA) on mobile phones.

---

## ⚡ Part 1: Connect Your Free Supabase Database in 3 Minutes

The application is built with a dual-engine architecture:
* **Default Mode (Current)**: High-speed `localStorage` engine with JSON export/restore.
* **Cloud Mode (Instant)**: The moment you paste your Supabase keys into `.env.local`, the app automatically switches to live cloud PostgreSQL queries.

### Step 1: Create a Free Project on Supabase
1. Head over to [supabase.com](https://supabase.com) and sign in (or create a free account).
2. Click **"New Project"**.
3. Fill in:
   - **Name**: `sdsuv-nexus-portal`
   - **Database Password**: Choose a strong password and save it securely.
   - **Region**: Choose **South Asia (Mumbai) - ap-south-1** for the lowest latency in Uttarakhand/India.
4. Click **"Create new project"** (takes ~60 seconds to provision).

---

### Step 2: Run `schema.sql` in the SQL Editor
1. In your Supabase Dashboard sidebar, click the **SQL Editor** tab (the `>_` terminal icon).
2. Click **"New query"**.
3. Open [`schema.sql`](file:///c:/Users/banga/Desktop/Antigravity/schema.sql) in your code editor, copy the entire file contents, and paste it into the Supabase SQL Editor.
4. Click **"Run"** (green button).

**What gets created:**
* ✅ `subjects` table (stream, semester, credits, colors)
* ✅ `units` table (Unit 1 to Unit 5 per NEP 2020)
* ✅ `topics` table (chapters, bilingual titles, YouTube IDs, revision notes)
* ✅ `lectures` table (channel name, video duration, `language_tag`)
* ✅ `pyqs` table (dual-language English & Hindi questions, 2/5/10/15 marks, years appeared, rubrics)
* ✅ `careers` table (`stream_tags`, salary bands, eligibility matrices, hill quota relaxations)
* ✅ `student_profiles` & `saved_bookmarks` tables
* ✅ Row Level Security (RLS) policies allowing public read access and student personalization.

---

### Step 3: Copy Your API Keys to `.env.local`
1. In your Supabase Dashboard, click on **Project Settings** (gear icon in sidebar) $\rightarrow$ **API**.
2. Find the **Project URL** and **Project API keys** (`anon` public key).
3. In the root of your project directory (`c:\Users\banga\Desktop\Antigravity`), create or edit a file named `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

4. Restart your development server (`npm run dev`) or rebuild (`npm run build`).
5. **Done!** The app will now communicate directly with your Supabase cloud PostgreSQL tables.

---

## 📲 Part 2: Installing SDSUV Nexus as a Mobile PWA

SDSUV Nexus is fully configured as a Progressive Web App (PWA) with offline caching and native app shell rendering.

### On Android (Chrome, Edge, Samsung Internet)
1. Open [`http://localhost:3000`](http://localhost:3000) (or your deployed production URL) on your phone.
2. An illuminated **"📲 Install SDSUV App"** button is pinned to the top navigation bar.
3. Tap it and select **"Install"**.
4. The SDSUV crest icon will appear on your phone's home screen. When launched, it opens in full-screen standalone mode with no browser address bars!

### On iPhone / iPad (Safari)
1. Open your portal URL in **Safari**.
2. Tap the **Share icon** (square with an arrow pointing upward $\Box \uparrow$).
3. Scroll down and tap **"Add to Home Screen"** (➕).
4. Tap **"Add"** in the top right.
5. The app launches with seamless standalone iOS view, customized splash screen, and offline shell caching.

---

## 🛠️ Part 3: Creator Studio (`/admin`) Zero-Code Operations

* Access the studio anytime at [`http://localhost:3000/admin`](http://localhost:3000/admin) with Master Passkey `sdsuv2026`.
* Upload new YouTube lectures with automatic thumbnail extraction.
* Add bilingual past exam questions with the **Bulk JSON Import** modal.
* Publish new career pathways with Uttarakhand hill physical relaxations.
* Use the **"Download Full Database JSON"** button to export complete curriculum backups at any time.
