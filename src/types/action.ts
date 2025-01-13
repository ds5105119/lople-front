import { ZodError } from "zod";

export type ActionState =
  | {
      code: "SUCCESS"; // 성공
      message: string;
      data: any;
    }
  | {
      code: "VALIDATION_ERROR"; // Zod 유효성 검사 에러
      err: ZodError[];
    }
  | {
      code: "EXISTS_ERROR"; // 커스텀 에러
      key: string;
      message: string;
    }
  | {
      code: "INTERNAL_ERROR"; // 알 수 없는 오류
      err: any;
    };
