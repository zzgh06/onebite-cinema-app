'use client';

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children
}: {
  children: ReactNode
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(()=>{
    if(!dialogRef.current?.open){
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({
        top: 0,
      });
    }
  }, [])

  return (
    createPortal(
      <dialog
        onClose={() => router.back()}
        onClick={(e) => {
          if((e.target as any).nodeName === 'DIALOG'){
            router.back();
          }
        }}
        ref={dialogRef}
        className="w-[80%] max-w-[700px] mt-[20px] p-[10px] border-none rounded-[5px] bg-black text-white"
      >
        {children}
      </dialog>,
      document.getElementById("modal-root") as HTMLElement)
  )
}