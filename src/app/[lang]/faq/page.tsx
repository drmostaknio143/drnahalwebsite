import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import FAQView from "@/components/faq/FAQView";
import { getLiveFaqs } from "@/lib/data/live";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const faqs = await getLiveFaqs();

  return <FAQView lang={lang as Lang} faqsList={faqs} />;
}
