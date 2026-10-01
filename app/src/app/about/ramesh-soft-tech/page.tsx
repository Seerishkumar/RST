import type { Metadata } from "next";
import Link from "next/link";
import { RichTextBlock } from "@/components/rich-text-block";
import { getSiteContent } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();

  return {
    title: siteContent.aboutMetaTitle,
    description: siteContent.aboutMetaDescription,
  };
}

export default async function RameshSoftTechPage() {
  const siteContent = await getSiteContent();

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">About Ramesh Soft Tech</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">{siteContent.rameshSoftTechTitle}</h1>
        <div className="mt-5 rich-text-content">
          <RichTextBlock html={siteContent.rameshSoftTechText} />
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-[#edf4ff] p-6">
            <h2 className="text-xl font-black text-[#0d2d5c]">Our mission</h2>
            <div className="mt-3 rich-text-content text-slate-600">
              <RichTextBlock html={siteContent.rameshSoftTechMission} className="text-slate-600" />
            </div>
          </div>
          <div className="rounded-2xl bg-[#fff7f0] p-6">
            <h2 className="text-xl font-black text-[#0d2d5c]">Our approach</h2>
            <div className="mt-3 rich-text-content text-slate-600">
              <RichTextBlock html={siteContent.rameshSoftTechApproach} className="text-slate-600" />
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/about" className="rounded-full bg-[#0d2d5c] px-5 py-2.5 text-sm font-bold text-white">
            Back to About
          </Link>
          <Link href="/contact" className="rounded-full border border-[#0d2d5c] px-5 py-2.5 text-sm font-bold text-[#0d2d5c]">
            Contact Us
          </Link>
        </div>
      </div>
    </main>
  );
}
