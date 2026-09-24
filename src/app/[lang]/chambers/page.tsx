import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import ChambersView from "@/components/chambers/ChambersView";
import { getLiveChambers } from "@/lib/data/live";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ChambersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const chambers = await getLiveChambers();

  return <ChambersView lang={lang as Lang} chambersList={chambers} />;
}
