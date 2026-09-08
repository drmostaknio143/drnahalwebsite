import { Lang } from "./types";

export const navDict: Record<Lang, { href: string; label: string }[]> = {
  en: [
    { href: "", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/conditions", label: "Conditions" },
    { href: "/videos", label: "Video Library" },
    { href: "/gallery", label: "Gallery" },
    { href: "/chambers", label: "Chambers" },
    { href: "/contact", label: "Contact" },
  ],
  bn: [
    { href: "", label: "হোম" },
    { href: "/about", label: "সম্পর্কে" },
    { href: "/services", label: "সার্ভিস" },
    { href: "/conditions", label: "রোগসমূহ" },
    { href: "/videos", label: "ভিডিও লাইব্রেরি" },
    { href: "/gallery", label: "গ্যালারি" },
    { href: "/chambers", label: "চেম্বার" },
    { href: "/contact", label: "যোগাযোগ" },
  ],
};

export const practice = {
  name: { en: "An Nahar Eye Care", bn: "আন নাহার আই কেয়ার" },
  doctor: { en: "Dr. Nahal Mostak Khan Arnob", bn: "ডা. নাহাল মোস্তাক খান অর্ণব" },
  doctorShort: { en: "Dr. Nahal Mostak Khan", bn: "ডা. নাহাল মোস্তাক খান" },
  phone: "+880 1721-815374",
  whatsapp: "8801721815374",
  whatsappUrl: "https://wa.me/8801721815374",
  whatsappMessage: {
    en: "Assalamu Alaikum. I'm messaging from your website. I'd like to talk to you or see you about an eye problem. Please let me know what I should do.",
    bn: "আসসালামু আলাইকুম। আমি আপনার ওয়েবসাইট থেকে মেসেজ করছি। চোখের একটা সমস্যা নিয়ে আপনার সাথে কথা বলতে চাই বা দেখা করতে চাই। কী করতে হবে একটু জানাবেন।",
  },
  email: "drmostaknio@gmail.com",
  chambers: [
    {
      name: { en: "An Nahar Specialized Eye Hospital", bn: "আন নাহার স্পেশালাইজড আই হসপিটাল" },
      hours: {
        en: "Sat, Sun, Tue & Wed · 6:00 PM – 9:00 PM",
        bn: "শনি, রবি, মঙ্গল ও বুধবার · সন্ধ্যা ৬টা – রাত ৯টা",
      },
    },
    {
      name: { en: "Aristo Eye Hospital", bn: "এরিস্টো আই হসপিটাল" },
      hours: { en: "Sat & Tue · 3:00 PM – 5:30 PM", bn: "শনি ও মঙ্গলবার · দুপুর ৩টা – বিকেল ৫:৩০টা" },
    },
    {
      name: { en: "Enam Medical College Hospital", bn: "এনাম মেডিকেল কলেজ হাসপাতাল" },
      hours: { en: "Sat–Wed · 9:00 AM – 1:00 PM", bn: "শনি–বুধ · সকাল ৯টা – দুপুর ১টা" },
    },
  ],
};

export const bookNow = { en: "Book Now", bn: "অ্যাপয়েন্টমেন্ট" };

export function whatsappHref(lang: Lang) {
  return `${practice.whatsappUrl}?text=${encodeURIComponent(practice.whatsappMessage[lang])}`;
}
