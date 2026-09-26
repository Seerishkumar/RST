import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

export default async function AdminBatchesPage() {
  const content = await getSiteContent();
  const batches = Array.isArray(content.batchesRows) ? content.batchesRows : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f47d20]">Management</p>
          <h1 className="mt-2 text-3xl font-black text-[#0d2d5c]">Batch Records</h1>
        </div>

        <Link
          href="/rst-admin"
          className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#0d2d5c] hover:text-[#0d2d5c]"
        >
          Back to dashboard
        </Link>
      </div>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(13,45,92,0.08)]">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left">
            <thead>
              <tr className="bg-[#0a0d12] text-white">
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Course</th>
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Faculty</th>
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Date</th>
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Timings</th>
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Action</th>
              </tr>
            </thead>
            <tbody>
              {batches.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                    No batches found.
                  </td>
                </tr>
              ) : (
                batches.map((batch, index) => (
                  <tr key={batch.id || `${batch.courseName}-${index}`} className={index % 2 === 0 ? "bg-[#f5f7fb]" : "bg-white"}>
                    <td className="border-t border-slate-200 px-5 py-4 text-base font-semibold text-slate-800">{batch.courseName}</td>
                    <td className="border-t border-slate-200 px-5 py-4 text-base text-slate-700">{batch.faculty}</td>
                    <td className="border-t border-slate-200 px-5 py-4 text-base text-slate-700">{batch.date}</td>
                    <td className="border-t border-slate-200 px-5 py-4 text-base text-slate-700">{batch.timings}</td>
                    <td className="border-t border-slate-200 px-5 py-4">
                      <Link
                        href={`/rst-admin/batches/${encodeURIComponent(batch.id || batch.courseName)}/edit`}
                        className="inline-flex items-center justify-center rounded-xl bg-[#0d2d5c] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_20px_rgba(13,45,92,0.18)] transition hover:bg-[#173e83]"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
