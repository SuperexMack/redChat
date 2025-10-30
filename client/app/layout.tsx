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
     
      <Navbar></Navbar>
       <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
        {children}
      </GoogleOAuthProvider>
      <Footer></Footer>
      </body>
    </html>
  );
}
