-- ==============================================================================
-- DR. NAHAL MOSTAK KHAN ARNOB — SUPABASE DATABASE SCHEMA & SEED DATA
-- Consultant Vitreoretinal, Cataract & Refractive Surgeon
-- ==============================================================================
-- Run this script in the Supabase SQL Editor (Dashboard -> SQL Editor -> New Query).
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

-- 3.5 VIDEOS (Facebook Reels & YouTube Archives)
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

-- 3.7 FAQS (Common Questions)
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

-- 3.8 BLOG POSTS (Patient Education)
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

-- Public READ policies for published content
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

-- Authenticated Admin full access to everything
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

-- 6.3 CONDITIONS (All 16 Conditions from Copy Plan)
INSERT INTO public.conditions (slug, name_en, name_bn, tier, category_en, category_bn, image_url, tags_en, tags_bn, what_is_it_en, what_is_it_bn, why_it_happens_en, why_it_happens_bn, how_treated_en, how_treated_bn, emergency_note_en, emergency_note_bn, related_service_slug, order_index)
VALUES
  (
    'cataract', 'Cataract', 'ছানি', 'Core', 'Cataract & Lens', 'ছানি ও লেন্স', '/images/services/cataract-surgery.jpg',
    '["Blurry vision", "Faded colors", "Night glare"]'::jsonb,
    '["ঝাপসা দৃষ্টি", "ফিকে রং", "রাতে আলোয় ধাঁধা"]'::jsonb,
    'A cataract is a clouding of the eye''s natural lens, which normally is clear. Vision becomes blurry, dim, or hazy like looking through a foggy window.',
    'ছানি হলো চোখের প্রাকৃতিক লেন্স ধীরে ধীরে ঘোলাটে হয়ে যাওয়া। লেন্স ঘোলা হলে দৃষ্টি ধীরে ধীরে ঝাপসা বা কুয়াশাচ্ছন্ন হয়ে যায়।',
    'Most commonly aging. Other causes include diabetes, long-term steroid use, and UV exposure.',
    'সবচেয়ে বড় কারণ বয়স বাড়া। এছাড়া ডায়াবেটিস ও দীর্ঘদিন স্টেরয়েড ব্যবহার দায়ী হতে পারে।',
    'Effective treatment is surgical removal (phacoemulsification), replacing the clouded lens with a clear artificial lens.',
    'একমাত্র কার্যকর চিকিৎসা হলো সার্জারি করে ঘোলা লেন্স বদলে স্বচ্ছ কৃত্রিম লেন্স বসানো (ফ্যাকোইমালসিফিকেশন)।',
    NULL, NULL, 'cataract-surgery', 1
  ),
  (
    'diabetic-retinopathy', 'Diabetic Retinopathy', 'ডায়াবেটিক রেটিনোপ্যাথি', 'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/services/diabetic-eye-care.jpg',
    '["Blood sugar", "Floaters", "Microaneurysms"]'::jsonb,
    '["ব্লাড সুগার", "কালো বিন্দু ভাসা", "রক্তনালীর ক্ষতি"]'::jsonb,
    'A complication of diabetes where high blood sugar damages the tiny blood vessels in the retina, causing bleeding, swelling, or scarring.',
    'ডায়াবেটিসের জটিলতা, যেখানে অতিরিক্ত সুগার রেটিনার সূক্ষ্ম রক্তনালীর ক্ষতি করে এবং রক্তক্ষরণ ঘটায়।',
    'Prolonged high blood sugar, poor glycemic control, high blood pressure, and cholesterol.',
    'দীর্ঘদিন ধরে রক্তে সুগার ও রক্তচাপ নিয়ন্ত্রণে না থাকলে রেটিনার রক্তনালী দুর্বল হয়ে পড়ে।',
    'Early stages are monitored closely; advanced cases require anti-VEGF injections, retinal laser, or vitrectomy surgery.',
    'প্রাথমিক অবস্থায় নিয়মিত পর্যবেক্ষণ এবং জটিল পর্যায়ে অ্যান্টি-ভিইজিএফ ইনজেকশন, লেজার বা ভিট্রেক্টমি সার্জারি করা হয়।',
    NULL, NULL, 'diabetic-eye-care', 2
  ),
  (
    'retinal-detachment', 'Retinal Detachment', 'রেটিনা বিচ্ছিন্নতা', 'Core', 'Retina & Vitreous', 'রেটিনা ও ভিট্রিয়াস', '/images/services/vitreoretinal-surgery.jpg',
    '["Emergency", "Light flashes", "Shadow curtain"]'::jsonb,
    '["জরুরি অবস্থা", "আলোর ঝলকানি", "দৃষ্টিতে ছায়া"]'::jsonb,
    'A medical emergency where the retina peels away from the back wall of the eye, cutting off its vital blood and oxygen supply.',
    'একটি মেডিকেল ইমার্জেন্সি, যেখানে রেটিনা চোখের পেছনের দেয়াল থেকে খসে পড়ে রক্ত ও অক্সিজেন সরবরাহ হারায়।',
    'Retinal tears, severe trauma, high myopia, or complications from other eye conditions.',
    'রেটিনায় ছিদ্র হওয়া, চোখে গুরুতর আঘাত বা উচ্চমাত্রার মাইনাস পাওয়ার এর প্রধান কারণ।',
    'Urgent surgery is required — pars plana vitrectomy, scleral buckling, or pneumatic retinopexy.',
    'জরুরি ভিত্তিতে সার্জারি প্রয়োজন — পার্স প্লানা ভিট্রেক্টমি বা স্কেরাল বাকলিং পদ্ধতি।',
    'Sudden flashes of light, new floaters, or a shadow moving across vision require emergency consultation.',
    'হঠাৎ আলোর ঝলকানি, নতুন কালো বিন্দু বা দৃষ্টির কোনো অংশে পর্দার মতো ছায়া পড়লে সাথে সাথে জরুরি কল করুন।',
    'vitreoretinal-surgery', 3
  ),
  (
    'glaucoma', 'Glaucoma', 'গ্লুকোমা', 'Secondary', 'Glaucoma', 'গ্লুকোমা', '/images/services/glaucoma-management.jpg',
    '["Silent thief", "Eye pressure", "Optic nerve"]'::jsonb,
    '["নীরব দৃষ্টিচোর", "চোখের প্রেসার", "অপটিক নার্ভ"]'::jsonb,
    'A condition causing optic nerve damage, usually linked to elevated intraocular pressure, often without early symptoms.',
    'একগুচ্ছ রোগ যা চোখের ভেতরের প্রেশার বাড়ার কারণে অপটিক নার্ভের ক্ষতি করে, একে নীরব দৃষ্টিচোর বলা হয়।',
    'Imbalance in fluid drainage inside the anterior eye chamber, age, and genetics.',
    'চোখের ভেতরের তরল নিষ্কাশন ব্যাহত হয়ে চাপ বেড়ে যাওয়া এবং বংশগত কারণ।',
    'Managed primarily with daily pressure-lowering drops, laser trabeculoplasty, or filtration surgery.',
    'চাপ কমানোর ড্রপ, লেজার চিকিৎসা অথবা ট্র্যাবেকুলেক্টমি সার্জারির মাধ্যমে অপটিক নার্ভ রক্ষা করা হয়।',
    NULL, NULL, 'glaucoma-management', 16
  )
