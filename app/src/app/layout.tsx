import type { Metadata } from "next";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ramesh Soft Tech Academy",
  description: "Professional training academy website for quality education and skill development.",
  icons: {
    icon: {
      url: "/logo.svg",
      type: "image/svg+xml",
      sizes: "256x256",
    },
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
    >
      <body className="min-h-full bg-[#f6f7fb] text-slate-900">
        <AppShell>{children}</AppShell>
        <a
          href="https://wa.me/916303725742"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_12px_28px_rgba(37,211,102,0.38)] transition-all duration-200 hover:scale-105 hover:shadow-[0_16px_30px_rgba(37,211,102,0.42)] focus:outline-none focus:ring-4 focus:ring-[#25D366]/30 sm:bottom-5 sm:right-5"
        >
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-7 w-7 fill-current"
          >
            <path d="M20.52 3.48A11.78 11.78 0 0 0 12.06 0C5.4 0 .86 4.53.86 10.12c0 1.78.47 3.52 1.36 5.06L.7 23.3l8.32-2.18a10.12 10.12 0 0 0 4.88 1.18h.01c6.66 0 12.08-4.53 12.08-10.12 0-2.7-1.15-5.25-3.47-7.1ZM12.06 18.46a8.36 8.36 0 0 1-4.25-1.15l-.3-.18-4.93 1.29 1.32-4.81-.2-.31A8.4 8.4 0 0 1 3.72 10.1c0-4.63 4.08-8.39 9.1-8.39s9.1 3.76 9.1 8.39-4.08 8.39-9.1 8.39Zm5.13-6.25c-.28-.14-1.66-.82-1.92-.91-.26-.09-.45-.14-.64.14-.2.28-.76.91-.94 1.1-.17.2-.35.22-.64.08-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.62-1.53-1.9-.16-.28-.02-.43.13-.58.13-.13.28-.35.42-.52.14-.17.18-.29.27-.49.09-.2.04-.37-.02-.52-.06-.14-.63-1.52-.86-2.08-.23-.56-.46-.48-.64-.49l-.55-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.9 1.22 3.09c.15.2 2.1 3.2 5.09 4.48.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.66-.68 1.89-1.33.23-.66.23-1.23.16-1.35-.07-.12-.26-.2-.54-.34Z" />
          </svg>
        </a>
      </body>
    </html>
  );
}
