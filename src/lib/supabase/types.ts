export interface PracticeSetting {
  id?: string;
  setting_key: string;
  value_en: string;
  value_bn: string;
  description?: string;
  updated_at?: string;
}

export interface Chamber {
  id?: string;
  slug: string;
  name_en: string;
  name_bn: string;
  location_en: string;
  location_bn: string;
  hours_en: string;
  hours_bn: string;
  badge_en?: string;
  badge_bn?: string;
  phone: string;
  is_active: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface ServiceStepItem {
  en: string;
  bn: string;
}

export interface Service {
  id?: string;
  slug: string;
  name_en: string;
  name_bn: string;
  short_en: string;
  short_bn: string;
  image_url?: string;
  stat_label_en?: string;
  stat_label_bn?: string;
  stat_val_en?: string;
  stat_val_bn?: string;
  tags_en: string[];
  tags_bn: string[];
  intro_en: string;
  intro_bn: string;
  who_label_en?: string;
  who_label_bn?: string;
  who_en: string;
  who_bn: string;
  how_label_en?: string;
  how_label_bn?: string;
  how_en?: string;
  how_bn?: string;
  steps: ServiceStepItem[];
  note_label_en?: string;
  note_label_bn?: string;
  note_en?: string;
  note_bn?: string;
  cta_en?: string;
  cta_bn?: string;
  order_index: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Condition {
  id?: string;
  slug: string;
  name_en: string;
  name_bn: string;
  tier: "Core" | "Secondary";
  category_en: string;
  category_bn: string;
  image_url?: string;
  tags_en: string[];
  tags_bn: string[];
  what_is_it_en: string;
  what_is_it_bn: string;
  why_it_happens_en: string;
  why_it_happens_bn: string;
  how_treated_en: string;
  how_treated_bn: string;
  emergency_note_en?: string;
  emergency_note_bn?: string;
  related_service_slug?: string;
  order_index: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface VideoItem {
  id?: string;
  video_code: string;
  url: string;
  youtube_id?: string;
  category: string;
  title_en: string;
  title_bn: string;
  tag_en: string;
  tag_bn: string;
  description_en?: string;
  description_bn?: string;
  is_featured: boolean;
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

export interface GalleryItemRecord {
  id?: string;
  src: string;
  category: "Chambers" | "Equipment" | "Events/Teaching";
  caption_en: string;
  caption_bn: string;
  chamber_name_en?: string;
  chamber_name_bn?: string;
  order_index: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface FAQRecord {
  id?: string;
  faq_code: string;
  category_en: string;
  category_bn: string;
  question_en: string;
  question_bn: string;
  answer_en: string;
  answer_bn: string;
  order_index: number;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface BlogSectionItem {
  heading?: { en: string; bn: string };
  content: { en: string; bn: string };
  bulletPoints?: { en: string[]; bn: string[] };
}

export interface BlogPostRecord {
  id?: string;
  slug: string;
  title_en: string;
  title_bn: string;
  meta_description_en: string;
  meta_description_bn: string;
  category_en: string;
  category_bn: string;
  read_time_en: string;
  read_time_bn: string;
  publish_date: string;
  image_url?: string;
  sections: BlogSectionItem[];
  emergency_callout_en?: string;
  emergency_callout_bn?: string;
  related_service_slug?: string;
  related_condition_slug?: string;
  is_published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface AppointmentRecord {
  id?: string;
  patient_name: string;
  phone: string;
  chamber_slug: string;
  preferred_date?: string;
  reason?: string;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  admin_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReviewRecord {
  id?: string;
  author_en: string;
  author_bn: string;
  city_en?: string;
  city_bn?: string;
  text_en: string;
  text_bn: string;
  stars: number;
  treatment_en?: string;
  treatment_bn?: string;
  is_featured: boolean;
  order_index: number;
  created_at?: string;
}
