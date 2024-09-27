import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr" className="max-w-[800px] px-5 mx-auto">
      <body>
        <div>
          <header className="py-[15px] text-[1.5rem] text-[red] font-bold">
            <Link href={"/"}>ONEBITE CINEMA</Link>
          </header>
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
