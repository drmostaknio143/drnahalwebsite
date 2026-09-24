const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Read .env.local
const envPath = path.resolve(__dirname, '../.env.local');
const env = fs.readFileSync(envPath, 'utf-8');
let url = '', key = '';
for (const line of env.split('\n')) {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].trim();
}

const supabase = createClient(url, key);

// Import static data
// We can define the comprehensive data directly to ensure clean JSON format
const gallerySeed = [
  {
    src: '/images/hero/seq-1.jpeg',
    category: 'Chambers',
    caption_en: 'Consultation chamber at An Nahar Specialized Eye Hospital',
    caption_bn: 'আন নাহার স্পেশালাইজড আই হসপিটালের কনসাল্টেশন চেম্বার',
    chamber_name_en: 'An Nahar Specialized Eye Hospital',
    chamber_name_bn: 'আন নাহার স্পেশালাইজড আই হসপিটাল',
    order_index: 1,
    is_published: true,
  },
  {
    src: '/images/hero/seq-2.jpeg',
    category: 'Equipment',
    caption_en: 'High-resolution Optical Coherence Tomography (OCT) retinal scanner',
    caption_bn: 'উচ্চ ক্ষমতাসম্পন্ন অপটিক্যাল কোহেরেন্স টমোগ্রাফি (OCT) রেটিনা স্ক্যানার',
    chamber_name_en: null,
    chamber_name_bn: null,
    order_index: 2,
    is_published: true,
  },
  {
    src: '/images/hero/seq-3.jpeg',
    category: 'Chambers',
    caption_en: 'Clinical slit-lamp examination & anterior segment assessment',
    caption_bn: 'স্লিট-ল্যাম্পের মাধ্যমে চোখের গভীর পরীক্ষা ও মূল্যায়ন',
    chamber_name_en: 'Enam Medical College Hospital',
    chamber_name_bn: 'এনাম মেডিকেল কলেজ হাসপাতাল',
    order_index: 3,
    is_published: true,
  },
  {
    src: '/images/hero/seq-4.jpeg',
    category: 'Equipment',
    caption_en: 'Digital Fundus Fluorescein Angiography (FFA) imaging setup',
    caption_bn: 'ডিজিটাল ফান্ডাস ফ্লুরোসেন অ্যানজিওগ্রাফি (FFA) ইমেজিং ব্যবস্থা',
    chamber_name_en: null,
    chamber_name_bn: null,
    order_index: 4,
    is_published: true,
  },
  {
    src: '/images/services/cataract-surgery.jpg',
    category: 'Equipment',
    caption_en: 'Modern Phacoemulsification unit with microsurgical visualization',
    caption_bn: 'মাইক্রোসার্জিক্যাল ভিজ্যুয়ালাইজেশনসহ আধুনিক ফ্যাকোইমালসিফিকেশন ইউনিট',
    chamber_name_en: null,
    chamber_name_bn: null,
    order_index: 5,
    is_published: true,
  },
  {
    src: '/images/services/vitreoretinal-surgery.jpg',
    category: 'Chambers',
    caption_en: 'Sterile vitreoretinal surgical operating theater',
    caption_bn: 'আধুনিক ও জীবাণুমুক্ত ভিট্রিওরেটিনাল অপারেশন থিয়েটার',
    chamber_name_en: 'An Nahar Specialized Eye Hospital',
    chamber_name_bn: 'আন নাহার স্পেশালাইজড আই হসপিটাল',
    order_index: 6,
    is_published: true,
  },
  {
    src: '/images/services/refractive-surgery.jpg',
    category: 'Equipment',
    caption_en: 'Excimer & Femtosecond laser workstation for LASIK & corneal reshaping',
    caption_bn: 'লেসিক ও কর্নিয়া চিকিৎসার জন্য আধুনিক এক্সাইমার লেজার ওয়ার্কস্টেশন',
    chamber_name_en: null,
    chamber_name_bn: null,
    order_index: 7,
    is_published: true,
  },
  {
    src: '/images/services/glaucoma-management.jpg',
    category: 'Equipment',
    caption_en: 'Automated visual field perimetry & corneal pachymeter',
    caption_bn: 'স্বয়ংক্রিয় ভিজ্যুয়াল ফিল্ড পেরিমেট্রি ও কর্নিয়া পরিমাপক',
    chamber_name_en: null,
    chamber_name_bn: null,
    order_index: 8,
    is_published: true,
  }
];

