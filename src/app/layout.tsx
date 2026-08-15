import type { Metadata } from "next";
import { Providers } from "./providers";
import { ClientLayout } from "./client-layout";
import "../styles.css";

export const metadata: Metadata = {
  title: "MIMIbeauty · Luxury Skincare",
  description:
    "MIMIbeauty crafts small-batch luxury skincare with botanical actives and clinical results. Reveal your natural beauty.",
  openGraph: {
    title: "MIMIbeauty · Luxury Skincare",
    description: "Small-batch luxury skincare with botanical actives and clinical results.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Montserrat:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400;0,6..96,500;1,6..96,400&display=swap"
        />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <Providers>
          <ClientLayout>{children}</ClientLayout>
        </Providers>
      </body>
    </html>
  );
}
