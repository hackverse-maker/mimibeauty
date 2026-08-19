"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/lib/theme";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { BundlesHeader } from "@/components/site/bundles-header";
import { BundlesFooter } from "@/components/site/bundles-footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { LoadingScreen } from "@/components/site/loading-screen";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { PromotionalPopup } from "@/components/ui/promotional-popup";
import { type ReactNode, useState } from "react";

import { usePathname } from "next/navigation";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const isBundlesPage = pathname === "/bundles";

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <LoadingScreen />
            <ScrollProgress />
            {isBundlesPage ? <BundlesHeader /> : <Header />}
            <main className="min-h-screen">
              {children}
            </main>
            {isBundlesPage ? <BundlesFooter /> : <Footer />}
            <CartDrawer />
            <PromotionalPopup />
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
