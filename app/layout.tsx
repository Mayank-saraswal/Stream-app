import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./(auth)/_components/theme-provider";
import { Toaster } from "sonner";
import { dark } from "@clerk/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "My App",
  description: "App with Clerk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={{baseTheme:dark}}>
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        
          <Toaster theme="light" position="bottom-center"/>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            // ✅ force karo "dark", system pe depend na ho
            storageKey="Mstream-key"
          >
            {children}
          </ThemeProvider>
        
      </body>
    </html>
    </ClerkProvider>
  );
}
