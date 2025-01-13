"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

const EMAIL_DOMAINS = ["gmail.com", "naver.com", "daum.net", "kakao.com", "hanmail.net"];

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [customDomain, setCustomDomain] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);

    // 실제 회원가입 로직 구현
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* 이메일 입력 */}
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input
              id="email"
              type="text"
              placeholder="이메일"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              className={cn(errors.email && "border-red-500 focus-visible:ring-red-500")}
            />
          </div>
          <span className="flex items-center text-muted-foreground">@</span>
          <Select onValueChange={(value) => setCustomDomain(value === "custom")}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent>
              {EMAIL_DOMAINS.map((domain) => (
                <SelectItem key={domain} value={domain}>
                  {domain}
                </SelectItem>
              ))}
              <SelectItem value="custom">직접입력</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      {/* 비밀번호 입력 */}
      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="영문, 숫자를 포함한 8자 이상"
            autoCapitalize="none"
            autoComplete="new-password"
            disabled={isLoading}
            className={cn(errors.password && "border-red-500 focus-visible:ring-red-500")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
      </div>

      {/* 비밀번호 확인 */}
      <div className="space-y-2">
        <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
        <div className="relative">
          <Input
            id="passwordConfirm"
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 한번 더 입력해주세요"
            autoCapitalize="none"
            autoComplete="new-password"
            disabled={isLoading}
            className={cn(errors.passwordConfirm && "border-red-500 focus-visible:ring-red-500")}
          />
        </div>
        {errors.passwordConfirm && <p className="text-xs text-red-500">{errors.passwordConfirm}</p>}
      </div>

      {/* 닉네임 */}
      <div className="space-y-2">
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          type="text"
          placeholder="다른 유저와 겹치지 않도록 입력해주세요 (2~20자)"
          disabled={isLoading}
          className={cn(errors.nickname && "border-red-500 focus-visible:ring-red-500")}
        />
        {errors.nickname && <p className="text-xs text-red-500">{errors.nickname}</p>}
      </div>

      {/* 약관 동의 */}
      <div className="space-y-4">
        <Label>약관동의</Label>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="terms" />
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              [필수] 서비스 이용약관 동의
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="privacy" />
            <label
              htmlFor="privacy"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              [필수] 개인정보 수집 및 이용 동의
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="marketing" />
            <label
              htmlFor="marketing"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              [선택] 마케팅 정보 수신 동의
            </label>
          </div>
        </div>
      </div>

      <Button className="w-full" disabled={isLoading}>
        {isLoading ? "가입 진행 중..." : "회원가입"}
      </Button>

      <div className="text-center text-sm">
        이미 계정이 있으신가요?{" "}
        <Link href="/login" className="font-semibold text-primary hover:underline">
          로그인
        </Link>
      </div>
    </form>
  );
}
