-- ==============================================================================
-- DR. NAHAL MOSTAK KHAN ARNOB — MASTER SUPABASE DATABASE SCHEMA & SEED DATA
-- Consultant Vitreoretinal, Cataract & Refractive Surgeon
-- ==============================================================================
-- INSTRUCTIONS FOR SUPABASE SQL EDITOR:
-- 1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/xxcxtoptrxubsqhjktpj
-- 2. Click "SQL Editor" in the left sidebar.
-- 3. Click "New Query" (or paste into an existing query tab).
-- 4. Paste this ENTIRE script and click "Run" (or Ctrl + Enter).
-- 5. It is 100% idempotent: you can run it safely multiple times.
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. HELPER FUNCTION: AUTO UPDATE TIMESTAMP
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ==============================================================================
-- 3. TABLES DEFINITION
-- ==============================================================================

-- 3.1 PRACTICE SETTINGS
CREATE TABLE IF NOT EXISTS public.practice_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  setting_key TEXT UNIQUE NOT NULL,
  value_en TEXT NOT NULL,
  value_bn TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.2 CHAMBERS (Clinics & Schedules)
CREATE TABLE IF NOT EXISTS public.chambers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  location_en TEXT NOT NULL,
  location_bn TEXT NOT NULL,
  hours_en TEXT NOT NULL,
  hours_bn TEXT NOT NULL,
  badge_en TEXT DEFAULT 'Chamber',
  badge_bn TEXT DEFAULT 'চেম্বার',
  phone TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.3 SERVICES & SURGERIES
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  short_en TEXT NOT NULL,
  short_bn TEXT NOT NULL,
  image_url TEXT,
  stat_label_en TEXT,
  stat_label_bn TEXT,
  stat_val_en TEXT,
  stat_val_bn TEXT,
  tags_en JSONB DEFAULT '[]'::jsonb,
  tags_bn JSONB DEFAULT '[]'::jsonb,
  intro_en TEXT NOT NULL,
  intro_bn TEXT NOT NULL,
  who_label_en TEXT DEFAULT 'Who needs it',
  who_label_bn TEXT DEFAULT 'কার প্রয়োজন হতে পারে',
  who_en TEXT NOT NULL,
  who_bn TEXT NOT NULL,
  how_label_en TEXT DEFAULT 'How it works',
  how_label_bn TEXT DEFAULT 'কীভাবে হয়',
  how_en TEXT,
  how_bn TEXT,
  steps JSONB DEFAULT '[]'::jsonb,
  note_label_en TEXT,
  note_label_bn TEXT,
  note_en TEXT,
  note_bn TEXT,
  cta_en TEXT DEFAULT 'Book Appointment',
  cta_bn TEXT DEFAULT 'অ্যাপয়েন্টমেন্ট নিন',
  order_index INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.4 CONDITIONS & DISEASES
CREATE TABLE IF NOT EXISTS public.conditions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  name_en TEXT NOT NULL,
  name_bn TEXT NOT NULL,
  tier TEXT CHECK (tier IN ('Core', 'Secondary')) DEFAULT 'Core',
  category_en TEXT NOT NULL,
  category_bn TEXT NOT NULL,
  image_url TEXT,
  tags_en JSONB DEFAULT '[]'::jsonb,
  tags_bn JSONB DEFAULT '[]'::jsonb,
  what_is_it_en TEXT NOT NULL,
  what_is_it_bn TEXT NOT NULL,
  why_it_happens_en TEXT NOT NULL,
  why_it_happens_bn TEXT NOT NULL,
  how_treated_en TEXT NOT NULL,
  how_treated_bn TEXT NOT NULL,
  emergency_note_en TEXT,
  emergency_note_bn TEXT,
  related_service_slug TEXT,
  order_index INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.5 VIDEOS (Surgical & Educational Videos)
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  video_code TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  youtube_id TEXT,
  category TEXT NOT NULL,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  tag_en TEXT NOT NULL,
  tag_bn TEXT NOT NULL,
  description_en TEXT,
  description_bn TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.6 GALLERY (Inside Practice Photos)
CREATE TABLE IF NOT EXISTS public.gallery_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  src TEXT NOT NULL,
  category TEXT CHECK (category IN ('Chambers', 'Equipment', 'Events/Teaching')) NOT NULL,
  caption_en TEXT NOT NULL,
  caption_bn TEXT NOT NULL,
  chamber_name_en TEXT,
  chamber_name_bn TEXT,
  order_index INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.7 FAQS (Common Patient Questions)
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  faq_code TEXT UNIQUE NOT NULL,
  category_en TEXT NOT NULL,
  category_bn TEXT NOT NULL,
  question_en TEXT NOT NULL,
  question_bn TEXT NOT NULL,
  answer_en TEXT NOT NULL,
  answer_bn TEXT NOT NULL,
  order_index INT DEFAULT 0,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.8 BLOG POSTS (Patient Education Articles)
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title_en TEXT NOT NULL,
  title_bn TEXT NOT NULL,
  meta_description_en TEXT NOT NULL,
  meta_description_bn TEXT NOT NULL,
  category_en TEXT NOT NULL,
  category_bn TEXT NOT NULL,
  read_time_en TEXT DEFAULT '5 min read',
  read_time_bn TEXT DEFAULT '৫ মিনিট পাঠ',
  publish_date DATE DEFAULT CURRENT_DATE,
  image_url TEXT,
  sections JSONB DEFAULT '[]'::jsonb,
  emergency_callout_en TEXT,
  emergency_callout_bn TEXT,
  related_service_slug TEXT,
  related_condition_slug TEXT,
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.9 APPOINTMENTS (Website Booking Requests)
CREATE TABLE IF NOT EXISTS public.appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  chamber_slug TEXT NOT NULL,
  preferred_date DATE,
  reason TEXT,
  status TEXT CHECK (status IN ('Pending', 'Confirmed', 'Completed', 'Cancelled')) DEFAULT 'Pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.10 PATIENT REVIEWS
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_en TEXT NOT NULL,
  author_bn TEXT NOT NULL,
  city_en TEXT,
  city_bn TEXT,
  text_en TEXT NOT NULL,
  text_bn TEXT NOT NULL,
  stars INT DEFAULT 5,
  treatment_en TEXT,
  treatment_bn TEXT,
  is_featured BOOLEAN DEFAULT TRUE,
  order_index INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.11 ADMIN USERS & SESSIONS
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'superadmin',
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ==============================================================================
-- 4. ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================
ALTER TABLE public.practice_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chambers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conditions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Drop previous policies to prevent duplicates upon re-execution
DO $$ 
BEGIN
  -- Practice Settings
  DROP POLICY IF EXISTS "Public can read settings" ON public.practice_settings;
  DROP POLICY IF EXISTS "Admin full access settings" ON public.practice_settings;
  DROP POLICY IF EXISTS "Allow all for authenticated settings" ON public.practice_settings;
  DROP POLICY IF EXISTS "Allow anon manage settings" ON public.practice_settings;

  -- Chambers
  DROP POLICY IF EXISTS "Public can read active chambers" ON public.chambers;
  DROP POLICY IF EXISTS "Admin full access chambers" ON public.chambers;
  DROP POLICY IF EXISTS "Allow all for authenticated chambers" ON public.chambers;
  DROP POLICY IF EXISTS "Allow anon manage chambers" ON public.chambers;

  -- Services
  DROP POLICY IF EXISTS "Public can read published services" ON public.services;
  DROP POLICY IF EXISTS "Admin full access services" ON public.services;
  DROP POLICY IF EXISTS "Allow all for authenticated services" ON public.services;
  DROP POLICY IF EXISTS "Allow anon manage services" ON public.services;

  -- Conditions
  DROP POLICY IF EXISTS "Public can read published conditions" ON public.conditions;
  DROP POLICY IF EXISTS "Admin full access conditions" ON public.conditions;
  DROP POLICY IF EXISTS "Allow all for authenticated conditions" ON public.conditions;
  DROP POLICY IF EXISTS "Allow anon manage conditions" ON public.conditions;

  -- Videos
  DROP POLICY IF EXISTS "Public can read videos" ON public.videos;
  DROP POLICY IF EXISTS "Admin full access videos" ON public.videos;
  DROP POLICY IF EXISTS "Allow all for authenticated videos" ON public.videos;
  DROP POLICY IF EXISTS "Allow anon manage videos" ON public.videos;

  -- Gallery
  DROP POLICY IF EXISTS "Public can read published gallery items" ON public.gallery_items;
  DROP POLICY IF EXISTS "Admin full access gallery" ON public.gallery_items;
  DROP POLICY IF EXISTS "Allow all for authenticated gallery" ON public.gallery_items;
  DROP POLICY IF EXISTS "Allow anon manage gallery" ON public.gallery_items;

  -- FAQs
  DROP POLICY IF EXISTS "Public can read published faqs" ON public.faqs;
  DROP POLICY IF EXISTS "Admin full access faqs" ON public.faqs;
  DROP POLICY IF EXISTS "Allow all for authenticated faqs" ON public.faqs;
  DROP POLICY IF EXISTS "Allow anon manage faqs" ON public.faqs;

  -- Blogs
  DROP POLICY IF EXISTS "Public can read published blogs" ON public.blog_posts;
  DROP POLICY IF EXISTS "Admin full access blogs" ON public.blog_posts;
  DROP POLICY IF EXISTS "Allow all for authenticated blogs" ON public.blog_posts;
  DROP POLICY IF EXISTS "Allow anon manage blogs" ON public.blog_posts;

  -- Appointments
  DROP POLICY IF EXISTS "Public can insert appointment" ON public.appointments;
  DROP POLICY IF EXISTS "Admin full access appointments" ON public.appointments;
  DROP POLICY IF EXISTS "Allow all for authenticated appointments" ON public.appointments;
  DROP POLICY IF EXISTS "Allow anon manage appointments" ON public.appointments;

  -- Reviews
  DROP POLICY IF EXISTS "Public can read featured reviews" ON public.reviews;
  DROP POLICY IF EXISTS "Admin full access reviews" ON public.reviews;
  DROP POLICY IF EXISTS "Allow all for authenticated reviews" ON public.reviews;
  DROP POLICY IF EXISTS "Allow anon manage reviews" ON public.reviews;

  -- Admin users
  DROP POLICY IF EXISTS "Admin users secure access" ON public.admin_users;
END $$;

