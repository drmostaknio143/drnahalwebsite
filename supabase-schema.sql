-- ==============================================================================
-- DR. NAHAL MOSTAK KHAN ARNOB — SUPABASE DATABASE SCHEMA & COMPLETE SEED DATA
-- Consultant Vitreoretinal, Cataract & Refractive Surgeon
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- Supabase Dashboard -> SQL Editor -> New Query -> Paste & Click Run.
-- It will create all tables, indexes, Row Level Security (RLS) policies,
-- auto-updating timestamp triggers, and insert all site data (EN + BN).
-- ==============================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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

-- Public READ policies
CREATE POLICY "Public can read settings" ON public.practice_settings FOR SELECT USING (true);
CREATE POLICY "Public can read active chambers" ON public.chambers FOR SELECT USING (is_active = true);
CREATE POLICY "Public can read published services" ON public.services FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published conditions" ON public.conditions FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read videos" ON public.videos FOR SELECT USING (true);
CREATE POLICY "Public can read published gallery items" ON public.gallery_items FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published faqs" ON public.faqs FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published blogs" ON public.blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read featured reviews" ON public.reviews FOR SELECT USING (is_featured = true);

-- Public can submit an appointment request
CREATE POLICY "Public can insert appointment" ON public.appointments FOR INSERT WITH CHECK (true);

-- Authenticated Admin full access
CREATE POLICY "Admin full access settings" ON public.practice_settings FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access chambers" ON public.chambers FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access services" ON public.services FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access conditions" ON public.conditions FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access videos" ON public.videos FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access gallery" ON public.gallery_items FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access faqs" ON public.faqs FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access blogs" ON public.blog_posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access appointments" ON public.appointments FOR ALL TO authenticated USING (true);
CREATE POLICY "Admin full access reviews" ON public.reviews FOR ALL TO authenticated USING (true);

-- ==============================================================================
-- 5. AUTO-UPDATE TRIGGERS
-- ==============================================================================
CREATE TRIGGER update_practice_settings_timestamp BEFORE UPDATE ON public.practice_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chambers_timestamp BEFORE UPDATE ON public.chambers FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_timestamp BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_conditions_timestamp BEFORE UPDATE ON public.conditions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_videos_timestamp BEFORE UPDATE ON public.videos FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_timestamp BEFORE UPDATE ON public.gallery_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_timestamp BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_blogs_timestamp BEFORE UPDATE ON public.blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
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
  ('official_email', 'drmostaknio@gmail.com', 'drmostaknio@gmail.com', 'Official correspondence email')
ON CONFLICT (setting_key) DO NOTHING;

-- 6.2 CHAMBERS
INSERT INTO public.chambers (slug, name_en, name_bn, location_en, location_bn, hours_en, hours_bn, badge_en, badge_bn, phone, order_index)
VALUES
  ('an-nahar', 'An Nahar Specialized Eye Hospital', 'আন নাহার স্পেশালাইজড আই হসপিটাল', 'Dhanmondi, Dhaka', 'ধানমন্ডি, ঢাকা', 'Saturday, Sunday, Tuesday & Wednesday · 6:00 PM – 9:00 PM', 'শনি, রবি, মঙ্গল ও বুধবার · সন্ধ্যা ৬টা – রাত ৯টা', 'Evening Chamber', 'সান্ধ্যকালীন চেম্বার', '01344-890335', 1),
  ('aristo', 'Aristo Eye Hospital', 'এরিস্টো আই হসপিটাল', 'Uttara, Dhaka', 'উত্তরা, ঢাকা', 'Saturday & Tuesday · 3:00 PM – 5:30 PM', 'শনি ও মঙ্গলবার · দুপুর ৩টা – বিকেল ৫:৩০টা', 'Afternoon Chamber', 'বিকালের চেম্বার', '01344-890335', 2),
  ('enam', 'Enam Medical College Hospital', 'এনাম মেডিকেল কলেজ হাসপাতাল', 'Savar, Dhaka', 'সাভার, ঢাকা', 'Saturday to Wednesday · 9:00 AM – 1:00 PM', 'শনি থেকে বুধবার · সকাল ৯টা – দুপুর ১টা', 'Morning Clinic', 'সকালের ক্লিনিক', '01344-890335', 3)
ON CONFLICT (slug) DO NOTHING;

