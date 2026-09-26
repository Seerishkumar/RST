"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const defaultContent = {
  academyName: "Ramesh Soft Tech Academy",
  tagline: "Quality Training",
  heroTitle: "Empowering future-ready careers through skill-based training.",
  heroText:
    "We help students and professionals build confidence, real-world skills, and career momentum through practical, mentor-led learning.",
  aboutTitle: "A trusted place for learning and growth.",
  aboutText:
    "Ramesh Soft Tech Academy is committed to providing professional, practical, and future-ready education that helps learners grow with confidence and achieve meaningful career opportunities.",
  homeMetaTitle: "Ramesh Soft Tech Academy | Professional Training & Career Growth",
  homeMetaDescription:
    "Explore practical, career-focused training programs designed to help learners build confidence, skills, and job-ready expertise.",
  aboutMetaTitle: "About Ramesh Soft Tech Academy | Career-Focused Education",
  aboutMetaDescription:
    "Learn about our mission, educators, and the practical learning approach that helps students and professionals grow with confidence.",
  courseMetaTitle: "Courses | Ramesh Soft Tech Academy",
  courseMetaDescription:
    "Discover skill-based programs in software development, digital marketing, cloud, design, and career readiness.",
  batchesMetaTitle: "Upcoming Online Training Batches | Ramesh Soft Tech Academy",
  batchesMetaDescription:
    "View upcoming online training batches, timings, and course details for flexible learning options.",
  visionMetaTitle: "Our Vision | Ramesh Soft Tech Academy",
  visionMetaDescription:
    "See our vision, mission, and values focused on practical learning, mentorship, and lifelong career growth.",
  contactMetaTitle: "Contact Us | Ramesh Soft Tech Academy",
  contactMetaDescription:
    "Speak with our team about programs, training batches, and enrollment support for your next step.",
  visionTitle: "Creating brighter futures through purposeful education.",
  visionText:
    "We believe the right learning environment, skilled mentors, and practical exposure can transform careers and confidence for every learner.",
  batchesTitle: "Upcoming Online Training Batches",
  batchesIntro:
    "Discover flexible learning schedules and mentor-guided training options tailored to your goals.",
  contactTitle: "Talk to our team today.",
  contactText:
    "Connect with us to learn more about our programs, training batches, and enrollment support.",
  phone: "+91 98765 43210",
  email: "thisisramesh4u@gmail.com",
  address: "Your location here",
  batchesRows: [
    {
      id: "dotnet-full-stack",
      courseName: ".NET Dotnet Full Stack",
      faculty: "Mr. Mahindra",
      date: "4-06-2026",
      duration: "4 Months",
      timings: "08:30 AM",
      syllabus: "Full Stack .NET",
      actionLabel: "Zoom",
      actionLink: "#",
    },
    {
      id: "java-placement",
      courseName: "Full Stack Java Placement Assistance Program",
      faculty: "Mr. Kannababu",
      date: "4-6-2026",
      duration: "4 Months",
      timings: "10:00 AM",
      syllabus: "Java, Spring Boot, Frontend",
      actionLabel: "Zoom",
      actionLink: "#",
    },
  ],
};

