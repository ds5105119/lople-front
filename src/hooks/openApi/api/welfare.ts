import { auth } from "@/auth";
import { SWRInfiniteKeyLoader } from "swr/infinite";

import { welfareResponseSchema, walfareResponse } from "@/@types/openApi/welfare";

export const welfareRecommandGetKey: SWRInfiniteKeyLoader = (index, previousPageData) => {
  if (previousPageData && !previousPageData) return null;
  return `${process.env.NEXT_PUBLIC_RECOMMEND_WELFARE_URL}?page=${index}&size=10`;
};

export const welfareRecommandFetcher = async (url: string): Promise<walfareResponse> => {
  try {
    const session = await auth();

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
