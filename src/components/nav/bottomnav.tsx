/**
 * Copyright (c) 2025, IIH. All rights reserved.
 * 바닥에 위치하는 세로 방향 Mobile 환경의 NavBar 컴포넌트입니다.
 */

"use client";

import { Home, FileText, MessageSquare, Gift, Menu } from "lucide-react";
import { NavItem } from "@/components/nav/navitem";

export function Navigation() {
  return (
    <nav className="flex h-16 w-full items-center pt-1 justify-around border-t bg-background">
      <NavItem href="/" icon={Home} label="홈" />
      <NavItem href="/explore" icon={FileText} label="추천" />
      <NavItem href="/community" icon={MessageSquare} label="커뮤니티" />
      <NavItem href="/benefits" icon={Gift} label="혜택받기" />
      <NavItem href="/menu" icon={Menu} label="메뉴" />
    </nav>
  );
}
