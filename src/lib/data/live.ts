import { supabase as clientSupabase } from "@/lib/supabase/client";
import { createServerClient } from "@/lib/supabase/server";
import { services as staticServices, type Service as FrontendService } from "@/lib/data/services";
import { conditions as staticConditions, type Condition as FrontendCondition } from "@/lib/data/conditions";
import { faqs as staticFaqs, type FAQItem } from "@/lib/data/faq";
import { videos as staticVideos, type Video as FrontendVideo } from "@/lib/data/videos";
import { galleryItems as staticGallery, type GalleryItem as FrontendGalleryItem } from "@/lib/data/gallery";
import { blogPosts as staticBlogs, type BlogPost as FrontendBlogPost } from "@/lib/data/blogs";
import { reviews as staticReviews } from "@/lib/data/reviews";
import type {
  Service as DbService,
  Condition as DbCondition,
  FAQRecord,
  VideoItem,
  GalleryItemRecord,
  BlogPostRecord,
  AppointmentRecord,
  ReviewRecord,
  PracticeSetting,
  Chamber,
} from "@/lib/supabase/types";

function getSupabase() {
  if (typeof window === "undefined") {
    return createServerClient();
  }
  return clientSupabase;
}

// Static chambers fallback
export const staticChambers: Chamber[] = [
  {
    slug: "an-nahar",
    name_en: "An Nahar Specialized Eye Hospital",
    name_bn: "আন নাহার স্পেশালাইজড আই হসপিটাল",
    location_en: "Dhanmondi, Dhaka",
    location_bn: "ধানমন্ডি, ঢাকা",
    hours_en: "Saturday, Sunday, Tuesday & Wednesday · 6:00 PM – 9:00 PM",
    hours_bn: "শনি, রবি, মঙ্গল ও বুধবার · সন্ধ্যা ৬টা – রাত ৯টা",
    badge_en: "Evening Chamber",
    badge_bn: "সান্ধ্যকালীন চেম্বার",
    phone: "01344-890335",
    is_active: true,
    order_index: 1,
  },
  {
    slug: "aristo",
    name_en: "Aristo Eye Hospital",
    name_bn: "এরিস্টো আই হসপিটাল",
    location_en: "Uttara, Dhaka",
    location_bn: "উত্তরা, ঢাকা",
    hours_en: "Saturday & Tuesday · 3:00 PM – 5:30 PM",
    hours_bn: "শনি ও মঙ্গলবার · দুপুর ৩টা – বিকেল ৫:৩০টা",
    badge_en: "Afternoon Chamber",
    badge_bn: "বিকালের চেম্বার",
    phone: "01344-890335",
    is_active: true,
    order_index: 2,
  },
  {
    slug: "enam",
    name_en: "Enam Medical College Hospital",
    name_bn: "এনাম মেডিকেল কলেজ হাসপাতাল",
    location_en: "Savar, Dhaka",
    location_bn: "সাভার, ঢাকা",
    hours_en: "Saturday to Wednesday · 9:00 AM – 1:00 PM",
    hours_bn: "শনি থেকে বুধবার · সকাল ৯টা – দুপুর ১টা",
    badge_en: "Morning Clinic",
    badge_bn: "সকালের ক্লিনিক",
    phone: "01344-890335",
    is_active: true,
    order_index: 3,
  },
];

