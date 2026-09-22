import Link from "next/link";

export default function NareshItPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">About Ramesh IT</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">A learning institute built around skill, confidence, and growth.</h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Ramesh IT is a training-focused platform designed to help learners build strong fundamentals, gain practical exposure, and move confidently toward career opportunities in the technology space.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-[#edf4ff] p-6">
            <h2 className="text-xl font-black text-[#0d2d5c]">Our mission</h2>
            <p className="mt-3 text-slate-600">
              To make quality education accessible, practical, and outcome-oriented for students, job seekers, and working professionals.
            </p>
          </div>
          <div className="rounded-2xl bg-[#fff7f0] p-6">
            <h2 className="text-xl font-black text-[#0d2d5c]">Our approach</h2>
            <p className="mt-3 text-slate-600">
              We combine guided learning, mentor support, and modern teaching practices to ensure each learner gets real value from the program.
            </p>
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
