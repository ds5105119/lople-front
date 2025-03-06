import type { Welfare } from "@/@types/openApi/welfare";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WelfareTags } from "./welfare-tags";

interface WelfareInfoProps {
  welfare: Welfare;
}

export function WelfareInfo({ welfare }: WelfareInfoProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-3.5">
        <WelfareTags
          category={welfare.service_category || ""}
          type={welfare.support_type || ""}
          isOnline={welfare.apply_method?.includes("온라인")}
        />
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">{welfare.service_name}</h1>
          <p className="text-sm text-muted-foreground">{welfare.service_summary}</p>
        </div>
      </div>

      <Tabs defaultValue="요약" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="요약">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="요약">
          <Card>
            <CardContent className="grid gap-4">
              <div className="w-full">
                <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">연락처</p>
                    <p className="text-sm text-muted-foreground">{welfare.contact}</p>
                  </div>
                </div>
                <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">신청기간</p>
                    <p className="text-sm text-muted-foreground">{welfare.apply_period}</p>
                  </div>
                </div>
                <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0">
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">정책기관</p>
                    <p className="text-sm text-muted-foreground">{welfare.receiving_agency}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="password"></TabsContent>
      </Tabs>
    </div>
  );
}
