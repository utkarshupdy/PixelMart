"use client"
import "./globals.css";
import { Inter } from "next/font/google";
import Providers from "./components/Providers";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Script from "next/script";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "ImageKit Next.js Integration",
//   description: "Demo of ImageKit integration with Next.js",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="lazyOnload"
        />
        <Providers>
          <Header />
          {/* Main content takes up remaining space to push footer down */}
          {pathname == "/" ? ( <main className="w-full">{children}</main>) : (<main className="container mx-auto px-4 py-8 flex-grow">{children}</main>)}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
