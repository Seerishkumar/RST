import { NextResponse } from "next/server";
import { createDefaultAdminCredentials, createSessionToken, hashPassword, verifyPassword } from "@/lib/auth";
import { ensureDatabaseReady, getDb } from "@/lib/site-content";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = String(body?.email || "").trim().toLowerCase();
    const password = String(body?.password || "");

    if (!email || !password) {
      return NextResponse.json({ ok: false, message: "Email and password are required." }, { status: 400 });
    }

    const sql = getDb();
    if (!sql) {
      return NextResponse.json({ ok: false, message: "Neon database is not configured." }, { status: 500 });
    }

    await ensureDatabaseReady();

    const adminCreds = createDefaultAdminCredentials();
    if (!adminCreds.email || !adminCreds.password) {
      return NextResponse.json({ ok: false, message: "Admin credentials are not configured." }, { status: 500 });
    }

    const initialPasswordHash = await hashPassword(adminCreds.password);
    await sql`
      INSERT INTO admin_users (email, password_hash)
      VALUES (${adminCreds.email}, ${initialPasswordHash})
      ON CONFLICT (email) DO NOTHING;
    `;

    const users = await sql`SELECT id, email, password_hash FROM admin_users WHERE email = ${email}`;
    const user = users[0];

    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return NextResponse.json({ ok: false, message: "Invalid email or password." }, { status: 401 });
    }

    const token = await createSessionToken({ userId: user.id, email: String(user.email), role: "admin" });
    const response = NextResponse.json({ ok: true, user: { email: user.email } });

    response.cookies.set("rst_session", token, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error", error);
    return NextResponse.json({ ok: false, message: "Unable to log in right now." }, { status: 500 });
  }
}