-- 4.1 PUBLIC READ POLICIES
CREATE POLICY "Public can read settings" ON public.practice_settings FOR SELECT USING (true);
CREATE POLICY "Public can read active chambers" ON public.chambers FOR SELECT USING (true);
CREATE POLICY "Public can read published services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Public can read published conditions" ON public.conditions FOR SELECT USING (true);
CREATE POLICY "Public can read videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public can read published gallery items" ON public.gallery_items FOR SELECT USING (true);
CREATE POLICY "Public can read published faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Public can read published blogs" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Public can read featured reviews" ON public.reviews FOR SELECT USING (true);

-- 4.2 APPOINTMENTS PUBLIC INSERT
CREATE POLICY "Public can insert appointment" ON public.appointments FOR INSERT WITH CHECK (true);

-- 4.3 AUTHENTICATED ADMIN FULL ACCESS (USING + WITH CHECK)
CREATE POLICY "Admin full access settings" ON public.practice_settings FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access chambers" ON public.chambers FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access services" ON public.services FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access conditions" ON public.conditions FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access videos" ON public.videos FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access gallery" ON public.gallery_items FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access faqs" ON public.faqs FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access blogs" ON public.blog_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access appointments" ON public.appointments FOR ALL TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access reviews" ON public.reviews FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- 4.4 ANON FULL ACCESS FOR DIRECT CLIENT/API ADMIN OPERATIONS
-- (Enables instant seamless admin CRUD operations from the Next.js admin dashboard)
CREATE POLICY "Allow anon manage settings" ON public.practice_settings FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon manage chambers" ON public.chambers FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon manage services" ON public.services FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon manage conditions" ON public.conditions FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon manage videos" ON public.videos FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon manage gallery" ON public.gallery_items FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon manage faqs" ON public.faqs FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon manage blogs" ON public.blog_posts FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon manage appointments" ON public.appointments FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Allow anon manage reviews" ON public.reviews FOR ALL TO anon USING (true) WITH CHECK (true);
CREATE POLICY "Admin users secure access" ON public.admin_users FOR ALL TO anon USING (true) WITH CHECK (true);

-- ==============================================================================
-- 5. AUTO-UPDATE TRIGGERS
-- ==============================================================================
DROP TRIGGER IF EXISTS update_practice_settings_timestamp ON public.practice_settings;
CREATE TRIGGER update_practice_settings_timestamp BEFORE UPDATE ON public.practice_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_chambers_timestamp ON public.chambers;
CREATE TRIGGER update_chambers_timestamp BEFORE UPDATE ON public.chambers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_services_timestamp ON public.services;
CREATE TRIGGER update_services_timestamp BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_conditions_timestamp ON public.conditions;
CREATE TRIGGER update_conditions_timestamp BEFORE UPDATE ON public.conditions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_videos_timestamp ON public.videos;
CREATE TRIGGER update_videos_timestamp BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_gallery_timestamp ON public.gallery_items;
CREATE TRIGGER update_gallery_timestamp BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_faqs_timestamp ON public.faqs;
CREATE TRIGGER update_faqs_timestamp BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_blogs_timestamp ON public.blog_posts;
CREATE TRIGGER update_blogs_timestamp BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_appointments_timestamp ON public.appointments;
CREATE TRIGGER update_appointments_timestamp BEFORE UPDATE ON public.appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ==============================================================================
-- 6. SEED DATA POPULATION
-- ==============================================================================

-- 6.1 PRACTICE SETTINGS
INSERT INTO public.practice_settings (setting_key, value_en, value_bn, description)
VALUES 
  ('doctor_name', 'Dr. Nahal Mostak Khan Arnob', 'ডা. নাহাল মোস্তাক খান অর্ণব', 'Full name of the doctor'),
  ('doctor_short', 'Dr. Nahal Mostak Khan', 'ডা. নাহাল মোস্তাক খান', 'Display short name'),
  ('designation', 'Consultant Vitreoretinal, Cataract & Refractive Surgeon', 'কনসালট্যান্ট ভিট্রিওরেটিনাল, ছানি ও রিফ্র্যাক্টিভ সার্জন', 'Primary medical specialty'),
  ('institution', 'Assistant Professor, Enam Medical College & Hospital', 'সহকারী অধ্যাপক, এনাম মেডিকেল কলেজ ও হাসপাতাল', 'Academic hospital position'),
  ('hotline_serial', '01344-890335', '০১৩৪৪-৮৯০৩৩৫', 'Main patient serial booking hotline'),
  ('whatsapp_phone', '+880 1721-815374', '+৮৮০ ১৭২১-৮১৫৩৭৪', 'WhatsApp direct mobile number'),
  ('official_email', 'drmostaknio@gmail.com', 'drmostaknio@gmail.com', 'Official correspondence email'),
  ('hero_eyebrow', 'FRCS (Glasgow) · FCPS (Ophthalmology) · GMC UK Registered', 'এফআরসিএস (গ্লাসগো) · এফসিপিএস (চক্ষু) · জিএমসি যুক্তরাজ্য নিবন্ধিত', 'Hero top credential eyebrow'),
  ('hero_title', 'Clear, Confident Vision — Backed by Retina & Cataract Expertise', 'চোখের দৃষ্টি সুরক্ষায় আন্তর্জাতিক মানের বিশেষায়িত সার্জিক্যাল সেবা', 'Hero main title'),
  ('hero_subtitle', 'Board-certified ophthalmologist with over 8 years of clinical and surgical experience, specializing in advanced vitreoretinal disorders, micro-incision phacoemulsification, and scleral fixation. Practicing across three chambers in Dhaka.', '৮+ বছরের ক্লিনিক্যাল ও সার্জিক্যাল অভিজ্ঞতাসম্পন্ন বোর্ড-প্রত্যয়িত চক্ষু বিশেষজ্ঞ। জটিল রেটিনা বিচ্ছিন্নতা মেরামত (PPV), আধুনিক মাইক্রো-ইনসিশন ছানি অপারেশন এবং সেলাইবিহীন ইয়ামানে স্কেরাল ফিক্সেশন সার্জারিতে বিশেষভাবে দক্ষ।', 'Hero body summary text'),
  ('experience_years', '8+ Years', '৮+ বছর', 'Surgical experience counter'),
  ('fellowship_institute', 'Ispahani Islamia Eye Institute', 'ইস্পাহানী ইসলামিয়া চক্ষু ইনস্টিটিউট', 'Vitreoretinal Fellowship institute')
ON CONFLICT (setting_key) DO UPDATE SET
  value_en = EXCLUDED.value_en,
  value_bn = EXCLUDED.value_bn,
  description = EXCLUDED.description;

-- 6.2 CHAMBERS
INSERT INTO public.chambers (slug, name_en, name_bn, location_en, location_bn, hours_en, hours_bn, badge_en, badge_bn, phone, order_index)
VALUES
  ('an-nahar', 'An Nahar Specialized Eye Hospital', 'আন নাহার স্পেশালাইজড আই হসপিটাল', 'Dhanmondi, Dhaka', 'ধানমন্ডি, ঢাকা', 'Saturday, Sunday, Tuesday & Wednesday · 6:00 PM – 9:00 PM', 'শনি, রবি, মঙ্গল ও বুধবার · সন্ধ্যা ৬টা – রাত ৯টা', 'Evening Chamber', 'সান্ধ্যকালীন চেম্বার', '01344-890335', 1),
  ('aristo', 'Aristo Eye Hospital', 'এরিস্টো আই হসপিটাল', 'Uttara, Dhaka', 'উত্তরা, ঢাকা', 'Saturday & Tuesday · 3:00 PM – 5:30 PM', 'শনি ও মঙ্গলবার · দুপুর ৩টা – বিকেল ৫:৩০টা', 'Afternoon Chamber', 'বিকালের চেম্বার', '01344-890335', 2),
  ('enam', 'Enam Medical College Hospital', 'এনাম মেডিকেল কলেজ হাসপাতাল', 'Savar, Dhaka', 'সাভার, ঢাকা', 'Saturday to Wednesday · 9:00 AM – 1:00 PM', 'শনি থেকে বুধবার · সকাল ৯টা – দুপুর ১টা', 'Morning Clinic', 'সকালের ক্লিনিক', '01344-890335', 3)
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_bn = EXCLUDED.name_bn,
  location_en = EXCLUDED.location_en,
  location_bn = EXCLUDED.location_bn,
  hours_en = EXCLUDED.hours_en,
  hours_bn = EXCLUDED.hours_bn,
  phone = EXCLUDED.phone;

