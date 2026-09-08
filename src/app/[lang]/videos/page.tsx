import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import VideoLibraryView from "@/components/videos/VideoLibraryView";

export default async function VideosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return <VideoLibraryView lang={lang as Lang} />;
}
