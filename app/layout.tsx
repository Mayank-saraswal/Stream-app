import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import { ThemeProvider } from "./(auth)/_components/theme-provider";


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
    <ClerkProvider>
      <html lang="en" className="dark" style={{ colorScheme: "dark" }}>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="Mstream-key"
            >

          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
