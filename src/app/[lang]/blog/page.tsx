import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import BlogIndexView from "@/components/blog/BlogIndexView";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return <BlogIndexView lang={lang as Lang} />;
}
