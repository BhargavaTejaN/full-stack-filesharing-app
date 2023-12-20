import { Inter, Outfit } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'

import "./globals.css";
import { FireBaseProvider } from "@/context/FireBase";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Cloud Drag",
  description: "An Online Cloud",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <FireBaseProvider>
            {children}
          </FireBaseProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
