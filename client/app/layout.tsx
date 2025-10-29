import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./Components/Navbar";
import Footer from "./Components/Footer";
import { GoogleOAuthProvider } from '@react-oauth/google';



export const metadata: Metadata = {
  title: "RedChat",
  description: "RedChat is Omegle for chat",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
      <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_PUBLIC_KEY || ""}>
      <Navbar></Navbar>
        {children}
      <Footer></Footer>
      </GoogleOAuthProvider>
      </body>
    </html>
  );
}
