import type { Metadata } from "next";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export const metadata = {
  title: "Sumit Sahu | Full Stack Developer Indore",
  description:
    "Portfolio of Sumit Sahu - MERN Stack Developer, ML Enthusiast, Hackathon Finalist from Indore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>
        {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