const videosSeed = [
  {
    video_code: 'vid-1',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    category: 'Cataract',
    title_en: 'Micro-Incision Phacoemulsification Demonstration',
    title_bn: 'মাইক্রো-ইনসিশন ফ্যাকোইমালসিফিকেশন ডেমোনস্ট্রেশন',
    tag_en: 'Phaco · MICS',
    tag_bn: 'ফ্যাকো · MICS',
    description_en: 'Step-by-step surgical walk-through of modern sutureless cataract surgery.',
    description_bn: 'আধুনিক সেলাইবিহীন ছানি অপারেশনের পূর্ণাঙ্গ সার্জিক্যাল ভিডিও।',
    is_featured: true,
    order_index: 1,
  },
  {
    video_code: 'vid-2',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    category: 'Vitreoretina',
    title_en: 'Pars Plana Vitrectomy for Retinal Detachment Repair',
    title_bn: 'রেটিনা বিচ্ছিন্নতা নিরাময়ে পার্স প্লানা ভিট্রেক্টমি',
    tag_en: 'PPV · Retina Repair',
    tag_bn: 'PPV · রেটিনা রিপেয়ার',
    description_en: 'Microsurgical vitrectomy procedure with silicone oil tamponade.',
    description_bn: 'সিলিকন অয়েল ট্যাম্পোনেডসহ রেটিনা প্রতিস্থাপন মাইক্রোসার্জারি।',
    is_featured: true,
    order_index: 2,
  },
  {
    video_code: 'vid-3',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    category: 'Cataract',
    title_en: 'Yamane Double-Needle Scleral Fixation Technique',
    title_bn: 'ইয়ামানে ডাবল-নিডল স্কেরাল ফিক্সেশন পদ্ধতি',
    tag_en: 'Yamane · SFIOL',
    tag_bn: 'ইয়ামানে · SFIOL',
    description_en: 'Sutureless secondary lens implantation in aphakic eyes.',
    description_bn: 'সাপোর্টবিহীন চোখে সেলাইহীন কৃত্রিম লেন্স প্রতিস্থাপনের অত্যাধুনিক কৌশল।',
    is_featured: true,
    order_index: 3,
  },
  {
    video_code: 'vid-4',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    category: 'Refractive',
    title_en: 'Pre-LASIK Evaluation: What to Expect During Screening',
    title_bn: 'প্রি-লেসিক মূল্যায়ন: স্ক্রিনিং পরীক্ষায় কী জানা যায়',
    tag_en: 'LASIK · Refractive',
    tag_bn: 'লেসিক · রিফ্র্যাক্টিভ',
    description_en: 'Explaining corneal topography, pachymetry and candidacy.',
    description_bn: 'কর্নিয়াল টপোগ্রাফি ও লেসিকের উপযুক্ততা যাচাই প্রক্রিয়া।',
    is_featured: false,
    order_index: 4,
  },
  {
    video_code: 'vid-5',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    category: 'Vitreoretina',
    title_en: 'Endolaser Photocoagulation for Diabetic Retinopathy',
    title_bn: 'ডায়াবেটিক রেটিনোপ্যাথিতে এন্ডোলেজার চিকিৎসা',
    tag_en: 'Diabetic Retina · Laser',
    tag_bn: 'ডায়াবেটিক রেটিনা · লেজার',
    description_en: 'Laser sealing of leaking abnormal vessels in proliferative diabetic retinopathy.',
    description_bn: 'রেটিনার অস্বাভাবিক রক্তনালীর ক্ষরণ বন্ধে লেজার থেরাপি।',
    is_featured: false,
    order_index: 5,
  },
  {
    video_code: 'vid-6',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    category: 'Patient Education',
    title_en: 'When to See an Eye Doctor Urgently: 5 Warning Signs',
    title_bn: 'কখন দ্রুত চক্ষু বিশেষজ্ঞকে দেখাবেন: ৫টি সতর্কবার্তা',
    tag_en: 'Patient Education · Red Flags',
    tag_bn: 'রোগী শিক্ষা · লাল পতাকা সংকেত',
    description_en: 'Flashes, floaters, sudden painless vision drop explained for patients.',
    description_bn: 'আলোর ঝলকানি ও হঠাৎ দৃষ্টিহ্রাসের তাৎপর্য নিয়ে বিস্তারিত আলোচনা।',
    is_featured: true,
    order_index: 6,
  },
  {
    video_code: 'vid-7',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    category: 'ROP',
    title_en: 'Retinopathy of Prematurity Screening in Neonatal Care',
    title_bn: 'এনআইসিইউতে অপরিণত নবজাতকের রেটিনা স্ক্রিনিং',
    tag_en: 'ROP · Neonatal Screening',
    tag_bn: 'ROP · নবজাতক স্ক্রিনিং',
    description_en: 'Indirect ophthalmoscopy screening for premature infants.',
    description_bn: 'অপরিণত শিশুদের রেটিনা সুরক্ষায় সময়োপযোগী স্ক্রিনিং।',
    is_featured: false,
    order_index: 7,
  },
  {
    video_code: 'vid-8',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtube_id: 'dQw4w9WgXcQ',
    category: 'Oculoplasty',
    title_en: 'Ptosis Correction: Surgical Re-alignment of the Eyelid',
    title_bn: 'পিটোসিস সার্জারি: ঝুলে পড়া চোখের পাতার সফল সংশোধন',
    tag_en: 'Ptosis · Oculoplasty',
    tag_bn: 'পিটোসিস · অকুলোপ্লাস্টি',
    description_en: 'Restoration of eyelid height and normal unobstructed visual field.',
    description_bn: 'চোখের পাতার স্বাভাবিক উচ্চতা ও ক্ষেত্রফল ফিরিয়ে আনার পদ্ধতি।',
    is_featured: false,
    order_index: 8,
  }
];

