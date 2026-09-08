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

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <HeroEyeZoom lang={lang} />
      <StatsBand lang={lang} />
      <HeroIntro lang={lang} />
      <AboutTeaser lang={lang} />
      <ReviewsSection lang={lang} />
      <ServicesTeaser lang={lang} />
      <VideoTeaser lang={lang} />
      <GalleryAndSocial lang={lang} />
      <ChambersTeaser lang={lang} />
      <FinalCTA lang={lang} />
    </>
  );
}
