import { createReviewAction } from "@/actions/create-review.action";

export default async function ReviewEditor({ movieId }: { movieId: string }) {
  return (
    <section>
      <form className="flex-col gap-[5px]" action={createReviewAction}>
        <input name="movieId" value={movieId} hidden readOnly />
        <textarea className="w-[100%] h-[100px] resize-y p-[10px] box-border border-2 bg-black border-white rounded-[5px]" required name="content" placeholder="리뷰 내용" />
        <div className="flex justify-end gap-[5px]">
          <input className="p-[7px] box-border border-2 border-white rounded-[5px] bg-black" required name="author" placeholder="작성자" />
          <button className="w-[80px] p-[7px] bg-white border-2 border-black text-black border-none rounded-[5px] cursor-pointer font-bold" type="submit">작성하기</button>
        </div>
      </form>
    </section>
  )
}