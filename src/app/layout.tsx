import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hind = Hind_Siliguri({
  variable: "--font-hind",
  subsets: ["bengali", "latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Dr. Nahal Mostak Khan Arnob — An Nahar Eye Care",
  description:
    "Consultant Vitreoretinal, Cataract & Refractive Surgeon in Dhaka. FRCS (Glasgow), FCPS (Ophthalmology), GMC UK Registered.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html className={`${sora.variable} ${jakarta.variable} ${hind.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
