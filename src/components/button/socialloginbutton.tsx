import { GoogleIcon, KakaoIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";

const GoogleLoginButton = () => {
  return (
    <Button variant="outline" type="button" className="bg-white text-black hover:bg-gray-100 font-medium">
      <GoogleIcon className="mr-2 h-4 w-4" />
      <span>
        <span className="font-semibold">Google</span>로 로그인
      </span>
    </Button>
  );
};

const KakaoLoginButton = () => {
  return (
    <Button variant="secondary" type="button" className="bg-[#FEE500] text-black hover:bg-[#FDD000] font-medium">
      <KakaoIcon className="mr-2 h-4 w-4" />
      <span>
        <span className="font-semibold">카카오</span>로 3초만에 로그인
      </span>
    </Button>
  );
};

export { GoogleLoginButton, KakaoLoginButton };
