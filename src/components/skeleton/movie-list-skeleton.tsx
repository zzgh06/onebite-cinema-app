import MovieItemSkeleton from "./movie-item-skeleton";

interface MovieListSkeletonProps {
  count: number;
  size: "recoMovie" | "allMovie";
}

export default function MovieListSkeleton({ count, size }: MovieListSkeletonProps) {
  return (
    new Array(count).fill(0).map((_, idx) => <MovieItemSkeleton key={`movie-item-skeleton-${idx}`} size={size} />)
  )
}