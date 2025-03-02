import type { welfare } from "@/@types/openApi/welfare";
import { Card, CardContent } from "@/components/ui/card";
import { WelfareTags } from "./welfare-tags";

interface WelfareInfoProps {
  welfare: welfare;
}

export function WelfareInfo({ welfare }: WelfareInfoProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{welfare.service_name}</h1>
        <p className="text-sm text-muted-foreground">{welfare.service_summary}</p>
      </div>

      <WelfareTags
        category={welfare.service_category || ""}
        type={welfare.support_type || ""}
        isOnline={welfare.apply_method?.includes("온라인")}
      />

      <Card>
        <CardContent>
          <div className="flex w-full justify-between px-2">
            <span className="text-sm text-gray-600">지원혜택</span>
            <span className="text-sm font-medium truncate max-w-[calc(50%-0.5rem)]">{welfare.support_details}</span>
          </div>
          <div className="flex w-full justify-between px-2">
            <span className="text-sm text-gray-600">신청기간</span>
            <span className="text-sm font-medium truncate max-w-[calc(50%-0.5rem)]">{welfare.apply_period}</span>
          </div>
          <div className="flex w-full justify-between px-2">
            <span className="text-sm text-gray-600">정책기관</span>
            <span className="text-sm font-medium truncate max-w-[calc(50%-0.5rem)]">{welfare.dept_name}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
