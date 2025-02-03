import type { Metadata } from "next";
import "./globals.css";
import Modal from "../lib/components/Modal";

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
        <Modal />
      </body>
    </html>
  );
}
