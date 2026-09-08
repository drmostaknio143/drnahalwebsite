export type Video = {
  id: string;
  url: string;
  youtubeId?: string;
  category: "Cataract" | "Vitreoretina" | "Refractive" | "ROP" | "Oculoplasty" | "Patient Education";
  title: { en: string; bn: string };
  tag: { en: string; bn: string };
  description?: { en: string; bn: string };
  relatedServiceSlug?: string;
  relatedConditionSlug?: string;
};

export const videoCategories = [
  { id: "all", label: { en: "All Videos", bn: "সব ভিডিও" } },
  { id: "cataract", label: { en: "Cataract", bn: "ছানি" } },
  { id: "vitreoretina", label: { en: "Vitreoretina", bn: "রেটিনা" } },
  { id: "refractive", label: { en: "Refractive (LASIK/PRK/SMILE)", bn: "রিফ্র্যাক্টিভ (লেসিক/পিআরকে/স্মাইল)" } },
  { id: "rop", label: { en: "ROP", bn: "ROP" } },
  { id: "oculoplasty", label: { en: "Oculoplasty", bn: "অকুলোপ্লাস্টি" } },
  { id: "education", label: { en: "Patient Education", bn: "রোগী শিক্ষামূলক" } },
];

const categoryMapping: ("Cataract" | "Vitreoretina" | "Refractive" | "ROP" | "Oculoplasty" | "Patient Education")[] = [
  "Cataract",
  "Vitreoretina",
  "Cataract",
  "Refractive",
  "Vitreoretina",
  "Patient Education",
  "Cataract",
  "ROP",
  "Oculoplasty",
  "Vitreoretina",
  "Refractive",
  "Patient Education",
  "Cataract",
  "Vitreoretina",
  "Patient Education",
  "Oculoplasty",
  "ROP",
  "Cataract",
  "Refractive",
  "Patient Education",
];

const titlesEn = [
  "Phacoemulsification with Foldable Hydrophobic IOL",
  "23G Pars Plana Vitrectomy for Retinal Detachment",
  "Toric Lens Alignment for High Astigmatism Cataract",
  "Custom Wavefront LASIK Flap Creation & Ablation",
  "Scleral Fixated Intraocular Lens (Yamane Technique)",
  "Post-Op Cataract Care: Golden Rules for Patients",
  "Premium Multifocal Lens Implantation Showcase",
  "Premature Infant Retinopathy Screening & Laser Care",
  "Ptosis Levator Resection for Drooping Eyelid",
  "Vitrectomy with Endolaser for Proliferative Diabetic Retinopathy",
  "SMILE Flapless Procedure Demonstration",
  "Diabetic Retinal Health: Practical Screening Advice",
  "Dense Cataract Emulsification using Low Ultrasound",
  "Macular Hole Peeling with Brilliant Blue Dye",
  "Dry Eye Management: Tear Film Restoration Guide",
  "Pterygium Autograft Excision with Fibrin Glue",
  "Bedside ROP Examination at Neonatal Intensive Care",
  "Monofocal Plus Enhanced Depth of Focus IOL Placement",
  "PRK Surface Ablation for Thin Corneal Profiles",
  "Emergency Symptoms: Red Flags in Sudden Vision Loss",
];

