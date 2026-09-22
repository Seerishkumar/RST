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
  phone: "+91 98765 43210",
  email: "info@rameshsofttechacademy.com",
  address: "Your location here",
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

  const updateField = (key: keyof typeof defaultContent, value: string) => {
    setContent((prev) => ({ ...prev, [key]: value }));
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
    router.push("/login");
    router.refresh();
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
            </div>
          </div>

          <div className="rounded-[2rem] bg-[#fff7f1] p-6 shadow-sm ring-1 ring-[#f7dcc0]">
            <h3 className="text-xl font-black text-[#0d2d5c]">Quick Tips</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-700">
              <li>• Update your academy branding and message from here.</li>
              <li>• Keep course names short and easy to scan.</li>
              <li>• Save often after changing the contact details.</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
