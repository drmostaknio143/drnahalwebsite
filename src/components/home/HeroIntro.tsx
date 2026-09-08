import Link from "next/link";
import { ShieldCheck, CalendarCheck, PlayCircle } from "lucide-react";
import { homeDict } from "@/lib/i18n/home";
import { whatsappHref } from "@/lib/i18n/nav";
import { Lang } from "@/lib/i18n/types";

export default function HeroIntro({ lang }: { lang: Lang }) {
  const t = homeDict[lang].hero;
  return (
    <div className="band-white w-full py-14 md:py-16">
      <div className="mx-auto max-w-[760px] px-6 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-accent-2 md:text-[12.5px]">
          <ShieldCheck size={14} /> {t.eyebrow}
        </div>
        <h1 className="font-display text-[30px] font-bold leading-[1.15] text-ink md:text-[44px]">
          {t.title}
        </h1>
        <p className="mx-auto mt-4 max-w-[54ch] text-[15px] text-ink-muted md:text-[16px]">
          {t.sub}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
          <a href={whatsappHref(lang)} target="_blank" rel="noopener noreferrer" className="btn-pill btn-primary">
            <CalendarCheck size={15} /> {t.cta1}
          </a>
          <Link href={`/${lang}/videos`} className="btn-pill btn-ghost">
            <PlayCircle size={15} /> {t.cta2}
          </Link>
        </div>
      </div>
    </div>
  );
}
