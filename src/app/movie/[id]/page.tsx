import ReviewEditor from "@/components/review-editor";
import ReviewItem from "@/components/review-item";
import { MovieData, ReviewData } from "@/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`);
  const movies: MovieData[] = await response.json();
  return movies.map(({ id }) => ({ id: id.toString() }));
}

async function MovieDetail({ movieId }: { movieId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${movieId}`,
    { cache: "force-cache" }
  );
  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    return <div>데이터를 불러오던 중에 오류가 발생했습니다...</div>;
  }

  const movie = await response.json();

  const {
    title,
    subTitle,
    company,
    runtime,
    description,
    posterImgUrl,
    releaseDate,
    genres,
  } = movie;

  return (
    <section className="flex flex-col gap-[15px]">
      <div
        className="relative flex justify-center p-[20px] bg-center bg-no-repeat bg-cover cover_img_container"
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          aria-hidden="true"
        ></div>
        <img src={posterImgUrl} className="z-10 max-h-[350px] h-[100%]" />
      </div>
      <div className="flex flex-col gap-[20px]">
        <div className="flex flex-col gap-[10px]">
          <h2 className="m-0 text-[1.5rem]">{title}</h2>
          <div>
            {releaseDate} / {genres.join(", ")} / {runtime}분
          </div>
          <div>{company}</div>
        </div>
        <div>
          <div className="font-bold pb-[10px]">{subTitle}</div>
          <div className="leading-6 pb-[30px]">{description}</div>
        </div>
      </div>
    </section>
  );
}

async function MovieList({ movieId }: { movieId: string }){
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/movie/${movieId}`,
    { next: { tags: [`review-${movieId}`] }}
  )
  if(!response.ok) {
    throw new Error(`Review fetch failed : ${response.statusText}`);
  }
  const reviews: ReviewData[] = await response.json()
  return (
    <section>
      {reviews.map((review) => <ReviewItem key={`review-item-${movieId}`} {...review} />)}
    </section>
  )
}

export default function Page({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex-col gap-[50px]">
      <MovieDetail movieId={params.id} />
      <ReviewEditor movieId={params.id} />
      <MovieList  movieId={params.id} />
    </div>
  )
}