import Image from "next/image";
import { Button } from "@/components/ui/button";
import MobileMainHeader from "@/components/header/mobilemainheader";
import MobileHeader from "@/components/header/mobiledefaultheader";
import { auth, signIn, signOut } from "@/auth";
import { Settings } from "lucide-react";
import { Heart, NotebookPen } from "lucide-react";
import MenuCard from "@/components/card/menucard";
import MenuCardButton from "@/components/button/menucardbutton";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <MobileHeader text="내 가구 정보" />

      <div className="p-4 space-y-3">
        <MenuCard text="나의 정보">
          <MenuCardButton href="/accounts/welfare/data" icon={NotebookPen} text="내 가구 정보" />
          <MenuCardButton href="/settings/likes" icon={Heart} text="관심목록" />
        </MenuCard>
        <MenuCard text="전체 서비스">
          <MenuCardButton href="/accounts/welfare/data" icon={NotebookPen} text="내 가구 정보" />
          <MenuCardButton href="/settings/likes" icon={Heart} text="관심목록" />
        </MenuCard>
        <MenuCard text="나의 정보">
          <MenuCardButton href="/accounts/welfare/data" icon={NotebookPen} text="내 가구 정보" />
          <MenuCardButton href="/settings/likes" icon={Heart} text="관심목록" />
        </MenuCard>
      </div>
    </div>
  );
}
