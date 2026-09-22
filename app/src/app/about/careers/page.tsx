import Link from "next/link";

export default function CareersPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">Careers</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">Career opportunities start with the right foundation.</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          We help learners develop the skills, confidence, and practical understanding needed to pursue new roles, internships, and long-term career growth opportunities.
        </p>

        <div className="mt-8 rounded-2xl bg-[#fff7f0] p-6">
          <h2 className="text-xl font-black text-[#0d2d5c]">What we focus on</h2>
          <ul className="mt-4 space-y-3 text-slate-600">
            <li>• Strong fundamentals and practical exposure</li>
            <li>• Communication and problem-solving strength</li>
            <li>• Industry-relevant preparation for real career growth</li>
          </ul>
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
