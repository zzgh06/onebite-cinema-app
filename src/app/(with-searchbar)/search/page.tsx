import MovieItem from "@/components/movie-item";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${q}`,
    { cache: "force-cache" }
  )
  if (!response.ok) {
    return <div>데이터를 불러오던 중에 오류가 발생했습니다....</div>;
  }
  const movies: MovieData[] = await response.json();
  return (
    <div className="grid grid-cols-3 gap-[5px]">
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <Suspense key={searchParams.q || ""} fallback={

    <div className="grid grid-cols-3 gap-[5px]">
          <MovieListSkeleton count={3} size="recoMovie" />
        </div>
    }>
      <SearchResult q={searchParams.q || ""} />
    </Suspense>
  )
}
