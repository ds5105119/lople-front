import { auth } from "@/auth";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = searchParams.get("page") || "0";
  const size = searchParams.get("size") || "10";

  try {
    const session = await auth();

    const response = await fetch(`${process.env.NEXT_PUBLIC_RECOMMEND_WELFARE_URL}?page=${page}&size=${size}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      redirect: "follow",
      credentials: "include",
    });

    // 응답 데이터 받기
    const data = await response.json();

    // JSON 응답 반환
    return NextResponse.json(data);
  } catch (error) {
    console.error("API error:", error);

    // 오류 응답 반환
    return NextResponse.json({ error: "Failed to fetch welfare data" }, { status: 500 });
  }
}
