import "@/app/globals.css";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Solus Recycle DEMO",
  description: "Solus Recycle project demo",
  authors: [{ name: "Bypaulohx" }],
  openGraph: {
    title: "Solus Recycle DEMO",
    description: "Solus Recycle project demo",
    type: "website",
  },
  twitter: {
    card: "summary",
    creator: "@Bypaulohx",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
