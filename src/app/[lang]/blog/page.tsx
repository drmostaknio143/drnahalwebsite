import { notFound } from "next/navigation";
import { isLang, Lang } from "@/lib/i18n/types";
import BlogIndexView from "@/components/blog/BlogIndexView";
import { getLiveBlogs } from "@/lib/data/live";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function BlogPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  const blogs = await getLiveBlogs();

  return <BlogIndexView lang={lang as Lang} initialBlogs={blogs} />;
}
