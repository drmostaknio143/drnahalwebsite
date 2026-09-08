import { Phone, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import { practice, whatsappHref } from "@/lib/i18n/nav";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

export default function FinalCTA({ lang }: { lang: Lang }) {
  const t = homeDict[lang].finalCta;
  return (
    <div className="band-teal w-full py-16 text-center">
      <div className="mx-auto max-w-[640px] px-6">
        <Reveal>
          <h2 className="font-display text-[26px] font-bold text-white md:text-[36px]">{t.title}</h2>
          <p className="mt-3 text-[15px] text-white/85">{t.sub}</p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3.5">
            <a href={`tel:${practice.whatsapp}`} className="btn-pill btn-light">
              <Phone size={15} /> {t.call} {practice.phone}
            </a>
            <a href={whatsappHref(lang)} target="_blank" rel="noopener noreferrer" className="btn-pill glass-on-dark text-white">
              <MessageCircle size={15} /> {t.whatsapp}
            </a>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
