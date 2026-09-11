import Link from "next/link";
import { LogoBadge } from "@/components/logo-badge";

const stats = [
  { value: "10+", label: "Years of Excellence" },
  { value: "25+", label: "Expert Trainers" },
  { value: "5000+", label: "Students Trained" },
  { value: "92%", label: "Placement Success" },
];

const benefits = [
  "Industry-focused curriculum",
  "Hands-on practical training",
  "Mentorship from professionals",
  "Career guidance and placement support",
];

const courses = [
  "Software Development",
  "Web & Mobile App Training",
  "Digital Marketing",
  "Graphic Design",
  "Cloud & Cyber Security",
  "Interview Readiness",
];

export default function HomePage() {
  return (
    <main className="pb-16 text-slate-900">
      <section className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="grid items-center gap-10 rounded-[2rem] bg-white p-6 shadow-[0_20px_45px_rgba(13,45,92,0.06)] ring-1 ring-slate-200 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-[#f47d20]/30 bg-[#fff4eb] px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-[#d95d0a]">
              Learn • Grow • Succeed
            </p>
            <h1 className="max-w-xl text-4xl font-black leading-tight text-[#0d2d5c] sm:text-5xl lg:text-6xl">
              Empowering future-ready careers through skill-based training.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">
              We help students and professionals build confidence, real-world skills, and career momentum through practical, mentor-led learning.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/course" className="inline-flex rounded-full bg-gradient-to-r from-[#f47d20] to-[#dd6210] px-6 py-3 text-base font-bold text-white shadow-[0_14px_28px_rgba(244,125,32,0.28)] transition hover:scale-[1.02]">
                Explore Courses
              </Link>
              <Link href="/about" className="inline-flex rounded-full border border-[#0d2d5c] bg-white px-6 py-3 text-base font-bold text-[#0d2d5c] transition hover:bg-[#0d2d5c] hover:text-white">
                Learn More
              </Link>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-4 text-center shadow-sm">
                  <div className="text-2xl font-black text-[#0d2d5c]">{item.value}</div>
                  <div className="mt-1 text-[0.7rem] font-semibold text-slate-600">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center">
            <LogoBadge className="w-full max-w-[520px]" />
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[2rem] bg-[#0d2d5c] p-8 text-white shadow-[0_24px_45px_rgba(13,45,92,0.12)] md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-200">About us</p>
            <h2 className="mt-4 text-3xl font-black">A trusted place for learning and growth.</h2>
            <p className="mt-4 text-base leading-7 text-slate-200">
              Ramesh Soft Tech Academy creates a supportive learning ecosystem designed to build confidence, skills, and career direction with real-world relevance.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {benefits.map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm">
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4eb] text-xl text-[#f47d20]">
                  ✓
                </div>
                <p className="text-lg font-bold text-[#0d2d5c]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f47d20]">Popular programs</p>
          <h2 className="mt-2 text-3xl font-black text-[#0d2d5c] sm:text-4xl">Courses designed for real career impact</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {courses.map((course, index) => (
            <article key={course} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ff] text-xl font-black text-[#0d2d5c]">
                0{index + 1}
              </div>
              <h3 className="text-xl font-black text-[#0d2d5c]">{course}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                Structured learning to help learners gain confidence, expertise, and real-world readiness for modern career pathways.
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <div className="mb-8 text-center">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f47d20]">Our strength</p>
            <h2 className="mt-2 text-3xl font-black text-[#0d2d5c]">Why students choose RST</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-[#f8fbff] p-6">
              <div className="text-3xl font-black text-[#0d2d5c]">01</div>
              <h3 className="mt-3 text-xl font-black text-[#0d2d5c]">Career-focused</h3>
              <p className="mt-2 text-slate-600">Training shaped around real market demand and practical growth.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-[#fff8f2] p-6">
              <div className="text-3xl font-black text-[#0d2d5c]">02</div>
              <h3 className="mt-3 text-xl font-black text-[#0d2d5c]">Expert support</h3>
              <p className="mt-2 text-slate-600">Mentors and trainers guide learners from basics to confidence.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-[#f4f9f5] p-6">
              <div className="text-3xl font-black text-[#0d2d5c]">03</div>
              <h3 className="mt-3 text-xl font-black text-[#0d2d5c]">Practical results</h3>
              <p className="mt-2 text-slate-600">Hands-on projects and support to make learning actionable.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 rounded-[2rem] bg-[#0d2d5c] p-8 text-white lg:grid-cols-[1fr_0.7fr] md:p-10">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-200">Get started</p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">Take the next step toward your future.</h2>
            <p className="mt-4 max-w-xl text-slate-200">
              Connect with us to learn more about our programs, training batches, and enrollment support.
            </p>
          </div>

          <div className="rounded-[1.5rem] bg-white p-6 text-slate-900">
            <div className="mb-4 text-sm font-black uppercase tracking-[0.22em] text-[#0d2d5c]">Contact</div>
            <div className="space-y-3 text-sm text-slate-600">
              <p><span className="font-bold text-[#0d2d5c]">Phone:</span> +91 98765 43210</p>
              <p><span className="font-bold text-[#0d2d5c]">Email:</span> info@rameshsofttechacademy.com</p>
              <p><span className="font-bold text-[#0d2d5c]">Address:</span> Your location here</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
