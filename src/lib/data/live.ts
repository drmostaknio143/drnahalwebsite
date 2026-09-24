import { supabase } from "@/lib/supabase/client";
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
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticServices;
    }

    return (data as DbService[]).map((row) => ({
      slug: row.slug,
      name: { en: row.name_en, bn: row.name_bn },
      short: { en: row.short_en, bn: row.short_bn },
      image: row.image_url || "/images/services/cataract-surgery.jpg",
      stat: row.stat_label_en
        ? {
            label: { en: row.stat_label_en, bn: row.stat_label_bn || row.stat_label_en },
            value: { en: row.stat_val_en || "", bn: row.stat_val_bn || row.stat_val_en || "" },
          }
        : undefined,
      tags: { en: row.tags_en || [], bn: row.tags_bn || [] },
      detail: {
        intro: { en: row.intro_en, bn: row.intro_bn },
        whoLabel: { en: row.who_label_en || "Who needs it", bn: row.who_label_bn || "কার প্রয়োজন হতে পারে" },
        who: { en: row.who_en, bn: row.who_bn },
        howLabel: { en: row.how_label_en || "How it works", bn: row.how_label_bn || "কীভাবে হয়" },
        how: { en: row.how_en || "", bn: row.how_bn || "" },
        steps: row.steps || [],
        noteLabel: row.note_label_en ? { en: row.note_label_en, bn: row.note_label_bn || "" } : undefined,
        note: row.note_en ? { en: row.note_en, bn: row.note_bn || "" } : undefined,
        cta: { en: row.cta_en || "Book an Appointment", bn: row.cta_bn || "অ্যাপয়েন্টমেন্ট নিন" },
      },
    }));
  } catch {
    return staticServices;
  }
}

/** Fetch conditions from Supabase or fallback to static conditions */
export async function getLiveConditions(): Promise<FrontendCondition[]> {
  try {
    const { data, error } = await supabase
      .from("conditions")
      .select("*")
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticConditions;
    }

    return (data as DbCondition[]).map((row) => ({
      slug: row.slug,
      name: { en: row.name_en, bn: row.name_bn },
      tier: row.tier,
      category: { en: row.category_en, bn: row.category_bn },
      image: row.image_url || "/images/2. Conditions_Images/1. Cataract.png",
      tags: { en: row.tags_en || [], bn: row.tags_bn || [] },
      whatIsIt: { en: row.what_is_it_en, bn: row.what_is_it_bn },
      whyItHappens: { en: row.why_it_happens_en, bn: row.why_it_happens_bn },
      howTreated: { en: row.how_treated_en, bn: row.how_treated_bn },
      emergencyNote: row.emergency_note_en
        ? { en: row.emergency_note_en, bn: row.emergency_note_bn || "" }
        : undefined,
      relatedServiceSlug: row.related_service_slug || "cataract-surgery",
    }));
  } catch {
    return staticConditions;
  }
}

/** Fetch chambers from Supabase or fallback */
export async function getLiveChambers(): Promise<Chamber[]> {
  try {
    const { data, error } = await supabase
      .from("chambers")
      .select("*")
      .eq("is_active", true)
      .order("order_index", { ascending: true });

    if (error || !data || data.length === 0) {
      return staticChambers;
    }

    return data as Chamber[];
  } catch {
    return staticChambers;
  }
}

/** Fetch FAQs from Supabase or fallback */
export async function getLiveFaqs(): Promise<FAQItem[]> {
  try {
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
      category: { en: row.category_en, bn: row.category_bn },
      question: { en: row.question_en, bn: row.question_bn },
      answer: { en: row.answer_en, bn: row.answer_bn },
    }));
  } catch {
    return staticFaqs;
  }
}

/** Fetch Videos from Supabase or fallback */
export async function getLiveVideos(): Promise<FrontendVideo[]> {
  try {
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
      title: { en: row.title_en, bn: row.title_bn },
      tag: { en: row.tag_en, bn: row.tag_bn },
      description: row.description_en ? { en: row.description_en, bn: row.description_bn || "" } : undefined,
    }));
  } catch {
    return staticVideos;
  }
}

/** Fetch Gallery items from Supabase or fallback */
export async function getLiveGallery(): Promise<FrontendGalleryItem[]> {
  try {
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
      caption: { en: row.caption_en, bn: row.caption_bn },
      chamber: row.chamber_name_en ? { en: row.chamber_name_en, bn: row.chamber_name_bn || "" } : undefined,
    }));
  } catch {
    return staticGallery;
  }
}

/** Fetch Blog Posts from Supabase or fallback */
export async function getLiveBlogs(): Promise<FrontendBlogPost[]> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("publish_date", { ascending: false });

    if (error || !data || data.length === 0) {
      return staticBlogs;
    }

    return (data as BlogPostRecord[]).map((row) => ({
      slug: row.slug,
      title: { en: row.title_en, bn: row.title_bn },
      metaDescription: { en: row.meta_description_en, bn: row.meta_description_bn },
      category: { en: row.category_en, bn: row.category_bn },
      readTime: { en: row.read_time_en, bn: row.read_time_bn },
      date: row.publish_date,
      image: row.image_url || "/images/services/cataract-surgery.jpg",
      sections: row.sections || [],
      emergencyCallout: row.emergency_callout_en
        ? { en: row.emergency_callout_en, bn: row.emergency_callout_bn || "" }
        : undefined,
      relatedServiceSlug: row.related_service_slug,
      relatedConditionSlug: row.related_condition_slug,
    }));
  } catch {
    return staticBlogs;
  }
}

/** Fetch a single blog post by slug from Supabase or static fallback */
export async function getLiveBlogBySlug(slug: string): Promise<FrontendBlogPost | null> {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .single();

    if (!error && data) {
      const row = data as BlogPostRecord;
      return {
        slug: row.slug,
        title: { en: row.title_en, bn: row.title_bn },
        metaDescription: { en: row.meta_description_en, bn: row.meta_description_bn },
        category: { en: row.category_en, bn: row.category_bn },
        readTime: { en: row.read_time_en, bn: row.read_time_bn },
        date: row.publish_date,
        image: row.image_url || "/images/services/cataract-surgery.jpg",
        sections: row.sections || [],
        emergencyCallout: row.emergency_callout_en
          ? { en: row.emergency_callout_en, bn: row.emergency_callout_bn || "" }
          : undefined,
        relatedServiceSlug: row.related_service_slug,
        relatedConditionSlug: row.related_condition_slug,
      };
    }
  } catch {
    // fallback
  }

  const found = staticBlogs.find((b) => b.slug === slug);
  return found || null;
}


/** Fetch Reviews from Supabase or fallback */
export async function getLiveReviews(): Promise<any[]> {
  try {
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
