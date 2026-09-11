const cards = [
  { title: "Total Students", value: "5,240", tone: "bg-[#eaf3ff] text-[#0d2d5c]" },
  { title: "Active Courses", value: "18", tone: "bg-[#fff4eb] text-[#d95d0a]" },
  { title: "Placements", value: "92%", tone: "bg-[#edf9f0] text-[#186a3b]" },
  { title: "Enquiries", value: "146", tone: "bg-[#fdf2f8] text-[#9d1662]" },
];

const courseRows = [
  { name: "Web Development", status: "Live", students: "420" },
  { name: "Digital Marketing", status: "Live", students: "310" },
  { name: "Graphic Design", status: "Draft", students: "120" },
  { name: "Cloud & Security", status: "Live", students: "265" },
];

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col gap-4 rounded-[2rem] bg-[#0d2d5c] p-6 text-white md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-orange-200">Admin Panel</p>
            <h1 className="mt-2 text-3xl font-black">RST Dashboard</h1>
          </div>
          <button className="brand-button rounded-full px-5 py-2.5 text-sm font-bold text-white">
            + Add New Content
          </button>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {cards.map((card) => (
            <div key={card.title} className={`rounded-3xl p-5 ${card.tone}`}>
              <p className="text-sm font-semibold uppercase tracking-[0.18em]">{card.title}</p>
              <p className="mt-4 text-4xl font-black">{card.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[2rem] bg-white p-6 shadow-sm">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-2xl font-black text-[#0d2d5c]">Course Overview</h2>
              <span className="rounded-full bg-[#edf4ff] px-3 py-1 text-xs font-bold uppercase tracking-[0.15em] text-[#0d2d5c]">
                Updated Today
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-100 text-slate-600">
                  <tr>
                    <th className="px-4 py-3 font-bold">Course</th>
                    <th className="px-4 py-3 font-bold">Status</th>
                    <th className="px-4 py-3 font-bold">Students</th>
                  </tr>
                </thead>
                <tbody>
                  {courseRows.map((row) => (
                    <tr key={row.name} className="border-t border-slate-200">
                      <td className="px-4 py-3 font-semibold text-slate-800">{row.name}</td>
                      <td className="px-4 py-3">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${row.status === "Live" ? "bg-[#edf9f0] text-[#1d7a48]" : "bg-[#fff4eb] text-[#d95d0a]"}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-700">{row.students}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-6 shadow-sm">
              <h3 className="text-xl font-black text-[#0d2d5c]">Quick Actions</h3>
              <div className="mt-4 space-y-3">
                <button className="w-full rounded-2xl bg-[#0d2d5c] px-4 py-3 text-left font-bold text-white">Edit Home Page</button>
                <button className="w-full rounded-2xl bg-[#edf4ff] px-4 py-3 text-left font-bold text-[#0d2d5c]">Update Courses</button>
                <button className="w-full rounded-2xl bg-[#fff4eb] px-4 py-3 text-left font-bold text-[#d95d0a]">Manage Gallery</button>
              </div>
            </div>

            <div className="rounded-[2rem] bg-[#fff7f1] p-6 shadow-sm">
              <h3 className="text-xl font-black text-[#0d2d5c]">Website Status</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                <li>• Homepage design ready</li>
                <li>• Brand colors applied</li>
                <li>• Admin panel scaffold created</li>
                <li>• Content management ready for next step</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
