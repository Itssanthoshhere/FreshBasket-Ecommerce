import type { Metadata } from "next";
import { Sen, Unbounded } from "next/font/google";
import "./globals.css";
import Navbar from "./Components/Navbar/Navbar";

const sen = Sen({
  variable: "--font-sen",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshBite E-commerce Website",
  description:
    "FreshBite is an e-commerce website that offers a wide range of fresh and delicious food products.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sen.variable} ${unbounded.variable} h-full antialiased`}
    >
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
