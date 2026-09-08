import Reveal from "@/components/Reveal";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

const stats = [
  { v: "FRCS", l: "Royal College, Glasgow" },
  { v: "FCPS", l: "Bangladesh College of P&S" },
  { v: "FICO / ICO", l: "London" },
  { v: "GMC 8173571", l: "UK Registered" },
];

export default function StatsBand({ lang }: { lang: Lang }) {
  const t = homeDict[lang].stats;
  return (
    <div className="band-teal w-full py-14">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mx-auto mb-8 max-w-[560px] text-center">
          <div className="mb-2 text-[12px] font-bold uppercase tracking-wide text-[#BFE6DB]">
            {t.eyebrow}
          </div>
          <h2 className="font-display text-[24px] font-bold text-white md:text-[30px]">
            {t.title}
          </h2>
        </Reveal>
        <Reveal className="grid grid-cols-2 gap-4 md:grid-cols-4" delay={80}>
          {stats.map((s) => (
            <div
              key={s.v}
              className="glass-on-dark group rounded-2xl p-5 text-center transition-transform duration-300 hover:-translate-y-1.5 hover:scale-[1.03]"
            >
              <div className="font-display text-[18px] font-extrabold text-white transition-colors group-hover:text-[#8FD9C4] md:text-[20px]">
                {s.v}
              </div>
              <div className="mt-0.5 text-[11px] font-semibold text-white/75 md:text-[11.5px]">{s.l}</div>
            </div>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
