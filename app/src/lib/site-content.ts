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
  phone: "+91 98765 43210",
  email: "info@rameshsofttechacademy.com",
  address: "Your location here",
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
