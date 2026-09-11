export default function ContactPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] bg-[#0d2d5c] p-8 text-white shadow-[0_20px_45px_rgba(13,45,92,0.12)] md:p-10">
          <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-200">Contact us</p>
          <h1 className="mt-4 text-3xl font-black sm:text-5xl">Talk to our team today.</h1>
          <div className="mt-8 space-y-5 text-sm text-slate-200">
            <p><span className="font-bold text-white">Phone:</span> +91 98765 43210</p>
            <p><span className="font-bold text-white">Email:</span> info@rameshsofttechacademy.com</p>
            <p><span className="font-bold text-white">Address:</span> Your location here</p>
          </div>
        </div>

        <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200">
          <h2 className="text-2xl font-black text-[#0d2d5c]">Send an enquiry</h2>
          <form className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
              <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]" placeholder="Your name" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
              <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]" placeholder="you@example.com" />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Message</label>
              <textarea rows={5} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]" placeholder="Tell us about your interest" />
            </div>
            <button type="submit" className="inline-flex rounded-full bg-gradient-to-r from-[#f47d20] to-[#dd6210] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(244,125,32,0.32)]">
              Submit Enquiry
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