const blogSeed = [
  {
    slug: 'cataract-surgery-recovery',
    title_en: 'Cataract Surgery Recovery: What to Do (and Avoid) in the First Weeks',
    title_bn: 'ছানি অপারেশনের পর প্রথম কয়েক সপ্তাহে কী করবেন, কী করবেন না',
    meta_description_en: "A clear, practical guide to cataract surgery recovery — what's normal, what to avoid, and when to call your doctor.",
    meta_description_bn: 'ছানি অপারেশনের পর সহজ, বাস্তবসম্মত গাইড — কী স্বাভাবিক, কী এড়িয়ে চলবেন, আর কখন ডাক্তারকে কল করবেন।',
    category_en: 'Cataract Care',
    category_bn: 'ছানি চিকিৎসা',
    read_time_en: '5 min read',
    read_time_bn: '৫ মিনিট পাঠ',
    publish_date: '2026-08-15',
    image_url: '/images/services/cataract-surgery.jpg',
    sections: [
      {
        content: {
          en: 'Cataract surgery is one of the most common and safest procedures in modern medicine — but the days after surgery matter just as much as the procedure itself. How you care for your eye in the first few weeks directly affects how quickly, and how well, you heal.',
          bn: 'ছানি অপারেশন আধুনিক চিকিৎসাবিজ্ঞানের সবচেয়ে নিরাপদ ও সাধারণ পদ্ধতিগুলোর একটা — কিন্তু অপারেশনের পরের দিনগুলো ঠিক ততটাই গুরুত্বপূর্ণ যতটা অপারেশনটা নিজে।'
        }
      },
      {
        heading: { en: 'The First 24 Hours', bn: 'প্রথম ২৪ ঘণ্টা' },
        content: {
          en: 'Right after surgery, your eye will be covered with a protective shield — keep it on until your doctor tells you to remove it, including while sleeping for the first night or two. Mild grittiness, watering, and light sensitivity are normal.',
          bn: 'অপারেশনের পরপরই চোখে একটা সুরক্ষা শিল্ড পরানো থাকবে — ডাক্তার খুলতে না বলা পর্যন্ত এটা পরে থাকুন।'
        }
      },
      {
        heading: { en: 'What to Avoid', bn: 'যা এড়িয়ে চলবেন' },
        content: {
          en: 'Avoid rubbing or pressing on the eye, even lightly. Skip swimming, hot tubs, and dusty environments for at least two weeks. Avoid heavy lifting or strenuous exercise for about a week.',
          bn: 'চোখ ঘষা বা হালকা চাপ দেওয়াও এড়িয়ে চলুন। অন্তত দুই সপ্তাহ সাঁতার, পুকুরে নামা, আর ধুলাবালিপূর্ণ জায়গা এড়িয়ে চলুন।'
        }
      }
    ],
    emergency_callout_en: 'Call immediately if you experience: sudden severe pain, a sharp decrease in vision, increasing redness/discharge, or flashes of light.',
    emergency_callout_bn: 'হঠাৎ তীব্র ব্যথা, হঠাৎ দৃষ্টি কমে যাওয়া, চোখে মাত্রাতিরিক্ত লালচেভাব বা পিঁচুটি, অথবা আলোর ঝলকানি দেখা দিলে সাথে সাথে ডাক্তারকে কল করুন।',
    related_service_slug: 'cataract-surgery',
    related_condition_slug: 'cataract',
    is_published: true
  },
  {
    slug: 'questions-before-lasik',
    title_en: '7 Questions to Ask Before Getting LASIK',
    title_bn: 'লেসিক করানোর আগে যে ৭টা প্রশ্ন করা উচিত',
    meta_description_en: 'Thinking about LASIK? Here are the questions worth asking your surgeon before you commit.',
    meta_description_bn: 'লেসিক করানোর কথা ভাবছেন? বুক করার আগে সার্জনকে এই প্রশ্নগুলো করে নিন।',
    category_en: 'Refractive Surgery',
    category_bn: 'লেসিক ও কর্নিয়া',
    read_time_en: '6 min read',
    read_time_bn: '৬ মিনিট পাঠ',
    publish_date: '2026-08-20',
    image_url: '/images/services/refractive-surgery.jpg',
    sections: [
      {
        content: {
          en: 'LASIK is a life-changing procedure for many people — but it is also permanent, which means the decision deserves real information, not just enthusiasm.',
          bn: 'লেসিক অনেকের জীবন বদলে দেওয়া একটা পদ্ধতি — কিন্তু এটা স্থায়ীও, তাই এই সিদ্ধান্ত নেওয়ার আগে সঠিক তথ্য জানা দরকার।'
        }
      }
    ],
    emergency_callout_en: null,
    emergency_callout_bn: null,
    related_service_slug: 'refractive-surgery',
    related_condition_slug: 'refractive-error',
    is_published: true
  },
  {
    slug: 'diabetes-and-your-eyes',
    title_en: 'Diabetes and Your Eyes: What Every Patient Needs to Know',
    title_bn: 'ডায়াবেটিস ও চোখের সুরক্ষা: প্রতিটি রোগীর যা জানা জরুরি',
    meta_description_en: 'Diabetic retinopathy is a leading cause of preventable blindness. Learn how regular screening saves vision.',
    meta_description_bn: 'ডায়াবেটিক রেটিনোপ্যাথি দৃষ্টি হারানোর অন্যতম প্রধান কারণ। জানুন কীভাবে নিয়মিত পরীক্ষা দৃষ্টি বাঁচায়।',
    category_en: 'Retina & Diabetes',
    category_bn: 'রেটিনা ও ডায়াবেটিস',
    read_time_en: '7 min read',
    read_time_bn: '৭ মিনিট পাঠ',
    publish_date: '2026-08-25',
    image_url: '/images/services/diabetic-eye-care.jpg',
    sections: [
      {
        content: {
          en: 'High blood sugar damages tiny retinal blood vessels slowly and painlessly over years. By the time symptoms appear, significant harm may already have occurred.',
          bn: 'রক্তে উচ্চ মাত্রার সুগার ধীরে ধীরে রেটিনার সূক্ষ্ম রক্তনালীর ক্ষতি করে। কোনো ব্যথা ছাড়াই ক্ষতি হতে থাকে।'
        }
      }
    ],
    emergency_callout_en: 'Sudden dark floaters, spiderwebs, or a curtain over part of your vision can signal a vitreous hemorrhage — seek emergency ophthalmic evaluation.',
    emergency_callout_bn: 'হঠাৎ প্রচুর কালো বিন্দু, মাকড়সার জালের মতো বা পর্দার মতো অন্ধকার দেখলে দ্রুত জরুরি চক্ষু পরীক্ষা করান।',
    related_service_slug: 'diabetic-eye-care',
    related_condition_slug: 'diabetic-retinopathy',
    is_published: true
  },
  {
    slug: 'rop-newborn-eye-screening',
    title_en: 'ROP in Newborns: Why Timely Screening Is Essential',
    title_bn: 'নবজাতকের ROP: সময়মতো স্ক্রিনিং কেন অপরিহার্য',
    meta_description_en: 'Retinopathy of prematurity is a treatable condition if caught early, but devastating if missed.',
    meta_description_bn: 'অপরিণত নবজাতকের রেটিনোপ্যাথি সময়মতো ধরা পড়লে চিকিৎসা সম্ভব, কিন্তু দেরি হলে দৃষ্টি নষ্ট হতে পারে।',
    category_en: 'Pediatric Retina',
    category_bn: 'শিশুর রেটিনা',
    read_time_en: '4 min read',
    read_time_bn: '৪ মিনিট পাঠ',
    publish_date: '2026-09-01',
    image_url: '/images/2. Conditions_Images/7. Retinopathy of Prematurity (ROP).png',
    sections: [
      {
        content: {
          en: 'Retinopathy of Prematurity affects premature or low-birth-weight babies. Screening within 3–4 weeks of birth is critical.',
          bn: 'অপরিণত বা কম ওজনের নবজাতকদের ক্ষেত্রে জন্মের ৩-৪ সপ্তাহের মধ্যে স্ক্রিনিং অত্যন্ত জরুরি।'
        }
      }
    ],
    emergency_callout_en: null,
    emergency_callout_bn: null,
    related_service_slug: 'rop-care',
    related_condition_slug: 'rop',
    is_published: true
  },
  {
    slug: 'sudden-blurry-vision-emergency',
    title_en: 'Sudden Blurry Vision: When It Is an Ophthalmic Emergency',
    title_bn: 'হঠাৎ দৃষ্টি ঝাপসা: কখন এটি চোখের জরুরি অবস্থা',
    meta_description_en: 'Not all vision changes can wait for next week. Learn which symptoms need emergency attention today.',
    meta_description_bn: 'সব চোখের সমস্যা আগামী সপ্তাহের জন্য ফেলে রাখা যায় না। জানুন কোন লক্ষণগুলো এখনই জরুরি মনোযোগ দাবি করে।',
    category_en: 'Emergency Eye Care',
    category_bn: 'জরুরি চক্ষু সেবা',
    read_time_en: '5 min read',
    read_time_bn: '৫ মিনিট পাঠ',
    publish_date: '2026-09-08',
    image_url: '/images/services/vitreoretinal-surgery.jpg',
    sections: [
      {
        content: {
          en: 'A sudden, painless loss of vision in one eye, bright flashes with a shower of new floaters, or a dark curtain rising across your vision are medical emergencies.',
          bn: 'এক চোখে হঠাৎ ব্যথাহীন দৃষ্টিহানি, তীব্র আলোর ঝলকানি বা দৃষ্টির সামনে কালো পর্দার মতো নেমে আসা একটি মেডিকেল ইমার্জেন্সি।'
        }
      }
    ],
    emergency_callout_en: 'Call our emergency serial 01344-890335 immediately if you notice flashes, curtains, or sudden vision loss.',
    emergency_callout_bn: 'হঠাৎ আলোর ঝলকানি বা দৃষ্টিতে কালো পর্দা দেখলে অবিলম্বে ০১৩৪৪-৮৯০৩৩৫ নম্বরে কল করুন।',
    related_service_slug: 'eye-trauma-emergency',
    related_condition_slug: 'retinal-detachment',
    is_published: true
  },
  {
    slug: 'screen-time-and-dry-eye',
    title_en: 'Screen Time & Digital Eye Strain: Practical Tips for Relief',
    title_bn: 'স্ক্রিন টাইম ও ডিজিটাল আই স্ট্রেন: চোখ আরাম রাখার বাস্তব টিপস',
    meta_description_en: 'Hours of screen time dry out your eyes and strain your focusing muscles. Practical steps that genuinely help.',
    meta_description_bn: 'ঘণ্টার পর ঘণ্টা স্ক্রিনের সামনে থাকলে চোখ শুষ্ক হয়ে যায়। চোখ সুস্থ রাখার কার্যকর পদক্ষেপ।',
    category_en: 'General Eye Health',
    category_bn: 'সাধারণ চোখের যত্ন',
    read_time_en: '4 min read',
    read_time_bn: '৪ মিনিট পাঠ',
    publish_date: '2026-09-12',
    image_url: '/images/services/dry-eye-corneal-disease.jpg',
    sections: [
      {
        content: {
          en: 'When looking at digital screens, our blink rate drops by more than 50%, accelerating tear evaporation.',
          bn: 'ডিজিটাল স্ক্রিনের দিকে তাকিয়ে থাকলে আমরা চোখের পলক স্বাভাবিকের চেয়ে ৫০% কম ফেলি, ফলে চোখের পানি দ্রুত শুকিয়ে যায়।'
        }
      }
    ],
    emergency_callout_en: null,
    emergency_callout_bn: null,
    related_service_slug: 'dry-eye-corneal-disease',
    related_condition_slug: 'dry-eye',
    is_published: true
  }
];

