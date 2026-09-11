const courses = [
  {
    title: "Software Development",
    description: "Master front-end and back-end development with practical, project-driven learning.",
  },
  {
    title: "Web & Mobile App Training",
    description: "Learn to build responsive digital products that work across mobile and web platforms.",
  },
  {
    title: "Digital Marketing",
    description: "Understand branding, SEO, social strategy, and performance marketing in real campaigns.",
  },
  {
    title: "Graphic Design",
    description: "Build creative skills using modern design tools and storytelling techniques.",
  },
  {
    title: "Cloud & Cyber Security",
    description: "Explore cloud fundamentals, security awareness, and digital protection best practices.",
  },
  {
    title: "Interview Readiness",
    description: "Prepare for professional opportunities with communication, confidence, and mock interview coaching.",
  },
];

export default function CoursePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">Our courses</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">Programs designed for modern careers.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          Every course is built to combine practical skills, mentor guidance, and a strong learning experience that helps learners grow quickly and confidently.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course, index) => (
          <article key={course.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-center justify-between">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#edf4ff] text-lg font-black text-[#0d2d5c]">
                0{index + 1}
              </span>
              <span className="rounded-full bg-[#fff4eb] px-2.5 py-1 text-[0.7rem] font-black uppercase tracking-[0.18em] text-[#f47d20]">
                Training
              </span>
            </div>
            <h2 className="mt-5 text-2xl font-black text-[#0d2d5c]">{course.title}</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">{course.description}</p>
          </article>
        ))}
      </section>

      <section className="mt-10 rounded-[2rem] bg-[#0d2d5c] p-8 text-white md:p-10">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-orange-200">What you gain</p>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            "Hands-on learning experiences",
            "Mentor support and feedback",
            "Career-ready practical guidance",
          ].map((item) => (
            <div key={item} className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
              <p className="text-base font-semibold">{item}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
