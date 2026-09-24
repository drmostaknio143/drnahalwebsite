import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import ConditionsView from "@/components/conditions/ConditionsView";
import { getLiveConditions } from "@/lib/data/live";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ConditionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const conditions = await getLiveConditions();

  return <ConditionsView lang={lang as Lang} conditionsList={conditions} />;
}
