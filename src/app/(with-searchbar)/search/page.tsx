import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  await delay(1500);
  // 같은 영화 정보를 검색할 경우 다시 데이터를 불러오지 않기 위해 force-cache 적용
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/search?q=${searchParams.q}`,
    { cache: "force-cache" }
  )
  if(!response.ok) {
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
