"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Lang } from "@/lib/i18n/types";

type Badge = { pos: string; tag: string; name: string; cause: string };
type Stage = {
  img: string;
  imgMobile: string;
  lead?: string;
  label: string;
  arrow?: boolean;
  badges: Badge[];
  treated?: string;
};

const stagesByLang: Record<Lang, Stage[]> = {
  en: [
    {
      img: "/images/hero/seq-1.jpeg",
      imgMobile: "/images/hero/seq-1-mobile.jpeg",
      label: "This is your natural eye.",
      arrow: true,
      badges: [],
    },
    {
      img: "/images/hero/seq-2.jpeg",
      imgMobile: "/images/hero/seq-2-mobile.jpeg",
      lead: "This area is the",
      label: "Cornea & Iris",
      badges: [
        { pos: "tl", tag: "Can Cause", name: "Pterygium", cause: "From long-term sun & wind exposure" },
        { pos: "tr", tag: "Can Cause", name: "Dry Eye", cause: "From screen time, age, or dry air" },
        { pos: "bl", tag: "Can Cause", name: "Refractive Error", cause: "Cornea doesn't focus light correctly" },
      ],
      treated: "LASIK / PRK / SMILE · Pterygium Surgery",
    },
    {
      img: "/images/hero/seq-3.jpeg",
      imgMobile: "/images/hero/seq-3-mobile.jpeg",
      lead: "This area is the",
      label: "Lens",
      badges: [
        { pos: "tl", tag: "Can Cause", name: "Cataract", cause: "Lens clouds with age or diabetes" },
        { pos: "tr", tag: "Can Cause", name: "Dislocated Lens", cause: "Support weakens from trauma or age" },
      ],
      treated: "Phacoemulsification · Scleral-Fixated IOL",
    },
    {
      img: "/images/hero/seq-4.jpeg",
      imgMobile: "/images/hero/seq-4-mobile.jpeg",
      lead: "This area is the",
      label: "Retina",
      badges: [
        { pos: "tl", tag: "Can Cause", name: "Diabetic Retinopathy", cause: "High blood sugar damages retinal vessels" },
        { pos: "tr", tag: "Can Cause", name: "Retinal Detachment", cause: "A tear lets fluid seep underneath" },
        { pos: "bl", tag: "Can Cause", name: "Macular Disease / CSCR", cause: "Age-related change or stress" },
        { pos: "br", tag: "Can Cause", name: "CRVO / BRVO", cause: "A blocked vein, linked to blood pressure" },
      ],
      treated: "Vitrectomy · Anti-VEGF Injection · Laser",
    },
  ],
  bn: [
    {
      img: "/images/hero/seq-1.jpeg",
      imgMobile: "/images/hero/seq-1-mobile.jpeg",
      label: "এটাই আপনার স্বাভাবিক চোখ",
      arrow: true,
      badges: [],
    },
    {
      img: "/images/hero/seq-2.jpeg",
      imgMobile: "/images/hero/seq-2-mobile.jpeg",
      lead: "এই অংশটি হলো",
      label: "কর্নিয়া ও আইরিস",
      badges: [
        { pos: "tl", tag: "হতে পারে", name: "পিটেরিজিয়াম", cause: "দীর্ঘদিন রোদ ও বাতাসের সংস্পর্শে থাকলে" },
        { pos: "tr", tag: "হতে পারে", name: "ড্রাই আই", cause: "স্ক্রিন টাইম, বয়স, বা শুষ্ক বাতাসের কারণে" },
        { pos: "bl", tag: "হতে পারে", name: "রিফ্র্যাক্টিভ এরর", cause: "কর্নিয়া ঠিকভাবে আলো ফোকাস করতে পারে না" },
      ],
      treated: "লেসিক / পিআরকে / স্মাইল · পিটেরিজিয়াম সার্জারি",
    },
    {
      img: "/images/hero/seq-3.jpeg",
      imgMobile: "/images/hero/seq-3-mobile.jpeg",
      lead: "এই অংশটি হলো",
      label: "লেন্স",
      badges: [
        { pos: "tl", tag: "হতে পারে", name: "ছানি", cause: "বয়স বা ডায়াবেটিসে লেন্স ঘোলা হয়ে যায়" },
        { pos: "tr", tag: "হতে পারে", name: "ডিসলোকেটেড লেন্স", cause: "আঘাত বা বয়সে সাপোর্ট দুর্বল হয়ে গেলে" },
      ],
      treated: "ফ্যাকোইমালসিফিকেশন · স্কেরাল-ফিক্সেটেড IOL",
    },
    {
      img: "/images/hero/seq-4.jpeg",
      imgMobile: "/images/hero/seq-4-mobile.jpeg",
      lead: "এই অংশটি হলো",
      label: "রেটিনা",
      badges: [
        { pos: "tl", tag: "হতে পারে", name: "ডায়াবেটিক রেটিনোপ্যাথি", cause: "উচ্চ সুগার রেটিনার রক্তনালীর ক্ষতি করে" },
        { pos: "tr", tag: "হতে পারে", name: "রেটিনা বিচ্ছিন্নতা", cause: "ছিদ্র দিয়ে তরল ভেতরে ঢুকে যায়" },
        { pos: "bl", tag: "হতে পারে", name: "ম্যাকুলার সমস্যা / CSCR", cause: "বয়সজনিত পরিবর্তন বা মানসিক চাপ" },
        { pos: "br", tag: "হতে পারে", name: "CRVO / BRVO", cause: "শিরা বন্ধ হয়ে যাওয়া, রক্তচাপের সাথে সম্পর্কিত" },
      ],
      treated: "ভিট্রেক্টমি · অ্যান্টি-ভিইজিএফ ইনজেকশন · লেজার",
    },
  ],
};

