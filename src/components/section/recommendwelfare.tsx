"use client";

import useSWRInfinite, { SWRInfiniteKeyLoader } from "swr/infinite";
import WelfareCard from "@/components/card/welfarecard";
import { WelfareResponseSchema } from "@/@types/openApi/welfare";
import { WelfareCardSkeleton } from "../skeleton/welfarecardskeleton";

const getKey: SWRInfiniteKeyLoader = (index, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  return `/api/welfare/recommend?page=${index}`;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load data");
  const data = await res.json();
  return WelfareResponseSchema.parse(data);
};

export default function RecommendWelfareSection() {
  const { data, error, isLoading: _isLoading, size, setSize } = useSWRInfinite(getKey, fetcher);
  const isLoading = _isLoading || (size > 0 && data && typeof data[size - 1] === "undefined");

  if (error) return "error";

  return (
    <div>
      <div className="space-x-0.5">
        {data?.map((pages) => {
          return pages.map((value) => <WelfareCard key={value.id} data={value} />);
        })}
        {isLoading && (
          <div>
            <WelfareCardSkeleton /> <WelfareCardSkeleton /> <WelfareCardSkeleton />
          </div>
        )}
      </div>
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
}
