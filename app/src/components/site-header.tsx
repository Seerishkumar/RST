"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LogoBadge } from "@/components/logo-badge";

const navItems = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About",
    children: [
      { href: "/about/ramesh-soft-tech", label: "About Ramesh Soft Tech" },
      { href: "/about/trainers-profile", label: "Trainers Profile" },
      { href: "/about/our-theme", label: "Our Vision" },
      
    ],
  },
  { href: "/course", label: "Courses" },
  { href: "/batches", label: "Batches" },
  { href: "/about/careers", label: "Careers" },
  // { href: "/contact", label: "Contact Us" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutMenuOpen, setAboutMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setAboutMenuOpen(false);
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
            scrolled ? "bg-white/90" : "bg-white/80"
          }`}
        >
          <div className="flex items-center justify-between gap-3 py-2.5">
            <Link href="/" className="flex min-w-0 items-center gap-3">
              <div className="h-12 w-12 shrink-0 sm:h-14 sm:w-14">
                <LogoBadge className="h-full w-full" />
              </div>
            </Link>

            <div className="hidden items-center gap-6 md:flex">
              {navItems.map((item) => {
                const active =
                  pathname === item.href ||
                  ("children" in item && item.children?.some((child) => pathname === child.href));

                if ("children" in item && item.children) {
                  return (
                    <div
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setAboutMenuOpen(true)}
                      onMouseLeave={() => setAboutMenuOpen(false)}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-1 text-sm font-normal tracking-[0.02em] transition ${
                          active ? "text-[#0d2d5c]" : "text-slate-600 hover:text-[#0d2d5c]"
                        }`}
                      >
                        {item.label}
                        <span className="text-xs">▾</span>
                      </Link>

                      <div
                        className={`absolute left-0 top-full z-50 mt-3 w-64 rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_20px_40px_rgba(13,45,92,0.12)] transition-all duration-200 ${
                          aboutMenuOpen ? "visible opacity-100" : "invisible opacity-0"
                        }`}
                      >
                        {item.children.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block rounded-xl px-3 py-2 text-sm font-medium transition ${
                                childActive
                                  ? "bg-[#edf4ff] text-[#0d2d5c]"
                                  : "text-slate-600 hover:bg-slate-50 hover:text-[#0d2d5c]"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm font-normal tracking-[0.02em] transition ${
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
                Contact Us
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
                  const active =
                    pathname === item.href ||
                    ("children" in item && item.children?.some((child) => pathname === child.href));

                  if ("children" in item && item.children) {
                    return (
                      <div key={item.href} className="rounded-xl border border-slate-200 bg-slate-50 p-2">
                        <button
                          type="button"
                          onClick={() => setAboutMenuOpen((value) => !value)}
                          className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-normal ${
                            active ? "bg-[#edf4ff] text-[#0d2d5c]" : "text-slate-600"
                          }`}
                        >
                          <span>{item.label}</span>
                          <span>{aboutMenuOpen ? "▴" : "▾"}</span>
                        </button>

                        {aboutMenuOpen && (
                          <div className="mt-2 space-y-1 pl-2">
                            {item.children.map((child) => {
                              const childActive = pathname === child.href;
                              return (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`block rounded-lg px-3 py-2 text-sm ${
                                    childActive
                                      ? "bg-white text-[#0d2d5c]"
                                      : "text-slate-600 hover:bg-white hover:text-[#0d2d5c]"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-xl px-3 py-2 text-sm font-normal tracking-[0.02em] ${
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
