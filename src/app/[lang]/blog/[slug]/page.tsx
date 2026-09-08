import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ShieldAlert, User, CheckCircle2, ChevronRight } from "lucide-react";
import { blogPosts } from "@/lib/data/blogs";
import { isLang, Lang } from "@/lib/i18n/types";
import { practice } from "@/lib/i18n/nav";

export async function generateStaticParams() {
  const languages: Lang[] = ["en", "bn"];
  const params: { lang: Lang; slug: string }[] = [];
  for (const lang of languages) {
    for (const post of blogPosts) {
      params.push({ lang, slug: post.slug });
    }
  }
  return params;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  if (!isLang(lang)) notFound();

  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  const isEn = lang === "en";

  return (
    <div className="min-h-screen py-10 md:py-16">
      <div className="mx-auto max-w-[840px] px-6">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-[12.5px] font-semibold text-ink-muted">
          <Link href={`/${lang}`} className="hover:text-accent">
            {isEn ? "Home" : "হোম"}
          </Link>
          <ChevronRight size={12} />
          <Link href={`/${lang}/blog`} className="hover:text-accent">
            {isEn ? "Blog" : "ব্লগ"}
          </Link>
          <ChevronRight size={12} />
          <span className="truncate max-w-[280px] text-accent">
            {post.category[lang as Lang]}
          </span>
        </div>

        {/* Back Link */}
        <Link
          href={`/${lang}/blog`}
          className="mb-6 inline-flex items-center gap-2 text-[13px] font-bold text-accent hover:underline"
        >
          <ArrowLeft size={14} />
          <span>{isEn ? "Back to All Articles" : "সকল প্রবন্ধে ফিরে যান"}</span>
        </Link>

        {/* Article Header */}
        <header className="mb-8">
          <span className="inline-block rounded-full bg-accent-soft px-3.5 py-1 text-[12px] font-bold uppercase tracking-wider text-accent-2">
            {post.category[lang as Lang]}
          </span>
          <h1 className="mt-3.5 font-display text-[28px] font-extrabold leading-tight text-ink sm:text-[36px] md:text-[42px]">
            {post.title[lang as Lang]}
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-[13px] text-ink-muted border-b border-black/5 pb-5">
            <span className="flex items-center gap-1.5 font-semibold text-ink">
              <User size={14} className="text-accent" />
              <span>{practice.doctorShort[lang as Lang]}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              <span>{post.readTime[lang as Lang]}</span>
            </span>
            <span>·</span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} />
              <span>{post.date}</span>
            </span>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative mb-10 aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-900 shadow-md">
          <Image
            src={post.image}
            alt={post.title[lang as Lang]}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 840px) 100vw, 840px"
          />
        </div>

        {/* Emergency Callout if present */}
        {post.emergencyCallout && (
          <div className="mb-8 rounded-2xl border border-rose-200 bg-rose-50/90 p-5 text-rose-950 flex items-start gap-3 shadow-xs">
            <ShieldAlert size={22} className="mt-0.5 shrink-0 text-rose-600" />
            <div>
              <h3 className="text-[14.5px] font-bold text-rose-900">
                {isEn ? "Urgent Medical Alert" : "জরুরি মেডিকেল সতর্কতা"}
              </h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-rose-800">
                {post.emergencyCallout[lang as Lang]}
              </p>
            </div>
          </div>
        )}

        {/* Article Body */}
        <article className="glass rounded-3xl p-7 sm:p-10 shadow-sm border border-black/5 text-ink leading-relaxed">
          <div className="flex flex-col gap-7 text-[15.5px] sm:text-[16.5px]">
            {post.sections.map((sec, idx) => (
              <section key={idx} className="flex flex-col gap-3">
                {sec.heading && (
                  <h2 className="font-display text-[20px] font-bold text-ink sm:text-[24px] pt-2">
                    {sec.heading[lang as Lang]}
                  </h2>
                )}
                <p className="whitespace-pre-line leading-relaxed text-ink/90">
                  {sec.content[lang as Lang]}
                </p>
                {sec.bulletPoints && (
                  <ul className="mt-2 flex flex-col gap-2 rounded-2xl bg-white/60 p-4 border border-black/5">
                    {sec.bulletPoints[lang as Lang].map((bp, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-[14.5px]">
                        <CheckCircle2 size={16} className="mt-1 shrink-0 text-accent" />
                        <span>{bp}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* Author Card */}
          <div className="mt-12 rounded-2xl bg-white/80 p-6 border border-black/5 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent">
                <User size={28} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-accent-2">
                  {isEn ? "Reviewed & Authored by" : "লেখক ও বিশেষজ্ঞ চিকিৎসক"}
                </span>
                <h3 className="font-display text-[17px] font-bold text-ink">
                  {practice.doctor[lang as Lang]}
                </h3>
                <p className="text-[12.5px] text-ink-muted">
                  {practice.designation[lang as Lang]}
                </p>
                <p className="text-[11.5px] text-ink-muted/80">
                  {practice.institution[lang as Lang]}
                </p>
              </div>
            </div>
          </div>

          {/* Closing Cross-Links & CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 border-t border-black/10 pt-6">
            {post.relatedConditionSlug && (
              <Link
                href={`/${lang}/conditions`}
                className="text-[13px] font-bold text-accent hover:underline"
              >
                {isEn ? "← Explore Related Conditions" : "← সংশ্লিষ্ট রোগের তথ্য দেখুন"}
              </Link>
            )}
            <Link
              href={`/${lang}/contact`}
              className="btn-pill btn-primary text-center text-[13.5px]"
            >
              {isEn ? "Book an Appointment" : "অ্যাপয়েন্টমেন্ট নিন"}
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
