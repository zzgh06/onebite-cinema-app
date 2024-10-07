import { MovieData } from "@/types";
import Image from "next/image";
import Link from "next/link";

type MovieItemProps = MovieData & { size: "recoMovie" | "allMovie" };

export default function MovieItem({ 
  id, 
  posterImgUrl,
  size,
  title
}: MovieItemProps) {
  const width = size === "recoMovie" ? 250 : 158;
  const height = size === "recoMovie" ? 375 : 222;
  return (
    <Link className="container" href={`/movie/${id}`}>
      <Image
        className="w-[100%]" 
        src={posterImgUrl}
        width={width}
        height={height}
        alt={`영화 ${title}의 표지 이미지`}
      />
    </Link>
  );
}