-- 6.3 SERVICES & SURGERIES (All 11 Clinical Procedures)
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
    'Conditions treated', 'যেসব সমস্যার চিকিৎসা হয়', 'Retinal detachment · Diabetic retinopathy · Macular disease · CRVO/BRVO (retinal vein occlusion) · Vitreous hemorrhage · Complex trauma cases', 'রেটিনা বিচ্ছিন্নতা · ডায়াবেটিক রেটিনোপ্যাথি · ম্যাকুলার সমস্যা · CRVO/BRVO (রেটিনার শিরা বন্ধ হয়ে যাওয়া) · ভিট্রিয়াস হেমোরেজ · জটিল আঘাতজনিত সমস্যা',
    'How it works', 'কীভাবে হয়', 'Most procedures are performed through pars plana vitrectomy (PPV) — three tiny openings are made in the white of the eye to remove the vitreous gel and repair the retina from inside, sometimes combined with a gas or silicone oil bubble to hold the retina in place while it heals. Dislocated lenses are corrected using scleral fixation (Yamane technique) when needed.', 'বেশিরভাগ ক্ষেত্রে পার্স প্লানা ভিট্রেক্টমি (PPV) পদ্ধতি ব্যবহার হয় — চোখের সাদা অংশে তিনটি খুবই ছোট ছিদ্র করে ভেতরের জেল বের করে রেটিনা মেরামত করা হয়, প্রয়োজনে গ্যাস বা সিলিকন অয়েল বাবল দিয়ে রেটিনাকে সুস্থ হওয়া পর্যন্ত জায়গামতো ধরে রাখা হয়। লেন্স সরে গেলে প্রয়োজনমতো স্কেরাল ফিক্সেশন (ইয়ামানে টেকনিক) দিয়ে ঠিক করা হয়।',
    '[]'::jsonb,
    'Important', 'বিশেষ নোট', 'Retinal detachment and sudden vitreous hemorrhage are medical emergencies — earlier treatment means a much better chance of preserving vision. If you''re experiencing sudden flashes, floaters, or a curtain-like shadow in your vision, contact the practice immediately.', 'রেটিনা বিচ্ছিন্নতা আর হঠাৎ ভিট্রিয়াস হেমোরেজ — এই দুটোই মেডিকেল ইমার্জেন্সি। যত আগে চিকিৎসা শুরু হয়, দৃষ্টি বাঁচানোর সম্ভাবনা তত বেশি। হঠাৎ চোখে আলোর ঝলকানি, কালো বিন্দু ভাসতে দেখা, বা পর্দার মতো ছায়া দেখলে দেরি না করে যোগাযোগ করুন।',
    'Book an Urgent Consultation', 'জরুরি পরামর্শের জন্য যোগাযোগ করুন', 2
  ),
  (
    'refractive-surgery', 'Refractive Surgery (LASIK / PRK / SMILE)', 'চোখের পাওয়ার সংক্রান্ত সার্জারি (লেসিক / পিআরকে / স্মাইল)',
    'Reduce or remove dependence on glasses and contact lenses.', 'চশমা বা লেন্সের ওপর নির্ভরতা কমানো বা দূর করা।', '/images/services/refractive-surgery.jpg',
    'Procedure', 'যেভাবে হয়', 'Laser (LASIK / PRK / SMILE)', 'লেজার (লেসিক / পিআরকে / স্মাইল)',
    '["Nearsighted / farsighted","Astigmatism","Tired of glasses/lenses"]'::jsonb, '["মায়োপিয়া / হাইপারোপিয়া","অ্যাস্টিগম্যাটিজম","চশমা/লেন্সে ক্লান্ত"]'::jsonb,
    'Refractive surgery reshapes the cornea so light focuses correctly on the retina, reducing or removing dependence on glasses and contact lenses. Dr. Nahal offers LASIK, PRK, Femto-LASIK, and lenticule extraction (SMILE) — the technique chosen depends on your cornea''s thickness, shape, and your lifestyle.', 'রিফ্র্যাক্টিভ সার্জারিতে কর্নিয়ার আকৃতি এমনভাবে পরিবর্তন করা হয় যাতে আলো ঠিকভাবে রেটিনায় গিয়ে পড়ে — ফলে চশমা বা লেন্সের ওপর নির্ভরতা কমে যায় বা একেবারেই দূর হয়। ডা. নাহাল লেসিক, পিআরকে, ফেমটো-লেসিক ও লেন্টিকিউল এক্সট্র্যাকশন (স্মাইল) — চারটি পদ্ধতিতেই কাজ করেন। কোন পদ্ধতি প্রযোজ্য তা নির্ভর করে আপনার কর্নিয়ার পুরুত্ব, আকৃতি ও জীবনযাত্রার ওপর।',
    'Who''s a candidate', 'কারা করাতে পারেন', 'Generally, adults 18+ with a stable eyeglass prescription for at least a year, healthy corneas, and no active eye disease. A detailed pre-surgery evaluation determines candidacy and the best technique.', 'সাধারণত ১৮ বছরের বেশি বয়সী যাদের চশমার পাওয়ার অন্তত এক বছর স্থিতিশীল আছে, চোখ সুস্থ এবং কোনো সক্রিয় রোগ নেই। বিস্তারিত পরীক্ষার পরই নির্ধারণ করা হয় কোন পদ্ধতি সবচেয়ে উপযুক্ত।',
    'The three techniques, briefly', 'তিনটি পদ্ধতি সংক্ষেপে', 'LASIK — a thin corneal flap is created and the underlying tissue reshaped with a laser, then the flap is repositioned; fast visual recovery. PRK — the surface layer is removed and regrows after treatment; better suited to thinner corneas. SMILE — a small lens-shaped piece of tissue is removed through a tiny incision, no flap required; minimally invasive.', 'লেসিক — কর্নিয়ায় পাতলা একটা ফ্ল্যাপ তৈরি করে ভেতরের অংশ লেজার দিয়ে পুনর্গঠন করা হয়, তারপর ফ্ল্যাপ আবার আগের জায়গায় বসিয়ে দেওয়া হয় — দ্রুত সুস্থ হওয়া যায়। পিআরকে — উপরের স্তর সরিয়ে ফেলা হয়, যা চিকিৎসার পর আবার গজায় — পাতলা কর্নিয়ার জন্য বেশি উপযুক্ত। স্মাইল — ছোট্ট একটা ছিদ্র দিয়ে লেন্স-আকৃতির একটা টিস্যু বের করে ফেলা হয়, ফ্ল্যাপ তৈরির দরকার হয় না — সবচেয়ে কম কাটাছেঁড়ার পদ্ধতি।',
    '[]'::jsonb,
    'Recovery', 'সুস্থ হওয়ার সময়', 'LASIK and SMILE patients often notice improved vision within a day; PRK takes slightly longer as the surface layer heals, typically a few days to a week.', 'লেসিক ও স্মাইলে বেশিরভাগ রোগী একদিনের মধ্যেই ভালো দৃষ্টি টের পান; পিআরকেতে উপরের স্তর সারতে একটু বেশি সময় লাগে, সাধারণত কয়েকদিন থেকে এক সপ্তাহ।',
    'Check If You''re a Candidate', 'আপনি উপযুক্ত কিনা যাচাই করুন', 3
  ),
  (
    'squint-surgery', 'Squint (Strabismus) Surgery', 'স্কুইন্ট (স্ট্র্যাবিজমাস) সার্জারি',
    'Realigning misaligned eyes and restoring binocular vision.', 'চোখের অবস্থান ঠিক করে দুই চোখের সমন্বিত দৃষ্টি ফিরিয়ে আনা।', '/images/services/squint-surgery.jpg',
    'Procedure', 'যেভাবে হয়', 'Eye Muscle Surgery', 'চোখের পেশি সার্জারি',
    '["Misaligned eyes","Double vision","Head tilting to see"]'::jsonb, '["চোখ বেঁকে যাওয়া","দুটো করে দেখা","মাথা কাত করে দেখা"]'::jsonb,
    'Squint is a misalignment of the eyes — they don''t point in the same direction at the same time. Left uncorrected, it can affect both appearance and how the two eyes work together.', 'স্কুইন্ট মানে দুই চোখ একসাথে একই দিকে না তাকানো। চিকিৎসা না করালে এটা চেহারা আর দুই চোখ একসাথে কাজ করার ক্ষমতা — দুটোতেই প্রভাব ফেলতে পারে।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'One or both eyes turning in, out, up, or down; double vision; or a child squinting/tilting their head to see clearly.', 'এক বা দুই চোখ ভেতরে, বাইরে, ওপরে বা নিচে বেঁকে যাওয়া; দুটো করে দেখা; অথবা শিশু স্পষ্ট দেখার জন্য চোখ কুঁচকে বা মাথা কাত করে তাকানো।',
    'How it works', 'কীভাবে হয়', 'Depending on cause, treatment ranges from corrective glasses to surgery that adjusts the eye muscles responsible for movement — realigning the eyes and, in many cases, restoring binocular vision.', 'কারণ অনুযায়ী — চশমা থেকে শুরু করে চোখ নড়াচড়ার জন্য দায়ী পেশি সমন্বয় করার সার্জারি, যা চোখ সমান্তরাল করে ও অনেক ক্ষেত্রে দুই চোখ একসাথে ব্যবহারের দৃষ্টি ফিরিয়ে আনে।',
    '[]'::jsonb,
    NULL, NULL, NULL, NULL,
    'Book a Squint Consultation', 'স্কুইন্ট পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন', 4
  ),
  (
    'diabetic-eye-care', 'Diabetic Eye Care', 'ডায়াবেটিক আই কেয়ার',
    'Regular screening and treatment to protect vision from diabetes.', 'ডায়াবেটিসের কারণে দৃষ্টিহানি ঠেকাতে নিয়মিত স্ক্রিনিং ও চিকিৎসা।', '/images/services/diabetic-eye-care.jpg',
    'Procedure', 'যেভাবে হয়', 'Screening + Laser / Injection', 'স্ক্রিনিং + লেজার / ইনজেকশন',
    '["Long-term diabetes","Uncontrolled sugar/BP","No recent eye check"]'::jsonb, '["দীর্ঘদিনের ডায়াবেটিস","অনিয়ন্ত্রিত সুগার/প্রেসার","সম্প্রতি চোখ পরীক্ষা হয়নি"]'::jsonb,
    'Diabetes can silently damage the retina''s blood vessels — diabetic retinopathy is a leading cause of vision loss in working-age adults, and it often has no symptoms until it''s advanced.', 'ডায়াবেটিস নিঃশব্দে রেটিনার রক্তনালীর ক্ষতি করতে পারে — ডায়াবেটিক রেটিনোপ্যাথি কর্মক্ষম বয়সের মানুষদের দৃষ্টিহীনতার একটা প্রধান কারণ, আর অনেক সময় জটিল না হওয়া পর্যন্ত কোনো লক্ষণই বোঝা যায় না।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Anyone with diabetes, especially if it''s been present for several years, or if blood sugar/blood pressure/cholesterol has been hard to control.', 'যেকোনো ডায়াবেটিস রোগী, বিশেষ করে যাদের অনেক বছর ধরে ডায়াবেটিস আছে, বা সুগার/প্রেসার/কোলেস্টেরল নিয়ন্ত্রণে রাখা কঠিন হচ্ছে।',
    'How it works', 'কীভাবে হয়', 'Regular dilated retina screening catches changes early. Treatment — when needed — ranges from close monitoring to anti-VEGF injections, laser therapy, or vitrectomy for advanced cases.', 'নিয়মিত পুতুল বড় করে রেটিনা স্ক্রিনিং করালে পরিবর্তন আগেভাগে ধরা পড়ে। প্রয়োজনে চিকিৎসা — নিয়মিত পর্যবেক্ষণ থেকে শুরু করে অ্যান্টি-ভিইজিএফ ইনজেকশন, লেজার থেরাপি, বা জটিল ক্ষেত্রে ভিট্রেক্টমি পর্যন্ত।',
    '[]'::jsonb,
    NULL, NULL, NULL, NULL,
    'Book a Diabetic Eye Screening', 'ডায়াবেটিক আই স্ক্রিনিং-এর জন্য অ্যাপয়েন্টমেন্ট নিন', 5
  ),
  (
    'glaucoma-management', 'Glaucoma Management', 'গ্লুকোমা ব্যবস্থাপনা',
    'Protecting the optic nerve from "the silent thief of sight."', '"নীরব দৃষ্টিচোর" থেকে অপটিক নার্ভ রক্ষা করা।', '/images/services/glaucoma-management.jpg',
    'Procedure', 'যেভাবে হয়', 'Drops / Laser / Surgery', 'ড্রপ / লেজার / সার্জারি',
    '["Family history of glaucoma","Age 40+","High eye pressure"]'::jsonb, '["পরিবারে গ্লুকোমার ইতিহাস","৪০+ বয়স","চোখের চাপ বেশি"]'::jsonb,
    'Glaucoma damages the optic nerve, usually linked to elevated eye pressure. It progresses slowly and painlessly — often called "the silent thief of sight" because vision loss isn''t noticed until it''s already happened.', 'গ্লুকোমা অপটিক নার্ভের ক্ষতি করে, সাধারণত চোখের চাপ বেড়ে যাওয়ার সাথে যুক্ত। এটা ধীরে ও ব্যথাহীনভাবে বাড়ে — একে "নীরব দৃষ্টিচোর" বলা হয় কারণ দৃষ্টি কমে যাওয়ার আগে বোঝাই যায় না।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Anyone with a family history of glaucoma, or over 40 without a recent eye pressure check.', 'যাদের পরিবারে গ্লুকোমার ইতিহাস আছে, বা ৪০ বছরের বেশি বয়সী যারা সম্প্রতি চোখের চাপ পরীক্ষা করাননি।',
    'How it works', 'কীভাবে হয়', 'Most cases are managed with pressure-lowering eye drops. Select cases may need laser treatment or surgery (such as trabeculectomy) to protect the optic nerve.', 'বেশিরভাগ ক্ষেত্রে চাপ কমানোর ড্রপ দিয়েই নিয়ন্ত্রণ করা যায়। নির্দিষ্ট ক্ষেত্রে অপটিক নার্ভ রক্ষার জন্য লেজার চিকিৎসা বা সার্জারি (যেমন ট্র্যাবেকুলেক্টমি) প্রয়োজন হতে পারে।',
    '[]'::jsonb,
    NULL, NULL, NULL, NULL,
    'Book a Glaucoma Screening', 'গ্লুকোমা স্ক্রিনিং-এর জন্য অ্যাপয়েন্টমেন্ট নিন', 6
  ),
  (
    'dry-eye-corneal-disease', 'Dry Eye & Corneal Disease', 'ড্রাই আই ও কর্নিয়াল রোগ',
    'Relief from chronic dry eye, and urgent corneal infection care.', 'দীর্ঘস্থায়ী ড্রাই আই থেকে মুক্তি, এবং জরুরি কর্নিয়াল সংক্রমণের চিকিৎসা।', '/images/services/dry-eye-corneal-disease.jpg',
    'Procedure', 'যেভাবে হয়', 'Drops / Targeted Treatment', 'ড্রপ / নির্দিষ্ট চিকিৎসা',
    '["Burning or gritty eyes","Heavy screen time","Pain after injury"]'::jsonb, '["জ্বালাপোড়া বা খসখসে ভাব","বেশি স্ক্রিন টাইম","আঘাতের পর ব্যথা"]'::jsonb,
    'Dry eye happens when the eye can''t stay properly lubricated — common with screen time, age, and dry air. Corneal disease (like ulcers or keratitis) is more serious and needs prompt care.', 'চোখ ঠিকমতো আর্দ্র রাখতে না পারলে ড্রাই আই হয় — স্ক্রিন টাইম, বয়স আর শুষ্ক বাতাসে বেশি দেখা যায়। কর্নিয়াল রোগ (যেমন আলসার বা কেরাটাইটিস) বেশি গুরুতর, দ্রুত চিকিৎসা দরকার।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Persistent burning, grittiness, or blurry vision that clears with blinking (dry eye); or pain, redness, and light sensitivity after an injury or contact lens misuse (possible corneal infection — see urgently).', 'লাগাতার জ্বালাপোড়া, খসখসে ভাব, বা পলক পড়লে ঠিক হয়ে যাওয়া ঝাপসা দৃষ্টি (ড্রাই আই); অথবা আঘাত বা লেন্সের ভুল ব্যবহারের পর ব্যথা, লালচেভাব, আলোয় অস্বস্তি (সম্ভাব্য কর্নিয়াল সংক্রমণ — দ্রুত দেখান)।',
    'How it works', 'কীভাবে হয়', 'Dry eye is managed with lubricating drops and lifestyle changes; persistent cases may need targeted treatment. Corneal infections need prompt antibiotic or antifungal treatment to prevent scarring.', 'ড্রাই আই লুব্রিকেটিং ড্রপ ও জীবনযাত্রার পরিবর্তনে সামলানো হয়; দীর্ঘস্থায়ী হলে নির্দিষ্ট চিকিৎসা লাগতে পারে। কর্নিয়াল সংক্রমণে দাগ পড়া ঠেকাতে দ্রুত অ্যান্টিবায়োটিক বা অ্যান্টিফাঙ্গাল চিকিৎসা দরকার।',
    '[]'::jsonb,
    NULL, NULL, NULL, NULL,
    'Book a Dry Eye / Corneal Consultation', 'ড্রাই আই / কর্নিয়া পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন', 7
  ),
  (
    'rop-care', 'ROP Care', 'ROP চিকিৎসা',
    'Specialized retina screening and treatment for premature infants.', 'অপরিণত নবজাতকদের রেটিনা স্ক্রিনিং ও চিকিৎসায় বিশেষজ্ঞ সেবা।', '/images/services/rop-care.jpg',
    'Procedure', 'যেভাবে হয়', 'Screening + Laser', 'স্ক্রিনিং + লেজার',
    '["Born before 34 weeks","Low birth weight","Neonatologist referral"]'::jsonb, '["৩৪ সপ্তাহের আগে জন্ম","কম ওজনে জন্ম","শিশু বিশেষজ্ঞের রেফারেল"]'::jsonb,
    'Premature babies are at risk of abnormal blood vessel growth in the retina, which can threaten vision if untreated. ROP screening and treatment is one of the most time-sensitive areas of ophthalmology — early detection makes the difference between normal vision and permanent vision loss.', 'অপরিণত অবস্থায় জন্ম নেওয়া শিশুদের রেটিনায় অস্বাভাবিক রক্তনালী বৃদ্ধির ঝুঁকি থাকে, যা সময়মতো চিকিৎসা না হলে দৃষ্টিশক্তির জন্য বিপজ্জনক হতে পারে। ROP স্ক্রিনিং ও চিকিৎসা চক্ষুবিদ্যার সবচেয়ে সময়-সংবেদনশীল একটি বিষয় — দ্রুত শনাক্ত করাই স্বাভাবিক দৃষ্টি আর স্থায়ী দৃষ্টিহীনতার মধ্যে পার্থক্য গড়ে দেয়।',
    'Who needs screening', 'কাদের স্ক্রিনিং দরকার', 'Babies born before 34 weeks of gestation, or with low birth weight, should be screened starting around 3–4 weeks after birth, as advised by the treating pediatrician or neonatologist.', '৩৪ সপ্তাহের আগে জন্ম নেওয়া, অথবা কম ওজন নিয়ে জন্মানো শিশুদের জন্মের প্রায় ৩-৪ সপ্তাহ পর থেকেই স্ক্রিনিং শুরু করা উচিত, শিশু বিশেষজ্ঞের পরামর্শ অনুযায়ী।',
    'How it''s treated', 'কীভাবে চিকিৎসা হয়', 'Depending on severity, treatment ranges from continued monitoring, to laser therapy on the retina, to anti-VEGF injections, to surgery in advanced cases. Most cases caught early can be managed without surgery.', 'সমস্যার তীব্রতা অনুযায়ী চিকিৎসা হতে পারে নিয়মিত পর্যবেক্ষণ, রেটিনায় লেজার থেরাপি, অ্যান্টি-ভিইজিএফ ইনজেকশন, অথবা জটিল ক্ষেত্রে সার্জারি। আগেভাগে ধরা পড়লে বেশিরভাগ ক্ষেত্রেই সার্জারি ছাড়াই সামলানো যায়।',
    '[]'::jsonb,
    NULL, NULL, NULL, NULL,
    'Book a Newborn Eye Screening', 'নবজাতকের চোখ পরীক্ষার অ্যাপয়েন্টমেন্ট নিন', 8
  ),
  (
    'oculoplasty', 'Oculoplasty', 'অকুলোপ্লাস্টি',
    'Eyelid, tear duct, and orbital procedures.', 'চোখের পাতা, অশ্রুনালী ও অরবিটাল সংক্রান্ত চিকিৎসা।', '/images/services/oculoplasty.jpg',
    'Procedure', 'যেভাবে হয়', 'Reconstructive Surgery', 'রিকনস্ট্রাক্টিভ সার্জারি',
    '["Drooping eyelid","Lid tumor / chalazion","Blocked tear duct"]'::jsonb, '["চোখের পাতা ঝুলে পড়া","পাতার টিউমার / চ্যালাজিয়ন","অশ্রুনালী বন্ধ"]'::jsonb,
    'Oculoplasty covers surgical care for the structures around the eye — eyelids, tear ducts, and the orbit (eye socket) — addressing both function and appearance.', 'অকুলোপ্লাস্টির আওতায় পড়ে চোখের চারপাশের অংশের সার্জারি — চোখের পাতা, অশ্রুনালী এবং অরবিট (চোখের কোটর) — যা কার্যকারিতা ও চেহারা দুটোই ঠিক রাখে।',
    'Conditions treated', 'যেসব সমস্যার চিকিৎসা হয়', 'Ptosis (drooping eyelid) · Lid tumors & chalazion removal · Tear duct blockage (DCR) · Orbital tumors and trauma', 'পিটোসিস (চোখের পাতা ঝুলে পড়া) · পাতার টিউমার ও চ্যালাজিয়ন অপসারণ · অশ্রুনালী বন্ধ হয়ে যাওয়া (DCR) · অরবিটাল টিউমার ও আঘাতজনিত সমস্যা',
    'How it works', 'কীভাবে হয়', 'Procedures are tailored to the specific condition — ptosis repair tightens the muscle that lifts the eyelid; DCR creates a new drainage path for tears; tumor removal is combined with reconstruction to preserve normal eyelid function and appearance.', 'প্রতিটি সমস্যার জন্য আলাদা পদ্ধতি — পিটোসিস মেরামতে পাতা তোলার পেশি টানটান করা হয়; DCR-এ অশ্রুর জন্য নতুন নিষ্কাশন পথ তৈরি করা হয়; টিউমার অপসারণের সাথে পুনর্গঠনও করা হয় যাতে পাতার স্বাভাবিক কাজ ও চেহারা বজায় থাকে।',
    '[]'::jsonb,
    NULL, NULL, NULL, NULL,
    'Book an Oculoplasty Consultation', 'অকুলোপ্লাস্টি পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন', 9
  ),
  (
    'pterygium-surgery', 'Pterygium Surgery', 'পিটেরিজিয়াম সার্জারি',
    'Surgical removal with graft to reduce recurrence.', 'গ্রাফটসহ সার্জারি করে অপসারণ, পুনরায় ফিরে আসার সম্ভাবনা কমাতে।', '/images/services/pterygium-surgery.jpg',
    'Procedure', 'যেভাবে হয়', 'Removal + Conjunctival Graft', 'অপসারণ + কনজাংটিভাল গ্রাফট',
    '["Redness / irritation","Visible growth on eye","Long sun/wind exposure"]'::jsonb, '["লালচেভাব / জ্বালাপোড়া","চোখে দৃশ্যমান বৃদ্ধি","রোদ-বাতাসে দীর্ঘদিন কাজ"]'::jsonb,
    'A pterygium is a growth of tissue on the white of the eye, often caused by long-term sun and wind exposure, that can extend onto the cornea and affect vision if left untreated.', 'পিটেরিজিয়াম হলো চোখের সাদা অংশে টিস্যুর একটা বৃদ্ধি, যা সাধারণত দীর্ঘদিন রোদ ও বাতাসের সংস্পর্শে থাকার কারণে হয়। চিকিৎসা না করালে এটি কর্নিয়া পর্যন্ত ছড়িয়ে দৃষ্টিতে প্রভাব ফেলতে পারে।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Redness, irritation, a visible growth on the eye, or blurred vision if the growth has reached the cornea.', 'চোখ লাল হওয়া, জ্বালাপোড়া, চোখে দৃশ্যমান একটা বৃদ্ধি, অথবা এটি কর্নিয়া পর্যন্ত পৌঁছালে দৃষ্টি ঝাপসা হয়ে যাওয়া।',
    'How it works', 'কীভাবে হয়', 'The growth is surgically removed and the area covered with a conjunctival graft (using the eye''s own tissue) to reduce the chance of recurrence — a well-established, low-risk procedure.', 'বৃদ্ধিটুকু সার্জারি করে অপসারণ করা হয় এবং সেই জায়গা কনজাংটিভাল গ্রাফট (চোখের নিজস্ব টিস্যু ব্যবহার করে) দিয়ে ঢেকে দেওয়া হয়, যাতে আবার ফিরে আসার সম্ভাবনা কমে যায় — একটি সুপরিচিত ও কম ঝুঁকিপূর্ণ পদ্ধতি।',
    '[]'::jsonb,
    NULL, NULL, NULL, NULL,
    'Book a Pterygium Consultation', 'পিটেরিজিয়াম পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন', 10
  ),
  (
    'eye-trauma-emergency', 'Eye Trauma & Emergency Care', 'চোখের আঘাত ও জরুরি চিকিৎসা',
    'Time-sensitive care for eye injuries and sudden vision loss.', 'চোখের আঘাত ও হঠাৎ দৃষ্টি হারানোর জন্য সময়-সংবেদনশীল চিকিৎসা।', '/images/services/eye-trauma-emergency.png',
    'Procedure', 'যেভাবে হয়', 'Urgent Evaluation + Treatment', 'জরুরি মূল্যায়ন + চিকিৎসা',
    '["Any eye injury","Sudden vision loss","Flashes / new floaters"]'::jsonb, '["যেকোনো চোখের আঘাত","হঠাৎ দৃষ্টি হারানো","আলোর ঝলকানি / নতুন বিন্দু"]'::jsonb,
    'Eye injuries and sudden vision changes can threaten sight permanently if not treated quickly — some are true emergencies where every hour matters.', 'চোখের আঘাত আর হঠাৎ দৃষ্টি পরিবর্তন দ্রুত চিকিৎসা না হলে স্থায়ীভাবে দৃষ্টি কেড়ে নিতে পারে — কিছু ক্ষেত্রে সত্যিকারের জরুরি অবস্থা, যেখানে প্রতিটা ঘণ্টা গুরুত্বপূর্ণ।',
    'Who needs it', 'কার প্রয়োজন হতে পারে', 'Any eye injury (chemical, blunt, or sharp trauma), sudden vision loss, flashes of light, a shower of new floaters, or a shadow across your vision.', 'যেকোনো চোখের আঘাত (রাসায়নিক, আঘাতজনিত, বা ধারালো কিছু দিয়ে), হঠাৎ দৃষ্টি হারানো, আলোর ঝলকানি, অনেকগুলো নতুন কালো বিন্দু, বা দৃষ্টিতে ছায়া।',
    'How it works', 'কীভাবে হয়', 'Urgent evaluation determines the extent of injury, followed by treatment ranging from medication to emergency surgery depending on severity. Time-sensitive — contact the practice immediately rather than waiting for a routine appointment.', 'জরুরি পরীক্ষায় আঘাতের মাত্রা বোঝা হয়, তারপর তীব্রতা অনুযায়ী ওষুধ থেকে জরুরি সার্জারি পর্যন্ত চিকিৎসা। সময়-সংবেদনশীল — নিয়মিত অ্যাপয়েন্টমেন্টের বদলে সাথে সাথে যোগাযোগ করুন।',
    '[]'::jsonb,
    NULL, NULL, NULL, NULL,
    'Emergency? Call Immediately', 'জরুরি অবস্থা? এখনই কল করুন', 11
  )
