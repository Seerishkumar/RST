import { NextResponse } from "next/server";
import { getCookieValue, SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getSiteContent, normalizeCollection, upsertBatchRecord, type BatchRecord } from "@/lib/site-content";

function requireAdmin(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionToken = getCookieValue(cookieHeader, SESSION_COOKIE_NAME);

  return sessionToken ? verifySessionToken(sessionToken) : null;
}

export async function GET(request: Request) {
  const session = await requireAdmin(request);
  if (!session) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json({
    ok: true,
    batches: normalizeCollection<BatchRecord>(content.batchesRows),
  });
}

export async function POST(request: Request) {
  const session = await requireAdmin(request);
  if (!session) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const courseName = String(body?.courseName || "").trim();
    const faculty = String(body?.faculty || "").trim();
    const date = String(body?.date || "").trim();

    if (!courseName || !faculty || !date) {
      return NextResponse.json(
        { ok: false, message: "Course name, faculty, and date are required." },
        { status: 400 },
      );
    }

    const record = await upsertBatchRecord(body);
    return NextResponse.json({ ok: true, batch: record });
  } catch (error) {
    console.error("Create batch record error", error);
    return NextResponse.json({ ok: false, message: "Unable to save batch." }, { status: 500 });
  }
}
