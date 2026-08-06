import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 max-w-7xl mx-auto w-full p-6">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}