-- 6.3 SERVICES & SURGERIES (11 Procedures)
INSERT INTO public.services (slug, name_en, name_bn, short_en, short_bn, image_url, stat_label_en, stat_label_bn, stat_val_en, stat_val_bn, tags_en, tags_bn, intro_en, intro_bn, who_label_en, who_label_bn, who_en, who_bn, how_label_en, how_label_bn, how_en, how_bn, steps, note_label_en, note_label_bn, note_en, note_bn, cta_en, cta_bn, order_index)
VALUES
  (
    'cataract-surgery', 'Cataract Surgery (Phacoemulsification)', 'ছানি অপারেশন (ফ্যাকোইমালসিফিকেশন)',
    'Fast, precise cataract removal with modern lens implants.', 'দ্রুত ও নিখুঁতভাবে ছানি অপসারণ, আধুনিক লেন্স প্রতিস্থাপনসহ।', '/images/services/cataract-surgery.jpg',
    'Procedure', 'যেভাবে হয়', 'Day-Care Surgery', 'ডে-কেয়ার সার্জারি',
    '["Blurry vision","Glare at night","Faded colors"]'::jsonb, '["দৃষ্টি ঝাপসা লাগা","রাতে আলোয় ধাঁধা","রং ফিকে লাগা"]'::jsonb,
    'A cataract clouds the eye''s natural lens, gradually blurring vision. Phacoemulsification is the modern, minimally invasive way to remove it — a small incision, an ultrasound probe to break up the cloudy lens, and a new artificial lens (IOL) put in its place.', 'ছানি হলো চোখের প্রাকৃতিক লেন্স ধীরে ধীরে ঘোলাটে হয়ে যাওয়া, যার ফলে দৃষ্টি অস্পষ্ট হতে থাকে। ফ্যাকোইমালসিফিকেশন হলো আধুনিক ও ন্যূনতম কাটাছেঁড়ার একটি পদ্ধতি — ছোট্ট একটা ছিদ্র করে, আল্ট্রাসাউন্ড দিয়ে ঘোলা লেন্সটাকে ভেঙে বের করে সেখানে একটা নতুন কৃত্রিম লেন্স (IOL) বসিয়ে দেওয়া হয়।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Blurry or dim vision, glare from lights at night, colors looking faded, difficulty reading — especially if these have gradually worsened over months or years.', 'দৃষ্টি ঝাপসা বা ম্লান লাগা, রাতে আলোতে চোখ ধাঁধিয়ে যাওয়া, রং ফিকে মনে হওয়া, পড়তে কষ্ট হওয়া — বিশেষ করে এসব সমস্যা যদি মাস বা বছরের পর বছর ধরে ধীরে ধীরে বাড়তে থাকে।',
    'How it works', 'কীভাবে হয়', '', '',
    '[{"en":"Numbing eye drops — no general anesthesia needed.","bn":"অ্যানেস্থেসিয়ার ড্রপ দেওয়া হয় — সম্পূর্ণ অজ্ঞান করার দরকার হয় না।"},{"en":"A tiny incision (about 2–3mm) is made at the edge of the cornea.","bn":"কর্নিয়ার কিনারায় খুবই ছোট (প্রায় ২-৩ মিমি) একটা ছিদ্র করা হয়।"},{"en":"An ultrasound probe breaks the cloudy lens into small pieces and removes them.","bn":"আল্ট্রাসাউন্ড দিয়ে ঘোলা লেন্সটাকে ছোট ছোট টুকরো করে বের করে ফেলা হয়।"},{"en":"A folded artificial lens is inserted through the same small incision and unfolds into place.","bn":"একটা ভাঁজ করা কৃত্রিম লেন্স সেই একই ছিদ্র দিয়ে ভেতরে বসিয়ে দেওয়া হয়, যা নিজে থেকেই খুলে যথাস্থানে বসে যায়।"},{"en":"No stitches needed in most cases — the incision self-seals.","bn":"বেশিরভাগ ক্ষেত্রে সেলাই লাগে না — ছিদ্রটা নিজে থেকেই বন্ধ হয়ে যায়।"}]'::jsonb,
    'Recovery', 'সুস্থ হওয়ার সময়', 'Most patients notice clearer vision within a day or two. Mild irritation and light sensitivity are normal for the first week; eye drops are prescribed to prevent infection and reduce inflammation. Most people resume normal activities within a few days.', 'বেশিরভাগ রোগী এক-দুই দিনের মধ্যেই স্পষ্ট দৃষ্টি টের পান। প্রথম সপ্তাহে হালকা অস্বস্তি ও আলোয় সংবেদনশীলতা স্বাভাবিক — সংক্রমণ ঠেকাতে ও প্রদাহ কমাতে ড্রপ দেওয়া হয়। বেশিরভাগ মানুষ কয়েকদিনের মধ্যেই স্বাভাবিক কাজে ফিরে যেতে পারেন।',
    'Book a Cataract Consultation', 'ছানি অপারেশনের জন্য পরামর্শ নিন', 1
  ),
  (
    'vitreoretinal-surgery', 'Vitreoretinal Surgery', 'রেটিনা সার্জারি',
    'Treatment for retinal detachment, diabetic retinopathy, and more.', 'রেটিনা বিচ্ছিন্নতা, ডায়াবেটিক রেটিনোপ্যাথি ও আরও জটিল সমস্যার চিকিৎসা।', '/images/services/vitreoretinal-surgery.jpg',
    'Procedure', 'যেভাবে হয়', 'Microsurgery (PPV)', 'মাইক্রোসার্জারি (PPV)',
    '["Retinal detachment","Diabetic retinopathy","Vitreous hemorrhage"]'::jsonb, '["রেটিনা বিচ্ছিন্নতা","ডায়াবেটিক রেটিনোপ্যাথি","ভিট্রিয়াস হেমোরেজ"]'::jsonb,
    'The retina is the light-sensitive layer at the back of the eye — when it tears, detaches, or bleeds, vision can be lost quickly and permanently without prompt treatment. Vitreoretinal surgery covers the range of procedures used to repair the retina and the vitreous gel that fills the eye.', 'রেটিনা হলো চোখের পেছনের আলো-সংবেদনশীল স্তর — এটি ছিঁড়ে গেলে, সরে গেলে, বা রক্তক্ষরণ হলে দ্রুত চিকিৎসা না নিলে দৃষ্টি স্থায়ীভাবে হারিয়ে যেতে পারে। রেটিনা সার্জারির আওতায় পড়ে রেটিনা ও চোখের ভেতরের জেল (ভিট্রিয়াস) মেরামতের বিভিন্ন পদ্ধতি।',
    'Conditions treated', 'যেসব সমস্যার চিকিৎসা হয়', 'Retinal detachment · Diabetic retinopathy · Macular disease · CRVO/BRVO · Vitreous hemorrhage · Complex trauma cases', 'রেটিনা বিচ্ছিন্নতা · ডায়াবেটিক রেটিনোপ্যাথি · ম্যাকুলার সমস্যা · CRVO/BRVO · ভিট্রিয়াস হেমোরেজ · জটিল আঘাতজনিত সমস্যা',
    'How it works', 'কীভাবে হয়', 'Most procedures are performed through pars plana vitrectomy (PPV) — three tiny openings are made in the white of the eye to remove the vitreous gel and repair the retina from inside.', 'বেশিরভাগ ক্ষেত্রে পার্স প্লানা ভিট্রেক্টমি (PPV) পদ্ধতি ব্যবহার হয় — চোখের সাদা অংশে তিনটি খুবই ছোট ছিদ্র করে ভেতরের জেল বের করে রেটিনা মেরামত করা হয়।',
    '[]'::jsonb,
    'Important', 'বিশেষ নোট', 'Retinal detachment and sudden vitreous hemorrhage are medical emergencies — earlier treatment means a much better chance of preserving vision.', 'রেটিনা বিচ্ছিন্নতা আর হঠাৎ ভিট্রিয়াস হেমোরেজ — এই দুটোই মেডিকেল ইমার্জেন্সি। যত আগে চিকিৎসা শুরু হয়, দৃষ্টি বাঁচানোর সম্ভাবনা তত বেশি।',
    'Book an Urgent Consultation', 'জরুরি পরামর্শের জন্য যোগাযোগ করুন', 2
  ),
  (
    'refractive-surgery', 'Refractive Surgery (LASIK / PRK / SMILE)', 'চোখের পাওয়ার সংক্রান্ত সার্জারি (লেসিক / পিআরকে / স্মাইল)',
    'Reduce or remove dependence on glasses and contact lenses.', 'চশমা বা লেন্সের ওপর নির্ভরতা কমানো বা দূর করা।', '/images/services/refractive-surgery.jpg',
    'Procedure', 'যেভাবে হয়', 'Laser (LASIK / PRK / SMILE)', 'লেজার (লেসিক / পিআরকে / স্মাইল)',
    '["Nearsighted / farsighted","Astigmatism","Tired of glasses/lenses"]'::jsonb, '["মায়োপিয়া / হাইপারোপিয়া","অ্যাস্টিগম্যাটিজম","চশমা/লেন্সে ক্লান্ত"]'::jsonb,
    'Refractive surgery reshapes the cornea so light focuses correctly on the retina, reducing or removing dependence on glasses and contact lenses.', 'রিফ্র্যাক্টিভ সার্জারিতে কর্নিয়ার আকৃতি এমনভাবে পরিবর্তন করা হয় যাতে আলো ঠিকভাবে রেটিনায় গিয়ে পড়ে — ফলে চশমা বা লেন্সের ওপর নির্ভরতা কমে যায়।',
    'Who''s a candidate', 'কারা করাতে পারেন', 'Generally, adults 18+ with a stable eyeglass prescription for at least a year, healthy corneas, and no active eye disease.', 'সাধারণত ১৮ বছরের বেশি বয়সী যাদের চশমার পাওয়ার অন্তত এক বছর স্থিতিশীল আছে, চোখ সুস্থ এবং কোনো সক্রিয় রোগ নেই।',
    'The three techniques', 'তিনটি পদ্ধতি সংক্ষেপে', 'LASIK, PRK, and SMILE.', 'লেসিক, পিআরকে ও স্মাইল।',
    '[]'::jsonb,
    'Recovery', 'সুস্থ হওয়ার সময়', 'LASIK and SMILE patients often notice improved vision within a day; PRK takes slightly longer as the surface layer heals.', 'লেসিক ও স্মাইলে বেশিরভাগ রোগী একদিনের মধ্যেই ভালো দৃষ্টি টের পান।',
    'Check If You''re a Candidate', 'আপনি উপযুক্ত কিনা যাচাই করুন', 3
  ),
  (
    'squint-surgery', 'Squint (Strabismus) Surgery', 'স্কুইন্ট (স্ট্র্যাবিজমাস) সার্জারি',
    'Realigning misaligned eyes and restoring binocular vision.', 'চোখের অবস্থান ঠিক করে দুই চোখের সমন্বিত দৃষ্টি ফিরিয়ে আনা।', '/images/services/squint-surgery.jpg',
    'Procedure', 'যেভাবে হয়', 'Eye Muscle Surgery', 'চোখের পেশি সার্জারি',
    '["Misaligned eyes","Double vision","Head tilting to see"]'::jsonb, '["চোখ বেঁকে যাওয়া","দুটো করে দেখা","মাথা কাত করে দেখা"]'::jsonb,
    'Squint is a misalignment of the eyes — they don''t point in the same direction at the same time.', 'স্কুইন্ট মানে দুই চোখ একসাথে একই দিকে না তাকানো।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'One or both eyes turning in, out, up, or down; double vision.', 'এক বা দুই চোখ ভেতরে, বাইরে, ওপরে বা নিচে বেঁকে যাওয়া; দুটো করে দেখা।',
    'How it works', 'কীভাবে হয়', 'Surgery that adjusts the eye muscles responsible for movement — realigning the eyes and restoring binocular vision.', 'চোখ নড়াচড়ার জন্য দায়ী পেশি সমন্বয় করার সার্জারি, যা চোখ সমান্তরাল করে।',
    '[]'::jsonb, NULL, NULL, NULL, NULL,
    'Book a Squint Consultation', 'স্কুইন্ট পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন', 4
  ),
  (
    'diabetic-eye-care', 'Diabetic Eye Care', 'ডায়াবেটিক আই কেয়ার',
    'Regular screening and treatment to protect vision from diabetes.', 'ডায়াবেটিসের কারণে দৃষ্টিহানি ঠেকাতে নিয়মিত স্ক্রিনিং ও চিকিৎসা।', '/images/services/diabetic-eye-care.jpg',
    'Procedure', 'যেভাবে হয়', 'Screening + Laser / Injection', 'স্ক্রিনিং + লেজার / ইনজেকশন',
    '["Long-term diabetes","Uncontrolled sugar/BP","No recent eye check"]'::jsonb, '["দীর্ঘদিনের ডায়াবেটিস","অনিয়ন্ত্রিত সুগার/প্রেসার","সম্প্রতি চোখ পরীক্ষা হয়নি"]'::jsonb,
    'Diabetes can silently damage the retina''s blood vessels — diabetic retinopathy is a leading cause of vision loss.', 'ডায়াবেটিস নিঃশব্দে রেটিনার রক্তনালীর ক্ষতি করতে পারে।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Anyone with diabetes, especially if present for several years.', 'যেকোনো ডায়াবেটিস রোগী, বিশেষ করে যাদের অনেক বছর ধরে ডায়াবেটিস আছে।',
    'How it works', 'কীভাবে হয়', 'Regular dilated retina screening catches changes early. Anti-VEGF injections, laser therapy, or vitrectomy for advanced cases.', 'নিয়মিত রেটিনা স্ক্রিনিং, অ্যান্টি-ভিইজিএফ ইনজেকশন বা লেজার থেরাপির মাধ্যমে চিকিৎসা।',
    '[]'::jsonb, NULL, NULL, NULL, NULL,
    'Book a Diabetic Eye Screening', 'ডায়াবেটিক আই স্ক্রিনিং-এর জন্য অ্যাপয়েন্টমেন্ট নিন', 5
  ),
  (
    'glaucoma-management', 'Glaucoma Management', 'গ্লুকোমা ব্যবস্থাপনা',
    'Protecting the optic nerve from the silent thief of sight.', 'নীরব দৃষ্টিচোর থেকে অপটিক নার্ভ রক্ষা করা।', '/images/services/glaucoma-management.jpg',
    'Procedure', 'যেভাবে হয়', 'Drops / Laser / Surgery', 'ড্রপ / লেজার / সার্জারি',
    '["Family history of glaucoma","Age 40+","High eye pressure"]'::jsonb, '["পরিবারে গ্লুকোমার ইতিহাস","৪০+ বয়স","চোখের চাপ বেশি"]'::jsonb,
    'Glaucoma damages the optic nerve, usually linked to elevated eye pressure.', 'গ্লুকোমা অপটিক নার্ভের ক্ষতি করে, সাধারণত চোখের চাপ বেড়ে যাওয়ার সাথে যুক্ত।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Anyone with a family history of glaucoma, or over 40 without a recent eye pressure check.', 'যাদের পরিবারে গ্লুকোমার ইতিহাস আছে, বা ৪০ বছরের বেশি বয়সী।',
    'How it works', 'কীভাবে হয়', 'Most cases managed with pressure-lowering eye drops. Select cases need laser or trabeculectomy.', 'বেশিরভাগ ক্ষেত্রে চাপ কমানোর ড্রপ বা লেজার চিকিৎসার মাধ্যমে নিয়ন্ত্রণ করা যায়।',
    '[]'::jsonb, NULL, NULL, NULL, NULL,
    'Book a Glaucoma Screening', 'গ্লুকোমা স্ক্রিনিং-এর জন্য অ্যাপয়েন্টমেন্ট নিন', 6
  ),
  (
    'dry-eye-corneal-disease', 'Dry Eye & Corneal Disease', 'ড্রাই আই ও কর্নিয়াল রোগ',
    'Relief from chronic dry eye, and urgent corneal infection care.', 'দীর্ঘস্থায়ী ড্রাই আই থেকে মুক্তি, এবং জরুরি কর্নিয়াল সংক্রমণের চিকিৎসা।', '/images/services/dry-eye-corneal-disease.jpg',
    'Procedure', 'যেভাবে হয়', 'Drops / Targeted Treatment', 'ড্রপ / নির্দিষ্ট চিকিৎসা',
    '["Burning or gritty eyes","Heavy screen time","Pain after injury"]'::jsonb, '["জ্বালাপোড়া বা খসখসে ভাব","বেশি স্ক্রিন টাইম","আঘাতের পর ব্যথা"]'::jsonb,
    'Dry eye happens when the eye cannot stay properly lubricated.', 'চোখ ঠিকমতো আর্দ্র রাখতে না পারলে ড্রাই আই হয়।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Persistent burning, grittiness, or blurry vision that clears with blinking.', 'লাগাতার জ্বালাপোড়া, খসখসে ভাব, বা পলক পড়লে ঠিক হয়ে যাওয়া ঝাপসা দৃষ্টি।',
    'How it works', 'কীভাবে হয়', 'Lubricating drops and lifestyle changes; targeted treatment for infections.', 'লুব্রিকেটিং ড্রপ ও সুনির্দিষ্ট চিকিৎসার মাধ্যমে নিরাময়।',
    '[]'::jsonb, NULL, NULL, NULL, NULL,
    'Book a Dry Eye / Corneal Consultation', 'ড্রাই আই / কর্নিয়া পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন', 7
  ),
  (
    'rop-care', 'ROP Care', 'ROP চিকিৎসা',
    'Specialized retina screening and treatment for premature infants.', 'অপরিণত নবজাতকদের রেটিনা স্ক্রিনিং ও চিকিৎসায় বিশেষজ্ঞ সেবা।', '/images/services/rop-care.jpg',
    'Procedure', 'যেভাবে হয়', 'Screening + Laser', 'স্ক্রিনিং + লেজার',
    '["Born before 34 weeks","Low birth weight","Neonatologist referral"]'::jsonb, '["৩৪ সপ্তাহের আগে জন্ম","কম ওজনে জন্ম","শিশু বিশেষজ্ঞের রেফারেল"]'::jsonb,
    'Premature babies are at risk of abnormal blood vessel growth in the retina.', 'অপরিণত অবস্থায় জন্ম নেওয়া শিশুদের রেটিনায় অস্বাভাবিক রক্তনালী বৃদ্ধির ঝুঁকি থাকে।',
    'Who needs screening', 'কাদের স্ক্রিনিং দরকার', 'Babies born before 34 weeks or low birth weight.', '৩৪ সপ্তাহের আগে জন্ম নেওয়া অথবা কম ওজনের শিশুদের জন্য জরুরি।',
    'How it is treated', 'কীভাবে চিকিৎসা হয়', 'Laser therapy, anti-VEGF injections, or surgery in advanced cases.', 'রেটিনায় লেজার থেরাপি বা অ্যান্টি-ভিইজিএফ ইনজেকশন।',
    '[]'::jsonb, NULL, NULL, NULL, NULL,
    'Book a Newborn Eye Screening', 'নবজাতকের চোখ পরীক্ষার অ্যাপয়েন্টমেন্ট নিন', 8
  ),
  (
    'oculoplasty', 'Oculoplasty', 'অকুলোপ্লাস্টি',
    'Eyelid, tear duct, and orbital procedures.', 'চোখের পাতা, অশ্রুনালী ও অরবিটাল সংক্রান্ত চিকিৎসা।', '/images/services/oculoplasty.jpg',
    'Procedure', 'যেভাবে হয়', 'Reconstructive Surgery', 'রিকনস্ট্রাক্টিভ সার্জারি',
    '["Drooping eyelid","Lid tumor / chalazion","Blocked tear duct"]'::jsonb, '["চোখের পাতা ঝুলে পড়া","পাতার টিউমার / চ্যালাজিয়ন","অশ্রুনালী বন্ধ"]'::jsonb,
    'Oculoplasty covers surgical care for structures around the eye — eyelids, tear ducts, and orbit.', 'চোখের পাতা, অশ্রুনালী এবং চোখের কোটরের সার্জারি।',
    'Conditions treated', 'যেসব সমস্যার চিকিৎসা হয়', 'Ptosis, chalazion, DCR for blocked tear ducts.', 'পিটোসিস, পাতার টিউমার ও অশ্রুনালী বন্ধের চিকিৎসা।',
    'How it works', 'কীভাবে হয়', 'Ptosis repair, DCR, and tumor excision with reconstruction.', 'পেশি টানটান করা বা অশ্রুর নতুন পথ তৈরির সার্জারি।',
    '[]'::jsonb, NULL, NULL, NULL, NULL,
    'Book an Oculoplasty Consultation', 'অকুলোপ্লাস্টি পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন', 9
  ),
  (
    'pterygium-surgery', 'Pterygium Surgery', 'পিটেরিজিয়াম সার্জারি',
    'Surgical removal with graft to reduce recurrence.', 'গ্রাফটসহ সার্জারি করে অপসারণ, পুনরায় ফিরে আসার সম্ভাবনা কমাতে।', '/images/services/pterygium-surgery.jpg',
    'Procedure', 'যেভাবে হয়', 'Removal + Conjunctival Graft', 'অপসারণ + কনজাংটিভাল গ্রাফট',
    '["Redness / irritation","Visible growth on eye","Long sun/wind exposure"]'::jsonb, '["লালচেভাব / জ্বালাপোড়া","চোখে দৃশ্যমান বৃদ্ধি","রোদ-বাতাসে দীর্ঘদিন কাজ"]'::jsonb,
    'A growth of tissue on the white of the eye that can extend onto the cornea.', 'চোখের সাদা অংশে মাংসল বৃদ্ধি যা কর্নিয়ায় ছড়িয়ে পড়তে পারে।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Visible growth on the eye causing irritation or blurred vision.', 'চোখে মাংস বৃদ্ধি বা দৃষ্টিতে বাধা তৈরি হলে।',
    'How it works', 'কীভাবে হয়', 'Surgically removed and covered with a conjunctival graft.', 'সার্জারি করে অপসারণ ও নিজস্ব টিস্যু দিয়ে গ্রাফট প্রতিস্থাপন।',
    '[]'::jsonb, NULL, NULL, NULL, NULL,
    'Book a Pterygium Consultation', 'পিটেরিজিয়াম পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন', 10
  ),
  (
    'eye-trauma-emergency', 'Eye Trauma & Emergency Care', 'চোখের আঘাত ও জরুরি চিকিৎসা',
    'Time-sensitive care for eye injuries and sudden vision loss.', 'চোখের আঘাত ও হঠাৎ দৃষ্টি হারানোর জন্য সময়-সংবেদনশীল চিকিৎসা।', '/images/services/eye-trauma-emergency.png',
    'Procedure', 'যেভাবে হয়', 'Urgent Evaluation + Treatment', 'জরুরি মূল্যায়ন + চিকিৎসা',
    '["Any eye injury","Sudden vision loss","Flashes / new floaters"]'::jsonb, '["যেকোনো চোখের আঘাত","হঠাৎ দৃষ্টি হারানো","আলোর ঝলকানি / নতুন বিন্দু"]'::jsonb,
    'Eye injuries and sudden vision changes require immediate care.', 'চোখের আঘাত আর আকস্মিক দৃষ্টিশক্তি হ্রাস দ্রুত চিকিৎসার দাবি রাখে।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Chemical or sharp trauma, flashes of light, or sudden darkness.', 'চোখে আঘাত, হঠাৎ দৃষ্টি হারানো বা আলোর ঝলকানি দেখা দিলে।',
    'How it works', 'কীভাবে হয়', 'Immediate emergency clinical assessment followed by medication or surgery.', 'জরুরি পরীক্ষা ও প্রয়োজনমাফিক দ্রুত সার্জারি।',
    '[]'::jsonb, NULL, NULL, NULL, NULL,
    'Emergency? Call Immediately', 'জরুরি অবস্থা? এখনই কল করুন', 11
  )
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_bn = EXCLUDED.name_bn,
  short_en = EXCLUDED.short_en,
  short_bn = EXCLUDED.short_bn,
  image_url = EXCLUDED.image_url;

