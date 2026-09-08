import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import Reveal from "@/components/Reveal";
import { practice } from "@/lib/i18n/nav";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

export default function FinalCTA({ lang }: { lang: Lang }) {
  const t = homeDict[lang].finalCta;
  return (
    <div className="band-teal w-full py-16 text-center">
      <div className="mx-auto max-w-[640px] px-6">
        <Reveal>
          <h2 className="font-display text-[26px] font-bold text-white md:text-[36px]">{t.title}</h2>
          <p className="mt-3 text-[15px] text-white/85">{t.sub}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <Link href={`/${lang}/contact`} className="btn-pill btn-light">
              <Calendar size={15} /> {lang === "en" ? "Book Appointment" : "অ্যাপয়েন্টমেন্ট নিন"}
            </Link>
            <a href={`tel:${practice.serialPhone}`} className="btn-pill glass-on-dark text-white">
              <Phone size={15} /> {practice.serialPhone}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
