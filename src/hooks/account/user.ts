import { revalidatePath } from "next/cache";
import { loginApi } from "@/hooks/account/api/user";
import { LoginRequestSchema, LoginRequestProps } from "@/types/accounts/api";
import { ZodError } from "zod";

export const login = async (
  currentState: {
    code: string;
    message: string;
  },
  formData: FormData
) => {
  const formDataEntries = Object.fromEntries(formData.entries());
  const parseResult = LoginRequestSchema.safeParse(formDataEntries);

  if (!parseResult.success) {
    return { code: "PARSE_ERROR", message: "로그인 데이터가 유효하지 않습니다.", error: parseResult.error.errors };
  }

  const data: LoginRequestProps = parseResult.data;
  try {
    const response = await loginApi(data);
    revalidatePath("/");
    return { code: "SUCCESS", message: "Login success", data: response, error: undefined };
  } catch (e) {
    return { code: "SERVER_ERROR", message: "Failed to login", error: e };
  }
};