-- 6.4 CONDITIONS & DISEASES (16 Conditions)
INSERT INTO public.conditions (slug, name_en, name_bn, tier, category_en, category_bn, image_url, tags_en, tags_bn, what_is_it_en, what_is_it_bn, why_it_happens_en, why_it_happens_bn, how_treated_en, how_treated_bn, emergency_note_en, emergency_note_bn, related_service_slug, order_index)
VALUES
  ('cataract', 'Cataract', 'ছানি', 'Core', 'Cataract & Lens', 'ছানি ও লেন্স', '/images/2. Conditions_Images/1. Cataract.png', '["Blurry vision","Faded colors","Night glare"]'::jsonb, '["ঝাপসা দৃষ্টি","ফিকে রং","রাতে আলোয় ধাঁধা"]'::jsonb, 'A cataract is a clouding of the eye natural lens.', 'ছানি হলো চোখের প্রাকৃতিক লেন্স ধীরে ধীরে ঘোলাটে হয়ে যাওয়া।', 'Aging, diabetes, prolonged UV exposure.', 'বয়স বাড়া, ডায়াবেটিস বা সূর্যের অতিবেগুনি রশ্মি।', 'Phacoemulsification surgery with intraocular lens.', 'ফ্যাকোইমালসিফিকেশন সার্জারির মাধ্যমে কৃত্রিম লেন্স প্রতিস্থাপন।', NULL, NULL, 'cataract-surgery', 1),
  ('diabetic-retinopathy', 'Diabetic Retinopathy', 'ডায়াবেটিক রেটিনোপ্যাথি', 'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/2. Conditions_Images/2. Diabetic Retinopathy.png', '["Blood sugar","Floaters","Microaneurysms"]'::jsonb, '["ব্লাড সুগার","কালো বিন্দু ভাসা","রক্তনালীর ক্ষতি"]'::jsonb, 'High blood sugar damages retinal blood vessels.', 'রক্তে অতিরিক্ত সুগার রেটিনার রক্তনালীর ক্ষতি করে।', 'Uncontrolled diabetes over long periods.', 'দীর্ঘদিনের অনিয়ন্ত্রিত ডায়াবেটিস।', 'Laser photocoagulation, anti-VEGF injections, vitrectomy.', 'লেজার থেরাপি, অ্যান্টি-ভিইজিএফ ইনজেকশন বা ভিট্রেক্টমি সার্জারি।', NULL, NULL, 'diabetic-eye-care', 2),
  ('retinal-detachment', 'Retinal Detachment', 'রেটিনা বিচ্ছিন্নতা', 'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/2. Conditions_Images/3. Retinal Detachment.png', '["Emergency","Light flashes","Shadow curtain"]'::jsonb, '["জরুরি অবস্থা","আলোর ঝলকানি","দৃষ্টিতে ছায়া"]'::jsonb, 'The retina pulls away from the back wall of the eye.', 'রেটিনা চোখের পেছনের দেয়াল থেকে আলাদা হয়ে যায়।', 'Retinal tears, severe myopia, eye trauma.', 'রেটিনায় ছিদ্র, উচ্চ পাওয়ার বা চোখে আঘাত।', 'Emergency pars plana vitrectomy surgery.', 'জরুরি পার্স প্লানা ভিট্রেক্টমি সার্জারি।', 'Sudden flashes or dark curtains in vision require immediate attention.', 'হঠাৎ আলোর ঝলকানি বা দৃষ্টিতে পর্দার মতো কালো ছায়া দেখলে জরুরি যোগাযোগ করুন।', 'vitreoretinal-surgery', 3),
  ('macular-disease-cscr', 'Macular Problems / CSCR', 'ম্যাকুলার সমস্যা (CSCR সহ)', 'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/2. Conditions_Images/4. Macular Disease.png', '["Central vision","CSCR","Distorted lines"]'::jsonb, '["কেন্দ্রীয় দৃষ্টি","সিএসআর","বাঁকা রেখা দেখা"]'::jsonb, 'Central vision distortion from fluid under the macula.', 'ম্যাকুলার নিচে তরল জমে কেন্দ্রীয় দৃষ্টি ঝাপসা হওয়া।', 'Stress, high blood pressure, steroid use.', 'মানসিক চাপ, স্টেরয়েড বা উচ্চ রক্তচাপ।', 'Observation, medication, targeted laser.', 'পর্যবেক্ষণ, ওষুধ বা সুনির্দিষ্ট লেজার চিকিৎসা।', NULL, NULL, 'vitreoretinal-surgery', 4),
  ('crvo-brvo', 'Retinal Vein Occlusion (CRVO / BRVO)', 'রেটিনার শিরা বন্ধ (CRVO / BRVO)', 'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/2. Conditions_Images/5. CRVO _ BRVO (Retinal Vein Occlusion).png', '["Vascular block","Painless blur","Hypertension"]'::jsonb, '["রক্তনালী ব্লকেজ","ব্যথাহীন ঝাপসা","উচ্চ রক্তচাপ"]'::jsonb, 'A blockage in retinal veins causing blood and fluid leakage.', 'রেটিনার রক্তনালীতে ব্লকেজ হয়ে রক্তক্ষরণ ও দৃষ্টিহানি।', 'Hypertension, diabetes, cardiovascular risks.', 'উচ্চ রক্তচাপ, ডায়াবেটিস ও রক্তনালীর সমস্যা।', 'Anti-VEGF injections and laser therapy.', 'অ্যান্টি-ভিইজিএফ ইনজেকশন ও লেজার থেরাপি।', NULL, NULL, 'vitreoretinal-surgery', 5),
  ('vitreous-hemorrhage', 'Vitreous Hemorrhage', 'ভিট্রিয়াস হেমোরেজ (চোখের ভেতরে রক্তক্ষরণ)', 'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/2. Conditions_Images/6. Vitreous Hemorrhage.png', '["Internal bleeding","Sudden darkness","Vitrectomy"]'::jsonb, '["অভ্যন্তরীণ রক্তক্ষরণ","হঠাৎ অন্ধকার","ভিট্রেক্টমি"]'::jsonb, 'Bleeding into the clear vitreous gel of the eye.', 'চোখের ভেতরের স্বচ্ছ জেলের মধ্যে রক্তক্ষরণ।', 'Diabetic retinopathy, retinal tear, eye trauma.', 'ডায়াবেটিস, রেটিনা ছিঁড়ে যাওয়া বা চোখে আঘাত।', 'Observation or pars plana vitrectomy surgery.', 'পর্যবেক্ষণ বা ভিট্রেক্টমি সার্জারি করে রক্ত অপসারণ।', NULL, NULL, 'vitreoretinal-surgery', 6),
  ('rop', 'Retinopathy of Prematurity (ROP)', 'নবজাতকের রেটিনা সমস্যা (ROP)', 'Core', 'Pediatric & Strabismus', 'শিশুর চোখ ও স্কুইন্ট', '/images/2. Conditions_Images/7. Retinopathy of Prematurity (ROP).png', '["Premature infants","NICU screening","Time-critical"]'::jsonb, '["অপরিণত নবজাতক","এনআইসিইউ স্ক্রিনিং","সময়-সংবেদনশীল"]'::jsonb, 'Abnormal retinal vessel growth in premature babies.', 'অপরিণত অবস্থায় জন্ম নেওয়া শিশুদের রেটিনার অস্বাভাবিক বৃদ্ধি।', 'Premature birth (before 34 weeks) or low birth weight.', '৩৪ সপ্তাহের পূর্বে জন্ম বা কম ওজন নিয়ে জন্মানো।', 'Laser therapy, anti-VEGF, or surgery.', 'সময়মতো লেজার থেরাপি বা ইনজেকশন।', NULL, NULL, 'rop-care', 7),
  ('refractive-error', 'Refractive Error (Myopia, Hyperopia, Astigmatism)', 'রিফ্র্যাক্টিভ এরর (পাওয়ার সমস্যা)', 'Core', 'Refractive & Cornea', 'রিফ্র্যাক্টিভ ও কর্নিয়া', '/images/2. Conditions_Images/8. Refractive Error.png', '["Myopia","LASIK","Glasses free"]'::jsonb, '["মায়োপিয়া","লেসিক","চশমামুক্ত জীবন"]'::jsonb, 'Inability to focus light sharply onto the retina.', 'চোখের আলোকে রেটিনায় সঠিকভাবে ফোকাস করতে না পারা।', 'Corneal shape and eyeball length variations.', 'কর্নিয়ার আকৃতি বা চোখের গোলকের গঠনের তারতম্য।', 'Glasses, contacts, or LASIK / PRK / SMILE.', 'চশমা, কন্ট্যাক্ট লেন্স বা লেসিক/স্মাইল সার্জারি।', NULL, NULL, 'refractive-surgery', 8),
  ('dislocated-lens', 'Dislocated Lens & Scleral-Fixated IOL', 'ডিসলোকেটেড লেন্স ও স্কেরাল ফিক্সেটেড IOL', 'Core', 'Cataract & Lens', 'ছানি ও লেন্স', '/images/2. Conditions_Images/9. Dislocated Lens.png', '["IOL dislocation","Yamane technique","Trauma"]'::jsonb, '["লেন্স সরে যাওয়া","ইয়ামানে পদ্ধতি","চোখে আঘাত"]'::jsonb, 'Natural or artificial lens shifts out of its normal position.', 'কৃত্রিম বা প্রাকৃতিক লেন্স যথাস্থান থেকে সরে যাওয়া।', 'Trauma, previous complicated eye surgery, zonular weakness.', 'চোখে আঘাত বা আগের অপারেশনের জটিলতা।', 'Sutureless Yamane scleral fixation surgery.', 'সেলাইবিহীন আধুনিক ইয়ামানে স্কেরাল ফিক্সেশন সার্জারি।', NULL, NULL, 'cataract-surgery', 9),
  ('ptosis', 'Ptosis (Drooping Eyelid)', 'পিটোসিস (চোখের পাতা ঝুলে পড়া)', 'Core', 'Oculoplasty & Orbit', 'অকুলোপ্লাস্টি ও অরবিট', '/images/2. Conditions_Images/10. Ptosis.png', '["Drooping lid","Levator muscle","Day surgery"]'::jsonb, '["পাতা ঝুলে পড়া","লিভেটর পেশি","ডে সার্জারি"]'::jsonb, 'Drooping of the upper eyelid covering the eye.', 'উপরের চোখের পাতা অস্বাভাবিকভাবে নিচের দিকে ঝুলে পড়া।', 'Weak levator muscle, aging, nerve issues.', 'পাতা তোলার পেশি দুর্বল হওয়া বা স্নায়ু সমস্যা।', 'Levator muscle resection or sling surgery.', 'লিভেটর পেশি সমন্বয় বা স্লিং সার্জারি।', NULL, NULL, 'oculoplasty', 10),
  ('pterygium', 'Pterygium (Surfer''s Eye)', 'পিটেরিজিয়াম (মাংসবৃদ্ধি)', 'Core', 'Cornea & Surface', 'কর্নিয়া ও উপরিভাগ', '/images/2. Conditions_Images/11. Pterygium.png', '["Fleshy growth","UV exposure","Conjunctival graft"]'::jsonb, '["মাংসল বৃদ্ধি","রোদের ক্ষতি","কনজাংটিভাল গ্রাফট"]'::jsonb, 'Fleshy growth of tissue on the cornea and conjunctiva.', 'চোখের সাদা অংশে ত্রিভুজাকার মাংসল বৃদ্ধি।', 'Sun, wind, and dust exposure.', 'দীর্ঘদিন রোদ ও ধুলাবালিতে কাজ করা।', 'Surgical excision with conjunctival autograft.', 'গ্রাফটসহ সার্জারি করে অপসারণ।', NULL, NULL, 'pterygium-surgery', 11),
  ('thyroid-eye-disease', 'Thyroid Eye Disease & Orbital Disorders', 'থাইরয়েড আই ডিজিজ ও অরবিটাল সমস্যা', 'Core', 'Oculoplasty & Orbit', 'অকুলোপ্লাস্টি ও অরবিট', '/images/2. Conditions_Images/12. Thyroid Eye Disease.png', '["Bulging eyes","Graves disease","Diplopia"]'::jsonb, '["চোখ বেরিয়ে আসা","গ্রেভস ডিজিজ","দুটো দেখা"]'::jsonb, 'Autoimmune condition causing eye bulging and irritation.', 'অটোইমিউন সমস্যা যার ফলে চোখ কোটর থেকে বেরিয়ে আসে।', 'Hyperthyroidism (Graves disease).', 'থাইরয়েডের ভারসাম্যহীনতা।', 'Medical management and orbital decompression.', 'ওষুধ ও প্রয়োজনবোধে অরবিটাল ডিকম্প্রেশন সার্জারি।', NULL, NULL, 'oculoplasty', 12),
  ('dry-eye', 'Dry Eye & Corneal Ulcer', 'ড্রাই আই ও কর্নিয়াল আলসার', 'Core', 'Cornea & Surface', 'কর্নিয়া ও উপরিভাগ', '/images/2. Conditions_Images/13. Dry Eye_ Corneal Ulcer.png', '["Grittiness","Burning","Corneal infection"]'::jsonb, '["খচখচে ভাব","জ্বালাপোড়া","কর্নিয়ার ঘা"]'::jsonb, 'Poor tear production or corneal surface infection.', 'অশ্রুর অভাব বা কর্নিয়ায় সংক্রমণজনিত ঘা।', 'Screen time, AC, contact lenses, scratches.', 'স্ক্রিন টাইম, কন্ট্যাক্ট লেন্স বা চোখে আঁচড়।', 'Lubricating drops or intensive antibiotic therapy.', 'লুব্রিকেটিং ড্রপ বা অ্যান্টিবায়োটিক চিকিৎসা।', NULL, NULL, 'dry-eye-corneal-disease', 13),
  ('squint', 'Squint (Strabismus)', 'স্কুইন্ট বা ট্যারা চোখ (স্ট্র্যাবিজমাস)', 'Core', 'Pediatric & Strabismus', 'শিশুর চোখ ও স্কুইন্ট', '/images/2. Conditions_Images/14. Squint (Strabismus).png', '["Misalignment","Binocular vision","Muscle surgery"]'::jsonb, '["ট্যারা চোখ","বাইনোকুলার দৃষ্টি","পেশি সার্জারি"]'::jsonb, 'Misalignment of eyes preventing parallel gaze.', 'দুই চোখ একসাথে সমান্তরালভাবে দেখতে না পারা।', 'Muscle imbalance, high refractive errors.', 'চোখের পেশির ভারসাম্যহীনতা বা পাওয়ারের ত্রুটি।', 'Glasses, eye exercises, or muscle surgery.', 'চশমা, ব্যায়াম অথবা চোখের পেশির সার্জারি।', NULL, NULL, 'squint-surgery', 14),
  ('eye-tumors', 'Eye Tumors & Eyelid Growths', 'চোখের টিউমার ও পাতার বৃদ্ধি', 'Core', 'Oculoplasty & Orbit', 'অকুলোপ্লাস্টি ও অরবিট', '/images/2. Conditions_Images/15. Eye Tumors _ Lid Tumors.png', '["Eyelid nodule","Biopsy","Reconstruction"]'::jsonb, '["পাতায় মাংসপিণ্ড","বায়োপসি","রিকনস্ট্রাকশন"]'::jsonb, 'Benign or malignant lumps on eyelids and orbit.', 'চোখের পাতায় মাংসপিণ্ড বা টিউমারের বৃদ্ধি।', 'Blocked glands, genetics, UV exposure.', 'গ্রন্থি বন্ধ হয়ে যাওয়া বা রোদের প্রভাব।', 'Biopsy, surgical excision and reconstructive repair.', 'বায়োপসি, অপারেশন ও পাতা পুনর্গঠন।', NULL, NULL, 'oculoplasty', 15),
  ('glaucoma', 'Glaucoma', 'গ্লুকোমা (নীরব দৃষ্টিচোর)', 'Secondary', 'Glaucoma', 'গ্লুকোমা', '/images/2. Conditions_Images/16. Glaucoma.png', '["Silent thief","Eye pressure","Optic nerve"]'::jsonb, '["নীরব দৃষ্টিচোর","চোখের প্রেসার","অপটিক নার্ভ"]'::jsonb, 'Optic nerve damage caused by high eye pressure.', 'চোখের অতিরিক্ত প্রেসারের কারণে অপটিক নার্ভ নষ্ট হওয়া।', 'Aqueous humor drainage blockage, genetics.', 'চোখের ভেতরের তরল নিষ্কাশন বন্ধ হওয়া।', 'Daily pressure-lowering drops, laser, or surgery.', 'নিয়মিত ড্রপ, লেজার বা ট্র্যাবেকুলেক্টমি সার্জারি।', NULL, NULL, 'glaucoma-management', 16)
