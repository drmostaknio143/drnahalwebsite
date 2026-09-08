import { notFound } from "next/navigation";
import Link from "next/link";
import { ShieldCheck, ArrowLeft, Mail, Phone } from "lucide-react";
import { isLang, Lang } from "@/lib/i18n/types";
import { practice } from "@/lib/i18n/nav";

const content = {
  en: {
    eyebrow: "Legal & Transparency",
    title: "Privacy Policy",
    lastUpdated: "Last updated: September 2026",
    sections: [
      {
        title: "Information We Collect",
        text: "This website collects only the information you choose to share with us — such as your name, phone number, preferred chamber, and appointment details — when you fill out our contact or booking form.",
      },
      {
        title: "How We Use Your Information",
        text: "We use this information solely to confirm and manage your clinical appointment with Dr. Nahal Mostak Khan. We do not sell, rent, monetize, or share your personal data with any third parties for advertising or marketing purposes.",
      },
      {
        title: "Data Retention & Patient Rights",
        text: "If you have contacted us through this website, you can request that we delete or update your contact information at any time simply by calling or emailing the practice.",
      },
      {
        title: "Anonymous Site Analytics",
        text: "This website may use basic, privacy-respecting analytics to understand general visitor navigation patterns. This aggregated data is completely anonymous and never linked to your personal medical identity.",
      },
    ],
    contactPrompt: "Have questions about your data privacy?",
    backHome: "Back to Home",
  },
  bn: {
    eyebrow: "আইনি ও স্বচ্ছতা",
    title: "প্রাইভেসি পলিসি",
    lastUpdated: "সর্বশেষ আপডেট: সেপ্টেম্বর ২০২৬",
    sections: [
      {
        title: "আমরা যেসব তথ্য সংগ্রহ করি",
        text: "এই ওয়েবসাইট শুধুমাত্র আপনি নিজে থেকে যে তথ্য প্রদান করেন তা সংগ্রহ করে — যেমন আপনার নাম, ফোন নম্বর এবং পছন্দের অ্যাপয়েন্টমেন্ট তথ্য — যখন আপনি আমাদের কন্টাক্ট বা বুকিং ফর্ম পূরণ করেন।",
      },
      {
        title: "তথ্য ব্যবহারের নিয়মাবলী",
        text: "এই তথ্য শুধু আপনার অ্যাপয়েন্টমেন্ট নিশ্চিত ও পরিচালনা করার জন্যই ব্যবহার করা হয়। বাণিজ্যিক বা বিজ্ঞাপন উদ্দেশ্যে আপনার কোনো ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি, ভাড়া বা হস্তান্তর করা হয় না।",
      },
      {
        title: "তথ্য সংরক্ষণ ও রোগীর অধিকার",
        text: "আপনি যদি এই ওয়েবসাইটের মাধ্যমে যোগাযোগ করে থাকেন, যেকোনো সময় কল বা ইমেইল করে আপনার ব্যক্তিগত তথ্য হালনাগাদ বা মুছে ফেলার অনুরোধ করতে পারেন।",
      },
      {
        title: "পরিচয়বিহীন অ্যানালিটিক্স",
        text: "এই ওয়েবসাইট ভিজিটররা কীভাবে সাইট ব্যবহার করছেন তা বোঝার জন্য সাধারণ অ্যানালিটিক্স টুল ব্যবহার করতে পারে — এই তথ্য সম্পূর্ণ পরিচয়বিহীন এবং আপনার চিকিৎসা তথ্যের সাথে কোনোভাবেই যুক্ত নয়।",
      },
    ],
    contactPrompt: "তথ্য সুরক্ষা বিষয়ে কোনো প্রশ্ন থাকলে সরাসরি যোগাযোগ করুন:",
    backHome: "হোমপেজে ফিরে যান",
  },
};

export default async function PrivacyPage({
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
            <ShieldCheck size={14} />
            {c.eyebrow}
          </div>

          <h1 className="font-display text-[32px] font-extrabold text-ink sm:text-[40px]">
            {c.title}
          </h1>
          <p className="mt-2 text-[13px] text-ink-muted">{c.lastUpdated}</p>

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

          <div className="mt-10 rounded-2xl bg-white/70 p-6 border border-black/5 text-[13.5px]">
            <p className="font-semibold text-ink">{c.contactPrompt}</p>
            <div className="mt-3 flex flex-wrap items-center gap-5 text-accent font-bold">
              <a href={`tel:${practice.serialPhone}`} className="flex items-center gap-1.5 hover:underline">
                <Phone size={14} /> {practice.serialPhone}
              </a>
              <a href={`mailto:${practice.email}`} className="flex items-center gap-1.5 hover:underline">
                <Mail size={14} /> {practice.email}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
