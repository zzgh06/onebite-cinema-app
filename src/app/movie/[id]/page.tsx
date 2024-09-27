import { MovieData } from "@/types";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`);
  const movies: MovieData[] = await response.json();
  return movies.map(({ id }) => ({ id: id.toString() }));
}

export default async function Page({
  params,
}: {
  params: { id: string | string[] };
}) {
  // 상세페이지의 정보는 변경되지 않기 때문에 force-cache 적용
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
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
    <div className="flex flex-col gap-[10px]">
      <div
        className="relative flex justify-center p-[20px] bg-center bg-no-repeat bg-cover cover_img_container"
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          aria-hidden="true"
        ></div>
        <img src={posterImgUrl}  className="z-10 max-h-[350px] h-[100%]" />
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
          <div className="leading-6">{description}</div>
        </div>
      </div>
    </div>
  );
}