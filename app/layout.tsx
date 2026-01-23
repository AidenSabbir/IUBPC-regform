import type { Metadata } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"], // optional, Pixelify supports 400 by default
  variable: "--font-pixelify",
  display: "swap",
});;

export const metadata: Metadata = {
  title: "IUBPC Registration",
  description: "Join the IUB Programming Club! Register now to unlock your coding potential.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelify.variable} antialiased bg-[url('/bg.png')] bg-contain bg-center bg-no-repeat bg-fixed bg-[#050414] min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
