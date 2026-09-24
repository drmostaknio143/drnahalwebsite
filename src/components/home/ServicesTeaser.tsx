import Link from "next/link";
import { Stethoscope, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { services } from "@/lib/data/services";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

export default function ServicesTeaser({
  lang,
  servicesList,
}: {
  lang: Lang;
  servicesList?: typeof services;
}) {
  const t = homeDict[lang].services;
  const list = servicesList && servicesList.length > 0 ? servicesList : services;
  return (
    <div className="band-white w-full py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mx-auto mb-9 max-w-[640px] text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
            <Stethoscope size={14} /> {t.eyebrow}
          </div>
          <h2 className="font-display text-[24px] font-bold md:text-[28px]">{t.title}</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, 6).map((s, i) => (

            <Reveal key={s.slug} delay={(i % 3) * 70}>
              <Link
                href={`/${lang}/services`}
                className="glass group block h-full rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="font-display text-[15px] font-bold text-ink transition-colors group-hover:text-accent">
                  {s.name[lang]}
                </h3>
                <p className="mt-1.5 text-[13px] text-ink-muted">{s.short[lang]}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <Link href={`/${lang}/services`} className="btn-pill btn-primary inline-flex">
            {t.cta} <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
