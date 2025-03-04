/**
 * Copyright (c) 2025, IIH. All rights reserved.
 * 바닥에 위치하는 세로 방향 Mobile 환경의 NavBar 안의 Item 컴포넌트입니다.
 */
import Link from "next/link";
import { LucideIcon, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MenuCardItemProps {
  href: string;
  icon: LucideIcon;
  text: string;
  label?: string;
}

export default function MenuCardButton({ href, icon: Icon, text, label }: MenuCardItemProps) {
  return (
    <Link href={href}>
      <Button variant="ghost" className="h-11 w-full !px-2.5 text-base font-medium">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-1.5">
            <Icon className="!size-5" strokeWidth={2.5} />
            <p>{text}</p>
          </div>
          <div className="flex items-center space-x-1.5">
            <ChevronRight className="!size-5 text-muted-foreground" strokeWidth={2.5} />
            <p className="text-sm">{label}</p>
          </div>
        </div>
      </Button>
    </Link>
  );
}
