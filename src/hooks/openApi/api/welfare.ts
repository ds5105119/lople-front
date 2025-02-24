import { welfareRequestSchema, welfareResponseSchema, welfareRequest, walfareResponse } from "@/@types/openApi/welfare";

export const welfareRecommandAPI = async (credentials: welfareRequest): Promise<walfareResponse> => {
  try {
    welfareRequestSchema.parse(credentials);

    const response = await fetch(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
      redirect: "manual",
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    const parsedData = welfareResponseSchema.parse(responseData);

    return parsedData;
  } catch (error) {
    throw error;
  }
};
