import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BookNook | Your Neighborhood Library",
  description:
    "A small online library. Add a book, borrow a book, return a book — keep the shelves full for the next reader.",
};

// Routes block on request-time data (live books, sessions) —
// opt out of instant-navigation validation for the whole app.
export const instant = false;

// Runs before first paint: applies the saved theme (or system preference)
// so the page never flashes the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('booknook-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col font-sans">
        <Toaster
          position="top-center"
          toastOptions={{
            style: { fontFamily: "inherit" },
            success: { iconTheme: { primary: "#1d4a3a", secondary: "#fff" } },
          }}
        />
        <Navbar />
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
