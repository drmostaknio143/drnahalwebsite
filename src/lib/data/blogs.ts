export type BlogPost = {
  slug: string;
  title: { en: string; bn: string };
  metaDescription: { en: string; bn: string };
  category: { en: string; bn: string };
  readTime: { en: string; bn: string };
  date: string;
  image: string;
  relatedServiceSlug?: string;
  relatedConditionSlug?: string;
  sections: {
    heading?: { en: string; bn: string };
    content: { en: string; bn: string };
    bulletPoints?: { en: string[]; bn: string[] };
  }[];
  emergencyCallout?: { en: string; bn: string };
};

export const blogPosts: BlogPost[] = [
  {
    slug: "cataract-surgery-recovery",
    title: {
      en: "Cataract Surgery Recovery: What to Do (and Avoid) in the First Weeks",
      bn: "ছানি অপারেশনের পর প্রথম কয়েক সপ্তাহে কী করবেন, কী করবেন না",
    },
    metaDescription: {
      en: "A clear, practical guide to cataract surgery recovery — what's normal, what to avoid, and when to call your doctor.",
      bn: "ছানি অপারেশনের পর সহজ, বাস্তবসম্মত গাইড — কী স্বাভাবিক, কী এড়িয়ে চলবেন, আর কখন ডাক্তারকে কল করবেন।",
    },
    category: { en: "Cataract Care", bn: "ছানি চিকিৎসা" },
    readTime: { en: "5 min read", bn: "৫ মিনিট পাঠ" },
    date: "2026-08-15",
    image: "/images/services/cataract-surgery.jpg",
    relatedServiceSlug: "cataract-surgery",
    relatedConditionSlug: "cataract",
    sections: [
      {
        content: {
          en: "Cataract surgery is one of the most common and safest procedures in modern medicine — but the days after surgery matter just as much as the procedure itself. How you care for your eye in the first few weeks directly affects how quickly, and how well, you heal.",
          bn: "ছানি অপারেশন আধুনিক চিকিৎসাবিজ্ঞানের সবচেয়ে নিরাপদ ও সাধারণ পদ্ধতিগুলোর একটা — কিন্তু অপারেশনের পরের দিনগুলো ঠিক ততটাই গুরুত্বপূর্ণ যতটা অপারেশনটা নিজে। প্রথম কয়েক সপ্তাহে আপনি চোখের যেভাবে যত্ন নেবেন, তার ওপরই নির্ভর করবে আপনি কত দ্রুত ও কতটা ভালোভাবে সেরে উঠবেন।",
        },
      },
      {
        heading: { en: "The First 24 Hours", bn: "প্রথম ২৪ ঘণ্টা" },
        content: {
          en: "Right after surgery, your eye will be covered with a protective shield — keep it on until your doctor tells you to remove it, including while sleeping for the first night or two. Mild grittiness, watering, and light sensitivity are normal. You should not experience sharp pain — if you do, contact the practice immediately.",
          bn: "অপারেশনের পরপরই চোখে একটা সুরক্ষা শিল্ড পরানো থাকবে — ডাক্তার খুলতে না বলা পর্যন্ত এটা পরে থাকুন, প্রথম এক-দুই রাত ঘুমানোর সময়ও। হালকা খচখচে অনুভূতি, পানি পড়া, আলোয় অস্বস্তি স্বাভাবিক। তীব্র ব্যথা হওয়ার কথা না — হলে সাথে সাথে যোগাযোগ করুন।",
        },
      },
      {
        heading: { en: "What's Normal in the First Week", bn: "প্রথম সপ্তাহে যা স্বাভাবিক" },
        content: {
          en: "Blurry or fluctuating vision for the first few days is common as your eye adjusts to the new lens. Mild redness and a scratchy feeling usually settle within days. You'll be prescribed antibiotic and anti-inflammatory eye drops — using them exactly as directed, at the right times, matters more than almost anything else for a smooth recovery.",
          bn: "প্রথম কয়েকদিন দৃষ্টি ঝাপসা বা ওঠানামা করা স্বাভাবিক, কারণ চোখ নতুন লেন্সের সাথে মানিয়ে নিচ্ছে। হালকা লালচেভাব ও খসখসে অনুভূতি সাধারণত কয়েকদিনেই কমে যায়। অ্যান্টিবায়োটিক ও প্রদাহনাশক ড্রপ দেওয়া হবে — নির্ধারিত সময়ে ঠিকভাবে ব্যবহার করাটাই সুস্থ হয়ে ওঠার সবচেয়ে বড় চাবিকাঠি।",
        },
      },
      {
        heading: { en: "What to Avoid", bn: "যা এড়িয়ে চলবেন" },
        content: {
          en: "Avoid rubbing or pressing on the eye, even lightly. Skip swimming, hot tubs, and dusty environments for at least two weeks. Avoid heavy lifting or strenuous exercise for about a week, as sudden strain can increase eye pressure. Wear sunglasses outdoors if sensitive to light.",
          bn: "চোখ ঘষা বা হালকা চাপ দেওয়াও এড়িয়ে চলুন। অন্তত দুই সপ্তাহ সাঁতার, পুকুরে নামা, আর ধুলাবালিপূর্ণ জায়গা এড়িয়ে চলুন। প্রায় এক সপ্তাহ ভারী জিনিস তোলা বা কঠোর পরিশ্রম বাদ দিন, কারণ হঠাৎ চাপ চোখের প্রেসার বাড়িয়ে দিতে পারে। রোদে বের হলে রোদচশমা ব্যবহার করুন।",
        },
      },
      {
        heading: { en: "When You Can Resume Normal Activities", bn: "কখন স্বাভাবিক কাজে ফিরবেন" },
        content: {
          en: "Most patients can watch TV, read, and use their phone right away — this does not strain the eye. Light walking is fine within a day or two. Return to desk work often happens within 3–7 days depending on the nature of the job.",
          bn: "বেশিরভাগ রোগী সাথে সাথেই টিভি দেখা, বই পড়া, ফোন ব্যবহার করতে পারেন — এতে চোখের কোনো ক্ষতি হয় না। এক-দুই দিনের মধ্যে হালকা হাঁটাচলা ঠিক আছে। কাজের ধরন অনুযায়ী ৩-৭ দিনের মধ্যে অফিসে ফেরা যায়।",
        },
      },
    ],
    emergencyCallout: {
      en: "Call immediately if you experience: sudden severe pain, a sharp decrease in vision, increasing redness/discharge, or flashes of light.",
      bn: "হঠাৎ তীব্র ব্যথা, হঠাৎ দৃষ্টি কমে যাওয়া, চোখে মাত্রাতিরিক্ত লালচেভাব বা পিঁচুটি, অথবা আলোর ঝলকানি দেখা দিলে সাথে সাথে ডাক্তারকে কল করুন।",
    },
  },
  {
    slug: "questions-before-lasik",
    title: {
      en: "7 Questions to Ask Before Getting LASIK",
      bn: "লেসিক করানোর আগে যে ৭টা প্রশ্ন করা উচিত",
    },
    metaDescription: {
      en: "Thinking about LASIK? Here are the questions worth asking your surgeon before you commit.",
      bn: "লেসিক করানোর কথা ভাবছেন? বুক করার আগে সার্জনকে এই প্রশ্নগুলো করে নিন।",
    },
    category: { en: "Refractive Surgery", bn: "লেসিক ও কর্নিয়া" },
    readTime: { en: "6 min read", bn: "৬ মিনিট পাঠ" },
    date: "2026-08-20",
    image: "/images/services/refractive-surgery.jpg",
    relatedServiceSlug: "refractive-surgery",
    relatedConditionSlug: "refractive-error",
    sections: [
      {
        content: {
          en: "LASIK is a life-changing procedure for many people — but it's also permanent, which means the decision deserves real information, not just enthusiasm. Here are the crucial questions worth discussing with your surgeon.",
          bn: "লেসিক অনেকের জীবন বদলে দেওয়া একটা পদ্ধতি — কিন্তু এটা স্থায়ীও, তাই এই সিদ্ধান্ত নেওয়ার আগে শুধু উৎসাহ না, সঠিক তথ্য জানা দরকার। বুকিং করার আগে এই গুরুত্বপূর্ণ প্রশ্নগুলো অবশ্যই আলোচনা করে নিন।",
        },
      },
      {
        heading: { en: "1. Am I actually a candidate?", bn: "১. আমি আসলে উপযুক্ত কিনা?" },
        content: {
          en: "Not everyone is. Candidacy requires a stable prescription for at least a year, sufficient corneal thickness, and no active conditions like severe dry eye or keratoconus. This can only be determined through comprehensive corneal topography and scans.",
          bn: "সবাই উপযুক্ত না। এর জন্য অন্তত এক বছর ধরে পাওয়ার অপরিবর্তিত থাকা, কর্নিয়া পর্যাপ্ত পুরু হওয়া, আর গুরুতর ড্রাই আই বা কেরাটোকোনাসের মতো রোগ না থাকা আবশ্যক। এটা শুধু বিস্তারিত প্রি-সার্জারি স্ক্যানের মাধ্যমেই নিশ্চিত করা যায়।",
        },
      },
      {
        heading: { en: "2. Which technique suits my eye best — LASIK, PRK, or SMILE?", bn: "২. আমার জন্য কোন পদ্ধতি সবচেয়ে ভালো — লেসিক, পিআরকে, নাকি স্মাইল?" },
        content: {
          en: "Each technique has clear advantages. LASIK offers fastest visual recovery with a corneal flap. PRK suits thinner corneas or contact-sport athletes. SMILE is flapless and minimally invasive. The right choice depends on your corneal measurements, not trends.",
          bn: "প্রতিটির আলাদা সুবিধা আছে। লেসিকে সবচেয়ে দ্রুত দৃষ্টি ফিরে আসে। পাতলা কর্নিয়া বা যারা মারমুখী খেলাধুলার সাথে যুক্ত তাদের জন্য পিআরকে ভালো। স্মাইলে ফ্ল্যাপ কাটার দরকার হয় না। চোখের নির্দিষ্ট পরিমাপ অনুযায়ী সঠিক পদ্ধতি নির্বাচন করা হয়।",
        },
      },
      {
        heading: { en: "3. What are the realistic side-effects and recovery timeline?", bn: "৩. বাস্তবসম্মত সম্ভাব্য পার্শ্বপ্রতিক্রিয়া ও সুস্থতার সময়সীমা কী?" },
        content: {
          en: "Temporary dryness and mild night-time halos are common in early healing. An experienced refractive surgeon will walk you through your exact lifestyle, screen hours, and sport routines to tailor pre- and post-op care.",
          bn: "প্রাথমিক পর্যায়ে সাময়িক ড্রাই আই বা রাতে আলোর চারপাশে হালকা আভা দেখা অস্বাভাবিক নয়। একজন অভিজ্ঞ সার্জন আপনার কাজের ধরন, স্ক্রিন টাইম ও জীবনযাত্রার সাথে মিলিয়ে পুরো পরিকল্পনা বুঝিয়ে বলবেন।",
        },
      },
    ],
  },
  {
    slug: "diabetes-and-your-eyes",
    title: {
      en: "Diabetes and Your Eyes: How Often Should You Get Screened?",
      bn: "ডায়াবেটিস থাকলে বছরে কতবার চোখ পরীক্ষা করাবেন",
    },
    metaDescription: {
      en: "A simple guide for diabetic patients on how often to get a retina exam, and why it matters even without symptoms.",
      bn: "ডায়াবেটিস রোগীদের জন্য সহজ গাইড — কতদিন পরপর রেটিনা পরীক্ষা করাবেন, আর কেন লক্ষণ ছাড়াও এটা জরুরি।",
    },
    category: { en: "Retina & Vitreous", bn: "রেটিনা ও ডায়াবেটিস" },
    readTime: { en: "5 min read", bn: "৫ মিনিট পাঠ" },
    date: "2026-08-25",
    image: "/images/services/diabetic-eye-care.jpg",
    relatedServiceSlug: "diabetic-eye-care",
    relatedConditionSlug: "diabetic-retinopathy",
    sections: [
      {
        content: {
          en: "If you have diabetes, your eyes are at risk even when your vision feels completely normal. Diabetic retinopathy — damage to retinal micro-vessels from prolonged high blood sugar — develops silently for years before symptoms appear.",
          bn: "আপনার যদি ডায়াবেটিস থাকে, তাহলে দৃষ্টি একদম স্বাভাবিক মনে হলেও আপনার চোখ ঝুঁকিতে থাকতে পারে। ডায়াবেটিক রেটিনোপ্যাথি — রক্তে সুগারের কারণে রেটিনার সূক্ষ্ম রক্তনালীর ক্ষতি — কোনো লক্ষণ ছাড়াই বছরের পর বছর ধরে ভেতরে ভেতরে বাড়তে পারে।",
        },
      },
      {
        heading: { en: "Recommended Screening Intervals", bn: "সুপারিশকৃত স্ক্রিনিং সময়সূচি" },
        content: {
          en: "Guidelines recommend: Type 1 diabetes patients within 5 years of diagnosis, then yearly; Type 2 diabetes patients immediately upon diagnosis, then annually; and pregnant women with diabetes during their first trimester.",
          bn: "চিকিৎসা নির্দেশিকা অনুযায়ী: টাইপ ১ ডায়াবেটিস রোগীদের ধরা পড়ার ৫ বছরের মধ্যে এবং পরে প্রতি বছর; টাইপ ২ ডায়াবেটিসের রোগীদের শনাক্ত হওয়ার সাথে সাথেই এবং পরবর্তীতে প্রতি বছর রেটিনা পরীক্ষা করানো আবশ্যক।",
        },
        bulletPoints: {
          en: [
            "Type 1 Diabetes: First check within 5 years, then annually.",
            "Type 2 Diabetes: Immediate check upon diagnosis, then annually.",
            "Pregnancy with Diabetes: Comprehensive check in 1st trimester.",
            "Known Retinopathy: Follow-up every 3 to 6 months.",
          ],
          bn: [
            "টাইপ ১ ডায়াবেটিস: শনাক্ত হওয়ার ৫ বছরের মধ্যে, তারপর প্রতি বছর।",
            "টাইপ ২ ডায়াবেটিস: শনাক্ত হওয়ার সাথে সাথেই, তারপর প্রতি বছর।",
            "গর্ভাবস্থায় ডায়াবেটিস: প্রথম তিন মাসেই পুতুল বড় করে পরীক্ষা।",
            "রেটিনোপ্যাথি থাকলে: চিকিৎসকের পরামর্শে প্রতি ৩-৬ মাস অন্তর।",
          ],
        },
      },
      {
        heading: { en: "Why Pupil Dilation Is Essential", bn: "পুতুল বড় করে পরীক্ষা কেন আবশ্যক" },
        content: {
          en: "A standard vision check for glasses does not evaluate the retina. Dilating drops enlarge the pupil, enabling the vitreoretinal specialist to examine the peripheral retina for microaneurysms, hemorrhages, and early edema.",
          bn: "সাধারণ চশমার পাওয়ার চেক দিয়ে রেটিনা দেখা যায় না। পুতুল বড় করার ড্রপ দিয়ে রেটিনা বিশেষজ্ঞ চোখের পেছনের স্তর, রক্তনালী ও ম্যাকুলার সূক্ষ্ম রক্তক্ষরণ নিখুঁতভাবে দেখতে পান।",
        },
      },
    ],
  },
  {
    slug: "rop-newborn-eye-screening",
    title: {
      en: "When Should You Get a Newborn's Eyes Checked? An ROP Awareness Guide",
      bn: "নবজাতকের চোখ কখন পরীক্ষা করাবেন — ROP সচেতনতা গাইড",
    },
    metaDescription: {
      en: "A parent's guide to Retinopathy of Prematurity (ROP) — which babies need screening, when, and why timing matters.",
      bn: "অপরিণত নবজাতকের বাবা-মায়ের জন্য গাইড — ROP স্ক্রিনিং কাদের লাগে, কখন লাগে, আর কেন সময়টা এত গুরুত্বপূর্ণ।",
    },
    category: { en: "Pediatric Eye Care", bn: "শিশুর চোখের যত্ন" },
    readTime: { en: "6 min read", bn: "৬ মিনিট পাঠ" },
    date: "2026-08-28",
    image: "/images/services/rop-care.jpg",
    relatedServiceSlug: "rop-care",
    relatedConditionSlug: "rop",
    sections: [
      {
        content: {
          en: "For parents of premature babies in the NICU, eye exams might not be top of mind — but Retinopathy of Prematurity (ROP) is one of the most time-critical conditions in medicine. Early intervention preserves sight; delayed diagnosis can result in irreversible blindness.",
          bn: "NICU-তে থাকা অপরিণত নবজাতকের বাবা-মায়েদের চোখের পরীক্ষার কথা হয়তো প্রথমে মাথায় আসে না — কিন্তু ROP চিকিৎসাবিজ্ঞানের সবচেয়ে সময়-সংবেদনশীল সমস্যার একটি। সময়মতো স্ক্রিনিং দৃষ্টি রক্ষা করে, আর দেরিতে ধরা পড়লে স্থায়ী অন্ধত্ব হতে পারে।",
        },
      },
      {
        heading: { en: "Which Infants Require Screening?", bn: "কোন শিশুদের স্ক্রিনিং বাধ্যতামূলক?" },
        content: {
          en: "Babies born before 34 weeks of gestation or weighing less than 2,000 grams, as well as infants who required prolonged oxygen support or experienced unstable neonatal courses, require mandatory screening.",
          bn: "৩৪ সপ্তাহের আগে জন্ম নেওয়া, অথবা ২০০০ গ্রামের কম ওজনে জন্মানো যেকোনো শিশু, এবং যারা দীর্ঘদিন অক্সিজেন সাপোর্ট বা অন্যান্য জটিলতায় ভুগেছে — তাদের বাধ্যতামূলক স্ক্রিনিং দরকার।",
        },
      },
      {
        heading: { en: "Optimal Timing", bn: "স্ক্রিনিংয়ের সঠিক সময়" },
        content: {
          en: "Screening begins at 3 to 4 weeks after birth. The exam is conducted gently at the bedside with indirect ophthalmoscopy. If abnormal blood vessels are detected, painless laser photocoagulation or anti-VEGF injections halt progression immediately.",
          bn: "জন্মের ৩ থেকে ৪ সপ্তাহের মধ্যে প্রথম স্ক্রিনিং করাতে হয়। বিশেষজ্ঞ চিকিৎসক ইনডাইরেক্ট অপথালমোস্কোপির মাধ্যমে এটি পরীক্ষা করেন। কোনো অস্বাভাবিক রক্তনালী দেখা দিলে আধুনিক লেজার বা ইনজেকশন দিয়ে দ্রুত রোগটি থামানো যায়।",
        },
      },
    ],
  },
  {
    slug: "glasses-vs-contacts-vs-lasik",
    title: {
      en: "Glasses vs. Contact Lenses vs. LASIK: Which One Is Right for You?",
      bn: "চশমা vs লেন্স vs লেসিক — কোনটা আপনার জন্য ঠিক",
    },
    metaDescription: {
      en: "A practical comparison of glasses, contact lenses, and LASIK — cost, convenience, and who each option suits best.",
      bn: "চশমা, কনট্যাক্ট লেন্স আর লেসিকের ব্যবহারিক তুলনা — খরচ, সুবিধা, আর কার জন্য কোনটা ভালো।",
    },
    category: { en: "Vision Correction", bn: "দৃষ্টি সংশোধন" },
    readTime: { en: "5 min read", bn: "৫ মিনিট পাঠ" },
    date: "2026-08-30",
    image: "/images/services/refractive-surgery.jpg",
    relatedServiceSlug: "refractive-surgery",
    relatedConditionSlug: "refractive-error",
    sections: [
      {
        content: {
          en: "There is no universal 'best' way to correct refractive errors — eyeglasses, contacts, and laser refractive surgery each solve the problem with distinct trade-offs in lifestyle, maintenance, and cost.",
          bn: "ঝাপসা দৃষ্টি ঠিক করার কোনো একক 'সেরা' নিয়ম নেই — চশমা, কনট্যাক্ট লেন্স এবং লেসিক তিনটিই জীবনযাত্রার ধরন, রক্ষণাবেক্ষণ ও খরচের ভিন্ন ভিন্ন সুবিধা-অসুবিধা নিয়ে আসে।",
        },
      },
      {
        heading: { en: "Comparison Summary", bn: "তুলনামূলক বিশ্লেষণ" },
        content: {
          en: "Eyeglasses are zero-risk, easily updated, but can limit athletic pursuits. Contact lenses provide unobstructed peripheral vision but demand meticulous hygiene to avoid microbial keratitis. LASIK offers permanent independence from frames through a quick outpatient procedure.",
          bn: "চশমা সম্পূর্ণ ঝুঁকিমুক্ত হলেও খেলাধুলা বা বৃষ্টিতে ঝামেলা তৈরি করে। কনট্যাক্ট লেন্সে পরিধি জুড়েই স্পষ্ট দৃষ্টি পাওয়া যায়, তবে জীবাণু সংক্রমণ এড়াতে কড়া পরিচ্ছন্নতা দরকার। লেসিক এককালীন পদ্ধতির মাধ্যমে স্থায়ী স্বাধীনতা এনে দেয়।",
        },
      },
    ],
  },
  {
    slug: "sudden-blurry-vision-emergency",
    title: {
      en: "Sudden Blurry Vision: When It's an Emergency (and When It's Not)",
      bn: "হঠাৎ চোখে ঝাপসা দেখা — কখন এটা জরুরি অবস্থা, কখন না",
    },
    metaDescription: {
      en: "Not all blurry vision is the same. Here's how to tell when sudden vision changes need immediate emergency care.",
      bn: "সব ঝাপসা দৃষ্টি একরকম না। হঠাৎ দৃষ্টি পরিবর্তন কখন জরুরি চিকিৎসা দরকার তা বোঝার গাইড।",
    },
    category: { en: "Eye Emergencies", bn: "জরুরি চোখের সমস্যা" },
    readTime: { en: "6 min read", bn: "৬ মিনিট পাঠ" },
    date: "2026-09-01",
    image: "/images/services/eye-trauma-emergency.png",
    relatedServiceSlug: "eye-trauma-emergency",
    relatedConditionSlug: "retinal-detachment",
    sections: [
      {
        content: {
          en: "Blurry vision is extremely common, but the speed of onset is the deciding factor between a routine clinic appointment and an emergency that threatens permanent vision loss within hours.",
          bn: "ঝাপসা দৃষ্টি খুবই সাধারণ একটি লক্ষণ, কিন্তু এটি কত দ্রুত শুরু হয়েছে তার ওপর নির্ভর করে এটি সাধারণ চেম্বার ভিজিট নাকি কয়েক ঘণ্টার মধ্যে দৃষ্টি হারানোর মতো জরুরি অবস্থা।",
        },
      },
      {
        heading: { en: "Red Flags Requiring Immediate Emergency Care", bn: "যেসব লক্ষণ দেখা দিলে অবিলম্বে জরুরি বিভাগে যাবেন" },
        content: {
          en: "Do not wait for a routine appointment if you observe any of the following symptoms. Contact Dr. Nahal's emergency line at 01344-890335 immediately.",
          bn: "নিচের যেকোনো লক্ষণ দেখা দিলে অ্যাপয়েন্টমেন্টের জন্য অপেক্ষা না করে অবিলম্বে জরুরি নম্বরে (০১৩৪৪-৮৯০৩৩৫) যোগাযোগ করুন:",
        },
        bulletPoints: {
          en: [
            "Sudden unilateral vision loss or blurring (within minutes to hours).",
            "A dark curtain or shadow sweeping across your visual field.",
            "A sudden cluster of floaters paired with brilliant flashes of light.",
            "Severe eye pain accompanied by headache and nausea (acute glaucoma).",
            "Any vision change immediately following physical trauma or impact.",
          ],
          bn: [
            "এক চোখে হঠাৎ দৃষ্টি কমে যাওয়া বা তীব্র ঝাপসা হওয়া (মিনিট থেকে ঘণ্টার মধ্যে)।",
            "দৃষ্টির কোনো এক পাশে কালো পর্দার মতো ছায়া নেমে আসা।",
            "আলোর ঝলকানির সাথে সাথে হঠাৎ অসংখ্য কালো বিন্দুর আবির্ভাব।",
            "তীব্র চোখের ব্যথার সাথে মাথাব্যথা ও বমি বমি ভাব (তীব্র গ্লুকোমা)।",
            "চোখে যেকোনো ধরনের সরাসরি আঘাত পাওয়ার পর দৃষ্টি সমস্যা।",
          ],
        },
      },
    ],
    emergencyCallout: {
      en: "Retinal detachment and acute glaucoma require immediate care within hours to prevent permanent damage.",
      bn: "রেটিনা বিচ্ছিন্নতা বা তীব্র গ্লুকোমায় প্রতিটা ঘণ্টাই মূল্যবান — দৃষ্টি বাঁচাতে বিলম্ব না করে দ্রুত চিকিৎসা নিন।",
    },
  },
  {
    slug: "how-phacoemulsification-works",
    title: {
      en: "How Phacoemulsification Actually Works: Cataract Surgery Myths, Busted",
      bn: "ফ্যাকোইমালসিফিকেশন আসলে কীভাবে কাজ করে — ছানি অপারেশন নিয়ে ভুল ধারণা ভাঙা",
    },
    metaDescription: {
      en: "Demystifying phacoemulsification — how modern cataract surgery actually works, and the common myths around it.",
      bn: "ফ্যাকোইমালসিফিকেশন — আধুনিক ছানি অপারেশন আসলে কীভাবে কাজ করে, আর এই নিয়ে প্রচলিত ভুল ধারণাগুলো।",
    },
    category: { en: "Cataract Care", bn: "ছানি চিকিৎসা" },
    readTime: { en: "5 min read", bn: "৫ মিনিট পাঠ" },
    date: "2026-09-02",
    image: "/images/services/cataract-surgery.jpg",
    relatedServiceSlug: "cataract-surgery",
    relatedConditionSlug: "cataract",
    sections: [
      {
        content: {
          en: "Many patients imagine cataract surgery involves large incisions, painful stitches, and weeks of bandages. Modern phacoemulsification has completely transformed this into a sutureless, 15-minute outpatient procedure.",
          bn: "অনেক রোগী ভাবেন ছানি অপারেশন মানেই বড় কাটাছেঁড়া, সেলাই আর সপ্তাহের পর সপ্তাহ ব্যান্ডেজ। আধুনিক ফ্যাকোইমালসিফিকেশন একে সম্পূর্ণ সেলাইবিহীন, মাত্র ১৫ মিনিটের একটি নিরাপদ পদ্ধতিতে পরিণত করেছে।",
        },
      },
      {
        heading: { en: "The 5 Step Procedure", bn: "পদ্ধতিটির ৫টি সহজ ধাপ" },
        content: {
          en: "1. Numbing drops ensure zero pain.\n2. A micro-incision of 2.2mm is placed on the corneal periphery.\n3. A gentle ultrasound probe breaks down the cloudy crystalline lens.\n4. Micro-suction aspirates the lens fragments smoothly.\n5. A foldable intraocular lens (IOL) unfolds cleanly inside the natural capsule.",
          bn: "১. অ্যানেস্থেসিয়ার ড্রপ দিয়ে চোখ অবশ করা হয় — কোনো তীব্র ব্যথা থাকে না।\n২. কর্নিয়ার কিনারায় মাত্র ২.২ মিলিমিটারের সূক্ষ্ম পোর্ট তৈরি করা হয়।\n৩. আল্ট্রাসাউন্ড শক্তি দিয়ে ঘোলা লেন্সটি ভেঙে ছোট করা হয়।\n৪. সূক্ষ্মভাবে লেন্সের টুকরোগুলো টেনে বের করা হয়।\n৫. ভাঁজ করা নতুন কৃত্রিম লেন্স ভেতরে বসানো হয় যা নিজে থেকেই খুলে যায়।",
        },
      },
      {
        heading: { en: "Common Myths", bn: "প্রচলিত ভুল ধারণা" },
        content: {
          en: "Myth: 'Cataracts must be fully mature or ripe before surgery.' Reality: Operating earlier prevents complications and makes phacoemulsification faster and safer.",
          bn: "ভুল ধারণা: 'ছানি পুরোপুরি না পাকা পর্যন্ত অপারেশন করা যায় না।' বাস্তবতা: ছানি বেশি শক্ত হওয়ার আগেই আধুনিক ফ্যাকো সার্জারি করা অনেক বেশি নিরাপদ ও দ্রুততম।",
        },
      },
    ],
  },
  {
    slug: "screen-time-and-dry-eye",
    title: {
      en: "Screen Time and Dry Eye: How to Protect Your Eyes in a Digital Life",
      bn: "স্ক্রিন টাইম আর ড্রাই আই — কীভাবে চোখ সুরক্ষিত রাখবেন",
    },
    metaDescription: {
      en: "Practical, evidence-based tips to prevent and manage dry eye caused by long screen time.",
      bn: "দীর্ঘ স্ক্রিন টাইমের কারণে হওয়া ড্রাই আই প্রতিরোধ ও সামলানোর ব্যবহারিক পরামর্শ।",
    },
    category: { en: "Everyday Eye Care", bn: "দৈনন্দিন চোখের যত্ন" },
    readTime: { en: "5 min read", bn: "৫ মিনিট পাঠ" },
    date: "2026-09-04",
    image: "/images/services/dry-eye-corneal-disease.jpg",
    relatedServiceSlug: "dry-eye-corneal-disease",
    relatedConditionSlug: "dry-eye",
    sections: [
      {
        content: {
          en: "Prolonged screen hours reduce human blink rates by over 50%. This causes rapid tear film evaporation, leading to grittiness, burning sensations, and fluctuating blurriness that clears upon blinking.",
          bn: "কম্পিউটার বা ফোনের স্ক্রিনে তাকিয়ে থাকলে মানুষের স্বাভাবিক পলক পড়ার হার অর্ধেকেরও বেশি কমে যায়। এতে অশ্রুর স্তর দ্রুত শুকিয়ে যায় এবং চোখ খচখচ করা ও জ্বালাপোড়ার সৃষ্টি হয়।",
        },
      },
      {
        heading: { en: "The 20-20-20 Principle", bn: "২০-২০-২০ নিয়ম" },
        content: {
          en: "Every 20 minutes, take a 20-second break and gaze at an object 20 feet away. This relaxes the ciliary focusing muscles and resets natural, full tear spreading.",
          bn: "প্রতি ২০ মিনিট পর পর, ২০ সেকেন্ডের জন্য অন্তত ২০ ফুট দূরের কোনো বস্তুর দিকে তাকান। এটি চোখের মাংসপেশিকে বিশ্রাম দেয় এবং অশ্রুস্তরকে পুনরুজ্জীবিত করে।",
        },
      },
      {
        heading: { en: "Ergonomic & Hydration Tips", bn: "কাজের পরিবেশ ও ড্রপের ব্যবহার" },
        content: {
          en: "Keep monitors slightly below eye level to minimize exposed ocular surface area. In air-conditioned offices, use a desk humidifier and consider preservative-free artificial tears when working extended shifts.",
          bn: "মনিটর চোখের সমান্তরাল থেকে সামান্য নিচে রাখুন যাতে চোখের পাতার ফাঁক কম থাকে। এসি রুমে হিউমিডিফায়ার ব্যবহার করুন এবং প্রয়োজনে প্রিজারভেটিভমুক্ত ড্রপ ব্যবহার করতে পারেন।",
        },
      },
    ],
  },
  {
    slug: "when-to-see-a-retina-specialist",
    title: {
      en: "When to Refer to a Retina Specialist: A Guide for Patients and General Practitioners",
      bn: "কখন রেটিনা বিশেষজ্ঞের কাছে পাঠাবেন — রোগী ও চিকিৎসকদের জন্য গাইড",
    },
    metaDescription: {
      en: "When does an eye issue need a retina specialist rather than a general ophthalmologist or optometrist? A practical referral guide.",
      bn: "কখন একটা চোখের সমস্যায় সাধারণ চক্ষু চিকিৎসকের বদলে রেটিনা বিশেষজ্ঞ দরকার? একটা ব্যবহারিক রেফারেল গাইড।",
    },
    category: { en: "Retina & Vitreous", bn: "রেটিনা ও রেফারেল" },
    readTime: { en: "6 min read", bn: "৬ মিনিট পাঠ" },
    date: "2026-09-05",
    image: "/images/services/vitreoretinal-surgery.jpg",
    relatedServiceSlug: "vitreoretinal-surgery",
    relatedConditionSlug: "retinal-detachment",
    sections: [
      {
        content: {
          en: "General ophthalmologists deliver excellent general and anterior segment care. Vitreoretinal surgeons complete dedicated surgical fellowships to manage the delicate posterior segment: the retina, macula, and vitreous body.",
          bn: "সাধারণ চক্ষু চিকিৎসকেরা চোখের সামনের অংশের চমৎকার সেবা দিয়ে থাকেন। তবে চোখের পেছনের গভীর অংশ — রেটিনা, ম্যাকুলা ও ভিট্রিয়াসের জটিল রোগ ও মাইক্রো-সার্জারির জন্য বিশেষায়িত রেটিনা ফেলোশিপ প্রশিক্ষণ প্রয়োজন হয়।",
        },
      },
      {
        heading: { en: "Key Referral Indications", bn: "রেফারেল নির্দেশনাসমূহ" },
        content: {
          en: "Urgent same-day referral is indicated for sudden light flashes, new floater clusters, or visual field deficits. Timely specialist review is needed for diabetic macular edema, retinal vein occlusion, and unexplained central distortion.",
          bn: "আলোর ঝলকানি, নতুন কালো বিন্দু ভাসা বা হঠাৎ দৃষ্টি কমে গেলে একই দিনে জরুরি রেফারেল প্রয়োজন। অন্যদিকে ডায়াবেটিক রেটিনোপ্যাথি বা ম্যাকুলার ফোলাভাবের ক্ষেত্রে নিয়মিত কিন্তু দ্রুত বিশেষজ্ঞের মতামত নেওয়া উচিত।",
        },
      },
    ],
  },
  {
    slug: "senior-eye-care-checklist",
    title: {
      en: "Eye Care After 50: An Annual Checklist for Aging Eyes",
      bn: "৫০ পেরোনোর পর চোখের যত্ন — বার্ষিক চেকলিস্ট",
    },
    metaDescription: {
      en: "A practical annual eye-care checklist for people over 50 — what to check, how often, and warning signs to know.",
      bn: "৫০ বছরের বেশি বয়সীদের জন্য ব্যবহারিক বার্ষিক চোখের যত্নের চেকলিস্ট — কী পরীক্ষা করাবেন, কতদিন পরপর, আর কোন লক্ষণে সতর্ক থাকবেন।",
    },
    category: { en: "Everyday Eye Care", bn: "বয়স্কদের চোখের যত্ন" },
    readTime: { en: "5 min read", bn: "৫ মিনিট পাঠ" },
    date: "2026-09-07",
    image: "/images/services/cataract-surgery.jpg",
    relatedServiceSlug: "cataract-surgery",
    relatedConditionSlug: "glaucoma",
    sections: [
      {
        content: {
          en: "After age 50, predictable physiological shifts occur. Early detection of conditions like glaucoma, macular degeneration, and cataracts allows for proactive treatment before permanent functional vision loss occurs.",
          bn: "৫০ বছর পেরোনোর পর চোখে স্বাভাবিক কিছু পরিবর্তন আসে। তবে গ্লুকোমা, ছানি বা ম্যাকুলার ডিজেনারেশনের মতো রোগগুলো আগেভাগে ধরা পড়লে দৃষ্টির স্থায়ী ক্ষতি সহজেই রোধ করা যায়।",
        },
      },
      {
        heading: { en: "The 4-Point Annual Assessment", bn: "বার্ষিক ৪টি মূল পরীক্ষা" },
        content: {
          en: "1. Comprehensive Dilated Fundus Exam: direct view of the retina and optic disc.\n2. Tonometry: measurement of intraocular pressure to rule out glaucoma.\n3. Slit-lamp biomicroscopy: grading cataract density.\n4. Amsler Grid screening: detecting subtle macular distortion.",
          bn: "১. পুতুল বড় করে ফান্ডাস পরীক্ষা: রেটিনা ও অপটিক নার্ভের স্বাস্থ্য সরাসরি দেখা।\n২. টোনোমেট্রি: চোখের ভেতরের প্রেশার মেপে গ্লুকোমা স্ক্রিনিং।\n৩. স্লিট-ল্যাম্প পরীক্ষা: ছানির স্তর ও কর্নিয়ার স্বচ্ছতা নির্ণয়।\n৪. অ্যামসলার গ্রিড: ম্যাকুলার সূক্ষ্ম বিকৃতি শনাক্তকরণ।",
        },
      },
    ],
  },
];