/** Fetch services from Supabase or fallback to static services */
export async function getLiveServices(): Promise<FrontendService[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticServices;
    }

    return (data as DbService[]).map((row) => ({
      slug: (row.slug || "").trim(),
      name: { en: row.name_en?.trim() || row.name_bn?.trim() || "Eye Service", bn: row.name_bn?.trim() || row.name_en?.trim() || "চক্ষু সেবা" },
      short: { en: row.short_en?.trim() || row.short_bn?.trim() || "", bn: row.short_bn?.trim() || row.short_en?.trim() || "" },
      image: row.image_url?.trim() || "/images/services/cataract-surgery.jpg",
      stat: row.stat_label_en || row.stat_label_bn
        ? {
            label: { en: row.stat_label_en || row.stat_label_bn || "", bn: row.stat_label_bn || row.stat_label_en || "" },
            value: { en: row.stat_val_en || "", bn: row.stat_val_bn || row.stat_val_en || "" },
          }
        : undefined,
      tags: { en: row.tags_en || [], bn: row.tags_bn || [] },
      detail: {
        intro: { en: row.intro_en?.trim() || row.intro_bn?.trim() || "", bn: row.intro_bn?.trim() || row.intro_en?.trim() || "" },
        whoLabel: { en: row.who_label_en || "Who needs it", bn: row.who_label_bn || "কার প্রয়োজন হতে পারে" },
        who: { en: row.who_en || row.who_bn || "", bn: row.who_bn || row.who_en || "" },
        howLabel: { en: row.how_label_en || "How it works", bn: row.how_label_bn || "কীভাবে হয়" },
        how: { en: row.how_en || row.how_bn || "", bn: row.how_bn || row.how_en || "" },
        steps: row.steps || [],
        noteLabel: row.note_label_en ? { en: row.note_label_en, bn: row.note_label_bn || "" } : undefined,
        note: row.note_en ? { en: row.note_en, bn: row.note_bn || "" } : undefined,
        cta: { en: row.cta_en || "Book an Appointment", bn: row.cta_bn || "অ্যাপয়েন্টমেন্ট নিন" },
      },
    }));
  } catch (err) {
    console.error("Failed to load live services:", err);
    return staticServices;
  }
}

/** Fetch conditions from Supabase or fallback to static conditions */
export async function getLiveConditions(): Promise<FrontendCondition[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("conditions")
      .select("*")
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticConditions;
    }

    return (data as DbCondition[]).map((row) => ({
      slug: (row.slug || "").trim(),
      name: { en: row.name_en?.trim() || row.name_bn?.trim() || "Eye Condition", bn: row.name_bn?.trim() || row.name_en?.trim() || "চক্ষু সমস্যা" },
      tier: row.tier || "primary",
      category: { en: row.category_en?.trim() || row.category_bn?.trim() || "Retina", bn: row.category_bn?.trim() || row.category_en?.trim() || "রেটিনা" },
      image: row.image_url?.trim() || "/images/2. Conditions_Images/1. Cataract.png",
      tags: { en: row.tags_en || [], bn: row.tags_bn || [] },
      whatIsIt: { en: row.what_is_it_en?.trim() || row.what_is_it_bn?.trim() || "", bn: row.what_is_it_bn?.trim() || row.what_is_it_en?.trim() || "" },
      whyItHappens: { en: row.why_it_happens_en?.trim() || row.why_it_happens_bn?.trim() || "", bn: row.why_it_happens_bn?.trim() || row.why_it_happens_en?.trim() || "" },
      howTreated: { en: row.how_treated_en?.trim() || row.how_treated_bn?.trim() || "", bn: row.how_treated_bn?.trim() || row.how_treated_en?.trim() || "" },
      emergencyNote: row.emergency_note_en || row.emergency_note_bn
        ? { en: row.emergency_note_en || row.emergency_note_bn || "", bn: row.emergency_note_bn || row.emergency_note_en || "" }
        : undefined,
      relatedServiceSlug: row.related_service_slug || "cataract-surgery",
    }));
  } catch (err) {
    console.error("Failed to load live conditions:", err);
    return staticConditions;
  }
}

