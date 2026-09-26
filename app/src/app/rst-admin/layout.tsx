"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogoBadge } from "@/components/logo-badge";

const navItems = [
  { href: "/rst-admin", label: "Overview" },
  { href: "/rst-admin/settings", label: "Meta & Batches" },
  { href: "/rst-admin/sections/home", label: "Home" },
  { href: "/rst-admin/sections/about", label: "About" },
  { href: "/rst-admin/sections/courses", label: "Courses" },
  { href: "/rst-admin/sections/batches", label: "Batches" },
  { href: "/rst-admin/sections/careers", label: "Careers" },
  { href: "/rst-admin/sections/contact", label: "Contact Us" },
  { href: "/rst-admin/sections/ramesh-soft-tech", label: "About Ramesh Soft Tech" },
  { href: "/rst-admin/sections/trainers-profile", label: "Trainers Profile" },
  { href: "/rst-admin/sections/our-theme", label: "Our Vision" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    router.replace("/rst-login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900">
      <div className="mx-auto flex max-w-[1600px] gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-72 shrink-0 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(13,45,92,0.08)] lg:flex lg:flex-col">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="h-12 w-12 shrink-0 rounded-full bg-[#eef4ff] p-1.5">
              <LogoBadge className="h-full w-full" />
            </div>
            <div>
              <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#f47d20]">Admin</p>
              <p className="text-lg font-black text-[#0d2d5c]">RST</p>
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                    isActive ? "bg-[#0d2d5c] text-white shadow-[0_10px_20px_rgba(13,45,92,0.18)]" : "text-slate-600 hover:bg-slate-50 hover:text-[#0d2d5c]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex w-full items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-[#0d2d5c] hover:text-[#0d2d5c]"
            >
              Logout
            </button>
          </div>
        </aside>

        <div className="flex-1">
          <header className="mb-6 rounded-[2rem] border border-slate-200 bg-white p-4 shadow-[0_18px_40px_rgba(13,45,92,0.08)] lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-full bg-[#eef4ff] p-1.5">
                  <LogoBadge className="h-full w-full" />
                </div>
                <div>
                  <p className="text-[0.62rem] font-black uppercase tracking-[0.22em] text-[#f47d20]">Admin</p>
                  <p className="text-base font-black text-[#0d2d5c]">RST</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-700"
              >
                Logout
              </button>
            </div>
          </header>

          <main className="w-full">{children}</main>
        </div>
      </div>
    </div>
  );
}
