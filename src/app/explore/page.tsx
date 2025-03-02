import { Metadata } from "next";
import { GovernmentSupportCard } from "@/components/card/govwelfarecard";
import { welfareRecommandAPI } from "@/hooks/openApi/api/welfare";

export const metadata: Metadata = {
  title: "회원가입 | 복지 정책 서비스",
  description: "이메일로 회원가입하고 맞춤형 복지 정책 정보를 받아보세요.",
};

export default async function Page() {
  const x = await welfareRecommandAPI({ page: 0, size: 10 });

  return (
    <div className="container flex w-full h-full flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[400px]"></div>
      {x.map((value, index) => {
        return <GovernmentSupportCard key={index} data={value} />;
      })}
    </div>
  );
}