/** Fetch chambers from Supabase or fallback */
export async function getLiveChambers(): Promise<Chamber[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("chambers")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticChambers;
    }

    return (data as Chamber[]).map((row) => ({
      ...row,
      slug: (row.slug || "").trim(),
      name_en: row.name_en?.trim() || row.name_bn?.trim() || "Chamber",
      name_bn: row.name_bn?.trim() || row.name_en?.trim() || "চেম্বার",
      location_en: row.location_en?.trim() || row.location_bn?.trim() || "",
      location_bn: row.location_bn?.trim() || row.location_en?.trim() || "",
      hours_en: row.hours_en?.trim() || row.hours_bn?.trim() || "",
      hours_bn: row.hours_bn?.trim() || row.hours_en?.trim() || "",
    }));
  } catch (err) {
    console.error("Failed to load live chambers:", err);
    return staticChambers;
  }
}

/** Fetch FAQs from Supabase or fallback */
export async function getLiveFaqs(): Promise<FAQItem[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("faqs")
      .select("*")
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticFaqs;
    }

    return (data as FAQRecord[]).map((row) => ({
      id: row.faq_code,
      category: { en: row.category_en?.trim() || row.category_bn?.trim() || "General", bn: row.category_bn?.trim() || row.category_en?.trim() || "সাধারণ" },
      question: { en: row.question_en?.trim() || row.question_bn?.trim() || "", bn: row.question_bn?.trim() || row.question_en?.trim() || "" },
      answer: { en: row.answer_en?.trim() || row.answer_bn?.trim() || "", bn: row.answer_bn?.trim() || row.answer_en?.trim() || "" },
    }));
  } catch (err) {
    console.error("Failed to load live faqs:", err);
    return staticFaqs;
  }
}

/** Fetch Videos from Supabase or fallback */
export async function getLiveVideos(): Promise<FrontendVideo[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("videos")
      .select("*")
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticVideos;
    }

    return (data as VideoItem[]).map((row) => ({
      id: row.video_code,
      url: row.url,
      youtubeId: row.youtube_id,
      category: row.category as any,
      title: { en: row.title_en?.trim() || row.title_bn?.trim() || "Video", bn: row.title_bn?.trim() || row.title_en?.trim() || "ভিডিও" },
      tag: { en: row.tag_en?.trim() || row.tag_bn?.trim() || "Ophthalmology", bn: row.tag_bn?.trim() || row.tag_en?.trim() || "চক্ষুবিজ্ঞান" },
      description: row.description_en || row.description_bn ? { en: row.description_en || row.description_bn || "", bn: row.description_bn || row.description_en || "" } : undefined,
    }));
  } catch (err) {
    console.error("Failed to load live videos:", err);
    return staticVideos;
  }
}

/** Fetch Gallery items from Supabase or fallback */
export async function getLiveGallery(): Promise<FrontendGalleryItem[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("gallery_items")
      .select("*")
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticGallery;
    }

    return (data as GalleryItemRecord[]).map((row) => ({
      id: row.id || `gal-${row.order_index}`,
      src: row.src,
      category: row.category,
      caption: { en: row.caption_en?.trim() || row.caption_bn?.trim() || "", bn: row.caption_bn?.trim() || row.caption_en?.trim() || "" },
      chamber: row.chamber_name_en ? { en: row.chamber_name_en, bn: row.chamber_name_bn || "" } : undefined,
    }));
  } catch (err) {
    console.error("Failed to load live gallery:", err);
    return staticGallery;
  }
}

