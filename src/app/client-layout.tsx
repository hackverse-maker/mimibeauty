"use client";
import { useSmoothScroll } from "@/lib/lenis";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { LoadingScreen } from "@/components/site/loading-screen";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { PromotionalPopup } from "@/components/ui/promotional-popup";
import type { ReactNode } from "react";

export function ClientLayout({ children }: { children: ReactNode }) {
  useSmoothScroll();

  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CartDrawer />
      <PromotionalPopup />
    </>
  );
}
