export type Condition = {
  slug: string;
  name: { en: string; bn: string };
  tier: "Core" | "Secondary";
  category: { en: string; bn: string };
  image: string;
  whatIsIt: { en: string; bn: string };
  whyItHappens: { en: string; bn: string };
  howTreated: { en: string; bn: string };
  emergencyNote?: { en: string; bn: string };
  relatedServiceSlug: string;
  tags: { en: string[]; bn: string[] };
};

export const conditions: Condition[] = [
  {
    slug: "cataract",
    name: { en: "Cataract", bn: "ছানি" },
    tier: "Core",
    category: { en: "Cataract & Lens", bn: "ছানি ও লেন্স" },
    image: "/images/2. Conditions_Images/1. Cataract.png",
    tags: {
      en: ["Blurry vision", "Faded colors", "Night glare"],
      bn: ["ঝাপসা দৃষ্টি", "ফিকে রং", "রাতে আলোয় ধাঁধা"],
    },
    whatIsIt: {
      en: "A cataract is a clouding of the eye's natural lens, which normally is clear. As it clouds, light can't pass through properly, and vision gradually becomes blurry, dim, or hazy — like looking through a foggy window.",
      bn: "ছানি হলো চোখের প্রাকৃতিক লেন্স, যা স্বাভাবিকভাবে স্বচ্ছ থাকার কথা, ধীরে ধীরে ঘোলাটে হয়ে যাওয়া। লেন্স ঘোলা হলে আলো ঠিকমতো ভেতরে যেতে পারে না, ফলে দৃষ্টি ধীরে ধীরে ঝাপসা, ম্লান বা কুয়াশাচ্ছন্ন হয়ে যায় — অনেকটা কুয়াশা ভরা জানালা দিয়ে দেখার মতো।",
    },
    whyItHappens: {
      en: "Most commonly, aging. Other contributors include diabetes, long-term steroid use, previous eye injury, and prolonged UV exposure. It's the most common cause of treatable vision loss in adults.",
      bn: "সবচেয়ে বড় কারণ বয়স বাড়া। এছাড়া ডায়াবেটিস, দীর্ঘদিন স্টেরয়েড ব্যবহার, আগে চোখে আঘাত, বা দীর্ঘদিন রোদে থাকাও কারণ হতে পারে। প্রাপ্তবয়স্কদের চিকিৎসাযোগ্য দৃষ্টিহীনতার সবচেয়ে সাধারণ কারণ এটি।",
    },
    howTreated: {
      en: "Cataracts don't respond to eye drops or glasses once they've progressed — the only effective treatment is surgical removal (phacoemulsification), replacing the clouded lens with a clear artificial one. It's a quick, well-established outpatient procedure.",
      bn: "ছানি একবার বেড়ে গেলে ড্রপ বা চশমা দিয়ে ঠিক হয় না — একমাত্র কার্যকর চিকিৎসা হলো সার্জারি করে ঘোলা লেন্স বদলে স্বচ্ছ কৃত্রিম লেন্স বসানো (ফ্যাকোইমালসিফিকেশন)। এটি একটি দ্রুত, সুপরিচিত ও নিরাপদ আউটপেশেন্ট পদ্ধতি।",
    },
    relatedServiceSlug: "cataract-surgery",
  },
  {
    slug: "diabetic-retinopathy",
    name: { en: "Diabetic Retinopathy", bn: "ডায়াবেটিক রেটিনোপ্যাথি" },
    tier: "Core",
    category: { en: "Retina & Vitreous", bn: "রেটিনা ও ভিট্রিয়াস" },
    image: "/images/2. Conditions_Images/2. Diabetic Retinopathy.png",
    tags: {
      en: ["Blood sugar", "Floaters", "Microaneurysms"],
      bn: ["ব্লাড সুগার", "কালো বিন্দু ভাসা", "রক্তনালীর ক্ষতি"],
    },
    whatIsIt: {
      en: "A complication of diabetes where high blood sugar damages the tiny blood vessels in the retina, causing them to leak, swell, or grow abnormally. Left untreated, it's a leading cause of blindness in working-age adults.",
      bn: "ডায়াবেটিসের একটি জটিলতা, যেখানে রক্তে অতিরিক্ত সুগার রেটিনার সূক্ষ্ম রক্তনালীগুলোর ক্ষতি করে — এগুলো থেকে রক্তরস চুইয়ে পড়ে, ফুলে যায়, বা অস্বাভাবিকভাবে বাড়তে থাকে। চিকিৎসা না করালে এটি কর্মক্ষম বয়সের মানুষদের দৃষ্টিহীনতার অন্যতম প্রধান কারণ।",
    },
    whyItHappens: {
      en: "Prolonged high blood sugar weakens retinal blood vessels over time. Risk increases the longer someone has had diabetes, and with poorly controlled blood sugar, blood pressure, or cholesterol.",
      bn: "দীর্ঘদিন ধরে রক্তে সুগার বেশি থাকলে রেটিনার রক্তনালী ধীরে ধীরে দুর্বল হয়ে যায়। যতদিন ধরে ডায়াবেটিস আছে এবং সুগার/প্রেসার/কোলেস্টেরল যত কম নিয়ন্ত্রণে থাকে, ঝুঁকি তত বাড়ে।",
    },
    howTreated: {
      en: "Early stages are monitored closely with regular retina exams. More advanced stages may need anti-VEGF injections, laser treatment, or vitrectomy surgery if there's bleeding or scar tissue affecting the retina. Early detection makes treatment far more effective.",
      bn: "প্রাথমিক পর্যায়ে নিয়মিত রেটিনা পরীক্ষার মাধ্যমে নজরে রাখা হয়। জটিল পর্যায়ে অ্যান্টি-ভিইজিএফ ইনজেকশন, লেজার চিকিৎসা, অথবা রক্তক্ষরণ বা দাগ টিস্যু হলে ভিট্রেক্টমি সার্জারি প্রয়োজন হতে পারে। লক্ষণ দেখা দেওয়ার আগেই ধরা পড়লে চিকিৎসা অনেক বেশি কার্যকর হয়।",
    },
    relatedServiceSlug: "diabetic-eye-care",
  },
  {
    slug: "retinal-detachment",
    name: { en: "Retinal Detachment", bn: "রেটিনা বিচ্ছিন্নতা" },
    tier: "Core",
    category: { en: "Retina & Vitreous", bn: "রেটিনা ও ভিট্রিয়াস" },
    image: "/images/2. Conditions_Images/3. Retinal Detachment.png",
    tags: {
      en: ["Emergency", "Light flashes", "Shadow curtain"],
      bn: ["জরুরি অবস্থা", "আলোর ঝলকানি", "দৃষ্টিতে ছায়া"],
    },
    whatIsIt: {
      en: "A medical emergency where the retina pulls away from the back wall of the eye, cutting off its blood and oxygen supply. Without prompt treatment, it causes permanent vision loss in the affected area.",
      bn: "এটি একটি মেডিকেল ইমার্জেন্সি, যেখানে রেটিনা চোখের পেছনের দেয়াল থেকে সরে যায়, ফলে তার রক্ত ও অক্সিজেন সরবরাহ বন্ধ হয়ে যায়। দ্রুত চিকিৎসা না হলে ওই অংশে দৃষ্টি স্থায়ীভাবে হারিয়ে যায়।",
    },
    whyItHappens: {
      en: "Most often from a retinal tear that lets fluid seep underneath the retina, or from severe injury, high myopia, or complications after other eye surgery.",
      bn: "সবচেয়ে বেশি হয় রেটিনায় ছিদ্র/ছিঁড়ে যাওয়া থেকে, যার ফলে তরল রেটিনার নিচে ঢুকে যায়। এছাড়া গুরুতর আঘাত, উচ্চমাত্রার মায়োপিয়া, বা অন্য চোখের সার্জারির পর জটিলতা থেকেও হতে পারে।",
    },
    howTreated: {
      en: "Surgery is required and time-sensitive — pars plana vitrectomy, scleral buckle, or pneumatic retinopexy, depending on the type and location of the detachment. The earlier it's treated, the better the chance of restoring useful vision.",
      bn: "সার্জারি প্রয়োজন এবং সেটা দ্রুত করাতে হয় — পার্স প্লানা ভিট্রেক্টমি, স্কেরাল বাকল, বা নিউম্যাটিক রেটিনোপেক্সি, বিচ্ছিন্নতার ধরন ও অবস্থান অনুযায়ী। যত দ্রুত চিকিৎসা হয়, দৃষ্টি ফিরে পাওয়ার সম্ভাবনা তত বেশি।",
    },
    emergencyNote: {
      en: "Sudden flashes of light, a shower of new floaters, or a shadow/curtain moving across your vision are warning signs — contact the practice immediately, don't wait for an appointment.",
      bn: "হঠাৎ চোখে আলোর ঝলকানি, অনেকগুলো নতুন কালো বিন্দু ভাসতে দেখা, বা দৃষ্টির কোনো অংশে পর্দার মতো ছায়া নড়াচড়া করা — এগুলো বিপদের লক্ষণ। অ্যাপয়েন্টমেন্টের জন্য অপেক্ষা না করে সাথে সাথে যোগাযোগ করুন।",
    },
    relatedServiceSlug: "vitreoretinal-surgery",
  },
  {
    slug: "macular-disease-cscr",
    name: { en: "Macular Problems / CSCR", bn: "ম্যাকুলার সমস্যা (CSCR সহ)" },
    tier: "Core",
    category: { en: "Retina & Vitreous", bn: "রেটিনা ও ভিট্রিয়াস" },
    image: "/images/2. Conditions_Images/4. Macular Disease.png",
    tags: {
      en: ["Central vision", "CSCR", "Distorted lines"],
      bn: ["কেন্দ্রীয় দৃষ্টি", "সিএসআর", "বাঁকা রেখা দেখা"],
    },
    whatIsIt: {
      en: "The macula is the small central part of the retina responsible for sharp, detailed vision — reading, recognizing faces, driving. Problems here affect central vision specifically. Central Serous Chorioretinopathy (CSCR) is one common condition where fluid builds up under the macula.",
      bn: "ম্যাকুলা হলো রেটিনার ছোট্ট কেন্দ্রীয় অংশ, যা স্পষ্ট ও সূক্ষ্ম দৃষ্টির জন্য দায়ী — পড়া, মুখ চেনা, গাড়ি চালানো। এখানে সমস্যা হলে মূলত সরাসরি সামনের দৃষ্টি প্রভাবিত হয়। সেন্ট্রাল সেরাস কোরিওরেটিনোপ্যাথি (CSCR) এমনই একটি সাধারণ সমস্যা, যেখানে ম্যাকুলার নিচে তরল জমে যায়।",
    },
    whyItHappens: {
      en: "Age-related changes, stress, steroid use, and high blood pressure are linked to macular problems. CSCR is notably common in stressed, otherwise-healthy young to middle-aged adults.",
      bn: "বয়সজনিত পরিবর্তন, মানসিক চাপ, স্টেরয়েড ব্যবহার, আর উচ্চ রক্তচাপ — এসবের সাথে ম্যাকুলার সমস্যার সম্পর্ক আছে, বিশেষ করে CSCR প্রায়ই দেখা যায় মানসিক চাপে থাকা অন্যথায় সুস্থ তরুণ-মধ্যবয়সীদের মধ্যে।",
    },
    howTreated: {
      en: "Many CSCR cases resolve with monitoring and stress/steroid management. Persistent or recurrent cases may need laser treatment or targeted injections. Other macular conditions are evaluated individually with retinal imaging.",
      bn: "অনেক CSCR কেস নিয়মিত পর্যবেক্ষণ ও মানসিক চাপ/স্টেরয়েড নিয়ন্ত্রণের মাধ্যমেই নিজে থেকে সেরে যায়। বারবার হতে থাকলে লেজার চিকিৎসা বা নির্দিষ্ট ইনজেকশন লাগতে পারে। অন্যান্য ম্যাকুলার সমস্যা রেটিনা ইমেজিং করে নির্ধারণ করা হয়।",
    },
    relatedServiceSlug: "vitreoretinal-surgery",
  },
  {
    slug: "crvo-brvo",
    name: { en: "Retinal Vein Occlusion (CRVO / BRVO)", bn: "রেটিনার শিরা বন্ধ (CRVO / BRVO)" },
    tier: "Core",
    category: { en: "Retina & Vitreous", bn: "রেটিনা ও ভিট্রিয়াস" },
    image: "/images/2. Conditions_Images/5. CRVO _ BRVO (Retinal Vein Occlusion).png",
    tags: {
      en: ["Vascular block", "Painless blur", "Hypertension"],
      bn: ["রক্তনালী ব্লকেজ", "ব্যথাহীন ঝাপসা", "উচ্চ রক্তচাপ"],
    },
    whatIsIt: {
      en: "A blockage in one of the veins carrying blood away from the retina — central (CRVO) if the main vein is blocked, or branch (BRVO) if a smaller branch is affected. This causes blood and fluid to leak into the retina, often causing sudden, painless blurring.",
      bn: "রেটিনা থেকে রক্ত বহনকারী শিরাগুলোর একটিতে ব্লকেজ — মূল শিরা বন্ধ হলে সেন্ট্রাল (CRVO), আর একটি শাখা বন্ধ হলে ব্রাঞ্চ (BRVO)। এর ফলে রক্ত ও তরল রেটিনায় চুইয়ে পড়ে, প্রায়ই হঠাৎ ব্যথাহীনভাবে দৃষ্টি ঝাপসা হয়ে যায়।",
    },
    whyItHappens: {
      en: "Strongly linked to high blood pressure, diabetes, high cholesterol, and glaucoma. It's more common with age and in people with cardiovascular risk factors.",
      bn: "উচ্চ রক্তচাপ, ডায়াবেটিস, উচ্চ কোলেস্টেরল আর গ্লুকোমার সাথে এর গভীর সম্পর্ক আছে। বয়স বাড়ার সাথে এবং হৃদরোগের ঝুঁকি থাকা মানুষদের মধ্যে এটি বেশি দেখা যায়।",
    },
    howTreated: {
      en: "Treatment focuses on reducing swelling and preventing complications — anti-VEGF injections are primary, sometimes combined with laser therapy. Managing blood pressure and diabetes is just as important as eye care.",
      bn: "ফোলাভাব কমানো আর জটিলতা ঠেকানোই মূল লক্ষ্য — অ্যান্টি-ভিইজিএফ ইনজেকশনই প্রধান চিকিৎসা, কখনো কখনো লেজার থেরাপির সাথে মিলিয়ে। চোখের চিকিৎসার পাশাপাশি রক্তচাপ ও ডায়াবেটিস নিয়ন্ত্রণ করা সমান গুরুত্বপূর্ণ।",
    },
    relatedServiceSlug: "vitreoretinal-surgery",
  },
  {
    slug: "vitreous-hemorrhage",
    name: { en: "Vitreous Hemorrhage", bn: "ভিট্রিয়াস হেমোরেজ (চোখের ভেতরে রক্তক্ষরণ)" },
    tier: "Core",
    category: { en: "Retina & Vitreous", bn: "রেটিনা ও ভিট্রিয়াস" },
    image: "/images/2. Conditions_Images/6. Vitreous Hemorrhage.png",
    tags: {
      en: ["Internal bleeding", "Sudden darkness", "Vitrectomy"],
      bn: ["অভ্যন্তরীণ রক্তক্ষরণ", "হঠাৎ অন্ধকার", "ভিট্রেক্টমি"],
    },
    whatIsIt: {
      en: "Bleeding into the vitreous — the clear gel that fills the eye — which blocks light from reaching the retina, causing sudden blurred vision, new floaters, or in severe cases, near-total vision loss in that eye.",
      bn: "চোখের ভেতরের স্বচ্ছ জেল (ভিট্রিয়াস)-এর মধ্যে রক্তক্ষরণ, যা আলোকে রেটিনা পর্যন্ত পৌঁছাতে বাধা দেয় — ফলে হঠাৎ দৃষ্টি ঝাপসা হয়ে যাওয়া, নতুন কালো বিন্দু ভাসতে দেখা, বা গুরুতর ক্ষেত্রে সেই চোখে প্রায় সম্পূর্ণ দৃষ্টি হারানো।",
    },
    whyItHappens: {
      en: "Most commonly from diabetic retinopathy, retinal tears or detachment, or trauma. Less commonly from blood vessel abnormalities or clotting disorders.",
      bn: "সবচেয়ে বেশি হয় ডায়াবেটিক রেটিনোপ্যাথি থেকে (অস্বাভাবিক রক্তনালী থেকে রক্তক্ষরণ), রেটিনা ছিঁড়ে যাওয়া বা বিচ্ছিন্ন হওয়া থেকে, অথবা আঘাত থেকে। কম ক্ষেত্রে রক্তনালীর সমস্যা থেকেও হতে পারে।",
    },
    howTreated: {
      en: "Small hemorrhages often clear on their own with monitoring. Larger or persistent hemorrhages — especially when a retinal tear needs to be repaired — require pars plana vitrectomy to clear the blood and fix the retina.",
      bn: "ছোটখাটো রক্তক্ষরণ প্রায়ই পর্যবেক্ষণের মধ্যেই নিজে থেকে সেরে যায়। বড় বা দীর্ঘস্থায়ী রক্তক্ষরণে — বিশেষ করে যখন মূল কারণ (যেমন রেটিনা ছিঁড়ে যাওয়া) খুঁজে চিকিৎসা করা দরকার — পার্স প্লানা ভিট্রেক্টমি করে রক্ত পরিষ্কার করতে হয়।",
    },
    relatedServiceSlug: "vitreoretinal-surgery",
  },
  {
    slug: "rop",
    name: { en: "Retinopathy of Prematurity (ROP)", bn: "নবজাতকের রেটিনা সমস্যা (ROP)" },
    tier: "Core",
    category: { en: "Pediatric & Strabismus", bn: "শিশুর চোখ ও স্কুইন্ট" },
    image: "/images/2. Conditions_Images/7. Retinopathy of Prematurity (ROP).png",
    tags: {
      en: ["Premature infants", "NICU screening", "Time-critical"],
      bn: ["অপরিণত নবজাতক", "এনআইসিইউ স্ক্রিনিং", "সময়-সংবেদনশীল"],
    },
    whatIsIt: {
      en: "Abnormal blood vessel growth in the retina of premature babies, whose eyes haven't finished developing at birth. In severe cases, it can lead to retinal detachment and permanent blindness if untreated.",
      bn: "অপরিণত অবস্থায় জন্ম নেওয়া শিশুদের রেটিনায় অস্বাভাবিক রক্তনালী বৃদ্ধি, যাদের চোখ জন্মের সময় পুরোপুরি গঠিত হয়নি। গুরুতর ক্ষেত্রে চিকিৎসা না করালে রেটিনা বিচ্ছিন্ন হয়ে স্থায়ী দৃষ্টিহীনতা হতে পারে।",
    },
    whyItHappens: {
      en: "Retinal blood vessels finish developing near full-term. Babies born before 34 weeks or under 2000 grams have incompletely developed vessels that may grow abnormally under oxygen therapy and other stressors.",
      bn: "রেটিনার রক্তনালী সাধারণত পূর্ণ গর্ভকালীন সময়ের কাছাকাছি গিয়ে গঠন সম্পূর্ণ হয়। আগেভাগে জন্ম নেওয়া — বিশেষ করে ৩৪ সপ্তাহের আগে বা খুব কম ওজনে — শিশুদের রেটিনার রক্তনালী অসম্পূর্ণ থাকে, যা পরে অস্বাভাবিকভাবে বাড়তে পারে।",
    },
    howTreated: {
      en: "Screening starts in the first 3–4 weeks for at-risk infants. Treatments include regular monitoring, laser photocoagulation, anti-VEGF injections, or vitrectomy surgery in advanced stages.",
      bn: "ঝুঁকিপূর্ণ শিশুদের জন্মের প্রথম কয়েক সপ্তাহের মধ্যেই স্ক্রিনিং শুরু হয়। তীব্রতা অনুযায়ী চিকিৎসা: নিয়মিত পর্যবেক্ষণ, রেটিনায় লেজার চিকিৎসা, অ্যান্টি-ভিইজিএফ ইনজেকশন, অথবা জটিল ক্ষেত্রে সার্জারি।",
    },
    relatedServiceSlug: "rop-care",
  },
  {
    slug: "refractive-error",
    name: { en: "Refractive Error (Myopia, Hyperopia, Astigmatism)", bn: "রিফ্র্যাক্টিভ এরর (পাওয়ার সমস্যা)" },
    tier: "Core",
    category: { en: "Refractive & Cornea", bn: "রিফ্র্যাক্টিভ ও কর্নিয়া" },
    image: "/images/2. Conditions_Images/8. Refractive Error.png",
    tags: {
      en: ["Myopia", "LASIK", "Glasses free"],
      bn: ["মায়োপিয়া", "লেসিক", "চশমামুক্ত জীবন"],
    },
    whatIsIt: {
      en: "The eye's inability to focus light precisely on the retina, causing blurred vision at certain distances. Myopia (nearsightedness), hyperopia (farsightedness), and astigmatism (irregular curvature) are the main types.",
      bn: "চোখের আলোকে রেটিনায় ঠিকভাবে ফোকাস করতে না পারা, যার ফলে নির্দিষ্ট দূরত্বে দৃষ্টি ঝাপসা হয়ে যায়। মায়োপিয়া (কাছের জিনিস স্পষ্ট, দূরের ঝাপসা), হাইপারমেট্রোপিয়া (দূরের স্পষ্ট, কাছের ঝাপসা), আর অ্যাস্টিগমাটিজম প্রধান তিন ধরন।",
    },
    whyItHappens: {
      en: "Largely genetic, but also influenced by excessive close screen/reading time during childhood and corneal or eyeball shape variations.",
      bn: "মূলত বংশগত, তবে ছোটবেলা থেকে বেশি স্ক্রিন টাইম বা কাছে থেকে পড়াশোনার প্রভাবও আছে। চোখের গোলকের আকৃতি বা কর্নিয়ার বক্রতা আলোকে রেটিনায় ঠিকমতো ফোকাস করতে পারে না।",
    },
    howTreated: {
      en: "Glasses and contact lenses correct it non-surgically. For permanent freedom from glasses, refractive surgery (LASIK, PRK, SMILE, or ICL) reshapes the cornea or implants a corrective lens.",
      bn: "চশমা বা লেন্স দিয়ে অস্ত্রোপচার ছাড়াই এটি ঠিক করা যায়। যারা এই নির্ভরতা কমাতে বা দূর করতে চান, তাদের জন্য রিফ্র্যাক্টিভ সার্জারি (লেসিক, পিআরকে, বা স্মাইল) কর্নিয়ার আকৃতি স্থায়ীভাবে পরিবর্তন করে দেয়।",
    },
    relatedServiceSlug: "refractive-surgery",
  },
  {
    slug: "dislocated-lens",
    name: { en: "Dislocated Lens & Scleral-Fixated IOL", bn: "ডিসলোকেটেড লেন্স ও স্কেরাল ফিক্সেটেড IOL" },
    tier: "Core",
    category: { en: "Cataract & Lens", bn: "ছানি ও লেন্স" },
    image: "/images/2. Conditions_Images/9. Dislocated Lens.png",
    tags: {
      en: ["IOL dislocation", "Yamane technique", "Trauma"],
      bn: ["লেন্স সরে যাওয়া", "ইয়ামানে পদ্ধতি", "চোখে আঘাত"],
    },
    whatIsIt: {
      en: "When an artificial lens (IOL) placed during previous cataract surgery — or the eye's natural lens — shifts out of position or falls into the back of the eye, vision becomes suddenly blurred or doubled.",
      bn: "আগের ছানি অপারেশনে বসানো কৃত্রিম লেন্স (IOL) — অথবা চোখের নিজের লেন্স — যদি জায়গা থেকে সরে যায় বা চোখের পেছনে পড়ে যায়, তাহলে হঠাৎ দৃষ্টি ঝাপসা বা দুটো করে দেখা যেতে পারে।",
    },
    whyItHappens: {
      en: "Weak support structures (zonules) from trauma, previous complex eye surgery, genetic conditions (like Marfan syndrome), or age-related weakening cause the lens to dislocate.",
      bn: "আঘাত, আগের চোখের সার্জারি, নির্দিষ্ট কিছু বংশগত সমস্যা, বা বয়সজনিত দুর্বলতার কারণে লেন্স ধরে রাখা সাপোর্ট (জোনিউল) দুর্বল হয়ে গেলে লেন্স অস্থির হয়ে সরে যেতে পারে।",
    },
    howTreated: {
      en: "The dislocated lens is repositioned or removed and replaced with a new one secured directly to the eye wall (sclera) using sutures or the modern sutureless Yamane technique.",
      bn: "সরে যাওয়া লেন্স আবার জায়গামতো বসানো হয় বা বদলে নতুন একটা লেন্স চোখের দেয়ালে (স্কেরা) সরাসরি সেলাই বা সেলাইবিহীন আধুনিক ইয়ামানে টেকনিকে স্থাপন করা হয়।",
    },
    relatedServiceSlug: "cataract-surgery",
  },
  {
    slug: "ptosis",
    name: { en: "Ptosis (Drooping Eyelid)", bn: "পিটোসিস (চোখের পাতা ঝুলে পড়া)" },
    tier: "Core",
    category: { en: "Oculoplasty & Orbit", bn: "অকুলোপ্লাস্টি ও অরবিট" },
    image: "/images/2. Conditions_Images/10. Ptosis.png",
    tags: {
      en: ["Drooping lid", "Levator muscle", "Day surgery"],
      bn: ["পাতা ঝুলে পড়া", "লিভেটর পেশি", "ডে সার্জারি"],
    },
    whatIsIt: {
      en: "The drooping of the upper eyelid, which can be mild (a cosmetic concern) or severe enough to block part of the pupil and obstruct vision.",
      bn: "উপরের চোখের পাতা ঝুলে পড়া, যা হালকা (শুধু চেহারার সমস্যা) থেকে শুরু করে দৃষ্টির কিছু অংশ ঢেকে ফেলার মতো গুরুতরও হতে পারে।",
    },
    whyItHappens: {
      en: "Most often age-related weakening of the eyelid-lifting muscle (levator), but can also be congenital, caused by nerve problems, eye trauma, or previous eye surgery.",
      bn: "সবচেয়ে বেশি হয় বয়সের সাথে পাতা তোলার পেশি দুর্বল হয়ে যাওয়ার কারণে, তবে জন্ম থেকেও থাকতে পারে, অথবা স্নায়ুর সমস্যা, চোখে আঘাত, বা আগের সার্জারির কারণেও হতে পারে।",
    },
    howTreated: {
      en: "Surgical correction tightens or reattaches the muscle responsible for lifting the eyelid, restoring both normal appearance and unobstructed field of vision. Done under local anesthesia.",
      bn: "সার্জারি করে পাতা তোলার জন্য দায়ী পেশি টানটান বা পুনঃসংযুক্ত করা হয়, যাতে চেহারা স্বাভাবিক হয় আর বাধাহীন দৃষ্টি ফিরে আসে। এটি স্থানীয় অ্যানেস্থেসিয়ায় দ্রুত করা হয়।",
    },
    relatedServiceSlug: "oculoplasty",
  },
  {
    slug: "pterygium",
    name: { en: "Pterygium (Surfer's Eye)", bn: "পিটেরিজিয়াম (মাংসবৃদ্ধি)" },
    tier: "Core",
    category: { en: "Cornea & Surface", bn: "কর্নিয়া ও উপরিভাগ" },
    image: "/images/2. Conditions_Images/11. Pterygium.png",
    tags: {
      en: ["Fleshy growth", "UV exposure", "Conjunctival graft"],
      bn: ["মাংসল বৃদ্ধি", "রোদের ক্ষতি", "কনজাংটিভাল গ্রাফট"],
    },
    whatIsIt: {
      en: "A fleshy, triangular growth of tissue on the white of the eye that can extend onto the cornea. Common in people with significant outdoor sun and wind exposure.",
      bn: "চোখের সাদা অংশে মাংসল, ত্রিভুজাকার একটা টিস্যুর বৃদ্ধি, যা কর্নিয়া পর্যন্ত বিস্তৃত হতে পারে। যারা বেশি রোদে বাইরে কাজ করেন তাদের মধ্যে বেশি দেখা যায়।",
    },
    whyItHappens: {
      en: "Long-term ultraviolet (UV) radiation, wind, and dust exposure — common among farmers, outdoor workers, and drivers.",
      bn: "দীর্ঘদিন সূর্যের অতিবেগুনি রশ্মি, বাতাস ও ধুলাবালির সংস্পর্শ — কৃষি, মাছ ধরা, পরিবহন বা নির্মাণ কাজের সাথে যুক্ত মানুষদের মধ্যে বেশি দেখা যায়।",
    },
    howTreated: {
      en: "Small growths may just need lubricant drops and sunglasses. Growths causing irritation or approaching the visual axis are removed surgically with an autograft to prevent recurrence.",
      bn: "ছোট পিটেরিজিয়াম শুধু পর্যবেক্ষণ আর সুরক্ষামূলক চশমা দিয়েই সামলানো যায়। দৃষ্টিতে প্রভাব ফেললে সার্জারি করে অপসারণ করা হয় এবং কনজাংটিভাল গ্রাফট দেওয়া হয় যাতে পুনরায় না হয়।",
    },
    relatedServiceSlug: "pterygium-surgery",
  },
  {
    slug: "thyroid-eye-disease",
    name: { en: "Thyroid Eye Disease & Orbital Disorders", bn: "থাইরয়েড আই ডিজিজ ও অরবিটাল সমস্যা" },
    tier: "Core",
    category: { en: "Oculoplasty & Orbit", bn: "অকুলোপ্লাস্টি ও অরবিট" },
    image: "/images/2. Conditions_Images/12. Thyroid Eye Disease.png",
    tags: {
      en: ["Bulging eyes", "Graves disease", "Diplopia"],
      bn: ["চোখ বেরিয়ে আসা", "গ্রেভস ডিজিজ", "দুটো দেখা"],
    },
    whatIsIt: {
      en: "An autoimmune condition where immune cells attack fat and muscle tissue around the eyes, causing bulging eyes (proptosis), eyelid retraction, dry eye, or double vision.",
      bn: "একটি অবস্থা যেখানে ইমিউন সিস্টেম চোখের চারপাশের টিস্যুতে আক্রমণ করে — এর ফলে চোখ ফুলে বেরিয়ে আসা (প্রোপটোসিস), পাতা পিছিয়ে যাওয়া, দুটো করে দেখা, বা অপটিক নার্ভে চাপ পড়তে পারে।",
    },
    whyItHappens: {
      en: "Most commonly associated with hyperthyroidism (Graves' disease), though it can occur in individuals with normal or low thyroid levels as well.",
      bn: "সবচেয়ে বেশি সম্পর্কিত অতি সক্রিয় থাইরয়েডের (গ্রেভস ডিজিজ) সাথে, যদিও স্বাভাবিক বা কম সক্রিয় থাইরয়েড থাকলেও হতে পারে। এটি একটি অটোইমিউন প্রক্রিয়া।",
    },
    howTreated: {
      en: "Managed in phases: artificial tears and monitoring in mild cases, steroids or immunomodulators during active inflammation, and surgical rehabilitation (decompression, lid surgery) once stable.",
      bn: "তীব্রতা অনুযায়ী চিকিৎসা: লুব্রিকেটিং ড্রপ থেকে শুরু করে সক্রিয় অবস্থায় স্টেরয়েড ওষুধ, আর রোগ স্থিতিশীল হওয়ার পর প্রয়োজনে সার্জারি (অরবিটাল ডিকম্প্রেশন বা পাতা মেরামত)।",
    },
    relatedServiceSlug: "oculoplasty",
  },
  {
    slug: "dry-eye",
    name: { en: "Dry Eye & Corneal Ulcer", bn: "ড্রাই আই ও কর্নিয়াল আলসার" },
    tier: "Core",
    category: { en: "Cornea & Surface", bn: "কর্নিয়া ও উপরিভাগ" },
    image: "/images/2. Conditions_Images/13. Dry Eye_ Corneal Ulcer.png",
    tags: {
      en: ["Grittiness", "Burning", "Corneal infection"],
      bn: ["খচখচে ভাব", "জ্বালাপোড়া", "কর্নিয়ার ঘা"],
    },
    whatIsIt: {
      en: "Dry eye happens when the eye produces insufficient or poor-quality tears to stay lubricated. A corneal ulcer is a serious open sore on the cornea, usually from infection, requiring urgent care.",
      bn: "চোখ যথেষ্ট মানসম্পন্ন অশ্রু তৈরি করতে না পারলে ড্রাই আই হয়, যার ফলে জ্বালাপোড়া বা ঝাপসা দৃষ্টি হয়। কর্নিয়াল আলসার হলো কর্নিয়ায় সংক্রমণজনিত একটা খোলা ঘা, যার জরুরি চিকিৎসা দরকার।",
    },
    whyItHappens: {
      en: "Dry eye is worsened by screen time, AC, contact lenses, and age. Corneal ulcers usually follow an untreated corneal scratch, poor lens hygiene, or bacterial/fungal infections.",
      bn: "দীর্ঘ স্ক্রিন টাইম, এসি, লেন্স ব্যবহার, আর বয়সের কারণে ড্রাই আই বাড়ে। কর্নিয়াল আলসার সাধারণত চিকিৎসা না করা আঁচড়, লেন্সের ভুল ব্যবহার, বা সংক্রমণ থেকে হয়।",
    },
    howTreated: {
      en: "Dry eye is treated with preservative-free tears, lifestyle adjustments, and punctal plugs if needed. Corneal ulcers need immediate intensive antimicrobial drops to prevent corneal scarring and vision loss.",
      bn: "ড্রাই আই সামলানো হয় লুব্রিকেটিং ড্রপ ও জীবনযাত্রার পরিবর্তন দিয়ে। কর্নিয়াল আলসারে দ্রুত অ্যান্টিবায়োটিক বা অ্যান্টিফাঙ্গাল চিকিৎসা দরকার — দেরি করলে স্থায়ী দাগের ঝুঁকি থাকে।",
    },
    relatedServiceSlug: "dry-eye-corneal-disease",
  },
  {
    slug: "squint",
    name: { en: "Squint (Strabismus)", bn: "স্কুইন্ট বা ট্যারা চোখ (স্ট্র্যাবিজমাস)" },
    tier: "Core",
    category: { en: "Pediatric & Strabismus", bn: "শিশুর চোখ ও স্কুইন্ট" },
    image: "/images/2. Conditions_Images/14. Squint (Strabismus).png",
    tags: {
      en: ["Misalignment", "Binocular vision", "Muscle surgery"],
      bn: ["ট্যারা চোখ", "বাইনোকুলার দৃষ্টি", "পেশি সার্জারি"],
    },
    whatIsIt: {
      en: "A misalignment of the eyes where they do not look in the same direction simultaneously. One eye may turn inwards (esotropia), outwards (exotropia), upwards, or downwards.",
      bn: "দুই চোখ একসাথে একই দিকে না তাকানো — একটা বা দুটো চোখ ভেতরে, বাইরে, ওপরে, বা নিচে বেঁকে যেতে পারে।",
    },
    whyItHappens: {
      en: "Can be present from infancy or develop due to muscle imbalance, nerve dysfunction, uncorrected high refractive errors, or other underlying conditions.",
      bn: "জন্ম থেকে থাকতে পারে, অথবা পেশির ভারসাম্যহীনতা, স্নায়ুর সমস্যা, চিকিৎসা না করা চোখের পাওয়ার সমস্যা, বা অন্য কোনো চোখের সমস্যার কারণে হতে পারে।",
    },
    howTreated: {
      en: "Treatment may include corrective glasses, orthoptic eye exercises, patching therapy for lazy eye (amblyopia), or precision surgery to tighten or loosen eye muscles for proper alignment.",
      bn: "কারণ ও তীব্রতা অনুযায়ী — পাওয়ার সমস্যা থাকলে চশমা, চোখের ব্যায়াম, অথবা চোখ নড়াচড়ার পেশি সমন্বয় করতে সার্জারি — যা চোখ সমান্তরাল করে ও দুই চোখ একসাথে দেখার ক্ষমতা ফিরিয়ে আনে।",
    },
    relatedServiceSlug: "squint-surgery",
  },
  {
    slug: "eye-tumors",
    name: { en: "Eye Tumors & Eyelid Growths", bn: "চোখের টিউমার ও পাতার বৃদ্ধি" },
    tier: "Core",
    category: { en: "Oculoplasty & Orbit", bn: "অকুলোপ্লাস্টি ও অরবিট" },
    image: "/images/2. Conditions_Images/15. Eye Tumors _ Lid Tumors.png",
    tags: {
      en: ["Eyelid nodule", "Biopsy", "Reconstruction"],
      bn: ["পাতায় মাংসপিণ্ড", "বায়োপসি", "রিকনস্ট্রাকশন"],
    },
    whatIsIt: {
      en: "Lumps or growths on the eyelids, conjunctiva, or orbit. Most are benign cysts or chalazions, but some require careful clinical evaluation and biopsy to rule out malignancy.",
      bn: "চোখে বা তার পাতায় একটা বৃদ্ধি — বেশিরভাগই সৌম্য (যেমন চ্যালাজিয়ন বা সাধারণ পাতার ফোলা), তবে কিছু ক্ষেত্রে পরীক্ষা করে ম্যালিগন্যান্সি (ক্যান্সার) বাদ দিতে হয়।",
    },
    whyItHappens: {
      en: "Benign lesions often arise from blocked oil glands or chronic UV exposure. Malignant tumors share risks with other skin cancers: excessive sun exposure, age, and genetics.",
      bn: "সৌম্য বৃদ্ধি প্রায়ই বন্ধ গ্ল্যান্ড বা রোদের কারণে হয়। ম্যালিগন্যান্ট বৃদ্ধির ঝুঁকি রোদ, বয়স ও বংশগত বৈশিষ্ট্যের সাথে জড়িত।",
    },
    howTreated: {
      en: "Benign lesions are managed conservatively or excised for comfort. Suspicious growths undergo biopsy and complete surgical excision with reconstructive eyelid surgery.",
      bn: "ছোট সৌম্য বৃদ্ধি পর্যবেক্ষণ বা অপসারণ করা হয়। সন্দেহজনক বৃদ্ধি বায়োপসি করে সার্জারির মাধ্যমে অপসারণ ও পাতা পুনর্গঠন করা হয় যাতে স্বাভাবিক কাজ ও চেহারা অক্ষুণ্ন থাকে।",
    },
    relatedServiceSlug: "oculoplasty",
  },
  {
    slug: "glaucoma",
    name: { en: "Glaucoma", bn: "গ্লুকোমা (নীরব দৃষ্টিচোর)" },
    tier: "Secondary",
    category: { en: "Glaucoma", bn: "গ্লুকোমা" },
    image: "/images/2. Conditions_Images/16. Glaucoma.png",
    tags: {
      en: ["Silent thief", "Eye pressure", "Optic nerve"],
      bn: ["নীরব দৃষ্টিচোর", "চোখের প্রেসার", "অপটিক নার্ভ"],
    },
    whatIsIt: {
      en: "A group of eye conditions that damage the optic nerve, usually linked to elevated pressure inside the eye. It progresses slowly and painlessly without early warning signs.",
      bn: "একগুচ্ছ সমস্যা যা অপটিক নার্ভের ক্ষতি করে, সাধারণত চোখের ভেতরের চাপ বেড়ে যাওয়ার সাথে যুক্ত। এটি ধীরে ধীরে ও ব্যথাহীনভাবে দৃষ্টির ক্ষতি করে — তাই একে 'নীরব দৃষ্টিচোর' বলা হয়।",
    },
    whyItHappens: {
      en: "Fluid (aqueous humor) inside the anterior chamber drains too slowly, causing intraocular pressure to rise. Risk increases with age, family history, diabetes, and high myopia.",
      bn: "চোখের ভেতরের তরল ঠিকমতো নিষ্কাশন না হলে চাপ বেড়ে যায়। বয়স, পারিবারিক ইতিহাস, ডায়াবেটিস এবং উচ্চ পাওয়ারের সাথে ঝুঁকি বাড়ে।",
    },
    howTreated: {
      en: "Most cases are managed with pressure-lowering daily eye drops. In select cases, laser trabeculoplasty or filtration surgery (trabeculectomy) is performed to protect the optic nerve.",
      bn: "বেশিরভাগ ক্ষেত্রে প্রেসার কমানোর ড্রপ দিয়ে নিয়ন্ত্রণ করা যায়। নির্দিষ্ট কিছু ক্ষেত্রে লেজার চিকিৎসা বা সার্জারি (যেমন ট্র্যাবেকুলেক্টমি) প্রয়োজন হতে পারে। নিয়মিত চোখের প্রেসার চেক করা জরুরি।",
    },
    relatedServiceSlug: "glaucoma-management",
  },
];
