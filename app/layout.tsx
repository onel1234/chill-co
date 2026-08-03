import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import LoadingScreen from "@/components/LoadingScreen";
import { CartProvider } from "@/lib/context/CartContext";
import { AuthProvider } from "@/lib/context/AuthContext";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-poppins',
});

const logoUrl = "/images/Screenshot 2026-08-03 192547.png";

export const metadata: Metadata = {
  title: "Chill Co. | Effortless Comfort",
  description: "Premium fabrics. Oversized fit. Everyday wear. Effortless style. That's chill.",
  icons: {
    icon: logoUrl,
    shortcut: logoUrl,
    apple: logoUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`h-full ${poppins.variable}`}>
      <head>
        <link rel="icon" href={logoUrl} type="image/png" />
        <link rel="apple-touch-icon" href={logoUrl} />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col font-body-md text-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-white bg-texture">
        <LoadingScreen />
        <AuthProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
