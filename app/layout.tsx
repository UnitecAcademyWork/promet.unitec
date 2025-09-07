import { Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { SidebarProvider } from '../context/SidebarContext';
import Navbar from '../components/Landing/Navbar/navbar';
import Footer from '../components/Landing/footer/footer';
const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>
        <ThemeProvider>
          <div className="sticky top-0 mb-16 z-50 bg-white dark:bg-gray-800 shadow-md">
          <Navbar />
          </div>
          <SidebarProvider>{children}</SidebarProvider>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
