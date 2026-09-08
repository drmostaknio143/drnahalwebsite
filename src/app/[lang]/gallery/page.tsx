import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import GalleryView from "@/components/gallery/GalleryView";

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return <GalleryView lang={lang as Lang} />;
}
