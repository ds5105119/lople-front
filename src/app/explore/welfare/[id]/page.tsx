import { auth } from "@/auth";

// Next.js will invalidate the cache when a
// request comes in, at most once every 60 seconds.
export const revalidate = 60;

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.

export const dynamicParams = true; // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const firstResponse = await fetch(`${process.env.NEXT_PUBLIC_WELFARE_STATIC_PARAMS_URL}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "manual", // 수동 리다이렉트 처리
    credentials: "include",
  });

  // 2. 리다이렉트 발생 시 처리
  if (firstResponse.status === 307) {
    const redirectUrl = new URL(
      firstResponse.headers.get("location")!,
      `${process.env.NEXT_PUBLIC_WELFARE_STATIC_PARAMS_URL}` // 절대 경로로 변환
    ).toString();

    const sessionCookie = firstResponse.headers.get("set-cookie")?.split(";")[0]; // 세션 쿠키 추출

    // 3. 리다이렉트 URL로 재요청 (+쿠키 포함)
    const secondResponse = await fetch(redirectUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(sessionCookie && { Cookie: sessionCookie }), // 쿠키 추가
      },
      credentials: "include",
    });

    const response = secondResponse.json();
    return Object.entries(response).map(([key, value]) => [key, String(value)]);
  }

  // 리다이렉트 없을 경우 기본 처리
  const response = firstResponse.json();
  return Object.entries(response).map(([key, value]) => [key, String(value)]);
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id;
  const session = await auth();

  const response = await fetch(`${process.env.NEXT_PUBLIC_WELFARE_URL}?id=${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.access_token}`,
    },
    redirect: "follow",
    credentials: "include",
  });

  return <div>{response.text()}</div>;
}
