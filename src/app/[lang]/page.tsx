import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/types";
import HeroIntro from "@/components/home/HeroIntro";
import HeroEyeZoom from "@/components/HeroEyeZoom";
import StatsBand from "@/components/home/StatsBand";
import AboutTeaser from "@/components/home/AboutTeaser";
import ReviewsSection from "@/components/home/ReviewsSection";
import ServicesTeaser from "@/components/home/ServicesTeaser";
import VideoTeaser from "@/components/home/VideoTeaser";
import GalleryAndSocial from "@/components/home/GalleryAndSocial";
import ChambersTeaser from "@/components/home/ChambersTeaser";
import FinalCTA from "@/components/home/FinalCTA";
import {
  getLiveServices,
  getLiveReviews,
  getLiveVideos,
  getLiveGallery,
  getLiveChambers,
} from "@/lib/data/live";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const [services, reviews, videos, gallery, chambers] = await Promise.all([
    getLiveServices(),
    getLiveReviews(),
    getLiveVideos(),
    getLiveGallery(),
    getLiveChambers(),
  ]);

  const previewGallery = gallery.slice(0, 4).map((g) => ({
    id: g.id,
    src: g.src,
    caption: g.caption[lang] || g.caption.en,
  }));

  return (
    <>
      <HeroEyeZoom lang={lang} />
      <StatsBand lang={lang} />
      <HeroIntro lang={lang} />
      <AboutTeaser lang={lang} />
      <ReviewsSection lang={lang} reviewsList={reviews} />
      <ServicesTeaser lang={lang} servicesList={services} />
      <VideoTeaser lang={lang} videosList={videos} />
      <GalleryAndSocial lang={lang} previewItems={previewGallery} />
      <ChambersTeaser lang={lang} chambersList={chambers} />
      <FinalCTA lang={lang} />
    </>
  );
}