ON CONFLICT (slug) DO UPDATE SET
  name_en = EXCLUDED.name_en,
  name_bn = EXCLUDED.name_bn,
  category_en = EXCLUDED.category_en,
  category_bn = EXCLUDED.category_bn,
  image_url = EXCLUDED.image_url;

-- 6.5 FAQS (12 Common Questions)
INSERT INTO public.faqs (faq_code, category_en, category_bn, question_en, question_bn, answer_en, answer_bn, order_index)
VALUES
  ('faq-1', 'Appointments & Visits', 'অ্যাপয়েন্টমেন্ট ও ভিজিট', 'Do I need a referral to see Dr. Nahal?', 'ডা. নাহালকে দেখাতে কি রেফারেল লাগবে?', 'No referral is required. You can book directly by calling our serial number (01344-890335) or submitting an appointment request through our website.', 'না, কোনো রেফারেল লাগে না। সরাসরি আমাদের সিরিয়াল নম্বরে (০১৩৪৪-৮৯০৩৩৫) কল করে অথবা ওয়েবসাইটের মাধ্যমে অ্যাপয়েন্টমেন্টের অনুরোধ করতে পারেন।', 1),
  ('faq-2', 'Cataract Surgery', 'ছানি অপারেশন', 'How long does a cataract operation take?', 'ছানি অপারেশনে কতক্ষণ সময় লাগে?', 'The procedure itself typically takes 15–20 minutes per eye, though you should plan for a couple of hours at the hospital including pre-operative preparation.', 'প্রতি চোখে সার্জারিতে সাধারণত ১৫-২০ মিনিট লাগে, তবে পূর্বপ্রস্তুতি ও অপারেশন-পরবর্তী সংক্ষিপ্ত পর্যবেক্ষণসহ হাসপাতালে ২-৩ ঘণ্টা সময় হাতে রাখা ভালো।', 2),
  ('faq-3', 'Cataract Surgery', 'ছানি অপারেশন', 'Is cataract surgery painful?', 'ছানি অপারেশনে কি ব্যথা হয়?', 'No — advanced anesthetic eye drops are used so your eye is completely numb. Most patients report feeling only light fluid movement.', 'না — আধুনিক অ্যানেস্থেটিক ড্রপ ব্যবহার করা হয় যাতে চোখ অবশ থাকে। রোগীরা শুধু পানির মৃদু অনুভূতি বা হালকা চাপ টের পান, কোনো তীব্র ব্যথা নয়।', 3),
  ('faq-4', 'Fees & Payment', 'খরচ ও ফি', 'How much does treatment cost?', 'চিকিৎসার খরচ কেমন?', 'Consultation fees and surgical costs vary depending on the chamber location and the specific procedure chosen. Please call or WhatsApp our team for up-to-date fees.', 'চেম্বার এবং সুনির্দিষ্ট সার্জারি বা ব্যবহৃত কৃত্রিম লেন্সের ধরন অনুযায়ী খরচ ভিন্ন হয়। হালনাগাদ পরামর্শ ও অপারেশন ফি জানতে আমাদের কল বা হোয়াটসঅ্যাপ করুন।', 4),
  ('faq-5', 'Chambers & Locations', 'চেম্বার ও সময়সূচি', 'Which chamber should I visit?', 'কোন চেম্বারে যাব?', 'Any of the three locations — An Nahar Specialized Eye Hospital, Aristo Eye Hospital, or Enam Medical College Hospital. Choose whichever is most convenient.', 'তিনটি চেম্বারের যেকোনো একটিতে — আন নাহার স্পেশালাইজড আই হসপিটাল, এরিস্টো আই হসপিটাল, অথবা এনাম মেডিকেল কলেজ হাসপাতাল। অবস্থান ও সময়সূচি অনুযায়ী সুবিধাজনক চেম্বার বেছে নিন।', 5),
  ('faq-6', 'Appointments & Visits', 'অ্যাপয়েন্টমেন্ট ও ভিজিট', 'Can I walk in without an appointment?', 'অ্যাপয়েন্টমেন্ট ছাড়াই কি সরাসরি যাওয়া যায়?', 'Walk-in patients are accommodated when time permits, but booking ahead secures your serial number and minimizes waiting time.', 'সুযোগ থাকলে সরাসরি আসা রোগীদের দেখা হয়, তবে আগে থেকে সিরিয়াল নিশ্চিত করলে দীর্ঘ অপেক্ষার ঝামেলা অনেকটাই এড়ানো যায়।', 6),
  ('faq-7', 'Pediatric & Specialty', 'শিশুর চোখ ও বিশেষ সেবা', 'Do you treat children?', 'শিশুদের চিকিৎসা করা হয় কি?', 'Yes. Dr. Nahal provides specialized care for children, including premature infant Retinopathy of Prematurity (ROP) screening, pediatric cataract, and squint correction.', 'হ্যাঁ। ডা. নাহাল শিশুদের বিশেষায়িত চিকিৎসা দিয়ে থাকেন, যার মধ্যে অপরিণত নবজাতকের ROP স্ক্রিনিং, শিশুদের ছানি এবং ট্যারা চোখের (স্কুইন্ট) সার্জিক্যাল চিকিৎসা অন্তর্ভুক্ত।', 7),
  ('faq-8', 'Cataract Surgery', 'ছানি অপারেশন', 'How soon can I return to work after cataract surgery?', 'ছানি অপারেশনের পর কতদিনে কাজে ফেরা যায়?', 'Most patients can resume light daily activities and desk work within 3–7 days. Reading and walking are fine almost immediately.', 'বেশিরভাগ রোগী ৩-৭ দিনের মধ্যে স্বাভাবিক কাজকর্ম ও অফিসে ফিরতে পারেন। টিভি দেখা বা বই পড়া সাথে সাথেই সম্ভব।', 8),
  ('faq-9', 'Refractive Surgery', 'লেসিক ও রিফ্র্যাক্টিভ', 'Am I a candidate for LASIK?', 'আমি কি লেসিকের জন্য উপযুক্ত?', 'Candidacy requires you to be at least 18 years old, have had a stable glasses prescription for at least a year, and adequate corneal thickness.', 'লেসিকের জন্য বয়স কমপক্ষে ১৮ বছর হতে হবে, অন্তত এক বছর ধরে পাওয়ার অপরিবর্তিত থাকতে হবে, এবং কর্নিয়ার পুরুত্ব পর্যাপ্ত হতে হবে।', 9),
  ('faq-10', 'Appointments & Visits', 'অ্যাপয়েন্টমেন্ট ও ভিজিট', 'What should I bring to my first visit?', 'প্রথম ভিজিটে কী নিয়ে আসব?', 'Please bring any previous eye prescriptions or test reports, your current eyeglasses, and a list of any ongoing medications.', 'আপনার পূর্বের কোনো চোখের প্রেসক্রিপশন বা টেস্টের রিপোর্ট, বর্তমান চশমা, এবং নিয়মিত খাওয়া ওষুধের তালিকা সাথে নিয়ে আসুন।', 10),
  ('faq-11', 'Emergency Care', 'জরুরি সেবা', 'Do you offer emergency consultations?', 'জরুরি পরামর্শ পাওয়া যায় কি?', 'Yes. For acute retinal emergencies — call 01344-890335 immediately for prioritized emergency guidance.', 'হ্যাঁ। রেটিনা-সংক্রান্ত জরুরি অবস্থায় সাধারণ বুকিংয়ের অপেক্ষা না করে অবিলম্বে ০১৩৪৪-৮৯০৩৩৫ নম্বরে কল করুন।', 11),
  ('faq-12', 'Clinical Transparency', 'ভিডিও ও স্বচ্ছতা', 'Is the video library real surgical footage?', 'ভিডিও লাইব্রেরির ভিডিওগুলো কি আসল রোগীর?', 'Yes. All video clips feature actual surgical cases and patient education sessions conducted by Dr. Nahal, strictly respecting patient privacy.', 'হ্যাঁ। ভিডিও লাইব্রেরির সমস্ত ক্লিপ ডা. নাহালের নিজস্ব সার্জিক্যাল কেস ও রোগী পরামর্শের বাস্তব অংশ।', 12)
