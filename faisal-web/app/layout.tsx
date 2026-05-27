import type { Metadata } from "next";
  import "./globals.css";

  export const metadata: Metadata = {
    title: "Faisal Orakzai — Founder",
    description: "Entrepreneur · Investor · System Builder. Building systems that shape industries.",
    openGraph: {
      title: "Faisal Orakzai",
      description: "Building systems that shape industries.",
      type: "website",
    },
  };

  export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </head>
        <body>{children}</body>
      </html>
    );
  }