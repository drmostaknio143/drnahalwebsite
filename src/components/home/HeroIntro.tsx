import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, CalendarCheck, PlayCircle, CheckCircle2, Award, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

export default function HeroIntro({ lang }: { lang: Lang }) {
  const t = homeDict[lang].hero;

  return (
    <section className="band-white relative w-full overflow-hidden py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-[1220px] px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Doctor Profile & Credentials */}
          <Reveal className="flex flex-col lg:col-span-7">
            {/* Eyebrow Badge */}
            <div className="mb-4 inline-flex w-fit items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wide text-accent-2 md:text-[12px]">
              <ShieldCheck size={14} className="text-accent" />
              <span>{t.eyebrow}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display text-[28px] font-extrabold leading-[1.18] text-ink sm:text-[36px] md:text-[42px] lg:text-[46px]">
              {t.title}
            </h1>

            {/* Doctor Identity Subcard */}
            <div className="mt-4 rounded-2xl border border-emerald-900/10 bg-emerald-50/50 p-3.5 sm:p-4">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-display text-[18px] font-bold text-accent-2 sm:text-[20px]">
                  {t.doctorName}
                </span>
                <span className="text-[13px] font-semibold text-slate-700">
                  — {t.doctorTitle}
                </span>
              </div>
              <p className="mt-1 text-[12px] font-medium text-emerald-800/90">
                {t.doctorHospital}
              </p>
            </div>

            {/* Bio Paragraph */}
            <p className="mt-4 text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
              {t.sub}
            </p>

            {/* Core Surgical Competencies Pills */}
            <div className="mt-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {t.competencies.map((comp) => (
                <div
                  key={comp}
                  className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 bg-slate-50/70 px-3.5 py-2 text-[12.5px] font-medium text-ink transition-all hover:border-accent/40 hover:bg-white hover:shadow-xs sm:text-[13px]"
                >
                  <CheckCircle2 size={15} className="shrink-0 text-accent" />
                  <span className="line-clamp-1">{comp}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <Link
                href={`/${lang}/contact`}
                className="btn-pill btn-primary shadow-sm transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                <CalendarCheck size={16} />
                <span>{t.cta1}</span>
              </Link>
              <Link
                href={`/${lang}/videos`}
                className="btn-pill btn-ghost border border-slate-300/80 hover:bg-slate-100"
              >
                <PlayCircle size={16} />
                <span>{t.cta2}</span>
              </Link>
            </div>

            {/* Trust Badges Row */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-slate-200/70 pt-5 text-[12.5px] text-ink-muted">
              {t.stats.map((s) => (
                <div key={s.label} className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-accent-2">{s.value}</span>
                  <span className="text-[12px] text-slate-500">({s.label})</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right Column: Doctor Portrait with Floating Badges */}
          <Reveal className="relative mx-auto w-full max-w-[440px] lg:col-span-5 lg:max-w-none" delay={100}>
            {/* Ambient subtle glow background */}
            <div
              className="absolute -inset-3 rounded-3xl bg-gradient-to-tr from-accent/25 via-teal-600/10 to-transparent opacity-70 blur-2xl"
              aria-hidden="true"
            />

            {/* Main Portrait Card */}
            <div className="relative overflow-hidden rounded-3xl border border-emerald-900/15 bg-white shadow-xl">
              <div className="relative h-[440px] w-full sm:h-[480px] lg:h-[510px]">
                <Image
                  src="/images/doctor-s-images/dr-nahal-portrait.jpg"
                  alt={t.doctorName}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 440px"
                  priority
                  className="object-cover object-top"
                />
              </div>

              {/* Floating Badge 1: Top Left Experience */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full border border-white/70 bg-white/95 px-3.5 py-1.5 text-[12px] font-bold text-slate-800 shadow-md backdrop-blur-md">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                </span>
                <span>{t.experienceBadge}</span>
              </div>

              {/* Floating Badge 2: Bottom Role Card */}
              <div className="absolute inset-x-3.5 bottom-3.5 rounded-2xl border border-white/30 bg-slate-900/85 p-3.5 text-white shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Award size={16} className="text-emerald-300 shrink-0" />
                  <span className="text-[13px] font-bold tracking-wide text-white">
                    {t.roleBadge}
                  </span>
                </div>
                <div className="mt-0.5 text-[11.5px] font-medium text-slate-300">
                  {t.institutionBadge}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
