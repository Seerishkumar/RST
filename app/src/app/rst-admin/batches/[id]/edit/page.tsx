"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

const emptyBatch = {
  id: "",
  courseName: "",
  faculty: "",
  date: "",
  duration: "",
  timings: "",
  syllabus: "",
  actionLabel: "Zoom",
  actionLink: "#",
};

export default function EditBatchPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const [batch, setBatch] = useState(emptyBatch);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    const loadBatch = async () => {
      try {
        const response = await fetch(`/api/admin/batches/${encodeURIComponent(params.id)}`);
        if (!response.ok) {
          throw new Error("Batch not found");
        }

        const data = await response.json();
        setBatch({ ...emptyBatch, ...data.batch });
      } catch {
        setMessage({ type: "error", text: "Unable to load batch details." });
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadBatch();
    }
  }, [params.id]);

  const updateField = (field: keyof typeof emptyBatch, value: string) => {
    setBatch((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch(`/api/admin/batches/${encodeURIComponent(params.id)}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(batch),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.message || "Unable to save batch data.");
      }

      setMessage({ type: "success", text: "Batch updated successfully." });
      router.refresh();
      setTimeout(() => {
        router.push("/rst-admin/batches");
      }, 700);
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Unable to update batch." });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-[2rem] bg-white p-8 text-center shadow-sm ring-1 ring-slate-200">Loading batch...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f47d20]">Edit</p>
          <h1 className="mt-2 text-3xl font-black text-[#0d2d5c]">Update Batch</h1>
        </div>

        <Link
          href="/rst-admin/batches"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#0d2d5c] hover:text-[#0d2d5c]"
        >
          Back to list
        </Link>
      </div>

      <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(13,45,92,0.08)] ring-1 ring-slate-200">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Course Name</label>
            <input
              value={batch.courseName}
              onChange={(event) => updateField("courseName", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Faculty</label>
            <input
              value={batch.faculty}
              onChange={(event) => updateField("faculty", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Date</label>
            <input
              value={batch.date}
              onChange={(event) => updateField("date", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Duration</label>
            <input
              value={batch.duration}
              onChange={(event) => updateField("duration", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Timings</label>
            <input
              value={batch.timings}
              onChange={(event) => updateField("timings", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Action Label</label>
            <input
              value={batch.actionLabel || ""}
              onChange={(event) => updateField("actionLabel", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Syllabus</label>
            <textarea
              rows={4}
              value={batch.syllabus}
              onChange={(event) => updateField("syllabus", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">Action Link</label>
            <input
              value={batch.actionLink || ""}
              onChange={(event) => updateField("actionLink", event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            />
          </div>
        </div>

        {message ? (
          <div
            className={`mt-6 rounded-xl px-4 py-3 text-sm font-medium ${
              message.type === "success" ? "bg-green-50 text-green-700 ring-1 ring-green-200" : "bg-red-50 text-red-700 ring-1 ring-red-200"
            }`}
          >
            {message.text}
          </div>
        ) : null}

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#f47d20] to-[#dd6210] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(244,125,32,0.32)] disabled:opacity-70"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
