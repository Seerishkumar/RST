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

const testimonials = [
  { name: "A. Kumar", quote: "The sessions were practical, encouraging, and very helpful for my career direction." },
  { name: "R. Nisha", quote: "The training environment made learning easier and more confident for me." },
  { name: "S. Prakash", quote: "I gained more clarity and confidence after joining the course and mentoring support." },
];

export default function TestimonialsPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">Testimonials</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">Learners trust the experience and support they receive.</h1>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <div key={item.name} className="rounded-[1.75rem] border border-slate-200 bg-[#f8fafc] p-6">
              <div className="text-3xl text-[#f47d20]">“</div>
              <p className="mt-2 text-slate-600">{item.quote}</p>
              <p className="mt-5 text-sm font-black uppercase tracking-[0.18em] text-[#0d2d5c]">{item.name}</p>
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
