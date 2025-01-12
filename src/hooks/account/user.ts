import { revalidatePath } from "next/cache";
import { loginApi } from "@/hooks/account/api/user";
import { LoginRequestSchema, LoginRequestProps } from "@/types/accounts/api";

export const login = async (
  prevState: {
    message: string;
  },
  formData: FormData
) => {
  const formDataEntries = Object.fromEntries(formData.entries());
  const parseResult = LoginRequestSchema.safeParse(formDataEntries);

  if (!parseResult.success) {
    return { message: "로그인 데이터가 유효하지 않습니다.", errors: parseResult.error.errors };
  }

  const data: LoginRequestProps = parseResult.data;
  try {
    const response = await loginApi(data);
    revalidatePath("/");
    return { message: "Login success", data: response };
  } catch (e) {
    return { message: "Failed to login", error: e };
  }
};
