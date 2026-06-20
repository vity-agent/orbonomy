import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orbonomy — Unified API Platform",
  description: "50+ pay-per-call API endpoints across accommodation, AI, content, fact-checking, and data services. Powered by x402 protocol.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, fontFamily: "'DM Sans', sans-serif", background: "#fafafa", color: "#111", WebkitFontSmoothing: "antialiased" }}>
        {children}
      </body>
    </html>
  );
}
