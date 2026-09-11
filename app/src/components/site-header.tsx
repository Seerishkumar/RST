"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoBadge } from "@/components/logo-badge";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/course", label: "Course" },
  { href: "/batches", label: "Batches" },
  { href: "/vision", label: "Vision" },
  { href: "/contact", label: "Contact Us" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#f6f7fb]/80 backdrop-blur-xl" : "bg-[#f6f7fb]/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-3 sm:px-4 lg:px-6">
        <nav
          className={`mx-auto my-2.5 w-full rounded-[30px] border border-slate-200/80 px-3 shadow-[0_12px_35px_rgba(13,45,92,0.12)] transition-all duration-300 ${
            scrolled
              ? "bg-white/90"
              : "bg-white/80"
          }`}
        >
          <div className="flex items-center justify-between gap-3 py-2.5">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="h-12 w-12 shrink-0 sm:h-14 sm:w-14">
                <LogoBadge className="h-full w-full" />
              </div>
              {/* <div className="min-w-0 leading-tight">
                <p className="text-[0.58rem] font-black uppercase tracking-[0.22em] text-[#f47d20]">
                  Quality Training
                </p>
                <p className="truncate text-sm font-black text-[#0d2d5c] sm:text-base">
                  Ramesh Soft Tech Academy
                </p>
              </div> */}
            </Link>

            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-semibold transition ${
                      active ? "text-[#0d2d5c]" : "text-slate-600 hover:text-[#0d2d5c]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/contact"
                className="hidden rounded-full bg-gradient-to-r from-[#f47d20] to-[#dd6210] px-4 py-2 text-xs font-bold text-white shadow-[0_12px_26px_rgba(244,125,32,0.30)] transition hover:scale-[1.02] sm:inline-flex"
              >
                Enquire Now
              </Link>

              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((value) => !value)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-lg text-[#0d2d5c] md:hidden"
              >
                {mobileOpen ? "✕" : "☰"}
              </button>
            </div>
          </div>

          {mobileOpen && (
            <div className="border-t border-slate-200 pb-4 pt-3 md:hidden">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const active = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-xl px-3 py-2 text-sm font-semibold ${
                        active ? "bg-[#edf4ff] text-[#0d2d5c]" : "text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