ON CONFLICT (slug) DO NOTHING;

-- 6.4 CONDITIONS & DISEASES (All 16 Conditions)
INSERT INTO public.conditions (slug, name_en, name_bn, tier, category_en, category_bn, image_url, tags_en, tags_bn, what_is_it_en, what_is_it_bn, why_it_happens_en, why_it_happens_bn, how_treated_en, how_treated_bn, emergency_note_en, emergency_note_bn, related_service_slug, order_index)
VALUES
  (
    'cataract', 'Cataract', 'ছানি',
    'Core', 'Cataract & Lens', 'ছানি ও লেন্স', '/images/2. Conditions_Images/1. Cataract.png',
    '["Blurry vision","Faded colors","Night glare"]'::jsonb, '["ঝাপসা দৃষ্টি","ফিকে রং","রাতে আলোয় ধাঁধা"]'::jsonb,
    'A cataract is a clouding of the eye''s natural lens, which normally is clear. As it clouds, light can''t pass through properly, and vision gradually becomes blurry, dim, or hazy — like looking through a foggy window.', 'ছানি হলো চোখের প্রাকৃতিক লেন্স, যা স্বাভাবিকভাবে স্বচ্ছ থাকার কথা, ধীরে ধীরে ঘোলাটে হয়ে যাওয়া। লেন্স ঘোলা হলে আলো ঠিকমতো ভেতরে যেতে পারে না, ফলে দৃষ্টি ধীরে ধীরে ঝাপসা, ম্লান বা কুয়াশাচ্ছন্ন হয়ে যায় — অনেকটা কুয়াশা ভরা জানালা দিয়ে দেখার মতো।',
    'Most commonly, aging. Other contributors include diabetes, long-term steroid use, previous eye injury, and prolonged UV exposure. It''s the most common cause of treatable vision loss in adults.', 'সবচেয়ে বড় কারণ বয়স বাড়া। এছাড়া ডায়াবেটিস, দীর্ঘদিন স্টেরয়েড ব্যবহার, আগে চোখে আঘাত, বা দীর্ঘদিন রোদে থাকাও কারণ হতে পারে। প্রাপ্তবয়স্কদের চিকিৎসাযোগ্য দৃষ্টিহীনতার সবচেয়ে সাধারণ কারণ এটি।',
    'Cataracts don''t respond to eye drops or glasses once they''ve progressed — the only effective treatment is surgical removal (phacoemulsification), replacing the clouded lens with a clear artificial one. It''s a quick, well-established outpatient procedure.', 'ছানি একবার বেড়ে গেলে ড্রপ বা চশমা দিয়ে ঠিক হয় না — একমাত্র কার্যকর চিকিৎসা হলো সার্জারি করে ঘোলা লেন্স বদলে স্বচ্ছ কৃত্রিম লেন্স বসানো (ফ্যাকোইমালসিফিকেশন)। এটি একটি দ্রুত, সুপরিচিত ও নিরাপদ আউটপেশেন্ট পদ্ধতি।',
    NULL, NULL,
    'cataract-surgery', 1
  ),
  (
    'diabetic-retinopathy', 'Diabetic Retinopathy', 'ডায়াবেটিক রেটিনোপ্যাথি',
    'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/2. Conditions_Images/2. Diabetic Retinopathy.png',
    '["Blood sugar","Floaters","Microaneurysms"]'::jsonb, '["ব্লাড সুগার","কালো বিন্দু ভাসা","রক্তনালীর ক্ষতি"]'::jsonb,
    'A complication of diabetes where high blood sugar damages the tiny blood vessels in the retina, causing them to leak, swell, or grow abnormally. Left untreated, it''s a leading cause of blindness in working-age adults.', 'ডায়াবেটিসের একটি জটিলতা, যেখানে রক্তে অতিরিক্ত সুগার রেটিনার সূক্ষ্ম রক্তনালীগুলোর ক্ষতি করে — এগুলো থেকে রক্তরস চুইয়ে পড়ে, ফুলে যায়, বা অস্বাভাবিকভাবে বাড়তে থাকে। চিকিৎসা না করালে এটি কর্মক্ষম বয়সের মানুষদের দৃষ্টিহীনতার অন্যতম প্রধান কারণ।',
    'Prolonged high blood sugar weakens retinal blood vessels over time. Risk increases the longer someone has had diabetes, and with poorly controlled blood sugar, blood pressure, or cholesterol.', 'দীর্ঘদিন ধরে রক্তে সুগার বেশি থাকলে রেটিনার রক্তনালী ধীরে ধীরে দুর্বল হয়ে যায়। যতদিন ধরে ডায়াবেটিস আছে এবং সুগার/প্রেসার/কোলেস্টেরল যত কম নিয়ন্ত্রণে থাকে, ঝুঁকি তত বাড়ে।',
    'Early stages are monitored closely with regular retina exams. More advanced stages may need anti-VEGF injections, laser treatment, or vitrectomy surgery if there''s bleeding or scar tissue affecting the retina. Early detection makes treatment far more effective.', 'প্রাথমিক পর্যায়ে নিয়মিত রেটিনা পরীক্ষার মাধ্যমে নজরে রাখা হয়। জটিল পর্যায়ে অ্যান্টি-ভিইজিএফ ইনজেকশন, লেজার চিকিৎসা, অথবা রক্তক্ষরণ বা দাগ টিস্যু হলে ভিট্রেক্টমি সার্জারি প্রয়োজন হতে পারে। লক্ষণ দেখা দেওয়ার আগেই ধরা পড়লে চিকিৎসা অনেক বেশি কার্যকর হয়।',
    NULL, NULL,
    'diabetic-eye-care', 2
  ),
  (
    'retinal-detachment', 'Retinal Detachment', 'রেটিনা বিচ্ছিন্নতা',
    'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/2. Conditions_Images/3. Retinal Detachment.png',
    '["Emergency","Light flashes","Shadow curtain"]'::jsonb, '["জরুরি অবস্থা","আলোর ঝলকানি","দৃষ্টিতে ছায়া"]'::jsonb,
    'A medical emergency where the retina pulls away from the back wall of the eye, cutting off its blood and oxygen supply. Without prompt treatment, it causes permanent vision loss in the affected area.', 'এটি একটি মেডিকেল ইমার্জেন্সি, যেখানে রেটিনা চোখের পেছনের দেয়াল থেকে সরে যায়, ফলে তার রক্ত ও অক্সিজেন সরবরাহ বন্ধ হয়ে যায়। দ্রুত চিকিৎসা না হলে ওই অংশে দৃষ্টি স্থায়ীভাবে হারিয়ে যায়।',
    'Most often from a retinal tear that lets fluid seep underneath the retina, or from severe injury, high myopia, or complications after other eye surgery.', 'সবচেয়ে বেশি হয় রেটিনায় ছিদ্র/ছিঁড়ে যাওয়া থেকে, যার ফলে তরল রেটিনার নিচে ঢুকে যায়। এছাড়া গুরুতর আঘাত, উচ্চমাত্রার মায়োপিয়া, বা অন্য চোখের সার্জারির পর জটিলতা থেকেও হতে পারে।',
    'Surgery is required and time-sensitive — pars plana vitrectomy, scleral buckle, or pneumatic retinopexy, depending on the type and location of the detachment. The earlier it''s treated, the better the chance of restoring useful vision.', 'সার্জারি প্রয়োজন এবং সেটা দ্রুত করাতে হয় — পার্স প্লানা ভিট্রেক্টমি, স্কেরাল বাকল, বা নিউম্যাটিক রেটিনোপেক্সি, বিচ্ছিন্নতার ধরন ও অবস্থান অনুযায়ী। যত দ্রুত চিকিৎসা হয়, দৃষ্টি ফিরে পাওয়ার সম্ভাবনা তত বেশি।',
    'Sudden flashes of light, a shower of new floaters, or a shadow/curtain moving across your vision are warning signs — contact the practice immediately, don''t wait for an appointment.', 'হঠাৎ চোখে আলোর ঝলকানি, অনেকগুলো নতুন কালো বিন্দু ভাসতে দেখা, বা দৃষ্টির কোনো অংশে পর্দার মতো ছায়া নড়াচড়া করা — এগুলো বিপদের লক্ষণ। অ্যাপয়েন্টমেন্টের জন্য অপেক্ষা না করে সাথে সাথে যোগাযোগ করুন।',
    'vitreoretinal-surgery', 3
  ),
  (
    'macular-disease-cscr', 'Macular Problems / CSCR', 'ম্যাকুলার সমস্যা (CSCR সহ)',
    'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/2. Conditions_Images/4. Macular Disease.png',
    '["Central vision","CSCR","Distorted lines"]'::jsonb, '["কেন্দ্রীয় দৃষ্টি","সিএসআর","বাঁকা রেখা দেখা"]'::jsonb,
    'The macula is the small central part of the retina responsible for sharp, detailed vision — reading, recognizing faces, driving. Problems here affect central vision specifically. Central Serous Chorioretinopathy (CSCR) is one common condition where fluid builds up under the macula.', 'ম্যাকুলা হলো রেটিনার ছোট্ট কেন্দ্রীয় অংশ, যা স্পষ্ট ও সূক্ষ্ম দৃষ্টির জন্য দায়ী — পড়া, মুখ চেনা, গাড়ি চালানো। এখানে সমস্যা হলে মূলত সরাসরি সামনের দৃষ্টি প্রভাবিত হয়। সেন্ট্রাল সেরাস কোরিওরেটিনোপ্যাথি (CSCR) এমনই একটি সাধারণ সমস্যা, যেখানে ম্যাকুলার নিচে তরল জমে যায়।',
    'Age-related changes, stress, steroid use, and high blood pressure are linked to macular problems. CSCR is notably common in stressed, otherwise-healthy young to middle-aged adults.', 'বয়সজনিত পরিবর্তন, মানসিক চাপ, স্টেরয়েড ব্যবহার, আর উচ্চ রক্তচাপ — এসবের সাথে ম্যাকুলার সমস্যার সম্পর্ক আছে, বিশেষ করে CSCR প্রায়ই দেখা যায় মানসিক চাপে থাকা অন্যথায় সুস্থ তরুণ-মধ্যবয়সীদের মধ্যে।',
    'Many CSCR cases resolve with monitoring and stress/steroid management. Persistent or recurrent cases may need laser treatment or targeted injections. Other macular conditions are evaluated individually with retinal imaging.', 'অনেক CSCR কেস নিয়মিত পর্যবেক্ষণ ও মানসিক চাপ/স্টেরয়েড নিয়ন্ত্রণের মাধ্যমেই নিজে থেকে সেরে যায়। বারবার হতে থাকলে লেজার চিকিৎসা বা নির্দিষ্ট ইনজেকশন লাগতে পারে। অন্যান্য ম্যাকুলার সমস্যা রেটিনা ইমেজিং করে নির্ধারণ করা হয়।',
    NULL, NULL,
    'vitreoretinal-surgery', 4
  ),
  (
    'crvo-brvo', 'Retinal Vein Occlusion (CRVO / BRVO)', 'রেটিনার শিরা বন্ধ (CRVO / BRVO)',
    'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/2. Conditions_Images/5. CRVO _ BRVO (Retinal Vein Occlusion).png',
    '["Vascular block","Painless blur","Hypertension"]'::jsonb, '["রক্তনালী ব্লকেজ","ব্যথাহীন ঝাপসা","উচ্চ রক্তচাপ"]'::jsonb,
    'A blockage in one of the veins carrying blood away from the retina — central (CRVO) if the main vein is blocked, or branch (BRVO) if a smaller branch is affected. This causes blood and fluid to leak into the retina, often causing sudden, painless blurring.', 'রেটিনা থেকে রক্ত বহনকারী শিরাগুলোর একটিতে ব্লকেজ — মূল শিরা বন্ধ হলে সেন্ট্রাল (CRVO), আর একটি শাখা বন্ধ হলে ব্রাঞ্চ (BRVO)। এর ফলে রক্ত ও তরল রেটিনায় চুইয়ে পড়ে, প্রায়ই হঠাৎ ব্যথাহীনভাবে দৃষ্টি ঝাপসা হয়ে যায়।',
    'Strongly linked to high blood pressure, diabetes, high cholesterol, and glaucoma. It''s more common with age and in people with cardiovascular risk factors.', 'উচ্চ রক্তচাপ, ডায়াবেটিস, উচ্চ কোলেস্টেরল আর গ্লুকোমার সাথে এর গভীর সম্পর্ক আছে। বয়স বাড়ার সাথে এবং হৃদরোগের ঝুঁকি থাকা মানুষদের মধ্যে এটি বেশি দেখা যায়।',
    'Treatment focuses on reducing swelling and preventing complications — anti-VEGF injections are primary, sometimes combined with laser therapy. Managing blood pressure and diabetes is just as important as eye care.', 'ফোলাভাব কমানো আর জটিলতা ঠেকানোই মূল লক্ষ্য — অ্যান্টি-ভিইজিএফ ইনজেকশনই প্রধান চিকিৎসা, কখনো কখনো লেজার থেরাপির সাথে মিলিয়ে। চোখের চিকিৎসার পাশাপাশি রক্তচাপ ও ডায়াবেটিস নিয়ন্ত্রণ করা সমান গুরুত্বপূর্ণ।',
    NULL, NULL,
    'vitreoretinal-surgery', 5
  ),
  (
    'vitreous-hemorrhage', 'Vitreous Hemorrhage', 'ভিট্রিয়াস হেমোরেজ (চোখের ভেতরে রক্তক্ষরণ)',
    'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/2. Conditions_Images/6. Vitreous Hemorrhage.png',
    '["Internal bleeding","Sudden darkness","Vitrectomy"]'::jsonb, '["অভ্যন্তরীণ রক্তক্ষরণ","হঠাৎ অন্ধকার","ভিট্রেক্টমি"]'::jsonb,
    'Bleeding into the vitreous — the clear gel that fills the eye — which blocks light from reaching the retina, causing sudden blurred vision, new floaters, or in severe cases, near-total vision loss in that eye.', 'চোখের ভেতরের স্বচ্ছ জেল (ভিট্রিয়াস)-এর মধ্যে রক্তক্ষরণ, যা আলোকে রেটিনা পর্যন্ত পৌঁছাতে বাধা দেয় — ফলে হঠাৎ দৃষ্টি ঝাপসা হয়ে যাওয়া, নতুন কালো বিন্দু ভাসতে দেখা, বা গুরুতর ক্ষেত্রে সেই চোখে প্রায় সম্পূর্ণ দৃষ্টি হারানো।',
    'Most commonly from diabetic retinopathy, retinal tears or detachment, or trauma. Less commonly from blood vessel abnormalities or clotting disorders.', 'সবচেয়ে বেশি হয় ডায়াবেটিক রেটিনোপ্যাথি থেকে (অস্বাভাবিক রক্তনালী থেকে রক্তক্ষরণ), রেটিনা ছিঁড়ে যাওয়া বা বিচ্ছিন্ন হওয়া থেকে, অথবা আঘাত থেকে। কম ক্ষেত্রে রক্তনালীর সমস্যা থেকেও হতে পারে।',
    'Small hemorrhages often clear on their own with monitoring. Larger or persistent hemorrhages — especially when a retinal tear needs to be repaired — require pars plana vitrectomy to clear the blood and fix the retina.', 'ছোটখাটো রক্তক্ষরণ প্রায়ই পর্যবেক্ষণের মধ্যেই নিজে থেকে সেরে যায়। বড় বা দীর্ঘস্থায়ী রক্তক্ষরণে — বিশেষ করে যখন মূল কারণ (যেমন রেটিনা ছিঁড়ে যাওয়া) খুঁজে চিকিৎসা করা দরকার — পার্স প্লানা ভিট্রেক্টমি করে রক্ত পরিষ্কার করতে হয়।',
    NULL, NULL,
    'vitreoretinal-surgery', 6
  ),
  (
    'rop', 'Retinopathy of Prematurity (ROP)', 'নবজাতকের রেটিনা সমস্যা (ROP)',
    'Core', 'Pediatric & Strabismus', 'শিশুর চোখ ও স্কুইন্ট', '/images/2. Conditions_Images/7. Retinopathy of Prematurity (ROP).png',
    '["Premature infants","NICU screening","Time-critical"]'::jsonb, '["অপরিণত নবজাতক","এনআইসিইউ স্ক্রিনিং","সময়-সংবেদনশীল"]'::jsonb,
    'Abnormal blood vessel growth in the retina of premature babies, whose eyes haven''t finished developing at birth. In severe cases, it can lead to retinal detachment and permanent blindness if untreated.', 'অপরিণত অবস্থায় জন্ম নেওয়া শিশুদের রেটিনায় অস্বাভাবিক রক্তনালী বৃদ্ধি, যাদের চোখ জন্মের সময় পুরোপুরি গঠিত হয়নি। গুরুতর ক্ষেত্রে চিকিৎসা না করালে রেটিনা বিচ্ছিন্ন হয়ে স্থায়ী দৃষ্টিহীনতা হতে পারে।',
    'Retinal blood vessels finish developing near full-term. Babies born before 34 weeks or under 2000 grams have incompletely developed vessels that may grow abnormally under oxygen therapy and other stressors.', 'রেটিনার রক্তনালী সাধারণত পূর্ণ গর্ভকালীন সময়ের কাছাকাছি গিয়ে গঠন সম্পূর্ণ হয়। আগেভাগে জন্ম নেওয়া — বিশেষ করে ৩৪ সপ্তাহের আগে বা খুব কম ওজনে — শিশুদের রেটিনার রক্তনালী অসম্পূর্ণ থাকে, যা পরে অস্বাভাবিকভাবে বাড়তে পারে।',
    'Screening starts in the first 3–4 weeks for at-risk infants. Treatments include regular monitoring, laser photocoagulation, anti-VEGF injections, or vitrectomy surgery in advanced stages.', 'ঝুঁকিপূর্ণ শিশুদের জন্মের প্রথম কয়েক সপ্তাহের মধ্যেই স্ক্রিনিং শুরু হয়। তীব্রতা অনুযায়ী চিকিৎসা: নিয়মিত পর্যবেক্ষণ, রেটিনায় লেজার চিকিৎসা, অ্যান্টি-ভিইজিএফ ইনজেকশন, অথবা জটিল ক্ষেত্রে সার্জারি।',
    NULL, NULL,
    'rop-care', 7
  ),
  (
    'refractive-error', 'Refractive Error (Myopia, Hyperopia, Astigmatism)', 'রিফ্র্যাক্টিভ এরর (পাওয়ার সমস্যা)',
    'Core', 'Refractive & Cornea', 'রিফ্র্যাক্টিভ ও কর্নিয়া', '/images/2. Conditions_Images/8. Refractive Error.png',
    '["Myopia","LASIK","Glasses free"]'::jsonb, '["মায়োপিয়া","লেসিক","চশমামুক্ত জীবন"]'::jsonb,
    'The eye''s inability to focus light precisely on the retina, causing blurred vision at certain distances. Myopia (nearsightedness), hyperopia (farsightedness), and astigmatism (irregular curvature) are the main types.', 'চোখের আলোকে রেটিনায় ঠিকভাবে ফোকাস করতে না পারা, যার ফলে নির্দিষ্ট দূরত্বে দৃষ্টি ঝাপসা হয়ে যায়। মায়োপিয়া (কাছের জিনিস স্পষ্ট, দূরের ঝাপসা), হাইপারমেট্রোপিয়া (দূরের স্পষ্ট, কাছের ঝাপসা), আর অ্যাস্টিগমাটিজম প্রধান তিন ধরন।',
    'Largely genetic, but also influenced by excessive close screen/reading time during childhood and corneal or eyeball shape variations.', 'মূলত বংশগত, তবে ছোটবেলা থেকে বেশি স্ক্রিন টাইম বা কাছে থেকে পড়াশোনার প্রভাবও আছে। চোখের গোলকের আকৃতি বা কর্নিয়ার বক্রতা আলোকে রেটিনায় ঠিকমতো ফোকাস করতে পারে না।',
    'Glasses and contact lenses correct it non-surgically. For permanent freedom from glasses, refractive surgery (LASIK, PRK, SMILE, or ICL) reshapes the cornea or implants a corrective lens.', 'চশমা বা লেন্স দিয়ে অস্ত্রোপচার ছাড়াই এটি ঠিক করা যায়। যারা এই নির্ভরতা কমাতে বা দূর করতে চান, তাদের জন্য রিফ্র্যাক্টিভ সার্জারি (লেসিক, পিআরকে, বা স্মাইল) কর্নিয়ার আকৃতি স্থায়ীভাবে পরিবর্তন করে দেয়।',
    NULL, NULL,
    'refractive-surgery', 8
  ),
  (
    'dislocated-lens', 'Dislocated Lens & Scleral-Fixated IOL', 'ডিসলোকেটেড লেন্স ও স্কেরাল ফিক্সেটেড IOL',
    'Core', 'Cataract & Lens', 'ছানি ও লেন্স', '/images/2. Conditions_Images/9. Dislocated Lens.png',
    '["IOL dislocation","Yamane technique","Trauma"]'::jsonb, '["লেন্স সরে যাওয়া","ইয়ামানে পদ্ধতি","চোখে আঘাত"]'::jsonb,
    'When an artificial lens (IOL) placed during previous cataract surgery — or the eye''s natural lens — shifts out of position or falls into the back of the eye, vision becomes suddenly blurred or doubled.', 'আগের ছানি অপারেশনে বসানো কৃত্রিম লেন্স (IOL) — অথবা চোখের নিজের লেন্স — যদি জায়গা থেকে সরে যায় বা চোখের পেছনে পড়ে যায়, তাহলে হঠাৎ দৃষ্টি ঝাপসা বা দুটো করে দেখা যেতে পারে।',
    'Weak support structures (zonules) from trauma, previous complex eye surgery, genetic conditions (like Marfan syndrome), or age-related weakening cause the lens to dislocate.', 'আঘাত, আগের চোখের সার্জারি, নির্দিষ্ট কিছু বংশগত সমস্যা, বা বয়সজনিত দুর্বলতার কারণে লেন্স ধরে রাখা সাপোর্ট (জোনিউল) দুর্বল হয়ে গেলে লেন্স অস্থির হয়ে সরে যেতে পারে।',
    'The dislocated lens is repositioned or removed and replaced with a new one secured directly to the eye wall (sclera) using sutures or the modern sutureless Yamane technique.', 'সরে যাওয়া লেন্স আবার জায়গামতো বসানো হয় বা বদলে নতুন একটা লেন্স চোখের দেয়ালে (স্কেরা) সরাসরি সেলাই বা সেলাইবিহীন আধুনিক ইয়ামানে টেকনিকে স্থাপন করা হয়।',
    NULL, NULL,
    'cataract-surgery', 9
  ),
  (
    'ptosis', 'Ptosis (Drooping Eyelid)', 'পিটোসিস (চোখের পাতা ঝুলে পড়া)',
    'Core', 'Oculoplasty & Orbit', 'অকুলোপ্লাস্টি ও অরবিট', '/images/2. Conditions_Images/10. Ptosis.png',
    '["Drooping lid","Levator muscle","Day surgery"]'::jsonb, '["পাতা ঝুলে পড়া","লিভেটর পেশি","ডে সার্জারি"]'::jsonb,
    'The drooping of the upper eyelid, which can be mild (a cosmetic concern) or severe enough to block part of the pupil and obstruct vision.', 'উপরের চোখের পাতা ঝুলে পড়া, যা হালকা (শুধু চেহারার সমস্যা) থেকে শুরু করে দৃষ্টির কিছু অংশ ঢেকে ফেলার মতো গুরুতরও হতে পারে।',
    'Most often age-related weakening of the eyelid-lifting muscle (levator), but can also be congenital, caused by nerve problems, eye trauma, or previous eye surgery.', 'সবচেয়ে বেশি হয় বয়সের সাথে পাতা তোলার পেশি দুর্বল হয়ে যাওয়ার কারণে, তবে জন্ম থেকেও থাকতে পারে, অথবা স্নায়ুর সমস্যা, চোখে আঘাত, বা আগের সার্জারির কারণেও হতে পারে।',
    'Surgical correction tightens or reattaches the muscle responsible for lifting the eyelid, restoring both normal appearance and unobstructed field of vision. Done under local anesthesia.', 'সার্জারি করে পাতা তোলার জন্য দায়ী পেশি টানটান বা পুনঃসংযুক্ত করা হয়, যাতে চেহারা স্বাভাবিক হয় আর বাধাহীন দৃষ্টি ফিরে আসে। এটি স্থানীয় অ্যানেস্থেসিয়ায় দ্রুত করা হয়।',
    NULL, NULL,
    'oculoplasty', 10
  ),
  (
    'pterygium', 'Pterygium (Surfer''s Eye)', 'পিটেরিজিয়াম (মাংসবৃদ্ধি)',
    'Core', 'Cornea & Surface', 'কর্নিয়া ও উপরিভাগ', '/images/2. Conditions_Images/11. Pterygium.png',
    '["Fleshy growth","UV exposure","Conjunctival graft"]'::jsonb, '["মাংসল বৃদ্ধি","রোদের ক্ষতি","কনজাংটিভাল গ্রাফট"]'::jsonb,
    'A fleshy, triangular growth of tissue on the white of the eye that can extend onto the cornea. Common in people with significant outdoor sun and wind exposure.', 'চোখের সাদা অংশে মাংসল, ত্রিভুজাকার একটা টিস্যুর বৃদ্ধি, যা কর্নিয়া পর্যন্ত বিস্তৃত হতে পারে। যারা বেশি রোদে বাইরে কাজ করেন তাদের মধ্যে বেশি দেখা যায়।',
    'Long-term ultraviolet (UV) radiation, wind, and dust exposure — common among farmers, outdoor workers, and drivers.', 'দীর্ঘদিন সূর্যের অতিবেগুনি রশ্মি, বাতাস ও ধুলাবালির সংস্পর্শ — কৃষি, মাছ ধরা, পরিবহন বা নির্মাণ কাজের সাথে যুক্ত মানুষদের মধ্যে বেশি দেখা যায়।',
    'Small growths may just need lubricant drops and sunglasses. Growths causing irritation or approaching the visual axis are removed surgically with an autograft to prevent recurrence.', 'ছোট পিটেরিজিয়াম শুধু পর্যবেক্ষণ আর সুরক্ষামূলক চশমা দিয়েই সামলানো যায়। দৃষ্টিতে প্রভাব ফেললে সার্জারি করে অপসারণ করা হয় এবং কনজাংটিভাল গ্রাফট দেওয়া হয় যাতে পুনরায় না হয়।',
    NULL, NULL,
    'pterygium-surgery', 11
  ),
  (
    'thyroid-eye-disease', 'Thyroid Eye Disease & Orbital Disorders', 'থাইরয়েড আই ডিজিজ ও অরবিটাল সমস্যা',
    'Core', 'Oculoplasty & Orbit', 'অকুলোপ্লাস্টি ও অরবিট', '/images/2. Conditions_Images/12. Thyroid Eye Disease.png',
    '["Bulging eyes","Graves disease","Diplopia"]'::jsonb, '["চোখ বেরিয়ে আসা","গ্রেভস ডিজিজ","দুটো দেখা"]'::jsonb,
    'An autoimmune condition where immune cells attack fat and muscle tissue around the eyes, causing bulging eyes (proptosis), eyelid retraction, dry eye, or double vision.', 'একটি অবস্থা যেখানে ইমিউন সিস্টেম চোখের চারপাশের টিস্যুতে আক্রমণ করে — এর ফলে চোখ ফুলে বেরিয়ে আসা (প্রোপটোসিস), পাতা পিছিয়ে যাওয়া, দুটো করে দেখা, বা অপটিক নার্ভে চাপ পড়তে পারে।',
    'Most commonly associated with hyperthyroidism (Graves'' disease), though it can occur in individuals with normal or low thyroid levels as well.', 'সবচেয়ে বেশি সম্পর্কিত অতি সক্রিয় থাইরয়েডের (গ্রেভস ডিজিজ) সাথে, যদিও স্বাভাবিক বা কম সক্রিয় থাইরয়েড থাকলেও হতে পারে। এটি একটি অটোইমিউন প্রক্রিয়া।',
    'Managed in phases: artificial tears and monitoring in mild cases, steroids or immunomodulators during active inflammation, and surgical rehabilitation (decompression, lid surgery) once stable.', 'তীব্রতা অনুযায়ী চিকিৎসা: লুব্রিকেটিং ড্রপ থেকে শুরু করে সক্রিয় অবস্থায় স্টেরয়েড ওষুধ, আর রোগ স্থিতিশীল হওয়ার পর প্রয়োজনে সার্জারি (অরবিটাল ডিকম্প্রেশন বা পাতা মেরামত)।',
    NULL, NULL,
    'oculoplasty', 12
  ),
  (
    'dry-eye', 'Dry Eye & Corneal Ulcer', 'ড্রাই আই ও কর্নিয়াল আলসার',
    'Core', 'Cornea & Surface', 'কর্নিয়া ও উপরিভাগ', '/images/2. Conditions_Images/13. Dry Eye_ Corneal Ulcer.png',
    '["Grittiness","Burning","Corneal infection"]'::jsonb, '["খচখচে ভাব","জ্বালাপোড়া","কর্নিয়ার ঘা"]'::jsonb,
    'Dry eye happens when the eye produces insufficient or poor-quality tears to stay lubricated. A corneal ulcer is a serious open sore on the cornea, usually from infection, requiring urgent care.', 'চোখ যথেষ্ট মানসম্পন্ন অশ্রু তৈরি করতে না পারলে ড্রাই আই হয়, যার ফলে জ্বালাপোড়া বা ঝাপসা দৃষ্টি হয়। কর্নিয়াল আলসার হলো কর্নিয়ায় সংক্রমণজনিত একটা খোলা ঘা, যার জরুরি চিকিৎসা দরকার।',
    'Dry eye is worsened by screen time, AC, contact lenses, and age. Corneal ulcers usually follow an untreated corneal scratch, poor lens hygiene, or bacterial/fungal infections.', 'দীর্ঘ স্ক্রিন টাইম, এসি, লেন্স ব্যবহার, আর বয়সের কারণে ড্রাই আই বাড়ে। কর্নিয়াল আলসার সাধারণত চিকিৎসা না করা আঁচড়, লেন্সের ভুল ব্যবহার, বা সংক্রমণ থেকে হয়।',
    'Dry eye is treated with preservative-free tears, lifestyle adjustments, and punctal plugs if needed. Corneal ulcers need immediate intensive antimicrobial drops to prevent corneal scarring and vision loss.', 'ড্রাই আই সামলানো হয় লুব্রিকেটিং ড্রপ ও জীবনযাত্রার পরিবর্তন দিয়ে। কর্নিয়াল আলসারে দ্রুত অ্যান্টিবায়োটিক বা অ্যান্টিফাঙ্গাল চিকিৎসা দরকার — দেরি করলে স্থায়ী দাগের ঝুঁকি থাকে।',
    NULL, NULL,
    'dry-eye-corneal-disease', 13
  ),
  (
    'squint', 'Squint (Strabismus)', 'স্কুইন্ট বা ট্যারা চোখ (স্ট্র্যাবিজমাস)',
    'Core', 'Pediatric & Strabismus', 'শিশুর চোখ ও স্কুইন্ট', '/images/2. Conditions_Images/14. Squint (Strabismus).png',
    '["Misalignment","Binocular vision","Muscle surgery"]'::jsonb, '["ট্যারা চোখ","বাইনোকুলার দৃষ্টি","পেশি সার্জারি"]'::jsonb,
    'A misalignment of the eyes where they do not look in the same direction simultaneously. One eye may turn inwards (esotropia), outwards (exotropia), upwards, or downwards.', 'দুই চোখ একসাথে একই দিকে না তাকানো — একটা বা দুটো চোখ ভেতরে, বাইরে, ওপরে, বা নিচে বেঁকে যেতে পারে।',
    'Can be present from infancy or develop due to muscle imbalance, nerve dysfunction, uncorrected high refractive errors, or other underlying conditions.', 'জন্ম থেকে থাকতে পারে, অথবা পেশির ভারসাম্যহীনতা, স্নায়ুর সমস্যা, চিকিৎসা না করা চোখের পাওয়ার সমস্যা, বা অন্য কোনো চোখের সমস্যার কারণে হতে পারে।',
    'Treatment may include corrective glasses, orthoptic eye exercises, patching therapy for lazy eye (amblyopia), or precision surgery to tighten or loosen eye muscles for proper alignment.', 'কারণ ও তীব্রতা অনুযায়ী — পাওয়ার সমস্যা থাকলে চশমা, চোখের ব্যায়াম, অথবা চোখ নড়াচড়ার পেশি সমন্বয় করতে সার্জারি — যা চোখ সমান্তরাল করে ও দুই চোখ একসাথে দেখার ক্ষমতা ফিরিয়ে আনে।',
    NULL, NULL,
    'squint-surgery', 14
  ),
  (
    'eye-tumors', 'Eye Tumors & Eyelid Growths', 'চোখের টিউমার ও পাতার বৃদ্ধি',
    'Core', 'Oculoplasty & Orbit', 'অকুলোপ্লাস্টি ও অরবিট', '/images/2. Conditions_Images/15. Eye Tumors _ Lid Tumors.png',
    '["Eyelid nodule","Biopsy","Reconstruction"]'::jsonb, '["পাতায় মাংসপিণ্ড","বায়োপসি","রিকনস্ট্রাকশন"]'::jsonb,
    'Lumps or growths on the eyelids, conjunctiva, or orbit. Most are benign cysts or chalazions, but some require careful clinical evaluation and biopsy to rule out malignancy.', 'চোখে বা তার পাতায় একটা বৃদ্ধি — বেশিরভাগই সৌম্য (যেমন চ্যালাজিয়ন বা সাধারণ পাতার ফোলা), তবে কিছু ক্ষেত্রে পরীক্ষা করে ম্যালিগন্যান্সি (ক্যান্সার) বাদ দিতে হয়।',
    'Benign lesions often arise from blocked oil glands or chronic UV exposure. Malignant tumors share risks with other skin cancers: excessive sun exposure, age, and genetics.', 'সৌম্য বৃদ্ধি প্রায়ই বন্ধ গ্ল্যান্ড বা রোদের কারণে হয়। ম্যালিগন্যান্ট বৃদ্ধির ঝুঁকি রোদ, বয়স ও বংশগত বৈশিষ্ট্যের সাথে জড়িত।',
    'Benign lesions are managed conservatively or excised for comfort. Suspicious growths undergo biopsy and complete surgical excision with reconstructive eyelid surgery.', 'ছোট সৌম্য বৃদ্ধি পর্যবেক্ষণ বা অপসারণ করা হয়। সন্দেহজনক বৃদ্ধি বায়োপসি করে সার্জারির মাধ্যমে অপসারণ ও পাতা পুনর্গঠন করা হয় যাতে স্বাভাবিক কাজ ও চেহারা অক্ষুণ্ন থাকে।',
    NULL, NULL,
    'oculoplasty', 15
  ),
  (
    'glaucoma', 'Glaucoma', 'গ্লুকোমা (নীরব দৃষ্টিচোর)',
    'Secondary', 'Glaucoma', 'গ্লুকোমা', '/images/2. Conditions_Images/16. Glaucoma.png',
    '["Silent thief","Eye pressure","Optic nerve"]'::jsonb, '["নীরব দৃষ্টিচোর","চোখের প্রেসার","অপটিক নার্ভ"]'::jsonb,
    'A group of eye conditions that damage the optic nerve, usually linked to elevated pressure inside the eye. It progresses slowly and painlessly without early warning signs.', 'একগুচ্ছ সমস্যা যা অপটিক নার্ভের ক্ষতি করে, সাধারণত চোখের ভেতরের চাপ বেড়ে যাওয়ার সাথে যুক্ত। এটি ধীরে ধীরে ও ব্যথাহীনভাবে দৃষ্টির ক্ষতি করে — তাই একে ''নীরব দৃষ্টিচোর'' বলা হয়।',
    'Fluid (aqueous humor) inside the anterior chamber drains too slowly, causing intraocular pressure to rise. Risk increases with age, family history, diabetes, and high myopia.', 'চোখের ভেতরের তরল ঠিকমতো নিষ্কাশন না হলে চাপ বেড়ে যায়। বয়স, পারিবারিক ইতিহাস, ডায়াবেটিস এবং উচ্চ পাওয়ারের সাথে ঝুঁকি বাড়ে।',
    'Most cases are managed with pressure-lowering daily eye drops. In select cases, laser trabeculoplasty or filtration surgery (trabeculectomy) is performed to protect the optic nerve.', 'বেশিরভাগ ক্ষেত্রে প্রেসার কমানোর ড্রপ দিয়ে নিয়ন্ত্রণ করা যায়। নির্দিষ্ট কিছু ক্ষেত্রে লেজার চিকিৎসা বা সার্জারি (যেমন ট্র্যাবেকুলেক্টমি) প্রয়োজন হতে পারে। নিয়মিত চোখের প্রেসার চেক করা জরুরি।',
    NULL, NULL,
    'glaucoma-management', 16
  )
