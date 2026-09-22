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

const newsItems = [
  { title: "New Batch Enrollment Open", text: "Fresh learning batches are now open for interested learners across selected programs." },
  { title: "Skill-Building Workshops", text: "Hands-on sessions focused on practical application and mentor guidance are being introduced." },
  { title: "Career Support Sessions", text: "New guidance sessions aim to strengthen interview readiness and learning confidence." },
];

export default function NewsEventsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">News & Events</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">Updates, sessions, and opportunities for our learners.</h1>

        <div className="mt-10 space-y-6">
          {newsItems.map((item) => (
            <article key={item.title} className="rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-6">
              <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f47d20]">Latest update</p>
              <h2 className="mt-3 text-2xl font-black text-[#0d2d5c]">{item.title}</h2>
              <p className="mt-3 text-slate-600">{item.text}</p>
            </article>
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
