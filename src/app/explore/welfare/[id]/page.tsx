import { auth } from "@/auth";
import MobileDetailHeader from "@/components/header/mobiledetailheader";
import MobileHeaderShareButton from "@/components/button/mobileheadersharebutton";
import { welfareSchema } from "@/@types/openApi/welfare";
import { WelfareInfo } from "@/components/welfare/welfare-info";
import { WelfareDetails } from "@/components/welfare/welfare-details";
import { WelfareActions } from "@/components/welfare/welfare-actions";
import { Share } from "lucide-react";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const firstResponse = await fetch(`${process.env.NEXT_PUBLIC_WELFARE_STATIC_PARAMS_URL}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    redirect: "manual",
    credentials: "include",
  });

  if (firstResponse.status === 307) {
    const redirectUrl = new URL(
      firstResponse.headers.get("location")!,
      `${process.env.NEXT_PUBLIC_WELFARE_STATIC_PARAMS_URL}`
    ).toString();

    const sessionCookie = firstResponse.headers.get("set-cookie")?.split(";")[0]; // 세션 쿠키 추출
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
      ...(session?.access_token && { Authorization: `Bearer ${session.access_token}` }),
    },
    redirect: "follow",
    credentials: "include",
  });

  const data = await response.json();
  const welfare = welfareSchema.parse(data);

  return (
    <div>
      <MobileDetailHeader text={"정책 세부"}>
        <MobileHeaderShareButton />
      </MobileDetailHeader>

      <div className="space-y-4 px-6 mt-8">
        <WelfareInfo welfare={welfare} />
        <WelfareDetails welfare={welfare} />
      </div>

      <WelfareActions applyUrl={welfare.apply_url} contact={welfare.contact} />
    </div>
  );
}
