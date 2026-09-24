import { notFound } from "next/navigation";
import { isLang } from "@/lib/i18n/types";
import ServicesScroller from "@/components/services/ServicesScroller";
import { getLiveServices } from "@/lib/data/live";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const services = await getLiveServices();

  return <ServicesScroller lang={lang} servicesList={services} />;
}
