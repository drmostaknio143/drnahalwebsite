import Link from "next/link";
import { UserRound, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

export default function AboutTeaser({ lang }: { lang: Lang }) {
  const t = homeDict[lang].about;
  return (
    <div className="band-white w-full py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mx-auto max-w-[680px] text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
            <UserRound size={14} /> {t.eyebrow}
          </div>
          <h2 className="font-display text-[24px] font-bold leading-tight md:text-[30px]">{t.title}</h2>
          <p className="mt-4 text-[15px] text-ink-muted">{t.body}</p>
          <Link
            href={`/${lang}/about`}
            className="btn-pill btn-primary group mt-6 inline-flex"
          >
            {t.cta}{" "}
            <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
