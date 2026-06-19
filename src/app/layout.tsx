import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Design Print Hub",
  description: "Design Print Hub 주문 배정 관리자"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
