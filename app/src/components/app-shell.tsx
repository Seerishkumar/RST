"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin") || pathname.startsWith("/rst-admin") || pathname.startsWith("/login") || pathname.startsWith("/rst-login");

  return (
    <div className="min-h-screen">
      {!isAdminRoute && <SiteHeader />}
      <main className={`flex-1 ${!isAdminRoute ? "pt-[104px] sm:pt-[112px]" : ""}`}>{children}</main>
      {!isAdminRoute && <SiteFooter />}
    </div>
  );
}
