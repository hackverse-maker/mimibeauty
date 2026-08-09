import { type ReactNode } from "react";
import Providers from "./providers";
import "../src/styles.css";

export const metadata = {
  title: "MIMIbeauty · Luxury Skincare Rituals",
  description: "MIMIbeauty crafts small-batch luxury skincare with botanical actives and clinical results. Reveal your natural beauty.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
