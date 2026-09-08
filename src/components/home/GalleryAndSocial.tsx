import Link from "next/link";
import { Image as ImageIcon, Images, ThumbsUp, Video, Camera, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import { galleryPreview } from "@/lib/data/gallery";
import { homeDict } from "@/lib/i18n/home";
import { Lang } from "@/lib/i18n/types";

export default function GalleryAndSocial({ lang }: { lang: Lang }) {
  const t = homeDict[lang].gallery;
  return (
    <div className="band-teal w-full py-16">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal className="mx-auto mb-9 max-w-[640px] text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[12.5px] font-bold uppercase tracking-wide text-white">
            <ImageIcon size={14} /> {t.eyebrow}
          </div>
          <h2 className="font-display text-[24px] font-bold md:text-[28px]">{t.title}</h2>
          <p className="mt-2 text-[14.5px] text-white/80">{t.sub}</p>
        </Reveal>

        <Reveal className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
          {galleryPreview.map((g) => (
            <div key={g.id} className="group relative aspect-square overflow-hidden rounded-2xl">
              <img
                src={g.src}
                alt={g.caption}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-8 text-center">
          <Link href={`/${lang}/gallery`} className="btn-pill btn-light inline-flex">
            <Images size={15} /> {t.cta}
          </Link>
        </Reveal>

        <Reveal className="glass-on-dark mt-9 flex flex-wrap items-center justify-between gap-4 rounded-3xl px-7 py-5">
          <div>
            <b className="block font-display text-[16px] text-white">{t.followTitle}</b>
            <span className="text-[12.5px] text-white/75">{t.followSub}</span>
          </div>
          <div className="flex gap-2.5">
            {[ThumbsUp, Video, Camera, MessageCircle].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/16 text-white transition hover:scale-110 hover:bg-white/28"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}
