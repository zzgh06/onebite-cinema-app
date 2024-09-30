import { ReviewData } from "@/types";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  movieId
}: ReviewData){
  return (
    <div className="flex-col grid gap-[12px] px-[0px] py-[15px]">
      <div className="flex gap-[10px]">
        <div className="text-[17px] font-bold">{author}</div>
        <div className="text-gray-400">{new Date(createdAt).toLocaleDateString()}일 작성됨</div>
      </div>
      <div className="bg-[rgb(0,0,0)] border-2 border-white p-[10px] rounded-[5px]">{content}</div>
      <button className="flex text-gray-200 text-[15px] cursor-pointer">리뷰 삭제하기</button>
    </div>
  )
}