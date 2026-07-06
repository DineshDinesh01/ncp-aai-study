import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NCP-AAI PrepMaster — NVIDIA Agentic AI Exam Prep",
  description: "1000+ practice questions for the NVIDIA NCP-AAI certification exam",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
