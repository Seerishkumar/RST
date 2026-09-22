import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set("rst_session", "", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    expires: new Date(0),
    secure: process.env.NODE_ENV === "production",
  });
  return response;
}
