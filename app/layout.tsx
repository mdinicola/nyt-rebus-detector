import type { Metadata } from "next";
import type { ReactNode } from "react";
import Footer from "./components/footer";
import ThemeToggle from "./components/theme-toggle";
import "./globals.css";

const themeScript = `
  try {
    const theme = localStorage.getItem("nyt-rebus-detector-theme") === "dark" ? "dark" : "light";
    document.documentElement.dataset.theme = theme;
  } catch (_) {}
`;

export const metadata: Metadata = {
  title: "NYT Crossword Rebus Detector",
  description: "Check whether a dated NYT crossword contains a rebus.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <div className="site-shell flex min-h-screen min-h-dvh flex-col">
          <ThemeToggle />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
