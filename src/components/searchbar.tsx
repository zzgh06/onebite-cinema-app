"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Searchbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");

  const q = searchParams.get("q");

  useEffect(() => {
    setSearch(q || "");
  }, [q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search) {
      router.push("/");
      return;
    }
    if (q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-[10px] my-[20px]">
      <input
        className="flex-1 p-[15px] rounded-[5px]  border border-gray-500 bg-[rgb(0,0,0)] text-white"
        value={search}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력하세요 ..."
      />
      <button
        className="w-[80px] rounded-[5px] border-none bg-[rgb(67,67,67)] text-white cursor-p"
        onClick={onSubmit}>
        검색
      </button>
    </div>
  );
}
