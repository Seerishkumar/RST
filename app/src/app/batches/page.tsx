import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();

  return {
    title: siteContent.batchesMetaTitle,
    description: siteContent.batchesMetaDescription,
  };
}

export default async function BatchesPage() {
  const siteContent = await getSiteContent();
  const batches = Array.isArray(siteContent.batchesRows) ? siteContent.batchesRows : [];

  return (
    <main className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-8">
      <section className="mb-8 text-center">
        <h1 className="text-4xl font-black tracking-[-0.03em] text-[#0d2d5c] sm:text-5xl lg:text-[4rem]">
          {siteContent.batchesTitle}
        </h1>
      </section>

      <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_20px_45px_rgba(13,45,92,0.08)]">
        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-left">
            <thead>
              <tr className="bg-[#0a0d12] text-white">
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">
                  <span className="inline-flex items-center gap-2">Course Name</span>
                </th>
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Faculty</th>
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Date</th>
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Duration</th>
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Timings</th>
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Syllabus</th>
                <th className="px-5 py-4 text-sm font-black uppercase tracking-[0.16em]">Action</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch, index) => (
                <tr
                  key={batch.id || `${batch.courseName}-${index}`}
                  className={index % 2 === 0 ? "bg-[#f5f7fb]" : "bg-white"}
                >
                  <td className="border-t border-slate-200 px-5 py-4 text-base font-semibold text-slate-800">
                    {batch.courseName}
                  </td>
                  <td className="border-t border-slate-200 px-5 py-4 text-base text-slate-700">{batch.faculty}</td>
                  <td className="border-t border-slate-200 px-5 py-4 text-base text-slate-700">{batch.date}</td>
                  <td className="border-t border-slate-200 px-5 py-4 text-base text-slate-700">{batch.duration}</td>
                  <td className="border-t border-slate-200 px-5 py-4 text-base text-slate-700">{batch.timings}</td>
                  <td className="border-t border-slate-200 px-5 py-4 text-base text-slate-700">{batch.syllabus}</td>
                  <td className="border-t border-slate-200 px-5 py-4">
                    <a
                      href={batch.actionLink || "#"}
                      className="inline-flex items-center justify-center rounded-xl bg-[#0d2d5c] px-4 py-2 text-sm font-bold text-white shadow-[0_10px_20px_rgba(13,45,92,0.18)] transition hover:bg-[#173e83]"
                    >
                      {batch.actionLabel || "Join"}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
