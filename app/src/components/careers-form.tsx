"use client";

import { useState } from "react";

function generateCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;

  return {
    question: `${a} + ${b}`,
    answer: a + b,
  };
}

export function CareersForm() {
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
    event.currentTarget.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 space-y-5 rounded-[2rem] bg-white p-6 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-8"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Firstname</label>
          <input
            type="text"
            name="firstName"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            placeholder="Enter your first name"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Lastname</label>
          <input
            type="text"
            name="lastName"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            placeholder="Enter your last name"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
          <input
            type="email"
            name="email"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            placeholder="you@example.com"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Phone</label>
          <input
            type="tel"
            name="phone"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
            placeholder="Your phone number"
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Job application for</label>
        <select
          name="jobRole"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-[#0d2d5c]"
          defaultValue=""
          required
        >
          <option value="" disabled>Select a role</option>
          <option value="Frontend Developer">Frontend Developer</option>
          <option value="Full Stack Developer">Full Stack Developer</option>
          <option value="Java Developer">Java Developer</option>
          <option value="Python Developer">Python Developer</option>
          <option value="Digital Marketing">Digital Marketing</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Trainer">Trainer</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">Upload resume</label>
        <input
          type="file"
          name="resume"
          accept=".pdf,.doc,.docx"
          className="block w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-full file:border-0 file:bg-[#edf4ff] file:px-4 file:py-2 file:text-sm file:font-bold file:text-[#0d2d5c]"
          required
        />
      </div>

      <div className="rounded-xl border border-slate-200 bg-[#f8fafc] p-3">
        <label className="mb-2 block text-sm font-semibold text-slate-700">Captcha</label>
        <div className="flex items-center gap-3">
          <span className="inline-flex min-w-[120px] rounded-lg bg-[#edf4ff] px-3 py-2 text-sm font-bold text-[#0d2d5c]">
            {captcha.question}
          </span>
          <input
            type="number"
            value={captchaInput}
            onChange={(event) => setCaptchaInput(event.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 outline-none transition focus:border-[#0d2d5c]"
            placeholder="Enter answer"
            required
          />
        </div>
      </div>

      {error ? <p className="text-sm font-medium text-red-600">{error}</p> : null}
      {submitted ? (
        <p className="text-sm font-medium text-green-600">
          Application submitted successfully. We will contact you soon.
        </p>
      ) : null}

      <button
        type="submit"
        className="inline-flex rounded-full bg-gradient-to-r from-[#f47d20] to-[#dd6210] px-6 py-3 text-sm font-bold text-white shadow-[0_12px_25px_rgba(244,125,32,0.32)]"
      >
        Submit
      </button>
    </form>
  );
}
