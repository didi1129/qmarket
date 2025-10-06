import "@/globals.css";
import { pretendard } from "@/shared/config/fonts";
import { Toaster } from "sonner";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        {children}
        <Toaster
          position="bottom-center"
          richColors
          toastOptions={{
            className: "font-pretendard",
          }}
        />
      </body>
    </html>
  );
}
