import { Metadata } from "next";
import MobileMainHeader from "@/components/header/mobilemainheader";
import MobileHeaderButton from "@/components/button/mobileheaderbutton";
import RecommendWelfareSection from "@/components/section/recommendwelfare";
import SectionButton from "@/components/button/sectionbutton";
import { Search } from "lucide-react";

export const metadata: Metadata = {
  title: "회원가입 | 복지 정책 서비스",
  description: "이메일로 회원가입하고 맞춤형 복지 정책 정보를 받아보세요.",
};

export default async function Page() {
  return (
    <div className="container flex w-full h-full flex-col items-center">
      <MobileMainHeader text="서비스">
        <MobileHeaderButton icon={Search} />
      </MobileMainHeader>

      <div className="mx-auto flex w-full flex-col justify-start space-y-6 p-8">
        <SectionButton href="/explore/welfare" text="모든 추천 정책 확인하기" />
        <RecommendWelfareSection />
      </div>
    </div>
  );
}
