import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "flip-sync",
  description: "악보를 공유하고 플레이 하세요!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="max-w-screen-lg mx-auto">{children}</div>
      </body>
    </html>
  );
}
