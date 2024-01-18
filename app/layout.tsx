import type { Metadata } from "next";
import SFPro from "next/font/local";
import { Providers } from "@/redux/provider";
import "@/styles/globals.css";

const sfpro = SFPro({ src: "./fonts/SF-Pro.ttf", variable: "--font-sfpro" });

export const metadata: Metadata = {
  title: "Scooby Work Smarter Tool",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={sfpro.className}>
        <div className="max-w-7xl mx-auto">
          <Providers>
            <div className="h-full min-h-[100vh] grid grid-cols-12 gap-6 py-6">
              {children}
            </div>
          </Providers>
        </div>
      </body>
    </html>
  );
}
