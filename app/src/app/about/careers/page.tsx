import type { Metadata } from "next";
import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";
import { CareersForm } from "@/components/careers-form";

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();

  return {
    title: siteContent.aboutMetaTitle,
    description: siteContent.aboutMetaDescription,
  };
}

export default async function CareersPage() {
  const siteContent = await getSiteContent();
  const careerFocus = Array.isArray(siteContent.careersFocus) ? siteContent.careersFocus : [];

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-[#fff7f0] p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">Careers</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">{siteContent.careersTitle}</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">{siteContent.careersText}</p>

        <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black text-[#0d2d5c]">What we focus on</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            {careerFocus.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </div>

        <CareersForm />

        <div className="mt-8">
          <Link href="/about" className="rounded-full bg-[#0d2d5c] px-5 py-2.5 text-sm font-bold text-white">
            Back to About
          </Link>
        </div>
      </div>
    </main>
  );
}
