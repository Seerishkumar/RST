"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const sectionCatalog = [
  { slug: "home", label: "Home", href: "/rst-admin/sections/home" },
  { slug: "about", label: "About", href: "/rst-admin/sections/about" },
  { slug: "courses", label: "Courses", href: "/rst-admin/sections/courses" },
  { slug: "batches", label: "Batches", href: "/rst-admin/sections/batches" },
  { slug: "careers", label: "Careers", href: "/rst-admin/sections/careers" },
  { slug: "contact", label: "Contact Us", href: "/rst-admin/sections/contact" },
  { slug: "ramesh-soft-tech", label: "About Ramesh Soft Tech", href: "/rst-admin/sections/ramesh-soft-tech" },
  { slug: "trainers-profile", label: "Trainers Profile", href: "/rst-admin/sections/trainers-profile" },
  { slug: "our-theme", label: "Our Vision", href: "/rst-admin/sections/our-theme" },
];

export default function AdminSectionsLandingPage() {
  const [sectionData, setSectionData] = useState<Record<string, string>>({});

  useEffect(() => {
    const parsed = sectionCatalog.reduce<Record<string, string>>((acc, section) => {
      acc[section.slug] = section.label;
      return acc;
    }, {});
    setSectionData(parsed);
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-[2rem] bg-white p-6 shadow-[0_18px_40px_rgba(13,45,92,0.08)] ring-1 ring-slate-200">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-[#f47d20]">Admin Panel</p>
        <h1 className="mt-2 text-3xl font-black text-[#0d2d5c]">Website Sections</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {sectionCatalog.map((section) => (
          <Link
            key={section.slug}
            href={section.href}
            className="rounded-[1.75rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#0d2d5c] hover:shadow-md"
          >
            <p className="text-xs font-black uppercase tracking-[0.2em] text-[#f47d20]">Section</p>
            <h2 className="mt-3 text-xl font-black text-[#0d2d5c]">{sectionData[section.slug] || section.label}</h2>
            <p className="mt-3 text-sm text-slate-600">Open list and edit details for this page.</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
