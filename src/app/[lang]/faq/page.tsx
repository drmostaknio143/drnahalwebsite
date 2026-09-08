import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import FAQView from "@/components/faq/FAQView";

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return <FAQView lang={lang as Lang} />;
}
