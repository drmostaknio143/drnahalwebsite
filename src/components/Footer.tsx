import Link from "next/link";
import { Phone, Mail, Clock, ShieldAlert } from "lucide-react";
import { practice, whatsappHref } from "@/lib/i18n/nav";
import { Lang } from "@/lib/i18n/types";

const t = {
  en: {
    legal: ["Privacy Policy", "Terms of Use"],
    chambersH: "Chambers",
    navH: "Quick Links",
    contactH: "Contact & Serial",
    emergencyNotice: "For sudden vision loss or retinal emergencies, call immediately.",
    rights: "All rights reserved.",
    links: [
      { href: "/services", label: "Surgeries & Services" },
      { href: "/conditions", label: "Conditions We Treat" },
      { href: "/videos", label: "Video Library" },
      { href: "/gallery", label: "Inside Practice" },
      { href: "/chambers", label: "Chambers & Schedule" },
      { href: "/blog", label: "Patient Education (Blog)" },
      { href: "/faq", label: "Common Questions (FAQ)" },
      { href: "/contact", label: "Book Appointment" },
    ],
  },
  bn: {
    legal: ["প্রাইভেসি পলিসি", "শর্তাবলী ও ডিসক্লেইমার"],
    chambersH: "চেম্বার সমূহ",
    navH: "প্রয়োজনীয় লিংক",
    contactH: "যোগাযোগ ও সিরিয়াল",
    emergencyNotice: "হঠাৎ দৃষ্টি কমে যাওয়া বা রেটিনা-সংক্রান্ত জরুরি অবস্থায় অবিলম্বে কল করুন।",
    rights: "সর্বস্বত্ব সংরক্ষিত।",
    links: [
      { href: "/services", label: "সার্ভিস ও সার্জারি" },
      { href: "/conditions", label: "আমরা যেসব রোগের চিকিৎসা করি" },
      { href: "/videos", label: "ভিডিও লাইব্রেরি" },
      { href: "/gallery", label: "গ্যালারি ও প্র্যাকটিস" },
      { href: "/chambers", label: "চেম্বার ও সময়সূচি" },
      { href: "/blog", label: "রোগী সচেতনতা ব্লগ" },
      { href: "/faq", label: "সাধারণ প্রশ্নোত্তর (FAQ)" },
      { href: "/contact", label: "অ্যাপয়েন্টমেন্ট বুকিং" },
    ],
  },
};

export default function Footer({ lang }: { lang: Lang }) {
  const c = t[lang];

  return (
    <footer className="bg-ink text-[#EAF0EF]">
      <div className="mx-auto max-w-[1180px] px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4 md:gap-9">
          {/* Col 1 */}
          <div>
            <h4 className="mb-3 text-[13px] font-bold uppercase tracking-wider text-[#EAF0EF]/70">
              {practice.name[lang]}
            </h4>
            <p className="font-display text-[15px] font-bold text-white">
              {practice.doctor[lang]}
            </p>
            <p className="mt-1 text-[12.5px] leading-relaxed text-[#B9C7C4]">
              {practice.designation[lang]}
            </p>
            <p className="mt-1 text-[11.5px] text-[#8EA3A0]">
              {practice.institution[lang]}
            </p>
            <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/5 p-3 text-[12px] text-amber-200/90">
              <ShieldAlert size={16} className="mt-0.5 shrink-0 text-amber-300" />
              <span>{c.emergencyNotice}</span>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="mb-3.5 text-[12.5px] font-bold uppercase tracking-wider text-[#EAF0EF]/55">
              {c.chambersH}
            </h4>
            <ul className="flex flex-col gap-3 text-[13px] text-[#D8E2E0]">
              {practice.chambers.map((ch) => (
                <li key={ch.id} className="border-b border-white/5 pb-2 last:border-0 last:pb-0">
                  <span className="block font-semibold text-white">{ch.name[lang]}</span>
                  <span className="text-[12px] text-[#8EA3A0]">{ch.location[lang]}</span>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11.5px] text-accent-soft">
                    <Clock size={12} className="shrink-0" />
                    <span>{ch.hours[lang]}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="mb-3.5 text-[12.5px] font-bold uppercase tracking-wider text-[#EAF0EF]/55">
              {c.navH}
            </h4>
            <ul className="grid grid-cols-1 gap-2 text-[13px] text-[#D8E2E0]">
              {c.links.map((l) => (
                <li key={l.href}>
                  <Link href={`/${lang}${l.href}`} className="transition hover:text-white hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="mb-3.5 text-[12.5px] font-bold uppercase tracking-wider text-[#EAF0EF]/55">
              {c.contactH}
            </h4>
            <ul className="flex flex-col gap-3 text-[13px] text-[#D8E2E0]">
              <li>
                <span className="block text-[11px] text-[#8EA3A0]">
                  {lang === "en" ? "Serial Hotline:" : "সিরিয়াল হটলাইন:"}
                </span>
                <a
                  href={`tel:${practice.serialPhone}`}
                  className="flex items-center gap-2 font-display text-[15px] font-bold text-white transition hover:text-accent-soft"
                >
                  <Phone size={14} /> {practice.serialPhone}
                </a>
              </li>
              <li>
                <span className="block text-[11px] text-[#8EA3A0]">
                  {lang === "en" ? "WhatsApp (Direct):" : "হোয়াটসঅ্যাপ (সরাসরি):"}
                </span>
                <a
                  href={whatsappHref(lang)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-medium text-accent-soft hover:underline"
                >
                  {practice.phone}
                </a>
              </li>
              <li>
                <span className="block text-[11px] text-[#8EA3A0]">Email:</span>
                <a
                  href={`mailto:${practice.email}`}
                  className="flex items-center gap-2 text-white/80 hover:text-white"
                >
                  <Mail size={14} /> {practice.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-[12px] text-[#EAF0EF]/55 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} {practice.name[lang]} · {practice.doctorShort[lang]}. {c.rights}
          </span>
          <div className="flex gap-5">
            <Link href={`/${lang}/privacy`} className="hover:text-white">
              {c.legal[0]}
            </Link>
            <Link href={`/${lang}/terms`} className="hover:text-white">
              {c.legal[1]}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
