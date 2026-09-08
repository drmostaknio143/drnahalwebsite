import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/types";
import ServicesScroller from "@/components/services/ServicesScroller";

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return <ServicesScroller lang={lang} />;
}
