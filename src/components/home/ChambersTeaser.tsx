import Link from "next/link";
import { Building2, MapPinned } from "lucide-react";
import Reveal from "@/components/Reveal";
import { practice } from "@/lib/i18n/nav";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

export default function ChambersTeaser({ lang }: { lang: Lang }) {
  const t = homeDict[lang].chambers;
  return (
    <div className="band-white w-full py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mx-auto mb-9 max-w-[640px] text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
            <Building2 size={14} /> {t.eyebrow}
          </div>
          <h2 className="font-display text-[24px] font-bold md:text-[28px]">{t.title}</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {practice.chambers.map((c, i) => (
            <Reveal key={c.name.en} delay={i * 80}>
              <div className="glass h-full rounded-2xl p-5 text-center transition-transform duration-300 hover:-translate-y-1.5">
                <h3 className="font-display text-[15px] font-bold">{c.name[lang]}</h3>
                <p className="mt-1.5 text-[13px] text-ink-muted">{c.hours[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <Link href={`/${lang}/chambers`} className="btn-pill btn-primary inline-flex">
            <MapPinned size={15} /> {t.cta}
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
