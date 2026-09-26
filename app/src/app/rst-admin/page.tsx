import Link from "next/link";
import { getSiteContent } from "@/lib/site-content";

const sectionCards = [
  { href: "/rst-admin/settings", label: "Meta & Batches", description: "Edit SEO metadata and batch JSON data" },
  { href: "/rst-admin/sections/home", label: "Home", description: "Hero, branding, and contact details" },
  { href: "/rst-admin/sections/about", label: "About", description: "About page overview and story" },
  { href: "/rst-admin/sections/courses", label: "Courses", description: "Course cards and course intro" },
  { href: "/rst-admin/sections/batches", label: "Batches", description: "Batch list and records" },
  { href: "/rst-admin/sections/careers", label: "Careers", description: "Career page details" },
  { href: "/rst-admin/sections/contact", label: "Contact Us", description: "Contact page and phone/email info" },
  { href: "/rst-admin/sections/ramesh-soft-tech", label: "About Ramesh Soft Tech", description: "Mission and institute profile" },
  { href: "/rst-admin/sections/trainers-profile", label: "Trainers Profile", description: "Mentor profiles and summary" },
  { href: "/rst-admin/sections/our-theme", label: "Our Vision", description: "Theme text and core values" },
];

export default async function AdminOverviewPage() {
  const siteContent = await getSiteContent();
  const batchCount = Array.isArray(siteContent.batchesRows) ? siteContent.batchesRows.length : 0;

  const stats = [
    { label: "Academy", value: siteContent.academyName },
    { label: "Batches", value: String(batchCount) },
    { label: "Phone", value: siteContent.phone },
    { label: "Email", value: siteContent.email },
  ];

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-[#0d2d5c] p-6 text-white shadow-[0_18px_40px_rgba(13,45,92,0.18)] md:p-8">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-orange-200">Overview</p>
        <h1 className="mt-2 text-3xl font-black sm:text-4xl">Admin Dashboard</h1>
        <p className="mt-3 max-w-2xl text-slate-200">
          Update the website content from one place and keep the public pages in sync with the stored database records.
        </p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div key={item.label} className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">{item.label}</p>
            <p className="mt-4 text-lg font-black text-[#0d2d5c]">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(13,45,92,0.08)] ring-1 ring-slate-200">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="text-2xl font-black text-[#0d2d5c]">Website Sections</h2>
          <Link
            href="/rst-admin/sections"
            className="inline-flex items-center justify-center rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-700 hover:border-[#0d2d5c] hover:text-[#0d2d5c]"
          >
            Manage sections
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sectionCards.map((card) => (
            <div key={card.href} className="rounded-[1.5rem] border border-slate-200 bg-[#f8fafc] p-5">
              <p className="text-xs font-black uppercase tracking-[0.18em] text-[#f47d20]">Section</p>
              <h3 className="mt-3 text-xl font-black text-[#0d2d5c]">{card.label}</h3>
              <p className="mt-2 text-sm text-slate-600">{card.description}</p>

              <Link
                href={card.href}
                className="mt-5 inline-flex items-center justify-center rounded-full bg-[#0d2d5c] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#173e83]"
              >
                Edit section
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
