import { Metadata } from "next";
import Image from "next/image";
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
          <Image src="/logo.svg" alt="로고" width={50} height={50} className="mx-auto" />
          <h1 className="text-2xl font-semibold tracking-tight">올집</h1>
          <p className="text-sm text-muted-foreground">로그인하여 개인 맞춤형 복지 정책 정보를 확인하세요</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