ON CONFLICT (slug) DO NOTHING;

-- 6.4 FAQS (Sample Seed matching copy plan)
INSERT INTO public.faqs (faq_code, category_en, category_bn, question_en, question_bn, answer_en, answer_bn, order_index)
VALUES
  (
    'faq-1', 'Appointments & Visits', 'অ্যাপয়েন্টমেন্ট ও ভিজিট',
    'Do I need a referral to see Dr. Nahal?', 'ডা. নাহালকে দেখাতে কি রেফারেল লাগবে?',
    'No referral is required. You can book directly by calling 01344-890335 or submitting a request online.',
    'না, কোনো রেফারেল লাগে না। সরাসরি ০১৩৪৪-৮৯০৩৩৫ নম্বরে কল করে বা অনলাইনে বুক করতে পারেন।', 1
  ),
  (
    'faq-2', 'Cataract Surgery', 'ছানি অপারেশন',
    'How long does a cataract operation take?', 'ছানি অপারেশনে কতক্ষণ সময় লাগে?',
    'The surgery itself typically takes 15–20 minutes per eye with topical anesthetic drops.',
    'প্রতি চোখে সার্জারিতে সাধারণত ১৫-২০ মিনিট সময় লাগে এবং অবশ করার ড্রপ ব্যবহার করা হয়।', 2
  ),
  (
    'faq-3', 'Cataract Surgery', 'ছানি অপারেশন',
    'Is cataract surgery painful?', 'ছানি অপারেশনে কি ব্যথা হয়?',
    'No. Numbing drops prevent sharp pain; patients typically feel only mild fluid pressure.',
    'না। ড্রপ দিয়ে চোখ অবশ করে নেওয়ায় কোনো তীব্র ব্যথা থাকে না, শুধু পানির মৃদু স্পর্শ টের পাওয়া যায়।', 3
  ),
  (
    'faq-11', 'Emergency Care', 'জরুরি সেবা',
    'Do you offer emergency consultations?', 'জরুরি পরামর্শ পাওয়া যায় কি?',
    'Yes, for acute retinal emergencies like sudden vision loss or flashes. Call 01344-890335 immediately.',
    'হ্যাঁ, রেটিনা সংক্রান্ত জরুরি সমস্যায় (হঠাৎ দৃষ্টি হ্রাস, আলোর ঝলকানি) অবিলম্বে ০১৩৪৪-৮৯০৩৩৫ নম্বরে কল করুন।', 11
  )
ON CONFLICT (faq_code) DO NOTHING;

-- ==============================================================================
-- 7. STORAGE BUCKETS (Optional, for Supabase Storage)
-- ==============================================================================
-- INSERT INTO storage.buckets (id, name, public) VALUES ('clinic-images', 'clinic-images', true) ON CONFLICT DO NOTHING;
-- INSERT INTO storage.buckets (id, name, public) VALUES ('patient-videos', 'patient-videos', true) ON CONFLICT DO NOTHING;

-- ==============================================================================
-- COMPLETION VERIFICATION QUERY
-- ==============================================================================
SELECT 'Supabase Schema and Seed Data Executed Successfully!' AS status;
