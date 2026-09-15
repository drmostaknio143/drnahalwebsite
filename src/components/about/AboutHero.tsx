"use client";

import Image from "next/image";
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
    <section className="relative w-full overflow-hidden flex flex-col justify-end items-center min-h-[620px] sm:min-h-[720px] md:min-h-[820px] lg:min-h-[880px] xl:min-h-[960px] pb-12 sm:pb-16 md:pb-20 lg:pb-24 pt-48 sm:pt-60 bg-slate-900">
      {/* Full-bleed Doctor Cover Banner Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/1. About the doctor/Cover banner.png"
          alt={t.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_45%] filter brightness-100 contrast-105"
        />
        {/* Soft overlay with subtle bottom gradient for text contrast over white apron */}
        <div className="absolute inset-0 bg-slate-950/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/30 to-transparent" />
      </div>

      {/* Centered Content */}
      <div className="relative z-10 mx-auto max-w-[960px] px-6 text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-slate-950/60 px-4 py-1.5 text-[12px] font-bold uppercase tracking-wider text-emerald-300 shadow-lg backdrop-blur-md">
          <ShieldCheck size={15} className="text-emerald-400" />
          <span>{t.eyebrow}</span>
        </div>
        <h1
          ref={titleRef}
          style={{ perspective: 600 }}
          className="font-display text-[34px] font-extrabold leading-[1.18] text-white sm:text-[46px] md:text-[54px] lg:text-[60px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]"
        >
          {t.title}
        </h1>
        <p className="mx-auto mt-4 max-w-[66ch] text-[16px] sm:text-[18px] font-medium leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {t.sub}
        </p>
      </div>
    </section>
  );
}
