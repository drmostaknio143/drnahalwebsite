export type ServiceStep = { en: string; bn: string };

export type Service = {
  slug: string;
  name: { en: string; bn: string };
  short: { en: string; bn: string };
  image?: string;
  /** short "quick fact" shown on the image card overlay, e.g. procedure type */
  stat?: { label: { en: string; bn: string }; value: { en: string; bn: string } };
  /** short bullet keywords shown on the image card overlay ("Recommended for") */
  tags?: { en: string[]; bn: string[] };
  detail: {
    intro: { en: string; bn: string };
    whoLabel: { en: string; bn: string };
    who: { en: string; bn: string };
    howLabel: { en: string; bn: string };
    how: { en: string; bn: string };
    steps?: ServiceStep[];
    noteLabel?: { en: string; bn: string };
    note?: { en: string; bn: string };
    cta: { en: string; bn: string };
  };
};

export const services: Service[] = [
  {
    slug: "cataract-surgery",
    name: { en: "Cataract Surgery (Phacoemulsification)", bn: "ছানি অপারেশন (ফ্যাকোইমালসিফিকেশন)" },
    image: "/images/services/cataract-surgery.jpg",
    short: {
      en: "Fast, precise cataract removal with modern lens implants.",
      bn: "দ্রুত ও নিখুঁতভাবে ছানি অপসারণ, আধুনিক লেন্স প্রতিস্থাপনসহ।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Day-Care Surgery", bn: "ডে-কেয়ার সার্জারি" },
    },
    tags: {
      en: ["Blurry vision", "Glare at night", "Faded colors"],
      bn: ["দৃষ্টি ঝাপসা লাগা", "রাতে আলোয় ধাঁধা", "রং ফিকে লাগা"],
    },
    detail: {
      intro: {
        en: "A cataract clouds the eye's natural lens, gradually blurring vision. Phacoemulsification is the modern, minimally invasive way to remove it — a small incision, an ultrasound probe to break up the cloudy lens, and a new artificial lens (IOL) put in its place.",
        bn: "ছানি হলো চোখের প্রাকৃতিক লেন্স ধীরে ধীরে ঘোলাটে হয়ে যাওয়া, যার ফলে দৃষ্টি অস্পষ্ট হতে থাকে। ফ্যাকোইমালসিফিকেশন হলো আধুনিক ও ন্যূনতম কাটাছেঁড়ার একটি পদ্ধতি — ছোট্ট একটা ছিদ্র করে, আল্ট্রাসাউন্ড দিয়ে ঘোলা লেন্সটাকে ভেঙে বের করে সেখানে একটা নতুন কৃত্রিম লেন্স (IOL) বসিয়ে দেওয়া হয়।",
      },
      whoLabel: { en: "Who needs it", bn: "কার প্রয়োজন হতে পারে" },
      who: {
        en: "Blurry or dim vision, glare from lights at night, colors looking faded, difficulty reading — especially if these have gradually worsened over months or years.",
        bn: "দৃষ্টি ঝাপসা বা ম্লান লাগা, রাতে আলোতে চোখ ধাঁধিয়ে যাওয়া, রং ফিকে মনে হওয়া, পড়তে কষ্ট হওয়া — বিশেষ করে এসব সমস্যা যদি মাস বা বছরের পর বছর ধরে ধীরে ধীরে বাড়তে থাকে।",
      },
      howLabel: { en: "How it works", bn: "কীভাবে হয়" },
      how: { en: "", bn: "" },
      steps: [
        { en: "Numbing eye drops — no general anesthesia needed.", bn: "অ্যানেস্থেসিয়ার ড্রপ দেওয়া হয় — সম্পূর্ণ অজ্ঞান করার দরকার হয় না।" },
        { en: "A tiny incision (about 2–3mm) is made at the edge of the cornea.", bn: "কর্নিয়ার কিনারায় খুবই ছোট (প্রায় ২-৩ মিমি) একটা ছিদ্র করা হয়।" },
        { en: "An ultrasound probe breaks the cloudy lens into small pieces and removes them.", bn: "আল্ট্রাসাউন্ড দিয়ে ঘোলা লেন্সটাকে ছোট ছোট টুকরো করে বের করে ফেলা হয়।" },
        { en: "A folded artificial lens is inserted through the same small incision and unfolds into place.", bn: "একটা ভাঁজ করা কৃত্রিম লেন্স সেই একই ছিদ্র দিয়ে ভেতরে বসিয়ে দেওয়া হয়, যা নিজে থেকেই খুলে যথাস্থানে বসে যায়।" },
        { en: "No stitches needed in most cases — the incision self-seals.", bn: "বেশিরভাগ ক্ষেত্রে সেলাই লাগে না — ছিদ্রটা নিজে থেকেই বন্ধ হয়ে যায়।" },
      ],
      noteLabel: { en: "Recovery", bn: "সুস্থ হওয়ার সময়" },
      note: {
        en: "Most patients notice clearer vision within a day or two. Mild irritation and light sensitivity are normal for the first week; eye drops are prescribed to prevent infection and reduce inflammation. Most people resume normal activities within a few days.",
        bn: "বেশিরভাগ রোগী এক-দুই দিনের মধ্যেই স্পষ্ট দৃষ্টি টের পান। প্রথম সপ্তাহে হালকা অস্বস্তি ও আলোয় সংবেদনশীলতা স্বাভাবিক — সংক্রমণ ঠেকাতে ও প্রদাহ কমাতে ড্রপ দেওয়া হয়। বেশিরভাগ মানুষ কয়েকদিনের মধ্যেই স্বাভাবিক কাজে ফিরে যেতে পারেন।",
      },
      cta: { en: "Book a Cataract Consultation", bn: "ছানি অপারেশনের জন্য পরামর্শ নিন" },
    },
  },
  {
    slug: "vitreoretinal-surgery",
    name: { en: "Vitreoretinal Surgery", bn: "রেটিনা সার্জারি" },
    image: "/images/services/vitreoretinal-surgery.jpg",
    short: {
      en: "Treatment for retinal detachment, diabetic retinopathy, and more.",
      bn: "রেটিনা বিচ্ছিন্নতা, ডায়াবেটিক রেটিনোপ্যাথি ও আরও জটিল সমস্যার চিকিৎসা।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Microsurgery (PPV)", bn: "মাইক্রোসার্জারি (PPV)" },
    },
    tags: {
      en: ["Retinal detachment", "Diabetic retinopathy", "Vitreous hemorrhage"],
      bn: ["রেটিনা বিচ্ছিন্নতা", "ডায়াবেটিক রেটিনোপ্যাথি", "ভিট্রিয়াস হেমোরেজ"],
    },
    detail: {
      intro: {
        en: "The retina is the light-sensitive layer at the back of the eye — when it tears, detaches, or bleeds, vision can be lost quickly and permanently without prompt treatment. Vitreoretinal surgery covers the range of procedures used to repair the retina and the vitreous gel that fills the eye.",
        bn: "রেটিনা হলো চোখের পেছনের আলো-সংবেদনশীল স্তর — এটি ছিঁড়ে গেলে, সরে গেলে, বা রক্তক্ষরণ হলে দ্রুত চিকিৎসা না নিলে দৃষ্টি স্থায়ীভাবে হারিয়ে যেতে পারে। রেটিনা সার্জারির আওতায় পড়ে রেটিনা ও চোখের ভেতরের জেল (ভিট্রিয়াস) মেরামতের বিভিন্ন পদ্ধতি।",
      },
      whoLabel: { en: "Conditions treated", bn: "যেসব সমস্যার চিকিৎসা হয়" },
      who: {
        en: "Retinal detachment · Diabetic retinopathy · Macular disease · CRVO/BRVO (retinal vein occlusion) · Vitreous hemorrhage · Complex trauma cases",
        bn: "রেটিনা বিচ্ছিন্নতা · ডায়াবেটিক রেটিনোপ্যাথি · ম্যাকুলার সমস্যা · CRVO/BRVO (রেটিনার শিরা বন্ধ হয়ে যাওয়া) · ভিট্রিয়াস হেমোরেজ · জটিল আঘাতজনিত সমস্যা",
      },
      howLabel: { en: "How it works", bn: "কীভাবে হয়" },
      how: {
        en: "Most procedures are performed through pars plana vitrectomy (PPV) — three tiny openings are made in the white of the eye to remove the vitreous gel and repair the retina from inside, sometimes combined with a gas or silicone oil bubble to hold the retina in place while it heals. Dislocated lenses are corrected using scleral fixation (Yamane technique) when needed.",
        bn: "বেশিরভাগ ক্ষেত্রে পার্স প্লানা ভিট্রেক্টমি (PPV) পদ্ধতি ব্যবহার হয় — চোখের সাদা অংশে তিনটি খুবই ছোট ছিদ্র করে ভেতরের জেল বের করে রেটিনা মেরামত করা হয়, প্রয়োজনে গ্যাস বা সিলিকন অয়েল বাবল দিয়ে রেটিনাকে সুস্থ হওয়া পর্যন্ত জায়গামতো ধরে রাখা হয়। লেন্স সরে গেলে প্রয়োজনমতো স্কেরাল ফিক্সেশন (ইয়ামানে টেকনিক) দিয়ে ঠিক করা হয়।",
      },
      noteLabel: { en: "Important", bn: "বিশেষ নোট" },
      note: {
        en: "Retinal detachment and sudden vitreous hemorrhage are medical emergencies — earlier treatment means a much better chance of preserving vision. If you're experiencing sudden flashes, floaters, or a curtain-like shadow in your vision, contact the practice immediately.",
        bn: "রেটিনা বিচ্ছিন্নতা আর হঠাৎ ভিট্রিয়াস হেমোরেজ — এই দুটোই মেডিকেল ইমার্জেন্সি। যত আগে চিকিৎসা শুরু হয়, দৃষ্টি বাঁচানোর সম্ভাবনা তত বেশি। হঠাৎ চোখে আলোর ঝলকানি, কালো বিন্দু ভাসতে দেখা, বা পর্দার মতো ছায়া দেখলে দেরি না করে যোগাযোগ করুন।",
      },
      cta: { en: "Book an Urgent Consultation", bn: "জরুরি পরামর্শের জন্য যোগাযোগ করুন" },
    },
  },
  {
    slug: "refractive-surgery",
    name: { en: "Refractive Surgery (LASIK / PRK / SMILE)", bn: "চোখের পাওয়ার সংক্রান্ত সার্জারি (লেসিক / পিআরকে / স্মাইল)" },
    image: "/images/services/refractive-surgery.jpg",
    short: {
      en: "Reduce or remove dependence on glasses and contact lenses.",
      bn: "চশমা বা লেন্সের ওপর নির্ভরতা কমানো বা দূর করা।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Laser (LASIK / PRK / SMILE)", bn: "লেজার (লেসিক / পিআরকে / স্মাইল)" },
    },
    tags: {
      en: ["Nearsighted / farsighted", "Astigmatism", "Tired of glasses/lenses"],
      bn: ["মায়োপিয়া / হাইপারোপিয়া", "অ্যাস্টিগম্যাটিজম", "চশমা/লেন্সে ক্লান্ত"],
    },
    detail: {
      intro: {
        en: "Refractive surgery reshapes the cornea so light focuses correctly on the retina, reducing or removing dependence on glasses and contact lenses. Dr. Nahal offers LASIK, PRK, Femto-LASIK, and lenticule extraction (SMILE) — the technique chosen depends on your cornea's thickness, shape, and your lifestyle.",
        bn: "রিফ্র্যাক্টিভ সার্জারিতে কর্নিয়ার আকৃতি এমনভাবে পরিবর্তন করা হয় যাতে আলো ঠিকভাবে রেটিনায় গিয়ে পড়ে — ফলে চশমা বা লেন্সের ওপর নির্ভরতা কমে যায় বা একেবারেই দূর হয়। ডা. নাহাল লেসিক, পিআরকে, ফেমটো-লেসিক ও লেন্টিকিউল এক্সট্র্যাকশন (স্মাইল) — চারটি পদ্ধতিতেই কাজ করেন। কোন পদ্ধতি প্রযোজ্য তা নির্ভর করে আপনার কর্নিয়ার পুরুত্ব, আকৃতি ও জীবনযাত্রার ওপর।",
      },
      whoLabel: { en: "Who's a candidate", bn: "কারা করাতে পারেন" },
      who: {
        en: "Generally, adults 18+ with a stable eyeglass prescription for at least a year, healthy corneas, and no active eye disease. A detailed pre-surgery evaluation determines candidacy and the best technique.",
        bn: "সাধারণত ১৮ বছরের বেশি বয়সী যাদের চশমার পাওয়ার অন্তত এক বছর স্থিতিশীল আছে, চোখ সুস্থ এবং কোনো সক্রিয় রোগ নেই। বিস্তারিত পরীক্ষার পরই নির্ধারণ করা হয় কোন পদ্ধতি সবচেয়ে উপযুক্ত।",
      },
      howLabel: { en: "The three techniques, briefly", bn: "তিনটি পদ্ধতি সংক্ষেপে" },
      how: {
        en: "LASIK — a thin corneal flap is created and the underlying tissue reshaped with a laser, then the flap is repositioned; fast visual recovery. PRK — the surface layer is removed and regrows after treatment; better suited to thinner corneas. SMILE — a small lens-shaped piece of tissue is removed through a tiny incision, no flap required; minimally invasive.",
        bn: "লেসিক — কর্নিয়ায় পাতলা একটা ফ্ল্যাপ তৈরি করে ভেতরের অংশ লেজার দিয়ে পুনর্গঠন করা হয়, তারপর ফ্ল্যাপ আবার আগের জায়গায় বসিয়ে দেওয়া হয় — দ্রুত সুস্থ হওয়া যায়। পিআরকে — উপরের স্তর সরিয়ে ফেলা হয়, যা চিকিৎসার পর আবার গজায় — পাতলা কর্নিয়ার জন্য বেশি উপযুক্ত। স্মাইল — ছোট্ট একটা ছিদ্র দিয়ে লেন্স-আকৃতির একটা টিস্যু বের করে ফেলা হয়, ফ্ল্যাপ তৈরির দরকার হয় না — সবচেয়ে কম কাটাছেঁড়ার পদ্ধতি।",
      },
      noteLabel: { en: "Recovery", bn: "সুস্থ হওয়ার সময়" },
      note: {
        en: "LASIK and SMILE patients often notice improved vision within a day; PRK takes slightly longer as the surface layer heals, typically a few days to a week.",
        bn: "লেসিক ও স্মাইলে বেশিরভাগ রোগী একদিনের মধ্যেই ভালো দৃষ্টি টের পান; পিআরকেতে উপরের স্তর সারতে একটু বেশি সময় লাগে, সাধারণত কয়েকদিন থেকে এক সপ্তাহ।",
      },
      cta: { en: "Check If You're a Candidate", bn: "আপনি উপযুক্ত কিনা যাচাই করুন" },
    },
  },
  {
    slug: "squint-surgery",
    name: { en: "Squint (Strabismus) Surgery", bn: "স্কুইন্ট (স্ট্র্যাবিজমাস) সার্জারি" },
    image: "/images/services/squint-surgery.jpg",
    short: {
      en: "Realigning misaligned eyes and restoring binocular vision.",
      bn: "চোখের অবস্থান ঠিক করে দুই চোখের সমন্বিত দৃষ্টি ফিরিয়ে আনা।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Eye Muscle Surgery", bn: "চোখের পেশি সার্জারি" },
    },
    tags: {
      en: ["Misaligned eyes", "Double vision", "Head tilting to see"],
      bn: ["চোখ বেঁকে যাওয়া", "দুটো করে দেখা", "মাথা কাত করে দেখা"],
    },
    detail: {
      intro: {
        en: "Squint is a misalignment of the eyes — they don't point in the same direction at the same time. Left uncorrected, it can affect both appearance and how the two eyes work together.",
        bn: "স্কুইন্ট মানে দুই চোখ একসাথে একই দিকে না তাকানো। চিকিৎসা না করালে এটা চেহারা আর দুই চোখ একসাথে কাজ করার ক্ষমতা — দুটোতেই প্রভাব ফেলতে পারে।",
      },
      whoLabel: { en: "Who needs it", bn: "কার প্রয়োজন হতে পারে" },
      who: {
        en: "One or both eyes turning in, out, up, or down; double vision; or a child squinting/tilting their head to see clearly.",
        bn: "এক বা দুই চোখ ভেতরে, বাইরে, ওপরে বা নিচে বেঁকে যাওয়া; দুটো করে দেখা; অথবা শিশু স্পষ্ট দেখার জন্য চোখ কুঁচকে বা মাথা কাত করে তাকানো।",
      },
      howLabel: { en: "How it works", bn: "কীভাবে হয়" },
      how: {
        en: "Depending on cause, treatment ranges from corrective glasses to surgery that adjusts the eye muscles responsible for movement — realigning the eyes and, in many cases, restoring binocular vision.",
        bn: "কারণ অনুযায়ী — চশমা থেকে শুরু করে চোখ নড়াচড়ার জন্য দায়ী পেশি সমন্বয় করার সার্জারি, যা চোখ সমান্তরাল করে ও অনেক ক্ষেত্রে দুই চোখ একসাথে ব্যবহারের দৃষ্টি ফিরিয়ে আনে।",
      },
      cta: { en: "Book a Squint Consultation", bn: "স্কুইন্ট পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন" },
    },
  },
  {
    slug: "diabetic-eye-care",
    name: { en: "Diabetic Eye Care", bn: "ডায়াবেটিক আই কেয়ার" },
    image: "/images/services/diabetic-eye-care.jpg",
    short: {
      en: "Regular screening and treatment to protect vision from diabetes.",
      bn: "ডায়াবেটিসের কারণে দৃষ্টিহানি ঠেকাতে নিয়মিত স্ক্রিনিং ও চিকিৎসা।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Screening + Laser / Injection", bn: "স্ক্রিনিং + লেজার / ইনজেকশন" },
    },
    tags: {
      en: ["Long-term diabetes", "Uncontrolled sugar/BP", "No recent eye check"],
      bn: ["দীর্ঘদিনের ডায়াবেটিস", "অনিয়ন্ত্রিত সুগার/প্রেসার", "সম্প্রতি চোখ পরীক্ষা হয়নি"],
    },
    detail: {
      intro: {
        en: "Diabetes can silently damage the retina's blood vessels — diabetic retinopathy is a leading cause of vision loss in working-age adults, and it often has no symptoms until it's advanced.",
        bn: "ডায়াবেটিস নিঃশব্দে রেটিনার রক্তনালীর ক্ষতি করতে পারে — ডায়াবেটিক রেটিনোপ্যাথি কর্মক্ষম বয়সের মানুষদের দৃষ্টিহীনতার একটা প্রধান কারণ, আর অনেক সময় জটিল না হওয়া পর্যন্ত কোনো লক্ষণই বোঝা যায় না।",
      },
      whoLabel: { en: "Who needs it", bn: "কার প্রয়োজন হতে পারে" },
      who: {
        en: "Anyone with diabetes, especially if it's been present for several years, or if blood sugar/blood pressure/cholesterol has been hard to control.",
        bn: "যেকোনো ডায়াবেটিস রোগী, বিশেষ করে যাদের অনেক বছর ধরে ডায়াবেটিস আছে, বা সুগার/প্রেসার/কোলেস্টেরল নিয়ন্ত্রণে রাখা কঠিন হচ্ছে।",
      },
      howLabel: { en: "How it works", bn: "কীভাবে হয়" },
      how: {
        en: "Regular dilated retina screening catches changes early. Treatment — when needed — ranges from close monitoring to anti-VEGF injections, laser therapy, or vitrectomy for advanced cases.",
        bn: "নিয়মিত পুতুল বড় করে রেটিনা স্ক্রিনিং করালে পরিবর্তন আগেভাগে ধরা পড়ে। প্রয়োজনে চিকিৎসা — নিয়মিত পর্যবেক্ষণ থেকে শুরু করে অ্যান্টি-ভিইজিএফ ইনজেকশন, লেজার থেরাপি, বা জটিল ক্ষেত্রে ভিট্রেক্টমি পর্যন্ত।",
      },
      cta: { en: "Book a Diabetic Eye Screening", bn: "ডায়াবেটিক আই স্ক্রিনিং-এর জন্য অ্যাপয়েন্টমেন্ট নিন" },
    },
  },
  {
    slug: "glaucoma-management",
    name: { en: "Glaucoma Management", bn: "গ্লুকোমা ব্যবস্থাপনা" },
    image: "/images/services/glaucoma-management.jpg",
    short: {
      en: "Protecting the optic nerve from \"the silent thief of sight.\"",
      bn: "\"নীরব দৃষ্টিচোর\" থেকে অপটিক নার্ভ রক্ষা করা।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Drops / Laser / Surgery", bn: "ড্রপ / লেজার / সার্জারি" },
    },
    tags: {
      en: ["Family history of glaucoma", "Age 40+", "High eye pressure"],
      bn: ["পরিবারে গ্লুকোমার ইতিহাস", "৪০+ বয়স", "চোখের চাপ বেশি"],
    },
    detail: {
      intro: {
        en: 'Glaucoma damages the optic nerve, usually linked to elevated eye pressure. It progresses slowly and painlessly — often called "the silent thief of sight" because vision loss isn\'t noticed until it\'s already happened.',
        bn: "গ্লুকোমা অপটিক নার্ভের ক্ষতি করে, সাধারণত চোখের চাপ বেড়ে যাওয়ার সাথে যুক্ত। এটা ধীরে ও ব্যথাহীনভাবে বাড়ে — একে \"নীরব দৃষ্টিচোর\" বলা হয় কারণ দৃষ্টি কমে যাওয়ার আগে বোঝাই যায় না।",
      },
      whoLabel: { en: "Who needs it", bn: "কার প্রয়োজন হতে পারে" },
      who: {
        en: "Anyone with a family history of glaucoma, or over 40 without a recent eye pressure check.",
        bn: "যাদের পরিবারে গ্লুকোমার ইতিহাস আছে, বা ৪০ বছরের বেশি বয়সী যারা সম্প্রতি চোখের চাপ পরীক্ষা করাননি।",
      },
      howLabel: { en: "How it works", bn: "কীভাবে হয়" },
      how: {
        en: "Most cases are managed with pressure-lowering eye drops. Select cases may need laser treatment or surgery (such as trabeculectomy) to protect the optic nerve.",
        bn: "বেশিরভাগ ক্ষেত্রে চাপ কমানোর ড্রপ দিয়েই নিয়ন্ত্রণ করা যায়। নির্দিষ্ট ক্ষেত্রে অপটিক নার্ভ রক্ষার জন্য লেজার চিকিৎসা বা সার্জারি (যেমন ট্র্যাবেকুলেক্টমি) প্রয়োজন হতে পারে।",
      },
      cta: { en: "Book a Glaucoma Screening", bn: "গ্লুকোমা স্ক্রিনিং-এর জন্য অ্যাপয়েন্টমেন্ট নিন" },
    },
  },
  {
    slug: "dry-eye-corneal-disease",
    name: { en: "Dry Eye & Corneal Disease", bn: "ড্রাই আই ও কর্নিয়াল রোগ" },
    image: "/images/services/dry-eye-corneal-disease.jpg",
    short: {
      en: "Relief from chronic dry eye, and urgent corneal infection care.",
      bn: "দীর্ঘস্থায়ী ড্রাই আই থেকে মুক্তি, এবং জরুরি কর্নিয়াল সংক্রমণের চিকিৎসা।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Drops / Targeted Treatment", bn: "ড্রপ / নির্দিষ্ট চিকিৎসা" },
    },
    tags: {
      en: ["Burning or gritty eyes", "Heavy screen time", "Pain after injury"],
      bn: ["জ্বালাপোড়া বা খসখসে ভাব", "বেশি স্ক্রিন টাইম", "আঘাতের পর ব্যথা"],
    },
    detail: {
      intro: {
        en: "Dry eye happens when the eye can't stay properly lubricated — common with screen time, age, and dry air. Corneal disease (like ulcers or keratitis) is more serious and needs prompt care.",
        bn: "চোখ ঠিকমতো আর্দ্র রাখতে না পারলে ড্রাই আই হয় — স্ক্রিন টাইম, বয়স আর শুষ্ক বাতাসে বেশি দেখা যায়। কর্নিয়াল রোগ (যেমন আলসার বা কেরাটাইটিস) বেশি গুরুতর, দ্রুত চিকিৎসা দরকার।",
      },
      whoLabel: { en: "Who needs it", bn: "কার প্রয়োজন হতে পারে" },
      who: {
        en: "Persistent burning, grittiness, or blurry vision that clears with blinking (dry eye); or pain, redness, and light sensitivity after an injury or contact lens misuse (possible corneal infection — see urgently).",
        bn: "লাগাতার জ্বালাপোড়া, খসখসে ভাব, বা পলক পড়লে ঠিক হয়ে যাওয়া ঝাপসা দৃষ্টি (ড্রাই আই); অথবা আঘাত বা লেন্সের ভুল ব্যবহারের পর ব্যথা, লালচেভাব, আলোয় অস্বস্তি (সম্ভাব্য কর্নিয়াল সংক্রমণ — দ্রুত দেখান)।",
      },
      howLabel: { en: "How it works", bn: "কীভাবে হয়" },
      how: {
        en: "Dry eye is managed with lubricating drops and lifestyle changes; persistent cases may need targeted treatment. Corneal infections need prompt antibiotic or antifungal treatment to prevent scarring.",
        bn: "ড্রাই আই লুব্রিকেটিং ড্রপ ও জীবনযাত্রার পরিবর্তনে সামলানো হয়; দীর্ঘস্থায়ী হলে নির্দিষ্ট চিকিৎসা লাগতে পারে। কর্নিয়াল সংক্রমণে দাগ পড়া ঠেকাতে দ্রুত অ্যান্টিবায়োটিক বা অ্যান্টিফাঙ্গাল চিকিৎসা দরকার।",
      },
      cta: { en: "Book a Dry Eye / Corneal Consultation", bn: "ড্রাই আই / কর্নিয়া পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন" },
    },
  },
  {
    slug: "rop-care",
    name: { en: "ROP Care", bn: "ROP চিকিৎসা" },
    image: "/images/services/rop-care.jpg",
    short: {
      en: "Specialized retina screening and treatment for premature infants.",
      bn: "অপরিণত নবজাতকদের রেটিনা স্ক্রিনিং ও চিকিৎসায় বিশেষজ্ঞ সেবা।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Screening + Laser", bn: "স্ক্রিনিং + লেজার" },
    },
    tags: {
      en: ["Born before 34 weeks", "Low birth weight", "Neonatologist referral"],
      bn: ["৩৪ সপ্তাহের আগে জন্ম", "কম ওজনে জন্ম", "শিশু বিশেষজ্ঞের রেফারেল"],
    },
    detail: {
      intro: {
        en: "Premature babies are at risk of abnormal blood vessel growth in the retina, which can threaten vision if untreated. ROP screening and treatment is one of the most time-sensitive areas of ophthalmology — early detection makes the difference between normal vision and permanent vision loss.",
        bn: "অপরিণত অবস্থায় জন্ম নেওয়া শিশুদের রেটিনায় অস্বাভাবিক রক্তনালী বৃদ্ধির ঝুঁকি থাকে, যা সময়মতো চিকিৎসা না হলে দৃষ্টিশক্তির জন্য বিপজ্জনক হতে পারে। ROP স্ক্রিনিং ও চিকিৎসা চক্ষুবিদ্যার সবচেয়ে সময়-সংবেদনশীল একটি বিষয় — দ্রুত শনাক্ত করাই স্বাভাবিক দৃষ্টি আর স্থায়ী দৃষ্টিহীনতার মধ্যে পার্থক্য গড়ে দেয়।",
      },
      whoLabel: { en: "Who needs screening", bn: "কাদের স্ক্রিনিং দরকার" },
      who: {
        en: "Babies born before 34 weeks of gestation, or with low birth weight, should be screened starting around 3–4 weeks after birth, as advised by the treating pediatrician or neonatologist.",
        bn: "৩৪ সপ্তাহের আগে জন্ম নেওয়া, অথবা কম ওজন নিয়ে জন্মানো শিশুদের জন্মের প্রায় ৩-৪ সপ্তাহ পর থেকেই স্ক্রিনিং শুরু করা উচিত, শিশু বিশেষজ্ঞের পরামর্শ অনুযায়ী।",
      },
      howLabel: { en: "How it's treated", bn: "কীভাবে চিকিৎসা হয়" },
      how: {
        en: "Depending on severity, treatment ranges from continued monitoring, to laser therapy on the retina, to anti-VEGF injections, to surgery in advanced cases. Most cases caught early can be managed without surgery.",
        bn: "সমস্যার তীব্রতা অনুযায়ী চিকিৎসা হতে পারে নিয়মিত পর্যবেক্ষণ, রেটিনায় লেজার থেরাপি, অ্যান্টি-ভিইজিএফ ইনজেকশন, অথবা জটিল ক্ষেত্রে সার্জারি। আগেভাগে ধরা পড়লে বেশিরভাগ ক্ষেত্রেই সার্জারি ছাড়াই সামলানো যায়।",
      },
      cta: { en: "Book a Newborn Eye Screening", bn: "নবজাতকের চোখ পরীক্ষার অ্যাপয়েন্টমেন্ট নিন" },
    },
  },
  {
    slug: "oculoplasty",
    name: { en: "Oculoplasty", bn: "অকুলোপ্লাস্টি" },
    image: "/images/services/oculoplasty.jpg",
    short: {
      en: "Eyelid, tear duct, and orbital procedures.",
      bn: "চোখের পাতা, অশ্রুনালী ও অরবিটাল সংক্রান্ত চিকিৎসা।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Reconstructive Surgery", bn: "রিকনস্ট্রাক্টিভ সার্জারি" },
    },
    tags: {
      en: ["Drooping eyelid", "Lid tumor / chalazion", "Blocked tear duct"],
      bn: ["চোখের পাতা ঝুলে পড়া", "পাতার টিউমার / চ্যালাজিয়ন", "অশ্রুনালী বন্ধ"],
    },
    detail: {
      intro: {
        en: "Oculoplasty covers surgical care for the structures around the eye — eyelids, tear ducts, and the orbit (eye socket) — addressing both function and appearance.",
        bn: "অকুলোপ্লাস্টির আওতায় পড়ে চোখের চারপাশের অংশের সার্জারি — চোখের পাতা, অশ্রুনালী এবং অরবিট (চোখের কোটর) — যা কার্যকারিতা ও চেহারা দুটোই ঠিক রাখে।",
      },
      whoLabel: { en: "Conditions treated", bn: "যেসব সমস্যার চিকিৎসা হয়" },
      who: {
        en: "Ptosis (drooping eyelid) · Lid tumors & chalazion removal · Tear duct blockage (DCR) · Orbital tumors and trauma",
        bn: "পিটোসিস (চোখের পাতা ঝুলে পড়া) · পাতার টিউমার ও চ্যালাজিয়ন অপসারণ · অশ্রুনালী বন্ধ হয়ে যাওয়া (DCR) · অরবিটাল টিউমার ও আঘাতজনিত সমস্যা",
      },
      howLabel: { en: "How it works", bn: "কীভাবে হয়" },
      how: {
        en: "Procedures are tailored to the specific condition — ptosis repair tightens the muscle that lifts the eyelid; DCR creates a new drainage path for tears; tumor removal is combined with reconstruction to preserve normal eyelid function and appearance.",
        bn: "প্রতিটি সমস্যার জন্য আলাদা পদ্ধতি — পিটোসিস মেরামতে পাতা তোলার পেশি টানটান করা হয়; DCR-এ অশ্রুর জন্য নতুন নিষ্কাশন পথ তৈরি করা হয়; টিউমার অপসারণের সাথে পুনর্গঠনও করা হয় যাতে পাতার স্বাভাবিক কাজ ও চেহারা বজায় থাকে।",
      },
      cta: { en: "Book an Oculoplasty Consultation", bn: "অকুলোপ্লাস্টি পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন" },
    },
  },
  {
    slug: "pterygium-surgery",
    name: { en: "Pterygium Surgery", bn: "পিটেরিজিয়াম সার্জারি" },
    image: "/images/services/pterygium-surgery.jpg",
    short: {
      en: "Surgical removal with graft to reduce recurrence.",
      bn: "গ্রাফটসহ সার্জারি করে অপসারণ, পুনরায় ফিরে আসার সম্ভাবনা কমাতে।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Removal + Conjunctival Graft", bn: "অপসারণ + কনজাংটিভাল গ্রাফট" },
    },
    tags: {
      en: ["Redness / irritation", "Visible growth on eye", "Long sun/wind exposure"],
      bn: ["লালচেভাব / জ্বালাপোড়া", "চোখে দৃশ্যমান বৃদ্ধি", "রোদ-বাতাসে দীর্ঘদিন কাজ"],
    },
    detail: {
      intro: {
        en: "A pterygium is a growth of tissue on the white of the eye, often caused by long-term sun and wind exposure, that can extend onto the cornea and affect vision if left untreated.",
        bn: "পিটেরিজিয়াম হলো চোখের সাদা অংশে টিস্যুর একটা বৃদ্ধি, যা সাধারণত দীর্ঘদিন রোদ ও বাতাসের সংস্পর্শে থাকার কারণে হয়। চিকিৎসা না করালে এটি কর্নিয়া পর্যন্ত ছড়িয়ে দৃষ্টিতে প্রভাব ফেলতে পারে।",
      },
      whoLabel: { en: "Who needs it", bn: "কার প্রয়োজন হতে পারে" },
      who: {
        en: "Redness, irritation, a visible growth on the eye, or blurred vision if the growth has reached the cornea.",
        bn: "চোখ লাল হওয়া, জ্বালাপোড়া, চোখে দৃশ্যমান একটা বৃদ্ধি, অথবা এটি কর্নিয়া পর্যন্ত পৌঁছালে দৃষ্টি ঝাপসা হয়ে যাওয়া।",
      },
      howLabel: { en: "How it works", bn: "কীভাবে হয়" },
      how: {
        en: "The growth is surgically removed and the area covered with a conjunctival graft (using the eye's own tissue) to reduce the chance of recurrence — a well-established, low-risk procedure.",
        bn: "বৃদ্ধিটুকু সার্জারি করে অপসারণ করা হয় এবং সেই জায়গা কনজাংটিভাল গ্রাফট (চোখের নিজস্ব টিস্যু ব্যবহার করে) দিয়ে ঢেকে দেওয়া হয়, যাতে আবার ফিরে আসার সম্ভাবনা কমে যায় — একটি সুপরিচিত ও কম ঝুঁকিপূর্ণ পদ্ধতি।",
      },
      cta: { en: "Book a Pterygium Consultation", bn: "পিটেরিজিয়াম পরামর্শের জন্য অ্যাপয়েন্টমেন্ট নিন" },
    },
  },
  {
    slug: "eye-trauma-emergency",
    name: { en: "Eye Trauma & Emergency Care", bn: "চোখের আঘাত ও জরুরি চিকিৎসা" },
    image: "/images/services/eye-trauma-emergency.png",
    short: {
      en: "Time-sensitive care for eye injuries and sudden vision loss.",
      bn: "চোখের আঘাত ও হঠাৎ দৃষ্টি হারানোর জন্য সময়-সংবেদনশীল চিকিৎসা।",
    },
    stat: {
      label: { en: "Procedure", bn: "যেভাবে হয়" },
      value: { en: "Urgent Evaluation + Treatment", bn: "জরুরি মূল্যায়ন + চিকিৎসা" },
    },
    tags: {
      en: ["Any eye injury", "Sudden vision loss", "Flashes / new floaters"],
      bn: ["যেকোনো চোখের আঘাত", "হঠাৎ দৃষ্টি হারানো", "আলোর ঝলকানি / নতুন বিন্দু"],
    },
    detail: {
      intro: {
        en: "Eye injuries and sudden vision changes can threaten sight permanently if not treated quickly — some are true emergencies where every hour matters.",
        bn: "চোখের আঘাত আর হঠাৎ দৃষ্টি পরিবর্তন দ্রুত চিকিৎসা না হলে স্থায়ীভাবে দৃষ্টি কেড়ে নিতে পারে — কিছু ক্ষেত্রে সত্যিকারের জরুরি অবস্থা, যেখানে প্রতিটা ঘণ্টা গুরুত্বপূর্ণ।",
      },
      whoLabel: { en: "Who needs it", bn: "কার প্রয়োজন হতে পারে" },
      who: {
        en: "Any eye injury (chemical, blunt, or sharp trauma), sudden vision loss, flashes of light, a shower of new floaters, or a shadow across your vision.",
        bn: "যেকোনো চোখের আঘাত (রাসায়নিক, আঘাতজনিত, বা ধারালো কিছু দিয়ে), হঠাৎ দৃষ্টি হারানো, আলোর ঝলকানি, অনেকগুলো নতুন কালো বিন্দু, বা দৃষ্টিতে ছায়া।",
      },
      howLabel: { en: "How it works", bn: "কীভাবে হয়" },
      how: {
        en: "Urgent evaluation determines the extent of injury, followed by treatment ranging from medication to emergency surgery depending on severity. Time-sensitive — contact the practice immediately rather than waiting for a routine appointment.",
        bn: "জরুরি পরীক্ষায় আঘাতের মাত্রা বোঝা হয়, তারপর তীব্রতা অনুযায়ী ওষুধ থেকে জরুরি সার্জারি পর্যন্ত চিকিৎসা। সময়-সংবেদনশীল — নিয়মিত অ্যাপয়েন্টমেন্টের বদলে সাথে সাথে যোগাযোগ করুন।",
      },
      cta: { en: "Emergency? Call Immediately", bn: "জরুরি অবস্থা? এখনই কল করুন" },
    },
  },
];
