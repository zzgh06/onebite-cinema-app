import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";

async function AllMovie() {
  // 전체 영화 데이터는 변화가 없으므로 force-cache 적용
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
  // 3초마다 추천 영화 변경하기 위해 revalidate 적용
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

export default function Home() {
  return (
    <div className="flex flex-col gap-[50px]">
      <section>
        <h3 className="text-[1.3rem] font-bold mb-3">지금 가장 추천하는 영화</h3>
        <RecoMovie />
      </section>
      <section>
        <h3 className="text-[1.3rem] font-bold mb-3">등록된 모든 영화</h3>
        <AllMovie />
      </section>
    </div>
  );
}
