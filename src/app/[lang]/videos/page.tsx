import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import VideoLibraryView from "@/components/videos/VideoLibraryView";
import { getLiveVideos } from "@/lib/data/live";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VideosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const videos = await getLiveVideos();

  return <VideoLibraryView lang={lang as Lang} videosList={videos} />;
}
