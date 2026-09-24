import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

export const defaultSettings: Record<string, { en: string; bn: string; desc?: string }> = {
  doctor_name: { en: "Dr. Nahal Mostak Khan Arnob", bn: "ডা. নাহাল মোস্তাক খান অর্ণব", desc: "Full Doctor Name" },
  doctor_short: { en: "Dr. Nahal Mostak Khan", bn: "ডা. নাহাল মোস্তাক খান", desc: "Short Display Name" },
  designation: { en: "Consultant Vitreoretinal, Cataract & Refractive Surgeon", bn: "কনসালট্যান্ট ভিট্রিওরেটিনাল, ছানি ও রিফ্র্যাক্টিভ সার্জন", desc: "Primary Designation" },
  institution: { en: "Assistant Professor, Enam Medical College & Hospital", bn: "সহকারী অধ্যাপক, এনাম মেডিকেল কলেজ ও হাসপাতাল", desc: "Academic Affiliation" },
  hotline_serial: { en: "01344-890335", bn: "০১৩৪৪-৮৯০৩৩৫", desc: "Main Serial Booking Hotline" },
  whatsapp_phone: { en: "+880 1721-815374", bn: "+৮৮০ ১৭২১-৮১৫৩৭৪", desc: "WhatsApp Contact Number" },
  official_email: { en: "drmostaknio@gmail.com", bn: "drmostaknio@gmail.com", desc: "Official Doctor Email" },
  hero_eyebrow: { en: "FRCS (Glasgow) · FCPS (Ophthalmology) · GMC UK Registered", bn: "এফআরসিএস (গ্লাসগো) · এফসিপিএস (চক্ষু) · জিএমসি যুক্তরাজ্য নিবন্ধিত", desc: "Hero Eyebrow Text" },
  hero_title: { en: "Clear, Confident Vision — Backed by Retina & Cataract Expertise", bn: "চোখের দৃষ্টি সুরক্ষায় আন্তর্জাতিক মানের বিশেষায়িত সার্জিক্যাল সেবা", desc: "Hero Main Title" },
  hero_subtitle: { en: "Board-certified ophthalmologist with over 8 years of clinical and surgical experience, specializing in advanced vitreoretinal disorders, micro-incision phacoemulsification, and scleral fixation. Practicing across three chambers in Dhaka.", bn: "৮+ বছরের ক্লিনিক্যাল ও সার্জিক্যাল অভিজ্ঞতাসম্পন্ন বোর্ড-প্রত্যয়িত চক্ষু বিশেষজ্ঞ। জটিল রেটিনা বিচ্ছিন্নতা মেরামত (PPV), আধুনিক মাইক্রো-ইনসিশন ছানি অপারেশন এবং সেলাইবিহীন ইয়ামানে স্কেরাল ফিক্সেশন সার্জারিতে বিশেষভাবে দক্ষ।", desc: "Hero Subtitle & Bio" },
  experience_years: { en: "8+ Years", bn: "৮+ বছর", desc: "Surgical Experience" },
  fellowship_institute: { en: "Ispahani Islamia Eye Institute", bn: "ইস্পাহানী ইসলামিয়া চক্ষু ইনস্টিটিউট", desc: "Fellowship Institute" },
};

export async function GET() {
  const supabase = createServerClient();
  const { data, error } = await supabase
    .from("practice_settings")
    .select("*");

  if (error || !data || data.length === 0) {
    // Return structured default settings
    const formatted = Object.entries(defaultSettings).map(([key, val]) => ({
      setting_key: key,
      value_en: val.en,
      value_bn: val.bn,
      description: val.desc,
    }));
    return NextResponse.json({ success: true, data: formatted, source: "fallback" });
  }

  return NextResponse.json({ success: true, data, source: "database" });
}

export async function PUT(request: Request) {
  try {
    const supabase = createServerClient();
    const body = await request.json(); // array of settings or single setting

    if (Array.isArray(body)) {
      // Batch upsert
      const { data, error } = await supabase
        .from("practice_settings")
        .upsert(body, { onConflict: "setting_key" })
        .select();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, data });
    } else {
      const { setting_key, value_en, value_bn, description } = body;
      const { data, error } = await supabase
        .from("practice_settings")
        .upsert({ setting_key, value_en, value_bn, description }, { onConflict: "setting_key" })
        .select()
        .single();

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true, data });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
