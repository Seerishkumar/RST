import { NextResponse } from "next/server";
import { getCookieValue, SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { getSiteContent, normalizeCollection, saveSiteContent, type BatchRecord } from "@/lib/site-content";

async function requireAdmin(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionToken = getCookieValue(cookieHeader, SESSION_COOKIE_NAME);
  return sessionToken ? verifySessionToken(sessionToken) : null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin(request);
  if (!session) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const recordId = decodeURIComponent(id);
  const content = await getSiteContent();
  const batches = normalizeCollection<BatchRecord>(content.batchesRows);
  const batch = batches.find((item) => item.id === recordId);

  if (!batch) {
    return NextResponse.json({ ok: false, message: "Batch not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, batch });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await requireAdmin(request);
  if (!session) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const recordId = decodeURIComponent(id);
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

    const content = await getSiteContent();
    const batches = normalizeCollection<BatchRecord>(content.batchesRows);
    const existingIndex = batches.findIndex((item) => item.id === recordId);

    if (existingIndex === -1) {
      return NextResponse.json({ ok: false, message: "Batch not found." }, { status: 404 });
    }

    const nextBatch: BatchRecord = {
      ...batches[existingIndex],
      ...body,
      id: recordId,
      courseName,
      faculty,
      date,
    };

    batches[existingIndex] = nextBatch;
    await saveSiteContent({ ...content, batchesRows: batches });

    return NextResponse.json({ ok: true, batch: nextBatch });
  } catch (error) {
    console.error("Update batch record error", error);
    return NextResponse.json({ ok: false, message: "Unable to update batch." }, { status: 500 });
  }
}
