"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Calendar, Menu, X } from "lucide-react";
import { navDict, practice, bookNow } from "@/lib/i18n/nav";
import { Lang } from "@/lib/i18n/types";

export default function Navbar({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = navDict[lang];
  const restOfPath = pathname.replace(/^\/(en|bn)/, "");

  return (
    <header className="sticky top-3 z-50 mx-auto mt-3 w-[calc(100%-24px)] max-w-[1180px] md:top-4 md:w-[calc(100%-44px)]">
      <div className="glass flex items-center justify-between rounded-[100px] px-4 py-2.5 md:px-6 md:py-3">
        <Link href={`/${lang}`} className="flex min-w-0 flex-col leading-tight">
          <span className="whitespace-nowrap font-display text-[14px] font-bold text-accent sm:text-[15px] md:text-[16px]">
            {practice.doctorShort[lang]}
          </span>
          <span className="hidden whitespace-nowrap text-[11.5px] font-medium text-ink-muted md:block">
            {practice.name[lang]}
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] font-semibold text-ink-muted xl:gap-6 lg:flex">
          {links.slice(1).map((l) => {
            const active = pathname === `/${lang}${l.href}`;
            return (
              <Link
                key={l.href}
                href={`/${lang}${l.href}`}
                className={`whitespace-nowrap transition hover:text-accent ${
                  active ? "text-accent font-bold" : ""
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          {/* Language Switcher */}
          <div className="hidden items-center gap-0.5 rounded-[100px] bg-white p-[3px] text-[12px] font-bold sm:flex">
            <Link
              href={`/en${restOfPath}`}
              className={`rounded-[100px] px-3 py-1.5 transition ${
                lang === "en" ? "bg-accent text-white shadow-sm" : "text-ink-muted hover:text-ink"
              }`}
            >
              EN
            </Link>
            <Link
              href={`/bn${restOfPath}`}
              className={`rounded-[100px] px-3 py-1.5 transition ${
                lang === "bn" ? "bg-accent text-white shadow-sm" : "text-ink-muted hover:text-ink"
              }`}
            >
              BN
            </Link>
          </div>

          {/* CTA pointing to /contact per Section 5.2 */}
          <Link
            href={`/${lang}/contact`}
            className="btn-pill btn-primary text-[12px] md:text-[13px] flex items-center gap-1.5"
          >
            <Calendar size={14} />
            <span className="hidden sm:inline">{bookNow[lang]}</span>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-full p-2 text-accent hover:bg-black/5 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass mt-2 flex flex-col gap-1 rounded-3xl p-4 text-[14px] font-semibold text-ink shadow-lg lg:hidden animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="mb-2 flex items-center justify-between px-2 pb-2 border-b border-black/5">
            <span className="text-[12px] font-bold text-ink-muted uppercase tracking-wider">
              {lang === "en" ? "Menu" : "মেনু"}
            </span>
            <div className="flex items-center gap-1 rounded-full bg-white/70 p-1 text-[11px] font-bold">
              <Link
                href={`/en${restOfPath}`}
                className={`rounded-full px-2.5 py-1 ${lang === "en" ? "bg-accent text-white" : "text-ink-muted"}`}
              >
                EN
              </Link>
              <Link
                href={`/bn${restOfPath}`}
                className={`rounded-full px-2.5 py-1 ${lang === "bn" ? "bg-accent text-white" : "text-ink-muted"}`}
              >
                BN
              </Link>
            </div>
          </div>
          {links.map((l) => (
            <Link
              key={l.href}
              href={`/${lang}${l.href}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2.5 transition hover:bg-white/70 hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
          <div className="mt-2 border-t border-black/5 pt-2 flex flex-col gap-1 text-[12.5px] text-ink-muted">
            <Link
              href={`/${lang}/gallery`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2 transition hover:bg-white/70 hover:text-accent"
            >
              {lang === "en" ? "Gallery" : "গ্যালারি"}
            </Link>
            <Link
              href={`/${lang}/faq`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3.5 py-2 transition hover:bg-white/70 hover:text-accent"
            >
              {lang === "en" ? "Common Questions (FAQ)" : "সাধারণ প্রশ্নোত্তর (FAQ)"}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