ON CONFLICT (slug) DO NOTHING;

-- 6.5 FAQS (All 12 Common Questions)
INSERT INTO public.faqs (faq_code, category_en, category_bn, question_en, question_bn, answer_en, answer_bn, order_index)
VALUES
  (
    'faq-1', 'Appointments & Visits', 'অ্যাপয়েন্টমেন্ট ও ভিজিট',
    'Do I need a referral to see Dr. Nahal?', 'ডা. নাহালকে দেখাতে কি রেফারেল লাগবে?',
    'No referral is required. You can book directly by calling our serial number (01344-890335) or submitting an appointment request through our website.', 'না, কোনো রেফারেল লাগে না। সরাসরি আমাদের সিরিয়াল নম্বরে (০১৩৪৪-৮৯০৩৩৫) কল করে অথবা ওয়েবসাইটের মাধ্যমে অ্যাপয়েন্টমেন্টের অনুরোধ করতে পারেন।', 1
  ),
  (
    'faq-2', 'Cataract Surgery', 'ছানি অপারেশন',
    'How long does a cataract operation take?', 'ছানি অপারেশনে কতক্ষণ সময় লাগে?',
    'The procedure itself typically takes 15–20 minutes per eye, though you should plan for a couple of hours at the hospital including pre-operative preparation and brief post-procedure observation.', 'প্রতি চোখে সার্জারিতে সাধারণত ১৫-২০ মিনিট লাগে, তবে পূর্বপ্রস্তুতি ও অপারেশন-পরবর্তী সংক্ষিপ্ত পর্যবেক্ষণসহ হাসপাতালে ২-৩ ঘণ্টা সময় হাতে রাখা ভালো।', 2
  ),
  (
    'faq-3', 'Cataract Surgery', 'ছানি অপারেশন',
    'Is cataract surgery painful?', 'ছানি অপারেশনে কি ব্যথা হয়?',
    'No — advanced anesthetic eye drops are used so your eye is completely numb. Most patients report feeling only light fluid movement or mild pressure during the surgery, never sharp pain.', 'না — আধুনিক অ্যানেস্থেটিক ড্রপ ব্যবহার করা হয় যাতে চোখ অবশ থাকে। রোগীরা শুধু পানির মৃদু অনুভূতি বা হালকা চাপ টের পান, কোনো তীব্র ব্যথা নয়।', 3
  ),
  (
    'faq-4', 'Fees & Payment', 'খরচ ও ফি',
    'How much does treatment cost?', 'চিকিৎসার খরচ কেমন?',
    'Consultation fees and surgical costs vary depending on the chamber location and the specific procedure/intraocular lens chosen. Please call or WhatsApp our team for up-to-date fees and transparent estimates.', 'চেম্বার এবং সুনির্দিষ্ট সার্জারি বা ব্যবহৃত কৃত্রিম লেন্সের ধরন অনুযায়ী খরচ ভিন্ন হয়। হালনাগাদ পরামর্শ ও অপারেশন ফি জানতে আমাদের কল বা হোয়াটসঅ্যাপ করুন।', 4
  ),
  (
    'faq-5', 'Chambers & Locations', 'চেম্বার ও সময়সূচি',
    'Which chamber should I visit?', 'কোন চেম্বারে যাব?',
    'Any of the three locations — An Nahar Specialized Eye Hospital, Aristo Eye Hospital, or Enam Medical College Hospital. Choose whichever is most convenient for you in terms of location and days/hours.', 'তিনটি চেম্বারের যেকোনো একটিতে — আন নাহার স্পেশালাইজড আই হসপিটাল, এরিস্টো আই হসপিটাল, অথবা এনাম মেডিকেল কলেজ হাসপাতাল। অবস্থান ও সময়সূচি অনুযায়ী যেটি আপনার জন্য সবচেয়ে সুবিধাজনক সেটি বেছে নিন।', 5
  ),
  (
    'faq-6', 'Appointments & Visits', 'অ্যাপয়েন্টমেন্ট ও ভিজিট',
    'Can I walk in without an appointment?', 'অ্যাপয়েন্টমেন্ট ছাড়াই কি সরাসরি যাওয়া যায়?',
    'Walk-in patients are accommodated when time permits, but booking ahead secures your serial number and minimizes your waiting time considerably.', 'সুযোগ থাকলে সরাসরি আসা রোগীদের দেখা হয়, তবে আগে থেকে সিরিয়াল নিশ্চিত করলে দীর্ঘ অপেক্ষার ঝামেলা অনেকটাই এড়ানো যায়।', 6
  ),
  (
    'faq-7', 'Pediatric & Specialty', 'শিশুর চোখ ও বিশেষ সেবা',
    'Do you treat children?', 'শিশুদের চিকিৎসা করা হয় কি?',
    'Yes. Dr. Nahal provides specialized care for children, including premature infant Retinopathy of Prematurity (ROP) screening, pediatric cataract, and strabismus (squint) evaluation and surgical correction.', 'হ্যাঁ। ডা. নাহাল শিশুদের বিশেষায়িত চিকিৎসা দিয়ে থাকেন, যার মধ্যে অপরিণত নবজাতকের ROP স্ক্রিনিং, শিশুদের ছানি এবং ট্যারা চোখের (স্কুইন্ট) সার্জিক্যাল চিকিৎসা অন্তর্ভুক্ত।', 7
  ),
  (
    'faq-8', 'Cataract Surgery', 'ছানি অপারেশন',
    'How soon can I return to work after cataract surgery?', 'ছানি অপারেশনের পর কতদিনে কাজে ফেরা যায়?',
    'Most patients can resume light daily activities and desk work within 3–7 days. Reading, watching TV, and light walking are fine almost immediately. Strenuous manual labor or dusty environments require about 2 weeks of precaution.', 'বেশিরভাগ রোগী ৩-৭ দিনের মধ্যে স্বাভাবিক কাজকর্ম ও অফিসে ফিরতে পারেন। টিভি দেখা বা বই পড়া সাথে সাথেই সম্ভব। তবে ভারী জিনিস তোলা ও ধুলাবালি থেকে অন্তত দুই সপ্তাহ সতর্কতা দরকার।', 8
  ),
  (
    'faq-9', 'Refractive Surgery', 'লেসিক ও রিফ্র্যাক্টিভ',
    'Am I a candidate for LASIK?', 'আমি কি লেসিকের জন্য উপযুক্ত?',
    'Candidacy requires you to be at least 18 years old, have had a stable glasses prescription for at least a year, adequate corneal thickness, and no active ocular diseases. A dedicated pre-LASIK corneal scan confirms your eligibility.', 'লেসিকের জন্য বয়স কমপক্ষে ১৮ বছর হতে হবে, অন্তত এক বছর ধরে পাওয়ার অপরিবর্তিত থাকতে হবে, এবং কর্নিয়ার পুরুত্ব পর্যাপ্ত হতে হবে। বিস্তারিত প্রি-লেসিক স্ক্যান ও পরীক্ষার পরই এটি নিশ্চিত করা হয়।', 9
  ),
  (
    'faq-10', 'Appointments & Visits', 'অ্যাপয়েন্টমেন্ট ও ভিজিট',
    'What should I bring to my first visit?', 'প্রথম ভিজিটে কী নিয়ে আসব?',
    'Please bring any previous eye prescriptions or test reports, your current eyeglasses, and a list of any ongoing medications or medical conditions (such as diabetes or high blood pressure).', 'আপনার পূর্বের কোনো চোখের প্রেসক্রিপশন বা টেস্টের রিপোর্ট, বর্তমান চশমা, এবং নিয়মিত খাওয়া ওষুধের তালিকা বা দীর্ঘস্থায়ী রোগের তথ্য (যেমন ডায়াবেটিস/প্রেসার) সাথে নিয়ে আসুন।', 10
  ),
  (
    'faq-11', 'Emergency Care', 'জরুরি সেবা',
    'Do you offer emergency consultations?', 'জরুরি পরামর্শ পাওয়া যায় কি?',
    'Yes. For acute retinal emergencies — such as sudden painless vision loss, flashes of light, a dense shower of new floaters, or trauma — call 01344-890335 immediately for prioritized emergency guidance.', 'হ্যাঁ। রেটিনা-সংক্রান্ত জরুরি অবস্থা — যেমন হঠাৎ দৃষ্টি কমে যাওয়া, আলোর তীব্র ঝলকানি, একঝাঁক নতুন কালো বিন্দু ভাসা, বা চোখে আঘাতের ক্ষেত্রে সাধারণ বুকিংয়ের অপেক্ষা না করে অবিলম্বে ০১৩৪৪-৮৯০৩৩৫ নম্বরে কল করুন।', 11
  ),
  (
    'faq-12', 'Clinical Transparency', 'ভিডিও ও স্বচ্ছতা',
    'Is the video library real surgical footage?', 'ভিডিও লাইব্রেরির ভিডিওগুলো কি আসল রোগীর?',
    'Yes. All video clips and reels feature actual surgical cases and patient education sessions conducted by Dr. Nahal, shared transparently to inform patients while strictly respecting patient privacy.', 'হ্যাঁ। ভিডিও লাইব্রেরির সমস্ত ক্লিপ ও রিল ডা. নাহালের নিজস্ব সার্জিক্যাল কেস ও রোগী পরামর্শের বাস্তব অংশ, যা সচেতনতা বৃদ্ধির লক্ষ্যে এবং রোগীর সর্বোচ্চ গোপনীয়তা রক্ষা করে শেয়ার করা হয়েছে।', 12
  )
