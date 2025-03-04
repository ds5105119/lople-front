/**
 * Copyright (c) 2025, IIH. All rights reserved.
 * 바닥에 위치하는 세로 방향 Mobile 환경의 NavBar 컴포넌트입니다.
 */

"use client";

import { Home, FileText, MessageSquare, Gift, Menu } from "lucide-react";
import { NavItem } from "@/components/button/bottomnavbutton";

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 w-full flex justify-center">
      <div className="flex h-16 max-w-[500px] items-center justify-around pt-1 w-full border-t bg-background">
        <NavItem href="/" icon={Home} label="홈" />
        <NavItem href="/explore" icon={FileText} label="추천" />
        <NavItem href="/community" icon={MessageSquare} label="커뮤니티" />
        <NavItem href="/benefits" icon={Gift} label="혜택받기" />
        <NavItem href="/accounts" icon={Menu} label="메뉴" />
      </div>
    </nav>
  );
}
