import type { Metadata } from "next";
import { getSiteContent } from "@/lib/site-content";
import { ContactForm } from "@/components/contact-form";

export async function generateMetadata(): Promise<Metadata> {
  const siteContent = await getSiteContent();

  return {
    title: siteContent.contactMetaTitle,
    description: siteContent.contactMetaDescription,
  };
}

export default async function ContactPage() {
  const siteContent = await getSiteContent();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-[#0d2d5c] p-8 text-white shadow-[0_20px_45px_rgba(13,45,92,0.12)] md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-200">Contact us</p>
          <h1 className="mt-4 text-3xl font-black sm:text-5xl">{siteContent.contactTitle}</h1>
          <p className="mt-4 max-w-md text-base leading-7 text-slate-200">{siteContent.contactText}</p>
          <div className="mt-8 space-y-5 text-sm text-slate-200">
            <p><span className="font-bold text-white">Phone:</span> {siteContent.phone}</p>
            <p><span className="font-bold text-white">Email:</span> {siteContent.email}</p>
            <p><span className="font-bold text-white">Address:</span> {siteContent.address}</p>
          </div>
        </div>

        <ContactForm siteContent={siteContent} />
      </section>
    </main>
  );
}
