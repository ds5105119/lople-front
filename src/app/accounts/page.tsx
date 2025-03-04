import Image from "next/image";
import { Button } from "@/components/ui/button";
import MobileMainHeader from "@/components/header/mobilemainheader";
import { auth, signIn, signOut } from "@/auth";
import { Settings } from "lucide-react";
import { Heart, NotebookPen } from "lucide-react";
import MenuCard from "@/components/card/menucard";
import MenuCardButton from "@/components/button/menucardbutton";
import MobileHeaderButton from "@/components/button/mobileheaderbutton";

export default async function Home() {
  const session = await auth();

  return (
    <div className="h-full">
      <MobileMainHeader text={"내 정보"}>
        {session?.user ? (
          <MobileHeaderButton icon={Settings} />
        ) : (
          <form
            action={async () => {
              "use server";
              await signIn("keycloak", { redirectTo: "/" });
            }}
          >
            <Button variant="default" type="submit">
              로그인
            </Button>
          </form>
        )}
      </MobileMainHeader>

      <div className="h-full bg-muted p-4 space-y-3">
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
