import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chill Co. | Effortless Comfort",
  description: "Premium fabrics. Oversized fit. Everyday wear. Effortless style. That's chill.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full flex flex-col font-body-md text-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-white bg-texture">
        {children}
      </body>
    </html>
  );
}