export default function AdminPage() {
  const router = useRouter();
  const [content, setContent] = useState(defaultContent);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        if (!response.ok) {
          router.push("/login");
          return;
        }

        const data = await response.json();
        if (data?.content) {
          setContent({ ...defaultContent, ...data.content });
        }
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [router]);

  useEffect(() => {
    if (!saved) return;
    const timer = window.setTimeout(() => setSaved(false), 1600);
    return () => window.clearTimeout(timer);
  }, [saved]);

  const stats = useMemo(
    () => [
      { title: "Total Students", value: "5,240" },
      { title: "Active Courses", value: "18" },
      { title: "Placements", value: "92%" },
      { title: "Enquiries", value: "146" },
    ],
    [],
  );

  const updateField = (key: keyof typeof defaultContent, value: string | typeof defaultContent.batchesRows) => {
    setContent((prev) => ({ ...prev, [key]: value }));
  };

  const updateBatchRows = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      if (!Array.isArray(parsed)) {
        throw new Error("Batch rows must be a JSON array");
      }
      updateField("batchesRows", parsed);
    } catch {
      window.alert("Batch rows must be valid JSON in array format.");
    }
  };

  const saveContent = async () => {
    try {
      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(content),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      setSaved(true);
    } catch {
      window.alert("Unable to save content right now.");
    }
  };

  const logout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/login");
    router.refresh();
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-[#f47d20]">Loading</p>
          <h1 className="mt-3 text-2xl font-black text-[#0d2d5c]">Preparing admin dashboard...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 rounded-[2rem] bg-[#0d2d5c] p-6 text-white shadow-[0_18px_40px_rgba(13,45,92,0.18)] md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.25em] text-orange-200">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">RST Dashboard</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={saveContent}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f47d20] to-[#dd6210] px-5 py-2.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(244,125,32,0.35)]"
            >
              {saved ? "Saved" : "Save Changes"}
            </button>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-2.5 text-sm font-bold text-white"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((card) => (
          <div key={card.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{card.title}</p>
            <p className="mt-4 text-4xl font-black text-[#0d2d5c]">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(13,45,92,0.08)] ring-1 ring-slate-200">
            <h2 className="text-2xl font-black text-[#0d2d5c]">Website Content Editor</h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Academy Name</label>
                <input
                  value={content.academyName}
                  onChange={(e) => updateField("academyName", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Tagline</label>
                <input
                  value={content.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Hero Title</label>
                <textarea
                  rows={3}
                  value={content.heroTitle}
                  onChange={(e) => updateField("heroTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Hero Description</label>
                <textarea
                  rows={4}
                  value={content.heroText}
                  onChange={(e) => updateField("heroText", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">About Title</label>
                <input
                  value={content.aboutTitle}
                  onChange={(e) => updateField("aboutTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">About Description</label>
                <textarea
                  rows={4}
                  value={content.aboutText}
                  onChange={(e) => updateField("aboutText", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Vision Title</label>
                <input
                  value={content.visionTitle}
                  onChange={(e) => updateField("visionTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Vision Description</label>
                <textarea
                  rows={3}
                  value={content.visionText}
                  onChange={(e) => updateField("visionText", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Batches Title</label>
                <input
                  value={content.batchesTitle}
                  onChange={(e) => updateField("batchesTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Batches Intro</label>
                <textarea
                  rows={3}
                  value={content.batchesIntro}
                  onChange={(e) => updateField("batchesIntro", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(13,45,92,0.08)] ring-1 ring-slate-200">
            <h2 className="text-2xl font-black text-[#0d2d5c]">SEO Settings</h2>

            <div className="mt-6 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Home Meta Title</label>
                <input
                  value={content.homeMetaTitle}
                  onChange={(e) => updateField("homeMetaTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Home Meta Description</label>
                <textarea
                  rows={3}
                  value={content.homeMetaDescription}
                  onChange={(e) => updateField("homeMetaDescription", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">About Meta Title</label>
                <input
                  value={content.aboutMetaTitle}
                  onChange={(e) => updateField("aboutMetaTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">About Meta Description</label>
                <textarea
                  rows={3}
                  value={content.aboutMetaDescription}
                  onChange={(e) => updateField("aboutMetaDescription", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Course Meta Title</label>
                <input
                  value={content.courseMetaTitle}
                  onChange={(e) => updateField("courseMetaTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Course Meta Description</label>
                <textarea
                  rows={3}
                  value={content.courseMetaDescription}
                  onChange={(e) => updateField("courseMetaDescription", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Batches Meta Title</label>
                <input
                  value={content.batchesMetaTitle}
                  onChange={(e) => updateField("batchesMetaTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Batches Meta Description</label>
                <textarea
                  rows={3}
                  value={content.batchesMetaDescription}
                  onChange={(e) => updateField("batchesMetaDescription", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Vision Meta Title</label>
                <input
                  value={content.visionMetaTitle}
                  onChange={(e) => updateField("visionMetaTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Vision Meta Description</label>
                <textarea
                  rows={3}
                  value={content.visionMetaDescription}
                  onChange={(e) => updateField("visionMetaDescription", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Contact Meta Title</label>
                <input
                  value={content.contactMetaTitle}
                  onChange={(e) => updateField("contactMetaTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Contact Meta Description</label>
                <textarea
                  rows={3}
                  value={content.contactMetaDescription}
                  onChange={(e) => updateField("contactMetaDescription", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="text-xl font-black text-[#0d2d5c]">Contact Details</h3>
            <div className="mt-4 space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Phone</label>
                <input
                  value={content.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                <input
                  value={content.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Address</label>
                <input
                  value={content.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Contact Title</label>
                <input
                  value={content.contactTitle}
                  onChange={(e) => updateField("contactTitle", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Contact Intro</label>
                <textarea
                  rows={3}
                  value={content.contactText}
                  onChange={(e) => updateField("contactText", e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                />
              </div>
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#fff7f1] p-6 shadow-sm ring-1 ring-[#f7dcc0]">
            <h3 className="text-xl font-black text-[#0d2d5c]">Batch Data JSON</h3>
            <div className="mt-4">
              <textarea
                rows={14}
                value={JSON.stringify(content.batchesRows, null, 2)}
                onChange={(e) => updateBatchRows(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 font-mono text-xs outline-none transition focus:border-[#0d2d5c]"
              />
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