async function seed() {
  console.log('Seeding Database...');

  // 1. Gallery
  console.log('Checking gallery_items...');
  const { data: currentGallery } = await supabase.from('gallery_items').select('id');
  if (!currentGallery || currentGallery.length === 0) {
    console.log('Inserting', gallerySeed.length, 'gallery items...');
    const { data, error } = await supabase.from('gallery_items').insert(gallerySeed).select();
    if (error) console.error('Gallery error:', error.message);
    else console.log('Successfully inserted', data.length, 'gallery items.');
  } else {
    console.log('Gallery already has', currentGallery.length, 'items.');
  }

  // 2. Videos
  console.log('Checking videos...');
  const { data: currentVideos } = await supabase.from('videos').select('id');
  if (!currentVideos || currentVideos.length <= 1) {
    console.log('Upserting videos...');
    for (const v of videosSeed) {
      const { error } = await supabase.from('videos').upsert(v, { onConflict: 'video_code' });
      if (error) console.error('Video error:', v.video_code, error.message);
    }
    console.log('Videos seeded successfully.');
  } else {
    console.log('Videos table has', currentVideos.length, 'items.');
  }

  // 3. Blog posts
  console.log('Checking blog_posts...');
  for (const b of blogSeed) {
    const { error } = await supabase.from('blog_posts').upsert(b, { onConflict: 'slug' });
    if (error) console.error('Blog error:', b.slug, error.message);
  }
  console.log('Blog posts seeded/upserted.');

  // Verify counts
  const tables = ['services', 'conditions', 'chambers', 'faqs', 'videos', 'gallery_items', 'blog_posts', 'reviews'];
  for (const t of tables) {
    const { data, count } = await supabase.from(t).select('*', { count: 'exact' });
    console.log(`Table "${t}": ${data ? data.length : 0} rows.`);
  }
}

seed().catch(console.error);
