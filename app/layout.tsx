import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Empty Context (mtctx) - Privacy-First Backend Developer",
  description:
    "Portfolio of Empty Context (mtctx) - Backend Developer focused on privacy-first architectures and zero-trust systems.",
  keywords: ["backend", "privacy", "zero-trust", "systems", "engineering"],
  authors: [{ name: "Empty Context (mtctx)" }],
  openGraph: {
    title: "Empty Context (mtctx) - Privacy-First Backend Developer",
    description: "Backend Developer focused on privacy-first architectures",
    type: "website",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