/** Fetch Blog Posts from Supabase or fallback */
export async function getLiveBlogs(): Promise<FrontendBlogPost[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("publish_date", { ascending: false });

    if (error || !data || data.length === 0) {
      return staticBlogs;
    }

    return (data as BlogPostRecord[]).map((row) => {
      const enTitle = row.title_en?.trim() || row.title_bn?.trim() || "Educational Article";
      const bnTitle = row.title_bn?.trim() || row.title_en?.trim() || "স্বাস্থ্য নিবন্ধ";
      const enDesc = row.meta_description_en?.trim() || row.meta_description_bn?.trim() || "";
      const bnDesc = row.meta_description_bn?.trim() || row.meta_description_en?.trim() || "";
      const enCat = row.category_en?.trim() || row.category_bn?.trim() || "Eye Care";
      const bnCat = row.category_bn?.trim() || row.category_en?.trim() || "চক্ষু সেবা";
      const enRead = row.read_time_en?.trim() || "5 min read";
      const bnRead = row.read_time_bn?.trim() || "৫ মিনিট পাঠ";

      return {
        slug: (row.slug || "").trim(),
        title: { en: enTitle, bn: bnTitle },
        metaDescription: { en: enDesc, bn: bnDesc },
        category: { en: enCat, bn: bnCat },
        readTime: { en: enRead, bn: bnRead },
        date: row.publish_date || new Date().toISOString().split("T")[0],
        image: row.image_url?.trim() || "/images/services/cataract-surgery.jpg",
        sections: row.sections || [],
        emergencyCallout:
          row.emergency_callout_en || row.emergency_callout_bn
            ? {
                en: row.emergency_callout_en || row.emergency_callout_bn || "",
                bn: row.emergency_callout_bn || row.emergency_callout_en || "",
              }
            : undefined,
        relatedServiceSlug: row.related_service_slug,
        relatedConditionSlug: row.related_condition_slug,
      };
    });
  } catch (err) {
    console.error("Failed to load live blogs:", err);
    return staticBlogs;
  }
}

/** Fetch a single blog post by slug from Supabase or static fallback */
export async function getLiveBlogBySlug(slug: string): Promise<FrontendBlogPost | null> {
  const cleanSlug = decodeURIComponent(slug || "").trim();
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .or(`slug.eq."${cleanSlug}",slug.ilike."${cleanSlug}%"`)
      .eq("is_published", true)
      .limit(1);

    if (!error && data && data.length > 0) {
      const row = data[0] as BlogPostRecord;
      const enTitle = row.title_en?.trim() || row.title_bn?.trim() || "Educational Article";
      const bnTitle = row.title_bn?.trim() || row.title_en?.trim() || "স্বাস্থ্য নিবন্ধ";
      const enDesc = row.meta_description_en?.trim() || row.meta_description_bn?.trim() || "";
      const bnDesc = row.meta_description_bn?.trim() || row.meta_description_en?.trim() || "";
      const enCat = row.category_en?.trim() || row.category_bn?.trim() || "Eye Care";
      const bnCat = row.category_bn?.trim() || row.category_en?.trim() || "চক্ষু সেবা";

      return {
        slug: (row.slug || cleanSlug).trim(),
        title: { en: enTitle, bn: bnTitle },
        metaDescription: { en: enDesc, bn: bnDesc },
        category: { en: enCat, bn: bnCat },
        readTime: { en: row.read_time_en?.trim() || "5 min read", bn: row.read_time_bn?.trim() || "৫ মিনিট পাঠ" },
        date: row.publish_date,
        image: row.image_url?.trim() || "/images/services/cataract-surgery.jpg",
        sections: row.sections || [],
        emergencyCallout:
          row.emergency_callout_en || row.emergency_callout_bn
            ? {
                en: row.emergency_callout_en || row.emergency_callout_bn || "",
                bn: row.emergency_callout_bn || row.emergency_callout_en || "",
              }
            : undefined,
        relatedServiceSlug: row.related_service_slug,
        relatedConditionSlug: row.related_condition_slug,
      };
    }
  } catch (err) {
    console.error("Error fetching live blog by slug:", err);
  }

  const found = staticBlogs.find((b) => b.slug.trim().toLowerCase() === cleanSlug.toLowerCase());
  return found || null;
}


/** Fetch Reviews from Supabase or fallback */
export async function getLiveReviews(): Promise<any[]> {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_featured", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticReviews;
    }

    return (data as ReviewRecord[]).map((row, i) => ({
      id: row.id || `r${i + 1}`,
      initial: row.author_en?.charAt(0) || "P",
      author: row.author_en,
      text: { en: row.text_en, bn: row.text_bn },
      stars: row.stars || 5,
    }));
  } catch {
    return staticReviews;
  }
}
