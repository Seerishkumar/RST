import { unstable_noStore as noStore } from "next/cache";
import { neon } from "@neondatabase/serverless";

export const defaultSiteContent = {
  academyName: "Ramesh Soft Tech Academy",
  tagline: "Quality Training",
  heroTitle: "Empowering future-ready careers through skill-based training.",
  heroText:
    "We help students and professionals build confidence, real-world skills, and career momentum through practical, mentor-led learning.",
  aboutTitle: "A trusted place for learning and growth.",
  aboutText:
    "Ramesh Soft Tech Academy is committed to providing professional, practical, and future-ready education that helps learners grow with confidence and achieve meaningful career opportunities.",
  homeMetaTitle: "Ramesh Soft Tech Academy | Professional Training & Career Growth",
  homeMetaDescription:
    "Explore practical, career-focused training programs designed to help learners build confidence, skills, and job-ready expertise.",
  aboutMetaTitle: "About Ramesh Soft Tech Academy | Career-Focused Education",
  aboutMetaDescription:
    "Learn about our mission, educators, and the practical learning approach that helps students and professionals grow with confidence.",
  courseMetaTitle: "Courses | Ramesh Soft Tech Academy",
  courseMetaDescription:
    "Discover skill-based programs in software development, digital marketing, cloud, design, and career readiness.",
  batchesMetaTitle: "Upcoming Online Training Batches | Ramesh Soft Tech Academy",
  batchesMetaDescription:
    "View upcoming online training batches, timings, and course details for flexible learning options.",
  visionMetaTitle: "Our Vision | Ramesh Soft Tech Academy",
  visionMetaDescription:
    "See our vision, mission, and values focused on practical learning, mentorship, and lifelong career growth.",
  contactMetaTitle: "Contact Us | Ramesh Soft Tech Academy",
  contactMetaDescription:
    "Speak with our team about programs, training batches, and enrollment support for your next step.",
  visionTitle: "Creating brighter futures through purposeful education.",
  visionText:
    "We believe the right learning environment, skilled mentors, and practical exposure can transform careers and confidence for every learner.",
  batchesTitle: "Upcoming Online Training Batches",
  batchesIntro:
    "Discover flexible learning schedules and mentor-guided training options tailored to your goals.",
  contactTitle: "Talk to our team today.",
  contactText:
    "Connect with us to learn more about our programs, training batches, and enrollment support.",
  phone: "+91 98765 43210",
  email: "thisisramesh4u@gmail.com",
  address: "Your location here",
  batchesRows: [
    {
      id: "dotnet-full-stack",
      courseName: ".NET Dotnet Full Stack",
      faculty: "Mr. Mahindra",
      date: "4-06-2026",
      duration: "4 Months",
      timings: "08:30 AM",
      syllabus: "Full Stack .NET",
      actionLabel: "Zoom",
      actionLink: "#",
    },
    {
      id: "java-placement",
      courseName: "Full Stack Java Placement Assistance Program",
      faculty: "Mr. Kannababu",
      date: "4-6-2026",
      duration: "4 Months",
      timings: "10:00 AM",
      syllabus: "Java, Spring Boot, Frontend",
      actionLabel: "Zoom",
      actionLink: "#",
    },
    {
      id: "dotnet-placement",
      courseName: ".NET Full Stack Dotnet Placement Assistance Program",
      faculty: "Mr. Kannababu",
      date: "4-6-2026",
      duration: "4 Months",
      timings: "10:00 AM",
      syllabus: ".NET, SQL, UI Skills",
      actionLabel: "Zoom",
      actionLink: "#",
    },
    {
      id: "data-analytics",
      courseName: "Data Analytics",
      faculty: "MS Certified Data Analyst",
      date: "4-6-2026",
      duration: "4 Months",
      timings: "10:00 AM",
      syllabus: "SQL, Excel, Power BI",
      actionLabel: "Zoom",
      actionLink: "#",
    },
    {
      id: "python-full-stack",
      courseName: "Python Full Stack",
      faculty: "Mr. Venkat Reddy",
      date: "4-6-2026",
      duration: "4 Months",
      timings: "10:00 AM",
      syllabus: "Python, Django, React",
      actionLabel: "Zoom",
      actionLink: "#",
    },
    {
      id: "data-science",
      courseName: "Data Science WITH GEN- AI",
      faculty: "REAL TIME EXPERT",
      date: "4-6-2026",
      duration: "4 Months",
      timings: "10:00 AM",
      syllabus: "AI, ML, GenAI Projects",
      actionLabel: "Zoom",
      actionLink: "#",
    },
  ],
};

export type SiteContent = typeof defaultSiteContent;

export function getDb() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }

  return neon(connectionString);
}

export async function ensureDatabaseReady() {
  const sql = getDb();
  if (!sql) {
    return;
  }

  await sql`
    CREATE TABLE IF NOT EXISTS site_content (
      id SERIAL PRIMARY KEY,
      key TEXT UNIQUE NOT NULL,
      value JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `;
}

export async function getSiteContent(): Promise<SiteContent> {
  noStore();

  const sql = getDb();
  if (!sql) {
    return defaultSiteContent;
  }

  await ensureDatabaseReady();

  const rows = await sql`SELECT value FROM site_content WHERE key = 'site_settings' LIMIT 1`;

  if (rows.length > 0) {
    const existing = rows[0]?.value;
    if (existing && typeof existing === "object") {
      return {
        ...defaultSiteContent,
        ...existing,
      };
    }
  }

  await sql`
    INSERT INTO site_content (key, value)
    VALUES ('site_settings', ${JSON.stringify(defaultSiteContent)}::jsonb)
    ON CONFLICT (key) DO NOTHING;
  `;

  return defaultSiteContent;
}

export async function saveSiteContent(content: Partial<SiteContent>) {
  const sql = getDb();
  if (!sql) {
    return defaultSiteContent;
  }

  await ensureDatabaseReady();

  const merged = {
    ...defaultSiteContent,
    ...content,
  };

  await sql`
    INSERT INTO site_content (key, value)
    VALUES ('site_settings', ${JSON.stringify(merged)}::jsonb)
    ON CONFLICT (key)
    DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();
  `;

  return merged;
}
