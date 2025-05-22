
// import { Montserrat, Love_Ya_Like_A_Sister } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Providers } from "@/providers/index";
import { CartProvider } from "@/lib/CartContext";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Adopt-a-Fin",
  description: "Protecting marine life, one fin at a time.",
  icons: {
    icon: "/favicon.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="bg-background text-foreground">
        <Providers>
          <CartProvider>
            {children}
          </CartProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
