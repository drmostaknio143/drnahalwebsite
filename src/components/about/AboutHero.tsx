"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ShieldCheck } from "lucide-react";
import { Lang } from "@/lib/i18n/types";
import { aboutDict } from "@/lib/i18n/about";

export default function AboutHero({ lang }: { lang: Lang }) {
  const t = aboutDict[lang];
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(SplitText);
    if (!titleRef.current) return;

    const split = SplitText.create(titleRef.current, {
      type: "words",
      wordsClass: "inline-block will-change-transform",
    });

    gsap.set(split.words, { opacity: 0, y: 30, rotateX: -40 });
    gsap.to(split.words, {
      opacity: 1,
      y: 0,
      rotateX: 0,
      duration: 0.7,
      stagger: 0.045,
      ease: "back.out(1.6)",
      delay: 0.1,
    });

    return () => split.revert();
  }, [lang]);

  return (
    <div className="band-white w-full pb-6 pt-14 md:pt-16">
      <div className="mx-auto max-w-[820px] px-6 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-wide text-accent-2 md:text-[12.5px]">
          <ShieldCheck size={14} /> {t.eyebrow}
        </div>
        <h1
          ref={titleRef}
          style={{ perspective: 600 }}
          className="font-display text-[32px] font-bold leading-tight text-ink md:text-[48px]"
        >
          {t.title}
        </h1>
        <p className="mx-auto mt-4 max-w-[54ch] text-[15px] text-ink-muted md:text-[16px]">{t.sub}</p>
      </div>
    </div>
  );
}