ON CONFLICT (faq_code) DO NOTHING;

-- 6.6 PATIENT REVIEWS (Sample Reviews)
INSERT INTO public.reviews (author_en, author_bn, text_en, text_bn, stars, order_index)
VALUES
  (
    'Rafiqul I.', 'Rafiqul I.',
    'Very patient and thorough explanation before my cataract surgery. My vision improved dramatically afterward.', 'স্যার খুব ধৈর্য নিয়ে সব বুঝিয়ে দিয়েছেন। ছানি অপারেশনের পর দৃষ্টিশক্তি অনেক ভালো হয়েছে।', 5, 1
  ),
  (
    'Sadia K.', 'Sadia K.',
    'Excellent LASIK experience, very professional and transparent about the entire process.', 'লেসিক অভিজ্ঞতা চমৎকার, খুবই পেশাদার আর পুরো প্রক্রিয়া নিয়ে স্পষ্টভাবে জানিয়েছেন।', 5, 2
  ),
  (
    'Mahmud H.', 'Mahmud H.',
    'After visiting several clinics for my retina issue, I finally got proper treatment here.', 'রেটিনার সমস্যা নিয়ে অনেক জায়গায় ঘুরে অবশেষে এখানে ভালো চিকিৎসা পেয়েছি।', 5, 3
  );

-- ==============================================================================
-- COMPLETION VERIFICATION QUERY
-- ==============================================================================
SELECT 'Supabase Schema and Complete Seed Data Executed Successfully!' AS status;
