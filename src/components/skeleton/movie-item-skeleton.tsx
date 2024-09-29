interface MovieItemSkeletonProps {
  size: "recoMovie" | "allMovie";
}

export default function MovieItemSkeleton({size} : MovieItemSkeletonProps){
  const skeletonSize = size === "recoMovie" ? "w-[250px] h-[375px]" : "w-[148px] h-[222px]";
  return (
    <>
    <div className="animate-pulse">
      <div className={` ${skeletonSize} bg-gray-300 rounded-md`}></div>
    </div>
    </>
  )
}