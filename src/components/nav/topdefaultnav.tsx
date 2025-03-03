"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Share2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function TopDefaultHeader() {
  const router = useRouter();

  const handleBack = () => {
    const referrer = document.referrer;
    const currentDomain = window.location.hostname;
    const referrerDomain = referrer ? new URL(referrer).hostname : null;
    const canGoBack = referrerDomain ? referrerDomain === currentDomain : false;

    console.log(canGoBack, window.history, referrer);

    if (canGoBack && window.history.length > 1) {
      window.history.back();
    } else if (referrer) {
      window.location.href = referrer;
    } else {
      router.push("/");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-screen-md items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <Home className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
