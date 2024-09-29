import MovieItem from "@/components/movie-item";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function AllMovie() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>데이터를 불러오던 중에 오류가 발생했습니다...</div>
  }
  const allMovies: MovieData[] = await response.json();
  return (
    <div className="grid grid-cols-5 gap-[5px]">
      {allMovies.map((movie) => (
        <MovieItem key={`all-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

async function RecoMovie() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>데이터를 불러오던 중에 오류가 발생했습니다...</div>
  }
  const recoMovies: MovieData[] = await response.json();
  return (
    <div className="grid grid-cols-3 gap-[5px]">
      {recoMovies.map((movie) => (
        <MovieItem key={`reco-${movie.id}`} {...movie} />
      ))}
    </div>
  );
}

export const dynamic = "force-dynamic"

export default function Home() {
  return (
    <div className="flex flex-col gap-[50px]">
      <section>
        <h3 className="text-[1.3rem] font-bold mb-3">지금 가장 추천하는 영화</h3>
        <Suspense fallback={
          <div className="grid grid-cols-3 gap-[5px]">
            <MovieListSkeleton count={3} size="recoMovie" />
          </div>
        }>
          <RecoMovie />
        </Suspense>
      </section>
      <section>
        <h3 className="text-[1.3rem] font-bold mb-3">등록된 모든 영화</h3>
        <Suspense fallback={
          <div className="grid grid-cols-5 gap-[5px]">
            <MovieListSkeleton count={18} size="allMovie" />
          </div>
        }>
          <AllMovie />
        </Suspense>
      </section>
    </div>
  );
}
