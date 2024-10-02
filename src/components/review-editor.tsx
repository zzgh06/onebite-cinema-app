'use client';

import { createReviewAction } from "@/actions/create-review.action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ movieId }: { movieId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction, 
    null
  );

  useEffect(()=>{
    if(state && !state.status ) {
      alert(state.error);
    }
  }, [state])
  
  return (
    <section>
      <form className="flex-col gap-[5px]" action={formAction}>
        <input name="movieId" value={movieId} hidden readOnly />
        <textarea disabled={isPending} className="w-[100%] h-[100px] resize-y p-[10px] box-border border-2 bg-black border-white rounded-[5px]" required name="content" placeholder="리뷰 내용" />
        <div className="flex justify-end gap-[5px]">
          <input disabled={isPending} className="p-[7px] box-border border-2 border-white rounded-[5px] bg-black" required name="author" placeholder="작성자" />
          <button disabled={isPending} className="w-[80px] p-[7px] bg-white border-2 border-black text-black border-none rounded-[5px] cursor-pointer font-bold" type="submit">
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  )
}