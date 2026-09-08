import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { isLang } from "@/lib/i18n/types";

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "bn" }];
}

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();

  return (
    <div lang={lang} className="flex min-h-full flex-1 flex-col">
      <Navbar lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </div>
  );
}
