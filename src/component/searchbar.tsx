"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react"

export default function Searchbar(){
  const router = useRouter();
  const searchParams = useSearchParams();
  const [keyword, setKeyword] = useState("");

  const q = searchParams.get("q");

  useEffect(()=>{
    setKeyword(q || "");
  },[q]);

  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }

  const onSubmit = () => {
    if (!keyword) {
      router.push("/");
      return;
    }
    if (q === keyword) return;
    router.push(`/search?q=${keyword}`);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSubmit();
    }
  }

  return (
    <div>
      <input 
        value={keyword}
        onChange={onChangeSearch}
        onKeyDown={onKeyDown}
        placeholder="검색어를 입력해주세요..."
      />
      <button>검색</button>
    </div>
  )
}