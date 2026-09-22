import { getSiteContent } from "@/lib/site-content";

const pillars = [
  { title: "Mission", text: "To deliver meaningful, practical, and career-oriented training that helps learners succeed with confidence." },
  { title: "Vision", text: "To become a trusted center for quality education, skill development, and professional growth." },
  { title: "Values", text: "We focus on discipline, practical learning, mentorship, and an environment that supports long-term growth." },
];

export default async function VisionPage() {
  const siteContent = await getSiteContent();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">Our vision</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">Creating brighter futures through purposeful education.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          {siteContent.aboutText}
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <div key={pillar.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-[#f47d20]">{pillar.title}</p>
            <h2 className="mt-3 text-2xl font-black text-[#0d2d5c]">{pillar.title}</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">{pillar.text}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
