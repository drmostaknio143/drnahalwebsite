import { Lang } from "./types";

export const navDict: Record<Lang, { href: string; label: string }[]> = {
  en: [
    { href: "", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/conditions", label: "Conditions" },
    { href: "/videos", label: "Videos" },
    { href: "/chambers", label: "Chambers" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ],
  bn: [
    { href: "", label: "হোম" },
    { href: "/about", label: "সম্পর্কে" },
    { href: "/services", label: "সার্ভিস" },
    { href: "/conditions", label: "রোগসমূহ" },
    { href: "/videos", label: "ভিডিও" },
    { href: "/chambers", label: "চেম্বার" },
    { href: "/blog", label: "ব্লগ" },
    { href: "/contact", label: "যোগাযোগ" },
  ],
};

export const practice = {
  name: { en: "An Nahar Eye Care", bn: "আন নাহার আই কেয়ার" },
  doctor: { en: "Dr. Nahal Mostak Khan Arnob", bn: "ডা. নাহাল মোস্তাক খান অর্ণব" },
  doctorShort: { en: "Dr. Nahal Mostak Khan", bn: "ডা. নাহাল মোস্তাক খান" },
  designation: {
    en: "Consultant Vitreoretinal, Cataract & Refractive Surgeon",
    bn: "কনসালট্যান্ট ভিট্রিওরেটিনাল, ছানি ও রিফ্র্যাক্টিভ সার্জন",
  },
  institution: {
    en: "Assistant Professor, Enam Medical College & Hospital",
    bn: "সহকারী অধ্যাপক, এনাম মেডিকেল কলেজ ও হাসপাতাল",
  },
  phone: "+880 1721-815374",
  serialPhone: "01344-890335",
  whatsapp: "8801721815374",
  whatsappUrl: "https://wa.me/8801721815374",
  whatsappMessage: {
    en: "Assalamu Alaikum. I'm messaging from your website. I'd like to talk to you or see you about an eye problem. Please let me know what I should do.",
    bn: "আসসালামু আলাইকুম। আমি আপনার ওয়েবসাইট থেকে মেসেজ করছি। চোখের একটা সমস্যা নিয়ে আপনার সাথে কথা বলতে চাই বা দেখা করতে চাই। কী করতে হবে একটু জানাবেন।",
  },
  email: "drmostaknio@gmail.com",
  chambers: [
    {
      id: "an-nahar",
      name: { en: "An Nahar Specialized Eye Hospital", bn: "আন নাহার স্পেশালাইজড আই হসপিটাল" },
      location: { en: "Dhanmondi, Dhaka", bn: "ধানমন্ডি, ঢাকা" },
      hours: {
        en: "Saturday, Sunday, Tuesday & Wednesday · 6:00 PM – 9:00 PM",
        bn: "শনি, রবি, মঙ্গল ও বুধবার · সন্ধ্যা ৬টা – রাত ৯টা",
      },
      phone: "01344-890335",
      badge: { en: "Evening Chamber", bn: "সান্ধ্যকালীন চেম্বার" },
    },
    {
      id: "aristo",
      name: { en: "Aristo Eye Hospital", bn: "এরিস্টো আই হসপিটাল" },
      location: { en: "Uttara, Dhaka", bn: "উত্তরা, ঢাকা" },
      hours: {
        en: "Saturday & Tuesday · 3:00 PM – 5:30 PM",
        bn: "শনি ও মঙ্গলবার · দুপুর ৩টা – বিকেল ৫:৩০টা",
      },
      phone: "01344-890335",
      badge: { en: "Afternoon Chamber", bn: "বিকালের চেম্বার" },
    },
    {
      id: "enam",
      name: { en: "Enam Medical College Hospital", bn: "এনাম মেডিকেল কলেজ হাসপাতাল" },
      location: { en: "Savar, Dhaka", bn: "সাভার, ঢাকা" },
      hours: {
        en: "Saturday to Wednesday · 9:00 AM – 1:00 PM",
        bn: "শনি থেকে বুধবার · সকাল ৯টা – দুপুর ১টা",
      },
      phone: "01344-890335",
      badge: { en: "Morning Clinic", bn: "সকালের ক্লিনিক" },
    },
  ],
  holidayNote: {
    en: "Hours may change around public holidays — please call ahead to confirm before visiting.",
    bn: "ছুটির দিনে সময়সূচি পরিবর্তিত হতে পারে — দয়া করে আসার আগে কল করে নিশ্চিত হয়ে নিন।",
  },
};

export const bookNow = { en: "Book Now", bn: "অ্যাপয়েন্টমেন্ট" };

export function whatsappHref(lang: Lang, customText?: string) {
  const msg = customText || practice.whatsappMessage[lang];
  return `${practice.whatsappUrl}?text=${encodeURIComponent(msg)}`;
}
