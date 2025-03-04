import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MobileMainHeader from "@/components/header/mobilemainheader";
import MobileHeader from "@/components/header/mobiledefaultheader";
import { auth, signIn, signOut } from "@/auth";
import { Settings } from "lucide-react";
import { Heart, NotebookPen } from "lucide-react";
import MenuCard from "@/components/card/menucard";
import MenuCardButton from "@/components/button/menucardbutton";
import { UserDataSchema } from "@/@types/accounts/userdata";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load data");
  const data = await res.json();
  return UserDataSchema.parse(data);
};

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <MobileHeader text="내 가구 정보" />

      <div className="p-4 space-y-3">
        안녕하세요 {session?.user && session.user.name} 님
        <Tabs defaultValue="primary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="primary">기본 정보</TabsTrigger>
            <TabsTrigger value="secondary">추가 정보</TabsTrigger>
          </TabsList>
          <TabsContent value="primary">
            <div className="grid w-full items-center gap-1.5 p-1">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="Email" />
            </div>
          </TabsContent>
          <TabsContent value="secondary">
            <div className="flex flex-wrap gap-2 min-h-fit">
              <Button variant="outline" size="sm">
                다문화가정
              </Button>
              <Button variant="outline" size="sm">
                북한이탈주민
              </Button>
              <Button variant="outline" size="sm">
                한부모가정 조부모가정
              </Button>
              <Button variant="outline" size="sm">
                무주택자
              </Button>
              <Button variant="outline" size="sm">
                신규전입
              </Button>
              <Button variant="outline" size="sm">
                다자녀 가구
              </Button>
              <Button variant="outline" size="sm">
                확대가족
              </Button>
              <Button variant="outline" size="sm">
                장애인
              </Button>
              <Button variant="outline" size="sm">
                상여군인
              </Button>
              <Button variant="outline" size="sm">
                질병
              </Button>
            </div>
          </TabsContent>
        </Tabs>
        <MenuCard text="나의 정보">
          <MenuCardButton href="/accounts/welfare/data" icon={NotebookPen} text="내 가구 정보" />
          <MenuCardButton href="/settings/likes" icon={Heart} text="관심목록" />
        </MenuCard>
        <MenuCard text="전체 서비스">
          <MenuCardButton href="/accounts/welfare/data" icon={NotebookPen} text="내 가구 정보" />
          <MenuCardButton href="/settings/likes" icon={Heart} text="관심목록" />
        </MenuCard>
      </div>
    </div>
  );
}
