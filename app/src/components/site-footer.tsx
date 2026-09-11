import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-8 border-t border-slate-200 bg-white/80">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-[#f47d20]">Ramesh Soft Tech Academy</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Empowering learners with practical and career-focused training in digital skills, technology, and professional growth.
          </p>
        </div>

        <div>
          <p className="text-base font-black text-[#0d2d5c]">Quick Links</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link href="/about">About</Link></li>
            <li><Link href="/course">Course</Link></li>
            <li><Link href="/batches">Batches</Link></li>
            <li><Link href="/vision">Vision</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-base font-black text-[#0d2d5c]">Contact</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>+91 98765 43210</li>
            <li>info@rameshsofttechacademy.com</li>
            <li>Your location here</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-200 bg-[#0d2d5c] py-4 text-center text-sm text-white/90">
        © {new Date().getFullYear()} Ramesh Soft Tech Academy. All rights reserved.
      </div>
    </footer>
  );
}
