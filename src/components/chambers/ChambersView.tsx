"use client";

import Link from "next/link";
import { Building2, Clock, Phone, MapPin, AlertCircle, Calendar, Sparkles } from "lucide-react";
import { practice } from "@/lib/i18n/nav";
import { Lang } from "@/lib/i18n/types";

const dict = {
  en: {
    eyebrow: "Chamber Locations",
    title: "Visit Dr. Nahal — Three Locations Across Dhaka",
    subhead:
      "Choose the chamber closest to you. Serial numbers are issued in order of arrival — calling ahead is strongly recommended to secure your place.",
    callSerial: "Call for Serial:",
    bookForChamber: "Request Appointment at this Chamber",
    holidayNote:
      "Chamber hours may vary slightly around national holidays and special clinical duties. Please call our hotline to confirm availability before your journey.",
    needAssistance: "Need immediate assistance?",
    emergencyNotice: "For sudden vision emergencies, contact our 24/7 hotline directly.",
  },
  bn: {
    eyebrow: "চেম্বার সমূহ",
    title: "ডা. নাহালের সাথে দেখা করুন — ঢাকার তিনটি জায়গায়",
    subhead:
      "আপনার সবচেয়ে সুবিধাজনক চেম্বারটি বেছে নিন। সিরিয়াল সাধারণত আগে এলে আগে ভিত্তিতে দেওয়া হয় — তাই আসার আগে সিরিয়াল নিশ্চিত করা উত্তম।",
    callSerial: "সিরিয়ালের জন্য কল করুন:",
    bookForChamber: "এই চেম্বারে অ্যাপয়েন্টমেন্ট নিন",
    holidayNote:
      "জাতীয় ছুটির দিনে সময়সূচি পরিবর্তিত হতে পারে — দয়া করে আসার আগে কল করে নিশ্চিত হয়ে নিন।",
    needAssistance: "তাৎক্ষণিক সহযোগিতার প্রয়োজন?",
    emergencyNotice: "রেটিনা-সংক্রান্ত জরুরি অবস্থায় সরাসরি আমাদের হটলাইনে যোগাযোগ করুন।",
  },
};

export default function ChambersView({ lang }: { lang: Lang }) {
  const t = dict[lang];

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        {/* Header */}
        <div className="mx-auto mb-12 max-w-[780px] text-center">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-4 py-1.5 text-[12.5px] font-bold uppercase tracking-wider text-accent-2">
            <Sparkles size={14} />
            {t.eyebrow}
          </div>
          <h1 className="font-display text-[32px] font-extrabold tracking-tight text-ink sm:text-[40px] md:text-[46px]">
            {t.title}
          </h1>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-muted sm:text-[17px]">
            {t.subhead}
          </p>
        </div>

        {/* Chambers Cards Grid */}
        <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
          {practice.chambers.map((ch, idx) => (
            <div
              key={ch.id}
              className="glass group flex flex-col justify-between rounded-3xl p-7 shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
            >
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-accent-soft px-3 py-1 text-[11.5px] font-bold text-accent-2">
                    {ch.badge[lang]}
                  </span>
                  <span className="text-[12px] font-bold text-ink-muted/80">
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 rounded-xl bg-accent/10 p-2 text-accent">
                    <Building2 size={20} />
                  </div>
                  <div>
                    <h3 className="font-display text-[19px] font-bold text-ink leading-snug">
                      {ch.name[lang]}
                    </h3>
                    <p className="mt-1 flex items-center gap-1.5 text-[13px] text-ink-muted">
                      <MapPin size={14} className="shrink-0 text-accent" />
                      <span>{ch.location[lang]}</span>
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-2xl bg-white/70 p-4 shadow-sm">
                  <div className="flex items-start gap-2.5">
                    <Clock size={16} className="mt-0.5 shrink-0 text-accent" />
                    <div>
                      <span className="text-[11.5px] font-bold uppercase tracking-wider text-ink-muted">
                        {lang === "en" ? "Consultation Hours" : "পরামর্শের সময়সূচি"}
                      </span>
                      <p className="mt-0.5 text-[13.5px] font-semibold text-ink leading-relaxed">
                        {ch.hours[lang]}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl bg-white/70 p-4 shadow-sm">
                  <span className="text-[11.5px] font-bold uppercase tracking-wider text-ink-muted">
                    {t.callSerial}
                  </span>
                  <a
                    href={`tel:${ch.phone}`}
                    className="mt-1 flex items-center gap-2 font-display text-[17px] font-extrabold text-accent transition hover:text-accent-2"
                  >
                    <Phone size={15} />
                    <span>{ch.phone}</span>
                  </a>
                </div>
              </div>

              <div className="mt-7 border-t border-black/5 pt-5">
                <Link
                  href={`/${lang}/contact?chamber=${ch.id}`}
                  className="btn-pill btn-primary flex w-full items-center justify-center gap-2 text-[13.5px]"
                >
                  <Calendar size={15} />
                  <span>{t.bookForChamber}</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Holiday / Advisory Note */}
        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50/80 p-5 text-amber-950 md:p-6">
          <div className="flex items-start gap-3.5">
            <AlertCircle size={22} className="mt-0.5 shrink-0 text-amber-700" />
            <div>
              <h4 className="text-[14.5px] font-bold text-amber-900">
                {lang === "en" ? "Important Patient Notice" : "জরুরি নোটিশ"}
              </h4>
              <p className="mt-1 text-[13.5px] leading-relaxed text-amber-800">
                {t.holidayNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
