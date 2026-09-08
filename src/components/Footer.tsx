import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { navDict, practice, whatsappHref } from "@/lib/i18n/nav";
import { Lang } from "@/lib/i18n/types";

const t = {
  en: { legal: ["Privacy Policy", "Terms of Use"], chambersH: "Chambers", navH: "Navigate", contactH: "Contact", rights: "All rights reserved." },
  bn: { legal: ["প্রাইভেসি পলিসি", "শর্তাবলী"], chambersH: "চেম্বার", navH: "নেভিগেট", contactH: "যোগাযোগ", rights: "সকল অধিকার সংরক্ষিত।" },
};

export default function Footer({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <footer className="bg-ink text-[#EAF0EF]">
      <div className="mx-auto max-w-[1180px] px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-9">
          <div>
            <h4 className="mb-3.5 text-[12.5px] font-bold uppercase tracking-wider text-[#EAF0EF]/55">
              {practice.name[lang]}
            </h4>
            <p className="max-w-[32ch] text-[13px] text-[#B9C7C4]">
              {practice.doctor[lang]}
            </p>
          </div>
          <div>
            <h4 className="mb-3.5 text-[12.5px] font-bold uppercase tracking-wider text-[#EAF0EF]/55">
              {c.chambersH}
            </h4>
            <ul className="flex flex-col gap-2 text-[13.5px] text-[#D8E2E0]">
              {practice.chambers.map((ch) => (
                <li key={ch.name.en}>{ch.name[lang]}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3.5 text-[12.5px] font-bold uppercase tracking-wider text-[#EAF0EF]/55">
              {c.navH}
            </h4>
            <ul className="flex flex-col gap-2 text-[13.5px] text-[#D8E2E0]">
              {navDict[lang].map((l) => (
                <li key={l.href}>
                  <Link href={`/${lang}${l.href}`} className="transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-3.5 text-[12.5px] font-bold uppercase tracking-wider text-[#EAF0EF]/55">
              {c.contactH}
            </h4>
            <ul className="flex flex-col gap-2 text-[13.5px] text-[#D8E2E0]">
              <li className="flex items-center gap-2">
                <Phone size={14} />
                <a href={whatsappHref(lang)} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                  {practice.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} /> {practice.email}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2.5 border-t border-white/10 pt-5 text-[12px] text-[#EAF0EF]/55 sm:flex-row sm:items-center sm:justify-between">
          <span>&copy; {new Date().getFullYear()} {practice.name[lang]}. {c.rights}</span>
          <div className="flex gap-4">
            <Link href={`/${lang}/privacy`} className="hover:text-white">{c.legal[0]}</Link>
            <Link href={`/${lang}/terms`} className="hover:text-white">{c.legal[1]}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
