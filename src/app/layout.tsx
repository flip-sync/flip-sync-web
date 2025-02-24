import type { Metadata } from "next";
import "./globals.css";
import Modal from "./components/Modal";
import QueryProvider from "@/providers/QueryProvider";

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
        <QueryProvider>
          <div className="max-w-screen-lg mx-auto">{children}</div>
        </QueryProvider>
        <Modal />
      </body>
    </html>
  );
}
