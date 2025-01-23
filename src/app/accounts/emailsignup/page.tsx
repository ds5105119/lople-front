import { Metadata } from "next";
import Link from "next/link";
import SignUpForm from "@/components/form/emailsignupform";
import { GoogleLoginButton, KakaoLoginButton } from "@/components/button/socialloginbutton";

export const metadata: Metadata = {
  title: "회원가입 | 복지 정책 서비스",
  description: "이메일로 회원가입하고 맞춤형 복지 정책 정보를 받아보세요.",
};

export default function SignUpPage() {
  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[400px] px-4 py-8 space-y-6">
        <h1 className="text-2xl font-semibold tracking-tight w-full">회원가입</h1>

        <div className="mb-8 space-y-6">
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">또는 SNS 계정으로 간편하게 회원가입</span>
          </div>

          <div className="grid gap-3">
            <GoogleLoginButton />
            <KakaoLoginButton />
          </div>

          <div className="relative flex items-center">
            <span className="w-full border-t border-gray-200 dark:border-gray-700" />
          </div>
        </div>

        <SignUpForm />

        <div className="text-center text-sm">
          이미 계정이 있으신가요?{" "}
          <Link href="/login" className="font-semibold text-primary hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
