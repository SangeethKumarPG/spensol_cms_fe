import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  const backendRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await backendRes.json();

  if (!backendRes.ok) {
    return NextResponse.json(data, {
      status: backendRes.status,
    });
  }

  const res = NextResponse.json(data);
  
  // forward cookie from backend → browser (same-origin)
  const setCookie = backendRes.headers.get("set-cookie");
  if (setCookie) {
    res.headers.set("Set-Cookie", setCookie);
  }

  return res;
}
