import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "./shared/providers/QueryProvider";
import { pretendard } from "./shared/config/fonts";

export const metadata: Metadata = {
  title: "Q-Market",
  description: "큐플레이 실시간 아이템 판매 정보 - 시세 확인",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
