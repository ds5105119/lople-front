import { Metadata } from "next";
import MobileDetailHeader from "@/components/header/mobiledetailheader";
import DetailRecommendWelfareSection from "@/components/section/detailrecommendwelfare";

export const metadata: Metadata = {
  title: "회원가입 | 복지 정책 서비스",
  description: "이메일로 회원가입하고 맞춤형 복지 정책 정보를 받아보세요.",
};

export default async function Page() {
  return (
    <div className="container flex w-full h-full flex-col items-center">
      <MobileDetailHeader text={"정책 모아보기"} />
      <div className="mx-auto flex w-full flex-col justify-start space-y-6 p-8">
        <DetailRecommendWelfareSection />
      </div>
    </div>
  );
}
