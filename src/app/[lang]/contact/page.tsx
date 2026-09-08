import { Suspense } from "react";
import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import ContactView from "@/components/contact/ContactView";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <Suspense fallback={<div className="min-h-screen py-20 text-center font-display text-ink-muted">Loading contact...</div>}>
      <ContactView lang={lang as Lang} />
    </Suspense>
  );
}
