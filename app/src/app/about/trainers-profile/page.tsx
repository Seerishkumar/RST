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

const trainers = [
  { name: "Mr. Naresh", role: "Founder & Mentor", text: "Guides learners with real-world training methods and career-focused mentoring." },
  { name: "Senior Trainers", role: "Industry Experts", text: "Bring practical, experience-based knowledge to help students connect theory with application." },
  { name: "Support Team", role: "Learning Assistance", text: "Provides guidance throughout the learning journey, from onboarding to completion." },
];

export default async function TrainersProfilePage() {
  const siteContent = await getSiteContent();
  const trainers = Array.isArray(siteContent.trainersList) ? siteContent.trainersList : [];

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">Trainers Profile</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">{siteContent.trainersProfileTitle}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">{siteContent.trainersProfileText}</p>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {trainers.map((trainer) => (
            <div key={trainer.name} className="rounded-[1.75rem] border border-slate-200 bg-[#f8fafc] p-6">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0d2d5c] text-xl font-black text-white">
                {trainer.name.split(" ").map((item) => item[0]).join("").slice(0, 2)}
              </div>
              <h2 className="mt-5 text-xl font-black text-[#0d2d5c]">{trainer.name}</h2>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.18em] text-[#f47d20]">{trainer.role}</p>
              <p className="mt-4 text-slate-600">{trainer.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Link href="/about" className="rounded-full bg-[#0d2d5c] px-5 py-2.5 text-sm font-bold text-white">
            Back to About
          </Link>
        </div>
      </section>
    </main>
  );
}
