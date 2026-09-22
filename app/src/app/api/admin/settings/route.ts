import { NextResponse } from "next/server";
import { getCookieValue, SESSION_COOKIE_NAME, verifySessionToken } from "@/lib/auth";
import { defaultSiteContent, getSiteContent, saveSiteContent } from "@/lib/site-content";

export async function GET(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionToken = getCookieValue(cookieHeader, SESSION_COOKIE_NAME);

  if (!sessionToken || !(await verifySessionToken(sessionToken))) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  const content = await getSiteContent();
  return NextResponse.json({ ok: true, content });
}

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("cookie") || "";
  const sessionToken = getCookieValue(cookieHeader, SESSION_COOKIE_NAME);

  if (!sessionToken || !(await verifySessionToken(sessionToken))) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const sanitized = {
      ...defaultSiteContent,
      ...body,
    };

    const saved = await saveSiteContent(sanitized);
    return NextResponse.json({ ok: true, content: saved });
  } catch (error) {
    console.error("Save site content error", error);
    return NextResponse.json({ ok: false, message: "Unable to save content." }, { status: 500 });
  }
}
