import { Eye, Bookmark } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Welfare } from "@/@types/openApi/welfare";
import Link from "next/link";

interface WelfareCardProps {
  img?: string;
  href?: string;
  bookmarks?: number;
  data: Welfare;
  className?: string;
}

const formatNumber = (num: number) => {
  if (num < 1000) {
    return new Intl.NumberFormat("ko-KR").format(num); // 1~999는 그대로 표시
  } else if (num < 1_000_000) {
    return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K`; // 1,000 이상 1,000,000 미만은 K로 표시
  } else if (num < 1_000_000_000) {
    return `${(num / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`; // 1,000,000 이상 1,000,000,000 미만은 M으로 표시
  } else {
    return `${(num / 1_000_000_000).toFixed(1).replace(/\.0$/, "")}B`; // 1,000,000,000 이상은 B로 표시
  }
};

export default function WelfareCard({ img, href, bookmarks, data, className }: WelfareCardProps) {
  return (
    <Link href={`/explore/welfare/${data.service_id}`}>
      <Card className={cn("transition-all duration-200 hover:shadow-md", className)}>
        <CardContent className="p-4 space-y-2">
          <div className="flex items-center align-baseline space-x-2">
            {img && (
              <div className="w-6 h-6">
                <img src={img} alt="부서 로고" className="w-full h-full" />
              </div>
            )}
            <span className="font-bold text-base leading-tight">{data.service_name}</span>
            <span className="text-sm text-muted-foreground">@{data.receiving_agency}</span>
          </div>

          <div className="space-y-2">
            <p className="text-sm">{data.service_summary}</p>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4" />
              <span>{formatNumber(data.views)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bookmark className="w-4 h-4" />
              <span>{formatNumber(bookmarks ?? 0)}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
