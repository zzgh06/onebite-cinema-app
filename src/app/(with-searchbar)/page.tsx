import MovieItem from "@/components/movie-item";
import { MovieData } from "@/types";
import { Metadata } from "next";

async function AllMovie() {
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
        <MovieItem key={`all-${movie.id}`} size="allMovie" {...movie} />
      ))}
    </div>
  );
}

async function RecoMovie() {
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
        <MovieItem key={`reco-${movie.id}`} size="recoMovie" {...movie} />
      ))}
    </div>
  );
}

export const metadata: Metadata = {
  title: "한입 시네마",
  description: "한입 시네마에서 최신 영화와 리뷰를 확인하세요 ",
  openGraph: {
    title: "한입 시네마",
    description: "한입 시네마에서 최신 영화와 리뷰를 확인하세요 ",
    images: ["/thumbnail.png"],
  },
};

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
