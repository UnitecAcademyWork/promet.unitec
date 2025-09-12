import { Outfit } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '../context/ThemeContext';
import { SidebarProvider } from '../context/SidebarContext';
import Navbar from '../components/Landing/Navbar/navbar';
import Footer from '../components/Landing/footer/footer';
import { Metadata } from 'next';
const outfit = Outfit({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Promet",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
          {/* Google Analytics */}
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-3YZK3D46ZS"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-3YZK3D46ZS');
              `,
            }}
          />
        </head>
      <body className={`h-full text-white${outfit.className} dark:bg-gray-900`}>
        {/* <ThemeProvider> */}
          <div className="sticky top-0 mb-[75px] z-50 bg-white dark:bg-gray-800 shadow-md">
          <Navbar />
          </div>
          <SidebarProvider>{children}</SidebarProvider>
          <Footer />
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
