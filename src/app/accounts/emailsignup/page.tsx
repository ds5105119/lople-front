import { Metadata } from "next";
import SignUpForm from "@/components/form/emailsignupform";
import { GoogleIcon, KakaoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "회원가입 | 복지 정책 서비스",
  description: "이메일로 회원가입하고 맞춤형 복지 정책 정보를 받아보세요.",
};

export default function SignUpPage() {
  return (
    <div className="flex w-full justify-center">
      <div className="container max-w-[400px] px-4 py-8">
        <div className="mb-8 space-y-6">
          <h1 className="text-2xl font-semibold tracking-tight w-full">회원가입</h1>

          <div className="grid gap-8 pt-2">
            <div className="grid gap-3">
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">또는 SNS 계정으로 간편하게 회원가입</span>
              </div>
              <Button variant="outline" type="button" className="bg-white text-black hover:bg-gray-100 font-medium">
                <GoogleIcon className="mr-2 h-4 w-4" />
                <span>
                  <span className="font-semibold">Google</span>로 로그인
                </span>
              </Button>
              <Button
                variant="secondary"
                type="button"
                className="bg-[#FEE500] text-black hover:bg-[#FDD000] font-medium"
              >
                <KakaoIcon className="mr-2 h-4 w-4" />
                <span>
                  <span className="font-semibold">카카오</span>로 3초만에 로그인
                </span>
              </Button>
            </div>

            <div className="relative flex items-center">
              <span className="w-full border-t border-gray-200 dark:border-gray-700" />
            </div>
          </div>
        </div>
        <SignUpForm />
      </div>
    </div>
  );
}
