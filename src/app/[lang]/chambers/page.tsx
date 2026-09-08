import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import ChambersView from "@/components/chambers/ChambersView";

export default async function ChambersPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return <ChambersView lang={lang as Lang} />;
}
