export type GalleryCategory = "All" | "Chambers" | "Equipment" | "Events/Teaching";

export type GalleryItem = {
  id: string;
  src: string;
  category: "Chambers" | "Equipment" | "Events/Teaching";
  caption: { en: string; bn: string };
  chamber?: { en: string; bn: string };
};

export const galleryPreview = [
  { id: "g1", src: "/images/hero/seq-1.jpeg", caption: "Clinic reference" },
  { id: "g2", src: "/images/hero/seq-2.jpeg", caption: "Equipment" },
  { id: "g3", src: "/images/hero/seq-3.jpeg", caption: "Consultation" },
  { id: "g4", src: "/images/hero/seq-4.jpeg", caption: "Retina imaging" },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "gal-1",
    src: "/images/hero/seq-1.jpeg",
    category: "Chambers",
    caption: {
      en: "Consultation chamber at An Nahar Specialized Eye Hospital",
      bn: "আন নাহার স্পেশালাইজড আই হসপিটালের কনসাল্টেশন চেম্বার",
    },
    chamber: {
      en: "An Nahar Specialized Eye Hospital",
      bn: "আন নাহার স্পেশালাইজড আই হসপিটাল",
    },
  },
  {
    id: "gal-2",
    src: "/images/hero/seq-2.jpeg",
    category: "Equipment",
    caption: {
      en: "High-resolution Optical Coherence Tomography (OCT) retinal scanner",
      bn: "উচ্চ ক্ষমতাসম্পন্ন অপটিক্যাল কোহেরেন্স টমোগ্রাফি (OCT) রেটিনা স্ক্যানার",
    },
  },
  {
    id: "gal-3",
    src: "/images/hero/seq-3.jpeg",
    category: "Chambers",
    caption: {
      en: "Clinical slit-lamp examination & anterior segment assessment",
      bn: "স্লিট-ল্যাম্পের মাধ্যমে চোখের গভীর পরীক্ষা ও মূল্যায়ন",
    },
    chamber: {
      en: "Enam Medical College Hospital",
      bn: "এনাম মেডিকেল কলেজ হাসপাতাল",
    },
  },
  {
    id: "gal-4",
    src: "/images/hero/seq-4.jpeg",
    category: "Equipment",
    caption: {
      en: "Digital Fundus Fluorescein Angiography (FFA) imaging setup",
      bn: "ডিজিটাল ফান্ডাস ফ্লুরোসেন অ্যানজিওগ্রাফি (FFA) ইমেজিং ব্যবস্থা",
    },
  },
  {
    id: "gal-5",
    src: "/images/services/cataract-surgery.jpg",
    category: "Equipment",
    caption: {
      en: "Modern Phacoemulsification unit with microsurgical visualization",
      bn: "মাইক্রোসার্জিক্যাল ভিজ্যুয়ালাইজেশনসহ আধুনিক ফ্যাকোইমালসিফিকেশন ইউনিট",
    },
  },
  {
    id: "gal-6",
    src: "/images/services/vitreoretinal-surgery.jpg",
    category: "Chambers",
    caption: {
      en: "Sterile vitreoretinal surgical operating theater",
      bn: "আধুনিক ও জীবাণুমুক্ত ভিট্রিওরেটিনাল অপারেশন থিয়েটার",
    },
    chamber: {
      en: "An Nahar Specialized Eye Hospital",
      bn: "আন নাহার স্পেশালাইজড আই হসপিটাল",
    },
  },
  {
    id: "gal-7",
    src: "/images/services/refractive-surgery.jpg",
    category: "Equipment",
    caption: {
      en: "Excimer & Femtosecond laser workstation for LASIK & corneal reshaping",
      bn: "লেসিক ও কর্নিয়া চিকিৎসার জন্য আধুনিক এক্সাইমার লেজার ওয়ার্কস্টেশন",
    },
  },
  {
    id: "gal-8",
    src: "/images/services/glaucoma-management.jpg",
    category: "Equipment",
    caption: {
      en: "Automated visual field perimetry & corneal pachymeter",
      bn: "স্বয়ংক্রিয় ভিজ্যুয়াল ফিল্ড পেরিমেট্রি ও কর্নিয়া পরিমাপক",
    },
  },
  {
    id: "gal-9",
    src: "/images/hero/seq-5.jpeg",
    category: "Events/Teaching",
    caption: {
      en: "Clinical instruction & academic presentation at Enam Medical College",
      bn: "এনাম মেডিকেল কলেজে ক্লিনিক্যাল লেকচার ও শিক্ষার্থীদের দিকনির্দেশনা",
    },
    chamber: {
      en: "Enam Medical College",
      bn: "এনাম মেডিকেল কলেজ",
    },
  },
];
