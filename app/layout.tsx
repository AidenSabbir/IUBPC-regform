import type { Metadata, Viewport } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import PhoneFrameWrapper from "./components/PhoneFrameWrapper";

const pixelify = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pixelify",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IUBPC Registration",
  description: "Join the IUB Programming Club! Register now to unlock your coding potential.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${pixelify.variable} antialiased bg-[#050414] min-h-screen selection:bg-pixel-cyan selection:text-pixel-black`}
      >
        <PhoneFrameWrapper>
          {children}
        </PhoneFrameWrapper>
      </body>
    </html>
  );
}
