import { welfareRequestSchema, welfareResponseSchema, welfareRequest, walfareResponse } from "@/@types/openApi/welfare";
import { auth } from "@/auth";

export const welfareRecommandAPI = async (params: welfareRequest): Promise<walfareResponse> => {
  try {
    const parsedParams = welfareRequestSchema.parse(params);
    const session = await auth();

    const queryString = new URLSearchParams(parsedParams).toString();
    const url = `${process.env.NEXT_PUBLIC_RECOMMEND_WELFARE_URL}?${queryString}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      redirect: "follow",
      credentials: "include",
    });

    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
    }

    const parsedData = welfareResponseSchema.parse(responseData);

    return parsedData;
  } catch (error) {
    throw error;
  }
};
