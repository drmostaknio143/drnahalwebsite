export type FAQItem = {
  id: string;
  category: { en: string; bn: string };
  question: { en: string; bn: string };
  answer: { en: string; bn: string };
};

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: { en: "Appointments & Visits", bn: "অ্যাপয়েন্টমেন্ট ও ভিজিট" },
    question: {
      en: "Do I need a referral to see Dr. Nahal?",
      bn: "ডা. নাহালকে দেখাতে কি রেফারেল লাগবে?",
    },
    answer: {
      en: "No referral is required. You can book directly by calling our serial number (01344-890335) or submitting an appointment request through our website.",
      bn: "না, কোনো রেফারেল লাগে না। সরাসরি আমাদের সিরিয়াল নম্বরে (০১৩৪৪-৮৯০৩৩৫) কল করে অথবা ওয়েবসাইটের মাধ্যমে অ্যাপয়েন্টমেন্টের অনুরোধ করতে পারেন।",
    },
  },
  {
    id: "faq-2",
    category: { en: "Cataract Surgery", bn: "ছানি অপারেশন" },
    question: {
      en: "How long does a cataract operation take?",
      bn: "ছানি অপারেশনে কতক্ষণ সময় লাগে?",
    },
    answer: {
      en: "The procedure itself typically takes 15–20 minutes per eye, though you should plan for a couple of hours at the hospital including pre-operative preparation and brief post-procedure observation.",
      bn: "প্রতি চোখে সার্জারিতে সাধারণত ১৫-২০ মিনিট লাগে, তবে পূর্বপ্রস্তুতি ও অপারেশন-পরবর্তী সংক্ষিপ্ত পর্যবেক্ষণসহ হাসপাতালে ২-৩ ঘণ্টা সময় হাতে রাখা ভালো।",
    },
  },
  {
    id: "faq-3",
    category: { en: "Cataract Surgery", bn: "ছানি অপারেশন" },
    question: {
      en: "Is cataract surgery painful?",
      bn: "ছানি অপারেশনে কি ব্যথা হয়?",
    },
    answer: {
      en: "No — advanced anesthetic eye drops are used so your eye is completely numb. Most patients report feeling only light fluid movement or mild pressure during the surgery, never sharp pain.",
      bn: "না — আধুনিক অ্যানেস্থেটিক ড্রপ ব্যবহার করা হয় যাতে চোখ অবশ থাকে। রোগীরা শুধু পানির মৃদু অনুভূতি বা হালকা চাপ টের পান, কোনো তীব্র ব্যথা নয়।",
    },
  },
  {
    id: "faq-4",
    category: { en: "Fees & Payment", bn: "খরচ ও ফি" },
    question: {
      en: "How much does treatment cost?",
      bn: "চিকিৎসার খরচ কেমন?",
    },
    answer: {
      en: "Consultation fees and surgical costs vary depending on the chamber location and the specific procedure/intraocular lens chosen. Please call or WhatsApp our team for up-to-date fees and transparent estimates.",
      bn: "চেম্বার এবং সুনির্দিষ্ট সার্জারি বা ব্যবহৃত কৃত্রিম লেন্সের ধরন অনুযায়ী খরচ ভিন্ন হয়। হালনাগাদ পরামর্শ ও অপারেশন ফি জানতে আমাদের কল বা হোয়াটসঅ্যাপ করুন।",
    },
  },
  {
    id: "faq-5",
    category: { en: "Chambers & Locations", bn: "চেম্বার ও সময়সূচি" },
    question: {
      en: "Which chamber should I visit?",
      bn: "কোন চেম্বারে যাব?",
    },
    answer: {
      en: "Any of the three locations — An Nahar Specialized Eye Hospital, Aristo Eye Hospital, or Enam Medical College Hospital. Choose whichever is most convenient for you in terms of location and days/hours.",
      bn: "তিনটি চেম্বারের যেকোনো একটিতে — আন নাহার স্পেশালাইজড আই হসপিটাল, এরিস্টো আই হসপিটাল, অথবা এনাম মেডিকেল কলেজ হাসপাতাল। অবস্থান ও সময়সূচি অনুযায়ী যেটি আপনার জন্য সবচেয়ে সুবিধাজনক সেটি বেছে নিন।",
    },
  },
  {
    id: "faq-6",
    category: { en: "Appointments & Visits", bn: "অ্যাপয়েন্টমেন্ট ও ভিজিট" },
    question: {
      en: "Can I walk in without an appointment?",
      bn: "অ্যাপয়েন্টমেন্ট ছাড়াই কি সরাসরি যাওয়া যায়?",
    },
    answer: {
      en: "Walk-in patients are accommodated when time permits, but booking ahead secures your serial number and minimizes your waiting time considerably.",
      bn: "সুযোগ থাকলে সরাসরি আসা রোগীদের দেখা হয়, তবে আগে থেকে সিরিয়াল নিশ্চিত করলে দীর্ঘ অপেক্ষার ঝামেলা অনেকটাই এড়ানো যায়।",
    },
  },
  {
    id: "faq-7",
    category: { en: "Pediatric & Specialty", bn: "শিশুর চোখ ও বিশেষ সেবা" },
    question: {
      en: "Do you treat children?",
      bn: "শিশুদের চিকিৎসা করা হয় কি?",
    },
    answer: {
      en: "Yes. Dr. Nahal provides specialized care for children, including premature infant Retinopathy of Prematurity (ROP) screening, pediatric cataract, and strabismus (squint) evaluation and surgical correction.",
      bn: "হ্যাঁ। ডা. নাহাল শিশুদের বিশেষায়িত চিকিৎসা দিয়ে থাকেন, যার মধ্যে অপরিণত নবজাতকের ROP স্ক্রিনিং, শিশুদের ছানি এবং ট্যারা চোখের (স্কুইন্ট) সার্জিক্যাল চিকিৎসা অন্তর্ভুক্ত।",
    },
  },
  {
    id: "faq-8",
    category: { en: "Cataract Surgery", bn: "ছানি অপারেশন" },
    question: {
      en: "How soon can I return to work after cataract surgery?",
      bn: "ছানি অপারেশনের পর কতদিনে কাজে ফেরা যায়?",
    },
    answer: {
      en: "Most patients can resume light daily activities and desk work within 3–7 days. Reading, watching TV, and light walking are fine almost immediately. Strenuous manual labor or dusty environments require about 2 weeks of precaution.",
      bn: "বেশিরভাগ রোগী ৩-৭ দিনের মধ্যে স্বাভাবিক কাজকর্ম ও অফিসে ফিরতে পারেন। টিভি দেখা বা বই পড়া সাথে সাথেই সম্ভব। তবে ভারী জিনিস তোলা ও ধুলাবালি থেকে অন্তত দুই সপ্তাহ সতর্কতা দরকার।",
    },
  },
  {
    id: "faq-9",
    category: { en: "Refractive Surgery", bn: "লেসিক ও রিফ্র্যাক্টিভ" },
    question: {
      en: "Am I a candidate for LASIK?",
      bn: "আমি কি লেসিকের জন্য উপযুক্ত?",
    },
    answer: {
      en: "Candidacy requires you to be at least 18 years old, have had a stable glasses prescription for at least a year, adequate corneal thickness, and no active ocular diseases. A dedicated pre-LASIK corneal scan confirms your eligibility.",
      bn: "লেসিকের জন্য বয়স কমপক্ষে ১৮ বছর হতে হবে, অন্তত এক বছর ধরে পাওয়ার অপরিবর্তিত থাকতে হবে, এবং কর্নিয়ার পুরুত্ব পর্যাপ্ত হতে হবে। বিস্তারিত প্রি-লেসিক স্ক্যান ও পরীক্ষার পরই এটি নিশ্চিত করা হয়।",
    },
  },
  {
    id: "faq-10",
    category: { en: "Appointments & Visits", bn: "অ্যাপয়েন্টমেন্ট ও ভিজিট" },
    question: {
      en: "What should I bring to my first visit?",
      bn: "প্রথম ভিজিটে কী নিয়ে আসব?",
    },
    answer: {
      en: "Please bring any previous eye prescriptions or test reports, your current eyeglasses, and a list of any ongoing medications or medical conditions (such as diabetes or high blood pressure).",
      bn: "আপনার পূর্বের কোনো চোখের প্রেসক্রিপশন বা টেস্টের রিপোর্ট, বর্তমান চশমা, এবং নিয়মিত খাওয়া ওষুধের তালিকা বা দীর্ঘস্থায়ী রোগের তথ্য (যেমন ডায়াবেটিস/প্রেসার) সাথে নিয়ে আসুন।",
    },
  },
  {
    id: "faq-11",
    category: { en: "Emergency Care", bn: "জরুরি সেবা" },
    question: {
      en: "Do you offer emergency consultations?",
      bn: "জরুরি পরামর্শ পাওয়া যায় কি?",
    },
    answer: {
      en: "Yes. For acute retinal emergencies — such as sudden painless vision loss, flashes of light, a dense shower of new floaters, or trauma — call 01344-890335 immediately for prioritized emergency guidance.",
      bn: "হ্যাঁ। রেটিনা-সংক্রান্ত জরুরি অবস্থা — যেমন হঠাৎ দৃষ্টি কমে যাওয়া, আলোর তীব্র ঝলকানি, একঝাঁক নতুন কালো বিন্দু ভাসা, বা চোখে আঘাতের ক্ষেত্রে সাধারণ বুকিংয়ের অপেক্ষা না করে অবিলম্বে ০১৩৪৪-৮৯০৩৩৫ নম্বরে কল করুন।",
    },
  },
  {
    id: "faq-12",
    category: { en: "Clinical Transparency", bn: "ভিডিও ও স্বচ্ছতা" },
    question: {
      en: "Is the video library real surgical footage?",
      bn: "ভিডিও লাইব্রেরির ভিডিওগুলো কি আসল রোগীর?",
    },
    answer: {
      en: "Yes. All video clips and reels feature actual surgical cases and patient education sessions conducted by Dr. Nahal, shared transparently to inform patients while strictly respecting patient privacy.",
      bn: "হ্যাঁ। ভিডিও লাইব্রেরির সমস্ত ক্লিপ ও রিল ডা. নাহালের নিজস্ব সার্জিক্যাল কেস ও রোগী পরামর্শের বাস্তব অংশ, যা সচেতনতা বৃদ্ধির লক্ষ্যে এবং রোগীর সর্বোচ্চ গোপনীয়তা রক্ষা করে শেয়ার করা হয়েছে।",
    },
  },
];
