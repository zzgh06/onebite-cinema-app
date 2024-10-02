'use client';

import deleteReviewAction from "@/actions/delete-review.acton";
import { useActionState, useEffect, useRef } from "react";

export default function ReviewItemDeleteButton({
  reviewId,
  movieId
}: {
  reviewId: number;
  movieId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null
  );

  useEffect(() => {
    if (state && !state.status) {
      alert(state.error);
    }
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden readOnly />
      <input name="movieId" value={movieId} hidden readOnly />
      {isPending ? (
        <div>...</div>
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>
          🗑️ 삭제하기
        </div>
      )}
    </form>
  )
}