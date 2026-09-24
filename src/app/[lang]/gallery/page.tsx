import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import GalleryView from "@/components/gallery/GalleryView";
import { getLiveGallery } from "@/lib/data/live";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const items = await getLiveGallery();

  return <GalleryView lang={lang as Lang} initialItems={items} />;
}