const posClass: Record<string, string> = {
  tl: "top-[16%] left-[5%] md:top-[20%] md:left-[6%] text-left",
  tr: "top-[16%] right-[5%] md:top-[20%] md:right-[6%] text-right",
  bl: "bottom-[24%] left-[5%] md:bottom-[22%] md:left-[6%] text-left",
  br: "bottom-[24%] right-[5%] md:bottom-[22%] md:right-[6%] text-right",
};

export default function HeroEyeZoom({ lang }: { lang: Lang }) {
  const stages = stagesByLang[lang];
  const frameRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRefs = useRef<HTMLDivElement[][]>([[], [], [], []]);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const frames = frameRefs.current;
    const labels = labelRefs.current;
    const badges = badgeRefs.current;
    const dots = dotRefs.current;

    gsap.set([frames[1], frames[2], frames[3]], { opacity: 0 });
    gsap.set([labels[1], labels[2], labels[3]], { opacity: 0, y: 16 });
    gsap.set([...badges[1], ...badges[2], ...badges[3]], { opacity: 0, y: 10 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { duration: 0.1, ease: "none" },
        scrollTrigger: {
          trigger: pinRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          onUpdate: (self) => {
            const idx = Math.min(3, Math.floor(self.progress * 4));
            dots.forEach((d, i) => d?.classList.toggle("bg-white", i === idx));
            dots.forEach((d, i) => d?.classList.toggle("scale-125", i === idx));
          },
        },
      });

      // Stage 1
      tl.to(labels[0], { opacity: 1, duration: 0.05, ease: "power2.out" }, 0.02)
        .to(labels[0], { opacity: 0, duration: 0.05, ease: "power2.in" }, 0.1)
        .to(frames[0]?.querySelectorAll("img") ?? [], { scale: 1.15, duration: 0.2 }, 0)
        .to(frames[0], { opacity: 0 }, 0.12)

        // Stage 2
        .to(frames[1], { opacity: 1 }, 0.08)
        .to(frames[1]?.querySelectorAll("img") ?? [], { scale: 1.12, duration: 0.28 }, 0.08)
        .to(labels[1], { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, 0.13)
        .to(badges[1], { opacity: 1, y: 0, duration: 0.06, stagger: 0.02, ease: "power2.out" }, 0.16)
        .to(badges[1], { opacity: 0, y: -8, duration: 0.05, stagger: 0.01 }, 0.3)
        .to(labels[1], { opacity: 0, duration: 0.05 }, 0.32)
        .to(frames[1], { opacity: 0 }, 0.34)

        // Stage 3
        .to(frames[2], { opacity: 1 }, 0.3)
        .to(frames[2]?.querySelectorAll("img") ?? [], { scale: 1.18, duration: 0.3 }, 0.3)
        .to(labels[2], { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, 0.36)
        .to(badges[2], { opacity: 1, y: 0, duration: 0.06, stagger: 0.02, ease: "power2.out" }, 0.39)
        .to(badges[2], { opacity: 0, y: -8, duration: 0.05, stagger: 0.01 }, 0.55)
        .to(labels[2], { opacity: 0, duration: 0.05 }, 0.57)
        .to(frames[2], { opacity: 0 }, 0.6)

        // Stage 4
        .to(frames[3], { opacity: 1 }, 0.56)
        .to(frames[3]?.querySelectorAll("img") ?? [], { scale: 1.1, duration: 0.4 }, 0.56)
        .to(labels[3], { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" }, 0.62)
        .to(badges[3], { opacity: 1, y: 0, duration: 0.06, stagger: 0.02, ease: "power2.out" }, 0.66)
        .to({}, { duration: 0.001 }, 1);
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={pinRef} className="relative h-[680vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-bg">
        {stages.map((s, i) => (
          <div
            key={i}
            ref={(el) => {
              frameRefs.current[i] = el;
            }}
            className={`absolute inset-0 flex items-center justify-center ${i === 0 ? "opacity-100" : "opacity-0"}`}
          >
            <img src={s.img} alt={s.label} className="absolute inset-0 hidden h-full w-full object-cover md:block" />
            <img src={s.imgMobile} alt={s.label} className="absolute inset-0 block h-full w-full object-cover md:hidden" />
          </div>
        ))}

        {stages.map((s, i) => (
          <div
            key={`label-${i}`}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className={`pointer-events-none absolute top-1/2 left-1/2 z-10 w-[90%] max-w-[640px] -translate-x-1/2 -translate-y-1/2 text-center ${i === 0 ? "" : "opacity-0"}`}
          >
            {s.lead && (
              <span
                className="mb-1 block font-body text-[13px] font-semibold text-white/85 md:text-[16px]"
                style={{ textShadow: "0 2px 4px rgba(0,0,0,.45), 0 6px 20px rgba(0,0,0,.3)" }}
              >
                {s.lead}
              </span>
            )}
            <h2
              className="font-display text-[24px] font-bold leading-tight text-white md:text-[38px]"
              style={{ textShadow: "0 2px 4px rgba(0,0,0,.45), 0 8px 30px rgba(0,0,0,.35)" }}
            >
              {s.label}
            </h2>
            {s.arrow && (
              <div
                className="mt-3 animate-bounce text-[20px] text-white/90"
                style={{ textShadow: "0 2px 8px rgba(0,0,0,.4)" }}
              >
                ↓
              </div>
            )}
          </div>
        ))}

        {stages.map((s, i) =>
          s.badges.map((b, j) => (
            <div
              key={`badge-${i}-${j}`}
              ref={(el) => {
                if (el && !badgeRefs.current[i].includes(el)) badgeRefs.current[i].push(el);
              }}
              className={`glass-badge absolute z-10 max-w-[150px] rounded-xl px-2.5 py-2 opacity-0 md:max-w-[220px] md:px-3.5 md:py-2.5 ${posClass[b.pos]}`}
            >
              <span className="block text-[9px] font-bold uppercase tracking-wide text-[#8FD9C4] md:text-[10px]">
                {b.tag}
              </span>
              <span className="block text-[11.5px] font-bold leading-snug text-white md:text-[13px]">{b.name}</span>
              <span className="mt-0.5 block text-[9.5px] font-medium leading-snug text-white/90 md:text-[11px]">
                {b.cause}
              </span>
            </div>
          ))
        )}

        {stages.map(
          (s, i) =>
            s.treated && (
              <div
                key={`treated-${i}`}
                ref={(el) => {
                  if (el && !badgeRefs.current[i].includes(el)) badgeRefs.current[i].push(el);
                }}
                className="glass-badge absolute bottom-[15%] left-1/2 z-10 max-w-[88%] -translate-x-1/2 rounded-xl px-4 py-2.5 text-center opacity-0 md:bottom-[9%] md:max-w-[340px]"
              >
                <span className="block text-[10px] font-bold uppercase tracking-wide text-[#8FD9C4]">
                  {lang === "en" ? "Treated with" : "চিকিৎসা"}
                </span>
                <span className="block text-[12.5px] font-semibold text-white">{s.treated}</span>
              </div>
            )
        )}

        <div className="absolute top-1/2 right-6 z-20 flex -translate-y-1/2 flex-col gap-2.5">
          {stages.map((_, i) => (
            <div
              key={`dot-${i}`}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className={`h-2 w-2 rounded-full transition ${i === 0 ? "scale-125 bg-white" : "bg-white/30"}`}
            />
          ))}
        </div>

        <div
          className="absolute bottom-[4%] left-1/2 z-10 -translate-x-1/2 text-[11px] font-semibold uppercase tracking-wide text-white/75"
          style={{ textShadow: "0 1px 6px rgba(0,0,0,.4)" }}
        >
          {lang === "en" ? "Scroll to explore" : "স্ক্রল করে দেখুন"}
        </div>
      </div>
    </div>
  );
}
