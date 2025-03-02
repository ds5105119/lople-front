"use client";

import WelfareCard from "./welfarecard";
import useSWRInfinite from "swr/infinite";
import { welfareResponseSchema } from "@/@types/openApi/welfare";
import { SWRInfiniteKeyLoader } from "swr/infinite";

const getKey: SWRInfiniteKeyLoader = (index, previousPageData) => {
  if (previousPageData && !previousPageData.length) return null;
  return `/api/welfare/recommend?page=${index}`;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to load data");
  const data = await res.json();
  return welfareResponseSchema.parse(data);
};

export default function WelfareCardList() {
  const { data, error, isLoading, size, setSize } = useSWRInfinite(getKey, fetcher);

  if (!data) return "loading";

  return (
    <div>
      <div className="space-x-0.5">
        {data.map((pages) => {
          return pages.map((value) => <WelfareCard key={value.id} data={value} />);
        })}
      </div>
      <button onClick={() => setSize(size + 1)}>Load More</button>
    </div>
  );
}
