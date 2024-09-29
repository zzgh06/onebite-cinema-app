import { MovieData } from "@/types";
import Link from "next/link";

export default function MovieItem(props: MovieData) {
  return (
    <Link className="container" href={`/movie/${props.id}`}>
      <img
        className="w-[100%]" 
        src={props.posterImgUrl} 
      />
    </Link>
  );
}
