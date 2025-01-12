"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { GoogleIcon, KakaoIcon } from "@/components/icon/loading";
import { Toast } from "@/components/toast/toast";
import { login } from "@/hooks/account/user";

const initialState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      로그인
    </Button>
  );
}

export default function LoginForm() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [state, formAction] = useActionState(login, initialState);

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="grid gap-6">
      <form action={formAction}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              이메일
            </Label>
            <Input id="email" name="email" placeholder="name@example.com" type="email" autoCapitalize="none" autoComplete="email" autoCorrect="off" />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              비밀번호
            </Label>
            <Input id="password" name="password" placeholder="비밀번호" type="password" autoCapitalize="none" autoComplete="current-password" autoCorrect="off" />
          </div>
          <SubmitButton />
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">소셜 로그인</span>
        </div>
      </div>
      <div className="grid gap-2">
        <Button variant="outline" type="button" className="bg-white text-black hover:bg-gray-100">
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google로 로그인
        </Button>
        <Button variant="outline" type="button" className="bg-[#FEE500] text-black hover:bg-[#FDD000]">
          <KakaoIcon className="mr-2 h-4 w-4" />
          카카오로 로그인
        </Button>
      </div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
}
