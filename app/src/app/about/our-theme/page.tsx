import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();

  return {
    title: siteContent.aboutMetaTitle,
    description: siteContent.aboutMetaDescription,
  };
}

export default async function OurThemePage() {
  const siteContent = await getSiteContent();
  const themeCards = Array.isArray(siteContent.ourThemeCards) ? siteContent.ourThemeCards : [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">Our Theme</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">{siteContent.ourThemeTitle}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{siteContent.ourThemeText}</p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {themeCards.map((card) => (
            <div key={card.title} className="rounded-2xl bg-[#edf4ff] p-6">
              <h2 className="text-xl font-black text-[#0d2d5c]">{card.title}</h2>
              <p className="mt-3 text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/about" className="rounded-full bg-[#0d2d5c] px-5 py-2.5 text-sm font-bold text-white">
            Back to About
          </Link>
        </div>
      </div>
    </main>
  );
}
