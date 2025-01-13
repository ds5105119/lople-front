"use client";

import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { Toast } from "@/components/toast/toast";
import { login } from "@/hooks/account/user";
import { cn } from "@/lib/utils";
import { LoginRequestSchema, LoginRequestProps } from "@/types/accounts/api";
import { ActionState } from "@/types/action";

const initialState = {
  code: "",
  message: "",
};

interface LoginFormProps {
  setPending: (isPending: boolean) => void;
}

const LoginForm = () => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [state, formAction, isPending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginRequestProps>({
    resolver: zodResolver(LoginRequestSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <form action={formAction}>
      <div className="grid gap-3">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            이메일
          </Label>
          <Input
            id="email"
            placeholder="이메일"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            className={cn(state.code == "PARSE_ERROR" && "border-red-500 focus-visible:ring-red-500")}
            {...register("email")}
          />
        </div>
        <div className="grid gap-1 relative">
          <Label className="sr-only" htmlFor="password">
            비밀번호
          </Label>
          <Input
            id="password"
            placeholder="비밀번호"
            type={showPassword ? "text" : "password"}
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect="off"
            className={cn(errors.password && "border-red-500 focus-visible:ring-red-500")}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            {showPassword ? <EyeOff className="h-4 w-4 text-gray-500" /> : <Eye className="h-4 w-4 text-gray-500" />}
          </button>
        </div>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "로그인"}
        </Button>
      </div>
      {toastMessage && <Toast message={toastMessage} onClose={() => setToastMessage(null)} />}
    </form>
  );
};

export default LoginForm;
