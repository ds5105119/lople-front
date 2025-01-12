"use client";

import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
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
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <div className="grid gap-5">
      <form action={formAction}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              이메일
            </Label>
            <Input
              id="email"
              name="email"
              placeholder="이메일 주소"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-1 relative">
            <Label className="sr-only" htmlFor="password">
              비밀번호
            </Label>
            <Input
              id="password"
              name="password"
              placeholder="비밀번호"
              type={showPassword ? "text" : "password"}
              autoCapitalize="none"
              autoComplete="current-password"
              autoCorrect="off"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
            </button>
          </div>
          <SubmitButton />
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">또는</span>
        </div>
      </div>
      <div className="grid gap-3">
        <Button variant="outline" type="button" className="bg-white text-black hover:bg-gray-100">
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google로 로그인
        </Button>
        <Button variant="secondary" type="button" className="bg-[#FEE500] text-black hover:bg-[#FDD000]">
          <KakaoIcon className="mr-2 h-4 w-4" />
          카카오로 3초만에 시작하기
        </Button>
      </div>
      <div className="relative flex justify-center text-xs uppercase">
        <span className="bg-background px-2 text-muted-foreground text-violet-700">회원가입</span>
      </div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </div>
  );
}
