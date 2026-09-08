import Link from "next/link";
import { Home, Film, Eye } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-20 text-center">
      <div className="glass mx-auto max-w-[540px] rounded-3xl p-8 sm:p-12 shadow-sm border border-black/5">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-accent-soft text-accent-2">
          <Eye size={32} />
        </div>
        <span className="font-display text-[14px] font-bold uppercase tracking-widest text-accent-2">
          404 Error
        </span>
        <h1 className="mt-2 font-display text-[30px] font-extrabold text-ink sm:text-[36px]">
          Page Not Found / পেজটি পাওয়া যায়নি
        </h1>
        <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
          The page you are looking for does not exist or may have been moved.
          <br />
          আপনি যে পেজটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি।
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/en"
            className="btn-pill btn-primary inline-flex items-center gap-2 text-[13.5px]"
          >
            <Home size={15} />
            <span>Back to Home / হোমপেজে ফিরে যান</span>
          </Link>
          <Link
            href="/en/videos"
            className="btn-pill btn-ghost inline-flex items-center gap-2 text-[13.5px]"
          >
            <Film size={15} />
            <span>Video Library / ভিডিও লাইব্রেরি</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
