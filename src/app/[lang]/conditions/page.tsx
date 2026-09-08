import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import ConditionsView from "@/components/conditions/ConditionsView";

export default async function ConditionsPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return <ConditionsView lang={lang as Lang} />;
}
