const batches = [
  { name: "Weekday Batch", time: "Mon - Sat | 9:00 AM - 11:00 AM", seats: "Limited Seats" },
  { name: "Evening Batch", time: "Mon - Sat | 6:00 PM - 8:00 PM", seats: "Available" },
  { name: "Weekend Batch", time: "Sat - Sun | 10:00 AM - 1:00 PM", seats: "Open for New Enrollments" },
  { name: "Fast Track Batch", time: "Custom schedule as per course", seats: "By request" },
];

export default function BatchesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] bg-white p-8 shadow-[0_20px_45px_rgba(13,45,92,0.08)] ring-1 ring-slate-200 md:p-12">
        <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f47d20]">Batches</p>
        <h1 className="mt-4 text-3xl font-black text-[#0d2d5c] sm:text-5xl">Flexible batch options to match your routine.</h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-600">
          We offer structured learning batches to make quality education accessible for students and working professionals alike.
        </p>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        {batches.map((batch) => (
          <div key={batch.name} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
            <div className="inline-flex rounded-full bg-[#fff4eb] px-3 py-1 text-[0.7rem] font-black uppercase tracking-[0.18em] text-[#f47d20]">
              {batch.seats}
            </div>
            <h2 className="mt-4 text-2xl font-black text-[#0d2d5c]">{batch.name}</h2>
            <p className="mt-3 text-base text-slate-600">{batch.time}</p>
          </div>
        ))}
      </section>

      <section className="mt-10 rounded-[2rem] bg-[#edf4ff] p-8 ring-1 ring-blue-100">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-[#0d2d5c]">Enrollment support</p>
        <h3 className="mt-3 text-2xl font-black text-[#0d2d5c] sm:text-3xl">Choose the right batch and begin your learning journey today.</h3>
      </section>
    </main>
  );
}