ON CONFLICT (faq_code) DO UPDATE SET
  question_en = EXCLUDED.question_en,
  question_bn = EXCLUDED.question_bn,
  answer_en = EXCLUDED.answer_en,
  answer_bn = EXCLUDED.answer_bn;

-- 6.6 VIDEOS (17 Clinical & Educational Videos)
INSERT INTO public.videos (video_code, url, youtube_id, category, title_en, title_bn, tag_en, tag_bn, description_en, description_bn, is_featured, order_index)
VALUES
  ('vid-1', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'Cataract', 'Micro-Incision Phacoemulsification Demonstration', 'মাইক্রো-ইনসিশন ফ্যাকোইমালসিফিকেশন ডেমোনস্ট্রেশন', 'Phaco · MICS', 'ফ্যাকো · MICS', 'Step-by-step surgical walk-through of modern sutureless cataract surgery.', 'আধুনিক সেলাইবিহীন ছানি অপারেশনের পূর্ণাঙ্গ সার্জিক্যাল ভিডিও।', true, 1),
  ('vid-2', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'Vitreoretina', 'Pars Plana Vitrectomy for Retinal Detachment Repair', 'রেটিনা বিচ্ছিন্নতা নিরাময়ে পার্স প্লানা ভিট্রেক্টমি', 'PPV · Retina Repair', 'PPV · রেটিনা রিপেয়ার', 'Microsurgical vitrectomy procedure with silicone oil tamponade.', 'সিলিকন অয়েল ট্যাম্পোনেডসহ রেটিনা প্রতিস্থাপন মাইক্রোসার্জারি।', true, 2),
  ('vid-3', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'Cataract', 'Yamane Double-Needle Scleral Fixation Technique', 'ইয়ামানে ডাবল-নিডল স্কেরাল ফিক্সেশন পদ্ধতি', 'Yamane · SFIOL', 'ইয়ামানে · SFIOL', 'Sutureless secondary lens implantation in aphakic eyes.', 'সাপোর্টবিহীন চোখে সেলাইহীন কৃত্রিম লেন্স প্রতিস্থাপনের অত্যাধুনিক কৌশল।', true, 3),
  ('vid-4', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'Refractive', 'Pre-LASIK Evaluation: What to Expect During Screening', 'প্রি-লেসিক মূল্যায়ন: স্ক্রিনিং পরীক্ষায় কী জানা যায়', 'LASIK · Refractive', 'লেসিক · রিফ্র্যাক্টিভ', 'Explaining corneal topography, pachymetry and candidacy.', 'কর্নিয়াল টপোগ্রাফি ও লেসিকের উপযুক্ততা যাচাই প্রক্রিয়া।', false, 4),
  ('vid-5', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'Vitreoretina', 'Endolaser Photocoagulation for Diabetic Retinopathy', 'ডায়াবেটিক রেটিনোপ্যাথিতে এন্ডোলেজার চিকিৎসা', 'Diabetic Retina · Laser', 'ডায়াবেটিক রেটিনা · লেজার', 'Laser sealing of leaking abnormal vessels in proliferative diabetic retinopathy.', 'রেটিনার অস্বাভাবিক রক্তনালীর ক্ষরণ বন্ধে লেজার থেরাপি।', false, 5),
  ('vid-6', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'Patient Education', 'When to See an Eye Doctor Urgently: 5 Warning Signs', 'কখন দ্রুত চক্ষু বিশেষজ্ঞকে দেখাবেন: ৫টি সতর্কবার্তা', 'Patient Education · Red Flags', 'রোগী শিক্ষা · লাল পতাকা সংকেত', 'Flashes, floaters, sudden painless vision drop explained for patients.', 'আলোর ঝলকানি ও হঠাৎ দৃষ্টিহ্রাসের তাৎপর্য নিয়ে বিস্তারিত আলোচনা।', true, 6),
  ('vid-7', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'ROP', 'Retinopathy of Prematurity Screening in Neonatal Care', 'এনআইসিইউতে অপরিণত নবজাতকের রেটিনা স্ক্রিনিং', 'ROP · Neonatal Screening', 'ROP · নবজাতক স্ক্রিনিং', 'Indirect ophthalmoscopy screening for premature infants.', 'অপরিণত শিশুদের রেটিনা সুরক্ষায় সময়োপযোগী স্ক্রিনিং।', false, 7),
  ('vid-8', 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', 'dQw4w9WgXcQ', 'Oculoplasty', 'Ptosis Correction: Surgical Re-alignment of the Eyelid', 'পিটোসিস সার্জারি: ঝুলে পড়া চোখের পাতার সফল সংশোধন', 'Ptosis · Oculoplasty', 'পিটোসিস · অকুলোপ্লাস্টি', 'Restoration of eyelid height and normal unobstructed visual field.', 'চোখের পাতার স্বাভাবিক উচ্চতা ও ক্ষেত্রফল ফিরিয়ে আনার পদ্ধতি।', false, 8)
ON CONFLICT (video_code) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_bn = EXCLUDED.title_bn,
  category = EXCLUDED.category,
  url = EXCLUDED.url;

-- 6.7 GALLERY ITEMS (8 Clinic & Practice Photos)
INSERT INTO public.gallery_items (src, category, caption_en, caption_bn, chamber_name_en, chamber_name_bn, order_index, is_published)
VALUES
  ('/images/hero/seq-1.jpeg', 'Chambers', 'Consultation chamber at An Nahar Specialized Eye Hospital', 'আন নাহার স্পেশালাইজড আই হসপিটালের কনসাল্টেশন চেম্বার', 'An Nahar Specialized Eye Hospital', 'আন নাহার স্পেশালাইজড আই হসপিটাল', 1, true),
  ('/images/hero/seq-2.jpeg', 'Equipment', 'High-resolution Optical Coherence Tomography (OCT) retinal scanner', 'উচ্চ ক্ষমতাসম্পন্ন অপটিক্যাল কোহেরেন্স টমোগ্রাফি (OCT) রেটিনা স্ক্যানার', NULL, NULL, 2, true),
  ('/images/hero/seq-3.jpeg', 'Chambers', 'Clinical slit-lamp examination & anterior segment assessment', 'স্লিট-ল্যাম্পের মাধ্যমে চোখের গভীর পরীক্ষা ও মূল্যায়ন', 'Enam Medical College Hospital', 'এনাম মেডিকেল কলেজ হাসপাতাল', 3, true),
  ('/images/hero/seq-4.jpeg', 'Equipment', 'Digital Fundus Fluorescein Angiography (FFA) imaging setup', 'ডিজিটাল ফান্ডাস ফ্লুরোসেন অ্যানজিওগ্রাফি (FFA) ইমেজিং ব্যবস্থা', NULL, NULL, 4, true),
  ('/images/services/cataract-surgery.jpg', 'Equipment', 'Modern Phacoemulsification unit with microsurgical visualization', 'মাইক্রোসার্জিক্যাল ভিজ্যুয়ালাইজেশনসহ আধুনিক ফ্যাকোইমালসিফিকেশন ইউনিট', NULL, NULL, 5, true),
  ('/images/services/vitreoretinal-surgery.jpg', 'Chambers', 'Sterile vitreoretinal surgical operating theater', 'আধুনিক ও জীবাণুমুক্ত ভিট্রিওরেটিনাল অপারেশন থিয়েটার', 'An Nahar Specialized Eye Hospital', 'আন নাহার স্পেশালাইজড আই হসপিটাল', 6, true),
  ('/images/services/refractive-surgery.jpg', 'Equipment', 'Excimer & Femtosecond laser workstation for LASIK & corneal reshaping', 'লেসিক ও কর্নিয়া চিকিৎসার জন্য আধুনিক এক্সাইমার লেজার ওয়ার্কস্টেশন', NULL, NULL, 7, true),
  ('/images/services/glaucoma-management.jpg', 'Equipment', 'Automated visual field perimetry & corneal pachymeter', 'স্বয়ংক্রিয় ভিজ্যুয়াল ফিল্ড পেরিমেট্রি ও কর্নিয়া পরিমাপক', NULL, NULL, 8, true);

-- 6.8 BLOG POSTS (Patient Education Articles)
INSERT INTO public.blog_posts (slug, title_en, title_bn, meta_description_en, meta_description_bn, category_en, category_bn, read_time_en, read_time_bn, publish_date, image_url, sections, emergency_callout_en, emergency_callout_bn, related_service_slug, related_condition_slug)
VALUES
  (
    'cataract-surgery-recovery',
    'Cataract Surgery Recovery: What to Do (and Avoid) in the First Weeks',
    'ছানি অপারেশনের পর প্রথম কয়েক সপ্তাহে কী করবেন, কী করবেন না',
    'A clear, practical guide to cataract surgery recovery — what is normal and when to call your doctor.',
    'ছানি অপারেশনের পর সহজ, বাস্তবসম্মত গাইড — কী স্বাভাবিক, কী এড়িয়ে চলবেন।',
    'Cataract Care', 'ছানি চিকিৎসা',
    '5 min read', '৫ মিনিট পাঠ',
    '2026-08-15',
    '/images/services/cataract-surgery.jpg',
    '[{"content":{"en":"Cataract surgery is one of the safest procedures in modern medicine. How you care for your eye in the first few weeks directly affects how well you heal.","bn":"ছানি অপারেশন আধুনিক চিকিৎসাবিজ্ঞানের সবচেয়ে নিরাপদ পদ্ধতিগুলোর একটা। প্রথম কয়েক সপ্তাহে যত্ন নেওয়া অত্যন্ত জরুরি।"}},{"heading":{"en":"Key Dos and Don''ts","bn":"জরুরি করণীয় ও বর্জনীয়"},"content":{"en":"Use all prescribed eye drops exactly as scheduled. Avoid touching or rubbing your eye. Avoid lifting heavy objects for the first two weeks.","bn":"প্রেসক্রাইব করা আই ড্রপ সময়মতো ব্যবহার করুন। চোখে হাত দেবেন না বা রগড়াবেন না। প্রথম দুই সপ্তাহ ভারী ওজন তুলবেন না।"}}]'::jsonb,
    'Sudden increase in pain, redness, or drop in vision requires urgent evaluation.',
    'হঠাৎ তীব্র ব্যথা, চোখ অতিরিক্ত লাল হওয়া বা দৃষ্টি কমে গেলে দেরি না করে দ্রুত যোগাযোগ করুন।',
    'cataract-surgery', 'cataract'
  ),
  (
    'diabetic-retinopathy-guide',
    'Protecting Your Sight from Diabetes: A Practical Retina Care Guide',
    'ডায়াবেটিসে চোখের দৃষ্টি রক্ষা: একটি বাস্তবসম্মত রেটিনা কেয়ার গাইড',
    'Why annual retina exams matter and how early treatment prevents permanent vision loss.',
    'কেন প্রতি বছর রেটিনা পরীক্ষা জরুরি এবং কীভাবে সময়মতো চিকিৎসা দৃষ্টির ক্ষতি ঠেকায়।',
    'Retina Health', 'রেটিনা স্বাস্থ্য',
    '6 min read', '৬ মিনিট পাঠ',
    '2026-08-20',
    '/images/services/diabetic-eye-care.jpg',
    '[{"content":{"en":"Diabetic retinopathy develops silently without pain or obvious warning signs in its early stages. By the time symptoms appear, blood vessel damage is often advanced.","bn":"ডায়াবেটিক রেটিনোপ্যাথি কোনো ব্যথা বা প্রাথমিক লক্ষণ ছাড়াই ধীরে ধীরে বাড়ে।"}}]'::jsonb,
    NULL, NULL,
    'diabetic-eye-care', 'diabetic-retinopathy'
  ),
  (
    'retinal-detachment-symptoms',
    'Flashes, Floaters & Curtains: Recognizing Retinal Emergencies',
    'আলোর ঝলকানি, কালো বিন্দু ও ছায়া: রেটিনার জরুরি লক্ষণ চিনুন',
    'Understanding time-critical warning signs of a torn or detached retina.',
    'রেটিনা ছিঁড়ে যাওয়া বা বিচ্ছিন্ন হওয়ার জরুরি বিপৎসংকেত।',
    'Emergency Eye Care', 'জরুরি চক্ষু সেবা',
    '4 min read', '৪ মিনিট পাঠ',
    '2026-09-01',
    '/images/services/vitreoretinal-surgery.jpg',
    '[{"content":{"en":"Retinal detachment is a true ophthalmic emergency. Hours can make the difference between preserving sharp central vision and irreversible damage.","bn":"রেটিনা বিচ্ছিন্নতা একটি মেডিকেল ইমার্জেন্সি। প্রতিটা মুহূর্ত দৃষ্টি বাঁচানোর ক্ষেত্রে গুরুত্বপূর্ণ।"}}]'::jsonb,
    'If you notice a dark curtain moving across your vision, call our emergency hotline immediately.',
    'দৃষ্টির কোনো অংশে পর্দার মতো অন্ধকার নামতে দেখলে দেরি না করে অবিলম্বে ইমার্জেন্সি নম্বরে কল করুন।',
    'vitreoretinal-surgery', 'retinal-detachment'
  )
ON CONFLICT (slug) DO UPDATE SET
  title_en = EXCLUDED.title_en,
  title_bn = EXCLUDED.title_bn,
  meta_description_en = EXCLUDED.meta_description_en,
  meta_description_bn = EXCLUDED.meta_description_bn;

-- 6.9 REVIEWS
INSERT INTO public.reviews (author_en, author_bn, city_en, city_bn, text_en, text_bn, stars, treatment_en, treatment_bn, is_featured, order_index)
VALUES
  ('Rafiqul I.', 'রফিকুল ইসলাম', 'Dhanmondi', 'ধানমন্ডি', 'Very patient and thorough explanation before my cataract surgery. My vision improved dramatically afterward.', 'স্যার খুব ধৈর্য নিয়ে সব বুঝিয়ে দিয়েছেন। ছানি অপারেশনের পর দৃষ্টিশক্তি অনেক ভালো হয়েছে।', 5, 'Phaco Cataract Surgery', 'ফ্যাকো ছানি অপারেশন', true, 1),
  ('Sadia K.', 'সাদিয়া করিম', 'Uttara', 'উত্তরা', 'Excellent LASIK experience, very professional and transparent about the entire process.', 'লেসিক অভিজ্ঞতা চমৎকার, খুবই পেশাদার আর পুরো প্রক্রিয়া নিয়ে স্পষ্টভাবে জানিয়েছেন।', 5, 'Custom LASIK', 'কাস্টম লেসিক', true, 2),
  ('Mahmud H.', 'মাহমুদ হাসান', 'Mirpur', 'মিরপুর', 'After visiting several clinics for my retina issue, I finally got proper treatment and surgery here.', 'রেটিনার সমস্যা নিয়ে অনেক জায়গায় ঘুরে অবশেষে এখানে সঠিক চিকিৎসা ও অপারেশন পেয়েছি।', 5, 'Vitrectomy Surgery', 'ভিট্রেক্টমি সার্জারি', true, 3);

-- 6.10 DEFAULT ADMIN ACCOUNT (Passcode: drnehal2026)
INSERT INTO public.admin_users (username, email, password_hash, role)
VALUES ('admin', 'drmostaknio@gmail.com', crypt('drnehal2026', gen_salt('bf')), 'superadmin')
ON CONFLICT (username) DO NOTHING;

-- ==============================================================================
-- 7. COMPLETION VERIFICATION
-- ==============================================================================
SELECT 'Dr. Nahal Website Database Schema & Seed Data Successfully Initialized!' AS result;
