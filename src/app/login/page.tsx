import { Metadata } from "next";
import { cn } from "@/lib/utils";
import { GoogleLoginButton, KakaoLoginButton } from "@/components/button/socialloginbutton";
import Link from "next/link";
import LoginForm from "@/components/form/loginform";

export const metadata: Metadata = {
  title: "로그인 | 맞춤형 복지 정책 서비스",
  description: "개인 맞춤형 복지 정책 정보를 제공하는 서비스에 로그인하세요.",
};

export default function LoginPage() {
  return (
    <div className="container flex w-full h-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <span>
            <h1 className="text-2xl font-extrabold tracking-tight text-violet-700">올집</h1>
          </span>
          <p className="text-sm text-muted-foreground">로그인하여 신청할 수 있는 모든 복지 정보를 확인하세요</p>
        </div>
        <LoginForm />
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">또는</span>
          </div>
        </div>
        <div className="grid gap-3">
          <GoogleLoginButton />
          <KakaoLoginButton />
        </div>
        <div className="grid gap-3">
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-background px-2">비밀번호를 잊으셨나요?</span>
          </div>
          <div className="relative flex justify-center text-sm uppercase">
            <span className="bg-background px-2 text-muted-foreground">계정이 없으신가요?</span>
            <Link
              href="/accounts/emailsignup"
              className={cn("transition-colors text-violet-500 font-semibold hover:text-violet-700")}
            >
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
