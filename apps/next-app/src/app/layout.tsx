import type { Metadata } from "next"
import localFont from "next/font/local"

import { MainNav } from "@/components/MainNav"

import "./globals.css"
import { AuthProvider } from "@/lib/hooks/auth/AuthProvider"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Compliance Tracker",
  description: "Track mandatory learnings",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-auto w-full border-border/40 dark:border-border min-[1800px]:max-w-[1536px] min-[1800px]:border-x`}
      >
        <AuthProvider>
          <MainNav />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
