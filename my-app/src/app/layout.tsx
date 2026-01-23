import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/header/header";
import { auth } from "@/auth";
import Footer from "@/components/shared/footer";
import { ThemeProvider } from "@/components/ui/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ElectonicShop",
  description: "shop with electronic stuffs",
};
type User = {
    login: string
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth() 
  const user = session?.user as User || '';
  return (
    <html lang="en">
      <body
      
        className={`${geistSans.variable} ${geistMono.variable} antialiased duration-300`}
      >
        <ThemeProvider>
          <Header login={user.login ?? ''}/>
            <div className="px-[5vw] mt-[100px] grid grid-cols-12">
          
            {children}
            
            </div>
          <Footer/>
        </ThemeProvider>
        
      </body>
    </html>
  );
}
