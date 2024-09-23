export default function Page({
  params
}: {
  params: {
    id: string;
  }
}) {
  return (
    <div>movie : {params.id}</div>
  )
}