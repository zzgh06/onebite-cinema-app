import MovieItem from "@/components/movie-item";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { MovieData } from "@/types";
import { Metadata } from "next";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
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
        <MovieItem key={movie.id} size="recoMovie" {...movie} />
      ))}
    </div>
  );
}

type Props = {
  searchParams: {
    q?: string;
  };
}

export function generateMetadata({ searchParams }: Props): Metadata {
  return {
    title: `${searchParams.q} : 한입 시네마 검색`,
    description: `${searchParams.q} 검색 결과입니다.`,
    openGraph: {
      title: `${searchParams.q} : 한입 시네마 검색`,
      description: `${searchParams.q} 검색 결과입니다.`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({ searchParams }: Props) {
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
