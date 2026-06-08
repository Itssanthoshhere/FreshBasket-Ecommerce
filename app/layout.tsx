import type { Metadata } from "next";
import { Sen, Unbounded } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./Components/Navbar/Navbar";
import CartSidebar from "./UI-Components/Pages/Cart/page";
import Footer from "./Components/Footer/page";

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
  title: "FreshBasket E-commerce Website",
  description:
    "FreshBasket – A modern and responsive grocery e-commerce website built with Next.js, TypeScript, and Tailwind CSS, featuring product browsing, shopping cart functionality, wishlist management, responsive navigation, and a seamless shopping experience.",
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
        <CartSidebar />
        <Footer />
      </body>
    </html>
  );
}
