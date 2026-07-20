import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { ThemeProvider } from "@/lib/theme";
import { CartProvider } from "@/lib/cart";
import { WishlistProvider } from "@/lib/wishlist";
import { AuthProvider } from "@/lib/auth";
import { useSmoothScroll } from "@/lib/lenis";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { CartDrawer } from "@/components/site/cart-drawer";
import { AuthDialog } from "@/components/site/auth-dialog";
import { LoadingScreen } from "@/components/site/loading-screen";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="max-w-md text-center">
        <p className="text-[11px] uppercase tracking-[0.4em] text-gold">404 · Lost in the ritual</p>
        <h1 className="mt-4 font-display text-6xl">Not found</h1>
        <p className="mt-3 text-sm text-muted-foreground">This page has drifted away. Let's return to something beautiful.</p>
        <Link to="/" className="mt-8 inline-block rounded-full bg-foreground px-6 py-3 text-sm text-background">Home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="grid min-h-[70vh] place-items-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-3xl">Something interrupted the ritual.</h1>
        <p className="mt-2 text-sm text-muted-foreground">Refresh and we'll begin again.</p>
        <div className="mt-6 flex justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-full bg-foreground px-5 py-2.5 text-sm text-background">Try again</button>
          <a href="/" className="rounded-full border border-border px-5 py-2.5 text-sm">Home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "MIMIbeauty · Luxury Skincare Rituals" },
      { name: "description", content: "MIMIbeauty crafts small-batch luxury skincare with botanical actives and clinical results. Reveal your natural beauty." },
      { property: "og:title", content: "MIMIbeauty · Luxury Skincare Rituals" },
      { property: "og:description", content: "Small-batch luxury skincare with botanical actives and clinical results." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&family=Dancing+Script:wght@500;600;700&display=swap" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function AppShell() {
  useSmoothScroll();
  return (
    <>
      <LoadingScreen />
      <ScrollProgress />
      <Header />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <CartProvider>
          <WishlistProvider>
            <AuthProvider>
              <AppShell />
              <AuthDialog />
              <Toaster />
            </AuthProvider>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
