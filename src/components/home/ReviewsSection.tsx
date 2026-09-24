import { Star, BadgeCheck } from "lucide-react";
import Reveal from "@/components/Reveal";
import { reviews } from "@/lib/data/reviews";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

export default function ReviewsSection({
  lang,
  reviewsList,
}: {
  lang: Lang;
  reviewsList?: typeof reviews;
}) {
  const t = homeDict[lang].reviews;
  const list = reviewsList && reviewsList.length > 0 ? reviewsList : reviews;
  return (
    <div className="band-white w-full py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mx-auto mb-9 max-w-[640px] text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-accent-2">
            <BadgeCheck size={14} /> {t.eyebrow}
          </div>
          <h2 className="font-display text-[24px] font-bold md:text-[28px]">{t.title}</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {list.map((r, i) => (

            <Reveal key={r.id} delay={i * 80}>
              <div className="glass h-full rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1.5">
                <div className="mb-3 flex gap-0.5 text-[#E8A83C]">{"★★★★★"}</div>
                <p className="text-[14px] text-ink">&ldquo;{r.text[lang]}&rdquo;</p>
                <div className="mt-4 flex items-center gap-2.5 text-[12.5px] font-semibold text-ink-muted">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-soft text-[12px] font-bold text-accent">
                    {r.initial}
                  </div>
                  {r.author}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-7 flex items-center justify-center gap-2 text-[13px] font-semibold text-ink-muted">
          <Star size={16} /> {t.rating}
        </Reveal>
      </div>
    </div>
  );
}
