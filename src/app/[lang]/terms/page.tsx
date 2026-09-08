import { notFound } from "next/navigation";
import Link from "next/link";
import { AlertTriangle, ArrowLeft, ShieldAlert, Phone } from "lucide-react";
import { isLang, Lang } from "@/lib/i18n/types";
import { practice } from "@/lib/i18n/nav";

const content = {
  en: {
    eyebrow: "Medical Disclaimer & Terms",
    title: "Terms of Use & Medical Disclaimer",
    lastUpdated: "Last updated: September 2026",
    sections: [
      {
        title: "Educational Purpose Only",
        text: "The medical information presented on this website — including the Conditions, Services, and Blog articles — is provided strictly for patient awareness and general educational purposes. It is not intended to serve as, nor should it ever substitute for, personal clinical advice, diagnosis, or treatment.",
      },
      {
        title: "Not a Substitute for In-Person Clinical Exam",
        text: "Every patient's ocular anatomy, medical history, and clinical condition are unique. Reading about a procedure or condition on this website cannot replace a comprehensive in-person slit-lamp and dilated examination by Dr. Nahal Mostak Khan or another licensed medical specialist.",
      },
      {
        title: "Acute Medical Emergencies",
        text: "If you are experiencing an acute vision emergency — such as sudden, painless loss of sight, brilliant flashes of light, or a curtain moving across your visual field — contact our hotline immediately or visit an emergency eye facility. Do not rely on web inquiries or delayed appointment scheduling during an emergency.",
      },
      {
        title: "Medical Information Accuracy",
        text: "While every effort is made to keep information medically accurate, surgical techniques, pharmacology, and clinical guidelines evolve continuously. We make no warranty that all information permanently reflects every recent medical paper or guideline.",
      },
    ],
    emergencyCallout: "For sudden vision emergencies, call our clinical hotline immediately at 01344-890335.",
    backHome: "Back to Home",
  },
  bn: {
    eyebrow: "মেডিকেল ডিসক্লেইমার ও শর্তাবলী",
    title: "শর্তাবলী ও মেডিকেল ডিসক্লেইমার",
    lastUpdated: "সর্বশেষ আপডেট: সেপ্টেম্বর ২০২৬",
    sections: [
      {
        title: "শুধুমাত্র শিক্ষামূলক উদ্দেশ্যে",
        text: "এই ওয়েবসাইটের সমস্ত তথ্য — Conditions, Services এবং ব্লগ পেজসহ — শুধুমাত্র সাধারণ সচেতনতা ও শিক্ষামূলক উদ্দেশ্যে প্রদান করা হয়েছে। এটি সরাসরি চিকিৎসা পরামর্শ, রোগ নির্ণয়, বা ব্যবস্থাপত্র হিসেবে বিবেচনা করা যাবে না।",
      },
      {
        title: "সশরীরে চিকিৎসা পরীক্ষার বিকল্প নয়",
        text: "প্রতিটি রোগীর শারীরিক অবস্থা ও চোখের গঠন স্বতন্ত্র। এই সাইটে কোনো রোগ বা সার্জারি পদ্ধতি সম্পর্কে পড়া সরাসরি ডা. নাহাল মোস্তাক খান বা অন্য কোনো যোগ্য চক্ষু বিশেষজ্ঞের কাছে সশরীরে পরীক্ষা ও পরামর্শের বিকল্প হতে পারে না।",
      },
      {
        title: "জরুরি চিকিৎসা সতর্কতা",
        text: "যদি আপনি কোনো মেডিকেল ইমার্জেন্সির সম্মুখীন হন — যেমন হঠাৎ দৃষ্টি কমে যাওয়া, আলোর তীব্র ঝলকানি, বা দৃষ্টির সামনে কালো পর্দা পড়া — অবিলম্বে জরুরি নম্বরে যোগাযোগ করুন বা নিকটস্থ জরুরি চক্ষু বিভাগে যান; শুধুমাত্র ওয়েবসাইটের তথ্যের ওপর নির্ভর করবেন না।",
      },
      {
        title: "চিকিৎসা তথ্যের হালনাগাদ সংক্রান্ত",
        text: "আমরা ওয়েবসাইটের তথ্য যথাসম্ভব সঠিক ও আধুনিক রাখার চেষ্টা করি, তবে চিকিৎসাবিজ্ঞানের গবেষণা ও নির্দেশিকা প্রতিনিয়ত পরিবর্তিত হয় বলে প্রতিটি তথ্যের সার্বক্ষণিক পরিবর্তনযোগ্যতার নিশ্চয়তা প্রদান করা সম্ভব নয়।",
      },
    ],
    emergencyCallout: "রেটিনা সংক্রান্ত জরুরি অবস্থায় বিলম্ব না করে কল করুন: ০১৩৪৪-৮৯০৩৩৫।",
    backHome: "হোমপেজে ফিরে যান",
  },
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const c = content[lang as Lang];

  return (
    <div className="min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-[820px] px-6">
        <Link
          href={`/${lang}`}
          className="mb-8 inline-flex items-center gap-2 text-[13px] font-bold text-accent transition hover:underline"
        >
          <ArrowLeft size={15} />
          <span>{c.backHome}</span>
        </Link>

        <div className="glass rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1 text-[12px] font-bold uppercase tracking-wider text-accent-2">
            <AlertTriangle size={14} />
            {c.eyebrow}
          </div>

          <h1 className="font-display text-[32px] font-extrabold text-ink sm:text-[40px]">
            {c.title}
          </h1>
          <p className="mt-2 text-[13px] text-ink-muted">{c.lastUpdated}</p>

          <div className="mt-8 rounded-2xl bg-rose-50 border border-rose-200 p-5 text-rose-950 flex items-start gap-3">
            <ShieldAlert size={20} className="mt-0.5 shrink-0 text-rose-600" />
            <p className="text-[13.5px] font-semibold leading-relaxed">
              {c.emergencyCallout}
            </p>
          </div>

          <div className="mt-10 flex flex-col gap-8">
            {c.sections.map((sec, idx) => (
              <div key={idx} className="border-b border-black/5 pb-6 last:border-0 last:pb-0">
                <h3 className="font-display text-[18px] font-bold text-ink">
                  {sec.title}
                </h3>
                <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink-muted">
                  {sec.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4">
            <a
              href={`tel:${practice.serialPhone}`}
              className="btn-pill btn-primary inline-flex items-center gap-2 text-[13px]"
            >
              <Phone size={14} />
              <span>{practice.serialPhone}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
