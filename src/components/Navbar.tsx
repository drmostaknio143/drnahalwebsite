"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { navDict, practice, bookNow, whatsappHref } from "@/lib/i18n/nav";
import { Lang } from "@/lib/i18n/types";

export default function Navbar({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const links = navDict[lang];
  const otherLang: Lang = lang === "en" ? "bn" : "en";
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

        <nav className="hidden items-center gap-6 text-[13.5px] font-semibold text-ink-muted lg:flex">
          {links.slice(1).map((l) => (
            <Link key={l.href} href={`/${lang}${l.href}`} className="whitespace-nowrap transition hover:text-accent">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-0.5 rounded-[100px] bg-white p-[3px] text-[12px] font-bold sm:flex">
            <Link
              href={`/en${restOfPath}`}
              className={`rounded-[100px] px-3 py-1.5 ${lang === "en" ? "bg-accent text-white" : "text-ink-muted"}`}
            >
              EN
            </Link>
            <Link
              href={`/bn${restOfPath}`}
              className={`rounded-[100px] px-3 py-1.5 ${lang === "bn" ? "bg-accent text-white" : "text-ink-muted"}`}
            >
              BN
            </Link>
          </div>

          <a
            href={whatsappHref(lang)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-pill btn-primary text-[12px] md:text-[13.5px]"
          >
            <Phone size={15} />
            <span className="hidden sm:inline">{bookNow[lang]}</span>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-full p-2 text-accent lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="glass mt-2 flex flex-col gap-1 rounded-3xl p-4 text-[14px] font-semibold text-ink lg:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={`/${lang}${l.href}`}
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-2.5 transition hover:bg-white/50 hover:text-accent"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
