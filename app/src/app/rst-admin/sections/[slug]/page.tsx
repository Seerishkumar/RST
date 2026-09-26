"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

const sectionMap: Record<string, { label: string; description: string; fields: Array<{ key: string; label: string; type: "text" | "textarea" }> }> = {
  home: {
    label: "Home",
    description: "Manage the homepage hero, branding, and contact details.",
    fields: [
      { key: "academyName", label: "Academy Name", type: "text" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "heroTitle", label: "Hero Title", type: "textarea" },
      { key: "heroText", label: "Hero Description", type: "textarea" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "address", label: "Address", type: "text" },
    ],
  },
  about: {
    label: "About",
    description: "Edit the main About page content.",
    fields: [
      { key: "aboutTitle", label: "About Title", type: "text" },
      { key: "aboutText", label: "About Description", type: "textarea" },
    ],
  },
  courses: {
    label: "Courses",
    description: "Edit course page content and course cards.",
    fields: [
      { key: "courseTitle", label: "Course Title", type: "text" },
      { key: "courseIntro", label: "Course Intro", type: "textarea" },
    ],
  },
  batches: {
    label: "Batches",
    description: "Open the list and update a batch record.",
    fields: [
      { key: "batchesTitle", label: "Batches Title", type: "text" },
      { key: "batchesIntro", label: "Batches Intro", type: "textarea" },
    ],
  },
  careers: {
    label: "Careers",
    description: "Update careers page content.",
    fields: [
      { key: "careersTitle", label: "Careers Title", type: "text" },
      { key: "careersText", label: "Careers Text", type: "textarea" },
    ],
  },
  contact: {
    label: "Contact Us",
    description: "Update contact form and contact information.",
    fields: [
      { key: "contactTitle", label: "Contact Title", type: "text" },
      { key: "contactText", label: "Contact Text", type: "textarea" },
      { key: "phone", label: "Phone", type: "text" },
      { key: "email", label: "Email", type: "text" },
      { key: "address", label: "Address", type: "text" },
    ],
  },
  "ramesh-soft-tech": {
    label: "About Ramesh Soft Tech",
    description: "Update this page introduction and mission statements.",
    fields: [
      { key: "rameshSoftTechTitle", label: "Title", type: "text" },
      { key: "rameshSoftTechText", label: "Description", type: "textarea" },
      { key: "rameshSoftTechMission", label: "Mission", type: "textarea" },
      { key: "rameshSoftTechApproach", label: "Approach", type: "textarea" },
    ],
  },
  "trainers-profile": {
    label: "Trainers Profile",
    description: "Update the trainer list and profile summary.",
    fields: [
      { key: "trainersProfileTitle", label: "Title", type: "text" },
      { key: "trainersProfileText", label: "Description", type: "textarea" },
    ],
  },
  "our-theme": {
    label: "Our Vision",
    description: "Update the vision theme and key pillars.",
    fields: [
      { key: "ourThemeTitle", label: "Title", type: "text" },
      { key: "ourThemeText", label: "Description", type: "textarea" },
    ],
  },
};

export default function SectionEditPage() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "home";
  const section = sectionMap[slug] || sectionMap.home;
  const [form, setForm] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/api/admin/settings");
        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data = await response.json();
        const content = data?.content || {};
        const initialState: Record<string, string> = {};

        section.fields.forEach((field) => {
          const value = content[field.key];
          initialState[field.key] = typeof value === "string" ? value : Array.isArray(value) ? JSON.stringify(value) : "";
        });

        setForm(initialState);
      } catch {
        setMessage({ type: "error", text: "Unable to load section details." });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [section]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        throw new Error(result.message || "Save failed");
      }

      setMessage({ type: "success", text: `${section.label} updated successfully.` });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Unable to save changes." });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(13,45,92,0.08)] ring-1 ring-slate-200">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f47d20]">Edit page</p>
            <h1 className="mt-2 text-3xl font-black text-[#0d2d5c]">{section.label}</h1>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/rst-admin/sections" className="rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:border-[#0d2d5c] hover:text-[#0d2d5c]">
              Back to sections
            </Link>
            <button type="button" onClick={handleSave} disabled={saving} className="rounded-full bg-gradient-to-r from-[#f47d20] to-[#dd6210] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_25px_rgba(244,125,32,0.32)] disabled:opacity-70">
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <p className="mt-5 text-sm text-slate-600">{section.description}</p>
      </div>

      {loading ? (
        <div className="rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">Loading section data...</div>
      ) : (
        <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(13,45,92,0.08)] ring-1 ring-slate-200">
          <div className="grid gap-5 md:grid-cols-2">
            {section.fields.map((field) => (
              <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                <label className="mb-2 block text-sm font-semibold text-slate-700">{field.label}</label>
                {field.type === "textarea" ? (
                  <textarea
                    value={form[field.key] || ""}
                    onChange={(event) => handleChange(field.key, event.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                  />
                ) : (
                  <input
                    value={form[field.key] || ""}
                    onChange={(event) => handleChange(field.key, event.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
                  />
                )}
              </div>
            ))}
          </div>

          {message ? (
            <div className={`mt-6 rounded-xl px-4 py-3 text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-700 ring-1 ring-green-200" : "bg-red-50 text-red-700 ring-1 ring-red-200"}`}>
              {message.text}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
