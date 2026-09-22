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

const values = [
  "Career-focused learning paths",
  "Practical mentoring and industry exposure",
  "Personal guidance for real growth",
  "Supportive environment for long-term success",
];

export default async function AboutPage() {
  const siteContent = await getSiteContent();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">About us</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">{siteContent.aboutTitle}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{siteContent.aboutText}</p>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[2rem] bg-[#0d2d5c] p-8 text-white shadow-[0_24px_45px_rgba(13,45,92,0.12)]">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-200">Our story</p>
          <h2 className="mt-4 text-3xl font-black">A place where skills turn into confidence.</h2>
          <p className="mt-4 text-base leading-7 text-slate-200">
            We believe in an education model that blends technical learning, mentor support, and a strong focus on practical exposure. From students to working professionals, our mission is to make learning useful, accessible, and career oriented.
          </p>
        </div>

        <div className="rounded-[2rem] bg-[#fff7f0] p-8 ring-1 ring-[#f8dec8]">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f47d20]">Why choose us</p>
          <ul className="mt-5 space-y-4">
            {values.map((value) => (
              <li key={value} className="flex items-start gap-3 text-slate-700">
                <span className="mt-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#f47d20] text-xs font-black text-white">✓</span>
                <span className="text-base font-medium">{value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          ["10+", "Years of training excellence"],
          ["25+", "Experienced mentors"],
          ["5000+", "Learners guided"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 text-center shadow-sm">
            <div className="text-4xl font-black text-[#0d2d5c]">{value}</div>
            <p className="mt-2 text-sm font-medium text-slate-600">{label}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-[2rem] bg-[#edf4ff] p-8 ring-1 ring-blue-100">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0d2d5c]">Explore more</p>
        <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {[
            ["About Ramesh Soft Tech", "/about/ramesh-soft-tech"],
            ["Trainers Profile", "/about/trainers-profile"],
            ["Our Theme", "/about/our-theme"],
            ["Careers", "/about/careers"],
            ["Testimonials", "/about/testimonials"],
            ["News & Events", "/about/news-events"],
          ].map(([title, href]) => (
            <Link
              key={title}
              href={href}
              className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-sm font-semibold text-[#0d2d5c] transition hover:border-[#0d2d5c] hover:bg-[#f8fbff]"
            >
              {title}
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-[2rem] bg-[#edf4ff] p-8 text-center ring-1 ring-blue-100">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#0d2d5c]">Ready to start?</p>
        <h3 className="mt-3 text-2xl font-black text-[#0d2d5c] sm:text-3xl">Let us help you take the next step in your learning journey.</h3>
        <Link href="/contact" className="mt-6 inline-flex rounded-full bg-gradient-to-r from-[#f47d20] to-[#dd6210] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(244,125,32,0.32)]">
          Book a Consultation
        </Link>
      </section>
    </main>
  );
}
