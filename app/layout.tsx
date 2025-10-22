import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinSentLLM Presentation",
  description: "A comprehensive presentation on FinSentLLM research",
  viewport:
    "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