const titlesBn = [
  "ফ্যাকোইমালসিফিকেশন ও ফোল্ডেবল হাইড্রোফোবিক লেন্স প্রতিস্থাপন",
  "রেটিনা বিচ্ছিন্নতার জন্য ২৩-জি পার্স প্লানা ভিট্রেক্টমি",
  "উচ্চ অ্যাস্টিগমাটিজমযুক্ত চোখে টরিক লেন্স নির্ভুল সংস্থাপন",
  "কাস্টম ওয়েভফ্রন্ট লেসিক ফ্ল্যাপ তৈরি ও কর্নিয়া রিশেপিং",
  "সেলাইবিহীন স্কেরাল ফিক্সেটেড লেন্স (ইয়ামানে পদ্ধতি)",
  "ছানি অপারেশনের পর যত্ন: রোগীর জন্য অপরিহার্য নিয়মাবলী",
  "প্রিমিয়াম মাল্টিফোকাল কৃত্রিম লেন্স প্রতিস্থাপন পদ্ধতি",
  "অপরিণত নবজাতকের রেটিনা পরীক্ষা (ROP) ও সময়োপযোগী লেজার",
  "চোখের পাতা ঝুলে পড়ার (পিটোসিস) লিভেটর মাসল সার্জারি",
  "ডায়াবেটিক রেটিনোপ্যাথির রক্তক্ষরণে ভিট্রেক্টমি ও এন্ডোলেজার",
  "স্মাইল (SMILE) সেলাই ও ফ্ল্যাপবিহীন আধুনিক লেজার চিকিৎসা",
  "ডায়াবেটিসে চোখের যত্ন: রোগী সচেতনতামূলক দিকনির্দেশনা",
  "ন্যূনতম শক্তিতে শক্ত ও জটিল ছানি অপসারণের আধুনিক কৌশল",
  "ম্যাকুলার হোল সার্জারি ও ইন্টারনাল লিমিটিং মেমব্রেন পিলিং",
  "ড্রাই আই ও চোখ জ্বালাপোড়ার আধুনিক ব্যবস্থাপনা গাইড",
  "পুনরাবৃত্তিহীন পিটেরিজিয়াম (মাংসবৃদ্ধি) অপসারণ ও গ্রাফট",
  "নবজাতক আইসিইউ-তে (NICU) বিশেষায়িত ROP স্ক্রিনিং",
  "মনোফোকাল প্লাস ও এক্সটেন্ডেড ডেপথ অব ফোকাস লেন্স প্রতিস্থাপন",
  "পাতলা কর্নিয়ার অধিকারীদের জন্য নিরাপদ পিআরকে (PRK) লেজার",
  "দৃষ্টিতে জরুরি লক্ষণ: হঠাৎ দৃষ্টি কমলে করণীয়",
];

export const videos: Video[] = [
  { id: "v1", url: "https://www.facebook.com/reel/2501956403648796/" },
  { id: "v2", url: "https://www.facebook.com/reel/1046331278202787/" },
  { id: "v3", url: "https://www.facebook.com/reel/1464574421881326/" },
  { id: "v4", url: "https://www.facebook.com/reel/1030561718925815/" },
  { id: "v5", url: "https://www.facebook.com/reel/3692110467599856/" },
  { id: "v6", url: "https://www.facebook.com/reel/2799951363726840/" },
  { id: "v7", url: "https://www.facebook.com/reel/3899273333666107/" },
  { id: "v8", url: "https://www.facebook.com/reel/1023906449183244/" },
  { id: "v9", url: "https://www.facebook.com/reel/1158053779667028/" },
  { id: "v10", url: "https://www.facebook.com/reel/1025162328944037/" },
  { id: "v11", url: "https://www.facebook.com/reel/1367820534416230/" },
  { id: "v12", url: "https://www.facebook.com/reel/2087964581676985/" },
  { id: "v13", url: "https://www.facebook.com/reel/689643566895874/" },
  { id: "v14", url: "https://www.facebook.com/reel/2476263316049356/" },
  { id: "v15", url: "https://www.facebook.com/reel/2504253599911018/" },
  { id: "v16", url: "https://www.facebook.com/reel/670614362579249/" },
  { id: "v17", url: "https://www.facebook.com/reel/645698898205398/" },
  { id: "v18", url: "https://www.facebook.com/reel/1294414424983724/" },
  { id: "v19", url: "https://www.facebook.com/reel/1315641429733507/" },
  { id: "v20", url: "https://www.facebook.com/reel/2030568157424764/" },
].map((v, i) => {
  const cat = categoryMapping[i];
  return {
    ...v,
    category: cat,
    title: {
      en: titlesEn[i] || `Video ${String(i + 1).padStart(2, "0")}`,
      bn: titlesBn[i] || `ভিডিও ${String(i + 1).padStart(2, "0")}`,
    },
    tag: {
      en: cat,
      bn:
        cat === "Cataract"
          ? "ছানি"
          : cat === "Vitreoretina"
          ? "রেটিনা"
          : cat === "Refractive"
          ? "রিফ্র্যাক্টিভ"
          : cat === "ROP"
          ? "ROP"
          : cat === "Oculoplasty"
          ? "অকুলোপ্লাস্টি"
          : "রোগী শিক্ষামূলক",
    },
    description: {
      en: `Clinical surgical footage and educational insights by Dr. Nahal Mostak Khan regarding ${cat.toLowerCase()} procedures and patient outcomes.`,
      bn: `ডা. নাহাল মোস্তাক খানের প্রত্যক্ষ তত্ত্বাবধানে পরিচালিত ${cat} চিকিৎসা ও রোগীর সুস্থতা সম্পর্কিত শিক্ষামূলক ভিডিও ক্লিপ।`,
    },
  };
});
