import Searchbar from "@/component/searchbar";
import { ReactNode } from "react";

export default function Layout({
  children,
}: {
  children : ReactNode;
}) {
  return (
    <div>
      <Searchbar />
      {children}
    </div>
  )
}