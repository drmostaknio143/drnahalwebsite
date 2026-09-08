import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/types";
import AboutHero from "@/components/about/AboutHero";
import RoadmapTimeline from "@/components/about/RoadmapTimeline";
import AboutClosingCTA from "@/components/about/AboutClosingCTA";

export default async function AboutPage({ params }: PageProps<"/[lang]/about">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <>
      <AboutHero lang={lang} />
      <RoadmapTimeline lang={lang} />
      <AboutClosingCTA lang={lang} />
    </>
  );
}
