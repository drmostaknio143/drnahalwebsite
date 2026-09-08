import Image from "next/image";
import Link from "next/link";
import { UserRound, ArrowRight, CheckCircle2, GraduationCap, Stethoscope } from "lucide-react";
import Reveal from "@/components/Reveal";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

export default function AboutTeaser({ lang }: { lang: Lang }) {
  const t = homeDict[lang].about;

  return (
    <section className="band-cream w-full py-16 md:py-20">
      <div className="mx-auto max-w-[1220px] px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Teaching & Academic Photo */}
          <Reveal className="relative mx-auto w-full max-w-[480px] lg:col-span-5 lg:max-w-none">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-xl">
              <div className="relative h-[380px] w-full sm:h-[420px] lg:h-[460px]">
                <Image
                  src="/images/doctor-s-images/dr-nahal-teaching.jpg"
                  alt="Dr. Nahal Mostak Khan Arnob teaching at Enam Medical College"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 460px"
                  className="object-cover object-center"
                />
              </div>

              {/* Floating Top Badge: Academic Position */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/80 bg-slate-900/85 px-3.5 py-1.5 text-[11.5px] font-bold text-white shadow-md backdrop-blur-md">
                <GraduationCap size={15} className="text-emerald-300" />
                <span>{t.teachingRole}</span>
              </div>

              {/* Floating Bottom Card: Dual Fellowship & Practice */}
              <div className="absolute inset-x-3.5 bottom-3.5 rounded-2xl border border-white/60 bg-white/95 p-3.5 shadow-lg backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Stethoscope size={16} className="text-accent shrink-0" />
                  <span className="text-[12.5px] font-bold text-ink">
                    {t.fellowshipInstitute}
                  </span>
                </div>
                <div className="mt-0.5 text-[11.5px] font-medium text-ink-muted">
                  {t.fellowshipLabel} · {t.experienceLabel}
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Editorial & Surgical Highlights */}
          <Reveal className="flex flex-col lg:col-span-7" delay={80}>
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wide text-accent-2 md:text-[12px]">
              <UserRound size={14} className="text-accent" />
              <span>{t.eyebrow}</span>
            </div>

            <h2 className="font-display text-[26px] font-bold leading-tight text-ink sm:text-[32px] md:text-[36px]">
              {t.title}
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
              {t.body}
            </p>

            {/* Highlights Grid */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {t.highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-start gap-2.5 rounded-xl border border-slate-200/70 bg-white/80 p-3 text-[13px] font-medium text-ink shadow-2xs transition-colors hover:border-accent/40"
                >
                  <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-accent" />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="mt-8">
              <Link
                href={`/${lang}/about`}
                className="btn-pill btn-primary group inline-flex items-center gap-2 shadow-sm transition-all hover:shadow-md"
              >
                <span>{t.cta}</span>
                <ArrowRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
