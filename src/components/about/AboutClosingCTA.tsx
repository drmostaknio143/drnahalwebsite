import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Lang } from "@/lib/i18n/types";
import { aboutDict } from "@/lib/i18n/about";

export default function AboutClosingCTA({ lang }: { lang: Lang }) {
  const t = aboutDict[lang];
  return (
    <div className="band-teal w-full py-16 text-center">
      <div className="mx-auto max-w-[560px] px-6">
        <Reveal>
          <h2 className="font-display text-[24px] font-bold text-white md:text-[30px]">{t.closingTitle}</h2>
          <Link
            href={`/${lang}/contact`}
            className="btn-pill btn-light group mt-6 inline-flex"
          >
            <CalendarCheck size={15} className="transition-transform duration-300 group-hover:scale-110" />
            {t.closingCta}
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
