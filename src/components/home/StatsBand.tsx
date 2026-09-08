import Reveal from "@/components/Reveal";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";
import { Award } from "lucide-react";

export default function StatsBand({ lang }: { lang: Lang }) {
  const t = homeDict[lang].stats;
  return (
    <div className="band-teal w-full py-12 md:py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mx-auto mb-8 max-w-[620px] text-center">
          <div className="mb-2 inline-flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wider text-[#BFE6DB]">
            <Award size={14} className="text-[#8FD9C4]" />
            {t.eyebrow}
          </div>
          <h2 className="font-display text-[24px] font-bold text-white md:text-[30px]">
            {t.title}
          </h2>
        </Reveal>
        <Reveal className="grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-4" delay={80}>
          {t.items.map((s) => (
            <div
              key={s.v}
              className="glass-on-dark group relative rounded-2xl p-4 sm:p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:border-emerald-400/40"
            >
              <div className="font-display text-[17px] font-extrabold text-white transition-colors group-hover:text-[#8FD9C4] sm:text-[19px] md:text-[20px]">
                {s.v}
              </div>
              <div className="mt-1 text-[11px] font-semibold text-white/85 sm:text-[12px]">
                {s.l}
              </div>
              <div className="mt-1 text-[10px] font-medium text-[#BFE6DB]/75 sm:text-[10.5px]">
                {s.sub}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
