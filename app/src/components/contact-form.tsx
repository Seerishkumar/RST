"use client";

import { useState } from "react";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const answer = a + b;

  return {
    question: `${a} + ${b}`,
    answer,
  };
}

export function ContactForm({ siteContent }: { siteContent: any }) {
  const [captcha, setCaptcha] = useState(generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const answer = Number(captchaInput);
    if (!captchaInput || Number.isNaN(answer) || answer !== captcha.answer) {
      setError("Please enter the correct captcha answer.");
      setCaptcha(generateCaptcha());
      setCaptchaInput("");
      return;
    }

    setSubmitted(true);
    setCaptcha(generateCaptcha());
    setCaptchaInput("");
  };

  return (
    <div className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200">
      <h2 className="text-2xl font-black text-[#0d2d5c]">Send an enquiry</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Full Name</label>
          <input className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]" placeholder="Your name" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
          <input type="email" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]" placeholder="you@example.com" required />
        </div>
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Message</label>
          <textarea rows={5} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]" placeholder="Tell us about your interest" required />
        </div>

        <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-3">
          <label className="mb-2 block text-sm font-semibold text-slate-700">Security check</label>
          <div className="flex items-center gap-3">
            <span className="inline-flex min-w-[120px] rounded-lg bg-[#edf4ff] px-3 py-2 text-sm font-bold text-[#0d2d5c]">
              {captcha.question}
            </span>
            <input
              type="number"
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none transition focus:border-[#0d2d5c]"
              placeholder="Enter answer"
              required
            />
          </div>
        </div>

        {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
        {submitted ? <p className="text-sm font-medium text-green-600">Enquiry submitted successfully.</p> : null}

        <button type="submit" className="inline-flex rounded-full bg-gradient-to-r from-[#f47d20] to-[#dd6210] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(244,125,32,0.32)]">
          Submit Enquiry
        </button>
      </form>
    </div>
  );
}
