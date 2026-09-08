import Image from "next/image";
import {
  GraduationCap,
  Stethoscope,
  Activity,
  Languages,
  Users2,
  CheckCircle2,
  Calendar,
  Sparkles,
  Award,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import { aboutDict } from "@/lib/i18n/about";
import { Lang } from "@/lib/i18n/types";

export default function DoctorProfileSection({ lang }: { lang: Lang }) {
  const t = aboutDict[lang].profile;

  return (
    <section className="band-cream w-full py-16 md:py-24">
      <div className="mx-auto max-w-[1220px] px-6">
        {/* Section Header */}
        <Reveal className="mx-auto mb-14 max-w-[760px] text-center">
          <div className="mb-3.5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-wider text-accent-2">
            <Sparkles size={14} />
            <span>{t.eyebrow}</span>
          </div>
          <h2 className="font-display text-[28px] font-extrabold text-ink sm:text-[36px] md:text-[40px]">
            {t.title}
          </h2>
        </Reveal>

        {/* Clinical Summary & Lecture Image Grid */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Lecture & Teaching Image Card */}
          <Reveal className="relative lg:col-span-5">
            <div className="relative h-full min-h-[380px] overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-lg">
              <Image
                src="/images/doctor-s-images/dr-nahal-lecture.jpg"
                alt="Dr. Nahal presenting medical lecture"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-3 py-1 text-[11.5px] font-bold uppercase tracking-wider backdrop-blur-xs">
                  <GraduationCap size={13} />
                  {t.currentRoleTitle}
                </span>
                <h3 className="mt-2 font-display text-[18px] font-bold leading-snug">
                  {t.currentRole}
                </h3>
                <p className="text-[13px] text-slate-200">{t.currentHospital}</p>
                <div className="mt-2 flex items-center gap-3 text-[11.5px] text-emerald-300">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} /> {t.currentTenure}
                  </span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Professional Summary & Core Philosophy */}
          <Reveal
            className="flex flex-col justify-between rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm lg:col-span-7 sm:p-9"
            delay={80}
          >
            <div>
              <div className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-accent">
                <Stethoscope size={15} />
                <span>{t.summaryTitle}</span>
              </div>
              <h3 className="mt-2 font-display text-[22px] font-bold text-ink sm:text-[26px]">
                {lang === "en"
                  ? "Committed to Restoring Clear Vision & Mentoring Future Surgeons"
                  : "দৃষ্টি সুরক্ষায় নিবেদিত বিশেষজ্ঞ সেবা ও আগামী প্রজন্মের দিকনির্দেশনা"}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-ink-muted sm:text-[16px]">
                {t.summaryBody}
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-3.5 text-center">
                <div className="font-display text-[20px] font-extrabold text-accent-2">8+</div>
                <div className="text-[11.5px] font-medium text-slate-600">
                  {lang === "en" ? "Years Experience" : "বছরের সার্জিক্যাল অভিজ্ঞতা"}
                </div>
              </div>
              <div className="rounded-2xl bg-slate-50 p-3.5 text-center">
                <div className="font-display text-[20px] font-extrabold text-accent-2">1.5 Yr</div>
                <div className="text-[11.5px] font-medium text-slate-600">
                  {lang === "en" ? "Retina Fellowship" : "রেটিনা ফেলোশিপ"}
                </div>
              </div>
              <div className="col-span-2 rounded-2xl bg-slate-50 p-3.5 text-center sm:col-span-1">
                <div className="font-display text-[20px] font-extrabold text-accent-2">FRCS</div>
                <div className="text-[11.5px] font-medium text-slate-600">
                  {lang === "en" ? "Glasgow, UK (2025)" : "গ্লাসগো, যুক্তরাজ্য (২০২৫)"}
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Surgical Procedures & Diseases Treated */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Surgeries Performed */}
          <Reveal className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm sm:p-8">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-accent" />
              <h3 className="font-display text-[19px] font-bold text-ink sm:text-[22px]">
                {t.surgeriesTitle}
              </h3>
            </div>
            <div className="mt-5 flex flex-col gap-2.5">
              {t.surgeries.map((s) => (
                <div
                  key={s}
                  className="flex items-start gap-2.5 rounded-xl bg-slate-50/90 p-3 text-[13px] font-medium text-ink transition-colors hover:bg-emerald-50/60"
                >
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent" />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Specialized Diseases Treated */}
          <Reveal
            className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-sm sm:p-8"
            delay={80}
          >
            <div className="flex items-center gap-2">
              <Stethoscope size={18} className="text-accent" />
              <h3 className="font-display text-[19px] font-bold text-ink sm:text-[22px]">
                {t.diseasesTitle}
              </h3>
            </div>
            <div className="mt-5 flex flex-col gap-2.5">
              {t.diseases.map((d) => (
                <div
                  key={d}
                  className="flex items-start gap-2.5 rounded-xl bg-slate-50/90 p-3 text-[13px] font-medium text-ink transition-colors hover:bg-emerald-50/60"
                >
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-accent" />
                  <span>{d}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Bottom Row: Mentors / References & Languages */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Professional References */}
          <Reveal className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-8 sm:p-7">
            <div className="flex items-center gap-2">
              <Users2 size={18} className="text-accent" />
              <h3 className="font-display text-[18px] font-bold text-ink">
                {t.referencesTitle}
              </h3>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {t.references.map((ref) => (
                <div
                  key={ref.name}
                  className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4"
                >
                  <div className="font-display text-[14.5px] font-bold text-ink">
                    {ref.name}
                  </div>
                  <div className="mt-0.5 text-[12px] font-semibold text-accent">
                    {ref.role}
                  </div>
                  <div className="mt-0.5 text-[11.5px] text-slate-500">
                    {ref.institution}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Languages */}
          <Reveal
            className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-sm lg:col-span-4 sm:p-7"
            delay={80}
          >
            <div className="flex items-center gap-2">
              <Languages size={18} className="text-accent" />
              <h3 className="font-display text-[18px] font-bold text-ink">
                {t.languagesTitle}
              </h3>
            </div>
            <div className="mt-5 flex flex-col gap-2.5">
              {t.languages.map((l) => (
                <div
                  key={l.name}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-3 text-[13px]"
                >
                  <span className="font-bold text-ink">{l.name}</span>
                  <span className="rounded-full bg-accent-soft px-2.5 py-0.5 text-[11.5px] font-bold text-accent-2">
                    {l.level}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
