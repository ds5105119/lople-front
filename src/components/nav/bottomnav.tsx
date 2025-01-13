"use client";

import { Home, FileText, MessageSquare, Gift, Menu } from "lucide-react";
import { NavItem } from "@/components/nav/navitem";

export function Navigation() {
  return (
    <nav className="flex h-16 w-full items-center justify-around border-t bg-background">
      <NavItem href="/" icon={Home} label="홈" />
      <NavItem href="/explore" icon={FileText} label="추천" />
      <NavItem href="/community" icon={MessageSquare} label="커뮤니티" />
      <NavItem href="/benefits" icon={Gift} label="혜택받기" />
      <NavItem href="/menu" icon={Menu} label="메뉴" />
    </nav>
  );
}
